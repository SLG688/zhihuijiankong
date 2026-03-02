// pages/medication/add-medication/add-medication.js
Page({
  data: {
    addForm: {
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
  
  onLoad() {
    console.log('添加用药页面加载');
  },
  
  // 绑定表单输入
  bindFormInput(e) {
    var field = e.currentTarget.dataset.field;
    var value = e.detail.value;
    var key = 'addForm.' + field;
    var data = {};
    data[key] = value;
    this.setData(data);
  },
  
  // 提交表单
  submitForm() {
    var addForm = this.data.addForm;
    var name = addForm.name;
    var specification = addForm.specification;
    var dosage = addForm.dosage;
    var usage = addForm.usage;
    var frequency = addForm.frequency;
    var time = addForm.time;
    var duration = addForm.duration;
    var notes = addForm.notes;
    
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
    
    // 验证剂量单位
    if (!/[mg|g|ml|片|粒|支|袋|瓶]/.test(dosage)) {
      wx.showToast({ title: '请在剂量中明确标注单位（如mg、g、ml等）', icon: 'none' });
      return;
    }
    
    // 验证用法
    if (!/[口服|外用|注射|含服|舌下|滴眼|滴鼻|耳滴]/.test(usage)) {
      wx.showToast({ title: '请明确标注具体服用方法（如口服、外用、注射等）', icon: 'none' });
      return;
    }
    
    // 验证用药时间
    if (!/[0-9:]+/.test(time)) {
      wx.showToast({ title: '请精确到具体时间点或时间段（如早8点、午12点、晚8点）', icon: 'none' });
      return;
    }
    
    // 验证用药时长
    if (!/[0-9天|周|月|疗程|症状缓解]/.test(duration)) {
      wx.showToast({ title: '请明确标注用药总疗程或持续天数（如连续服用7天、服用至症状缓解等）', icon: 'none' });
      return;
    }
    
    // 显示加载状态
    wx.showLoading({ title: '添加中...' });
    
    setTimeout(function() {
      wx.hideLoading();
      
      var newMedication = {
        id: Date.now(),
        name: name.trim(),
        specification: specification.trim(),
        dosage: dosage.trim(),
        usage: usage.trim(),
        frequency: frequency.trim(),
        time: time.trim(),
        duration: duration.trim(),
        notes: notes.trim(),
        status: '未服用'
      };
      
      // 获取全局数据
      var app = getApp();
      if (!app.globalData) {
        app.globalData = {};
      }
      if (!app.globalData.medicationReminders) {
        app.globalData.medicationReminders = [];
      }
      
      // 同步到全局数据
      app.globalData.newMedication = newMedication;
      
      // 返回上一页
      wx.navigateBack({
        delta: 1,
        success: function() {
          wx.showToast({ title: '添加成功', icon: 'success' });
        }
      });
    }.bind(this), 1000);
  },
  
  // 取消
  cancel() {
    wx.navigateBack({ delta: 1 });
  }
});