import { ref, inject, computed, defineComponent, openBlock, createBlock, unref, mergeProps, renderSlot, withScopeId, toRef, watchEffect, provide, pushScopeId, popScopeId, createVNode, Transition, createCommentVNode, isRef, onMounted, watch, toHandlers, withCtx, withDirectives, vShow, resolveDirective, Fragment, renderList, useCssVars, useSlots, toDisplayString, resolveComponent, onUnmounted, reactive, toRefs, withModifiers, createTextVNode } from 'vue';
import antd__default, { Button as Button$1, ConfigProvider, Layout as Layout$1, Input as Input$1, InputNumber, Image, Card as Card$1, Cascader, Checkbox, Empty, Pagination, Tabs as Tabs$1, message } from 'ant-design-vue';
export * from 'ant-design-vue';
import { cloneDeep, merge, kebabCase, debounce as debounce$1, get } from 'lodash-es';
import { NDescriptions, NDescriptionsItem, NEllipsis, NSpace } from 'naive-ui';
export { NDescriptions as CalDescriptions, NDescriptionsItem as CalDescriptionsItem } from 'naive-ui';
import { orderBy } from 'lodash';
import { getCurrentInstance, isVue2, ref as ref$1, watch as watch$1, computed as computed$1 } from 'vue-demi';
import crypto from 'crypto';

var Common = {
	baseTextColor: "#000000",
	primaryColor: "#558BF7",
	baseColor: "#ffffff",
	"primaryColorLight-2": "#77a2f9",
	"primaryColorLight-4": "#99b9fa",
	"primaryColorLight-6": "#bbd1fc",
	"primaryColorLight-8": "#dde8fd",
	"primaryColorDark-2": "#446fc6",
	"primaryColorDark-4": "#335394",
	"primaryColorDark-6": "#223863",
	"primaryColorDark-8": "#111c31",
	"primaryColorOpacity-2": "rgba(85,139,247,0.8)",
	"primaryColorOpacity-4": "rgba(85,139,247,0.6)",
	"primaryColorOpacity-6": "rgba(85,139,247,0.4)",
	"primaryColorOpacity-8": "rgba(85,139,247,0.2)"
};
var Layout = {
	siderColor: "#001426"
};
var Menu = {
	itemTextColor: "#C2DEF8",
	itemTextActiveColor: "#FFFFFF",
	itemTextHoverColor: "#C2DEF8",
	itemBodyColor: "#FFFFFF00",
	itemBodyActiveColor: "#4474D6",
	itemBodyHoverColor: "inherit",
	itemBtnTextColor: "#001426",
	itemBtnTextActiveColor: "#FFFFFF",
	itemBtnTextHoverColor: "#558BF7",
	itemBtnBodyColor: "inherit",
	itemBtnBodyActiveColor: "#558BF7",
	itemBtnBodyHoverColor: "#DDE8FD",
	itemChildTextColor: "#001426",
	itemChildTextActiveColor: "#558BF7",
	itemChildTextHoverColor: "#558BF7",
	itemChildBodyColor: "inherit",
	itemChildBodyActiveColor: "#DDE8FD",
	itemChildBodyHoverColor: "#DDE8FD"
};
var Button = {
};
var Input = {
	activeColor: "",
	hoverColor: "#558BF7",
	focusColor: "#dde8fd"
};
var PageSelect = {
	solidColor: "#ffffff"
};
var Tabs = {
	backgroundColor: "#ffffff",
	hollowColor: ""
};
var Card = {
	bgColor: "#ffffff"
};
var upload = {
	bgColor: "#ffffff"
};
var Table = {
	borderColor: "#f5f5f5"
};
var _colors = {
	Common: Common,
	Layout: Layout,
	Menu: Menu,
	Button: Button,
	Input: Input,
	PageSelect: PageSelect,
	Tabs: Tabs,
	Card: Card,
	upload: upload,
	Table: Table
};

var _sizes = {
	
};

var Background = {
	image: "",
	color: "#f0f2f5",
	blur: "blur(20px)"
};
var _basics = {
	Background: Background
};

const defaultTheme = () => cloneDeep(merge(_colors, _sizes, _basics));
const transformTheme2CssVars = (theme) => {
  const result = {};
  let keys = [];
  const recursion = (option2) => {
    for (const k in option2) {
      const v = option2[k];
      const isObject = typeof v === "object";
      keys.push(k);
      if (isObject) {
        recursion(v);
        keys = [];
      } else {
        const key = kebabCase(keys.map((v2) => v2[0].toUpperCase() + v2.slice(1)).join("").trim());
        const value = v;
        key && (result[key] = value);
        keys.splice(keys.length - 1, 1);
      }
    }
  };
  recursion(theme);
  return result;
};
const useTheme = (identif) => {
  const themeDefault = ref(defaultTheme());
  const themeOverrides = inject("themeOverrides");
  const themeMerge = computed(() => merge(themeDefault.value, themeOverrides?.value)[identif]);
  return themeMerge;
};
const useGlobalTheme = () => {
  const theme = ref(defaultTheme());
  const themeOverrides = inject("themeOverrides");
  const themeMerge = computed(() => merge(theme.value, themeOverrides?.value));
  return themeMerge;
};

