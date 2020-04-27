//app.js
App({
  globalData: {
    tabbar: 0,
    URL: 'http://192.144.169.239:8080/kt',
    systemInfo: null, //客户端设备信息
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
  wxRequest(method, url, data, callback, errFun) {
    var user = wx.getStorageSync('userInfo')
    user='Bearer '+user.token;
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
        callback(res.data);
      },
      fail: function(err) {
        errFun(res);
      }
    })
  },
  onLaunch: function() {
    // 展示本地存储能力
    // this.hideTabBar();
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    //！！！！ 微信已废弃scope.userInfo！！！！

    // 获取用户信息 
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
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