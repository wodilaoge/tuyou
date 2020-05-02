// pages/my_activity/my_activity.js
const app = getApp();
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swip: ['活动审核', '新闻审核', '图片审核', '视频审核'],
    options:1,
    TabCur:0,
    AllActivity:[],
    scrollLeft: 0
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  select1(){
    this.setData({
      options: 1
    })
  },

  select2() {
    this.setData({
      options: 2
    })
  },
  select3() {
    this.setData({
      options: 3
    })
  },

  onLoad: function (options) {
    var that=this
    let url = app.globalData.URL + '/config/findAllActivityClass1';
    let data = '';
    util.gets(url, {}).then(function (res) {
      that.setData({
        AllActivity: res.data.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})