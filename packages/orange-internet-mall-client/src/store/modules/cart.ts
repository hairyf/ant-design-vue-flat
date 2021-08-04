/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-07 10:38:14
 * @LastEditTime: 2021-04-22 18:09:30
 * @Description:
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import { reqAddCartList, reqDecCartItem, reqDelCartItem } from '@/api';
import createModule from '@/utils/vue-utils';
import {
  DELECT_CART_ITEMS,
  MODIFY_CART_ITEM_COUNT,
  RECEIVE_CART,
  UNSHIFT_CART_ITEM,
} from '../types';
export default createModule({
  state: {
    // 购物车列表
    carts: [] as any[],
  },
  mutations: {
    // 购物车
    [RECEIVE_CART]: (state, carts) => (state.carts = carts),
    [DELECT_CART_ITEMS]: (state, ids: Key[]) => {
      ids.forEach((item: any) => {
        const findIndex = state.carts.findIndex(
          (cartItem) => cartItem.goods_id === item.goods_id
        );
        if (findIndex === -1) return false;
        state.carts.splice(findIndex, 1);
      });
    },
    [UNSHIFT_CART_ITEM]: (state, cart) => {
      const find = state.carts.find((item) => cart.id == item.id);
      if (!find) state.carts.unshift(cart);
    },
    [MODIFY_CART_ITEM_COUNT]: (state, [id, count]: [Key, number]) => {
      const findIndex = state.carts.findIndex(
        (cart: any) => cart.goods_id === id
      );
      if (findIndex === -1) return false;
      state.carts[findIndex].num = count;
    },
  },
  actions: {
    /** 购物车项+1 */
    addCartGoods: async ({ getters, commit }, [goodsInfo, shopNum, skuId]) => {
      if (getters.isAuthUserInfo) {
        await reqAddCartList({
          goods_id: goodsInfo.id,
          sku_id: skuId,
          num: shopNum,
          price: goodsInfo.price - 0,
        });
      } else {
        const obj = {
          num: 1, //数量
          select: true,
          good: goodsInfo,
        };
        commit(UNSHIFT_CART_ITEM, obj);
      }
    },
    /** 购物车项-1 */
    decCartItem: async ({ commit, getters }, [id, count, skuId]) => {
      if (getters.isAuthUserInfo) {
        await reqDecCartItem({
          goods_id: id,
          sku_id: skuId,
          num: count,
        });
      } else {
        commit(MODIFY_CART_ITEM_COUNT, [id, count]);
      }
    },
    /** 购物车项删除 */
    delCartItem: async ({ commit, getters }, [selects]) => {
      if (getters.isAuthUserInfo) {
        await reqDelCartItem(selects);
        commit(DELECT_CART_ITEMS, selects);
      } else {
        commit(DELECT_CART_ITEMS, selects);
      }
    },
  },
});
