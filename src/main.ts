/*
 * @Author: Mr.Mao
 * @LastEditors: liupei
 * @Date: 2021-01-11 18:42:22
 * @LastEditTime: 2021-05-29 13:55:49
 * @Description:
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import Vue from 'vue';
import App from './App.vue';
import store from './store';

import './plugins/umtrack';
import './plugins/uview-ui';
import './plugins/vue-prototype';

Vue.prototype.$store = store;
Vue.prototype.$uni = uni;
Vue.config.productionTip = false;
new App().$mount();
