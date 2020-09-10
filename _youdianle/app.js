//app.js

App({
  globalData: {
    loadModal: true,
    tabbar: 1,
    userInfo: [],
    //URL: 'https://api.udianle.com/kt',
     URL: 'http://192.144.169.239:8021/kt',
    systemInfo: null, //客户端设备信息，
  },
  wxRequest_notoken(method, url, data, callback, errFun) {
    {
      wx.request({
        url: url,
        method: method,
        data: data,
        header: {
          'content-type': 'application/json',
          'Accept': 'application/json',
        },
        dataType: 'json',
        success: function(res) {
          if (res.data.code == 0) {
            callback(res.data);
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
          // callback(res.data);      
          },
        fail: function(err) {
          errFun(err);
        }
      })
    }
  },
  wxRequest(method, url, data, callback, errFun) {
    var user = wx.getStorageSync('userInfo') 
    {
      user = 'Bearer ' + user.token;
      wx.request({
        url: url,
        method: method,
        data: data,
        header: {
          'content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': user,
        },
        dataType: 'json',
        success: function(res) {
          if (res.data.code == 0) {
            callback(res.data);
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
            console.log(res.data)
            errFun(res);
          }
          // callback(res.data);
        },
        fail: function(err) {
          errFun(res);
        }
      })
    }
  },
  // 每个接口都有可能返回下面错误：
  // -1, "未知错误"
  // 51, "无权访问"
  // 109, "请重新登录"
  // 128, "无效账户"
  // 129, "账户已冻结"
  // 130, "账户已注销"
  onLaunch: function() {
    // 展示本地存储能力
    // this.hideTabBar();
    var that = this
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.login({ //匿名登录
      success: function(res) {
        console.log('login code', res.code);
        var tmpid=wx.getStorageSync("userInfo").id
        wx.request({
           //url: 'https://api.udianle.com/kt/auth/wcAnonLogin',

          url: 'http://192.144.169.239:8021/kt/auth/wcAnonLogin',
          method: 'post',
          data: {
            id:tmpid==undefined?null:tmpid,
            code: res.code
          },
          header: {
            'content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization':'Bearer '+ wx.getStorageSync('userInfo').token,
          },
          dataType: 'json',
          success: function(res) {
            console.log('initial');
            console.log(res.data)
            if(res.data.code==0)
              {
                that.globalData.userInfo = res.data.data
                wx.setStorageSync('userInfo', res.data.data)
                console.log('userinfo storage ok', res.data.data)
              }
            else{
              wx.showToast({
                title: res.data.msg,
                duration: 2000
              })
            }
          }
        })

      }
    })
    // }

    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.globalData.Custom = capsule;
          this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })
  }
})