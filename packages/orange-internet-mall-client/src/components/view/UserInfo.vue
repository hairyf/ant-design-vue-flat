<!--
 * @Author: Mr.Mao
 * @Date: 2021-03-25 21:39:06
 * @LastEditTime: 2021-05-06 14:21:08
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <auth-controller>
    <div
      class="user-info-container"
      :style="{ padding, overflow: 'hidden', background }"
    >
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
            backgroundPosition: 'center',
          }"
        >
          <div
            class="user-info u-flex"
            :class="[option.componentStyle.styleType]"
          >
            <u-avatar
              @click="$navigateTo('/pages/commons/settings')"
              class="avatar left u-m-r-10"
              :src="userInfo.avatar_text"
            />
            <div class="right u-flex-1">
              <div
                class="nickname u-m-b-5"
                :style="{ color: option.colorStyle.color.name }"
                @click="$navigateTo('/pages/commons/settings')"
              >
                {{ userInfo.nickname || '点击卡片登录' }}
              </div>
              <div
                class="member-label"
                :style="{
                  color: option.colorStyle.color.gradeText,
                  backgroundColor: option.colorStyle.color.gradeBackground,
                }"
              >
                <view-icon
                  v-if="option.componentStyle.styleType === 'one'"
                  name="oe-vip"
                  class="oe-f-s-9"
                />
                <image
                  v-if="option.componentStyle.styleType === 'two'"
                  class="vip-image"
                  :src="baseUrl + images[0]"
                  alt=""
                />
                <image
                  v-if="option.componentStyle.styleType === 'three'"
                  class="vip-image"
                  :src="baseUrl + images[1]"
                  alt=""
                />
                <span class="u-m-l-5">{{
                  userInfo.current_shop_user_level_name || '暂无等级'
                }}</span>
              </div>
            </div>
            <div class="control">
              <view-icon class="control-icon" name="oe-qrcode" v-if="false" />
              <view-icon
                class="control-icon"
                name="oe-setting"
                @click="$navigateTo('/pages/commons/settings')"
                v-if="option.contentEdit.contents.some((v) => v === '设置')"
              />
              <view-icon
                class="control-icon"
                name="oe-message"
                v-if="option.contentEdit.contents.some((v) => v === '消息')"
              />
            </div>
          </div>
          <finance
            v-if="option.componentStyle.styleType !== 'one'"
            :option="option"
          />
        </div>
      </div>
      <finance
        v-if="option.componentStyle.styleType === 'one'"
        :option="option"
      />
      <div v-if="option.componentStyle.styleType === 'three'" class="arc" />
    </div>
  </auth-controller>
</template>
<script lang="ts">
import { userInfoOption } from 'orange-components-config/options';
import { useBackgroundColor, usePaddingRadius } from '@/hooks/use-view-style';
import Finance from './UserInfo/Finance.vue';
import { computed, defineComponent } from '@vue/composition-api';
import store from '@/store';
export default defineComponent({
  components: { Finance },
  props: {
    option: {
      type: Object as () => typeof userInfoOption,
      required: true,
    },
  },
  setup: (props) => {
    const { padding, borderRadius } = usePaddingRadius(props.option);
    const { background } = useBackgroundColor(props.option.colorStyle);
    // 网络图片固定地址
    const baseUrl =
      'https://client-static-1254212114.cos.ap-guangzhou.myqcloud.com/images/';
    // 网络图片索引地址
    const images = ['member-label-1.png', 'member-label-2.png'];
    const tests = ['head-portrait.png'];
    const userInfo = computed(() => store.state.user.info);
    return {
      padding,
      borderRadius,
      background,
      baseUrl,
      images,
      tests,
      userInfo,
    };
  },
});
</script>
<style lang="scss">
@import '@/style/mixin.scss';
.user-container {
  overflow: hidden;
}
.user-info-container {
  position: relative;
}
.user-info {
  position: relative;
  padding: toRpx(20);
  .right {
    .nickname {
      @include text-ellipsis(toRpx(150));
      font-weight: bold;
      font-size: toRpx(16);
      line-height: toRpx(22);
    }
    .member-label {
      display: inline-block;
      vertical-align: middle;
      padding: toRpx(2) toRpx(8);
      font-size: toRpx(12);
      line-height: toRpx(17);
      border-radius: toRpx(25);
    }
    .vip-image {
      vertical-align: middle;
      margin-top: toRpx(-2);
      margin-left: toRpx(-4);
      width: toRpx(13);
      height: toRpx(13);
    }
  }
  &.one {
    padding-bottom: toRpx(40);
  }
}
.content-container {
  position: relative;
  &.three {
    padding-bottom: toRpx(20);
  }
}
.arc {
  background: rgb(247, 248, 250);
  position: absolute;
  bottom: toRpx(-150);
  left: 50%;
  transform: translateX(-50%);
  width: toRpx(600);
  height: toRpx(170);
  border-radius: 50%;
}
.control {
  position: absolute;
  color: #fff;
  top: toRpx(15);
  right: toRpx(15);
  .control-icon {
    font-size: toRpx(24);
    text {
      font-size: toRpx(24);
    }
  }
}
.avatar {
  view {
    background-color: #ffffff !important;
    padding: toRpx(4) !important;
  }
}
</style>
