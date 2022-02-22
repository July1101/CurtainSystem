<template>
  <el-container>
    <el-header style="width: 100%;height: 80px;background-color: #e1ffb8 ">
      <el-row style="top: 20px;">
        <el-form inline label-width="100px" :model="user_info" :rules="formRules" ref="user_info">
          <el-form-item label="客户姓名" prop="username">
            <el-input v-model="user_info.name"></el-input>
          </el-form-item>
          <el-form-item label="客户电话" prop="telephone">
            <el-input v-model="user_info.telephone"></el-input>
          </el-form-item>
          <el-form-item label="区域" prop="address">
            <el-autocomplete v-model="user_info.address" :fetch-suggestions="querySearch_address"></el-autocomplete>
          </el-form-item>
          <el-form-item label="具体地址" prop="detail_address">
            <el-input v-model="user_info.detail_address"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button-group>
              <el-button type="primary" v-on:click="add_curtain" style="width: 80px">添加窗帘</el-button>
              <el-button type="primary" v-on:click="add_other" style="width: 80px">添加其他</el-button>
              <el-button type="danger" v-on:click="clear_all" style="width: 80px">清空订单</el-button>
            </el-button-group>
          </el-form-item>
          <el-form-item>
            <el-button v-on:click="return_main">返回首页</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="400px" style="background-color: #d1ffb3">
        <el-card style="margin-top: 20px;background-color: #d4f0ff">
          <el-form label-width="60px">
            <el-row style="right: 10px">
              <el-col span="12">
                <el-form-item label="有纺带">
                  <el-autocomplete v-model="belt.name" :fetch-suggestions="querySearch_belt" @select="autoPickBelt(belt.name)"></el-autocomplete>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="带单价">
                  <el-input v-model="belt.price" @input="calculate_total"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="right: 10px" v-if="circle.num>0">
              <el-col span="12">
                <el-form-item label="圈类型">
                  <el-autocomplete v-model="circle.name" :fetch-suggestions="querySearch_circle" @select="autoPickCircle(circle.name)"></el-autocomplete>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="圈单价">
                  <el-input v-model="circle.price" @input="calculate_total"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="right: 10px" v-if="ring.num>0">
              <el-col span="12">
                <el-form-item label="吊环">
                  <el-autocomplete v-model="ring.name" :fetch-suggestions="querySearch_ring" @select="autoPickRing(ring)"></el-autocomplete>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="环单价">
                  <el-input v-model="ring.price" @input="calculate_total"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
        </el-card>
        <el-card style="background-color: #ffe7cb" v-if="pole1.length>0.0">
          <el-form label-width="100px">

            <el-row>
              <el-col span="24">
                <el-form-item label="罗马杆型号">
                  <el-autocomplete v-model="pole1.name" :fetch-suggestions="querySearch_pole" @select="autoPickPole(pole1)"></el-autocomplete>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="总长度">
                  <el-input v-model="pole1.length">
                    <template slot="append">米</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="单价">
                  <el-input :value="pole1.price" @input="calculate_total">
                    <template slot="append">元/米</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>

        <el-card style="background-color: #c9ffd1 " v-if="pole2.length>0.0">
          <el-form label-width="100px">
            <el-row>
              <el-col span="24">
                <el-form-item label="轨道型号">
                  <el-autocomplete v-model="pole2.name" :fetch-suggestions="querySearch_pole" @select="autoPickPole(pole2)"></el-autocomplete>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="总长度">
                  <el-input v-model="pole2.length">
                    <template slot="append">米</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="单价">
                  <el-input v-model="pole2.price" @input="calculate_total">
                    <template slot="append">元/米</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
        <el-card>
          <el-descriptions v-for="item in info" :column="2" border>
            <el-descriptions-item label="位置">{{item.room}}</el-descriptions-item>
            <el-descriptions-item label="总价">{{item.total_money}}</el-descriptions-item>
          </el-descriptions>
          <el-descriptions v-for="item in other" :column="2" border>
            <el-descriptions-item label="名称">{{item.type}}</el-descriptions-item>
            <el-descriptions-item label="总价">{{item.total_money}}</el-descriptions-item>
          </el-descriptions>
          <el-descriptions column="1" border>
            <el-descriptions-item v-if="discount>0" label="优惠">{{discount}}</el-descriptions-item>
            <el-descriptions-item label="总金额">{{final_amount}}</el-descriptions-item>
          </el-descriptions>
        </el-card>
        <el-button v-on:click="calculate_room">更新房间</el-button>
      </el-aside>
      <el-main style="background-color: #ffd3d6;">
        <el-form label-position="right" label-width="80px">
          <el-card v-for="(item, index) in info" :key="index" style="width: 100%">
            <el-row>
              <el-col span="3" >
                <el-form-item label="位置" :prop="'info.'+index+'.room'">
                  <el-autocomplete v-model="item.room" :fetch-suggestions="querySearch_room" ></el-autocomplete>
                </el-form-item>
              </el-col>
              <el-col span="4">
                <el-form-item label="尺寸">
                  <el-input v-model="item.size" @blur="matter(item)">
                    <template slot="append">米</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col span="5.01">
                <el-form-item>
                  <el-radio-group v-model="item.curtain.part">
                    <el-radio-button label=0>无拼色</el-radio-button>
                    <el-radio-button label=1>一拼色</el-radio-button>
                    <el-radio-button label=2>两拼色</el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col span="1">
                <el-form-item>
                  <el-checkbox v-model="item.has_valance">帘头</el-checkbox>
                </el-form-item>
              </el-col>
              <el-col span="1">
                <el-form-item>
                  <el-checkbox v-model="item.has_lace">花边</el-checkbox>
                </el-form-item>
              </el-col>
              <el-col span="1">
                <el-form-item>
                  <el-checkbox v-model="item.has_yarn">纱</el-checkbox>
                </el-form-item>
              </el-col>
              <el-col span="2" push="5">
                <el-form-item>
                  <el-button type="danger" icon="el-icon-delete" v-on:click="remove_curtain(index)">删除</el-button>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col span="4">
                <el-form-item label="窗帘名称">
                  <el-autocomplete v-model="item.curtain.name" :fetch-suggestions="querySearch_curtain" @select="autoPickCurtain(item.curtain.name,index)" clearable @change="item.curtain.version_id='';
