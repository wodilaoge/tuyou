const app = getApp();
const VodUploader = require('../../utils/vod-wx-sdk-v2.js');
var upload = require("../../utils/upload.js");
var util = require("../../utils/util.js");
Page({
  data: {
    isagree: true,
    hiddenmodalput: true,
    group: 0,
    videonum: 0,
    picker4: ['篮球', '足球', '排球', '羽毛球', '乒乓球', '其他'],
    multiIndex: [0, 0, 0],
    fileName: null,
    title: null,
    author: null,
    notes: null,
    video: '',
    videoFile: null,
    coverFile: null,
    imgList: [],
    imgList2: [],
    modalName: null,
    textareaAValue: null,
    textareaBValue: null,
    authurl: null,
    index: 0, //活动方式
    indexbig: 0,
    indextiny: 0,
    pickertiny: [],
    pickerbig: [],
    picker2: [],
    tinyshow: '选择活动小类',
    information: {
      sid: null,
      acid1: null,
      acid2: null,
    },

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
  getname(e) {
    this.setData({
      title: e.detail.value
    })
  },
  toagreepage() {
    wx.navigateTo({
      url: '/pages/webview/webview',
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
  RegionChange: function (e) {
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
    wx.showModal({
      title: '确定',
      content: '确定要删除这段视频？',
      cancelText: '取消',
      confirmText: '确认删除',
      success: res => {
        if (res.confirm) {
          this.setData({
            videonum: 0,
            video: ''
          })
        }
      }
    })
  },
  DelImg2(e) {
    wx.showModal({
      title: '确定',
      content: '确定要删除这张封面图？',
      cancelText: '取消',
      confirmText: '确认删除',
      success: res => {
        if (res.confirm) {
          this.setData({
            imgList2: [],
            other: ''
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
  toForm_modify: function (e) {
    wx.navigateTo({
      url: "../../pages/form_modify/form_modify"
    })
  },

  firstcommit() {
    var that = this
    if (!that.data.information.sid) {
      wx.showToast({
        title: '请选择板块',
        duration: 2000
      })
    } else if (!that.data.information.acid1) {
      wx.showToast({
        title: '请选择大类',
        duration: 2000
      })
    } else if (!that.data.title) {
      wx.showToast({
        title: '请先输入标题',
        duration: 2000
      })
    } else if (!that.data.video) {
      wx.showToast({
        title: '请上传视频',
        duration: 2000
      })
    } else {
      that.setData({
        hiddenmodalput: !this.data.hiddenmodalput
      })
    }

  },
  cancel2: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  commit: function (e) {
    var user = wx.getStorageSync('userInfo')
    let pro = wx.getStorageSync('province')
    let city = wx.getStorageSync('city')
    let school = wx.getStorageSync('school')
    if (!school) {
      wx.setStorageSync('addressMode', '3')
      wx.showToast({
        title: '请先选择学校',
        duration: 2000,
        success: function () {
          setTimeout(function () {
            wx.navigateTo({
              url: '/pages/form_address/form_address',
            })
          }, 2000);
        }
      })
    } else {
      if (this.data.title) {
        let url = app.globalData.URL + '/video/updateActVideo';
        var data = this.data
        let tmp = this.data.videosize
        // console.log(tmp)
        // tmp=tmp.toFixed(1).toString()+'M'
        // console.log(tmp)
        var datas = {
          id: null,
          actid: '',
          sid: this.data.information.sid,
          acid1: this.data.information.acid1,
          acid2: this.data.information.acid2,
          title: this.data.title,
          author: user.id,
          authorAlias: user.nickname,
          authorHead: user.head,
          fileId: this.data.video,
          cover: this.data.other,
          size: this.data.videosize.toFixed(1).toString() + 'M',
          notes: this.data.notes,
          univ: school.code,
          province: pro.code,
          city: city.code,
          status: '10',
          creater: user.id,
          mender: ''
        }
        util.post_token(url, datas).then(function (res) {
          if (!res.data.code) {
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
            console.log(res)
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              image: '/img/fail.png',
              duration: 2000
            })
          }
        }).catch(function (res) {
          console.log(res)
          wx.showToast({
            title: res.data.msg,
            icon: 'fail',
            image: '../../img/fail.png',
            duration: 2000
          })
        })
        this.setData({
          modalName: e.currentTarget.dataset.target
        })
      } else {
        wx.showToast({
          title: '请先输入标题',
          duration: 2000
        })
      }
    }
  },
  isagree(e) {
    console.log('fuck')
    this.setData({
      isagree: !this.data.isagree
    })
  },
  getSignature: function (callback) {
    var user = wx.getStorageSync('userInfo')
    console.log(this.data.authurl)
    user = 'Bearer ' + user.token;
    wx.request({
      url: 'https://api.udianle.com/kt/util/getVodSignatureV2',
      // url: ' http://192.144.169.239:8021/kt/util/getVodSignatureV2',
      dataType: 'json',
      header: {
        'content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': user,
      },
      success: function (res) {
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
  inputChange: function (evt) {
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
      success: function (result) {
        console.log('success');
        console.log(result);
      },
      error: function (result) {
        console.log('error');
        console.log(result);
        wx.showModal({
          title: '上传失败',
          content: JSON.stringify(result),
          showCancel: false
        });
      },
      progress: function (result) {
        console.log('progress');
        console.log(result);
        wx.showLoading({
          title: '上传中 ' + result.percent * 100 + '%',
        });
      },
      finish: function (result) {
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
  chooseCover(e) {
    var t = e.currentTarget.dataset.id
    var that = this
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList2.length != 0) {
          this.setData({
            imgList2: this.data.imgList2.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList2: res.tempFilePaths
          })
        }
        upload.uploadFile(this.data.imgList2[this.data.imgList2.length - 1], 'other', that)
        this.setData({
          loadModal: true
        })
      }
    });
  },
  chooseVideo: function (e) {
    const self = this;
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      compressed: true,
      maxDuration: 60,
      success: function (file) {
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
    let url = app.globalData.URL + '/config/findVideoSize';
    util.gets(url, {}).then(function (res) {
      console.log(res.data)
      let limitVideoSize = res.data.data
      wx.chooseVideo({
        success: (res) => {
          console.log(res.tempFilePath)
          // console.log("视频信息-大小" + res.size)
          // console.log("视频信息-时长" + res.duration)
          if (res.size > 1024 * 1024 * limitVideoSize) {
            wx.showToast({
              title: "视频不能超过" + limitVideoSize + "MB!",
              icon: 'none',
              duration: 1000 * 2,
              mask: true
            })
            return;
          }
          let sizevideo = res.size
          sizevideo = sizevideo / 1024 / 1024
          that.setData({
            videosize: sizevideo,
            imgList: res.tempFilePath,
            videonum: 1
          })
          upload.uploadFile(that.data.imgList, 'video', that)
          that.setData({
            loadModal: true,
          })
        }
      });
    })
  },
  onLoad() {
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
    let url = app.globalData.URL + '/config/findVodParam'
    util.gets(url, {}).then(function (res) {
      console.log('authurl', res.data)
      that.setData({
        authurl: res.data.data.authUrl
      })
    })
    url2 = app.globalData.URL + '/config/getActivitySection';
    util.gets(url2, {}).then(function (res) {
      that.setData({
        pickerbig: res.data.data
      })
      wx.hideLoading()
    })
  }
})