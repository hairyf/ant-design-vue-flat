/*
 * @Author: Mr.Mao
 * @Date: 2021-05-06 10:35:25
 * @LastEditTime: 2021-05-12 14:41:06
 * @Description:
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
module.exports = {
  transpileDependencies: ['luch-request', 'uni-clipboard'],
  // 资源基本路径
  publicPath: './',
  // 配置 webpack-dev-server 行为。
  devServer: {
    open: true,
    proxy: null,
  },
};
