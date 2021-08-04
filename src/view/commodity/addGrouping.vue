<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-03-19 14:46:13
 * @LastEditTime: 2021-05-10 15:14:51
 * @Description: 新增分组
 * @LastEditors: Mr.wang
-->
<template>
  <div class="box-card">
    <el-card shadow="never" class="left-card custom-crad-container">
      <el-form :model="addruleForm" :rules="addrules" label-width="80px" class="demo-ruleForm">
        <el-form-item label="分组名称" prop="name">
          <el-input
            type="text"
            class="w-percentage"
            v-model="addruleForm.name"
            maxlength="20"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <!-- <el-form-item label="分组状态">
          <el-switch
            v-model="addruleForm.type"
            active-value="1"
            inactive-value="2"
            active-color="#13ce66"
            inactive-color="#8C8C8C"
          >
          </el-switch>
        </el-form-item> -->
        <el-form-item label="概述">
          <el-input
            type="textarea"
            class="w-percentage"
            placeholder="请输入分组简介内容"
            v-model="addruleForm.summarize"
            maxlength="140"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <!-- <el-form-item label="商品排序">
          <el-select v-model="addruleForm.sort" class="w-percentage" placeholder="请选择">
            <el-option
              v-for="item in sortOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="商品关联">
          <div class="table-box">
            <el-table :data="tableList">
              <el-table-column prop="name" label="商品名称">
                <template #default="scope">
                  <div class="table-name">
                    <div class="image-box">
                      <el-image :src="scope.row.main_picture"></el-image>
                    </div>
                    <div>{{ scope.row.label }}</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="商品价格">
                <template #default="scope">
                  <span><span>¥</span>{{ scope.row.price }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="address" label="操作" width="100">
                <template #default="scope">
                  <el-button type="text" @click="replaceTableDate(scope.row.id)">替换</el-button>
                  <el-button type="text" @click="delTableDate(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="add-button">
              <el-button type="text" @click="addTableDate">+ 添加</el-button>
            </div>
          </div>
        </el-form-item> -->
      </el-form>
      <div class="footer-button">
        <el-button size="small btn" type="primary" @click="addCommodity">保存</el-button>
        <el-button size="small btn" @click="router.push('grouping')">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { ElMessage } from 'element-plus'
  import { reqGoodsGroupAddEdit, reqGoodsGroupList } from '@/api/commodity'
  import { LinkSelect } from '@/components/selectors'
  const route = useRoute()
  const router = useRouter()
  const addOrEdit: any = route.query.id
  // 是否弹出商品选择器
  // 新添加
  const addTableDate = async () => {
    const res = await LinkSelect({
      option: { commodity: true }
    })
    if (tableList.value.length > 0) {
      const isAdd = tableList.value.every((item: any) => item.id != res.value.data.id)
      if (isAdd) {
        tableList.value.push(res.value.data)
      } else {
        ElMessage.error('已有此商品')
      }
    } else {
      tableList.value.push(res.value.data)
    }
  }

  // 替换存临时id函数
  const replaceTableDate = async (productId?: Key) => {
    const res = await LinkSelect({
      option: { commodity: true }
    })

    const isAdd = tableList.value.every((item: any) => item.id != res.value.data.id)
    if (isAdd) {
      const index = tableList.value.findIndex((item: any) => item.id == productId)
      tableList.value.splice(index, 1, res.value.data)
    } else {
      ElMessage.error('已有此商品')
    }
  }
  // table列表
  const tableList = ref<any[]>([])

  // 删除table的数据
  const delTableDate = (id: any) => {
    const index = tableList.value.findIndex((item) => item.id == id)
    tableList.value.splice(index, 1)
  }
  // 提交数据
  const addruleForm = reactive({
    name: '',
    summarize: '',
    id: ''
    // type: '1',
    // sort: 0,
    // goodsIds: [],
  })
  // 排序数据
  const sortOptions = ref([
    {
      value: 0,
      label: '默认 '
    },
    {
      value: 1,
      label: '新增时间升序'
    },
    {
      value: 2,
      label: '新增时间降序'
    },
    {
      value: 3,
      label: '浏览量降序'
    },
    {
      value: 4,
      label: '销量降序'
    }
  ])
  // 验证提交的数据
  const addrules = reactive({
    name: [
      { required: true, message: '请输入分组名称', trigger: 'blur' },
      { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
    ]
  })
  // 接口请求
  if (addOrEdit != undefined) {
    // console.log('编辑')
    reqGoodsGroupList({ id: addOrEdit }).then((res) => {
      // console.log(res)
      const data = res.data.data.data[0]
      const arrGoods = data.goods
      // console.log('编辑数据', data)
      addruleForm.name = data.name
      addruleForm.summarize = data.summarize
      // addruleForm.type = data.type
      // addruleForm.sort = data.sort
      //  reactive({
      //   name: data.name,
      //   type: data.type,
      //   summarize: data.summarize,
      //   sort: data.sort,
      //   goodsIds: [],
      //   id: ''
      // })
      // console.log(addruleForm, '显示不唠')
      arrGoods.forEach((item: any) => {
        tableList.value.push({
          label: item.title,
          image: item.video_cover,
          value: item.id,
          price: item.price
        })
      })
    })
  } else {
  }
  // 新增or编辑商品
  const addCommodity = () => {
    // if (tableList.value.length != 0) {
    //   const arr: any = []
    //   tableList.value.forEach((item) => {
    //     arr.push(item.value)
    //   })
    //   addruleForm.goodsIds = arr
    // }
    if (addOrEdit != undefined) {
      addruleForm.id = addOrEdit
      reqGoodsGroupAddEdit(addruleForm).then((res) => {
        if (res.data.code == 0) {
          router.push('grouping')
          ElMessage.success('编辑成功')
        } else {
          ElMessage.error({
            message: '服务端异常,添加失败',
            type: 'error'
          })
        }
      })
    } else {
      reqGoodsGroupAddEdit(addruleForm).then((res) => {
        if (res.data.code == 0) {
          router.push('grouping')
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
  .w-percentage {
    width: 55%;
  }
  :deep(.el-textarea__inner) {
    height: 90px;
  }
  .footer-button {
    margin-left: 80px;
    margin-top: 45px;
    .btn {
      width: 120px;
    }
  }
  .box-card {
    display: flex;
    .left-card {
      width: 100%;
      margin-right: 20px;
    }
    .right-card {
      width: 20%;
    }
  }
  // table列表
  .table-box {
    width: 55%;
    border: 1px solid #d9d9d9;
    .table-name {
      display: flex;
      align-items: center;
      .image-box {
        width: 32px;
        height: 32px;
        background-color: #c4c4c4;
        margin-right: 14px;
      }
    }
    .add-button {
      display: flex;
      justify-content: center;
      padding: 10px 0;
    }
  }
</style>
