// pages/MyPages/my_rank/my_rank.js
const app = getApp();
var util = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: 1,
    options: 1,
    TabCur: 0,
    myrank:[],
    AllActivity: [],
    scrollLeft: 0,
    messages: [{
        'union':'XXX',
        'rank': 1,
        'score': 80,
        'date': '2020/3/31',
        'name': 'XXX活动名称'
      },
      {
        'union': 'XXX',
        'rank': 1,
        'score': 80,
        'date': '2020/3/31',
        'name': 'XXX活动名称'
      },
      {
        'union': 'XXX',
        'rank': 1,
        'score': 80,
        'date': '2020/3/31',
        'name': 'XXX活动名称'
      },
      {
        'union': 'XXX',
        'rank': 1,
        'score': 80,
        'date': '2020/3/31',
        'name': 'XXX活动名称'
      }
    ]
  },
  changebutton(e) {
    this.setData({
      color: !this.data.color
    })
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  onLoad: function(options) {
    var that = this
    let url = app.globalData.URL + '/config/findAllActivityClass1';
    util.gets(url, {}).then(function(res) {
      that.setData({
        AllActivity: res.data.data
      })
    })
    let url2 = app.globalData.URL + '/act/listMyRank';
    let t =wx.getStorageSync('userinfo');
    let data={
      'uid':t.id
    }
    util.gets(url2, data).then(function (res) {
      console.log(res.data)
      that.setData({
        myrank: res.data.data
      })
    })
    
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