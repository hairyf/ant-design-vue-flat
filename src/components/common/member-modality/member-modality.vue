<!--
 * @Author: Mr.ji
 * @Date: 2021-03-19 16:28:00
 * @LastEditTime: 2021-05-10 15:13:24
 * @Description: 会员的模态框
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="member-modality">
    <!-- 会员标签 -->
    <el-dialog title="会员标签" v-model="state.label" width="550px">
      <el-card shadow="never" class="box-card">
        <template #header>
          <div class="card-header">
            <el-input class="member-serach" v-model="input" placeholder="请输入标签名称">
              <template #suffix> <i class="el-icon-search el-input__icon"> </i> </template
            ></el-input>
          </div>
        </template>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="date" label="标签名称"><span>标签名称</span></el-table-column>
        </el-table>
      </el-card>
      <template #footer>
        <div>
          <span class="member-mode-text">标签设置</span>
        </div>
        <div class="footer-right">
          <el-button size="mini" @click="state.label = false">取消</el-button>
          <el-button size="mini" type="primary" @click="getClose(0)">确定</el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 会员等级 -->
    <el-dialog title="会员等级" v-model="state.grade" width="550px">
      <el-card shadow="never" class="box-card">
        <template #header>
          <div class="card-header">
            <el-input class="member-serach" v-model="input" placeholder="请输入标签名称">
              <template #suffix> <i class="el-icon-search el-input__icon"> </i> </template
            ></el-input>
          </div>
        </template>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="date" label="标签名称"><span>等级名称</span></el-table-column>
          <el-table-column prop="date" label="权益"><span>7折</span></el-table-column>
        </el-table>
      </el-card>
      <template #footer>
        <div>
          <span class="member-mode-text">标签设置</span>
        </div>
        <div class="footer-right">
          <el-button size="mini" @click="state.grade = false">取消</el-button>
          <el-button size="mini" type="primary" @click="getClose(1)">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
  import { defineProps, defineEmit, computed, reactive, ref } from 'vue'
  const props = defineProps({
    state: Object as any,
    rowData: Object as any
  })
  const input = ref('')
  // 模态框的显示与隐藏
  const state = computed({
    get: () => props.state,
    set: () => emit('update:state', false)
  })
  const tableData = reactive([
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
    }
  ])
  const getClose = (num: number) => {
    switch (num) {
      case 0:
        state.value.label = false
        break
      case 1:
        state.value.grade = false
        break
    }
  }
  const emit = defineEmit()
</script>
<style lang="scss">
  .member-modality {
    .el-card {
      border: none;
      .el-card__header {
        padding: 0;
        border: none;
      }
    }
    .el-table__row > td {
      border: none;
    }
    .card-header {
      display: flex;
      justify-content: flex-end;
    }
    .member-serach {
      width: 180px;
    }
    .el-dialog__body {
      padding-bottom: 0;
    }
    .el-dialog__footer {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .footer-right {
      .el-button {
        width: 100px;
      }
    }
    .member-mode-text {
      transform: translateY(-2px);
      font-size: 12px;
      color: var(--color-primary-light-2);
    }
  }
</style>
