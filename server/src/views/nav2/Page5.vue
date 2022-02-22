<template>
  <section>
    <el-container direction="vertical">
      <el-main>
        <el-row>
        <el-form :model="user_info" label-width="80px" :rules="formRules" ref="user_info">
          <el-row>
            <el-col span="4">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="user_info.name" ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="4">
              <el-form-item label="电话号码" prop="telephone">
                <el-input v-model="user_info.telephone"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="4">
              <el-form-item label="区域" prop="address">
                <el-autocomplete v-model="user_info.address" :fetch-suggestions="querySearch8"></el-autocomplete>
              </el-form-item>
            </el-col>
            <el-col span="4">
              <el-form-item label="详细地址" prop="detail_address">
                <el-input v-model="user_info.detail_address"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="4">
              <el-form-item>
                <el-switch
                    v-model="need_install"
                    active-text="需要安装"
                    inactive-text="不安装">
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col span="4">
              <el-button-group>
                <el-button type="primary" v-on:click="add" style="width: 80px">添加窗帘</el-button>
                <el-button type="primary" v-on:click="addOther" style="width: 80px">添加其他</el-button>
                <el-button type="danger" v-on:click="clearOrder" style="width: 80px">清空订单</el-button>
              </el-button-group>
            </el-col>
          </el-row>
        </el-form>
        </el-row>
        <el-divider></el-divider>

        <el-form  label-position="right" label-width="80px">
          <el-card style="background-color: #EBEEF5" v-for="(item, index) in info" :key="index">
            <el-row>
              <el-col span="3">
                <el-form-item label="位置" :prop="'info.'+index+'.room'">
                  <el-autocomplete v-model="item.room" :fetch-suggestions="querySearch7"></el-autocomplete>
                </el-form-item>
              </el-col>
              <el-col span="3">
                <el-form-item label="尺寸":prop="'info.'+index+'.size'">
                  <el-input-number v-model="item.size" @change="change_size(index,item.size)" :precision="2"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col span="2" push="2">
                <el-form-item label="帘头" prop="'info.'+index+'.hash_valance'">
                  <el-switch
                      v-model="item.has_valance"
                      active-color="#13ce66"
                      inactive-color="#ff4949">
                  </el-switch>
                </el-form-item>
              </el-col>
              <el-col span="2" push="2">
                <el-form-item label="柔纱" prop="'info.'+index+'.hash_yarn'">
                  <el-switch
                      v-model="item.has_yarn"
                      active-color="#13ce66"
                      inactive-color="#ff4949">
                  </el-switch>
                </el-form-item>
              </el-col>
              <el-col span="2" push="2">
                <el-form-item label="花边" prop="'info.'+index+'.hash_lace'">
                  <el-switch
                      v-model="item.has_lace"
                      active-color="#13ce66"
                      inactive-color="#ff4949">
                  </el-switch>
                </el-form-item>
              </el-col>
              <el-col span="3" push="2">
                <el-form-item label="有无拼色" prop="'info.'+index+'.curtain.part'">
                  <el-select v-model="item.curtain.part">
                    <el-option :label="无拼色" :value=0>
                    </el-option>
                    <el-option :label="一拼色" :value=1>
                    </el-option>
                    <el-option :label="两拼色" :value=2>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col span="4" push="6">
                <el-form-item>
                  <el-button type="danger" icon="el-icon-delete" v-on:click="handleDel(index)">删除</el-button>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="3">
                <el-form-item label="窗帘名称" :prop="'info.'+index+'.curtain.name'">
                  <el-autocomplete v-model="item.curtain.name" :fetch-suggestions="querySearch" @select="auto_get_curtain_info(index,item.curtain.name)"></el-autocomplete>
                </el-form-item>
              </el-col>
              <el-col span="3">
                <el-form-item label="主布编号" :prop="'info.'+index+'.curtain.version_id'">
                  <el-autocomplete v-model="item.curtain.version_id" :fetch-suggestions="querySearch11"></el-autocomplete>
                </el-form-item>
              </el-col>
              <el-col span="3" v-if="item.curtain.part>0">
                <el-form-item label="配布1" :prop="'info.'+index+'.curtain.version_id2'">
                  <el-autocomplete v-model="item.curtain.version_id2" :fetch-suggestions="querySearch11"></el-autocomplete>
                </el-form-item>
              </el-col>
              <el-col span="3" v-if="item.curtain.part==2">
                <el-form-item label="配布2" :prop="'info.'+index+'.curtain.version_id3'">
                  <el-autocomplete v-model="item.curtain.version_id3" :fetch-suggestions="querySearch11"></el-autocomplete>
                </el-form-item>
              </el-col>
              <el-col span="3">
                <el-form-item label="窗帘长度" :prop="'info.'+index+'.curtain.length'">
                  <el-input v-model="item.curtain.length" @input="calculationCount(index)">
                    <template slot="append">米</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col span="3">
                <el-form-item label="窗帘单价" :prop="'info.'+index+'.curtain.price'">
                  <el-input v-model="item.curtain.price" @input="calculationCount(index)">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col span="5">
                <el-form-item label="窗帘总价" :prop="'info.'+index+'.curtain.total_money'">
                  <el-input v-model="item.curtain.total_money">
                    <template slot="prepend">￥</template>
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </el-col>u
            </el-row>
            <el-row>
              <el-col span="3">
                <el-form-item label="杆子名称" :prop="'info.'+index+'.pole.name'">
                  <el-autocomplete v-model="item.pole.name" :fetch-suggestions="querySearch3" @select="autoPickPole(index,item.pole.name)"></el-autocomplete>
                </el-form-item>
              </el-col>
              <el-col span="3">
                <el-form-item label="杆子单价" :prop="'info.'+index+'.pole.price'">
                  <el-input v-model="item.pole.price" @input="calculationCount(index)"></el-input>
                </el-form-item>
              </el-col>
              <el-col span="4">
                <el-form-item label="杆子长度" :prop="'info.'+index+'.pole.length'">
                  <el-input v-model="item.pole.length" @input="calculationCount(index)">
                    <template slot="append">米</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col span="5" offset="7">
                <el-form-item label="杆子总价" :prop="'info.'+index+'.pole.total_money'">
                  <el-input v-model="item.pole.total_money">
                    <template slot="prepend">￥</template>
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row>
              <el-col span="3">
                <el-form-item label="圈类型" :prop="'info.'+index+'.circle.name'">
                  <el-autocomplete v-model="item.circle.name" :fetch-suggestions="querySearch2" @select="autoPickCircle(index,item.circle.name)"></el-autocomplete>
                </el-form-item>
              </el-col>
              <el-col span="3">
                <el-form-item label="圈单价" :prop="'info.'+index+'.circle.price'">
                  <el-input v-model="item.circle.price" @input="calculationCount(index)"></el-input>
                </el-form-item>
              </el-col>
              <el-col span="4">
                <el-form-item label="圈个数" :prop="'info.'+index+'.circle.num'">
                  <el-input v-model="item.circle.num" @input="calculationCount(index)">
                    <template slot="append">个</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col span="5" offset="7">
                <el-form-item label="圈总价" :prop="'info.'+index+'.circle.total_money'">
                  <el-input v-model="item.circle.total_money">
                    <template slot="prepend">￥</template>
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="3">
                <el-form-item label="带类型" :prop="'info.'+index+'.belt.name'">
                  <el-autocomplete v-model="item.belt.name" :fetch-suggestions="querySearch9" @select="autoPickBelt(index,item.belt.name)"></el-autocomplete>
                </el-form-item>
              </el-col>
              <el-col span="3">
                <el-form-item label="带单价" :prop="'info.'+index+'.belt.price'">
                  <el-input v-model="item.belt.price" @input="calculationCount(index)"></el-input>
                </el-form-item>
              </el-col>
              <el-col span="4">
                <el-form-item label="带数量" :prop="'info.'+index+'.belt.num'">
                  <el-input v-model="item.belt.num" @input="calculationCount(index)">
                    <template slot="append">米</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col span="5" offset="7">
                <el-form-item label="带总价" :prop="'info.'+index+'.belt.total_money'">
                  <el-input v-model="item.belt.total_money">
                    <template slot="prepend">￥</template>
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>


            <el-row v-if="info[index].has_lace">
              <el-col span="3">
                <el-form-item label="花边类型" :prop="'info.'+index+'.lace.name'">
                  <el-autocomplete v-model="item.lace.name" :fetch-suggestions="querySearch10" @select="autoPickLace(index,item.lace.name)"></el-autocomplete>
                </el-form-item>
              </el-col>
              <el-col span="3">
                <el-form-item label="花边单价" :prop="'info.'+index+'.lace.price'">
                  <el-input v-model="item.lace.price" @input="calculationCount(index)"></el-input>
                </el-form-item>
              </el-col>
              <el-col span="4">
                <el-form-item label="花边长度" :prop="'info.'+index+'.lace.length'">
                  <el-input v-model="item.lace.length" @input="calculationCount(index)">
                    <template slot="append">米</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col span="5" offset="7">
                <el-form-item label="花边总价" :prop="'info.'+index+'.lace.total_money'">
                  <el-input v-model="item.lace.total_money">
                    <template slot="prepend">￥</template>
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row v-if="info[index].has_valance">
              <el-col span="3">
                <el-form-item label="帘头名称" :prop="'info.'+index+'.valance.name'">
                  <el-autocomplete v-model="item.valance.name" :fetch-suggestions="querySearch5" @select="autoPickValance(index,item.valance.name)"></el-autocomplete>
                </el-form-item>
              </el-col>
              <el-col span="3">
                <el-form-item label="帘头单价" :prop="'info.'+index+'.valance.price'">
                  <el-input v-model="item.valance.price" @input="calculationCount(index)"></el-input>
                </el-form-item>
              </el-col>
              <el-col span="4">
                <el-form-item label="帘头长度" :prop="'info.'+index+'.valance.length'">
                  <el-input v-model="item.valance.length" @input="calculationCount(index)">
                    <template slot="append">米</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col span="5" offset="7">
                <el-form-item label="帘头总价" :prop="'info.'+index+'.valance.total_money'">
                  <el-input v-model="item.valance.total_money" @input="calculationCount(index)">
                    <template slot="prepend">￥</template>
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="info[index].has_yarn">
              <el-col span="3">
                <el-form-item label="纱名称" :prop="'info.'+index+'.yarn.name'">
                  <el-autocomplete v-model="item.yarn.name" :fetch-suggestions="querySearch6" @select="autoPickYarn(index,item.yarn.name)"></el-autocomplete>
                </el-form-item>
              </el-col>
              <el-col span="3">
                <el-form-item label="纱单价" :prop="'info.'+index+'.yarn.price'">
                  <el-input v-model="item.yarn.price" @input="calculationCount(index)"></el-input>
                </el-form-item>
              </el-col>
              <el-col span="4">
                <el-form-item label="纱长度" :prop="'info.'+index+'.yarn.length'">
                  <el-input v-model="item.yarn.length" @input="calculationCount(index)">
                    <template slot="append">米</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col span="5" offset="7">
                <el-form-item label="纱总价" :prop="'info.'+index+'.yarn.total_money'">
                  <el-input v-model="item.yarn.total_money" @input="calculationCount(index)">
                    <template slot="prepend">￥</template>
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row v-if="info[index].has_yarn">
              <el-col span="3">
                <el-form-item label="纱杆名称" :prop="'info.'+index+'.pole2.name'">
                  <el-autocomplete v-model="item.pole2.name" :fetch-suggestions="querySearch3" @select="autoPickPole2(index,item.pole2.name)"></el-autocomplete>
                </el-form-item>
              </el-col>
              <el-col span="3">
                <el-form-item label="纱杆单价" :prop="'info.'+index+'.pole2.price'">
                  <el-input v-model="item.pole2.price" @input="calculationCount(index)"></el-input>
                </el-form-item>
              </el-col>
              <el-col span="4">
                <el-form-item label="纱杆长度" :prop="'info.'+index+'.pole2.length'">
                  <el-input v-model="item.pole2.length" @input="calculationCount(index)">
                    <template slot="append">米</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col span="5" offset="7">
                <el-form-item label="纱杆总价" :prop="'info.'+index+'.pole2.total_money'">
                  <el-input v-model="item.pole2.total_money">
                    <template slot="prepend">￥</template>
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
                <el-form-item label="型号" :prop="'other.'+index+'.type'">
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
                <el-form-item label="名称" :prop="'other.'+index+'.name'">
                  <el-autocomplete v-model="item.name" :fetch-suggestions="querySearch4" @select="autoPickOther(index,item.name)"></el-autocomplete>
                </el-form-item>
              </el-col>
              <el-col span="3">
                <el-form-item label="单价" :prop="'other.'+index+'.price'">
                  <el-input v-model="item.price" @input="calculationOther(index)">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col span="3">
                <el-form-item label="单位" :prop="'other.'+index+'.price'">
                  <el-input v-model="item.unit">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col span="3">
                <el-form-item label="数量" :prop="'other.'+index+'.num'">
                  <el-input-number v-model="item.num" @input="calculationOther(index)"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col span="5" offset="2">
                <el-form-item label="单项总价" :prop="'other.'+index+'.total_money'">
                  <el-input v-model="item.total_money">
                    <template slot="prepend">￥</template>
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col span="2">
                <el-form-item>
                  <el-button type="danger" icon="el-icon-delete" v-on:click="handleDelOther(index)"></el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>

      </el-main>
      <el-footer height="60px" style="position:absolute;bottom:0;width: 100%;overflow:hidden;z-index:2">
        <el-row style="height: 100%;background-color: #ffe2d9 ">
          <div v-if="discount!=''" style="position: absolute;left:100px;width: 200px;height: 100%;top: 10px;">
            原价格为
            <span class="total_amount">￥{{total_amount}}</span>
          </div>
          <div style="position: absolute;left:400px;height: 100%;">
            <span v-if="discount!=''">优惠金额</span>
            <span v-if="discount!=''" class="total_amount">￥</span>
            <input class="total_amount" v-model="discount" style="height: 100%; width: 150px; background-color: #ffe2d9;border:none;" ></input>
          </div>
          <div style="position: absolute;left:700px;width: 700px;height: 100%;top: 10px;">
            最终金额为
            <span v-if="discount!=''" class="total_amount">￥{{total_amount}} - ￥{{discount}} = ￥{{final_amount}}</span>
            <span v-else class="total_amount">￥{{total_amount}}</span>
          </div>
          <div style="position: absolute;left:1400px;width: 300px;height: 60px;">
            <button class="button" v-on:click="handleAddOrder" >提交订单</button>
          </div>
        </el-row>
      </el-footer>
    </el-container>

  </section>


