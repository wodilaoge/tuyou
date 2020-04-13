// pages/form_address/form_address.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    provinceList: [],
    city: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  province() {
    let url = app.globalData.URL + '/config/getProvince';
    let data = '';
    app.wxRequest('GET', url, data, (res) => {
      // console.log(res.data)
      this.setData({
        provinceList: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  city() {
    let url = app.globalData.URL + '/config/getCity';
    let data = {
      pid: '00333'
    };
    app.wxRequest('GET', url, data, (res) => {
      // console.log(res.data)
      this.setData({
        city: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  onLoad() {
    this.city();
    this.province();
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