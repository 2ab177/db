// pages/play/play.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    u: '',
    movielist: {},
    sys: '',
    fixed:false,
    vheight:0,
    vhei:''
  },
  getsys() {
    //判断手机系统
    var sys;
    wx.getSystemInfo({
      success(res) {
        if (res.system.search(/ios/i) != -1) {
          sys = 'App Store'
        } else {
          sys = '安卓应用商店'
        }
      }
    });
    this.setData({
      sys
    })
  },
  onPageScroll(e) {
    if(e.scrollTop>=this.vheight){
      this.setData({
        fixed:true
      })
    }else{
      this.setData({
        fixed: false
      })
    }
  },
  queryMultipleNodes() {
    var query = wx.createSelectorQuery()
    query.select('#vid').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec((res) => {
      this.vheight=res[0].top;
      this.setData({
        vhei:'padding-bottom:'+res[0].height +'px'
      });
    })
  },
  toplay(e) {
    //事件委托
    if (e.target.dataset.u) {
      this.setData({
        u: e.target.dataset.u
      })
    }
  },
  loadMovie(options) {
    wx.showLoading({
      title: '加载中...',
    })
    //调用云函数请求数据
    var id = parseInt(options.id);
    wx.cloud.callFunction({
        name: "findDetail1905",
        data: {
          id
        }
      })
      .then(res => {
        var result = JSON.parse(res.result);
        if (options.u) {
          this.setData({
            u: options.u
          })
        } else {
          this.setData({
            u: result.trailers[0].resource_url
          })
        }
        this.setData({
          movielist: result
        })
        wx.hideLoading();
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.loadMovie(options);
    this.getsys();
    this.queryMultipleNodes();
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

  }
})