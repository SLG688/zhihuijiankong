// utils/storage.js
// 本地存储工具类

/**
 * 保存数据到本地存储
 * @param {string} key 存储键名
 * @param {any} data 存储数据
 */
export function saveData(key, data) {
  try {
    wx.setStorageSync(key, data);
    return true;
  } catch (error) {
    console.error('保存数据失败:', error);
    return false;
  }
}

/**
 * 从本地存储读取数据
 * @param {string} key 存储键名
 * @param {any} defaultValue 默认值
 * @returns {any} 存储的数据或默认值
 */
export function loadData(key, defaultValue = null) {
  try {
    const data = wx.getStorageSync(key);
    return data !== '' ? data : defaultValue;
  } catch (error) {
    console.error('读取数据失败:', error);
    return defaultValue;
  }
}

/**
 * 清除本地存储数据
 * @param {string} key 存储键名
 */
export function removeData(key) {
  try {
    wx.removeStorageSync(key);
    return true;
  } catch (error) {
    console.error('清除数据失败:', error);
    return false;
  }
}

/**
 * 清除所有本地存储数据
 */
export function clearAllData() {
  try {
    wx.clearStorageSync();
    return true;
  } catch (error) {
    console.error('清除所有数据失败:', error);
    return false;
  }
}

/**
 * 保存健康数据
 * @param {object} healthData 健康数据
 */
export function saveHealthData(healthData) {
  return saveData('healthData', healthData);
}

/**
 * 读取健康数据
 * @returns {object} 健康数据
 */
export function loadHealthData() {
  return loadData('healthData', {
    bloodPressure: [],
    bloodSugar: [],
    heartRate: [],
    weight: [],
    exercise: [],
    sleep: []
  });
}

/**
 * 保存用药提醒数据
 * @param {array} medicationReminders 用药提醒数据
 */
export function saveMedicationReminders(medicationReminders) {
  return saveData('medicationReminders', medicationReminders);
}

/**
 * 读取用药提醒数据
 * @returns {array} 用药提醒数据
 */
export function loadMedicationReminders() {
  return loadData('medicationReminders', [
    { time: '08:00', content: '服用缬沙坦胶囊 80mg', status: '未服用' },
    { time: '18:00', content: '服用二甲双胍 500mg', status: '未服用' }
  ]);
}

/**
 * 保存用户信息
 * @param {object} userInfo 用户信息
 */
export function saveUserInfo(userInfo) {
  return saveData('userInfo', userInfo);
}

/**
 * 读取用户信息
 * @returns {object} 用户信息
 */
export function loadUserInfo() {
  return loadData('userInfo', null);
}

/**
 * 保存紧急联系人
 * @param {array} emergencyContacts 紧急联系人
 */
export function saveEmergencyContacts(emergencyContacts) {
  return saveData('emergencyContacts', emergencyContacts);
}

/**
 * 读取紧急联系人
 * @returns {array} 紧急联系人
 */
export function loadEmergencyContacts() {
  return loadData('emergencyContacts', []);
}