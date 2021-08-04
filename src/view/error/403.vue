<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-02-24 17:37:19
 * @LastEditTime: 2021-04-28 17:50:11
 * @Description: 404页面
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="error oe-flex oe-row-center">
    <div class="left oe-m-r-30">
      <el-image style="width: 650px; height: 650px" src="/custom-assets/images/403.png" />
    </div>
    <div class="right">
      <div class="title">抱歉</div>
      <div class="subtitle">您没有操作角色...</div>
      <div class="tips">当前帐号没有操作角色,请联系管理员</div>
      <el-button type="primary" round @click="onBackHome">返回首页</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { computed } from '@vue/runtime-core'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  const store = useStore()
  const router = useRouter()
  const baseHomePath = computed((): string => store.getters.baseHomePath)
  const onBackHome = () => router.replace(baseHomePath.value)
</script>
<style lang="scss" scoped>
  .error {
    height: 100%;
  }
  .title {
    margin-bottom: 20px;
    color: var(--color-primary);
    font-size: 32px;
    font-weight: 700;
  }
  .subtitle {
    margin-bottom: 10px;
    font-weight: 700;
    font-size: 20px;
  }
  .tips {
    margin-bottom: 30px;
    font-size: 13px;
    color: #acacac;
  }
</style>
