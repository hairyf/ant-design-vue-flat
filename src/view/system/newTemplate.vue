<!--
 * @Author: Mr.wang
 * @Date: 2021-04-14 10:16:45
 * @LastEditTime: 2021-05-08 14:42:31
 * @Description: 新增配送模板
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-form :model="form" ref="noticeForm" :rules="rules" label-width="110px" class="notice-box">
    <el-card shadow="never">
      <el-form-item label="模板名称" prop="dispatch_name">
        <el-input class="sort-inp" v-model="form.dispatch_name" placeholder="请输入模板名称">
        </el-input>
      </el-form-item>
      <el-form-item label="收费方式" prop="calculate_type">
        <el-radio-group v-model="form.calculate_type" :disabled="id != ''">
          <el-radio label="1">按件收费</el-radio>
          <el-radio label="0">按重量收费</el-radio>
        </el-radio-group>
        <div class="tips-text">保存模板后，编辑不可修改</div>
      </el-form-item>
      <el-form-item label="支持配送区域" prop="distributionArea">
        <el-table :data="pieceList" v-if="form.calculate_type == '1'">
          <el-table-column label="支持区域" prop="name">
            <template #default="scope">
              <div v-if="scope.row.name == '全国统一收费'">{{ scope.row.name }}</div>
              <div v-if="scope.row.name != '全国统一收费'">
                <el-cascader
                  class="multiple-inp"
                  v-model="scope.row.name"
                  clearable
                  :options="options"
                  :props="{ value: 'id', label: 'name', children: 'children', multiple: true }"
                ></el-cascader>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="初发件" prop="name">
            <template #default="scope">
              <div class="oe-flex region-inp">
                <div>初发数量</div>
                <el-input v-model="scope.row.initialNum" type="number">
                  <template #append>个</template></el-input
                >
              </div>
              <div class="oe-flex region-inp" style="margin-top: 28px">
                <div>初发运费</div>
                <el-input
                  v-model="scope.row.initialFreight"
                  type="number"
                  @input="scope.row.initialFreight = inputInterception(scope.row.initialFreight)"
                >
                  <template #append>元</template>
                </el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="续发件" prop="name">
            <template #default="scope">
              <div class="oe-flex region-inp">
                <div>续发数量</div>
                <el-input type="number" v-model="scope.row.renewalNum">
                  <template #append>个</template></el-input
                >
              </div>
              <div class="oe-flex region-inp" style="margin-top: 28px">
                <div>续发运费</div>
                <el-input
                  v-model="scope.row.renewaFreight"
                  type="number"
                  @input="scope.row.renewaFreight = inputInterception(scope.row.renewaFreight)"
                >
                  <template #append>元</template>
                </el-input>
              </div>
              <el-button
                v-if="scope.row.name != '全国统一收费'"
                class="delete-btn"
                type="text"
                @click="deleteBtn(scope)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-table :data="weightList" v-if="form.calculate_type == '0'">
          <el-table-column label="支持区域" prop="name">
            <template #default="scope">
              <div v-if="scope.row.name == '全国统一收费'">{{ scope.row.name }}</div>
              <div v-if="scope.row.name != '全国统一收费'">
                <el-cascader
                  class="multiple-inp"
                  clearable
                  v-model="scope.row.name"
                  :options="options"
                  :props="{ value: 'id', label: 'name', children: 'children', multiple: true }"
                >
                </el-cascader>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="初发件" prop="name">
            <template #default="scope">
              <div class="oe-flex region-inp">
                <div>初发首重</div>
                <el-input v-model="scope.row.initialNum" type="number">
                  <template #append>Kg</template></el-input
                >
              </div>
              <div class="oe-flex region-inp" style="margin-top: 28px">
                <div>初发运费</div>
                <el-input
                  v-model="scope.row.initialFreight"
                  type="number"
                  @input="scope.row.initialFreight = inputInterception(scope.row.initialFreight)"
                >
                  <template #append>元</template>
                </el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="续发件" prop="name">
            <template #default="scope">
              <div class="oe-flex region-inp">
                <div>续发续重</div>
                <el-input type="number" v-model="scope.row.renewalNum">
                  <template #append>Kg</template></el-input
                >
              </div>
              <div class="oe-flex region-inp" style="margin-top: 28px">
                <div>续发运费</div>
                <el-input
                  v-model="scope.row.renewaFreight"
                  type="number"
                  @input="scope.row.renewaFreight = inputInterception(scope.row.renewaFreight)"
                >
                  <template #append>元</template>
                </el-input>
              </div>
              <el-button
                v-if="scope.row.name != '全国统一收费'"
                class="delete-btn"
                type="text"
                @click="deleteBtn(scope)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-button type="text" @click="newlyAdded">新增支持配送区域</el-button>
        <div class="tips-text">
          根据发货数量计算相应的运费，当发货数量≤初发数量，按初发费用计算，超过数量则按续发数量/总量与续发费用乘积计算
        </div>
      </el-form-item>
      <el-form-item label="不支持配送区域">
        <el-cascader
          clearable
          class="multiple-inp"
          v-model="form.noDelivery"
          :options="options"
          :props="{
            value: 'id',
            label: 'name',
            children: 'children',
            multiple: true
          }"
        ></el-cascader>
      </el-form-item>
    </el-card>
    <el-card shadow="never" class="operation">
      <div class="oe-flex oe-row-center">
        <el-button plain @click="router.go(-1)">取消</el-button>
        <el-button type="primary" @click="preservationBtn">保存</el-button>
      </div>
    </el-card>
  </el-form>
