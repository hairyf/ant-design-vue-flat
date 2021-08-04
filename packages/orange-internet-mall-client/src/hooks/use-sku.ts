/*
 * @Author: Zhilong
 * @Date: 2021-05-06 09:50:35
 * @LastEditTime: 2021-05-10 15:49:30
 * @Description: sku钩子
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
 */
import { computed, ref } from '@vue/composition-api';

interface IOption {
  bar_code: string;
  cost_price: string;
  goods_code: string;
  goods_id: number;
  id: number;
  original_price: string;
  price: string;
  sales: number;
  shop_id: number;
  specs: string;
  stock: number;
  stock_warning: number;
  thumb: string;
  title: string;
  title_jion: string;
  titles: any;
  version: number;
  vip_price: any;
  vip_price_type: number;
  weight: string;
  main_picture?: string;
}

export const useSku = (option: IOption[], openControl = false) => {
  // 全部可选规格列表
  const optionalListAll = option;
  // 有库存可选规格列表
  const optionalList = optionalListAll.filter((item) => item.stock > 0);
  // 动态的可选规格列表(可能是 有库存 也可能是全部)
  const optionalListDynamic = openControl ? optionalList : optionalListAll;
  // 当前可选规格列表
  const effectiveList = ref(optionalListDynamic);
  // 是否选完全部规格
  const selectStatus = ref(false);
  // 当前选择(展示)的规格
  const selectData = computed(() =>
    effectiveList.value.length === 1 ? effectiveList.value[0] : false
  );

  /**
   * @description 查询sku节点是否可选
   * @param { number | string } id 对应的可选id
   * @returns { Boolean } 是否可选
   */
  const isOptional = (id: number | string) => {
    if (openControl) return true;
    return effectiveList.value.some((item) => {
      const commodityInfo = item.specs.split(',');
      return commodityInfo.includes(id.toString());
    });
  };

  /**
   * @description 查询son是否有效
   * @param { number | string } sonId 查询的sonId
   * @returns { Boolean } 是否存在可选
   */
  const sonExistence = (sonId: number | string) => {
    return optionalList.some((item) => {
      const commodityInfo = item.specs.split(',');
      return commodityInfo.includes(sonId.toString());
    });
  };

  /**
   * @description 改变已选项
   * @param { number[] } selected 对应的已选择的id[]
   */
  const alterSelected = (selected: number[]) => {
    effectiveList.value = optionalListDynamic.filter((item) => {
      const commodityInfo = item.specs.split(',');
      // 选完判断
      selectStatus.value = selected.length === commodityInfo.length;
      return !selected.some(
        (v) => !commodityInfo.some((i: string) => Number(i) == v)
      );
    });
  };

  return {
    isOptional,
    alterSelected,
    selectStatus,
    selectData,
    sonExistence,
  };
};
