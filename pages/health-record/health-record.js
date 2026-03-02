// pages/health-record/health-record.js
Page({
  data: {
    userInfo: {
      name: '张三',
      age: 65,
      gender: '男',
      phone: '13800138000',
      emergencyContact: '李四 13900139000'
    },
    healthCondition: {
      pastIllnesses: '高血压、2型糖尿病',
      allergies: '青霉素',
      currentMedications: '缬沙坦胶囊、二甲双胍'
    },
    bloodPressureRecords: [
      { date: '2024-01-20', time: '08:00', value: '125/85' },
      { date: '2024-01-19', time: '08:00', value: '120/80' },
      { date: '2024-01-18', time: '08:00', value: '122/82' }
    ],
    bloodSugarRecords: [
      { date: '2024-01-20', time: '07:30', value: '5.8' },
      { date: '2024-01-19', time: '07:30', value: '5.6' },
      { date: '2024-01-18', time: '07:30', value: '5.7' }
    ],
    heartRateRecords: [
      { date: '2024-01-20', time: '08:00', value: '72' },
      { date: '2024-01-19', time: '08:00', value: '75' },
      { date: '2024-01-18', time: '08:00', value: '73' }
    ],
    healthGoals: []
  },
  
  onLoad: function() {
    // 页面加载时的初始化操作
    console.log('健康档案页面加载');
    this.initHealthGoals();
  },
  
  initHealthGoals: function() {
    // 初始化健康目标
    const app = getApp();
    if (app.globalData && app.globalData.healthGoals) {
      this.setData({
        healthGoals: app.globalData.healthGoals
      });
    } else {
      // 初始化默认健康目标
      const defaultGoals = [
        {
          title: '控制血压',
          target: '收缩压 < 130 mmHg',
          progress: 75
        },
        {
          title: '控制血糖',
          target: '空腹血糖 < 6.1 mmol/L',
          progress: 80
        },
        {
          title: '规律运动',
          target: '每周运动 5 次，每次 30 分钟',
          progress: 60
        }
      ];
      this.setData({
        healthGoals: defaultGoals
      });
      // 保存到全局数据
      app.globalData = app.globalData || {};
      app.globalData.healthGoals = defaultGoals;
    }
  },
  
  editPersonalInfo: function() {
    // 编辑个人信息
    wx.navigateTo({
      url: '../edit-personal-info/edit-personal-info'
    });
  },
  
  editHealthCondition: function() {
    // 编辑健康状况
    wx.navigateTo({
      url: '../edit-health-condition/edit-health-condition'
    });
  },
  
  viewBloodPressureRecords: function() {
    // 查看血压记录
    wx.navigateTo({
      url: '../blood-pressure-records/blood-pressure-records'
    });
  },
  
  viewBloodSugarRecords: function() {
    // 查看血糖记录
    wx.navigateTo({
      url: '../blood-sugar-records/blood-sugar-records'
    });
  },
  
  viewHeartRateRecords: function() {
    // 查看心率记录
    wx.navigateTo({
      url: '../heart-rate-records/heart-rate-records'
    });
  },
  
  viewReport: function() {
    // 查看健康报告详情
    wx.navigateTo({
      url: '../health-report/health-report'
    });
  },
  
  generateReport: function() {
    // 生成新的健康报告
    wx.showLoading({
      title: '生成报告中...'
    });
    
    setTimeout(function() {
      wx.hideLoading();
      wx.navigateTo({
        url: '../health-report/health-report'
      });
    }, 1500);
  },
  
  setHealthGoals: function() {
    // 设定健康目标
    wx.showModal({
      title: '设定健康目标',
      content: '选择要设定的健康目标类型',
      cancelText: '取消',
      confirmText: '血压目标',
      success: (res) => {
        if (res.confirm) {
          this.setBloodPressureGoal();
        }
      }
    });
  },
  
  setBloodPressureGoal: function() {
    // 设定血压目标
    wx.showModal({
      title: '设定血压目标',
      content: '请输入目标收缩压（mmHg）',
      inputPlaceholder: '例如：130',
      showCancel: true,
      confirmText: '确定',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm && res.content) {
          const target = res.content;
          const app = getApp();
          const goals = app.globalData.healthGoals || [];
          const existingGoal = goals.find(goal => goal.title === '控制血压');
          if (existingGoal) {
            existingGoal.target = '收缩压 < ' + target + ' mmHg';
            existingGoal.progress = 75; // 重置进度
          } else {
            goals.push({
              title: '控制血压',
              target: '收缩压 < ' + target + ' mmHg',
              progress: 0
            });
          }
          app.globalData.healthGoals = goals;
          this.setData({ healthGoals: goals });
          wx.showToast({
            title: '血压目标设定成功',
            icon: 'success'
          });
        }
      }
    });
  },
  
  // 跳转到紧急求助页面
  goToEmergency: function() {
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
});