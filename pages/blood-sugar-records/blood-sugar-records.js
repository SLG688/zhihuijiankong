// pages/blood-sugar-records/blood-sugar-records.js
Page({
  data: {
    records: [
      { date: '2024-01-20', time: '07:30', value: '5.8' },
      { date: '2024-01-19', time: '07:30', value: '5.6' },
      { date: '2024-01-18', time: '07:30', value: '5.7' }
    ]
  },
  
  onLoad(options) {
    // 页面加载时的初始化操作
    console.log('血糖记录页面加载', options);
  },
  
  // 跳转到紧急求助页面
  goToEmergency() {
    console.log('点击紧急求助按钮');
    wx.switchTab({
      url: '../emergency/emergency',
      success: function(res) {
        console.log('跳转成功:', res);
      },
      fail: function(res) {
        console.log('跳转失败:', res);
        wx.showToast({
          title: '跳转失败，请稍后重试',
          icon: 'none'
        });
      }
    });
  }
})