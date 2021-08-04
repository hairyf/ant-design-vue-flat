<!--
 * @Author: Mr.Mao
 * @Date: 2021-06-23 16:50:09
 * @LastEditTime: 2021-06-23 18:34:56
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="json-editor">
    <textarea ref="textareaEl" />
  </div>
</template>
<script lang="ts" setup>
  import CodeMirror from 'codemirror'
  import 'codemirror/addon/lint/lint.css'
  import 'codemirror/lib/codemirror.css'
  import 'codemirror/theme/twilight.css'
  import 'codemirror/mode/javascript/javascript'
  import 'codemirror/addon/lint/lint'
  import 'codemirror/addon/lint/json-lint'
  import { defineProps, onMounted, ref, defineEmit, nextTick } from 'vue-demi'
  const textareaEl = ref<HTMLTextAreaElement>()
  const jsonEditor = ref<CodeMirror.EditorFromTextArea>()

  const props = defineProps({
    modelValue: String
  })
  const emit = defineEmit(['updata:modelValue'])
  onMounted(() => {
    if (!textareaEl.value) return undefined
    jsonEditor.value = CodeMirror.fromTextArea(textareaEl.value, {
      lineNumbers: true,
      mode: 'application/json',
      gutters: ['CodeMirror-lint-markers'],
      theme: 'rubyblue',
      lint: true
    })
    jsonEditor.value.setValue(props.modelValue || '')
    jsonEditor.value.on('change', (cm) => {
      emit('updata:modelValue', cm.getValue())
    })
  })
</script>
<style lang="scss">
  .CodeMirror {
    border: 1px solid #eee;
    height: 100%;
  }

  .CodeMirror-scroll {
    height: 100%;
    overflow-y: hidden;
    overflow-x: auto;
  }
</style>
