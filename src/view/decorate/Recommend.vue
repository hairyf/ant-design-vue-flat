<!--
 * @Author: Mr.Mao
 * @Date: 2021-03-23 20:23:51
 * @LastEditTime: 2021-05-11 17:20:31
 * @Description: 商品推荐
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <decorate-main>
    <template #content>
      <mobile-emulator class="view-container">
        <div class="title-container oe-flex oe-row-center">
          <span class="left-view-line" />
          <span class="content oe-m-l-15 oe-m-r-15">
            {{ decorateInfo.content.recommend.contentEdit.text }}
          </span>
          <span class="right-view-line" />
        </div>
        <commodity-group-view :option="decorateInfo.content.recommend" />
      </mobile-emulator>
    </template>
    <!-- 编辑区 -->
    <template #edit>
      <edit-card-form title="内容编辑" :show-margin-top="false">
        <el-form-item label="文字">
          <el-input
            style="width: 202px"
            v-model="decorateInfo.content.recommend.contentEdit.text"
            maxlength="8"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="可用页面">
          <el-checkbox-group v-model="decorateInfo.content.recommend.contentEdit.pages">
            <el-checkbox
              :label="v"
              v-for="v in ['购物车', '支付成功', '商品详情', '会员中心']"
              :key="v"
            />
          </el-checkbox-group>
        </el-form-item>
      </edit-card-form>
      <commodity-group-edit v-model:option="decorateInfo.content.recommend" :show-header="false" />
    </template>
  </decorate-main>
</template>
<script lang="ts" setup>
  import DecorateMain from '@/view/decorate/layout/DecorateMain.vue'
  import EditCardForm from '@/view/decorate/components/EditCardForm.vue'
  import CommodityGroupEdit from '@/view/decorate/edit/CommodityGroup.vue'
  import CommodityGroupView from '@/view/decorate/view/CommodityGroup.vue'
  import { defaultContentOption } from './config'
  import { defineProps } from '@vue/runtime-core'
  defineProps({
    decorateInfo: {
      type: Object as () => DecorateInfo<typeof defaultContentOption>,
      required: true
    }
  })
</script>
<style lang="scss" scoped>
  .view-container {
    margin-top: 82px;
    margin-bottom: 82px;
  }
  :deep(.el-checkbox) {
    margin-right: 8px;
  }
  .title-container {
    text-align: center;
    padding: 15px 0;
    font-size: 15px;
    .left-view-line {
      height: 1px;
      width: 32px;
      background-image: linear-gradient(-90deg, red 0%, rgba(255, 61, 0, 0) 100%);
    }
    .right-view-line {
      height: 1px;
      width: 32px;
      background-image: linear-gradient(90deg, red 0%, rgba(255, 61, 0, 0) 100%);
    }
  }
</style>
