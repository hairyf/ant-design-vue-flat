import { transformTheme2CssVars } from '../theme'

/*
 * @Author: Mr.Mao
 * @Date: 2021-07-09 14:01:45
 * @LastEditTime: 2021-07-09 14:46:41
 * @Description:
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */

describe('transformTheme2CssVars', () => {
  it('单层转换', () => {
    const themeOption = {
      Layout: { siderColor: '#001426' }
    }
    expect(transformTheme2CssVars(themeOption)).toEqual({ LayoutSiderColor: '#001426' })
  })
  it('多层转换', () => {
    const themeOption = {
      Layout: { Sider: { color: '#001426' } }
    }
    expect(transformTheme2CssVars(themeOption)).toEqual({ LayoutSiderColor: '#001426' })
  })
})
