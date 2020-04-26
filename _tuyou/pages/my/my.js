const app = getApp();
var util = require("../../utils/util.js");
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
  RegionChange: function(e) {
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

  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },
  textareaBInput(e) {
    this.setData({
      textareaBValue: e.detail.value
    })
  },
  onLoad: function() {
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
        success: function(res) {
          console.log(res);
          var code = res.code
          if (res.code) {
            wx.getUserInfo({
              success: function(res) {
                var userinfo = res.userInfo
                console.log(userinfo);
                // wx.setStorage({ //将活动信息存入缓存
                //   key: "userInfo",
                //   data: userinfo
                // });
                // let url = app.globalData.URL + '/auth/wclogin';
                // let data = {
                //   code: code,
                //   nickname: userinfo.nickName,
                //   head: userinfo.avatarUrl
                // };
                // util.post(url, data).then(function(res) {
                //   console.log('id', res)
                //   if (res.code == 0) {
                //     that.setData({
                //       userInfoAll: res.data
                //     })
                //     wx.showToast({
                //       title: '登录成功！',
                //     })
                //   }
                //   else{
                //     wx.showToast({
                //       title: '登录失败！',
                //     })
                //   }
                // })
              }
            })
          }
        }
      })
    }
  },
  lg() {
    wx.getUserInfo({
      success: function(res) {
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
  }
})