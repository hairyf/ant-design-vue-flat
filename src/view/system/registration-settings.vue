<!--
 * @Author: Mr.wang
 * @Date: 2021-03-19 14:45:41
 * @LastEditTime: 2021-05-07 14:28:27
 * @Description: 会员价
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->

<template>
  <!-- 筛选条件 -->
  <el-card shadow="never" class="registration-settings">
    <div class="card-title">
      <!-- <h3>绑定手机号（适用于全渠道账号统一）使用全网渠道商城，强烈推荐绑定手机号注册</h3> -->
      <h3>绑定手机号</h3>
      <!-- <div class="tips-box">
        提示：会员通过微信授权登录商城收，引导会员绑定手机号，识别会员唯一身份，解决会员在微信公众号和微信小程序、H5等不同渠道账号不同的问题
      </div>
      <el-form :model="form" label-width="80px">
        <el-form-item label="绑定类型">
          <div>
            <el-radio v-model="radio" label="1">强制绑定</el-radio>
            <span class="text-tip">会员通过微信登录商城后，第一时间引导买家使用手机号登录</span>
          </div>
          <div class="oe-flex" v-if="radio == '1'">
            <div class="title">绑定场景</div>
            <el-checkbox-group v-model="scene">
              <el-checkbox v-for="item in sceneList" :label="item.label" :key="item.val">{{
                item.val
              }}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>
        <el-form-item>
          <el-radio v-model="radio" label="2">手动绑定</el-radio>
          <span class="text-tip">会员通过微信登录商城后，在个人中心手动绑定手机号</span>
        </el-form-item>
        <el-form-item>
          <el-radio v-model="radio" label="0">不启动</el-radio>
          <span class="text-tip"
            >不建议使用，在同时运营多个渠道商城时，无法通过手机号精准识别会员身份</span
          >
        </el-form-item>
      </el-form> -->
      <el-form :model="form" label-width="120px">
        <el-form-item label="绑定场景">
          <el-checkbox-group v-model="scene">
            <el-checkbox v-for="item in sceneList" :label="item.label" :key="item.val">{{
              item.val
            }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="注册绑定手机号">
          <el-switch v-model="openNot"> </el-switch>
          <div class="tips-text"
            >当开关开启时，注册账号时需要手机号验证码验证，需要先配置短信接口，<span
              @click="openClass('/system/other-settings/SMS-configuration')"
              >去配置</span
            ></div
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="el-flex-layout">
      <el-button type="primary" @click="preservation">保存</el-button>
      <el-button @click="getRegistrationSettings">取消</el-button>
    </div>
  </el-card>
</template>
<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue'
  import { ElMessage } from 'element-plus'
  import { reqSetKeyConfig, reqModifyConfig } from '@/api/system'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const form = reactive({
    name: ''
  })
  // 是否注册绑定手机号
  const openNot = ref(false)
  const radio = ref()
  const scene = ref([])
  const sceneList = ref([
    { val: '会员领取优惠券', label: 'member_discounts' },
    { val: '会员签到', label: 'member_sign' },
    { val: '加入购物车', label: 'shopping_trolley' },
    { val: '点击立即购买', label: 'buy' },
    { val: '点击提交订单', label: 'order' }
    // { val: '会员登录', label: 'login' }
  ])
  // 注册设置
  const getRegistrationSettings = async () => {
    const { data } = await reqSetKeyConfig({ key: 'registerSet' })
    scene.value = data.data.scene
    openNot.value = data.data.bind_phone == '1'
  }
  //
  const preservation = async () => {
    const key = 'registerSet'
    const data = {
      scene: scene.value,
      bind_phone: openNot.value == true ? '1' : '0'
    }
    await reqModifyConfig(key, data)
    ElMessage.success('操作成功')
    getRegistrationSettings()
  }
  const openClass = (pathValue: string) => {
    const { href } = router.resolve({
      path: pathValue
    })
    window.open(href, '_blank')
  }
  onMounted(() => getRegistrationSettings())
</script>
<style lang="scss" scoped>
  .registration-settings {
    .text-tip {
      color: #8c8c8c;
      font-size: 12px;
    }
    :deep(.el-card) {
      min-height: 450px;
    }
    :deep(.el-card__body) {
      min-height: 450px;
    }
    .tips-box {
      margin: 28px 0 16px 0;
      font-size: 12px;
      color: #000;
      padding: 9px 0 9px 14px;
      // background: rgba(255, 157, 40, 0.2);
      background-color: var(--color-primary-light-opacity-8);
      border: 1px solid var(--color-primary);
      border-radius: 2px;
    }
    :deep(.el-form-item) {
      margin-bottom: 8px;
    }
    .title {
      transform: translateY(-2px);
      margin-right: 15px;
    }
    :deep(.el-checkbox__label) {
      color: #000;
    }
    .tips-text {
      color: #acacac;
      span {
        color: var(--color-primary);
      }
    }
    .el-flex-layout {
      margin-top: 30px;
      width: 600px;
      display: flex;
      justify-content: center;
      .el-button {
        width: 140px;
        height: 30px;
      }
    }
  }
</style>
