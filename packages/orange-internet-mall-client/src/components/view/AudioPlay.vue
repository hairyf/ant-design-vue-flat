<!--
 * @Author: Zhilong
 * @Date: 2021-04-23 19:19:15
 * @LastEditTime: 2021-05-12 10:12:11
 * @Description: 音频视图区
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div
    class="audio-play-container"
    :style="{
      padding,
      background,
    }"
  >
    <div class="audio-play-view" @click="alterPlayState">
      <div
        class="type-select-view"
        :style="{
          borderRadius,
          borderColor: colorStyle.color.border,
          backgroundColor: colorStyle.color.subBackground,
        }"
      >
        <!-- 样式one -->
        <div
          class="audio-style-one-view"
          v-if="componentStyle.styleType === 'styleOne'"
        >
          <div>
            <span
              style="font-size: 28rpx; margin-right: 20rpx; color: #000"
              :style="{ color: colorStyle.color.title }"
            >
              {{ contentEdit.text }}
            </span>
            <span
              style="font-size: 24rpx; color: #8c8c8c"
              :style="{ color: colorStyle.color.subTitle }"
            >
              {{ contentEdit.subText }}
            </span>
          </div>
          <view-icon
            v-if="playStatus"
            name="oe-suspend"
            :style="{ color: colorStyle.color.btn }"
          />
          <view-icon
            v-else
            name="oe-play"
            :style="{ color: colorStyle.color.btn }"
          />
        </div>
        <!-- 样式two-->
        <div
          class="audio-style-two-view"
          v-if="componentStyle.styleType === 'styleTwo'"
        >
          <div class="u-flex">
            <div class="view-play-image">
              <view-image :size="20 * 2" :src="$spliceStaticUrl('play.png')" />
            </div>
            <div style="line-height: 46rpx; margin-left: 28rpx">
              <div
                style="font-size: 28rpx; margin-right: 20rpx; color: #000"
                :style="{ color: colorStyle.color.title }"
              >
                {{ option.contentEdit.text }}
              </div>
              <div
                style="font-size: 24rpx; color: #8c8c8c"
                :style="{ color: colorStyle.color.subTitle }"
              >
                {{ option.contentEdit.subText }}
              </div>
            </div>
          </div>
          <div style="font-size: 24rpx; color: #8c8c8c; margin-right: 42rpx">
            {{ surplusTime }}
          </div>
        </div>
        <!-- 样式three -->
        <div
          class="audio-style-one-view"
          v-if="option.componentStyle.styleType === 'styleThree'"
        >
          <div>
            <span
              style="font-size: 28rpx; margin-right: 20rpx; color: #000"
              :style="{ color: colorStyle.color.title }"
            >
              {{ option.contentEdit.text }}
            </span>
            <span
              style="font-size: 24rpx; color: #8c8c8c"
              :style="{ color: colorStyle.color.subTitle }"
            >
              {{ option.contentEdit.subText }}
            </span>
          </div>
          <div style="font-size: 24rpx; color: #8c8c8c; margin-right: 42rpx">
            {{ surplusTime }}
          </div>
          <!-- 加载条线 -->
          <div
            :style="{ width: `${durationOfPercentage}%` }"
            class="audio-progress-bar"
          />
        </div>
        <!-- 样式four-->
        <div
          class="audio-style-two-view"
          v-if="option.componentStyle.styleType === 'styleFour'"
        >
          <div class="u-flex">
            <div class="view-play-image" />
            <div style="line-height: 36rpx; margin-left: 28rpx">
              <div
                style="font-size: 28rpx; margin-right: 20rpx; color: #000"
                :style="{ color: colorStyle.color.title }"
              >
                {{ option.contentEdit.text }}
              </div>
              <div
                style="font-size: 24rpx; color: #8c8c8c"
                :style="{ color: colorStyle.color.subTitle }"
              >
                {{ option.contentEdit.subText }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';
import { audioPlayOption } from 'orange-components-config/options';
import { useBackgroundColor, usePaddingRadius } from '@/hooks/use-view-style';
import dayjs from 'dayjs';
export default defineComponent({
  props: {
    option: {
      type: Object as () => typeof audioPlayOption,
      required: true,
    },
  },
  setup(props) {
    //导出配置为常量 供视图使用
    const { componentStyle, colorStyle, contentEdit } = props.option;
    const { background } = useBackgroundColor(colorStyle);
    const { padding, borderRadius } = usePaddingRadius(props.option);
    // 音频时长百分比
    const durationOfPercentage = ref<number | string>(0);
    // 音频时长(总时间)
    const duration = ref(0);
    // 音频时长
    const durationTime = ref('');
    // 当前进度
    const currentTime = ref('');
    // 播放状态
    const playStatus = ref(true);

    const innerAudioContext = uni.createInnerAudioContext();
    innerAudioContext.autoplay = true;
    innerAudioContext.src = props.option.contentEdit.audio;
    // 音频加载完毕 开始进行...
    innerAudioContext.onCanplay(() => {
      duration.value = Number(innerAudioContext.duration.toFixed(0));
      // 创建时间对象
      const date = dayjs((duration.value + 60 * 60 * 16) * 1000);
      // 时长
      durationTime.value = date.format('mm:ss');
      setTimeout(() => {
        // 播放状态
        playStatus.value = !innerAudioContext.paused;
      }, 50);
    });

    // 剩余时长
    const surplusTime = computed(() => {
      if (!(duration.value >= 0 && +currentTime.value >= 0)) return '';
      // 创建时间对象
      const date = dayjs(
        (duration.value - +currentTime.value + 60 * 60 * 16) * 1000
      );
      return date.format('mm:ss');
    });

    let timeOut: number;
    // 修改播放状态
    const alterPlayState = () => {
      playStatus.value = innerAudioContext.paused;
      if (innerAudioContext.paused) {
        timeOut = setInterval(() => {
          currentTime.value = innerAudioContext.currentTime?.toFixed(0);
          durationOfPercentage.value =
            Number(currentTime.value) * (100 / +duration.value);
        }, 100);
        innerAudioContext.play();
      } else {
        clearInterval(timeOut);
        innerAudioContext.pause();
      }
    };

    return {
      componentStyle,
      colorStyle,
      contentEdit,
      background,
      padding,
      borderRadius,
      duration,
      alterPlayState,
      currentTime,
      durationTime,
      surplusTime,
      durationOfPercentage,
      playStatus,
    };
  },
});
</script>
<style lang="scss" scoped>
.audio-play-container {
  .audio-play-view {
    .type-select-view {
      display: flex;
      width: 100%;
      align-items: center;
      box-sizing: border-box;
      background: #ffffff;
      border: toRpx(1) solid #d9d9d9;
      overflow: hidden;

      .audio-style-one-view {
        position: relative;
        align-items: center;
        display: flex;
        padding: toRpx(15);
        flex: 1;
        justify-content: space-between;
        box-sizing: border-box;
        .audio-progress-bar {
          position: absolute;
          height: toRpx(2);
          left: 0;
          bottom: 0;
          background-color: #000000;
          transition: 1.1s linear;
        }
      }
      .audio-style-two-view {
        display: flex;
        flex: 1;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        .view-play-image {
          width: toRpx(62);
          height: toRpx(62);
          background: #c4c4c4;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
}
</style>
