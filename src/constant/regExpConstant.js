/**
 * 正则验证
 */
//手机号
const TEL_REG = /^((0\d{2,3}-\d{7,8})|(1\d{10}))$/;
//邮箱
const EMAIL_REG = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
//身份证
const IDCARD_REG = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/;
//图片上传，避免重复
const TMP_REG = /tmp/;
const IMG_REG = /\.(jpg|JPG|gif|GIF|bmp|BMP|png|PNG|jpeg|JPEG|svg|SVG|)$/;

module.exports = {
  TEL_REG,
  EMAIL_REG,
  IDCARD_REG,
  TMP_REG,
  IMG_REG
};
