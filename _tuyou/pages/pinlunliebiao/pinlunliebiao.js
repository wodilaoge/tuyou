const app = getApp();
Page({
  data: {
    categoryId: '',
    comment: [],
    comment_detail: [],
  },
  chakanhuifu(e) { //查看回放跳转
    console.log(e);
    wx.navigateTo({
      url: '../../pages/chakanhuifu/chakanhuifu',
    })
  },
  comment() { //评论
    var self = this;
    let url = app.globalData.URL + '/comm/listCommByObj';
    let data = {
      objid: self.data.categoryId,
      objtype: 30
    };
    app.wxRequest('GET', url, data, (res) => {
      self.setData({
        comment: res.data
      });
      console.log(res.data.list);
      self.setData({
        comment_detail: self.data.comment.list
      });
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this;
    self.setData({
      categoryId: options.categoryId
    })
    self.comment();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
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