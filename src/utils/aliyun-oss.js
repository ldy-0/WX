import wepy from "wepy";
import { TMP_REG, IMG_REG } from "../constant/regExpConstant";
import { OSSALIYUN } from "../constant/configConstant";
import { shttp } from "../utils/http";

let uploadFile = async filePath => {
  try {
    // let myDate = new Date();
    // let ossPath = "seekings/" + myDate.getFullYear();

    // let aliyunInfo = wx.getStorageSync("aliyunInfo");
    // if (aliyunInfo) {
    //   console.log(aliyunInfo);
    // } else {
    //   const accessInfo = await shttp.get(OSSALIYUN).end();
    //   if (accessInfo.status === 0) {
    //     wx.setStorageSync("aliyunInfo", accessInfo.data);
    //     aliyunInfo = accessInfo.data;
    //   }
    // }
    let aliyunInfo = null;
    const accessInfo = await shttp.get(OSSALIYUN).end();
    if (accessInfo.status === 0) {
      aliyunInfo = accessInfo.data;
    } else {
      console.log(accessInfo.error);
    }
    let filenameurl = filePath;
    let index1 = filenameurl.lastIndexOf(".");
    let index2 = filenameurl.length;
    let postf = filenameurl.substring(index1, index2); //后缀名
    const fileRandName = Date.now() + "" + parseInt(Math.random() * 1000);
    let fileName = fileRandName + postf;
    let fileKey = fileName;
    console.log(fileKey);
    const uploadRes = await wepy.uploadFile({
      url: aliyunInfo.host,
      filePath: filePath,
      name: "file",
      formData: {
        Filename: "${filename}",
        key: fileKey,
        policy: aliyunInfo.policy,
        OSSAccessKeyId: aliyunInfo.accessid,
        signature: aliyunInfo.signature,
        success_action_status: "200"
      }
    });
    let sourceUrl = "";
    if (uploadRes.statusCode === 200) {
      sourceUrl = aliyunInfo.host + "/" + fileKey;
    }
    console.log(sourceUrl);
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

export { uploadFile, uploadSeriesFile };
