// pages/user/user.js
const db = wx.cloud.database();
import Dialog from "vant-weapp/dialog/dialog"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logined: false,
    userData: {}
  },

  loginout() {
    Dialog.confirm({
      title: '注销',
      message: '确定要退出吗'
    }).then(() => {
      wx.clearStorage();
      this.setData({
        logined: false,
        userData: {}
      })
    }).catch(() => {
      // on cancel
    });

  },
  getUser(res) {
    if (res.detail) {
      var userData = JSON.parse(res.detail.rawData);
      wx.setStorage({
        key: 'userData',
        data: userData
      })
      wx.setStorage({
        key: 'uname',
        data: userData.nickName
      })
      this.setData({
        userData,
        logined: true
      })
      db.collection('mymovie')
        .doc(userData.nickName)
        .get()
        .then(res => {
          console.log("succ");
        })
        .catch(res => {
          db.collection('mymovie')
            .doc(userData.nickName)
            .set({
              data: {
                movielist: []
              }
            })
            .then(res => console.log(res))
            .catch(res => console.log(res))
        })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      logined: wx.getStorageSync('uname') ? true : false,
      userData: wx.getStorageSync('userData') ? wx.getStorageSync('userData') : {}
    });
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