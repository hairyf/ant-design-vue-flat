/*
 * @Author: Zhilong
 * @Date: 2021-06-21 11:09:18
 * @LastEditTime: 2021-06-21 11:17:56
 * @Description:倒计时钩子(指定时间的倒计时)
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
 */
import { ref } from 'vue'
export const useTimeDown = (time: number, option: any) => {
  const timeDown = ref(time)

  const timeInt = setInterval(() => {
    if (timeDown.value < 0) {
      timeDown.value = 0
      clearInterval(timeInt)
    } else {
      timeDown.value--
    }
  }, 1000)

  const startDown = () => {}
  const suspendDown = () => {}
  const completeDown = () => {}
  const resetDown = () => {}

  return {
    timeDown,
    startDown,
    suspendDown,
    completeDown,
    resetDown
  }
}
