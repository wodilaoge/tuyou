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
    province: '',
    city:'',
    univ:'',
    isRefle:false,
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  change_sousuo() {
    wx.showLoading({
      title: '搜索中...',
      mask: true //显示触摸蒙层  防止事件穿透触发
    });
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
      keywords: this.data.sousuo_neirong,
      province:this.data.province==='不选'?null:this.data.province,
      city:this.data.city==='不选'?null:this.data.city,
      univ:this.data.univ==='不选'?null:this.data.univ,
    };
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      this.setData({
        sousuo_detail: res.data,
      })
    }, (err) => {
      console.log(err.errMsg)
    });
    this.setLishi()
    this.getLishi()
    wx.hideLoading({
      complete: (res) => {},
    })
  },
  change_sousuo_lishi:function(e){
    wx.showLoading({
      title: '搜索中...',
      mask: true //显示触摸蒙层  防止事件穿透触发
    });
      this.setData({
        change_if: 1,
        sousuo_neirong: e.currentTarget.dataset.neirong,
      })
    let url = app.globalData.URL + '/search/listAll';
    let data = {
      keywords: this.data.sousuo_neirong,
      province:this.data.province==='不选'?null:this.data.province,
      city:this.data.city==='不选'?null:this.data.city,
      univ:this.data.univ==='不选'?null:this.data.univ,
    };
    console.log(data)
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      this.setData({
        sousuo_detail: res.data,
      })
    }, (err) => {
      console.log(err.errMsg)
    });
    this.setLishi()
    this.getLishi()
    wx.hideLoading({
      complete: (res) => {},
    })
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
    // this.change_sousuo()
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
      array.splice(0,0,this.data.sousuo_neirong)
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
  todetail(e) { //报名参加按钮跳转 带着活动id跳转 校园活动
    wx.navigateTo({
      url: '../../pages/xiaoyuanxiangqing/xiaoyuanxiangqing?categoryId=' + e.currentTarget.id,
    })
  },
  yundongxiangqing(e) {
    wx.navigateTo({
      url: '/pages/yundongxiangqing/yundongxiangqing?TabCur=0&categoryId=' + e.currentTarget.dataset.yundong.id,
    })
  },
  baomingtiaozhan(e) {
    wx.navigateTo({
      url: '/pages/yundongxiangqing/yundongxiangqing?TabCur=1&categoryId=' + e.currentTarget.dataset.yundong.id,
    })
  },
  jump(e) {
    app.globalData.tabbar = e.currentTarget.dataset.id;
    wx.switchTab({
      url: '/pages/xiaoyuan/xiaoyuan',
    })
  },
  sousuo_fenye(){

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中...',
      mask: true //显示触摸蒙层  防止事件穿透触发
    });
    this.setData({
        province: wx.getStorageSync('province').code ? wx.getStorageSync('province').name : null,
        city: wx.getStorageSync('city').code ? wx.getStorageSync('city').name : null,
        univ: wx.getStorageSync('school').code ? wx.getStorageSync('school').name : null,
    })
    this.getHotWords()
    this.getLishi()
    wx.hideLoading({
      complete: (res) => {},
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
  onReachBottom: function () {
    var self = this
    
    if (this.data.isRefle == true) {

      this.sousuo_fenye()
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})