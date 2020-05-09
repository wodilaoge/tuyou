const app = getApp();
var util = require("../../utils/util.js");
Page({
  data: {
    bt:'校园活动',
    btdata:[
      {
        id:0,
        name:"校园活动"
      },
      {
        id: 1,
        name: "运动"
      },
      {
        id: 2,
        name: "文娱"
      },
      {
        id: 3,
        name: "爱好"
      },
      {
        id: 4,
        name: "新闻"
      },
      {
        id: 5,
        name: "视频"
      },
    ],
    ActList: [],
    yundongList: [],
    wenyuList: [],
    aihaoList: [],
    shhipinList: [],
    yundongdalei: [],
    shipindalei: [],
    wenyudalei: [],
    aihaodalei: [],
    yundongid: '',
    shipinid: '',
    aihaoid: '',
    wenyuid: '',
    CustomBar: app.globalData.CustomBar,
    TabCur: 0,
    bkData: [],
    yundongCur: '', //运动内导航栏
    wenyuCur: '', //文娱内导航栏
    aihaoCur: '', //爱好内导航栏
    shipinCur: '',//视频内导航栏
    xiaoyuanSwiperList: [],
    yundongSwiperList: [],
    wenyuSwiperList: [],
    aihaoSwiperList: [],
    shipinSwiperList: [],
    huodongID: '5069992122908672',
    shipin: [],
    news: [],
    news_detail: [],
    shipindalei2: [
      {
        "code": "1",
        "name": "全部",
      },
      {
        "code": "2",
        "name": "校园",
      },
      {
        "code": "3",
        "name": "聚会",
      },
      {
        "code": "4",
        "name": "装扮",
      },
      {
        "code": "5",
        "name": "摄影",
      },
    ],
    
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
      bt: this.data.btdata[e.currentTarget.dataset.id].name
    })
  },
  news() {//活动新闻
    let url = app.globalData.URL + '/news/listNews';
    let data = {
      id: this.data.categoryId
    };
    app.wxRequest('GET', url, data, (res) => {
      console.log(res.data)
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
  yundongTabSelect(e) { //运动内导航栏1
    var url = app.globalData.URL + '/act/listActivity';
    let data = {
      sid: this.data.yundongid,
      acid1: e.currentTarget.dataset.cur
    };
    this.setData({
      yundongCur: e.currentTarget.dataset.cur,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  wenyuTabSelect(e) { //文娱内导航栏
    var url = app.globalData.URL + '/act/listActivity';
    let data = {
      sid: this.data.wenyuid,
      acid1: e.currentTarget.dataset.cur
    };
    this.setData({
      wenyuCur: e.currentTarget.dataset.cur,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  aihaoTabSelect(e) { //爱好内导航栏
    var url = app.globalData.URL + '/act/listActivity';
    let data = {
      sid: this.data.aihaoid,
      acid1: e.currentTarget.dataset.cur
    };
    this.setData({
      aihaoCur: e.currentTarget.dataset.cur,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  shipinTabSelect(e) { //视频内导航栏
    var url = app.globalData.URL + '/act/listActivity';
    let data = {
      sid: this.data.shipinid,
      acid1: e.currentTarget.dataset.cur
    };
    this.setData({
      shipinCur: e.currentTarget.dataset.cur,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  xuanran() {
    var self = this;
    let url1 = app.globalData.URL + '/config/getSections';

    util.gets(url1, []).then(function(res) {
      self.setData({
        bkData: res.data.data
      })

      for (var i in res.data.data) {
        var url = app.globalData.URL + '/act/listActivity';
        var url2 = app.globalData.URL + '/secrot/listSecrotation';
        if (res.data.data[i].name == "校园活动") {
          let data = {
            sid: res.data.data[i].code
          };
          app.wxRequest('GET', url, data, (res) => {
            console.log(res.data)
            self.setData({
              ActList: res.data
            })
          }, (err) => {
            console.log(err.errMsg)
          });
          app.wxRequest('GET', url2, data, (res) => {
            self.setData({
              xiaoyuanSwiperList: res.data
            })
          }, (err) => {
            console.log(err.errMsg)
          });
          continue;
        }
        if (res.data.data[i].name == "运动") {
          self.setData({
            yundongid: res.data.data[i].code
          })
          let data = {
            sid: res.data.data[i].code
          };

          app.wxRequest('GET', url2, data, (res) => {
            self.setData({
              yundongSwiperList: res.data
            })
          }, (err) => {
            console.log(err.errMsg)
          });
          var urldalei = app.globalData.URL + '/config/getActivityClass1'; //查询大类
          util.gets(urldalei, data).then(function(res) {
            self.setData({
              yundongdalei: res.data.data,
              yundongCur: res.data.data[0].code
            })
          }).then(function() {
            data = {
              sid: self.data.yundongid,
              acid1: self.data.yundongCur
            }
            console.log(data)
            app.wxRequest('GET', url, data, (res) => {
              self.setData({
                yundongList: res.data
              })
            }, (err) => {
              console.log(err.errMsg)
            });
          })
          continue;
        }
        if (res.data.data[i].name == "视频") {
          self.setData({
            shipinid: res.data.data[i].code
          })
          let data = {
            sid: res.data.data[i].code
          };

          app.wxRequest('GET', url2, data, (res) => {
            self.setData({
             shipinSwiperList: res.data
            })
          }, (err) => {
            console.log(err.errMsg)
          });
          var urldalei = app.globalData.URL + '/config/getActivityClass1'; //查询大类
          util.gets(urldalei, data).then(function (res) {
            self.setData({
             shipindalei: res.data.data,
             shipinCur: res.data.data[0].code
            })
          }).then(function () {
            data = {
              sid: self.data.shipinid,
              acid1: self.data.shipinCur
            }
            console.log(data)
            app.wxRequest('GET', url, data, (res) => {
              self.setData({
                shipinList: res.data
              })
            }, (err) => {
              console.log(err.errMsg)
            });
          })
          continue;
        }
        if (res.data.data[i].name == "文娱") {
          self.setData({
            wenyuid: res.data.data[i].code
          })
          let data = {
            sid: res.data.data[i].code
          };

          app.wxRequest('GET', url2, data, (res) => {
            self.setData({
              wenyuSwiperList: res.data
            })
          }, (err) => {
            console.log(err.errMsg)
          });
          var urldalei = app.globalData.URL + '/config/getActivityClass1'; //查询大类
          util.gets(urldalei, data).then(function (res) {
            self.setData({
              wenyudalei: res.data.data,
              wenyuCur: res.data.data[0].code
            })
          }).then(function () {
            data = {
              sid: self.data.wenyuid,
              acid1: self.data.wenyuCur
            }
            console.log(data)
            app.wxRequest('GET', url, data, (res) => {
              self.setData({
                wenyuList: res.data
              })
            }, (err) => {
              console.log(err.errMsg)
            });
          })
        }
      }
    })
  },
  getShipin() {//视频
    let url = app.globalData.URL + '/video/listActVideo';
    let data = {
      arctid: this.data.huodongID
    };
    app.wxRequest('GET', url, data, (res) => {
      console.log(res)
      this.setData({
        shipin: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  onLoad: function() {
    this.setData({ //读取从首页转来活动对应的tabcur tabbar不能传参 把首页传来的参数放在globalData
      TabCur: app.globalData.tabbar
    })
    this.towerSwiper('xiaoyuanSwiperList')
    this.getShipin()
    this.news()
    this.news_detail()
  },
  onShow() {
    this.setData({ //读取从首页转来活动对应的tabcur tabbar不能传参 把首页传来的参数放在globalData
      TabCur: app.globalData.tabbar
    })
    this.xuanran();
  },
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  xiaoyuanxiangqing(e) { //其他位置跳转
    wx.navigateTo({
      url: '../../pages/xiaoyuanxiangqing/xiaoyuanxiangqing?TabCur=0&categoryId=' + e.currentTarget.id ,
    }) 
  },
  baomingcanjia(e) { //报名参加按钮跳转 带着活动id跳转 校园活动
    wx.navigateTo({
      url: '../../pages/xiaoyuanxiangqing/xiaoyuanxiangqing?TabCur=1&categoryId=' + e.currentTarget.id,
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
})