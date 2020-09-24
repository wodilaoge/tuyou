const app = getApp();
var util = require("../../../utils/util.js");
Page({
  data: {
    Lists: ['全部', '校园', '聚会', '装扮', '摄影'],
    TabCur: 0,
    defaultPoster: '../../../img/login/poster.png',
    video_id: 'video_0', ///用于切换视频
    bofang_if_id: 'video_0', /////用数字来表示匹配
    bofang_pid: '0', ///1表示有一个播放，0表示无播放
    needflesh:true
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
    })
  }, /////////////////////////
  getShipin() { //视频
    var self = this;
    let url = app.globalData.URL + '/video/listActVideo';
    let data = {
      pageSize: 2,
    };

    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      let shipintmp = res.data;
      this.setData({
        shipin: shipintmp,
        shipinBorder: res.data.border,
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  getShipinFenye() { //视频
    var self = this;
    let url = app.globalData.URL + '/video/listActVideo';
    let data = {
      pageSize: 2,
      border: this.data.shipinBorder,
    };
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      if (res.data.border == null) {
        self.setData({
          isRefleshshipin: false,
        })
      }
      let shipintmp = this.data.shipin;
      for (let s of res.data.list)
        shipintmp.list.push(s)
      this.setData({
        shipin: shipintmp,
        shipinBorder: res.data.border,
      })

    }, (err) => {
      console.log(err.errMsg)
    });
  },
  video_change: function (e) { ////视频切换
    var self = this;
    var shipintmp = this.data.shipin;
    if (this.data.bofang_if_id != e.currentTarget.id) { ///相等表示点击和播放不匹配
      if (this.data.bofang_pid == '0') {
        this.setData({
          bofang_pid: '1',
        })
      }
      let url = app.globalData.URL + '/video/updatePlayCnt';
      let data = {
        id: this.data.shipin.list[e.currentTarget.dataset.index].id,
      };
      app.wxRequest('POST', url, data, (res) => {})
      shipintmp.list[e.currentTarget.dataset.index].playCnt = shipintmp.list[e.currentTarget.dataset.index].playCnt + 1;
      self.setData({
        shipin: shipintmp
      })
      let now_id = e.currentTarget.id;
      let prev_id = this.data.video_id;
      this.setData({
        video_id: now_id,
        bofang_if_id: now_id
      })
      console.log(prev_id,now_id)
      wx.createVideoContext(prev_id).pause();
      wx.createVideoContext(now_id).play();


    } else { //////////当点击同一个，一次播放一次暂停
      if (this.data.bofang_pid == '1') {
        wx.createVideoContext(e.currentTarget.id).pause();
        this.setData({
          bofang_pid: '0'
        })
      } else {
        console.log(e.currentTarget.id)
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
    }
  },
  yingChangShipin:function(e){
    console.log(e,'/////')
    let shipintmp=this.data.shipin;
    shipintmp.list[e.currentTarget.dataset.index].yingChang=1;
    shipintmp.list[e.currentTarget.dataset.index].shipinSRC = shipintmp.list[e.currentTarget.dataset.index].fileId; /////////点击再加载
    this.setData({
      shipin: shipintmp
    })
    this.video_change(e)
  },
  shipinguanzhu: function (e) {
    var self = this;
    let shipintmp = this.data.shipin;
    if (shipintmp.list[e.currentTarget.dataset.index].myFollow == 1) {
      shipintmp.list[e.currentTarget.dataset.index].myFollow = 0;
      self.setData({
        shipin: shipintmp
      })
      let url = app.globalData.URL + '/follow/updateFollow';
      let data = {
        objtype: 50,
        objid: self.data.shipin.list[e.currentTarget.dataset.index].id,
        objtitle: self.data.shipin.list[e.currentTarget.dataset.index].title,
        creater: self.data.user.id,
        status: 0,
      };
      app.wxRequest('POST', url, data, (res) => {}, (err) => {});

    } else {
      shipintmp.list[e.currentTarget.dataset.index].myFollow = 1;
      self.setData({
        shipin: shipintmp
      })
      let url = app.globalData.URL + '/follow/updateFollow';
      let data = {
        objtype: 50,
        objid: self.data.shipin.list[e.currentTarget.dataset.index].id,
        objtitle: self.data.shipin.list[e.currentTarget.dataset.index].title,
        creater: self.data.user.id,
        status: 1,
      };
      app.wxRequest('POST', url, data, (res) => {}, (err) => {});
    }
  },
  shipinDianzan: function (e) {
    var self = this;
    let shipintmp = this.data.shipin;
    if (shipintmp.list[e.currentTarget.dataset.index].myApplaud == 1) {
      shipintmp.list[e.currentTarget.dataset.index].myApplaud = 0;
      shipintmp.list[e.currentTarget.dataset.index].applaudCnt--;
      self.setData({
        shipin: shipintmp
      })
      console.log(self.data.shipin.list[e.currentTarget.dataset.index].id)
      let url = app.globalData.URL + '/applaud/updateApplaud';
      let data = {
        objtype: 50,
        objid: self.data.shipin.list[e.currentTarget.dataset.index].id,
        objtitle: self.data.shipin.list[e.currentTarget.dataset.index].title,
        creater: self.data.user.id,
        status: 0,
      };
      app.wxRequest('POST', url, data, (res) => {
        console.log(res)
      }, (err) => {});

    } else {
      shipintmp.list[e.currentTarget.dataset.index].myApplaud = 1;
      shipintmp.list[e.currentTarget.dataset.index].applaudCnt++;
      self.setData({
        shipin: shipintmp
      })
      console.log(self.data.shipin.list[e.currentTarget.dataset.index].id)
      let url = app.globalData.URL + '/applaud/updateApplaud';
      let data = {
        objtype: 50,
        objid: self.data.shipin.list[e.currentTarget.dataset.index].id,
        objtitle: self.data.shipin.list[e.currentTarget.dataset.index].title,
        creater: self.data.user.id,
        status: 1,
      };
      app.wxRequest('POST', url, data, (res) => {
        console.log(res)
      }, (err) => {});
    }
  },
  getShipinfenlei() { //视频
    let url = app.globalData.URL + '/video/listActVideo';
    let data = {
      acid1: this.data.shipinCur,
      pageSize: 2,
    };
    app.wxRequest('POST', url, data, (res) => {
      console.log(res.data)
      let shipintmp = res.data;
      this.setData({
        shipin: shipintmp,
        shipinBorder: res.data.border,
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  getShipinfenleiFenye() { //视频
    let url = app.globalData.URL + '/video/listActVideo';
    let data = {
      acid1: this.data.shipinCur,
      pageSize: 2,
      border: this.data.shipinBorder,
    };
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      if (res.data.border == null) {
        self.setData({
          isRefleshshipin: false,
        })
      }
      let shipintmp = this.data.shipin;
      for (let s of res.data.list)
        shipintmp.list.push(s)
      this.setData({
        shipin: shipintmp,
        shipinBorder: res.data.border,
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  chooseSezi: function (e) {
    var self = this;
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'linear'
    })
    self.animation = animation
    animation.translateY(200).step()
    self.setData({
      animationData: animation.export(),
      chooseSize: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      self.setData({
        animationData: animation.export()
      })
    }, 100)

    self.setData({
      duixiang: e.currentTarget.dataset.duixiang,
      dxid: e.currentTarget.dataset.dxid,
      dxtitle: e.currentTarget.dataset.dxtitle,
    })
  },
  shipinChooseSezi: function (e) {
    var self = this;
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'linear'
    })
    self.animation = animation
    animation.translateY(200).step()
    self.setData({
      shipinAnimationData: animation.export(),
      shipinChooseSize: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      self.setData({
        shipinAnimationData: animation.export()
      })
    }, 100)
    self.setData({
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
      shipintmp.list[e.currentTarget.dataset.index].listComm = res.data.list;
      this.setData({
        shipin: shipintmp,
      })
    }, (err) => {
      console.log(err.errMsg)
    });


  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
      mask: true //显示触摸蒙层  防止事件穿透触发
    });
    var that = this
    let url = app.globalData.URL + '/video/listMyVideo';
    let tmp = wx.getStorageSync('userInfo')
    let data = {
      'city': wx.getStorageSync('city').code,
      'univ': wx.getStorageSync('school').code
    };
    util.post_token(url, data).then(function (res) {
      console.log('video', res.data)
      wx.hideLoading()
      that.setData({
        shipin: res.data.data
      })
    })
  },
  delvideo(e)
  {
    var that=this
    console.log(e.currentTarget.dataset.id)
    let url = app.globalData.URL + '/video/cancelActVideo';
    var data = {
      id: e.currentTarget.dataset.id,
    }
    wx.showModal({
      title: '删除视频',
      content: '确定要删除这段视频吗',
      cancelText: '取消',
      confirmText: '确认',
      success: res => {
        if (res.confirm) {
          console.log('delete video confirm')
          util.gets(url, data).then(function (res) {
            console.log(res)
            if(res.data.code==0)
            wx.showToast({
              title: '删除成功',
            })
            that.onLoad()
          })
        }
      }
    })
  },
  onShareAppMessage: function (e) {
    var self = this;
    console.log(e)
    if (e.target.dataset.duixiang == 50) {
      return {
        title: '友点乐',
        path: '/pages/fenxiangshipin/fenxiang?&shipinID=' + self.data.shipin.list[e.target.dataset.index].id+ '&duixiang=' + e.target.dataset.duixiang,
        success: function (res) {
          console.log("转发成功:" + JSON.stringify(res));
          self.shareClick();
        },
        fail: function (res) {
          console.log("转发失败:" + JSON.stringify(res));
        }
      }
    } else {
      return {
        title: '友点乐',
        path: 'pages/xiaoyuan/xiaoyuan',
        success: function (res) {
          console.log("转发成功:" + JSON.stringify(res));
          self.shareClick();
        },
        fail: function (res) {
          console.log("转发失败:" + JSON.stringify(res));
        }
      }
    }

  },

  onReachBottom: function () {
    if (!this.data.needflesh)
      return
    console.log("上拉刷新")
    var that = this
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let url = app.globalData.URL + '/video/listMyVideo';
    let data = {
      'city': wx.getStorageSync('city').code,
      'univ': wx.getStorageSync('school').code,
      'border':that.data.shipin.border
    };
    util.post_token(url, data).then(function (res) {
      console.log('video add', res.data)
      let _data=that.data.shipin
      _data.border=res.data.data.border
      for(let i of res.data.data.list)
      {
        _data.list.push(i)
      }
      that.setData({
        needflesh:res.data.data.list.length!=0,
        shipin: _data
      })
      wx.hideLoading()
    })
  }
})