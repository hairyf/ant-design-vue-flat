<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2021-01-07 14:34:50
 * @LastEditTime: 2021-05-20 10:03:55
 * @Description: 足迹
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="footprint">
    <view-controller>
      <!-- 签到日期条 -->
      <!-- <custom-calendar> </custom-calendar> -->
      <!-- 浏览记录 -->
      <div class="footprint-item" v-for="(item, index) in list" :key="index">
        <div class="time-title">{{ index }}</div>
        <u-card
          padding="0"
          :show-head="false"
          v-for="(citem, cindex) in item"
          :key="cindex"
          @click="$navigateTo('/pages/commons/shopDetails', { id: citem.id })"
          :border="false"
        >
          <div class="custom-cart-body u-flex" slot="body">
            <u-image
              :width="240"
              :height="240"
              :border-radius="10"
              :src="citem.main_picture"
            />
            <div class="right-column u-flex u-flex-1">
              <div class="title u-margin-bottom-12">
                {{ citem.title }}
              </div>
              <div class="price">¥ {{ citem.price }}</div>
              <div class="controls u-flex">
                <div>
                  <u-button
                    size="mini"
                    shape="circle"
                    @click.stop="checkSimilar(citem)"
                    >看相似</u-button
                  >
                </div>
                <div
                  class="shop-cart-icon u-m-l-15"
                  @click.stop="getGoodsDetail(citem.id)"
                >
                  <view-icon name="cl-shop-cart" size="25"></view-icon>
                </div>
              </div>
            </div>
          </div>
        </u-card>
      </div>
      <u-empty
        v-if="!list['今天']"
        class="u-m-t-30"
        text="暂无足迹"
        mode="list"
      />

      <view-sku-select
        v-model="shopDetailsInfo"
        v-if="shopDetailsInfo.norms_type && updateValue"
      />
    </view-controller>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { useListPaging } from '@/hooks/use-list-paging';
import { reqAddCartLists, reqBrowseHistory, reqGoodsDetail } from '@/api';
import { showToast } from '@/utils';
export default defineComponent({
  props: {},
  data: () => ({
    steps: [
      { time: '1月20日', sign_in: true, same_day: false, integral: 50 },
      { time: '1月21日', sign_in: true, same_day: false, integral: 50 },
      { time: '1月22日', sign_in: true, same_day: false, integral: 50 },
      { time: '1月23日', sign_in: false, same_day: true, integral: 50 },
      { time: '1月24日', sign_in: false, same_day: false, integral: 50 },
      { time: '1月26日', sign_in: false, same_day: false, integral: 50 },
      { time: '1月27日', sign_in: false, same_day: false, integral: 50 },
    ],
    shopDetailsInfo: {} as any,
    updateValue: true,
  }),
  computed: {},
  methods: {
    // 获取历史记录日期
    async getBrowseHistory() {
      // const { data } = await reqBrowseDate();
      // console.log(data.data);
    },
    // 看相似
    async checkSimilar(data: any) {
      const similarId = data?.relevance_goods_id;
      const classId = data?.last_goods_class?.map_id;
      if (!similarId) {
        this.$navigateTo('/pages/commons/searchResult', { classId });
      } else {
        this.$navigateTo('/pages/commons/searchResult', { similarId });
      }
    },
    // 获取商品信息
    async getGoodsDetail(id: Key) {
      // 请求数据 清空旧数据
      this.updateValue = false;
      console.log(id);
      const { data } = await reqGoodsDetail(id);
      // 得到数据 允许显示
      this.updateValue = true;
      this.shopDetailsInfo = data.data.data[0];
      console.log(this.shopDetailsInfo);
      if (this.shopDetailsInfo.norms_type == 1) {
        setTimeout(() => {
          uni.$emit('showSku');
        }, 1);
      } else {
        this.addShopCart();
      }
    },
    // 加入购物车
    async addShopCart() {
      const cartParms = [] as any;
      // 加入购物车的参数整理
      cartParms.push({
        goods_id: this.shopDetailsInfo.id,
        sku_id: 0,
        num: 1,
        price: this.shopDetailsInfo.price,
      });
      await reqAddCartLists(cartParms);
      await showToast({ title: '加入购物车成功' });
    },
  },
  setup() {
    // 调用分页逻辑
    const { list } = useListPaging({
      getList: async (page) => {
        const { data } = await reqBrowseHistory({ page, limit: 10 });
        return data.data.data;
      },
    });
    return { list };
  },
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {
    this.getBrowseHistory();
  },
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() {},
  // 组件周期函数--监听组件数据更新之后x
  updated() {},
  // 组件周期函数--监听组件激活(显示)
  activated() {},
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() {},
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() {},
});
</script>

<style lang="scss">
@include full-page('footprint', #f2f2f2);
.footprint {
  padding-top: 1rpx;
}
.time-title {
  margin: 0 25rpx;
  margin-top: 25rpx;
  font-size: 34rpx;
  font-weight: 600;
  color: #000000;
}
.right-column {
  margin: 0 25rpx;
  flex-direction: column;
  align-items: flex-start;
  .title {
    @include text-hidden-line(2);
    height: 75rpx;
  }
  .labels {
    u-tag:not(:last-child) {
      margin-right: 20rpx;
    }
  }
  .price {
    margin-bottom: 22rpx;
    color: #ff3d00;
    font-size: 34rpx;
    font-weight: bold;
  }
  .controls {
    width: 100%;
    .shop-cart-icon {
      background: #ececec;
      border-radius: 50%;
      height: 48rpx;
      width: 48rpx;
      line-height: 48rpx;
      text-align: center;
    }
  }
}
</style>
