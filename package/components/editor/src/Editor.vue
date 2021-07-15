<!--
 * @Author: Mr.Mao
 * @Date: 2021-07-15 14:33:10
 * @LastEditTime: 2021-07-15 15:06:59
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="cal-editor">
    <iframe v-if="disabled" class="cal-editor--disabled h-full w-full" :srcdoc="content" />
    <tinymce-editor
      v-else
      class="h-full w-full"
      api-key="aes3zocor6cpx2x0geyur75jd26mo4y2bnfr12afozutujiw"
      :init="option"
      v-model="content"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalEditor' })
</script>
<script lang="ts" setup>
  import { computed, defineProps } from 'vue'
  import type { RawEditorSettings } from 'tinymce'
  import TinymceEditor from '@tinymce/tinymce-vue'
  import { useVModel } from '@vueuse/core'
  import { merge } from 'lodash'
  import initOption from './_option'
  import './_import'
  const props = defineProps({
    modelValue: {
      type: String
    },
    disabled: Boolean,
    init: {
      type: Object as () => RawEditorSettings,
      default: initOption
    }
  })
  const content = useVModel(props, 'modelValue')
  const option = computed(() => {
    const required = {
      skin: false,
      content_css: false,
      language_url:
        'https://client-static-1254212114.cos.ap-guangzhou.myqcloud.com/script/tinymce_zh_CN.js',
      language: 'zh_CN'
    }
    return merge(required, props.init)
  })
</script>

<style lang="scss" scoped></style>
