const util = require("../../utils/util.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    provinceList: [],
    city: [],
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: '00333',
    VerticalNavTop: 0,
    options: 1,
    AllActivity: [],
    list: [],
    load: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  province() {
    let url = app.globalData.URL + '/config/getProvince';
    let data = '';
    app.wxRequest('GET', url, data, (res) => {
      // console.log(res.data)
      let tmp = res.data
      let obj = {}
      obj.code = '00000'
      obj.name = '不选'
      tmp.unshift(obj)
      this.setData({
        provinceList: tmp
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  city(code) {
    let url = app.globalData.URL + '/config/getCity';
    let data = {
      pid: code
    };
    app.wxRequest('GET', url, data, (res) => {
      // console.log(res.data)
      let tmp = res.data
      let obj = {}
      obj.code = '0000000'
      obj.name = '不选'
      tmp.unshift(obj)
      this.setData({
        city: tmp
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  city_initial() {
    let url = app.globalData.URL + '/config/getCity';
    let data = {
      pid: '00333'
    };
    app.wxRequest('GET', url, data, (res) => {
      // console.log(res.data)
      let tmp = res.data
      let obj = {}
      obj.code = '0000000'
      obj.name = '不选'
      tmp.unshift(obj)
      this.setData({
        city: tmp
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  onLoad(options) {
    this.city_initial();
    this.province();
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    let list = [{}];
    for (let i = 0; i < 26; i++) {
      list[i] = {};
      list[i].name = String.fromCharCode(65 + i);
      list[i].id = i;
    }
    this.setData({
      list: list,
      listCur: list[0]
    })
  },
  onReady() {
    wx.hideLoading()
  },
  toschoool(e) {
    // console.log(e.currentTarget.dataset.index)
    if (e.currentTarget.dataset.id == "0000000") {
      console.log('not choose city')
      wx.removeStorageSync('city')
      wx.removeStorageSync('school')
      var t = {
        code: '',
        name: ''
      }
      t.name = this.data.provinceList[this.data.TabCur].name
      t.code = this.data.MainCur
      wx.setStorageSync('province', t)
      var mode = wx.getStorageSync('addressMode')
      if (mode == "1") {
        wx.switchTab({
          url: '/pages/index/index',
        })
      } 
      else if(mode=="2"){
        wx.navigateTo({
          url: '/pages/form_video/form_video',
        })   
      }
      else {
        wx.navigateBack({
          delta:1
        })
      }
    } else {
      var t = {
        code: '',
        name: ''
      }
      t.name = this.data.provinceList[this.data.TabCur].name
      t.code = this.data.MainCur
      wx.setStorageSync('province', t)
      var t2 = {
        code: '',
        name: ''
      }
      t2.name = this.data.city[e.currentTarget.dataset.index].name
      t2.code = e.currentTarget.dataset.id
      wx.setStorageSync('city', t2)
      wx.navigateTo({
        url: '/pages/form_school/form_school?id=' + e.currentTarget.dataset.id,
      })
    }
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.index,
      MainCur: e.currentTarget.dataset.id,
      // VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
    let t = e.currentTarget.dataset.id
    if (t == '00000') {
      console.log('not choose provice')
      var mode = wx.getStorageSync('addressMode')
      wx.removeStorageSync('province')
      wx.removeStorageSync('city')
      wx.removeStorageSync('school')
      if (mode == "1") {
        wx.switchTab({
          url: '/pages/index/index',
        })
      } 
      else if(mode=="2"){
        wx.navigateTo({
          url: '/pages/form_video/form_video',
        })   
      }
      else {
        wx.navigateBack({
          delta:1
        })
      }
    }
     else{
      this.city(e.currentTarget.dataset.id)
     }
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.city;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].code);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  }
})