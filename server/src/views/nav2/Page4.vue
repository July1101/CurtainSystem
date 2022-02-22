<template>
  <section>
    <!--工具条-->
    <el-card style="background-color: #d4f0ff">
      <el-row>
        <el-col :span="24" style="padding-bottom: 0px;height: 60px">
          <el-form :inline="true" :model="filters">
            <el-form-item>
              <el-input v-model="filters.id" placeholder="订单编号" @input="getOrder"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="filters.name" placeholder="客户姓名" @input="getOrder"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="filters.telephone" placeholder="客户电话" @input="getOrder"></el-input>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-date-picker
                  v-model="filters.createTime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="(不含)结束日期"
                  value-format="timestamp"
                  @change="getOrder">
              </el-date-picker>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
    <!--列表-->
    <template>
      <el-table ref="filter_order" :data="filter_order.slice((currentPage-1)*pageSize,currentPage*pageSize)" highlight-current-row v-loading="loading" style="width: 100%;"  :row-class-name="tableRowClassName"
                @row-click="handleExpandChange" >
        <el-table-column type="expand">
          <template  slot-scope="props">
            <el-row>
              <el-col span="4">
                <el-card style="width: 100%;height: 200px;background-color: #d1ffb3">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="客户姓名">
                      <span>{{ props.row.user_info.name }}</span>
                    </el-form-item>
                    <el-form-item label="客户电话">
                      <span>{{ props.row.user_info.telephone }}</span>
                    </el-form-item>
                    <el-form-item label="区域">
                      <span>{{ props.row.user_info.address }}</span>
                    </el-form-item>
                    <el-form-item label="详细地址">
                      <span>{{ props.row.user_info.detail_address }}</span>
                    </el-form-item>
                  </el-form>
                </el-card>
              </el-col>
              <el-col span="4">
                <el-card style="width: 100%;height: 200px; background-color: #fae3ff ">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="原价">
                      <span>{{ props.row.discount+ props.row.final_amount }}</span>
                    </el-form-item>
                    <el-form-item label="优惠">
                      <span>{{ props.row.discount }}</span>
                    </el-form-item>
                    <el-form-item label="最后总价">
                      <span>{{ props.row.final_amount }}</span>
                    </el-form-item>
                    <el-form-item label="已付金额">
                      <span>{{ props.row.already_pad }}</span>
                    </el-form-item>
                  </el-form>
                </el-card>
              </el-col>
              <el-col span="4">
                <el-card style="width: 100%;height: 200px;background-color: #ffe7cb">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="是否完工">
                      <span>{{trans_is_finished(props.row)}}</span>
                    </el-form-item>
                    <el-form-item label="是否要安装">
                      <span>{{ trans_need_install(props.row) }}</span>
                    </el-form-item>
                    <el-form-item label="安装日期">
                      <span>{{ trans_install_time(props.row) }}</span>
                    </el-form-item>
                    <el-form-item label="订单状态">
                      <span>{{ trans_state(props.row) }}</span>
                    </el-form-item>
                  </el-form>
                </el-card>
              </el-col>
              <el-col span="8">
                <el-card style="width: 100%;height: 200px;background-color: #d8fdff">
                  <el-form label-position="left" label-width="100px" inline class="demo-table-expand">
                    <el-form-item label="窗帘个数">
                      <span>{{props.row.info.length}}</span>
                    </el-form-item>
                    <el-form-item label="分别为">
                      <span>{{ get_curtain_outline(props.row)}}</span>
                    </el-form-item>
                    <el-form-item label="其他商品数：">
                      <span>{{ props.row.other.length }}</span>
                    </el-form-item>
                    <el-form-item label="分别为">
                      <span>{{ get_other_outline(props.row) }}</span>
                    </el-form-item>
                  </el-form>
                </el-card>
              </el-col>
              <el-col span="4">
                <el-card style="width: 100%;height: 200px">
                  <el-form>
                    <el-form-item style="margin-bottom: 10px;">
                      <el-button type="primary" v-on:click="show_detail(props.row)" style="height: 50px; width: 200px; font-size: 20px">查看详情</el-button>
                    </el-form-item>
                    <el-form-item style="margin-bottom: 10px;">
                      <el-button type="danger" v-on:click="del(props.row)" style="height: 50px; width: 200px; font-size: 20px">删除订单</el-button>
                    </el-form-item>
                    <el-form-item style="margin-bottom: 10px;">
                      <el-button type="success" v-on:click="handlePrint(props.row)" style="height: 50px; width: 200px; font-size: 20px">一键打单</el-button>
                    </el-form-item>
                  </el-form>
                </el-card>
              </el-col>
            </el-row>
            
            <el-row>
              <el-col :span="20">
                <el-card style="background-color: #dbedf0">
                  <el-steps :active="props.row.state" align-center finish-status="success">
                    <el-step title="待确认" description="订单创建时间">
                      <template slot="description" >
                        <span>订单创建时间<br/>{{props.row.create_time}}</span>
                      </template>
                    </el-step>
                    <el-step title="待发货">
                      <template slot="description" >
                        <span v-if="props.row.state>0">订单确认时间<br/>{{props.row.confirm_time}}</span>
                      </template>
                    </el-step>
                    <el-step title="待做工">
                      <template slot="description">
                        <span v-if="props.row.state>1">订单发货完成时间<br/>{{props.row.fahuo_time}}</span>
                      </template>
                    </el-step>
                    <el-step title="待安装">
                      <template slot="description">
                        <span v-if="props.row.state>2">订单发货完成时间<br/>{{props.row.handle_time}}</span>
                      </template>

                    </el-step>
                    <el-step title="待结账">
                      <template slot="description">
                        <span v-if="props.row.state>3">订单发货完成时间<br/>{{props.row.install_time}}</span>
                      </template>
                    </el-step>
                  </el-steps>
                </el-card>
              </el-col>
              <el-col :span="4">
                <el-card style="width: 100%;height: 140px">
                  <el-form>
                    <el-form-item style="margin-bottom: 10px;">
                      <el-button type="primary" v-on:click="checkPassword(props.row)" style="height: 50px; width: 200px; font-size: 20px">下一个阶段</el-button>
                    </el-form-item>
                  </el-form>
                </el-card>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" width="60">
        </el-table-column>
        <el-table-column prop="id" label="订单编号" width="100" sortable>
        </el-table-column>

          <el-table-column prop="user_info.name" label="客户姓名" width="80"  sortable>
          </el-table-column>
          <el-table-column prop="user_info.telephone" label="客户电话" width="110" sortable>
          </el-table-column>
          <el-table-column prop="user_info.address" label="客户地址" width="110" sortable>
          </el-table-column>

          <el-table-column prop="final_amount" label="总金额" width="100" sortable>
          </el-table-column>
          <el-table-column prop="already_pad" label="已付金额" width="100" sortable>
          </el-table-column>
        <el-table-column prop="info.length" label="窗帘个数" width="100" sortable>
        </el-table-column>

          <el-table-column prop="create_time" label="创建时间" :formatter="getCreateTime" width="120" sortable>
          </el-table-column>

        <el-table-column prop="state" label="订单状态" min-width="100" :formatter="getState" sortable>
        </el-table-column>
      </el-table>
    </template>
    <el-col :span="24" class="toolbar">

      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="order.length">
      </el-pagination>
    </el-col>

  </section>
