
Page({

  data: {
    Lists: ['全部', '校园', '聚会', '装扮', '摄影'],
    TabCur: 0
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
    })
  },

  onLoad: function (options) {

  },
})