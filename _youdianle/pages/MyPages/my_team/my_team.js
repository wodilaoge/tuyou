const app = getApp();
Page({
  data: {
    TabCur: 0,
    VerticalNavTop: 0,
    MainCur: 0,
    YundongList: app.globalData.YundongList,
    list: [],
    activitylist:[],
    teams: [],
    lid: '',
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  tabSelectTeam(e) {
    console.log(e.currentTarget.dataset.item)
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setData({
      tuanduiSelect: e.currentTarget.dataset.item
    });
    wx.navigateBack({
      delta: 1
    })
  },
  todetail(e){
    console.log(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '/pages/MyPages/my_team_detail/my_team_detail?id=' + e.currentTarget.dataset.item.id,
    })
  },
  VerticalMain(e) {
    let self = this;
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
      self.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        self.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  },
  getteams() {
    let t=wx.getStorageSync('userinfo')
    var self = this
    let url = app.globalData.URL + '/team/listByLeader'
    let data = {
      lid: t.id
    }
    app.wxRequest('GET', url, data, (res) => {
      console.log(res.data)
      self.setData({
        teams: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
    let url2 = app.globalData.URL + '/team/listAcid1ByLeader'
    let data2 = {
      lid: t.id
    }
    app.wxRequest('GET', url2, data2, (res) => {
      console.log(res.data)
      self.setData({
        activitylist: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this;
    // wx.showLoading({
    //   title: '加载中...',
    //   mask: true
    // });
    self.setData({
      lid: options.lid
    })
    self.getteams()
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