<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-22 13:23:20
 * @LastEditTime: 2021-06-10 09:42:28
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-popover
    overlay-class-name="theme-popover"
    placement="rightBottom"
    trigger="hover"
    @visibleChange="!$event && setThemeColor(theme.option)"
  >
    <template v-slot:content>
      <div class="header px-24 pt-16 pb-10 flex justify-between">
        <span class="text-base align-middle">主题风格</span>
        <cal-button class="save-button w-112" type="primary" @click="saveThemeColor">
          保存
        </cal-button>
      </div>
      <div class="warp flex">
        <div class="border-t border-gray-lightest p-14 w-384">
          <div class="text-sm text-center mb-16">当前主题</div>
          <div class="flex justify-center items-center">
            <div class="flex justify-center flex-1">
              <theme-item
                :text="currentOption.text"
                :color="currentOption.linearGradientColor || currentOption.color"
                :linear-gradient="!currentOption.linearGradientColor"
              />
            </div>

            <div class="flex-1 h-112 flex flex-col" v-click-away="onClickAwayCustom">
              <transition
                enter-active-class="animate__animated animate__flipInY"
                :duration="{ enter: 600, leave: 1 }"
              >
                <div class="flex flex-col items-center" v-if="!editCustom">
                  <div class="mb-16 mt-20">对当前主题不满意？</div>
                  <cal-button type="primary" @click="editCustom = true">自定义主题</cal-button>
                </div>
                <div class="flex flex-col items-center" v-else>
                  <color-ful-pickr :height="68" v-model="customColor" />
                  <div class="mt-10 text-center">
                    <cal-button class="mr-6" size="small" @click="editCustom = false">
                      取消
                    </cal-button>
                    <cal-button type="primary" size="small" @click="onSetCustomColor">
                      确认
                    </cal-button>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-lightest p-14 w-384">
          <div class="text-sm text-center mb-16">特殊主题</div>
          <a-row :gutter="20">
            <a-col
              v-for="(item, index) in theme.specials"
              :key="index"
              :span="24 / 2"
              class="justify-center flex mb-14"
            >
              <theme-item
                :text="item.content.text"
                :color="item.content.linearGradientColor"
                :linearGradient="false"
                @click="onSetThemeColor(item)"
              />
            </a-col>
          </a-row>
        </div>
        <div class="border-t border-gray-lightest px-14 pt-14 w-384">
          <div class="text-sm text-center mb-16">系统主题</div>
          <a-row :gutter="20">
            <a-col
              :span="24 / 3"
              v-for="(item, index) in theme.systems"
              :key="index"
              class="justify-center flex mb-14"
            >
              <theme-item
                :text="item.content.text"
                :color="item.content.color"
                @click="onSetThemeColor(item)"
              />
            </a-col>
          </a-row>
        </div>
      </div>
      <div class="footer py-24 text-center">
        <cal-button class="w-112" type="primary" @click="saveThemeColor">保存</cal-button>
      </div>
    </template>
    <slot></slot>
  </a-popover>
</template>
<script lang="ts" setup>
  import ThemeItem from './ThemeItem.vue'
  import CalButton from '~/CustomAntds/CalButton/index.vue'
  import ColorFulPickr from '~/Bases/ColorFulPickr/index.vue'
  import { useStore } from 'vuex'
  import { computed, defineProps, ref, watchEffect } from 'vue-demi'
  import { setThemeColor } from '@/utils'
  import { RECEVE_THEME_OPTION } from '@/store/types'
  import { message } from 'ant-design-vue'
  import { cloneDeep } from 'lodash'
  const store = useStore()
  const theme = computed(() => store.state.theme)
  const currentOption = ref(theme.value.option)
  // 自定义主体色
  const customColor = ref(theme.value.option.color)
  // 是否编辑自定义
  const editCustom = ref(false)

  /** 设置当前主题 */
  const onSetThemeColor = (option: typeof theme.value.systems[0]) => {
    currentOption.value = option.content
    setThemeColor(option.content)
  }
  /** 设置自定义主题 */
  const onSetCustomColor = () => {
    const baseThemeOption = cloneDeep(theme.value.systems[0])
    baseThemeOption.content.text = '自定义颜色'
    baseThemeOption.content.color = customColor.value
    onSetThemeColor(baseThemeOption)
    editCustom.value = false
  }
  /** 处理自定义框点击外部时切换隐藏 */
  const onClickAwayCustom = () => (editCustom.value = false)
  /** 保存主题配置 */
  const saveThemeColor = () => {
    store.commit(RECEVE_THEME_OPTION, currentOption.value)
    message.success('修改主体色成功!')
  }
</script>
<style lang="scss">
  .theme-popover {
    .ant-popover-inner-content {
      padding: 0 !important;
    }
    .ant-popover-inner {
      @apply rounded-2xl;
    }
    .header {
      .save-button {
        @media (min-height: 600px) {
          display: none;
        }
        @media (max-height: 600px) {
          display: inline-block;
        }
      }
    }
    .warp {
      @media (min-height: 600px) {
        flex-direction: column;
      }
      @media (max-height: 600px) {
        flex-direction: row;
      }
    }
    .footer {
      @media (max-height: 600px) {
        display: none;
      }
    }
  }
</style>
