// pages/tuanduixinxi/tuanduixinxi.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tdxxId:'6793995262885888',
    tdxxDeatil:[],
    duiyuanID:''

  },



  getXinxi() {
    let url = app.globalData.URL + '/team/findTeam';
    let data = {
      id:this.data.tdxxId
    };
    app.wxRequest('GET', url, data, (res) => {
      console.log(res.data)
      this.setData({
      tdxxDeatil:res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },

  navziliao: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/ziliao/ziliao'
    })
  },

  test: function () {
    let url = app.globalData.URL + '/team/listMember';
    let data = {
      id: this.data.tdxxId
    };
    app.wxRequest('GET', url, data, (res) => {
      console.log(res.data)
      this.setData({
       
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
   
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getXinxi()
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