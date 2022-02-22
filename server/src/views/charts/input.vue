<template>
  <section>
    <!--工具条-->
    <el-card style="background-color: #d4f0ff">
      <el-row>
        <el-col :span="24" style="padding-bottom: 0px;height: 60px">
          <el-form :inline="true" :model="filters">
            <el-form-item>
              <el-select v-model="filters.type" clearable placeholder="类型" @change="getInput">
                <el-option
                    v-for="item in type_options"
                    :key="item"
                    :label="item"
                    :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="filters.name" clearable placeholder="经手人" @change="getInput">
                <el-option
                    v-for="item in name_options"
                    :key="item"
                    :label="item"
                    :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-date-picker
                  v-model="filters.createTime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="(不含)结束日期"
                  value-format="timestamp"
                  @change="getInput">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-form-item>
                <el-button type="success" @click="addFormVisible=true"  style="width:600px;margin-bottom:15px;" >新增</el-button>
              </el-form-item>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
    <!--列表-->
    <template>
      <el-table ref="input" :data="filter_input.slice((currentPage-1)*pageSize,currentPage*pageSize)" highlight-current-row v-loading="loading" style="width: 100%;"  :row-class-name="tableRowClassName"
                @selection-change="sectionChange" :row-key="getRowKey">
        <el-table-column type="selection" :reserve-selection="true" width="55">
        </el-table-column>
        <el-table-column type="index" width="60">
        </el-table-column>
        <el-table-column prop="mode" label="收入类型" width="200"  sortable>
        </el-table-column>
        <el-table-column prop="remark" label="订单信息/备注" width="200" sortable>
        </el-table-column>
        <el-table-column prop="handler" label="经手人" width="200" sortable>
        </el-table-column>

        <el-table-column prop="money" label="金额" width="200" sortable>
        </el-table-column>

        <el-table-column prop="create_time" label="创建时间"  min-width="200" sortable>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template scope="scope">
            <el-button type="danger" size="small" @click="handleDel(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-col :span="9" class="toolbar">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="filter_input.length">
      </el-pagination>

    </el-col>
    <el-col :span="15" class="toolbar" style="height: 52px">
      <el-tag type="success" effect="dark">总金额</el-tag>
      <span style="font-size: 20px">{{this.total}}</span>
    </el-col>
    <el-dialog title="新增" :visible="addFormVisible" @close="addFormVisible=false" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="200px" :rules="rules" ref="addForm">
        <el-form-item label="类型" prop="mode">
          <el-select v-model="addForm.mode" clearable placeholder="类型">
            <el-option
                v-for="item in type_options"
                :key="item"
                :label="item"
                :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="经手人" prop="handler">
          <el-select v-model="addForm.handler" clearable placeholder="经手人">
            <el-option
                v-for="item in name_options"
                :key="item"
                :label="item"
                :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单信息/备注" prop="remark">
          <el-input v-model="addForm.remark"></el-input>
        </el-form-item>
        <el-form-item label="出售价格" prop="money">
          <el-input-number v-model="addForm.money" :min="0" :step="100"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" >提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import {inputList,addInput,removeInput} from '../../api/api';
export default {
  data() {
    return {
      total:0,
      type_options:[
          "窗帘收入",
          "被套收入",
          "其他款项",
      ],
      name_options:[
        "李名堂",
        "李火珍",
        "郭金红",
        "谈运松"
      ],
      addForm:{
        mode:'',
        handler:'',
        remark:'',
        money:100,
      },
      rules: {
        mode: [
          { required: true, message: '请选择类型', trigger: 'blur' },
        ],
        handler: [
          { required: true, message: '请选择经办人', trigger: 'change' }
        ],
        remark:[
          { required: true, message: '请输入详细信息', trigger: 'change' }
        ]
      },
      //分页
      currentPage: 1,
      pageSize: 10,
      filters: {
        name: '',
        type:'',
        createTime:[]
      },
      loading: false,
      input:[],
      filter_input:[],
      addFormVisible:false
    }
  },
  methods: {
    getRowKey(row){
      return row.id;
    },
    sectionChange(sec){
      this.total=0;
      let k=sec.length;
      for(let i=0;i<k;i++){
        this.total+=Number(sec[i].money);
      }
    },
    addSubmit(){
      this.$refs["addForm"].validate((valid) => {
            if (valid) {
              addInput(this.addForm).then(()=>{
                this.$message({
                  type: 'success',
                  message: '添加成功'
                });
              })
              this.addForm={
                mode:'',
                handler:'',
                remark:'',
                money:100,
              }
              setTimeout(() => {this.toBegin();}, 500);
              this.addFormVisible=false;
            }else{
              return false;
            }
      })
    },
    getInput(){
      let name=this.filters.name;
      let type=this.filters.type
      let start=0,end=0;
      if(this.filters.createTime){
        start=this.filters.createTime[0];
        end=this.filters.createTime[1];
      }
      this.filter_input=this.input.filter(u=>{
        if(name && u.handler!=name) return false;
        if(type && u.mode!=type) return false;
        if(start!=0){
          let da = new Date(u.create_time).getTime()
          if(this.filters.createTime&&(da>end||da<start)) return false;
        }
        return true;
      })
    },
    handleDel(id){
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(()=>{
        this.$prompt('请输入密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          if(value=="1998913"){
            removeInput({id:id}).then(()=>{
              this.$message({
                type: 'success',
                message: '删除成功'
              });
            })
            setTimeout(() => {
              this.toBegin()
            }, 500);
          }else{
            this.$message({
              type: 'danger',
              message: '密码错误'
            });
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除'
          });
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
    tableRowClassName({row, rowIndex}) {
      if (rowIndex%2 == 0) return 'warning-row';
      return 'success-row';
    },

    toBegin(){
      inputList().then((res) => {
        this.loading=true;
        this.input = res.data;
        this.loading = false;
        this.getInput();
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