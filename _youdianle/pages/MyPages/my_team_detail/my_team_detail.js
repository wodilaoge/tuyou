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
    duiyuanID: '',
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
  transfer(e){
    var that=this
    wx.showModal({
      title: '确定转让队长？',
      // content: '确定要删除这张照片吗',
      cancelText: '取消',
      confirmText: '确认',
      success: res => {
        if (res.confirm) {
          console.log('转让队长通过')
          var url = app.globalData.URL + '/team/changeLeader';
          var data = {
            id:that.data.tdxxId,
            lid_old:this.data.duizhangID,
            lid_new:e.currentTarget.dataset.id
          }
          util.post_token(url, data).then(function (res) {
            console.log('转让队长确定通过', res.data)
            wx.showToast({
              title: res.data.msg,
              duration: 1000,
            })
          })
        }
  
      }
    })
  },

  pass(e){
    var that=this
    wx.showModal({
      title: '确定通过申请？',
      // content: '确定要删除这张照片吗',
      cancelText: '取消',
      confirmText: '确认',
      success: res => {
        if (res.confirm) {
          console.log('通过申请通过')
          var url = app.globalData.URL + '/team/auditJoin';
          var data = {
            tid:that.data.tdxxId,
            uid:e.currentTarget.dataset.id,
            result:10
          }
          util.gets(url, data).then(function (res) {
            console.log('通过申请确定通过', res.data)
            wx.showToast({
              title: res.data.msg,
              duration: 1000,
            })
          })
        }
        else{
          var url = app.globalData.URL + '/team/auditJoin';
          var data = {
            tid:that.data.tdxxId,
            uid:e.currentTarget.dataset.id,
            result:30
          }
          util.gets(url, data).then(function (res) {
            console.log('拒绝申请', res.data)
            wx.showToast({
              title: res.data.msg,
              duration: 1000,
            })
          })
        }
      }
    })
  },
  deleteMem(e){
    var that=this
    //退出小组
    wx.showModal({
      title: '确定要删除该成员吗',
      // content: '确定要删除这张照片吗',
      cancelText: '取消',
      confirmText: '确认',
      success: res => {
        if (res.confirm) {
          console.log('delete confirm')
          var url = app.globalData.URL + '/team/leaveTeam';
          var data = {
            tid:that.data.tdxxId,
            uid:e.currentTarget.dataset.id,
            type:"30",
            creater:that.data.duizhangID
            
          }
          util.gets(url, data).then(function (res) {
            console.log('退出小组', res.data)
            wx.showToast({
              title: res.data.msg,
              duration: 1000,
            })
          })
        }
      }
    })




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
      if(res.data.code==0)
      wx.showToast({
        title: '加入成功',
        duration: 1000,
      })
      else
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