<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-06 10:35:23
 * @LastEditTime: 2021-05-08 10:58:36
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="dev-test">{{ countDown.seconds }}</div>
</template>

<script lang="ts">
import { useCountdown } from '@/hooks/use-countdown';
import { defineComponent, ref } from '@vue/composition-api';
export default defineComponent({
  setup() {
    const time = ref(1000000);
    const countDown = useCountdown(time);
    return {
      countDown,
    };
  },
});
</script>

<style lang="scss"></style>
