// pages/fenxiangshipin/fenxiang.js
const app = getApp();
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shipin: '',
    bofang_pid: '0',
    user: [],
    type: 50,
    zhaopian: [],
    swiper_current: 0,
  },
  tabCur: 0,
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
  getOneZhaopian: function (e) {
    var self = this;
    let url = app.globalData.URL + '/photo/listActPhotoFirst';
    let data = {
      id: e,
    };
    console.log(data)
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      // let shipintt = {};
      // shipintt.border = 0;
      // shipintt.list = [];
      // shipintt.list.splice(0, 0, res.data)
      // console.log(shipintt)
      let shipintmp = JSON.stringify(res.data.list[0]);
      console.log(shipintmp)
      var jsonObj = JSON.parse(shipintmp);
      let zhaopiantmp = [jsonObj];
      self.setData({
        zhaopian: zhaopiantmp,
      })
      console.log(self.data.zhaopian)
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  navshouye() {
    console.log(this.tabCur, 'nav')
    if (this.tabCur) {
      wx.reLaunch({
        url: '../xiaoyuan/xiaoyuan?TabCur=' + this.tabCur,
      })
    } else {
      wx.reLaunch({
        url: '../index/index?',
      })
    }

  },
  video_change: function (e) { ////视频切换
    var self = this;
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
    })

    /////
    if (e.currentTarget.dataset.duixiang == 50) {
      var shipintmp = this.data.shipin;
      let url = app.globalData.URL + '/comm/listCommByObj';
      let data = {
        objtype: 50,
        objid: e.currentTarget.dataset.dxid,
      };
      app.wxRequest('GET', url, data, (res) => {
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
      app.wxRequest('GET', url, data, (res) => {
        if (res.data.border == null) {
          that.setData({
            isRefleshshipinPinglun: false
          })
        }
        shipintmp[e.currentTarget.dataset.index].listComm = res.data.list;
        that.setData({
          zhaopian: shipintmp,
          shipinPinglunBorder: res.data.border,
        })
      }, (err) => {
        console.log(err.errMsg)
      });
    }
  },
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
    e.currentTarget.dataset.index = 0;
    that.setData({
      duixiang: e.currentTarget.dataset.duixiang,
      dxid: e.currentTarget.dataset.dxid,
      dxtitle: e.currentTarget.dataset.dxtitle,
      dxindex: e.currentTarget.dataset.index,
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
  emailInput: function (e) { //input输入
    this.setData({
      Input: e.detail.value
    });
  },

  //评论
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
        // wx.navigateTo({
        //   url: '/pages/MyPages/my_profile/my_profile',
        // })
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
  setChange_swiper: function (e) {
    this.setData({
      swiper_current: e.detail.current
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.userPanduan()
    this.setData({
      user: wx.getStorageSync('userInfo'),
      type: options.duixiang
    })
    if (options.duixiang == 50) {
      this.getOneShipin(options.shipinID);
    } else {
      this.getOneZhaopian(options.zhaopianID);
    }

    this.tabCur = options.Tabcur;
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