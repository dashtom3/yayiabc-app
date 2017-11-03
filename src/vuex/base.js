import axios from 'axios'
import router from '../router'
import {tokenMethods} from "./util"
import {Toast, Indicator, MessageBox} from 'mint-ui';


// const HOST = 'http://47.93.48.111:6181/api'; //测试端口

const HOST = 'http://wap.yayiabc.com:6181/api';
//    const HOST = 'http://wap.yayiabc.com:8080/api';
// const HOST = 'http://123.56.220.72:8089/api'; //测试端口

// const HOST = 'http://47.93.48.111:6181/api';  //正式数据端口

export default function (url, params = {}) {
  return new Promise((resolve, reject) => {
    Indicator.open();
    axios.get(HOST + url, {params})
      .then((res) => {
        resolve(res.data)
        Indicator.close();
      }).catch(err => {
        reject(err)
        Indicator.close();
      });
  });
}

export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    Indicator.open();
    axios.get(HOST + url, {params})
      .then((res) => {
        if (res.data.callStatus === 'SUCCEED') {
          resolve(res.data.data);
          Indicator.close();
        } else {
          if (res.data.data) resolve(res.data);
          Indicator.close();
        }
      }).catch(err => reject(err));
  });
}

export function getWithVerfiCode(url, params = {}) {
  return new Promise((resolve, reject) => {
    Indicator.open();
    axios.get(HOST + url, {params})
      .then((res) => {
        if (res.data.callStatus === 'SUCCEED') {
          resolve(res.data);
          Indicator.close();
        } else if (res.data.callStatus === 'FAILED')  {
          resolve(res.data);
          Indicator.close();
        }
      }).catch(err => reject(err));
  });
}
export function noErrorGet(url, params = {}) {
  return new Promise((resolve, reject) => {
    Indicator.open();
    axios.get(HOST + url, {params})
      .then((res) => {
        resolve(res.data);
        Indicator.close();
      }).catch(err => {
        reject(err);
      Indicator.close();
    });
  });
}

export function noErrorTokenGet(url, params = {}) {
  return new Promise((resolve, reject) => {
    Indicator.open();
    axios.defaults.headers['token'] = tokenMethods.getToken()
    axios.get(HOST + url, {params})
      .then((res) => {
        resolve(res.data);
        Indicator.close();
      }).catch(err => {
        reject(err)
      Indicator.close();
    });
  });
}

export function noErrorTokenPost(url, params) {
  return new Promise((resolve, reject) => {
    Indicator.open();
    var formData = new FormData()
    for (let i in params) {
      if (params[i] != null) {
        formData.append(i, params[i])
      }
    }
    axios.defaults.headers['token'] = tokenMethods.getToken()
    axios.post(HOST + url, formData)
      .then((res) => {
        resolve(res.data);
        Indicator.close();
      }).catch(err => {
        reject(err);
      Indicator.close();
    });
  });
}

export function wx_get(url, params = {}) {
  return new Promise((resolve, reject) => {
    Indicator.open();
    axios.get(HOST + url, {params})
      .then((res) => {
        if (res.data.callStatus === 'SUCCEED') {
          resolve(res.data);
          Indicator.close();
        } else {
          resolve(res.data);
          Indicator.close();
        }
      }).catch(err => {
        reject(err);
      Indicator.close();
    });
  });
}

export function noErrorPost(url, params) {
  return new Promise((resolve, reject) => {
    Indicator.open();
    var formData = new FormData()
    for (let i in params) {
      if (params[i] != null) {
        formData.append(i, params[i])
      }
    }
    axios.post(HOST + url, formData)
      .then((res) => {
        resolve(res.data);
        Indicator.close();
      }).catch(err => {
        reject(err);
      Indicator.close();
    });
  });
}


