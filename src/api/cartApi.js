/**
 * 购物车相关接口
 */
import api from './api';



/**
 * 添加到购物车
* `*skuId`
* `*productId`
* `*amount` 增加数量
 */
function addToCart(options) {
  return api.post('v2/cart/add', options.params, options.message, options.success, options.fail, options.complete)
}


/**
 * 清空购物车
 */
function clearCart(options) {
    return api.post('v2/cart/clear', options.params, options.message, options.success, options.fail, options.complete)
  }

  
/**
 * 获取购物车内商品数量
 */
function countCart(options) {
    return api.post('v2/cart/count', options.params, options.message, options.success, options.fail, options.complete)
  }

/**
 * 获取购物车内商品信息
 */
function getCartInfo(options) {
    return api.post('v2/cart/getCart', options.params, options.message, options.success, options.fail, options.complete)
  }

/**
 * 删除购物车内某条目
 * @param id 通过 `getCart` 获取的id
 */
function deleteCartItem(options) {
    return api.post('v2/cart/delete', options.params, options.message, options.success, options.fail, options.complete)
  }

  /**
 * 清空购物车
 */
function clearCartInfo(options) {
  return api.post('v2/cart/clear', options.params, options.message, options.success, options.fail, options.complete)
}

  /**
 * 更新某条目数量
* `*id` 通过 `getCart` 获取的id
* `amount` 新的数量
 */
function updateCartInfo(options) {
    return api.post('v2/cart/update', options.params, options.message, options.success, options.fail, options.complete)
  }

    /**
 * 计算当前购物车内总价
* `fromCart` 指定从购物车为入口
* `skuIds` 用户选中的多个商品规格
 */
function cartPricing(options) {
    return api.post('v2/cart/pricing', options.params, options.message, options.success, options.fail, options.complete)
  }

module.exports = {
    addToCart,
    clearCart,
    countCart,
    getCartInfo,
    deleteCartItem,
    updateCartInfo,
    cartPricing,
    clearCartInfo,
}