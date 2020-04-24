// pages/yundong/lanqiu/lanqiu.js
Component({
  options: { 
    addGlobalClass: true
  },
  
  properties: {
    yundongList: Object,

  },

  attached: function () {
    console.log(this.properties.yundongList);
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
        url: '../../pages/yundongxiangqing/yundongxiangqing?categoryId=' + e.currentTarget.id,
      })
    },
    yundongxiangqing_baoming(e) { //报名参加按钮跳转 带着活动id跳转 运动
      wx.navigateTo({
        url: '../../pages/yundongxiangqing/yundongxiangqing?categoryId=' + e.currentTarget.id +'&TabCur=1',
      })
    },
  }
})
