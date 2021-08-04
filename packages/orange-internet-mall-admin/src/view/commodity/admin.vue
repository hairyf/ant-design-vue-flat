<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-03-19 14:46:13
 * @LastEditTime: 2021-05-13 09:52:58
 * @Description: 商品管理
 * @LastEditors: Pan.Yu.Lin
-->
<template>
  <div class="admin-box">
    <el-card shadow="never" class="oe-m-b-15">
      <el-row :gutter="60">
        <el-col class="form-item layout-media" :xs="12" :sm="12" :lg="8" :xl="{ span: '4_8' }">
          <span class="tips">商品名称</span>
          <el-input @keyup.enter="searchData" v-model="formInfo.title" placeholder="输入产品名称" />
        </el-col>
        <el-col class="form-item layout-media" :xs="12" :sm="12" :lg="8" :xl="{ span: '4_8' }">
          <span class="tips">商品状态</span>
          <el-select clearable v-model="formInfo.goods_state" placeholder="全部">
            <el-option
              v-for="item in stateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>

        <el-col class="form-item" :xs="12" :sm="12" :lg="8" :xl="{ span: '4_8' }">
          <span class="tips">商品分组</span>
          <el-select clearable v-model="formInfo.groupId" placeholder="全部">
            <el-option
              v-for="item in commodityGroupingOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-col>

        <el-col class="form-item" :xs="12" :sm="12" :lg="8" :xl="{ span: '4_8' }">
          <span class="tips">服务支持</span>
          <el-select clearable v-model="formInfo.serviceId" placeholder="全部">
            <el-option
              v-for="item in commoditySupportOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-col>
        <el-col class="form-item" :xs="12" :sm="12" :lg="8" :xl="{ span: '4_8' }">
          <span class="tips">商品类型</span>
          <el-select clearable v-model="formInfo.goods_type" placeholder="全部">
            <el-option
              v-for="item in commodityTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>

        <el-col :xs="12" :sm="12" :lg="8" :xl="{ span: '4_8' }">
          <sectionInput
            @keyup.enter="searchData"
            v-model="formInfo.virtual_sales"
            :titleTetx="'虚拟销量'"
          ></sectionInput>
        </el-col>

        <el-col :xs="12" :sm="12" :lg="8" :xl="{ span: '4_8' }">
          <sectionInput
            @keyup.enter="searchData"
            v-model="formInfo.sales"
            :titleTetx="'实际销量'"
          ></sectionInput>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="8" :xl="{ span: '4_8' }">
          <sectionInput
            @keyup.enter="searchData"
            v-model="formInfo.price"
            :titleTetx="'商品价格'"
          ></sectionInput>
        </el-col>
        <el-col class="form-item" :xs="12" :sm="12" :lg="8" :xl="{ span: '4_8' }">
          <span class="tips">商品标签</span>
          <div class="label-product oe-flex-1">
            <el-cascader
              placeholder="全部"
              v-model="formInfo.tabId"
              size="small"
              :options="commodityTabOptions"
              :props="classProps"
              clearable
              collapse-tags
            >
            </el-cascader>
          </div>
        </el-col>
        <el-col class="form-item" :xs="12" :sm="12" :lg="8" :xl="{ span: '4_8' }">
          <el-button @click="searchData" class="search-button" type="primary" size="small"
            >搜索</el-button
          >
          <el-button @click="recharge" class="search-button" type="text" size="small"
            >重置条件</el-button
          >
        </el-col>
      </el-row>
    </el-card>
    <div class="table-min-height">
      <el-card shadow="never">
        <div class="table-title">
          <el-button type="primary" class="add-goods" size="small" @click="jumpAddGoods('-1')">
            <div class="add-button-box">
              <i class="ad-shapePlus"></i>
              <span class="text">新增商品</span>
            </div>
          </el-button>
          <span class="product-count">商品总数：{{ pagination.total }}</span>
        </div>
        <el-tabs class="custom-tabs" v-model="formInfo.goods_state">
          <el-tab-pane label="全部商品" name=" "></el-tab-pane>
          <el-tab-pane label="待出售" name="1"></el-tab-pane>
          <el-tab-pane label="出售中" name="2"></el-tab-pane>
          <el-tab-pane label="上架隐藏" name="3"></el-tab-pane>
          <el-tab-pane label="仓库中" name="5"></el-tab-pane>
        </el-tabs>
        <el-table
          :border="false"
          class="goods-list"
          ref="multipleTable"
          :data="goodsList"
          tooltip-effect="dark"
          style="width: 100%"
          @select-all="handlSelectAll"
          @selection-change="handleSelectionChange"
          :default-sort="{ prop: 'id', order: 'descending' }"
        >
          <template v-slot:empty>
            <el-empty class="oe-m-t-30" description="暂无商品" />
          </template>
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="商品ID" width="120" prop="id" sortable></el-table-column>
          <el-table-column label="商品" width="220">
            <template #default="scope">
              <div class="goods">
                <div class="picture oe-m-r-10">
                  <el-image fit="cover" class="image" :src="scope.row.main_picture" />
                </div>
                <div class="classification">
                  <div class="navigation">
                    <div class="name">{{ scope.row.title }}</div>
                    <el-tag v-if="scope.row.norms_type == 1">多规格</el-tag>
                  </div>
                  <el-tag
                    v-if="scope.row.goods_type == 1"
                    size="mini"
                    class="label-type"
                    type="success"
                    >实体</el-tag
                  >
                  <el-tag v-else size="mini" class="label-type">虚拟</el-tag>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="价格">
            <template #default="scope">
              <span v-if="scope.row.isShowPrice" @click="changeSpecifications(scope.row, 'price')">
                ¥{{ scope.row.price }}
              </span>
              <el-input
                v-else
                type="number"
                @keyup.enter="changePrice(scope.row, 'price')"
                @blur="cancelEditPrice(scope.row, 'price')"
                v-focus
                v-model="scope.row.price"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="库存" prop="stock" sortable>
            <template #default="scope">
              <span
                :class="scope.row.stock < scope.row.stock_warning ? 'stock-color-red' : ''"
                v-if="scope.row.isShowStock"
                @click="changeSpecifications(scope.row, 'stock')"
              >
                {{ scope.row.stock }}
              </span>
              <el-input
                v-else
                type="number"
                @keyup.enter="changePrice(scope.row, 'stock')"
                @blur="cancelEditPrice(scope.row, 'stock')"
                v-focus
                v-model="scope.row.stock"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="virtual_sales" label="虚拟销量" sortable></el-table-column>
          <el-table-column prop="sales" label="实际销量" sortable></el-table-column>
          <el-table-column label="营销标签" width="200">
            <template #default="scope">
              <div class="oe-flex label-layout">
                <custom-button
                  class="oe-m-l-14"
                  v-show="marketingLabel(scope.row.marketing_tab, '1')"
                  color="#f00"
                  >推荐</custom-button
                >
                <el-button
                  class="oe-m-l-14"
                  v-show="marketingLabel(scope.row.marketing_tab, '2')"
                  type="primary"
                  >新品</el-button
                >
                <custom-button
                  class="oe-m-l-14"
                  v-show="marketingLabel(scope.row.marketing_tab, '3')"
                  color="#FF8A65"
                  >热销</custom-button
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column label="商品状态" width="130">
            <template #default="scope">
              <span v-show="scope.row.goods_state == 1">待出售</span>
              <span v-show="scope.row.goods_state == 2">出售中</span>
              <span v-show="scope.row.goods_state == 3">上架隐藏</span>
              <span v-show="scope.row.goods_state == 4">定时上架</span>
              <span v-show="scope.row.goods_state == 5">仓库中</span>
            </template>
          </el-table-column>
          <el-table-column label="新增时间" width="200" sortable>
            <template #default="scope">
              <span v-if="scope.row.createtime != 0">{{ formatUnix(scope.row.createtime) }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column label="操作" width="200">
            <template #default="scope">
              <div class="edit oe-flex">
                <custom-button
                  icon="ad-see"
                  @click="seeDetails(scope.row.id)"
                  color="#FE6712"
                  class="public-move-left"
                  >查看</custom-button
                >
                <el-button
                  @click="jumpAddGoods(scope.row.id)"
                  type="primary"
                  size="mini"
                  icon="ad-edit"
                  >编辑</el-button
                >
              </div>
              <div class="edit oe-flex">
                <custom-button icon="ad-extension" color="#2DB6F5" class="public-move-left"
                  >推广</custom-button
                >

                <el-dropdown trigger="click" @command="handleCommand(scope.row.id, $event)">
                  <custom-button icon="ad-more" color="#000000" class="public-move-left"
                    >更多</custom-button
                  >
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item
                        v-if="scope.row.goods_state != 1 && scope.row.goods_state != 5"
                        command="1"
                        >下架</el-dropdown-item
                      >
                      <el-dropdown-item
                        v-if="
                          scope.row.goods_state != 2 &&
                          scope.row.goods_state != 3 &&
                          scope.row.goods_state != 1
                        "
                        command="2"
                        >上架</el-dropdown-item
                      >
                      <el-dropdown-item command="3">复制</el-dropdown-item>
                      <el-dropdown-item command="4">删除</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </template>
          </el-table-column> -->

          <el-table-column label="操作" width="260">
            <template #default="scope">
              <div class="edit oe-flex">
                <custom-button
                  icon="ad-see"
                  @click="seeDetails(scope.row.id)"
                  color="#FE6712"
                  class="public-move-left oe-m-l-0"
                  >查看</custom-button
                >
                <el-button
                  @click="jumpAddGoods(scope.row.id)"
                  type="primary"
                  size="mini"
                  icon="ad-edit"
                  >编辑</el-button
                >
                <el-dropdown trigger="click" @command="handleCommand(scope.row.id, $event)">
                  <custom-button icon="ad-more" color="#000000" class="public-move-left"
                    >更多</custom-button
                  >
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item
                        v-if="scope.row.goods_state != 1 && scope.row.goods_state != 5"
                        command="1"
                        >下架</el-dropdown-item
                      >
                      <el-dropdown-item
                        v-if="
                          scope.row.goods_state != 2 &&
                          scope.row.goods_state != 3 &&
                          scope.row.goods_state != 1
                        "
                        command="2"
                        >上架</el-dropdown-item
                      >
                      <!-- <el-dropdown-item command="3">复制</el-dropdown-item> -->
                      <el-dropdown-item command="4">删除</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="goods-list-footer">
          <div class="select-all">
            <el-checkbox class="oe-m-r-14" v-model="selectAll" @change="handleCheckAllDatChange">
              全选当前页
            </el-checkbox>
            <el-button :disabled="selectList.length ? false : true" @click="putAll" type="text">
              上架
            </el-button>
            <el-button
              :disabled="selectList.length ? false : true"
              @click="offAll"
              type="text"
              class="oe-m-r-14"
            >
              下架
            </el-button>
            <!-- <el-button @click="classDialogVisible = true" type="text">分类</el-button> -->
            <el-dropdown trigger="click" @command="handleCommandAll">
              <el-button :disabled="selectList.length ? false : true" type="text"> 更多 </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <!-- <el-dropdown-item command="1">商品分组</el-dropdown-item>
                  <el-dropdown-item command="2">服务支持</el-dropdown-item>
                  <el-dropdown-item command="3">运费模板</el-dropdown-item> -->
                  <el-dropdown-item command="4">删除</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <div class="completePager">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pagination.currentPage"
              :page-sizes="pagination.pageSizes"
              :page-size="pagination.pageSize"
              :total="pagination.total"
              layout="total, sizes, prev, pager, next, jumper"
            >
            </el-pagination>
          </div>
        </div>
      </el-card>
    </div>

    <!-- 分类弹框 -->
    <el-dialog title="提示" v-model="classDialogVisible" width="30%">
      <span class="tips oe-m-r-14">商品标签</span>
      <el-cascader
        v-model="classList"
        size="small"
        :options="classOptions"
        :props="classProps"
        clearable
        collapse-tags
      >
      </el-cascader>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="classDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="classDialogVisible = false">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 分组弹框 -->
    <el-dialog title="提示" v-model="groupDialogVisible" width="30%">
      <span class="tips oe-m-r-14">商品分组</span>
      <el-select clearable v-model="groupList" placeholder="请选择">
        <el-option
          v-for="item in groupOptions"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="groupDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="groupDialogVisible = false">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 支持弹框 -->
    <el-dialog title="提示" v-model="serviceDialogVisible" width="30%">
      <span class="tips oe-m-r-14">商品分组</span>
      <el-select clearable v-model="serviceList" placeholder="请选择">
        <el-option
          v-for="item in serviceOptions"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="serviceDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="serviceDialogVisible = false">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 运费模板弹框 -->
    <el-dialog title="提示" v-model="expressDialogVisible" width="30%">
      <span class="tips oe-m-r-14">运费模板</span>
      <el-select clearable v-model="expressList" placeholder="请选择">
        <el-option
          v-for="item in expressOptions"
          :key="item.id"
          :label="item.dispatch_name"
          :value="item.id"
        />
      </el-select>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="expressDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="expressDialogVisible = false">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 查看详情弹框组件 -->
    <ProductDialog :skusInfo="skusInfo" :productDetail="productDetail" v-model="dialogVisible" />
    <!-- 修改sku弹框弹框组件 -->
    <SkusDialog v-model="skuDialogVisible" :skusDate="skusDate" :skuProductId="skuProductId" />
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import {
    reqGoodsList,
    reqGoodsMildDel,
    reqGoodsGroupList,
    reqGoodsServiceList,
    reqGoodsGoodsTabList,
    reqGoodsUpDownGoods,
    reqGoodsClassList,
    reqDispatchExpressIndex,
    reqGoodspriceStoreEdit,
    reqGoodsParamList,
    reqGoodspriceStoreIndex
  } from '@/api/commodity'
  import { usePagination } from '@/hooks/use-pagination'
  import { ElMessageBox, ElMessage } from 'element-plus'
  import { formatUnix } from '@/utils'
  import ProductDialog from './addGoods/components/seePopup.vue'
  import SkusDialog from './admin/skus-dialog.vue'
  import sectionInput from './admin/section-input.vue'
  // 弹出分类弹框
  const classDialogVisible = ref(false)
  const classOptions = ref<any[]>([])
  const classList = ref<any[]>([])
  reqGoodsClassList().then((res) => {
    classOptions.value = res.data.data.data
  })
  // 弹出分组弹框
  const groupDialogVisible = ref(false)
  const groupOptions = ref<any[]>([])
  const groupList = ref<any[]>([])
  // 弹出分组弹框
  const serviceDialogVisible = ref(false)
  const serviceOptions = ref<any[]>([])
  const serviceList = ref<any[]>([])
  // 弹出运费模板弹框
  const expressDialogVisible = ref(false)
  const expressOptions = ref<any[]>([])
  const expressList = ref<any[]>([])
  // 请求运费模板数据
  reqDispatchExpressIndex().then((res) => {
    expressOptions.value = res.data.data.data
  })
  // 查看弹框是否弹出变量
  const dialogVisible = ref(false)
  // 跳转新增商品页面
  const router = useRouter()
  const route = useRoute()
  const jumpAddGoods = (id: Key) => {
    router.push({ path: '/commodity/addGoods', query: { id } })
  }
  // 搜索对象
  const formInfo = ref<any>({
    title: '',
    groupId: '',
    serviceId: '',
    goods_type: '',
    goods_state: ' ',
    tabId: [],
    sales: ['', ''],
    price: ['', ''],
    virtual_sales: ['', '']
  })
  // 重置按钮
  const recharge = () => {
    formInfo.value = {
      title: '',
      groupId: '',
      serviceId: '',
      goods_type: '',
      goods_state: ' ',
      tabId: [],
      sales: ['', ''],
      price: ['', ''],
      virtual_sales: ['', '']
    }
  }

  // 查看商品详情
  const choiceClass = ref<any[]>([])
  const productDetail = ref<any>({})
  const skusInfo = ref({})
  const seeDetails = (id: Key) => {
    reqGoodsList({ id }).then(async (res) => {
      productDetail.value = res.data.data.data[0]
      // console.log(productDetail.value, '查看sku数据')
      if (productDetail.value.norms_type == 1) {
        // console.log('多规格')
        const skus = await reqGoodspriceStoreIndex({ id })
        // console.log(skus, 'skus数据')
        skusInfo.value = skus.data.data
      }
      if (productDetail.value.goods_param_type == 4 && productDetail.value.goods_param != '') {
        productDetail.value.goods_param = JSON.parse(productDetail.value.goods_param)
      }
      if (productDetail.value.goods_param_type == 2 && productDetail.value.goods_param != '') {
        reqGoodsParamList({ page: 1, limit: 1000 }).then((res) => {
          res.data.data.data.forEach((item: any) => {
            if (item.id == productDetail.value.goods_param) {
              productDetail.value.goods_param = []
              productDetail.value.goods_param.push(item)
            }
          })
        })
      }
    })
    dialogVisible.value = true
  }
  // 商品分组
  const commodityGroupingOptions = ref()
  reqGoodsGroupList().then((res) => {
    commodityGroupingOptions.value = res.data.data.data
    groupOptions.value = res.data.data.data
  })

  // 商品支持
  const commoditySupportOptions = ref()
  reqGoodsServiceList().then((res) => {
    commoditySupportOptions.value = res.data.data.data
    serviceOptions.value = res.data.data.data
  })

  // 商品标签
  // 公共props配置
  const classProps = {
    multiple: true,
    expandTrigger: 'hover',
    value: 'id',
    label: 'name',
    checkStrictly: true,
    emitPath: false
  } as any
  const commodityTabOptions = ref()
  reqGoodsGoodsTabList().then((res) => {
    commodityTabOptions.value = res.data.data.data
  })
  // 商品类型 start
  const commodityTypeOptions = ref([
    {
      value: '1',
      label: '实体商品'
    },
    {
      value: '2',
      label: '虚拟商品'
    }
  ])
  // 商品类型 start
  const stateOptions = ref([
    {
      value: ' ',
      label: '全部'
    },
    {
      value: '1',
      label: '待出售'
    },
    {
      value: '2',
      label: '出售中'
    },
    {
      value: '3',
      label: '上架隐藏'
    },
    {
      value: '5',
      label: '仓库中'
    }
  ])
  const goodsList = ref<any[]>([])

  // 判断商品是否显示标签方法
  const marketingLabel = (str: string, value: string) => {
    if (str?.includes(value)) {
      return true
    }
    return false
  }
  // 分页器
  const { pagination, handleSizeChange, handleCurrentChange } = usePagination()
  // 当前容器元素
  const multipleTable = ref<any>()
  // 当前选中的数据
  const selectList = ref<any[]>([])
  // 是否全选按钮的切换
  const handlSelectAll = () => {
    if (selectList.value.length) {
      selectAll.value = true
      return
    }
    selectAll.value = false
  }
  // 判断是否全选当前页
  const selectAll = ref(false)
  // 触发底部的全选按钮
  const handleCheckAllDatChange = (state: any) => {
    if (!state || !selectList.value) {
      //点击全选后数据所有选择的数据存到这个数组里边
      multipleTable.value?.clearSelection() //调用这个方法
    } else if (state == true) {
      multipleTable.value?.toggleAllSelection()
    }
  }
  watch(selectList, () => {
    if (selectList.value.length == goodsList.value.length) {
      selectAll.value = true
    } else {
      selectAll.value = false
    }
  })
  // table选中事件
  const handleSelectionChange = (val: any) => {
    selectList.value = val
  }
  // 搜索
  const searchData = () => {
    resetGoodsList()
  }
  // 当前商品上架
  const putCurrent = async (id: Key) => {
    const arr: any = []
    arr.push(id)
    await reqGoodsUpDownGoods({ id: arr, goods_state: 2 })
    ElMessage.success('上架成功')
    resetGoodsList()
  }
  // 当前商品下架
  const offCurrent = async (id: Key) => {
    const arr: any = []
    arr.push(id)
    await reqGoodsUpDownGoods({ id: arr, goods_state: 5 })
    ElMessage.success('下架成功')
    resetGoodsList()
  }
  // 选中商品上架
  const putAll = async () => {
    const arr: any = []
    selectList.value.forEach((item: any) => {
      arr.push(item.id)
    })
    await reqGoodsUpDownGoods({ id: arr, goods_state: 2 })
    ElMessage.success('上架成功')
    resetGoodsList()
  }
  // 选中商品下架
  const offAll = async () => {
    const arr: any = []
    selectList.value.forEach((item: any) => {
      arr.push(item.id)
    })
    await reqGoodsUpDownGoods({ id: arr, goods_state: 5 })
    ElMessage.success('下架成功')
    resetGoodsList()
  }
  // 当前项更多操作
  function handleCommand(id: Key, command: any) {
    switch (command) {
      case '1':
        ElMessageBox.confirm('您确定下架该商品么？', '下架商品', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          offCurrent(id)
        })
        break
      case '2':
        ElMessageBox.confirm('您确定上架该商品么？', '上架商品', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          putCurrent(id)
        })
        break
      case '3':
        ElMessageBox.confirm('您确定复制该商品么？', '复制商品', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {})
        break
      case '4':
        ElMessageBox.confirm('您确定删除该商品么？确定后该商品将会放入回收站', '删除商品', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          reqGoodsMildDel({ id }).then((res) => {
            if (res.data.code == 0) {
              ElMessage({
                type: 'success',
                message: '删除成功!'
              })
              resetGoodsList()
            }
          })
        })
        break
    }
  }
  // 批量更多操作
  function handleCommandAll(command: any) {
    switch (command) {
      case '1':
        groupDialogVisible.value = true
        break
      case '2':
        serviceDialogVisible.value = true
        break
      case '3':
        expressDialogVisible.value = true
        break
      case '4':
        ElMessageBox.confirm('此操作将永久删除选中文件, 是否继续?', '删除商品', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const arr: any = []
          selectList.value.forEach((item) => {
            arr.push(item.id)
          })
          reqGoodsMildDel({ id: arr }).then((res) => {
            if (res.data.code == 0) {
              ElMessage({
                type: 'success',
                message: '删除成功!'
              })
              resetGoodsList()
            }
          })
        })
        break
    }
  }
  // 更改价格
  const changePrice = async (data: any, type: string) => {
    let typeValue: Key
    if (type == 'price') {
      data.isShowPrice = !data.isShowPrice
      typeValue = data.price
    } else {
      data.isShowStock = !data.isShowStock
      typeValue = data.stock
    }
    await reqGoodspriceStoreEdit({ id: data.id, actionType: type, value: typeValue })
    resetGoodsList()
    ElMessage.success('更改成功')
  }
  // 取消修改价格
  const cancelEditPrice = (data: any, type: string) => {
    if (type == 'price') {
      data.isShowPrice = !data.isShowPrice
      resetGoodsList()
    } else {
      data.isShowStock = !data.isShowStock
      resetGoodsList()
    }
  }
  // 是否多规格
  const skuDialogVisible = ref(false)
  const skuProductId = ref<number>(-1)
  const skusDate = ref<any>({})
  const changeSpecifications = async (data: any, type: string) => {
    if (type == 'price') {
      if (data.norms_type == 1) {
        ElMessage.warning('多规格商品不能直接修改价格')
      } else {
        data.isShowPrice = !data.isShowPrice
      }
    } else {
      if (data.norms_type == 1) {
        const res = await reqGoodspriceStoreIndex({ id: data.id })
        skuProductId.value = data.id
        skusDate.value = res.data.data
        skuDialogVisible.value = true
      } else {
        data.isShowStock = !data.isShowStock
      }
    }
  }
  // 请求接口数据 start
  // // 商品列表
  const resetGoodsList = async () => {
    // formInfo.value.tabId = formInfo.value.tabId.toString()
    const subInfo: any = {
      page: pagination.currentPage,
      limit: pagination.pageSize,
      ...formInfo.value
    }
    const { data } = await reqGoodsList(subInfo)

    pagination.total = data.data.total
    goodsList.value = data.data.data
    goodsList.value.forEach((item) => {
      item.isShowPrice = true
    })
    goodsList.value.forEach((item) => {
      item.isShowStock = true
    })
    // formInfo.value.tabId = []
  }
  onMounted(() => {
    if (route.query.title) {
      formInfo.value.title = route.query.title
    }
    resetGoodsList()
  })
  watch(
    [() => pagination.currentPage, () => pagination.pageSize, () => formInfo.value.goods_state],
    () => resetGoodsList()
  )
  // 请求接口数据 end
