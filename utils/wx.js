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
  saveConcat,
  record,
  stopRecord
}