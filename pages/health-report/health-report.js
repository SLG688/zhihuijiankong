// pages/health-report/health-report.js
Page({
  data: {
    report: {
      date: '',
      summary: '',
      bloodPressure: {
        average: '',
        status: '',
        advice: ''
      },
      bloodSugar: {
        average: '',
        status: '',
        advice: ''
      },
      heartRate: {
        average: '',
        status: '',
        advice: ''
      },
      overallAdvice: ''
    }
  },
  
  onLoad: function(options) {
    // 页面加载时的初始化操作
    console.log('健康报告页面加载', options);
    
    // 从全局数据获取健康数据
    var app = getApp();
    var healthData = app.globalData && app.globalData.healthData ? app.globalData.healthData : {
      bloodPressure: [],
      bloodSugar: [],
      heartRate: [],
      weight: []
    };
    
    // 生成健康报告
    this.generateReport(healthData);
  },
  
  // 生成健康报告
  generateReport: function(healthData) {
    var report = {
      date: new Date().toISOString().split('T')[0],
      summary: '',
      bloodPressure: this.analyzeBloodPressure(healthData.bloodPressure),
      bloodSugar: this.analyzeBloodSugar(healthData.bloodSugar),
      heartRate: this.analyzeHeartRate(healthData.heartRate),
      overallAdvice: ''
    };
    
    // 生成总体摘要
    report.summary = this.generateSummary(report);
    
    // 生成总体建议
    report.overallAdvice = this.generateOverallAdvice(report);
    
    this.setData({ report: report });
  },
  
  // 分析血压数据
  analyzeBloodPressure: function(records) {
    if (records.length === 0) {
      return {
        average: '无数据',
        status: '未记录',
        advice: '建议定期测量血压'
      };
    }
    
    // 计算平均血压
    var totalSystolic = 0;
    var totalDiastolic = 0;
    for (var i = 0; i < records.length; i++) {
      var values = records[i].value.split('/');
      totalSystolic += parseInt(values[0]);
      totalDiastolic += parseInt(values[1]);
    }
    var avgSystolic = Math.round(totalSystolic / records.length);
    var avgDiastolic = Math.round(totalDiastolic / records.length);
    var average = avgSystolic + '/' + avgDiastolic;
    
    // 评估血压状态
    var status = '';
    var advice = '';
    if (avgSystolic < 90 || avgDiastolic < 60) {
      status = '低血压';
      advice = '建议增加盐分摄入，保持充足水分，避免长时间站立';
    } else if (avgSystolic < 120 && avgDiastolic < 80) {
      status = '正常';
      advice = '继续保持良好的生活习惯';
    } else if (avgSystolic < 140 && avgDiastolic < 90) {
      status = '正常高值';
      advice = '建议减少盐分摄入，增加运动，定期监测';
    } else {
      status = '高血压';
      advice = '建议遵循医嘱服药，减少盐分摄入，增加运动，定期监测';
    }
    
    return {
      average: average,
      status: status,
      advice: advice
    };
  },
  
  // 分析血糖数据
  analyzeBloodSugar: function(records) {
    if (records.length === 0) {
      return {
        average: '无数据',
        status: '未记录',
        advice: '建议定期测量血糖'
      };
    }
    
    // 计算平均血糖
    var total = 0;
    for (var i = 0; i < records.length; i++) {
      total += parseFloat(records[i].value);
    }
    var average = (total / records.length).toFixed(1);
    
    // 评估血糖状态
    var status = '';
    var advice = '';
    if (average < 3.9) {
      status = '低血糖';
      advice = '建议及时补充糖分，避免长时间空腹';
    } else if (average < 6.1) {
      status = '正常';
      advice = '继续保持良好的饮食和生活习惯';
    } else if (average < 7.0) {
      status = '糖耐量异常';
      advice = '建议控制饮食，增加运动，定期监测';
    } else {
      status = '高血糖';
      advice = '建议遵循医嘱服药，控制饮食，增加运动，定期监测';
    }
    
    return {
      average: average,
      status: status,
      advice: advice
    };
  },
  
  // 分析心率数据
  analyzeHeartRate: function(records) {
    if (records.length === 0) {
      return {
        average: '无数据',
        status: '未记录',
        advice: '建议定期测量心率'
      };
    }
    
    // 计算平均心率
    var total = 0;
    for (var i = 0; i < records.length; i++) {
      total += parseInt(records[i].value);
    }
    var average = Math.round(total / records.length);
    
    // 评估心率状态
    var status = '';
    var advice = '';
    if (average < 60) {
      status = '心动过缓';
      advice = '建议咨询医生，注意休息，避免剧烈运动';
    } else if (average < 100) {
      status = '正常';
      advice = '继续保持良好的生活习惯';
    } else {
      status = '心动过速';
      advice = '建议减少咖啡因摄入，避免紧张和焦虑，必要时咨询医生';
    }
    
    return {
      average: average,
      status: status,
      advice: advice
    };
  },
  
  // 生成总体摘要
  generateSummary: function(report) {
    var summaries = [];
    
    if (report.bloodPressure.status !== '未记录') {
      summaries.push('血压' + report.bloodPressure.status);
    }
    
    if (report.bloodSugar.status !== '未记录') {
      summaries.push('血糖' + report.bloodSugar.status);
    }
    
    if (report.heartRate.status !== '未记录') {
      summaries.push('心率' + report.heartRate.status);
    }
    
    if (summaries.length === 0) {
      return '暂无健康数据记录';
    }
    
    return summaries.join('，') + '，建议保持良好作息';
  },
  
  // 生成总体建议
  generateOverallAdvice: function(report) {
    var advices = [];
    
    if (report.bloodPressure.advice && report.bloodPressure.status !== '未记录') {
      advices.push(report.bloodPressure.advice);
    }
    
    if (report.bloodSugar.advice && report.bloodSugar.status !== '未记录') {
      advices.push(report.bloodSugar.advice);
    }
    
    if (report.heartRate.advice && report.heartRate.status !== '未记录') {
      advices.push(report.heartRate.advice);
    }
    
    // 添加通用建议
    advices.push('保持规律作息，充足睡眠');
    advices.push('合理饮食，控制盐分和糖分摄入');
    advices.push('适当运动，如散步、太极拳等');
    advices.push('定期监测健康数据，如有异常及时就医');
    
    return advices.join('\n');
  },
  
  // 返回健康档案页面
  goBack: function() {
    wx.navigateBack();
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