import StoreCtor from '@/common/storeCtor'
import StoreBuilder from '@/common/storeBuilder'

var option = {
  name: 'inmoney',
  idName: 'id',
  module: new StoreCtor({ idName: 'id' }),
  autoLoad: false,
  params: {},
  server: {
    load: {
      method: 'get',
      url: '/inmoney'
    },
    get: {
      method: 'get',
      url: '/inmoney'
    },
    add: {
      method: 'post',
      url: '/inmoney'
    },
    update: {
      method: 'set',
      url: '/inmoney'
    },
    delete: {
      method: 'delete',
      url: '/inmoney'
    }
  },
  local: {
    total: 'inmoney/total',
    get: 'inmoney/data',
    set: 'inmoney/init',
    add: 'inmoney/add',
    update: 'inmoney/update',
    delete: 'inmoney/delete'
  }
}

export default new StoreBuilder(option)
