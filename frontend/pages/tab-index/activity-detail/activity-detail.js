// pages/tab-index/activity-detail/activity-detail.js
const app = getApp();
var utils = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    indicatorDots: true,
    vertical: false, // 是否垂直滚动
    autoplay: false, // 是否自动滚动
    interval: 2000,
    duration: 500,
    activityDetail: [],
    options: [], // 活动套餐选择
    currentOption: '', // 默认选择活动套餐
    collection: false // 是否收藏
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      activityid: options.activityid
    })
    this.loadData(options.activityid);
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
   * 加载数据
   */
  loadData: function (activityid) {
    var _this = this;
    var params = {
      isShowLoading: true,
      method: 'GET',
      success: function (res) {
        console.log(res);
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
            activityDetail: res.data.data,
            options: res.data.data.packages,
            swiperList: res.data.data.imageArr,
            currentOption: res.data.data.packages[0].packageId,
            collection: res.data.data.isfavorite
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
          utils.ajax(params, app.globalData.basicURL + '/activity/getOneActivity?activityId=' + _this.data.activityid + "&userId=" + app.globalData.openid);
        }
      }
    })
  },
  /**
   * 打电话
   */
  callPhone: utils.throttle(function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone //仅为示例，并非真实的电话号码
    })
  }),
  /**
   * 跳转webView
   */
  runWebview: utils.throttle(function (e) {
    wx.navigateTo({
      url: '../activity-webview/activity-webview?detail=' + encodeURIComponent(e.currentTarget.dataset.detail),
    })
  }),
  /**
   * 切换套餐选择
   */
  chooseOption: function (options) {
    this.setData({
      currentOption: options.currentTarget.dataset.optionid
    })
  },
  /**
   * 收藏/取消收藏
   */
  collection: utils.throttle(function (e) {
    let activityid = e.currentTarget.dataset.activityid
    var _this = this;
    // 取消收藏
    if (this.data.collection) {
      var params = {
        isShowLoading: true,
        method: 'GET',
        success: function (res) {
          if (res.data == null) {
            setTimeout(() => {
              wx.showToast({
                title: '数据绑定失败，请稍后重试…',
                icon: "none",
                duration: 3000
              })
            }, 0);
          } else {
            console.log(res);
            _this.setData({
              collection: !_this.data.collection
            })
            setTimeout(() => {
              wx.showToast({
                title: '取消成功...',
                icon: "success",
                duration: 3000
              })
            }, 0);
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
            utils.ajax(params, app.globalData.basicURL + '/favorite/deleteFavorite?activityId=' + activityid + "&userId=" + app.globalData.openid);
          }
        }
      })
      // 收藏
    } else {
      var params = {
        isShowLoading: true,
        method: 'GET',
        success: function (res) {
          if (res.data == null) {
            setTimeout(() => {
              wx.showToast({
                title: '数据绑定失败，请稍后重试…',
                icon: "none",
                duration: 3000
              })
            }, 0);
          } else {
            console.log(res);
            _this.setData({
              collection: !_this.data.collection
            })
            setTimeout(() => {
              wx.showToast({
                title: '收藏成功...',
                icon: "success",
                duration: 3000
              })
            }, 0);
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
            utils.ajax(params, app.globalData.basicURL + '/favorite/insertFavorite?activityId=' + activityid + "&userId=" + app.globalData.openid);
          }
        }
      })
    }

  }),
  /**
   * 检查用户是否填写过信息
   */
  checkExistence: function (e) {
    var _this = this;
    var activityid = e.currentTarget.dataset.activityid;
    var params = {
      isShowLoading: true,
      method: 'GET',
      success: function (res) {
        if (res.data.data == null) {
          wx.navigateTo({
            url: '../../tab-mine/mine-personal/mine-personal',
          })
        } else {
          _this.submitData(activityid);
        }

        // setTimeout(() => {
        //   wx.showToast({
        //     title: '保存成功',
        //     icon: "none",
        //     duration: 3000
        //   })
        // }, 0);
        // wx.reLaunch({
        //   url: '../mine-index/mine-index',
        // })
      },
      fail: function (res) {
        setTimeout(() => {
          wx.showToast({
            title: '数据提交失败，请稍后再试…',
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
  /**
   * 立即报名
   */
  submitData: utils.throttle(function (activityid) {
    let _this = this;
    // let activityid = e.currentTarget.dataset.activityid;
    var params = {
      isShowLoading: true,
      method: 'GET',
      success: function (res) {
        console.log(res);
        // 可以报名
        if (res.data.status) {
          let appid = res.data.data.appid;
          let nonceStr = res.data.data.nonceStr;
          let mypackage = res.data.data.package;
          let paySign = res.data.data.paySign;
          let timeStamp = res.data.data.timeStamp;

          if (res.data == null) {
            setTimeout(() => {
              wx.showToast({
                title: '数据绑定失败，请稍后重试…',
                icon: "none",
                duration: 3000
              })
            }, 0);
          } else {
            wx.requestPayment({
              timeStamp: timeStamp,
              nonceStr: nonceStr,
              package: mypackage,
              signType: 'MD5',
              paySign: paySign,
              success(res) {
                if (res.errMsg == "requestPayment:ok") {
                  setTimeout(() => {
                    wx.showToast({
                      title: '支付成功',
                      icon: "success",
                      duration: 3000
                    })
                  }, 0);
                  _this.loadData();
                }
              },
              fail(res) {
                if (res.errMsg == "requestPayment:fail cancel") {
                  setTimeout(() => {
                    wx.showToast({
                      title: '支付取消，请移至“我的活动”页面查看',
                      icon: "none",
                      duration: 3000
                    })
                  }, 0);
                }
              }
            })
          }
        }
        // 报名重复
        else {
          setTimeout(() => {
            wx.showToast({
              title: '您已报名，请移至“我的活动”页面查看',
              icon: "none",
              duration: 3000
            })
          }, 0);
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
          utils.ajax(params, app.globalData.basicURL + '/activity/addUserActivity?activityId=' + activityid + "&userId=" + app.globalData.openid + "&packageId=" + _this.data.currentOption);
        }
      }
    })
  })
})