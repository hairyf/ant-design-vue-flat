<!--
 * @Author: Mr.Mao
 * @Date: 2021-07-08 15:29:03
 * @LastEditTime: 2021-07-13 09:55:51
 * @Description: 
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <cal-icon type="collapsed" />
  <cal-button>asdadaS</cal-button>
  <!-- <cal-grid :size="{ width: 300, height: 300 }">
    <div>
      <div>??</div>
    </div>
    <div> 1 </div>
    <div> 2 </div>
    <div> 3 </div>
    <div> 4 </div>
    <div> 5 </div>
    <div> 5 </div>
    <div> 5 </div>
  </cal-grid> -->
  <cal-tabs v-model:activeKey="currentType">
    <cal-tab-pane tab="微信支付" key="1"> 211 </cal-tab-pane>
    <cal-tab-pane tab="支付宝支付" key="2"> 122 </cal-tab-pane>
  </cal-tabs>
  <cal-card></cal-card>
</template>
<script lang="ts" setup>
  import CalTabs from '@/components/CustomAntds/CalTabs/index.vue'
  import { ref } from 'vue'
  const props = defineProps({})
  const currentType = ref('1')
</script>

<style lang="scss" scoped></style>
