<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-25 09:35:14
 * @LastEditTime: 2021-07-16 09:41:53
 * @Description: 模态框二次封装
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-modal
    dialog-class="cal-message-diolog"
    :class="{ 'hide-footer': !showFooter }"
    v-bind="props"
    :visible="showModal"
    @ok="onConfirm"
    @cancel="onClone"
  >
    <!-- 标题插槽传递 -->
    <template #title>
      <slot name="title" />
    </template>
    <!-- 关闭按钮 -->
    <cal-icon
      class="cursor-pointer align-middle px-4 absolute"
      style="right: 24px; top: 20px"
      type="clone"
      v-if="closable"
      :class="[$slots['title'] || props.title ? 'text-white' : 'text-black']"
      @click="onClone"
      size="26"
    />
    <!-- 内容区 -->
    <div
      class="cal-message-diolog__content"
      :class="[customBackground ? 'red' : 'bg-white']"
      :style="{ backgroundColor: customBackground }"
      v-if="$slots['default'] || content || $slots['description'] || description"
    >
      <!-- 警告 -->
      <template v-if="type === 'warning'">
        <div class="flex items-center">
          <i class="nr-warning text-red text-5xl mr-20" />
          <div class="flex-1">
            <div v-if="content" v-html="content"></div>
            <slot />
          </div>
        </div>
        <div>
          <div class="mt-28 mb-10" v-if="description" v-html="description" />
          <slot name="description" />
        </div>
      </template>
      <!-- 成功 -->
      <template v-else-if="type === 'success'">
        <div class="flex items-center justify-center">
          <i class="nr-after text-green text-4xl mr-10" />
          <div class="text-xl font-semibold">
            <div v-if="content" v-html="content"></div>
            <slot />
          </div>
        </div>
        <div class="text-center">
          <div class="mt-28 mb-10" v-if="description" v-html="description" />
          <slot name="description" />
        </div>
      </template>
      <!-- 其他 -->
      <template v-else>
        <slot v-if="$slots['default']" />
        {{ content }}
      </template>
    </div>
    <!-- 底部插槽传递 -->
    <template #footer>
      <slot name="footer" v-if="$slots['footer']" />
      <template v-else>
        <cal-button class="mr-20 w-96 h-32" @click="onClone" v-if="showCancel">取消</cal-button>
        <cal-button type="primary " class="w-96 h-32" @click="onConfirm">确认</cal-button>
      </template>
    </template>
  </a-modal>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalDialog' })
</script>
<script lang="ts" setup>
  import { Modal as AModal } from 'ant-design-vue'
  import { watch, isRef } from 'vue'
  import { useVModel } from '@vueuse/core'
  import CalButton from '../../button/src/Button.vue'
  import CalIcon from '../../icon/src/Icon.vue'
  const emit = defineEmits(['cancel'])
  const props = defineProps({
    type: {
      type: String as () => 'warning' | 'confirm' | 'success',
      default: 'confirm'
    },
    // 显示内容(string, slot)
    title: String,
    // 显示内容(string, slot)
    content: String,
    // 提示内容
    description: String,
    // 是否展示组件
    modelValue: Boolean,
    // 自定义背景色
    customBackground: {
      type: String
    },
    // 组件消失时(实例方法 > 移除实例)
    onVanish: Function,
    // 组件调用成功事件
    onResolve: Function,
    // 组件调用失败事件
    onReject: Function,
    // 是否显示关闭按钮
    closable: {
      type: Boolean,
      default: true
    },
    // 是否显示取消按钮
    showCancel: {
      type: Boolean,
      default: true
    },
    // 是否展示底部
    showFooter: {
      type: Boolean,
      default: true
    },
    // 确定关闭回调
    onOk: Function
  })

  // 双向数据绑定
  const showModal = isRef(props.modelValue) ? props.modelValue : useVModel(props, 'modelValue')
  // 隐藏时, 触发 props 中的组件移除
  watch(showModal, (value) => {
    if (value) return false
    setTimeout(() => props.onVanish?.(), 300)
  })
  // 关闭事件
  const onClone = () => {
    emit('cancel', false)
    props.onReject?.()
    showModal.value = false
    console.log(showModal.value)
  }
  // 确定事件
  const onConfirm = () => {
    props.onResolve?.()
    const result = props?.onOk?.()
    if (result instanceof Promise) {
      result.then(() => (showModal.value = false))
    } else {
      showModal.value = false
    }
  }
</script>
<style lang="scss">
  .cal-message-diolog {
    .cal-message-diolog__content {
      padding: 24px;
    }
    .ant-modal-header {
      background: var(--common-primary-color);
      padding: 24px;
      .ant-modal-title {
        font-size: 16px;
        color: white;
      }
    }
    .ant-modal-content {
      border-radius: 20px;
      background: transparent;
      overflow: hidden;
    }
    .ant-modal-body {
      padding: 0;
    }
    .ant-modal-close {
      display: none;
    }
    .ant-modal-footer {
      padding: 10px 24px 24px 0;
      border-top: none;
      background: white;
    }
    &.hide-footer {
      .ant-modal-footer {
        display: none;
      }
    }
  }
</style>
