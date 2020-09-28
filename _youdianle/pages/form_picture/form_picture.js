const app = getApp();
var upload = require("../../utils/upload.js");
var util = require("../../utils/util.js");
Page({
  data: {
    isagree: true,
    hiddenmodalput: true,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    group: 0,
    title: '',
    index: null,
    url4: [],
    penname: '',
    picker4: ['篮球', '足球', '排球', '羽毛球', '乒乓球', '其他'],
    multiIndex: [0, 0, 0],
    time: '12:01',
    date: '2020.4.25 16:00',
    date2: '2020.8.25 16:00',
    region: ['浙江省', '杭州市', '浙江大学'],
    place: ['浙江大学篮球场'],
    imgList: [],
    photo: [],
    modalName: null,
    textareaAValue: '',
    textareaBValue: ''
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
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  gettitle(e) {
    this.setData({
      title: e.detail.value
    })
  },
  getpenname(e) {
    this.setData({
      penname: e.detail.value
    })
  },
  onLoad: function (options) {
    var that = this
    let url2 = app.globalData.URL + '/appuser/getPubPerm'

    let url = app.globalData.URL + '/appuser/getActPubPerm'
    util.gets(url, {
      actid: options.actid
    }).then(function (res) {
      console.log('权限检验', res.data.code)
      if (res.data.code) {
        wx.showToast({
          title: res.data.msg,
          duration: 2000,
          icon: 'none',
          success: function () {
            setTimeout(function () {
              wx.navigateBack({
                delta: 1,
              })
            }, 1000);
          }
        })
      }
    })


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
      } else if (res.data.code==135) {
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
    this.setData({
      actid: options.actid
    })

  },
  ChooseImage(e) {
    var that = this
    var t = e.currentTarget.dataset.id
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
          upload.uploadFile(this.data.imgList[this.data.imgList.length - 1], 'photo', that)
          this.setData({
            loadModal: true
          })
      }
    });
  },
  ViewImage(e) {
    var t = e.currentTarget.dataset.id
      wx.previewImage({
        urls: this.data.imgList,
        current: e.currentTarget.dataset.url
      });
  },
  DelImg(e) {
    var t = e.currentTarget.dataset.id
      wx.showModal({
        title: '确定',
        content: '确定要删除这张照片？',
        cancelText: '取消',
        confirmText: '确认删除',
        success: res => {
          if (res.confirm ) {
            this.data.photo.splice(e.currentTarget.dataset.index, 1);
            this.setData({
              photo: this.data.photo
            })
            this.data.imgList.splice(e.currentTarget.dataset.index, 1);
            this.setData({
              imgList: this.data.imgList
            })
          }
        }
      })
  },
  getname(e) {
    var t='photo['+e.currentTarget.dataset.index+'].notes'
    // console.log(t)
    this.setData({
      [t]: e.detail.value
    })
  },
  gettitle(e){
      this.setData({
        title:e.detail.value
      })
  },
  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },
  toForm_modify: function (e) {
    wx.navigateTo({
      url: "../../pages/form_modify/form_modify"
    })
  },
  firstcommit() {
    var that = this
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
    var user = wx.getStorageSync('userInfo')
    let url = app.globalData.URL + '/photo/updateActPhoto';
    var data = this.data
    var data = {
      id: '',
      actid: this.data.actid,
      title: this.data.title,
      author: user.id,
      authorAlias: this.data.penname,
      authorHead: user.head,
      content: this.data.textareaAInput,
      univ: wx.getStorageSync('school').code,
      province: wx.getStorageSync('province').code,
      city: wx.getStorageSync('city').code,

      status: 10,
      creater: user.id,
      listPhoto: this.data.photo
    }
    util.post_token(url, data).then(function (res) {
      console.log(res.data)
      if (res.data.code == 0) {
        wx.showToast({
          title: '提交成功',
          duration: 2000,
          success: function () {
            setTimeout(function () {
              // wx.reLaunch({
              //   url: '/pages/index/index',
              // })
              wx.navigateBack({
                delta: 1
              })
            }, 2000);
          }
        })
      } else {
        wx.showToast({
          title:res.data.msg,
          image: '/img/fail.png',
          duration: 2000
        })
      }
    }).catch(function (res) {
      console.log(res)
      wx.showToast({
        title: res.data.msg,
        duration: 2000
      })
    })
    this.setData({
      modalName: e.currentTarget.dataset.target,
      hiddenmodalput:true
    })
  },
  addicon: function (e) {
    var t = this.data.group
    console.log(t)
    t++
    this.setData({
      group: t
    })
  }
})