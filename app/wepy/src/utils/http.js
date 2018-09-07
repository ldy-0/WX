// import { BASE_URL, ENV } from '../constant/configConstant';
import wepy from 'wepy';


const ENV = "development";
const BASE_URL = {
  local: "http://127.0.0.1:3010",
  // development: "https://uat.handeson.com",
  // production: "https://uat.handeson.com",
  // development: "http://47.100.250.46",
  // production: "http://47.100.250.46",
  // development: 'http://47.100.41.165',
  // production: 'http://47.100.41.165',
  development: "https://uatapi.handeson.com",
  production: "https://uatapi.handeson.com",
  // development: "http://uatapi.handeson.com",
  // production: "http://uatapi.handeson.com",
  // development: "https://hwapi.handeson.com",
  // production: "https://hwapi.handeson.com",
};

class rp {
  constructor(url, type, sessionId) {
    this.method = type;
    this.url = `${BASE_URL[ENV]}${url}`;
    this.qs = {};
    this.headers = {
      healthsource: 'hds',
      thirdSessionId: sessionId, // '9pgSCVwkXgap50aABjlJOhwnAQO062Nd'
      thirdVersionId: 20180112,
    };
    this.body = {};
  }
  header(v1, v2) {
    if (typeof v1 === 'object') {
      this.headers = v1;
    } else {
      this.headers[v1] = v2;
    }
    return this;
  }
  query(v1, v2) {
    if (typeof v1 === 'object') {
      this.qs = v1;
    } else {
      this.qs[v1] = v2;
    }
    return this;
  }
  send(data) {
    this.body = data;
    return this;
  }
  async end() {
    let auth = wx.getStorageSync('authorization');
    if (auth) {
      this.header('Authorization', auth);
    }
    let isJsonType = this.method === 'POST' || this.method === 'PUT';
    let rpOpt = {
      url: this.url,
      header: this.headers,
      method: this.method,
      data: this.body
    };
    let qs = [];
    for (let k in this.qs) {
      qs.push(`${k}=${this.qs[k]}`);
    }
    if (qs.length !== 0) {
      qs = qs.join('&');
      rpOpt.url += rpOpt.url.indexOf('?') === -1 ? `?${qs}` : `&${qs}`;
    }
    if (isJsonType) {
      rpOpt.data = this.body;
      rpOpt.dataType = 'json';
      rpOpt.header['Content-Type'] = 'application/json';
    }
    let res = await wepy.request(rpOpt);
    return res.data;
  }
}
const shttp = {
  get: (url, id) => {
    return new rp(url, 'GET', id);
  },
  post: (url) => {
    return new rp(url, 'POST');
  },
  put: (url) => {
    return new rp(url, 'PUT');
  },
  delete: (url) => {
    return new rp(url, 'DELETE');
  },
};

export {
  shttp,
  rp
};