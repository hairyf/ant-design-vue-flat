<!--
 * @Author: Zhilong
 * @Date: 2021-04-01 18:58:56
 * @LastEditTime: 2021-04-26 18:50:58
 * @Description: 公告页面~
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div class="notice-container">
    <edit-header title="公告" icon="ad-notice" />
    <!-- 组件风格 -->
    <edit-card-form title="组件风格">
      <el-form-item label="公告图标">
        <el-radio-group v-model="option.componentStyle.noticeIconType">
          <el-radio v-for="v in ['系统', '自定义']" :key="v" :label="v" />
        </el-radio-group>
      </el-form-item>
      <!-- 系统 > 风格类型 -->
      <el-form-item label="风格类型" v-if="option.componentStyle.noticeIconType === '系统'">
        <el-radio-group v-model="option.componentStyle.systemStyle" size="small">
          <el-radio-button label="notice-style-icon1.png">
            <el-image
              src="/custom-assets/images/decorate/btn-image-circular.png"
              class="btn-image"
            />
          </el-radio-button>
          <el-radio-button label="notice-style-icon2.png">
            <el-image
              src="/custom-assets/images/decorate/btn-image-notice.png"
              class="btn-image"
            />
          </el-radio-button>
          <el-radio-button label="notice-style-icon3.png">
            <i class="ad-yinlianglabashengyin" />
          </el-radio-button>
          <el-radio-button label="notice-style-icon4.png">
            <i class="ad-Shape" />
          </el-radio-button>
          <el-radio-button label="notice-style-icon5.png">
            <i class="ad-maikefeng"
          /></el-radio-button>
          <el-radio-button label="notice-style-icon6.png">
            <i class="ad-horn" />
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
      <!-- 系统 > 自定义 -->
      <el-form-item label="图片" v-if="option.componentStyle.noticeIconType === '自定义'">
        <image-item v-model="option.componentStyle.noticeImage" />
      </el-form-item>
    </edit-card-form>
    <!-- 公告内容 -->
    <edit-card-form title="公告内容">
      <el-form-item label="内容">
        <el-radio-group v-model="option.noticeContent.content">
          <el-radio v-for="v in ['读取商城公告', '自定义']" :key="v" :label="v" />
        </el-radio-group>
      </el-form-item>
      <!-- 内容 > 读取商品公告 -->
      <el-form-item label="读取数量" v-if="option.noticeContent.content === '读取商城公告'">
        <el-radio-group v-model="option.noticeContent.count">
          <el-radio v-for="v in [5, 10, 15]" :key="v" :label="v">{{ v }}条</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 内容 > 自定义 -->
      <div v-if="option.noticeContent.content === '自定义'">
        <edit-card-item
          v-for="(item, index) in option.noticeContent.custom"
          :key="item.CACHE_KEY_LIST"
          @close="delItem(index)"
          :show-close="option.noticeContent.custom.length > 1"
        >
          <el-form-item label="公告内容">
            <el-input v-model="item.title" placeholder="请输入公告内容" />
          </el-form-item>
          <link-item v-model="item.link" reset />
        </edit-card-item>
        <div class="inc-button" @click="addItem(defaultItem)">+添加公告内容</div>
      </div>
    </edit-card-form>
    <edit-card-form title="组件样式">
      <el-form-item label="组件背景">
        <el-radio-group v-model="option.colorStyle.backgroundType">
          <el-radio v-for="v in ['透明', '颜色', '背景图片']" :key="v" :label="v" />
        </el-radio-group>
      </el-form-item>
      <!-- > 背景图片 -->
      <el-form-item label="背景图片" v-if="option.colorStyle.backgroundType === '背景图片'">
        <image-item v-model="option.colorStyle.image" />
      </el-form-item>
      <!-- > 颜色 -->
      <color-group v-model="option.colorStyle.color" reset>
        <color-input
          keyword="background"
          label="背景颜色"
          v-if="option.colorStyle.backgroundType === '颜色'"
        />
        <color-input keyword="subBackground" label="公告颜色" />
        <color-input keyword="text" label="文本颜色" />
      </color-group>
      <!-- 滚动速度 -->
      <el-form-item label="滚动速度">
        <slider-input v-model="option.colorStyle.speed" tips="秒/次" :min="1" :max="50" />
      </el-form-item>
    </edit-card-form>
    <edit-card-form title="边距设置">
      <slider-group v-model="option.padding">
        <slider-input keyword="top" label="上边距" :max="50" tips="px" />
        <slider-input keyword="bottom" label="下边距" :max="20" tips="px" />
        <slider-input keyword="leftRight" label="左右边距" :max="20" tips="px" />
        <slider-input keyword="topRadius" label="上圆角" :max="20" tips="px" />
        <slider-input keyword="bottomRadius" label="下圆角" :max="20" tips="px" />
      </slider-group>
    </edit-card-form>
  </div>
</template>
<script lang="ts" setup>
  import { defineProps } from '@vue/runtime-core'
  import { noticeOption } from '@/view/decorate/config/options'
  import EditHeader from '@/view/decorate/components/EditHeader.vue'
  import EditCardForm from '@/view/decorate/components/EditCardForm.vue'
  import ImageItem from '@/view/decorate/components/common/ImageItem.vue'
  import EditCardItem from '@/view/decorate/components/EditCardItem.vue'
  import LinkItem from '@/view/decorate/components/common/LinkItem.vue'
  import ColorGroup from '@/view/decorate/components/items/ColorGroup.vue'
  import ColorInput from '@/view/decorate/components/items/ColorInput.vue'
  import SliderInput from '@/view/decorate/components/items/SliderInput.vue'
  import SliderGroup from '@/view/decorate/components/items/SliderGroup.vue'
  import { cloneDeep } from 'lodash'
  const props = defineProps({
    option: {
      type: Object as () => typeof noticeOption,
      required: true
    }
  })
  // 最大数量
  const maxLength = 30
  // 取默认tabList 里面的一项数据 用作添加的填充
  const defaultItem = cloneDeep(props.option.noticeContent.custom[0])
  // 添加一项
  const addItem = (item: typeof defaultItem) => {
    const { length } = props.option.noticeContent.custom
    if (length >= maxLength) return
    props.option.noticeContent.custom.push(cloneDeep(item))
  }
  // 删除一项
  const delItem = (index: number) => {
    const { length } = props.option.noticeContent.custom
    if (length <= 1) return
    props.option.noticeContent.custom.splice(index, 1)
  }
</script>
<style lang="scss" scoped>
  .notice-container {
    .btn-image {
      width: 38px;
      height: 19px;
    }
  }
</style>
