//index.js
//获取应用实例
const app = getApp()
var util = require("../../utils/util.js");
Page({
  data: {
    loadModal: true,
    ActList: [],
    PageCur: 'basics',
    isshow: false,
    schoolname: '',
    sectioninfo: [],
    SwiperList: [],
    SportList: [],
    news: [],
    indexs: 0, //学校
    school: [],
    aihaoList: [],
    wenyuList: [],
    videolist: [],
    sport: "1dwad ",
    tabbar: {},
    swiperList: [],
    items: [{
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
  toaddress() {
    wx.setStorageSync('addressMode', '1')
    wx.navigateTo({
      url: '/pages/form_address/form_address',
    })
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
  tofind() {
    wx.navigateTo({
      url: '/pages/sousuo/sousuo',
    })
  },
  yundongxiangqing(e) {
    wx.navigateTo({
      url: '/pages/yundongxiangqing/yundongxiangqing?TabCur=0&categoryId=' + e.currentTarget.dataset.yundong.id,
    })
  },
  baomingtiaozhan(e) {
    wx.navigateTo({
      url: '/pages/yundongxiangqing/yundongxiangqing?TabCur=1&categoryId=' + e.currentTarget.dataset.yundong.id,
    })
  },
  getuploadinfo() {
    var that = this
    let url = app.globalData.URL + '/config/getSections';
    var url2 = app.globalData.URL + '/secrot/listSecrotation';
    let data = '';
    let data2 = {
      sid: '076002'
    };
    util.gets_notoken(url, {}).then(function(res) {
      that.setData({
        sectioninfo: res.data
      })
    })
    util.gets_notoken(url2, data2).then(function(res) {
      that.setData({
        swiperList: res.data.data
      })
    })
  },
  getinfo() {
    var url = app.globalData.URL + '/act/listActivityHome';
    var data = {
      sid: '076002',
      pageSize: 5
    };
    app.wxRequest_notoken('GET', url, data, (res) => {
      this.setData({
        ActList: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  getsportinfo() {
    var url = app.globalData.URL + '/act/listActivityHome';
    var data = {
      sid: '076003'
    };
    app.wxRequest_notoken('GET', url, data, (res) => {
      this.setData({
        SportList: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  getplayinfo() {
    var url = app.globalData.URL + '/act/listActivityHome';
    var data = {
      sid: '076004'
    };
    app.wxRequest_notoken('GET', url, data, (res) => {
      this.setData({
        wenyuList: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  gethobbyinfo() {
    var url = app.globalData.URL + '/act/listActivityHome';
    var data = {
      sid: '076005'
    };
    app.wxRequest_notoken('GET', url, data, (res) => {
      this.setData({
        aihaoList: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  getvideoinfo() {
    var url = app.globalData.URL + '/video/listActVideoHome';
    var data = {};
    app.wxRequest_notoken('GET', url, data, (res) => {
      this.setData({
        videolist: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  jump(e) {
    app.globalData.tabbar = e.currentTarget.dataset.id;
    wx.switchTab({
      url: '/pages/xiaoyuan/xiaoyuan',
    })
  },
  // news() { //活动新闻
  //   let url = app.globalData.URL + '/news/listNews';
  //   let data = {
  //     actid: '1025873553653760'
  //   };
  //   app.wxRequest('GET', url, data, (res) => {
  //     this.setData({
  //       news: res.data
  //     })
  //   }, (err) => {
  //     console.log(err.errMsg)
  //   });
  // },
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
  onShow: function(e) {},
  onLoad: function(options) {
    this.startReportHeart()
    var n = wx.getStorageSync('school')
    if (n.length) {
      this.setData({
        schoolname: n.name
      })
    }
    // this.school();
    this.getinfo(); //校园活动
    this.getsportinfo(); //运动信息
    this.getplayinfo(); //文娱信息
    this.gethobbyinfo(); //爱好信息
    this.getvideoinfo(); //视频信息
    this.getuploadinfo(); //轮播图
  },


  // onLoad: function(options) {
  //   let temp = wx.getStorageSync('userInfo')
  //   if (temp) {
  //     console.log('index ok!')
  //     var n = wx.getStorageSync('school')
  //     if (n.length) {
  //       this.setData({
  //         schoolname: n.name
  //       })
  //     }
  //     this.school();
  //     this.getinfo();
  //     this.getsportinfo(); //运动信息
  //     this.getplayinfo(); //文娱信息
  //     this.gethobbyinfo(); //爱好信息
  //     this.getvideoinfo(); //视频信息
  //     this.getuploadinfo();
  //     // app.editTabbar();
  //     // this.getShipin();

  //   } else {
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况 appjs的callback方法
  //     console.log('new user')
  //     app.employIdCallback = res => {
  //       console.log('userInfoReadyCallback: ', res.data.data);
  //       wx.setStorageSync('userInfo', res.data.data)
  //       var n = wx.getStorageSync('school')
  //       if (n) {
  //         this.setData({
  //           schoolname: n.name
  //         })
  //       }
  //       this.school();
  //       this.getinfo();
  //       this.getsportinfo(); //运动信息
  //       this.getplayinfo(); //文娱信息
  //       this.gethobbyinfo(); //爱好信息
  //       this.getvideoinfo(); //视频信息
  //       this.getuploadinfo();
  //     }
  //   }
  // },
  todetail(e) { //报名参加按钮跳转 带着活动id跳转 校园活动
    wx.navigateTo({
      url: '../../pages/xiaoyuanxiangqing/xiaoyuanxiangqing?categoryId=' + e.currentTarget.id,
    })
  },
  toactivity: function(e) {
    console.log(e)
    wx.navigateTo({
      url: "../../pages/xiaoyuan/xiaoyuan"
    })
  },
  PickerSchool(e) {
    this.setData({
      indexs: e.detail.value,
    })
  },
  startReportHeart() {
    var that = this
    var timerTem = setTimeout(function() {
      if (app.globalData.userInfo.token == null) {
        that.startReportHeart()
      } else {
        wx.showToast({
          title: '友点乐欢迎您！',
          duration: 2000,
          success: function() {
          }
        })
        that.setData({
          loadModal: false
        })
      }
    }, 200)
    // 保存定时器name
    // console.log(app.data.globalData.userInfo)
    // if (app.globalData.userInfo)
    // console.log(app.globalData.userInfo)
    // that.setData({
    //   loadModal: false
    // })
  },
  // school() {
  //   let url = app.globalData.URL + '/config/getUniv';
  //   let data = {
  //     cid: '0033301'
  //   };
  //   app.wxRequest('GET', url, data, (res) => {
  //     this.setData({
  //       school: res.data
  //     })
  //   }, (err) => {
  //     console.log(err.errMsg)
  //   });
  // },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    var that = this;
    return {
      title: '友点乐',
      path: '/pages/index/index',
      success: function(res) {
        console.log("转发成功:"  + JSON.stringify(res));
        that.shareClick();
      },
      fail: function(res) {
        console.log("转发失败:"  + JSON.stringify(res));
      }
    }
  }
})