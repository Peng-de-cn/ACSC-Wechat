// pages/tab-mine/mine-index/mine-index.js
var utils = require("../../../utils/util.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {},

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
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      console.log('设置选中项 4')
      this.getTabBar().setData({
        selected: 4
      })
    }
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
   * 跳转个人资料
   */
  personal: utils.throttle(function (e) {
    wx.navigateTo({
      url: '../mine-personal/mine-personal'
    })
  }),
  /**
   * 跳转我的活动
   */
  activities: utils.throttle(function (e) {
    wx.navigateTo({
      url: '../mine-activities/mine-activities'
    })
  }),
  /**
   * 跳转我的收藏
   */
  collection: utils.throttle(function (e) {
    // setTimeout(() => {
    //   wx.showToast({
    //     title: '功能暂未开放',
    //     icon: "none",
    //     duration: 3000
    //   })
    // }, 0);
    wx.navigateTo({
      url: '../mine-collection/mine-collection'
    })
  }),
  /**
   * 跳转加入会员
   */
  join: utils.throttle(function (e) {
    setTimeout(() => {
      wx.showToast({
        title: '功能暂未开放',
        icon: "none",
        duration: 3000
      })
    }, 0);
    // wx.navigateTo({
    //   url: '../mine-join/mine-join'
    // })
  }),
  /**
   * 跳转用户反馈
   */
  feedback: utils.throttle(function (e) {

  }),
  /**
   * 跳转联系客服
   */
  callUs: utils.throttle(function (e) {
    wx.makePhoneCall({
      phoneNumber: "400-xxx-xxxx",
      success: function() {
        console.log("拨打电话成功！");
      },
      fail: function() {
        console.log("拨打电话失败！");
      }
    })
  }),
  /**
   * 跳转关于我们
   */
  aboutUs: utils.throttle(function (e) {
    wx.showModal({
      title: '关于我们',
      content: '本项目由A.C.S.C.滑雪俱乐部提供技术支持',
      showCancel: false
    })
  })
})