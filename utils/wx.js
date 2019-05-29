/**
 * 
 * @param {String} content 
 * @param {String} title 
 * @param {Boolean} showCancel 
 * @param {Object} 
 */
function showModal(content, title = '', showCancel = false, option){
  let opt = { title, content, showCancel, success };

  if(typeof title === 'function' || typeof showCancel === 'function') { 
    var success = title || showCancel;
    title = '';
    showCancel = true;
  }

  // other option
  if(typeof option === 'object'){
    for(let key in option) opt[key] = option[key];
  }

  return new Promise((resolve, reject) => {
    opt.success = function(res){
      resolve(res.confirm);
    };

    wx.showModal(opt);
  });
}

function preview(current, urls){
  let opts = {
    current,
    urls
  };

  wx.previewImage(opts);
}

function chooseImg(params){
  return new Promise(function(resolve, reject){

    wx.chooseImage({
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res){ resolve([params, res]) },
        fail(res){ console.log('choose', res); }
    });

  });
}

async function saveImg(filePath){
  return new Promise((resolve, reject) => {
    let opt = {
      filePath,
    };

    opt.success = e => { 
      if(e.errMsg === 'saveImageToPhotosAlbum:ok') resolve({ state: 1, status: 1, }); 
    };

    opt.fail = e => {
      if(e.errMsg === 'saveImageToPhotosAlbum:fail auth deny' || e.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || e.errMsg === "saveImageToPhotosAlbum:fail auth denied"){
        wx.openSetting({
          success(e){ console.error(e); }
        });
        // res.authSetting["scope.writePhotosAlbum"]
        console.error('权限问题');
      }

      resolve(e.errMsg === 'saveImageToPhotosAlbum:fail cancel' ? '' : e.errMsg);
    }

    wx.saveImageToPhotosAlbum(opt);
  });
}

/**
 * 
 * @param {String} src Img URL
 * @returns [Object|String]
 * 
 */
async function getImg(src){
  return new Promise((resolve, reject) => {
    let opt = {
      src,
      success(e){ resolve({ width: e.width, height: e.height, path: e.path }); },
      fail(e){ resolve(e.errMsg); }
    }

    wx.getImageInfo(opt);
  });
}

/**
 * 
 * @param {String} url 
 * @param {String} filePath 
 * @param {Object} header 
 * @param {Object} formData 
 * @returns {Promise}
 */
async function uploadImg(url, filePath, header, formData){
  let opt = {
      url,
      filePath,
      name: 'file',
    };

  if(header) opt.header = header;
  if(formData) opt.formData = formData;
  
  // console.error('upload', opt);
  return new Promise((resolve, reject) => {
    opt.success = (res) => resolve(res);
    opt.fail = (e) => console.error('uploadImg fail : \n ', e.errMsg); 

    wx.uploadFile(opt);
  });
}

/**
 * copy to clipBoard
 * 
 * @param {String} data
 * @param {Object} option
 * @returns {Promise}
 */
function copy(data, option){
  return new Promise((resolve, reject) => {
    let opt = {
      data
    };

    opt.success = res => { if(option && option.isPreventDefault) wx.hideToast(); resolve(); };
    opt.fail = err => { console.error('copy :', err); resolve(err); }

    wx.setClipboardData(opt);
  });
}

/**
 * save concat 保存至通讯录
 * 
 * @param {Object} param 
 */
function saveConcat(param){
    return new Promise(resolve => {
      wx.addPhoneContact({
        ...param,
        success: e => resolve(e),
        fail: e => resolve(e)
      });
    });
}

/**
 * record 录音
 * 
 * @param {Object} _this 
 * @param {String} property
 * @param {Function} callback 
 */
function record(__this, property, callback){
  _this[property] = wx.getRecorderManager();

  _this[property].onError(e => console.error(e));
  _this[property].onStop(e => callback(e.tempFilePath));

  _this[property].start({ format: 'mp3' });
  _this.$apply();
}

/**
 * stop record 停止录音
 * 
 * @param {Object} _this 
 * @param {String} property 
 */
function stopRecord(_this, property){ 
  _this[property].stop(); 
  _this[property]= null;
  _this.$apply(); 
}

/**
 * Get Canvas To Img Path
 * 
 * @param {String} canvasId 
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} width 
 * @param {Number} height 
 */
function getCanvasImg(canvasId, x, y, width, height, destWidth, destHeight){
  let opt = { canvasId, x, y, width, height, destWidth, destHeight, };
  
  return new Promise(function(resolve, reject){
    opt.success = v => { resolve({ path: v.tempFilePath }); };
    opt.fail = e => resolve(e.errMsg);

    wx.canvasToTempFilePath(opt);
  });
}

async function uploadFile(url, filePath, header, formData){
  let opt = {
      url,
      filePath,
      name: 'file',
    };

  if(header) opt.header = header;
  if(formData) opt.formData = formData;
  
  // console.error('upload', opt);

  return new Promise((resolve, reject) => {
    opt.success = (res) => resolve(res);
    opt.fail = (e) => console.error('uploadFile fail : \n', e.errMsg); 

    wx.uploadFile(opt);
  });
}

function chooseVideo(params){
  return new Promise(function(resolve, reject){

    wx.chooseVideo({
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res){ resolve([params, res]) },
        fail(res){ console.log('choose', res); }
    });

  });
}

/**
 * 
 * Location
 * 
 */
function _getLocation(type){

    return new Promise((resolve, reject) => {
      let opt = {
        success: v => resolve(v),
        fail: e => resolve(e.errMsg),
      };

      wx.getLocation(opt);
    });
};

async function getLocation(){
  let res = await _getLocation();

  // fail
  if(res === 'getLocation:fail auth deny'){
    let opt = {
      content: '请开启定位权限',
      showCancel: false,
      success: res => { 
        if(res.confirm){
          wx.openSetting({
            success(v){ console.error(v); },
            fail(e){ console.error(e); }
          });
        }
      }
    };

    wx.showModal(opt);
  }

  if(res === 'getLocation:fail 1'){
    return 'system';
    // wx.showModal({ content: `系统定位功能未开启,小程序部分功能不可用。`, showCancel: false });
  }

  return res;
  
}

/**
 * 
 * @param {String} title 
 * 
 */
function setTitle(title = ''){
  wx.setNavigationBarTitle({ title });
}

/**
 * 
 */
function pay(obj){
  let param = {
      timeStamp: obj.timeStamp,
      nonceStr: obj.nonceStr,
      package: obj.package,
      signType: "MD5",
      paySign: obj.paySign,
  };

  return new Promise((resolve, reject) => {

    param.success = function(res){
      resolve(res);
      console.log("支付成功返回的结果",res);
    };
  
    param.fail = e => e.errMsg === 'requestPayment:fail cancel' ? resolve({ cancel: 1 }) : resolve(e.errMsg);

    wx.requestPayment(param);

  });
}

export default {
  showModal,
  preview,
  chooseImg,
  getImg,
  saveImg,
  uploadImg,
  saveConcat,
  record,
  stopRecord,
  copy,
  getCanvasImg,
  uploadFile,
  chooseVideo,
  getLocation,
  setTitle,
  pay,
}