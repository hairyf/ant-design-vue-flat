<!--
 * @Author: Mr.Mao
 * @Date: 2021-07-16 09:44:38
 * @LastEditTime: 2021-07-16 10:00:50
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <slot></slot>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalNprogress' })
</script>
<script lang="ts" setup>
  import { useRouter } from 'vue-router'
  import nProgress from 'nprogress'
  import type { NProgressOptions } from 'nprogress'
  import { watchEffect } from 'vue'
  const props = defineProps({
    option: Object as () => Partial<nProgress.NProgressOptions>
  })
  const router = useRouter()
  watchEffect(() => {
    if (!props.option) return undefined
    nProgress.configure(props.option)
  })
  router.beforeEach((to, from, next) => {
    // 每次切换页面时，调用进度条
    nProgress.start()
    next()
  })
  router.afterEach(() => {
    // 在即将进入新的页面组件前，关闭掉进度条
    nProgress.done()
  })
</script>

<style lang="scss">
  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background: var(--common-primary-color);
    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;

    width: 100%;
    height: 2px;
  }

  /* Fancy blur effect */
  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px var(--common-primary-color), 0 0 5px var(--common-primary-color);
    opacity: 1;

    -webkit-transform: rotate(3deg) translate(0px, -4px);
    -ms-transform: rotate(3deg) translate(0px, -4px);
    transform: rotate(3deg) translate(0px, -4px);
  }

  /* Remove these to get rid of the spinner */
  #nprogress .spinner {
    display: block;
    position: fixed;
    z-index: 1031;
    top: 15px;
    right: 15px;
  }

  #nprogress .spinner-icon {
    width: 18px;
    height: 18px;
    box-sizing: border-box;

    border: solid 2px transparent;
    border-top-color: var(--common-primary-color);
    border-left-color: var(--common-primary-color);
    border-radius: 50%;

    -webkit-animation: nprogress-spinner 400ms linear infinite;
    animation: nprogress-spinner 400ms linear infinite;
  }

  .nprogress-custom-parent {
    overflow: hidden;
    position: relative;
  }

  .nprogress-custom-parent #nprogress .spinner,
  .nprogress-custom-parent #nprogress .bar {
    position: absolute;
  }

  @-webkit-keyframes nprogress-spinner {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes nprogress-spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
