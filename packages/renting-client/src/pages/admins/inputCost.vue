<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-20 17:11:55
 * @LastEditTime: 2021-02-25 14:29:11
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="input-cost">
    <!-- 顶部表单容器 -->
    <div class="form-container">
      <u-field
        input-align="right"
        required
        disabled
        :border-bottom="false"
        label="房子名称"
        placeholder="请选择房子名称"
        @click="$navigateTo('/pages/admins/selectHouseName')"
        :value="houseItem.name || ''"
      >
        <u-icon slot="right" name="arrow-right" color="#adadad" size="30" />
      </u-field>
      <!-- <u-field
        input-align="right"
        :border-bottom="false"
        required
        label="房租"
        placeholder="请输入房租"
      /> -->
    </div>
    <!-- 分类容器 -->
    <div class="type-container">
      <u-subsection
        bg-color="none"
        inactive-color="#B7B7B7"
        active-color="#ffffff"
        button-color="#FF7E5F"
        :list="types"
        :current="currentType"
        @change="currentType = $event"
      ></u-subsection>
    </div>
    <!-- 底部表单容器 -->
    <div class="form-container">
      <!-- <u-field
        input-align="right"
        required
        label="金额/元"
        placeholder="请输入金额/元"
      />
      <u-field
        input-align="right"
        required
        label="用电量/度"
        placeholder="请输入用电量/度"
      /> -->
      <!-- <u-field
        input-align="right"
        label="上期"
        placeholder="请输入上期用量"
        v-model="form.last_num"
      /> -->
      <u-field
        input-align="right"
        :border-bottom="false"
        required
        label="本期"
        placeholder="请输入本期用量"
        v-model="form.now_num"
      />
    </div>
    <div class="edit-btns-container">
      <u-button type="primary" shape="circle" @click="onSubmit">确认</u-button>
    </div>
  </div>
</template>

<script lang="ts">
import { reqHydropower } from '@/api';
import { plotForm } from '@/plugins/form-strategy';
import { showToast } from '@/utils';
import Vue from 'vue';
export default Vue.extend({
  components: {},
  data: () => ({
    // 费用类型
    types: [
      { id: 2, name: '电费' },
      { id: 1, name: '水费' },
      { id: 3, name: '燃气费' },
    ],
    currentType: 0,
    // 房子信息
    houseItem: {} as any,
    // 表单信息
    form: {
      order_id: '' as Key,
      type: 1 as Key,
      last_num: '',
      now_num: '',
    },
  }),
  computed: {},
  methods: {
    // 提交信息
    async onSubmit() {
      const validate = plotForm.validateAll(
        ['empty', this.houseItem.name || '', '房子名称'],
        ['empty', this.form.now_num, '本期用量']
      ).validate;
      if (!validate) return false;
      await reqHydropower(this.form);
      await showToast({ title: '录入成功!' });
      this.form.last_num = '';
      this.form.now_num = '';
    },
  },
  watch: {
    currentType: {
      immediate: true,
      handler() {
        this.form.type = this.types[this.currentType].id;
      },
    },
  },

  // 页面周期函数--监听页面加载
  onLoad(options: { order_id?: any; name?: string }) {
    if (typeof options.order_id !== 'undefined') {
      this.houseItem = {
        name: options.name,
        order_id: options.order_id,
      };
      this.form.order_id = options.order_id;
    }
    uni.$on('select-house-item', (houseItem) => {
      this.houseItem = houseItem;
      this.form.order_id = houseItem.order_id;
    });
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {
    uni.$off('select-house-item');
  },
  // 页面处理函数--监听用户下拉动作
  onPullDownRefresh() {
    uni.stopPullDownRefresh();
  },
  // 页面处理函数--监听用户上拉触底
  onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  /* onPageScroll(event) {}, */
  // 页面处理函数--用户点击右上角分享
  /* onShareAppMessage(options) {}, */
});
</script>

<style lang="scss">
@include full-page(input-cost);
.form-container {
  margin: 40rpx;
  padding: 40rpx 32rpx;
  border-radius: 10rpx;
}
.type-container {
  margin: 40rpx;
}
</style>
