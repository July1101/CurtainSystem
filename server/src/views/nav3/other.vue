<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-select v-model="filters.type" clearable placeholder="请选择" @change="getOther">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getOther">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="other" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" :close-on-click-modal="false">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="type" label="类型" width="140"  sortable>
      </el-table-column>
      <el-table-column prop="name" label="名称" width="140"  sortable>
      </el-table-column>
      <el-table-column prop="cost" label="进价" width="100" sortable>
      </el-table-column>
      <el-table-column prop="price" label="售价" width="100" sortable>
      </el-table-column>
      <el-table-column prop="unit" label="单位" width="100" sortable>
      </el-table-column>
      <el-table-column prop="state" label="状态" width="100" sortable :formatter="transState">
      </el-table-column>
      <el-table-column prop="total_amount" label="已售金额" width="120" sortable>
      </el-table-column>
      <el-table-column prop="total_num" label="已售数量" width="120" sortable>
      </el-table-column>
      <el-table-column prop="total_order" label="订单数" min-width="100" sortable>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="getlen" >刷新</el-button>
    </el-col>

    <!--编辑界面-->
    <el-dialog title="编辑" :visible="editFormVisible" @close="editFormVisible=false" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="类型" prop="type">
          <el-select v-model="editForm.type" clearable placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="进货价格" prop="cost">
          <el-input-number v-model="editForm.cost" :min="0" :max="1000" :step="10"></el-input-number>
        </el-form-item>
        <el-form-item label="出售价格" prop="price">
          <el-input-number v-model="editForm.price" :min="0" :max="1000" :step="1"></el-input-number>
        </el-form-item>
        <el-form-item label="单位" prop="unit">
          <el-input v-model="editForm.unit"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-radio-group v-model="editForm.state">
            <el-radio-button label="true">可  用</el-radio-button>
            <el-radio-button label="false">不可用</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--新增界面-->
    <el-dialog title="新增" :visible="addFormVisible" @close="addFormVisible=false">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="类型" prop="type">
          <el-select v-model="addForm.type" clearable placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="进货价格" prop="cost">
          <el-input-number v-model="addForm.cost" :min="0" :max="1000" :step="10"></el-input-number>
        </el-form-item>
        <el-form-item label="出售价格" prop="price">
          <el-input-number v-model="addForm.price" :min="0" :max="1000" :step="10"></el-input-number>
        </el-form-item>
        <el-form-item label="单位" prop="unit">
          <el-input v-model="addForm.unit"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-radio-group v-model="addForm.state">
            <el-radio-button label="true">可  用</el-radio-button>
            <el-radio-button label="false">不可用</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import util from '../../common/js/util'
//import NProgress from 'nprogress'
import {getOtherList, removeOther, editOther, addOther} from '../../api/api';

export default {
  data() {
    return {
      filters: {
        type: ''
      },
      other: [],
      options: [{
        value: '被套',
        label: '被套'
      }, {
        value: '被窝',
        label: '被窝'
      }, {
        value: '墙布',
        label: '墙布'
      }, {
        value: '卷帘',
        label: '卷帘'
      }, {
        value: '枕头',
        label: '枕头'
      },{
        value: '被单',
        label: '被单'
      },{
        value: '其他',
        label: '其他'
      }],
      listLoading: false,
      sels: [],//列表选中列

      editFormVisible: false,//编辑界面是否显示
      editLoading: false,
      editFormRules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ]
      },
      //编辑界面数据
      editForm: {
        type:'',
        name: '',
        cost:'',
        price: 100,
        unit:'',
        state:true
      },
      addFormVisible: false,//新增界面是否显示
      addLoading: false,
      addFormRules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ]
      },
      //新增界面数据
      addForm: {
        type:'',
        name: '',
        cost:'',
        price: 2,
        unit:'',
        state:true
      }
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.getCircle();
    },
    //获取杆子列表
    getOther() {
      let para = {
        type: this.filters.type
      };
      this.listLoading = true;
      //NProgress.start();
      getOtherList(para).then((res) => {
        this.other = res.data;
        this.listLoading = false;
        //NProgress.done();
      });
    },
    //删除
    handleDel: function (index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true;
        //NProgress.start();
        let para = { id: row.id };
        removeOther(para).then((res) => {
          this.listLoading = false;
          //NProgress.done();
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getOther();
        });
      }).catch(() => {

      });
    },
    //显示编辑界面
    handleEdit: function (index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    //显示新增界面
    handleAdd: function () {
      this.addFormVisible = true;
      this.addForm = {
        type:'其他',
        name: '',
        price: 2,
        state: true
      };
    },
    //编辑
    editSubmit: function () {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.editForm);
            editOther(para).then((res) => {
              this.editLoading = false;
              //NProgress.done();
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              this.$refs['editForm'].resetFields();
              this.editFormVisible = false;
              this.getOther();
            });
          });
        }
      });
    },
    //新增
    addSubmit: function () {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.addLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.addForm);
            addOther(para).then((res) => {
              this.addLoading = false;
              //NProgress.done();
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              this.$refs['addForm'].resetFields();
              this.addFormVisible = false;
              this.getOther();
            });
          });
        }
      });
    },
    getlen(){
      alert(this.pole.length);
    },
    transState(row, column){
      if(row.state==true) return "可用";
      return "不可用";
    }
  },
  mounted() {
    this.getOther();
  }
}

</script>

<style scoped>

</style>