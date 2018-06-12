/**
 * 配置常量
 */

const BASE_URL_LOCAL = "http://127.0.0.1:3010";
const BASE_URL_DEVELOPMENT = "https://temp.healthsource.com.cn";
const BASE_URL_PRODUCTION = "https://temp.healthsource.com.cn";//正式服
// const BASE_URL_PRODUCTION = "http://qingsongtest.healthsource.com.cn";
const ENV = "local";
const DEBUG = false;
const CONTEXT = 1;
const BASE_URL = {
  local: BASE_URL_LOCAL,
  development: BASE_URL_DEVELOPMENT,
  production: BASE_URL_PRODUCTION,
};

module.exports = {
  CONTEXT,
  BASE_URL,
  ENV,
  DEBUG
};
