const app = getApp();
var util = require("../../utils/util.js");
Page({
  data: {
    chooseSize: false,
    animationData: {},
    isReflesh: true,
    option: [],
    categoryId: '',
    objtitle: '',
    comment: [],
    Input: '',
    user: [],
    loading: true,
    count:0
  },
  //弹框
  chooseSezi: function (e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(200).step()
    that.setData({
      animationData: animation.export(),
      chooseSize: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export()
      })
    }, 100)
    that.setData({
      duixiang: e.currentTarget.dataset.duixiang,
      dxid: e.currentTarget.dataset.dxid,
      dxtitle: e.currentTarget.dataset.dxtitle,
    })
  },
  hideModal: function (e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(200).step()
    that.setData({
      animationData: animation.export()

    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        chooseSize: false
      })
    }, 100)
  },
  //////////////////////
  emailInput: function(e) { //input输入
    this.setData({
      Input: e.detail.value
    });
  },
  chakanhuifu: function(e) { //查看回放跳转
    console.log(e);
    wx.navigateTo({
      url: '/pages/chakanhuifu/chakanhuifu?id=' + e.currentTarget.dataset.id,
    })
  },
  comment() { //评论
    var self = this;
    let url = app.globalData.URL + '/comm/countCommByObj';
    let data = {
      objid: self.data.categoryId,
      objtype: 30
    };
    app.wxRequest('GET', url, data, (res) => {
      self.setData({
        count: res.data
      });
    }, (err) => {
      console.log(err.errMsg)
    });
    url = app.globalData.URL + '/comm/listCommByObj';
    app.wxRequest('GET', url, data, (res) => {
      self.setData({
        comment: res.data
      });
      self.setData({
        loading: false
      });
      /*if (res.data == null || res.data.length == 0) {} else {
        let list = self.data.comment.list
        if (list.length == 0)
          self.setData({
            loading: false,
            comment_detail: list
          });
        for (let i in list) {
          let url2 = app.globalData.URL + '/applaud/findApplaud'; //点赞情况

          data = {
            objtype: 30,
            objid: list[i].id,
            uid: self.data.user.id,
          };
          util.gets(url2, data).then(function(res) {
            list[i]['ifzan'] = res.data.data
          });
          url2 = app.globalData.URL + '/applaud/countByObj'; //点赞数
          data = {
            objid: list[i].id,
            objtype: 30
          };
          util.gets(url2, data).then(function(res) {
            list[i].praiseCnt = res.data.data
            self.setData({
              comment_detail: list,
              loading: false
            });
          });
        }
      }*/
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  zan_list(e) { //回复点赞或取消
    self = this;
    let url = app.globalData.URL + '/applaud/updateApplaud';
    if (e.currentTarget.dataset.ifzan)
      var data = {
        objtype: 30,
        objid: e.currentTarget.dataset.objid,
        objtitle: '',
        creater: self.data.user.id,
        status: 0,
      };
    else
      var data = {
        objtype: 30,
        objid: e.currentTarget.dataset.objid,
        objtitle: '',
        creater: self.data.user.id,
        status: 1,
      };
    app.wxRequest('POST', url, data, (res) => {
      var list = self.data.comment_detail
      if (list[e.currentTarget.dataset.index].ifzan) {
        list[e.currentTarget.dataset.index].ifzan = false
        list[e.currentTarget.dataset.index].praiseCnt = list[e.currentTarget.dataset.index].praiseCnt - 1
        self.setData({
          comment_detail: list,
        })
      } else {
        list[e.currentTarget.dataset.index].ifzan = true
        list[e.currentTarget.dataset.index].praiseCnt = list[e.currentTarget.dataset.index].praiseCnt + 1
        self.setData({
          comment_detail: list,
        })
      }
      wx.showToast({
        title: '操作成功！', // 标题
        icon: 'success', // 图标类型，默认success
        duration: 1500 // 提示窗停留时间，默认1500ms
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  pd_fasong() {
    if (this.data.Input == "") {
      wx.showToast({
        title: '请输入回复内容', // 标题
        icon: 'none',
        duration: 1500 // 提示窗停留时间，默认1500ms
      })
    } else {
      this.fasong()
    }
  },
  fasong() { //发送按钮
    var self = this;
    let url = app.globalData.URL + '/comm/addComment';
    let data = {
      pid: null,
      objtype: 30,
      objid: self.data.categoryId,
      objtitle: self.data.objtitle,
      comment: self.data.Input,
      creater: self.data.user.id,
      createrAlias: self.data.user.nickname,
      createrHead: self.data.user.head
    };
    app.wxRequest('POST', url, data, (res) => {
      self.onLoad(self.data.option);
      wx.showToast({
        title: '评论成功！', // 标题
        icon: 'success', // 图标类型，默认success
        duration: 1500 // 提示窗停留时间，默认1500ms
      })
    }, (err) => {
      console.log(err.errMsg)
    });
    self.setData({
      Input: ''
    })
  },
  TBcontroll() { //同步控制
    var self = this;
    new Promise(function(resolve, reject) {
      setTimeout(function() {

      }, 1000)
      resolve();
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(option) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    var self = this;
    self.setData({
      option: option,
      categoryId: option.categoryId,
      objtitle: option.objtitle,
      user: wx.getStorageSync('userInfo')
    })
    self.comment();
    await self.TBcontroll();
    wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: async function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(options) {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var self = this
    if (self.data.isReflesh) {
      wx.showLoading({
        title: '加载中...',
        mask: true //显示触摸蒙层  防止事件穿透触发
      });
      let data = {
        objid: self.data.categoryId,
        objtype: 30,
        border: self.data.comment.border
      };
      let url = app.globalData.URL + '/comm/listCommByObj';
      app.wxRequest('GET', url, data, (res) => {
        console.log(res.data)
        if (res.data.border == null) {
          self.setData({
            isReflesh: false
          })
        }
        console.log('刷新评论中', res)
        let t = 'comment'
        var tmp = self.data.comment
        tmp.border = res.data.border
        for (let s of res.data.list)
          tmp.list.push(s)
        self.setData({
          [t]: tmp,
        })
        wx.hideLoading()
      }, (err) => {
        console.log(err.errMsg)
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})