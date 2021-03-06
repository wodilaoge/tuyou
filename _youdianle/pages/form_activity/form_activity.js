const app = getApp();
var upload = require("../../utils/upload.js");
var util = require("../../utils/util.js");
Page({
  data: {
    hiddenmodalput:true,
    actid: 1760034971189248,
    rule:null,
    award:null,
    spon:null,
    group: 0,
    index: 0,
    index2: 0,
    opinion1: 10,
    opinion2: 20,
    opinion3: 10,
    number: 100,
    picker: ['个人报名', '团体报名'],
    picker2: ['匿名参赛', '实名参赛'],
    picker3: ['观看无需报名', '匿名报名观看', '实名报名观看'],
    groups: [],
    time: '12:01',
    date: '2020.4.25 16:00',
    date2: '2020.8.25 16:00',
    imgList: [],
    imgList2: [],
    imgList3: [],
    imgList4: [],
    imgList5: [],
    url1: [],
    url2: [],
    url3: [],
    url4: [],
    url5: [],
    modalName: null,
    info: {},
    tes: '',
    webinfo: []
  },
  cancel2: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  finish: function (e) {
    var that=this
    that.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })

  },

  test(){
      let t=this.data.url1.length!=0?this.data.url1:null
      console.log(t)
  },
  getrule(e) {
    this.setData({
      rule: e.detail.value
    })
  },
  getaward(e) {
    this.setData({
      award: e.detail.value
    })
  },
  getspon(e) {
    this.setData({
      spon: e.detail.value
    })
  },
  toagreepage() {
    wx.navigateTo({
      url: '/pages/webview/webview',
    })
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
    this.setData({
      opinion1: (parseInt(this.data.index) + 1) * 10
    })
  },
  PickerChange2(e) {
    console.log(e);
    this.setData({
      index2: e.detail.value
    })
    this.setData({
      opinion2: (parseInt(this.data.index2) + 1) * 10
    })
  },
  MultiChange(e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  RegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  ChooseImage(e) {
    var t = e.currentTarget.dataset.id
    var that = this
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (t == 1) {
          if (this.data.imgList.length != 0) {
            this.setData({
              imgList: this.data.imgList.concat(res.tempFilePaths)
            })
          } else {
            this.setData({
              imgList: res.tempFilePaths
            })
          }
          upload.uploadFile(this.data.imgList[this.data.imgList.length - 1], 'rule', that)
          this.setData({
            loadModal: true
          })
        }
        if (t == 2) {
          if (this.data.imgList2.length != 0) {
            this.setData({
              imgList2: this.data.imgList2.concat(res.tempFilePaths)
            })
          } else {
            this.setData({
              imgList2: res.tempFilePaths
            })
          }
          upload.uploadFile(this.data.imgList2[this.data.imgList2.length - 1], 'award', that)
          this.setData({
            loadModal: true
          })
        }
        if (t == 3) {
          if (this.data.imgList3.length != 0) {
            this.setData({
              imgList3: this.data.imgList3.concat(res.tempFilePaths)
            })
          } else {
            this.setData({
              imgList3: res.tempFilePaths
            })
          }
          upload.uploadFile(this.data.imgList3[this.data.imgList3.length - 1], 'logo', that)
          this.setData({
            loadModal: true
          })
        }
        if (t == 4) {
          if (this.data.imgList4.length != 0) {
            this.setData({
              imgList4: this.data.imgList4.concat(res.tempFilePaths)
            })
          } else {
            this.setData({
              imgList4: res.tempFilePaths
            })
          }
          upload.uploadFile(this.data.imgList4[this.data.imgList4.length - 1], 'rot', that)
          this.setData({
            loadModal: true
          })
        }
        if (t == 5) {
          if (this.data.imgList5.length != 0) {
            this.setData({
              imgList5: this.data.imgList5.concat(res.tempFilePaths)
            })
          } else {
            this.setData({
              imgList5: res.tempFilePaths
            })
          }
          upload.uploadFile(this.data.imgList5[this.data.imgList5.length - 1], 'spons', that)
          this.setData({
            loadModal: true
          })
        }
      }
    });

  },
  ViewImage(e) {
    var t = e.currentTarget.dataset.id
    if (t == 1) {
      wx.previewImage({
        urls: this.data.imgList,
        current: e.currentTarget.dataset.url
      });
    }
    if (t == 2) {
      wx.previewImage({
        urls: this.data.imgList2,
        current: e.currentTarget.dataset.url
      });
    }
    if (t == 3) {
      wx.previewImage({
        urls: this.data.imgList3,
        current: e.currentTarget.dataset.url
      });
    }
    if (t == 4) {
      wx.previewImage({
        urls: this.data.imgList4,
        current: e.currentTarget.dataset.url
      });
    }
    if (t == 5) {
      wx.previewImage({
        urls: this.data.imgList5,
        current: e.currentTarget.dataset.url
      });
    }
  },
  DelImg(e) {
    var t = e.currentTarget.dataset.id
    if (t == 1) {
      wx.showModal({
        title: '确定',
        content: '确定要删除这张照片？',
        cancelText: '取消',
        confirmText: '确认删除',
        success: res => {
          if (res.confirm && t == 1) {
            this.data.imgList.splice(e.currentTarget.dataset.index, 1);
            this.data.url1.splice(e.currentTarget.dataset.index, 1);
            this.setData({
              imgList: this.data.imgList,
              url1: this.data.url1
            })
          }
        }
      })
    }
    if (t == 2) {
      wx.showModal({
        title: '确定',
        content: '确定要删除这张照片？',
        cancelText: '取消',
        confirmText: '确认删除',
        success: res => {
          if (res.confirm && t == 2) {
            this.data.imgList2.splice(e.currentTarget.dataset.index, 1);
            this.data.url2.splice(e.currentTarget.dataset.index, 1);
            this.setData({
              imgList2: this.data.imgList2,
              url2: this.data.url2
            })
          }
        }
      })
    }
    if (t == 3) {
      wx.showModal({
        title: '确定',
        content: '确定要删除这张照片？',
        cancelText: '取消',
        confirmText: '确认删除',
        success: res => {
          if (res.confirm && t == 3) {
            this.data.imgList3.splice(e.currentTarget.dataset.index, 1)
            this.data.url3.splice(e.currentTarget.dataset.index, 1);
            this.setData({
              imgList3: this.data.imgList3,
              url3: this.data.url3
            })
          }
        }
      })
    }
    if (t == 4) {
      wx.showModal({
        title: '确定',
        content: '确定要删除这张照片？',
        cancelText: '取消',
        confirmText: '确认删除',
        success: res => {
          if (res.confirm && t == 4) {
            this.data.imgList4.splice(e.currentTarget.dataset.index, 1);
            this.data.url4.splice(e.currentTarget.dataset.index, 1);
            this.setData({
              imgList4: this.data.imgList4,
              url4: this.data.url4
            })
          }
        }
      })
    }
    if (t == 5) {
      wx.showModal({
        title: '确定',
        content: '确定要删除这张照片？',
        cancelText: '取消',
        confirmText: '确认删除',
        success: res => {
          if (res.confirm && t == 5) {
            this.data.imgList5.splice(e.currentTarget.dataset.index, 1);
            this.data.url5.splice(e.currentTarget.dataset.index, 1);
            this.setData({
              imgList5: this.data.imgList5,
              url5: this.data.url5
            })
          }
        }
      })
    }
  },
  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },
  textareaBInput(e) {
    this.setData({
      textareaBValue: e.detail.value
    })
  },
  toForm_modify: function(e) {
    wx.navigateTo({
      url: "../../pages/form_modify/form_modify"
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  addicon: function(e) {
    var tt = this.data.group
    if (tt > 9) {
      wx.showToast({
        title: '最多添加10个',
      })
    } else {
      tt++
      this.setData({
        group: tt
      })
    }
  },
  subicon: function(e) {
    var t = this.data.group
    this.data.groups.splice(t - 1, 1)
    t--
    this.setData({
      group: t
    })
  },
  prevNum() {
    this.setData({
      number: this.data.number + 1
    });
  },
  nextNum() {
    this.setData({
      number: this.data.number - 1
    });
  },
  num(e) {
    this.setData({
      number: e.detail.value
    })
  },

  commit2: function(e) {
    var user = wx.getStorageSync('userInfo')
    user = 'Bearer ' + user.token;
    var urls = app.globalData.URL + '/act/pubActivity';
    var rotation = [];
    for (var i in this.data.url4) {
      var tmp = {};
      tmp.id = '';
      tmp.rotation = i;
      rotation.push(tmp)
    }
    wx.request({
      url: urls,
      method: "POST",
      data: {
        id: '',
        actname: this.data.info.actname,
        sid: this.data.info.sid,
        acid1: this.data.info.acid1,
        acid2: this.data.info.acid2,
        logo: this.data.info.logo? this.data.info.logo : null,
        rotations: this.data.url4.length!=0?this.data.url4:null,
        groups: this.data.groups,
        fromtime: this.data.info.timenow,
        totime: null,
        signupdeadline: this.data.info.signupdeadline,
        signupmax: this.data.info.entrylimit,
        audiencemax: this.data.number,
        slogan: this.data.info.slogan,
        entrylimit: this.data.opinion1,
        audiencelimit: this.data.opinion2,
        rule: this.data.rule,
        rulepic: this.data.url1.length!=0 ? this.data.url1[0]:null,
        award: this.data.award,
        awardpic: this.data.url2.length!=0?this.data.url2[0]:null,
        sponsor: this.data.spon,
        sponsorpic: this.data.url5.length != 0 ? this.data.url5[0] : null,
        signupway: this.data.opinion3,
        chatid: null,
        univ: this.data.info.univid,
        province: this.data.info.province,
        city: this.data.info.city,
        address: this.data.info.venue,
        venue: this.data.info.venue,
        creater: user.id,
        createralias: user.nickname,
        createrhead: user.head,
        status: 10,
      },
      header: {
        "Content-Type": "application/json",
        'Authorization': user
      },
      success: function(res) {
        console.log(res.data);
        if (res.data.code==0) {
          wx.showToast({
            title: '提交成功',
            duration: 2000,
            success: function () {
              setTimeout(function () {
                wx.reLaunch({
                  url: '/pages/index/index',
                })
              }, 2000);
            }
          })
        }
        else{
          wx.showToast({
            title:res.data.msg,
            image:'/img/fail.png',
            icon: 'success',
            duration: 2000
          })
        }
      },
    })
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  g1(e) {
    var that = this;
    var obj = {};
    // console.log(this.data.groups.length)
    if (this.data.groups.length == 0) {
      obj.id = '';
      obj.groupname = '';
      obj.signupmax = 10;
      let t = that.data.groups;
      t.push(obj);
      that.setData({
        t
      });
    } else {
      that.setData({
        'groups[0].groupname': e.detail.value
      })
    }
  },
  g2(e) {
    var that = this;
    var obj = {};
    if (this.data.groups.length == 1) {
      obj.id = '';
      obj.groupname = '';
      obj.signupmax = 10;
      let t = that.data.groups;
      t.push(obj);
      that.setData({
        t
      });
    } else {
      that.setData({
        'groups[1].groupname': e.detail.value
      })
    }
  },
  g3(e) {
    var that = this;
    var obj = {};
    if (this.data.groups.length == 2) {
      obj.id = '';
      obj.groupname = '';
      obj.signupmax = 10;
      let t = that.data.groups;
      t.push(obj);
      that.setData({
        t
      });
    } else {
      that.setData({
        'groups[2].groupname': e.detail.value
      })
    }
  },
  g4(e) {
    var that = this;
    var obj = {};
    if (this.data.groups.length == 3) {
      obj.id = '';
      obj.groupname = '';
      obj.signupmax = 10;
      let t = that.data.groups;
      t.push(obj);
      that.setData({
        t
      });
    } else {
      that.setData({
        'groups[3].groupname': e.detail.value
      })
    }
  },
  g5(e) {
    var that = this;
    var obj = {};
    if (this.data.groups.length == 4) {
      obj.id = '';
      obj.groupname = '';
      obj.signupmax = 10;
      let t = that.data.groups;
      t.push(obj);
      that.setData({
        t
      });
    } else {
      that.setData({
        'groups[4].groupname': e.detail.value
      })
    }
  },
  g6(e) {
    var that = this;
    var obj = {};
    if (this.data.groups.length == 5) {
      obj.id = '';
      obj.groupname = '';
      obj.signupmax = 10;
      let t = that.data.groups;
      t.push(obj);
      that.setData({
        t
      });
    } else {
      that.setData({
        'groups[5].groupname': e.detail.value
      })
    }
  },
  g7(e) {
    var that = this;
    var obj = {};
    if (this.data.groups.length == 6) {
      obj.id = '';
      obj.groupname = '';
      obj.signupmax = 10;
      let t = that.data.groups;
      t.push(obj);
      that.setData({
        t
      });
    } else {
      that.setData({
        'groups[6].groupname': e.detail.value
      })
    }
  },
  g8(e) {
    var that = this;
    var obj = {};
    if (this.data.groups.length == 7) {
      obj.id = '';
      obj.groupname = '';
      obj.signupmax = 10;
      let t = that.data.groups;
      t.push(obj);
      that.setData({
        t
      });
    } else {
      that.setData({
        'groups[7].groupname': e.detail.value
      })
    }
  },
  g9(e) {
    var that = this;
    var obj = {};
    if (this.data.groups.length == 8) {
      obj.id = '';
      obj.groupname = '';
      obj.signupmax = 10;
      let t = that.data.groups;
      t.push(obj);
      that.setData({
        t
      });
    } else {
      that.setData({
        'groups[8].groupname': e.detail.value
      })
    }
  },
  g10(e) {
    var that = this;
    var obj = {};
    if (this.data.groups.length == 9) {
      obj.id = '';
      obj.groupname = '';
      obj.signupmax = 10;
      let t = that.data.groups;
      t.push(obj);
      that.setData({
        t
      });
    } else {
      that.setData({
        'groups[9].groupname': e.detail.value
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  getuploadinfo() {
    var that = this
    let url = app.globalData.URL + '/config/findCosParam';
    let data = '';
    util.gets(url, {}).then(function(res) {
      var t = res.data
      that.setData({
        webinfo: res.data
      })
    })
  },
  demo(web) {
    upload.uploadFile(web)
  },
  onLoad: function(options) {
    var t = wx.getStorageSync('information');
    this.getuploadinfo(); //获取上传文件信息
    this.setData({
      info: t,
      opinion3: (parseInt(t.way) + 1) * 10
    })
  },
  onReady: function() {

  },
  onShow: function() {

  },

})