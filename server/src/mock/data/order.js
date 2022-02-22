import Mock from 'mockjs';
import {getID} from "../getID";
import mock from "../mock";





const order = [];

for(let i=0;i<100;i++){
    order.push(Mock.mock({
        id:getID(10),
        order_id:Mock.Random.word(5),
        create_time:Mock.Random.natural(1625068800000,1635068800000),
        need_install:false,

        install_date:Mock.Random.natural(1625068800000,1635068800000),

        total_amount:Mock.Random.natural(10,5000),//原价
        discount:Mock.Random.natural(10,500),//优惠
        final_amount:Mock.Random.natural(10,5000),//最后价格
        already_pad:Mock.Random.natural(10,5000),//已付金额

        is_finished:false,//是否完工
        has_install:false,//是否已安装

        state:false,//是否结算
        finished_time:'',

        user_info:{
            name:Mock.Random.cword(3),
            telephone:Mock.Random.integer(13100000000,13999999999),
            address:Mock.Random.cword(4),
            detail_address:Mock.Random.cword(6)
        },
        info:[],
        other:[]
    }));
}
for(let i=0;i<100;i++){
    order.push(Mock.mock({
        id:getID(10),
        order_id:Mock.Random.word(5),
        create_time:Mock.Random.natural(1625068800000,1635068800000),
        need_install:false,

        install_date:Mock.Random.natural(1625068800000,1635068800000),

        total_amount:Mock.Random.natural(10,5000),//原价
        discount:Mock.Random.natural(10,500),//优惠
        final_amount:Mock.Random.natural(10,5000),//最后价格
        already_pad:Mock.Random.natural(10,5000),//已付金额

        is_finished:true,//是否完工
        has_install:true,//是否已安装

        state:false,//是否结算
        finished_time:'',

        user_info:{
            name:Mock.Random.cword(3),
            telephone:Mock.Random.integer(13100000000,13999999999),
            address:Mock.Random.cword(4),
            detail_address:Mock.Random.cword(6)
        },
        info:[],
        other:[]
    }));
}



export {order};