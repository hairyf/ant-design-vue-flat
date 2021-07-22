<!--
 * @Author: Mr.Mao
 * @Date: 2021-07-08 15:29:03
 * @LastEditTime: 2021-07-22 16:05:01
 * @Description: 
 * @LastEditors: Pan.Yu.Lin
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <cal-input-search></cal-input-search>
  <cal-input-tree-select
    style="width: 300px"
    v-model:value="treeValue"
    :tree-data="treeData"
    tree-checkable
    allow-clear
    placeholder="Please select"
  />
  <cal-input-date></cal-input-date>
  <cal-input-time-picker
    class="w-208"
    format="HH:mm"
    arrow-control
    v-model="time"
    start-placeholder="营业开始时间"
    end-placeholder="营业结束时间"
    clearable
  ></cal-input-time-picker>
  <cal-upload class="mt-44"></cal-upload>

  <cal-space vertical>
    <cal-menu class="h-208 w-80" v-model:default-active="menuvalue">
      <cal-menu-item index="www">asdsa</cal-menu-item>
      <cal-menu-item index="eee">qwe</cal-menu-item>
      <cal-menu-item index="ddd">erwq</cal-menu-item>
      <cal-menu-item index="ccc">qweqwe</cal-menu-item>
    </cal-menu>
    <cal-drag-file #="{ isOver, selectFiles }" @change="$outEvents">
      <!-- isOver 当前文件是否正在框内移动中 -->
      <div
        class="w-144 h-144 flex flex-col justify-center items-center text-white select-none"
        :class="[isOver ? 'bg-purple-300' : 'bg-purple-600']"
      >
        <div>拖拽到此处上传</div>
        <cal-button @click="selectFiles()"> 点击上传 </cal-button>
      </div>
    </cal-drag-file>
    <cal-card>
      <cal-button-cascader
        label="分类"
        :option="option"
        v-model="select"
        :field-names="{ label: 'name', value: 'value', children: 'children' }"
      />
    </cal-card>
  </cal-space>
  <cal-space vertical>
    <!-- tab 撑开内容(多个tab) -->
    <div class="h-320 flex flex-col">
      <div>title</div>
      <cal-tabs class="flex-1">
        <cal-tab-pane key="www" tab="ww"></cal-tab-pane>
        <cal-tab-pane key="bbb" tab="bb"></cal-tab-pane>
      </cal-tabs>
    </div>
    <!-- tab 撑开内容(单个tab) -->
    <div class="h-320 flex flex-col">
      <div>title</div>
      <cal-tabs>
        <cal-tab-pane hide key="www" tab="ww"></cal-tab-pane>
        <cal-tab-pane hide key="bbb" tab="bb"></cal-tab-pane>
      </cal-tabs>
      <cal-tab-pane alone class="flex-1">www</cal-tab-pane>
    </div>

    <cal-radio-group v-model="value">
      <cal-radio-button
        v-for="v in [
          { name: '一级', weight: 1 },
          { name: '二级', weight: 2 },
          { name: '三级', weight: 3 },
          { name: '四级', weight: 4 },
          { name: '五级', weight: 5 },
          { name: '六级', weight: 6 },
          { name: '七级', weight: 7 },
          { name: '八级', weight: 8 }
        ]"
        :disabled="true"
        :value="v.name"
        :key="v.name"
      >
        {{ v.name }}
      </cal-radio-button>
    </cal-radio-group>
    <cal-checkbox-group v-model:value="groupValue">
      <cal-checkbox value="A">一个</cal-checkbox>
      <cal-checkbox value="B">两个</cal-checkbox>
    </cal-checkbox-group>
    <cal-input
      v-model="value"
      class="w-208"
      max-length="5"
      :showCount="true"
      placeholder="输入标签名称"
    ></cal-input>
    <cal-echarts class="h-208 w-500" :option="orderGhlOpts" />

    <!-- 配合高度单独使用 -->
    <cal-perfect-scrollbar class="h-112">
      <div class="bg-gray-600 h-800"></div>
    </cal-perfect-scrollbar>

    <!-- 配合 flex | flex-1 使用 -->
    <div class="flex flex-col h-112">
      <div>head</div>
      <cal-perfect-scrollbar class="flex-1" @ps-scroll-y="$outEvents">
        <div class="bg-gray-600 h-800"></div>
      </cal-perfect-scrollbar>
    </div>

    <!-- 使用原生滚动条(开启后 PerfectScrollbar 钩子函数将失效) -->
    <cal-perfect-scrollbar original class="h-112">
      <div class="bg-gray-600 h-800"></div>
    </cal-perfect-scrollbar>

    <cal-checkbox-group v-model:value="groupValue">
      <cal-checkbox value="A">一个</cal-checkbox>
      <cal-checkbox value="B">两个</cal-checkbox>
    </cal-checkbox-group>
    <cal-button :size="100"> xxx </cal-button>
    <cal-button> xxx </cal-button>
    <cal-input
      v-model="value"
      class="w-208"
      max-length="5"
      :showCount="true"
      placeholder="输入标签名称"
    ></cal-input>
    <cal-layout-sticky class="w-500" height="120px">
      <div> 1s </div>
      <div> 1s </div>
      <div> 1s </div>
      <div> 1s </div>
      <div> 1s </div>
      <div> 1s </div>
      <div> 1s </div>
      <div> 1s </div>
      <div> 1s </div>
      <div> 1s </div>
      <div> 1s </div>
      <div> 1s </div>
      <div> 1s </div>
      <div> 1s </div>
      <div> 1s </div>
      <div> 1s </div>
      <div> 1s </div>
      <template #sticky>
        <div class="h-20">sticky</div>
      </template>
    </cal-layout-sticky>
    <cal-space>
      <cal-grid size="50" class="h-56">
        <div>1</div>
        <div>1</div>
        <div>1</div>
      </cal-grid>
      <cal-button-tabs
        :tabs="[
          { value: 0, label: '店铺页面' },
          { value: 1, label: '商品' }
        ]"
        v-model:current="current"
      />
      <cal-button-tabs
        shape=""
        :tabs="[
          { value: 0, label: '店铺页面' },
          { value: 1, label: '商品' }
        ]"
        default-type="link"
        v-model:current="current"
      />
    </cal-space>
    <cal-space>
      <cal-tag-sort-arrow :modelValue="2" />
      <cal-tag-offers />
      <cal-tag-coupon />
      <cal-tag-count>asdsad</cal-tag-count>
      <cal-select-box select>
        <div class="w-112 h-112"></div>
      </cal-select-box>
      <cal-increase-box size="112px" />
      <cal-button>asdadaS</cal-button>
    </cal-space>
    <cal-table
      sync-space
      :list="[
        {
          a: [
            { c: 'c', d: 'd' },
            { c: 'c1', d: 'd1' }
          ],
          b: 2
        },
        { a: [{ c: 'c', d: 'd' }], b: '起来了' }
      ]"
    >
      <cal-table-option index="a" type="list" max-width="250">
        <cal-table-option title="我是C" index="c">
          <div>xxx</div>
        </cal-table-option>
        <cal-table-option title="我是D" index="d"> </cal-table-option>
      </cal-table-option>
      <cal-table-option title="test" index="a"> </cal-table-option>
      <cal-table-option title="测试" index="b">
        <div>
          <cal-tag v-for="(item, index) in 3" :key="index"> 爱心会 </cal-tag>
        </div>
      </cal-table-option>
    </cal-table>
    <!-- <cal-table class="py-10">
    <cal-checkbox v-model="value"></cal-checkbox> <div>标签名称名称称</div>
  </cal-table> -->

    <cal-descriptions label-placement="top" title="描述">
      <cal-descriptions-item label="早午餐">苹果</cal-descriptions-item>
      <cal-descriptions-item label="午餐">苹果</cal-descriptions-item>
    </cal-descriptions>
    <cal-qr-code text="asdnasio" :size="50" />
    <cal-editor></cal-editor>
    <cal-steps :current="-1" labelPlacement="vertical">
      <cal-step title="买家下单" />
      <cal-step title="买家付款" />
      <cal-step title="交易完成" />
    </cal-steps>
    <cal-image
      circle
      size="50"
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
    />
    <cal-textarea placeholder="623"></cal-textarea>
    <cal-input-range-picker></cal-input-range-picker>
  </cal-space>
