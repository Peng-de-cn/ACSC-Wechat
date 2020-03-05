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
    searchHistory: '' // 搜索历史
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.existHotSearch();
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
   * 检查是否存在历史记录
   */
  existHotSearch() {
    var _this = this;
    if (wx.getStorageSync("searchVal")) {
      _this.setData({
        searchVal: wx.getStorageSync("searchVal")
      });
    }
    _this.setData({
      showHistory: true
    })
  },
  /**
   * 搜索提交数据
   */
  btnSearch: utils.throttle(function(e) {
    let _this = this;
    console.log(_this.data.inputVal);
    if (_this.data.inputVal.trim().length > 0) {
      // 取出本地中所有搜索记录
      var searchVal = wx.getStorageSync("searchVal") || [];

      // 创建新数组
      let newArr = [];

      // 遍历当前本地中所有记录
      for (let i = 0; i < searchVal.length; i++) {
        // 如果当前输入，不存在于本地记录中，则添加到本地记录中
        if (searchVal[i].inputVal != _this.data.inputVal.trim()) {
          newArr.push(_this.data.inputVal.trim());
          // obj.inputVal = _this.data.inputVal.trim();
        }
      }
      // 如果第一次搜索
      if (searchVal.length == 0) {
        // obj.inputVal = _this.data.inputVal.trim();
        newArr.push(_this.data.inputVal.trim());
      }
      searchVal = newArr;
      // searchVal.push(obj);
      wx.setStorageSync("searchVal", searchVal)

      // wx.navigateTo({
      //   url: '../list/question/question?searchVal=' + _this.data.inputVal
      // })

    }
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
              showHistory: true
            });
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      })
    }, 0);
  }, 1000),
  /**
   * 点击搜索历史
   */
  runIndex: utils.throttle(function(e) {
    let inputval = e.currentTarget.dataset.inputval;
    let searchindex = e.currentTarget.dataset.searchindex;

    // 按问题搜索
    if (searchindex == 0) {
      wx.navigateTo({
        url: '../list/question/question?searchVal=' + inputval,
      })
    }
    // 按公司搜索
    else if (searchindex == 1) {
      wx.navigateTo({
        url: '../list/company/company?searchVal=' + inputval,
      })
    }
  })
})