// pages/medication/edit-medication/edit-medication.js
Page({
  data: {
    editForm: {
      id: '',
      name: '',
      specification: '',
      dosage: '',
      usage: '',
      frequency: '',
      time: '',
      duration: '',
      notes: ''
    }
  },
  
  onLoad(options) {
    console.log('编辑用药页面加载', options);
    
    // 从参数中获取药品信息
    this.setData({
      editForm: {
        id: options.id,
        name: options.name,
        specification: options.specification,
        dosage: options.dosage,
        usage: options.usage,
        frequency: options.frequency,
        time: options.time,
        duration: options.duration,
        notes: options.notes
      }
    });
  },
  
  // 绑定表单输入
  bindFormInput(e) {
    var field = e.currentTarget.dataset.field;
    var value = e.detail.value;
    var key = 'editForm.' + field;
    var data = {};
    data[key] = value;
    this.setData(data);
  },
  
  // 提交表单
  submitForm() {
    var editForm = this.data.editForm;
    var id = editForm.id;
    var name = editForm.name;
    var specification = editForm.specification;
    var dosage = editForm.dosage;
    var usage = editForm.usage;
    var frequency = editForm.frequency;
    var time = editForm.time;
    var duration = editForm.duration;
    var notes = editForm.notes;
    
    // 表单验证
    if (!name.trim()) {
      wx.showToast({ title: '请输入药品名称', icon: 'none' });
      return;
    }
    if (!specification.trim()) {
      wx.showToast({ title: '请输入药品规格', icon: 'none' });
      return;
    }
    if (!dosage.trim()) {
      wx.showToast({ title: '请输入剂量', icon: 'none' });
      return;
    }
    if (!usage.trim()) {
      wx.showToast({ title: '请输入用法', icon: 'none' });
      return;
    }
    if (!frequency.trim()) {
      wx.showToast({ title: '请输入频次', icon: 'none' });
      return;
    }
    if (!time.trim()) {
      wx.showToast({ title: '请输入用药时间', icon: 'none' });
      return;
    }
    if (!duration.trim()) {
      wx.showToast({ title: '请输入用药时长', icon: 'none' });
      return;
    }
    
    // 验证时间格式
    if (!/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time)) {
      wx.showToast({ title: '请输入正确的时间格式 (HH:MM)', icon: 'none' });
      return;
    }
    
    // 显示加载状态
    wx.showLoading({ title: '编辑中...' });
    
    setTimeout(function() {
      wx.hideLoading();
      
      var updatedMedication = {
        id: id,
        name: name.trim(),
        specification: specification.trim(),
        dosage: dosage.trim(),
        usage: usage.trim(),
        frequency: frequency.trim(),
        time: time.trim(),
        duration: duration.trim(),
        notes: notes.trim()
      };
      
      // 获取全局数据
      var app = getApp();
      if (!app.globalData) {
        app.globalData = {};
      }
      
      // 同步到全局数据
      app.globalData.updatedMedication = updatedMedication;
      
      // 返回上一页
      wx.navigateBack({
        delta: 1,
        success: function() {
          wx.showToast({ title: '编辑成功', icon: 'success' });
        }
      });
    }.bind(this), 1000);
  },
  
  // 取消
  cancel() {
    wx.navigateBack({ delta: 1 });
  }
});