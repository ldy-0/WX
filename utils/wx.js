function showModal(title, content, showCancel = false){
  if(typeof showCancel === 'function') { 
    var success = showCancel;
    showCancel = true;
  }

  wx.showModal({ title, content, showCancel, success });
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
      success(e){ resolve(e); console.error(e); },
      fail(e){ resolve(e); }
    };

    wx.saveImageToPhotosAlbum(opt);
  });
}

async function getImg(src){
  return new Promise((resolve, reject) => {
    let opt = {
      src,
      success(e){ resolve(e.path); },
      fail(e){ resolve(e); }
    }

    wx.getImageInfo(opt);
  });
}

async function uploadImg(url, filePath, header){
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url,
      filePath,
      header,
      name: 'file',
      success(res){ resolve(res); },
      fail(e){ console.error('upload file', e); }
    });
  });
}

/**
 * copy to clipBoard
 * 
 * @param {String} data
 * @param {Object} option
 * @returns {Promise}
 */
copy(data, option){
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

export default {
  showModal,
  preview,
  chooseImg,
  getImg,
  saveImg,
  uploadImg,
  saveConcat,
  record,
  stopRecord
}