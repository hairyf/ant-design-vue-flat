<!--
 * @Author: Zhilong
 * @Date: 2021-04-22 22:34:03
 * @LastEditTime: 2021-05-07 14:11:14
 * @Description: 
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
          v-if="false"
        >
          <span class="u-m-r-12"> 查看更多</span>
          <view-icon name="oe-arrow-right" style="color: #9f9f9f" />
        </div>
      </div>
      <!-- 头部 满意度 -->
      <div
        class="u-f-s-20 u-m-t-4"
        style="color: #999"
        v-if="showData.satisfaction"
      >
        {{ showData.satisfaction }}% 满意度
      </div>
      <!-- 用户评价 -->
      <div class="evaluaten-content" v-for="(item, key) of list" :key="key">
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
          v-if="key !== showData.count"
        />
      </div>
    </div>
    <u-empty
      v-if="!showData.list.length"
      margin-top="50"
      text="暂无评价"
      mode="list"
    />
  </div>
</template>

<script lang="ts">
import { reqGetComment } from '@/api';
import { useListPaging } from '@/hooks/use-list-paging';
import { useBackgroundColor, usePaddingRadius } from '@/hooks/use-view-style';
import { computed, defineComponent, ref } from '@vue/composition-api';
import { commodityEvaluateOption } from 'orange-components-config/options';
import { onLoad } from 'uni-composition-api';
export default defineComponent({
  setup: () => {
    const goods_id = ref(0);
    const option = ref<typeof commodityEvaluateOption>(commodityEvaluateOption);
    const showData = ref();
    const { list, resetList } = useListPaging({
      getList: async (page) => {
        const { data } = await reqGetComment({
          goods_id: goods_id.value,
          page,
          limit: 10,
        });
        showData.value = data.data;
        return data.data.list;
      },
      prohibitInit: true,
    });
    const { padding } = usePaddingRadius(option.value);
    const { background } = useBackgroundColor(option.value.colorStyle);

    const colorStyle = computed(() => option.value.colorStyle);
    const showSetting = computed(() => option.value.showSetting);
    onLoad((option) => {
      goods_id.value = option?.goods_id;
      resetList();
    });

    // 查看大图
    const lookBigImage = (urls: string[]) =>
      uni.previewImage({
        urls,
      });

    return {
      list,
      option,
      colorStyle,
      showSetting,
      padding,
      background,
      showData,
      lookBigImage,
    };
  },
});
</script>

<style lang="scss">
.commodity-evaluaten-container {
  background-repeat: repeat !important;
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
