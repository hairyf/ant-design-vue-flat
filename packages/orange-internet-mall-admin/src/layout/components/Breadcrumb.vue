<!--
 * @Author: Mr.Mao
 * @LastEditors: Pan.Yu.Lin
 * @Date: 2021-03-03 09:36:20
 * @LastEditTime: 2021-05-07 09:44:34
 * @Description: 面包屑导航
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div
    class="oe-flex el-breadcrumb-container"
    :class="route.meta.title === '概览' ? 'overview' : ''"
  >
    <div v-if="showBackCrumb" class="oe-flex back-box" @click="router.back()">
      <i class="el-icon-arrow-left"></i>
      <span class="back-text">返回</span>
    </div>
    <el-breadcrumb separator="" v-if="showBreadCrumb">
      <template v-for="(item, index) in breadList" :key="index">
        <el-breadcrumb-item :to="item.path" v-if="item.meta.title">
          <i v-if="item.meta.icon" :class="['bread-icon', 'ad-' + item.meta.icon]"></i>
          <span class="text">{{ item.meta.title }}</span>
          <el-image
            class="arrow-tailor"
            src="/custom-assets/images/common/arrow-tailor.png"
            ondragstart="return false;"
          />
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  const route = useRoute()
  const router = useRouter()
  // 是否显示面包屑导航
  const showBreadCrumb = computed(() => {
    return route.meta.title !== '概览'
  })
  // 是否显示返回键
  const showBackCrumb = computed(() => route.meta.hidden)
  // 面包屑列表
  const breadList = computed(() => {
    // 如果第一项不是首页
    if (route.matched[0].meta.title !== '概览') {
      return [
        { path: '/', meta: { title: '概览', icon: 'home', activeMenu: '/' } },
        ...route.matched
      ]
    }
    return route.matched
  })
</script>
<style lang="scss" scoped="">
  @import '@/style/mixin.scss';
  .el-breadcrumb-container {
    &.overview {
      margin-bottom: 0;
    }
    margin-bottom: 20px;
    .back-box {
      cursor: pointer;
    }
    .back-text {
      font-size: 14px;
      margin: 0 23px 0 5px;
    }
  }
  :deep(.el-breadcrumb__item) {
    position: relative;
    height: 30px;
    line-height: 30px;
    padding: 0 12px;
    background-color: #fff;
    font-size: 12px;
    box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.05);
    .bread-icon {
      margin-right: 5px;
    }
    &:not(:first-child) {
      padding-left: 25px;
    }
    .arrow-tailor {
      position: absolute;
      z-index: 100;
      top: -2px;
      bottom: 0;
      right: -12px;
      height: 34px;
      padding-left: 14px;
      user-select: none;
      width: 12px;
      // cursor: default;
    }
    .el-breadcrumb__separator {
      display: none;
    }
  }
</style>
