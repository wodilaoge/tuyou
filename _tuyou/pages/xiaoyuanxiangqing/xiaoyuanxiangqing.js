const app = getApp();
Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    TabCur: 0,
    paimingCur:0,
    categoryId:'',
    detail:[],//页面详细内容
    comment:[],
    comment_detail:[],
    news:[],
    news_detail:[]
  },
  tabSelect(e) {
    console.log(e);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
    })
  },
  paimingSelect(e) {
    console.log(e);
    this.setData({
      paimingCur: e.currentTarget.dataset.id,
    })
  },
  pinluntiaozhuan(e) {//评论跳转
    console.log(e);
    wx.navigateTo({
      url: '/pages/pinlunliebiao/pinlunliebiao',
    })
  },
  chakanhuifu(e) {//评论跳转
    console.log(e);
    wx.navigateTo({
      url: '/pages/chakanhuifu/chakanhuifu',
    })
  },
  detail() {//页面项目信息
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
  comment() {//评论
    let url = app.globalData.URL + '/comm/listCommByObj';
    let data = {
      objid: this.data.categoryId,
      objtype: 30
    };
    app.wxRequest('GET', url, data, (res) => {
      this.setData({
        comment: res.data
      });
        
      console.log(this.data.comment.list);
      this.setData({
        comment_detail: this.data.comment.list
      });
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  news() {//活动新闻
    let url = app.globalData.URL + '/news/listNewsByAct';
    let data = {
      actid: this.data.categoryId
    };
    app.wxRequest('GET', url, data, (res) => {
      this.setData({
        news: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  news_detail() {//活动新闻
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
  onLoad: function (options) {//读取活动对应id
    this.setData({
      categoryId: options.categoryId
    })
    this.detail()
    this.comment()
    this.news()
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.news_detail()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.news_detail()
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