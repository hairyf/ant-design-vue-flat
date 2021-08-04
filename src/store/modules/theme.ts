import { sliceBaseUrl } from '@/utils'
import { createModule } from '@/utils/vue-utils'

/*
 * @Author: Mr.Mao
 * @Date: 2021-05-18 15:45:01
 * @LastEditTime: 2021-07-09 10:58:51
 * @Description: 主题数据管理
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import { RECEVE_THEME_OPTION } from '@/store/types'
import { assign, cloneDeep } from 'lodash'
import settingSunImgIrl from '@/assets/img/background/setting-sun.png'
import cherryBlossomsImgIrl from '@/assets/img/background/cherry-blossoms.png'
/** 默认配置 */
export const defaultThemeOption = {
  // 类型
  type: 'system',
  // 主题文字
  text: '',
  // 主体色
  color: '',
  // 实心(文字)颜色
  solidColor: '#ffffff',
  // 空心(文字)颜色
  hollowColor: '',
  // 主背景
  mainBackground: '#F2F6FA',
  // 背景色
  background: '#ffffff',
  // 模糊度
  blur: '0',
  // 自定义过度颜色(展示用)
  linearGradientColor: '',
  // 侧边栏颜色
  sideBarColor: ''
}

export default createModule({
  state: {
    /** 当前主题配置 */
    option: assign(cloneDeep(defaultThemeOption), {
      text: '科技蓝',
      color: '#E89026'
    }),
    /** 系统主题 */
    systems: [
      {
        content: assign(cloneDeep(defaultThemeOption), {
          text: '高贵紫',
          color: '#40189D'
        })
      },
      {
        content: assign(cloneDeep(defaultThemeOption), {
          text: '沉稳蓝',
          color: '#2E4E6F'
        })
      },
      {
        content: assign(cloneDeep(defaultThemeOption), {
          text: '阳光橙',
          color: '#F56A45'
        })
      },
      {
        content: assign(cloneDeep(defaultThemeOption), {
          text: '翡翠绿',
          color: '#41A9B5'
        })
      },
      {
        content: assign(cloneDeep(defaultThemeOption), {
          text: '紫罗兰',
          color: '#4849FF'
        })
      }
    ],
    /** 特殊主题 */
    specials: [
      {
        content: assign(cloneDeep(defaultThemeOption), {
          type: 'specials',
          text: '孔雀紫',
          color: '#01A9B4',
          mainBackground: `url(${settingSunImgIrl})rgba(255, 255, 255, 0.5)`,
          blur: '20px',
          linearGradientColor:
            'linear-gradient(43.33deg, #086972 2.7%, #01A9B4 35.51%, #C98EE8 71.3%)',
          sideBarColor: '#086972',
          background: 'rgba(255, 255, 255, 0.65)',
          hollowColor: '#184D47'
        })
      },
      {
        content: assign(cloneDeep(defaultThemeOption), {
          type: 'specials',
          text: '樱之恋',
          color: '#F9AABD',
          solidColor: '#F49DBA',
          mainBackground: `url(${cherryBlossomsImgIrl})rgba(255, 255, 255, 0.5)`,
          background: 'rgba(255, 255, 255, 0.65)',
          blur: '20px',
          linearGradientColor: 'linear-gradient(43.33deg, #F49DBA 2.7%, #FFE0E8 98.15%)',
          sideBarColor: '#F49DBA',
          hollowColor: '#F49DBA'
        })
      }
    ]
  },
  mutations: {
    [RECEVE_THEME_OPTION]: (state, option) => (state.option = option)
  },
  getters: {
    // 所有主题配置
    allThemeOptions: (state) => {
      return [...state.specials, ...state.systems]
    }
  }
})
