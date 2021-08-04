<!--
 * @Author: Mr.Mao
 * @Date: 2021-04-17 14:13:19
 * @LastEditTime: 2021-05-20 09:44:44
 * @Description: 视图控制器
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="view-controller safe-area-inset-bottom">
    <u-navbar
      v-if="isNavBar"
      :is-back="isBack"
      :border-bottom="false"
      :title="pageInfo.option.navigationBarTitleText"
      :title-color="pageInfo.option.navigationBarTextStyle"
      :background="{
        background: pageInfo.option.navigationBarBackgroundColor,
      }"
    />
    <div
      class="view-controller__container"
      :style="{
        backgroundColor: pageInfo.option.backgroundColor,
        height: containerHeight,
      }"
    >
      <!-- 布局容器 -->
      <div class="view-controller__main">
        <slot />
      </div>
      <!-- 粘连布局 -->
      <div class="view-controller__sticky">
        <slot name="sticky" />
      </div>
    </div>
    <!-- 底部固定布局 -->
    <div
      class="view-controller__footer safe-area-inset-bottom"
      :style="{ bottom: isTabBar ? '50px' : '0px' }"
    >
      <slot name="footer" />
    </div>
    <!-- 底部导航区 -->
    <u-tabbar
      v-if="isTabBar"
      :active-color="common.navigation.colorStyle.color.activeColor"
      :inactive-color="common.navigation.colorStyle.color.inactiveColor"
      :list="common.navigation.contentEdit.navis"
      @change="$store.dispatch('setTabBarIndex', $event)"
    />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import store from '@/store';
import { computed, defineComponent } from '@vue/composition-api';
import { useTemplates } from './hooks/use-templates';

export default defineComponent({
  props: {
    type: String,
  },
  setup(props) {
    const common = computed(() => store.state.common);

    // 模板以及页面信息
    const { pageInfo, isTabBar, isBack } = useTemplates(props.type);
    const isNavBar = computed(() => {
      return props.type;
    });
    // 自定义顶部导航偏移量
    const customNavbarOffsetTop = Vue.prototype.$customNavbarOffsetTop;

    // 容器布局高度
    const containerHeight = computed(() => {
      let offsetTop = isTabBar.value ? 50 : 0;
      if (isNavBar.value) {
        offsetTop += customNavbarOffsetTop;
      }
      return isTabBar.value
        ? `calc(100% - ${offsetTop}px)`
        : `calc(100% - ${offsetTop}px)`;
    });

    return {
      isTabBar,
      isNavBar,
      common,
      pageInfo,
      isBack,
      containerHeight,
    };
  },
});
</script>
<style lang="scss">
.view-controller {
  height: 100%;
}
.view-controller__container {
  position: relative;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5 !important;
}
.view-controller__footer {
  position: fixed;
  width: 100%;
}
.view-controller__main {
  flex: 1;
}
.view-controller__sticky {
  position: relative;
}
</style>