item.curtain.version_id1='';
item.curtain.version_id2='';
item.curtain.price='';"></el-autocomplete>
                </el-form-item>
              </el-col>
              <el-col span="3">
                <el-form-item label="主布编号" >
                  <el-select v-model="item.curtain.version_id" @change="autoPickCurtainPrice(item.curtain.name,item.curtain.version_id,index)">
                    <el-option v-for="it in item.c_option" :key="it.value" :label="it.value" :value="it.value" ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col span="3" v-if="item.curtain.part>0">
                <el-form-item label="配布1" >
                  <el-select v-model="item.curtain.version_id1">
                    <el-option v-for="it in item.c_option" :key="it.value" :label="it.value" :value="it.value" ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col span="3" v-if="item.curtain.part==2">
                <el-form-item label="配布2" >
                  <el-select v-model="item.curtain.version_id2">
                    <el-option v-for="it in item.c_option" :key="it.value" :label="it.value" :value="it.value" ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col span="3">
                <el-form-item label="宽度" >
                  <el-input v-model="item.curtain.length" style="width: 130px">
                    <template slot="append">米</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col span="3">
                <el-form-item label="单价" :prop="'info.'+index+'.curtain.price'">
                  <el-input v-model="item.curtain.price" style="width: 120px">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col span="3.01">
                <el-form-item>
                  <el-radio-group v-model="item.pole">
                    <el-radio-button label=1>罗马杆</el-radio-button>
                    <el-radio-button label=2>轨道</el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row v-if="item.has_yarn==true">
              <el-col span="4">
                <el-form-item label="纱帘名称">
                  <el-autocomplete v-model="item.yarn.name" :fetch-suggestions="querySearch_yarn" clearable @select="get_yarn_id(item.yarn.name,index)" @change="function (){item.yarn.version_id='';item.yarn.price=''}"></el-autocomplete>
                </el-form-item>
              </el-col>
              <el-col span="3">
                <el-form-item label="纱帘编号">
                  <el-select v-model="item.yarn.version_id" @change="autoPickYarnPrice(item.yarn.name,item.yarn.version_id,index)">
                    <el-option v-for="it in item.o_option" :key="it.value" :label="it.value" :value="it.value" ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col span="3">
                <el-form-item label="宽度">
                  <el-input v-model="item.yarn.length" style="width: 130px">
                    <template slot="append">米</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col span="3">
                <el-form-item label="单价">
                  <el-input v-model="item.yarn.price" style="width: 120px">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col span="3.01">
                <el-form-item>
                  <el-radio-group v-model="item.yarn.pole">
                    <el-radio-button label=1>罗马杆</el-radio-button>
                    <el-radio-button label=2>轨道</el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>


            <el-row>
              <el-col span="4" v-if="item.has_valance==true">
                <el-form-item label="帘头名称">
                  <el-autocomplete v-model="item.valance.name" :fetch-suggestions="querySearch_valance" @select="autoPickValance(item.valance.name,index)"></el-autocomplete>
                </el-form-item>
              </el-col>
              <el-col span="4" v-if="item.has_valance==true">
                <el-form-item label="帘头长度">
                  <el-input v-model="item.valance.length">
                    <template slot="append">米</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col span="4" v-if="item.has_valance==true">
                <el-form-item label="帘头单价">
                  <el-input v-model="item.valance.price">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col span="4" v-if="item.has_lace==true">
                <el-form-item label="花边名称">
                  <el-autocomplete v-model="item.lace.name" :fetch-suggestions="querySearch_lace" @select="autoPickLace(item.lace.name,index)"></el-autocomplete>
                </el-form-item>
              </el-col>
              <el-col span="4" v-if="item.has_lace==true">
                <el-form-item label="长度">
                  <el-input v-model="item.lace.length">
                    <template slot="append">米</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col span="4" v-if="item.has_lace==true">
                <el-form-item label="单价">
                  <el-input v-model="item.lace.price">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
        </el-form>

        <el-card style="background-color: palegreen " v-for="(item, index) in other" :key="index">
          <el-form label-position="right" label-width="80px">
            <el-row>
              <el-col span="3">
                <el-form-item label="型号">
                  <el-select v-model="item.type" clearable placeholder="请选择" @change="getOther(item.type)">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col span="3">
                <el-form-item label="名称">
                  <el-autocomplete v-model="item.name" :fetch-suggestions="querySearch_other" @select="autoPickOther(index,item.name)"></el-autocomplete>
                </el-form-item>
              </el-col>
              <el-col span="3">
                <el-form-item label="单价">
                  <el-input v-model="item.price">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col span="3">
                <el-form-item label="单位">
                  <el-input v-model="item.unit">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col span="3">
                <el-form-item label="数量">
                  <el-input-number v-model="item.num" @change="other_change(item)"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col span="5" offset="2">
                <el-form-item label="单项总价">
                  <el-input v-model="item.total_money">
                    <template slot="prepend">￥</template>
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col span="2">
                <el-form-item>
                  <el-button type="danger" icon="el-icon-delete" v-on:click="remove_other(index)"></el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-main>
    </el-container>
    <el-footer height="60px" style="background-color: #f6d3ff ;">
      <div>
        <span v-if="discount!=0" style="position: relative; left:785px;top:10px;">优惠金额：</span>
        <span v-if="discount!=0" class="foot" style="position: relative; left:800px;top:10px;">￥{{discount}}</span>
        <span style="position: relative; left:1085px;top:5px;">总金额： </span>
        <span class="foot" style="position: relative; left:1100px;top:5px;">￥{{final_amount}}</span>
        <el-button style="position: relative;left:1150px;width: 300px;height: 55px;  background-color: #e64242;
  border: none;
  color: white;
  padding: 23px 50px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;" v-on:click="handleSubmit" >提交订单</el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import {
  getAddressList, getBeltList,
  getCircleList2,
  getLaceList,
  getPoleList2,
  getValanceList2,
  getYarnName,
  getCurtainName,
  getYarnID,
  getYarnPrice,
  getCurtainID, getCurtainPrice,getOtherList2, getNowID,submitBill
} from '../api/api.js'

