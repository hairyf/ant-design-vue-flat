<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-19 16:47:02
 * @LastEditTime: 2021-07-12 16:41:56
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <cal-layout-sider class="rounded-3xl" :collapsed="collapsed" :collapsed-width="64" :width="100">
    <div class="text-center mx-auto">
      <cal-icon
        class="cursor-pointer transform my-28"
        @click="collapsed = !collapsed"
        :class="[collapsed ? 'rotate-0' : '-rotate-180']"
        type="collapsed"
        color="#ffffff"
        :svg-size="true"
      />
    </div>

    <cal-menu :collapse="collapsed" :default-active="currentPaths">
      <cal-menu-item key="adwa"> adsa </cal-menu-item>
    </cal-menu>
  </cal-layout-sider>
</template>
<script lang="ts" setup>
  import { computed, ref } from 'vue-demi'
  import { useRoute } from 'vue-router'
  const route = useRoute()

  const collapsed = ref(false)
  /** 当前路径信息 */
  const currentPaths = computed(() => {
    return route.matched.map((r) => r.path)
  })
</script>
<style lang="scss" scoped></style>
