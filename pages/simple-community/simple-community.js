// pages/simple-community/simple-community.js
Page({
  data: {
    showManageDialog: false,
    manageForm: {
      categoryName: ''
    },
    categories: ['全部', '高血压', '糖尿病']
  },
  
  onLoad() {
    console.log('简单社区页面加载');
  },
  
  manageCategories() {
    console.log('打开管理分类对话框');
    this.setData({
      showManageDialog: true
    });
  },
  
  closeManageDialog() {
    console.log('关闭管理分类对话框');
    this.setData({
      showManageDialog: false,
      manageForm: {
        categoryName: ''
      }
    });
  },
  
  bindManageFormInput(e) {
    const value = e.detail.value;
    this.setData({
      'manageForm.categoryName': value
    });
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
    
    wx.showLoading({
      title: '添加中...'
    });
    
    setTimeout(() => {
      wx.hideLoading();
      
      const updatedCategories = this.data.categories.concat(categoryName);
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
  }
})