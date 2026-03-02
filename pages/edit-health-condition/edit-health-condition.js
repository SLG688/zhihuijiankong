// pages/edit-health-condition/edit-health-condition.js
Page({
  data: {
    pastIllnesses: '高血压、2型糖尿病',
    allergies: '青霉素',
    currentMedications: '缬沙坦胶囊、二甲双胍'
  },
  
  onLoad(options) {
    // 页面加载时的初始化操作
    console.log('编辑健康状况页面加载', options);
  },
  
  // 绑定表单输入
  bindInput(e) {
    const field = e.currentTarget.dataset.field;
    const value = e.detail.value;
    this.setData({ [field]: value });
  },
  
  // 提交表单
  submitForm() {
    var pastIllnesses = this.data.pastIllnesses;
    var allergies = this.data.allergies;
    var currentMedications = this.data.currentMedications;
    
    // 模拟提交成功
    wx.showLoading({
      title: '保存中...'
    });
    
    setTimeout(() => {
      wx.hideLoading();
      
      // 回传数据给上一页
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];
      prevPage.setData({
        healthCondition: {
          pastIllnesses: pastIllnesses,
          allergies: allergies,
          currentMedications: currentMedications
        }
      });
      
      wx.showToast({
        title: '保存成功',
        icon: 'success'
      });
      
      // 返回上一页
      wx.navigateBack();
    }, 1500);
  },
  
  // 取消编辑
  cancelEdit() {
    wx.navigateBack();
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