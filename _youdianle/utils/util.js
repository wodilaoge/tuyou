const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const post = (url, data) => {
  var promise = new Promise((resolve, reject) => {
    //网络请求
    wx.request({
      url: url,
      data: data,
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      success: function(res) { //服务器返回数据
        if (res.statusCode == 200) {
          resolve(res);
        } else { //返回错误提示信息
          reject(res.data);
        }
      },
      error: function(e) {
        reject('网络出错');
      }
    })
  });
  return promise;
}
const post_token = (url, data) => {
  var user = wx.getStorageSync('userInfo')
  user = 'Bearer ' + user.token;
  var promise = new Promise((resolve, reject) => {
    //网络请求
    wx.request({
      url: url,
      data: data,
      method: 'POST',
      header: {
        "Content-Type": "application/json",
        'Authorization': user
      },
      success: function(res) { //服务器返回数据
        if (res.statusCode == 200) {
          resolve(res);
        } else { //返回错误提示信息
          reject(res.data);
        }
      },
      error: function(e) {
        reject('网络出错');
      }
    })
  });
  return promise;
}
const gets = (url, data) => {
  var user = wx.getStorageSync('userInfo')
  // if (user == null) {
  //   wx.showToast({
  //     title: '登录失败！',
  //     image: '/img/fail.png',
  //     duration: 500,
  //     success: function() {
  //       wx.redirectTo({
  //         url: '/pages/login/login',
  //       })
  //     }
  //   })
  // } else
  {
    user = 'Bearer ' + user.token;
    var promise = new Promise((resolve, reject) => {
      //网络请求
      wx.request({
        url: url,
        data: data,
        header: {
          'content-type': 'application/json',
          'Authorization': user
        },
        success: function(res) { //服务器返回数据
          if (res.data.code == 0) {
            resolve(res);
          } 
          else if (res.data.code == 109) {
            console.log('utils code 109', res.data)
            wx.showToast({
              title: '请重新登录！',
              image: '/img/fail.png',
              duration: 2000,
              success: function() {
                wx.redirectTo({
                  url: '/pages/login/login',
                })
              }
            })
          }
          else { //返回错误提示信息
            wx.showToast({
              title: res.data.msg,
              duration: 2000,
              success: function() {
                wx.redirectTo({
                  url: '/pages/login/login',
                })
              }
            })
          }
        },
        error: function(e) {
          reject('网络出错');
        }
      })
    });
    return promise;
  }
}

const gets_notoken = (url, data) => {
  {
    var promise = new Promise((resolve, reject) => {
      //网络请求
      wx.request({
        url: url,
        data: data,
        header: {
          'content-type': 'application/json',
        },
        success: function (res) { //服务器返回数据
          if (res.data.code == 0) {
            resolve(res);
          } 
          else if (res.data.code == 109) {
            console.log('utils code 109', res.data)
            wx.showToast({
              title: '请重新登录！',
              image: '/img/fail.png',
              duration: 2000,
              success: function() {
                wx.redirectTo({
                  url: '/pages/login/login',
                })
              }
            })
          }
          else { //返回错误提示信息
            wx.showToast({
              title: res.data.msg,
              duration: 2000,
              success: function() {
                wx.redirectTo({
                  url: '/pages/login/login',
                })
              }
            })
          }
        },
        error: function (e) {
          reject('网络出错');
        }
      })
    });
    return promise;
  }
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  gets,
  post,
  post_token,
  gets_notoken
}