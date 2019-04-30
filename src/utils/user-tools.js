import wepy from "wepy";
import { shttp } from "./http";
import { LOGINAPI } from "../constant/configConstant";
//获取code码
const getCode = async () => {
  let res = {
    status: false,
    code: "",
    message: ""
  };
  try {
    let loginRes = await wepy.login();
    res.status = true;
    res.code = loginRes.code;
  } catch (err) {
    res.message = err.message;
    console.error('login code: ', str);
  }

  return res;
};
//登录逻辑
const signIn = async (getUserInfo = false, shareId = "") => {
  let userInfo = {},
    codeInfo;
  codeInfo = await getCode();
  if (getUserInfo) {
    userInfo = await new Promise(resolve => {
      wx.getUserInfo({
        success: res => {
          return resolve(res);
        },
        fail: () => {
          return resolve({});
        }
      });
    });
  }
  if (shareId) {
    userInfo.memberId = shareId;
  }
  if (codeInfo.status) {
    userInfo.code = codeInfo.code;
  }
  return await shttp
    .post(LOGINAPI)
    .send(userInfo)
    .end();
};
export { getCode, signIn };
