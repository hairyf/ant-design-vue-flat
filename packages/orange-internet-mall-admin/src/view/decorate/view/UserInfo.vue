<!--
 * @Author: Mr.Mao
 * @Date: 2021-03-25 21:39:06
 * @LastEditTime: 2021-05-06 14:20:29
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div :style="{ padding, overflow: 'hidden', background }">
    <div class="user-container">
      <div
        class="content-container"
        :class="[option.componentStyle.styleType]"
        :style="{
          borderRadius,
          backgroundColor: option.contentEdit.cardBackground,
          backgroundImage:
            option.contentEdit.cardBackgroundType !== '背景颜色'
              ? `url(${option.contentEdit.cardBackground})`
              : '',
          backgroundSize: '100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }"
      >
        <div class="user-info oe-flex" :class="[option.componentStyle.styleType]">
          <img class="avatar left oe-m-r-10" :src="baseUrl + tests[0]" alt="" />
          <div class="right oe-flex-1">
            <div class="nickname oe-m-b-5" :style="{ color: option.colorStyle.color.name }">
              不平凡的小明
            </div>
            <div
              class="member-label"
              :style="{
                color: option.colorStyle.color.gradeText,
                backgroundColor: option.colorStyle.color.gradeBackground
              }"
            >
              <i v-if="option.componentStyle.styleType === 'one'" class="oe-f-s-9 oe-vip" />
              <img
                v-if="option.componentStyle.styleType === 'two'"
                class="vip-image"
                :src="baseUrl + images[0]"
                alt=""
              />
              <img
                v-if="option.componentStyle.styleType === 'three'"
                class="vip-image"
                :src="baseUrl + images[1]"
                alt=""
              />
              <span class="oe-m-l-5">普通会员</span>
            </div>
          </div>
          <div class="control">
            <i v-if="false" class="oe-qrcode" />
            <i v-if="option.contentEdit.contents.some((v) => v === '设置')" class="oe-setting" />
            <i v-if="option.contentEdit.contents.some((v) => v === '消息')" class="oe-message" />
          </div>
        </div>
        <finance v-if="option.componentStyle.styleType !== 'one'" :option="option" />
      </div>
    </div>
    <finance v-if="option.componentStyle.styleType === 'one'" :option="option" />
    <div v-if="option.componentStyle.styleType === 'three'" class="arc" />
  </div>
</template>
<script lang="ts" setup>
  import { defineProps } from '@vue/runtime-core'
  import { userInfoOption } from '@/view/decorate/config'
  import { useBackgroundColor, usePaddingRadius } from '../hooks/use-view-style'
  const props = defineProps({
    option: {
      type: Object as () => typeof userInfoOption,
      required: true
    }
  })
  import Finance from './UserInfo/Finance.vue'
  const { padding, borderRadius } = usePaddingRadius(props.option)
  const { background } = useBackgroundColor(props.option.colorStyle)
  // 网络图片固定地址
  const baseUrl = 'https://client-static-1254212114.cos.ap-guangzhou.myqcloud.com/images/'
  // 网络图片索引地址
  const images = ['member-label-1.png', 'member-label-2.png']
  const tests = ['head-portrait.png']
</script>
<style lang="scss" scoped>
  @import '@/style/mixin.scss';
  .user-container {
    overflow: hidden;
  }
  .user-info {
    position: relative;
    padding: 20px;
    .right {
      .nickname {
        @include text-ellipsis(150px);
        font-weight: bold;
        font-size: 16px;
        line-height: 22px;
      }
      .member-label {
        display: inline-block;
        vertical-align: middle;
        padding: 2px 8px;
        font-size: 12px;
        line-height: 17px;
        border-radius: 25px;
      }
      .vip-image {
        vertical-align: middle;
        margin-top: -2px;
        margin-left: -4px;
        width: 13px;
        height: 13px;
      }
    }
    &.one {
      padding-bottom: 40px;
    }
  }
  .content-container {
    position: relative;
    &.three {
      padding-bottom: 20px;
    }
  }
  .arc {
    background: rgb(247, 248, 250);
    position: absolute;
    bottom: -150px;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 170px;
    border-radius: 50%;
  }
  .control {
    position: absolute;
    font-size: 24px;
    color: #fff;
    top: 15px;
    right: 15px;
  }
  .avatar {
    width: 48px;
    height: 48px;
    padding: 1px;
    background-color: #ffffff;
    border-radius: 50%;
  }
</style>
