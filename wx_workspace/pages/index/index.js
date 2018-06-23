// index/index.js

const app = getApp()
app.getUserInfo()

var myName = app.globalData.usermassage[0];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msHeight: wx.getSystemInfoSync().windowHeight - 180 + 'px',
    id: '0',
    urlhead: getApp().globalData.httphead,
    inputFocus: false,
    inputValue: '',
    headimage: '../image/ddstudy_user_down.png',
    helpimage: '../image/ddstudy_help_down.png',
    //年级数组
    gradearray: ['全部', '一年级', '二年级', '三年级', '四年级', '五年级', '六年级', '七年级', '八年级', '九年级', '必修', '选修'],
    //年级对应关系数组
    gradeobjectArray: [{
      'k': 0,
      'val': '全部'
    }, {
      'k': 1,
      'val': '一年级'
    }, {
      'k': 2,
      'val': '二年级'
    }, {
      'k': 3,
      'val': '三年级'
    }, {
      'k': 4,
      'val': '四年级'
    }, {
      'k': 5,
      'val': '五年级'
    }, {
      'k': 6,
      'val': '六年级'
    }, {
      'k': 7,
      'val': '七年级'
    }, {
      'k': 8,
      'val': '八年级'
    }, {
      'k': 9,
      'val': '九年级'
    }, {
      'k': 10,
      'val': '必修'
    }, {
      'k': 11,
      'val': '选修'
    }],
    //年级当前选项下标
    gradeindex: 0,
    gradeExamindex: 0,
    //学科数组
    xkarray: ['全部', '语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理'],
    //学科对应关系数组
    xkobjectArray: [{
      'k': 0,
      'val': '全部'
    }, {
      'k': 1,
      'val': '语文'
    }, {
      'k': 2,
      'val': '数学'
    }, {
      'k': 3,
      'val': '英语'
    }, {
      'k': 4,
      'val': '物理'
    }, {
      'k': 5,
      'val': '化学'
    }, {
      'k': 6,
      'val': '生物'
    }, {
      'k': 7,
      'val': '历史'
    }, {
      'k': 8,
      'val': '地理'
    }],
    //学科当前选项下标
    xkindex: 0,
    xkExamindex: 0
  },
  bookList: {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(myName)
    if (myName) {
      wx.setNavigationBarTitle({
        title: myName
      })
      return;
    }
    wx.setNavigationBarTitle({
      title: '您尚未登录'
    })
  },
  onShow: function () {
    console.log('11')
    app.getUserInfo()
    myName = app.globalData.usermassage[0];
    if (myName) {
      wx.setNavigationBarTitle({
        title: myName
      })
      return;
    }
    wx.setNavigationBarTitle({
      title: '您尚未登录'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  //nav导航区域功能函数
  /**
   * 登录头像切换效果函数
   */
  onimagetouchstart: function(event) {
    if (event.currentTarget.dataset.v === '1'){
      this.setData({
        headimage: event.currentTarget.dataset.upimg
      })
    }else{
      this.setData({
        helpimage: event.currentTarget.dataset.upimg
      })
    }

  },
  onimagetouchend: function(event) {
    if (event.currentTarget.dataset.v === '1') {
      this.setData({
        headimage: event.currentTarget.dataset.downimg
      })
    } else {
      this.setData({
        helpimage: event.currentTarget.dataset.downimg
      })
    }
  },
  /**
   * 点击底部tab切换页面函数
   */
  onclickswitchPages: function(e) {

    var id = e.currentTarget.dataset.id; //获取自定义的ID值  
    this.setData({
      id: id
    })
    switch (id) {
      case '2':
        this.getwklist()
        break;
      case '3':
        this.getbklist()
        break;
    }

  },

  /**
   * 点击登录函数
   */
  ontapLogin: function (e) {
    if (myName) {
      wx.showToast({
        title: '您已登录',
        icon: 'none',
        duration: 2000
      })
      return
    }
    wx.navigateTo({
      url: '../login/login'
    })
  },  /**
   * 点击帮助函数
   */
  ontapHelp: function (e) {
    wx.navigateTo({
      url: '../help/help'
    })
  },
  /**
   * 第一页 拍摄观看
   */
  //点击开始扫描函数
  startscan() {
    wx.scanCode({
      success: (res) => {
        console.log(res)
        console.log(res.result)
        wx.navigateTo({
          url: '../video/video?id=' + res.result + '&codeway=scan'
        })

      }

    })
  },
  /**
   * 第二页 串码观看
   */
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  //确认  
  confirm: function() {
    var myValue = this.data.inputValue.replace(/[-_]/g, "")
    console.log(myValue)

    //带参跳转到video
    wx.navigateTo({
      url: '../video/video?id=' + myValue + '&codeway=tape'
    })
    this.setData({
      inputValue: ''
    })
  },
  /**
   * 第三页 名师微课
   */
  bindPickergradeChange: function(e) {
    //console.log('picker发送选择改变，携带值为', this.data.objectArray[e.detail.value].id)
    this.setData({
      gradeindex: e.detail.value
    })
    this.getwklist()
  },
  bindPickerxkChange: function(e) {
    console.log(e.detail.value)
    this.setData({
      xkindex: e.detail.value
    })
    this.getwklist()
  },
  getwklist: function() {
    var that = this;
    var kmNum, njNum;

    if (!that.data.xkobjectArray[that.data.xkindex].k) {
      kmNum = 0;
    } else {
      kmNum = that.data.xkobjectArray[that.data.xkindex].k;
    }
    if (!that.data.gradeobjectArray[that.data.gradeindex].k) {
      njNum = 0;
    } else {
      njNum = that.data.gradeobjectArray[that.data.gradeindex].k;
    }
    wx.request({
      url: that.data.urlhead + '/bfjy/shipin/shuji/action/1',
      data: {
        'km': kmNum,
        'nianji': njNum
      },
      success: res => {
        console.log(res.data)
        this.setData({
          bookList: res.data
        })
      }
    })
  },
  bindtapft:function (e) {
    var bid = e.currentTarget.dataset.id;
    console.log(bid)
    wx.navigateTo({
      url: '../famousTeacher/ftInfo?bid=' + bid
    })
  },
  /**
   * 第四页 中考备战
   */
  bindPickergradeExamChange: function(e) {
    //console.log('picker发送选择改变，携带值为', this.data.objectArray[e.detail.value].id)
    this.setData({
      gradeExamindex: e.detail.value
    })
    this.getbklist()
  },
  bindPickerxkExamChange: function(e) {
    console.log(e.detail.value)
    this.setData({
      xkExamindex: e.detail.value
    })
    this.getbklist()
  },
  getbklist: function() {
    var that = this;
    var kmNum, njNum;
    if (!that.data.xkobjectArray[that.data.xkExamindex].k) {
      kmNum = 0;
    } else {
      kmNum = that.data.xkobjectArray[that.data.xkExamindex].k;
    }
    if (!that.data.gradeobjectArray[that.data.gradeExamindex].k) {
      njNum = 0;
    } else {
      njNum = that.data.gradeobjectArray[that.data.gradeExamindex].k;
    }
    wx.request({
      url: that.data.urlhead + '/bfjy/shipin/shuji/action/4',
      data: {
        'km': kmNum,
        'nianji': njNum
      },
      success: res => {
        console.log(res.data)
        this.setData({
          bookList: res.data
        })
      }
    })
  },
  bindtappe: function (e) {
    var bid = e.currentTarget.dataset.id;
    console.log(bid)
    wx.navigateTo({
      url: '../prepareExam/peInfo?bid=' + bid
    })
  },
})