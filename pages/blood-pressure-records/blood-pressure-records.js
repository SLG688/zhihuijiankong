// pages/blood-pressure-records/blood-pressure-records.js
Page({
  data: {
    records: [
      { date: '2024-01-20', time: '08:00', value: '125/85' },
      { date: '2024-01-19', time: '08:00', value: '120/80' },
      { date: '2024-01-18', time: '08:00', value: '122/82' }
    ]
  },
  
  onLoad(options) {
    // 页面加载时的初始化操作
    console.log('血压记录页面加载', options);
  }
})