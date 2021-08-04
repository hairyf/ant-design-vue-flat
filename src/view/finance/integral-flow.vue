<!--
 * @Author: Mr.wang
 * @Date: 2021-03-19 14:45:41
 * @LastEditTime: 2021-05-11 09:42:12
 * @Description: 积分流水
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-card shadow="never" class="screen-box">
    <el-row :gutter="24" class="oe-flex">
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
        <div class="oe-flex is-grid">
          <div class="screen-text">会员信息</div>
          <el-input
            class="oe-flex-1"
            @input="getSearch"
            v-model="form.cruxName"
            placeholder="昵称/姓名/手机号"
          ></el-input>
        </div>
      </el-col>
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
        <div class="oe-flex is-grid">
          <div class="screen-text">会员等级</div>
          <el-select v-model="form.grade" placeholder="全部" class="oe-flex-1" clearable>
            <el-option label="全部" value=" "> </el-option>
            <el-option
              :label="item.level_name"
              :value="item.id"
              v-for="item in gradeList"
              :key="item.value"
            ></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
        <div class="oe-flex is-grid">
          <div class="screen-text">操作人</div>
          <el-select v-model="form.operator" placeholder="全部" class="oe-flex-1" clearable>
            <el-option label="全部" value=" "> </el-option>
            <el-option label="会员本人" value="1"> </el-option>
            <el-option label="其他角色" value="2"> </el-option>
            <el-option label="超管" value="3"> </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
        <div class="oe-flex is-grid">
          <div class="screen-text">操作时间</div>
          <el-date-picker
            class="oe-flex-1"
            v-model="form.waterTime"
            type="date"
            placeholder="选择时间"
          >
          </el-date-picker>
        </div>
      </el-col>
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
        <div class="oe-flex is-grid">
          <el-button type="primary" size="small" @click="getSearch">搜索</el-button>
          <div class="reset-text" @click="getEmpty">重置条件</div>
        </div>
      </el-col>
    </el-row>
  </el-card>
  <el-card shadow="never" class="flow-list custom-crad-container custom-card-page">
    <el-button type="primary" size="small" @click="exportReport">导出报表</el-button>
    <el-table class="revenue-list" :data="tableData" style="width: 100%">
      <template v-slot:empty>
        <el-empty class="oe-m-t-30" description="暂无积分流水" />
      </template>
      <el-table-column prop="date" label="会员" min-width="150">
        <template #default="scope">
          <div class="oe-flex">
            <el-image :src="scope.row.user.avatar" class="member-img" />
            <div>
              <div class="member-text">{{ scope.row.user.nickname }}</div>
              <el-image :src="scope.row.img_url" class="platform-img" />
            </div> </div
        ></template>
      </el-table-column>
      <el-table-column prop="name" label="会员等级" min-width="70">
        <template #default="scope">
          <div>{{ scope.row.user.current_shop_user_level_name }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="手机号" min-width="80">
        <template #default="scope">
          <div>{{ scope.row.user.mobile }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作人">
        <template #default="scope">
          <div v-if="scope.row.change_user_type == 1">本人</div>
          <div v-if="scope.row.change_user_type == 2">其他角色</div>
          <div v-if="scope.row.change_user_type == 3">超管</div>
        </template>
      </el-table-column>
      <el-table-column prop="createtime_text" label="时间" min-width="90"> </el-table-column>
      <el-table-column prop="address" label="积分变化">
        <template #default="scope">
          <div class="profit" v-if="scope.row.points_change >= 0">
            ¥{{ scope.row.points_change }}
          </div>
          <div class="expenditure" v-if="scope.row.points_change < 0">
            ¥{{ scope.row.points_change }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="当前积分">
        <template #default="scope">¥{{ scope.row.after_points }}</template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template #default="scope">
          <custom-button icon="ad-remarks" color="#FE6712" @click="getEdit(scope.row)"
            >备注
          </custom-button>
        </template>
      </el-table-column>
    </el-table>

    <el-col :lg="24" class="paging-box">
      <el-pagination
        class="e-grid"
        :page-sizes="pagination.pageSizes"
        :page-size="pagination.pageSize"
        background
        :current-page="pagination.currentPage"
        layout="total, prev, pager, next,sizes, jumper"
        :total="pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-col>
  </el-card>
  <!-- 备注 -->
  <el-dialog title="备注" v-model="show" width="447px" custom-class="remarks-box">
    {{ remark }}
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="show = false">取消</el-button>
        <el-button type="primary" @click="show = false">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue'
  import { ElMessage } from 'element-plus'
  import { usePagination } from '@/hooks/use-pagination'
  import { reqIntegralFlowLsit, reqIntegralExport } from '@/api/finance'
  import { reqGradeList, reqMembershipChannel } from '@/api/member'
  import dayjs from 'dayjs'
  // 引入分页函数
  const { pagination, handleSizeChange, handleCurrentChange } = usePagination()
  const form = ref({
    // 关键信息
    cruxName: '',
    // 会员等级
    grade: '',
    // 操作人
    operator: '',
    // 操作时间
    waterTime: ''
  })
  // 订单导出的条件
  const condition = ref({
    // 关键信息
    cruxName: '',
    // 会员等级
    grade: '',
    // 操作人
    operator: '',
    // 操作时间
    waterTime: ''
  })
  const gradeList = ref<any>([])
  const remark = ref('')
  const show = ref(false)
  // 来源
  const channelList = ref<any[]>([])
  //  列表数据
  const tableData = ref<any[]>([])
  // 查看备注
  const getEdit = (row: any) => {
    remark.value = row.remark
    show.value = true
  }
  // 重置按钮
  const getEmpty = () => {
    form.value.cruxName = ''
    form.value.grade = ''
    form.value.operator = ''
    form.value.waterTime = ''
    getSearch()
  }
  // 获取渠道
  reqMembershipChannel({ page: 1, limit: 100 }).then((res) => {
    channelList.value = res.data.data.data
  })

  // 获取会员
  reqGradeList({ page: 1, limit: 100 }).then((res) => {
    gradeList.value = res.data.data.data
  })
  // 搜索按钮
  const getSearch = () => {
    condition.value.cruxName = form.value.cruxName
    condition.value.grade = form.value.grade
    condition.value.operator = form.value.operator
    condition.value.waterTime = form.value.waterTime
    pagination.currentPage = 1
    getflowingWaterList()
  }
  watch([() => pagination.currentPage, () => pagination.pageSize], () => {
    getflowingWaterList()
  })
  // 获取积分流水列表
  const getflowingWaterList = async () => {
    let createtime = ''
    if (form.value.waterTime) {
      createtime = dayjs(form.value.waterTime).unix().toString()
    }
    const { data } = await reqIntegralFlowLsit({
      page: pagination.currentPage,
      limit: pagination.pageSize,
      search: {
        search: form.value.cruxName,
        current_shop_user_level_id: form.value.grade,
        change_user_type: form.value.operator,
        createtime
      }
    })
    pagination.total = data.data.total
    tableData.value = data.data.data
    for (let i = 0; i < tableData.value.length; i++) {
      for (let k = 0; k < channelList.value.length; k++) {
        if (tableData.value[i].user.user_channel_name == channelList.value[k].code) {
          tableData.value[i].img_url = channelList.value[k].img_url
        }
      }
    }
  }
  // 导出报表
  const exportReport = async () => {
    let createtime = ''
    if (condition.value.waterTime) {
      createtime = dayjs(condition.value.waterTime).unix().toString()
    }
    const { data } = await reqIntegralExport({
      page: pagination.currentPage,
      limit: pagination.pageSize,
      search: {
        search: condition.value.cruxName,
        current_shop_user_level_id: condition.value.grade,
        change_user_type: condition.value.operator,
        createtime
      }
    })
    if (tableData.value.length) {
      const blob = new Blob([data as any])
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', '积分流水报表.xlsx')
      document.body.appendChild(link)
      link.click()
    } else {
      ElMessage('暂无导出的数据！')
    }
  }
  onMounted(() => {
    getflowingWaterList()
  })
</script>
<style lang="scss" scoped>
  .screen-box {
    :deep(.el-card__body) {
      padding-bottom: 0;
    }
    .screen-text {
      font-size: 14px;
      color: #000;
      margin-right: 14px;
    }
    .is-grid {
      margin-bottom: 20px;
    }
    :deep(.el-button) {
      padding: 2px 40px;
    }
    .reset-text {
      cursor: pointer;
      font-size: 14px;
      color: var(--color-primary);
      margin-left: 28px;
    }
  }
  .flow-list {
    margin-top: 20px;
    :deep(.cell) {
      color: #000;
    }
    .profit {
      color: #1ad370;
    }
    .expenditure {
      color: #ff0000;
    }
    .paging-box {
      position: absolute;
      bottom: 20px;
      right: 20px;
    }
    .platform-img {
      margin-top: 5px;
      width: 15.75px;
      height: 15.75px;
    }
    .member-text {
      font-size: 12px;
      color: var(--color-primary);
    }
    .member-img {
      border-radius: 50%;
      width: 50px;
      height: 50px;
      margin-right: 10px;
    }
  }
  .dialog-footer {
    :deep(.el-button) {
      padding: 0 32px;
      min-height: 32px;
    }
  }
</style>
