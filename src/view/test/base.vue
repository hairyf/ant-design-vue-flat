<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-22 16:01:45
 * @LastEditTime: 2021-06-04 16:55:39
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <cal-card class="mb-20" title="switch开关">
    <cal-switch v-model="switchValue" @change="changeSwitch" :activeValue="6" :closeValue="2" />
  </cal-card>
  <cal-card class="mb-20" title="输入框">
    <cal-input />
  </cal-card>
  <cal-card class="mb-20" title="时间选择器">
    <cal-input-date />
  </cal-card>
  <cal-card class="mb-20" title="区间输入框">
    <cal-input-section v-model="b" open-auto-size placeholder="输入区间" />
  </cal-card>
  <cal-card class="mb-20" title="选择输入框">
    <cal-input-select v-model="a">
      <a-select-option value="问问">问问</a-select-option>
      <a-select-option value="订单">订单</a-select-option>
      <a-select-option value="disabled" disabled>Disabled</a-select-option>
      <a-select-option value="Yiminghe">yiminghe</a-select-option>
    </cal-input-select>
  </cal-card>
  <cal-card class="mb-20" title="主题图标">
    <cal-theme-icon type="coupon" />
    <cal-theme-icon type="offers" class="mt-2" />
    <cal-theme-icon type="sortArrow" class="mt-2" />
  </cal-card>
  <cal-card class="mb-20" title="固定表格">
    <cal-table
      :list="[
        {
          id: 11111,
          2: 22222,
          3: 33333,
          4: 44444
        },
        {
          1: 11111,
          2: 22222,
          3: 33333,
          4: 44444
        }
      ]"
      title-align="left"
      @onCheckboxChange="onCheckboxChange"
    >
      <cal-table-option width="9%" title="商品ID" :sort="true" index="1" merge="true">
        <template #default="{ item }">
          <div class="flex">
            <cal-button size="small" :values="item.id">开启</cal-button>
            <cal-button size="small" :values="item.id">查看</cal-button>
          </div>
          <div class="flex">
            <cal-button size="small" :values="item.id">删除</cal-button>
            <cal-button size="small" :values="item.id">关闭</cal-button>
          </div>
        </template>
      </cal-table-option>
      <cal-table-option width="9%" title="商品" :sort="true" index="2"> </cal-table-option>
      <cal-table-option width="9%" title="类型" :sort="true" index="3"> </cal-table-option>
      <cal-table-option width="9%" title="价格" :sort="true" index="4"> </cal-table-option>
      <cal-table-option width="9%" title="库存" :sort="true" index="5"> </cal-table-option>
      <cal-table-option width="9%" title="虚拟销量" :sort="true" index="1"> </cal-table-option>
      <cal-table-option width="9%" title="实际销量" :sort="true" index="1"> </cal-table-option>
      <cal-table-option width="9%" title="营销标签" :sort="true" index="1"> </cal-table-option>
      <cal-table-option width="9%" title="状态" :sort="true" index="1"> </cal-table-option>
      <cal-table-option width="9%" title="创建时间" :sort="true" index="1"> </cal-table-option>
      <cal-table-option width="9%" title="操作" :sort="true" index="1"> </cal-table-option>
    </cal-table>
  </cal-card>
</template>
<script lang="ts" setup>
  import { ref } from 'vue-demi'
  const onBlur = ({ target }: any) => {
    console.log('????', target.value)
  }
  const a = ref('')
  const b = ref(['1155', '2'])

  const changeSwitch = (value: any) => {
    console.log('值药~', value)
    console.log('值药113~', switchValue.value)
  }

  setInterval(() => {
    // console.log(b.value, `b.value => ${b.value}`)
    // b.value = ['5', '98']
  }, 2000)

  const onCheckboxChange = (item: any) => {
    console.log(item, `item => ${item}`)
  }
  const switchValue = ref(1)
</script>
<style></style>