</template>
<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import { ElMessage } from 'element-plus'
  import { inputInterception } from '@/hooks/reset-time'
  import { reqDeliveryAddModify, reqDistributionList } from '@/api/system'
  import { useRoute, useRouter } from 'vue-router'
  import { reqcitiesList } from '@/api/common'
  import { tailoringText } from '@/utils'
  const router = useRouter()
  const route = useRoute()
  const noticeForm = ref<any>('')
  const form = ref({
    //  模板名称
    dispatch_name: '',
    //  收费方式
    calculate_type: '1',
    // 不配区域
    noDelivery: [] as any[]
  })
  // 城市列表
  const options = ref<any[]>([])
  // 不配送的计算选择城市列表
  const seletes = ref<any>({
    provinces: [] as any[],
    citys: [] as any[],
    areas: [] as any[],
    text: '',
    original: []
  })
  //  按件配送的区域
  const pieceDispatch_area = ref<any[]>([])
  // 按重量配送的区域
  const heavyDispatch_area = ref<any[]>([])
  // 按件收费
  const pieceList = ref<any[]>([
    {
      name: '全国统一收费',
      // 初发数量
      initialNum: '',
      // 初发运费
      initialFreight: '',
      // 续发件
      renewalNum: '',
      // 续发运费
      renewaFreight: ''
    }
  ])
  const id = ref<any>('')
  // 按重量收费
  const weightList = ref([
    {
      name: '全国统一收费',
      // 初发数量
      initialNum: '',
      // 初发运费
      initialFreight: '',
      // 续发件
      renewalNum: '',
      // 续发运费
      renewaFreight: ''
    }
  ])
  // 新增配送模板
  const newlyAdded = () => {
    if (form.value.calculate_type == '1') {
      const template = {
        name: [] as any,
        // 初发数量
        initialNum: '',
        // 初发运费
        initialFreight: '',
        // 续发件
        renewalNum: '',
        // 续发运费
        renewaFreight: ''
      }
      pieceList.value.push(template)
    } else {
      const template = {
        name: [] as any,
        // 初发数量
        initialNum: '',
        // 初发运费
        initialFreight: '',
        // 续发件
        renewalNum: '',
        // 续发运费
        renewaFreight: ''
      }
      weightList.value.push(template)
    }
  }
  //  删除
  const deleteBtn = (row: any) => {
    if (form.value.calculate_type == '1') {
      pieceList.value.splice(row.$index, 1)
    } else {
      weightList.value.splice(row.$index, 1)
    }
  }
  // 获取城市列表
  reqcitiesList().then((res) => {
    options.value = res.data.data
  })
  // 验证
  const distributionVerification = (rule: any, value: any, callback: any) => {
    if (form.value.calculate_type == '1') {
      let adopt = false
      pieceList.value.forEach((item) => {
        adopt =
          item.initialNum != '' &&
          item.initialFreight != '' &&
          item.renewalNum != '' &&
          item.renewaFreight != '' &&
          item.name.length != 0
      })
      if (adopt) {
        callback()
      } else {
        callback(new Error('请填写完整的模板'))
      }
    } else if (form.value.calculate_type == '0') {
      let adopt = false as any
      weightList.value.forEach((item) => {
        adopt =
          item.initialNum != '' &&
          item.initialFreight != '' &&
          item.renewalNum != '' &&
          item.renewaFreight != '' &&
          item.name.length != 0
      })
      if (adopt) {
        callback()
      } else {
        callback(new Error('请填写完整的模板'))
      }
    }
    // else {
    //   callback(new Error())
    // }
  }
  // 验证
  const rules = ref({
    dispatch_name: [{ required: true, message: '请填写模板名称', trigger: 'blur' }],
    calculate_type: [{ required: true, message: '请选择', trigger: 'blur' }],
    distributionArea: [{ required: true, validator: distributionVerification, trigger: 'blur' }]
  })
  // 保存
  const preservationBtn = () => {
    if (form.value.noDelivery.length) {
      obtainText(1)
    }
    noticeForm.value.validate((valid: boolean) => {
      if (valid) {
        // addNotice()
        saveTemplate()
      }
    })
  }
  const saveTemplate = async () => {
    if (form.value.calculate_type == '1') {
      pieceList.value.forEach((item) => {
        if (item.name != '全国统一收费') {
          obtainText(2, item)
        }
      })
      const data = {
        dispatch_name: form.value.dispatch_name,
        calculate_type: form.value.calculate_type,
        start_num: pieceList.value[0].initialNum,
        start_num_price: pieceList.value[0].initialFreight,
        add_num: pieceList.value[0].renewalNum,
        add_num_price: pieceList.value[0].renewaFreight,
        dispatch_area: pieceDispatch_area.value,
        dispatch_limit_area_code: [seletes.value]
      } as any
      if (id.value) {
        data.id = id.value
      }
      await reqDeliveryAddModify(data)
    } else if (form.value.calculate_type == '0') {
      weightList.value.forEach((item) => {
        if (item.name != '全国统一收费') {
          obtainText(3, item)
        }
      })
      const data = {
        dispatch_name: form.value.dispatch_name,
        calculate_type: form.value.calculate_type,
        start_weight: weightList.value[0].initialNum,
        start_weight_price: weightList.value[0].initialFreight,
        add_weight: weightList.value[0].renewalNum,
        add_weight_price: weightList.value[0].renewaFreight,
        dispatch_area: heavyDispatch_area.value,
        dispatch_limit_area_code: [seletes.value]
      } as any
      if (id.value) {
        data.id = id.value
      }
      await reqDeliveryAddModify(data)
    }
    ElMessage.success('操作成功')
    router.go(-1)
  }
  // 公共方法
  const obtainText = (num: number, distributionData?: any) => {
    if (num == 1) {
      const regionFilter = (index: number) => {
        return [
          ...new Set(
            form.value.noDelivery.map((v) => v[index]).filter((v) => typeof v !== 'undefined')
          )
        ]
      }
      seletes.value.provinces = regionFilter(0)
      seletes.value.citys = regionFilter(1)
      seletes.value.areas = regionFilter(2)
      const childrens = options.value.map((item) => item.children)
      const array: string[] = []
      childrens.forEach((children: any[]) => {
        children.forEach((item) => {
          const isSomeChildren = seletes.value.citys.some((v: any) => item.id === v)
          if (!isSomeChildren) return false
          const areas = item.children.filter((item: any) => {
            // eslint-disable-next-line max-nested-callbacks
            return seletes.value.areas.some((v: any) => v === item.id)
          })
          const areaName = tailoringText(areas.map((v: any) => v.name).join(','), 15)
          array.push(`${item.name}${areaName ? `(${areaName})` : ''}`)
        })
      })
      seletes.value.text = array.join(', ')
      seletes.value.original = form.value.noDelivery
    } else if (num == 2 || num == 3) {
      let citys = [] as any[]
      let areas1 = [] as any[]
      const regionFilter = (index: number) => {
        return [
          ...new Set(
            distributionData.name
              .map((v: any) => v[index])
              .filter((v: any) => typeof v !== 'undefined')
          )
        ]
      }
      citys = regionFilter(1)
      areas1 = regionFilter(2)
      const childrens = options.value.map((item) => item.children)
      const array: string[] = []
      childrens.forEach((children: any[]) => {
        children.forEach((item) => {
          const isSomeChildren = citys.some((v: any) => item.id === v)
          if (!isSomeChildren) return false
          const areas = item.children.filter((item: any) => {
            // eslint-disable-next-line max-nested-callbacks
            return areas1.some((v: any) => v === item.id)
          })
          const areaName = tailoringText(areas.map((v: any) => v.name).join(','), 15)
          array.push(`${item.name}${areaName ? `(${areaName})` : ''}`)
        })
      })
      if (num == 2) {
        pieceDispatch_area.value.push({
          provinces: regionFilter(0),
          citys: regionFilter(1),
          areas: regionFilter(2),
          text: array.join(','),
          first_num: distributionData.initialNum,
          first_price: distributionData.initialFreight,
          second_num: distributionData.renewalNum,
          second_price: distributionData.renewaFreight,
          original: distributionData.name
        })
      } else {
        heavyDispatch_area.value.push({
          provinces: regionFilter(0),
          citys: regionFilter(1),
          areas: regionFilter(2),
          text: array.join(','),
          first_num: distributionData.initialNum,
          first_price: distributionData.initialFreight,
          second_num: distributionData.renewalNum,
          second_price: distributionData.renewaFreight,
          original: distributionData.name
        })
      }
    }
  }
  // 获取详情数据
  const restRangeList = async () => {
    const { data } = await reqDistributionList({ id: id.value })
    const detailsData = data.data.data[0]
    if (detailsData.calculate_type == 1) {
      pieceList.value[0].initialNum = detailsData.start_num
      pieceList.value[0].initialFreight = detailsData.start_num_price
      pieceList.value[0].renewalNum = detailsData.add_num
      pieceList.value[0].renewaFreight = detailsData.add_num_price
      detailsData.dispatch_area.forEach((item: any) => {
        item.original = item.original.map((item1: any) => {
          return item1.map(Number)
        })
        pieceList.value.push({
          name: item.original,
          initialNum: item.first_num,
          initialFreight: item.first_price,
          renewalNum: item.second_num,
          renewaFreight: item.second_price
        })
      })
    } else {
      weightList.value[0].initialNum = detailsData.start_weight
      weightList.value[0].initialFreight = detailsData.start_weight_price
      weightList.value[0].renewalNum = detailsData.add_weight
      weightList.value[0].renewaFreight = detailsData.add_weight_price
      detailsData.dispatch_area.forEach((item: any) => {
        item.original = item.original.map((item1: any) => {
          return item1.map(Number)
        })
        weightList.value.push({
          name: item.original,
          initialNum: item.first_num,
          initialFreight: item.first_price,
          renewalNum: item.second_num,
          renewaFreight: item.second_price
        })
      })
    }
    if (detailsData.dispatch_limit_area_code) {
      detailsData.dispatch_limit_area_code[0].original = detailsData.dispatch_limit_area_code[0].original.map(
        (item: any) => {
          return item.map(Number)
        }
      )
      form.value.noDelivery = detailsData.dispatch_limit_area_code[0].original
    }
    form.value.dispatch_name = detailsData.dispatch_name
    form.value.calculate_type = detailsData.calculate_type
    form.value.calculate_type = form.value.calculate_type.toString()
  }
  //  获取详情id
  onMounted(() => {
    if (route.query.id) {
      id.value = route.query.id
      restRangeList()
    }
  })
</script>
<style lang="scss" scoped>
  .notice-box {
    margin-bottom: 150px;
    .sort-inp {
      width: 281px;
    }
    .tips-text {
      color: #8c8c8c;
      font-size: 12px;
    }
    :deep(.el-form-item__label) {
      line-height: 32px;
      color: #000;
    }
    :deep(.el-form-item__content) {
      line-height: 32px;
      color: #000;
    }
    :deep(.cell) {
      position: relative;
      color: #000;
    }
    .delete-btn {
      position: absolute;
      left: 215px;
      top: 30px;
    }
    .operation {
      position: fixed;
      bottom: 0;
      left: 250px;
      z-index: 5;
      right: 20px;
      .el-button {
        padding: 0 46px;
        min-height: 32px;
      }
    }
    .region-inp {
      .el-input {
        margin-left: 14px;
        width: 120px;
      }
      :deep(.el-input-group__append) {
        line-height: 30px;
        padding: 0 10px;
      }
    }
    :deep(.el-input) {
      line-height: none !important;
      height: 100%;
    }
    :deep(.el-input__inner) {
      z-index: 100;
    }
    :deep(.el-cascader) {
      line-height: 32px;
      .el-input {
        width: 300px;
      }
    }
  }
</style>
