import{a as e,e as t,l,b as o,o as a,c as n,g as d,u as s,F as i,P as c,t as r,M as u,a5 as m,G as p,s as v,X as f,N as b,k as y,p as w,h as _,w as g,V as h,I as V,H as x}from"./vendor.71e19cde.js";import{u as I,p as k,g as C,c as j,i as U,_ as E,r as S,l as F,n as q,d as P,j as D,k as z}from"./index.a53c91c6.js";import{_ as B,a as A}from"./Decoration.4ca538d6.js";import{d as G,l as T,a as N,i as O,c as L}from"./options.119c0fd3.js";import{_ as H}from"./EditCardForm.eb8b3b86.js";import{_ as R}from"./EditCardItem.9ed044a9.js";import{_ as M}from"./ImageItem.b647d306.js";import{_ as X}from"./LinkItem.c2fdbd3b.js";import{_ as $}from"./SliderInput.27251042.js";import{_ as J}from"./ColorGroup.vue_vue&type=script&setup=true&lang.dc9fb82e.js";import{_ as K}from"./ColorInput.60244a44.js";import{_ as Q}from"./ViewImage.e6691b67.js";import W from"./CommodityGroup.762bf19b.js";import Y from"./CommodityGroup.5e698e8d.js";import"./EditHeader.67fbf51f.js";import"./SliderGroup.vue_vue&type=script&setup=true&lang.84a8a9b8.js";import"./StyledGroup.vue_vue&type=script&setup=true&lang.712c91f4.js";import"./StyledInput.f427b6d4.js";import"./GoodList.074fb8d7.js";import"./use-view-style.fb7e9a30.js";const Z=y();w("data-v-228e3d62");const ee={class:"oe-flex oe-row-between",style:{width:"100%",position:"relative"}},te={class:"left oe-flex"},le={class:"back-shop"},oe=d("i",{class:"el-icon-arrow-left",style:{color:"#ffffff",cursor:"pointer"}},null,-1),ae={class:"view-navi-list oe-flex"},ne={class:"text"},de={class:"center"},se=f(" / "),ie=d("span",{class:"page-menus"},[d("span",{class:"oe-m-r-5"},"页面列表"),d("i",{class:"el-icon-arrow-down"})],-1),ce={style:{width:"150px"}},re={class:"dropdown-button-container"},ue=f(" 新增空白页 "),me={class:"control oe-text-right"},pe=f(" 保存模板 "),ve=f(" 保存并预览 "),fe={class:"oe-flex oe-row-center"},be=f("发布"),ye=f("发布"),we=f("定时发布"),_e={class:"oe-m-t-30"},ge=d("span",null,"定时发布时间： ",-1),he={class:"dialog-footer"},Ve=f("取 消"),xe=f("确 定");_();var Ie=e({expose:[],props:{type:String,decorateInfo:{type:Object,required:!0},currentViewIndex:{type:Number,required:!0}},setup(e,{emit:y}){const w=e,_=I(),g=t({get:()=>w.currentViewIndex,set:e=>y("update:currentViewIndex",e)}),h=l(""),V=l(""),x=l([{type:"Decoration",icon:"ad-renovation",text:"装修"},{type:"Style",icon:"ad-template",text:"颜色风格"},{type:"Advertisement",icon:"ad-launch",text:"广告页"},{type:"Recommend",icon:"ad-style",text:"商品推荐"},{type:"NaviAdmin",icon:"ad-recommend",text:"导航管理"}]),D=t({get:()=>w.type,set:e=>y("update:type",e)}),z=l(!1),B=t((()=>w.decorateInfo.shop_channel_code.join("|"))),A=l(!1),T=()=>{location.reload()},N=async(e=!1)=>!!w.decorateInfo&&(await C({id:w.decorateInfo.id,content:w.decorateInfo.content}),j.success("保存成功!"),!!e&&(z.value=!1,await U(500),void location.reload())),O=async()=>{await N(),await(async()=>{if(!w.decorateInfo)return!1;const{data:e}=await P({type:"browse",id:w.decorateInfo.id});V.value=e.data})()},L=async()=>{await E.confirm("确定发布该模板吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}),await S({id:w.decorateInfo.id,is_publish_and_save:1,content:w.decorateInfo.content,is_timing:0}),j.success("发布成功!")},H=async()=>{await E.confirm("确定发布该模板吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}),await S({id:w.decorateInfo.id,is_publish_and_save:1,content:w.decorateInfo.content,is_timing:1,time:"2021-05-05 12:00:00"}),A.value=!1,j.success("定时发布成功!")},R=()=>{const e=F.cloneDeep(G);e.id=q(5),w.decorateInfo.content.views.push(e),g.value=w.decorateInfo.content.views.length-1},M=t((()=>w.decorateInfo.content.views.filter((e=>"default"!==e.id)).map((e=>({type:"shop",name:"自定义页面",label:e.name,value:{path:"/pages/baseTabBars/customPage",params:{id:e.id}}})))));return k.subscribe("notice-get-custom-views",(()=>{k.publish("custom-views",M.value)})),Z(((t,l)=>{const y=o("el-dropdown-item"),I=o("el-button"),k=o("el-dropdown-menu"),C=o("el-dropdown"),j=o("el-link"),U=o("qr-code"),E=o("el-popover"),S=o("el-date-picker"),F=o("el-dialog"),q=o("edit-channel");return a(),n("div",ee,[d("div",te,[d("div",le,[oe,d("span",{class:"back-text",onClick:l[1]||(l[1]=(...e)=>s(_).back&&s(_).back(...e))},"返回我的店铺")]),d("div",ae,[(a(!0),n(i,null,c(x.value,((e,t)=>(a(),n("div",{class:["view-navi-item oe-flex oe-row-center",{"is-active":s(D)==e.type}],key:t,onClick:t=>D.value=e.type},[d("i",{class:["icon-default",[e.icon]]},null,2),d("div",ne,r(e.text),1)],10,["onClick"])))),128))])]),d("div",de,[u(d("input",{"onUpdate:modelValue":l[2]||(l[2]=t=>e.decorateInfo.content.views[s(g)].name=t),class:"reset-input",minlength:3,placeholder:"请输入模板名称"},null,512),[[m,e.decorateInfo.content.views[s(g)].name]]),se,d(C,{onCommand:l[3]||(l[3]=e=>g.value=e)},{dropdown:Z((()=>[d(k,null,{default:Z((()=>[(a(!0),n(i,null,c(e.decorateInfo.content.views,((e,t)=>(a(),n(y,{command:t,key:t,class:[{on:t===s(g)},"oe-flex"]},{default:Z((()=>[d("div",ce,r(e.name),1),e.preventDelete?v("",!0):(a(),n("i",{key:0,onClick:p((e=>{return l=t,g.value=l-1,void w.decorateInfo.content.views.splice(l,1);var l}),["stop"]),class:"ri-delete-bin-5-line"},null,8,["onClick"]))])),_:2},1032,["command","class"])))),128)),d("div",re,[d(I,{class:"dropdown-button",icon:"el-icon-plus",size:"mini",onClick:R},{default:Z((()=>[ue])),_:1})])])),_:1})])),default:Z((()=>[ie])),_:1})]),d("div",me,[d(j,{type:"primary",class:"control-text",underline:!1,href:"javascript:;",onClick:l[4]||(l[4]=e=>z.value=!0)},{default:Z((()=>[f(" 编辑渠道("+r(s(B)||"暂无渠道")+") ",1)])),_:1}),d(j,{type:"primary",class:"control-text",underline:!1,href:"javascript:;",onClick:l[5]||(l[5]=e=>N())},{default:Z((()=>[pe])),_:1}),d(E,{placement:"bottom",trigger:"click"},{reference:Z((()=>[d(j,{type:"primary",class:"control-text",underline:!1,href:"javascript:;",onClick:O},{default:Z((()=>[ve])),_:1})])),default:Z((()=>[d("div",fe,[d(U,{text:V.value,size:"100"},null,8,["text"])])])),_:1}),d(C,null,{dropdown:Z((()=>[d(k,null,{default:Z((()=>[d(y,{onClick:L},{default:Z((()=>[ye])),_:1}),d(y,{onClick:l[6]||(l[6]=e=>A.value=!0)},{default:Z((()=>[we])),_:1})])),_:1})])),default:Z((()=>[d(I,{type:"primary"},{default:Z((()=>[be])),_:1})])),_:1})]),(a(),n(b,{to:"#app"},[d(F,{title:"提示",modelValue:A.value,"onUpdate:modelValue":l[9]||(l[9]=e=>A.value=e),width:"30%"},{footer:Z((()=>[d("span",he,[d(I,{onClick:l[8]||(l[8]=e=>A.value=!1)},{default:Z((()=>[Ve])),_:1}),d(I,{type:"primary",onClick:H},{default:Z((()=>[xe])),_:1})])])),default:Z((()=>[d("div",_e,[ge,d(S,{modelValue:h.value,"onUpdate:modelValue":l[7]||(l[7]=e=>h.value=e),type:"datetime",placeholder:"选择日期时间"},null,8,["modelValue"])])])),_:1},8,["modelValue"]),d(q,{modelValue:z.value,"onUpdate:modelValue":l[10]||(l[10]=e=>z.value=e),id:e.decorateInfo.id,channels:w.decorateInfo.shop_channel_code,content:w.decorateInfo.content,onConfirm:T},null,8,["modelValue","id","channels","content"])]))])}))}});Ie.__scopeId="data-v-228e3d62";const ke=y();w("data-v-de9016f2");const Ce={class:"view-relative"},je={key:0,class:"view-time-down"},Ue={key:1,class:"view-time-down"},Ee=d("div",{class:"el-form-item"},"广告图片选择",-1),Se=d("div",{class:"tips oe-m-t-15 oe-m-b-30"}," 添加多个将以轮播图形式展现；广告图片建议尺寸宽1125x高2436Px ",-1);_();var Fe=e({expose:[],props:{decorateInfo:{type:Object,required:!0},currentViewIndex:{type:Number,required:!0}},setup(e){const l=e,m=t((()=>l.decorateInfo.content.advertisement)),p=()=>{if(m.value.images.length>=50)return!1;m.value.images.push({image:"",link:F.clone(T)})};return g([()=>m.value.status,()=>m.value.style,()=>m.value.showForm,()=>m.value.interval,()=>m.value.timingClose,()=>m.value.close,()=>m.value.images],(()=>{m.value.id=q(8)})),ke(((e,t)=>{const l=o("mobile-emulator"),b=o("el-switch"),y=o("el-form-item"),w=o("el-image"),_=o("el-radio-button"),g=o("el-radio-group"),V=o("el-radio");return a(),n(B,null,{content:ke((()=>[d(l,{class:"view-container"},{default:ke((()=>[d("div",{class:["view-content","board"===s(m).style?"size-max":"size-square"],style:{backgroundImage:`url(${s(m).images[0].image})`}},[d("div",Ce,[s(m).close?(a(),n("div",je,"关闭")):(a(),n("div",Ue,r(s(m).timingClose)+"秒后关闭 ",1))])],6)])),_:1})])),edit:ke((()=>[d(H,{title:"广告展示选择","show-margin-top":!1},{default:ke((()=>[d(y,{label:"广告状态"},{default:ke((()=>[d(b,{modelValue:s(m).status,"onUpdate:modelValue":t[1]||(t[1]=e=>s(m).status=e)},null,8,["modelValue"])])),_:1}),d(y,{label:"风格类型"},{default:ke((()=>[d(g,{modelValue:s(m).style,"onUpdate:modelValue":t[2]||(t[2]=e=>s(m).style=e),size:"mini"},{default:ke((()=>[d(_,{label:"board"},{default:ke((()=>[d(w,{class:"radio-image",src:"/addons/weitshop_shop/weshop/public/home/backend/images/icon/board.png"})])),_:1}),d(_,{label:"board-nesting"},{default:ke((()=>[d(w,{class:"radio-image",src:"/addons/weitshop_shop/weshop/public/home/backend/images/icon/board-nesting.png"})])),_:1})])),_:1},8,["modelValue"])])),_:1})])),_:1}),d(H,{title:"内容编辑"},{default:ke((()=>[d(y,{label:"显示形式"},{default:ke((()=>[d(g,{modelValue:s(m).showForm,"onUpdate:modelValue":t[3]||(t[3]=e=>s(m).showForm=e)},{default:ke((()=>[(a(),n(i,null,c(["仅首次","每次","时间间隔"],(e=>d(V,{label:e,key:e},null,8,["label"]))),64))])),_:1},8,["modelValue"])])),_:1}),"时间间隔"===s(m).showForm?(a(),n(y,{key:0,label:"时间间隔"},{default:ke((()=>[d($,{modelValue:s(m).interval,"onUpdate:modelValue":t[4]||(t[4]=e=>s(m).interval=e),max:240,tips:"分钟"},null,8,["modelValue"])])),_:1})):v("",!0),d(y,{label:"显示关闭"},{default:ke((()=>[d(b,{modelValue:s(m).close,"onUpdate:modelValue":t[5]||(t[5]=e=>s(m).close=e)},null,8,["modelValue"])])),_:1}),s(m).close?v("",!0):(a(),n(y,{key:1,label:"定时关闭"},{default:ke((()=>[d(g,{modelValue:s(m).timingClose,"onUpdate:modelValue":t[6]||(t[6]=e=>s(m).timingClose=e)},{default:ke((()=>[(a(),n(i,null,c([3,4,5],(e=>d(V,{label:e,key:e},{default:ke((()=>[f(r(e)+"秒 ",1)])),_:2},1032,["label"]))),64))])),_:1},8,["modelValue"])])),_:1})),Ee,(a(!0),n(i,null,c(s(m).images,((e,t)=>u((a(),n(R,{key:t,"show-close":1!==s(m).images.length&&"board-nesting"!==s(m).style,onClose:e=>s(m).images.splice(t,1)},{default:ke((()=>[d(y,{label:"广告图"},{default:ke((()=>[d(M,{size:50,"bg-color":"#ffffff",modelValue:e.image,"onUpdate:modelValue":t=>e.image=t},null,8,["modelValue","onUpdate:modelValue"])])),_:2},1024),d(y,{label:"跳转"},{default:ke((()=>[d(X,{modelValue:e.link,"onUpdate:modelValue":t=>e.link=t},null,8,["modelValue","onUpdate:modelValue"])])),_:2},1024)])),_:2},1032,["show-close","onClose"])),[[h,0===t||"board-nesting"!==s(m).style]]))),128)),"board"===s(m).style?(a(),n(i,{key:2},[Se,d("div",{class:"inc-button",onClick:p},"+ 添加")],64)):v("",!0)])),_:1})])),_:1})}))}});Fe.__scopeId="data-v-de9016f2";const qe=y();w("data-v-489a4af3");const Pe={class:"view-containers oe-flex oe-row-center"},De=d("img",{class:"color-img",src:"/addons/weitshop_shop/weshop/public/home/backend/images/decorate/main-color-1.png",alt:""},null,-1),ze={class:"tips"};_();var Be=e({expose:[],props:{decorateInfo:{type:Object,required:!0}},setup(e){const t=l([{color:"#1D7AF6",text:"深海蓝"},{color:"#FF7323",text:"炫酷橙"},{color:"#EF1770",text:"丁香粉"},{color:"#DDAF73",text:"电镀金"},{color:"#FF2F3C",text:"蔷薇红"},{color:"#09BB72",text:"翡翠绿"},{color:"#AF01B3",text:"神秘紫"}]);return qe(((l,s)=>{const u=o("mobile-emulator");return a(),n(B,null,{content:qe((()=>[d("div",Pe,[d(u,{class:"view-container"},{default:qe((()=>[De,d("div",{class:"color-rect",style:[{width:"200px",height:"50px",bottom:"5px",right:"0"},{backgroundColor:e.decorateInfo.content.style}]},null,4)])),_:1})])])),edit:qe((()=>[d(H,{"show-margin-top":!1,title:"颜色选择"},{default:qe((()=>[(a(!0),n(i,null,c(t.value,((t,l)=>(a(),n("div",{class:["color-item oe-flex",{on:e.decorateInfo.content.style==t.color}],key:l,onClick:l=>e.decorateInfo.content.style=t.color},[d("div",{class:"color-block",style:{background:t.color}},null,4),d("div",ze,r(t.text),1)],10,["onClick"])))),128))])),_:1})])),_:1})}))}});Be.__scopeId="data-v-489a4af3";const Ae=y();var Ge=e({expose:[],props:{decorateInfo:{type:Object,required:!0},currentViewIndex:{type:Number,required:!0}},setup(e){const u=e,m=t((()=>u.decorateInfo.content.navigation)),p=l(0),f=()=>{m.value.contentEdit.navis.push({iconPath:"",selectedIconPath:"",text:"",link:F.clone(T)})};return Ae(((e,t)=>{const l=o("mobile-emulator"),u=o("el-radio"),b=o("el-radio-group"),y=o("el-input"),w=o("el-form-item"),_=o("el-switch");return a(),n(B,null,{content:Ae((()=>[d(l,{class:"view-container"},{default:Ae((()=>[d("div",{class:"tab-bar-container oe-flex",style:{backgroundColor:s(m).colorStyle.color.background}},[(a(!0),n(i,null,c(s(m).contentEdit.navis,((e,t)=>(a(),n("div",{class:"tab-bar-item oe-flex-1 oe-flex oe-row-center",key:t},[d(Q,{class:"oe-m-b-5",size:20,src:p.value===t?e.selectedIconPath:e.iconPath},null,8,["src"]),"图标+文字"===s(m).naviStyle?(a(),n("span",{key:0,class:"text",style:{color:p.value===t?s(m).colorStyle.color.activeColor:s(m).colorStyle.color.inactiveColor}},r(e.text),5)):v("",!0)])))),128))],4)])),_:1})])),edit:Ae((()=>[d(H,{title:"导航设置"},{default:Ae((()=>[d(b,{modelValue:s(m).naviStyle,"onUpdate:modelValue":t[1]||(t[1]=e=>s(m).naviStyle=e)},{default:Ae((()=>[(a(),n(i,null,c(["图标+文字","图标"],(e=>d(u,{label:e,key:e},null,8,["label"]))),64))])),_:1},8,["modelValue"])])),_:1}),d(H,{title:"内容编辑"},{default:Ae((()=>[d(w,{label:"导航名称"},{default:Ae((()=>[d(y,{"show-word-limit":"",maxlength:"8",style:{width:"150px"},modelValue:s(m).contentEdit.name,"onUpdate:modelValue":t[2]||(t[2]=e=>s(m).contentEdit.name=e)},null,8,["modelValue"])])),_:1}),d(w,{label:"数量提示"},{default:Ae((()=>[d(_,{modelValue:s(m).contentEdit.countTips,"onUpdate:modelValue":t[3]||(t[3]=e=>s(m).contentEdit.countTips=e)},null,8,["modelValue"])])),_:1}),d(w,{label:"图标设置"}),(a(!0),n(i,null,c(s(m).contentEdit.navis,((e,t)=>(a(),n(R,{onClose:e=>(e=>{m.value.contentEdit.navis.splice(e,1),e>1&&(p.value-=2)})(t),onClick:e=>p.value=t,select:p.value===t,"show-close":s(m).contentEdit.navis.length>1,hover:!1,key:t},{default:Ae((()=>[d(w,{label:"图标"},{default:Ae((()=>[d(M,{tips:"选中","tips-placement":"bottom",modelValue:e.selectedIconPath,"onUpdate:modelValue":t=>e.selectedIconPath=t,class:"oe-m-r-30"},null,8,["modelValue","onUpdate:modelValue"]),d(M,{tips:"未选中","tips-placement":"bottom",modelValue:e.iconPath,"onUpdate:modelValue":t=>e.iconPath=t},null,8,["modelValue","onUpdate:modelValue"])])),_:2},1024),"图标+文字"===s(m).naviStyle?(a(),n(w,{key:0,label:"文字"},{default:Ae((()=>[d(y,{placeholder:"请输入导航名称",modelValue:e.text,"onUpdate:modelValue":t=>e.text=t,maxlength:"4","show-word-limit":""},null,8,["modelValue","onUpdate:modelValue"])])),_:2},1024)):v("",!0),d(w,{label:"链接"},{default:Ae((()=>[d(X,{modelValue:e.link,"onUpdate:modelValue":t=>e.link=t},null,8,["modelValue","onUpdate:modelValue"])])),_:2},1024)])),_:2},1032,["onClose","onClick","select","show-close"])))),128)),s(m).contentEdit.navis.length<5?(a(),n("div",{key:0,class:"inc-button",onClick:f}," + 添加 "+r(s(m).contentEdit.navis.length)+"/5 ",1)):v("",!0)])),_:1}),d(H,{title:"组件样式"},{default:Ae((()=>[d(J,{modelValue:s(m).colorStyle.color,"onUpdate:modelValue":t[4]||(t[4]=e=>s(m).colorStyle.color=e),reset:""},{default:Ae((()=>[d(K,{keyword:"background",label:"背景颜色",reset:""}),d(K,{keyword:"dividingLine",label:"分割线",reset:""}),d(K,{keyword:"inactiveColor",label:"文字默认",reset:""}),d(K,{keyword:"activeColor",label:"文字选中",reset:""})])),_:1},8,["modelValue"])])),_:1})])),_:1})}))}});Ge.__scopeId="data-v-6d065252";const Te=y();w("data-v-7b3a2176");const Ne={class:"title-container oe-flex oe-row-center"},Oe=d("span",{class:"left-view-line"},null,-1),Le={class:"content oe-m-l-15 oe-m-r-15"},He=d("span",{class:"right-view-line"},null,-1);_();var Re=e({expose:[],props:{decorateInfo:{type:Object,required:!0}},setup:e=>Te(((t,l)=>{const s=o("mobile-emulator"),u=o("el-input"),m=o("el-form-item"),p=o("el-checkbox"),v=o("el-checkbox-group");return a(),n(B,null,{content:Te((()=>[d(s,{class:"view-container"},{default:Te((()=>[d("div",Ne,[Oe,d("span",Le,r(e.decorateInfo.content.recommend.contentEdit.text),1),He]),d(Y,{option:e.decorateInfo.content.recommend},null,8,["option"])])),_:1})])),edit:Te((()=>[d(H,{title:"内容编辑","show-margin-top":!1},{default:Te((()=>[d(m,{label:"文字"},{default:Te((()=>[d(u,{style:{width:"202px"},modelValue:e.decorateInfo.content.recommend.contentEdit.text,"onUpdate:modelValue":l[1]||(l[1]=t=>e.decorateInfo.content.recommend.contentEdit.text=t),maxlength:"8","show-word-limit":""},null,8,["modelValue"])])),_:1}),d(m,{label:"可用页面"},{default:Te((()=>[d(v,{modelValue:e.decorateInfo.content.recommend.contentEdit.pages,"onUpdate:modelValue":l[2]||(l[2]=t=>e.decorateInfo.content.recommend.contentEdit.pages=t)},{default:Te((()=>[(a(),n(i,null,c(["购物车","支付成功","商品详情","会员中心"],(e=>d(p,{label:e,key:e},null,8,["label"]))),64))])),_:1},8,["modelValue"])])),_:1})])),_:1}),d(W,{option:e.decorateInfo.content.recommend,"onUpdate:option":l[3]||(l[3]=t=>e.decorateInfo.content.recommend=t),"show-header":!1},null,8,["option"])])),_:1})}))});Re.__scopeId="data-v-7b3a2176";var Me=e({expose:[],setup(e){const t=D(),s=I(),i={Decoration:A,Advertisement:Fe,Style:Be,NaviAdmin:Ge,Recommend:Re},c=l("Decoration"),r=l(),u=l(0);return void 0===t.query.id&&s.replace("/404"),z(t.query.id).then((e=>{if(r.value=e.data.data,!r.value)return!1;r.value.content?(void 0===r.value.content.advertisement.id&&(r.value.content.advertisement=N.advertisement),r.value.content.views.forEach(((e,t)=>{e.content.forEach(((e,t)=>{var l,o;"ImageCarousel"!==e.type||(null==(l=null==e?void 0:e.option)?void 0:l.heightSetting)||(e.option=O),"CarouselSearch"!==e.type||(null==(o=null==e?void 0:e.option)?void 0:o.heightSetting)||(e.option=L)}))}))):r.value.content=N})),(e,t)=>{const l=o("el-header"),s=o("el-container");return r.value?(a(),n(s,{key:0,class:"decorate-container"},{default:V((()=>[d(l,{class:"oe-flex"},{default:V((()=>[d(Ie,{type:c.value,"onUpdate:type":t[1]||(t[1]=e=>c.value=e),decorateInfo:r.value,currentViewIndex:u.value,"onUpdate:currentViewIndex":t[2]||(t[2]=e=>u.value=e)},null,8,["type","decorateInfo","currentViewIndex"])])),_:1}),d(s,null,{default:V((()=>[(a(),n(x(i[c.value]),{decorateInfo:r.value,currentViewIndex:u.value},null,8,["decorateInfo","currentViewIndex"]))])),_:1})])),_:1})):v("",!0)}}});export default Me;