// pages/components/wenyu/wenyu.js
Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    wenyuList: Object,
    wenyuCur: String
  },
  attached: function () {
    console.log(this.properties.wenyuList);
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
        url: '../../pages/yundongxiangqing/yundongxiangqing?TabCur=0&categoryId=' + e.currentTarget.dataset.yundong.id,
      })
    },
    baomingtiaozhan(e) {
      wx.navigateTo({
        url: '../../pages/yundongxiangqing/yundongxiangqing?TabCur=1&categoryId=' + e.currentTarget.dataset.yundong.id,
      })
    },
  }
})
