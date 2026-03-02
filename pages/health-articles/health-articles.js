// pages/health-articles/health-articles.js
Page({
  data: {
    categories: [
      { id: 1, name: '全部' },
      { id: 2, name: '高血压' },
      { id: 3, name: '糖尿病' },
      { id: 4, name: '脑卒中' },
      { id: 5, name: '骨关节病' },
      { id: 6, name: '营养健康' },
      { id: 7, name: '康复护理' }
    ],
    selectedCategory: 0,
    articles: [
      {
        id: 1,
        title: '高血压患者的饮食指南',
        summary: '本文介绍了高血压患者的饮食原则，包括减少钠盐摄入、增加钾盐摄入、控制脂肪和胆固醇摄入等内容...',
        author: '营养专家',
        date: '2024-01-20',
        views: 1234,
        categoryId: 2
      },
      {
        id: 2,
        title: '糖尿病患者的运动建议',
        summary: '适当的运动对糖尿病患者非常重要，本文介绍了适合糖尿病患者的运动方式和注意事项...',
        author: '运动专家',
        date: '2024-01-18',
        views: 987,
        categoryId: 3
      },
      {
        id: 3,
        title: '脑卒中后的康复训练',
        summary: '脑卒中后及时进行康复训练对于恢复肢体功能至关重要，本文介绍了常用的康复训练方法...',
        author: '康复专家',
        date: '2024-01-15',
        views: 1567,
        categoryId: 4
      }
    ],
    recommendedArticles: [
      {
        id: 4,
        title: '老年人如何预防骨质疏松',
        summary: '骨质疏松是老年人常见的疾病，本文介绍了预防骨质疏松的方法，包括饮食、运动和生活方式等...',
        author: '骨科专家',
        date: '2024-01-10',
        views: 876,
        categoryId: 5
      },
      {
        id: 5,
        title: '老年人营养需求与饮食建议',
        summary: '老年人的营养需求与年轻人有所不同，本文介绍了老年人的营养需求和合理的饮食建议...',
        author: '营养专家',
        date: '2024-01-05',
        views: 1123,
        categoryId: 6
      }
    ],
    isAdmin: true // 模拟管理员权限
  },
  
  onLoad() {
    // 页面加载时的初始化操作
    console.log('健康知识文章页面加载');
  },
  
  // 选择分类
  selectCategory(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ selectedCategory: index });
    
    // 这里可以根据选择的分类过滤文章列表
    // 模拟加载数据
    wx.showLoading({
      title: '加载中...'
    });
    
    setTimeout(() => {
      wx.hideLoading();
      // 这里可以更新文章列表数据
    }, 1000);
  },
  
  // 查看文章详情
  viewArticle(e) {
    const index = e.currentTarget.dataset.index;
    let article;
    
    if (index < this.data.articles.length) {
      article = this.data.articles[index];
    } else {
      article = this.data.recommendedArticles[index - this.data.articles.length];
    }
    
    wx.navigateTo({
      url: '../article-detail/article-detail?id=' + article.id
    });
  },
  
  // 添加文章
  addArticle() {
    wx.showModal({
      title: '添加文章',
      content: '请输入文章标题和内容',
      cancelText: '取消',
      confirmText: '确认',
      success: (res) => {
        if (res.confirm) {
          // 模拟添加文章
          wx.showLoading({
            title: '添加中...'
          });
          
          setTimeout(() => {
            wx.hideLoading();
            wx.showToast({
              title: '文章添加成功，等待审核',
              icon: 'success'
            });
          }, 1000);
        }
      }
    });
  },
  
  // 审核文章
  reviewArticles() {
    wx.showModal({
      title: '审核文章',
      content: '审核文章功能已启用',
      cancelText: '取消',
      confirmText: '查看待审核文章',
      success: (res) => {
        if (res.confirm) {
          // 模拟审核文章
          wx.showLoading({
            title: '加载中...'
          });
          
          setTimeout(() => {
            wx.hideLoading();
            wx.showToast({
              title: '审核完成',
              icon: 'success'
            });
          }, 1000);
        }
      }
    });
  }
})