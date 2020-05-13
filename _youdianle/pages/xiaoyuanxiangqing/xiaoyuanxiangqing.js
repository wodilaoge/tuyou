const app = getApp();
var util = require("../../utils/util.js");
Page({
  data: {
    chooseSize:false,
    animationData: {},
    Input:"",

    options: [],
    TabCur: 0,
    paimingCur: 0,
    categoryId: '',
    detail: [], //页面详细内容
    comment: [],
    comment_detail: [],
    news: [],
    news_detail: [],
    likecount: 0,
    ifzan: false,
    loading: true,
    signupway: false,
    user: [],
    //报名
    canjiaorguankan: 10,
    huodongfenzu: [],
    fenzuhide: false,
    fenzuindex: 0,
    xingmingInput: '',
    isguanzhu: false,
    isbaominggeren: 0,
    isbaomingtuandui: 0,
    baomingCur: 0,
    tuanduiSelect: [],
    members: [],
    shipin: [],
    video_id: 'video_0', ///用于切换视频
    bofang_if_id: 'video_0', /////用数字来表示匹配
    bofang_pid: '1', ///1表示有一个播放，0表示无播放
  },
  chooseSezi: function (e) {
    var that = this;
    // 创建一个动画实例
    var animation = wx.createAnimation({
      // 动画持续时间
      duration: 500,
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
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export()
      })
    }, 200)
  },
  hideModal: function (e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 1000,
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
    }, 200)
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
    let url = app.globalData.URL + '/comm/addComment';
    let data = {
      pid: null,
      objtype: 30,
      objid: self.data.categoryId,
      objtitle: self.data.objtitle,
      comment: self.data.Input,
      creater: self.data.user.id,
      createrAlias: self.data.user.nickname,
      createrHead: self.data.user.head
    };
    app.wxRequest('POST', url, data, (res) => {
      self.onLoad(self.data.options);
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
  //报名
  xingmingInput: function(e) { //input输入
    this.setData({
      xingmingInput: e.detail.value
    });
  },
  bindPickerChange: function(e) {
    this.setData({
      fenzuindex: e.detail.id
    })
  },
  bindRadioChange: function(e) {
    console.log(e)
    this.setData({
      canjiaorguankan: e.currentTarget.dataset.id
    })
  },
  xuanzetuandui() {
    wx.navigateTo({
      url: '/pages/xuanzetuandui1/xuanzetuandui1?lid=' + this.data.user.id,
    })
  },

  //
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
  pinluntiaozhuan(e) { //评论跳转
    wx.navigateTo({
      url: '/pages/pinlunliebiao/pinlunliebiao?categoryId=' + this.data.categoryId + '&objtitle=' + this.data.detail.actname,
    })
  },
  chakanhuifu: function(e) { //查看回放跳转
    wx.navigateTo({
      url: '/pages/chakanhuifu/chakanhuifu?id=' + e.currentTarget.dataset.id,
    })
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
    }, (err) => {
      console.log(err.errMsg)
    });
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
      if (self.data.ifzan)
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
  ////////////////////////////
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
  fenzu() { //分组和报名
    var self = this;
    let url = app.globalData.URL + '/act/listActGroup';
    let data = {
      actid: self.data.categoryId,
      signup: true
    }
    util.gets(url, data).then(function(res) {
      self.setData({
        huodongfenzu: res.data.data
      })
    }).then(function() {
      if (self.data.huodongfenzu.length == 0)
        self.setData({
          fenzuhide: true
        })
    })
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
  baomingzhuangtai() {
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
        console.log(data)
        util.post_token(url, data).then(function(res) {
          console.log(res)
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
  TBcontroll() { //同步控制
    var self = this;
    return new Promise(function(resolve, reject) {
      setTimeout(function() {

        resolve();
      }, 1000)
    })
  },
  onLoad: async function(options) { //读取活动对应id
    this.setData({
      categoryId: options.categoryId,
      user: wx.getStorageSync('userInfo'),
      TabCur: options.TabCur,
      options: options
    })
    this.fenzu()
    this.baomingzhuangtai()
    this.detail()
    this.comment()
    this.ifguanzhu()
    this.ifzan()
    this.news()
    this.news_detail()
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    await this.TBcontroll()
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
    wx.hideLoading()
  },

  getShipin() { //视频
    let url = app.globalData.URL + '/video/listActVideo';
    let data = {

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
  video_change: function(e) { ////视频切换
    console.log(e)
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.news_detail()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(options) {
    this.comment()
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