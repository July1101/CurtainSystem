<template>
  <section>
    <el-form  ref="form" :model="form" label-width="80px" inline>
      <el-form-item label="书本">
        <el-select v-model="form.book">
          <el-option
              v-for="item in book_options"
              :key="item"
              :label="item"
              :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="页面">
        <el-input-number v-model="form.page" ></el-input-number>
      </el-form-item>
      <el-form-item label="厂家">
        <el-select v-model="form.factory" @change="handleChange(form.factory)">
          <el-option
              v-for="item in factory_options"
              :key="item"
              :label="item"
              :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addList">新增布号</el-button>
      </el-form-item>
    </el-form>
    <el-card style="background-color: #ffe7cb" v-for="(item,index) in form.list" :key="index">
      <el-row>
        <el-col :span="4">
          <el-form>
            <el-form-item label="位置">
              <el-select v-model="item.room" placeholder="请输入位置" filterable>
                <el-option
                    v-for="item in room_options"
                    :key="item"
                    :label="item"
                    :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="4">
          <el-form>
            <el-form-item label="名称">
              <el-autocomplete v-model="item.name" :fetch-suggestions="querySearch" clearable @select="pickCode(item.name,index)" @clear="autoClear(index)">
              </el-autocomplete>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="4">
          <el-form>
            <el-form-item label="编号">
              <el-select v-model="item.code" @change="autoFindCost(index,item.name,item.code)">
                <el-option
                    v-for="item in code_options"
                    :key="item"
                    :label="item"
                    :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="4">
          <el-form>
            <el-form-item label="价格">
              <el-input-number v-model="item.cost" ></el-input-number>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="3">
          <el-form label-width="40px">
            <el-form-item label="数量">
              <el-input v-model="item.num"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="2">
          <el-form>
            <el-form-item label="总价">
              <span class="foot">{{item.total}}</span>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <el-col style="text-align:center;">
        <el-button style="width:30%" type="primary">提交</el-button>
      </el-col>

    </el-card>
  </section>

</template>
<script>
import {addFahuo,getCurFac,getCurName,getCurCode,getCurCost} from '../../api/api';
export default {
  data() {
    return {
      cur:[],
      book_options:[`22年1月`,`22年2月`,`22年3月`,`22年4月`,`22年5月`,`22年6月`,`22年7月`,`22年8月`,`22年9月`,`22年10月`,`22年11月`,`22年12月`],
      factory_options:[],
      room_options:["客厅", "主卧", "次卧", "书房", "厨房", "餐厅", "二楼主卧", "二楼次卧", "厕所"],
      name_options:[],
      code_options:[],
      name_loading:false,
      form:{
        book:'',
        page:0,
        factory:'',
        list:[]
      },
      list_template:{
        room:'',
        name:'',
        code:'',
        cost:0,
        num:0,
        total:0
      }
    }
  },
  methods: {
    addList(){
      let tmp=Object.assign({},this.list_template);
      this.form.list.push(tmp)
    },
    handleChange(factory){
      this.name_options.length=0;
      getCurName({factory:factory}).then((res)=>{
        for(let i=0;i<res.data.length;i++){
          this.name_options.push({value:res.data[i]})
        }
      })
    },
    querySearch(queryString, cb) {
      let name= this.name_options;
      let results = queryString ? name.filter(this.createFilter(queryString)) : name;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (name) => {
        return (name.value.toLowerCase().indexOf(queryString.toLowerCase())>-1);
      };
    },
    pickCode(name,i){
      getCurCode({name:name,factory: this.form.factory}).then((res)=>{
        this.code_options=res.data
      })
    },
    autoClear(i){
      this.form.list[i].code=''
      this.form.list[i].cost=0
    },
    autoFindCost(i,name,code){
      getCurCost({name:name,code:code}).then((res)=>{
        this.form.list[i].cost=res.data
      })
    },
  },
  mounted() {
    let month=new Date().getMonth()
    this.form.book=this.book_options[month]
    getCurFac().then((res)=>{
      this.factory_options=res.data
    })
  },
  watch:{
    form:{
      deep:true,
      handler:function (o,n){
        for(let i=0;i<this.form.list.length;i++){
          this.form.list[i].total=Number(this.form.list[i].cost)*Number(this.form.list[i].num)
        }
      }
    }
  }
};

</script>

<style >

.foot{
  font-weight: bold;
  font-size: 30px;
  color: red;
}

</style>