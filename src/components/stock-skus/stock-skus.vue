<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-03-23 10:40:49
 * @LastEditTime: 2021-05-10 15:34:19
 * @Description: 
 * @LastEditors: Pan.Yu.Lin
-->
<template>
  <div class="stock-skus">
    <!-- sku列表 -->
    <div class="sku-list">
      <edit-card-item
        v-for="(item, index) in skus"
        :key="item.id"
        @close="delSkuItem(index)"
        :show-close="skus.length > 1"
      >
        <el-input
          v-model="item.title"
          placeholder="请填写规格，如颜色、尺码、大小"
          @input="syncChildTitles()"
        />
        <div class="items-container oe-flex">
          <div class="curve" />
          <div class="items-list oe-flex-1">
            <div class="items-item" v-for="(citem, cindex) in item.items" :key="citem.id">
              <el-input
                v-model="citem.title"
                placeholder="请填写规格，如颜色、尺码、大小"
                @input="syncChildTitles()"
              />
              <el-link
                href="javascript:;"
                type="primary"
                class="del-sku"
                v-if="item.items.length > 1"
                @click="delSkuChild(item, cindex)"
              >
                删除
              </el-link>
            </div>
          </div>
        </div>
        <el-button
          size="mini"
          type="primary"
          class="add-sku"
          @click="incSkuChild(item)"
          v-if="item.items.length < 12"
        >
          新增规格值
        </el-button>
      </edit-card-item>
    </div>
    <!-- 添加sku按钮 -->
    <div class="oe-flex">
      <el-button
        class="add-goods oe-m-r-14"
        type="primary"
        size="small"
        @click="incSkuItem"
        v-if="skus.length < 3"
      >
        <div class="add-button-box">
          <i class="ad-shapePlus"></i>
          <span class="text">新增规格</span>
        </div>
      </el-button>
      <div class="tips">只可添加3个主规格 ,12个规格值</div>
    </div>
    <!-- 批量操作 -->
    <div class="batch-container oe-flex">
      <div class="title oe-m-r-14">批量设置</div>
      <div class="batch-list">
        <el-input v-model="v.value" :placeholder="v.title" v-for="(v, k) in batchOption" :key="k" />
      </div>
      <el-button size="mini" @click="batchSetSkuItems">应用</el-button>
    </div>
    <!-- 编辑列表 -->
    <el-table :data="tableItems" :height="500">
      <el-table-column v-if="skus[0]" :label="skus[0].title || '暂无规格名称'" v-slot="{ row }">
        {{ row.title.split('+')[0] || '暂无规格名称' }}
      </el-table-column>
      <el-table-column v-if="skus[1]" :label="skus[1].title || '暂无规格名称'" v-slot="{ row }">
        {{ row.title.split('+')[1] || '暂无规格名称' }}
      </el-table-column>
      <el-table-column v-if="skus[2]" :label="skus[2].title || '暂无规格名称'" v-slot="{ row }">
        {{ row.title.split('+')[2] || '暂无规格名称' }}
      </el-table-column>
      <el-table-column prop="thumb" label="商品图片" v-slot="{ row }">
        <image-item v-model="row.thumb" />
      </el-table-column>
      <el-table-column prop="price" label="售卖价/元" v-slot="{ row }">
        <el-input type="number" v-model="row.price" />
      </el-table-column>
      <el-table-column prop="original_price" label="划线价/元" v-slot="{ row }">
        <el-input type="number" v-model="row.original_price" />
      </el-table-column>
      <el-table-column prop="cost_price" label="成本价" v-slot="{ row }">
        <el-input type="number" v-model="row.cost_price" />
      </el-table-column>
      <el-table-column prop="stock" label="库存" v-slot="{ row }">
        <el-input type="number" v-model="row.stock" />
      </el-table-column>
      <el-table-column prop="stock_warning" label="库存预警" v-slot="{ row }">
        <el-input type="number" v-model="row.stock_warning" />
      </el-table-column>
      <el-table-column prop="goods_code" label="商品编码" v-slot="{ row }">
        <el-input type="number" v-model="row.goods_code" />
      </el-table-column>
      <el-table-column prop="goods_code" label="商品条形码" v-slot="{ row }">
        <el-input type="number" v-model="row.bar_code" />
      </el-table-column>
      <el-table-column prop="weight" label="重量/g" v-slot="{ row }">
        <el-input type="number" v-model="row.weight" />
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
  import EditCardItem from '@/view/decorate/components/EditCardItem.vue'
  import ImageItem from '@/view/decorate/components/common/ImageItem.vue'
  import { computed, defineEmit, defineProps, reactive, watch } from '@vue/runtime-core'
  import { defaultsDeep, forEach, forIn } from 'lodash'
  import { nanoid } from 'nanoid'
  type SkuItem = {
    id: string
    title: string
    items: [{ id: string; title: string; parent_label: string; spec_id: string }]
  }
  type TableItem = {
    // 标题
    title: string
    // 拼接标题
    title_jion: string
    // 商品图片
    thumb: string
    // 售卖价/元
    price: string
    // 划线价/元
    original_price: string
    // 成本价
    cost_price: string
    // 库存
    stock: string
    // 库存预警
    stock_warning: string
    // 商品编码
    goods_code: string
    // 商品条形码
    bar_code: string
    // 重量/g
    weight: string
    // 对应规格ID列表
    specs: string[]
    // 标题列表
    titles: Record<string, string>
  }
  const props = defineProps({
    skus: {
      type: Array as () => SkuItem[],
      required: true
    },
    table: {
      type: Array as () => TableItem[],
      required: true
    }
  })
  const emit = defineEmit()
  // 多层model绑定数据
  const skus = computed({
    get: () => props.skus,
    set: (value) => emit('update:skus', value)
  })
  const tableItems = computed({
    get: () => props.table,
    set: (value) => emit('update:table', value)
  })
  // 批量设置
  const batchOption = reactive({
    price: {
      title: '售卖价/元',
      value: ''
    },
    original_price: {
      title: '划线价/元',
      value: ''
    },
    cost_price: {
      title: '成本价',
      value: ''
    },
    stock: {
      title: '库存',
      value: ''
    },
    stock_warning: {
      title: '库存预警',
      value: ''
    },
    goods_code: {
      title: '商品编码',
      value: ''
    },
    bar_code: {
      title: '商品条形码',
      value: ''
    },
    weight: {
      title: '重量/g',
      value: ''
    }
  })
  // 获取默认配置项
  const getDefaultSkuItem = (): SkuItem => ({
    id: nanoid(5),
    title: '',
    items: [{ id: nanoid(5), title: '', spec_id: '', parent_label: '' }]
  })
  // 获取默认子项配置项
  const getDefaultSkuChild = (): SkuItem['items'][number] => {
    return { id: nanoid(5), title: '', spec_id: '', parent_label: '' }
  }
  // 添加SKU项
  const incSkuItem = () => {
    const skuItem = getDefaultSkuItem()
    skus.value.push(skuItem)
    tableItems.value = generateRelationInfo()
  }
  // 删除SKU项
  const delSkuItem = (index: number) => {
    skus.value.splice(index, 1)
    tableItems.value = generateRelationInfo()
  }
  // 添加SKU子规格项
  const incSkuChild = (skuItem: SkuItem) => {
    const skuChild = getDefaultSkuChild()
    skuItem.items.push(skuChild)
    const newTableItems = generateRelationInfo()
    // 深层递归合并
    // defaultsDeep(tableItems.value, newTableItems)
    tableItems.value = newTableItems
    // 同步规格名称
    syncChildTitles(newTableItems)
  }
  // 删除SKU子规格项
  const delSkuChild = (skuItem: SkuItem, index: number) => {
    tableItems.value = tableItems.value.filter((skuTableItem) => {
      let specs = []
      if (typeof skuTableItem.specs === 'string') {
        specs = (skuTableItem.specs as string).split(',')
      } else {
        specs = skuTableItem.specs
      }
      return specs.some((id) => skuItem.items[index].id !== id)
    })
    skuItem.items.splice(index, 1)
    tableItems.value = generateRelationInfo()
  }
  // 根据SKUS生成关联数据
  const generateRelationInfo = () => {
    type ChildItem = SkuItem['items'][number]
    const relationInfo: ChildItem[][] = []
    const recursion = (skuArr: ChildItem[] = [], index: number, list: SkuItem[]) => {
      for (let j = 0; j < list[index].items.length; j++) {
        list[index].items[j].parent_label = list[index].title
        list[index].items[j].spec_id = list[index].id
        if (index < list.length - 1) {
          // skuarr[0] = ['黑色']  i=0, j=0
          skuArr[index] = list[index].items[j]
          // 执行递归 skuarr[1] = ['s']  i=1, j=0
          recursion(skuArr, index + 1, list)
        } else {
          // arr[0] = ['黑色','s','好']  i=2不符合if条件,执行else   j=0
          relationInfo.push([...skuArr, list[index].items[j]])
        }
      }
    }
    recursion([], 0, skus.value)
    const mergeInfo = relationInfo.map((item) => {
      return item.reduce(
        (total, item) => {
          total.specs.push(item.id)
          item.parent_label && (total.titles[item.parent_label] = item.title)
          total.title_jion = Object.keys(total.titles)
            .map((v) => `${v}:${total.titles[v]}`)
            .join(' ')
          total.title = Object.values(total.titles)
            .filter((v) => v)
            .join('+')
          return total
        },
        {
          title: '',
          title_jion: '',
          specs: [] as string[],
          titles: {} as Record<string, string>,
          thumb: '',
          price: '',
          cost_price: '',
          original_price: '',
          stock: '',
          stock_warning: '',
          sales: '',
          weight: '',
          goods_code: '',
          bar_code: ''
        }
      )
    })
    return mergeInfo
  }
  // 当修改父规格名称时, 同步至列表中
  const syncChildTitles = (items?: ReturnType<typeof generateRelationInfo>) => {
    const newTableItems = items || generateRelationInfo()
    forEach(tableItems.value, (v, i) => {
      v.titles = newTableItems[i].titles
      v.title = newTableItems[i].title
      v.title_jion = newTableItems[i].title_jion
    })
  }
  // 进行批量操作
  const batchSetSkuItems = () => {
    type BatchKey = keyof typeof batchOption
    forIn(batchOption, (value, key) => {
      if (value.value !== '') {
        forEach(tableItems.value, (item) => {
          item[key as BatchKey] = value.value
        })
        value.value = ''
      }
    })
  }
  if (!skus.value.length) incSkuItem()
