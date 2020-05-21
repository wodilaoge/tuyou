// pages/MyPages/my_setting/my_setting.js
const app = getApp()
var util = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: '12:01',
  },
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  dead(){
    var that = this;
    let url = app.globalData.URL + '/auth/logout';
    util.gets(url, {}).then(function (res) {

      console.log(res.data)
      if (res.data.code==0) {
        wx.showToast({
          title: '注销成功',
          duration: 2000,
          success: function () {
            setTimeout(function () {
              wx.reLaunch({
                url: '/pages/index/index',
              })
            }, 2000);
          }
        })
      }
    })
  },
  tomessage(){
    wx.navigateTo({
      url: '/pages/MyPages/my_messagemind/my_messagemind',
    })
  },
  toblack(){
    wx.navigateTo({
      url: '/pages/MyPages/my_blacklist/my_blacklist',
    })
  },
  onShareAppMessage: function () {
    var that = this;
    return {
      title: '友点乐',
      path: '/pages/index/index',
      success: function (res) {
        console.log("转发成功:" + JSON.stringify(res));
        that.shareClick();
      },
      fail: function (res) {
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  }
})