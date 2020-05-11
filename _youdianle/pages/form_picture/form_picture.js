const app = getApp();
var upload = require("../../utils/upload.js");
var util = require("../../utils/util.js");
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    group: 0,
    title: '',
    index: null,
    url4: [],
    penname: '',
    picker: ['个人报名', '团体报名'],
    picker2: ['匿名参赛', '实名参赛'],
    picker3: ['观看无需报名', '匿名报名观看', '实名报名观看'],
    picker4: ['篮球', '足球', '排球', '羽毛球', '乒乓球', '其他'],
    multiIndex: [0, 0, 0],
    time: '12:01',
    date: '2020.4.25 16:00',
    date2: '2020.8.25 16:00',
    region: ['浙江省', '杭州市', '浙江大学'],
    place: ['浙江大学篮球场'],
    imgList: [],
    imgList2: [],
    imgList3: [],
    imgList4: [],
    imgList5: [],
    modalName: null,
    textareaAValue: '',
    textareaBValue: ''
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

  },
  ChooseImage(e) {
    var that = this
    var t = e.currentTarget.dataset.id
    wx.chooseImage({
      count: 4, //默认9
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
          upload.uploadFile(this.data.imgList[this.data.imgList.length - 1], 'rot', that)
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
      textareaAValue: e.detail.value
    })
  },
  toForm_modify: function(e) {
    wx.navigateTo({
      url: "../../pages/form_modify/form_modify"
    })
  },
  commit: function(e) {
    var user = wx.getStorageSync('userInfo')
    let url = app.globalData.URL + '/photo/updateActPhoto';
    var data = this.data
    var data = {
      id:'',
      actid:this.data.actid,
      title:this.data.title,
      author:user.nickname,
      authorAlias:this.data.penname,
      authorHead: user.head,
      content:this.data.textareaAInput,
      status:10,
      creater:user.id,
      listPhoto:[]
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
  addicon: function(e) {
    var t = this.data.group
    console.log(t)
    t++
    this.setData({
      group: t
    })
  }
})