// pages/wantw/wantw.js
const db=wx.cloud.database();
import Dialog from "vant-weapp/dialog/dialog"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myMovieList:[]
  },

  wMovie(e){
    //e.target.dataset.i=0时会隐式转换为false
    //删除功能
    
    if (e.target.dataset.i!==undefined) {
      Dialog.confirm({
        message: '确定要删除吗'
      }).then(() => {
        var i = parseInt(e.target.dataset.i);
        db.collection('mymovie')
          .doc(this.data.myMovieList[i]._id)
          .remove()
          .then(res => {
            console.log(res);
            this.getMList();
          }).catch(err => {
            console.log(err);
          })
      }).catch(() => {
        // on cancel
      });
    }
    //看预告片
    if (e.target.dataset.id){
      //事件委托
        wx.navigateTo({
          url: '/pages/play/play?id=' + e.target.dataset.id
        });
    } 
    
  },
  getMList() {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    if (wx.getStorageSync('signature')){
      db.collection('mymovie')
        .where({
          signature: wx.getStorageSync('signature')
        })
        .get()
        .then(res => { 
          wx.hideLoading();
          this.myMovieList = res.data;
          this.setData({
            myMovieList: res.data
          })
        })
        .catch(e => { wx.hideLoading(); console.log(e)});
    }else{
      wx.hideLoading()
      this.setData({
        myMovieList: []
      })
      Dialog.alert({
        title: '未授权',
        message: '请先授权'
      }).then(() => {
        wx.switchTab({
          url: '/pages/user/user',
        })
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
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
    this.getMList();
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