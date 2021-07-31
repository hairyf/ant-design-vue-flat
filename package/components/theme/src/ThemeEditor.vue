<!--
 * @Author: Zhilong
 * @Date: 2021-07-19 10:07:11
 * @LastEditTime: 2021-07-31 15:59:10
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
      <div class="flex items-center gap-10">
        <span class="text-lg">主题编辑器</span>
        <div>
          <cal-tag class="cursor-pointer" @click="onResetLocaleTheme">清除配置</cal-tag>
        </div>
      </div>
      <cal-pefrect-scrollbar class="h-500">
        <n-collapse>
          <n-collapse-item v-for="(editors, key) in deepEditorTheme" :key="key" :title="key">
            <div class="grid gap-10" v-if="editors.length">
              <template v-for="(item, index) in editors" :key="index">
                <div class="flex gap-10">
                  <span>{{ item.name }}</span>
                  <cal-tag
                    v-if="item.name === 'commonPrimaryColor'"
                    class="cursor-pointer"
                    @click="onGenerateThemeFuse(item.value.value)"
                  >
                    生成混色
                  </cal-tag>
                </div>
                <cal-color-n-pickr
                  v-if="/color/i.test(item.name)"
                  :model-value="item.value.value || get(currentTheme, item.target)"
                  @complete="item.value.value = $event"
                />
                <cal-input
                  v-else
                  v-model="item.value.value"
                  :placeholder="get(currentTheme, item.target) || '暂无'"
                />
              </template>
            </div>
            <cal-empty v-else />
          </n-collapse-item>
        </n-collapse>
      </cal-pefrect-scrollbar>
      <div class="flex gap-28">
        <cal-button class="flex-1" @click="onImportJsonOption">导入</cal-button>
        <cal-button class="flex-1" type="primary" @click="onCreateJsonDownload">导出</cal-button>
      </div>
    </div>
  </n-popover>
</template>
<script lang="ts">
  import CalIcon from '../../icon/src/Icon.vue'
  import CalInput from '../../input/src/Input.vue'
  import CalButton from '../../button/src/Button.vue'
  import CalTag from '../../tag/src/Tag.vue'
  import CalColorNPickr from '../../color-pickr/src/ColorNPickr.vue'
  import CalPefrectScrollbar from '../../perfect-scrollbar/src/PerfectScrollbar.vue'
  import CalEmpty from '../../empty/src/Empty.vue'
  import { defineComponent, provide } from 'vue'
  import { mergeThemeOverrides } from '../../../utils/theme'
  import { useDeepEditorTheme } from '../hooks/use-deep-editor-theme'
  import { NPopover } from 'naive-ui/es/popover'
  import { NCollapse, NCollapseItem } from 'naive-ui/es/collapse'
  import { get } from 'lodash-es'
  import { downloadBlobFile, fuseThemeColor, readFileReader, selectFiles } from '@tuimao/utils'
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
  const onResetLocaleTheme = () => (localeTheme.value = {})
  // 根据颜色生成混合
  const onGenerateThemeFuse = (color: string) => {
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
  const onCreateJsonDownload = () => {
    downloadBlobFile(JSON.stringify(localeTheme.value, null, '\t') as any, 'theme-overrides.json')
  }
  // 导入主题 JSON 文件
  const onImportJsonOption = async () => {
    const [file] = await selectFiles({ multiple: false })
    const jsonText = await readFileReader('readAsText', file)
    localeTheme.value = JSON.parse(jsonText)
  }
</script>

<style lang="scss" scoped>
  .cal-theme-editor {
    @apply fixed w-56 h-56 bg-white rounded-full shadow flex justify-center items-center cursor-pointer;
    right: 40px;
    bottom: 40px;
  }
</style>
