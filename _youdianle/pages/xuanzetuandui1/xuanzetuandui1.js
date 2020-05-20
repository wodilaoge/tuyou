const app = getApp();
var util = require("../../utils/util.js");
Page({
  data: {
    TabCur: 0,
    VerticalNavTop: 0,
    MainCur: 0,
    list: [],
    lid: '',
    isload:true
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  tabSelectTeam(e) {
    var prevPage = getCurrentPages()[pages.length - 2]; //上一个页面
    prevPage.setData({
      tuanduiSelect: e.currentTarget.dataset.item
    });
    wx.navigateTo({
      url: 'pages/xuanzetuandui2/xuanzetuandui2?id=' + e.currentTarget.dataset.item.id + '&name=' + e.currentTarget.dataset.item.name + '&logo=' + e.currentTarget.dataset.item.logo
    })
  },
  VerticalMain(e) {
    let self = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;
        }).exec();
      }
      self.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        self.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  },
  getteams() {
    var self = this
    var list
    let url = app.globalData.URL + '/team/listAcid1ByLeader'
    let data = {
      lid: self.data.lid
    }
    util.gets(url, data).then(function(res) {
      list = res.data.data
      url = app.globalData.URL + '/team/listByLeader'
      for (let i in list) {
        data = {
          lid: self.data.lid,
          acid1: list[i].code
        }
        util.gets(url, data).then(function(res) {
          list[i]["teams"] = res.data.data
        }).then(function () {
          self.setData({
            list: list
          })
        })
      }
    })
  },
  TBcontroll() { //同步控制
    var self = this;
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        self.setData({
          isload: false
        })
        resolve();
      }, 1000)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    let self = this;
    self.setData({
      lid: options.lid
    })
    self.getteams()
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    await self.TBcontroll()
    wx.hideLoading()
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