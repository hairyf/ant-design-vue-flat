import { useLifecycleInject } from '@/hooks/use-page-lifecycle';
import store from '@/store';
import { getTemplateInfo } from '@/utils';
import { computed, provide, ref } from '@vue/composition-api';
import {
  ComponentMenuItem,
  pageInfoOption,
} from 'orange-components-config/options';

/*
 * @Author: Mr.Mao
 * @Date: 2021-05-13 09:58:42
 * @LastEditTime: 2021-05-13 11:56:22
 * @Description:
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
type CMI = ComponentMenuItem;
type PIO = typeof pageInfoOption;
/**
 * 模板消息钩子
 * @param type 当前类型
 * @returns 返回模板消息
 */
export const useTemplates = (type: string | undefined) => {
  // 当前页面是否为 tabBar|navbar 页面 -- start --
  const pages = getCurrentPages();
  const page = pages[pages.length - 1];
  const isTabBar = computed(() =>
    store.state.common.navigation.contentEdit.navis.some(
      (v) => v.pagePath.search(page.route || '') > 0
    )
  );
  // 当前页面是否为 tabBar|navbar 页面 -- end --

  // 分发模板列表以及页面信息 -- start --
  const templates = ref<CMI[]>([]);
  const pageInfo = computed(() => {
    return (templates.value.find((v) => v.type == 'PageInfo') ||
      pageInfoOption) as PIO;
  });
  provide('templates', templates);
  // 分发模板列表以及页面信息 -- end --

  // 通过页面组件, onLoad获取参数并获取模板消息 -- start --
  useLifecycleInject({
    onLoad: (option) => {
      if (typeof type === 'undefined') return false;
      if (type === 'customPage') {
        templates.value = getTemplateInfo(type, option?.id).data;
      } else {
        templates.value = getTemplateInfo(type).data;
      }
    },
  });
  // 通过页面组件, onLoad获取参数并获取模板消息 -- end --

  // 通过页面组件, 判断当前页面是否存在回退 -- start --
  const isBack = ref(false);
  useLifecycleInject({
    onLoad: () =>
      setTimeout(() => {
        const pages = getCurrentPages();
        isBack.value = !!(pages.length - 1);
      }),
  });
  // 通过页面组件, 判断当前页面是否存在回退 -- start --
  return { isTabBar, templates, pageInfo, isBack };
};
