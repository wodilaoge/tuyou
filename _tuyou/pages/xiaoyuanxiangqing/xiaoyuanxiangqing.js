const app = getApp();
Page({
  data: {
    options:[],
    CustomBar: app.globalData.CustomBar,
    TabCur: 0,
    paimingCur: 0,
    categoryId: '',
    detail: [], //页面详细内容
    comment: [],
    comment_detail: [],
    news: [],
    news_detail: [],
    likecount: 0,
    ifzan: false,
    user: [],
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
    })
  },
  paimingSelect(e) {
    this.setData({
      paimingCur: e.currentTarget.dataset.id,
    })
  },
  pinluntiaozhuan(e) { //评论跳转
    wx.navigateTo({
      url: '/pages/pinlunliebiao/pinlunliebiao?categoryId=' + this.data.categoryId + '&objtitle=' + this.data.detail.actname,
    })
  },
  chakanhuifu: function(e) { //查看回放跳转
    console.log(e);
    wx.navigateTo({
      url: '/pages/chakanhuifu/chakanhuifu?id=' + e.currentTarget.dataset.id + '&objtitle=' + e.currentTarget.dataset.objtitle,
    })
  },
  detail() { //页面项目信息
    let url = app.globalData.URL + '/act/findCampusActivity';
    let data = {
      id: this.data.categoryId
    };
    app.wxRequest('GET', url, data, (res) => {
      this.setData({
        detail: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  comment() { //评论
    let url = app.globalData.URL + '/comm/listCommByObj';
    let data = {
      objid: this.data.categoryId,
      objtype: 30
    };
    app.wxRequest('GET', url, data, (res) => {
      this.setData({
        comment: res.data
      });
      this.setData({
        comment_detail: this.data.comment.list
      });
    }, (err) => {
      console.log(err.errMsg)
    });
    
  },
  news() { //活动新闻
    let url = app.globalData.URL + '/news/listNews';
    let data = {
      id: this.data.categoryId
    };
    app.wxRequest('GET', url, data, (res) => {
      this.setData({
        news: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  news_detail() { //活动新闻
    let url = app.globalData.URL + '/news/findNewsDetail';
    let data = {
      id: this.data.news.id
    };
    app.wxRequest('GET', url, data, (res) => {
      this.setData({
        news_detail: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  ifzan() { //是否点赞
    self = this;
    let url = app.globalData.URL + '/applaud/findApplaud';
    let url2 = app.globalData.URL + '/applaud/countByObj'; //点赞数
    let data = {
      objtype: 30,
      objid: self.data.categoryId,
      uid: self.data.user.id,
    };
    app.wxRequest('GET', url, data, (res) => {
      console.log(res.data)
      self.setData({
        ifzan: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
    data = {
      objid: this.data.categoryId,
      objtype: 30
    };
    app.wxRequest('GET', url2, data, (res) => {
      this.setData({
        likecount: res.data
      });
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  zan() { //点赞或取消
    self = this;
    let url = app.globalData.URL + '/applaud/updateApplaud';
    if (self.data.ifzan)
      var data = {
        objtype: 30,
        objid: self.data.categoryId,
        objtitle: self.data.detail.actname,
        creater: self.data.user.id,
        status: 0,
      };
    else
      var data = {
        objtype: 30,
        objid: self.data.categoryId,
        objtitle: self.data.detail.actname,
        creater: self.data.user.id,
        status:1,
      };
    app.wxRequest('POST', url, data, (res) => {
      wx.showToast({
        title: '操作成功！', // 标题
        icon: 'success', // 图标类型，默认success
        duration: 1500 // 提示窗停留时间，默认1500ms
      })
      self.onLoad(self.data.options)
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  onLoad: function(options) { //读取活动对应id
    this.setData({
      categoryId: options.categoryId,
      user: wx.getStorageSync('userInfo'),
      options: options
    })
    this.detail()
    this.comment()
    this.news()
    this.news_detail()
    this.ifzan()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.news_detail()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(options) {
    this.comment()
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