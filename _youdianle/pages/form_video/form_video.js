const app = getApp();
const VodUploader = require('../../utils/vod-wx-sdk-v2.js');
var upload = require("../../utils/upload.js");
var util = require("../../utils/util.js");
Page({
  data: {
    group: 0,
    videonum: 0,
    index: null,
    picker4: ['篮球', '足球', '排球', '羽毛球', '乒乓球', '其他'],
    multiIndex: [0, 0, 0],
    fileName: '',
    title: '',
    author: '',
    notes: '',
    video: '',
    videoFile: null,
    coverFile: null,
    imgList: [],
    modalName: null,
    textareaAValue: '',
    textareaBValue: ''
  },
  getname(e) {
    this.setData({
      title: e.detail.value
    })
  },
  getauthor(e) {
    this.setData({
      author: e.detail.value
    })
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
    wx.showModal({
      title: '确定',
      content: '确定要删除这张照片？',
      cancelText: '取消',
      confirmText: '确认删除',
      success: res => {
        if (res.confirm && t == 1) {
          this.setData({
            videonum: 0,
            video: ''
          })
        }
      }
    })

  },
  textareaAInput(e) {
    this.setData({
      notes: e.detail.value
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
  commit: function(e) {
    var user = wx.getStorageSync('userInfo')
    let pro = wx.getStorageSync('province')
    let city = wx.getStorageSync('city')
    let school = wx.getStorageSync('school')
    let url = app.globalData.URL + '/video/updateActVideo';
    var data = this.data
    var data = {
      id: null,
      actid: '',
      sid: null,
      acid1: null,
      acid2: null,
      title: this.data.title,
      author: user.id,
      authorAlias: user.nickname,
      authorHead: user.head,
      fileId: this.data.video,
      notes: this.data.notes,
      univ:pro.code,
      province:city.code,
      city:school.code,
      status: '10',
      creater: user.id,
      mender: ''
    }
    util.post_token(url, data).then(function(res) {
      if (!res.data.code) {
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
        console.log(res)
        wx.showToast({
          title: '提交失败！',
          icon: 'success',
          image: '/img/fail.png',
          duration: 2000
        })
      }
    }).catch(function(res) {
      console.log(res)
      wx.showToast({
        title: '提交失败！',
        icon: 'fail',
        image: '../../img/fail.png',
        duration: 2000
      })
    })
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  getSignature: function(callback) {
    wx.request({
      url: 'http://192.144.169.239:8080/kt/config/getVodSignatureV2',
      dataType: 'json',
      success: function(res) {
        console.log(`data`, res.data);
        console.log(`data`, res.data.code);
        console.log(`data`, res.data.data);
        if (res.data && res.data.data) {
          console.log(`signature：`, res.data.data.signature)
          // callback(res.data.data.signature);
          callback(res.data.data);
        } else {
          return '获取签名失败';
        }
      }
    });
  },
  inputChange: function(evt) {
    this.setData({
      fileName: evt.detail.value
    })
  },

  startUpload() {
    const self = this;
    VodUploader.start({

      mediaFile: self.data.videoFile, //必填，把chooseVideo回调的参数(file)传进来
      getSignature: self.getSignature, //必填，获取签名的函数

      mediaName: self.data.fileName, //选填，视频名称，强烈推荐填写(如果不填，则默认为“来自微信小程序”)
      coverFile: self.data.coverFile, // 选填，视频封面
      success: function(result) {
        console.log('success');
        console.log(result);
      },
      error: function(result) {
        console.log('error');
        console.log(result);
        wx.showModal({
          title: '上传失败',
          content: JSON.stringify(result),
          showCancel: false
        });
      },
      progress: function(result) {
        console.log('progress');
        console.log(result);
        wx.showLoading({
          title: '上传中 ' + result.percent * 100 + '%',
        });
      },
      finish: function(result) {
        console.log('finish');
        console.log(result);
        wx.hideLoading()
        wx.showModal({
          title: '上传成功',
          // content: 'fileId:' + result.fileId + '\nvideoName:' + result.videoName,
          showCancel: false
        });
        self.setData({
          fileId: result.fileId,
          videonum: 1
        })
      }
    });
  },
  chooseVideo: function(e) {
    const self = this;
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      compressed: true,
      maxDuration: 60,
      success: function(file) {
        self.setData({
          videoFile: file
        })
        console.log(`add videoFile`, file)
        self.startUpload();
      }
    })
  },
  chooseVideo2(e) {
    var that = this
    wx.chooseVideo({
      success: (res) => {
        console.log(res.tempFilePath)
        this.setData({
          imgList: res.tempFilePath,
          videonum: 1
        })
        upload.uploadFile(this.data.imgList, 'video', that)
        this.setData({
          loadModal: true,
        })
      }
    });
  },
  onLoad() {
    var that=this
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
  }
})