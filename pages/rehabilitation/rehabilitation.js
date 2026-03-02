// pages/rehabilitation/rehabilitation.js
Page({
  data: {
    trainingRecords: [
      { date: '2024-01-20', time: '09:00', content: '上肢康复训练', duration: '30分钟' },
      { date: '2024-01-19', time: '15:00', content: '下肢康复训练', duration: '25分钟' },
      { date: '2024-01-18', time: '10:00', content: '平衡训练', duration: '20分钟' }
    ]
  },
  
  onLoad() {
    // 页面加载时的初始化操作
    console.log('康复训练页面加载');
  },
  
  // 开始训练
  startTraining() {
    wx.showModal({
      title: '开始训练',
      content: '训练功能将在后续版本中实现',
      showCancel: false
    });
  },
  
  // 播放视频
  playVideo() {
    wx.showModal({
      title: '播放视频',
      content: '视频播放功能将在后续版本中实现',
      showCancel: false
    });
  }
})