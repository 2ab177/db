// pages/detail/detail.js
const db=wx.cloud.database();
import Dialog from 'vant-weapp/dialog/dialog';
import addlist from '../../addlist.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{},
    mbg:"",
    fbg:"",
    close:true,
    ltime:[],
  },
  addlist(){
    addlist(this.data.detail);
  },
  toplay(e){
    //事件委托
    if (e.target.dataset.u){
      wx.navigateTo({
        url: '/pages/play/play?u=' + e.target.dataset.u+'&id='+this.data.detail.id
      });
    }
  },
  changecolor(){
    //随机选择不同的背景颜色
    let n=Math.floor(Math.random()*6);
    switch (n){
      case 0:
        this.setData({
          mbg:"#4c4a46",
          fbg:"#434344"
        })
        break;
      case 1:
        this.setData({
          mbg: "#7f7163",
          fbg: "#726659"
        })
        break;
      case 2:
        this.setData({
          mbg: "#4c1311",
          fbg: "#44110f"
        })
        break;
      case 3:
        this.setData({
          mbg: "#393e4c",
          fbg: "#333844"
        })
        break;
      case 4:
        this.setData({
          mbg: "#4c0c0b",
          fbg: "#440b0a"
        })
        break;
      default:
        this.setData({
          mbg: "#68737f",
          fbg: "#5d6772"
        })
        break;
    }
  },
  open(){
    //展开电影简介
    this.setData({
      close:false
    })
  },
  loadDetail(options) {
    wx.showLoading({
      title: '加载中...',
      mask:true
    })
    let id = parseInt(options.id);
    //调用云函数请求数据
    wx.cloud.callFunction({
      name: "findDetail1905",
      data: {
        id
      }
    })
      .then(res => {
        let result = JSON.parse(res.result);
        result.rating.average = result.rating.average.toFixed(1);
        let nt=new Date().getTime();
        //对时间格式进行加工
        result.popular_comments.forEach((elem)=>{
          let time=elem.created_at.split(' ')[0];
          time = new Date(time).getTime();
          time = Math.floor((nt - time) / 86400000);
          if(Math.floor(time/365)>=1){
            this.data.ltime.push(Math.floor(time / 365)+'年前');
          } else if (Math.floor(time / 30) >= 1){
            this.data.ltime.push(Math.floor(time / 30) + '个月前');
          } else if (Math.floor(time / 7) >= 1){
            this.data.ltime.push(Math.floor(time / 7) + '周前');
          }else{
            if (Math.floor(time)==0){
              this.data.ltime.push('今天');
            }else{
              this.data.ltime.push(Math.floor(time) + '天前');
            }
          }
        })
        result.popular_reviews.forEach((elem)=>{
          let arr = [];
          arr.push(elem.id.slice(0,4));
          arr.push(elem.id.slice(4));
          elem.id=arr;
        })
        result.short_sum = result.summary.slice(0, 68)+'......';
        this.detail = result;
        this.setData({
          detail: result,
          ltime:this.data.ltime
        })
        wx.hideLoading();
      })
      .catch(err => {
        wx.hideLoading();
        console.log(err);
        Dialog.alert({
          title: '错误',
          message: '发生了未知错误'
        }).then(() => {
        });
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.changecolor();
    this.loadDetail(options);
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

  }
})