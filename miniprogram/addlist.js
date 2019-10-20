import Dialog from "vant-weapp/dialog/dialog";
import Toast from "vant-weapp/toast/toast";

function addlist(detail) {
  wx.showLoading({
    mask: true
  })
  const db = wx.cloud.database();
  let actor = detail.casts.map((elem) => {
    return elem.name
  })
  actor = actor.join();
  if (wx.getStorageSync('signature')) {
    db.collection('mymovie')
      .where({
        id: detail.id
      })
      .get()
      .then(res => {
        if (res.data.length == 0) {
          db.collection('mymovie')
            .add({
              data: {
                pubdate: detail.mainland_pubdate,
                id: detail.id,
                img: detail.images.small,
                title: detail.title,
                rating: detail.rating.average,
                actor,
                signature: wx.getStorageSync('signature')
              }
            })
            .then(res => {
              wx.hideLoading();
              Toast.success({
                message: '添加成功',
                duration:1000
              })
            })
            .catch(err => {
              wx.hideLoading();
              Toast.fail({
                message: '添加成功',
                duration: 1000
              });
            })
        } else {
          wx.hideLoading();
          Toast.fail({
            message: '不能重复添加',
            duration: 1000
          })
        }
      })
      .catch(e => {
        console.log(e);
        wx.hideLoading();
      })

  } else {
    wx.hideLoading();
    Dialog.alert({
      title: '未授权',
      message: '请先授权'
    }).then(() => {
      console.log(1);
      wx.switchTab({
        url: '/pages/user/user',
      })
    });
  }
}
export default addlist;