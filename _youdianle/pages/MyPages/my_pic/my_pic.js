const app = getApp()
var util = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Lists: [],
    TabCur: 0,
    chooseSize: false,
    needflesh: true
  },
  emailInput: function (e) { //input输入
    this.setData({
      Input: e.detail.value
    });
  },
  //评论
  pd_fasong() {
    let self = this
    if (this.data.Input == "") {
      wx.showToast({
        title: '请输入回复内容', // 标题
        icon: 'none',
        duration: 1500 // 提示窗停留时间，默认1500ms
      })
    } else {
      let urlq = app.globalData.URL + '/appuser/getSpeakPerm';
      util.gets(urlq, {}).then(function (res) {
        if (res.data.code == 43) {
          wx.showToast({
            title: '暂无发言权限',
            image: '/img/fail.png',
            duration: 1000
          })
        } else if (res.data.code == 126) {
          wx.showToast({
            title: '请重新登录！',
            image: '/img/fail.png',
            duration: 500,
            success: function () {
              wx.redirectTo({
                url: '/pages/login/login',
              })
            }
          })
        } else {
          self.fasong()
        }
      })
    }
  },
  fasong() { //发送按钮
    if (this.data.quanxianCode == 0) {
      var self = this;
      if (this.data.duixiang == '50') {
        let url = app.globalData.URL + '/comm/addComment';
        let data = {
          pid: null,
          objtype: 50,
          objid: self.data.dxid,
          objtitle: self.data.dxtitle,
          comment: self.data.Input,
          creater: self.data.user.id,
          createrAlias: self.data.user.nickname,
          createrHead: self.data.user.head
        };
        let inputtmp = self.data.Input;
        let shipintmp = self.data.shipin
        console.log(shipintmp)
        console.log(self.data.dxindex)
        app.wxRequest('POST', url, data, (res) => {
          ///////////////////本地添加评论内容
          shipintmp.list[self.data.dxindex].listComm.splice(0, 0, {
            'createrHead': self.data.user.head,
            'createrAlias': self.data.user.nickname,
            'comment': inputtmp,
            'strCreatetime': '刚刚',
          })
          shipintmp.list[self.data.dxindex].commCnt = shipintmp.list[self.data.dxindex].commCnt + 1,
            self.setData({
              shipin: shipintmp,
            })
          wx.showToast({
            title: '评论成功！', // 标题
            icon: 'success', // 图标类型，默认success
            duration: 1500 // 提示窗停留时间，默认1500ms
          })

        }, (err) => {
          console.log(err.errMsg)
        });
      } else if (this.data.duixiang == '60') {
        let url = app.globalData.URL + '/comm/addComment';
        let data = {
          pid: null,
          objtype: 60,
          objid: self.data.dxid,
          objtitle: self.data.dxtitle,
          comment: self.data.Input,
          creater: self.data.user.id,
          createrAlias: self.data.user.nickname,
          createrHead: self.data.user.head
        };
        let inputtmp = self.data.Input;
        let shipintmp = self.data.zhaopian
        app.wxRequest('POST', url, data, (res) => {
          ///////////////////本地添加评论内容
          shipintmp[self.data.dxindex].listComm.splice(0, 0, {
            'createrHead': self.data.user.head,
            'createrAlias': self.data.user.nickname,
            'comment': inputtmp,
            'strCreatetime': '刚刚',
          })
          shipintmp[self.data.dxindex].commCnt = shipintmp[self.data.dxindex].commCnt + 1,
            self.setData({
              zhaopian: shipintmp,
            })
          wx.showToast({
            title: '评论成功！', // 标题
            icon: 'success', // 图标类型，默认success
            duration: 1500 // 提示窗停留时间，默认1500ms
          })

        }, (err) => {
          console.log(err.errMsg)
        });
      } else {
        let url = app.globalData.URL + '/comm/addComment';
        let data = {
          pid: null,
          objtype: 30,
          objid: self.data.categoryId,
          objtitle: "",
          comment: self.data.Input,
          creater: self.data.user.id,
          createrAlias: self.data.user.nickname,
          createrHead: self.data.user.head
        };
        app.wxRequest('POST', url, data, (res) => {
          self.comment();
          wx.showToast({
            title: '评论成功！', // 标题
            icon: 'success', // 图标类型，默认success
            duration: 1500 // 提示窗停留时间，默认1500ms
          })
        }, (err) => {
          console.log(err.errMsg)
        });
      }
      self.setData({
        Input: '',
      })
      self.hideModal()
    } else {
      this.userPanduan()
    }
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      needflesh: true,
      border:null,
      nowactid:e.currentTarget.dataset.actid
    })
    this.flesh(e.currentTarget.dataset.actid)
  },
  delpic(e) {
    var that = this
    console.log(e.currentTarget.dataset.id)
    let url = app.globalData.URL + '/photo/cancelPhoto';
    var data = {
      id: that.data.zhaopian[e.currentTarget.dataset.id].id,
    }
    wx.showModal({
      title: '删除照片',
      content: '确定要删除这张照片吗',
      cancelText: '取消',
      confirmText: '确认',
      success: res => {
        if (res.confirm) {
          console.log('delete video confirm')
          util.gets(url, data).then(function (res) {
            console.log(res)
            if (res.data.code == 0)
              wx.showToast({
                title: '删除成功',
              })
            var tmp = that.data.zhaopian
            tmp.splice(e.currentTarget.dataset.id, 1)
            that.setData({
              zhaopian: tmp
            })
          })
        }
      }
    })
  },
  getZhaopianPinglunFenye: function (e) {
    if (!this.data.isRefleshZhaopianPinglun)
      return
    var that = this;
    var zhaopiantmp = this.data.zhaopian;
    let url = app.globalData.URL + '/comm/listCommByObj';
    let data = {
      objtype: 60,
      objid: this.data.zhaopian[this.data.zhaopian_index].id,
      border: this.data.zhaopianPinglunBorder,
    };
    console.log(data)
    app.wxRequest('POST', url, data, (res) => {
      console.log("照片评论分页", res);
      if (res.data.border == null || res.data.list.length < 10) {
        that.setData({
          isRefleshZhaopianPinglun: false
        })
      }
      for (let s of res.data.list) {
        zhaopiantmp[this.data.zhaopian_index].listComm.push(s);
      }
      that.setData({
        zhaopian: zhaopiantmp,
        zhaopianPinglunBorder: res.data.border,
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  flesh(actid) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var that = this
    var url = app.globalData.URL + '/photo/listUserPhoto';
    var data = {
      uid: wx.getStorageSync('userInfo').id,
      acid1: actid
    }
    util.post_token(url, data).then(function (res) {
      console.log(res)
      that.setData({
        zhaopian: res.data.data.list,
        border:res.data.data.border
      })
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      wx.hideLoading()
    })
  },
  setChange_swiper: function (e) {
    this.setData({
      swiper_current: e.detail.current
    })
  },
  shipinguanzhu: function (e) {
    if (this.data.quanxianCode == 0) {
      if (e.currentTarget.dataset.duixiang == 50) {
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
      } else {
        var self = this;
        let shipintmp = {};
        shipintmp.list = this.data.zhaopian;
        if (shipintmp.list[e.currentTarget.dataset.index].myFollow == 1) {
          shipintmp.list[e.currentTarget.dataset.index].myFollow = 0;
          self.setData({
            zhaopian: shipintmp.list
          })
          let url = app.globalData.URL + '/follow/updateFollow';
          let data = {
            objtype: 60,
            objid: self.data.zhaopian[e.currentTarget.dataset.index].id,
            objtitle: self.data.zhaopian[e.currentTarget.dataset.index].title,
            creater: self.data.user.id,
            status: 0,
          };
          app.wxRequest('POST', url, data, (res) => {}, (err) => {});

        } else {
          shipintmp.list[e.currentTarget.dataset.index].myFollow = 1;
          self.setData({
            zhaopian: shipintmp.list
          })
          let url = app.globalData.URL + '/follow/updateFollow';
          let data = {
            objtype: 60,
            objid: self.data.zhaopian[e.currentTarget.dataset.index].id,
            objtitle: self.data.zhaopian[e.currentTarget.dataset.index].title,
            creater: self.data.user.id,
            status: 1,
          };
          app.wxRequest('POST', url, data, (res) => {}, (err) => {});
        }
      }
    } else {
      this.userPanduan()
    }
  },
  shipinDianzan: function (e) {
    if (this.data.quanxianCode == 0) {
      if (e.currentTarget.dataset.duixiang == 50) {
        var self = this;
        let shipintmp = this.data.shipin;
        if (shipintmp.list[e.currentTarget.dataset.index].myApplaud == 1) {
          shipintmp.list[e.currentTarget.dataset.index].myApplaud = 0;
          shipintmp.list[e.currentTarget.dataset.index].applaudCnt--;
          self.setData({
            shipin: shipintmp
          })
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
      } else {
        var self = this;
        let shipintmp = {};
        shipintmp.list = this.data.zhaopian;
        if (shipintmp.list[e.currentTarget.dataset.index].myApplaud == 1) {
          shipintmp.list[e.currentTarget.dataset.index].myApplaud = 0;
          shipintmp.list[e.currentTarget.dataset.index].applaudCnt--;
          self.setData({
            zhaopian: shipintmp.list
          })
          let url = app.globalData.URL + '/applaud/updateApplaud';
          let data = {
            objtype: 60,
            objid: self.data.zhaopian[e.currentTarget.dataset.index].id,
            objtitle: self.data.zhaopian[e.currentTarget.dataset.index].title,
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
            zhaopian: shipintmp.list
          })
          let url = app.globalData.URL + '/applaud/updateApplaud';
          let data = {
            objtype: 60,
            objid: self.data.zhaopian[e.currentTarget.dataset.index].id,
            objtitle: self.data.zhaopian[e.currentTarget.dataset.index].title,
            creater: self.data.user.id,
            status: 1,
          };
          app.wxRequest('POST', url, data, (res) => {
            console.log(res)
          }, (err) => {});
        }
      }
    } else {
      this.userPanduan()
    }
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
      dxindex: e.currentTarget.dataset.index,
    })
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
      shipinChooseSize: e.currentTarget.dataset.duixiang == 50 ? true : false,
      zhaopianChooseSize: e.currentTarget.dataset.duixiang == 60 ? true : false
    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        shipinAnimationData: animation.export()
      })
    }, 100)
    that.setData({
      shipin_index: e.currentTarget.dataset.index,
      isRefleshshipinPinglun: true,
      isRefleshZhaopianPinglun: true,
    })

    /////
    if (e.currentTarget.dataset.duixiang == 50) {
      var shipintmp = this.data.shipin;
      let url = app.globalData.URL + '/comm/listCommByObj';
      let data = {
        objtype: 50,
        objid: e.currentTarget.dataset.dxid,
      };
      app.wxRequest('POST', url, data, (res) => {
        if (res.data.border == null) {
          that.setData({
            isRefleshshipinPinglun: false
          })
        }
        shipintmp.list[e.currentTarget.dataset.index].listComm = res.data.list;
        that.setData({
          shipin: shipintmp,
          shipinPinglunBorder: res.data.border,
        })
      }, (err) => {
        console.log(err.errMsg)
      });
    } else {
      var shipintmp = this.data.zhaopian;
      let url = app.globalData.URL + '/comm/listCommByObj';
      let data = {
        objtype: 60,
        objid: e.currentTarget.dataset.dxid,
      };
      app.wxRequest('POST', url, data, (res) => {
        console.log(res)
        if (res.data.border == null) {
          that.setData({
            isRefleshZhaopianPinglun: false
          })
        }
        shipintmp[e.currentTarget.dataset.index].listComm = res.data.list;
        that.setData({
          zhaopian: shipintmp,
          zhaopianPinglunBorder: res.data.border,
          zhaopian_index: e.currentTarget.dataset.index
        })
      }, (err) => {
        console.log(err.errMsg)
      });
    }
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
        shipinChooseSize: false,
        zhaopianChooseSize: false
      })
    }, 100)
  },
  userPanduan: function () {
    var self = this;
    //判断是否登录
    let url = app.globalData.URL + '/appuser/getSpeakPerm';
    util.gets(url, {}).then(function (res) {
      console.log('auth--mypage', res)
      self.setData({
        quanxianCode: res.data.code
      })
      if (res.data.code == 0) {
        console.log("已授权")
        return 0;
      } else if (res.data.code == 126) {
        console.log('no auth')
        wx.showModal({
          title: '友点乐',
          content: '请先进行微信登录',
          cancelText: '取消',
          confirmText: '授权',
          success: res => {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/login/login',
              })
            } else {
              wx.navigateBack({
                delta: 1
              })
            }
          }
        })
        return "{code:126}";
      } else {
        console.log('no speak')
        wx.showModal({
          title: '友点乐',
          content: '请先进行微信登录',
          cancelText: '取消',
          confirmText: '授权',
          success: res => {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/login/login',
              })
            } else {
              wx.navigateBack({
                delta: 1
              })
            }
          }
        })
        return -1
      }
    })

  },
  userPanduan2: function () {
    //刚进入赋值权限code
    var self = this;
    let url = app.globalData.URL + '/appuser/getSpeakPerm';
    util.gets(url, {}).then(function (res) {
      console.log(res)
      self.setData({
        quanxianCode: res.data.code
      })
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    that.userPanduan()
    let data
    let url = app.globalData.URL + '/config/findCosParam';
    util.gets(url, {}).then(function (res) {
      console.log(res)
      that.setData({
        userinfo: res.data.data,
        user: wx.getStorageSync('userInfo')
      })
    })

    // wx.showLoading({
    //   title: '加载中',
    //   mask: true
    // })
    url = app.globalData.URL + '/config/findAllActivityClass1';
    // 所有活动
    util.gets(url, {}).then(function (res) {
      let tmp = res.data.data
      tmp.unshift({
        code: null,
        name: '全部'
      })
      that.setData({
        AllActivity: tmp
      })
    })
    url = app.globalData.URL + '/photo/listUserPhoto';
    data = {
      uid: wx.getStorageSync('userInfo').id
    }
    util.post_token(url, data).then(function (res) {
      console.log(res)
      that.setData({
        zhaopian: res.data.data.list,
        border: res.data.data.border
      })
      wx.hideLoading()
    })
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
    let url = app.globalData.URL + '/photo/listUserPhoto';
    let data = {
      'uid':that.data.user.id,
      'acid1':that.data.nowactid,
      'border': that.data.border
    };
    util.post_token(url, data).then(function (res) {
      console.log('add pic', res.data)
      let _data = that.data.zhaopian
      for (let i of res.data.data.list) {
        _data.push(i)
      }
      that.setData({
        needflesh: res.data.data.list.length != 0,
        zhaopian: _data,
        border:res.data.data.border
      })
      wx.hideLoading()
    })
  },
  onShareAppMessage: function (e) {
    console.log(e)
    var that = this;
    if (e.target.dataset.duixiang == 50) {
      return {
        title: '友点乐',
        path: 'pages/fenxiangshipin/fenxiang?Tabcur=' + that.data.TabCur + '&shipinID=' + that.data.shipin.list[e.target.dataset.index].id + '&duixiang=' + e.target.dataset.duixiang,
        success: function (res) {
          console.log("转发成功:" + JSON.stringify(res));
          that.shareClick();
        },
        fail: function (res) {
          console.log("转发失败:" + JSON.stringify(res));
        }
      }
    } else if (e.target.dataset.duixiang == 60) {
      return {
        title: '友点乐',
        path: 'pages/fenxiangshipin/fenxiang?Tabcur=' + that.data.TabCur + '&zhaopianID=' + that.data.zhaopian[e.target.dataset.index].id + '&duixiang=' + e.target.dataset.duixiang,
        success: function (res) {
          console.log("转发成功:" + JSON.stringify(res));
          that.shareClick();
        },
        fail: function (res) {
          console.log("转发失败:" + JSON.stringify(res));
        }
      }
    } else {
      return {
        title: '友点乐',
        path: 'pages/yundongxiangqing/yundongxiangqing?TabCur=' + that.data.TabCur + '&Title=' + that.data.biaoti + '&categoryId=' + that.data.categoryId,
        success: function (res) {
          console.log("转发成功:" + JSON.stringify(res));
          that.shareClick();
        },
        fail: function (res) {
          console.log("转发失败:" + JSON.stringify(res));
        }
      }
    }

  }
})