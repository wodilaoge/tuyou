//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    ActList: [],
    PageCur: 'basics',
    isshow: false,
    SwiperList: [],
    news: [],
    sport: "1dwad ",
    tabbar: {},
    swiperList: [{
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
    }],
    "items": [{
        "id": "1",
        "imageUrl": "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg",
        "content": "南昌校区图书馆"
      },
      {
        "id": "2",
        "imageUrl": 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
        "content": "抚州校区的西湖"
      },
      {
        "id": "3",
        "imageUrl": 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
        "content": "新生军训"
      },
      {
        "id": "4",
        "imageUrl": 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
        "content": "樱花广场"
      },
    ]

  },
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
  getinfo() {
    var url = app.globalData.URL + '/act/listCampusActivity';
    var data = '';
    app.wxRequest('GET', url, data, (res) => {
      this.setData({
        ActList: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  jump(e){
    app.globalData.tabbar = e.currentTarget.dataset.id;
    wx.switchTab({
      url: '/pages/xiaoyuan/xiaoyuan',
    })
  },
  news() { //活动新闻
    let url = app.globalData.URL + '/news/listNews';
    let data = {
      actid: '1025873553653760'
    };
    app.wxRequest('GET', url, data, (res) => {
      this.setData({
        news: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  toxiaoyuan: function(e) {
    wx.switchTab({
      url: "/pages/xiaoyuan/xiaoyuan"
    })
  },
  tosport: function(e) {
    wx.switchTab({
      url: "../../pages/xiaoyuan/xiaoyuan"
    })
  },
  toact: function(e) {
    wx.navigateTo({
      url: "../../pages/form_launch/form_launch"
    })
  },
  tovideo: function(e) {
    wx.navigateTo({
      url: "../../pages/form_video/form_video"
    })
  },
  topic: function(e) {
    wx.navigateTo({
      url: "../../pages/form_picture/form_picture"
    })
  },
  toteam: function(e) {
    wx.navigateTo({
      url: "../../pages/form_team/form_team"
    })
  },
  setshow: function(e) { //使发布4个按钮显示
    this.setData({
      isshow: this.data.isshow = !this.data.isshow
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.news();
    this.getinfo();
    // app.editTabbar();
  },

  toactivity: function(e) {
    console.log(e)
    wx.navigateTo({
      url: "../../pages/xiaoyuan/xiaoyuan"
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // app.hideTabBar();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // app.hideTabBar(); 
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