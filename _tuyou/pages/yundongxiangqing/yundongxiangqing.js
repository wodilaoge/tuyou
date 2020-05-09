const app = getApp();
Page({
  data: {
    options:[],
    TabCur: 0,
    paimingCur: 0,

    SwiperList_zhaopian: [],
    detail:[],
    slogan: '',
    comment: [],
    comment_detail: [],

    likecount: 0,
    ifzan: false,
    isbaoming: 0,
    news: [],
    news_detail: [],
    shipin: [],
    shipin_detail: [],
    zhaopian: [],
    zhaopian_detail: [],
    user:[],
    swiperList: [{
      id: 0,
      type: 'image',
      url: '/img/yundongxiangqing.png'
    }, {
      id: 1,
      type: 'image',
      url: '/img/yundongxiangqing.png',
    }],

    swiperList_zhaopian: [{
      id: 0,
      type: 'image',
      path: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
      type: 'image',
      path: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      path: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      path: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      path: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      path: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      path: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }]

  },
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
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
  news() {//活动新闻
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
  getShipin() {//视频
    let url = app.globalData.URL + '/video/listActVideo';
    let data = {
      arctid: this.data.categoryId
    };
    app.wxRequest('GET', url, data, (res) => {
      this.setData({
        shipin: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  getZhaopian() {//照片
    let url = app.globalData.URL + '/photo/listActPhoto';
    let data = {
      arctid: this.data.categoryId
    };
    app.wxRequest('GET', url, data, (res) => {
      this.setData({
       zhaopian: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
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
      let list = self.data.comment.list
      if (list.length == 0)
        self.setData({
          loading: false,
          comment_detail: list
        });
      for (let i in list) {
        let url2 = app.globalData.URL + '/applaud/findApplaud'; //点赞情况

        data = {
          objtype: 30,
          objid: list[i].id,
          uid: self.data.user.id,
        };
        util.gets(url2, data).then(function (res) {
          list[i]['ifzan'] = res.data.data
        });
        url2 = app.globalData.URL + '/applaud/countByObj'; //点赞数
        data = {
          objid: list[i].id,
          objtype: 30
        };
        util.gets(url2, data).then(function (res) {
          list[i].praiseCnt = res.data.data
          if (i == list.length - 1) {
            self.setData({
              comment_detail: list,
              loading: false
            });
          }
        });
      }
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      slogan: options.slogan,
      categoryId: options.categoryId,
      user: wx.getStorageSync('userInfo'),
      TabCur: options.TabCur,
      options: options
    })
    this.comment()
    this.detail()
    this.news()
    this.news_detail()
    this.getShipin()
    this.getZhaopian()
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