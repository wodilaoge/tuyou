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
    console.log(this.properties.yundongCur);
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
    yundongxiangqing(e) { //报名参加按钮跳转 带着活动id跳转
      wx.navigateTo({
        url: '../../pages/yundongxiangqing/yundongxiangqing?TabCur=0&categoryId=' + e.currentTarget.id,
      })
    },
    baomingtiaozhan(e) { //报名参加按钮跳转 带着活动id跳转 运动
      wx.navigateTo({
        url: '../../pages/yundongxiangqing/yundongxiangqing?TabCur=1&categoryId=' + e.currentTarget.id,
      })
    },
  }
})
