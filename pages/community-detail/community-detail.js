// pages/community-detail/community-detail.js
Page({
  data: {
    community: {
      id: 1,
      name: '高血压患者交流群',
      description: '高血压患者的交流与分享社区，在这里你可以分享自己的经验，学习他人的管理方法，共同战胜高血压。',
      memberCount: 1258,
      postCount: 3421,
      category: '高血压'
    },
    posts: [
      {
        id: 1,
        title: '分享我的高血压管理经验',
        author: '健康达人',
        time: '2小时前',
        likes: 56,
        comments: 23
      },
      {
        id: 2,
        title: '高血压患者的饮食建议',
        author: '营养师小李',
        time: '昨天',
        likes: 89,
        comments: 45
      },
      {
        id: 3,
        title: '降压药的正确服用方法',
        author: '张医生',
        time: '3天前',
        likes: 123,
        comments: 67
      },
      {
        id: 4,
        title: '我的血压监测记录分享',
        author: '老王',
        time: '1周前',
        likes: 78,
        comments: 34
      }
    ],
    isJoined: false,
    isAdmin: true, // 模拟管理员权限
    members: [
      { id: 1, name: '健康达人', role: '管理员' },
      { id: 2, name: '营养师小李', role: '成员' },
      { id: 3, name: '张医生', role: '成员' },
      { id: 4, name: '老王', role: '成员' }
    ],
    showMemberList: false
  },
  
  onLoad(options) {
    // 页面加载时的初始化操作
    console.log('社区详情页面加载', options);
    
    // 这里可以根据传入的社区ID获取社区信息
    const communityId = options.id;
    console.log('社区ID:', communityId);
  },
  
  // 加入社区
  joinCommunity() {
    if (this.data.isJoined) {
      wx.showToast({
        title: '您已经加入该社区',
        icon: 'none'
      });
      return;
    }
    
    wx.showLoading({
      title: '加入中...'
    });
    
    setTimeout(() => {
      wx.hideLoading();
      this.setData({ isJoined: true });
      wx.showToast({
        title: '加入成功',
        icon: 'success'
      });
    }, 1500);
  },
  
  // 退出社区
  leaveCommunity() {
    if (!this.data.isJoined) {
      wx.showToast({
        title: '您还未加入该社区',
        icon: 'none'
      });
      return;
    }
    
    wx.showModal({
      title: '退出社区',
      content: '确定要退出该社区吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({
            title: '退出中...'
          });
          
          setTimeout(() => {
            wx.hideLoading();
            this.setData({ isJoined: false });
            wx.showToast({
              title: '退出成功',
              icon: 'success'
            });
          }, 1500);
        }
      }
    });
  },
  
  // 查看成员列表
  showMembers() {
    this.setData({ showMemberList: true });
  },
  
  // 关闭成员列表
  closeMemberList() {
    this.setData({ showMemberList: false });
  },
  
  // 踢出成员
  kickMember(e) {
    const index = e.currentTarget.dataset.index;
    const member = this.data.members[index];
    
    if (member.role === '管理员') {
      wx.showToast({
        title: '不能踢出管理员',
        icon: 'none'
      });
      return;
    }
    
    wx.showModal({
      title: '踢出成员',
      content: '确定要将 ' + member.name + ' 踢出社区吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({
            title: '处理中...'
          });
          
          setTimeout(() => {
            wx.hideLoading();
            const updatedMembers = this.data.members.filter((item, i) => i !== index);
            this.setData({ members: updatedMembers });
            wx.showToast({
              title: '踢出成功',
              icon: 'success'
            });
          }, 1500);
        }
      }
    });
  },
  
  // 删除社区
  deleteCommunity() {
    wx.showModal({
      title: '删除社区',
      content: '确定要删除该社区吗？此操作不可恢复！',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({
            title: '删除中...'
          });
          
          setTimeout(() => {
            wx.hideLoading();
            wx.showToast({
              title: '社区删除成功',
              icon: 'success'
            });
            // 返回社区列表页面
            wx.navigateBack({
              delta: 1
            });
          }, 1500);
        }
      }
    });
  },
  
  // 发布帖子
  createPost() {
    wx.showModal({
      title: '发布帖子',
      content: '此功能将在后续版本中实现',
      showCancel: false
    });
  },
  
  // 查看帖子详情
  viewPost(e) {
    const index = e.currentTarget.dataset.index;
    const post = this.data.posts[index];
    
    wx.navigateTo({
      url: '../post/post?id=' + post.id
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