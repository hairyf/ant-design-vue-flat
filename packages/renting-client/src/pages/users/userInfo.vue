<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2021-01-21 10:31:38
 * @LastEditTime: 2021-05-29 15:28:47
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="user-info">
    <!-- 自定义导航栏 -->
    <u-navbar :custom-back="onClickOutEdit" title="个人信息"> </u-navbar>
    <div class="form-container">
      <div
        class="custom-layer u-flex u-row-between u-border-bottom"
        @click="onGetUploadImage"
      >
        <u-avatar :src="imagePath" size="112" />
        <u-icon name="arrow-right" color="#adadad" />
      </div>
      <u-field
        input-align="right"
        v-model="form.nickname"
        maxlength="10"
        label="用户昵称"
        placeholder="请输入用户昵称"
      />
      <u-field
        input-align="right"
        disabled
        @click="genderSelectShow = true"
        :value="
          (form.gender === 0 && '女') || (form.gender === 1 && '男') || ''
        "
        label="性别"
        placeholder="请选择性别"
      >
        <u-icon slot="right" name="arrow-right" color="#adadad" />
      </u-field>
      <u-field
        input-align="right"
        disabled
        @click="birthdayDateSelectShow = true"
        :value="form.birthday"
        label="生日"
        placeholder="请选择生日"
      >
        <u-icon slot="right" name="arrow-right" color="#adadad" />
      </u-field>
      <u-field
        disabled
        input-align="right"
        v-model="userInfo.mobile"
        label="手机号"
      />
      <u-field
        disabled
        @click="$navigateTo('/pages/users/authentication')"
        input-align="right"
        :value="isAuthentication ? '查看' : '立即认证'"
        :label="isAuthentication ? '实名认证（已认证）' : '实名认证（未认证）'"
        label-width="350"
      >
        <u-icon slot="right" name="arrow-right" color="#adadad" />
      </u-field>
      <!-- <u-field input-align="right" label="手机号" placeholder="请输入手机号" />
      <u-field
        input-align="right"
        disabled
        label="地区"
        placeholder="请选择地区"
      >
        <u-icon slot="right" name="arrow-right" color="#adadad" />
      </u-field> -->
      <!-- 退出模拟框 -->
    </div>
    <!-- 性别选择框 -->
    <u-select
      v-model="genderSelectShow"
      :list="genderList"
      @confirm="onGenderSelect"
    />
    <u-picker
      v-model="birthdayDateSelectShow"
      mode="time"
      @confirm="onHandleTimeSelect"
      :params="{
        year: true,
        month: true,
        day: true,
        hour: true,
      }"
    />
    <!-- 信息未保存框 -->
    <u-modal
      v-model="outEditWindowShow"
      :show-title="false"
      :show-cancel-button="true"
      @confirm="$navigateBack"
      content="当前信息并未保存, 确认退出编辑吗?"
    ></u-modal>
    <common-fixed-footer :flex="false">
      <u-button type="primary" shape="circle" @click="onSubmitUserInfo">
        确定
      </u-button>
    </common-fixed-footer>
  </div>
</template>

<script lang="ts">
import { reqUpload } from '@/api';
import { showToast } from '@/utils';
import store from '@/store';
import Vue from 'vue';

export default Vue.extend({
  components: {},
  data: () => ({
    // 准备上传图片路径
    imagePath: '',

    // 表单信息
    form: {
      nickname: '',
      avatar: '',
      gender: '' as Key,
      birthday: '',
    },

    // 生日日期选择器是否弹出
    birthdayDateSelectShow: false,
    // 退出确认框是否弹出
    outEditWindowShow: false,
    // 性别选择框是否弹出
    genderSelectShow: false,
    // 性别队列
    genderList: [
      { value: 0, label: '女' },
      { value: 1, label: '男' },
    ],
  }),
  computed: {
    userInfo: () => store.state.user.info,
    // 当前是否修改
    isSetInfo(): boolean {
      return !(
        this.userInfo.nickname === this.form.nickname &&
        this.imagePath === this.form.avatar &&
        this.userInfo.gender === this.form.gender &&
        this.userInfo.birthday === this.form.birthday
      );
    },
    isAuthentication: (): boolean => store.getters.isAuthentication,
  },
  methods: {
    // 处理选择性别
    onGenderSelect(ev: [{ value: number; label: string }]) {
      const value = ev[0].value;
      this.form.gender = value;
    },
    // 处理时间选择
    onHandleTimeSelect(dates: any) {
      const timestampStr = `${dates.year}-${dates.month}-${dates.day}`;
      this.form.birthday = timestampStr;
    },
    // 跳转裁剪上传图片
    onGetUploadImage() {
      this.$navigateTo('/libs/components/u-avatar-cropper', {
        // 输出图片宽度，高等于宽，单位px
        destWidth: 300,
        // 裁剪框宽度，高等于宽，单位px
        rectWidth: 200,
        // 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
        fileType: 'jpg',
      });
    },
    // 提交编辑信息
    async onSubmitUserInfo() {
      // 是否有修改内容
      if (!this.isSetInfo) {
        uni.showToast({ title: '请修改信息', icon: 'none' });
        return false;
      }
      // 如图片不相同, 上传图片
      if (this.imagePath !== this.form.avatar) {
        const { data } = await reqUpload(this.imagePath);
        this.form.avatar = data.url;
      }
      await store.dispatch('editUserInfo', [
        this.form.nickname,
        this.form.avatar === this.imagePath ? '' : this.form.avatar,
        this.form.gender,
        this.form.birthday,
      ]);
      showToast({ title: '修改成功!' });
    },
    // 处理点击退出
    onClickOutEdit() {
      if (this.isSetInfo) {
        this.outEditWindowShow = true;
      } else {
        this.$navigateBack();
      }
    },
  },
  watch: {
    // 当用户数据发生改变, 覆盖当前修改数据
    userInfo: {
      immediate: true,
      handler(userInfo: UserInfo) {
        if (typeof userInfo.user_id === 'undefined') {
          return false;
        }
        this.form.nickname = userInfo.nickname;
        this.form.gender = userInfo.gender;
        this.form.avatar = userInfo.avatar;
        this.form.birthday = this.userInfo.birthday;
        this.imagePath = userInfo.avatar;
      },
    },
  },

  // 页面周期函数--监听页面加载
  onLoad() {
    uni.$on('uAvatarCropper', (path: string) => (this.imagePath = path));
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {
    uni.$off('uAvatarCropper');
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
@include full-page(user-info);
// .form-container {
//   padding: 0 32rpx;
// }
.custom-layer {
  background-color: #ffffff;
  padding: 40rpx 32rpx;
}
.u-field {
  padding: 40rpx 32rpx !important;
}
</style>
