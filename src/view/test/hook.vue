<!--
 * @Author: Zhilong
 * @Date: 2021-05-24 14:05:05
 * @LastEditTime: 2021-05-24 17:09:15
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div ref="elref"> Mouse Move{{ now }} </div>
</template>

<script lang="ts" setup>
  import { useDateNow, useNow, usePerformanceNow } from 'vue-composable'
  import { ref } from 'vue-demi'
  const i = 100
  const { now, remove } = useDateNow({
    refreshMs: 1000
  })

  remove()
</script>
