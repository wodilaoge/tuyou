const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    index: null,
    name: '',
    provinceList:[],
    city:[],
    ActList:[],
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
  name(e) {
    this.setData({
      name: e.detail.value
    })
  },
  cancel: function (e) {
    wx.navigateTo({
      url: "../../pages/form/form"
    })
  },
  commit: function (e) {
    console.log(e.detail.value)
    wx.navigateTo({
    url: "../../pages/form_activity/form_activity"
    })
  },
  city() {
    let url = app.globalData.URL + '/config/getCity';
    let data = {
      pid: '00333'
    };
    app.wxRequest('GET', url, data, (res) => {
      // console.log(res.data)
      this.setData({
        city: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  province() {
    let url = app.globalData.URL + '/config/getProvince';
    let data = '';
    app.wxRequest('GET', url, data, (res) => {
      // console.log(res.data)
      this.setData({
        provinceList: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  onLoad(){
    this.city();
    this.province();
  },
})