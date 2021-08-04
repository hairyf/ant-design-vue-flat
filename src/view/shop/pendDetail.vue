<!--
 * @Author: Mr.wang
 * @Date: 2021-06-07 15:20:11
 * @LastEditTime: 2021-07-08 15:19:02
 * @Description: 
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-col :xs="24" :lg="24">
    <cal-card style="min-height: 284px">
      <div class="flex justify-between mb-16">
        <div class="title">店铺基础信息</div>
      </div>
      <div class="flex">
        <a-image
          :preview="false"
          class="w-100 h-100 mr-32 rounded mt-14"
          :src="detailsData.logo_path"
        >
        </a-image>
        <a-descriptions :column="3" class="flex-1" size="middle">
          <a-descriptions-item class="flex" label="店铺名称">
            <!-- {{ detailsData.name }}
            <cal-button class="h-24" type="link">修改</cal-button> -->
            <span class="mr-10">{{ detailsData.name }}</span>
            <a-popover trigger="click" v-model:visible="visible">
              <template #content>
                <cal-input v-model="name" class="w-208" />
                <div class="flex items-center mt-8 justify-items-center w-208">
                  <cal-button @click="hide(0)" class="ml-28"> 取消 </cal-button>
                  <cal-button @click="hide(1)" type="primary" class="ml-16"> 确定 </cal-button>
                </div>
              </template>
              <span class="text-primary cursor-pointer">编辑</span>
            </a-popover>
          </a-descriptions-item>
          <a-descriptions-item label="店铺套餐" v-if="$route.query.title == '待创建店铺详情'">
            {{ detailsData.combo_name }}
            <cal-button type="link" class="h-24" @click="showEditSetMealModal = true"
              >编辑套餐
            </cal-button>
          </a-descriptions-item>
          <a-descriptions-item label="店铺联系人"> {{ detailsData.liaisons }} </a-descriptions-item>
          <a-descriptions-item label="行业类目"> {{ detailsData.category }} </a-descriptions-item>
          <a-descriptions-item label="店铺ID"> {{ detailsData.id }} </a-descriptions-item>
          <a-descriptions-item label="联系人电话">
            {{ detailsData.liaisons_tel }}
          </a-descriptions-item>
          <a-descriptions-item label="店铺地址">
            {{ detailsData.province_name }}{{ detailsData.city_name }}{{ detailsData.area_name
            }}{{ detailsData.address }}
          </a-descriptions-item>
          <a-descriptions-item label="店铺状态">
            {{ ['待审核', '已拒绝', '待创建', '待创建'][detailsData.status - 1] }}
          </a-descriptions-item>
          <a-descriptions-item label="用户ID">
            {{ detailsData.manager_id }}
          </a-descriptions-item>

          <a-descriptions-item label="申请时间">
            {{ detailsData.createtime_text }}
          </a-descriptions-item>
        </a-descriptions>
      </div>
      <div style="margin-left: 141px" class="mt-10" v-if="$route.query.title == '已拒绝店铺详情'">
        <span style="color: #8c8c8c">拒绝原因:</span>
        <span style="color: red" class="ml-6">{{ detailsData.refuse_reason }}</span>
      </div>
    </cal-card>
  </a-col>

  <cal-message-dialog
    title="编辑套餐"
    :width="804"
    v-model="showEditSetMealModal"
    @ok="editPackage"
  >
    <a-form :label-col="{ span: 5 }" :model="setMealForm" :rules="rules" ref="extendFormRef">
      <a-form-item required label="选择套餐" name="combo_id">
        <cal-button class="w-208" icon-class="nr-increase" @click="onSelectSetMeal">
          重新选择套餐
        </cal-button>
      </a-form-item>
      <template v-if="selectSetMeal.length">
        <a-form-item label=" " v-if="selectSetMeal.length">
          <set-meal-item
            class="w-353"
            v-for="(item, index) in selectSetMeal"
            :item="item"
            :key="index"
          />
        </a-form-item>
        <a-form-item label=" " v-if="selectSetMeal[0]">
          <span class="mr-16">{{ selectSetMeal[0].name }}</span>
          <cal-radio-group v-model="setMealForm.combo_sale_spec_id">
            <cal-radio
              :value="item.id"
              v-for="(item, index) in selectSetMeal[0].sale_spec"
              :key="Number(index)"
            >
              ￥{{ item.price }}/{{ formatTime(item.type, item.nums) }}
            </cal-radio>
          </cal-radio-group>
        </a-form-item>
        <a-form-item required label="店铺到期时间" name="expire_time">
          <cal-radio-group v-model="setMealForm.expire_type">
            <cal-radio :value="1">默认跟随套餐</cal-radio>
            <cal-radio :value="2">自定义到期时间</cal-radio>
            <cal-radio :value="3">永久有效</cal-radio>
          </cal-radio-group>
          <div v-if="setMealForm.expire_type == 2">
            <cal-input-date
              class="w-192"
              placeholder="店铺到期时间"
              v-model="setMealForm.expire_time"
            />
          </div>
        </a-form-item>
      </template>
      <a-form-item required label="管理员登录密码" name="passWord">
        <cal-input-password
          placeholder="请输入管理员登录密码"
          v-model:value="setMealForm.passWord"
        />
      </a-form-item>
    </a-form>
  </cal-message-dialog>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue-demi'
  import SetMealSelect from './components/SetMealSelect'
  import SetMealItem from './components/SetMealItem.vue'
  import { useRoute, useRouter } from 'vue-router'
  import {
    reqPendShopDetails,
    reqEditStoreName,
    reqVerification,
    reqPackageSwitching
  } from '@/api/shop'
  import { message } from 'ant-design-vue'
  import { useAntdForm } from '@/hooks/use-antd-form'
  import dayjs from 'dayjs'
  const route = useRoute()
  const router = useRouter()
  // 编辑套餐的弹窗
  const showEditSetMealModal = ref(false)
  // 编辑店铺名称的气泡卡片
  const visible = ref(false)
  // 详情数据
  const detailsData = ref<any>({})
  // 当前详情的id
  const id = ref<any>('')
  const name = ref('')
  const selectSetMeal = ref<any>([])
  const extendFormRef = ref()
  // 套餐
  const setMealForm = ref({
    combo_id: '',
    combo_sale_spec_id: '',
    toVoid: 0,
    expire_type: 1,
    expire_time: 0,
    passWord: ''
  })
  const formatTime = (type: string, nums: number) => {
    const strategy: Record<string, string> = {
      1: `${nums}日`,
      2: `${nums}月`,
      3: `${nums}年`,
      4: '永久有效'
    }
    return strategy[type]
  }
  // 替换套餐
  const onSelectSetMeal = async () => {
    const selects = await SetMealSelect({ multiple: false })
    selectSetMeal.value = selects
    setMealForm.value.combo_id = selectSetMeal.value[0].id
    setMealForm.value.combo_sale_spec_id = selectSetMeal.value[0].sale_spec[0].id
  }
  const passwordRule = async (rule: any, value: string) => {
    if (value) {
      try {
        await reqVerification({ confirmPwd: value })
        return Promise.resolve()
      } catch (error) {
        return Promise.reject('密码不正确,请重新输入密码')
      }
    } else {
      return Promise.reject('密码为必填项')
    }
  }
  const timeSetdRule2 = async (rule: any, value: any) => {
    if (setMealForm.value.expire_type == 2 && setMealForm.value.expire_time == 0) {
      return Promise.reject('请选择到期时间')
    }
    return Promise.resolve()
  }
  const { rules, validate } = useAntdForm(extendFormRef, {
    passWord: [{ required: true, validator: passwordRule, trigger: 'blur' }],
    expire_time: [{ required: true, validator: timeSetdRule2, trigger: 'blur' }],
    combo_id: { required: true, message: '套餐为必填项' }
  })

  const hide = async (num: number) => {
    if (num == 1) {
      await reqEditStoreName({
        id: id.value,
        name: name.value
      })
      visible.value = false
      getShopDetails(id.value)
    }
    message.success('操作成功！')
  }
  // 编辑套餐按钮
  const editPackage = async () => {
    await validate()
    await reqPackageSwitching({
      id: detailsData.value.id,
      combo_id: setMealForm.value.combo_id,
      combo_sale_spec_id: setMealForm.value.combo_sale_spec_id,
      expire_type: setMealForm.value.expire_type,
      expire_time:
        setMealForm.value.expire_type == 2 ? dayjs(setMealForm.value.expire_time).unix() : 0,
      is_delete_unused_combo: setMealForm.value.toVoid,
      unused_combo_order_id: 0,
      ext_diff: []
    })
    message.success('操作成功！')
    router.go(-1)
    // getShopDetails(id.value)
    // setMealForm.value = {
    //   combo_id: '',
    //   combo_sale_spec_id: '',
    //   toVoid: 0,
    //   expire_type: 1,
    //   expire_time: 0,
    //   passWord: ''
    // }
    // selectSetMeal.value = []
  }
  // 获取店铺详情
  const getShopDetails = async (id: any) => {
    const { data } = await reqPendShopDetails({ id })
    detailsData.value = data.data
    name.value = detailsData.value.name
  }
  onMounted(() => {
    if (route.query.id) {
      getShopDetails(route.query.id)
      id.value = route.query.id
    }
  })
</script>

<style lang="scss" scoped>
  .title {
    font-size: 16px;
    color: #000;
    font-weight: bold;
  }
  :deep(.ant-image) {
    width: 100px;
    height: 100px;
    margin-right: 32px;
  }
</style>
