function showModal(title, content, showCancel = false){
  if(typeof showCancel === 'function') { 
    var success = showCancel;
    showCancel = true;
  }

  wx.showModal({ title, content, showCancel, success });
}

export default {
  showModal,
}