// utils/validator.js
// 数据验证工具类

/**
 * 验证输入是否为空
 * @param {string} value 输入值
 * @param {string} message 错误提示信息
 * @returns {boolean} 是否验证通过
 */
export function validateRequired(value, message) {
  if (!value || value.trim() === '') {
    wx.showToast({
      title: message,
      icon: 'none'
    });
    return false;
  }
  return true;
}

/**
 * 验证是否为数字
 * @param {string} value 输入值
 * @param {string} message 错误提示信息
 * @returns {boolean} 是否验证通过
 */
export function validateNumber(value, message) {
  if (isNaN(value)) {
    wx.showToast({
      title: message,
      icon: 'none'
    });
    return false;
  }
  return true;
}

/**
 * 验证数字范围
 * @param {number} value 输入值
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @param {string} message 错误提示信息
 * @returns {boolean} 是否验证通过
 */
export function validateRange(value, min, max, message) {
  const num = Number(value);
  if (num < min || num > max) {
    wx.showToast({
      title: message,
      icon: 'none'
    });
    return false;
  }
  return true;
}

/**
 * 验证血压范围
 * @param {string} systolic 收缩压
 * @param {string} diastolic 舒张压
 * @returns {boolean} 是否验证通过
 */
export function validateBloodPressure(systolic, diastolic) {
  const systolicNum = Number(systolic);
  const diastolicNum = Number(diastolic);
  
  if (systolicNum < 60 || systolicNum > 200) {
    wx.showToast({
      title: '收缩压值超出正常范围',
      icon: 'none'
    });
    return false;
  }
  
  if (diastolicNum < 40 || diastolicNum > 120) {
    wx.showToast({
      title: '舒张压值超出正常范围',
      icon: 'none'
    });
    return false;
  }
  
  if (systolicNum < diastolicNum) {
    wx.showToast({
      title: '收缩压不能小于舒张压',
      icon: 'none'
    });
    return false;
  }
  
  return true;
}

/**
 * 验证血糖范围
 * @param {string} bloodSugar 血糖值
 * @returns {boolean} 是否验证通过
 */
export function validateBloodSugar(bloodSugar) {
  const bloodSugarNum = Number(bloodSugar);
  if (bloodSugarNum < 2 || bloodSugarNum > 33) {
    wx.showToast({
      title: '血糖值超出正常范围',
      icon: 'none'
    });
    return false;
  }
  return true;
}

/**
 * 验证心率范围
 * @param {string} heartRate 心率值
 * @returns {boolean} 是否验证通过
 */
export function validateHeartRate(heartRate) {
  const heartRateNum = Number(heartRate);
  if (heartRateNum < 40 || heartRateNum > 200) {
    wx.showToast({
      title: '心率值超出正常范围',
      icon: 'none'
    });
    return false;
  }
  return true;
}

/**
 * 验证体重范围
 * @param {string} weight 体重值
 * @returns {boolean} 是否验证通过
 */
export function validateWeight(weight) {
  const weightNum = Number(weight);
  if (weightNum < 30 || weightNum > 200) {
    wx.showToast({
      title: '体重值超出正常范围',
      icon: 'none'
    });
    return false;
  }
  return true;
}

/**
 * 验证运动时长范围
 * @param {string} duration 运动时长
 * @returns {boolean} 是否验证通过
 */
export function validateExerciseDuration(duration) {
  const durationNum = Number(duration);
  if (durationNum < 1 || durationNum > 300) {
    wx.showToast({
      title: '运动时长超出合理范围',
      icon: 'none'
    });
    return false;
  }
  return true;
}

/**
 * 验证睡眠时长范围
 * @param {string} duration 睡眠时长
 * @returns {boolean} 是否验证通过
 */
export function validateSleepDuration(duration) {
  const durationNum = Number(duration);
  if (durationNum < 1 || durationNum > 24) {
    wx.showToast({
      title: '睡眠时长超出合理范围',
      icon: 'none'
    });
    return false;
  }
  return true;
}

/**
 * 验证手机号
 * @param {string} phone 手机号
 * @returns {boolean} 是否验证通过
 */
export function validatePhone(phone) {
  const phoneRegex = /^1[3-9]\d{9}$/;
  if (!phoneRegex.test(phone)) {
    wx.showToast({
      title: '请输入有效的手机号',
      icon: 'none'
    });
    return false;
  }
  return true;
}

/**
 * 验证身份证号
 * @param {string} idCard 身份证号
 * @returns {boolean} 是否验证通过
 */
export function validateIdCard(idCard) {
  const idCardRegex = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/;
  if (!idCardRegex.test(idCard)) {
    wx.showToast({
      title: '请输入有效的身份证号',
      icon: 'none'
    });
    return false;
  }
  return true;
}