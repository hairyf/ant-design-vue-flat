<!--
 * @Author: Mr.ji
 * @Date: 2021-03-19 16:28:00
 * @LastEditTime: 2021-05-07 09:44:06
 * @Description: 会员的模态框
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="member-modality">
    <!-- 会员等级 -->
    <el-dialog title="会员等级" v-model="show" width="450px">
      <div class="card-header">
        <el-input class="member-serach" v-model="inputText" placeholder="请输入等级名称">
          <template #suffix>
            <i class="el-icon-search el-input__icon" style="cursor: pointer" @click="getList()">
            </i> </template
        ></el-input>
      </div>
      <el-radio-group v-model="currentSelectId" style="width: 100%">
        <el-table
          @selection-change="handlSelectAll"
          :data="gradeList"
          style="width: 100%"
          height="450"
        >
          <el-table-column label="等级名称">
            <template #default="scope">
              <el-radio :label="scope.row.id">{{ scope.row.level_name }}</el-radio>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="level_name" label="等级名称"></el-table-column> -->
          <el-table-column prop="discount" label="权益">
            <template #default="scope">
              <div v-if="scope.row.discount == 0">无</div>
              <div v-else>{{ scope.row.discount / 10 }}折</div>
            </template>
          </el-table-column>
        </el-table>
      </el-radio-group>
      <template #footer>
        <div class="oe-flex oe-row-between footer-box">
          <div>
            <span class="member-mode-text" @click="router.push('/member/grade')">等级设置</span>
          </div>
          <div class="footer-right">
            <el-button size="mini" @click="show = false">取消</el-button>
            <el-button size="mini" type="primary" @click="determineBtn">确定</el-button>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { ElMessage } from 'element-plus'
  import { defineProps, defineEmit, computed, reactive, ref, watch } from 'vue'
  import { reqBatchIncreaseGrade, reqChangeGrade, reqGradeList } from '@/api/member'
  const router = useRouter()
  const props = defineProps({
    show: {
      type: Boolean,
      required: true
    },
    currentGrade: {
      type: Object,
      required: true
    },
    currentItem: {
      type: Object,
      required: true
    },
    isBatch: {
      type: Boolean,
      required: true
    },
    selectList: {
      type: Array as () => any[]
    }
  })
  const emit = defineEmit()
  // 当前选中的id
  const currentSelectId = ref('')
  // 搜索框
  const inputText = ref('')
  const gradeList = ref<any[]>([])
  const handlSelectAll = (selectList: any) => {}
  //
  const determineBtn = async () => {
    if (!props.isBatch) {
      await reqChangeGrade({ id: props.currentItem.id, level_id: currentSelectId.value })
    } else {
      const ids = [] as any[]
      props.selectList?.forEach((item: any) => ids.push(item.id))
      await reqBatchIncreaseGrade({ ids, level_id: currentSelectId.value })
    }
    emit('resetManagementList')
    emit('getGradeList')
    ElMessage.success('操作成功!!')
    show.value = false
  }
  // 获取等级列表
  const getList = () => {
    const option = { page: 1, limit: 100, search: '' }
    const search = JSON.stringify({
      level_name: inputText.value,
      status: '1'
    })
    option.search = search
    // 获取等级列表
    reqGradeList(option).then((res) => {
      gradeList.value = res.data.data.data
    })
  }
  watch(props, () => {
    if (props.show) {
      getList()
      if (!props.isBatch) currentSelectId.value = props.currentGrade.level_id
    }
  })
  // 多层model绑定数据
  const show = computed({
    get: () => props.show,
    set: () => emit('update:show')
  })
</script>
<style lang="scss" scoped>
  .member-modality {
    :deep(.el-dialog) {
      min-width: 550px;
      .el-dialog__body {
        padding-bottom: 0;
      }
      .el-dialog__footer {
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    }
    :deep(.el-card) {
      border: none;
      .el-card__header {
        padding: 0;
        border: none;
      }
    }
    :deep(.el-table__row) > td {
      border: none;
    }
    .card-header {
      display: flex;
      justify-content: flex-end;
    }
    .member-serach {
      width: 180px;
    }
    .footer-box {
      width: 100%;
    }
    .footer-right {
      .el-button {
        width: 100px;
      }
    }
    .member-mode-text {
      cursor: pointer;
      transform: translateY(-2px);
      font-size: 12px;
      color: var(--color-primary-light-2);
    }
  }
</style>
