// pages/MyPages/my_interest/my_interest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: [{
        'title': '篮球',
        'content': '推荐篮球内容',
        'is':false
      },
      {
        'title': '足球',
        'content': '推荐足球内容',
        'is': false
      },
      {
        'title': '篮球',
        'content': '推荐篮球内容',
        'is': false
      },
      {
        'title': '篮球',
        'content': '推荐篮球内容',
        'is': false
      },
      {
        'title': '篮球',
        'content': '推荐篮球内容', 
        'is': false
      }
    ]
  },
  choose(e) {
    var t = e.currentTarget.dataset.id
    let temp = 'lists[' + t + '].is' 
    this.setData({
      [temp]:!this.data.lists[t].is
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})