---
sidebar: auto
title: '橘子互联前端代码规范文档(v0.8)'
---


## CSS/SCSS 规范

### Class命名
类命名采用小写，中划线（ - ）分开关键字命名，英文单词尽量不要缩写。
~~~css
/* 符合 */
.video-warp {}
/* 不符合 */
.video_warp {}
.videoWarp {}
.VIDEOWarp {}
~~~

### 全局样式（主体色）
所有主题色号不允许在单独组件使用，只允许使用src/style中存在的变量/集合。
其余如字体字号，全局尺寸，请酝酿使用。
~~~text
...
├── src
│ 	└── style
│		├── class.scss (全局class)
│		├── mixin.scss (全局集合方法)
│ 		└── variables.scss (全局样式变量)
....
~~~

### 避免事项
- 避免大量的嵌套规则。当可读性受到影响时，将之打断。推荐避免出现多于10行以上的嵌套规则出现

- 少用#，少用*，少用标签选择器，!important 尽量避免使用 。

### CSS 属性书写顺序

样式编写，建议遵循以下顺序。

1. 布局定位属性：`display / position / float / clear / visibility / overflow/...`
2. 自身属性：`width / height / margin / padding / border / background /...`
3. 文本属性：`color / font / text-decoration / text-align / vertical-align /...`
4. 其他属性（CSS3）：`content / cursor / border-radius / box-shadow / text-shadow / background:linear-gradient/...`

## JavaScript 规范

### 变量/函数命名

- 数据对应命名描述（命名统一）

  数据命名统一，其他数据描述由百度输入法提供的翻译为统一。

~~~js
// 列表类型命名(商品列表, 购物车列表, 表格列表等)
const goodList = [] // 对应子项 -> goodItem
const cartList = [] // 对应子项 -> cartItem
const tableList = [] // 对应子项 -> tableItem
// 详情类型命名(店铺详情, 商品详情, 订单详情等)
const shopDetail = {}
const goodDetail = {}
const orderDetail = {}
// 信息类型命名(用户信息, 页面信息, 财务信息等)
const userInfo = {}
const pageInfo = {}
const financeInfo = {}
// 描述类型命名(当前项, 当前索引, 当前类型等)
const currentItem = {}
const currentIndex = {}
const currentType = {}
// 配置类型命名(图像配置, 用户配置等)
const ghlOption = {}
const userOption = {}
// 元素类型命名(DOM节点, Ref节点)
const htmlEl = document.querySelector('html')
const bodyEl = ref<HTMLBodyElement>()
~~~

- 变量命名方法为小驼峰命名法，前缀应为名词（userInfo，shopList，naviList.....）

~~~js
// 错误
const user_info = {/*...*/}
const ShopList = {/*...*/}
const naViList = {/*...*/}
// 正确
const userInfo = {/*...*/}
const shopList = {/*...*/}
const naviList = {/*...*/}
~~~

- 函数命名方法为小驼峰命名法，前缀应为动词（getUserInfo，setShopList，initNaviList.....）

~~~js
// 错误
const GetUserInfo = () => {/*...*/}
const set_shopList = () => {/*...*/}
const initnavilist = () => {/*...*/}
// 正确
const getUserInfo =  () => {/*...*/}
const setShopList =  () => {/*...*/}
const initNaviList =  () => {/*...*/}
~~~

- 常量（不会再次进行修改）命名则采用大写加下划线命名（RECEIVE_USER_INFO）

~~~js
const RECEIVE_USER_INFO = 'receive_user_info'
~~~

### 变量引用
- 对所有引用都使用 const，不要使用 var
~~~js
// 错误
var a = 1
var b = 2

// 正确
const a = 1
const b = 2
~~~
- 如果引用是可变动的，则使用 let
~~~js
// 错误
var count = 1
if (count < 10) {
  count += 1
}

// 正确
let count = 1
if (count < 10) {
  count += 1
}
~~~

### 模块化开发
采用模块化进行开发，使用标准的 ES6 模块语法 import 和 export
~~~ts
// 错误
const util = require('./util')
module.exports = util

// 正确
export const paramsAnaly = (url: string) => {/*...*/}
//...
import { paramsAnaly } from "@/utils"
~~~

### Promise
使用async/await代替.then
~~~js
// 错误
const makeRequest = () => {
  return promise1()
    .then(value1 => {
      return promise2(value1)
        .then(value2 => {       
          return promise3(value1, value2)
        })
    })
}

// 正确
const makeRequest = async () => {
  const value1 = await promise1()
  const value2 = await promise2(value1)
  return promise3(value1, value2)
}
~~~

### if ... else
尽量减少代码嵌套
~~~js
// 错误
() => {
  if(isLogin) {
    if(isDelete) {
      // 代码....
    }
  }
}

// 正确
() => {
  if(!isLogin) {
    return;
  }
  if(!isDelete) {
    return;
  }
  // 代码...
}
~~~

## TypeScript 规范

### 类型定义
- 类型丢失率减少至百分之35%以下，减少使用any定义类型。
- 尽量使用 TypeScript 的类型推测，减少多余类型的定义，除非是复合类型。
~~~typescript
// 正确
const count = 123
const count:number|string = 123
methods: {
	onClick(){/*...*/},
	onMove(){/*...*/},
}
// 不正确
const count:number = 123
methods: {
	onClick():any{/*...*/},
	onMove():any{/*...*/},
}
~~~

### 第三方库
- 优先使用第三方库提供的类型，尽量不要覆盖第三方库类型。
~~~js
import dayjs from "dayjs"
// 正确
const date = dayjs()
// 不正确
const date:any = dayjs()
~~~

### 全局类型
全局数据类型，使用 declare 关键字定义在 src/types/custom.d.ts 中复用。
~~~typescript
// src/types/custom.d.ts
/** 全局接口: 用户数据 */
declare interface UserInfo {
	//....
}
~~~

### 请求参数
请求参数，类型定义是必须的
~~~typescript
// 错误
const getUserInfo = (data:any) => {
  return http.post('/login', data);
};
// 正确
const getUserInfo = (phone:number, code:number) => {
  return http.post('/login', { phone, code });
};

// 错误
const getUserInfo = (params:any) => {
  return http.get('/list', {params});
};
// 正确
// src/types/custom.d.ts
interface ListOpts {
  page: number;
  limit: number;
}
// api/index.ts
const getList = (params:ListOpts) => {
  return http.get('/list', {params});
};
~~~

### 响应参数
当响应参数过于混乱，可不进行定义类型
~~~typescript
// 正确
const getUserInfo = () => {
  return http.post<UserInfo>('/login');
};
// 正确
const getDetails = () => {
  return http.post('/details');
};
~~~