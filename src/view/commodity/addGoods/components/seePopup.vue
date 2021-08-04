<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-04-07 21:37:22
 * @LastEditTime: 2021-05-10 14:56:28
 * @Description: 
 * @LastEditors: Pan.Yu.Lin
-->
<template>
  <div class="see-popup">
    <el-dialog title="查看商品" v-model="dialogVisible" width="80%">
      <el-tabs class="custom-tabs" v-model="currentType">
        <el-tab-pane label="基础信息" name="1"></el-tab-pane>
        <el-tab-pane label="商品详情" name="2"></el-tab-pane>
        <el-tab-pane label="商品参数" name="3"></el-tab-pane>
      </el-tabs>

      <div v-show="currentType == '1'">
        <el-row class="product-line">
          <el-col :span="12">
            <div class="product-box">
              <div class="product-left">商品名称</div>
              <div>{{ productDetail.title }}</div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="product-box">
              <div class="product-left">商品主图</div>
              <div>
                <el-image fit="cover" class="product" :src="productDetail.main_picture"></el-image>
              </div>
            </div>
          </el-col>
        </el-row>

        <el-row class="product-line">
          <el-col :span="12">
            <div class="product-box">
              <div class="product-left">副标题</div>
              <div>{{ productDetail.vice_title }}</div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="product-box">
              <div class="product-left">商品主图</div>
              <div class="oe-m-r-14" v-for="item in productDetail.slideshow" :key="item">
                <el-image fit="cover" class="product" :src="item"></el-image>
              </div>
            </div>
          </el-col>
        </el-row>

        <el-row class="product-line">
          <el-col :span="12">
            <div class="product-box">
              <div class="product-left">商品类型</div>
              <div>
                <span v-show="productDetail.goods_type == 1">实体商品</span>
                <span v-show="productDetail.goods_type == 2">虚拟商品</span>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="product-box">
              <div class="product-left">首图视频</div>
              <div>暂无</div>
            </div>
          </el-col>
        </el-row>

        <el-row class="product-line">
          <el-col :span="12">
            <div class="product-box">
              <div class="product-left">商品分类</div>
              <div class="label-product oe-flex-1">
                <el-cascader
                  placeholder="暂无"
                  v-model="productDetail.classId"
                  size="small"
                  :options="commodityClassOptions"
                  :props="classProps"
                  disabled
                >
                </el-cascader>
              </div>
              <!-- <div> 暂无 </div> -->
            </div>
          </el-col>
          <el-col :span="12">
            <div class="product-box">
              <div class="product-left">视频封面图</div>
              <el-image
                v-if="productDetail.video_cover"
                fit="cover"
                class="product"
                :src="productDetail.video_cover"
              ></el-image>
            </div>
          </el-col>
        </el-row>

        <el-row class="product-line">
          <el-col :span="12">
            <div class="product-box">
              <div class="product-left">购买文字按钮</div>
              <div> 跟随店铺装修 </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="product-box">
              <div class="product-left">划线价格</div>
              <div>{{ productDetail.original_price }}</div>
            </div>
          </el-col>
        </el-row>

        <el-row class="product-line">
          <el-col :span="12">
            <div class="product-box">
              <div class="product-left">商品分组</div>
              <div class="label-product oe-flex-1">
                <el-cascader
                  placeholder="暂无"
                  v-model="productDetail.groupId"
                  size="small"
                  :options="productGrouping"
                  :props="classProps"
                  disabled
                >
                </el-cascader>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="product-box">
              <div class="product-left">成本价</div>
              <div>{{ productDetail.cost_price }}</div>
            </div>
          </el-col>
        </el-row>

        <el-row class="product-line">
          <el-col :span="12">
            <div class="product-box">
              <div class="product-left">商品支持</div>
              <!-- <div> 七天无理由退货 </div> -->
              <div class="label-product oe-flex-1">
                <el-cascader
                  placeholder="暂无"
                  v-model="productDetail.serviceId"
                  size="small"
                  :options="productSupport"
                  :props="classProps"
                  disabled
                >
                </el-cascader>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="product-box">
              <div class="product-left">商品详情显示库存</div>
              <div>
                <el-switch
                  disabled
                  v-model="productDetail.stock_show"
                  active-color="#13ce66"
                  :active-value="1"
                  :inactive-value="2"
                >
                </el-switch>
              </div>
            </div>
          </el-col>
        </el-row>

        <el-row class="product-line">
          <el-col :span="12">
            <div class="product-box">
              <div class="product-left">规格类型</div>
              <div v-if="productDetail.norms_type == 1"> 多规格 </div>
              <div v-else> 单规格 </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="product-box">
              <div class="product-left">商品详情显示销量</div>
              <div>
                <el-switch
                  disabled
                  v-model="productDetail.sales_show"
                  active-color="#13ce66"
                  :active-value="1"
                  :inactive-value="2"
                >
                </el-switch>
              </div>
            </div>
          </el-col>
        </el-row>

        <el-row class="product-line">
          <el-col :span="12" v-if="productDetail.norms_type == 1">
            <div class="product-box">
              <div class="product-left">规格详情</div>
              <div class="multi-specification">
                <SeeSkus :skusDate="skusInfo" />
              </div>
            </div>
          </el-col>
          <el-col :span="12" v-if="productDetail.norms_type != 1">
            <div class="product-box">
              <div class="product-left">售卖价格</div>
              <div>{{ productDetail.price }}</div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="product-box">
              <div class="product-left">商品编码</div>
              <div>{{ productDetail.goods_code }}</div>
            </div>
          </el-col>
        </el-row>

        <el-row class="product-line">
          <el-col :span="12" v-if="productDetail.norms_type != 1">
            <div class="product-box">
              <div class="product-left">商品库存</div>
              <div>{{ productDetail.stock }}</div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="product-box">
              <div class="product-left">商品条形码</div>
              <div>{{ productDetail.bar_code }}</div>
            </div>
          </el-col>
        </el-row>

        <el-row class="product-line">
          <el-col :span="12">
            <div class="product-box">
              <div class="product-left">库存预警</div>
              <div>{{ productDetail.stock_warning }}</div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="product-box">
              <div class="product-left">仓库中</div>
              <div>
                <el-switch
                  disabled
                  v-model="productDetail.timing_sold_out"
                  active-color="#13ce66"
                  :active-value="2"
                  :inactive-value="1"
                >
                </el-switch>
              </div>
            </div>
          </el-col>
        </el-row>

        <el-row class="product-line">
          <el-col :span="12">
            <div class="product-box">
              <div class="product-left">已售出件数</div>
              <div>{{ productDetail.sales }}</div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="product-box">
              <div class="product-left">开启限购</div>
              <div>
                <el-switch
                  disabled
                  v-model="productDetail.start_purchase_limit"
                  active-color="#13ce66"
                  :active-value="2"
                  :inactive-value="1"
                >
                </el-switch>
              </div>
            </div>
          </el-col>
        </el-row>

        <el-row class="product-line">
          <el-col :span="12">
            <div class="product-box">
              <div class="product-left">自动发货</div>
              <div>
                <span v-show="productDetail.auto_shipments == 1">否</span>
                <span v-show="productDetail.auto_shipments == 2">是</span>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="product-box">
              <div class="product-left">状态</div>
              <div>
                <span v-show="productDetail.goods_state == 1">待出售</span>
                <span v-show="productDetail.goods_state == 2">出售中</span>
                <span v-show="productDetail.goods_state == 3">已售罄</span>
                <span v-show="productDetail.goods_state == 5">仓库中</span>
              </div>
            </div>
          </el-col>
        </el-row>

        <el-row class="product-line">
          <el-col :span="12">
            <div class="product-box">
              <div class="product-left">自动发货内容</div>
              <div>
                {{ productDetail.auto_shipments_dec }}
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="product-box">
              <div class="product-left">浏览权限</div>
              <div> 全部会员 </div>
            </div>
          </el-col>
        </el-row>

        <el-row class="product-line">
          <el-col :span="12">
            <div class="product-box">
              <div class="product-left">商品标签</div>
              <div class="label-product oe-flex-1">
                <el-cascader
                  placeholder="暂无"
                  v-model="productDetail.tabId"
                  size="small"
                  :options="commodityTabOptions"
                  :props="classProps"
                  disabled
                >
                </el-cascader>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="product-box">
              <div class="product-left">参与会员权益</div>
              <div>
                <span v-if="productDetail.member_equities?.length >= 2">会员价\会员等级折扣</span>
                <span v-else-if="productDetail.member_equities?.includes('2')">会员价</span>
                <span v-else-if="productDetail.member_equities?.includes('3')">会员等级折扣</span>
              </div>
            </div>
          </el-col>
        </el-row>

        <el-row class="product-line">
          <el-col :span="12">
            <div class="product-box">
              <div class="product-left">购买权限</div>
              <div> 全部会员 </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div v-show="currentType == '2'">
        <div class="picture-preview">
          <div class="goods-detail" v-html="productDetail.goods_detail"></div>
          <el-image
            fit="cover"
            src="/custom-assets/images/addgoods/add-goods-detail.png"
          ></el-image>
        </div>
      </div>
      <div v-show="currentType == '3'">
        <div v-if="productDetail.goods_param_type == 2">
          <div class="picture-preview">
            <div class="goods-detail">
              <div class="detail-list">
                <div
                  class="detail-item"
                  :class="index == productDetail.goods_param.length - 1 ? 'border-hidn' : ''"
                  v-for="(el, index) in productDetail.goods_param"
                  :key="el.id"
                >
                  <div class="detail-item-son left">{{ el.name }}</div>
                  <div class="detail-item-son">{{ el.summarize }}</div>
                </div>
              </div>
            </div>
            <el-image
              fit="cover"
              src="/custom-assets/images/addgoods/add-goods-detail.png"
            ></el-image>
          </div>
        </div>
        <div v-if="productDetail.goods_param_type == 3">
          <div class="picture-preview">
            <div class="goods-detail">
              <el-image
                fit="cover"
                v-if="!!productDetail.goods_param"
                style="width: 82px; height: 82px"
                :src="productDetail.goods_param"
              ></el-image>
            </div>
            <el-image
              fit="cover"
              src="/custom-assets/images/addgoods/add-goods-detail.png"
            ></el-image>
          </div>
        </div>
        <div v-if="productDetail.goods_param_type == 4">
          <div class="picture-preview">
            <div class="goods-detail">
              <div class="detail-list">
                <div
                  class="detail-item"
                  :class="index == productDetail.goods_param.length - 1 ? 'border-hidn' : ''"
                  v-for="(el, index) in productDetail.goods_param"
                  :key="el.id"
                >
                  <div class="detail-item-son left">{{ el.name }}</div>
                  <div class="detail-item-son">{{ el.summarize }}</div>
                </div>
              </div>
            </div>
            <el-image
              fit="cover"
              src="/custom-assets/images/addgoods/add-goods-detail.png"
            ></el-image>
          </div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="jumpAddProduct">编 辑</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
  import { ref, defineProps, defineEmit, computed } from 'vue'
  import {
    reqGoodsClassList,
    reqGoodsGroupList,
    reqGoodsServiceList,
    reqGoodsGoodsTabList
  } from '@/api/commodity'
  import { useRouter } from 'vue-router'
  import SeeSkus from './see-skus.vue'
  const router = useRouter()
  const props = defineProps({
    modelValue: {
      type: Boolean,
      required: true
    },
    productDetail: {
      type: Object,
      required: true
    },
    skusInfo: {
      type: Object,
      required: true
    }
  })
  const jumpAddProduct = () => {
    router.push({ path: '/commodity/addGoods', query: { id: props.productDetail.id } })
  }
  const emit = defineEmit(['update:modelValue'])
  const dialogVisible = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
  })
  // 公共props配置
  const classProps = {
    multiple: true,
    expandTrigger: 'hover',
    value: 'id',
    label: 'name',
    checkStrictly: true,
    emitPath: false
  } as any
  // 分类
  const commodityClassOptions = ref<any[]>([])
  reqGoodsClassList().then((res) => {
    commodityClassOptions.value = res.data.data.data
  })
  // 标签
  const commodityTabOptions = ref<any[]>([])
  reqGoodsGoodsTabList().then((res) => {
    commodityTabOptions.value = res.data.data.data
  })
  // 分组
  const productGrouping = ref<any>()
  reqGoodsGroupList({ page: 1, limit: 100 }).then((res) => {
    productGrouping.value = res.data.data.data
  })
  // 支持
  const productSupport = ref<any>()
  reqGoodsServiceList({ page: 1, limit: 100 }).then((res) => {
    productSupport.value = res.data.data.data
  })
  const currentType = ref('1')
