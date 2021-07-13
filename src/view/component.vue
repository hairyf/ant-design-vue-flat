<!--
 * @Author: Mr.Mao
 * @Date: 2021-07-08 15:29:03
 * @LastEditTime: 2021-07-13 10:35:48
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
  <cal-card> 7856120 </cal-card>
  <div class="h-320">
    <cal-textarea
      v-model:value="value"
      placeholder="简短描述需备注信息"
      class="w-353 rounded-xl h-80"
    ></cal-textarea>
  </div>
  <cal-upload> 将需要上传的Excel文件拖放至此进行上传 </cal-upload>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  const props = defineProps({})
  const currentType = ref('1')
  const value = ref('')
</script>

<style lang="scss" scoped></style>
