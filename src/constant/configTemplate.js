/**
 * 配置常量 已下所有均为示例值请以实际开发api文档为准
 * 本文件中的参数如有改动需要重新编译
 * 本文件中的参数如有改动需要重新编译
 * 本文件中的参数如有改动需要重新编译
 */

const BASE_URL_LOCAL = "http://127.0.0.1:3010";
const BASE_URL_DEVELOPMENT = "https://test14.healthsource.com.cn"; //测试(以实际开发api文档为准)
const BASE_URL_PRODUCTION = "https://test14.healthsource.com.cn"; //正式服(以实际开发api文档为准)
const LOGINAPI = "/api/v2/member/login"; //登录接口(以实际开发api文档为准)

//腾讯云对象存储参数配置
const OSSPARAMETER = {
  bucket: 'admin', //存储桶名称
  appid: '1256953590', //腾讯云中项目APPID
  sid: 'AKIDY2LTREQL1e8Ws4j7PWSClCSXVKyR7qnv', //SecretId
  skey: 'BGBvUs573ucAXjngQ1Vpy66yhGhxBMPL', //SecretKey
  region: 'sh',//对象存储所属地域
};

//阿里云对象存储参数配置
const OSSALIYUN = '/api/v2/admin/imgkeyali';//获取阿里云对象存储参数接口(以实际开发api文档为准)

const FORMIDAPI = "/api/v2/member/formId"; //用于存放用户formId接口(以实际开发api文档为准)
const ENV = "local";
const DEBUG = false;
const BASE_URL = {
  local: BASE_URL_LOCAL,
  development: BASE_URL_DEVELOPMENT,
  production: BASE_URL_PRODUCTION,
};

module.exports = {
  BASE_URL,
  ENV,
  DEBUG,
  LOGINAPI,
  FORMIDAPI,
  OSSPARAMETER,
  OSSALIYUN
};
