//app.js

App({
  globalData: {
    loadModal: true,
    tabbar: 1,
    userInfo: [],
    // URL: 'https://api.udianle.com/kt',
    URL: 'http://192.144.169.239/kt',
    systemInfo: null, //客户端设备信息，
    YundongList: [{
        name: '篮球',
      },
      {
        name: '足球',
      },
      {
        name: '羽毛球',
      },
      {
        name: '乒乓球',
      },
      {
        name: '网球',
      },
      {
        name: '台球',
      },
      {
        name: '跑步',
      },
      {
        name: '武术',
      },
      {
        name: '格斗',
      },
      {
        name: '户外',
      },
      {
        name: '音乐',
      },
      {
        name: '演唱',
      },
      {
        name: '舞蹈',
      },
      {
        name: '棋艺',
      },
      {
        name: '电竞',
      },
    ]
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
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //     } else {
    //       // 未授权，跳转到授权页面
    //       console.log('no')
    //       wx.redirectTo({
    //         url: '/pages/login/login',
    //       })
    //     }
    //   }
    // })
    // var tmp = wx.getStorageSync('userInfo')
    // if (!tmp) {
    wx.login({ //匿名登录
      success: function(res) {
        console.log('login', res.code);
        wx.request({
          url: 'https://api.udianle.com/kt/auth/wcAnonLogin',
          method: 'get',
          data: {
            code: res.code
          },
          header: {
            'content-type': 'application/json',
            'Accept': 'application/json'
          },
          dataType: 'json',
          success: function(res) {
            console.log(res.data)
            that.globalData.userInfo = res.data.data
            wx.setStorageSync('userInfo', res.data.data)
            console.log('userinfo sto ok', res.data.data)

            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况

            // if (that.employIdCallback) {
            //   that.employIdCallback(res);
            // }
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