// pages/sousuo/sousuo.js
const app = getApp();
const utilsDays = require('../../utils/utils-day');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 6,
    change_if: 0,
    sousuo_neirong: '',
    sousuo_detail: [],
    hotWords: [],
    listCampus_timeChange: [],
    sousuo_lishi: [],
    province: '',
    city: '',
    univ: '',
    isRefle: true,
    bkData: [],
    shipin: [],
    activityClass1: [],
    tuanduiCur: 0,
    tuanduiList: [],
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
      isRefle: true,
    })
    if (this.data.sousuo_neirong != '') {
      if (this.data.change_if == 1 && this.data.TabCur < 4) {
        this.sousuo_dalei()
      } else if (this.data.change_if == 1 && this.data.TabCur == 4) {
        this.sousuo_dalei_shipin()
      } else if (this.data.change_if == 1 && this.data.TabCur == 5) {
        this.sousuo_tuandui()
      } else {
        this.change_sousuo()
      }
    }
  },
  sousuo_dalei() {
    var self = this;
    wx.showLoading({
      title: '搜索中...',
      mask: true //显示触摸蒙层  防止事件穿透触发
    });
    let url = app.globalData.URL + '/search/listAct';
    let data = {
      keywords: this.data.sousuo_neirong,
      province: this.data.province === '不选' ? null : this.data.province,
      city: this.data.city === '不选' ? null : this.data.city,
      univ: this.data.univ === '不选' ? null : this.data.univ,
      sid: this.data.bkData[this.data.TabCur - 1].code,
    };
    console.log(data)
    app.wxRequest('POST', url, data, (res) => {
      wx.hideLoading({
        complete: (res) => {},
      })
      console.log(res)
      if (res.data.border == null) {
        self.setData({
          isRefle: false,
        })
      }
      this.setData({
        sousuo_detail_dalei: res.data.list,
        daleiBorder: res.data.border,
      })

    }, (err) => {
      wx.hideLoading({
        complete: (res) => {},
      })
      console.log(err.errMsg)
    });

  },
  sousuo_dalei_shipin() {
    var self = this;
    wx.showLoading({
      title: '搜索中...',
      mask: true //显示触摸蒙层  防止事件穿透触发
    });
    let url = app.globalData.URL + '/search/listVideo';
    let data = {
      keywords: this.data.sousuo_neirong,
      province: this.data.province === '不选' ? null : this.data.province,
      city: this.data.city === '不选' ? null : this.data.city,
      univ: this.data.univ === '不选' ? null : this.data.univ,
    };
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      if (res.data.border == null) {
        self.setData({
          isRefle: false,
        })
      }
      this.setData({
        shipin: res.data,
        daleiBorder: res.data.border,
      })

    }, (err) => {
      console.log(err.errMsg)
    });
    wx.hideLoading({
      complete: (res) => {},
    })
  },
  change_sousuo() {
    if (this.data.sousuo_neirong) {
      this.setData({
        change_if: 1,
      })
    } else {
      this.setData({
        change_if: 0,
      })
    }
    if (this.data.TabCur == 6) {
      wx.showLoading({
        title: '搜索中...',
        mask: true //显示触摸蒙层  防止事件穿透触发
      });
      let url = app.globalData.URL + '/search/listAll';
      let data = {
        keywords: this.data.sousuo_neirong,
        province: this.data.province === '不选' ? null : this.data.province,
        city: this.data.city === '不选' ? null : this.data.city,
        univ: this.data.univ === '不选' ? null : this.data.univ,
      };
      console.log(data)
      app.wxRequest('POST', url, data, (res) => {
        console.log(res)
        this.setData({
          sousuo_detail: res.data,
        })
        // if (res.data.listAct[0] == null && res.data.listAmuse[0] == null && res.data.listHobby[0] == null && res.data.listVideo[0] == null) {
        //   this.tiShiNothing()
        // }
      }, (err) => {
        console.log(err.errMsg)
      });
      this.setLishi()
      this.getLishi()
      wx.hideLoading({
        complete: (res) => {},
      })

    } else if (this.data.TabCur == 4) {
      this.sousuo_dalei_shipin()
    } else {
      this.sousuo_dalei()
    }
  },
  change_sousuo_lishi: function (e) {
    this.setData({
      change_if: 1,
      sousuo_neirong: e.currentTarget.dataset.neirong,
    })
    if (this.data.TabCur == 6) {
      this.change_sousuo()
    } else if (this.data.TabCur == 4) {
      this.sousuo_dalei_shipin()
    } else if (this.data.TabCur == 5) {
      this.sousuo_tuandui()
    } else {
      this.sousuo_dalei()
    }
  },
  timeChange: function () { //////修改时间
    var obj = [];
    var time = '';
    for (var i in this.data.sousuo_detail.listCampus) {
      // arr.push(obj[utilsDays.formatMsgTime(this.data.sousuo_detail.listCampus[i].fromtime)]);
      time = this.data.sousuo_detail.listCampus[i].fromtime.slice(0, 14);
      arr.push(obj[time]);
    }
    this.setData({
      listCampus_timeChange: obj
    })
  },
  value_sousuo: function (res) {
    console.log(res)
    this.setData({
      sousuo_neirong: res.detail.value,
    })
    // this.change_sousuo()
  },
  getHotWords: function () {
    let url = app.globalData.URL + '/search/listHotWords';
    let data = {}
    app.wxRequest('GET', url, data, (res) => {
      console.log(res)
      this.setData({
        hotWords: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  remen_sousuo_neirong: function (e) {
    this.setData({
      change_if: 1,
      sousuo_neirong: this.data.hotWords[e.currentTarget.id].keyword,
    })
    if (this.data.TabCur == 6) {

      this.change_sousuo()
    } else if (this.data.TabCur == 4) {
      this.sousuo_dalei_shipin()
    } else if (this.data.TabCur == 5) {
      this.sousuo_tuandui()
    } else {
      this.sousuo_dalei()
    }
  },
  /////////////搜索历史
  getLishi: function () {
    var that = this;
    wx.getStorage({
      key: 'lishi',
      success: function (res) {
        console.log(res)
        if (res.data) {
          that.setData({
            sousuo_lishi: res.data,
          })
        }
      },
    })
  },
  setLishi: function () {
    var that = this;
    if (this.data.sousuo_neirong != '') {
      var array = this.data.sousuo_lishi
      array.splice(0, 0, this.data.sousuo_neirong)
      wx.setStorageSync("lishi", array)
      that.getLishi()
    }
    if (this.data.sousuo_lishi.length > 7) {
      var array = this.data.sousuo_lishi
      array.splice(6, this.data.sousuo_lishi.length - 5, )
      wx.setStorageSync("lishi", array)
      that.getLishi()
    }
  },
  remAll: function (e) {
    console.log(e)
    var that = this;
    var array = this.data.sousuo_lishi
    array.splice(0, array.length)
    wx.setStorageSync("lishi", array)
    that.getLishi()

  },
  remOne: function (e) {
    console.log(e)
    var that = this;
    var array = this.data.sousuo_lishi
    array.splice(e.currentTarget.id, 1)
    wx.setStorageSync("lishi", array)
    that.getLishi()
  },
  remHuanCun: function () {
    var that = this;
    wx.getStorage({
      key: 'lishi',
      success: function (res) {
        if (res.data) {
          that.setData({
            sousuo_lishi: res.data,
          })
        }
      },
    })
    var array = this.data.sousuo_lishi
    array.splice(6, 10)
    wx.setStorageSync("lishi", array)

  },
  /////////
  todetail(e) { //报名参加按钮跳转 带着活动id跳转 校园活动
    wx.navigateTo({
      url: '../../pages/xiaoyuanxiangqing/xiaoyuanxiangqing?categoryId=' + e.currentTarget.id,
    })
  },
  yundongxiangqing(e) {
    wx.navigateTo({
      url: '/pages/yundongxiangqing/yundongxiangqing?TabCur=0&categoryId=' + e.currentTarget.dataset.yundong.id + '&sousuo=1',
    })
  },
  baomingtiaozhan(e) {
    wx.navigateTo({
      url: '/pages/yundongxiangqing/yundongxiangqing?TabCur=1&categoryId=' + e.currentTarget.dataset.yundong.id,
    })
  },
  jump(e) {
    app.globalData.tabbar = e.currentTarget.dataset.id;
    wx.switchTab({
      url: '/pages/xiaoyuan/xiaoyuan',
    })
  },
  sousuo_fenye() {
    console.log('分页')
    var self = this;
    wx.showLoading({
      title: '搜索中...',
      mask: true //显示触摸蒙层  防止事件穿透触发
    });
    let url = app.globalData.URL + '/search/listAct';
    let data = {
      keywords: this.data.sousuo_neirong,
      province: this.data.province === '不选' ? null : this.data.province,
      city: this.data.city === '不选' ? null : this.data.city,
      univ: this.data.univ === '不选' ? null : this.data.univ,
      sid: this.data.bkData[this.data.TabCur].code,
      border: this.data.daleiBorder,
    };
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      if (res.data.border == null) {
        self.setData({
          isRefle: false,
        })
      }
      let sousuotmp = this.data.sousuo_detail_dalei;
      for (let s of res.data.list)
        sousuotmp.list.push(s)
      this.setData({
        sousuo_detail_dalei: sousuotmp,
        daleiBorder: res.data.border,
      })

    }, (err) => {
      console.log(err.errMsg)
    });
    wx.hideLoading({
      complete: (res) => {},
    })
  },
  sousuo_shipin_fenye() {
    console.log('分页')
    var self = this;
    wx.showLoading({
      title: '搜索中...',
      mask: true //显示触摸蒙层  防止事件穿透触发
    });
    let url = app.globalData.URL + '/search/listVideo';
    let data = {
      keywords: this.data.sousuo_neirong,
      province: this.data.province === '不选' ? null : this.data.province,
      city: this.data.city === '不选' ? null : this.data.city,
      univ: this.data.univ === '不选' ? null : this.data.univ,
      border: this.data.daleiBorder,
    };
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      if (res.data.border == null) {
        self.setData({
          isRefle: false,
        })
      }
      let sousuotmp = this.data.sousuo_detail_dalei;
      for (let s of res.data.list)
        sousuotmp.list.push(s)
      this.setData({
        shipin: sousuotmp,
        daleiBorder: res.data.border,
      })

    }, (err) => {
      console.log(err.errMsg)
    });
    wx.hideLoading({
      complete: (res) => {},
    })
  },
  getBankuai() {
    var self = this;
    let url = app.globalData.URL + '/config/getSections';
    let data = {};
    app.wxRequest('GET', url, data, (res) => {
      console.log('/////////,', res.data)
      self.setData({
        bkData: res.data
      })
    })
  },
  video_change: function (e) { ////视频切换
    //////////////////专门的转换为shipin
    if (this.data.TabCur == 6) {
      let shipintmp1 = this.data.shipin;
      shipintmp1.list = this.data.sousuo_detail.listVideo;
      this.setData({
        shipin: shipintmp1
      })
    }
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
      console.log(prev_id, now_id)
      wx.createVideoContext(prev_id).pause();
      // setTimeout(function () {//自动播放不行因为视频下载没有加载完整
      //   wx.createVideoContext(now_id).play();
      // }, 2000)
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
    if (this.data.TabCur == 6) {
      let tmp = this.data.sousuo_detail;
      tmp.listVideo = this.data.shipin.list;
      this.setData({
        sousuo_detail: tmp
      })
    }
  },
  yingChangShipin: function (e) {
    console.log(e, '/////', this.data.sousuo_detail)
    //////////////////专门的转换为shipin
    if (this.data.TabCur == 6) {
      let shipintmp1 = this.data.shipin;
      shipintmp1.list = this.data.sousuo_detail.listVideo;
      this.setData({
        shipin: shipintmp1
      })
    }
    let shipintmp = this.data.shipin;
    shipintmp.list[e.currentTarget.dataset.index].yingChang = 1;
    shipintmp.list[e.currentTarget.dataset.index].shipinSRC = shipintmp.list[e.currentTarget.dataset.index].fileId; /////////点击再加载
    this.setData({
      shipin: shipintmp
    })
    if (this.data.TabCur == 6) {
      let tmp = this.data.sousuo_detail;
      tmp.listVideo = this.data.shipin.list;
      this.setData({
        sousuo_detail: tmp
      })
    }
    this.video_change(e)
  },
  //////////sousuotuandui
  sousuo_tuandui: function () {

    var self = this
    this.getAllActivityClass1nfig()
    let url = app.globalData.URL + '/search/listTeam';
    let data = {
      keywords: this.data.sousuo_neirong,
      province: this.data.province === '不选' ? null : this.data.province,
      city: this.data.city === '不选' ? null : this.data.city,
      univ: this.data.univ === '不选' ? null : this.data.univ,
      // acid1: null
      // border: this.data.daleiBorder,
    };
    console.log('搜索团队1', data)
    app.wxRequest('POST', url, data, (res) => {
      self.setData({
        tuanduiList: res.data.list
      })
    })
  },
  getAllActivityClass1nfig: function () {
    var self = this;
    let url = app.globalData.URL + '/config/findAllActivityClass1';
    let data = {}
    app.wxRequest('GET', url, data, (res) => {
      res.data.splice(0, 0, {
        "code": "0",
        "name": "全部"
      })
      self.setData({
        activityClass1: res.data
      })
    })
  },
  xuanzeClass1: function (e) { ///////////////点击大类搜索
    var self = this
    self.setData({
      tuanduiCur: e.currentTarget.dataset.index
    })
    let url = app.globalData.URL + '/search/listTeam';
    let data = {
      keywords: this.data.sousuo_neirong,
      province: this.data.province === '不选' ? null : this.data.province,
      city: this.data.city === '不选' ? null : this.data.city,
      univ: this.data.univ === '不选' ? null : this.data.univ,
      acid1: this.data.activityClass1[this.data.tuanduiCur].code == "0" ? null : this.data.activityClass1[this.data.tuanduiCur].code
      // border: this.data.daleiBorder,
    };
    console.log('搜索团队2', data)
    app.wxRequest('POST', url, data, (res) => {
      self.setData({
        tuanduiList: res.data.list
      })
    })
  },
  nav_tuanduiXiangqing: function (e) {
    console.log(e)
    console.log(this.data.tuanduiList[e.currentTarget.dataset.index].id)
    wx.navigateTo({
      url: '/pages/MyPages/my_team_detail/my_team_detail?id=' + this.data.tuanduiList[e.currentTarget.dataset.index].id,
    })
  },
  // tiShiNothing() {
  //   wx.showToast({
  //     title: '请在尝试首页调整区域范围！',
  //     image: '/img/fail.png',
  //     duration: 3000
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
      mask: true //显示触摸蒙层  防止事件穿透触发
    });
    this.setData({
      province: wx.getStorageSync('province').code ? wx.getStorageSync('province').name : null,
      city: wx.getStorageSync('city').code ? wx.getStorageSync('city').name : null,
      univ: wx.getStorageSync('school').code ? wx.getStorageSync('school').name : null,
    })
    this.getHotWords()
    this.getLishi()
    this.getBankuai()
    // this.remHuanCun()
    wx.hideLoading({
      complete: (res) => {},
    })
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
    this.timeChange()
    this.getLishi()

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
    var self = this
    console.log('上拉刷新', this.data.isRefle)
    if (this.data.isRefle == true && this.data.TabCur < 4) {

      this.sousuo_fenye()
    } else if (this.data.isRefle == true && this.data.TabCur == 4) {
      this.sousuo_shipin_fenye()
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})