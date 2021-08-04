/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-07 10:18:13
 * @LastEditTime: 2021-05-11 17:57:51
 * @Description: 应用入口文件
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import './plugins/composition-api';

import store from './store';
import App from './App.vue';
import Vue from 'vue';

// #ifdef H5
import './plugins/http-query-handles';
// #endif

import './plugins/uview-ui';
import './plugins/vue-prototype';

Vue.prototype.$store = store;

Vue.config.productionTip = false;
new App().$mount();
