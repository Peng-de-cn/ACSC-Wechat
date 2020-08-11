//app.js
var utils = require("utils/util.js");
App({
  data: {

  },
  onLaunch: function () {
    let _this = this;
    _this.getClubList();
    _this.getCountryList();
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: 'https://api.acsclub.net/weixinLogin/login?jscode=' + res.code,
          // url: 'http://baizhisys.ngrok.yangz.info:10010/weixinLogin/login?jscode=' + res.code,
          success: function (res) {
            _this.globalData.openid = JSON.parse(res.data.data).openid
          },
          fail: function (err) {
            console.log(err);
          },
          complete: function (res) {}
        })
      }
    })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  /**
   * 获取俱乐部列表
   */
  getClubList: function () {
    var _this = this;
    return new Promise((resolve, reject) => {
      var params = {
        isShowLoading: true,
        method: 'GET',
        success: function (res) {
          wx.setStorageSync('clubArr', res.data.data);
          // _this.setData({
          //   clubArr: res.data.data,
          //   clubId: res.data.data[0].clubId
          // })
          resolve();
        },
        fail: function (res) {
          setTimeout(() => {
            wx.showToast({
              title: '数据提交失败，请稍后再试…',
              icon: "none",
              duration: 3000
            })
          }, 0);
          reject();
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
            utils.ajax(params, getApp().globalData.basicURL + '/club/getlist?page=1&limit=99');
          }
        }
      })
    })


  },
  /**
   * 获取国家列表
   */
  getCountryList: function () {
    var _this = this;
    return new Promise((resolve, reject) => {
      var params = {
        isShowLoading: true,
        method: 'GET',
        success: function (res) {
          console.log(res);
          wx.setStorageSync('countryArr', res.data.data)
          // _this.setData({
          //   countryArr: res.data.data,
          //   countryId: res.data.data[0].Id
          // })
          resolve();
        },
        fail: function (res) {
          setTimeout(() => {
            wx.showToast({
              title: '数据提交失败，请稍后再试…',
              icon: "none",
              duration: 3000
            })
          }, 0);
          reject();
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
            utils.ajax(params, getApp().globalData.basicURL + '/area/list');
          }
        }
      })
    })
  },
  globalData: {
    // basicURL: "http://baizhisys.ngrok.yangz.info:10010",
    basicURL: "https://api.acsclub.net",
    openid: '',
    userInfo: null
  }
})