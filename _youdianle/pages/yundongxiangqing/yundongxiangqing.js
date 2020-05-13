const app = getApp();
var util = require("../../utils/util.js");
Page({
  data: {
    options: [],
    TabCur: 0,
    paimingCur: 0,

    SwiperList_zhaopian: [],
    detail: [],
    comment: [],
    comment_detail: [],
    yibaomingList:[],

    isguanzhu: false,

    signupway: true,
    isbaominggeren: 0,
    isbaomingtuandui: 0,
    baomingCur: 0,
    canjiaorguankan: 10,
    huodongfenzu: [],
    fenzuhide: false,
    tuanduiSelect: [],
    members: [],

    likecount: 0,
    ifzan: false,
    news: [],
    news_detail: [],
    shipin: [],
    shipin_detail: [],

    video_id: 'video_0', ///用于切换视频
    bofang_if_id: 'video_0', /////用数字来表示匹配
    bofang_pid: '1', ///1表示有一个播放，0表示无播放
    zhaopian: [],
    zhaopian_detail: [],
    user: [],
    swiperList: [{
      id: 0,
      type: 'image',
      url: '/img/yundongxiangqing.png'
    }, {
      id: 1,
      type: 'image',
      url: '/img/yundongxiangqing.png',
    }],
    rotationhide:true,

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
  xuanzetuandui() {
    wx.navigateTo({
      url: '/pages/xuanzetuandui1/xuanzetuandui1?lid=' + this.data.user.id,
    })
  },
  baomingSelect(e) {
    if (e.currentTarget.dataset.id == 0)
      this.setData({
        baomingCur: e.currentTarget.dataset.id,
        canjiaorguankan: 10,
      })
    else
      this.setData({
        baomingCur: e.currentTarget.dataset.id,
        canjiaorguankan: 20,
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
  bindPickerChange: function (e) {
    this.setData({
      fenzuindex: e.detail.id
    })
  },
  bindRadioChange: function (e) {
    this.setData({
      canjiaorguankan: e.currentTarget.dataset.id
    })
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
  getZhaopian() { //照片
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
  rotation(){
    var self=this
    let url = app.globalData.URL + '/act/findRotations';
    let data={
      actid:self.data.categoryId
    }
    util.gets(url, data).then(function (res) {
      self.setData({
        swiperList:res.data.data
      })
      if(res.data.data.length!=0)
      {
        self.setData({
          rotationhide:false
        })
      }
    });
  },
  yibaoming(){
    let url = app.globalData.URL + '/act/listActSignupTopN';
    let data={
      actid:this.data.categoryId
    }
    app.wxRequest('GET', url, data, (res) => {
      this.setData({
        yibaomingList: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  detail() { //页面项目信息
    let url = app.globalData.URL + '/act/findActivity';
    let data = {
      id: this.data.categoryId
    };
    app.wxRequest('GET', url, data, (res) => {
      this.setData({
        detail: res.data
      })
      if (this.data.detail.signupway == "30")
        this.setData({
          signupway: false,
          baomingCur: 0
        })
      else if (this.data.detail.signupway == "10")
        this.setData({
          signupway: true,
          baomingCur: 0
        })
      else if (this.data.detail.signupway == "20")
        this.setData({
          signupway: true,
          baomingCur: 1
        })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  
  comment() { //评论
    var self = this
    let url = app.globalData.URL + '/comm/listCommByObj';
    let data = {
      objid: this.data.categoryId,
      objtype: 30
    };
    app.wxRequest('GET', url, data, (res) => {
      this.setData({
        comment: res.data
      });
      if (self.data.comment.list.length == 0)
        self.setData({
          loading: false,
          comment_detail: self.data.comment.list
        });
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
            if (i == list.length - 1) {
              self.setData({
                comment_detail: list,
                loading: false
              });
            }
          });
        }
      }
    }, (err) => {
      console.log(err.errMsg)
    });
  },

  fenzu() { //分组和报名
    var self = this;
    let url = app.globalData.URL + '/act/listActGroup';
    let data = {
      actid: self.data.categoryId,
    }
    util.gets(url, data).then(function (res) {
      self.setData({
        huodongfenzu: res.data.data
      })
    }).then(function () {
      if (self.data.huodongfenzu.length == 0)
        self.setData({
          fenzuhide: true
        })
    })
  },
  ifzan() { //是否点赞
    self = this;
    let url = app.globalData.URL + '/applaud/findApplaud';
    let url2 = app.globalData.URL + '/applaud/countByObj'; //活动点赞数
    let data = {
      objtype: 30,
      objid: self.data.categoryId,
      uid: self.data.user.id,
    };
    app.wxRequest('GET', url, data, (res) => {
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
  zan() { //活动点赞或取消
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
        status: 1,
      };
    app.wxRequest('POST', url, data, (res) => {
      if (self.data.ifzan)
        self.setData({
          ifzan: false,
          likecount: self.data.likecount - 1
        })
      else
        self.setData({
          ifzan: true,
          likecount: self.data.likecount + 1
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
  zan_list(e) { //评论点赞或取消
    var self = this;
    let url = app.globalData.URL + '/applaud/updateApplaud';
    if (e.currentTarget.dataset.ifzan)
      var data = {
        objtype: 30,
        objid: e.currentTarget.dataset.objid,
        objtitle: '',
        creater: self.data.user.id,
        status: 0,
      };
    else
      var data = {
        objtype: 30,
        objid: e.currentTarget.dataset.objid,
        objtitle: '',
        creater: self.data.user.id,
        status: 1,
      };
    app.wxRequest('POST', url, data, (res) => {
      var list = self.data.comment_detail
      if (list[e.currentTarget.dataset.index].ifzan) {
        list[e.currentTarget.dataset.index].ifzan = false
        list[e.currentTarget.dataset.index].praiseCnt = list[e.currentTarget.dataset.index].praiseCnt - 1
        self.setData({
          comment_detail: list,
        })
      } else {
        list[e.currentTarget.dataset.index].ifzan = true
        list[e.currentTarget.dataset.index].praiseCnt = list[e.currentTarget.dataset.index].praiseCnt + 1
        self.setData({
          comment_detail: list,
        })
      }
      wx.showToast({
        title: '操作成功！', // 标题
        icon: 'success', // 图标类型，默认success
        duration: 1500 // 提示窗停留时间，默认1500ms
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  getShipin() { //视频
    let url = app.globalData.URL + '/video/listActVideo';
    let data = {

    };
    app.wxRequest('GET', url, data, (res) => {
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
/////////////////
  ifguanzhu() { //是否关注
    self = this;
    let url = app.globalData.URL + '/follow/findFollow';
    let data = {
      objtype: 30,
      objid: self.data.categoryId,
      uid: self.data.user.id,
    };
    app.wxRequest('GET', url, data, (res) => {
      self.setData({
        isguanzhu: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  guanzhu() { //活动关注或取消关注
    self = this;
    let url = app.globalData.URL + '/follow/updateFollow';
    if (self.data.isguanzhu)
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
        status: 1,
      };
    app.wxRequest('POST', url, data, (res) => {
      if (self.data.isguanzhu)
        self.setData({
          isguanzhu: false
        })
      else
        self.setData({
          isguanzhu: true
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

  ////////////////////////
  baomingzhuangtai() {//报名状态
    var self = this
    let url = app.globalData.URL + '/act/findActSignupTeamStatus'
    let data = {
      actid: self.data.categoryId,
      lid: self.data.user.id
    }
    util.gets(url, data).then(function (res) {
      if (res.data.data == null) { } else if (res.data.data.status == 10)
        self.setData({
          isbaomingtuandui: 1
        })
    })
    url = app.globalData.URL + '/act/findActSignupIndStatus'
    data = {
      actid: self.data.categoryId,
      uid: self.data.user.id
    }
    util.gets(url, data).then(function (res) {
      if (res.data.data == null) { } else if (res.data.data.status == 10)
        self.setData({
          isbaominggeren: 1
        })
    })
  },
  lijibaoming() {
    var self = this
    if (self.data.xingmingInput == '')
      wx.showToast({
        title: '请填写姓名！',
        image: '/img/fail.png',
        duration: 1000,
      })
    else {
      let url
      let data
      if (self.data.baomingCur == 0) {
        url = app.globalData.URL + '/act/addActSignupInd'
        if (self.data.fenzuhide)
          data = {
            actid: self.data.categoryId,
            groupid: "",
            mbrId: self.data.user.id,
            mbrAlias: self.data.user.nickname,
            mbrHead: self.data.user.head,
            mbrName: self.data.xingmingInput,
            signupType: self.data.canjiaorguankan,
            status: 10,
            creater: self.data.user.id
          }
        else
          data = {
            actid: self.data.categoryId,
            groupid: self.data.huodongfenzu[self.data.huodongindex].id,
            mbrId: self.data.user.id,
            mbrAlias: self.data.user.nickname,
            mbrHead: self.data.user.head,
            mbrName: self.data.xingmingInput,
            signupType: self.data.canjiaorguankan,
            status: 10,
            creater: self.data.user.id
          }
        util.post_token(url, data).then(function (res) {
          if (res.data.code == 0) {
            wx.showToast({
              title: '报名成功！', // 标题
              icon: 'success', // 图标类型，默认success
              duration: 1500 // 提示窗停留时间，默认1500ms
            })
            self.setData({
              isbaominggeren: 1
            })
          } else
            wx.showToast({
              title: '报名失败！',
              image: '/img/fail.png',
              duration: 1000,
            })
        })
      } else {
        if (self.data.tuanduiSelect.length == 0)
          wx.showToast({
            title: '请选择团队！',
            image: '/img/fail.png',
            duration: 1000,
          })
        else {
          url = app.globalData.URL + '/act/addActSignupTeam'
          if (self.data.fenzuhide)
            data = {
              actid: self.data.categoryId,
              groupid: "",
              tid: self.data.tuanduiSelect.id,
              team: self.data.tuanduiSelect.name,
              teamLogo: self.data.tuanduiSelect.logo,
              lid: self.data.user.id,
              signupType: self.data.canjiaorguankan,
              creater: self.data.user.id,
              members: self.data.members,
            }
          else
            data = {
              actid: self.data.categoryId,
              groupid: self.data.huodongfenzu[self.data.huodongindex].id,
              tid: self.data.tuanduiSelect.id,
              team: self.data.tuanduiSelect.name,
              teamLogo: self.data.tuanduiSelect.logo,
              lid: self.data.user.id,
              signupType: self.data.canjiaorguankan,
              creater: self.data.user.id,
              members: self.data.members,
            }
          util.post_token(url, data).then(function (res) {
            console.log(res)
            if (res.data.code == 0) {
              wx.showToast({
                title: '报名成功！', // 标题
                icon: 'success', // 图标类型，默认success
                duration: 1500 // 提示窗停留时间，默认1500ms
              })
              self.setData({
                isbaomingtuandui: 1
              })
            } else
              wx.showToast({
                title: '报名失败！',
                image: '/img/fail.png',
                duration: 1000,
              })
          })
        }
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      categoryId: options.categoryId,
      user: wx.getStorageSync('userInfo'),
      TabCur: options.TabCur,
      options: options
    })
    this.detail()
    this.yibaoming()
    this.rotation()
    this.baomingzhuangtai()
    this.ifguanzhu()
    this.ifzan()
    this.comment()
    this.fenzu()
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
    this.getShipin()
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