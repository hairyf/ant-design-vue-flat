<!--
 * @Author: Zhilong
 * @Date: 2021-07-07 17:55:28
 * @LastEditTime: 2021-07-09 15:34:07
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div class="flex justify-between h-full">
    <div class="flex-1 h-full">
      <v-charts autoresize class="w-128 h-full flex-1" :option="merchantProfileCharts" />
    </div>
    <v-charts autoresize class="w-128 h-full flex-1" :option="settleInShopCharts" />
  </div>
</template>
<script lang="ts" setup>
  import { blendColor } from '@/utils'
import type { EChartsCoreOption } from 'echarts'
  import { graphic } from 'echarts'
  import { defineProps, ref } from 'vue-demi'
import { useStore } from 'vuex'
  const store = useStore()
  const props =  defineProps({
    /** 标题 */
    title: String,
    /** 副标题 */
    subTitle: String,
    /** 今天 */
    today: {
      type:[Number, String],
      default:0
    },
    /** 昨天 */
    yesterday: {
      type:[Number, String],
      default:0
    }
  })

  const settleInShopCharts = ref<EChartsCoreOption>({
    tooltip: {
    },
    graphic: [
      {
        type: 'text',
        left: 'center',
        top: '55%',
        style: {
          text: props.subTitle,
          textAlign: 'center',
          fill: '#001426',
          fontSize: 12,
          fontWeight: 400
        }
      },
      {
        type: 'text',
        left: 'center',
        top: '35%',
        style: {
          text: Number(props.today) + Number(props.yesterday),
          textAlign: 'center',
          fill: '#E89026',
          fontSize: 20,
          fontWeight: 700
        }
      }
    ],
    series: {
      name: props.subTitle,
      type: 'pie',
      radius: ['65%', '90%'],
      itemStyle: {
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#fff'
      },
      label: {
        show: false
      },
      data: [
        {
          value: props.yesterday,
          name: '昨日',
          itemStyle: {
            normal: {
              color: new graphic.LinearGradient(
                0,
                0,
                1,
                0, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
                [
                  { offset: 0, color: ' #6495F5' },
                  { offset: 1, color: ' #9DB9FF' }
                ] //数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示位置
              )
            }
          }
        },
        {
          value: props.today,
          name: '今日',
          itemStyle: {
            normal: {
              color: new graphic.LinearGradient(
                0,
                0,
                1,
                0, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
                [
                  { offset: 0, color: ' #FF5757' },
                  { offset: 1, color: ' #FDC5B0' }
                ] //数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示位置
              )
            }
          }
        }
      ]
    }
  })


  const merchantProfileCharts = ref<EChartsCoreOption>({
    title: {
      text: props.title,
      textStyle:{
        color:'#001426',
        fontWeight:500,
        fontSize:16
      }
    },
    tooltip: {
      trigger: 'item',
      position:'top'
    },
    grid: {
      top: '45px',
      left: '38px',
      right: '60px',
      bottom: '5px'
    },
    xAxis: {
      show: false,
    },
    yAxis: {
      type: 'category',
      data: ['今日','昨日'],
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel:{
        color:'#001426',
        fontSize:14,
      }
    },
    series: {
      name: props.subTitle,
      label: {
        show: true,
        position: 'right',
        valueAnimation: true,
        fontSize:14,
        color:"#001426",
        formatter({value}:any){
          return value + '/人'
        }
      },
      type: 'bar',
      barWidth: 10,
      barGap:20,
      data: [
        {
          name: '今日',
          value: +props.today,
          itemStyle: {
            normal: {
              color: new graphic.LinearGradient(
                0,
                0,
                1,
                0, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
                [
                  { offset: 0, color: ' #FF5757' },
                  { offset: 1, color: ' #FDC5B0' }
                ] //数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示位置
              ),
              borderRadius: 2
            },
          }
        },
        {
          name: '昨日',
          value:  +props.yesterday,
          itemStyle: {
            normal: {
              color: new graphic.LinearGradient(
                0,
                0,
                1,
                0, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
                [
                  { offset: 0, color: ' #6495F5' },
                  { offset: 1, color: ' #9DB9FF' }
                ] //数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示位置
              ),
              borderRadius: 2,
            },
          }
        },
      ]
    }
  })

</script>
