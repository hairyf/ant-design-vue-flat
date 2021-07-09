<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-17 18:48:39
 * @LastEditTime: 2021-07-09 11:03:41
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <cal-config-provider :locale="locale">
    <router-view></router-view>
  </cal-config-provider>
</template>
<script lang="ts" setup>
  import locale from 'ant-design-vue/es/locale/zh_CN'
  import { transformTheme2CssVars, defaultTheme } from '~/utils/theme'
  import { CalConfigProvider } from '~/index'
  console.log(transformTheme2CssVars(defaultTheme()))
</script>
