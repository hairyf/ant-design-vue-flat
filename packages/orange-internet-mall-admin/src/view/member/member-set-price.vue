<!--
 * @Author: Mr.wang
 * @Date: 2021-03-19 14:45:41
 * @LastEditTime: 2021-05-12 09:56:28
 * @Description: 会员价
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <template v-if="commodityData.norms_type == 0">
    <el-card shadow="never" class="price-head">
      <el-row :gutter="20">
        <el-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
          <span style="color: #000">会员价商品</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
          <div class="oe-flex commodity-box">
            <div class="oe-flex member-name oe-flex-1">
              <el-image :src="commodityData.main_picture" class="member-name-img" />
              <div class="member-right">
                <div class="member-name-text">{{ commodityData.title }}</div>
                <el-tag
                  size="mini"
                  color="#D4EBFF"
                  style="color: #55adff"
                  v-if="commodityData.goods_type == '2'"
                  >虚拟</el-tag
                >
                <el-tag
                  size="mini"
                  color="#FBDDD1"
                  style="color: #ec672e"
                  v-if="commodityData.goods_type == '3'"
                  >卡密</el-tag
                >
                <el-tag
                  size="mini"
                  color="#E4FFF8"
                  style="color: #1ad370"
                  v-if="commodityData.goods_type == '1'"
                  >实体</el-tag
                >
                <el-tag
                  size="mini"
                  color="#F4DFD3"
                  style="color: #ef864c"
                  v-if="commodityData.goods_type == '4'"
                  >计时/次</el-tag
                >
                <el-tag
                  size="mini"
                  color="#F8E8CF"
                  style="color: #dd8a0d"
                  v-if="commodityData.goods_type == '5'"
                  >预约</el-tag
                >
                <el-tag
                  size="mini"
                  color="#E9D4F9"
                  style="color: #8f29df"
                  v-if="commodityData.goods_type == '6'"
                  >批发</el-tag
                >
              </div>
            </div>
            <div class="is-color oe-flex-1">价格: ¥{{ commodityData.price }}</div>
            <div class="oe-flex-1">销量: {{ commodityData.sales }}</div>
            <div class="oe-flex-1">库存: {{ commodityData.stock }}</div>
            <div class="oe-flex-1">
              商品状态：<template v-if="commodityData.goods_state == 1">待出售</template>
              <template v-if="commodityData.goods_state == 2">出售中</template>
              <template v-if="commodityData.goods_state == 5">仓库中</template>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-card shadow="never" class="custom-card-page">
      <el-row :gutter="20">
        <el-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
          <div class="oe-flex">
            <div class="switch-text">会员价</div> <el-switch v-model="status"> </el-switch>
          </div>
        </el-col>
      </el-row>
      <el-table
        v-if="status"
        ref="multipleTable"
        :data="rankList"
        style="width: 70%"
        class="price-list"
      >
        <el-table-column prop="name" label="等级名称"></el-table-column>
        <el-table-column prop="name" label="等级"></el-table-column>
        <el-table-column prop="shop_user_num" label="会员数"> </el-table-column>
        <el-table-column prop="address" label="价格">
          <template #default="scope">
            <el-input
              class="grade-form-width"
              type="number"
              v-model="scope.row.price"
              @input="scope.row.price = inputInterception(scope.row.price)"
              ><template #append>元</template></el-input
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </template>
  <template v-if="commodityData.norms_type == 1">
    <el-card shadow="never" class="price-head">
      <el-row :gutter="20">
        <el-col :xl="8" :lg="8" :md="8" :sm="8" :xs="8">
          <span style="color: #000">会员价商品</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
          <div class="oe-flex commodity-box">
            <div class="oe-flex member-name">
              <el-image :src="commodityData.main_picture" class="member-name-img" />
              <div class="member-right">
                <div class="oe-flex">
                  <div class="member-name-text">{{ commodityData.title }}</div>
                  <div class="specification">多规格</div>
                </div>
                <el-tag
                  size="mini"
                  color="#D4EBFF"
                  style="color: #55adff"
                  v-if="commodityData.goods_type == '2'"
                  >虚拟</el-tag
                >
                <el-tag
                  size="mini"
                  color="#FBDDD1"
                  style="color: #ec672e"
                  v-if="commodityData.goods_type == '3'"
                  >卡密</el-tag
                >
                <el-tag
                  size="mini"
                  color="#E4FFF8"
                  style="color: #1ad370"
                  v-if="commodityData.goods_type == '1'"
                  >实体</el-tag
                >
                <el-tag
                  size="mini"
                  color="#F4DFD3"
                  style="color: #ef864c"
                  v-if="commodityData.goods_type == '4'"
                  >计时/次</el-tag
                >
                <el-tag
                  size="mini"
                  color="#F8E8CF"
                  style="color: #dd8a0d"
                  v-if="commodityData.goods_type == '5'"
                  >预约</el-tag
                >
                <el-tag
                  size="mini"
                  color="#E9D4F9"
                  style="color: #8f29df"
                  v-if="commodityData.goods_type == '6'"
                  >批发</el-tag
                >
              </div>
            </div>
            <div class="commodity-status">
              商品状态：<template v-if="commodityData.goods_state == 1">待出售</template>
              <template v-if="commodityData.goods_state == 2">出售中</template>
              <template v-if="commodityData.goods_state == 5">仓库中</template>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xl="8" :lg="8" :md="8" :sm="8" :xs="8">
          <div class="product-box">
            <el-form label-width="120px">
              <el-form-item label="商品规格：">
                <div class="oe-flex">
                  <div v-for="(v, k, i) in commodityData.option[0].titles"
                    >{{ k }}&nbsp;
                    <!-- <template v-if="i != commodityData.option[0].titles.length - 1">/</template> -->
                  </div>
                </div>
                <div
                  class="oe-flex"
                  v-for="(item, index) in commodityData.option"
                  :key="Number(index)"
                >
                  <div class="oe-flex-1 product-text">{{ item.title }}</div>
                  <div class="oe-flex-1 product-text">￥{{ item.price }}</div>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-card shadow="never" class="custom-crad-container custom-card-page">
      <el-row :gutter="20">
        <el-col :xl="8" :lg="8" :md="8" :sm="8" :xs="8">
          <div class="oe-flex">
            <div class="switch-text">会员价</div> <el-switch v-model="status"> </el-switch>
          </div>
        </el-col>
      </el-row>
      <template v-if="status">
        <el-row :gutter="20">
          <el-radio-group
            class="grade-radio-consumption"
            v-model="labelGradeGroud"
            @change="switchMember"
          >
            <el-radio-button v-for="item in rankList" :key="item.name" border :label="item.id">{{
              item.name
            }}</el-radio-button>
          </el-radio-group>
        </el-row>
        <el-row :gutter="20">
          <el-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
            <el-table
              ref="multipleTable"
              :data="[0]"
              style="width: 700px"
              class="specifications-box"
            >
              <el-table-column prop="title" label="商品规格">
                <template #default="scope">
                  <div v-for="item in multiDetail.option" :key="item.CATCH_ID">{{
                    item.title
                  }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="address" label="价格" min-width="100">
                <template #default="scope">
                  <div v-for="item in multiDetail.option" :key="item.CATCH_ID">
                    {{ item.price }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="name" min-width="70" label="会员等级">
                {{ multiDetail.name }}
              </el-table-column>
              <el-table-column prop="address" min-width="70" label="会员价">
                <template #default="scope">
                  <div v-for="item in multiDetail.option" :key="item.CATCH_ID">
                    <el-input
                      v-model="item.membershipPrice"
                      @input="item.membershipPrice = inputInterception(item.membershipPrice)"
                      type="number"
                    >
                      <template #append>元</template>
                    </el-input>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </template>
    </el-card>
  </template>
  <el-card shadow="never" class="member-price-card">
    <div class="oe-flex oe-row-center">
      <el-button @click="router.go(-1)">取消</el-button>
      <el-button type="primary" @click="preservation">保存</el-button>
    </div>
  </el-card>
</template>
<script setup lang="ts">
  import { reqGradeList, reqMembershipPriceList, reqAddMemberPrice } from '@/api/member'
  import { onMounted, ref } from 'vue'
  import { ElMessage } from 'element-plus'
  import { inputInterception } from '@/hooks/reset-time'
  import { useRoute, useRouter } from 'vue-router'
  import { cloneDeep } from 'lodash'
  // 当前容器元素
  const multipleTable = ref<any>()
  const route = useRoute()
  const router = useRouter()
  // 商品id
  const goods_id = ref<any>()
  // 是否开启会员价
  const status = ref(true)
  // 等级列表
  const rankList = ref<any[]>([])
  // 商品详情数据
  const commodityData = ref<any>({})
  // 多规格的当前等级
  const labelGradeGroud = ref()
  // 多规格的会员价
  const multiDetail = ref<any>({})
  // 商品详情数据获取
  const getCommodityList = async () => {
    const { data } = await reqMembershipPriceList({ id: goods_id.value })
    commodityData.value = data.data.data[0]
    status.value = commodityData.value.vip_price_type == 1
    getGradeList()
  }
  // 等级获取
  const getGradeList = async () => {
    const { data } = await reqGradeList({ page: 1, limit: 100 })
    rankList.value = data.data.data
    if (commodityData.value.vip_price.info && commodityData.value.norms_type == 0) {
      rankList.value.forEach((item) => (item.price = ''))
      for (let i = 0; i < rankList.value.length; i++) {
        for (let k = 0; k < commodityData.value.vip_price.info.length; k++) {
          if (rankList.value[i].id == commodityData.value.vip_price.info[k].level_id) {
            rankList.value[i].price = commodityData.value.vip_price.info[k].price
          }
        }
      }
    } else {
      labelGradeGroud.value = rankList.value[0].id
      rankList.value.forEach((item: any) => {
        item.option = cloneDeep(commodityData.value.option)
        item.option.forEach((item1: any) => {
          item1.membershipPrice = ''
        })
      })
      if (commodityData.value.sku_vip_price) {
        commodityData.value.sku_vip_price.forEach((item1: any) => {
          rankList.value.forEach((item) => {
            if (item1.level_id == item.id) {
              item.option.forEach((item2: any) => {
                // eslint-disable-next-line max-nested-callbacks
                item1.list.forEach((item3: any) => {
                  if (item3.sku_id == item2.id) {
                    item2.membershipPrice = item3.price
                  }
                })
              })
            }
          })
        })
      }
      multiDetail.value = rankList.value[0]
    }
  }
  const switchMember = (val: any) => {
    rankList.value.forEach((item: any) => {
      if (val == item.id) {
        multiDetail.value = item
      }
    })
  }
  // 保存
  const preservation = async () => {
    if (commodityData.value.norms_type == 0) {
      const empty = false
      // if (status.value) {
      //   empty = rankList.value.some((item: any) => {
      //     if (item.price == '') {
      //       return true
      //     }
      //     return false
      //   })
      // }

      if (!empty) {
        const member_price = [] as any[]
        rankList.value.forEach((item: any) => {
          member_price.push({ level_id: item.id, price: item.price })
        })
        await reqAddMemberPrice({
          goods_id: goods_id.value,
          status: status.value ? '1' : '0',
          member_price
        })
        ElMessage.success('操作成功')
        router.go(-1)
      } else {
        ElMessage('请至少输入一个会员价格')
      }
    } else {
      const arr = [] as any[]
      rankList.value.forEach((item: any) => {
        item.option.forEach((item1: any) => {
          arr.push({
            goods_sku_id: item1.id,
            level_id: item.id,
            price: item1.membershipPrice
          })
        })
      })
      await reqAddMemberPrice({
        goods_id: goods_id.value,
        status: status.value ? '1' : '0',
        member_price: arr
      })
      ElMessage.success('操作成功')
      router.go(-1)
    }
  }
  onMounted(() => {
    goods_id.value = route.query.id
    getCommodityList()
  })
</script>
<style lang="scss" scoped>
  @import '@/style/mixin.scss';
  .price-head {
    :deep(.el-button) {
      padding: 0 44px;
    }
    :deep(.el-form-item__label) {
      color: #000;
      font-size: 14px;
    }
    :deep(.el-form-item__content) {
      line-height: 32px;
    }
    .screen-btn {
      margin-left: 35px;
    }
    .reset-text {
      cursor: pointer;
      margin-left: 40px;
      color: var(--color-primary);
    }
  }
  .custom-card-page {
    margin-top: 20px;
    padding-bottom: 85px;

    :deep(.el-card) {
      min-height: 550px;
    }
    .switch-text {
      font-size: 14px;
      color: #000;
      margin-right: 7px;
    }
  }
  .commodity-box {
    padding-top: 12px;
    div {
      font-size: 14px;
      color: #000;
    }
    .member-right {
      flex: 1;
      margin-left: 10px;
    }
    :deep(.el-tag) {
      border-width: 0;
      border-radius: 0;
    }
    .member-name-text {
      margin-bottom: 6px;
    }
    .member-name {
      .member-name-img {
        width: 50px;
        height: 50px;
      }
    }
  }
  .price-list {
    :deep(.cell) {
      color: #000;
    }
    .grade-form-width {
      width: 110px;
      :deep(.el-input-group__append) {
        padding: 0 8px;
        line-height: 30px;
      }
    }
  }
  .commodity-status {
    font-size: 14px;
    color: #000;
    margin-left: 100px;
    .specification {
      margin-left: 6px;
      font-size: 12px;
      border-radius: 2px;
      padding: 0 4px;
      line-height: 15px;
      color: var(--color-primary);
      border: 1px solid var(--color-primary);
    }
  }
  .grade-radio-consumption {
    margin-top: 25px;
    :deep(.el-radio-button__inner) {
      margin: 0 10px;
      padding: 10px 14px;
      border-left: 1px solid #d9d9d9;
      color: #000;
    }
    :deep(.el-radio-button:last-child .el-radio-button__inner) {
      border-radius: 2px;
    }
    :deep(.el-radio-button:first-child .el-radio-button__inner) {
      border: 1px solid #d9d9d9;
    }
    :deep(.el-radio-button__orig-radio:checked + .el-radio-button__inner) {
      border: 1px solid var(--color-primary);
      color: #fff;
    }
  }
  .member-price-card {
    position: fixed;
    bottom: 0;
    left: 250px;
    z-index: 5;
    right: 20px;
    :deep(.el-button) {
      padding: 0;
      min-height: 32px;
      width: 120px;
    }
  }
  .specification {
    margin-left: 6px;
    font-size: 12px;
    border-radius: 2px;
    padding: 0 4px;
    line-height: 15px;
    color: var(--color-primary) !important;
    border: 1px solid var(--color-primary);
  }
  .product-box {
    margin-top: 20px;
    :deep(.el-form-item__label) {
      line-height: 30px;
    }
    .product-title {
      font-size: 14px;
      color: #000;
      font-weight: 500;
    }
    .product-text {
      font-size: 12px;
      line-height: 25px;
      color: #333;
    }
  }
  .specifications-box {
    div {
      line-height: 32px;
    }
    :deep(.el-input) {
      height: 24px;
      line-height: 24px;
    }
    :deep(.el-input__inner) {
      height: 24px;
      line-height: 24px;
    }
    :deep(.cell) {
      color: #000;
    }
    :deep(.el-input-group__append) {
      padding: 0 10px;
      line-height: 22px;
    }
  }
</style>
