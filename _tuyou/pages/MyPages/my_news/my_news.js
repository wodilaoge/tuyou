const app = getApp()
var util = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    news:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  news() { //活动新闻
    let url = app.globalData.URL + '/news/listNews';
    let data = {
      actid: '1025873553653760'
    };
    app.wxRequest('GET', url, data, (res) => {
      this.setData({
        news: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  onLoad: function (options) {
    this.news()
  },
  back() {
    wx.switchTab({
      url: '/pages/MyPages/my/my',
    })
  },
})