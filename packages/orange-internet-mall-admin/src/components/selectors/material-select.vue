<!--
 * @Author: Mr.Mao
 * @Date: 2021-03-19 17:02:58
 * @LastEditTime: 2021-05-14 10:15:13
 * @Description: 图片选择器
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-dialog
    v-model="show"
    :title="titleList[selectorType - 1]"
    custom-class="picture-picker"
    width="838px"
  >
    <div class="oe-flex oe-row-between picker-top">
      <div class="oe-flex">
        <el-upload
          class="custom-upload"
          :action="uploadUrl"
          :on-error="handError"
          :show-file-list="false"
          :headers="headers"
          :on-success="handSucces"
          :drag="true"
          :before-upload="beforeUpload"
          multiple
          :data="{ type: selectorType }"
          :accept="acceptList[selectorType - 1]"
        >
          <el-button type="primary" v-if="selectorType == 1"> 上传图片 </el-button>
          <el-button type="primary" v-if="selectorType == 3"> 添加视频 </el-button>
          <el-button type="primary" v-if="selectorType == 2"> 添加音频 </el-button>
        </el-upload>
        <div class="picker-tips" v-if="selectorType == 1">
          大小不要超过9.77M ，支持图片格式jpg/png/gif
        </div>
        <div class="picker-tips" v-if="selectorType == 2"> 音频大小不超过2M，支持音频格式mp3 </div>
        <div class="picker-tips" v-if="selectorType == 3"> 视频大小不超过50M，支持音频格式mp4 </div>
      </div>
      <el-input placeholder="请输入图片名称" v-model="imgTetx" class="search-inp">
        <template #suffix>
          <i
            class="el-input__icon el-icon-search"
            style="cursor: pointer"
            @click="getSearchBtn"
          ></i>
        </template>
      </el-input>
    </div>
    <div class="content-box">
      <el-aside>
        <!-- <el-button type="primary" plain>新增分组</el-button> -->
        <el-menu :default-active="currentIndex.toString()">
          <!-- <el-menu-item index="1" v-for="(item,index) in ">全部</el-menu-item> -->
          <el-menu-item
            :index="index"
            v-for="(item, index) in groupingList"
            :key="index"
            @click="getGrouping(index)"
          >
            <i
              class="ad-recovery delete-img"
              v-if="!(index == 0 || item.name == '未分组')"
              @click="getDelete(index)"
            ></i>
            <template #title>
              <div class="group-title">
                {{ item.name }}
              </div>
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <div class="content-right">
        <div class="picture-box">
          <div
            v-for="(item, index) in imgList"
            :key="index"
            class="picture-list"
            @click="selectItem(index)"
          >
            <div class="picture-img-box">
              <div class="mask-box">
                <div class="delete" @click.stop="getDeleteImg(item)">删除</div>
                <div v-if="item.select" class="select-box">
                  <img src="/custom-assets/images/order/check.png" class="select-box-img" alt="" />
                  <div class="select-box-tetx" @click.stop="item.select = false">取消选择</div>
                </div>
              </div>
              <!-- <el-image :src="item.path" fit="cover" alt="" class="picture-box-img" /> -->
              <el-image
                fit="cover"
                :src="item.path.url"
                v-if="selectorType == 1"
                class="picture-box-img"
              />
              <video :src="item.path.url" v-if="selectorType == 3" class="picture-box-img" />
              <audio :src="item.path.url" v-if="selectorType == 2" class="picture-box-img" />
            </div>
            <div class="picture-box-text">{{ item.name }}</div>
          </div>
          <el-empty class="oe-m-t-30" v-if="!imgList.length" description="暂无媒体信息" />
        </div>
        <!-- 分页 -->
        <div class="paging-box oe-flex oe-row-between">
          <div>已选择{{ selectIds.length }}张</div>
          <el-pagination
            layout="prev, pager, next"
            :page-size="15"
            :total="pagination.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagination.currentPage"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <template v-if="multiple" #footer>
      <span class="dialog-footer">
        <el-button @click="show = false">取消</el-button>
        <el-button type="primary" @click="getDetermine">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
  import { computed, defineEmit, ref, defineProps, reactive, watch, onMounted, toRefs } from 'vue'
  import { useMultipleSelect } from '@/hooks/use-multiple-select'
  import { usePagination } from '@/hooks/use-pagination'
  import { reqUploadMap, reqUploadList, reqDeleteGroup, reqdeleteUpload } from '@/api/common'
  import {
    ElDialog,
    ElMessageBox,
    ElInput,
    ElUpload,
    ElButton,
    ElImage,
    ElAside,
    ElMenu,
    ElMenuItem,
    ElMessage,
    ElPagination,
    ElLoading
  } from 'element-plus'
  import PubSub from 'pubsub-js'
  import { httpConfig } from '@/api/http.config'
  // 引入分页函数
  const { pagination, handleSizeChange, handleCurrentChange } = usePagination()
  const emit = defineEmit(['select', 'update:show', 'update:selectorType'])
  // 兼容外部组件实例
  // 多层model绑定数据
  const show = ref(true)
  const props = defineProps({
    // 是否多选
    multiple: {
      type: Boolean,
      default: true
    },
    // 1图片选择器 2音频选择器 3视频选择器
    selectorType: {
      type: Number,
      default: 1
    },
    clone: {
      type: Function
    }
  })
  const { multiple, selectorType } = toRefs(props)
  // 搜索
  const imgTetx = ref('')
  const loadingInstance = ref<any>()
  // 上传图片还是音频，视频
  const acceptList = ref(['.jpeg,.png,.jpg,.gif', '.mp3', '.mp4'])
  const titleList = ref(['图片选择器', '音频选择器', '视频选择器'])
  // 图片数据
  const imgList = ref<any[]>([])
  //当前分组的index
  const currentIndex = ref(0)
  // 选择图片
  const { selectItems, selectIds } = useMultipleSelect(imgList)
  // 分组
  const groupingList = ref<any[]>([])
  // 删除图片
  const getDeleteImg = async (item: any) => {
    // imgList.value[index].select = !imgList.value[index].select
    // const groupIdList = []
    // console.log(selectItems.value)
    // for (let i = 0; i < selectItems.value.length; i++) {
    //   groupIdList.push(selectItems.value[i].shop_upload_group_id)
    // }
    // console.log(groupIdList)
    await ElMessageBox.confirm('确认彻底删除该图片么？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    const { data } = await reqdeleteUpload({
      is_real: 0,
      delete_groups:
        groupingList.value[currentIndex.value].id == 0
          ? [item.shop_upload_group_id]
          : [groupingList.value[currentIndex.value].id],
      delete_ids: [item.id],
      type: selectorType.value
    })
    getImgList()
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
  }
  // 处理单项目选择
  const selectItem = (index: number) => {
    if (multiple.value) {
      imgList.value[index].select = !imgList.value[index].select
    } else {
      PubSub.publish('material-confirm', [imgList.value[index]])
      emit('select', [imgList.value[index]])
      show.value = false
    }
  }
  // 切换分组请求图片列表
  const getGrouping = (index: number) => {
    currentIndex.value = index
    pagination.currentPage = 1
    getImgList()
  }
  // 获取图片列表
  const getImgList = async () => {
    loadingInstance.value = ElLoading.service({
      background: 'rgba(0,0,0,0.1)',
      text: '加载中...',
      spinner: 'el-icon-loading'
    })
    const { data } = await reqUploadList({
      group_id: groupingList.value[currentIndex.value].id,
      page: pagination.currentPage,
      limit: 15,
      searchname: imgTetx.value,
      type: selectorType.value
    })
    imgList.value = data.data.list
    pagination.total = data.data.count
    imgList.value.forEach((item) => {
      item.select = false
    })
    loadingInstance.value.close()
  }
  // 搜索图片
  const getSearchBtn = () => {
    pagination.currentPage = 1
    getImgList()
  }
  // 确定按钮
  const getDetermine = () => {
    PubSub.publish('material-confirm', selectItems.value)
    emit('select', selectItems.value)
    show.value = false
  }
  // 获取分组
  const getGroupList = async (isRequest?: boolean) => {
    const { data } = await reqUploadMap({ need_default_list: 0, type: selectorType.value })
    if (data.code !== 0) return false
    // 分组数据
    groupingList.value = [{ id: 0, name: '全部' }, ...data.data.list]
    // 赋值默认第一个分组的数据
    if (!isRequest) getImgList()
  }
  getGroupList()
  // 图片上传成功
  const handSucces = (response: any) => {
    if (response.code == 0) getImgList()
    loadingInstance.value.close()
  }
  // 图片上传失败
  const handError = () => {
    loadingInstance.value.close()
  }
  // 上传图片的路径
  const uploadUrl = computed(() => {
    return groupingList.value[currentIndex.value]
      ? `${httpConfig['baseURL']}shop/upload/add/${groupingList.value[currentIndex.value].id}`
      : ''
  })
  // token
  const headers = httpConfig['headers']['common']
  // 上传限制

  const beforeUpload = (file: any) => {
    let typeLimit = 0
    if (selectorType.value == 1) {
      typeLimit = 10
    } else if (selectorType.value == 2) {
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

  watch([() => pagination.currentPage], () => getImgList())
  watch(show, (value) => {
    !value && PubSub.publish('material-clone')
    !value && props.clone?.()
  })
</script>
<style lang="scss" scoped>
  @import '@/style/mixin.scss';
  .picture-picker {
    min-width: 550px;
    .el-menu-item:focus {
      background-color: #fff;
    }
    .custom-upload {
      :deep(.el-upload-dragger) {
        border: none;
        width: 122px;
        height: 32px;
      }
    }
    .picker-top {
      padding: 10px 0;
      :deep(.el-button) {
        min-height: 32px;
        padding: 0 32px;
      }
      .el-input {
        width: 200px;
        height: 32px;
      }
      .picker-tips {
        margin-left: 9px;
        color: #8c8c8c;
        font-size: 12px;
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
    .content-box {
      display: flex;
      margin-top: 10px;
      :deep(.el-aside) {
        text-align: center;
        min-height: 498px;
        max-height: 600px;
        width: 176px !important;
      }
      .el-menu {
        border: none;
      }
      .el-button {
        min-height: 32px;
        padding: 0 32px;
        margin-bottom: 24px;
      }
      .el-menu-item {
        &.is-active {
          @include menu-active-instruct;
          background: var(--color-primary-light-9);
        }
      }
      .content-right {
        width: 100%;
        position: relative;
      }
      .paging-box {
        position: absolute;
        left: 24px;
        right: 0;
        bottom: 0;
      }
      .picture-box {
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 40px;
        .picture-list {
          cursor: pointer;
          margin-left: 22px;
        }
        .picture-box-img {
          width: 100px;
          height: 100px;
          border: 1px solid #d9d9d9;
          box-sizing: border-box;
          border-radius: 10px;
          &:hover {
            border: 1px solid var(--color-primary);
          }
        }
        .picture-box-text {
          width: 100px;
          text-align: center;
          margin-top: 10px;
          font-size: 12px;
          color: #000000;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .picture-img-box {
          position: relative;
          width: 100px;
          height: 100px;
          &:hover .delete {
            display: block;
          }
          .select-box {
            position: absolute;
            margin: 0 auto;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            border: 2px solid var(--color-primary);
            z-index: 1;
            border-radius: 9px;
            .select-box-tetx {
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              border: 1px solid #d9d9d9;
              width: 60px;
              height: 22px;
              line-height: 22px;
              text-align: center;
              font-size: 12px;
              color: #fff;
              border-radius: 2px;
            }
          }
          .select-box-img {
            position: absolute;
            right: -1px;
            top: -1px;
          }
          .delete {
            position: absolute;
            display: none;
            bottom: 0;
            left: 0;
            height: 32px;
            line-height: 32px;
            width: 100%;
            font-size: 12px;
            color: #fff;
            text-align: center;
            background: rgba(0, 0, 0, 0.5);
            border-radius: 0px 0px 10px 10px;
            z-index: 2;
          }
        }
      }
      .picture-box .picture-list:nth-child(n + 6) {
        margin-top: 24px;
      }
    }
    .dialog-footer {
      .el-button {
        min-height: 32px;
        padding: 0 42px;
      }
    }
  }
</style>
