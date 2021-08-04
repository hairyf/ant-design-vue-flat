<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2021-01-08 09:52:39
 * @LastEditTime: 2021-05-20 09:46:46
 * @Description: 购物车
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div>
    <view-controller :isShopCart="true">
      <div class="shop-cart">
        <!-- 头部导航 -->
        <u-navbar :is-back="false" :border-bottom="false" title="购物车">
          <span class="navbar-control" @click="edit = !edit">
            {{ edit ? '完成' : '管理' }}
          </span>
        </u-navbar>
        <!-- 购物车列表 -->
        <div class="shop-cart-list">
          <u-card
            :border="false"
            :show-head="false"
            v-for="(item, index) in list"
            :key="index"
          >
            <div
              class="custom-cart-body u-flex"
              slot="body"
              v-if="item.good != null"
            >
              <u-checkbox
                shape="circle"
                :size="40"
                v-model="item.select"
                :disabled="item.good.goods_state == '1'"
              />
              <div
                class="left-column"
                @click="
                  $navigateTo('/pages/commons/shopDetails', {
                    id: item.goods_id,
                  })
                "
              >
                <u-image
                  :width="180"
                  :height="180"
                  :border-radius="10"
                  :src="item.good.main_picture"
                  :loading-icon="null"
                />
                <!-- 已下架状态 -->
                <div class="off-the-shelf" v-if="item.good.goods_state == 5">
                  已下架
                </div>
              </div>

              <div class="right-column u-flex">
                <div
                  class="title u-margin-bottom-10"
                  @click="
                    $navigateTo('/pages/commons/shopDetails', {
                      id: item.goods_id,
                    })
                  "
                >
                  {{ item.good.title }}
                </div>
                <div class="labels u-margin-bottom-20" v-if="item.good_sku">
                  <u-tag
                    type="info"
                    size="mini"
                    :text="item.good_sku.title_jion"
                    border-color="#F4F4F5"
                    shape="circle"
                  />
                </div>

                <div class="controls u-flex u-row-between">
                  <span class="price price-width">¥ {{ item.good.price }}</span>
                  <u-number-box
                    bg-color="#ffffff"
                    :min="1"
                    :max="
                      item.good_sku == undefined
                        ? item.good.stock
                        : item.good_sku.stock
                    "
                    v-model="item.num"
                    @change="onHandleItemCount($event, index)"
                  />
                </div>
              </div>
            </div>
          </u-card>
          <!-- 当列表为空时, 展示内容为空与猜你喜欢 -->
          <template v-if="empty && !loadingStatus">
            <u-empty
              :margin-top="250"
              :icon-size="336"
              text="你还没下单呢！快去逛逛~~"
              src="https://client-static-1254212114.cos.ap-guangzhou.myqcloud.com/images/empty-order.png"
            />
            <div class="u-flex u-row-center">
              <div>
                <u-button
                  class="u-m-l-25 u-m-t-25"
                  shape="circle"
                  type="primary"
                  size="medium"
                  ripple
                  :custom-style="{
                    background: $hexColor['--color-primary'],
                  }"
                  @click="$redirectTo('/pages/baseTabBars/homePage')"
                >
                  去逛逛
                </u-button>
              </div>
            </div>
          </template>
          <!-- 填充块 -->
          <union-blank :height="120" />
          <view-shops-recommend type="购物车" />
        </div>
      </div>
      <!-- 底部操作框 -->
      <div class="footer-container" slot="footer">
        <div class="content">
          <div class="footer-left">
            <span @click="onHandleSelectsToggle(!isSelectAll)">
              <u-checkbox :value="isSelectAll" shape="circle" :label-size="20">
                全选
              </u-checkbox>
            </span>
            <span v-if="!edit" class="tips">合计：</span>
            <span
              v-if="!edit"
              class="price"
              :style="{ color: $hexColor['--color-primary'] }"
            >
              ¥{{ total.toFixed(2) }}
            </span>
          </div>
          <div class="footer-right u-flex">
            <u-button
              shape="circle"
              :disabled="!isSelect"
              :ripple="true"
              v-if="!edit"
              @click="onHandelCreateOrder"
            >
              去结算
            </u-button>
            <span
              class="tips u-m-r-15"
              :style="{ color: $hexColor['--color-primary'] }"
              v-if="edit"
              @click="showClearAllShopModal = true"
            >
              快速清理
            </span>
            <!-- <u-button shape="circle" :ripple="true" v-if="edit">
            移入收藏夹
          </u-button> -->
            <u-button
              shape="circle"
              :ripple="true"
              v-if="edit"
              @click="onHandelDelete"
            >
              删除
            </u-button>
          </div>
        </div>
      </div>
      <u-modal
        content="确定要清除所有购物车项吗？"
        v-model="showClearAllShopModal"
        :show-cancel-button="true"
        @confirm="fastClear()"
      />
    </view-controller>
  </div>
</template>

