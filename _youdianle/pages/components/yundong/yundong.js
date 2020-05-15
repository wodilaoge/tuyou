// pages/yundong/lanqiu/lanqiu.js
const app = getApp();
var util = require("../../../utils/util.js");
Component({
  options: { 
    addGlobalClass: true
  },
  
  properties: {
    yundongList: Object,
    yundongCur:String,
    yundongxiaolei:Object
  },

  attached: function () {
  },
  /**
   * 组件的初始数据
   */
  data: {
    xiaolei:[]
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
