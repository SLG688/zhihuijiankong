// utils/permission.js

// 角色定义
const ROLES = {
  USER: 'user',
  ADMIN: 'admin'
};

// 权限定义
const PERMISSIONS = {
  // 普通用户权限
  COMMUNITY_CREATE: 'community:create',
  COMMUNITY_JOIN: 'community:join',
  COMMUNITY_LEAVE: 'community:leave',
  PROFILE_VIEW: 'profile:view',
  COMMUNITY_LIST: 'community:list',
  
  // 管理员权限
  COMMUNITY_MANAGE: 'community:manage',
  USER_MANAGE: 'user:manage',
  CONTENT_MANAGE: 'content:manage',
  SYSTEM_CONFIG: 'system:config'
};

// 角色权限映射
const ROLE_PERMISSIONS = {
  [ROLES.USER]: [
    PERMISSIONS.COMMUNITY_CREATE,
    PERMISSIONS.COMMUNITY_JOIN,
    PERMISSIONS.COMMUNITY_LEAVE,
    PERMISSIONS.PROFILE_VIEW,
    PERMISSIONS.COMMUNITY_LIST
  ],
  [ROLES.ADMIN]: [
    PERMISSIONS.COMMUNITY_CREATE,
    PERMISSIONS.COMMUNITY_JOIN,
    PERMISSIONS.COMMUNITY_LEAVE,
    PERMISSIONS.PROFILE_VIEW,
    PERMISSIONS.COMMUNITY_LIST,
    PERMISSIONS.COMMUNITY_MANAGE,
    PERMISSIONS.USER_MANAGE,
    PERMISSIONS.CONTENT_MANAGE,
    PERMISSIONS.SYSTEM_CONFIG
  ]
};

// 权限检查函数
const hasPermission = (role, permission) => {
  if (!ROLE_PERMISSIONS[role]) {
    return false;
  }
  return ROLE_PERMISSIONS[role].includes(permission);
};

// 检查用户是否为管理员
const isAdmin = (role) => {
  return role === ROLES.ADMIN;
};

// 获取用户角色
const getUserRole = () => {
  // 从本地存储获取用户角色，实际项目中应该从后端获取
  const role = wx.getStorageSync('userRole');
  return role || ROLES.USER; // 默认普通用户
};

// 设置用户角色
const setUserRole = (role) => {
  wx.setStorageSync('userRole', role);
};

// 权限检查包装函数，用于页面调用
const checkPermission = (permission) => {
  const role = getUserRole();
  return hasPermission(role, permission);
};

// 权限检查并提示
const checkPermissionWithTip = (permission) => {
  const role = getUserRole();
  if (!hasPermission(role, permission)) {
    wx.showToast({
      title: '您没有权限执行此操作',
      icon: 'none'
    });
    return false;
  }
  return true;
};

// 记录权限变更日志
const logPermissionChange = (operator, action, details) => {
  const log = {
    operator,
    action,
    details,
    timestamp: new Date().toISOString()
  };
  console.log('权限变更日志:', log);
  // 实际项目中应该发送到后端存储
};

module.exports = {
  ROLES,
  PERMISSIONS,
  hasPermission,
  isAdmin,
  getUserRole,
  setUserRole,
  checkPermission,
  checkPermissionWithTip,
  logPermissionChange
};