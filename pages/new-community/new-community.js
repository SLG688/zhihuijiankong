// pages/new-community/new-community.js
Page({
  data: {
    message: '社区页面',
    categories: ['全部', '高血压', '糖尿病'],
    communities: [
      { name: '高血压患者交流群', members: 1258 },
      { name: '糖尿病管理社区', members: 987 }
    ]
  },
  
  onLoad() {
    console.log('新社区页面加载');
    console.log('数据:', this.data);
  }
})