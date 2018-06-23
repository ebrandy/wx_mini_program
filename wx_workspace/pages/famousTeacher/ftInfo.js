// pages/famousTeacher/ftInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlhead: getApp().globalData.httphead,
    chapterList: {

    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options)
    wx.request({
      url: that.data.urlhead + '/bfjy/shipin/shuji/action/3/pager',
      data: {
        'bid': options.bid,
        'np':'1'
      },
      success: res => {
        console.log(res.data)
        that.setData({
          chapterList: res.data.rows
        })
      }
    })
  },
  bindtapStartlearn: function (e) {
    var flag = e.currentTarget.dataset.flag;
    var id = e.currentTarget.dataset.mvrn;
    if (flag == '1') {
      return;
    }
    console.log(flag)
    wx.navigateTo({
      url: '../video/video?id=' + id + '&codeway=tape'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  }
})