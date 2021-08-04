<!--
 * @Author: Zhilong
 * @Date: 2021-08-04 15:10:36
 * @LastEditTime: 2021-08-04 17:31:12
 * @Description: 更多的切换项
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div
    @click="onSelect"
    ref="div"
    style="transition: 0.1s; transition-delay: 0.1s"
    class="select-none"
    :style="{ paddingLeft: analyUnit(value.props.gap), paddingRight: analyUnit(value.props.gap) }"
    :class="[keyword == value.modelValue ? 'text-white' : 'text-gray-450']"
  >
    {{ label }}
  </div>
</template>
<script lang="ts">
  import { defineComponent, inject, onMounted, ref } from 'vue-demi'
  export default defineComponent({ name: 'CalMoreSwitchItem' })
</script>
<script lang="ts" setup>
  import { analyUnit } from '@tuimao/utils'
  import { switchKey } from './MoreSwitchGroup.vue'
  const value = inject(switchKey)!
  const props = defineProps({
    keyword: String,
    label: String
  })
  const div = ref<HTMLElement | null>()
  const onSelect = () => {
    value.modelValue = props.keyword
    value.selectBoxRef = div.value
  }
</script>
