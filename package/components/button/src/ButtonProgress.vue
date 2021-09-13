<!--
 * @Author: Mr.Mao
 * @Date: 2021-06-22 11:12:06
 * @LastEditTime: 2021-07-28 19:23:15
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="flex justify-center">
    <cal-button
      v-if="openLastStep && modelValue == 0"
      class="w-176 h-48 mr-56 text-base"
      @click="emit('cancel')"
    >
      取消
    </cal-button>
    <cal-button v-else class="w-176 h-48 mr-56 text-base" @click="current--, emit('prev')">
      上一步
    </cal-button>
    <cal-button
      v-if="middleShow && max - modelValue != max && max - modelValue != 0"
      class="w-176 h-48 mr-56 text-base"
      @click="emit('complete')"
    >
      保存
    </cal-button>
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
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalButtonProgress' })
</script>
<script lang="ts" setup>
  import { useVModel } from '@vueuse/core'
  import { computed, defineEmit, defineProps } from 'vue'
  import CalButton from './Button.vue'
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
    },
    /** 开启上一步 */
    openLastStep: {
      type: Boolean,
      default: true
    },
    /** 中间为保存按钮 */
    middleShow: {
      type: Boolean,
      default: false
    }
  })
  const emit = defineEmit(['prev', 'next', 'cancel', 'complete'])
  // 当前步骤所在标识
  const current = useVModel(props, 'modelValue')
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
