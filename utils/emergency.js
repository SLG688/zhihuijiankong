// utils/emergency.js

// 紧急求助功能模块
const Emergency = {
  // 跳转到紧急求助页面
  goToEmergency() {
    wx.navigateTo({
      url: '../emergency/emergency'
    });
  }
};

module.exports = Emergency;