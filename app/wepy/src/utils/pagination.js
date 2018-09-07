/**
 * limit
 * currentPage 
 * list
 * total 
 * canLoad
 */

let startPage;

export function reset(_this, start = 1){

  _this.currentPage = start;
  startPage = start;
  _this.list = [];
  _this.total = 0;

  console.log(startPage, _this, this);
}

export function loadMore(_this){

  if(!_this.canLoad){
    return ;
  }
  _this.canLoad = false;

  if(_this.total <= ( startPage === 1 ? _this.currentPage : _this.currentPage + 1 ) * _this.limit){
    return wx.showModal({ title: '提示', content: '已经是最后一页了!', showCancel: false, });
  }

  _this.getList(++_this.currentPage);
}

export default {
  reset,
  loadMore,
}

// \b -> word border location 
// module object all depend module load  