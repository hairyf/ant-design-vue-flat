<!--
 * @Author: Mr.Mao
 * @Date: 2021-03-15 18:58:08
 * @LastEditTime: 2021-04-23 12:13:17
 * @Description: 选项卡编辑项
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="commodity-tab"> </div>
  <edit-header title="选项卡" icon="ad-commodity-tab" />
  <edit-card-form title="选项卡样式">
    <color-group v-model="option.tabStyle.color" reset>
      <color-input keyword="background" label="背景颜色" />
      <color-input keyword="selectBackground" label="选中背景" />
      <color-input keyword="title" label="文字颜色" />
      <color-input keyword="selectTitle" label="选中文字" />
      <el-form-item label="选项条">
        <el-radio-group v-model="option.tabStyle.bottomBorder">
          <el-radio :label="false"> 关闭 </el-radio>
          <el-radio :label="true"> 开启 </el-radio>
        </el-radio-group>
      </el-form-item>
      <color-input keyword="bottomBorder" label="颜色" v-show="option.tabStyle.bottomBorder" />
      <!-- <el-form-item label="副标题">
        <el-radio-group v-model="option.tabStyle.subTitle">
          <el-radio :label="false"> 关闭 </el-radio>
          <el-radio :label="true"> 开启 </el-radio>
        </el-radio-group>
      </el-form-item> -->
      <color-input keyword="subTitle" label="未选中" v-show="option.tabStyle.subTitle" />
      <color-input keyword="selectSubTitle" label="选中" v-show="option.tabStyle.subTitle" />
    </color-group>
    <slider-group v-model="option.tabStyle.padding">
      <slider-input keyword="shopSpacing" label="间距" tips="px" />
      <slider-input keyword="top" label="上边距" :max="50" tips="px" />
      <slider-input keyword="bottom" label="下边距" :max="20" tips="px" />
      <slider-input keyword="leftRight" label="左右边距" :max="20" tips="px" />
      <slider-input keyword="topRadius" label="上圆角" :max="20" tips="px" />
      <slider-input keyword="bottomRadius" label="下圆角" :max="20" tips="px" />
    </slider-group>
  </edit-card-form>
  <edit-card-form title="选项卡设置" class="oe-m-b-14">
    <nested-sort-table v-model="option.tabList" class="oe-m-b-24" handle=".ad-tableIcon">
      <template #item="{ item, index }">
        <div
          class="oe-flex oe-p-16 oe-p-t-25 oe-p-b-25 tab-list-item"
          :style="{
            border: index === currentIndex ? '1px solid #FF9D28' : '1px solid #d9d9d9'
            /* border:
              option.CACHE_TARGET_LIST === item.CACHE_KEY_LIST
                ? '1px solid #FF9D28'
                : '1px solid #d9d9d9' */
          }"
          :key="index"
          @click="selectItem(item.CACHE_KEY_LIST)"
        >
          <i
            class="ad-tableIcon item-icon"
            style="font-size: 12px; cursor: move"
            @click.stop
          />
          <el-input
            v-model="item.title"
            placeholder="请输入标签名称"
            maxlength="10"
            show-word-limit
            class="oe-m-l-16 oe-m-r-16"
            @click.stop
          />
          <i
            v-if="option.tabList.length !== 1"
            class="ad-delete item-icon"
            style="font-size: 20px"
            @click.stop="moveImageListItem(index)"
          />
        </div>
      </template>
    </nested-sort-table>
    <div class="image-list-btn" @click="addImageListItem(defaultItem)">
      <span class="oe-m-r-6">+添加</span>
      <span>{{ option.tabList.length }}/{{ maxNumber }}</span>
    </div>
  </edit-card-form>
  <!-- 不同的选项卡 不同渲染~ -->
  <template v-for="item in option.tabList" :key="item.CACHE_KEY_LIST">
    <commodity-group
      v-if="item.CACHE_KEY_LIST === option.CACHE_TARGET_LIST"
      v-model:option="item.content"
      :showHeader="false"
    />
  </template>
  <!-- <commodity-group
    v-if="option.tabList[currentIndex]"
    v-model:option="option.tabList[currentIndex].content"
    :showHeader="false"
  /> -->
