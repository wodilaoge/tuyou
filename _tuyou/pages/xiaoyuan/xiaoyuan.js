const app = getApp();
Page({
  data: {
    ActList: [],
    yundongList: [],
    CustomBar: app.globalData.CustomBar,
    TabCur: 0,
    bkData: [],
    yundongCur: 'lanqiu', //运动内导航栏
    cardCur: 0,
    xiaoyuanSwiperList: [],
    yundongSwiperList: [],
  },
  tabSelect(e) {
    console.log(e);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  yundongTabSelect(e) { //运动内导航栏1
    this.setData({
      yundongCur: e.currentTarget.dataset.cur,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  xuanran() {
    var self=this;
    let url1 = app.globalData.URL + '/config/getSection';
    app.wxRequest('GET', url1, [], (res) => {
      self.setData({
        bkData: res.data
      })
      for (var i in res.data) {
        var url = app.globalData.URL + '/act/listCampusActivity';
        var url2 = app.globalData.URL + '/secrot/listSecrotation';
        if (res.data[i].name == "校园活动") {
          let data = {
            sid: res.data[i].code
          };
          app.wxRequest('GET', url, data, (res) => {
            console.log(res.data)
            this.setData({
              ActList: res.data
            })
          }, (err) => {
            console.log(err.errMsg)
          });
          app.wxRequest('GET', url2, data, (res) => {
            this.setData({
              xiaoyuanSwiperList: res.data
            })
          }, (err) => {
            console.log(err.errMsg)
          });
          continue;
        }
        if (res.data[i].name == "运动") {
          let data = {
            sid: res.data[i].code
          };
          app.wxRequest('GET', url, data, (res) => {
            this.setData({
              yundongList: res.data
            })
          }, (err) => {
            console.log(err.errMsg)
          });
          app.wxRequest('GET', url2, data, (res) => {
            this.setData({
              yundongSwiperList: res.data
            })
          }, (err) => {
            console.log(err.errMsg)
          });
        }
      }
    }, (err) => {
      console.log(err.errMsg)
      });

    
    
    
  },
  onLoad() {
    this.towerSwiper('xiaoyuanSwiperList');
  },
  onShow() {
    this.xuanran();
  },
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  baomingcanjia(e) { //报名参加按钮跳转 带着活动id跳转 校园活动
    wx.navigateTo({
      url: '../../pages/xiaoyuanxiangqing/xiaoyuanxiangqing?categoryId=' + e.currentTarget.id,
    })
  },
  yundongxiangqing(e) { //报名参加按钮跳转 带着活动id跳转 运动
    wx.navigateTo({
      url: '../../pages/yundongxiangqing/yundongxiangqing?categoryId=' + e.currentTarget.id,
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  }
})