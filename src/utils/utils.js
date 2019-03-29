/**
*
* 描述：日期格式化（日期格式为2018-03-19T17:01:23.930）
*   date   date   日期
*   format string 格式
*   return string
*
* 例子：
*   dateFormat(new Date(2015,9,27), "yyyy-MM-dd") 返回 "2015-10-27"
*
**/
function dateFormatUTC(date, format = 'yyyy-MM-dd') {
  if(date){
    var o = {
      "M+": date.getUTCMonth() + 1,
      "d+": date.getUTCDate(),
      "h+": date.getUTCHours(),
      "m+": date.getUTCMinutes(),
      "s+": date.getUTCSeconds(),
      "q+": Math.floor((date.getUTCMonth() + 3) / 3),
      "S": date.getUTCMilliseconds()
    }
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (date.getUTCFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
      }
    }
    return format;
  }else{
    return "";
  }

}

/**
*
* 描述：日期格式化
*   date   date   日期
*   format string 格式
*   return string
*
* 例子：
*   dateFormat(new Date(2015,9,27), "yyyy-MM-dd") 返回 "2015-10-27"
*
**/
function dateFormat(date, format = 'yyyy-MM-dd') {
  if(date){
    var o = {
      "M+": date.getMonth() + 1,
      "d+": date.getDate(),
      "h+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds(),
      "q+": Math.floor((date.getMonth() + 3) / 3),
      "S": date.getMilliseconds()
    }
    alert(date);
    alert(date.getDate())
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
      }
    }
    return format;
  }else{
    return "";
  }

}

function core_isArray(arg) {
  return Object.prototype.toString.call(arg) === '[object Array]';
}

function each(target, cb) {
  if (target && typeof target === 'object') {
    if (core_isArray(target)) {
      //target.forEach(target, cb);
      for (var i = 0, len = target.length; i < len; i++)
        cb(target[i], i);
    } else {
      for (var a in target)
        cb(target[a], a);
    }
  }
}
function map(target, cb) {
  var res = [];
  each(target, function(n, i) {
    res.push(cb(n, i));
  });
  return res;
}
//获取url参数
function getUrlParam(name){
  //构造一个含有目标参数的正则表达式对象  
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");  
   //匹配目标参数  
  var r = window.location.search.substr(1).match(reg);  
  //返回参数值  
  if (r!=null) return unescape(r[2]);  
  return null;  
}



export {
  dateFormat,
  dateFormatUTC,
  map,
  getUrlParam,
}