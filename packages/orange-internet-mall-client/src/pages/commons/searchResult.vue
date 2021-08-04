<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2021-01-09 14:10:45
 * @LastEditTime: 2021-05-20 10:00:10
 * @Description: 搜索结果页
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="search-result">
    <view-controller>
      <!-- 头部导航 -->
      <u-navbar :border-bottom="false">
        <u-search
          class="u-m-r-30"
          placeholder="搜索商品、类目"
          :animation="true"
          :border-color="$hexColor['--color-primary']"
          bg-color="#FFFFFF"
          v-model="searchText"
          @search="resetList"
          @custom="resetList"
        />
        <!-- <custom-icon @click="status = false" v-show="status" name="grid" />
      <custom-icon @click="status = true" v-show="!status" name="queue" /> -->
      </u-navbar>
      <div class="filter-warp u-flex u-row-between">
        <div
          :class="['filter-item', '1' == form.marketing_tab ? 'on' : '']"
          @click="
            form.marketing_tab = '1';
            form.order = '';
            resetList();
          "
        >
          <span>推荐</span>
        </div>
        <div
          v-if="recordSales == 0"
          :class="['filter-item', 'sales' == form.order ? 'on' : '']"
          @click="salesVolume(1)"
        >
          <div class="price-flex-betwwen u-flex">
            <div>销量</div>
            <div :class="[platForm == 'h5' ? 'price-foot' : 'wechatFoot']">
              <u-icon class="price-icon" name="arrow-up" />
              <u-icon class="price-icon" name="arrow-down" />
            </div>
          </div>
        </div>
        <div
          v-if="recordSales == 1"
          :class="['filter-item', 'sales' == form.order ? 'on' : '']"
          @click="salesVolume(2)"
        >
          <div class="price-flex-betwwen u-flex">
            <div>销量</div>
            <div :class="[platForm == 'h5' ? 'price-foot' : 'wechatFoot']">
              <u-icon
                :style="{ color: $hexColor['--color-primary'] }"
                class="price-icon"
                name="arrow-up"
              />
              <u-icon class="price-icon" name="arrow-down" />
            </div>
          </div>
        </div>
        <div
          v-if="recordSales == 2"
          :class="['filter-item', 'sales' == form.order ? 'on' : '']"
          @click="salesVolume(0)"
        >
          <div class="price-flex-betwwen u-flex">
            <div>销量</div>
            <div :class="[platForm == 'h5' ? 'price-foot' : 'wechatFoot']">
              <u-icon class="price-icon" name="arrow-up" />
              <u-icon
                :style="{ color: $hexColor['--color-primary'] }"
                class="price-icon"
                name="arrow-down"
              />
            </div>
          </div>
        </div>
        <div
          v-if="recordPrice == 0"
          :class="['filter-item', 'price' == form.order ? 'on' : '']"
          @click="priceSort(1)"
        >
          <div class="price-flex-betwwen u-flex">
            <div>价格</div>
            <div :class="[platForm == 'h5' ? 'price-foot' : 'wechatFoot']">
              <u-icon class="price-icon" name="arrow-up"></u-icon>
              <u-icon class="price-icon" name="arrow-down"></u-icon>
            </div>
          </div>
        </div>
        <div
          v-if="recordPrice == 1"
          :class="['filter-item', 'price' == form.order ? 'on' : '']"
          @click="priceSort(2)"
        >
          <div class="price-flex-betwwen u-flex">
            <div>价格</div>
            <div :class="[platForm == 'h5' ? 'price-foot' : 'wechatFoot']">
              <u-icon
                class="price-icon"
                :style="{ color: $hexColor['--color-primary'] }"
                name="arrow-up"
              ></u-icon>
              <u-icon class="price-icon" name="arrow-down"></u-icon>
            </div>
          </div>
        </div>
        <div
          v-if="recordPrice == 2"
          :class="['filter-item', 'price' == form.order ? 'on' : '']"
          @click="priceSort(0)"
        >
          <div class="price-flex-betwwen u-flex">
            <div>价格</div>
            <div :class="[platForm == 'h5' ? 'price-foot' : 'wechatFoot']">
              <u-icon class="price-icon" name="arrow-up"></u-icon>
              <u-icon
                class="price-icon"
                name="arrow-down"
                :style="{ color: $hexColor['--color-primary'] }"
              ></u-icon>
            </div>
          </div>
        </div>
        <div :class="'filter-item'" @click="showFilterPopup = true">
          <span>筛选</span>
          <view-icon size="28" name="cl-shaixuan" />
        </div>
      </div>
      <u-popup v-model="showFilterPopup" mode="right" width="576rpx">
        <div class="f-slot">
          <union-blank :height="filterBodyMarginTop" />
          <div class="title u-margin-bottom-28">服务</div>
          <u-grid class="labels" :col="3" :border="false" hover-class="none">
            <u-grid-item :custom-style="{ padding: '10rpx 0' }">
              <div
                :class="['serve-item']"
                :style="[isActive == 1 && $lineRectStyle]"
                @click="activeScreenEvent(1)"
              >
                仅看有货
              </div>
            </u-grid-item>
            <u-grid-item :custom-style="{ padding: '10rpx 0' }">
              <div
                :class="['serve-item']"
                :style="[isActive == 2 && $lineRectStyle]"
                @click="activeScreenEvent(2)"
              >
                新品
              </div>
            </u-grid-item>
            <u-grid-item :custom-style="{ padding: '10rpx 0' }">
              <div
                :class="['serve-item']"
                :style="[isActive == 3 && $lineRectStyle]"
                @click="activeScreenEvent(3)"
              >
                包邮
              </div>
            </u-grid-item>
          </u-grid>
          <div class="title u-margin-top-28 u-margin-bottom-28">价格区间</div>
          <custom-section-input v-model="form.price" />
          <div class="popup-footer u-flex">
            <u-button
              shape="circle"
              ripple
              @click="
                form.order = '';
                form.ordersort = '';
                form.marketing_tab = '';
                form.havestock = '';
                form.postage = '';
                form.price = [];
                showFilterPopup = false;
                resetList();
              "
            >
              重置
            </u-button>
            <u-button
              class="u-flex-1 u-m-l-15"
              shape="circle"
              type="primary"
              ripple
              :custom-style="{
                background: $hexColor['--color-primary'],
              }"
              @click="
                showFilterPopup = false;
                resetList();
              "
            >
              确定
            </u-button>
          </div>
        </div>
      </u-popup>
      <common-layer-good-list v-if="!status" :list="list" />
      <common-grid-good-list v-if="status" :list="list" />
    </view-controller>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { reqGoodsScreenList } from '@/api';
