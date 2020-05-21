// pages/tuanduixinxi/tuanduixinxi.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tdxxId:'6793995262885888',
    tdxxDeatil:[],
    duiyuanID:'123456',
    testData:[],
    duizhangID:'',
    duiyuanid: '',
    duizhangDeatil:[],
    listmemberdeatil:[],
  },



  getXinxi() {
    let url = app.globalData.URL + '/team/findTeam';
    let data = {
      id:this.data.tdxxId
    };
    app.wxRequest('GET', url, data, (res) => {
      console.log(res.data)
      this.setData({
      tdxxDeatil:res.data,
      duizhangID:res.data.lid
      })
    }, (err) => {
      console.log(err.errMsg)
    });

    
  },

  getDuizhang (){
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
      duiyuanid:this.data.listmemberdeatil[0].uid
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
        listmemberdeatil:res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
   
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getXinxi();
    this.getDuizhang();
    this.getListMember();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    return {
      title: '友点乐',
      path: 'pages/tuanduixinxi/tuanduixinxi',
      success: function (res) {
        console.log("转发成功:" + JSON.stringify(res));
        that.shareClick();
      },
      fail: function (res) {
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  }
})