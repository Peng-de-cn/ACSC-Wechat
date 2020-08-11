// custom-tab-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    selected: 0,
    color: "#636465",
    selectedColor: "#1788fa",
    list: [{
        "pagePath": "/pages/tab-index/activity-list/activity-list",
        "iconPath": "/images/index.png",
        "selectedIconPath": "/images/index_active.png",
        "text": "首页"
      },
      // {
      //   "pagePath": "/pages/tab-shopping-mall/tab-shopping-mall",
      //   "iconPath": "/images/shop.png",
      //   "selectedIconPath": "/images/shop_active.png",
      //   "text": "商城"
      // },
      {
        "pagePath": "/pages/tab-vip/vip-index/vip-index",
        "iconPath": "/images/vip.png",
        "selectedIconPath": "/images/vip.png",
        "text": "会员卡"
      },
      // {
      //   "pagePath": "/pages/tab-shopping-cart/tab-shopping-cart",
      //   "iconPath": "/images/shoppingcart.png",
      //   "selectedIconPath": "/images/shoppingcart_active.png",
      //   "text": "购物车"
      // },
      {
        "pagePath": "/pages/tab-mine/mine-index/mine-index",
        "iconPath": "/images/mine.png",
        "selectedIconPath": "/images/mine_active.png",
        "text": "我的"
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({
        url: url
      })
      this.setData({
        selected: data.index
      })
    }
  }
})