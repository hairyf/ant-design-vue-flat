/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-07 10:18:13
 * @LastEditTime: 2021-04-12 21:16:20
 * @Description: 接口入口
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import http from './http.config';
/* api->index.ts 统一命名规范
 * 1. 接口暴露前缀统一为req -> request(请求)
 * 2. 需详细描述数据时, 在src/types/response.d.ts中声明
 * Template: export const req[name] = () => http.get("/api/list")
 */
/** 暴露请求配置 */
export const httpConfig = http.config;
export * from '@/api/order';
export * from '@/api/user';
export * from '@/api/commodity';
export * from '@/api/common';
export * from '@/api/legitimate';
