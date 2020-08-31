const app = getApp();
var util = require("../../../utils/util.js");
Page({
  data: {
    TabCur: 0,
    VerticalNavTop: 0,
    MainCur: 0,
    list: [],
    activitylist: [],

    options: 1,
    joinnum: '0',
    createnum: '0',
    attentionnum: '0',
  },
  tabSelect(e) {
    var that = this
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })

    if (this.data.options == 1) {
      //参加的团队
      var url = app.globalData.URL + '/team/listByUser';
      var data = {
        uid: userId,
        acid1: e.currentTarget.dataset.id
      }
      util.gets(url, data).then(function (res) {
        console.log('参加', res.data)
        that.setData({
          showAct: res.data.data
        })
      })
    }
    else if(this.data.options == 2){
          // 获取数据 发起的数量
    var url = app.globalData.URL + '/team/listSimpleTeam';
    var data = {
      uid: userId,
      acid1: e.currentTarget.dataset.id
    }
    util.post_token(url, data).then(function (res) {
      console.log('发起', res.data)
      that.setData({
        showAct: res.data.data.list
      })
    })
    }
    else{
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
      url: '/pages/MyPages/my_team_detail/my_team_detail?id=' + e.currentTarget.dataset.item.id,
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
    util.gets(url, data).then(function (res) {
      console.log('参加', res.data)
      that.setData({
        showAct: res.data.data
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

    //大类列表
    var url = app.globalData.URL + '/team/listAcid1ByLeader';
    var data = {
      lid: userId
    }
    util.gets(url, data).then(function (res) {
      console.log('大类', res.data)
      that.setData({
        allAct: res.data.data
      })
    })
    //参加的团队 初始化
    url = app.globalData.URL + '/team/listByUser';
    data = {
      uid: userId
    }
    util.gets(url, data).then(function (res) {
      console.log('参加', res.data)
      that.setData({
        joinnum: res.data.data.length,
        showAct: res.data.data
      })
    })

    // 获取数据 发起的数量
    url = app.globalData.URL + '/team/listSimpleTeam';
    data = {
      uid: userId
    }
    util.post_token(url, data).then(function (res) {
      console.log('发起', res.data)
      that.setData({
        createnum: res.data.data.list.length,
      })
    })

    // 获取数据 关注的数量
    url = app.globalData.URL + '/follow/listFollowByUserType';
    data = {
      uid: userId,
      objtype: "20"
    }
    util.gets(url, data).then(function (res) {
      console.log('关注', res.data)
      that.setData({
        attentionnum: res.data.data.count,
      })
    })



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

})