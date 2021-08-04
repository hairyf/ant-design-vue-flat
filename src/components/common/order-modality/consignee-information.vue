<!--
 * @Author: Mr.wang
 * @Date: 2021-03-23 21:46:31
 * @LastEditTime: 2021-04-23 11:59:40
 * @Description: 收货人信息
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="consignee-information-box">
    <el-dialog
      title="修改收货人信息"
      v-model="show"
      width="683px"
      custom-class="consignee-information"
    >
      <div class="oe-flex protection-tips" v-if="currentItem.is_after_sale == 1">
        <i class="ad-warning"></i>
        <div>当前商品正在维权中，此操作可能存在风险，请谨慎处理！</div>
      </div>
      <el-form ref="form" :rules="rules" :model="consigneeForm" label-width="100px">
        <el-form-item label="收货人姓名" prop="fullName">
          <el-input v-model="consigneeForm.fullName" placeholder="输入收货人姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phoneNumber">
          <el-input v-model="consigneeForm.phoneNumber" placeholder="输入手机号码"></el-input>
        </el-form-item>
        <!-- <el-form-item label="区域">
      <el-radio-group v-model="consigneeForm.logistics">
        <el-radio label="需要物流"></el-radio>
        <el-radio label="无需物流"></el-radio>
      </el-radio-group>
    </el-form-item> -->
        <el-form-item label="省市区" prop="province">
          <div class="oe-flex">
            <el-select
              v-model="consigneeForm.province[0]"
              placeholder="请选择"
              class="oe-flex-2"
              clearable
              @change="getCityList"
              value-key="name"
            >
              <el-option
                value-key="company_name"
                v-for="item in provinceList"
                :key="item.name"
                :label="item.name"
                :value="item"
              >
              </el-option>
            </el-select>
            <el-select
              value-key="name"
              @change="getAreaList"
              clearable
              v-model="consigneeForm.province[1]"
              placeholder="请选择"
              class="oe-flex-2"
              style="margin: 0 30px"
            >
              <el-option v-for="item in cityList" :key="item.name" :label="item.name" :value="item">
              </el-option>
            </el-select>
            <el-select
              value-key="name"
              v-model="consigneeForm.province[2]"
              placeholder="请选择"
              class="oe-flex-2"
              clearable
            >
              <el-option v-for="item in areaList" :key="item.name" :label="item.name" :value="item">
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="consigneeForm.address" placeholder="输入详细地址"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="oe-flex">
            <el-checkbox v-model="agree"></el-checkbox>
            <div class="tips-text">同意修改 更改地址后可能存在运费误差，请慎重考虑</div>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="show = false">取消</el-button>
          <el-button type="primary" @click="determineBtn" :disabled="!agree">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
  import { reqcitiesList } from '@/api/common'
  import { ElMessage } from 'element-plus'
  import { reqshippingAddress } from '@/api/order'
  import { ref, computed, defineEmit, defineProps, reactive, watch, inject } from 'vue'
  const props = defineProps({
    show: {
      type: Boolean,
      required: true
    },
    currentItem: {
      type: Object,
      required: true
    }
  })

  const emit = defineEmit()
  const form = ref()
  // 多层model绑定数据
  const show = computed({
    get: () => props.show,
    set: () => emit('update:show')
  })
  // 收货人信息
  const consigneeForm = ref({
    // 收货人姓名
    fullName: '',
    // 手机号码
    phoneNumber: '',
    // 省市区
    province: ['', '', ''] as any,
    // 详细地址
    address: ''
  })
  // 省一级数据
  const provinceList = ref<any[]>([])
  // 市数据
  const cityList = ref<any[]>([])
  // 区数据
  const areaList = ref<any[]>([])
  // 是否同意修改
  const agree = ref(false)
  // 验证方法
  const checkProvince = (rule: any, value: any, callback: any) => {
    if (
      consigneeForm.value.province[0] == '' ||
      consigneeForm.value.province[1] == '' ||
      consigneeForm.value.province[2] == ''
    ) {
      callback(new Error('请选全省市区'))
    } else {
      callback()
    }
  }
  const passwordVerification = (rule: any, value: any, callback: any) => {
    const isAccountNum = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(value)
    if (value == '') {
      callback(new Error('联系方式不能为空'))
    }
    if (!isAccountNum) {
      callback(new Error('请输入正确的联系方式'))
    }
    callback()
  }
  // 验证
  const rules = reactive({
    fullName: [{ required: true, message: '请填写收货人姓名', trigger: 'blur' }],
    phoneNumber: [{ required: true, validator: passwordVerification, trigger: 'blur' }],
    province: [{ required: true, validator: checkProvince, trigger: 'blur' }],
    address: [{ required: true, message: '请填写详细地址', trigger: 'blur' }]
  })
  // 获取城市列表
  reqcitiesList().then((res) => {
    provinceList.value = res.data.data
  })
  // 监听省级获取市级数据
  const getCityList = (val: any) => {
    cityList.value = val.children
    consigneeForm.value.province[1] = ''
    consigneeForm.value.province[2] = ''
    areaList.value = []
  }
  // 监听市级获取区级数据
  const getAreaList = (val: any) => {
    areaList.value = val.children
    consigneeForm.value.province[2] = ''
  }
  // 获取城市列表如果有详情数据，就匹配赋值
  const getListCities = async () => {
    const { data } = await reqcitiesList()
    provinceList.value = data.data
    provinceList.value.forEach((item) => {
      if (item.id == props.currentItem.province_id) {
        consigneeForm.value.province[0] = item
        getCityList(item)
        item.children.forEach((item1: any) => {
          if (item1.id == props.currentItem.city_id) {
            consigneeForm.value.province[1] = item1
            getAreaList(item1)
            item1.children.forEach((item2: any) => {
              if (item2.id == props.currentItem.area_id) {
                consigneeForm.value.province[2] = item2
              }
            })
          }
        })
      }
    })
  }
  // 确定按钮
  const determineBtn = () => {
    form.value.validate(async (valid: boolean) => {
      if (valid) {
        await reqshippingAddress({
          id: props.currentItem.id,
          phone: consigneeForm.value.phoneNumber,
          consignee: consigneeForm.value.fullName,
          address: consigneeForm.value.address,
          province_name: consigneeForm.value.province[0].name,
          province_id: consigneeForm.value.province[0].id,
          city_name: consigneeForm.value.province[1].name,
          city_id: consigneeForm.value.province[1].id,
          area_name: consigneeForm.value.province[2].name,
          area_id: consigneeForm.value.province[2].id
        })
        ElMessage.success('操作成功!!')
        emit('resetOrderDetails')
        resetOrderList?.()
        show.value = false
      }
    })
  }
  watch(
    () => props.currentItem,
    () => {
      consigneeForm.value.fullName = props.currentItem.consignee
      consigneeForm.value.phoneNumber = props.currentItem.phone
      consigneeForm.value.address = props.currentItem.address
      // consigneeForm.value.province[0] = props.currentItem.province_name
      // consigneeForm.value.province[1] = props.currentItem.city_name
      // consigneeForm.value.province[2] = props.currentItem.area_name
    }
  )
  watch(props, () => {
    if (props.show) {
      // 获取城市列表
      getListCities()
    }
  })
  // 调父组件事件
  const resetOrderList = inject<() => void>('resetOrderList')
</script>
<style lang="scss" scoped>
  .consignee-information-box {
    .consignee-information {
      .el-form {
        margin-top: 20px;
      }
      .dialog-footer {
        .el-button {
          min-height: 32px;
          padding: 0 45px;
          font-size: 14px;
        }
      }
      .el-input {
        line-height: 32px;
      }

      .el-checkbox__inner {
        transform: translateY(-2px);
      }

      .tips-text {
        margin-left: 10px;
        color: #ff0000;
      }
    }
    :deep(.el-form-item__label) {
      line-height: 32px;
    }
    :deep(.el-form-item__content) {
      line-height: 32px;
    }
    :deep(.el-input__inner) {
      background: #f5f5f5;
    }
  }
</style>
