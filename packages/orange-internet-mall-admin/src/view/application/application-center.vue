<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-03-01 17:56:51
 * @LastEditTime: 2021-05-08 15:40:10
 * @Description: 应用中心
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div>
    <div class="header oe-flex oe-row-between">
      <div class="title"> 基础应用 </div>
      <div class="oe-flex">
        <div class="header-text">应用名称</div>
        <el-input v-model="inputText" placeholder="请输入应用名称">
          <template #suffix>
            <i class="el-icon-search el-input__icon" style="cursor: pointer"></i>
          </template>
        </el-input>
      </div>
    </div>
    <!-- <el-card shadow="never" class="application-box">
      <div class="application-box-top">
        <el-image src="/custom-assets/images/application/notice.png"></el-image>
        <el-switch v-model="value"> </el-switch>
      </div>
      <div class="application-box-title">消息通知</div>
      <div class="application-box-text">
        通过发短信、微信模板消息，将重要信息即时推送给用户/商家
      </div>
      <el-button type="text">管理应用</el-button>
    </el-card> -->
    <el-image src="/custom-assets/images/application/notice-img.png" style="margin-bottom: 24px">
    </el-image>
    <div class="title"> 营销应用 </div>
    <div class="development">
      <el-image src="/custom-assets/images/application/integral.png"> </el-image>
      <el-image src="/custom-assets/images/application/recharge.png"> </el-image>
      <el-image src="/custom-assets/images/application/consumption.png"> </el-image>
      <el-image src="/custom-assets/images/application/welfare.png"> </el-image>
      <el-image src="/custom-assets/images/application/integral-luck.png"> </el-image>
      <el-image src="/custom-assets/images/application/points-mall.png"> </el-image>
      <div style="margin-top: 24px">
        <el-image src="/custom-assets/images/application/lucky-draw.png"> </el-image>
        <el-image src="/custom-assets/images/application/group-work.png"> </el-image>
        <el-image src="/custom-assets/images/application/seckill.png"> </el-image>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  const inputText = ref('')
</script>
<style lang="scss" scoped>
  .title {
    margin-bottom: 14px;
    font-weight: bold;
    font-size: 16px;
    line-height: 20px;
  }
  .header {
    .header-text {
      width: 85px;
      margin-right: 10px;
      font-size: 14px;
      line-height: 22px;
      color: #000000;
    }
  }
  .application-box {
    margin-bottom: 28px;
    width: 240px;
    height: 200px;
    .el-image {
      width: 54px;
      height: 54px;
    }
    .application-box-top {
      display: flex;
      justify-content: space-between;
    }
    .application-box-title {
      margin-top: 4px;
      font-weight: bold;
      font-size: 16px;
      color: #000000;
    }
    .application-box-text {
      margin: 5px 0 10px 0;
      font-size: 12px;
      line-height: 16px;
      color: #8c8c8c;
    }
    .el-button {
      padding: 0;
      min-height: 10px;
      line-height: none !important;
    }
  }
  .development {
    .el-image {
      border-radius: 10px;
      width: 240px;
      height: 200px;
      margin-right: 24px;
    }
  }
</style>
