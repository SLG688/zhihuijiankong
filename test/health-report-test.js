// test/health-report-test.js
// 健康报告功能测试

// 测试数据
var testData = {
  bloodPressure: [
    { date: '2024-01-20', time: '08:00', value: '125/85' },
    { date: '2024-01-19', time: '08:00', value: '120/80' },
    { date: '2024-01-18', time: '08:00', value: '122/82' }
  ],
  bloodSugar: [
    { date: '2024-01-20', time: '07:30', value: '5.8' },
    { date: '2024-01-19', time: '07:30', value: '5.6' },
    { date: '2024-01-18', time: '07:30', value: '5.7' }
  ],
  heartRate: [
    { date: '2024-01-20', time: '08:00', value: '72' },
    { date: '2024-01-19', time: '08:00', value: '75' },
    { date: '2024-01-18', time: '08:00', value: '73' }
  ]
};

// 模拟分析函数
function analyzeBloodPressure(records) {
  if (records.length === 0) {
    return {
      average: '无数据',
      status: '未记录',
      advice: '建议定期测量血压'
    };
  }
  
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
}

function analyzeBloodSugar(records) {
  if (records.length === 0) {
    return {
      average: '无数据',
      status: '未记录',
      advice: '建议定期测量血糖'
    };
  }
  
  var total = 0;
  for (var i = 0; i < records.length; i++) {
    total += parseFloat(records[i].value);
  }
  var average = (total / records.length).toFixed(1);
  
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
}

function analyzeHeartRate(records) {
  if (records.length === 0) {
    return {
      average: '无数据',
      status: '未记录',
      advice: '建议定期测量心率'
    };
  }
  
  var total = 0;
  for (var i = 0; i < records.length; i++) {
    total += parseInt(records[i].value);
  }
  var average = Math.round(total / records.length);
  
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
}

// 运行测试
console.log('=== 健康报告功能测试 ===');

// 测试血压分析
console.log('\n1. 血压分析测试:');
var bloodPressureResult = analyzeBloodPressure(testData.bloodPressure);
console.log('平均血压:', bloodPressureResult.average);
console.log('状态:', bloodPressureResult.status);
console.log('建议:', bloodPressureResult.advice);

// 测试血糖分析
console.log('\n2. 血糖分析测试:');
var bloodSugarResult = analyzeBloodSugar(testData.bloodSugar);
console.log('平均血糖:', bloodSugarResult.average);
console.log('状态:', bloodSugarResult.status);
console.log('建议:', bloodSugarResult.advice);

// 测试心率分析
console.log('\n3. 心率分析测试:');
var heartRateResult = analyzeHeartRate(testData.heartRate);
console.log('平均心率:', heartRateResult.average);
console.log('状态:', heartRateResult.status);
console.log('建议:', heartRateResult.advice);

console.log('\n=== 测试完成 ===');
