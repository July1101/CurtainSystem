import Mock from 'mockjs';
import {getID} from "./wall";



const yarn=[];
const belt=[];
const lace=[];

for(let i=0;i<10;i++){
    yarn.push(Mock.mock({
        id:getID(10),
        version_id:Mock.Random.cword(5),
        name: Mock.Random.cword(4),
        cost:Mock.Random.integer(10,25),
        price:Mock.Random.integer(20,100),
        state:true,
        total_amount:Mock.Random.integer(200,100000),
        total_order:Mock.Random.integer(2,1000),
        total_num:Mock.Random.integer(2,1000)
    }))
}

for(let i=0;i<10;i++){
    belt.push(Mock.mock({
        id:getID(10),
        name: Mock.Random.cword(4),
        version_id:Mock.Random.integer(4),
        cost:Mock.Random.integer(10,25),
        price:Mock.Random.integer(20,100),
        state:true,
        total_amount:Mock.Random.integer(200,100000),
        total_order:Mock.Random.integer(2,1000),
        total_num:Mock.Random.integer(2,1000)
    }))
}
for(let i=0;i<10;i++){
    lace.push(Mock.mock({
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


export {yarn,belt,lace};