// pages/sousuo/sousuo.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 6,
    change_if: 0,
    sousuo_neirong: '',
    sousuo_detail: [],
    hotWords: [],

  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  change_sousuo() {
    this.setData({
      change_if: 1,
    })
      let url = app.globalData.URL + '/search/listAll';
      let data = {
        keywords: this.data.sousuo_neirong
      };
      app.wxRequest('GET', url, data, (res) => {
        console.log(res)
        this.setData({
          sousuo_detail: res.data
        })
      }, (err) => {
        console.log(err.errMsg)
      });
   
  },
  value_sousuo: function(res) {
    console.log(res)
    this.setData({
      sousuo_neirong: res.detail.value,
    })
  },
  getHotWords:function() {
    let url = app.globalData.URL + '/search/listHotWords';
    let data ={}
    app.wxRequest('GET', url, data, (res) => {
      console.log(res)
      this.setData({
        hotWords: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  this.getHotWords()
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