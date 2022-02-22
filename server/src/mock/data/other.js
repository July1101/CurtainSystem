import Mock from 'mockjs';
import {getID} from "./wall";


var type=['被窝','枕头','墙布','被套','卷帘','被单','其他'];

const other=[];

for(let i=0;i<105;i++){
    other.push(Mock.mock({
        id:getID(10),
        type:type[i%7],
        name: Mock.Random.cword(3),
        cost:Mock.Random.integer(1,80),
        price:Mock.Random.integer(5,100),
        unit:'个',
        state:true,
        total_amount:Mock.Random.integer(200,100000),
        total_order:Mock.Random.integer(2,1000),
        total_num:Mock.Random.integer(2,1000)
    }))
}



export {other};