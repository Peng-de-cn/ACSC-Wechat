// pages/tab-vip/vip-index/vip-index.js
var utils = require("../../../utils/util.js");
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vipList: [],
    personalInfo: [],
    defaultLevel: 'normal',
    defaultId: 1,
    normal: true,
    vipNum: '',
    isInit: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // 检查更新
    utils.getUpdate();
    // 查询用户信息
    this.checkExistence();

    // 获取VIP列表
    this.getVIPList();
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
        selected: 1
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
   * 检查用户是否填写过信息
   */
  checkExistence: function () {
    var _this = this;
    var params = {
      isShowLoading: true,
      method: 'GET',
      success: function (res) {
        if (res.data.data == null) {
          setTimeout(() => {
            wx.showToast({
              title: '请填写个人资料…',
              icon: "none",
              duration: 3000
            })
          }, 0);
          wx.navigateTo({
            url: '../../tab-mine/mine-personal/mine-personal?returnVip=returnVip',
          })
        } else {
          let vipNum = res.data.data.vipNum ? res.data.data.vipNum : '';
          vipNum = vipNum.replace(/\s/g, '').replace(/(.{4})/g, "$1 ");

          _this.setData({
            isInit: true,
            personalInfo: res.data.data,
            vipNum: vipNum
          })
        }
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
   * 获取会员列表
   */
  getVIPList: function () {
    var _this = this;
    var params = {
      isShowLoading: true,
      method: 'GET',
      success: function (res) {
        // 没有请求到新的数据  &&  问题列表里面也没有数据，此时显示 暂无数据
        if (res.data.data.vips.length == 0 && _this.data.vips.length == 0) {
          _this.setData({
            vipList: []
          })
        } else {
          let newData = [];
          let vipId = res.data.data.vips[0].vipId;
          console.log(vipId);
          for (let i = 0; i < res.data.data.vips.length; i++) {
            newData.push(res.data.data.vips[i]);
          }
          _this.setData({
            vipList: newData,
            defaultId: vipId
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
          utils.ajax(params, app.globalData.basicURL + '/vip/getVipList');
        }
      }
    })
  },
  /**
   * 成为会员
   */
  regeisterVIP: function (e) {
    console.log(this.data.personalInfo.length == 0);;
    console.log(this.data.vipNum == '');
    if (this.data.personalInfo.length == 0 && this.data.vipNum == '') {
      setTimeout(() => {
        wx.showToast({
          title: '请填写个人资料…',
          icon: "none",
          duration: 3000
        })
      }, 0);
      wx.navigateTo({
        url: '../../tab-mine/mine-personal/mine-personal?returnVip=returnVip',
      })
    } else {
      wx.navigateTo({
        url: '../vip-form/vip-form?level=' + this.data.defaultLevel + "&vipid=" + this.data.defaultId,
      })
    }
  },
  /**
   * 修改资料
   */
  updateInfo: function () {
    wx.navigateTo({
      url: '../../tab-mine/mine-personal/mine-personal?returnVip=returnVip',
    })
  },
  /**
   * 续费VIP
   */
  renewVIP: function () {
    var _this = this;
    var params = {
      isShowLoading: true,
      method: 'GET',
      success: function (res) {
        console.log(res);
        if (res.data.errmsg == 'SUCCESS') {
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
            },
            complete(res) {
              _this.setData({
                personalInfo: []
              })
              // 查询用户信息
              _this.checkExistence();
            }
          })
        }
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
          utils.ajax(params, app.globalData.basicURL + '/user/vipRenewal?userId=' + app.globalData.openid);
        }
      }
    })
  },
  /**
   * 升级VIP
   */
  upgradeVIP: function (e) {
    var _this = this;
    var params = {
      isShowLoading: true,
      method: 'GET',
      success: function (res) {
        console.log(res);
        if (res.data.errmsg == 'SUCCESS') {
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
            },
            complete(res) {
              _this.setData({
                personalInfo: []
              })
              // 查询用户信息
              _this.checkExistence();
            }
          })
        }
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
          utils.ajax(params, app.globalData.basicURL + '/user/vipUpgrade?userId=' + app.globalData.openid + '&vipId=' + e.currentTarget.dataset.vipid);
        }
      }
    })
  },
  /**
   * 切换普通会员和VIP会员
   */
  switchVip: function (e) {
    console.log(e.detail.value);
    let id = e.detail.value;
    let _this = this;

    if (id == 1) {
      _this.setData({
        defaultLevel: 'normal',
        defaultId: id,
        normal: true
      })
    } else if (id == 2) {
      _this.setData({
        defaultLevel: 'senior',
        defaultId: id,
        normal: false
      })
    }

  }
})