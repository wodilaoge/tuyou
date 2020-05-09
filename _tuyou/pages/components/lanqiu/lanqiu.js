// pages/yundong/lanqiu/lanqiu.js
Component({
  options: { 
    addGlobalClass: true
  },
  
  properties: {
    yundongList: Object,
    yundongCur:String
  },

  attached: function () {
  },
  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    yundongxiangqing(e) {
      wx.navigateTo({
        url: '../../pages/yundongxiangqing/yundongxiangqing?TabCur=0&categoryId=' + e.currentTarget.dataset.yundong.id + '&slogan=' + e.currentTarget.dataset.yundong.slogan,
      })
    },
    baomingtiaozhan(e) {
      wx.navigateTo({
        url: '../../pages/yundongxiangqing/yundongxiangqing?TabCur=1&categoryId=' + e.currentTarget.dataset.yundong.id + '&slogan=' + e.currentTarget.dataset.yundong.slogan,
      })
    },
  }
})
