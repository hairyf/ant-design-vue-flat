<!--
 * @Author: Zhilong
 * @Date: 2021-04-23 19:19:15
 * @LastEditTime: 2021-05-12 18:09:42
 * @Description: 导购视图区
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div
    class="shopping-guide-container"
    :style="{
      boxShadow,
      border,
      padding,
    }"
  >
    <div
      class="shopping-guide-view u-flex"
      @click="onHandleEffect"
      :style="{ borderRadius }"
    >
      <view-image :size="80 * 2" :src="option.contentEdit.image" />
      <div class="content u-flex-1 u-flex u-m-l-10">
        <div
          class="title u-m-b-5"
          :style="{ color: option.contentEdit.color.background }"
        >
          {{ option.contentEdit.title }}
        </div>
        <div
          class="tips u-flex-1"
          :style="{ color: option.contentEdit.color.subBackground }"
        >
          {{ option.contentEdit.subTitle }}
        </div>
        <div class="tips">
          {{ option.contentEdit.contactName }}：
          {{ option.contentEdit.contactContent }}
        </div>
      </div>
      <div
        class="button"
        v-if="option.contentEdit.btnText"
        :style="{
          color: option.contentEdit.color.text,
          backgroundColor: option.contentEdit.color.btn,
        }"
      >
        {{ option.contentEdit.btnText }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { shoppingGuideOption } from 'orange-components-config/options';
import { makePhoneCall } from '@/utils';
import {
  usePaddingRadius,
  useComponentModalStyle,
} from '@/hooks/use-view-style';
import { PLATFORM } from '@/utils';
import { setClipboardData } from 'uni-clipboard';
export default defineComponent({
  props: {
    option: {
      type: Object as () => typeof shoppingGuideOption,
      required: true,
    },
  },
  setup(props) {
    const { componentStyle } = props.option;
    const { padding, borderRadius } = usePaddingRadius(props.option);
    const { boxShadow, border } = useComponentModalStyle(componentStyle);

    // 处理点击效果
    const onHandleEffect = async () => {
      if (props.option.effect.value === '复制联系方式') {
        await setClipboardData(props.option.contentEdit.contactContent);
        uni.hideToast();
        uni.showToast({ title: '已复制联系方式!' });
        return false;
      }
      if (props.option.effect.value === '拨打联系方式') {
        makePhoneCall(props.option.contentEdit.contactContent);
        return false;
      }
      if (props.option.effect.value === '放大浏览图片') {
        uni.previewImage({
          urls: [props.option.contentEdit.image],
        });
        return false;
      }
      if (props.option.effect.value === '保存图片') {
        if (PLATFORM === 'h5') {
          uni.showToast({ title: '长按图片保存', icon: 'none' });
          return false;
        }
        uni.getImageInfo({
          src: props.option.contentEdit.image,
          success: (value) => {
            uni.saveImageToPhotosAlbum({
              filePath: value.path,
            });
          },
        });

        return false;
      }
    };
    return {
      componentStyle,
      padding,
      borderRadius,
      boxShadow,
      border,
      onHandleEffect,
    };
  },
});

//导出配置为常量 供视图使用
</script>
<style lang="scss" scoped>
.shopping-guide-container {
  .shopping-guide-view {
    position: relative;
    padding: toRpx(15) toRpx(13);
    background-color: #ffffff;
  }
  .title {
    font-size: toRpx(14);
  }
  .tips {
    font-size: toRpx(12);
    color: #acacac;
  }
  .content {
    height: toRpx(80);
    flex-direction: column;
    align-items: flex-start;
  }
  .button {
    position: absolute;
    padding: toRpx(6) toRpx(8);
    bottom: toRpx(10);
    right: 0;
    background: #ff3d00;
    border-radius: toRpx(15) toRpx(15) toRpx(15) toRpx(1);
    font-size: toRpx(12);
  }
}
</style>
