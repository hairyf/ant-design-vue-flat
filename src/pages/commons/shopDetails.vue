<!--
 * @Author: Mr.Mao
 * @LastEditors: Zhilong
 * @Date: 2021-01-08 09:52:39
 * @LastEditTime: 2021-05-14 16:08:18
 * @Description: 商品详情
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <view-controller type="shopDetails">
    <template v-if="!empty">
      <view-distribution />
      <view-sku-select />
    </template>
    <div style="padding-top: 1px" v-else-if="!loading">
      <u-empty
        v-if="!loading"
        margin-top="150"
        text="该商品不存在"
        mode="data"
      />
    </div>
    <view-shops-recommend type="商品详情" />
    <div style="height: 140rpx">
      <CommodityPurchase v-if="!empty" slot="footer" />
    </div>
  </view-controller>
</template>

<script lang="ts">
import { reqGoodsDetail } from '@/api';
import { useLifecycleProvide } from '@/hooks/use-page-lifecycle';
import { defineComponent, ref, provide, computed } from '@vue/composition-api';
import { onLoad } from 'uni-composition-api';
import CommodityPurchase from '@/components/view/CommodityPurchase.vue';
export default defineComponent({
  props: {},
  components: { CommodityPurchase },
  setup() {
    // 组件注入生命周期
    useLifecycleProvide();
    // 商品详情数据下发
    const shopDetailsInfo = ref<any>();
    // 加载中
    const loading = ref(false);
    provide('shopDetailsInfo', shopDetailsInfo);
    // 请求商品数据
    onLoad(async ({ id } = { undefined }) => {
      if (id === undefined) return false;
      loading.value = true;
      const { data } = await reqGoodsDetail(id);
      loading.value = false;
      shopDetailsInfo.value = data?.data?.data?.[0];
    });
    const empty = computed(() => typeof shopDetailsInfo.value === 'undefined');
    return { shopDetailsInfo, empty, loading };
  },
  data: () => ({}),
  computed: {},
  methods: {},
  watch: {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  onPullDownRefresh() {
    uni.stopPullDownRefresh();
  },
  // 页面处理函数--监听用户上拉触底
  onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  /* onPageScroll(event) {}, */
  // 页面处理函数--用户点击右上角分享
  /* onShareAppMessage(options) {}, */
});
</script>

<style lang="scss"></style>
