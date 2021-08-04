<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-08 16:04:55
 * @LastEditTime: 2021-05-12 09:31:29
 * @Description: h5 页面跳转展示页面
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <web-view :src="url" />
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  components: {},
  data: () => ({
    url: '',
  }),
  computed: {},
  methods: {},
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options: { url: string; title?: string }) {
    console.log(options.url);
    this.url = decodeURIComponent(options.url);
    uni.setNavigationBarTitle({ title: options.title || '网页' });
  },
});
</script>

<style lang="scss"></style>
