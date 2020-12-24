// pages/tuanduixinxi/tuanduixinxi.js
const app = getApp();
var util = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tdxxId: '',
    tdxxDeatil: [],
    duiyuanID: '',
    testData: [],
    duizhangID: '',
    duiyuanid: '',
    duizhangDeatil: [],
    listmemberdeatil: [],
    isCaptain: false,
    isshare: 0,
    hiddenmodalput: true,
    reason:'',
  },

  shutdown() {
    this.setData({
      hiddenmodalput: false
    });
  },
  getInput(e) {
    this.setData({
      Input: e.detail.value
    });
  },
  pinluntiaozhuan(e) { //评论跳转
    wx.navigateTo({
      url: '/pages/pinlunliebiao/pinlunliebiao?categoryId=' + this.data.tdxxId + '&objtitle=' + this.data.tdxxDeatil.name+'&objtype='+e.currentTarget.dataset.objtype,
    })
  },
  sentComment() {
    var that = this
    console.log('发布评论')
    var userInfo = wx.getStorageSync('userInfo')
    var url = app.globalData.URL + '/comm/addComment';
    var data = {
      objtype: 20,
      objid: that.data.tdxxId,
      objtitle: that.data.tdxxDeatil.name,
      comment: this.data.Input,
      creater: userInfo.id,
      createrAlias: userInfo.nickname,
      createrHead: userInfo.head,

    }
    util.post_token(url, data).then(function (res) {
      console.log('发布评论', res.data)
      if (res.data.code == 0) {
        wx.showToast({
          title: '评论成功',
          duration: 1000,
        })
        that.secondLoad()
      } else
        wx.showToast({
          title: res.data.msg,
          duration: 1000,
        })
        that.setData({
          chooseSize:false
        })
    })
  },
  zan() {
    var that = this
    var userInfo = wx.getStorageSync('userInfo')
    var url = app.globalData.URL + '/applaud/updateApplaud';
    var data = {
      objtype: 20,
      objid: that.data.tdxxId,
      objtitle: that.data.tdxxDeatil.name,
      creater: userInfo.id,
      status: that.data.iszan==false?1:0
    }
    util.post_token(url, data).then(function (res) {
      console.log('点赞', res.data)
      if (res.data.code == 0) {
        that.secondLoad()
      } else
        wx.showToast({
          title: res.data.msg,
          duration: 1000,
        })
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
  //弹框
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
  //取消按钮  
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  getreason(e) {
    this.setData({
      reason: e.detail.value
    })
  },
  //确认  
  confirm: function () {
    var that = this
    if (that.data.reason == '') {
      wx.showToast({
        title: '请填写解散理由',
      })
      return
    }
    let url = app.globalData.URL + '/team/cancelTeam';
    var data = {
      id: this.data.tdxxId,
      reason: this.data.reason,
      creater: this.data.duizhangID
    }
    util.gets(url, data).then(function (res) {
      console.log(res.data)
      if (res.data.code == 0) {
        wx.showToast({
          title: '解散成功',
          duration: 1000,
          success: function () {
            setTimeout(function () {
              wx.switchTab({
                url: '/pages/all_team/all_team',
                success: function () {
                  var page = getCurrentPages().pop();
                  if (page == undefined || page == null) return;
                  page.onLoad(); //重新刷新页面
                }
              })
            }, 1000);
          }
        })
        that.setData({
          hiddenmodalput: true,
          reason: ''
        })
      }
    })
  },
  modify() {
    wx.navigateTo({
      url: '/pages/form_team/form_team?modify=1&&id=' + this.data.tdxxId,
    })
  },
  cancelfollow() {
    var that = this
    console.log('取消关注')
    var url = app.globalData.URL + '/follow/updateFollow';
    var data = {
      objtype: 20,
      objid: that.data.tdxxId,
      objtitle: that.data.tdxxDeatil.name,
      status: 0
    }
    util.post_token(url, data).then(function (res) {
      console.log('取消关注', res.data)
      if (res.data.code == 0) {
        wx.showToast({
          title: '取消关注成功',
          duration: 1000,
        })
        that.secondLoad()
      } else
        wx.showToast({
          title: res.data.msg,
          duration: 1000,
        })
    })
  },
  followteam() {
    var that = this
    console.log('关注')
    var url = app.globalData.URL + '/follow/updateFollow';
    var data = {
      objtype: 20,
      objid: that.data.tdxxId,
      objtitle: that.data.tdxxDeatil.name,
      status: 1
    }
    util.post_token(url, data).then(function (res) {
      console.log('关注成功', res.data)
      if (res.data.code == 0) {
        wx.showToast({
          title: '关注成功',
          duration: 1000,
        })
        
        that.secondLoad()
      } else
        wx.showToast({
          title: res.data.msg,
          duration: 1000,
        })
    })
  },

  follow() {
    var that = this
    console.log('关注')
    var url = app.globalData.URL + '/follow/updateFollow';
    var data = {
      objtype: 10,
      objid: that.data.duizhangID,
      objtitle: that.data.tdxxDeatil.leader,
      status: 1
    }
    util.post_token(url, data).then(function (res) {
      console.log('关注成功', res.data)
      if (res.data.code == 0)
        wx.showToast({
          title: '关注成功',
          duration: 1000,
        })
      else
        wx.showToast({
          title: res.data.msg,
          duration: 1000,
        })
    })
  },

  getXinxi() {
    var that = this
    let url = app.globalData.URL + '/team/findTeam';
    let data = {
      id: this.data.tdxxId
    };
    console.log(data)
    util.gets(url, data).then(function (res) {
      console.log('findTeam', res.data)
      that.setData({
        tdxxDeatil: res.data.data,
        duizhangID: res.data.data.lid,
        isCaptain: res.data.data.lid == wx.getStorageSync('userInfo').id
      })
    }).then(() => {
      that.getDuizhang()
      //查询是否点赞
      url = app.globalData.URL + '/applaud/findApplaud';
      data = {
        objtype: 20,
        objid: this.data.tdxxId,
        uid: wx.getStorageSync('userInfo').id
      }
      util.gets(url, data).then(function (res) {
        console.log('查询是否点赞', res.data)
        that.setData({
          iszan: res.data.data
        })
      })
    })
    // app.wxRequest('GET', url, data, (res) => {
    //   console.log(res)
    //   this.setData({
    //     tdxxDeatil: res.data,
    //     duizhangID: res.data.lid,
    //     isCaptain: res.data.lid == wx.getStorageSync('userInfo').id
    //   })
    // }, (err) => {
    //   console.log(err.errMsg)
    // });
  },

  getDuizhang() {
    let url = app.globalData.URL + '/appuser/findUserByID';
    let data = {
      id: this.data.duizhangID,
    };
    app.wxRequest('GET', url, data, (res) => {
      console.log('findUserByID', res.data)
      this.setData({
        duizhangDeatil: res.data,
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },

  navziliao: function (e) {
    console.log(e)
    this.setData({
      duiyuanid: this.data.listmemberdeatil[0].uid
    })
    wx.navigateTo({
      url: '/pages/ziliao/ziliao?id=' + this.data.duiyuanid
    })

  },

  toViewPre(e) {
    wx.navigateTo({
      url: '/pages/ziliao/ziliao?id=' + e.currentTarget.dataset.id
    })
  },
  tocaptaindetail() {
    wx.navigateTo({
      url: '/pages/ziliao/ziliao?id=' + this.data.duizhangID,
    })
  },
  getListMember: function () {
    let url = app.globalData.URL + '/team/listMember';
    let data = {
      id: this.data.tdxxId
    };
    app.wxRequest('GET', url, data, (res) => {
      console.log(res.data)
      this.setData({
        listmemberdeatil: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  transfer(e) {
    var that = this
    wx.showModal({
      title: '确定转让队长？',
      // content: '确定要删除这张照片吗',
      cancelText: '取消',
      confirmText: '确认',
      success: res => {
        if (res.confirm) {
          console.log('转让队长通过')
          var url = app.globalData.URL + '/team/changeLeader';
          var data = {
            id: that.data.tdxxId,
            lid_old: that.data.duizhangID,
            lid_new: e.currentTarget.dataset.id
          }
          util.gets(url, data).then(function (res) {
            console.log('转让队长确定通过', res.data)
            if (res.data.code == 0)
              wx.showToast({
                title: '转让成功',
                duration: 1000,
              })
            else
              wx.showToast({
                title: res.data.msg,
                duration: 1000,
              })
            that.secondLoad()
          })
        }
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: '友点乐',
      path: '/pages/MyPages/my_team_detail/my_team_detail?isshare=1&&id=' + this.data.tdxxId
    }
  },
  pass(e) {
    var that = this
    wx.showModal({
      title: '确定通过申请？',
      // content: '确定要删除这张照片吗',
      cancelText: '取消',
      confirmText: '确认',
      success: res => {
        if (res.confirm) {
          console.log('通过申请通过')
          var url = app.globalData.URL + '/team/auditJoin';
          var data = {
            tid: that.data.tdxxId,
            uid: e.currentTarget.dataset.id,
            result: 10
          }
          util.gets(url, data).then(function (res) {
            console.log('通过申请确定通过', res.data)
            if (res.data.code == 0)
              wx.showToast({
                title: '通过申请',
                duration: 1000,
              })
            else
              wx.showToast({
                title: res.data.msg,
                duration: 1000,
              })
            that.secondLoad()
          })
        }
        // else {
        //   var url = app.globalData.URL + '/team/auditJoin';
        //   var data = {
        //     tid: that.data.tdxxId,
        //     uid: e.currentTarget.dataset.id,
        //     result: 30
        //   }
        //   util.gets(url, data).then(function (res) {
        //     console.log('拒绝申请', res.data)
        //     wx.showToast({
        //       title: res.data.msg,
        //       duration: 1000,
        //     })
        //   })
        // }
      }
    })
  },
  deleteMem(e) {
    var that = this
    //退出小组
    wx.showModal({
      title: '确定要删除该成员吗',
      // content: '确定要删除这张照片吗',
      cancelText: '取消',
      confirmText: '确认',
      success: res => {
        if (res.confirm) {
          console.log('delete confirm')
          var url = app.globalData.URL + '/team/leaveTeam';
          var data = {
            tid: that.data.tdxxId,
            uid: e.currentTarget.dataset.id,
            type: "30",
            creater: that.data.duizhangID
          }
          util.gets(url, data).then(function (res) {
            console.log('退出小组', res.data)
            if (res.data.code == 0) {
              wx.showToast({
                title: '删除成功',
              })
              that.secondLoad()
            } else
              wx.showToast({
                title: res.data.msg,
                duration: 1000,
              })
          })
        }
      }
    })
  },
  toout() {
    var that = this
    //退出小组
    wx.showModal({
      title: '确定要离开团队吗',
      // content: '确定要删除这张照片吗',
      cancelText: '取消',
      confirmText: '确认',
      success: res => {
        if (res.confirm) {
          console.log('离开团队 confirm')
          var url = app.globalData.URL + '/team/leaveTeam';
          var data = {
            tid: that.data.tdxxId,
            uid: wx.getStorageSync('userInfo').id,
            type: "20",
            creater: that.data.duizhangID
          }
          util.gets(url, data).then(function (res) {
            console.log('离开团队', res.data)
            if (res.data.code == 0)
              wx.showToast({
                title: '成功退出',
                duration: 2000,
              })
            else
              wx.showToast({
                title: res.data.msg,
                duration: 2000,
              })
          })
        }
      }
    })
  },

  tojoin() {
    var that = this
    //加入小组
    var url = app.globalData.URL + '/team/joinTeam';
    var data = {
      tid: that.data.tdxxId
    }
    util.gets(url, data).then(function (res) {
      console.log('加入小组', res.data)
      if (res.data.code == 0)
        wx.showToast({
          title: '已发送申请',
          duration: 1000,
        })
      else
        wx.showToast({
          title: res.data.msg,
          duration: 1000,
        })
    })
  },
  backHome() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  secondLoad() {
    var that = this
    this.getXinxi();
    // this.getDuizhang();
    this.getListMember();

    //历史活动
    var url = app.globalData.URL + '/team/listHisAct';
    var data = {
      id: that.data.tdxxId
    }
    util.gets(url, data).then(function (res) {
      console.log('历史活动', res.data)
      that.setData({
        historyAct: res.data.data
      })
    })
  },
  toact(e){
    app.globalData.tabbar = 1;
    wx.navigateTo({
      url: '/pages/yundongxiangqing/yundongxiangqing?TabCur=0&Title=' + e.currentTarget.dataset.yundong.actname + '&categoryId=' + e.currentTarget.dataset.yundong.actid + '&yes=' + 'yes',
    })
  },
  onLoad: function (options) {
    console.log(options.id)
    if (options.isshare == 1) {
      console.log('是分享进入');
      this.setData({
        'isshare': options.isshare
      })
    }
    var that = this
    this.setData({
      tdxxId: options.id
    })
    this.getXinxi();
    // this.getDuizhang();
    this.getListMember();

    //历史活动
    var url = app.globalData.URL + '/team/listHisAct';
    var data = {
      id: options.id
    }
    util.gets(url, data).then(function (res) {
      console.log('历史活动', res.data)
      that.setData({
        historyAct: res.data.data
      })
    })


  },

})