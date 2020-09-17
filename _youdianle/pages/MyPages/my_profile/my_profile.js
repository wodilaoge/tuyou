const app = getApp()
var util = require("../../../utils/util.js");
var upload = require("../../../utils/upload.js");

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    userInfoAll: [],
    userinfo: [],
    other: 0,
    index: null,
    name: '',
    index3: 0,
    picker: ['男', '女'],
    picker2: ['匿名参赛', '实名参赛'],
    picker3: ['身份证'],
    picker4: ['篮球', '足球', '排球', '羽毛球', '乒乓球', '其他'],
    multiIndex: [0, 0, 0],
    time: '12:01',
    date: '2000.1.1',
    date2: '2020.8.25',
    region: ['浙江省', '杭州市', '浙江大学'],
    place: ['浙江大学篮球场'],
    imgList: [],
    provinceList: [],
    citys: [],
    school: [],
    indexp: 30, //省
    indexc: 0, //市
    indexs: 0, //学校
    modalName: null,
    textareaAValue: '',
    textareaBValue: ''
  },
  getnick(e) {
    let t = 'userinfo.nickname'
    this.setData({
      [t]: e.detail.value
    })
  },
  getname(e) {
    let t = 'userinfo.name'
    this.setData({
      [t]: e.detail.value
    })
  },
  getphone(e) {
    let t = 'userinfo.mobile'
    this.setData({
      [t]: e.detail.value
    })
  },
  getidno(e) {
    let t = 'userinfo.idno'
    this.setData({
      [t]: e.detail.value
    })
  },
  PickerChange(e) {
    console.log(e);
    let t = 'userinfo.sex'
    this.setData({
      [t]: e.detail.value
    })
  },

  PickerChange2(e) {
    console.log(e);
    let t = 'userinfo.defaultTeam'
    this.setData({
      [t]: e.detail.value
    })
  },
  PickerChange3(e) {
    console.log(e);
    let t = 'userinfo.idtype'
    this.setData({
      [t]: e.detail.value,
      index3: e.detail.value
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
  getphone(e) {
    let t = 'userinfo.mobile'
    this.setData({
      [t]: e.detail.value
    })
  },
  getemail(e) {
    let t = 'userinfo.email'
    this.setData({
      [t]: e.detail.value
    })
  },
  DateChange(e) {
    let t = 'userinfo.birthday'
    this.setData({
      [t]: e.detail.value
    })
  },
  DateChange2(e) {
    let t = 'userinfo.enrolyear'
    this.setData({
      [t]: e.detail.value
    })
  },
  DateChange3(e) {
    let t = 'userinfo.graduateyear'
    this.setData({
      [t]: e.detail.value
    })
  },
  getunivshort(e) {
    let t = 'userinfo.univshort'
    this.setData({
      [t]: e.detail.value
    })
  },
  getmajor(e) {
    let t = 'userinfo.major'
    this.setData({
      [t]: e.detail.value
    })
  },
  getnationality(e) {
    let t = 'userinfo.nationality'
    this.setData({
      [t]: e.detail.value
    })
  },
  getstudentno(e) {
    let t = 'userinfo.studentno'
    this.setData({
      [t]: e.detail.value
    })
  },
  getheight(e) {
    let t = 'userinfo.height'
    this.setData({
      [t]: e.detail.value
    })
  },
  getweight(e) {
    let t = 'userinfo.weight'
    this.setData({
      [t]: e.detail.value
    })
  },
  getactrole(e) {
    let t = 'userinfo.actrole'
    this.setData({
      [t]: e.detail.value
    })
  },
  getdefaultTeam(e) {
    let t = 'userinfo.defaultTeam'
    this.setData({
      [t]: e.detail.value
    })
  },
  getdefaultRole(e) {
    let t = 'userinfo.defaultRole'
    this.setData({
      [t]: e.detail.value
    })
  },
  getspeciality(e) {
    let t = 'userinfo.speciality'
    this.setData({
      [t]: e.detail.value
    })
  },
  getslogan(e) {
    let t = 'userinfo.slogan'
    this.setData({
      [t]: e.detail.value
    })
  },
  getworkunit(e) {
    let t = 'userinfo.workunit'
    this.setData({
      [t]: e.detail.value
    })
  },
  getenrolyear(e) {
    let t = 'userinfo.enrolyear'
    this.setData({
      [t]: e.detail.value
    })
  },
  getgraduateyear(e) {
    let t = 'userinfo.graduateyear'
    this.setData({
      [t]: e.detail.value
    })
  },
  RegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },

  PickerPro(e) {
    let t = 'userinfo.province'
    this.setData({
      indexp: e.detail.value,
      indexc: 0,
      indexs: 0,
      [t]: this.data.provinceList[this.data.indexp].code
    })
    this.city(this.data.userinfo.province)
  },
  PickerCity(e) {
    let t = 'userinfo.city'
    this.setData({
      indexc: e.detail.value,
      indexs: 0
    })
    this.setData({
      [t]: this.data.citys[this.data.indexc].code
    })
    this.school(this.data.userinfo.city)
  },
  PickerSchool(e) {
    let t = 'userinfo.univ'
    this.setData({
      indexs: e.detail.value,
      [t]: this.data.school[this.data.indexs].code
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
  ChooseImage() {
    var that = this
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        let t = 'userinfo.head'
        this.setData({
          imgList: res.tempFilePaths,
          [t]: res.tempFilePaths[0]
        })
        upload.uploadFile(this.data.imgList[this.data.imgList.length - 1], 'other', that)
      }
    });
  },
  tophone(e) {
    wx.navigateTo({
      url: '/pages/MyPages/my_security/my_security',
    })
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '召唤师',
      content: '确定要删除这段回忆吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
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

  cancel: function (e) {

  },
  commit: function (e) {
    var that = this
    let url = app.globalData.URL + '/appuser/updateMyInfo';
    var tmp = this.data.userinfo
    if (!tmp.nickname) {
      wx.showToast({
        title: '请填写昵称',
        duration: 2000,
        icon: 'none'
      });
      return false;
    }

    //邮箱验证
    if(!tmp.email)
    {
      wx.showToast({
        title: '请输入邮箱',
        duration: 2000,
        icon: 'none'
      });
      return false;
    }
    if (!(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(tmp.email))) {
      wx.showToast({
        title: 'Email输入格式不规范',
        duration: 2000,
        icon: 'none'
      });
      return
    }
    var data = {
      id: wx.getStorageSync('userInfo').id,
      head: that.data.other == 0 ? tmp.head : that.data.other,
      nickname: tmp.nickname,
      name: tmp.name,
      sex: tmp.sex,
      mobile: tmp.mobile,
      email: tmp.email,
      idtype: tmp.idtype,
      idno: tmp.idno,
      birthday: tmp.birthday,
      nationality: tmp.nationality,
      province: tmp.province,
      city: tmp.city,
      univ: tmp.univ,
      univname: tmp.univshort,
      univshort: tmp.univshort,
      major: tmp.major,
      studentno: tmp.studentno,
      enrolyear: tmp.enrolyear,
      graduateyear: tmp.graduateyear,
      height: tmp.height,
      weight: tmp.weight,
      defaultTeam: tmp.defaultTeam,
      defaultRole: tmp.defaultRole,
      speciality: tmp.speciality,
      slogan: tmp.slogan,
      workunit: tmp.workunit
    }
    util.post_token(url, data).then(function (res) {
      console.log(res.data)
      if (res.data.code == 0) {
        var obj = wx.getStorageSync('userInfo')
        obj.nickname = that.data.userinfo.nickname
        obj.head = that.data.other == 0 ? tmp.head : that.data.other
        wx.setStorageSync('userInfo', obj)
        wx.showToast({
          title: '修改成功',
          duration: 2000,
          success: function () {
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 1000);
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
  },
  onLoad: function () {
    this.province();
    var that = this;
    let url = app.globalData.URL + '/appuser/findUserByID';
    this.setData({
      userInfoAll: wx.getStorageSync('userInfo')
    })
    let data = {
      'id': wx.getStorageSync('userInfo').id
    }
    console.log(data)
    util.gets(url, data).then(function (res) {
      that.setData({
        userinfo: res.data.data
      })
    })
  }
})