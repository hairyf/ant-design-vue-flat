<!--
 * @Author: Mr.Mao
 * @Date: 2021-03-23 20:23:51
 * @LastEditTime: 2021-05-12 15:07:49
 * @Description: 广告设置
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <decorate-main>
    <template #content>
      <mobile-emulator class="view-container">
        <div
          class="view-content"
          :class="form.style === 'board' ? 'size-max' : 'size-square'"
          :style="{ backgroundImage: `url(${form.images[0].image})` }"
        >
          <div class="view-relative">
            <div class="view-time-down" v-if="form.close">关闭</div>
            <div class="view-time-down" v-else> {{ form.timingClose }}秒后关闭 </div>
          </div>
        </div>
      </mobile-emulator>
    </template>
    <!-- 编辑区 -->
    <template #edit>
      <edit-card-form title="广告展示选择" :show-margin-top="false">
        <el-form-item label="广告状态">
          <el-switch v-model="form.status" />
        </el-form-item>
        <el-form-item label="风格类型">
          <el-radio-group v-model="form.style" size="mini">
            <el-radio-button label="board">
              <el-image class="radio-image" src="/custom-assets/images/icon/board.png" />
            </el-radio-button>
            <el-radio-button label="board-nesting">
              <el-image class="radio-image" src="/custom-assets/images/icon/board-nesting.png" />
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
      </edit-card-form>
      <edit-card-form title="内容编辑">
        <el-form-item label="显示形式">
          <el-radio-group v-model="form.showForm">
            <el-radio :label="v" v-for="v in ['仅首次', '每次', '时间间隔']" :key="v" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="时间间隔" v-if="form.showForm === '时间间隔'">
          <slider-input v-model="form.interval" :max="240" tips="分钟" />
        </el-form-item>
        <el-form-item label="显示关闭">
          <el-switch v-model="form.close" />
        </el-form-item>
        <el-form-item label="定时关闭" v-if="!form.close">
          <el-radio-group v-model="form.timingClose">
            <el-radio :label="v" v-for="v in [3, 4, 5]" :key="v"> {{ v }}秒 </el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="el-form-item">广告图片选择</div>
        <template v-for="(item, index) in form.images" :key="index">
          <edit-card-item
            v-show="index === 0 || form.style !== 'board-nesting'"
            :show-close="form.images.length !== 1 && form.style !== 'board-nesting'"
            @close="form.images.splice(index, 1)"
          >
            <el-form-item label="广告图">
              <image-item :size="50" bg-color="#ffffff" v-model="item.image" />
            </el-form-item>
            <el-form-item label="跳转">
              <link-item v-model="item.link" />
            </el-form-item>
          </edit-card-item>
        </template>
        <template v-if="form.style === 'board'">
          <div class="tips oe-m-t-15 oe-m-b-30">
            添加多个将以轮播图形式展现；广告图片建议尺寸宽1125x高2436Px
          </div>
          <div class="inc-button" @click="incImageItem">+ 添加</div>
        </template>
      </edit-card-form>
    </template>
  </decorate-main>
</template>
<script lang="ts" setup>
  import DecorateMain from '@/view/decorate/layout/DecorateMain.vue'
  import EditCardForm from '@/view/decorate/components/EditCardForm.vue'
  import EditCardItem from '@/view/decorate/components/EditCardItem.vue'
  import ImageItem from '@/view/decorate/components/common/ImageItem.vue'
  import LinkItem from '@/view/decorate/components/common/LinkItem.vue'
  import SliderInput from '@/view/decorate/components/items/SliderInput.vue'
  import { defaultContentOption, linkOption } from './config'
  import { clone } from 'lodash'
  import { computed, defineProps, watch } from '@vue/runtime-core'
  import { nanoid } from 'nanoid'
  const props = defineProps({
    decorateInfo: {
      type: Object as () => DecorateInfo<typeof defaultContentOption>,
      required: true
    },
    currentViewIndex: {
      type: Number,
      required: true
    }
  })
  const form = computed(() => props.decorateInfo.content.advertisement)
  const incImageItem = () => {
    if (form.value.images.length >= 50) return false
    form.value.images.push({ image: '', link: clone(linkOption) })
  }
  const watchList = [
    () => form.value.status,
    () => form.value.style,
    () => form.value.showForm,
    () => form.value.interval,
    () => form.value.timingClose,
    () => form.value.close,
    () => form.value.images
  ]
  watch(watchList, () => {
    form.value.id = nanoid(8)
  })
</script>
<style lang="scss" scoped>
  .view-content {
    position: absolute;
    background-size: auto 100%;
    background-position: center center;
    .view-relative {
      width: 100%;
      height: 100%;
      position: relative;
      .view-time-down {
        position: absolute;
        right: 12px;
        top: 16px;
        font-size: 12px;
        padding: 3px 12px;
        line-height: 18px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 14px;
        cursor: pointer;
        color: #fff;
      }
    }
  }
  .size-max {
    width: 100%;
    height: 100%;
  }
  .size-square {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 80%;
    height: 66%;
    border-radius: 10px;
  }
  .view-container {
    margin-top: 82px;
    margin-bottom: 82px;
    position: relative;
  }
  .radio-image {
    padding: 0 20px;
    width: 24px;
    height: 24px;
  }
  .tips {
    font-size: 12px;
    color: #8c8c8c;
  }
</style>
