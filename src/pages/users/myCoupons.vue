<template>
  <div class="my-coupons">
    <view-controller>
      <u-tabs
        :list="myTabs"
        :is-scroll="false"
        :current="currentTab"
        bg-color="#f8f8f8"
        :active-color="$hexColor['--color-primary']"
        inactive-color="#ACACAC"
        font-size="34"
        @change="tabEvent"
      ></u-tabs>
      <div v-for="(item, index) in list" :key="index">
        <!-- 满减卷 -->
        <!-- 满减卷和折扣卷 -->
        <u-card :show-head="false" :border="false" :padding="0">
          <div
            :class="[
              'custom-discount__body',
              'u-flex',
              item.coupon.type == 1 ? 'full' : 'disc',
              item.status == 2 ? 'be-overdue' : '',
            ]"
            slot="body"
          >
            <div class="left-column u-flex">
              <!-- 满减类型 -->
              <div class="count-layer" v-if="item.coupon.type == 1">
                <span class="tips">¥</span>
                <span class="content">{{ item.coupon.money - 0 }}</span>
              </div>
              <!-- 折扣类型 -->
              <div v-if="item.coupon.type == 2" class="count-layer">
                <span class="content">{{ item.coupon.money - 0 }}</span>
                <span class="tips">折</span>
              </div>
              <!-- 优惠卷使用条件 -->
              <div class="tips-layer">
                满{{ item.coupon.condition_order_amount - 0 }}元可使用
              </div>
            </div>
            <div
              class="right-column u-flex u-flex-1 u-row-center position-index"
            >
              <div class="title">{{ item.coupon.name }}</div>
              <div class="tips-btns u-flex u-row-between position-index">
                <span class="tips over-text">{{ item.coupon.explain }}</span>
              </div>
              <div class="times position-index">
                有效期：{{ $formatUnix(item.begintime, 'YYYY-MM-DD') }}至{{
                  $formatUnix(item.endtime, 'YYYY-MM-DD')
                }}
              </div>
              <view-icon
                class="u-margin-right-20 status-image"
                size="200"
                name="cl-be-overdue"
                color="rgba(0, 0, 0, 0.1)"
                v-if="item.status === 2"
              />
              <view-icon
                v-if="item.status === 1"
                class="u-margin-right-20 status-image"
                size="200"
                name="cl-use-img"
                color="rgba(255, 255, 255, 0.5)"
              />
            </div>
          </div>
        </u-card>
      </div>
    </view-controller>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';
import { useListPaging } from '@/hooks/use-list-paging';
import { reqGetMyCoupon } from '@/api';
import store from '@/store';
export default defineComponent({
  components: {},
  data: () => ({
    myTabs: [
      { id: 0, name: '未使用' },
      { id: 1, name: '已使用' },
      { id: 2, name: '已过期' },
    ],
    currentTab: 0,
  }),
  computed: {},
  methods: {
    // 选择优惠卷项
    // async onSelectItem(id: Key) {
    //   await reqGetCoupon(id);
    // },
    onSelectedItem() {
      // console.log(1);
    },
    // 切换优惠卷类型
    tabEvent(index: number) {
      this.currentTab = index;
      this.couponType = this.myTabs[index].id;
      this.myCouponlist();
    },
    // 请求数据
    async myCouponlist() {
      // 分从哪个页面跳转的
      const { data } = await reqGetMyCoupon({
        page: 1,
        limit: 10,
        search: { status: this.couponType },
      });
      this.list = data.data.data;
    },
  },
  watch: {
    flag() {},
  },
  setup() {
    // 选择优惠卷类型
    const couponType = ref(0);
    // 调用分页逻辑
    const { list } = useListPaging({
      getList: async (page) => {
        const { data } = await reqGetMyCoupon({
          page,
          limit: 10,
          search: { status: couponType.value + '' },
        });
        return data.data.data as any[];
      },
    });
    const $hexColor = computed(
      (): CssLightVariableType => store.getters.hexColor
    );
    return { list, couponType, $hexColor };
  },
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
@include full-page('coupons', #f8f8f8);
.position-index {
  position: relative;
  z-index: 2;
}
.over-text {
  width: 330rpx;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
