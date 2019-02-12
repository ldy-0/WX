/**
 * 地址相关接口
 */
import api from './api';



/**
 * 获取地址列表
 */
function getAddressList(options) {
  return api.post('v2/address/list', options.params, options.message, options.success, options.fail, options.complete)
}


/**
 * 获取地址详情
 */
function getAddressDetail(options) {
  return api.post('v2/address/'+options.id, options.params, options.message, options.success, options.fail, options.complete)
}

/**
 * 保存地址
 * @param consignee 收件人姓名
 * @param phone 收件人手机号
 * @param zoneId    区的id
 * @param street    详细街道
 * @param certificateId 传null
 * @param isDefault 是否设为默认地址
 */
function saveAddress(options) {
  return api.post('v2/address/save', options.params, options.message, options.success, options.fail, options.complete)
}

/**
 * 获取默认地址
 */
function getDefaultAddress(options) {
  return api.post('v2/address/getDefault', options.params, options.message, options.success, options.fail, options.complete)
}

/**
 * 修改地址
 * @param id  地址id
 * @param consignee 收件人姓名
 * @param phone 收件人手机号
 * @param zoneId    区的id
 * @param street    详细街道
 * @param certificateId 传null
 * @param isDefault 是否设为默认地址
 */
function updateAddress(options) {
  return api.post('v2/address/'+options.params.id+'/update', options.params, options.message, options.success, options.fail, options.complete)
}

/**
 * 删除地址
 * @param id  地址id
 */
function deleteAddress(options) {
  return api.post('v2/address/'+options.id+'/delete', options.params, options.message, options.success, options.fail, options.complete)
}

module.exports = {
  getAddressList:getAddressList,
  getAddressDetail:getAddressDetail,
  saveAddress:saveAddress,
  updateAddress:updateAddress,
  deleteAddress:deleteAddress,
  getDefaultAddress,
}