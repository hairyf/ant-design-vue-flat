<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-03-29 13:53:52
 * @LastEditTime: 2021-05-10 15:17:27
 * @Description: 
 * @LastEditors: Mr.wang
-->
<template>
  <mobile-emulator>
    <div class="container">
      <div class="sidebar">
        <div
          class="sidebar-item"
          v-for="(item, index) in tableList"
          :key="index"
          :class="{ active: currentIndex == index }"
          @click="currentProduct(index, item)"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="list">
        <div class="banner">
          <el-image fit="cover" :src="banner"></el-image>
        </div>
        <div class="items" v-for="(item, index) in productList" :key="index">
          <div class="item">
            <div class="product">
              <el-image fit="cover" :src="item.main_picture"></el-image>
            </div>
          </div>
          <div class="information">
            <div class="title">{{ item.title }}</div>
            <div class="bottom">
              <span class="left">¥{{ item.price }}</span>
              <span class="right">销量: {{ item.sales }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </mobile-emulator>
</template>
<script lang="ts" setup>
  import { ref, defineProps, onMounted } from 'vue'
  import { reqGoodsList } from '@/api/commodity'
  const props = defineProps({
    tableList: {
      type: Array as () => any[],
      required: true
    },
    banner: {
      type: String,
      required: true
    }
  })
  const currentIndex = ref(0)
  const productIdAll = ref<any[]>([])
  const productList = ref<any[]>([])
  const resetGoodsList = async (id: string) => {
    const { data } = await reqGoodsList({ limit: 10, page: 1, classId: id })
    productList.value = data.data.data
  }
  setTimeout(() => {
    productIdAll.value.push(props.tableList[0]?.id)
    if (props.tableList[0]?.children) {
      addAttribute(props.tableList[0]?.children)
    }
    resetGoodsList(productIdAll.value.join())
  }, 300)

  // 递归获取id
  function addAttribute(arr: any) {
    arr.forEach((item: any) => {
      if (item.children) {
        productIdAll.value.push(item.id)
        addAttribute(item.children)
      } else {
        productIdAll.value.push(item.id)
      }
    })
    return
  }

  const currentProduct = (index: number, item: any) => {
    productIdAll.value = []
    currentIndex.value = index
    productIdAll.value.push(item.id)
    if (item.children) {
      addAttribute(item.children)
    }
    resetGoodsList(productIdAll.value.join())
  }
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    background-color: #f2f2f2;
    .sidebar {
      width: 30%;
      background-color: #fff;
      .sidebar-item {
        width: 100%;
        padding: 15px 0;
        text-align: center;
        color: var(--color-primary);
        &.active {
          position: relative;
          background-color: var(--color-primary-light-opacity-8);
        }
      }
    }
    .list {
      width: 70%;
      margin: 10px;
      .banner {
        width: 100%;
        height: 90px;
        margin-bottom: 20px;
        border-radius: 4px;
        overflow: hidden;
        .el-image {
          width: 100%;
          height: 100%;
        }
      }
      .items {
        display: flex;
        align-items: center;
        background-color: #fff;
        border-radius: 4px;
        padding: 5%;
        margin-bottom: 10px;
        .item {
          width: 30%;
          font-size: 12px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          margin-right: 14px;
          .product {
            width: 100%;
            height: 61px;
            .el-image {
              width: 100%;
              height: 100%;
            }
          }
        }
        .information {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 100%;
          height: 61px;
          font-size: 12px;
          .title {
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .bottom {
            display: flex;
            justify-content: space-between;
            width: 100%;
            .left {
              font-size: 14px;
              color: #ff3d00;
              font-weight: bold;
            }
            .right {
              font-size: 11px;
              color: #acacac;
            }
          }
        }
      }
    }
  }
</style>
