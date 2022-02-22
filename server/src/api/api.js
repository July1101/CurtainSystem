import axios from 'axios';
import qs from 'qs';
axios.defaults.withCredentials = true;

// let base ='http://localhost:8080/hehe';
let base ='';

let base1='http://127.0.0.1:5000';

export const requestLogin = params => { return axios.post(`${base1}/login`,  params ).then(res => res.data); };

export const addFahuo = params => {return axios.post(`${base1}/fahuo/add`, params, {headers: { 'Content-Type': 'application/json' }})};
export const getCurFac = params => { return axios.get(`${base1}/fahuo/fac`,  { params: params })};
export const getCurName = params => { return axios.get(`${base1}/fahuo/cur/name`,  { params: params })};
export const getCurCode = params => { return axios.get(`${base1}/fahuo/cur/code`,  { params: params })};
export const getCurCost = params => { return axios.get(`${base1}/fahuo/cur/cost`,  { params: params })};

export const getPartInput = params => { return axios.get(`${base1}/fac/part1`,  { params: params })};
export const getPartOutput = params => { return axios.get(`${base1}/fac/part2`,  { params: params })};
export const getYearData = params => { return axios.get(`${base1}/fac/year`,  { params: params })};
export const get10DaysData = params => { return axios.get(`${base1}/fac/every10days`,  { params: params })};

export const addInput = params => { return axios.get(`${base1}/input/add`,  { params: params })};
export const removeInput = params => { return axios.get(`${base1}/input/remove`,  { params: params })};
export const inputList = params => { return axios.get(`${base1}/input/list`,  { params: params })};

export const addOutput = params => { return axios.get(`${base1}/output/add`,  { params: params })};
export const removeOutput = params => { return axios.get(`${base1}/output/remove`,  { params: params })};
export const outputList = params => { return axios.get(`${base1}/output/list`,  { params: params })};

export const updateState = params => { return axios.get(`${base1}/bill/updateState`,  { params: params })};
export const facList = params => { return axios.get(`${base1}/fac/list`,  { params: params })};
//窗帘操作
export const getCurtainsList = params => { return axios.get(`${base}/user/list`, { params: params }); };
export const getCurtainsListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };
export const removeCurtains = params => { return axios.get(`${base}/user/remove`, { params: params }); };
export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };
export const editCurtains = params => { return axios.get(`${base}/user/edit`, { params: params }); };
export const addCurtains = params => { return axios.get(`localhost:5000/curtain/add`, { params: params }); };

export const queryCurtains =  params => {return axios.get(`${base}/curtains`)};

export const saveOrder =  params => {return axios.get(`${base}/saveOrder`,{ params: params })};
export const getOrder =  params => {return axios.get(`${base}/getOrder`,{ params: params })};

//墙布操作
export const addWall =  params => {return axios.get(`${base}/wall/add`,{ params: params })};
export const editWall = params => { return axios.get(`${base}/wall/edit`, { params: params }); };
export const removeWall = params => { return axios.get(`${base}/wall/remove`, { params: params }); };
export const getWallList = params => { return axios.get(`${base}/wall/list`, { params: params }); };
export const getWallListPage = params => { return axios.get(`${base}/wall/listpage`, { params: params }); };


//杆子
export const addPole =  params => {return axios.get(`${base}/pole/add`,{ params: params })};
export const editPole = params => { return axios.get(`${base}/pole/edit`, { params: params }); };
export const removePole = params => { return axios.get(`${base}/pole/remove`, { params: params }); };
export const getPoleList = params => { return axios.get(`${base}/pole/list`, { params: params }); };
export const getPoleList2 = params => { return axios.get(`${base1}/bill/pole`, { params: params }); };

//圈
export const addCircle =  params => {return axios.get(`${base}/circle/add`,{ params: params })};
export const editCircle = params => { return axios.get(`${base}/circle/edit`, { params: params }); };
export const removeCircle = params => { return axios.get(`${base}/circle/remove`, { params: params }); };
export const getCircleList = params => { return axios.get(`${base}/circle/list`, { params: params }); };
export const getCircleList2 = params => { return axios.get(`${base1}/bill/circle`, { params: params }); };

//帘头
export const addValance =  params => {return axios.get(`${base1}/valance/add`,{ params: params })};
export const editValance = params => { return axios.get(`${base1}/valance/edit`, { params: params }); };
export const removeValance = params => { return axios.get(`${base1}/valance/remove`, { params: params }); };
export const getValanceList = params => { return axios.get(`${base1}/valance/list`, { params: params }); };
export const getValanceList2 = params => { return axios.get(`${base1}/bill/valance`, { params: params }); };

//帘头
export const addYarn =  params => {return axios.get(`${base1}/yarn/add`,{ params: params })};
export const editYarn = params => { return axios.get(`${base1}/yarn/edit`, { params: params }); };
export const removeYarn = params => { return axios.get(`${base1}/yarn/remove`, { params: params }); };
export const getYarnList = params => { return axios.get(`${base1}/yarn/list`, { params: params }); };
export const getYarnList2 = params => { return axios.get(`${base1}/yarn/list2`, { params: params }); };

