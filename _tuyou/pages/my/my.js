const app = getApp();
var util = require("../../utils/util.js");
Page({
  data: {
    index: null,
    name: '',
    userInfoAll: [],
    webinfo:[]
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
  ChooseImage() {
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
      }
    });
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
  onLoad: function() {
    this.setData({
      userInfoAll: wx.getStorageSync('userInfo')
    })
  },
  login(e) {
    var that = this
    this.setData({
      userInfoAll: e.detail.userInfo
    })
    wx.login({
      success: function(res) {
        console.log(res);
        let url = app.globalData.URL + '/auth/wcAnonLogin';
        let data = {
          code:res.code
        };
        util.post(url, data).then(function(res) {
          console.log('id',res)
          that.setData({
            webinfo: res.data
          })
        })
      }
    })
    that.lg()
  },
  lg(){
    wx.getUserInfo({
      success:function(res){
        var userinfo = res.userInfo
        console.log(userinfo);
        wx.setStorage({ //将活动信息存入缓存
          key: "userInfo",
          data: userinfo
        });
      }
    })
  }
})