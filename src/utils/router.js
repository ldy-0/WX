import route from '../app';

function go(url){
  console.error(url);
  wx.switchTab({ url });
}

export default {
  go
}