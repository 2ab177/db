// pages/index01/index01.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // fixed:false,
    start:21,
    rylist:[],
    rmlist:[],
    xylist:[],
    xjlist:[],
    wntjlist:[],
    dbbdlist:[]
  },
  detail(e) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.target.dataset.id
    });
  },
  onChange(event) {
    this.setData({
      value: event.detail
    });
  },
  loadwntj(){
    wx.showLoading({
      title: '正在加载中...',
    })
    wx.cloud.callFunction({
      name: "movielist1905",
      data: { start: this.data.start, count: 4 }
    })
      .then(res => {
        var result = JSON.parse(res.result);
        this.setData({ wntjlist: this.data.wntjlist.concat(result.subjects) });
        wx.hideLoading();
      })
      .catch(err => {
        console.log(err);
      })
    this.data.start += 4;
  },
  loadMore(start,list,count) {
    wx.showLoading({
      title: '正在加载中...',
    })
    wx.cloud.callFunction({
      name: "movielist1905",
      data: { start, count }
    })
      .then(res => {
        var result = JSON.parse(res.result);
        this.setData({ [list]: result.subjects });
        wx.hideLoading();
      })
      .catch(err => {
        console.log(err);
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMore(0,'rylist',6);
    this.loadMore(6, 'rmlist',6);
    this.loadMore(12, 'xylist',3);
    this.loadMore(15, 'xjlist',3);
    this.loadMore(18, 'dbbdlist', 3);
    this.loadwntj();
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
    this.loadwntj();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})