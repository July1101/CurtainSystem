import Mock from 'mockjs';
import {getID} from "./wall";
const bill = [];


for(let i=0;i<200;i++){
    bill.push({
        id:getID(8),
        state:i%6,
        user_info:{
            name:Mock.Random.cword(3),
            telephone:Mock.Random.integer(13100000000,13999999999),
            address:Mock.Random.cword(4),
            detail_address:Mock.Random.cword(6)
        },
        info:[],
        other:[],
        circle:{},
        pole1:{},
        pole2:{},
        ring:{},
        belt:{},

        discount:Mock.Random.natural(10,500),//优惠
        final_amount:Mock.Random.natural(10,5000),//最后价格
        already_pad:Mock.Random.natural(10,5000),//已付金额

        time:{
            create_time:Mock.Random.natural(1625068800000,1635068800000),
            confirm_time:Mock.Random.natural(1625068800000,1635068800000),
            fahuo_time:Mock.Random.natural(1625068800000,1635068800000),
            handle_time:Mock.Random.natural(1625068800000,1635068800000),
            install_time:Mock.Random.natural(1625068800000,1635068800000),
            finish_time:Mock.Random.natural(1625068800000,1635068800000)
        }
    })
}



export {bill};