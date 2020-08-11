// pages/tab-index/tab-tags/tab-tags.js
const app = getApp();
var utils = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTabIndex: 0,
    tagList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 检查更新
    utils.getUpdate();
    this.setData({
      currentTabIndex: options.currentindex,
      currenttabid: options.currenttabid
    })
    this.getTagList(options.currenttabid);
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
   * 获取产品标签
   */
  getTagList: function (currenttabid) {
    var _this = this;
    var params = {
      isShowLoading: true,
      method: 'GET',
      success: function (res) {
        // 没有请求到新的数据  &&  问题列表里面也没有数据，此时显示 暂无数据
        if (res.data.data.labels.length == 0 && _this.data.tagList.length == 0) {
          console.log("没有数据");
          _this.setData({
            tagList: []
          })
        } else {
          let newData = [];
          for (let i = 0; i < res.data.data.labels.length; i++) {
            newData.push(res.data.data.labels[i]);
          }
          _this.setData({
            tagList: newData
          })
        }
      },
      fail: function (res) {
        console.log(res);
        setTimeout(() => {
          wx.showToast({
            title: '数据绑定失败，请稍后再试…',
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
          utils.ajax(params, app.globalData.basicURL + '/activity/getLabels?categoryId=' + currenttabid);
        }
      }
    })
  },
  /**
   * 跳转搜索列表
   */
  runResult: function (e) {
    wx.reLaunch({
      url: '../activity-list/activity-list?labelid=' + e.currentTarget.dataset.labelid + '&labelname=' + e.currentTarget.dataset.labelname + '&currenttabindex=' + e.currentTarget.dataset.currenttabindex + '&currenttabid=' + this.data.currenttabid,
    })
  }
})