</template>
<script setup lang="ts">
  import NestedSortTable from '@/components/nested-sort-table/nested-sort-table.vue'
  import SliderGroup from '@/view/decorate/components/items/SliderGroup.vue'
  import SliderInput from '@/view/decorate/components/items/SliderInput.vue'
  import ColorInput from '@/view/decorate/components/items/ColorInput.vue'
  import ColorGroup from '@/view/decorate/components/items/ColorGroup.vue'
  import EditCardForm from '@/view/decorate/components/EditCardForm.vue'
  import EditHeader from '@/view/decorate/components/EditHeader.vue'
  import CommodityGroup from './CommodityGroup.vue'
  import { tabOption } from '@/view/decorate/config/options'
  import { cloneDeep, pullAt } from 'lodash'
  import { computed, defineProps, ref, watch } from 'vue'
  import { nanoid } from 'nanoid'
  // 最大数量
  const maxNumber = 8
  const props = defineProps({
    option: {
      type: Object as () => typeof tabOption,
      required: true
    }
  })
  // 取默认tabList 里面的一项数据 用作添加的填充
  const defaultItem = cloneDeep(props.option.tabList[0])
  // 添加事件 传入数据 进行添加
  const addImageListItem = (data: typeof defaultItem) => {
    if (props.option.tabList.length >= maxNumber) return
    // 深度拷贝一个 让CACHE_KEY_LIST做一个新的唯一值
    const cloneDeepData = cloneDeep({ ...data, CACHE_KEY_LIST: nanoid(5) })
    props.option.tabList.push(cloneDeepData)
  }
  // 删除事件
  const moveImageListItem = (index: number) => {
    const { length } = props.option.tabList
    // 保留一项 不允许删除
    if (length === 1) return
    // 删除index为选定值 会自动向下或向上选择
    if (index === currentIndex.value) {
      selectItem(props.option.tabList[index === 0 ? index + 1 : index - 1].CACHE_KEY_LIST)
    }
    pullAt(props.option.tabList, index)
  }
  // 修改选择项
  const selectItem = (index: string) => (props.option.CACHE_TARGET_LIST = index)

  // 当前选择的index
  const currentIndex = computed(() => {
    return props.option.tabList.findIndex(
      (item) => item.CACHE_KEY_LIST === props.option.CACHE_TARGET_LIST
    )
  })
  // watch(
  //   () => props.option.CACHE_TARGET_LIST,
  //   () => {
  //     currentIndex.value =
  //       props.option.tabList.findIndex(
  //         (item) => item.CACHE_KEY_LIST === props.option.CACHE_TARGET_LIST
  //       ) || 0
  //   }
  // )
</script>
<style lang="scss" scoped>
  .image-list-btn {
    display: flex;
    flex: 1;
    justify-content: center;
    color: var(--color-primary);
    border: 1px dashed #d9d9d9;
    box-sizing: border-box;
    border-radius: 2px;
    margin: 0 17px;
    padding: 8px 0;
    cursor: pointer;
    user-select: none;
    background: #f5f5f5;
  }
  .tab-list-item {
    box-sizing: border-box;
    cursor: pointer;
    .item-icon {
      color: var(--color-primary);
      cursor: pointer;
    }
  }
  .commodity-tab {
    .add-btn {
      cursor: pointer;
      width: 424px;
      height: 38px;
      background: #f5f5f5;
      margin: 14px auto 0 auto;
      border: 1px dashed #d9d9d9;
      line-height: 38px;
      text-align: center;
      font-size: 14px;
      color: var(--color-primary);
    }
    :deep(.el-radio) {
      margin-right: 14px;
    }
  }
</style>
