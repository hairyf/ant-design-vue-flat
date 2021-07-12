<!--
 * @Author: Zhilong
 * @Date: 2021-07-12 15:53:35
 * @LastEditTime: 2021-07-12 17:00:16
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
    <div class="cal-grid-container">
        <div class='cal-grid-view'>

            <slot />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({ name: 'CalGrid' })
</script>
<script lang="ts" setup>

const props = defineProps({
    /** 子元素大小 */
    size:{
        type:[
            Number,String,
            Object as () => ({width:Key,height:Key}),
        ],
        require:true
    },
    gap:{
        type:Number,
        default:24
    }
})
</script>
<style lang="scss">
    .cal-grid-view{
        display: grid;
        grid-template-columns: repeat(auto-fill,--width);
        gap:var(--gap)
    }
</style>