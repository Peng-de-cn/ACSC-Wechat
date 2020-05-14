// pages/tab-index/activity-search/activity-search.js
const app = getApp();
var utils = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    searchVal: [],
    searchHistory: '', // 搜索历史,
    hotSearch: [] // 热词搜索
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.existHotSearch();
    this.getHotList();
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
   * 显示输入框
   */
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  /**
   * 隐藏输入框
   */
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  /**
   * 清除输入内容
   */
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  /**
   * 获取输入内容
   */
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  /**
   * 获取热词列表
   */
  getHotList: function() {
    var _this = this;
    var params = {
      isShowLoading: true,
      method: 'GET',
      success: function(res) {
        if (res.data == null) {
          setTimeout(() => {
            wx.showToast({
              title: '数据绑定失败，请稍后重试…',
              icon: "none",
              duration: 3000
            })
          }, 0);
        } else {
          _this.setData({
            hotSearch: res.data.data
          })
        }
      },
      fail: function(res) {
        console.log(res);
        setTimeout(() => {
          wx.showToast({
            title: '数据绑定失败，请稍后再试…',
            icon: "none",
            duration: 3000
          })
        }, 0);
      },
      complete: function(res) {}
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
          utils.ajax(params, app.globalData.basicURL + '/word/getlist');
        }
      }
    })
  },
  /**
   * 检查是否存在历史搜索
   */
  existHotSearch: function() {
    var searchVal = wx.getStorageSync("searchVal");
    this.setData({
      searchVal: searchVal
    })
  },
  /**
   * 点击热门搜索或历史搜索
   */
  runActivityList: utils.throttle(function(option) {
    wx.navigateTo({
      url: '../../result-list/result-list?keyword=' + option.currentTarget.dataset.keyword,
    })
  }),
  /**
   * 搜索提交数据
   */
  btnSearch: utils.throttle(function(e) {
    let _this = this;
    let searchReasult = e.detail.value;

    // 取出本地中所有搜索记录
    var searchVal = wx.getStorageSync("searchVal") || [];
    console.log(searchVal)
    // 搜索结果添加到搜索记录
    searchVal.push(searchReasult)

    // 之前的搜索记录
    let aryOther = [...searchVal].reverse()
    searchVal = [searchReasult, ...(aryOther.filter(item => item.toUpperCase() !== searchReasult.toUpperCase())).reverse()]
    searchVal.length > 10 && (searchVal = searchVal.slice(0, 10))

    this.setData({
      searchVal: searchVal
    })
    // 存本地
    wx.setStorageSync('searchVal', searchVal)
    wx.navigateTo({
      url: '../../result-list/result-list?keyword=' + searchReasult,
    })

  }, 1000),
  /**
   * 清除历史记录
   */
  clearHistory: utils.throttle(function() {
    var _this = this;
    setTimeout(() => {
      wx.showModal({
        title: '提示',
        content: '确认删除全部历史记录？',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定');
            wx.removeStorageSync("searchVal");
            _this.setData({
              searchVal: []
            });
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      })
    }, 0);
  }, 1000),
})