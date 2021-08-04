<!--
 * @Author: Mr.Mao
 * @LastEditors: Pan.Yu.Lin
 * @Date: 2021-01-08 09:52:39
 * @LastEditTime: 2021-05-14 17:54:24
 * @Description: 商城
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="union-l-3-class">
    <div class="shop-mall" v-if="list">
      <!-- 内容区域 -->
      <div class="shop-menu-content" :style="{ height: menuContentHeight }">
        <!-- 左侧导航区 -->
        <scroll-view
          scroll-y
          scroll-with-animation
          class="u-tab-view menu-scroll-view"
          :scroll-top="scrollTop"
        >
          <div
            v-for="(item, index) in list"
            :key="index"
            class="u-tab-item"
            :class="[current == index ? 'u-tab-item-active' : '']"
            @click.stop="onToggleMenu(index, item.children)"
          >
            <text class="u-line-1">{{ item.name }}</text>
          </div>
        </scroll-view>
        <!-- 右侧内容区 -->
        <scroll-view scroll-y class="right-content" v-if="list">
          <div class="banner">
            <link-controller :data="bannerImg[1]">
              <u-image
                :loading-icon="null"
                width="100%"
                height="180rpx"
                :src="bannerImg[0]"
              />
            </link-controller>
          </div>
          <div v-if="levelTwoMenuList.length">
            <u-card
              padding="10"
              margin="30rpx 0rpx"
              :head-border-bottom="false"
              v-for="(item, index) in levelTwoMenuList"
              :key="index"
            >
              <div class="custom-cart-head" slot="head">{{ item.name }}</div>
              <u-grid :col="3" :border="false" slot="body">
                <u-grid-item
                  v-for="(citem, cindex) in item.children"
                  :key="cindex"
                  @click="
                    $navigateTo(`/pages/commons/searchResult`, {
                      classId: citem.id,
                    })
                  "
                >
                  <u-image
                    :width="120"
                    v-if="citem.thumb"
                    :height="120"
                    :src="citem.thumb"
                    :loading-icon="null"
                  />
                  <span>{{ citem.name }}</span>
                </u-grid-item>
                <div class="u-flex u-row-center" style="width: 100%">
                  <u-empty v-if="!item.children" text="暂无分类" mode="list" />
                </div>
              </u-grid>
            </u-card>
          </div>
          <div v-else>
            <u-empty margin-top="100" text="暂无分类" mode="list" />
          </div>
        </scroll-view>
      </div>
    </div>
    <u-empty margin-top="400" v-if="!list" text="当前暂无商品" mode="list" />
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
  components: {},
  data: () => ({
    // tab标题的滚动条位置
    scrollTop: 0,
    // 预设当前项的值
    current: 0,
    // 左边菜单的高度
    menuHeight: 0,
    // 左边菜单item的高度
    menuItemHeight: 0,
    // 内容体高度
    menuContentHeight: 'calc(100vh - 176px)',
    // tabbar: classify,
    // 储存二级菜单
    levelTwoMenuList: [] as any[],
    shopInfo: {} as any,
  }),

  methods: {
    // 点击左边的栏目切换
    onToggleMenu(index: number, children?: any[]) {
      if (typeof children !== 'undefined') {
        this.levelTwoMenuList = children;
      } else {
        this.levelTwoMenuList = [];
      }
      if (index == this.current) return;
      this.current = index;
      // 如果为0，意味着尚未初始化
      if (this.menuHeight == 0 || this.menuItemHeight == 0) {
        this.getElRect('.menu-scroll-view', 'menuHeight');
        this.getElRect('.u-tab-item', 'menuItemHeight');
      }
      // 将菜单菜单活动 item 垂直居中
      this.scrollTop =
        index * this.menuItemHeight +
        this.menuItemHeight / 2 -
        this.menuHeight / 2;
    },
    // 获取一个目标元素的高度
    getElRect(selectText: string, dataVal: 'menuHeight' | 'menuItemHeight') {
      const query = uni.createSelectorQuery().in(this);
      query
        .select(selectText)
        .fields({ size: true }, (result) => {
          // 如果节点尚未生成，result值为null，循环调用执行
          if (!result) {
            setTimeout(() => {
              this.getElRect(selectText, dataVal);
            }, 10);
            return;
          }
          this[dataVal] = result.height;
        })
        .exec();
    },
    // 初始化获取页面内容区高度
    initContentHeight() {
      const systemInfo = uni.getSystemInfoSync();
      const statusBarHeight = systemInfo.statusBarHeight;
      const tabbarHeight = 50;
      const navbarHeight = systemInfo.platform == 'ios' ? 44 : 48;
      const isPhoneX = systemInfo.model.search('iPhone X') !== -1;
      const deviation = isPhoneX ? 20 : 0;
      this.menuContentHeight = `calc(100vh - ${
        tabbarHeight + navbarHeight + statusBarHeight + deviation
      }px)`;
    },
    //初始化菜单数据
  },
  // 组件周期函数--监听组件挂载完毕
  created() {
    if (typeof this.list !== 'undefined') {
      this.levelTwoMenuList = this.list[0]?.children || [];
    }
    this.initContentHeight();
  },
  watch: {},
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

<style lang="scss" scoped>
.union-l-3-class {
  height: 100%;
  overflow: hidden;
}
.shop-menu-content {
  height: calc(100vh - 176px);
  /* #ifdef H5 */
  height: calc(100vh - var(--window-top));
  /* #endif */
  display: flex;
}

.right-content {
  .banner {
    width: 100%;
    height: 180rpx;
  }
  height: 100%;
  padding: 20rpx;
  background-color: #f7f7f7;
  u-swiper {
    margin-bottom: 48rpx;
  }
  u-image {
    margin-bottom: 15rpx;
  }
}

.u-tab-view {
  width: 200rpx;
  height: 100%;
}

.u-tab-item {
  height: 110rpx;
  background: #ffffff;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26rpx;
  color: #444;
  font-weight: 400;
  line-height: 1;
}

.u-tab-item-active {
  position: relative;
  color: #fe9b2a;
  background: rgba(254, 155, 42, 0.1);
}

.u-tab-item-active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 39rpx;
  height: 32rpx;
  width: 4rpx;
  border-radius: 10rpx;
  background-color: $u-type-primary;
}

.u-tab-view {
  height: 100%;
}

.right-box {
  background-color: rgb(250, 250, 250);
}

.page-view {
  padding: 16rpx;
}

.class-item {
  margin-bottom: 30rpx;
  background-color: #fff;
  padding: 16rpx;
  border-radius: 8rpx;
}

.class-item:last-child {
  min-height: 100vh;
}

.item-title {
  font-size: 26rpx;
  color: $u-main-color;
  font-weight: bold;
}

.item-menu-name {
  font-weight: normal;
  font-size: 24rpx;
  color: $u-main-color;
}

.item-container {
  display: flex;
  flex-wrap: wrap;
}

.thumb-box {
  width: 33.333333%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 20rpx;
}

.item-menu-image {
  width: 120rpx;
  height: 120rpx;
}
</style>
