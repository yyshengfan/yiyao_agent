var form = function (option) {
  this.computed = {
    action () {
      if (this.setAction) {
        return this.setAction
      } else {
        return this.$route.params.id === 'new' ? 'add' : 'update'
      }
    },
    dirty () {
      return !_.isEqual(this.model, this.origModel) || this.dirtyFn
    }
  }

  this.methods = {
    reset () {
      for (var key in this.model) {
        this.model[key] = this.origModel[key]
      }
      if (typeof this.resetFn === 'function') {
        this.resetFn()
      }
    },
    initModel (data) {
      for (var key in this.model) {
        if (this.modelFormat && this.modelFormat[key]) {
          this.model[key] = this.modelFormat[key](data[key])
        } else {
          this.model[key] = data[key]
        }
      }
      this.origModel = _.clone(this.model)
    },
    updateOrigModel () {
      this.origModel = _.clone(this.model)
    },
    get (data, callback) {
      if (this.action == 'add') {
        if (typeof callback === 'function') {
          callback('noAdd')
        }
        return
      }

      var params = {}
      if (data) {
        params = data
      } else {
        params[option.store.idName] = this.$route.params.id
      }

      this.loading = true
      option.store.get(
        params,
        data => {
          this.loading = false
          data = data.list ? data.list[0] : data
          this.initModel(data)
          if (typeof callback === 'function') {
            callback(null, data)
          }
        },
        () => {
          this.loading = false
          if (typeof callback === 'function') {
            callback('loading err')
          }
        }
      )
    },
    save (datas) {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.loading = true
          var params = datas || _.clone(this.model)
          if (this.modelSaveExtra) {
            for (var key in this.modelSaveExtra) {
              var val = this.modelSaveExtra[key].call(this)
              if (val) {
                params[key] = val
              } else {
                delete params[key]
              }
            }
          }
          option.store[this.action](
            params,
            data => {
              this.loading = false
              if (this.action === 'add') {
                this.model[option.store.idName] = data[option.store.idName]
                if (data.createAt) {
                  this.model.createAt = data.createAt
                }
                if (data.createBy) {
                  this.model.createBy = data.createBy
                }
                this.$router.replace({
                  name: this.routeName,
                  params: { id: data[option.store.idName] }
                })
              }
              this.updateOrigModel(this.model)
              if (typeof this.saveFn === 'function') {
                this.saveFn()
              } else {
                // this.back()
              }
            },
            data => {
              this.loading = false
            }
          )
        }
      })
    },
    remove () {
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
          params[option.store.idName] = this.model[option.store.idName]
          this.loading = true
          option.store.delete(
            params,
            data => {
              this.loading = false
              this.back()
            },
            () => {
              this.loading = false
            }
          )
        }
      })
    },
    back () {
      this.$router.go(-1)
    },
    async getEnCode () {
      const res = await this.$http.get('/enCode', this.model)
      document.getElementById('enCode').innerHTML = res.result.img
    },
    getCode () {
      if (this.msg !== '获取短信验证码') {
        return
      }
      this.msgCode = []
      this.$refs['form'].validate(valid => {
        if (valid) {
          var time = 59
          var _this = this
          this.msg = time
          var timeOut = setInterval(function () {
            _this.msg = --time
            if (!time) {
              _this.msg = '获取短信验证码'
              clearInterval(timeOut)
            }
          }, 1000)
          var params = {
            encode: this.model.encode,
            loginName: this.model.loginName,
            type: this.name === 'regist' ? 0 : 1
          }

          this.$http
            .post('/login/getcode', params)
            .then(response => {
              this.$confirm(response.data.respMsg, '提示', {
                type: 'success'
              })
            })
            .catch(response => {
              this.msg = '获取短信验证码'
              clearInterval(timeOut)
              this.$confirm(response.data.respMsg, '提示', {
                type: 'warning'
              })
            })
        }
      })
    }
  }
}

export default form
