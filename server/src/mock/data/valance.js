import Mock from 'mockjs';
import {getID, pole} from "./wall";



const valance=[];


for(let i=0;i<10;i++){
    valance.push(Mock.mock({
        id:getID(10),
        name: Mock.Random.cword(4),
        cost:Mock.Random.integer(10,25),
        price:Mock.Random.integer(20,100),
        state:true,
        total_amount:Mock.Random.integer(200,100000),
        total_order:Mock.Random.integer(2,1000),
        total_num:Mock.Random.integer(2,1000)
    }))
}





export {valance};



