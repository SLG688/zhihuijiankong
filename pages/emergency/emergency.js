// pages/emergency/emergency.js
Page({
  data: {
    emergencyContacts: [
      { name: '李四', relation: '子女', phone: '13900139000' },
      { name: '王五', relation: '邻居', phone: '13800138001' }
    ],
    nearbyHospitals: [
      { name: '市第一人民医院', address: '北京市海淀区中关村南大街5号', distance: '1.2公里' },
      { name: '社区卫生服务中心', address: '北京市海淀区中关村街道', distance: '0.5公里' },
      { name: '急救中心', address: '北京市海淀区学院路38号', distance: '2.3公里' }
    ]
  },
  
  onLoad() {
    // 页面加载时的初始化操作
    console.log('紧急求助页面加载');
  },
  
  // 紧急求助
  callEmergency() {
    wx.showModal({
      title: '紧急求助',
      content: '是否立即联系紧急联系人？',
      confirmText: '确定',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          // 模拟拨打紧急联系人电话
          wx.showLoading({
            title: '正在联系紧急联系人...'
          });
          
          setTimeout(() => {
            wx.hideLoading();
            wx.showToast({
              title: '已联系紧急联系人',
              icon: 'success'
            });
          }, 2000);
        }
      }
    });
  },
  
  // 拨打电话给联系人
  callContact(e) {
    const index = e.currentTarget.dataset.index;
    const contact = this.data.emergencyContacts[index];
    
    // 验证电话号码格式
    if (!/^1[3-9]\d{9}$/.test(contact.phone)) {
      wx.showToast({
        title: '电话号码格式不正确',
        icon: 'none'
      });
      return;
    }
    
    wx.makePhoneCall({
      phoneNumber: contact.phone,
      success: () => {
        console.log('拨打电话成功');
      },
      fail: (error) => {
        console.log('拨打电话失败', error);
        wx.showToast({
          title: '拨打电话失败，请检查号码',
          icon: 'none'
        });
      }
    });
  },
  
  // 导航到医院
  navigateToHospital(e) {
    const index = e.currentTarget.dataset.index;
    const hospital = this.data.nearbyHospitals[index];
    
    // 显示加载状态
    wx.showLoading({
      title: '正在打开导航...'
    });
    
    wx.openLocation({
      latitude: 39.9042,
      longitude: 116.4074,
      name: hospital.name,
      address: hospital.address,
      scale: 18,
      success: () => {
        console.log('打开导航成功');
        wx.hideLoading();
      },
      fail: (error) => {
        console.log('打开导航失败', error);
        wx.hideLoading();
        wx.showToast({
          title: '打开导航失败，请检查地图应用',
          icon: 'none'
        });
      }
    });
  },
  
  // 添加紧急联系人
  addContact() {
    wx.showModal({
      title: '添加紧急联系人',
      content: '此功能将在后续版本中实现',
      showCancel: false
    });
  }
})