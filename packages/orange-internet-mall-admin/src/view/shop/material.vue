<!--
 * @Author: Mr.Mao
 * @LastEditors: Pan.Yu.Lin
 * @Date: 2021-03-01 15:45:21
 * @Description: 素材中心
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-card shadow="never" class="custom-crad-container">
    <div class="header-container oe-flex oe-row-between">
      <el-tabs class="custom-tabs" v-model="currentTab">
        <el-tab-pane label="图片" name="1"></el-tab-pane>
        <el-tab-pane label="视频" name="3"></el-tab-pane>
        <el-tab-pane label="音频" name="2"></el-tab-pane>
        <!-- <el-tab-pane label="水印" :name="type"></el-tab-pane> -->
      </el-tabs>
      <el-input
        @keyup.enter="getSearchBtn"
        placeholder="请输入图标名称"
        v-model="fileText"
        class="search-inp"
      >
        <template #suffix>
          <i class="el-input__icon el-icon-search" style="cursor: pointer" @click="getSearchBtn" />
        </template>
      </el-input>
    </div>
    <el-container class="body-container">
      <div class="el-aside-box">
        <el-aside>
          <el-button type="primary" icon="el-icon-plus" @click="newGroupShow = true">
            新增分组</el-button
          >

          <el-menu :default-active="currentIndex.toString()">
            <el-menu-item
              @click="getGrouping(index)"
              :index="index"
              v-for="(item, index) in groupingList"
              :key="index"
            >
              <i
                class="ad-recovery delete-img"
                v-if="!(index == 0 || item.name == '未分组')"
                @click="getDelete(index)"
              />
              <template #title>
                <div class="group-title">
                  {{ item.name }}
                </div>
              </template>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <div class="capacity-container" v-if="isCapacity != 0">
          <div class="capacity-text oe-flex oe-row-between">
            <span class="tips">{{ currentCapacity }}M/{{ totalCapacity }}G</span>
            <el-link type="primary" @click="extendShow = true" href="javascript:;">扩展</el-link>
          </div>
          <el-progress
            :percentage="(currentCapacity / totalCapacity / 1024) * 100"
            :show-text="false"
          />
        </div>
        <div class="capacity-container" v-if="isCapacity == 0">
          <div class="capacity-text oe-flex oe-row-between">
            <span class="tips">已使用{{ currentCapacity }}M</span>
          </div>
        </div>
      </div>
      <el-main>
        <el-upload
          class="custom-upload"
          :action="uploadUrl"
          :on-error="handError"
          :show-file-list="false"
          :headers="headers"
          :on-success="handSucces"
          :data="carryData"
          :drag="true"
          multiple
          :before-upload="beforeUpload"
          :accept="acceptList[Number(currentTab) - 1]"
        >
          <template v-if="currentTab == '1'">
            <el-button type="primary" icon="el-icon-plus">添加图片</el-button>
            <div class="tips">
              可拖拽图片至此进行上传，图片大小不超过10M，支持图片格式jpg/png/gif
            </div>
          </template>
          <template v-if="currentTab == '3'">
            <el-button type="primary" icon="el-icon-plus">添加视频</el-button>
            <div class="tips"> 可拖拽视频至此进行上传，视频大小不超过50M，支持音频格式mp4 </div>
          </template>
          <template v-if="currentTab == '2'">
            <el-button type="primary" icon="el-icon-plus">添加音频</el-button>
            <div class="tips"> 可拖拽音频至此进行上传，音频大小不超过2M，支持音频格式mp3 </div>
          </template>
        </el-upload>
        <div class="material-list">
          <el-row>
            <el-col
              class="image-edit-item"
              :xs="4"
              :sm="4"
              :xl="3"
              v-for="(item, index) in list"
              :key="index"
              @click="item.select = !item.select"
            >
              <div class="image-edit-block">
                <div class="image-mark oe-flex oe-row-center" :class="{ on: item.select }">
                  <!-- <el-button :size="grid == 'xl' ? '' : 'mini'" plain @click.stop>裁剪</el-button> -->
                  <el-button
                    :size="grid == 'xl' ? '' : 'mini'"
                    type="primary"
                    @click.stop="viewPicture(item.path.url)"
                  >
                    查看
                  </el-button>
                  <i class="el-icon-check" />
                  <div class="foot-btns" v-if="item.select" @click="getDeletePicture(selectIds, 1)">
                    <i class="el-icon-delete" />
                    <span class="text">彻底删除</span>
                  </div>
                </div>
                <el-image fit="cover" :src="item.path.url" v-if="currentTab == '1'" />
                <video :src="item.path.url" controls="controls" v-if="currentTab == '3'" />
                <audio :src="item.path.url" v-if="currentTab == '2'" />
              </div>
              <div class="title">{{ item.name }}</div>
              <div class="tips">{{ formatUnix(item.updatetime) }}</div>
            </el-col>
          </el-row>
          <el-empty class="oe-m-t-30" description="暂无数据" v-if="!list.length" />
          <div class="control-container oe-flex oe-row-between">
            <div class="left-column">
              <el-checkbox v-model="isSelectAll"> 全选当前页 </el-checkbox>
              <el-link
                type="primary"
                href="javascript:;"
                @click="getDeletePicture(selectIds, 0)"
                :disabled="!selectIds.length"
              >
                删除
              </el-link>
              <el-link
                type="primary"
                href="javascript:;"
                :disabled="!selectIds.length"
                @click="mobileGrouping = true"
              >
                移动
              </el-link>
              <el-link
                type="primary"
                href="javascript:;"
                :disabled="!selectIds.length"
                @click="getDeletePicture(selectIds, 1)"
              >
                彻底删除
              </el-link>
            </div>
            <el-pagination
              class="right-column"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-sizes="pagination.pageSizes"
              :page-size="pagination.pageSize"
              background
              layout="total, prev, pager, next,sizes, jumper"
              :total="pagination.total"
              :current-page="pagination.currentPage"
            />
          </div>
        </div>
      </el-main>
    </el-container>
  </el-card>
  <el-dialog title="新增分组" v-model="newGroupShow" width="500px">
    <div class="oe-flex">
      <el-form :model="groupForm" ref="form" label-width="80px" :rules="rules">
        <el-form-item label="分组名称" prop="groupText">
          <el-input v-model="groupForm.groupText" style="width: 300px"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="newGroupShow = false">取 消</el-button>
        <el-button type="primary" @click="getAddGroup">确 定</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog title="移动" v-model="mobileGrouping" width="500px">
    <div class="oe-flex">
      <el-form :model="mobileGroup" ref="mobileForm" label-width="80px" :rules="rules">
        <el-form-item label="选择分组" prop="groupName">
          <el-select v-model="mobileGroup.groupName" clearable placeholder="请选择">
            <el-option
              v-for="item in groupingList"
              :key="item.name"
              :label="item.name"
              :value="item.id"
              :disabled="item.id == groupingList[currentIndex].id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="mobileGrouping = false">取 消</el-button>
        <el-button type="primary" @click="getMobile">确 定</el-button>
      </span>
    </template>
  </el-dialog>
  <extend v-model:show="extendShow" :mealData="mealData"> </extend>
  <div class="view-resources">
    <el-dialog v-model="viewShow" title="查看" width="580px">
      <el-image v-if="currentTab == '1'" fit="cover" :src="currentUrl"></el-image>
      <video v-if="currentTab == '3'" controls="controls" :src="currentUrl" />
      <audio v-if="currentTab == '2'" :src="currentUrl" controls="controls" />
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, ref, watch, computed } from 'vue'
  import { useMultipleSelect } from '@/hooks/use-multiple-select'
  import { useGridDetector } from '@/hooks/use-grid-detector'
  import {
    reqUploadGroup,
    reqUploadList,
    reqUploadMap,
    reqDeleteGroup,
    reqdeleteUpload,
    reqMoveAll,
    reqPackageList,
    reqContainerSize
  } from '@/api/common'
  import { usePagination } from '@/hooks/use-pagination'
  import { ElMessageBox, ElMessage, ElLoading } from 'element-plus'
  import extend from '@/components/common/extend.vue'
  import store from '@/store'
  import { formatUnix } from '@/utils'
  import { httpConfig } from '@/api/http.config'
  // 引入分页函数
  const { pagination, handleSizeChange, handleCurrentChange } = usePagination()
  const currentTab = ref('1')
  const form = ref()
  const mobileForm = ref()
  // 图片列表
  const list = ref<any[]>([])
  const { isSelectAll, selectIds, selectItems } = useMultipleSelect(list)
  const grid = useGridDetector()
  // 新增分组的模态框
  const newGroupShow = ref(false)
  // 新增分组的内容
  const groupForm = reactive({
    groupText: ''
  })
  // 移动分组
  const mobileGroup = reactive({
    groupName: ''
  })
  const viewShow = ref(false)
  const currentUrl = ref('')
  // 套餐列表
  const mealData = ref<any[]>([])
  // 是否展示容量限制
  const isCapacity = ref(0)
  // 扩展模态框
  const extendShow = ref(false)
  // 上传图片还是音频，视频
  const acceptList = ref(['.jpeg,.png,.jpg,.gif', '.mp3', '.mp4'])
  // 已用容量,mb单位
  const currentCapacity = ref<number>(0)
  // 总容量,g单位
  const totalCapacity = ref<number>(0)
  //当前分组的index
  const currentIndex = ref(0)
  // 分组列表
  const groupingList = ref<any[]>([])
  // 搜索内容
  const fileText = ref('')
  const loadingInstance = ref<any>()
  // 验证
  const rules = reactive({
    groupText: [{ required: true, message: '请输入分组内容', trigger: 'blur' }],
    groupName: [{ required: true, message: '请选择需要移动的分组', trigger: 'blur' }]
  })
  // 搜索文件列表
  const getSearchBtn = () => {
    pagination.currentPage = 1
    getImgList()
  }
  // 移动分组的的模态框
  const mobileGrouping = ref(false)
  // 移动分组的按钮
  const getMobile = async () => {
    mobileForm.value.validate((valid: boolean) => {
      if (valid) {
        getMobileGrouping()
      } else {
        return false
      }
    })
  }
  const getPackageList = async () => {
    // reqPackageList().then((res) => {
    //   mealData.value = res.data.data
    // })
    const { data } = await reqPackageList()
    mealData.value = data.data
  }

  // 移动分组请求
  const getMobileGrouping = async () => {
    const { data } = await reqMoveAll({
      old_group_id: groupingList.value[currentIndex.value].id,
      new_group_id: mobileGroup.groupName,
      move_ids: selectIds.value,
      type: currentTab.value
    })
    if (data.code == 0) {
      ElMessage.success('移动分组成功')
      mobileGrouping.value = false
      getImgList()
    }
  }
  // 新增分组的按钮
  const getAddGroup = () => {
    form.value.validate((valid: boolean) => {
      if (valid) {
        // 调起新增分组请求
        getReqGroup()
      } else {
        return false
      }
    })
  }
  // 切换分组请求图片列表
  const getGrouping = (index: number) => {
    currentIndex.value = index
    pagination.currentPage = 1
    getImgList()
  }
  // 新增分组
  const getReqGroup = async () => {
    const { data } = await reqUploadGroup({
      group_name: groupForm.groupText,
      type: currentTab.value
    })
    if (data.code == 0) {
      // 新增分组但是不请求图片列表接口
      getGroupList(true)
      groupForm.groupText = ''
      newGroupShow.value = false
      // 获取容量
      getCapacity()
    }
  }
  // 获取文件内容列表
  const getImgList = async () => {
    const { data } = await reqUploadList({
      group_id: groupingList.value[currentIndex.value].id,
      page: pagination.currentPage,
      limit: pagination.pageSize,
      searchname: fileText.value,
      type: currentTab.value
    })
    if (data.code == 0) {
      list.value = data.data.list
      pagination.total = data.data.count
      list.value.map((item) => {
        item.select = false
      })
    }
  }
  // 获取分组
  const getGroupList = async (isRequest?: boolean) => {
    const { data } = await reqUploadMap({ need_default_list: 0, type: currentTab.value })
    if (data.code == 0) {
      // 分组数据
      groupingList.value = [
        {
          id: 0,
          name: '全部'
        },
        ...data.data.list
      ]
      if (!isRequest) {
        // 赋值默认第一个分组的数据
        getImgList()
      }
    }
  }
  // 删除分组
  const getDelete = async (index: number) => {
    await ElMessageBox.confirm('确认删除该分组么？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    const { data } = await reqDeleteGroup({
      group_ids: [groupingList.value[index].id]
    })
    currentIndex.value = 0
    getGroupList()
    // 获取容量
    getCapacity()
  }
  // 删除文件或者彻底删除文件
  const getDeletePicture = async (id: any[], isReal: number) => {
    const groupIdList = []

    for (let i = 0; i < selectItems.value.length; i++) {
      groupIdList.push(selectItems.value[i].shop_upload_group_id)
    }
    await ElMessageBox.confirm('确认删除图片么？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    const { data } = await reqdeleteUpload({
      is_real: isReal,
      delete_groups:
        groupingList.value[currentIndex.value].id == 0
          ? groupIdList
          : [groupingList.value[currentIndex.value].id],
      delete_ids: id,
      type: currentTab.value
    })
    if (data.code == 0) {
      getImgList()
      // 获取容量
      getCapacity()
    }
  }
  // 图片上传失败
  const handError = () => {
    loadingInstance.value.close()
  }
  // 图片上传成功
  const handSucces = (response: any) => {
    if (response.code == 0) {
      loadingInstance.value.close()
      getImgList()
      // 获取容量
      getCapacity()
    }
  }
  // token
  const headers = httpConfig['headers']['common']
  // 获取容量接口
  const getCapacity = async () => {
    const { data } = await reqContainerSize({ shop_id: httpConfig.headers.common.shopid })
    isCapacity.value = data.data.capacity_switch
    currentCapacity.value = Number((data.data.used_container_size / 1024 / 1024).toFixed(2))
    totalCapacity.value = Number((data.data.container_size / 1024 / 1024 / 1024).toFixed(2))
  }
  // 上传文件的路径
  const uploadUrl = computed(() => {
    if (groupingList.value[currentIndex.value]) {
      return `${httpConfig.baseURL}shop/upload/add/${groupingList.value[currentIndex.value].id}`
    }
    return ''
  })
  // 上传限制
  const beforeUpload = (file: any) => {
    let typeLimit = 0
    if (currentTab.value == '1') {
      typeLimit = 10
    } else if (currentTab.value == '2') {
      typeLimit = 2
    } else {
      typeLimit = 50
    }
    const limitSize = file.size / 1024 / 1024 < typeLimit
    if (!limitSize) {
      ElMessage.error(`上传文件大小不能超过!${typeLimit}MB`)
    } else {
      loadingInstance.value = ElLoading.service({
        background: 'rgba(0,0,0,0.1)',
        text: '上传中...',
        spinner: 'el-icon-loading'
      })
    }
    return limitSize
  }
  // 上传携带的数据
  const carryData = computed(() => {
    return { type: currentTab.value }
  })
  // 查看大图
  const viewPicture = (url: any) => {
    currentUrl.value = url
    viewShow.value = true
  }
  // tab切换请求对应的分组
  watch(currentTab, () => {
    currentIndex.value = 0
    pagination.currentPage = 1
    getGroupList()
  })
  watch([() => pagination.currentPage, () => pagination.pageSize], () => getImgList())
  onMounted(() => {
    getGroupList()
    // 获取容量
    getCapacity()
    if (store.state.common.env != 'w7') {
      getPackageList()
    }
  })