const _withId$8 = /* @__PURE__ */ withScopeId("data-v-4090dad8");
const __default__$H = defineComponent({ name: "CalButton" });
var script$J = defineComponent({
  ...__default__$H,
  props: {
    ...Button$1.props
  },
  setup(__props) {
    const props = __props;
    useTheme("Common");
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Button$1), mergeProps({ class: "cal-btn bg-com" }, { shape: "round", ...props }), {
        default: _withId$8(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});

script$J.__scopeId = "data-v-4090dad8";
script$J.__file = "package/components/button/src/Button.vue";

const __default__$G = defineComponent({ name: "CalGlobalStyle" });
var script$I = defineComponent({
  ...__default__$G,
  props: {
    root: {
      type: Object,
      default: document.documentElement
    }
  },
  setup(__props) {
    const props = __props;
    const root = toRef(props, "root");
    const globalTheme = useGlobalTheme();
    watchEffect(() => {
      const cssVars = transformTheme2CssVars(globalTheme.value);
      for (const key in cssVars) {
        root.value.style.removeProperty(`--${key}`);
        root.value.style.setProperty(`--${key}`, cssVars[key]);
      }
    });
    return (_ctx, _cache) => {
      return renderSlot(_ctx.$slots, "default");
    };
  }
});

script$I.__file = "package/components/global-style/src/GlobalStyle.vue";

const __default__$F = defineComponent({ name: "CalProvide" });
var script$H = defineComponent({
  ...__default__$F,
  props: {
    id: {
      type: String,
      required: true
    },
    value: Object
  },
  setup(__props) {
    const props = __props;
    provide(props.id, props.value);
    return (_ctx, _cache) => {
      return renderSlot(_ctx.$slots, "default");
    };
  }
});

script$H.__file = "package/components/_internal/src/Provide.vue";

NDescriptions.name = "CalDescriptions";

NDescriptionsItem.name = "CalDescriptionsItem";

pushScopeId("data-v-2c3c6643");
const _hoisted_1$f = { class: "cal-config-provider" };
popScopeId();
const __default__$E = defineComponent({ name: "CalConfigProvider" });
var script$G = defineComponent({
  ...__default__$E,
  props: {
    ...ConfigProvider.props,
    themeOverrides: {
      type: Object,
      default: {}
    }
  },
  setup(__props) {
    const props = __props;
    const themeOverrides = toRef(props, "themeOverrides");
    provide("themeOverrides", themeOverrides);
    return (_ctx, _cache) => {
      return openBlock(), createBlock("div", _hoisted_1$f, [
        renderSlot(_ctx.$slots, "default")
      ]);
    };
  }
});

script$G.__scopeId = "data-v-2c3c6643";
script$G.__file = "package/components/config-provider/src/ConfigProvider.vue";

const _hoisted_1$e = { class: "cal-menu transition-all duration-200" };
const __default__$D = defineComponent({ name: "CalMenu" });
var script$F = defineComponent({
  ...__default__$D,
  props: {
    collapseWidth: {
      type: [Number, String],
      default: 66
    },
    collapse: Boolean,
    defaultActive: {
      type: Array,
      default: []
    },
    onUpdate: {
      type: Function
    },
    styleType: String
  },
  setup(__props) {
    const props = __props;
    provide("collapse", toRef(props, "collapse"));
    provide("defaultActive", toRef(props, "defaultActive"));
    provide("onUpdate", props.onUpdate);
    provide("styleType", props.styleType);
    return (_ctx, _cache) => {
      return openBlock(), createBlock("ul", _hoisted_1$e, [
        renderSlot(_ctx.$slots, "default")
      ]);
    };
  }
});

script$F.__file = "package/components/menu/src/Menu.vue";

const _withId$7 = /* @__PURE__ */ withScopeId("data-v-9a2e6faa");
pushScopeId("data-v-9a2e6faa");
const _hoisted_1$d = { class: "cal-menu-item__prefix" };
const _hoisted_2$b = {
  key: 0,
  class: "cal-menu-item__content"
};
popScopeId();
const __default__$C = defineComponent({ name: "CalMenuItem" });
var script$E = defineComponent({
  ...__default__$C,
  props: {
    index: String,
    indicator: {
      type: Boolean
    },
    vertical: Boolean,
    notUpdate: Boolean
  },
  setup(__props) {
    const props = __props;
    useTheme("Menu");
    const collapse = inject("collapse");
    const defaultActive = inject("defaultActive");
    const styleType = inject("styleType");
    const isChildren = inject("isChildren");
    const onUpdate = inject("onUpdate");
    const active = computed(() => {
      return defaultActive.value.some((v) => v === props.index);
    });
    const itemCalss = computed(() => {
      const buttonClass = ["cal-munu-item__button"];
      const buttonActiveClass = [
        "cal-munu-item__button__default",
        "cal-munu-item__button-active",
        { "cal-munu-item__indicator": props.indicator }
      ];
      const childrenClass = ["cal-munu-item__children"];
      const childrenAcitveClass = [
        "cal-munu-item__children-active",
        { "cal-munu-item__indicator": props.indicator }
      ];
      const defaultClass = ["cal-munu-item__default"];
      const defaultActiveClass = [
        "cal-munu-item__default-active",
        { "cal-munu-item__indicator": props.indicator }
      ];
      let currentActiveClass = [];
      let currentClass = [];
      if (isChildren) {
        styleType === "button" && childrenClass.push("cal-munu-item__button__default");
        styleType === "button" && childrenAcitveClass.push("cal-munu-item__button__default");
        currentClass = childrenClass;
        currentActiveClass = childrenAcitveClass;
      } else if (styleType === "button") {
        currentClass = buttonClass;
        currentActiveClass = buttonActiveClass;
      } else {
        currentClass = defaultClass;
        currentActiveClass = defaultActiveClass;
      }
      return active.value ? currentActiveClass : currentClass;
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock("li", {
        class: ["\r\n      cal-menu-item\r\n      cursor-pointer\r\n      transition-all\r\n      duration-500\r\n      text-center\r\n      flex\r\n      justify-center\r\n      items-center\r\n    ", [unref(itemCalss), __props.vertical ? "flex-col" : "", unref(collapse) ? "cal-menu-item--collapse" : ""]],
        onClick: _cache[1] || (_cache[1] = ($event) => !__props.notUpdate && unref(onUpdate)?.(__props.index))
      }, [
        createVNode("span", _hoisted_1$d, [
          renderSlot(_ctx.$slots, "prefix")
        ]),
        createVNode(Transition, {
          "enter-active-class": "animate__bounceIn",
          "leave-active-class": "animate__bounceOut",
          duration: { enter: 400, leave: 100 }
        }, {
          default: _withId$7(() => [
            !unref(collapse) ? (openBlock(), createBlock("span", _hoisted_2$b, [
              renderSlot(_ctx.$slots, "default")
            ])) : createCommentVNode("v-if", true)
          ]),
          _: 3
        }),
        renderSlot(_ctx.$slots, "suffix")
      ], 2);
    };
  }
});

script$E.__scopeId = "data-v-9a2e6faa";
script$E.__file = "package/components/menu/src/MenuItem.vue";

/*
 * @Author: Mr.Mao
 * @Date: 2021-06-28 16:37:00
 * @LastEditTime: 2021-06-28 16:51:21
 * @Description: 浏览器工具
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
const isBrowser = typeof window !== 'undefined';
const isWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
const weexPlatform = isWeex && WXEnvironment.platform.toLowerCase();
const UA = isBrowser && window.navigator.userAgent.toLowerCase();
UA && /msie|trident/.test(UA);
UA && UA.indexOf('msie 9.0') > 0;
navigator.userAgent.indexOf('Trident') > -1 && navigator.userAgent.indexOf('rv:11.0') > -1;
const isEdge = UA && UA.indexOf('edge/') > 0;
(UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
(UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
UA && /chrome\/\d+/.test(UA) && !isEdge;
UA && /phantomjs/.test(UA);
UA && UA.match(/firefox\/(\d+)/);

/*
 * @Author: Mr.Mao
 * @Date: 2021-06-28 16:47:04
 * @LastEditTime: 2021-06-28 16:48:57
 * @Description:
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
/**
 * 如果有单位，如百分比，px单位等，直接返回，如果是纯粹的数值，则加上px单位
 * @param unit 单元
 * @returns string
 */
const analyUnit = (unit) => {
    return typeof unit === 'string' && /[^0-9]/g.test(unit) ? unit : unit + 'px';
};
/**
 * 过滤为价格(两位小数点)
 * @param value 传入字符
 */
const filterPrice = (value) => {
    return value
        .replace(/^[^\d+]/, '')
        .replace(/[^\d{1,}.\d{1,}|\d{1,}]/g, '')
        .replace('.', '$#$')
        .replace(/\./g, '')
        .replace('$#$', '.')
        .replace(/\.{2,}/g, '.')
        .replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
};

function wrap(o) {
    return isRef(o) ? o : ref(o); // NOTE in v3 this is not necessary
}
const isNumber = (val) => typeof val === "number";
const NO_OP = () => { };
const PASSIVE_EV = { passive: true };
const isClient$1 = typeof window != "undefined";
// compact version: https://stackoverflow.com/a/33146982/1209882
/**
 * returns a random string
 * @param len length of the string max: 36
 */
// export function randomString(len: number) {
//   return (+new Date).toString(36).slice(-len);
// }

function useEvent(el, name, listener, options) {
    let remove = NO_OP;
    if (el) {
        const element = wrap(el);
        const removeEventListener = (e) => e.removeEventListener(name, listener);
        const addEventListener = (e) => e.addEventListener(name, listener, options);
        const removeWatch = watch(element, (n, _, cleanUp) => {
            if (n) {
                addEventListener(n);
                cleanUp(() => removeEventListener(n));
            }
        }, { immediate: true });
        remove = () => {
            removeEventListener(element.value);
            removeWatch();
        };
    }
    return remove;
}

/**
 * Create `debounced` function, options object can be changed after creation to update behaviour
 * @param handler - function to be debounced
 * @param wait - debounce ms
 * @param options - debounce options
 */
function useDebounce(handler, wait, options) {
    return debounce(handler, wait, options);
}
function debounce(func, waitMilliseconds = 50, options = {
    isImmediate: false
}) {
    let timeoutId;
    return function (...args) {
        const context = this;
        const doLater = function () {
            timeoutId = undefined;
            if (!options.isImmediate) {
                func.apply(context, args);
            }
        };
        const shouldCallNow = options.isImmediate && timeoutId === undefined;
        if (timeoutId !== undefined) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(doLater, waitMilliseconds);
        if (shouldCallNow) {
            func.apply(context, args);
        }
    };
}

function useOnResize(el, options, wait) {
    const element = wrap(el);
    const height = ref(element.value && element.value.clientHeight);
    const width = ref(element.value && element.value.clientWidth);
    let handler = () => {
        height.value = element.value.clientHeight;
        width.value = element.value.clientWidth;
    };
    const [eventOptions, ms] = isNumber(options)
        ? [undefined, options]
        : [options, wait];
    if (ms) {
        handler = useDebounce(handler, wait);
    }
    // resize seems only to be fired against the window
    const remove = isClient$1
        ? useEvent(window, "resize", handler, eventOptions || PASSIVE_EV)
        : /* istanbul ignore next */ NO_OP;
    if (isRef(el) && !el.value) {
        onMounted(handler);
    }
    return {
        height,
        width,
        remove
    };
}
/* istanbul ignore next */
/*#__PURE__*/ Symbol(((process.env.NODE_ENV !== 'production') && "RetryId") || ``);
/* istanbul ignore next */
/*#__PURE__*/ Symbol(((process.env.NODE_ENV !== 'production') && "CancellationToken") || ``);

// istanbul ignore next
Symbol(((process.env.NODE_ENV !== 'production') && "DEVTOOLS_KEY") || ``);

let setupDevtoolsPlugin = NO_OP;
// NOTE maybe change this to other flag
if ((process.env.NODE_ENV !== 'production')) {
    try {
        setupDevtoolsPlugin = require("@vue/devtools-api").setupDevtoolsPlugin;
    }
    catch { }
}

// istanbul ignore next
Symbol(((process.env.NODE_ENV !== 'production') && "TAILWIND_BREAKPOINTS") || ``);

(process.env.NODE_ENV !== 'production') ? "__storage_test__" : ":$";

// istanbul ignore next
// Symbol used to inject/provide the i18n values
Symbol(((process.env.NODE_ENV !== 'production') && "I18n") || ``);

// istanbul ignore next
Symbol(((process.env.NODE_ENV !== 'production') && "SSR_TITLE_KEY") || ``);

// istanbul ignore next
Symbol(((process.env.NODE_ENV !== 'production') && "VUE_COMPOSABLE_HYDRATION_KEY") || ``);

/** 默认配置 */
({
    list: ref([]),
    init: true,
    pageSize: 10,
    total: 1,
    currentPage: 1,
    sources: []
});

var collapsed = "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M17.75 16C18.1642 16 18.5 16.3358 18.5 16.75C18.5 17.1642 18.1642 17.5 17.75 17.5H8.75C8.33579 17.5 8 17.1642 8 16.75C8 16.3358 8.33579 16 8.75 16H17.75ZM2.71967 11.2197L4.71967 9.21967C5.01256 8.92678 5.48744 8.92678 5.78033 9.21967C6.0466 9.48594 6.0708 9.9026 5.85295 10.1962L5.78033 10.2803L4.31066 11.75L5.78033 13.2197C6.07322 13.5126 6.07322 13.9874 5.78033 14.2803C5.51406 14.5466 5.0974 14.5708 4.80379 14.3529L4.71967 14.2803L2.71967 12.2803C2.4534 12.0141 2.4292 11.5974 2.64705 11.3038L2.71967 11.2197L4.71967 9.21967L2.71967 11.2197ZM20.75 11C21.1642 11 21.5 11.3358 21.5 11.75C21.5 12.1642 21.1642 12.5 20.75 12.5H8.75C8.33579 12.5 8 12.1642 8 11.75C8 11.3358 8.33579 11 8.75 11H20.75ZM17.75 6C18.1642 6 18.5 6.33579 18.5 6.75C18.5 7.16421 18.1642 7.5 17.75 7.5H8.75C8.33579 7.5 8 7.16421 8 6.75C8 6.33579 8.33579 6 8.75 6H17.75Z\" fill=\"currentColor\"/></svg>";
var option = {
	collapsed: collapsed,
	"up-arrow": "<svg   viewBox=\"0 0 20 20\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M14.2032 13C15.0439 13 15.5094 12.0257 14.9811 11.3717L11.1667 6.649C10.5663 5.90567 9.43323 5.90567 8.83285 6.649L5.01839 11.3717C4.49016 12.0257 4.95565 13 5.79633 13L14.2032 13Z\" fill=\"currentColor\"/></svg>"
};

const __default__$B = defineComponent({ name: "CalIcon" });
var script$D = defineComponent({
  ...__default__$B,
  props: {
    type: {
      type: String,
      required: true
    },
    size: String,
    color: String,
    svgSize: Boolean
  },
  setup(__props) {
    const props = __props;
    const width = computed(() => {
      const value = option[props.type]?.match(/width="(?<width>\w*%?)"/)?.groups?.width || "";
      return props.svgSize && analyUnit(value) || "";
    });
    const height = computed(() => {
      const value = option[props.type]?.match(/height="(?<height>\w*%?)"/)?.groups?.height || "";
      return props.svgSize && analyUnit(value) || "";
    });
    const svgTag = computed(() => {
      const value = option[props.type];
      if (!props.svgSize) {
        return value?.replace(/width="(\w*%?)"/g, "")?.replace(/height="(\w*%?)"/g, "");
      }
      return value;
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock("i", {
        class: "cal-icon",
        innerHTML: unref(svgTag),
        style: { color: __props.color, fontSize: unref(analyUnit)(__props.size || ""), width: unref(width), height: unref(height) }
      }, null, 12, ["innerHTML"]);
    };
  }
});

script$D.__scopeId = "data-v-677e57b8";
script$D.__file = "package/components/icon/src/Icon.vue";

const __default__$A = defineComponent({ name: "CalCollapseTransition" });
var script$C = defineComponent({
  ...__default__$A,
  setup(__props) {
    const on = {
      beforeEnter(el) {
        el.classList.add("collapse-transition");
        if (!el.dataset)
          el.dataset = {};
        el.dataset.oldPaddingTop = el.style.paddingTop;
        el.dataset.oldPaddingBottom = el.style.paddingBottom;
        el.style.height = "0";
        el.style.paddingTop = "0";
        el.style.paddingBottom = "0";
      },
      enter(el) {
        el.dataset.oldOverflow = el.style.overflow;
        if (el.scrollHeight !== 0) {
          el.style.height = el.scrollHeight + "px";
          el.style.paddingTop = el.dataset.oldPaddingTop || "0";
          el.style.paddingBottom = el.dataset.oldPaddingBottom || "0";
        } else {
          el.style.height = "";
          el.style.paddingTop = el.dataset.oldPaddingTop || "0";
          el.style.paddingBottom = el.dataset.oldPaddingBottom || "0";
        }
        el.style.overflow = "hidden";
      },
      afterEnter(el) {
        el.classList.remove("collapse-transition");
        el.style.height = "";
        el.style.overflow = el.dataset.oldOverflow || "0";
      },
      beforeLeave(el) {
        if (!el.dataset)
          el.dataset = {};
        el.dataset.oldPaddingTop = el.style.paddingTop;
        el.dataset.oldPaddingBottom = el.style.paddingBottom;
        el.dataset.oldOverflow = el.style.overflow;
        el.style.height = el.scrollHeight + "px";
        el.style.overflow = "hidden";
      },
      leave(el) {
        if (el.scrollHeight !== 0) {
          el.classList.add("collapse-transition");
          el.style.transitionProperty = "height";
          el.style.height = "0";
          el.style.paddingTop = "0";
          el.style.paddingBottom = "0";
        }
      },
      afterLeave(el) {
        el.classList.remove("collapse-transition");
        el.style.height = "";
        el.style.overflow = el.dataset.oldOverflow || "0";
        el.style.paddingTop = el.dataset.oldPaddingTop || "0";
        el.style.paddingBottom = el.dataset.oldPaddingBottom || "0";
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, toHandlers(on), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});

script$C.__file = "package/components/transition/src/CollapseTransition.vue";

const _withId$6 = /* @__PURE__ */ withScopeId("data-v-57e914d2");
pushScopeId("data-v-57e914d2");
const _hoisted_1$c = { class: "cal-menu-group" };
const _hoisted_2$a = { class: "cal-menu-group__contents" };
popScopeId();
const __default__$z = defineComponent({ name: "CalMenuGroup" });
var script$B = defineComponent({
  ...__default__$z,
  props: {
    index: {
      type: [String],
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    const defaultActive = inject("defaultActive");
    const active = computed(() => {
      return defaultActive.value.some((v) => v === props.index);
    });
    const showMenuItems = ref(false);
    setTimeout(() => showMenuItems.value = active.value);
    const onShowMenuItems = () => {
      showMenuItems.value = !showMenuItems.value;
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock("ul", _hoisted_1$c, [
        createVNode(script$E, {
          index: __props.index,
          onClick: onShowMenuItems,
          "not-update": ""
        }, {
          prefix: _withId$6(() => [
            renderSlot(_ctx.$slots, "prefix")
          ]),
          suffix: _withId$6(() => [
            createVNode("div", {
              class: ["cal-menu-group__icon transform duration-200 absolute", [showMenuItems.value ? "rotate-0" : "-rotate-180"]]
            }, [
              createVNode(script$D, {
                size: "20",
                type: "up-arrow"
              })
            ], 2)
          ]),
          default: _withId$6(() => [
            renderSlot(_ctx.$slots, "title")
          ]),
          _: 3
        }, 8, ["index"]),
        createVNode(script$C, null, {
          default: _withId$6(() => [
            createVNode(script$H, {
              id: "isChildren",
              value: true
            }, {
              default: _withId$6(() => [
                withDirectives(createVNode("ul", _hoisted_2$a, [
                  renderSlot(_ctx.$slots, "default")
                ], 512), [
                  [vShow, showMenuItems.value]
                ])
              ]),
              _: 3
            })
          ]),
          _: 1
        })
      ]);
    };
  }
});

script$B.__scopeId = "data-v-57e914d2";
script$B.__file = "package/components/menu/src/MenuGroup.vue";

const __default__$y = defineComponent({ name: "CalLayout" });
var script$A = defineComponent({
  ...__default__$y,
  props: {
    ...Layout$1.props,
    iconClass: String
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Layout$1), { class: "cal-layout" }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      });
    };
  }
});

script$A.__file = "package/components/layout/src/Layout.vue";

const __default__$x = defineComponent({ name: "CalLayoutContent" });
var script$z = defineComponent({
  ...__default__$x,
  props: Layout$1.props,
  setup(__props) {
    const props = __props;
    const LayoutContent = Layout$1.Content;
    return (_ctx, _cache) => {
      const _directive_bond = resolveDirective("bond");
      return withDirectives((openBlock(), createBlock(unref(LayoutContent), null, {
        default: withCtx(() => [
          (openBlock(true), createBlock(Fragment, null, renderList(_ctx.$slots, (i, k) => {
            return renderSlot(_ctx.$slots, k, { key: k });
          }), 128))
        ]),
        _: 3
      }, 512)), [
        [_directive_bond, props]
      ]);
    };
  }
});

script$z.__file = "package/components/layout/src/LayoutContent.vue";

const __default__$w = defineComponent({ name: "CalLayoutSider" });
var script$y = defineComponent({
  ...__default__$w,
  props: {
    ...Layout$1.props,
    iconClass: String
  },
  setup(__props) {
    const props = __props;
    const LayoutSider = Layout$1.Sider;
    useTheme("Layout");
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(LayoutSider), mergeProps({ class: "cal-layout-sider bg-layout-sider-color" }, props), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});

script$y.__file = "package/components/layout/src/LayoutSider.vue";

const __default__$v = defineComponent({ name: "CalBackground" });
var script$x = defineComponent({
  ...__default__$v,
  props: {
    image: String,
    color: String,
    blur: String,
    zIndex: {
      type: Number,
      default: -100
    }
  },
  setup(__props) {
    const props = __props;
    const theme = useTheme("Background");
    const image = computed(() => props.image || theme.value.image);
    const color = computed(() => props.color || theme.value.color);
    const blur = computed(() => props.blur || theme.value.blur);
    return (_ctx, _cache) => {
      return openBlock(), createBlock("div", {
        class: "cal-background absolute left-0 top-0 bottom-0 right-0 overflow-hidden",
        style: { backgroundColor: unref(color), filter: unref(blur), backgroundImage: unref(image), zIndex: __props.zIndex }
      }, null, 4);
    };
  }
});

script$x.__scopeId = "data-v-7fb68958";
script$x.__file = "package/components/background/src/Background.vue";

const inheritNaiveUiProps = (Component) => {
  const props = Component["props"];
  return props;
};

const __default__$u = defineComponent({ name: "CalEllipsis" });
var script$w = defineComponent({
  ...__default__$u,
  props: {
    ...inheritNaiveUiProps(NEllipsis)
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(NEllipsis), mergeProps({ class: "cal-ellipsis" }, props), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});

script$w.__file = "package/components/ellipsis/src/Ellipsis.vue";

const __default__$t = defineComponent({ name: "CalSpace" });
var script$v = defineComponent({
  ...__default__$t,
  props: {
    ...inheritNaiveUiProps(NSpace)
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(NSpace), mergeProps({ class: "cal-space" }, props), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});

script$v.__file = "package/components/space/src/Space.vue";

const _hoisted_1$b = { class: "cal-grid__container" };
const _hoisted_2$9 = { class: "cal-grid__view" };
const __default__$s = defineComponent({ name: "CalGrid" });
var script$u = defineComponent({
  ...__default__$s,
  props: {
    size: {
      type: [Number, String, Object],
      require: true
    },
    gap: {
      type: Number,
      default: 24
    }
  },
  setup(__props) {
    const props = __props;
    const handelSize = computed(() => {
      if (typeof props.size === "string" || typeof props.size === "number") {
        return { width: analyUnit(props.size), height: analyUnit(props.size) };
      } else if (typeof props.size === "object") {
        return {
          width: analyUnit(props.size?.width || "0"),
          height: analyUnit(props.size?.height || "0")
        };
      }
      return { width: "", height: "" };
    });
    useCssVars(() => ({
      ...handelSize.value,
      gap: analyUnit(props.gap)
    }));
    return (_ctx, _cache) => {
      return openBlock(), createBlock("div", _hoisted_1$b, [
        createVNode("div", _hoisted_2$9, [
          renderSlot(_ctx.$slots, "default")
        ])
      ]);
    };
  }
});

script$u.__file = "package/components/grid/src/Grid.vue";

const isClient = typeof window !== 'undefined';

isClient ? window : undefined;
isClient ? window.document : undefined;
isClient ? window.navigator : undefined;

var SwipeDirection;
(function (SwipeDirection) {
    SwipeDirection["UP"] = "UP";
    SwipeDirection["RIGHT"] = "RIGHT";
    SwipeDirection["DOWN"] = "DOWN";
    SwipeDirection["LEFT"] = "LEFT";
    SwipeDirection["NONE"] = "NONE";
})(SwipeDirection || (SwipeDirection = {}));

/**
 * Shorthand for v-model binding, props + emit -> ref
 *
 * @see https://vueuse.org/useVModel
 * @param props
 * @param key (default 'value' in Vue 2 and 'modelValue' in Vue 3)
 * @param emit
 */
function useVModel(props, key, emit, options = {}) {
    var _a, _b, _c;
    const { passive = false, eventName, } = options;
    const vm = getCurrentInstance();
    // @ts-expect-error mis-alignment with @vue/composition-api
    const _emit = emit || (vm === null || vm === void 0 ? void 0 : vm.emit) || ((_a = vm === null || vm === void 0 ? void 0 : vm.$emit) === null || _a === void 0 ? void 0 : _a.bind(vm));
    let event = eventName;
    if (!key) {
        if (isVue2) {
            const modelOptions = (_c = (_b = vm === null || vm === void 0 ? void 0 : vm.proxy) === null || _b === void 0 ? void 0 : _b.$options) === null || _c === void 0 ? void 0 : _c.model;
            key = (modelOptions === null || modelOptions === void 0 ? void 0 : modelOptions.value) || 'value';
            if (!eventName)
                event = (modelOptions === null || modelOptions === void 0 ? void 0 : modelOptions.event) || 'input';
        }
        else {
            key = 'modelValue';
        }
    }
    event = eventName || event || `update:${key}`;
    if (passive) {
        const proxy = ref$1(props[key]);
        watch$1(() => props[key], v => proxy.value = v);
        watch$1(proxy, (v) => {
            if (v !== props[key])
                _emit(event, v);
        });
        return proxy;
    }
    else {
        return computed$1({
            get() {
                return props[key];
            },
            set(value) {
                _emit(event, value);
            },
        });
    }
}

const _hoisted_1$a = {
  key: 1,
  class: "flex items-center text-gray-darkmin"
};
const _hoisted_2$8 = { key: 0 };
const __default__$r = defineComponent({ name: "CalInput" });
var script$t = defineComponent({
  ...__default__$r,
  props: {
    modelValue: [String, Number],
    showCount: Boolean,
    maxLength: Number,
    placeholder: String
  },
  emits: [],
  setup(__props, { emit }) {
    const props = __props;
    const slots = useSlots();
    const inputValue = useVModel(props, "modelValue", emit);
    const currentFontNumber = ref(0);
    const inputChange = ({ target: { value } }) => {
      currentFontNumber.value = value?.length || 0;
    };
    watch(() => props.modelValue, (value) => {
      currentFontNumber.value = value?.length || 0;
    }, { immediate: true });
    useTheme("Input");
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Input$1), mergeProps({ class: "cal-input" }, props, {
        value: unref(inputValue),
        "onUpdate:value": _cache[1] || (_cache[1] = ($event) => isRef(inputValue) ? inputValue.value = $event : null),
        onChange: inputChange
      }), {
        suffix: withCtx(() => [
          unref(slots)["suffix"] ? renderSlot(_ctx.$slots, "suffix", { key: 0 }) : __props.showCount ? (openBlock(), createBlock("div", _hoisted_1$a, [
            createVNode("span", null, toDisplayString(currentFontNumber.value), 1),
            __props.maxLength ? (openBlock(), createBlock("span", _hoisted_2$8, "/" + toDisplayString(__props.maxLength), 1)) : createCommentVNode("v-if", true)
          ])) : createCommentVNode("v-if", true)
        ]),
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["value"]);
    };
  }
});

script$t.__file = "package/components/input/src/Input.vue";

const defaultOption = { wait: 300 };
const useShakeDataHandel = (handelFun, option = defaultOption) => {
  const cache = ref("");
  const debounceHandel = debounce$1(handelFun, option.wait);
  return {
    virtualValue: computed({
      get: () => cache.value,
      set(value) {
        cache.value = value;
        debounceHandel({ value, realValue: cache });
      }
    }),
    realValue: cache
  };
};

const _hoisted_1$9 = /* @__PURE__ */ createVNode("div", {
  class: "text-center text-sm text-gray-darkmin my-auto",
  style: { "min-width": "32px" }
}, "-", -1);
const __default__$q = defineComponent({ name: "CalInputSection" });
var script$s = defineComponent({
  ...__default__$q,
  props: {
    placeholder: {
      type: String,
      default: ""
    },
    width: {
      type: [Number, String],
      default: 175
    },
    modelValue: {
      type: Object,
      default: ["", ""]
    },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 1e5 },
    openAutoSize: Boolean
  },
  emits: [],
  setup(__props, { emit }) {
    const props = __props;
    const modelValue = useVModel(props, "modelValue", emit);
    const rangeJudge = (value) => value > props.max || +value < props.min;
    const { virtualValue: minValue, realValue: minRealValue } = useShakeDataHandel(({ value }) => {
      if (value === "") {
        modelValue.value[0] = "";
      } else if (props.openAutoSize && +value > +maxValue.value) {
        modelValue.value[0] = minRealValue.value = maxValue.value;
      } else if (rangeJudge(value)) {
        modelValue.value[0] = minRealValue.value = value > props.max ? props.max : props.min;
      } else {
        modelValue.value[0] = minRealValue.value = filterPrice(value + "");
      }
    }, { wait: 400 });
    const { virtualValue: maxValue, realValue: maxRealValue } = useShakeDataHandel(({ value }) => {
      if (value === "") {
        modelValue.value[1] = "";
      } else if (props.openAutoSize && +value < +minValue.value) {
        modelValue.value[1] = maxRealValue.value = minValue.value;
      } else if (rangeJudge(value)) {
        modelValue.value[1] = maxRealValue.value = value > props.max ? props.max : props.min;
      } else {
        modelValue.value[1] = maxRealValue.value = filterPrice(value + "");
      }
    }, { wait: 400 });
    watch(() => modelValue.value, (value) => {
      minRealValue.value = value[0];
      maxRealValue.value = value[1];
    }, { immediate: true });
    useTheme("Input");
    return (_ctx, _cache) => {
      const _component_cal_input = resolveComponent("cal-input");
      return openBlock(), createBlock("div", {
        class: "flex h-36",
        style: { width: unref(analyUnit)(__props.width) }
      }, [
        createVNode(_component_cal_input, {
          placeholder: __props.placeholder,
          modelValue: unref(minValue),
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(minValue) ? minValue.value = $event : null)
        }, null, 8, ["placeholder", "modelValue"]),
        _hoisted_1$9,
        createVNode(_component_cal_input, {
          placeholder: __props.placeholder,
          modelValue: unref(maxValue),
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => isRef(maxValue) ? maxValue.value = $event : null)
        }, null, 8, ["placeholder", "modelValue"])
      ], 4);
    };
  }
});

script$s.__file = "package/components/input/src/InputSection.vue";

const __default__$p = defineComponent({ name: "CalInputPassword" });
var script$r = defineComponent({
  ...__default__$p,
  setup(__props) {
    const props = __props;
    useTheme("Input");
    return (_ctx, _cache) => {
      const _component_a_input_password = resolveComponent("a-input-password");
      return openBlock(), createBlock(_component_a_input_password, props, null, 16);
    };
  }
});

script$r.__file = "package/components/input/src/InputPassword.vue";

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var moment = createCommonjsModule(function (module, exports) {
(function (global, factory) {
    module.exports = factory() ;
}(commonjsGlobal, (function () {
    var hookCallback;

    function hooks() {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback(callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return (
            input instanceof Array ||
            Object.prototype.toString.call(input) === '[object Array]'
        );
    }

    function isObject(input) {
        // IE8 will treat undefined and null as object if it wasn't for
        // input != null
        return (
            input != null &&
            Object.prototype.toString.call(input) === '[object Object]'
        );
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function isObjectEmpty(obj) {
        if (Object.getOwnPropertyNames) {
            return Object.getOwnPropertyNames(obj).length === 0;
        } else {
            var k;
            for (k in obj) {
                if (hasOwnProp(obj, k)) {
                    return false;
                }
            }
            return true;
        }
    }

    function isUndefined(input) {
        return input === void 0;
    }

    function isNumber(input) {
        return (
            typeof input === 'number' ||
            Object.prototype.toString.call(input) === '[object Number]'
        );
    }

    function isDate(input) {
        return (
            input instanceof Date ||
            Object.prototype.toString.call(input) === '[object Date]'
        );
    }

    function map(arr, fn) {
        var res = [],
            i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function createUTC(input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty: false,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: false,
            invalidEra: null,
            invalidMonth: null,
            invalidFormat: false,
            userInvalidated: false,
            iso: false,
            parsedDateParts: [],
            era: null,
            meridiem: null,
            rfc2822: false,
            weekdayMismatch: false,
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    var some;
    if (Array.prototype.some) {
        some = Array.prototype.some;
    } else {
        some = function (fun) {
            var t = Object(this),
                len = t.length >>> 0,
                i;

            for (i = 0; i < len; i++) {
                if (i in t && fun.call(this, t[i], i, t)) {
                    return true;
                }
            }

            return false;
        };
    }

    function isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m),
                parsedParts = some.call(flags.parsedDateParts, function (i) {
                    return i != null;
                }),
                isNowValid =
                    !isNaN(m._d.getTime()) &&
                    flags.overflow < 0 &&
                    !flags.empty &&
                    !flags.invalidEra &&
                    !flags.invalidMonth &&
                    !flags.invalidWeekday &&
                    !flags.weekdayMismatch &&
                    !flags.nullInput &&
                    !flags.invalidFormat &&
                    !flags.userInvalidated &&
                    (!flags.meridiem || (flags.meridiem && parsedParts));

            if (m._strict) {
                isNowValid =
                    isNowValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }

            if (Object.isFrozen == null || !Object.isFrozen(m)) {
                m._isValid = isNowValid;
            } else {
                return isNowValid;
            }
        }
        return m._isValid;
    }

    function createInvalid(flags) {
        var m = createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        } else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var momentProperties = (hooks.momentProperties = []),
        updateInProgress = false;

    function copyConfig(to, from) {
        var i, prop, val;

        if (!isUndefined(from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (!isUndefined(from._i)) {
            to._i = from._i;
        }
        if (!isUndefined(from._f)) {
            to._f = from._f;
        }
        if (!isUndefined(from._l)) {
            to._l = from._l;
        }
        if (!isUndefined(from._strict)) {
            to._strict = from._strict;
        }
        if (!isUndefined(from._tzm)) {
            to._tzm = from._tzm;
        }
        if (!isUndefined(from._isUTC)) {
            to._isUTC = from._isUTC;
        }
        if (!isUndefined(from._offset)) {
            to._offset = from._offset;
        }
        if (!isUndefined(from._pf)) {
            to._pf = getParsingFlags(from);
        }
        if (!isUndefined(from._locale)) {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i = 0; i < momentProperties.length; i++) {
                prop = momentProperties[i];
                val = from[prop];
                if (!isUndefined(val)) {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        if (!this.isValid()) {
            this._d = new Date(NaN);
        }
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment(obj) {
        return (
            obj instanceof Moment || (obj != null && obj._isAMomentObject != null)
        );
    }

    function warn(msg) {
        if (
            hooks.suppressDeprecationWarnings === false &&
            typeof console !== 'undefined' &&
            console.warn
        ) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
            if (hooks.deprecationHandler != null) {
                hooks.deprecationHandler(null, msg);
            }
            if (firstTime) {
                var args = [],
                    arg,
                    i,
                    key;
                for (i = 0; i < arguments.length; i++) {
                    arg = '';
                    if (typeof arguments[i] === 'object') {
                        arg += '\n[' + i + '] ';
                        for (key in arguments[0]) {
                            if (hasOwnProp(arguments[0], key)) {
                                arg += key + ': ' + arguments[0][key] + ', ';
                            }
                        }
                        arg = arg.slice(0, -2); // Remove trailing comma and space
                    } else {
                        arg = arguments[i];
                    }
                    args.push(arg);
                }
                warn(
                    msg +
                        '\nArguments: ' +
                        Array.prototype.slice.call(args).join('') +
                        '\n' +
                        new Error().stack
                );
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(name, msg);
        }
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    hooks.suppressDeprecationWarnings = false;
    hooks.deprecationHandler = null;

    function isFunction(input) {
        return (
            (typeof Function !== 'undefined' && input instanceof Function) ||
            Object.prototype.toString.call(input) === '[object Function]'
        );
    }

    function set(config) {
        var prop, i;
        for (i in config) {
            if (hasOwnProp(config, i)) {
                prop = config[i];
                if (isFunction(prop)) {
                    this[i] = prop;
                } else {
                    this['_' + i] = prop;
                }
            }
        }
        this._config = config;
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
        // TODO: Remove "ordinalParse" fallback in next major release.
        this._dayOfMonthOrdinalParseLenient = new RegExp(
            (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
                '|' +
                /\d{1,2}/.source
        );
    }

    function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig),
            prop;
        for (prop in childConfig) {
            if (hasOwnProp(childConfig, prop)) {
                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                    res[prop] = {};
                    extend(res[prop], parentConfig[prop]);
                    extend(res[prop], childConfig[prop]);
                } else if (childConfig[prop] != null) {
                    res[prop] = childConfig[prop];
                } else {
                    delete res[prop];
                }
            }
        }
        for (prop in parentConfig) {
            if (
                hasOwnProp(parentConfig, prop) &&
                !hasOwnProp(childConfig, prop) &&
                isObject(parentConfig[prop])
            ) {
                // make sure changes to properties don't modify parent config
                res[prop] = extend({}, res[prop]);
            }
        }
        return res;
    }

    function Locale(config) {
        if (config != null) {
            this.set(config);
        }
    }

    var keys;

    if (Object.keys) {
        keys = Object.keys;
    } else {
        keys = function (obj) {
            var i,
                res = [];
            for (i in obj) {
                if (hasOwnProp(obj, i)) {
                    res.push(i);
                }
            }
            return res;
        };
    }

    var defaultCalendar = {
        sameDay: '[Today at] LT',
        nextDay: '[Tomorrow at] LT',
        nextWeek: 'dddd [at] LT',
        lastDay: '[Yesterday at] LT',
        lastWeek: '[Last] dddd [at] LT',
        sameElse: 'L',
    };

    function calendar(key, mom, now) {
        var output = this._calendar[key] || this._calendar['sameElse'];
        return isFunction(output) ? output.call(mom, now) : output;
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
        return (
            (sign ? (forceSign ? '+' : '') : '-') +
            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) +
            absNumber
        );
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
        localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
        formatFunctions = {},
        formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken(token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(
                    func.apply(this, arguments),
                    token
                );
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens),
            i,
            length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '',
                i;
            for (i = 0; i < length; i++) {
                output += isFunction(array[i])
                    ? array[i].call(mom, format)
                    : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] =
            formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(
                localFormattingTokens,
                replaceLongDateFormatTokens
            );
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var defaultLongDateFormat = {
        LTS: 'h:mm:ss A',
        LT: 'h:mm A',
        L: 'MM/DD/YYYY',
        LL: 'MMMM D, YYYY',
        LLL: 'MMMM D, YYYY h:mm A',
        LLLL: 'dddd, MMMM D, YYYY h:mm A',
    };

    function longDateFormat(key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
            return format;
        }

        this._longDateFormat[key] = formatUpper
            .match(formattingTokens)
            .map(function (tok) {
                if (
                    tok === 'MMMM' ||
                    tok === 'MM' ||
                    tok === 'DD' ||
                    tok === 'dddd'
                ) {
                    return tok.slice(1);
                }
                return tok;
            })
            .join('');

        return this._longDateFormat[key];
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate() {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d',
        defaultDayOfMonthOrdinalParse = /\d{1,2}/;

    function ordinal(number) {
        return this._ordinal.replace('%d', number);
    }

    var defaultRelativeTime = {
        future: 'in %s',
        past: '%s ago',
        s: 'a few seconds',
        ss: '%d seconds',
        m: 'a minute',
        mm: '%d minutes',
        h: 'an hour',
        hh: '%d hours',
        d: 'a day',
        dd: '%d days',
        w: 'a week',
        ww: '%d weeks',
        M: 'a month',
        MM: '%d months',
        y: 'a year',
        yy: '%d years',
    };

    function relativeTime(number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return isFunction(output)
            ? output(number, withoutSuffix, string, isFuture)
            : output.replace(/%d/i, number);
    }

    function pastFuture(diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }

    var aliases = {};

    function addUnitAlias(unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string'
            ? aliases[units] || aliases[units.toLowerCase()]
            : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    var priorities = {};

    function addUnitPriority(unit, priority) {
        priorities[unit] = priority;
    }

    function getPrioritizedUnits(unitsObj) {
        var units = [],
            u;
        for (u in unitsObj) {
            if (hasOwnProp(unitsObj, u)) {
                units.push({ unit: u, priority: priorities[u] });
            }
        }
        units.sort(function (a, b) {
            return a.priority - b.priority;
        });
        return units;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    function absFloor(number) {
        if (number < 0) {
            // -0 -> 0
            return Math.ceil(number) || 0;
        } else {
            return Math.floor(number);
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
        }

        return value;
    }

    function makeGetSet(unit, keepTime) {
        return function (value) {
            if (value != null) {
                set$1(this, unit, value);
                hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get(this, unit);
            }
        };
    }

    function get(mom, unit) {
        return mom.isValid()
            ? mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]()
            : NaN;
    }

    function set$1(mom, unit, value) {
        if (mom.isValid() && !isNaN(value)) {
            if (
                unit === 'FullYear' &&
                isLeapYear(mom.year()) &&
                mom.month() === 1 &&
                mom.date() === 29
            ) {
                value = toInt(value);
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](
                    value,
                    mom.month(),
                    daysInMonth(value, mom.month())
                );
            } else {
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
            }
        }
    }

    // MOMENTS

    function stringGet(units) {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units]();
        }
        return this;
    }

    function stringSet(units, value) {
        if (typeof units === 'object') {
            units = normalizeObjectUnits(units);
            var prioritized = getPrioritizedUnits(units),
                i;
            for (i = 0; i < prioritized.length; i++) {
                this[prioritized[i].unit](units[prioritized[i].unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
                return this[units](value);
            }
        }
        return this;
    }

    var match1 = /\d/, //       0 - 9
        match2 = /\d\d/, //      00 - 99
        match3 = /\d{3}/, //     000 - 999
        match4 = /\d{4}/, //    0000 - 9999
        match6 = /[+-]?\d{6}/, // -999999 - 999999
        match1to2 = /\d\d?/, //       0 - 99
        match3to4 = /\d\d\d\d?/, //     999 - 9999
        match5to6 = /\d\d\d\d\d\d?/, //   99999 - 999999
        match1to3 = /\d{1,3}/, //       0 - 999
        match1to4 = /\d{1,4}/, //       0 - 9999
        match1to6 = /[+-]?\d{1,6}/, // -999999 - 999999
        matchUnsigned = /\d+/, //       0 - inf
        matchSigned = /[+-]?\d+/, //    -inf - inf
        matchOffset = /Z|[+-]\d\d:?\d\d/gi, // +00:00 -00:00 +0000 -0000 or Z
        matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, // +00 -00 +00:00 -00:00 +0000 -0000 or Z
        matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, // 123456789 123456789.123
        // any word (or two) characters or numbers including two/three word month in arabic.
        // includes scottish gaelic two word and hyphenated months
        matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
        regexes;

    regexes = {};

    function addRegexToken(token, regex, strictRegex) {
        regexes[token] = isFunction(regex)
            ? regex
            : function (isStrict, localeData) {
                  return isStrict && strictRegex ? strictRegex : regex;
              };
    }

    function getParseRegexForToken(token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return regexEscape(
            s
                .replace('\\', '')
                .replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (
                    matched,
                    p1,
                    p2,
                    p3,
                    p4
                ) {
                    return p1 || p2 || p3 || p4;
                })
        );
    }

    function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken(token, callback) {
        var i,
            func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (isNumber(callback)) {
            func = function (input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken(token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0,
        MONTH = 1,
        DATE = 2,
        HOUR = 3,
        MINUTE = 4,
        SECOND = 5,
        MILLISECOND = 6,
        WEEK = 7,
        WEEKDAY = 8;

    function mod(n, x) {
        return ((n % x) + x) % x;
    }

    var indexOf;

    if (Array.prototype.indexOf) {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function (o) {
            // I know
            var i;
            for (i = 0; i < this.length; ++i) {
                if (this[i] === o) {
                    return i;
                }
            }
            return -1;
        };
    }

    function daysInMonth(year, month) {
        if (isNaN(year) || isNaN(month)) {
            return NaN;
        }
        var modMonth = mod(month, 12);
        year += (month - modMonth) / 12;
        return modMonth === 1
            ? isLeapYear(year)
                ? 29
                : 28
            : 31 - ((modMonth % 7) % 2);
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PRIORITY

    addUnitPriority('month', 8);

    // PARSING

    addRegexToken('M', match1to2);
    addRegexToken('MM', match1to2, match2);
    addRegexToken('MMM', function (isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function (isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split(
            '_'
        ),
        defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split(
            '_'
        ),
        MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
        defaultMonthsShortRegex = matchWord,
        defaultMonthsRegex = matchWord;

    function localeMonths(m, format) {
        if (!m) {
            return isArray(this._months)
                ? this._months
                : this._months['standalone'];
        }
        return isArray(this._months)
            ? this._months[m.month()]
            : this._months[
                  (this._months.isFormat || MONTHS_IN_FORMAT).test(format)
                      ? 'format'
                      : 'standalone'
              ][m.month()];
    }

    function localeMonthsShort(m, format) {
        if (!m) {
            return isArray(this._monthsShort)
                ? this._monthsShort
                : this._monthsShort['standalone'];
        }
        return isArray(this._monthsShort)
            ? this._monthsShort[m.month()]
            : this._monthsShort[
                  MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'
              ][m.month()];
    }

    function handleStrictParse(monthName, format, strict) {
        var i,
            ii,
            mom,
            llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
            // this is not used
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for (i = 0; i < 12; ++i) {
                mom = createUTC([2000, i]);
                this._shortMonthsParse[i] = this.monthsShort(
                    mom,
                    ''
                ).toLocaleLowerCase();
                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeMonthsParse(monthName, format, strict) {
        var i, mom, regex;

        if (this._monthsParseExact) {
            return handleStrictParse.call(this, monthName, format, strict);
        }

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        // TODO: add sorting
        // Sorting makes sure if one month (or abbr) is a prefix of another
        // see sorting in computeMonthsParse
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp(
                    '^' + this.months(mom, '').replace('.', '') + '$',
                    'i'
                );
                this._shortMonthsParse[i] = new RegExp(
                    '^' + this.monthsShort(mom, '').replace('.', '') + '$',
                    'i'
                );
            }
            if (!strict && !this._monthsParse[i]) {
                regex =
                    '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (
                strict &&
                format === 'MMMM' &&
                this._longMonthsParse[i].test(monthName)
            ) {
                return i;
            } else if (
                strict &&
                format === 'MMM' &&
                this._shortMonthsParse[i].test(monthName)
            ) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth(mom, value) {
        var dayOfMonth;

        if (!mom.isValid()) {
            // No op
            return mom;
        }

        if (typeof value === 'string') {
            if (/^\d+$/.test(value)) {
                value = toInt(value);
            } else {
                value = mom.localeData().monthsParse(value);
                // TODO: Another silent failure?
                if (!isNumber(value)) {
                    return mom;
                }
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth(value) {
        if (value != null) {
            setMonth(this, value);
            hooks.updateOffset(this, true);
            return this;
        } else {
            return get(this, 'Month');
        }
    }

    function getDaysInMonth() {
        return daysInMonth(this.year(), this.month());
    }

    function monthsShortRegex(isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsShortStrictRegex;
            } else {
                return this._monthsShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsShortRegex')) {
                this._monthsShortRegex = defaultMonthsShortRegex;
            }
            return this._monthsShortStrictRegex && isStrict
                ? this._monthsShortStrictRegex
                : this._monthsShortRegex;
        }
    }

    function monthsRegex(isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsStrictRegex;
            } else {
                return this._monthsRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsRegex')) {
                this._monthsRegex = defaultMonthsRegex;
            }
            return this._monthsStrictRegex && isStrict
                ? this._monthsStrictRegex
                : this._monthsRegex;
        }
    }

    function computeMonthsParse() {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var shortPieces = [],
            longPieces = [],
            mixedPieces = [],
            i,
            mom;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            shortPieces.push(this.monthsShort(mom, ''));
            longPieces.push(this.months(mom, ''));
            mixedPieces.push(this.months(mom, ''));
            mixedPieces.push(this.monthsShort(mom, ''));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
        }
        for (i = 0; i < 24; i++) {
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp(
            '^(' + longPieces.join('|') + ')',
            'i'
        );
        this._monthsShortStrictRegex = new RegExp(
            '^(' + shortPieces.join('|') + ')',
            'i'
        );
    }

    // FORMATTING

    addFormatToken('Y', 0, 0, function () {
        var y = this.year();
        return y <= 9999 ? zeroFill(y, 4) : '+' + y;
    });

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY', 4], 0, 'year');
    addFormatToken(0, ['YYYYY', 5], 0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PRIORITIES

    addUnitPriority('year', 1);

    // PARSING

    addRegexToken('Y', matchSigned);
    addRegexToken('YY', match1to2, match2);
    addRegexToken('YYYY', match1to4, match4);
    addRegexToken('YYYYY', match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array) {
        array[YEAR] =
            input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function (input, array) {
        array[YEAR] = hooks.parseTwoDigitYear(input);
    });
    addParseToken('Y', function (input, array) {
        array[YEAR] = parseInt(input, 10);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    // HOOKS

    hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', true);

    function getIsLeapYear() {
        return isLeapYear(this.year());
    }

    function createDate(y, m, d, h, M, s, ms) {
        // can't just apply() to create a date:
        // https://stackoverflow.com/q/181348
        var date;
        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            date = new Date(y + 400, m, d, h, M, s, ms);
            if (isFinite(date.getFullYear())) {
                date.setFullYear(y);
            }
        } else {
            date = new Date(y, m, d, h, M, s, ms);
        }

        return date;
    }

    function createUTCDate(y) {
        var date, args;
        // the Date.UTC function remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            args = Array.prototype.slice.call(arguments);
            // preserve leap years using a full 400 year cycle, then reset
            args[0] = y + 400;
            date = new Date(Date.UTC.apply(null, args));
            if (isFinite(date.getUTCFullYear())) {
                date.setUTCFullYear(y);
            }
        } else {
            date = new Date(Date.UTC.apply(null, arguments));
        }

        return date;
    }

    // start-of-first-week - start-of-year
    function firstWeekOffset(year, dow, doy) {
        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
            fwd = 7 + dow - doy,
            // first-week day local weekday -- which local weekday is fwd
            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

        return -fwdlw + fwd - 1;
    }

    // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7,
            weekOffset = firstWeekOffset(year, dow, doy),
            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
            resYear,
            resDayOfYear;

        if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
        } else {
            resYear = year;
            resDayOfYear = dayOfYear;
        }

        return {
            year: resYear,
            dayOfYear: resDayOfYear,
        };
    }

    function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
            resWeek,
            resYear;

        if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
        } else {
            resYear = mom.year();
            resWeek = week;
        }

        return {
            week: resWeek,
            year: resYear,
        };
    }

    function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy),
            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }

    // FORMATTING

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PRIORITIES

    addUnitPriority('week', 5);
    addUnitPriority('isoWeek', 5);

    // PARSING

    addRegexToken('w', match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W', match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (
        input,
        week,
        config,
        token
    ) {
        week[token.substr(0, 1)] = toInt(input);
    });

    // HELPERS

    // LOCALES

    function localeWeek(mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow: 0, // Sunday is the first day of the week.
        doy: 6, // The week that contains Jan 6th is the first week of the year.
    };

    function localeFirstDayOfWeek() {
        return this._week.dow;
    }

    function localeFirstDayOfYear() {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek(input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek(input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    // FORMATTING

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PRIORITY
    addUnitPriority('day', 11);
    addUnitPriority('weekday', 11);
    addUnitPriority('isoWeekday', 11);

    // PARSING

    addRegexToken('d', match1to2);
    addRegexToken('e', match1to2);
    addRegexToken('E', match1to2);
    addRegexToken('dd', function (isStrict, locale) {
        return locale.weekdaysMinRegex(isStrict);
    });
    addRegexToken('ddd', function (isStrict, locale) {
        return locale.weekdaysShortRegex(isStrict);
    });
    addRegexToken('dddd', function (isStrict, locale) {
        return locale.weekdaysRegex(isStrict);
    });

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
            return input;
        }

        if (!isNaN(input)) {
            return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
            return input;
        }

        return null;
    }

    function parseIsoWeekday(input, locale) {
        if (typeof input === 'string') {
            return locale.weekdaysParse(input) % 7 || 7;
        }
        return isNaN(input) ? null : input;
    }

    // LOCALES
    function shiftWeekdays(ws, n) {
        return ws.slice(n, 7).concat(ws.slice(0, n));
    }

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split(
            '_'
        ),
        defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        defaultWeekdaysRegex = matchWord,
        defaultWeekdaysShortRegex = matchWord,
        defaultWeekdaysMinRegex = matchWord;

    function localeWeekdays(m, format) {
        var weekdays = isArray(this._weekdays)
            ? this._weekdays
            : this._weekdays[
                  m && m !== true && this._weekdays.isFormat.test(format)
                      ? 'format'
                      : 'standalone'
              ];
        return m === true
            ? shiftWeekdays(weekdays, this._week.dow)
            : m
            ? weekdays[m.day()]
            : weekdays;
    }

    function localeWeekdaysShort(m) {
        return m === true
            ? shiftWeekdays(this._weekdaysShort, this._week.dow)
            : m
            ? this._weekdaysShort[m.day()]
            : this._weekdaysShort;
    }

    function localeWeekdaysMin(m) {
        return m === true
            ? shiftWeekdays(this._weekdaysMin, this._week.dow)
            : m
            ? this._weekdaysMin[m.day()]
            : this._weekdaysMin;
    }

    function handleStrictParse$1(weekdayName, format, strict) {
        var i,
            ii,
            mom,
            llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];

            for (i = 0; i < 7; ++i) {
                mom = createUTC([2000, 1]).day(i);
                this._minWeekdaysParse[i] = this.weekdaysMin(
                    mom,
                    ''
                ).toLocaleLowerCase();
                this._shortWeekdaysParse[i] = this.weekdaysShort(
                    mom,
                    ''
                ).toLocaleLowerCase();
                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeWeekdaysParse(weekdayName, format, strict) {
        var i, mom, regex;

        if (this._weekdaysParseExact) {
            return handleStrictParse$1.call(this, weekdayName, format, strict);
        }

        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already

            mom = createUTC([2000, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp(
                    '^' + this.weekdays(mom, '').replace('.', '\\.?') + '$',
                    'i'
                );
                this._shortWeekdaysParse[i] = new RegExp(
                    '^' + this.weekdaysShort(mom, '').replace('.', '\\.?') + '$',
                    'i'
                );
                this._minWeekdaysParse[i] = new RegExp(
                    '^' + this.weekdaysMin(mom, '').replace('.', '\\.?') + '$',
                    'i'
                );
            }
            if (!this._weekdaysParse[i]) {
                regex =
                    '^' +
                    this.weekdays(mom, '') +
                    '|^' +
                    this.weekdaysShort(mom, '') +
                    '|^' +
                    this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (
                strict &&
                format === 'dddd' &&
                this._fullWeekdaysParse[i].test(weekdayName)
            ) {
                return i;
            } else if (
                strict &&
                format === 'ddd' &&
                this._shortWeekdaysParse[i].test(weekdayName)
            ) {
                return i;
            } else if (
                strict &&
                format === 'dd' &&
                this._minWeekdaysParse[i].test(weekdayName)
            ) {
                return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek(input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek(input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek(input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }

        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.

        if (input != null) {
            var weekday = parseIsoWeekday(input, this.localeData());
            return this.day(this.day() % 7 ? weekday : weekday - 7);
        } else {
            return this.day() || 7;
        }
    }

    function weekdaysRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysStrictRegex;
            } else {
                return this._weekdaysRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                this._weekdaysRegex = defaultWeekdaysRegex;
            }
            return this._weekdaysStrictRegex && isStrict
                ? this._weekdaysStrictRegex
                : this._weekdaysRegex;
        }
    }

    function weekdaysShortRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysShortStrictRegex;
            } else {
                return this._weekdaysShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysShortRegex')) {
                this._weekdaysShortRegex = defaultWeekdaysShortRegex;
            }
            return this._weekdaysShortStrictRegex && isStrict
                ? this._weekdaysShortStrictRegex
                : this._weekdaysShortRegex;
        }
    }

    function weekdaysMinRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysMinStrictRegex;
            } else {
                return this._weekdaysMinRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysMinRegex')) {
                this._weekdaysMinRegex = defaultWeekdaysMinRegex;
            }
            return this._weekdaysMinStrictRegex && isStrict
                ? this._weekdaysMinStrictRegex
                : this._weekdaysMinRegex;
        }
    }

    function computeWeekdaysParse() {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var minPieces = [],
            shortPieces = [],
            longPieces = [],
            mixedPieces = [],
            i,
            mom,
            minp,
            shortp,
            longp;
        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, 1]).day(i);
            minp = regexEscape(this.weekdaysMin(mom, ''));
            shortp = regexEscape(this.weekdaysShort(mom, ''));
            longp = regexEscape(this.weekdays(mom, ''));
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
        }
        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
        // will match the longer piece.
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);

        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;

        this._weekdaysStrictRegex = new RegExp(
            '^(' + longPieces.join('|') + ')',
            'i'
        );
        this._weekdaysShortStrictRegex = new RegExp(
            '^(' + shortPieces.join('|') + ')',
            'i'
        );
        this._weekdaysMinStrictRegex = new RegExp(
            '^(' + minPieces.join('|') + ')',
            'i'
        );
    }

    // FORMATTING

    function hFormat() {
        return this.hours() % 12 || 12;
    }

    function kFormat() {
        return this.hours() || 24;
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, hFormat);
    addFormatToken('k', ['kk', 2], 0, kFormat);

    addFormatToken('hmm', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });

    addFormatToken('hmmss', 0, 0, function () {
        return (
            '' +
            hFormat.apply(this) +
            zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2)
        );
    });

    addFormatToken('Hmm', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2);
    });

    addFormatToken('Hmmss', 0, 0, function () {
        return (
            '' +
            this.hours() +
            zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2)
        );
    });

    function meridiem(token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(
                this.hours(),
                this.minutes(),
                lowercase
            );
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PRIORITY
    addUnitPriority('hour', 13);

    // PARSING

    function matchMeridiem(isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a', matchMeridiem);
    addRegexToken('A', matchMeridiem);
    addRegexToken('H', match1to2);
    addRegexToken('h', match1to2);
    addRegexToken('k', match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);
    addRegexToken('kk', match1to2, match2);

    addRegexToken('hmm', match3to4);
    addRegexToken('hmmss', match5to6);
    addRegexToken('Hmm', match3to4);
    addRegexToken('Hmmss', match5to6);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['k', 'kk'], function (input, array, config) {
        var kInput = toInt(input);
        array[HOUR] = kInput === 24 ? 0 : kInput;
    });
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmmss', function (input, array, config) {
        var pos1 = input.length - 4,
            pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('Hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken('Hmmss', function (input, array, config) {
        var pos1 = input.length - 4,
            pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
    });

    // LOCALES

    function localeIsPM(input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return (input + '').toLowerCase().charAt(0) === 'p';
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i,
        // Setting the hour should keep the time, because the user explicitly
        // specified which hour they want. So trying to maintain the same hour (in
        // a new timezone) makes sense. Adding/subtracting hours does not follow
        // this rule.
        getSetHour = makeGetSet('Hours', true);

    function localeMeridiem(hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }

    var baseConfig = {
        calendar: defaultCalendar,
        longDateFormat: defaultLongDateFormat,
        invalidDate: defaultInvalidDate,
        ordinal: defaultOrdinal,
        dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
        relativeTime: defaultRelativeTime,

        months: defaultLocaleMonths,
        monthsShort: defaultLocaleMonthsShort,

        week: defaultLocaleWeek,

        weekdays: defaultLocaleWeekdays,
        weekdaysMin: defaultLocaleWeekdaysMin,
        weekdaysShort: defaultLocaleWeekdaysShort,

        meridiemParse: defaultLocaleMeridiemParse,
    };

    // internal storage for locale config files
    var locales = {},
        localeFamilies = {},
        globalLocale;

    function commonPrefix(arr1, arr2) {
        var i,
            minl = Math.min(arr1.length, arr2.length);
        for (i = 0; i < minl; i += 1) {
            if (arr1[i] !== arr2[i]) {
                return i;
            }
        }
        return minl;
    }

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0,
            j,
            next,
            locale,
            split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (
                    next &&
                    next.length >= j &&
                    commonPrefix(split, next) >= j - 1
                ) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return globalLocale;
    }

    function loadLocale(name) {
        var oldLocale = null,
            aliasedRequire;
        // TODO: Find a better way to register and load all the locales in Node
        if (
            locales[name] === undefined &&
            'object' !== 'undefined' &&
            module &&
            module.exports
        ) {
            try {
                oldLocale = globalLocale._abbr;
                aliasedRequire = commonjsRequire;
                aliasedRequire('./locale/' + name);
                getSetGlobalLocale(oldLocale);
            } catch (e) {
                // mark as not found to avoid repeating expensive file require call causing high CPU
                // when trying to find en-US, en_US, en-us for every format call
                locales[name] = null; // null means not found
            }
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function getSetGlobalLocale(key, values) {
        var data;
        if (key) {
            if (isUndefined(values)) {
                data = getLocale(key);
            } else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            } else {
                if (typeof console !== 'undefined' && console.warn) {
                    //warn user if arguments are passed but the locale could not be set
                    console.warn(
                        'Locale ' + key + ' not found. Did you forget to load it?'
                    );
                }
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale(name, config) {
        if (config !== null) {
            var locale,
                parentConfig = baseConfig;
            config.abbr = name;
            if (locales[name] != null) {
                deprecateSimple(
                    'defineLocaleOverride',
                    'use moment.updateLocale(localeName, config) to change ' +
                        'an existing locale. moment.defineLocale(localeName, ' +
                        'config) should only be used for creating a new locale ' +
                        'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.'
                );
                parentConfig = locales[name]._config;
            } else if (config.parentLocale != null) {
                if (locales[config.parentLocale] != null) {
                    parentConfig = locales[config.parentLocale]._config;
                } else {
                    locale = loadLocale(config.parentLocale);
                    if (locale != null) {
                        parentConfig = locale._config;
                    } else {
                        if (!localeFamilies[config.parentLocale]) {
                            localeFamilies[config.parentLocale] = [];
                        }
                        localeFamilies[config.parentLocale].push({
                            name: name,
                            config: config,
                        });
                        return null;
                    }
                }
            }
            locales[name] = new Locale(mergeConfigs(parentConfig, config));

            if (localeFamilies[name]) {
                localeFamilies[name].forEach(function (x) {
                    defineLocale(x.name, x.config);
                });
            }

            // backwards compat for now: also set the locale
            // make sure we set the locale AFTER all child locales have been
            // created, so we won't end up with the child locale set.
            getSetGlobalLocale(name);

            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    function updateLocale(name, config) {
        if (config != null) {
            var locale,
                tmpLocale,
                parentConfig = baseConfig;

            if (locales[name] != null && locales[name].parentLocale != null) {
                // Update existing child locale in-place to avoid memory-leaks
                locales[name].set(mergeConfigs(locales[name]._config, config));
            } else {
                // MERGE
                tmpLocale = loadLocale(name);
                if (tmpLocale != null) {
                    parentConfig = tmpLocale._config;
                }
                config = mergeConfigs(parentConfig, config);
                if (tmpLocale == null) {
                    // updateLocale is called for creating a new locale
                    // Set abbr so it will have a name (getters return
                    // undefined otherwise).
                    config.abbr = name;
                }
                locale = new Locale(config);
                locale.parentLocale = locales[name];
                locales[name] = locale;
            }

            // backwards compat for now: also set the locale
            getSetGlobalLocale(name);
        } else {
            // pass null for config to unupdate, useful for tests
            if (locales[name] != null) {
                if (locales[name].parentLocale != null) {
                    locales[name] = locales[name].parentLocale;
                    if (name === getSetGlobalLocale()) {
                        getSetGlobalLocale(name);
                    }
                } else if (locales[name] != null) {
                    delete locales[name];
                }
            }
        }
        return locales[name];
    }

    // returns locale data
    function getLocale(key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    function listLocales() {
        return keys(locales);
    }

    function checkOverflow(m) {
        var overflow,
            a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow =
                a[MONTH] < 0 || a[MONTH] > 11
                    ? MONTH
                    : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH])
                    ? DATE
                    : a[HOUR] < 0 ||
                      a[HOUR] > 24 ||
                      (a[HOUR] === 24 &&
                          (a[MINUTE] !== 0 ||
                              a[SECOND] !== 0 ||
                              a[MILLISECOND] !== 0))
                    ? HOUR
                    : a[MINUTE] < 0 || a[MINUTE] > 59
                    ? MINUTE
                    : a[SECOND] < 0 || a[SECOND] > 59
                    ? SECOND
                    : a[MILLISECOND] < 0 || a[MILLISECOND] > 999
                    ? MILLISECOND
                    : -1;

            if (
                getParsingFlags(m)._overflowDayOfYear &&
                (overflow < YEAR || overflow > DATE)
            ) {
                overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                overflow = WEEKDAY;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    // iso 8601 regex
    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
        basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
        tzRegex = /Z|[+-]\d\d(?::?\d\d)?/,
        isoDates = [
            ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
            ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
            ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
            ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
            ['YYYY-DDD', /\d{4}-\d{3}/],
            ['YYYY-MM', /\d{4}-\d\d/, false],
            ['YYYYYYMMDD', /[+-]\d{10}/],
            ['YYYYMMDD', /\d{8}/],
            ['GGGG[W]WWE', /\d{4}W\d{3}/],
            ['GGGG[W]WW', /\d{4}W\d{2}/, false],
            ['YYYYDDD', /\d{7}/],
            ['YYYYMM', /\d{6}/, false],
            ['YYYY', /\d{4}/, false],
        ],
        // iso time formats and regexes
        isoTimes = [
            ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
            ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
            ['HH:mm:ss', /\d\d:\d\d:\d\d/],
            ['HH:mm', /\d\d:\d\d/],
            ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
            ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
            ['HHmmss', /\d\d\d\d\d\d/],
            ['HHmm', /\d\d\d\d/],
            ['HH', /\d\d/],
        ],
        aspNetJsonRegex = /^\/?Date\((-?\d+)/i,
        // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
        rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
        obsOffsets = {
            UT: 0,
            GMT: 0,
            EDT: -4 * 60,
            EST: -5 * 60,
            CDT: -5 * 60,
            CST: -6 * 60,
            MDT: -6 * 60,
            MST: -7 * 60,
            PDT: -7 * 60,
            PST: -8 * 60,
        };

    // date from iso format
    function configFromISO(config) {
        var i,
            l,
            string = config._i,
            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
            allowTime,
            dateFormat,
            timeFormat,
            tzFormat;

        if (match) {
            getParsingFlags(config).iso = true;

            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(match[1])) {
                    dateFormat = isoDates[i][0];
                    allowTime = isoDates[i][2] !== false;
                    break;
                }
            }
            if (dateFormat == null) {
                config._isValid = false;
                return;
            }
            if (match[3]) {
                for (i = 0, l = isoTimes.length; i < l; i++) {
                    if (isoTimes[i][1].exec(match[3])) {
                        // match[2] should be 'T' or space
                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
                        break;
                    }
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    return;
                }
            }
            if (!allowTime && timeFormat != null) {
                config._isValid = false;
                return;
            }
            if (match[4]) {
                if (tzRegex.exec(match[4])) {
                    tzFormat = 'Z';
                } else {
                    config._isValid = false;
                    return;
                }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    function extractFromRFC2822Strings(
        yearStr,
        monthStr,
        dayStr,
        hourStr,
        minuteStr,
        secondStr
    ) {
        var result = [
            untruncateYear(yearStr),
            defaultLocaleMonthsShort.indexOf(monthStr),
            parseInt(dayStr, 10),
            parseInt(hourStr, 10),
            parseInt(minuteStr, 10),
        ];

        if (secondStr) {
            result.push(parseInt(secondStr, 10));
        }

        return result;
    }

    function untruncateYear(yearStr) {
        var year = parseInt(yearStr, 10);
        if (year <= 49) {
            return 2000 + year;
        } else if (year <= 999) {
            return 1900 + year;
        }
        return year;
    }

    function preprocessRFC2822(s) {
        // Remove comments and folding whitespace and replace multiple-spaces with a single space
        return s
            .replace(/\([^)]*\)|[\n\t]/g, ' ')
            .replace(/(\s\s+)/g, ' ')
            .replace(/^\s\s*/, '')
            .replace(/\s\s*$/, '');
    }

    function checkWeekday(weekdayStr, parsedInput, config) {
        if (weekdayStr) {
            // TODO: Replace the vanilla JS Date object with an independent day-of-week check.
            var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
                weekdayActual = new Date(
                    parsedInput[0],
                    parsedInput[1],
                    parsedInput[2]
                ).getDay();
            if (weekdayProvided !== weekdayActual) {
                getParsingFlags(config).weekdayMismatch = true;
                config._isValid = false;
                return false;
            }
        }
        return true;
    }

    function calculateOffset(obsOffset, militaryOffset, numOffset) {
        if (obsOffset) {
            return obsOffsets[obsOffset];
        } else if (militaryOffset) {
            // the only allowed military tz is Z
            return 0;
        } else {
            var hm = parseInt(numOffset, 10),
                m = hm % 100,
                h = (hm - m) / 100;
            return h * 60 + m;
        }
    }

    // date and time from ref 2822 format
    function configFromRFC2822(config) {
        var match = rfc2822.exec(preprocessRFC2822(config._i)),
            parsedArray;
        if (match) {
            parsedArray = extractFromRFC2822Strings(
                match[4],
                match[3],
                match[2],
                match[5],
                match[6],
                match[7]
            );
            if (!checkWeekday(match[1], parsedArray, config)) {
                return;
            }

            config._a = parsedArray;
            config._tzm = calculateOffset(match[8], match[9], match[10]);

            config._d = createUTCDate.apply(null, config._a);
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

            getParsingFlags(config).rfc2822 = true;
        } else {
            config._isValid = false;
        }
    }

    // date from 1) ASP.NET, 2) ISO, 3) RFC 2822 formats, or 4) optional fallback if parsing isn't strict
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);
        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        configFromRFC2822(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        if (config._strict) {
            config._isValid = false;
        } else {
            // Final attempt, use Input Fallback
            hooks.createFromInputFallback(config);
        }
    }

    hooks.createFromInputFallback = deprecate(
        'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
            'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
            'discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        // hooks is actually the exported moment object
        var nowValue = new Date(hooks.now());
        if (config._useUTC) {
            return [
                nowValue.getUTCFullYear(),
                nowValue.getUTCMonth(),
                nowValue.getUTCDate(),
            ];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray(config) {
        var i,
            date,
            input = [],
            currentDate,
            expectedWeekday,
            yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear != null) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (
                config._dayOfYear > daysInYear(yearToUse) ||
                config._dayOfYear === 0
            ) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] =
                config._a[i] == null ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (
            config._a[HOUR] === 24 &&
            config._a[MINUTE] === 0 &&
            config._a[SECOND] === 0 &&
            config._a[MILLISECOND] === 0
        ) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(
            null,
            input
        );
        expectedWeekday = config._useUTC
            ? config._d.getUTCDay()
            : config._d.getDay();

        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }

        // check for mismatching day of week
        if (
            config._w &&
            typeof config._w.d !== 'undefined' &&
            config._w.d !== expectedWeekday
        ) {
            getParsingFlags(config).weekdayMismatch = true;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(
                w.GG,
                config._a[YEAR],
                weekOfYear(createLocal(), 1, 4).year
            );
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
                weekdayOverflow = true;
            }
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            curWeek = weekOfYear(createLocal(), dow, doy);

            weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

            // Default to current week.
            week = defaults(w.w, curWeek.week);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < 0 || weekday > 6) {
                    weekdayOverflow = true;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from beginning of week
                weekday = w.e + dow;
                if (w.e < 0 || w.e > 6) {
                    weekdayOverflow = true;
                }
            } else {
                // default to beginning of week
                weekday = dow;
            }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
        } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }

    // constant that refers to the ISO standard
    hooks.ISO_8601 = function () {};

    // constant that refers to the RFC 2822 form
    hooks.RFC_2822 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === hooks.ISO_8601) {
            configFromISO(config);
            return;
        }
        if (config._f === hooks.RFC_2822) {
            configFromRFC2822(config);
            return;
        }
        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i,
            parsedInput,
            tokens,
            token,
            skipped,
            stringLength = string.length,
            totalParsedInputLength = 0,
            era;

        tokens =
            expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) ||
                [])[0];
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(
                    string.indexOf(parsedInput) + parsedInput.length
                );
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                } else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            } else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver =
            stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (
            config._a[HOUR] <= 12 &&
            getParsingFlags(config).bigHour === true &&
            config._a[HOUR] > 0
        ) {
            getParsingFlags(config).bigHour = undefined;
        }

        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(
            config._locale,
            config._a[HOUR],
            config._meridiem
        );

        // handle era
        era = getParsingFlags(config).era;
        if (era !== null) {
            config._a[YEAR] = config._locale.erasConvertYear(era, config._a[YEAR]);
        }

        configFromArray(config);
        checkOverflow(config);
    }

    function meridiemFixWrap(locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    // date from string and array of format strings
    function configFromStringAndArray(config) {
        var tempConfig,
            bestMoment,
            scoreToBeat,
            i,
            currentScore,
            validFormatFound,
            bestFormatIsValid = false;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            validFormatFound = false;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (isValid(tempConfig)) {
                validFormatFound = true;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (!bestFormatIsValid) {
                if (
                    scoreToBeat == null ||
                    currentScore < scoreToBeat ||
                    validFormatFound
                ) {
                    scoreToBeat = currentScore;
                    bestMoment = tempConfig;
                    if (validFormatFound) {
                        bestFormatIsValid = true;
                    }
                }
            } else {
                if (currentScore < scoreToBeat) {
                    scoreToBeat = currentScore;
                    bestMoment = tempConfig;
                }
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i),
            dayOrDate = i.day === undefined ? i.date : i.day;
        config._a = map(
            [i.year, i.month, dayOrDate, i.hour, i.minute, i.second, i.millisecond],
            function (obj) {
                return obj && parseInt(obj, 10);
            }
        );

        configFromArray(config);
    }

    function createFromConfig(config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function prepareConfig(config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || getLocale(config._l);

        if (input === null || (format === undefined && input === '')) {
            return createInvalid({ nullInput: true });
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isDate(input)) {
            config._d = input;
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (format) {
            configFromStringAndFormat(config);
        } else {
            configFromInput(config);
        }

        if (!isValid(config)) {
            config._d = null;
        }

        return config;
    }

    function configFromInput(config) {
        var input = config._i;
        if (isUndefined(input)) {
            config._d = new Date(hooks.now());
        } else if (isDate(input)) {
            config._d = new Date(input.valueOf());
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (isObject(input)) {
            configFromObject(config);
        } else if (isNumber(input)) {
            // from milliseconds
            config._d = new Date(input);
        } else {
            hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC(input, format, locale, strict, isUTC) {
        var c = {};

        if (format === true || format === false) {
            strict = format;
            format = undefined;
        }

        if (locale === true || locale === false) {
            strict = locale;
            locale = undefined;
        }

        if (
            (isObject(input) && isObjectEmpty(input)) ||
            (isArray(input) && input.length === 0)
        ) {
            input = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function createLocal(input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate(
            'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
            function () {
                var other = createLocal.apply(null, arguments);
                if (this.isValid() && other.isValid()) {
                    return other < this ? this : other;
                } else {
                    return createInvalid();
                }
            }
        ),
        prototypeMax = deprecate(
            'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
            function () {
                var other = createLocal.apply(null, arguments);
                if (this.isValid() && other.isValid()) {
                    return other > this ? this : other;
                } else {
                    return createInvalid();
                }
            }
        );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min() {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max() {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    var now = function () {
        return Date.now ? Date.now() : +new Date();
    };

    var ordering = [
        'year',
        'quarter',
        'month',
        'week',
        'day',
        'hour',
        'minute',
        'second',
        'millisecond',
    ];

    function isDurationValid(m) {
        var key,
            unitHasDecimal = false,
            i;
        for (key in m) {
            if (
                hasOwnProp(m, key) &&
                !(
                    indexOf.call(ordering, key) !== -1 &&
                    (m[key] == null || !isNaN(m[key]))
                )
            ) {
                return false;
            }
        }

        for (i = 0; i < ordering.length; ++i) {
            if (m[ordering[i]]) {
                if (unitHasDecimal) {
                    return false; // only allow non-integers for smallest unit
                }
                if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                    unitHasDecimal = true;
                }
            }
        }

        return true;
    }

    function isValid$1() {
        return this._isValid;
    }

    function createInvalid$1() {
        return createDuration(NaN);
    }

    function Duration(duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || normalizedInput.isoWeek || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        this._isValid = isDurationValid(normalizedInput);

        // representation for dateAddRemove
        this._milliseconds =
            +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days + weeks * 7;
        // It is impossible to translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months + quarters * 3 + years * 12;

        this._data = {};

        this._locale = getLocale();

        this._bubble();
    }

    function isDuration(obj) {
        return obj instanceof Duration;
    }

    function absRound(number) {
        if (number < 0) {
            return Math.round(-1 * number) * -1;
        } else {
            return Math.round(number);
        }
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if (
                (dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))
            ) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    // FORMATTING

    function offset(token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset(),
                sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return (
                sign +
                zeroFill(~~(offset / 60), 2) +
                separator +
                zeroFill(~~offset % 60, 2)
            );
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z', matchShortOffset);
    addRegexToken('ZZ', matchShortOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(matcher, string) {
        var matches = (string || '').match(matcher),
            chunk,
            parts,
            minutes;

        if (matches === null) {
            return null;
        }

        chunk = matches[matches.length - 1] || [];
        parts = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        minutes = +(parts[1] * 60) + toInt(parts[2]);

        return minutes === 0 ? 0 : parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff =
                (isMoment(input) || isDate(input)
                    ? input.valueOf()
                    : createLocal(input).valueOf()) - res.valueOf();
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(res._d.valueOf() + diff);
            hooks.updateOffset(res, false);
            return res;
        } else {
            return createLocal(input).local();
        }
    }

    function getDateOffset(m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset());
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset(input, keepLocalTime, keepMinutes) {
        var offset = this._offset || 0,
            localAdjust;
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(matchShortOffset, input);
                if (input === null) {
                    return this;
                }
            } else if (Math.abs(input) < 16 && !keepMinutes) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    addSubtract(
                        this,
                        createDuration(input - offset, 'm'),
                        1,
                        false
                    );
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone(input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC(keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal(keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset() {
        if (this._tzm != null) {
            this.utcOffset(this._tzm, false, true);
        } else if (typeof this._i === 'string') {
            var tZone = offsetFromString(matchOffset, this._i);
            if (tZone != null) {
                this.utcOffset(tZone);
            } else {
                this.utcOffset(0, true);
            }
        }
        return this;
    }

    function hasAlignedHourOffset(input) {
        if (!this.isValid()) {
            return false;
        }
        input = input ? createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime() {
        return (
            this.utcOffset() > this.clone().month(0).utcOffset() ||
            this.utcOffset() > this.clone().month(5).utcOffset()
        );
    }

    function isDaylightSavingTimeShifted() {
        if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
        }

        var c = {},
            other;

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
            other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
            this._isDSTShifted =
                this.isValid() && compareArrays(c._a, other.toArray()) > 0;
        } else {
            this._isDSTShifted = false;
        }

        return this._isDSTShifted;
    }

    function isLocal() {
        return this.isValid() ? !this._isUTC : false;
    }

    function isUtcOffset() {
        return this.isValid() ? this._isUTC : false;
    }

    function isUtc() {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }

    // ASP.NET json date format regex
    var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,
        // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
        // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
        // and further modified to allow for strings containing both week and day
        isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

    function createDuration(input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms: input._milliseconds,
                d: input._days,
                M: input._months,
            };
        } else if (isNumber(input) || !isNaN(+input)) {
            duration = {};
            if (key) {
                duration[key] = +input;
            } else {
                duration.milliseconds = +input;
            }
        } else if ((match = aspNetRegex.exec(input))) {
            sign = match[1] === '-' ? -1 : 1;
            duration = {
                y: 0,
                d: toInt(match[DATE]) * sign,
                h: toInt(match[HOUR]) * sign,
                m: toInt(match[MINUTE]) * sign,
                s: toInt(match[SECOND]) * sign,
                ms: toInt(absRound(match[MILLISECOND] * 1000)) * sign, // the millisecond decimal point is included in the match
            };
        } else if ((match = isoRegex.exec(input))) {
            sign = match[1] === '-' ? -1 : 1;
            duration = {
                y: parseIso(match[2], sign),
                M: parseIso(match[3], sign),
                w: parseIso(match[4], sign),
                d: parseIso(match[5], sign),
                h: parseIso(match[6], sign),
                m: parseIso(match[7], sign),
                s: parseIso(match[8], sign),
            };
        } else if (duration == null) {
            // checks for null or undefined
            duration = {};
        } else if (
            typeof duration === 'object' &&
            ('from' in duration || 'to' in duration)
        ) {
            diffRes = momentsDifference(
                createLocal(duration.from),
                createLocal(duration.to)
            );

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        if (isDuration(input) && hasOwnProp(input, '_isValid')) {
            ret._isValid = input._isValid;
        }

        return ret;
    }

    createDuration.fn = Duration.prototype;
    createDuration.invalid = createInvalid$1;

    function parseIso(inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = {};

        res.months =
            other.month() - base.month() + (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +base.clone().add(res.months, 'M');

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
            return { milliseconds: 0, months: 0 };
        }

        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(
                    name,
                    'moment().' +
                        name +
                        '(period, number) is deprecated. Please use moment().' +
                        name +
                        '(number, period). ' +
                        'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.'
                );
                tmp = val;
                val = period;
                period = tmp;
            }

            dur = createDuration(val, period);
            addSubtract(this, dur, direction);
            return this;
        };
    }

    function addSubtract(mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = absRound(duration._days),
            months = absRound(duration._months);

        if (!mom.isValid()) {
            // No op
            return;
        }

        updateOffset = updateOffset == null ? true : updateOffset;

        if (months) {
            setMonth(mom, get(mom, 'Month') + months * isAdding);
        }
        if (days) {
            set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
        }
        if (milliseconds) {
            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
        }
        if (updateOffset) {
            hooks.updateOffset(mom, days || months);
        }
    }

    var add = createAdder(1, 'add'),
        subtract = createAdder(-1, 'subtract');

    function isString(input) {
        return typeof input === 'string' || input instanceof String;
    }

    // type MomentInput = Moment | Date | string | number | (number | string)[] | MomentInputObject | void; // null | undefined
    function isMomentInput(input) {
        return (
            isMoment(input) ||
            isDate(input) ||
            isString(input) ||
            isNumber(input) ||
            isNumberOrStringArray(input) ||
            isMomentInputObject(input) ||
            input === null ||
            input === undefined
        );
    }

    function isMomentInputObject(input) {
        var objectTest = isObject(input) && !isObjectEmpty(input),
            propertyTest = false,
            properties = [
                'years',
                'year',
                'y',
                'months',
                'month',
                'M',
                'days',
                'day',
                'd',
                'dates',
                'date',
                'D',
                'hours',
                'hour',
                'h',
                'minutes',
                'minute',
                'm',
                'seconds',
                'second',
                's',
                'milliseconds',
                'millisecond',
                'ms',
            ],
            i,
            property;

        for (i = 0; i < properties.length; i += 1) {
            property = properties[i];
            propertyTest = propertyTest || hasOwnProp(input, property);
        }

        return objectTest && propertyTest;
    }

    function isNumberOrStringArray(input) {
        var arrayTest = isArray(input),
            dataTypeTest = false;
        if (arrayTest) {
            dataTypeTest =
                input.filter(function (item) {
                    return !isNumber(item) && isString(input);
                }).length === 0;
        }
        return arrayTest && dataTypeTest;
    }

    function isCalendarSpec(input) {
        var objectTest = isObject(input) && !isObjectEmpty(input),
            propertyTest = false,
            properties = [
                'sameDay',
                'nextDay',
                'lastDay',
                'nextWeek',
                'lastWeek',
                'sameElse',
            ],
            i,
            property;

        for (i = 0; i < properties.length; i += 1) {
            property = properties[i];
            propertyTest = propertyTest || hasOwnProp(input, property);
        }

        return objectTest && propertyTest;
    }

    function getCalendarFormat(myMoment, now) {
        var diff = myMoment.diff(now, 'days', true);
        return diff < -6
            ? 'sameElse'
            : diff < -1
            ? 'lastWeek'
            : diff < 0
            ? 'lastDay'
            : diff < 1
            ? 'sameDay'
            : diff < 2
            ? 'nextDay'
            : diff < 7
            ? 'nextWeek'
            : 'sameElse';
    }

    function calendar$1(time, formats) {
        // Support for single parameter, formats only overload to the calendar function
        if (arguments.length === 1) {
            if (!arguments[0]) {
                time = undefined;
                formats = undefined;
            } else if (isMomentInput(arguments[0])) {
                time = arguments[0];
                formats = undefined;
            } else if (isCalendarSpec(arguments[0])) {
                formats = arguments[0];
                time = undefined;
            }
        }
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            format = hooks.calendarFormat(this, sod) || 'sameElse',
            output =
                formats &&
                (isFunction(formats[format])
                    ? formats[format].call(this, now)
                    : formats[format]);

        return this.format(
            output || this.localeData().calendar(format, this, createLocal(now))
        );
    }

    function clone() {
        return new Moment(this);
    }

    function isAfter(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() > localInput.valueOf();
        } else {
            return localInput.valueOf() < this.clone().startOf(units).valueOf();
        }
    }

    function isBefore(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() < localInput.valueOf();
        } else {
            return this.clone().endOf(units).valueOf() < localInput.valueOf();
        }
    }

    function isBetween(from, to, units, inclusivity) {
        var localFrom = isMoment(from) ? from : createLocal(from),
            localTo = isMoment(to) ? to : createLocal(to);
        if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
            return false;
        }
        inclusivity = inclusivity || '()';
        return (
            (inclusivity[0] === '('
                ? this.isAfter(localFrom, units)
                : !this.isBefore(localFrom, units)) &&
            (inclusivity[1] === ')'
                ? this.isBefore(localTo, units)
                : !this.isAfter(localTo, units))
        );
    }

    function isSame(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input),
            inputMs;
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() === localInput.valueOf();
        } else {
            inputMs = localInput.valueOf();
            return (
                this.clone().startOf(units).valueOf() <= inputMs &&
                inputMs <= this.clone().endOf(units).valueOf()
            );
        }
    }

    function isSameOrAfter(input, units) {
        return this.isSame(input, units) || this.isAfter(input, units);
    }

    function isSameOrBefore(input, units) {
        return this.isSame(input, units) || this.isBefore(input, units);
    }

    function diff(input, units, asFloat) {
        var that, zoneDelta, output;

        if (!this.isValid()) {
            return NaN;
        }

        that = cloneWithOffset(input, this);

        if (!that.isValid()) {
            return NaN;
        }

        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

        units = normalizeUnits(units);

        switch (units) {
            case 'year':
                output = monthDiff(this, that) / 12;
                break;
            case 'month':
                output = monthDiff(this, that);
                break;
            case 'quarter':
                output = monthDiff(this, that) / 3;
                break;
            case 'second':
                output = (this - that) / 1e3;
                break; // 1000
            case 'minute':
                output = (this - that) / 6e4;
                break; // 1000 * 60
            case 'hour':
                output = (this - that) / 36e5;
                break; // 1000 * 60 * 60
            case 'day':
                output = (this - that - zoneDelta) / 864e5;
                break; // 1000 * 60 * 60 * 24, negate dst
            case 'week':
                output = (this - that - zoneDelta) / 6048e5;
                break; // 1000 * 60 * 60 * 24 * 7, negate dst
            default:
                output = this - that;
        }

        return asFloat ? output : absFloor(output);
    }

    function monthDiff(a, b) {
        if (a.date() < b.date()) {
            // end-of-month calculations work correct when the start month has more
            // days than the end month.
            return -monthDiff(b, a);
        }
        // difference in months
        var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2,
            adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        //check for negative zero, return zero if negative zero
        return -(wholeMonthDiff + adjust) || 0;
    }

    hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
    hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

    function toString() {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function toISOString(keepOffset) {
        if (!this.isValid()) {
            return null;
        }
        var utc = keepOffset !== true,
            m = utc ? this.clone().utc() : this;
        if (m.year() < 0 || m.year() > 9999) {
            return formatMoment(
                m,
                utc
                    ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]'
                    : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ'
            );
        }
        if (isFunction(Date.prototype.toISOString)) {
            // native implementation is ~50x faster, use it when we can
            if (utc) {
                return this.toDate().toISOString();
            } else {
                return new Date(this.valueOf() + this.utcOffset() * 60 * 1000)
                    .toISOString()
                    .replace('Z', formatMoment(m, 'Z'));
            }
        }
        return formatMoment(
            m,
            utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ'
        );
    }

    /**
     * Return a human readable representation of a moment that can
     * also be evaluated to get a new moment which is the same
     *
     * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
     */
    function inspect() {
        if (!this.isValid()) {
            return 'moment.invalid(/* ' + this._i + ' */)';
        }
        var func = 'moment',
            zone = '',
            prefix,
            year,
            datetime,
            suffix;
        if (!this.isLocal()) {
            func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
            zone = 'Z';
        }
        prefix = '[' + func + '("]';
        year = 0 <= this.year() && this.year() <= 9999 ? 'YYYY' : 'YYYYYY';
        datetime = '-MM-DD[T]HH:mm:ss.SSS';
        suffix = zone + '[")]';

        return this.format(prefix + year + datetime + suffix);
    }

    function format(inputString) {
        if (!inputString) {
            inputString = this.isUtc()
                ? hooks.defaultFormatUtc
                : hooks.defaultFormat;
        }
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
    }

    function from(time, withoutSuffix) {
        if (
            this.isValid() &&
            ((isMoment(time) && time.isValid()) || createLocal(time).isValid())
        ) {
            return createDuration({ to: this, from: time })
                .locale(this.locale())
                .humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function fromNow(withoutSuffix) {
        return this.from(createLocal(), withoutSuffix);
    }

    function to(time, withoutSuffix) {
        if (
            this.isValid() &&
            ((isMoment(time) && time.isValid()) || createLocal(time).isValid())
        ) {
            return createDuration({ from: this, to: time })
                .locale(this.locale())
                .humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function toNow(withoutSuffix) {
        return this.to(createLocal(), withoutSuffix);
    }

    // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function locale(key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate(
        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
        function (key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }
    );

    function localeData() {
        return this._locale;
    }

    var MS_PER_SECOND = 1000,
        MS_PER_MINUTE = 60 * MS_PER_SECOND,
        MS_PER_HOUR = 60 * MS_PER_MINUTE,
        MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;

    // actual modulo - handles negative numbers (for dates before 1970):
    function mod$1(dividend, divisor) {
        return ((dividend % divisor) + divisor) % divisor;
    }

    function localStartOfDate(y, m, d) {
        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            return new Date(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
            return new Date(y, m, d).valueOf();
        }
    }

    function utcStartOfDate(y, m, d) {
        // Date.UTC remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
            return Date.UTC(y, m, d);
        }
    }

    function startOf(units) {
        var time, startOfDate;
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond' || !this.isValid()) {
            return this;
        }

        startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

        switch (units) {
            case 'year':
                time = startOfDate(this.year(), 0, 1);
                break;
            case 'quarter':
                time = startOfDate(
                    this.year(),
                    this.month() - (this.month() % 3),
                    1
                );
                break;
            case 'month':
                time = startOfDate(this.year(), this.month(), 1);
                break;
            case 'week':
                time = startOfDate(
                    this.year(),
                    this.month(),
                    this.date() - this.weekday()
                );
                break;
            case 'isoWeek':
                time = startOfDate(
                    this.year(),
                    this.month(),
                    this.date() - (this.isoWeekday() - 1)
                );
                break;
            case 'day':
            case 'date':
                time = startOfDate(this.year(), this.month(), this.date());
                break;
            case 'hour':
                time = this._d.valueOf();
                time -= mod$1(
                    time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
                    MS_PER_HOUR
                );
                break;
            case 'minute':
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_MINUTE);
                break;
            case 'second':
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_SECOND);
                break;
        }

        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
    }

    function endOf(units) {
        var time, startOfDate;
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond' || !this.isValid()) {
            return this;
        }

        startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

        switch (units) {
            case 'year':
                time = startOfDate(this.year() + 1, 0, 1) - 1;
                break;
            case 'quarter':
                time =
                    startOfDate(
                        this.year(),
                        this.month() - (this.month() % 3) + 3,
                        1
                    ) - 1;
                break;
            case 'month':
                time = startOfDate(this.year(), this.month() + 1, 1) - 1;
                break;
            case 'week':
                time =
                    startOfDate(
                        this.year(),
                        this.month(),
                        this.date() - this.weekday() + 7
                    ) - 1;
                break;
            case 'isoWeek':
                time =
                    startOfDate(
                        this.year(),
                        this.month(),
                        this.date() - (this.isoWeekday() - 1) + 7
                    ) - 1;
                break;
            case 'day':
            case 'date':
                time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
                break;
            case 'hour':
                time = this._d.valueOf();
                time +=
                    MS_PER_HOUR -
                    mod$1(
                        time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
                        MS_PER_HOUR
                    ) -
                    1;
                break;
            case 'minute':
                time = this._d.valueOf();
                time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
                break;
            case 'second':
                time = this._d.valueOf();
                time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
                break;
        }

        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
    }

    function valueOf() {
        return this._d.valueOf() - (this._offset || 0) * 60000;
    }

    function unix() {
        return Math.floor(this.valueOf() / 1000);
    }

    function toDate() {
        return new Date(this.valueOf());
    }

    function toArray() {
        var m = this;
        return [
            m.year(),
            m.month(),
            m.date(),
            m.hour(),
            m.minute(),
            m.second(),
            m.millisecond(),
        ];
    }

    function toObject() {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds(),
        };
    }

    function toJSON() {
        // new Date(NaN).toJSON() === null
        return this.isValid() ? this.toISOString() : null;
    }

    function isValid$2() {
        return isValid(this);
    }

    function parsingFlags() {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt() {
        return getParsingFlags(this).overflow;
    }

    function creationData() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict,
        };
    }

    addFormatToken('N', 0, 0, 'eraAbbr');
    addFormatToken('NN', 0, 0, 'eraAbbr');
    addFormatToken('NNN', 0, 0, 'eraAbbr');
    addFormatToken('NNNN', 0, 0, 'eraName');
    addFormatToken('NNNNN', 0, 0, 'eraNarrow');

    addFormatToken('y', ['y', 1], 'yo', 'eraYear');
    addFormatToken('y', ['yy', 2], 0, 'eraYear');
    addFormatToken('y', ['yyy', 3], 0, 'eraYear');
    addFormatToken('y', ['yyyy', 4], 0, 'eraYear');

    addRegexToken('N', matchEraAbbr);
    addRegexToken('NN', matchEraAbbr);
    addRegexToken('NNN', matchEraAbbr);
    addRegexToken('NNNN', matchEraName);
    addRegexToken('NNNNN', matchEraNarrow);

    addParseToken(['N', 'NN', 'NNN', 'NNNN', 'NNNNN'], function (
        input,
        array,
        config,
        token
    ) {
        var era = config._locale.erasParse(input, token, config._strict);
        if (era) {
            getParsingFlags(config).era = era;
        } else {
            getParsingFlags(config).invalidEra = input;
        }
    });

    addRegexToken('y', matchUnsigned);
    addRegexToken('yy', matchUnsigned);
    addRegexToken('yyy', matchUnsigned);
    addRegexToken('yyyy', matchUnsigned);
    addRegexToken('yo', matchEraYearOrdinal);

    addParseToken(['y', 'yy', 'yyy', 'yyyy'], YEAR);
    addParseToken(['yo'], function (input, array, config, token) {
        var match;
        if (config._locale._eraYearOrdinalRegex) {
            match = input.match(config._locale._eraYearOrdinalRegex);
        }

        if (config._locale.eraYearOrdinalParse) {
            array[YEAR] = config._locale.eraYearOrdinalParse(input, match);
        } else {
            array[YEAR] = parseInt(input, 10);
        }
    });

    function localeEras(m, format) {
        var i,
            l,
            date,
            eras = this._eras || getLocale('en')._eras;
        for (i = 0, l = eras.length; i < l; ++i) {
            switch (typeof eras[i].since) {
                case 'string':
                    // truncate time
                    date = hooks(eras[i].since).startOf('day');
                    eras[i].since = date.valueOf();
                    break;
            }

            switch (typeof eras[i].until) {
                case 'undefined':
                    eras[i].until = +Infinity;
                    break;
                case 'string':
                    // truncate time
                    date = hooks(eras[i].until).startOf('day').valueOf();
                    eras[i].until = date.valueOf();
                    break;
            }
        }
        return eras;
    }

    function localeErasParse(eraName, format, strict) {
        var i,
            l,
            eras = this.eras(),
            name,
            abbr,
            narrow;
        eraName = eraName.toUpperCase();

        for (i = 0, l = eras.length; i < l; ++i) {
            name = eras[i].name.toUpperCase();
            abbr = eras[i].abbr.toUpperCase();
            narrow = eras[i].narrow.toUpperCase();

            if (strict) {
                switch (format) {
                    case 'N':
                    case 'NN':
                    case 'NNN':
                        if (abbr === eraName) {
                            return eras[i];
                        }
                        break;

                    case 'NNNN':
                        if (name === eraName) {
                            return eras[i];
                        }
                        break;

                    case 'NNNNN':
                        if (narrow === eraName) {
                            return eras[i];
                        }
                        break;
                }
            } else if ([name, abbr, narrow].indexOf(eraName) >= 0) {
                return eras[i];
            }
        }
    }

    function localeErasConvertYear(era, year) {
        var dir = era.since <= era.until ? +1 : -1;
        if (year === undefined) {
            return hooks(era.since).year();
        } else {
            return hooks(era.since).year() + (year - era.offset) * dir;
        }
    }

    function getEraName() {
        var i,
            l,
            val,
            eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
            // truncate time
            val = this.clone().startOf('day').valueOf();

            if (eras[i].since <= val && val <= eras[i].until) {
                return eras[i].name;
            }
            if (eras[i].until <= val && val <= eras[i].since) {
                return eras[i].name;
            }
        }

        return '';
    }

    function getEraNarrow() {
        var i,
            l,
            val,
            eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
            // truncate time
            val = this.clone().startOf('day').valueOf();

            if (eras[i].since <= val && val <= eras[i].until) {
                return eras[i].narrow;
            }
            if (eras[i].until <= val && val <= eras[i].since) {
                return eras[i].narrow;
            }
        }

        return '';
    }

    function getEraAbbr() {
        var i,
            l,
            val,
            eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
            // truncate time
            val = this.clone().startOf('day').valueOf();

            if (eras[i].since <= val && val <= eras[i].until) {
                return eras[i].abbr;
            }
            if (eras[i].until <= val && val <= eras[i].since) {
                return eras[i].abbr;
            }
        }

        return '';
    }

    function getEraYear() {
        var i,
            l,
            dir,
            val,
            eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
            dir = eras[i].since <= eras[i].until ? +1 : -1;

            // truncate time
            val = this.clone().startOf('day').valueOf();

            if (
                (eras[i].since <= val && val <= eras[i].until) ||
                (eras[i].until <= val && val <= eras[i].since)
            ) {
                return (
                    (this.year() - hooks(eras[i].since).year()) * dir +
                    eras[i].offset
                );
            }
        }

        return this.year();
    }

    function erasNameRegex(isStrict) {
        if (!hasOwnProp(this, '_erasNameRegex')) {
            computeErasParse.call(this);
        }
        return isStrict ? this._erasNameRegex : this._erasRegex;
    }

    function erasAbbrRegex(isStrict) {
        if (!hasOwnProp(this, '_erasAbbrRegex')) {
            computeErasParse.call(this);
        }
        return isStrict ? this._erasAbbrRegex : this._erasRegex;
    }

    function erasNarrowRegex(isStrict) {
        if (!hasOwnProp(this, '_erasNarrowRegex')) {
            computeErasParse.call(this);
        }
        return isStrict ? this._erasNarrowRegex : this._erasRegex;
    }

    function matchEraAbbr(isStrict, locale) {
        return locale.erasAbbrRegex(isStrict);
    }

    function matchEraName(isStrict, locale) {
        return locale.erasNameRegex(isStrict);
    }

    function matchEraNarrow(isStrict, locale) {
        return locale.erasNarrowRegex(isStrict);
    }

    function matchEraYearOrdinal(isStrict, locale) {
        return locale._eraYearOrdinalRegex || matchUnsigned;
    }

    function computeErasParse() {
        var abbrPieces = [],
            namePieces = [],
            narrowPieces = [],
            mixedPieces = [],
            i,
            l,
            eras = this.eras();

        for (i = 0, l = eras.length; i < l; ++i) {
            namePieces.push(regexEscape(eras[i].name));
            abbrPieces.push(regexEscape(eras[i].abbr));
            narrowPieces.push(regexEscape(eras[i].narrow));

            mixedPieces.push(regexEscape(eras[i].name));
            mixedPieces.push(regexEscape(eras[i].abbr));
            mixedPieces.push(regexEscape(eras[i].narrow));
        }

        this._erasRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._erasNameRegex = new RegExp('^(' + namePieces.join('|') + ')', 'i');
        this._erasAbbrRegex = new RegExp('^(' + abbrPieces.join('|') + ')', 'i');
        this._erasNarrowRegex = new RegExp(
            '^(' + narrowPieces.join('|') + ')',
            'i'
        );
    }

    // FORMATTING

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken(token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg', 'weekYear');
    addWeekYearFormatToken('ggggg', 'weekYear');
    addWeekYearFormatToken('GGGG', 'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PRIORITY

    addUnitPriority('weekYear', 1);
    addUnitPriority('isoWeekYear', 1);

    // PARSING

    addRegexToken('G', matchSigned);
    addRegexToken('g', matchSigned);
    addRegexToken('GG', match1to2, match2);
    addRegexToken('gg', match1to2, match2);
    addRegexToken('GGGG', match1to4, match4);
    addRegexToken('gggg', match1to4, match4);
    addRegexToken('GGGGG', match1to6, match6);
    addRegexToken('ggggg', match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (
        input,
        week,
        config,
        token
    ) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = hooks.parseTwoDigitYear(input);
    });

    // MOMENTS

    function getSetWeekYear(input) {
        return getSetWeekYearHelper.call(
            this,
            input,
            this.week(),
            this.weekday(),
            this.localeData()._week.dow,
            this.localeData()._week.doy
        );
    }

    function getSetISOWeekYear(input) {
        return getSetWeekYearHelper.call(
            this,
            input,
            this.isoWeek(),
            this.isoWeekday(),
            1,
            4
        );
    }

    function getISOWeeksInYear() {
        return weeksInYear(this.year(), 1, 4);
    }

    function getISOWeeksInISOWeekYear() {
        return weeksInYear(this.isoWeekYear(), 1, 4);
    }

    function getWeeksInYear() {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    function getWeeksInWeekYear() {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
    }

    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
            return weekOfYear(this, dow, doy).year;
        } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
                week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
    }

    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
    }

    // FORMATTING

    addFormatToken('Q', 0, 'Qo', 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PRIORITY

    addUnitPriority('quarter', 7);

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter(input) {
        return input == null
            ? Math.ceil((this.month() + 1) / 3)
            : this.month((input - 1) * 3 + (this.month() % 3));
    }

    // FORMATTING

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PRIORITY
    addUnitPriority('date', 9);

    // PARSING

    addRegexToken('D', match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        // TODO: Remove "ordinalParse" fallback in next major release.
        return isStrict
            ? locale._dayOfMonthOrdinalParse || locale._ordinalParse
            : locale._dayOfMonthOrdinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0]);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    // FORMATTING

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PRIORITY
    addUnitPriority('dayOfYear', 4);

    // PARSING

    addRegexToken('DDD', match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    // MOMENTS

    function getSetDayOfYear(input) {
        var dayOfYear =
            Math.round(
                (this.clone().startOf('day') - this.clone().startOf('year')) / 864e5
            ) + 1;
        return input == null ? dayOfYear : this.add(input - dayOfYear, 'd');
    }

    // FORMATTING

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PRIORITY

    addUnitPriority('minute', 14);

    // PARSING

    addRegexToken('m', match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    // FORMATTING

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PRIORITY

    addUnitPriority('second', 15);

    // PARSING

    addRegexToken('s', match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    // FORMATTING

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });

    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PRIORITY

    addUnitPriority('millisecond', 16);

    // PARSING

    addRegexToken('S', match1to3, match1);
    addRegexToken('SS', match1to3, match2);
    addRegexToken('SSS', match1to3, match3);

    var token, getSetMillisecond;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }

    getSetMillisecond = makeGetSet('Milliseconds', false);

    // FORMATTING

    addFormatToken('z', 0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr() {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName() {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var proto = Moment.prototype;

    proto.add = add;
    proto.calendar = calendar$1;
    proto.clone = clone;
    proto.diff = diff;
    proto.endOf = endOf;
    proto.format = format;
    proto.from = from;
    proto.fromNow = fromNow;
    proto.to = to;
    proto.toNow = toNow;
    proto.get = stringGet;
    proto.invalidAt = invalidAt;
    proto.isAfter = isAfter;
    proto.isBefore = isBefore;
    proto.isBetween = isBetween;
    proto.isSame = isSame;
    proto.isSameOrAfter = isSameOrAfter;
    proto.isSameOrBefore = isSameOrBefore;
    proto.isValid = isValid$2;
    proto.lang = lang;
    proto.locale = locale;
    proto.localeData = localeData;
    proto.max = prototypeMax;
    proto.min = prototypeMin;
    proto.parsingFlags = parsingFlags;
    proto.set = stringSet;
    proto.startOf = startOf;
    proto.subtract = subtract;
    proto.toArray = toArray;
    proto.toObject = toObject;
    proto.toDate = toDate;
    proto.toISOString = toISOString;
    proto.inspect = inspect;
    if (typeof Symbol !== 'undefined' && Symbol.for != null) {
        proto[Symbol.for('nodejs.util.inspect.custom')] = function () {
            return 'Moment<' + this.format() + '>';
        };
    }
    proto.toJSON = toJSON;
    proto.toString = toString;
    proto.unix = unix;
    proto.valueOf = valueOf;
    proto.creationData = creationData;
    proto.eraName = getEraName;
    proto.eraNarrow = getEraNarrow;
    proto.eraAbbr = getEraAbbr;
    proto.eraYear = getEraYear;
    proto.year = getSetYear;
    proto.isLeapYear = getIsLeapYear;
    proto.weekYear = getSetWeekYear;
    proto.isoWeekYear = getSetISOWeekYear;
    proto.quarter = proto.quarters = getSetQuarter;
    proto.month = getSetMonth;
    proto.daysInMonth = getDaysInMonth;
    proto.week = proto.weeks = getSetWeek;
    proto.isoWeek = proto.isoWeeks = getSetISOWeek;
    proto.weeksInYear = getWeeksInYear;
    proto.weeksInWeekYear = getWeeksInWeekYear;
    proto.isoWeeksInYear = getISOWeeksInYear;
    proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
    proto.date = getSetDayOfMonth;
    proto.day = proto.days = getSetDayOfWeek;
    proto.weekday = getSetLocaleDayOfWeek;
    proto.isoWeekday = getSetISODayOfWeek;
    proto.dayOfYear = getSetDayOfYear;
    proto.hour = proto.hours = getSetHour;
    proto.minute = proto.minutes = getSetMinute;
    proto.second = proto.seconds = getSetSecond;
    proto.millisecond = proto.milliseconds = getSetMillisecond;
    proto.utcOffset = getSetOffset;
    proto.utc = setOffsetToUTC;
    proto.local = setOffsetToLocal;
    proto.parseZone = setOffsetToParsedOffset;
    proto.hasAlignedHourOffset = hasAlignedHourOffset;
    proto.isDST = isDaylightSavingTime;
    proto.isLocal = isLocal;
    proto.isUtcOffset = isUtcOffset;
    proto.isUtc = isUtc;
    proto.isUTC = isUtc;
    proto.zoneAbbr = getZoneAbbr;
    proto.zoneName = getZoneName;
    proto.dates = deprecate(
        'dates accessor is deprecated. Use date instead.',
        getSetDayOfMonth
    );
    proto.months = deprecate(
        'months accessor is deprecated. Use month instead',
        getSetMonth
    );
    proto.years = deprecate(
        'years accessor is deprecated. Use year instead',
        getSetYear
    );
    proto.zone = deprecate(
        'moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/',
        getSetZone
    );
    proto.isDSTShifted = deprecate(
        'isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information',
        isDaylightSavingTimeShifted
    );

    function createUnix(input) {
        return createLocal(input * 1000);
    }

    function createInZone() {
        return createLocal.apply(null, arguments).parseZone();
    }

    function preParsePostFormat(string) {
        return string;
    }

    var proto$1 = Locale.prototype;

    proto$1.calendar = calendar;
    proto$1.longDateFormat = longDateFormat;
    proto$1.invalidDate = invalidDate;
    proto$1.ordinal = ordinal;
    proto$1.preparse = preParsePostFormat;
    proto$1.postformat = preParsePostFormat;
    proto$1.relativeTime = relativeTime;
    proto$1.pastFuture = pastFuture;
    proto$1.set = set;
    proto$1.eras = localeEras;
    proto$1.erasParse = localeErasParse;
    proto$1.erasConvertYear = localeErasConvertYear;
    proto$1.erasAbbrRegex = erasAbbrRegex;
    proto$1.erasNameRegex = erasNameRegex;
    proto$1.erasNarrowRegex = erasNarrowRegex;

    proto$1.months = localeMonths;
    proto$1.monthsShort = localeMonthsShort;
    proto$1.monthsParse = localeMonthsParse;
    proto$1.monthsRegex = monthsRegex;
    proto$1.monthsShortRegex = monthsShortRegex;
    proto$1.week = localeWeek;
    proto$1.firstDayOfYear = localeFirstDayOfYear;
    proto$1.firstDayOfWeek = localeFirstDayOfWeek;

    proto$1.weekdays = localeWeekdays;
    proto$1.weekdaysMin = localeWeekdaysMin;
    proto$1.weekdaysShort = localeWeekdaysShort;
    proto$1.weekdaysParse = localeWeekdaysParse;

    proto$1.weekdaysRegex = weekdaysRegex;
    proto$1.weekdaysShortRegex = weekdaysShortRegex;
    proto$1.weekdaysMinRegex = weekdaysMinRegex;

    proto$1.isPM = localeIsPM;
    proto$1.meridiem = localeMeridiem;

    function get$1(format, index, field, setter) {
        var locale = getLocale(),
            utc = createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function listMonthsImpl(format, index, field) {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return get$1(format, index, field, 'month');
        }

        var i,
            out = [];
        for (i = 0; i < 12; i++) {
            out[i] = get$1(format, i, field, 'month');
        }
        return out;
    }

    // ()
    // (5)
    // (fmt, 5)
    // (fmt)
    // (true)
    // (true, 5)
    // (true, fmt, 5)
    // (true, fmt)
    function listWeekdaysImpl(localeSorted, format, index, field) {
        if (typeof localeSorted === 'boolean') {
            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        } else {
            format = localeSorted;
            index = format;
            localeSorted = false;

            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        }

        var locale = getLocale(),
            shift = localeSorted ? locale._week.dow : 0,
            i,
            out = [];

        if (index != null) {
            return get$1(format, (index + shift) % 7, field, 'day');
        }

        for (i = 0; i < 7; i++) {
            out[i] = get$1(format, (i + shift) % 7, field, 'day');
        }
        return out;
    }

    function listMonths(format, index) {
        return listMonthsImpl(format, index, 'months');
    }

    function listMonthsShort(format, index) {
        return listMonthsImpl(format, index, 'monthsShort');
    }

    function listWeekdays(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
    }

    function listWeekdaysShort(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
    }

    function listWeekdaysMin(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
    }

    getSetGlobalLocale('en', {
        eras: [
            {
                since: '0001-01-01',
                until: +Infinity,
                offset: 1,
                name: 'Anno Domini',
                narrow: 'AD',
                abbr: 'AD',
            },
            {
                since: '0000-12-31',
                until: -Infinity,
                offset: 1,
                name: 'Before Christ',
                narrow: 'BC',
                abbr: 'BC',
            },
        ],
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function (number) {
            var b = number % 10,
                output =
                    toInt((number % 100) / 10) === 1
                        ? 'th'
                        : b === 1
                        ? 'st'
                        : b === 2
                        ? 'nd'
                        : b === 3
                        ? 'rd'
                        : 'th';
            return number + output;
        },
    });

    // Side effect imports

    hooks.lang = deprecate(
        'moment.lang is deprecated. Use moment.locale instead.',
        getSetGlobalLocale
    );
    hooks.langData = deprecate(
        'moment.langData is deprecated. Use moment.localeData instead.',
        getLocale
    );

    var mathAbs = Math.abs;

    function abs() {
        var data = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days = mathAbs(this._days);
        this._months = mathAbs(this._months);

        data.milliseconds = mathAbs(data.milliseconds);
        data.seconds = mathAbs(data.seconds);
        data.minutes = mathAbs(data.minutes);
        data.hours = mathAbs(data.hours);
        data.months = mathAbs(data.months);
        data.years = mathAbs(data.years);

        return this;
    }

    function addSubtract$1(duration, input, value, direction) {
        var other = createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days += direction * other._days;
        duration._months += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function add$1(input, value) {
        return addSubtract$1(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function subtract$1(input, value) {
        return addSubtract$1(this, input, value, -1);
    }

    function absCeil(number) {
        if (number < 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble() {
        var milliseconds = this._milliseconds,
            days = this._days,
            months = this._months,
            data = this._data,
            seconds,
            minutes,
            hours,
            years,
            monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (
            !(
                (milliseconds >= 0 && days >= 0 && months >= 0) ||
                (milliseconds <= 0 && days <= 0 && months <= 0)
            )
        ) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds = absFloor(milliseconds / 1000);
        data.seconds = seconds % 60;

        minutes = absFloor(seconds / 60);
        data.minutes = minutes % 60;

        hours = absFloor(minutes / 60);
        data.hours = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days = days;
        data.months = months;
        data.years = years;

        return this;
    }

    function daysToMonths(days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return (days * 4800) / 146097;
    }

    function monthsToDays(months) {
        // the reverse of daysToMonths
        return (months * 146097) / 4800;
    }

    function as(units) {
        if (!this.isValid()) {
            return NaN;
        }
        var days,
            months,
            milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'quarter' || units === 'year') {
            days = this._days + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            switch (units) {
                case 'month':
                    return months;
                case 'quarter':
                    return months / 3;
                case 'year':
                    return months / 12;
            }
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week':
                    return days / 7 + milliseconds / 6048e5;
                case 'day':
                    return days + milliseconds / 864e5;
                case 'hour':
                    return days * 24 + milliseconds / 36e5;
                case 'minute':
                    return days * 1440 + milliseconds / 6e4;
                case 'second':
                    return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond':
                    return Math.floor(days * 864e5) + milliseconds;
                default:
                    throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function valueOf$1() {
        if (!this.isValid()) {
            return NaN;
        }
        return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
        );
    }

    function makeAs(alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms'),
        asSeconds = makeAs('s'),
        asMinutes = makeAs('m'),
        asHours = makeAs('h'),
        asDays = makeAs('d'),
        asWeeks = makeAs('w'),
        asMonths = makeAs('M'),
        asQuarters = makeAs('Q'),
        asYears = makeAs('y');

    function clone$1() {
        return createDuration(this);
    }

    function get$2(units) {
        units = normalizeUnits(units);
        return this.isValid() ? this[units + 's']() : NaN;
    }

    function makeGetter(name) {
        return function () {
            return this.isValid() ? this._data[name] : NaN;
        };
    }

    var milliseconds = makeGetter('milliseconds'),
        seconds = makeGetter('seconds'),
        minutes = makeGetter('minutes'),
        hours = makeGetter('hours'),
        days = makeGetter('days'),
        months = makeGetter('months'),
        years = makeGetter('years');

    function weeks() {
        return absFloor(this.days() / 7);
    }

    var round = Math.round,
        thresholds = {
            ss: 44, // a few seconds to seconds
            s: 45, // seconds to minute
            m: 45, // minutes to hour
            h: 22, // hours to day
            d: 26, // days to month/week
            w: null, // weeks to month
            M: 11, // months to year
        };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime$1(posNegDuration, withoutSuffix, thresholds, locale) {
        var duration = createDuration(posNegDuration).abs(),
            seconds = round(duration.as('s')),
            minutes = round(duration.as('m')),
            hours = round(duration.as('h')),
            days = round(duration.as('d')),
            months = round(duration.as('M')),
            weeks = round(duration.as('w')),
            years = round(duration.as('y')),
            a =
                (seconds <= thresholds.ss && ['s', seconds]) ||
                (seconds < thresholds.s && ['ss', seconds]) ||
                (minutes <= 1 && ['m']) ||
                (minutes < thresholds.m && ['mm', minutes]) ||
                (hours <= 1 && ['h']) ||
                (hours < thresholds.h && ['hh', hours]) ||
                (days <= 1 && ['d']) ||
                (days < thresholds.d && ['dd', days]);

        if (thresholds.w != null) {
            a =
                a ||
                (weeks <= 1 && ['w']) ||
                (weeks < thresholds.w && ['ww', weeks]);
        }
        a = a ||
            (months <= 1 && ['M']) ||
            (months < thresholds.M && ['MM', months]) ||
            (years <= 1 && ['y']) || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set the rounding function for relative time strings
    function getSetRelativeTimeRounding(roundingFunction) {
        if (roundingFunction === undefined) {
            return round;
        }
        if (typeof roundingFunction === 'function') {
            round = roundingFunction;
            return true;
        }
        return false;
    }

    // This function allows you to set a threshold for relative time strings
    function getSetRelativeTimeThreshold(threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        if (threshold === 's') {
            thresholds.ss = limit - 1;
        }
        return true;
    }

    function humanize(argWithSuffix, argThresholds) {
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var withSuffix = false,
            th = thresholds,
            locale,
            output;

        if (typeof argWithSuffix === 'object') {
            argThresholds = argWithSuffix;
            argWithSuffix = false;
        }
        if (typeof argWithSuffix === 'boolean') {
            withSuffix = argWithSuffix;
        }
        if (typeof argThresholds === 'object') {
            th = Object.assign({}, thresholds, argThresholds);
            if (argThresholds.s != null && argThresholds.ss == null) {
                th.ss = argThresholds.s - 1;
            }
        }

        locale = this.localeData();
        output = relativeTime$1(this, !withSuffix, th, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var abs$1 = Math.abs;

    function sign(x) {
        return (x > 0) - (x < 0) || +x;
    }

    function toISOString$1() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var seconds = abs$1(this._milliseconds) / 1000,
            days = abs$1(this._days),
            months = abs$1(this._months),
            minutes,
            hours,
            years,
            s,
            total = this.asSeconds(),
            totalSign,
            ymSign,
            daysSign,
            hmsSign;

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        // 3600 seconds -> 60 minutes -> 1 hour
        minutes = absFloor(seconds / 60);
        hours = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';

        totalSign = total < 0 ? '-' : '';
        ymSign = sign(this._months) !== sign(total) ? '-' : '';
        daysSign = sign(this._days) !== sign(total) ? '-' : '';
        hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';

        return (
            totalSign +
            'P' +
            (years ? ymSign + years + 'Y' : '') +
            (months ? ymSign + months + 'M' : '') +
            (days ? daysSign + days + 'D' : '') +
            (hours || minutes || seconds ? 'T' : '') +
            (hours ? hmsSign + hours + 'H' : '') +
            (minutes ? hmsSign + minutes + 'M' : '') +
            (seconds ? hmsSign + s + 'S' : '')
        );
    }

    var proto$2 = Duration.prototype;

    proto$2.isValid = isValid$1;
    proto$2.abs = abs;
    proto$2.add = add$1;
    proto$2.subtract = subtract$1;
    proto$2.as = as;
    proto$2.asMilliseconds = asMilliseconds;
    proto$2.asSeconds = asSeconds;
    proto$2.asMinutes = asMinutes;
    proto$2.asHours = asHours;
    proto$2.asDays = asDays;
    proto$2.asWeeks = asWeeks;
    proto$2.asMonths = asMonths;
    proto$2.asQuarters = asQuarters;
    proto$2.asYears = asYears;
    proto$2.valueOf = valueOf$1;
    proto$2._bubble = bubble;
    proto$2.clone = clone$1;
    proto$2.get = get$2;
    proto$2.milliseconds = milliseconds;
    proto$2.seconds = seconds;
    proto$2.minutes = minutes;
    proto$2.hours = hours;
    proto$2.days = days;
    proto$2.weeks = weeks;
    proto$2.months = months;
    proto$2.years = years;
    proto$2.humanize = humanize;
    proto$2.toISOString = toISOString$1;
    proto$2.toString = toISOString$1;
    proto$2.toJSON = toISOString$1;
    proto$2.locale = locale;
    proto$2.localeData = localeData;

    proto$2.toIsoString = deprecate(
        'toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)',
        toISOString$1
    );
    proto$2.lang = lang;

    // FORMATTING

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    //! moment.js

    hooks.version = '2.29.1';

    setHookCallback(createLocal);

    hooks.fn = proto;
    hooks.min = min;
    hooks.max = max;
    hooks.now = now;
    hooks.utc = createUTC;
    hooks.unix = createUnix;
    hooks.months = listMonths;
    hooks.isDate = isDate;
    hooks.locale = getSetGlobalLocale;
    hooks.invalid = createInvalid;
    hooks.duration = createDuration;
    hooks.isMoment = isMoment;
    hooks.weekdays = listWeekdays;
    hooks.parseZone = createInZone;
    hooks.localeData = getLocale;
    hooks.isDuration = isDuration;
    hooks.monthsShort = listMonthsShort;
    hooks.weekdaysMin = listWeekdaysMin;
    hooks.defineLocale = defineLocale;
    hooks.updateLocale = updateLocale;
    hooks.locales = listLocales;
    hooks.weekdaysShort = listWeekdaysShort;
    hooks.normalizeUnits = normalizeUnits;
    hooks.relativeTimeRounding = getSetRelativeTimeRounding;
    hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
    hooks.calendarFormat = getCalendarFormat;
    hooks.prototype = proto;

    // currently HTML5 input type only supports 24-hour formats
    hooks.HTML5_FMT = {
        DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm', // <input type="datetime-local" />
        DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss', // <input type="datetime-local" step="1" />
        DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS', // <input type="datetime-local" step="0.001" />
        DATE: 'YYYY-MM-DD', // <input type="date" />
        TIME: 'HH:mm', // <input type="time" />
        TIME_SECONDS: 'HH:mm:ss', // <input type="time" step="1" />
        TIME_MS: 'HH:mm:ss.SSS', // <input type="time" step="0.001" />
        WEEK: 'GGGG-[W]WW', // <input type="week" />
        MONTH: 'YYYY-MM', // <input type="month" />
    };

    return hooks;

})));
});

const __default__$o = defineComponent({ name: "CalInputDate" });
var script$q = defineComponent({
  ...__default__$o,
  props: {
    modelValue: [Number, String],
    placeholder: {
      type: String,
      default: ""
    },
    startOf: {
      type: String,
      default: "day"
    },
    toSecond: Boolean
  },
  emits: ["update:modelValue"],
  setup(__props, { emit }) {
    const props = __props;
    const inputValue = computed({
      get() {
        if (props.modelValue) {
          return props.toSecond ? moment(+props.modelValue * 1e3) : moment(+props.modelValue);
        }
        return void 0;
      },
      set(moments) {
        if (moments) {
          props.toSecond ? emit("update:modelValue", +moments.startOf(props.startOf).format("X")) : emit("update:modelValue", +moments.format("x"));
        } else {
          emit("update:modelValue", "");
        }
      }
    });
    useTheme("Input");
    return (_ctx, _cache) => {
      const _component_a_date_picker = resolveComponent("a-date-picker");
      return openBlock(), createBlock(_component_a_date_picker, mergeProps(props, {
        placeholder: __props.placeholder,
        value: unref(inputValue),
        "onUpdate:value": _cache[1] || (_cache[1] = ($event) => isRef(inputValue) ? inputValue.value = $event : null)
      }), null, 16, ["placeholder", "value"]);
    };
  }
});

script$q.__scopeId = "data-v-6551fc06";
script$q.__file = "package/components/input/src/InputDate.vue";

const _hoisted_1$8 = {
  key: 1,
  class: "flex items-center text-gray-darkmin"
};
const _hoisted_2$7 = { key: 0 };
const __default__$n = defineComponent({ name: "CalInputNumber" });
var script$p = defineComponent({
  ...__default__$n,
  props: {
    modelValue: [String, Number],
    showCount: Boolean,
    maxLength: Number,
    placeholder: String,
    showHandel: Boolean,
    precision: {
      type: Number,
      default: 0
    }
  },
  emits: ["change"],
  setup(__props, { emit }) {
    const props = __props;
    const slots = useSlots();
    const inputValue = useVModel(props, "modelValue", emit);
    const currentFontNumber = ref(0);
    const onChange = (value) => {
      const { target } = value;
      currentFontNumber.value = target?.value?.length || 0;
      emit("change", value);
    };
    useTheme("Input");
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(InputNumber), mergeProps({
        class: [{ "cal-input-number-off-handel": !__props.showHandel }, "cal-input-number"]
      }, props, {
        value: unref(inputValue),
        "onUpdate:value": _cache[1] || (_cache[1] = ($event) => isRef(inputValue) ? inputValue.value = $event : null),
        precision: __props.precision,
        onChange
      }), {
        suffix: withCtx(() => [
          unref(slots)["suffix"] ? renderSlot(_ctx.$slots, "suffix", { key: 0 }) : __props.showCount ? (openBlock(), createBlock("div", _hoisted_1$8, [
            createVNode("span", null, toDisplayString(currentFontNumber.value), 1),
            __props.maxLength ? (openBlock(), createBlock("span", _hoisted_2$7, "/" + toDisplayString(__props.maxLength), 1)) : createCommentVNode("v-if", true)
          ])) : createCommentVNode("v-if", true)
        ]),
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["class", "value", "precision"]);
    };
  }
});

script$p.__file = "package/components/input/src/InputNumber.vue";

const __default__$m = defineComponent({ name: "CalInputSearch" });
var script$o = defineComponent({
  ...__default__$m,
  props: {},
  setup(__props) {
    const props = __props;
    useTheme("Input");
    return (_ctx, _cache) => {
      const _component_a_input_search = resolveComponent("a-input-search");
      return openBlock(), createBlock(_component_a_input_search, props, null, 16);
    };
  }
});

script$o.__file = "package/components/input/src/InputSearch.vue";

const __default__$l = defineComponent({ name: "CalImage" });
var script$n = defineComponent({
  ...__default__$l,
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Image), mergeProps({ class: "cal-image rounded-lg overflow-hidden object-cover block" }, props, { preview: false }), null, 16);
    };
  }
});

