<template>
  <div class="md-layout">

    <!-- 分割线 -->
    <div class="md-layout-item md-size-100 line1">
    </div>

    <!-- 4.交易量/盈亏$ -->
    <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100 md-size-33">
      <stats-card header-color="green">
        <template slot="header">
          <div class="card-icon">
            <md-icon>attach_money</md-icon>
          </div>
          <p class="category">今日入金总额</p>
          <h3 class="title">
            $<span>{{$method.numberFixAddThree(datas.today_deposit_amount)}}</span>
          </h3>
        </template>
      </stats-card>
    </div>


    <!-- 4.交易量/盈亏$ -->
    <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100 md-size-33">
      <stats-card header-color="danger">
        <template slot="header">
          <div class="card-icon">
            <md-icon>money_off</md-icon>
          </div>
          <p class="category">今日出金总额</p>
          <h3 class="title">
            $<span>{{$method.numberFixAddThree(datas.today_withdrawal_amount)}}</span>
          </h3>
        </template>
      </stats-card>
    </div>

    <!-- 2.入/出金量$ -->
    <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100 md-size-33">
      <stats-card header-color="warning">
        <template slot="header">
          <div class="card-icon">
            <md-icon>person</md-icon>
          </div>
          <p class="category">今日新增用户数</p>
          <h3 class="title">
            <span>{{datas.today_user_register_count}}</span>
          </h3>
        </template>
      </stats-card>
    </div>

    <!-- 4.交易量/盈亏$ -->
    <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100 md-size-33">
      <stats-card header-color="green">
        <template slot="header">
          <div class="card-icon">
            <md-icon>trending_up</md-icon>
          </div>
          <p class="category">入金总额</p>
          <h3 class="title">
            $<span>{{$method.numberFixAddThree(datas.all_deposit_amount)}}</span>
          </h3>
        </template>
      </stats-card>
    </div>


    <!-- 4.交易量/盈亏$ -->
    <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100 md-size-33">
      <stats-card header-color="danger">
        <template slot="header">
          <div class="card-icon">
            <md-icon>trending_down</md-icon>
          </div>
          <p class="category">出金总额</p>
          <h3 class="title">
            $<span>{{$method.numberFixAddThree(datas.all_withdrawal_amount)}}</span>
          </h3>
        </template>
      </stats-card>
    </div>

    <!-- 2.入/出金量$ -->
    <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100 md-size-33">
      <stats-card header-color="warning">
        <template slot="header">
          <div class="card-icon">
            <md-icon>group</md-icon>
          </div>
          <p class="category">新增用户数</p>
          <h3 class="title">
            <span>{{datas.all_user_register_count}}</span>
          </h3>
        </template>
      </stats-card>
    </div>

    <!-- 分割线 -->
    <div class="md-layout-item md-size-100 line">
    </div>

    <!-- 8.交易盈亏分析（$） -->
    <div class="md-layout-item md-medium-size-66 md-xsmall-size-100 md-size-60">
      <chart-card
        v-if="chartShow"
        :chart-data="moneyData.data"
        :chart-options="moneyData.options"
        chart-type="Line"
        chart-inside-header
        background-color="green"
      >
        <md-button class="md-simple md-info md-just-icon" slot="first-button">
          <md-icon>refresh</md-icon>
          <md-tooltip md-direction="bottom">Refresh</md-tooltip>
        </md-button>
        <md-button class="md-simple md-just-icon" slot="second-button">
          <md-icon>edit</md-icon>
          <md-tooltip md-direction="bottom">Change Date</md-tooltip>
        </md-button>

        <template slot="content">
          <h4 class="title">入金金额分析（$）</h4>
          <p class="category">
            <span :class="moneyIncrease<0? 'text-danger':'text-success'">
              <i class="fas" :class="moneyIncrease<0? 'fa-long-arrow-alt-down':'fa-long-arrow-alt-up'"></i>
              <animated-number :value="moneyIncrease"></animated-number>%
            </span>
            increase in today datas.
          </p>
        </template>

        <!-- <template slot="footer">
          <div class="stats">
            <md-icon>access_time</md-icon>
            updated <animated-number :value="4"></animated-number> minutes ago
          </div>
        </template> -->
      </chart-card>
    </div>

    <!-- 8.交易盈亏分析（$） -->
    <div class="md-layout-item md-medium-size-66 md-xsmall-size-100 md-size-40">
      <chart-card
        v-if="chartShow"
        :chart-data="accountData.data"
        :chart-options="accountData.options"
        chart-type="Line"
        chart-inside-header
        background-color="blue"
      >
        <md-button class="md-simple md-info md-just-icon" slot="first-button">
          <md-icon>refresh</md-icon>
          <md-tooltip md-direction="bottom">Refresh</md-tooltip>
        </md-button>
        <md-button class="md-simple md-just-icon" slot="second-button">
          <md-icon>edit</md-icon>
          <md-tooltip md-direction="bottom">Change Date</md-tooltip>
        </md-button>

        <template slot="content">
          <h4 class="title">新增用户分析（$）</h4>
          <p class="category">
            <span :class="accountIncrease<0? 'text-danger':'text-success'">
              <i class="fas" :class="accountIncrease<0? 'fa-long-arrow-alt-down':'fa-long-arrow-alt-up'"></i>
              <animated-number :value="accountIncrease"></animated-number>%
            </span>
            increase in today datas.
          </p>
        </template>

        <!-- <template slot="footer">
          <div class="stats">
            <md-icon>access_time</md-icon>
            updated <animated-number :value="4"></animated-number> minutes ago
          </div>
        </template> -->
      </chart-card>
    </div>

    <!-- 9.胜率分析 -->
    <!-- <div class="md-layout-item md-size-20 md-small-size-33 md-medium-size-33 md-xsmall-size-100">
      <chart-card
        header-animation="false"
        :chart-data="pieChart.data"
        :chart-options="pieChart.options"
        chart-type="Pie"
        header-icon
        chart-inside-content
        background-color="rose"
      >
        <template slot="chartInsideHeader">
          <div class="card-icon">
            <md-icon>pie_chart</md-icon>
          </div>
          <h4 class="title">
            胜率分析
          </h4>
        </template>
        <template slot="footer">
          <div class="md-layout">
            <div class="md-layout-item md-size-100">
              <h6 class="category">Legend</h6>
            </div>
            <div class="md-layout-item">
              <i class="fa fa-circle text-info"></i> 获利笔数
              <i class="fa fa-circle text-rose"></i> 亏损笔数
            </div>
          </div>
        </template>
      </chart-card>
    </div> -->

    <!-- 分割线 -->
    <div class="md-layout-item md-size-100 line2"></div>

  </div>
