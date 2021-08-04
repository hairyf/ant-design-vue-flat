<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-03-19 14:46:13
 * @LastEditTime: 2021-05-10 15:15:08
 * @Description: 新增商品参数
 * @LastEditors: Mr.wang
-->
<template>
  <div class="box-card">
    <el-card shadow="never" class="left-card custom-crad-container">
      <el-form :model="addruleForm" :rules="addrules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="商品参数名称" prop="name">
          <el-input
            type="text"
            class="w-percentage"
            v-model="addruleForm.name"
            maxlength="20"
            show-word-limit
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div class="table-box">
        <div class="custom-parameter">
          <div class="table-header-container">
            <div class="table-header oe-flex">
              <div style="flex: 5%"></div>
              <div style="flex: 45%">参数名称</div>
              <div style="flex: 45%">参数值</div>
              <div style="flex: 5%">操作</div>
            </div>
          </div>
          <nested-sort-table style="width: 100%" v-model="tableList">
            <template #item="{ item, index }">
              <div class="table-slot-item oe-flex">
                <div style="flex: 5%" class="oe-flex oe-row-center">
                  <i class="ad-tableIcon icon" />
                </div>
                <div style="flex: 45%">
                  <!-- 类型名称 -->
                  <el-input
                    maxlength="20"
                    show-word-limit
                    v-model="item.name"
                    placeholder="请输入参数名称"
                  />
                </div>
                <div style="flex: 45%">
                  <el-input v-model="item.value" placeholder="请输入参数值" />
                </div>
                <div style="flex: 5%">
                  <!-- 删除 -->
                  <el-button @click="delTableDate(item.id)" v-if="index != 0" type="text"
                    >删除</el-button
                  >
                </div>
              </div>
            </template>
          </nested-sort-table>
        </div>
        <div class="add-button">
          <el-button type="text" @click="pushTableDate">+ 新增参数</el-button>
        </div>
      </div>
      <div class="footer-button">
        <el-button size="small btn" type="primary" @click="addParams">保存</el-button>
        <el-button size="small btn" @click="router.push('parame')">取消</el-button>
      </div>
    </el-card>
    <el-card shadow="never" class="e-grid commodity-and-blue custom-crad-container">
      <div class="title">预览 </div>
      <div>
        <div class="picture-preview">
          <div class="goods-detail">
            <div class="detail-list">
              <div
                class="detail-item"
                :class="index == tableList.length - 1 ? 'border-hidn' : ''"
                v-for="(el, index) in tableList"
                :key="index"
              >
                <div class="detail-item-son left">{{ el.name }}</div>
                <div class="detail-item-son">{{ el.value }}</div>
              </div>
            </div>
          </div>
          <el-image src="/custom-assets/images/addgoods/add-goods-detail.png"></el-image>
        </div>
        <!-- <el-image src="/custom-assets/images/addgoods/add-goods-detail.png"></el-image> -->
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { reqGoodsParamList, reqGoodsParamGoodsIndex, reqGoodsParamAddEdit } from '@/api/commodity'
  import { ElMessage } from 'element-plus'
  import NestedSortTable from '@/components/nested-sort-table/nested-sort-table.vue'
  const route = useRoute()
  const router = useRouter()
  const addOrEdit: any = route.query.id
  // table列表
  const tableList = ref<any[]>([{ name: '', value: '' }])
  // 向table列表添加数据
  const pushTableDate = () => {
    tableList.value.unshift({
      name: '',
      value: ''
    })
  }
  // 删除table的数据
  const delTableDate = (id: any) => {
    const index = tableList.value.findIndex((item) => item.id == id)
    tableList.value.splice(index, 1)
  }
  // 提交数据
  const addruleForm = ref<any>({
    name: '',
    summarize: []
  })
  // 验证提交的数据
  const addrules = reactive({
    name: [
      { required: true, message: '请输入分组名称', trigger: 'blur' },
      { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
    ]
  })
  // 接口请求
  if (addOrEdit != undefined) {
    reqGoodsParamList({ id: addOrEdit }).then((res) => {
      const data = res.data.data.data[0]
      addruleForm.value.name = data.name
      tableList.value = data.summarize
    })
    // reqGoodsParamGoodsIndex({ id: addOrEdit }).then((res) => {
    //   console.log('参数index数据', res)
    // })
  } else {
    // console.log('新增')
  }
  // 新增
  const addParams = () => {
    if (addOrEdit != undefined) {
      addruleForm.value.id = addOrEdit
      addruleForm.value.summarize = tableList.value
      reqGoodsParamAddEdit(addruleForm.value).then((res) => {
        if (res.data.code == 0) {
          router.push('parame')
          ElMessage.success('编辑成功')
        } else {
          ElMessage.error({
            message: '服务端异常,添加失败',
            type: 'error'
          })
        }
      })
    } else {
      addruleForm.value.summarize = tableList.value
      // const arr: any = []
      // tableList.value.forEach((item) => {
      //   arr.push(item.id)
      // })
      // addruleForm.value.goodsId = arr
      // console.log(arr, '参数列表数据')
      reqGoodsParamAddEdit(addruleForm.value).then((res) => {
        if (res.data.code == 0) {
          router.push('parame')
          ElMessage.success('新增成功')
        } else {
          ElMessage.error({
            message: '服务端异常,添加失败',
            type: 'error'
          })
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  .e-grid {
    width: 20%;
    margin-bottom: 20px;
    :deep(.el-card) {
      width: 100%;
      height: 100%;
      .el-card__body {
        height: calc(100% - 40px);
      }
    }
    .title {
      font-size: 16px;
      font-weight: bold;
    }
  }
  .commodity-and-blue {
    .picture-preview {
      position: relative;
      width: 100%;
      height: 100%;
      margin-top: 40px;
      .goods-detail {
        position: absolute;
        top: 130px;
        left: 30px;
        width: 80%;
        height: 65%;
        color: #000;
        background-color: #fff;
        z-index: 3;
        .detail-list {
          .detail-item {
            display: flex;
            &.border-hidn {
              border-bottom: 1px solid #8c8c8c;
            }
            .detail-item-son {
              &.left {
                border-right: none;
              }
              width: 50%;
              height: 10px;
              padding: 9px 14px;
              border: 1px solid #8c8c8c;
              border-bottom: none;
              font-size: 12px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
      .el-image {
        width: 100%;
        height: 92%;
      }
    }
  }
  // .picture-preview {
  //   position: relative;
  //   width: 100%;
  //   height: 100%;
  //   .goods-detail {
  //     width: 100%;
  //     height: 65%;
  //     color: #8c8c8c;
  //     background-color: #fff;
  //     margin-top: 20px;
  //     .detail-list {
  //       .detail-item {
  //         display: flex;
  //         &.border-hidn {
  //           border-bottom: 1px solid #8c8c8c;
  //         }
  //         .detail-item-son {
  //           &.left {
  //             border-right: none;
  //           }
  //           width: 50%;
  //           height: 14px;
  //           padding: 9px 14px;
  //           border: 1px solid #8c8c8c;
  //           border-bottom: none;
  //           font-size: 12px;
  //           overflow: hidden;
  //           text-overflow: ellipsis;
  //           white-space: nowrap;
  //         }
  //       }
  //     }
  //   }
  //   .el-image {
  //     width: 100%;
  //     height: 92%;
  //   }
  // }
  .w-percentage {
    width: 55%;
  }
  :deep(.el-textarea__inner) {
    height: 90px;
  }
  .footer-button {
    margin-top: 45px;
    margin-left: 15px;
    .btn {
      width: 120px;
    }
  }
  .box-card {
    display: flex;
    .left-card {
      width: 80%;
      margin-right: 20px;
    }
    .right-card {
      .title {
        font-size: 16px;
        font-weight: bold;
      }
      width: 20%;
    }
  }
  .table-box {
    width: 98%;
    margin: 0 auto;
    border: solid 1px #d9d9d9;
    .table-icon {
      margin-left: 20px;
      color: var(--color-primary);
    }
    .add-button {
      display: flex;
      justify-content: center;
      padding: 10px 0;
    }
  }

  // 拖住样式
  .parameter-card {
    .title {
      font-weight: bold;
    }
  }
  .product-preview-card {
    .title {
      font-weight: bold;
    }
  }
  // 上传图片样式
  .upload-pictures-template {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    border: 1px dashed #d9d9d9;
    margin-right: 28px;
    &.commodity-detail {
      .text {
        width: 52px;
        line-height: 20px;
      }
    }
    .icon {
      font-size: 22px;
      color: var(--color-primary);
    }
    .text {
      font-size: 12px;
      color: #8c8c8c;
      line-height: 30px;
    }
  }
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
    border-bottom: 1px solid #d9d9d9;
    .el-input {
      width: 80%;
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
    border: 1px dashed #d9d9d9;
    box-sizing: border-box;
    color: #8c8c8c;
    font-size: 10px;
  }
</style>
