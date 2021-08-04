<!--
 * @Author: Zhilong
 * @Date: 2021-04-23 19:19:15
 * @LastEditTime: 2021-05-17 16:15:54
 * @Description: 优惠券视图区
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div
    class="coupon-container"
    :style="{
      padding,
      borderRadius,
      background,
    }"
  >
    <div class="coupon-view-list">
      <view-layout-container
        :list="contentEdit"
        :interval="10 * 2"
        :row="rowNumber"
        :wrap="rowNumber !== 9999"
        :data="{
          showType,
          showStyle,
          diyWidth,
        }"
      >
        <template v-slot:default="{ item, data }">
          <div class="coupon-item" :class="[data.showStyle, data.diyWidth]">
            <price
              class="coupon-item__price flex-center"
              :text="`满${item.link.value.data.condition}可用`"
              :price="item.link.value.data.money"
              :flexType="data.showType"
              :type="item.link.value.data.type == 1 ? '￥' : '折'"
            />
            <div
              class="coupon-item__button flex-center"
              v-if="
                !(
                  componentStyle.showType === 'three' &&
                  componentStyle.styleType === 'right'
                )
              "
              @click="receiveCoupon(item.link.value.data.id)"
            >
              <span class="u-f-s-28">领 取</span>
            </div>
          </div>
        </template>
      </view-layout-container>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import { couponOption } from 'orange-components-config/options';
import Price from './Coupon/Price.vue';
import { useBackgroundColor, usePaddingRadius } from '@/hooks/use-view-style';
import { reqGetCoupon } from '@/api';
import { showToast } from '@/utils';
export default defineComponent({
  props: {
    option: {
      type: Object as () => typeof couponOption,
      required: true,
    },
  },
  components: { Price },
  methods: {
    async receiveCoupon(id: number) {
      await reqGetCoupon(id);
      await showToast({ icon: 'none', title: '领取优惠券成功' });
    },
  },
  setup(props) {
    //导出配置为常量 供视图使用
    const { componentStyle, colorStyle, contentEdit } = props.option;
    const { background } = useBackgroundColor(colorStyle);
    const { padding, borderRadius } = usePaddingRadius(props.option);

    // 对应的每行数量
    const rowNumber = computed(() => {
      const strategy = { single: 1, pair: 2, three: 3, row: 9999 };
      return strategy[componentStyle.showType];
    });

    // 显示样式 的类型策略模式
    const showStyle = computed(() => {
      // 在对应没有策略模式的值 进行特殊处理
      if (
        componentStyle.styleType === 'right' &&
        componentStyle.showType === 'three'
      ) {
        return 'coupon-style-1-3';
      }
      if (
        componentStyle.styleType === 'bottom' &&
        componentStyle.showType === 'three'
      ) {
        return 'coupon-style-2-3';
      }
      if (componentStyle.styleType === 'top') {
        if (componentStyle.showType === 'single') return 'coupon-style-4-1';
        if (componentStyle.showType === 'pair') return 'coupon-style-4-2';
        if (componentStyle.showType === 'three') return 'coupon-style-4-3';
        if (componentStyle.showType === 'row') return 'coupon-style-4-4';
      }
      const strategy = {
        right: 'coupon-style-1',
        bottom: 'coupon-style-2',
        center: 'coupon-style-3',
        top: 'coupon-style-4',
      };
      return strategy[componentStyle.styleType] as
        | 'coupon-style-1'
        | 'coupon-style-2'
        | 'coupon-style-3'
        | 'coupon-style-4';
    });
    // 自定义宽度的类名
    const diyWidth = computed(() => {
      const diyWidthStatus = componentStyle.showType === 'row';
      return diyWidthStatus ? 'width-153' : '';
    });

    const showType = computed(() => {
      const strategy = {
        right: {
          single: 'row',
          pair: 'column',
          three: 'column',
          row: 'column',
        },
        bottom: { single: 'row', pair: 'row', three: 'column', row: 'row' },
        center: {
          single: 'column',
          pair: 'column',
          three: 'column',
          row: 'column',
        },
        top: { single: 'row', pair: 'column', three: 'column', row: 'column' },
      };
      return strategy[componentStyle.styleType][componentStyle.showType] as
        | 'row'
        | 'column';
    });

    return {
      showType,
      diyWidth,
      showStyle,
      rowNumber,
      padding,
      borderRadius,
      background,
      contentEdit,
      componentStyle,
    };
  },
});
</script>
<style lang="scss">
.flex-center {
  justify-content: center;
  align-items: center;
}

.width-153 {
  width: toRpx(153);
}
.coupon-container {
}

.coupon-view-list {
}

.coupon-item__price {
  z-index: 1;
}

