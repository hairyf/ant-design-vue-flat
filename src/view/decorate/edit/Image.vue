<!--
 * @Author: Mr.Mao
 * @Date: 2021-03-26 10:49:52
 * @LastEditTime: 2021-04-23 12:07:08
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="image">
    <edit-header icon="ad-image" title="图片" />
    <!-- 热区设置 -->
    <edit-card-form title="图片设置">
      <el-form-item label="风格类型">
        <el-radio-group v-model="option.styleType" size="small">
          <el-radio-button label="single">
            <i class="ad-single"></i>
          </el-radio-button>
          <el-radio-button label="double">
            <i class="ad-double"></i>
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="图片" v-if="option.styleType === 'single'">
        <el-radio-group v-model="option.type">
          <el-radio :label="v" v-for="v in ['标准', '高级（热区）']" :key="v" />
        </el-radio-group>
      </el-form-item>
      <div class="title">添加图片</div>
      <template v-if="option.type == '标准' || option.styleType === 'double'">
        <div class="image-list">
          <div class="image-item oe-flex" v-for="(item, index) in option.images" :key="index">
            <image-item v-model="item.image" />
            <link-item class="oe-m-l-15 oe-flex-1" v-model="item.link">
              <el-popover
                placement="bottom"
                trigger="manual"
                content="最少保留一个"
                v-model:visible="showTips"
              >
                <template #reference>
                  <span class="clear-text" @click="onDelectImageItem(index)"> 清除 </span>
                </template>
              </el-popover>
            </link-item>
          </div>
        </div>
      </template>
      <div class="hot-image-list" v-else>
        <div class="hot-image-item" v-for="(item, index) in option.images" :key="index">
          <div class="hot-image-content" @click="onOpenHotEdit(index)">
            <el-image
              :src="
                item.image ||
                '/custom-assets/images/decorate/product-transverse.png'
              "
              fit="cover"
              style="width: 100%; height: 100%"
            />
            <div
              class="drag-item"
              v-for="(hotItem, index) in item?.hots"
              :key="index"
              :style="{
                top: `${hotItem.top / (750 / 458)}px`,
                left: `${hotItem.left / (750 / 458)}px`,
                width: `${hotItem.width / (750 / 458)}px`,
                height: `${hotItem.height / (750 / 458)}px`,
                zIndex: index + 1
              }"
            >
              <div class="tips oe-text-center">
                <div v-if="hotItem.link.label" class="oe-m-b-5">{{ hotItem.link.label }}</div>
                <div>{{ hotItem.link.name || '设置热区' }}</div>
              </div>
            </div>
            <el-popover
              placement="bottom"
              trigger="manual"
              content="最少保留一个"
              v-model:visible="showTips"
            >
              <template #reference>
                <i @click.stop="onDelectImageItem(index)" class="el-icon-close" />
              </template>
            </el-popover>
          </div>
          <div class="oe-m-t-14 oe-m-b-14">
            <el-link
              href="javascript:;"
              type="primary"
              class="oe-m-r-30"
              @click="onOpenHotEdit(index)"
            >
              设置热区
            </el-link>
            <el-link href="javascript:;" type="primary" @click="onOpenEditImagePath(index)">
              替换图片
            </el-link>
          </div>
        </div>
      </div>
      <div class="tips-text">建议图片尺寸为宽750px高100-400px</div>
      <el-button size="mini" icon="el-icon-plus" @click="onPushImageItem">
        添加 {{ option.images.length }} / 8 张图片
      </el-button>
      <hot-edit v-model:show="showHotEdit" v-model:image="props.option.images[currentIndex]" />
    </edit-card-form>
    <!-- 颜色样式 -->
    <edit-card-form title="组件样式">
      <el-form-item label="组件背景">
        <el-radio-group v-model="option.backgroundType">
          <el-radio :label="v" v-for="v in ['透明', '颜色', '背景图片']" :key="v" />
        </el-radio-group>
      </el-form-item>
      <color-group v-if="option.backgroundType == '颜色'" v-model="option.color">
        <color-input keyword="background" label="背景颜色" />
      </color-group>
      <el-form-item label="图片" v-if="option.backgroundType == '背景图片'">
        <image-item v-model="option.image" tips="建议图片尺寸为76X76px" />
      </el-form-item>
    </edit-card-form>
    <!-- 边距设置 -->
    <edit-card-form title="边距设置">
      <slider-group v-model="option.padding">
        <slider-input keyword="image" label="图片边距" tips="px" />
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
  import ImageItem from '@/view/decorate/components/common/ImageItem.vue'
  import LinkItem from '@/view/decorate/components/common/LinkItem.vue'
  import HotEdit from '@/view/decorate/components/common/HotEdit.vue'
  import EditHeader from '@/view/decorate/components/EditHeader.vue'
  import EditCardForm from '@/view/decorate/components/EditCardForm.vue'
  import ColorGroup from '@/view/decorate/components/items/ColorGroup.vue'
  import SliderGroup from '@/view/decorate/components/items/SliderGroup.vue'
  import SliderInput from '@/view/decorate/components/items/SliderInput.vue'
  import ColorInput from '@/view/decorate/components/items/ColorInput.vue'

  import { defineProps, ref } from '@vue/runtime-core'
  import { imageOption, linkOption } from '@/view/decorate/config'
  import { clone, cloneDeep } from 'lodash'
  import { MaterialSelect } from '@/components/selectors'
  const props = defineProps({
    option: {
      type: Object as () => typeof imageOption,
      required: true
    }
  })
  // 是否展示图片清除提示
  const showTips = ref(false)
  // 添加图片项
  const onPushImageItem = () => {
    if (props.option.images.length < 8) {
      props.option.images.push({
        image: '',
        link: clone(linkOption),
        hots: cloneDeep(imageOption.images[0].hots)
      })
    }
  }
  // 删除图片项
  const onDelectImageItem = (index: number) => {
    if (props.option.images.length !== 1) {
      props.option.images.splice(index, 1)
    } else {
      showTips.value = !showTips.value
    }
  }
  if (!props.option.images.length) onPushImageItem()
  // 当前图片索引
  const currentIndex = ref(0)
  // 是否展开热区编辑器
  const showHotEdit = ref(false)
  // 记录当前索引, 并打开图片选择器
  const onOpenEditImagePath = async (index: number) => {
    const [imageItem] = await MaterialSelect({ multiple: false })
    props.option.images[index].image = imageItem.path
  }
  // 记录当前索引, 并打开热区编辑器
  const onOpenHotEdit = (index: number) => {
    currentIndex.value = index
    showHotEdit.value = true
  }
</script>
<style lang="scss" scoped>
  @import '@/style/mixin.scss';
  .title {
    margin-bottom: 13px;
  }
  .el-image {
    user-select: none;
  }
  .image-list {
    margin-bottom: 10px;
  }
  .image-item {
    @include not-last-child(margin-bottom, 20px);
    padding: 8px;
    border: 1px solid #d9d9d9;
    box-sizing: border-box;
    .el-image {
      cursor: pointer;
      width: 48px;
      height: 48px;
    }
  }
  .el-button {
    width: 100%;
  }
  .el-icon-close {
    position: absolute;
    cursor: pointer;
    padding: 5px;
    right: 10px;
    top: 10px;
  }
  .tips-text {
    margin-bottom: 20px;
    color: #8c8c8c;
    font-size: 12px;
  }
  .hot-image-content {
    position: relative;
    overflow: hidden;
  }
  .drag-item {
    position: absolute;
    background-color: var(--color-primary-light-opacity-8);
    border: 1px dashed var(--color-primary);
    box-sizing: border-box;
    overflow: hidden;
    .tips {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
      user-select: none;
      font-size: 12px;
      color: var(--color-primary);
    }
  }
</style>
