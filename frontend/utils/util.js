const formatTime = date => {
  let mydate = new Date(date);
  const year = mydate.getFullYear()
  const month = mydate.getMonth() + 1
  const day = mydate.getDate()
  const hour = mydate.getHours()
  const minute = mydate.getMinutes()
  const second = mydate.getSeconds()

  // return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 数据请求
function ajax(params, url) {
  const data = params.data || {};
  const isShowLoading = params.isShowLoading === false ? false : true;
  const method = params.method || 'GET';
  if (isShowLoading) {
    wx.showLoading({
      title: '加载中…',
      mask: true
    })
  };

  wx.request({
    url: url,
    method: method,
    data: data,
    header: {
      Accept: 'application/json',
      'Content-Type': method === 'GET' ? 'application/json' : 'application/x-www-form-urlencoded',
    },
    success(result) {
      params.success && params.success(result);
    },
    fail(result) {
      if (params.fail) {
        params.fail(result);
      }
      else {
        showNetworkError('fail');
      }
    },
    complete(result) {
      if (isShowLoading) {
        wx.hideLoading();
      }
      if (params.complete) {
        params.complete(result);
      }
      else if (result.statusCode === 404) {
        showNetworkError('complete 404');
      }
    },
  })

}

// 检查更新 
function getUpdate() {
  //检查是否存在新版本
  wx.getUpdateManager().onCheckForUpdate(function (res) {
    // 请求完新版本信息的回调
    if (res.hasUpdate) {//如果有新版本
      // 小程序有新版本，会主动触发下载操作（无需开发者触发）
      wx.getUpdateManager().onUpdateReady(function () {//当新版本下载完成，会进行回调
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，单击确定重启应用',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              wx.getUpdateManager().applyUpdate();
            }
          }
        })

      })

      // 小程序有新版本，会主动触发下载操作（无需开发者触发）
      wx.getUpdateManager().onUpdateFailed(function () {//当新版本下载失败，会进行回调
        wx.showModal({
          title: '提示',
          content: '检查到有新版本，但下载失败，请检查网络设置',
          showCancel: false,
        })
      })
    }
  });
}

// 函数节流
function throttle(fn, gapTime) {
  if (gapTime == null || gapTime == undefined) {
    gapTime = 1500
  }

  let _lastTime = null
  return function () {
    let _nowTime = + new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(this, arguments)   //将this和参数传给原函数
      _lastTime = _nowTime
    }
  }
}

module.exports = {
  formatTime: formatTime,
  ajax: ajax,
  getUpdate: getUpdate,
  throttle: throttle
}
