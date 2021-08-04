import { ref } from '@vue/reactivity'
import { computed, getCurrentInstance, watch } from 'vue'

/*
 * @Author: Mr.Mao
 * @Date: 2021-05-23 16:19:40
 * @LastEditTime: 2021-05-27 19:45:20
 * @Description: 双向 v-model 绑定, 假如 props 值为空, 则使用新的 ref 属性
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
export const useModelRef = <T, K extends keyof T>(props: T, key: K) => {
  const currentInstance = getCurrentInstance()
  const valueRef = ref<T[K]>(props[key])
  const watchList = () => props[key]
  watch(watchList, (value: any) => {
    if (valueRef.value === value) return false
    valueRef.value = value
  })
  return computed({
    get: () => valueRef.value,
    set: (value: any) => {
      if (valueRef.value === value) return false
      valueRef.value = value
      currentInstance?.emit(`update:${key}`, value)
    }
  })
}
