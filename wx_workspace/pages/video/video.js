Page({
  onLoad: function (option) {
    console.log(option)
    var that = this;
    var isiOS;
//var isAndroid = res.system.indexOf('Android') > -1 || res.system.indexOf('Adr') > -1; //android终端
    wx.getSystemInfo({
      success: (res) => {
        console.log(res)
        console.log(res.system)
        isiOS = (res.system.indexOf('iOS') > -1) ? 'ios' : 'android'; //android终端; //ios终端
      }
    })
    
    console.log(isiOS)
    wx.request({
      url: that.data.urlhead + '/bfjy/shipin/videourl',
      data: {
        code: option.id,
        device: isiOS, //设备类型 ios or android
        username: "wangjing", //用户名
        sid: "sessionid", //sessionID
        codeway: option.codeway  //tape 手输 or scan 扫码
      },
      success: res => {
        console.log(res.data)
        /*if(res.data.visitNum==0){
          wx.redirectTo({
            url: '../login/login'
          })
          return;
        }*/
        if (!res.data.url || res.data.url == '' || res.data.url=='null'){
         /* wx.showToast({
            title: '视频格式不支持播放，请到官网观看',
            icon: 'none',
            duration: 10000
          })*/
          that.setData({
            unsupport: '视频格式不支持播放，请到官网观看'
          })
          return
        }
        that.setData({
          src: res.data.url
        })
      }
    })

  },
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  inputValue: '',
  data: {
    unsupport:'',
    urlhead: getApp().globalData.httphead,
    reply: false,
    src: ''
  },
  onbindPlay: function() {
    this.setData({
      reply: true
    })
    this.videoContext.play()
  },
  bindPause: function() {
    this.videoContext.pause()
  },
  videoErrorCallback: function(e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  }
})
