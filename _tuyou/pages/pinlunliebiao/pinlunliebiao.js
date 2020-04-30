const app = getApp();
Page({
  data: {
    option: [],
    categoryId: '',
    objtitle: '',
    comment: [],
    comment_detail: [],
    Input: '',
    user:[],
  },
  emailInput: function(e) {//input输入
    this.setData({
      Input: e.detail.value
    });
  },
  chakanhuifu: function(e) { //查看回放跳转
    console.log(e);
    wx.navigateTo({
      url: '/pages/chakanhuifu/chakanhuifu?id=' + e.currentTarget.dataset.id + '&objtitle=' + e.currentTarget.dataset.objtitle,
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
      console.log(res.data.list);
      self.setData({
        comment: res.data
      });
      self.setData({
        comment_detail: self.data.comment.list
      });
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  pd_fasong() {
    if (this.data.Input == "") {
      wx.showToast({
        title: '请输入回复内容', // 标题
        icon: 'none', 
        duration: 1500 // 提示窗停留时间，默认1500ms
      })
    }
    else {
      this.fasong()
    }
  },
  fasong() { //发送按钮
    var self = this;
    let url = app.globalData.URL + '/comm/addComment';
    let data = {
      pid: null,
      objtype: 30,
      objid: self.data.categoryId,
      objtitle: self.data.objtitle,
      comment: self.data.Input,
      creater: self.data.user.id,
      createrAlias: self.data.user.nickname,
      createrHead: self.data.user.head
    };
    app.wxRequest('POST', url, data, (res) => {
      self.onLoad(self.data.option);
      wx.showToast({
        title: '评论成功！', // 标题
        icon: 'success', // 图标类型，默认success
        duration: 1500 // 提示窗停留时间，默认1500ms
      })
    }, (err) => {
      console.log(err.errMsg)
    });
    self.setData({
      Input: ''
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(option) {
    var self = this;
    self.setData({
      option: option,
      categoryId: option.categoryId,
      objtitle: option.objtitle,
      user: wx.getStorageSync('userInfo')
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
  onShow: function(options) {},

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