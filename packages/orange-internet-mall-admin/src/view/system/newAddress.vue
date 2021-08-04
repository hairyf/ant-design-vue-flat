<!--
 * @Author: Mr.wang
 * @Date: 2021-04-13 16:20:25
 * @LastEditTime: 2021-04-13 19:21:37
 * @Description: 新增退货地址
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-card shadow="never" class="newAddress-box">
    <el-form
      :model="ruleForm"
      ref="noticeForm"
      :rules="rules"
      label-width="120px"
      class="notice-box"
    >
      <el-form-item label="退货地址名称" prop="title">
        <el-input
          class="unified-inp"
          v-model="ruleForm.title"
          placeholder="请输入退货地址名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="收货人姓名" prop="consignee">
        <el-input
          class="unified-inp"
          v-model="ruleForm.consignee"
          placeholder="请输入收货人姓名"
        ></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="phone">
        <el-input
          class="unified-inp"
          v-model="ruleForm.phone"
          placeholder="请输入联系方式"
        ></el-input>
      </el-form-item>
      <el-form-item label="所属区域" prop="province">
        <div class="oe-flex">
          <el-select
            v-model="ruleForm.province[0]"
            placeholder="请选择"
            clearable
            @change="getCityList"
            class="province-inp"
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
            class="province-inp"
            value-key="name"
            @change="getAreaList"
            clearable
            v-model="ruleForm.province[1]"
            placeholder="请选择"
            style="margin: 0 30px"
          >
            <el-option v-for="item in cityList" :key="item.name" :label="item.name" :value="item">
            </el-option>
          </el-select>
          <el-select
            class="province-inp"
            value-key="name"
            v-model="ruleForm.province[2]"
            placeholder="请选择"
            clearable
          >
            <el-option v-for="item in areaList" :key="item.name" :label="item.name" :value="item">
            </el-option>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item label="详细地址" prop="address">
        <el-input
          class="unified-inp"
          v-model="ruleForm.address"
          placeholder="请输入详细地址"
        ></el-input>
      </el-form-item>
      <el-form-item label="是否设为默认" prop="is_default">
        <el-switch v-model="ruleForm.is_default"> </el-switch>
      </el-form-item>
      <el-form-item>
        <div class="oe-flex">
          <el-button @click="router.go(-1)">取消</el-button>
          <el-button type="primary" @click="preservationBtn">保存</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue'
  import { reqcitiesList } from '@/api/common'
  import { ElMessage } from 'element-plus'
  import { reqAddAddress } from '@/api/system'
  import { reqReturnAddressList } from '@/api/order'
  import { useRoute, useRouter } from 'vue-router'
  const router = useRouter()
  const route = useRoute()
  const noticeForm = ref<any>('')
  const ruleForm = ref({
    //  退款地址名称
    title: '',
    //  收货人
    consignee: '',
    // 电话号码
    phone: '',
    // 区域
    province: [
      { name: '', id: '' },
      { name: '', id: '' },
      { name: '', id: '' }
    ] as any,
    // 详情地址
    address: '',
    // 是否默认
    is_default: false
  })
  const id = ref<any>('')
  // 省一级数据
  const provinceList = ref<any[]>([])
  // 市数据
  const cityList = ref<any[]>([])
  // 区数据
  const areaList = ref<any[]>([])
  const details = ref<any>()
  // 验证方法
  const checkProvince = (rule: any, value: any, callback: any) => {
    if (
      ruleForm.value.province[0] == '' ||
      ruleForm.value.province[1] == '' ||
      ruleForm.value.province[2] == ''
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
  const rules = ref({
    title: [{ required: true, message: '请填写退款地址名称', trigger: 'blur' }],
    consignee: [{ required: true, message: '请填写收货人名称', trigger: 'blur' }],
    phone: [{ required: true, validator: passwordVerification, trigger: 'blur' }],
    province: [{ required: true, validator: checkProvince, trigger: 'blur' }],
    address: [{ required: true, message: '请填写详细地址', trigger: 'blur' }]
  })
  // 监听省级获取市级数据
  const getCityList = (val: any) => {
    cityList.value = val.children
    ruleForm.value.province[1] = {}
    ruleForm.value.province[2] = {}
    areaList.value = []
  }
  // 监听市级获取区级数据
  const getAreaList = (val: any) => {
    areaList.value = val.children
    ruleForm.value.province[2] = ''
  }
  // 保存
  const preservationBtn = () => {
    noticeForm.value.validate((valid: boolean) => {
      if (valid) {
        addNotice()
      }
    })
  }
  // 保存之后请求
  const addNotice = async () => {
    if (!id.value) {
      await reqAddAddress({
        title: ruleForm.value.title,
        phone: ruleForm.value.phone,
        consignee: ruleForm.value.consignee,
        address: ruleForm.value.address,
        province_name: ruleForm.value.province[0].name,
        province_id: ruleForm.value.province[0].id,
        city_name: ruleForm.value.province[1].name,
        city_id: ruleForm.value.province[1].id,
        area_name: ruleForm.value.province[2].name,
        area_id: ruleForm.value.province[2].id,
        is_default: ruleForm.value.is_default == true ? 1 : 0
      })
    } else {
      await reqAddAddress({
        id: id.value,
        title: ruleForm.value.title,
        phone: ruleForm.value.phone,
        consignee: ruleForm.value.consignee,
        address: ruleForm.value.address,
        province_name: ruleForm.value.province[0].name,
        province_id: ruleForm.value.province[0].id,
        city_name: ruleForm.value.province[1].name,
        city_id: ruleForm.value.province[1].id,
        area_name: ruleForm.value.province[2].name,
        area_id: ruleForm.value.province[2].id,
        is_default: ruleForm.value.is_default == true ? 1 : 0
      })
    }
    ElMessage.success('操作成功')
    router.go(-1)
  }
  // 获取详情
  const getDetails = async () => {
    const { data } = await reqReturnAddressList({ id: id.value })
    details.value = data.data.data[0]
    ruleForm.value.title = details.value.title
    ruleForm.value.phone = details.value.phone
    ruleForm.value.consignee = details.value.consignee
    ruleForm.value.address = details.value.address
    ruleForm.value.is_default = details.value.is_default == 1
  }
  // 获取城市列表如果有详情数据，就匹配赋值
  const getListCities = async () => {
    const { data } = await reqcitiesList()
    provinceList.value = data.data
    if (details.value) {
      provinceList.value.forEach((item) => {
        if (item.id == details.value.province_id) {
          ruleForm.value.province[0] = item
          getCityList(item)
          item.children.forEach((item1: any) => {
            if (item1.id == details.value.city_id) {
              ruleForm.value.province[1] = item1
              getAreaList(item1)
              item1.children.forEach((item2: any) => {
                if (item2.id == details.value.area_id) {
                  ruleForm.value.province[2] = item2
                }
              })
            }
          })
        }
      })
    }
  }

  onMounted(() => {
    if (route.query.id) {
      id.value = route.query.id
      getDetails()
    }
    // 获取城市列表
    getListCities()
  })
</script>
<style lang="scss" scoped>
  .newAddress-box {
    :deep(.el-card) {
      padding-bottom: 180px;
    }

    .unified-inp {
      width: 522px;
    }
    :deep(.el-form-item__label) {
      line-height: 32px;
      color: #000;
    }
    :deep(.el-button) {
      padding: 0 46px;
      min-height: 32px;
    }
    :deep(.el-form-item__content) {
      line-height: 32px;
      color: #000;
    }
    .province-inp {
      width: 154px;
    }
  }
</style>
