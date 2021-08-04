<!--
 * @Author: Mr.Mao
 * @Date: 2021-03-25 21:39:06
 * @LastEditTime: 2021-05-11 10:40:44
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div :style="{ padding, overflow: 'hidden', background }">
    <div
      class="order-icon-group"
      :style="{ borderRadius, backgroundColor: option.colorStyle.color.cardBackground }"
    >
      <div class="hedaer oe-flex">
        <div class="title oe-flex-1" :style="{ color: option.colorStyle.color.title }">
          {{ option.contentEdit.title }}
        </div>
      </div>
      <div class="main oe-flex" v-for="(cv, ci) in contentsGroup" :key="ci">
        <div class="item oe-flex oe-flex-1" v-for="(v, i) in cv" :key="i">
          <div class="icon">
            <view-image
              :size="24"
              :src="option.componentStyle.componentModal === '图片' ? v.image : v.icon"
              :label-color="option.colorStyle.color.icon"
            />
          </div>
          <span class="text" :style="{ color: option.colorStyle.color.text }">{{ v.text }}</span>
        </div>
        <div class="item oe-flex oe-flex-1" v-for="v in iconCount - cv.length" :key="v" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import ViewImage from '@/view/decorate/components/common/ViewImage.vue'
  import { computed, defineProps } from '@vue/runtime-core'
  import { commonlyUsedGroupOption } from '@/view/decorate/config'
  import { useBackgroundColor, usePaddingRadius } from '../hooks/use-view-style'
  import { chunk } from 'lodash'
  const props = defineProps({
    option: {
      type: Object as () => typeof commonlyUsedGroupOption,
      required: true
    }
  })
  const { padding, borderRadius } = usePaddingRadius(props.option)
  const { background } = useBackgroundColor(props.option.colorStyle)
  const iconCount = computed(() => +props.option.componentStyle.iconCount.replace(/[^\d]/g, ''))
  const contentsGroup = computed(() => {
    const contentEditContents = props.option.contentEdit.contents
    return chunk(contentEditContents, iconCount.value)
  })
</script>
<style lang="scss" scoped>
  @import '@/style/mixin.scss';
  .hedaer {
    padding: 17px;
    .title {
      font-weight: bold;
      font-size: 14px;
    }
    .tips {
      font-size: 12px;
      color: #999ca7;
    }
  }
  .main {
    padding-bottom: 17px;
  }
  .item {
    flex-direction: column;
    .text {
      margin-top: 5px;
      font-size: 12px;
    }
    .icon {
      display: inline-block;
      width: 24px;
      height: 24px;
    }
  }
</style>
