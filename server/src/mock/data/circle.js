import Mock from 'mockjs';
import {getID} from "./wall";

const circle = [];
const ring=[];

for(let i=0;i<10;i++){
    circle.push(Mock.mock({
        id:getID(10),
        name: Mock.Random.cword(3),
        cost:Mock.Random.integer(1,5),
        price:Mock.Random.integer(1,10),
        state:true,
        total_amount:Mock.Random.integer(200,100000),
        total_order:Mock.Random.integer(2,1000),
        total_num:Mock.Random.integer(2,1000)
    }))
}
for(let i=0;i<10;i++){
    ring.push(Mock.mock({
        id:getID(10),
        name: Mock.Random.cword(3),
        cost:Mock.Random.integer(1,5),
        price:Mock.Random.integer(1,10),
        state:true,
        total_amount:Mock.Random.integer(200,100000),
        total_order:Mock.Random.integer(2,1000),
        total_num:Mock.Random.integer(2,1000)
    }))
}

export {circle,ring};