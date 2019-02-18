

const dayArr = ['日', '一', '二', '三', '四', '五', '六', '日']

/**
 * 
 * Get day 
 * @param {Array} arr 
 * @param {String} [prefix='周']
 * @return {Array<String>}
 */
function getDay(arr, prefix = '周'){

  return arr.map(function(v){
    return `${prefix}${dayArr[v]}`;
  });

} 

export default {
  getDay
}