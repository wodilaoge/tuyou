const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    group: 0,
    index: null,
    number: 50,
    picker: ['浙江工商大学', '浙江财经大学','浙江大学','浙江工业大学','浙江计量大学','杭州师范大学'],
    picker2: ['匿名参赛', '实名参赛'],
    picker3: ['观看无需报名', '匿名报名观看', '实名报名观看'],
    picker4: ['篮球', '足球', '排球', '羽毛球', '乒乓球', '其他'],
    multiIndex: [0, 0, 0],
    time: '12:01',
    date: '2020.4.25 16:00',
    date2: '2020.8.25 16:00',
    region: ['浙江省', '杭州市', '浙江大学'],
    place: ['浙江大学篮球场'],
    imgList: [],
    imgList2: [],
    imgList3: [],
    imgList4: [],
    imgList5: [],
    modalName: null,
    textareaAValue: '',
    textareaBValue: ''
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  MultiChange(e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  RegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  ChooseImage(e) {
    var t = e.currentTarget.dataset.id
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (t == 1) {
          if (this.data.imgList.length != 0) {
            this.setData({
              imgList: this.data.imgList.concat(res.tempFilePaths)
            })
          } else {
            this.setData({
              imgList: res.tempFilePaths
            })
          }
        }
        if (t == 2) {
          if (this.data.imgList2.length != 0) {
            this.setData({
              imgList2: this.data.imgList2.concat(res.tempFilePaths)
            })
          } else {
            this.setData({
              imgList2: res.tempFilePaths
            })
          }
        }
        if (t == 3) {
          if (this.data.imgList3.length != 0) {
            this.setData({
              imgList3: this.data.imgList3.concat(res.tempFilePaths)
            })
          } else {
            this.setData({
              imgList3: res.tempFilePaths
            })
          }
        }
        if (t == 4) {
          if (this.data.imgList4.length != 0) {
            this.setData({
              imgList4: this.data.imgList4.concat(res.tempFilePaths)
            })
          } else {
            this.setData({
              imgList4: res.tempFilePaths
            })
          }
        }
        if (t == 5) {
          if (this.data.imgList5.length != 0) {
            this.setData({
              imgList5: this.data.imgList5.concat(res.tempFilePaths)
            })
          } else {
            this.setData({
              imgList5: res.tempFilePaths
            })
          }
        }
      }
    });
  },
  ViewImage(e) {
    var t = e.currentTarget.dataset.id
    if (t == 1) {
      wx.previewImage({
        urls: this.data.imgList,
        current: e.currentTarget.dataset.url
      });
    }
    if (t == 2) {
      wx.previewImage({
        urls: this.data.imgList2,
        current: e.currentTarget.dataset.url
      });
    }
    if (t == 3) {
      wx.previewImage({
        urls: this.data.imgList3,
        current: e.currentTarget.dataset.url
      });
    }
    if (t == 4) {
      wx.previewImage({
        urls: this.data.imgList4,
        current: e.currentTarget.dataset.url
      });
    }
    if (t == 5) {
      wx.previewImage({
        urls: this.data.imgList5,
        current: e.currentTarget.dataset.url
      });
    }
  },
  DelImg(e) {
    var t = e.currentTarget.dataset.id
    if (t == 1) {
      wx.showModal({
        title: '确定',
        content: '确定要删除这张照片？',
        cancelText: '取消',
        confirmText: '确认删除',
        success: res => {
          if (res.confirm && t == 1) {
            this.data.imgList.splice(e.currentTarget.dataset.index, 1);
            this.setData({
              imgList: this.data.imgList
            })
          }
        }
      })
    }
    if (t == 2) {
      wx.showModal({
        title: '确定',
        content: '确定要删除这张照片？',
        cancelText: '取消',
        confirmText: '确认删除',
        success: res => {
          if (res.confirm && t == 2) {
            this.data.imgList2.splice(e.currentTarget.dataset.index, 1);
            this.setData({
              imgList2: this.data.imgList2
            })
          }
        }
      })
    }
    if (t == 3) {
      wx.showModal({
        title: '确定',
        content: '确定要删除这张照片？',
        cancelText: '取消',
        confirmText: '确认删除',
        success: res => {
          if (res.confirm && t == 3) {
            this.data.imgList3.splice(e.currentTarget.dataset.index, 1);
            this.setData({
              imgList3: this.data.imgList3
            })
          }
        }
      })
    }
    if (t == 4) {
      wx.showModal({
        title: '确定',
        content: '确定要删除这张照片？',
        cancelText: '取消',
        confirmText: '确认删除',
        success: res => {
          if (res.confirm && t == 4) {
            this.data.imgList4.splice(e.currentTarget.dataset.index, 1);
            this.setData({
              imgList4: this.data.imgList4
            })
          }
        }
      })
    }
    if (t == 5) {
      wx.showModal({
        title: '确定',
        content: '确定要删除这张照片？',
        cancelText: '取消',
        confirmText: '确认删除',
        success: res => {
          if (res.confirm && t == 5) {
            this.data.imgList5.splice(e.currentTarget.dataset.index, 1);
            this.setData({
              imgList5: this.data.imgList5
            })
          }
        }
      })
    }
  },
  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },
  textareaBInput(e) {
    this.setData({
      textareaBValue: e.detail.value
    })
  },
  toForm_modify: function (e) {
    wx.navigateTo({
      url: "../../pages/form_modify/form_modify"
    })
  },
  commit: function (e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  addicon: function (e) {
    var t = this.data.group
    console.log(t)
    t++
    this.setData({
      group: t
    })
  }, 
  prevNum() {
    this.setData({ number: this.data.number + 1 });
  },
  nextNum() {
    this.setData({ number: this.data.number - 1 });
  },
})