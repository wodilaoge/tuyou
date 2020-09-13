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
    isshare:0,
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
    app.wxRequest('GET', url, data, (res) => {
      console.log(res)
      this.setData({
        tdxxDeatil: res.data,
        duizhangID: res.data.lid,
        isCaptain: res.data.lid == wx.getStorageSync('userInfo').id
      })
      url = app.globalData.URL + '/config/getProvince';

      util.gets(url, {}).then(function (res) {
        console.log('省份', res.data)
        for (let i of res.data.data) {
          if (that.data.tdxxDeatil.province == i.code) {
            console.log(i)
            var t = 'tdxxDeatil.province'
            that.setData({
              [t]: i.name
            })
            break
          }
        }
      })
      that.getDuizhang()
    }, (err) => {
      console.log(err.errMsg)
    });


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

  toViewPre(e){
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
            if(res.data.code==0)
            wx.showToast({
              title: '转让成功',
              duration: 1000,
            })
          else
            wx.showToast({
              title: res.data.msg,
              duration: 1000,
            })
          })
        }
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title:  '友点乐',
      path: 'pages/MyPages/my_team_detail/my_team_detail?isshare=1&&id='+this.data.tdxxId
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
            if(res.data.code==0)
              wx.showToast({
                title: '通过申请',
                duration: 1000,
              })
            else
              wx.showToast({
                title: res.data.msg,
                duration: 1000,
              })
          })
        } else {
          var url = app.globalData.URL + '/team/auditJoin';
          var data = {
            tid: that.data.tdxxId,
            uid: e.currentTarget.dataset.id,
            result: 30
          }
          util.gets(url, data).then(function (res) {
            console.log('拒绝申请', res.data)
            wx.showToast({
              title: res.data.msg,
              duration: 1000,
            })
          })
        }
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
            if(res.data.code==0)
            {
              wx.showToast({
                title: '删除成功',
              })
              that.secondLoad()
            }
            else
              wx.showToast({
                title: res.data.msg,
                duration: 1000,
              })
          })
        }
      }
    })
  },
  toout(){
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
            if(res.data.code==0)
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
  backHome(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  secondLoad(){
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