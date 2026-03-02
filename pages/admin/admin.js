// pages/admin/admin.js
const permission = require('../../utils/permission');

Page({
  data: {
    activeTab: 'users',
    users: [
      { id: 1, name: '健康达人', role: 'admin' },
      { id: 2, name: '营养师小李', role: 'user' },
      { id: 3, name: '张医生', role: 'user' },
      { id: 4, name: '老王', role: 'user' }
    ],
    communities: [
      { id: 1, name: '高血压患者交流群', status: 'active', memberCount: 1258 },
      { id: 2, name: '糖尿病管理社区', status: 'active', memberCount: 987 },
      { id: 3, name: '脑卒中康复群', status: 'pending', memberCount: 756 }
    ],
    contents: [
      { id: 1, title: '分享我的高血压管理经验', author: '健康达人', status: 'approved' },
      { id: 2, title: '糖尿病饮食控制的小技巧', author: '糖友小王', status: 'pending' },
      { id: 3, title: '脑卒中康复训练方法分享', author: '康复专家', status: 'approved' }
    ],
    categories: [
      { id: 1, name: '全部' },
      { id: 2, name: '高血压' },
      { id: 3, name: '糖尿病' },
      { id: 4, name: '脑卒中' },
      { id: 5, name: '骨关节病' },
      { id: 6, name: '其他' }
    ],
    showAddCategory: false,
    newCategory: ''
  },
  
  onLoad() {
    // 检查用户权限
    if (!permission.checkPermission(permission.PERMISSIONS.SYSTEM_CONFIG)) {
      wx.showToast({
        title: '您没有管理员权限',
        icon: 'none'
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
      return;
    }
    
    console.log('管理员页面加载');
  },
  
  // 切换标签
  switchTab(e) {
    this.setData({ activeTab: e.currentTarget.dataset.tab });
  },
  
  // 管理用户角色
  manageUserRole(e) {
    const index = e.currentTarget.dataset.index;
    const user = this.data.users[index];
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    
    wx.showModal({
      title: '修改用户角色',
      content: `确定将 ${user.name} 的角色修改为 ${newRole === 'admin' ? '管理员' : '普通用户'} 吗？`,
      success: (res) => {
        if (res.confirm) {
          const updatedUsers = [...this.data.users];
          updatedUsers[index].role = newRole;
          this.setData({ users: updatedUsers });
          
          // 记录权限变更日志
          permission.logPermissionChange(
            permission.getUserRole(),
            '修改用户角色',
            `用户 ${user.name} 角色从 ${user.role} 变更为 ${newRole}`
          );
          
          wx.showToast({
            title: '角色修改成功',
            icon: 'success'
          });
        }
      }
    });
  },
  
  // 审核社区
  reviewCommunity(e) {
    const index = e.currentTarget.dataset.index;
    const community = this.data.communities[index];
    const newStatus = community.status === 'pending' ? 'active' : 'pending';
    
    wx.showModal({
      title: '审核社区',
      content: `确定将 ${community.name} 的状态修改为 ${newStatus === 'active' ? '已激活' : '待审核'} 吗？`,
      success: (res) => {
        if (res.confirm) {
          const updatedCommunities = [...this.data.communities];
          updatedCommunities[index].status = newStatus;
          this.setData({ communities: updatedCommunities });
          
          wx.showToast({
            title: '社区状态修改成功',
            icon: 'success'
          });
        }
      }
    });
  },
  
  // 删除社区
  deleteCommunity(e) {
    const index = e.currentTarget.dataset.index;
    const community = this.data.communities[index];
    
    wx.showModal({
      title: '删除社区',
      content: `确定要删除 ${community.name} 吗？此操作不可恢复！`,
      success: (res) => {
        if (res.confirm) {
          const updatedCommunities = this.data.communities.filter((item, i) => i !== index);
          this.setData({ communities: updatedCommunities });
          
          wx.showToast({
            title: '社区删除成功',
            icon: 'success'
          });
        }
      }
    });
  },
  
  // 审核内容
  reviewContent(e) {
    const index = e.currentTarget.dataset.index;
    const content = this.data.contents[index];
    const newStatus = content.status === 'pending' ? 'approved' : 'pending';
    
    wx.showModal({
      title: '审核内容',
      content: `确定将 ${content.title} 的状态修改为 ${newStatus === 'approved' ? '已通过' : '待审核'} 吗？`,
      success: (res) => {
        if (res.confirm) {
          const updatedContents = [...this.data.contents];
          updatedContents[index].status = newStatus;
          this.setData({ contents: updatedContents });
          
          wx.showToast({
            title: '内容状态修改成功',
            icon: 'success'
          });
        }
      }
    });
  },
  
  // 显示添加分类对话框
  showAddCategoryDialog() {
    this.setData({ showAddCategory: true });
  },
  
  // 关闭添加分类对话框
  closeAddCategoryDialog() {
    this.setData({ showAddCategory: false, newCategory: '' });
  },
  
  // 绑定分类输入
  bindCategoryInput(e) {
    this.setData({ newCategory: e.detail.value });
  },
  
  // 添加分类
  addCategory() {
    const { newCategory } = this.data;
    
    if (!newCategory.trim()) {
      wx.showToast({
        title: '请输入分类名称',
        icon: 'none'
      });
      return;
    }
    
    // 检查分类名称是否已存在
    const existingCategory = this.data.categories.find(cat => cat.name === newCategory);
    if (existingCategory) {
      wx.showToast({
        title: '分类名称已存在',
        icon: 'none'
      });
      return;
    }
    
    const newCategoryObj = {
      id: this.data.categories.length + 1,
      name: newCategory
    };
    
    const updatedCategories = this.data.categories.concat(newCategoryObj);
    this.setData({
      categories: updatedCategories,
      showAddCategory: false,
      newCategory: ''
    });
    
    wx.showToast({
      title: '分类添加成功',
      icon: 'success'
    });
  },
  
  // 编辑分类
  editCategory(e) {
    const index = e.currentTarget.dataset.index;
    const category = this.data.categories[index];
    
    wx.showModal({
      title: '编辑分类',
      content: '请输入新的分类名称',
      inputValue: category.name,
      success: (res) => {
        if (res.confirm && res.content) {
          const newName = res.content.trim();
          
          if (!newName) {
            wx.showToast({ title: '分类名称不能为空', icon: 'none' });
            return;
          }
          
          // 检查新名称是否与其他分类重复
          const existingCategory = this.data.categories.find(cat => cat.name === newName && cat.id !== category.id);
          if (existingCategory) {
            wx.showToast({ title: '分类名称已存在', icon: 'none' });
            return;
          }
          
          const updatedCategories = [...this.data.categories];
          updatedCategories[index].name = newName;
          this.setData({ categories: updatedCategories });
          
          wx.showToast({ title: '分类编辑成功', icon: 'success' });
        }
      }
    });
  },
  
  // 删除分类
  deleteCategory(e) {
    const index = e.currentTarget.dataset.index;
    const category = this.data.categories[index];
    
    // 不允许删除"全部"分类
    if (category.id === 1) {
      wx.showToast({ title: '不能删除"全部"分类', icon: 'none' });
      return;
    }
    
    wx.showModal({
      title: '删除分类',
      content: `确定要删除"${category.name}"分类吗？`,
      success: (res) => {
        if (res.confirm) {
          const updatedCategories = this.data.categories.filter((item, i) => i !== index);
          this.setData({ categories: updatedCategories });
          
          wx.showToast({ title: '分类删除成功', icon: 'success' });
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