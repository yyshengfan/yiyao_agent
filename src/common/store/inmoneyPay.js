import StoreCtor from '@/common/storeCtor'
import StoreBuilder from '@/common/storeBuilder'

var option = {
  name: 'inmoneyPay',
  idName: 'id',
  module: new StoreCtor({ idName: 'id' }),
  autoLoad: true,
  params: {
    type: 1,
    status: 1
  },
  server: {
    load: {
      method: 'get',
      url: '/inmoneyPay'
    },
    get: {
      method: 'get',
      url: '/inmoneyPay'
    },
    add: {
      method: 'post',
      url: '/inmoneyPay'
    },
    update: {
      method: 'set',
      url: '/inmoneyPay'
    },
    delete: {
      method: 'delete',
      url: '/inmoneyPay'
    }
  },
  local: {
    total: 'inmoneyPay/total',
    get: 'inmoneyPay/data',
    set: 'inmoneyPay/init',
    add: 'inmoneyPay/add',
    update: 'inmoneyPay/update',
    delete: 'inmoneyPay/delete'
  }
}

export default new StoreBuilder(option)
