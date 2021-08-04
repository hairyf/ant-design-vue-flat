<!--
 * @Author: Zhilong
 * @Date: 2021-04-09 14:47:43
 * @LastEditTime: 2021-04-14 11:00:52
 * @Description: 不同效果的文字展示
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div class="text-container" :style="{ justifyContent: alignCenter }">
    <!-- 中心文字类 -->
    <div class="center-text" v-if="type === 1">
      <div class="type-one" :style="{ borderColor: color }" />
      <slot />
      <div class="type-one" :style="{ borderColor: color }" />
    </div>
    <div class="center-text" style="margin: 0 -20rpx" v-if="type === 6">
      <div
        class="type-six"
        style="right: -20rpx"
        :style="{ backgroundColor: color }"
      />
      <div
        class="b-w-1-s"
        style="padding: 10rpx 8rpx"
        :style="{ borderColor: color }"
      >
        <div
          class="b-w-1-s"
          style="padding: 0 12rpx"
          :style="{ borderColor: color }"
        >
          <slot />
        </div>
      </div>
      <div
        class="type-six"
        style="left: -20rpx"
        :style="{ backgroundColor: color }"
      />
    </div>
    <div class="center-text" v-if="type === 7">
      <div class="type-seven">
        <div class="before" :style="{ borderColor: color }" />

        <slot />
        <div class="after" :style="{ borderColor: color }" />
      </div>
    </div>
    <div class="center-text" v-if="type === 8">
      <div class="type-eight" :style="{ borderColor: color }">
        <div class="before" :style="{ backgroundColor: color }">
          <slot />
        </div>
      </div>
    </div>
    <!-- 左边文字类 -->
    <div class="left-text" v-if="type === 3">
      <div class="before" :style="{ backgroundColor: color }" />
      <slot />
    </div>
    <!-- 上面文字类 -->
    <div class="top-text" v-if="type === 2">
      <div>
        <slot />
        <div class="type-two" :style="{ backgroundColor: color }">
          <div class="after" :style="{ borderTopColor: color }" />
        </div>
      </div>
    </div>
    <div class="top-text" v-if="type === 4">
      <div>
        <slot />
        <div class="type-four" :style="{ backgroundColor: color }">
          <div class="after" :style="{ backgroundColor: color }" />
        </div>
      </div>
    </div>
    <div class="top-text" v-if="type === 5">
      <div>
        <slot />
        <div class="type-five">
          <div class="line" :style="{ backgroundColor: color }" />
          <div class="diamond" :style="{ borderColor: color }" />
          <div class="line" :style="{ backgroundColor: color }" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';
export default defineComponent({
  props: {
    type: Number,
    color: {
      type: String,
      default: '#333',
    },
    align: {
      type: String,
      default: 'center',
    },
  },
  setup(props) {
    const alignCenter = computed(() =>
      props.align === 'left'
        ? 'flex-start'
        : props.align === 'right'
        ? 'flex-end'
        : props.align
    );
    return {
      alignCenter,
    };
  },
});
</script>

<style lang="scss" scoped>
.b-w-1 {
  border-width: toRpx(1);
}
.b-w-1-s {
  border-width: toRpx(1);
  border-style: solid;
}

.text-container {
  display: flex;
  flex: 1;
  align-items: center;
  /* 中心文字类 */
  .center-text {
    display: flex;
    align-items: center;
    justify-content: center;
    .type-one {
      width: toRpx(30);
      height: 0;
      border-top: toRpx(1) solid #000;
      top: toRpx(-0.5);
    }
    .type-six {
      position: relative;
      width: toRpx(40);
      height: toRpx(5);
      background-color: #000;
    }
    .type-eight {
      margin: toRpx(6) 0 0 toRpx(6);
      border: toRpx(1) solid #000;

      .before {
        color: #fff;
        position: relative;
        left: toRpx(-4);
        top: toRpx(-4);
      }
    }

    .type-seven {
      margin: toRpx(6);
      position: relative;
      .after {
        position: absolute;
        left: toRpx(-5);
        top: toRpx(-5);
        right: toRpx(0);
        bottom: toRpx(0);
        border: toRpx(1) solid #000;
      }
      .before {
        position: absolute;
        left: toRpx(0);
        top: toRpx(0);
        right: toRpx(-5);
        bottom: toRpx(-5);
        border: toRpx(1) solid #000;
      }
    }
  }
  /* 左边文字类 */
  .left-text {
    display: flex;
    align-items: center;
    .before {
      width: toRpx(2);
      height: toRpx(12);
      padding: toRpx(2) 0;
    }
  }
  /* 上方文字类 */
  .top-text {
    display: flex;
    flex: 1;
    justify-content: center;
    > div {
      width: 100%;
      text-align: center;
    }
    .type-two {
      position: relative;
      display: flex;
      flex: 1;
      background-color: #000;
      height: toRpx(1);
      margin-bottom: toRpx(7);
      .after {
        content: '';
        position: absolute;
        width: 0;
        left: 0;
        right: 0;
        margin: auto;
        border-top: toRpx(7) solid #000;
        border-left: toRpx(6) solid transparent;
        border-right: toRpx(6) solid transparent;
      }
    }
    .type-four {
      display: flex;
      flex: 1;
      background-color: #000;
      height: toRpx(1);
      margin-top: toRpx(3);
      position: relative;
      .after {
        content: '';
        position: absolute;
        width: 45%;
        height: toRpx(2.5);
        top: toRpx(-2.5);
        left: 0;
        right: 0;
        margin: auto;
        background-color: #000;
      }
    }
    .type-five {
      display: flex;
      flex: 1;
      align-items: center;
      .line {
        height: toRpx(1);
        background-color: #000;
        display: flex;
        flex: 1;
      }
      .diamond {
        margin: toRpx(2.5) toRpx(20);
        width: toRpx(9);
        height: toRpx(9);
        border: toRpx(1) solid #333333;
        box-sizing: border-box;
        transform: rotate(45deg);
      }
    }
  }
}
</style>
