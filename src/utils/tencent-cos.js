import randomize from "randomatic";
import wepy from "wepy";
import CryptoJS from "./crypto";
import { TMP_REG, IMG_REG } from "../constant/regExpConstant";
import { OSSPARAMETER } from "../constant/configConstant";

let config = {
  bucket: OSSPARAMETER.bucket,
  appid: OSSPARAMETER.appid,
  sid: OSSPARAMETER.sid,
  skey: OSSPARAMETER.skey,
  region: OSSPARAMETER.region,
  currentSig: null,
  expireTime: null
};

let getUrl = (filePath) => {
	return 'https://' + config.region + '.file.myqcloud.com/files/v2/' + config.appid +
		'/' + config.bucket + '/' + filePath + '?sign=' + getAppSign(filePath);
};

let getAppSign = (filePath) => {
  // 获取签名 必填参数
  let now = parseInt(new Date().getTime() / 1000);
  let e = now + 600; // 签名过期时间为当前+60s
  if (config.currentSig && config.expireTime && config.expireTime > now) {
    return config.currentSig;
  } else {
    let random = parseInt(Math.random() * Math.pow(2, 32));
    let str =
      "a=" +
      config.appid +
      "&k=" +
      config.sid +
      "&e=" +
      e +
      "&t=" +
      now +
      "&r=" +
      random +
      "&f=" +
      "&b=" +
      config.bucket;

    let sha1Res = CryptoJS.HmacSHA1(str, config.skey); // 这里使用CryptoJS计算sha1值，你也可以用其他开源库或自己实现
    let strWordArray = CryptoJS.enc.Utf8.parse(str);
    let resWordArray = sha1Res.concat(strWordArray);
    let res = resWordArray.toString(CryptoJS.enc.Base64);

    if (encodeURIComponent) res = encodeURIComponent(res);
    config.currentSig = res;
    config.expireTime = e;
    return res;
  }
};

let uploadFile = async (filePath, options) => {
  try {
    // const contextStorage = await wepy.getStorage({ key: 'contextId' });
    const time = new Date().getTime();
    const randomStr = randomize("Aa0", 16);
    let localFileName = "";
    const devtools = wx.getStorageSync("devtools");
    if (devtools === "true") {
      const nameArr = filePath.split(/\/|\./);
      localFileName = `${nameArr[3]}.${nameArr[6]}`;
    } else {
      const nameArr = filePath.split(/\/|\./);
      const nameArrLength = nameArr.length;
      localFileName = `${nameArr[nameArrLength - 2]}.${
        nameArr[nameArrLength - 1]
      }`;
    }
    const cloudPath = `project/_${time}_${randomStr}_${localFileName}`;
    const uploadOpt = {
      url: getUrl(cloudPath),
      filePath: filePath,
      name: "fileContent",
      header: { "Content-Type": "multipart/form-data" },
      formData: { op: "upload", insertOnly: 1 }
    };
    const uploadRes = await wepy.uploadFile(uploadOpt);
    const parseRes = JSON.parse(uploadRes.data);
    const sourceUrl = parseRes.data.source_url.replace(/http/, "https");
    return sourceUrl;
  } catch (error) {
    console.error(error);
    return error;
  }
};

/**
 * 自动将array里面的非远程图片链接上传，并反正完整的远程图片链接array
 * @param {string[]} paths image的列表，可以包含远程图片链接和临时图片链接
 */
const uploadSeriesFile = async paths => {
  try {
    let promises = [];
    paths.forEach(item => {
      if (TMP_REG.test(item)) {
        promises.push(uploadFile(item));
      }
    });
    if (promises.length > 9) {
      return console.error(
        "ERROR: cannot upload more than 9 images at one time."
      );
    }
    const res = await Promise.all(promises);
    paths.forEach((item, index) => {
      if (TMP_REG.test(item)) {
        paths[index] = res.shift();
      }
    });
    return paths;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export { getUrl, getAppSign, uploadFile, uploadSeriesFile };
