<!--
 * @Author: Zhilong
 * @Date: 2021-07-19 10:07:11
 * @LastEditTime: 2021-07-30 17:02:33
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <slot />
  <n-popover placement="left-end" trigger="click">
    <template #trigger>
      <div class="cal-theme-editor">
        <cal-icon type="theme" size="35" />
      </div>
    </template>
    <div class="w-320 pt-10 mb-20 grid gap-28 overflow-hidden select-none">
      <div class="text-lg">主题编辑器</div>
      <cal-pefrect-scrollbar class="h-500">
        <n-collapse>
          <n-collapse-item v-for="(editors, key) in deepEditorTheme" :key="key" :title="key">
            <div class="grid gap-10">
              <template v-for="(item, index) in editors" :key="index">
                <div class="flex gap-10">
                  <span>{{ item.name }}</span>
                  <cal-tag
                    class="cursor-pointer"
                    v-if="item.name === 'commonPrimaryColor'"
                    @click="generateThemeFuse(item.value.value)"
                  >
                    生成
                  </cal-tag>
                </div>
                <cal-input
                  v-model="item.value.value"
                  :placeholder="get(currentTheme, item.target) || '暂无'"
                />
              </template>
            </div>
          </n-collapse-item>
        </n-collapse>
      </cal-pefrect-scrollbar>
      <div class="flex gap-28">
        <cal-button class="flex-1" @click="resetLocaleTheme">清除</cal-button>
        <cal-button class="flex-1" type="primary" @click="createJsonDownload">导出</cal-button>
      </div>
    </div>
  </n-popover>
</template>
<script lang="ts">
  import CalIcon from '../../icon/src/Icon.vue'
  import CalInput from '../../input/src/Input.vue'
  import CalButton from '../../button/src/Button.vue'
  import CalTag from '../../tag/src/Tag.vue'
  import CalPefrectScrollbar from '../../perfect-scrollbar/src/PerfectScrollbar.vue'
  import { defineComponent, provide } from 'vue'
  import { mergeThemeOverrides } from '../../../utils/theme'
  import { useDeepEditorTheme } from '../hooks/use-deep-editor-theme'
  import { NPopover } from 'naive-ui/es/popover'
  import { NCollapse, NCollapseItem } from 'naive-ui/es/collapse'
  import { get } from 'lodash-es'
  import { downloadBlobFile, fuseThemeColor } from '@tuimao/utils'
  import message from 'ant-design-vue/es/message'
  export default defineComponent({ name: 'CalThemeEditor' })
</script>
<script lang="ts" setup>
  // 获取递归编辑项
  const { localeTheme, deepEditorTheme, currentTheme } = useDeepEditorTheme()
  // 进行注入
  const mergeTheme = mergeThemeOverrides(localeTheme)
  provide('themeOverrides', mergeTheme)
  // 重置编辑主题
  const resetLocaleTheme = () => (localeTheme.value = {})
  // 根据颜色生成混合
  const generateThemeFuse = (color: string) => {
    if (!color) {
      message.error('请先输入颜色')
      return
    }
    localeTheme.value.Common = {
      ...localeTheme.value.Common,
      ...fuseThemeColor(color)
    }
  }
  // 导出主题 JSON 文件
  const createJsonDownload = () => {
    downloadBlobFile(JSON.stringify(localeTheme.value, null, '\t') as any, 'theme-overrides.json')
  }
</script>

<style lang="scss" scoped>
  .cal-theme-editor {
    @apply fixed w-56 h-56 bg-white rounded-full shadow flex justify-center items-center cursor-pointer;
    right: 40px;
    bottom: 40px;
  }
</style>
