const app = getApp()
var util = require("../../../utils/util.js");
Page({
  data: {
    color: 1,
    TabCur: 0,
    scrollLeft: 0,
    Activity:[],
    swip: ['活动审核', '新闻审核', '图片审核', '视频审核'],
    option: ['通过并置顶首页', '通过', '驳回'],
    options: 0,
  },
  changebutton(e) {
    this.setData({
      color: !this.data.color
    })
  },
  optionSelect(e) {
    this.setData({
      options: e.currentTarget.dataset.id,
    })
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  onLoad: function (options) {
    var that = this
    let url = app.globalData.URL + '/todo/listByRegion';
    let data = {
      'objtype': 30,
      'univ':'003330106',
      'province':'00333',
      'city':'0033301'
    };
    util.gets(url, data).then(function (res) {
      that.setData({
        Activity: res.data.data
      })
    })
  }
})