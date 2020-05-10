const util = require("../../utils/util.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    province:'',
    city:'',
    school:[]

  },
  choose(e){
    console.log(e.currentTarget.dataset.id)
    var t={
      code:'',
      name:''
    }
    t.code = e.currentTarget.dataset.id
    t.name = this.data.school[e.currentTarget.dataset.index].name
    wx.setStorageSync('school', t)
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.school(options.id)
    var pro=wx.getStorageSync('province')
    var cit=wx.getStorageSync('city')
    this.setData({
      province:pro.name,
      city:cit.name
    })
  },
  school(pid) {
    let url = app.globalData.URL + '/config/getUniv';
    let data = {
      cid: pid
    };
    app.wxRequest('GET', url, data, (res) => {
      this.setData({
        school: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  }
})