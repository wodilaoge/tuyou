const util = require("../../utils/util.js");
const app = getApp();
var provinceCode = wx.getStorageSync('province').code
var cityCode = wx.getStorageSync('city').code
var schoolCode = wx.getStorageSync('school').code
Page({
  data: {
    provinceList: [],
    city: [],
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    VerticalNavTop: 0,
    border: '',
    options: 1,
    allAct: [],
    list: [],
    load: true,
    needflesh: true,
    MainCur: '000'
  },
  onShow() {
    // this.onLoad()
  },
  onLoad(options) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    var that = this
    //大类列表
    var url = app.globalData.URL + '/config/findAllActivityClass1';
    util.gets(url, {}).then(function (res) {
      console.log('大类列表', res.data)
      var tmp = res.data.data
      tmp.unshift({
        code: '000',
        name: '全部'
      })
      that.setData({
        allAct: tmp
      })
    })

    //所有团队
    url = app.globalData.URL + '/team/listSimpleTeam';
    util.post_token(url, {
      acid1: null,
      province: provinceCode,
      city: cityCode,
      school: schoolCode
    }).then(function (res) {
      console.log('所有团队', res.data)
      that.setData({
        showAct: res.data.data.list,
        border: res.data.data.border
      })
      wx.hideLoading()
    })

  },

  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.index,
      MainCur: e.currentTarget.dataset.id,
      needflesh: true
    })
    var that = this
    var url = app.globalData.URL + '/team/listSimpleTeam';
    let _code = e.currentTarget.dataset.id
    var data
    if (_code == '000')
      data = {
        province: provinceCode,
        city: cityCode,
        school: schoolCode
      }
    else
      data = {
        acid1: _code,
        province: provinceCode,
        city: cityCode,
        school: schoolCode
      }
    // console.log(data)
    util.post_token(url, data).then(function (res) {
      console.log('选择大类', res.data)
      that.setData({
        showAct: res.data.data.list,
        border: res.data.data.border
      })
    })
  },

  toTeamDetail(e) {
    wx.navigateTo({
      url: '/pages/MyPages/my_team_detail/my_team_detail?id=' + e.currentTarget.dataset.id,
    })
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.city;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].code);
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

  onReachBottom: function () {
    if (!this.data.needflesh)
      return
    console.log("上拉刷新")
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var that = this
    var url = app.globalData.URL + '/team/listSimpleTeam';
    var data = {
      province: provinceCode,
      city: cityCode,
      school: schoolCode,
      acid1: that.data.MainCur == '000' ? null : that.data.MainCur,
      border: that.data.border
    }
    console.log(data)
    util.post_token(url, data).then(function (res) {
      console.log('上拉刷新结果', res.data)
      var _data = that.data.showAct
      for (let i of res.data.data.list)
        _data.push(i)
      that.setData({
        showAct: _data,
        border: res.data.data.border,
        needflesh: res.data.data.list.length != 0
      })
      wx.hideLoading()
    })
  }
})