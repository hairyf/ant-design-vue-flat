<!--
 * @Author: Mr.Mao
 * @Date: 2021-06-22 11:12:06
 * @LastEditTime: 2021-06-23 11:41:37
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="flex justify-center my-64">
    <cal-button class="w-176 h-48 mr-56 text-base" @click="emit('cancel')"> 取消 </cal-button>
    <cal-button
      class="w-176 h-48 text-base"
      type="primary"
      @click="onNextTick"
      v-if="showComplete || (isLessThan && !showComplete)"
    >
      {{ isLessThan ? '下一步' : completeText }}
    </cal-button>
  </div>
</template>
<script lang="ts" setup>
  import { useModelRef } from '@/hooks/use-modelRef'
  import { computed, defineEmit, defineProps } from 'vue-demi'
  const props = defineProps({
    /** 当前值 */
    modelValue: {
      type: Number,
      default: 0
    },
    /** 最大值 */
    max: {
      type: Number,
      default: 0
    },
    /** 是否展示最后一步 */
    showComplete: {
      type: Boolean,
      default: true
    },
    /** 最后一步文字 */
    completeText: {
      type: String,
      default: '保存'
    }
  })
  const emit = defineEmit(['next', 'cancel', 'complete'])
  // 当前步骤所在标识
  const current = useModelRef(props, 'modelValue')
  // 当前步骤是否小于 max 值
  const isLessThan = computed(() => current.value < props.max)

  // 触发下一步
  const onNextTick = () => {
    if (!isLessThan.value) {
      return emit('complete')
    }
    current.value++
    emit('next', current.value)
  }
</script>
