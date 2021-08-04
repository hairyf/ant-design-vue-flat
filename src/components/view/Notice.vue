<!--
 * @Author: Zhilong
 * @Date: 2021-04-02 10:51:38
 * @LastEditTime: 2021-05-11 19:26:40
 * @Description: 公告视图页
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div
    class="notice-container"
    :style="{
      background,
      padding,
    }"
  >
    <div
      class="u-flex u-p-b-16 u-p-t-16"
      :style="{
        boxSizing: 'content-box',
        height: '56rpx',
        borderRadius,
        background: colorStyle.color.subBackground,
      }"
    >
      <view-image
        v-if="componentStyle.noticeIconType === '自定义'"
        class="notice-letf-icon"
        :src="componentStyle.noticeImage"
        :size="28 * 2"
      />
      <view-image
        class="u-m-l-12"
        v-if="componentStyle.noticeIconType === '系统'"
        :class="iconClass"
        :src="$spliceStaticUrl(componentStyle.systemStyle)"
        :size="
          iconClass === 'notice-style-icon2'
            ? { width: 35 * 2, height: 28 * 2 }
            : iconClass === 'notice-style-icon3'
            ? { width: 44 * 2, height: 16 * 2 }
            : iconClass === 'notice-style-icon5'
            ? { width: 70 * 2, height: 16 * 2 }
            : iconClass === 'notice-style-icon6'
            ? { width: 36 * 2, height: 18 * 2 }
            : 28 * 2
        "
      />
      <div class="notice-letf-transition">
        <swiper
          :current="currentIndex"
          vertical
          circular
          disable-touch
          style="transform: rotateZ(180deg); height: 100%"
        >
          <swiper-item v-for="(item, index) in showValueList" :key="index">
            <link-controller :data="item.link">
              <span
                class="notice-letf-text"
                :style="{ color: colorStyle.color.text }"
                style="transform: rotateZ(180deg)"
              >
                {{ item.title }}
              </span></link-controller
            >
          </swiper-item>
        </swiper>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watch } from '@vue/composition-api';
import { noticeOption, linkOption } from 'orange-components-config/options';
import { useBackgroundColor, usePaddingRadius } from '@/hooks/use-view-style';
import { reqShopNotice } from '@/api';
export default defineComponent({
  props: {
    option: {
      type: Object as () => typeof noticeOption,
      required: true,
    },
  },
  setup(props) {
    // 导出配置为常量 供视图使用
    const { componentStyle, noticeContent, colorStyle } = props.option;
    // 使用hook获得基本样式
    const { padding, borderRadius } = usePaddingRadius(props.option);
    const { background } = useBackgroundColor(colorStyle);
    // 当前选择项
    const currentIndex = ref(0);
    // 显示的值 自定义显示自己添加的数据  读取商城公告需要接后台的接口
    const showValueList = ref<typeof noticeContent.custom>([]);
    // 获取商城公告
    const getNotice = async () => {
      const reqData = {
        limit: noticeContent.count,
        page: 1,
        order: 'id',
        sort: 'asc',
      };
      const { data } = await reqShopNotice(reqData);
      showValueList.value = data.data.data.map((i: any) => {
        return {
          title: i?.title || '',
          link: {
            ...linkOption,
            type: 'link',
            value: { path: i?.type === 2 ? i?.content?.shareLinks : '' },
          },
        };
      });
      if (showValueList.value?.length == 2) {
        showValueList.value = showValueList.value.concat(showValueList.value);
      }
    };
    if (noticeContent.content == '自定义') {
      if (noticeContent.custom.length == 2) {
        showValueList.value = noticeContent.custom.concat(noticeContent.custom);
      } else {
        showValueList.value = noticeContent.custom;
      }
    } else {
      getNotice();
    }
    // 设置定时器
    let tiemr: number;
    const setPlayInterVal = () => {
      clearInterval(tiemr);
      tiemr = setInterval(() => {
        if (currentIndex.value >= showValueList.value.length - 1) {
          currentIndex.value = 0;
        } else {
          currentIndex.value++;
        }
      }, props.option.colorStyle.speed * 1000);
    };
    // 监听速度产生变化时 清除定时器 并创建新的时间新的定时器
    watch(() => props.option.colorStyle.speed, setPlayInterVal, {
      immediate: true,
    });
    // 对应的class
    const iconClass = computed(
      () => componentStyle.systemStyle.split('.png')[0]
    );
    return {
      componentStyle,
      noticeContent,
      colorStyle,
      padding,
      borderRadius,
      background,
      currentIndex,
      iconClass,
      showValueList,
    };
  },
});
</script>
<style lang="scss" scoped>
.notice-letf-transition {
  overflow: hidden;
  position: relative;
  flex: 1;
  height: 100%;
  margin: 0 toRpx(10);
  .text-animation-enter-active {
    transition: 0.5s;
    top: toRpx(-30);
  }
  .text-animation-leave-active {
    transition: 0.5s;
    top: 0;
  }
  .text-animation-enter-to {
    top: 0;
  }
  .text-animation-leave-to {
    top: toRpx(30);
  }
  .notice-letf-text {
    font-size: toRpx(12);
    position: absolute;
    width: 100%;
    line-height: toRpx(28);
    align-items: center;
    @include text-ellipsis(100%);
  }
}

.notice-container {
  > div {
    .notice-letf-icon {
      background: #c4c4c4;
      margin-left: toRpx(10);
    }
  }
  .notice-style-icon1 {
    width: toRpx(28);
    height: toRpx(28);
  }
  .notice-style-icon2 {
    top: toRpx(-8);
  }
  .notice-style-icon3 {
    padding: toRpx(6) 0;
  }
  .notice-style-icon5 {
    padding: toRpx(6) 0;
  }
  .notice-style-icon6 {
    padding: toRpx(5) 0;
  }
}
</style>
