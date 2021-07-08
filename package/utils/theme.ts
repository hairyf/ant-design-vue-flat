import { useCssVars } from 'vue'

export type ThemeOption = ReturnType<typeof defaultTheme>

// 获取默认主题
export const defaultTheme = () => ({
  CalMenu: {}
})

// 转换对象
export const transformTheme = (theme: ThemeOption) => {}
// CalMenu:{ color:'red' } >>> --CalMenuColor: 'red'

// 挂载主题
export const mountTheme = (theme: ThemeOption) => {}

// 获取当前主题配置
export const useTheme = () => {}
