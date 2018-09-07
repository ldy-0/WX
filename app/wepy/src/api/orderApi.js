/**
 * 订单相关接口
 */

import api from './api';


/**
 * 订单列表
 * @param orderStatus  订单状态
 * @param inOrOut   买入卖出
 */
function getOrderList(options) {
  return api.post('v2/order/list/' + options.orderStatus, options.params, options.message, options.success, options.fail, options.complete)
}

/**
 * 订单详情
 * @param id  订单id
 */
function getOrderDetail(options) {
  return api.post('v2/order/' + options.id, options.params, options.message, options.success, options.fail, options.complete)
}


/**
 * 搜索订单列表
 * @param status  订单状态
 * @param key   关键字
 * @param inOrOut   买入卖出
 */
function searchOrderList(options) {
  return api.post('v2/order/listByKey/' + options.status, options.params, options.message, options.success, options.fail, options.complete)
}


/**
 * 订单审核发货
 * @param orderId  订单id
 * @param logisticsCompany  物流公司
 * @param logisticsOrderNo  物流单号
 * @param logisticsAntifake 防伪码(逗号拼接)
 */
function auditAndShip(options) {
  return api.postRC('v2/order/auditAndShip', options.params, options.message, options.success, options.fail, options.complete)
}


/**
 * 取消订单
 * @param orderId  订单id
 */
function cancelOrder(options) {
  return api.post('v2/api/order/cancel', options.params, options.message, options.success, options.fail, options.complete)
}



/**
 * 订单收货
 * @param orderId  订单id
 */
function confirmReceive(options) {
  return api.post('v2/api/order/confirmShipped', options.params, options.message, options.success, options.fail, options.complete)
}




/**
 * 待审核订单数
 */
function getSubmittedCount(options) {
  return api.post('v2/api/order/submittedCount', options.params, options.message, options.success, options.fail, options.complete)
}


/**
 * 各类型订单数
 * @param status 'submitted','shipped','paid','success'
 */
function getTypeCount(options) {
  return api.post('v2/api/order/typeCount', options.params, options.message, options.success, options.fail, options.complete)
}


/**
 * 获取条形码对应规格
 * @param logisticsAntifake 防伪码
 */
function getQtyFromAntifake(options) {
  return api.postRC('v2/order/getQtyFromAntifake', options.params, options.message, options.success, options.fail, options.complete)
}


/**
 * 扫码发货选择代理创建订单接口
 * @param userId  被创建人的userId
 * @param logisticsCompany  物流公司
 * @param logisticsOrderNo  物流单号
 * @param logisticsAntifake 防伪码(逗号拼接)
 */
function createOrder(options) {
  return api.postRC('v2/order/createNew', options.params, options.message, options.success, options.fail, options.complete)
}


/**
 * 查看下单详情
 * @param skuId 规格id
 * @param qty 数量(购物车不含qty字段)
 * @param addressId 收货地址id(购物车不含addressId字段)
 */
function confirmOrder(options) {
  return api.postRC('v2/order/confirm', options.params, options.message, options.success, options.fail, options.complete, options.handleErr)
}

/**
 * 提交订单
 * @param proLiteralId  商品id
 * @param skuId 规格id
 * @param useDeduction 是否积分抵现
 * @param qty 进货数量
 * @param addressId 地址id
 * @param ispickup  是否自提,1自提,0不是自提
 * @param remark  备注
 * @param sellerId 分享人的id
 */
function submitOrder(options){
  return api.post('v2/order/submit', options.params, options.message, options.success, options.fail, options.complete, 'post', 'application/json', options.handleErr);
  // return api.post2('v2/order/submit', options.params, options.message, options.success, options.fail, options.complete)
}


/**
 * 获取商品详情
 */
function getProductInfo(options){
  return api.post('v2/product/purchase', options.params, options.message, options.success, options.fail, options.complete)
}


/**
 * 获取微信支付信息
 */
function getPayInfo(options){
  return api.post('order/pay', options.params, options.message, options.success, options.fail, options.complete,'get')
}


/**
 * 唤起支付
 */
function payOrder(options){
  return api.post('pay/tenpay', options.params, options.message, options.success, options.fail, options.complete)
}

// 申请退款
function goRefund(options){
  return api.post('v2/order/refund/apply', options.params, options.message, options.success, options.fail, options.complete, 'post', 'application/json');
}

// 物流录入
function goProof(options){
  return api.post('v2/order/refund/proof', options.params, options.message, options.success, options.fail, options.complete, 'post', 'application/json');
}

/**
 * 德分扣除
 */
function postPoint(options){
  return api.post('v2/openapi/users/'+options.cpid+'/points', options.params, options.message, options.success, options.fail, options.complete)  //'post', 'application/json'
}

/**
 * 订单取消时恢复德分
 */
function cancelPoint(options){
  return api.post('v2/openapi/users/'+options.cpid+'/points/cancel', options.params, options.message, options.success, options.fail, options.complete)
}

/**
 * 订单退款时恢复德分
 */
function revertPoint(options){
  return api.post('v2/openapi/users/'+options.cpid+'/points/revert', options.params, options.message, options.success, options.fail, options.complete)
}


/**
 * 积分扣除
 */
function postCommission(options){
  return api.post('v2/openapi/users/'+options.cpid+'/commission', options.params, options.message, options.success, options.fail, options.complete)
}

/**
 * 订单取消时恢复积分
 */
function cancelCommission(options){
  return api.post('v2/openapi/users/'+options.cpid+'/commission/cancel', options.params, options.message, options.success, options.fail, options.complete)
}

/**
 * 订单退款时恢复积分
 */
function revertCommission(options){
  return api.post('v2/openapi/users/'+options.cpid+'/commission/revert', options.params, options.message, options.success, options.fail, options.complete)
}




module.exports = {
  getOrderList: getOrderList,
  getOrderDetail: getOrderDetail,
  searchOrderList: searchOrderList,
  auditAndShip: auditAndShip,
  cancelOrder: cancelOrder,
  confirmReceive: confirmReceive,
  getSubmittedCount: getSubmittedCount,
  getQtyFromAntifake: getQtyFromAntifake,
  createOrder: createOrder,
  submitOrder:submitOrder,
  getProductInfo:getProductInfo,
  confirmOrder,
  payOrder,
  getPayInfo,
  getTypeCount,
  postPoint,
  cancelPoint,
  revertPoint,
  postCommission,
  cancelCommission,
  revertCommission,
  goRefund,
  goProof,
}