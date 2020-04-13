// pages/form/form.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      isshow:0
  },
  toact: function(e){
    wx.navigateTo({
      url: "../../pages/form_launch/form_launch"
    })
  },
  tovideo: function (e) {
    wx.navigateTo({
      url: "../../pages/form_video/form_video"
    })
  }, 
  topic: function (e) {
    wx.navigateTo({
      url: "../../pages/form_picture/form_picture"
    })
  },
  toteam: function (e) {
    wx.navigateTo({
      url: "../../pages/form_team/form_team"
    })
  },
  setshow:function(e){//使发布4个按钮显示
    this.setData({
      isshow: this.data.isshow=!this.data.isshow
    })
  }
})