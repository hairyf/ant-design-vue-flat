<!--
 * @Author: Mr.ji
 * @Date: 2021-03-19 16:28:00
 * @LastEditTime: 2021-03-24 09:10:52
 * @Description: 调整余额
 * @LastEditors: Mr.ji
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="store-share">
    <el-card shadow="never" class="custom-crad-container custom-card-page">
      <el-alert type="warning" :closable="false">
        <template v-slot:title>
          <div class="store-title"
            >分享设置选择默认时, 不需要设置分享链接,
            分享链接为手机端分享的当前页面链接(分销中心会用中心, 购物车等页面分享链接为店铺首页)
            分享设置选择自定义时,
            需要设置分享链接处商品详情页面的其他页面全部适用设置的分享链接</div
          >
        </template>
      </el-alert>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="分享方式">
          <el-radio-group v-model="form.resource">
            <el-radio label="分享当前页面"></el-radio>
            <el-radio label="分享指定页面"></el-radio>
          </el-radio-group>
          <p class="text-style"
            >用户使用微信分享把商城页面 “发送给朋友” 时, 分享当前所在商城页面链接</p
          >
        </el-form-item>
        <el-form-item class="max-width-item" label="分享标题">
          <el-input
            type="text"
            placeholder="请输入内容"
            v-model="text"
            maxlength="20"
            show-word-limit
            size="medium"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="max-width-item" label="分享图标(公众号/APP)">
          <el-upload action="#" list-type="picture-card" :auto-upload="false">
            <template #default>
              <i class="el-icon-plus"></i>
            </template>
            <template #file="{ file }">
              <div>
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                <span class="el-upload-list__item-actions">
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </template>
            <template #tip>
              <div class="el-upload__tip text-style"> 建议尺寸:200*200 </div>
            </template>
          </el-upload>
        </el-form-item>
        <!-- 分享图片 -->
        <el-form-item label="分享图片">
          <el-radio-group v-model="form.resource">
            <el-radio label="页面截图"></el-radio>
            <el-radio label="自定义图片"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="分享简介" class="max-width-item">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="never">
      <div class="set-footer">
        <el-button>取消</el-button>
        <el-button type="primary">保存</el-button>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
  import { ref, reactive } from 'vue'
  import { usePagination } from '@/hooks/use-pagination'
  // 引入分页函数
  const { pagination, handleSizeChange, handleCurrentChange } = usePagination()

  // 内容数据
  const tableList = ref([
    {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    },
    {
      date: '2016-05-04',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1517 弄'
    },
    {
      date: '2016-05-01',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1519 弄'
    },
    {
      date: '2016-05-03',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1516 弄'
    }
  ])
  // 输入框
  const input = ref('')
  const form = ref({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: ''
  })
  const text = ref('')
  // 分享图标 的 upLoad图片
  const handleRemove = (file: any) => {
    // console.log(file)
  }
  const disabled = ref(false)
</script>
<style lang="scss" scoped>
  .store-share {
    .card-header {
      display: flex;
      justify-content: space-between;
      .header-right {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 500px;
        .el-input {
          width: 200px;
          margin-right: 20px;
        }
      }
    }
    .pagination-right {
      float: right;
      margin-top: 120px;
    }
    .store-title {
      width: 500px;
    }
    .text-style {
      font-size: 12px;
      color: #8c8c8c;
    }
    :deep(.max-width-item) {
      max-width: 400px;
    }
    .set-footer {
      display: flex;
      justify-content: center;
      .el-button {
        width: 180px;
      }
    }
  }
</style>
