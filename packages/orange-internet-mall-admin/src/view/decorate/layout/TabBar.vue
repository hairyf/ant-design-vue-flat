<!--
 * @Author: Mr.Mao
 * @Date: 2021-03-15 18:58:08
 * @LastEditTime: 2021-05-11 19:51:56
 * @Description: 布局组件(顶部导航区)
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="oe-flex oe-row-between" style="width: 100%; position: relative">
    <div class="left oe-flex">
      <div class="back-shop">
        <i class="el-icon-arrow-left" style="color: #ffffff; cursor: pointer" />
        <span class="back-text" @click="router.back">返回我的店铺</span>
      </div>
      <div class="view-navi-list oe-flex">
        <div
          class="view-navi-item oe-flex oe-row-center"
          :class="{ 'is-active': currentType == item.type }"
          v-for="(item, index) in sidebarView"
          :key="index"
          @click="currentType = item.type"
        >
          <i class="icon-default" :class="[item.icon]"></i>
          <div class="text">{{ item.text }}</div>
        </div>
      </div>
    </div>
    <div class="center">
      <input
        v-model="decorateInfo.content.views[currentViewIndex].name"
        class="reset-input"
        :minlength="3"
        placeholder="请输入模板名称"
      />
      /
      <el-dropdown @command="currentViewIndex = $event">
        <span class="page-menus">
          <span class="oe-m-r-5">页面列表</span>
          <i class="el-icon-arrow-down" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="(v, i) in decorateInfo.content.views"
              :command="i"
              :key="i"
              :class="{ on: i === currentViewIndex }"
              class="oe-flex"
            >
              <div style="width: 150px">{{ v.name }}</div>
              <i
                @click.stop="delViewItem(i)"
                v-if="!v.preventDelete"
                class="ri-delete-bin-5-line"
              />
            </el-dropdown-item>
            <div class="dropdown-button-container">
              <el-button
                class="dropdown-button"
                icon="el-icon-plus"
                size="mini"
                @click="incViewItem"
              >
                新增空白页
              </el-button>
            </div>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="control oe-text-right">
      <el-link
        type="primary"
        class="control-text"
        :underline="false"
        href="javascript:;"
        @click="showChanneEdit = true"
      >
        编辑渠道({{ channelText || '暂无渠道' }})
      </el-link>
      <el-link
        type="primary"
        class="control-text"
        :underline="false"
        href="javascript:;"
        @click="saveDecorateInfo()"
      >
        保存模板
      </el-link>
      <el-popover placement="bottom" trigger="click">
        <template #reference>
          <el-link
            type="primary"
            class="control-text"
            :underline="false"
            href="javascript:;"
            @click="saveBrowseDecorate"
          >
            保存并预览
          </el-link>
        </template>
        <div class="oe-flex oe-row-center">
          <qr-code :text="browseQrcode" size="100" />
        </div>
      </el-popover>
      <el-dropdown>
        <el-button type="primary">发布</el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="releaseDecorate">发布</el-dropdown-item>
            <el-dropdown-item @click="showReleaseDialog = true">定时发布</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <teleport to="#app">
      <el-dialog title="提示" v-model="showReleaseDialog" width="30%">
        <div class="oe-m-t-30">
          <span>定时发布时间： </span>
          <el-date-picker v-model="releaseTime" type="datetime" placeholder="选择日期时间" />
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="showReleaseDialog = false">取 消</el-button>
            <el-button type="primary" @click="timingReleaseDecorate">确 定</el-button>
          </span>
        </template>
      </el-dialog>
      <edit-channel
        v-model="showChanneEdit"
        :id="decorateInfo.id"
        :channels="props.decorateInfo.shop_channel_code"
        :content="props.decorateInfo.content"
        @confirm="reloadPath"
      />
    </teleport>
  </div>
