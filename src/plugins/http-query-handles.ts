/*
 * @Author: Mr.Mao
 * @Date: 2021-04-16 21:07:30
 * @LastEditTime: 2021-04-30 15:47:41
 * @Description:
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import { httpConfig } from '@/api';
const params = new URLSearchParams(location.search);

const form = params.get('form');
const shopid = params.get('shopid');
const type = params.get('type');
const tem = params.get('tem');

if (form && httpConfig.header) httpConfig.header['form'] = form;
if (shopid && httpConfig.header) httpConfig.header['shopid'] = shopid;
if (type && httpConfig.header) httpConfig.header['type'] = type;
if (tem && httpConfig.header) httpConfig.header['tem'] = tem;
