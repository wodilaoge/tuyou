//app.js
App({
  globalData: {
    tabbar:1,
    URL: 'http://192.144.169.239:8080/kt',
    systemInfo: null, //客户端设备信息
    tabBar: {
      "backgroundColor": "#ffffff",
      "color": "#979795",
      "selectedColor": "#1c1c1b",
      "list": [
        {
          "pagePath": "pages/index/index",
          "iconPath": "/img/tabbar/home-off.png",
          "selectedIconPath": "/img/tabbar/home-on.png",
          "text": "首页"
        },
        {
          "pagePath": "pages/xiaoyuan/xiaoyuan",
          "iconPath": "/img/tabbar/activity-off.png",
          "selectedIconPath": "/img/tabbar/activity-on.png",
          "text": "活动"
        },
        {
          "pagePath": "pages/my/my",
          "iconPath": "/img/tabbar/my-off.png",
          "selectedIconPath": "/img/tabbar/my-on.png",
          "text": "我的"
        }
      ]
    },
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
  hideTabBar: function() {
    wx.hideTabBar({
      fail: function() {
        setTimeout(function() {
          wx.hideTabBar()
        }, 500)
      }
    });
  },
  editTabbar: function() {
    let tabbar = this.globalData.tabBar;
    let currentPages = getCurrentPages();
    let _this = currentPages[currentPages.length - 1];
    let pagePath = _this.route;
    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
    for (let i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    _this.setData({
      tabbar: tabbar
    });
  },
  wxRequest(method, url, data, callback, errFun) {
    wx.request({
      url: url,
      method: method,
      data: data,
      header: {
        'content-type': method == 'GET' ? 'application/json' : 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
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
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
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