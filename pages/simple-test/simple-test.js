// pages/simple-test/simple-test.js
Page({
  data: {
    message: '测试页面',
    items: [
      { id: 1, name: '项目1' },
      { id: 2, name: '项目2' },
      { id: 3, name: '项目3' }
    ]
  },
  
  onLoad() {
    console.log('简单测试页面加载');
    console.log('数据:', this.data);
  },
  
  onShow() {
    console.log('简单测试页面显示');
  }
})