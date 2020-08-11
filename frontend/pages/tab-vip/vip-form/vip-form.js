// pages/tab-vip/vip-form/vip-form.js
var utils = require("../../../utils/util.js");
//获取应用实例
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    date: "",
    level: '',
    levelText: '',
    clubIdx: 0,
    clubArr: [],
    vipid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 检查更新
    utils.getUpdate();
    console.log(options);
    if (options.level == 'normal') {
      this.setData({
        level: 'normal',
        levelText: '成为普通会员',
        vipid: options.vipid
      })
    } else if (options.level == 'senior') {
      this.setData({
        level: 'senior',
        levelText: '成为高级会员',
        vipid: options.vipid
      })
    }
    // 获取俱乐部列表
    this.getClubList();

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
   * 切换俱乐部
   */
  bindClubChange: function (e) {
    console.log(this.data.clubArr[e.detail.value].clubName);
    this.setData({
      clubId: this.data.clubArr[e.detail.value].clubId,
      clubIdx: e.detail.value
    });
  },
  /**
   * 获取俱乐部列表
   */
  getClubList: function () {
    var _this = this;
    var params = {
      isShowLoading: true,
      method: 'GET',
      success: function (res) {
        _this.setData({
          clubArr: res.data.data,
          clubId: res.data.data[0].clubId
        })
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
      complete: function (res) {
        wx.hideLoading();
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
          utils.ajax(params, app.globalData.basicURL + '/club/getlist');
        }
      }
    })
  },
  /**
   * 选择生日
   */
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  /**
   * 提交数据
   */
  formSubmit: utils.throttle(function (e) {
    var infoData = e.detail.value;
    var _this = this;
    //弹框时提示的内容
    var warn = "";
    //判断信息输入是否完整
    var flag = true;
    if (infoData.birthday == '') {
      warn = "请选择生日";
    } else if (infoData.ClubName == null) {
      warn = "请选择加入的俱乐部"
    } else {
      flag = false; //若必要信息都填写，则不用弹框，且页面可以进行跳转

      if (_this.data.level == 'normal') {
        var params = {
          isShowLoading: true,
          method: 'GET',
          success: function (res) {
            console.log(res);
            setTimeout(() => {
              wx.showToast({
                title: '加入会员成功…',
                icon: "none",
                duration: 3000
              })
            }, 0);
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
          complete: function (res) {
            wx.hideLoading();
            wx.reLaunch({
              url: '../vip-index/vip-index',
            })
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
              utils.ajax(params, app.globalData.basicURL + '/user/joinVip?userId=' + app.globalData.openid + '&vipId=' + _this.data.vipid + '&clubId=' + _this.data.clubId + '&birthday=' + _this.data.date);
            }
          }
        })
      } else if (_this.data.level == 'senior') {
        var params = {
          isShowLoading: true,
          method: 'GET',
          success: function (res) {
            console.log(res);
            if (res.data.data) {
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
                        title: '加入会员成功',
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
                        title: '支付取消...',
                        icon: "none",
                        duration: 3000
                      })
                    }, 0);
                  }
                },
                complete(res) {
                  wx.reLaunch({
                    url: '../vip-index/vip-index',
                  })
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
          complete: function (res) {
            wx.hideLoading();
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
              utils.ajax(params, app.globalData.basicURL + '/user/joinVip?userId=' + app.globalData.openid + '&vipId=' + _this.data.vipid + '&clubId=' + _this.data.clubId + '&birthday=' + _this.data.date);
            }
          }
        })
      }

    }
    //如果信息填写不完整，弹出输入框
    if (flag == true) {
      wx.showModal({
        title: '提示',
        content: warn
      })
    }
  }, 1000),
})