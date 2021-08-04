### 1rem、1em、1vh、1px各自代表的含义？

~~~js




~~~

### css水平、垂直居中的写法，请至少说出3~4种？

~~~js




~~~

### 说一下闭包？

~~~js




~~~

### 说一下自己常用的es6~es11的功能？

~~~js



~~~

### 说说你经常用的小程序/Uniapp的生命周期函数

~~~js




~~~

### 关于箭头函数，下面说法错误的有哪些？

A. 箭头函数没有自己的 `this`，而是会继承上层作用域的 `this`，就像其他普通的变量一样
B. 箭头函数还可以通过 `.call()`、`.apply()`、`.bind()` 方法来重新绑定它的 `this` 值
C. 箭头函数可以像普通函数一样使用 `arguments` 对象
D. 过度追求箭头函数的“单行代码”写法可能会降低代码可读性
E. 箭头函数虽然表面上看是匿名的，但它可以根据前面的变量名和属性名自动推断出同名的 `name` 属性
F. 箭头函数不可以被 `new`，也不会像普通函数一样自动拥有 `prototype` 属性

### 请说明以下代码的执行结果以及this的指向

~~~js
const obj = {
  x: 1,
  print1: () => {
    console.log(this.x);
  },
  print2() {
    console.log(this.x);
  },
  print3: function () {
    console.log(this.x);
  }.bind(this),
};
~~~



obj.print1()      // 执行结果：				，this指向：

obj.print2()      // 执行结果：				，this指向：

obj.print3()      // 执行结果：				，this指向：



### 假设以下两个异步请求接口 cgi_a、cgi_b 返回结果均为整数，请编写代码输出 result.data.a 和 result.data.b 相加的值

~~~js
const p1 = axios.get('cgi_a');
const p2 = axios.get('cgi_b');
/* 接口返回数据内容示例如下：
p1.then((result) => {
    // result.data.a 是一个整数
})
p2.then((result) => {
    // result.data.b 是一个整数
})
*/
~~~

~~~js












~~~

### Vue3.0 里为什么要用 Proxy API 替代 defineProperty API？

~~~js





~~~

### Vue Composition API 的基本使用

~~~js





~~~