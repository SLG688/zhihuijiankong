// pages/post/post.js
Page({
  data: {
    post: {
      id: 1,
      title: '分享我的高血压管理经验',
      author: '健康达人',
      time: '2小时前',
      content: '大家好，我是一名高血压患者，已经和高血压斗争了5年。今天想和大家分享一下我的管理经验。\n\n首先，饮食控制非常重要。我减少了盐的摄入，增加了蔬菜和水果的比例，避免高脂肪、高胆固醇的食物。\n\n其次，规律运动是关键。我每天坚持散步30分钟，周末会去公园打太极拳，这样不仅有助于控制血压，还能增强体质。\n\n另外，按时服药不能忘。我设置了手机提醒，每天固定时间服药，从不间断。\n\n最后，定期监测血压也很重要。我每天早晚各测一次血压，并记录下来，这样可以及时了解自己的血压变化。\n\n通过这些方法，我的血压已经稳定在正常范围内，希望我的经验对大家有所帮助！',
      likes: 56,
      comments: 23
    },
    currentUser: '健康达人', // 模拟当前登录用户
    isAdmin: false, // 模拟管理员权限
    comments: [
      {
        id: 1,
        author: '糖友小王',
        time: '1小时前',
        content: '非常感谢分享，我也有高血压，会试试你的方法',
        likes: 12,
        isLiked: false
      },
      {
        id: 2,
        author: '张医生',
        time: '30分钟前',
        content: '这位患者的经验非常科学，饮食控制、规律运动、按时服药和定期监测是高血压管理的四大支柱',
        likes: 25,
        isLiked: false
      },
      {
        id: 3,
        author: '老李',
        time: '15分钟前',
        content: '我也每天散步，确实有效果，血压稳定了很多',
        likes: 8,
        isLiked: false
      }
    ],
    isLiked: false,
    commentInput: ''
  },
  
  onLoad(options) {
    // 页面加载时的初始化操作
    console.log('帖子详情页面加载', options);
    
    // 这里可以根据传入的帖子ID获取帖子信息
    const postId = options.id;
    console.log('帖子ID:', postId);
  },
  
  // 点赞帖子
  likePost() {
    const isLiked = this.data.isLiked;
    const post = this.data.post;
    
    if (isLiked) {
      post.likes--;
    } else {
      post.likes++;
    }
    
    this.setData({
      isLiked: !isLiked,
      post: post
    });
  },
  
  // 显示评论
  showComments() {
    // 滚动到评论区
    wx.pageScrollTo({
      selector: '.card',
      duration: 300
    });
  },
  
  // 分享帖子
  sharePost() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },
  
  // 点赞评论
  likeComment(e) {
    const index = e.currentTarget.dataset.index;
    const comments = this.data.comments;
    const comment = comments[index];
    
    if (comment.isLiked) {
      comment.likes--;
    } else {
      comment.likes++;
    }
    
    comment.isLiked = !comment.isLiked;
    this.setData({ comments: comments });
  },
  
  // 回复评论
  replyComment(e) {
    const index = e.currentTarget.dataset.index;
    const comment = this.data.comments[index];
    
    this.setData({
      commentInput: '@' + comment.author + ' '
    });
    
    // 聚焦输入框
    setTimeout(() => {
      wx.createSelectorQuery().select('.comment-input').context((res) => {
        res.context.focus();
      }).exec();
    }, 100);
  },
  
  // 绑定评论输入
  bindCommentInput(e) {
    this.setData({ commentInput: e.detail.value });
  },
  
  // 提交评论
  submitComment() {
    const commentInput = this.data.commentInput.trim();
    
    if (!commentInput) {
      wx.showToast({
        title: '请输入评论内容',
        icon: 'none'
      });
      return;
    }
    
    // 模拟提交评论
    wx.showLoading({
      title: '提交中...'
    });
    
    setTimeout(() => {
      wx.hideLoading();
      
      const newComment = {
        id: Date.now(),
        author: '我',
        time: '刚刚',
        content: commentInput,
        likes: 0,
        isLiked: false
      };
      
      const comments = [newComment, ...this.data.comments];
      const post = this.data.post;
      post.comments++;
      
      this.setData({
        comments: comments,
        post: post,
        commentInput: ''
      });
      
      wx.showToast({
        title: '评论成功',
        icon: 'success'
      });
    }, 1000);
  },
  
  // 分享功能
  onShareAppMessage() {
    return {
      title: this.data.post.title,
      path: '/pages/post/post?id=' + this.data.post.id,
      imageUrl: ''
    };
  },
  
  // 删除帖子
  deletePost() {
    const { post, currentUser, isAdmin } = this.data;
    
    // 权限验证
    if (post.author !== currentUser && !isAdmin) {
      wx.showToast({
        title: '您没有权限删除此帖子',
        icon: 'none'
      });
      return;
    }
    
    // 删除确认
    wx.showModal({
      title: '删除帖子',
      content: '确定要删除此帖子吗？删除后将无法恢复。',
      cancelText: '取消',
      confirmText: '删除',
      confirmColor: '#ff4d4f',
      success: (res) => {
        if (res.confirm) {
          // 模拟删除操作
          wx.showLoading({
            title: '删除中...'
          });
          
          setTimeout(() => {
            wx.hideLoading();
            
            // 模拟删除成功
            wx.showToast({
              title: '帖子删除成功',
              icon: 'success'
            });
            
            // 延迟返回上一页，确保用户看到成功提示
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              });
            }, 1500);
          }, 1000);
        }
      }
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