script$n.__file = "package/components/image/src/Image.vue";

const _withId$5 = /* @__PURE__ */ withScopeId("data-v-26c5e198");
const __default__$k = defineComponent({ name: "CalCard" });
var script$m = defineComponent({
  ...__default__$k,
  props: {
    isHidden: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    const props = __props;
    useTheme("Card");
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Card$1), mergeProps({
        class: ["bg-card-bg-color rounded-3xl", [__props.isHidden ? "cal-card " : "card-style-none"]]
      }, props), {
        default: _withId$5(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["class"]);
    };
  }
});

script$m.__scopeId = "data-v-26c5e198";
script$m.__file = "package/components/card/src/Card.vue";

const _hoisted_1$7 = /* @__PURE__ */ createVNode("div", { class: "loading-gif_" }, [
  /* @__PURE__ */ createVNode("span"),
  /* @__PURE__ */ createVNode("span"),
  /* @__PURE__ */ createVNode("span"),
  /* @__PURE__ */ createVNode("span"),
  /* @__PURE__ */ createVNode("span")
], -1);
const _hoisted_2$6 = { class: "auth-control_" };
const _hoisted_3$5 = { class: "range-text" };
const _hoisted_4$4 = /* @__PURE__ */ createVNode("div", null, null, -1);
const _hoisted_5$2 = /* @__PURE__ */ createVNode("div", null, null, -1);
const _hoisted_6$2 = /* @__PURE__ */ createVNode("div", null, null, -1);
var script$l = defineComponent({
  props: {
    proportion: { type: Number, default: 0.6 / 1 },
    show: { type: Boolean, default: true },
    puzzleScale: { type: Number, default: 1 },
    sliderSize: { type: Number, default: 50 },
    range: { type: Number, default: 10 },
    imgs: {
      type: Array
    },
    successText: {
      type: String,
      default: "\u9A8C\u8BC1\u901A\u8FC7\uFF01"
    },
    failText: {
      type: String,
      default: "\u9A8C\u8BC1\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5"
    },
    sliderText: {
      type: String,
      default: "\u62D6\u52A8\u6ED1\u5757\u5B8C\u6210\u62FC\u56FE"
    }
  },
  setup(__props) {
    const props = __props;
    const vuePuzzleVcode = ref();
    const rangeSlider = ref();
    const canvas1 = ref(null);
    const canvas2 = ref(null);
    const canvas3 = ref(null);
    ref(true);
    const canvasWidth = ref(460);
    onMounted(() => {
      canvasWidth.value = vuePuzzleVcode.value?.clientWidth || 460;
    });
    const canvasHeight = computed(() => canvasWidth.value * props.proportion);
    const puzzleScale = computed(() => canvasWidth.value / 460);
    const onlyDebounce = debounce$1(() => {
      canvasWidth.value = vuePuzzleVcode.value?.clientWidth || 460;
      reset();
    }, 200);
    const { width, remove } = useOnResize(document.body);
    onUnmounted(() => remove);
    watch(width, onlyDebounce);
    const state = reactive({
      mouseDown: false,
      startWidth: 50,
      startX: 0,
      newX: 0,
      pinX: 0,
      pinY: 0,
      loading: true,
      isCanSlide: false,
      error: false,
      infoBoxShow: false,
      infoText: "",
      infoBoxFail: false,
      timer1: 0,
      closeDown: false,
      isSuccess: false,
      imgIndex: -1
    });
    onMounted(() => {
      document.addEventListener("mousemove", onRangeMouseMove, false);
      document.addEventListener("mouseup", onRangeMouseUp, false);
      document.addEventListener("touchmove", onRangeMouseMove, {
        passive: false
      });
      document.addEventListener("touchend", onRangeMouseUp, false);
      if (props.show) {
        document.body.classList.add("vue-puzzle-overflow");
      }
      reset();
    });
    onUnmounted(() => {
      clearTimeout(state.timer1);
      document.removeEventListener("mousemove", onRangeMouseMove, false);
      document.removeEventListener("mouseup", onRangeMouseUp, false);
      document.removeEventListener("touchmove", onRangeMouseMove, {
        passive: false
      });
      document.removeEventListener("touchend", onRangeMouseUp, false);
    });
    watch(() => props.show, (newV) => {
      if (newV) {
        document.body.classList.add("vue-puzzle-overflow");
        reset();
      } else {
        document.body.classList.remove("vue-puzzle-overflow");
      }
    });
    const styleWidth = computed(() => {
      const w = state.startWidth + state.newX - state.startX;
      return w < sliderBaseSize.value ? sliderBaseSize.value : w > canvasWidth.value ? canvasWidth.value : w;
    });
    const puzzleBaseSize = computed(() => {
      return Math.round(Math.max(Math.min(puzzleScale.value, 2), 0.2) * 52.5 + 6);
    });
    const sliderBaseSize = computed(() => {
      return Math.max(Math.min(Math.round(props.sliderSize), Math.round(canvasWidth.value * 0.5)), 10);
    });
    const onC = () => {
      if (!state.mouseDown) {
        clearTimeout(state.timer1);
        context.emit("close");
      }
    };
    const onCloseMouseDown = () => {
      state.closeDown = true;
    };
    const onCloseMouseUp = () => {
      if (state.closeDown) {
        onC();
      }
      state.closeDown = false;
    };
    const onRangeMouseDown = (e) => {
      if (state.isCanSlide) {
        state.mouseDown = true;
        state.startWidth = rangeSlider.value.clientWidth;
        state.newX = e.clientX || e.changedTouches[0].clientX;
        state.startX = e.clientX || e.changedTouches[0].clientX;
      }
    };
    const onRangeMouseMove = (e) => {
      if (state.mouseDown) {
        e.preventDefault();
        state.newX = e.clientX || e.changedTouches[0].clientX;
      }
    };
    const onRangeMouseUp = () => {
      if (state.mouseDown) {
        state.mouseDown = false;
        submit();
      }
    };
    const init = (withCanvas) => {
      state.loading = true;
      state.isCanSlide = false;
      const c = canvas1.value;
      const c2 = canvas2.value;
      const c3 = canvas3.value;
      const ctx = c.getContext("2d");
      const ctx2 = c2.getContext("2d");
      const ctx3 = c3.getContext("2d");
      const img = document.createElement("img");
      ctx.clearRect(0, 0, canvasWidth.value, canvasHeight.value);
      ctx2.clearRect(0, 0, canvasWidth.value, canvasHeight.value);
      state.pinX = getRandom(puzzleBaseSize.value + 20, canvasWidth.value - puzzleBaseSize.value - 10);
      state.pinY = getRandom(20, canvasHeight.value - puzzleBaseSize.value - 10);
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const [x, y, w, h] = makeImgSize(img);
        ctx.save();
        paintBrick(ctx);
        ctx.closePath();
        if (!(navigator.userAgent.indexOf("Firefox") >= 0 && navigator.userAgent.indexOf("Windows") >= 0)) {
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
          ctx.shadowColor = "#000";
          ctx.shadowBlur = 3;
          ctx.fill();
        }
        ctx.clip();
        ctx.save();
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowColor = "#000";
        ctx.shadowBlur = 2;
        ctx.fill();
        ctx.restore();
        ctx.drawImage(img, x, y, w, h);
        ctx3.drawImage(img, x, y, w, h);
        ctx.globalCompositeOperation = "source-atop";
        paintBrick(ctx);
        ctx.arc(state.pinX + Math.ceil(puzzleBaseSize.value / 2), state.pinY + Math.ceil(puzzleBaseSize.value / 2), puzzleBaseSize.value * 1.2, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.shadowColor = "rgba(255, 255, 255, .8)";
        ctx.shadowOffsetX = -1;
        ctx.shadowOffsetY = -1;
        ctx.shadowBlur = Math.min(Math.ceil(8 * puzzleScale.value), 12);
        ctx.fillStyle = "#ffffaa";
        ctx.fill();
        const imgData = ctx.getImageData(state.pinX - 3, state.pinY - 20, state.pinX + puzzleBaseSize.value + 5, state.pinY + puzzleBaseSize.value + 5);
        ctx2.putImageData(imgData, 0, state.pinY - 20);
        ctx.restore();
        ctx.clearRect(0, 0, canvasWidth.value, canvasHeight.value);
        ctx.save();
        paintBrick(ctx);
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.restore();
        ctx.save();
        ctx.globalCompositeOperation = "source-atop";
        paintBrick(ctx);
        ctx.arc(state.pinX + Math.ceil(puzzleBaseSize.value / 2), state.pinY + Math.ceil(puzzleBaseSize.value / 2), puzzleBaseSize.value * 1.2, 0, Math.PI * 2, true);
        ctx.shadowColor = "#000";
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 16;
        ctx.fill();
        ctx.restore();
        ctx.save();
        ctx.globalCompositeOperation = "destination-over";
        ctx.drawImage(img, x, y, w, h);
        ctx.restore();
        state.loading = false;
        state.isCanSlide = true;
      };
      img.onerror = () => {
        init(true);
      };
      if (!withCanvas && props.imgs && props.imgs.length) {
        let randomNum = getRandom(0, props.imgs.length - 1);
        if (randomNum === state.imgIndex) {
          if (randomNum === props.imgs.length - 1) {
            randomNum = 0;
          } else {
            randomNum++;
          }
        }
        state.imgIndex = randomNum;
        img.src = props.imgs[randomNum];
      } else {
        img.src = makeImgWithCanvas();
      }
    };
    const getRandom = (min, max) => {
      return Math.ceil(Math.random() * (max - min) + min);
    };
    const makeImgSize = (img) => {
      const imgScale = img.width / img.height;
      const canvasScale = canvasWidth.value / canvasHeight.value;
      let x = 0, y = 0, w = 0, h = 0;
      if (imgScale > canvasScale) {
        h = canvasHeight.value;
        w = imgScale * h;
        y = 0;
        x = (canvasWidth.value - w) / 2;
      } else {
        w = canvasWidth.value;
        h = w / imgScale;
        x = 0;
        y = (canvasHeight.value - h) / 2;
      }
      return [x, y, w, h];
    };
    const paintBrick = (ctx) => {
      const moveL = Math.ceil(15 * puzzleScale.value);
      ctx.beginPath();
      ctx.moveTo(state.pinX, state.pinY);
      ctx.lineTo(state.pinX + moveL, state.pinY);
      ctx.arcTo(state.pinX + moveL, state.pinY - moveL / 2, state.pinX + moveL + moveL / 2, state.pinY - moveL / 2, moveL / 2);
      ctx.arcTo(state.pinX + moveL + moveL, state.pinY - moveL / 2, state.pinX + moveL + moveL, state.pinY, moveL / 2);
      ctx.lineTo(state.pinX + moveL + moveL + moveL, state.pinY);
      ctx.lineTo(state.pinX + moveL + moveL + moveL, state.pinY + moveL);
      ctx.arcTo(state.pinX + moveL + moveL + moveL + moveL / 2, state.pinY + moveL, state.pinX + moveL + moveL + moveL + moveL / 2, state.pinY + moveL + moveL / 2, moveL / 2);
      ctx.arcTo(state.pinX + moveL + moveL + moveL + moveL / 2, state.pinY + moveL + moveL, state.pinX + moveL + moveL + moveL, state.pinY + moveL + moveL, moveL / 2);
      ctx.lineTo(state.pinX + moveL + moveL + moveL, state.pinY + moveL + moveL + moveL);
      ctx.lineTo(state.pinX, state.pinY + moveL + moveL + moveL);
      ctx.lineTo(state.pinX, state.pinY + moveL + moveL);
      ctx.arcTo(state.pinX + moveL / 2, state.pinY + moveL + moveL, state.pinX + moveL / 2, state.pinY + moveL + moveL / 2, moveL / 2);
      ctx.arcTo(state.pinX + moveL / 2, state.pinY + moveL, state.pinX, state.pinY + moveL, moveL / 2);
      ctx.lineTo(state.pinX, state.pinY);
    };
    const makeImgWithCanvas = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx)
        return;
      canvas.width = canvasWidth.value;
      canvas.height = canvasHeight.value;
      ctx.fillStyle = `rgb(${getRandom(100, 255)},${getRandom(100, 255)},${getRandom(100, 255)})`;
      ctx.fillRect(0, 0, canvasWidth.value, canvasHeight.value);
      for (let i = 0; i < 12; i++) {
        ctx.fillStyle = `rgb(${getRandom(100, 255)},${getRandom(100, 255)},${getRandom(100, 255)})`;
        ctx.strokeStyle = `rgb(${getRandom(100, 255)},${getRandom(100, 255)},${getRandom(100, 255)})`;
        if (getRandom(0, 2) > 1) {
          ctx.save();
          ctx.rotate(getRandom(-90, 90) * Math.PI / 180);
          ctx.fillRect(getRandom(-20, canvas.width - 20), getRandom(-20, canvas.height - 20), getRandom(10, canvas.width / 2 + 10), getRandom(10, canvas.height / 2 + 10));
          ctx.restore();
        } else {
          ctx.beginPath();
          const ran = getRandom(-Math.PI, Math.PI);
          ctx.arc(getRandom(0, canvas.width), getRandom(0, canvas.height), getRandom(10, canvas.height / 2 + 10), ran, ran + Math.PI * 1.5);
          ctx.closePath();
          ctx.fill();
        }
      }
      return canvas.toDataURL("image/png");
    };
    const submit = () => {
      const x = Math.abs(state.pinX - (styleWidth.value - sliderBaseSize.value) + (puzzleBaseSize.value - sliderBaseSize.value) * ((styleWidth.value - sliderBaseSize.value) / (canvasWidth.value - sliderBaseSize.value)) - 3);
      if (x < props.range) {
        state.infoText = props.successText;
        state.infoBoxFail = false;
        state.infoBoxShow = true;
        state.isCanSlide = false;
        state.isSuccess = true;
        clearTimeout(state.timer1);
        state.timer1 = setTimeout(() => {
          context.emit("success", x);
        }, 800);
      } else {
        state.infoText = props.failText;
        state.infoBoxFail = true;
        state.infoBoxShow = true;
        state.isCanSlide = false;
        context.emit("fail", x);
        clearTimeout(state.timer1);
        state.timer1 = setTimeout(() => {
          reset();
        }, 800);
      }
    };
    const reset = () => {
      state.infoBoxFail = false;
      state.infoBoxShow = false;
      state.isCanSlide = true;
      state.isSuccess = false;
      state.startWidth = sliderBaseSize.value;
      state.startX = 0;
      state.newX = 0;
      init();
    };
    const {
      mouseDown,
      startWidth,
      startX,
      newX,
      pinX,
      pinY,
      loading,
      isCanSlide,
      Error,
      infoBoxShow,
      infoText,
      infoBoxFail,
      timer1,
      closeDown,
      isSuccess,
      imgIndex
    } = toRefs(state);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Fragment, null, [
        createCommentVNode(" \u672C\u4F53\u90E8\u5206 "),
        createVNode("div", {
          ref: vuePuzzleVcode,
          class: ["vue-puzzle-vcode", { show_: __props.show }],
          onMousedown: onCloseMouseDown,
          onMouseup: onCloseMouseUp,
          onTouchstart: onCloseMouseDown,
          onTouchend: onCloseMouseUp
        }, [
          createVNode("div", {
            class: "vue-auth-box_",
            onMousedown: _cache[3] || (_cache[3] = withModifiers(() => {
            }, ["stop"])),
            onTouchstart: _cache[4] || (_cache[4] = withModifiers(() => {
            }, ["stop"]))
          }, [
            createVNode("div", {
              class: "auth-body_",
              style: `height: ${unref(canvasHeight)}px`
            }, [
              createCommentVNode(" \u4E3B\u56FE\uFF0C\u6709\u7F3A\u53E3 "),
              createVNode("canvas", {
                ref: canvas1,
                width: canvasWidth.value,
                height: unref(canvasHeight),
                style: {
                  width: `${canvasWidth.value}px`,
                  height: `${unref(canvasHeight)}px`
                }
              }, null, 12, ["width", "height"]),
              createCommentVNode(" \u6210\u529F\u540E\u663E\u793A\u7684\u5B8C\u6574\u56FE "),
              createVNode("canvas", {
                ref: canvas3,
                class: ["auth-canvas3_", { show: unref(isSuccess) }],
                width: canvasWidth.value,
                height: unref(canvasHeight),
                style: `width:${canvasWidth.value}px;height:${unref(canvasHeight)}px`
              }, null, 14, ["width", "height"]),
              createCommentVNode(" \u5C0F\u56FE "),
              createVNode("canvas", {
                width: unref(puzzleBaseSize),
                class: "auth-canvas2_",
                height: unref(canvasHeight),
                ref: canvas2,
                style: `width:${unref(puzzleBaseSize)}px;height:${unref(canvasHeight)}px;transform:translateX(${unref(styleWidth) - unref(sliderBaseSize) - (unref(puzzleBaseSize) - unref(sliderBaseSize)) * ((unref(styleWidth) - unref(sliderBaseSize)) / (canvasWidth.value - unref(sliderBaseSize)))}px)`
              }, null, 12, ["width", "height"]),
              createVNode("div", {
                class: ["loading-box_", { hide_: !unref(loading) }]
              }, [
                _hoisted_1$7
              ], 2),
              createVNode("div", {
                class: ["info-box_", { show: unref(infoBoxShow) }, { fail: unref(infoBoxFail) }]
              }, toDisplayString(unref(infoText)), 3),
              createVNode("div", {
                class: ["flash_", { show: unref(isSuccess) }],
                style: `transform: translateX(${unref(isSuccess) ? `${canvasWidth.value + unref(canvasHeight) * 0.578}px` : `-${unref(canvasHeight) * 0.578}px`}) skew(-30deg, 0);`
              }, null, 6)
            ], 4),
            createVNode("div", _hoisted_2$6, [
              createVNode("div", {
                class: "range-box",
                style: `height:${unref(sliderBaseSize)}px`
              }, [
                createVNode("div", _hoisted_3$5, toDisplayString(__props.sliderText), 1),
                createVNode("div", {
                  class: "range-slider",
                  ref: rangeSlider,
                  style: `width:${unref(styleWidth) * 0.94}px`
                }, [
                  createVNode("div", {
                    class: ["range-btn", { isDown: unref(mouseDown) }],
                    style: `width:${unref(sliderBaseSize)}px`,
                    onMousedown: _cache[1] || (_cache[1] = ($event) => onRangeMouseDown($event)),
                    onTouchstart: _cache[2] || (_cache[2] = ($event) => onRangeMouseDown($event))
                  }, [
                    _hoisted_4$4,
                    _hoisted_5$2,
                    _hoisted_6$2
                  ], 38)
                ], 4)
              ], 4)
            ])
          ], 32)
        ], 34)
      ], 2112);
    };
  }
});

