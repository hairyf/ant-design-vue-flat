<template>
  <div class="express-select">
    <u-search
      placeholder="请输入物流公司名称"
      v-model="keyword"
      :show-action="false"
      @search="searchEvent"
    ></u-search>
    <div
      class="font-style"
      :key="index"
      v-for="(item, index) in list"
      @click="jumpEvent(item)"
    >
      {{ item.company_name }}
    </div>
  </div>
</template>

<script lang="ts">
import { reqLogisticsList } from '@/api';
import { defineComponent, ref } from '@vue/composition-api';
import { useListPaging } from '@/hooks/use-list-paging';

export default defineComponent({
  components: {},
  data: () => ({}),
  computed: {},
  methods: {
    searchEvent() {
      this.resetList();
    },
    jumpEvent(item: any) {
      this.$navigateBack();
      uni.$emit('sendLegitimate', item);
    },
  },
  watch: {},
  setup() {
    // 调用分页逻辑
    const keyword = ref('');
    const { list, resetList } = useListPaging({
      getList: async (page) => {
        const { data } = await reqLogisticsList({
          page,
          limit: 22,
          company_name: keyword.value,
        });
        return data.data.data;
      },
    });
    return { list, keyword, resetList };
  },
  // 页面周期函数--监听页面加载
  onLoad() {},
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

<style lang="scss">
@include full-page('express-select', #fff);
.express-select {
  padding: 40rpx;
}
.font-style {
  font-size: 32rpx;
  margin-top: 56rpx;
  font-weight: 400;
  color: #000;
}
</style>
