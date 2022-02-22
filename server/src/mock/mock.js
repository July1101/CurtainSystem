import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LoginUsers, Curtains } from './data/user';
import Mock from "mockjs";
import {wallCloth} from './data/wall';
import {pole} from "./data/wall";
import {circle,ring} from "./data/circle";
import {getID} from "./data/wall";
import {other} from "./data/other";
import {order} from "./data/order";
import {valance} from "./data/valance";
import {yarn,belt,lace} from "./data/yarn";
import {address} from "./data/address";
import {curtain_name} from "./data/test";
import {bill} from "./data/bill";


let _bill=bill;
let _ring=ring;
let _belt=belt;
let _address=address;
let _yarn = yarn;
let _valance=valance;
let _other=other;
let _order=order;
let _circle=circle;
let _lace=lace;
let wall = wallCloth;
let _pole=pole;
let _Curtains = Curtains;
let tmp_order_data={
  user_info:{},
  info:[],
  other:[]
};
let _curtain_name=curtain_name;

export default {
  /**
   * mock bootstrap
   */
  bootstrap() {
    let mock = new MockAdapter(axios);

    // mock success request
    mock.onGet('/success').reply(200, {
      msg: 'success'
    });

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    });

    //登录
    mock.onPost('/login').reply(config => {
      let {username, password} = JSON.parse(config.data);
      return new Promise((resolve, reject) => {
        let user = null;
        setTimeout(() => {
          let hasUser = LoginUsers.some(u => {
            if (u.username === username && u.password === password) {
              user = JSON.parse(JSON.stringify(u));
              user.password = undefined;
              return true;
            }
          });

          if (hasUser) {
            resolve([200, { code: 200, msg: '请求成功', user }]);
          } else {
            resolve([200, { code: 500, msg: '账号或密码错误' }]);
          }
        }, 10);
      });
    });

    //获取用户列表
    mock.onGet('/user/list').reply(config => {
      let {name} = config.params;
      //判断当前用户是否为已登录用户
      let mockCurtains = _Curtains.filter(curtains => {
        if (name && curtains.name.indexOf(name) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            curtains: mockCurtains
          }]);
        }, 10);
      });
    });
    mock.onGet('/curtains').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            curtains: _Curtains
          }]);
        }, 10);
      });
    });

    mock.onGet('/curtain/name').reply(config => {
      let res=[];
      for(let i=0;i<_Curtains.length;i++) res.push(_Curtains[i].name);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200,Array.from(new Set(res))]);
        }, 10);
      });
    });
    mock.onGet('/curtain/id').reply(config => {
      let {name} = config.params;
      let tmp=_Curtains.filter(u=>{
        if(u.name==name) return true;
        return false;
      })
      let res=[];
      for(let i=0;i<tmp.length;i++) res.push(tmp[i].version_id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200,res]);
        }, 10);
      });
    });


    //获取用户列表（分页）
    mock.onGet('/user/listpage').reply(config => {
      let {page, name} = config.params;
      let mockCurtains = _Curtains.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      let total = mockCurtains.length;
      mockCurtains = mockCurtains.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            curtains: mockCurtains
          }]);
        }, 10);
      });
    });

    //删除用户
    mock.onGet('/user/remove').reply(config => {
      let { id } = config.params;
      _Curtains = _Curtains.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 10);
      });
    });

    //批量删除用户
    mock.onGet('/user/batchremove').reply(config => {
      let { ids } = config.params;
      ids = ids.split(',');
      _Curtains = _Curtains.filter(u => !ids.includes(u.id));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 10);
      });
    });

    //编辑用户
    mock.onGet('/user/edit').reply(config => {
      let { id, version_id, name, price, color, detail } = config.params;
      _Curtains.some(u => {
        if (u.id === id) {
          u.name = name;
          u.version_id = version_id;
          u.price = price;
          u.detail = detail;
          u.color = color;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }]);
        }, 10);
      });
    });

    //新增用户
    mock.onGet('/user/add').reply(config => {
      let { version_id, name, price, color, detail } = config.params;
      _Curtains.push({
        id:Mock.Random.integer(1,500),
        version_id:version_id,
        name: name,
        price: price,
        color: color,
        detail: detail,
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }]);
        }, 10);
      });
    });

    mock.onGet('/wall/list').reply(config =>{
      let {name} = config.params;
      //判断当前用户是否为已登录用户
      let mockWall = wall.filter(curtains => {
        if (name && curtains.name.indexOf(name) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            wall: mockWall
          }]);
        }, 10);
      });
    });

    mock.onGet('/wall/remove').reply(config => {
      let { id } = config.params;
      wall = wall.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 10);
      });
    });

    mock.onGet('/wall/edit').reply(config => {
      let { id, version_id, name, price, color, detail } = config.params;
      wall.some(u => {
        if (u.id === id) {
          u.name = name;
          u.version_id = version_id;
          u.price = price;
          u.detail = detail;
          u.color = color;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }]);
        }, 10);
      });
    });

    mock.onGet('/wall/add').reply(config => {
      let { version_id, name, price, color, detail } = config.params;
      wall.push({
        id:Mock.Random.integer(1,4000),
        version_id:version_id,
        name: name,
        price: price,
        color: color,
        detail: detail,
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }]);
        }, 10);
      });
    });
    mock.onGet('/wall/listpage').reply(config => {
      let {page, name,version_id} = config.params;
      let mockWall = wall.filter(user => {
        if((version_id && user.version_id.indexOf(version_id) == -1)||(name && user.name.indexOf(name) == -1)) return false;
        return true;
      });
      let total_num = mockWall.length;
      mockWall = mockWall.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total_num,
            wall: mockWall
          }]);
        }, 10);
      });
    });

    mock.onGet('/saveOrder').reply(config => {
      tmp_order_data.user_info= config.params.user_info;
      tmp_order_data.info=config.params.info;
      tmp_order_data.other=config.params.other;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '保存成功'
          }]);
        }, 10);
      });
    });
    mock.onGet('/getOrder').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            user_info:tmp_order_data.user_info,
            info:tmp_order_data.info,
            other:tmp_order_data.other
          }]);
        }, 10);
      });
    });

    //杆子操作
    mock.onGet('/pole/list').reply(config =>{
      let {name} = config.params;

      let mockPole = _pole.filter(curtains => {
        if (name && curtains.name.indexOf(name) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            pole: mockPole
          }]);
        }, 10);
      });
    });
    mock.onGet('/pole/list2').reply(config =>{
      let mockPole = _pole.filter(u => {
        return u.state==true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            pole: mockPole
          }]);
        }, 10);
      });
    });

    mock.onGet('/pole/remove').reply(config => {
      let  {id}  = config.params;
      _pole = _pole.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 10);
      });
    });

    mock.onGet('/pole/edit').reply(config => {
      let { id,name,cost,price,state} = config.params;
      _pole.some(u => {
        if (u.id === id) {
          u.name=name;
          u.price=price;
          u.cost=cost;
          u.state=state;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }]);
        }, 10);
      });
    });

    mock.onGet('/pole/add').reply(config => {
      let { name, price,state,cost} = config.params;
      _pole.push({
        id:getID(10),
        name: name,
        price: price,
        state:state,
        cost:cost,
        total_amount:0,
        total_order:0,
        total_num:0
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }]);
        }, 10);
      });
    });



    //圈操作
    mock.onGet('/circle/list').reply(config =>{
      let {name} = config.params;

      let mockCircle = _circle.filter(curtains => {
        if (name && curtains.name.indexOf(name) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            circle: mockCircle
          }]);
        }, 10);
      });
    });
    mock.onGet('/circle/list2').reply(config =>{
      let mockCircle = _circle.filter(u => {
        return u.state==true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            circle: mockCircle
          }]);
        }, 10);
      });
    });

    mock.onGet('/ring/list').reply(config =>{
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, _ring]);
        }, 10);
      });
    });

    mock.onGet('/circle/remove').reply(config => {
      let  {id}  = config.params;
      _circle = _circle.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 10);
      });
    });

    mock.onGet('/circle/edit').reply(config => {
      let { id,name,cost,price,state} = config.params;
      _circle.some(u => {
        if (u.id === id) {
          u.name=name;
          u.cost=cost;
          u.price=price;
          u.state=state;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }]);
        }, 10);
      });
    });

    mock.onGet('/circle/add').reply(config => {
      let { name,cost, price,state} = config.params;
      _circle.push({
        id:getID(10),
        name: name,
        cost:cost,
        price: price,
        state:state,
        total_amount:0,
        total_order:0,
        total_num:0
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }]);
        }, 10);
      });
    });

    //其他操作
    mock.onGet('/other/list').reply(config =>{
      let {type} = config.params;
      let mockOther = _other.filter(u => {
        if (type && u.type.indexOf(type) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            other: mockOther
          }]);
        }, 10);
      });
    });
    mock.onGet('/other/list2').reply(config =>{
      let {type} = config.params;
      let mockOther = _other.filter(u => {
        if (type && u.type.indexOf(type) == -1) return false;
        return u.state==true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            other: mockOther
          }]);
        }, 10);
      });
    });

    mock.onGet('/other/remove').reply(config => {
      let  {id}  = config.params;
      _other = _other.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 10);
      });
    });

    mock.onGet('/other/edit').reply(config => {
      let { id,type,cost,name,price,unit,state} = config.params;
      _other.some(u => {
        if (u.id === id) {
          u.type=type;
          u.name=name;
          u.cost=cost;
          u.price=price;
          u.unit=unit;
          u.state=state;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }]);
        }, 10);
      });
    });

    mock.onGet('/other/add').reply(config => {
      let { type,cost, name,unit, price,state} = config.params;
      _other.push({
        id:getID(10),
        type:type,
        name: name,
        cost:cost,
        price: price,
        state:state,
        unit:unit,
        total_amount:0,
        total_order:0,
        total_num:0
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }]);
        }, 10);
      });
    });



    mock.onGet('/curtain/list').reply(config => {
      let {version_id,name} = config.params;

      let mockCurtains = _Curtains.filter(curtains => {
        if ((name && curtains.name.indexOf(name) == -1)||(version_id && curtains.version_id.indexOf(version_id) == -1)) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            curtains: mockCurtains
          }]);
        }, 10);
      });
    });


    //删除窗帘
    mock.onGet('/curtain/remove').reply(config => {
      let { id } = config.params;
      _Curtains = _Curtains.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 10);
      });
    });

    //编辑用户
    mock.onGet('/curtain/edit').reply(config => {
      let { id, version_id, name,cost, price, factory} = config.params;
      _Curtains.some(u => {
        if (u.id === id) {
          u.name = name;
          u.version_id = version_id;
          u.price = price;
          u.cost = cost;
          u.factory = factory;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }]);
        }, 10);
      });
    });

    //新增用户
    mock.onGet('/curtain/add').reply(config => {
      let { version_id,name,price,cost,factory} = config.params;
      _Curtains.push({
        id:Mock.Random.integer(1,500),
        version_id:version_id,
        name: name,
        price: price,
        cost: cost,
        factory: factory,
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }]);
        }, 10);
      });
    });
    mock.onGet('/order/list').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, _order]);
        }, 10);
      });
    });
    mock.onGet('/order/add').reply(config => {
      let { user_info,info,other,need_install,total_amount,discount,final_amount } = config.params;
      _order.unshift({
        id:getID(10),
        user_info:user_info,
        order_id:Mock.Random.word(5),
        create_time:new Date(),
        need_install:need_install,
        install_date:'',

        total_amount:total_amount,
        discount:discount,
        final_amount:final_amount,
        already_pad:0,
        is_finished:false,//是否完工
        has_install:false,//是否已安装

        info:info,
        other:other,

        state:false,//是否结算
        finished_time:'',
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }]);
        }, 10);
      });
    });
    mock.onGet('/order/uninstall').reply(config => {
      let p = order.filter(u => {
        if (u.has_install==true) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, p]);
        }, 10);
      });
    });
    mock.onGet('/order/edit').reply(config => {
      let { id,user_info,
          order_id,
          create_time,
          need_install,
          install_date,

          total_amount,
          discount,
          final_amount,
          already_pad,
          is_finished,//是否完工
          has_install,//是否已安装

          info,
          other,

          state,//是否结算
          finished_time } = config.params;
      _order.some(u=>{
        if(u.id==id){
          u.user_info=user_info;
          u.order_id=order_id;
          u.create_time=create_time;
          u.need_install=need_install;
          u.install_date=install_date;

          u.total_amount=total_amount;
          u.discount=discount;
          u.final_amount=final_amount;
          u.already_pad=already_pad;
          u.is_finished=is_finished;//是否完工
          u.has_install=has_install;//是否已安装

          u.info=info;
          u.other=other;

          u.state=state;//是否结算
          u.finished_time=finished_time;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }]);
        }, 10);
      });
    });

    //帘头
    mock.onGet('/valance/list').reply(config =>{
      let {name} = config.params;
      let mockValance = _valance.filter(valance => {
        if (name && valance.name.indexOf(name) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            valance: mockValance
          }]);
        }, 10);
      });
    });
    mock.onGet('/valance/list2').reply(config =>{
      let mockValance = _valance.filter(u => {
        return u.state==true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            valance: mockValance
          }]);
        }, 10);
      });
    });
    mock.onGet('/pole/lace').reply(config =>{
      let u = _lace.filter(u => {
        return u.state==true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, u]);
        }, 10);
      });
    });

    mock.onGet('/valance/remove').reply(config => {
      let  {id}  = config.params;
      _valance = _valance.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 10);
      });
    });

    mock.onGet('/valance/edit').reply(config => {
      let { id,name,cost,price,state} = config.params;
      _valance.some(u => {
        if (u.id === id) {
          u.name=name;
          u.cost=cost;
          u.price=price;
          u.state=state;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }]);
        }, 10);
      });
    });

    mock.onGet('/valance/add').reply(config => {
      let { name,cost, price,state} = config.params;
      _valance.push({
        id:getID(10),
        name: name,
        cost:cost,
        price: price,
        state:state,
        total_amount:0,
        total_order:0,
        total_num:0
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }]);
        }, 10);
      });
    });

    //纱
    mock.onGet('/yarn/list').reply(config =>{
      let {name} = config.params;
      let mockYarn = _yarn.filter(valance => {
        if (name && valance.name.indexOf(name) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            yarn: mockYarn
          }]);
        }, 10);
      });
    });
    mock.onGet('/yarn/list2').reply(config =>{
      let mockYarn = _yarn.filter(u => {
        return u.state==true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            yarn: mockYarn
          }]);
        }, 10);
      });
    });
    mock.onGet('/yarn/name').reply(config =>{
      let mockYarn = _yarn.filter(u => {
        return u.state==true;
      });
      let a=[];
      for(let i=0;i<mockYarn.length;i++){
        a.push(mockYarn[i].name);
      }
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, Array.from(new Set(a))]);
        }, 10);
      });
    });
    mock.onGet('/yarn/id').reply(config =>{
      let  {name}  = config.params;
      let mockYarn = _yarn.filter(u => {
        return u.name==name;
      });
      let b=[];
      for(let i=0;i<mockYarn.length;i++){
        b.push(mockYarn[i].version_id);
      }
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, b]);
        }, 10);
      });
    });
    mock.onGet('/yarn/price').reply(config =>{
      let  {name,version_id}  = config.params;
      let mockYarn = _yarn.filter(u => {
        return u.name==name&&u.version_id==version_id;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, mockYarn.length>0?mockYarn[0].price:0.0]);
        }, 10);
      });
    });
    mock.onGet('/curtain/price').reply(config =>{
      let  {name,version_id}  = config.params;
      let tmp = _Curtains.filter(u => {
        return u.name==name&&u.version_id==version_id;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, tmp.length>0?tmp[0].price:0.0]);
        }, 10);
      });
    });

    mock.onGet('/order/remove').reply(config => {
      let  {id}  = config.params;
      _order = _order.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 10);
      });
    });

    mock.onGet('/yarn/remove').reply(config => {
      let  {id}  = config.params;
      _yarn = _yarn.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 10);
      });
    });

    mock.onGet('/yarn/edit').reply(config => {
      let { id,version_id,name,cost,price,state} = config.params;
      _yarn.some(u => {
        if (u.id === id) {
          u.name=name;
          u.version_id=version_id;
          u.cost=cost;
          u.price=price;
          u.state=state;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }]);
        }, 10);
      });
    });

    mock.onGet('/yarn/add').reply(config => {
      let { name,version_id,cost, price,state} = config.params;
      _yarn.push({
        id:getID(10),
        name: name,
        cost:cost,
        version_id:version_id,
        price: price,
        state:state,
        total_amount:0,
        total_order:0,
        total_num:0
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }]);
        }, 10);
      });
    });

    //地址
    mock.onGet('/address/list').reply(config =>{
      let {name} = config.params;
      let u = _address.filter(valance => {
        if (name && valance.name.indexOf(name) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            address: u
          }]);
        }, 10);
      });
    });

    mock.onGet('/address/remove').reply(config => {
      let  {id}  = config.params;
      _address = _address.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 10);
      });
    });

    mock.onGet('/address/edit').reply(config => {
      let { id,name} = config.params;
      _address.some(u => {
        if (u.id === id) {
          u.name=name;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }]);
        }, 10);
      });
    });

    mock.onGet('/address/add').reply(config => {
      let { name} = config.params;
      _address.push({
        id:getID(10),
        name: name,
        total_amount:0,
        total_order:0,
        total_num:0
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }]);
        }, 10);
      });
    });
    mock.onGet('/belt/list').reply(config =>{
      let {name} = config.params;
      let u = _belt.filter(valance => {
        if (name && valance.name.indexOf(name)>=0) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200,u]);
        }, 10);
      });
    });
    mock.onGet('/belt/remove').reply(config => {
      let  {id}  = config.params;
      _belt = _belt.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 10);
      });
    });
    mock.onGet('/bill/list').reply(config => {
      let u=_bill;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, u]);
        }, 10);
      });
    });
    mock.onGet('/bill/state0').reply(config => {
      let u=_bill;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, u.filter((p)=>{
            if(p.state==0) return true;
            return false;
          })]);
        }, 10);
      });
    });
    mock.onGet('/bill/state1').reply(config => {
      let u=_bill;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, u.filter((p)=>{
            if(p.state==1) return true;
            return false;
          })]);
        }, 10);
      });
    });
    mock.onGet('/bill/state2').reply(config => {
      let u=_bill;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, u.filter((p)=>{
            if(p.state==2) return true;
            return false;
          })]);
        }, 10);
      });
    });
    mock.onGet('/bill/state3').reply(config => {
      let u=_bill;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, u.filter((p)=>{
            if(p.state==3) return true;
            return false;
          })]);
        }, 10);
      });
    });
    mock.onGet('/bill/state4').reply(config => {
      let u=_bill;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, u.filter((p)=>{
            if(p.state==4) return true;
            return false;
          })]);
        }, 10);
      });
    });
    mock.onGet('/bill/state5').reply(config => {
      let u=_bill;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, u.filter((p)=>{
            if(p.state==5) return true;
            return false;
          })]);
        }, 10);
      });
    });

    mock.onGet('/belt/edit').reply(config => {
      let { id,name,cost,price,state} = config.params;
      _belt.some(u => {
        if (u.id === id) {
          u.name=name;
          u.cost=cost;
          u.price=price;
          u.state=state;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }]);
        }, 10);
      });
    });

    mock.onGet('/now/id').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {id:3}]);
        }, 10);
      });
    });

    mock.onGet('/bill/edit').reply(config => {
      let {id,order}=config.params;
      for(let i=0;i<_bill.length;i++){
        if(_bill[i].id==id){
          _bill[i]=order;
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve([200, {
                code: 200,
                msg: '新增成功'
              }]);
            }, 10);
          });
        }
      }
    });

    mock.onGet('/belt/add').reply(config => {
      let { name,cost, price,state} = config.params;
      _belt.push({
        id:getID(10),
        name: name,
        cost:cost,
        price: price,
        state:state,
        total_amount:0,
        total_order:0,
        total_num:0
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }]);
        }, 10);
      });
    });
  }
};
