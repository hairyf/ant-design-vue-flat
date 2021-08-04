<template>
  <div @click="isShowDrawer = true" class="popup">
    <i class="ad-arrow-open-right popup-icon"></i>
  </div>
  <el-drawer size="280px" title="主题配置" v-model="isShowDrawer" destroy-on-close>
    <div class="drawer-main">
      <div class="main-line">
        <div class="main-title">
          <i class="el-icon-setting"></i>
          <span class="oe-m-l-6">常用设置</span>
        </div>
      </div>
      <div class="side-list">
        <div class="side-item oe-flex">
          <div class="oe-flex-1">
            <span class="oe-m-r-4">主题</span>
          </div>
          <div class="oe-flex-1">
            <el-select v-model="themeColor" size="small">
              <el-option
                v-for="item in themeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <color-pickr width="100%" height="28px" v-model="themeColor" />
      </div>
      <div class="main-line">
        <div class="main-title">
          <i class="el-icon-setting"></i>
          <span class="oe-m-l-6">其他设置</span>
        </div>
      </div>
      <div class="other-list">
        <div class="other-item oe-flex">
          <div class="left-column">
            <span class="oe-m-r-4">头部固定</span>
          </div>
          <div class="right-column">
            <el-switch
              v-model="isFixedHead"
              :active-value="true"
              :inactive-value="false"
              active-color="#1890ff"
            >
            </el-switch>
          </div>
        </div>
        <div class="other-item oe-flex">
          <div class="left-column">
            <span class="oe-m-r-4">进度条</span>
          </div>
          <div class="right-column">
            <el-switch v-model="progressBar" active-color="#1890ff"> </el-switch>
          </div>
        </div>
        <div class="other-item oe-flex">
          <div class="left-column">
            <span class="oe-m-r-4">全屏</span>
          </div>
          <div class="right-column">
            <el-switch
              v-model="isFullscreen"
              :active-value="true"
              :inactive-value="false"
              active-color="#1890ff"
              @change="onIsFullscreenChange"
            >
            </el-switch>
          </div>
        </div>
      </div>
    </div>
  </el-drawer>
</template>
<script lang="ts" setup>
  import screenfull from 'screenfull'
  import { computed, reactive, ref } from 'vue'
  import { useStore } from 'vuex'
  import {
    RECEVE_THEME_COLOR,
    RECEVE_THEME_IS_FIXED_HEAD,
    RECEVE_THEME_IS_PROGRESS_BAR
  } from '@/store/types'
  // 存储vuex
  const store = useStore()
  // 是否展开抽屉
  const isShowDrawer = ref(false)

  // 当前主题色配置
  const themeOptions = reactive([
    { value: '#FF9D28', label: '默认' },
    { value: '#0470ff', label: '海洋之心' },
    { value: '#009688', label: '绿荫草场' }
  ])

  // 当前主题颜色(绑定vuex值)
  const themeColor = computed({
    get: () => store.state.theme.themeColor,
    set: (value) => store.commit(RECEVE_THEME_COLOR, value)
  })

  // 进度条控制
  const progressBar = computed({
    get: () => store.state.theme.isProgressBar,
    set: (value) => store.commit(RECEVE_THEME_IS_PROGRESS_BAR, value)
  })

  // 是否固定头部(绑定vuex值)
  const isFixedHead = computed({
    get: () => store.state.theme.isFixedHead,
    set: (value) => store.commit(RECEVE_THEME_IS_FIXED_HEAD, value)
  })

  // 是否进行全屏
  const isFullscreen = ref(true)
  // 全屏值改变时
  const onIsFullscreenChange = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle()
    }
  }
</script>
<style lang="scss" scoped>
  .popup {
    position: absolute;
    top: 106px;
    right: 0;
    width: 30px;
    height: 30px;
    background: #ffffff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    border-radius: 15px 0px 0px 15px;
    text-align: center;
    line-height: 30px;
    color: var(--color-primary);
  }
  .drawer-main {
    padding: 0 20px 20px;
    color: #72767b;
    font-size: 14px;
    > .main-line {
      position: relative;
      width: 100%;
      height: 1px;
      margin: 28px 0;
      background-color: #dcdfe6;
      > .main-title {
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        padding: 0 20px;
        background-color: #ffffff;
        z-index: 6;
      }
    }
    > .side-list {
      > .side-item {
        margin-bottom: 18px;
      }
    }
    > .other-list {
      > .other-item {
        margin-bottom: 18px;
        > div {
          &:nth-child(1) {
            width: 200px;
          }
          &:nth-child(2) {
            width: 40px;
          }
        }
      }
    }
  }
</style>
