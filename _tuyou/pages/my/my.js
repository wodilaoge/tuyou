const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    index: null,
    name: '',
    picker: ['男', '女'],
    picker2: ['匿名参赛', '实名参赛'],
    picker3: ['观看无需报名', '匿名报名观看', '实名报名观看'],
    picker4: ['篮球', '足球', '排球', '羽毛球', '乒乓球', '其他'],
    multiIndex: [0, 0, 0],
    time: '12:01',
    date: '2000.1.1',
    date2: '2020.8.25',
    region: ['浙江省', '杭州市', '浙江大学'],
    place: ['浙江大学篮球场'],
    imgList: [],
    modalName: null,
    textareaAValue: '',
    textareaBValue: '',
    userInfoAll:[]
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
  onLoad: function () {
    this.setData({
      userInfoAll: wx.getStorageSync('userInfo')
    })
  },
  getUserInfo(e){
    this.setData({
      userInfoAll:e.detail.userInfo
    })
    wx.setStorage({ //将活动信息存入缓存
      key: "userInfo",
      data: this.data.userInfoAll
    });
  }
})