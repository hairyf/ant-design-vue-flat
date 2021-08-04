<!--
 * @Author: Mr.Mao
 * @Date: 2021-03-15 18:58:08
 * @LastEditTime: 2021-04-14 10:48:24
 * @Description: 页面信息视图项
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div
    class="nav-bar-container"
    :style="{ backgroundColor: option.navigationBarBackgroundColor }"
  >
    <span :style="{ color: option.navigationBarTextStyle }">
      {{ option.navigationBarTitleText }}
    </span>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
export default defineComponent({
  props: {
    option: {
      type: Object as () => {
        backgroundType: 'none' | 'background' | 'image';
        navigationBarTextStyle: string;
        navigationBarTitleText: string;
        navigationBarBackgroundColor: string;
        backgroundColor: string;
      },
      required: true,
    },
  },
});
</script>
<style lang="scss">
/* 视图层顶部容器 */
.nav-bar-container {
  user-select: none;
  cursor: pointer;
  position: relative;
  height: toRpx(75);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
  background-color: #ffffff;
  span {
    text-align: center;
    position: absolute;
    bottom: toRpx(18);
    left: 0;
    right: 0;
    margin: auto;
  }
}
</style>
