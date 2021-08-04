<!--
 * @Author: Mr.Mao
 * @Date: 2021-03-29 17:47:12
 * @LastEditTime: 2021-05-08 16:12:01
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="oe-flex">
    <template v-if="!text">
      <div class="link-select oe-flex-1 oe-m-r-14" @click="onReceiveLinkInfo">
        <span class="select-tips">
          {{ link?.label ? `${link.label} - ${link.name || '暂无名称'}` : currentOption?.text }}
        </span>
      </div>
      <span class="option-text oe-m-r-14" v-if="reset"> 替换 </span>
      <span class="option-text">
        <slot v-if="showClear" />
        <span v-else @click="link = {}"> 清除 </span>
      </span>
    </template>
    <div class="link-select oe-flex-1" v-else>
      <span class="select-tips">
        {{ text }}
      </span>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { LinkSelect } from '@/components/selectors'
  import { computed, defineEmit, defineProps, useContext } from '@vue/runtime-core'
  const context = useContext()
  const showClear = !!context.slots.default

  interface TLinkOption {
    option: 'all' | 'shop' | 'commodity' | 'marketing' | 'classification' | 'applets' | 'grouping'
    optionArr: Array<TLinkOption['option']>
  }
  // type
  // id
  // name
  // label
  const props = defineProps({
    modelValue: Object,
    type: {
      type: [String as () => TLinkOption['option'], Array as () => TLinkOption['optionArr']],
      default: 'all'
    },
    reset: Boolean,
    // 显示文字, 当出现该选项, 则选择链接功能失效, 作用将更换为容器组件
    text: String
  })
  const currentOption = computed(() => {
    const enumTitle = {
      shop: '+ 请选择页面',
      commodity: '+ 请选择商品',
      marketing: '+ 请选择优惠券',
      classification: '+ 请选择分类',
      applets: '+ 请选择小程序',
      grouping: '+ 请选择分组'
    }
    if (typeof props.type === 'string' && props.type !== 'all') {
      return {
        text: enumTitle[props.type],
        option: { [props.type]: true }
      }
    } else if (Array.isArray(props.type)) {
      return {
        text: '+ 请选择链接',
        option: props.type.reduce((oldVaL, val) => ({ ...oldVaL, [val]: true }), {})
      }
    }
    // all
    return {
      text: '+ 请选择链接',
      option: {
        shop: true,
        commodity: true,
        marketing: false,
        classification: true,
        applets: true,
        grouping: true
      }
    }
  })
  const emit = defineEmit()
  // 多层model传递
  const link = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
  })

  // 链接选择器接受链接信息
  const onReceiveLinkInfo = () => {
    LinkSelect(currentOption.value).then((linkInfo) => {
      link.value = linkInfo
    })
  }
</script>
<style lang="scss" scoped>
  .link-select {
    padding: 8px 14px;
    // background: #f5f5f5;
    border: 1px dashed #d9d9d9;
    box-sizing: border-box;
    border-radius: 2px;
    line-height: 18px;
    cursor: pointer;
  }
  .select-tips {
    color: var(--color-primary);
  }
  .option-text {
    color: var(--color-primary);
    cursor: pointer;
  }
</style>
