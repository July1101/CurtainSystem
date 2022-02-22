import Mock from 'mockjs';


const curtain_name=[];


for(let i=0;i<30;i++){
    curtain_name.push(
        Mock.Random.cword(3)
    );
}

const bill={
    id:'',
    user_info:{
        name:'-',
        telephone:'',
        address:'',
        detail_address:''
    },
    info:[],
    other:[],
    already_pad:0,
    discount:0,
    final_amount:0,
    state:0,
    time:{}
}

export {curtain_name};
