import store from '../store'
import axios from '../common/axios'
import storeManage from '@/common/storeManage'

function storeBuilder (option) {
  this.option = option || {}
  this.option.server.load.method = this.option.server.load.method || 'get'
  this.name = option.name
  this.idName = option.idName

  this.init = () => {
    store.registerModule(this.option.name, this.option.module)
    storeManage.push(this)
    //  && store.state.auth !=''
    if (option.autoLoad) {
      this.load()
    }
  }

  this.serverHandle = (action, params, successFn, failureFn) => {
    var config, data
    console.log(this.option, action, params)
    if (this.option.server[action].method === 'get') {
      data = {
        params: params
      }
    } else {
      data = params
    }

    if (action !== 'get') {
      config = {
        headers: {
          showAlert: 1
        }
      }
    }

    axios[this.option.server[action].method](
      this.option.server[action].url,
      data,
      config
    )
      .then(response => {
        console.log(1, response)
        if (typeof successFn === 'function') successFn(response.result)
      })
      .catch(response => {
        if (typeof failureFn === 'function') failureFn(response)
      })
  }

  this.load = (params, successFn, failureFn) => {
    console.log('loading.......')
    params = params || this.option.params || {}
    console.log(params)
    this.serverHandle(
      'load',
      params,
      data => {
        const list = data.list.rows ? data.list.rows : [data]
        store.dispatch(this.option.local.set, list)
        if (this.option.local.total) {
          store.dispatch(this.option.local.total, data.list.count || 0)
        }
        if (typeof successFn === 'function') successFn(data)
      },
      failureFn
    )
  }

  this.get = (params, successFn, failureFn) => {
    console.log('get')
    console.log(params)
    this.serverHandle('get', params, successFn, failureFn)
  }

  this.add = (params, successFn, failureFn) => {
    this.serverHandle(
      'add',
      params,
      data => {
        params[this.idName] = data[this.idName]
        store.dispatch(this.option.local.add, params)
        if (typeof successFn === 'function') successFn(data)
      },
      failureFn
    )
  }

  this.update = (params, successFn, failureFn) => {
    this.serverHandle(
      'update',
      params,
      data => {
        store.dispatch(this.option.local.update, params)
        if (typeof successFn === 'function') successFn(data)
      },
      failureFn
    )
  }

  this.delete = (params, successFn, failureFn) => {
    this.serverHandle(
      'delete',
      params,
      data => {
        store.dispatch(this.option.local.delete, params[this.idName])
        if (typeof successFn === 'function') successFn(data)
      },
      failureFn
    )
  }

  this.data = filter => {
    console.log('data', this.option.local.get)
    console.log(store.getters[this.option.local.get])
    return store.getters[this.option.local.get](filter)
  }
  this.total = () => {
    return store.getters[this.option.local.total]
  }
  this.init()
}

export default storeBuilder
