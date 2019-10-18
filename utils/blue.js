const name = 'FOENIC_AIT_ECU'; // ;
let _this, device, deviceId, service, serviceId, readCharacter, writeCharacter, readId, writeId;

let loading = { title: 'init...', mask: true };



async function start(ts){
  wx.showLoading(loading);
  _this = ts;
  let res = await openAdapt();

  if(typeof res == 'string' || !res || res.error) return handleError(res ? res.error || res : '打开蓝牙adapt error');

  updateLoading('check...');
  res = await getAdaptState();

  if(typeof res == 'string' || !res || res.error) return handleError(res ? res.error || res : '获取蓝牙adapt error');

  updateLoading('search...');
  res = await startSearch();

  if(typeof res == 'string' || !res || res.error) return handleError(res ? res.error || res : '搜索蓝牙error');

  res = await getDevice();
  if(typeof res == 'string' || !res || res.error) return handleError(res ? res.error || res : '获取蓝牙error');
  // res.devices.forEach(v => v.data = ab2hex(v.advertisData));
  device = res.devices.filter(v => v.localName == name)[0];
  _this.deviceList = res.devices.filter(v => v.localName);

  updateLoading('close...');
  res = await stopSearch();
  if(typeof res == 'string' || !res || res.error) return handleError(res ? res.error || res : '停止蓝牙搜索error');

  if(!device) return handleError('未搜索到');

  console.error(device);
  connectSensor(deviceId = device.deviceId);

  _this.$apply();
  wx.hideLoading();
}

async function connectSensor(id){
  updateLoading('connect...');
  let res = await connect(id);
  if(typeof res == 'string' || !res || res.error){
    disconnectSensor();
    return handleError(res ? res.error || res : '连接蓝牙error');
  }

  updateLoading('get service ...');
  let serviceRes = await getService(id);
  if(typeof serviceRes == 'string' || !serviceRes || serviceRes.error) return handleError(serviceRes ? serviceRes.error || serviceRes : '获取蓝牙服务error');
  _this.serviceList = serviceRes.services;
  console.error('serviceList:', serviceRes.services);
  serviceRes.services = serviceRes.services.filter(v => v.uuid == '00001000-0000-1000-8000-00805F9B34FB');

  for(let i = 0, len = serviceRes.services.length; i < len; i++){
    service = serviceRes.services[i];
    serviceId = service.uuid; // device.advertisServiceUUIDs[0]; 

    updateLoading('get Char...');
    res = await getCharacteristic(id, serviceId);
    console.error(i, 'char:', res);
    // if(typeof res == 'string' || !res || res.error) return handleError(res ? res.error || res : '获取蓝牙特征值error');
    if(res && res.characteristics){
      readCharacter = res.characteristics.filter(v => v.properties.notify)[0];
      writeCharacter = res.characteristics.filter(v => v.properties.write)[0];
    }

    if(readCharacter && writeCharacter) break;
    readCharacter = writeCharacter = null;
  }

  if(!readCharacter || !writeCharacter) return handleError('没有可监听，读，写的character');

  readId = readCharacter.uuid;
  writeId = writeCharacter.uuid;
  console.error('service:', service, '\nread:', readCharacter, '\nwrite:', writeCharacter);
  notifySensor(id, serviceId, readId);
}

async function disconnectSensor(){
  let res = await disconnect(deviceId);
  if(typeof res == 'string' || !res || res.error) return handleError(res ? res.error || res : '断开蓝牙连接error');
  console.log(`disconnect ${deviceId} success`);
  deviceId = null;

  res = await closeAdapt();
  if(typeof res == 'string' || !res || res.error) return handleError(res ? res.error || res : '关闭蓝牙error');

  console.log(`close adapt`);
}

async function notifySensor(id, serviceId, characterId){
  updateLoading('notify...');
  let res = await notify(id, serviceId, characterId);
  if(typeof res == 'string' || !res || res.error) return handleError(res ? res.error || res : '获取蓝牙特征值error');

  // set callback
  updateLoading('listen...');
  wx.onBLECharacteristicValueChange(handleNotify);

  // res = await read(id, serviceId, readCharacter.uuid);
  // console.error('read: ', res);

  wx.hideLoading();
}

async function sendVal(value){
  updateLoading('send...');
  // console.log(deviceId, serviceId, writeId, toBuffer(value));

  let res = await send(deviceId, serviceId, writeId, toBuffer(value));

  wx.hideLoading();
  wx.showModal({ content: res.errMsg, });
}

//

