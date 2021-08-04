<!--
 * @Author: Mr.Mao
 * @Date: 2021-04-02 10:50:38
 * @LastEditTime: 2021-05-11 18:13:10
 * @Description: 浮动按钮
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div
    class="fixed-button"
    ref="fixedButtonRef"
    :style="{
      top,
      left,
      right,
      bottom,
      margin: `${option.padding.top * 2}rpx ${option.padding.right * 2}rpx ${
        option.padding.bottom * 2
      }rpx ${option.padding.left * 2}rpx `,
    }"
  >
    <!-- 兼容H5  -->
    <uni-page-head>
      <div
        class="uni-page-head"
        style="position: relative; background-color: #0000"
      />
    </uni-page-head>
    <link-controller
      v-for="(item, index) in option.contentEdit"
      :key="index"
      :data="item.link"
    >
      <view-image
        :src="item.image || images[item.type]"
        :size="50 * 2"
        :style="{ marginBottom: `${option.padding.iconSpacing * 2}rpx` }"
      />
    </link-controller>

    <!-- 兼容ios部分机型  -->
    <div class="u-fixed-placeholder safe-area-inset-bottom" />
  </div>
</template>
<script lang="ts">
import AppVue from '@/App.vue';
import {
  computed,
  defineComponent,
  ref,
  watch,
  nextTick,
} from '@vue/composition-api';
import { fixedButtonOption } from 'orange-components-config/options';
export default defineComponent({
  props: {
    option: {
      type: Object as () => typeof fixedButtonOption,
      required: true,
    },
  },
  setup(props) {
    const { $spliceStaticUrl } = AppVue.prototype;
    const images = {
      link: $spliceStaticUrl('contact.png'),
      top: $spliceStaticUrl('back-top.png'),
      serve: $spliceStaticUrl('serve.png'),
    };

    const fixedButtonRef = ref<HTMLElement>();
    const scrollTop = ref(0);

    // 动态变化值, 当队列数组发生改变, 并进入下个tick时, 告知顶部值需要更新
    const dynamiChange = ref(0);
    const watchItem = () => props.option.contentEdit.length;
    watch(watchItem, () => nextTick(() => dynamiChange.value++));

    // 距离顶部值
    const top = computed(() => {
      const placement = props.option.componentStyle.placement;
      if (placement === '左上角' || placement === '右上角') return `${0}rpx`;
      return 'auto';
    });

    // 距离顶部值
    const right = computed(() => {
      const placement = props.option.componentStyle.placement;
      if (placement === '右下角' || placement === '右上角') return `${0}rpx`;
      return 'auto';
    });

    // 距离顶部值
    const bottom = computed(() => {
      const placement = props.option.componentStyle.placement;
      if (placement === '左下角' || placement === '右下角') return `${50}px`;
      return 'auto';
    });

    const left = computed(() => {
      const placement = props.option.componentStyle.placement;
      if (placement === '左上角' || placement === '左下角') return '0rpx';
      return 'auto';
    });
    return {
      top,
      left,
      right,
      bottom,
      dynamiChange,
      fixedButtonRef,
      scrollTop,
      images,
    };
  },
});
</script>
<style lang="scss" scoped>
.fixed-button {
  position: fixed;
  z-index: 100;
  flex-direction: column;
  transition: 0.2s;
}
</style>
