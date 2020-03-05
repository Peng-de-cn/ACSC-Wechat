// pages/tab-index/activity-list/activity-list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.getUserInfo({
      success: function(res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
      },
      fail:function(res){
        console.log(res);
      }
    })
    // wx.login({
    //   success(res) {
    //     console.log(res.code)
    //     if (res.code) {
    //       //发起网络请求
    //       wx.request({
    //         url: 'http://baizhisys.ngrok.yangz.info:10010/weixinLogin/login?jscode=' + res.code,
    //         success:function(res){
    //           console.log(res)
    //         },
    //         fail:function(err){
    //           console.log(err);
    //         }
    //       })
    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // })
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

  },
  /**
   * 跳转搜索页
   */
  runSearch: function() {
    wx.navigateTo({
      url: '../activity-search/activity-search',
    })
  },
  /**
   * 跳转详情页
   */
  runDetail: function() {
    wx.navigateTo({
      url: '../activity-detail/activity-detail',
    })
  },
  runTest: function() {
    setTimeout(() => {
      wx.showToast({
        title: '功能暂未开放…',
        icon: "none",
        duration: 3000
      })
    }, 0);
  }
})