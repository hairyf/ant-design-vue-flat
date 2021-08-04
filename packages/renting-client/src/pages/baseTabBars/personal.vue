<!--
 * @Author: Mr.Mao
 * @LastEditors: liupei
 * @Date: 2021-01-15 09:23:56
 * @LastEditTime: 2021-05-27 19:41:45
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="personal">
    <!-- 头部导航 -->
    <div class="header-container">
      <!-- 用户信息 -->
      <div
        class="user-info u-flex"
        @click="
          onHandleNaviItem({ path: '/pages/users/userInfo', login: true })
        "
      >
        <u-avatar class="left-column" :src="user.info.avatar" size="112" />
        <div class="center-column u-flex-1">
          <div class="phone">{{ user.info.nickname || '登录注册' }}</div>
          <div class="tips">
            {{ isAuthUserInfo ? '查看并修改个人信息' : '登录查看更多信息' }}
          </div>
        </div>
        <div class="right-column">
          <u-icon color="#ADADAD" name="arrow-right" />
        </div>
      </div>
      <!-- 操作栏 -->
      <!-- <div class="tab-container u-flex">
        <div
          class="tab-item"
          @click="
            onHandleNaviItem({ path: '/pages/users/collection', login: false })
          "
        >
          <custom-icon class="left-column" name="heart" :size="96" />
          <div class="right-column">
            <div class="title">收藏</div>
            <div class="tips">您喜爱的</div>
          </div>
        </div>
        <div
          class="tab-item"
          @click="
            onHandleNaviItem({
              path: '/pages/appointments/appointmentList',
              login: false,
            })
          "
        >
          <custom-icon class="left-column" name="menu" :size="96" />
          <div class="right-column">
            <div class="title">预约</div>
            <div class="tips">实地看房</div>
          </div>
        </div>
      </div> -->
    </div>
    <!-- 常用功能 -->
    <div class="commonly-used">
      <div class="title">常用功能</div>
      <u-grid :border="false" :col="3">
        <u-grid-item
          :custom-style="{ padding: '20rpx 0' }"
          v-for="(item, index) in commonlys"
          :key="index"
          @click="onHandleNaviItem(item)"
        >
          <custom-icon :name="item.icon" :size="96" />
          <div class="grid-text">{{ item.title }}</div>
          <u-badge :count="item.count" size="mini" type="error"></u-badge>
        </u-grid-item>
      </u-grid>
    </div>
    <!-- 我的服务 -->
    <div class="my-serves">
      <div class="title">我的服务</div>
      <div class="cell-container">
        <button
          v-for="(item, index) in servers"
          :key="index"
          class="cell-item u-flex u-reset-button"
          @click="onHandleNaviItem(item)"
        >
          <custom-icon class="left-column" :name="item.icon" :size="48" />
          <div class="right-column u-flex u-flex-1 u-border-bottom">
            <span class="cell-title">{{ item.title }}</span>
            <u-icon color="#ADADAD" name="arrow-right" />
          </div>
        </button>
      </div>
    </div>
    <!-- <custom-blank height="240" /> -->
    <div
      v-if="user.info.group_id == 4"
      class="admin-btns u-flex"
      @click="$navigateTo('/pages/admins/adminPage')"
    >
      <div>我是</div>
      <div>房东</div>
    </div>
    <!-- 自定义tabbar -->
    <custom-tabbar />
    <!-- 授权登录模拟框 -->
    <u-modal
      v-model="showLoginModal"
      show-cancel-button
      content="登录后查看更多信息"
      @confirm="$navigateTo('/pages/commons/login')"
    />
    <common-contacts v-model="serverPopupShow" />
  </div>
</template>

<script lang="ts">
import { reqUserMarker } from '@/api';
import store from '@/store';
import { PLATFORM } from '@/utils';
import Vue from 'vue';
import { tabbarConfig } from '@/config';

