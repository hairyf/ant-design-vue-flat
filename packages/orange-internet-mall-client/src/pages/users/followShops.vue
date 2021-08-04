<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2021-01-07 14:34:50
 * @LastEditTime: 2021-05-20 10:03:28
 * @Description: 关注的商品
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="follow-shops">
    <view-controller>
      <u-card
        padding="0"
        :show-head="false"
        v-for="(item, index) in list"
        :key="index"
        :border="false"
      >
        <div class="custom-cart-body u-flex" slot="body">
          <div
            class="left-column"
            @click="
              $navigateTo('/pages/commons/shopDetails?id=' + item.good.id)
            "
          >
            <u-image
              :width="240"
              :height="240"
              :border-radius="10"
              :src="item.good.main_picture"
            />

            <div class="off-the-shelf" v-if="item.good.goods_state == 5">
              已下架
            </div>
          </div>
          <div class="right-column u-flex u-flex-1">
            <div
              class="title u-margin-bottom-12"
              @click="
                $navigateTo('/pages/commons/shopDetails?id=' + item.good.id)
              "
            >
              {{ item.good.title }}
            </div>
            <div
              class="price"
              @click="
                $navigateTo('/pages/commons/shopDetails?id=' + item.good.id)
              "
            >
              ¥ {{ item.good.price }}
            </div>
            <div class="controls u-flex">
              <div>
                <u-button
                  size="mini"
                  shape="circle"
                  @click="
                    checkSimilar(item.good.relevance_goods_id, item.goodsClass)
                  "
                  >看相似</u-button
                >
              </div>

              <div
                class="shop-cart-icon u-m-l-15"
                @click="getGoodsDetail(item.good.id)"
              >
                <view-icon name="cl-shop-cart" size="25"></view-icon>
              </div>
            </div>
          </div>
        </div>
      </u-card>
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
import { reqCollectList, reqGoodsDetail, reqAddCartLists } from '@/api';
import { showToast } from '@/utils';

export default defineComponent({
  props: {},
  data: () => ({
    // list: [] as any,
    shopDetailsInfo: {} as any,
    updateValue: true,
  }),
  computed: {},
  methods: {
    async appCollectList() {
      // const { data } = await reqCollectList();
      // // console.log(data);
      // this.list = data.data.data;
    },
    // 获取商品信息
    async getGoodsDetail(id: Key) {
      // 请求数据 清空旧数据
      this.updateValue = false;
      const { data } = await reqGoodsDetail(id);
      // 得到数据 允许显示
      this.updateValue = true;
      this.shopDetailsInfo = data.data.data[0];
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
    // 看相似
    async checkSimilar(similarId: string, classId: any) {
      if (similarId === '') {
        this.$navigateTo('/pages/commons/searchResult', {
          classId,
        });
      } else {
        this.$navigateTo('/pages/commons/searchResult', { similarId });
      }
    },
  },
  setup() {
    // 调用分页逻辑
    const { list } = useListPaging({
      getList: async (page) => {
        const { data } = await reqCollectList({ page, limit: 5 });
        return data.data.data;
      },
    });
    return { list };
  },
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {
    this.appCollectList();
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
@include full-page('follow-shops', #f2f2f2);
.follow-shops {
  padding-top: 1rpx;
}
.left-column {
  position: relative;
  .off-the-shelf {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.5);
    color: #ffffff;
    text-align: center;
    line-height: 128rpx;
    width: 128rpx;
    height: 128rpx;
  }
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
