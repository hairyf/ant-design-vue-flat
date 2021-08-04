<!--
 * @Author: Mr.wang
 * @Date: 2021-03-19 14:45:41
 * @LastEditTime: 2021-05-13 18:17:03
 * @Description: 评价详情
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-card shadow="never" class="details-box">
    <div class="details-title">评价详情</div>
    <div class="details-box-information">
      <div class="public-box oe-flex">
        <span class="information-size1">订单编号</span>
        <span class="order-quantity information-size1">{{ evaluationDetails.order_sn }}</span>
      </div>
      <div class="order-information">
        <div class="public-box oe-flex">
          <div class="information-size1">商品</div>
          <el-image :src="evaluationDetails.goods_image" fit="cover" class="order-img" alt="" />
          <div>
            <div
              class="order-title theme-text information-size1"
              @click="
                router.push({
                  path: '/commodity/admin',
                  query: {
                    title: evaluationDetails.goods_name
                  }
                })
              "
              >{{ evaluationDetails.goods_name }}</div
            >
            <el-tag
              size="mini"
              color="#D4EBFF"
              style="color: #55adff"
              v-if="evaluationDetails.goods_type == '2'"
              >虚拟</el-tag
            >
            <el-tag
              size="mini"
              color="#FBDDD1"
              style="color: #ec672e"
              v-if="evaluationDetails.goods_type == '3'"
              >卡密</el-tag
            >
            <el-tag
              size="mini"
              color="#E4FFF8"
              style="color: #1ad370"
              v-if="evaluationDetails.goods_type == '1'"
              >实体</el-tag
            >
            <el-tag
              size="mini"
              color="#F4DFD3"
              style="color: #ef864c"
              v-if="evaluationDetails.goods_type == '4'"
              >计时/次</el-tag
            >
            <el-tag
              size="mini"
              color="#F8E8CF"
              style="color: #dd8a0d"
              v-if="evaluationDetails.goods_type == '5'"
              >预约</el-tag
            >
            <el-tag
              size="mini"
              color="#E9D4F9"
              style="color: #8f29df"
              v-if="evaluationDetails.goods_type == '6'"
              >批发</el-tag
            >
          </div>
        </div>
        <div class="public-box oe-flex">
          <div class="information-size1">用户</div>
          <div
            @click="
              router.push({
                path: '/member/member-details',
                query: {
                  id: evaluationDetails.user_id
                }
              })
            "
            class="information-text theme-text information-size1 order-title"
            v-if="evaluationDetails.user"
            >{{ evaluationDetails.user.nickname }}</div
          >
        </div>
      </div>
      <div class="public-box oe-flex">
        <div class="information-size1">评价等级</div>
        <el-rate
          class="information-text"
          v-model="evaluationDetails.score"
          disabled
          disabled-void-color="#c4c4c4"
        ></el-rate>
      </div>
      <div class="public-box oe-flex">
        <div class="information-size1">评价内容</div>
        <div class="information-text information-size2">{{ evaluationDetails.content }}</div>
      </div>
      <div class="public-box oe-flex order-information">
        <div class="information-size1">图片</div>
        <div class="oe-flex"></div>
        <el-image
          v-for="(item, index) in evaluationDetails.images"
          :key="index"
          class="evaluate-img"
          :src="item"
        ></el-image>
      </div>
      <div class="public-box oe-flex">
        <div class="information-size1">评价时间</div>
        <div class="information-text information-size2">{{ evaluationDetails.createtime }}</div>
      </div>
      <div class="public-box oe-flex">
        <div class="information-size1">审核状态</div>
        <el-radio-group class="information-text" v-model="detailsData.evaluationAudit">
          <el-radio :label="true">审核通过</el-radio>
          <el-radio :label="false">审核拒绝</el-radio>
        </el-radio-group>
      </div>
      <div class="public-box information-size1">回复</div>
      <el-input type="textarea" placeholder="请输入内容" v-model="detailsData.textarea"> </el-input>
      <div class="on-flex public-box">
        <el-button type="primary" @click="submitBtn">提交</el-button>
        <el-button
          class="selected-btn"
          type="primary"
          v-if="evaluationDetails.is_select == 0"
          @click="getExportOrder(1)"
          >精选</el-button
        >
        <el-button
          class="selected-btn"
          type="primary"
          v-if="evaluationDetails.is_select == 1"
          @click="getExportOrder(0)"
          >取消精选</el-button
        >
      </div>
    </div>
  </el-card>
  <el-card shadow="never" class="details-history">
    <div class="details-history-title">历史评价</div>
    <div class="history-list oe-flex" v-for="(item, index) in historicalList" :key="Number(index)">
      <el-image :src="item.goods_image" class="history-list-img" />
      <div>
        <div class="oe-flex">
          <div>
            <div>{{ item.goods_name }}</div>
            <el-tag size="mini" color="#D4EBFF" style="color: #55adff" v-if="item.goods_type == '2'"
              >虚拟</el-tag
            >
            <el-tag size="mini" color="#FBDDD1" style="color: #ec672e" v-if="item.goods_type == '3'"
              >卡密</el-tag
            >
            <el-tag size="mini" color="#E4FFF8" style="color: #1ad370" v-if="item.goods_type == '1'"
              >实体</el-tag
            >
            <el-tag size="mini" color="#F4DFD3" style="color: #ef864c" v-if="item.goods_type == '4'"
              >计时/次</el-tag
            >
            <el-tag size="mini" color="#F8E8CF" style="color: #dd8a0d" v-if="item.goods_type == '5'"
              >预约</el-tag
            >
            <el-tag size="mini" color="#E9D4F9" style="color: #8f29df" v-if="item.goods_type == '6'"
              >批发</el-tag
            >
          </div>
          <div class="list-bottom">
            <el-rate v-model="item.score" disabled disabled-void-color="#c4c4c4"></el-rate>
            <div class="comment-text">{{ item.content }}</div>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>
