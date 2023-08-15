export const state = {
  deviceList: [
    {
      img: require('@/static/icon/device/BTBP.png'),
      title: '血压计',
      detail: '(倍泰静态/动态血压计)',
      url: '/pages/healthMonitor/bloodPressure/device/bloodPressureDevice1',
      deviceInfo: {
        deviceId: uni.getStorageSync('btDeviceId'),
        dName: 'btDeviceId',
        serviceId: '6E400001-B5A3-F393-E0A9-E50E24DCCA9E', //设备的服务值
        characteristicId: '6E400003-B5A3-F393-E0A9-E50E24DCCA9E', // 设备的特征值
      },
    },
    {
      img: require('@/static/icon/device/JKBP.png'),
      title: '血压计',
      detail: '(佳康静态血压计)',
      url: '/pages/healthMonitor/bloodPressure/device/bloodPressureDevice2',
      deviceInfo: {
        deviceId: uni.getStorageSync('jkDeviceId'),
        dName: 'jkDeviceId',
        serviceId: '6E400001-B5A3-F393-E0A9-E50E24DCCA9E', //设备的服务值
        characteristicId: '6E400003-B5A3-F393-E0A9-E50E24DCCA9E', // 设备的特征值
      },
    },

    {
      img: require('@/static/icon/device/JKBGM.png'),
      title: '血糖仪',
      detail: '(佳康静态血糖仪)',
      url: '/pages/template/deviceConnection',
      deviceInfo: {
        deviceId: uni.getStorageSync('jkxtDeviceId'),
        dName: 'jkxtDeviceId',
        serviceId: '0000FFF0-0000-1000-8000-00805F9B34FB', //设备的服务值
        characteristicId: '0000FFF2-0000-1000-8000-00805F9B34FB', // 设备的特征值
      },
    },
    {
      img: require('@/static/icon/device/yitiji.png'),
      title: '血糖尿酸',
      detail: '胆固醇一体机',
      url: '/pages/template/deviceConnection',
      deviceInfo: {
        deviceId: uni.getStorageSync('ytDeviceId'),
        dName: 'ytDeviceId',
        serviceId: '6E400001-B5A3-F393-E0A9-E50E24DCCA9E', //设备的服务值
        characteristicId: '6E400003-B5A3-F393-E0A9-E50E24DCCA9E', // 设备的特征值
      },
    },
    {
      img: require('@/static/icon/device/tizhi.png'),
      title: '体脂秤',
      detail: '',
      url: '/pages/template/BodyFatConnection',
      deviceInfo: {
        deviceId: uni.getStorageSync('tzDeviceId'),
        dName: 'tzDeviceId',
        serviceId: '6E400001-B5A3-F393-E0A9-E50E24DCCA9E', //设备的服务值
        characteristicId: '6E400003-B5A3-F393-E0A9-E50E24DCCA9E', // 设备的特征值
      },
    },
    {
      img: require('@/static/icon/device/ewenqiang.png'),
      url: '/pages/template/deviceConnection',
      detail: '',
      deviceInfo: {
        deviceId: uni.getStorageSync('frDeviceId'),
        dName: 'frDeviceId',
        serviceId: '0000FFF0-0000-1000-8000-00805F9B34FB', //设备的服务值
        characteristicId: '0000FFF2-0000-1000-8000-00805F9B34FB', // 设备的特征值
      },
      title: '额温枪',
    },
    {
      img: require('@/static/icon/device/xuezhi.png'),
      title: '血脂四项仪',
      url: '/pages/template/deviceConnection',
      detail: '',
      deviceInfo: {
        deviceId: uni.getStorageSync('xzDeviceId'),
        dName: 'xzDeviceId',
        serviceId: '6E400001-B5A3-F393-E0A9-E50E24DCCA9E', //设备的服务值
        characteristicId: '6E400003-B5A3-F393-E0A9-E50E24DCCA9E', // 设备的特征值
      },
    },
    {
      img: require('@/static/icon/device/xindiantu.png'),
      title: '心电图仪',
      url: '/pages/template/deviceConnection',
      detail: '',
      deviceInfo: {
        deviceId: uni.getStorageSync('xdDeviceId'),
        dName: 'xdDeviceId',
        serviceId: '6E400001-B5A3-F393-E0A9-E50E24DCCA9E', //设备的服务值
        characteristicId: '6E400003-B5A3-F393-E0A9-E50E24DCCA9E', // 设备的特征值
      },
    },
    {
      img: require('@/static/icon/device/shouhuan.png'),
      title: '心电记录仪',
      url: '/pages/template/deviceConnection',
      detail: '',
      deviceInfo: {
        deviceId: uni.getStorageSync('xdjlDeviceId'),
        dName: 'xdjlDeviceId',
        serviceId: '6E400001-B5A3-F393-E0A9-E50E24DCCA9E', //设备的服务值
        characteristicId: '6E400003-B5A3-F393-E0A9-E50E24DCCA9E', // 设备的特征值
      },
    },
    {
      img: require('@/static/icon/device/xueyang.png'),
      title: '血氧仪',
      url: '/pages/template/deviceConnection',
      detail: '',
      deviceInfo: {
        deviceId: uni.getStorageSync('xyDeviceId'),
        dName: 'xyDeviceId',
        serviceId: '6E400001-B5A3-F393-E0A9-E50E24DCCA9E', //设备的服务值
        characteristicId: '6E400003-B5A3-F393-E0A9-E50E24DCCA9E', // 设备的特征值
      },
    },
    {
      img: require('@/static/icon/device/tiaosheng.png'),
      title: '跳绳',
      url: '/pages/template/JumpRopeConnection',
      detail: '',
      deviceInfo: {
        deviceId: uni.getStorageSync('tsDeviceId'),
        dName: 'tsDeviceId',
        serviceId: '6E400001-B5A3-F393-E0A9-E50E24DCCA9E', //设备的服务值
        characteristicId: '6E400003-B5A3-F393-E0A9-E50E24DCCA9E', // 设备的特征值
      },
    },
    {
      img: require('@/static/icon/device/nutritionScale.png'),
      title: '营养秤',
      url: '/pages/template/KitchenDeviceConnection',
      detail: '',
      deviceInfo: {
        deviceId: uni.getStorageSync('yycDeviceId'),
        dName: 'yycDeviceId',
        serviceId: '6E400001-B5A3-F393-E0A9-E50E24DCCA9E', //设备的服务值
        characteristicId: '6E400003-B5A3-F393-E0A9-E50E24DCCA9E', // 设备的特征值
      },
    },
  ],
}

export const mutations = {
  getDeviceList(state, data) {
    state.deviceList = state.deviceList
    console.log('更新设备列表')
  },
}
export const actions = {}