</script>
<style lang="scss" scoped>
  @import '@/style/mixin.scss';
  .header-container {
    padding-bottom: 30px;
  }
  .custom-crad-container {
    > :deep(.el-card > .el-card__body) {
      display: flex;
      flex-direction: column;
    }
  }
  :deep(.el-tabs__header) {
    margin: 0;
  }
  .search-inp {
    width: 200px;
    line-height: 32px;
    :deep(.el-input__inner) {
      // background: #f5f5f5;
    }
  }
  .body-container {
    flex: 1;
    .el-main {
      position: relative;
      overflow: hidden;
      padding-top: 0;
      padding-right: 0;
    }
    .el-aside-box {
      position: relative;
      .capacity-container {
        padding: 30px 0;
        width: 144px;
        margin: auto;
        .capacity-text {
          margin-bottom: 5px;
        }
        .tips {
          font-size: 12px;
          color: #9d9d9d;
        }
      }
    }
    .el-aside {
      position: relative;
      max-height: 800px;
      min-height: 750px;
      width: 184px !important;
      background-color: #f9f9f9;

      .el-button {
        display: block;
        width: 80%;
        margin: 20px auto;
      }
      .el-menu {
        border: none;
      }
      .el-menu-item {
        &.is-active {
          @include menu-active-instruct;
          background: var(--color-primary-light-9);
        }
      }
    }
  }
  .custom-upload {
    .el-button {
      margin-top: 16px;
      margin-bottom: 10px;
    }
    .tips {
      font-size: 12px;
      color: #8c8c8c;
    }
    :deep(.el-upload) {
      display: block;
    }
    :deep(.el-upload-dragger) {
      height: 96px;
      width: auto;
      &:hover {
        background-color: var(--color-primary-light-8);
      }
    }
  }
  .image-edit-item {
    display: inline-block;
    margin-right: 25px;
    position: relative;
    margin-top: 24px;
    text-align: center;
    z-index: 5;
    border-radius: 10px;
    overflow: hidden;
    .foot-btns {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 32px;
      line-height: 32px;
      text-align: center;
      font-size: 12px;
      background: rgba(255, 255, 255, 0.5);
      i {
        margin-right: 7.5px;
      }
      i,
      span {
        color: #ffffff;
      }
    }
    .image-edit-block {
      width: 100%;
      height: 160px;
      border-radius: 10px;
      overflow: hidden;
      position: relative;
      margin-bottom: 12px;
    }

    .el-icon-check {
      display: none;
      position: absolute;
      right: 3px;
      top: 5px;
      color: #fff;
      z-index: 6;
    }
    .image-mark {
      position: absolute;
      cursor: pointer;
      width: 100%;
      height: 100%;
      overflow: hidden;
      left: 0;
      top: 0;
      z-index: 5;
      flex-direction: column;
      border-radius: 10px;
      &.on {
        background: rgba(0, 0, 0, 0.5);
        border: 1px solid var(--color-primary);
        box-sizing: border-box;
        &::after {
          content: '';
          width: 80px;
          height: 30px;
          position: absolute;
          top: 0px;
          right: -40px;
          background-color: var(--color-primary);
          transform: rotate(45deg);
        }
        .el-icon-check {
          display: inline;
        }
      }
      .el-button {
        display: none;
        margin: 3px 0 !important;
        @include self-lg-xl(width, 60px, 85px);
      }
      &:hover {
        background: rgba(0, 0, 0, 0.5);
        border: 1px solid var(--color-primary);
        box-sizing: border-box;
        .el-button {
          display: block;
        }
      }
    }
    .el-image,
    video,
    audio {
      height: 160px;
      width: 100%;
      margin: 0;
    }
    video {
      object-fit: fill;
    }
    .title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      @include self-font-size(14px);
      margin-bottom: 12px;
    }
    .tips {
      @include self-font-size(12px);
      color: #8c8c8c;
    }
  }
  .control-container {
    @include self-lg-xl(flex-direction, column, row);
    margin-top: 16px;
    width: 100%;
    position: absolute;
    bottom: 0;
    .el-link {
      margin-left: 14px;
    }
    .right-column {
      margin: 14px 0;
    }
  }
  .delete-img {
    float: right;
  }
  .group-title {
    width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .material-list {
    @include self-lg-xl(padding-bottom, 80px, 50px);
  }
  .dialog-footer {
    .el-button {
      min-height: 32px;
      padding: 0 45px;
      font-size: 14px;
    }
  }
  .view-resources {
    video,
    audio {
      display: block;
      margin: 0 auto;
      width: 500px;
      height: 500px;
    }
    video {
      object-fit: fill;
    }
    .el-image {
      display: block;
      margin: 0 auto;
      width: 500px;
      height: 500px;
    }
  }
  audio:focus {
    outline: none;
  }
  video:focus {
    outline: none;
  }
</style>
