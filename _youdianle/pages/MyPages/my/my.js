const app = getApp();
var util = require("../../../utils/util.js");
Page({
  data: {
    index: null,
    name: '',
    userInfoAll: [],
    webinfo: [],
    isagree: true
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  MultiChange(e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  RegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },

  toUserInfo(e) {
    wx.navigateTo({
      url: '/pages/MyPages/my_profile/my_profile',
    })
  },
  none(){
    wx.showToast({
      title: '敬请期待',
      
    })
  },
  onLoad: function () {
    var that = this
    console.log('onload')
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          //查询个人活动数（发起和参与的）
          let url = app.globalData.URL + '/appuser/countByUser';
          let data = {
          };
          util.gets(url, data).then(function (res) {
            console.log('activitynum', res.data)
            that.setData({
              activitynum: res.data.data
            })
          })
          //统计评论数
          url = app.globalData.URL + '/comm/countCommByObj';
          data = {
            objid: wx.getStorageSync('userInfo').id,
            objtype: 10
          };
          util.gets(url, data).then(function (res) {
            console.log('commentNum', res.data)
            that.setData({
              commentNum: res.data.data
            })
          })
          //统计关注数
          url = app.globalData.URL + '/follow/countByObj';
          data = {
            objid: wx.getStorageSync('userInfo').id,
            objtype: 10
          };
          util.gets(url, data).then(function (res) {
            console.log('attentiontNum', res.data)
            that.setData({
              attentiontNum: res.data.data
            })
          })
          //统计加入天数
          url = app.globalData.URL + '/appuser/findUserByID';
          data = {
            id: wx.getStorageSync('userInfo').id,
          };
          util.gets(url, data).then(function (res) {
            console.log('welcome', res.data)
            that.setData({
              welcome: res.data.data.welcome,
              userinfototaol:res.data.data
            })
          })
          console.log('wx auth finished')

        } else {
          console.log('no auth')
          wx.showModal({
            title: '友点乐',
            content: '请先进行微信登录',
            cancelText: '取消',
            confirmText: '授权',
            success: res => {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/login/login',
                })
              } else {
                wx.navigateBack({
                  delta: 1
                })
              }
            }
          })
        }
      }
    })

    this.setData({
      userInfoAll: wx.getStorageSync('userInfo')
    })
  },
  login(e) {
    if (!this.data.isagree) {
      wx.showToast({
        title: '请先勾选！',
      })
    } else {
      var that = this
      // this.setData({
      //   userInfoAll: e.detail.userInfo
      // })
      wx.login({
        success: function (res) {
          console.log(res);
          var code = res.code
          if (res.code) {
            wx.getUserInfo({
              success: function (res) {
                var userinfo = res.userInfo
                console.log(userinfo);
                let url = app.globalData.URL + '/auth/wclogin';
                let data = {
                  code: code,
                  nickname: userinfo.nickName,
                  head: userinfo.avatarUrl
                };
                util.post(url, data).then(function (res) {
                  console.log('id', res)
                  if (res.data.code == 0) {
                    that.setData({
                      userInfoAll: res.data.data
                    })
                    wx.setStorage({ //将用户信息存入缓存 名称为userinfo
                      key: "userInfo",
                      data: res.data.data
                    });
                    wx.showToast({
                      title: '登录成功！',
                    })
                  } else {
                    wx.showToast({
                      title: '登录失败！',
                    })
                  }
                })
              }
            })
          }
        }
      })
    }
  },
  lg() {
    wx.getUserInfo({
      success: function (res) {
        var userinfo = res.userInfo
        console.log(userinfo);
        wx.setStorage({ //将活动信息存入缓存
          key: "userInfo",
          data: userinfo
        });

      }
    })
  },
  isagree(e) {
    this.setData({
      isagree: !this.data.isagree
    })
  },
  onShareAppMessage: function () {
    var that = this;
    return {
      title: '友点乐',
      path: 'pages/MyPages/my/my',
      success: function (res) {
        console.log("转发成功:" + JSON.stringify(res));
        that.shareClick();
      },
      fail: function (res) {
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },
  onShow()
  {
    this.onLoad()
    console.log('onshow')
  }
})