import { useListPaging } from '@/hooks/use-list-paging';
import { computed, defineComponent, ref } from '@vue/composition-api';
import { onLoad } from 'uni-composition-api';
import { PLATFORM } from '@/utils';
import store from '@/store';
export default defineComponent({
  components: {},
  data: () => ({
    filterBodyMarginTop: Vue.prototype.$customNavbarOffsetTop + 'px',
    showFilterPopup: false,
    // 当前列表状态 true 为栅格状态, false 为队列状态
    status: false,
    // 热门推荐商品数据
    hotDoodsData: [],
    isActive: 1,
  }),
  computed: {},
  methods: {
    // 激活状态
    async activeScreenEvent(num: number) {
      this.isActive = num;
      this.form.marketing_tab = '';
      this.form.havestock = '';
      this.form.postage = '';
      if (this.isActive == 1) {
        this.form.havestock = '1';
      }
      if (this.isActive == 2) {
        this.form.marketing_tab = '2';
      }
      if (this.isActive == 3) {
        this.form.postage = '2';
      }
    },
  },
  watch: {},
  setup() {
    // 判断销量排序
    const isSales = ref(true);
    // 判断价格排序
    const isPrice = ref(true);
    // 记录排序点击 0是不排序，1升序，2降序
    const recordSales = ref(0);
    // 记录排序点击 0是不排序，1升序，2降序
    const recordPrice = ref(0);
    const searchText = ref('');
    const form = ref({
      order: '',
      ordersort: '',
      marketing_tab: '',
      havestock: '',
      postage: '',
      price: [],
      classId: '',
      id: '',
    });
    const platForm = computed(() => {
      return PLATFORM;
    });
    // 销量排序事件
    const salesVolume = (num: number) => {
      if (num == 1) {
        form.value.order = 'sales';
        form.value.marketing_tab = '';
        form.value.ordersort = 'desc';
        resetList();
      } else if (num == 2) {
        form.value.order = 'sales';
        form.value.marketing_tab = '';
        form.value.ordersort = 'asc';
        resetList();
      } else {
        form.value.order = '';
        form.value.marketing_tab = '';
        form.value.ordersort = '';
        resetList();
      }
      recordSales.value = num;
      recordPrice.value = 0;
    };
    // 价格排序事件
    const priceSort = (num: number) => {
      if (num == 1) {
        form.value.order = 'price';
        form.value.marketing_tab = '';
        form.value.ordersort = 'desc';
        resetList();
      } else if (num == 2) {
        form.value.order = 'price';
        form.value.marketing_tab = '';
        form.value.ordersort = 'asc';
        resetList();
      } else {
        form.value.order = '';
        form.value.marketing_tab = '';
        form.value.ordersort = '';
        resetList();
      }
      recordPrice.value = num;
      recordSales.value = 0;
    };
    const { list, resetList } = useListPaging({
      getList: async (page) => {
        const { data } = await reqGoodsScreenList({
          title: searchText.value || '',
          page,
          limit: 10,
          ...form.value,
        });
        return data.data.data;
      },
      prohibitInit: true,
    });
    onLoad((option) => {
      searchText.value = option?.searchText;
      form.value.classId = option?.classId;
      form.value.id = option?.similarId;
      resetList();
    });
    const $hexColor = computed(
      (): CssLightVariableType => store.getters.hexColor
    );
    const $lineRectStyle = computed(
      (): LineRectStyle => store.getters.lineRectStyle
    );
    return {
      list,
      form,
      resetList,
      searchText,
      $hexColor,
      $lineRectStyle,
      platForm,
      salesVolume,
      isSales,
      isPrice,
      priceSort,
      recordSales,
      recordPrice,
    };
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
/* 全局盒子 */
@include full-page('search-result', #f5f5f5);
.search-result {
  padding-bottom: 5rpx;
}
u-navbar .u-slot-content {
  custom-icon {
    margin: 0 25rpx;
    flex-shrink: 0;
  }
}
.active {
  color: red;
}
/* 过滤导航 */
.filter-warp {
  padding: 30rpx;
}
.price-flex-betwwen {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .price-foot {
    // transform: translateY(-6rpx);
    margin: -10rpx 0 0 6rpx;
  }
  .wechatFoot {
    margin: -20rpx 0 0 6rpx;
  }
  .price-icon {
    display: block;
    height: 17rpx;
  }
}
.filter-item {
  span {
    font-size: 28rpx;
  }
  u-icon {
    margin-left: 15rpx;
    vertical-align: middle;
  }
}

/* 过滤弹出层插槽 */
.f-slot {
  position: relative;
  margin: 0 40rpx;
  height: 100%;
  .title {
    font-size: 24rpx;
    font-weight: bold;
  }
}
.serve-item {
  width: 152rpx;
  height: 60rpx;
  line-height: 60rpx;
  font-size: 24rpx;
  text-align: center;
  background: #ececec;
  border-radius: 30rpx;
  border: 1rpx solid #ececec;
  &.on {
    border: 1rpx solid #000000;
  }
}
.popup-footer {
  position: absolute;
  bottom: 88rpx;
  width: 100%;
  // padding: 0 30rpx;
  u-button {
    flex: 1;
    &:first-child {
      margin-right: 25rpx;
    }
  }
}
</style>
