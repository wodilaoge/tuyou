const app = getApp();
Page({
  data: {
    option: [],
    id: '',
    huifudata: [],
    comment: [],
    list: [],
    Input: '',
    user: [],
  },
  emailInput: function(e) { //input输入
    this.setData({
      Input: e.detail.value
    });
  },
  comment() { //获取父评论以及回复
    var self = this;
    let url = app.globalData.URL + '/comm/listComm';
    let url2 = app.globalData.URL + '/comm/listCommReply';
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
    data = {
      id: self.data.id,
      objtype: 10
    };
    app.wxRequest('GET', url2, data, (res) => {
      self.setData({
        list: res.data
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
    } else {
      this.fasong()
    }
  },
  fasong() { //发送按钮
    var self = this;
    let url = app.globalData.URL + '/comm/addComment';
    let data = {
      pid: self.data.id,
      objtype: 10,
      objid: self.data.comment.objid,
      objtitle: "",
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
      id: option.id,
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