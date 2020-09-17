const app = getApp();
var util = require("../../../utils/util.js");
const r = require("../../../utils/cos-auth.min.js");
Page({
  data: {
    TabCur: 0,
    VerticalNavTop: 0,
    MainCur: '',
    list: [],
    activitylist: [],
    border: '',
    options: 1,
    joinnum: '0',
    createnum: '0',
    attentionnum: '0',
    needflesh: true,
  },
  tabSelect(e) {
    var that = this
    var userId = wx.getStorageSync('userInfo').id
    this.setData({
      TabCur: e.currentTarget.dataset.index,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })

    if (this.data.options == 1) {
      //参加的团队
      var url = app.globalData.URL + '/team/listByUser';
      var data = {
        uid: userId,
        acid1: e.currentTarget.dataset.id == '000' ? null : e.currentTarget.dataset.id
      }
      util.post_token(url, data).then(function (res) {
        console.log('参加', res.data)
        that.setData({
          showAct: res.data.data.list
        })
      })
    } else if (this.data.options == 2) {
      // 获取数据 发起的数量
      var url = app.globalData.URL + '/team/listSimpleTeam';
      var data = {
        uid: userId,
        acid1: e.currentTarget.dataset.id == '000' ? null : e.currentTarget.dataset.id
      }
      util.post_token(url, data).then(function (res) {
        console.log('发起', res.data)
        that.setData({
          showAct: res.data.data.list
        })
      })
    } else {
      // 获取数据 关注的数量
      var url = app.globalData.URL + '/follow/listFollowByUserType';
      var data = {
        uid: userId,
        objtype: "20"
      }
      util.gets(url, data).then(function (res) {
        console.log('关注', res.data)
        that.setData({
          showAct: res.data.data.list
        })
      })
    }
  },
  todetail(e) {
    console.log(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '/pages/MyPages/my_team_detail/my_team_detail?id=' + e.currentTarget.dataset.id,
    })
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  },

  select1() {
    var that = this
    var userId = wx.getStorageSync('userInfo').id
    this.setData({
      options: 1,
      needflesh: true
    })
    //参加的团队
    var url = app.globalData.URL + '/team/listByUser';
    var data = {
      uid: userId
    }
    util.post_token(url, data).then(function (res) {
      console.log('参加', res.data)
      that.setData({
        showAct: res.data.data.list,
        needflesh: true
      })
    })

  },

  select2() {
    var that = this
    var userId = wx.getStorageSync('userInfo').id
    this.setData({
      options: 2,
      needflesh: true
    })

    // 获取数据 发起的数量
    var url = app.globalData.URL + '/team/listSimpleTeam';
    var data = {
      uid: userId
    }
    util.post_token(url, data).then(function (res) {
      console.log('发起', res.data)
      that.setData({
        showAct: res.data.data.list
      })
    })
  },

  select3() {
    var that = this
    var userId = wx.getStorageSync('userInfo').id
    this.setData({
      options: 3,
      needflesh: true
    })
    // 获取数据 关注的数量
    var url = app.globalData.URL + '/follow/listFollowByUserType';
    var data = {
      uid: userId,
      objtype: "20"
    }
    util.gets(url, data).then(function (res) {
      console.log('关注', res.data)
      that.setData({
        showAct: res.data.data.list
      })
    })
  },
  onLoad: function (options) {
    let that = this;
    that.setData({
      lid: options.lid
    })
    var userId = wx.getStorageSync('userInfo').id

    var url, data
    //大类列表
    // url = app.globalData.URL + '/team/listAcid1ByLeader';
    // data = {
    //   lid: userId
    // }
    // util.gets(url, data).then(function (res) {
    //   var tmp = res.data.data
    //   tmp.unshift({
    //     code: '000',
    //     name: '全部'
    //   })
    //   that.setData({
    //     allAct: tmp
    //   })
    // })
    
    // 获取数据 参与的数量
    url = app.globalData.URL + '/team/listByUser';
    data = {
      uid: userId,
    }
    util.post_token(url, data).then(function (res) {
      console.log('参加', res.data)
      that.setData({
        showAct: res.data.data.list
      })
    })

    // 获取数据 各类数量
    url = app.globalData.URL + '/team/countMyTeam';
    util.gets(url, {}).then(function (res) {
      console.log('各类数量', res.data)
      that.setData({
        joinnum:res.data.data.join,
        createnum: res.data.data.pub,
        attentionnum:res.data.data.follow
      })
    })

    // // 获取数据 关注的数量
    // url = app.globalData.URL + '/follow/listFollowByUserType';
    // data = {
    //   uid: userId,
    //   objtype: "20"
    // }
    // util.gets(url, data).then(function (res) {
    //   console.log('关注', res.data)
    //   that.setData({
    //     attentionnum: res.data.data.count,
    //   })
    // })

    let list = [{}];
    for (let i in this.data.YundongList) {
      list[i] = {};
      list[i].name = this.data.YundongList[i].name;
      list[i].id = i;
    }
    this.setData({
      list: list,
      listCur: list[0]
    })
  },

  onReachBottom: function () {
    if (!this.data.needflesh)
      return
    console.log("上拉刷新")
    var that = this
    var url, data
    var userId = wx.getStorageSync('userInfo').id
    if (that.data.options == 1) { //参加的团队 初始化
      url = app.globalData.URL + '/team/listByUser';
      data = {
        uid: userId,
        border: that.data.border,
        acid1: that.data.MainCur
      }
      util.post_token(url, data).then(function (res) {
        console.log('参加', res.data)
        var _data = that.data.showAct
        for (let i of res.data.data.list)
          _data.push(i)
        that.setData({
          showAct: _data,
          border: res.data.data.border,
          needflesh: res.data.data.list.length != 0
        })
      })
    } else if (that.data.options == 2) {
      // 获取数据 发起的数量
      url = app.globalData.URL + '/team/listSimpleTeam';
      data = {
        uid: userId,
        border: that.data.border,
        acid1: that.data.MainCur
      }
      util.post_token(url, data).then(function (res) {
        console.log('发起', res.data)
        var _data = that.data.showAct
        for (let i of res.data.data.list)
          _data.push(i)
        that.setData({
          showAct: _data,
          border: res.data.data.border,
          needflesh: res.data.data.list.length != 0
        })
      })
    }
  }
})