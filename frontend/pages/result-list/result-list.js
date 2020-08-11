// pages/result-list/result-list.js
const app = getApp();
var utils = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showNoDate: false, // 是否显示数据为空,
    pageMax: false, // 是否到最后一页
    activityList: [], // 活动列表
    page: 1, //当前页码，0：页码1
    limit: 2, // 每页显示条数
    orderby: 'begin_time', //排序方式, begin_time:开始时间;create_time:发布时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 检查更新
    utils.getUpdate();
    if (options.labelid) {
      wx.setNavigationBarTitle({
        title: options.labelname
      })
      console.log(options.labelid);
      this.getListByTag(options.labelid);

    } else if (options.keyword) {
      wx.setNavigationBarTitle({
        title: options.keyword
      })
      this.getListByKeywords(options.keyword);
    }
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
    if (!this.data.pageMax) {
      let currentPage = this.data.page;
      currentPage += 1;
      this.setData({
        page: currentPage
      })
      if (!this.data.pageMax) {
        this.loadData();
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 按标签搜索
   */
  getListByTag: function (tag) {
    var _this = this;
    var params = {
      isShowLoading: true,
      method: 'GET',
      success: function (res) {
        console.log(res);
        // 没有请求到新的数据  &&  问题列表里面也没有数据，此时显示 暂无数据
        if (res.data.data.activities.length == 0 && _this.data.activityList.length == 0) {
          console.log("没有数据");
          _this.setData({
            activityList: [],
            showNoDate: !_this.data.showNoDate
          })
        }
        // 没有请求到新的数据  &&  问题列表里面有数据，此时显示 加载到底
        else if (res.data.data.activities.length == 0 && _this.data.activityList.length != 0) {
          _this.setData({
            pageMax: true
          })
        } else {
          let newData = _this.data.activityList;
          for (let i = 0; i < res.data.data.activities.length; i++) {
            newData.push(res.data.data.activities[i]);
          }
          _this.setData({
            activityList: newData,
            showNoDate: false
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
          utils.ajax(params, app.globalData.basicURL + '/activity/getActivityList?orderby=' + _this.data.orderby + '&page=' + _this.data.page + '&limit=' + _this.data.limit + '&labelId=' + tag);
        }
      }
    })
  },
  /**
   * 按关键词搜索
   */
  getListByKeywords: function (keyword) {
    var _this = this;
    var params = {
      isShowLoading: true,
      method: 'GET',
      success: function (res) {
        // 没有请求到新的数据  &&  问题列表里面也没有数据，此时显示 暂无数据
        if (res.data.data.count == 0) {
          _this.setData({
            activityList: [],
            showNoDate: !_this.data.showNoDate
          })
        }
        // 没有请求到新的数据  &&  问题列表里面有数据，此时显示 加载到底
        else if (res.data.data.activities.length == 0 && _this.data.activityList.length != 0) {
          _this.setData({
            pageMax: true
          })
        } else {
          let newData = _this.data.activityList;
          for (let i = 0; i < res.data.data.activities.length; i++) {
            newData.push(res.data.data.activities[i]);
          }
          _this.setData({
            activityList: newData,
            showNoDate: false
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
          utils.ajax(params, app.globalData.basicURL + '/activity/queryByKeyword?keyword=' + keyword + '&page=' + _this.data.page + '&limit=' + _this.data.limit + '&categoryId=' + _this.data.currentTabId);
        }
      }
    })
  },
  /**
   * 跳转详情页
   */
  runDetail: utils.throttle(function (e) {
    wx.navigateTo({
      url: '../tab-index/activity-detail/activity-detail?activityid=' + e.currentTarget.dataset.activityid,
    })
  })
})