// pages/MyPages/my_interest/my_interest.js
Page({
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
  onLoad: function(options) {

  },
})