export function post(url, params) {
  return new Promise((resolve, reject) => {
    Indicator.open();
    const temp = new FormData();
    Object.entries(params).forEach((item) => {
      if (item[1] != null) {
        temp.append(item[0], item[1]);
      }
    });
    axios.post(HOST + url, temp)
      .then((res) => {
        // console.log(JSON.stringify(res), 'base>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..')
        if (res.data.callStatus === 'SUCCEED') {
          resolve(res);
          Indicator.close();
        } else {
          resolve(res);
          Indicator.close();
        }
      }).catch((err) => {
      // console.log(JSON.stringify(err), 'base>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..')
      reject('网络请求错误');
      Toast({message: '网络请求错误!', duration: 3000})
      Indicator.close();
    });
  });
}

export function getWithToken(url, params = {}) {
  return new Promise((resolve, reject) => {
    Indicator.open();
    axios.defaults.headers['token'] = tokenMethods.getWapToken()
    axios.get(HOST + url, {params})
      .then((res) => {
        if (res.data.callStatus === 'SUCCEED') {
          // console.log(res.data)
          Indicator.close();
          resolve(res.data);
          return false
        }
        if (res.data.errorCode === 'RE_LOGIN') {
          // console.log(res.data.errorCode)
          Indicator.close();
          tokenMethods.removeMsg()
          resolve(res.data);
          // router.push({path: '/logIn'})
          // Toast({message: '登录过期，请重新登录！', duration: 1500})
          return false
        }
        if (res.data.callStatus === 'FAILED') {
          Indicator.close();
          resolve(res.data);
          return false
        }
      }).catch((err) => {
      // console.log(JSON.stringify(err), 'base>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..')
      reject('网络请求错误');
      Indicator.close();
      Toast({message: '网络请求错误!', duration: 3000})
    });
  });
}

export function postWithToken(url, params) {
  return new Promise((resolve, reject) => {
    Indicator.open();
    var formData = new FormData()
    for (let i in params) {
      if (params[i] != null) {
        formData.append(i, params[i])
      }
    }
    axios.defaults.headers['token'] = tokenMethods.getWapToken()
    axios.post(HOST + url, formData)
      .then((res) => {
        if (res.data.callStatus === 'SUCCEED') {
          Indicator.close();
          resolve(res);
          return false
        }
        if (res.data.errorCode === 'RE_LOGIN') {
          Indicator.close()
          resolve(res)
          // router.push({path: '/logIn'})
          // Toast({message: '登录过期，请重新登录！', duration: 1500})
          return false
        }
        if (res.data.callStatus === 'FAILED') {
          resolve(res);
          Indicator.close();
          return false
        }
      }).catch(() => {
      reject('网络请求错误');
      Indicator.close();
      Toast({message: '网络请求错误!', duration: 3000})
    });
  });
}


//创客带token的get请求
export function getWithSaleToken(url, params = {}) {
  return new Promise((resolve, reject) => {
    Indicator.open();
    axios.defaults.headers['saleToken'] = tokenMethods.getSalesToken()
    axios.get(HOST + url, {params})
      .then((res) => {
        Indicator.close()
        //鉴权判断
        if (res.data.errorCode === 'RE_LOGIN_SALE') {
          router.push({path: '/salesLogin'})
          Toast({message: '登录过期，请重新登录！', duration: 1500})
          Indicator.close();
          return
        }
        resolve(res.data)
        Indicator.close();
      })
      .catch(() => {
        Indicator.close()
        reject('网络请求错误')
        Toast({message: '网络请求错误!', duration: 3000})
      });
  });
}

//创客带token的post请求
export function postWithSaleToken(url, params) {
  return new Promise((resolve, reject) => {
    Indicator.open();
    var formData = new FormData()
    for (let i in params) {
      if (params[i] != null) {
        formData.append(i, params[i])
      }
    }
    axios.defaults.headers['saleToken'] = tokenMethods.getSalesToken()
    axios.post(HOST + url, formData)
      .then((res) => {
        Indicator.close()
        if (res.data.errorCode === 'RE_LOGIN_SALE') {
          router.push({path: '/salesLogin'})
          Toast({message: '登录过期，请重新登录！', duration: 1500})
          Indicator.close();
          return
        }
        resolve(res.data);
        Indicator.close();
      })
      .catch(() => {
        Indicator.close()
        reject('网络请求错误');
        Toast({message: '网络请求错误!', duration: 3000})
      });
  });
}
