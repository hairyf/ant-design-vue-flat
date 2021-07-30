<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-17 18:48:39
 * @LastEditTime: 2021-07-25 17:52:31
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-config-provider :locale="zhch">
    <cal-config-provider :locale="locale" :theme-overrides="{}">
      <cal-theme-editor>
        <router-view></router-view>
        <cal-global-style />
      </cal-theme-editor>
      <cal-nprogress :router="$router" />
    </cal-config-provider>
  </el-config-provider>
</template>
<script lang="ts" setup>
  import locale from 'ant-design-vue/es/locale/zh_CN'
  import zhch from 'element-plus/lib/locale/lang/zh-cn'
</script>
