const app = getApp();
Page({
  data: {
    option:[],
    id:'',
    huifudata: [],
    comment: []
  },
  comment() { //获取父评论
    var self = this;
    let url = app.globalData.URL + '/comm/listComm';
    let data = {
      id: self.data.id,
      objtype: 30
    };
    app.wxRequest('GET', url, data, (res) => {
      console.log(res.data);
      self.setData({
        comment: res.data
      });
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(option) {
    var self = this;
    self.setData({
      option: option,
      id: option.id,
      objtitle: option.objtitle
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