</template>

<script>
import util from '../../common/js/util'
import {
  getCurtainList,
  getOrder,
  getCircleList2,
  getPoleList2,
  getValanceList2,
  getYarnList2,
  getOtherList2,
  addOrder, getAddressList,getBeltList,getLaceList
} from "../../api/api";

import {saveTmpOrder,getTmpOrder} from "../../mock/tmp_order";

import axios from "axios";
import {getID,get_order_id} from "../../mock/getID";
export default {
  data(){
    return {
      total_amount:0,//原价
      discount:'',//优惠
      final_amount:0,//最后价格
      need_install:false,


      id_search:[],
      lace:[],
      curtains:[],
      circle:[],
      pole:[],
      valance:[],
      yarn:[],
      belt:[],
      location_suggestion:[
        {"value":"客厅"},
        {"value":"主卧"},
        {"value":"次卧"},
        {"value":"书房"},
        {"value":"厨房"},
        {"value":"餐厅"},
        {"value":"二楼主卧"},
        {"value":"二楼次卧"},
        {"value":"厕所"}
      ],

      user_info:{
        name:'',
        telephone:'',
        address:'',
        detail_address:''
      },
      room_template:{
        room:'',
        size:'',
        curtain:{
          version_id:'',
          name:'',
          price:'',
          length:1,
          part:0,
          version_id2:'',
          version_id3:'',
          total_money:0
        },
        pole:{
          name:'',
          price:'',
          length:1,
          total_money:0
        },
        circle:{
          name:'',
          price:'',
          num:1,
          total_money:0
        },
        has_valance:false,
        valance:{
          name:'',
          price:'',
          length:'',
          total_money:0
        },
        has_yarn:false,
        yarn:{
          name:'',
          price:'',
          length:'',
          total_money:0
        },
        pole2:{
          name:'',
          price:'',
          length:1,
          total_money:''
        },
        belt:{
          name:'',
          price:'',
          num:'',
          total_money:''
        },
        lace:{
          name:'',
          price:'',
          length:1,
          total_money:0
        },
        has_lace:false
      },
      info:[],
      other:[],
      other_template:{
        type:'',
        name:'',
        price:'',
        unit:'',
        num:'',
        total_money:0
      },
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
      other_select:[]
    }
  },
  methods:{
    handleAddOrder(){
      let id=getID(10);
      let order={
        id:id,
        order_id:get_order_id(),
        user_info:this.user_info,
        info:this.info,
        other:this.other,
        need_install:this.need_install,
        total_amount:this.total_amount,
        discount:this.discount,
        final_amount :this.final_amount,
        create_time:new Date().getTime(),
        already_pad:0,
        is_finished:false,
        install_date:new Date().getTime(),
        has_install:false,
        state:false,
        finished_time:1775068800000
      };
      if(this.discount>=this.total_amount){
        alert("优惠金额大于总金额，请重新输入");
        return ;
      }
      if(this.final_amount<=0){
        alert("订单金额为0，重新输入!");
        return ;
      }
      for(let i=0;i<this.info.length;i++){
        let flag=true;
        if(this.info[i].room=='') flag=false;
        if(this.info[i].curtain.total_money<=0) flag=false;
        if(this.info[i].pole.total_money<=0) flag=false;
        if(this.info[i].circle.total_money<=0) flag=false;
        if(flag==false){
          alert("窗帘信息有误");
          return ;
        }
      }
      for(let i=0;i<this.other.length;i++){
        if(this.other[i].type==''||this.other[i].name==''||this.other[i].price==''||this.other[i].num==0||this.other[i].total_money==0){
          alert("其他信息有误");
          return ;
        }
      }
      this.$refs.user_info.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            addOrder({id,order});
            this.$router.push({path: '/page4'});
          });
        }else alert("请正确输入客户信息");
      });
    },
    //房间建议
    querySearch7(queryString, cb){
      let u=this.location_suggestion;
      let results = queryString ? u.filter(this.createFilter7(queryString)):u;
      cb(results);
    },
    createFilter7(queryString) {
      return (u) => {
        return (u.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    //用户地址建议
    querySearch8(queryString, cb){
      let u=this.address;
      let results = queryString ? u.filter(this.createFilter8(queryString)):u;
      cb(results);
    },
    createFilter8(queryString) {
      return (u) => {
        return (u.name.toLowerCase().indexOf(queryString.toLowerCase()) != -1);
      };
    },
    querySearch9(queryString, cb){
      let u=this.belt;
      let results = queryString ? u.filter(this.createFilter9(queryString)):u;
      cb(results);
    },
    createFilter9(queryString) {
      return (u) => {
        return (u.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    //自动搜索窗帘型号
    querySearch(queryString, cb){
      let curtains=this.curtains;
      let res = queryString ? curtains.filter(this.createFilter(queryString)):curtains;
      let k=1;
      for(let i=1;i<res.length;i++) {
        if (res[i].name != res[i - 1].name) res[k++] = res[i];
      }
      cb(res);
    },
    createFilter(queryString) {
      return (_curtains) => {
        return (_curtains.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    querySearch11(queryString, cb){
      let curtains=this.id_search;
      let results = queryString ? curtains.filter(this.createFilter(queryString)):curtains;
      cb(results);
    },



    //自动搜索圈名称
    querySearch2(queryString, cb){
      let circle=this.circle;
      let results = queryString ? circle.filter(this.createFilter2(queryString)):circle;
      cb(results);
    },
    createFilter2(queryString) {
      return (_circle) => {
        return (_circle.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    querySearch3(queryString, cb){
      let pole=this.pole;
      let results = queryString ? pole.filter(this.createFilter3(queryString)):pole;
      cb(results);
    },
    createFilter3(queryString) {
      return (_pole) => {
        return (_pole.name.toLowerCase().indexOf(queryString.toLowerCase()) >-1 );
      };
    },
    querySearch4(queryString, cb){
      let other=this.other_select;
      let results = queryString ? other.filter(this.createFilter4(queryString)):other;
      cb(results);
    },
    createFilter4(queryString) {
      return (_other) => {
        return (_other.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    querySearch5(queryString, cb){
      let valance=this.valance;
      let results = queryString ? valance.filter(this.createFilter5(queryString)):valance;
      cb(results);
    },
    createFilter5(queryString) {
      return (_valance) => {
        return (_valance.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    querySearch10(queryString, cb){
      let lace=this.lace;
      let results = queryString ? lace.filter(this.createFilter10(queryString)):lace;
      cb(results);
    },
    createFilter10(queryString) {
      return (u) => {
        return (u.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    querySearch6(queryString, cb){
      let yarn=this.yarn;
      let results = queryString ? yarn.filter(this.createFilter6(queryString)):yarn;
      cb(results);
    },
    createFilter6(queryString) {
      return (_yarn) => {
        return (_yarn.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    auto_get_curtain_info(index,name){
      let curtains=this.curtains;
      let res = curtains.filter(function (x) {
        return x.name===name;
      })
      this.info[index].curtain.price=res[0].price;
      this.id_search.length=0;
      for(let i=0;i<res.length;i++){
        this.id_search.push({"value":res[i].version_id});
      }
      this.calculationCount(index);
    },
    add:function () {
      let tmp=Object.assign({},this.room_template);
      tmp.curtain=Object.assign({},this.room_template.curtain);
      tmp.circle=Object.assign({},this.room_template.circle);
      tmp.belt=Object.assign({},this.room_template.belt);
      tmp.pole=Object.assign({},this.room_template.pole);
      tmp.yarn=Object.assign({},this.room_template.yarn);
      tmp.valance=Object.assign({},this.room_template.valance);
      tmp.lace=Object.assign({},this.room_template.lace);
      this.info.push(tmp);
    },
    handleDel(index){
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() =>{
        this.info.splice(index, 1);
      });
    },
    handleDelOther(index){
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() =>{
        this.other.splice(index, 1);
      });
    },
    change_size(index,size){
      this.info[index].curtain.length=Math.round(size*200)/100;;
      this.info[index].belt.num=Math.round(size*200)/100;;
      this.info[index].pole.length=Math.round(size*100)/100;
      this.info[index].circle.num= Math.round(size*12);

      this.info[index].valance.length=Math.round(size*100)/100;
      this.info[index].yarn.length=Math.round(size*200)/100;
      this.info[index].pole2.length=Math.round(size*100)/100;
      this.calculationCount(index);
    },
    autoPickCircle(index,name){
      let circle=this.circle;
      circle = circle.filter(function (x) {
        return x.name===name;
      });
      this.info[index].circle.price=circle[0].price;
      this.calculationCount(index);
    },
    autoPickLace(index,name){
      let lace=this.lace;
      lace = lace.filter(function (x) {
        return x.name===name;
      });
      this.info[index].lace.price=lace[0].price;
      this.calculationCount(index);
    },
    autoPickOther(index,name){
      let other=this.other_select;
      other = other.filter(function (x) {
        return x.name===name;
      });
      this.other[index].price=other[0].price;
      this.other[index].unit=other[0].unit;
      this.calculationOther(index);
    },
    autoPickValance(index,name){
      let valance=this.valance;
      valance = valance.filter(function (x) {
        return x.name===name;
      });
      this.info[index].valance.price=valance[0].price;
      this.calculationCount(index);
    },
    autoPickBelt(index,name){
      let belt=this.belt;
      belt = belt.filter(function (x) {
        return x.name===name;
      });
      this.info[index].belt.price=belt[0].price;
      this.calculationCount(index);
    },
    autoPickYarn(index,name){
      let yarn=this.yarn;
      yarn = yarn.filter(function (x) {
        return x.name===name;
      });
      this.info[index].yarn.price=yarn[0].price;
      this.calculationCount(index);
    },
    autoPickPole(index,name){
      let pole=this.pole;
      pole = pole.filter(function (x) {
        return x.name===name;
      });
      this.info[index].pole.price=pole[0].price;
      this.calculationCount(index);
    },
    autoPickPole2(index,name){
      let pole=this.pole;
      pole = pole.filter(function (x) {
        return x.name===name;
      });
      this.info[index].pole2.price=pole[0].price;
      this.calculationCount(index);
    },
    addOther(){
      let tmp=Object.assign({},this.other_template);;
      this.other.push(tmp);
    },
    savaOrder(){
      let para = {
        user_info:this.user_info,
        info:this.info,
        other:this.other
      };
      saveTmpOrder(para);
    },
    getOther(type){
      let para={type:type};
      getOtherList2(para).then((res)=>{
        this.other_select=res.data.other;
        for(let i=0;i<this.other_select.length;i++) this.other_select[i].value=this.other_select[i].name;
      });
    },
    calculationCount(index){
      this.info[index].curtain.total_money=(this.info[index].curtain.price*this.info[index].curtain.length).toFixed(2);
      this.info[index].pole.total_money=(this.info[index].pole.length*this.info[index].pole.price).toFixed(2);
      this.info[index].circle.total_money=(this.info[index].circle.price*this.info[index].circle.num).toFixed(2);
      this.info[index].valance.total_money=(this.info[index].valance.price*this.info[index].valance.length).toFixed(2);
      this.info[index].belt.total_money=(this.info[index].belt.num*this.info[index].belt.price).toFixed(2);
      this.info[index].yarn.total_money=(this.info[index].yarn.price*this.info[index].yarn.length).toFixed(2);
      this.info[index].pole2.total_money=(this.info[index].pole2.price*this.info[index].pole2.length).toFixed(2);
      this.info[index].lace.total_money=(this.info[index].lace.price*this.info[index].lace.length).toFixed(2);
    },
    calculationOther(index){
      this.other[index].total_money=(this.other[index].num*this.other[index].price).toFixed(2);
    },
    calculationTotal(){
      let sum=0.0;
      for(let i=0;i<this.info.length;i++){
        if(this.info[i].curtain.total_money!='')sum+=parseFloat(this.info[i].curtain.total_money);
        if(this.info[i].circle.total_money!='') sum+=parseFloat(this.info[i].circle.total_money);
        if(this.info[i].pole.total_money!='') sum+=parseFloat(this.info[i].pole.total_money);
        if(this.info[i].belt.total_money!='') sum+=parseFloat(this.info[i].belt.total_money);
        if(this.info[i].has_valance==true&&this.info[i].valance.total_money!='') sum+=parseFloat(this.info[i].valance.total_money);
        if(this.info[i].has_yarn==true&&this.info[i].yarn.total_money!=''){
          sum+=parseFloat(this.info[i].yarn.total_money);
          sum+=parseFloat(this.info[i].pole2.total_money)
        }
        if(this.info[i].has_lace==true&&this.info[i].lace.total_money!='') sum+=parseFloat(this.info[i].lace.total_money);
      }
      for(let i=0;i<this.other.length;i++){
        sum+=parseFloat(this.other[i].total_money);
      }
      this.total_amount=sum;
    },
    getFinalAmount(){
      if(this.total_amount=='') this.final_amount=this.discount;
      else this.final_amount=(this.total_amount-this.discount).toFixed(2);
    },
    clearOrder(){
      this.$confirm('确认清空吗?', '提示', {
        type: 'warning'
      }).then(() =>{
        this.user_info.username='';
        this.user_info.telephone='';
        this.user_info.address='';
        this.user_info.detail_address='';
        let len1=this.info.length;
        let len2=this.other.length;
        for(let i=0;i<len1;i++) this.info.pop();
        for(let i=0;i<len2;i++) this.other.pop();
      });
    }
  },
  mounted(){
    let para={name:''};
    let tmp=getTmpOrder();
    this.user_info=tmp.user_info;
    this.info=tmp.info;
    this.other=tmp.other;
    getCurtainList({name:'',version_id:''}).then((res) => {
      this.curtains= res.data.curtains;
      this.curtains.sort(function (a,b){
        return a.name<b.name;
      });
      for(let i=0;i<this.curtains.length;i++) this.curtains[i].value=this.curtains[i].name;
    });
    getCircleList2().then((res)=>{
      this.circle=res.data.circle;
      for(let i=0;i<this.circle.length;i++) this.circle[i].value=this.circle[i].name;
    });
    getPoleList2().then((res)=>{
      this.pole=res.data.pole;
      for(let i=0;i<this.pole.length;i++) this.pole[i].value=this.pole[i].name;
    });
    getValanceList2().then((res)=>{
      this.valance=res.data.valance;
      for(let i=0;i<this.valance.length;i++) this.valance[i].value=this.valance[i].name;
    });
    getYarnList2().then((res)=>{
      this.yarn=res.data.yarn;
      for(let i=0;i<this.yarn.length;i++) this.yarn[i].value=this.yarn[i].name;
    });
    getAddressList(para).then((res)=>{
      this.address=res.data.address;
      for(let i=0;i<this.address.length;i++) this.address[i].value=this.address[i].name;
    });
    getBeltList({name:''}).then((res)=>{
      this.belt=res.data.belt;
      for(let i=0;i<this.belt.length;i++) this.belt[i].value=this.belt[i].name;
    });
    getLaceList().then((res)=>{
      this.lace=res.data;
      for(let i =0;i<this.lace.length;i++) this.belt[i].value=this.lace[i].name;
    })
  },
  watch:{
    user_info:{
      handler:function (newVal,oldVal) {
        // console.log(newVal,'asdada',oldVal)
        this.calculationTotal();
        this.getFinalAmount();
        setTimeout(()=> {
          this.savaOrder();
        },2500)
      },
      deep:true
    },
    info:{
      handler:function (newVal,oldVal) {
        this.calculationTotal();
        this.getFinalAmount();
        // console.log(newVal,'asdada',oldVal)
        setTimeout(()=> {
          this.savaOrder();
        },3000)
      },
      deep:true
    },
    other:{
      handler:function (newVal,oldVal) {
        // console.log(newVal,'asdada',oldVal)
        this.calculationTotal();
        this.getFinalAmount();
        setTimeout(()=> {
          this.savaOrder();
        },3500)
      },
      deep:true
    },
    discount:function (){
      this.getFinalAmount();
    }
  }
}
</script>

<style>

.button {
  background-color: #e64242;
  border: none;
  color: white;
  padding: 23px 50px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}

h1{
  font-size: 19px;
}

.total_amount{
  font-weight: bold;
  font-size: 30px;
  color: red;
}


</style>