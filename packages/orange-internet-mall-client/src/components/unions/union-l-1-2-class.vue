<!--
 * @Author: Mr.Mao
 * @LastEditors: Pan.Yu.Lin
 * @Date: 2021-01-08 09:52:39
 * @LastEditTime: 2021-05-13 19:35:03
 * @Description: 商城
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div>
    <div class="shop-mall" v-if="list">
      <!-- 内容区域 -->
      <div class="shop-menu-content">
        <scroll-view scroll-y class="right-content" v-if="list">
          <!-- <u-swiper :list="swiperList" :height="180"></u-swiper> -->
          <div class="banner u-m-b-25">
            <link-controller :data="bannerImg[1]">
              <u-image
                :loading-icon="null"
                width="100%"
                height="256rpx"
                :src="bannerImg[0]"
              />
            </link-controller>
          </div>
          <u-grid :col="4" :border="false">
            <u-grid-item
              v-for="(item, index) in list"
              :key="index"
              @click="
                $navigateTo(`/pages/commons/searchResult`, {
                  classId: item.id,
                })
              "
            >
              <div class="product">
                <u-image
                  :width="120"
                  :height="120"
                  v-if="item.thumb"
                  :src="item.thumb"
                  :loading-icon="null"
                />
              </div>
              <div>{{ item.name }}</div>
            </u-grid-item>
          </u-grid>
        </scroll-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    list: {
      type: Array as () => any[],
    },
    bannerImg: {
      type: Array as () => any[],
    },
  },
  computed: {},
});
</script>

<style lang="scss" scoped>
page,
.shop-mall {
  height: 100%;
}

.shop-menu-content {
  padding: 40rpx;
  height: calc(100vh - 176px);
  /* #ifdef H5 */
  height: calc(100vh - var(--window-top));
  /* #endif */
  display: flex;
}

.right-content {
  .banner {
    width: 100%;
    height: 256rpx;
    /* #ifdef MP-WEIXIN */
    margin-top: 100rpx;
    /* #endif */
  }
  height: 100%;
  // background-color: #f7f7f7;
  u-swiper {
    margin-bottom: 48rpx;
  }
  u-image {
    margin-bottom: 15rpx;
  }
}
</style>
