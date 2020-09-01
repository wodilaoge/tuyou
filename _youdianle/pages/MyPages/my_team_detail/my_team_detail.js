// pages/tuanduixinxi/tuanduixinxi.js
const app = getApp();
var util = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tdxxId: '',
    tdxxDeatil: [],
    duiyuanID: '123456',
    testData: [],
    duizhangID: '',
    duiyuanid: '',
    duizhangDeatil: [],
    listmemberdeatil: [],
    isCaptain:false
  },



  getXinxi() {
    let url = app.globalData.URL + '/team/findTeam';
    let data = {
      id: this.data.tdxxId
    };
    app.wxRequest('GET', url, data, (res) => {
      console.log(res.data)
      this.setData({
        tdxxDeatil: res.data,
        duizhangID: res.data.lid,
        isCaptain:res.data.lid==wx.getStorageSync('userInfo').id
      })

    }, (err) => {
      console.log(err.errMsg)
    });


  },

  getDuizhang() {
    let url = app.globalData.URL + '/appuser/findUserByID';
    let data = {
      id: this.data.duizhangID,

    };
    app.wxRequest('GET', url, data, (res) => {
      console.log(res.data)
      this.setData({
        duizhangDeatil: res.data,
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },

  navziliao: function (e) {
    console.log(e)
    this.setData({
      duiyuanid: this.data.listmemberdeatil[0].uid
    })
    wx.navigateTo({
      url: '/pages/ziliao/ziliao?id=' + this.data.duiyuanid
    })

  },

  getListMember: function () {
    let url = app.globalData.URL + '/team/listMember';
    let data = {
      id: this.data.tdxxId
    };
    app.wxRequest('GET', url, data, (res) => {
      console.log(res.data)
      this.setData({
        listmemberdeatil: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  tojoin(){
    var that=this
    //加入小组
    var url = app.globalData.URL + '/team/joinTeam';
    var data = {
      tid: that.data.tdxxId
    }
    util.gets(url, data).then(function (res) {
      console.log('加入小组', res.data)
      wx.showToast({
        title: res.data.msg,
        duration: 1000,
      })
    })
  },
  onLoad: function (options) {
    console.log(options.id)
    var that=this
    this.setData({
      tdxxId:options.id
    })
    this.getXinxi();
    this.getDuizhang();
    this.getListMember();


    
    //历史活动
    var url = app.globalData.URL + '/team/listHisAct';
    var data = {
      id: options.id
    }
    util.gets(url, data).then(function (res) {
      console.log('历史活动', res.data)
      that.setData({
        historyAct: res.data.data
      })
    })
  },
})