script$l.__file = "package/components/image-verif/src/ImageVerif.vue";

const __default__$j = defineComponent({ name: "CalCasCader" });
var script$k = defineComponent({
  ...__default__$j,
  setup(__props) {
    const props = __props;
    useTheme("Common");
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Cascader), mergeProps({ class: "cal-cascader" }, props), null, 16);
    };
  }
});

script$k.__file = "package/components/cascader/src/CasCader.vue";

const __default__$i = defineComponent({ name: "CalCheckbox" });
var script$j = defineComponent({
  ...__default__$i,
  props: {},
  setup(__props) {
    const props = __props;
    useTheme("Common");
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Checkbox), props, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});

script$j.__file = "package/components/checkbox/src/Checkbox.vue";

const _hoisted_1$6 = { class: "cal-class__container" };
const _hoisted_2$5 = { class: "cal-class__item flex items-center mb-20" };
const _hoisted_3$4 = { class: "cal-class__label w-64 mr-10 text-center select-none" };
const _hoisted_4$3 = { class: "cal-class__options" };
const __default__$h = defineComponent({ name: "CalClassification" });
var script$i = defineComponent({
  ...__default__$h,
  props: {
    nestedIndex: {
      type: Number,
      default: 0
    },
    option: {
      type: Object
    },
    fieldNames: {
      type: Object,
      default: { label: "label", value: "value", children: "children" }
    },
    loadData: {
      type: Object
    }
  },
  emits: ["change"],
  setup(__props, { emit }) {
    const props = __props;
    const selectList = inject("selectList") || ref([]);
    if (props.nestedIndex === 0)
      provide("selectList", selectList);
    const onClickItem = async (optionItem) => {
      const currentState = !optionItem.state;
      props.option?.children?.forEach((v) => delete v.state);
      optionItem.state = currentState;
      selectList.value = selectList.value.slice(0, props.nestedIndex);
      if (!currentState) {
        currentChildren.value = void 0;
        delete selectList.value[props.nestedIndex];
      } else {
        const data = await props.loadData?.({ option: optionItem, nestedIndex: props.nestedIndex });
        const option = data || cloneDeep(optionItem);
        selectList.value[props.nestedIndex] = option[props.fieldNames["value"]];
        currentChildren.value = option;
      }
      emit("change", selectList.value);
    };
    const currentChildren = ref();
    return (_ctx, _cache) => {
      const _component_cal_button = resolveComponent("cal-button");
      const _component_index = resolveComponent("index");
      return openBlock(), createBlock("div", _hoisted_1$6, [
        createVNode("div", _hoisted_2$5, [
          createVNode("div", _hoisted_3$4, toDisplayString(__props.option?.[__props.fieldNames["label"]]), 1),
          createVNode("div", _hoisted_4$3, [
            (openBlock(true), createBlock(Fragment, null, renderList(__props.option?.[__props.fieldNames["children"]], (item, index) => {
              return openBlock(), createBlock(_component_cal_button, {
                type: "primary",
                class: ["mx-12", [!item.state && "text-grey-darkmin border-none bg-white-darkmin"]],
                key: index,
                onClick: ($event) => onClickItem(item)
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(item[__props.fieldNames["label"]]), 1)
                ]),
                _: 2
              }, 1032, ["onClick", "class"]);
            }), 128))
          ])
        ]),
        currentChildren.value?.[__props.fieldNames["children"]]?.length ? (openBlock(), createBlock(_component_index, {
          key: 0,
          "nested-index": __props.nestedIndex + 1,
          option: currentChildren.value,
          loadData: __props.loadData,
          fieldNames: __props.fieldNames,
          onChange: _cache[1] || (_cache[1] = ($event) => emit("change", $event))
        }, null, 8, ["nested-index", "option", "loadData", "fieldNames"])) : createCommentVNode("v-if", true)
      ]);
    };
  }
});

