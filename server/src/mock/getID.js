import Mock from 'mockjs';
function getID(length) {
    return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
}


function timestampToTime(timestamp) {
    let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = (date.getDate()<10?'0'+date.getDate():date.getDate())+' ';

    let h = (date.getHours()<10?'0'+date.getHours():date.getHours()) + ':';
    let m = (date.getMinutes()<10?'0'+date.getHours():date.getMinutes()) + ':';
    let s = date.getSeconds();
    return Y+M+D+h+m+s;
}

function timestampToDate(timestamp){
    let date = new Date(timestamp);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = (date.getDate()<10?'0'+date.getDate():date.getDate())+' ';
    return Y+M+D;
}


function timestampToDateNum(timestamp){
    let date = new Date(timestamp);
    return date.getFullYear()*10000+date.getMonth()*100+date.getDate();
}


function get_order_id(){
    let date =new Date();
    let Y=(date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
    let D = (date.getDate()<10?'0'+date.getDate():date.getDate());
    return Y+D+Mock.Random.natural(10,99)
}

export {getID,timestampToTime,timestampToDate,timestampToDateNum,get_order_id};