//地址
export const addAddress =  params => {return axios.get(`${base}/address/add`,{ params: params })};
export const editAddress = params => { return axios.get(`${base}/address/edit`, { params: params }); };
export const removeAddress = params => { return axios.get(`${base}/address/remove`, { params: params }); };
export const getAddressList = params => { return axios.get(`${base1}/bill/address`, { params: params }); };

//其他
export const addOther=  params => {return axios.get(`${base1}/other/add`,{ params: params })};
export const editOther = params => { return axios.get(`${base1}/other/edit`, { params: params }); };
export const removeOther = params => { return axios.get(`${base1}/other/remove`, { params: params }); };
export const getOtherList = params => { return axios.get(`${base1}/other/list2`, { params: params }); };
export const getOtherList2 = params => { return axios.get(`${base1}/other/list2`, { params: params }); };


//窗帘
export const addCurtain=  params => {return axios.get(`${base1}/curtain/add`,{ params: params })};
export const editCurtain = params => { return axios.get(`${base1}/curtain/edit`, { params: params }); };
export const removeCurtain = params => { return axios.get(`${base1}/curtain/remove`, { params: params }); };
export const getCurtainList = params => { return axios.get(`${base1}/curtain/list`, { params: params }); };

//订单
export const addOrder =  params => {return axios.get(`${base}/order/add`,{ params: params })};
export const editOrder = params => { return axios.get(`${base}/order/edit`, { params: params }); };
export const removeOrder = params => { return axios.get(`${base1}/bill/remove`, { params: params }); };
export const getOrderList = params => { return axios.get(`${base}/order/list`, { params: params }); };
export const getInstall = params => { return axios.get(`${base}/order/install` ); };
export const getUnInstall = params => { return axios.get(`${base}/order/uninstall`); };
export const getUncomplete = params => { return axios.get(`${base}/order/uncomplete`); };
export const getOrderList2 = params => { return axios.get(`${base}/order/list2`, { params: params }); };
export const submitOrder = params => { return axios.get(`${base}/order/submit`, { params: params ,paramsSerializer: function(params) {
    const keys= params.keys.map(_=>`keys=${_}`).join('&');
    return `${keys}` ;}}); };
export const getBeltList = params => { return axios.get(`${base1}/belt/list`, { params: params }); };
export const addBelt =  params => {return axios.get(`${base1}/belt/add`,{ params: params })};
export const editBelt = params => { return axios.get(`${base1}/belt/edit`, { params: params }); };
export const removeBelt = params => { return axios.get(`${base1}/belt/remove`, { params: params }); };


export const getInstallOrder = params => { return axios.get(`${base}/order/install_list`, { params: params});};


export const demo = params => { return axios.get(`${base}/demo`, { params: params }); };

export const printOrder = params => { return axios.get(`${base}/order/print`, { params: params }); };


export const getLaceList = params => { return axios.get(`${base1}/bill/lace`); };

export const getCurtainName= params => { return axios.get(`${base1}/bill/curtain/name`); };
export const getYarnName= params => { return axios.get(`${base1}/bill/yarn/name`); };
export const getYarnID= params => { return axios.get(`${base1}/bill/yarn/id`,{ params: params }); };
export const getYarnPrice= params => { return axios.get(`${base1}/bill/yarn/price`,{ params: params }); };

export const getCurtainID= params => { return axios.get(`${base1}/bill/curtain/id`,{ params: params }); };
export const getCurtainPrice= params => { return axios.get(`${base1}/bill/curtain/price`,{ params: params }); };

export const getRingList= params => { return axios.get(`${base}/ring/list`); };

// export const submitBill= params => {   return axios({
//     url: `${base1}/bill/submit`,
//     method: 'get',
//     params: params,
//     paramsSerializer: function (params) {
//       return qs.stringify(params, { arrayFormat: 'repeat', allowDots:true})
//     }
//   })
// };
export const submitBill= params => {return axios.post(`${base1}/bill/submit`, params, {headers: { 'Content-Type': 'application/json' }})};

export const getNowID = params => { return axios.get(`${base}/now/id`); };


export const billList = params => { return axios.get(`${base1}/bill/list`); };
export const editBill= params => { return axios.get(`${base}/bill/edit`,{ params: params }); };
export const getState0 = params => { return axios.get(`${base}/bill/state0`); };
export const getState1 = params => { return axios.get(`${base}/bill/state1`); };
export const getState2 = params => { return axios.get(`${base}/bill/state2`); };
export const getState3 = params => { return axios.get(`${base}/bill/state3`); };
export const getState4 = params => { return axios.get(`${base}/bill/state4`); };
export const getState5 = params => { return axios.get(`${base}/bill/state5`); };
export const removeBill = params => { return axios.get(`${base1}/bill/remove`,{ params: params }); };
export const printBill = params => { return axios.get(`${base}/bill/print`,{ params: params }); };



