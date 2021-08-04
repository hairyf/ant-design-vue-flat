<!--
 * @Author: Zhilong
 * @Date: 2021-05-07 11:10:50
 * @LastEditTime: 2021-05-18 16:31:44
 * @Description: 全局广告
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div
    class="global-advertisement-container"
    v-if="advertisement.status && open"
  >
    <div class="global-advertisement-view">
      <swiper
        v-if="advertisement.style === 'board'"
        class="size-max"
        circular
        :autoplay="advertisement.autoCarousel"
        :interval="advertisement.autoInterval * 1000 || 3000"
      >
        <swiper-item
          class="size-max advertisement-div"
          v-for="(item, key) in advertisement.images"
          :key="key"
          :style="{
            backgroundImage: `url(${item.image})`,
          }"
          @click.stop="$handleLink(item.link)"
        >
        </swiper-item>
      </swiper>
      <div
        v-else
        class="size-square advertisement-div"
        :style="{ backgroundImage: `url(${advertisement.images[0].image})` }"
        @click.stop="$handleLink(advertisement.images[0].link)"
      >
        <div class="view-relative">
          <div
            class="view-time-down"
            v-if="advertisement.close"
            @click.stop="onClose"
            :style="{ top: '26rpx' }"
          >
            关闭
          </div>
          <div class="view-time-down" :style="{ top: '26rpx' }" v-else>
            {{ downTime }} 秒后关闭
          </div>
        </div>
      </div>
      <template v-if="advertisement.style === 'board'">
        <div
          class="view-time-down"
          v-if="advertisement.close"
          @click.stop="onClose"
          :style="{ top: topSize + 'rpx' }"
        >
          关闭
        </div>
        <div class="view-time-down" :style="{ top: topSize + 'rpx' }" v-else>
          {{ downTime }} 秒后关闭
        </div>
      </template>
    </div>

    <!-- 兼容ios部分机型  -->
    <div class="u-fixed-placeholder safe-area-inset-bottom" />
    <!-- 兼容H5  -->
    <!-- <uni-page-head>
      <div
        class="uni-page-head"
        style="position: relative; background-color: #0000"
      />
    </uni-page-head> -->
  </div>
</template>
<script lang="ts">
import store from '@/store';
import { PLATFORM } from '@/utils';
import { computed, defineComponent, ref } from '@vue/composition-api';
import dayjs from 'dayjs';
export default defineComponent({
  setup(props, context) {
    const advertisement = computed(() => store.state.common.advertisement);
    const downTime = ref(Number(advertisement.value.timingClose) || 0);
    const open = ref(false);
    // 判断是否开启倒计时
    if (!advertisement.value.close && advertisement.value.status) {
      setTimeout(() => {
        // 因为可能加载慢 所以延迟半秒开始倒计时(主要因为竞品这样..)
        const timeout = setInterval(() => {
          downTime.value = downTime.value - 1;
          if (downTime.value <= 0) {
            // 倒计时出口
            clearInterval(timeout);
            open.value = false;
            context.emit('advertisementClose', true);
          }
        }, 1000);
      }, 500);
    }

    let menuButtoninfo = { bottom: 0 };
    if (PLATFORM === 'mp-weixin') {
      menuButtoninfo = uni.getMenuButtonBoundingClientRect();
    }
    const topSize = menuButtoninfo.bottom * 2 + 26;

    // 查看显示
    /**
     * @description 查询/写入显示
     * 1.查看是否允许显示
     * a.仅首次 advertisement的ID不相同 可以显示
     * -> 要求开屏页面不作为
     * -> 商户端 每次修改advertisement重新刷新ID
     *
     * b.每次显示 advertisement的内容为空 可以显示
     * -> 要求开屏页面 如果是每次显示清空advertisement
     *
     * c.间隔显示 advertisement的时间戳小于当前时间戳
     * -> 要求当前页面显示广告后 更新新的时间戳
     */
    const info = uni.getStorageSync('advertisement');
    switch (advertisement.value.showForm) {
      case '仅首次': {
        if (info?.id !== advertisement.value.id) {
          uni.setStorageSync('advertisement', { id: advertisement.value.id });
          open.value = true;
        }
        break;
      }
      case '每次': {
        if (info?.id === undefined) {
          uni.setStorageSync('advertisement', { id: advertisement.value.id });
          open.value = true;
        }
        break;
      }
      case '时间间隔': {
        if (
          info?.showTime === undefined ||
          info?.showTime <= dayjs().unix() ||
          info?.id !== advertisement.value.id
        ) {
          uni.setStorageSync('advertisement', {
            showTime: dayjs().unix() + advertisement.value.interval * 60,
            id: advertisement.value.id,
          });
          open.value = true;
        }
        break;
      }
    }

    // 手动关闭事件
    const onClose = () => {
      open.value = false;
      context.emit('advertisementClose', true);
    };

    console.log(
      advertisement.value,
      `advertisement.value => ${advertisement.value}`
    );

    return {
      advertisement,
      downTime,
      onClose,
      open,
      topSize,
    };
  },
});
</script>
<style lang="scss" scoped>
.global-advertisement-container {
  width: 100%;
  height: 100%;
  z-index: 1000;
  top: 0;
  position: fixed;
  display: flex;
  flex-direction: column;
  .global-advertisement-view {
    position: relative;
    flex: 1;
    background-color: #000a;
    .advertisement-div {
      background-size: cover;
      background-position: center center;
    }
  }
  .view-relative {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .view-time-down {
    position: absolute;
    right: toRpx(13);
    font-size: toRpx(12);
    padding: toRpx(3) toRpx(12);
    line-height: toRpx(18);
    background: rgba(0, 0, 0, 0.2);
    border-radius: toRpx(14);
    cursor: pointer;
    color: #fff;
  }
}
.size-max {
  width: 100%;
  height: 100%;
  position: absolute;
}
.size-square {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 80%;
  height: 66%;
  border-radius: toRpx(10);
  position: absolute;
}
.view-container {
  margin-top: toRpx(82);
  margin-bottom: toRpx(82);
  position: relative;
}
</style>
