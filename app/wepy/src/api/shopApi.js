/**
 * 店铺相关接口
 */

import api from './api';


/**
 * 店铺信息
 */
function getShopInfo(options) {
  return api.post('v2/shop/mine', options.params, options.message, options.success, options.fail, options.complete)
}

/**
 * 获取店铺统计
 */
function getShopStatistics(options) {
  return api.post('v2/shop/statistics/2b', options.params, options.message, options.success, options.fail, options.complete)
}



/**
 * 更新店铺信息
 * @param name  店铺名
 * @param description   店铺介绍
 * @param img      从七牛获取的id
 * @param banner   从七牛获取的id
 */
function updataShopInfo(options) {
  return api.post('v2/shop/update', options.params, options.message, options.success, options.fail, options.complete)
}

/**
 * 获取分类
 * @param level 分类层级
 * @param parentCategoryId 父分类id
 * @param taxonomy GOODS或者FILTER
 */
function getCategory(options) {
  return api.post('v2/category/list/'+options.level, options.params, options.message, options.success, options.fail, options.complete)
  // return api.post('v2/categories/'+options.level, options.params, options.message, options.success, options.fail, options.complete);
}

/**
 *  * 获取分类商品列表
 * @param categoryId    分类ID
 * @param page  页数
 * @param size  个数
 * @param order 排序类型
 * @param direction 正序还是倒序
 * @param pageable  是否分页，传true
 * @type  FILTER滤芯  NORMAL商品 
 */
function getGoodsList(options) {
  return api.post('v2/catalog/allProducts?type='+options.type, options.params, options.message, options.success, options.fail, options.complete)
}

/**
 * 获取商品信息
 * @param productId 商品id
 */
function getProductInfo(options) {
  return api.post('v2/product/'+options.id, options.params, options.message, options.success, options.fail, options.complete)
}

/**
 * 获取特价活动信息
 */
function getFlashSaleList(options) {
  return api.post('v2/flashSale/list', options.params, options.message, options.success, options.fail, options.complete)
}
/**
 * 收藏某个商品
 */
function goodsFavorite(options) {
  return api.post('v2/productCollection/save?productId='+options.id, options.params, options.message, options.success, options.fail, options.complete)
}
/**
 * 取消收藏某个商品
 */
function goodsUnFavorite(options) {
  return api.post('v2/productCollection/delete?productId='+options.id, options.params, options.message, options.success, options.fail, options.complete)
}
/**
 * 查询商品是否已收藏
 */
function goodsIsFavorite(options) {
  return api.post('v2/productCollection/check?productId='+options.id, options.params, options.message, options.success, options.fail, options.complete)
}

/**
 * 搜索商品
  * @param key   关键字
  * @param page  页数
  * @param size  个数
  * @return
 */
function searchbyApp(options) {
  return api.post('v2/product/searchbyApp', options.params, options.message, options.success, options.fail, options.complete)
}

/**
 * 获取我的滤芯
 */
function getMyFilter(options) {
  return api.post('v2/catalog/allBoundedProducts', options.params, options.message, options.success, options.fail, options.complete)
}


/**
 * 会员活动列表
 */
function getMemberPromotion(options) {
  return api.post('v2/openapi/home/getMemberPromotion', options.params, options.message, options.success, options.fail, options.complete)
}

// 获取列表
function acquisitionEvaluation (options) {
  return api.post('v2/comment/productComments', options.params, options.message, options.success, options.fail, options.complete)
}

// 获取评价列表
function reviewList(options) {
  return api.post('v2/order/items', options.params, options.message, options.success, options.fail, options.complete)
}
// 发布评价  Release evaluation
function releaseEvaluation(options) {
  return api.post('v2/comments', options.params, options.message, options.success, options.fail, options.complete,null,options.contentType)
}

function receiveCouponsList(options) {
  return api.post('v2/promotionCoupon/myCoupon?status=' + options.id, options.params, options.message, options.success, options.fail, options.complete)
}

module.exports = {
  getShopInfo: getShopInfo,
  getShopStatistics: getShopStatistics,
  updataShopInfo:updataShopInfo,
  getCategory,
  getGoodsList,
  getProductInfo,
  getFlashSaleList,
  goodsIsFavorite,
  goodsUnFavorite,
  goodsFavorite,
  searchbyApp,
  getMyFilter,
  getMemberPromotion,
  acquisitionEvaluation,
  reviewList,
  releaseEvaluation,
  receiveCouponsList,
}