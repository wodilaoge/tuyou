// pages/components/aihao/aihao.js
Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    aihaoList: Object,
    aihaoCur: String,
    aihaoxiaolei:Object
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
        url: '../../pages/yundongxiangqing/yundongxiangqing?TabCur=0&categoryId=' + e.currentTarget.dataset.aihao.id,
      })
    },
    baomingtiaozhan(e) {
      wx.navigateTo({
        url: '../../pages/yundongxiangqing/yundongxiangqing?TabCur=1&categoryId=' + e.currentTarget.dataset.aihao.id,
      })
    },
  }
})
