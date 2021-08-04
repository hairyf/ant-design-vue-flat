<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-08 16:04:55
 * @LastEditTime: 2021-01-08 16:37:11
 * @Description: 富文本展示页面
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="rich-text">
    <u-parse :html="content" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  components: {},
  data: () => ({
    content: '',
  }),
  computed: {},
  methods: {},
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options: { title: string; html: string }) {
    uni.setNavigationBarTitle({ title: options.title || '文本信息' });
    this.content = decodeURIComponent(options.html);
  },
});
</script>

<style lang="scss">
.rich-text {
  margin: 0 25rpx;
}
</style>
