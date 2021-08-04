<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2021-01-19 11:01:59
 * @LastEditTime: 2021-05-28 09:22:47
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="authentication">
    <u-tabs
      active-color="#FF7E5F"
      inactive-color="#ADADAD"
      bar-width="375"
      :list="tabs"
      :is-scroll="false"
      :current="current"
      @change="onChange"
    />
    <!-- 个人认证 -->
    <div class="header-container">
      <div class="title">
        {{ typeTexts[form.type].title }}
      </div>
      <u-upload
        :width="670"
        :height="360"
        :custom-btn="true"
        :max-count="1"
        :action="upload.uploadurl"
        :form-data="{ costoken: upload.multipart.costoken }"
        :deletable="edit"
        :show-progress="edit"
        :file-list="frontImages"
        :header="$siteinfo"
        @on-uploaded="onAfterEachUpload($event, 'front_image')"
        @on-list-change="onAfterEachUpload($event, 'front_image')"
      >
        <div
          slot="addBtn"
          class="slot-btn"
          hover-class="slot-btn__hover"
          hover-stay-time="150"
        >
          <u-icon name="camera-fill" size="112" color="#dadada" />
          <custom-blank :height="24" />
          <span>{{ typeTexts[form.type].formText }}</span>
        </div>
      </u-upload>
      <custom-blank :height="20" />
      <u-upload
        v-if="current === 0"
        :width="670"
        :height="360"
        :custom-btn="true"
        :max-count="1"
        :action="upload.uploadurl"
        :form-data="{ costoken: upload.multipart.costoken }"
        :deletable="edit"
        :show-progress="edit"
        :file-list="backImages"
        :header="$siteinfo"
        @on-uploaded="onAfterEachUpload($event, 'back_image')"
        @on-list-change="onAfterEachUpload($event, 'back_image')"
      >
        <div
          slot="addBtn"
          class="slot-btn"
          hover-class="slot-btn__hover"
          hover-stay-time="150"
        >
          <u-icon name="camera-fill" size="112" color="#dadada" />
          <custom-blank :height="24" />
          <span>身份证反面照片</span>
        </div>
      </u-upload>
      <custom-blank :height="40" />
    </div>
    <div class="body-container">
      <div class="title">{{ typeTexts[form.type].nameLabelText }}</div>
      <div class="form-container">
        <u-field
          input-align="right"
          v-model="form.name"
          required
          :label="typeTexts[form.type].nameLabelText"
          label-width="180"
          :placeholder="`请输入${typeTexts[form.type].nameLabelText}`"
          :disabled="!edit"
        />
        <u-field
          input-align="right"
          v-model="form.idcard"
          required
          :label="typeTexts[form.type].codeLabelText"
          label-width="260"
          :placeholder="`请输入${typeTexts[form.type].codeLabelText}`"
          :disabled="!edit"
        />
      </div>
    </div>
    <div class="edit-btns-container" v-if="edit">
      <u-button type="primary" shape="circle" @click="onSubmitAuth">
        提交
      </u-button>
    </div>
  </div>
</template>

<script lang="ts">
import { reqIdCardSave } from '@/api';
import { plotForm } from '@/plugins/form-strategy';
import { showToast } from '@/utils';
import store from '@/store';
import Vue from 'vue';

export default Vue.extend({
  components: {},
  data: () => ({
    $siteinfo: Vue.prototype.$siteinfo,
    tabs: [
      { name: '个人认证', id: 1 },
      { name: '企业认证', id: 2 },
    ],
    current: 0,
    form: {
      type: 1 as 1 | 2,
      // 个人认证信息
      front_image: '',
      back_image: '',
      name: '',
      idcard: '',
    },
    // 是否可编辑
    edit: true,
    // 正面展示照
    frontImages: [] as any[],
    // 反面展示照
    backImages: [] as any[],
    // 类型字段
    typeTexts: {
      1: {
        title: '上传身份证',
        imageText: '身份证正面照片',
        formText: '填写个人信息',
        nameLabelText: '真实姓名',
        codeLabelText: '身份证号码',
      },
      2: {
        title: '上传营业执照',
        imageText: '营业执照照片',
        formText: '填写企业信息',
        nameLabelText: '企业名称',
        codeLabelText: '统一社会信用代码',
      },
    },
  }),
  computed: {
    upload: () => store.state.common.upload,
  },
  methods: {
    // 图片上传完毕/删除钩子, 将上传数据重新组合, 并赋值到表单信息中
    onAfterEachUpload(lists: any[], key: 'front_image' | 'back_image') {
      const updatePaths: string[] = lists
        .map((item) => {
          return item.response?.data?.url;
        })
        .filter((item) => item);
      const images = updatePaths.join(',').trim();
      this.form[key] = images;
    },
    // 提交个人认证信息
    async onSubmitAuth() {
      if (this.current == 0) {
        const { validate } = plotForm.validateAll(
          ['empty', this.form.front_image, '身份证正面'],
          ['empty', this.form.back_image, '身份证反面'],
          ['chineseName', this.form.name],
          ['identityId', this.form.idcard]
        );
        if (!validate) return false;
        await reqIdCardSave(this.form);
        await showToast({ title: '提交成功!' });
        store.dispatch('getAuthentication');
        this.$navigateBack();
      } else {
        const { validate } = plotForm.validateAll(
          ['empty', this.form.front_image, '身份证正面'],
          ['empty', this.form.name, '企业名称'],
          ['empty', this.form.idcard, '信用代码']
        );
        if (!validate) return false;
        await reqIdCardSave(this.form);
        await showToast({ title: '提交成功!' });
        store.dispatch('getAuthentication');
        this.$navigateBack();
      }
    },
    // 初始化获取个人认证信息
    async initAuthDetail() {
      const authentication = store.state.user.authentication;
      const isAuthentication = store.getters.isAuthentication;
      if (!isAuthentication) return false;
      this.edit = false;
      this.form.type = authentication.type;
      this.current = authentication.type == 1 ? 0 : 1;
      this.frontImages = [{ url: authentication.front_image_text }];
      this.backImages = [{ url: authentication.back_image_text }];
      this.form.name = authentication.name;
      this.form.idcard = authentication.idcard;
    },
    // 进行切换表单
    onChange(index: number) {
      if (!this.edit) {
        const tips =
          this.form.type == 1
            ? '已认证个人无法进行企业认证'
            : '已认证企业无法进行个人认证';
        showToast({ title: tips, icon: 'none' });
        return false;
      }
      this.current = index;
      this.form.type = this.tabs[this.current].id as 1 | 2;
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
    store.dispatch('getCommonConfig');
    this.initAuthDetail();
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
@include full-page(authentication);
.authentication {
  margin-top: -1rpx;
}
.header-container {
  padding: 28rpx 40rpx;
  .title {
    margin-bottom: 28rpx;
    font-weight: bold;
  }
}
.body-container {
  .title {
    margin-left: 40rpx;
    margin-bottom: 20rpx;
    font-weight: bold;
  }
}
.slot-btn {
  width: 670rpx;
  height: 360rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #ffffff;
  border-radius: 10rpx;
  font-size: 24rpx;
}

.slot-btn__hover {
  background-color: rgb(235, 236, 238);
}
</style>