script$i.__file = "package/components/classification/src/Classification.vue";

const __default__$g = defineComponent({ name: "CalCollapseTransition" });
var script$h = defineComponent({
  ...__default__$g,
  setup(__props) {
    const on = {
      beforeEnter(el) {
        el.classList.add("collapse-transition");
        if (!el.dataset)
          el.dataset = {};
        el.dataset.oldPaddingTop = el.style.paddingTop;
        el.dataset.oldPaddingBottom = el.style.paddingBottom;
        el.style.height = "0";
        el.style.paddingTop = "0";
        el.style.paddingBottom = "0";
      },
      enter(el) {
        el.dataset.oldOverflow = el.style.overflow;
        if (el.scrollHeight !== 0) {
          el.style.height = el.scrollHeight + "px";
          el.style.paddingTop = el.dataset.oldPaddingTop || "0";
          el.style.paddingBottom = el.dataset.oldPaddingBottom || "0";
        } else {
          el.style.height = "";
          el.style.paddingTop = el.dataset.oldPaddingTop || "0";
          el.style.paddingBottom = el.dataset.oldPaddingBottom || "0";
        }
        el.style.overflow = "hidden";
      },
      afterEnter(el) {
        el.classList.remove("collapse-transition");
        el.style.height = "";
        el.style.overflow = el.dataset.oldOverflow || "0";
      },
      beforeLeave(el) {
        if (!el.dataset)
          el.dataset = {};
        el.dataset.oldPaddingTop = el.style.paddingTop;
        el.dataset.oldPaddingBottom = el.style.paddingBottom;
        el.dataset.oldOverflow = el.style.overflow;
        el.style.height = el.scrollHeight + "px";
        el.style.overflow = "hidden";
      },
      leave(el) {
        if (el.scrollHeight !== 0) {
          el.classList.add("collapse-transition");
          el.style.transitionProperty = "height";
          el.style.height = "0";
          el.style.paddingTop = "0";
          el.style.paddingBottom = "0";
        }
      },
      afterLeave(el) {
        el.classList.remove("collapse-transition");
        el.style.height = "";
        el.style.overflow = el.dataset.oldOverflow || "0";
        el.style.paddingTop = el.dataset.oldPaddingTop || "0";
        el.style.paddingBottom = el.dataset.oldPaddingBottom || "0";
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, toHandlers(on), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});

script$h.__file = "package/components/collapseTransition/src/CollapseTransition.vue";

const __default__$f = defineComponent({ name: "CalEmpty" });
var script$g = defineComponent({
  ...__default__$f,
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Empty), props, null, 16);
    };
  }
});

