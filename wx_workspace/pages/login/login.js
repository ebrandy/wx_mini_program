Page({
  data: {
    //请求服务的域名和端口号，储存在全局变量中。  获取方式 getApp().globalData.httphead中
    urlhead: getApp().globalData.httphead,
    userName: '',
    password: '',
    headimage: '../image/ddstudy_login_btn_down.png'
  },

  // 获取输入账号  
  phoneInput: function(e) {
    this.setData({
      userName: e.detail.value
    })
  },

  // 获取输入密码  
  passwordInput: function(e) {
    this.setData({
      password: e.detail.value
    })
  },
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
  // 登录  
  login: function() {
    var that = this;
    if (this.data.userName.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '用户名和密码不能为空',
        icon: 'none',
        duration: 2000
      })
    } else {
      console.log(wx.getStorageSync('openId'))
      console.log(that.data.urlhead + '/bfjy/login/bindwx')
      var myod = wx.getStorageSync('openId') || '';
      wx.request({
        url: that.data.urlhead + '/bfjy/login/bindwx',
        data: {
          'openId': myod,
          'username': that.data.userName,
          'pwd': that.data.password
        },
        success: res => {
          console.log(res.data)
          // 这里修改成跳转的页面  
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 2000
          })
          const app = getApp()
          app.onloginAPP()
          app.globalData.usermassage= [res.data.stuid];
          wx.navigateBack({
            delta: 1
          })
        },
        fail: res => {

        }
      })





    }
  },
  onclicksecond: function() {
    wx.navigateTo({
      url: 'register'
    })

  }
})