</template>
<script lang="ts" setup>
  const treeValue = ref<any[]>([])
  const option = ref([
    {
      name: '一级分类选择-1',
      value: '1',
      children: [
        { name: '二级分类选择-1-1', value: '1-1' },
        { name: '二级分类选择-1-2', value: '1-2' }
      ]
    },
    {
      name: '一级分类选择-2',
      value: '2',
      children: [
        { name: '二级分类选择-2-1', value: '2-1' },
        { name: '二级分类选择-2-2', value: '2-2' }
      ]
    }
  ])
  const treeData = ref([
    {
      title: 'Node1',
      value: '0-0',
      key: '0-0',
      children: [
        {
          title: 'Child Node1',
          value: '0-0-0',
          key: '0-0-0'
        }
      ]
    },
    {
      title: 'Node2',
      value: '0-1',
      key: '0-1',
      children: [
        {
          title: 'Child Node3',
          value: '0-1-0',
          key: '0-1-0',
          disabled: true
        },
        {
          title: 'Child Node4',
          value: '0-1-1',
          key: '0-1-1'
        },
        {
          title: 'Child Node5',
          value: '0-1-2',
          key: '0-1-2'
        }
      ]
    }
  ])
  const select = ref([])
  import { ref, watchEffect } from 'vue'
  import { CalModel } from '~/components'
  watchEffect(() => console.log(select.value))
  const menuvalue = ref('')
  const value = ref('二级')
  const time = ref([])
  const props = defineProps({})
  const show = ref(true)
  const current = ref(0)
  // CalModel({ title: 'adnioasd', content: 'wdnwaodnoiwa' })
  const onSearch = () => {
    console.log(61223)
  }
  const groupValue = ref([])
  const orderGhlOpts = ref({
    tooltip: {
      trigger: 'axis'
    },
    yAxis: {
      type: 'value'
    },
    grid: {
      top: '15%',
      left: '3%',
      right: '3%',
      bottom: '0%',
      containLabel: true
    },
    color: ['#5B8FF9', '#61DDAA', '#65789B', '#F6BD16'],
    xAxis: {
      boundaryGap: false,
      data: ['2月14日', '2月14日', '2月14日', '2月14日', '2月14日', '2月14日', '2月14日']
    },
    // yAxis: {
    //   type: 'value'
    // },
    legend: {
      data: ['已成交', '待发货', '待收货'],
      left: 'left',
      padding: [12, 0]
    },
    series: [
      { name: '已成交', data: [120, 132, 101, 134, 90, 230, 210], type: 'line', showSymbol: false },
      {
        name: '待发货',
        data: [150, 232, 201, 154, 190, 330, 410],
        type: 'line',
        showSymbol: false
      },
      { name: '待收货', data: [320, 332, 301, 334, 390, 330, 320], type: 'line', showSymbol: false }
    ]
  })
</script>

<style lang="scss" scoped></style>
