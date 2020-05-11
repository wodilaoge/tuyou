// pages/MyPages/my_discuss/my_discuss.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: [{
        'head': 'byygy',
        'name': 'XX篮球赛',
        'date': '2020-5-5 21:12:02',
        'detail': '活动看着很不错！我报名啦 活动看着很不错！我报名啦 活动看着很不错！我报名啦',
        'pic': '/img/login/icon.png'
      },
      {
        'head': 'byygy',
        'name': 'XX篮球赛',
        'date': '2020-5-5 21:12:02',
        'detail': '活动看着很不错！我报名啦 活动看着很不错！我报名啦 活动看着很不错！我报名啦',
        'pic': ''
      }
    ]
  },
  back(e) {
    wx.switchTab({
      url: '/pages/MyPages/my/my',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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