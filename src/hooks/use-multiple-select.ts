/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2021-01-25 15:01:14
 * @LastEditTime: 2021-04-23 20:24:35
 * @Description: 多选列表逻辑
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import {
  computed,
  Ref,
  ref,
  watch,
  WritableComputedRef,
} from '@vue/composition-api';
type Key = string | number;
type MultipleSelectList = {
  id: Key;
  count?: number;
  select: boolean;
  [key: string]: any;
}[];
export const useMultipleSelect = (
  list: Ref<MultipleSelectList> | WritableComputedRef<MultipleSelectList>
) => {
  /** 当前是否为空 */
  const empty = computed(() => list.value.length === 0);
  /** 当前选中的ID列表 */
  const selects = computed<any[]>(() =>
    list.value.filter((item) => item.select).map((item) => item)
  );
  /** 当前选中的索引列表 */
  const selectIndexs = computed(() =>
    list.value.filter((item) => item.select).map((item) => item)
  );
  /** 当前是否为全选状态 */
  const isSelectAll = ref(false);
  /** 当前是否为全选状态(计算属性) */
  const selectAllComputed = computed(
    () => !list.value.find((item) => !item.select)
  );
  /** 当前是否已经选择 */
  const isSelect = computed(() => !!list.value.find((item) => item.select));
  /** 处理所有选中ID项 */
  const onHandleSelects = (callback: (ids: Key[]) => void) => {
    callback((selects.value as any).goods_id);
  };
  /** 处理所有项目全选/非全选 */
  const onHandleSelectsToggle = (selects: boolean) => {
    list.value.forEach((item) => {
      if (item.good.goods_state != '1') {
        item.select = selects;
      }
    });
  };
  // 监视当前是否全选
  watch(selectAllComputed, () => {
    if (selectAllComputed.value !== isSelectAll.value) {
      isSelectAll.value = selectAllComputed.value;
    }
  });
  // 监视选择状态
  watch(isSelectAll, () => {
    if (selectAllComputed.value !== isSelectAll.value) {
      onHandleSelectsToggle(isSelectAll.value);
    }
  });

  return {
    empty,
    selects,
    isSelect,
    isSelectAll,
    onHandleSelects,
    onHandleSelectsToggle,
    selectIndexs,
  };
};
