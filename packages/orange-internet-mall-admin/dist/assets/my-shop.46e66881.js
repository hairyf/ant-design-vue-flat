import{u as e,a,f as s,_ as t,r as l,c as i,T as o,b as c,d as n,e as d,g as r,h as p}from"./index.a53c91c6.js";import{a as u,l as m,w as g,b as f,o as v,c as h,g as x,F as w,P as y,s as k,t as _,u as C,k as b,p as z,X as S,h as P}from"./vendor.71e19cde.js";const T=b();z("data-v-17e60d64");const j={class:"shop-crad-header oe-flex oe-row-between"},B=x("div",{class:"add-button-box"},[x("i",{class:"ad-shapePlus"}),x("span",{class:"text"},"新增店铺模板")],-1),q={class:"shop-crad-header-options"},U={class:"options-item"},V=x("span",{class:"tips"},"模板名称",-1),W={class:"header oe-flex oe-row-right"},A={key:0,class:"silk-ribbon"},E={class:"content oe-flex"},F={class:"image-slot"},G={class:"right-column oe-flex oe-flex-1"},H={class:"template-info oe-flex-1"},I={class:"title"},X=x("i",{class:"ad-edit"},null,-1),D={class:"oe-flex"},J=S("确认"),K={class:"tips-text"},L=x("span",{class:"tips"},"支持渠道：",-1),M={class:"text"},N={key:0,class:"ad-official-account"},O={key:1,class:"ad-applets"},Q={key:2,class:"ad-html5"},R={class:"tips-text"},Y=x("span",{class:"tips"},"最近修改：",-1),Z={class:"text"},$={class:"tips-text"},ee=x("span",{class:"tips"},"到期时间：",-1),ae={class:"text"},se=x("div",{class:"tips-text"},[x("span",{class:"tips"},"包含页面："),x("span",{class:"text"},"首页、商品详情、会员中心")],-1),te={class:"buttons oe-flex"},le=S(" 装修店铺 "),ie=S(" 发布 "),oe={class:"control oe-flex"},ce=S(" 预览 "),ne={class:"oe-flex oe-row-center"},de=x("i",{class:"ad-shenglvehao"},null,-1),re=S("删除"),pe={class:"oe-flex oe-row-center"};P();var ue=u({expose:[],setup(u){const b=e(),z={1:"永久",2:"按月",3:"按年",4:"永久",5:"免费"},S=m(""),P=m([]),ue=m(""),me=async()=>{const{data:e}=await p({page:ge.currentPage,limit:ge.pageSize});P.value=e.data.data,P.value.forEach((e=>{e.isShow=!1})),ge.total=e.data.total},{pn:ge,hsc:fe,hcc:ve}=a({pageSizes:[6,12,18],pageSize:6});g([()=>ge.currentPage,()=>ge.pageSize],(()=>me()),{immediate:!0});const he=async()=>{const e=await o(),{data:a}=await c(e.id);b.push({path:"decorate",query:{id:a.data.id}})};return T(((e,a)=>{const o=f("el-button"),c=f("el-input"),p=f("el-image"),u=f("el-popover"),m=f("el-link"),g=f("qr-code"),xe=f("el-dropdown-item"),we=f("el-dropdown-menu"),ye=f("el-dropdown"),ke=f("el-card"),_e=f("el-col"),Ce=f("el-row"),be=f("el-empty"),ze=f("el-pagination");return v(),h(ke,{shadow:"never",class:"custom-crad-container"},{default:T((()=>[x("div",j,[x(o,{size:"small",class:"add-goods",type:"primary",onClick:he},{default:T((()=>[B])),_:1}),x("div",q,[x("div",U,[V,x(c,{placeholder:"请输入模板名称"})])])]),x(Ce,{class:"template-list",gutter:40},{default:T((()=>[(v(!0),h(w,null,y(P.value,((e,f)=>(v(),h(_e,{sm:12,lg:8,class:"template-item",key:f},{default:T((()=>[x(ke,{shadow:"never"},{default:T((()=>[x("div",W,[1==e.is_publish?(v(),h("div",A,"发布中")):k("",!0)]),x("div",E,[x(p,{class:"template-image-lg",fit:"cover",src:e.img},{error:T((()=>[x("div",F,[x(p,{fit:"cover",src:"/addons/weitshop_shop/weshop/public/home/backend/images/classificationGoods/default-image.png"})])])),_:2},1032,["src"]),x("div",G,[x("div",H,[x("div",I,[x(u,{trigger:"click",visible:e.isShow,"onUpdate:visible":a=>e.isShow=a,width:"300px",onShow:a=>S.value=e.name},{reference:T((()=>[x("span",{style:{cursor:"pointer"},onClick:a=>e.isShow=!e.isShow},[x("span",null,_(e.name),1),X],8,["onClick"])])),default:T((()=>[x("div",D,[x(c,{class:"oe-m-r-15",modelValue:S.value,"onUpdate:modelValue":a[1]||(a[1]=e=>S.value=e),placeholder:"请输入内容"},null,8,["modelValue"]),x(o,{size:"small",onClick:a=>(async e=>{await r({id:e,name:S.value}),me(),i.success("修改成功!")})(e.id)},{default:T((()=>[J])),_:2},1032,["onClick"])])])),_:2},1032,["visible","onUpdate:visible","onShow"])]),x("div",K,[L,x("span",M,[(v(!0),h(w,null,y(e.shop_channel_code,((e,a)=>(v(),h(w,{key:a},["Wechat"===e?(v(),h("i",N)):k("",!0),"WechatApplets"===e?(v(),h("i",O)):k("",!0),"H5"===e?(v(),h("i",Q)):k("",!0)],64)))),128))])]),x("div",R,[Y,x("span",Z,_(C(s)(e.update_time)),1)]),x("div",$,[ee,x("span",ae,_(z[e.sale_type]),1)]),se]),x("div",te,[x(o,{size:"small",class:"oe-flex-1",type:"primary",onClick:a=>C(b).push({path:"decorate",query:{id:e.id}})},{default:T((()=>[le])),_:2},1032,["onClick"]),x(o,{size:"small",class:"oe-flex-1 custom",plain:"",onClick:a=>(async e=>{await t.confirm("确定发布该模板吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}),await l({id:e,is_timing:0}),i.success("发布成功!"),me()})(e.id)},{default:T((()=>[ie])),_:2},1032,["onClick"])]),x("div",oe,[x(u,{placement:"bottom",trigger:"click"},{reference:T((()=>[x(m,{type:"primary",class:"oe-m-r-15",underline:!1,href:"javascript:;",onClick:a=>(async e=>{const{data:a}=await n({type:"browse",id:e});ue.value=a.data})(e.id)},{default:T((()=>[ce])),_:2},1032,["onClick"])])),default:T((()=>[x("div",ne,[x(g,{text:ue.value,size:"100"},null,8,["text"])])])),_:2},1024),1!=e.is_publish?(v(),h(ye,{key:0},{dropdown:T((()=>[x(we,null,{default:T((()=>[x(xe,{onClick:a=>(async e=>{await t.confirm("确定要删除该模板?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}),await d(e),me()})(e.id)},{default:T((()=>[re])),_:2},1032,["onClick"])])),_:2},1024)])),default:T((()=>[de])),_:2},1024)):k("",!0)])])])])),_:2},1024)])),_:2},1024)))),128))])),_:1}),x("div",pe,[P.value.length?k("",!0):(v(),h(be,{key:0,class:"oe-m-30",description:"暂无模板"}))]),x(ze,{class:"right-buttom-pagination",onSizeChange:C(fe),onCurrentChange:C(ve),"current-page":C(ge).currentPage,"page-sizes":C(ge).pageSizes,"page-size":C(ge).pageSize,layout:"total, sizes, prev, pager, next, jumper",total:C(ge).total},null,8,["onSizeChange","onCurrentChange","current-page","page-sizes","page-size","total"])])),_:1})}))}});ue.__scopeId="data-v-17e60d64";export default ue;