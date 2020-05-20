const app = getApp();
var util = require("../../utils/util.js");
Page({
  data: {
    id: "",
    name: "",
    logo: "",
    list: [],
    select: 0,
  },
  list() { //团队成员
    var self = this
    let url = app.globalData.URL + '/team/listMember'
    let data = {
      id: self.data.id
    }
    util.gets(url, data).then(function(res) {
      var list = res.data.data
      for (let i in list) {
        list[i]['select'] = false
        self.setData({
          list: list
        })
      }
    })
  },
  SelectMem(e) {
    var self = this
    var ed = self.data.list
    /*let ns={
      mbrId: e.currentTarget.dataset.item.uid,
      mbrAlias: e.currentTarget.dataset.item.nickname,
      mbrHead: e.currentTarget.dataset.item.head
    }
    ed.push(ns)
    self.setData({
      select:ed
    })*/
    if (ed[e.target.dataset.index].select)
      self.setData({
        select: self.data.select - 1
      })
    else
      self.setData({
        select: self.data.select + 1
      })
    ed[e.target.dataset.index].select = !ed[e.target.dataset.index].select
    self.setData({
      list: ed
    })
  },
  queding() {
    var self = this
    var selectlist = []
    if (self.data.select == 0)
      wx.showToast({
        title: '至少选择一名！',
        image: '/img/fail.png',
        duration: 1000,
      })
    else {
      for (let i in self.data.list) {
        if (self.data.list[i].select) {
          let ns = {
            mbrId: self.data.list[i].uid,
            mbrAlias: self.data.list[i].nickname,
            mbrHead: self.data.list[i].head
          }
          selectlist.push(ns)
        }
      }
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 3]; //前两个页面
      prevPage.setData({
        members: selectlist
      });
      wx.navigateBack({
        delta: 2
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let self = this;
    self.setData({
      id: options.id,
      name: options.name,
      logo: options.logo
    })
    self.list()
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