</script>
<style lang="scss">
  .admin-box {
    .el-button i {
      font-size: 14px;
    }
  }
</style>
<style lang="scss" scoped>
  @media screen and (max-width: 1200px) {
    .layout-media {
      margin-bottom: 20px;
    }
  }
  .label-product {
    :deep(.el-input) {
      line-height: none !important;
      height: 100%;
    }
  }

  .el-table td,
  .el-table th.is-leaf {
    border: none;
  }
  .form-item {
    display: flex;
    align-items: center;
    :deep(.el-cascader) {
      width: 100%;
    }
    :deep(.el-select) {
      width: 100%;
    }
    .tips {
      margin-right: 10px;
      font-size: 14px;
      color: #000000;
    }
    .line {
      width: 10px;
      height: 1px;
      margin: 0 10px;
      background-color: #c4c4c4;
    }
    .el-input,
    .el-select {
      flex: 1;
    }
  }
  // 商品列表
  .table-min-height {
    position: relative;
    :deep(.el-card) {
      min-height: 700px;
      padding-bottom: 100px;
    }
    // 列表头部
    .table-title {
      display: flex;
      align-items: flex-end;
      .product-count {
        margin-left: 14px;
        font-size: 14px;
      }
    }
    // 分页器
    .goods-list-footer {
      position: absolute;
      bottom: 20px;
      left: 20px;
      width: 96%;
      overflow: hidden;
      margin: 80px 0 0 14px;
      .select-all {
        float: left;
        .el-button {
          font-size: 14px;
        }
      }
      .completePager {
        float: right;
      }
    }
  }
  .add-goods {
    width: 120px;
    &.el-button {
      margin: 0;
      padding-top: 8px;
      padding-bottom: 9px;
      font-size: 14px;
      .text {
        margin-left: 6px;
      }
    }
    .add-button-box {
      display: flex;
      justify-content: center;
      // text-align: center;
    }
  }
  // table列表
  .goods-list {
    :deep(.el-button) {
      padding: 4px 8px 6px;
      min-height: 0;
      border-radius: 2px;
      font-size: 12px;
      margin-left: 14px;
    }
    .stock-color-red {
      color: #ff0000;
    }
    .label-layout {
      margin-left: -14px;
    }
    .goods {
      display: flex;
      .picture {
        width: 50px;
        height: 50px;
        .el-image {
          width: 50px;
          height: 50px;
        }
      }
      .classification {
        .navigation {
          display: flex;
          align-items: center;
          color: #000000;
          .name {
            width: 80px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .label-type {
          font-size: 8px;
        }
        .el-tag {
          height: 15px;
          line-height: 13px;
          padding: 0 3px;
          font-size: 10px;
        }
      }
    }
    // 操作
    .edit {
      margin-bottom: 10px;
      :deep(.el-button) {
        display: flex;
        align-items: center;
        font-size: 12px;
        padding: 4px 9px;
        border-radius: 2px;
        margin-left: 14px;
        i {
          padding-right: 3px;
        }
      }
    }
  }

  .search-button {
    width: 120px;
    font-size: 14px;
    &.el-button {
      margin-left: 0;
    }
  }
</style>
