// pages/tab-mine/mine-index/mine-index.js
var utils = require("../../../utils/util.js");
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    vipLevel: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 检查更新
    utils.getUpdate();
    this.checkExistence();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      console.log('设置选中项 4')
      this.getTabBar().setData({
        selected: 2
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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
      success: function () {
        console.log("拨打电话成功！");
      },
      fail: function () {
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
  }),
  /**
   * 检查用户是否填写过信息
   */
  checkExistence: function () {
    var _this = this;
    var params = {
      isShowLoading: true,
      method: 'GET',
      success: function (res) {
        if (res.data.data == null) {
          // setTimeout(() => {
          //   wx.showToast({
          //     title: '数据查询失败，请稍后再试',
          //     icon: "none",
          //     duration: 3000
          //   })
          // }, 0);
        } else {
          console.log(res.data.data.vip);
          _this.setData({
            vipLevel: res.data.data.vip
          })
        }
      },
      fail: function (res) {
        setTimeout(() => {
          wx.showToast({
            title: '数据加载失败，请稍后再试…',
            icon: "none",
            duration: 3000
          })
        }, 0);
      },
      complete: function (res) {}
    }

    wx.getNetworkType({
      success(res) {
        const networkType = res.networkType;
        if (networkType == "none" || networkType == "unknown") {
          setTimeout(() => {
            wx.showToast({
              title: '请检查网络连接…',
              icon: "none",
              duration: 3000
            })
          }, 0);
        } else {
          utils.ajax(params, app.globalData.basicURL + '/user/queryUserById?userId=' + app.globalData.openid);
        }
      }
    })
  },
})