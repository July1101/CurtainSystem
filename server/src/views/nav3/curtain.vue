<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.version_id" placeholder="窗帘编号" @input="getCurtains"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.name" placeholder="窗帘名称" @input="getCurtains"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getCurtains">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="curtains" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="version_id" label="编号" width="120" sortable>
      </el-table-column>
      <el-table-column prop="name" label="名称" width="140"  sortable>
      </el-table-column>
      <el-table-column prop="cost" label="进价" width="100" sortable>
      </el-table-column>
      <el-table-column prop="price" label="价格" width="100" sortable>
      </el-table-column>
      <el-table-column prop="factory" label="厂家" width="100" sortable>
      </el-table-column>
      <el-table-column prop="total_amount" label="售出金额" width="100" sortable>
      </el-table-column>
      <el-table-column prop="total_order" label="售出订单" width="100" sortable>
      </el-table-column>
      <el-table-column prop="total_num" label="售出数量/米" min-width="100" sortable>
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
      <el-button type="danger" @click="getCurtains" >刷新</el-button>
    </el-col>

    <!--编辑界面-->
    <el-dialog title="编辑" :visible="editFormVisible" @close="editFormVisible=false" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="版本编号" prop="version_id">
          <el-input v-model="editForm.version_id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="进价" prop="cost">
          <el-input-number v-model="editForm.cost" :min="0" :max="1000" :step="10"></el-input-number>
        </el-form-item>
        <el-form-item label="售价" prop="price">
          <el-input-number v-model="editForm.price" :min="0" :max="1000" :step="10"></el-input-number>
        </el-form-item>
        <el-form-item label="厂家" prop="factory">
          <el-select v-model="editForm.factory" placeholder="请选择">
            <el-option
                v-for="item in factory"
                :key="item"
                :label="item"
                :value="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--新增界面-->
    <el-dialog title="新增" :visible="addFormVisible" @close="addFormVisible=false" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="版本编号" prop="version_id">
          <el-input v-model="addForm.version_id"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="进价" prop="cost">
          <el-input-number v-model="addForm.cost" :min="0" :max="1000" :step="10"></el-input-number>
        </el-form-item>
        <el-form-item label="售价" prop="price">
          <el-input-number v-model="addForm.price" :min="0" :max="1000" :step="10"></el-input-number>
        </el-form-item>
        <el-form-item label="厂家" prop="factory">
          <el-select v-model="addForm.factory" placeholder="请选择">
            <el-option
                v-for="item in factory"
                :key="item"
                :label="item"
                :value="item">
            </el-option>
          </el-select>
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
import { getCurtainList, removeCurtain, editCurtain, addCurtain ,facList} from '../../api/api';

export default {
  data() {
    return {
      factory:[],
      filters: {
        version_id: '',
        name:''
      },
      curtains: [],
      total: 0,
      page: 1,
      listLoading: false,
      sels: [],//列表选中列

      editFormVisible: false,//编辑界面是否显示
      editLoading: false,
      editFormRules: {
        version_id: [
          { required: true, message: '请输入编号', trigger: 'blur' }
        ]
      },
      //编辑界面数据
      editForm: {
        version_id:'',
        name: '',
        cost:80,
        price: 100,
        factory:'',
      },

      addFormVisible: false,//新增界面是否显示
      addLoading: false,
      addFormRules: {
        version_id: [
          { required: true, message: '请输入编号', trigger: 'blur' }
        ]
      },
      //新增界面数据
      addForm: {
        version_id:'',
        name: '',
        cost:80,
        price: 100,
        factory:'',
      }
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.getCurtains();
    },
    //获取用户列表
    getCurtains() {
      let para = {
        version_id:this.filters.version_id,
        name: this.filters.name
      };
      this.listLoading = true;
      //NProgress.start();
      getCurtainList(para).then((res) => {
        this.curtains = res.data.data;
        this.listLoading = false;
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
        removeCurtain(para).then((res) => {
          this.listLoading = false;
          //NProgress.done();
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getCurtains();
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
        version_id:'',
        name: '',
        cost:80,
        price: 100,
        factory: ''
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
            editCurtain(para).then((res) => {
              this.editLoading = false;
              //NProgress.done();
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              this.$refs['editForm'].resetFields();
              this.editFormVisible = false;
              this.getCurtains();
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
            addCurtain(para).then(() => {
              this.addLoading = false;
              //NProgress.done();
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              this.$refs['addForm'].resetFields();
              this.addFormVisible = false;
              this.getCurtains();
            });
          });
        }
      });
    },
    selsChange: function (sels) {
      this.sels = sels;
    },
  },
  mounted() {
    this.getCurtains();
    facList().then((res)=>{
      this.factory=res.data
    })
  }
}

</script>

<style scoped>

</style>