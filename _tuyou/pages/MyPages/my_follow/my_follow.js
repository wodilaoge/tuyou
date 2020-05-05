Page({

  data: {
    TabCur:0,
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

  },
})