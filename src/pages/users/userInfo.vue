<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2021-02-22 18:54:44
 * @LastEditTime: 2021-05-17 15:29:50
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-02-22 18:54:44
 * @LastEditTime: 2021-02-23 09:30:19
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <view-controller>
    <div>
      <u-cell-group>
        <u-cell-item title="头像" @click="onGetUploadImage">
          <u-image slot="right-icon" :src="imagePath" width="56" height="56" />
        </u-cell-item>
        <u-cell-item :arrow="false" hover-class="none" title="名称">
          <u-input
            maxlength="10"
            input-align="right"
            placeholder="请填写名称"
            v-model="form.nickname"
          />
        </u-cell-item>
        <!-- 性别 -->
        <u-cell-item title="性别" @click="genderSelectShow = true">
          <u-input
            input-align="right"
            disabled
            :value="genderList[form.gender].label || ''"
            placeholder="请选择性别"
            @click="genderSelectShow = true"
          >
            <u-icon slot="right" name="arrow-right" color="#adadad" />
          </u-input>
        </u-cell-item>
        <u-cell-item title="生日">
          <u-input
            disabled
            input-align="right"
            placeholder="请选择生日"
            @click="birthdayDateSelectShow = true"
            :value="form.birthday"
          />
        </u-cell-item>
      </u-cell-group>
      <!-- 性别选择框 -->
      <u-select
        v-model="genderSelectShow"
        :list="genderList"
        @confirm="onGenderSelect"
      />
      <!-- 生日选择框 -->
      <u-picker
        v-model="birthdayDateSelectShow"
        mode="time"
        @confirm="onHandleTimeSelect"
        :params="{
          year: true,
          month: true,
          day: true,
        }"
      />
      <custom-fixed-footer position="none">
        <u-button
          shape="circle"
          type="primary"
          @click="onSubmitUserInfo"
          ripple
          :custom-style="{
            background: $hexColor['--color-primary'],
          }"
        >
          <span>保存</span>
        </u-button>
        <union-blank height="15" />
        <u-button
          shape="circle"
          type="primary"
          @click="loginOut"
          v-if="PLATFORM !== 'mp-weixin'"
          ripple
          :custom-style="{
            background: $hexColor['--color-primary'],
          }"
        >
          <span>退出登录</span>
        </u-button>
      </custom-fixed-footer>
    </div>
  </view-controller>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '@/store';
import { reqUpload } from '@/api';
import { PLATFORM, showToast } from '@/utils';
import { computed } from '@vue/composition-api';

export default Vue.extend({
  components: {},
  data: () => ({
    PLATFORM,
    // 准备上传图片路径
    imagePath: '',

    // 表单信息
    form: {
      nickname: '',
      avatar: '',
      gender: 3,
      birthday: '' as Key,
    },
    // 生日日期选择器是否弹出
    birthdayDateSelectShow: false,
    // 退出确认框是否弹出
    outEditWindowShow: false,
    // 性别选择框是否弹出
    genderSelectShow: false,
    // 性别队列
    genderList: [
      { value: '0', label: '女' },
      { value: '1', label: '男' },
    ],
  }),
  computed: {
    // 当前是否修改
    isSetInfo(): boolean {
      return !(
        this.userInfo.nickname === this.form.nickname &&
        this.imagePath === this.form.avatar &&
        this.userInfo.gender === this.form.gender &&
        this.userInfo.birthday === this.form.birthday
      );
    },
    userInfo: () => store.state.user.info,
  },
  setup: () => {
    const $hexColor = computed(
      (): CssLightVariableType => store.getters.hexColor
    );
    return { $hexColor };
  },
  methods: {
    // 处理选择性别
    onGenderSelect(ev: [{ value: number; label: string }]) {
      const value = ev[0].value;
      this.form.gender = value;
      console.log(this.form);
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
        this.form.avatar = data.data.path.show;
      }
      await store.dispatch('editUserInfo', [
        this.form.nickname,
        this.form.avatar === this.imagePath ? '' : this.form.avatar,
        this.form.gender,
        this.form.birthday,
      ]);
      await showToast({
        icon: 'none',
        title: '修改成功',
      });
      this.$navigateBack(1);
    },
    // 退出登录
    async loginOut() {
      await store.dispatch('outLogin');
      this.$navigateBack(2);
    },
  },
  watch: {
    // 当用户数据发生改变, 覆盖当前修改数据
    userInfo: {
      immediate: true,
      handler(userInfo: UserInfo) {
        if (typeof userInfo.id === 'undefined') {
          return false;
        }
        this.form.nickname = userInfo.nickname;
        this.form.avatar = userInfo.avatar;
        this.form.birthday = this.userInfo.birthday;
        this.form.gender = this.userInfo.gender;
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

<style lang="scss"></style>
