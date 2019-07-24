var navList = [
  {
    selected: false,
    active: false,
    text: '首页',
    icon: 'fa-star-o',
    name: 'main',
    children: []
  },
  {
    selected: false,
    active: false,
    text: '个人中心',
    icon: '../../resource/images/icon/user.png',
    name: '',
    children: [
      {
        active: false,
        text: '我的资料',
        icon: '../../resource/images/icon/children.png',
        name: 'myInformation'
      },
      {
        active: false,
        text: '我的合同',
        icon: '../../resource/images/icon/children.png',
        name: 'myContract'
      },
      {
        active: false,
        text: '电子公告',
        icon: '../../resource/images/icon/children.png',
        name: 'electronicNotice'
      },
      {
        active: false,
        text: '消息通知',
        icon: '../../resource/images/icon/children.png',
        name: 'msgNotice'
      },
      {
        active: false,
        text: '修改密码',
        icon: '../../resource/images/icon/children.png',
        name: 'pwdModify'
      }
    ]
  },
  // {
  //   selected: false, active: false, text: 'test1', icon: 'fa-star-o', name: 'test1'
  // },
  {
    selected: false,
    active: false,
    text: '我的游戏',
    icon: '../../resource/images/icon/mygame.png',
    name: '',
    children: [
      {
        active: false,
        text: '创建游戏',
        icon: '../../resource/images/icon/children.png',
        name: 'myGameCreate'
      },
      {
        active: false,
        text: '我的游戏',
        icon: '../../resource/images/icon/children.png',
        name: 'myGame'
      }
    ]
  },
  {
    selected: false,
    active: false,
    text: '我的渠道',
    icon: '../../resource/images/icon/channel.png',
    name: '',
    children: [
      {
        active: false,
        text: '渠道管理',
        icon: '../../resource/images/icon/children.png',
        name: 'thirdParty'
      }
    ]
  },
  {
    selected: false,
    active: false,
    text: '我的推广',
    icon: '../../resource/images/icon/tuiguang.png',
    name: '',
    children: [
      {
        active: false,
        text: '游戏推广',
        icon: '../../resource/images/icon/children.png',
        name: 'gamePromotion'
      }
    ]
  },
  {
    selected: false,
    active: false,
    text: '运营数据',
    icon: '../../resource/images/icon/yunying.png',
    name: '',
    children: [
      {
        active: false,
        text: '收入分析',
        icon: '../../resource/images/icon/children.png',
        name: 'incomeAnalysis'
      },
      {
        active: false,
        text: '用户分析',
        icon: '../../resource/images/icon/children.png',
        name: 'userAnalysis'
      },
      {
        active: false,
        text: '行业数据',
        icon: '../../resource/images/icon/children.png',
        name: 'industryData'
      },
      {
        active: false,
        text: '投诉数据',
        icon: '../../resource/images/icon/children.png',
        name: 'complainData'
      },
      {
        active: false,
        text: '数据报表',
        icon: '../../resource/images/icon/children.png',
        name: 'dataChart'
      }
    ]
  },
  {
    selected: false,
    active: false,
    text: '结算报表',
    icon: '../../resource/images/icon/compute.png',
    name: '',
    children: [
      {
        active: false,
        text: '结算数据',
        icon: '../../resource/images/icon/children.png',
        name: 'settlement'
      }
    ]
  },
  {
    selected: false,
    active: false,
    text: '订单查询',
    icon: '../../resource/images/icon/order.png',
    name: '',
    children: [
      {
        active: false,
        text: '详单查询',
        icon: '../../resource/images/icon/children.png',
        name: 'customerOrder'
      }
    ]
  }
]

export default navList
