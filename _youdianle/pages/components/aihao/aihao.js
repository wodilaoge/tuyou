// pages/components/aihao/aihao.js
const app = getApp();
var util = require("../../../utils/util.js");
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
      app.globalData.tabbar = 3;
      wx.navigateTo({
        url: '../../pages/yundongxiangqing/yundongxiangqing?TabCur=0&tzpd=3&Title=' + e.currentTarget.dataset.aihao.actname+'&categoryId=' + e.currentTarget.dataset.aihao.id,
      })
    },
    baomingtiaozhan(e) {
      app.globalData.tabbar = 3;
      wx.navigateTo({
        url: '../../pages/yundongxiangqing/yundongxiangqing?TabCur=1&tzpd=3&Title=' + e.currentTarget.dataset.aihao.actname +'&categoryId=' + e.currentTarget.dataset.aihao.id,
      })
    },
    ///////////////////////////////
    gerenziliao(e) {
      wx.navigateTo({
        url: '/pages/ziliao/ziliao?id=' + e.currentTarget.dataset.id,
      })
    },
  ////////////////////////
  }
})
