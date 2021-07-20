<!--
 * @Author: Mr.Mao
 * @Date: 2021-07-08 15:29:03
 * @LastEditTime: 2021-07-20 21:52:47
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
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
  </cal-space>
  <cal-textarea placeholder="623"></cal-textarea>
  <cal-input-range-picker></cal-input-range-picker>
  <el-time-picker
    is-range
    range-separator="至"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
    placeholder="选择时间范围"
  >
  </el-time-picker>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  import { CalModel } from '~/components'
  import { ElCheckboxButton, ElCheckboxGroup, ElTimePicker } from 'element-plus'

  import 'element-plus/lib/theme-chalk/el-time-picker.css'

  import 'element-plus/lib/theme-chalk/el-icon.css'
  const value = ref('二级')
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
