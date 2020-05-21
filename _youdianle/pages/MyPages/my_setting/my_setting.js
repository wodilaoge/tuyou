// pages/MyPages/my_setting/my_setting.js
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