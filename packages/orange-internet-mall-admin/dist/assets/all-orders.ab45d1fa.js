import{a as e,l,e as a,w as t,b as s,o,c as d,g as r,t as i,X as u,u as n,f as c,F as m,P as v,s as p,k as f,p as y,h as _,m as x,S as g,Z as h,d as k}from"./vendor.71e19cde.js";import{u as b,z as C,f as w,ay as V,j as S,a as z,az as T}from"./index.a53c91c6.js";import{_ as U,a as F}from"./journal.vue_vue&type=script&setup=true&lang.e59fd4d4.js";import{_ as q}from"./logistics-data.45ba351c.js";import{_ as j,a as N,b as I,c as D,d as L,e as E}from"./consignee-information.df2fa79c.js";import{a as G,b as P,c as A}from"./order.28ff7f57.js";import{r as K}from"./member.c7d788b5.js";import"./reset-time.7778decd.js";const R=f();y("data-v-36f9823f");const B={class:"oe-flex oe-row-between box-title"},M={class:"title-all"},O={class:"title-text"},X=u("刷新"),Z=u(" （注：点击刷新后，将计算选中商品的实付金额，计算公式：所选商品实付金额*数量相加 ） "),H=u("导出"),J={class:"order-list-box"},Q={class:"oe-flex list-title"},W=u(" 商品信息"),Y=u(" 数量/单价 "),$=u(" 维权 "),ee=u(" 订单状态 "),le=u(" 配送方式 "),ae=u(" 实际付款 "),te=u(" 收货人 "),se=u(" 操作 "),oe={class:"oe-flex"},de=r("span",null,"订单来源：",-1),re={class:"oe-flex header-right"},ie=u("日志"),ue=u("备注"),ne={class:"oe-flex commodity-box oe-flex-8"},ce={class:"commodity-right"},me={class:"commodity-right-text"},ve=u("虚拟"),pe=u("卡密"),fe=u("实体"),ye=u("计时/次"),_e=u("预约"),xe=u("批发"),ge={class:"quantity-price oe-flex-4 frame"},he={class:"list-bottom"},ke={class:"oe-flex-4 frame"},be={key:0},Ce={key:1},we={key:2},Ve={class:"state-box oe-flex-4 frame"},Se={key:0,class:"state-text"},ze={key:0,class:"state-text"},Te={key:1,class:"state-text"},Ue={key:2},Fe={key:3},qe={class:"state-box oe-flex-4 frame"},je={key:0},Ne={key:1},Ie={key:2},De={key:0},Le=r("br",null,null,-1),Ee={key:1},Ge=r("br",null,null,-1),Pe={key:0},Ae={class:"oe-flex oe-flex-wrap"},Ke=u("查看 "),Re=u("立即发货"),Be={style:{"margin-top":"14px"},class:"oe-flex oe-flex-wrap"},Me=u("退款 "),Oe=u("修改地址"),Xe=u("查看 "),Ze={key:2,class:"oe-flex oe-flex-wrap"},He=u("查看 "),Je=u(" 确定收货 "),Qe={key:3},We={class:"oe-flex oe-flex-wrap"},Ye=u("查看 "),$e=u("确认付款"),el={style:{"margin-top":"14px"},class:"oe-flex oe-flex-wrap"},ll=u("改价"),al=u("关闭");_();var tl=e({expose:[],props:{modelValue:{type:Boolean,required:!0},list:{type:Array,required:!0},paymentList:{type:Array,required:!0},total:{type:Number,required:!0},condition:{type:Object,required:!0},title:{type:String,required:!0}},setup(e,{emit:f}){const y=e,_=l([]),x=b(),g=l({}),h=l([]),k=l([]),S=l(0),z=l(0),T=l({remarksState:!1,refundState:!1,confirmReceipt:!1,deliverGoods:!1,priceChange:!1,logisticsData:!1,journal:!1,address:!1,export:!1}),A=l([]),tl=l(0),sl=(e,l)=>{g.value=l,S.value=e,T.value.remarksState=!0},ol=(e,l)=>{g.value=l,z.value=e,T.value.confirmReceipt=!0},dl=e=>{x.push({path:"/order/management/orderDetails",query:{id:e.id}})};K({page:1,limit:100}).then((e=>{_.value=e.data.data.data}));const rl=a({get:()=>y.list,set:e=>f("update:list",e)}),{isSelectAll:il,selectIds:ul,selectItems:nl}=C(rl);t(il,(()=>{A.value=nl.value})),t(nl,(()=>{A.value=nl.value}));const cl=()=>{tl.value=0,A.value.forEach((e=>{tl.value+=Number(e.goods_amount)}))};return t((()=>y.modelValue),(e=>{if(il.value===e)return!1;il.value=e})),t(il,(e=>{if(e===y.modelValue)return!1;f("update:modelValue",e)})),t(y,(()=>{if(y.paymentList)for(let e=0;e<y.list.length;e++){for(let l=0;l<_.value.length;l++)y.list[e].platform==_.value[l].code&&(y.list[e].img_url=_.value[l].img_url,y.list[e].sourceName=_.value[l].name);for(let l=0;l<y.paymentList.length;l++)y.list[e].pay_type==y.paymentList[l].key&&(y.list[e].payTypeName=y.paymentList[l].name)}})),t(y,(()=>{f("selectListClick",ul)})),R(((l,a)=>{const t=s("el-button"),f=s("el-col"),y=s("el-checkbox"),_=s("el-row"),b=s("el-image"),C=s("el-tag"),A=s("custom-button"),K=s("el-empty");return o(),d(_,{gutter:24},{default:R((()=>[r(f,{lg:24},{default:R((()=>[r("div",B,[r("div",null,[r("span",M,i(e.title),1),r("span",O,[u("总订单数："+i(e.total)+" 实付金额统计："+i(tl.value.toFixed(2))+"元 ",1),r(t,{type:"text",onClick:cl},{default:R((()=>[X])),_:1}),Z])]),r(t,{type:"primary",class:"export-btn",onClick:a[1]||(a[1]=e=>T.value.export=!0)},{default:R((()=>[H])),_:1})])])),_:1}),r("div",J,[r("div",Q,[r(y,{modelValue:n(il),"onUpdate:modelValue":a[2]||(a[2]=e=>c(il)?il.value=e:null),class:"selection-all"},null,8,["modelValue"]),r(_,{class:"list-title-right"},{default:R((()=>[r(f,{xl:15,md:15,sm:15,xs:15},{default:R((()=>[r(_,null,{default:R((()=>[r(f,{xl:8,md:8,sm:8,xs:8},{default:R((()=>[W])),_:1}),r(f,{xl:4,md:4,sm:4,xs:4},{default:R((()=>[Y])),_:1}),r(f,{xl:4,md:4,sm:4,xs:4},{default:R((()=>[$])),_:1}),r(f,{xl:4,md:4,sm:4,xs:4},{default:R((()=>[ee])),_:1}),r(f,{xl:4,md:4,sm:4,xs:4},{default:R((()=>[le])),_:1})])),_:1})])),_:1}),r(f,{xl:3,md:3,sm:3,xs:3},{default:R((()=>[ae])),_:1}),r(f,{xl:3,md:3,sm:3,xs:3},{default:R((()=>[te])),_:1}),r(f,{xl:3,md:3,sm:3,xs:3},{default:R((()=>[se])),_:1})])),_:1})]),e.list.length?(o(!0),d(m,{key:0},v(e.list,((e,l)=>(o(),d("div",{class:"list-box",key:l},[r(_,{class:"list-header oe-flex"},{default:R((()=>[r(f,{xl:9,lg:15,md:15,sm:15,xs:15},{default:R((()=>[r("div",oe,[r(y,{modelValue:e.select,"onUpdate:modelValue":l=>e.select=l,class:"selection-single"},null,8,["modelValue","onUpdate:modelValue"]),u(" 订单编号："+i(e.order_sn),1),r("span",{class:"is-color copy-tetx",onClick:l=>(e=>{const l=document.createElement("input");document.body.appendChild(l),l.setAttribute("value",e),l.select(),document.execCommand("copy")&&document.execCommand("copy"),document.body.removeChild(l),V({title:"成功",message:"复制成功",type:"success",duration:2e3})})(e.order_sn)}," 复制 ",8,["onClick"]),de,r(b,{src:e.img_url,alt:""},null,8,["src"])])])),_:2},1024),r(f,{xl:10,lg:5,md:5,sm:5,xs:5},{default:R((()=>[r("div",null,"下单时间："+i(n(w)(e.createtime)),1)])),_:2},1024),r(f,{xl:5,lg:4,md:4,sm:4,xs:4,class:"header-right-box"},{default:R((()=>[r("div",re,[r(t,{type:"text",onClick:l=>(async e=>{const{data:l}=await G({order_id:e.id});h.value=l.data.data,T.value.journal=!0})(e)},{default:R((()=>[ie])),_:2},1032,["onClick"]),r(t,{type:"text",class:"is-left",onClick:l=>sl(0,e)},{default:R((()=>[ue])),_:2},1032,["onClick"])])])),_:2},1024)])),_:2},1024),r(_,{class:"box-content"},{default:R((()=>[r(f,{xl:15,md:15,sm:15,xs:15,class:"layer-content"},{default:R((()=>[(o(!0),d(m,null,v(e.orderGoods,((l,a)=>(o(),d("div",{key:Number(a),class:["loop-box",1==e.orderGoods.length?"completely":""]},[r("div",ne,[r(b,{src:l.goods_image,fit:"cover",class:"order-information-img"},null,8,["src"]),r("div",ce,[r("div",me,i(l.goods_title),1),"2"==e.type?(o(),d(C,{key:0,size:"mini",color:"#D4EBFF",style:{color:"#55adff"}},{default:R((()=>[ve])),_:1})):p("",!0),"3"==e.type?(o(),d(C,{key:1,size:"mini",color:"#FBDDD1",style:{color:"#ec672e"}},{default:R((()=>[pe])),_:1})):p("",!0),"1"==e.type?(o(),d(C,{key:2,size:"mini",color:"#E4FFF8",style:{color:"#1ad370"}},{default:R((()=>[fe])),_:1})):p("",!0),"4"==e.type?(o(),d(C,{key:3,size:"mini",color:"#F4DFD3",style:{color:"#ef864c"}},{default:R((()=>[ye])),_:1})):p("",!0),"5"==e.type?(o(),d(C,{key:4,size:"mini",color:"#F8E8CF",style:{color:"#dd8a0d"}},{default:R((()=>[_e])),_:1})):p("",!0),"6"==e.type?(o(),d(C,{key:5,size:"mini",color:"#E9D4F9",style:{color:"#8f29df"}},{default:R((()=>[xe])),_:1})):p("",!0)])]),r("div",ge,[r("div",null,[r("div",null,"¥"+i(l.goods_original_price),1),r("div",he,"x"+i(l.goods_num),1)])]),r("div",ke,[r("div",null,["1"==l.after_sale_status?(o(),d("div",be,"维权中")):p("",!0),"0"==l.after_sale_status?(o(),d("div",Ce,"-")):p("",!0),"2"==l.after_sale_status?(o(),d("div",we,"维权完成")):p("",!0),"0"!=l.after_sale_status?(o(),d("div",{key:3,onClick:a=>{return t=e,s=l.id,void x.push({path:"/order/management/protection-details",query:{id:t.id,orderId:s}});var t,s},class:"is-color touch-text list-bottom"}," 维权详情 ",8,["onClick"])):p("",!0)])]),r("div",Ve,["0"==e.status?(o(),d("div",Se,"等待付款")):p("",!0),"0"!=e.status?(o(),d(m,{key:1},["1"==l.dispatch_status?(o(),d("div",ze,"等待发货")):p("",!0),"2"==l.dispatch_status?(o(),d("div",Te,"等待收货")):p("",!0),"-1"==l.dispatch_status?(o(),d("div",Ue,"已关闭")):p("",!0),"3"==l.dispatch_status?(o(),d("div",Fe,"已完成")):p("",!0)],64)):p("",!0)]),r("div",qe,[r("div",null,["1"==e.delivery_type?(o(),d("div",je,"快递")):p("",!0),"3"==e.delivery_type?(o(),d("div",Ne,"自提")):p("",!0),"2"==e.delivery_type?(o(),d("div",Ie,"同城配送")):p("",!0),l.express_no?(o(),d("div",{key:3,class:"is-color list-bottom touch-text",onClick:e=>(async(e,l)=>{const{data:a}=await P({send_express_company_code:e,send_express_sn:l});k.value=a.data,T.value.logisticsData=!0})(l.express_code,l.express_no)},"物流信息 ",8,["onClick"])):p("",!0)])])],2)))),128))])),_:2},1024),r(f,{xl:3,md:3,sm:3,xs:3,class:"frame"},{default:R((()=>[0!=e.status?(o(),d("div",De,[r("div",null,"¥"+i(e.pay_fee),1),Le,r("div",null,i(e.payTypeName),1)])):(o(),d("div",Ee,"-"))])),_:2},1024),r(f,{xl:3,md:3,sm:3,xs:3,class:"frame"},{default:R((()=>[r("div",null,[r("div",null,i(e.consignee),1),Ge,r("div",null,i(e.phone),1)])])),_:2},1024),r(f,{xl:3,md:3,sm:3,xs:3,class:"frame"},{default:R((()=>["1"==e.status?(o(),d("div",Pe,[r("div",Ae,[r(A,{icon:"ad-see",color:"#FE6712",onClick:l=>dl(e)},{default:R((()=>[Ke])),_:2},1032,["onClick"]),r(t,{size:"small",type:"primary",icon:"ad-immediately",class:"btn-deviation",onClick:l=>(e=>{g.value=e,T.value.deliverGoods=!0})(e)},{default:R((()=>[Re])),_:2},1032,["onClick"])]),r("div",Be,[r(A,{icon:"ad-refund",color:"#ff0000",onClick:l=>(e=>{g.value=e,T.value.refundState=!0})(e)},{default:R((()=>[Me])),_:2},1032,["onClick"]),r(A,{icon:"ad-change-address",color:"#2db6f5",class:"public-move-left btn-deviation",onClick:l=>(e=>{T.value.address=!0,g.value=e})(e)},{default:R((()=>[Oe])),_:2},1032,["onClick"])])])):p("",!0),"3"==e.status||"-1"==e.status?(o(),d(A,{key:1,icon:"ad-see",color:"#FE6712",onClick:l=>dl(e)},{default:R((()=>[Xe])),_:2},1032,["onClick"])):p("",!0),"2"==e.status?(o(),d("div",Ze,[r(A,{icon:"ad-see",color:"#FE6712",onClick:l=>dl(e)},{default:R((()=>[He])),_:2},1032,["onClick"]),r(t,{size:"small",type:"primary",class:"btn-deviation",icon:"ad-confirm-receipt",onClick:l=>ol(0,e)},{default:R((()=>[Je])),_:2},1032,["onClick"])])):p("",!0),"0"==e.status?(o(),d("div",Qe,[r("div",We,[r(A,{icon:"ad-see",color:"#FE6712",onClick:l=>dl(e)},{default:R((()=>[Ye])),_:2},1032,["onClick"]),r(A,{class:"btn-deviation",icon:"ad-determine",color:"#2db6f5",onClick:l=>ol(1,e)},{default:R((()=>[$e])),_:2},1032,["onClick"])]),r("div",el,[r(t,{size:"small",type:"primary",icon:"ad-price-change",onClick:l=>(e=>{g.value=e,T.value.priceChange=!0})(e)},{default:R((()=>[ll])),_:2},1032,["onClick"]),r(A,{icon:"ad-close",color:"#ff0000",class:"btn-deviation",onClick:l=>sl(1,e)},{default:R((()=>[al])),_:2},1032,["onClick"])])])):p("",!0)])),_:2},1024)])),_:2},1024)])))),128)):(o(),d(K,{key:1,class:"oe-m-t-30","image-size":200})),r(q,{show:T.value.logisticsData,"onUpdate:show":a[3]||(a[3]=e=>T.value.logisticsData=e),logisticsList:k.value},null,8,["show","logisticsList"]),r(j,{show:T.value.remarksState,"onUpdate:show":a[4]||(a[4]=e=>T.value.remarksState=e),close:S.value,currentItem:g.value},null,8,["show","close","currentItem"]),r(N,{show:T.value.deliverGoods,"onUpdate:show":a[5]||(a[5]=e=>T.value.deliverGoods=e),currentItem:g.value},null,8,["show","currentItem"]),r(I,{show:T.value.refundState,"onUpdate:show":a[6]||(a[6]=e=>T.value.refundState=e),currentItem:g.value},null,8,["show","currentItem"]),r(D,{show:T.value.confirmReceipt,"onUpdate:show":a[7]||(a[7]=e=>T.value.confirmReceipt=e),determine:z.value,currentItem:g.value},null,8,["show","determine","currentItem"]),r(L,{show:T.value.priceChange,"onUpdate:show":a[8]||(a[8]=e=>T.value.priceChange=e),option:g.value},null,8,["show","option"]),r(U,{show:T.value.journal,"onUpdate:show":a[9]||(a[9]=e=>T.value.journal=e),option:h.value},null,8,["show","option"]),r(E,{show:T.value.address,"onUpdate:show":a[10]||(a[10]=e=>T.value.address=e),currentItem:g.value},null,8,["show","currentItem"]),r(F,{show:T.value.export,"onUpdate:show":a[11]||(a[11]=e=>T.value.export=e),option:e.condition},null,8,["show","option"])])])),_:1})}))}});tl.__scopeId="data-v-36f9823f";const sl=f();y("data-v-191b160c");const ol={class:"date-box e-grid oe-flex"},dl=r("div",{class:"form-text"},"订单编号",-1),rl={class:"date-box e-grid"},il={class:"date-box e-grid"},ul=r("div",{class:"form-text"},"下单时间",-1),nl={class:"oe-flex e-grid"},cl=r("div",{class:"form-text"},"维权状态",-1),ml={class:"oe-flex e-grid"},vl=r("div",{class:"form-text"},"商品类型",-1),pl={class:"oe-flex e-grid"},fl=r("div",{class:"form-text"},"支付方式",-1),yl={class:"oe-flex e-grid"},_l=r("div",{class:"form-text"},"订单状态",-1),xl={class:"oe-flex e-grid"},gl=u("搜索");_();var hl=e({expose:[],setup(e){b();const a=S(),{pagination:i,handleSizeChange:u,handleCurrentChange:c}=z(),p=l({orderSwitch:"订单编号",orderNumber:"",receivingType:"收货人姓名",consignee:"",timeType:"支付时间",time:"",merchantName:"",merchantTitle:"",safeguarding:"",commodityType:"",deliveryMode:"",payment:"",orderStatus:"",orderStore:"",region:"",orderType:"",system_order_no:""}),f=l(""),y=l(),_=l(""),C=l([]),w=l({orderSwitch:"订单编号",orderNumber:"",receivingType:"收货人姓名",consignee:"",timeType:"支付时间",time:"",merchantName:"",merchantTitle:"",safeguarding:"",commodityType:"",deliveryMode:"",payment:"",orderStatus:"",orderStore:"",region:"",orderType:"",system_order_no:""}),V=l(!1),U=l([]),F=async()=>{const e=["",""];p.value.time&&(e[0]=k(p.value.time[0]).unix().toString(),e[1]=k(p.value.time[1]).unix().toString());const l={order_sn:p.value.orderNumber,phone:"收货人手机号码"==p.value.receivingType?p.value.consignee:"",consignee:"收货人姓名"==p.value.receivingType?p.value.consignee:"",status:p.value.orderStatus,is_after_sale:p.value.safeguarding,pay_type:p.value.payment,type:p.value.commodityType,express_nos:"物流单号"==p.value.orderSwitch?p.value.orderNumber:"",page:i.currentPage,limit:i.pageSize,createtime:e,system_order_no:p.value.system_order_no};""!=f.value&&(l.user_id=f.value,l.total_refund_money=_.value),w.value=l;const{data:a}=await A(l);C.value=a.data.data,C.value.forEach((e=>{e.select=!1})),i.total=a.data.total};T().then((e=>{y.value=e.data.data}));const q=()=>{i.currentPage=1,F()},j=e=>{U.value=e},N=()=>{p.value.orderSwitch="订单编号",p.value.orderNumber="",p.value.receivingType="收货人姓名",p.value.consignee="",p.value.timeType="支付时间",p.value.time="",p.value.merchantName="",p.value.merchantTitle="",p.value.safeguarding="",p.value.commodityType="",p.value.deliveryMode="",p.value.payment="",p.value.orderStatus="",p.value.orderStore="",p.value.region="",p.value.orderType="",f.value="",_.value="",p.value.system_order_no="",i.currentPage=1,F()};return t([()=>i.currentPage,()=>i.pageSize],(()=>{F()})),x((()=>{a.query.user_id&&(f.value=a.query.user_id,_.value=a.query.total_refund_money),a.query.time&&(p.value.time=[1e3*a.query.time[0],1e3*a.query.time[1]]),a.query.system_order_no&&(p.value.system_order_no=a.query.system_order_no),F()})),g("resetOrderList",F),sl(((e,l)=>{const a=s("el-input"),t=s("el-col"),f=s("el-option"),_=s("el-select"),x=s("el-date-picker"),g=s("el-button"),k=s("el-row"),b=s("el-card"),S=s("el-pagination");return o(),d(m,null,[r(b,{shadow:"never",class:"order-head"},{default:sl((()=>[r(k,{gutter:20},{default:sl((()=>[r(t,{xl:{span:"4_8"},md:8,sm:12,xs:12},{default:sl((()=>[r("div",ol,[dl,r(a,{onKeyup:h(q,["enter"]),placeholder:"请输入",class:"oe-flex-1",modelValue:p.value.orderNumber,"onUpdate:modelValue":l[1]||(l[1]=e=>p.value.orderNumber=e)},null,8,["onKeyup","modelValue"])])])),_:1}),r(t,{xl:{span:"4_8"},md:8,sm:12,xs:12},{default:sl((()=>[r("div",rl,[r(_,{modelValue:p.value.receivingType,"onUpdate:modelValue":l[2]||(l[2]=e=>p.value.receivingType=e),placeholder:"请选择",class:"selectFrom",clearable:""},{default:sl((()=>[r(f,{label:"收货人姓名",value:"收货人姓名"}),r(f,{label:"收货人手机号码",value:"收货人手机号码"})])),_:1},8,["modelValue"]),r(a,{onKeyup:h(q,["enter"]),placeholder:"请输入",modelValue:p.value.consignee,"onUpdate:modelValue":l[3]||(l[3]=e=>p.value.consignee=e)},null,8,["onKeyup","modelValue"])])])),_:1}),r(t,{xl:{span:"9_6"},md:8,sm:12,xs:12},{default:sl((()=>[r("div",il,[ul,r(x,{modelValue:p.value.time,"onUpdate:modelValue":l[4]||(l[4]=e=>p.value.time=e),type:"datetimerange",class:"oe-flex-1","start-placeholder":"开始时间","end-placeholder":"结束时间","value-format":"timestamp"},null,8,["modelValue"])])])),_:1}),r(t,{xl:{span:"4_8"},md:8,sm:12,xs:12},{default:sl((()=>[r("div",nl,[cl,r(_,{modelValue:p.value.safeguarding,"onUpdate:modelValue":l[5]||(l[5]=e=>p.value.safeguarding=e),placeholder:"全部",class:"oe-flex-1",clearable:""},{default:sl((()=>[r(f,{label:"全部",value:""}),r(f,{label:"未维权",value:"0"}),r(f,{label:"维权中",value:"1"}),r(f,{label:"维权完后",value:"2"})])),_:1},8,["modelValue"])])])),_:1}),r(t,{xl:{span:"4_8"},md:8,sm:12,xs:12},{default:sl((()=>[r("div",ml,[vl,r(_,{modelValue:p.value.commodityType,"onUpdate:modelValue":l[6]||(l[6]=e=>p.value.commodityType=e),placeholder:"全部",class:"oe-flex-1",clearable:""},{default:sl((()=>[r(f,{label:"全部",value:" "}),r(f,{label:"实体商品",value:"1"}),r(f,{label:"虚拟商品",value:"2"})])),_:1},8,["modelValue"])])])),_:1}),r(t,{xl:{span:"4_8"},md:8,sm:12,xs:12},{default:sl((()=>[r("div",pl,[fl,r(_,{modelValue:p.value.payment,"onUpdate:modelValue":l[7]||(l[7]=e=>p.value.payment=e),placeholder:"全部",class:"oe-flex-1",clearable:""},{default:sl((()=>[(o(!0),d(m,null,v(y.value,(e=>(o(),d(f,{label:e.name,value:e.key,key:e.key},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])])),_:1}),r(t,{xl:{span:"4_8"},md:8,sm:12,xs:12},{default:sl((()=>[r("div",yl,[_l,r(_,{modelValue:p.value.orderStatus,"onUpdate:modelValue":l[8]||(l[8]=e=>p.value.orderStatus=e),placeholder:"全部",class:"oe-flex-1",clearable:""},{default:sl((()=>[r(f,{label:"全部",value:""}),r(f,{label:"待付款",value:"0"}),r(f,{label:"待发货",value:"1"}),r(f,{label:"待收货",value:"2"}),r(f,{label:"已完成",value:"3"}),r(f,{label:"已关闭",value:"-1"})])),_:1},8,["modelValue"])])])),_:1}),r(t,{xl:{span:"4_8"},md:8,sm:12,xs:12},{default:sl((()=>[r("div",xl,[r(g,{type:"primary",onClick:q},{default:sl((()=>[gl])),_:1}),r("div",{onClick:N,class:"reset-text"},"重置条件")])])),_:1})])),_:1})])),_:1}),r(b,{shadow:"never",class:"order-box custom-crad-container custom-card-page"},{default:sl((()=>[r(tl,{title:"全部订单",modelValue:V.value,"onUpdate:modelValue":l[9]||(l[9]=e=>V.value=e),total:n(i).total,condition:w.value,list:C.value,onSelectListClick:j,paymentList:y.value},null,8,["modelValue","total","condition","list","paymentList"]),r(S,{onSizeChange:n(u),onCurrentChange:n(c),class:"e-grid paging-box","page-sizes":n(i).pageSizes,"page-size":n(i).pageSize,background:"",layout:"total, prev, pager, next,sizes, jumper",total:n(i).total,"current-page":n(i).currentPage},null,8,["onSizeChange","onCurrentChange","page-sizes","page-size","total","current-page"])])),_:1})],64)}))}});hl.__scopeId="data-v-191b160c";export default hl;
