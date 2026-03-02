// app.js
App({
  onLaunch() {
    // 小程序启动时的初始化操作
    console.log('智慧健控小程序启动');
    
    // 检查用户授权
    this.checkAuth();
  },
  
  onShow() {
    // 小程序显示时的操作
  },
  
  onHide() {
    // 小程序隐藏时的操作
  },
  
  checkAuth() {
    // 检查用户授权状态
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.userInfo']) {
          // 未授权，引导用户授权
          wx.authorize({
            scope: 'scope.userInfo',
            success: () => {
              console.log('用户已授权');
            },
            fail: () => {
              console.log('用户拒绝授权');
            }
          });
        }
      }
    });
  },
  
  globalData: {
    userInfo: null,
    healthData: {
      bloodPressure: [],
      bloodSugar: [],
      heartRate: [],
      weight: []
    },
    medicationReminders: [
      { time: '08:00', content: '服用缬沙坦胶囊 80mg', status: '未服用' },
      { time: '18:00', content: '服用二甲双胍 500mg', status: '未服用' }
    ],
    emergencyContacts: []
  }
})