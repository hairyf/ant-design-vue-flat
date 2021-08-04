/*
 * @Author: Mr.Mao
 * @Date: 2021-01-07 10:18:13
 * @LastEditTime: 2021-05-10 11:57:41
 * @Description:
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
/* 自定义全局类型存放 */
type WillObject = {
  [key: string | symbol | number]: any;
};
type Key = string | number;
type CssLightVariableKeys =
  | '--color-primary'
  | '--color-primary-light-1'
  | '--color-primary-light-2'
  | '--color-primary-light-3'
  | '--color-primary-light-4'
  | '--color-primary-light-5'
  | '--color-primary-light-6'
  | '--color-primary-light-7'
  | '--color-primary-light-8'
  | '--color-primary-light-9'
  | '--color-primary-light-10';
type CssLightOpacityKeys =
  | '--color-primary-light-opacity-1'
  | '--color-primary-light-opacity-2'
  | '--color-primary-light-opacity-3'
  | '--color-primary-light-opacity-4'
  | '--color-primary-light-opacity-5'
  | '--color-primary-light-opacity-6'
  | '--color-primary-light-opacity-7'
  | '--color-primary-light-opacity-8'
  | '--color-primary-light-opacity-9'
  | '--color-primary-light-opacity-10';
type CssLightVariableType = Record<CssLightVariableKeys, string>;
type CssLightOpacityType = Record<CssLightOpacityKeys, string>;
type LineRectStyle = {
  backgroundColor: string;
  color: string;
  borderColor: string;
};