</template>
<script>
import {getOrderList, printOrder, removeOrder, billList, printBill, removeBill,updateState} from '../../api/api';
import {timestampToTime,timestampToDate} from "../../mock/getID";
export default {
  data() {
    return {
      //分页
      currentPage: 1,
      pageSize: 10,
      filters: {
        name: '',
        telephone:'',
        id:'',
        time_pick:[],
        createTime:[]
      },
      loading: false,
      order:[],
      filter_order:[],
    }
  },
  methods: {
    checkPassword(row) {
      this.$prompt('请输入密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        if(value=="1998913"){
          this.up(row)
        }else{
          this.$message({
            type: 'danger',
            message: '密码错误'
          });
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    up(row){
      if(row.state==4){
        this.$message({
          message: '请前往结账中心',
          type: 'danger'
        })
        return ;
      }
      row.state++;
      updateState({id:row.id,state:row.state}).then(()=>{
        this.$message({
          message: '更新成功',
          type: 'success'
        })
      })
    },
    getState(row){
      if(row.state==0) return "待确认";
      if(row.state==1) return "待发货";
      if(row.state==2) return "待加工";
      if(row.state==3) return "待安装";
      if(row.state==4) return "待结账";
      return "已结账";
    },
    getCreateTime(row){
      return timestampToDate(row.create_time);
    },
    handlePrint(row){
      this.$confirm('确认打印吗','提示',{type:'warning'}).then(()=>{
        let par={order:row};
        printBill(par).then(()=>{
          this.$message({
            message: '打印成功',
            type: 'success'
          })
        })
      })
    },
    del(row){
      this.$confirm('确认删除该订单吗?', '提示', {
        type: 'warning'
      }).then(()=>{
        removeBill({id:row.id}).then((res) => {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.toBegin();
        });
      })
    },
    // 每页多少条
    handleSizeChange(val) {
      this.pageSize = val;
    },
    // 当前页
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleDel(row){
      this.$confirm('确认删除该订单吗?', '提示', {
        type: 'warning'
      }).then(() => {
        let para = { id: row.id };
        removeOrder(para).then((res) => {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.toBegin();
        });
      }).catch(() => {
      });
    },
    handleExpandChange(row){
      this.$refs.filter_order.toggleRowExpansion(row, true);
    },
    show_detail(row){
      this.$router.push({name:'show_order',params:row})
    },
    tableRowClassName({row, rowIndex}) {
      if (rowIndex%2 == 0) return 'warning-row';
      return 'success-row';
    },
    get_curtain_outline(row){
      if(row.info.length==0) return "-";
      let str="";
      for(let i=0;i<row.info.length;i++){
        str+=row.info[i].room;
        str+=":";
        str+=row.info[i].size.toFixed(2).toString();
        str+="米";
        str+="  |  ";
      }
      if(str.length>35) return str.substr(0,35);
      return str;
    },
    get_other_outline(row){
      if(row.other.length==0) return "-";
      let str="";
      for(let i=0;i<row.other.length;i++){
        str+=row.other[i].type.toString();
        str+=" ";
        str+=row.other[i].name.toString();
        str+=" ";
        str+=row.other[i].price.toString();
        str+="x";
        str+=row.other[i].num.toString();
        str+="=";
        str+=row.other[i].total_money.toString();
        str+=" | ";
      }
      if(str.length>35) return str.substr(0,35);
      return str;
    },
    trans_need_install(row){
      if(row.need_install==true||row.need_install=='true') return "需要";
      return "无需";
    },
    trans_create_time(row){
      return timestampToTime(row.create_time);
    },
    trans_install_time(row){
      return timestampToDate(row.install_date);
    },
    trans_state(row){
      if(row.state=='true'||row.state==true) return "已完单";
      return "待完成";
    },
    trans_is_finished(row){
      if(row.is_finished=='true'||row.is_finished==true) return "已完工";
      return "未完工";
    },
    //获取用户列表
    getOrder: function () {
      //NProgress.start();
      this.loading=true;
      let name=this.filters.name;
      let order_id=this.filters.id;
      let telephone=this.filters.telephone;
      if(this.filters.createTime){
        var start=this.filters.createTime[0];
        var end=this.filters.createTime[1];
      }
      this.filter_order=this.order.filter(u=>{
        if(name && u.user_info.name.indexOf(name) == -1) return false;
        if(order_id && String(u.id).indexOf(order_id) == -1) return false;
        if(telephone && u.user_info.telephone.toString().indexOf(telephone) == -1) return false;
        let da = new Date(u.create_time).getTime()
        if(this.filters.createTime&&(da>end||da<start))return false;
        return true;
      })
      this.loading = false;
    },
    toBegin(){
      billList().then((res) => {
        this.loading=true;
        this.order = res.data;
        this.loading = false;
        this.getOrder();
        //NProgress.done();
      });
    }
  },
  mounted() {
    this.toBegin();
  }
};

</script>

<style >

.el-table .warning-row {
  height: 80px;
  background: oldlace;
}

.el-table .success-row {
  height: 80px;
  background: #f0f9eb;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}

</style>