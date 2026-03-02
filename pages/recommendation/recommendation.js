// pages/recommendation/recommendation.js
Page({
  data: {
    // 个性化健康建议
    bloodPressureRecommendations: '您的血压数据显示略有升高，建议减少钠盐摄入，增加钾盐摄入，保持规律运动，定期监测血压。',
    bloodSugarRecommendations: '您的血糖数据在正常范围内，建议保持合理饮食，适当运动，定期监测血糖。',
    exerciseRecommendations: '根据您的运动记录，建议每周保持150分钟中等强度有氧运动，如散步、太极拳等。',
    dietRecommendations: '根据您的饮食偏好，建议增加蔬菜和水果的摄入，减少高脂肪、高糖分食物的摄入。',
    
    // 推荐文章
    recommendedArticles: [
      {
        id: 9,
        title: '适合老年人的有氧运动',
        summary: '本文介绍了适合老年人的有氧运动方式，包括散步、太极拳、游泳等，帮助老年人保持身体健康。'
      },
      {
        id: 10,
        title: '如何科学控制血压',
        summary: '本文介绍了科学控制血压的方法，包括饮食、运动、药物治疗等方面的建议。'
      }
    ],
    
    // 推荐社区
    recommendedCommunities: [
      {
        id: 4,
        name: '高血压患者交流群',
        description: '高血压患者的交流与分享社区'
      },
      {
        id: 5,
        name: '老年人健康生活群',
        description: '关注老年人健康生活的交流社区'
      }
    ],
    
    // 健康目标进度
    bloodPressureProgress: 75,
    bloodPressureStatus: '良好',
    bloodSugarProgress: 85,
    bloodSugarStatus: '优秀',
    exerciseProgress: 60,
    exerciseStatus: '需要加强'
  },
  
  onLoad() {
    // 页面加载时的初始化操作
    console.log('个性化推荐页面加载');
    
    // 这里可以从全局数据或服务器获取用户健康数据
    const app = getApp();
    if (app.globalData.healthData) {
      console.log('用户健康数据:', app.globalData.healthData);
      // 根据健康数据生成个性化推荐
      this.generateRecommendations(app.globalData.healthData);
    }
  },
  
  // 生成个性化推荐
  generateRecommendations(healthData) {
    // 这里可以根据用户的健康数据生成个性化推荐
    // 模拟生成推荐内容
    console.log('生成个性化推荐');
  },
  
  // 查看推荐文章
  viewArticle(e) {
    const index = e.currentTarget.dataset.index;
    const article = this.data.recommendedArticles[index];
    
    wx.navigateTo({
      url: '../article-detail/article-detail?id=' + article.id
    });
  },
  
  // 查看推荐社区
  viewCommunity(e) {
    const index = e.currentTarget.dataset.index;
    const community = this.data.recommendedCommunities[index];
    
    wx.navigateTo({
      url: '../community-detail/community-detail?id=' + community.id
    });
  },
  
  // 刷新推荐
  refreshRecommendations() {
    wx.showLoading({
      title: '刷新中...'
    });
    
    setTimeout(() => {
      wx.hideLoading();
      
      // 模拟刷新推荐内容
      this.setData({
        bloodPressureRecommendations: '您的血压数据显示稳定，建议继续保持健康的生活方式，定期监测血压。',
        bloodSugarRecommendations: '您的血糖数据在正常范围内，建议保持合理饮食，适当运动，定期监测血糖。',
        exerciseRecommendations: '根据您的运动记录，建议增加力量训练，提高肌肉力量和平衡能力。',
        dietRecommendations: '根据您的饮食偏好，建议增加蛋白质的摄入，选择优质蛋白质来源。'
      });
      
      wx.showToast({
        title: '推荐已刷新',
        icon: 'success'
      });
    }, 1500);
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