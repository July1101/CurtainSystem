import Mock from 'mockjs';
import {getID} from "./wall";
import {valance} from "./valance";


const address=[];


for(let i=0;i<10;i++){
    address.push(Mock.mock({
        id:getID(10),
        name: Mock.Random.cword(4),
        total_amount:Mock.Random.integer(200,100000),
        total_order:Mock.Random.integer(2,1000),
        total_num:Mock.Random.integer(2,1000)
    }))
}


export {address};