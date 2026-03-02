// pages/heart-rate-records/heart-rate-records.js
Page({
  data: {
    records: [
      { date: '2024-01-20', time: '08:00', value: '72' },
      { date: '2024-01-19', time: '08:00', value: '75' },
      { date: '2024-01-18', time: '08:00', value: '73' }
    ]
  },
  
  onLoad(options) {
    // 页面加载时的初始化操作
    console.log('心率记录页面加载', options);
  }
})