const app = getApp();
var util = require("../../utils/util.js");
Page({
  data: {
    bt: '校园活动',
    btdata: [{
        id: 0,
        name: "校园活动"
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
        name: "视频"
      },
      /*{
        id: 5,
        name: "新闻"
      },*/
    ],
    ActList: [],
    yundongList: [],
    wenyuList: [],
    aihaoList: [],
    shipinList: [],
    yundongdalei: [],
    shipindalei: [],
    wenyudalei: [],
    aihaodalei: [],
    yundongxiaolei: [],
    wenyuxiaolei: [],
    aihaoxiaolei: [],
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
    shipinCur: '', //视频内导航栏
    xiaoyuanSwiperList: [],
    yundongSwiperList: [],
    wenyuSwiperList: [],
    aihaoSwiperList: [],
    shipinSwiperList: [],
    shipin: [],
    //news: [],
    //news_detail: [],
    video_id: 'video_0', ///用于切换视频
    bofang_if_id: 'video_0', /////用数字来表示匹配
    bofang_pid: '1', ///1表示有一个播放，0表示无播放
  },
  tabSelect(e) {
    app.globalData.tabbar = e.currentTarget.dataset.id;
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  /*news() { //活动新闻
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
  },*/
  yundongTabSelect(e) { //运动内导航栏1
    this.setData({
      yundongCur: e.currentTarget.dataset.cur,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
    var self = this
    let url = app.globalData.URL + '/config/getActivityClass2'
    let data = {
      cid: self.properties.yundongCur
    }
    util.gets(url, data).then(function(res) {
      self.setData({
        yundongxiaolei: res.data.data
      })
    })
  },
  wenyuTabSelect(e) { //文娱内导航栏
    this.setData({
      wenyuCur: e.currentTarget.dataset.cur,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
    var self = this
    let url = app.globalData.URL + '/config/getActivityClass2'
    let data = {
      cid: self.properties.wenyuCur
    }
    util.gets(url, data).then(function(res) {
      self.setData({
        wenyuxiaolei: res.data.data
      })
    })
  },
  aihaoTabSelect(e) { //爱好内导航栏
    this.setData({
      aihaoCur: e.currentTarget.dataset.cur,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
    var self = this
    let url = app.globalData.URL + '/config/getActivityClass2'
    let data = {
      cid: self.properties.aihaoCur
    }
    util.gets(url, data).then(function(res) {
      self.setData({
        aihaoxiaolei: res.data.data
      })
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

    util.gets(url1, []).then(function (res) {
      self.setData({
        bkData: res.data.data
      })
      for (var i in res.data.data) {
        var url = app.globalData.URL + '/act/listActivity';
        var url2 = app.globalData.URL + '/secrot/listSecrotation';
        if (res.data.data[i].name == "校园活动") {
          let data = {
            sid: res.data.data[i].code,
            pageSize: 2
          };
          app.wxRequest('GET', url, data, (res) => {
            self.setData({
              ActList: res.data,
              activityborder: res.data.border
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
          util.gets(urldalei, data).then(function (res) {
            self.setData({
              yundongdalei: res.data.data,
              yundongCur: res.data.data[0].code
            })
          }).then(function () {
            data = {
              sid: self.data.yundongid,
              acid1: self.data.yundongCur
            }
            util.gets(url, data).then(function(res) {
              self.setData({
                yundongList: res.data.data
              })
            }).then(function () {
              let urlxiaolei = app.globalData.URL + '/config/getActivityClass2'
              let dataxiaolei = {
                cid: self.data.yundongCur
              }
              util.gets(urlxiaolei, dataxiaolei).then(function(res) {
                self.setData({
                  yundongxiaolei: res.data.data
                })
              })
            })
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
              wenyuSwiperList: res.data,
              shipinSwiperList: res.data
            })
          }, (err) => {
            console.log(err.errMsg)
          });
          var urldalei = app.globalData.URL + '/config/getActivityClass1'; //查询大类
          util.gets(urldalei, data).then(function (res) {
            self.setData({
              wenyudalei: res.data.data,
              wenyuCur: res.data.data[0].code,
              shipindalei: res.data.data,
            })
          }).then(function () {
            data = {
              sid: self.data.wenyuid
            }
            util.gets(url, data).then(function(res) {
              self.setData({
                wenyuList: res.data.data
              })
            }).then(function() {
              let urlxiaolei = app.globalData.URL + '/config/getActivityClass2'
              let dataxiaolei = {
                cid: self.data.wenyuCur
              }
              util.gets(urlxiaolei, dataxiaolei).then(function(res) {
                self.setData({
                  wenyuxiaolei: res.data.data
                })
              })
            })
          })
        }
        if (res.data.data[i].name == "爱好") {
          self.setData({
            aihaoid: res.data.data[i].code
          })
          let data = {
            sid: res.data.data[i].code
          };

          app.wxRequest('GET', url2, data, (res) => {
            self.setData({
              aihaoSwiperList: res.data
            })
          }, (err) => {
            console.log(err.errMsg)
          });

          var urldalei = app.globalData.URL + '/config/getActivityClass1'; //查询大类
          util.gets(urldalei, data).then(function (res) {
            self.setData({
              aihaodalei: res.data.data,
              aihaoCur: res.data.data[0].code
            })
          }).then(function () {
            data = {
              sid: self.data.aihaoid
            }
            util.gets(url, data).then(function(res) {
              self.setData({
                aihaoList: res.data.data
              })
            }).then(function() {
              let urlxiaolei = app.globalData.URL + '/config/getActivityClass2'
              let dataxiaolei = {
                cid: self.data.aihaoCur
              }
              util.gets(urlxiaolei, dataxiaolei).then(function(res) {
                self.setData({
                  aihaoxiaolei: res.data.data
                })
              })
            })
          })
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
            })
            if (res.data.data[0]) {
              self.setData({
                shipinCur: res.data.data[0].code
              })

            }
          }).then(function () {
            data = {
              sid: self.data.shipinid,
              acid1: self.data.shipinCur
            }
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
      }
    })
  },

  getShipin() { //视频
    let url = app.globalData.URL + '/video/listActVideo';
    let data = {

    };
    app.wxRequest('GET', url, data, (res) => {
      console.log('shipin', res)
      this.setData({
        shipin: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  video_change: function (e) { ////视频切换
    if (this.data.bofang_if_id != e.currentTarget.id) { ///相等表示点击和播放不匹配
      if (this.data.bofang_pid == '0') {
        this.setData({
          bofang_pid: '1'
        })
      }

      var now_id = e.currentTarget.id;
      var prev_id = this.data.video_id;
      this.setData({
        video_id: now_id,
        bofang_if_id: now_id
      })
      wx.createVideoContext(prev_id).pause();
      wx.createVideoContext(now_id).play();


    } else { //////////当点击同一个，一次播放一次暂停
      if (this.data.bofang_pid == '1') {
        wx.createVideoContext(e.currentTarget.id).pause();
        this.setData({
          bofang_pid: '0'
        })
      } else {
        wx.createVideoContext(e.currentTarget.id).play();
        this.setData({
          bofang_pid: '1'
        })
      }
    }
  },
  change_sousuo: function () {
    wx.navigateTo({
      url: '../sousuo/sousuo',
    })
  },
  onLoad: function () {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          console.log('wx auth finished')
        } else {
          console.log('no auth')
          wx.showModal({
            title: '友点乐',
            content: '请先进行微信登录',
            cancelText: '取消',
            confirmText: '授权',
            success: res => {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/login/login',
                })
              } else {
                wx.navigateBack({
                  delta: 1
                })
              }
            }
          })
        }
      }
    })
    this.xuanran(); //初始化
    this.getShipin();
    this.setData({ //读取从首页转来活动对应的tabcur tabbar不能传参 把首页传来的参数放在globalData
      TabCur: app.globalData.tabbar
    })
    this.towerSwiper('xiaoyuanSwiperList')

  },
  onShow() {
    // this.setData({ //读取从首页转来活动对应的tabcur tabbar不能传参 把首页传来的参数放在globalData
    //   TabCur: app.globalData.tabbar
    // })


    //this.news()
    //this.news_detail()
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
      url: '../../pages/xiaoyuanxiangqing/xiaoyuanxiangqing?TabCur=0&categoryId=' + e.currentTarget.id,
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
  onShareAppMessage: function() {
    var that = this;
    return {
      title: '友点乐',
      path: 'pages/xiaoyuan/xiaoyuan',
      success: function(res) {
        console.log("转发成功:" + JSON.stringify(res));
        that.shareClick();
      },
      fail: function(res) {
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onReachBottom: function () {
    console.log("上拉刷新")
    let that = this;
    console.log(that.data.activityborder)
    if (that.data.TabCur == 0) {
      wx.showLoading({
        title: '加载中...',
        mask: true //显示触摸蒙层  防止事件穿透触发
      });
      var url = app.globalData.URL + '/act/listActivity';
      let data = {
        sid: '076002',
        border: that.data.ActList.border,
        pageSize: 2
      };
      app.wxRequest('GET', url, data, (res) => {
        console.log('刷新校园中', res)
        let t = 'ActList.list'
        var tmp = that.data.ActList.list
        for (let s of res.data.list)
          tmp.push(s)
        that.setData({
          [t]: tmp,
        })
        wx.hideLoading()
      }, (err) => {
        console.log(err.errMsg)
      });
    } else if (that.data.tabbar == 1) {
      wx.showLoading({
        title: '加载中...',
        mask: true //显示触摸蒙层  防止事件穿透触发
      });
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
      util.gets(urldalei, data).then(function (res) {
        self.setData({
          yundongdalei: res.data.data,
          yundongCur: res.data.data[0].code
        })
      }).then(function () {
        data = {
          sid: self.data.yundongid,
          acid1: self.data.yundongCur
        }
        util.gets(url, data).then(function (res) {
          self.setData({
            yundongList: res.data.data
          })
        }).then(function () {
          let urlxiaolei = app.globalData.URL + '/config/getActivityClass2'
          let dataxiaolei = {
            cid: self.data.yundongCur
          }
          util.gets(urlxiaolei, dataxiaolei).then(function (res) {
            self.setData({
              yundongxiaolei: res.data.data
            })
          })
        })
      })
    }
  },

})