// pages/article-detail/article-detail.js
Page({
  data: {
    article: {
      id: 1,
      title: '高血压患者的饮食指南',
      author: '营养专家',
      date: '2024-01-20',
      views: 1234,
      likes: 89,
      content: '高血压是一种常见的慢性疾病，合理的饮食对于控制血压非常重要。本文将为高血压患者提供详细的饮食指南。\n\n## 一、饮食原则\n\n1. **减少钠盐摄入**：钠是导致血压升高的重要因素，建议每日钠盐摄入量不超过5克。避免食用咸菜、腌制品、酱油等高盐食物。\n\n2. **增加钾盐摄入**：钾可以帮助排出体内多余的钠，有助于降低血压。多吃富含钾的食物，如香蕉、土豆、菠菜、豆类等。\n\n3. **控制脂肪和胆固醇摄入**：减少动物脂肪和胆固醇的摄入，选择植物油，如橄榄油、亚麻籽油等。\n\n4. **增加膳食纤维摄入**：膳食纤维有助于降低胆固醇，维持健康体重。多吃蔬菜、水果、全谷物等富含膳食纤维的食物。\n\n5. **控制总热量**：保持健康体重，避免过度肥胖，因为肥胖是高血压的危险因素之一。\n\n## 二、推荐食物\n\n1. **蔬菜**：每天摄入500克以上的蔬菜，尤其是深色蔬菜，如菠菜、西兰花、胡萝卜等。\n\n2. **水果**：每天摄入200-350克的水果，选择新鲜水果，避免果汁和果脯。\n\n3. **全谷物**：选择糙米、燕麦、全麦面包等全谷物食物。\n\n4. **低脂肪乳制品**：选择 skim milk、低脂酸奶等低脂肪乳制品。\n\n5. ** lean protein**：选择鸡肉、鱼肉、豆类等 lean protein，避免红肉和加工肉类。\n\n## 三、饮食禁忌\n\n1. **高盐食物**：咸菜、腌制品、酱油、味精等。\n\n2. **高脂肪食物**：油炸食品、动物内脏、奶油等。\n\n3. **高糖食物**：糖果、甜点、含糖饮料等。\n\n4. **酒精**：过量饮酒会升高血压，建议限制饮酒量。\n\n## 四、饮食技巧\n\n1. **烹饪方式**：选择蒸、煮、炖、凉拌等健康的烹饪方式，避免煎、炸、红烧等。\n\n2. **使用香料**：使用大蒜、生姜、花椒、八角等香料代替盐来调味。\n\n3. **阅读食品标签**：购买食品时注意查看营养标签，选择低盐、低脂肪的产品。\n\n4. **规律饮食**：定时定量进食，避免暴饮暴食。\n\n5. **多喝水**：保持充足的水分摄入，有助于排出体内多余的钠。\n\n通过合理的饮食管理，结合适当的运动和药物治疗，大多数高血压患者可以有效控制血压，减少并发症的发生。希望本文的饮食指南对高血压患者有所帮助。',
      tags: ['高血压', '饮食', '健康']
    },
    relatedArticles: [
      {
        id: 6,
        title: '高血压患者的运动指南'
      },
      {
        id: 7,
        title: '高血压的日常管理要点'
      },
      {
        id: 8,
        title: '如何正确测量血压'
      }
    ],
    isLiked: false,
    isCollected: false
  },
  
  onLoad(options) {
    // 页面加载时的初始化操作
    console.log('文章详情页面加载', options);
    
    // 这里可以根据传入的文章ID获取文章信息
    const articleId = options.id;
    console.log('文章ID:', articleId);
  },
  
  // 点赞文章
  likeArticle() {
    const isLiked = this.data.isLiked;
    const article = this.data.article;
    
    if (isLiked) {
      article.likes--;
    } else {
      article.likes++;
    }
    
    this.setData({
      isLiked: !isLiked,
      article: article
    });
  },
  
  // 分享文章
  shareArticle() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },
  
  // 收藏文章
  collectArticle() {
    const isCollected = this.data.isCollected;
    this.setData({ isCollected: !isCollected });
    
    wx.showToast({
      title: isCollected ? '取消收藏' : '收藏成功',
      icon: 'success'
    });
  },
  
  // 查看相关文章
  viewRelatedArticle(e) {
    const index = e.currentTarget.dataset.index;
    const relatedArticle = this.data.relatedArticles[index];
    
    wx.navigateTo({
      url: '../article-detail/article-detail?id=' + relatedArticle.id
    });
  },
  
  // 分享功能
  onShareAppMessage() {
    return {
      title: this.data.article.title,
      path: '/pages/article-detail/article-detail?id=' + this.data.article.id,
      imageUrl: ''
    };
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