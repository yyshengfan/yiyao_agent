import { exportJsonToExcel, formatJson } from 'pl-export-excel'
import moment from 'moment'
import { method } from '../common/method'

const exportxlsx = function (obj) {
  // 数据格式处理
  obj.list.forEach(element => {
    obj.filterVal.forEach(item => {
      if (item.includes('.')) {
        const attri = item.replace(/,/g, '')
        const arr = item.split('.')
        element[attri] = (element[arr[0]] && element[arr[0]][arr[1]]) || ''
      }
      if (
        typeof element[item] === 'string' &&
        element[item].split('-').length === 3
      ) {
        element[item] = method.timestampformat(element[item])
      }
    })
  })
  // 导出的数据

  const data = formatJson(obj.filterVal, obj.list)

  // 导出表格

  exportJsonToExcel({
    header: obj.tHeader, // 表头

    data: data, // 表格数据

    filename: obj.tableName + moment().format('YYYYMMDDhhmm'), // 表格名称

    autoWidth: true, // 自适应宽度

    bookType: 'xlsx' // 导出文件的类型
  })
}

const exportcsv = function (data, name) {
  var uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(data)
  var downloadLink = document.createElement('a')
  downloadLink.href = uri
  downloadLink.download = (name || 'temp') + moment().format('YYYYMMDD') + '.csv'
  document.body.appendChild(downloadLink)
  downloadLink.click()
  document.body.removeChild(downloadLink)
}

export default {
  exportxlsx,
  exportcsv
}
