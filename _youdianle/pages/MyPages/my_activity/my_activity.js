// pages/my_activity/my_activity.js
const app = getApp();
var util = require("../../../utils/util.js");
Page({

  data: {
    swip: ['活动审核', '新闻审核', '图片审核', '视频审核'],
    options: 1,
    TabCur: 0,
    AllActivity: [],
    MyActivity: [],
    hiddenmodalput: true,
    //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框  
    scrollLeft: 0
  },
  modalinput: function (e) {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput,
      tmpactid:e.currentTarget.dataset.id
    })
  },
  getans(e) {
    this.setData({
      ans: e.detail.value
    })
  },
  cancel2: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
    })
    this.flesh(e.currentTarget.dataset.id)
  },
  flesh(tab) {
    var that = this
    console.log(that.data.AllActivity[tab].code)
    //我创建的
    if (that.data.options == 1) {
      let url = app.globalData.URL + '/act/listMyActivity';
      let data = {
        'type': 10,
        'acid1': that.data.AllActivity[tab].code
      };
      util.post_token(url, data).then(function (res) {
        console.log('join', res.data)
        that.setData({
          Myjoin: res.data.data
        })
      })
    } else if (that.data.options == 2) {
      let url = app.globalData.URL + '/act/listMyActivity';
      let data = {
        'type': 20,
        'acid1': that.data.AllActivity[tab].code
      };
      util.post_token(url, data).then(function (res) {
        console.log('create', res.data)
        that.setData({
          Mycreate: res.data.data
        })
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  select1() {
    this.setData({
      options: 1
    })
  },

  select2() {
    this.setData({
      options: 2
    })
  },
  select3() {
    this.setData({
      options: 3
    })
  },
  cancelact(e) {
    var that = this
    wx.showModal({
      title: '确定取消活动吗？',
      // content: '确定要删除这张照片吗',
      cancelText: '取消',
      confirmText: '确认',
      success: res => {
        if (res.confirm) {
          console.log('quit group confirm')
          var that = this
          let url = app.globalData.URL + '/act/cancelActivity';
          let tmp = wx.getStorageSync('userInfo')
          let data = {
            actid: that.data.tmpactid,
            reason:that.data.ans
          }
          util.gets(url, data).then(function (res) {
            that.setData({
              hiddenmodalput: !that.data.hiddenmodalput,
            })
            if (res.data.code!=0) {
              console.log(res.data)
              wx.showToast({
                title: '取消失败',
                duration: 2000,
              })
            } else {
              console.log('delete success')
              console.log(res.data)
              that.onLoad()
              wx.showToast({
                title: '取消成功',
                duration: 2000,
              })
            }
          })
        }
      }
    })
  },
  yundongxiangqing(e) {
    app.globalData.tabbar = 1;
    wx.navigateTo({
      url: '/pages/yundongxiangqing/yundongxiangqing?TabCur=0&Title=' + e.currentTarget.dataset.yundong.actname +'&categoryId=' + e.currentTarget.dataset.yundong.id,
    })
  },
  baomingtiaozhan(e) {
    app.globalData.tabbar = 1;
    wx.navigateTo({
      url: '/pages/yundongxiangqing/yundongxiangqing?TabCur=1&Title=' + e.currentTarget.dataset.yundong.actname +'&categoryId=' + e.currentTarget.dataset.yundong.id,
    })
  },
  cancel(e) {
    wx.showModal({
      title: '退出该活动',
      // content: '确定要删除这张照片吗',
      cancelText: '取消',
      confirmText: '确认',
      success: res => {
        if (res.confirm) {
          console.log('quit group confirm')
          var that = this
          let url = app.globalData.URL + '/act/cancelActSignupIndByUser';
          let tmp = wx.getStorageSync('userInfo')
          console.log(e.currentTarget.dataset.yundong.id)
          let data = {
            actid: e.currentTarget.dataset.yundong.id,
            uid: tmp.id
          }
          util.gets(url, data).then(function (res) {
            console.log('cancel success')
            that.onLoad()
            wx.showToast({
              title: '退出成功',
              duration: 2000,
            })
          })
        }
      }
    })
  },
  onLoad: function (options) {
    var that = this
    let url = app.globalData.URL + '/config/findAllActivityClass1';
    // 所有活动
    util.gets(url, {}).then(function (res) {
      that.setData({
        AllActivity: res.data.data
      })
    })
    //我创建的
    url = app.globalData.URL + '/act/listMyActivity';
    let data = {
      'type': 10,
      'acid1': '076003001'
    };
    util.post_token(url, data).then(function (res) {
      console.log('create', res.data)
      that.setData({
        Mycreate: res.data.data
      })
    })
    //我参加的
    url = app.globalData.URL + '/act/listMyActivity';
    data = {
      'type': 20,
      'acid1': '076003001'
    };
    util.post_token(url, data).then(function (res) {
      console.log('join', res.data)
      that.setData({
        Myjoin: res.data.data
      })
    })
  },

})