// pages/health-monitor/health-monitor.js
// 导入存储工具类和验证工具类
const { saveHealthData } = require('../../utils/storage');
const { 
  validateRequired, 
  validateNumber, 
  validateBloodPressure, 
  validateBloodSugar, 
  validateHeartRate, 
  validateWeight, 
  validateExerciseDuration, 
  validateSleepDuration 
} = require('../../utils/validator');

Page({
  data: {
    systolic: '',
    diastolic: '',
    bloodSugar: '',
    heartRate: '',
    weight: '',
    exerciseDuration: '',
    sleepDuration: '',
    bloodSugarTimes: ['空腹', '餐后2小时', '随机'],
    selectedBloodSugarTime: '空腹',
    exerciseTypes: ['散步', '慢跑', '太极拳', '游泳', '瑜伽', '其他'],
    selectedExerciseType: '散步',
    exerciseIntensities: ['低强度', '中强度', '高强度'],
    selectedExerciseIntensity: '中强度',
    sleepQualities: ['差', '一般', '良好', '优秀'],
    selectedSleepQuality: '一般',
    healthMetrics: ['血压', '血糖', '心率', '体重', '运动', '睡眠'],
    selectedHealthMetric: '血压',
    timeRanges: ['按日', '按周', '按月'],
    selectedTimeRange: '按日',
    deviceStatus: '未连接设备'
  },
  
  onLoad() {
    // 页面加载时的初始化操作
    console.log('健康监测页面加载');
  },
  
  onShow() {
    // 页面显示时绘制图表
    this.drawTrendChart();
  },
  
  // 绑定收缩压输入
  bindSystolicInput(e) {
    this.setData({ systolic: e.detail.value });
  },
  
  // 绑定舒张压输入
  bindDiastolicInput(e) {
    this.setData({ diastolic: e.detail.value });
  },
  
  // 绑定血糖输入
  bindBloodSugarInput(e) {
    this.setData({ bloodSugar: e.detail.value });
  },
  
  // 绑定血糖时间选择
  bindBloodSugarTimeChange(e) {
    this.setData({ selectedBloodSugarTime: this.data.bloodSugarTimes[e.detail.value] });
  },
  
  // 绑定心率输入
  bindHeartRateInput(e) {
    this.setData({ heartRate: e.detail.value });
  },
  
  // 绑定体重输入
  bindWeightInput(e) {
    this.setData({ weight: e.detail.value });
  },
  
  // 绑定运动类型选择
  bindExerciseTypeChange(e) {
    this.setData({ selectedExerciseType: this.data.exerciseTypes[e.detail.value] });
  },
  
  // 绑定运动时长输入
  bindExerciseDurationInput(e) {
    this.setData({ exerciseDuration: e.detail.value });
  },
  
  // 绑定运动强度选择
  bindExerciseIntensityChange(e) {
    this.setData({ selectedExerciseIntensity: this.data.exerciseIntensities[e.detail.value] });
  },
  
  // 绑定睡眠时长输入
  bindSleepDurationInput(e) {
    this.setData({ sleepDuration: e.detail.value });
  },
  
  // 绑定睡眠质量选择
  bindSleepQualityChange(e) {
    this.setData({ selectedSleepQuality: this.data.sleepQualities[e.detail.value] });
  },

  
  // 记录血压
  recordBloodPressure() {
    const systolic = this.data.systolic;
    const diastolic = this.data.diastolic;
    
    // 验证输入
    if (!validateRequired(systolic, '请输入收缩压')) return;
    if (!validateRequired(diastolic, '请输入舒张压')) return;
    if (!validateNumber(systolic, '请输入有效的收缩压')) return;
    if (!validateNumber(diastolic, '请输入有效的舒张压')) return;
    if (!validateBloodPressure(systolic, diastolic)) return;
    
    // 显示加载状态
    wx.showLoading({
      title: '记录中...'
    });
    
    // 记录血压数据
    const app = getApp();
    const bloodPressureData = {
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().substring(0, 5),
      value: systolic + '/' + diastolic
    };
    
    app.globalData.healthData.bloodPressure.push(bloodPressureData);
    
    // 保存到本地存储
    saveHealthData(app.globalData.healthData);
    
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '血压记录成功',
        icon: 'success'
      });
      
      // 清空输入
      this.setData({ systolic: '', diastolic: '' });
      
      // 更新数据趋势图表
      this.drawTrendChart();
    }, 500);
  },
  
  // 记录血糖
  recordBloodSugar() {
    const bloodSugar = this.data.bloodSugar;
    const selectedBloodSugarTime = this.data.selectedBloodSugarTime;
    
    // 验证输入
    if (!validateRequired(bloodSugar, '请输入血糖值')) return;
    if (!validateNumber(bloodSugar, '请输入有效的血糖值')) return;
    if (!validateBloodSugar(bloodSugar)) return;
    
    // 显示加载状态
    wx.showLoading({
      title: '记录中...'
    });
    
    // 记录血糖数据
    const app = getApp();
    const bloodSugarData = {
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().substring(0, 5),
      value: bloodSugar,
      type: selectedBloodSugarTime
    };
    
    app.globalData.healthData.bloodSugar.push(bloodSugarData);
    
    // 保存到本地存储
    saveHealthData(app.globalData.healthData);
    
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '血糖记录成功',
        icon: 'success'
      });
      
      // 清空输入
      this.setData({ bloodSugar: '' });
      
      // 更新数据趋势图表
      this.drawTrendChart();
    }, 500);
  },
  
  // 记录心率
  recordHeartRate() {
    const heartRate = this.data.heartRate;
    
    // 验证输入
    if (!validateRequired(heartRate, '请输入心率值')) return;
    if (!validateNumber(heartRate, '请输入有效的心率值')) return;
    if (!validateHeartRate(heartRate)) return;
    
    // 显示加载状态
    wx.showLoading({
      title: '记录中...'
    });
    
    // 记录心率数据
    const app = getApp();
    const heartRateData = {
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().substring(0, 5),
      value: heartRate
    };
    
    app.globalData.healthData.heartRate.push(heartRateData);
    
    // 保存到本地存储
    saveHealthData(app.globalData.healthData);
    
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '心率记录成功',
        icon: 'success'
      });
      
      // 清空输入
      this.setData({ heartRate: '' });
      
      // 更新数据趋势图表
      this.drawTrendChart();
    }, 500);
  },
  
  // 记录体重
  recordWeight() {
    const weight = this.data.weight;
    
    // 验证输入
    if (!validateRequired(weight, '请输入体重值')) return;
    if (!validateNumber(weight, '请输入有效的体重值')) return;
    if (!validateWeight(weight)) return;
    
    // 显示加载状态
    wx.showLoading({
      title: '记录中...'
    });
    
    // 记录体重数据
    const app = getApp();
    const weightData = {
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().substring(0, 5),
      value: weight
    };
    
    app.globalData.healthData.weight.push(weightData);
    
    // 保存到本地存储
    saveHealthData(app.globalData.healthData);
    
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '体重记录成功',
        icon: 'success'
      });
      
      // 清空输入
      this.setData({ weight: '' });
      
      // 更新数据趋势图表
      this.drawTrendChart();
    }, 500);
  },
  
  // 记录运动
  recordExercise() {
    const exerciseDuration = this.data.exerciseDuration;
    const selectedExerciseType = this.data.selectedExerciseType;
    const selectedExerciseIntensity = this.data.selectedExerciseIntensity;
    
    // 验证输入
    if (!validateRequired(exerciseDuration, '请输入运动时长')) return;
    if (!validateNumber(exerciseDuration, '请输入有效的运动时长')) return;
    if (!validateExerciseDuration(exerciseDuration)) return;
    
    // 显示加载状态
    wx.showLoading({
      title: '记录中...'
    });
    
    // 记录运动数据
    const app = getApp();
    const exerciseData = {
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().substring(0, 5),
      type: selectedExerciseType,
      duration: exerciseDuration,
      intensity: selectedExerciseIntensity
    };
    
    app.globalData.healthData.exercise.push(exerciseData);
    
    // 保存到本地存储
    saveHealthData(app.globalData.healthData);
    
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '运动记录成功',
        icon: 'success'
      });
      
      // 清空输入
      this.setData({ exerciseDuration: '' });
      
      // 更新数据趋势图表
      this.drawTrendChart();
    }, 500);
  },
  
  // 记录睡眠
  recordSleep() {
    const sleepDuration = this.data.sleepDuration;
    const selectedSleepQuality = this.data.selectedSleepQuality;
    
    // 验证输入
    if (!validateRequired(sleepDuration, '请输入睡眠时长')) return;
    if (!validateNumber(sleepDuration, '请输入有效的睡眠时长')) return;
    if (!validateSleepDuration(sleepDuration)) return;
    
    // 显示加载状态
    wx.showLoading({
      title: '记录中...'
    });
    
    // 记录睡眠数据
    const app = getApp();
    const sleepData = {
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().substring(0, 5),
      duration: sleepDuration,
      quality: selectedSleepQuality
    };
    
    app.globalData.healthData.sleep.push(sleepData);
    
    // 保存到本地存储
    saveHealthData(app.globalData.healthData);
    
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '睡眠记录成功',
        icon: 'success'
      });
      
      // 清空输入
      this.setData({ sleepDuration: '' });
      
      // 更新数据趋势图表
      this.drawTrendChart();
    }, 500);
  },
  
  // 连接设备
  connectDevice() {
    wx.showLoading({
      title: '正在连接设备...'
    });
    
    setTimeout(() => {
      wx.hideLoading();
      this.setData({ deviceStatus: '设备已连接' });
      wx.showToast({
        title: '设备连接成功',
        icon: 'success'
      });
    }, 2000);
  },
  
  // 绘制数据趋势图表
  drawTrendChart() {
    const app = getApp();
    const healthData = app.globalData && app.globalData.healthData ? app.globalData.healthData : {
      bloodPressure: [],
      bloodSugar: [],
      heartRate: [],
      weight: [],
      exercise: [],
      sleep: []
    };
    
    const selectedHealthMetric = this.data.selectedHealthMetric;
    const selectedTimeRange = this.data.selectedTimeRange;
    let data = [];
    let labels = [];
    let unit = '';
    let title = '';
    let referenceRange = { min: 0, max: 0 };
    
    // 根据选择的健康指标获取对应数据
    switch (selectedHealthMetric) {
      case '血压':
        data = [];
        for (let i = 0; i < healthData.bloodPressure.length; i++) {
          const item = healthData.bloodPressure[i];
          const values = item.value.split('/');
          const systolic = Number(values[0]);
          data.push(systolic);
        };
        labels = [];
        for (let i = 0; i < healthData.bloodPressure.length; i++) {
          const item = healthData.bloodPressure[i];
          labels.push(this.formatTimeLabel(item.date, item.time, selectedTimeRange));
        };
        unit = 'mmHg';
        title = '血压趋势';
        referenceRange = { min: 90, max: 140 };
        break;
      case '血糖':
        data = [];
        for (let i = 0; i < healthData.bloodSugar.length; i++) {
          const item = healthData.bloodSugar[i];
          data.push(Number(item.value));
        };
        labels = [];
        for (let i = 0; i < healthData.bloodSugar.length; i++) {
          const item = healthData.bloodSugar[i];
          labels.push(this.formatTimeLabel(item.date, item.time, selectedTimeRange));
        };
        unit = 'mmol/L';
        title = '血糖趋势';
        referenceRange = { min: 3.9, max: 6.1 };
        break;
      case '心率':
        data = [];
        for (let i = 0; i < healthData.heartRate.length; i++) {
          const item = healthData.heartRate[i];
          data.push(Number(item.value));
        };
        labels = [];
        for (let i = 0; i < healthData.heartRate.length; i++) {
          const item = healthData.heartRate[i];
          labels.push(this.formatTimeLabel(item.date, item.time, selectedTimeRange));
        };
        unit = '次/分钟';
        title = '心率趋势';
        referenceRange = { min: 60, max: 100 };
        break;
      case '体重':
        data = [];
        for (let i = 0; i < healthData.weight.length; i++) {
          const item = healthData.weight[i];
          data.push(Number(item.value));
        };
        labels = [];
        for (let i = 0; i < healthData.weight.length; i++) {
          const item = healthData.weight[i];
          labels.push(this.formatTimeLabel(item.date, item.time, selectedTimeRange));
        };
        unit = 'kg';
        title = '体重趋势';
        referenceRange = { min: 50, max: 70 };
        break;
      case '运动':
        data = [];
        for (let i = 0; i < healthData.exercise.length; i++) {
          const item = healthData.exercise[i];
          data.push(Number(item.duration));
        };
        labels = [];
        for (let i = 0; i < healthData.exercise.length; i++) {
          const item = healthData.exercise[i];
          labels.push(this.formatTimeLabel(item.date, item.time, selectedTimeRange));
        };
        unit = '分钟';
        title = '运动时长趋势';
        referenceRange = { min: 0, max: 60 };
        break;
      case '睡眠':
        data = [];
        for (let i = 0; i < healthData.sleep.length; i++) {
          const item = healthData.sleep[i];
          data.push(Number(item.duration));
        };
        labels = [];
        for (let i = 0; i < healthData.sleep.length; i++) {
          const item = healthData.sleep[i];
          labels.push(this.formatTimeLabel(item.date, item.time, selectedTimeRange));
        };
        unit = '小时';
        title = '睡眠时长趋势';
        referenceRange = { min: 6, max: 8 };
        break;
    }
    
    // 按时间范围过滤数据
    data = this.filterDataByTimeRange(data, labels, selectedTimeRange);
    
    // 获取Canvas上下文
    const ctx = wx.createCanvasContext('trendChart');
    
    // 绘制图表
    this.drawChart(ctx, data, labels, title, unit, referenceRange);
  },
  
  // 格式化时间标签
  formatTimeLabel(date, time, timeRange) {
    switch (timeRange) {
      case '按日':
        return time;
      case '按周':
        return date.substring(5);
      case '按月':
        return date.substring(0, 7);
      default:
        return time;
    }
  },
  
  // 按时间范围过滤数据
  filterDataByTimeRange(data, labels, timeRange) {
    // 这里可以根据时间范围实现更复杂的过滤逻辑
    // 目前简单返回所有数据
    return data;
  },
  
  // 绘制图表
  drawChart(ctx, data, labels, title, unit, referenceRange) {
    const canvasWidth = 300;
    const canvasHeight = 200;
    const padding = 40;
    const chartWidth = canvasWidth - 2 * padding;
    const chartHeight = canvasHeight - 2 * padding;
    
    // 清空画布
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    if (data.length === 0) {
      ctx.setFontSize(14);
      ctx.setFillStyle('#999');
      ctx.setTextAlign('center');
      ctx.fillText('暂无数据', canvasWidth / 2, canvasHeight / 2);
      ctx.draw();
      return;
    }
    
    // 计算数据范围
    let minValue = referenceRange.min * 0.8;
    let maxValue = referenceRange.max * 1.2;
    for (let i = 0; i < data.length; i++) {
      if (data[i] < minValue) {
        minValue = data[i];
      }
      if (data[i] > maxValue) {
        maxValue = data[i];
      }
    }
    minValue *= 0.9;
    maxValue *= 1.1;
    const valueRange = maxValue - minValue;
    
    // 绘制标题
    ctx.setFontSize(16);
    ctx.setFillStyle('#333');
    ctx.setTextAlign('center');
    ctx.fillText(title, canvasWidth / 2, padding / 2);
    
    // 绘制坐标轴
    ctx.setStrokeStyle('#ddd');
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvasHeight - padding);
    ctx.lineTo(canvasWidth - padding, canvasHeight - padding);
    ctx.stroke();
    
    // 绘制正常参考范围
    const refMinY = canvasHeight - padding - ((referenceRange.min - minValue) / valueRange) * chartHeight;
    const refMaxY = canvasHeight - padding - ((referenceRange.max - minValue) / valueRange) * chartHeight;
    
    ctx.setFillStyle('rgba(76, 175, 80, 0.1)');
    ctx.beginPath();
    ctx.moveTo(padding, refMinY);
    ctx.lineTo(canvasWidth - padding, refMinY);
    ctx.lineTo(canvasWidth - padding, refMaxY);
    ctx.lineTo(padding, refMaxY);
    ctx.closePath();
    ctx.fill();
    
    ctx.setStrokeStyle('rgba(76, 175, 80, 0.5)');
    ctx.beginPath();
    ctx.moveTo(padding, refMinY);
    ctx.lineTo(canvasWidth - padding, refMinY);
    ctx.moveTo(padding, refMaxY);
    ctx.lineTo(canvasWidth - padding, refMaxY);
    ctx.stroke();
    
    // 绘制数据点和连线
    ctx.setStrokeStyle('#2196F3');
    ctx.setFillStyle('#2196F3');
    ctx.beginPath();
    
    for (let i = 0; i < data.length; i++) {
      const value = data[i];
      const x = padding + (i / (data.length - 1)) * chartWidth;
      const y = canvasHeight - padding - ((value - minValue) / valueRange) * chartHeight;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
    
    // 绘制数据点
    for (let i = 0; i < data.length; i++) {
      const value = data[i];
      const x = padding + (i / (data.length - 1)) * chartWidth;
      const y = canvasHeight - padding - ((value - minValue) / valueRange) * chartHeight;
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
    }
    
    // 绘制数据标签
    ctx.setFontSize(10);
    ctx.setFillStyle('#666');
    ctx.setTextAlign('center');
    
    for (let i = 0; i < labels.length; i++) {
      const label = labels[i];
      const x = padding + (i / (data.length - 1)) * chartWidth;
      ctx.fillText(label, x, canvasHeight - padding + 15);
    }
    
    // 绘制单位
    ctx.setFontSize(10);
    ctx.setFillStyle('#999');
    ctx.setTextAlign('right');
    ctx.fillText(unit, canvasWidth - padding, padding - 5);
    
    // 绘制参考范围标签
    ctx.setFontSize(10);
    ctx.setFillStyle('#4CAF50');
    ctx.setTextAlign('left');
    ctx.fillText('正常范围: ' + referenceRange.min + '-' + referenceRange.max + ' ' + unit, padding, padding - 5);
    
    ctx.draw();
  },
  
  // 健康指标改变时重新绘制图表
  bindHealthMetricChange(e) {
    const selectedHealthMetric = this.data.healthMetrics[e.detail.value];
    this.setData({ selectedHealthMetric });
    this.drawTrendChart();
  },
  
  // 时间范围改变时重新绘制图表
  bindTimeRangeChange(e) {
    const selectedTimeRange = this.data.timeRanges[e.detail.value];
    this.setData({ selectedTimeRange });
    this.drawTrendChart();
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