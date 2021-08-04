/*
 * @Author: Mr.Mao
 * @Date: 2021-01-07 10:38:27
 * @LastEditTime: 2021-04-29 19:16:49
 * @Description:
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import { Store, Module } from 'vuex';
import { State } from '../store';

export default <S, R = State>(options: Module<S, R>) => options as Store<S>;