<script lang="ts">
import store from '@/store';
import { useMultipleSelect } from '@/hooks/use-multiple-select';
import { computed, defineComponent, ref } from '@vue/composition-api';
import Vue from 'vue';
import {
  reqDelCartItem,
  reqGetCartList,
  requserAddress,
  reqChangeartItem,
} from '@/api';
import { useListPaging } from '@/hooks/use-list-paging';
import { onLoad } from 'uni-composition-api';
import { showToast, navigateTo } from '@/utils';
export default defineComponent({
  components: {},
  data: () => ({
    customTabbarHeight: Vue.prototype.$customTabbarHeight + 'px',
    // 当前购物车为编辑(true), 还是管理(false)
    edit: false,
    // 清除所有购物车模拟窗
    showClearAllShopModal: false,
  }),
  computed: {
    common: () => store.state.common,
  },
  methods: {
    // 处理单项目计数器
    async onHandleItemCount(event: { value: number }, index: number) {
      const item = this.list[index];
      await reqChangeartItem({
        goods_id: item.goods_id,
        sku_id: item.good_sku ? item.good_sku.id : 0,
        num: event.value,
      });
    },
    // 处理多项目删除
    async onHandelDelete() {
      const reqSelects = this.selects.map((item: any) => {
        return {
          goods_id: item.goods_id,
          sku_id: item.good_sku == null ? 0 : item.good_sku.id,
        };
      });
      await reqDelCartItem(reqSelects as any);
      this.resetList();
    },
    // 快速清除
    async fastClear() {
      const reqSelects = this.list.map((item: any) => {
        return {
          goods_id: item.goods_id,
          sku_id: item.good_sku == null ? 0 : item.good_sku.id,
        };
      });
      await reqDelCartItem(reqSelects as any);
      showToast({ title: '删除成功!' });
      this.resetList();
    },
    // 创建订单并进行跳转
    async onHandelCreateOrder() {
      const goods = this.selects.map((item) => ({
        goodsId: item.goods_id,
        buynum: item.num,
        skuId: item.good_sku == null ? 0 : item.good_sku.id,
      }));
      const { data } = await requserAddress();
      if (!data.data.data.length) {
        await showToast({ title: '请新建默认地址!', icon: 'none' });
        navigateTo('/pages/users/addressList');
        return false;
      }
      this.$navigateTo('/pages/shopOrders/editOrder', {
        placeAnRrders: JSON.stringify(goods),
        source: 1,
      });
    },
    // 改变购物车状态 :{ids:any}
  },
  setup() {
    const loadingStatus = ref(true);
    // 调用分页逻辑
    const { list, resetList } = useListPaging({
      getList: async (page) => {
        const { data } = await reqGetCartList({ page, limit: 10 });
        /**初始化选择 */
        data.data.data.forEach((item: any) => {
          item.select = false;
        });
        return data.data.data.filter((item: any) => item.good);
      },
      prohibitInit: true,
    });
    // 存储传入的数据
    onLoad(async (options) => {
      const ids: string[] = JSON.parse(options?.ids || '[]');
      await resetList();
      loadingStatus.value = false;
      list.value.forEach((item) => {
        const select = ids.some((iv) => iv === item.goods_id);
        item.select = select;
      });
    });
    // 调用多选逻辑
    const multipleSelect = useMultipleSelect(list);
    const total = computed(() =>
      multipleSelect.selects.value.reduce(
        (p: any, e: any) => p + e.good.price * e.num,
        0
      )
    );
    multipleSelect.isSelectAll.value = false;
    multipleSelect.onHandleSelectsToggle(false);
    const $hexColor = computed(
      (): CssLightVariableType => store.getters.hexColor
    );
    return {
      list,
      ...multipleSelect,
      resetList,
      total,
      $hexColor,
      loadingStatus,
    };
  },
  watch: {},

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
page {
  height: 100%;
}
.shop-cart {
  background-color: #f7f7f7;
  height: 100%;
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
/* 自定义组件 */
u-empty {
  .u-icon__label {
    margin-top: 60rpx !important;
  }
}
.price-width {
  width: 168rpx;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.navbar-control {
  margin-left: 25rpx;
}
.u-number-input {
  z-index: 0;
}
/* 底部操作框 */
.footer-container {
  z-index: 10;
  width: 100%;
  height: 120rpx;
  background: #ffffff;
  .content {
    position: relative;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    height: 100%;
    align-items: center;
    padding: 0 25rpx;
  }
}
.footer-left {
  .tips {
    margin-left: 10rpx;
  }
  .price {
    font-weight: bold;
  }
}
.footer-right {
  u-button {
    margin-left: 20rpx;
  }
  .tips {
    font-size: 24rpx;
  }
}
/* 商品信息 */
.custom-cart-body .right-column {
  background-color: #fff;
  margin-left: 25rpx;
  flex-direction: column;
  align-items: flex-start;
  width: 400rpx;
  .title {
    @include text-hidden-line(2);
    height: 75rpx;
  }
  .labels {
    u-tag:not(:last-child) {
      margin-right: 20rpx;
    }
  }
  .controls {
    width: 100%;
    .price {
      color: #ff3d00;
      font-size: 34rpx;
      font-weight: bold;
    }
    .tips {
      flex: 1;
      font-size: 22rpx;
      color: #acacac;
    }
  }
}
</style>
