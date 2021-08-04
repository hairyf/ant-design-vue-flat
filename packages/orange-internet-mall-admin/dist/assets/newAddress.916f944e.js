import{u as e,j as a,bb as l,c as u,aA as n}from"./index.a53c91c6.js";import{q as i}from"./order.28ff7f57.js";import{a as o,l as d,m as r,b as v,o as s,c,g as t,F as p,P as m,u as f,k as _,p as h,X as g,h as b}from"./vendor.71e19cde.js";const V=_();h("data-v-5b414968");const y={class:"oe-flex"},w={class:"oe-flex"},k=g("取消"),x=g("保存");b();var q=o({expose:[],setup(o){const _=e(),h=a(),g=d(""),b=d({title:"",consignee:"",phone:"",province:[{name:"",id:""},{name:"",id:""},{name:"",id:""}],address:"",is_default:!1}),q=d(""),U=d([]),E=d([]),j=d([]),C=d(),A=d({title:[{required:!0,message:"请填写退款地址名称",trigger:"blur"}],consignee:[{required:!0,message:"请填写收货人名称",trigger:"blur"}],phone:[{required:!0,validator:(e,a,l)=>{const u=/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(a);""==a&&l(new Error("联系方式不能为空")),u||l(new Error("请输入正确的联系方式")),l()},trigger:"blur"}],province:[{required:!0,validator:(e,a,l)=>{""==b.value.province[0]||""==b.value.province[1]||""==b.value.province[2]?l(new Error("请选全省市区")):l()},trigger:"blur"}],address:[{required:!0,message:"请填写详细地址",trigger:"blur"}]}),F=e=>{E.value=e.children,b.value.province[1]={},b.value.province[2]={},j.value=[]},I=e=>{j.value=e.children,b.value.province[2]=""},P=()=>{g.value.validate((e=>{e&&X()}))},X=async()=>{q.value?await l({id:q.value,title:b.value.title,phone:b.value.phone,consignee:b.value.consignee,address:b.value.address,province_name:b.value.province[0].name,province_id:b.value.province[0].id,city_name:b.value.province[1].name,city_id:b.value.province[1].id,area_name:b.value.province[2].name,area_id:b.value.province[2].id,is_default:1==b.value.is_default?1:0}):await l({title:b.value.title,phone:b.value.phone,consignee:b.value.consignee,address:b.value.address,province_name:b.value.province[0].name,province_id:b.value.province[0].id,city_name:b.value.province[1].name,city_id:b.value.province[1].id,area_name:b.value.province[2].name,area_id:b.value.province[2].id,is_default:1==b.value.is_default?1:0}),u.success("操作成功"),_.go(-1)};return r((()=>{h.query.id&&(q.value=h.query.id,(async()=>{const{data:e}=await i({id:q.value});C.value=e.data.data[0],b.value.title=C.value.title,b.value.phone=C.value.phone,b.value.consignee=C.value.consignee,b.value.address=C.value.address,b.value.is_default=1==C.value.is_default})()),(async()=>{const{data:e}=await n();U.value=e.data,C.value&&U.value.forEach((e=>{e.id==C.value.province_id&&(b.value.province[0]=e,F(e),e.children.forEach((e=>{e.id==C.value.city_id&&(b.value.province[1]=e,I(e),e.children.forEach((e=>{e.id==C.value.area_id&&(b.value.province[2]=e)})))})))}))})()})),V(((e,a)=>{const l=v("el-input"),u=v("el-form-item"),n=v("el-option"),i=v("el-select"),o=v("el-switch"),d=v("el-button"),r=v("el-form"),h=v("el-card");return s(),c(h,{shadow:"never",class:"newAddress-box"},{default:V((()=>[t(r,{model:b.value,ref:g,rules:A.value,"label-width":"120px",class:"notice-box"},{default:V((()=>[t(u,{label:"退货地址名称",prop:"title"},{default:V((()=>[t(l,{class:"unified-inp",modelValue:b.value.title,"onUpdate:modelValue":a[1]||(a[1]=e=>b.value.title=e),placeholder:"请输入退货地址名称"},null,8,["modelValue"])])),_:1}),t(u,{label:"收货人姓名",prop:"consignee"},{default:V((()=>[t(l,{class:"unified-inp",modelValue:b.value.consignee,"onUpdate:modelValue":a[2]||(a[2]=e=>b.value.consignee=e),placeholder:"请输入收货人姓名"},null,8,["modelValue"])])),_:1}),t(u,{label:"联系方式",prop:"phone"},{default:V((()=>[t(l,{class:"unified-inp",modelValue:b.value.phone,"onUpdate:modelValue":a[3]||(a[3]=e=>b.value.phone=e),placeholder:"请输入联系方式"},null,8,["modelValue"])])),_:1}),t(u,{label:"所属区域",prop:"province"},{default:V((()=>[t("div",y,[t(i,{modelValue:b.value.province[0],"onUpdate:modelValue":a[4]||(a[4]=e=>b.value.province[0]=e),placeholder:"请选择",clearable:"",onChange:F,class:"province-inp","value-key":"name"},{default:V((()=>[(s(!0),c(p,null,m(U.value,(e=>(s(),c(n,{"value-key":"company_name",key:e.name,label:e.name,value:e},null,8,["label","value"])))),128))])),_:1},8,["modelValue"]),t(i,{class:"province-inp","value-key":"name",onChange:I,clearable:"",modelValue:b.value.province[1],"onUpdate:modelValue":a[5]||(a[5]=e=>b.value.province[1]=e),placeholder:"请选择",style:{margin:"0 30px"}},{default:V((()=>[(s(!0),c(p,null,m(E.value,(e=>(s(),c(n,{key:e.name,label:e.name,value:e},null,8,["label","value"])))),128))])),_:1},8,["modelValue"]),t(i,{class:"province-inp","value-key":"name",modelValue:b.value.province[2],"onUpdate:modelValue":a[6]||(a[6]=e=>b.value.province[2]=e),placeholder:"请选择",clearable:""},{default:V((()=>[(s(!0),c(p,null,m(j.value,(e=>(s(),c(n,{key:e.name,label:e.name,value:e},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])])),_:1}),t(u,{label:"详细地址",prop:"address"},{default:V((()=>[t(l,{class:"unified-inp",modelValue:b.value.address,"onUpdate:modelValue":a[7]||(a[7]=e=>b.value.address=e),placeholder:"请输入详细地址"},null,8,["modelValue"])])),_:1}),t(u,{label:"是否设为默认",prop:"is_default"},{default:V((()=>[t(o,{modelValue:b.value.is_default,"onUpdate:modelValue":a[8]||(a[8]=e=>b.value.is_default=e)},null,8,["modelValue"])])),_:1}),t(u,null,{default:V((()=>[t("div",w,[t(d,{onClick:a[9]||(a[9]=e=>f(_).go(-1))},{default:V((()=>[k])),_:1}),t(d,{type:"primary",onClick:P},{default:V((()=>[x])),_:1})])])),_:1})])),_:1},8,["model","rules"])])),_:1})}))}});q.__scopeId="data-v-5b414968";export default q;