<script lang="ts" setup>
  import { ref, reactive, watch, onMounted } from 'vue'
  import { ElMessageBox, ElMessage } from 'element-plus'
  import { useRoute, useRouter } from 'vue-router'
  import {
    reqEvaluationDetails,
    reqModifyState,
    reqEvaluationEditor,
    reqHistoricalEvaluation
  } from '@/api/order'
  const route = useRoute()
  const router = useRouter()
  const detailsData = ref({
    // 星星数
    stars: 4,
    // 审核状态
    evaluationAudit: true,
    // 回复内容
    textarea: ''
  })
  // 历史评论列表
  const historicalList = ref<any[]>([])
  // 详情id
  const id = ref()
  // 评价详情数据
  const evaluationDetails = ref<any>({})

  // 评价详情
  const getDetails = async () => {
    const { data } = await reqEvaluationDetails({ id: id.value })
    evaluationDetails.value = data.data
    detailsData.value.textarea = evaluationDetails.value.content
  }
  // 获取历史列表
  const getHistoricalList = async () => {
    const { data } = await reqHistoricalEvaluation({ id: id.value })
    historicalList.value = data.data
  }
  // 精选状态切换
  const getExportOrder = async (num: number) => {
    if (num == 1) {
      await ElMessageBox.confirm('是否精选评价？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
    } else {
      await ElMessageBox.confirm('是否精选评价？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
    }
    await reqModifyState({
      ids: [evaluationDetails.value.id],
      params: {
        is_select: num
      }
    })
    ElMessage.success('操作成功')
    getDetails()
  }
  // 提交按钮
  const submitBtn = async () => {
    await reqEvaluationEditor({
      id: evaluationDetails.value.id,
      reply_content: detailsData.value.textarea,
      status: detailsData.value.evaluationAudit ? 2 : 0
    })
    ElMessage.success('操作成功')
    router.go(-1)
  }
  onMounted(() => {
    id.value = route.query.id
    getDetails()
    getHistoricalList()
  })
</script>
<style lang="scss" scoped>
  .details-box {
    .details-title {
      font-size: 16px;
      font-weight: bold;
      color: #000000;
    }
    .details-box-information {
      margin-left: 13px;
    }
    :deep(.el-card.is-always-shadow) {
      border-radius: 10px;
    }
    .order-information {
      margin-left: 30px;
      .evaluate-img {
        margin: 0 14px;
        width: 100px;
        height: 100px;
      }
    }
    .order-title {
      cursor: pointer;
    }
    .public-box {
      margin-top: 27px;
    }
    .information-size1 {
      color: #000;
      font-size: 14px;
    }
    .details-box-evaluate {
      color: #1ad370;
    }
    .information-text {
      margin-left: 14px;
    }
    .order-quantity {
      margin-left: 14px;
    }
    .order-img {
      width: 50px;
      height: 50px;
      margin: 0 10px 0 14px;
    }
    :deep(.el-button) {
      min-height: 24px;
      font-size: 14px;
      padding: 2px 21px;
    }
    .theme-text {
      color: var(--color-primary) !important;
    }
    :deep(.el-textarea__inner) {
      margin-top: 14px;
      resize: none;
      max-height: 142px !important;
      min-height: 142px !important;
    }
    .selected-btn {
      margin-left: 28px;
    }
  }

  :deep(.el-image) {
    width: 50px;
    height: 50px;
  }
  .information-size2 {
    font-size: 12px;
    color: #000;
  }
  :deep(.el-tag) {
    margin-top: 8px;
    height: 16px;
    border-radius: 0;
    margin-right: 8px;
    padding: 0;
    line-height: 14px;
    border-width: 0;
  }
  .details-history {
    margin-top: 24px;
    .details-history-title {
      font-size: 16px;
      font-weight: bold;
      color: #000;
    }
    .history-list {
      padding-bottom: 25px;
      border-bottom: 1px solid #d9d9d9;
      margin-top: 25px;
    }
    .history-list-img {
      margin-right: 10px;
      width: 50px;
      height: 50px;
    }
    .list-bottom {
      margin-left: 28px;
    }
    .comment-text {
      margin-top: 10px;
      font-size: 12px;
      color: #000;
    }
  }
</style>
