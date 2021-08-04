<!--
 * @Author: Zhilong
 * @Date: 2021-04-17 15:38:46
 * @LastEditTime: 2021-05-18 16:26:25
 * @Description: 就视图 关注公众号的
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div class="follow-official-container">
    <div class="follow-official-view">
      <official-account v-if="isWxApp"></official-account>
      <div v-if="false">
        <div class="header-view">XXX关联的公众号</div>
        <div class="content-view">
          <view-image :size="45 * 2" :empty-type="1" border-radius="50%" />
          <div class="content-view-text">
            <div>公众号名称</div>
            <div style="font-size: 24rpx; color: #999">公众号简介....</div>
          </div>
          <div class="content-view-btn">查看</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { PLATFORM } from '@/utils';
import { defineComponent } from '@vue/composition-api';
import { followOfficialOption } from 'orange-components-config/options';

export default defineComponent({
  props: {
    option: {
      type: Object as () => typeof followOfficialOption,
      required: true,
    },
  },
  setup() {
    const isWxApp = PLATFORM === 'mp-weixin';
    return { isWxApp };
  },
});
</script>
<style lang="scss" scoped>
.follow-official-container {
  .follow-official-view {
    padding: toRpx(12);
    background-color: #fff;
    .header-view {
      font-size: toRpx(12);
      line-height: toRpx(18);
      color: #555555;
      margin-bottom: toRpx(2);
    }
    .content-view {
      display: flex;
      align-items: center;

      .content-view-text {
        margin-left: toRpx(6);
        flex: 1;
        font-size: toRpx(14);
        color: #000000;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        line-height: toRpx(21);
      }
      .content-view-btn {
        margin-left: toRpx(13);
        padding: toRpx(4) toRpx(18);
        background: rgba(255, 61, 0, 0.1);
        border-radius: toRpx(15);
        font-size: toRpx(12);
        color: #ff3d00;
      }
    }
  }
}
</style>
