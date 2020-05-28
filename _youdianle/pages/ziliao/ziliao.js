// pages/ziliao/ziliao.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    TabCur: 0,
    duiyuanID: '',
    user: '',
    duiyuanDeatil: [],
    fensishu: 0,
    haoyoushu: 0,
    dianzanshu: 0,
    ifguanzhu: 0,
    huodongshu: 0,
  },

  tabSelect(e) {
    console.log(e);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
    })
  },

  getDuiyuan() {
    let url = app.globalData.URL + '/appuser/findUserByID';
    let data = {
      id: this.data.duiyuanID,
    };
    app.wxRequest('GET', url, data, (res) => {
      this.setData({
        duiyuanDeatil: res.data,
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  getFensi() {
    let url = app.globalData.URL + '/follow/countByObj';
    let data = {
      objid: this.data.duiyuanID,
      objtype: 10,
    };
    app.wxRequest('GET', url, data, (res) => {
      this.setData({
        fensishu: res.data,
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  getHaoyou() {
    let url = app.globalData.URL + '/follow/countByObj';
    let data = {
      objid: this.data.duiyuanID,
      objtype: 10,
    };
    app.wxRequest('GET', url, data, (res) => {
      this.setData({
        haoyoushu: res.data,
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  getDianzan() {
    let url = app.globalData.URL + '/applaud/countByObj';
    let data = {
      objid: this.data.duiyuanID,
      objtype: 10,
    };
    app.wxRequest('GET', url, data, (res) => {
      this.setData({
        dianzanshu: res.data,
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  getHuodong() {
    let url = app.globalData.URL + '/act/countActByUser';
    let data = {
      objid: this.data.duiyuanID,
    };
    app.wxRequest('GET', url, data, (res) => {
      this.setData({
        huodongshu: res.data,
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  getGuanzhu() {
    let url = app.globalData.URL + '/follow/findFollow';
    let data = {
      objid: this.data.duiyuanID,
      objtype: 10,
      uid: this.data.user.id
    };
    app.wxRequest('GET', url, data, (res) => {
      console.log(res.data)
      this.setData({
        ifguanzhu: res.data,
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  changeGuanzhu: function(e) {

    if (this.data.ifguanzhu == 0) {
      this.setData({
        ifguanzhu: 1,
        fensishu: this.data.fensishu + 1,
      })

      let url = app.globalData.URL + '/follow/updateFollow';
      let data = {
        objtype: 10,
        objid: this.data.duiyuanID,
        creater: this.data.user.id,
        status: 1,
      };
      app.wxRequest('POST', url, data, (res) => {
        console.log(res)
      }, (err) => {});

    } else {
      this.setData({
        ifguanzhu: 0,
        fensishu: this.data.fensishu - 1,
      })
      let url = app.globalData.URL + '/follow/updateFollow';
      let data = {
        objtype: 10,
        objid: this.data.duiyuanID,
        creater: this.data.user.id,
        status: 0,
      };
      app.wxRequest('POST', url, data, (res) => {
        console.log(res)
      }, (err) => {});
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      duiyuanID: options.id,
      user: wx.getStorageSync('userInfo'),
    })
    this.getDuiyuan()
    this.getDianzan()
    this.getFensi()
    this.getHaoyou()
    this.getGuanzhu()
    this.getHuodong()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})