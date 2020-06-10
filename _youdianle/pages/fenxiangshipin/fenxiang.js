// pages/fenxiangshipin/fenxiang.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shipin: '',
    bofang_pid: '0',
  },
  tabCur:0,
  getOneShipin: function (e) {
    var self = this;
    let url = app.globalData.URL + '/video/listActVideoFirst';
    let data = {
      id: e,
    };
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      // let shipintt = {};
      // shipintt.border = 0;
      // shipintt.list = [];
      // shipintt.list.splice(0, 0, res.data)
      // console.log(shipintt)
      let shipintmp = JSON.stringify(res.data);
      console.log(shipintmp)
      var jsonObj = JSON.parse(shipintmp);

      self.setData({
        shipin: jsonObj,
      })
      console.log(self.data.shipin)
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  navshouye() {
    console.log(this.tabCur,'nav')
    if(this.tabCur){
      wx.reLaunch({
        url: '../xiaoyuan/xiaoyuan?TabCur='+this.tabCur,
      })
    }else{
      wx.reLaunch({
        url: '../index/index?',
      })
    }
   
  },
  video_change: function (e) { ////视频切换
    var self=this;
    var shipintmp = this.data.shipin;
      let now_id = e.currentTarget.id;
      if (this.data.bofang_pid == '1') {
        wx.createVideoContext(e.currentTarget.id).pause();
        this.setData({
          bofang_pid: '0'
        })
      } else {
        wx.createVideoContext(e.currentTarget.id).play();
        this.setData({
          bofang_pid: '1'
        })
        let url = app.globalData.URL + '/video/updatePlayCnt';
        let data = {
          id: this.data.shipin.list[e.currentTarget.dataset.index].id,
        };
        app.wxRequest('GET', url, data, (res) => {})
        shipintmp.list[e.currentTarget.dataset.index].playCnt = shipintmp.list[e.currentTarget.dataset.index].playCnt + 1;
        self.setData({
          shipin: shipintmp
        })
      }
  },
  shipinChooseSezi: function (e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(200).step()
    that.setData({
      shipinAnimationData: animation.export(),
      shipinChooseSize: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        shipinAnimationData: animation.export()
      })
    }, 100)
    that.setData({
      shipin_index: e.currentTarget.dataset.index,
    })

    /////
    var shipintmp = this.data.shipin;
    let url = app.globalData.URL + '/comm/listCommByObj';
    let data = {
      objtype: 50,
      objid: e.currentTarget.dataset.dxid,
    };
    app.wxRequest('GET', url, data, (res) => {
      console.log(res)
      shipintmp.list[e.currentTarget.dataset.index].listComm = res.data.list;
      this.setData({
        shipin: shipintmp,
        shipinPinglunBorder: res.data.border,
      })
    }, (err) => {
      console.log(err.errMsg)
    });


  },
  shipinHideModal: function (e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(200).step()
    that.setData({
      shipinAnimationData: animation.export()
    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        shipinAnimationData: animation.export(),
        shipinChooseSize: false
      })
    }, 100)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.getOneShipin(options.shipinID);
    this.tabCur=options.Tabcur;
    console.log(this.tabCur,'onoa')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})