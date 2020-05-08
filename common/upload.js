import COS from '@/common/cos-v5-tencent';
import api from '@/api/api';

const TENCENT_BUCKET = 'blkx-1302950457'; 
const TENCENT_REGION = 'ap-nanjing'; 
const CDNURL = 'https://blkx-1302950457.file.myqcloud.com'

let cos = null;

getImgKey();

async function getImgKey() {
  const res = await api.getImgKey({});
  if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '获取图片上传信息失败!', icon: 'none', });

  if(res.status==0){
    let cosOpt = {
      TmpSecretId: res.data.credentials.tmpSecretId,
      TmpSecretKey: res.data.credentials.tmpSecretKey,
      XCosSecurityToken: res.data.credentials.sessionToken,	
      StartTime: res.data.Timestamp,
      ExpiredTime: res.data.expiredTime,
    };

    cos = new COS({ getAuthorization(opt, cb){ cb(cosOpt); } });
  }
}

function uploadImg(file) {
  let opt = {
				Bucket: TENCENT_BUCKET,
				Region: TENCENT_REGION,
				Key: file.name || file.path.substr(file.path.lastIndexOf('/') + 1),
				FilePath: file.path,
      };

  return new Promise((resolve, reject) => {
    cos.postObject(opt, (err, data) => {
      if(data && data.Location) data.cdnUrl = data.Location.replace(/.*?(?=\/)/, `${CDNURL}`);

      resolve(err || data);
    });
  });
}

async function uploadImgList(list) {
  let res,
      imgList = [];

  if(!(list && list.length)) return imgList;

  for(let i = 0, len = list.length; i < len; i++){
    res = await uploadImg(list[i]);

    if(res && res.cdnUrl) imgList.push(res.cdnUrl);
  }

  return imgList.length ? imgList : null;
}

export default {
  uploadImg,
  uploadImgList,

  CDNURL,
}