const app = getApp();
var util = require("../../utils/util.js");
var upload = require("../../utils/upload.js");

Page({
  data: {
    isagree: true,
    hiddenmodalput: true,
    isaddress: false,
    modify: false,
    showsection: '运动',
    showtype: '',
    group: 0,
    indexbig: 0,
    index: 0,
    number: 50,
    name: '',
    article: '',
    captain: '',
    linktel: '',
    tdslogan: '',
    province: '',
    city: '',
    univid: '',
    superior: '',
    rssort: '',
    email: '',
    website: '',
    wcoa: '',
    univid: '',
    province: '',
    city: '',
    showpro: '浙江',
    showcity: '',
    showuni: '',
    indexp: 0, //省
    indexc: 0, //市
    indexs: 0, //学校
    provinceList: [],
    citys: [],
    school: [],
    pickerbig: [],
    picker2: [],
    imgList: [],
    modalName: null,
    other: [],
    information: [],
    sid: '',
    acid1: '',
    teamInfo: {
      'rssort': '50'
    }
  },
  isagree(e) {
    console.log('fuck')
    this.setData({
      isagree: !this.data.isagree
    })
  },
  toagreepage() {
    wx.navigateTo({
      url: '/pages/webview/webview',
    })
  },
  PickerChange2(e) { //活动大类
    this.setData({
      index: e.detail.value
    })
    let v = this.data.picker2[this.data.index].code
    this.setData({
      acid1: v
    });
    // this.getthird(this.data.information.acid1)
  },
  PickerChangebig(e) { //活动板块
    this.setData({
      indexbig: e.detail.value
    })
    let v = this.data.pickerbig[this.data.indexbig].code
    this.setData({
      sid: v
    });
    this.gettwo(v)
  },
  PickerChangetiny(e) { //活动小类
    let t = 'information.acid2'
    this.setData({
      indextiny: e.detail.value
    })
    let v = this.data.pickertiny[this.data.indextiny].code
    this.setData({
      [t]: v
    });
  },
  PickerPro(e) {
    let t = 'province'
    this.setData({
      indexp: e.detail.value,
      indexc: 0,
      indexs: 0,
      [t]: this.data.provinceList[this.data.indexp].code,
      proname: this.data.provinceList[this.data.indexp].name,
      showpro: this.data.provinceList[this.data.indexp].name,
      showcity: '请选择',
      showuni: '请选择'
    })
    this.city(this.data.province)
  },
  PickerCity(e) {
    let t = 'city'
    this.setData({
      indexc: e.detail.value,
      indexs: 0
    })
    this.setData({
      [t]: this.data.citys[this.data.indexc].code,
      cityname: this.data.citys[this.data.indexc].name,
      showcity: this.data.citys[this.data.indexc].name,
      showuni: '请选择'
    })
    this.school(this.data.city)
  },
  PickerSchool(e) {
    let t = 'univid'
    this.setData({
      indexs: e.detail.value,
      [t]: this.data.school[e.detail.value].code,
      schoolname: this.data.school[e.detail.value].name,
      showuni: this.data.school[e.detail.value].name,
    })
  },
  gettwo(code) {
    var that = this
    let url = app.globalData.URL + '/config/getActivityClass1';
    let data = {
      'sid': code
    };
    util.gets(url, data).then(function (res) {
      that.setData({
        picker2: res.data.data,
        acid1: res.data.data[0].code
      })
    })
  },
  school(pid) {
    let url = app.globalData.URL + '/config/getUniv';
    let data = {
      cid: pid
    };
    app.wxRequest('GET', url, data, (res) => {
      this.setData({
        school: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  city(pid) {
    let url = app.globalData.URL + '/config/getCity';
    let data = {
      pid: pid
    };
    app.wxRequest('GET', url, data, (res) => {
      this.setData({
        citys: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  province() {
    let url = app.globalData.URL + '/config/getProvince';
    let data = '';
    app.wxRequest('GET', url, data, (res) => {
      this.setData({
        provinceList: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
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
  RegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  getsuperior(e) {
    let t = 'teamInfo.superior'
    this.setData({
      [t]: e.detail.value
    })
  },
  getname(e) {
    let t = 'teamInfo.name'
    this.setData({
      [t]: e.detail.value
    })
  },
  getcaptain(e) {
    this.setData({
      captain: e.detail.value
    })
  },
  getphone(e) {
    let t = 'teamInfo.linktel'
    this.setData({
      [t]: e.detail.value
    })
  },
  gettdslogan(e) {
    let t = 'teamInfo.slogan'
    this.setData({
      [t]: e.detail.value
    })
  },
  getemail(e) {
    let t = 'teamInfo.email'
    this.setData({
      [t]: e.detail.value
    })
  },
  getweb(e) {
    let t = 'teamInfo.website'
    this.setData({
      [t]: e.detail.value
    })
  },
  getwx(e) {
    let t = 'teamInfo.wcoa'
    this.setData({
      [t]: e.detail.value
    })
  },
  num(e) {
    let t = 'teamInfo.rssort'
    this.setData({
      [t]: e.detail.value
    })
  },
  ChooseImage(e) {
    var that = this;
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
        upload.uploadFile(this.data.imgList[0], 'other', that)
        this.setData({
          loadModal: true
        })
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
            this.setData({
              imgList: this.data.imgList,
              other: []
            })
          }
        }
      })
    }
  },
  textareaAInput(e) {
    let t = 'teamInfo.summary'
    this.setData({
      [t]: e.detail.value
    })
  },
  toForm_modify: function (e) {
    wx.navigateTo({
      url: "../../pages/form_modify/form_modify"
    })
  },
  firstcommit() {

    var that = this
    if (!that.data.sid) {
      wx.showToast({
        title: '请选择活动版块',
      })
      return
    }
    if (!that.data.acid1) {
      wx.showToast({
        title: '请选择活动大类',
      })
      return
    }
    if (!that.data.teamInfo.name) {
      wx.showToast({
        title: '请填写团队名称',
      })
      return
    }
    if (that.data.imgList.length == 0) {
      wx.showToast({
        title: '请上传队徽',
      })
      return
    }
    // ///手机号码验证：
    // if (that.data.teamInfo.linktel) {
    //   if (!(/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/.test(that.data.teamInfo.linktel))) {
    //     wx.showToast({
    //       title: '手机号输入格式不规范',
    //       duration: 2000,
    //       icon: 'none'
    //     });
    //   }
    //   return
    // }
    // //邮箱验证
    // if (that.data.teamInfo.email) {
    //   if (!(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(that.data.teamInfo.email))) {
    //     wx.showToast({
    //       title: 'Email输入格式不规范',
    //       duration: 2000,
    //       icon: 'none'
    //     });
    //     return
    //   }
    // }
    
    that.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  cancel2: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  commit: function (e) {
    var that = this.data.teamInfo
    let pro = wx.getStorageSync('province').code
    let city = wx.getStorageSync('city').code
    let school = wx.getStorageSync('school').code
    var user = wx.getStorageSync('userInfo')
    let url = app.globalData.URL + '/team/updateTeam';
    var data = this.data
    var data = {
      id: that.id,
      lid: user.id,
      sid: data.sid,
      acid1: data.acid1,
      name: that.name,
      summary: that.summary,
      logo: data.other[0],
      linktel: that.linktel,
      slogan: that.slogan,

      province: this.data.province,
      city: this.data.city,
      univ: this.data.univid,

      superior: that.superior,
      // rssort: that.rssort,
      email: that.email,
      website: that.website,
      wcoa: that.wcoa,
      status:this.data.modify==false?10:this.data.teamInfo.inStatus,
    }
    util.post_token(url, data).then(function (res) {
      console.log(res.data)
      if (res.data.code == 0) {
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
      } else {
        wx.showToast({
          title: res.data.msg,
          image: '/img/fail.png',
          icon: 'success',
          duration: 2000
        })
      }
    }).catch(function (res) {
      console.log(res)
      wx.showToast({
        title: '提交失败！',
        icon: 'success',
        duration: 2000
      })
    })
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  prevNum() {
    let t = 'teamInfo.rssort'
    this.setData({
      [t]: this.data.number + 1
    });
  },
  nextNum() {
    let t = 'teamInfo.rssort'
    this.setData({
      [t]: this.data.number - 1
    });
  },
  onLoad(options) {
    wx.showLoading({
      title: '加载中...',
      mask: true //显示触摸蒙层  防止事件穿透触发
    });
    var that = this
    let url2 = app.globalData.URL + '/appuser/getPubPerm'
    util.gets(url2, {}).then(function (res) {
      console.log('auth', res)
      that.setData({
        auth: res.data
      })
      if (res.data.code == 43) {
        wx.showToast({
          title: '您已被禁言',
          duration: 2000,
          success: function () {
            setTimeout(function () {
              wx.switchTab({
                url: '/pages/index/index',
              })
            }, 2000);
          }
        })
      } else if (res.data.code == 117) {
        wx.showToast({
          title: res.data.msg,
          duration: 2000,
          success: function () {
            setTimeout(function () {
              wx.navigateTo({
                url: '/pages/MyPages/my_security/my_security',
              })
            }, 2000);
          }
        })
      } else if (res.data.code == 135) {
        wx.showToast({
          title: res.data.msg,
          duration: 2000,
          success: function () {
            setTimeout(function () {
              wx.navigateTo({
                url: '/pages/MyPages/my_profile/my_profile',
              })
            }, 2000);
          }
        })
      }
    })
    console.log('wx auth finished')

    this.province();
    let url = app.globalData.URL + '/config/getActivitySection';
    util.gets(url, {}).then(function (res) {
      that.setData({
        pickerbig: res.data.data
      })
      wx.hideLoading()
    })

    if (options.modify == 1) {
      //查团队详情
      that.setData({
        modify: true
      })
      var _url = app.globalData.URL + '/team/findTeam';
      var data = {
        id: options.id
      }
      util.gets(_url, data).then(function (res) {
        console.log('团队详情', res.data)
        let t = 'imgList[0]'
        let t2 = 'other[0]'
        that.setData({
          teamInfo: res.data.data,
          [t]: res.data.data.logo,
          [t2]: res.data.data.logo,
          sid: res.data.data.sid,
          acid1: res.data.data.acid1,
          province: res.data.data.province,
          city: res.data.data.city,
          univid: res.data.data.univ,
        })
        that.gettwo(res.data.data.sid)
        that.city(res.data.data.province)
        that.school(res.data.data.city)
        //按code查name
        var url = app.globalData.URL + '/config/findDictName';
        var data = {
          code: res.data.data.sid
        }
        util.gets(url, data).then(function (res) {
          console.log('板块', res.data)
          that.setData({
            showsection: res.data.data
          })
        })
        //按code查name
        var url = app.globalData.URL + '/config/findDictName';
        var data = {
          code: res.data.data.acid1
        }
        util.gets(url, data).then(function (res) {
          console.log('板块', res.data)
          that.setData({
            showtype: res.data.data
          })
        })
        //按code查name
        var url = app.globalData.URL + '/config/findDictName';
        var data = {
          code: res.data.data.province
        }
        util.gets(url, data).then(function (res) {
          console.log('省份', res.data)
          that.setData({
            showpro: res.data.data
          })
        })
        //按code查name
        var url = app.globalData.URL + '/config/findDictName';
        var data = {
          code: res.data.data.city
        }
        util.gets(url, data).then(function (res) {
          console.log('城市', res.data)
          that.setData({
            showcity: res.data.data == null ? '' : res.data.data
          })
        })
        //按code查name
        var url = app.globalData.URL + '/config/findDictName';
        var data = {
          code: res.data.data.univ
        }
        util.gets(url, data).then(function (res) {
          console.log('学校', res.data)
          that.setData({
            showuni: res.data.data == null ? '' : res.data.data
          })
        })
        let _bigtmp
        if (res.data.data.sid == '076003')
          _bigtmp = 0
        else if (res.data.data.sid == '076004')
          _bigtmp = 1
        else if (res.data.data.sid == '076005')
          _bigtmp = 2
        else
          _bigtmp = 3
        that.setData({
          indexbig: _bigtmp
        })
      })
    }
  },
})