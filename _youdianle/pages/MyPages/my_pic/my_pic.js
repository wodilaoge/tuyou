// pages/MyPages/my_pic/my_pic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Lists: ['全部', '校园', '聚会', '装扮', '摄影'],
    TabCur:0
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
})