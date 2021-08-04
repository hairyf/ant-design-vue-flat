<!--
 * @Author: Mr.ji
 * @Date: 2021-03-19 16:28:00
 * @LastEditTime: 2021-05-10 15:20:06
 * @Description: 会员的模态框
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="member-modality">
    <!-- 会员等级 -->
    <el-dialog title="优惠券" v-model="show" width="554px">
      <div class="member-serach">
        <!-- <el-input v-model="inputText" placeholder="请输入优惠券名称">
          <template #suffix>
            <i
              class="el-icon-search el-input__icon"
              style="cursor: pointer"
              @click="searchBtn"
            ></i> </template
        ></el-input> -->
      </div>
      <el-table :data="couponList" style="width: 100%" height="500px">
        <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
        <el-table-column prop="name" label="优惠券名称"></el-table-column>
        <el-table-column prop="date" label="类型">
          <template #default="scope">
            <el-tag type="danger" v-if="scope.row.type == 1">满减券</el-tag>
            <el-tag type="success" v-if="scope.row.type == 2">折扣券</el-tag>
            <!-- <el-tag type="success" v-if="scope.row.type == 3">无门槛券</el-tag> -->
          </template>
        </el-table-column>
        <el-table-column prop="explain" label="使用说明"></el-table-column>
      </el-table>
      <template #footer>
        <div class="oe-flex oe-row-between">
          <div class="member-mode-text" @click="couponBtn('/marke/coupon/allCoupon')"
            >优惠券设置</div
          >
          <div class="footer-right">
            <el-button size="mini" @click="show = false">取消</el-button>
            <el-button size="mini" type="primary" @click="show = false">确定</el-button>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
  import { defineProps, defineEmit, computed, ref } from 'vue'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const props = defineProps({
    show: {
      type: Boolean,
      required: true
    },
    couponList: {
      type: Array as () => any[],
      required: true
    }
  })
  const inputText = ref('')
  const searchBtn = () => {}
  const couponBtn = (pathValue: string) => {
    const { href } = router.resolve({
      path: pathValue
    })
    window.open(href, '_blank')
  }

  const emit = defineEmit()
  // 多层model绑定数据
  const show = computed({
    get: () => props.show,
    set: () => emit('update:show')
  })
</script>
<style lang="scss" scoped>
  :deep(.el-input) {
    width: 180px;
  }
  .member-serach {
    display: flex;
    flex-direction: row-reverse;
    text-align: right;
    :deep(.el-input__inner) {
      width: 180px;
      background: #f5f5f5;
    }
  }
  :deep(.cell) {
    color: #000;
  }
  :deep(.el-button) {
    min-height: 32px;
    padding: 0 46px;
  }
  .member-mode-text {
    cursor: pointer;
    font-size: 14px;
    color: var(--color-primary);
  }
</style>
