const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    index: 0,
    index2: 0,
    actname: '',
    slogan:'',
    place:'',
    univid:'',
    province:'',
    city:'',
    address:'',
    venue:'',
    creater:'',
    createralias:'',
    ischecked:false,
    ischecked2: true,
    provinceList:[],
    city:[],
    entrylimit:50,
    ActList:[],
    picker: ['个人报名', '团体报名'],
    picker2: ['篮球', '足球', '羽毛球', '乒乓球', '网球'],
    multiIndex: [0, 0, 0],
    time: '12:01',
    fromtime: '2020.4.25 16:00',
    signupdeadline: '2020.8.25 16:00',
    region: ['浙江省', '杭州市', '浙江大学'],
  },

  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    });
    console.log(this.data.picker2[this.data.index])
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
      fromtime: e.detail.value
    })
  },
  DateChange2(e) {
    this.setData({
      signupdeadline: e.detail.value
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
    this.setData({
      actname: e.detail.value
    })
  },
  getslogan(e){
    this.setData({
      slogan: e.detail.value
    })
  },
  getvenue(e){
    this.setData({
      venue: e.detail.value
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
    console.log(e)
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
    let name = this.data.picker2[this.data.index]
    console.log(name)
    wx.navigateTo({
    url: '../../pages/form_activity/form_activity'
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