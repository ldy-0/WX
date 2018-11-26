function showModal(title, content, showCancel){
  if(typeof showCancel === 'function') { 
    var success = showCancel;
    showCancel = true;
  }

  wx.showModal({ title, content, showCancel, success });
}

export default {
  showModal,
}