.coupon-item__button {
  z-index: 1;
}

/* 默认样式 */
.coupon-item {
  height: toRpx(120);
  border-radius: toRpx(5);
  display: flex;
}
/*  定制样式 */
.coupon-style-1-3 {
  background: #fff3f5;
  color: #ff3d00;
  .coupon-item__price {
    width: 100%;
    height: 100%;
    display: flex;
  }
}
.coupon-style-1 {
  background: radial-gradient(circle at top, transparent 20rpx, #fff3f5 0) top
      right / 50% 50% no-repeat,
    radial-gradient(circle at bottom, transparent 20rpx, #fff3f5 0) bottom right /
      50% 50% no-repeat,
    radial-gradient(circle at left, transparent 0px, #fff3f5 0) bottom left /
      50% 100% no-repeat;
  position: relative;
  color: #ff3d00;
  .coupon-item__price {
    width: 75%;
    height: 100%;
    display: flex;
  }
  .coupon-item__button {
    box-sizing: border-box;
    padding: toRpx(10);
    width: 25%;
    height: 100%;
    display: flex;
    span {
      display: flex;
      line-height: toRpx(25);
      text-align: center; /*实现两端对齐*/
      word-break: break-all; /*允许在单词内换行*/
    }
  }
  &::before {
    top: 0;
    bottom: 0;
    content: '';
    margin: auto;
    position: absolute;
    right: calc(25% - 1rpx);
    height: calc(100% - 44rpx);
    border-left: #ff3d00 dashed 2rpx;
  }
}
.coupon-style-2,
.coupon-style-2-3,
.coupon-style-3 {
  background: radial-gradient(
        circle at left bottom,
        transparent 18rpx,
        #fff3f5 0
      )
      top left / 50% 50% no-repeat,
    radial-gradient(circle at left top, transparent 18rpx, #ff3d00 0) bottom
      left / 50% 50% no-repeat,
    radial-gradient(circle at right bottom, transparent 18rpx, #fff3f5 0) top
      right / 50% 50% no-repeat,
    radial-gradient(circle at right top, transparent 18rpx, #ff3d00 0) bottom
      right / 50% 50% no-repeat;
  position: relative;
  display: flex;
  flex-direction: column;
  .coupon-item__price {
    height: 50%;
    display: flex;
    color: #ff3d00;
  }
  .coupon-item__button {
    color: #fff;
    height: 50%;
    display: flex;
  }
}
.coupon-style-2-3 {
  background: radial-gradient(circle at left, transparent 18rpx, #fff3f5 0) top
      left / 50% 100% no-repeat,
    radial-gradient(circle at right, transparent 18rpx, #fff3f5 0) bottom right /
      50% 100% no-repeat;
  .coupon-item__button {
    span {
      padding: toRpx(4) toRpx(16);
      border-radius: toRpx(100);
      background: #ff3d00;
    }
  }
}
.coupon-style-3 {
  background: radial-gradient(
        circle at left 66.66%,
        transparent 20rpx,
        #e9d6ae 0
      )
      top left / 50% 100% no-repeat,
    radial-gradient(circle at right 66.66%, transparent 20rpx, #e9d6ae 0) bottom
      right / 50% 100% no-repeat;
  position: relative;
  .coupon-item__price {
    color: #a2731e;
    height: 66.66%;
  }
  .coupon-item__button {
    height: 33.33%;
    color: #5c400c;
  }
  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    bottom: 0;
    width: calc(100% - 44rpx);
    height: calc(33.33% - 0.8rpx);
    border-top: 2rpx dashed #fff;
  }
}
.coupon-style-4-1,
.coupon-style-4-2,
.coupon-style-4-3,
.coupon-style-4-4 {
  height: toRpx(120);
  position: relative;
  display: flex;
  flex-direction: column;
  background-size: 100% 100%;
  .coupon-item__price {
    display: flex;
    height: 66.66%;
    color: #bc0b2b;
  }
  .coupon-item__button {
    display: flex;
    height: 33.33%;
    color: #fff;
  }
}
.coupon-style-4-1 {
  background-image: url(https://client-static-1254212114.cos.ap-guangzhou.myqcloud.com/images/decorate-coupon-4-1.png);
}
.coupon-style-4-2 {
  background-image: url(https://client-static-1254212114.cos.ap-guangzhou.myqcloud.com/images/decorate-coupon-4-2.png);
}
.coupon-style-4-3 {
  background-image: url(https://client-static-1254212114.cos.ap-guangzhou.myqcloud.com/images/decorate-coupon-4-3.png);
}
.coupon-style-4-4 {
  background-image: url(https://client-static-1254212114.cos.ap-guangzhou.myqcloud.com/images/decorate-coupon-4-4.png);
}
</style>
