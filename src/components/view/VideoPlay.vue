<!--
 * @Author: Zhilong
 * @Date: 2021-04-23 19:19:15
 * @LastEditTime: 2021-05-12 18:06:52
 * @Description: 视频播放视图区
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div
    class="video-play-container"
    :style="{
      boxShadow,
      border,
      padding,
      background,
    }"
  >
    <div
      class="video-play-view"
      :style="{ height: `${contentHeight * 2}rpx` }"
      @click="videoClick"
    >
      <video
        :id="videoId"
        :show-center-play-btn="false"
        :enable-progress-gesture="false"
        :style="{
          width: '100%',
          height: '100%',
          borderRadius,
        }"
        :src="option.addVideo.video"
        :poster="option.addVideo.image"
        :controls="false"
        @play="videoStatus = true"
        @pause="videoStatus = false"
        :object-fit="showImage ? 'cover' : 'contain'"
      />
      <div class="video-popup" v-if="!videoStatus">
        <image class="play-image" :src="$spliceStaticUrl('play.png')" alt="" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';
import { videoPlayOption } from 'orange-components-config/options';
import {
  useBackgroundColor,
  usePaddingRadius,
  useComponentModalStyle,
} from '@/hooks/use-view-style';
export default defineComponent({
  props: {
    option: {
      type: Object as () => typeof videoPlayOption,
      required: true,
    },
  },
  methods: {
    videoClick() {
      const video = uni.createVideoContext(this.videoId, this);
      this.videoStatus ? video?.pause() : video?.play();
      this.showImage = false;
    },
  },
  setup(props) {
    //导出配置为常量 供视图使用
    const { componentStyle, colorStyle } = props.option;
    const { background } = useBackgroundColor(colorStyle);
    const { padding, borderRadius } = usePaddingRadius(props.option);
    const { boxShadow, border } = useComponentModalStyle(componentStyle);
    const videoId = Math.random().toString(36) + 'videoId';
    const videoStatus = ref(false);
    const showImage = ref(true);
    const contentHeight = computed(() => {
      const proportion = props.option.addVideo.proportion;
      if (proportion === '1:1') {
        return 375;
      } else if (proportion === '4:3') {
        return 281;
      }
      return 211;
    });
    return {
      componentStyle,
      colorStyle,
      padding,
      borderRadius,
      background,
      boxShadow,
      border,
      contentHeight,
      videoStatus,
      videoId,
      showImage,
    };
  },
});
</script>
<style lang="scss" scoped>
/* ::v-deep .uni-video-container {
  background-color: #0000;
} */
.video-play-view {
  position: relative;
  .video-popup {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
  }
  .play-image {
    position: absolute;
    width: toRpx(56);
    height: toRpx(56);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
  .background-image {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
}
</style>
