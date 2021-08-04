<!--
 * @Author: Zhilong
 * @Date: 2021-04-10 10:14:03
 * @LastEditTime: 2021-05-11 20:02:56
 * @Description: 按钮组 视图区
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div
    class="button-group-container"
    :style="{
      padding,
      background,
      boxShadow,
      border,
    }"
  >
    <div
      :style="{
        backgroundColor: option.colorStyle.color.btn,
        borderRadius,
      }"
    >
      <swiper
        v-if="componentStyle.styleType === '分页滑动'"
        :style="{
          height: '180rpx',
          flexWrap: 'wrap',
          position: 'relative',
        }"
        @change="swiperChange"
      >
        <!-- 内容 -->
        <swiper-item v-for="(v, k) of maxPage" :key="k" class="u-flex">
          <link-controller
            v-for="(item, i) in contentEdit.slice(
              k * componentStyle.lineNumber,
              (k + 1) * componentStyle.lineNumber
            )"
            :key="i"
            :data="item.link"
          >
            <div
              style="align-items: center; position: relative"
              :style="{
                minWidth: `${100 / componentStyle.lineNumber}%`,
              }"
              class="content-item-view u-flex-col u-m-b-20 u-m-t-20"
            >
              <!-- 图片 -->
              <view-image
                v-if="
                  componentStyle.buttonStyle !== 't' &&
                  componentStyle.buttonType !== '图标'
                "
                :size="45 * 2"
                :empty-type="1"
                :src="item.image"
                :border-radius="
                  componentStyle.buttonShape === 'circular'
                    ? '50%'
                    : componentStyle.buttonShape === 'fillet'
                    ? 'toRpx(5)'
                    : ''
                "
              >
                <!-- 标签.. -->
                <div
                  v-if="
                    item.labelOption && componentStyle.buttonType === '图片'
                  "
                  class="item-label-item"
                  :style="{ backgroundColor: item.color.subBackground }"
                >
                  <div
                    :style="{
                      backgroundImage: `url(${$spliceStaticUrl('fire.png')})`,
                    }"
                  />
                  <span :style="{ color: item.color.label }">{{
                    item.label
                  }}</span>
                </div>
              </view-image>
              <!-- 图标 -->
              <div
                class="item-icon-view"
                v-else-if="componentStyle.buttonStyle !== 't'"
              >
                <view-icon
                  :name="item.icon"
                  class="item-icon-item"
                  :style="{
                    color: option.colorStyle.color.icon,
                    borderStyle: item.icon ? 'none' : '',
                  }"
                />
              </div>
              <!-- 间隔 -->
              <div
                class="u-m-b-24"
                v-if="componentStyle.buttonStyle === 'i+t'"
              />
              <div
                v-if="componentStyle.buttonStyle !== 'i'"
                :style="{ color: item.color.title }"
              >
                {{ item.title }}
              </div>
            </div>
          </link-controller>
        </swiper-item>
      </swiper>
      <div
        v-else
        :style="{
          overflow: componentStyle.styleType === '单行滑动' ? 'auto' : 'hidden',
          flexWrap: componentStyle.styleType !== '固定显示' ? 'nowrap' : 'wrap',
          zIndex: componentStyle.styleType !== '固定显示' ? 2 : 0,
          position: 'relative',
          backgroundColor: option.colorStyle.color.btn,
          borderRadius,
        }"
      >
        <!-- 内容 -->
        <div
          class="content-item-view u-m-b-20 u-m-t-20"
          v-for="item in contentEdit"
          :style="{
            minWidth: `${100 / componentStyle.lineNumber}%`,
          }"
          :key="item.CACHE_KEY_LIST"
        >
          <link-controller :data="item.link" class="son-div">
            <!-- 图片 -->
            <view-image
              v-if="
                componentStyle.buttonStyle !== 't' &&
                componentStyle.buttonType !== '图标'
              "
              :size="45 * 2"
              :empty-type="1"
              :src="item.image"
              :border-radius="
                componentStyle.buttonShape === 'circular'
                  ? '50%'
                  : componentStyle.buttonShape === 'fillet'
                  ? 'toRpx(5)'
                  : ''
              "
            >
              <!-- 标签.. -->
              <div
                v-if="item.labelOption && componentStyle.buttonType === '图片'"
                class="item-label-item"
                :style="{ backgroundColor: item.color.subBackground }"
              >
                <div
                  :style="{
                    backgroundImage: `url(${$spliceStaticUrl('fire.png')})`,
                  }"
                />
                <span :style="{ color: item.color.label }">{{
                  item.label
                }}</span>
              </div>
            </view-image>
            <!-- 图标 -->
            <div
              class="item-icon-view"
              v-else-if="componentStyle.buttonStyle !== 't'"
            >
              <view-icon
                :name="item.icon"
                class="item-icon-item"
                :style="{
                  color: option.colorStyle.color.icon,
                  borderStyle: item.icon ? 'none' : '',
                }"
              />
            </div>
            <!-- 间隔 -->
            <div class="u-m-b-24" v-if="componentStyle.buttonStyle === 'i+t'" />
            <div
              v-if="componentStyle.buttonStyle !== 'i'"
              :style="{ color: item.color.title }"
              style="text-align: center"
            >
              {{ item.title }}
            </div>
          </link-controller>
        </div>
      </div>
      <div
        class="switch-paging-sopt-view"
        v-if="componentStyle.styleType === '分页滑动'"
      >
        <div
          class="switch-paging-sopt"
          v-for="(v, i) of maxPage"
          :key="v"
          :style="{ opacity: currentShowPage === i ? 1 : 0.2 }"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { buttonGroupOption } from 'orange-components-config/options';
