<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-28 09:29:24
 * @LastEditTime: 2021-07-05 17:35:38
 * @Description: 店铺列表
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="cal-add-shop">
    <cal-card>
      <div class="w-544 m-auto">
        <cal-steps :current="currentTab" labelPlacement="vertical">
          <cal-step title="基础信息"> </cal-step>
          <cal-step title="详细信息"> </cal-step>
        </cal-steps>
      </div>
    </cal-card>
    <a-form
      ref="formRef"
      :model="form"
      :rules="rules"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
    >
      <div class="w-804 mt-48 mx-auto flex flex-col justify-center items-center">
        <cal-tabs v-model:activeKey="currentTab" class="w-full">
          <cal-tab-pane :key="0" tab="基础信息" :min-height="316">
            <div class="w-477 mx-auto mt-16">
              <a-form-item required label="店铺名称" name="name">
                <cal-input placeholder="请输入名称" v-model:value="form.name" class="w-192" />
              </a-form-item>
              <a-form-item required label="实收金额" name="combo_price">
                <cal-input
                  placeholder="请输入实收金额"
                  v-model:value="form.combo_price"
                  class="w-192"
                  @input="form.combo_price = $filterPrice(form.combo_price)"
                />
              </a-form-item>
              <!-- <a-form-item required label="联系人电话号码" name="liaisons_tel">
                <cal-input
                  placeholder="请输入联系人电话号码"
                  v-model:value="form.liaisons_tel"
                  class="w-192"
                />
              </a-form-item> -->
              <a-form-item required label="行业类目" name="industry_class_id">
                <!-- <cal-input-select
                  placeholder="请选择行业类目"
                  v-model:value="form.industry_class_id"
                  class="w-384"
                >
                  <a-select-option value="jack"></a-select-option>
                </cal-input-select> -->
                <cal-cascader
                  :options="options"
                  :display-render="displayRender"
                  expand-trigger="hover"
                  placeholder="请选择行业类目"
                  :fieldNames="{ label: 'name', value: 'id', children: 'children' }"
                  @change="selectClass"
                />
              </a-form-item>
              <a-form-item label="身份号码" name="card_id" required v-if="iDRequired">
                <cal-input
                  placeholder="请输入身份号码"
                  v-model:value="form.card_id"
                  class="w-384"
                  :max-length="30"
                  show-count
                />
              </a-form-item>
              <a-form-item
                v-if="businessRequired"
                label="营业执照编号"
                required
                name="business_licence_sn"
              >
                <cal-input
                  placeholder="请输入营业执照编号"
                  v-model:value="form.business_licence_sn"
                  class="w-384"
                />
              </a-form-item>
              <a-form-item required label="店铺地址" name="area_id">
                <city-cascader class="w-384" @change="selectAddress" />
              </a-form-item>
              <a-form-item required label="详细地址" name="address">
                <cal-input
                  placeholder="请输入详细地址"
                  v-model:value="form.address"
                  class="w-384"
                />
              </a-form-item>
            </div>
          </cal-tab-pane>
          <cal-tab-pane :key="1" tab="详细信息" :min-height="316">
            <div class="mx-auto mt-16">
              <a-form-item required label="选择用户" name="manager_id">
                <cal-button class="w-208" icon-class="nr-increase" @click="onSelectUsers">
                  {{ selectUsers.length == 1 ? '重新选择用户' : '选择用户' }}
                </cal-button>
              </a-form-item>
              <a-form-item label="  " v-if="selectUsers.length">
                <user-item
                  :item="item"
                  class="w-320"
                  v-for="(item, index) in selectUsers"
                  :key="index"
                />
              </a-form-item>
              <a-form-item required label="选择套餐" name="combo_id">
                <cal-button class="w-208" icon-class="nr-increase" @click="onSelectSetMeal">
                  {{ selectSetMeal.length == 1 ? '重新选择套餐' : '选择套餐' }}
                </cal-button>
              </a-form-item>
              <a-form-item label="  " v-if="selectSetMeal.length">
                <set-meal-item
                  class="w-353"
                  v-for="(item, index) in selectSetMeal"
                  :item="item"
                  :key="index"
                />
              </a-form-item>
              <a-form-item label=" " v-if="selectSetMeal[0]">
                <span class="mr-16">{{ selectSetMeal[0].name }}</span>
                <cal-radio-group v-model="form.combo_sale_spec_id">
                  <cal-radio
                    :value="item.id"
                    v-for="(item, index) in selectSetMeal[0].sale_spec"
                    :key="index"
                  >
                    ￥{{ item.price }}/{{ formatTime(item.type, item.nums) }}
                  </cal-radio>
                </cal-radio-group>
              </a-form-item>
              <a-form-item label="店铺到期时间" name="expire_time">
                <cal-radio-group v-model="form.expire_type">
                  <cal-radio :value="1">默认跟随套餐</cal-radio>
                  <cal-radio :value="2">自定义到期时间</cal-radio>
                  <cal-radio :value="3">永久有效</cal-radio>
                </cal-radio-group>
                <div v-if="form.expire_type == 2">
                  <cal-input-date class="w-192" placeholder="店铺到期时间" v-model="dueDate" />
                </div>
              </a-form-item>

              <a-form-item required label="备注" name="remark" class="remark-introduction">
                <cal-textarea
                  class="w-384 h-128 rounded-xl"
                  v-model:value="form.remark"
                  showCount
                  :maxlength="200"
                />
              </a-form-item>
              <a-form-item label="店铺简介" class="remark-introduction">
                <cal-textarea
                  class="w-384 h-128 rounded-xl"
                  v-model:value="form.info"
                  :maxlength="200"
                  showCount
                />
              </a-form-item>
            </div>
          </cal-tab-pane>
        </cal-tabs>
        <div class="mt-64">
          <cal-button class="w-176 h-48 mr-56" @click="$router.back()">取消</cal-button>
          <cal-button class="w-176 h-48" type="primary" @click="onNextOrSave">
            {{ currentTab == 0 ? '下一步' : '保存' }}
          </cal-button>
        </div>
      </div>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue-demi'
  import SetMealSelect from './components/SetMealSelect'
  import UsersSelect from './components/UsersSelect'
  import SetMealItem from './components/SetMealItem.vue'
  import UserItem from './components/UserItem.vue'
  import { reqNewStores } from '@/api/shop'
  import { reqIndustryClassIndex, reqShopSetting } from '@/api/setting'
  import { useAntdForm } from '@/hooks/use-antd-form'
  import { useRouter } from 'vue-router'
  import { message } from 'ant-design-vue'
  import dayjs from 'dayjs'
  const router = useRouter()
  const currentTab = ref(0)
  const iDRequired = ref(false)
  const businessRequired = ref(false)
  /** 处理表单逻辑 start */
  const form = ref({
    // 店铺名称
    name: '',
    // 店铺联系人
    liaisons: '',
    // 店铺联系人电话
    liaisons_tel: '',
    // 身份证
    card_id: '',
    // 营业执照编号
    business_licence_sn: '',
    // 区域ID
    area_id: '' as Key,
    // 详细地址
    address: '',
    // 店主id
    manager_id: '',
    // 套餐id
    combo_id: '',
    // 套餐售卖规则id
    combo_sale_spec_id: '',
    // 行业分类最底层id
    industry_class_id: '',
    // 实收金额
    combo_price: '',
    // 店铺简介
    info: '',
    // 备注
    remark: '',
    // 店铺到期时间类型 到期设置 1:跟随套餐设置 2:自定义有效期 3:永久有效
    expire_type: 1 as 1 | 2 | 3,
    // 自定义到期时间
    expire_time: 0
    // 店铺扩展信息(从店铺设置接口读取)
    // extra_params: [] as any[]
  })
  const dueDate = ref(0)
  const formatTime = (type: string, nums: number) => {
    const strategy: Record<string, string> = {
      1: `${nums}日`,
      2: `${nums}月`,
      3: `${nums}年`,
      4: '永久有效'
    }
    return strategy[type]
  }
  const formRef = ref()
  const options = ref<any[]>([])
  // 筛选店铺类目方法
  const displayRender = ({ labels, values }: { labels: string[]; values: string[] }) => {
    return labels[labels.length - 1]
  }
  const validateBusinessId = async (rule: any, value: string) => {
    if (value == '') {
      return Promise.reject('营业执照编号为必填项')
    }
    return Promise.resolve()
  }
  const IDRule = async (rule: any, value: string) => {
    const reg =
      /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/
    if (value === '') {
      return Promise.reject('请填写身份证号码')
    } else if (!reg.test(value)) {
      return Promise.reject('请填写正确的身份证号码')
    }
    return Promise.resolve()
  }
  const timeSetdRule = async (rule: any, value: any) => {
    if (form.value.expire_type == 2 && dueDate.value == 0) {
      return Promise.reject('请选择到期时间')
    }
    return Promise.resolve()
  }
  const { rules, validate } = useAntdForm(formRef, {
    name: { required: true, message: '名字为必填项' },
    area_id: { required: true, message: '店铺地址为必填项' },
    address: { required: true, message: '详细地址为必填项' },
    industry_class_id: { required: true, message: '行业类目为必填项' },
    remark: { required: true, message: '备注为必填项' },
    manager_id: { required: true, message: '用户为必填项' },
    combo_id: { required: true, message: '套餐为必填项' },
    combo_price: { required: true, message: '实收金额为必填项' },
    card_id: { validator: IDRule },
    business_licence_sn: { validator: validateBusinessId },
    expire_time: { required: true, validator: timeSetdRule }
  })
  // 处理地址选择
  const selectAddress = (event: Key[]) => {
    form.value.area_id = event[event.length - 1] + ''
  }
  // 处理类目选择
  const selectClass = (event: Key[]) => {
    form.value.industry_class_id = event[event.length - 1] + ''
  }
  // 处理点击底部操作栏(下一步, 保存)
  const onNextOrSave = async () => {
    if (currentTab.value == 0) {
      currentTab.value = 1
      return undefined
    }
    await validate()
    // form.value.industry_class_id =
    //   form.value.industry_class_id[form.value.industry_class_id.length - 1]
    if (dueDate.value) {
      form.value.expire_time = dayjs(dueDate.value).unix()
    }
    if (form.value.expire_type != 2) {
      form.value.expire_time = 0
    }
    await reqNewStores(form.value)
    message.success('操作成功！')
    router.go(-1)
  }
  /** 处理表单逻辑 end */

  /** 处理选择器逻辑 start */
  const selectSetMeal = ref<any[]>([])
  const onSelectSetMeal = async () => {
    const selects = await SetMealSelect({ multiple: false })
    selectSetMeal.value = selects
    form.value.combo_id = selectSetMeal.value[0].id
    form.value.combo_sale_spec_id = selectSetMeal.value[0].sale_spec[0].id
  }
  const selectUsers = ref<any[]>([])
  const onSelectUsers = async () => {
    const selects = await UsersSelect({ multiple: false })
    selectUsers.value = selects
    form.value.manager_id = selectUsers.value[0].id
    form.value.liaisons = selectUsers.value[0].nickname
    form.value.liaisons_tel = selectUsers.value[0].mobile
  }
  /** 处理选择器逻辑 end */
  reqIndustryClassIndex().then((res: any) => {
    options.value = res.data.data
  })
  // 判断是否开启身份证或者营业编号的输入框
  onMounted(async () => {
    const { data } = await reqShopSetting({ key: 'ShopSet' })
    const config = data.data.config
    iDRequired.value = config.audit_content.sys.card_id.is_show == 1
    businessRequired.value = config.audit_content.sys.business_licence_sn.is_show == 1
  })
</script>
<style lang="scss" scoped>
  .remark-introduction {
    :deep(.ant-input) {
      border-radius: 10px;
    }
  }
</style>
