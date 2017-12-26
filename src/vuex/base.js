import axios from 'axios'
import router from '../router'
import {tokenMethods} from "./util"
import {Toast, Indicator, MessageBox} from 'mint-ui';


// const HOST = 'http://47.93.48.111:6181/api'; //测试端口

// const HOST = 'http://wap.yayiabc.com:6181/api';
const HOST = 'http://116.62.228.3:8080/api';
// const HOST = 'http://localhost:8080/api';
  //  const HOST = 'http://wap.yayiabc.com:8080/api';
// const HOST = 'http://123.56.220.72:8089/api'; //测试端口
// const HOST = 'http://47.93.48.111:6181/api';  //正式数据端口
axios.defaults.timeout = 15000;
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
        console.log('get请求:'+res)
        if (res.status === 500 || res.status === 503 || res.status === 504 || res.status === 404 || res.status === 502) {
          Indicator.close();
          ServerError();
          return
        }
        if (res.data.callStatus === 'SUCCEED') {
          resolve(res.data.data);
        } else {
          if (res.data.data) resolve(res.data);
        }
        Indicator.close();
      }).catch(err => {
        console.log('getError:'+err)
        Indicator.close();
        ServerError();
        reject(err)
      });
  });
}
function ServerError(){
  Indicator.open({
    text: '服务器出小差了',
    spinnerType: 'fading-circle'
  });
  setTimeout(() => {
    Indicator.close();
  }, 2000)
}

  export function getNoLoading(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get(HOST + url, {params})
        .then((res) => {
          console.log('getNoLoading请求:'+res)
          if (res.status === 500 || res.status === 503 || res.status === 504 || res.status === 404 || res.status === 502) {
            ServerError();
            return
          }
          if (res.data.callStatus === 'SUCCEED') {
            resolve(res.data.data);
          } else {
            if (res.data.data) resolve(res.data);
          }
        }).catch(err => {
          console.log('getNoLoadingError:'+err)
          ServerError();
          reject(err)
        });
    });
  }

export function geters(url, params = {}) {
  return new Promise((resolve, reject) => {
    Indicator.open();
    axios.get(HOST + url, {params})
      .then((res) => {
        console.log('geters请求:'+res)
        if (res.status === 500 || res.status === 503 || res.status === 504 || res.status === 404 || res.status === 502) {
          Indicator.close();
          ServerError();
          return
        }
        if (res.data.callStatus === 'SUCCEED') {
          resolve(res.data);
          Indicator.close();
        } else {
          if (res.data) resolve(res.data);
          Indicator.close();
        }
      }).catch(err => {
        console.log('getersError:'+err)
        Indicator.close();
        ServerError();
        reject(err)
      });
  });
}



export function getWithVerfiCode(url, params = {}) {
  return new Promise((resolve, reject) => {
    Indicator.open();
    axios.get(HOST + url, {params})
      .then((res) => {
        console.log('getWithVerfiCode请求:'+res)
        if (res.data.callStatus === 'SUCCEED') {
          resolve(res.data);
          Indicator.close();
        } else if (res.data.callStatus === 'FAILED')  {
          resolve(res.data);
          Indicator.close();
        }
      }).catch(err => {
        console.log('getWithVerfiCodeError:'+err)
        Indicator.close();
        ServerError();
        reject(err)
      });
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
        console.log("post请求:"+res)
        if (res.status === 500 || res.status === 503 || res.status === 504 || res.status === 404 || res.status === 502) {
          Indicator.close();
          ServerError();
          return
        }
        if (res.data.callStatus === 'SUCCEED') {
          resolve(res);
        } else {
          resolve(res);
        }
        Indicator.close();
      }).catch((err) => {
        reject('网络请求错误');
        console.log("post请求Error:"+res)
        ServerError();
        Indicator.close();
    });
  });
}

export function posts(url, params) {
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
        console.log("posts请求:"+res)
        if (res.status === 500 || res.status === 503 || res.status === 504 || res.status === 404 || res.status === 502) {
          Indicator.close();
          ServerError();
          return
        }
        if (res.data.callStatus === 'SUCCEED') {
          resolve(res.data);
          Indicator.close();
        } else {
          resolve(res);
          Indicator.close();
        }
      }).catch((err) => {
        console.log("posts请求Error:"+res)
        ServerError();
        Indicator.close();
      reject('网络请求错误');
    });
  });
}

export function getWithToken(url, params = {}) {
  return new Promise((resolve, reject) => {
    Indicator.open();
    axios.defaults.headers['token'] = tokenMethods.getWapToken()
    axios.get(HOST + url, {params})
      .then((res) => {
        console.log("getWithToken请求:"+res)
        if (res.status === 500 || res.status === 503 || res.status === 504 || res.status === 404 || res.status === 502) {
          Indicator.close();
          ServerError();
          return
        }
        if (res.data.callStatus === 'SUCCEED') {
          Indicator.close();
          resolve(res.data);
          return false
        }
        if (res.data.errorCode === 'RE_LOGIN') {
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
        console.log("getWithToken请求Error:"+res)
        ServerError();
        Indicator.close();
       reject('网络请求错误');

    });
  });
}

export function getWithTokenNoLoading(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.defaults.headers['token'] = tokenMethods.getWapToken()
    axios.get(HOST + url, {params})
      .then((res) => {
        console.log("getWithTokenNoLoading请求:"+res)
        if (res.status === 500 || res.status === 503 || res.status === 504 || res.status === 404 || res.status === 502) {
          ServerError();
          return
        }
        if (res.data.callStatus === 'SUCCEED') {
          resolve(res.data);
          return false
        }
        if (res.data.errorCode === 'RE_LOGIN') {
          // console.log(res.data.errorCode)
          tokenMethods.removeMsg()
          resolve(res.data);
          // router.push({path: '/logIn'})
          // Toast({message: '登录过期，请重新登录！', duration: 1500})
          return false
        }
        if (res.data.callStatus === 'FAILED') {
          resolve(res.data);
          return false
        }
      }).catch((err) => {
      console.log("getWithTokenNoLoading请求Error:"+res)
      ServerError();
      reject('网络请求错误');
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
        console.log("postWithToken请求:"+res)
        if (res.status === 500 || res.status === 503 || res.status === 504 || res.status === 404 || res.status === 502) {
          Indicator.close();
          ServerError();
          return
        }
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
        console.log("postWithToken请求Error:"+res)
        ServerError();
        Indicator.close();
          reject('网络请求错误');
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
        if (res.status === 500 || res.status === 503 || res.status === 504 || res.status === 404 || res.status === 502) {
          Indicator.close();
          ServerError();
          return
        }
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
        Toast({message: '服务器出小差了!', duration: 3000})
      });
  });
}
//创客带token的get请求
export function getWithSaleTokenNull(url, params = {}) {
  return new Promise((resolve, reject) => {
    Indicator.open();
    axios.defaults.headers['saleToken'] = 'saleToken'
    axios.get(HOST + url, {params})
      .then((res) => {
        resolve(res.data)
        Indicator.close();
      })
      .catch(() => {
        Indicator.close()
        reject('网络请求错误')
        Toast({message: '服务器出小差了!', duration: 3000})
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
        if (res.status === 500 || res.status === 503 || res.status === 504 || res.status === 404 || res.status === 502) {
          Indicator.close();
          ServerError();
          return
        }
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
        Toast({message: '服务器出小差了!', duration: 3000})
      });
  });
}
