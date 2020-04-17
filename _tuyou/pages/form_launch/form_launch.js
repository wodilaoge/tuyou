const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    information:{
      activity:'',
      actname: '',
      slogan: '',
      univid: '003330106',
      province: '00333',
      city: '0033301',
      venue: '',
      fromtime: '2020.4.25 16:00',
      signupdeadline: '2020.8.25 16:00',
      way:'',
      entrylimit: 50,
      ischecked: false,
    },
    index: 0,
    index2: 0,
    place:'',
    address:'',
    creater:'',
    createralias:'',
    ischecked2: true,
    provinceList:[],
    city:[],
    ActList:[],
    picker: ['个人报名', '团体报名'],
    picker2: ['篮球', '足球', '羽毛球', '乒乓球', '网球'],
    multiIndex: [0, 0, 0],
    time: '12:01',
    region: ['浙江省', '杭州市', '浙江大学'],
  },

  PickerChange(e) {//报名方式
    let t='information.way'
    this.setData({
      index2:e.detail.value
    })
    let v = this.data.picker[this.data.index2]
    this.setData({
      [t]:v
    });
  },
  PickerChange2(e) {//活动方式
    let t = 'information.activity'
    this.setData({
      index: e.detail.value
    })
    let v = this.data.picker2[this.data.index2]
    this.setData({
      [t]: v
    });
    // console.log(this.data.picker2[this.data.index])
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
    let t ='information.fromtime'
    this.setData({
      [t]: e.detail.value
    })
  },
  DateChange2(e) {
    let t = 'information.signupdeadline'
    this.setData({
      [t]: e.detail.value
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
    let t='information.actname'
    this.setData({
    [t]:e.detail.value
    })
  },
  getslogan(e){
    let t ='information.slogan'
    this.setData({
      [t]: e.detail.value
    })
  },
  getvenue(e){
    let t ='information.venue'
    this.setData({
      [t]: e.detail.value
    })
  },
  getentity(e){
    this.setData({
      entrylimit: e.detail.value
    })
  },
  changeswitch(e){    
    this.setData({
      ischecked: !this.data.ischecked
    })
  },
  checked(e){
    this.setData({
      ischecked2: !this.data.ischecked2
    })
  },
  cancel: function (e) {
    wx.navigateTo({
      url: "../../pages/form/form"
    })
  },

  commit: function (e) {
    wx.setStorage({//将活动信息存入缓存
      key: "information",data: this.data.information
    });
    wx.navigateTo({
    url: '../../pages/form_activity/form_activity'
    })
  },
  
  city() {
    let url = app.globalData.URL + '/config/getCity';
    let data = {
      pid: '00301'
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