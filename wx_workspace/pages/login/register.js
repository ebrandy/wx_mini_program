// pages/login/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //请求服务的域名和端口号，储存在全局变量中。  获取方式 getApp().globalData.httphead中
    urlhead: getApp().globalData.httphead, 
    //必选项
    required: [{
      'username': ''
    }, {
      'phone': ''
    }, {
      'pwd': ''
    }, {
      'repwd': ''
    }, {
      'grade': ''
    }, {
      'school': ''
    }, {
      'provincecode': ''
    }],
    //可选项
    optional: [],
    //注册按钮默认图片
    headimage: '../image/ddstudy_register_btn_down.png',
    //区县数组
    array: [],
    //年级数组
    grade: ['高三', '高二', '高一', '9年级', '8年级', '7年级', '6年级', '5年级', '4年级', '3年级', '2年级', '1年级'],
    //区县对应关系数组
    objectArray: [],
    //区县当前选项下标
    index: 0,
    //年级当前选项下标
    gradeindex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //wx 发送请求 获得区县数据 并push到objectArray与array数组中
    wx.request({
      url: that.data.urlhead + '/bfjy/login/province/get',
      data: {},
      success: res => {
        console.log(res.data.data)
        var prvArr = [];
        for (var index in res.data.data) {
          prvArr.push(res.data.data[index].prvnname)
          //res.data.infos[index].info_file = res.data.infos[index].info_file.split(',');
        }
        that.setData({
          array: prvArr,
          objectArray: res.data.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  /**
   * 年级选择函数
   */
  bindgradePickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      gradeindex: e.detail.value
    })
  },
    /**
   * 区县选择函数
   */
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', this.data.objectArray[e.detail.value].id)
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 按钮点击切换效果函数
   */
  onimagetouchstart: function(event) {
    this.setData({
      headimage: event.currentTarget.dataset.upimg
    })
  },
  onimagetouchend: function(event) {
    this.setData({
      headimage: event.currentTarget.dataset.downimg
    })
  },
  /**
   * 开始注册函数
   */
  bindregister: function(e) {
    //wx 发送请求 获得区县数据 并push到objectArray与array数组中
    var that = this;
    wx.request({
      url: that.data.urlhead + '/bfjy/login/wxreg',
      data: {},
      success: res => {
        console.log(res.data)
      }
    })
  }
})