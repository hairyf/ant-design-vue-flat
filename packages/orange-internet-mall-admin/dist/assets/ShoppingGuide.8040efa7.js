import{_ as e}from"./EditHeader.67fbf51f.js";import{_ as l}from"./EditCardForm.eb8b3b86.js";import{_ as t}from"./ImageItem.b647d306.js";import{_ as o}from"./ColorGroup.vue_vue&type=script&setup=true&lang.dc9fb82e.js";import{_ as a}from"./ColorInput.60244a44.js";import{_ as d}from"./SliderGroup.vue_vue&type=script&setup=true&lang.84a8a9b8.js";import{_ as n}from"./SliderInput.27251042.js";import{a as i,b as p,o as u,c as m,g as r,F as s,P as c,k as b}from"./vendor.71e19cde.js";import"./index.a53c91c6.js";const f=b();var V=i({expose:[],props:{option:{type:Object,required:!0}},setup:i=>f(((b,V)=>{const _=p("el-radio"),g=p("el-radio-group"),x=p("el-form-item"),w=p("el-input");return u(),m(s,null,[r(e,{icon:"ad-shopping-guide",title:"导购"}),r(l,{title:"组件风格"},{default:f((()=>[r(x,{label:"商品样式"},{default:f((()=>[r(g,{modelValue:i.option.componentStyle.componentModal,"onUpdate:modelValue":V[1]||(V[1]=e=>i.option.componentStyle.componentModal=e)},{default:f((()=>[(u(),m(s,null,c(["默认","投影","描边"],(e=>r(_,{key:e,label:e},null,8,["label"]))),64))])),_:1},8,["modelValue"])])),_:1})])),_:1}),r(l,{title:"内容编辑","label-width":"90"},{default:f((()=>[r(o,{modelValue:i.option.contentEdit.color,"onUpdate:modelValue":V[8]||(V[8]=e=>i.option.contentEdit.color=e)},{default:f((()=>[r(x,{label:"图片"},{default:f((()=>[r(t,{modelValue:i.option.contentEdit.image,"onUpdate:modelValue":V[2]||(V[2]=e=>i.option.contentEdit.image=e),size:"84"},null,8,["modelValue"])])),_:1}),r(x,{label:"标题文字"},{default:f((()=>[r(w,{maxlength:"10","show-word-limit":"",modelValue:i.option.contentEdit.title,"onUpdate:modelValue":V[3]||(V[3]=e=>i.option.contentEdit.title=e),placeholder:"请输入标题文字"},null,8,["modelValue"])])),_:1}),r(a,{keyword:"background",label:"背景颜色"}),r(x,{label:"副标题文字",class:"long-slider-input"},{default:f((()=>[r(w,{maxlength:"40","show-word-limit":"",modelValue:i.option.contentEdit.subTitle,"onUpdate:modelValue":V[4]||(V[4]=e=>i.option.contentEdit.subTitle=e),placeholder:"请输入副标题文字"},null,8,["modelValue"])])),_:1}),r(a,{keyword:"subBackground",label:"背景颜色"}),r(x,{label:"联系方式名称",class:"long-slider-input-6"},{default:f((()=>[r(w,{maxlength:"5","show-word-limit":"",modelValue:i.option.contentEdit.contactName,"onUpdate:modelValue":V[5]||(V[5]=e=>i.option.contentEdit.contactName=e),placeholder:"请输入名称"},null,8,["modelValue"])])),_:1}),r(x,{label:"联系方式内容",class:"long-slider-input-6"},{default:f((()=>[r(w,{maxlength:"20","show-word-limit":"",modelValue:i.option.contentEdit.contactContent,"onUpdate:modelValue":V[6]||(V[6]=e=>i.option.contentEdit.contactContent=e),placeholder:"请输入内容"},null,8,["modelValue"])])),_:1}),r(x,{label:"按钮文字"},{default:f((()=>[r(w,{maxlength:"5","show-word-limit":"",modelValue:i.option.contentEdit.btnText,"onUpdate:modelValue":V[7]||(V[7]=e=>i.option.contentEdit.btnText=e),placeholder:"请输入内容"},null,8,["modelValue"])])),_:1}),r(a,{keyword:"text",label:"文字颜色"}),r(a,{keyword:"btn",label:"按钮颜色"})])),_:1},8,["modelValue"])])),_:1}),r(l,{title:"单击效果"},{default:f((()=>[r(g,{modelValue:i.option.effect.value,"onUpdate:modelValue":V[9]||(V[9]=e=>i.option.effect.value=e)},{default:f((()=>[(u(),m(s,null,c(["复制联系方式","拨打联系方式","放大浏览图片","保存图片"],(e=>r(_,{key:e,label:e},null,8,["label"]))),64))])),_:1},8,["modelValue"])])),_:1}),r(l,{title:"边距设置"},{default:f((()=>[r(d,{modelValue:i.option.padding,"onUpdate:modelValue":V[10]||(V[10]=e=>i.option.padding=e)},{default:f((()=>[r(n,{keyword:"top",label:"上边距",max:50,tips:"px"}),r(n,{keyword:"bottom",label:"下边距",max:20,tips:"px"}),r(n,{keyword:"leftRight",label:"左右边距",max:20,tips:"px"}),r(n,{keyword:"topRadius",label:"上圆角",max:20,tips:"px"}),r(n,{keyword:"bottomRadius",label:"下圆角",max:20,tips:"px"})])),_:1},8,["modelValue"])])),_:1})],64)}))});V.__scopeId="data-v-37005c88";export default V;
