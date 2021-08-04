import { createFromStrategy } from 'form-strategy';
import { phone, min, max } from 'form-strategy/dist/rules';
/*
 * @Author: Mr.Mao
 * @Date: 2021-05-14 12:18:31
 * @LastEditTime: 2021-05-14 12:24:28
 * @Description:
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
const fromValidate = createFromStrategy({
  userName: {
    validate: (value: string) => {
      return /^[a-zA-Z][a-zA-Z0-9]{5,18}$/.test(value);
    },
    message: '{__field__}字母开头的6~18位，且包含数字和字母',
    name: '账号',
  },
  password: {
    validate: (value: string) => {
      return /^[a-zA-Z][a-zA-Z0-9]{5,17}$/.test(value);
    },
    message: '{__field__}6~18位，包含数字和字母',
    name: '密码',
  },
  phone,
  min,
  max,
});
fromValidate.setErrorHandle((error) => uni.$u.toast(error.error));

export { fromValidate };
