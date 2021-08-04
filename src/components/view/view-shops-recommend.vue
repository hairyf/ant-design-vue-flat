<!--
 * @Author: Zhilong
 * @Date: 2021-05-14 14:46:39
 * @LastEditTime: 2021-05-14 16:18:31
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div class="shops-recommend-container" v-if="showView">
    <div class="title-container u-flex u-row-center">
      <span class="left-view-line" />
      <span class="content u-m-l-30 u-m-r-30">
        {{ recommend.contentEdit.text }}
      </span>
      <span class="right-view-line" />
    </div>
    <commodity-group :option="recommend" />
  </div>
</template>
<script lang="ts">
import store from '@/store';
import { computed, defineComponent } from '@vue/composition-api';
import CommodityGroup from '@/components/view/CommodityGroup.vue';

export default defineComponent({
  props: {
    type: {
      type: String as () => '购物车' | '支付成功' | '商品详情' | '会员中心',
      required: true,
    },
  },
  components: { CommodityGroup },
  setup(props) {
    // 获取数据源
    const recommend = computed(() => store.state.common.recommend);
    // 是否显示
    const showView = recommend.value.contentEdit.pages.includes(props.type);
    return {
      showView,
      recommend,
    };
  },
});
</script>
<style lang="scss" scoped>
.view-container {
  margin-top: 82px;
  margin-bottom: 82px;
}
:deep(.el-checkbox) {
  margin-right: 8px;
}
.title-container {
  text-align: center;
  padding: 15px 0;
  font-size: 15px;
  .left-view-line {
    height: 1px;
    width: 32px;
    background-image: linear-gradient(-90deg, red 0%, rgba(255, 61, 0, 0) 100%);
  }
  .right-view-line {
    height: 1px;
    width: 32px;
    background-image: linear-gradient(90deg, red 0%, rgba(255, 61, 0, 0) 100%);
  }
}
</style>
