const app = getApp();
Component({
  /**
   * 组件的一些选项
   */
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  /**
   * 组件的对外属性
   */
  properties: {
    bgColor: {
      type: String,
      default: ''
    },
    isCustom: {
      type: [Boolean, String],
      default: false
    },
    isBack: {
      type: [Boolean, String],
      default: false
    },
    bgImage: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    },
    ziliaoID: {
      type: String,
      default: ''
    },
    sousuo: {
      type: String,
      default: ''
    },
    isMypageJmp:{
      type: String,
      default: ''
    },
   
  },
  /**
   * 组件的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom
  },
  /**
   * 组件的方法列表
   */
  methods: {
    BackPage() {
      // console.log(this.properties.url)
      // console.log(this.properties.isMypageJmp)
      if (this.properties.url && !this.properties.ziliaoID&&!this.properties.isMypageJmp&& !this.properties.sousuo) { /////朱修改
        console.log('1')
        wx.switchTab({
          url: this.properties.url
        })
      } else {
        if (getCurrentPages().length < 2 && 'undefined' !== typeof __wxConfig) {
          console.log('2')
          let url = '/' + __wxConfig.pages[0]
          return wx.redirectTo({
            url
          })
        }
        console.log('3')
        wx.navigateBack({
          delta: 1
        });
      }
    },
    toHome() {
      wx.reLaunch({
        url: '/pages/index/index',
      })
    }
  }
})