</template>
<script lang="ts" setup>
  import { reqDecorateBrowse, reqDecorateSave, reqShopDiyTemplate } from '@/api/shop'
  import { awaitPromise } from '@/utils'
  import { ref } from '@vue/reactivity'
  import { computed, defineEmit, defineProps, watch } from '@vue/runtime-core'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { cloneDeep } from 'lodash'
  import { nanoid } from 'nanoid'
  import { publish, subscribe } from 'pubsub-js'
  import { useRouter } from 'vue-router'
  import { defaultContentOption, defaultViewItemOtion } from '../config'
  const props = defineProps({
    type: String,
    decorateInfo: {
      type: Object as () => DecorateInfo<typeof defaultContentOption>,
      required: true
    },
    currentViewIndex: {
      type: Number,
      required: true
    }
  })
  const router = useRouter()
  const emit = defineEmit()
  const currentViewIndex = computed({
    get: () => props.currentViewIndex,
    set: (v) => emit('update:currentViewIndex', v)
  })
  const releaseTime = ref('')
  const browseQrcode = ref('')
  // 侧边栏菜单
  const sidebarView = ref([
    { type: 'Decoration', icon: 'ad-renovation', text: '装修' },
    { type: 'Style', icon: 'ad-template', text: '颜色风格' },
    { type: 'Advertisement', icon: 'ad-launch', text: '广告页' },
    { type: 'Recommend', icon: 'ad-style', text: '商品推荐' },
    { type: 'NaviAdmin', icon: 'ad-recommend', text: '导航管理' }
  ])
  // 多层model绑定数据
  const currentType = computed({
    get: () => props.type,
    set: (type) => emit('update:type', type)
  })

  // 是否弹出修改渠道
  const showChanneEdit = ref(false)
  // 当前渠道信息
  const channelText = computed(() => {
    return props.decorateInfo.shop_channel_code.join('|')
  })

  // 是否弹出定时发布
  const showReleaseDialog = ref(false)
  // 刷新页面
  const reloadPath = () => {
    location.reload()
  }
  // 保存模板消息|修改渠道信息
  const saveDecorateInfo = async (reset = false) => {
    if (!props.decorateInfo) return false
    await reqDecorateSave({
      id: props.decorateInfo.id,
      content: props.decorateInfo.content
    })
    ElMessage.success('保存成功!')
    if (!reset) return false
    showChanneEdit.value = false
    await awaitPromise(500)
    location.reload()
  }
  // 浏览模板
  const browseDecorateInfo = async () => {
    if (!props.decorateInfo) return false
    const { data } = await reqDecorateBrowse({
      type: 'browse',
      id: props.decorateInfo.id
    })
    browseQrcode.value = data.data
  }
  // 保存并浏览
  const saveBrowseDecorate = async () => {
    await saveDecorateInfo()
    await browseDecorateInfo()
  }
  // 发布模板(仅发布)
  const releaseDecorate = async () => {
    await ElMessageBox.confirm('确定发布该模板吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    await reqShopDiyTemplate({
      id: props.decorateInfo.id,
      is_publish_and_save: 1,
      content: props.decorateInfo.content,
      is_timing: 0
    })
    ElMessage.success('发布成功!')
  }
  // 发布模板(定时发布)
  const timingReleaseDecorate = async () => {
    await ElMessageBox.confirm('确定发布该模板吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    await reqShopDiyTemplate({
      id: props.decorateInfo.id,
      is_publish_and_save: 1,
      content: props.decorateInfo.content,
      is_timing: 1,
      time: '2021-05-05 12:00:00'
    })
    showReleaseDialog.value = false
    ElMessage.success('定时发布成功!')
  }

  // 删除选中页面
  const delViewItem = (index: number) => {
    currentViewIndex.value = index - 1
    props.decorateInfo.content.views.splice(index, 1)
  }
  // 新增空白页
  const incViewItem = () => {
    const newDefaultViewItemOtion = cloneDeep(defaultViewItemOtion)
    newDefaultViewItemOtion.id = nanoid(5)
    props.decorateInfo.content.views.push(newDefaultViewItemOtion)
    currentViewIndex.value = props.decorateInfo.content.views.length - 1
  }
  // 自定义菜单列表
  const viewMenu = computed(() => {
    return props.decorateInfo.content.views
      .filter((v) => v.id !== 'default')
      .map((v) => {
        return {
          type: 'shop',
          name: '自定义页面',
          label: v.name,
          value: {
            path: '/pages/baseTabBars/customPage',
            params: { id: v.id }
          }
        }
      })
  })
  /* 双向数据监听 */
  subscribe('notice-get-custom-views', () => {
    publish('custom-views', viewMenu.value)
  })
</script>
<style lang="scss" scoped>
  .back-shop {
    cursor: pointer;
  }
  .back-text {
    margin-left: 17.5px;
    font-size: 14px;
    color: #fff;
  }
  .center {
    position: absolute;
    left: 43%;
    color: #ffffff;
    font-size: 14px;
  }
  .reset-input {
    color: #8c8c8c;
    background: none;
    outline: none;
    border: none;
    text-align: right;
  }
  .page-menus {
    cursor: pointer;
  }
  .view-navi-list {
    margin-left: 60px;
    .view-navi-item {
      width: 60px;
      height: 60px;
      color: #ffffff;
      cursor: pointer;
      flex-direction: column;
      .icon-default {
        margin-bottom: 6px;
      }
      &.is-active {
        background-color: var(--color-primary);
      }
      .text {
        font-size: 12px;
      }
    }
  }
  .grey-container {
    padding: 6px 14px;
    margin-left: 28px;
    background-color: #463d33;
    border: 1px solid #ffffff;
    color: #fff;
    font-size: 14px;
  }
  .el-icon-edit {
    margin-left: 27px;
  }
  .ad-applets {
    margin-left: 14.5px;
  }
  .ad-official-account {
    margin-right: 25px;
  }
  .ad-html5 {
    margin: 0 6.5px;
  }
  .control-text {
    margin-right: 24px;
    :deep(.el-button) {
      padding: 0 21px;
      min-height: 24px;
    }
  }
  .dropdown-button-container {
    margin: 0 10px;
    margin-top: 25px;
  }
  :deep(.el-dropdown-menu__item) {
    &.on {
      background-color: var(--color-primary-light-opacity-8);
      color: var(--color-primary);
    }
  }
  .dropdown-button {
    width: 100%;
  }
</style>
