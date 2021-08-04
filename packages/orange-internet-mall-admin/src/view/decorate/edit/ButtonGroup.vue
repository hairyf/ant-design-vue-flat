<!--
 * @Author: Zhilong
 * @Date: 2021-04-10 10:13:49
 * @LastEditTime: 2021-04-23 12:08:30
 * @Description: 按钮组 操作区
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <edit-header title="按钮组" icon="ad-button-group" />
  <!-- 组件风格 -->
  <edit-card-form title="组件风格">
    <el-form-item label="组件样式">
      <el-radio-group v-model="option.componentStyle.componentModal">
        <el-radio :label="v" v-for="v in ['默认', '投影', '描边']" :key="v" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="风格类型">
      <el-radio-group v-model="option.componentStyle.styleType" size="small">
        <el-radio-button v-for="v in ['固定显示', '单行滑动', '分页滑动']" :key="v" :label="v" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="按钮样式">
      <el-radio-group v-model="option.componentStyle.buttonStyle">
        <el-radio v-for="v in ['i+t', 'i', 't']" :key="v" :label="v">
          {{
            v === 'i+t'
              ? `${option.componentStyle.buttonType}+文字`
              : v === 'i'
              ? option.componentStyle.buttonType
              : '文字'
          }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="按钮类型">
      <el-radio-group v-model="option.componentStyle.buttonType">
        <el-radio v-for="v in ['图片', '图标']" :key="v" :label="v" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="按钮形状" v-if="buttonType === '图片' && buttonStyle !== 't'">
      <el-radio-group v-model="option.componentStyle.buttonShape" size="mini" class="btn-shape">
        <el-radio-button label="square">
          <div
            class="btn-shape-item"
            :style="{
              background:
                option.componentStyle.buttonShape === 'square' ? 'var(--color-primary)' : '#d9d9d9'
            }"
          />
        </el-radio-button>
        <el-radio-button label="fillet">
          <div
            class="btn-shape-item"
            :style="{
              borderRadius: '5px',
              background:
                option.componentStyle.buttonShape === 'fillet' ? 'var(--color-primary)' : '#d9d9d9'
            }"
          />
        </el-radio-button>
        <el-radio-button label="circular">
          <div
            class="btn-shape-item"
            :style="{
              borderRadius: '50%',
              background:
                option.componentStyle.buttonShape === 'circular'
                  ? 'var(--color-primary)'
                  : '#d9d9d9'
            }"
          />
        </el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="每行数量">
      <el-radio-group v-model="option.componentStyle.lineNumber">
        <el-radio v-for="v in [3, 4, 5]" :key="v" :label="v">{{ v }}个</el-radio>
      </el-radio-group>
    </el-form-item>
  </edit-card-form>
  <edit-card-form :title="buttonType === '图片' ? '内容编辑' : '样式选择图标'">
    <edit-card-item
      v-for="(item, index) in option.contentEdit"
      :key="item.CACHE_KEY_LIST"
      :show-close="option.contentEdit.length > 1"
      @close="delItem(index)"
      class="edit-card-item"
    >
      <el-form-item
        label="图标"
        v-if="buttonType === '图标' && buttonStyle !== 't'"
        class="icon-view"
      >
        <icon-item v-model="item.icon" />
      </el-form-item>
      <el-form-item label="图片" v-if="buttonType === '图片' && buttonStyle !== 't'">
        <image-item v-model="item.image" />
      </el-form-item>
      <!-- 标签内容 -->
      <template v-if="buttonType === '图片' && buttonStyle !== 't'">
        <el-form-item label="标签">
          <el-radio-group v-model="item.labelOption">
            <el-radio v-for="(v, i) in [true, false]" :key="i" :label="v">
              {{ v ? '开启' : '关闭' }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="标签内容" v-if="item.labelOption">
          <el-input style="width: 265px" maxlength="5" show-word-limit v-model="item.label" />
        </el-form-item>
        <el-form-item label="标签颜色" v-if="item.labelOption">
          <color-input v-model="item.color.label" />
        </el-form-item>
        <el-form-item label="背景颜色" v-if="item.labelOption">
          <color-input v-model="item.color.subBackground" />
        </el-form-item>
      </template>
      <el-form-item label="文字内容" v-if="buttonStyle !== 'i'">
        <el-input style="width: 265px" maxlength="5" show-word-limit v-model="item.title" />
      </el-form-item>
      <el-form-item label="文字颜色" v-if="buttonStyle !== 'i'">
        <color-input v-model="item.color.title" />
      </el-form-item>
      <el-form-item label="链接" class="oe-m-t-15">
        <link-item v-model="item.link" />
      </el-form-item>
    </edit-card-item>
    <div class="inc-button" @click="addItem(defaultItem)">
      <span class="oe-m-r-2">+添加</span>{{ option.contentEdit.length }}/{{ maxNumber }}
    </div>
  </edit-card-form>
  <edit-card-form title="组件样式">
    <el-form-item label="组件背景">
      <el-radio-group v-model="option.colorStyle.backgroundType">
        <el-radio :label="v" v-for="v in ['透明', '颜色', '背景图片']" :key="v" />
      </el-radio-group>
    </el-form-item>
    <!-- 背景图片 -->
    <el-form-item label="选择图片" v-show="option.colorStyle.backgroundType === '背景图片'">
      <image-item v-model="option.colorStyle.image" />
    </el-form-item>
    <!-- 背景颜色 -->
    <color-group v-model="option.colorStyle.color" reset>
      <color-input
        keyword="background"
        label="背景颜色"
        v-show="option.colorStyle.backgroundType === '颜色'"
      />
      <color-input keyword="btn" label="按钮背景" />
      <color-input
        keyword="icon"
        label="图标"
        v-show="option.componentStyle.buttonType === '图标'"
      />
    </color-group>
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
</template>
<script lang="ts" setup>
  import { defineProps, computed } from '@vue/runtime-core'
  import { buttonGroupOption } from '@/view/decorate/config/options'
  import EditHeader from '@/view/decorate/components/EditHeader.vue'
  import EditCardForm from '@/view/decorate/components/EditCardForm.vue'
  import ImageItem from '@/view/decorate/components/common/ImageItem.vue'
  import IconItem from '@/view/decorate/components/common/IconItem.vue'
  import EditCardItem from '@/view/decorate/components/EditCardItem.vue'
  import ColorGroup from '@/view/decorate/components/items/ColorGroup.vue'
  import ColorInput from '@/view/decorate/components/items/ColorInput.vue'
  import SliderGroup from '@/view/decorate/components/items/SliderGroup.vue'
  import SliderInput from '@/view/decorate/components/items/SliderInput.vue'
  import LinkItem from '@/view/decorate/components/common/LinkItem.vue'
  import { cloneDeep } from 'lodash'
  import { nanoid } from 'nanoid'
  const props = defineProps({
    option: {
      type: Object as () => typeof buttonGroupOption,
      required: true
    }
  })
  // 得到一些读取值
  const buttonType = computed(() => props.option.componentStyle.buttonType)
  const buttonStyle = computed(() => props.option.componentStyle.buttonStyle)
  // 最大数量
  const maxNumber = 30
  // 默认item
  const defaultItem = cloneDeep(props.option.contentEdit[0])
  // 添加一条
  const addItem = (item: typeof defaultItem) =>
    props.option.contentEdit.length < maxNumber &&
    props.option.contentEdit.push(
      cloneDeep({ ...item, CACHE_KEY_LIST: nanoid(5), labelOption: false })
    )
  // 删除一条
  const delItem = (index: number) => props.option.contentEdit.splice(index, 1)
</script>
<style lang="scss" scoped>
  .btn-shape {
    :deep(.el-radio-button__inner) {
      background-color: inherit;
    }
    div.btn-shape-item {
      width: 40px;
      height: 40px;
    }
  }

  .edit-card-item {
    margin-bottom: 20px;
    border-style: solid !important;

    /*  :deep(.edit-card-item-content) {
      border-style: solid !important;
    } */
  }
  .icon-view {
    :deep(.el-form-item__content) {
      line-height: unset;
    }
  }
</style>
