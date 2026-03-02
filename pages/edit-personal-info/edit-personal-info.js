// pages/edit-personal-info/edit-personal-info.js
Page({
  data: {
    name: '张三',
    age: '65',
    gender: '男',
    phone: '13800138000',
    emergencyContact: '李四 13900139000'
  },
  
  onLoad(options) {
    // 页面加载时的初始化操作
    console.log('编辑个人信息页面加载', options);
  },
  
  // 绑定表单输入
  bindInput(e) {
    const field = e.currentTarget.dataset.field;
    const value = e.detail.value;
    this.setData({ [field]: value });
  },
  
  // 提交表单
  submitForm() {
    var name = this.data.name;
    var age = this.data.age;
    var gender = this.data.gender;
    var phone = this.data.phone;
    var emergencyContact = this.data.emergencyContact;
    
    // 表单验证
    if (!name.trim()) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      });
      return;
    }
    
    if (!age) {
      wx.showToast({
        title: '请输入年龄',
        icon: 'none'
      });
      return;
    }
    
    if (!gender) {
      wx.showToast({
        title: '请输入性别',
        icon: 'none'
      });
      return;
    }
    
    if (!phone) {
      wx.showToast({
        title: '请输入联系电话',
        icon: 'none'
      });
      return;
    }
    
    if (!emergencyContact) {
      wx.showToast({
        title: '请输入紧急联系人',
        icon: 'none'
      });
      return;
    }
    
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
        userInfo: {
          name: name,
          age: parseInt(age),
          gender: gender,
          phone: phone,
          emergencyContact: emergencyContact
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