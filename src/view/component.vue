<!--
 * @Author: Mr.Mao
 * @Date: 2021-07-08 15:29:03
 * @LastEditTime: 2021-07-16 14:29:02
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <cal-button>asdadaS</cal-button>
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
  <cal-radio-group v-model:value="value">
    <cal-radio-button value="a">Hangzhou</cal-radio-button>
    <cal-radio-button value="b" :disabled="true">六级</cal-radio-button>
    <cal-radio-button value="c">七级</cal-radio-button>
    <cal-radio-button value="d">八级</cal-radio-button>
  </cal-radio-group>
  <cal-dialog v-model="show" title="测试">adsadaonino</cal-dialog>
  <cal-input-search v-model="value"> </cal-input-search>
  <cal-input-select v-model="value">
    <a-select-option value=" ">全部</a-select-option>
    <a-select-option value="0">商家退款 </a-select-option>
    <a-select-option value="1">维权退款 </a-select-option>
  </cal-input-select>
  <cal-input-special-select v-model="value">
    <a-select-option value=" ">全部</a-select-option>
    <a-select-option value="0">商家退款 </a-select-option>
    <a-select-option value="1">维权退款 </a-select-option>
  </cal-input-special-select>
  <cal-textarea></cal-textarea>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  import { CalModel } from '~/components'
  const value = ref()
  const props = defineProps({})
  const show = ref(true)
  // CalModel({ title: 'adnioasd', content: 'wdnwaodnoiwa' })
  const onSearch = () => {
    console.log(61223)
  }
</script>

<style lang="scss" scoped></style>
