<!--
 * @Author: Zhilong
 * @Date: 2021-04-17 16:20:53
 * @LastEditTime: 2021-04-30 10:13:43
 * @Description: 下单提醒 视图区
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div
    v-if="orderUsreList.length !== 0"
    class="fixed-button"
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
    <div class="swiper-view">
      <div
        class="before"
        :style="{ background, opacity: option.colorStyle.opacity * 0.01 }"
      />
      <swiper
        :current="currentIndex"
        vertical
        circular
        disable-touch
        style="transform: rotateZ(180deg); height: 100%"
      >
        <swiper-item v-for="(item, index) in orderUsreList" :key="index">
          <div class="fixed-button-content">
            <div class="u-flex">
              <view-image
                v-show="contentEdit.showContent.avatar.state"
                :size="24 * 2"
                border-radius="50%"
                :src="item.avatar"
                :isImage="true"
              />
              <div class="fixed-text" :style="{ color: colorStyle.color.text }">
                {{ item.nickname_text }}
              </div>
            </div>
            <div
              class="fixed-time-text"
              v-show="contentEdit.showContent.time.state"
              :style="{ color: colorStyle.color.subText }"
            >
              {{ item.order_time_text || '刚刚' }}
            </div>
          </div>
        </swiper-item>
      </swiper>
    </div>
    <!-- 兼容ios部分机型  -->
    <div class="u-fixed-placeholder safe-area-inset-bottom" />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watch } from '@vue/composition-api';
import { completeOrderRemindOption } from 'orange-components-config/options';
import { useBackgroundColor } from '@/hooks/use-view-style';
import { reqCompleteOrderInfo } from '@/api';
export default defineComponent({
  props: {
    option: {
      type: Object as () => typeof completeOrderRemindOption,
      required: true,
    },
  },
  setup(props) {
    const { background } = useBackgroundColor(props.option.colorStyle);
    const { contentEdit, colorStyle } = props.option;
    const orderUsreList = ref<any[]>([]);

    const getOrderUsreList = async () => {
      const { data } = await reqCompleteOrderInfo({
        limit: contentEdit.dataAmount,
      });
      orderUsreList.value = data.data;
    };
    getOrderUsreList();

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

    // 当前选择项
    const currentIndex = ref(0);

    // 设置切换页定时器
    let tiemr: number;
    const setPlayInterVal = () => {
      clearInterval(tiemr);
      tiemr = setInterval(() => {
        if (currentIndex.value >= props.option.contentEdit.dataAmount - 1) {
          currentIndex.value = 0;
        } else {
          currentIndex.value++;
        }
      }, 1000 * props.option.contentEdit.speed);
    };

    watch(() => props.option.contentEdit.speed, setPlayInterVal, {
      immediate: true,
    });

    return {
      background,
      contentEdit,
      colorStyle,
      currentIndex,
      top,
      left,
      right,
      orderUsreList,
      bottom,
    };
  },
});
</script>
<style lang="scss" scoped>
.swiper-view {
  overflow: hidden;
  width: 100%;
  height: toRpx(32);
  position: relative;
  border-radius: toRpx(200);
}
.fixed-button {
  position: fixed;
  z-index: 100;
  transition: 0.1s;
  border-radius: toRpx(200);
  width: toRpx(205);
  box-sizing: border-box;
  .before {
    content: '';
    position: absolute;
    width: 100%;
    height: toRpx(32);
    border-radius: toRpx(200);
    left: 0;
    top: 0;
    z-index: -1;
  }
}
.fixed-text {
  font-size: toRpx(12);
  color: #ffffff;
  margin: 0 toRpx(16) 0 toRpx(4);
  @include text-ellipsis(240rpx);
}
.fixed-time-text {
  font-size: toRpx(12);
  color: #ffffff;
  margin-right: toRpx(16);
}
.fixed-button-content {
  transform: rotateZ(180deg);
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  padding: toRpx(4);
  box-sizing: border-box;
  justify-content: space-between;
  display: flex;
  align-items: center;
}
.container-animation-enter-active {
  transition: 0.2s;
  top: toRpx(0);
  opacity: 1;
}
.container-animation-leave-active {
  transition: 0.2s;
  top: toRpx(0);
  opacity: 1;
}
.container-animation-enter-from {
  top: toRpx(-30);
  opacity: 0;
}
.container-animation-leave-to {
  top: toRpx(30);
  opacity: 0;
}
</style>
