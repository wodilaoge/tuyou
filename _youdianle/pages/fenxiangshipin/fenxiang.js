// pages/fenxiangshipin/fenxiang.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shipin: '',
  },
  getOneShipin: function (e) {
    var self = this;
    let url = app.globalData.URL + '/video/findActVideo';
    let data = {
      id: e,
    };
    app.wxRequest('GET', url, data, (res) => {
      console.log(res)
      let shipintt = {};
      shipintt.border = 0;
      shipintt.list = [];
      shipintt.list.splice(0, 0, res.data)
      console.log(shipintt)
      let shipintmp = JSON.stringify(shipintt);
      console.log(shipintmp)
      var jsonObj = JSON.parse(shipintmp);

      self.setData({
        shipin: jsonObj,
      })
      console.log(self.data.shipin)
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  navshouye() {
    wx.reLaunch({
      url: '../index/index?',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getOneShipin(options.shipinID);
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