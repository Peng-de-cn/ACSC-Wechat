// pages/tab-mine/mine-personal/mine-personal.js
var utils = require("../../../utils/util.js");
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 检查更新
    utils.getUpdate();
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
    wx.hideShareMenu();
  },
  /**
   * 提交数据
   */
  formSubmit: utils.throttle(function(e) {
    var infoData = e.detail.value;
    console.log(infoData);
    var _this = this;
    //弹框时提示的内容
    var warn = "";
    //判断信息输入是否完整
    var flag = true;
    if (infoData.custom_surname == '') {
      warn = "请输入姓";
    } else if (infoData.custom_name == '') {
      warn = "请输入名"
    } else if (infoData.custom_wechat == '') {
      warn = "请输入微信号码"
    } else if (infoData.custom_phone == '') {
      warn = "请输入手机号码";
    } else if (infoData.custom_spare_phone == '') {
      warn = "请输入备用号码";
    } else if (infoData.custom_email == '') {
      warn = "请输入邮箱";
    } else if (infoData.custom_address == '') {
      warn = "请输入地址";
    } else {
      flag = false; //若必要信息都填写，则不用弹框，且页面可以进行跳转
      var params = {
        isShowLoading: true,
        method: 'POST',
        data: {
          realName: _this.data.realName,
          gender: _this.data.gender,
          phone: _this.data.phone,
          qq: _this.data.qq,
          profession: _this.data.profession,
          city: _this.data.city,
          job: infoData.job,
          interest: infoData.interest,
          confidence: infoData.confidence,
          planning: infoData.planning,
          wage: infoData.wage,
          workPlace: infoData.workPlace,
          level: infoData.level,
          agree: infoData.agree == '愿意' ? true : false
        },
        success: function(res) {
          setTimeout(() => {
            wx.showToast({
              title: '数据提交成功',
              icon: "none",
              duration: 3000
            })
          }, 0);
          wx.reLaunch({
            url: '../mine-index/mine-index',
          })
        },
        fail: function(res) {
          setTimeout(() => {
            wx.showToast({
              title: '数据提交失败，请稍后再试…',
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
            utils.ajax(params, app.globalData.basicURL + '/questionnaire/data/save');
          }
        }
      })
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