const app = getApp();
var util = require("../../utils/util.js");
Page({
  data: {
    chooseSize: false,
    animationData: {},
    Input: "",

    TabCur: 0,
    paimingCur: 0,
    biaoti:"",

    SwiperList_zhaopian: [],
    detail: [],
    comment: [],
    comment_detail: [],
    yibaomingList: [],

    isguanzhu: false,

    signupway: true,
    isbaominggeren: 0,
    isbaomingtuandui: 0,
    baomingCur: 0,
    canjiaorguankan: 10,
    huodongfenzu: [],
    picker: [],
    fenzuhide: false,
    fenzuindex: 0,
    tuanduiSelect: [],
    members: [], 
    xingmingInput: '',

    likecount: 0,
    ifzan: false,
    //news: [],
    //news_detail: [],
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
    rotationhide: true,

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
  bmtz(){
    this.setData({
      TabCur:1
    })
  },
  //发布评论
  chooseSezi: function(e) {
    var that = this;
    // 创建一个动画实例
    var animation = wx.createAnimation({
      // 动画持续时间
      duration: 100,
      // 定义动画效果，当前是匀速
      timingFunction: 'linear'
    })
    // 将该变量赋值给当前动画
    that.animation = animation
    // 先在y轴偏移，然后用step()完成一个动画
    animation.translateY(200).step()
    // 用setData改变当前动画
    that.setData({
      // 通过export()方法导出数据
      animationData: animation.export(),
      // 改变view里面的Wx：if
      chooseSize: true
    })
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
    setTimeout(function() {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export()
      })
    }, 100)
  },
  hideModal: function(e) {
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
    setTimeout(function() {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        chooseSize: false
      })
    }, 100)
  },
  emailInput: function(e) { //input输入
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
    app.wxRequest('POST', url, data, (res) => {
      self.comment();
      wx.showToast({
        title: '评论成功！', // 标题
        icon: 'success', // 图标类型，默认success
        duration: 1500 // 提示窗停留时间，默认1500ms
      })
    }, (err) => {
      console.log(err.errMsg)
    });
    self.setData({
      Input: '',
    })
    self.hideModal()
  },
  ////////////////
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
  bindPickerChange: function(e) {
    console.log(e)
    this.setData({
      fenzuindex: e.detail.value
    })
  },
  bindRadioChange: function(e) {
    this.setData({
      canjiaorguankan: e.currentTarget.dataset.id
    })
  },
  xingmingInput: function (e) { //input输入
    this.setData({
      xingmingInput: e.detail.value
    });
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
  chakanhuifu: function(e) { //查看回放跳转
    wx.navigateTo({
      url: '/pages/chakanhuifu/chakanhuifu?id=' + e.currentTarget.dataset.id,
    })
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
  rotation() {
    var self = this
    let url = app.globalData.URL + '/act/findRotations';
    let data = {
      actid: self.data.categoryId
    }
    util.gets(url, data).then(function(res) {
      self.setData({
        swiperList: res.data.data
      })
      if (res.data.data.length != 0) {
        self.setData({
          rotationhide: false
        })
      }
    });
  },
  yibaoming() {
    let url = app.globalData.URL + '/act/listActSignupTopN';
    let data = {
      actid: this.data.categoryId
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
    util.gets(url, data).then(function(res) {
      self.setData({
        huodongfenzu: res.data.data,
      })
    }).then(function() {
      if (self.data.huodongfenzu.length == 0)
        self.setData({
          fenzuhide: true
        })
      else {
        let picker = []
        for (let i in self.data.huodongfenzu) {
          picker[i] = self.data.huodongfenzu[i].groupname
        }
        self.setData({
          picker: picker
        })
      }
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
  video_change: function(e) { ////视频切换
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
  shipintiaozhuan() {
    wx.navigateTo({
      url: '../form_actid_video/form_actid_video?+actid=' + this.data.categoryId
    })
  },
  shipintiaozhuan() {
    wx.navigateTo({
      url: '../form_picture/form_picture?+actid=' + this.data.categoryId
    })
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
  baomingzhuangtai() { //报名状态
    var self = this
    let url = app.globalData.URL + '/act/findActSignupTeamStatus'
    let data = {
      actid: self.data.categoryId,
      lid: self.data.user.id
    }
    util.gets(url, data).then(function(res) {
      if (res.data.data == null) {} else if (res.data.data.status == 10)
        self.setData({
          isbaomingtuandui: 1
        })
    })
    url = app.globalData.URL + '/act/findActSignupIndStatus'
    data = {
      actid: self.data.categoryId,
      uid: self.data.user.id
    }
    util.gets(url, data).then(function(res) {
      if (res.data.data == null) {} else if (res.data.data.status == 10)
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
        util.post_token(url, data).then(function(res) {
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
          util.post_token(url, data).then(function(res) {
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
      biaoti:options.Title
    })
    this.detail()
    this.yibaoming()
    this.rotation()
    this.baomingzhuangtai()
    this.ifguanzhu()
    this.ifzan()
    this.comment()
    this.fenzu()
    //this.news()
    //this.news_detail()
    this.getShipin()
    this.getZhaopian()
    setTimeout(function () {
      if (this.data.detail.length == 0)
        wx.showToast({
          title: '暂无活动数据！', // 标题
          image: '/img/fail.png', // 图标类型，默认success
          duration: 1000 // 提示窗停留时间，默认1500ms
        })

      resolve();
    }, 1000)
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