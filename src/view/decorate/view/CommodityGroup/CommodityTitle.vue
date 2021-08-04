<!--
 * @Author: Mr.Mao
 * @Date: 2021-04-14 21:05:29
 * @LastEditTime: 2021-05-14 10:38:07
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div
    class="shop-title"
    :style="{ color: option.displayStyle.commodityTitle.color, maxWidth: `${titleEllipsis}px` }"
    v-if="option.displayStyle.commodityTitle.state"
  >
    {{ item.title || '这是主标题' }}
  </div>
  <div
    class="shop-subtitle-title"
    :style="{ color: option.displayStyle.subtitle.color, maxWidth: `${subtitleEllipsis}px` }"
    :class="['ellipsis-' + subtitleEllipsis]"
    v-if="option.displayStyle.subtitle.state && showSubtitle && item.vice_title"
  >
    {{ item.vice_title }}
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent } from '@vue/runtime-core'
  import { commodityGroupOption } from '../../config'
  export default defineComponent({
    props: {
      option: {
        type: Object as () => typeof commodityGroupOption,
        required: true
      },
      titleEllipsis: {
        type: [String, Number],
        default: '200'
      },
      subtitleEllipsis: {
        type: [String, Number],
        default: '150'
      },
      item: {
        type: Object as () => Record<string, any>,
        required: true
      }
    },
    setup(props) {
      const showSubtitle = computed(() => {
        return (
          props.option.componentStyle.styleType === 'center' ||
          props.option.componentStyle.styleType === 'upDown'
        )
      })
      return {
        showSubtitle
      }
    }
  })
</script>
<style lang="scss" scoped>
  @import '@/style/mixin.scss';
  /* 商品标题 */
  .shop-title {
    font-size: 14px;
    color: #000000;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  /* 商品副标题 */
  .shop-subtitle-title {
    margin-top: 5px;
    font-size: 12px;
    color: #acacac;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
