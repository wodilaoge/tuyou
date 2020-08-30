//app.js

App({
  globalData: {
    loadModal: true,
    tabbar: 1,
    userInfo: [],
    // URL: 'https://api.udianle.com/kt',
    URL: 'http://192.144.169.239/kt',
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
          if (res.data.code == '109') {
            console.log('appjs code 109', res.data)
            wx.showToast({
              title: '请重新登录！',
              image: '/img/fail.png',
              duration: 500,
              success: function() {
                wx.redirectTo({
                  url: '/pages/login/login',
                })
              }
            })
          }
          callback(res.data);
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
          if (res.data.code == '109') {
            console.log('appjs code 109', res.data)
            wx.showToast({
              title: '请重新登录！',
              image: '/img/fail.png',
              duration: 500,
              success: function() {
                wx.redirectTo({
                  url: '/pages/login/login',
                })
              }
            })
          }

          callback(res.data);
        },
        fail: function(err) {
          errFun(res);
        }
      })
    }
  },

  onLaunch: function() {
    // 展示本地存储能力
    // this.hideTabBar();
    var that = this
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.login({ //匿名登录
      success: function(res) {
        console.log('login', res.code);
        wx.request({
          // url: 'https://api.udianle.com/kt/auth/wcAnonLogin',
          url: 'http://192.144.169.239/kt/auth/wcAnonLogin',
          method: 'get',
          data: {
            id:wx.getStorageSync("userInfo").id,
            code: res.code
          },
          header: {
            'content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization':'Bearer '+ wx.getStorageSync('userInfo').id,
          },
          dataType: 'json',
          success: function(res) {
            console.log('ini');
            console.log(res.data)
            that.globalData.userInfo = res.data.data
            wx.setStorageSync('userInfo', res.data.data)
            console.log('userinfo sto ok', res.data.data)

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