</script>

<style lang="scss" scoped>
  // 新增按钮
  .add-goods {
    width: 120px;
    &.el-button {
      margin: 0;
      padding-top: 8px;
      padding-bottom: 9px;
      font-size: 14px;
      i {
        font-size: 14px;
      }
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
  .stock-skus {
    width: 100%;
  }
  .sku-list {
    .el-input {
      width: 250px;
    }
  }
  .items-container {
    margin-top: 30px;
    align-items: flex-start;
  }
  .items-item {
    display: inline-flex;
    margin-bottom: 24px;
  }
  .curve {
    margin-top: -10px;
    margin-left: 10px;
    margin-right: 15px;
    height: 30px;
    width: 30px;
    border-left: 1px solid #8c8c8c;
    border-bottom: 1px solid #8c8c8c;
  }
  .sku-list {
    margin-bottom: 25px;
  }
  .add-sku {
    margin-left: 57px;
  }
  .del-sku {
    margin: 0 15px;
    flex-shrink: 0;
  }
  .tips {
    font-size: 12px;
    color: #8c8c8c;
  }
  .title {
    font-size: 14px;
  }
  .batch-container {
    margin: 28px 0;
    padding-top: 28px;
    border-top: 1px solid #d9d9d9;
    .el-input {
      width: 120px;
      margin-right: 15px;
    }
    .el-button {
      width: 120px;
      height: 30px;
    }
  }
</style>
