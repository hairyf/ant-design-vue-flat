<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-20 14:35:05
 * @LastEditTime: 2021-02-24 18:34:51
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="apply-guarantee">
    <div class="form-container">
      <u-field
        maxlength="10"
        input-align="right"
        required
        v-model="form.title"
        label="姓名"
        placeholder="请输入姓名"
      />
      <u-field
        input-align="right"
        required
        v-model="form.tel"
        label="联系方式"
        placeholder="请输入联系方式"
      />
      <custom-blank height="20" />
      <custom-textarea
        v-model="form.declare"
        label="问题描述"
        placeholder="请描述问题详细情况"
        label-color="#000"
      >
        <span class="u-m-l-12 label-slot" slot="left">*</span>
      </custom-textarea>
      <custom-blank height="20" />
      <u-upload
        width="150"
        height="150"
        max-count="5"
        :action="upload.uploadurl"
        :form-data="{ costoken: upload.multipart.costoken }"
        :header="$siteinfo"
        @on-uploaded="onAfterEachUpload"
        @on-list-change="onAfterEachUpload"
      />
    </div>
    <div class="edit-btns-container">
      <u-button type="primary" shape="circle" @click="onSubmit"
        >立即报修</u-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { reqRepairsAdd } from '@/api';
import { plotForm } from '@/plugins/form-strategy';
import store from '@/store';
import { showToast } from '@/utils';
import Vue from 'vue';
export default Vue.extend({
  components: {},
  data: () => ({
    $siteinfo: Vue.prototype.$siteinfo,
    form: {
      title: '',
      tel: '',
      declare: '',
      images: '',
    },
  }),
  computed: {
    upload: () => store.state.common.upload,
  },
  methods: {
    // 图片上传完毕/删除钩子, 将上传数据重新组合, 并赋值到表单信息中
    onAfterEachUpload(lists: any[]) {
      const updatePaths: string[] = lists
        .map((item) => {
          return item.response?.data?.url;
        })
        .filter((item) => item);
      this.form.images = updatePaths.join(',').trim();
    },
    // 提交信息
    async onSubmit() {
      const validate = plotForm.validateAll(
        ['empty', this.form.title, '姓名'],
        ['phone', this.form.tel, '手机号'],
        ['empty', this.form.declare, '描述']
      ).validate;
      if (!validate) return false;
      await reqRepairsAdd(this.form);
      await showToast({ title: '添加成功', mask: true });
      this.$navigateBack();
      this.$uma.trackEvent('Um_Event_Item_Repair', {
        Um_Key_ItemName: this.form.title,
        Um_Key_ItemPhone: this.form.tel,
        Um_Key_ItemDeclare: this.form.declare,
        Um_Key_UserID: store.state.user.info?.user_id.toString(),
      });
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
    store.dispatch('getCommonConfig');
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
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
@include full-page(apply-guarantee);
.form-container {
  margin-top: 40rpx;
  padding: 40rpx 32rpx;
}
</style>
