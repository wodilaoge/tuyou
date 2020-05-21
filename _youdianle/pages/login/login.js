// pages/login/login.js
const app = getApp();
var util = require("../../utils/util.js");
Page({
  data: {
    isagree:true
  },
  isagree(e) {
    this.setData({
      isagree: !this.data.isagree
    })
  },
  toagreepage() {
    wx.navigateTo({
      url: '/pages/webview/webview',
    })
  },
  toagreepage2() {
    wx.navigateTo({
      url: '/pages/webview2/webview2',
    })
  },
  login(e) {
    if (!this.data.isagree) {
      wx.showToast({
        title: '请先勾选！',
      })
    } else {
      var that = this
      wx.login({
        success: function(res) {
          console.log(res);
          var code = res.code
          if (res.code) {
            wx.getUserInfo({
              success: function(res) {
                var userinfo = res.userInfo
                console.log(userinfo);
                let url = app.globalData.URL + '/auth/wclogin';
                let data = {
                  code: code,
                  nickname: userinfo.nickName,
                  head: userinfo.avatarUrl
                };
                util.post(url, data).then(function(res) {
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
                      duration: 500,
                      success: function () {
                        setTimeout(function () {
                          wx.switchTab({
                            url: '/pages/index/index',
                          })
                          // wx.navigateBack({
                          //   delta:1
                          // })
                        }, 1000);
                      }
                      
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // var user=wx.getStorageSync("userInfo")
    // if(user){
    //   wx.navigateTo({
    //     url: '/pages/index/index',
    //   })
    // }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})