// pages/index/index.js
// 导入存储工具类
const { saveMedicationReminders } = require('../../utils/storage');

Page({
  data: {
    bloodPressure: '120/80',
    heartRate: '75',
    bloodSugar: '5.6',
    todayReminders: [],
    showAddReminderDialog: false
  },
  
  onLoad() {
    // 页面加载时的初始化操作
    console.log('首页加载');
    
    // 模拟获取用户健康数据
    this.getHealthData();
    
    // 模拟获取今日提醒
    this.getTodayReminders();
  },
  
  onShow() {
    // 页面显示时重新获取最新的提醒数据
    this.getTodayReminders();
  },
  
  getHealthData() {
    // 从全局数据中获取健康数据
    const app = getApp();
    if (app.globalData && app.globalData.healthData) {
      console.log('健康数据:', app.globalData.healthData);
      
      // 尝试从健康数据中获取最新值
      const healthData = app.globalData.healthData;
      if (healthData.bloodPressure.length > 0) {
        const latestBP = healthData.bloodPressure[healthData.bloodPressure.length - 1];
        this.setData({ bloodPressure: latestBP.value });
      }
      if (healthData.heartRate.length > 0) {
        const latestHR = healthData.heartRate[healthData.heartRate.length - 1];
        this.setData({ heartRate: latestHR.value });
      }
      if (healthData.bloodSugar.length > 0) {
        const latestBS = healthData.bloodSugar[healthData.bloodSugar.length - 1];
        this.setData({ bloodSugar: latestBS.value });
      }
    }
  },
  
  getTodayReminders() {
    // 从全局数据中获取今日提醒
    const app = getApp();
    if (app.globalData && app.globalData.medicationReminders) {
      // 更新今日提醒列表
      this.setData({
        todayReminders: app.globalData.medicationReminders
      });
      console.log('用药提醒:', app.globalData.medicationReminders);
    } else {
      // 初始化全局提醒数据
      app.globalData = app.globalData || {};
      app.globalData.medicationReminders = [
        { time: '08:00', content: '服用缬沙坦胶囊 80mg', status: '未服用' },
        { time: '18:00', content: '服用二甲双胍 500mg', status: '未服用' }
      ];
      this.setData({
        todayReminders: app.globalData.medicationReminders
      });
      // 保存到本地存储
      saveMedicationReminders(app.globalData.medicationReminders);
    }
  },
  
  // 显示新建提醒选项
  showAddReminder() {
    // 直接跳转到用药提醒页面进行添加
    wx.navigateTo({
      url: '../medication/add-medication/add-medication'
    });
  },
  
  // 标记提醒为已服用
  markAsTaken(e) {
    const index = e.currentTarget.dataset.index;
    const app = getApp();
    
    // 更新全局数据
    app.globalData.medicationReminders[index].status = '已服用';
    
    // 更新本地数据
    this.setData({
      todayReminders: app.globalData.medicationReminders
    });
    
    // 保存到本地存储
    saveMedicationReminders(app.globalData.medicationReminders);
    
    wx.showToast({
      title: '已标记为已服用',
      icon: 'success'
    });
  },
  
  // 阻止事件冒泡
  catchEvent() {
    // 空函数，用于阻止事件冒泡
  },
  
  // 关闭新建提醒对话框
  closeAddReminderDialog() {
    console.log('关闭对话框');
    this.setData({
      showAddReminderDialog: false
    });
  },
  
  goToEmergency() {
    // 跳转到紧急求助页面
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