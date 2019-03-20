/**
 * 配置常量 已下所有均为示例值请以实际开发api文档为准
 * 本文件中的参数如有改动需要重新编译
 * 本文件中的参数如有改动需要重新编译
 * 本文件中的参数如有改动需要重新编译
 */

const BASE_URL_LOCAL = "http://127.0.0.1:3010";
const BASE_URL_DEVELOPMENT = "https://castrolmini.mgcc.com.cn/castrol"; //测试(以实际开发api文档为准
// const BASE_URL_DEVELOPMENT = 'http://192.168.31.119:8080'; //测试(以实际开发api文档为准
const BASE_URL_PRODUCTION = "https://castrolmini.mgcc.com.cn/castrol"; //正式服(以实际开发api文档为准)
// const BASE_URL_PRODUCTION = 'http://192.168.31.119:8080/castrol'; //测试(以实际开发api文档为准
const LOGINAPI = "/api/v1/users/auth/login/wechat"; //登录接口(以实际开发api文档为准)

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
};