</script>
<style lang="scss">
  .see-popup {
    .el-dialog__title {
      font-size: 16px;
      font-weight: bold;
    }
  }
</style>
<style lang="scss" scoped>
  .label-product {
    :deep(.el-input) {
      line-height: none !important;
      height: 100%;
    }
  }
  .product-line {
    margin-bottom: 28px;
    color: #000;
    .product-box {
      display: flex;
      .product-left {
        margin-right: 14px;
      }
      .multi-specification {
        width: 90%;
      }
      .product {
        width: 48px;
        height: 48px;
      }
    }
  }

  .picture-preview {
    position: relative;
    width: 300px;
    height: 570px;
    .goods-detail {
      position: absolute;
      top: 130px;
      left: 20px;
      width: 85%;
      height: 65%;
      color: #000;
      background-color: #fff;
      z-index: 3;
      overflow: scroll;
      .detail-list {
        .detail-item {
          display: flex;
          &.border-hidn {
            border-bottom: 1px solid #8c8c8c;
          }
          .detail-item-son {
            &.left {
              border-right: none;
            }
            width: 50%;
            height: 14px;
            padding: 9px 14px;
            border: 1px solid #8c8c8c;
            border-bottom: none;
            font-size: 12px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
    .el-image {
      width: 100%;
      height: 100%;
    }
  }
</style>
