<!--
 * @Author: Mr.Mao
 * @LastEditors: liupei
 * @Date: 2021-01-19 15:59:39
 * @LastEditTime: 2021-05-29 11:57:26
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="edit-look-house">
    <u-swiper
      :list="swpierList"
      :height="540"
      mode="number"
      indicator-pos="bottomRight"
    />
    <!-- 头部容器 -->
    <div class="header-container">
      <div class="title">{{ detail.name }}</div>
      <div class="price-collection u-flex u-row-between">
        <div class="price">¥ {{ detail.price }}元/月</div>
        <!-- <custom-icon name="like" :size="48" /> -->
      </div>
    </div>
    <custom-blank :height="20" />
    <div class="form-container">
      <u-field
        input-align="right"
        required
        disabled
        v-model="form.appoint_time"
        @click="timeSelectShow = true"
        label="看房时间"
        placeholder="请选择看房时间"
      >
        <u-icon slot="right" name="calendar" color="#808080" size="40" />
      </u-field>
      <u-field
        :maxlength="10"
        input-align="right"
        v-model="form.name"
        required
        label="姓名"
        placeholder="请输入姓名"
      />
      <u-field
        input-align="right"
        v-model="form.phone"
        required
        label="手机号码"
        placeholder="请输入手机号码"
      />
      <u-field
        input-align="right"
        disabled
        @click="genderSelectShow = true"
        :value="
          (form.gender === '0' && '女') || (form.gender === '1' && '男') || ''
        "
        label="性别"
        placeholder="请选择性别"
      >
        <u-icon slot="right" name="arrow-right" color="#adadad" />
      </u-field>
      <u-field
        input-align="right"
        v-model="form.remark"
        label="备注"
        placeholder="请输入备注"
      />
    </div>
    <common-fixed-footer :flex="false">
      <u-button type="primary" shape="circle" @click="onSubmit">确定</u-button>
    </common-fixed-footer>
    <u-select
      v-model="genderSelectShow"
      :list="genderList"
      @confirm="onGenderSelect"
    />
    <u-picker
      v-model="timeSelectShow"
      mode="time"
      @confirm="onHandleTimeSelect"
      :params="{
        year: true,
        month: true,
        day: true,
        hour: true,
        minute: true,
        timestamp: true,
      }"
    ></u-picker>
  </div>
</template>

<script lang="ts">
import { reqAppointCreate, reqHouseDetail } from '@/api';
import { plotForm } from '@/plugins/form-strategy';
import store from '@/store';
import { showToast } from '@/utils';
import Vue from 'vue';
export default Vue.extend({
  components: {},
  data: () => ({
    // 轮播图列表
    swpierList: [],
    // 详情信息
    detail: {} as any,
    timeSelectShow: false,
    form: {
      gender: '' as Key,
      house_id: '',
      appoint_time: '',
      name: '',
      phone: '',
      remark: '',
    },
    // 性别选择框是否弹出
    genderSelectShow: false,
    // 性别队列
    genderList: [
      { value: '0', label: '女' },
      { value: '1', label: '男' },
    ],
  }),
  computed: {},
  methods: {
    // 初始化详情数据
    async initDetail(id: Key) {
      const { data: detail } = await reqHouseDetail(id);
      this.swpierList = detail.images_text.map((item: string) => ({
        image: item,
      }));
      detail.lng = Number(detail.lng);
      detail.lat = Number(detail.lat);
      this.detail = detail;
      this.form.house_id = detail.id;
      this.form.name = store.state.user.authentication?.name ?? '';
      this.form.phone = store.state.user.info?.mobile ?? '';
    },
    // 处理时间选择
    onHandleTimeSelect(dates: any) {
      const timestampStr = `${dates.year}-${dates.month}-${dates.day} ${dates.hour}:${dates.minute}`;
      this.form.appoint_time = timestampStr;
    },
    // 处理选择性别
    onGenderSelect(ev: [{ value: number; label: string }]) {
      const value = ev[0].value;
      this.form.gender = value;
    },
    // 进行提交
    async onSubmit() {
      const validate = plotForm.validateAll(
        ['empty', this.form.appoint_time, '看房时间'],
        ['empty', this.form.name, '姓名'],
        ['phone', this.form.phone]
      ).validate;
      if (!validate) return false;
      const { data: detail } = await reqAppointCreate(this.form);
      await showToast({ title: '预约成功' });
      // 申请预约埋点（友盟+）
      this.$uma.trackEvent('Um_Event_Item_Appoint', {
        Um_Key_UserName: this.form.name,
        Um_Key_UserGender: this.form.gender == 0 ? '女' : '难',
        Um_Key_UserPhone: this.form.phone,
        Um_Key_Remark: this.form.remark,
        Um_Key_AppointTime: this.form.appoint_time,
        Um_Key_ItemName: this.detail.name,
        Um_Key_ItemID: this.detail.id,
        Um_Key_ItemPrice: this.detail.price + '元/月',
        Um_Key_UserID: store.state.user.info?.user_id.toString(),
      });
      this.$redirectTo('/pages/appointments/lookHouseDetails', {
        id: detail.id,
      });
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  // 页面周期函数--监听页面加载
  onLoad(options: { id: string }) {
    this.initDetail(options.id);
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
@include full-page(edit-look-house);
.base-container {
  padding: 32rpx;
  margin-bottom: 20rpx;
  background-color: #ffffff;
  .title {
    margin-bottom: 28rpx;
    font-weight: bold;
  }
}
/* 头部容器 */
.header-container {
  padding: 40rpx;
  @extend .base-container;
  .title {
    @include text-ellipsis(650rpx);
    margin-bottom: 20rpx;
    font-size: 34rpx;
    font-weight: bold;
  }
  .price {
    font-size: 34rpx;
    font-weight: bold;
    color: #ff7e5f;
  }
}
.footer-container {
  position: fixed;
  z-index: 100;
  width: 100%;
  padding: 15rpx;
  background-color: #ffffff;
  bottom: 0;
}
</style>
