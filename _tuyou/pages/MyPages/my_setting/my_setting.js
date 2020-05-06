// pages/MyPages/my_setting/my_setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  toblack(){
    wx.navigateTo({
      url: '/pages/MyPages/my_blacklist/my_blacklist',
    })
  }
})