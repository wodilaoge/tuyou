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
    fensiDetail: [],
    haoyoushu: 0,
    dianzanshu: 0,
    ifguanzhu: 0,
    ifziji: 0,
    huodongshu: 0,

    count: 0,
    comment: [],
    chooseSize: false,
    ifzan: false,
    Input: "",
    options: '',
    ziliaoDalei: [],
    ziliaoDaleiCur: '',
    paimingDetail: [],
  },
  ///////////评论
  comment() { //评论
    var self = this
    let url = app.globalData.URL + '/comm/countCommByObj';
    let data = {
      objid: this.data.duiyuanID,
      objtype: 10
    };
    app.wxRequest('GET', url, data, (res) => {
      console.log(res)
      self.setData({
        count: res.data
      });
    }, (err) => {
      console.log(err.errMsg)
    });
    url = app.globalData.URL + '/comm/listCommByObj';
    app.wxRequest('GET', url, data, (res) => {
      console.log(res)
      this.setData({
        comment: res.data
      });
      self.setData({
        loading: false
      });
      /*if (self.data.comment.length == 0)
        {}
      else {
        var list = self.data.comment.list

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
  chooseSezi: function(e) {
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
    setTimeout(function() {
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
  hideModal: function(e) {
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
    setTimeout(function() {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        chooseSize: false
      })
    }, 100)
  },
  emailInput: function(e) { //input输入
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
    var self = this;

    let url = app.globalData.URL + '/comm/addComment';
    let data = {
      pid: null,
      objtype: 10,
      objid: self.data.duiyuanID,
      objtitle: "",
      comment: self.data.Input,
      creater: self.data.user.id,
      createrAlias: self.data.user.nickname,
      createrHead: self.data.user.head
    };
    console.log(data)
    app.wxRequest('POST', url, data, (res) => {
      self.onLoad(self.data.options);
      if (res.code == 0)
        wx.showToast({
          title: '评论成功！', // 标题
          icon: 'success', // 图标类型，默认success
          duration: 1500 // 提示窗停留时间，默认1500ms
        })
      else {
        console.log(res.data)
        wx.showToast({
          title: res.data.msg, // 标题
          image: '/img/fail.png', // 图标类型，默认success
          duration: 1000 // 提示窗停留时间，默认1500ms
        })
      }
    }, (err) => {
      console.log(err.errMsg)
    });

    self.setData({
      Input: '',
    })
    self.hideModal()
  },
  pinluntiaozhuan(e) { //评论跳转
    wx.navigateTo({
      url: '/pages/pinlunliebiao/pinlunliebiao?categoryId=' + this.data.duiyuanID + '&objtitle=' + '',
    })
  },

  zan() { //活动点赞或取消
    self = this;
    let url = app.globalData.URL + '/applaud/updateApplaud';
    if (self.data.ifzan)
      var data = {
        objtype: 10,
        objid: self.data.duiyuanID,
        objtitle: '',
        creater: self.data.user.id,
        status: 0,
      };
    else
      var data = {
        objtype: 10,
        objid: self.data.duiyuanID,
        objtitle: '',
        creater: self.data.user.id,
        status: 1,
      };
    app.wxRequest('POST', url, data, (res) => {
      if (self.data.ifzan)
        self.setData({
          ifzan: false,
        })
      else
        self.setData({
          ifzan: true,
        })
      wx.showToast({
        title: '操作成功！', // 标题
        icon: 'success', // 图标类型，默认success
        duration: 500 // 提示窗停留时间，默认1500ms
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  /////////////
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
      // if(this.data.duiyuanDeatil.sex==0){
      //   this.data.duiyuanDeatil.sext='男'
      // }else if(this.data.duiyuanDeatil.sex==1){
      //   this.data.duiyuanDeatil.sext='女'
      // }else{
      //   this.data.duiyuanDeatil.sext='暂无'
      // }

      if(this.data.duiyuanDeatil.id==this.data.user.id){
        this.setData({
          ifziji:1,
        })
      }
      console.log(this.data.duiyuanDeatil)
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
  getFensiDetail() {
    let url = app.globalData.URL + '/follow/listUserByObj';
    let data = {
      objid: this.data.duiyuanID,
      objtype: 10,
    };
    app.wxRequest('GET', url, data, (res) => {
      this.setData({
        fensiDetail: res.data,
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
  getPaimingDalei() {
    var self=this;
    let url = app.globalData.URL + '/config/findAllActivityClass1';
    let data = {
    };
    app.wxRequest('GET', url, data, (res) => {
      console.log(res.data)
      this.setData({
        ziliaoDalei: res.data,
        ziliaoDaleiCur: res.data[0].code,
      })

       url = app.globalData.URL + '/act/listMyRank'
      data = {
        uid: self.data.user.id,
        acid1: res.data[0].code
      }
      console.log(data)
      app.wxRequest('GET', url, data, (res) => {
        console.log(res)
        self.setData({
          paimingDetail: res.data
        })
      })

    }, (err) => {
      console.log(err.errMsg)
    });
  },
  ziliaoTabSelect(e) { 
    this.setData({
      ziliaoDaleiCur: e.currentTarget.dataset.cur,
      // scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
    var self = this
    let url = app.globalData.URL + '/act/listMyRank'
    let data = {
      uid:self.data.user.id,
      acid1: self.data.ziliaoDaleiCur
    }
    app.wxRequest('GET', url, data, (res) => {
      console.log(res)
      self.setData({
        paimingDetail: res.data
      })
    })
    // if (this.data.shipinCur == '0') {
    //   this.getShipin()
    // } else {
    //   this.getShipinfenlei()
    // }
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
  //////////分享
  onShareAppMessage: function(e) { 
    console.log(ok)   
    var  that  =  this;    
    return  {      
      title:   '友点乐',
            success:   function (res)  {        
        console.log("转发成功:"  +  JSON.stringify(res));        
        that.shareClick();      
      },
            fail:   function (res)  {        
        console.log("转发失败:"  +  JSON.stringify(res));      
      }    
    }  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      duiyuanID: options.id,
      user: wx.getStorageSync('userInfo'),
      options: options,
    })
    this.getDuiyuan()
    this.getDianzan()
    this.getFensi()
    this.getHaoyou()
    this.getGuanzhu()
    this.getHuodong()
    this.comment()
    this.getFensiDetail()
    this.getPaimingDalei()
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