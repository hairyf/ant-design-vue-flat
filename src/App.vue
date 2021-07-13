<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-17 18:48:39
 * @LastEditTime: 2021-07-12 20:02:19
 * @Description: 
 * @LastEditors: Pan.Yu.Lin
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <cal-config-provider :locale="locale" :theme-overrides="{}">
    <router-view></router-view>
    <cal-global-style />
  </cal-config-provider>
</template>
<script lang="ts" setup>
  import locale from 'ant-design-vue/es/locale/zh_CN'
</script>
