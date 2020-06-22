// pages/ziliao/ziliao.js
const app = getApp();
var utils = require('../../utils/util.js');
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    TabCur: 0,
    duiyuanID: '',
    user: '',
    duiyuanDeatil: [],
    fensishu: 0,
    fensiDetail: [],
    haoyoushu: 0,
    dianzanshu: 0,
    ifguanzhu: 0,
    ifziji: 0,
    huodongshu: 0,

    count: 0,
    comment: [],
    chooseSize: false,
    ifzan: false,
    Input: "",
    options: '',
    ziliaoDalei: [],
    ziliaoDaleiCur: '',
    paimingDetail: [],
    duiyuanAge: 0,
    ifFX: '0',
    ifTrue: '1',
    /////////////活动
    scrollLeft: 0,
    AllActivity: [],
    TabCur2: 0,
    createnum: 0,
    initialcode: '076003001',
    Mycreate: [],
    huodongXuanze: 2,
    nowActNum: 0,
    huodongBorder: 0,
    isRefleshHuodong: true,
    huodongXiaoleiIndex:0,
    //////////////
    shipin: [],
    uid: '',
    city: '',
    univ: '',
    shipinBorder: 0,
    isRefleshshipin: true,
    isRefleshshipinPinglun: true,
    video_id: 'video_0', ///用于切换视频
    bofang_if_id: 'video_0', /////用数字来表示匹配
    bofang_pid: '0', ///1表示有一个播放，0表示无播放
    shipin_xiaolei: 0,
  },
  /////////////////////视频
  getShipinFenye() { //视频分页
    var self = this;
    let url = app.globalData.URL + '/video/listActVideo';
    let data = {
      pageSize: 2,
      acid1: self.data.AllActivity[self.data.shipin_xiaolei].code === null ? '076003001' : self.data.AllActivity[self.data.shipin_xiaolei].code,
      uid: self.data.duiyuanID,
      border: this.data.shipinBorder,
      // city: this.data.city,
      // univ: this.data.univ,
    };
    app.wxRequest('POST', url, data, (res) => {
      if (res.data.border == null) {
        self.setData({
          isRefleshshipin: false,
        })
      }
      let shipintmp = self.data.shipin;
      for (let s of res.data.list)
        shipintmp.list.push(s)
      self.setData({
        shipin: shipintmp,
        shipinBorder: res.data.border,
      })

    }, (err) => {
      console.log(err.errMsg)
    });
  },
  video_change: function (e) { ////视频切换
    var self = this;
    var shipintmp = this.data.shipin;
    if (this.data.bofang_if_id != e.currentTarget.id) { ///相等表示点击和播放不匹配
      if (this.data.bofang_pid == '0') {
        this.setData({
          bofang_pid: '1'
        })
      }
      let url = app.globalData.URL + '/video/updatePlayCnt';
      let data = {
        id: this.data.shipin.list[e.currentTarget.dataset.index].id,
      };
      app.wxRequest('POST', url, data, (res) => {})
      shipintmp.list[e.currentTarget.dataset.index].playCnt = shipintmp.list[e.currentTarget.dataset.index].playCnt + 1;
      self.setData({
        shipin: shipintmp
      })

      let now_id = e.currentTarget.id;
      let prev_id = this.data.video_id;
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
        let url = app.globalData.URL + '/video/updatePlayCnt';
        let data = {
          id: this.data.shipin.list[e.currentTarget.dataset.index].id,
        };
        app.wxRequest('GET', url, data, (res) => {})
        shipintmp.list[e.currentTarget.dataset.index].playCnt = shipintmp.list[e.currentTarget.dataset.index].playCnt + 1;
        self.setData({
          shipin: shipintmp
        })
      }
    }
  },

  shipinguanzhu: function (e) {
    var self = this;
    let shipintmp = this.data.shipin;
    if (shipintmp.list[e.currentTarget.dataset.index].myFollow == 1) {
      shipintmp.list[e.currentTarget.dataset.index].myFollow = 0;
      self.setData({
        shipin: shipintmp
      })
      let url = app.globalData.URL + '/follow/updateFollow';
      let data = {
        objtype: 50,
        objid: self.data.shipin.list[e.currentTarget.dataset.index].id,
        objtitle: self.data.shipin.list[e.currentTarget.dataset.index].title,
        creater: self.data.user.id,
        status: 0,
      };
      app.wxRequest('POST', url, data, (res) => {}, (err) => {});

    } else {
      shipintmp.list[e.currentTarget.dataset.index].myFollow = 1;
      self.setData({
        shipin: shipintmp
      })
      let url = app.globalData.URL + '/follow/updateFollow';
      let data = {
        objtype: 50,
        objid: self.data.shipin.list[e.currentTarget.dataset.index].id,
        objtitle: self.data.shipin.list[e.currentTarget.dataset.index].title,
        creater: self.data.user.id,
        status: 1,
      };
      app.wxRequest('POST', url, data, (res) => {}, (err) => {});
    }
  },
  shipinDianzan: function (e) {
    var self = this;
    let shipintmp = this.data.shipin;
    if (shipintmp.list[e.currentTarget.dataset.index].myApplaud == 1) {
      shipintmp.list[e.currentTarget.dataset.index].myApplaud = 0;
      shipintmp.list[e.currentTarget.dataset.index].applaudCnt--;
      self.setData({
        shipin: shipintmp
      })
      let url = app.globalData.URL + '/applaud/updateApplaud';

      let data = {
        objtype: 50,
        objid: self.data.shipin.list[e.currentTarget.dataset.index].id,
        objtitle: self.data.shipin.list[e.currentTarget.dataset.index].title,
        creater: self.data.user.id,
        status: 0,
      };
      app.wxRequest('POST', url, data, (res) => {}, (err) => {});

    } else {
      shipintmp.list[e.currentTarget.dataset.index].myApplaud = 1;
      shipintmp.list[e.currentTarget.dataset.index].applaudCnt++;
      self.setData({
        shipin: shipintmp
      })
      let url = app.globalData.URL + '/applaud/updateApplaud';
      let data = {
        objtype: 50,
        objid: self.data.shipin.list[e.currentTarget.dataset.index].id,
        objtitle: self.data.shipin.list[e.currentTarget.dataset.index].title,
        creater: self.data.user.id,
        status: 1,
      };
      app.wxRequest('POST', url, data, (res) => {}, (err) => {});
    }
  },


  shipinChooseSezi: function (e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(200).step()
    that.setData({
      shipinAnimationData: animation.export(),
      shipinChooseSize: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        shipinAnimationData: animation.export()
      })
    }, 100)
    that.setData({
      shipin_index: e.currentTarget.dataset.index,
    })

    /////
    var shipintmp = this.data.shipin;
    let url = app.globalData.URL + '/comm/listCommByObj';
    let data = {
      objtype: 50,
      objid: e.currentTarget.dataset.dxid,
    };
    app.wxRequest('GET', url, data, (res) => {
      if (res.data.border == null) {
        that.setData({
          isRefleshshipinPinglun: false
        })
      }
      shipintmp.list[e.currentTarget.dataset.index].listComm = res.data.list;
      that.setData({
        shipin: shipintmp,
        shipinPinglunBorder: res.data.border,
      })
    }, (err) => {
      console.log(err.errMsg)
    });


  },
  getShipinPinglunFenye: function (e) {
    var shipintmp = this.data.shipin;
    let url = app.globalData.URL + '/comm/listCommByObj';
    let data = {
      objtype: 50,
      objid: this.data.shipin.list[this.data.shipin_index].id,
      border: this.data.shipinPinglunBorder,
    };
    app.wxRequest('GET', url, data, (res) => {
      if (res.data.border == null) {
        self.setData({
          isRefleshshipinPinglun: false
        })
      }
      for (let s of res.data.list) {
        shipintmp.list[this.data.shipin_index].listComm.push(s);
      }
      this.setData({
        shipin: shipintmp,
        shipinPinglunBorder: res.data.border,
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  hideModal: function (e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(200).step()
    that.setData({
      animationData: animation.export()

    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        chooseSize: false
      })
    }, 100)
  },
  shipinHideModal: function (e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(200).step()
    that.setData({
      shipinAnimationData: animation.export()
    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        shipinAnimationData: animation.export(),
        shipinChooseSize: false
      })
    }, 100)
  },
  emailInput: function (e) { //input输入
    this.setData({
      Input: e.detail.value
    });
  },
  ///////////////////////活动
  getHuodongDetail(e) {
    var that = this;
    var self = this;
    let url = app.globalData.URL + '/config/findAllActivityClass1';
    // 所有活动
    util.gets(url, {}).then(function (res) {
      that.setData({
        AllActivity: res.data.data
      })
    })


    url = app.globalData.URL + '/act/listActivity';
    let num
    let data = {
      uid:e.id,
      acid1: '076003001',

    };
    console.log(data)
    util.post_token(url, data).then(function (res) {

      console.log('Mycreate', res.data)
      if (res.data.data.border == null) {
        that.setData({
          isRefleshHuodong: false
        })
      }
      that.setData({
        Mycreate: res.data.data,
        nowActNum: res.data.data.list.length,
        huodongBorder:res.data.data.border,
      })
      console.log('Mycreate', that.data.Mycreate)
     
    })
  },
  getHuodongDetailXiaolei(e) {
    var that = this;
    var self = this;
    let url = app.globalData.URL + '/act/listActivity';
    let num
    let data = {
      uid:self.data.duiyuanID,
      acid1: that.data.AllActivity[e].code,

    };
    console.log(data)
    util.post_token(url, data).then(function (res) {

      console.log('Mycreate', res.data)
      if (res.data.data.border == null) {
        that.setData({
          isRefleshHuodong: false
        })
      }
      that.setData({
        Mycreate: res.data.data,
        nowActNum: res.data.data.list.length,
        huodongBorder:res.data.data.border,
      })
      console.log('Mycreate', that.data.Mycreate)
     
    })
  },
  getHuodongDetailXiaoleiFenye() {
    console.log('/////////////////////////////')
    var that = this;
    var self = this;
    let url = app.globalData.URL + '/act/listActivity';
    let num
    let data = {
      uid:self.data.duiyuanID,
      acid1: that.data.AllActivity[self.data.huodongXiaoleiIndex].code,
      border: that.data.huodongBorder,
    };
    console.log(data)
    util.post_token(url, data).then(function (res) {

      console.log('Mycreate', res.data)
      if (res.data.data.border == null) {
        that.setData({
          isRefleshHuodong: false
        })
      }
      let huodongtmp = self.data.Mycreate;
      for (let s of res.data.data.list)
      huodongtmp.list.push(s)
      that.setData({
        Mycreate: huodongtmp,
        nowActNum: self.data.nowActNum+res.data.data.list.length,
        huodongBorder: res.data.data.border,
      })
      console.log('Mycreate', that.data.Mycreate)
     
    })
  },
  flesh(tab) {
    console.log('flesh')
    var that = this
    console.log(that.data.AllActivity[tab].code)
    //我创建的活动
    // if (that.data.huodongXuanze == 1) {
    //   let url = app.globalData.URL + '/act/listMyActivity';
    //   let data = {
    //     'type': 20,
    //     'acid1': that.data.AllActivity[tab].code
    //   };
    //   util.post_token(url, data).then(function (res) {
    //     console.log('join', res.data)
    //     that.setData({
    //       Myjoin: res.data.data,
    //       nowActNum: res.data.data.list.length
    //     })
    //   })
    // } else if (that.data.huodongXuanze == 2) {
    //   let url = app.globalData.URL + '/act/listMyActivity';
    //   let data = {
    //     'type': 10,
    //     'acid1': that.data.AllActivity[tab].code
    //   };
    //   util.post_token(url, data).then(function (res) {
    //     console.log('create', res.data)
    //     that.setData({
    //       Mycreate: res.data.data,
    //       nowActNum: res.data.data.list.length
    //     })
    //   })
    // } else if (that.data.huodongXuanze == 3) {
    //   let url = app.globalData.URL + '/act/listMyActivity';
    //   let data = {
    //     'type': 30,
    //     'acid1': that.data.AllActivity[tab].code
    //   };
    //   util.post_token(url, data).then(function (res) {
    //     console.log('attention', res.data)
    //     that.setData({
    //       Myattention: res.data.data,
    //       nowActNum: res.data.data.list.length
    //     })
    //   })
    // }
    ////////////视频
    if (that.data.TabCur == 5) {
      let url = app.globalData.URL + '/video/listActVideo';
      let data = {
        acid1: that.data.AllActivity[tab].code,
        pageSize: 2,
        uid: that.data.duiyuanID,
        // city: this.data.city,
        // univ: this.data.univ ,
      };
      app.wxRequest('POST', url, data, (res) => {
        if (res.data.border == null) {
          that.setData({
            isRefleshshipin: false,
          })
        }
        let shipintmp = res.data;
        that.setData({
          shipin: shipintmp,
          shipinBorder: res.data.border,
          shipin_xiaolei: tab,
        })
      }, (err) => {
        console.log(err.errMsg)
      });

    }
    if(that.data.TabCur==4)(
      this.getHuodongDetailXiaolei(tab)
    )
  },
  tabSelect2(e) {
    this.setData({
      TabCur2: e.currentTarget.dataset.id,
      huodongXiaoleiIndex:e.currentTarget.dataset.id,
    })
    this.flesh(e.currentTarget.dataset.id)
  },
  ///////////评论
  comment() { //评论
    var self = this
    let url = app.globalData.URL + '/comm/countCommByObj';
    let data = {
      objid: this.data.duiyuanID,
      objtype: 10
    };
    app.wxRequest('GET', url, data, (res) => {
      console.log(res)
      self.setData({
        count: res.data
      });
    }, (err) => {
      console.log(err.errMsg)
    });
    url = app.globalData.URL + '/comm/listCommByObj';
    app.wxRequest('GET', url, data, (res) => {
      console.log(res)
      this.setData({
        comment: res.data
      });
      self.setData({
        loading: false
      });
      /*if (self.data.comment.length == 0)
        {}
      else {
        var list = self.data.comment.list

        for (let i in list) {
          let url2 = app.globalData.URL + '/applaud/findApplaud'; //点赞情况

          data = {
            objtype: 30,
            objid: list[i].id,
            uid: self.data.user.id,
          };
          util.gets(url2, data).then(function(res) {
            list[i]['ifzan'] = res.data.data
          });
          url2 = app.globalData.URL + '/applaud/countByObj'; //点赞数
          data = {
            objid: list[i].id,
            objtype: 30
          };
          util.gets(url2, data).then(function(res) {
            list[i].praiseCnt = res.data.data

            self.setData({
              comment_detail: list,
              loading: false
            });
          });
        }
      }*/
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  chooseSezi: function (e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(200).step()
    that.setData({
      animationData: animation.export(),
      chooseSize: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export()
      })
    }, 100)
    that.setData({
      duixiang: e.currentTarget.dataset.duixiang,
      dxid: e.currentTarget.dataset.dxid,
      dxtitle: e.currentTarget.dataset.dxtitle,
      dxindex: e.currentTarget.dataset.index,
    })
  },
  hideModal: function (e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(200).step()
    that.setData({
      animationData: animation.export()

    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        chooseSize: false
      })
    }, 100)
  },
  emailInput: function (e) { //input输入
    this.setData({
      Input: e.detail.value
    });
  },

  //评论
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
    if (this.data.duixiang == '50') {
      let url = app.globalData.URL + '/comm/addComment';
      let data = {
        pid: null,
        objtype: 50,
        objid: self.data.dxid,
        objtitle: self.data.dxtitle,
        comment: self.data.Input,
        creater: self.data.user.id,
        createrAlias: self.data.user.nickname,
        createrHead: self.data.user.head
      };
      let inputtmp = self.data.Input;
      let shipintmp = self.data.shipin
      app.wxRequest('POST', url, data, (res) => {
        ///////////////////本地添加评论内容
        shipintmp.list[self.data.dxindex].listComm.splice(0, 0, {
          'createrHead': self.data.user.head,
          'createrAlias': self.data.user.nickname,
          'comment': inputtmp,
          'strCreatetime': '刚刚',
        })
        shipintmp.list[self.data.dxindex].commCnt=shipintmp.list[self.data.dxindex].commCnt+1,
        self.setData({
          shipin: shipintmp,
        })
        wx.showToast({
          title: '评论成功！', // 标题
          icon: 'success', // 图标类型，默认success
          duration: 1500 // 提示窗停留时间，默认1500ms
        })

      }, (err) => {
        console.log(err.errMsg)
      });
    } else {
      let url = app.globalData.URL + '/comm/addComment';
      let data = {
        pid: null,
        objtype: 30,
        objid: self.data.categoryId,
        objtitle: "",
        comment: self.data.Input,
        creater: self.data.user.id,
        createrAlias: self.data.user.nickname,
        createrHead: self.data.user.head
      };
      console.log(data)
      app.wxRequest('POST', url, data, (res) => {
        self.comment();
        console.log(res)
        if (res.code == 0)
          wx.showToast({
            title: '评论成功！', // 标题
            icon: 'success', // 图标类型，默认success
            duration: 1500 // 提示窗停留时间，默认1500ms
          })
        else {
          console.log(res.data)
          wx.showToast({
            title: res.data.msg, // 标题
            image: '/img/fail.png', // 图标类型，默认success
            duration: 1000 // 提示窗停留时间，默认1500ms
          })
        }
      }, (err) => {
        console.log(err.errMsg)
      });
    }
    self.setData({
      Input: '',
    })
    self.hideModal()
  },
  pinluntiaozhuan(e) { //评论跳转
    wx.navigateTo({
      url: '/pages/pinlunliebiao/pinlunliebiao?categoryId=' + this.data.duiyuanID + '&objtitle=' + '',
    })
  },

  zan() { //活动点赞或取消
    self = this;
    let url = app.globalData.URL + '/applaud/updateApplaud';
    if (self.data.ifzan)
      var data = {
        objtype: 10,
        objid: self.data.duiyuanID,
        objtitle: '',
        creater: self.data.user.id,
        status: 0,
      };
    else
      var data = {
        objtype: 10,
        objid: self.data.duiyuanID,
        objtitle: '',
        creater: self.data.user.id,
        status: 1,
      };
    app.wxRequest('POST', url, data, (res) => {
      if (self.data.ifzan)
        self.setData({
          ifzan: false,
        })
      else
        self.setData({
          ifzan: true,
        })
      wx.showToast({
        title: '操作成功！', // 标题
        icon: 'success', // 图标类型，默认success
        duration: 500 // 提示窗停留时间，默认1500ms
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  /////////////
  tabSelect(e) {
    console.log(e);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
    })
  },

  getDuiyuan() {
    var that = this;
    var self = this;
    let url = app.globalData.URL + '/appuser/findUserByID';
    let data = {
      id: this.data.duiyuanID,
    };
    console.log(data)
    app.wxRequest('GET', url, data, (res) => {
      self.setData({
        duiyuanDeatil: res.data,
      })
      console.log(res.data)
      console.log(self.data.duiyuanDeatil)
      if (self.data.duiyuanDeatil.id == self.data.user.id) {
        self.setData({
          ifziji: 1,
        })
      }
      /////////////修改age
      let year = self.data.duiyuanDeatil.birthday.slice(0, 4);
      let mon = self.data.duiyuanDeatil.birthday.slice(5, 7);
      let day = self.data.duiyuanDeatil.birthday.slice(8, 10);
      console.log(year, mon, day)
      let nowtime = utils.formatTime(new Date());
      console.log(nowtime)
      let nyear = nowtime.slice(0, 4);
      let nmon = nowtime.slice(5, 7);
      let nday = nowtime.slice(8, 10);
      console.log(self.getAge(year, mon, day, nyear, nmon, nday));
      this.setData({
        duiyuanAge: self.getAge(year, mon, day, nyear, nmon, nday)
      })
      //////////////////////////获得视频
      wx.showLoading({
        title: '加载中...',
        mask: true //显示触摸蒙层  防止事件穿透触发
      });
      url = app.globalData.URL + '/video/listActVideo';
      data = {
        acid1: '076003001',
        'uid': res.data.id,
        pageSize: 2,
        // 'city': res.data.city===null?'':res.data.city,
        // 'univ':res.data.univ===null?'':res.data.univ
      };
      console.log(data)
      util.post_token(url, data).then(function (res) {
        console.log('video', res.data)
        wx.hideLoading()
        if (res.data.data.border == null) {
          self.setData({
            isRefleshshipin: false,
          })
        }
        that.setData({
          shipin: res.data.data,
          shipinBorder: res.data.data.border,
        })
      })

    }, (err) => {
      console.log(err.errMsg)
    });
  },
  getAge(year, mon, day, nyear, nmon, nday) {
    let age = 0;
    if (nday >= day) {
      if (nmon >= mon) {
        age = nyear - year
      } else(
        age = nyear - year - 1
      )
    } else {
      if (nmon > mon) {
        age = nyear - year
      } else(
        age = nyear - year - 1
      )
    }
    return age;
  },
  getFensi() {
    let url = app.globalData.URL + '/follow/countByObj';
    let data = {
      objid: this.data.duiyuanID,
      objtype: 10,
    };
    app.wxRequest('GET', url, data, (res) => {
      this.setData({
        fensishu: res.data,
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  getFensiDetail() {
    let url = app.globalData.URL + '/follow/listUserByObj';
    let data = {
      objid: this.data.duiyuanID,
      objtype: 10,
    };
    app.wxRequest('GET', url, data, (res) => {
      this.setData({
        fensiDetail: res.data,
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  getHaoyou() {
    let url = app.globalData.URL + '/follow/countByObj';
    let data = {
      objid: this.data.duiyuanID,
      objtype: 10,
    };
    app.wxRequest('GET', url, data, (res) => {
      this.setData({
        haoyoushu: res.data,
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  getDianzan() {
    let url = app.globalData.URL + '/applaud/countByObj';
    let data = {
      objid: this.data.duiyuanID,
      objtype: 10,
    };
    app.wxRequest('GET', url, data, (res) => {
      this.setData({
        dianzanshu: res.data,
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  getHuodong() {
    let url = app.globalData.URL + '/act/countActByUser';
    let data = {
      uid: this.data.duiyuanID,
    };
    app.wxRequest('GET', url, data, (res) => {
      this.setData({
        huodongshu: res.data,
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  getGuanzhu() {
    let url = app.globalData.URL + '/follow/findFollow';
    let data = {
      objid: this.data.duiyuanID,
      objtype: 10,
      uid: this.data.user.id
    };
    app.wxRequest('GET', url, data, (res) => {
      console.log(res.data)
      this.setData({
        ifguanzhu: res.data,
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  getPaimingDalei() {
    var self = this;
    let url = app.globalData.URL + '/config/findAllActivityClass1';
    let data = {};
    app.wxRequest('GET', url, data, (res) => {
      this.setData({
        ziliaoDalei: res.data,
        ziliaoDaleiCur: res.data[0].code,
      })

      url = app.globalData.URL + '/act/listMyRank'
      data = {
        uid: self.data.user.id,
        acid1: res.data[0].code
      }
      app.wxRequest('GET', url, data, (res) => {
     
        self.setData({
          paimingDetail: res.data
        })
      })

    }, (err) => {
      console.log(err.errMsg)
    });
  },
  ziliaoTabSelect(e) {
    this.setData({
      ziliaoDaleiCur: e.currentTarget.dataset.cur,
      // scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
    var self = this
    let url = app.globalData.URL + '/act/listMyRank'
    let data = {
      uid: self.data.user.id,
      acid1: self.data.ziliaoDaleiCur
    }
    app.wxRequest('GET', url, data, (res) => {
      console.log(res)
      self.setData({
        paimingDetail: res.data
      })
    })
    // if (this.data.shipinCur == '0') {
    //   this.getShipin()
    // } else {
    //   this.getShipinfenlei()
    // }
  },
  changeGuanzhu: function (e) {

    if (this.data.ifguanzhu == 0) {
      this.setData({
        ifguanzhu: 1,
        fensishu: this.data.fensishu + 1,
      })

      let url = app.globalData.URL + '/follow/updateFollow';
      let data = {
        objtype: 10,
        objid: this.data.duiyuanID,
        creater: this.data.user.id,
        objtitle: this.data.duiyuanDeatil.name,
        status: 1,
      };
      app.wxRequest('POST', url, data, (res) => {
        console.log(res)
      }, (err) => {});

    } else {
      this.setData({
        ifguanzhu: 0,
        fensishu: this.data.fensishu - 1,
      })
      let url = app.globalData.URL + '/follow/updateFollow';
      let data = {
        objtype: 10,
        objid: this.data.duiyuanID,
        creater: this.data.user.id,
        status: 0,
      };
      app.wxRequest('POST', url, data, (res) => {
        console.log(res)
      }, (err) => {});
    }
  },
  yundongxiangqing(e) {
    wx.navigateTo({
      url: '/pages/yundongxiangqing/yundongxiangqing?TabCur=0&categoryId=' + e.currentTarget.dataset.yundong.id+'&ziliaoID='+this.data.duiyuanID,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(options)
    this.setData({
      duiyuanID: options.id,
      user: wx.getStorageSync('userInfo'),
      options: options,
      ifFX: options.ifFX,
    })
    this.getHuodongDetail(options)
    this.getDuiyuan()
    this.getDianzan()
    this.getFensi()
    this.getHaoyou()
    this.getGuanzhu()
    this.getHuodong()
    this.comment()
    this.getFensiDetail()
    this.getPaimingDalei()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
    var self = this;
    if (self.data.TabCur == 5 && self.data.isRefleshshipin) {
      wx.showLoading({
        title: '加载中...',
        mask: true //显示触摸蒙层  防止事件穿透触发
      });
      this.getShipinFenye()
      wx.hideLoading()

    }
    if (this.data.isRefleshshipinPinglun == true && this.data.shipinChooseSize == true) {
      wx.showLoading({
        title: '加载中...',
        mask: true //显示触摸蒙层  防止事件穿透触发
      });
      this.getShipinPinglunFenye()
      wx.hideLoading({
        complete: (res) => {},
      })
    }
    if(self.data.TabCur == 4 && self.data.isRefleshHuodong){
      wx.showLoading({
        title: '加载中...',
        mask: true //显示触摸蒙层  防止事件穿透触发
      });
      this.getHuodongDetailXiaoleiFenye()
      wx.hideLoading({
        complete: (res) => {},
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    var that = this;
    if (e.target.dataset.duixiang == 50) {
      return {
        title: '友点乐',
        path: 'pages/fenxiangshipin/fenxiang?Tabcur=' + that.data.TabCur + '&shipinID=' + that.data.shipin.list[e.target.dataset.index].id,
        success: function (res) {
          console.log("转发成功:" + JSON.stringify(res));
          that.shareClick();
        },
        fail: function (res) {
          console.log("转发失败:" + JSON.stringify(res));
        }
      }
    } else {
      return {
        title: '友点乐',
        path: 'pages/ziliao/ziliao?ifFX=' + that.data.ifTrue + '&id=' + that.data.options.id,
        success: function (res) {
          console.log("转发成功:" + JSON.stringify(res));
          that.shareClick();
        },
        fail: function (res) {
          console.log("转发失败:" + JSON.stringify(res));
        }
      }
    }

  },
  navshouye() {
    wx.reLaunch({
      url: '../index/index'
    })
  },
})