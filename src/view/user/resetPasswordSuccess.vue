<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-03-23 09:54:40
 * @LastEditTime: 2021-03-25 14:16:59
 * @Description: 
 * @LastEditors: Mr.Mao
-->
<template>
  <div class="main">
    <i class="ad-complete1 icon"></i>
    <div class="success">您的密码已经重置成功，请牢记</div>
    <div class="footer">{{ countDown }}秒后自动返回登录页面</div>
    <el-button class="wechat-login" size="small" type="primary" @click="onRegister">
      <span class="text">返回登录</span>
    </el-button>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const countDown = ref(5)
  onMounted(() => {
    const timer = setInterval(() => {
      countDown.value--
      if (countDown.value < 1) {
        clearInterval(timer)
        router.push('login')
      }
    }, 1000)
  })
  const onRegister = () => {
    router.push('login')
  }
</script>
<style lang="scss" scoped>
  .main {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .icon {
      font-size: 40px;
      color: #1ad370;
    }
    .success {
      font-size: 24px;
      margin-bottom: 27px;
      margin-top: 14px;
    }
    .footer {
      font-size: 14px;
      color: #8c8c8c;
    }
    .wechat-login {
      margin-top: 200px;
      width: 300px;
      height: 40px;
      border-radius: 20px;
    }
  }
</style>
