<!--
 * @Author: Zhilong
 * @Date: 2021-05-11 17:48:46
 * @LastEditTime: 2021-05-11 19:42:45
 * @Description: 链接控制器
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <button
    class="u-reset-button btn-serve"
    @click="disable ? '' : $handleLink(data)"
    :open-type="type"
  >
    <slot />
  </button>
</template>
<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';
import { LinkOption } from 'orange-components-config/options';

export default defineComponent({
  props: {
    data: { type: Object as () => LinkOption, required: true },
    disable: { type: Boolean, default: false },
  },
  setup(props) {
    const type = computed(() => (props.data.type === 'serve' ? 'contact' : ''));
    return { type };
  },
});
</script>
<style lang="scss">
.btn-serve {
  margin: 0;
  overflow: visible !important;
  text-align: left;
  border: none;
  border-radius: 0;
}
</style>
