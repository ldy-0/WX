import wepy from "wepy";
import { SHOPID } from "../constant/configConstant";
import { shttp } from "./http";
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
  }
  return res;
};
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
  if (SHOPID) {
    userInfo.source = SHOPID;
  }
  return await shttp
    .post("/api/v1/member/login")
    .send(userInfo)
    .end();
};
export { getCode, signIn };
