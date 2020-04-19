// pages/yundong/lanqiu/lanqiu.js
Component({
  options: { 
    addGlobalClass: true
  },
  
  properties: {

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
    baomingcanjia(e) { //报名参加按钮跳转 带着活动id跳转
      wx.navigateTo({
        url: '../../pages/yundongxiangqing/yundongxiangqing',
      })
    },
  }
})
