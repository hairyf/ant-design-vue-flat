import{_ as e}from"./EditHeader.67fbf51f.js";import{_ as o}from"./EditCardForm.eb8b3b86.js";import{_ as l}from"./ImageItem.b647d306.js";import{_ as t}from"./ColorGroup.vue_vue&type=script&setup=true&lang.dc9fb82e.js";import{_ as a}from"./ColorInput.60244a44.js";import{_ as d}from"./SliderGroup.vue_vue&type=script&setup=true&lang.84a8a9b8.js";import{_ as u}from"./SliderInput.27251042.js";import{_ as n}from"./GoodList.074fb8d7.js";import{_ as i}from"./LinkItem.c2fdbd3b.js";import{a as p,b as r,o as m,c,g as s,I as b,F as y,P as f,s as V,X as k}from"./vendor.71e19cde.js";import"./index.a53c91c6.js";const _=s("div",{class:"el-form-item"}," 最多可显示 20 件商品 ",-1),g=s("span",{style:{"font-size":"12px"}},[s("span",{style:{color:"red"}},"*"),k(" 根据会员特征千人千面展现，可大幅提升点击和成交转化率。 ")],-1);var P=p({expose:[],props:{option:{type:Object,required:!0}},setup:p=>(k,P)=>{const S=r("el-radio"),x=r("el-radio-group"),w=r("el-form-item"),U=r("el-input");return m(),c(y,null,[s(e,{icon:"ad-commodity-exhibition",title:"商品展播"}),s(o,{title:"组件风格"},{default:b((()=>[s(w,{label:"组件样式"},{default:b((()=>[s(x,{modelValue:p.option.componentStyle.componentModal,"onUpdate:modelValue":P[1]||(P[1]=e=>p.option.componentStyle.componentModal=e)},{default:b((()=>[(m(),c(y,null,f(["默认","投影","描边"],(e=>s(S,{key:e,label:e},null,8,["label"]))),64))])),_:1},8,["modelValue"])])),_:1}),s(w,{label:"背景图"},{default:b((()=>[s(l,{modelValue:p.option.componentStyle.backgroundImage,"onUpdate:modelValue":P[2]||(P[2]=e=>p.option.componentStyle.backgroundImage=e)},null,8,["modelValue"])])),_:1})])),_:1}),s(o,{title:"添加商品"},{default:b((()=>[s(w,{label:"商品类型"},{default:b((()=>[s(x,{modelValue:p.option.addProduct.chooseProduct,"onUpdate:modelValue":P[3]||(P[3]=e=>p.option.addProduct.chooseProduct=e)},{default:b((()=>[(m(),c(y,null,f(["手动选择","选择分类","选择分组"],(e=>s(S,{key:e,label:e},null,8,["label"]))),64))])),_:1},8,["modelValue"])])),_:1}),"手动选择"===p.option.addProduct.chooseProduct?(m(),c(n,{key:0,modelValue:p.option.addProduct.manualSelection,"onUpdate:modelValue":P[4]||(P[4]=e=>p.option.addProduct.manualSelection=e)},null,8,["modelValue"])):V("",!0),"选择分类"===p.option.addProduct.chooseProduct?(m(),c(w,{key:1,label:"分类"},{default:b((()=>[s(i,{modelValue:p.option.addProduct.selectCategories,"onUpdate:modelValue":P[5]||(P[5]=e=>p.option.addProduct.selectCategories=e),type:"classification",reset:""},null,8,["modelValue"])])),_:1})):V("",!0),"选择分组"===p.option.addProduct.chooseProduct?(m(),c(w,{key:2,label:"分组"},{default:b((()=>[s(i,{modelValue:p.option.addProduct.selectGroup,"onUpdate:modelValue":P[6]||(P[6]=e=>p.option.addProduct.selectGroup=e),type:"grouping",reset:""},null,8,["modelValue"])])),_:1})):V("",!0),"手动选择"!==p.option.addProduct.chooseProduct?(m(),c(y,{key:3},[s(w,{label:"商品条数"},{default:b((()=>[s(u,{modelValue:p.option.addProduct.productsNum,"onUpdate:modelValue":P[7]||(P[7]=e=>p.option.addProduct.productsNum=e),max:20,tips:"个"},null,8,["modelValue"])])),_:1}),_,s(w,{label:"商品排序"},{default:b((()=>[s(x,{modelValue:p.option.addProduct.commodityRanking,"onUpdate:modelValue":P[8]||(P[8]=e=>p.option.addProduct.commodityRanking=e)},{default:b((()=>[(m(),c(y,null,f(["按销量","价格降序","价格升序"],(e=>s(S,{key:e,label:e,style:{"margin-right":"15px"}},null,8,["label"]))),64))])),_:1},8,["modelValue"])])),_:1}),"千人千面"===p.option.addProduct.commodityRanking?(m(),c(w,{key:0,label:" "},{default:b((()=>[g])),_:1})):V("",!0)],64)):V("",!0)])),_:1}),s(o,{title:"整体样式"},{default:b((()=>[s(t,{modelValue:p.option.contentStyle.color,"onUpdate:modelValue":P[12]||(P[12]=e=>p.option.contentStyle.color=e),reset:""},{default:b((()=>[s(w,{label:"主标题"},{default:b((()=>[s(U,{class:"oe-flex",modelValue:p.option.contentStyle.title,"onUpdate:modelValue":P[9]||(P[9]=e=>p.option.contentStyle.title=e),maxlength:"10","show-word-limit":""},null,8,["modelValue"])])),_:1}),s(a,{keyword:"title",label:"主标题"}),s(w,{label:"副标题"},{default:b((()=>[s(U,{class:"oe-flex",modelValue:p.option.contentStyle.subTitle,"onUpdate:modelValue":P[10]||(P[10]=e=>p.option.contentStyle.subTitle=e),maxlength:"10","show-word-limit":""},null,8,["modelValue"])])),_:1}),s(a,{keyword:"subTitle",label:"副标题"}),s(a,{keyword:"btn",label:"按钮颜色"}),s(a,{keyword:"text",label:"文字颜色"}),s(w,{label:"链接"},{default:b((()=>[s(i,{modelValue:p.option.contentStyle.link,"onUpdate:modelValue":P[11]||(P[11]=e=>p.option.contentStyle.link=e)},null,8,["modelValue"])])),_:1})])),_:1},8,["modelValue"])])),_:1}),s(o,{title:"组件样式"},{default:b((()=>[s(w,{label:"组件背景"},{default:b((()=>[s(x,{modelValue:p.option.colorStyle.backgroundType,"onUpdate:modelValue":P[13]||(P[13]=e=>p.option.colorStyle.backgroundType=e)},{default:b((()=>[(m(),c(y,null,f(["透明","颜色","背景图片"],(e=>s(S,{key:e,label:e},null,8,["label"]))),64))])),_:1},8,["modelValue"])])),_:1}),"背景图片"===p.option.colorStyle.backgroundType?(m(),c(w,{key:0,label:"图片"},{default:b((()=>[s(l,{modelValue:p.option.colorStyle.image,"onUpdate:modelValue":P[14]||(P[14]=e=>p.option.colorStyle.image=e)},null,8,["modelValue"])])),_:1})):V("",!0),s(t,{modelValue:p.option.colorStyle.color,"onUpdate:modelValue":P[15]||(P[15]=e=>p.option.colorStyle.color=e),class:"oe-m-b-20",reset:""},{default:b((()=>["颜色"===p.option.colorStyle.backgroundType?(m(),c(a,{key:0,keyword:"background",label:"背景颜色"})):V("",!0),s(a,{keyword:"subBackground",label:"商品背景"}),s(a,{keyword:"title",label:"标题颜色"}),s(a,{keyword:"text",label:"价格颜色"}),s(a,{keyword:"btn",label:"按钮颜色"})])),_:1},8,["modelValue"])])),_:1}),s(o,{title:"边距设置"},{default:b((()=>[s(d,{modelValue:p.option.padding,"onUpdate:modelValue":P[16]||(P[16]=e=>p.option.padding=e)},{default:b((()=>[s(u,{keyword:"top",label:"上边距",tips:"px",max:50}),s(u,{keyword:"bottom",label:"下边距",max:20,tips:"px"}),s(u,{keyword:"leftRight",label:"左右边距",max:20,tips:"px"}),s(u,{keyword:"topRadius",label:"上圆角",max:20,tips:"px"}),s(u,{keyword:"bottomRadius",label:"下圆角",max:20,tips:"px"})])),_:1},8,["modelValue"])])),_:1})],64)}});export default P;
