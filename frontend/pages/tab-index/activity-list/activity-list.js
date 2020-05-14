// pages/tab-index/activity-list/activity-list.js
const app = getApp();
var utils = require("../../../utils/util.js");
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
    tabList: [],
    hotList: [],
    currentIndex: 0,
    currentTabId: '',
    currentTabName: '', // 当前选中Tab名
    tagName: '全部', // 左上角显示标签名
    labelId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let _this = this;
    // 热门活动
    this.getHotActivity();
    // 获取产品类别(TabList)
    this.getTabList().then(function () {
      // 按选中标签加载
      if (options.labelname != undefined) {
        _this.setData({
          tagName: options.labelname,
          currentIndex: options.currenttabindex,
          labelId: options.labelid
        })
        // let currentTabId = _this.data.tabList[options.currenttabindex].categoryId
        // _this.getListByTag(options.labelid, options.labelname, currentTabId);
        _this.loadData();
      }
      // 首次加载
      else {
        _this.loadData();
      }

      //  首次加载
      // if (options == undefined) {
      //   _this.loadData();
      // }
      // // 按搜索结果加载
      // else if (options.keyword != '') {
      //   let keyword = options.keyword;
      //   var params = {
      //     isShowLoading: true,
      //     method: 'GET',
      //     success: function (res) {
      //       // 没有请求到新的数据  &&  问题列表里面也没有数据，此时显示 暂无数据
      //       if (res.data.data.count == 0) {
      //         _this.setData({
      //           activityList: [],
      //           showNoDate: !_this.data.showNoDate
      //         })
      //       }
      //       // 没有请求到新的数据  &&  问题列表里面有数据，此时显示 加载到底
      //       else if (res.data.data.activities.length == 0 && _this.data.activityList.length != 0) {
      //         _this.setData({
      //           pageMax: true
      //         })
      //       } else {
      //         let newData = _this.data.activityList;
      //         for (let i = 0; i < res.data.data.activities.length; i++) {
      //           newData.push(res.data.data.activities[i]);
      //         }
      //         _this.setData({
      //           activityList: newData,
      //           showNoDate: false
      //         })
      //       }
      //     },
      //     fail: function (res) {
      //       console.log(res);
      //       setTimeout(() => {
      //         wx.showToast({
      //           title: '数据绑定失败，请稍后再试…',
      //           icon: "none",
      //           duration: 3000
      //         })
      //       }, 0);
      //     },
      //     complete: function (res) {}
      //   }

      //   wx.getNetworkType({
      //     success(res) {
      //       const networkType = res.networkType;
      //       if (networkType == "none" || networkType == "unknown") {
      //         setTimeout(() => {
      //           wx.showToast({
      //             title: '请检查网络连接…',
      //             icon: "none",
      //             duration: 3000
      //           })
      //         }, 0);
      //       } else {
      //         utils.ajax(params, app.globalData.basicURL + '/activity/queryByKeyword?keyword=' + keyword + '&page=' + _this.data.page + '&limit=' + _this.data.limit + '&categoryId=' + _this.data.currentTabId);
      //       }
      //     }
      //   })
      // }
    })
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
      this.getTabBar().setData({
        selected: 0
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
    // 标题栏显示加载中…
    wx.showNavigationBarLoading();
    this.setData({
      page: 1,
      pageMax: false,
      activityList: []
    })
    // 重新加载
    this.onLoad();

    // 标题栏停止显示加载中…
    wx.hideNavigationBarLoading();
    // 停止下拉刷新
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // console.log(1);
    // if (!this.data.pageMax) {
    //   let currentPage = this.data.page;
    //   currentPage += 1;
    //   this.setData({
    //     page: currentPage
    //   })
    //   if (!this.data.pageMax) {
    //     this.loadData();
    //   }
    // }
  },
  reactBottom: function () {
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
   * 获取产品类别(TabList)
   */
  getTabList: function () {
    var _this = this;

    return new Promise((resolve, reject) => {
      var params = {
        isShowLoading: true,
        method: 'GET',
        success: function (res) {
          // 没有请求到新的数据  &&  问题列表里面也没有数据，此时显示 暂无数据
          if (res.data.data.categories.length == 0 && _this.data.tabList.length == 0) {
            _this.setData({
              tabList: []
            })
          } else {
            let newData = [];
            for (let i = 0; i < 3; i++) {
              newData.push(res.data.data.categories[i]);
            }
            _this.setData({
              tabList: newData,
              currentTabId: newData[0].categoryId,
              currentTabName: newData[0].categoryName
            })
            resolve();
          }
        },
        fail: function (res) {
          setTimeout(() => {
            wx.showToast({
              title: '数据绑定失败，请稍后再试…',
              icon: "none",
              duration: 3000
            })
          }, 0);
          reject();
        },
        complete: function (res) {
          // wx.setStorageSync('categoryId', _this.data.tabList[0].categoryId);
        }
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
            utils.ajax(params, app.globalData.basicURL + '/activity/getCategories');
          }
        }
      })
    })

  },
  /**
   * 获取热门活动
   */
  getHotActivity: function () {
    var _this = this;
    var params = {
      isShowLoading: true,
      method: 'GET',
      success: function (res) {
        // 没有请求到新的数据  &&  问题列表里面也没有数据，此时显示 暂无数据
        if (res.data.data.activitys.length == 0 && _this.data.hotList.length == 0) {
          _this.setData({
            hotList: []
          })
        } else {
          let newData = [];
          for (let i = 0; i < res.data.data.activitys.length; i++) {
            newData.push(res.data.data.activitys[i]);
          }
          _this.setData({
            hotList: newData
          })
        }
      },
      fail: function (res) {
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
          utils.ajax(params, app.globalData.basicURL + '/activity/getHotActivity');
        }
      }
    })
  },
  /**
   * 跳转搜索页
   */
  runSearch: utils.throttle(function (e) {
    wx.navigateTo({
      url: '../activity-search/activity-search',
    })
  }),
  /**
   * 跳转详情页
   */
  runDetail: utils.throttle(function (e) {
    console.log(e.currentTarget.dataset);
    wx.navigateTo({
      url: '../activity-detail/activity-detail?activityid=' + e.currentTarget.dataset.activityid,
    })
  }),
  /**
   * 加载数据
   */
  loadData: function () {
    var _this = this;
    var params = {
      isShowLoading: true,
      method: 'GET',
      success: function (res) {
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
          utils.ajax(params, app.globalData.basicURL + '/activity/getActivityList?orderby=' + _this.data.orderby + '&page=' + _this.data.page + '&limit=' + _this.data.limit + '&categoryId=' + _this.data.currentTabId + "&labelId=" + _this.data.labelId);
        }
      }
    })
  },
  /**
   * 跳转标签页
   */
  runTags: utils.throttle(function (e) {
    // 传入当前 TabID
    // 传入当前 Tab序号
    wx.navigateTo({
      url: '../tab-tags/tab-tags?currenttabid=' + e.currentTarget.dataset.currenttabid + '&currentindex=' + e.currentTarget.dataset.currentindex,
    })
  }),
  //swiper切换时会调用
  pagechange: function (e) {
    var idx = e.detail.current;
    var tagName = this.data.tagName;
    // 滑动切换 
    if (e.detail.source == 'touch') {
      this.setData({
        currentIndex: e.detail.current,
        currentTabId: this.data.tabList[idx].categoryId,
        currentTabName: this.data.tabList[idx].categoryName,
        page: 1,
        pageMax: false,
        activityList: [],
        tagName:'全部',
        labelId:''
      })
    }
    this.loadData();
  },
  //用户点击tab时调用
  titleClick: function (e) {
    let currentPageIndex;
    this.setData({
      //拿到当前索引并动态改变
      currentIndex: e.currentTarget.dataset.idx,
      currentTabId: e.currentTarget.dataset.categoryid,
      currentTabName: this.data.tabList[e.currentTarget.dataset.idx].categoryName,
      page: 1,
      pageMax: false,
      activityList: []
    })
    // this.loadData();
  },
  /**
   * 根据标签获取产品列表 
   * @param {标签ID} labelid 
   * @param {标签名} labelname 
   * @param {产品ID(Tab选项卡)} tabid 
   */
  getListByTag: function (labelid, labelname, tabid) {
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
          utils.ajax(params, app.globalData.basicURL + '/activity/getActivityList?labelId=' + labelid + '&page=' + _this.data.page + '&limit=' + _this.data.limit + '&categoryId=' + tabid);
        }
      }
    })
  }
})