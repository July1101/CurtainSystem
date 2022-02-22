import Mock from 'mockjs';
import {getID} from "./wall";

const invoice=[];


for(let i=0;i<10;i++){
    invoice.push(Mock.mock({
        order_id:Mock.Random.word(4),
        info:[]
    }))
}




export {invoice};