script$g.__file = "package/components/empty/src/Empty.vue";

const _hoisted_1$5 = /* @__PURE__ */ createTextVNode("5\u6761/\u9875");
const _hoisted_2$4 = /* @__PURE__ */ createTextVNode("10\u6761/\u9875");
const _hoisted_3$3 = /* @__PURE__ */ createTextVNode("15\u6761/\u9875");
const _hoisted_4$2 = /* @__PURE__ */ createTextVNode("30\u6761/\u9875");
const _hoisted_5$1 = /* @__PURE__ */ createTextVNode("50\u6761/\u9875");
const _hoisted_6$1 = /* @__PURE__ */ createTextVNode("100\u6761/\u9875");
const __default__$e = defineComponent({ name: "CalPageSelect" });
var script$f = defineComponent({
  ...__default__$e,
  props: {
    modelValue: {
      type: [String, Number],
      default: 10
    },
    width: {
      type: [Number, String],
      default: 116
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit }) {
    const props = __props;
    const inputValue = computed({
      get: () => props.modelValue ? props.modelValue : void 0,
      set(value) {
        emit("update:modelValue", value);
      }
    });
    useTheme("Common");
    useTheme("PageSelect");
    return (_ctx, _cache) => {
      const _component_a_select_option = resolveComponent("a-select-option");
      const _component_a_select = resolveComponent("a-select");
      return openBlock(), createBlock(_component_a_select, mergeProps({
        class: "cal-page-select",
        value: unref(inputValue),
        "onUpdate:value": _cache[1] || (_cache[1] = ($event) => isRef(inputValue) ? inputValue.value = $event : null),
        dropdownClassName: "cal-page-select-option "
      }, props, {
        style: { width: unref(analyUnit)(__props.width) }
      }), {
        default: withCtx(() => [
          createVNode(_component_a_select_option, { value: 5 }, {
            default: withCtx(() => [
              _hoisted_1$5
            ]),
            _: 1
          }),
          createVNode(_component_a_select_option, { value: 10 }, {
            default: withCtx(() => [
              _hoisted_2$4
            ]),
            _: 1
          }),
          createVNode(_component_a_select_option, { value: 15 }, {
            default: withCtx(() => [
              _hoisted_3$3
            ]),
            _: 1
          }),
          createVNode(_component_a_select_option, { value: 30 }, {
            default: withCtx(() => [
              _hoisted_4$2
            ]),
            _: 1
          }),
          createVNode(_component_a_select_option, { value: 50 }, {
            default: withCtx(() => [
              _hoisted_5$1
            ]),
            _: 1
          }),
          createVNode(_component_a_select_option, { value: 100 }, {
            default: withCtx(() => [
              _hoisted_6$1
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 16, ["value", "style"]);
    };
  }
});

script$f.__file = "package/components/page-select/src/PageSelect.vue";

const __default__$d = defineComponent({ name: "CalPagination" });
var script$e = defineComponent({
  ...__default__$d,
  props: {
    modelValue: Number
  },
  setup(__props) {
    const props = __props;
    const modelValue = useVModel(props, "modelValue");
    useTheme("Common");
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Pagination), mergeProps({ class: "cal-pagination" }, props, {
        current: unref(modelValue),
        "onUpdate:current": _cache[1] || (_cache[1] = ($event) => isRef(modelValue) ? modelValue.value = $event : null)
      }), null, 16, ["current"]);
    };
  }
});

script$e.__file = "package/components/pagination/src/Pagination.vue";

const _withId$4 = /* @__PURE__ */ withScopeId("data-v-6927cd5a");
const __default__$c = defineComponent({ name: "CalRadio" });
var script$d = defineComponent({
  ...__default__$c,
  props: {},
  setup(__props) {
    const props = __props;
    useTheme("Common");
    return (_ctx, _cache) => {
      const _component_a_radio = resolveComponent("a-radio");
      return openBlock(), createBlock(_component_a_radio, mergeProps({ class: "cal-radio" }, props), {
        default: _withId$4(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});

script$d.__scopeId = "data-v-6927cd5a";
script$d.__file = "package/components/radio/src/Radio.vue";

const __default__$b = defineComponent({ name: "CalRadioGroup" });
var script$c = defineComponent({
  ...__default__$b,
  props: {
    modelValue: [String, Number]
  },
  setup(__props) {
    const props = __props;
    const value = useVModel(props, "modelValue");
    return (_ctx, _cache) => {
      const _component_a_radio_group = resolveComponent("a-radio-group");
      return openBlock(), createBlock(_component_a_radio_group, {
        class: "cal-radio-group",
        value: unref(value),
        "onUpdate:value": _cache[1] || (_cache[1] = ($event) => isRef(value) ? value.value = $event : null)
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["value"]);
    };
  }
});

script$c.__file = "package/components/radio/src/RadioGroup.vue";

const _hoisted_1$4 = /* @__PURE__ */ createVNode("i", { class: "nr-after text-4xl" }, null, -1);
const _hoisted_2$3 = /* @__PURE__ */ createVNode("i", {
  class: "nr-step-await text-common-primary-color-light-4",
  style: { "font-size": "40px" }
}, null, -1);
const __default__$a = defineComponent({ name: "CalStep" });
var script$b = defineComponent({
  ...__default__$a,
  props: {},
  setup(__props) {
    const props = __props;
    useTheme("Common");
    return (_ctx, _cache) => {
      const _component_a_step = resolveComponent("a-step");
      return openBlock(), createBlock(_component_a_step, mergeProps({ class: "cal-step" }, props), {
        icon: withCtx(() => [
          _hoisted_1$4,
          _hoisted_2$3
        ]),
        description: withCtx(() => [
          renderSlot(_ctx.$slots, "description")
        ]),
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});

script$b.__file = "package/components/step/src/Step.vue";

const _withId$3 = /* @__PURE__ */ withScopeId("data-v-1c02af0b");
const __default__$9 = defineComponent({ name: "CalSteps" });
var script$a = defineComponent({
  ...__default__$9,
  props: {},
  setup(__props) {
    const props = __props;
    useTheme("Common");
    return (_ctx, _cache) => {
      const _component_a_steps = resolveComponent("a-steps");
      return openBlock(), createBlock(_component_a_steps, mergeProps({ class: "cal-steps" }, props), {
        default: _withId$3(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});

script$a.__scopeId = "data-v-1c02af0b";
script$a.__file = "package/components/step/src/Steps.vue";

const __default__$8 = defineComponent({ name: "CalSwitch" });
var script$9 = defineComponent({
  ...__default__$8,
  props: {
    modelValue: [String, Number, Boolean],
    activeValue: {
      type: [String, Number, Boolean],
      default: 1
    },
    closeValue: {
      type: [String, Number, Boolean],
      default: 0
    }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { emit }) {
    const props = __props;
    const switchValue = computed({
      get: () => {
        return props.modelValue == props.activeValue;
      },
      set: (value) => {
        if (value) {
          emit("update:modelValue", props.activeValue);
        } else {
          emit("update:modelValue", props.closeValue);
        }
      }
    });
    useTheme("Common");
    return (_ctx, _cache) => {
      const _component_a_switch = resolveComponent("a-switch");
      return openBlock(), createBlock(_component_a_switch, mergeProps(props, {
        checked: unref(switchValue),
        "onUpdate:checked": _cache[1] || (_cache[1] = ($event) => isRef(switchValue) ? switchValue.value = $event : null),
        onChange: _cache[2] || (_cache[2] = ($event) => emit("change", $event ? __props.activeValue : __props.closeValue))
      }), null, 16, ["checked"]);
    };
  }
});

script$9.__file = "package/components/switch/src/Switch.vue";

var script$8 = defineComponent({
  props: {
    item: Object,
    index: Number
  },
  setup(__props) {
    const props = __props;
    provide("itemObject", { item: props.item, index: props.index });
    return (_ctx, _cache) => {
      return renderSlot(_ctx.$slots, "default");
    };
  }
});

script$8.__file = "package/components/table/src/TableProvide.vue";

// This alphabet uses `A-Za-z0-9_-` symbols. The genetic algorithm helped
// optimize the gzip compression for this alphabet.
let urlAlphabet =
  'ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW';

// It is best to make fewer, larger requests to the crypto module to
// avoid system call overhead. So, random numbers are generated in a
// pool. The pool is a Buffer that is larger than the initial random
// request size by this multiplier. The pool is enlarged if subsequent
// requests exceed the maximum buffer size.
const POOL_SIZE_MULTIPLIER = 32;
let pool, poolOffset;

let random = bytes => {
  if (!pool || pool.length < bytes) {
    pool = Buffer.allocUnsafe(bytes * POOL_SIZE_MULTIPLIER);
    crypto.randomFillSync(pool);
    poolOffset = 0;
  } else if (poolOffset + bytes > pool.length) {
    crypto.randomFillSync(pool);
    poolOffset = 0;
  }

  let res = pool.subarray(poolOffset, poolOffset + bytes);
  poolOffset += bytes;
  return res
};

let nanoid = (size = 21) => {
  let bytes = random(size);
  let id = '';
  // A compact alternative for `for (let i = 0; i < size; i++)`.
  while (size--) {
    // It is incorrect to use bytes exceeding the alphabet size.
    // The following mask reduces the random byte in the 0-255 value
    // range to the 0-63 value range. Therefore, adding hacks, such
    // as empty string fallback or magic numbers, is unneccessary because
    // the bitmask trims bytes down to the alphabet size.
    id += urlAlphabet[bytes[size] & 63];
  }
  return id
};

const _withId$2 = /* @__PURE__ */ withScopeId("data-v-489a4e40");
pushScopeId("data-v-489a4e40");
const _hoisted_1$3 = { class: "table-container" };
const _hoisted_2$2 = /* @__PURE__ */ createVNode("div", { class: "w-4" }, null, -1);
const _hoisted_3$2 = {
  key: 0,
  class: "px-20 flex items-center"
};
popScopeId();
const __default__$7 = defineComponent({ name: "CalTable" });
var script$7 = defineComponent({
  ...__default__$7,
  props: {
    marginBottom: {
      type: [Number, String],
      default: 10
    },
    minWidth: {
      type: [String, Number],
      default: "none"
    },
    list: {
      type: Array,
      default: [{}]
    },
    textAlign: {
      type: String,
      default: "left"
    },
    contentAlign: {
      type: String,
      default: "left"
    },
    select: {
      type: Boolean,
      default: false
    },
    space: {
      type: [Number, String],
      default: 24
    },
    syncSpace: Boolean
  },
  emits: ["checkboxChange"],
  setup(__props, { emit }) {
    const props = __props;
    const selectList = {};
    const onCheckboxChange = (item, { target: { checked } }) => {
      item.CACHE_SELECT_TABLE = checked;
      if (checked) {
        selectList[item?.CACHE_ID_TABLE] = item.CACHE_OLD_ITEM_TABLE;
      } else {
        delete selectList[item?.CACHE_ID_TABLE];
      }
      emit("checkboxChange", Object.values(selectList));
    };
    const updateList = () => {
      return props.list.map((item) => {
        return {
          ...item,
          CACHE_ID_TABLE: item.CACHE_ID_TABLE ? item.CACHE_ID_TABLE : nanoid(5),
          CACHE_SELECT_TABLE: !!item.select,
          CACHE_OLD_ITEM_TABLE: item
        };
      });
    };
    const listOrder = () => {
      if (controller.value.order.sort !== 0) {
        return orderBy(fictitiousList.value, [controller.value.order.index], [controller.value.order.sort === 1 ? "asc" : "desc"]);
      }
      return fictitiousShowList.value;
    };
    const fictitiousList = ref(updateList());
    const fictitiousShowList = ref(updateList());
    const controller = ref({ order: { index: "", sort: 0 }, renderList: false });
    watch(() => props.list, () => {
      fictitiousShowList.value = fictitiousList.value = updateList();
      fictitiousList.value = listOrder();
    }, {
      deep: true
    });
    watch(() => controller.value.order.sort, () => fictitiousList.value = listOrder());
    provide("controller", controller);
    provide("option", props);
    useTheme("Common");
    return (_ctx, _cache) => {
      const _component_cal_checkbox = resolveComponent("cal-checkbox");
      const _component_cal_empty = resolveComponent("cal-empty");
      return openBlock(), createBlock("div", _hoisted_1$3, [
        (openBlock(true), createBlock(Fragment, null, renderList(fictitiousList.value, (item, index) => {
          return openBlock(), createBlock("div", {
            class: "table-view_title flex py-24 overflow-auto",
            style: { marginBottom: unref(analyUnit)(__props.marginBottom) },
            key: item.CACHE_ID_TABLE
          }, [
            _hoisted_2$2,
            __props.select ? (openBlock(), createBlock("div", _hoisted_3$2, [
              createVNode(_component_cal_checkbox, {
                onChange: ($event) => onCheckboxChange(item, $event)
              }, null, 8, ["onChange"])
            ])) : createCommentVNode("v-if", true),
            createVNode("div", {
              class: "flex flex-1",
              style: { minWidth: __props.minWidth }
            }, [
              createVNode(script$8, {
                item: item.CACHE_OLD_ITEM_TABLE,
                index
              }, {
                default: _withId$2(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 2
              }, 1032, ["item", "index"])
            ], 4)
          ], 4);
        }), 128)),
        !fictitiousList.value.length ? (openBlock(), createBlock(_component_cal_empty, {
          key: 0,
          class: "mt-160"
        })) : createCommentVNode("v-if", true)
      ]);
    };
  }
});

script$7.__scopeId = "data-v-489a4e40";
script$7.__file = "package/components/table/src/Table.vue";

const _withId$1 = /* @__PURE__ */ withScopeId("data-v-7fda1255");
pushScopeId("data-v-7fda1255");
const _hoisted_1$2 = { key: 0 };
popScopeId();
const __default__$6 = defineComponent({ name: "CalTableOption" });
var script$6 = defineComponent({
  ...__default__$6,
  props: {
    minWidth: {
      type: [String, Number],
      default: 80
    },
    maxWidth: {
      type: [String, Number],
      default: "none"
    },
    title: String,
    sort: Boolean,
    index: String,
    borderLeft: Boolean,
    borderRight: Boolean,
    type: {
      type: String,
      default: "data"
    }
  },
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    const { item, index } = inject("itemObject");
    const listObject = inject("listObject");
    const option = inject("option");
    const controller = inject("controller");
    const showContent = computed(() => get(item, props.index || props.title || ""));
    if (props.type === "list")
      provide("listObject", showContent.value);
    const isCurrentIndex = () => {
      const isIndex = controller?.value?.order?.index === props.index;
      const isTitle = controller?.value?.order?.index === props.title;
      return isIndex || isTitle;
    };
    const sortState = computed({
      get() {
        return isCurrentIndex() ? controller.value.order.sort : 0;
      },
      set(sort) {
        if (isCurrentIndex()) {
          controller.value.order.sort = sort;
        } else {
          controller.value.order.index = props.index || props.title;
          controller.value.order.sort = 1;
        }
      }
    });
    useTheme("Table");
    useCssVars(() => ({ "table-within-space": analyUnit(option.space) }));
    return (_ctx, _cache) => {
      const _component_cal_theme_icon = resolveComponent("cal-theme-icon");
      return __props.type !== "list" ? (openBlock(), createBlock("div", {
        key: 0,
        class: "table-option-container",
        style: {
          maxWidth: unref(option)?.syncSpace ? `calc(${unref(analyUnit)(__props.maxWidth || "")} + (${unref(analyUnit)(unref(option).space)} * 2))` : unref(analyUnit)(__props.maxWidth || ""),
          minWidth: unref(option)?.syncSpace ? `calc(${unref(analyUnit)(__props.minWidth || "")} + (${unref(analyUnit)(unref(option).space)} * 2))` : unref(analyUnit)(__props.minWidth || ""),
          flex: 1,
          paddingLeft: unref(analyUnit)(unref(option).space),
          paddingRight: unref(analyUnit)(unref(option).space),
          borderLeft: props.borderLeft ? "solid 1px #F5F5F5" : "none",
          borderRight: props.borderRight ? "solid 1px #F5F5F5" : "none"
        }
      }, [
        createVNode("div", {
          class: ["w-full text-gray-darkmin cursor-pointer select-none mb-24", [unref(option).textAlign === "left" ? "text-left" : "text-center"]]
        }, [
          !__props.sort ? (openBlock(), createBlock("span", _hoisted_1$2, toDisplayString(__props.title), 1)) : (openBlock(), createBlock(_component_cal_theme_icon, {
            key: 1,
            type: "sortArrow",
            modelValue: unref(sortState),
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(sortState) ? sortState.value = $event : null)
          }, {
            default: _withId$1(() => [
              createVNode("span", null, toDisplayString(__props.title), 1)
            ]),
            _: 1
          }, 8, ["modelValue"]))
        ], 2),
        createVNode("div", {
          class: "flex flex-1 flex-col w-full justify-center list-border",
          ":class": [unref(option).contentAlign === "left" ? "" : "items-center"]
        }, [
          unref(listObject) ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(listObject), (item2, i) => {
            return openBlock(), createBlock("div", {
              class: "item-border",
              key: i.toString()
            }, [
              unref(slots)["default"] ? renderSlot(_ctx.$slots, "default", {
                key: 0,
                content: item2[props.index || props.title || ""],
                item: item2,
                index: i,
                list: unref(listObject)
              }) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                createTextVNode(toDisplayString(item2[props.index || props.title || ""]), 1)
              ], 2112))
            ]);
          }), 128)) : unref(slots)["default"] ? renderSlot(_ctx.$slots, "default", {
            key: 1,
            content: unref(showContent),
            item: unref(item),
            index: unref(index),
            list: unref(option).list
          }) : (openBlock(), createBlock(Fragment, { key: 2 }, [
            createTextVNode(toDisplayString(unref(showContent)), 1)
          ], 2112))
        ], 8, [":class"])
      ], 4)) : unref(slots)["default"] ? (openBlock(), createBlock("div", {
        key: 1,
        class: "flex border-style-release",
        style: {
          maxWidth: unref(option)?.syncSpace ? `calc(${unref(analyUnit)(__props.maxWidth || "")} + (${unref(analyUnit)(unref(option).space)} * 2))` : unref(analyUnit)(__props.maxWidth || ""),
          minWidth: unref(option)?.syncSpace ? `calc(${unref(analyUnit)(__props.minWidth || "")} + (${unref(analyUnit)(unref(option).space)} * 2))` : unref(analyUnit)(__props.minWidth || ""),
          flex: 1,
          paddingLeft: unref(analyUnit)(unref(option).space),
          paddingRight: unref(analyUnit)(unref(option).space),
          borderLeft: props.borderLeft ? "solid 1px #F5F5F5" : "none",
          borderRight: props.borderRight ? "solid 1px #F5F5F5" : "none"
        }
      }, [
        renderSlot(_ctx.$slots, "default", {
          content: unref(showContent),
          item: unref(item),
          index: unref(index),
          list: unref(option).list
        })
      ], 4)) : (openBlock(), createBlock(Fragment, { key: 2 }, [
        createTextVNode(toDisplayString(unref(showContent)), 1)
      ], 2112));
    };
  }
});

script$6.__scopeId = "data-v-7fda1255";
script$6.__file = "package/components/table/src/TableOption.vue";

const _hoisted_1$1 = { class: "cal-tab-pane__content flex-1" };
const _hoisted_2$1 = { class: "cal-tab-pane__sticky" };
const _hoisted_3$1 = { class: "cal-tab-pane__content flex-1" };
const _hoisted_4$1 = { class: "cal-tab-pane__sticky" };
const __default__$5 = defineComponent({ name: "CalTabPane" });
var script$5 = defineComponent({
  ...__default__$5,
  props: {
    alone: Boolean,
    hide: Boolean,
    minHeight: [Number, String]
  },
  setup(__props) {
    const props = __props;
    const ATabPane = Tabs$1.TabPane;
    return (_ctx, _cache) => {
      return __props.alone ? (openBlock(), createBlock("div", {
        key: 0,
        class: "cal-tab-pane bg-tabs-background-color p-24 flex flex-col",
        style: { minHeight: unref(analyUnit)(__props.minHeight || "") }
      }, [
        createVNode("div", _hoisted_1$1, [
          renderSlot(_ctx.$slots, "default")
        ]),
        createVNode("div", _hoisted_2$1, [
          renderSlot(_ctx.$slots, "sticky")
        ])
      ], 4)) : !__props.hide ? (openBlock(), createBlock(unref(ATabPane), mergeProps({
        key: 1,
        class: "cal-tab-pane bg-tabs-background-color p-24 flex flex-col",
        style: { minHeight: unref(analyUnit)(__props.minHeight || "") }
      }, props), {
        tab: withCtx(() => [
          renderSlot(_ctx.$slots, "tab")
        ]),
        default: withCtx(() => [
          createVNode("div", _hoisted_3$1, [
            renderSlot(_ctx.$slots, "default")
          ]),
          createVNode("div", _hoisted_4$1, [
            renderSlot(_ctx.$slots, "sticky")
          ])
        ]),
        _: 3
      }, 16, ["style"])) : createCommentVNode("v-if", true);
    };
  }
});

script$5.__file = "package/components/tabs/src/TabPane.vue";

const __default__$4 = defineComponent({ name: "CalTabs" });
var script$4 = defineComponent({
  ...__default__$4,
  props: {},
  setup(__props) {
    const props = __props;
    useTheme("Common");
    useTheme("Tabs");
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Tabs$1), mergeProps({ class: "cal-tabs" }, props, { animated: false }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});

script$4.__file = "package/components/tabs/src/Tabs.vue";

const __default__$3 = defineComponent({ name: "CalTextarea" });
var script$3 = defineComponent({
  ...__default__$3,
  props: {
    modelValue: [String, Number]
  },
  setup(__props) {
    const props = __props;
    const ATextarea = Input$1.TextArea;
    const inputValue = useVModel(props, "modelValue");
    useTheme("Common");
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(ATextarea), mergeProps({ class: "cal-textarea" }, props, {
        value: unref(inputValue),
        "onUpdate:value": _cache[1] || (_cache[1] = ($event) => isRef(inputValue) ? inputValue.value = $event : null)
      }), null, 16, ["value"]);
    };
  }
});

script$3.__file = "package/components/textarea/src/Textarea.vue";

const __default__$2 = defineComponent({ name: "CalTree" });
var script$2 = defineComponent({
  ...__default__$2,
  setup(__props) {
    const props = __props;
    useTheme("Common");
    return (_ctx, _cache) => {
      const _component_a_tree = resolveComponent("a-tree");
      return openBlock(), createBlock(_component_a_tree, props, null, 16);
    };
  }
});

script$2.__file = "package/components/tree/src/Tree.vue";

const _withId = /* @__PURE__ */ withScopeId("data-v-08bc8378");
pushScopeId("data-v-08bc8378");
const _hoisted_1 = { class: "cal-upload__box w-1/2 bg-upload-bg-color" };
const _hoisted_2 = { class: "border-dashed border-2 border-primary-light-6" };
const _hoisted_3 = { class: "text-center py-24" };
const _hoisted_4 = { class: "text-primary text-sm" };
const _hoisted_5 = /* @__PURE__ */ createTextVNode("\u9009\u62E9\u6587\u4EF6");
const _hoisted_6 = /* @__PURE__ */ createTextVNode("\u63D0\u4EA4");
const _hoisted_7 = /* @__PURE__ */ createTextVNode("\u4E0B\u8F7DExcel\u6A21\u677F");
popScopeId();
const __default__$1 = defineComponent({ name: "CalUpload" });
var script$1 = defineComponent({
  ...__default__$1,
  emits: ["uploadFile", "downloadTemplate"],
  setup(__props, { emit }) {
    const fileList = ref([]);
    const handleChange = (info) => {
      let newFileList = [...info.fileList];
      newFileList = newFileList.slice(-5);
      newFileList = newFileList.map((file) => {
        if (file.response) {
          file.url = file.response.url;
        }
        return file;
      });
      fileList.value = newFileList;
    };
    const beforeUpload = (file) => {
      return new Promise((resolve, reject) => {
        const testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
        const extension = testmsg == "xlsx" || testmsg == "xls";
        if (!extension) {
          message.error("\u8BF7\u4E0A\u4F20xlsx\u6216\u8005xls\u7684\u683C\u5F0F!");
          return reject(false);
        }
        return resolve(true);
      });
    };
    const submitForm = () => {
      if (fileList.value.length) {
        emit("uploadFile", fileList.value);
      } else {
        message.error("\u8BF7\u5148\u4E0A\u4F20\u6587\u4EF6\uFF01");
      }
    };
    useTheme("upload");
    return (_ctx, _cache) => {
      const _component_cal_button = resolveComponent("cal-button");
      const _component_a_upload = resolveComponent("a-upload");
      const _component_a_button = resolveComponent("a-button");
      return openBlock(), createBlock("div", _hoisted_1, [
        createVNode("div", _hoisted_2, [
          createVNode(_component_a_upload, {
            name: "file",
            "file-list": fileList.value,
            action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
            onChange: handleChange,
            "before-upload": beforeUpload,
            accept: ".xls, .xlsx"
          }, {
            default: _withId(() => [
              createVNode("div", _hoisted_3, [
                createVNode("div", _hoisted_4, [
                  renderSlot(_ctx.$slots, "default")
                ]),
                createVNode(_component_cal_button, {
                  class: "w-112 mt-12",
                  style: { "border-radius": "26px" }
                }, {
                  default: _withId(() => [
                    _hoisted_5
                  ]),
                  _: 1
                })
              ])
            ]),
            _: 3
          }, 8, ["file-list"])
        ]),
        createCommentVNode(' <div class="tips" v-if="show">\u8BF7\u5148\u4E0A\u4F20\u6587\u4EF6\u5728\u63D0\u4EA4</div> '),
        createVNode(_component_cal_button, {
          class: "w-112 mt-24",
          type: "primary",
          onClick: submitForm,
          style: { "border-radius": "26px" }
        }, {
          default: _withId(() => [
            _hoisted_6
          ]),
          _: 1
        }),
        createVNode(_component_a_button, {
          type: "link",
          class: "ml-20",
          onClick: _cache[1] || (_cache[1] = ($event) => emit("downloadTemplate"))
        }, {
          default: _withId(() => [
            _hoisted_7
          ]),
          _: 1
        })
      ]);
    };
  }
});

script$1.__scopeId = "data-v-08bc8378";
script$1.__file = "package/components/upload/src/Upload.vue";

const __default__ = defineComponent({ name: "CalTag" });
var script = defineComponent({
  ...__default__,
  props: {},
  setup(__props) {
    const props = __props;
    useTheme("Common");
    return (_ctx, _cache) => {
      const _component_a_tag = resolveComponent("a-tag");
      return openBlock(), createBlock(_component_a_tag, props, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});

script.__file = "package/components/tag/src/Tag.vue";

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  CalButton: script$J,
  CalGlobalStyle: script$I,
  CalProvide: script$H,
  CalDescriptions: NDescriptions,
  CalDescriptionsItem: NDescriptionsItem,
  CalConfigProvider: script$G,
  CalMenu: script$F,
  CalMenuItem: script$E,
  CalMenuGroup: script$B,
  CalLayout: script$A,
  CalLayoutContent: script$z,
  CalLayoutSider: script$y,
  CalBackground: script$x,
  CalEllipsis: script$w,
  CalSpace: script$v,
  CalGrid: script$u,
  CalInput: script$t,
  CalInputSection: script$s,
  CalInputPassword: script$r,
  CalInputDate: script$q,
  CalInputNumber: script$p,
  CalInputSearch: script$o,
  CalIcon: script$D,
  CalImage: script$n,
  CalCard: script$m,
  CalImageVerif: script$l,
  CalCasCader: script$k,
  CalCheckbox: script$j,
  CalClassification: script$i,
  CalCollapseTransition: script$h,
  CalEmpty: script$g,
  CalPageSelect: script$f,
  CalPagination: script$e,
  CalRadio: script$d,
  CalRadioGroup: script$c,
  CalStep: script$b,
  CalSteps: script$a,
  CalSwitch: script$9,
  CalTable: script$7,
  CalTableOption: script$6,
  CalTabPane: script$5,
  CalTabs: script$4,
  CalTextarea: script$3,
  CalTree: script$2,
  CalUpload: script$1,
  CalTag: script
});

const install = (app) => {
  Object.values(components).forEach((component) => {
    app.component(component.name, component);
  });
  app.use(antd__default);
};
var index = { install };

export default index;
export { script$x as CalBackground, script$J as CalButton, script$m as CalCard, script$k as CalCasCader, script$j as CalCheckbox, script$i as CalClassification, script$h as CalCollapseTransition, script$G as CalConfigProvider, script$w as CalEllipsis, script$g as CalEmpty, script$I as CalGlobalStyle, script$u as CalGrid, script$D as CalIcon, script$n as CalImage, script$l as CalImageVerif, script$t as CalInput, script$q as CalInputDate, script$p as CalInputNumber, script$r as CalInputPassword, script$o as CalInputSearch, script$s as CalInputSection, script$A as CalLayout, script$z as CalLayoutContent, script$y as CalLayoutSider, script$F as CalMenu, script$B as CalMenuGroup, script$E as CalMenuItem, script$f as CalPageSelect, script$e as CalPagination, script$H as CalProvide, script$d as CalRadio, script$c as CalRadioGroup, script$v as CalSpace, script$b as CalStep, script$a as CalSteps, script$9 as CalSwitch, script$5 as CalTabPane, script$7 as CalTable, script$6 as CalTableOption, script$4 as CalTabs, script as CalTag, script$3 as CalTextarea, script$2 as CalTree, script$1 as CalUpload, defaultTheme, install, transformTheme2CssVars, useGlobalTheme, useTheme };
