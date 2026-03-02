// pages/knowledge/knowledge.js
Page({
  data: {
    categories: ['全部', '康复护理', '慢性病管理', '营养健康', '老年保健', '急救知识'],
    selectedCategory: 0,
    knowledgeList: [
      {
        title: '老年人高血压的日常护理',
        summary: '高血压是老年人常见的慢性疾病，日常护理非常重要。本文介绍了老年人高血压的护理要点...',
        date: '2024-01-15'
      },
      {
        title: '脑卒中后的康复训练方法',
        summary: '脑卒中后及时进行康复训练对于恢复肢体功能至关重要。本文介绍了常用的康复训练方法...',
        date: '2024-01-10'
      },
      {
        title: '糖尿病患者的饮食管理',
        summary: '合理的饮食管理是控制糖尿病的关键。本文介绍了糖尿病患者的饮食原则和注意事项...',
        date: '2024-01-05'
      }
    ],
    healthNews: [
      {
        title: '最新研究：适量运动可降低老年人认知障碍风险',
        date: '2024-01-20'
      },
      {
        title: '冬季老年人保暖指南',
        date: '2024-01-18'
      }
    ],
    faqList: [
      {
        question: '老年人如何预防跌倒？',
        answer: '老年人预防跌倒的方法包括：保持家居环境整洁，移除障碍物；安装扶手和防滑垫；穿着合适的鞋子；定期进行平衡训练；定期检查视力和听力。'
      },
      {
        question: '如何正确测量血压？',
        answer: '正确测量血压的方法：选择合适的血压计；测量前休息5-10分钟；保持正确的坐姿；袖带位置与心脏同高；连续测量2-3次，取平均值。'
      },
      {
        question: '老年人如何保持良好的睡眠？',
        answer: '老年人保持良好睡眠的方法：保持规律的作息时间；创造舒适的睡眠环境；避免睡前饮用咖啡和茶；适当进行日间活动；如睡眠问题严重，及时咨询医生。'
      }
    ]
  },
  
  onLoad() {
    // 页面加载时的初始化操作
    console.log('护理知识页面加载');
  },
  
  // 选择分类
  selectCategory(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ selectedCategory: index });
    
    // 这里可以根据选择的分类加载相应的知识列表
    // 模拟加载数据
    wx.showLoading({
      title: '加载中...'
    });
    
    setTimeout(() => {
      wx.hideLoading();
      // 这里可以更新知识列表数据
    }, 1000);
  },
  
  // 查看知识详情
  viewKnowledgeDetail(e) {
    const index = e.currentTarget.dataset.index;
    const knowledge = this.data.knowledgeList[index];
    
    wx.showModal({
      title: knowledge.title,
      content: '知识详情将在后续版本中实现',
      showCancel: false
    });
  },
  
  // 查看资讯详情
  viewNewsDetail(e) {
    const index = e.currentTarget.dataset.index;
    const news = this.data.healthNews[index];
    
    wx.showModal({
      title: news.title,
      content: '资讯详情将在后续版本中实现',
      showCancel: false
    });
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