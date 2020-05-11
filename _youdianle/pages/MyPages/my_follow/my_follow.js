const app = getApp();
var util = require("../../../utils/util.js");
Page({

  data: {
    TabCur:0,
    infoall:[],
    lists: [{
        'name': '朋友',
        'num': 8
      },
      {
        'name': '活动',
        'num': 8
      },
      {
        'name': '团队',
        'num': 8
      }, 
      {
        'name': '视频',
        'num': 8
      },
      {
        'name': '新闻',
        'num': 8
      }
    ],
    fans: [{
        'image': '/img/login/icon.png',
        'name': '李曼曼'
      },
      {
        'image': '/img/login/icon.png',
        'name': '李曼曼'
      },
      {
        'image': '/img/login/icon.png',
        'name': '李曼曼'
      },
      {
        'image': '/img/login/icon.png',
        'name': '李曼曼'
      },
      {
        'image': '/img/login/icon.png',
        'name': '李曼曼'
      },
    ]
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    let url = app.globalData.URL + '/follow/listFollowByUserType';
    let t=wx.getStorageSync('userinfo')
    let data={
      'uid':t.id,
      'objtype':30
    }
    util.gets(url, data).then(function (res) {
      that.setData({
        infoall: res.data.data
      })
    })
  },
})