//app.js
App({
  onLaunch: function() {
    console.log('launch')
    var that = this;
    // 展示本地存储能力
    //var logs = wx.getStorageSync('logs') || []
    //logs.unshift(Date.now())
    //wx.setStorageSync('logs', logs)
    var myCode;
    // 登录
    wx.login({
      success: res => {
        //发送 res.code 到后台换取 openId, sessionKey, unionId
        myCode = res.code;
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              wx.request({
                url: that.globalData.httphead + '/bfjy/login/initlogin',
                data: {
                  'encryptedData': res.encryptedData,
                  'iv': res.iv,
                  'code': myCode
                },
                success: res => {
                  console.log(res.data)
                  if (res.data == '4444') {
                    wx.showToast({
                      title: '无法获取用户',
                      icon: 'none',
                      duration: 2000
                    })
                    return;
                  }
                  wx.setStorageSync('openId', res.data)
                  that.onloginAPP()
                },
                fail: res => {
                  wx.showToast({
                    title: '无法获取用户',
                    icon: 'none',
                    duration: 2000
                  })
                }
              })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onloginAPP: function(tx) {
    var that = this;
    try {
      that.globalData.usermassage = [null];
      wx.removeStorageSync('userprivacy')
    } catch (e) {
      // Do something when catch error
    }
    var myod = wx.getStorageSync('openId') || '';
    wx.request({
      url: that.globalData.httphead + '/bfjy/login/wxlogin',
      data: {
        'openId': myod
      },
      success: res => {
        console.log(res.data)
        var userprivArr = [];
        if (res.data == '') {
          wx.showToast({
            title: '无法获取用户，请重新登录',
            icon: 'none',
            duration: 2000
          })
          return
        }
        if (res.data.flag == '0') {
          return
        }
        that.globalData.usermassage[0] = res.data.stuid;
        wx.setStorageSync('userprivacy', [res.data.sessionId, res.data.stuid])
      },
      fail: res => {
        wx.showToast({
          title: '无法获取用户，请重新登录',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  //在其他页面获取用户信息
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.usermassage)
    } else {
      var myName = wx.getStorageSync('userprivacy') || [];
      that.globalData.usermassage = [myName[1]];
      typeof cb == "function" && cb(that.globalData.usermassage)
    }
  },
  globalData: {
    httphead: 'http://192.168.1.104:8080',
    userInfo: null,
    usermassage:[null]
  }
})