import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: '张某某'
  }
];

const Curtains = [];

for (let i = 0; i <200; i++) {
  Curtains.push(Mock.mock({
    id: Mock.Random.integer(1,500),
    version_id: Mock.Random.word(5),
    name: Mock.Random.ctitle(4),
    cost:Mock.Random.integer(50,300),
    price: Mock.Random.integer(50,300),
    factory: "默认",
    total_amount:Mock.Random.integer(200,100000),
    total_order:Mock.Random.integer(2,1000),
    total_num:Mock.Random.integer(2,1000)
  }));
}

export { LoginUsers, Curtains };
