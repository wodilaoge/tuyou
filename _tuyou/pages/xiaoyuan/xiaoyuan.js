const app = getApp();
Page({
  data: {
    ActList: [],
    CustomBar: app.globalData.CustomBar,
    TabCur: 0,

    yundongCur: 'lanqiu', //运动内导航栏
    cardCur: 0,
    xiaoyuanSwiperList: [{
      id: 0,
      type: 'image',
      url: '/img/BasicsBg.png'
    }, {
      id: 1,
      type: 'image',
        url: '/img/BasicsBg.png',
    }, {
      id: 2,
      type: 'image',
      url: '/img/BasicsBg.png'
    }],
    yundongSwiperList: [{
      id: 0,
      type: 'image',
      url: '/img/yundong.png'
    }, {
      id: 1,
      type: 'image',
      url: '/img/yundong.png',
    }, {
      id: 2,
      type: 'image',
      url: '/img/yundong.png'
    }],
  },
  tabSelect(e) {
    console.log(e);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  yundongTabSelect(e) { //运动内导航栏1
    console.log(e);
    this.setData({
      yundongCur: e.currentTarget.dataset.cur,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  xuanran() {
    let url = app.globalData.URL + '/act/listCampusActivity';
    let data = {
      sid: '076002'
    };
    app.wxRequest('GET', url, data, (res) => {
      this.setData({
        ActList: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  onLoad() {
    this.xuanran();
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
  baomingcanjia(e) { //报名参加按钮跳转 带着活动id跳转
    wx.navigateTo({
      url: '../../pages/xiaoyuanxiangqing/xiaoyuanxiangqing?categoryId=' + e.currentTarget.id,
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