</template>

<script>
import AsyncWorldMap from "@/materials/WorldMap/AsyncWorldMap.vue";
import {
  StatsCard,
  ChartCard,
  ProductCard,
  AnimatedNumber,
  GlobalSalesCard,
  GlobalSalesTable
} from "@/materials";

export default {
  components: {
    StatsCard,
    ChartCard,
    AnimatedNumber,
    ProductCard,
    GlobalSalesCard,
    GlobalSalesTable,
    AsyncWorldMap
  },
  data() {
    return {
      chartShow: false,
      // 胜率分析
      pieChart: {
        data: {
          labels: ["51%", "49%"],
          series: [51, 49]
        },
        options: {
          height: "180px",
        }
      },
      tableData: [
        {
          id: 1,
          name: "标题1",
          date: "时间1",
          icon1: "search"
        },
        {
          id: 2,
          name: "标题2",
          date: "时间2",
          icon1: "search"
        },
        {
          id: 3,
          name: "标题3",
          date: "时间3",
          icon1: "search"
        }
      ],
      product1: "./static/img/推广二维码.png",

      // 交易盈亏分析
      moneyData: {
        data: {
          labels: [],
          series: [[]]
        },
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0
          }),
          axisY: {
            offset: 60,
            labelInterpolationFnc: function(value) {
              return value + ' K'
            },
            scaleMinSpace: 15
          },
          low: 0,
          high: 300, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      accountData: {
        data: {
          labels: [],
          series: [[]]
        },
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0
          }),
          axisY: {
            offset: 60,
            scaleMinSpace: 15
          },
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },

      // 我的数据
      datas:{},
      moneyIncrease:0,
      accountIncrease:0,
    };
  },
  mounted:function(){
    // this.getData();
  },
  methods: {
    async getData(){
      const res = await this.$axios.get('admin_dashboard')
      // 交易数据
      this.datas = res.data;

      // 报表数据
      const _this = this
      const money = res.data.day_deposit_fund
      const account = res.data.day_register_data

      if(money.length>1){
        this.moneyIncrease = this.$method.numberFix(money[money.length-1].amount - money[money.length-2].amount )/ money[money.length-2].amount * 100
      }
      if(account.length>1){
        this.accountIncrease = this.$method.numberFix(account[account.length-1].count - account[account.length-2].count )/ account[account.length-2].count * 100
      }

      
      // money
      money.forEach(function(item){
        _this.moneyData.data.labels.push(_this.subDateStr(item.date));
        _this.moneyData.data.series[0].push(item.amount/1000);
      })
                       
      // account
      account.forEach(function(item){
        _this.accountData.data.labels.push(_this.subDateStr(item.date));
        _this.accountData.data.series[0].push(item.count);
      })

      // 取后十条数据
      _this.moneyData.data.labels = _this.moneyData.data.labels.slice(_this.moneyData.data.labels.length-10,_this.moneyData.data.labels.length)
      _this.moneyData.data.series[0] = _this.moneyData.data.series[0].slice(_this.moneyData.data.series[0].length-10,_this.moneyData.data.series[0].length)

      _this.accountData.data.labels = _this.accountData.data.labels.slice(_this.accountData.data.labels.length-10,_this.accountData.data.labels.length)
      _this.accountData.data.series[0] = _this.accountData.data.series[0].slice(_this.accountData.data.series[0].length-10,_this.accountData.data.series[0].length)

      // 纵坐标最大值赋值
      
      _this.moneyData.options.high = parseInt(Math.max(..._this.moneyData.data.series[0])) + Math.max(..._this.moneyData.data.series[0])/10;
      _this.accountData.options.high = parseInt(Math.max(..._this.accountData.data.series[0])) + Math.max(..._this.accountData.data.series[0])/10;

      _this.chartShow = true
    },
    subDateStr(str){
      const list = str.split('-');
      const dateStr = list[1] + '-' + list[2]
      return dateStr
    },
    getClass: function(item, id) {
      let classes = "";
      switch (item) {
        case "person": {
          classes = "md-info";
          break;
        }
        case "edit": {
          classes = "md-success";
          break;
        }
        case "close": {
          classes = "md-danger";
          break;
        }
      }
      switch (id) {
        case 1:
        case 5: {
          break;
        }
        case 2:
        case 4: {
          classes = `${classes} md-round`;
          break;
        }
        case 3: {
          classes = `${classes} md-simple`;
          break;
        }
      }
      return classes;
    },
    getAlignClasses: ({ id }) => ({
      "text-right": id
    }),
    increaseQuantity(item) {
      item.qty++;
      this.computeAmount(item);
    },
    decreaseQuantity(item) {
      if (item.qty > 1) {
        item.qty--;
        this.computeAmount(item);
      }
    },
    computeAmount(item) {
      item.amount = item.qty * item.price;
    }
  }
};
</script>

<style lang="scss">
.line {
  margin: 2rem 0;
}
.line1 {
  margin-bottom: 2rem;
}
.textcenter {
  margin: 0 auto
}
</style>

