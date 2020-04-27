const app = getApp();
var util = require("../../utils/util.js");
var upload = require("../../utils/upload.js");

Page({
  data: {
    group: 0,
    index: null,
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
    univid: '003330106',
    province: '00333',
    city: '0033301',
    indexp: 30, //省
    indexc: 0, //市
    indexs: 0, //学校
    provinceList: [],
    citys: [],
    school: [],
    picker4: ['篮球', '足球', '羽毛球', '乒乓球', '网球'],
    imgList: [],
    modalName: null,
    other: []
  },
  PickerPro(e) {
    let t = 'province'
    this.setData({
      indexp: e.detail.value,
      indexc: 0,
      indexs: 0,
      [t]: this.data.provinceList[this.data.indexp].code
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
      [t]: this.data.citys[this.data.indexc].code
    })
    this.school(this.data.city)
  },
  PickerSchool(e) {
    let t = 'univid'
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
  RegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  getsuperior(e) {
    this.setData({
      superior: e.detail.value
    })
  },
  getname(e) {
    this.setData({
      name: e.detail.value
    })
  },
  getcaptain(e) {
    this.setData({
      captain: e.detail.value
    })
  },
  getphone(e) {
    this.setData({
      linktel: e.detail.value
    })
  },
  gettdslogan(e) {
    this.setData({
      tdslogan: e.detail.value
    })
  },
  getemail(e) {
    this.setData({
      email: e.detail.value
    })
  },
  getweb(e) {
    this.setData({
      website: e.detail.value
    })
  },
  getwx(e) {
    this.setData({
      wcoa: e.detail.value
    })
  },
  num(e) {
    this.setData({
      number: e.detail.value
    })
  },
  ChooseImage(e) {
    var that = this;
    wx.chooseImage({
      count: 4, //默认9
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
              imgList: this.data.imgList
            })
          }
        }
      })
    }
  },
  textareaAInput(e) {
    this.setData({
      article: e.detail.value
    })
  },
  toForm_modify: function(e) {
    wx.navigateTo({
      url: "../../pages/form_modify/form_modify"
    })
  },
  commit: function(e) {
    var user = wx.getStorageSync('userInfo')
    let url = app.globalData.URL + '/team/updateTeam';
    var data = this.data
    var data = {
      id: '',
      sid: "076003",
      acid1: "076002001",
      team: data.name,
      summary: data.article,
      logo: data.other[0],
      linktel: data.linktel,
      slogan: data.tdslogan,
      province: data.province,
      city: data.city,
      univ: data.univid,
      superior: data.superior,
      rssort: data.number,
      email: data.email,
      website: data.website,
      wcoa: data.wcoa,
      creater: user.id
    }
    util.post_token(url, data).then(function(res) {
      console.log(res.data)
      if (res.data.code == 0) {
        wx.showToast({ 
          title: '提交成功',
           duration: 2000,
           success: function() { 
            setTimeout(function() { 
              wx.reLaunch({
                url: '/pages/index/index',
              }) 
            }, 2000); 
          }
        })
      } else {
        wx.showToast({
          title: '提交失败!',
          image: '/img/fail.png',
          icon: 'success',
          duration: 2000
        })
      }
    }).catch(function(res) {
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
    this.setData({
      number: this.data.number + 1
    });
  },
  nextNum() {
    this.setData({
      number: this.data.number - 1
    });
  },
  onLoad() {
    this.province();
  },
})