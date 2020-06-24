// pages/my_activity/my_activity.js
const app = getApp();
var util = require("../../../utils/util.js");
Page({

  // 10：待审核，14：内容违规，20：正常，30：已结束，40：主动取消，44：审核驳回，50：平台取消
  //活动类型，10：发起的，20：参加的，30：关注的
  data: {
    swip: ['活动审核', '新闻审核', '图片审核', '视频审核'],
    options: 1,
    TabCur: 0,
    AllActivity: [],
    MyActivity: [],
    hiddenmodalput: true,
    //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框  
    scrollLeft: 0,
    needflesh:true,
    initialcode: '076003001'
  },
  modalinput: function (e) {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput,
      tmpactid: e.currentTarget.dataset.id
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
      needflesh:true
    })
    this.flesh(e.currentTarget.dataset.id)
  },
  flesh(tab) {
    console.log('flesh')
    var that = this
    console.log(that.data.AllActivity[tab].code)
    //我参与的
    if (that.data.options == 1) {
      let url = app.globalData.URL + '/act/listMyActivity';
      let data = {
        'type': 20,
        'acid1': that.data.AllActivity[tab].code
      };
      util.post_token(url, data).then(function (res) {
        console.log('join', res.data)
        that.setData({
          Myjoin: res.data.data,
          nowActNum: res.data.data.list.length
        })
      })
    }
    //我创建的
    else if (that.data.options == 2) {
      let url = app.globalData.URL + '/act/listMyActivity';
      let data = {
        'type': 10,
        'acid1': that.data.AllActivity[tab].code
      };
      util.post_token(url, data).then(function (res) {
        console.log('create', res.data)
        that.setData({
          Mycreate: res.data.data,
          nowActNum: res.data.data.list.length
        })
      })
    }
    //我关注的
    else if (that.data.options == 3) {
      let url = app.globalData.URL + '/act/listMyActivity';
      let data = {
        'type': 30,
        'acid1': that.data.AllActivity[tab].code
      };
      util.post_token(url, data).then(function (res) {
        console.log('attention', res.data)
        that.setData({
          Myattention: res.data.data,
          nowActNum: res.data.data.list.length
        })
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  select1() {
    this.setData({
      options: 1,
      needflesh:true
    })
  },

  select2() {
    this.setData({
      options: 2,
      needflesh:true
    })
  },
  select3() {
    this.setData({
      options: 3,
      needflesh:true
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
            reason: that.data.ans
          }
          util.gets(url, data).then(function (res) {
            that.setData({
              hiddenmodalput: !that.data.hiddenmodalput,
            })
            if (res.data.code != 0) {
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
      url: '/pages/yundongxiangqing/yundongxiangqing?TabCur=0&Title=' + e.currentTarget.dataset.yundong.actname + '&categoryId=' + e.currentTarget.dataset.yundong.id+'&yes='+'yes',
    })
  },
  baomingtiaozhan(e) {
    app.globalData.tabbar = 1;
    wx.navigateTo({
      url: '/pages/yundongxiangqing/yundongxiangqing?TabCur=1&Title=' + e.currentTarget.dataset.yundong.actname + '&categoryId=' + e.currentTarget.dataset.yundong.id,
    })
  },
  cancel(e) {
    wx.showModal({
      title: '退出该活动',
      content: '活动取消后不能恢复。确定取消吗？',
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
    let num
    let data = {
      'type': 10,
      'acid1': that.data.initialcode
    };
    util.post_token(url, data).then(function (res) {
      console.log('Mycreate', res.data)
      that.setData({
        Mycreate: res.data.data
      })
      for (i of res.data.data.list) {
        if (i.status == 20)
          num++
      }
      that.setData({
        createnum: num
      })
    })
    //我参加的
    url = app.globalData.URL + '/act/listMyActivity';
    data = {
      'type': 20,
      'acid1': that.data.initialcode
    };
    util.post_token(url, data).then(function (res) {
      console.log('Myjoin', res.data)
      that.setData({
        Myjoin: res.data.data,
        nowActNum: res.data.data.list.length
      })
    })
    //我关注的
    url = app.globalData.URL + '/act/listMyActivity';
    data = {
      'type': 30,
      'acid1': that.data.initialcode
    };
    util.post_token(url, data).then(function (res) {
      console.log('Myattention', res.data)
      that.setData({
        Myattention: res.data.data
      })
    })
    //查询创建活动数量

    url = app.globalData.URL + '/act/countMyActivity';
    data = {
      'type': 20,
      'univ': wx.getStorageSync('school').code,
      'province': wx.getStorageSync('province').code,
      'city': wx.getStorageSync('city').code,
    };
    util.post_token(url, data).then(function (res) {
      console.log('joinnum', res.data)
      that.setData({
        joinnum: res.data.data
      })
    })
    //查询参与活动数量
    url = app.globalData.URL + '/act/countMyActivity';
    data = {
      'type': 10,
      'univ': wx.getStorageSync('school').code,
      'province': wx.getStorageSync('province').code,
      'city': wx.getStorageSync('city').code,
    };
    util.post_token(url, data).then(function (res) {
      console.log('createnum', res.data)
      that.setData({
        createnum: res.data.data
      })
    })
    //查询关注活动数量
    url = app.globalData.URL + '/act/countMyActivity';
    data = {
      'type': 30,
      'univ': wx.getStorageSync('school').code,
      'province': wx.getStorageSync('province').code,
      'city': wx.getStorageSync('city').code,
    };
    util.post_token(url, data).then(function (res) {
      console.log('attentionnum', res.data)
      that.setData({
        attentionnum: res.data.data
      })
    })
  },

  onReachBottom: function () {
    console.log("上拉刷新初始化查询")
    var that = this
    // console.log(that.data.AllActivity[that.data.options].code)
    //我参与的
    if (that.data.options == 1&&that.data.needflesh==true) {
      console.log('join')
      let url = app.globalData.URL + '/act/listMyActivity';
      let data = {
        'type': 20,
        'acid1': that.data.AllActivity[that.data.TabCur].code,
        'border': that.data.Myjoin.border
      };
      util.post_token(url, data).then(function (res) {
        console.log('Myjoin flesh', res.data)
        //有数据传回
        if (res.data.data.border != null) {
          var tmp = that.data.Myjoin
          tmp.border = res.data.data.border
          for (let s of res.data.data.list)
            tmp.list.push(s)
          that.setData({
            Myjoin: tmp,
            nowActNum: res.data.data.list.length + that.data.nowActNum
          })
        }
        //无数据传回
        else{
          that.setData({
            needflesh:false
          })
        }
        wx.hideLoading()
      })
    }
    //我创建的
    else if (that.data.options == 2&&that.data.needflesh==true) {
      let url = app.globalData.URL + '/act/listMyActivity';
      let data = {
        'type': 10,
        'acid1': that.data.AllActivity[that.data.TabCur].code,
        'border': that.data.Mycreate.border
      };
      util.post_token(url, data).then(function (res) {
        console.log('Mycreate flesh', res.data)
        //有数据传回
        if (res.data.data.border != null) {
          var tmp = that.data.Myjoin
          tmp.border = res.data.data.border
          for (let s of res.data.data.list)
            tmp.list.push(s)
          that.setData({
            Mycreate: tmp,
            nowActNum: res.data.data.list.length + that.data.nowActNum
          })
        }
        //无数据传回
        else{
          that.setData({
            needflesh:false
          })
        }
        wx.hideLoading()
      })
    }
    //我关注的
    else if (that.data.options == 3&&that.data.needflesh==true) {
      wx.showLoading({
        title: '加载中...',
        mask: true //显示触摸蒙层  防止事件穿透触发
      });
      let url = app.globalData.URL + '/act/listMyActivity';
      let data = {
        'type': 30,
        'acid1': that.data.AllActivity[that.data.TabCur].code,
        'border': that.data.Myattention.border
      };
      util.post_token(url, data).then(function (res) {
        console.log('Myattention flesh', res.data)
        //有数据传回
        if (res.data.data.border != null) {
          var tmp = that.data.Myattention
          tmp.border = res.data.data.border
          for (let s of res.data.data.list)
            tmp.list.push(s)
          that.setData({
            Myattention: tmp,
            nowActNum: res.data.data.list.length + that.data.nowActNum
          })
        }
        //无数据传回
        else{
          that.setData({
            needflesh:false
          })
        }
        wx.hideLoading()
      })
    }
  }
})