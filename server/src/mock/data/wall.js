import Mock from 'mockjs';

const wallCloth = [];
const pole=[];


for(let i=0 ; i<100;i++){
    wallCloth.push(Mock.mock({
        id: Mock.Random.integer(1,4000),
        version_id: Mock.Random.word(5),
        name: Mock.Random.cword(4),
        price:Mock.Random.integer(20,100),
        color:'默认',
        detail: Mock.Random.cword(10),
        total_amount:Mock.Random.integer(200,100000),
        total_order:Mock.Random.integer(2,1000),
        total_num:Mock.Random.integer(2,1000)
    }));
};

function getID(length) {
    return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
}

for(let i=0;i<10;i++){
    pole.push(Mock.mock({
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


export {wallCloth,pole,getID};