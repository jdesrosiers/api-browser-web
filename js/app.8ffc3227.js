webpackJsonp([1],{"+VGo":function(e,t){},0:function(e,t,n){e.exports=n("NHnr")},"1Tim":function(e,t){},"7OGM":function(e,t){},"8BX+":function(e,t){},ByIg:function(e,t){},F0NS:function(e,t){},FQwc:function(e,t,n){"use strict";var r=n("RtJB"),i=n.n(r),a=n("iGRm"),o=n("XyMi");function s(e){n("7OGM")}var c=!0,u=s,l="data-v-9ee19488",f=null,d=Object(o["a"])(i.a,a["a"],a["b"],c,u,l,f);t["default"]=d.exports},GCZO:function(e,t){},GSYB:function(e,t){},I7wg:function(e,t){},Ktga:function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={};n.d(r,"canDelete",function(){return lr}),n.d(r,"canEdit",function(){return fr}),n.d(r,"contentType",function(){return dr}),n.d(r,"data",function(){return ur}),n.d(r,"follow",function(){return mr}),n.d(r,"format",function(){return pr}),n.d(r,"isError",function(){return hr}),n.d(r,"isValid",function(){return vr}),n.d(r,"links",function(){return gr}),n.d(r,"nil",function(){return yr}),n.d(r,"resolveUrl",function(){return br}),n.d(r,"rootFormat",function(){return xr}),n.d(r,"statusText",function(){return $r});const i=e=>"#"+encodeURIComponent(e),a=e=>window.location.hash=i(e),o=()=>{const e=window.location.hash.substring(1);return decodeURIComponent(e)},s=e=>JSON.stringify(e,null,"  ");var c=n("NM/j"),u=n.n(c),l={name:"Card"},f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"card"},[e._t("default")],2)},d=[],m=n("XyMi");function p(e){n("F0NS")}var h=!1,v=p,g="data-v-536b1247",y=null,b=Object(m["a"])(l,f,d,h,v,g,y),$=b.exports,x={name:"CardBody"},_=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"card-body"},[e._t("default")],2)},C=[];function I(e){n("1Tim")}var j=!1,O=I,E="data-v-c54725b8",w=null,k=Object(m["a"])(x,_,C,j,O,E,w),P=k.exports,D={name:"CardHeader"},N=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"card-header"},[e._t("default")],2)},B=[];function T(e){n("oP+m")}var A=!1,M=T,V="data-v-08347b25",S=null,L=Object(m["a"])(D,N,B,A,M,V,S),R=L.exports,U={name:"Button",methods:{click:function(e){this.$emit("click",e)}}},q=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("button",{staticClass:"btn",attrs:{type:"button"},on:{click:e.click}},[e._t("default")],2)},H=[];function J(e){n("ByIg")}var G=!1,F=J,W="data-v-7636d89b",X=null,z=Object(m["a"])(U,q,H,G,F,W,X),Z=z.exports,Y={name:"Cancel",components:{Button:Z},methods:{click:function(e){this.$emit("click",e)}}},Q=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("Button",{staticClass:"btn-secondary",on:{click:e.click}},[e._v("Cancel")])},K=[];function ee(e){n("dhwR")}var te=!1,ne=ee,re="data-v-42aa65fb",ie=null,ae=Object(m["a"])(Y,Q,K,te,ne,re,ie),oe=ae.exports,se=n("V8mf"),ce=n.n(se),ue=(n("GCZO"),{name:"Code",methods:{highlight:function(e){return ce.a.highlightAuto(e).value}},computed:{data:function(){return this.$store.getters.data},language:function(){return this.$store.getters.rootFormat},highlighted:function(){if(this.data&&"html"!==this.language){if("json"===this.language){var e=s(this.data);return this.highlight(e)}return this.highlight(this.data)}return this.data}}}),le=function(){var e=this,t=e.$createElement,n=e._self._c||t;return"html"===e.language?n("iframe",{attrs:{srcdoc:e.highlighted}}):e.language?n("pre",[n("code",{staticClass:"hljs",class:e.language,domProps:{innerHTML:e._s(e.highlighted)}})]):e._e()},fe=[];function de(e){n("Vjzt")}var me,pe,he=!1,ve=de,ge="data-v-cfec8e86",ye=null,be=Object(m["a"])(ue,le,fe,he,ve,ge,ye),$e=be.exports,xe={name:"Decorator",render:function(e){return this.$slots.decoration.forEach(function(e){e.data.staticClass+=" decoration"}),e("div",{class:"decorator"},[this.$slots.decoration,this.$slots.default])}};function _e(e){n("yyRW")}var Ce=!1,Ie=_e,je="data-v-be5b4ab0",Oe=null,Ee=Object(m["a"])(xe,me,pe,Ce,Ie,je,Oe),we=Ee.exports,ke={name:"Delete",components:{Button:Z},methods:{click:function(e){this.$emit("click",e)}}},Pe=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("Button",{staticClass:"btn-danger",on:{click:e.click}},[e._v("Delete")])},De=[];function Ne(e){n("n5Xu")}var Be=!1,Te=Ne,Ae="data-v-6592857e",Me=null,Ve=Object(m["a"])(ke,Pe,De,Be,Te,Ae,Me),Se=Ve.exports,Le={name:"Edit",components:{Button:Z},methods:{click:function(e){this.$emit("click",e)}}},Re=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("Button",{staticClass:"btn-secondary",on:{click:e.click}},[e._v("Edit")])},Ue=[];function qe(e){n("8BX+")}var He=!1,Je=qe,Ge="data-v-6655c32b",Fe=null,We=Object(m["a"])(Le,Re,Ue,He,Je,Ge,Fe),Xe=We.exports,ze={name:"Editor",components:{Button:Z},data:function(){return{value:""}},mounted:function(){this.value=s(this.$store.getters.data),this.$emit("input",this.value)},methods:{input:function(e){this.$emit("input",e.target.value)},formatJson:function(){this.value=s(JSON.parse(this.value))}}},Ze=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"full-height"},[n("div",{staticClass:"buttons"},[n("Button",{ref:"format",staticClass:"badge",on:{click:e.formatJson}},[e._v("Format")])],1),n("textarea",{directives:[{name:"model",rawName:"v-model",value:e.value,expression:"value"}],staticClass:"full-height",domProps:{value:e.value},on:{input:[function(t){t.target.composing||(e.value=t.target.value)},e.input]}})])},Ye=[];function Qe(e){n("YDpv")}var Ke=!1,et=Qe,tt="data-v-56652a6c",nt=null,rt=Object(m["a"])(ze,Ze,Ye,Ke,et,tt,nt),it=rt.exports,at={name:"Link",props:["link"],computed:{browser:function(){return this.$store.state.browser},appHref:function(){var e=this.$store.getters.resolveUrl(this.link.href);return i(e)},title:function(){return this.link.title||this.link.href}}},ot=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"card-header"},[n("a",{ref:"link",staticClass:"text-primary",attrs:{href:e.appHref}},[e._v(e._s(e.title))]),n("span",{ref:"rel",staticClass:"badge badge-pill badge-primary"},[e._v(e._s(e.link.rel))])])},st=[];function ct(e){n("PT7o")}var ut=!1,lt=ct,ft="data-v-de98fd0c",dt=null,mt=Object(m["a"])(at,ot,st,ut,lt,ft,dt),pt=mt.exports,ht={name:"Save",components:{Button:Z},methods:{click:function(e){this.$emit("click",e)}}},vt=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("Button",{staticClass:"btn-success",on:{click:e.click}},[e._v("Save")])},gt=[];function yt(e){n("gUoE")}var bt=!1,$t=yt,xt="data-v-24524c07",_t=null,Ct=Object(m["a"])(ht,vt,gt,bt,$t,xt,_t),It=Ct.exports,jt={name:"Check"},Ot=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("span",{staticClass:"oi oi-check"})},Et=[];function wt(e){n("ncZD")}var kt=!1,Pt=wt,Dt="data-v-be96b398",Nt=null,Bt=Object(m["a"])(jt,Ot,Et,kt,Pt,Dt,Nt),Tt=Bt.exports,At={name:"X"},Mt=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("span",{staticClass:"oi oi-x"})},Vt=[];function St(e){n("v/pP")}var Lt=!1,Rt=St,Ut="data-v-678c7444",qt=null,Ht=Object(m["a"])(At,Mt,Vt,Lt,Rt,Ut,qt),Jt=Ht.exports,Gt={name:"Validation",props:["isValid","validationErrors"],components:{Check:Tt,X:Jt}},Ft=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.isValid?n("div",{staticClass:"validation text-success"},[n("Check"),e._v(" Valid\n")],1):n("div",{staticClass:"validation text-danger"},[n("X"),e._v(" "+e._s(e.validationErrors)+"\n")],1)},Wt=[];function Xt(e){n("axQg")}var zt=!1,Zt=Xt,Yt="data-v-4bc29f55",Qt=null,Kt=Object(m["a"])(Gt,Ft,Wt,zt,Zt,Yt,Qt),en=Kt.exports,tn={name:"Document",data:function(){return{editMode:!1,body:"",isValid:!0,validationErrors:""}},components:{Card:$,CardBody:P,CardHeader:R,Cancel:oe,Code:$e,Decorator:we,Delete:Se,Edit:Xe,Editor:it,Link:pt,Save:It,Validation:en},methods:{onEdit:function(){this.editMode=!0},onCancel:function(){this.editMode=!1},onDelete:function(){this.$store.dispatch("delete")},onSave:function(){this.$store.dispatch("save",this.body)}},computed:{title:function(){return this.isError?this.$store.getters.statusText:void 0},isError:function(){return this.$store.getters.isError},links:function(){return this.$store.getters.links},canDelete:function(){return this.$store.getters.canDelete},canEdit:function(){return this.$store.getters.canEdit}},watch:{body:function(e){var t=this;this.$store.getters.isValid(e).then(function(e){var n,r;return n=e,r=u()(n,2),t.isValid=r[0],t.validationErrors=r[1],n}).catch(function(e){t.isValid=!1,t.validationErrors=e.message})}}},nn=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("Card",{staticClass:"full-height",class:{"border-danger":e.isError}},[e.title?n("CardHeader",{class:{"bg-danger":e.isError}},[e._v("\n    "+e._s(e.title)+"\n  ")]):e._e(),n("CardBody",{staticClass:"full-height"},[e.editMode?n("Decorator",{staticClass:"full-height"},[n("div",{staticClass:"buttons",attrs:{slot:"decoration"},slot:"decoration"},[n("Save",{attrs:{disabled:!e.isValid},on:{click:e.onSave}}),n("Cancel",{on:{click:e.onCancel}})],1),n("Editor",{on:{input:function(t){e.body=t}}}),n("Validation",{attrs:{isValid:e.isValid,validationErrors:e.validationErrors}})],1):n("Decorator",{staticClass:"full-height"},[n("div",{staticClass:"buttons",attrs:{slot:"decoration"},slot:"decoration"},[e.canEdit?n("Edit",{on:{click:e.onEdit}}):e._e(),e.canDelete?n("Delete",{on:{click:e.onDelete}}):e._e()],1),n("Code")],1),e._l(e.links,function(e,t){return n("Link",{key:t,attrs:{link:e}})})],2)],1)},rn=[];function an(e){n("Ktga")}var on=!1,sn=an,cn="data-v-320c5642",un=null,ln=Object(m["a"])(tn,nn,rn,on,sn,cn,un),fn=ln.exports,dn=n("FQwc"),mn={name:"NavBar",props:["title"]},pn=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("nav",{staticClass:"navbar navbar-expand-md navbar-dark bg-dark fixed-top"},[n("a",{staticClass:"navbar-brand",attrs:{href:"/"}},[e._v(e._s(e.title))]),e._t("default")],2)},hn=[];function vn(e){n("ZxwB")}var gn=!1,yn=vn,bn="data-v-33d557de",$n=null,xn=Object(m["a"])(mn,pn,hn,gn,yn,bn,$n),_n=xn.exports,Cn={name:"UrlBar",props:{value:String},methods:{input:function(e){this.$emit("input",e.target.value)},keyup:function(e){this.$emit("keyup",e)}}},In=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"input-group"},[n("input",e._b({staticClass:"form-control",attrs:{type:"text","aria-label":"URL","aria-describedby":"basic-addon2"},domProps:{value:e.value},on:{input:e.input,keyup:e.keyup}},"input",e.$attrs,!1))])},jn=[];function On(e){n("GSYB")}var En=!1,wn=On,kn="data-v-97116cfa",Pn=null,Dn=Object(m["a"])(Cn,In,jn,En,wn,kn,Pn),Nn=Dn.exports,Bn={name:"WelcomeBanner"},Tn=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},An=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"welcome-banner"},[n("h1",[e._v("Welcome to the API Broswer web client")]),n("p",{staticClass:"lead"},[e._v("Enter the URI to your API's homepage in the URL bar to start browsing.")])])}];function Mn(e){n("I7wg")}var Vn=!1,Sn=Mn,Ln="data-v-05557d57",Rn=null,Un=Object(m["a"])(Bn,Tn,An,Vn,Sn,Ln,Rn),qn=Un.exports,Hn={data:function(){return{url:""}},components:{Document:fn,Error:dn["default"],NavBar:_n,UrlBar:Nn,WelcomeBanner:qn},mounted:function(){window.addEventListener("hashchange",this.handleHashChange),o()&&window.dispatchEvent(new HashChangeEvent("hashchange"))},beforeDestroy:function(){window.removeEventListener("hashchange",this.handleHashChange)},computed:{loading:function(){return this.$store.state.loading},error:function(){return this.$store.state.error}},methods:{hasHashLocation:function(){return!!o()},handleHashChange:function(){this.url=o(),this.$store.dispatch("follow",{href:this.url})},go:function(e){a(e.target.value)}}},Jn=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("NavBar",{attrs:{title:"API Browser"}},[n("UrlBar",{attrs:{value:e.url,placeholder:"http://"},on:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.go(t):null}}})],1),n("main",{attrs:{role:"main"}},[e.hasHashLocation()?e.error?n("Error",[e._v(e._s(e.error))]):e.loading?e._e():n("Document"):n("WelcomeBanner")],1)],1)},Gn=[];function Fn(e){n("+VGo")}var Wn=!1,Xn=Fn,zn=null,Zn=null,Yn=Object(m["a"])(Hn,Jn,Gn,Wn,Xn,zn,Zn),Qn=Yn.exports,Kn=n("6nap"),er=n.n(Kn),tr=n("VwgR"),nr=n("WjeV");const rr=e=>{const t=e.match(/.*\/([^;]*)(;.*)?/);return t?t[1]:""},ir=e=>{const t=rr(e),n=t.match(/(?:.*\+)?(.*)/);return n?n[1]:""},ar=e=>{return e.split(/\s*,\s*/).map(e=>{const t=e.match(/^<(.*)>; rel="([^;]*)"(?:; title="(.*)")?$/);return{rel:t[2],href:t[1],title:t[3]}})},or=e=>{return e.split(/\s*,\s*/).map(e=>e.toLowerCase())},sr=new er.a({schemaId:"auto"});sr.addMetaSchema(tr),sr.addMetaSchema(nr);const cr=e=>e.join(","),ur=e=>{return"json"===xr(e)?JSON.parse(e.body):e.body},lr=e=>{const t=e.headers["allow"];return t&&or(t).includes("delete")},fr=e=>{const t=e.headers["allow"];return t&&or(t).includes("put")},dr=e=>e.headers["content-type"],mr=(e,t)=>{let n,r,i;const a={};try{const r=e.location?e.location.href:void 0,i=t.href||r;n=new URL(i,r)}catch(e){return Promise.reject(e)}const o={method:t.method,headers:Object.assign({Accept:cr(e.acceptable)},t.headers),body:t.body};return fetch(n.href,o).then(e=>{r=e.status,i=e.statusText;for(let[t,n]of e.headers.entries())a[t]=n;return e.text()}).then(t=>{const o=Object.assign({},e,{location:n,status:r,statusText:i,headers:Object.freeze(a),body:t});return Promise.resolve(Object.freeze(o))})},pr=e=>{return rr(dr(e)||"")},hr=e=>e.status>=400,vr=(e,t)=>{const n=gr(e).find(e=>"describedby"===e.rel);return n?mr(e,n).then(e=>{const n=JSON.parse(e.body),r=sr.compile(n),i=JSON.parse(t);return[r(i),sr.errorsText(r.errors)]}):Promise.resolve([!0])},gr=e=>{const t=e.headers["link"];return t?ar(t):[]},yr=Object.freeze({location:void 0,acceptable:["application/json"],status:void 0,statusText:void 0,headers:{}}),br=(e,t)=>{const n=e.location?e.location.href:void 0;return new URL(t,n).href},$r=e=>e.statusText,xr=e=>{return ir(dr(e)||"")};var _r=function(e){return{state:{browser:e.nil,error:void 0,loading:!1},getters:{canDelete:function(t){return e.canDelete(t.browser)},canEdit:function(t){return e.canEdit(t.browser)},contentType:function(t){return e.contentType(t.browser)},data:function(t){return e.data(t.browser)},isError:function(t){return e.isError(t.browser)},isValid:function(t){return function(n){return e.isValid(t.browser,n)}},links:function(t){return e.links(t.browser)},statusText:function(t){return e.statusText(t.browser)},resolveUrl:function(t){return function(n){return e.resolveUrl(t.browser,n)}},rootFormat:function(t){return e.rootFormat(t.browser)}},actions:{follow:function(t,n){var r=t.state.browser;t.state.browser=e.nil,t.state.error=void 0,t.state.loading=!0,e.follow(r,n).then(function(e){t.state.browser=e,t.state.loading=!1}).catch(function(e){return t.state.error=e.toString()})},delete:function(e){e.dispatch("follow",{method:"DELETE"})},save:function(e,t){e.dispatch("follow",{method:"PUT",headers:{"Content-Type":e.getters.contentType},body:t})}}}},Cr=n("/5sW"),Ir=n("NYxO");Cr["a"].use(Ir["a"]),new Cr["a"]({store:new Ir["a"].Store(_r(r)),render:function(e){return e(Qn)}}).$mount("#app")},PT7o:function(e,t){},RtJB:function(e,t){},Sht4:function(e,t){e.exports={$schema:"http://json-schema.org/draft-07/schema#",$id:"http://json-schema.org/draft-07/schema#",title:"Core schema meta-schema",definitions:{schemaArray:{type:"array",minItems:1,items:{$ref:"#"}},nonNegativeInteger:{type:"integer",minimum:0},nonNegativeIntegerDefault0:{allOf:[{$ref:"#/definitions/nonNegativeInteger"},{default:0}]},simpleTypes:{enum:["array","boolean","integer","null","number","object","string"]},stringArray:{type:"array",items:{type:"string"},uniqueItems:!0,default:[]}},type:["object","boolean"],properties:{$id:{type:"string",format:"uri-reference"},$schema:{type:"string",format:"uri"},$ref:{type:"string",format:"uri-reference"},$comment:{type:"string"},title:{type:"string"},description:{type:"string"},default:!0,readOnly:{type:"boolean",default:!1},examples:{type:"array",items:!0},multipleOf:{type:"number",exclusiveMinimum:0},maximum:{type:"number"},exclusiveMaximum:{type:"number"},minimum:{type:"number"},exclusiveMinimum:{type:"number"},maxLength:{$ref:"#/definitions/nonNegativeInteger"},minLength:{$ref:"#/definitions/nonNegativeIntegerDefault0"},pattern:{type:"string",format:"regex"},additionalItems:{$ref:"#"},items:{anyOf:[{$ref:"#"},{$ref:"#/definitions/schemaArray"}],default:!0},maxItems:{$ref:"#/definitions/nonNegativeInteger"},minItems:{$ref:"#/definitions/nonNegativeIntegerDefault0"},uniqueItems:{type:"boolean",default:!1},contains:{$ref:"#"},maxProperties:{$ref:"#/definitions/nonNegativeInteger"},minProperties:{$ref:"#/definitions/nonNegativeIntegerDefault0"},required:{$ref:"#/definitions/stringArray"},additionalProperties:{$ref:"#"},definitions:{type:"object",additionalProperties:{$ref:"#"},default:{}},properties:{type:"object",additionalProperties:{$ref:"#"},default:{}},patternProperties:{type:"object",additionalProperties:{$ref:"#"},propertyNames:{format:"regex"},default:{}},dependencies:{type:"object",additionalProperties:{anyOf:[{$ref:"#"},{$ref:"#/definitions/stringArray"}]}},propertyNames:{$ref:"#"},const:!0,enum:{type:"array",items:!0,minItems:1,uniqueItems:!0},type:{anyOf:[{$ref:"#/definitions/simpleTypes"},{type:"array",items:{$ref:"#/definitions/simpleTypes"},minItems:1,uniqueItems:!0}]},format:{type:"string"},contentMediaType:{type:"string"},contentEncoding:{type:"string"},if:{$ref:"#"},then:{$ref:"#"},else:{$ref:"#"},allOf:{$ref:"#/definitions/schemaArray"},anyOf:{$ref:"#/definitions/schemaArray"},oneOf:{$ref:"#/definitions/schemaArray"},not:{$ref:"#"}},default:!0}},Vjzt:function(e,t){},VwgR:function(e,t){e.exports={id:"http://json-schema.org/draft-04/schema#",$schema:"http://json-schema.org/draft-04/schema#",description:"Core schema meta-schema",definitions:{schemaArray:{type:"array",minItems:1,items:{$ref:"#"}},positiveInteger:{type:"integer",minimum:0},positiveIntegerDefault0:{allOf:[{$ref:"#/definitions/positiveInteger"},{default:0}]},simpleTypes:{enum:["array","boolean","integer","null","number","object","string"]},stringArray:{type:"array",items:{type:"string"},minItems:1,uniqueItems:!0}},type:"object",properties:{id:{type:"string",format:"uri"},$schema:{type:"string",format:"uri"},title:{type:"string"},description:{type:"string"},default:{},multipleOf:{type:"number",minimum:0,exclusiveMinimum:!0},maximum:{type:"number"},exclusiveMaximum:{type:"boolean",default:!1},minimum:{type:"number"},exclusiveMinimum:{type:"boolean",default:!1},maxLength:{$ref:"#/definitions/positiveInteger"},minLength:{$ref:"#/definitions/positiveIntegerDefault0"},pattern:{type:"string",format:"regex"},additionalItems:{anyOf:[{type:"boolean"},{$ref:"#"}],default:{}},items:{anyOf:[{$ref:"#"},{$ref:"#/definitions/schemaArray"}],default:{}},maxItems:{$ref:"#/definitions/positiveInteger"},minItems:{$ref:"#/definitions/positiveIntegerDefault0"},uniqueItems:{type:"boolean",default:!1},maxProperties:{$ref:"#/definitions/positiveInteger"},minProperties:{$ref:"#/definitions/positiveIntegerDefault0"},required:{$ref:"#/definitions/stringArray"},additionalProperties:{anyOf:[{type:"boolean"},{$ref:"#"}],default:{}},definitions:{type:"object",additionalProperties:{$ref:"#"},default:{}},properties:{type:"object",additionalProperties:{$ref:"#"},default:{}},patternProperties:{type:"object",additionalProperties:{$ref:"#"},default:{}},dependencies:{type:"object",additionalProperties:{anyOf:[{$ref:"#"},{$ref:"#/definitions/stringArray"}]}},enum:{type:"array",minItems:1,uniqueItems:!0},type:{anyOf:[{$ref:"#/definitions/simpleTypes"},{type:"array",items:{$ref:"#/definitions/simpleTypes"},minItems:1,uniqueItems:!0}]},allOf:{$ref:"#/definitions/schemaArray"},anyOf:{$ref:"#/definitions/schemaArray"},oneOf:{$ref:"#/definitions/schemaArray"},not:{$ref:"#"}},dependencies:{exclusiveMaximum:["maximum"],exclusiveMinimum:["minimum"]},default:{}}},WjeV:function(e,t){e.exports={$schema:"http://json-schema.org/draft-06/schema#",$id:"http://json-schema.org/draft-06/schema#",title:"Core schema meta-schema",definitions:{schemaArray:{type:"array",minItems:1,items:{$ref:"#"}},nonNegativeInteger:{type:"integer",minimum:0},nonNegativeIntegerDefault0:{allOf:[{$ref:"#/definitions/nonNegativeInteger"},{default:0}]},simpleTypes:{enum:["array","boolean","integer","null","number","object","string"]},stringArray:{type:"array",items:{type:"string"},uniqueItems:!0,default:[]}},type:["object","boolean"],properties:{$id:{type:"string",format:"uri-reference"},$schema:{type:"string",format:"uri"},$ref:{type:"string",format:"uri-reference"},title:{type:"string"},description:{type:"string"},default:{},examples:{type:"array",items:{}},multipleOf:{type:"number",exclusiveMinimum:0},maximum:{type:"number"},exclusiveMaximum:{type:"number"},minimum:{type:"number"},exclusiveMinimum:{type:"number"},maxLength:{$ref:"#/definitions/nonNegativeInteger"},minLength:{$ref:"#/definitions/nonNegativeIntegerDefault0"},pattern:{type:"string",format:"regex"},additionalItems:{$ref:"#"},items:{anyOf:[{$ref:"#"},{$ref:"#/definitions/schemaArray"}],default:{}},maxItems:{$ref:"#/definitions/nonNegativeInteger"},minItems:{$ref:"#/definitions/nonNegativeIntegerDefault0"},uniqueItems:{type:"boolean",default:!1},contains:{$ref:"#"},maxProperties:{$ref:"#/definitions/nonNegativeInteger"},minProperties:{$ref:"#/definitions/nonNegativeIntegerDefault0"},required:{$ref:"#/definitions/stringArray"},additionalProperties:{$ref:"#"},definitions:{type:"object",additionalProperties:{$ref:"#"},default:{}},properties:{type:"object",additionalProperties:{$ref:"#"},default:{}},patternProperties:{type:"object",additionalProperties:{$ref:"#"},default:{}},dependencies:{type:"object",additionalProperties:{anyOf:[{$ref:"#"},{$ref:"#/definitions/stringArray"}]}},propertyNames:{$ref:"#"},const:{},enum:{type:"array",minItems:1,uniqueItems:!0},type:{anyOf:[{$ref:"#/definitions/simpleTypes"},{type:"array",items:{$ref:"#/definitions/simpleTypes"},minItems:1,uniqueItems:!0}]},format:{type:"string"},allOf:{$ref:"#/definitions/schemaArray"},anyOf:{$ref:"#/definitions/schemaArray"},oneOf:{$ref:"#/definitions/schemaArray"},not:{$ref:"#"}},default:{}}},YDpv:function(e,t){},ZxwB:function(e,t){},axQg:function(e,t){},dhwR:function(e,t){},gUoE:function(e,t){},iGRm:function(e,t,n){"use strict";n.d(t,"a",function(){return r}),n.d(t,"b",function(){return i});var r=function(e,t){var n=t._c;return n("div",{staticClass:"alert alert-danger",attrs:{role:"alert"}},[t._t("default")],2)},i=[]},n5Xu:function(e,t){},ncZD:function(e,t){},oCJ5:function(e,t){e.exports={$schema:"http://json-schema.org/draft-07/schema#",$id:"https://raw.githubusercontent.com/epoberezkin/ajv/master/lib/refs/data.json#",description:"Meta-schema for $data reference (JSON Schema extension proposal)",type:"object",required:["$data"],properties:{$data:{type:"string",anyOf:[{format:"relative-json-pointer"},{format:"json-pointer"}]}},additionalProperties:!1}},"oP+m":function(e,t){},"v/pP":function(e,t){},yyRW:function(e,t){}},[0]);
//# sourceMappingURL=app.8ffc3227.js.map