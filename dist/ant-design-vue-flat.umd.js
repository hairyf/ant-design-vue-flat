(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue'), require('lodash-es'), require('naive-ui'), require('ant-design-vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue', 'lodash-es', 'naive-ui', 'ant-design-vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['ant-design-vue-flat'] = {}, global.Vue, global.lodashEs, global.naiveUi, global.antd));
}(this, (function (exports, vue, lodashEs, naiveUi, antd) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var antd__default = /*#__PURE__*/_interopDefaultLegacy(antd);

  const _withId$c = /*#__PURE__*/vue.withScopeId("data-v-4090dad8");

  const render$G = /*#__PURE__*/_withId$c((_ctx, _cache) => {
    const _component_a_button = vue.resolveComponent("a-button");

    return (vue.openBlock(), vue.createBlock(_component_a_button, vue.mergeProps({ class: "cal-btn bg-com" }, { shape: 'round', ..._ctx.props }), {
      default: _withId$c(() => [
        vue.renderSlot(_ctx.$slots, "default")
      ]),
      _: 3 /* FORWARDED */
    }, 16 /* FULL_PROPS */))
  });

  const script$G = {};

  script$G.render = render$G;
  script$G.__scopeId = "data-v-4090dad8";
  script$G.__file = "package/components/button/src/Button.vue";

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

  const defaultTheme = () => lodashEs.cloneDeep(lodashEs.merge(_colors, _sizes, _basics));
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
          const key = lodashEs.kebabCase(keys.map((v2) => v2[0].toUpperCase() + v2.slice(1)).join("").trim());
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
    const theme = vue.ref(defaultTheme());
    const themeOverrides = vue.inject("themeOverrides");
    const themeMerge = vue.computed(() => lodashEs.merge(theme.value, themeOverrides?.value)[identif]);
    return themeMerge;
  };
  const useGlobalTheme = () => {
    const theme = vue.ref(defaultTheme());
    const themeOverrides = vue.inject("themeOverrides");
    const themeMerge = vue.computed(() => lodashEs.merge(theme.value, themeOverrides?.value));
    return themeMerge;
  };

  var script$F = vue.defineComponent({
    name: "CalGlobalStyle",
    props: {
      root: {
        type: Object,
        default: document.documentElement
      }
    },
    setup: (props) => {
      const root = vue.toRef(props, "root");
      const globalTheme = useGlobalTheme();
      vue.watchEffect(() => {
        const cssVars = transformTheme2CssVars(globalTheme.value);
        for (const key in cssVars) {
          root.value.style.removeProperty(`--${key}`);
          root.value.style.setProperty(`--${key}`, cssVars[key]);
        }
      });
    }
  });

  function render$F(_ctx, _cache) {
    return vue.renderSlot(_ctx.$slots, "default")
  }

  script$F.render = render$F;
  script$F.__file = "package/components/global-style/src/GlobalStyle.vue";

  var script$E = vue.defineComponent({ name: "CalProvide" });

  function render$E(_ctx, _cache) {
    return vue.renderSlot(_ctx.$slots, "default")
  }

  script$E.render = render$E;
  script$E.__file = "package/components/_internal/src/Provide.vue";

  naiveUi.NDescriptions.name = "CalDescriptions";

  naiveUi.NDescriptionsItem.name = "CalDescriptionsItem";

  var script$D = vue.defineComponent({ name: "CalConfigProvider" });

  const _withId$b = /*#__PURE__*/vue.withScopeId("data-v-2c3c6643");

  vue.pushScopeId("data-v-2c3c6643");
  const _hoisted_1$f = { class: "cal-config-provider" };
  vue.popScopeId();

  const render$D = /*#__PURE__*/_withId$b((_ctx, _cache) => {
    const _component_config_provider = vue.resolveComponent("config-provider", true);

    return (vue.openBlock(), vue.createBlock("div", _hoisted_1$f, [
      vue.createVNode(_component_config_provider, _ctx.props, {
        default: _withId$b(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3 /* FORWARDED */
      }, 16 /* FULL_PROPS */)
    ]))
  });

  script$D.render = render$D;
  script$D.__scopeId = "data-v-2c3c6643";
  script$D.__file = "package/components/config-provider/src/ConfigProvider.vue";

  var script$C = vue.defineComponent({ name: "CalMenu" });

  const _hoisted_1$e = { class: "cal-menu transition-all duration-200" };

  function render$C(_ctx, _cache) {
    return (vue.openBlock(), vue.createBlock("ul", _hoisted_1$e, [
      vue.renderSlot(_ctx.$slots, "default")
    ]))
  }

  script$C.render = render$C;
  script$C.__file = "package/components/menu/src/Menu.vue";

  var script$B = vue.defineComponent({ name: "CalMenuItem" });

  const _withId$a = /*#__PURE__*/vue.withScopeId("data-v-9a2e6faa");

  vue.pushScopeId("data-v-9a2e6faa");
  const _hoisted_1$d = { class: "cal-menu-item__prefix" };
  const _hoisted_2$b = {
    key: 0,
    class: "cal-menu-item__content"
  };
  vue.popScopeId();

  const render$B = /*#__PURE__*/_withId$a((_ctx, _cache) => {
    return (vue.openBlock(), vue.createBlock("li", {
      class: ["\r\n      cal-menu-item\r\n      cursor-pointer\r\n      transition-all\r\n      duration-500\r\n      text-center\r\n      flex\r\n      justify-center\r\n      items-center\r\n    ", [_ctx.itemCalss, _ctx.vertical ? 'flex-col' : '', _ctx.collapse ? 'cal-menu-item--collapse' : '']],
      onClick: _cache[1] || (_cache[1] = $event => (!_ctx.notUpdate && _ctx.onUpdate?.(_ctx.index)))
    }, [
      vue.createVNode("span", _hoisted_1$d, [
        vue.renderSlot(_ctx.$slots, "prefix")
      ]),
      vue.createVNode(vue.Transition, {
        "enter-active-class": "animate__bounceIn",
        "leave-active-class": "animate__bounceOut",
        duration: { enter: 400, leave: 100 }
      }, {
        default: _withId$a(() => [
          (!_ctx.collapse)
            ? (vue.openBlock(), vue.createBlock("span", _hoisted_2$b, [
                vue.renderSlot(_ctx.$slots, "default")
              ]))
            : vue.createCommentVNode("v-if", true)
        ]),
        _: 3 /* FORWARDED */
      }),
      vue.renderSlot(_ctx.$slots, "suffix")
    ], 2 /* CLASS */))
  });

  script$B.render = render$B;
  script$B.__scopeId = "data-v-9a2e6faa";
  script$B.__file = "package/components/menu/src/MenuItem.vue";

  var script$A = vue.defineComponent({ name: "CalMenuGroup" });

  const _withId$9 = /*#__PURE__*/vue.withScopeId("data-v-57e914d2");

  vue.pushScopeId("data-v-57e914d2");
  const _hoisted_1$c = { class: "cal-menu-group" };
  const _hoisted_2$a = { class: "cal-menu-group__contents" };
  vue.popScopeId();

  const render$A = /*#__PURE__*/_withId$9((_ctx, _cache) => {
    const _component_cal_icon = vue.resolveComponent("cal-icon");
    const _component_cal_menu_item = vue.resolveComponent("cal-menu-item");
    const _component_cal_provide = vue.resolveComponent("cal-provide");
    const _component_cal_collapse_transition = vue.resolveComponent("cal-collapse-transition");

    return (vue.openBlock(), vue.createBlock("ul", _hoisted_1$c, [
      vue.createVNode(_component_cal_menu_item, {
        index: _ctx.index,
        onClick: _ctx.onShowMenuItems,
        "not-update": ""
      }, {
        prefix: _withId$9(() => [
          vue.renderSlot(_ctx.$slots, "prefix")
        ]),
        suffix: _withId$9(() => [
          vue.createVNode("div", {
            class: ["cal-menu-group__icon transform duration-200 absolute", [_ctx.showMenuItems ? 'rotate-0' : '-rotate-180']]
          }, [
            vue.createVNode(_component_cal_icon, {
              size: "20",
              type: "up-arrow"
            })
          ], 2 /* CLASS */)
        ]),
        default: _withId$9(() => [
          vue.renderSlot(_ctx.$slots, "title")
        ]),
        _: 3 /* FORWARDED */
      }, 8 /* PROPS */, ["index", "onClick"]),
      vue.createVNode(_component_cal_collapse_transition, null, {
        default: _withId$9(() => [
          vue.createVNode(_component_cal_provide, {
            id: "isChildren",
            value: true
          }, {
            default: _withId$9(() => [
              vue.withDirectives(vue.createVNode("ul", _hoisted_2$a, [
                vue.renderSlot(_ctx.$slots, "default")
              ], 512 /* NEED_PATCH */), [
                [vue.vShow, _ctx.showMenuItems]
              ])
            ]),
            _: 3 /* FORWARDED */
          })
        ]),
        _: 1 /* STABLE */
      })
    ]))
  });

  script$A.render = render$A;
  script$A.__scopeId = "data-v-57e914d2";
  script$A.__file = "package/components/menu/src/MenuGroup.vue";

  var script$z = vue.defineComponent({ name: "CalLayout" });

  function render$z(_ctx, _cache) {
    const _component_layout = vue.resolveComponent("layout", true);

    return (vue.openBlock(), vue.createBlock(_component_layout, { class: "cal-layout" }, {
      default: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "default")
      ]),
      _: 3 /* FORWARDED */
    }))
  }

  script$z.render = render$z;
  script$z.__file = "package/components/layout/src/Layout.vue";

  var script$y = vue.defineComponent({ name: "CalLayoutContent" });

  function render$y(_ctx, _cache) {
    const _component_layout_content = vue.resolveComponent("layout-content", true);
    const _directive_bond = vue.resolveDirective("bond");

    return vue.withDirectives((vue.openBlock(), vue.createBlock(_component_layout_content, null, {
      default: vue.withCtx(() => [
        (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(_ctx.$slots, (i, k) => {
          return vue.renderSlot(_ctx.$slots, k, { key: k })
        }), 128 /* KEYED_FRAGMENT */))
      ]),
      _: 3 /* FORWARDED */
    }, 512 /* NEED_PATCH */)), [
      [_directive_bond, _ctx.props]
    ])
  }

  script$y.render = render$y;
  script$y.__file = "package/components/layout/src/LayoutContent.vue";

  var script$x = vue.defineComponent({ name: "CalLayoutSider" });

  function render$x(_ctx, _cache) {
    const _component_layout_sider = vue.resolveComponent("layout-sider", true);

    return (vue.openBlock(), vue.createBlock(_component_layout_sider, vue.mergeProps({ class: "cal-layout-sider bg-layout-sider-color" }, _ctx.props), {
      default: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "default")
      ]),
      _: 3 /* FORWARDED */
    }, 16 /* FULL_PROPS */))
  }

  script$x.render = render$x;
  script$x.__file = "package/components/layout/src/LayoutSider.vue";

  var script$w = vue.defineComponent({ name: "CalBackground" });

  const _withId$8 = /*#__PURE__*/vue.withScopeId("data-v-7fb68958");

  const render$w = /*#__PURE__*/_withId$8((_ctx, _cache) => {
    return (vue.openBlock(), vue.createBlock("div", {
      class: "cal-background absolute left-0 top-0 bottom-0 right-0 overflow-hidden",
      style: { backgroundColor: _ctx.color, filter: _ctx.blur, backgroundImage: _ctx.image, zIndex: _ctx.zIndex }
    }, null, 4 /* STYLE */))
  });

  script$w.render = render$w;
  script$w.__scopeId = "data-v-7fb68958";
  script$w.__file = "package/components/background/src/Background.vue";

  var script$v = vue.defineComponent({ name: "CalEllipsis" });

  function render$v(_ctx, _cache) {
    const _component_n_ellipsis = vue.resolveComponent("n-ellipsis");

    return (vue.openBlock(), vue.createBlock(_component_n_ellipsis, vue.mergeProps({ class: "cal-ellipsis" }, _ctx.props), {
      default: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "default")
      ]),
      _: 3 /* FORWARDED */
    }, 16 /* FULL_PROPS */))
  }

  script$v.render = render$v;
  script$v.__file = "package/components/ellipsis/src/Ellipsis.vue";

  var script$u = vue.defineComponent({ name: "CalSpace" });

  function render$u(_ctx, _cache) {
    const _component_n_space = vue.resolveComponent("n-space");

    return (vue.openBlock(), vue.createBlock(_component_n_space, vue.mergeProps({ class: "cal-space" }, _ctx.props), {
      default: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "default")
      ]),
      _: 3 /* FORWARDED */
    }, 16 /* FULL_PROPS */))
  }

  script$u.render = render$u;
  script$u.__file = "package/components/space/src/Space.vue";

  var script$t = vue.defineComponent({ name: "CalGrid" });

  const _hoisted_1$b = { class: "cal-grid__container" };
  const _hoisted_2$9 = { class: "cal-grid__view" };

  function render$t(_ctx, _cache) {
    return (vue.openBlock(), vue.createBlock("div", _hoisted_1$b, [
      vue.createVNode("div", _hoisted_2$9, [
        vue.renderSlot(_ctx.$slots, "default")
      ])
    ]))
  }

  script$t.render = render$t;
  script$t.__file = "package/components/grid/src/Grid.vue";

  var script$s = vue.defineComponent({ name: "CalInput" });

  const _hoisted_1$a = {
    key: 1,
    class: "flex items-center text-gray-darkmin"
  };
  const _hoisted_2$8 = { key: 0 };

  function render$s(_ctx, _cache) {
    const _component_a_input = vue.resolveComponent("a-input");

    return (vue.openBlock(), vue.createBlock(_component_a_input, vue.mergeProps({ class: "cal-input" }, _ctx.props, {
      value: _ctx.inputValue,
      "onUpdate:value": _cache[1] || (_cache[1] = $event => (_ctx.inputValue = $event)),
      onChange: _ctx.inputChange
    }), {
      suffix: vue.withCtx(() => [
        (_ctx.slots['suffix'])
          ? vue.renderSlot(_ctx.$slots, "suffix", { key: 0 })
          : (_ctx.showCount)
            ? (vue.openBlock(), vue.createBlock("div", _hoisted_1$a, [
                vue.createVNode("span", null, vue.toDisplayString(_ctx.currentFontNumber), 1 /* TEXT */),
                (_ctx.maxLength)
                  ? (vue.openBlock(), vue.createBlock("span", _hoisted_2$8, "/" + vue.toDisplayString(_ctx.maxLength), 1 /* TEXT */))
                  : vue.createCommentVNode("v-if", true)
              ]))
            : vue.createCommentVNode("v-if", true)
      ]),
      default: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "default")
      ]),
      _: 3 /* FORWARDED */
    }, 16 /* FULL_PROPS */, ["value", "onChange"]))
  }

  script$s.render = render$s;
  script$s.__file = "package/components/input/src/Input.vue";

  var script$r = vue.defineComponent({ name: "CalInputSection" });

  const _hoisted_1$9 = /*#__PURE__*/vue.createVNode("div", {
    class: "text-center text-sm text-gray-darkmin my-auto",
    style: {"min-width":"32px"}
  }, "-", -1 /* HOISTED */);

  function render$r(_ctx, _cache) {
    const _component_cal_input = vue.resolveComponent("cal-input");

    return (vue.openBlock(), vue.createBlock("div", {
      class: "flex h-36",
      style: { width: _ctx.analyUnit(_ctx.width) }
    }, [
      vue.createVNode(_component_cal_input, {
        placeholder: _ctx.placeholder,
        modelValue: _ctx.minValue,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (_ctx.minValue = $event))
      }, null, 8 /* PROPS */, ["placeholder", "modelValue"]),
      _hoisted_1$9,
      vue.createVNode(_component_cal_input, {
        placeholder: _ctx.placeholder,
        modelValue: _ctx.maxValue,
        "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => (_ctx.maxValue = $event))
      }, null, 8 /* PROPS */, ["placeholder", "modelValue"])
    ], 4 /* STYLE */))
  }

  script$r.render = render$r;
  script$r.__file = "package/components/input/src/InputSection.vue";

  var script$q = vue.defineComponent({ name: "CalInputPassword" });

  function render$q(_ctx, _cache) {
    const _component_a_input_password = vue.resolveComponent("a-input-password");

    return (vue.openBlock(), vue.createBlock(_component_a_input_password, _ctx.props, null, 16 /* FULL_PROPS */))
  }

  script$q.render = render$q;
  script$q.__file = "package/components/input/src/InputPassword.vue";

  var script$p = vue.defineComponent({ name: "CalInputDate" });

  const _withId$7 = /*#__PURE__*/vue.withScopeId("data-v-6551fc06");

  const render$p = /*#__PURE__*/_withId$7((_ctx, _cache) => {
    const _component_a_date_picker = vue.resolveComponent("a-date-picker");

    return (vue.openBlock(), vue.createBlock(_component_a_date_picker, vue.mergeProps(_ctx.props, {
      placeholder: _ctx.placeholder,
      value: _ctx.inputValue,
      "onUpdate:value": _cache[1] || (_cache[1] = $event => (_ctx.inputValue = $event))
    }), null, 16 /* FULL_PROPS */, ["placeholder", "value"]))
  });

  script$p.render = render$p;
  script$p.__scopeId = "data-v-6551fc06";
  script$p.__file = "package/components/input/src/InputDate.vue";

  var script$o = vue.defineComponent({ name: "CalInputNumber" });

  const _hoisted_1$8 = {
    key: 1,
    class: "flex items-center text-gray-darkmin"
  };
  const _hoisted_2$7 = { key: 0 };

  function render$o(_ctx, _cache) {
    const _component_a_input_number = vue.resolveComponent("a-input-number");

    return (vue.openBlock(), vue.createBlock(_component_a_input_number, vue.mergeProps({
      class: [{ 'cal-input-number-off-handel': !_ctx.showHandel }, "cal-input-number"]
    }, _ctx.props, {
      value: _ctx.inputValue,
      "onUpdate:value": _cache[1] || (_cache[1] = $event => (_ctx.inputValue = $event)),
      precision: _ctx.precision,
      onChange: _ctx.onChange
    }), {
      suffix: vue.withCtx(() => [
        (_ctx.slots['suffix'])
          ? vue.renderSlot(_ctx.$slots, "suffix", { key: 0 })
          : (_ctx.showCount)
            ? (vue.openBlock(), vue.createBlock("div", _hoisted_1$8, [
                vue.createVNode("span", null, vue.toDisplayString(_ctx.currentFontNumber), 1 /* TEXT */),
                (_ctx.maxLength)
                  ? (vue.openBlock(), vue.createBlock("span", _hoisted_2$7, "/" + vue.toDisplayString(_ctx.maxLength), 1 /* TEXT */))
                  : vue.createCommentVNode("v-if", true)
              ]))
            : vue.createCommentVNode("v-if", true)
      ]),
      default: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "default")
      ]),
      _: 3 /* FORWARDED */
    }, 16 /* FULL_PROPS */, ["class", "value", "precision", "onChange"]))
  }

  script$o.render = render$o;
  script$o.__file = "package/components/input/src/InputNumber.vue";

  var script$n = vue.defineComponent({ name: "CalIcon" });

  const _withId$6 = /*#__PURE__*/vue.withScopeId("data-v-677e57b8");

  const render$n = /*#__PURE__*/_withId$6((_ctx, _cache) => {
    return (vue.openBlock(), vue.createBlock("i", {
      class: "cal-icon",
      innerHTML: _ctx.svgTag,
      style: { color: _ctx.color, fontSize: _ctx.analyUnit(_ctx.size || ''), width: _ctx.width, height: _ctx.height }
    }, null, 12 /* STYLE, PROPS */, ["innerHTML"]))
  });

  script$n.render = render$n;
  script$n.__scopeId = "data-v-677e57b8";
  script$n.__file = "package/components/icon/src/Icon.vue";

  var script$m = vue.defineComponent({ name: "CalImage" });

  function render$m(_ctx, _cache) {
    const _component_a_image = vue.resolveComponent("a-image");

    return (vue.openBlock(), vue.createBlock(_component_a_image, vue.mergeProps({ class: "cal-image rounded-lg overflow-hidden object-cover block" }, _ctx.props, {
      fallback: _ctx.fallbackImage,
      preview: false
    }), null, 16 /* FULL_PROPS */, ["fallback"]))
  }

  script$m.render = render$m;
  script$m.__file = "package/components/image/src/Image.vue";

  var script$l = vue.defineComponent({ name: "CalCard" });

  const _withId$5 = /*#__PURE__*/vue.withScopeId("data-v-26c5e198");

  const render$l = /*#__PURE__*/_withId$5((_ctx, _cache) => {
    const _component_a_card = vue.resolveComponent("a-card");

    return (vue.openBlock(), vue.createBlock(_component_a_card, vue.mergeProps({
      class: ["bg-card-bg-color rounded-3xl", [_ctx.isHidden ? 'cal-card ' : 'card-style-none']]
    }, _ctx.props), {
      default: _withId$5(() => [
        vue.renderSlot(_ctx.$slots, "default")
      ]),
      _: 3 /* FORWARDED */
    }, 16 /* FULL_PROPS */, ["class"]))
  });

  script$l.render = render$l;
  script$l.__scopeId = "data-v-26c5e198";
  script$l.__file = "package/components/card/src/Card.vue";

  function wrap(o) {
      return vue.isRef(o) ? o : vue.ref(o); // NOTE in v3 this is not necessary
  }
  const isNumber = (val) => typeof val === "number";
  const NO_OP = () => { };
  const PASSIVE_EV = { passive: true };
  const isClient = typeof window != "undefined";
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
          const removeWatch = vue.watch(element, (n, _, cleanUp) => {
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
      const height = vue.ref(element.value && element.value.clientHeight);
      const width = vue.ref(element.value && element.value.clientWidth);
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
      const remove = isClient
          ? useEvent(window, "resize", handler, eventOptions || PASSIVE_EV)
          : /* istanbul ignore next */ NO_OP;
      if (vue.isRef(el) && !el.value) {
          vue.onMounted(handler);
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

  var script$k = vue.defineComponent({
    name: "CalImageVerif",
    emits: ["success", "fail", "close"],
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
    setup(props, context) {
      const vuePuzzleVcode = vue.ref();
      const rangeSlider = vue.ref();
      const canvas1 = vue.ref(null);
      const canvas2 = vue.ref(null);
      const canvas3 = vue.ref(null);
      const showImageVerif = vue.ref(true);
      const canvasWidth = vue.ref(460);
      vue.onMounted(() => {
        canvasWidth.value = vuePuzzleVcode.value?.clientWidth || 460;
      });
      const canvasHeight = vue.computed(() => canvasWidth.value * props.proportion);
      const puzzleScale = vue.computed(() => canvasWidth.value / 460);
      const onlyDebounce = lodashEs.debounce(() => {
        canvasWidth.value = vuePuzzleVcode.value?.clientWidth || 460;
        reset();
      }, 200);
      const { width, remove } = useOnResize(document.body);
      vue.onUnmounted(() => remove);
      vue.watch(width, onlyDebounce);
      const state = vue.reactive({
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
      vue.onMounted(() => {
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
      vue.onUnmounted(() => {
        clearTimeout(state.timer1);
        document.removeEventListener("mousemove", onRangeMouseMove, false);
        document.removeEventListener("mouseup", onRangeMouseUp, false);
        document.removeEventListener("touchmove", onRangeMouseMove, {
          passive: false
        });
        document.removeEventListener("touchend", onRangeMouseUp, false);
      });
      vue.watch(() => props.show, (newV) => {
        if (newV) {
          document.body.classList.add("vue-puzzle-overflow");
          reset();
        } else {
          document.body.classList.remove("vue-puzzle-overflow");
        }
      });
      const styleWidth = vue.computed(() => {
        const w = state.startWidth + state.newX - state.startX;
        return w < sliderBaseSize.value ? sliderBaseSize.value : w > canvasWidth.value ? canvasWidth.value : w;
      });
      const puzzleBaseSize = vue.computed(() => {
        return Math.round(Math.max(Math.min(puzzleScale.value, 2), 0.2) * 52.5 + 6);
      });
      const sliderBaseSize = vue.computed(() => {
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
      return {
        vuePuzzleVcode,
        rangeSlider,
        canvas1,
        canvas2,
        canvas3,
        styleWidth,
        puzzleBaseSize,
        sliderBaseSize,
        onCloseMouseDown,
        onCloseMouseUp,
        onRangeMouseDown,
        onRangeMouseMove,
        canvasWidth,
        canvasHeight,
        showImageVerif,
        reset,
        ...vue.toRefs(state)
      };
    }
  });

  const _hoisted_1$7 = /*#__PURE__*/vue.createVNode("div", { class: "loading-gif_" }, [
    /*#__PURE__*/vue.createVNode("span"),
    /*#__PURE__*/vue.createVNode("span"),
    /*#__PURE__*/vue.createVNode("span"),
    /*#__PURE__*/vue.createVNode("span"),
    /*#__PURE__*/vue.createVNode("span")
  ], -1 /* HOISTED */);
  const _hoisted_2$6 = { class: "auth-control_" };
  const _hoisted_3$5 = { class: "range-text" };
  const _hoisted_4$4 = /*#__PURE__*/vue.createVNode("div", null, null, -1 /* HOISTED */);
  const _hoisted_5$2 = /*#__PURE__*/vue.createVNode("div", null, null, -1 /* HOISTED */);
  const _hoisted_6$2 = /*#__PURE__*/vue.createVNode("div", null, null, -1 /* HOISTED */);

  function render$k(_ctx, _cache) {
    return (vue.openBlock(), vue.createBlock(vue.Fragment, null, [
      vue.createCommentVNode(" 本体部分 "),
      vue.createVNode("div", {
        ref: "vuePuzzleVcode",
        class: ['vue-puzzle-vcode', { show_: _ctx.show }],
        onMousedown: _cache[5] || (_cache[5] = (...args) => (_ctx.onCloseMouseDown && _ctx.onCloseMouseDown(...args))),
        onMouseup: _cache[6] || (_cache[6] = (...args) => (_ctx.onCloseMouseUp && _ctx.onCloseMouseUp(...args))),
        onTouchstart: _cache[7] || (_cache[7] = (...args) => (_ctx.onCloseMouseDown && _ctx.onCloseMouseDown(...args))),
        onTouchend: _cache[8] || (_cache[8] = (...args) => (_ctx.onCloseMouseUp && _ctx.onCloseMouseUp(...args)))
      }, [
        vue.createVNode("div", {
          class: "vue-auth-box_",
          onMousedown: _cache[3] || (_cache[3] = vue.withModifiers(() => {}, ["stop"])),
          onTouchstart: _cache[4] || (_cache[4] = vue.withModifiers(() => {}, ["stop"]))
        }, [
          vue.createVNode("div", {
            class: "auth-body_",
            style: `height: ${_ctx.canvasHeight}px`
          }, [
            vue.createCommentVNode(" 主图，有缺口 "),
            vue.createVNode("canvas", {
              ref: "canvas1",
              width: _ctx.canvasWidth,
              height: _ctx.canvasHeight,
              style: {
              width: `${_ctx.canvasWidth}px`,
              height: `${_ctx.canvasHeight}px`
            }
            }, null, 12 /* STYLE, PROPS */, ["width", "height"]),
            vue.createCommentVNode(" 成功后显示的完整图 "),
            vue.createVNode("canvas", {
              ref: "canvas3",
              class: ['auth-canvas3_', { show: _ctx.isSuccess }],
              width: _ctx.canvasWidth,
              height: _ctx.canvasHeight,
              style: `width:${_ctx.canvasWidth}px;height:${_ctx.canvasHeight}px`
            }, null, 14 /* CLASS, STYLE, PROPS */, ["width", "height"]),
            vue.createCommentVNode(" 小图 "),
            vue.createVNode("canvas", {
              width: _ctx.puzzleBaseSize,
              class: "auth-canvas2_",
              height: _ctx.canvasHeight,
              ref: "canvas2",
              style: `width:${_ctx.puzzleBaseSize}px;height:${_ctx.canvasHeight}px;transform:translateX(${
            _ctx.styleWidth -
            _ctx.sliderBaseSize -
            (_ctx.puzzleBaseSize - _ctx.sliderBaseSize) *
              ((_ctx.styleWidth - _ctx.sliderBaseSize) / (_ctx.canvasWidth - _ctx.sliderBaseSize))
          }px)`
            }, null, 12 /* STYLE, PROPS */, ["width", "height"]),
            vue.createVNode("div", {
              class: ['loading-box_', { hide_: !_ctx.loading }]
            }, [
              _hoisted_1$7
            ], 2 /* CLASS */),
            vue.createVNode("div", {
              class: ['info-box_', { show: _ctx.infoBoxShow }, { fail: _ctx.infoBoxFail }]
            }, vue.toDisplayString(_ctx.infoText), 3 /* TEXT, CLASS */),
            vue.createVNode("div", {
              class: ['flash_', { show: _ctx.isSuccess }],
              style: `transform: translateX(${
            _ctx.isSuccess ? `${_ctx.canvasWidth + _ctx.canvasHeight * 0.578}px` : `-${_ctx.canvasHeight * 0.578}px`
          }) skew(-30deg, 0);`
            }, null, 6 /* CLASS, STYLE */)
          ], 4 /* STYLE */),
          vue.createVNode("div", _hoisted_2$6, [
            vue.createVNode("div", {
              class: "range-box",
              style: `height:${_ctx.sliderBaseSize}px`
            }, [
              vue.createVNode("div", _hoisted_3$5, vue.toDisplayString(_ctx.sliderText), 1 /* TEXT */),
              vue.createVNode("div", {
                class: "range-slider",
                ref: "rangeSlider",
                style: `width:${_ctx.styleWidth * 0.94}px`
              }, [
                vue.createVNode("div", {
                  class: ['range-btn', { isDown: _ctx.mouseDown }],
                  style: `width:${_ctx.sliderBaseSize}px`,
                  onMousedown: _cache[1] || (_cache[1] = $event => (_ctx.onRangeMouseDown($event))),
                  onTouchstart: _cache[2] || (_cache[2] = $event => (_ctx.onRangeMouseDown($event)))
                }, [
                  _hoisted_4$4,
                  _hoisted_5$2,
                  _hoisted_6$2
                ], 38 /* CLASS, STYLE, HYDRATE_EVENTS */)
              ], 4 /* STYLE */)
            ], 4 /* STYLE */)
          ])
        ], 32 /* HYDRATE_EVENTS */)
      ], 34 /* CLASS, HYDRATE_EVENTS */)
    ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
  }

  script$k.render = render$k;
  script$k.__file = "package/components/image-verif/src/ImageVerif.vue";

  var script$j = vue.defineComponent({ name: "CalCasCader" });

  function render$j(_ctx, _cache) {
    const _component_a_cascader = vue.resolveComponent("a-cascader");

    return (vue.openBlock(), vue.createBlock(_component_a_cascader, vue.mergeProps({ class: "cal-cascader" }, _ctx.props), null, 16 /* FULL_PROPS */))
  }

  script$j.render = render$j;
  script$j.__file = "package/components/cascader/src/CasCader.vue";

  var script$i = vue.defineComponent({ name: "CalCheckbox" });

  function render$i(_ctx, _cache) {
    const _component_a_checkbox = vue.resolveComponent("a-checkbox");

    return (vue.openBlock(), vue.createBlock(_component_a_checkbox, _ctx.props, {
      default: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "default")
      ]),
      _: 3 /* FORWARDED */
    }, 16 /* FULL_PROPS */))
  }

  script$i.render = render$i;
  script$i.__file = "package/components/checkbox/src/Checkbox.vue";

  var script$h = vue.defineComponent({ name: "CalClassification" });

  const _hoisted_1$6 = { class: "cal-class__container" };
  const _hoisted_2$5 = { class: "cal-class__item flex items-center mb-20" };
  const _hoisted_3$4 = { class: "cal-class__label w-64 mr-10 text-center select-none" };
  const _hoisted_4$3 = { class: "cal-class__options" };

  function render$h(_ctx, _cache) {
    const _component_cal_button = vue.resolveComponent("cal-button");
    const _component_index = vue.resolveComponent("index");

    return (vue.openBlock(), vue.createBlock("div", _hoisted_1$6, [
      vue.createVNode("div", _hoisted_2$5, [
        vue.createVNode("div", _hoisted_3$4, vue.toDisplayString(_ctx.option?.[_ctx.fieldNames['label']]), 1 /* TEXT */),
        vue.createVNode("div", _hoisted_4$3, [
          (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(_ctx.option?.[_ctx.fieldNames['children']], (item, index) => {
            return (vue.openBlock(), vue.createBlock(_component_cal_button, {
              type: "primary",
              class: ["mx-12", [!item.state && 'text-grey-darkmin border-none bg-white-darkmin']],
              key: index,
              onClick: $event => (_ctx.onClickItem(item))
            }, {
              default: vue.withCtx(() => [
                vue.createTextVNode(vue.toDisplayString(item[_ctx.fieldNames['label']]), 1 /* TEXT */)
              ]),
              _: 2 /* DYNAMIC */
            }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["onClick", "class"]))
          }), 128 /* KEYED_FRAGMENT */))
        ])
      ]),
      (_ctx.currentChildren?.[_ctx.fieldNames['children']]?.length)
        ? (vue.openBlock(), vue.createBlock(_component_index, {
            key: 0,
            "nested-index": _ctx.nestedIndex + 1,
            option: _ctx.currentChildren,
            loadData: _ctx.loadData,
            fieldNames: _ctx.fieldNames,
            onChange: _cache[1] || (_cache[1] = $event => (_ctx.emit('change', $event)))
          }, null, 8 /* PROPS */, ["nested-index", "option", "loadData", "fieldNames"]))
        : vue.createCommentVNode("v-if", true)
    ]))
  }

  script$h.render = render$h;
  script$h.__file = "package/components/classification/src/Classification.vue";

  var script$g = vue.defineComponent({
    name: "CalCollapseTransition",
    setup() {
      return {
        on: {
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
        }
      };
    }
  });

  function render$g(_ctx, _cache) {
    return (vue.openBlock(), vue.createBlock(vue.Transition, vue.toHandlers(_ctx.on), {
      default: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "default")
      ]),
      _: 3 /* FORWARDED */
    }, 16 /* FULL_PROPS */))
  }

  script$g.render = render$g;
  script$g.__file = "package/components/collapseTransition/src/CollapseTransition.vue";

  var script$f = vue.defineComponent({ name: "CalEmpty" });

  function render$f(_ctx, _cache) {
    const _component_a_empty = vue.resolveComponent("a-empty");

    return (vue.openBlock(), vue.createBlock(_component_a_empty, _ctx.props, null, 16 /* FULL_PROPS */))
  }

  script$f.render = render$f;
  script$f.__file = "package/components/empty/src/Empty.vue";

  var script$e = vue.defineComponent({ name: "CalPageSelect" });

  const _hoisted_1$5 = /*#__PURE__*/vue.createTextVNode("5条/页");
  const _hoisted_2$4 = /*#__PURE__*/vue.createTextVNode("10条/页");
  const _hoisted_3$3 = /*#__PURE__*/vue.createTextVNode("15条/页");
  const _hoisted_4$2 = /*#__PURE__*/vue.createTextVNode("30条/页");
  const _hoisted_5$1 = /*#__PURE__*/vue.createTextVNode("50条/页");
  const _hoisted_6$1 = /*#__PURE__*/vue.createTextVNode("100条/页");

  function render$e(_ctx, _cache) {
    const _component_a_select_option = vue.resolveComponent("a-select-option");
    const _component_a_select = vue.resolveComponent("a-select");

    return (vue.openBlock(), vue.createBlock(_component_a_select, vue.mergeProps({
      class: "cal-page-select",
      value: _ctx.inputValue,
      "onUpdate:value": _cache[1] || (_cache[1] = $event => (_ctx.inputValue = $event)),
      dropdownClassName: "cal-page-select-option "
    }, _ctx.props, {
      style: { width: _ctx.analyUnit(_ctx.width) }
    }), {
      default: vue.withCtx(() => [
        vue.createVNode(_component_a_select_option, { value: 5 }, {
          default: vue.withCtx(() => [
            _hoisted_1$5
          ]),
          _: 1 /* STABLE */
        }),
        vue.createVNode(_component_a_select_option, { value: 10 }, {
          default: vue.withCtx(() => [
            _hoisted_2$4
          ]),
          _: 1 /* STABLE */
        }),
        vue.createVNode(_component_a_select_option, { value: 15 }, {
          default: vue.withCtx(() => [
            _hoisted_3$3
          ]),
          _: 1 /* STABLE */
        }),
        vue.createVNode(_component_a_select_option, { value: 30 }, {
          default: vue.withCtx(() => [
            _hoisted_4$2
          ]),
          _: 1 /* STABLE */
        }),
        vue.createVNode(_component_a_select_option, { value: 50 }, {
          default: vue.withCtx(() => [
            _hoisted_5$1
          ]),
          _: 1 /* STABLE */
        }),
        vue.createVNode(_component_a_select_option, { value: 100 }, {
          default: vue.withCtx(() => [
            _hoisted_6$1
          ]),
          _: 1 /* STABLE */
        })
      ]),
      _: 1 /* STABLE */
    }, 16 /* FULL_PROPS */, ["value", "style"]))
  }

  script$e.render = render$e;
  script$e.__file = "package/components/page-select/src/PageSelect.vue";

  var script$d = vue.defineComponent({ name: "CalPagination" });

  function render$d(_ctx, _cache) {
    const _component_a_pagination = vue.resolveComponent("a-pagination");

    return (vue.openBlock(), vue.createBlock(_component_a_pagination, vue.mergeProps({ class: "cal-pagination" }, _ctx.props, {
      current: _ctx.modelValue,
      "onUpdate:current": _cache[1] || (_cache[1] = $event => (_ctx.modelValue = $event))
    }), null, 16 /* FULL_PROPS */, ["current"]))
  }

  script$d.render = render$d;
  script$d.__file = "package/components/pagination/src/Pagination.vue";

  var script$c = vue.defineComponent({ name: "CalRadio" });

  const _withId$4 = /*#__PURE__*/vue.withScopeId("data-v-6927cd5a");

  const render$c = /*#__PURE__*/_withId$4((_ctx, _cache) => {
    const _component_a_radio = vue.resolveComponent("a-radio");

    return (vue.openBlock(), vue.createBlock(_component_a_radio, vue.mergeProps({ class: "cal-radio" }, _ctx.props), {
      default: _withId$4(() => [
        vue.renderSlot(_ctx.$slots, "default")
      ]),
      _: 3 /* FORWARDED */
    }, 16 /* FULL_PROPS */))
  });

  script$c.render = render$c;
  script$c.__scopeId = "data-v-6927cd5a";
  script$c.__file = "package/components/radio/src/Radio.vue";

  var script$b = vue.defineComponent({ name: "CalRadioGroup" });

  function render$b(_ctx, _cache) {
    const _component_a_radio_group = vue.resolveComponent("a-radio-group");

    return (vue.openBlock(), vue.createBlock(_component_a_radio_group, {
      class: "cal-radio-group",
      value: _ctx.value,
      "onUpdate:value": _cache[1] || (_cache[1] = $event => (_ctx.value = $event))
    }, {
      default: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "default")
      ]),
      _: 3 /* FORWARDED */
    }, 8 /* PROPS */, ["value"]))
  }

  script$b.render = render$b;
  script$b.__file = "package/components/radio/src/RadioGroup.vue";

  var script$a = vue.defineComponent({ name: "CalStep" });

  const _hoisted_1$4 = /*#__PURE__*/vue.createVNode("i", { class: "nr-after text-4xl" }, null, -1 /* HOISTED */);
  const _hoisted_2$3 = /*#__PURE__*/vue.createVNode("i", {
    class: "nr-step-await text-common-primary-color-light-4",
    style: {"font-size":"40px"}
  }, null, -1 /* HOISTED */);

  function render$a(_ctx, _cache) {
    const _component_a_step = vue.resolveComponent("a-step");

    return (vue.openBlock(), vue.createBlock(_component_a_step, vue.mergeProps({ class: "cal-step" }, _ctx.props), {
      icon: vue.withCtx(() => [
        _hoisted_1$4,
        _hoisted_2$3
      ]),
      description: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "description")
      ]),
      default: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "default")
      ]),
      _: 3 /* FORWARDED */
    }, 16 /* FULL_PROPS */))
  }

  script$a.render = render$a;
  script$a.__file = "package/components/step/src/Step.vue";

  var script$9 = vue.defineComponent({ name: "CalSteps" });

  const _withId$3 = /*#__PURE__*/vue.withScopeId("data-v-1c02af0b");

  const render$9 = /*#__PURE__*/_withId$3((_ctx, _cache) => {
    const _component_a_steps = vue.resolveComponent("a-steps");

    return (vue.openBlock(), vue.createBlock(_component_a_steps, vue.mergeProps({ class: "cal-steps" }, _ctx.props), {
      default: _withId$3(() => [
        vue.renderSlot(_ctx.$slots, "default")
      ]),
      _: 3 /* FORWARDED */
    }, 16 /* FULL_PROPS */))
  });

  script$9.render = render$9;
  script$9.__scopeId = "data-v-1c02af0b";
  script$9.__file = "package/components/step/src/Steps.vue";

  var script$8 = vue.defineComponent({ name: "CalSwitch" });

  function render$8(_ctx, _cache) {
    const _component_a_switch = vue.resolveComponent("a-switch");

    return (vue.openBlock(), vue.createBlock(_component_a_switch, vue.mergeProps(_ctx.props, {
      checked: _ctx.switchValue,
      "onUpdate:checked": _cache[1] || (_cache[1] = $event => (_ctx.switchValue = $event)),
      onChange: _cache[2] || (_cache[2] = $event => (_ctx.emit('change', $event ? _ctx.activeValue : _ctx.closeValue)))
    }), null, 16 /* FULL_PROPS */, ["checked"]))
  }

  script$8.render = render$8;
  script$8.__file = "package/components/switch/src/Switch.vue";

  var script$7 = vue.defineComponent({ name: "CalTable" });

  const _withId$2 = /*#__PURE__*/vue.withScopeId("data-v-489a4e40");

  vue.pushScopeId("data-v-489a4e40");
  const _hoisted_1$3 = { class: "table-container" };
  const _hoisted_2$2 = /*#__PURE__*/vue.createVNode("div", { class: "w-4" }, null, -1 /* HOISTED */);
  const _hoisted_3$2 = {
    key: 0,
    class: "px-20 flex items-center"
  };
  vue.popScopeId();

  const render$7 = /*#__PURE__*/_withId$2((_ctx, _cache) => {
    const _component_cal_checkbox = vue.resolveComponent("cal-checkbox");
    const _component_table_provide = vue.resolveComponent("table-provide");
    const _component_cal_empty = vue.resolveComponent("cal-empty");

    return (vue.openBlock(), vue.createBlock("div", _hoisted_1$3, [
      (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(_ctx.fictitiousList, (item, index) => {
        return (vue.openBlock(), vue.createBlock("div", {
          class: "table-view_title flex py-24 overflow-auto",
          style: { marginBottom: _ctx.analyUnit(_ctx.marginBottom) },
          key: item.CACHE_ID_TABLE
        }, [
          _hoisted_2$2,
          (_ctx.select)
            ? (vue.openBlock(), vue.createBlock("div", _hoisted_3$2, [
                vue.createVNode(_component_cal_checkbox, {
                  onChange: $event => (_ctx.onCheckboxChange(item, $event))
                }, null, 8 /* PROPS */, ["onChange"])
              ]))
            : vue.createCommentVNode("v-if", true),
          vue.createVNode("div", {
            class: "flex flex-1",
            style: { minWidth: _ctx.minWidth }
          }, [
            vue.createVNode(_component_table_provide, {
              item: item.CACHE_OLD_ITEM_TABLE,
              index: index
            }, {
              default: _withId$2(() => [
                vue.renderSlot(_ctx.$slots, "default")
              ]),
              _: 2 /* DYNAMIC */
            }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["item", "index"])
          ], 4 /* STYLE */)
        ], 4 /* STYLE */))
      }), 128 /* KEYED_FRAGMENT */)),
      (!_ctx.fictitiousList.length)
        ? (vue.openBlock(), vue.createBlock(_component_cal_empty, {
            key: 0,
            class: "mt-160",
            image: "@/assets/img/common/empty.png"
          }))
        : vue.createCommentVNode("v-if", true)
    ]))
  });

  script$7.render = render$7;
  script$7.__scopeId = "data-v-489a4e40";
  script$7.__file = "package/components/table/src/Table.vue";

  var script$6 = vue.defineComponent({ name: "CalTableOption" });

  const _withId$1 = /*#__PURE__*/vue.withScopeId("data-v-7fda1255");

  vue.pushScopeId("data-v-7fda1255");
  const _hoisted_1$2 = { key: 0 };
  vue.popScopeId();

  const render$6 = /*#__PURE__*/_withId$1((_ctx, _cache) => {
    const _component_cal_theme_icon = vue.resolveComponent("cal-theme-icon");

    return (_ctx.type !== 'list')
      ? (vue.openBlock(), vue.createBlock("div", {
          key: 0,
          class: "table-option-container",
          style: {
        maxWidth: _ctx.option?.syncSpace
          ? `calc(${_ctx.analyUnit(_ctx.maxWidth || '')} + (${_ctx.analyUnit(_ctx.option.space)} * 2))`
          : _ctx.analyUnit(_ctx.maxWidth || ''),
        minWidth: _ctx.option?.syncSpace
          ? `calc(${_ctx.analyUnit(_ctx.minWidth || '')} + (${_ctx.analyUnit(_ctx.option.space)} * 2))`
          : _ctx.analyUnit(_ctx.minWidth || ''),
        flex: 1,
        paddingLeft: _ctx.analyUnit(_ctx.option.space),
        paddingRight: _ctx.analyUnit(_ctx.option.space),
        borderLeft: _ctx.props.borderLeft ? 'solid 1px #F5F5F5' : 'none',
        borderRight: _ctx.props.borderRight ? 'solid 1px #F5F5F5' : 'none'
      }
        }, [
          vue.createVNode("div", {
            class: ["w-full text-gray-darkmin cursor-pointer select-none mb-24", [_ctx.option.textAlign === 'left' ? 'text-left' : 'text-center']]
          }, [
            (!_ctx.sort)
              ? (vue.openBlock(), vue.createBlock("span", _hoisted_1$2, vue.toDisplayString(_ctx.title), 1 /* TEXT */))
              : (vue.openBlock(), vue.createBlock(_component_cal_theme_icon, {
                  key: 1,
                  type: "sortArrow",
                  modelValue: _ctx.sortState,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (_ctx.sortState = $event))
                }, {
                  default: _withId$1(() => [
                    vue.createVNode("span", null, vue.toDisplayString(_ctx.title), 1 /* TEXT */)
                  ]),
                  _: 1 /* STABLE */
                }, 8 /* PROPS */, ["modelValue"]))
          ], 2 /* CLASS */),
          vue.createVNode("div", {
            class: "flex flex-1 flex-col w-full justify-center list-border",
            ":class": [_ctx.option.contentAlign === "left" ? "":"items-center"]
          }, [
            (_ctx.listObject)
              ? (vue.openBlock(true), vue.createBlock(vue.Fragment, { key: 0 }, vue.renderList(_ctx.listObject, (item, i) => {
                  return (vue.openBlock(), vue.createBlock("div", {
                    class: "item-border",
                    key: i.toString()
                  }, [
                    (_ctx.slots['default'])
                      ? vue.renderSlot(_ctx.$slots, "default", {
                          key: 0,
                          content: item[_ctx.props.index || _ctx.props.title || ''],
                          item: item,
                          index: i,
                          list: _ctx.listObject
                        })
                      : (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 1 }, [
                          vue.createTextVNode(vue.toDisplayString(item[_ctx.props.index || _ctx.props.title || '']), 1 /* TEXT */)
                        ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
                  ]))
                }), 128 /* KEYED_FRAGMENT */))
              : (_ctx.slots['default'])
                ? vue.renderSlot(_ctx.$slots, "default", {
                    key: 1,
                    content: _ctx.showContent,
                    item: _ctx.item,
                    index: _ctx.index,
                    list: _ctx.option.list
                  })
                : (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 2 }, [
                    vue.createTextVNode(vue.toDisplayString(_ctx.showContent), 1 /* TEXT */)
                  ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
          ], 8 /* PROPS */, [":class"])
        ], 4 /* STYLE */))
      : (_ctx.slots['default'])
        ? (vue.openBlock(), vue.createBlock("div", {
            key: 1,
            class: "flex border-style-release",
            style: {
        maxWidth: _ctx.option?.syncSpace
          ? `calc(${_ctx.analyUnit(_ctx.maxWidth || '')} + (${_ctx.analyUnit(_ctx.option.space)} * 2))`
          : _ctx.analyUnit(_ctx.maxWidth || ''),
        minWidth: _ctx.option?.syncSpace
          ? `calc(${_ctx.analyUnit(_ctx.minWidth || '')} + (${_ctx.analyUnit(_ctx.option.space)} * 2))`
          : _ctx.analyUnit(_ctx.minWidth || ''),
        flex: 1,
        paddingLeft: _ctx.analyUnit(_ctx.option.space),
        paddingRight: _ctx.analyUnit(_ctx.option.space),
        borderLeft: _ctx.props.borderLeft ? 'solid 1px #F5F5F5' : 'none',
        borderRight: _ctx.props.borderRight ? 'solid 1px #F5F5F5' : 'none'
      }
          }, [
            vue.renderSlot(_ctx.$slots, "default", {
              content: _ctx.showContent,
              item: _ctx.item,
              index: _ctx.index,
              list: _ctx.option.list
            })
          ], 4 /* STYLE */))
        : (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 2 }, [
            vue.createTextVNode(vue.toDisplayString(_ctx.showContent), 1 /* TEXT */)
          ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
  });

  script$6.render = render$6;
  script$6.__scopeId = "data-v-7fda1255";
  script$6.__file = "package/components/table/src/TableOption.vue";

  var script$5 = vue.defineComponent({ name: "CalTabPane" });

  const _hoisted_1$1 = { class: "cal-tab-pane__content flex-1" };
  const _hoisted_2$1 = { class: "cal-tab-pane__sticky" };
  const _hoisted_3$1 = { class: "cal-tab-pane__content flex-1" };
  const _hoisted_4$1 = { class: "cal-tab-pane__sticky" };

  function render$5(_ctx, _cache) {
    const _component_a_tab_pane = vue.resolveComponent("a-tab-pane");

    return (_ctx.alone)
      ? (vue.openBlock(), vue.createBlock("div", {
          key: 0,
          class: "cal-tab-pane bg-tabs-background-color p-24 flex flex-col",
          style: { minHeight: _ctx.analyUnit(_ctx.minHeight || '') }
        }, [
          vue.createVNode("div", _hoisted_1$1, [
            vue.renderSlot(_ctx.$slots, "default")
          ]),
          vue.createVNode("div", _hoisted_2$1, [
            vue.renderSlot(_ctx.$slots, "sticky")
          ])
        ], 4 /* STYLE */))
      : (!_ctx.hide)
        ? (vue.openBlock(), vue.createBlock(_component_a_tab_pane, vue.mergeProps({
            key: 1,
            class: "cal-tab-pane bg-tabs-background-color p-24 flex flex-col",
            style: { minHeight: _ctx.analyUnit(_ctx.minHeight || '') }
          }, _ctx.props), {
            tab: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "tab")
            ]),
            default: vue.withCtx(() => [
              vue.createVNode("div", _hoisted_3$1, [
                vue.renderSlot(_ctx.$slots, "default")
              ]),
              vue.createVNode("div", _hoisted_4$1, [
                vue.renderSlot(_ctx.$slots, "sticky")
              ])
            ]),
            _: 3 /* FORWARDED */
          }, 16 /* FULL_PROPS */, ["style"]))
        : vue.createCommentVNode("v-if", true)
  }

  script$5.render = render$5;
  script$5.__file = "package/components/tabs/src/TabPane.vue";

  var script$4 = vue.defineComponent({ name: "CalTabs" });

  function render$4(_ctx, _cache) {
    const _component_a_tabs = vue.resolveComponent("a-tabs");

    return (vue.openBlock(), vue.createBlock(_component_a_tabs, vue.mergeProps({ class: "cal-tabs" }, _ctx.props, { animated: false }), {
      default: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "default")
      ]),
      _: 3 /* FORWARDED */
    }, 16 /* FULL_PROPS */))
  }

  script$4.render = render$4;
  script$4.__file = "package/components/tabs/src/Tabs.vue";

  var script$3 = vue.defineComponent({ name: "CalTextarea" });

  function render$3(_ctx, _cache) {
    const _component_a_textarea = vue.resolveComponent("a-textarea");

    return (vue.openBlock(), vue.createBlock(_component_a_textarea, vue.mergeProps({ class: "cal-textarea" }, _ctx.props, {
      value: _ctx.inputValue,
      "onUpdate:value": _cache[1] || (_cache[1] = $event => (_ctx.inputValue = $event))
    }), null, 16 /* FULL_PROPS */, ["value"]))
  }

  script$3.render = render$3;
  script$3.__file = "package/components/textarea/src/Textarea.vue";

  var script$2 = vue.defineComponent({ name: "CalThemeIcon" });

  function render$2(_ctx, _cache) {
    return (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.component), null, {
      default: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "default")
      ]),
      _: 3 /* FORWARDED */
    }))
  }

  script$2.render = render$2;
  script$2.__file = "package/components/themeIcon/src/index.vue";

  var script$1 = vue.defineComponent({ name: "CalTree" });

  function render$1(_ctx, _cache) {
    const _component_a_tree = vue.resolveComponent("a-tree");

    return (vue.openBlock(), vue.createBlock(_component_a_tree, _ctx.props, null, 16 /* FULL_PROPS */))
  }

  script$1.render = render$1;
  script$1.__file = "package/components/tree/src/Tree.vue";

  var script = vue.defineComponent({ name: "CalUpload" });

  const _withId = /*#__PURE__*/vue.withScopeId("data-v-08bc8378");

  vue.pushScopeId("data-v-08bc8378");
  const _hoisted_1 = { class: "cal-upload__box w-1/2 bg-upload-bg-color" };
  const _hoisted_2 = { class: "border-dashed border-2 border-primary-light-6" };
  const _hoisted_3 = { class: "text-center py-24" };
  const _hoisted_4 = { class: "text-primary text-sm" };
  const _hoisted_5 = /*#__PURE__*/vue.createTextVNode("选择文件");
  const _hoisted_6 = /*#__PURE__*/vue.createTextVNode("提交");
  const _hoisted_7 = /*#__PURE__*/vue.createTextVNode("下载Excel模板");
  vue.popScopeId();

  const render = /*#__PURE__*/_withId((_ctx, _cache) => {
    const _component_cal_button = vue.resolveComponent("cal-button");
    const _component_a_upload = vue.resolveComponent("a-upload");
    const _component_a_button = vue.resolveComponent("a-button");

    return (vue.openBlock(), vue.createBlock("div", _hoisted_1, [
      vue.createVNode("div", _hoisted_2, [
        vue.createVNode(_component_a_upload, {
          name: "file",
          "file-list": _ctx.fileList,
          action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
          onChange: _ctx.handleChange,
          "before-upload": _ctx.beforeUpload,
          accept: ".xls, .xlsx"
        }, {
          default: _withId(() => [
            vue.createVNode("div", _hoisted_3, [
              vue.createVNode("div", _hoisted_4, [
                vue.renderSlot(_ctx.$slots, "default")
              ]),
              vue.createVNode(_component_cal_button, {
                class: "w-112 mt-12",
                style: {"border-radius":"26px"}
              }, {
                default: _withId(() => [
                  _hoisted_5
                ]),
                _: 1 /* STABLE */
              })
            ])
          ]),
          _: 3 /* FORWARDED */
        }, 8 /* PROPS */, ["file-list", "onChange", "before-upload"])
      ]),
      vue.createCommentVNode(" <div class=\"tips\" v-if=\"show\">请先上传文件在提交</div> "),
      vue.createVNode(_component_cal_button, {
        class: "w-112 mt-24",
        type: "primary",
        onClick: _ctx.submitForm,
        style: {"border-radius":"26px"}
      }, {
        default: _withId(() => [
          _hoisted_6
        ]),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["onClick"]),
      vue.createVNode(_component_a_button, {
        type: "link",
        class: "ml-20",
        onClick: _cache[1] || (_cache[1] = $event => (_ctx.emit('downloadTemplate')))
      }, {
        default: _withId(() => [
          _hoisted_7
        ]),
        _: 1 /* STABLE */
      })
    ]))
  });

  script.render = render;
  script.__scopeId = "data-v-08bc8378";
  script.__file = "package/components/upload/src/Upload.vue";

  var components = /*#__PURE__*/Object.freeze({
    __proto__: null,
    CalButton: script$G,
    CalGlobalStyle: script$F,
    CalProvide: script$E,
    CalDescriptions: naiveUi.NDescriptions,
    CalDescriptionsItem: naiveUi.NDescriptionsItem,
    CalConfigProvider: script$D,
    CalMenu: script$C,
    CalMenuItem: script$B,
    CalMenuGroup: script$A,
    CalLayout: script$z,
    CalLayoutContent: script$y,
    CalLayoutSider: script$x,
    CalBackground: script$w,
    CalEllipsis: script$v,
    CalSpace: script$u,
    CalGrid: script$t,
    CalInput: script$s,
    CalInputSection: script$r,
    CalInputPassword: script$q,
    CalInputDate: script$p,
    CalInputNumber: script$o,
    CalIcon: script$n,
    CalImage: script$m,
    CalCard: script$l,
    CalImageVerif: script$k,
    CalCasCader: script$j,
    CalCheckbox: script$i,
    CalClassification: script$h,
    CalCollapseTransition: script$g,
    CalEmpty: script$f,
    CalPageSelect: script$e,
    CalPagination: script$d,
    CalRadio: script$c,
    CalRadioGroup: script$b,
    CalStep: script$a,
    CalSteps: script$9,
    CalSwitch: script$8,
    CalTable: script$7,
    CalTableOption: script$6,
    CalTabPane: script$5,
    CalTabs: script$4,
    CalTextarea: script$3,
    CalThemeIcon: script$2,
    CalTree: script$1,
    CalUpload: script
  });

  const install = (app) => {
    Object.values(components).forEach((component) => {
      app.component(component.name, component);
    });
    app.use(antd__default['default']);
  };
  var index = { install };

  Object.defineProperty(exports, 'CalDescriptions', {
    enumerable: true,
    get: function () {
      return naiveUi.NDescriptions;
    }
  });
  Object.defineProperty(exports, 'CalDescriptionsItem', {
    enumerable: true,
    get: function () {
      return naiveUi.NDescriptionsItem;
    }
  });
  exports.CalBackground = script$w;
  exports.CalButton = script$G;
  exports.CalCard = script$l;
  exports.CalCasCader = script$j;
  exports.CalCheckbox = script$i;
  exports.CalClassification = script$h;
  exports.CalCollapseTransition = script$g;
  exports.CalConfigProvider = script$D;
  exports.CalEllipsis = script$v;
  exports.CalEmpty = script$f;
  exports.CalGlobalStyle = script$F;
  exports.CalGrid = script$t;
  exports.CalIcon = script$n;
  exports.CalImage = script$m;
  exports.CalImageVerif = script$k;
  exports.CalInput = script$s;
  exports.CalInputDate = script$p;
  exports.CalInputNumber = script$o;
  exports.CalInputPassword = script$q;
  exports.CalInputSection = script$r;
  exports.CalLayout = script$z;
  exports.CalLayoutContent = script$y;
  exports.CalLayoutSider = script$x;
  exports.CalMenu = script$C;
  exports.CalMenuGroup = script$A;
  exports.CalMenuItem = script$B;
  exports.CalPageSelect = script$e;
  exports.CalPagination = script$d;
  exports.CalProvide = script$E;
  exports.CalRadio = script$c;
  exports.CalRadioGroup = script$b;
  exports.CalSpace = script$u;
  exports.CalStep = script$a;
  exports.CalSteps = script$9;
  exports.CalSwitch = script$8;
  exports.CalTabPane = script$5;
  exports.CalTable = script$7;
  exports.CalTableOption = script$6;
  exports.CalTabs = script$4;
  exports.CalTextarea = script$3;
  exports.CalThemeIcon = script$2;
  exports.CalTree = script$1;
  exports.CalUpload = script;
  exports.default = index;
  exports.defaultTheme = defaultTheme;
  exports.install = install;
  exports.transformTheme2CssVars = transformTheme2CssVars;
  exports.useGlobalTheme = useGlobalTheme;
  exports.useTheme = useTheme;
  Object.keys(antd).forEach(function (k) {
    if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
      enumerable: true,
      get: function () {
        return antd[k];
      }
    });
  });

  Object.defineProperty(exports, '__esModule', { value: true });

})));
