<template>
  <div class="md-layout">
    <!-- 1.搜索待审核入金记录 -->
    <div class="md-layout-item md-size-100" v-loading="loading">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-warning">
          <div class="card-icon">
            <md-icon>add</md-icon>
          </div>
        </md-card-header>
        <md-card-content>
          <el-row>
            <el-col :span="8">
              <el-form
                :model="model"
                :rules="rules"
                ref="form"
                label-width="140px"
                class="demo-model"
              >
                <el-form-item label="入金账号:" prop="login">
                  <el-select
                    v-model="model.login"
                    name="enterstate"
                    id="enterstate"
                    style="width:100%"
                  >
                    <el-option
                      v-for="item in model.accounts"
                      :key="item.login"
                      :value="item.login"
                      :label="item.login"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="支付方式:" prop="type">
                  <el-select
                    v-model="model.type"
                    name="enterstate"
                    id="enterstate"
                    style="width:100%"
                    @change="typeChange"
                  >
                    <el-option
                      v-show="item.type===1"
                      v-for="item in inmoneyPay"
                      :key="item.payName"
                      :value="item.id"
                      :label="item.payName"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="金额(美元):" prop="beforenumber">
                  <el-input v-model="model.beforenumber" type="text" />
                </el-form-item>
                <el-form-item label="金额(人民币):" prop="price">
                  <el-input v-model="model.price" type="text" readonly />
                </el-form-item>
                <el-form-item label="手续费:" prop="fee">
                  <el-input v-model="model.fee" type="text" readonly />
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    class="md-success"
                    style="width:100%;margin-top:3%"
                    @click="add"
                  >提交申请</el-button>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="16">
              <div style="margin-left:5%">
                <div class="ql-editor" id="htmlContent"></div>
                <md-card class="paddingcard" v-if="$store.state.roleId != 1">
                  <div class="greencolor cardtitle">请用网银或银行APP完成转账</div>
                  <div class="content">
                    付款银行:&nbsp;
                    <span class="blackcolor">{{model.tobankName}}</span>
                  </div>
                  <div class="content">
                    付款银行账户名:&nbsp;
                    <span class="blackcolor">{{model.tobankUserName}}</span>
                  </div>
                  <div class="content">
                    付款银行账号:&nbsp;
                    <span class="blackcolor">{{model.bankaccount}}</span>
                  </div>
                  <div class="content">
                    转账金额:&nbsp;
                    <span class="greencolor">{{model.price}} CNY</span>
                  </div>
                </md-card>
              </div>
            </el-col>
          </el-row>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import NP from "number-precision";

import Form from "../../common/form";
import inmoney from '../../common/store/inmoney';
import inmoneyPay from '../../common/store/inmoneyPay';

const form = new Form({ store: inmoney });

form.data = function() {
  return {
    model: {
      login: "",
      accounts: [],
      beforenumber: "",
      type: "",
      exchange: "",
      price: "",
      feePercent: "",
      fee: "",
      bankaccount: "",
      tobankName: "",
      tobankUserName: ""
    },
    // inmoneyPay: [],
    showNotice: false,
    errMsg: "",
    htmlContent: "",
    loading: false,
    rules: {
      login: [{ required: true, message: "请选择账号", trigger: "change" }],
      type: [{ required: true, message: "请选择支付方式", trigger: "change" }],
      beforenumber: [
        { required: true, message: "请输入金金额", trigger: "blur" },
        { min: 3, max: 5, message: "入金金额需小于100000美元", trigger: "blur" }
      ],
      price: [{ required: true, message: "", trigger: "blur" }],
      fee: [{ required: true, message: "", trigger: "blur" }]
    }
  };
};

form.computed = {
  inmoneyPay: inmoneyPay.data,
}
form.mounted = async function() {
  this.$route.params.id = 'new'
  this.notice();
  this.getBankInfo();
};

form.watch = {
  "model.beforenumber": {
    handler(newNumber, oldNumber) {
      // 最大输6位，必须是数字
      if (newNumber === "") {
        this.model.price = 0;
        this.model.fee = 0;
        return;
      }
      const dealNumber = this.$method.abandonThousandth(newNumber);
      const isChange =
        (dealNumber.split(".")[1] && dealNumber.split(".")[1].length > 2) ||
        isNaN(dealNumber);
      this.model.beforenumber = isChange ? oldNumber : newNumber;
      const priceNum = NP.times(dealNumber, this.model.exchange);
      this.model.price = this.$method.numberFixAddThree(priceNum, 4);
      this.model.fee = this.$method.numberFixAddThree(
        NP.times(dealNumber, this.model.feePercent),
        4
      );
    },
    immediate: true
  }
};

form.methods.notice = async function() {
  // 获取mt账户
  const mt4Accounts = await this.$axios.get("inmoney/getMt4AccountByUserId");
  this.model.accounts =
    mt4Accounts.result && mt4Accounts.result.list;

  this.model.exchange =
    mt4Accounts.result && mt4Accounts.result.exchange;
  this.model.feePercent =
    mt4Accounts.result && mt4Accounts.result.feePercent;
  this.typeChange(1, 1);
};

// 发送入金申请请求
form.methods.add = async function() {
  const data = { ...this.model };
  // 价格处理
  data.fee = this.$method.abandonThousandth(data.fee, 4);
  data.beforenumber = this.$method.abandonThousandth(data.beforenumber, 4);
  data.price = this.$method.abandonThousandth(data.price, 4);
  this.save(data,'add');
};

// 改变支付类型
form.methods.typeChange = async function(id, type) {
  console.log(inmoneyPay)
  const inmoneyPay =
    type === 1
      ? this.inmoneyPay[0]
      : this.inmoneyPay.find(item => {
          return item.id === id;
        });
  this.model.type = inmoneyPay.id;
  this.htmlContent = inmoneyPay.agreement;
  document.getElementById("htmlContent").innerHTML = inmoneyPay.agreement;
};

// 获取收款银行信息
form.methods.getBankInfo = async function() {
  // 获取支付类型
  const res = await this.$axios.get("adminBank");
  const bankInfo = res.result && res.result.item;
  this.model.bankaccount = bankInfo.bankAccount;
  this.model.tobankName = bankInfo.bankName;
  this.model.tobankUserName = bankInfo.userName;
};

export default form;
</script>

<style scoped>
/* 弹框样式 */
.modal-mask {
  position: absolute;
  height: 100vh;
}
.paddingcard {
  padding: 20px;
  margin-top: -20px;
  margin-bottom: 20%;
  width: 90%;
}
.content {
  color: rgb(59, 54, 54);
  font-weight: bold;
  font-size: 14px;
  line-height: 35px;
}
.cardtitle {
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 1px;
  margin-bottom: 10px;
}
.greencolor {
  color: #01b9a0;
}
</style>
