import wepy from 'wepy';
import { TMP_REG } from '../constant/regExpConstant';
let upImgone = async (filePath) => {
  try {
    const uploadOpt = {
      url: "https://www.junrencar.com/v1/public/images?bucket=shop-license",
      filePath: filePath,
      name: "images",
      formData: {}
    };
    const uploadRes = await wepy.uploadFile(uploadOpt);
    const parseRes = JSON.parse(uploadRes.data);
    let sourceUrl = parseRes.result.join();
    sourceUrl = `https://www.junrencar.com${sourceUrl}`;
    return sourceUrl;
  } catch (error) {
    console.error(error);
    return error;
  }
};
const upImg = async (paths) => {
  try {
    let promises = [];
    paths.forEach((item) => {
      if (TMP_REG.test(item)) {
        promises.push(upImgone(item));
      }
    });
    if (promises.length > 9) {
      return console.error("ERROR: cannot upload more than 9 images at one time.");
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
export {
  upImg,
};