// pages/community/community.js
Page({
  data: {
    categories: [
      { id: 1, name: '全部' },
      { id: 2, name: '高血压' },
      { id: 3, name: '糖尿病' }
    ],
    selectedCategory: 0,
    communities: [
      {
        id: 1,
        name: '测试社区1',
        description: '这是一个测试社区',
        memberCount: 100,
        postCount: 50,
        categoryId: 2
      },
      {
        id: 2,
        name: '测试社区2',
        description: '这是另一个测试社区',
        memberCount: 200,
        postCount: 100,
        categoryId: 3
      }
    ],
    hotPosts: [
      {
        id: 1,
        title: '测试帖子1',
        author: '测试用户',
        time: '1小时前',
        views: 100
      },
      {
        id: 2,
        title: '测试帖子2',
        author: '测试用户',
        time: '2小时前',
        views: 200
      }
    ],
    isAdmin: true,
    showCreateDialog: false,
    showManageDialog: false,
    createForm: {
      name: '',
      description: '',
      categoryIndex: 1
    },
    manageForm: {
      categoryName: ''
    }
  },
  
  onLoad() {
    console.log('社区页面加载');
    console.log('初始数据:', this.data);
  },
  
  selectCategory(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ selectedCategory: index });
    
    wx.showLoading({
      title: '加载中...'
    });
    
    setTimeout(() => {
      wx.hideLoading();
    }, 1000);
  },
  
  enterCommunity(e) {
    const index = e.currentTarget.dataset.index;
    const community = this.data.communities[index];
    
    wx.navigateTo({
      url: '../community-detail/community-detail?id=' + community.id
    });
  },
  
  viewPost(e) {
    const index = e.currentTarget.dataset.index;
    const post = this.data.hotPosts[index];
    
    wx.navigateTo({
      url: '../post/post?id=' + post.id
    });
  },
  
  createCommunity() {
    console.log('打开创建社区对话框');
    // 先关闭管理分类对话框
    this.setData({
      showManageDialog: false
    }, () => {
      // 再打开创建社区对话框
      this.setData({
        showCreateDialog: true
      }, () => {
        console.log('对话框状态:', { showCreateDialog: this.data.showCreateDialog, showManageDialog: this.data.showManageDialog });
      });
    });
  },
  
  manageCategories() {
    console.log('打开管理分类对话框');
    // 先关闭创建社区对话框
    this.setData({
      showCreateDialog: false
    }, () => {
      // 再打开管理分类对话框
      this.setData({
        showManageDialog: true
      }, () => {
        console.log('对话框状态:', { showManageDialog: this.data.showManageDialog, showCreateDialog: this.data.showCreateDialog });
      });
    });
  },
  
  closeCreateDialog() {
    console.log('关闭创建社区对话框');
    this.setData({
      showCreateDialog: false,
      createForm: {
        name: '',
        description: '',
        categoryIndex: 1
      }
    }, () => {
      console.log('对话框状态已更新:', { showCreateDialog: this.data.showCreateDialog });
    });
  },
  
  closeManageDialog() {
    console.log('关闭管理分类对话框');
    this.setData({
      showManageDialog: false,
      manageForm: {
        categoryName: ''
      }
    }, () => {
      console.log('对话框状态已更新:', { showManageDialog: this.data.showManageDialog });
    });
  },
  
  bindCreateFormInput(e) {
    const field = e.currentTarget.dataset.field;
    const value = e.detail.value;
    this.setData({
      ['createForm.' + field]: value
    });
  },
  
  bindManageFormInput(e) {
    const value = e.detail.value;
    this.setData({
      'manageForm.categoryName': value
    });
  },
  
  bindCategoryChange(e) {
    this.setData({
      'createForm.categoryIndex': e.detail.value
    });
  },
  
  submitCreateForm() {
    console.log('提交创建社区表单');
    const { name, description, categoryIndex } = this.data.createForm;
    
    if (!name.trim()) {
      wx.showToast({
        title: '请输入社区名称',
        icon: 'none'
      });
      return;
    }
    
    if (name.length > 50) {
      wx.showToast({
        title: '社区名称不能超过50个字符',
        icon: 'none'
      });
      return;
    }
    
    if (description.length > 200) {
      wx.showToast({
        title: '社区描述不能超过200个字符',
        icon: 'none'
      });
      return;
    }
    
    wx.showLoading({
      title: '创建中...'
    });
    
    setTimeout(() => {
      wx.hideLoading();
      
      const newCommunity = {
        id: Date.now(),
        name: name,
        description: description || '暂无描述',
        memberCount: 0,
        postCount: 0,
        categoryId: this.data.categories[categoryIndex].id
      };
      
      const updatedCommunities = this.data.communities.concat(newCommunity);
      this.setData({
        communities: updatedCommunities,
        showCreateDialog: false,
        createForm: {
          name: '',
          description: '',
          categoryIndex: 1
        }
      });
      
      wx.showToast({
        title: '社区创建成功',
        icon: 'success'
      });
    }, 1000);
  },
  
  submitManageForm() {
    console.log('提交管理分类表单');
    const { categoryName } = this.data.manageForm;
    
    if (!categoryName.trim()) {
      wx.showToast({
        title: '请输入分类名称',
        icon: 'none'
      });
      return;
    }
    
    if (categoryName.length > 20) {
      wx.showToast({
        title: '分类名称不能超过20个字符',
        icon: 'none'
      });
      return;
    }
    
    wx.showLoading({
      title: '添加中...'
    });
    
    setTimeout(() => {
      wx.hideLoading();
      
      const newCategory = {
        id: this.data.categories.length + 1,
        name: categoryName
      };
      
      const updatedCategories = this.data.categories.concat(newCategory);
      this.setData({
        categories: updatedCategories,
        showManageDialog: false,
        manageForm: {
          categoryName: ''
        }
      });
      
      wx.showToast({
        title: '分类添加成功',
        icon: 'success'
      });
    }, 1000);
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