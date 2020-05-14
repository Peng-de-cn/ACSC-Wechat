// pages/tab-mine/mine-activities/mine-activities.js
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData();
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
  loadData: function () {
    var _this = this;
    var params = {
      isShowLoading: true,
      method: 'GET',
      success: function (res) {
        console.log(res);
        // 没有请求到新的数据  &&  问题列表里面也没有数据，此时显示 暂无数据
        if (res.data.data.useractivities == null) {
          _this.setData({
            activityList: [],
            showNoDate: !_this.data.showNoDate
          })
        }
        // 没有请求到新的数据  &&  问题列表里面有数据，此时显示 加载到底
        else if (res.data.data.useractivities.length == 0 && _this.data.activityList.length != 0) {

          _this.setData({
            pageMax: true
          })
        } else {

          let newData = _this.data.activityList;
          for (let i = 0; i < res.data.data.useractivities.length; i++) {
            newData.push(res.data.data.useractivities[i]);
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
          utils.ajax(params, app.globalData.basicURL + '/activity/queryUserActivity?userId=' + app.globalData.openid);
        }
      }
    })
  },
  /**
   * 继续支付
   */
  continuePayment: function (e) {
    console.log(e)
    var _this = this;
    var params = {
      isShowLoading: true,
      method: 'POST',
      data: {
        openId: app.globalData.openid,
        orderNumber: e.currentTarget.dataset.id
      },
      success: function (res) {
        console.log(res);

        if (res.data.status == false) {
          setTimeout(() => {
            wx.showToast({
              title: '此订单已过期，请重新下单...',
              icon: "success",
              duration: 3000
            })
          }, 0);
          // _this.setData({
          //   activityList: []
          // })
          // _this.loadData();
        } else {
          let appid = res.data.data.appid;
          let nonceStr = res.data.data.nonceStr;
          let mypackage = res.data.data.package;
          let paySign = res.data.data.paySign;
          let timeStamp = res.data.data.timeStamp;

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
                _this.setData({
                  activityList: []
                })
                _this.loadData();
              }
            },
            fail(res) {
              if (res.errMsg == "requestPayment:fail cancel") {
                setTimeout(() => {
                  wx.showToast({
                    title: '支付取消',
                    icon: "none",
                    duration: 3000
                  })
                }, 0);
              }
            }
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
          utils.ajax(params, app.globalData.basicURL + '/wx/pay');
        }
      }
    })
  },
  /**
   * 删除订单
   */
  delOrder: function (e) {
    let orderId = e.currentTarget.dataset.id;
    var _this = this;
    wx.showModal({
      title: '删除',
      content: '是否删除此订单？',
      success(res) {
        if (res.confirm) {
          var params = {
            isShowLoading: true,
            method: 'POST',
            data: {
              orderNumber: orderId
            },
            success: function (res) {
              _this.setData({
                activityList: []
              })
              _this.loadData();
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
                utils.ajax(params, app.globalData.basicURL + '/activity/removeUserActivity');
              }
            }
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })




  }
})