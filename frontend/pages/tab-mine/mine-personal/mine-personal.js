// pages/tab-mine/mine-personal/mine-personal.js
var utils = require("../../../utils/util.js");
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personalInfo: [], // 个人信息
    submitText: '保存信息', // 底部按钮文字
    clubIdx: 0, // 初始俱乐部ID
    clubArr: [], // 俱乐部列表
    countryArr: [], // 国家代码列表
    countryIdx: 0,
    countryId: 1,
    isMember: false,
    gender: true // 默认性别：男
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 检查更新
    utils.getUpdate();
    console.log(options.returnVip);
    if (options.returnVip != undefined) {
      this.setData({
        returnVip: true
      })
    } else if (options.returnDetail != undefined) {
      this.setData({
        returnDetail: true,
        activityid: options.activityid
      })
    }
    // 检查更新
    utils.getUpdate();

    // 获取俱乐部列表
    // this.getClubList().then(this.getCountryList().then(this.checkExistence()))
    // this.getClubList().then(this.getCountryList());
    var clubId = wx.getStorageSync('clubArr') != null ? wx.getStorageSync('clubArr')[0].clubId : 0;
    console.log(clubId);
    this.setData({
      clubArr: wx.getStorageSync('clubArr'),
      clubId: clubId,
      countryArr: wx.getStorageSync('countryArr'),
      countryId: wx.getStorageSync('countryArr')[0].Id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.checkExistence();
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
    wx.hideShareMenu();
  },
  /**
   * 切换俱乐部
   */
  bindClubChange: function (e) {
    this.setData({
      clubIdx: e.detail.value,
      clubId: this.data.clubArr[e.detail.value].clubId
    });
  },
  /**
   * 切换国家
   */
  bindCountryChange: function (e) {
    console.log(e.detail.value);
    console.log("id：" + this.data.countryArr[e.detail.value].id);
    this.setData({
      countryIdx: e.detail.value,
      countryId: this.data.countryArr[e.detail.value].id
    });
  },
  /**
   * 检查用户是否填写过信息
   */
  checkExistence: function () {
    var _this = this;
    var clubIdx = 0;
    var countryIdx = 0;
    var params = {
      isShowLoading: true,
      method: 'GET',
      success: function (res) {
        console.log(res);
        // 此用户非会员 且 未填写信息
        if (res.data.data == null) {
          _this.setData({
            isMember: false
          })
          // 非会员 且 已经填写信息
        } else if (res.data.data.vip == null) {

          var countryId = res.data.data.area.id;
          for (var i = 0; i < _this.data.countryArr.length; i++) {
            if (_this.data.countryArr[i].id == countryId) {
              countryIdx = i;
            }
          }
          _this.setData({
            personalInfo: res.data.data,
            submitText: '更新信息',
            isMember: false,
            date: res.data.data.birthday,
            gender: res.data.data.gender == 0 ? false : true,
            clubId: res.data.data.club != null ? res.data.data.club.clubId : null,
            clubIdx: clubIdx,
            countryId: res.data.data.area.id,
            countryIdx: countryIdx
          })
          // 已经成为会员
        } else {
          var clubId = res.data.data.club != null ? res.data.data.club.clubId : null;
          for (var i = 0; i < _this.data.clubArr.length; i++) {
            if (_this.data.clubArr[i].clubId == clubId) {
              clubIdx = i;
            }
          }

          var countryId = res.data.data.area.id;
          for (var i = 0; i < _this.data.countryArr.length; i++) {
            if (_this.data.countryArr[i].id == countryId) {
              countryIdx = i;
            }
          }

          _this.setData({
            personalInfo: res.data.data,
            submitText: '更新信息',
            isMember: true,
            date: res.data.data.birthday,
            clubId: res.data.data.club != null ? res.data.data.club.clubId : null,
            clubIdx: clubIdx,
            countryId: res.data.data.area.id,
            countryIdx: countryIdx
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
   * 选择生日
   */
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  /**
   * 切换性别
   */
  changeGender: function (e) {
    console.log(e.detail.value);
    if (e.detail.value == 0) {
      this.setData({
        gender: false
      });
    }
  },
  /**
   * 提交数据
   */
  formSubmit: utils.throttle(function (e) {
    var infoData = e.detail.value;
    console.log(infoData);
    var _this = this;
    //弹框时提示的内容
    var warn = "";
    //判断信息输入是否完整
    var flag = true;
    if (infoData.custom_surname == '') {
      warn = "请输入姓";
    } else if (infoData.custom_lastName == '') {
      warn = "请输入名"
    } else if (infoData.custom_name == '') {
      warn = "请输入姓名全拼"
    } else if (infoData.custom_wechat == '') {
      warn = "请输入微信号码"
    } else if (infoData.custom_phone == '') {
      warn = "请输入手机号码";
    } else if (infoData.ClubName == null && _this.data.isMember) {
      warn = "请选择加入俱乐部";
    } else if (infoData.birthday == null && _this.data.isMember) {
      warn = "请选择生日";
    } else if (infoData.custom_email == '') {
      warn = "请输入邮箱";
    } else if (infoData.custom_email.indexOf("@") < 0 || infoData.custom_email.trim().indexOf(" ") > 0) {
      warn = "请检查邮箱格式";
    } else if (infoData.custom_country == '') {
      warn = "请输入国家";
    } else if (infoData.custom_city == '') {
      warn = "请输入城市";
    } else if (infoData.custom_street == '') {
      warn = "请输入街道";
    } else if (infoData.custom_houseNum == '') {
      warn = "请输入门牌号";
    } else if (infoData.custom_postcode == '') {
      warn = "请输入邮编";
    } else {
      flag = false; //若必要信息都填写，则不用弹框，且页面可以进行跳转
      if (_this.data.submitText == "保存信息") {
        var params = {
          isShowLoading: true,
          method: 'POST',
          data: {
            userId: app.globalData.openid,
            firstName: infoData.custom_lastName,
            lastName: infoData.custom_surname,
            name: infoData.custom_name,
            gender: infoData.gender == true ? 1 : 0,
            wechatNum: infoData.custom_wechat,
            areaCode: _this.data.countryArr[infoData.country_code].id,
            mobile: infoData.custom_phone,
            email: infoData.custom_email,
            country: infoData.custom_country,
            city: infoData.custom_city,
            street: infoData.custom_street,
            houseNum: infoData.custom_houseNum,
            postcode: infoData.custom_postcode
          },
          success: function (res) {
            setTimeout(() => {
              wx.showToast({
                title: '保存成功',
                icon: "none",
                duration: 3000
              })
            }, 0);
            if (_this.data.returnDetail != true) {
              wx.reLaunch({
                url: '../mine-index/mine-index',
              })
            } else if (_this.data.returnVip != true) {
              wx.reLaunch({
                url: '../../tab-index/activity-detail/activity-detail?activityid=' + _this.data.activityid,
              })
            } else {
              wx.reLaunch({
                url: '../../tab-vip/vip-index/vip-index',
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
              utils.ajax(params, app.globalData.basicURL + '/user/firstregist');
            }
          }
        })
      } else if (_this.data.submitText == "更新信息") {
        if (_this.data.isMember) {
          var params = {
            isShowLoading: true,
            method: 'POST',
            data: {
              userId: app.globalData.openid,
              firstName: infoData.custom_lastName,
              lastName: infoData.custom_surname,
              name: infoData.custom_name,
              gender: infoData.gender == true ? 1 : 0,
              wechatNum: infoData.custom_wechat,
              areaCode: _this.data.countryArr[infoData.country_code].id,
              mobile: infoData.custom_phone,
              birthday: infoData.birthday,
              clubId: _this.data.clubId,
              email: infoData.custom_email,
              country: infoData.custom_country,
              city: infoData.custom_city,
              street: infoData.custom_street,
              houseNum: infoData.custom_houseNum,
              postcode: infoData.custom_postcode
            },
            success: function (res) {
              setTimeout(() => {
                wx.showToast({
                  title: '修改成功',
                  icon: "none",
                  duration: 3000
                })
              }, 0);
              if (_this.data.returnVip != true) {
                wx.reLaunch({
                  url: '../mine-index/mine-index',
                })
              } else {
                wx.reLaunch({
                  url: '../../tab-vip/vip-index/vip-index',
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
                utils.ajax(params, app.globalData.basicURL + '/user/updateUserById');
              }
            }
          })
        } else {
          var params = {
            isShowLoading: true,
            method: 'POST',
            data: {
              userId: app.globalData.openid,
              firstName: infoData.custom_lastName,
              lastName: infoData.custom_surname,
              name: infoData.custom_name,
              wechatNum: infoData.custom_wechat,
              gender: infoData.gender == true ? 1 : 0,
              areaCode: _this.data.countryArr[infoData.country_code].id,
              mobile: infoData.custom_phone,
              email: infoData.custom_email,
              country: infoData.custom_country,
              city: infoData.custom_city,
              street: infoData.custom_street,
              houseNum: infoData.custom_houseNum,
              postcode: infoData.custom_postcode
            },
            success: function (res) {
              setTimeout(() => {
                wx.showToast({
                  title: '修改成功',
                  icon: "none",
                  duration: 3000
                })
              }, 0);
              wx.reLaunch({
                url: '../mine-index/mine-index',
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
                utils.ajax(params, app.globalData.basicURL + '/user/updateUserById');
              }
            }
          })
        }
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
  /**
   * 阅读隐私条款
   */
  runPrivacy: utils.throttle(function (e) {
    wx.navigateTo({
      url: '../mine-privacy/mine-privacy',
    })
  }, 1000),
  /**
   * 阅读隐私条款
   */
  runAgreement: utils.throttle(function (e) {
    wx.navigateTo({
      url: '../mine-agreement/agreement',
    })
  }, 1000),
})