import{H as e,I as a,J as l,K as t,q as o}from"./member.c7d788b5.js";import{u as r,j as u,c as d,L as i}from"./index.a53c91c6.js";import{i as n}from"./reset-time.7778decd.js";import{a as s,l as m,r as c,m as _,b as v,o as p,c as g,g as y,F as h,P as f,X as b,t as k,s as V,u as w,k as x,p as j,h as q}from"./vendor.71e19cde.js";const E=x();j("data-v-4796995e");const L=b("> "),U=b("折"),F=y("span",{class:"text-style"},"输入0.1-9.9之间的数字",-1),N=b("元"),C=b("元"),I=b("元"),z=b("元"),D=b("单"),O=b("添加商品"),A=y("span",{class:"text-style"},"当会员购买相关商品且确认收货后，可升级为此会员等级",-1),B={class:"item-left"},J={class:"item-right"},H={class:"commodity-name"},K={class:"commodity-price"},M=y("span",{class:"text"},"价格",-1),P={class:"price"},S={class:"commodity-stock"},X={class:"stock-left"},G=y("span",{class:"text"},"库存",-1),Q={class:"stock"},R={class:"stock-right"},T=b("虚拟"),W=b("卡密"),Y=b("实体"),Z=b("计时/次"),$=b("预约"),ee=b("批发"),ae={class:"grade-add-goods"},le=b("取消"),te=b("保存");q();var oe=s({expose:[],setup(s){const x=r(),j=u(),q=m(""),oe=m({grade:"",gradeName:"",describe:"",delivery:!0,enjoy:0,condition:"单项升级条件",last_order_amount:"",total_order_amount:"",last_recharge_amount:"",total_recharge_amount:"",total_order_nums:"",operationList:[],individual:"单次消费",multiple:[]}),re=m([]),ue=m(),de=m(0),ie=c({grade:[{required:!0,message:"请选择等级",trigger:"blur"}],gradeName:[{required:!0,message:"请输入等级名称",trigger:"blur"}],enjoy:[{required:!0,validator:async(e,a,l)=>{Number(a)>=.1&&Number(a)<=9.9&&""!=a?l():l(new Error("请输入0.1-9.9之间的数字"))},trigger:"blur"}],condition:[{required:!0,message:"请选择升级提交",trigger:"blur"}],last_order_amount:[{required:!0,message:"请选择单次消费",trigger:"blur"}],total_order_amount:[{required:!0,message:"请选择累计消费",trigger:"blur"}],last_recharge_amount:[{required:!0,message:"请选择单次充值",trigger:"blur"}],operationList:[{required:!0,message:"请选择指定商品",trigger:"blur"}],total_recharge_amount:[{required:!0,message:"请选择成交订单",trigger:"blur"}],total_order_nums:[{required:!0,message:"请选择成交订单",trigger:"blur"}],multiple:[{required:!0,message:"请至少选择一种",trigger:"blur"}]}),ne=()=>{q.value.validate((e=>{e&&se()}))};e().then((e=>{const a=[{name:"一级",weight:1},{name:"二级",weight:2},{name:"三级",weight:3},{name:"四级",weight:4},{name:"五级",weight:5},{name:"六级",weight:6},{name:"七级",weight:7},{name:"八级",weight:8}];e.data.data.splice(e.data.data.indexOf(0),1),a.forEach(((a,l)=>{a.state=!0,e.data.data.forEach((e=>{l+1==e&&(a.state=!1)}))})),re.value=a}));const se=async()=>{me(oe.value.grade,!0);const e=[];let t=0;oe.value.operationList.forEach((a=>e.push(a.id)));const o={name:oe.value.gradeName,level_name:oe.value.gradeName,weight:de.value,remark:oe.value.describe,discount:oe.value.delivery?10*Number(oe.value.enjoy):0,type:"单项升级条件"==oe.value.condition?"1":"不启用升级"==oe.value.condition?"0":"2"},r={last_order_amount:oe.value.last_order_amount,total_order_amount:oe.value.total_order_amount,last_recharge_amount:oe.value.last_recharge_amount,total_recharge_amount:oe.value.total_recharge_amount,total_order_nums:oe.value.total_order_nums,goods_ids:e},u={last_order_amount:"单次消费",total_order_amount:"累计消费",last_recharge_amount:"单次充值",total_recharge_amount:"累计充值",total_order_nums:"成交订单",operationList:"指定商品"},i={last_order_amount:1,total_order_amount:2,last_recharge_amount:4,total_recharge_amount:8,total_order_nums:16,operationList:32};if("单项升级条件"===oe.value.condition)switch(oe.value.individual){case"单次消费":t=1;break;case"累计消费":t=2;break;case"单次充值":t=4;break;case"累计充值":t=8;break;case"成交订单":t=16;break;case"指定商品":t=32}else Object.keys(u).forEach((e=>{oe.value.multiple.some((a=>a===u[e]))?t+=i[e]:Array.isArray(r[e])?r[e]=[]:r[e]=0}));o.condition=JSON.stringify(r),o.condition_need=t,"不启用升级"===oe.value.condition&&(o.condition_need=0),ue.value?(o.id=ue.value,await l(o)):await a(o),d.success("操作成功"),x.go(-1)},me=(e,a)=>{const l=["一级","二级","三级","四级","五级","六级","七级","八级"],t=[1,2,3,4,5,6,7,8];a?de.value=t[l.findIndex((a=>a==e))]:oe.value.grade=l[t.findIndex((a=>a==e))]},ce=async()=>{const e=await i({option:{commodity:!0}});oe.value.operationList.push(e.value.data)},_e=e=>{ve(),"单项升级条件"==e?(oe.value.multiple=[],oe.value.individual="单次消费"):"多项升级条件"==e&&(oe.value.individual="")},ve=()=>{oe.value.last_order_amount="",oe.value.total_order_amount="",oe.value.last_recharge_amount="",oe.value.total_recharge_amount="",oe.value.total_order_nums="",oe.value.operationList=[]},pe=()=>{ve()},ge=async()=>{const e={last_order_amount:"单次消费",total_order_amount:"累计消费",last_recharge_amount:"单次充值",total_recharge_amount:"累计充值",total_order_nums:"成交订单",goods_ids:"指定商品"},{data:a}=await t({id:ue.value}),l=a.data;l.condition.goods_ids.length&&l.condition.goods_ids.forEach((async e=>{const{data:a}=await o({id:e});oe.value.operationList.push(a.data.data[0])})),oe.value.condition="1"==l.type?"单项升级条件":"0"==l.type?"不启用升级":"多项升级条件","1"==l.type?(oe.value.multiple=[],Object.keys(e).forEach((a=>{l.condition_need.forEach((l=>{l==a&&(oe.value.individual=e[a])}))}))):"2"==l.type&&(oe.value.individual="",Object.keys(e).forEach((a=>{l.condition_need.forEach((l=>{l==a&&oe.value.multiple.push(e[a])}))}))),oe.value.last_order_amount=l.condition.last_order_amount,oe.value.last_recharge_amount=l.condition.last_recharge_amount,oe.value.total_order_nums=l.condition.total_order_nums,oe.value.total_order_amount=l.condition.total_order_amount,oe.value.total_recharge_amount=l.condition.total_recharge_amount,oe.value.gradeName=l.level_name,oe.value.describe=l.remark,oe.value.delivery=0!=l.discount,oe.value.enjoy=l.discount/10,me(l.weight,!1)};return _((()=>{j.query.id&&(ue.value=j.query.id,ge())})),E(((e,a)=>{const l=v("el-radio-button"),t=v("el-radio-group"),o=v("el-form-item"),r=v("el-input"),u=v("el-switch"),d=v("el-radio"),i=v("el-checkbox-button"),s=v("el-checkbox-group"),m=v("el-button"),c=v("el-image"),_=v("el-tag"),j=v("el-col"),de=v("el-row"),se=v("el-form"),me=v("el-card");return p(),g(me,{shadow:"never",class:"create-grade"},{default:E((()=>[y(se,{ref:q,model:oe.value,"label-width":"130px",rules:w(ie)},{default:E((()=>[y(o,{label:"新增等级",prop:"grade"},{default:E((()=>[y(t,{modelValue:oe.value.grade,"onUpdate:modelValue":a[1]||(a[1]=e=>oe.value.grade=e),size:"small",class:"grade-radio check"},{default:E((()=>[(p(!0),g(h,null,f(re.value,(e=>(p(),g(l,{disabled:!e.state||ue.value,label:e.name,key:e},{default:E((()=>[b(k(e.name),1)])),_:2},1032,["disabled","label"])))),128)),L])),_:1},8,["modelValue"])])),_:1}),y(o,{label:"等级名称",prop:"gradeName"},{default:E((()=>[y(r,{modelValue:oe.value.gradeName,"onUpdate:modelValue":a[2]||(a[2]=e=>oe.value.gradeName=e),placeholder:"请输入等级名称",class:"grade-form-width",maxlength:"6","show-word-limit":""},null,8,["modelValue"])])),_:1}),y(o,{label:"等级描述"},{default:E((()=>[y(r,{class:"grade-form-width",placeholder:"请输入等级描述",type:"textarea",modelValue:oe.value.describe,"onUpdate:modelValue":a[3]||(a[3]=e=>oe.value.describe=e)},null,8,["modelValue"])])),_:1}),y(o,{label:"会员折扣"},{default:E((()=>[y(u,{modelValue:oe.value.delivery,"onUpdate:modelValue":a[4]||(a[4]=e=>oe.value.delivery=e)},null,8,["modelValue"])])),_:1}),oe.value.delivery?(p(),g(o,{key:0,label:"当前可享受的值",prop:"enjoy"},{default:E((()=>[y(r,{class:"grade-form-width",modelValue:oe.value.enjoy,"onUpdate:modelValue":a[5]||(a[5]=e=>oe.value.enjoy=e),type:"number"},{append:E((()=>[U])),_:1},8,["modelValue"]),F])),_:1})):V("",!0),y(o,{label:"升级条件",prop:"condition"},{default:E((()=>[y(t,{modelValue:oe.value.condition,"onUpdate:modelValue":a[6]||(a[6]=e=>oe.value.condition=e),onChange:_e},{default:E((()=>[(p(),g(h,null,f(["单项升级条件","多项升级条件","不启用升级"],(e=>y(d,{label:e,key:e},null,8,["label"]))),64))])),_:1},8,["modelValue"])])),_:1}),"单项升级条件"==oe.value.condition?(p(),g(o,{key:1},{default:E((()=>[y(t,{class:"grade-radio-consumption check",modelValue:oe.value.individual,"onUpdate:modelValue":a[7]||(a[7]=e=>oe.value.individual=e),onChange:pe},{default:E((()=>[(p(),g(h,null,f(["单次消费","累计消费","单次充值","累计充值","成交订单","指定商品"],(e=>y(l,{label:e,key:e},null,8,["label"]))),64))])),_:1},8,["modelValue"])])),_:1})):V("",!0),"多项升级条件"==oe.value.condition?(p(),g(o,{key:2,prop:"multiple"},{default:E((()=>[y(s,{class:"grade-radio-consumption check",modelValue:oe.value.multiple,"onUpdate:modelValue":a[8]||(a[8]=e=>oe.value.multiple=e)},{default:E((()=>[(p(),g(h,null,f(["单次消费","累计消费","单次充值","累计充值","成交订单","指定商品"],(e=>y(i,{label:e,key:e},null,8,["label"]))),64))])),_:1},8,["modelValue"])])),_:1})):V("",!0),"不启用升级"!=oe.value.condition?(p(),g(h,{key:3},["单次消费"==oe.value.individual||oe.value.multiple.find((e=>"单次消费"==e))?(p(),g(o,{key:0,label:"单次消费",prop:"last_order_amount"},{default:E((()=>[y(r,{class:"grade-form-width",modelValue:oe.value.last_order_amount,"onUpdate:modelValue":a[9]||(a[9]=e=>oe.value.last_order_amount=e),type:"number",onInput:a[10]||(a[10]=e=>oe.value.last_order_amount=w(n)(oe.value.last_order_amount))},{append:E((()=>[N])),_:1},8,["modelValue"])])),_:1})):V("",!0),"累计消费"==oe.value.individual||oe.value.multiple.find((e=>"累计消费"==e))?(p(),g(o,{key:1,label:"累计消费",prop:"total_order_amount"},{default:E((()=>[y(r,{class:"grade-form-width",modelValue:oe.value.total_order_amount,"onUpdate:modelValue":a[11]||(a[11]=e=>oe.value.total_order_amount=e),type:"number",onInput:a[12]||(a[12]=e=>oe.value.total_order_amount=w(n)(oe.value.total_order_amount))},{append:E((()=>[C])),_:1},8,["modelValue"])])),_:1})):V("",!0),"单次充值"==oe.value.individual||oe.value.multiple.find((e=>"单次充值"==e))?(p(),g(o,{key:2,label:"单次充值",prop:"last_recharge_amount"},{default:E((()=>[y(r,{class:"grade-form-width",modelValue:oe.value.last_recharge_amount,"onUpdate:modelValue":a[13]||(a[13]=e=>oe.value.last_recharge_amount=e),type:"number",onInput:a[14]||(a[14]=e=>oe.value.last_recharge_amount=w(n)(oe.value.last_recharge_amount))},{append:E((()=>[I])),_:1},8,["modelValue"])])),_:1})):V("",!0),"累计充值"==oe.value.individual||oe.value.multiple.find((e=>"累计充值"==e))?(p(),g(o,{key:3,label:"累计充值",prop:"total_recharge_amount"},{default:E((()=>[y(r,{class:"grade-form-width",modelValue:oe.value.total_recharge_amount,"onUpdate:modelValue":a[15]||(a[15]=e=>oe.value.total_recharge_amount=e),type:"number",onInput:a[16]||(a[16]=e=>oe.value.total_recharge_amount=w(n)(oe.value.total_recharge_amount))},{append:E((()=>[z])),_:1},8,["modelValue"])])),_:1})):V("",!0),"成交订单"==oe.value.individual||oe.value.multiple.find((e=>"成交订单"==e))?(p(),g(o,{key:4,label:"成交订单",prop:"total_order_nums"},{default:E((()=>[y(r,{class:"grade-form-width",modelValue:oe.value.total_order_nums,"onUpdate:modelValue":a[17]||(a[17]=e=>oe.value.total_order_nums=e),modelModifiers:{number:!0},type:"number"},{append:E((()=>[D])),_:1},8,["modelValue"])])),_:1})):V("",!0),"指定商品"==oe.value.individual||oe.value.multiple.find((e=>"指定商品"==e))?(p(),g(h,{key:5},[y(o,{label:"指定商品",prop:"operationList"},{default:E((()=>[y(m,{type:"primary",onClick:ce},{default:E((()=>[O])),_:1}),A])),_:1}),y(de,{gutter:10,class:"commodity-box"},{default:E((()=>[oe.value.operationList.length?(p(!0),g(h,{key:0},f(oe.value.operationList,((e,a)=>(p(),g(j,{key:a,xl:3,lg:5,md:6,sm:6,xs:6,class:"commodity-item"},{default:E((()=>[y("div",{class:["commodity-item-son",{"change-color":!0}]},[y("div",{class:"location-picture",onClick:e=>(e=>{oe.value.operationList.splice(e,1)})(a)},[y(c,{src:"/addons/weitshop_shop/weshop/public/home/backend/images/member/wrong.png"})],8,["onClick"]),y("div",B,[y(c,{src:e.main_picture,class:"commodity-img"},null,8,["src"])]),y("div",J,[y("div",H,k(e.title),1),y("div",K,[M,y("span",P,"¥"+k(e.price),1)]),y("div",S,[y("div",X,[G,y("span",Q,k(e.stock),1)]),y("div",R,["2"==e.goods_type?(p(),g(_,{key:0,size:"mini",color:"#D4EBFF",style:{color:"#55adff"}},{default:E((()=>[T])),_:1})):V("",!0),"3"==e.goods_type?(p(),g(_,{key:1,size:"mini",color:"#FBDDD1",style:{color:"#ec672e"}},{default:E((()=>[W])),_:1})):V("",!0),"1"==e.goods_type?(p(),g(_,{key:2,size:"mini",color:"#E4FFF8",style:{color:"#1ad370"}},{default:E((()=>[Y])),_:1})):V("",!0),"4"==e.goods_type?(p(),g(_,{key:3,size:"mini",color:"#F4DFD3",style:{color:"#ef864c"}},{default:E((()=>[Z])),_:1})):V("",!0),"5"==e.goods_type?(p(),g(_,{key:4,size:"mini",color:"#F8E8CF",style:{color:"#dd8a0d"}},{default:E((()=>[$])),_:1})):V("",!0),"6"==e.goods_type?(p(),g(_,{key:5,size:"mini",color:"#E9D4F9",style:{color:"#8f29df"}},{default:E((()=>[ee])),_:1})):V("",!0)])])])])])),_:2},1024)))),128)):V("",!0)])),_:1})],64)):V("",!0)],64)):V("",!0),y("div",ae,[y(m,{onClick:a[18]||(a[18]=e=>w(x).go(-1))},{default:E((()=>[le])),_:1}),y(m,{type:"primary",onClick:ne},{default:E((()=>[te])),_:1})])])),_:1},8,["model","rules"])])),_:1})}))}});oe.__scopeId="data-v-4796995e";export default oe;