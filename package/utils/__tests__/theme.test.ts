import { transformTheme2CssVars } from '../theme'

/*
 * @Author: Mr.Mao
 * @Date: 2021-07-09 14:01:45
 * @LastEditTime: 2021-07-09 14:42:36
 * @Description:
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */

describe('transformTheme2CssVars', () => {
  it('单层正常转换', () => {
    const themeOption = {
      Layout: { siderColor: '#001426' }
    }
    expect(transformTheme2CssVars(themeOption)).toEqual({ LayoutSiderColor: '#0014263' })
  })
})
