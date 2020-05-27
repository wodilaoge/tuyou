const app = getApp();
var util = require("../../utils/util.js");
Page({
  data: {
    hiddenmodalput:true,
    information: {
      actname: '',
      sid: '',
      acid1: '',
      acid2: '',
      cid: '',
      slogan: '',
      univid: '',
      province: '',
      city: '',
      venue: '',
      timenow: '',
      signupdeadline: '',
      way: 0,
      entrylimit: 100,
      ischecked: false,
    },
    time1: '7:00',
    time2: '18:00',
    index2: 0,
    timenow: '',
    timenow2: '',
    isaddress: false,
    index: 0, //活动方式
    indexbig: 0,
    indextiny: 0,
    indexp: 30, //省
    indexc: 0, //市
    indexs: 0, //学校
    createralias: '',
    ischecked2: true,
    provinceList: [],
    citys: [],
    school: [],
    picker: ['个人报名', '团体报名', '个人团队均可报名'],
    pickertiny: [],
    pickerbig: [],
    picker2: ['篮球', '足球', '羽毛球', '乒乓球', '网球'],
    multiIndex: [0, 0, 0],
    region: ['浙江省', '杭州市', '浙江大学'],
    pro: '',
    city: '',
    schoolinfo: '',
    tinyshow: '选择活动小类'
  },

  PickerChange(e) { //报名方式
    let t = 'information.way'
    this.setData({
      [t]: e.detail.value,
      index2: e.detail.value
    })
  },
  PickerChange2(e) { //活动大类
    let t = 'information.acid1'
    this.setData({
      index: e.detail.value
    })
    let v = this.data.picker2[this.data.index].code
    this.setData({
      [t]: v
    });
    this.getthird(this.data.information.acid1)
  },
  PickerChangebig(e) { //活动板块
    let t = 'information.sid'
    this.setData({
      indexbig: e.detail.value
    })
    let v = this.data.pickerbig[this.data.indexbig].code
    this.setData({
      [t]: v
    });
    this.gettwo(this.data.information.sid)
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
    let t = 'information.province'
    this.setData({
      indexp: e.detail.value,
      indexc: 0,
      indexs: 0,
      [t]: this.data.provinceList[this.data.indexp].code
    })
    this.city(this.data.information.province)
  },
  PickerCity(e) {
    let t = 'information.city'
    this.setData({
      indexc: e.detail.value,
      indexs: 0
    })
    this.setData({
      [t]: this.data.citys[this.data.indexc].code
    })
    this.school(this.data.information.city)
  },
  PickerSchool(e) {
    let t = 'information.univid'
    this.setData({
      indexs: e.detail.value,
      [t]: this.data.school[this.data.indexs].code
    })
  },
  MultiChange(e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  TimeChange(e) {
    this.setData({
      time1: e.detail.value
    })
  },
  TimeChange2(e) {
    this.setData({
      time2: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      timenow: e.detail.value
    })
  },
  DateChange2(e) {
    // let t = 'information.signupdeadline'
    // this.setData({
    //   [t]: e.detail.value
    // })
    this.setData({
      timenow2: e.detail.value
    })
  },
  RegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
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
  getname(e) {
    let t = 'information.actname'
    this.setData({
      [t]: e.detail.value
    })
  },
  getslogan(e) {
    let t = 'information.slogan'
    this.setData({
      [t]: e.detail.value
    })
  },
  getvenue(e) {
    let t = 'information.venue'
    this.setData({
      [t]: e.detail.value
    })
  },
  getentity(e) {
    this.setData({
      entrylimit: e.detail.value
    })
  },

  checked(e) {
    this.setData({
      ischecked2: !this.data.ischecked2
    })
  },
  cancel: function (e) {
    wx.switchTab({
      url: "/pages/form/form"
    })
  },

  commit: function (e) {

    let t = 'information.timenow'
    let t2 = 'information.signupdeadline'
    this.setData({
      [t]: this.data.timenow + ' ' + this.data.time1,
      [t2]: this.data.timenow2 + ' ' + this.data.time2
    })

    wx.setStorage({ //将活动信息存入缓存
      key: "information",
      data: this.data.information
    });
    wx.navigateTo({
      url: '../../pages/form_activity/form_activity'
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
  gettwo(code) {
    var that = this
    let url = app.globalData.URL + '/config/getActivityClass1';
    let data = {
      'sid': code
    };
    util.gets(url, data).then(function (res) {
      that.setData({
        picker2: res.data.data
      })
    })
  },
  getthird(code) {
    var that = this
    let url = app.globalData.URL + '/config/getActivityClass2';
    let data = {
      'cid': code
    };
    util.gets(url, data).then(function (res) {
      that.setData({
        pickertiny: res.data.data
      })
      console.log(res.data)
      if (!res.data.data.length) {
        that.setData({
          tinyshow: "无"
        })
      }
    })
  },
  tochooseadress(e) {
    wx.setStorageSync('addressMode', '3')
    wx.navigateTo({
      url: '/pages/form_address/form_address',
    })
  },
  onShow: function (options) {
    var that = this
    let t1 = 'information.province'
    let t2 = 'information.city'
    let t3 = 'information.univid'
    let pro = wx.getStorageSync('province')
    let city = wx.getStorageSync('city')
    let schoolinfo = wx.getStorageSync('school')
    if (schoolinfo) {
      this.setData({
        pro: pro,
        city: city,
        schoolinfo: schoolinfo,
        [t1]: pro.code,
        [t2]: city.code,
        [t3]: schoolinfo.code,
        isaddress: true
      })
    }
  },
  onLoad() {
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    // console.log("当前时间戳为：" + timestamp);
    var n = timestamp * 1000;
    var date = new Date(n);
    //年  
    var Y = date.getFullYear();
    //月  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日  
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    //时  
    // var h = date.getHours();
    // //分  
    // var m = date.getMinutes();
    // //秒  
    // var s = date.getSeconds();
    // console.log("当前时间：" + Y + M + D + h + ":" + m + ":" + s)
    var nowtime = Y + '-' + M + '-' + D
    this.setData({
      timenow: nowtime,
      timenow2: nowtime,
    })
    // 获取用户信息
    var that = this
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          let url2 = app.globalData.URL + '/appuser/getPubPerm'
          util.gets(url2, {}).then(function (res) {
            console.log('auth', res)
            that.setData({
              auth: res.data
            })
            if (res.data.code) {
              wx.showToast({
                title: '请先绑定手机！',
                duration: 2000,
                success: function () {
                  setTimeout(function () {
                    wx.navigateTo({
                      url: '/pages/MyPages/my_security/my_security',
                    })
                  }, 2000);
                }
              })
            }
          })
          console.log('wx auth finished')
        } else {
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
        }
      }
    })

    this.province();
    var that = this
    let t1 = 'information.province'
    let t2 = 'information.city'
    let t3 = 'information.univid'
    let pro = wx.getStorageSync('province')
    let city = wx.getStorageSync('city')
    let schoolinfo = wx.getStorageSync('school')
    if (schoolinfo) {
      this.setData({
        pro: pro,
        city: city,
        schoolinfo: schoolinfo,
        [t1]: pro.code,
        [t2]: city.code,
        [t3]: schoolinfo.code,
        isaddress: true
      })
    }
    let url = app.globalData.URL + '/config/getActivitySection';
    util.gets(url, {}).then(function (res) {
      that.setData({
        pickerbig: res.data.data
      })
    })
  },
  prevNum() {
    let t = "information.entrylimit"
    this.setData({
      [t]: this.data.information.entrylimit + 1
    });
  },
  nextNum() {
    let t = "information.entrylimit"
    this.setData({
      [t]: this.data.information.entrylimit - 1
    });
  },
  num(e) {
    let t = "information.entrylimit"
    this.setData({
      [t]: e.detail.value
    })
  },

  commit2(e){
    console.log('confirm')
    let t = 'information.timenow'
    let t2 = 'information.signupdeadline'
    this.setData({
      [t]: this.data.timenow + ' ' + this.data.time1,
      [t2]: this.data.timenow2 + ' ' + this.data.time2
    })
    var user = wx.getStorageSync('userInfo')
    user = 'Bearer ' + user.token;
    var urls = app.globalData.URL + '/act/pubActivity';
    var tmp = this.data.information
    wx.request({
      url: urls,
      method: "POST",
      data: {
        id: '',
        actname: tmp.actname,
        sid: tmp.sid,
        acid1: tmp.acid1,
        acid2: tmp.acid2,
        logo: null,
        rotations: null,
        groups: null,
        fromtime: tmp.timenow,
        totime: null,
        signupdeadline: tmp.signupdeadline,
        signupmax: tmp.entrylimit,
        audiencemax: null,
        slogan: tmp.slogan,
        entrylimit: null,
        audiencelimit: null,
        rule: null,
        rulepic: null,
        award: null,
        awardpic: null,
        sponsor: null,
        sponsorpic: null,
        signupway: (parseInt(tmp.way) + 1) * 10,
        chatid: null,
        univid: tmp.univid,
        province: tmp.province,
        city: tmp.city,
        address: tmp.venue,
        venue: tmp.venue,
        creater: user.id,
        createralias: user.nickname,
        createrhead: user.head,
        status: 10,
      },
      header: {
        "Content-Type": "application/json",
        'Authorization': user
      },
      success: function (res) {
        console.log(res.data);
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
      },
    })
    // this.setData({
    //   modalName: e.currentTarget.dataset.target
    // })
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
})