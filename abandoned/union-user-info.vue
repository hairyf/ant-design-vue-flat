<!--
 * @Author: Mr.Mao
 * @LastEditors: Pan.Yu.Lin
 * @Date: 2021-01-09 11:52:36
 * @LastEditTime: 2021-05-10 15:17:26
 * @Description: 页面组合-用户信息
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="union-user-info">
    <div class="user-info u-flex" @click="onGoToEditUserInfo">
      <u-avatar
        class="left-column"
        :size="112"
        :src="userInfo.avatar"
      ></u-avatar>
      <div class="right-column u-flex">
        <div class="layer-1 u-flex">
          <span class="user-name">
            {{ userInfo.nickname || '点击头像进行登录' }}
          </span>
          <view-icon size="40" name="cl-set-up" />
        </div>
        <div class="layer-2">
          <u-tag
            class="u-margin-right-15"
            size="mini"
            text="Lv.1"
            mode="dark"
          />
          <u-tag
            class="u-margin-right-15"
            size="mini"
            text="会员积分 0"
            mode="dark"
          />
        </div>
      </div>
    </div>
    <div class="user-counts">
      <u-grid :col="3" :border="false" hover-class="none">
        <u-grid-item @click="$navigateTo('/pages/users/followShops')">
          <div class="count">{{ collect }}</div>
          <div class="tips">关注的商品</div>
        </u-grid-item>
        <u-grid-item @click="$navigateTo('/pages/users/footprint')">
          <div class="count">{{ read }}</div>
          <div class="tips">足迹</div>
        </u-grid-item>
        <u-grid-item
          @click="$navigateTo('/pages/shopOrders/myOrders', { id: 0 })"
        >
          <div class="count">{{ order }}</div>
          <div class="tips">全部订单</div>
        </u-grid-item>
      </u-grid>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store';
import Vue from 'vue';
import { reqReadCollect, reqOrderCount } from '@/api';
import { useLifecycleInject } from '@/hooks/use-page-lifecycle';
export default Vue.extend({
  props: {},
  data: () => ({
    showLoginModal: false,
    collect: 1,
    read: 0,
    order: 0,
  }),
  computed: {
    isAuthUserInfo: (): boolean => store.getters.isAuthUserInfo,
    userInfo: () => store.state.user.info,
  },
  methods: {
    // 跳转至编辑用户信息
    onGoToEditUserInfo() {
      if (this.isAuthUserInfo) {
        this.$navigateTo('/pages/commons/settings');
      } else {
        this.showLoginModal = true;
      }
    },
    // 获取收藏足迹统计角标
    async getCollectCount() {
      const { data } = await reqReadCollect();
      this.collect = data.data.collect;
      this.read = data.data.read;
    },
    // 获取订单统计角标
    async getOrderCount() {
      const { data } = await reqOrderCount();
      this.order = data.data.waitPay + data.data.waitSend + data.data.waitGet;
    },
  },
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {
    this.getCollectCount();
    this.getOrderCount();
  },
  setup: () => {
    useLifecycleInject({
      onLoad: () => {},
      onShow: () => {},
    });
  },
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() {},
  // 组件周期函数--监听组件数据更新之后
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
.union-user-info {
  position: relative;
  padding-bottom: 75rpx;
  margin-bottom: -45rpx;
  background: #ffffff;
}
/* 用户信息 */
.user-info {
  margin: 0 34rpx;
  padding-top: 36rpx;
}
.left-column {
  margin-right: 20rpx;
}
.right-column {
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  height: 112rpx;
  justify-content: space-between;
  .layer-1 {
    width: 100%;
    justify-content: space-between;
    .user-name {
      font-size: 40rpx;
    }
  }
}
</style>