export default {
  name: "new_order",
  data(){
    return{
      discount:0.0,
      final_amount:0.0,

      user_info:{
        name:'-',
        telephone:'',
        address:'',
        detail_address:''
      },

      id:'',
      state:'',

      lace:[],
      curtains:[],
      curtains_id:[],
      curtain_name:[],
      pole:[],
      valance:[],
      yarn:[],
      yarn_id:[],
      address:[],
      //
      belts:[],
      circles:[],
      rings:[],
      other_select:[],


      info:[],

      //侧边栏
      belt:{
        name:'',
        length:0.0,
        price:'',
        cost:0.0
      },
      circle:{
        name:'',
        num:0,
        price:'',
        cost:0.0
      },
      pole1:{
        name:'',
        price:'',
        length:0.0,
        cost:0.0
      },
      pole2:{
        name:'',
        price:'',
        length:0.0,
        cost:0.0
      },
      ring:{
        name:'',
        num:0,
        price:'',
        cost:0.0
      },

      room_template:{
        room:'',
        size:'',
        pole:0,
        total_money:0.0,
        has_lace:false,
        has_valance:false,
        has_yarn:false,
        curtain:{
          version_id:'',
          version_id1:'',
          version_id2:'',
          name:'',
          price:'',
          cost:'',
          length:'',
          part:0
        },
        yarn:{
          name:'',
          version_id:'',
          price:'',
          cost:0.0,
          length:0.0,
          pole:0,
        },
        valance:{
          name:'',
          cost:0.0,
          length:'',
          price:0.0
        },
        lace:{
          name:'',
          length:5.6,
          price:'',
          cost:0.0
        },
        c_option:[],
        o_option:[]
      },
      other:[],
      other_template:{
        type:'',
        name:'',
        price:'',
        cost:0.0,
        unit:'',
        num:'',
        total_money:0
      },
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
      location_suggestion:[
        {value:"客厅"},
        {value:"主卧"},
        {value:"次卧"},
        {value:"书房"},
        {value:"厨房"},
        {value:"餐厅"},
        {value:"二楼主卧"},
        {value:"二楼次卧"},
        {value:"厕所"}
      ],
      formRules:{
        name: [
          { required: true, message: '请输入客户名称', trigger: 'blur' }
        ],
        telephone:[
          { required: true,pattern:/^1[0-9]{10}$/, message: '请输入11位电话', trigger: 'blur' },
        ],
        address:[
          { required: true, message: '请输入客户所在区域', trigger: 'blur' }
        ],
        detail_address:[
          { required: true, message: '请输入客户地址', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{

    return_main(){
      this.$router.push({path: '/page4'})
    },
    check_submit(){
      for(let i=0;i<this.info.length;i++){
        let t=this.info[i];
        if(t.room==''||t.size==''||t.version_id==''||t.curtain.name==''||t.curtain.price==''){
          alert("窗帘信息有误");
          return false;
        }
        if(t.pole!=1&&t.pole!=2){
          alert("房间  "+t.room+"请选择罗马杆或者轨道");
          return false;
        }
        if(t.has_yarn==true){
          if(t.yarn.name==''||t.yarn.version_id==''||t.yarn.price==''||t.pole==0){
            alert("房间  "+t.room+"  信息有误");
            return false;
          }
        }
        if(t.has_valance==true&&(t.valance.name==''||t.valance.price=='')){
          alert("房间  "+t.room+"  信息有误");
          return false;
        }
        if(t.has_lace==true&&(t.lace.name==''||t.lace.price=='')){
          alert("房间  "+t.room+"  信息有误");
          return false;
        }
      }
      for(let i=0;i<this.other.length;i++){
        if(this.other[i].type==''||this.other[i].name==''||this.other[i].price==''||this.other[i].total_money==''||this.other[i].num==''){
          alert("其他信息"+(i+1)+"信息有误");
          return false;
        }
      }
      if(this.belt.name==''||this.belt.price==''){
        if(this.info.length!=0){
          alert("有纺带信息有误");
          return false;
        }
      }
      if(this.circle.num>0){
        if(this.circle.price==''||this.circle.name==''){
          alert("圈信息有误");
          return false;
        }
      }
      if(this.pole1.length>0){
        if(this.pole1.name==''){
          alert("罗马杆信息有误");
          return false;
        }
      }
      if(this.pole2.length>0){
        if(this.pole2.name==''){
          alert("轨道信息有误");
          return false;
        }
      }
      if(this.ring.num>0){
        if(this.ring.price==''||this.ring.name==''){
          alert("圈信息有误");
          return false;
        }
      }
      return true;
    },
    handleSubmit(){
      if(this.check_submit()==true){
        this.$refs.user_info.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.calculate_room();
              for(let i=0;i<this.info.length;i++) this.info[i].c_option.length=this.info[i].o_option.length=0;
              let order={
                id:0,
                user_info:this.user_info,
                info:this.info,
                other:this.other,
                circle:this.circle,
                pole1:this.pole1,
                belt:this.belt,
                pole2:this.pole2,
                ring:this.ring,

                discount:this.discount,
                final_amount:this.final_amount,
                already_pad:0,

                create_time:new Date(),
                confirm_time:new Date(),
                fahuo_time:new Date(),
                handle_time:new Date(),
                install_time:new Date(),
                finish_time:new Date(),
                state:0
              };
              for(let i=0;i<order.info.length;i++){
                if(!order.info[i].has_lace) order.info[i].lace.price=0;
                if(!order.info[i].has_valance) order.info[i].valance.price=0;
                if(!order.info[i].has_yarn) order.info[i].yarn.price=0;
                order.info[i].total_money=Number(order.info[i].total_money);
                order.info[i].pole=Number(order.info[i].pole)
              }
              if(order.circle.name=="") order.circle.price=0;
              if(order.pole1.name=="") order.pole1.price=0;
              if(order.pole2.name=="") order.pole2.price=0;
              if(order.belt.name=="") order.belt.price=0;
              if(order.ring.name=="") order.ring.price=0;
              submitBill(order).then(()=>{
                this.$message({
                  message:"提交成功",
                  type:'success'
                })
                this.$router.push({path: '/page4'});
              });
            });
          }else alert("请正确输入客户信息");
        });
      }
    },
    matter(item){
      if(item.size!=''){
        item.size=parseFloat(item.size);
        item.curtain.length=item.size*2;
        item.yarn.length=item.size*2;
        item.valance.length=item.size;
      }
    },
    other_change(item){
      if(item.price!='') item.total_money=item.price*item.num;
    },
    getOther(type){
      let para={type:type};
      getOtherList2(para).then((res)=>{
        this.other_select=res.data;
        for(let i=0;i<this.other_select.length;i++) this.other_select[i].value=this.other_select[i].name;
      });
    },

    //搜索建议
    querySearch_room(queryString, cb){
      let u=this.location_suggestion;
      let results = queryString ? u.filter(this.createFilter_room(queryString)):u;
      cb(results);
    },
    createFilter_room(queryString) {
      return (u) => {
        return (u.toLowerCase().indexOf(queryString.toLowerCase()) >=0);
      };
    },
    querySearch_curtain(queryString, cb){
      let u=this.curtains;
      let results = queryString ? u.filter(this.createFilter_curtain(queryString)):u;
      cb(results);
    },
    createFilter_curtain(queryString) {
      return (u) => {
        return (u.value.toLowerCase().indexOf(queryString.toLowerCase()) >=0);
      };
    },
    querySearch_yarn(queryString, cb){
      let u=this.yarn;
      let results = queryString ? u.filter(this.createFilter_curtain(queryString)):u;
      cb(results);
    },
    querySearch_address(queryString, cb){
      let u=this.address;
      let results = queryString ? u.filter(this.createFilter_name(queryString)):u;
      cb(results);
    },
    querySearch_valance(queryString, cb){
      let u=this.valance;
      let results = queryString ? u.filter(this.createFilter_name(queryString)):u;
      cb(results);
    },
    querySearch_lace(queryString, cb){
      let u=this.lace;
      let results = queryString ? u.filter(this.createFilter_name(queryString)):u;
      cb(results);
    },
    querySearch_belt(queryString, cb){
      let u=this.belts;
      let results = queryString ? u.filter(this.createFilter_name(queryString)):u;
      cb(results);
    },
    querySearch_circle(queryString, cb){
      let u=this.circles;
      let results = queryString ? u.filter(this.createFilter_name(queryString)):u;
      cb(results);
    },
    querySearch_pole(queryString, cb){
      let u=this.pole;
      let results = queryString ? u.filter(this.createFilter_name(queryString)):u;
      cb(results);
    },
    querySearch_ring(queryString, cb){
      let u=this.rings;
      let results = queryString ? u.filter(this.createFilter_name(queryString)):u;
      cb(results);
    },
    querySearch_other(queryString, cb){
      let other=this.other_select;
      let results = queryString ? other.filter(this.createFilter_name(queryString)):other;
      cb(results);
    },
    createFilter_name(queryString) {
      return (u) => {
        return (u.name.toLowerCase().indexOf(queryString.toLowerCase()) >=0);
      };
    },



    //自动匹配
    autoPickCurtain(name,index){
      getCurtainID({name:name}).then((res)=>{
        this.info[index].c_option.length=0;
        for(let i=0;i<res.data.length;i++){
          this.info[index].c_option.push({value:res.data[i]});
        }
      });
    },
    autoPickCurtainPrice(name,version_id,index){
      let para={name:name,version_id:version_id};
      getCurtainPrice(para).then((res)=>{
        this.info[index].curtain.price=this.info[index].curtain.cost=res.data;
      })
    },
    autoPickValance(name,index){
      let valance=this.valance;
      valance = valance.filter(function (x) {
        return x.name===name;
      });
      this.info[index].valance.price=this.info[index].valance.cost=valance[0].price;
    },
    autoPickOther(index,name){
      let other=this.other_select;
      other = other.filter(function (x) {
        return x.name===name;
      });
      this.other[index].price=this.other[index].cost=other[0].price;
      this.other[index].unit=other[0].unit;
      this.calculationOther(index);
      this.calculate_total();
    },
    autoPickLace(name,index){
      let lace=this.lace;
      lace=lace.filter((function (x){
        return x.name===name;
      }));
      this.info[index].lace.price=this.info[index].lace.cost=lace[0].price;
      this.calculate_total();
    },
    autoPickRing(ring){
      let u=this.rings;
      u=u.filter((function (x){
        return x.name===ring.name;
      }));
      ring.price=ring.cost=u[0].price;
      this.calculate_total();
    },
    autoPickBelt(name){
      let u=this.belts;
      u=u.filter((function (x){
        return x.name===name;
      }));
      this.belt.price=this.belt.cost=u[0].price;
      this.calculate_total();
    },
    autoPickPole(pole){
      let u=this.pole;
      u=u.filter((function (x){
        return x.name===pole.name;
      }));
      pole.price=pole.cost=u[0].price;
      this.calculate_total();
    },
    autoPickCircle(name){
      let u=this.circles;
      u=u.filter((function (x){
        return x.name===name;
      }));
      this.circle.price=this.circle.cost=u[0].price;
      this.calculate_total();
    },
    autoPickYarnPrice(name,version_id,index){
      let para={name:name,version_id:version_id};
      getYarnPrice(para).then((res)=>{
        this.info[index].yarn.price=this.info[index].yarn.cost=res.data;
      })
    },
    get_yarn_id(name,index){
      getYarnID({name:name}).then((res)=>{
        this.info[index].o_option.length=0;
        for(let i=0;i<res.data.length;i++){
          this.info[index].o_option.push({value:res.data[i]});
        }
      })
    },

    //新建以及删除
    add_curtain(){
      let tmp=Object.assign({},this.room_template);
      tmp.curtain=Object.assign({},this.room_template.curtain);
      tmp.yarn=Object.assign({},this.room_template.yarn);
      tmp.c_option=Object.assign([],this.room_template.c_option);
      tmp.o_option=Object.assign([],this.room_template.o_option);
      this.info.push(tmp);
    },
    remove_curtain(index){
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() =>{
        this.info.splice(index, 1);
      });
    },
    add_other() {
      let tmp = Object.assign({}, this.other_template);
      this.other.push(tmp);
    },
    remove_other(index){
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() =>{
        this.other.splice(index, 1);
      });
    },
    clear_all(){
      this.$confirm('确认清空订单吗?', '提示', {
        type: 'warning'
      }).then(() =>{
        this.user_info.name='-';
        this.user_info.telephone='';
        this.user_info.address='';
        this.user_info.detail_address='';
        let len1=this.info.length;
        let len2=this.other.length;
        for(let i=0;i<len1;i++) this.info.pop();
        for(let i=0;i<len2;i++) this.other.pop();
        this.belt.name='';
        this.belt.price='';
        this.belt.cost=0;
        this.belt.length=0;
        this.circle.name='';
        this.circle.price='';
        this.circle.cost=0;
        this.circle.num=0;
        this.pole1.name='';
        this.pole1.price='';
        this.pole1.cost=0;
        this.pole1.length=0;
        this.pole2.name='';
        this.pole2.price='';
        this.pole2.cost=0;
        this.pole2.length=0;
        this.ring.name='';
        this.ring.price='';
        this.ring.cost=0;
        this.ring.num=0;
      });
    },
    asyncUpdate(){
      //尺寸匹配
      this.circle.num=0;
      this.belt.length=0.0;
      this.ring.num=0;
      this.pole1.length=0.0;
      this.pole2.length=0.0;
      for(let i=0;i<this.info.length;i++){
        if(this.info[i].size=='') continue;
        this.belt.length+=parseFloat(this.info[i].size)*2;
        if(this.info[i].pole==1){
          this.circle.num+=Math.round(this.info[i].size*12.0);
          this.pole1.length+=parseFloat(this.info[i].size);
        }else if(this.info[i].pole==2) this.pole2.length+=this.info[i].size;
        if(this.info[i].has_yarn==true&&this.info[i].yarn.pole==1){
          this.ring.num+=Math.round(this.info[i].size*12.0);
          this.pole1.length+=parseFloat(this.info[i].size);
        }else if(this.info[i].has_yarn==true&&this.info[i].yarn.pole==2){
          this.pole2.length+=parseFloat(this.info[i].size);
        }
      }
      this.calculate_total();
    },
    calculate_room1(a){
      if(a.size=='') return;
      a.total_money=0.0;
      if(a.curtain.price!=''&&a.curtain.length!='') a.total_money+=parseFloat(a.curtain.price)*parseFloat(a.curtain.length);
      if(this.belt.price!='') a.total_money+=parseFloat(this.belt.price)*parseFloat(a.size)*2;
      if(a.pole==1&&this.circle.price!='') a.total_money+=parseFloat(this.circle.price)*Math.round(parseFloat(a.size)*12);
      if(a.pole==1&&this.pole1.price!='') a.total_money+=parseFloat(this.pole1.price)*parseFloat(a.size);
      else if(a.pole==2&&this.pole2.price!='') a.total_money+=parseFloat(this.pole2.price)*parseFloat(a.size);
      if(a.has_yarn==true){

        if(a.yarn.price!=''&&a.yarn.length!='')  a.total_money+=parseFloat(a.yarn.price)*parseFloat(a.yarn.length);
        if(a.yarn.pole==1&&this.pole1.price!='') {
          a.total_money+=parseFloat(this.pole1.price)*parseFloat(a.size);
          if(this.ring.price!='') a.total_money+=parseFloat(this.ring.price)*parseFloat(a.size)*12;
        }
        else if(a.yarn.pole==2&&this.pole2.price!='') a.total_money+=parseFloat(this.pole2.price)*parseFloat(a.size);
      }
      if(a.has_valance==true&&a.valance.price!=''&&a.valance.length!=''){
        a.total_money+=parseFloat(a.valance.price)*parseFloat(a.valance.length);
      }
      if(a.has_lace==true&&a.lace.price!=''){
        a.total_money+=parseFloat(a.lace.price)*parseFloat(a.lace.length);
      }
      a.total_money=a.total_money.toFixed(2);
    },
    calculate_room(){
      for(let i=0;i<this.info.length;i++){
        this.calculate_room1(this.info[i]);
      }
    },
    calculate_total(){
      this.final_amount=0.0;
      this.discount=0.0;
      for(let i=0;i<this.info.length;i++){
        let curtain=this.info[i].curtain;
        if(curtain.price!=''&&curtain.price!=''){
          // curtain.price=parseFloat(curtain.price);
          // curtain.length=parseFloat(curtain.length);
          this.final_amount+=curtain.price*curtain.length;
          if(curtain.cost>curtain.price) this.discount+=curtain.length*(curtain.cost-curtain.price);
        }
        if(this.info[i].has_yarn==true&&this.info[i].yarn.price!=''&&this.info[i].yarn.length!=''){
          // this.info[i].yarn.price=parseFloat(this.info[i].yarn.price);
          // this.info[i].yarn.length=parseFloat(this.info[i].yarn.length);
          this.final_amount+=this.info[i].yarn.price*this.info[i].yarn.length;
          if(this.info[i].yarn.cost>this.info[i].yarn.price) this.discount+=this.info[i].yarn.length*(this.info[i].yarn.cost-this.info[i].yarn.price);
        }
        if(this.info[i].has_valance==true&&this.info[i].valance.price!=''&&this.info[i].valance.length!=''){
          // this.info[i].valance.price=parseFloat(this.info[i].valance.price);
          // this.info[i].valance.length=parseFloat(this.info[i].valance.length);
          this.final_amount+=this.info[i].valance.price*this.info[i].valance.length;
          if(this.info[i].valance.cost>this.info[i].valance.price) this.discount+=this.info[i].valance.length*(this.info[i].valance.cost-this.info[i].valance.price);
        }
        if(this.info[i].has_lace==true&&this.info[i].lace.price!=''&&this.info[i].lace.length!=''){
          // this.info[i].lace.price=parseFloat(this.info[i].lace.price);
          // this.info[i].lace.length=parseFloat(this.info[i].lace.length);
          this.final_amount+=this.info[i].lace.price*this.info[i].lace.length;
          if(this.info[i].lace.cost>this.info[i].lace.price) this.discount+=this.info[i].lace.length*(this.info[i].lace.cost-this.info[i].lace.price);
        }
      }
      for(let i=0;i<this.other.length;i++){
        let t=this.other[i];
        if(t.price!=''&&t.num!=''){
          // t.price=parseFloat(t.price);
          // t.num=parseFloat(t.num);
          this.final_amount+=t.price*t.num;
          if(t.num<t.cost) this.discount+=t.num*(t.cost-t.price);
        }
      }
      if(this.belt.price!=''){
        // this.belt.price=parseFloat(this.belt.price);
        this.final_amount+=this.belt.price*this.belt.length;
        if(this.belt.price<this.belt.cost) this.discount+=(this.belt.cost-this.belt.price)*this.belt.length;
      }
      if(this.circle.price!=''){
        // this.circle.price=parseFloat(this.circle.price);
        this.final_amount+=this.circle.price*this.circle.num;
        if(this.circle.price<this.circle.cost) this.discount+=(this.circle.cost-this.circle.price)*this.circle.num;
      }
      if(this.ring.price!=''){
        // this.ring.price=parseFloat(this.ring.price);
        this.final_amount+=this.ring.price*this.ring.num;
        if(this.ring.price<this.ring.cost) this.discount+=(this.ring.cost-this.ring.price)*this.ring.num;
      }
      if(this.pole1.price!=''){
        // this.pole1.price=parseFloat(this.pole1.price);
        this.final_amount+=this.pole1.price*this.pole1.length;
        if(this.pole1.price<this.pole1.cost) this.discount+=(this.pole1.cost-this.pole1.price)*this.pole1.length;
      }
      if(this.pole2.price!=''){
        // this.pole2.price=parseFloat(this.pole2.price);
        this.final_amount+=this.pole2.price*this.pole2.length;
        if(this.pole2.price<this.pole2.cost) this.discount+=(this.pole2.cost-this.pole2.price)*this.pole2.length;
      }
      this.discount=(this.discount).toFixed(2);
      this.final_amount=(this.final_amount).toFixed(2);
    }
  },
  mounted(){
    let order=this.$route.params;
    this.id=order.id;
    this.user_info=order.user_info;
    this.info=order.info;
    this.other=order.other;
    this.state=order.state;

    this.pole1=order.pole1;
    this.pole2=order.pole2;
    this.circle=order.circle;
    this.belt=order.belt;
    this.ring=order.ring;
    this.already_pad=order.already_pad;
    this.final_amount=order.final_amount;
    this.discount=order.discount;
    this.finish_pad=order.discount;

    getCurtainName().then((res) => {
      for(let i=0;i<res.data.length;i++){
        this.curtains.push({value:res.data[i]});
      }
    });
    getCircleList2().then((res)=>{
      this.circles=res.data;
      this.rings=res.data;
      for(let i=0;i<this.circles.length;i++) this.circles[i].value=this.circles[i].name;
    });
    getPoleList2().then((res)=>{
      this.pole=res.data;
      for(let i=0;i<this.pole.length;i++) this.pole[i].value=this.pole[i].name;
    });
    getValanceList2().then((res)=>{
      this.valance=res.data;
      for(let i=0;i<this.valance.length;i++) this.valance[i].value=this.valance[i].name;
    });
    getYarnName().then((res)=>{
      for(let i=0;i<res.data.length;i++){
        this.yarn.push({value:res.data[i]});
      }
    });
    getAddressList({name:''}).then((res)=>{
      this.address=res.data;
      for(let i=0;i<this.address.length;i++) this.address[i].value=this.address[i].add;
    });
    getBeltList({name:''}).then((res)=>{
      this.belts=res.data;
      for(let i=0;i<this.belts.length;i++) this.belts[i].value=this.belts[i].name;
    });
    getLaceList().then((res)=>{
      this.lace=res.data;
      for(let i =0;i<this.lace.length;i++) this.lace[i].value=this.lace[i].name;
    });

  },
  watch:{
    info:{
      handler(newVal,oldVal){
        this.asyncUpdate();
      },
      deep:true
    },
    other:{
      handler(newVal,oldVal){
        this.asyncUpdate();
      },
      deep:true
    }
  }
}
</script>

<style>

.foot{
  font-weight: bold;
  font-size: 30px;
  color: red;
}
.button {
  background-color: #e64242;
  border: none;
  padding: 23px 50px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
}
</style>
