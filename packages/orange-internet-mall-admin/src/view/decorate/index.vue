<!--
 * @Author: Mr.Mao
 * @Date: 2021-03-15 18:58:08
 * @LastEditTime: 2021-05-13 18:11:49
 * @Description: 店铺装修入口
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <template v-if="decorateInfo">
    <el-container class="decorate-container">
      <el-header class="oe-flex">
        <tab-bar
          v-model:type="currentComponentType"
          :decorateInfo="decorateInfo"
          v-model:currentViewIndex="currentViewIndex"
        />
      </el-header>
      <el-container>
        <component
          :is="Components[currentComponentType]"
          :decorateInfo="decorateInfo"
          :currentViewIndex="currentViewIndex"
        />
      </el-container>
    </el-container>
  </template>
</template>
<script lang="ts" setup>
  import TabBar from '@/view/decorate/layout/TabBar.vue'
  import Decoration from '@/view/decorate/Decoration.vue'
  import Advertisement from '@/view/decorate/Advertisement.vue'
  import Style from '@/view/decorate/Style.vue'
  import NaviAdmin from '@/view/decorate/NaviAdmin.vue'
  import Recommend from '@/view/decorate/Recommend.vue'
  import { ref } from '@vue/reactivity'
  import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router'
  import { ElMessageBox } from 'element-plus'
  import { onMounted, onUnmounted } from '@vue/runtime-core'
  import { reqDecorateInfo } from '@/api/shop'
  import {
    carouselSearchOption,
    defaultContentOption,
    imageCarouselOption
  } from '@/view/decorate/config'
  const route = useRoute()
  const router = useRouter()
  // 组件映射
  const Components = {
    Decoration,
    Advertisement,
    Style,
    NaviAdmin,
    Recommend
  }
  const currentComponentType = ref<keyof typeof Components>('Decoration')
  // 店铺装修信息
  const decorateInfo = ref<DecorateInfo<typeof defaultContentOption>>()
  // 当前视图区索引
  const currentViewIndex = ref(0)
  // 页面不存在则直接跳入404
  if (typeof route.query.id === 'undefined') router.replace('/404')
  // 初始化页面信息
  reqDecorateInfo(route.query.id as Key).then((res) => {
    decorateInfo.value = res.data.data
    if (!decorateInfo.value) return false

    if (!decorateInfo.value.content) {
      decorateInfo.value.content = defaultContentOption
    } else {
      /* 后续可以使用版本进行更新 为每个content添加个版本字段 进行更新判断 */
      /* 旧的广告页面更新 */
      if (decorateInfo.value.content.advertisement.id === undefined) {
        decorateInfo.value.content.advertisement = defaultContentOption.advertisement
      }

      decorateInfo.value.content.views.forEach((i, index) => {
        i.content.forEach((item, key) => {
          if (item.type === 'ImageCarousel' && !item?.option?.heightSetting) {
            item.option = imageCarouselOption
          }
          if (item.type === 'CarouselSearch' && !item?.option?.heightSetting) {
            item.option = carouselSearchOption
          }
        })
      })
    }
  })
  // 提示退出页面不会保存编辑项
  // onBeforeRouteLeave(async (to, from, next) => {
  //   await ElMessageBox.confirm('系统可能不会保存您所做的更改。', '确定离开此页面？', {
  //     confirmButtonText: '确定',
  //     cancelButtonText: '取消',
  //     type: 'warning'
  //   })
  //   next(to)
  // })
  // onMounted(() => {
  //   window.onbeforeunload = function (event: BeforeUnloadEvent) {
  //     const dialogText = 'Mr.Mao'
  //     event.returnValue = dialogText
  //     return dialogText
  //   }
  //   onUnmounted(() => (window.onbeforeunload = null))
  // })
</script>
<style lang="scss">
  @import '@/style/mixin.scss';
  .decorate-container {
    height: 100%;
    /* 全局容器 */
    .el-header,
    .page-menus {
      background-color: #180d00;
    }
    background-color: #180d00;
    .el-header {
      padding: 0 30px;
    }
    /** 编辑区 */
    .edit-component {
      label,
      div {
        font-size: 14px;
      }
      .el-card {
        border: none;
      }
      .el-radio-button {
        i {
          font-size: 20px;
        }
      }
      /* 表单项边距 */
      .el-form-item {
        @include not-last-child(margin-bottom, 15px);
        margin-bottom: 0;
      }
    }
    /** 添加按钮类名 */
    .inc-button {
      cursor: pointer;
      height: 38px;
      // background: #f5f5f5;
      margin: 14px auto 0 auto;
      border: 1px dashed #d9d9d9;
      line-height: 38px;
      text-align: center;
      color: var(--color-primary);
      user-select: none;
    }
    /* 备注文本 */
    .remarks-text {
      font-size: 12px !important;
      color: #8c8c8c !important;
      zoom: 0.95;
    }
  }
</style>
