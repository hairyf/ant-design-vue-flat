/*
 * @Author: Zhilong
 * @Date: 2021-05-25 09:20:02
 * @LastEditTime: 2021-07-13 18:34:17
 * @Description:抖动虚拟数据处理
 * @LastEditors: Mr.Mao
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
 */
import { debounce } from 'lodash-es'
import { computed, ref, Ref } from 'vue'

type TValue = number | string
type ThandelFun = (context: { value: TValue; realValue: Ref<TValue> }) => void
interface IOption {
  wait: number
}

const defaultOption = { wait: 300 }

export const useShakeDataHandel = (handelFun: ThandelFun, option: IOption = defaultOption) => {
  // 缓存的值
  const cache = ref<TValue>('')
  // 防抖函数
  const debounceHandel = debounce(handelFun, option.wait)
  return {
    virtualValue: computed({
      get: () => cache.value,
      set(value: TValue) {
        cache.value = value
        debounceHandel({ value, realValue: cache })
      }
    }),
    realValue: cache
  }
}
