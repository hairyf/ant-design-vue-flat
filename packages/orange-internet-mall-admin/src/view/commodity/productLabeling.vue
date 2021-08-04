<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-03-19 14:46:13
 * @LastEditTime: 2021-04-30 10:50:55
 * @Description: 商品标签
 * @LastEditors: Mr.Mao
-->
<template>
  <el-card shadow="never" class="custom-crad-container">
    <div class="oe-m-b-20 title-button">
      <el-button class="size" size="mini" type="primary" @click="jumpEditClassification()">
        <span>编辑标签</span>
      </el-button>
    </div>
    <div class="table-header-container">
      <div class="table-header oe-flex">
        <div style="flex: 5%"></div>
        <div style="flex: 35%">标签名称</div>
        <div style="flex: 10%">状态</div>
        <div style="flex: 10%">商品数</div>
        <div style="flex: 15%">新增时间</div>
        <div style="flex: 15%">操作</div>
      </div>
    </div>
    <nested-sort-table style="width: 100%" v-model="tableList">
      <template #item="{ nestedIndex, item }">
        <div class="table-slot-item oe-flex">
          <div style="flex: 5%" class="oe-flex oe-row-between">
            <i class="ad-tableIcon icon" />
            <i
              v-if="nestedIndex < 2 && item.children?.length"
              @click="item.hideChildren = !item.hideChildren"
              class="el-icon-caret-bottom hide-icon oe-m-r-10"
              :class="{ hide: item.hideChildren }"
            />
          </div>
          <div style="flex: 35%">
            <!-- 树形指标 -->
            <i
              v-if="nestedIndex"
              class="ad-Frame1 oe-m-r-14"
              :style="{ marginLeft: nestedIndex == 1 ? 0 : nestedIndex * 20 + 'px' }"
            />
            <!-- 类型名称 -->
            <span>{{ item.name }}</span>
            <!-- <span v-if="item.isNameShow" @click="item.isNameShow = !item.isNameShow">{{
              item.name
            }}</span>
            <el-input
              v-else
              @change="item.isNameShow = !item.isNameShow"
              @blur="item.isNameShow = !item.isNameShow"
              v-model="item.name"
              v-focus
              placeholder="请输入名称"
              maxlength="10"
              show-word-limit
            /> -->
          </div>
          <div style="flex: 10%">
            <!-- 上传组件 -->
            <el-link href="javascript:;" :type="item.status == 1 ? 'success' : 'danger'">
              {{ item.status == 1 ? '显示' : '隐藏' }}
            </el-link>
          </div>
          <div style="flex: 10%">
            <!-- 显示与隐藏 -->
            <span>{{ item.num }}</span>
          </div>
          <div style="flex: 15%">
            <!-- 显示与隐藏 -->
            <span>{{ formatUnix(item.createtime) }}</span>
          </div>
          <div style="flex: 15%">
            <div class="edit oe-flex">
              <!-- <el-button
                type="primary"
                @click="jumpEditClassification(item.id)"
                size="mini"
                icon="ad-edit"
                >编辑</el-button
              > -->
              <custom-button
                icon="ad-delete"
                @click="delClassification(item.id)"
                color="#FF0000"
                class="public-move-left oe-m-l-0"
                >删除</custom-button
              >
            </div>
          </div>
        </div>
      </template>
    </nested-sort-table>
    <el-empty class="oe-m-t-30" v-if="!tableList.length" description="暂无商品标签" />
  </el-card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { reqGoodsGoodsTabList, reqGoodsGoodsTabDel } from '@/api/commodity'
  import { ElMessageBox, ElMessage } from 'element-plus'
  import NestedSortTable from '@/components/nested-sort-table/nested-sort-table.vue'
  import { formatUnix } from '@/utils'
  const tableList = ref<any[]>([])

  // 跳转编辑分类页面
  const router = useRouter()
  const jumpEditClassification = (id?: Key) => {
    router.push({ path: '/commodity/addProductLabeling', query: { id } })
  }
  // 递归增加数据
  function addAttribute(arr: any) {
    arr.forEach((item: any) => {
      if (item.children) {
        item.isNameShow = true
        item.hideChildren = false
        addAttribute(item.children)
      } else {
        item.isNameShow = true
        item.hideChildren = false
      }
    })
    return
  }
  // 请求接口
  // 获取商品分类列表
  const getProduct = async () => {
    const { data } = await reqGoodsGoodsTabList()
    tableList.value = data.data.data
    addAttribute(tableList.value)
  }
  getProduct()
  // 删除分类
  const delClassification = (id: string | number) => {
    ElMessageBox.confirm('此操作将永久删除该标签, 是否继续?', '删除标签', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      reqGoodsGoodsTabDel({ del_datas: id }).then((res) => {
        if (res.data.code == 0) {
          ElMessage({
            type: 'success',
            message: '删除成功!'
          })
          getProduct()
        } else {
          ElMessage({
            type: 'error',
            message: '删除失败!'
          })
        }
      })
    })
  }
</script>

<style lang="scss" scoped>
  @import '@/style/mixin.scss';

  .table-header {
    padding: 10px 0;
    font-size: 14px;
    border-bottom: solid 1px #d9d9d9;
  }
  .table-content {
    height: 488px !important;
  }
  .table-slot-item {
    height: 70px;
    align-items: center;
    font-size: 14px;
    .el-input {
      width: auto;
    }
    .icon {
      color: var(--color-primary);
    }
    .hide-icon {
      cursor: pointer;
      font-size: 20px;
      color: var(--color-primary);
      transition: 0.3s;
      transform: rotate(0);
      &.hide {
        transform: rotate(-90deg);
      }
    }
  }
  .table-upload-image {
    text-align: center;
    line-height: 28px;
    width: 32px;
    height: 32px;
    background-color: #d9d9d9;
    box-sizing: border-box;
    color: #8c8c8c;
    font-size: 10px;
    .avatar {
      width: 100%;
      height: 100%;
    }
  }
  // 自己页面的样式
  .edit {
    margin-bottom: 10px;
    :deep(.el-button) {
      display: flex;
      align-items: center;
      font-size: 12px;
      padding: 2px 8px;
      min-height: 24px;
      border-radius: 2px;
      margin-left: 14px;
      i {
        padding-right: 3px;
      }
    }
  }
  .title-button {
    .el-button {
      width: 114px;
      font-size: 14px;
    }
  }
</style>
