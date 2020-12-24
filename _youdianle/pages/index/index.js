//index.js
//获取应用实例
const app = getApp()
var util = require("../../utils/util.js");
var limit=0
Page({
  data: {
    isshowcampus: false,
    isshowparts: true, //文娱爱好是否显示
    loadModal: true,
    ActList: [],
    PageCur: 'basics',
    isshow: false,
    schoolname: '',
    sectioninfo: [],
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
    indexCurrent:null,
  },
  video_play(e) {
    var curIdx = e.currentTarget.id;
    // 没有播放时播放视频
    console.log(curIdx)
    if (!this.data.indexCurrent) {
      this.setData({
        indexCurrent: curIdx
      })
      var videoContext = wx.createVideoContext(curIdx,this) //这里对应的视频id
      videoContext.play()
    } else { // 有播放时先将prev暂停，再播放当前点击的current
      var videoContextPrev = wx.createVideoContext(this.data.indexCurrent,this)//this是在自定义组件下，当前组件实例的this，以操作组件内 video 组件（在自定义组件中药加上this，如果是普通页面即不需要加）
      if (this.data.indexCurrent != curIdx) {
        // console.log('123')
        videoContextPrev.pause()
        this.setData({
          indexCurrent: curIdx
        })
        var videoContextCurrent = wx.createVideoContext(curIdx,this)
        videoContextCurrent.play()
      }
    }
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
  ViewImage(path) {
    var t = []
    t.push(path)

      wx.previewImage({
        urls: t,
        current: path
      });
  },
  towebview(e) {
    let type=e.currentTarget.dataset.type
    if (type == 20) {
      wx.navigateTo({
        url: '/pages/webview3/webview3?url=' + e.currentTarget.dataset.link,
      })
    } else if (type == 10){
      wx.navigateTo({
        url: '/pages/yundongxiangqing/yundongxiangqing?TabCur=0&categoryId=' + e.currentTarget.dataset.link,
      })
    }
    else if (type == null){
      console.log('swiper null')
      this.ViewImage(e.currentTarget.dataset.path)
    }
  },
  getuploadinfo() {
    var that = this
    let url = app.globalData.URL + '/config/getSections';
    var url2 = app.globalData.URL + '/secrot/listSecrotation';
    let data2 = {};
    util.gets_notoken(url, {}).then(function (res) {
      that.setData({
        sectioninfo: res.data
      })
    })
    util.post(url2, data2).then(function (res) {
      that.setData({
        swiperList: res.data.data
      })
    })
  },
  getinfo() {
    var self=this

    var url,data
    //  url = app.globalData.URL + '/act/listCampusActivityHome';
    // let t= wx.getStorageSync('province').code?wx.getStorageSync('province').code:null
    // console.log('t',t)
    // data = {
    //   sid: '076002',
    //   province: wx.getStorageSync('province').code ? wx.getStorageSync('province').code : null,
    //   city: wx.getStorageSync('city').code ? wx.getStorageSync('city').code : null,
    //   univ: wx.getStorageSync('school').code ? wx.getStorageSync('school').code : null,
    //   pageSize: 5
    // };
    // app.wxRequest_notoken('POST', url, data, (res) => {
    //   this.setData({
    //     ActList: res.data
    //   })
    // }, (err) => {
    //   console.log(err.errMsg)
    // });

    url = app.globalData.URL + '/config/getActivityClass2'
    data = {
      cid: '076003001'
    }
    util.gets(url, data).then(function (res) {
      self.setData({
        yundongxiaolei: res.data.data
      })
    })
  },
  getsportinfo() {
    var that=this
    var url = app.globalData.URL + '/act/listActivityHome';
    var data = {
      sid: '076003',
      province: wx.getStorageSync('province').code ? wx.getStorageSync('province').code : null,
      city: wx.getStorageSync('city').code ? wx.getStorageSync('city').code : null,
      univ: wx.getStorageSync('school').code ? wx.getStorageSync('school').code : null,

    };
    app.wxRequest_notoken('POST', url, data, (res) => {
      console.log(res.data)
      let t = res.data.list[0].button
      console.log(t)
      if (t.signup != null)
        that.setData({
          button1: t.signup
        })
      else if (t.modify)
        that.setData({
          button1: t.modify
        })
      else if (t.cancel)
        that.setData({
          button1: t.cancel
        })
      else if (t.sendSignup)
        that.setData({
          button1: t.sendSignup
        })
      else
        that.setData({
          button1: null
        })
      this.setData({
        SportList: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  //文娱
  getplayinfo() {
    var that=this
    var url = app.globalData.URL + '/act/listActivityHome';
    var data = {
      sid: '076004',
      province: wx.getStorageSync('province').code ? wx.getStorageSync('province').code : null,
      city: wx.getStorageSync('city').code ? wx.getStorageSync('city').code : null,
      univ: wx.getStorageSync('school').code ? wx.getStorageSync('school').code : null,
    };
    app.wxRequest_notoken('POST', url, data, (res) => {
      let t = res.data.list[0].button
      console.log(t)
      if (t.signup != null)
        that.setData({
          button2: t.signup
        })
      else if (t.modify)
        that.setData({
          button2: t.modify
        })
      else if (t.cancel)
        that.setData({
          button2: t.cancel
        })
      else if (t.sendSignup)
        that.setData({
          button2: t.sendSignup
        })
      else
        that.setData({
          button2: null
        })
      this.setData({
        wenyuList: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  // 爱好
  gethobbyinfo() {
    var that=this
    var url = app.globalData.URL + '/act/listActivityHome';
    var data = {
      sid: '076005',
      province: wx.getStorageSync('province').code ? wx.getStorageSync('province').code : null,
      city: wx.getStorageSync('city').code ? wx.getStorageSync('city').code : null,
      univ: wx.getStorageSync('school').code ? wx.getStorageSync('school').code : null,
    };
    app.wxRequest_notoken('POST', url, data, (res) => {
      let t = res.data.list[0].button
      console.log(t)
      if (t.signup != null)
        that.setData({
          button3: t.signup
        })
      else if (t.modify)
        that.setData({
          button3: t.modify
        })
      else if (t.cancel)
        that.setData({
          button3: t.cancel
        })
      else if (t.sendSignup)
        that.setData({
          button3: t.sendSignup
        })
      else
        that.setData({
          button3: null
        })
      this.setData({
        aihaoList: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  getvideoinfo() {
    var that=this
    var url = app.globalData.URL + '/video/listActVideoHome';
    var data = {};
    app.wxRequest_notoken('POST', url, data, (res) => {
      this.setData({
        videolist: res.data,
        // province: wx.getStorageSync('province').code? wx.getStorageSync('province').code:null,
        city: wx.getStorageSync('city').code ? wx.getStorageSync('city').code : null,
        univ: wx.getStorageSync('school').code ? wx.getStorageSync('school').code : null,
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
  toxiaoyuan: function (e) {
    wx.switchTab({
      url: "/pages/xiaoyuan/xiaoyuan"
    })
  },
  tosport: function (e) {
    wx.switchTab({
      url: "../../pages/xiaoyuan/xiaoyuan"
    })
  },
  toact: function (e) {
    wx.navigateTo({
      url: "../../pages/form_launch/form_launch"
    })
  },
  tovideo: function (e) {
    wx.navigateTo({
      url: "../../pages/form_video/form_video"
    })
  },
  topic: function (e) {
    wx.navigateTo({
      url: "../../pages/form_picture/form_picture"
    })
  },
  toteam: function (e) {
    wx.navigateTo({
      url: "../../pages/form_team/form_team"
    })
  },
  setshow: function (e) { //使发布4个按钮显示
    this.setData({
      isshow: this.data.isshow = !this.data.isshow
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (e) {
    var n = wx.getStorageSync('school')
    var that=this
    if (n) {
      this.setData({
        schoolname: n.name
      })
    } else {
      n = wx.getStorageSync('city')
      if (n) {
        this.setData({
          schoolname: n.name
        })
      } else {
        n = wx.getStorageSync('province')
        if (n) {
          this.setData({
            schoolname: n.name
          })
        } else {
          this.setData({
            schoolname: '请选择地区'
          })
        }
      }
    }
    this.getinfo(); //校园活动
    this.getsportinfo(); //运动信息
    this.getplayinfo(); //文娱信息
    this.gethobbyinfo(); //爱好信息
    this.getvideoinfo(); //视频信息
    this.getuploadinfo(); //轮播图
    that.setData({
      loadModal: false
    })
  },
  onLoad: function (options) {
    this.startReportHeart()
    var n = wx.getStorageSync('school')
    if (n) {
      this.setData({
        schoolname: n.name
      })
    } else {
      n = wx.getStorageSync('city')
      if (n) {
        this.setData({
          schoolname: n.name
        })
      } else {
        n = wx.getStorageSync('province')
        if (n) {
          this.setData({
            schoolname: n.name
          })
        } else {
          this.setData({
            schoolname: '请选择地区'
          })
        }
      }
    }

    // this.getinfo(); //校园活动
    // this.getsportinfo(); //运动信息
    // this.getplayinfo(); //文娱信息
    // this.gethobbyinfo(); //爱好信息
    // this.getvideoinfo(); //视频信息
    // this.getuploadinfo(); //轮播图

  },
  onReady(){
    this.setData({
      loadModal: false
    })
  },
  todetail(e) { //报名参加按钮跳转 带着活动id跳转 校园活动
    wx.navigateTo({
      url: '../../pages/xiaoyuanxiangqing/xiaoyuanxiangqing?categoryId=' + e.currentTarget.id,
    })
  },
  toactivity: function (e) {
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
    var timerTem = setTimeout(function () {
      if (app.globalData.userInfo.token == null) {
        that.startReportHeart()
        limit++
      } 
      else if(limit==30)
      {
        that.setData({
          loadModal: false
        })
        console.log('加载超时')
      }
      else {
        wx.showToast({
          title: '友点乐欢迎您！',
          duration: 2000,
          success: function () {}
        })
        that.setData({
          loadModal: false
        })
      }
    }, 200)

  },

  onPullDownRefresh() {
    this.onLoad()
  },
  onShareAppMessage: function () {
    var that = this;
    return {
      title: '友点乐',
      path: '/pages/index/index',
      success: function (res) {
        console.log("转发成功:" + JSON.stringify(res));
        that.shareClick();
      },
      fail: function (res) {
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  }
})