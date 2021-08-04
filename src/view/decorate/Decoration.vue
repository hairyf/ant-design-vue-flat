<!--
 * @Author: Mr.Mao
 * @Date: 2021-03-15 18:58:08
 * @LastEditTime: 2021-05-12 14:19:38
 * @Description: 店铺装修内容区
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <decorate-main>
    <!-- 菜单区 -->
    <template #component-menus>
      <el-input
        class="custom-input"
        placeholder="请输入模板名称"
        suffix-icon="el-icon-search"
        v-model="menuSearchText"
      />
      <el-collapse v-model="currentOpenMenus">
        <template v-for="(item, index) in componentMenus" :key="index">
          <template v-if="!item.offShow">
            <el-collapse-item
              :title="`${item.title}（${item.items.length}）`"
              :name="index"
              v-if="typeof item.target === 'undefined' || item.target === pageType"
            >
              <div class="component-list">
                <div
                  class="component-menu-item"
                  @dragstart="onDs(item)"
                  @click="incViewItem(item)"
                  @dragend="onDe"
                  v-for="(item, index) in item.items"
                  :key="index"
                  draggable="true"
                >
                  <!-- <i :class="[, 'list-icon']"></i> -->
                  <svg class="list-icon" aria-hidden="true">
                    <use :xlink:href="`#${item.icon}`" />
                  </svg>
                  <div class="list-text">{{ item.text }}</div>
                </div>
              </div>
            </el-collapse-item>
          </template>
        </template>
      </el-collapse>
    </template>
    <!-- 展示区 -->
    <template #content>
      <perfect-scrollbar class="perfect-scrollbar" ref="scroll">
        <div class="oe-flex oe-row-center">
          <mobile-emulator
            :style="{ [views[0]['option']?.backgroundType]: views[0]['option']?.backgroundColor }"
            @dragover="onDo"
          >
            <div id="sortable-container" ref="sortableContainer">
              <template v-for="(item, index) in views" :key="item.id">
                <component
                  v-if="ViewComponents?.[item.type]?.view"
                  :id="item.id"
                  :class="{ active: index === currentIndex, hide: item.hide }"
                  :data-index="index"
                  :is="ViewComponents[item.type].view"
                  :option="item.option"
                  @click="selectViewItem(index)"
                  class="view-item"
                />
              </template>
            </div>
            <div class="tool-bar">
              <i
                class="tl-item ad-hide"
                :class="{ off: !allowHideItem }"
                @click="currentIndex && allowHideItem && hideViewItem(currentIndex)"
              />
              <i
                class="tl-item el-icon-arrow-up"
                :class="{ off: !allowUpItem }"
                @click="currentIndex && allowUpItem && upViewItem(currentIndex)"
              />
              <i
                class="tl-item el-icon-arrow-down"
                :class="{ off: !allowDownItem }"
                @click="currentIndex && allowDownItem && downViewItem(currentIndex)"
              />
              <i
                class="tl-item ad-copy"
                :class="{ off: !allowCopyItem }"
                @click="currentIndex && allowCopyItem && copyViewItem(currentIndex)"
              />
              <i
                class="tl-item el-icon-delete"
                :class="{ off: !allowDelItem }"
                @click="currentIndex && allowDelItem && deleteViewItem(currentIndex)"
              />
              <i class="tl-item ad-settings" @click="selectViewItem(0)" />
            </div>
          </mobile-emulator>
        </div>
      </perfect-scrollbar>
    </template>
    <!-- 编辑区 -->
    <template #edit>
      <transition name="el-fade-in-linear">
        <div class="eidt-container">
          <div class="oe-text-center oe-p-t-15 oe-p-b-15" v-if="development">
            当前组件类型：{{ views[currentIndex].type }}
          </div>
          <component
            v-if="views[currentIndex]"
            :is="ViewComponents[views[currentIndex].type].edit"
            v-model:option="views[currentIndex].option"
          />
        </div>
      </transition>
    </template>
    <!-- 弹窗区 -->
    <template #window>
      <component
        v-for="(item, index) in windowComponentMenuItems"
        :is="ViewComponents[item.type].edit"
        :decorateInfo="decorateInfo"
        :key="index"
      />
    </template>
  </decorate-main>
