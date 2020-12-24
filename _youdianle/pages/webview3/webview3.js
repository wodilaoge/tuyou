// pages/webview3/webview3.js
Page({
  data: {
    url:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var url0=options.url
    // var url4=url0.split("?")[0].toString()
    // var url1=url0.split("?")[1].toString()
    // var url2=encodeURI(url1)
    // var url3=encodeURI(url2)
    // console.log(url2.toString())
    // console.log(url3.toString())
    // console.log(url4+url2)
    // https://item.taobao.com/item.htm?id=626155316162
    // console.log("https://api.udianle.com/bms/linkto.do?type=sec&id=6516013478707211")
    this.setData({
      //url:url4+"?"+url2
      url:options.url
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