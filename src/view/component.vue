<!--
 * @Author: Mr.Mao
 * @Date: 2021-07-08 15:29:03
 * @LastEditTime: 2021-07-17 16:09:36
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <cal-space vertical>
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
