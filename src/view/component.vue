<!--
 * @Author: Mr.Mao
 * @Date: 2021-07-08 15:29:03
 * @LastEditTime: 2021-07-13 16:58:20
 * @Description: 
 * @LastEditors: Zhilong
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
    <cal-table-option title="测试" index="b"> </cal-table-option>
  </cal-table>
  <cal-descriptions label-placement="top" title="描述">
    <cal-descriptions-item label="早午餐">苹果</cal-descriptions-item>
    <cal-descriptions-item label="午餐">苹果</cal-descriptions-item>
  </cal-descriptions>
</template>
<script lang="ts" setup>
  const props = defineProps({})
</script>

<style lang="scss" scoped></style>
