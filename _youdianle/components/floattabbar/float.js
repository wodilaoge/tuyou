const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  /**
   * 组件的初始数据
   */
  data: {
    isIphoneX: false, // app.globalData.systemInfo.model == "iPhone X" ? true : false,
    isshow:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    adddetial() {
      this.setData({
        isshow:!this.data.isshow
      })
    },
    toact: function (e) {
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
    }
  },
})
