/**
 * 配置常量 已下所有均为示例值请以实际开发api文档为准
 */

const BASE_URL_LOCAL = "http://127.0.0.1:3010";
const BASE_URL_DEVELOPMENT = "http://203.195.203.67"; //测试(以实际开发api文档为准)
const BASE_URL_PRODUCTION = "https://www.njjncm.com"; //正式服(以实际开发api文档为准)
const LOGINAPI = "/api/v1/member/login"; //登录接口(以实际开发api文档为准)
const USERINFO = "/api/v1/member/memberinfo"; //用户资料接口(以实际开发api文档为准)

//腾讯云对象存储参数配置
const OSSPARAMETER = {
  bucket: 'admin', //存储桶名称
  appid: '1256953590', //腾讯云中项目APPID
  sid: 'AKIDY2LTREQL1e8Ws4j7PWSClCSXVKyR7qnv', //SecretId
  skey: 'BGBvUs573ucAXjngQ1Vpy66yhGhxBMPL', //SecretKey
  region: 'sh',//对象存储所属地域
};
const FORMIDAPI = "/api/v1/member/formId"; //用于存放用户formId接口(以实际开发api文档为准)
const ENV = "local";
const DEBUG = false;
const BASE_URL = {
  local: BASE_URL_LOCAL,
  development: BASE_URL_DEVELOPMENT,
  production: BASE_URL_PRODUCTION
};

module.exports = {
  BASE_URL,
  ENV,
  DEBUG,
  LOGINAPI,
  USERINFO,
  FORMIDAPI,
  OSSPARAMETER
};
