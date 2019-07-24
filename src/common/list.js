var list = function (option) {
  this.computed = {
    data: function () {
      return option.store.data(this.filterLocal)
    },
    total: option.store.total,
    to () {
      return this.pagination.size * this.pagination.page
    },
    from () {
      return this.pagination.size * (this.pagination.page - 1)
    }
  }
  this.methods = {
    resetFilter () {
      for (var key in this.filter) {
        this.filter[key] = ''
      }
    },
    changePage (val) {
      this.pagination.page = val
      this.pagination.start = (val - 1) * this.pagination.size
      this.list()
    },
    list (callback) {
      this.filter.stime = (this.filter.time && this.filter.time[0]) || ''
      this.filter.etime = (this.filter.time && this.filter.time[1]) || ''

      var params = {}
      for (let key in this.pagination) {
        params[key] = this.pagination[key]
      }
      for (let key in this.filter) {
        if (
          !this.excludeFilters ||
          (this.excludeFilters && this.excludeFilters.indexOf(key) === -1)
        ) {
          params[key] = this.filter[key]
        }
      }
      this.loading = true

      option.store.load(
        params,
        () => {
          this.loading = false
          if (typeof callback === 'function') callback()
        },
        () => {
          this.loading = false
          if (typeof callback === 'function') callback()
        }
      )
    },
    add () {
      this.$router.push({ name: this.routeName, params: { id: 'new' } })
    },
    view (index, row) {
      this.$router.push({
        name: this.routeName,
        params: { id: row[option.store.idName] }
      })
    },
    remove (index, row) {
      this.$swal({
        title: '提示',
        text: '此操作将删除该记录, 是否继续?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(result => {
        if (result.value) {
          var params = {}
          params[option.store.idName] = row[option.store.idName]
          this.loading = true
          option.store.delete(
            params,
            data => {
              this.loading = false
              // this.back();
            },
            () => {
              this.loading = false
            }
          )
        }
      })
    }
  }
}
export default list
