<!--
 * @Author: Mr.Mao
 * @Date: 2021-04-27 11:13:29
 * @LastEditTime: 2021-04-27 14:45:19
 * @Description: 音频选择器
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div
    class="empty-image"
    @click.stop="onReceiveAudio"
    v-if="!srcText"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
      lineHeight: `${size}px`,
      backgroundColor: bgColor,
      border: border
    }"
  >
    <i class="el-icon-plus" />
  </div>
  <div class="audio-container oe-flex" v-else>
    <i class="oe-play oe-m-r-10" style="color: #212121" />
    <span class="text">{{ audioText }}</span>
    <div class="edit" @click="onReceiveAudio">修改</div>
  </div>
</template>
<script lang="ts" setup>
  import { MaterialSelect } from '@/components/selectors'
  import { computed, defineEmit, defineProps, ref } from '@vue/runtime-core'
  const props = defineProps({
    // Icon内容
    modelValue: String,
    // 提示信息
    tips: String,
    // 容器尺寸
    size: {
      type: [Number, String],
      default: 48
    },
    // 背景颜色
    bgColor: {
      type: String
    },
    // 是否展示边框
    border: {
      type: String,
      default: '1px dashed rgb(217, 217, 217)'
    }
  })
  const emit = defineEmit()
  // 多层model传递
  const srcText = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
  })
  const audioText = ref('')
  const onReceiveAudio = async () => {
    const [audioItem] = await MaterialSelect({ multiple: false, selectorType: 2 })
    audioText.value = audioItem.name
    srcText.value = audioItem.path.url
  }
</script>
<style scoped lang="scss">
  @import '@/style/mixin';
  .empty-image {
    width: 48px;
    height: 48px;
    line-height: 53px;
    text-align: center;
    // background-color: #f5f5f5;
    color: var(--color-primary);
    box-sizing: border-box;
    cursor: pointer;
  }
  .audio-container {
    height: 50px;
    padding: 0 10px;
    border: 1px solid #f2f2f2;
    position: relative;
    cursor: pointer;
    &:hover .edit {
      display: block;
    }
  }
  .edit {
    display: none;
    position: absolute;
    width: 100%;
    height: 20px;
    line-height: 20px;
    left: 0;
    bottom: 0;
    text-align: center;
    color: #ffffff;
    background-color: rgba(0, 0, 0, 0.2);
  }

  .text {
    @include text-ellipsis(250px);
    line-height: 20px;
  }
</style>
