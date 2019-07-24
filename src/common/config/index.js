const host = 'http://crm.macrofx.com'
const config = {
  // 环境配置

  // 田辉
  // development:'http://192.168.1.61:7001/',
  // 杨雄威1
  // development:'http://192.168.1.142:7001/',
  // 杨雄威2
  // development:'http://192.168.1.24:7000/',
  // 自己
  // development:'http://127.0.0.1:7001/',
  // 测试服
  // development: "http://218.242.245.218:7001/",
  // development: "http://crm.wsgfx.com:7001/",
  // development: "http://crmdemo.iclouddc.com:7001/",
  development: 'http://crm.macrofx.com:7001/',
  // development: "http://crm.rgm-fx.com:7001/",

  production: `${host}:7001/`,

  // 系统参数
  crmname: '~~',
  logo: '../../../img/blmarkets-logo.png',
  registerurl: `${host}/#/register`,
  completeregisterurl: `${host}/#/completeregister`,

  // 入金
  INMONEY: {
    mtid: '入金MT账号',
    name: '姓名',
    beforenumber: '入金金额（USD）',
    price: '入金金额（RMB）',
    number: '到账金额（USD）',
    fee: '手续费（USD）',
    exchange: '汇率',
    create_time: '申请时间',
    intime: '处理时间',
    status: '状态',
    type: '支付方式',
    certificate: '汇款凭证',
    sharerSeqNo: '商户订单',
    tobankCode: '汇款银行账号',
    tobankName: '汇款银行名称',
    tobankUserName: '汇款银行账号名',
    payno: '支付订单',
    paystatus: '支付状态',
    tobankName: '付款銀行',
    tobankUserName: '付款银行账户名',
    bankaccount: '付款银行账号',
    adminUsername: '审核人'
  },

  // 待审核出金
  OUTMONEY: {
    mtid: 'MT账号',
    // type: "转账方式",
    bankname: '银行名称',
    forwordname: '账户名称',
    bankaccount: '银行账号',
    // bankname: '证件信息',
    phone: '手机号',
    beforenumber: '出金金额（USD）',
    amount: '出金金额（RMB）',
    number: '到账金额（USD）',
    exchange: '汇率',
    create_time: '申请时间',
    visit_time: '处理时间',
    status: '状态',
    adminUsername: '审核人',
    content: '审核内容'
  },

  // 入金状态 状态 0:初始,1:驳回 8:到帐未入金9:审核通过
  INMONEYSTATUS: {
    '0': '待支付',
    '1': '已驳回',
    '8': '到账未入金',
    '9': '审核通过'
  },

  // 支付方式
  INMONYTYPE: {
    YeePay: '网银支付',
    remit: '汇款转帐'
  },

  // 入金支付状态
  INMONEYPAYSTATUS: {
    '0': '待支付',
    '1': '已支付',
    '-1': '已退款',
    '2': '支付处理中'
  },

  // 出金状态 状态 0:初始,1:驳回 8:到帐未出金9:审核通过
  OUTMONEYSTATUS: {
    '0': '待打款',
    '1': '已驳回',
    '8': '出金失败',
    '9': '已出金并打款'
  },

  // 支付方式
  OUTMONYTYPE: {
    '0': '网银支付',
    '1': '汇款转帐',
    '3': 'MT转帐'
  },

  // 出金支付状态
  OUTMONEYPAYSTATUS: {
    '0': '待支付',
    '1': '已支付',
    '-1': '已退款',
    '2': '支付处理中'
  },

  // 查看用户
  CUSTOMINFO: {
    nickname: '昵称',
    phone: '手机',
    email: '邮箱',
    nationality: '国籍',
    surname: '称谓',
    chineseName: '中文名',
    birthDate: '出生日期',

    livingState: '居住地',
    city: '城市',
    address: '居住地址',
    residenceTime: '居住年限',
    residentialTelephone: '住宅电话',

    identity: '证件号码',
    idCardFront: '身份证正面',
    idCardBack: '身份证反面',
    bankName: '开户银行支行名称',
    bankCardPic: '银行卡照片',
    addressProof: '地址证明照片'
  },

  // 服务器类型
  SERVERTYPE: {
    '0': '模拟仓',
    '1': '真实仓'
  },

  // 服务器版本
  SERVERVESION: {
    '4': 'MT4',
    '5': 'MT5'
  },

  STATUS: {
    '1': '是',
    '0': '否'
  },

  // 时区
  TIMEZONE: [
    { '-12': 'GMT -12:00' },
    { '-11': 'GMT -11:00' },
    { '-10': 'GMT -10:00' },
    { '-9': 'GMT -09:00' },
    { '-8': 'GMT -08:00' },
    { '-7': 'GMT -07:00' },
    { '-6': 'GMT -06:00' },
    { '-5': 'GMT -05:00' },
    { '-4': 'GMT -04:00' },
    { '-3': 'GMT -03:00' },
    { '-2': 'GMT -02:00' },
    { '-1': 'GMT -01:00' },
    { '0': 'GMT +00:00' },
    { '1': 'GMT +01:00' },
    { '2': 'GMT +02:00' },
    { '3': 'GMT +03:00' },
    { '4': 'GMT +04:00' },
    { '5': 'GMT +05:00' },
    { '6': 'GMT +06:00' },
    { '7': 'GMT +07:00' },
    { '8': 'GMT +08:00' },
    { '9': 'GMT +09:00' },
    { '10': 'GMT +10:00' },
    { '11': 'GMT +11:00' },
    { '12': 'GMT +12:00' }
  ],

  // 查询范围
  SEARCHRANGE: {
    1: '所有',
    2: '直接下级',
    3: '本人'
  },

  // 福州
  MEUNLIST: {
    userlist: [
      { label: '用户管理', route: 'userlist' },
      { label: '用户列表', route: 'userlist' }
    ],
    useradd: [
      { label: '用户管理', route: 'userlist' },
      { label: '新增用户', route: 'useradd' }
    ],
    userrelation: [
      { label: '用户管理', route: 'userlist' },
      { label: '用户关系', route: 'userrelation' }
    ],

    accountlist: [
      { label: '账号管理', route: 'accountlist' },
      { label: '账号列表', route: 'accountlist' }
    ],
    moneyForm: [
      { label: '账号管理', route: 'accountlist' },
      { label: '账号列表', route: 'accountlist' },
      { label: '账号入金', route: 'moneyForm' }
    ],
    accountForm: [
      { label: '账号管理', route: 'accountlist' },
      { label: '新增账号', route: 'accountForm' }
    ],
    currentorder: [
      { label: '账号管理', route: 'accountlist' },
      { label: '账号在持单', route: 'currentorder' }
    ],
    historyorder: [
      { label: '账号管理', route: 'accountlist' },
      { label: '账号历史单', route: 'historyorder' }
    ],

    signal: [
      { label: '跟单管理', route: 'signal' },
      { label: '信号列表', route: 'signal' }
    ],
    signalForm: [
      { label: '跟单管理', route: 'signal' },
      { label: '信号列表', route: 'signal' },
      { label: '修改信号', route: 'signalForm' }
    ],
    followlist: [
      { label: '跟单管理', route: 'signal' },
      { label: '跟单列表', route: 'followlist' }
    ],
    accountinfo: [
      { label: '跟单管理', route: 'signal' },
      { label: '跟单列表', route: 'followlist' },
      { label: '跟单详情', route: 'accountinfo' }
    ],
    followForm: [
      { label: '跟单管理', route: 'signal' },
      { label: '跟单列表', route: 'followlist' },
      { label: '修改跟单', route: 'followForm' }
    ],

    inmoneyview: [
      { label: '财务管理', route: 'inmoneyview' },
      { label: '财务预览', route: 'inmoneyview' }
    ],
    inmoney: [
      { label: '财务管理', route: 'inmoneyview' },
      { label: '入金列表', route: 'inmoney' }
    ],
    outmoney: [
      { label: '财务管理', route: 'inmoneyview' },
      { label: '入金列表', route: 'outmoney' }
    ],
    bank: [
      { label: '财务管理', route: 'inmoneyview' },
      { label: '银行卡管理', route: 'bank' }
    ],
    rateForm: [
      { label: '财务管理', route: 'inmoneyview' },
      { label: '汇率编辑', route: 'rateForm' }
    ],
    bankForm: [
      { label: '财务管理', route: 'inmoneyview' },
      { label: '银行卡管理', route: 'bank' },
      { label: '银行卡', route: 'bankForm' }
    ],

    // 'inmoneyAudit':[{label:'财务管理',route:'inmoneyview'},{label:'入金列表',route:'inmoneyAudit'},],
    // 'outmoneyAudit':[{label:'财务管理',route:'inmoneyview'},{label:'入金列表',route:'outmoneyAudit'},],

    inmoneyAudit: [
      { label: '审核管理', route: 'inmoneyAudit' },
      { label: '账号入金审核列表', route: 'inmoneyAudit' }
    ],
    outmoneyAudit: [
      { label: '审核管理', route: 'inmoneyAudit' },
      { label: '账号出金审核列表', route: 'outmoneyAudit' }
    ],
    accountAudit: [
      { label: '审核管理', route: 'inmoneyAudit' },
      { label: '账号开户审核列表', route: 'accountAudit' }
    ],
    inmoneyAuditForm: [
      { label: '审核管理', route: 'inmoneyAudit' },
      { label: '账号入金审核列表', route: 'inmoneyAudit' },
      { label: '账号入金审核', route: 'inmoneyAuditForm' }
    ],
    outmoneyAuditForm: [
      { label: '审核管理', route: 'outmoneyAudit' },
      { label: '账号出金审核列表', route: 'outmoneyAudit' },
      { label: '账号出金审核', route: 'outmoneyAuditForm' }
    ],
    accountAuditForm: [
      { label: '审核管理', route: 'accountAudit' },
      { label: '账号审核列表', route: 'accountAudit' },
      { label: '账号审核', route: 'accountAuditForm' }
    ],

    // agent: [
    //   { label: '代理管理', route: 'agent' },
    //   { label: '代理列表', route: 'agent' }
    // ],
    // agentForm: [
    //   { label: '代理管理', route: 'agent' },
    //   { label: '新增代理', route: 'agentForm' }
    // ],
    // subagent: [
    //   { label: '代理管理', route: 'agent' },
    //   { label: '下级代理列表', route: 'subagent' }
    // ],
    agentRelation: [
      { label: '用户管理', route: 'userlist' },
      { label: '返佣层级', route: 'agentRelation' }
    ],

    agentexpress: [
      { label: '报表管理', route: 'agentexpress' },
      { label: '代理分佣报表', route: 'agentexpress' }
    ],
    agentprofit: [
      { label: '报表管理', route: 'agentexpress' },
      { label: '代理分润报表', route: 'agentprofit' }
    ],

    log: [
      { label: '日志管理', route: 'log' },
      { label: '日志列表', route: 'log' }
    ],

    // 'loglist':[{label:'权限管理',route:'loglist'},{label:'用户列表',route:'loglist'},],
    rolelist: [
      { label: '权限管理', route: 'rolelist' },
      { label: '角色列表', route: 'rolelist' }
    ],

    group: [
      { label: '系统设置', route: 'group' },
      { label: 'MT4组', route: 'group' }
    ],
    setrule: [
      { label: '系统设置', route: 'group' },
      { label: 'MT4组', route: 'group' },
      { label: '品种设置', route: 'setrule' }
    ],
    security: [
      { label: '系统设置', route: 'group' },
      { label: '品种列表', route: 'security' }
    ],
    securityForm: [
      { label: '系统设置', route: 'group' },
      { label: '品种列表', route: 'security' },
      { label: '修改品种', route: 'securityForm' }
    ],
    symbol: [
      { label: '系统设置', route: 'group' },
      { label: '商品列表', route: 'symbol' }
    ],
    updatePwd: [
      { label: '系统设置', route: 'group' },
      { label: '修改密码', route: 'updatePwd' }
    ]
  },
  ROUTERINFO: {
    personalIndex: '个人首页',
    group: 'MT4组管理',
    setrule: '设置规则',
    security: '品种管理',
    securityForm: '品种操作',
    symbol: '商品管理',
    signal: '信号管理',
    signalForm: '信号操作',
    agent: '代理管理',
    accountlist: '账户列表',
    setsignal: '设定信号账户',
    bandsignal: '绑定跟随信号',
    bandsignal2: '选择绑定跟随信号',
    accountadd: '新增账户',
    accountbalance: '账户出入金',
    accountinfo: '账户查看',
    userlist: '用户列表',
    useradd: '新增用户',
    userinfo: '用户查看',
    moneyForm: '出入金',
    subagent: '下级代理列表'
  }
}

export { config }
