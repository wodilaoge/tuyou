const app = getApp()
var util = require("../../../utils/util.js");
Page({

  data: {
    mobile:'',
    userinfo:[],
    isphone:false
  },

  tochange(){
    wx.navigateTo({
      url: '/pages/MyPages/my_profile/my_profile',
    })
  },
  onLoad: function(options) {
    var that = this;
    let url = app.globalData.URL + '/appuser/findUserByID';
    this.setData({
      userInfoAll: wx.getStorageSync('userInfo')
    })
    let data = {
      'id': this.data.userInfoAll.id
    }
    util.gets(url, data).then(function (res) {

      that.setData({
        userinfo: res.data.data
      })
      if(res.data.data.mobile)
      {
        that.setData({
          isphone:true
        })
 
      }
    })
  },
  dead(e){
    let url = app.globalData.URL + '/hd/cancelaccount'

    // util.post_token(url,data).then(function(res){

    // })
  },
  getPhoneNumber: function(e) {
    var that = this;
    console.log(e)
    // console.log(e.detail.errMsg == "getPhoneNumber:ok");
    let url = app.globalData.URL + '/auth/decryptMobileByWc'
    var data = {
      data: e.detail.encryptedData,
      iv: e.detail.iv
    }
    util.post_token(url, data).then(function(res) {
      if (res.data.code == 0) {
        wx.setStorageSync('phone', res.data.data.mobile)
        that.setData({
          mobile:res.data.data.mobile
        })
        wx.showToast({
          title: '绑定手机成功！',
          duration: 2000,
          success: function() {
            setTimeout(function() {
              // wx.reLaunch({
              //   url: '/pages/form/form',
              // })
              wx.navigateBack({
                delta:1
              })
            }, 2000);
          }
        })
      } 
      else if (res.data.code == 109) {
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
      else if (res.data.code == 124) {
        console.log('appjs code 124', res.data)
        wx.showToast({
          title: '请注销登录后重试',
          icon:'none',
          duration: 1000,
          success: function() {
            setTimeout(function() { 
              wx.redirectTo({
                url: '/pages/MyPages/my_setting/my_setting',
              })
            }, 2000); 
          }
        })
      }
      else {
        console.log(res.data)
        wx.showToast({
          title: res.data.msg,
        })
      }
    }).catch(function(res) {
      console.log(res)
      wx.showToast({
        title: res.data.msg,
      })
    })
  },
})