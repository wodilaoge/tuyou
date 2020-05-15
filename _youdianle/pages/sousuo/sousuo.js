// pages/sousuo/sousuo.js
const app = getApp();
const utilsDays = require('../../utils/utils-day');
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
    listCampus_timeChange: [],
    sousuo_lishi: [],
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  change_sousuo() {
    if (this.data.sousuo_neirong) {
      this.setData({
        change_if: 1,
      })
    } else {
      this.setData({
        change_if: 0,
      })
    }
    let url = app.globalData.URL + '/search/listAll';
    let data = {
      keywords: this.data.sousuo_neirong
    };
    app.wxRequest('GET', url, data, (res) => {
      console.log(res)
      this.setData({
        sousuo_detail: res.data,
      })
    }, (err) => {
      console.log(err.errMsg)
    });
    this.setLishi()
    this.getLishi()
  },
  timeChange: function() { //////修改时间
    var obj = [];
    var time = '';
    for (var i in this.data.sousuo_detail.listCampus) {
      // arr.push(obj[utilsDays.formatMsgTime(this.data.sousuo_detail.listCampus[i].fromtime)]);
      time = this.data.sousuo_detail.listCampus[i].fromtime.slice(0, 14);
      arr.push(obj[time]);
    }
    this.setData({
      listCampus_timeChange: obj
    })
  },
  value_sousuo: function(res) {
    console.log(res)
    this.setData({
      sousuo_neirong: res.detail.value,
    })
    this.change_sousuo()
  },
  getHotWords: function() {
    let url = app.globalData.URL + '/search/listHotWords';
    let data = {}
    app.wxRequest('GET', url, data, (res) => {
      console.log(res)
      this.setData({
        hotWords: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  remen_sousuo_neirong: function(e) {
    console.log(e)
    this.setData({
      sousuo_neirong: this.data.hotWords[e.currentTarget.id].keyword,
    })
    this.change_sousuo()
  },
  /////////////搜索历史
  getLishi: function() {
    var that = this;
    wx.getStorage({
      key: 'lishi',
      success: function(res) {
        console.log(res)
        if (res.data) {
          that.setData({
            sousuo_lishi: res.data,
          })
        }
      },
    })
  },
  setLishi: function() {
    var that = this;
    if (this.data.sousuo_neirong != '') {
      var array = this.data.sousuo_lishi
      array.push(this.data.sousuo_neirong)
      wx.setStorageSync("lishi", array)
      that.getLishi()
    }
  },
  remAll: function(e) {
    console.log(e)
    var that = this;
    var array = this.data.sousuo_lishi
    array.splice(0, array.length)
    wx.setStorageSync("lishi", array)
    that.getLishi()

  },
  remOne:function(e){
    console.log(e)
    var that = this;
    var array = this.data.sousuo_lishi
    array.splice(e.currentTarget.id, 1)
    wx.setStorageSync("lishi", array)
    that.getLishi()
  },
  /////////

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getHotWords()
    this.getLishi()
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
    this.timeChange()
    this.getLishi()

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