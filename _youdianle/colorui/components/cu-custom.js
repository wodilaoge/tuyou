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
    }
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
      console.log(this.properties.url)
      if (this.properties.url) {
        wx.switchTab({ url: this.properties.url })
      }
      else{
        if (getCurrentPages().length < 2 && 'undefined' !== typeof __wxConfig) {
            let url = '/' + __wxConfig.pages[0]
          return wx.redirectTo({
                url
            })
        }
      wx.navigateBack({
        delta: 1
        });
      }
    },
    toHome(){
      wx.reLaunch({
        url: '/pages/index/index',
      })
    }
  }
})