import{a as e,l as a,w as l,b as s,o as t,c as o,g as d,u as i,f as u,k as n,p as c,X as r,h as p,r as m,Z as f,F as v,P as g,t as h,s as _,d as b}from"./vendor.71e19cde.js";import{u as y,c as x,a as w,f as k,_ as V}from"./index.a53c91c6.js";import{f as C,e as z,j as D,k as S,l as U,m as j}from"./marketing.64a7433e.js";const L=n();c("data-v-85da90d2");const B=r("折扣券"),P=r("满减券"),E={class:"footer"},A=r("优惠券设置"),F={class:"dialog-footer"},q=r("取 消"),G=r("确 定");p();var I=e({expose:[],props:{addDialogVisible:{type:Boolean,required:!0},sendValueList:{type:Array}},setup(e,{emit:n}){const c=e,r=y(),p=a([]),m=async()=>{const e=await z({page:1,limit:2e3,search:{name:v.value,status:"1",stock:"1"}});p.value=e.data.data.data},f=()=>{if(h.value.length>0){const e=[];h.value.forEach((a=>{e.push(a.id)})),e.forEach((async e=>{await C({send_type:"1",send_num:"1",coupon_id:e,send_value:c.sendValueList})})),n("update:addDialogVisible",!1),x.success("发放优惠券成功!")}else x.error("请选择要发放的优惠券")},v=a("");l(v,m),a([]);const g=a(),h=a([]),_=()=>{h.value.length?b.value=!0:b.value=!1},b=a(!1),w=e=>{h.value=e};return l((()=>c.addDialogVisible),(e=>{1==e&&m()})),L(((a,l)=>{const n=s("el-input"),c=s("el-table-column"),m=s("el-tag"),h=s("el-table"),b=s("el-button"),y=s("el-dialog");return t(),o(y,{title:"添加优惠券",modelValue:e.addDialogVisible,"onUpdate:modelValue":l[4]||(l[4]=e=>u(addDialogVisible)?addDialogVisible.value=e:null),width:"30%"},{footer:L((()=>[d("div",E,[d(b,{onClick:l[2]||(l[2]=e=>i(r).push("/marke/coupon/allCoupon")),type:"text"},{default:L((()=>[A])),_:1}),d("span",F,[d(b,{onClick:l[3]||(l[3]=a=>e.addDialogVisible=!1)},{default:L((()=>[q])),_:1}),d(b,{type:"primary",onClick:f},{default:L((()=>[G])),_:1})])])])),default:L((()=>[d("div",null,[d(n,{style:{width:"50%"},placeholder:"请输入内容","suffix-icon":"el-icon-search",modelValue:v.value,"onUpdate:modelValue":l[1]||(l[1]=e=>v.value=e)},null,8,["modelValue"]),d(h,{"max-height":"400",border:!1,class:"goods-list",ref:g,data:p.value,"tooltip-effect":"dark",style:{width:"100%"},onSelectAll:_,onSelectionChange:w},{default:L((()=>[d(c,{type:"selection",width:"55"}),d(c,{label:"优惠券名称",prop:"name"}),d(c,{label:"类型",prop:"name"},{default:L((e=>[2==e.row.type?(t(),o(m,{key:0,type:"success"},{default:L((()=>[B])),_:1})):(t(),o(m,{key:1,type:"danger"},{default:L((()=>[P])),_:1}))])),_:1}),d(c,{label:"使用说明",prop:"explain"})])),_:1},8,["data"])])])),_:1},8,["modelValue"])}))}});I.__scopeId="data-v-85da90d2";const K=n();c("data-v-0e8a6a46");const R={class:"all-coupon-box"},T={class:"oe-flex is-grid"},$=d("div",{class:"screen-text"},"群体名称",-1),O={class:"oe-flex is-grid"},X=d("div",{class:"screen-text"},"状态",-1),Z={class:"oe-flex is-grid"},H=d("div",{class:"screen-text"},"新增时间",-1),J={class:"oe-flex is-grid"},M=r("搜索"),N={class:"card-header"},Q=d("div",{class:"add-button-box"},[d("i",{class:"ad-shapePlus"}),d("span",{class:"text"},"新增群体")],-1),W={key:0,style:{color:"#1ad370"}},Y={key:1,style:{color:"#ff0000"}},ee={class:"edit oe-flex"},ae=r("刷新"),le=r("发券"),se={class:"edit oe-flex"},te=r("编辑"),oe=r("更多"),de=r("导出"),ie=r("删除");p();var ue=e({expose:[],setup(e){const{pagination:u,handleSizeChange:n,handleCurrentChange:c}=w(),p=a(!1),y=a([]),C=a([]),z=m([{value:"0",label:"未使用"},{value:"1",label:"已使用"}]),L=()=>{B.value.search_name="",P.value="",B.value.search_status=""},B=a({search_name:"",search_createtime:"",search_status:""}),P=a(""),E=async()=>{""!=P.value&&null!=P.value?B.value.search_createtime=b(P.value).unix():null==P.value&&(B.value.search_createtime="");const e={search:B.value,page:u.currentPage,limit:u.pageSize},{data:a}=await j(e);u.total=a.data.total,C.value=a.data.data};return l([()=>u.currentPage,()=>u.pageSize],(()=>E()),{immediate:!0}),K(((e,a)=>{const l=s("el-input"),m=s("el-col"),b=s("el-option"),w=s("el-select"),j=s("el-date-picker"),A=s("el-button"),F=s("el-row"),q=s("el-card"),G=s("el-empty"),ue=s("el-table-column"),ne=s("custom-button"),ce=s("el-dropdown-item"),re=s("el-dropdown-menu"),pe=s("el-dropdown"),me=s("el-table"),fe=s("el-pagination");return t(),o("div",R,[d(q,{shadow:"never",class:"screen-box"},{default:K((()=>[d(F,{gutter:80},{default:K((()=>[d(m,{xl:5,md:8,sm:12,class:"oe-flex"},{default:K((()=>[d("div",T,[$,d(l,{onKeyup:f(E,["enter"]),class:"oe-flex-1",modelValue:B.value.search_name,"onUpdate:modelValue":a[1]||(a[1]=e=>B.value.search_name=e),placeholder:"请输入群体名称"},null,8,["onKeyup","modelValue"])])])),_:1}),d(m,{xl:5,md:8,sm:12,class:"oe-flex"},{default:K((()=>[d("div",O,[X,d(w,{modelValue:B.value.search_status,"onUpdate:modelValue":a[2]||(a[2]=e=>B.value.search_status=e),placeholder:"全部",class:"oe-flex-1",clearable:""},{default:K((()=>[(t(!0),o(v,null,g(i(z),(e=>(t(),o(b,{key:e.value,label:e.label,value:e.value},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])])),_:1}),d(m,{xl:5,md:8,sm:12,class:"oe-flex"},{default:K((()=>[d("div",Z,[H,d(j,{class:"oe-flex-1",modelValue:P.value,"onUpdate:modelValue":a[3]||(a[3]=e=>P.value=e),type:"date",placeholder:"优惠券新增时间"},null,8,["modelValue"])])])),_:1}),d(m,{xl:5,md:8,sm:12,class:"oe-flex"},{default:K((()=>[d("div",J,[d(A,{onClick:a[4]||(a[4]=e=>E()),type:"primary",size:"small"},{default:K((()=>[M])),_:1}),d("div",{class:"reset-text",onClick:L},"重置条件")])])),_:1})])),_:1})])),_:1}),d(q,{shadow:"never",class:"refund-list custom-crad-container custom-card-page"},{header:K((()=>[d("div",N,[d(A,{type:"primary",class:"add-goods",size:"small",onClick:a[5]||(a[5]=a=>e.$router.push("/marke/addGroup"))},{default:K((()=>[Q])),_:1})])])),default:K((()=>[d(me,{class:"revenue-list",data:C.value,style:{width:"100%"}},{empty:K((()=>[d(G,{class:"oe-m-t-30",description:"暂无群体"})])),default:K((()=>[d(ue,{prop:"name",label:"群体名称","min-width":"150"}),d(ue,{prop:"nums",label:"人数","min-width":"150"}),d(ue,{prop:"updatetime",label:"新增时间","min-width":"160"},{default:K((e=>[r(h(i(k)(e.row.updatetime)),1)])),_:1}),d(ue,{prop:"name",label:"状态"},{default:K((e=>[0==e.row.status?(t(),o("span",W,"未使用")):_("",!0),1==e.row.status?(t(),o("span",Y,"已使用")):_("",!0)])),_:1}),d(ue,{label:"操作",width:"200"},{default:K((a=>[d("div",ee,[d(ne,{onClick:e=>(async e=>{await D({id:e}),x.success("刷新成功")})(a.row.id),icon:"el-icon-refresh",color:"#2DB6F5",class:"public-move-left"},{default:K((()=>[ae])),_:2},1032,["onClick"]),d(ne,{onClick:e=>{var l;(l=a.row).user_ids.length>0?(p.value=!0,y.value=l.user_ids):x.error("该群体不能发券")},icon:"ad-yingxiaowuse",color:"#FE6712",class:"public-move-left"},{default:K((()=>[le])),_:2},1032,["onClick"])]),d("div",se,[d(A,{onClick:l=>e.$router.push({path:"/marke/addGroup",query:{id:a.row.id}}),type:"primary",size:"mini",icon:"ad-edit"},{default:K((()=>[te])),_:2},1032,["onClick"]),d(pe,{trigger:"click",onCommand:e=>(async(e,a)=>{switch(a){case"1":if(""!=a){const{data:a}=await U({id:e,export_type:1});x.success("导出成功!");const l=new Blob([a]),s=window.URL.createObjectURL(l),t=document.createElement("a");t.style.display="none",t.href=s,t.setAttribute("download","群体.xlsx"),document.body.appendChild(t),t.click()}break;case"4":V.confirm("您确定删除该商品么？确定后该商品将会放入回收站","删除商品",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((async()=>{await S({ids:[e]}),x.success("删除成功!"),E()}))}})(a.row.id,e)},{dropdown:K((()=>[d(re,null,{default:K((()=>[d(ce,{command:"1"},{default:K((()=>[de])),_:1}),d(ce,{command:"4"},{default:K((()=>[ie])),_:1})])),_:1})])),default:K((()=>[d(ne,{icon:"ad-more",color:"#000000",class:"public-move-left"},{default:K((()=>[oe])),_:1})])),_:2},1032,["onCommand"])])])),_:1})])),_:1},8,["data"]),d(m,{lg:24,class:"paging-box"},{default:K((()=>[d(fe,{background:"",onSizeChange:i(n),onCurrentChange:i(c),"current-page":i(u).currentPage,"page-sizes":i(u).pageSizes,"page-size":i(u).pageSize,total:i(u).total,layout:"total, sizes, prev, pager, next, jumper"},null,8,["onSizeChange","onCurrentChange","current-page","page-sizes","page-size","total"])])),_:1})])),_:1}),d(I,{sendValueList:y.value,addDialogVisible:p.value,"onUpdate:addDialogVisible":a[6]||(a[6]=e=>p.value=e)},null,8,["sendValueList","addDialogVisible"])])}))}});ue.__scopeId="data-v-0e8a6a46";export default ue;