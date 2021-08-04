<!--
 * @Author: Zhilong
 * @Date: 2021-04-26 10:01:03
 * @LastEditTime: 2021-04-26 11:09:32
 * @Description: 开发用操作区
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <edit-header icon="ad-shopping-guide" title="导购" />
  <edit-card-form title="组件风格" @click="copyItem(text1)">
    <el-form-item label="商品样式">
      <el-radio-group v-model="option.componentStyle.componentModal">
        <el-radio v-for="v in ['默认', '投影', '描边']" :key="v" :label="v" />
      </el-radio-group>
    </el-form-item>
  </edit-card-form>
  <edit-card-form title="开关单选" @click="copyItem(text4)">
    <el-form-item label="组件边框">
      <el-radio-group v-model="option.componentStyle.borderStatus">
        <el-radio v-for="v in ['显示', '隐藏']" :key="v" :label="v === '显示'">
          {{ v }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
  </edit-card-form>
  <edit-card-form title="内容编辑" @click="copyItem(text2)">
    <color-group v-model="option.contentEdit.color">
      <el-form-item label="图片">
        <image-item v-model="option.contentEdit.image" />
      </el-form-item>
      <el-form-item label="标题文字">
        <el-input
          maxlength="10"
          show-word-limit
          v-model="option.contentEdit.title"
          placeholder="请输入标题文字"
        />
      </el-form-item>
      <color-input keyword="background" label="背景颜色" />
      <el-form-item label="副标题文字" class="long-slider-input">
        <el-input
          maxlength="40"
          show-word-limit
          v-model="option.contentEdit.subTitle"
          placeholder="请输入副标题文字"
        />
      </el-form-item>
      <color-input keyword="subBackground" label="背景颜色" />
      <el-form-item label="联系方式名称" class="long-slider-input-6">
        <el-input
          maxlength="5"
          show-word-limit
          v-model="option.contentEdit.contactName"
          placeholder="请输入名称"
        />
      </el-form-item>
      <el-form-item label="联系方式内容" class="long-slider-input-6">
        <el-input
          maxlength="20"
          show-word-limit
          v-model="option.contentEdit.contactContent"
          placeholder="请输入内容"
        />
      </el-form-item>
      <el-form-item label="按钮文字">
        <el-input
          maxlength="5"
          show-word-limit
          v-model="option.contentEdit.btnText"
          placeholder="请输入内容"
        />
      </el-form-item>
      <color-input keyword="text" label="文字颜色" />
      <color-input keyword="btn" label="按钮颜色" />
    </color-group>
  </edit-card-form>
  <edit-card-form title="组件样式" @click="copyItem(text5)">
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
      <color-input keyword="subBackground" label="标题背景" />
      <el-form-item label="内部背景">
        <color-input v-model="option.colorStyle.color.insideBackground" />
      </el-form-item>
    </color-group>
  </edit-card-form>
  <edit-card-form title="边距设置" @click="copyItem(text3)">
    <slider-group v-model="option.padding">
      <slider-input keyword="top" label="上边距" :max="50" tips="px" />
      <slider-input keyword="bottom" label="下边距" :max="20" tips="px" />
      <slider-input keyword="leftRight" label="左右边距" :max="20" tips="px" />
      <slider-input keyword="topRadius" label="上圆角" :max="20" tips="px" />
      <slider-input keyword="bottomRadius" label="下圆角" :max="20" tips="px" />
    </slider-group>
  </edit-card-form>
</template>
<script lang="ts" setup>
  import { defineProps } from '@vue/runtime-core'
  import { copyCodeOption } from '@/view/decorate/config/options'
  import EditHeader from '@/view/decorate/components/EditHeader.vue'
  import EditCardForm from '@/view/decorate/components/EditCardForm.vue'
  import ImageItem from '@/view/decorate/components/common/ImageItem.vue'
  import ColorGroup from '@/view/decorate/components/items/ColorGroup.vue'
  import ColorInput from '@/view/decorate/components/items/ColorInput.vue'
  import SliderGroup from '@/view/decorate/components/items/SliderGroup.vue'
  import SliderInput from '@/view/decorate/components/items/SliderInput.vue'
  import { ElMessage } from 'element-plus'
  defineProps({
    option: {
      type: Object as () => typeof copyCodeOption,
      required: true
    }
  })

  const text1 = `<edit-card-form title="组件风格">
    <el-form-item label="商品样式">
      <el-radio-group v-model="option.componentStyle.componentModal">
        <el-radio v-for="v in ['默认', '投影', '描边']" :key="v" :label="v" />
      </el-radio-group>
    </el-form-item>
  </edit-card-form>`
  const text2 = ` <edit-card-form title="内容编辑">
    <color-group v-model="option.contentEdit.color">
      <el-form-item label="图片">
        <image-item v-model="option.contentEdit.image" />
      </el-form-item>
      <el-form-item label="标题文字">
        <el-input
          maxlength="10"
          show-word-limit
          v-model="option.contentEdit.title"
          placeholder="请输入标题文字"
        />
      </el-form-item>
      <color-input keyword="background" label="背景颜色" />
      <el-form-item label="副标题文字" class="long-slider-input">
        <el-input
          maxlength="40"
          show-word-limit
          v-model="option.contentEdit.subTitle"
          placeholder="请输入副标题文字"
        />
      </el-form-item>
      <color-input keyword="subBackground" label="背景颜色" />
      <el-form-item label="联系方式名称" class="long-slider-input-6">
        <el-input
          maxlength="5"
          show-word-limit
          v-model="option.contentEdit.contactName"
          placeholder="请输入名称"
        />
      </el-form-item>
      <el-form-item label="联系方式内容" class="long-slider-input-6">
        <el-input
          maxlength="20"
          show-word-limit
          v-model="option.contentEdit.contactContent"
          placeholder="请输入内容"
        />
      </el-form-item>
      <el-form-item label="按钮文字">
        <el-input
          maxlength="5"
          show-word-limit
          v-model="option.contentEdit.btnText"
          placeholder="请输入内容"
        />
      </el-form-item>
      <color-input keyword="text" label="文字颜色" />
      <color-input keyword="btn" label="按钮颜色" />
    </color-group>
  </edit-card-form>`
  const text3 = `<edit-card-form title="边距设置">
    <slider-group v-model="option.padding">
      <slider-input keyword="top" label="上边距" :max="50" tips="px" />
      <slider-input keyword="bottom" label="下边距" :max="20" tips="px" />
      <slider-input keyword="leftRight" label="左右边距" :max="20" tips="px" />
      <slider-input keyword="topRadius" label="上圆角" :max="20" tips="px" />
      <slider-input keyword="bottomRadius" label="下圆角" :max="20" tips="px" />
    </slider-group>
  </edit-card-form>`
  const text4 = `<el-form-item label="组件边框">
      <el-radio-group v-model="option.componentStyle.borderStatus">
        <el-radio v-for="v in ['显示', '隐藏']" :key="v" :label="v === '显示'">
          {{ v }}
        </el-radio>
      </el-radio-group>
    </el-form-item>`
  const text5 = ` <edit-card-form title="组件样式">
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
      <color-input keyword="subBackground" label="标题背景" />
      <el-form-item label="内部背景">
        <color-input v-model="option.colorStyle.color.insideBackground" />
      </el-form-item>
    </color-group>
  </edit-card-form>`

  const copyItem = (content: string) => {
    //新增input标签
    const input = document.createElement('input')
    //将input的值设置为需要复制的内容
    input.value = content
    //添加input标签
    document.body.appendChild(input)
    //选中input标签
    input.select()
    //执行复制
    document.execCommand('copy')
    //移除input标签
    document.body.removeChild(input)
    ElMessage.success('复制成功!')
  }
</script>
<style lang="scss" scoped>
  .long-slider-input {
    :deep(.el-form-item__label) {
      width: 90px !important;
    }
  }
  .long-slider-input-6 {
    :deep(.el-form-item__label) {
      width: 100px !important;
    }
  }
</style>
