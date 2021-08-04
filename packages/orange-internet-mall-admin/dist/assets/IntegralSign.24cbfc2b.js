import{_ as l}from"./EditHeader.67fbf51f.js";import{_ as e}from"./EditCardForm.eb8b3b86.js";import{_ as o}from"./ImageItem.b647d306.js";import{_ as t}from"./ColorGroup.vue_vue&type=script&setup=true&lang.dc9fb82e.js";import{_ as a}from"./ColorInput.60244a44.js";import{_ as d}from"./SliderGroup.vue_vue&type=script&setup=true&lang.84a8a9b8.js";import{_ as u}from"./SliderInput.27251042.js";import{a as n,b as r,o as i,c as p,g as m,I as c,F as s,P as b,X as y,t as V,s as f}from"./vendor.71e19cde.js";import"./index.a53c91c6.js";var g=n({expose:[],props:{option:{type:Object,required:!0}},setup:n=>(g,_)=>{const S=r("el-radio"),k=r("el-radio-group"),x=r("el-form-item"),U=r("el-input");return i(),p(s,null,[m(l,{icon:"ad-integral-sign",title:"积分签到"}),m(e,{title:"组件风格"},{default:c((()=>[m(x,{label:"商品样式"},{default:c((()=>[m(k,{modelValue:n.option.componentStyle.componentModal,"onUpdate:modelValue":_[1]||(_[1]=l=>n.option.componentStyle.componentModal=l)},{default:c((()=>[(i(),p(s,null,b(["默认","投影","描边"],(l=>m(S,{key:l,label:l},null,8,["label"]))),64))])),_:1},8,["modelValue"])])),_:1})])),_:1}),m(e,{title:"内容编辑"},{default:c((()=>[m(x,{label:"标题文字"},{default:c((()=>[m(U,{maxlength:"10","show-word-limit":"",modelValue:n.option.contentEdit.title,"onUpdate:modelValue":_[2]||(_[2]=l=>n.option.contentEdit.title=l),placeholder:"请输入标题文字"},null,8,["modelValue"])])),_:1}),m(x,{label:"背景图"},{default:c((()=>[m(o,{modelValue:n.option.contentEdit.image,"onUpdate:modelValue":_[3]||(_[3]=l=>n.option.contentEdit.image=l),size:"84"},null,8,["modelValue"])])),_:1}),m(x,{label:"组件边框"},{default:c((()=>[m(k,{modelValue:n.option.contentEdit.effectiveTimeStatus,"onUpdate:modelValue":_[4]||(_[4]=l=>n.option.contentEdit.effectiveTimeStatus=l)},{default:c((()=>[(i(),p(s,null,b(["显示","不显示"],(l=>m(S,{key:l,label:"显示"===l},{default:c((()=>[y(V(l),1)])),_:2},1032,["label"]))),64))])),_:1},8,["modelValue"])])),_:1})])),_:1}),m(e,{title:"组件样式"},{default:c((()=>[m(x,{label:"组件背景"},{default:c((()=>[m(k,{modelValue:n.option.colorStyle.backgroundType,"onUpdate:modelValue":_[5]||(_[5]=l=>n.option.colorStyle.backgroundType=l)},{default:c((()=>[(i(),p(s,null,b(["透明","颜色","背景图片"],(l=>m(S,{key:l,label:l},null,8,["label"]))),64))])),_:1},8,["modelValue"])])),_:1}),"背景图片"===n.option.colorStyle.backgroundType?(i(),p(x,{key:0,label:"背景图片"},{default:c((()=>[m(o,{modelValue:n.option.colorStyle.image,"onUpdate:modelValue":_[6]||(_[6]=l=>n.option.colorStyle.image=l)},null,8,["modelValue"])])),_:1})):f("",!0),m(t,{modelValue:n.option.colorStyle.color,"onUpdate:modelValue":_[13]||(_[13]=l=>n.option.colorStyle.color=l),reset:""},{default:c((()=>["颜色"===n.option.colorStyle.backgroundType?(i(),p(a,{key:0,keyword:"background",label:"背景颜色"})):f("",!0),m(a,{keyword:"subBackground",label:"标题背景"}),m(x,{label:"内部背景"},{default:c((()=>[m(a,{modelValue:n.option.colorStyle.color.insideBackground,"onUpdate:modelValue":_[7]||(_[7]=l=>n.option.colorStyle.color.insideBackground=l)},null,8,["modelValue"])])),_:1}),m(a,{keyword:"title",label:"标题颜色"}),m(a,{keyword:"subTitle",label:"副标题"}),m(x,{label:"小标题"},{default:c((()=>[m(a,{modelValue:n.option.colorStyle.color.smallTitle,"onUpdate:modelValue":_[8]||(_[8]=l=>n.option.colorStyle.color.smallTitle=l)},null,8,["modelValue"])])),_:1}),m(x,{label:"小副标题"},{default:c((()=>[m(a,{modelValue:n.option.colorStyle.color.smallSubTitle,"onUpdate:modelValue":_[9]||(_[9]=l=>n.option.colorStyle.color.smallSubTitle=l)},null,8,["modelValue"])])),_:1}),m(x,{label:"积分颜色"},{default:c((()=>[m(a,{modelValue:n.option.colorStyle.color.integral,"onUpdate:modelValue":_[10]||(_[10]=l=>n.option.colorStyle.color.integral=l)},null,8,["modelValue"])])),_:1}),m(x,{label:"积分背景"},{default:c((()=>[m(a,{modelValue:n.option.colorStyle.color.integralBackground,"onUpdate:modelValue":_[11]||(_[11]=l=>n.option.colorStyle.color.integralBackground=l)},null,8,["modelValue"])])),_:1}),m(a,{keyword:"btn",label:"按钮颜色"}),m(x,{label:"按钮背景"},{default:c((()=>[m(a,{modelValue:n.option.colorStyle.color.btnBackground,"onUpdate:modelValue":_[12]||(_[12]=l=>n.option.colorStyle.color.btnBackground=l)},null,8,["modelValue"])])),_:1})])),_:1},8,["modelValue"])])),_:1}),m(e,{title:"边距设置"},{default:c((()=>[m(d,{modelValue:n.option.padding,"onUpdate:modelValue":_[14]||(_[14]=l=>n.option.padding=l)},{default:c((()=>[m(u,{keyword:"top",label:"上边距",max:50,tips:"px"}),m(u,{keyword:"bottom",label:"下边距",max:20,tips:"px"}),m(u,{keyword:"leftRight",label:"左右边距",max:20,tips:"px"}),m(u,{keyword:"topRadius",label:"上圆角",max:20,tips:"px"}),m(u,{keyword:"bottomRadius",label:"下圆角",max:20,tips:"px"})])),_:1},8,["modelValue"])])),_:1})],64)}});export default g;