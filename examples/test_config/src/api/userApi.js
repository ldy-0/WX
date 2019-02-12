/**
 * 用户相关接口
 */
import api from './api';

/**
 * 登录
 * @param iv  wx.getUserInfo获取
 * @param encryptedData   wx.getUserInfo获取
 * @param code  wx.login获取
 */
function login(options) {
  return api.post('v2/wechat/getSession', options.params, options.message, options.success, options.fail, options.complete, options.method, options.contentType, options.handleErr)
}

/** 检查用户session是否过期 */
function checkSession(options) {
  return api.post('v2/wechat/checkSession', options.params, options.message, options.success, options.fail, options.complete)
}


/**
 * 获取首页功能模块
 */
function getHomeItemList(options) {
  return api.post('v2/homeItem/listByApp', options.params, options.message, options.success, options.fail, options.complete)
}


/**
 * 检查手机号是否注册
 * @param mobile 手机号
 */
function checkIsRegistered(options) {
  return api.post('v2/registered', options.params, options.message, options.success, options.fail, options.complete)
}

/**
 * 获取绑定手机号验证码
 * @param mobile 手机号
 */
function getBindPhoneAuthCode(options) {
  return api.post('v2/register/bindPhone', options.params, options.message, options.success, options.fail, options.complete)
}

/**
 * 校验绑定手机号和验证码
 * @param mobile 手机号
 * @param smsCode  验证码
 */
function checkBindPhoneAuthCode(options) {
  return api.post('v2/register/bindPhone/verify', options.params, options.message, options.success, options.fail, options.complete)
}

/**
 * 绑定手机号
 * @param id    用户ID
 * @param mobile    手机号
 * @param smsCode  验证码
 */
function bindPhone(options) {
  return api.postWithAllResp('v2/user/updatePhoneNew', options.params, options.message, options.success, options.fail, options.complete)
}

/**
 * 获取用户信息
 * @param userId    用户ID
 */
function getUserInfo(options) {
  return api.post('v2/shop/user/userInfo', options.params, options.message, options.success, options.fail, options.complete)
}

/**
 * 获取用户类型
 */
function getUserType(options) {
  return api.post('v2/getUserType', options.params, options.message, options.success, options.fail, options.complete)
}

/**
 * 获取我的消息列表
 */
function getMessageList(options) {
  return api.post('v2/user/myMessage',options.params, options.message, options.success, options.fail, options.complete)
}

/**
 * 获取未读消息数
 */
function getUnReadMessageCount(options) {
  return api.post('v2/user/getUnReadCount',options.params, options.message, options.success, options.fail, options.complete)
}

/**
 * 更新消息状态
 * @param status  消息状态(READ:已读  DELETED:删除)
 */
function updateMessageStatus(options) {
  return api.post('v2/user/updateStatus/' + options.id,options.params, options.message, options.success, options.fail, options.complete)
}

/**
 * 获取消息内容
 * @param id  消息id
 */
function getMessageInfo(options) {
  return api.post('v2/message/view/' +options.id,options.params, options.message, options.success, options.fail, options.complete)
}


/**
 * 修改密码
 * @param oldPwd  旧密码
 * @param newPwd  新密码
 */
function modifyPassword(options) {
  return api.post('v2/user/change-pwd',options.params, options.message, options.success, options.fail, options.complete)
}


/**
 * 上传图片
 */
function uploadImg(options){
  return api.uploadFile(options.filePath,options.success,options.fail,options.complete,options.progress)
}

/**
 * 获取未读消息
 */
function getUnReadMessageList(options){
  return api.post('v2/user/myUnreadMessage',options.params, options.message, options.success, options.fail, options.complete)
}


/**
 * 获取首页轮播图
 */
function getCarousel(options){
  return api.post('v2/openapi/home/getCarousel',options.params, options.message, options.success, options.fail, options.complete)
}

/**
 * 获取积分明细
 */
function getPointsRecord(options){
  return api.post('v2/yundou/record',options.params, options.message, options.success, options.fail, options.complete)
}

/**
 * 设置车辆信息
 */
function setCarInfo(options){
  return api.post('v2/user/setCar',options.params, options.message, options.success, options.fail, options.complete)
}


/**
 * 设置生日
 */
function setBirthday(options){
  return api.post('v2/user/setBirthday',options.params, options.message, options.success, options.fail, options.complete)
}


/**
 * 设置生日
 */
function setNickName(options){
  return api.post('v2/user/setNickName',options.params, options.message, options.success, options.fail, options.complete)
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
 * 积分明细
 */
function getYundouRecord(options) {
  return api.post('v2/yundou/recordList', options.params, options.message, options.success, options.fail, options.complete)
}

/**
 * 我的收藏列表
 */
function getMyCollection(options) {
  return api.post('v2/productCollection/listByApp', options.params, options.message, options.success, options.fail, options.complete)
}

/**
 * 热门产品列表
 */
function getHomeDisvocerList(options) {
  return api.post('v2/openapi/home/getProductTop', options.params, options.message, options.success, options.fail, options.complete)
}
/**
 * 创建用户
 * @param mobile    手机号
 * @param pwd   密码，现在没有，默认123456
 * @param smsCode  验证码 
 * @param addressId  地区
 */
function registerUser(options) {
  return api.post('v2/register/create', options.params, options.message, options.success, options.fail, options.complete)
}

/**
 * 获取登录验证码
 * @param mobile 手机号
 */
function sendSmsCode(options) {
  return api.post('v2/send-sms-code', options.params, options.message, options.success, options.fail, options.complete)
}

/**
 * 
 * 获取session
 * 
 */
function getSessionDev(options) {
  return api.post('v2/getSessionDev', options.params, options.message, options.success, options.fail, options.complete)
}

module.exports = {
  login: login,
  getHomeItemList: getHomeItemList,
  checkIsRegistered:checkIsRegistered,
  getBindPhoneAuthCode:getBindPhoneAuthCode,
  checkBindPhoneAuthCode:checkBindPhoneAuthCode,
  bindPhone:bindPhone,
  getUserInfo:getUserInfo,
  getUserType:getUserType,
  getMessageList:getMessageList,
  getUnReadMessageCount:getUnReadMessageCount,
  updateMessageStatus:updateMessageStatus,
  getMessageInfo:getMessageInfo,
  modifyPassword:modifyPassword,
  uploadImg:uploadImg,
  getUnReadMessageList:getUnReadMessageList,
  getCarousel,
  setCarInfo,
  setBirthday,
  updataShopInfo,
  setNickName,
  getYundouRecord,
  getMyCollection,
  getHomeDisvocerList,
  registerUser,
  sendSmsCode,
  getSessionDev,
}