type NaviInfos = {
  path: string;
  login?: boolean;
  title?: string;
  icon?: string;
}[];
export default Vue.extend({
  components: {},
  mixins: [tabbarConfig],
  data: () => ({
    showLoginModal: false,
    // 服务导航
    servers: [
      {
        path: '/pages/admins/housePublishList',
        login: true,
        title: '房源发布',
        icon: 'house',
      },
      {
        path: '/pages/users/collection',
        login: false,
        title: '我的收藏',
        icon: 'collection',
      },
      {
        path: '/pages/commons/guarantees',
        login: false,
        title: '在线报修',
        icon: 'discount',
      },
      {
        path: '/pages/orders/rentRefunds',
        login: false,
        title: '退租',
        icon: 'out',
      },
      { path: '', login: true, title: '客服', icon: 'calling' },
      // {
      //   path: '/pages/users/setPassword',
      //   login: false,
      //   title: '支付密码',
      //   icon: 'lock',
      // },
      {
        path: '/pages/users/authentication',
        login: false,
        title: '实名认证',
        icon: 'add-user',
      },
      {
        path: '/pages/commons/feedbackOrHelp',
        login: false,
        title: '帮助与反馈',
        icon: 'edit-squ',
      },
    ] as NaviInfos,
    // 常用功能导航
    commonlys: [
      {
        path: '/pages/users/lifeCounts',
        login: true,
        title: '生活统计',
        icon: 'chart',
        count: 0,
      },
      {
        path: '/pages/orders/myOrders',
        login: false,
        title: '我的账单',
        icon: 'document',
        count: 0,
      },
      {
        path: '/pages/orders/contracts',
        login: false,
        title: '租房合同',
        icon: 'edit',
        count: 0,
      },
    ],
    // 客服菜单栏
    serverPopupShow: false,
  }),
  computed: {
    user: () => store.state.user,
    isAuthUserInfo: (): boolean => store.getters.isAuthUserInfo,
  },
  methods: {
    // 处理导航项点击
    async onHandleNaviItem(serveItem: NaviInfos[number]) {
      if (serveItem.login) {
        try {
          await store.dispatch('getBeOverdueLogin');
        } catch (error) {
          this.showLoginModal = true;
          return false;
        }
      }
      if (serveItem.title === '客服' && PLATFORM === 'mp-weixin') {
        return (this.serverPopupShow = true);
      }
      // 如小程序则跳转至第三方反馈小程序
      if (serveItem.title === '帮助与反馈' && PLATFORM === 'mp-weixin') {
        return uni.navigateToMiniProgram({
          appId: 'wx8abaf00ee8c3202e',
          extraData: {
            id: 306184,
          },
        });
      }
      this.$navigateTo(serveItem.path);
    },
    // 获取角标数据
    async initUserMarker() {
      if (!this.isAuthUserInfo) return false;
      const { data } = await reqUserMarker();
      // this.commonlys[0].count = data.detail;
      this.commonlys[1].count = data.order;
      this.commonlys[2].count = data.contract;
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {
    this.initUserMarker();
  },
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
@include full-page(personal);
.personal {
  padding-bottom: 1rpx;
}
/* 头部容器 */
.header-container {
  padding: 40rpx;
  padding-bottom: 20rpx;
  background-color: #ffffff;
  /* 用户信息 */
  .user-info {
    margin-bottom: 60rpx;
    .center-column {
      margin: 0 20rpx;
    }
    .phone {
      margin-bottom: 10rpx;
      font-size: 40rpx;
      font-weight: bold;
    }
    .tips {
      font-size: 20rpx;
    }
  }
  /* 操作容器 */
  .tab-container {
    .tab-item:first-child {
      margin-right: 25rpx;
    }
    .tab-item {
      display: flex;
      align-items: center;
      flex: 1;
      padding: 20rpx 40rpx;
      background: #ffffff;
      box-shadow: 0px 0px 20rpx rgba(255, 126, 95, 0.1);
      border-radius: 10rpx;
      .left-column {
        margin-right: 20rpx;
        flex-shrink: 0;
      }
      .title {
        font-weight: bold;
      }
      .tips {
        font-size: 24rpx;
        color: #acacac;
      }
    }
  }
}
/* 常用功能 */
.commonly-used,
.my-serves {
  background-color: #ffffff;
  padding-top: 40rpx;
  margin: 20rpx 0;
  .title {
    font-weight: bold;
    margin-left: 32rpx;
  }
}
/* 我的服务 */
.my-serves {
  .title {
    margin-bottom: 30rpx;
  }
  .cell-container {
    padding: 0 40rpx;
  }
  .cell-item {
    .left-column {
      margin-right: 20rpx;
    }
    .right-column {
      padding: 32rpx 0;
      justify-content: space-between;
    }
  }
}

.serve-slot-body {
  height: 521rpx;
  overflow-y: auto;
  u-icon {
    margin-right: 15rpx;
  }
}
</style>