</template>
<script lang="ts" setup>
  import DecorateMain from '@/view/decorate/layout/DecorateMain.vue'
  import { computed, defineProps, ref, watch } from 'vue'
  import { generateArray } from '@/utils'
  import { useDragSortable } from '@/view/decorate/hooks/use-drag-sortable'
  import { useViewTools } from '@/view/decorate/hooks/use-view-tools'
  import { ViewComponents, menuConfig, defaultContentOption } from '@/view/decorate/config'
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
  const development = import.meta.env.MODE === 'development'
  // 当前页面类型
  const pageType = computed(() => props.decorateInfo?.content?.views[props.currentViewIndex].type)
  // 监视切换视图
  const watchTarget = () => props.currentViewIndex
  watch(watchTarget, (i) => {
    views.value = props.decorateInfo?.content?.views[i].content
    selectViewItem(0)
  })
  // 组件搜索名称
  const menuSearchText = ref('')
  // 组件菜单
  const componentMenus = ref(menuConfig)
  // 弹窗菜单项(组件菜单过滤)
  const windowComponentMenuItems = computed(() => {
    return componentMenus.value
      .map((v) => v.items)
      .flat(1)
      .filter((v) => v.modal)
  })
  // 默认展开的组件菜单
  const currentOpenMenus = ref(generateArray(0, componentMenus.value.length - 1))
  // 当前视图层
  const views = ref(props.decorateInfo.content.views[0].content)
  // 调用拖拽, 组件内排序逻辑钩子
  const { onDs, onDo, onDe, sortableContainer, dragEnd, dragItemIndex } = useDragSortable(views)
  // 获取工具栏方法
  const {
    currentIndex,
    allowUpItem,
    allowDownItem,
    allowCopyItem,
    allowHideItem,
    allowDelItem,
    selectViewItem,
    copyViewItem,
    hideViewItem,
    upViewItem,
    downViewItem,
    deleteViewItem,
    incViewItem,
    scroll
  } = useViewTools(views)
  // 拖动结束时自动选择当前项
  dragEnd(() => selectViewItem(dragItemIndex.value))
</script>
<style lang="scss" scoped>
  /* 自定义输入框 */
  .custom-input.el-input {
    width: 285px !important;
    margin: 20px;
  }
  .mobile-emulator {
    overflow: visible;
  }
  /* 组件容器 */
  .el-collapse {
    width: 290px;
    margin: 0 15px;
  }
  /* 组件菜单项 */
  .component-menu-item {
    display: inline-block;
    cursor: pointer;
    padding: 0 0 3px 0;
    width: 81px;
    text-align: center;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    margin: 6px;
    .el-collapse-item__content {
      padding-bottom: 0;
    }
    .list-icon {
      margin-top: 5px;
      margin-bottom: 2px;
      width: 37px;
      height: 37px;
      color: var(--color-primary);
    }
    .list-text {
      margin-top: -8px;
      font-size: 14px;
      color: #000000;
    }
    &:hover {
      border: 1px solid var(--color-primary);
      .list-text {
        color: var(--color-primary);
      }
    }
  }
  /* 视图项 */
  .view-item {
    position: relative;
    cursor: pointer;
    &:hover {
      &::after {
        content: '';
        box-sizing: border-box;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        border: 2px dotted var(--color-primary);
      }
    }
    &.active {
      &::after {
        content: '';
        box-sizing: border-box;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        border: 1px solid var(--color-primary);
      }
    }
    div {
      pointer-events: none;
    }
    &.hide::after {
      position: absolute;
      content: '';
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.2);
      background-image: url('/custom-assets/images/decorate/noshow.png');
      background-repeat: no-repeat;
      background-position: center;
    }
  }
  /* 视图层工具栏 */
  .tool-bar {
    position: fixed;
    width: 64px;
    margin-left: -75px;
    top: 200px;
    background: #ffffff;
    z-index: 5;
    border: 1px solid #d9d9d9;
    box-sizing: border-box;
    border-radius: 10px;
    overflow: hidden;
    .tl-item {
      border-radius: 10px;
      width: 100%;
      height: 64px;
      cursor: pointer;
      user-select: none;
      display: inline-block;
      text-align: center;
      line-height: 64px;
      font-size: 26px;
      transition: 0.2s;
      background-color: #ffffff;
      color: #8c8c8c;
      &:hover {
        background-color: var(--color-primary-light-opacity-8);
        box-sizing: border-box;
        color: var(--color-primary);
      }
      &.off {
        cursor: auto;
        color: #c9c9c9;
        &:hover {
          background-color: #ffffff;
          box-sizing: border-box;
          color: #c9c9c9;
        }
      }
    }
  }
  /* 自定义滚动条 */
  .perfect-scrollbar {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
