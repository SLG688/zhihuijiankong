// pages/medication/medication.js
// 导入存储工具类
const { saveMedicationReminders } = require('../../utils/storage');

Page({
  data: {
    todayMedications: [
      { id: 1, name: '缬沙坦胶囊', time: '08:00', dosage: '80mg', status: '未服用', specification: '80mg*7粒', usage: '口服', frequency: '每日一次', duration: '长期', notes: '饭后服用' },
      { id: 2, name: '二甲双胍', time: '18:00', dosage: '500mg', status: '未服用', specification: '500mg*30片', usage: '口服', frequency: '每日一次', duration: '长期', notes: '饭后服用' }
    ],
    medicationRecords: [
      { date: '2024-01-19', name: '缬沙坦胶囊', time: '08:00', status: '已服用' },
      { date: '2024-01-19', name: '二甲双胍', time: '18:00', status: '已服用' },
      { date: '2024-01-18', name: '缬沙坦胶囊', time: '08:00', status: '已服用' }
    ],
    // 删除用药对话框状态
    deleteId: ''
  },
  
  onLoad() {
    // 页面加载时的初始化操作
    console.log('用药提醒页面加载');
    // 初始化全局数据
    const app = getApp();
    if (!app.globalData) {
      app.globalData = {};
    }
    // 同步用药数据到全局
    this.syncMedicationData();
  },
  
  onShow() {
    // 页面显示时同步数据
    this.syncMedicationData();
    
    // 检查是否有新添加的药品
    var app = getApp();
    if (app.globalData && app.globalData.newMedication) {
      var newMedication = app.globalData.newMedication;
      var newMedications = this.data.todayMedications.concat(newMedication);
      this.setData({ todayMedications: newMedications });
      // 清空全局数据
      app.globalData.newMedication = null;
      // 重新同步数据
      this.syncMedicationData();
    }
    
    // 检查是否有更新的药品
    if (app.globalData && app.globalData.updatedMedication) {
      var updatedMedication = app.globalData.updatedMedication;
      var updatedMedications = [];
      for (var i = 0; i < this.data.todayMedications.length; i++) {
        var item = this.data.todayMedications[i];
        if (item.id === updatedMedication.id) {
          updatedMedications.push({
            id: item.id,
            name: updatedMedication.name,
            specification: updatedMedication.specification,
            dosage: updatedMedication.dosage,
            usage: updatedMedication.usage,
            frequency: updatedMedication.frequency,
            time: updatedMedication.time,
            duration: updatedMedication.duration,
            notes: updatedMedication.notes,
            status: item.status
          });
        } else {
          updatedMedications.push(item);
        }
      }
      this.setData({ todayMedications: updatedMedications });
      // 清空全局数据
      app.globalData.updatedMedication = null;
      // 重新同步数据
      this.syncMedicationData();
    }
  },
  
  // 同步用药数据到全局
  syncMedicationData() {
    var app = getApp();
    if (!app.globalData) {
      app.globalData = {};
    }
    // 按时间排序用药提醒
    var sortedMedications = [];
    for (var i = 0; i < this.data.todayMedications.length; i++) {
      sortedMedications.push(this.data.todayMedications[i]);
    }
    sortedMedications.sort(function(a, b) {
      return a.time.localeCompare(b.time);
    });
    // 将用药数据同步到全局，供首页使用
    var medicationReminders = [];
    for (var i = 0; i < sortedMedications.length; i++) {
      var item = sortedMedications[i];
      medicationReminders.push({
        time: item.time,
        content: '服用' + item.name + ' ' + item.dosage,
        status: item.status
      });
    }
    app.globalData.medicationReminders = medicationReminders;
    
    // 保存到本地存储
    saveMedicationReminders(app.globalData.medicationReminders);
  },
  
  // 标记已服用
  takeMedicine(e) {
    var index = e.currentTarget.dataset.index;
    var todayMedications = [];
    for (var i = 0; i < this.data.todayMedications.length; i++) {
      todayMedications.push(this.data.todayMedications[i]);
    }
    todayMedications[index].status = '已服用';
    
    this.setData({ todayMedications: todayMedications });
    
    // 同步数据到全局
    this.syncMedicationData();
    
    wx.showToast({
      title: '已标记为已服用',
      icon: 'success'
    });
  },
  
  // 添加用药提醒
  addMedication() {
    // 使用原生页面跳转实现添加功能
    wx.navigateTo({
      url: '/pages/medication/add-medication/add-medication',
      success: function(res) {
        console.log('跳转到添加用药页面成功');
      },
      fail: function(res) {
        console.log('跳转到添加用药页面失败', res);
      }
    });
  },
  
  // 编辑用药提醒
  editMedication() {
    // 显示药品选择列表
    var medications = this.data.todayMedications;
    var medicationNames = [];
    for (var i = 0; i < medications.length; i++) {
      medicationNames.push(medications[i].name);
    }
    
    wx.showActionSheet({
      itemList: medicationNames,
      success: function(res) {
        var index = res.tapIndex;
        var medication = medications[index];
        
        // 使用原生页面跳转实现编辑功能
        wx.navigateTo({
          url: '/pages/medication/edit-medication/edit-medication?id=' + medication.id + '&name=' + medication.name + '&specification=' + medication.specification + '&dosage=' + medication.dosage + '&usage=' + medication.usage + '&frequency=' + medication.frequency + '&time=' + medication.time + '&duration=' + medication.duration + '&notes=' + medication.notes,
          success: function(res) {
            console.log('跳转到编辑用药页面成功');
          },
          fail: function(res) {
            console.log('跳转到编辑用药页面失败', res);
          }
        });
      }.bind(this)
    });
  },
  
  // 删除用药提醒
  deleteMedication() {
    // 检查是否有药品可删除
    var medications = this.data.todayMedications;
    if (medications.length === 0) {
      wx.showToast({
        title: '没有找到删除内容',
        icon: 'none'
      });
      return;
    }
    
    // 显示药品选择列表
    var medicationNames = [];
    for (var i = 0; i < medications.length; i++) {
      medicationNames.push(medications[i].name);
    }
    
    wx.showActionSheet({
      itemList: medicationNames,
      success: function(res) {
        var index = res.tapIndex;
        var medication = medications[index];
        
        // 保存当前删除的药品ID
        this.setData({ deleteId: medication.id });
        
        // 使用原生modal组件显示删除确认
        wx.showModal({
          title: '删除用药提醒',
          content: '确定要删除该用药提醒吗？删除后将无法恢复。',
          confirmText: '删除',
          cancelText: '取消',
          confirmColor: '#ff4d4f',
          success: function(res) {
            if (res.confirm) {
              this.confirmDelete();
            }
          }.bind(this)
        });
      }.bind(this)
    });
  },
  

  
  // 确认删除药品
  confirmDelete() {
    var deleteId = this.data.deleteId;
    
    // 验证是否有有效的删除ID
    if (!deleteId) {
      wx.showToast({
        title: '没有找到删除内容',
        icon: 'none'
      });
      return;
    }
    
    // 显示加载状态
    wx.showLoading({ title: '删除中...' });
    
    setTimeout(function() {
      wx.hideLoading();
      
      var filteredMedications = [];
      for (var i = 0; i < this.data.todayMedications.length; i++) {
        if (this.data.todayMedications[i].id !== deleteId) {
          filteredMedications.push(this.data.todayMedications[i]);
        }
      }
      
      this.setData({
        todayMedications: filteredMedications,
        deleteId: ''
      });
      
      // 同步数据到全局
      this.syncMedicationData();
      
      wx.showToast({ title: '删除成功', icon: 'success' });
    }.bind(this), 1000);
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