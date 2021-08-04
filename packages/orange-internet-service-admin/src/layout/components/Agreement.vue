<!--
 * @Author: Mr.Mao
 * @LastEditors: Zhilong
 * @Date: 2021-03-03 09:36:20
 * @LastEditTime: 2021-07-23 16:58:59
 * @Description: 面包屑导航
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="mt-40 flex justify-items-center mx-auto pb-8" v-if="serviceCopy?.copyright == 0">
    <img
      v-if="!serviceCopy?.logo"
      src="@/assets/img/record.png"
      alt=""
      class="w-28 h-28 text-center"
    />
    <img v-if="serviceCopy?.logo" :src="serviceCopy?.logo" alt="" class="w-28 h-28 text-center" />
    <div class="ml-24 text-gray-darkmin text-center text-xs leading-6"
      >Copyright @{{ year }} {{ serviceCopy?.content }}. All Rights Reserved.
      {{ serviceCopy?.info || '微匠工 粤ICP备18089646号-6' }}</div
    >
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue-demi'
  import { useStore } from 'vuex'
  const store = useStore()
  const serviceCopy = store.state.copy.info

  const year = ref(0)
  year.value = new Date().getFullYear()
</script>
<style lang="scss"></style>
