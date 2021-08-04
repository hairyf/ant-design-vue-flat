/*
 * @Author: Mr.Mao
 * @LastEditors: liupei
 * @Date: 2021-01-19 11:33:41
 * @LastEditTime: 2021-05-28 19:48:04
 * @Description:
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import { createFromStrategy } from 'form-strategy';
import * as rules from 'form-strategy/dist/rules';
// 设置错误处理

export const plotForm = createFromStrategy({
  phone: rules.phone,
  identityId: rules.identityId,
  chineseName: rules.chineseName,
  min: rules.min,
  max: rules.max,
  countMax: rules.countMax,
  countMin: rules.countMin,
  bankId: rules.bankId,
  price: rules.price,
});

plotForm.setErrorHandle((validate) => {
  uni.showToast({ title: validate.error, icon: 'none' });
});