import { computed, defineComponent, ref } from '@vue/composition-api';

import {
  useBackgroundColor,
  usePaddingRadius,
  useComponentModalStyle,
} from '@/hooks/use-view-style';
export default defineComponent({
  props: {
    option: {
      type: Object as () => typeof buttonGroupOption,
      required: true,
    },
  },
  setup(props) {
    // 导出配置为常量 供视图使用
    const { componentStyle, contentEdit } = props.option;
    // 使用hook获得基本配置
    const { padding, borderRadius } = usePaddingRadius(props.option);
    const { background } = useBackgroundColor(props.option.colorStyle);
    const { boxShadow, border } = useComponentModalStyle(
      props.option.componentStyle
    );
    // 可以分多少页
    const maxPage = computed(() =>
      Math.ceil(contentEdit.length / componentStyle.lineNumber)
    );
    // 当前显示页
    const currentShowPage = ref(0);
    // 切换分页点
    const swiperChange = (e: any) => (currentShowPage.value = e.detail.current);

    return {
      componentStyle,
      contentEdit,
      padding,
      borderRadius,
      background,
      boxShadow,
      border,
      currentShowPage,
      maxPage,
      swiperChange,
    };
  },
});
</script>
<style lang="scss" scoped>
.button-group-container {
  display: flex;
  flex-direction: column;
  > div > div {
    overflow: hidden;
    flex-wrap: wrap;
    display: flex;
    /* 内容视图 */
    .content-item-view {
      display: flex;
      justify-content: center;

      .son-div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: toRpx(12);
        // overflow: hidden;
        position: relative;
      }
    }
    /* 分页按钮 */
    .switch-paging-view {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      &:hover .s-view {
        transition: 0.3s opacity;
        opacity: 1;
      }
      .s-view {
        opacity: 0;
        position: absolute;
        top: 0;
        bottom: 0;
        width: toRpx(32);
        height: toRpx(32);
        margin: auto;
        background-color: #0005;
        z-index: 5;
        display: flex;
        justify-content: center;
        line-height: toRpx(32);
        font-size: toRpx(20);
        border-radius: 50%;
        color: #fff;
      }

      .s-left {
        left: toRpx(5);
      }
      .s-right {
        right: toRpx(5);
      }
    }
  }
  .switch-paging-sopt-view {
    display: flex;
    justify-content: center;
    flex: 1;
    padding-bottom: toRpx(12);
    .switch-paging-sopt {
      margin: 0 toRpx(4);
      width: toRpx(5);
      height: toRpx(5);
      background-color: rgba(0, 0, 0);
      opacity: 0.2;
      border-radius: 50%;
    }
  }
  .buttonStyle {
    width: toRpx(45);
    height: toRpx(45);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item-icon-view {
    .item-icon-item {
      display: block;
      border: toRpx(1) dashed rgb(217, 217, 217);
      width: toRpx(25);
      height: toRpx(25);
      font-size: toRpx(25);
    }
  }
  .item-label-item {
    position: absolute;
    align-items: center;
    display: flex;
    height: toRpx(13);
    top: 0;
    padding: 0 toRpx(5);
    left: 75%;
    border-radius: toRpx(7) 0 toRpx(7) 0;
    > div {
      width: toRpx(6);
      height: toRpx(7);
      background-size: cover;
      margin-right: toRpx(3);
    }
    > span {
      line-height: toRpx(12);
      font-size: 5pt;
      zoom: 0.6;
      white-space: nowrap;
    }
  }
}
</style>
