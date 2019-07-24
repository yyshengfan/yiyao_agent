const storeBuilder = function (option) {
  ;(this.namespaced = true),
  (this.state = {
    idName: option.idName,
    data: [],
    total: 0
  }),
  (this.getters = {
    data: state => filter => {
      if (filter && !filter.$attrs) {
        return state.data.filter(rec => {
          var disMatch = 0
          for (var key in filter) {
            if (filter[key] && rec[key]) {
              if (typeof rec[key] === 'string') {
                disMatch += rec[key].indexOf(filter[key]) != -1 ? 0 : 1
              } else {
                disMatch += rec[key] == filter[key] ? 0 : 1
              }
            }
          }
          return disMatch == 0
        })
      }
      return state.data
    },
    total: state => {
      return state.total
    }
  }),
  (this.mutations = {
    total (state, n) {
      state.total = n
    },
    init (state, data) {
      state.data = data
    },
    add (state, row) {
      state.data.unshift(row)
      state.total++
    },
    delete (state, id) {
      for (var i = 0; i < state.data.length; i++) {
        if (id == state.data[i][state.idName]) {
          state.data.splice(i, 1)
          state.total--
          return
        }
      }
    },
    update (state, row) {
      for (var i = 0; i < state.data.length; i++) {
        if (row[state.idName] == state.data[i][state.idName]) {
          state.data.splice(i, 1, row)
          return
        }
      }
    }
  }),
  (this.actions = {
    total (context, n) {
      context.commit('total', n)
    },
    init (context, data) {
      context.commit('init', data)
    },
    add (context, row) {
      context.commit('add', row)
    },
    delete (context, id) {
      context.commit('delete', id)
    },
    update (context, row) {
      context.commit('update', row)
    }
  })
}

export default storeBuilder
