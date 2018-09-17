/**
 * 配置常量
 */

const BASE_URL_LOCAL = "http://127.0.0.1:3010";
const BASE_URL_DEVELOPMENT = "http://203.195.203.67"; //测试
const BASE_URL_PRODUCTION = "https://www.njjncm.com"; //正式服
const LOGINAPI = "/api/v1/member/login"; //登录接口(以实际开发api文档为准)
const USERINFO = "/api/v1/member/memberinfo"; //用户资料接口(以实际开发api文档为准)
const ENV = "local";
const DEBUG = false;
const BASE_URL = {
  local: BASE_URL_LOCAL,
  development: BASE_URL_DEVELOPMENT,
  production: BASE_URL_PRODUCTION,
  LOGINAPI: LOGINAPI,
  USERINFO: USERINFO
};

module.exports = {
  BASE_URL,
  ENV,
  DEBUG,
  LOGINAPI,
  USERINFO
};
