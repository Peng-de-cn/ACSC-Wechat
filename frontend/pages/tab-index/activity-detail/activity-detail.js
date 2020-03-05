// pages/tab-index/activity-detail/activity-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: ["https://i.loli.net/2020/03/03/QRG1IdqUOAtYB5h.jpg", "https://i.loli.net/2020/03/03/dD7yFIlLKn5Oac1.jpg", "https://i.loli.net/2020/03/03/FOSA3tDlj1LIwJX.jpg", "https://i.loli.net/2020/03/03/EWAK1PYx9UCO3nM.jpg", "https://i.loli.net/2020/03/03/7j4qvP8uUm1V5eR.jpg", "https://i.loli.net/2020/03/03/CKpXrUVMQmv8gaF.jpg"],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500
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

  },
  /**
   * 打电话
   */
  callPhone:function(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone //仅为示例，并非真实的电话号码
    })
  },
  /**
   * 跳转webView
   */
  runWebview:function(){
    wx.navigateTo({
      url: '../activity-webview/activity-webview',
    })
  },
  /**
   * 收藏/取消收藏
   */
  collection:function(){
    setTimeout(() => {
      wx.showToast({
        title: '功能暂未开放...',
        icon: "none",
        duration: 3000
      })
    }, 0);
  },
  /**
   * 立即报名
   */
  submitData:function(){
    setTimeout(() => {
      wx.showToast({
        title: '功能暂未开放...',
        icon: "none",
        duration: 3000
      })
    }, 0);
  }
})