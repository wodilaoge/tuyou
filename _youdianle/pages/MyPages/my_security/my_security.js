const app = getApp()
var util = require("../../../utils/util.js");
Page({

  data: {
    mobile:'',
    userinfo:[]
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
      } else {
        console.log(res.data)
        wx.showToast({
          title: res.data.msg,
          image: '/img/fail.png',
          icon: 'success',
          duration: 2000
        })
      }
    }).catch(function(res) {
      console.log(res)
      wx.showToast({
        title: '提交失败！',
        icon: 'success',
        duration: 2000
      })
    })
  },
})