//重构的请求 处理
import $ from 'jquery';
import req from 'superagent';
import router from '@/routes.js';

function Promise(async_task){
  if(typeof async_task == 'function'){
    var $d = $.Deferred();
    async_task($d.resolve, $d.reject);
    return $d;
  }
}

function _end_callback(resolve, reject) {
  return function(err, res) {
    if (err) {
      console.error(err);
      reject('请求失败！');
      return;
    }
    if (res.ok) {
      if(res.body.code != undefined){
        var {code, msg } = res.body;
        if(code === 200 || code === 0){
          resolve(data, msg);
        }else {
          console.error(msg || 'request error');
          reject(msg, code);
        }
      }else{
        var { result : {error_code, error_msg, code, msg }, data } = res.body;
        if(error_code != undefined){
          if (error_code === 200 || error_code === 0) {
            resolve(data, error_msg);
          }else {
            console.error(error_msg || 'request error');
            reject(error_msg, error_code);
          }
        }else if(code != undefined){
          if (code === 200 || code === 0) {
            resolve(data, msg);
          }else if(code === 400003){
            reject(msg, code);
            router.replace({
                path: '/login',
            })
          }else {
            console.error(msg || 'request error');
            reject(msg, code);
          }
        }
      }

    } else {
      reject(res.text || 'error');
    }
  };
}

//基本封装
export function get(url, data) {
  var r;
  var p = new Promise(function(resolve, reject) {
    r = req.get(url)
      .query(data)
      .end(_end_callback(resolve, reject));
  });
  p.abort = r.abort.bind(r);
  return p;
}

/*export function post(url, data) {
  var r;
  var p = new Promise(function(resolve, reject) {
    r = req.post(url)
      .send(data)
      .end(_end_callback(resolve, reject));
  });
  p.abort = r.abort.bind(r);
  return p;
}*/

export function post(url,type,id,params){
  var userinfo = {};
  try{
      
      userinfo = JSON.parse(localStorage.userinfo||"{}")||{};

  }catch(e){
      
  }

  var data ={
        header: {
          
          /*token: sessionStorage.getItem("token")||''*/


          // token: sessionStorage.getItem("token")||'0e564b920a4cd5486c6c02e8432aa62e2e88ab8d5de1df078c860f9e480785fc',
          
          /*token: "0e564b920a4cd5486c6c02e8432aa62e2e88ab8d5de1df078c860f9e480785fc"*/
          token : sessionStorage.getItem("token") || userinfo.token || ''

        },
        data: {
          "payload_type": "api",
          "description": {
            "type": type,
            "id": id,
            /*"market": '01',*/
            "params": params,
          }
        }
    }
  var r;
  var p = new Promise(function(resolve, reject){
    r = req.post(url)
      .send(data)
      .end(_end_callback(resolve, reject))
  })

  p.abort = r.abort.bind(r);
  return p;
}
