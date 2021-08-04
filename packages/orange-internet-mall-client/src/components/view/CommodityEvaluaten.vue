<!--
 * @Author: Zhilong
 * @Date: 2021-04-21 09:55:04
 * @LastEditTime: 2021-05-12 19:03:42
 * @Description: 商品评价 视图区
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div class="commodity-evaluaten-container" :style="{ padding, background }">
    <div class="commodity-evaluaten-view">
      <!-- 头部 评价数量和更多 -->
      <div class="evaluaten-header-view">
        <!-- 评价数量 -->
        <div class="u-f-s-30" :style="{ color: colorStyle.color.title }">
          <span class="u-m-r-10">用户评价</span>
          <span class="u-f-s-26" style="color: #999">
            ({{ showData.count }})
          </span>
        </div>
        <div
          class="u-f-s-26"
          :style="{ color: colorStyle.color.btn }"
          @click="onSeeAllEvaluaten"
          v-if="showData.count > option.showSetting.evaluateNum"
        >
          <span class="u-m-r-12"> 查看更多</span>
          <view-icon name="oe-arrow-right" style="color: #9f9f9f" />
        </div>
      </div>
      <!-- 头部 满意度 -->
      <div
        class="u-f-s-20 u-m-t-4"
        style="color: #999"
        v-if="showData.satisfaction && showData.count != 0"
      >
        {{ showData.satisfaction }}% 满意度
      </div>
      <!-- 用户评价 -->
      <div
        class="evaluaten-content"
        v-for="(item, key) of showData.list"
        :key="key"
      >
        <!-- 用户信息 和评价分数 -->
        <div class="content-user-header u-flex u-row-between">
          <div class="content-user-info u-flex u-row-between">
            <view-image
              :size="24 * 2"
              :empty-type="1"
              border-radius="50%"
              class="u-m-r-10"
              :src="item.user.avatar"
            />
            <span
              class="u-m-r-10 u-f-s-26"
              :style="{ color: colorStyle.color.subTitle }"
            >
              {{ item && item.user && item.user.nickname }}
            </span>
            <!-- 会员标识 -->
            <div
              class="user-member"
              :style="{ backgroundColor: colorStyle.color.icon + '88' }"
            >
              <image
                class="u-m-r-8"
                :src="$spliceStaticUrl('member-label-1.png')"
                style="width: 22rpx; height: 22rpx"
              />
              <span class="u-f-s-20" :style="{ color: colorStyle.color.icon }">
                {{ item.user.current_shop_user_level_name || '默认等级' }}
              </span>
            </div>
          </div>
          <div>
            <u-rate
              :value="item.score"
              disabled
              inactive-color="#eee"
              :active-color="colorStyle.color.subIcon"
            />
          </div>
        </div>
        <!-- 购买信息 -->
        <div class="u-f-s-16 u-m-t-16" style="color: #999">
          {{ item.createtime }} {{ item.style_name }}
        </div>
        <!-- 用户评价 -->
        <div
          class="content-evaluaten-info"
          :style="{ color: colorStyle.color.text }"
        >
          {{ item.content }}
        </div>
        <!-- 图片展示 -->
        <div class="content-evaluaten-image">
          <div class="u-p-4" v-for="i in item.images" :key="i">
            <view-image
              :size="83 * 2"
              border-radius="5px"
              :src="i"
              @click="lookBigImage(item.images)"
            />
          </div>
        </div>
        <!-- 分割线 -->
        <div
          class="u-m-t-28"
          style="height: 2rpx"
          :style="{ backgroundColor: colorStyle.color.line }"
          v-if="key !== showSetting.evaluateNum"
        />
      </div>
      <u-empty
        v-if="showData.list && !showData.list.length"
        margin-top="50"
        text="暂无评价"
        mode="list"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { commodityEvaluateOption } from 'orange-components-config/options';
import { useBackgroundColor, usePaddingRadius } from '@/hooks/use-view-style';
import { useLifecycleInject } from '@/hooks/use-page-lifecycle';
import { reqGetComment } from '@/api';
import { navigateTo } from '@/utils';
export default defineComponent({
  props: {
    option: {
      type: Object as () => typeof commodityEvaluateOption,
      required: true,
    },
  },
  setup({ option }) {
    const showData = ref([] as any);
    const goods_id = ref(0);
    useLifecycleInject({
      onLoad: async (loadOption) => {
        if (loadOption === undefined) return;
        goods_id.value = loadOption.id;
        const { data } = await reqGetComment({
          goods_id: loadOption.id,
          limit: option.showSetting.evaluateNum,
        });
        showData.value = data.data;
      },
    });
    // 使用hook获得基本配置
    const { padding } = usePaddingRadius(option);
    const { background } = useBackgroundColor(option.colorStyle);
    const { colorStyle, showSetting } = option;

    // 查看大图
    const lookBigImage = (urls: string[]) =>
      uni.previewImage({
        urls,
      });

    // 查看更多评价信息
    const onSeeAllEvaluaten = () => {
      navigateTo('/pages/commons/evaluateList', {
        goods_id: goods_id.value,
      });
      setTimeout(() => {
        uni.$emit('click-all-evaluaten', option);
      }, 500);
    };
    return {
      colorStyle,
      showSetting,
      background,
      padding,
      showData,
      onSeeAllEvaluaten,
      lookBigImage,
    };
  },
});
</script>
<style lang="scss" scoped>
.commodity-evaluaten-container {
  background-repeat: repeat !important;
  // margin-bottom: 50rpx;
  .commodity-evaluaten-view {
    padding: toRpx(14) toRpx(12);
    .evaluaten-header-view {
      display: flex;
      justify-content: space-between;
    }
    .evaluaten-content {
      margin-top: toRpx(13);
      .content-evaluaten-info {
        @include text-hidden-line(4);
        margin-top: toRpx(8);
      }
      .content-evaluaten-image {
        display: flex;
        // justify-content: space-between;
        flex-wrap: wrap;
        margin-top: toRpx(11);
        > div {
          width: 25%;
          box-sizing: border-box;
        }
      }
      .content-user-header {
        :deep(.el-rate__icon) {
          margin-right: 0;
        }
        .content-user-info {
          .user-member {
            align-items: center;
            display: flex;
            height: toRpx(15);
            border-radius: toRpx(34);
            padding: toRpx(1) toRpx(5);
            box-sizing: content-box;
          }
        }
      }
    }
  }
}
</style>
