<template>
  <div class="md-layout">
    <!-- 2.代理管理表 -->
    <div class="md-layout-item">
      <md-card>
        <!-- 标题 -->
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>get_app</md-icon>
          </div>
          <!-- <h4 class="title">代理管理</h4> -->
        </md-card-header>

        <!-- 内容 -->
        <md-card-content>
          <div class="md-layout">
            <!-- 1.订单号 -->
            <div class="input md-size-15 search_margin">
              <el-input v-model="filter.payno" clearable placeholder="搜索订单号"  @change="list"></el-input>
            </div>
            <!-- 2.mt账号 -->
            <div class="input md-size-15 search_margin">
              <el-input v-model="filter.mtid" clearable placeholder="搜索MT账号" @change="list"></el-input>
            </div>
            <!-- 3.入金状态 -->
            <div class="input md-size-15 search_margin">
              <el-select v-model="filter.status" name="status" id="status" placeholder="请选择状态">
                <el-option
                  v-for="(val, key) in $config.INMONEYSTATUS"
                  :key="key"
                  :value="key"
                >{{val}}</el-option>
              </el-select>
            </div>
            <!-- 3.开始时间 -->
            <div class="input md-size-20">
              <el-date-picker
                @change="list"
                v-model="filter.time"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </div>
            
          </div>
          <el-table
            :data="data"
            style="width: 100%"
            border stripe
            v-loading="loading"
          >
            <!-- 主体行内容 -->
            <el-table-column resizable type="selection" width="40" align="center"></el-table-column>
            <el-table-column resizable prop="payno" label="订单号" show-overflow-tooltip></el-table-column>
            <el-table-column resizable prop="mtid" label="MT账号"></el-table-column>
            <el-table-column resizable prop="user_id.amount" label="金额">
               <template slot-scope="scope">{{`$:${scope.row.beforenumber}`}}</template>
            </el-table-column>
            <el-table-column resizable label="状态">
              <template slot-scope="scope">{{$config.INMONEYSTATUS[scope.row.status]}}</template>
            </el-table-column>
            <el-table-column resizable label="申请时间">
              <template slot-scope="scope">{{$method.timeformat(scope.row.create_time)}}</template>
            </el-table-column>
            <el-table-column resizable label="审核时间">
              <template slot-scope="scope">{{scope.row.status != '0'? $method.timeformat(scope.row.visit_time) : ''}}</template>
            </el-table-column>
            <el-table-column resizable prop="content" label="拒绝理由"></el-table-column>
          </el-table>
        </md-card-content>

        <!-- 底部控件 -->
        <md-card-actions md-alignment="space-between">
          <div>
            <p class="card-category">第 {{ from + 1 }} 到 {{ to }} / &nbsp;总:{{ total }} 项</p>
          </div>

          <el-pagination
            small
            @current-change="changePage"
            :current-page.sync="pagination.page"
            :page-size="pagination.size"
            layout="prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </md-card-actions>
      </md-card>
    </div>

  </div>
</template>

<script>

import List from '../../common/list'
import inmoney from '../../common/store/inmoney';

const list = new List({store: inmoney});

list.data = function(){
  return {
    loading:false,
    filter: {
      type: '',
      time:'',
    },
    pagination: {
      size: 10,
      page: 1,
    },
  }
}

list.mounted = function(){
  this.list();
}

export default list
</script>

<style>
.md-menu-content.md-select-menu {
  z-index: 9999 !important;
  width: 100% !important;
}
</style>

