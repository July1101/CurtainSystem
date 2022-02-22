
let tmp_order_data={
    user_info:{},
    info:[],
    other:[]
};


function saveTmpOrder(date){
    tmp_order_data.user_info= date.user_info;
    tmp_order_data.info=date.params.info;
    tmp_order_data.other=date.params.other;
}

function getTmpOrder(){
    return tmp_order_data;
}



export {saveTmpOrder,getTmpOrder}