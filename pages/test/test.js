// pages/test/test.js
Page({
  data: {
    testData: '测试数据',
    testList: [
      { id: 1, name: '测试项1' },
      { id: 2, name: '测试项2' },
      { id: 3, name: '测试项3' }
    ]
  },
  
  onLoad() {
    console.log('测试页面加载');
    console.log('测试数据:', this.data);
  },
  
  testFunction() {
    console.log('测试函数被调用');
    wx.showToast({
      title: '测试成功',
      icon: 'success'
    });
  }
})