function notify(deviceId, serviceId, characteristicId){
  let opt = { deviceId, serviceId, characteristicId, state: true, };

  return new Promise(resolve => {
    opt.success = e => resolve(e);
    opt.fail = err => resolve(err.errMsg);
    opt.complete = e => {}

    wx.notifyBLECharacteristicValueChange(opt);
  });
}

function read(deviceId, serviceId, characteristicId){
  let opt = { deviceId, serviceId, characteristicId, };

  return new Promise(resolve => {
    opt.success = e => resolve(e);
    opt.fail = err => resolve(err.errMsg);

    wx.readBLECharacteristicValue(opt);
  });
}

function send(deviceId, serviceId, characteristicId, value){
  let opt = { deviceId, serviceId, characteristicId, value }; //  '27'

  return new Promise(resolve => {
    opt.success = e => resolve(e);
    opt.fail = err => resolve(err.errMsg);

    wx.writeBLECharacteristicValue(opt);
  });
}

function getCharacteristic(deviceId, serviceId){
  let opt = { deviceId, serviceId, };

  return new Promise(resolve => {
    opt.success = e => resolve(e);
    opt.fail = err => resolve(err.errMsg);

    wx.getBLEDeviceCharacteristics(opt);
  });
}

function getService(deviceId){
  let opt = { deviceId, };

  return new Promise(resolve => {
    opt.success = e => resolve(e);
    opt.fail = err => resolve(err.errMsg);

    wx.getBLEDeviceServices(opt);
  });
}

function connect(deviceId){
  let opt = { deviceId, };

  return new Promise(resolve => {
    opt.success = e => resolve(e);
    opt.fail = err => resolve(err.errMsg);

    wx.createBLEConnection(opt);
  });
}

function disconnect(){
  let opt = { deviceId, };

  return new Promise(resolve => {
    opt.success = e => resolve(e);
    opt.fail = err => resolve(err.errMsg);

    wx.closeBLEConnection(opt);
  });
}

function getDevice(){
  let opt = {};

  return new Promise(resolve => {
    opt.success = e => resolve(e);
    opt.fail = err => resolve(err.errMsg);

    wx.getBluetoothDevices(opt);
  });
}

function startSearch() {
  let opt = {};

  return new Promise(resolve => {
    opt.success = e => resolve(e);
    opt.fail = err => resolve(err.errMsg);

    wx.startBluetoothDevicesDiscovery(opt);
  });
}

function stopSearch() {
  let opt = {};

  return new Promise(resolve => {
    opt.success = e => resolve(e);
    opt.fail = err => resolve(err.errMsg);

    wx.stopBluetoothDevicesDiscovery(opt);
  });
}

function getAdaptState(){
  let opt = {};

  return new Promise(resolve => {
    opt.success = e => resolve(e);
    opt.fail = err => resolve(e.errMsg);
    
    wx.getBluetoothAdapterState(opt);
  });
}

function openAdapt(){
    let opt = {};


    return new Promise(resolve => {
      opt.success = e => resolve(e);
      opt.fail = err => resolve(err.errMsg);

      wx.openBluetoothAdapter(opt);
    });
}

function closeAdapt(){
    let opt = {};


    return new Promise(resolve => {
      opt.success = e => resolve(e);
      opt.fail = err => resolve(err.errMsg);

      wx.closeBluetoothAdapter(opt);
    });
}

function handleNotify(res){
  console.error('response: ', res, '\n', toData(res.value));
}

function handleError(content){
  wx.hideLoading();
  wx.showModal({ content, showCancel: false, });

  deviceId ? disconnectSensor() : closeAdapt();
}

function updateLoading(title){
  loading.title = title;
  wx.showLoading(loading);
}

function ab2hex(buffer) {
  var hexArr = Array.prototype.map.call(
    new Uint8Array(buffer),
    function(bit) {
      return ('00' + bit.toString(16)).slice(-2)
    }
  )
  return hexArr.join('');
}

function toData(buffer){
  let len = buffer.byteLength,
      dw = new DataView(buffer),
      arr = [];

  for(let i = 0; i < len; i++){
    let v = dw.getUint8(i).toString(16);
    arr.push(v.length == 2 ? v : `0${v}`);
  }

  return arr;
}

function toBuffer(str){
  let arr = str.split(' '),
      buffer = new ArrayBuffer(arr.length),
      uint8Arr = new Uint8Array(buffer),
      dw = new DataView(buffer);

  arr.forEach((v, i) => {
    // uint8Arr[i] = parseInt(v, 16);
    dw.setUint8(i, parseInt(v, 16));
  });

  return buffer;
}

export default {
  start,
  closeAdapt,
  disconnect,
  disconnectSensor,
  sendVal,

  toBuffer,
  toData,
}