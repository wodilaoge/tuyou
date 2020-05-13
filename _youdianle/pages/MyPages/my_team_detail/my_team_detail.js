// pages/tuanduixinxi/tuanduixinxi.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tdxxId: '6793995262885888',
    tdxxDeatil: [],
    duiyuanID: '123456',
    testData: [],
    duizhangID: '',
    duiyuanid: '',
    duizhangDeatil: [],
    listmemberdeatil: [],
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
        duizhangID: res.data.lid
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
  onLoad: function (options) {
    console.log(options.id)
    this.setData({
      tdxxId:options.id
    })
    this.getXinxi();
    this.getDuizhang();
    this.getListMember();
  },
})