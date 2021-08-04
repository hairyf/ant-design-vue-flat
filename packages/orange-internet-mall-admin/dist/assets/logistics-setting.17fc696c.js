import{b1 as e,c as l,b2 as a}from"./index.a53c91c6.js";import{a as u,l as o,e as t,m as s,b as d,o as i,c,g as n,F as p,s as r,t as v,u as m,k as y,p as g,X as V,h as f}from"./vendor.71e19cde.js";const K=y();g("data-v-10029d7c");const T=V("快递鸟"),_=V("快递100"),b=V("阿里云"),h=n("div",{class:"oe-flex"},[n("div",{class:"alicloud-text"},"开通阿里云接口可获得APPCODE"),n("div",{class:"alicloud-text alicloud-left"},"申请阿里云接口")],-1),x={class:"operation"},k=V("取消"),C=V("保存"),U={class:"delete-box"},A={class:"oe-flex"},I=n("i",{class:"el-icon-warning"},null,-1),w={class:"card-header"},N=n("div",{class:"card-header-title"},"提示",-1),P={class:"card-header-text"},W={class:"footer-right"},D=V("取消"),j=V("确定");f();var z=u({expose:[],setup(u){const y=o(),g=o({logisticsType:"",Key:"",userId:"",secretKey:"",companyNumber:"",secret:"",intelligent:"",alicloud:""}),V=o(""),f=o(""),z=o(!1),E=async()=>{const a={};"Kdn"==g.value.logisticsType?(a.id=g.value.userId,a.key=g.value.Key):"Kd100"==g.value.logisticsType?(a.key=g.value.secretKey,a.secret=g.value.secret,a.customer=g.value.companyNumber,a.ai=g.value.intelligent):a.app_code=g.value.alicloud,await e({key:g.value.logisticsType,param:a}),l.success("操作成功"),z.value=!1},O=()=>{V.value!=g.value.logisticsType?(z.value=!0,"Kdn"==g.value.logisticsType?f.value="快递鸟":"Kd100"==g.value.logisticsType?f.value="快递100":"AliWholeCountry"==g.value.logisticsType&&(f.value="阿里云")):E()},F=t((()=>"Kdn"==V.value?"快递鸟":"Kd100"==V.value?"快递100":"AliWholeCountry"==V.value?"阿里云":void 0)),S=async()=>{const{data:e}=await a(),l=e.data[0];e.data.length?(V.value=l.key,g.value.logisticsType=l.key,"Kdn"==l.key?(g.value.userId=l.value.id,g.value.Key=l.value.key):"Kd100"==l.key?(g.value.secretKey=l.value.key,g.value.companyNumber=l.value.customer,g.value.secret=l.value.secret,g.value.intelligent=l.value.ai):g.value.alicloud=l.value.app_code):(g.value.logisticsType="Kdn",V.value="Kdn")};return s((()=>S())),K(((e,l)=>{const a=d("el-radio"),u=d("el-form-item"),o=d("el-input"),t=d("el-button"),s=d("el-form"),V=d("el-card"),X=d("el-dialog");return i(),c(p,null,[n(V,{shadow:"never",class:"logistics-setting custom-crad-container"},{default:K((()=>[n(s,{ref:y,class:"setting-from",model:g.value,"label-width":"200px"},{default:K((()=>[n(u,{label:"物流类型",prop:"open"},{default:K((()=>[n(a,{modelValue:g.value.logisticsType,"onUpdate:modelValue":l[1]||(l[1]=e=>g.value.logisticsType=e),label:"Kdn"},{default:K((()=>[T])),_:1},8,["modelValue"]),n(a,{modelValue:g.value.logisticsType,"onUpdate:modelValue":l[2]||(l[2]=e=>g.value.logisticsType=e),label:"Kd100"},{default:K((()=>[_])),_:1},8,["modelValue"]),n(a,{modelValue:g.value.logisticsType,"onUpdate:modelValue":l[3]||(l[3]=e=>g.value.logisticsType=e),label:"AliWholeCountry"},{default:K((()=>[b])),_:1},8,["modelValue"])])),_:1}),"Kdn"==g.value.logisticsType?(i(),c(p,{key:0},[n(u,{label:"用户ID",prop:"integralTetx"},{default:K((()=>[n(o,{modelValue:g.value.userId,"onUpdate:modelValue":l[4]||(l[4]=e=>g.value.userId=e),class:"most-inp",placeholder:"请输入"},null,8,["modelValue"])])),_:1}),n(u,{label:"Api Key",prop:"integralTetx"},{default:K((()=>[n(o,{modelValue:g.value.Key,"onUpdate:modelValue":l[5]||(l[5]=e=>g.value.Key=e),class:"most-inp",placeholder:"请输入"},null,8,["modelValue"])])),_:1})],64)):r("",!0),"Kd100"==g.value.logisticsType?(i(),c(p,{key:1},[n(u,{label:"授权密匙(Key)",prop:"integralTetx"},{default:K((()=>[n(o,{modelValue:g.value.secretKey,"onUpdate:modelValue":l[6]||(l[6]=e=>g.value.secretKey=e),class:"most-inp",placeholder:"请输入"},null,8,["modelValue"])])),_:1}),n(u,{label:"公司编号(Customer)",prop:"integralTetx"},{default:K((()=>[n(o,{modelValue:g.value.companyNumber,"onUpdate:modelValue":l[7]||(l[7]=e=>g.value.companyNumber=e),class:"most-inp",placeholder:"请输入"},null,8,["modelValue"])])),_:1}),n(u,{label:"Secret",prop:"integralTetx"},{default:K((()=>[n(o,{modelValue:g.value.secret,"onUpdate:modelValue":l[8]||(l[8]=e=>g.value.secret=e),class:"most-inp",placeholder:"请输入"},null,8,["modelValue"])])),_:1}),n(u,{label:"智能判断",prop:"integralTetx"},{default:K((()=>[n(o,{modelValue:g.value.intelligent,"onUpdate:modelValue":l[9]||(l[9]=e=>g.value.intelligent=e),class:"most-inp",placeholder:"请输入"},null,8,["modelValue"])])),_:1})],64)):r("",!0),"AliWholeCountry"==g.value.logisticsType?(i(),c(u,{key:2,label:"阿里云APPCODE",prop:"integralTetx"},{default:K((()=>[n(o,{modelValue:g.value.alicloud,"onUpdate:modelValue":l[10]||(l[10]=e=>g.value.alicloud=e),class:"most-inp",placeholder:"请输入"},null,8,["modelValue"]),h])),_:1})):r("",!0),n(u,null,{default:K((()=>[n("div",x,[n(t,{plain:"",onClick:S},{default:K((()=>[k])),_:1}),n(t,{type:"primary",onClick:O},{default:K((()=>[C])),_:1})])])),_:1})])),_:1},8,["model"])])),_:1}),n("div",U,[n(X,{modelValue:z.value,"onUpdate:modelValue":l[12]||(l[12]=e=>z.value=e),width:"550px"},{title:K((()=>[n("div",A,[I,n("div",w,[N,n("div",P,"您确定要切换到"+v(f.value)+"吗?切换之后"+v(m(F))+"下面配置的物流信息将无法在系统查询，如要查询，请复制物流单号到百度查",1)])])])),footer:K((()=>[n("div",W,[n(t,{size:"mini",onClick:l[11]||(l[11]=e=>z.value=!1)},{default:K((()=>[D])),_:1}),n(t,{size:"mini",type:"primary",onClick:E},{default:K((()=>[j])),_:1})])])),_:1},8,["modelValue"])])],64)}))}});z.__scopeId="data-v-10029d7c";export default z;
