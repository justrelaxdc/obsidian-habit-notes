"use strict";var vi=Object.defineProperty;var Gc=Object.getOwnPropertyDescriptor;var Xc=Object.getOwnPropertyNames;var Kc=Object.prototype.hasOwnProperty;var qc=(n,t,e)=>t in n?vi(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var Jc=(n,t)=>{for(var e in t)vi(n,e,{get:t[e],enumerable:!0})},Zc=(n,t,e,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Xc(t))!Kc.call(n,s)&&s!==e&&vi(n,s,{get:()=>t[s],enumerable:!(i=Gc(t,s))||i.enumerable});return n};var Qc=n=>Zc(vi({},"__esModule",{value:!0}),n);var A=(n,t,e)=>qc(n,typeof t!="symbol"?t+"":t,e);var cm={};Jc(cm,{default:()=>lm});module.exports=Qc(cm);var xt=require("obsidian");var Ss=require("obsidian");var Si,K,Po,$s,Le,Co,Lo,Fo,Io,js,Hs,Ws,No,Fn={},Bo=[],td=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,wi=Array.isArray;function he(n,t){for(var e in t)n[e]=t[e];return n}function Gs(n){n&&n.parentNode&&n.parentNode.removeChild(n)}function ed(n,t,e){var i,s,r,o={};for(r in t)r=="key"?i=t[r]:r=="ref"?s=t[r]:o[r]=t[r];if(arguments.length>2&&(o.children=arguments.length>3?Si.call(arguments,2):e),typeof n=="function"&&n.defaultProps!=null)for(r in n.defaultProps)o[r]===void 0&&(o[r]=n.defaultProps[r]);return ki(n,o,i,s,null)}function ki(n,t,e,i,s){var r={type:n,props:t,key:e,ref:i,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:s??++Po,__i:-1,__u:0};return s==null&&K.vnode!=null&&K.vnode(r),r}function ne(n){return n.children}function ve(n,t){this.props=n,this.context=t}function Qe(n,t){if(t==null)return n.__?Qe(n.__,n.__i+1):null;for(var e;t<n.__k.length;t++)if((e=n.__k[t])!=null&&e.__e!=null)return e.__e;return typeof n.type=="function"?Qe(n):null}function Vo(n){var t,e;if((n=n.__)!=null&&n.__c!=null){for(n.__e=n.__c.base=null,t=0;t<n.__k.length;t++)if((e=n.__k[t])!=null&&e.__e!=null){n.__e=n.__c.base=e.__e;break}return Vo(n)}}function Us(n){(!n.__d&&(n.__d=!0)&&Le.push(n)&&!Ti.__r++||Co!=K.debounceRendering)&&((Co=K.debounceRendering)||Lo)(Ti)}function Ti(){for(var n,t,e,i,s,r,o,a=1;Le.length;)Le.length>a&&Le.sort(Fo),n=Le.shift(),a=Le.length,n.__d&&(e=void 0,i=void 0,s=(i=(t=n).__v).__e,r=[],o=[],t.__P&&((e=he({},i)).__v=i.__v+1,K.vnode&&K.vnode(e),Xs(t.__P,e,i,t.__n,t.__P.namespaceURI,32&i.__u?[s]:null,r,s??Qe(i),!!(32&i.__u),o),e.__v=i.__v,e.__.__k[e.__i]=e,Wo(r,e,o),i.__e=i.__=null,e.__e!=s&&Vo(e)));Ti.__r=0}function zo(n,t,e,i,s,r,o,a,l,c,d){var h,u,f,p,m,g,_,b=i&&i.__k||Bo,k=t.length;for(l=nd(e,t,b,l,k),h=0;h<k;h++)(f=e.__k[h])!=null&&(u=f.__i==-1?Fn:b[f.__i]||Fn,f.__i=h,g=Xs(n,f,u,s,r,o,a,l,c,d),p=f.__e,f.ref&&u.ref!=f.ref&&(u.ref&&Ks(u.ref,null,f),d.push(f.ref,f.__c||p,f)),m==null&&p!=null&&(m=p),(_=!!(4&f.__u))||u.__k===f.__k?l=Ho(f,l,n,_):typeof f.type=="function"&&g!==void 0?l=g:p&&(l=p.nextSibling),f.__u&=-7);return e.__e=m,l}function nd(n,t,e,i,s){var r,o,a,l,c,d=e.length,h=d,u=0;for(n.__k=new Array(s),r=0;r<s;r++)(o=t[r])!=null&&typeof o!="boolean"&&typeof o!="function"?(l=r+u,(o=n.__k[r]=typeof o=="string"||typeof o=="number"||typeof o=="bigint"||o.constructor==String?ki(null,o,null,null,null):wi(o)?ki(ne,{children:o},null,null,null):o.constructor==null&&o.__b>0?ki(o.type,o.props,o.key,o.ref?o.ref:null,o.__v):o).__=n,o.__b=n.__b+1,a=null,(c=o.__i=id(o,e,l,h))!=-1&&(h--,(a=e[c])&&(a.__u|=2)),a==null||a.__v==null?(c==-1&&(s>d?u--:s<d&&u++),typeof o.type!="function"&&(o.__u|=4)):c!=l&&(c==l-1?u--:c==l+1?u++:(c>l?u--:u++,o.__u|=4))):n.__k[r]=null;if(h)for(r=0;r<d;r++)(a=e[r])!=null&&!(2&a.__u)&&(a.__e==i&&(i=Qe(a)),Yo(a,a));return i}function Ho(n,t,e,i){var s,r;if(typeof n.type=="function"){for(s=n.__k,r=0;s&&r<s.length;r++)s[r]&&(s[r].__=n,t=Ho(s[r],t,e,i));return t}n.__e!=t&&(i&&(t&&n.type&&!t.parentNode&&(t=Qe(n)),e.insertBefore(n.__e,t||null)),t=n.__e);do t=t&&t.nextSibling;while(t!=null&&t.nodeType==8);return t}function id(n,t,e,i){var s,r,o,a=n.key,l=n.type,c=t[e],d=c!=null&&(2&c.__u)==0;if(c===null&&n.key==null||d&&a==c.key&&l==c.type)return e;if(i>(d?1:0)){for(s=e-1,r=e+1;s>=0||r<t.length;)if((c=t[o=s>=0?s--:r++])!=null&&!(2&c.__u)&&a==c.key&&l==c.type)return o}return-1}function Ro(n,t,e){t[0]=="-"?n.setProperty(t,e??""):n[t]=e==null?"":typeof e!="number"||td.test(t)?e:e+"px"}function xi(n,t,e,i,s){var r,o;t:if(t=="style")if(typeof e=="string")n.style.cssText=e;else{if(typeof i=="string"&&(n.style.cssText=i=""),i)for(t in i)e&&t in e||Ro(n.style,t,"");if(e)for(t in e)i&&e[t]==i[t]||Ro(n.style,t,e[t])}else if(t[0]=="o"&&t[1]=="n")r=t!=(t=t.replace(Io,"$1")),o=t.toLowerCase(),t=o in n||t=="onFocusOut"||t=="onFocusIn"?o.slice(2):t.slice(2),n.l||(n.l={}),n.l[t+r]=e,e?i?e.u=i.u:(e.u=js,n.addEventListener(t,r?Ws:Hs,r)):n.removeEventListener(t,r?Ws:Hs,r);else{if(s=="http://www.w3.org/2000/svg")t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(t!="width"&&t!="height"&&t!="href"&&t!="list"&&t!="form"&&t!="tabIndex"&&t!="download"&&t!="rowSpan"&&t!="colSpan"&&t!="role"&&t!="popover"&&t in n)try{n[t]=e??"";break t}catch{}typeof e=="function"||(e==null||e===!1&&t[4]!="-"?n.removeAttribute(t):n.setAttribute(t,t=="popover"&&e==1?"":e))}}function Oo(n){return function(t){if(this.l){var e=this.l[t.type+n];if(t.t==null)t.t=js++;else if(t.t<e.u)return;return e(K.event?K.event(t):t)}}}function Xs(n,t,e,i,s,r,o,a,l,c){var d,h,u,f,p,m,g,_,b,k,y,x,T,w,v,E,C,R=t.type;if(t.constructor!=null)return null;128&e.__u&&(l=!!(32&e.__u),r=[a=t.__e=e.__e]),(d=K.__b)&&d(t);t:if(typeof R=="function")try{if(_=t.props,b="prototype"in R&&R.prototype.render,k=(d=R.contextType)&&i[d.__c],y=d?k?k.props.value:d.__:i,e.__c?g=(h=t.__c=e.__c).__=h.__E:(b?t.__c=h=new R(_,y):(t.__c=h=new ve(_,y),h.constructor=R,h.render=rd),k&&k.sub(h),h.props=_,h.state||(h.state={}),h.context=y,h.__n=i,u=h.__d=!0,h.__h=[],h._sb=[]),b&&h.__s==null&&(h.__s=h.state),b&&R.getDerivedStateFromProps!=null&&(h.__s==h.state&&(h.__s=he({},h.__s)),he(h.__s,R.getDerivedStateFromProps(_,h.__s))),f=h.props,p=h.state,h.__v=t,u)b&&R.getDerivedStateFromProps==null&&h.componentWillMount!=null&&h.componentWillMount(),b&&h.componentDidMount!=null&&h.__h.push(h.componentDidMount);else{if(b&&R.getDerivedStateFromProps==null&&_!==f&&h.componentWillReceiveProps!=null&&h.componentWillReceiveProps(_,y),!h.__e&&h.shouldComponentUpdate!=null&&h.shouldComponentUpdate(_,h.__s,y)===!1||t.__v==e.__v){for(t.__v!=e.__v&&(h.props=_,h.state=h.__s,h.__d=!1),t.__e=e.__e,t.__k=e.__k,t.__k.some(function(F){F&&(F.__=t)}),x=0;x<h._sb.length;x++)h.__h.push(h._sb[x]);h._sb=[],h.__h.length&&o.push(h);break t}h.componentWillUpdate!=null&&h.componentWillUpdate(_,h.__s,y),b&&h.componentDidUpdate!=null&&h.__h.push(function(){h.componentDidUpdate(f,p,m)})}if(h.context=y,h.props=_,h.__P=n,h.__e=!1,T=K.__r,w=0,b){for(h.state=h.__s,h.__d=!1,T&&T(t),d=h.render(h.props,h.state,h.context),v=0;v<h._sb.length;v++)h.__h.push(h._sb[v]);h._sb=[]}else do h.__d=!1,T&&T(t),d=h.render(h.props,h.state,h.context),h.state=h.__s;while(h.__d&&++w<25);h.state=h.__s,h.getChildContext!=null&&(i=he(he({},i),h.getChildContext())),b&&!u&&h.getSnapshotBeforeUpdate!=null&&(m=h.getSnapshotBeforeUpdate(f,p)),E=d,d!=null&&d.type===ne&&d.key==null&&(E=Uo(d.props.children)),a=zo(n,wi(E)?E:[E],t,e,i,s,r,o,a,l,c),h.base=t.__e,t.__u&=-161,h.__h.length&&o.push(h),g&&(h.__E=h.__=null)}catch(F){if(t.__v=null,l||r!=null)if(F.then){for(t.__u|=l?160:128;a&&a.nodeType==8&&a.nextSibling;)a=a.nextSibling;r[r.indexOf(a)]=null,t.__e=a}else{for(C=r.length;C--;)Gs(r[C]);Ys(t)}else t.__e=e.__e,t.__k=e.__k,F.then||Ys(t);K.__e(F,t,e)}else r==null&&t.__v==e.__v?(t.__k=e.__k,t.__e=e.__e):a=t.__e=sd(e.__e,t,e,i,s,r,o,l,c);return(d=K.diffed)&&d(t),128&t.__u?void 0:a}function Ys(n){n&&n.__c&&(n.__c.__e=!0),n&&n.__k&&n.__k.forEach(Ys)}function Wo(n,t,e){for(var i=0;i<e.length;i++)Ks(e[i],e[++i],e[++i]);K.__c&&K.__c(t,n),n.some(function(s){try{n=s.__h,s.__h=[],n.some(function(r){r.call(s)})}catch(r){K.__e(r,s.__v)}})}function Uo(n){return typeof n!="object"||n==null||n.__b&&n.__b>0?n:wi(n)?n.map(Uo):he({},n)}function sd(n,t,e,i,s,r,o,a,l){var c,d,h,u,f,p,m,g=e.props,_=t.props,b=t.type;if(b=="svg"?s="http://www.w3.org/2000/svg":b=="math"?s="http://www.w3.org/1998/Math/MathML":s||(s="http://www.w3.org/1999/xhtml"),r!=null){for(c=0;c<r.length;c++)if((f=r[c])&&"setAttribute"in f==!!b&&(b?f.localName==b:f.nodeType==3)){n=f,r[c]=null;break}}if(n==null){if(b==null)return document.createTextNode(_);n=document.createElementNS(s,b,_.is&&_),a&&(K.__m&&K.__m(t,r),a=!1),r=null}if(b==null)g===_||a&&n.data==_||(n.data=_);else{if(r=r&&Si.call(n.childNodes),g=e.props||Fn,!a&&r!=null)for(g={},c=0;c<n.attributes.length;c++)g[(f=n.attributes[c]).name]=f.value;for(c in g)if(f=g[c],c!="children"){if(c=="dangerouslySetInnerHTML")h=f;else if(!(c in _)){if(c=="value"&&"defaultValue"in _||c=="checked"&&"defaultChecked"in _)continue;xi(n,c,null,f,s)}}for(c in _)f=_[c],c=="children"?u=f:c=="dangerouslySetInnerHTML"?d=f:c=="value"?p=f:c=="checked"?m=f:a&&typeof f!="function"||g[c]===f||xi(n,c,f,g[c],s);if(d)a||h&&(d.__html==h.__html||d.__html==n.innerHTML)||(n.innerHTML=d.__html),t.__k=[];else if(h&&(n.innerHTML=""),zo(t.type=="template"?n.content:n,wi(u)?u:[u],t,e,i,b=="foreignObject"?"http://www.w3.org/1999/xhtml":s,r,o,r?r[0]:e.__k&&Qe(e,0),a,l),r!=null)for(c=r.length;c--;)Gs(r[c]);a||(c="value",b=="progress"&&p==null?n.removeAttribute("value"):p!=null&&(p!==n[c]||b=="progress"&&!p||b=="option"&&p!=g[c])&&xi(n,c,p,g[c],s),c="checked",m!=null&&m!=n[c]&&xi(n,c,m,g[c],s))}return n}function Ks(n,t,e){try{if(typeof n=="function"){var i=typeof n.__u=="function";i&&n.__u(),i&&t==null||(n.__u=n(t))}else n.current=t}catch(s){K.__e(s,e)}}function Yo(n,t,e){var i,s;if(K.unmount&&K.unmount(n),(i=n.ref)&&(i.current&&i.current!=n.__e||Ks(i,null,t)),(i=n.__c)!=null){if(i.componentWillUnmount)try{i.componentWillUnmount()}catch(r){K.__e(r,t)}i.base=i.__P=null}if(i=n.__k)for(s=0;s<i.length;s++)i[s]&&Yo(i[s],t,e||typeof n.type!="function");e||Gs(n.__e),n.__c=n.__=n.__e=void 0}function rd(n,t,e){return this.constructor(n,e)}function qs(n,t,e){var i,s,r,o;t==document&&(t=document.documentElement),K.__&&K.__(n,t),s=(i=typeof e=="function")?null:e&&e.__k||t.__k,r=[],o=[],Xs(t,n=(!i&&e||t).__k=ed(ne,null,[n]),s||Fn,Fn,t.namespaceURI,!i&&e?[e]:s?null:t.firstChild?Si.call(t.childNodes):null,r,!i&&e?e:s?s.__e:t.firstChild,i,o),Wo(r,n,o)}function $o(n){function t(e){var i,s;return this.getChildContext||(i=new Set,(s={})[t.__c]=this,this.getChildContext=function(){return s},this.componentWillUnmount=function(){i=null},this.shouldComponentUpdate=function(r){this.props.value!=r.value&&i.forEach(function(o){o.__e=!0,Us(o)})},this.sub=function(r){i.add(r);var o=r.componentWillUnmount;r.componentWillUnmount=function(){i&&i.delete(r),o&&o.call(r)}}),e.children}return t.__c="__cC"+No++,t.__=n,t.Provider=t.__l=(t.Consumer=function(e,i){return e.children(i)}).contextType=t,t}Si=Bo.slice,K={__e:function(n,t,e,i){for(var s,r,o;t=t.__;)if((s=t.__c)&&!s.__)try{if((r=s.constructor)&&r.getDerivedStateFromError!=null&&(s.setState(r.getDerivedStateFromError(n)),o=s.__d),s.componentDidCatch!=null&&(s.componentDidCatch(n,i||{}),o=s.__d),o)return s.__E=s}catch(a){n=a}throw n}},Po=0,$s=function(n){return n!=null&&n.constructor==null},ve.prototype.setState=function(n,t){var e;e=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=he({},this.state),typeof n=="function"&&(n=n(he({},e),this.props)),n&&he(e,n),n!=null&&this.__v&&(t&&this._sb.push(t),Us(this))},ve.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),Us(this))},ve.prototype.render=ne,Le=[],Lo=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,Fo=function(n,t){return n.__v.__b-t.__v.__b},Ti.__r=0,Io=/(PointerCapture)$|Capture$/i,js=0,Hs=Oo(!1),Ws=Oo(!0),No=0;function jo(n){let t={};return n.split(/\r?\n/).forEach(e=>{let i=e.match(/^\s*([a-zA-Z_]+)\s*:\s*(.+)\s*$/);i&&(t[i[1].trim()]=i[2].trim())}),t}var D=class{static momentAvailable(){return this._momentAvailable===null&&(this._momentAvailable=typeof window.moment<"u",this._momentAvailable&&(this._moment=window.moment)),this._momentAvailable}static getMoment(){return this._moment===null&&this.momentAvailable()&&(this._moment=window.moment),this._moment}static parse(t,e){let i=this.getMoment();if(i){let s=i(t,e,!0);if(s.isValid())return this.wrapMoment(s)}return this.wrapDate(this.parseNativeDate(t,e))}static parseMultiple(t,e){let i=this.getMoment();if(i){let s=i(t,e,!0);if(s.isValid())return this.wrapMoment(s)}for(let s of e)try{let r=this.parseNativeDate(t,s);if(!isNaN(r.getTime()))return this.wrapDate(r)}catch{}return this.now()}static now(){let t=this.getMoment();return t?this.wrapMoment(t()):this.wrapDate(new Date)}static fromDate(t){let e=this.getMoment();return e?this.wrapMoment(e(t)):this.wrapDate(new Date(t.getTime()))}static format(t,e){return t instanceof Date?this.formatNativeDate(t,e):t.format(e)}static addDays(t,e){if(t instanceof Date){let i=new Date(t);return i.setDate(i.getDate()+e),this.wrapDate(i)}return t.clone().add(e,"days")}static subtractDays(t,e){if(t instanceof Date){let i=new Date(t);return i.setDate(i.getDate()-e),this.wrapDate(i)}return t.clone().subtract(e,"days")}static isBefore(t,e){let i=t instanceof Date?this.wrapDate(t):t,s=e instanceof Date?this.wrapDate(e):e;return i.isBefore(s)}static isAfter(t,e){let i=t instanceof Date?this.wrapDate(t):t,s=e instanceof Date?this.wrapDate(e):e;return i.isAfter(s)}static startOfDay(t){if(t instanceof Date){let e=new Date(t);return e.setHours(0,0,0,0),this.wrapDate(e)}return t.clone().startOf("day")}static resolveDateIso(t,e){if(!t||t.toLowerCase()==="today")return this.format(this.now(),e);let i=this.getMoment();if(i){let o=i(t,["YYYY-MM-DD","YYYY/MM/DD","DD.MM.YYYY"],!0);return o.isValid()?o.format(e):i().format(e)}let s=new Date,r=new Date(t);return isNaN(r.getTime())?this.formatNativeDate(s,e):this.formatNativeDate(r,e)}static wrapMoment(t){let e=this.getMoment();return{format:i=>t.format(i),date:()=>t.date(),month:()=>t.month()+1,year:()=>t.year(),getDate:()=>t.date(),getMonth:()=>t.month(),getFullYear:()=>t.year(),getTime:()=>t.valueOf(),isBefore:i=>i instanceof Date?t.isBefore(e?e(i):i):t.isBefore(i.toDate?i.toDate():i),isAfter:i=>i instanceof Date?t.isAfter(e?e(i):i):t.isAfter(i.toDate?i.toDate():i),isValid:()=>t.isValid(),clone:()=>this.wrapMoment(t.clone()),add:(i,s)=>this.wrapMoment(t.clone().add(i,s)),subtract:(i,s)=>this.wrapMoment(t.clone().subtract(i,s)),startOf:i=>this.wrapMoment(t.clone().startOf(i)),toDate:()=>t.toDate()}}static wrapDate(t){return{format:e=>this.formatNativeDate(t,e),date:()=>t.getDate(),month:()=>t.getMonth()+1,year:()=>t.getFullYear(),getDate:()=>t.getDate(),getMonth:()=>t.getMonth(),getFullYear:()=>t.getFullYear(),getTime:()=>t.getTime(),isBefore:e=>{let i=e instanceof Date?e:e.toDate();return t<i},isAfter:e=>{let i=e instanceof Date?e:e.toDate();return t>i},isValid:()=>!isNaN(t.getTime()),clone:()=>this.wrapDate(new Date(t.getTime())),add:(e,i)=>{let s=new Date(t);return i==="days"?s.setDate(s.getDate()+e):i==="months"?s.setMonth(s.getMonth()+e):i==="years"&&s.setFullYear(s.getFullYear()+e),this.wrapDate(s)},subtract:(e,i)=>{let s=new Date(t);return i==="days"?s.setDate(s.getDate()-e):i==="months"?s.setMonth(s.getMonth()-e):i==="years"&&s.setFullYear(s.getFullYear()-e),this.wrapDate(s)},startOf:e=>{let i=new Date(t);return e==="day"?i.setHours(0,0,0,0):e==="month"?(i.setDate(1),i.setHours(0,0,0,0)):e==="year"&&(i.setMonth(0,1),i.setHours(0,0,0,0)),this.wrapDate(i)},toDate:()=>new Date(t.getTime())}}static parseNativeDate(t,e){if(e==="YYYY-MM-DD"){let i=t.split("-");if(i.length===3){let s=parseInt(i[0],10),r=parseInt(i[1],10)-1,o=parseInt(i[2],10);return new Date(s,r,o)}}return new Date(t)}static formatNativeDate(t,e){if(e==="YYYY-MM-DD"){let i=t.getFullYear(),s=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0");return`${i}-${s}-${r}`}return t.toISOString().split("T")[0]}};D._momentAvailable=null,D._moment=null;var P={GOOD_HABIT:"good-habit",BAD_HABIT:"bad-habit",NUMBER:"number",SCALE:"scale",PLUSMINUS:"plusminus",TEXT:"text"},Fe={CONTROL:"control",DISPLAY:"display"},O={TRACKER_NOTES:"tracker-notes",TRACKER_NOTES_HEADER:"tracker-notes__header",TRACKER_NOTES_HIERARCHY:"tracker-notes__hierarchy",TRACKER:"tracker-notes__tracker",TRACKER_HEADER:"tracker-notes__tracker-header",TRACKER_TITLE:"tracker-notes__tracker-title",TRACKER_CONTROLS:"tracker-notes__controls",SETTINGS_BTN:"tracker-notes__settings-btn",ORDER_BTN_CONTAINER:"tracker-notes__order-btns",ORDER_BTN_UP:"tracker-notes__order-btn-up",ORDER_BTN_DOWN:"tracker-notes__order-btn-down",ROW:"tracker-notes__row",VALUE:"tracker-notes__value",VALUE_UPDATED:"updated",TEXT_INPUT:"tracker-notes__text-input",PROGRESS_BAR_WRAPPER:"tracker-notes__progress-bar-wrapper",PROGRESS_BAR_INPUT:"tracker-notes__progress-bar-input",PROGRESS_BAR_PROGRESS:"tracker-notes__progress-bar-progress",PROGRESS_BAR_VALUE:"tracker-notes__progress-bar-value",PROGRESS_BAR_LABEL_LEFT:"tracker-notes__progress-bar-label-left",PROGRESS_BAR_LABEL_RIGHT:"tracker-notes__progress-bar-label-right",HEATMAP:"tracker-notes__heatmap",HEATMAP_DAY:"tracker-notes__heatmap-day",HEATMAP_DAY_HAS_VALUE:"has-value",HEATMAP_DAY_START:"start-day",CALENDAR:"tracker-notes__calendar",CALENDAR_DAY:"tracker-notes__calendar-day",CALENDAR_DAY_HAS_VALUE:"has-value",CALENDAR_DAY_START:"start-day",CHART:"tracker-notes__chart",STATS:"tracker-notes__stats",DATE_PICKER_CONTAINER:"tracker-notes__date-picker-container",DATE_PICKER:"tracker-notes__date-picker",DATE_INPUT:"tracker-notes__date-input",DATE_INPUT_UPDATING:"is-updating",DATE_NAV_BTN:"tracker-notes__date-nav-btn",DATE_NAV_BTN_LEFT:"tracker-notes__date-nav-btn-left",DATE_NAV_BTN_RIGHT:"tracker-notes__date-nav-btn-right",LOADING:"tracker-notes__loading",LOADING_ACTIVE:"is-active",LOADING_DOT:"tracker-notes__loading-dot",FOLDER_NODE:"tracker-notes__folder-node",FOLDER_HEADER:"tracker-notes__folder-header",TRACKERS_CONTAINER:"tracker-notes__trackers",ERROR:"tracker-notes__error",SUCCESS:"tracker-notes__success",LIMIT_ERROR:"tracker-notes__limit-error",LIMIT_SUCCESS:"tracker-notes__limit-success"},$t={INTERACTIVE_ACCENT:"--interactive-accent",COLOR_ACCENT:"--color-accent",ACCENT_COLOR:"--accent-color",TEXT_MUTED:"--text-muted",TEXT_FAINT:"--text-faint",TEXT_NORMAL:"--text-normal",TEXT_ERROR:"--text-error",TEXT_SUCCESS:"--text-success",TEXT_ACCENT:"--text-accent",TEXT_ON_ACCENT:"--text-on-accent",BACKGROUND_PRIMARY:"--background-primary",BACKGROUND_SECONDARY:"--background-secondary",BACKGROUND_MODIFIER_BORDER:"--background-modifier-border",BACKGROUND_MODIFIER_BORDER_HOVER:"--background-modifier-border-hover",BACKGROUND_MODIFIER_BORDER_FOCUS:"--background-modifier-border-focus",INTERACTIVE_NORMAL:"--interactive-normal",INTERACTIVE_HOVER:"--interactive-hover",INTERACTIVE_ACCENT_HOVER:"--interactive-accent-hover",FONT_TEXT:"--font-text",FONT_UI_SMALL:"--font-ui-small"},xe={ACCENT:"#7f6df2",TEXT_MUTED:"#999999",TEXT_FAINT:"#666666",TEXT_ERROR:"#c00000",TEXT_SUCCESS:"#00c000",BORDER:"#e0e0e0",BG_PRIMARY:"#ffffff"},Ot={DEFAULT_HEIGHT:200,CANVAS_HEIGHT:180,POINT_RADIUS:3,POINT_BORDER_WIDTH:2,POINT_HOVER_RADIUS:5,POINT_HIT_RADIUS:10,BORDER_WIDTH:2.5,LINE_TENSION:.4,MAX_TICKS_LIMIT:10,GRID_LINE_WIDTH:1,FONT_SIZE_SMALL:11,FUTURE_DAYS_OFFSET:5,GRADIENT_HEIGHT:180,OPACITY_LIGHT:.25,OPACITY_DARK:.1,OPACITY_MEDIUM:.3,PADDING_FACTOR:.1,LINE_WIDTH:2},Js={ISO:"YYYY-MM-DD",ISO_SLASH:"YYYY/MM/DD",EU:"DD.MM.YYYY",DISPLAY_SHORT:"D MMM"},it={NO_TRACKERS:"no trackers found in folder",NO_FRONTMATTER:"Frontmatter not found",ENTER_NAME:"Enter name",CREATE_ERROR:"Error creating tracker",UPDATE_ERROR:"Error updating tracker",WRITE_ERROR:"Write error",READ_ERROR:"Read error",RENDER_ERROR:"error processing block"},In={TRACKER_CREATED:"Tracker created",TRACKER_UPDATED:"Tracker updated",TRACKER_DELETED:"Tracker deleted",VALUE_SAVED:"\u2713 Saved"},jt={TRACKER_NAME:"e.g., Morning workout",UNIT:"Default: none",TEXT_INPUT:"Enter text...",NUMBER_INPUT:"0",LIMIT_NONE:"Default: none"},_t={[P.GOOD_HABIT]:"Good habit",[P.BAD_HABIT]:"Bad habit",[P.NUMBER]:"Number",[P.SCALE]:"Scale",[P.PLUSMINUS]:"Counter (+/-)",[P.TEXT]:"Text"},L={CREATE_TRACKER:"Create new tracker",EDIT_TRACKER:"Edit tracker",NAME:"Name",PATH:"Path",TYPE:"Type",PARAMETERS:"Parameters",UNIT:"Unit",STEP:"Step",VALUE_FROM:'Value "from"',VALUE_TO:'Value "to"',LIMITS:"Success limits",LOWER_LIMIT:"Lower limit (target)",UPPER_LIMIT:"Upper limit",CREATE:"Create",SAVE:"Save",DELETE:"Delete",DELETE_CONFIRM_TITLE:"Delete tracker?",DELETE_CONFIRM_MESSAGE:'Are you sure you want to delete tracker "{name}"? This action cannot be undone.',CANCEL:"Cancel",HABITS_GROUP:"Habits",METRICS_GROUP:"Metrics",START_DATE:"Tracking start date",LIMITS_DESCRIPTION:"Optionally, you can make the metric limiting and set desired threshold values, they will be displayed on the chart. If the value does not fall within the specified range, you will see a color response.",ROOT_FOLDER:"/ (root folder)",NO_TRACKERS_FOUND:"No trackers found",SELECT_TRACKER:"Select tracker",YESTERDAY:"Yesterday",TOMORROW:"Tomorrow",UPDATING:"Updating\u2026",MOVE_UP:"Move up",MOVE_DOWN:"Move down",TRACKER_SETTINGS:"Tracker settings",UPPER_LIMIT_MUST_BE_GREATER:"Upper limit must be greater than lower limit",ENTER_NAME:"Enter name",TRACKER_UPDATED:"Tracker updated",WARNING_RECORDS_BEFORE_DATE:"Warning: found {count} {records} BEFORE date {date}, which will be deleted when saving.",RECORD_SINGULAR:"record",RECORDS_PLURAL:"records"},H={STEP:1,MIN_VALUE:0,MAX_VALUE:10,TEXT_UNIT:"words"},Go={FONT_WEIGHT_BOLD:"600",TRANSITION_OPACITY_DURATION_MS:200},zt={TOTAL_RECORDS:"Total records",LAST_DAYS:"Sum",CURRENT_STREAK:"Current streak",DAYS_SINGULAR:"day",DAYS_PLURAL_2_4:"days",DAYS_PLURAL_5_PLUS:"days",AVERAGE:"Average",MIN:"Min",MAX:"Max",MEDIAN:"Median",COMPLETION_RATE:"Completed",ACTIVE_DAYS:"Active days",BEST_STREAK:"Best streak"};var tn,ht,Zs,Xo,Nn=0,na=[],bt=K,Ko=bt.__b,qo=bt.__r,Jo=bt.diffed,Zo=bt.__c,Qo=bt.unmount,ta=bt.__;function Mi(n,t){bt.__h&&bt.__h(ht,n,Nn||t),Nn=0;var e=ht.__H||(ht.__H={__:[],__h:[]});return n>=e.__.length&&e.__.push({}),e.__[n]}function Gt(n){return Nn=1,od(ra,n)}function od(n,t,e){var i=Mi(tn++,2);if(i.t=n,!i.__c&&(i.__=[e?e(t):ra(void 0,t),function(a){var l=i.__N?i.__N[0]:i.__[0],c=i.t(l,a);l!==c&&(i.__N=[c,i.__[1]],i.__c.setState({}))}],i.__c=ht,!ht.__f)){var s=function(a,l,c){if(!i.__c.__H)return!0;var d=i.__c.__H.__.filter(function(u){return!!u.__c});if(d.every(function(u){return!u.__N}))return!r||r.call(this,a,l,c);var h=i.__c.props!==a;return d.forEach(function(u){if(u.__N){var f=u.__[0];u.__=u.__N,u.__N=void 0,f!==u.__[0]&&(h=!0)}}),r&&r.call(this,a,l,c)||h};ht.__f=!0;var r=ht.shouldComponentUpdate,o=ht.componentWillUpdate;ht.componentWillUpdate=function(a,l,c){if(this.__e){var d=r;r=void 0,s(a,l,c),r=d}o&&o.call(this,a,l,c)},ht.shouldComponentUpdate=s}return i.__N||i.__}function ut(n,t){var e=Mi(tn++,3);!bt.__s&&sa(e.__H,t)&&(e.__=n,e.u=t,ht.__H.__h.push(e))}function lt(n){return Nn=5,ct(function(){return{current:n}},[])}function ct(n,t){var e=Mi(tn++,7);return sa(e.__H,t)&&(e.__=n(),e.__H=t,e.__h=n),e.__}function N(n,t){return Nn=8,ct(function(){return n},t)}function ia(n){var t=ht.context[n.__c],e=Mi(tn++,9);return e.c=n,t?(e.__==null&&(e.__=!0,t.sub(ht)),t.props.value):n.__}function ad(){for(var n;n=na.shift();)if(n.__P&&n.__H)try{n.__H.__h.forEach(Ei),n.__H.__h.forEach(Qs),n.__H.__h=[]}catch(t){n.__H.__h=[],bt.__e(t,n.__v)}}bt.__b=function(n){ht=null,Ko&&Ko(n)},bt.__=function(n,t){n&&t.__k&&t.__k.__m&&(n.__m=t.__k.__m),ta&&ta(n,t)},bt.__r=function(n){qo&&qo(n),tn=0;var t=(ht=n.__c).__H;t&&(Zs===ht?(t.__h=[],ht.__h=[],t.__.forEach(function(e){e.__N&&(e.__=e.__N),e.u=e.__N=void 0})):(t.__h.forEach(Ei),t.__h.forEach(Qs),t.__h=[],tn=0)),Zs=ht},bt.diffed=function(n){Jo&&Jo(n);var t=n.__c;t&&t.__H&&(t.__H.__h.length&&(na.push(t)!==1&&Xo===bt.requestAnimationFrame||((Xo=bt.requestAnimationFrame)||ld)(ad)),t.__H.__.forEach(function(e){e.u&&(e.__H=e.u),e.u=void 0})),Zs=ht=null},bt.__c=function(n,t){t.some(function(e){try{e.__h.forEach(Ei),e.__h=e.__h.filter(function(i){return!i.__||Qs(i)})}catch(i){t.some(function(s){s.__h&&(s.__h=[])}),t=[],bt.__e(i,e.__v)}}),Zo&&Zo(n,t)},bt.unmount=function(n){Qo&&Qo(n);var t,e=n.__c;e&&e.__H&&(e.__H.__.forEach(function(i){try{Ei(i)}catch(s){t=s}}),e.__H=void 0,t&&bt.__e(t,e.__v))};var ea=typeof requestAnimationFrame=="function";function ld(n){var t,e=function(){clearTimeout(i),ea&&cancelAnimationFrame(t),setTimeout(n)},i=setTimeout(e,35);ea&&(t=requestAnimationFrame(e))}function Ei(n){var t=ht,e=n.__c;typeof e=="function"&&(n.__c=void 0,e()),ht=t}function Qs(n){var t=ht;n.__c=n.__(),ht=t}function sa(n,t){return!n||n.length!==t.length||t.some(function(e,i){return e!==n[i]})}function ra(n,t){return typeof t=="function"?t(n):t}var cd=Symbol.for("preact-signals");function Ai(){if(ke>1)ke--;else{for(var n,t=!1;Bn!==void 0;){var e=Bn;for(Bn=void 0,tr++;e!==void 0;){var i=e.o;if(e.o=void 0,e.f&=-3,!(8&e.f)&&aa(e))try{e.c()}catch(s){t||(n=s,t=!0)}e=i}}if(tr=0,ke--,t)throw n}}function er(n){if(ke>0)return n();ke++;try{return n()}finally{Ai()}}var J=void 0;function nr(n){var t=J;J=void 0;try{return n()}finally{J=t}}var Bn=void 0,ke=0,tr=0,Di=0;function oa(n){if(J!==void 0){var t=n.n;if(t===void 0||t.t!==J)return t={i:0,S:n,p:J.s,n:void 0,t:J,e:void 0,x:void 0,r:t},J.s!==void 0&&(J.s.n=t),J.s=t,n.n=t,32&J.f&&n.S(t),t;if(t.i===-1)return t.i=0,t.n!==void 0&&(t.n.p=t.p,t.p!==void 0&&(t.p.n=t.n),t.p=J.s,t.n=void 0,J.s.n=t,J.s=t),t}}function kt(n,t){this.v=n,this.i=0,this.n=void 0,this.t=void 0,this.W=t?.watched,this.Z=t?.unwatched,this.name=t?.name}kt.prototype.brand=cd;kt.prototype.h=function(){return!0};kt.prototype.S=function(n){var t=this,e=this.t;e!==n&&n.e===void 0&&(n.x=e,this.t=n,e!==void 0?e.e=n:nr(function(){var i;(i=t.W)==null||i.call(t)}))};kt.prototype.U=function(n){var t=this;if(this.t!==void 0){var e=n.e,i=n.x;e!==void 0&&(e.x=i,n.e=void 0),i!==void 0&&(i.e=e,n.x=void 0),n===this.t&&(this.t=i,i===void 0&&nr(function(){var s;(s=t.Z)==null||s.call(t)}))}};kt.prototype.subscribe=function(n){var t=this;return Ne(function(){var e=t.value,i=J;J=void 0;try{n(e)}finally{J=i}},{name:"sub"})};kt.prototype.valueOf=function(){return this.value};kt.prototype.toString=function(){return this.value+""};kt.prototype.toJSON=function(){return this.value};kt.prototype.peek=function(){var n=J;J=void 0;try{return this.value}finally{J=n}};Object.defineProperty(kt.prototype,"value",{get:function(){var n=oa(this);return n!==void 0&&(n.i=this.i),this.v},set:function(n){if(n!==this.v){if(tr>100)throw new Error("Cycle detected");this.v=n,this.i++,Di++,ke++;try{for(var t=this.t;t!==void 0;t=t.x)t.t.N()}finally{Ai()}}}});function ie(n,t){return new kt(n,t)}function aa(n){for(var t=n.s;t!==void 0;t=t.n)if(t.S.i!==t.i||!t.S.h()||t.S.i!==t.i)return!0;return!1}function la(n){for(var t=n.s;t!==void 0;t=t.n){var e=t.S.n;if(e!==void 0&&(t.r=e),t.S.n=t,t.i=-1,t.n===void 0){n.s=t;break}}}function ca(n){for(var t=n.s,e=void 0;t!==void 0;){var i=t.p;t.i===-1?(t.S.U(t),i!==void 0&&(i.n=t.n),t.n!==void 0&&(t.n.p=i)):e=t,t.S.n=t.r,t.r!==void 0&&(t.r=void 0),t=i}n.s=e}function Ie(n,t){kt.call(this,void 0),this.x=n,this.s=void 0,this.g=Di-1,this.f=4,this.W=t?.watched,this.Z=t?.unwatched,this.name=t?.name}Ie.prototype=new kt;Ie.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===Di))return!0;if(this.g=Di,this.f|=1,this.i>0&&!aa(this))return this.f&=-2,!0;var n=J;try{la(this),J=this;var t=this.x();(16&this.f||this.v!==t||this.i===0)&&(this.v=t,this.f&=-17,this.i++)}catch(e){this.v=e,this.f|=16,this.i++}return J=n,ca(this),this.f&=-2,!0};Ie.prototype.S=function(n){if(this.t===void 0){this.f|=36;for(var t=this.s;t!==void 0;t=t.n)t.S.S(t)}kt.prototype.S.call(this,n)};Ie.prototype.U=function(n){if(this.t!==void 0&&(kt.prototype.U.call(this,n),this.t===void 0)){this.f&=-33;for(var t=this.s;t!==void 0;t=t.n)t.S.U(t)}};Ie.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(var n=this.t;n!==void 0;n=n.x)n.t.N()}};Object.defineProperty(Ie.prototype,"value",{get:function(){if(1&this.f)throw new Error("Cycle detected");var n=oa(this);if(this.h(),n!==void 0&&(n.i=this.i),16&this.f)throw this.v;return this.v}});function en(n,t){return new Ie(n,t)}function da(n){var t=n.u;if(n.u=void 0,typeof t=="function"){ke++;var e=J;J=void 0;try{t()}catch(i){throw n.f&=-2,n.f|=8,ir(n),i}finally{J=e,Ai()}}}function ir(n){for(var t=n.s;t!==void 0;t=t.n)t.S.U(t);n.x=void 0,n.s=void 0,da(n)}function dd(n){if(J!==this)throw new Error("Out-of-order effect");ca(this),J=n,this.f&=-2,8&this.f&&ir(this),Ai()}function nn(n,t){this.x=n,this.u=void 0,this.s=void 0,this.o=void 0,this.f=32,this.name=t?.name}nn.prototype.c=function(){var n=this.S();try{if(8&this.f||this.x===void 0)return;var t=this.x();typeof t=="function"&&(this.u=t)}finally{n()}};nn.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1,this.f&=-9,da(this),la(this),ke++;var n=J;return J=this,dd.bind(this,n)};nn.prototype.N=function(){2&this.f||(this.f|=2,this.o=Bn,Bn=this)};nn.prototype.d=function(){this.f|=8,1&this.f||ir(this)};nn.prototype.dispose=function(){this.d()};function Ne(n,t){var e=new nn(n,t);try{e.c()}catch(s){throw e.d(),s}var i=e.d.bind(e);return i[Symbol.dispose]=i,i}var ha,Ri,sr,Oi=typeof window<"u"&&!!window.__PREACT_SIGNALS_DEVTOOLS__;var ua=[];Ne(function(){ha=this.N})();function sn(n,t){K[n]=t.bind(null,K[n]||function(){})}function Ci(n){sr&&sr(),sr=n&&n.S()}function fa(n){var t=this,e=n.data,i=rn(e);i.value=e;var s=ct(function(){for(var a=t,l=t.__v;l=l.__;)if(l.__c){l.__c.__$f|=4;break}var c=en(function(){var f=i.value.value;return f===0?0:f===!0?"":f||""}),d=en(function(){return!Array.isArray(c.value)&&!$s(c.value)}),h=Ne(function(){if(this.N=pa,d.value){var f=c.value;a.__v&&a.__v.__e&&a.__v.__e.nodeType===3&&(a.__v.__e.data=f)}}),u=t.__$u.d;return t.__$u.d=function(){h(),u.call(this)},[d,c]},[]),r=s[0],o=s[1];return r.value?o.peek():o.value}fa.displayName="ReactiveTextNode";Object.defineProperties(kt.prototype,{constructor:{configurable:!0,value:void 0},type:{configurable:!0,value:fa},props:{configurable:!0,get:function(){return{data:this}}},__b:{configurable:!0,value:1}});sn("__b",function(n,t){if(Oi&&typeof t.type=="function"&&window.__PREACT_SIGNALS_DEVTOOLS__.exitComponent(),typeof t.type=="string"){var e,i=t.props;for(var s in i)if(s!=="children"){var r=i[s];r instanceof kt&&(e||(t.__np=e={}),e[s]=r,i[s]=r.peek())}}n(t)});sn("__r",function(n,t){if(Oi&&typeof t.type=="function"&&window.__PREACT_SIGNALS_DEVTOOLS__.enterComponent(t),t.type!==ne){Ci();var e,i=t.__c;i&&(i.__$f&=-2,(e=i.__$u)===void 0&&(i.__$u=e=function(s){var r;return Ne(function(){r=this}),r.c=function(){i.__$f|=1,i.setState({})},r}())),Ri=i,Ci(e)}n(t)});sn("__e",function(n,t,e,i){Oi&&window.__PREACT_SIGNALS_DEVTOOLS__.exitComponent(),Ci(),Ri=void 0,n(t,e,i)});sn("diffed",function(n,t){Oi&&typeof t.type=="function"&&window.__PREACT_SIGNALS_DEVTOOLS__.exitComponent(),Ci(),Ri=void 0;var e;if(typeof t.type=="string"&&(e=t.__e)){var i=t.__np,s=t.props;if(i){var r=e.U;if(r)for(var o in r){var a=r[o];a!==void 0&&!(o in i)&&(a.d(),r[o]=void 0)}else r={},e.U=r;for(var l in i){var c=r[l],d=i[l];c===void 0?(c=hd(e,l,d,s),r[l]=c):c.o(d,s)}}}n(t)});function hd(n,t,e,i){var s=t in n&&n.ownerSVGElement===void 0,r=ie(e);return{o:function(o,a){r.value=o,i=a},d:Ne(function(){this.N=pa;var o=r.value.value;i[t]!==o&&(i[t]=o,s?n[t]=o:o!=null&&(o!==!1||t[4]==="-")?n.setAttribute(t,o):n.removeAttribute(t))})}}sn("unmount",function(n,t){if(typeof t.type=="string"){var e=t.__e;if(e){var i=e.U;if(i){e.U=void 0;for(var s in i){var r=i[s];r&&r.d()}}}}else{var o=t.__c;if(o){var a=o.__$u;a&&(o.__$u=void 0,a.d())}}n(t)});sn("__h",function(n,t,e,i){(i<3||i===9)&&(t.__$f|=2),n(t,e,i)});ve.prototype.shouldComponentUpdate=function(n,t){var e=this.__$u,i=e&&e.s!==void 0;for(var s in t)return!0;if(this.__f||typeof this.u=="boolean"&&this.u===!0){var r=2&this.__$f;if(!(i||r||4&this.__$f)||1&this.__$f)return!0}else if(!(i||4&this.__$f)||3&this.__$f)return!0;for(var o in n)if(o!=="__source"&&n[o]!==this.props[o])return!0;for(var a in this.props)if(!(a in n))return!0;return!1};function rn(n,t){return Gt(function(){return ie(n,t)})[0]}function tt(n,t){var e=lt(n);return e.current=n,Ri.__$f|=4,ct(function(){return en(function(){return e.current()},t)},[])}var ud=function(n){queueMicrotask(function(){queueMicrotask(n)})};function fd(){er(function(){for(var n;n=ua.shift();)ha.call(n)})}function pa(){ua.push(this)===1&&(K.requestAnimationFrame||ud)(fd)}var on={trackersFolder:"0. Files/Trackers",dateFormat:"YYYY-MM-DD",daysToShow:30,showChartByDefault:!0,showStatsByDefault:!1,hideChartOnMobile:!1,hideStatsOnMobile:!1,hideTrackerTitle:!1,disableLimitReaction:!1};var rr=class{constructor(){this.settings=ie(on);this.trackerStates=ie(new Map);this.iconizeData=ie(null);this.loadingTrackers=ie(new Set);this.entriesVersions=ie(new Map)}setSettings(t){this.settings.value={...t}}getTrackerState(t){return this.trackerStates.value.get(t)}setTrackerState(t,e){let i=new Map(this.trackerStates.value);i.set(t,e),this.trackerStates.value=i}updateTrackerEntries(t,e){let i=this.trackerStates.value.get(t);if(i){let s=new Map(this.trackerStates.value);s.set(t,{...i,entries:e,lastUpdated:Date.now()}),this.trackerStates.value=s,this.incrementEntriesVersion(t)}}updateSingleEntry(t,e,i){let s=this.trackerStates.value.get(t);if(s){let r=new Map(s.entries);r.set(e,i);let o=new Map(this.trackerStates.value);o.set(t,{...s,entries:r,lastUpdated:Date.now()}),this.trackerStates.value=o,this.incrementEntriesVersion(t)}}deleteEntry(t,e){let i=this.trackerStates.value.get(t);if(i){let s=new Map(i.entries);s.delete(e);let r=new Map(this.trackerStates.value);r.set(t,{...i,entries:s,lastUpdated:Date.now()}),this.trackerStates.value=r,this.incrementEntriesVersion(t)}}incrementEntriesVersion(t){let e=new Map(this.entriesVersions.value),i=e.get(t)??0;e.set(t,i+1),this.entriesVersions.value=e}getEntriesVersion(t){return this.entriesVersions.value.get(t)??0}clearTrackerState(t){let e=new Map(this.trackerStates.value);e.delete(t),this.trackerStates.value=e;let i=new Map(this.entriesVersions.value);i.delete(t),this.entriesVersions.value=i}moveTrackerState(t,e){let i=this.trackerStates.value.get(t);if(i){let s=new Map(this.trackerStates.value);s.delete(t),s.set(e,i),this.trackerStates.value=s}}setTrackerLoading(t,e){let i=new Set(this.loadingTrackers.value);e?i.add(t):i.delete(t),this.loadingTrackers.value=i}isTrackerLoading(t){return this.loadingTrackers.value.has(t)}setIconizeData(t){this.iconizeData.value=t}getIcon(t){let e=this.iconizeData.value;if(!e)return null;let i=this.normalizePath(t);if(e[i])return e[i];let s=`/${i}`;if(e[s])return e[s];if(i.endsWith(".md")){let r=i.slice(0,-3);if(e[r])return e[r];if(e[`/${r}`])return e[`/${r}`]}return null}normalizePath(t){return t?t.replace(/\\/g,"/").replace(/\/+/g,"/").replace(/^\/+/,"").replace(/\/$/,""):""}clear(){this.trackerStates.value=new Map,this.loadingTrackers.value=new Set,this.iconizeData.value=null,this.entriesVersions.value=new Map}},B=new rr;var or=$o(null);function ma(){let n=ia(or);if(!n)throw new Error("useTrackerContext must be used within TrackerContext.Provider");return n}var pd=0,Im=Array.isArray;function S(n,t,e,i,s,r){t||(t={});var o,a,l=t;if("ref"in l)for(a in l={},t)a=="ref"?o=t[a]:l[a]=t[a];var c={type:n,props:l,key:e,ref:o,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--pd,__i:-1,__u:0,__source:s,__self:r};if(typeof n=="function"&&(o=n.defaultProps))for(a in o)l[a]===void 0&&(l[a]=o[a]);return K.vnode&&K.vnode(c),c}function ar({dateIso:n,onDateChange:t,onNavigate:e,isUpdating:i}){let s=N(a=>{let l=a.target;t(l.value)},[t]),r=N(()=>{e(-1)},[e]),o=N(()=>{e(1)},[e]);return S("div",{class:O.DATE_PICKER_CONTAINER,children:S("div",{class:O.DATE_PICKER,children:[S("button",{type:"button",class:`${O.DATE_NAV_BTN} ${O.DATE_NAV_BTN_LEFT}`,onClick:r,disabled:i,title:L.YESTERDAY,children:"\u25C0"}),S("input",{type:"date",class:`${O.DATE_INPUT}${i?` ${O.DATE_INPUT_UPDATING}`:""}`,value:n,onChange:s,disabled:i}),S("button",{type:"button",class:`${O.DATE_NAV_BTN} ${O.DATE_NAV_BTN_RIGHT}`,onClick:o,disabled:i,title:L.TOMORROW,children:"\u25B6"})]})})}function lr({isActive:n}){return S("div",{class:`${O.LOADING}${n?` ${O.LOADING_ACTIVE}`:""}`,children:[S("div",{class:O.LOADING_DOT}),S("span",{children:L.UPDATING})]})}var xs=require("obsidian");function ft(n){return n?n.trim().replace(/\\/g,"/").replace(/\/+/g,"/").replace(/^\/+/,"").replace(/\/$/,""):""}function ga(n){if(!n)return"";let t=ft(n),e=t.lastIndexOf("/");return e===-1?"":t.substring(0,e)}var _a=require("obsidian");function Vn({path:n,isFile:t=!1,className:e=""}){let i=lt(null),s=lt(null),r=tt(()=>{let l=B.iconizeData.value;if(!l)return null;let c=n.replace(/\\/g,"/").replace(/\/+/g,"/").replace(/^\/+/,"").replace(/\/$/,"");if(l[c])return l[c];let d=`/${c}`;if(l[d])return l[d];if(c.endsWith(".md")){let h=c.slice(0,-3);if(l[h])return l[h];if(l[`/${h}`])return l[`/${h}`]}return null});if(ut(()=>{if(!i.current||!r.value){i.current&&(i.current.innerHTML=""),s.current=null;return}let l=r.value,c=l.startsWith("Li"),d=c?"lucide":"emoji";if(s.current!==null&&s.current!==d&&(i.current.innerHTML=""),c){let u=l.substring(2).replace(/([A-Z])/g,"-$1").toLowerCase().replace(/^-/,"");(0,_a.setIcon)(i.current,u)}else i.current.textContent=l;s.current=d},[r.value]),!r.value)return null;let o=r.value,a=o.startsWith("Li");return S("span",{ref:i,class:`iconize-icon ${a?"lucide-icon":""} ${e}`.trim(),"aria-label":o,style:{marginRight:"0.3em",display:"inline-block"}})}function cr({file:n,displayName:t,plugin:e,onEdit:i,onMoveUp:s,onMoveDown:r,limitProgress:o}){let a=lt(null);ut(()=>{a.current&&(o?(a.current.style.setProperty("--limit-progress-width",o.width),a.current.style.setProperty("--limit-progress-color",o.color)):(a.current.style.setProperty("--limit-progress-width","0%"),a.current.style.setProperty("--limit-progress-color","transparent")))},[o]);let l=N(c=>{c.preventDefault(),c.stopPropagation(),e.app.workspace.openLinkText(n.path,"",!1)},[e,n.path]);return S("div",{ref:a,class:O.TRACKER_HEADER,children:[S("div",{class:O.TRACKER_TITLE,children:[S(Vn,{path:n.path,isFile:!0,className:"tracker-notes__tracker-icon"}),S("a",{class:"internal-link",href:n.path,"data-href":n.path,onClick:l,children:t})]}),(s||r)&&S("div",{class:O.ORDER_BTN_CONTAINER,children:[s&&S("button",{type:"button",class:O.ORDER_BTN_UP,onClick:s,title:L.MOVE_UP,children:"\u2191"}),r&&S("button",{type:"button",class:O.ORDER_BTN_DOWN,onClick:r,title:L.MOVE_DOWN,children:"\u2193"})]}),i&&S("button",{type:"button",class:O.SETTINGS_BTN,onClick:i,title:L.TRACKER_SETTINGS,children:"\u2699\uFE0F"})]})}var ba=require("obsidian");function V(n,t,e=!1){let i=t instanceof Error?t.message:String(t),s=`${n}: ${i}`;console.error(s,t),e&&new ba.Notice(`${it.WRITE_ERROR}: ${i}`,3e3)}function Pi(n){console.warn(n)}function ya({file:n,dateIso:t,plugin:e}){let i=tt(()=>B.getTrackerState(n.path)?.entries??new Map),s=ct(()=>{let f=i.value.get(t);return f!=null&&!isNaN(Number(f))?String(f):""},[i.value,t]),[r,o]=Gt(s),a=lt(null),l=lt(null);ut(()=>{o(s)},[s]);let c=N(async(f,p=!1)=>{if(l.current&&(clearTimeout(l.current),l.current=null),f===""||f.trim()===""){let _=async()=>{try{await e.deleteEntry(n,t)}catch(b){V("NumberControl: delete error",b)}};p?await _():l.current=setTimeout(_,300);return}let m=Number(f);if(isNaN(m))return;let g=async()=>{try{await e.writeLogLine(n,t,String(m))}catch(_){V("NumberControl: write error",_)}};p?await g():l.current=setTimeout(g,300)},[e,n,t]);ut(()=>()=>{l.current&&(clearTimeout(l.current),l.current=null)},[]);let d=N(f=>{let p=f.target;o(p.value),c(p.value,!1),a.current&&(a.current.style.transform="scale(0.98)",setTimeout(()=>{a.current&&(a.current.style.transform="")},300))},[c]),h=N(f=>{f.key==="Enter"&&c(r,!0)},[r,c]),u=N(()=>{c(r,!0)},[r,c]);return S("div",{class:O.ROW,children:S("input",{ref:a,type:"number",placeholder:"0",value:r,onInput:d,onKeyPress:h,onBlur:u})})}function va({file:n,dateIso:t,plugin:e,fileOptions:i}){let s=parseFloat(i.step||String(H.STEP))||H.STEP,r=tt(()=>B.getTrackerState(n.path)?.entries??new Map),o=ct(()=>{let p=r.value.get(t);return p!=null&&!isNaN(Number(p))?Number(p):0},[r.value,t]),[a,l]=Gt(o),[c,d]=Gt(!1);ut(()=>{l(o)},[o]);let h=N(async p=>{try{await e.writeLogLine(n,t,String(p))}catch(m){V("PlusMinusControl: write error",m)}},[e,n,t]),u=N(async()=>{let p=(Number.isFinite(a)?a:0)-s;l(p),d(!0),await h(p),setTimeout(()=>d(!1),300)},[a,s,h]),f=N(async()=>{let p=(Number.isFinite(a)?a:0)+s;l(p),d(!0),await h(p),setTimeout(()=>d(!1),300)},[a,s,h]);return S("div",{class:O.ROW,children:[S("button",{type:"button",onClick:u,children:"\u2212"}),S("span",{class:`${O.VALUE}${c?` ${O.VALUE_UPDATED}`:""}`,children:a}),S("button",{type:"button",onClick:f,children:"+"})]})}var xa=600;function ka({file:n,dateIso:t,plugin:e}){let i=tt(()=>B.getTrackerState(n.path)?.entries??new Map),s=ct(()=>{let h=i.value.get(t);return h!=null&&typeof h=="string"?h:""},[i.value,t]),[r,o]=Gt(s),a=lt(null);ut(()=>{o(s)},[s]);let l=N(async(h,u=!1)=>{if(a.current&&(clearTimeout(a.current),a.current=null),h===""||h.trim()===""){let p=async()=>{try{await e.deleteEntry(n,t)}catch(m){V("TextControl: delete error",m)}};u?await p():a.current=setTimeout(p,xa);return}let f=async()=>{try{let p=h.trim();await e.writeLogLine(n,t,p)}catch(p){V("TextControl: write error",p)}};u?await f():a.current=setTimeout(f,xa)},[e,n,t]);ut(()=>()=>{a.current&&(clearTimeout(a.current),a.current=null)},[]);let c=N(h=>{let u=h.target;o(u.value),l(u.value,!1)},[l]),d=N(()=>{l(r,!0)},[r,l]);return S("div",{class:O.ROW,children:S("textarea",{class:O.TEXT_INPUT,placeholder:jt.TEXT_INPUT,value:r,onInput:c,onBlur:d})})}function Ta({file:n,dateIso:t,plugin:e,fileOptions:i}){let s=parseFloat(i.minValue||String(H.MIN_VALUE))||H.MIN_VALUE,r=parseFloat(i.maxValue||String(H.MAX_VALUE))||H.MAX_VALUE,o=parseFloat(i.step||String(H.STEP))||H.STEP,a=tt(()=>B.getTrackerState(n.path)?.entries??new Map),l=ct(()=>{let v=a.value.get(t);return v!=null&&!isNaN(Number(v))?Math.max(s,Math.min(r,Number(v))):s},[a.value,t,s,r]),[c,d]=Gt(l),[h,u]=Gt(!1),f=lt(null),p=lt(!1);ut(()=>{d(l)},[l]);let m=N(v=>{if(!f.current)return s;let E=f.current.getBoundingClientRect(),C=v-E.left,R=Math.max(0,Math.min(1,C/E.width)),F=s+(r-s)*R,X=Math.round((F-s)/o)*o+s;return Math.max(s,Math.min(r,X))},[s,r,o]),g=N(async v=>{try{await e.writeLogLine(n,t,String(v))}catch(E){V("ScaleControl: write error",E)}},[e,n,t]),_=N(v=>{if(v.button!==0)return;u(!0),p.current=!1;let E=m(v.clientX);d(E),v.preventDefault()},[m]),b=N(v=>{if(!h)return;p.current=!0;let E=m(v.clientX);d(E)},[h,m]),k=N(async()=>{h&&(u(!1),p.current&&await g(c))},[h,c,g]),y=N(async v=>{if(p.current){p.current=!1;return}let E=v.target;if(E.classList.contains(O.PROGRESS_BAR_PROGRESS)||E.classList.contains(O.PROGRESS_BAR_VALUE)||E.classList.contains(O.PROGRESS_BAR_LABEL_LEFT)||E.classList.contains(O.PROGRESS_BAR_LABEL_RIGHT))return;let C=m(v.clientX);d(C),await g(C)},[m,g]),x=N(v=>{let E=c;if(v.key==="ArrowLeft"||v.key==="ArrowDown")v.preventDefault(),E=Math.max(s,c-o);else if(v.key==="ArrowRight"||v.key==="ArrowUp")v.preventDefault(),E=Math.min(r,c+o);else if(v.key==="Home")v.preventDefault(),E=s;else if(v.key==="End")v.preventDefault(),E=r;else return;d(E)},[c,s,r,o]),T=N(async v=>{["ArrowLeft","ArrowDown","ArrowRight","ArrowUp","Home","End"].includes(v.key)&&await g(c)},[c,g]);ut(()=>{if(h)return document.addEventListener("mousemove",b),document.addEventListener("mouseup",k),()=>{document.removeEventListener("mousemove",b),document.removeEventListener("mouseup",k)}},[h,b,k]);let w=(c-s)/(r-s)*100;return S("div",{class:O.PROGRESS_BAR_WRAPPER,"data-internal-value":c,children:S("div",{ref:f,class:O.PROGRESS_BAR_INPUT,tabIndex:0,role:"button","aria-label":String(c),"aria-valuemin":s,"aria-valuemax":r,"aria-valuenow":c,onClick:y,onMouseDown:_,onKeyDown:x,onKeyUp:T,style:{cursor:h?"col-resize":void 0},children:[S("div",{class:O.PROGRESS_BAR_PROGRESS,role:"slider",tabIndex:0,"aria-valuemin":s,"aria-valuemax":r,"aria-valuenow":c,style:{width:`${w}%`}}),S("span",{class:O.PROGRESS_BAR_VALUE,children:c}),S("span",{class:O.PROGRESS_BAR_LABEL_LEFT,children:s}),S("span",{class:O.PROGRESS_BAR_LABEL_RIGHT,children:r})]})})}function Sa(n){return n.replace(/[<>:"/\\|?*]/g,"_")}function zn(n){if(n==null)return!1;if(typeof n=="number")return n!==0;let t=String(n);return t==="1"||t==="true"||t.trim()!==""}function wa({file:n,dateIso:t,plugin:e,daysToShow:i,trackerType:s,startTrackingDate:r}){let o=lt(null),a=lt({x:0,y:0,isScrolling:!1}),l=tt(()=>B.getTrackerState(n.path)?.entries??new Map),c=ct(()=>{let g=D.parse(t,e.settings.dateFormat),_=[];for(let b=0;b<i;b++){let k=g.clone().subtract(b,"days"),y=D.format(k,e.settings.dateFormat);_.push(y)}return _.map(b=>`${b}:${l.value.get(b)??""}`).join("|")},[t,i,l.value,e.settings.dateFormat]),d=ct(()=>{let g=D.parse(t,e.settings.dateFormat),_=D.now(),b=D.startOfDay(_),k=D.format(b,e.settings.dateFormat),y=null;if(r)try{y=D.parseMultiple(r,[e.settings.dateFormat,"YYYY-MM-DD","DD.MM.YYYY","MM/DD/YYYY"])}catch{}let x=[];for(let T=0;T<i;T++){let w=g.clone().subtract(T,"days"),v=D.format(w,e.settings.dateFormat),E=w.getDate(),C=l.value.get(v),R=zn(C),F=v===r,X=!1,$=!1;D.isAfter(w,b)?$=!0:y&&D.isBefore(w,y)&&(X=!0),x.push({dateStr:v,dayNum:E,hasValue:R,isStartDay:F,isBeforeStart:X,isAfterToday:$})}return x},[t,i,c,e.settings.dateFormat,r]),h=N(async g=>{let _=g.target;if(!_.classList.contains(O.HEATMAP_DAY))return;let b=_.dataset.dateStr;if(!b)return;let k=d.find(T=>T.dateStr===b);if(!k||k.isAfterToday||k.isBeforeStart)return;let x=k.hasValue?0:1;try{await e.writeLogLine(n,k.dateStr,String(x))}catch(T){V("Heatmap: write error",T)}},[e,n,d]),u=N(g=>{g.touches.length===1&&(a.current={x:g.touches[0].clientX,y:g.touches[0].clientY,isScrolling:!1})},[]),f=N(g=>{if(g.touches.length===1&&a.current.x!==0){let _=Math.abs(g.touches[0].clientX-a.current.x),b=Math.abs(g.touches[0].clientY-a.current.y);_>b*1.5&&_>10?(a.current.isScrolling=!0,g.stopPropagation()):a.current.isScrolling=!1}},[]),p=N(g=>{a.current.isScrolling&&g.stopPropagation(),a.current={x:0,y:0,isScrolling:!1}},[]),m=N(g=>{let _=[O.HEATMAP_DAY,s];return g.hasValue&&_.push("has-value"),g.isStartDay&&_.push("start-day"),g.isBeforeStart&&_.push("before-start"),g.isAfterToday&&_.push("after-today"),_.join(" ")},[s]);return S("div",{ref:o,class:O.HEATMAP,onClick:h,onTouchStart:u,onTouchMove:f,onTouchEnd:p,children:d.map(g=>S("div",{class:m(g),"data-date-str":g.dateStr,children:g.dayNum},g.dateStr))})}function Hn(n){let t=Number(n);return Number.isFinite(t)?t:n}function Fi(n){let t=n.trim();return t===""?0:t.split(/\s+/).filter(e=>e.length>0).length}var an=["YYYY-MM-DD","DD.MM.YYYY","MM/DD/YYYY","YYYY/MM/DD"];function ln(n,t,e){let i=[e.dateFormat,...an],s=[...new Set(i)];for(let r of s){let o=D.format(t,r),a=n.get(o);if(a!==void 0)return a}}function Wn(n,t,e,i,s){let r=null,o=["YYYY-MM-DD",i.dateFormat,...an],a=[...new Set(o)];if(n&&(r=D.parseMultiple(n,a),r.isValid()?r=D.startOfDay(r):r=null),!r&&t?.stat?.ctime&&(r=D.startOfDay(D.fromDate(new Date(t.stat.ctime)))),e.size>0){let c=Array.from(e.keys()).sort()[0],d=D.parseMultiple(c,[i.dateFormat,...an]);if(d.isValid()){let h=D.startOfDay(d);(!r||D.isBefore(h,r))&&(r=h)}}return r||(r=D.startOfDay(D.subtractDays(s,365))),r}function cn(n,t){return t?n==null||n===void 0?!0:!zn(n):n!=null&&n!==void 0?zn(n):!1}var dr=class{calculateHabitStatistics(t,e,i,s,r,o){let a=D.parse(i,e.dateFormat),l=a.clone().subtract(s-1,"days"),c=l;if(o){let y=D.parseMultiple(o,[e.dateFormat,...an]);y.isValid()&&D.isAfter(y,l)&&(c=y)}let d=[],u=r.toLowerCase()===P.BAD_HABIT,f=0,p=c.clone();for(;!D.isAfter(p,a);){let y=D.format(p,e.dateFormat),x=t.get(y),T=0;x!=null&&(typeof x=="number"?T=x:x==="1"||String(x)==="true"?T=1:T=Number(x)||0),u?T=T===0||x==null?1:0:T=x!=null&&T>0?1:0,d.push(T),f++,p=p.add(1,"days")}let m=d.reduce((y,x)=>y+x,0),g=f>0?m/f:0,_=t.size,b=d.filter(y=>y>0).length,k=f>0?b/f*100:0;return{totalRecords:_,periodDays:d,actualDaysCount:f,completionRate:k,activeDays:b,sum:m,avg:g}}calculateMetricStatistics(t,e,i,s,r,o){let a=D.parse(i,e.dateFormat),l=a.clone().subtract(s-1,"days"),c=l;if(o){let T=D.parseMultiple(o,[e.dateFormat,...an]);T.isValid()&&D.isAfter(T,l)&&(c=T)}let d=[],h=r.toLowerCase(),u=0,f=c.clone();for(;!D.isAfter(f,a);){let T=D.format(f,e.dateFormat),w=t.get(T),v=0;w!=null&&(h===P.TEXT?v=Fi(String(w)):typeof w=="number"?v=w:w==="1"||String(w)==="true"?v=1:v=Number(w)||0),d.push(v),u++,f=f.add(1,"days")}let p=d.reduce((T,w)=>T+w,0),m=u>0?p/u:0,g=t.size,_=null,b=null,k=null,y=d.filter(T=>T>0);if(d.length>0){let T=[...d].sort((v,E)=>v-E);_=T[0],b=T[T.length-1];let w=Math.floor(T.length/2);T.length%2===0?k=(T[w-1]+T[w])/2:k=T[w]}let x=y.length;return{totalRecords:g,periodDays:d,actualDaysCount:u,sum:p,avg:m,min:_,max:b,median:k,activeDays:x}}calculateStreaks(t,e,i,s,r,o){let l=s.toLowerCase()===P.BAD_HABIT,c;if(i instanceof Date?c=D.fromDate(i):i&&typeof i.isValid=="function"&&typeof i.clone=="function"?c=i.clone():c=D.fromDate(new Date(i)),!c||!c.isValid||!c.isValid())return{current:0,best:0};c=D.startOfDay(c);let d=Wn(o,r,t,e,c);if(!d||!d.isValid())return{current:0,best:0};let h=0,u=0,f=c.clone();for(;u<3650&&!D.isBefore(f,d);){let _=ln(t,f,e);if(cn(_,l))h++;else break;f=f.subtract(1,"days"),u++}let p=0,m=0;u=0;let g=c.clone();for(;!D.isBefore(g,d)&&u<3650;){let _=ln(t,g,e);cn(_,l)?(m++,p=Math.max(p,m)):m=0,g=g.subtract(1,"days"),u++}return{current:h,best:p}}calculateStatistics(t,e,i,s,r,o,a,l){let c=r.toLowerCase(),d=c===P.GOOD_HABIT||c===P.BAD_HABIT,h=this.calculateStreaks(t,e,o,r,a,l),u=null,f=null,p;return d?(u=this.calculateHabitStatistics(t,e,i,s,r,l),p={totalRecords:u.totalRecords,periodDays:u.periodDays,actualDaysCount:u.actualDaysCount}):(f=this.calculateMetricStatistics(t,e,i,s,r,l),p={totalRecords:f.totalRecords,periodDays:f.periodDays,actualDaysCount:f.actualDaysCount}),{base:p,habit:u,metric:f,streaks:h,trackerType:r}}},Ea=new dr;function md(n){return n>=80?"tracker-notes__stats-value--success":n>=50?"tracker-notes__stats-value--warning":"tracker-notes__stats-value--error"}function Yn(n,t=1,e=""){let i=n.toFixed(t);return e?`${i} ${e}`:i}function gd(n){return n===1?zt.DAYS_SINGULAR:n<5?zt.DAYS_PLURAL_2_4:zt.DAYS_PLURAL_5_PLUS}function hr({title:n,children:t}){return S("div",{class:"tracker-notes__stats-section tracker-notes__stats-card",children:[n&&S("div",{class:"tracker-notes__stats-section-title",children:S("span",{children:n})}),t]})}function Ii({label:n,value:t,valueClass:e,icon:i}){return S("div",{class:"tracker-notes__stats-metric",children:[i&&S("span",{class:"tracker-notes__stats-icon",children:i}),S("span",{class:"tracker-notes__stats-label",children:[n,": "]}),S("span",{class:`tracker-notes__stats-value ${e||""}`.trim(),children:t})]})}function _d({rate:n,activeDays:t,totalDays:e,label:i}){let s=Math.round(n),r=md(s);return S("div",{class:"tracker-notes__stats-metric tracker-notes__stats-metric--completion",children:[S("div",{class:"tracker-notes__stats-completion-header",children:[S("span",{class:"tracker-notes__stats-icon",children:"\u2705"}),S("span",{class:"tracker-notes__stats-label",children:[i,": "]}),S("span",{class:`tracker-notes__stats-value ${r}`,children:[s,"%"]}),S("span",{class:"tracker-notes__stats-value-sub",children:[" (",t,"/",e,")"]})]}),S("div",{class:"tracker-notes__stats-progress-bar",children:S("div",{class:`tracker-notes__stats-progress-fill ${r}`,style:{width:`${n}%`}})})]})}function Ma({streak:n,label:t,isCurrent:e=!1}){let i=e?"\u{1F525}":"\u2B50",s=gd(n);return S("div",{class:`tracker-notes__stats-metric tracker-notes__stats-metric--streak ${e?"tracker-notes__stats-metric--current":""}`,children:[S("span",{class:"tracker-notes__stats-icon tracker-notes__stats-icon--streak",children:i}),S("span",{class:"tracker-notes__stats-label",children:[t,": "]}),S("span",{class:"tracker-notes__stats-value",children:[n," ",s]})]})}function bd({result:n}){if(!n.habit)return null;let t=n.habit,i=n.trackerType.toLowerCase()===P.BAD_HABIT?"Days without":zt.COMPLETION_RATE;return S(ne,{children:[S(hr,{title:"PERIOD",children:S(_d,{rate:t.completionRate,activeDays:t.activeDays,totalDays:t.actualDaysCount,label:i})}),S(hr,{title:"STREAKS",children:[S(Ma,{streak:n.streaks.current,label:zt.CURRENT_STREAK,isCurrent:!0}),S(Ma,{streak:n.streaks.best,label:zt.BEST_STREAK})]})]})}function yd({result:n,unit:t}){if(!n.metric)return null;let e=n.metric;return S(hr,{title:"PERIOD",children:[S(Ii,{label:zt.ACTIVE_DAYS,value:`${e.activeDays}/${e.actualDaysCount}`,icon:"\u{1F4C5}"}),S(Ii,{label:zt.LAST_DAYS,value:Yn(e.sum,1,t),icon:"\u{1F4C8}"}),S(Ii,{label:zt.AVERAGE,value:Yn(e.avg,1,t),icon:"\u{1F4CA}"}),e.min!==null&&e.max!==null&&S("div",{class:"tracker-notes__stats-metric tracker-notes__stats-metric--minmax",children:[S("span",{class:"tracker-notes__stats-icon",children:"\u{1F4C9}"}),S("span",{class:"tracker-notes__stats-label",children:[zt.MIN,": "]}),S("span",{class:"tracker-notes__stats-value",children:Yn(e.min,1,t)}),S("span",{children:" | "}),S("span",{class:"tracker-notes__stats-label",children:[zt.MAX,": "]}),S("span",{class:"tracker-notes__stats-value",children:Yn(e.max,1,t)})]}),e.median!==null&&S(Ii,{label:zt.MEDIAN,value:Yn(e.median,1,t),icon:"\u{1F4CA}"})]})}function ur({file:n,plugin:t,dateIso:e,daysToShow:i,trackerType:s,fileOptions:r}){let o=tt(()=>B.getTrackerState(n.path)?.entries??new Map),a=ct(()=>{try{let d=D.parse(e,t.settings.dateFormat),h=t.getStartTrackingDate(o.value,r);return Ea.calculateStatistics(o.value,t.settings,e,i,s,d,n,h)}catch(d){return V("Statistics: error calculating statistics",d),null}},[n,t,e,i,s,o.value,r]);if(!a)return null;let l=s===P.GOOD_HABIT||s===P.BAD_HABIT,c=r?.unit||"";return S("div",{class:O.STATS,children:l?S(bd,{result:a}):S(yd,{result:a,unit:c})})}function Gn(n){return n+.5|0}var Te=(n,t,e)=>Math.max(Math.min(n,e),t);function $n(n){return Te(Gn(n*2.55),0,255)}function Se(n){return Te(Gn(n*255),0,255)}function ue(n){return Te(Gn(n/2.55)/100,0,1)}function Da(n){return Te(Gn(n*100),0,100)}var Xt={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,A:10,B:11,C:12,D:13,E:14,F:15,a:10,b:11,c:12,d:13,e:14,f:15},pr=[..."0123456789ABCDEF"],vd=n=>pr[n&15],xd=n=>pr[(n&240)>>4]+pr[n&15],Ni=n=>(n&240)>>4===(n&15),kd=n=>Ni(n.r)&&Ni(n.g)&&Ni(n.b)&&Ni(n.a);function Td(n){var t=n.length,e;return n[0]==="#"&&(t===4||t===5?e={r:255&Xt[n[1]]*17,g:255&Xt[n[2]]*17,b:255&Xt[n[3]]*17,a:t===5?Xt[n[4]]*17:255}:(t===7||t===9)&&(e={r:Xt[n[1]]<<4|Xt[n[2]],g:Xt[n[3]]<<4|Xt[n[4]],b:Xt[n[5]]<<4|Xt[n[6]],a:t===9?Xt[n[7]]<<4|Xt[n[8]]:255})),e}var Sd=(n,t)=>n<255?t(n):"";function wd(n){var t=kd(n)?vd:xd;return n?"#"+t(n.r)+t(n.g)+t(n.b)+Sd(n.a,t):void 0}var Ed=/^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;function Oa(n,t,e){let i=t*Math.min(e,1-e),s=(r,o=(r+n/30)%12)=>e-i*Math.max(Math.min(o-3,9-o,1),-1);return[s(0),s(8),s(4)]}function Md(n,t,e){let i=(s,r=(s+n/60)%6)=>e-e*t*Math.max(Math.min(r,4-r,1),0);return[i(5),i(3),i(1)]}function Dd(n,t,e){let i=Oa(n,1,.5),s;for(t+e>1&&(s=1/(t+e),t*=s,e*=s),s=0;s<3;s++)i[s]*=1-t-e,i[s]+=t;return i}function Ad(n,t,e,i,s){return n===s?(t-e)/i+(t<e?6:0):t===s?(e-n)/i+2:(n-t)/i+4}function mr(n){let e=n.r/255,i=n.g/255,s=n.b/255,r=Math.max(e,i,s),o=Math.min(e,i,s),a=(r+o)/2,l,c,d;return r!==o&&(d=r-o,c=a>.5?d/(2-r-o):d/(r+o),l=Ad(e,i,s,d,r),l=l*60+.5),[l|0,c||0,a]}function gr(n,t,e,i){return(Array.isArray(t)?n(t[0],t[1],t[2]):n(t,e,i)).map(Se)}function _r(n,t,e){return gr(Oa,n,t,e)}function Cd(n,t,e){return gr(Dd,n,t,e)}function Rd(n,t,e){return gr(Md,n,t,e)}function Pa(n){return(n%360+360)%360}function Od(n){let t=Ed.exec(n),e=255,i;if(!t)return;t[5]!==i&&(e=t[6]?$n(+t[5]):Se(+t[5]));let s=Pa(+t[2]),r=+t[3]/100,o=+t[4]/100;return t[1]==="hwb"?i=Cd(s,r,o):t[1]==="hsv"?i=Rd(s,r,o):i=_r(s,r,o),{r:i[0],g:i[1],b:i[2],a:e}}function Pd(n,t){var e=mr(n);e[0]=Pa(e[0]+t),e=_r(e),n.r=e[0],n.g=e[1],n.b=e[2]}function Ld(n){if(!n)return;let t=mr(n),e=t[0],i=Da(t[1]),s=Da(t[2]);return n.a<255?`hsla(${e}, ${i}%, ${s}%, ${ue(n.a)})`:`hsl(${e}, ${i}%, ${s}%)`}var Aa={x:"dark",Z:"light",Y:"re",X:"blu",W:"gr",V:"medium",U:"slate",A:"ee",T:"ol",S:"or",B:"ra",C:"lateg",D:"ights",R:"in",Q:"turquois",E:"hi",P:"ro",O:"al",N:"le",M:"de",L:"yello",F:"en",K:"ch",G:"arks",H:"ea",I:"ightg",J:"wh"},Ca={OiceXe:"f0f8ff",antiquewEte:"faebd7",aqua:"ffff",aquamarRe:"7fffd4",azuY:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"0",blanKedOmond:"ffebcd",Xe:"ff",XeviTet:"8a2be2",bPwn:"a52a2a",burlywood:"deb887",caMtXe:"5f9ea0",KartYuse:"7fff00",KocTate:"d2691e",cSO:"ff7f50",cSnflowerXe:"6495ed",cSnsilk:"fff8dc",crimson:"dc143c",cyan:"ffff",xXe:"8b",xcyan:"8b8b",xgTMnPd:"b8860b",xWay:"a9a9a9",xgYF:"6400",xgYy:"a9a9a9",xkhaki:"bdb76b",xmagFta:"8b008b",xTivegYF:"556b2f",xSange:"ff8c00",xScEd:"9932cc",xYd:"8b0000",xsOmon:"e9967a",xsHgYF:"8fbc8f",xUXe:"483d8b",xUWay:"2f4f4f",xUgYy:"2f4f4f",xQe:"ced1",xviTet:"9400d3",dAppRk:"ff1493",dApskyXe:"bfff",dimWay:"696969",dimgYy:"696969",dodgerXe:"1e90ff",fiYbrick:"b22222",flSOwEte:"fffaf0",foYstWAn:"228b22",fuKsia:"ff00ff",gaRsbSo:"dcdcdc",ghostwEte:"f8f8ff",gTd:"ffd700",gTMnPd:"daa520",Way:"808080",gYF:"8000",gYFLw:"adff2f",gYy:"808080",honeyMw:"f0fff0",hotpRk:"ff69b4",RdianYd:"cd5c5c",Rdigo:"4b0082",ivSy:"fffff0",khaki:"f0e68c",lavFMr:"e6e6fa",lavFMrXsh:"fff0f5",lawngYF:"7cfc00",NmoncEffon:"fffacd",ZXe:"add8e6",ZcSO:"f08080",Zcyan:"e0ffff",ZgTMnPdLw:"fafad2",ZWay:"d3d3d3",ZgYF:"90ee90",ZgYy:"d3d3d3",ZpRk:"ffb6c1",ZsOmon:"ffa07a",ZsHgYF:"20b2aa",ZskyXe:"87cefa",ZUWay:"778899",ZUgYy:"778899",ZstAlXe:"b0c4de",ZLw:"ffffe0",lime:"ff00",limegYF:"32cd32",lRF:"faf0e6",magFta:"ff00ff",maPon:"800000",VaquamarRe:"66cdaa",VXe:"cd",VScEd:"ba55d3",VpurpN:"9370db",VsHgYF:"3cb371",VUXe:"7b68ee",VsprRggYF:"fa9a",VQe:"48d1cc",VviTetYd:"c71585",midnightXe:"191970",mRtcYam:"f5fffa",mistyPse:"ffe4e1",moccasR:"ffe4b5",navajowEte:"ffdead",navy:"80",Tdlace:"fdf5e6",Tive:"808000",TivedBb:"6b8e23",Sange:"ffa500",SangeYd:"ff4500",ScEd:"da70d6",pOegTMnPd:"eee8aa",pOegYF:"98fb98",pOeQe:"afeeee",pOeviTetYd:"db7093",papayawEp:"ffefd5",pHKpuff:"ffdab9",peru:"cd853f",pRk:"ffc0cb",plum:"dda0dd",powMrXe:"b0e0e6",purpN:"800080",YbeccapurpN:"663399",Yd:"ff0000",Psybrown:"bc8f8f",PyOXe:"4169e1",saddNbPwn:"8b4513",sOmon:"fa8072",sandybPwn:"f4a460",sHgYF:"2e8b57",sHshell:"fff5ee",siFna:"a0522d",silver:"c0c0c0",skyXe:"87ceeb",UXe:"6a5acd",UWay:"708090",UgYy:"708090",snow:"fffafa",sprRggYF:"ff7f",stAlXe:"4682b4",tan:"d2b48c",teO:"8080",tEstN:"d8bfd8",tomato:"ff6347",Qe:"40e0d0",viTet:"ee82ee",JHt:"f5deb3",wEte:"ffffff",wEtesmoke:"f5f5f5",Lw:"ffff00",LwgYF:"9acd32"};function Fd(){let n={},t=Object.keys(Ca),e=Object.keys(Aa),i,s,r,o,a;for(i=0;i<t.length;i++){for(o=a=t[i],s=0;s<e.length;s++)r=e[s],a=a.replace(r,Aa[r]);r=parseInt(Ca[o],16),n[a]=[r>>16&255,r>>8&255,r&255]}return n}var Bi;function Id(n){Bi||(Bi=Fd(),Bi.transparent=[0,0,0,0]);let t=Bi[n.toLowerCase()];return t&&{r:t[0],g:t[1],b:t[2],a:t.length===4?t[3]:255}}var Nd=/^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;function Bd(n){let t=Nd.exec(n),e=255,i,s,r;if(t){if(t[7]!==i){let o=+t[7];e=t[8]?$n(o):Te(o*255,0,255)}return i=+t[1],s=+t[3],r=+t[5],i=255&(t[2]?$n(i):Te(i,0,255)),s=255&(t[4]?$n(s):Te(s,0,255)),r=255&(t[6]?$n(r):Te(r,0,255)),{r:i,g:s,b:r,a:e}}}function Vd(n){return n&&(n.a<255?`rgba(${n.r}, ${n.g}, ${n.b}, ${ue(n.a)})`:`rgb(${n.r}, ${n.g}, ${n.b})`)}var fr=n=>n<=.0031308?n*12.92:Math.pow(n,1/2.4)*1.055-.055,dn=n=>n<=.04045?n/12.92:Math.pow((n+.055)/1.055,2.4);function zd(n,t,e){let i=dn(ue(n.r)),s=dn(ue(n.g)),r=dn(ue(n.b));return{r:Se(fr(i+e*(dn(ue(t.r))-i))),g:Se(fr(s+e*(dn(ue(t.g))-s))),b:Se(fr(r+e*(dn(ue(t.b))-r))),a:n.a+e*(t.a-n.a)}}function Vi(n,t,e){if(n){let i=mr(n);i[t]=Math.max(0,Math.min(i[t]+i[t]*e,t===0?360:1)),i=_r(i),n.r=i[0],n.g=i[1],n.b=i[2]}}function La(n,t){return n&&Object.assign(t||{},n)}function Ra(n){var t={r:0,g:0,b:0,a:255};return Array.isArray(n)?n.length>=3&&(t={r:n[0],g:n[1],b:n[2],a:255},n.length>3&&(t.a=Se(n[3]))):(t=La(n,{r:0,g:0,b:0,a:1}),t.a=Se(t.a)),t}function Hd(n){return n.charAt(0)==="r"?Bd(n):Od(n)}var jn=class n{constructor(t){if(t instanceof n)return t;let e=typeof t,i;e==="object"?i=Ra(t):e==="string"&&(i=Td(t)||Id(t)||Hd(t)),this._rgb=i,this._valid=!!i}get valid(){return this._valid}get rgb(){var t=La(this._rgb);return t&&(t.a=ue(t.a)),t}set rgb(t){this._rgb=Ra(t)}rgbString(){return this._valid?Vd(this._rgb):void 0}hexString(){return this._valid?wd(this._rgb):void 0}hslString(){return this._valid?Ld(this._rgb):void 0}mix(t,e){if(t){let i=this.rgb,s=t.rgb,r,o=e===r?.5:e,a=2*o-1,l=i.a-s.a,c=((a*l===-1?a:(a+l)/(1+a*l))+1)/2;r=1-c,i.r=255&c*i.r+r*s.r+.5,i.g=255&c*i.g+r*s.g+.5,i.b=255&c*i.b+r*s.b+.5,i.a=o*i.a+(1-o)*s.a,this.rgb=i}return this}interpolate(t,e){return t&&(this._rgb=zd(this._rgb,t._rgb,e)),this}clone(){return new n(this.rgb)}alpha(t){return this._rgb.a=Se(t),this}clearer(t){let e=this._rgb;return e.a*=1-t,this}greyscale(){let t=this._rgb,e=Gn(t.r*.3+t.g*.59+t.b*.11);return t.r=t.g=t.b=e,this}opaquer(t){let e=this._rgb;return e.a*=1+t,this}negate(){let t=this._rgb;return t.r=255-t.r,t.g=255-t.g,t.b=255-t.b,this}lighten(t){return Vi(this._rgb,2,t),this}darken(t){return Vi(this._rgb,2,-t),this}saturate(t){return Vi(this._rgb,1,t),this}desaturate(t){return Vi(this._rgb,1,-t),this}rotate(t){return Pd(this._rgb,t),this}};function oe(){}var $a=(()=>{let n=0;return()=>n++})();function Y(n){return n==null}function st(n){if(Array.isArray&&Array.isArray(n))return!0;let t=Object.prototype.toString.call(n);return t.slice(0,7)==="[object"&&t.slice(-6)==="Array]"}function j(n){return n!==null&&Object.prototype.toString.call(n)==="[object Object]"}function pt(n){return(typeof n=="number"||n instanceof Number)&&isFinite(+n)}function Lt(n,t){return pt(n)?n:t}function z(n,t){return typeof n>"u"?t:n}var ja=(n,t)=>typeof n=="string"&&n.endsWith("%")?parseFloat(n)/100:+n/t,xr=(n,t)=>typeof n=="string"&&n.endsWith("%")?parseFloat(n)/100*t:+n;function et(n,t,e){if(n&&typeof n.call=="function")return n.apply(e,t)}function Z(n,t,e,i){let s,r,o;if(st(n))if(r=n.length,i)for(s=r-1;s>=0;s--)t.call(e,n[s],s);else for(s=0;s<r;s++)t.call(e,n[s],s);else if(j(n))for(o=Object.keys(n),r=o.length,s=0;s<r;s++)t.call(e,n[o[s]],o[s])}function qn(n,t){let e,i,s,r;if(!n||!t||n.length!==t.length)return!1;for(e=0,i=n.length;e<i;++e)if(s=n[e],r=t[e],s.datasetIndex!==r.datasetIndex||s.index!==r.index)return!1;return!0}function Ui(n){if(st(n))return n.map(Ui);if(j(n)){let t=Object.create(null),e=Object.keys(n),i=e.length,s=0;for(;s<i;++s)t[e[s]]=Ui(n[e[s]]);return t}return n}function Ga(n){return["__proto__","prototype","constructor"].indexOf(n)===-1}function Wd(n,t,e,i){if(!Ga(n))return;let s=t[n],r=e[n];j(s)&&j(r)?un(s,r,i):t[n]=Ui(r)}function un(n,t,e){let i=st(t)?t:[t],s=i.length;if(!j(n))return n;e=e||{};let r=e.merger||Wd,o;for(let a=0;a<s;++a){if(o=i[a],!j(o))continue;let l=Object.keys(o);for(let c=0,d=l.length;c<d;++c)r(l[c],n,o,e)}return n}function pn(n,t){return un(n,t,{merger:Ud})}function Ud(n,t,e){if(!Ga(n))return;let i=t[n],s=e[n];j(i)&&j(s)?pn(i,s):Object.prototype.hasOwnProperty.call(t,n)||(t[n]=Ui(s))}var Fa={"":n=>n,x:n=>n.x,y:n=>n.y};function Yd(n){let t=n.split("."),e=[],i="";for(let s of t)i+=s,i.endsWith("\\")?i=i.slice(0,-1)+".":(e.push(i),i="");return e}function $d(n){let t=Yd(n);return e=>{for(let i of t){if(i==="")break;e=e&&e[i]}return e}}function me(n,t){return(Fa[t]||(Fa[t]=$d(t)))(n)}function Gi(n){return n.charAt(0).toUpperCase()+n.slice(1)}var mn=n=>typeof n<"u",fe=n=>typeof n=="function",kr=(n,t)=>{if(n.size!==t.size)return!1;for(let e of n)if(!t.has(e))return!1;return!0};function Xa(n){return n.type==="mouseup"||n.type==="click"||n.type==="contextmenu"}var q=Math.PI,rt=2*q,jd=rt+q,Yi=Number.POSITIVE_INFINITY,Gd=q/180,mt=q/2,Ve=q/4,Ia=q*2/3,pe=Math.log10,Qt=Math.sign;function gn(n,t,e){return Math.abs(n-t)<e}function Tr(n){let t=Math.round(n);n=gn(n,t,n/1e3)?t:n;let e=Math.pow(10,Math.floor(pe(n))),i=n/e;return(i<=1?1:i<=2?2:i<=5?5:10)*e}function Ka(n){let t=[],e=Math.sqrt(n),i;for(i=1;i<e;i++)n%i===0&&(t.push(i),t.push(n/i));return e===(e|0)&&t.push(e),t.sort((s,r)=>s-r).pop(),t}function Xd(n){return typeof n=="symbol"||typeof n=="object"&&n!==null&&!(Symbol.toPrimitive in n||"toString"in n||"valueOf"in n)}function We(n){return!Xd(n)&&!isNaN(parseFloat(n))&&isFinite(n)}function qa(n,t){let e=Math.round(n);return e-t<=n&&e+t>=n}function Sr(n,t,e){let i,s,r;for(i=0,s=n.length;i<s;i++)r=n[i][e],isNaN(r)||(t.min=Math.min(t.min,r),t.max=Math.max(t.max,r))}function Kt(n){return n*(q/180)}function Xi(n){return n*(180/q)}function wr(n){if(!pt(n))return;let t=1,e=0;for(;Math.round(n*t)/t!==n;)t*=10,e++;return e}function Er(n,t){let e=t.x-n.x,i=t.y-n.y,s=Math.sqrt(e*e+i*i),r=Math.atan2(i,e);return r<-.5*q&&(r+=rt),{angle:r,distance:s}}function $i(n,t){return Math.sqrt(Math.pow(t.x-n.x,2)+Math.pow(t.y-n.y,2))}function Kd(n,t){return(n-t+jd)%rt-q}function Et(n){return(n%rt+rt)%rt}function _n(n,t,e,i){let s=Et(n),r=Et(t),o=Et(e),a=Et(r-s),l=Et(o-s),c=Et(s-r),d=Et(s-o);return s===r||s===o||i&&r===o||a>l&&c<d}function Tt(n,t,e){return Math.max(t,Math.min(e,n))}function Ja(n){return Tt(n,-32768,32767)}function ae(n,t,e,i=1e-6){return n>=Math.min(t,e)-i&&n<=Math.max(t,e)+i}function Ki(n,t,e){e=e||(o=>n[o]<t);let i=n.length-1,s=0,r;for(;i-s>1;)r=s+i>>1,e(r)?s=r:i=r;return{lo:s,hi:i}}var se=(n,t,e,i)=>Ki(n,e,i?s=>{let r=n[s][t];return r<e||r===e&&n[s+1][t]===e}:s=>n[s][t]<e),Za=(n,t,e)=>Ki(n,e,i=>n[i][t]>=e);function Qa(n,t,e){let i=0,s=n.length;for(;i<s&&n[i]<t;)i++;for(;s>i&&n[s-1]>e;)s--;return i>0||s<n.length?n.slice(i,s):n}var tl=["push","pop","shift","splice","unshift"];function el(n,t){if(n._chartjs){n._chartjs.listeners.push(t);return}Object.defineProperty(n,"_chartjs",{configurable:!0,enumerable:!1,value:{listeners:[t]}}),tl.forEach(e=>{let i="_onData"+Gi(e),s=n[e];Object.defineProperty(n,e,{configurable:!0,enumerable:!1,value(...r){let o=s.apply(this,r);return n._chartjs.listeners.forEach(a=>{typeof a[i]=="function"&&a[i](...r)}),o}})})}function Mr(n,t){let e=n._chartjs;if(!e)return;let i=e.listeners,s=i.indexOf(t);s!==-1&&i.splice(s,1),!(i.length>0)&&(tl.forEach(r=>{delete n[r]}),delete n._chartjs)}function Dr(n){let t=new Set(n);return t.size===n.length?n:Array.from(t)}var Ar=function(){return typeof window>"u"?function(n){return n()}:window.requestAnimationFrame}();function Cr(n,t){let e=[],i=!1;return function(...s){e=s,i||(i=!0,Ar.call(window,()=>{i=!1,n.apply(t,e)}))}}function nl(n,t){let e;return function(...i){return t?(clearTimeout(e),e=setTimeout(n,t,i)):n.apply(this,i),t}}var qi=n=>n==="start"?"left":n==="end"?"right":"center",Mt=(n,t,e)=>n==="start"?t:n==="end"?e:(t+e)/2,il=(n,t,e,i)=>n===(i?"left":"right")?e:n==="center"?(t+e)/2:t;function Rr(n,t,e){let i=t.length,s=0,r=i;if(n._sorted){let{iScale:o,vScale:a,_parsed:l}=n,c=n.dataset&&n.dataset.options?n.dataset.options.spanGaps:null,d=o.axis,{min:h,max:u,minDefined:f,maxDefined:p}=o.getUserBounds();if(f){if(s=Math.min(se(l,d,h).lo,e?i:se(t,d,o.getPixelForValue(h)).lo),c){let m=l.slice(0,s+1).reverse().findIndex(g=>!Y(g[a.axis]));s-=Math.max(0,m)}s=Tt(s,0,i-1)}if(p){let m=Math.max(se(l,o.axis,u,!0).hi+1,e?0:se(t,d,o.getPixelForValue(u),!0).hi+1);if(c){let g=l.slice(m-1).findIndex(_=>!Y(_[a.axis]));m+=Math.max(0,g)}r=Tt(m,s,i)-s}else r=i-s}return{start:s,count:r}}function Or(n){let{xScale:t,yScale:e,_scaleRanges:i}=n,s={xmin:t.min,xmax:t.max,ymin:e.min,ymax:e.max};if(!i)return n._scaleRanges=s,!0;let r=i.xmin!==t.min||i.xmax!==t.max||i.ymin!==e.min||i.ymax!==e.max;return Object.assign(i,s),r}var zi=n=>n===0||n===1,Na=(n,t,e)=>-(Math.pow(2,10*(n-=1))*Math.sin((n-t)*rt/e)),Ba=(n,t,e)=>Math.pow(2,-10*n)*Math.sin((n-t)*rt/e)+1,hn={linear:n=>n,easeInQuad:n=>n*n,easeOutQuad:n=>-n*(n-2),easeInOutQuad:n=>(n/=.5)<1?.5*n*n:-.5*(--n*(n-2)-1),easeInCubic:n=>n*n*n,easeOutCubic:n=>(n-=1)*n*n+1,easeInOutCubic:n=>(n/=.5)<1?.5*n*n*n:.5*((n-=2)*n*n+2),easeInQuart:n=>n*n*n*n,easeOutQuart:n=>-((n-=1)*n*n*n-1),easeInOutQuart:n=>(n/=.5)<1?.5*n*n*n*n:-.5*((n-=2)*n*n*n-2),easeInQuint:n=>n*n*n*n*n,easeOutQuint:n=>(n-=1)*n*n*n*n+1,easeInOutQuint:n=>(n/=.5)<1?.5*n*n*n*n*n:.5*((n-=2)*n*n*n*n+2),easeInSine:n=>-Math.cos(n*mt)+1,easeOutSine:n=>Math.sin(n*mt),easeInOutSine:n=>-.5*(Math.cos(q*n)-1),easeInExpo:n=>n===0?0:Math.pow(2,10*(n-1)),easeOutExpo:n=>n===1?1:-Math.pow(2,-10*n)+1,easeInOutExpo:n=>zi(n)?n:n<.5?.5*Math.pow(2,10*(n*2-1)):.5*(-Math.pow(2,-10*(n*2-1))+2),easeInCirc:n=>n>=1?n:-(Math.sqrt(1-n*n)-1),easeOutCirc:n=>Math.sqrt(1-(n-=1)*n),easeInOutCirc:n=>(n/=.5)<1?-.5*(Math.sqrt(1-n*n)-1):.5*(Math.sqrt(1-(n-=2)*n)+1),easeInElastic:n=>zi(n)?n:Na(n,.075,.3),easeOutElastic:n=>zi(n)?n:Ba(n,.075,.3),easeInOutElastic(n){return zi(n)?n:n<.5?.5*Na(n*2,.1125,.45):.5+.5*Ba(n*2-1,.1125,.45)},easeInBack(n){return n*n*((1.70158+1)*n-1.70158)},easeOutBack(n){return(n-=1)*n*((1.70158+1)*n+1.70158)+1},easeInOutBack(n){let t=1.70158;return(n/=.5)<1?.5*(n*n*(((t*=1.525)+1)*n-t)):.5*((n-=2)*n*(((t*=1.525)+1)*n+t)+2)},easeInBounce:n=>1-hn.easeOutBounce(1-n),easeOutBounce(n){return n<1/2.75?7.5625*n*n:n<2/2.75?7.5625*(n-=1.5/2.75)*n+.75:n<2.5/2.75?7.5625*(n-=2.25/2.75)*n+.9375:7.5625*(n-=2.625/2.75)*n+.984375},easeInOutBounce:n=>n<.5?hn.easeInBounce(n*2)*.5:hn.easeOutBounce(n*2-1)*.5+.5};function Pr(n){if(n&&typeof n=="object"){let t=n.toString();return t==="[object CanvasPattern]"||t==="[object CanvasGradient]"}return!1}function Lr(n){return Pr(n)?n:new jn(n)}function br(n){return Pr(n)?n:new jn(n).saturate(.5).darken(.1).hexString()}var qd=["x","y","borderWidth","radius","tension"],Jd=["color","borderColor","backgroundColor"];function Zd(n){n.set("animation",{delay:void 0,duration:1e3,easing:"easeOutQuart",fn:void 0,from:void 0,loop:void 0,to:void 0,type:void 0}),n.describe("animation",{_fallback:!1,_indexable:!1,_scriptable:t=>t!=="onProgress"&&t!=="onComplete"&&t!=="fn"}),n.set("animations",{colors:{type:"color",properties:Jd},numbers:{type:"number",properties:qd}}),n.describe("animations",{_fallback:"animation"}),n.set("transitions",{active:{animation:{duration:400}},resize:{animation:{duration:0}},show:{animations:{colors:{from:"transparent"},visible:{type:"boolean",duration:0}}},hide:{animations:{colors:{to:"transparent"},visible:{type:"boolean",easing:"linear",fn:t=>t|0}}}})}function Qd(n){n.set("layout",{autoPadding:!0,padding:{top:0,right:0,bottom:0,left:0}})}var Va=new Map;function th(n,t){t=t||{};let e=n+JSON.stringify(t),i=Va.get(e);return i||(i=new Intl.NumberFormat(n,t),Va.set(e,i)),i}function bn(n,t,e){return th(t,e).format(n)}var sl={values(n){return st(n)?n:""+n},numeric(n,t,e){if(n===0)return"0";let i=this.chart.options.locale,s,r=n;if(e.length>1){let c=Math.max(Math.abs(e[0].value),Math.abs(e[e.length-1].value));(c<1e-4||c>1e15)&&(s="scientific"),r=eh(n,e)}let o=pe(Math.abs(r)),a=isNaN(o)?1:Math.max(Math.min(-1*Math.floor(o),20),0),l={notation:s,minimumFractionDigits:a,maximumFractionDigits:a};return Object.assign(l,this.options.ticks.format),bn(n,i,l)},logarithmic(n,t,e){if(n===0)return"0";let i=e[t].significand||n/Math.pow(10,Math.floor(pe(n)));return[1,2,3,5,10,15].includes(i)||t>.8*e.length?sl.numeric.call(this,n,t,e):""}};function eh(n,t){let e=t.length>3?t[2].value-t[1].value:t[1].value-t[0].value;return Math.abs(e)>=1&&n!==Math.floor(n)&&(e=n-Math.floor(n)),e}var Jn={formatters:sl};function nh(n){n.set("scale",{display:!0,offset:!1,reverse:!1,beginAtZero:!1,bounds:"ticks",clip:!0,grace:0,grid:{display:!0,lineWidth:1,drawOnChartArea:!0,drawTicks:!0,tickLength:8,tickWidth:(t,e)=>e.lineWidth,tickColor:(t,e)=>e.color,offset:!1},border:{display:!0,dash:[],dashOffset:0,width:1},title:{display:!1,text:"",padding:{top:4,bottom:4}},ticks:{minRotation:0,maxRotation:50,mirror:!1,textStrokeWidth:0,textStrokeColor:"",padding:3,display:!0,autoSkip:!0,autoSkipPadding:3,labelOffset:0,callback:Jn.formatters.values,minor:{},major:{},align:"center",crossAlign:"near",showLabelBackdrop:!1,backdropColor:"rgba(255, 255, 255, 0.75)",backdropPadding:2}}),n.route("scale.ticks","color","","color"),n.route("scale.grid","color","","borderColor"),n.route("scale.border","color","","borderColor"),n.route("scale.title","color","","color"),n.describe("scale",{_fallback:!1,_scriptable:t=>!t.startsWith("before")&&!t.startsWith("after")&&t!=="callback"&&t!=="parser",_indexable:t=>t!=="borderDash"&&t!=="tickBorderDash"&&t!=="dash"}),n.describe("scales",{_fallback:"scale"}),n.describe("scale.ticks",{_scriptable:t=>t!=="backdropPadding"&&t!=="callback",_indexable:t=>t!=="backdropPadding"})}var Me=Object.create(null),Ji=Object.create(null);function Xn(n,t){if(!t)return n;let e=t.split(".");for(let i=0,s=e.length;i<s;++i){let r=e[i];n=n[r]||(n[r]=Object.create(null))}return n}function yr(n,t,e){return typeof t=="string"?un(Xn(n,t),e):un(Xn(n,""),t)}var vr=class{constructor(t,e){this.animation=void 0,this.backgroundColor="rgba(0,0,0,0.1)",this.borderColor="rgba(0,0,0,0.1)",this.color="#666",this.datasets={},this.devicePixelRatio=i=>i.chart.platform.getDevicePixelRatio(),this.elements={},this.events=["mousemove","mouseout","click","touchstart","touchmove"],this.font={family:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",size:12,style:"normal",lineHeight:1.2,weight:null},this.hover={},this.hoverBackgroundColor=(i,s)=>br(s.backgroundColor),this.hoverBorderColor=(i,s)=>br(s.borderColor),this.hoverColor=(i,s)=>br(s.color),this.indexAxis="x",this.interaction={mode:"nearest",intersect:!0,includeInvisible:!1},this.maintainAspectRatio=!0,this.onHover=null,this.onClick=null,this.parsing=!0,this.plugins={},this.responsive=!0,this.scale=void 0,this.scales={},this.showLine=!0,this.drawActiveElementsOnTop=!0,this.describe(t),this.apply(e)}set(t,e){return yr(this,t,e)}get(t){return Xn(this,t)}describe(t,e){return yr(Ji,t,e)}override(t,e){return yr(Me,t,e)}route(t,e,i,s){let r=Xn(this,t),o=Xn(this,i),a="_"+e;Object.defineProperties(r,{[a]:{value:r[e],writable:!0},[e]:{enumerable:!0,get(){let l=this[a],c=o[s];return j(l)?Object.assign({},c,l):z(l,c)},set(l){this[a]=l}}})}apply(t){t.forEach(e=>e(this))}},dt=new vr({_scriptable:n=>!n.startsWith("on"),_indexable:n=>n!=="events",hover:{_fallback:"interaction"},interaction:{_scriptable:!1,_indexable:!1}},[Zd,Qd,nh]);function ih(n){return!n||Y(n.size)||Y(n.family)?null:(n.style?n.style+" ":"")+(n.weight?n.weight+" ":"")+n.size+"px "+n.family}function Kn(n,t,e,i,s){let r=t[s];return r||(r=t[s]=n.measureText(s).width,e.push(s)),r>i&&(i=r),i}function rl(n,t,e,i){i=i||{};let s=i.data=i.data||{},r=i.garbageCollect=i.garbageCollect||[];i.font!==t&&(s=i.data={},r=i.garbageCollect=[],i.font=t),n.save(),n.font=t;let o=0,a=e.length,l,c,d,h,u;for(l=0;l<a;l++)if(h=e[l],h!=null&&!st(h))o=Kn(n,s,r,o,h);else if(st(h))for(c=0,d=h.length;c<d;c++)u=h[c],u!=null&&!st(u)&&(o=Kn(n,s,r,o,u));n.restore();let f=r.length/2;if(f>e.length){for(l=0;l<f;l++)delete s[r[l]];r.splice(0,f)}return o}function De(n,t,e){let i=n.currentDevicePixelRatio,s=e!==0?Math.max(e/2,.5):0;return Math.round((t-s)*i)/i+s}function Fr(n,t){!t&&!n||(t=t||n.getContext("2d"),t.save(),t.resetTransform(),t.clearRect(0,0,n.width,n.height),t.restore())}function Zi(n,t,e,i){Ir(n,t,e,i,null)}function Ir(n,t,e,i,s){let r,o,a,l,c,d,h,u,f=t.pointStyle,p=t.rotation,m=t.radius,g=(p||0)*Gd;if(f&&typeof f=="object"&&(r=f.toString(),r==="[object HTMLImageElement]"||r==="[object HTMLCanvasElement]")){n.save(),n.translate(e,i),n.rotate(g),n.drawImage(f,-f.width/2,-f.height/2,f.width,f.height),n.restore();return}if(!(isNaN(m)||m<=0)){switch(n.beginPath(),f){default:s?n.ellipse(e,i,s/2,m,0,0,rt):n.arc(e,i,m,0,rt),n.closePath();break;case"triangle":d=s?s/2:m,n.moveTo(e+Math.sin(g)*d,i-Math.cos(g)*m),g+=Ia,n.lineTo(e+Math.sin(g)*d,i-Math.cos(g)*m),g+=Ia,n.lineTo(e+Math.sin(g)*d,i-Math.cos(g)*m),n.closePath();break;case"rectRounded":c=m*.516,l=m-c,o=Math.cos(g+Ve)*l,h=Math.cos(g+Ve)*(s?s/2-c:l),a=Math.sin(g+Ve)*l,u=Math.sin(g+Ve)*(s?s/2-c:l),n.arc(e-h,i-a,c,g-q,g-mt),n.arc(e+u,i-o,c,g-mt,g),n.arc(e+h,i+a,c,g,g+mt),n.arc(e-u,i+o,c,g+mt,g+q),n.closePath();break;case"rect":if(!p){l=Math.SQRT1_2*m,d=s?s/2:l,n.rect(e-d,i-l,2*d,2*l);break}g+=Ve;case"rectRot":h=Math.cos(g)*(s?s/2:m),o=Math.cos(g)*m,a=Math.sin(g)*m,u=Math.sin(g)*(s?s/2:m),n.moveTo(e-h,i-a),n.lineTo(e+u,i-o),n.lineTo(e+h,i+a),n.lineTo(e-u,i+o),n.closePath();break;case"crossRot":g+=Ve;case"cross":h=Math.cos(g)*(s?s/2:m),o=Math.cos(g)*m,a=Math.sin(g)*m,u=Math.sin(g)*(s?s/2:m),n.moveTo(e-h,i-a),n.lineTo(e+h,i+a),n.moveTo(e+u,i-o),n.lineTo(e-u,i+o);break;case"star":h=Math.cos(g)*(s?s/2:m),o=Math.cos(g)*m,a=Math.sin(g)*m,u=Math.sin(g)*(s?s/2:m),n.moveTo(e-h,i-a),n.lineTo(e+h,i+a),n.moveTo(e+u,i-o),n.lineTo(e-u,i+o),g+=Ve,h=Math.cos(g)*(s?s/2:m),o=Math.cos(g)*m,a=Math.sin(g)*m,u=Math.sin(g)*(s?s/2:m),n.moveTo(e-h,i-a),n.lineTo(e+h,i+a),n.moveTo(e+u,i-o),n.lineTo(e-u,i+o);break;case"line":o=s?s/2:Math.cos(g)*m,a=Math.sin(g)*m,n.moveTo(e-o,i-a),n.lineTo(e+o,i+a);break;case"dash":n.moveTo(e,i),n.lineTo(e+Math.cos(g)*(s?s/2:m),i+Math.sin(g)*m);break;case!1:n.closePath();break}n.fill(),t.borderWidth>0&&n.stroke()}}function re(n,t,e){return e=e||.5,!t||n&&n.x>t.left-e&&n.x<t.right+e&&n.y>t.top-e&&n.y<t.bottom+e}function Zn(n,t){n.save(),n.beginPath(),n.rect(t.left,t.top,t.right-t.left,t.bottom-t.top),n.clip()}function Qn(n){n.restore()}function ol(n,t,e,i,s){if(!t)return n.lineTo(e.x,e.y);if(s==="middle"){let r=(t.x+e.x)/2;n.lineTo(r,t.y),n.lineTo(r,e.y)}else s==="after"!=!!i?n.lineTo(t.x,e.y):n.lineTo(e.x,t.y);n.lineTo(e.x,e.y)}function al(n,t,e,i){if(!t)return n.lineTo(e.x,e.y);n.bezierCurveTo(i?t.cp1x:t.cp2x,i?t.cp1y:t.cp2y,i?e.cp2x:e.cp1x,i?e.cp2y:e.cp1y,e.x,e.y)}function sh(n,t){t.translation&&n.translate(t.translation[0],t.translation[1]),Y(t.rotation)||n.rotate(t.rotation),t.color&&(n.fillStyle=t.color),t.textAlign&&(n.textAlign=t.textAlign),t.textBaseline&&(n.textBaseline=t.textBaseline)}function rh(n,t,e,i,s){if(s.strikethrough||s.underline){let r=n.measureText(i),o=t-r.actualBoundingBoxLeft,a=t+r.actualBoundingBoxRight,l=e-r.actualBoundingBoxAscent,c=e+r.actualBoundingBoxDescent,d=s.strikethrough?(l+c)/2:c;n.strokeStyle=n.fillStyle,n.beginPath(),n.lineWidth=s.decorationWidth||2,n.moveTo(o,d),n.lineTo(a,d),n.stroke()}}function oh(n,t){let e=n.fillStyle;n.fillStyle=t.color,n.fillRect(t.left,t.top,t.width,t.height),n.fillStyle=e}function Ae(n,t,e,i,s,r={}){let o=st(t)?t:[t],a=r.strokeWidth>0&&r.strokeColor!=="",l,c;for(n.save(),n.font=s.string,sh(n,r),l=0;l<o.length;++l)c=o[l],r.backdrop&&oh(n,r.backdrop),a&&(r.strokeColor&&(n.strokeStyle=r.strokeColor),Y(r.strokeWidth)||(n.lineWidth=r.strokeWidth),n.strokeText(c,e,i,r.maxWidth)),n.fillText(c,e,i,r.maxWidth),rh(n,e,i,c,r),i+=Number(s.lineHeight);n.restore()}function yn(n,t){let{x:e,y:i,w:s,h:r,radius:o}=t;n.arc(e+o.topLeft,i+o.topLeft,o.topLeft,1.5*q,q,!0),n.lineTo(e,i+r-o.bottomLeft),n.arc(e+o.bottomLeft,i+r-o.bottomLeft,o.bottomLeft,q,mt,!0),n.lineTo(e+s-o.bottomRight,i+r),n.arc(e+s-o.bottomRight,i+r-o.bottomRight,o.bottomRight,mt,0,!0),n.lineTo(e+s,i+o.topRight),n.arc(e+s-o.topRight,i+o.topRight,o.topRight,0,-mt,!0),n.lineTo(e+o.topLeft,i)}var ah=/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,lh=/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;function ch(n,t){let e=(""+n).match(ah);if(!e||e[1]==="normal")return t*1.2;switch(n=+e[2],e[3]){case"px":return n;case"%":n/=100;break}return t*n}var dh=n=>+n||0;function Qi(n,t){let e={},i=j(t),s=i?Object.keys(t):t,r=j(n)?i?o=>z(n[o],n[t[o]]):o=>n[o]:()=>n;for(let o of s)e[o]=dh(r(o));return e}function Nr(n){return Qi(n,{top:"y",right:"x",bottom:"y",left:"x"})}function Ce(n){return Qi(n,["topLeft","topRight","bottomLeft","bottomRight"])}function Dt(n){let t=Nr(n);return t.width=t.left+t.right,t.height=t.top+t.bottom,t}function yt(n,t){n=n||{},t=t||dt.font;let e=z(n.size,t.size);typeof e=="string"&&(e=parseInt(e,10));let i=z(n.style,t.style);i&&!(""+i).match(lh)&&(console.warn('Invalid font style specified: "'+i+'"'),i=void 0);let s={family:z(n.family,t.family),lineHeight:ch(z(n.lineHeight,t.lineHeight),e),size:e,style:i,weight:z(n.weight,t.weight),string:""};return s.string=ih(s),s}function vn(n,t,e,i){let s=!0,r,o,a;for(r=0,o=n.length;r<o;++r)if(a=n[r],a!==void 0&&(t!==void 0&&typeof a=="function"&&(a=a(t),s=!1),e!==void 0&&st(a)&&(a=a[e%a.length],s=!1),a!==void 0))return i&&!s&&(i.cacheable=!1),a}function ll(n,t,e){let{min:i,max:s}=n,r=xr(t,(s-i)/2),o=(a,l)=>e&&a===0?0:a+l;return{min:o(i,-Math.abs(r)),max:o(s,r)}}function ge(n,t){return Object.assign(Object.create(n),t)}function ts(n,t=[""],e,i,s=()=>n[0]){let r=e||n;typeof i>"u"&&(i=hl("_fallback",n));let o={[Symbol.toStringTag]:"Object",_cacheable:!0,_scopes:n,_rootScopes:r,_fallback:i,_getTarget:s,override:a=>ts([a,...n],t,r,i)};return new Proxy(o,{deleteProperty(a,l){return delete a[l],delete a._keys,delete n[0][l],!0},get(a,l){return cl(a,l,()=>bh(l,t,n,a))},getOwnPropertyDescriptor(a,l){return Reflect.getOwnPropertyDescriptor(a._scopes[0],l)},getPrototypeOf(){return Reflect.getPrototypeOf(n[0])},has(a,l){return Ha(a).includes(l)},ownKeys(a){return Ha(a)},set(a,l,c){let d=a._storage||(a._storage=s());return a[l]=d[l]=c,delete a._keys,!0}})}function He(n,t,e,i){let s={_cacheable:!1,_proxy:n,_context:t,_subProxy:e,_stack:new Set,_descriptors:Br(n,i),setContext:r=>He(n,r,e,i),override:r=>He(n.override(r),t,e,i)};return new Proxy(s,{deleteProperty(r,o){return delete r[o],delete n[o],!0},get(r,o,a){return cl(r,o,()=>uh(r,o,a))},getOwnPropertyDescriptor(r,o){return r._descriptors.allKeys?Reflect.has(n,o)?{enumerable:!0,configurable:!0}:void 0:Reflect.getOwnPropertyDescriptor(n,o)},getPrototypeOf(){return Reflect.getPrototypeOf(n)},has(r,o){return Reflect.has(n,o)},ownKeys(){return Reflect.ownKeys(n)},set(r,o,a){return n[o]=a,delete r[o],!0}})}function Br(n,t={scriptable:!0,indexable:!0}){let{_scriptable:e=t.scriptable,_indexable:i=t.indexable,_allKeys:s=t.allKeys}=n;return{allKeys:s,scriptable:e,indexable:i,isScriptable:fe(e)?e:()=>e,isIndexable:fe(i)?i:()=>i}}var hh=(n,t)=>n?n+Gi(t):t,Vr=(n,t)=>j(t)&&n!=="adapters"&&(Object.getPrototypeOf(t)===null||t.constructor===Object);function cl(n,t,e){if(Object.prototype.hasOwnProperty.call(n,t)||t==="constructor")return n[t];let i=e();return n[t]=i,i}function uh(n,t,e){let{_proxy:i,_context:s,_subProxy:r,_descriptors:o}=n,a=i[t];return fe(a)&&o.isScriptable(t)&&(a=fh(t,a,n,e)),st(a)&&a.length&&(a=ph(t,a,n,o.isIndexable)),Vr(t,a)&&(a=He(a,s,r&&r[t],o)),a}function fh(n,t,e,i){let{_proxy:s,_context:r,_subProxy:o,_stack:a}=e;if(a.has(n))throw new Error("Recursion detected: "+Array.from(a).join("->")+"->"+n);a.add(n);let l=t(r,o||i);return a.delete(n),Vr(n,l)&&(l=zr(s._scopes,s,n,l)),l}function ph(n,t,e,i){let{_proxy:s,_context:r,_subProxy:o,_descriptors:a}=e;if(typeof r.index<"u"&&i(n))return t[r.index%t.length];if(j(t[0])){let l=t,c=s._scopes.filter(d=>d!==l);t=[];for(let d of l){let h=zr(c,s,n,d);t.push(He(h,r,o&&o[n],a))}}return t}function dl(n,t,e){return fe(n)?n(t,e):n}var mh=(n,t)=>n===!0?t:typeof n=="string"?me(t,n):void 0;function gh(n,t,e,i,s){for(let r of t){let o=mh(e,r);if(o){n.add(o);let a=dl(o._fallback,e,s);if(typeof a<"u"&&a!==e&&a!==i)return a}else if(o===!1&&typeof i<"u"&&e!==i)return null}return!1}function zr(n,t,e,i){let s=t._rootScopes,r=dl(t._fallback,e,i),o=[...n,...s],a=new Set;a.add(i);let l=za(a,o,e,r||e,i);return l===null||typeof r<"u"&&r!==e&&(l=za(a,o,r,l,i),l===null)?!1:ts(Array.from(a),[""],s,r,()=>_h(t,e,i))}function za(n,t,e,i,s){for(;e;)e=gh(n,t,e,i,s);return e}function _h(n,t,e){let i=n._getTarget();t in i||(i[t]={});let s=i[t];return st(s)&&j(e)?e:s||{}}function bh(n,t,e,i){let s;for(let r of t)if(s=hl(hh(r,n),e),typeof s<"u")return Vr(n,s)?zr(e,i,n,s):s}function hl(n,t){for(let e of t){if(!e)continue;let i=e[n];if(typeof i<"u")return i}}function Ha(n){let t=n._keys;return t||(t=n._keys=yh(n._scopes)),t}function yh(n){let t=new Set;for(let e of n)for(let i of Object.keys(e).filter(s=>!s.startsWith("_")))t.add(i);return Array.from(t)}function Hr(n,t,e,i){let{iScale:s}=n,{key:r="r"}=this._parsing,o=new Array(i),a,l,c,d;for(a=0,l=i;a<l;++a)c=a+e,d=t[c],o[a]={r:s.parse(me(d,r),c)};return o}var vh=Number.EPSILON||1e-14,fn=(n,t)=>t<n.length&&!n[t].skip&&n[t],ul=n=>n==="x"?"y":"x";function xh(n,t,e,i){let s=n.skip?t:n,r=t,o=e.skip?t:e,a=$i(r,s),l=$i(o,r),c=a/(a+l),d=l/(a+l);c=isNaN(c)?0:c,d=isNaN(d)?0:d;let h=i*c,u=i*d;return{previous:{x:r.x-h*(o.x-s.x),y:r.y-h*(o.y-s.y)},next:{x:r.x+u*(o.x-s.x),y:r.y+u*(o.y-s.y)}}}function kh(n,t,e){let i=n.length,s,r,o,a,l,c=fn(n,0);for(let d=0;d<i-1;++d)if(l=c,c=fn(n,d+1),!(!l||!c)){if(gn(t[d],0,vh)){e[d]=e[d+1]=0;continue}s=e[d]/t[d],r=e[d+1]/t[d],a=Math.pow(s,2)+Math.pow(r,2),!(a<=9)&&(o=3/Math.sqrt(a),e[d]=s*o*t[d],e[d+1]=r*o*t[d])}}function Th(n,t,e="x"){let i=ul(e),s=n.length,r,o,a,l=fn(n,0);for(let c=0;c<s;++c){if(o=a,a=l,l=fn(n,c+1),!a)continue;let d=a[e],h=a[i];o&&(r=(d-o[e])/3,a[`cp1${e}`]=d-r,a[`cp1${i}`]=h-r*t[c]),l&&(r=(l[e]-d)/3,a[`cp2${e}`]=d+r,a[`cp2${i}`]=h+r*t[c])}}function Sh(n,t="x"){let e=ul(t),i=n.length,s=Array(i).fill(0),r=Array(i),o,a,l,c=fn(n,0);for(o=0;o<i;++o)if(a=l,l=c,c=fn(n,o+1),!!l){if(c){let d=c[t]-l[t];s[o]=d!==0?(c[e]-l[e])/d:0}r[o]=a?c?Qt(s[o-1])!==Qt(s[o])?0:(s[o-1]+s[o])/2:s[o-1]:s[o]}kh(n,s,r),Th(n,r,t)}function Hi(n,t,e){return Math.max(Math.min(n,e),t)}function wh(n,t){let e,i,s,r,o,a=re(n[0],t);for(e=0,i=n.length;e<i;++e)o=r,r=a,a=e<i-1&&re(n[e+1],t),r&&(s=n[e],o&&(s.cp1x=Hi(s.cp1x,t.left,t.right),s.cp1y=Hi(s.cp1y,t.top,t.bottom)),a&&(s.cp2x=Hi(s.cp2x,t.left,t.right),s.cp2y=Hi(s.cp2y,t.top,t.bottom)))}function fl(n,t,e,i,s){let r,o,a,l;if(t.spanGaps&&(n=n.filter(c=>!c.skip)),t.cubicInterpolationMode==="monotone")Sh(n,s);else{let c=i?n[n.length-1]:n[0];for(r=0,o=n.length;r<o;++r)a=n[r],l=xh(c,a,n[Math.min(r+1,o-(i?0:1))%o],t.tension),a.cp1x=l.previous.x,a.cp1y=l.previous.y,a.cp2x=l.next.x,a.cp2y=l.next.y,c=a}t.capBezierPoints&&wh(n,e)}function es(){return typeof window<"u"&&typeof document<"u"}function ns(n){let t=n.parentNode;return t&&t.toString()==="[object ShadowRoot]"&&(t=t.host),t}function ji(n,t,e){let i;return typeof n=="string"?(i=parseInt(n,10),n.indexOf("%")!==-1&&(i=i/100*t.parentNode[e])):i=n,i}var is=n=>n.ownerDocument.defaultView.getComputedStyle(n,null);function Eh(n,t){return is(n).getPropertyValue(t)}var Mh=["top","right","bottom","left"];function ze(n,t,e){let i={};e=e?"-"+e:"";for(let s=0;s<4;s++){let r=Mh[s];i[r]=parseFloat(n[t+"-"+r+e])||0}return i.width=i.left+i.right,i.height=i.top+i.bottom,i}var Dh=(n,t,e)=>(n>0||t>0)&&(!e||!e.shadowRoot);function Ah(n,t){let e=n.touches,i=e&&e.length?e[0]:n,{offsetX:s,offsetY:r}=i,o=!1,a,l;if(Dh(s,r,n.target))a=s,l=r;else{let c=t.getBoundingClientRect();a=i.clientX-c.left,l=i.clientY-c.top,o=!0}return{x:a,y:l,box:o}}function Re(n,t){if("native"in n)return n;let{canvas:e,currentDevicePixelRatio:i}=t,s=is(e),r=s.boxSizing==="border-box",o=ze(s,"padding"),a=ze(s,"border","width"),{x:l,y:c,box:d}=Ah(n,e),h=o.left+(d&&a.left),u=o.top+(d&&a.top),{width:f,height:p}=t;return r&&(f-=o.width+a.width,p-=o.height+a.height),{x:Math.round((l-h)/f*e.width/i),y:Math.round((c-u)/p*e.height/i)}}function Ch(n,t,e){let i,s;if(t===void 0||e===void 0){let r=n&&ns(n);if(!r)t=n.clientWidth,e=n.clientHeight;else{let o=r.getBoundingClientRect(),a=is(r),l=ze(a,"border","width"),c=ze(a,"padding");t=o.width-c.width-l.width,e=o.height-c.height-l.height,i=ji(a.maxWidth,r,"clientWidth"),s=ji(a.maxHeight,r,"clientHeight")}}return{width:t,height:e,maxWidth:i||Yi,maxHeight:s||Yi}}var Ee=n=>Math.round(n*10)/10;function pl(n,t,e,i){let s=is(n),r=ze(s,"margin"),o=ji(s.maxWidth,n,"clientWidth")||Yi,a=ji(s.maxHeight,n,"clientHeight")||Yi,l=Ch(n,t,e),{width:c,height:d}=l;if(s.boxSizing==="content-box"){let u=ze(s,"border","width"),f=ze(s,"padding");c-=f.width+u.width,d-=f.height+u.height}return c=Math.max(0,c-r.width),d=Math.max(0,i?c/i:d-r.height),c=Ee(Math.min(c,o,l.maxWidth)),d=Ee(Math.min(d,a,l.maxHeight)),c&&!d&&(d=Ee(c/2)),(t!==void 0||e!==void 0)&&i&&l.height&&d>l.height&&(d=l.height,c=Ee(Math.floor(d*i))),{width:c,height:d}}function Wr(n,t,e){let i=t||1,s=Ee(n.height*i),r=Ee(n.width*i);n.height=Ee(n.height),n.width=Ee(n.width);let o=n.canvas;return o.style&&(e||!o.style.height&&!o.style.width)&&(o.style.height=`${n.height}px`,o.style.width=`${n.width}px`),n.currentDevicePixelRatio!==i||o.height!==s||o.width!==r?(n.currentDevicePixelRatio=i,o.height=s,o.width=r,n.ctx.setTransform(i,0,0,i,0,0),!0):!1}var ml=function(){let n=!1;try{let t={get passive(){return n=!0,!1}};es()&&(window.addEventListener("test",null,t),window.removeEventListener("test",null,t))}catch{}return n}();function Ur(n,t){let e=Eh(n,t),i=e&&e.match(/^(\d+)(\.\d+)?px$/);return i?+i[1]:void 0}function we(n,t,e,i){return{x:n.x+e*(t.x-n.x),y:n.y+e*(t.y-n.y)}}function gl(n,t,e,i){return{x:n.x+e*(t.x-n.x),y:i==="middle"?e<.5?n.y:t.y:i==="after"?e<1?n.y:t.y:e>0?t.y:n.y}}function _l(n,t,e,i){let s={x:n.cp2x,y:n.cp2y},r={x:t.cp1x,y:t.cp1y},o=we(n,s,e),a=we(s,r,e),l=we(r,t,e),c=we(o,a,e),d=we(a,l,e);return we(c,d,e)}var Rh=function(n,t){return{x(e){return n+n+t-e},setWidth(e){t=e},textAlign(e){return e==="center"?e:e==="right"?"left":"right"},xPlus(e,i){return e-i},leftForLtr(e,i){return e-i}}},Oh=function(){return{x(n){return n},setWidth(n){},textAlign(n){return n},xPlus(n,t){return n+t},leftForLtr(n,t){return n}}};function Ue(n,t,e){return n?Rh(t,e):Oh()}function Yr(n,t){let e,i;(t==="ltr"||t==="rtl")&&(e=n.canvas.style,i=[e.getPropertyValue("direction"),e.getPropertyPriority("direction")],e.setProperty("direction",t,"important"),n.prevTextDirection=i)}function $r(n,t){t!==void 0&&(delete n.prevTextDirection,n.canvas.style.setProperty("direction",t[0],t[1]))}function bl(n){return n==="angle"?{between:_n,compare:Kd,normalize:Et}:{between:ae,compare:(t,e)=>t-e,normalize:t=>t}}function Wa({start:n,end:t,count:e,loop:i,style:s}){return{start:n%e,end:t%e,loop:i&&(t-n+1)%e===0,style:s}}function Ph(n,t,e){let{property:i,start:s,end:r}=e,{between:o,normalize:a}=bl(i),l=t.length,{start:c,end:d,loop:h}=n,u,f;if(h){for(c+=l,d+=l,u=0,f=l;u<f&&o(a(t[c%l][i]),s,r);++u)c--,d--;c%=l,d%=l}return d<c&&(d+=l),{start:c,end:d,loop:h,style:n.style}}function jr(n,t,e){if(!e)return[n];let{property:i,start:s,end:r}=e,o=t.length,{compare:a,between:l,normalize:c}=bl(i),{start:d,end:h,loop:u,style:f}=Ph(n,t,e),p=[],m=!1,g=null,_,b,k,y=()=>l(s,k,_)&&a(s,k)!==0,x=()=>a(r,_)===0||l(r,k,_),T=()=>m||y(),w=()=>!m||x();for(let v=d,E=d;v<=h;++v)b=t[v%o],!b.skip&&(_=c(b[i]),_!==k&&(m=l(_,s,r),g===null&&T()&&(g=a(_,s)===0?v:E),g!==null&&w()&&(p.push(Wa({start:g,end:v,loop:u,count:o,style:f})),g=null),E=v,k=_));return g!==null&&p.push(Wa({start:g,end:h,loop:u,count:o,style:f})),p}function Gr(n,t){let e=[],i=n.segments;for(let s=0;s<i.length;s++){let r=jr(i[s],n.points,t);r.length&&e.push(...r)}return e}function Lh(n,t,e,i){let s=0,r=t-1;if(e&&!i)for(;s<t&&!n[s].skip;)s++;for(;s<t&&n[s].skip;)s++;for(s%=t,e&&(r+=s);r>s&&n[r%t].skip;)r--;return r%=t,{start:s,end:r}}function Fh(n,t,e,i){let s=n.length,r=[],o=t,a=n[t],l;for(l=t+1;l<=e;++l){let c=n[l%s];c.skip||c.stop?a.skip||(i=!1,r.push({start:t%s,end:(l-1)%s,loop:i}),t=o=c.stop?l:null):(o=l,a.skip&&(t=l)),a=c}return o!==null&&r.push({start:t%s,end:o%s,loop:i}),r}function yl(n,t){let e=n.points,i=n.options.spanGaps,s=e.length;if(!s)return[];let r=!!n._loop,{start:o,end:a}=Lh(e,s,r,i);if(i===!0)return Ua(n,[{start:o,end:a,loop:r}],e,t);let l=a<o?a+s:a,c=!!n._fullLoop&&o===0&&a===s-1;return Ua(n,Fh(e,o,l,c),e,t)}function Ua(n,t,e,i){return!i||!i.setContext||!e?t:Ih(n,t,e,i)}function Ih(n,t,e,i){let s=n._chart.getContext(),r=Ya(n.options),{_datasetIndex:o,options:{spanGaps:a}}=n,l=e.length,c=[],d=r,h=t[0].start,u=h;function f(p,m,g,_){let b=a?-1:1;if(p!==m){for(p+=l;e[p%l].skip;)p-=b;for(;e[m%l].skip;)m+=b;p%l!==m%l&&(c.push({start:p%l,end:m%l,loop:g,style:_}),d=_,h=m%l)}}for(let p of t){h=a?h:p.start;let m=e[h%l],g;for(u=h+1;u<=p.end;u++){let _=e[u%l];g=Ya(i.setContext(ge(s,{type:"segment",p0:m,p1:_,p0DataIndex:(u-1)%l,p1DataIndex:u%l,datasetIndex:o}))),Nh(g,d)&&f(h,u-1,p.loop,d),m=_,d=g}h<u-1&&f(h,u-1,p.loop,d)}return c}function Ya(n){return{backgroundColor:n.backgroundColor,borderCapStyle:n.borderCapStyle,borderDash:n.borderDash,borderDashOffset:n.borderDashOffset,borderJoinStyle:n.borderJoinStyle,borderWidth:n.borderWidth,borderColor:n.borderColor}}function Nh(n,t){if(!t)return!1;let e=[],i=function(s,r){return Pr(r)?(e.includes(r)||e.push(r),e.indexOf(r)):r};return JSON.stringify(n,i)!==JSON.stringify(t,i)}function Wi(n,t,e){return n.options.clip?n[e]:t[e]}function Bh(n,t){let{xScale:e,yScale:i}=n;return e&&i?{left:Wi(e,t,"left"),right:Wi(e,t,"right"),top:Wi(i,t,"top"),bottom:Wi(i,t,"bottom")}:t}function Xr(n,t){let e=t._clip;if(e.disabled)return!1;let i=Bh(t,n.chartArea);return{left:e.left===!1?0:i.left-(e.left===!0?0:e.left),right:e.right===!1?n.width:i.right+(e.right===!0?0:e.right),top:e.top===!1?0:i.top-(e.top===!0?0:e.top),bottom:e.bottom===!1?n.height:i.bottom+(e.bottom===!0?0:e.bottom)}}var oo=class{constructor(){this._request=null,this._charts=new Map,this._running=!1,this._lastDate=void 0}_notify(t,e,i,s){let r=e.listeners[s],o=e.duration;r.forEach(a=>a({chart:t,initial:e.initial,numSteps:o,currentStep:Math.min(i-e.start,o)}))}_refresh(){this._request||(this._running=!0,this._request=Ar.call(window,()=>{this._update(),this._request=null,this._running&&this._refresh()}))}_update(t=Date.now()){let e=0;this._charts.forEach((i,s)=>{if(!i.running||!i.items.length)return;let r=i.items,o=r.length-1,a=!1,l;for(;o>=0;--o)l=r[o],l._active?(l._total>i.duration&&(i.duration=l._total),l.tick(t),a=!0):(r[o]=r[r.length-1],r.pop());a&&(s.draw(),this._notify(s,i,t,"progress")),r.length||(i.running=!1,this._notify(s,i,t,"complete"),i.initial=!1),e+=r.length}),this._lastDate=t,e===0&&(this._running=!1)}_getAnims(t){let e=this._charts,i=e.get(t);return i||(i={running:!1,initial:!0,items:[],listeners:{complete:[],progress:[]}},e.set(t,i)),i}listen(t,e,i){this._getAnims(t).listeners[e].push(i)}add(t,e){!e||!e.length||this._getAnims(t).items.push(...e)}has(t){return this._getAnims(t).items.length>0}start(t){let e=this._charts.get(t);e&&(e.running=!0,e.start=Date.now(),e.duration=e.items.reduce((i,s)=>Math.max(i,s._duration),0),this._refresh())}running(t){if(!this._running)return!1;let e=this._charts.get(t);return!(!e||!e.running||!e.items.length)}stop(t){let e=this._charts.get(t);if(!e||!e.items.length)return;let i=e.items,s=i.length-1;for(;s>=0;--s)i[s].cancel();e.items=[],this._notify(t,e,Date.now(),"complete")}remove(t){return this._charts.delete(t)}},_e=new oo,vl="transparent",Vh={boolean(n,t,e){return e>.5?t:n},color(n,t,e){let i=Lr(n||vl),s=i.valid&&Lr(t||vl);return s&&s.valid?s.mix(i,e).hexString():t},number(n,t,e){return n+(t-n)*e}},ao=class{constructor(t,e,i,s){let r=e[i];s=vn([t.to,s,r,t.from]);let o=vn([t.from,r,s]);this._active=!0,this._fn=t.fn||Vh[t.type||typeof o],this._easing=hn[t.easing]||hn.linear,this._start=Math.floor(Date.now()+(t.delay||0)),this._duration=this._total=Math.floor(t.duration),this._loop=!!t.loop,this._target=e,this._prop=i,this._from=o,this._to=s,this._promises=void 0}active(){return this._active}update(t,e,i){if(this._active){this._notify(!1);let s=this._target[this._prop],r=i-this._start,o=this._duration-r;this._start=i,this._duration=Math.floor(Math.max(o,t.duration)),this._total+=r,this._loop=!!t.loop,this._to=vn([t.to,e,s,t.from]),this._from=vn([t.from,s,e])}}cancel(){this._active&&(this.tick(Date.now()),this._active=!1,this._notify(!1))}tick(t){let e=t-this._start,i=this._duration,s=this._prop,r=this._from,o=this._loop,a=this._to,l;if(this._active=r!==a&&(o||e<i),!this._active){this._target[s]=a,this._notify(!0);return}if(e<0){this._target[s]=r;return}l=e/i%2,l=o&&l>1?2-l:l,l=this._easing(Math.min(1,Math.max(0,l))),this._target[s]=this._fn(r,a,l)}wait(){let t=this._promises||(this._promises=[]);return new Promise((e,i)=>{t.push({res:e,rej:i})})}_notify(t){let e=t?"res":"rej",i=this._promises||[];for(let s=0;s<i.length;s++)i[s][e]()}},us=class{constructor(t,e){this._chart=t,this._properties=new Map,this.configure(e)}configure(t){if(!j(t))return;let e=Object.keys(dt.animation),i=this._properties;Object.getOwnPropertyNames(t).forEach(s=>{let r=t[s];if(!j(r))return;let o={};for(let a of e)o[a]=r[a];(st(r.properties)&&r.properties||[s]).forEach(a=>{(a===s||!i.has(a))&&i.set(a,o)})})}_animateOptions(t,e){let i=e.options,s=Hh(t,i);if(!s)return[];let r=this._createAnimations(s,i);return i.$shared&&zh(t.options.$animations,i).then(()=>{t.options=i},()=>{}),r}_createAnimations(t,e){let i=this._properties,s=[],r=t.$animations||(t.$animations={}),o=Object.keys(e),a=Date.now(),l;for(l=o.length-1;l>=0;--l){let c=o[l];if(c.charAt(0)==="$")continue;if(c==="options"){s.push(...this._animateOptions(t,e));continue}let d=e[c],h=r[c],u=i.get(c);if(h)if(u&&h.active()){h.update(u,d,a);continue}else h.cancel();if(!u||!u.duration){t[c]=d;continue}r[c]=h=new ao(u,t,c,d),s.push(h)}return s}update(t,e){if(this._properties.size===0){Object.assign(t,e);return}let i=this._createAnimations(t,e);if(i.length)return _e.add(this._chart,i),!0}};function zh(n,t){let e=[],i=Object.keys(t);for(let s=0;s<i.length;s++){let r=n[i[s]];r&&r.active()&&e.push(r.wait())}return Promise.all(e)}function Hh(n,t){if(!t)return;let e=n.options;if(!e){n.options=t;return}return e.$shared&&(n.options=e=Object.assign({},e,{$shared:!1,$animations:{}})),e}function xl(n,t){let e=n&&n.options||{},i=e.reverse,s=e.min===void 0?t:0,r=e.max===void 0?t:0;return{start:i?r:s,end:i?s:r}}function Wh(n,t,e){if(e===!1)return!1;let i=xl(n,e),s=xl(t,e);return{top:s.end,right:i.end,bottom:s.start,left:i.start}}function Uh(n){let t,e,i,s;return j(n)?(t=n.top,e=n.right,i=n.bottom,s=n.left):t=e=i=s=n,{top:t,right:e,bottom:i,left:s,disabled:n===!1}}function yc(n,t){let e=[],i=n._getSortedDatasetMetas(t),s,r;for(s=0,r=i.length;s<r;++s)e.push(i[s].index);return e}function kl(n,t,e,i={}){let s=n.keys,r=i.mode==="single",o,a,l,c;if(t===null)return;let d=!1;for(o=0,a=s.length;o<a;++o){if(l=+s[o],l===e){if(d=!0,i.all)continue;break}c=n.values[l],pt(c)&&(r||t===0||Qt(t)===Qt(c))&&(t+=c)}return!d&&!i.all?0:t}function Yh(n,t){let{iScale:e,vScale:i}=t,s=e.axis==="x"?"x":"y",r=i.axis==="x"?"x":"y",o=Object.keys(n),a=new Array(o.length),l,c,d;for(l=0,c=o.length;l<c;++l)d=o[l],a[l]={[s]:d,[r]:n[d]};return a}function Kr(n,t){let e=n&&n.options.stacked;return e||e===void 0&&t.stack!==void 0}function $h(n,t,e){return`${n.id}.${t.id}.${e.stack||e.type}`}function jh(n){let{min:t,max:e,minDefined:i,maxDefined:s}=n.getUserBounds();return{min:i?t:Number.NEGATIVE_INFINITY,max:s?e:Number.POSITIVE_INFINITY}}function Gh(n,t,e){let i=n[t]||(n[t]={});return i[e]||(i[e]={})}function Tl(n,t,e,i){for(let s of t.getMatchingVisibleMetas(i).reverse()){let r=n[s.index];if(e&&r>0||!e&&r<0)return s.index}return null}function Sl(n,t){let{chart:e,_cachedMeta:i}=n,s=e._stacks||(e._stacks={}),{iScale:r,vScale:o,index:a}=i,l=r.axis,c=o.axis,d=$h(r,o,i),h=t.length,u;for(let f=0;f<h;++f){let p=t[f],{[l]:m,[c]:g}=p,_=p._stacks||(p._stacks={});u=_[c]=Gh(s,d,m),u[a]=g,u._top=Tl(u,o,!0,i.type),u._bottom=Tl(u,o,!1,i.type);let b=u._visualValues||(u._visualValues={});b[a]=g}}function qr(n,t){let e=n.scales;return Object.keys(e).filter(i=>e[i].axis===t).shift()}function Xh(n,t){return ge(n,{active:!1,dataset:void 0,datasetIndex:t,index:t,mode:"default",type:"dataset"})}function Kh(n,t,e){return ge(n,{active:!1,dataIndex:t,parsed:void 0,raw:void 0,element:e,index:t,mode:"default",type:"data"})}function ti(n,t){let e=n.controller.index,i=n.vScale&&n.vScale.axis;if(i){t=t||n._parsed;for(let s of t){let r=s._stacks;if(!r||r[i]===void 0||r[i][e]===void 0)return;delete r[i][e],r[i]._visualValues!==void 0&&r[i]._visualValues[e]!==void 0&&delete r[i]._visualValues[e]}}}var Jr=n=>n==="reset"||n==="none",wl=(n,t)=>t?n:Object.assign({},n),qh=(n,t,e)=>n&&!t.hidden&&t._stacked&&{keys:yc(e,!0),values:null},Ht=class{constructor(t,e){this.chart=t,this._ctx=t.ctx,this.index=e,this._cachedDataOpts={},this._cachedMeta=this.getMeta(),this._type=this._cachedMeta.type,this.options=void 0,this._parsing=!1,this._data=void 0,this._objectData=void 0,this._sharedOptions=void 0,this._drawStart=void 0,this._drawCount=void 0,this.enableOptionSharing=!1,this.supportsDecimation=!1,this.$context=void 0,this._syncList=[],this.datasetElementType=new.target.datasetElementType,this.dataElementType=new.target.dataElementType,this.initialize()}initialize(){let t=this._cachedMeta;this.configure(),this.linkScales(),t._stacked=Kr(t.vScale,t),this.addElements(),this.options.fill&&!this.chart.isPluginEnabled("filler")&&console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options")}updateIndex(t){this.index!==t&&ti(this._cachedMeta),this.index=t}linkScales(){let t=this.chart,e=this._cachedMeta,i=this.getDataset(),s=(h,u,f,p)=>h==="x"?u:h==="r"?p:f,r=e.xAxisID=z(i.xAxisID,qr(t,"x")),o=e.yAxisID=z(i.yAxisID,qr(t,"y")),a=e.rAxisID=z(i.rAxisID,qr(t,"r")),l=e.indexAxis,c=e.iAxisID=s(l,r,o,a),d=e.vAxisID=s(l,o,r,a);e.xScale=this.getScaleForId(r),e.yScale=this.getScaleForId(o),e.rScale=this.getScaleForId(a),e.iScale=this.getScaleForId(c),e.vScale=this.getScaleForId(d)}getDataset(){return this.chart.data.datasets[this.index]}getMeta(){return this.chart.getDatasetMeta(this.index)}getScaleForId(t){return this.chart.scales[t]}_getOtherScale(t){let e=this._cachedMeta;return t===e.iScale?e.vScale:e.iScale}reset(){this._update("reset")}_destroy(){let t=this._cachedMeta;this._data&&Mr(this._data,this),t._stacked&&ti(t)}_dataCheck(){let t=this.getDataset(),e=t.data||(t.data=[]),i=this._data;if(j(e)){let s=this._cachedMeta;this._data=Yh(e,s)}else if(i!==e){if(i){Mr(i,this);let s=this._cachedMeta;ti(s),s._parsed=[]}e&&Object.isExtensible(e)&&el(e,this),this._syncList=[],this._data=e}}addElements(){let t=this._cachedMeta;this._dataCheck(),this.datasetElementType&&(t.dataset=new this.datasetElementType)}buildOrUpdateElements(t){let e=this._cachedMeta,i=this.getDataset(),s=!1;this._dataCheck();let r=e._stacked;e._stacked=Kr(e.vScale,e),e.stack!==i.stack&&(s=!0,ti(e),e.stack=i.stack),this._resyncElements(t),(s||r!==e._stacked)&&(Sl(this,e._parsed),e._stacked=Kr(e.vScale,e))}configure(){let t=this.chart.config,e=t.datasetScopeKeys(this._type),i=t.getOptionScopes(this.getDataset(),e,!0);this.options=t.createResolver(i,this.getContext()),this._parsing=this.options.parsing,this._cachedDataOpts={}}parse(t,e){let{_cachedMeta:i,_data:s}=this,{iScale:r,_stacked:o}=i,a=r.axis,l=t===0&&e===s.length?!0:i._sorted,c=t>0&&i._parsed[t-1],d,h,u;if(this._parsing===!1)i._parsed=s,i._sorted=!0,u=s;else{st(s[t])?u=this.parseArrayData(i,s,t,e):j(s[t])?u=this.parseObjectData(i,s,t,e):u=this.parsePrimitiveData(i,s,t,e);let f=()=>h[a]===null||c&&h[a]<c[a];for(d=0;d<e;++d)i._parsed[d+t]=h=u[d],l&&(f()&&(l=!1),c=h);i._sorted=l}o&&Sl(this,u)}parsePrimitiveData(t,e,i,s){let{iScale:r,vScale:o}=t,a=r.axis,l=o.axis,c=r.getLabels(),d=r===o,h=new Array(s),u,f,p;for(u=0,f=s;u<f;++u)p=u+i,h[u]={[a]:d||r.parse(c[p],p),[l]:o.parse(e[p],p)};return h}parseArrayData(t,e,i,s){let{xScale:r,yScale:o}=t,a=new Array(s),l,c,d,h;for(l=0,c=s;l<c;++l)d=l+i,h=e[d],a[l]={x:r.parse(h[0],d),y:o.parse(h[1],d)};return a}parseObjectData(t,e,i,s){let{xScale:r,yScale:o}=t,{xAxisKey:a="x",yAxisKey:l="y"}=this._parsing,c=new Array(s),d,h,u,f;for(d=0,h=s;d<h;++d)u=d+i,f=e[u],c[d]={x:r.parse(me(f,a),u),y:o.parse(me(f,l),u)};return c}getParsed(t){return this._cachedMeta._parsed[t]}getDataElement(t){return this._cachedMeta.data[t]}applyStack(t,e,i){let s=this.chart,r=this._cachedMeta,o=e[t.axis],a={keys:yc(s,!0),values:e._stacks[t.axis]._visualValues};return kl(a,o,r.index,{mode:i})}updateRangeFromParsed(t,e,i,s){let r=i[e.axis],o=r===null?NaN:r,a=s&&i._stacks[e.axis];s&&a&&(s.values=a,o=kl(s,r,this._cachedMeta.index)),t.min=Math.min(t.min,o),t.max=Math.max(t.max,o)}getMinMax(t,e){let i=this._cachedMeta,s=i._parsed,r=i._sorted&&t===i.iScale,o=s.length,a=this._getOtherScale(t),l=qh(e,i,this.chart),c={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY},{min:d,max:h}=jh(a),u,f;function p(){f=s[u];let m=f[a.axis];return!pt(f[t.axis])||d>m||h<m}for(u=0;u<o&&!(!p()&&(this.updateRangeFromParsed(c,t,f,l),r));++u);if(r){for(u=o-1;u>=0;--u)if(!p()){this.updateRangeFromParsed(c,t,f,l);break}}return c}getAllParsedValues(t){let e=this._cachedMeta._parsed,i=[],s,r,o;for(s=0,r=e.length;s<r;++s)o=e[s][t.axis],pt(o)&&i.push(o);return i}getMaxOverflow(){return!1}getLabelAndValue(t){let e=this._cachedMeta,i=e.iScale,s=e.vScale,r=this.getParsed(t);return{label:i?""+i.getLabelForValue(r[i.axis]):"",value:s?""+s.getLabelForValue(r[s.axis]):""}}_update(t){let e=this._cachedMeta;this.update(t||"default"),e._clip=Uh(z(this.options.clip,Wh(e.xScale,e.yScale,this.getMaxOverflow())))}update(t){}draw(){let t=this._ctx,e=this.chart,i=this._cachedMeta,s=i.data||[],r=e.chartArea,o=[],a=this._drawStart||0,l=this._drawCount||s.length-a,c=this.options.drawActiveElementsOnTop,d;for(i.dataset&&i.dataset.draw(t,r,a,l),d=a;d<a+l;++d){let h=s[d];h.hidden||(h.active&&c?o.push(h):h.draw(t,r))}for(d=0;d<o.length;++d)o[d].draw(t,r)}getStyle(t,e){let i=e?"active":"default";return t===void 0&&this._cachedMeta.dataset?this.resolveDatasetElementOptions(i):this.resolveDataElementOptions(t||0,i)}getContext(t,e,i){let s=this.getDataset(),r;if(t>=0&&t<this._cachedMeta.data.length){let o=this._cachedMeta.data[t];r=o.$context||(o.$context=Kh(this.getContext(),t,o)),r.parsed=this.getParsed(t),r.raw=s.data[t],r.index=r.dataIndex=t}else r=this.$context||(this.$context=Xh(this.chart.getContext(),this.index)),r.dataset=s,r.index=r.datasetIndex=this.index;return r.active=!!e,r.mode=i,r}resolveDatasetElementOptions(t){return this._resolveElementOptions(this.datasetElementType.id,t)}resolveDataElementOptions(t,e){return this._resolveElementOptions(this.dataElementType.id,e,t)}_resolveElementOptions(t,e="default",i){let s=e==="active",r=this._cachedDataOpts,o=t+"-"+e,a=r[o],l=this.enableOptionSharing&&mn(i);if(a)return wl(a,l);let c=this.chart.config,d=c.datasetElementScopeKeys(this._type,t),h=s?[`${t}Hover`,"hover",t,""]:[t,""],u=c.getOptionScopes(this.getDataset(),d),f=Object.keys(dt.elements[t]),p=()=>this.getContext(i,s,e),m=c.resolveNamedOptions(u,f,p,h);return m.$shared&&(m.$shared=l,r[o]=Object.freeze(wl(m,l))),m}_resolveAnimations(t,e,i){let s=this.chart,r=this._cachedDataOpts,o=`animation-${e}`,a=r[o];if(a)return a;let l;if(s.options.animation!==!1){let d=this.chart.config,h=d.datasetAnimationScopeKeys(this._type,e),u=d.getOptionScopes(this.getDataset(),h);l=d.createResolver(u,this.getContext(t,i,e))}let c=new us(s,l&&l.animations);return l&&l._cacheable&&(r[o]=Object.freeze(c)),c}getSharedOptions(t){if(t.$shared)return this._sharedOptions||(this._sharedOptions=Object.assign({},t))}includeOptions(t,e){return!e||Jr(t)||this.chart._animationsDisabled}_getSharedOptions(t,e){let i=this.resolveDataElementOptions(t,e),s=this._sharedOptions,r=this.getSharedOptions(i),o=this.includeOptions(e,r)||r!==s;return this.updateSharedOptions(r,e,i),{sharedOptions:r,includeOptions:o}}updateElement(t,e,i,s){Jr(s)?Object.assign(t,i):this._resolveAnimations(e,s).update(t,i)}updateSharedOptions(t,e,i){t&&!Jr(e)&&this._resolveAnimations(void 0,e).update(t,i)}_setStyle(t,e,i,s){t.active=s;let r=this.getStyle(e,s);this._resolveAnimations(e,i,s).update(t,{options:!s&&this.getSharedOptions(r)||r})}removeHoverStyle(t,e,i){this._setStyle(t,i,"active",!1)}setHoverStyle(t,e,i){this._setStyle(t,i,"active",!0)}_removeDatasetHoverStyle(){let t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!1)}_setDatasetHoverStyle(){let t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!0)}_resyncElements(t){let e=this._data,i=this._cachedMeta.data;for(let[a,l,c]of this._syncList)this[a](l,c);this._syncList=[];let s=i.length,r=e.length,o=Math.min(r,s);o&&this.parse(0,o),r>s?this._insertElements(s,r-s,t):r<s&&this._removeElements(r,s-r)}_insertElements(t,e,i=!0){let s=this._cachedMeta,r=s.data,o=t+e,a,l=c=>{for(c.length+=e,a=c.length-1;a>=o;a--)c[a]=c[a-e]};for(l(r),a=t;a<o;++a)r[a]=new this.dataElementType;this._parsing&&l(s._parsed),this.parse(t,e),i&&this.updateElements(r,t,e,"reset")}updateElements(t,e,i,s){}_removeElements(t,e){let i=this._cachedMeta;if(this._parsing){let s=i._parsed.splice(t,e);i._stacked&&ti(i,s)}i.data.splice(t,e)}_sync(t){if(this._parsing)this._syncList.push(t);else{let[e,i,s]=t;this[e](i,s)}this.chart._dataChanges.push([this.index,...t])}_onDataPush(){let t=arguments.length;this._sync(["_insertElements",this.getDataset().data.length-t,t])}_onDataPop(){this._sync(["_removeElements",this._cachedMeta.data.length-1,1])}_onDataShift(){this._sync(["_removeElements",0,1])}_onDataSplice(t,e){e&&this._sync(["_removeElements",t,e]);let i=arguments.length-2;i&&this._sync(["_insertElements",t,i])}_onDataUnshift(){this._sync(["_insertElements",0,arguments.length])}};A(Ht,"defaults",{}),A(Ht,"datasetElementType",null),A(Ht,"dataElementType",null);function Jh(n,t){if(!n._cache.$bar){let e=n.getMatchingVisibleMetas(t),i=[];for(let s=0,r=e.length;s<r;s++)i=i.concat(e[s].controller.getAllParsedValues(n));n._cache.$bar=Dr(i.sort((s,r)=>s-r))}return n._cache.$bar}function Zh(n){let t=n.iScale,e=Jh(t,n.type),i=t._length,s,r,o,a,l=()=>{o===32767||o===-32768||(mn(a)&&(i=Math.min(i,Math.abs(o-a)||i)),a=o)};for(s=0,r=e.length;s<r;++s)o=t.getPixelForValue(e[s]),l();for(a=void 0,s=0,r=t.ticks.length;s<r;++s)o=t.getPixelForTick(s),l();return i}function Qh(n,t,e,i){let s=e.barThickness,r,o;return Y(s)?(r=t.min*e.categoryPercentage,o=e.barPercentage):(r=s*i,o=1),{chunk:r/i,ratio:o,start:t.pixels[n]-r/2}}function tu(n,t,e,i){let s=t.pixels,r=s[n],o=n>0?s[n-1]:null,a=n<s.length-1?s[n+1]:null,l=e.categoryPercentage;o===null&&(o=r-(a===null?t.end-t.start:a-r)),a===null&&(a=r+r-o);let c=r-(r-Math.min(o,a))/2*l;return{chunk:Math.abs(a-o)/2*l/i,ratio:e.barPercentage,start:c}}function eu(n,t,e,i){let s=e.parse(n[0],i),r=e.parse(n[1],i),o=Math.min(s,r),a=Math.max(s,r),l=o,c=a;Math.abs(o)>Math.abs(a)&&(l=a,c=o),t[e.axis]=c,t._custom={barStart:l,barEnd:c,start:s,end:r,min:o,max:a}}function vc(n,t,e,i){return st(n)?eu(n,t,e,i):t[e.axis]=e.parse(n,i),t}function El(n,t,e,i){let s=n.iScale,r=n.vScale,o=s.getLabels(),a=s===r,l=[],c,d,h,u;for(c=e,d=e+i;c<d;++c)u=t[c],h={},h[s.axis]=a||s.parse(o[c],c),l.push(vc(u,h,r,c));return l}function Zr(n){return n&&n.barStart!==void 0&&n.barEnd!==void 0}function nu(n,t,e){return n!==0?Qt(n):(t.isHorizontal()?1:-1)*(t.min>=e?1:-1)}function iu(n){let t,e,i,s,r;return n.horizontal?(t=n.base>n.x,e="left",i="right"):(t=n.base<n.y,e="bottom",i="top"),t?(s="end",r="start"):(s="start",r="end"),{start:e,end:i,reverse:t,top:s,bottom:r}}function su(n,t,e,i){let s=t.borderSkipped,r={};if(!s){n.borderSkipped=r;return}if(s===!0){n.borderSkipped={top:!0,right:!0,bottom:!0,left:!0};return}let{start:o,end:a,reverse:l,top:c,bottom:d}=iu(n);s==="middle"&&e&&(n.enableBorderRadius=!0,(e._top||0)===i?s=c:(e._bottom||0)===i?s=d:(r[Ml(d,o,a,l)]=!0,s=c)),r[Ml(s,o,a,l)]=!0,n.borderSkipped=r}function Ml(n,t,e,i){return i?(n=ru(n,t,e),n=Dl(n,e,t)):n=Dl(n,t,e),n}function ru(n,t,e){return n===t?e:n===e?t:n}function Dl(n,t,e){return n==="start"?t:n==="end"?e:n}function ou(n,{inflateAmount:t},e){n.inflateAmount=t==="auto"?e===1?.33:0:t}var kn=class extends Ht{parsePrimitiveData(t,e,i,s){return El(t,e,i,s)}parseArrayData(t,e,i,s){return El(t,e,i,s)}parseObjectData(t,e,i,s){let{iScale:r,vScale:o}=t,{xAxisKey:a="x",yAxisKey:l="y"}=this._parsing,c=r.axis==="x"?a:l,d=o.axis==="x"?a:l,h=[],u,f,p,m;for(u=i,f=i+s;u<f;++u)m=e[u],p={},p[r.axis]=r.parse(me(m,c),u),h.push(vc(me(m,d),p,o,u));return h}updateRangeFromParsed(t,e,i,s){super.updateRangeFromParsed(t,e,i,s);let r=i._custom;r&&e===this._cachedMeta.vScale&&(t.min=Math.min(t.min,r.min),t.max=Math.max(t.max,r.max))}getMaxOverflow(){return 0}getLabelAndValue(t){let e=this._cachedMeta,{iScale:i,vScale:s}=e,r=this.getParsed(t),o=r._custom,a=Zr(o)?"["+o.start+", "+o.end+"]":""+s.getLabelForValue(r[s.axis]);return{label:""+i.getLabelForValue(r[i.axis]),value:a}}initialize(){this.enableOptionSharing=!0,super.initialize();let t=this._cachedMeta;t.stack=this.getDataset().stack}update(t){let e=this._cachedMeta;this.updateElements(e.data,0,e.data.length,t)}updateElements(t,e,i,s){let r=s==="reset",{index:o,_cachedMeta:{vScale:a}}=this,l=a.getBasePixel(),c=a.isHorizontal(),d=this._getRuler(),{sharedOptions:h,includeOptions:u}=this._getSharedOptions(e,s);for(let f=e;f<e+i;f++){let p=this.getParsed(f),m=r||Y(p[a.axis])?{base:l,head:l}:this._calculateBarValuePixels(f),g=this._calculateBarIndexPixels(f,d),_=(p._stacks||{})[a.axis],b={horizontal:c,base:m.base,enableBorderRadius:!_||Zr(p._custom)||o===_._top||o===_._bottom,x:c?m.head:g.center,y:c?g.center:m.head,height:c?g.size:Math.abs(m.size),width:c?Math.abs(m.size):g.size};u&&(b.options=h||this.resolveDataElementOptions(f,t[f].active?"active":s));let k=b.options||t[f].options;su(b,k,_,o),ou(b,k,d.ratio),this.updateElement(t[f],f,b,s)}}_getStacks(t,e){let{iScale:i}=this._cachedMeta,s=i.getMatchingVisibleMetas(this._type).filter(d=>d.controller.options.grouped),r=i.options.stacked,o=[],a=this._cachedMeta.controller.getParsed(e),l=a&&a[i.axis],c=d=>{let h=d._parsed.find(f=>f[i.axis]===l),u=h&&h[d.vScale.axis];if(Y(u)||isNaN(u))return!0};for(let d of s)if(!(e!==void 0&&c(d))&&((r===!1||o.indexOf(d.stack)===-1||r===void 0&&d.stack===void 0)&&o.push(d.stack),d.index===t))break;return o.length||o.push(void 0),o}_getStackCount(t){return this._getStacks(void 0,t).length}_getAxisCount(){return this._getAxis().length}getFirstScaleIdForIndexAxis(){let t=this.chart.scales,e=this.chart.options.indexAxis;return Object.keys(t).filter(i=>t[i].axis===e).shift()}_getAxis(){let t={},e=this.getFirstScaleIdForIndexAxis();for(let i of this.chart.data.datasets)t[z(this.chart.options.indexAxis==="x"?i.xAxisID:i.yAxisID,e)]=!0;return Object.keys(t)}_getStackIndex(t,e,i){let s=this._getStacks(t,i),r=e!==void 0?s.indexOf(e):-1;return r===-1?s.length-1:r}_getRuler(){let t=this.options,e=this._cachedMeta,i=e.iScale,s=[],r,o;for(r=0,o=e.data.length;r<o;++r)s.push(i.getPixelForValue(this.getParsed(r)[i.axis],r));let a=t.barThickness;return{min:a||Zh(e),pixels:s,start:i._startPixel,end:i._endPixel,stackCount:this._getStackCount(),scale:i,grouped:t.grouped,ratio:a?1:t.categoryPercentage*t.barPercentage}}_calculateBarValuePixels(t){let{_cachedMeta:{vScale:e,_stacked:i,index:s},options:{base:r,minBarLength:o}}=this,a=r||0,l=this.getParsed(t),c=l._custom,d=Zr(c),h=l[e.axis],u=0,f=i?this.applyStack(e,l,i):h,p,m;f!==h&&(u=f-h,f=h),d&&(h=c.barStart,f=c.barEnd-c.barStart,h!==0&&Qt(h)!==Qt(c.barEnd)&&(u=0),u+=h);let g=!Y(r)&&!d?r:u,_=e.getPixelForValue(g);if(this.chart.getDataVisibility(t)?p=e.getPixelForValue(u+f):p=_,m=p-_,Math.abs(m)<o){m=nu(m,e,a)*o,h===a&&(_-=m/2);let b=e.getPixelForDecimal(0),k=e.getPixelForDecimal(1),y=Math.min(b,k),x=Math.max(b,k);_=Math.max(Math.min(_,x),y),p=_+m,i&&!d&&(l._stacks[e.axis]._visualValues[s]=e.getValueForPixel(p)-e.getValueForPixel(_))}if(_===e.getPixelForValue(a)){let b=Qt(m)*e.getLineWidthForValue(a)/2;_+=b,m-=b}return{size:m,base:_,head:p,center:p+m/2}}_calculateBarIndexPixels(t,e){let i=e.scale,s=this.options,r=s.skipNull,o=z(s.maxBarThickness,1/0),a,l,c=this._getAxisCount();if(e.grouped){let d=r?this._getStackCount(t):e.stackCount,h=s.barThickness==="flex"?tu(t,e,s,d*c):Qh(t,e,s,d*c),u=this.chart.options.indexAxis==="x"?this.getDataset().xAxisID:this.getDataset().yAxisID,f=this._getAxis().indexOf(z(u,this.getFirstScaleIdForIndexAxis())),p=this._getStackIndex(this.index,this._cachedMeta.stack,r?t:void 0)+f;a=h.start+h.chunk*p+h.chunk/2,l=Math.min(o,h.chunk*h.ratio)}else a=i.getPixelForValue(this.getParsed(t)[i.axis],t),l=Math.min(o,e.min*e.ratio);return{base:a-l/2,head:a+l/2,center:a,size:l}}draw(){let t=this._cachedMeta,e=t.vScale,i=t.data,s=i.length,r=0;for(;r<s;++r)this.getParsed(r)[e.axis]!==null&&!i[r].hidden&&i[r].draw(this._ctx)}};A(kn,"id","bar"),A(kn,"defaults",{datasetElementType:!1,dataElementType:"bar",categoryPercentage:.8,barPercentage:.9,grouped:!0,animations:{numbers:{type:"number",properties:["x","y","base","width","height"]}}}),A(kn,"overrides",{scales:{_index_:{type:"category",offset:!0,grid:{offset:!0}},_value_:{type:"linear",beginAtZero:!0}}});var Tn=class extends Ht{initialize(){this.enableOptionSharing=!0,super.initialize()}parsePrimitiveData(t,e,i,s){let r=super.parsePrimitiveData(t,e,i,s);for(let o=0;o<r.length;o++)r[o]._custom=this.resolveDataElementOptions(o+i).radius;return r}parseArrayData(t,e,i,s){let r=super.parseArrayData(t,e,i,s);for(let o=0;o<r.length;o++){let a=e[i+o];r[o]._custom=z(a[2],this.resolveDataElementOptions(o+i).radius)}return r}parseObjectData(t,e,i,s){let r=super.parseObjectData(t,e,i,s);for(let o=0;o<r.length;o++){let a=e[i+o];r[o]._custom=z(a&&a.r&&+a.r,this.resolveDataElementOptions(o+i).radius)}return r}getMaxOverflow(){let t=this._cachedMeta.data,e=0;for(let i=t.length-1;i>=0;--i)e=Math.max(e,t[i].size(this.resolveDataElementOptions(i))/2);return e>0&&e}getLabelAndValue(t){let e=this._cachedMeta,i=this.chart.data.labels||[],{xScale:s,yScale:r}=e,o=this.getParsed(t),a=s.getLabelForValue(o.x),l=r.getLabelForValue(o.y),c=o._custom;return{label:i[t]||"",value:"("+a+", "+l+(c?", "+c:"")+")"}}update(t){let e=this._cachedMeta.data;this.updateElements(e,0,e.length,t)}updateElements(t,e,i,s){let r=s==="reset",{iScale:o,vScale:a}=this._cachedMeta,{sharedOptions:l,includeOptions:c}=this._getSharedOptions(e,s),d=o.axis,h=a.axis;for(let u=e;u<e+i;u++){let f=t[u],p=!r&&this.getParsed(u),m={},g=m[d]=r?o.getPixelForDecimal(.5):o.getPixelForValue(p[d]),_=m[h]=r?a.getBasePixel():a.getPixelForValue(p[h]);m.skip=isNaN(g)||isNaN(_),c&&(m.options=l||this.resolveDataElementOptions(u,f.active?"active":s),r&&(m.options.radius=0)),this.updateElement(f,u,m,s)}}resolveDataElementOptions(t,e){let i=this.getParsed(t),s=super.resolveDataElementOptions(t,e);s.$shared&&(s=Object.assign({},s,{$shared:!1}));let r=s.radius;return e!=="active"&&(s.radius=0),s.radius+=z(i&&i._custom,r),s}};A(Tn,"id","bubble"),A(Tn,"defaults",{datasetElementType:!1,dataElementType:"point",animations:{numbers:{type:"number",properties:["x","y","borderWidth","radius"]}}}),A(Tn,"overrides",{scales:{x:{type:"linear"},y:{type:"linear"}}});function au(n,t,e){let i=1,s=1,r=0,o=0;if(t<rt){let a=n,l=a+t,c=Math.cos(a),d=Math.sin(a),h=Math.cos(l),u=Math.sin(l),f=(k,y,x)=>_n(k,a,l,!0)?1:Math.max(y,y*e,x,x*e),p=(k,y,x)=>_n(k,a,l,!0)?-1:Math.min(y,y*e,x,x*e),m=f(0,c,h),g=f(mt,d,u),_=p(q,c,h),b=p(q+mt,d,u);i=(m-_)/2,s=(g-b)/2,r=-(m+_)/2,o=-(g+b)/2}return{ratioX:i,ratioY:s,offsetX:r,offsetY:o}}var ye=class extends Ht{constructor(t,e){super(t,e),this.enableOptionSharing=!0,this.innerRadius=void 0,this.outerRadius=void 0,this.offsetX=void 0,this.offsetY=void 0}linkScales(){}parse(t,e){let i=this.getDataset().data,s=this._cachedMeta;if(this._parsing===!1)s._parsed=i;else{let r=l=>+i[l];if(j(i[t])){let{key:l="value"}=this._parsing;r=c=>+me(i[c],l)}let o,a;for(o=t,a=t+e;o<a;++o)s._parsed[o]=r(o)}}_getRotation(){return Kt(this.options.rotation-90)}_getCircumference(){return Kt(this.options.circumference)}_getRotationExtents(){let t=rt,e=-rt;for(let i=0;i<this.chart.data.datasets.length;++i)if(this.chart.isDatasetVisible(i)&&this.chart.getDatasetMeta(i).type===this._type){let s=this.chart.getDatasetMeta(i).controller,r=s._getRotation(),o=s._getCircumference();t=Math.min(t,r),e=Math.max(e,r+o)}return{rotation:t,circumference:e-t}}update(t){let e=this.chart,{chartArea:i}=e,s=this._cachedMeta,r=s.data,o=this.getMaxBorderWidth()+this.getMaxOffset(r)+this.options.spacing,a=Math.max((Math.min(i.width,i.height)-o)/2,0),l=Math.min(ja(this.options.cutout,a),1),c=this._getRingWeight(this.index),{circumference:d,rotation:h}=this._getRotationExtents(),{ratioX:u,ratioY:f,offsetX:p,offsetY:m}=au(h,d,l),g=(i.width-o)/u,_=(i.height-o)/f,b=Math.max(Math.min(g,_)/2,0),k=xr(this.options.radius,b),y=Math.max(k*l,0),x=(k-y)/this._getVisibleDatasetWeightTotal();this.offsetX=p*k,this.offsetY=m*k,s.total=this.calculateTotal(),this.outerRadius=k-x*this._getRingWeightOffset(this.index),this.innerRadius=Math.max(this.outerRadius-x*c,0),this.updateElements(r,0,r.length,t)}_circumference(t,e){let i=this.options,s=this._cachedMeta,r=this._getCircumference();return e&&i.animation.animateRotate||!this.chart.getDataVisibility(t)||s._parsed[t]===null||s.data[t].hidden?0:this.calculateCircumference(s._parsed[t]*r/rt)}updateElements(t,e,i,s){let r=s==="reset",o=this.chart,a=o.chartArea,c=o.options.animation,d=(a.left+a.right)/2,h=(a.top+a.bottom)/2,u=r&&c.animateScale,f=u?0:this.innerRadius,p=u?0:this.outerRadius,{sharedOptions:m,includeOptions:g}=this._getSharedOptions(e,s),_=this._getRotation(),b;for(b=0;b<e;++b)_+=this._circumference(b,r);for(b=e;b<e+i;++b){let k=this._circumference(b,r),y=t[b],x={x:d+this.offsetX,y:h+this.offsetY,startAngle:_,endAngle:_+k,circumference:k,outerRadius:p,innerRadius:f};g&&(x.options=m||this.resolveDataElementOptions(b,y.active?"active":s)),_+=k,this.updateElement(y,b,x,s)}}calculateTotal(){let t=this._cachedMeta,e=t.data,i=0,s;for(s=0;s<e.length;s++){let r=t._parsed[s];r!==null&&!isNaN(r)&&this.chart.getDataVisibility(s)&&!e[s].hidden&&(i+=Math.abs(r))}return i}calculateCircumference(t){let e=this._cachedMeta.total;return e>0&&!isNaN(t)?rt*(Math.abs(t)/e):0}getLabelAndValue(t){let e=this._cachedMeta,i=this.chart,s=i.data.labels||[],r=bn(e._parsed[t],i.options.locale);return{label:s[t]||"",value:r}}getMaxBorderWidth(t){let e=0,i=this.chart,s,r,o,a,l;if(!t){for(s=0,r=i.data.datasets.length;s<r;++s)if(i.isDatasetVisible(s)){o=i.getDatasetMeta(s),t=o.data,a=o.controller;break}}if(!t)return 0;for(s=0,r=t.length;s<r;++s)l=a.resolveDataElementOptions(s),l.borderAlign!=="inner"&&(e=Math.max(e,l.borderWidth||0,l.hoverBorderWidth||0));return e}getMaxOffset(t){let e=0;for(let i=0,s=t.length;i<s;++i){let r=this.resolveDataElementOptions(i);e=Math.max(e,r.offset||0,r.hoverOffset||0)}return e}_getRingWeightOffset(t){let e=0;for(let i=0;i<t;++i)this.chart.isDatasetVisible(i)&&(e+=this._getRingWeight(i));return e}_getRingWeight(t){return Math.max(z(this.chart.data.datasets[t].weight,1),0)}_getVisibleDatasetWeightTotal(){return this._getRingWeightOffset(this.chart.data.datasets.length)||1}};A(ye,"id","doughnut"),A(ye,"defaults",{datasetElementType:!1,dataElementType:"arc",animation:{animateRotate:!0,animateScale:!1},animations:{numbers:{type:"number",properties:["circumference","endAngle","innerRadius","outerRadius","startAngle","x","y","offset","borderWidth","spacing"]}},cutout:"50%",rotation:0,circumference:360,radius:"100%",spacing:0,indexAxis:"r"}),A(ye,"descriptors",{_scriptable:t=>t!=="spacing",_indexable:t=>t!=="spacing"&&!t.startsWith("borderDash")&&!t.startsWith("hoverBorderDash")}),A(ye,"overrides",{aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){let e=t.data,{labels:{pointStyle:i,textAlign:s,color:r,useBorderRadius:o,borderRadius:a}}=t.legend.options;return e.labels.length&&e.datasets.length?e.labels.map((l,c)=>{let h=t.getDatasetMeta(0).controller.getStyle(c);return{text:l,fillStyle:h.backgroundColor,fontColor:r,hidden:!t.getDataVisibility(c),lineDash:h.borderDash,lineDashOffset:h.borderDashOffset,lineJoin:h.borderJoinStyle,lineWidth:h.borderWidth,strokeStyle:h.borderColor,textAlign:s,pointStyle:i,borderRadius:o&&(a||h.borderRadius),index:c}}):[]}},onClick(t,e,i){i.chart.toggleDataVisibility(e.index),i.chart.update()}}}});var Sn=class extends Ht{initialize(){this.enableOptionSharing=!0,this.supportsDecimation=!0,super.initialize()}update(t){let e=this._cachedMeta,{dataset:i,data:s=[],_dataset:r}=e,o=this.chart._animationsDisabled,{start:a,count:l}=Rr(e,s,o);this._drawStart=a,this._drawCount=l,Or(e)&&(a=0,l=s.length),i._chart=this.chart,i._datasetIndex=this.index,i._decimated=!!r._decimated,i.points=s;let c=this.resolveDatasetElementOptions(t);this.options.showLine||(c.borderWidth=0),c.segment=this.options.segment,this.updateElement(i,void 0,{animated:!o,options:c},t),this.updateElements(s,a,l,t)}updateElements(t,e,i,s){let r=s==="reset",{iScale:o,vScale:a,_stacked:l,_dataset:c}=this._cachedMeta,{sharedOptions:d,includeOptions:h}=this._getSharedOptions(e,s),u=o.axis,f=a.axis,{spanGaps:p,segment:m}=this.options,g=We(p)?p:Number.POSITIVE_INFINITY,_=this.chart._animationsDisabled||r||s==="none",b=e+i,k=t.length,y=e>0&&this.getParsed(e-1);for(let x=0;x<k;++x){let T=t[x],w=_?T:{};if(x<e||x>=b){w.skip=!0;continue}let v=this.getParsed(x),E=Y(v[f]),C=w[u]=o.getPixelForValue(v[u],x),R=w[f]=r||E?a.getBasePixel():a.getPixelForValue(l?this.applyStack(a,v,l):v[f],x);w.skip=isNaN(C)||isNaN(R)||E,w.stop=x>0&&Math.abs(v[u]-y[u])>g,m&&(w.parsed=v,w.raw=c.data[x]),h&&(w.options=d||this.resolveDataElementOptions(x,T.active?"active":s)),_||this.updateElement(T,x,w,s),y=v}}getMaxOverflow(){let t=this._cachedMeta,e=t.dataset,i=e.options&&e.options.borderWidth||0,s=t.data||[];if(!s.length)return i;let r=s[0].size(this.resolveDataElementOptions(0)),o=s[s.length-1].size(this.resolveDataElementOptions(s.length-1));return Math.max(i,r,o)/2}draw(){let t=this._cachedMeta;t.dataset.updateControlPoints(this.chart.chartArea,t.iScale.axis),super.draw()}};A(Sn,"id","line"),A(Sn,"defaults",{datasetElementType:"line",dataElementType:"point",showLine:!0,spanGaps:!1}),A(Sn,"overrides",{scales:{_index_:{type:"category"},_value_:{type:"linear"}}});var Xe=class extends Ht{constructor(t,e){super(t,e),this.innerRadius=void 0,this.outerRadius=void 0}getLabelAndValue(t){let e=this._cachedMeta,i=this.chart,s=i.data.labels||[],r=bn(e._parsed[t].r,i.options.locale);return{label:s[t]||"",value:r}}parseObjectData(t,e,i,s){return Hr.bind(this)(t,e,i,s)}update(t){let e=this._cachedMeta.data;this._updateRadius(),this.updateElements(e,0,e.length,t)}getMinMax(){let t=this._cachedMeta,e={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY};return t.data.forEach((i,s)=>{let r=this.getParsed(s).r;!isNaN(r)&&this.chart.getDataVisibility(s)&&(r<e.min&&(e.min=r),r>e.max&&(e.max=r))}),e}_updateRadius(){let t=this.chart,e=t.chartArea,i=t.options,s=Math.min(e.right-e.left,e.bottom-e.top),r=Math.max(s/2,0),o=Math.max(i.cutoutPercentage?r/100*i.cutoutPercentage:1,0),a=(r-o)/t.getVisibleDatasetCount();this.outerRadius=r-a*this.index,this.innerRadius=this.outerRadius-a}updateElements(t,e,i,s){let r=s==="reset",o=this.chart,l=o.options.animation,c=this._cachedMeta.rScale,d=c.xCenter,h=c.yCenter,u=c.getIndexAngle(0)-.5*q,f=u,p,m=360/this.countVisibleElements();for(p=0;p<e;++p)f+=this._computeAngle(p,s,m);for(p=e;p<e+i;p++){let g=t[p],_=f,b=f+this._computeAngle(p,s,m),k=o.getDataVisibility(p)?c.getDistanceFromCenterForValue(this.getParsed(p).r):0;f=b,r&&(l.animateScale&&(k=0),l.animateRotate&&(_=b=u));let y={x:d,y:h,innerRadius:0,outerRadius:k,startAngle:_,endAngle:b,options:this.resolveDataElementOptions(p,g.active?"active":s)};this.updateElement(g,p,y,s)}}countVisibleElements(){let t=this._cachedMeta,e=0;return t.data.forEach((i,s)=>{!isNaN(this.getParsed(s).r)&&this.chart.getDataVisibility(s)&&e++}),e}_computeAngle(t,e,i){return this.chart.getDataVisibility(t)?Kt(this.resolveDataElementOptions(t,e).angle||i):0}};A(Xe,"id","polarArea"),A(Xe,"defaults",{dataElementType:"arc",animation:{animateRotate:!0,animateScale:!0},animations:{numbers:{type:"number",properties:["x","y","startAngle","endAngle","innerRadius","outerRadius"]}},indexAxis:"r",startAngle:0}),A(Xe,"overrides",{aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){let e=t.data;if(e.labels.length&&e.datasets.length){let{labels:{pointStyle:i,color:s}}=t.legend.options;return e.labels.map((r,o)=>{let l=t.getDatasetMeta(0).controller.getStyle(o);return{text:r,fillStyle:l.backgroundColor,strokeStyle:l.borderColor,fontColor:s,lineWidth:l.borderWidth,pointStyle:i,hidden:!t.getDataVisibility(o),index:o}})}return[]}},onClick(t,e,i){i.chart.toggleDataVisibility(e.index),i.chart.update()}}},scales:{r:{type:"radialLinear",angleLines:{display:!1},beginAtZero:!0,grid:{circular:!0},pointLabels:{display:!1},startAngle:0}}});var ri=class extends ye{};A(ri,"id","pie"),A(ri,"defaults",{cutout:0,rotation:0,circumference:360,radius:"100%"});var wn=class extends Ht{getLabelAndValue(t){let e=this._cachedMeta.vScale,i=this.getParsed(t);return{label:e.getLabels()[t],value:""+e.getLabelForValue(i[e.axis])}}parseObjectData(t,e,i,s){return Hr.bind(this)(t,e,i,s)}update(t){let e=this._cachedMeta,i=e.dataset,s=e.data||[],r=e.iScale.getLabels();if(i.points=s,t!=="resize"){let o=this.resolveDatasetElementOptions(t);this.options.showLine||(o.borderWidth=0);let a={_loop:!0,_fullLoop:r.length===s.length,options:o};this.updateElement(i,void 0,a,t)}this.updateElements(s,0,s.length,t)}updateElements(t,e,i,s){let r=this._cachedMeta.rScale,o=s==="reset";for(let a=e;a<e+i;a++){let l=t[a],c=this.resolveDataElementOptions(a,l.active?"active":s),d=r.getPointPositionForValue(a,this.getParsed(a).r),h=o?r.xCenter:d.x,u=o?r.yCenter:d.y,f={x:h,y:u,angle:d.angle,skip:isNaN(h)||isNaN(u),options:c};this.updateElement(l,a,f,s)}}};A(wn,"id","radar"),A(wn,"defaults",{datasetElementType:"line",dataElementType:"point",indexAxis:"r",showLine:!0,elements:{line:{fill:"start"}}}),A(wn,"overrides",{aspectRatio:1,scales:{r:{type:"radialLinear"}}});var En=class extends Ht{getLabelAndValue(t){let e=this._cachedMeta,i=this.chart.data.labels||[],{xScale:s,yScale:r}=e,o=this.getParsed(t),a=s.getLabelForValue(o.x),l=r.getLabelForValue(o.y);return{label:i[t]||"",value:"("+a+", "+l+")"}}update(t){let e=this._cachedMeta,{data:i=[]}=e,s=this.chart._animationsDisabled,{start:r,count:o}=Rr(e,i,s);if(this._drawStart=r,this._drawCount=o,Or(e)&&(r=0,o=i.length),this.options.showLine){this.datasetElementType||this.addElements();let{dataset:a,_dataset:l}=e;a._chart=this.chart,a._datasetIndex=this.index,a._decimated=!!l._decimated,a.points=i;let c=this.resolveDatasetElementOptions(t);c.segment=this.options.segment,this.updateElement(a,void 0,{animated:!s,options:c},t)}else this.datasetElementType&&(delete e.dataset,this.datasetElementType=!1);this.updateElements(i,r,o,t)}addElements(){let{showLine:t}=this.options;!this.datasetElementType&&t&&(this.datasetElementType=this.chart.registry.getElement("line")),super.addElements()}updateElements(t,e,i,s){let r=s==="reset",{iScale:o,vScale:a,_stacked:l,_dataset:c}=this._cachedMeta,d=this.resolveDataElementOptions(e,s),h=this.getSharedOptions(d),u=this.includeOptions(s,h),f=o.axis,p=a.axis,{spanGaps:m,segment:g}=this.options,_=We(m)?m:Number.POSITIVE_INFINITY,b=this.chart._animationsDisabled||r||s==="none",k=e>0&&this.getParsed(e-1);for(let y=e;y<e+i;++y){let x=t[y],T=this.getParsed(y),w=b?x:{},v=Y(T[p]),E=w[f]=o.getPixelForValue(T[f],y),C=w[p]=r||v?a.getBasePixel():a.getPixelForValue(l?this.applyStack(a,T,l):T[p],y);w.skip=isNaN(E)||isNaN(C)||v,w.stop=y>0&&Math.abs(T[f]-k[f])>_,g&&(w.parsed=T,w.raw=c.data[y]),u&&(w.options=h||this.resolveDataElementOptions(y,x.active?"active":s)),b||this.updateElement(x,y,w,s),k=T}this.updateSharedOptions(h,s,d)}getMaxOverflow(){let t=this._cachedMeta,e=t.data||[];if(!this.options.showLine){let a=0;for(let l=e.length-1;l>=0;--l)a=Math.max(a,e[l].size(this.resolveDataElementOptions(l))/2);return a>0&&a}let i=t.dataset,s=i.options&&i.options.borderWidth||0;if(!e.length)return s;let r=e[0].size(this.resolveDataElementOptions(0)),o=e[e.length-1].size(this.resolveDataElementOptions(e.length-1));return Math.max(s,r,o)/2}};A(En,"id","scatter"),A(En,"defaults",{datasetElementType:!1,dataElementType:"point",showLine:!1,fill:!1}),A(En,"overrides",{interaction:{mode:"point"},scales:{x:{type:"linear"},y:{type:"linear"}}});var lu=Object.freeze({__proto__:null,BarController:kn,BubbleController:Tn,DoughnutController:ye,LineController:Sn,PieController:ri,PolarAreaController:Xe,RadarController:wn,ScatterController:En});function Ye(){throw new Error("This method is not implemented: Check that a complete date adapter is provided.")}var lo=class n{constructor(t){A(this,"options");this.options=t||{}}static override(t){Object.assign(n.prototype,t)}init(){}formats(){return Ye()}parse(){return Ye()}format(){return Ye()}add(){return Ye()}diff(){return Ye()}startOf(){return Ye()}endOf(){return Ye()}},cu={_date:lo};function du(n,t,e,i){let{controller:s,data:r,_sorted:o}=n,a=s._cachedMeta.iScale,l=n.dataset&&n.dataset.options?n.dataset.options.spanGaps:null;if(a&&t===a.axis&&t!=="r"&&o&&r.length){let c=a._reversePixels?Za:se;if(i){if(s._sharedOptions){let d=r[0],h=typeof d.getRange=="function"&&d.getRange(t);if(h){let u=c(r,t,e-h),f=c(r,t,e+h);return{lo:u.lo,hi:f.hi}}}}else{let d=c(r,t,e);if(l){let{vScale:h}=s._cachedMeta,{_parsed:u}=n,f=u.slice(0,d.lo+1).reverse().findIndex(m=>!Y(m[h.axis]));d.lo-=Math.max(0,f);let p=u.slice(d.hi).findIndex(m=>!Y(m[h.axis]));d.hi+=Math.max(0,p)}return d}}return{lo:0,hi:r.length-1}}function gi(n,t,e,i,s){let r=n.getSortedVisibleDatasetMetas(),o=e[t];for(let a=0,l=r.length;a<l;++a){let{index:c,data:d}=r[a],{lo:h,hi:u}=du(r[a],t,o,s);for(let f=h;f<=u;++f){let p=d[f];p.skip||i(p,c,f)}}}function hu(n){let t=n.indexOf("x")!==-1,e=n.indexOf("y")!==-1;return function(i,s){let r=t?Math.abs(i.x-s.x):0,o=e?Math.abs(i.y-s.y):0;return Math.sqrt(Math.pow(r,2)+Math.pow(o,2))}}function Qr(n,t,e,i,s){let r=[];return!s&&!n.isPointInArea(t)||gi(n,e,t,function(a,l,c){!s&&!re(a,n.chartArea,0)||a.inRange(t.x,t.y,i)&&r.push({element:a,datasetIndex:l,index:c})},!0),r}function uu(n,t,e,i){let s=[];function r(o,a,l){let{startAngle:c,endAngle:d}=o.getProps(["startAngle","endAngle"],i),{angle:h}=Er(o,{x:t.x,y:t.y});_n(h,c,d)&&s.push({element:o,datasetIndex:a,index:l})}return gi(n,e,t,r),s}function fu(n,t,e,i,s,r){let o=[],a=hu(e),l=Number.POSITIVE_INFINITY;function c(d,h,u){let f=d.inRange(t.x,t.y,s);if(i&&!f)return;let p=d.getCenterPoint(s);if(!(!!r||n.isPointInArea(p))&&!f)return;let g=a(t,p);g<l?(o=[{element:d,datasetIndex:h,index:u}],l=g):g===l&&o.push({element:d,datasetIndex:h,index:u})}return gi(n,e,t,c),o}function to(n,t,e,i,s,r){return!r&&!n.isPointInArea(t)?[]:e==="r"&&!i?uu(n,t,e,s):fu(n,t,e,i,s,r)}function Al(n,t,e,i,s){let r=[],o=e==="x"?"inXRange":"inYRange",a=!1;return gi(n,e,t,(l,c,d)=>{l[o]&&l[o](t[e],s)&&(r.push({element:l,datasetIndex:c,index:d}),a=a||l.inRange(t.x,t.y,s))}),i&&!a?[]:r}var pu={evaluateInteractionItems:gi,modes:{index(n,t,e,i){let s=Re(t,n),r=e.axis||"x",o=e.includeInvisible||!1,a=e.intersect?Qr(n,s,r,i,o):to(n,s,r,!1,i,o),l=[];return a.length?(n.getSortedVisibleDatasetMetas().forEach(c=>{let d=a[0].index,h=c.data[d];h&&!h.skip&&l.push({element:h,datasetIndex:c.index,index:d})}),l):[]},dataset(n,t,e,i){let s=Re(t,n),r=e.axis||"xy",o=e.includeInvisible||!1,a=e.intersect?Qr(n,s,r,i,o):to(n,s,r,!1,i,o);if(a.length>0){let l=a[0].datasetIndex,c=n.getDatasetMeta(l).data;a=[];for(let d=0;d<c.length;++d)a.push({element:c[d],datasetIndex:l,index:d})}return a},point(n,t,e,i){let s=Re(t,n),r=e.axis||"xy",o=e.includeInvisible||!1;return Qr(n,s,r,i,o)},nearest(n,t,e,i){let s=Re(t,n),r=e.axis||"xy",o=e.includeInvisible||!1;return to(n,s,r,e.intersect,i,o)},x(n,t,e,i){let s=Re(t,n);return Al(n,s,"x",e.intersect,i)},y(n,t,e,i){let s=Re(t,n);return Al(n,s,"y",e.intersect,i)}}},xc=["left","top","right","bottom"];function ei(n,t){return n.filter(e=>e.pos===t)}function Cl(n,t){return n.filter(e=>xc.indexOf(e.pos)===-1&&e.box.axis===t)}function ni(n,t){return n.sort((e,i)=>{let s=t?i:e,r=t?e:i;return s.weight===r.weight?s.index-r.index:s.weight-r.weight})}function mu(n){let t=[],e,i,s,r,o,a;for(e=0,i=(n||[]).length;e<i;++e)s=n[e],{position:r,options:{stack:o,stackWeight:a=1}}=s,t.push({index:e,box:s,pos:r,horizontal:s.isHorizontal(),weight:s.weight,stack:o&&r+o,stackWeight:a});return t}function gu(n){let t={};for(let e of n){let{stack:i,pos:s,stackWeight:r}=e;if(!i||!xc.includes(s))continue;let o=t[i]||(t[i]={count:0,placed:0,weight:0,size:0});o.count++,o.weight+=r}return t}function _u(n,t){let e=gu(n),{vBoxMaxWidth:i,hBoxMaxHeight:s}=t,r,o,a;for(r=0,o=n.length;r<o;++r){a=n[r];let{fullSize:l}=a.box,c=e[a.stack],d=c&&a.stackWeight/c.weight;a.horizontal?(a.width=d?d*i:l&&t.availableWidth,a.height=s):(a.width=i,a.height=d?d*s:l&&t.availableHeight)}return e}function bu(n){let t=mu(n),e=ni(t.filter(c=>c.box.fullSize),!0),i=ni(ei(t,"left"),!0),s=ni(ei(t,"right")),r=ni(ei(t,"top"),!0),o=ni(ei(t,"bottom")),a=Cl(t,"x"),l=Cl(t,"y");return{fullSize:e,leftAndTop:i.concat(r),rightAndBottom:s.concat(l).concat(o).concat(a),chartArea:ei(t,"chartArea"),vertical:i.concat(s).concat(l),horizontal:r.concat(o).concat(a)}}function Rl(n,t,e,i){return Math.max(n[e],t[e])+Math.max(n[i],t[i])}function kc(n,t){n.top=Math.max(n.top,t.top),n.left=Math.max(n.left,t.left),n.bottom=Math.max(n.bottom,t.bottom),n.right=Math.max(n.right,t.right)}function yu(n,t,e,i){let{pos:s,box:r}=e,o=n.maxPadding;if(!j(s)){e.size&&(n[s]-=e.size);let h=i[e.stack]||{size:0,count:1};h.size=Math.max(h.size,e.horizontal?r.height:r.width),e.size=h.size/h.count,n[s]+=e.size}r.getPadding&&kc(o,r.getPadding());let a=Math.max(0,t.outerWidth-Rl(o,n,"left","right")),l=Math.max(0,t.outerHeight-Rl(o,n,"top","bottom")),c=a!==n.w,d=l!==n.h;return n.w=a,n.h=l,e.horizontal?{same:c,other:d}:{same:d,other:c}}function vu(n){let t=n.maxPadding;function e(i){let s=Math.max(t[i]-n[i],0);return n[i]+=s,s}n.y+=e("top"),n.x+=e("left"),e("right"),e("bottom")}function xu(n,t){let e=t.maxPadding;function i(s){let r={left:0,top:0,right:0,bottom:0};return s.forEach(o=>{r[o]=Math.max(t[o],e[o])}),r}return i(n?["left","right"]:["top","bottom"])}function oi(n,t,e,i){let s=[],r,o,a,l,c,d;for(r=0,o=n.length,c=0;r<o;++r){a=n[r],l=a.box,l.update(a.width||t.w,a.height||t.h,xu(a.horizontal,t));let{same:h,other:u}=yu(t,e,a,i);c|=h&&s.length,d=d||u,l.fullSize||s.push(a)}return c&&oi(s,t,e,i)||d}function ss(n,t,e,i,s){n.top=e,n.left=t,n.right=t+i,n.bottom=e+s,n.width=i,n.height=s}function Ol(n,t,e,i){let s=e.padding,{x:r,y:o}=t;for(let a of n){let l=a.box,c=i[a.stack]||{count:1,placed:0,weight:1},d=a.stackWeight/c.weight||1;if(a.horizontal){let h=t.w*d,u=c.size||l.height;mn(c.start)&&(o=c.start),l.fullSize?ss(l,s.left,o,e.outerWidth-s.right-s.left,u):ss(l,t.left+c.placed,o,h,u),c.start=o,c.placed+=h,o=l.bottom}else{let h=t.h*d,u=c.size||l.width;mn(c.start)&&(r=c.start),l.fullSize?ss(l,r,s.top,u,e.outerHeight-s.bottom-s.top):ss(l,r,t.top+c.placed,u,h),c.start=r,c.placed+=h,r=l.right}}t.x=r,t.y=o}var Ct={addBox(n,t){n.boxes||(n.boxes=[]),t.fullSize=t.fullSize||!1,t.position=t.position||"top",t.weight=t.weight||0,t._layers=t._layers||function(){return[{z:0,draw(e){t.draw(e)}}]},n.boxes.push(t)},removeBox(n,t){let e=n.boxes?n.boxes.indexOf(t):-1;e!==-1&&n.boxes.splice(e,1)},configure(n,t,e){t.fullSize=e.fullSize,t.position=e.position,t.weight=e.weight},update(n,t,e,i){if(!n)return;let s=Dt(n.options.layout.padding),r=Math.max(t-s.width,0),o=Math.max(e-s.height,0),a=bu(n.boxes),l=a.vertical,c=a.horizontal;Z(n.boxes,m=>{typeof m.beforeLayout=="function"&&m.beforeLayout()});let d=l.reduce((m,g)=>g.box.options&&g.box.options.display===!1?m:m+1,0)||1,h=Object.freeze({outerWidth:t,outerHeight:e,padding:s,availableWidth:r,availableHeight:o,vBoxMaxWidth:r/2/d,hBoxMaxHeight:o/2}),u=Object.assign({},s);kc(u,Dt(i));let f=Object.assign({maxPadding:u,w:r,h:o,x:s.left,y:s.top},s),p=_u(l.concat(c),h);oi(a.fullSize,f,h,p),oi(l,f,h,p),oi(c,f,h,p)&&oi(l,f,h,p),vu(f),Ol(a.leftAndTop,f,h,p),f.x+=f.w,f.y+=f.h,Ol(a.rightAndBottom,f,h,p),n.chartArea={left:f.left,top:f.top,right:f.left+f.w,bottom:f.top+f.h,height:f.h,width:f.w},Z(a.chartArea,m=>{let g=m.box;Object.assign(g,n.chartArea),g.update(f.w,f.h,{left:0,top:0,right:0,bottom:0})})}},fs=class{acquireContext(t,e){}releaseContext(t){return!1}addEventListener(t,e,i){}removeEventListener(t,e,i){}getDevicePixelRatio(){return 1}getMaximumSize(t,e,i,s){return e=Math.max(0,e||t.width),i=i||t.height,{width:e,height:Math.max(0,s?Math.floor(e/s):i)}}isAttached(t){return!0}updateConfig(t){}},co=class extends fs{acquireContext(t){return t&&t.getContext&&t.getContext("2d")||null}updateConfig(t){t.options.animation=!1}},ds="$chartjs",ku={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",pointerenter:"mouseenter",pointerdown:"mousedown",pointermove:"mousemove",pointerup:"mouseup",pointerleave:"mouseout",pointerout:"mouseout"},Pl=n=>n===null||n==="";function Tu(n,t){let e=n.style,i=n.getAttribute("height"),s=n.getAttribute("width");if(n[ds]={initial:{height:i,width:s,style:{display:e.display,height:e.height,width:e.width}}},e.display=e.display||"block",e.boxSizing=e.boxSizing||"border-box",Pl(s)){let r=Ur(n,"width");r!==void 0&&(n.width=r)}if(Pl(i))if(n.style.height==="")n.height=n.width/(t||2);else{let r=Ur(n,"height");r!==void 0&&(n.height=r)}return n}var Tc=ml?{passive:!0}:!1;function Su(n,t,e){n&&n.addEventListener(t,e,Tc)}function wu(n,t,e){n&&n.canvas&&n.canvas.removeEventListener(t,e,Tc)}function Eu(n,t){let e=ku[n.type]||n.type,{x:i,y:s}=Re(n,t);return{type:e,chart:t,native:n,x:i!==void 0?i:null,y:s!==void 0?s:null}}function ps(n,t){for(let e of n)if(e===t||e.contains(t))return!0}function Mu(n,t,e){let i=n.canvas,s=new MutationObserver(r=>{let o=!1;for(let a of r)o=o||ps(a.addedNodes,i),o=o&&!ps(a.removedNodes,i);o&&e()});return s.observe(document,{childList:!0,subtree:!0}),s}function Du(n,t,e){let i=n.canvas,s=new MutationObserver(r=>{let o=!1;for(let a of r)o=o||ps(a.removedNodes,i),o=o&&!ps(a.addedNodes,i);o&&e()});return s.observe(document,{childList:!0,subtree:!0}),s}var fi=new Map,Ll=0;function Sc(){let n=window.devicePixelRatio;n!==Ll&&(Ll=n,fi.forEach((t,e)=>{e.currentDevicePixelRatio!==n&&t()}))}function Au(n,t){fi.size||window.addEventListener("resize",Sc),fi.set(n,t)}function Cu(n){fi.delete(n),fi.size||window.removeEventListener("resize",Sc)}function Ru(n,t,e){let i=n.canvas,s=i&&ns(i);if(!s)return;let r=Cr((a,l)=>{let c=s.clientWidth;e(a,l),c<s.clientWidth&&e()},window),o=new ResizeObserver(a=>{let l=a[0],c=l.contentRect.width,d=l.contentRect.height;c===0&&d===0||r(c,d)});return o.observe(s),Au(n,r),o}function eo(n,t,e){e&&e.disconnect(),t==="resize"&&Cu(n)}function Ou(n,t,e){let i=n.canvas,s=Cr(r=>{n.ctx!==null&&e(Eu(r,n))},n);return Su(i,t,s),s}var ho=class extends fs{acquireContext(t,e){let i=t&&t.getContext&&t.getContext("2d");return i&&i.canvas===t?(Tu(t,e),i):null}releaseContext(t){let e=t.canvas;if(!e[ds])return!1;let i=e[ds].initial;["height","width"].forEach(r=>{let o=i[r];Y(o)?e.removeAttribute(r):e.setAttribute(r,o)});let s=i.style||{};return Object.keys(s).forEach(r=>{e.style[r]=s[r]}),e.width=e.width,delete e[ds],!0}addEventListener(t,e,i){this.removeEventListener(t,e);let s=t.$proxies||(t.$proxies={}),o={attach:Mu,detach:Du,resize:Ru}[e]||Ou;s[e]=o(t,e,i)}removeEventListener(t,e){let i=t.$proxies||(t.$proxies={}),s=i[e];if(!s)return;({attach:eo,detach:eo,resize:eo}[e]||wu)(t,e,s),i[e]=void 0}getDevicePixelRatio(){return window.devicePixelRatio}getMaximumSize(t,e,i,s){return pl(t,e,i,s)}isAttached(t){let e=t&&ns(t);return!!(e&&e.isConnected)}};function Pu(n){return!es()||typeof OffscreenCanvas<"u"&&n instanceof OffscreenCanvas?co:ho}var Wt=class{constructor(){A(this,"x");A(this,"y");A(this,"active",!1);A(this,"options");A(this,"$animations")}tooltipPosition(t){let{x:e,y:i}=this.getProps(["x","y"],t);return{x:e,y:i}}hasValue(){return We(this.x)&&We(this.y)}getProps(t,e){let i=this.$animations;if(!e||!i)return this;let s={};return t.forEach(r=>{s[r]=i[r]&&i[r].active()?i[r]._to:this[r]}),s}};A(Wt,"defaults",{}),A(Wt,"defaultRoutes");function Lu(n,t){let e=n.options.ticks,i=Fu(n),s=Math.min(e.maxTicksLimit||i,i),r=e.major.enabled?Nu(t):[],o=r.length,a=r[0],l=r[o-1],c=[];if(o>s)return Bu(t,c,r,o/s),c;let d=Iu(r,t,s);if(o>0){let h,u,f=o>1?Math.round((l-a)/(o-1)):null;for(rs(t,c,d,Y(f)?0:a-f,a),h=0,u=o-1;h<u;h++)rs(t,c,d,r[h],r[h+1]);return rs(t,c,d,l,Y(f)?t.length:l+f),c}return rs(t,c,d),c}function Fu(n){let t=n.options.offset,e=n._tickSize(),i=n._length/e+(t?0:1),s=n._maxLength/e;return Math.floor(Math.min(i,s))}function Iu(n,t,e){let i=Vu(n),s=t.length/e;if(!i)return Math.max(s,1);let r=Ka(i);for(let o=0,a=r.length-1;o<a;o++){let l=r[o];if(l>s)return l}return Math.max(s,1)}function Nu(n){let t=[],e,i;for(e=0,i=n.length;e<i;e++)n[e].major&&t.push(e);return t}function Bu(n,t,e,i){let s=0,r=e[0],o;for(i=Math.ceil(i),o=0;o<n.length;o++)o===r&&(t.push(n[o]),s++,r=e[s*i])}function rs(n,t,e,i,s){let r=z(i,0),o=Math.min(z(s,n.length),n.length),a=0,l,c,d;for(e=Math.ceil(e),s&&(l=s-i,e=l/Math.floor(l/e)),d=r;d<0;)a++,d=Math.round(r+a*e);for(c=Math.max(r,0);c<o;c++)c===d&&(t.push(n[c]),a++,d=Math.round(r+a*e))}function Vu(n){let t=n.length,e,i;if(t<2)return!1;for(i=n[0],e=1;e<t;++e)if(n[e]-n[e-1]!==i)return!1;return i}var zu=n=>n==="left"?"right":n==="right"?"left":n,Fl=(n,t,e)=>t==="top"||t==="left"?n[t]+e:n[t]-e,Il=(n,t)=>Math.min(t||n,n);function Nl(n,t){let e=[],i=n.length/t,s=n.length,r=0;for(;r<s;r+=i)e.push(n[Math.floor(r)]);return e}function Hu(n,t,e){let i=n.ticks.length,s=Math.min(t,i-1),r=n._startPixel,o=n._endPixel,a=1e-6,l=n.getPixelForTick(s),c;if(!(e&&(i===1?c=Math.max(l-r,o-l):t===0?c=(n.getPixelForTick(1)-l)/2:c=(l-n.getPixelForTick(s-1))/2,l+=s<t?c:-c,l<r-a||l>o+a)))return l}function Wu(n,t){Z(n,e=>{let i=e.gc,s=i.length/2,r;if(s>t){for(r=0;r<s;++r)delete e.data[i[r]];i.splice(0,s)}})}function ii(n){return n.drawTicks?n.tickLength:0}function Bl(n,t){if(!n.display)return 0;let e=yt(n.font,t),i=Dt(n.padding);return(st(n.text)?n.text.length:1)*e.lineHeight+i.height}function Uu(n,t){return ge(n,{scale:t,type:"scale"})}function Yu(n,t,e){return ge(n,{tick:e,index:t,type:"tick"})}function $u(n,t,e){let i=qi(n);return(e&&t!=="right"||!e&&t==="right")&&(i=zu(i)),i}function ju(n,t,e,i){let{top:s,left:r,bottom:o,right:a,chart:l}=n,{chartArea:c,scales:d}=l,h=0,u,f,p,m=o-s,g=a-r;if(n.isHorizontal()){if(f=Mt(i,r,a),j(e)){let _=Object.keys(e)[0],b=e[_];p=d[_].getPixelForValue(b)+m-t}else e==="center"?p=(c.bottom+c.top)/2+m-t:p=Fl(n,e,t);u=a-r}else{if(j(e)){let _=Object.keys(e)[0],b=e[_];f=d[_].getPixelForValue(b)-g+t}else e==="center"?f=(c.left+c.right)/2-g+t:f=Fl(n,e,t);p=Mt(i,o,s),h=e==="left"?-mt:mt}return{titleX:f,titleY:p,maxWidth:u,rotation:h}}var qe=class n extends Wt{constructor(t){super(),this.id=t.id,this.type=t.type,this.options=void 0,this.ctx=t.ctx,this.chart=t.chart,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this._margins={left:0,right:0,top:0,bottom:0},this.maxWidth=void 0,this.maxHeight=void 0,this.paddingTop=void 0,this.paddingBottom=void 0,this.paddingLeft=void 0,this.paddingRight=void 0,this.axis=void 0,this.labelRotation=void 0,this.min=void 0,this.max=void 0,this._range=void 0,this.ticks=[],this._gridLineItems=null,this._labelItems=null,this._labelSizes=null,this._length=0,this._maxLength=0,this._longestTextCache={},this._startPixel=void 0,this._endPixel=void 0,this._reversePixels=!1,this._userMax=void 0,this._userMin=void 0,this._suggestedMax=void 0,this._suggestedMin=void 0,this._ticksLength=0,this._borderValue=0,this._cache={},this._dataLimitsCached=!1,this.$context=void 0}init(t){this.options=t.setContext(this.getContext()),this.axis=t.axis,this._userMin=this.parse(t.min),this._userMax=this.parse(t.max),this._suggestedMin=this.parse(t.suggestedMin),this._suggestedMax=this.parse(t.suggestedMax)}parse(t,e){return t}getUserBounds(){let{_userMin:t,_userMax:e,_suggestedMin:i,_suggestedMax:s}=this;return t=Lt(t,Number.POSITIVE_INFINITY),e=Lt(e,Number.NEGATIVE_INFINITY),i=Lt(i,Number.POSITIVE_INFINITY),s=Lt(s,Number.NEGATIVE_INFINITY),{min:Lt(t,i),max:Lt(e,s),minDefined:pt(t),maxDefined:pt(e)}}getMinMax(t){let{min:e,max:i,minDefined:s,maxDefined:r}=this.getUserBounds(),o;if(s&&r)return{min:e,max:i};let a=this.getMatchingVisibleMetas();for(let l=0,c=a.length;l<c;++l)o=a[l].controller.getMinMax(this,t),s||(e=Math.min(e,o.min)),r||(i=Math.max(i,o.max));return e=r&&e>i?i:e,i=s&&e>i?e:i,{min:Lt(e,Lt(i,e)),max:Lt(i,Lt(e,i))}}getPadding(){return{left:this.paddingLeft||0,top:this.paddingTop||0,right:this.paddingRight||0,bottom:this.paddingBottom||0}}getTicks(){return this.ticks}getLabels(){let t=this.chart.data;return this.options.labels||(this.isHorizontal()?t.xLabels:t.yLabels)||t.labels||[]}getLabelItems(t=this.chart.chartArea){return this._labelItems||(this._labelItems=this._computeLabelItems(t))}beforeLayout(){this._cache={},this._dataLimitsCached=!1}beforeUpdate(){et(this.options.beforeUpdate,[this])}update(t,e,i){let{beginAtZero:s,grace:r,ticks:o}=this.options,a=o.sampleSize;this.beforeUpdate(),this.maxWidth=t,this.maxHeight=e,this._margins=i=Object.assign({left:0,right:0,top:0,bottom:0},i),this.ticks=null,this._labelSizes=null,this._gridLineItems=null,this._labelItems=null,this.beforeSetDimensions(),this.setDimensions(),this.afterSetDimensions(),this._maxLength=this.isHorizontal()?this.width+i.left+i.right:this.height+i.top+i.bottom,this._dataLimitsCached||(this.beforeDataLimits(),this.determineDataLimits(),this.afterDataLimits(),this._range=ll(this,r,s),this._dataLimitsCached=!0),this.beforeBuildTicks(),this.ticks=this.buildTicks()||[],this.afterBuildTicks();let l=a<this.ticks.length;this._convertTicksToLabels(l?Nl(this.ticks,a):this.ticks),this.configure(),this.beforeCalculateLabelRotation(),this.calculateLabelRotation(),this.afterCalculateLabelRotation(),o.display&&(o.autoSkip||o.source==="auto")&&(this.ticks=Lu(this,this.ticks),this._labelSizes=null,this.afterAutoSkip()),l&&this._convertTicksToLabels(this.ticks),this.beforeFit(),this.fit(),this.afterFit(),this.afterUpdate()}configure(){let t=this.options.reverse,e,i;this.isHorizontal()?(e=this.left,i=this.right):(e=this.top,i=this.bottom,t=!t),this._startPixel=e,this._endPixel=i,this._reversePixels=t,this._length=i-e,this._alignToPixels=this.options.alignToPixels}afterUpdate(){et(this.options.afterUpdate,[this])}beforeSetDimensions(){et(this.options.beforeSetDimensions,[this])}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=0,this.right=this.width):(this.height=this.maxHeight,this.top=0,this.bottom=this.height),this.paddingLeft=0,this.paddingTop=0,this.paddingRight=0,this.paddingBottom=0}afterSetDimensions(){et(this.options.afterSetDimensions,[this])}_callHooks(t){this.chart.notifyPlugins(t,this.getContext()),et(this.options[t],[this])}beforeDataLimits(){this._callHooks("beforeDataLimits")}determineDataLimits(){}afterDataLimits(){this._callHooks("afterDataLimits")}beforeBuildTicks(){this._callHooks("beforeBuildTicks")}buildTicks(){return[]}afterBuildTicks(){this._callHooks("afterBuildTicks")}beforeTickToLabelConversion(){et(this.options.beforeTickToLabelConversion,[this])}generateTickLabels(t){let e=this.options.ticks,i,s,r;for(i=0,s=t.length;i<s;i++)r=t[i],r.label=et(e.callback,[r.value,i,t],this)}afterTickToLabelConversion(){et(this.options.afterTickToLabelConversion,[this])}beforeCalculateLabelRotation(){et(this.options.beforeCalculateLabelRotation,[this])}calculateLabelRotation(){let t=this.options,e=t.ticks,i=Il(this.ticks.length,t.ticks.maxTicksLimit),s=e.minRotation||0,r=e.maxRotation,o=s,a,l,c;if(!this._isVisible()||!e.display||s>=r||i<=1||!this.isHorizontal()){this.labelRotation=s;return}let d=this._getLabelSizes(),h=d.widest.width,u=d.highest.height,f=Tt(this.chart.width-h,0,this.maxWidth);a=t.offset?this.maxWidth/i:f/(i-1),h+6>a&&(a=f/(i-(t.offset?.5:1)),l=this.maxHeight-ii(t.grid)-e.padding-Bl(t.title,this.chart.options.font),c=Math.sqrt(h*h+u*u),o=Xi(Math.min(Math.asin(Tt((d.highest.height+6)/a,-1,1)),Math.asin(Tt(l/c,-1,1))-Math.asin(Tt(u/c,-1,1)))),o=Math.max(s,Math.min(r,o))),this.labelRotation=o}afterCalculateLabelRotation(){et(this.options.afterCalculateLabelRotation,[this])}afterAutoSkip(){}beforeFit(){et(this.options.beforeFit,[this])}fit(){let t={width:0,height:0},{chart:e,options:{ticks:i,title:s,grid:r}}=this,o=this._isVisible(),a=this.isHorizontal();if(o){let l=Bl(s,e.options.font);if(a?(t.width=this.maxWidth,t.height=ii(r)+l):(t.height=this.maxHeight,t.width=ii(r)+l),i.display&&this.ticks.length){let{first:c,last:d,widest:h,highest:u}=this._getLabelSizes(),f=i.padding*2,p=Kt(this.labelRotation),m=Math.cos(p),g=Math.sin(p);if(a){let _=i.mirror?0:g*h.width+m*u.height;t.height=Math.min(this.maxHeight,t.height+_+f)}else{let _=i.mirror?0:m*h.width+g*u.height;t.width=Math.min(this.maxWidth,t.width+_+f)}this._calculatePadding(c,d,g,m)}}this._handleMargins(),a?(this.width=this._length=e.width-this._margins.left-this._margins.right,this.height=t.height):(this.width=t.width,this.height=this._length=e.height-this._margins.top-this._margins.bottom)}_calculatePadding(t,e,i,s){let{ticks:{align:r,padding:o},position:a}=this.options,l=this.labelRotation!==0,c=a!=="top"&&this.axis==="x";if(this.isHorizontal()){let d=this.getPixelForTick(0)-this.left,h=this.right-this.getPixelForTick(this.ticks.length-1),u=0,f=0;l?c?(u=s*t.width,f=i*e.height):(u=i*t.height,f=s*e.width):r==="start"?f=e.width:r==="end"?u=t.width:r!=="inner"&&(u=t.width/2,f=e.width/2),this.paddingLeft=Math.max((u-d+o)*this.width/(this.width-d),0),this.paddingRight=Math.max((f-h+o)*this.width/(this.width-h),0)}else{let d=e.height/2,h=t.height/2;r==="start"?(d=0,h=t.height):r==="end"&&(d=e.height,h=0),this.paddingTop=d+o,this.paddingBottom=h+o}}_handleMargins(){this._margins&&(this._margins.left=Math.max(this.paddingLeft,this._margins.left),this._margins.top=Math.max(this.paddingTop,this._margins.top),this._margins.right=Math.max(this.paddingRight,this._margins.right),this._margins.bottom=Math.max(this.paddingBottom,this._margins.bottom))}afterFit(){et(this.options.afterFit,[this])}isHorizontal(){let{axis:t,position:e}=this.options;return e==="top"||e==="bottom"||t==="x"}isFullSize(){return this.options.fullSize}_convertTicksToLabels(t){this.beforeTickToLabelConversion(),this.generateTickLabels(t);let e,i;for(e=0,i=t.length;e<i;e++)Y(t[e].label)&&(t.splice(e,1),i--,e--);this.afterTickToLabelConversion()}_getLabelSizes(){let t=this._labelSizes;if(!t){let e=this.options.ticks.sampleSize,i=this.ticks;e<i.length&&(i=Nl(i,e)),this._labelSizes=t=this._computeLabelSizes(i,i.length,this.options.ticks.maxTicksLimit)}return t}_computeLabelSizes(t,e,i){let{ctx:s,_longestTextCache:r}=this,o=[],a=[],l=Math.floor(e/Il(e,i)),c=0,d=0,h,u,f,p,m,g,_,b,k,y,x;for(h=0;h<e;h+=l){if(p=t[h].label,m=this._resolveTickFontOptions(h),s.font=g=m.string,_=r[g]=r[g]||{data:{},gc:[]},b=m.lineHeight,k=y=0,!Y(p)&&!st(p))k=Kn(s,_.data,_.gc,k,p),y=b;else if(st(p))for(u=0,f=p.length;u<f;++u)x=p[u],!Y(x)&&!st(x)&&(k=Kn(s,_.data,_.gc,k,x),y+=b);o.push(k),a.push(y),c=Math.max(k,c),d=Math.max(y,d)}Wu(r,e);let T=o.indexOf(c),w=a.indexOf(d),v=E=>({width:o[E]||0,height:a[E]||0});return{first:v(0),last:v(e-1),widest:v(T),highest:v(w),widths:o,heights:a}}getLabelForValue(t){return t}getPixelForValue(t,e){return NaN}getValueForPixel(t){}getPixelForTick(t){let e=this.ticks;return t<0||t>e.length-1?null:this.getPixelForValue(e[t].value)}getPixelForDecimal(t){this._reversePixels&&(t=1-t);let e=this._startPixel+t*this._length;return Ja(this._alignToPixels?De(this.chart,e,0):e)}getDecimalForPixel(t){let e=(t-this._startPixel)/this._length;return this._reversePixels?1-e:e}getBasePixel(){return this.getPixelForValue(this.getBaseValue())}getBaseValue(){let{min:t,max:e}=this;return t<0&&e<0?e:t>0&&e>0?t:0}getContext(t){let e=this.ticks||[];if(t>=0&&t<e.length){let i=e[t];return i.$context||(i.$context=Yu(this.getContext(),t,i))}return this.$context||(this.$context=Uu(this.chart.getContext(),this))}_tickSize(){let t=this.options.ticks,e=Kt(this.labelRotation),i=Math.abs(Math.cos(e)),s=Math.abs(Math.sin(e)),r=this._getLabelSizes(),o=t.autoSkipPadding||0,a=r?r.widest.width+o:0,l=r?r.highest.height+o:0;return this.isHorizontal()?l*i>a*s?a/i:l/s:l*s<a*i?l/i:a/s}_isVisible(){let t=this.options.display;return t!=="auto"?!!t:this.getMatchingVisibleMetas().length>0}_computeGridLineItems(t){let e=this.axis,i=this.chart,s=this.options,{grid:r,position:o,border:a}=s,l=r.offset,c=this.isHorizontal(),h=this.ticks.length+(l?1:0),u=ii(r),f=[],p=a.setContext(this.getContext()),m=p.display?p.width:0,g=m/2,_=function(G){return De(i,G,m)},b,k,y,x,T,w,v,E,C,R,F,X;if(o==="top")b=_(this.bottom),w=this.bottom-u,E=b-g,R=_(t.top)+g,X=t.bottom;else if(o==="bottom")b=_(this.top),R=t.top,X=_(t.bottom)-g,w=b+g,E=this.top+u;else if(o==="left")b=_(this.right),T=this.right-u,v=b-g,C=_(t.left)+g,F=t.right;else if(o==="right")b=_(this.left),C=t.left,F=_(t.right)-g,T=b+g,v=this.left+u;else if(e==="x"){if(o==="center")b=_((t.top+t.bottom)/2+.5);else if(j(o)){let G=Object.keys(o)[0],M=o[G];b=_(this.chart.scales[G].getPixelForValue(M))}R=t.top,X=t.bottom,w=b+g,E=w+u}else if(e==="y"){if(o==="center")b=_((t.left+t.right)/2);else if(j(o)){let G=Object.keys(o)[0],M=o[G];b=_(this.chart.scales[G].getPixelForValue(M))}T=b-g,v=T-u,C=t.left,F=t.right}let $=z(s.ticks.maxTicksLimit,h),I=Math.max(1,Math.ceil(h/$));for(k=0;k<h;k+=I){let G=this.getContext(k),M=r.setContext(G),U=a.setContext(G),W=M.lineWidth,ot=M.color,St=U.dash||[],Q=U.dashOffset,at=M.tickWidth,nt=M.tickColor,wt=M.tickBorderDash||[],At=M.tickBorderDashOffset;y=Hu(this,k,l),y!==void 0&&(x=De(i,y,W),c?T=v=C=F=x:w=E=R=X=x,f.push({tx1:T,ty1:w,tx2:v,ty2:E,x1:C,y1:R,x2:F,y2:X,width:W,color:ot,borderDash:St,borderDashOffset:Q,tickWidth:at,tickColor:nt,tickBorderDash:wt,tickBorderDashOffset:At}))}return this._ticksLength=h,this._borderValue=b,f}_computeLabelItems(t){let e=this.axis,i=this.options,{position:s,ticks:r}=i,o=this.isHorizontal(),a=this.ticks,{align:l,crossAlign:c,padding:d,mirror:h}=r,u=ii(i.grid),f=u+d,p=h?-d:f,m=-Kt(this.labelRotation),g=[],_,b,k,y,x,T,w,v,E,C,R,F,X="middle";if(s==="top")T=this.bottom-p,w=this._getXAxisLabelAlignment();else if(s==="bottom")T=this.top+p,w=this._getXAxisLabelAlignment();else if(s==="left"){let I=this._getYAxisLabelAlignment(u);w=I.textAlign,x=I.x}else if(s==="right"){let I=this._getYAxisLabelAlignment(u);w=I.textAlign,x=I.x}else if(e==="x"){if(s==="center")T=(t.top+t.bottom)/2+f;else if(j(s)){let I=Object.keys(s)[0],G=s[I];T=this.chart.scales[I].getPixelForValue(G)+f}w=this._getXAxisLabelAlignment()}else if(e==="y"){if(s==="center")x=(t.left+t.right)/2-f;else if(j(s)){let I=Object.keys(s)[0],G=s[I];x=this.chart.scales[I].getPixelForValue(G)}w=this._getYAxisLabelAlignment(u).textAlign}e==="y"&&(l==="start"?X="top":l==="end"&&(X="bottom"));let $=this._getLabelSizes();for(_=0,b=a.length;_<b;++_){k=a[_],y=k.label;let I=r.setContext(this.getContext(_));v=this.getPixelForTick(_)+r.labelOffset,E=this._resolveTickFontOptions(_),C=E.lineHeight,R=st(y)?y.length:1;let G=R/2,M=I.color,U=I.textStrokeColor,W=I.textStrokeWidth,ot=w;o?(x=v,w==="inner"&&(_===b-1?ot=this.options.reverse?"left":"right":_===0?ot=this.options.reverse?"right":"left":ot="center"),s==="top"?c==="near"||m!==0?F=-R*C+C/2:c==="center"?F=-$.highest.height/2-G*C+C:F=-$.highest.height+C/2:c==="near"||m!==0?F=C/2:c==="center"?F=$.highest.height/2-G*C:F=$.highest.height-R*C,h&&(F*=-1),m!==0&&!I.showLabelBackdrop&&(x+=C/2*Math.sin(m))):(T=v,F=(1-R)*C/2);let St;if(I.showLabelBackdrop){let Q=Dt(I.backdropPadding),at=$.heights[_],nt=$.widths[_],wt=F-Q.top,At=0-Q.left;switch(X){case"middle":wt-=at/2;break;case"bottom":wt-=at;break}switch(w){case"center":At-=nt/2;break;case"right":At-=nt;break;case"inner":_===b-1?At-=nt:_>0&&(At-=nt/2);break}St={left:At,top:wt,width:nt+Q.width,height:at+Q.height,color:I.backdropColor}}g.push({label:y,font:E,textOffset:F,options:{rotation:m,color:M,strokeColor:U,strokeWidth:W,textAlign:ot,textBaseline:X,translation:[x,T],backdrop:St}})}return g}_getXAxisLabelAlignment(){let{position:t,ticks:e}=this.options;if(-Kt(this.labelRotation))return t==="top"?"left":"right";let s="center";return e.align==="start"?s="left":e.align==="end"?s="right":e.align==="inner"&&(s="inner"),s}_getYAxisLabelAlignment(t){let{position:e,ticks:{crossAlign:i,mirror:s,padding:r}}=this.options,o=this._getLabelSizes(),a=t+r,l=o.widest.width,c,d;return e==="left"?s?(d=this.right+r,i==="near"?c="left":i==="center"?(c="center",d+=l/2):(c="right",d+=l)):(d=this.right-a,i==="near"?c="right":i==="center"?(c="center",d-=l/2):(c="left",d=this.left)):e==="right"?s?(d=this.left+r,i==="near"?c="right":i==="center"?(c="center",d-=l/2):(c="left",d-=l)):(d=this.left+a,i==="near"?c="left":i==="center"?(c="center",d+=l/2):(c="right",d=this.right)):c="right",{textAlign:c,x:d}}_computeLabelArea(){if(this.options.ticks.mirror)return;let t=this.chart,e=this.options.position;if(e==="left"||e==="right")return{top:0,left:this.left,bottom:t.height,right:this.right};if(e==="top"||e==="bottom")return{top:this.top,left:0,bottom:this.bottom,right:t.width}}drawBackground(){let{ctx:t,options:{backgroundColor:e},left:i,top:s,width:r,height:o}=this;e&&(t.save(),t.fillStyle=e,t.fillRect(i,s,r,o),t.restore())}getLineWidthForValue(t){let e=this.options.grid;if(!this._isVisible()||!e.display)return 0;let s=this.ticks.findIndex(r=>r.value===t);return s>=0?e.setContext(this.getContext(s)).lineWidth:0}drawGrid(t){let e=this.options.grid,i=this.ctx,s=this._gridLineItems||(this._gridLineItems=this._computeGridLineItems(t)),r,o,a=(l,c,d)=>{!d.width||!d.color||(i.save(),i.lineWidth=d.width,i.strokeStyle=d.color,i.setLineDash(d.borderDash||[]),i.lineDashOffset=d.borderDashOffset,i.beginPath(),i.moveTo(l.x,l.y),i.lineTo(c.x,c.y),i.stroke(),i.restore())};if(e.display)for(r=0,o=s.length;r<o;++r){let l=s[r];e.drawOnChartArea&&a({x:l.x1,y:l.y1},{x:l.x2,y:l.y2},l),e.drawTicks&&a({x:l.tx1,y:l.ty1},{x:l.tx2,y:l.ty2},{color:l.tickColor,width:l.tickWidth,borderDash:l.tickBorderDash,borderDashOffset:l.tickBorderDashOffset})}}drawBorder(){let{chart:t,ctx:e,options:{border:i,grid:s}}=this,r=i.setContext(this.getContext()),o=i.display?r.width:0;if(!o)return;let a=s.setContext(this.getContext(0)).lineWidth,l=this._borderValue,c,d,h,u;this.isHorizontal()?(c=De(t,this.left,o)-o/2,d=De(t,this.right,a)+a/2,h=u=l):(h=De(t,this.top,o)-o/2,u=De(t,this.bottom,a)+a/2,c=d=l),e.save(),e.lineWidth=r.width,e.strokeStyle=r.color,e.beginPath(),e.moveTo(c,h),e.lineTo(d,u),e.stroke(),e.restore()}drawLabels(t){if(!this.options.ticks.display)return;let i=this.ctx,s=this._computeLabelArea();s&&Zn(i,s);let r=this.getLabelItems(t);for(let o of r){let a=o.options,l=o.font,c=o.label,d=o.textOffset;Ae(i,c,0,d,l,a)}s&&Qn(i)}drawTitle(){let{ctx:t,options:{position:e,title:i,reverse:s}}=this;if(!i.display)return;let r=yt(i.font),o=Dt(i.padding),a=i.align,l=r.lineHeight/2;e==="bottom"||e==="center"||j(e)?(l+=o.bottom,st(i.text)&&(l+=r.lineHeight*(i.text.length-1))):l+=o.top;let{titleX:c,titleY:d,maxWidth:h,rotation:u}=ju(this,l,e,a);Ae(t,i.text,0,0,r,{color:i.color,maxWidth:h,rotation:u,textAlign:$u(a,e,s),textBaseline:"middle",translation:[c,d]})}draw(t){this._isVisible()&&(this.drawBackground(),this.drawGrid(t),this.drawBorder(),this.drawTitle(),this.drawLabels(t))}_layers(){let t=this.options,e=t.ticks&&t.ticks.z||0,i=z(t.grid&&t.grid.z,-1),s=z(t.border&&t.border.z,0);return!this._isVisible()||this.draw!==n.prototype.draw?[{z:e,draw:r=>{this.draw(r)}}]:[{z:i,draw:r=>{this.drawBackground(),this.drawGrid(r),this.drawTitle()}},{z:s,draw:()=>{this.drawBorder()}},{z:e,draw:r=>{this.drawLabels(r)}}]}getMatchingVisibleMetas(t){let e=this.chart.getSortedVisibleDatasetMetas(),i=this.axis+"AxisID",s=[],r,o;for(r=0,o=e.length;r<o;++r){let a=e[r];a[i]===this.id&&(!t||a.type===t)&&s.push(a)}return s}_resolveTickFontOptions(t){let e=this.options.ticks.setContext(this.getContext(t));return yt(e.font)}_maxDigits(){let t=this._resolveTickFontOptions(0).lineHeight;return(this.isHorizontal()?this.width:this.height)/t}},An=class{constructor(t,e,i){this.type=t,this.scope=e,this.override=i,this.items=Object.create(null)}isForType(t){return Object.prototype.isPrototypeOf.call(this.type.prototype,t.prototype)}register(t){let e=Object.getPrototypeOf(t),i;Ku(e)&&(i=this.register(e));let s=this.items,r=t.id,o=this.scope+"."+r;if(!r)throw new Error("class does not have id: "+t);return r in s||(s[r]=t,Gu(t,o,i),this.override&&dt.override(t.id,t.overrides)),o}get(t){return this.items[t]}unregister(t){let e=this.items,i=t.id,s=this.scope;i in e&&delete e[i],s&&i in dt[s]&&(delete dt[s][i],this.override&&delete Me[i])}};function Gu(n,t,e){let i=un(Object.create(null),[e?dt.get(e):{},dt.get(t),n.defaults]);dt.set(t,i),n.defaultRoutes&&Xu(t,n.defaultRoutes),n.descriptors&&dt.describe(t,n.descriptors)}function Xu(n,t){Object.keys(t).forEach(e=>{let i=e.split("."),s=i.pop(),r=[n].concat(i).join("."),o=t[e].split("."),a=o.pop(),l=o.join(".");dt.route(r,s,l,a)})}function Ku(n){return"id"in n&&"defaults"in n}var uo=class{constructor(){this.controllers=new An(Ht,"datasets",!0),this.elements=new An(Wt,"elements"),this.plugins=new An(Object,"plugins"),this.scales=new An(qe,"scales"),this._typedRegistries=[this.controllers,this.scales,this.elements]}add(...t){this._each("register",t)}remove(...t){this._each("unregister",t)}addControllers(...t){this._each("register",t,this.controllers)}addElements(...t){this._each("register",t,this.elements)}addPlugins(...t){this._each("register",t,this.plugins)}addScales(...t){this._each("register",t,this.scales)}getController(t){return this._get(t,this.controllers,"controller")}getElement(t){return this._get(t,this.elements,"element")}getPlugin(t){return this._get(t,this.plugins,"plugin")}getScale(t){return this._get(t,this.scales,"scale")}removeControllers(...t){this._each("unregister",t,this.controllers)}removeElements(...t){this._each("unregister",t,this.elements)}removePlugins(...t){this._each("unregister",t,this.plugins)}removeScales(...t){this._each("unregister",t,this.scales)}_each(t,e,i){[...e].forEach(s=>{let r=i||this._getRegistryForType(s);i||r.isForType(s)||r===this.plugins&&s.id?this._exec(t,r,s):Z(s,o=>{let a=i||this._getRegistryForType(o);this._exec(t,a,o)})})}_exec(t,e,i){let s=Gi(t);et(i["before"+s],[],i),e[t](i),et(i["after"+s],[],i)}_getRegistryForType(t){for(let e=0;e<this._typedRegistries.length;e++){let i=this._typedRegistries[e];if(i.isForType(t))return i}return this.plugins}_get(t,e,i){let s=e.get(t);if(s===void 0)throw new Error('"'+t+'" is not a registered '+i+".");return s}},ce=new uo,fo=class{constructor(){this._init=void 0}notify(t,e,i,s){if(e==="beforeInit"&&(this._init=this._createDescriptors(t,!0),this._notify(this._init,t,"install")),this._init===void 0)return;let r=s?this._descriptors(t).filter(s):this._descriptors(t),o=this._notify(r,t,e,i);return e==="afterDestroy"&&(this._notify(r,t,"stop"),this._notify(this._init,t,"uninstall"),this._init=void 0),o}_notify(t,e,i,s){s=s||{};for(let r of t){let o=r.plugin,a=o[i],l=[e,s,r.options];if(et(a,l,o)===!1&&s.cancelable)return!1}return!0}invalidate(){Y(this._cache)||(this._oldCache=this._cache,this._cache=void 0)}_descriptors(t){if(this._cache)return this._cache;let e=this._cache=this._createDescriptors(t);return this._notifyStateChanges(t),e}_createDescriptors(t,e){let i=t&&t.config,s=z(i.options&&i.options.plugins,{}),r=qu(i);return s===!1&&!e?[]:Zu(t,r,s,e)}_notifyStateChanges(t){let e=this._oldCache||[],i=this._cache,s=(r,o)=>r.filter(a=>!o.some(l=>a.plugin.id===l.plugin.id));this._notify(s(e,i),t,"stop"),this._notify(s(i,e),t,"start")}};function qu(n){let t={},e=[],i=Object.keys(ce.plugins.items);for(let r=0;r<i.length;r++)e.push(ce.getPlugin(i[r]));let s=n.plugins||[];for(let r=0;r<s.length;r++){let o=s[r];e.indexOf(o)===-1&&(e.push(o),t[o.id]=!0)}return{plugins:e,localIds:t}}function Ju(n,t){return!t&&n===!1?null:n===!0?{}:n}function Zu(n,{plugins:t,localIds:e},i,s){let r=[],o=n.getContext();for(let a of t){let l=a.id,c=Ju(i[l],s);c!==null&&r.push({plugin:a,options:Qu(n.config,{plugin:a,local:e[l]},c,o)})}return r}function Qu(n,{plugin:t,local:e},i,s){let r=n.pluginScopeKeys(t),o=n.getOptionScopes(i,r);return e&&t.defaults&&o.push(t.defaults),n.createResolver(o,s,[""],{scriptable:!1,indexable:!1,allKeys:!0})}function po(n,t){let e=dt.datasets[n]||{};return((t.datasets||{})[n]||{}).indexAxis||t.indexAxis||e.indexAxis||"x"}function tf(n,t){let e=n;return n==="_index_"?e=t:n==="_value_"&&(e=t==="x"?"y":"x"),e}function ef(n,t){return n===t?"_index_":"_value_"}function Vl(n){if(n==="x"||n==="y"||n==="r")return n}function nf(n){if(n==="top"||n==="bottom")return"x";if(n==="left"||n==="right")return"y"}function mo(n,...t){if(Vl(n))return n;for(let e of t){let i=e.axis||nf(e.position)||n.length>1&&Vl(n[0].toLowerCase());if(i)return i}throw new Error(`Cannot determine type of '${n}' axis. Please provide 'axis' or 'position' option.`)}function zl(n,t,e){if(e[t+"AxisID"]===n)return{axis:t}}function sf(n,t){if(t.data&&t.data.datasets){let e=t.data.datasets.filter(i=>i.xAxisID===n||i.yAxisID===n);if(e.length)return zl(n,"x",e[0])||zl(n,"y",e[0])}return{}}function rf(n,t){let e=Me[n.type]||{scales:{}},i=t.scales||{},s=po(n.type,t),r=Object.create(null);return Object.keys(i).forEach(o=>{let a=i[o];if(!j(a))return console.error(`Invalid scale configuration for scale: ${o}`);if(a._proxy)return console.warn(`Ignoring resolver passed as options for scale: ${o}`);let l=mo(o,a,sf(o,n),dt.scales[a.type]),c=ef(l,s),d=e.scales||{};r[o]=pn(Object.create(null),[{axis:l},a,d[l],d[c]])}),n.data.datasets.forEach(o=>{let a=o.type||n.type,l=o.indexAxis||po(a,t),d=(Me[a]||{}).scales||{};Object.keys(d).forEach(h=>{let u=tf(h,l),f=o[u+"AxisID"]||u;r[f]=r[f]||Object.create(null),pn(r[f],[{axis:u},i[f],d[h]])})}),Object.keys(r).forEach(o=>{let a=r[o];pn(a,[dt.scales[a.type],dt.scale])}),r}function wc(n){let t=n.options||(n.options={});t.plugins=z(t.plugins,{}),t.scales=rf(n,t)}function Ec(n){return n=n||{},n.datasets=n.datasets||[],n.labels=n.labels||[],n}function of(n){return n=n||{},n.data=Ec(n.data),wc(n),n}var Hl=new Map,Mc=new Set;function os(n,t){let e=Hl.get(n);return e||(e=t(),Hl.set(n,e),Mc.add(e)),e}var si=(n,t,e)=>{let i=me(t,e);i!==void 0&&n.add(i)},go=class{constructor(t){this._config=of(t),this._scopeCache=new Map,this._resolverCache=new Map}get platform(){return this._config.platform}get type(){return this._config.type}set type(t){this._config.type=t}get data(){return this._config.data}set data(t){this._config.data=Ec(t)}get options(){return this._config.options}set options(t){this._config.options=t}get plugins(){return this._config.plugins}update(){let t=this._config;this.clearCache(),wc(t)}clearCache(){this._scopeCache.clear(),this._resolverCache.clear()}datasetScopeKeys(t){return os(t,()=>[[`datasets.${t}`,""]])}datasetAnimationScopeKeys(t,e){return os(`${t}.transition.${e}`,()=>[[`datasets.${t}.transitions.${e}`,`transitions.${e}`],[`datasets.${t}`,""]])}datasetElementScopeKeys(t,e){return os(`${t}-${e}`,()=>[[`datasets.${t}.elements.${e}`,`datasets.${t}`,`elements.${e}`,""]])}pluginScopeKeys(t){let e=t.id,i=this.type;return os(`${i}-plugin-${e}`,()=>[[`plugins.${e}`,...t.additionalOptionScopes||[]]])}_cachedScopes(t,e){let i=this._scopeCache,s=i.get(t);return(!s||e)&&(s=new Map,i.set(t,s)),s}getOptionScopes(t,e,i){let{options:s,type:r}=this,o=this._cachedScopes(t,i),a=o.get(e);if(a)return a;let l=new Set;e.forEach(d=>{t&&(l.add(t),d.forEach(h=>si(l,t,h))),d.forEach(h=>si(l,s,h)),d.forEach(h=>si(l,Me[r]||{},h)),d.forEach(h=>si(l,dt,h)),d.forEach(h=>si(l,Ji,h))});let c=Array.from(l);return c.length===0&&c.push(Object.create(null)),Mc.has(e)&&o.set(e,c),c}chartOptionScopes(){let{options:t,type:e}=this;return[t,Me[e]||{},dt.datasets[e]||{},{type:e},dt,Ji]}resolveNamedOptions(t,e,i,s=[""]){let r={$shared:!0},{resolver:o,subPrefixes:a}=Wl(this._resolverCache,t,s),l=o;if(lf(o,e)){r.$shared=!1,i=fe(i)?i():i;let c=this.createResolver(t,i,a);l=He(o,i,c)}for(let c of e)r[c]=l[c];return r}createResolver(t,e,i=[""],s){let{resolver:r}=Wl(this._resolverCache,t,i);return j(e)?He(r,e,void 0,s):r}};function Wl(n,t,e){let i=n.get(t);i||(i=new Map,n.set(t,i));let s=e.join(),r=i.get(s);return r||(r={resolver:ts(t,e),subPrefixes:e.filter(a=>!a.toLowerCase().includes("hover"))},i.set(s,r)),r}var af=n=>j(n)&&Object.getOwnPropertyNames(n).some(t=>fe(n[t]));function lf(n,t){let{isScriptable:e,isIndexable:i}=Br(n);for(let s of t){let r=e(s),o=i(s),a=(o||r)&&n[s];if(r&&(fe(a)||af(a))||o&&st(a))return!0}return!1}var cf="4.5.1",df=["top","bottom","left","right","chartArea"];function Ul(n,t){return n==="top"||n==="bottom"||df.indexOf(n)===-1&&t==="x"}function Yl(n,t){return function(e,i){return e[n]===i[n]?e[t]-i[t]:e[n]-i[n]}}function $l(n){let t=n.chart,e=t.options.animation;t.notifyPlugins("afterRender"),et(e&&e.onComplete,[n],t)}function hf(n){let t=n.chart,e=t.options.animation;et(e&&e.onProgress,[n],t)}function Dc(n){return es()&&typeof n=="string"?n=document.getElementById(n):n&&n.length&&(n=n[0]),n&&n.canvas&&(n=n.canvas),n}var hs={},jl=n=>{let t=Dc(n);return Object.values(hs).filter(e=>e.canvas===t).pop()};function uf(n,t,e){let i=Object.keys(n);for(let s of i){let r=+s;if(r>=t){let o=n[s];delete n[s],(e>0||r>t)&&(n[r+e]=o)}}}function ff(n,t,e,i){return!e||n.type==="mouseout"?null:i?t:n}var qt=class{static register(...t){ce.add(...t),Gl()}static unregister(...t){ce.remove(...t),Gl()}constructor(t,e){let i=this.config=new go(e),s=Dc(t),r=jl(s);if(r)throw new Error("Canvas is already in use. Chart with ID '"+r.id+"' must be destroyed before the canvas with ID '"+r.canvas.id+"' can be reused.");let o=i.createResolver(i.chartOptionScopes(),this.getContext());this.platform=new(i.platform||Pu(s)),this.platform.updateConfig(i);let a=this.platform.acquireContext(s,o.aspectRatio),l=a&&a.canvas,c=l&&l.height,d=l&&l.width;if(this.id=$a(),this.ctx=a,this.canvas=l,this.width=d,this.height=c,this._options=o,this._aspectRatio=this.aspectRatio,this._layers=[],this._metasets=[],this._stacks=void 0,this.boxes=[],this.currentDevicePixelRatio=void 0,this.chartArea=void 0,this._active=[],this._lastEvent=void 0,this._listeners={},this._responsiveListeners=void 0,this._sortedMetasets=[],this.scales={},this._plugins=new fo,this.$proxies={},this._hiddenIndices={},this.attached=!1,this._animationsDisabled=void 0,this.$context=void 0,this._doResize=nl(h=>this.update(h),o.resizeDelay||0),this._dataChanges=[],hs[this.id]=this,!a||!l){console.error("Failed to create chart: can't acquire context from the given item");return}_e.listen(this,"complete",$l),_e.listen(this,"progress",hf),this._initialize(),this.attached&&this.update()}get aspectRatio(){let{options:{aspectRatio:t,maintainAspectRatio:e},width:i,height:s,_aspectRatio:r}=this;return Y(t)?e&&r?r:s?i/s:null:t}get data(){return this.config.data}set data(t){this.config.data=t}get options(){return this._options}set options(t){this.config.options=t}get registry(){return ce}_initialize(){return this.notifyPlugins("beforeInit"),this.options.responsive?this.resize():Wr(this,this.options.devicePixelRatio),this.bindEvents(),this.notifyPlugins("afterInit"),this}clear(){return Fr(this.canvas,this.ctx),this}stop(){return _e.stop(this),this}resize(t,e){_e.running(this)?this._resizeBeforeDraw={width:t,height:e}:this._resize(t,e)}_resize(t,e){let i=this.options,s=this.canvas,r=i.maintainAspectRatio&&this.aspectRatio,o=this.platform.getMaximumSize(s,t,e,r),a=i.devicePixelRatio||this.platform.getDevicePixelRatio(),l=this.width?"resize":"attach";this.width=o.width,this.height=o.height,this._aspectRatio=this.aspectRatio,Wr(this,a,!0)&&(this.notifyPlugins("resize",{size:o}),et(i.onResize,[this,o],this),this.attached&&this._doResize(l)&&this.render())}ensureScalesHaveIDs(){let e=this.options.scales||{};Z(e,(i,s)=>{i.id=s})}buildOrUpdateScales(){let t=this.options,e=t.scales,i=this.scales,s=Object.keys(i).reduce((o,a)=>(o[a]=!1,o),{}),r=[];e&&(r=r.concat(Object.keys(e).map(o=>{let a=e[o],l=mo(o,a),c=l==="r",d=l==="x";return{options:a,dposition:c?"chartArea":d?"bottom":"left",dtype:c?"radialLinear":d?"category":"linear"}}))),Z(r,o=>{let a=o.options,l=a.id,c=mo(l,a),d=z(a.type,o.dtype);(a.position===void 0||Ul(a.position,c)!==Ul(o.dposition))&&(a.position=o.dposition),s[l]=!0;let h=null;if(l in i&&i[l].type===d)h=i[l];else{let u=ce.getScale(d);h=new u({id:l,type:d,ctx:this.ctx,chart:this}),i[h.id]=h}h.init(a,t)}),Z(s,(o,a)=>{o||delete i[a]}),Z(i,o=>{Ct.configure(this,o,o.options),Ct.addBox(this,o)})}_updateMetasets(){let t=this._metasets,e=this.data.datasets.length,i=t.length;if(t.sort((s,r)=>s.index-r.index),i>e){for(let s=e;s<i;++s)this._destroyDatasetMeta(s);t.splice(e,i-e)}this._sortedMetasets=t.slice(0).sort(Yl("order","index"))}_removeUnreferencedMetasets(){let{_metasets:t,data:{datasets:e}}=this;t.length>e.length&&delete this._stacks,t.forEach((i,s)=>{e.filter(r=>r===i._dataset).length===0&&this._destroyDatasetMeta(s)})}buildOrUpdateControllers(){let t=[],e=this.data.datasets,i,s;for(this._removeUnreferencedMetasets(),i=0,s=e.length;i<s;i++){let r=e[i],o=this.getDatasetMeta(i),a=r.type||this.config.type;if(o.type&&o.type!==a&&(this._destroyDatasetMeta(i),o=this.getDatasetMeta(i)),o.type=a,o.indexAxis=r.indexAxis||po(a,this.options),o.order=r.order||0,o.index=i,o.label=""+r.label,o.visible=this.isDatasetVisible(i),o.controller)o.controller.updateIndex(i),o.controller.linkScales();else{let l=ce.getController(a),{datasetElementType:c,dataElementType:d}=dt.datasets[a];Object.assign(l,{dataElementType:ce.getElement(d),datasetElementType:c&&ce.getElement(c)}),o.controller=new l(this,i),t.push(o.controller)}}return this._updateMetasets(),t}_resetElements(){Z(this.data.datasets,(t,e)=>{this.getDatasetMeta(e).controller.reset()},this)}reset(){this._resetElements(),this.notifyPlugins("reset")}update(t){let e=this.config;e.update();let i=this._options=e.createResolver(e.chartOptionScopes(),this.getContext()),s=this._animationsDisabled=!i.animation;if(this._updateScales(),this._checkEventBindings(),this._updateHiddenIndices(),this._plugins.invalidate(),this.notifyPlugins("beforeUpdate",{mode:t,cancelable:!0})===!1)return;let r=this.buildOrUpdateControllers();this.notifyPlugins("beforeElementsUpdate");let o=0;for(let c=0,d=this.data.datasets.length;c<d;c++){let{controller:h}=this.getDatasetMeta(c),u=!s&&r.indexOf(h)===-1;h.buildOrUpdateElements(u),o=Math.max(+h.getMaxOverflow(),o)}o=this._minPadding=i.layout.autoPadding?o:0,this._updateLayout(o),s||Z(r,c=>{c.reset()}),this._updateDatasets(t),this.notifyPlugins("afterUpdate",{mode:t}),this._layers.sort(Yl("z","_idx"));let{_active:a,_lastEvent:l}=this;l?this._eventHandler(l,!0):a.length&&this._updateHoverStyles(a,a,!0),this.render()}_updateScales(){Z(this.scales,t=>{Ct.removeBox(this,t)}),this.ensureScalesHaveIDs(),this.buildOrUpdateScales()}_checkEventBindings(){let t=this.options,e=new Set(Object.keys(this._listeners)),i=new Set(t.events);(!kr(e,i)||!!this._responsiveListeners!==t.responsive)&&(this.unbindEvents(),this.bindEvents())}_updateHiddenIndices(){let{_hiddenIndices:t}=this,e=this._getUniformDataChanges()||[];for(let{method:i,start:s,count:r}of e){let o=i==="_removeElements"?-r:r;uf(t,s,o)}}_getUniformDataChanges(){let t=this._dataChanges;if(!t||!t.length)return;this._dataChanges=[];let e=this.data.datasets.length,i=r=>new Set(t.filter(o=>o[0]===r).map((o,a)=>a+","+o.splice(1).join(","))),s=i(0);for(let r=1;r<e;r++)if(!kr(s,i(r)))return;return Array.from(s).map(r=>r.split(",")).map(r=>({method:r[1],start:+r[2],count:+r[3]}))}_updateLayout(t){if(this.notifyPlugins("beforeLayout",{cancelable:!0})===!1)return;Ct.update(this,this.width,this.height,t);let e=this.chartArea,i=e.width<=0||e.height<=0;this._layers=[],Z(this.boxes,s=>{i&&s.position==="chartArea"||(s.configure&&s.configure(),this._layers.push(...s._layers()))},this),this._layers.forEach((s,r)=>{s._idx=r}),this.notifyPlugins("afterLayout")}_updateDatasets(t){if(this.notifyPlugins("beforeDatasetsUpdate",{mode:t,cancelable:!0})!==!1){for(let e=0,i=this.data.datasets.length;e<i;++e)this.getDatasetMeta(e).controller.configure();for(let e=0,i=this.data.datasets.length;e<i;++e)this._updateDataset(e,fe(t)?t({datasetIndex:e}):t);this.notifyPlugins("afterDatasetsUpdate",{mode:t})}}_updateDataset(t,e){let i=this.getDatasetMeta(t),s={meta:i,index:t,mode:e,cancelable:!0};this.notifyPlugins("beforeDatasetUpdate",s)!==!1&&(i.controller._update(e),s.cancelable=!1,this.notifyPlugins("afterDatasetUpdate",s))}render(){this.notifyPlugins("beforeRender",{cancelable:!0})!==!1&&(_e.has(this)?this.attached&&!_e.running(this)&&_e.start(this):(this.draw(),$l({chart:this})))}draw(){let t;if(this._resizeBeforeDraw){let{width:i,height:s}=this._resizeBeforeDraw;this._resizeBeforeDraw=null,this._resize(i,s)}if(this.clear(),this.width<=0||this.height<=0||this.notifyPlugins("beforeDraw",{cancelable:!0})===!1)return;let e=this._layers;for(t=0;t<e.length&&e[t].z<=0;++t)e[t].draw(this.chartArea);for(this._drawDatasets();t<e.length;++t)e[t].draw(this.chartArea);this.notifyPlugins("afterDraw")}_getSortedDatasetMetas(t){let e=this._sortedMetasets,i=[],s,r;for(s=0,r=e.length;s<r;++s){let o=e[s];(!t||o.visible)&&i.push(o)}return i}getSortedVisibleDatasetMetas(){return this._getSortedDatasetMetas(!0)}_drawDatasets(){if(this.notifyPlugins("beforeDatasetsDraw",{cancelable:!0})===!1)return;let t=this.getSortedVisibleDatasetMetas();for(let e=t.length-1;e>=0;--e)this._drawDataset(t[e]);this.notifyPlugins("afterDatasetsDraw")}_drawDataset(t){let e=this.ctx,i={meta:t,index:t.index,cancelable:!0},s=Xr(this,t);this.notifyPlugins("beforeDatasetDraw",i)!==!1&&(s&&Zn(e,s),t.controller.draw(),s&&Qn(e),i.cancelable=!1,this.notifyPlugins("afterDatasetDraw",i))}isPointInArea(t){return re(t,this.chartArea,this._minPadding)}getElementsAtEventForMode(t,e,i,s){let r=pu.modes[e];return typeof r=="function"?r(this,t,i,s):[]}getDatasetMeta(t){let e=this.data.datasets[t],i=this._metasets,s=i.filter(r=>r&&r._dataset===e).pop();return s||(s={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null,order:e&&e.order||0,index:t,_dataset:e,_parsed:[],_sorted:!1},i.push(s)),s}getContext(){return this.$context||(this.$context=ge(null,{chart:this,type:"chart"}))}getVisibleDatasetCount(){return this.getSortedVisibleDatasetMetas().length}isDatasetVisible(t){let e=this.data.datasets[t];if(!e)return!1;let i=this.getDatasetMeta(t);return typeof i.hidden=="boolean"?!i.hidden:!e.hidden}setDatasetVisibility(t,e){let i=this.getDatasetMeta(t);i.hidden=!e}toggleDataVisibility(t){this._hiddenIndices[t]=!this._hiddenIndices[t]}getDataVisibility(t){return!this._hiddenIndices[t]}_updateVisibility(t,e,i){let s=i?"show":"hide",r=this.getDatasetMeta(t),o=r.controller._resolveAnimations(void 0,s);mn(e)?(r.data[e].hidden=!i,this.update()):(this.setDatasetVisibility(t,i),o.update(r,{visible:i}),this.update(a=>a.datasetIndex===t?s:void 0))}hide(t,e){this._updateVisibility(t,e,!1)}show(t,e){this._updateVisibility(t,e,!0)}_destroyDatasetMeta(t){let e=this._metasets[t];e&&e.controller&&e.controller._destroy(),delete this._metasets[t]}_stop(){let t,e;for(this.stop(),_e.remove(this),t=0,e=this.data.datasets.length;t<e;++t)this._destroyDatasetMeta(t)}destroy(){this.notifyPlugins("beforeDestroy");let{canvas:t,ctx:e}=this;this._stop(),this.config.clearCache(),t&&(this.unbindEvents(),Fr(t,e),this.platform.releaseContext(e),this.canvas=null,this.ctx=null),delete hs[this.id],this.notifyPlugins("afterDestroy")}toBase64Image(...t){return this.canvas.toDataURL(...t)}bindEvents(){this.bindUserEvents(),this.options.responsive?this.bindResponsiveEvents():this.attached=!0}bindUserEvents(){let t=this._listeners,e=this.platform,i=(r,o)=>{e.addEventListener(this,r,o),t[r]=o},s=(r,o,a)=>{r.offsetX=o,r.offsetY=a,this._eventHandler(r)};Z(this.options.events,r=>i(r,s))}bindResponsiveEvents(){this._responsiveListeners||(this._responsiveListeners={});let t=this._responsiveListeners,e=this.platform,i=(l,c)=>{e.addEventListener(this,l,c),t[l]=c},s=(l,c)=>{t[l]&&(e.removeEventListener(this,l,c),delete t[l])},r=(l,c)=>{this.canvas&&this.resize(l,c)},o,a=()=>{s("attach",a),this.attached=!0,this.resize(),i("resize",r),i("detach",o)};o=()=>{this.attached=!1,s("resize",r),this._stop(),this._resize(0,0),i("attach",a)},e.isAttached(this.canvas)?a():o()}unbindEvents(){Z(this._listeners,(t,e)=>{this.platform.removeEventListener(this,e,t)}),this._listeners={},Z(this._responsiveListeners,(t,e)=>{this.platform.removeEventListener(this,e,t)}),this._responsiveListeners=void 0}updateHoverStyle(t,e,i){let s=i?"set":"remove",r,o,a,l;for(e==="dataset"&&(r=this.getDatasetMeta(t[0].datasetIndex),r.controller["_"+s+"DatasetHoverStyle"]()),a=0,l=t.length;a<l;++a){o=t[a];let c=o&&this.getDatasetMeta(o.datasetIndex).controller;c&&c[s+"HoverStyle"](o.element,o.datasetIndex,o.index)}}getActiveElements(){return this._active||[]}setActiveElements(t){let e=this._active||[],i=t.map(({datasetIndex:r,index:o})=>{let a=this.getDatasetMeta(r);if(!a)throw new Error("No dataset found at index "+r);return{datasetIndex:r,element:a.data[o],index:o}});!qn(i,e)&&(this._active=i,this._lastEvent=null,this._updateHoverStyles(i,e))}notifyPlugins(t,e,i){return this._plugins.notify(this,t,e,i)}isPluginEnabled(t){return this._plugins._cache.filter(e=>e.plugin.id===t).length===1}_updateHoverStyles(t,e,i){let s=this.options.hover,r=(l,c)=>l.filter(d=>!c.some(h=>d.datasetIndex===h.datasetIndex&&d.index===h.index)),o=r(e,t),a=i?t:r(t,e);o.length&&this.updateHoverStyle(o,s.mode,!1),a.length&&s.mode&&this.updateHoverStyle(a,s.mode,!0)}_eventHandler(t,e){let i={event:t,replay:e,cancelable:!0,inChartArea:this.isPointInArea(t)},s=o=>(o.options.events||this.options.events).includes(t.native.type);if(this.notifyPlugins("beforeEvent",i,s)===!1)return;let r=this._handleEvent(t,e,i.inChartArea);return i.cancelable=!1,this.notifyPlugins("afterEvent",i,s),(r||i.changed)&&this.render(),this}_handleEvent(t,e,i){let{_active:s=[],options:r}=this,o=e,a=this._getActiveElements(t,s,i,o),l=Xa(t),c=ff(t,this._lastEvent,i,l);i&&(this._lastEvent=null,et(r.onHover,[t,a,this],this),l&&et(r.onClick,[t,a,this],this));let d=!qn(a,s);return(d||e)&&(this._active=a,this._updateHoverStyles(a,s,e)),this._lastEvent=c,d}_getActiveElements(t,e,i,s){if(t.type==="mouseout")return[];if(!i)return e;let r=this.options.hover;return this.getElementsAtEventForMode(t,r.mode,r,s)}};A(qt,"defaults",dt),A(qt,"instances",hs),A(qt,"overrides",Me),A(qt,"registry",ce),A(qt,"version",cf),A(qt,"getChart",jl);function Gl(){return Z(qt.instances,n=>n._plugins.invalidate())}function pf(n,t,e){let{startAngle:i,x:s,y:r,outerRadius:o,innerRadius:a,options:l}=t,{borderWidth:c,borderJoinStyle:d}=l,h=Math.min(c/o,Et(i-e));if(n.beginPath(),n.arc(s,r,o-c/2,i+h/2,e-h/2),a>0){let u=Math.min(c/a,Et(i-e));n.arc(s,r,a+c/2,e-u/2,i+u/2,!0)}else{let u=Math.min(c/2,o*Et(i-e));if(d==="round")n.arc(s,r,u,e-q/2,i+q/2,!0);else if(d==="bevel"){let f=2*u*u,p=-f*Math.cos(e+q/2)+s,m=-f*Math.sin(e+q/2)+r,g=f*Math.cos(i+q/2)+s,_=f*Math.sin(i+q/2)+r;n.lineTo(p,m),n.lineTo(g,_)}}n.closePath(),n.moveTo(0,0),n.rect(0,0,n.canvas.width,n.canvas.height),n.clip("evenodd")}function mf(n,t,e){let{startAngle:i,pixelMargin:s,x:r,y:o,outerRadius:a,innerRadius:l}=t,c=s/a;n.beginPath(),n.arc(r,o,a,i-c,e+c),l>s?(c=s/l,n.arc(r,o,l,e+c,i-c,!0)):n.arc(r,o,s,e+mt,i-mt),n.closePath(),n.clip()}function gf(n){return Qi(n,["outerStart","outerEnd","innerStart","innerEnd"])}function _f(n,t,e,i){let s=gf(n.options.borderRadius),r=(e-t)/2,o=Math.min(r,i*t/2),a=l=>{let c=(e-Math.min(r,l))*i/2;return Tt(l,0,Math.min(r,c))};return{outerStart:a(s.outerStart),outerEnd:a(s.outerEnd),innerStart:Tt(s.innerStart,0,o),innerEnd:Tt(s.innerEnd,0,o)}}function xn(n,t,e,i){return{x:e+n*Math.cos(t),y:i+n*Math.sin(t)}}function ms(n,t,e,i,s,r){let{x:o,y:a,startAngle:l,pixelMargin:c,innerRadius:d}=t,h=Math.max(t.outerRadius+i+e-c,0),u=d>0?d+i+e+c:0,f=0,p=s-l;if(i){let I=d>0?d-i:0,G=h>0?h-i:0,M=(I+G)/2,U=M!==0?p*M/(M+i):p;f=(p-U)/2}let m=Math.max(.001,p*h-e/q)/h,g=(p-m)/2,_=l+g+f,b=s-g-f,{outerStart:k,outerEnd:y,innerStart:x,innerEnd:T}=_f(t,u,h,b-_),w=h-k,v=h-y,E=_+k/w,C=b-y/v,R=u+x,F=u+T,X=_+x/R,$=b-T/F;if(n.beginPath(),r){let I=(E+C)/2;if(n.arc(o,a,h,E,I),n.arc(o,a,h,I,C),y>0){let W=xn(v,C,o,a);n.arc(W.x,W.y,y,C,b+mt)}let G=xn(F,b,o,a);if(n.lineTo(G.x,G.y),T>0){let W=xn(F,$,o,a);n.arc(W.x,W.y,T,b+mt,$+Math.PI)}let M=(b-T/u+(_+x/u))/2;if(n.arc(o,a,u,b-T/u,M,!0),n.arc(o,a,u,M,_+x/u,!0),x>0){let W=xn(R,X,o,a);n.arc(W.x,W.y,x,X+Math.PI,_-mt)}let U=xn(w,_,o,a);if(n.lineTo(U.x,U.y),k>0){let W=xn(w,E,o,a);n.arc(W.x,W.y,k,_-mt,E)}}else{n.moveTo(o,a);let I=Math.cos(E)*h+o,G=Math.sin(E)*h+a;n.lineTo(I,G);let M=Math.cos(C)*h+o,U=Math.sin(C)*h+a;n.lineTo(M,U)}n.closePath()}function bf(n,t,e,i,s){let{fullCircles:r,startAngle:o,circumference:a}=t,l=t.endAngle;if(r){ms(n,t,e,i,l,s);for(let c=0;c<r;++c)n.fill();isNaN(a)||(l=o+(a%rt||rt))}return ms(n,t,e,i,l,s),n.fill(),l}function yf(n,t,e,i,s){let{fullCircles:r,startAngle:o,circumference:a,options:l}=t,{borderWidth:c,borderJoinStyle:d,borderDash:h,borderDashOffset:u,borderRadius:f}=l,p=l.borderAlign==="inner";if(!c)return;n.setLineDash(h||[]),n.lineDashOffset=u,p?(n.lineWidth=c*2,n.lineJoin=d||"round"):(n.lineWidth=c,n.lineJoin=d||"bevel");let m=t.endAngle;if(r){ms(n,t,e,i,m,s);for(let g=0;g<r;++g)n.stroke();isNaN(a)||(m=o+(a%rt||rt))}p&&mf(n,t,m),l.selfJoin&&m-o>=q&&f===0&&d!=="miter"&&pf(n,t,m),r||(ms(n,t,e,i,m,s),n.stroke())}var je=class extends Wt{constructor(e){super();A(this,"circumference");A(this,"endAngle");A(this,"fullCircles");A(this,"innerRadius");A(this,"outerRadius");A(this,"pixelMargin");A(this,"startAngle");this.options=void 0,this.circumference=void 0,this.startAngle=void 0,this.endAngle=void 0,this.innerRadius=void 0,this.outerRadius=void 0,this.pixelMargin=0,this.fullCircles=0,e&&Object.assign(this,e)}inRange(e,i,s){let r=this.getProps(["x","y"],s),{angle:o,distance:a}=Er(r,{x:e,y:i}),{startAngle:l,endAngle:c,innerRadius:d,outerRadius:h,circumference:u}=this.getProps(["startAngle","endAngle","innerRadius","outerRadius","circumference"],s),f=(this.options.spacing+this.options.borderWidth)/2,p=z(u,c-l),m=_n(o,l,c)&&l!==c,g=p>=rt||m,_=ae(a,d+f,h+f);return g&&_}getCenterPoint(e){let{x:i,y:s,startAngle:r,endAngle:o,innerRadius:a,outerRadius:l}=this.getProps(["x","y","startAngle","endAngle","innerRadius","outerRadius"],e),{offset:c,spacing:d}=this.options,h=(r+o)/2,u=(a+l+d+c)/2;return{x:i+Math.cos(h)*u,y:s+Math.sin(h)*u}}tooltipPosition(e){return this.getCenterPoint(e)}draw(e){let{options:i,circumference:s}=this,r=(i.offset||0)/4,o=(i.spacing||0)/2,a=i.circular;if(this.pixelMargin=i.borderAlign==="inner"?.33:0,this.fullCircles=s>rt?Math.floor(s/rt):0,s===0||this.innerRadius<0||this.outerRadius<0)return;e.save();let l=(this.startAngle+this.endAngle)/2;e.translate(Math.cos(l)*r,Math.sin(l)*r);let c=1-Math.sin(Math.min(q,s||0)),d=r*c;e.fillStyle=i.backgroundColor,e.strokeStyle=i.borderColor,bf(e,this,d,o,a),yf(e,this,d,o,a),e.restore()}};A(je,"id","arc"),A(je,"defaults",{borderAlign:"center",borderColor:"#fff",borderDash:[],borderDashOffset:0,borderJoinStyle:void 0,borderRadius:0,borderWidth:2,offset:0,spacing:0,angle:void 0,circular:!0,selfJoin:!1}),A(je,"defaultRoutes",{backgroundColor:"backgroundColor"}),A(je,"descriptors",{_scriptable:!0,_indexable:e=>e!=="borderDash"});function Ac(n,t,e=t){n.lineCap=z(e.borderCapStyle,t.borderCapStyle),n.setLineDash(z(e.borderDash,t.borderDash)),n.lineDashOffset=z(e.borderDashOffset,t.borderDashOffset),n.lineJoin=z(e.borderJoinStyle,t.borderJoinStyle),n.lineWidth=z(e.borderWidth,t.borderWidth),n.strokeStyle=z(e.borderColor,t.borderColor)}function vf(n,t,e){n.lineTo(e.x,e.y)}function xf(n){return n.stepped?ol:n.tension||n.cubicInterpolationMode==="monotone"?al:vf}function Cc(n,t,e={}){let i=n.length,{start:s=0,end:r=i-1}=e,{start:o,end:a}=t,l=Math.max(s,o),c=Math.min(r,a),d=s<o&&r<o||s>a&&r>a;return{count:i,start:l,loop:t.loop,ilen:c<l&&!d?i+c-l:c-l}}function kf(n,t,e,i){let{points:s,options:r}=t,{count:o,start:a,loop:l,ilen:c}=Cc(s,e,i),d=xf(r),{move:h=!0,reverse:u}=i||{},f,p,m;for(f=0;f<=c;++f)p=s[(a+(u?c-f:f))%o],!p.skip&&(h?(n.moveTo(p.x,p.y),h=!1):d(n,m,p,u,r.stepped),m=p);return l&&(p=s[(a+(u?c:0))%o],d(n,m,p,u,r.stepped)),!!l}function Tf(n,t,e,i){let s=t.points,{count:r,start:o,ilen:a}=Cc(s,e,i),{move:l=!0,reverse:c}=i||{},d=0,h=0,u,f,p,m,g,_,b=y=>(o+(c?a-y:y))%r,k=()=>{m!==g&&(n.lineTo(d,g),n.lineTo(d,m),n.lineTo(d,_))};for(l&&(f=s[b(0)],n.moveTo(f.x,f.y)),u=0;u<=a;++u){if(f=s[b(u)],f.skip)continue;let y=f.x,x=f.y,T=y|0;T===p?(x<m?m=x:x>g&&(g=x),d=(h*d+y)/++h):(k(),n.lineTo(y,x),p=T,h=0,m=g=x),_=x}k()}function _o(n){let t=n.options,e=t.borderDash&&t.borderDash.length;return!n._decimated&&!n._loop&&!t.tension&&t.cubicInterpolationMode!=="monotone"&&!t.stepped&&!e?Tf:kf}function Sf(n){return n.stepped?gl:n.tension||n.cubicInterpolationMode==="monotone"?_l:we}function wf(n,t,e,i){let s=t._path;s||(s=t._path=new Path2D,t.path(s,e,i)&&s.closePath()),Ac(n,t.options),n.stroke(s)}function Ef(n,t,e,i){let{segments:s,options:r}=t,o=_o(t);for(let a of s)Ac(n,r,a.style),n.beginPath(),o(n,t,a,{start:e,end:e+i-1})&&n.closePath(),n.stroke()}var Mf=typeof Path2D=="function";function Df(n,t,e,i){Mf&&!t.options.segment?wf(n,t,e,i):Ef(n,t,e,i)}var de=class extends Wt{constructor(t){super(),this.animated=!0,this.options=void 0,this._chart=void 0,this._loop=void 0,this._fullLoop=void 0,this._path=void 0,this._points=void 0,this._segments=void 0,this._decimated=!1,this._pointsUpdated=!1,this._datasetIndex=void 0,t&&Object.assign(this,t)}updateControlPoints(t,e){let i=this.options;if((i.tension||i.cubicInterpolationMode==="monotone")&&!i.stepped&&!this._pointsUpdated){let s=i.spanGaps?this._loop:this._fullLoop;fl(this._points,i,t,s,e),this._pointsUpdated=!0}}set points(t){this._points=t,delete this._segments,delete this._path,this._pointsUpdated=!1}get points(){return this._points}get segments(){return this._segments||(this._segments=yl(this,this.options.segment))}first(){let t=this.segments,e=this.points;return t.length&&e[t[0].start]}last(){let t=this.segments,e=this.points,i=t.length;return i&&e[t[i-1].end]}interpolate(t,e){let i=this.options,s=t[e],r=this.points,o=Gr(this,{property:e,start:s,end:s});if(!o.length)return;let a=[],l=Sf(i),c,d;for(c=0,d=o.length;c<d;++c){let{start:h,end:u}=o[c],f=r[h],p=r[u];if(f===p){a.push(f);continue}let m=Math.abs((s-f[e])/(p[e]-f[e])),g=l(f,p,m,i.stepped);g[e]=t[e],a.push(g)}return a.length===1?a[0]:a}pathSegment(t,e,i){return _o(this)(t,this,e,i)}path(t,e,i){let s=this.segments,r=_o(this),o=this._loop;e=e||0,i=i||this.points.length-e;for(let a of s)o&=r(t,this,a,{start:e,end:e+i-1});return!!o}draw(t,e,i,s){let r=this.options||{};(this.points||[]).length&&r.borderWidth&&(t.save(),Df(t,this,i,s),t.restore()),this.animated&&(this._pointsUpdated=!1,this._path=void 0)}};A(de,"id","line"),A(de,"defaults",{borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",borderWidth:3,capBezierPoints:!0,cubicInterpolationMode:"default",fill:!1,spanGaps:!1,stepped:!1,tension:0}),A(de,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"}),A(de,"descriptors",{_scriptable:!0,_indexable:t=>t!=="borderDash"&&t!=="fill"});function Xl(n,t,e,i){let s=n.options,{[e]:r}=n.getProps([e],i);return Math.abs(t-r)<s.radius+s.hitRadius}var Mn=class extends Wt{constructor(e){super();A(this,"parsed");A(this,"skip");A(this,"stop");this.options=void 0,this.parsed=void 0,this.skip=void 0,this.stop=void 0,e&&Object.assign(this,e)}inRange(e,i,s){let r=this.options,{x:o,y:a}=this.getProps(["x","y"],s);return Math.pow(e-o,2)+Math.pow(i-a,2)<Math.pow(r.hitRadius+r.radius,2)}inXRange(e,i){return Xl(this,e,"x",i)}inYRange(e,i){return Xl(this,e,"y",i)}getCenterPoint(e){let{x:i,y:s}=this.getProps(["x","y"],e);return{x:i,y:s}}size(e){e=e||this.options||{};let i=e.radius||0;i=Math.max(i,i&&e.hoverRadius||0);let s=i&&e.borderWidth||0;return(i+s)*2}draw(e,i){let s=this.options;this.skip||s.radius<.1||!re(this,i,this.size(s)/2)||(e.strokeStyle=s.borderColor,e.lineWidth=s.borderWidth,e.fillStyle=s.backgroundColor,Zi(e,s,this.x,this.y))}getRange(){let e=this.options||{};return e.radius+e.hitRadius}};A(Mn,"id","point"),A(Mn,"defaults",{borderWidth:1,hitRadius:1,hoverBorderWidth:1,hoverRadius:4,pointStyle:"circle",radius:3,rotation:0}),A(Mn,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"});function Rc(n,t){let{x:e,y:i,base:s,width:r,height:o}=n.getProps(["x","y","base","width","height"],t),a,l,c,d,h;return n.horizontal?(h=o/2,a=Math.min(e,s),l=Math.max(e,s),c=i-h,d=i+h):(h=r/2,a=e-h,l=e+h,c=Math.min(i,s),d=Math.max(i,s)),{left:a,top:c,right:l,bottom:d}}function Oe(n,t,e,i){return n?0:Tt(t,e,i)}function Af(n,t,e){let i=n.options.borderWidth,s=n.borderSkipped,r=Nr(i);return{t:Oe(s.top,r.top,0,e),r:Oe(s.right,r.right,0,t),b:Oe(s.bottom,r.bottom,0,e),l:Oe(s.left,r.left,0,t)}}function Cf(n,t,e){let{enableBorderRadius:i}=n.getProps(["enableBorderRadius"]),s=n.options.borderRadius,r=Ce(s),o=Math.min(t,e),a=n.borderSkipped,l=i||j(s);return{topLeft:Oe(!l||a.top||a.left,r.topLeft,0,o),topRight:Oe(!l||a.top||a.right,r.topRight,0,o),bottomLeft:Oe(!l||a.bottom||a.left,r.bottomLeft,0,o),bottomRight:Oe(!l||a.bottom||a.right,r.bottomRight,0,o)}}function Rf(n){let t=Rc(n),e=t.right-t.left,i=t.bottom-t.top,s=Af(n,e/2,i/2),r=Cf(n,e/2,i/2);return{outer:{x:t.left,y:t.top,w:e,h:i,radius:r},inner:{x:t.left+s.l,y:t.top+s.t,w:e-s.l-s.r,h:i-s.t-s.b,radius:{topLeft:Math.max(0,r.topLeft-Math.max(s.t,s.l)),topRight:Math.max(0,r.topRight-Math.max(s.t,s.r)),bottomLeft:Math.max(0,r.bottomLeft-Math.max(s.b,s.l)),bottomRight:Math.max(0,r.bottomRight-Math.max(s.b,s.r))}}}}function no(n,t,e,i){let s=t===null,r=e===null,a=n&&!(s&&r)&&Rc(n,i);return a&&(s||ae(t,a.left,a.right))&&(r||ae(e,a.top,a.bottom))}function Of(n){return n.topLeft||n.topRight||n.bottomLeft||n.bottomRight}function Pf(n,t){n.rect(t.x,t.y,t.w,t.h)}function io(n,t,e={}){let i=n.x!==e.x?-t:0,s=n.y!==e.y?-t:0,r=(n.x+n.w!==e.x+e.w?t:0)-i,o=(n.y+n.h!==e.y+e.h?t:0)-s;return{x:n.x+i,y:n.y+s,w:n.w+r,h:n.h+o,radius:n.radius}}var Dn=class extends Wt{constructor(t){super(),this.options=void 0,this.horizontal=void 0,this.base=void 0,this.width=void 0,this.height=void 0,this.inflateAmount=void 0,t&&Object.assign(this,t)}draw(t){let{inflateAmount:e,options:{borderColor:i,backgroundColor:s}}=this,{inner:r,outer:o}=Rf(this),a=Of(o.radius)?yn:Pf;t.save(),(o.w!==r.w||o.h!==r.h)&&(t.beginPath(),a(t,io(o,e,r)),t.clip(),a(t,io(r,-e,o)),t.fillStyle=i,t.fill("evenodd")),t.beginPath(),a(t,io(r,e)),t.fillStyle=s,t.fill(),t.restore()}inRange(t,e,i){return no(this,t,e,i)}inXRange(t,e){return no(this,t,null,e)}inYRange(t,e){return no(this,null,t,e)}getCenterPoint(t){let{x:e,y:i,base:s,horizontal:r}=this.getProps(["x","y","base","horizontal"],t);return{x:r?(e+s)/2:e,y:r?i:(i+s)/2}}getRange(t){return t==="x"?this.width/2:this.height/2}};A(Dn,"id","bar"),A(Dn,"defaults",{borderSkipped:"start",borderWidth:0,borderRadius:0,inflateAmount:"auto",pointStyle:void 0}),A(Dn,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"});var Lf=Object.freeze({__proto__:null,ArcElement:je,BarElement:Dn,LineElement:de,PointElement:Mn}),bo=["rgb(54, 162, 235)","rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(153, 102, 255)","rgb(201, 203, 207)"],Kl=bo.map(n=>n.replace("rgb(","rgba(").replace(")",", 0.5)"));function Oc(n){return bo[n%bo.length]}function Pc(n){return Kl[n%Kl.length]}function Ff(n,t){return n.borderColor=Oc(t),n.backgroundColor=Pc(t),++t}function If(n,t){return n.backgroundColor=n.data.map(()=>Oc(t++)),t}function Nf(n,t){return n.backgroundColor=n.data.map(()=>Pc(t++)),t}function Bf(n){let t=0;return(e,i)=>{let s=n.getDatasetMeta(i).controller;s instanceof ye?t=If(e,t):s instanceof Xe?t=Nf(e,t):s&&(t=Ff(e,t))}}function ql(n){let t;for(t in n)if(n[t].borderColor||n[t].backgroundColor)return!0;return!1}function Vf(n){return n&&(n.borderColor||n.backgroundColor)}function zf(){return dt.borderColor!=="rgba(0,0,0,0.1)"||dt.backgroundColor!=="rgba(0,0,0,0.1)"}var Hf={id:"colors",defaults:{enabled:!0,forceOverride:!1},beforeLayout(n,t,e){if(!e.enabled)return;let{data:{datasets:i},options:s}=n.config,{elements:r}=s,o=ql(i)||Vf(s)||r&&ql(r)||zf();if(!e.forceOverride&&o)return;let a=Bf(n);i.forEach(a)}};function Wf(n,t,e,i,s){let r=s.samples||i;if(r>=e)return n.slice(t,t+e);let o=[],a=(e-2)/(r-2),l=0,c=t+e-1,d=t,h,u,f,p,m;for(o[l++]=n[d],h=0;h<r-2;h++){let g=0,_=0,b,k=Math.floor((h+1)*a)+1+t,y=Math.min(Math.floor((h+2)*a)+1,e)+t,x=y-k;for(b=k;b<y;b++)g+=n[b].x,_+=n[b].y;g/=x,_/=x;let T=Math.floor(h*a)+1+t,w=Math.min(Math.floor((h+1)*a)+1,e)+t,{x:v,y:E}=n[d];for(f=p=-1,b=T;b<w;b++)p=.5*Math.abs((v-g)*(n[b].y-E)-(v-n[b].x)*(_-E)),p>f&&(f=p,u=n[b],m=b);o[l++]=u,d=m}return o[l++]=n[c],o}function Uf(n,t,e,i){let s=0,r=0,o,a,l,c,d,h,u,f,p,m,g=[],_=t+e-1,b=n[t].x,y=n[_].x-b;for(o=t;o<t+e;++o){a=n[o],l=(a.x-b)/y*i,c=a.y;let x=l|0;if(x===d)c<p?(p=c,h=o):c>m&&(m=c,u=o),s=(r*s+a.x)/++r;else{let T=o-1;if(!Y(h)&&!Y(u)){let w=Math.min(h,u),v=Math.max(h,u);w!==f&&w!==T&&g.push({...n[w],x:s}),v!==f&&v!==T&&g.push({...n[v],x:s})}o>0&&T!==f&&g.push(n[T]),g.push(a),d=x,r=0,p=m=c,h=u=f=o}}return g}function Lc(n){if(n._decimated){let t=n._data;delete n._decimated,delete n._data,Object.defineProperty(n,"data",{configurable:!0,enumerable:!0,writable:!0,value:t})}}function Jl(n){n.data.datasets.forEach(t=>{Lc(t)})}function Yf(n,t){let e=t.length,i=0,s,{iScale:r}=n,{min:o,max:a,minDefined:l,maxDefined:c}=r.getUserBounds();return l&&(i=Tt(se(t,r.axis,o).lo,0,e-1)),c?s=Tt(se(t,r.axis,a).hi+1,i,e)-i:s=e-i,{start:i,count:s}}var $f={id:"decimation",defaults:{algorithm:"min-max",enabled:!1},beforeElementsUpdate:(n,t,e)=>{if(!e.enabled){Jl(n);return}let i=n.width;n.data.datasets.forEach((s,r)=>{let{_data:o,indexAxis:a}=s,l=n.getDatasetMeta(r),c=o||s.data;if(vn([a,n.options.indexAxis])==="y"||!l.controller.supportsDecimation)return;let d=n.scales[l.xAxisID];if(d.type!=="linear"&&d.type!=="time"||n.options.parsing)return;let{start:h,count:u}=Yf(l,c),f=e.threshold||4*i;if(u<=f){Lc(s);return}Y(o)&&(s._data=c,delete s.data,Object.defineProperty(s,"data",{configurable:!0,enumerable:!0,get:function(){return this._decimated},set:function(m){this._data=m}}));let p;switch(e.algorithm){case"lttb":p=Wf(c,h,u,i,e);break;case"min-max":p=Uf(c,h,u,i);break;default:throw new Error(`Unsupported decimation algorithm '${e.algorithm}'`)}s._decimated=p})},destroy(n){Jl(n)}};function jf(n,t,e){let i=n.segments,s=n.points,r=t.points,o=[];for(let a of i){let{start:l,end:c}=a;c=bs(l,c,s);let d=yo(e,s[l],s[c],a.loop);if(!t.segments){o.push({source:a,target:d,start:s[l],end:s[c]});continue}let h=Gr(t,d);for(let u of h){let f=yo(e,r[u.start],r[u.end],u.loop),p=jr(a,s,f);for(let m of p)o.push({source:m,target:u,start:{[e]:Zl(d,f,"start",Math.max)},end:{[e]:Zl(d,f,"end",Math.min)}})}}return o}function yo(n,t,e,i){if(i)return;let s=t[n],r=e[n];return n==="angle"&&(s=Et(s),r=Et(r)),{property:n,start:s,end:r}}function Gf(n,t){let{x:e=null,y:i=null}=n||{},s=t.points,r=[];return t.segments.forEach(({start:o,end:a})=>{a=bs(o,a,s);let l=s[o],c=s[a];i!==null?(r.push({x:l.x,y:i}),r.push({x:c.x,y:i})):e!==null&&(r.push({x:e,y:l.y}),r.push({x:e,y:c.y}))}),r}function bs(n,t,e){for(;t>n;t--){let i=e[t];if(!isNaN(i.x)&&!isNaN(i.y))break}return t}function Zl(n,t,e,i){return n&&t?i(n[e],t[e]):n?n[e]:t?t[e]:0}function Fc(n,t){let e=[],i=!1;return st(n)?(i=!0,e=n):e=Gf(n,t),e.length?new de({points:e,options:{tension:0},_loop:i,_fullLoop:i}):null}function Ql(n){return n&&n.fill!==!1}function Xf(n,t,e){let s=n[t].fill,r=[t],o;if(!e)return s;for(;s!==!1&&r.indexOf(s)===-1;){if(!pt(s))return s;if(o=n[s],!o)return!1;if(o.visible)return s;r.push(s),s=o.fill}return!1}function Kf(n,t,e){let i=Qf(n);if(j(i))return isNaN(i.value)?!1:i;let s=parseFloat(i);return pt(s)&&Math.floor(s)===s?qf(i[0],t,s,e):["origin","start","end","stack","shape"].indexOf(i)>=0&&i}function qf(n,t,e,i){return(n==="-"||n==="+")&&(e=t+e),e===t||e<0||e>=i?!1:e}function Jf(n,t){let e=null;return n==="start"?e=t.bottom:n==="end"?e=t.top:j(n)?e=t.getPixelForValue(n.value):t.getBasePixel&&(e=t.getBasePixel()),e}function Zf(n,t,e){let i;return n==="start"?i=e:n==="end"?i=t.options.reverse?t.min:t.max:j(n)?i=n.value:i=t.getBaseValue(),i}function Qf(n){let t=n.options,e=t.fill,i=z(e&&e.target,e);return i===void 0&&(i=!!t.backgroundColor),i===!1||i===null?!1:i===!0?"origin":i}function tp(n){let{scale:t,index:e,line:i}=n,s=[],r=i.segments,o=i.points,a=ep(t,e);a.push(Fc({x:null,y:t.bottom},i));for(let l=0;l<r.length;l++){let c=r[l];for(let d=c.start;d<=c.end;d++)np(s,o[d],a)}return new de({points:s,options:{}})}function ep(n,t){let e=[],i=n.getMatchingVisibleMetas("line");for(let s=0;s<i.length;s++){let r=i[s];if(r.index===t)break;r.hidden||e.unshift(r.dataset)}return e}function np(n,t,e){let i=[];for(let s=0;s<e.length;s++){let r=e[s],{first:o,last:a,point:l}=ip(r,t,"x");if(!(!l||o&&a)){if(o)i.unshift(l);else if(n.push(l),!a)break}}n.push(...i)}function ip(n,t,e){let i=n.interpolate(t,e);if(!i)return{};let s=i[e],r=n.segments,o=n.points,a=!1,l=!1;for(let c=0;c<r.length;c++){let d=r[c],h=o[d.start][e],u=o[d.end][e];if(ae(s,h,u)){a=s===h,l=s===u;break}}return{first:a,last:l,point:i}}var gs=class{constructor(t){this.x=t.x,this.y=t.y,this.radius=t.radius}pathSegment(t,e,i){let{x:s,y:r,radius:o}=this;return e=e||{start:0,end:rt},t.arc(s,r,o,e.end,e.start,!0),!i.bounds}interpolate(t){let{x:e,y:i,radius:s}=this,r=t.angle;return{x:e+Math.cos(r)*s,y:i+Math.sin(r)*s,angle:r}}};function sp(n){let{chart:t,fill:e,line:i}=n;if(pt(e))return rp(t,e);if(e==="stack")return tp(n);if(e==="shape")return!0;let s=op(n);return s instanceof gs?s:Fc(s,i)}function rp(n,t){let e=n.getDatasetMeta(t);return e&&n.isDatasetVisible(t)?e.dataset:null}function op(n){return(n.scale||{}).getPointPositionForValue?lp(n):ap(n)}function ap(n){let{scale:t={},fill:e}=n,i=Jf(e,t);if(pt(i)){let s=t.isHorizontal();return{x:s?i:null,y:s?null:i}}return null}function lp(n){let{scale:t,fill:e}=n,i=t.options,s=t.getLabels().length,r=i.reverse?t.max:t.min,o=Zf(e,t,r),a=[];if(i.grid.circular){let l=t.getPointPositionForValue(0,r);return new gs({x:l.x,y:l.y,radius:t.getDistanceFromCenterForValue(o)})}for(let l=0;l<s;++l)a.push(t.getPointPositionForValue(l,o));return a}function so(n,t,e){let i=sp(t),{chart:s,index:r,line:o,scale:a,axis:l}=t,c=o.options,d=c.fill,h=c.backgroundColor,{above:u=h,below:f=h}=d||{},p=s.getDatasetMeta(r),m=Xr(s,p);i&&o.points.length&&(Zn(n,e),cp(n,{line:o,target:i,above:u,below:f,area:e,scale:a,axis:l,clip:m}),Qn(n))}function cp(n,t){let{line:e,target:i,above:s,below:r,area:o,scale:a,clip:l}=t,c=e._loop?"angle":t.axis;n.save();let d=r;r!==s&&(c==="x"?(tc(n,i,o.top),ro(n,{line:e,target:i,color:s,scale:a,property:c,clip:l}),n.restore(),n.save(),tc(n,i,o.bottom)):c==="y"&&(ec(n,i,o.left),ro(n,{line:e,target:i,color:r,scale:a,property:c,clip:l}),n.restore(),n.save(),ec(n,i,o.right),d=s)),ro(n,{line:e,target:i,color:d,scale:a,property:c,clip:l}),n.restore()}function tc(n,t,e){let{segments:i,points:s}=t,r=!0,o=!1;n.beginPath();for(let a of i){let{start:l,end:c}=a,d=s[l],h=s[bs(l,c,s)];r?(n.moveTo(d.x,d.y),r=!1):(n.lineTo(d.x,e),n.lineTo(d.x,d.y)),o=!!t.pathSegment(n,a,{move:o}),o?n.closePath():n.lineTo(h.x,e)}n.lineTo(t.first().x,e),n.closePath(),n.clip()}function ec(n,t,e){let{segments:i,points:s}=t,r=!0,o=!1;n.beginPath();for(let a of i){let{start:l,end:c}=a,d=s[l],h=s[bs(l,c,s)];r?(n.moveTo(d.x,d.y),r=!1):(n.lineTo(e,d.y),n.lineTo(d.x,d.y)),o=!!t.pathSegment(n,a,{move:o}),o?n.closePath():n.lineTo(e,h.y)}n.lineTo(e,t.first().y),n.closePath(),n.clip()}function ro(n,t){let{line:e,target:i,property:s,color:r,scale:o,clip:a}=t,l=jf(e,i,s);for(let{source:c,target:d,start:h,end:u}of l){let{style:{backgroundColor:f=r}={}}=c,p=i!==!0;n.save(),n.fillStyle=f,dp(n,o,a,p&&yo(s,h,u)),n.beginPath();let m=!!e.pathSegment(n,c),g;if(p){m?n.closePath():nc(n,i,u,s);let _=!!i.pathSegment(n,d,{move:m,reverse:!0});g=m&&_,g||nc(n,i,h,s)}n.closePath(),n.fill(g?"evenodd":"nonzero"),n.restore()}}function dp(n,t,e,i){let s=t.chart.chartArea,{property:r,start:o,end:a}=i||{};if(r==="x"||r==="y"){let l,c,d,h;r==="x"?(l=o,c=s.top,d=a,h=s.bottom):(l=s.left,c=o,d=s.right,h=a),n.beginPath(),e&&(l=Math.max(l,e.left),d=Math.min(d,e.right),c=Math.max(c,e.top),h=Math.min(h,e.bottom)),n.rect(l,c,d-l,h-c),n.clip()}}function nc(n,t,e,i){let s=t.interpolate(e,i);s&&n.lineTo(s.x,s.y)}var hp={id:"filler",afterDatasetsUpdate(n,t,e){let i=(n.data.datasets||[]).length,s=[],r,o,a,l;for(o=0;o<i;++o)r=n.getDatasetMeta(o),a=r.dataset,l=null,a&&a.options&&a instanceof de&&(l={visible:n.isDatasetVisible(o),index:o,fill:Kf(a,o,i),chart:n,axis:r.controller.options.indexAxis,scale:r.vScale,line:a}),r.$filler=l,s.push(l);for(o=0;o<i;++o)l=s[o],!(!l||l.fill===!1)&&(l.fill=Xf(s,o,e.propagate))},beforeDraw(n,t,e){let i=e.drawTime==="beforeDraw",s=n.getSortedVisibleDatasetMetas(),r=n.chartArea;for(let o=s.length-1;o>=0;--o){let a=s[o].$filler;a&&(a.line.updateControlPoints(r,a.axis),i&&a.fill&&so(n.ctx,a,r))}},beforeDatasetsDraw(n,t,e){if(e.drawTime!=="beforeDatasetsDraw")return;let i=n.getSortedVisibleDatasetMetas();for(let s=i.length-1;s>=0;--s){let r=i[s].$filler;Ql(r)&&so(n.ctx,r,n.chartArea)}},beforeDatasetDraw(n,t,e){let i=t.meta.$filler;!Ql(i)||e.drawTime!=="beforeDatasetDraw"||so(n.ctx,i,n.chartArea)},defaults:{propagate:!0,drawTime:"beforeDatasetDraw"}},ic=(n,t)=>{let{boxHeight:e=t,boxWidth:i=t}=n;return n.usePointStyle&&(e=Math.min(e,t),i=n.pointStyleWidth||Math.min(i,t)),{boxWidth:i,boxHeight:e,itemHeight:Math.max(t,e)}},up=(n,t)=>n!==null&&t!==null&&n.datasetIndex===t.datasetIndex&&n.index===t.index,_s=class extends Wt{constructor(t){super(),this._added=!1,this.legendHitBoxes=[],this._hoveredItem=null,this.doughnutMode=!1,this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this.legendItems=void 0,this.columnSizes=void 0,this.lineWidths=void 0,this.maxHeight=void 0,this.maxWidth=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.height=void 0,this.width=void 0,this._margins=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,e,i){this.maxWidth=t,this.maxHeight=e,this._margins=i,this.setDimensions(),this.buildLabels(),this.fit()}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=this._margins.left,this.right=this.width):(this.height=this.maxHeight,this.top=this._margins.top,this.bottom=this.height)}buildLabels(){let t=this.options.labels||{},e=et(t.generateLabels,[this.chart],this)||[];t.filter&&(e=e.filter(i=>t.filter(i,this.chart.data))),t.sort&&(e=e.sort((i,s)=>t.sort(i,s,this.chart.data))),this.options.reverse&&e.reverse(),this.legendItems=e}fit(){let{options:t,ctx:e}=this;if(!t.display){this.width=this.height=0;return}let i=t.labels,s=yt(i.font),r=s.size,o=this._computeTitleHeight(),{boxWidth:a,itemHeight:l}=ic(i,r),c,d;e.font=s.string,this.isHorizontal()?(c=this.maxWidth,d=this._fitRows(o,r,a,l)+10):(d=this.maxHeight,c=this._fitCols(o,s,a,l)+10),this.width=Math.min(c,t.maxWidth||this.maxWidth),this.height=Math.min(d,t.maxHeight||this.maxHeight)}_fitRows(t,e,i,s){let{ctx:r,maxWidth:o,options:{labels:{padding:a}}}=this,l=this.legendHitBoxes=[],c=this.lineWidths=[0],d=s+a,h=t;r.textAlign="left",r.textBaseline="middle";let u=-1,f=-d;return this.legendItems.forEach((p,m)=>{let g=i+e/2+r.measureText(p.text).width;(m===0||c[c.length-1]+g+2*a>o)&&(h+=d,c[c.length-(m>0?0:1)]=0,f+=d,u++),l[m]={left:0,top:f,row:u,width:g,height:s},c[c.length-1]+=g+a}),h}_fitCols(t,e,i,s){let{ctx:r,maxHeight:o,options:{labels:{padding:a}}}=this,l=this.legendHitBoxes=[],c=this.columnSizes=[],d=o-t,h=a,u=0,f=0,p=0,m=0;return this.legendItems.forEach((g,_)=>{let{itemWidth:b,itemHeight:k}=fp(i,e,r,g,s);_>0&&f+k+2*a>d&&(h+=u+a,c.push({width:u,height:f}),p+=u+a,m++,u=f=0),l[_]={left:p,top:f,col:m,width:b,height:k},u=Math.max(u,b),f+=k+a}),h+=u,c.push({width:u,height:f}),h}adjustHitBoxes(){if(!this.options.display)return;let t=this._computeTitleHeight(),{legendHitBoxes:e,options:{align:i,labels:{padding:s},rtl:r}}=this,o=Ue(r,this.left,this.width);if(this.isHorizontal()){let a=0,l=Mt(i,this.left+s,this.right-this.lineWidths[a]);for(let c of e)a!==c.row&&(a=c.row,l=Mt(i,this.left+s,this.right-this.lineWidths[a])),c.top+=this.top+t+s,c.left=o.leftForLtr(o.x(l),c.width),l+=c.width+s}else{let a=0,l=Mt(i,this.top+t+s,this.bottom-this.columnSizes[a].height);for(let c of e)c.col!==a&&(a=c.col,l=Mt(i,this.top+t+s,this.bottom-this.columnSizes[a].height)),c.top=l,c.left+=this.left+s,c.left=o.leftForLtr(o.x(c.left),c.width),l+=c.height+s}}isHorizontal(){return this.options.position==="top"||this.options.position==="bottom"}draw(){if(this.options.display){let t=this.ctx;Zn(t,this),this._draw(),Qn(t)}}_draw(){let{options:t,columnSizes:e,lineWidths:i,ctx:s}=this,{align:r,labels:o}=t,a=dt.color,l=Ue(t.rtl,this.left,this.width),c=yt(o.font),{padding:d}=o,h=c.size,u=h/2,f;this.drawTitle(),s.textAlign=l.textAlign("left"),s.textBaseline="middle",s.lineWidth=.5,s.font=c.string;let{boxWidth:p,boxHeight:m,itemHeight:g}=ic(o,h),_=function(T,w,v){if(isNaN(p)||p<=0||isNaN(m)||m<0)return;s.save();let E=z(v.lineWidth,1);if(s.fillStyle=z(v.fillStyle,a),s.lineCap=z(v.lineCap,"butt"),s.lineDashOffset=z(v.lineDashOffset,0),s.lineJoin=z(v.lineJoin,"miter"),s.lineWidth=E,s.strokeStyle=z(v.strokeStyle,a),s.setLineDash(z(v.lineDash,[])),o.usePointStyle){let C={radius:m*Math.SQRT2/2,pointStyle:v.pointStyle,rotation:v.rotation,borderWidth:E},R=l.xPlus(T,p/2),F=w+u;Ir(s,C,R,F,o.pointStyleWidth&&p)}else{let C=w+Math.max((h-m)/2,0),R=l.leftForLtr(T,p),F=Ce(v.borderRadius);s.beginPath(),Object.values(F).some(X=>X!==0)?yn(s,{x:R,y:C,w:p,h:m,radius:F}):s.rect(R,C,p,m),s.fill(),E!==0&&s.stroke()}s.restore()},b=function(T,w,v){Ae(s,v.text,T,w+g/2,c,{strikethrough:v.hidden,textAlign:l.textAlign(v.textAlign)})},k=this.isHorizontal(),y=this._computeTitleHeight();k?f={x:Mt(r,this.left+d,this.right-i[0]),y:this.top+d+y,line:0}:f={x:this.left+d,y:Mt(r,this.top+y+d,this.bottom-e[0].height),line:0},Yr(this.ctx,t.textDirection);let x=g+d;this.legendItems.forEach((T,w)=>{s.strokeStyle=T.fontColor,s.fillStyle=T.fontColor;let v=s.measureText(T.text).width,E=l.textAlign(T.textAlign||(T.textAlign=o.textAlign)),C=p+u+v,R=f.x,F=f.y;l.setWidth(this.width),k?w>0&&R+C+d>this.right&&(F=f.y+=x,f.line++,R=f.x=Mt(r,this.left+d,this.right-i[f.line])):w>0&&F+x>this.bottom&&(R=f.x=R+e[f.line].width+d,f.line++,F=f.y=Mt(r,this.top+y+d,this.bottom-e[f.line].height));let X=l.x(R);if(_(X,F,T),R=il(E,R+p+u,k?R+C:this.right,t.rtl),b(l.x(R),F,T),k)f.x+=C+d;else if(typeof T.text!="string"){let $=c.lineHeight;f.y+=Ic(T,$)+d}else f.y+=x}),$r(this.ctx,t.textDirection)}drawTitle(){let t=this.options,e=t.title,i=yt(e.font),s=Dt(e.padding);if(!e.display)return;let r=Ue(t.rtl,this.left,this.width),o=this.ctx,a=e.position,l=i.size/2,c=s.top+l,d,h=this.left,u=this.width;if(this.isHorizontal())u=Math.max(...this.lineWidths),d=this.top+c,h=Mt(t.align,h,this.right-u);else{let p=this.columnSizes.reduce((m,g)=>Math.max(m,g.height),0);d=c+Mt(t.align,this.top,this.bottom-p-t.labels.padding-this._computeTitleHeight())}let f=Mt(a,h,h+u);o.textAlign=r.textAlign(qi(a)),o.textBaseline="middle",o.strokeStyle=e.color,o.fillStyle=e.color,o.font=i.string,Ae(o,e.text,f,d,i)}_computeTitleHeight(){let t=this.options.title,e=yt(t.font),i=Dt(t.padding);return t.display?e.lineHeight+i.height:0}_getLegendItemAt(t,e){let i,s,r;if(ae(t,this.left,this.right)&&ae(e,this.top,this.bottom)){for(r=this.legendHitBoxes,i=0;i<r.length;++i)if(s=r[i],ae(t,s.left,s.left+s.width)&&ae(e,s.top,s.top+s.height))return this.legendItems[i]}return null}handleEvent(t){let e=this.options;if(!gp(t.type,e))return;let i=this._getLegendItemAt(t.x,t.y);if(t.type==="mousemove"||t.type==="mouseout"){let s=this._hoveredItem,r=up(s,i);s&&!r&&et(e.onLeave,[t,s,this],this),this._hoveredItem=i,i&&!r&&et(e.onHover,[t,i,this],this)}else i&&et(e.onClick,[t,i,this],this)}};function fp(n,t,e,i,s){let r=pp(i,n,t,e),o=mp(s,i,t.lineHeight);return{itemWidth:r,itemHeight:o}}function pp(n,t,e,i){let s=n.text;return s&&typeof s!="string"&&(s=s.reduce((r,o)=>r.length>o.length?r:o)),t+e.size/2+i.measureText(s).width}function mp(n,t,e){let i=n;return typeof t.text!="string"&&(i=Ic(t,e)),i}function Ic(n,t){let e=n.text?n.text.length:0;return t*e}function gp(n,t){return!!((n==="mousemove"||n==="mouseout")&&(t.onHover||t.onLeave)||t.onClick&&(n==="click"||n==="mouseup"))}var _p={id:"legend",_element:_s,start(n,t,e){let i=n.legend=new _s({ctx:n.ctx,options:e,chart:n});Ct.configure(n,i,e),Ct.addBox(n,i)},stop(n){Ct.removeBox(n,n.legend),delete n.legend},beforeUpdate(n,t,e){let i=n.legend;Ct.configure(n,i,e),i.options=e},afterUpdate(n){let t=n.legend;t.buildLabels(),t.adjustHitBoxes()},afterEvent(n,t){t.replay||n.legend.handleEvent(t.event)},defaults:{display:!0,position:"top",align:"center",fullSize:!0,reverse:!1,weight:1e3,onClick(n,t,e){let i=t.datasetIndex,s=e.chart;s.isDatasetVisible(i)?(s.hide(i),t.hidden=!0):(s.show(i),t.hidden=!1)},onHover:null,onLeave:null,labels:{color:n=>n.chart.options.color,boxWidth:40,padding:10,generateLabels(n){let t=n.data.datasets,{labels:{usePointStyle:e,pointStyle:i,textAlign:s,color:r,useBorderRadius:o,borderRadius:a}}=n.legend.options;return n._getSortedDatasetMetas().map(l=>{let c=l.controller.getStyle(e?0:void 0),d=Dt(c.borderWidth);return{text:t[l.index].label,fillStyle:c.backgroundColor,fontColor:r,hidden:!l.visible,lineCap:c.borderCapStyle,lineDash:c.borderDash,lineDashOffset:c.borderDashOffset,lineJoin:c.borderJoinStyle,lineWidth:(d.width+d.height)/4,strokeStyle:c.borderColor,pointStyle:i||c.pointStyle,rotation:c.rotation,textAlign:s||c.textAlign,borderRadius:o&&(a||c.borderRadius),datasetIndex:l.index}},this)}},title:{color:n=>n.chart.options.color,display:!1,position:"center",text:""}},descriptors:{_scriptable:n=>!n.startsWith("on"),labels:{_scriptable:n=>!["generateLabels","filter","sort"].includes(n)}}},pi=class extends Wt{constructor(t){super(),this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this._padding=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,e){let i=this.options;if(this.left=0,this.top=0,!i.display){this.width=this.height=this.right=this.bottom=0;return}this.width=this.right=t,this.height=this.bottom=e;let s=st(i.text)?i.text.length:1;this._padding=Dt(i.padding);let r=s*yt(i.font).lineHeight+this._padding.height;this.isHorizontal()?this.height=r:this.width=r}isHorizontal(){let t=this.options.position;return t==="top"||t==="bottom"}_drawArgs(t){let{top:e,left:i,bottom:s,right:r,options:o}=this,a=o.align,l=0,c,d,h;return this.isHorizontal()?(d=Mt(a,i,r),h=e+t,c=r-i):(o.position==="left"?(d=i+t,h=Mt(a,s,e),l=q*-.5):(d=r-t,h=Mt(a,e,s),l=q*.5),c=s-e),{titleX:d,titleY:h,maxWidth:c,rotation:l}}draw(){let t=this.ctx,e=this.options;if(!e.display)return;let i=yt(e.font),r=i.lineHeight/2+this._padding.top,{titleX:o,titleY:a,maxWidth:l,rotation:c}=this._drawArgs(r);Ae(t,e.text,0,0,i,{color:e.color,maxWidth:l,rotation:c,textAlign:qi(e.align),textBaseline:"middle",translation:[o,a]})}};function bp(n,t){let e=new pi({ctx:n.ctx,options:t,chart:n});Ct.configure(n,e,t),Ct.addBox(n,e),n.titleBlock=e}var yp={id:"title",_element:pi,start(n,t,e){bp(n,e)},stop(n){let t=n.titleBlock;Ct.removeBox(n,t),delete n.titleBlock},beforeUpdate(n,t,e){let i=n.titleBlock;Ct.configure(n,i,e),i.options=e},defaults:{align:"center",display:!1,font:{weight:"bold"},fullSize:!0,padding:10,position:"top",text:"",weight:2e3},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}},as=new WeakMap,vp={id:"subtitle",start(n,t,e){let i=new pi({ctx:n.ctx,options:e,chart:n});Ct.configure(n,i,e),Ct.addBox(n,i),as.set(n,i)},stop(n){Ct.removeBox(n,as.get(n)),as.delete(n)},beforeUpdate(n,t,e){let i=as.get(n);Ct.configure(n,i,e),i.options=e},defaults:{align:"center",display:!1,font:{weight:"normal"},fullSize:!0,padding:0,position:"top",text:"",weight:1500},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}},ai={average(n){if(!n.length)return!1;let t,e,i=new Set,s=0,r=0;for(t=0,e=n.length;t<e;++t){let a=n[t].element;if(a&&a.hasValue()){let l=a.tooltipPosition();i.add(l.x),s+=l.y,++r}}return r===0||i.size===0?!1:{x:[...i].reduce((a,l)=>a+l)/i.size,y:s/r}},nearest(n,t){if(!n.length)return!1;let e=t.x,i=t.y,s=Number.POSITIVE_INFINITY,r,o,a;for(r=0,o=n.length;r<o;++r){let l=n[r].element;if(l&&l.hasValue()){let c=l.getCenterPoint(),d=$i(t,c);d<s&&(s=d,a=l)}}if(a){let l=a.tooltipPosition();e=l.x,i=l.y}return{x:e,y:i}}};function le(n,t){return t&&(st(t)?Array.prototype.push.apply(n,t):n.push(t)),n}function be(n){return(typeof n=="string"||n instanceof String)&&n.indexOf(`
`)>-1?n.split(`
`):n}function xp(n,t){let{element:e,datasetIndex:i,index:s}=t,r=n.getDatasetMeta(i).controller,{label:o,value:a}=r.getLabelAndValue(s);return{chart:n,label:o,parsed:r.getParsed(s),raw:n.data.datasets[i].data[s],formattedValue:a,dataset:r.getDataset(),dataIndex:s,datasetIndex:i,element:e}}function sc(n,t){let e=n.chart.ctx,{body:i,footer:s,title:r}=n,{boxWidth:o,boxHeight:a}=t,l=yt(t.bodyFont),c=yt(t.titleFont),d=yt(t.footerFont),h=r.length,u=s.length,f=i.length,p=Dt(t.padding),m=p.height,g=0,_=i.reduce((y,x)=>y+x.before.length+x.lines.length+x.after.length,0);if(_+=n.beforeBody.length+n.afterBody.length,h&&(m+=h*c.lineHeight+(h-1)*t.titleSpacing+t.titleMarginBottom),_){let y=t.displayColors?Math.max(a,l.lineHeight):l.lineHeight;m+=f*y+(_-f)*l.lineHeight+(_-1)*t.bodySpacing}u&&(m+=t.footerMarginTop+u*d.lineHeight+(u-1)*t.footerSpacing);let b=0,k=function(y){g=Math.max(g,e.measureText(y).width+b)};return e.save(),e.font=c.string,Z(n.title,k),e.font=l.string,Z(n.beforeBody.concat(n.afterBody),k),b=t.displayColors?o+2+t.boxPadding:0,Z(i,y=>{Z(y.before,k),Z(y.lines,k),Z(y.after,k)}),b=0,e.font=d.string,Z(n.footer,k),e.restore(),g+=p.width,{width:g,height:m}}function kp(n,t){let{y:e,height:i}=t;return e<i/2?"top":e>n.height-i/2?"bottom":"center"}function Tp(n,t,e,i){let{x:s,width:r}=i,o=e.caretSize+e.caretPadding;if(n==="left"&&s+r+o>t.width||n==="right"&&s-r-o<0)return!0}function Sp(n,t,e,i){let{x:s,width:r}=e,{width:o,chartArea:{left:a,right:l}}=n,c="center";return i==="center"?c=s<=(a+l)/2?"left":"right":s<=r/2?c="left":s>=o-r/2&&(c="right"),Tp(c,n,t,e)&&(c="center"),c}function rc(n,t,e){let i=e.yAlign||t.yAlign||kp(n,e);return{xAlign:e.xAlign||t.xAlign||Sp(n,t,e,i),yAlign:i}}function wp(n,t){let{x:e,width:i}=n;return t==="right"?e-=i:t==="center"&&(e-=i/2),e}function Ep(n,t,e){let{y:i,height:s}=n;return t==="top"?i+=e:t==="bottom"?i-=s+e:i-=s/2,i}function oc(n,t,e,i){let{caretSize:s,caretPadding:r,cornerRadius:o}=n,{xAlign:a,yAlign:l}=e,c=s+r,{topLeft:d,topRight:h,bottomLeft:u,bottomRight:f}=Ce(o),p=wp(t,a),m=Ep(t,l,c);return l==="center"?a==="left"?p+=c:a==="right"&&(p-=c):a==="left"?p-=Math.max(d,u)+s:a==="right"&&(p+=Math.max(h,f)+s),{x:Tt(p,0,i.width-t.width),y:Tt(m,0,i.height-t.height)}}function ls(n,t,e){let i=Dt(e.padding);return t==="center"?n.x+n.width/2:t==="right"?n.x+n.width-i.right:n.x+i.left}function ac(n){return le([],be(n))}function Mp(n,t,e){return ge(n,{tooltip:t,tooltipItems:e,type:"tooltip"})}function lc(n,t){let e=t&&t.dataset&&t.dataset.tooltip&&t.dataset.tooltip.callbacks;return e?n.override(e):n}var Nc={beforeTitle:oe,title(n){if(n.length>0){let t=n[0],e=t.chart.data.labels,i=e?e.length:0;if(this&&this.options&&this.options.mode==="dataset")return t.dataset.label||"";if(t.label)return t.label;if(i>0&&t.dataIndex<i)return e[t.dataIndex]}return""},afterTitle:oe,beforeBody:oe,beforeLabel:oe,label(n){if(this&&this.options&&this.options.mode==="dataset")return n.label+": "+n.formattedValue||n.formattedValue;let t=n.dataset.label||"";t&&(t+=": ");let e=n.formattedValue;return Y(e)||(t+=e),t},labelColor(n){let e=n.chart.getDatasetMeta(n.datasetIndex).controller.getStyle(n.dataIndex);return{borderColor:e.borderColor,backgroundColor:e.backgroundColor,borderWidth:e.borderWidth,borderDash:e.borderDash,borderDashOffset:e.borderDashOffset,borderRadius:0}},labelTextColor(){return this.options.bodyColor},labelPointStyle(n){let e=n.chart.getDatasetMeta(n.datasetIndex).controller.getStyle(n.dataIndex);return{pointStyle:e.pointStyle,rotation:e.rotation}},afterLabel:oe,afterBody:oe,beforeFooter:oe,footer:oe,afterFooter:oe};function Ft(n,t,e,i){let s=n[t].call(e,i);return typeof s>"u"?Nc[t].call(e,i):s}var ui=class extends Wt{constructor(t){super(),this.opacity=0,this._active=[],this._eventPosition=void 0,this._size=void 0,this._cachedAnimations=void 0,this._tooltipItems=[],this.$animations=void 0,this.$context=void 0,this.chart=t.chart,this.options=t.options,this.dataPoints=void 0,this.title=void 0,this.beforeBody=void 0,this.body=void 0,this.afterBody=void 0,this.footer=void 0,this.xAlign=void 0,this.yAlign=void 0,this.x=void 0,this.y=void 0,this.height=void 0,this.width=void 0,this.caretX=void 0,this.caretY=void 0,this.labelColors=void 0,this.labelPointStyles=void 0,this.labelTextColors=void 0}initialize(t){this.options=t,this._cachedAnimations=void 0,this.$context=void 0}_resolveAnimations(){let t=this._cachedAnimations;if(t)return t;let e=this.chart,i=this.options.setContext(this.getContext()),s=i.enabled&&e.options.animation&&i.animations,r=new us(this.chart,s);return s._cacheable&&(this._cachedAnimations=Object.freeze(r)),r}getContext(){return this.$context||(this.$context=Mp(this.chart.getContext(),this,this._tooltipItems))}getTitle(t,e){let{callbacks:i}=e,s=Ft(i,"beforeTitle",this,t),r=Ft(i,"title",this,t),o=Ft(i,"afterTitle",this,t),a=[];return a=le(a,be(s)),a=le(a,be(r)),a=le(a,be(o)),a}getBeforeBody(t,e){return ac(Ft(e.callbacks,"beforeBody",this,t))}getBody(t,e){let{callbacks:i}=e,s=[];return Z(t,r=>{let o={before:[],lines:[],after:[]},a=lc(i,r);le(o.before,be(Ft(a,"beforeLabel",this,r))),le(o.lines,Ft(a,"label",this,r)),le(o.after,be(Ft(a,"afterLabel",this,r))),s.push(o)}),s}getAfterBody(t,e){return ac(Ft(e.callbacks,"afterBody",this,t))}getFooter(t,e){let{callbacks:i}=e,s=Ft(i,"beforeFooter",this,t),r=Ft(i,"footer",this,t),o=Ft(i,"afterFooter",this,t),a=[];return a=le(a,be(s)),a=le(a,be(r)),a=le(a,be(o)),a}_createItems(t){let e=this._active,i=this.chart.data,s=[],r=[],o=[],a=[],l,c;for(l=0,c=e.length;l<c;++l)a.push(xp(this.chart,e[l]));return t.filter&&(a=a.filter((d,h,u)=>t.filter(d,h,u,i))),t.itemSort&&(a=a.sort((d,h)=>t.itemSort(d,h,i))),Z(a,d=>{let h=lc(t.callbacks,d);s.push(Ft(h,"labelColor",this,d)),r.push(Ft(h,"labelPointStyle",this,d)),o.push(Ft(h,"labelTextColor",this,d))}),this.labelColors=s,this.labelPointStyles=r,this.labelTextColors=o,this.dataPoints=a,a}update(t,e){let i=this.options.setContext(this.getContext()),s=this._active,r,o=[];if(!s.length)this.opacity!==0&&(r={opacity:0});else{let a=ai[i.position].call(this,s,this._eventPosition);o=this._createItems(i),this.title=this.getTitle(o,i),this.beforeBody=this.getBeforeBody(o,i),this.body=this.getBody(o,i),this.afterBody=this.getAfterBody(o,i),this.footer=this.getFooter(o,i);let l=this._size=sc(this,i),c=Object.assign({},a,l),d=rc(this.chart,i,c),h=oc(i,c,d,this.chart);this.xAlign=d.xAlign,this.yAlign=d.yAlign,r={opacity:1,x:h.x,y:h.y,width:l.width,height:l.height,caretX:a.x,caretY:a.y}}this._tooltipItems=o,this.$context=void 0,r&&this._resolveAnimations().update(this,r),t&&i.external&&i.external.call(this,{chart:this.chart,tooltip:this,replay:e})}drawCaret(t,e,i,s){let r=this.getCaretPosition(t,i,s);e.lineTo(r.x1,r.y1),e.lineTo(r.x2,r.y2),e.lineTo(r.x3,r.y3)}getCaretPosition(t,e,i){let{xAlign:s,yAlign:r}=this,{caretSize:o,cornerRadius:a}=i,{topLeft:l,topRight:c,bottomLeft:d,bottomRight:h}=Ce(a),{x:u,y:f}=t,{width:p,height:m}=e,g,_,b,k,y,x;return r==="center"?(y=f+m/2,s==="left"?(g=u,_=g-o,k=y+o,x=y-o):(g=u+p,_=g+o,k=y-o,x=y+o),b=g):(s==="left"?_=u+Math.max(l,d)+o:s==="right"?_=u+p-Math.max(c,h)-o:_=this.caretX,r==="top"?(k=f,y=k-o,g=_-o,b=_+o):(k=f+m,y=k+o,g=_+o,b=_-o),x=k),{x1:g,x2:_,x3:b,y1:k,y2:y,y3:x}}drawTitle(t,e,i){let s=this.title,r=s.length,o,a,l;if(r){let c=Ue(i.rtl,this.x,this.width);for(t.x=ls(this,i.titleAlign,i),e.textAlign=c.textAlign(i.titleAlign),e.textBaseline="middle",o=yt(i.titleFont),a=i.titleSpacing,e.fillStyle=i.titleColor,e.font=o.string,l=0;l<r;++l)e.fillText(s[l],c.x(t.x),t.y+o.lineHeight/2),t.y+=o.lineHeight+a,l+1===r&&(t.y+=i.titleMarginBottom-a)}}_drawColorBox(t,e,i,s,r){let o=this.labelColors[i],a=this.labelPointStyles[i],{boxHeight:l,boxWidth:c}=r,d=yt(r.bodyFont),h=ls(this,"left",r),u=s.x(h),f=l<d.lineHeight?(d.lineHeight-l)/2:0,p=e.y+f;if(r.usePointStyle){let m={radius:Math.min(c,l)/2,pointStyle:a.pointStyle,rotation:a.rotation,borderWidth:1},g=s.leftForLtr(u,c)+c/2,_=p+l/2;t.strokeStyle=r.multiKeyBackground,t.fillStyle=r.multiKeyBackground,Zi(t,m,g,_),t.strokeStyle=o.borderColor,t.fillStyle=o.backgroundColor,Zi(t,m,g,_)}else{t.lineWidth=j(o.borderWidth)?Math.max(...Object.values(o.borderWidth)):o.borderWidth||1,t.strokeStyle=o.borderColor,t.setLineDash(o.borderDash||[]),t.lineDashOffset=o.borderDashOffset||0;let m=s.leftForLtr(u,c),g=s.leftForLtr(s.xPlus(u,1),c-2),_=Ce(o.borderRadius);Object.values(_).some(b=>b!==0)?(t.beginPath(),t.fillStyle=r.multiKeyBackground,yn(t,{x:m,y:p,w:c,h:l,radius:_}),t.fill(),t.stroke(),t.fillStyle=o.backgroundColor,t.beginPath(),yn(t,{x:g,y:p+1,w:c-2,h:l-2,radius:_}),t.fill()):(t.fillStyle=r.multiKeyBackground,t.fillRect(m,p,c,l),t.strokeRect(m,p,c,l),t.fillStyle=o.backgroundColor,t.fillRect(g,p+1,c-2,l-2))}t.fillStyle=this.labelTextColors[i]}drawBody(t,e,i){let{body:s}=this,{bodySpacing:r,bodyAlign:o,displayColors:a,boxHeight:l,boxWidth:c,boxPadding:d}=i,h=yt(i.bodyFont),u=h.lineHeight,f=0,p=Ue(i.rtl,this.x,this.width),m=function(v){e.fillText(v,p.x(t.x+f),t.y+u/2),t.y+=u+r},g=p.textAlign(o),_,b,k,y,x,T,w;for(e.textAlign=o,e.textBaseline="middle",e.font=h.string,t.x=ls(this,g,i),e.fillStyle=i.bodyColor,Z(this.beforeBody,m),f=a&&g!=="right"?o==="center"?c/2+d:c+2+d:0,y=0,T=s.length;y<T;++y){for(_=s[y],b=this.labelTextColors[y],e.fillStyle=b,Z(_.before,m),k=_.lines,a&&k.length&&(this._drawColorBox(e,t,y,p,i),u=Math.max(h.lineHeight,l)),x=0,w=k.length;x<w;++x)m(k[x]),u=h.lineHeight;Z(_.after,m)}f=0,u=h.lineHeight,Z(this.afterBody,m),t.y-=r}drawFooter(t,e,i){let s=this.footer,r=s.length,o,a;if(r){let l=Ue(i.rtl,this.x,this.width);for(t.x=ls(this,i.footerAlign,i),t.y+=i.footerMarginTop,e.textAlign=l.textAlign(i.footerAlign),e.textBaseline="middle",o=yt(i.footerFont),e.fillStyle=i.footerColor,e.font=o.string,a=0;a<r;++a)e.fillText(s[a],l.x(t.x),t.y+o.lineHeight/2),t.y+=o.lineHeight+i.footerSpacing}}drawBackground(t,e,i,s){let{xAlign:r,yAlign:o}=this,{x:a,y:l}=t,{width:c,height:d}=i,{topLeft:h,topRight:u,bottomLeft:f,bottomRight:p}=Ce(s.cornerRadius);e.fillStyle=s.backgroundColor,e.strokeStyle=s.borderColor,e.lineWidth=s.borderWidth,e.beginPath(),e.moveTo(a+h,l),o==="top"&&this.drawCaret(t,e,i,s),e.lineTo(a+c-u,l),e.quadraticCurveTo(a+c,l,a+c,l+u),o==="center"&&r==="right"&&this.drawCaret(t,e,i,s),e.lineTo(a+c,l+d-p),e.quadraticCurveTo(a+c,l+d,a+c-p,l+d),o==="bottom"&&this.drawCaret(t,e,i,s),e.lineTo(a+f,l+d),e.quadraticCurveTo(a,l+d,a,l+d-f),o==="center"&&r==="left"&&this.drawCaret(t,e,i,s),e.lineTo(a,l+h),e.quadraticCurveTo(a,l,a+h,l),e.closePath(),e.fill(),s.borderWidth>0&&e.stroke()}_updateAnimationTarget(t){let e=this.chart,i=this.$animations,s=i&&i.x,r=i&&i.y;if(s||r){let o=ai[t.position].call(this,this._active,this._eventPosition);if(!o)return;let a=this._size=sc(this,t),l=Object.assign({},o,this._size),c=rc(e,t,l),d=oc(t,l,c,e);(s._to!==d.x||r._to!==d.y)&&(this.xAlign=c.xAlign,this.yAlign=c.yAlign,this.width=a.width,this.height=a.height,this.caretX=o.x,this.caretY=o.y,this._resolveAnimations().update(this,d))}}_willRender(){return!!this.opacity}draw(t){let e=this.options.setContext(this.getContext()),i=this.opacity;if(!i)return;this._updateAnimationTarget(e);let s={width:this.width,height:this.height},r={x:this.x,y:this.y};i=Math.abs(i)<.001?0:i;let o=Dt(e.padding),a=this.title.length||this.beforeBody.length||this.body.length||this.afterBody.length||this.footer.length;e.enabled&&a&&(t.save(),t.globalAlpha=i,this.drawBackground(r,t,s,e),Yr(t,e.textDirection),r.y+=o.top,this.drawTitle(r,t,e),this.drawBody(r,t,e),this.drawFooter(r,t,e),$r(t,e.textDirection),t.restore())}getActiveElements(){return this._active||[]}setActiveElements(t,e){let i=this._active,s=t.map(({datasetIndex:a,index:l})=>{let c=this.chart.getDatasetMeta(a);if(!c)throw new Error("Cannot find a dataset at index "+a);return{datasetIndex:a,element:c.data[l],index:l}}),r=!qn(i,s),o=this._positionChanged(s,e);(r||o)&&(this._active=s,this._eventPosition=e,this._ignoreReplayEvents=!0,this.update(!0))}handleEvent(t,e,i=!0){if(e&&this._ignoreReplayEvents)return!1;this._ignoreReplayEvents=!1;let s=this.options,r=this._active||[],o=this._getActiveElements(t,r,e,i),a=this._positionChanged(o,t),l=e||!qn(o,r)||a;return l&&(this._active=o,(s.enabled||s.external)&&(this._eventPosition={x:t.x,y:t.y},this.update(!0,e))),l}_getActiveElements(t,e,i,s){let r=this.options;if(t.type==="mouseout")return[];if(!s)return e.filter(a=>this.chart.data.datasets[a.datasetIndex]&&this.chart.getDatasetMeta(a.datasetIndex).controller.getParsed(a.index)!==void 0);let o=this.chart.getElementsAtEventForMode(t,r.mode,r,i);return r.reverse&&o.reverse(),o}_positionChanged(t,e){let{caretX:i,caretY:s,options:r}=this,o=ai[r.position].call(this,t,e);return o!==!1&&(i!==o.x||s!==o.y)}};A(ui,"positioners",ai);var Dp={id:"tooltip",_element:ui,positioners:ai,afterInit(n,t,e){e&&(n.tooltip=new ui({chart:n,options:e}))},beforeUpdate(n,t,e){n.tooltip&&n.tooltip.initialize(e)},reset(n,t,e){n.tooltip&&n.tooltip.initialize(e)},afterDraw(n){let t=n.tooltip;if(t&&t._willRender()){let e={tooltip:t};if(n.notifyPlugins("beforeTooltipDraw",{...e,cancelable:!0})===!1)return;t.draw(n.ctx),n.notifyPlugins("afterTooltipDraw",e)}},afterEvent(n,t){if(n.tooltip){let e=t.replay;n.tooltip.handleEvent(t.event,e,t.inChartArea)&&(t.changed=!0)}},defaults:{enabled:!0,external:null,position:"average",backgroundColor:"rgba(0,0,0,0.8)",titleColor:"#fff",titleFont:{weight:"bold"},titleSpacing:2,titleMarginBottom:6,titleAlign:"left",bodyColor:"#fff",bodySpacing:2,bodyFont:{},bodyAlign:"left",footerColor:"#fff",footerSpacing:2,footerMarginTop:6,footerFont:{weight:"bold"},footerAlign:"left",padding:6,caretPadding:2,caretSize:5,cornerRadius:6,boxHeight:(n,t)=>t.bodyFont.size,boxWidth:(n,t)=>t.bodyFont.size,multiKeyBackground:"#fff",displayColors:!0,boxPadding:0,borderColor:"rgba(0,0,0,0)",borderWidth:0,animation:{duration:400,easing:"easeOutQuart"},animations:{numbers:{type:"number",properties:["x","y","width","height","caretX","caretY"]},opacity:{easing:"linear",duration:200}},callbacks:Nc},defaultRoutes:{bodyFont:"font",footerFont:"font",titleFont:"font"},descriptors:{_scriptable:n=>n!=="filter"&&n!=="itemSort"&&n!=="external",_indexable:!1,callbacks:{_scriptable:!1,_indexable:!1},animation:{_fallback:!1},animations:{_fallback:"animation"}},additionalOptionScopes:["interaction"]},Ap=Object.freeze({__proto__:null,Colors:Hf,Decimation:$f,Filler:hp,Legend:_p,SubTitle:vp,Title:yp,Tooltip:Dp}),Cp=(n,t,e,i)=>(typeof t=="string"?(e=n.push(t)-1,i.unshift({index:e,label:t})):isNaN(t)&&(e=null),e);function Rp(n,t,e,i){let s=n.indexOf(t);if(s===-1)return Cp(n,t,e,i);let r=n.lastIndexOf(t);return s!==r?e:s}var Op=(n,t)=>n===null?null:Tt(Math.round(n),0,t);function cc(n){let t=this.getLabels();return n>=0&&n<t.length?t[n]:n}var li=class extends qe{constructor(t){super(t),this._startValue=void 0,this._valueRange=0,this._addedLabels=[]}init(t){let e=this._addedLabels;if(e.length){let i=this.getLabels();for(let{index:s,label:r}of e)i[s]===r&&i.splice(s,1);this._addedLabels=[]}super.init(t)}parse(t,e){if(Y(t))return null;let i=this.getLabels();return e=isFinite(e)&&i[e]===t?e:Rp(i,t,z(e,t),this._addedLabels),Op(e,i.length-1)}determineDataLimits(){let{minDefined:t,maxDefined:e}=this.getUserBounds(),{min:i,max:s}=this.getMinMax(!0);this.options.bounds==="ticks"&&(t||(i=0),e||(s=this.getLabels().length-1)),this.min=i,this.max=s}buildTicks(){let t=this.min,e=this.max,i=this.options.offset,s=[],r=this.getLabels();r=t===0&&e===r.length-1?r:r.slice(t,e+1),this._valueRange=Math.max(r.length-(i?0:1),1),this._startValue=this.min-(i?.5:0);for(let o=t;o<=e;o++)s.push({value:o});return s}getLabelForValue(t){return cc.call(this,t)}configure(){super.configure(),this.isHorizontal()||(this._reversePixels=!this._reversePixels)}getPixelForValue(t){return typeof t!="number"&&(t=this.parse(t)),t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getPixelForTick(t){let e=this.ticks;return t<0||t>e.length-1?null:this.getPixelForValue(e[t].value)}getValueForPixel(t){return Math.round(this._startValue+this.getDecimalForPixel(t)*this._valueRange)}getBasePixel(){return this.bottom}};A(li,"id","category"),A(li,"defaults",{ticks:{callback:cc}});function Pp(n,t){let e=[],{bounds:s,step:r,min:o,max:a,precision:l,count:c,maxTicks:d,maxDigits:h,includeBounds:u}=n,f=r||1,p=d-1,{min:m,max:g}=t,_=!Y(o),b=!Y(a),k=!Y(c),y=(g-m)/(h+1),x=Tr((g-m)/p/f)*f,T,w,v,E;if(x<1e-14&&!_&&!b)return[{value:m},{value:g}];E=Math.ceil(g/x)-Math.floor(m/x),E>p&&(x=Tr(E*x/p/f)*f),Y(l)||(T=Math.pow(10,l),x=Math.ceil(x*T)/T),s==="ticks"?(w=Math.floor(m/x)*x,v=Math.ceil(g/x)*x):(w=m,v=g),_&&b&&r&&qa((a-o)/r,x/1e3)?(E=Math.round(Math.min((a-o)/x,d)),x=(a-o)/E,w=o,v=a):k?(w=_?o:w,v=b?a:v,E=c-1,x=(v-w)/E):(E=(v-w)/x,gn(E,Math.round(E),x/1e3)?E=Math.round(E):E=Math.ceil(E));let C=Math.max(wr(x),wr(w));T=Math.pow(10,Y(l)?C:l),w=Math.round(w*T)/T,v=Math.round(v*T)/T;let R=0;for(_&&(u&&w!==o?(e.push({value:o}),w<o&&R++,gn(Math.round((w+R*x)*T)/T,o,dc(o,y,n))&&R++):w<o&&R++);R<E;++R){let F=Math.round((w+R*x)*T)/T;if(b&&F>a)break;e.push({value:F})}return b&&u&&v!==a?e.length&&gn(e[e.length-1].value,a,dc(a,y,n))?e[e.length-1].value=a:e.push({value:a}):(!b||v===a)&&e.push({value:v}),e}function dc(n,t,{horizontal:e,minRotation:i}){let s=Kt(i),r=(e?Math.sin(s):Math.cos(s))||.001,o=.75*t*(""+n).length;return Math.min(t/r,o)}var Cn=class extends qe{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._endValue=void 0,this._valueRange=0}parse(t,e){return Y(t)||(typeof t=="number"||t instanceof Number)&&!isFinite(+t)?null:+t}handleTickRangeOptions(){let{beginAtZero:t}=this.options,{minDefined:e,maxDefined:i}=this.getUserBounds(),{min:s,max:r}=this,o=l=>s=e?s:l,a=l=>r=i?r:l;if(t){let l=Qt(s),c=Qt(r);l<0&&c<0?a(0):l>0&&c>0&&o(0)}if(s===r){let l=r===0?1:Math.abs(r*.05);a(r+l),t||o(s-l)}this.min=s,this.max=r}getTickLimit(){let t=this.options.ticks,{maxTicksLimit:e,stepSize:i}=t,s;return i?(s=Math.ceil(this.max/i)-Math.floor(this.min/i)+1,s>1e3&&(console.warn(`scales.${this.id}.ticks.stepSize: ${i} would result generating up to ${s} ticks. Limiting to 1000.`),s=1e3)):(s=this.computeTickLimit(),e=e||11),e&&(s=Math.min(e,s)),s}computeTickLimit(){return Number.POSITIVE_INFINITY}buildTicks(){let t=this.options,e=t.ticks,i=this.getTickLimit();i=Math.max(2,i);let s={maxTicks:i,bounds:t.bounds,min:t.min,max:t.max,precision:e.precision,step:e.stepSize,count:e.count,maxDigits:this._maxDigits(),horizontal:this.isHorizontal(),minRotation:e.minRotation||0,includeBounds:e.includeBounds!==!1},r=this._range||this,o=Pp(s,r);return t.bounds==="ticks"&&Sr(o,this,"value"),t.reverse?(o.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),o}configure(){let t=this.ticks,e=this.min,i=this.max;if(super.configure(),this.options.offset&&t.length){let s=(i-e)/Math.max(t.length-1,1)/2;e-=s,i+=s}this._startValue=e,this._endValue=i,this._valueRange=i-e}getLabelForValue(t){return bn(t,this.chart.options.locale,this.options.ticks.format)}},ci=class extends Cn{determineDataLimits(){let{min:t,max:e}=this.getMinMax(!0);this.min=pt(t)?t:0,this.max=pt(e)?e:1,this.handleTickRangeOptions()}computeTickLimit(){let t=this.isHorizontal(),e=t?this.width:this.height,i=Kt(this.options.ticks.minRotation),s=(t?Math.sin(i):Math.cos(i))||.001,r=this._resolveTickFontOptions(0);return Math.ceil(e/Math.min(40,r.lineHeight/s))}getPixelForValue(t){return t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getValueForPixel(t){return this._startValue+this.getDecimalForPixel(t)*this._valueRange}};A(ci,"id","linear"),A(ci,"defaults",{ticks:{callback:Jn.formatters.numeric}});var mi=n=>Math.floor(pe(n)),$e=(n,t)=>Math.pow(10,mi(n)+t);function hc(n){return n/Math.pow(10,mi(n))===1}function uc(n,t,e){let i=Math.pow(10,e),s=Math.floor(n/i);return Math.ceil(t/i)-s}function Lp(n,t){let e=t-n,i=mi(e);for(;uc(n,t,i)>10;)i++;for(;uc(n,t,i)<10;)i--;return Math.min(i,mi(n))}function Fp(n,{min:t,max:e}){t=Lt(n.min,t);let i=[],s=mi(t),r=Lp(t,e),o=r<0?Math.pow(10,Math.abs(r)):1,a=Math.pow(10,r),l=s>r?Math.pow(10,s):0,c=Math.round((t-l)*o)/o,d=Math.floor((t-l)/a/10)*a*10,h=Math.floor((c-d)/Math.pow(10,r)),u=Lt(n.min,Math.round((l+d+h*Math.pow(10,r))*o)/o);for(;u<e;)i.push({value:u,major:hc(u),significand:h}),h>=10?h=h<15?15:20:h++,h>=20&&(r++,h=2,o=r>=0?1:o),u=Math.round((l+d+h*Math.pow(10,r))*o)/o;let f=Lt(n.max,u);return i.push({value:f,major:hc(f),significand:h}),i}var di=class extends qe{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._valueRange=0}parse(t,e){let i=Cn.prototype.parse.apply(this,[t,e]);if(i===0){this._zero=!0;return}return pt(i)&&i>0?i:null}determineDataLimits(){let{min:t,max:e}=this.getMinMax(!0);this.min=pt(t)?Math.max(0,t):null,this.max=pt(e)?Math.max(0,e):null,this.options.beginAtZero&&(this._zero=!0),this._zero&&this.min!==this._suggestedMin&&!pt(this._userMin)&&(this.min=t===$e(this.min,0)?$e(this.min,-1):$e(this.min,0)),this.handleTickRangeOptions()}handleTickRangeOptions(){let{minDefined:t,maxDefined:e}=this.getUserBounds(),i=this.min,s=this.max,r=a=>i=t?i:a,o=a=>s=e?s:a;i===s&&(i<=0?(r(1),o(10)):(r($e(i,-1)),o($e(s,1)))),i<=0&&r($e(s,-1)),s<=0&&o($e(i,1)),this.min=i,this.max=s}buildTicks(){let t=this.options,e={min:this._userMin,max:this._userMax},i=Fp(e,this);return t.bounds==="ticks"&&Sr(i,this,"value"),t.reverse?(i.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),i}getLabelForValue(t){return t===void 0?"0":bn(t,this.chart.options.locale,this.options.ticks.format)}configure(){let t=this.min;super.configure(),this._startValue=pe(t),this._valueRange=pe(this.max)-pe(t)}getPixelForValue(t){return(t===void 0||t===0)&&(t=this.min),t===null||isNaN(t)?NaN:this.getPixelForDecimal(t===this.min?0:(pe(t)-this._startValue)/this._valueRange)}getValueForPixel(t){let e=this.getDecimalForPixel(t);return Math.pow(10,this._startValue+e*this._valueRange)}};A(di,"id","logarithmic"),A(di,"defaults",{ticks:{callback:Jn.formatters.logarithmic,major:{enabled:!0}}});function vo(n){let t=n.ticks;if(t.display&&n.display){let e=Dt(t.backdropPadding);return z(t.font&&t.font.size,dt.font.size)+e.height}return 0}function Ip(n,t,e){return e=st(e)?e:[e],{w:rl(n,t.string,e),h:e.length*t.lineHeight}}function fc(n,t,e,i,s){return n===i||n===s?{start:t-e/2,end:t+e/2}:n<i||n>s?{start:t-e,end:t}:{start:t,end:t+e}}function Np(n){let t={l:n.left+n._padding.left,r:n.right-n._padding.right,t:n.top+n._padding.top,b:n.bottom-n._padding.bottom},e=Object.assign({},t),i=[],s=[],r=n._pointLabels.length,o=n.options.pointLabels,a=o.centerPointLabels?q/r:0;for(let l=0;l<r;l++){let c=o.setContext(n.getPointLabelContext(l));s[l]=c.padding;let d=n.getPointPosition(l,n.drawingArea+s[l],a),h=yt(c.font),u=Ip(n.ctx,h,n._pointLabels[l]);i[l]=u;let f=Et(n.getIndexAngle(l)+a),p=Math.round(Xi(f)),m=fc(p,d.x,u.w,0,180),g=fc(p,d.y,u.h,90,270);Bp(e,t,f,m,g)}n.setCenterPoint(t.l-e.l,e.r-t.r,t.t-e.t,e.b-t.b),n._pointLabelItems=Hp(n,i,s)}function Bp(n,t,e,i,s){let r=Math.abs(Math.sin(e)),o=Math.abs(Math.cos(e)),a=0,l=0;i.start<t.l?(a=(t.l-i.start)/r,n.l=Math.min(n.l,t.l-a)):i.end>t.r&&(a=(i.end-t.r)/r,n.r=Math.max(n.r,t.r+a)),s.start<t.t?(l=(t.t-s.start)/o,n.t=Math.min(n.t,t.t-l)):s.end>t.b&&(l=(s.end-t.b)/o,n.b=Math.max(n.b,t.b+l))}function Vp(n,t,e){let i=n.drawingArea,{extra:s,additionalAngle:r,padding:o,size:a}=e,l=n.getPointPosition(t,i+s+o,r),c=Math.round(Xi(Et(l.angle+mt))),d=Yp(l.y,a.h,c),h=Wp(c),u=Up(l.x,a.w,h);return{visible:!0,x:l.x,y:d,textAlign:h,left:u,top:d,right:u+a.w,bottom:d+a.h}}function zp(n,t){if(!t)return!0;let{left:e,top:i,right:s,bottom:r}=n;return!(re({x:e,y:i},t)||re({x:e,y:r},t)||re({x:s,y:i},t)||re({x:s,y:r},t))}function Hp(n,t,e){let i=[],s=n._pointLabels.length,r=n.options,{centerPointLabels:o,display:a}=r.pointLabels,l={extra:vo(r)/2,additionalAngle:o?q/s:0},c;for(let d=0;d<s;d++){l.padding=e[d],l.size=t[d];let h=Vp(n,d,l);i.push(h),a==="auto"&&(h.visible=zp(h,c),h.visible&&(c=h))}return i}function Wp(n){return n===0||n===180?"center":n<180?"left":"right"}function Up(n,t,e){return e==="right"?n-=t:e==="center"&&(n-=t/2),n}function Yp(n,t,e){return e===90||e===270?n-=t/2:(e>270||e<90)&&(n-=t),n}function $p(n,t,e){let{left:i,top:s,right:r,bottom:o}=e,{backdropColor:a}=t;if(!Y(a)){let l=Ce(t.borderRadius),c=Dt(t.backdropPadding);n.fillStyle=a;let d=i-c.left,h=s-c.top,u=r-i+c.width,f=o-s+c.height;Object.values(l).some(p=>p!==0)?(n.beginPath(),yn(n,{x:d,y:h,w:u,h:f,radius:l}),n.fill()):n.fillRect(d,h,u,f)}}function jp(n,t){let{ctx:e,options:{pointLabels:i}}=n;for(let s=t-1;s>=0;s--){let r=n._pointLabelItems[s];if(!r.visible)continue;let o=i.setContext(n.getPointLabelContext(s));$p(e,o,r);let a=yt(o.font),{x:l,y:c,textAlign:d}=r;Ae(e,n._pointLabels[s],l,c+a.lineHeight/2,a,{color:o.color,textAlign:d,textBaseline:"middle"})}}function Bc(n,t,e,i){let{ctx:s}=n;if(e)s.arc(n.xCenter,n.yCenter,t,0,rt);else{let r=n.getPointPosition(0,t);s.moveTo(r.x,r.y);for(let o=1;o<i;o++)r=n.getPointPosition(o,t),s.lineTo(r.x,r.y)}}function Gp(n,t,e,i,s){let r=n.ctx,o=t.circular,{color:a,lineWidth:l}=t;!o&&!i||!a||!l||e<0||(r.save(),r.strokeStyle=a,r.lineWidth=l,r.setLineDash(s.dash||[]),r.lineDashOffset=s.dashOffset,r.beginPath(),Bc(n,e,o,i),r.closePath(),r.stroke(),r.restore())}function Xp(n,t,e){return ge(n,{label:e,index:t,type:"pointLabel"})}var Ge=class extends Cn{constructor(t){super(t),this.xCenter=void 0,this.yCenter=void 0,this.drawingArea=void 0,this._pointLabels=[],this._pointLabelItems=[]}setDimensions(){let t=this._padding=Dt(vo(this.options)/2),e=this.width=this.maxWidth-t.width,i=this.height=this.maxHeight-t.height;this.xCenter=Math.floor(this.left+e/2+t.left),this.yCenter=Math.floor(this.top+i/2+t.top),this.drawingArea=Math.floor(Math.min(e,i)/2)}determineDataLimits(){let{min:t,max:e}=this.getMinMax(!1);this.min=pt(t)&&!isNaN(t)?t:0,this.max=pt(e)&&!isNaN(e)?e:0,this.handleTickRangeOptions()}computeTickLimit(){return Math.ceil(this.drawingArea/vo(this.options))}generateTickLabels(t){Cn.prototype.generateTickLabels.call(this,t),this._pointLabels=this.getLabels().map((e,i)=>{let s=et(this.options.pointLabels.callback,[e,i],this);return s||s===0?s:""}).filter((e,i)=>this.chart.getDataVisibility(i))}fit(){let t=this.options;t.display&&t.pointLabels.display?Np(this):this.setCenterPoint(0,0,0,0)}setCenterPoint(t,e,i,s){this.xCenter+=Math.floor((t-e)/2),this.yCenter+=Math.floor((i-s)/2),this.drawingArea-=Math.min(this.drawingArea/2,Math.max(t,e,i,s))}getIndexAngle(t){let e=rt/(this._pointLabels.length||1),i=this.options.startAngle||0;return Et(t*e+Kt(i))}getDistanceFromCenterForValue(t){if(Y(t))return NaN;let e=this.drawingArea/(this.max-this.min);return this.options.reverse?(this.max-t)*e:(t-this.min)*e}getValueForDistanceFromCenter(t){if(Y(t))return NaN;let e=t/(this.drawingArea/(this.max-this.min));return this.options.reverse?this.max-e:this.min+e}getPointLabelContext(t){let e=this._pointLabels||[];if(t>=0&&t<e.length){let i=e[t];return Xp(this.getContext(),t,i)}}getPointPosition(t,e,i=0){let s=this.getIndexAngle(t)-mt+i;return{x:Math.cos(s)*e+this.xCenter,y:Math.sin(s)*e+this.yCenter,angle:s}}getPointPositionForValue(t,e){return this.getPointPosition(t,this.getDistanceFromCenterForValue(e))}getBasePosition(t){return this.getPointPositionForValue(t||0,this.getBaseValue())}getPointLabelPosition(t){let{left:e,top:i,right:s,bottom:r}=this._pointLabelItems[t];return{left:e,top:i,right:s,bottom:r}}drawBackground(){let{backgroundColor:t,grid:{circular:e}}=this.options;if(t){let i=this.ctx;i.save(),i.beginPath(),Bc(this,this.getDistanceFromCenterForValue(this._endValue),e,this._pointLabels.length),i.closePath(),i.fillStyle=t,i.fill(),i.restore()}}drawGrid(){let t=this.ctx,e=this.options,{angleLines:i,grid:s,border:r}=e,o=this._pointLabels.length,a,l,c;if(e.pointLabels.display&&jp(this,o),s.display&&this.ticks.forEach((d,h)=>{if(h!==0||h===0&&this.min<0){l=this.getDistanceFromCenterForValue(d.value);let u=this.getContext(h),f=s.setContext(u),p=r.setContext(u);Gp(this,f,l,o,p)}}),i.display){for(t.save(),a=o-1;a>=0;a--){let d=i.setContext(this.getPointLabelContext(a)),{color:h,lineWidth:u}=d;!u||!h||(t.lineWidth=u,t.strokeStyle=h,t.setLineDash(d.borderDash),t.lineDashOffset=d.borderDashOffset,l=this.getDistanceFromCenterForValue(e.reverse?this.min:this.max),c=this.getPointPosition(a,l),t.beginPath(),t.moveTo(this.xCenter,this.yCenter),t.lineTo(c.x,c.y),t.stroke())}t.restore()}}drawBorder(){}drawLabels(){let t=this.ctx,e=this.options,i=e.ticks;if(!i.display)return;let s=this.getIndexAngle(0),r,o;t.save(),t.translate(this.xCenter,this.yCenter),t.rotate(s),t.textAlign="center",t.textBaseline="middle",this.ticks.forEach((a,l)=>{if(l===0&&this.min>=0&&!e.reverse)return;let c=i.setContext(this.getContext(l)),d=yt(c.font);if(r=this.getDistanceFromCenterForValue(this.ticks[l].value),c.showLabelBackdrop){t.font=d.string,o=t.measureText(a.label).width,t.fillStyle=c.backdropColor;let h=Dt(c.backdropPadding);t.fillRect(-o/2-h.left,-r-d.size/2-h.top,o+h.width,d.size+h.height)}Ae(t,a.label,0,-r,d,{color:c.color,strokeColor:c.textStrokeColor,strokeWidth:c.textStrokeWidth})}),t.restore()}drawTitle(){}};A(Ge,"id","radialLinear"),A(Ge,"defaults",{display:!0,animate:!0,position:"chartArea",angleLines:{display:!0,lineWidth:1,borderDash:[],borderDashOffset:0},grid:{circular:!1},startAngle:0,ticks:{showLabelBackdrop:!0,callback:Jn.formatters.numeric},pointLabels:{backdropColor:void 0,backdropPadding:2,display:!0,font:{size:10},callback(t){return t},padding:5,centerPointLabels:!1}}),A(Ge,"defaultRoutes",{"angleLines.color":"borderColor","pointLabels.color":"color","ticks.color":"color"}),A(Ge,"descriptors",{angleLines:{_fallback:"grid"}});var ys={millisecond:{common:!0,size:1,steps:1e3},second:{common:!0,size:1e3,steps:60},minute:{common:!0,size:6e4,steps:60},hour:{common:!0,size:36e5,steps:24},day:{common:!0,size:864e5,steps:30},week:{common:!1,size:6048e5,steps:4},month:{common:!0,size:2628e6,steps:12},quarter:{common:!1,size:7884e6,steps:4},year:{common:!0,size:3154e7}},It=Object.keys(ys);function pc(n,t){return n-t}function mc(n,t){if(Y(t))return null;let e=n._adapter,{parser:i,round:s,isoWeekday:r}=n._parseOpts,o=t;return typeof i=="function"&&(o=i(o)),pt(o)||(o=typeof i=="string"?e.parse(o,i):e.parse(o)),o===null?null:(s&&(o=s==="week"&&(We(r)||r===!0)?e.startOf(o,"isoWeek",r):e.startOf(o,s)),+o)}function gc(n,t,e,i){let s=It.length;for(let r=It.indexOf(n);r<s-1;++r){let o=ys[It[r]],a=o.steps?o.steps:Number.MAX_SAFE_INTEGER;if(o.common&&Math.ceil((e-t)/(a*o.size))<=i)return It[r]}return It[s-1]}function Kp(n,t,e,i,s){for(let r=It.length-1;r>=It.indexOf(e);r--){let o=It[r];if(ys[o].common&&n._adapter.diff(s,i,o)>=t-1)return o}return It[e?It.indexOf(e):0]}function qp(n){for(let t=It.indexOf(n)+1,e=It.length;t<e;++t)if(ys[It[t]].common)return It[t]}function _c(n,t,e){if(!e)n[t]=!0;else if(e.length){let{lo:i,hi:s}=Ki(e,t),r=e[i]>=t?e[i]:e[s];n[r]=!0}}function Jp(n,t,e,i){let s=n._adapter,r=+s.startOf(t[0].value,i),o=t[t.length-1].value,a,l;for(a=r;a<=o;a=+s.add(a,1,i))l=e[a],l>=0&&(t[l].major=!0);return t}function bc(n,t,e){let i=[],s={},r=t.length,o,a;for(o=0;o<r;++o)a=t[o],s[a]=o,i.push({value:a,major:!1});return r===0||!e?i:Jp(n,i,s,e)}var Ke=class extends qe{constructor(t){super(t),this._cache={data:[],labels:[],all:[]},this._unit="day",this._majorUnit=void 0,this._offsets={},this._normalized=!1,this._parseOpts=void 0}init(t,e={}){let i=t.time||(t.time={}),s=this._adapter=new cu._date(t.adapters.date);s.init(e),pn(i.displayFormats,s.formats()),this._parseOpts={parser:i.parser,round:i.round,isoWeekday:i.isoWeekday},super.init(t),this._normalized=e.normalized}parse(t,e){return t===void 0?null:mc(this,t)}beforeLayout(){super.beforeLayout(),this._cache={data:[],labels:[],all:[]}}determineDataLimits(){let t=this.options,e=this._adapter,i=t.time.unit||"day",{min:s,max:r,minDefined:o,maxDefined:a}=this.getUserBounds();function l(c){!o&&!isNaN(c.min)&&(s=Math.min(s,c.min)),!a&&!isNaN(c.max)&&(r=Math.max(r,c.max))}(!o||!a)&&(l(this._getLabelBounds()),(t.bounds!=="ticks"||t.ticks.source!=="labels")&&l(this.getMinMax(!1))),s=pt(s)&&!isNaN(s)?s:+e.startOf(Date.now(),i),r=pt(r)&&!isNaN(r)?r:+e.endOf(Date.now(),i)+1,this.min=Math.min(s,r-1),this.max=Math.max(s+1,r)}_getLabelBounds(){let t=this.getLabelTimestamps(),e=Number.POSITIVE_INFINITY,i=Number.NEGATIVE_INFINITY;return t.length&&(e=t[0],i=t[t.length-1]),{min:e,max:i}}buildTicks(){let t=this.options,e=t.time,i=t.ticks,s=i.source==="labels"?this.getLabelTimestamps():this._generate();t.bounds==="ticks"&&s.length&&(this.min=this._userMin||s[0],this.max=this._userMax||s[s.length-1]);let r=this.min,o=this.max,a=Qa(s,r,o);return this._unit=e.unit||(i.autoSkip?gc(e.minUnit,this.min,this.max,this._getLabelCapacity(r)):Kp(this,a.length,e.minUnit,this.min,this.max)),this._majorUnit=!i.major.enabled||this._unit==="year"?void 0:qp(this._unit),this.initOffsets(s),t.reverse&&a.reverse(),bc(this,a,this._majorUnit)}afterAutoSkip(){this.options.offsetAfterAutoskip&&this.initOffsets(this.ticks.map(t=>+t.value))}initOffsets(t=[]){let e=0,i=0,s,r;this.options.offset&&t.length&&(s=this.getDecimalForValue(t[0]),t.length===1?e=1-s:e=(this.getDecimalForValue(t[1])-s)/2,r=this.getDecimalForValue(t[t.length-1]),t.length===1?i=r:i=(r-this.getDecimalForValue(t[t.length-2]))/2);let o=t.length<3?.5:.25;e=Tt(e,0,o),i=Tt(i,0,o),this._offsets={start:e,end:i,factor:1/(e+1+i)}}_generate(){let t=this._adapter,e=this.min,i=this.max,s=this.options,r=s.time,o=r.unit||gc(r.minUnit,e,i,this._getLabelCapacity(e)),a=z(s.ticks.stepSize,1),l=o==="week"?r.isoWeekday:!1,c=We(l)||l===!0,d={},h=e,u,f;if(c&&(h=+t.startOf(h,"isoWeek",l)),h=+t.startOf(h,c?"day":o),t.diff(i,e,o)>1e5*a)throw new Error(e+" and "+i+" are too far apart with stepSize of "+a+" "+o);let p=s.ticks.source==="data"&&this.getDataTimestamps();for(u=h,f=0;u<i;u=+t.add(u,a,o),f++)_c(d,u,p);return(u===i||s.bounds==="ticks"||f===1)&&_c(d,u,p),Object.keys(d).sort(pc).map(m=>+m)}getLabelForValue(t){let e=this._adapter,i=this.options.time;return i.tooltipFormat?e.format(t,i.tooltipFormat):e.format(t,i.displayFormats.datetime)}format(t,e){let s=this.options.time.displayFormats,r=this._unit,o=e||s[r];return this._adapter.format(t,o)}_tickFormatFunction(t,e,i,s){let r=this.options,o=r.ticks.callback;if(o)return et(o,[t,e,i],this);let a=r.time.displayFormats,l=this._unit,c=this._majorUnit,d=l&&a[l],h=c&&a[c],u=i[e],f=c&&h&&u&&u.major;return this._adapter.format(t,s||(f?h:d))}generateTickLabels(t){let e,i,s;for(e=0,i=t.length;e<i;++e)s=t[e],s.label=this._tickFormatFunction(s.value,e,t)}getDecimalForValue(t){return t===null?NaN:(t-this.min)/(this.max-this.min)}getPixelForValue(t){let e=this._offsets,i=this.getDecimalForValue(t);return this.getPixelForDecimal((e.start+i)*e.factor)}getValueForPixel(t){let e=this._offsets,i=this.getDecimalForPixel(t)/e.factor-e.end;return this.min+i*(this.max-this.min)}_getLabelSize(t){let e=this.options.ticks,i=this.ctx.measureText(t).width,s=Kt(this.isHorizontal()?e.maxRotation:e.minRotation),r=Math.cos(s),o=Math.sin(s),a=this._resolveTickFontOptions(0).size;return{w:i*r+a*o,h:i*o+a*r}}_getLabelCapacity(t){let e=this.options.time,i=e.displayFormats,s=i[e.unit]||i.millisecond,r=this._tickFormatFunction(t,0,bc(this,[t],this._majorUnit),s),o=this._getLabelSize(r),a=Math.floor(this.isHorizontal()?this.width/o.w:this.height/o.h)-1;return a>0?a:1}getDataTimestamps(){let t=this._cache.data||[],e,i;if(t.length)return t;let s=this.getMatchingVisibleMetas();if(this._normalized&&s.length)return this._cache.data=s[0].controller.getAllParsedValues(this);for(e=0,i=s.length;e<i;++e)t=t.concat(s[e].controller.getAllParsedValues(this));return this._cache.data=this.normalize(t)}getLabelTimestamps(){let t=this._cache.labels||[],e,i;if(t.length)return t;let s=this.getLabels();for(e=0,i=s.length;e<i;++e)t.push(mc(this,s[e]));return this._cache.labels=this._normalized?t:this.normalize(t)}normalize(t){return Dr(t.sort(pc))}};A(Ke,"id","time"),A(Ke,"defaults",{bounds:"data",adapters:{},time:{parser:!1,unit:!1,round:!1,isoWeekday:!1,minUnit:"millisecond",displayFormats:{}},ticks:{source:"auto",callback:!1,major:{enabled:!1}}});function cs(n,t,e){let i=0,s=n.length-1,r,o,a,l;e?(t>=n[i].pos&&t<=n[s].pos&&({lo:i,hi:s}=se(n,"pos",t)),{pos:r,time:a}=n[i],{pos:o,time:l}=n[s]):(t>=n[i].time&&t<=n[s].time&&({lo:i,hi:s}=se(n,"time",t)),{time:r,pos:a}=n[i],{time:o,pos:l}=n[s]);let c=o-r;return c?a+(l-a)*(t-r)/c:a}var hi=class extends Ke{constructor(t){super(t),this._table=[],this._minPos=void 0,this._tableRange=void 0}initOffsets(){let t=this._getTimestampsForTable(),e=this._table=this.buildLookupTable(t);this._minPos=cs(e,this.min),this._tableRange=cs(e,this.max)-this._minPos,super.initOffsets(t)}buildLookupTable(t){let{min:e,max:i}=this,s=[],r=[],o,a,l,c,d;for(o=0,a=t.length;o<a;++o)c=t[o],c>=e&&c<=i&&s.push(c);if(s.length<2)return[{time:e,pos:0},{time:i,pos:1}];for(o=0,a=s.length;o<a;++o)d=s[o+1],l=s[o-1],c=s[o],Math.round((d+l)/2)!==c&&r.push({time:c,pos:o/(a-1)});return r}_generate(){let t=this.min,e=this.max,i=super.getDataTimestamps();return(!i.includes(t)||!i.length)&&i.splice(0,0,t),(!i.includes(e)||i.length===1)&&i.push(e),i.sort((s,r)=>s-r)}_getTimestampsForTable(){let t=this._cache.all||[];if(t.length)return t;let e=this.getDataTimestamps(),i=this.getLabelTimestamps();return e.length&&i.length?t=this.normalize(e.concat(i)):t=e.length?e:i,t=this._cache.all=t,t}getDecimalForValue(t){return(cs(this._table,t)-this._minPos)/this._tableRange}getValueForPixel(t){let e=this._offsets,i=this.getDecimalForPixel(t)/e.factor-e.end;return cs(this._table,i*this._tableRange+this._minPos,!0)}};A(hi,"id","timeseries"),A(hi,"defaults",Ke.defaults);var Zp=Object.freeze({__proto__:null,CategoryScale:li,LinearScale:ci,LogarithmicScale:di,RadialLinearScale:Ge,TimeScale:Ke,TimeSeriesScale:hi}),Vc=[lu,Lf,Ap,Zp];function Je(n,t="#000000"){let e=document.body||document.documentElement;return getComputedStyle(e).getPropertyValue(n).trim()||t}function Qp(){let n=document.createElement("div");n.style.position="absolute",n.style.visibility="hidden",document.body.appendChild(n);let t=getComputedStyle(n).getPropertyValue($t.INTERACTIVE_ACCENT).trim();if(t||(t=getComputedStyle(n).getPropertyValue($t.COLOR_ACCENT).trim()),t||(t=getComputedStyle(n).getPropertyValue($t.ACCENT_COLOR).trim()),document.body.removeChild(n),!t){let e=document.body||document.documentElement;t=getComputedStyle(e).getPropertyValue($t.INTERACTIVE_ACCENT).trim()}return t||(t=xe.ACCENT),t}function Rn(){let n=Qp();return{accentColor:n,textMuted:Je($t.TEXT_MUTED,xe.TEXT_MUTED),textFaint:Je($t.TEXT_FAINT,xe.TEXT_FAINT),borderColor:Je($t.BACKGROUND_MODIFIER_BORDER,xe.BORDER),bgPrimary:Je($t.BACKGROUND_PRIMARY,xe.BG_PRIMARY),errorColor:Je($t.TEXT_ERROR,xe.TEXT_ERROR),successColor:Je($t.TEXT_SUCCESS,xe.TEXT_SUCCESS),startLineColor:Je($t.TEXT_ACCENT,n)}}function On(n,t){if(n.startsWith("#")){let e=parseInt(n.slice(1,3),16),i=parseInt(n.slice(3,5),16),s=parseInt(n.slice(5,7),16);return`rgba(${e}, ${i}, ${s}, ${t})`}else if(n.startsWith("rgb"))return n.replace("rgb","rgba").replace(")",`, ${t})`);return n}var xo=class{prepareChartData(t,e,i,s,r,o){let{dateIso:a,daysToShow:l,metricType:c,minLimit:d,maxLimit:h,scaleMinValue:u,scaleMaxValue:f}=s,p=a?D.parse(a,Js.ISO):D.now(),g=p.clone().add(Ot.FUTURE_DAYS_OFFSET,"days").clone().subtract(l-1,"days"),_=D.format(p,i.dateFormat),b=Rn(),k=[],y=[],x=[],T=[],w=[],v=[],E=[],C=0,R=null,F=null;for(let M=0;M<l;M++){let U=g.clone().add(M,"days"),W=D.format(U,i.dateFormat);W===r&&(R=M),W===_&&(F=M);let ot="",St=window.moment;if(St)ot=St(U.toDate()).format(Js.DISPLAY_SHORT);else{let Nt=U.getDate(),Pe=U.toDate().toLocaleDateString("ru",{month:"short"});ot=`${Nt} ${Pe}`}k.push(ot),E.push(W);let Q=t.get(W),at=0;Q!=null&&(c===P.TEXT?at=Fi(String(Q)):typeof Q=="number"?at=Q:Q==="1"||String(Q)==="true"?at=1:at=Number(Q)||0),y.push(at),C=Math.max(C,at);let nt=b.accentColor,wt=b.accentColor,At=W>o,Rt=d!==null||h!==null;!At&&R!==null&&M>=R&&Rt&&((d===null||at>=d)&&(h===null||at<=h)?(nt=b.successColor,wt=b.successColor):(nt=b.errorColor,wt=b.errorColor)),x.push(nt),T.push(wt),w.push(Ot.POINT_RADIUS),v.push(Ot.POINT_BORDER_WIDTH)}let X=0,$=C,I=[];if(d!==null&&I.push(d),u!==null&&I.push(u),I.length>0){let M=Math.min(...I);X=Math.min(X,M)}let G=[C];if(h!==null&&G.push(h),d!==null&&h===null&&G.push(d*2),f!==null&&G.push(f),G.length>0){let M=Math.max(...G);$=Math.max($,M)}return{labels:k,values:y,pointBackgroundColors:x,pointBorderColors:T,pointRadii:w,pointBorderWidths:v,dateStrings:E,startTrackingIndex:R,activeDateIndex:F,maxValue:C,yAxisMin:X,yAxisMax:$}}createChartConfig(t,e,i,s){let{metricType:r,unit:o,minLimit:a,maxLimit:l,scaleMinValue:c,scaleMaxValue:d}=i,h;return o?h=o.charAt(0).toUpperCase()+o.slice(1):h=r===P.TEXT?"Word count":"Value",{type:"line",data:{labels:t.labels,datasets:[{label:h,data:t.values,borderColor:e.accentColor,backgroundColor:On(e.accentColor,.1),borderWidth:Ot.BORDER_WIDTH,fill:!1,tension:Ot.LINE_TENSION,pointRadius:t.pointRadii,pointBackgroundColor:t.pointBackgroundColors,pointBorderColor:t.pointBorderColors,pointBorderWidth:t.pointBorderWidths,pointHoverRadius:Ot.POINT_HOVER_RADIUS,pointHitRadius:Ot.POINT_HIT_RADIUS,pointHoverBackgroundColor:f=>{let p=f.dataIndex;return t.pointBackgroundColors[p]||e.accentColor},pointHoverBorderColor:f=>{let p=f.dataIndex;return t.pointBorderColors[p]||e.accentColor},pointHoverBorderWidth:f=>{let p=f.dataIndex;return t.pointBorderWidths[p]||Ot.POINT_BORDER_WIDTH}}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{enabled:!0,backgroundColor:e.bgPrimary,titleColor:e.textMuted,bodyColor:e.textMuted,borderColor:e.borderColor,borderWidth:1,padding:8,displayColors:!1,callbacks:{label:f=>{let p=f.parsed.y;return o?`${o.charAt(0).toUpperCase()+o.slice(1)}: ${p}`:`${h}: ${p}`}}}},scales:{x:{grid:{display:!0,color:On(e.borderColor,.3),lineWidth:Ot.GRID_LINE_WIDTH,drawBorder:!1},ticks:{color:e.textFaint,font:{family:"var(--font-text)",size:Ot.FONT_SIZE_SMALL},maxRotation:0,autoSkip:!0,maxTicksLimit:Ot.MAX_TICKS_LIMIT}},y:{grid:{display:!0,color:On(e.borderColor,.3),lineWidth:Ot.GRID_LINE_WIDTH,drawBorder:!1},ticks:{color:e.textFaint,font:{family:"var(--font-text)",size:Ot.FONT_SIZE_SMALL}},beginAtZero:!a&&!l&&!c&&!d,min:a!==null||l!==null||c!==null||d!==null?t.yAxisMin:void 0,max:a!==null||l!==null||c!==null||d!==null?t.yAxisMax:void 0}},interaction:{intersect:!1,mode:"index"},elements:{point:{hoverBackgroundColor:void 0,hoverBorderColor:void 0,hoverRadius:Ot.POINT_HOVER_RADIUS,hoverBorderWidth:void 0}},onClick:(f,p,m)=>{if(p&&p.length>0){let _=p[0].index,b=m.dateStrings;if(b&&_>=0&&_<b.length){let k=b[_];s(k)}}},onResize:f=>{let p=f,m=Rn();this.drawChartAnnotations(p,{startTrackingIndex:p.startTrackingIndex??null,activeDateIndex:p.activeDateIndex??null},m,p.minLimit??null,p.maxLimit??null)}},plugins:[{id:"startLinePlugin",beforeDraw:f=>{let p=f,m=Rn();this.drawChartAnnotations(p,{startTrackingIndex:p.startTrackingIndex??null,activeDateIndex:p.activeDateIndex??null},m,p.minLimit??null,p.maxLimit??null)}}]}}drawChartAnnotations(t,e,i,s,r){let o=t.ctx;t.chartArea&&(e.startTrackingIndex!==null&&e.startTrackingIndex!==e.activeDateIndex&&this.drawVerticalLine(t,e.startTrackingIndex,i.startLineColor,!0),e.activeDateIndex!==null&&this.drawVerticalLine(t,e.activeDateIndex,i.startLineColor,!1),s!==null&&this.drawHorizontalLine(t,s,i.startLineColor),r!==null&&this.drawHorizontalLine(t,r,i.startLineColor))}drawVerticalLine(t,e,i,s){let r=t.ctx,o=t.chartArea;if(!o)return;let l=t.scales.x.getPixelForValue(e);l<o.left||l>o.right||(r.save(),r.strokeStyle=On(i,.6),r.lineWidth=2,r.setLineDash(s?[5,5]:[]),r.beginPath(),r.moveTo(l,o.top),r.lineTo(l,o.bottom),r.stroke(),r.restore())}drawHorizontalLine(t,e,i){let s=t.ctx,r=t.chartArea;if(!r)return;let a=t.scales.y.getPixelForValue(e);a<r.top||a>r.bottom||(s.save(),s.strokeStyle=On(i,.6),s.lineWidth=2,s.setLineDash([5,5]),s.beginPath(),s.moveTo(r.left,a),s.lineTo(r.right,a),s.stroke(),s.restore())}},ko=new xo;qt.register(...Vc);function To({file:n,plugin:t,dateIso:e,daysToShow:i,fileOptions:s,onDateClick:r}){let o=lt(null),a=lt(null),l=tt(()=>B.getTrackerState(n.path)?.entries??new Map),c=(s?.mode??P.GOOD_HABIT).toLowerCase(),d=s?.unit||"",h=s?.minLimit?parseFloat(s.minLimit):null,u=s?.maxLimit?parseFloat(s.maxLimit):null,f=s?.minValue?parseFloat(s.minValue):null,p=s?.maxValue?parseFloat(s.maxValue):null,m=ct(()=>t.getStartTrackingDate(l.value,s),[t,l.value,s]),g=N(b=>{r&&r(b)},[r]),_=lt(null);return ut(()=>()=>{if(a.current){let b=a.current.__resizeObserver;b&&b.disconnect(),a.current.destroy(),a.current=null}},[]),ut(()=>{if(!o.current)return;let b=Rn(),k=D.format(D.now(),t.settings.dateFormat),y=ko.prepareChartData(l.value,n,t.settings,{dateIso:e,daysToShow:i,metricType:c,unit:d,minLimit:h,maxLimit:u,scaleMinValue:f,scaleMaxValue:p},m,k),x={trackerType:c,unit:d,minLimit:h,maxLimit:u,scaleMinValue:f,scaleMaxValue:p,dateIso:e,daysToShow:i,yAxisMin:y.yAxisMin,yAxisMax:y.yAxisMax};if(a.current&&_.current&&_.current.trackerType===x.trackerType&&_.current.unit===x.unit&&_.current.minLimit===x.minLimit&&_.current.maxLimit===x.maxLimit&&_.current.scaleMinValue===x.scaleMinValue&&_.current.scaleMaxValue===x.scaleMaxValue&&_.current.dateIso===x.dateIso&&_.current.daysToShow===x.daysToShow&&_.current.yAxisMin===x.yAxisMin&&_.current.yAxisMax===x.yAxisMax&&a.current){let w=a.current.data.datasets[0];w&&(w.data=y.values,w.pointBackgroundColor=y.pointBackgroundColors,w.pointBorderColor=y.pointBorderColors,w.pointRadius=y.pointRadii,w.pointBorderWidth=y.pointBorderWidths),a.current.data.labels=y.labels,a.current.dateStrings=y.dateStrings,a.current.startTrackingIndex=y.startTrackingIndex,a.current.activeDateIndex=y.activeDateIndex,a.current.minLimit=h,a.current.maxLimit=u,a.current.update("none"),_.current=x;return}{let w=ko.createChartConfig(y,b,{dateIso:e,daysToShow:i,metricType:c,unit:d,minLimit:h,maxLimit:u,scaleMinValue:f,scaleMaxValue:p},g);if(a.current){let E=a.current.__resizeObserver;E&&E.disconnect(),a.current.destroy(),a.current=null}let v=o.current.getContext("2d");if(v){a.current=new qt(v,w),a.current.dateStrings=y.dateStrings,a.current.startTrackingIndex=y.startTrackingIndex,a.current.activeDateIndex=y.activeDateIndex,a.current.minLimit=h,a.current.maxLimit=u;let E=o.current.parentElement;if(E){let C=new ResizeObserver(()=>{a.current&&a.current.resize()});C.observe(E),a.current.__resizeObserver=C}}_.current=x}},[n,t,e,i,l.value,c,d,h,u,f,p,m,g]),S("div",{class:O.CHART,children:S("canvas",{ref:o})})}function zc({file:n,plugin:t,dateIso:e,viewMode:i,opts:s}){let{onDateChange:r}=ma(),o=rn(!0),a=tt(()=>(B.getEntriesVersion(n.path),B.getTrackerState(n.path))),l=tt(()=>a.value?.entries??new Map),c=tt(()=>a.value?.fileOptions??null);ut(()=>((async()=>{try{if(B.getTrackerState(n.path)){o.value=!1;return}let{entries:C,fileOpts:R}=await t.readTrackerFile(n);B.setTrackerState(n.path,{entries:C,fileOptions:R,lastUpdated:Date.now()}),o.value=!1}catch(E){V("TrackerItem: error loading data",E),o.value=!1}})(),()=>{}),[n.path,t]);let d=tt(()=>(c.value?.mode??P.GOOD_HABIT).toLowerCase()),h=tt(()=>{let v=n.basename,E=c.value?.unit||"";return E?`${v} (${E})`:v}),u=tt(()=>{let v=d.value;return v===P.GOOD_HABIT||v===P.BAD_HABIT}),f=ct(()=>t.isMobileDevice(),[]),p=tt(()=>{let v=B.settings.value;return parseInt(s.days)||v.daysToShow}),m=tt(()=>{if(u.value)return!1;let v=B.settings.value,E=s.showChart==="true"||s.showChart===void 0&&v.showChartByDefault,C=f&&v.hideChartOnMobile;return E&&!C}),g=tt(()=>{let v=B.settings.value,E=s.showStats==="true"||s.showStats===void 0&&v.showStatsByDefault,C=f&&v.hideStatsOnMobile;return E&&!C}),_=N(()=>{t.openEditTrackerModal(n)},[t,n]),b=N(async()=>{await t.moveTrackerUp(n)},[t,n]),k=N(async()=>{await t.moveTrackerDown(n)},[t,n]),y=tt(()=>{let v=c.value;return v?t.getStartTrackingDate(l.value,v):null}),x=ct(()=>{let v=l.value,E=c.value,C=B.settings.value;if(!E||!C||C.disableLimitReaction)return null;let R=E.minLimit?parseFloat(E.minLimit):null,F=E.maxLimit?parseFloat(E.maxLimit):null;if(R===null&&F===null)return null;let X=v.get(e),$=X!=null?Number(X):null;if($===null||isNaN($))return{width:"0%",color:"transparent"};let I=0,G=!1;R!==null&&F!==null?$>=R&&$<=F?I=100:$<R?I=Math.max(0,100*($/R)):(I=100,G=!0):F!==null?$<=F?I=100:(I=100,G=!0):R!==null&&(I=Math.min(100,Math.max(0,100*($/R))));let U=`hsl(${G?0:120*(I/100)}, 70%, 50%)`;return{width:`${I}%`,color:U}},[e,l.value,c.value,B.settings.value?.disableLimitReaction]),T=()=>{if(o.value||!c.value)return null;let v={file:n,dateIso:e,plugin:t,fileOptions:c.value},E=d.value;if(E===P.GOOD_HABIT||E===P.BAD_HABIT)return S(wa,{...v,daysToShow:p.value,trackerType:E,startTrackingDate:y.value});switch(E){case P.NUMBER:return S(ya,{...v});case P.PLUSMINUS:return S(va,{...v});case P.TEXT:return S(ka,{...v});case P.SCALE:return S(Ta,{...v});default:return S("div",{children:["Unknown tracker type: ",E]})}};if(i===Fe.DISPLAY){let v=l.value.get(e),E=c.value;return S("div",{class:O.TRACKER,"data-file-path":n.path,children:[S(cr,{file:n,displayName:h.value,plugin:t}),S("div",{children:[e,": ",v??"\u2014"]}),m.value&&E&&S(To,{file:n,plugin:t,dateIso:e,daysToShow:p.value,fileOptions:E,onDateClick:r}),g.value&&E&&S(ur,{file:n,plugin:t,dateIso:e,daysToShow:p.value,trackerType:d.value,fileOptions:E})]})}let w=c.value;return S("div",{class:O.TRACKER,"data-file-path":n.path,children:[S(cr,{file:n,displayName:h.value,plugin:t,onEdit:_,onMoveUp:b,onMoveDown:k,limitProgress:x}),S("div",{class:O.TRACKER_CONTROLS,children:T()}),m.value&&w&&S(To,{file:n,plugin:t,dateIso:e,daysToShow:p.value,fileOptions:w,onDateClick:r}),g.value&&w&&S(ur,{file:n,plugin:t,dateIso:e,daysToShow:p.value,trackerType:d.value,fileOptions:w})]})}var vs=class extends ve{constructor(t){super(t),this.state={hasError:!1}}static getDerivedStateFromError(t){return{hasError:!0,error:t}}componentDidCatch(t){V("TrackerItem error boundary",t)}render(){return this.state.hasError?this.props.fallback?this.props.fallback:S("div",{class:O.ERROR,children:[it.RENDER_ERROR,": ",this.state.error?.message||"Unknown error"]}):this.props.children}};function ks({node:n,plugin:t,dateIso:e,viewMode:i,opts:s}){let r=lt(null),o=lt(null),a=ft(n.path),l=n.files.length>0||n.level>0&&n.children.length>0,c=N(async()=>{await t.moveFolderUp(a)},[t,a]),d=N(async()=>{await t.moveFolderDown(a)},[t,a]);return ut(()=>{let h=o.current;if(!h)return;let u=f=>{f.preventDefault(),f.stopPropagation();let p=t.app.vault.getAbstractFileByPath(a);if(p&&p instanceof xs.TFolder){let m=new xs.Menu;t.app.workspace.trigger("file-menu",m,p,"file-explorer"),m.showAtMouseEvent(f)}};return h.addEventListener("contextmenu",u),()=>{h.removeEventListener("contextmenu",u)}},[t,a]),S("div",{ref:r,class:`${O.FOLDER_NODE} level-${n.level}`,"data-folder-path":a,children:[l&&S("div",{class:`${O.FOLDER_HEADER} level-${n.level}`,children:[S("span",{children:[S(Vn,{path:n.path,isFile:!1,className:"tracker-notes__folder-icon"}),S("span",{ref:o,class:"tracker-notes__folder-name",children:n.name})]}),S("div",{class:O.ORDER_BTN_CONTAINER,children:[S("button",{type:"button",class:O.ORDER_BTN_UP,onClick:c,title:L.MOVE_UP,children:"\u2191"}),S("button",{type:"button",class:O.ORDER_BTN_DOWN,onClick:d,title:L.MOVE_DOWN,children:"\u2193"})]})]}),n.files.length>0&&S("div",{class:O.TRACKERS_CONTAINER,"data-folder-path":a,children:n.files.map(h=>S(vs,{children:S(zc,{file:h,plugin:t,dateIso:e,viewMode:i,opts:s})},h.path))}),n.children.map(h=>S(ks,{node:h,plugin:t,dateIso:e,viewMode:i,opts:s},h.path))]})}function So({plugin:n,folderTree:t,initialDateIso:e,viewMode:i,opts:s,folderPath:r}){let o=rn(!1),a=rn(e),l=N(f=>{let p=D.resolveDateIso(f,n.settings.dateFormat);a.value=p},[n.settings.dateFormat,a]),c=N(f=>{let m=D.parse(a.value,n.settings.dateFormat).clone().add(f,"days"),g=D.format(m,n.settings.dateFormat);a.value=g},[n.settings.dateFormat,a]),d=ct(()=>({onDateChange:l}),[l]);if(!t||t.files.length===0&&t.children.length===0)return S("div",{class:O.ERROR,children:["tracker: ",it.NO_TRACKERS," ",r]});let h=r.split("/").pop()||r,u=tt(()=>B.settings.value.hideTrackerTitle);return S(or.Provider,{value:d,children:[i===Fe.CONTROL&&S("div",{class:O.TRACKER_NOTES_HEADER,children:[!u.value&&S("div",{class:"tracker-notes__header-title",children:S("span",{class:"tracker-notes__header-label",children:h})}),S(ar,{dateIso:a.value,onDateChange:l,onNavigate:c,isUpdating:o.value}),S(lr,{isActive:o.value})]}),S("div",{class:O.TRACKER_NOTES,children:S("div",{class:O.TRACKER_NOTES_HIERARCHY,children:S(ks,{node:t,plugin:n,dateIso:a.value,viewMode:i,opts:s})})})]})}var Ts=class extends Ss.MarkdownRenderChild{constructor(e,i,s,r){super(s);this.cachedExtractedDate=null;this.plugin=e,this.source=i,this.opts=jo(i),this.folderPath=this.opts.folder||e.settings.trackersFolder,this.ctx=r}async render(){this.opts.folder||(this.folderPath=this.plugin.settings.trackersFolder);try{let e=this.plugin.getFolderTree(this.folderPath),i=(this.opts.view??Fe.CONTROL).toLowerCase(),s=this.opts.date;!s&&this.ctx.sourcePath&&(this.cachedExtractedDate===null&&(this.cachedExtractedDate=this.extractDateFromNotePath(this.ctx.sourcePath)),s=this.cachedExtractedDate);let r=D.resolveDateIso(s,this.plugin.settings.dateFormat);qs(S(So,{plugin:this.plugin,folderTree:e,initialDateIso:r,viewMode:i,opts:this.opts,folderPath:this.folderPath}),this.containerEl)}catch(e){let i=e instanceof Error?e.message:String(e);this.containerEl.empty(),this.containerEl.createEl("div",{text:`tracker: ${it.RENDER_ERROR}: ${i}`,cls:"tracker-notes__error"}),V("Tracker: error processing block",e)}}extractDateFromNotePath(e){try{let i=this.plugin.app.vault.getAbstractFileByPath(e);if(!(i instanceof Ss.TFile))return;let s=i.basename;if(!s)return;let r=["YYYY-MM-DD","YYYY/MM/DD","DD.MM.YYYY","YYYY-MM-DD HH:mm","YYYY/MM/DD HH:mm"];for(let l of r)try{let c=D.parse(s,l);if(c.isValid())return D.format(c,this.plugin.settings.dateFormat)}catch{}let o=/(\d{4}[-/]\d{2}[-/]\d{2})|(\d{2}\.\d{2}\.\d{4})/,a=s.match(o);if(a){let l=a[0],c=D.parseMultiple(l,["YYYY-MM-DD","YYYY/MM/DD","DD.MM.YYYY"]);if(c.isValid())return D.format(c,this.plugin.settings.dateFormat)}}catch(i){V("Tracker: Error reading note filename",i)}}getFolderPath(){return this.folderPath}getOptions(){return this.opts}onload(){}onunload(){qs(null,this.containerEl),this.plugin.removeActiveBlock(this)}};var Pt=require("obsidian");var ws=class{constructor(t){this.app=t;this.cache=new Map;this.customSortOrder=void 0;this.settings=null;this.pendingCleanup=new Set;this.cleanupDebounceTimer=null}updateSettings(t){this.settings=t,this.customSortOrder=t.customSortOrder}scheduleLazyCleanup(t,e){if(!this.settings||!this.customSortOrder)return;let i=ft(t),s=this.customSortOrder[i];!s||!s.some(o=>!e.has(o))||(this.pendingCleanup.add(i),this.cleanupDebounceTimer&&clearTimeout(this.cleanupDebounceTimer),this.cleanupDebounceTimer=setTimeout(()=>{this.performLazyCleanup()},5e3))}performLazyCleanup(){if(!this.settings||!this.customSortOrder||this.pendingCleanup.size===0){this.pendingCleanup.clear();return}let t=!1;for(let e of this.pendingCleanup){let i=this.customSortOrder[e];if(!i)continue;let s=this.app.vault.getAbstractFileByPath(e);if(!s||!(s instanceof Pt.TFolder)){delete this.customSortOrder[e],t=!0;continue}let r=new Set;for(let a of s.children)a instanceof Pt.TFile?r.add(a.basename):a instanceof Pt.TFolder&&r.add(a.name);let o=i.filter(a=>r.has(a));o.length!==i.length&&(o.length===0?delete this.customSortOrder[e]:this.customSortOrder[e]=o,t=!0)}this.pendingCleanup.clear()}cacheKey(t,e){return`${ft(t)}::${e}`}getFolderTree(t,e=3){let i=this.cacheKey(t,e),s=this.cache.get(i);if(s)return s;let r=this.app.vault.getAbstractFileByPath(t);if(!r)return null;if(r instanceof Pt.TFile)return{name:r.basename,path:r.path,level:0,files:[r],children:[]};if(r instanceof Pt.TFolder){let o=this.buildFolderTree(r,e,0);return this.cache.set(i,o),o}return null}getRelativePath(t){return ft(t)}sortItems(t,e){let i=this.getRelativePath(e),s=this.customSortOrder?.[i];if(!s||s.length===0)return[...t].sort((d,h)=>{let u=d instanceof Pt.TFile?d.basename:d.name,f=h instanceof Pt.TFile?h.basename:h.name;return u.localeCompare(f,void 0,{sensitivity:"base"})});let r=new Map,o=new Set;for(let d of t){let h=d instanceof Pt.TFile?d.basename:d.name;r.set(h,d),o.add(h)}this.scheduleLazyCleanup(i,o);let a=[],l=new Set;for(let d of s){let h=r.get(d);h&&(a.push(h),l.add(d))}let c=[];for(let d of t){let h=d instanceof Pt.TFile?d.basename:d.name;l.has(h)||c.push(d)}return c.sort((d,h)=>{let u=d instanceof Pt.TFile?d.basename:d.name,f=h instanceof Pt.TFile?h.basename:h.name;return u.localeCompare(f,void 0,{sensitivity:"base"})}),[...a,...c]}buildFolderTree(t,e,i){let s={name:t.name,path:t.path,level:i,files:[],children:[]};for(let r of t.children)r instanceof Pt.TFile&&r.extension==="md"&&s.files.push(r);if(s.files=this.sortItems(s.files,t.path),i<e){for(let r of t.children)if(r instanceof Pt.TFolder){if(r.name.toLowerCase().includes("archive"))continue;let o=this.buildFolderTree(r,e,i+1);(o.files.length>0||o.children.length>0)&&s.children.push(o)}s.children=this.sortItems(s.children,t.path)}return s}invalidate(t){if(!t){this.cache.clear();return}let e=ft(t);for(let i of Array.from(this.cache.keys())){let[s]=i.split("::");(s===e||s.startsWith(`${e}/`)||e.startsWith(`${s}/`))&&this.cache.delete(i)}}cleanup(){this.cleanupDebounceTimer&&(clearTimeout(this.cleanupDebounceTimer),this.cleanupDebounceTimer=null),this.pendingCleanup.clear()}};var Hc=require("obsidian");var Es=class{constructor(t){this.app=t;this.fileContentCache=new Map}evictIfNeeded(){if(this.fileContentCache.size>=50){let t=this.fileContentCache.keys().next().value;t&&this.fileContentCache.delete(t)}}async getFileContent(t){let e=t.path,i=this.fileContentCache.get(e),s=Date.now(),r=t.stat?.mtime||0;if(i){if(s-i.timestamp<3e5&&i.fileMtime===r)return this.fileContentCache.delete(e),this.fileContentCache.set(e,i),i.content;this.fileContentCache.delete(e)}this.evictIfNeeded();let o=await this.app.vault.read(t),a=t.stat?.mtime||s;return this.fileContentCache.set(e,{content:o,timestamp:s,fileMtime:a}),o}invalidateFileCache(t){this.fileContentCache.delete(t)}async ensureFileWithHeading(t,e="good-habit"){let i=this.app.vault.getAbstractFileByPath(t);if(i instanceof Hc.TFile)return i;let s=t.split("/").slice(0,-1).join("/");s&&!this.app.vault.getAbstractFileByPath(s)&&await this.app.vault.createFolder(s);let r=`---
type: "${e}"
data: {}
---
`;return this.app.vault.create(t,r)}findJsonBounds(t,e){if(e===-1)return null;let i=e+5;for(;i<t.length&&/\s/.test(t[i]);)i++;if(i>=t.length||t[i]!=="{")return null;let s=0,r=!1,o=!1,a=i;for(let l=i;l<t.length;l++){let c=t[l];if(o){o=!1;continue}if(c==="\\"){o=!0;continue}if(c==='"'){r=!r;continue}if(!r){if(c==="{")s++;else if(c==="}"&&(s--,s===0)){a=l+1;break}}}return s!==0?null:{start:i,end:a}}parseFrontmatterData(t){let e=t.indexOf("data:"),i=this.findJsonBounds(t,e);if(!i)return{};let s=t.substring(i.start,i.end).trim();if(s==="{}")return{};try{let r=JSON.parse(s),o={};for(let[a,l]of Object.entries(r))o[a]=Hn(String(l));return o}catch(r){return V("Tracker: error parsing JSON data",r),{}}}formatDataToJson(t){if(Object.keys(t).length===0)return`data: {}
`;let e=Object.keys(t).sort(),i={};for(let r of e)i[r]=t[r];return`data: ${JSON.stringify(i)}
`}replaceDataInFrontmatter(t,e){let i=t.trim(),s=i.indexOf("data:"),r=this.findJsonBounds(i,s);if(r){let o=e.trim();i=i.substring(0,s)+o+i.substring(r.end)}else i=i+`
`+e.trim();return i.endsWith(`
`)||(i+=`
`),i}async readTrackerFile(t){try{let i=(await this.getFileContent(t)).match(/^---\n([\s\S]*?)\n---/);if(!i)return{entries:new Map,fileOpts:{mode:P.GOOD_HABIT}};let s=i[1],r=this.parseFrontmatterData(s),o=this.parseFileOptions(s),a=new Map;return Object.entries(r).forEach(([l,c])=>{a.set(l,c)}),{entries:a,fileOpts:o}}catch(e){return V("Tracker: error reading tracker file",e),{entries:new Map,fileOpts:{mode:P.GOOD_HABIT}}}}async readAllEntries(t){let{entries:e}=await this.readTrackerFile(t);return e}async writeLogLineFromState(t,e,i,s){try{let r=await this.getFileContent(t);this.invalidateFileCache(t.path);let o=r.match(/^---\n([\s\S]*?)\n---/);if(!o)throw new Error(it.NO_FRONTMATTER);let a=o[1],l=r.slice(o[0].length),c=this.formatDataToJson(Object.fromEntries(e.entries)),h=`---
${this.replaceDataInFrontmatter(a,c.trim())}---${l}`;await this.app.vault.modify(t,h)}catch(r){let o=r instanceof Error?r.message:String(r);throw V("Tracker: write error",r),new Error(o)}}async writeLogLine(t,e,i){try{let s=await this.getFileContent(t);this.invalidateFileCache(t.path);let r=s.match(/^---\n([\s\S]*?)\n---/);if(!r)throw new Error(it.NO_FRONTMATTER);let o=r[1],a=s.slice(r[0].length),l=this.parseFrontmatterData(o);l[e]=Hn(i);let c=this.formatDataToJson(l),h=`---
${this.replaceDataInFrontmatter(o,c.trim())}---${a}`;await this.app.vault.modify(t,h)}catch(s){let r=s instanceof Error?s.message:String(s);throw V("Tracker: write error",s),new Error(r)}}async deleteEntryFromState(t,e,i){try{let s=await this.getFileContent(t);this.invalidateFileCache(t.path);let r=s.match(/^---\n([\s\S]*?)\n---/);if(!r)throw new Error(it.NO_FRONTMATTER);let o=r[1],a=s.slice(r[0].length),l=this.formatDataToJson(Object.fromEntries(e.entries)),d=`---
${this.replaceDataInFrontmatter(o,l.trim())}---${a}`;await this.app.vault.modify(t,d)}catch(s){let r=s instanceof Error?s.message:String(s);throw V("Tracker: delete entry error",s),new Error(r)}}async deleteEntry(t,e){try{let i=await this.getFileContent(t);this.invalidateFileCache(t.path);let s=i.match(/^---\n([\s\S]*?)\n---/);if(!s)throw new Error(it.NO_FRONTMATTER);let r=s[1],o=i.slice(s[0].length),a=this.parseFrontmatterData(r);delete a[e];let l=this.formatDataToJson(a),d=`---
${this.replaceDataInFrontmatter(r,l.trim())}---${o}`;await this.app.vault.modify(t,d)}catch(i){let s=i instanceof Error?i.message:String(i);throw V("Tracker: delete entry error",i),new Error(s)}}parseFileOptions(t){let e={};try{let i=t.match(/^type:\s*["']?([^"'\s\n]+)["']?/m);e.mode=i&&i[1]?i[1].trim():P.GOOD_HABIT;let s=t.match(/^minValue:\s*([\d.]+)/m);s&&(e.minValue=s[1]);let r=t.match(/^maxValue:\s*([\d.]+)/m);r&&(e.maxValue=r[1]);let o=t.match(/^step:\s*([\d.]+)/m);o&&(e.step=o[1]);let a=t.match(/^minLimit:\s*([\d.]+)/m);a&&(e.minLimit=a[1]);let l=t.match(/^maxLimit:\s*([\d.]+)/m);l&&(e.maxLimit=l[1]);let c=t.match(/^unit:\s*["']?([^"'\n]+)["']?/m);c&&c[1]&&(e.unit=c[1].trim());let d=t.match(/^trackingStartDate:\s*["']?([^"'\s\n]+)["']?/m);d&&d[1]&&(e.trackingStartDate=d[1].trim())}catch(i){V("Tracker: error parsing frontmatter options",i),e.mode=P.GOOD_HABIT}return e}async getFileTypeFromFrontmatter(t){let{fileOpts:e}=await this.readTrackerFile(t);return e}getStartTrackingDate(t,e,i){return i?.trackingStartDate?i.trackingStartDate:D.format(D.now(),e.dateFormat)}calculateStreak(t,e,i,s,r,o){let a=0,l=i instanceof Date?D.fromDate(i):D.fromDate(new Date(i));l=D.startOfDay(l);let d=(s||"good-habit").toLowerCase()==="bad-habit",h=Wn(o,r,t,e,l);if(!h||!h.isValid())return 0;let u=0;for(;u<3650&&!D.isBefore(l,h);){let f=ln(t,l,e);if(cn(f,d))a++;else break;l=l.subtract(1,"days"),u++}return a}calculateBestStreak(t,e,i,s,r){let a=(i||"good-habit").toLowerCase()==="bad-habit";if(t.size===0)return 0;let l=D.now(),c=D.startOfDay(l),d=Wn(r,s,t,e,c);if(!d||!d.isValid())return 0;let h=0,u=0,f=0;for(;!D.isBefore(c,d)&&f<3650;){let p=ln(t,c,e);cn(p,a)?(u++,h=Math.max(h,u)):u=0,c=c.subtract(1,"days"),f++}return h}};var te=require("obsidian");var Wc=require("obsidian");var Pn=class extends Wc.AbstractInputSuggest{constructor(t,e,i){super(t,e),this.folders=i}getSuggestions(t){let e=t.toLowerCase().trim();return e?this.folders.filter(i=>(i.path||"").toLowerCase().includes(e)).slice(0,100):this.folders.slice(0,100)}renderSuggestion(t,e){let i=t.path||"";e.textContent=i||L.ROOT_FOLDER}selectSuggestion(t){let e=t.path||"";this.setValue(e),this.close()}};var Ms=class extends te.PluginSettingTab{constructor(e,i){super(e,i);this.folderDebounceTimer=null;this.daysDebounceTimer=null;this.plugin=i}updateSettingImmediate(e){e(),B.setSettings({...this.plugin.settings})}display(){let{containerEl:e}=this;e.empty();let i=this.app.vault.getAllFolders();new te.Setting(e).setName("Default trackers folder").setDesc("Can be overridden with `folder` parameter in habit block").addText(s=>{s.setPlaceholder("0. Files/Trackers").setValue(this.plugin.settings.trackersFolder).onChange(r=>{this.updateSettingImmediate(()=>{this.plugin.settings.trackersFolder=r.trim()}),this.folderDebounceTimer&&clearTimeout(this.folderDebounceTimer),this.folderDebounceTimer=setTimeout(async()=>{await this.plugin.saveSettings(),this.folderDebounceTimer=null},300)}),new Pn(this.app,s.inputEl,i)}),new te.Setting(e).setName("Number of days").setDesc("Number of past days displayed for charts and habits. Can be overridden with `days` parameter in tracker/habit block").addText(s=>s.setPlaceholder("30").setValue(String(this.plugin.settings.daysToShow)).onChange(r=>{let o=parseInt(r.trim());!isNaN(o)&&o>0&&(this.updateSettingImmediate(()=>{this.plugin.settings.daysToShow=o}),this.daysDebounceTimer&&clearTimeout(this.daysDebounceTimer),this.daysDebounceTimer=setTimeout(async()=>{await this.plugin.saveSettings(),this.daysDebounceTimer=null},300))})),new te.Setting(e).setName("Show chart by default").setDesc("Can be overridden with showChart: `true/false` parameter").addToggle(s=>s.setValue(this.plugin.settings.showChartByDefault).onChange(async r=>{this.plugin.settings.showChartByDefault=r,await this.plugin.saveSettings()})),new te.Setting(e).setName("Show statistics by default").setDesc("Can be overridden with showStats: `true/false` parameter").addToggle(s=>s.setValue(this.plugin.settings.showStatsByDefault).onChange(async r=>{this.plugin.settings.showStatsByDefault=r,await this.plugin.saveSettings()})),new te.Setting(e).setName("Hide chart on mobile").addToggle(s=>s.setValue(this.plugin.settings.hideChartOnMobile).onChange(async r=>{this.plugin.settings.hideChartOnMobile=r,await this.plugin.saveSettings()})),new te.Setting(e).setName("Hide statistics on mobile").addToggle(s=>s.setValue(this.plugin.settings.hideStatsOnMobile).onChange(async r=>{this.plugin.settings.hideStatsOnMobile=r,await this.plugin.saveSettings()})),new te.Setting(e).setName("Hide tracker title").addToggle(s=>s.setValue(this.plugin.settings.hideTrackerTitle).onChange(async r=>{this.updateSettingImmediate(()=>{this.plugin.settings.hideTrackerTitle=r}),await this.plugin.saveSettings()})),new te.Setting(e).setName("Disable color reaction to range compliance").setDesc("Disables color feedback when metric values are within or outside the defined limit range").addToggle(s=>s.setValue(this.plugin.settings.disableLimitReaction).onChange(async r=>{this.plugin.settings.disableLimitReaction=r,await this.plugin.saveSettings()}))}};var vt=require("obsidian");function Uc(n,t=P.GOOD_HABIT){n.innerHTML="";let e=document.createElement("optgroup");e.label=L.HABITS_GROUP;let i=document.createElement("option");i.value=P.GOOD_HABIT,i.textContent=_t[P.GOOD_HABIT],e.appendChild(i);let s=document.createElement("option");s.value=P.BAD_HABIT,s.textContent=_t[P.BAD_HABIT],e.appendChild(s),n.appendChild(e);let r=document.createElement("optgroup");r.label=L.METRICS_GROUP;let o=document.createElement("option");o.value=P.NUMBER,o.textContent=_t[P.NUMBER],r.appendChild(o);let a=document.createElement("option");a.value=P.SCALE,a.textContent=_t[P.SCALE],r.appendChild(a);let l=document.createElement("option");l.value=P.PLUSMINUS,l.textContent=_t[P.PLUSMINUS],r.appendChild(l);let c=document.createElement("option");c.value=P.TEXT,c.textContent=_t[P.TEXT],r.appendChild(c),n.appendChild(r),n.value=t}function wo(n){return[P.NUMBER,P.PLUSMINUS,P.TEXT,P.SCALE].includes(n)}var Ds=class extends vt.Modal{constructor(t,e){super(t),this.plugin=e}onOpen(){let{contentEl:t}=this;t.empty(),t.createEl("h2",{text:L.CREATE_TRACKER});let e=new vt.Setting(t).setName(L.NAME).addText(y=>{y.setPlaceholder(jt.TRACKER_NAME),y.inputEl.style.width="100%"}),i=this.app.vault.getAllFolders(),s=new vt.Setting(t).setName(L.PATH).addText(y=>{let x=this.plugin.settings.trackersFolder||on.trackersFolder;y.setPlaceholder(x),y.setValue(""),y.inputEl.style.width="100%",new Pn(this.app,y.inputEl,i)}),r=new vt.Setting(t).setName(L.TYPE).addDropdown(y=>{y.setValue(P.GOOD_HABIT)}),o=r.controlEl.querySelector("select");o&&Uc(o,P.GOOD_HABIT);let a=new vt.Setting(t).setName(L.START_DATE).addText(y=>{let x=new Date().toISOString().split("T")[0];y.setValue(x),y.inputEl.type="date",y.inputEl.style.width="100%"}),l=t.createEl("h3",{text:L.PARAMETERS}),c=new vt.Setting(t).setName(L.UNIT).addText(y=>{y.setPlaceholder(jt.UNIT),y.inputEl.style.width="100%"}),d=c.controlEl.querySelector("input"),h=new vt.Setting(t).setName(L.STEP).addText(y=>{y.setPlaceholder(String(H.STEP)).setValue(String(H.STEP)).inputEl.type="number",y.inputEl.step="any",y.inputEl.style.width="100%"}),u=new vt.Setting(t).setName(L.VALUE_FROM).addText(y=>{y.setPlaceholder(String(H.MIN_VALUE)).setValue(String(H.MIN_VALUE)).inputEl.type="number",y.inputEl.style.width="100%"}),f=new vt.Setting(t).setName(L.VALUE_TO).addText(y=>{y.setPlaceholder(String(H.MAX_VALUE)).setValue(String(H.MAX_VALUE)).inputEl.type="number",y.inputEl.style.width="100%"}),p=new vt.Setting(t).setName(L.STEP).addText(y=>{y.setPlaceholder(String(H.STEP)).setValue(String(H.STEP)).inputEl.type="number",y.inputEl.step="any",y.inputEl.style.width="100%"});l.style.display="none",c.settingEl.style.display="none",h.settingEl.style.display="none",u.settingEl.style.display="none",f.settingEl.style.display="none",p.settingEl.style.display="none";let m=t.createEl("h3",{text:L.LIMITS}),g=t.createEl("p",{text:L.LIMITS_DESCRIPTION,cls:"tracker-notes__limits-description"});g.style.fontSize="0.9em",g.style.color="var(--text-muted, #999999)",g.style.marginTop="0.5em",g.style.marginBottom="1em";let _=new vt.Setting(t).setName(L.UPPER_LIMIT).addText(y=>{y.setPlaceholder(jt.LIMIT_NONE).setValue("").inputEl.type="number",y.inputEl.style.width="100%"}),b=new vt.Setting(t).setName(L.LOWER_LIMIT).addText(y=>{y.setPlaceholder(jt.LIMIT_NONE).setValue("").inputEl.type="number",y.inputEl.style.width="100%"});m.style.display="none",g.style.display="none",b.settingEl.style.display="none",_.settingEl.style.display="none";let k=r.controlEl.querySelector("select");k&&(k.onchange=()=>{let y=k.value===P.SCALE,x=wo(k.value),T=k.value===P.PLUSMINUS,w=k.value===P.TEXT;x?(l.style.display="",c.settingEl.style.display="",w?d&&(d.value=H.TEXT_UNIT,d.disabled=!0):d&&(d.disabled=!1),y?(u.settingEl.style.display="",f.settingEl.style.display="",p.settingEl.style.display="",h.settingEl.style.display="none"):(u.settingEl.style.display="none",f.settingEl.style.display="none",p.settingEl.style.display="none",h.settingEl.style.display=T?"":"none")):(l.style.display="none",c.settingEl.style.display="none",h.settingEl.style.display="none",u.settingEl.style.display="none",f.settingEl.style.display="none",p.settingEl.style.display="none"),x?(m.style.display="",g.style.display="",b.settingEl.style.display="",_.settingEl.style.display=""):(m.style.display="none",g.style.display="none",b.settingEl.style.display="none",_.settingEl.style.display="none")}),new vt.Setting(t).addButton(y=>{y.setButtonText(L.CREATE).setCta().onClick(async()=>{let T=e.controlEl.querySelector("input").value.trim();if(!T){new vt.Notice(it.ENTER_NAME);return}let w=r.controlEl.querySelector("select"),v=w?w.value:P.GOOD_HABIT,E=v===P.SCALE?u.controlEl.querySelector("input")?.value||String(H.MIN_VALUE):String(H.MIN_VALUE),C=v===P.SCALE?f.controlEl.querySelector("input")?.value||String(H.MAX_VALUE):String(H.MAX_VALUE),R=v===P.SCALE?p.controlEl.querySelector("input")?.value||String(H.STEP):v===P.PLUSMINUS?h.controlEl.querySelector("input")?.value||String(H.STEP):String(H.STEP),F=b.controlEl.querySelector("input"),X=_.controlEl.querySelector("input"),$=F?.value.trim()||"",I=X?.value.trim()||"";if($&&I){let Rt=parseFloat($),Nt=parseFloat(I);if(!isNaN(Rt)&&!isNaN(Nt)&&Nt<=Rt){new vt.Notice(L.UPPER_LIMIT_MUST_BE_GREATER);return}}let M=c.controlEl.querySelector("input")?.value.trim()||"",U=v===P.TEXT?H.TEXT_UNIT:M,W=wo(v),St=a.controlEl.querySelector("input")?.value||new Date().toISOString().split("T")[0],Q=Sa(T)+".md",nt=s.controlEl.querySelector("input")?.value.trim()||"";nt===L.ROOT_FOLDER&&(nt="");let wt=nt||this.plugin.settings.trackersFolder,At=wt?`${wt}/${Q}`:Q;try{let Rt=await this.plugin.ensureFileWithHeading(At,v),Nt=await this.app.vault.read(Rt),Pe=Nt.match(/^---\n([\s\S]*?)\n---/),Ut=`type: "${v}"
`;if(Ut+=`trackingStartDate: "${St}"
`,v===P.SCALE?(Ut+=`minValue: ${parseFloat(E)||H.MIN_VALUE}
`,Ut+=`maxValue: ${parseFloat(C)||H.MAX_VALUE}
`,Ut+=`step: ${parseFloat(R)||H.STEP}
`):v===P.PLUSMINUS&&(Ut+=`step: ${parseFloat(R)||H.STEP}
`),$&&(Ut+=`minLimit: ${parseFloat($)}
`),I&&(Ut+=`maxLimit: ${parseFloat(I)}
`),U&&W){let Jt=U.replace(/"/g,'\\"');Ut+=`unit: "${Jt}"
`}Ut+=`data: {}
`;let Vs=Pe?Nt.slice(Pe[0].length).trim():Nt.trim(),Ln=`---
${Ut}---${Vs?`

${Vs}`:""}`;await this.app.vault.modify(Rt,Ln),new vt.Notice(`${In.TRACKER_CREATED}: ${T}`);let Bt=this.plugin.getFolderPathFromFile(Rt.path);await this.plugin.onTrackerCreated(Bt,Rt),this.close()}catch(Rt){let Nt=Rt instanceof Error?Rt.message:String(Rt);new vt.Notice(`${it.CREATE_ERROR}: ${Nt}`),V("Tracker: error creating tracker",Rt)}})})}onClose(){this.contentEl.empty()}};var gt=require("obsidian");var As=class extends gt.Modal{constructor(t,e,i){super(t),this.plugin=e,this.file=i}async onOpen(){let{contentEl:t}=this;t.empty(),t.createEl("h2",{text:L.EDIT_TRACKER});let e=await this.plugin.getFileTypeFromFrontmatter(this.file),i=e.mode||"good-habit",s=this.file.basename,r=e.unit||"",o=e.minValue||"",a=e.maxValue||"",l=e.step||"",c=e.minLimit||"",d=e.maxLimit||"",h=e.trackingStartDate||new Date().toISOString().split("T")[0],u=new gt.Setting(t).setName(L.NAME).addText(M=>{M.setPlaceholder(jt.TRACKER_NAME),M.setValue(s),M.inputEl.style.width="100%"}),p=new gt.Setting(t).setName(L.TYPE).addDropdown(M=>{M.addOption("good-habit",_t["good-habit"]),M.addOption("bad-habit",_t["bad-habit"]),M.addOption("number",_t.number),M.addOption("scale",_t.scale),M.addOption("plusminus",_t.plusminus),M.addOption("text",_t.text),M.setValue(i),M.selectEl.disabled=!0}).controlEl.querySelector("select");if(p){p.innerHTML="";let M=document.createElement("optgroup");M.label=L.HABITS_GROUP;let U=document.createElement("option");U.value="good-habit",U.textContent=_t["good-habit"],M.appendChild(U);let W=document.createElement("option");W.value="bad-habit",W.textContent=_t["bad-habit"],M.appendChild(W),p.appendChild(M);let ot=document.createElement("optgroup");ot.label=L.METRICS_GROUP;let St=document.createElement("option");St.value="number",St.textContent=_t.number,ot.appendChild(St);let Q=document.createElement("option");Q.value="scale",Q.textContent=_t.scale,ot.appendChild(Q);let at=document.createElement("option");at.value="plusminus",at.textContent=_t.plusminus,ot.appendChild(at);let nt=document.createElement("option");nt.value="text",nt.textContent=_t.text,ot.appendChild(nt),p.appendChild(ot),p.value=i,p.disabled=!0}let m=new gt.Setting(t).setName(L.START_DATE).addText(M=>{M.setValue(h),M.inputEl.type="date",M.inputEl.style.width="100%"}),g=t.createDiv({cls:"tracker-notes__start-date-warning",attr:{style:"display: none; margin-top: 0.5em; padding: 0.75em; background: var(--background-modifier-error); color: #fff; border-radius: 4px; font-size: 0.9em;"}}),_=m.controlEl.querySelector("input");_&&_.addEventListener("input",async()=>{let M=_.value;if(!M||M===h){g.style.display="none";return}try{let W=(await this.app.vault.read(this.file)).match(/^---\n([\s\S]*?)\n---/),ot={};W&&(ot=this.plugin.parseFrontmatterData(W[1]));let St=D.parse(M,"YYYY-MM-DD"),Q=0;for(let[at]of Object.entries(ot))try{let nt=D.parseMultiple(at,[this.plugin.settings.dateFormat,"YYYY-MM-DD","DD.MM.YYYY","MM/DD/YYYY"]);D.isBefore(nt,St)&&Q++}catch{}if(Q>0){let at=D.format(St,this.plugin.settings.dateFormat),nt=Q===1?L.RECORD_SINGULAR:L.RECORDS_PLURAL;g.textContent=L.WARNING_RECORDS_BEFORE_DATE.replace("{count}",String(Q)).replace("{records}",nt).replace("{date}",at),g.style.display="block"}else g.style.display="none"}catch(U){V("Tracker: error checking data",U),g.style.display="none"}});let b=t.createEl("h3",{text:L.PARAMETERS}),k=new gt.Setting(t).setName(L.UNIT).addText(M=>{let U=i==="text"?H.TEXT_UNIT:r;M.setPlaceholder(jt.UNIT),M.setValue(U),M.inputEl.style.width="100%",i==="text"&&(M.inputEl.disabled=!0)}),y=k.controlEl.querySelector("input"),x=new gt.Setting(t).setName(L.STEP).addText(M=>{M.setPlaceholder(String(H.STEP)).setValue(l||String(H.STEP)).inputEl.type="number",M.inputEl.step="any",M.inputEl.style.width="100%"}),T=new gt.Setting(t).setName(L.VALUE_FROM).addText(M=>{M.setPlaceholder(String(H.MIN_VALUE)).setValue(o||String(H.MIN_VALUE)).inputEl.type="number",M.inputEl.style.width="100%"}),w=new gt.Setting(t).setName(L.VALUE_TO).addText(M=>{M.setPlaceholder(String(H.MAX_VALUE)).setValue(a||String(H.MAX_VALUE)).inputEl.type="number",M.inputEl.style.width="100%"}),v=new gt.Setting(t).setName(L.STEP).addText(M=>{M.setPlaceholder(String(H.STEP)).setValue(l||String(H.STEP)).inputEl.type="number",M.inputEl.step="any",M.inputEl.style.width="100%"}),E=t.createEl("h3",{text:L.LIMITS}),C=t.createEl("p",{text:L.LIMITS_DESCRIPTION,cls:"tracker-notes__limits-description"});C.style.fontSize="0.9em",C.style.color="var(--text-muted, #999999)",C.style.marginTop="0.5em",C.style.marginBottom="1em";let R=new gt.Setting(t).setName(L.UPPER_LIMIT).addText(M=>{M.setPlaceholder(jt.LIMIT_NONE).setValue(d).inputEl.type="number",M.inputEl.style.width="100%"}),F=new gt.Setting(t).setName(L.LOWER_LIMIT).addText(M=>{M.setPlaceholder(jt.LIMIT_NONE).setValue(c).inputEl.type="number",M.inputEl.style.width="100%"}),X=()=>{let M=p.value==="scale",U=["number","plusminus","text","scale"].includes(p.value),W=p.value==="plusminus",ot=p.value==="text";U?(b.style.display="",k.settingEl.style.display="",ot?y&&(y.value=H.TEXT_UNIT,y.disabled=!0):y&&(y.disabled=!1),M?(T.settingEl.style.display="",w.settingEl.style.display="",v.settingEl.style.display="",x.settingEl.style.display="none"):(T.settingEl.style.display="none",w.settingEl.style.display="none",v.settingEl.style.display="none",x.settingEl.style.display=W?"":"none")):(b.style.display="none",k.settingEl.style.display="none",x.settingEl.style.display="none",T.settingEl.style.display="none",w.settingEl.style.display="none",v.settingEl.style.display="none"),U?(E.style.display="",C.style.display="",F.settingEl.style.display="",R.settingEl.style.display=""):(E.style.display="none",C.style.display="none",F.settingEl.style.display="none",R.settingEl.style.display="none")};X(),p&&(p.onchange=X);let $=t.createDiv({cls:"tracker-modal-buttons"});$.createEl("button",{text:L.DELETE,cls:"mod-warning"}).addEventListener("click",async()=>{try{let M=this.file.path,U=this.file.basename;await this.plugin.onTrackerDeleted(M),await this.app.vault.delete(this.file),new gt.Notice(`${In.TRACKER_DELETED}: ${U}`),this.close()}catch(M){let U=M instanceof Error?M.message:String(M);new gt.Notice(`${it.UPDATE_ERROR}: ${U}`),V("Tracker: error deleting tracker",M)}}),$.createEl("button",{text:L.SAVE,cls:"mod-cta"}).addEventListener("click",async()=>{let U=u.controlEl.querySelector("input").value.trim();if(!U){new gt.Notice(it.ENTER_NAME);return}let W=p?p.value:i,ot=W==="scale"&&T.controlEl.querySelector("input")?.value||"0",St=W==="scale"&&w.controlEl.querySelector("input")?.value||"10",Q=W==="scale"?v.controlEl.querySelector("input")?.value||"1":W==="plusminus"&&x.controlEl.querySelector("input")?.value||"1",at=F.controlEl.querySelector("input"),nt=R.controlEl.querySelector("input"),wt=at?.value.trim()||"",At=nt?.value.trim()||"";if(wt&&At){let Bt=parseFloat(wt),Jt=parseFloat(At);if(!isNaN(Bt)&&!isNaN(Jt)&&Jt<=Bt){new gt.Notice(L.UPPER_LIMIT_MUST_BE_GREATER);return}}let Nt=k.controlEl.querySelector("input")?.value.trim()||"",Pe=W==="text"?H.TEXT_UNIT:Nt,Ut=["number","plusminus","text","scale"].includes(W),Ln=m.controlEl.querySelector("input")?.value||h;try{let Bt=await this.app.vault.read(this.file),Jt=Bt.match(/^---\n([\s\S]*?)\n---/),Do=Jt?Bt.slice(Jt[0].length).trim():Bt.trim(),bi={};if(Jt&&(bi=this.plugin.parseFrontmatterData(Jt[1])),Ln!==h){let Vt=D.parse(Ln,"YYYY-MM-DD"),Ze=[];for(let[Zt]of Object.entries(bi))try{let Yt=D.parseMultiple(Zt,[this.plugin.settings.dateFormat,"YYYY-MM-DD","DD.MM.YYYY","MM/DD/YYYY"]);D.isBefore(Yt,Vt)&&Ze.push(Zt)}catch{}for(let Zt of Ze)delete bi[Zt]}let ee=`type: "${W}"
`;if(ee+=`trackingStartDate: "${Ln}"
`,W==="scale"?(ee+=`minValue: ${parseFloat(ot)||0}
`,ee+=`maxValue: ${parseFloat(St)||10}
`,ee+=`step: ${parseFloat(Q)||1}
`):W==="plusminus"&&(ee+=`step: ${parseFloat(Q)||1}
`),wt&&(ee+=`minLimit: ${parseFloat(wt)}
`),At&&(ee+=`maxLimit: ${parseFloat(At)}
`),Pe&&Ut){let Vt=Pe.replace(/"/g,'\\"');ee+=`unit: "${Vt}"
`}let $c=this.plugin.formatDataToJson(bi);ee+=$c;let jc=`---
${ee}---${Do?`

${Do}`:""}`;try{let Vt=this.file.path,Ze=this.file.basename;await this.app.vault.modify(this.file,jc);let Zt=this.file;if(U!==Ze)try{let Yt=U.replace(/[<>:"/\\|?*]/g,"_")+".md",yi=this.file.parent?.path||"",zs=yi?`${yi}/${Yt}`:Yt,dm=await this.app.vault.rename(this.file,zs),Ao=this.file;Ao.path!==Vt&&(Zt=Ao,this.plugin.handleTrackerRenamed(Vt,Zt))}catch(Yt){let yi=Yt instanceof Error?Yt.message:String(Yt);V("Tracker: error renaming file",Yt)}if(new gt.Notice(`${In.TRACKER_UPDATED}: ${U}`),this.plugin.invalidateCacheForFile(Zt),Vt!==Zt.path)for(let Yt of Array.from(this.plugin.activeBlocks))Yt.containerEl.querySelectorAll(`.tracker-notes__tracker[data-file-path="${Vt}"]`).forEach(zs=>{zs.dataset.filePath=Zt.path});await this.plugin.refreshTrackersForFile(Zt),this.close()}catch(Vt){let Ze=Vt instanceof Error?Vt.message:String(Vt);new gt.Notice(`${it.UPDATE_ERROR}: ${Ze}`),V("Tracker: error updating tracker",Vt)}}catch(Bt){let Jt=Bt instanceof Error?Bt.message:String(Bt);new gt.Notice(`${it.UPDATE_ERROR}: ${Jt}`),console.error("Tracker: error updating tracker",Bt)}})}onClose(){this.contentEl.empty()}};var Rs=require("obsidian");var Cs=class extends Rs.Modal{constructor(t,e,i){super(t),this.files=e,this.onPick=i}onOpen(){let{contentEl:t}=this;if(t.empty(),this.files.length===0){new Rs.Notice(L.NO_TRACKERS_FOUND),this.close();return}t.createEl("h3",{text:L.SELECT_TRACKER}),this.files.slice(0,200).forEach(e=>{let i=t.createEl("button",{text:e.path});i.onclick=()=>{this.close(),this.onPick(e)}})}onClose(){this.onPick(null),this.contentEl.empty()}};var Yc=`/* ============================================\r
   Tracker: Habits & Metrics - Base Styles\r
   ============================================ */\r
\r
/* Reset hover effects for code blocks */\r
.markdown-source-view.mod-cm6 .cm-embed-block.cm-lang-habit:hover,\r
.markdown-source-view.mod-cm6 .cm-embed-block.cm-lang-tracker:hover { \r
  box-shadow: none; \r
  cursor: default; \r
}\r
\r
/* ============================================\r
   Main Container\r
   ============================================ */\r
.tracker-notes { \r
  margin: 1.25em 0; \r
  padding: 1.25em; \r
  border-radius: 12px; \r
  background: var(--background-secondary); \r
  border: 1px solid var(--background-modifier-border);\r
  box-shadow: \r
    0 1px 2px rgba(0, 0, 0, 0.04),\r
    0 4px 12px rgba(0, 0, 0, 0.06);\r
  box-sizing: border-box; \r
  max-width: 100%; \r
  overflow-x: hidden;\r
  transition: box-shadow 0.2s ease;\r
}\r
\r
.tracker-notes:hover {\r
  box-shadow: \r
    0 2px 4px rgba(0, 0, 0, 0.04),\r
    0 6px 16px rgba(0, 0, 0, 0.08);\r
}\r
\r
/* ============================================\r
   Header Section\r
   ============================================ */\r
.tracker-notes__header { \r
  display: flex; \r
  flex-direction: column; \r
  gap: 1em; \r
  margin: 0.75em 0; \r
  margin-bottom: 1em; \r
  box-sizing: border-box; \r
  align-items: center; \r
}\r
\r
.tracker-notes__header-title { \r
  display: flex; \r
  align-items: center; \r
  gap: 0.5em; \r
  font-weight: 700; \r
  font-size: 1.2em; \r
  color: var(--text-normal);\r
  letter-spacing: -0.01em;\r
}\r
\r
.tracker-notes__header-icon { \r
  font-size: 1.35em;\r
  opacity: 0.9;\r
}\r
\r
.tracker-notes__header-label { \r
  font-size: inherit;\r
}\r
\r
.tracker-notes__date-picker-container { \r
  width: 100%; \r
  display: flex; \r
  justify-content: center; \r
}\r
\r
/* ============================================\r
   Trackers Grid\r
   ============================================ */\r
.tracker-notes__trackers { \r
  display: grid; \r
  grid-template-columns: repeat(2, 1fr); \r
  gap: 1em; \r
}\r
\r
/* ============================================\r
   Folder Hierarchy\r
   ============================================ */\r
.tracker-notes__hierarchy { \r
  display: flex; \r
  flex-direction: column; \r
  gap: 1.75em; \r
}\r
\r
.tracker-notes__folder-node { \r
  display: flex; \r
  flex-direction: column; \r
  margin-bottom: 1.15em; \r
}\r
\r
.tracker-notes__folder-node.level-0 { \r
  padding-left: 0; \r
  margin-bottom: 0; \r
}\r
\r
.tracker-notes__folder-node.level-1 { \r
  padding-left: 0; \r
  margin-top: 1.15em; \r
  margin-bottom: 1.4em; \r
}\r
\r
.tracker-notes__folder-node.level-2 { \r
  padding-left: 1.15em; \r
  margin-top: 0.85em; \r
  margin-bottom: 1.15em; \r
}\r
\r
.tracker-notes__folder-node.level-3 { \r
  padding-left: 0.6em; \r
  margin-top: 0.6em; \r
  margin-bottom: 0.85em; \r
}\r
\r
.tracker-notes__folder-header { \r
  font-weight: 700; \r
  color: var(--text-normal); \r
  margin-bottom: 0.65em; \r
  margin-top: 0.5em; \r
  padding-bottom: 0.45em; \r
  border-bottom: 2px solid var(--background-modifier-border); \r
  display: flex; \r
  align-items: center; \r
  justify-content: space-between; \r
  gap: 0.55em;\r
  transition: border-color 0.2s ease;\r
}\r
\r
.tracker-notes__folder-header > span {\r
  display: flex;\r
  align-items: center;\r
  gap: 0.4em;\r
}\r
\r
.tracker-notes__folder-header.level-0 { \r
  font-size: 1.45em; \r
  margin-top: 0;\r
  letter-spacing: -0.01em;\r
}\r
\r
.tracker-notes__folder-header.level-1 { \r
  font-size: 1.4em; \r
  margin-top: 0.3em;\r
  letter-spacing: -0.01em;\r
}\r
\r
.tracker-notes__folder-header.level-2 { \r
  font-size: 1.2em; \r
  margin-top: 0.3em; \r
  border-bottom-width: 1px;\r
}\r
\r
.tracker-notes__folder-header.level-3 { \r
  font-size: 1.05em; \r
  margin-top: 0.3em; \r
  border-bottom-width: 1px;\r
}\r
\r
/* ============================================\r
   Error & Success Messages\r
   ============================================ */\r
.tracker-notes__error { \r
  color: var(--text-on-accent, #ffffff); \r
  padding: 0.85em 1.15em; \r
  background: var(--text-error, #d32f2f); \r
  border: none; \r
  border-radius: 10px; \r
  margin: 0.6em 0; \r
  font-size: 0.9em; \r
  font-weight: 600; \r
  word-wrap: break-word; \r
  overflow-wrap: break-word; \r
  line-height: 1.5; \r
  box-shadow: 0 3px 10px rgba(200, 0, 0, 0.25);\r
}\r
\r
.tracker-notes__success { \r
  color: var(--text-success, var(--text-normal)); \r
  padding: 0.5em 0.75em; \r
  background: var(--background-modifier-success, var(--background-modifier-border)); \r
  border-radius: 8px; \r
  margin: 0.45em 0; \r
  font-size: 0.85em; \r
  word-wrap: break-word; \r
  overflow-wrap: break-word;\r
}\r
\r
/* ============================================\r
   Loading Indicator\r
   ============================================ */\r
.tracker-notes__loading { \r
  display: none; \r
  align-items: center; \r
  gap: 0.45em; \r
  font-size: 0.85em; \r
  color: var(--text-muted); \r
  margin-top: 0.35em; \r
}\r
\r
.tracker-notes__loading.is-active { \r
  display: flex; \r
}\r
\r
.tracker-notes__loading-dot { \r
  width: 0.9em; \r
  height: 0.9em; \r
  border-radius: 50%; \r
  border: 2px solid var(--interactive-accent); \r
  border-top-color: transparent; \r
  animation: tracker-loading-spin 0.8s linear infinite; \r
}\r
\r
@keyframes tracker-loading-spin { \r
  0% { transform: rotate(0deg); } \r
  100% { transform: rotate(360deg); } \r
}\r
\r
/* ============================================\r
   View Mode Visibility\r
   ============================================ */\r
\r
/* Hide buttons in preview mode */\r
.markdown-preview-view .tracker-notes__settings-btn,\r
.markdown-preview-view .tracker-notes__order-btns {\r
  display: none !important;\r
}\r
\r
/* Explicit display in edit mode */\r
.markdown-source-view .tracker-notes__settings-btn,\r
.markdown-source-view .tracker-notes__order-btns {\r
  display: flex;\r
}\r
\r
/* Keep old limit classes for backward compatibility */\r
.tracker-notes__tracker-header.tracker-notes__limit-error,\r
.tracker-notes__tracker-header.tracker-notes__limit-success {\r
  transition: border-color 0.2s ease;\r
}\r
\r
/* ============================================\r
   Iconize Integration\r
   ============================================ */\r
.tracker-notes__folder-header .iconize-icon,\r
.tracker-notes__tracker-title .iconize-icon {\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  vertical-align: middle;\r
  line-height: 1;\r
  flex-shrink: 0;\r
}\r
\r
.tracker-notes__folder-header .tracker-notes__folder-icon {\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  vertical-align: middle;\r
  line-height: 1;\r
  flex-shrink: 0;\r
  margin-right: 0 !important;\r
}\r
\r
.tracker-notes__folder-header .lucide-icon,\r
.tracker-notes__tracker-title .lucide-icon {\r
  font-size: 0.9em;\r
  opacity: 0.85;\r
}\r
\r
.tracker-notes__folder-name {\r
  cursor: pointer;\r
}\r
\r
/* ============================================\r
   Animations\r
   ============================================ */\r
@keyframes pulse { \r
  0%, 100% { transform: scale(1); } \r
  50% { transform: scale(1.1); } \r
}\r
\r
/* ============================================\r
   Tracker: Habits & Metrics - Component Styles\r
   ============================================ */\r
\r
/* ============================================\r
   Individual Tracker Card\r
   ============================================ */\r
.tracker-notes__tracker { \r
  padding: 1em 1.25em; \r
  border-radius: 10px; \r
  background: var(--background-primary); \r
  border: 1px solid var(--background-modifier-border); \r
  box-shadow: \r
    0 1px 3px rgba(0, 0, 0, 0.04),\r
    0 2px 8px rgba(0, 0, 0, 0.04);\r
  box-sizing: border-box; \r
  max-width: 100%; \r
  overflow-x: hidden;\r
  position: relative;\r
}\r
\r
/* ============================================\r
   Tracker Header\r
   ============================================ */\r
.tracker-notes__tracker-header { \r
  margin-bottom: 0.85em; \r
  padding-bottom: 0.65em; \r
  border-bottom: 1px solid var(--background-modifier-border); \r
  display: flex; \r
  align-items: center; \r
  justify-content: space-between; \r
  gap: 0.5em;\r
  position: relative;\r
}\r
\r
/* Limit progress indicator */\r
.tracker-notes__tracker-header::after {\r
  content: '';\r
  position: absolute;\r
  bottom: -1px;\r
  left: 0;\r
  height: 2px;\r
  width: var(--limit-progress-width, 0%);\r
  background-color: var(--limit-progress-color, transparent);\r
  transition: width 0.3s ease, background-color 0.3s ease;\r
  z-index: 1;\r
  border-radius: 1px;\r
}\r
\r
.tracker-notes__tracker-title { \r
  font-weight: 600; \r
  font-size: 1em; \r
  color: var(--text-normal); \r
  margin: 0; \r
  word-wrap: break-word; \r
  overflow-wrap: break-word; \r
  text-decoration: none !important; \r
  flex: 1; \r
  min-width: 0;\r
  display: flex;\r
  align-items: center;\r
  gap: 0.4em;\r
}\r
\r
.tracker-notes__tracker-title a {\r
  color: inherit;\r
  text-decoration: none;\r
  transition: color 0.15s ease;\r
}\r
\r
.tracker-notes__tracker-title a:hover {\r
  color: var(--text-accent, var(--interactive-accent));\r
}\r
\r
.tracker-notes__tracker-icon {\r
  margin-right: 0 !important;\r
}\r
\r
/* ============================================\r
   Settings & Order Buttons\r
   ============================================ */\r
.tracker-notes__settings-btn { \r
  padding: 0.35em 0.5em !important; \r
  border: 1px solid var(--background-modifier-border); \r
  border-radius: 6px; \r
  background: var(--background-secondary); \r
  color: var(--text-muted); \r
  cursor: pointer; \r
  font-size: 0.85em; \r
  transition: all 0.2s ease; \r
  white-space: nowrap; \r
  flex-shrink: 0; \r
  flex-grow: 0; \r
  width: auto; \r
  min-width: 2em; \r
  max-width: 2.5em; \r
  height: 2em; \r
  display: flex; \r
  align-items: center; \r
  justify-content: center; \r
  opacity: 0.6;\r
}\r
\r
.tracker-notes__settings-btn:hover { \r
  background: var(--interactive-hover); \r
  border-color: var(--interactive-accent); \r
  transform: translateY(-1px); \r
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); \r
  opacity: 1;\r
  color: var(--text-normal);\r
}\r
\r
.tracker-notes__settings-btn:active { \r
  transform: scale(0.95) translateY(0); \r
}\r
\r
.tracker-notes__order-btns { \r
  display: flex; \r
  gap: 0.3em; \r
  align-items: center; \r
  flex-shrink: 0; \r
}\r
\r
.tracker-notes__order-btn-up, \r
.tracker-notes__order-btn-down { \r
  padding: 0.35em 0.5em !important; \r
  border: 1px solid var(--background-modifier-border); \r
  border-radius: 6px; \r
  background: var(--background-secondary); \r
  color: var(--text-muted); \r
  cursor: pointer; \r
  font-size: 0.85em; \r
  transition: all 0.2s ease; \r
  white-space: nowrap; \r
  flex-shrink: 0; \r
  width: auto; \r
  min-width: 2em; \r
  max-width: 2.5em; \r
  height: 2em; \r
  display: flex; \r
  align-items: center; \r
  justify-content: center; \r
  opacity: 0.6;\r
}\r
\r
.tracker-notes__order-btn-up:hover, \r
.tracker-notes__order-btn-down:hover { \r
  background: var(--interactive-hover); \r
  border-color: var(--interactive-accent); \r
  transform: translateY(-1px); \r
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); \r
  opacity: 1;\r
  color: var(--text-normal);\r
}\r
\r
.tracker-notes__order-btn-up:active, \r
.tracker-notes__order-btn-down:active { \r
  transform: scale(0.95) translateY(0); \r
}\r
\r
.tracker-notes__order-btn-up:disabled, \r
.tracker-notes__order-btn-down:disabled { \r
  opacity: 0.25; \r
  cursor: not-allowed; \r
}\r
\r
.tracker-notes__order-btn-up:disabled:hover, \r
.tracker-notes__order-btn-down:disabled:hover { \r
  background: var(--background-secondary); \r
  border-color: var(--background-modifier-border); \r
  transform: none; \r
  box-shadow: none; \r
}\r
\r
/* ============================================\r
   Controls Row\r
   ============================================ */\r
.tracker-notes__row { \r
  display: flex; \r
  align-items: center; \r
  gap: 0.65em; \r
  padding: 0.5em 0; \r
  flex-wrap: wrap; \r
}\r
\r
.tracker-notes__value { \r
  min-width: 2.5em; \r
  text-align: center; \r
  font-weight: 700; \r
  font-size: 1.1em; \r
  color: var(--text-normal); \r
  transition: transform 0.2s ease, color 0.2s ease; \r
  flex-shrink: 0;\r
  padding: 0.25em 0.5em;\r
  background: var(--background-secondary);\r
  border-radius: 6px;\r
}\r
\r
.tracker-notes__value.updated { \r
  animation: pulse 0.3s ease;\r
  color: var(--interactive-accent);\r
}\r
\r
/* ============================================\r
   Form Inputs\r
   ============================================ */\r
.tracker-notes input { \r
  outline: none !important; \r
}\r
\r
.tracker-notes input[type="number"] { \r
  width: 5em; \r
  min-width: 5em; \r
  max-width: 100%; \r
  padding: 0.5em 0.75em; \r
  border: 1px solid var(--background-modifier-border); \r
  border-radius: 8px; \r
  background: var(--background-primary);\r
  color: var(--text-normal); \r
  font-size: 0.95em;\r
  font-weight: 500;\r
  transition: border-color 0.2s ease, box-shadow 0.2s ease; \r
  box-sizing: border-box; \r
  transform: scale(1) !important;\r
}\r
\r
.tracker-notes input[type="number"]:hover {\r
  border-color: var(--background-modifier-border-hover, var(--background-modifier-border));\r
}\r
\r
.tracker-notes input[type="number"]:focus { \r
  outline: none !important; \r
  box-shadow: 0 0 0 2px rgba(var(--interactive-accent-rgb, 127, 109, 242), 0.2) !important;\r
  border-color: var(--interactive-accent);\r
}\r
\r
/* Range Slider */\r
.tracker-notes input[type="range"], \r
.tracker-notes__slider { \r
  flex: 1 1 auto; \r
  min-width: 0; \r
  height: 8px; \r
  border-radius: 4px; \r
  background: var(--background-modifier-border); \r
  outline: none; \r
  appearance: none;\r
  -webkit-appearance: none; \r
  cursor: pointer;\r
  transition: background 0.2s ease;\r
}\r
\r
.tracker-notes input[type="range"]:hover,\r
.tracker-notes__slider:hover {\r
  background: var(--background-modifier-border-hover, var(--background-modifier-border));\r
}\r
\r
.tracker-notes input[type="range"]::-webkit-slider-thumb, \r
.tracker-notes__slider::-webkit-slider-thumb { \r
  appearance: none;\r
  -webkit-appearance: none;\r
  -moz-appearance: none;\r
  width: 20px; \r
  height: 20px; \r
  border-radius: 50%; \r
  background: var(--interactive-accent); \r
  cursor: pointer; \r
  transition: all 0.2s ease; \r
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);\r
  border: 2px solid var(--background-primary);\r
}\r
\r
.tracker-notes input[type="range"]::-webkit-slider-thumb:hover, \r
.tracker-notes__slider::-webkit-slider-thumb:hover { \r
  transform: scale(1.15); \r
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);\r
}\r
\r
.tracker-notes input[type="range"]::-moz-range-thumb, \r
.tracker-notes__slider::-moz-range-thumb { \r
  width: 20px; \r
  height: 20px; \r
  border-radius: 50%; \r
  background: var(--interactive-accent); \r
  cursor: pointer; \r
  border: 2px solid var(--background-primary);\r
  transition: all 0.2s ease; \r
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);\r
}\r
\r
.tracker-notes input[type="range"]::-moz-range-thumb:hover, \r
.tracker-notes__slider::-moz-range-thumb:hover { \r
  transform: scale(1.15); \r
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);\r
}\r
\r
/* ============================================\r
   Progress Bar (Scale Input)\r
   ============================================ */\r
.tracker-notes__progress-bar-wrapper { \r
  display: inline; \r
  white-space: normal; \r
  width: 100%; \r
}\r
\r
.tracker-notes__progress-bar-input { \r
  height: var(--input-height, 2.75em); \r
  width: 100%; \r
  border-radius: 10px;\r
  border: 1px solid var(--background-modifier-border);\r
  position: relative; \r
  cursor: col-resize; \r
  background: var(--background-secondary);\r
  user-select: none; \r
  box-sizing: border-box; \r
  outline: none; \r
  overflow: hidden;\r
  transition: border-color 0.2s ease, box-shadow 0.2s ease;\r
}\r
\r
.tracker-notes__progress-bar-progress { \r
  height: 100%; \r
  background: linear-gradient(90deg, \r
    var(--interactive-accent) 0%, \r
    color-mix(in srgb, var(--interactive-accent) 85%, white) 100%\r
  );\r
  border-radius: 10px;\r
  pointer-events: none; \r
  position: absolute; \r
  left: 0; \r
  top: 0; \r
  z-index: 3;\r
  transition: width 0.15s ease;\r
}\r
\r
.tracker-notes__progress-bar-value { \r
  position: absolute; \r
  top: 50%; \r
  left: 50%; \r
  transform: translate(-50%, -50%); \r
  font-size: 0.95em; \r
  font-weight: 700; \r
  color: var(--text-normal); \r
  pointer-events: none; \r
  z-index: 4; \r
  white-space: nowrap;\r
  text-shadow: 0 1px 1px rgb(0 0 0 / 10%);\r
}\r
\r
.tracker-notes__progress-bar-label-left { \r
  position: absolute; \r
  top: 50%; \r
  transform: translate(0, -50%); \r
  left: 0.75em; \r
  font-size: 0.8em; \r
  color: var(--text-muted); \r
  font-weight: 600; \r
  pointer-events: none; \r
  z-index: 1;\r
  opacity: 0.7;\r
}\r
\r
.tracker-notes__progress-bar-label-right { \r
  position: absolute; \r
  top: 50%; \r
  transform: translate(0, -50%); \r
  right: 0.75em;\r
  font-size: 0.8em;\r
  color: var(--text-muted); \r
  font-weight: 600; \r
  pointer-events: none; \r
  z-index: 1;\r
  opacity: 0.7;\r
}\r
\r
/* ============================================\r
   Buttons\r
   ============================================ */\r
.tracker-notes button { \r
  padding: 0.5em 1em; \r
  border: 1px solid var(--background-modifier-border); \r
  border-radius: 8px; \r
  background: var(--background-secondary); \r
  color: var(--text-normal); \r
  cursor: pointer; \r
  font-size: 0.9em;\r
  font-weight: 600;\r
  transition: all 0.2s ease; \r
  white-space: nowrap; \r
  flex-shrink: 0;\r
}\r
\r
.tracker-notes button:hover { \r
  background: var(--interactive-hover); \r
  border-color: var(--interactive-accent); \r
  transform: translateY(-1px); \r
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);\r
}\r
\r
.tracker-notes button:active { \r
  transform: scale(0.97) translateY(0); \r
}\r
\r
/* ============================================\r
   Text Input\r
   ============================================ */\r
.tracker-notes__text-input { \r
  width: 100%; \r
  max-width: 100%; \r
  padding: 0.65em 0.85em; \r
  border: 1px solid var(--background-modifier-border); \r
  border-radius: 10px; \r
  background: var(--background-primary); \r
  color: var(--text-normal); \r
  font-family: inherit; \r
  font-size: 0.9em; \r
  transition: border-color 0.2s ease, box-shadow 0.2s ease; \r
  resize: vertical; \r
  min-height: 70px; \r
  box-sizing: border-box;\r
  line-height: 1.5;\r
}\r
\r
.tracker-notes__text-input:hover {\r
  background: var(--background-primary) !important;\r
}\r
\r
.tracker-notes__text-input:focus { \r
  outline: none !important; \r
  border-color: var(--interactive-accent);\r
  box-shadow: 0 0 0 3px rgba(var(--interactive-accent-rgb, 127, 109, 242), 0.15);\r
}\r
\r
/* ============================================\r
   Statistics Section\r
   ============================================ */\r
.tracker-notes__stats { \r
  margin-top: 1em; \r
  margin-bottom: 0.5em; \r
  padding-top: 0.85em; \r
  padding-bottom: 0.5em; \r
  border-top: 1px solid var(--background-modifier-border); \r
  font-size: 0.88em; \r
  color: var(--text-muted); \r
  line-height: 1.6; \r
  word-wrap: break-word; \r
  overflow-wrap: break-word; \r
}\r
\r
.tracker-notes__stats > div { \r
  margin: 0.35em 0;\r
  transition: opacity 0.2s ease;\r
}\r
\r
.tracker-notes__stats-section { \r
  margin: 0.6em 0; \r
}\r
\r
.tracker-notes__stats-item { \r
  margin: 0.3em 0; \r
  padding: 0.25em 0; \r
}\r
\r
.tracker-notes__stats-streak { \r
  font-size: 1em; \r
}\r
\r
/* Statistics Card */\r
.tracker-notes__stats-card { \r
  background: var(--background-secondary); \r
  border: 1px solid var(--background-modifier-border); \r
  border-radius: 10px; \r
  padding: 0.85em 1.1em; \r
  margin: 0.6em 0; \r
  box-shadow: \r
    0 1px 3px rgba(0, 0, 0, 0.04),\r
    0 2px 6px rgba(0, 0, 0, 0.03);\r
}\r
\r
.tracker-notes__stats-section-title { \r
  font-weight: 700; \r
  font-size: 0.7em; \r
  color: var(--text-muted); \r
  margin-bottom: 0.7em; \r
  text-transform: uppercase; \r
  letter-spacing: 1.2px; \r
  opacity: 0.8;\r
  display: flex;\r
  align-items: center;\r
  gap: 0.4em;\r
}\r
\r
.tracker-notes__stats-metric { \r
  display: flex; \r
  align-items: baseline; \r
  margin: 0.55em 0; \r
  padding: 0.35em 0; \r
  gap: 0.45em; \r
  flex-wrap: wrap; \r
}\r
\r
.tracker-notes__stats-icon { \r
  font-size: 1.1em; \r
  line-height: 1; \r
  display: inline-flex; \r
  align-items: center; \r
  justify-content: center;\r
  flex-shrink: 0;\r
  opacity: 0.9;\r
}\r
\r
.tracker-notes__stats-icon--streak { \r
  font-size: 1.25em; \r
}\r
\r
.tracker-notes__stats-label { \r
  color: var(--text-muted); \r
  font-size: 0.9em; \r
  font-weight: 500;\r
}\r
\r
.tracker-notes__stats-value { \r
  color: var(--text-normal); \r
  font-weight: 700; \r
  font-size: 0.98em; \r
}\r
\r
.tracker-notes__stats-value--large { \r
  font-size: 1.15em; \r
  font-weight: 800;\r
}\r
\r
.tracker-notes__stats-value-sub { \r
  color: var(--text-muted); \r
  font-size: 0.85em; \r
  font-weight: 500; \r
}\r
\r
.tracker-notes__stats-value--success { \r
  color: var(--text-success, var(--interactive-accent)); \r
}\r
\r
.tracker-notes__stats-value--warning { \r
  color: var(--text-warning, var(--interactive-accent)); \r
}\r
\r
.tracker-notes__stats-value--error { \r
  color: var(--text-error, var(--interactive-accent)); \r
}\r
\r
.tracker-notes__stats-value--accent { \r
  color: var(--interactive-accent, var(--text-normal)); \r
}\r
\r
/* Completion Rate with Progress Bar */\r
.tracker-notes__stats-metric--completion { \r
  flex-direction: column; \r
  gap: 0.55em; \r
}\r
\r
.tracker-notes__stats-completion-header { \r
  display: flex; \r
  align-items: baseline; \r
  gap: 0.45em; \r
  flex-wrap: wrap; \r
}\r
\r
.tracker-notes__stats-progress-bar { \r
  width: 100%; \r
  height: 10px; \r
  background: var(--background-modifier-border); \r
  border-radius: 5px; \r
  overflow: hidden; \r
  position: relative; \r
  margin-top: 0.25em;\r
}\r
\r
.tracker-notes__stats-progress-fill { \r
  height: 100%; \r
  border-radius: 5px; \r
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease; \r
}\r
\r
.tracker-notes__stats-progress-fill.tracker-notes__stats-value--success { \r
  background: linear-gradient(90deg, \r
    var(--text-success, var(--interactive-accent)) 0%, \r
    color-mix(in srgb, var(--text-success, var(--interactive-accent)) 80%, white) 100%\r
  );\r
}\r
\r
.tracker-notes__stats-progress-fill.tracker-notes__stats-value--warning { \r
  background: linear-gradient(90deg, \r
    var(--text-warning, var(--interactive-accent)) 0%, \r
    color-mix(in srgb, var(--text-warning, var(--interactive-accent)) 80%, white) 100%\r
  );\r
}\r
\r
.tracker-notes__stats-progress-fill.tracker-notes__stats-value--error { \r
  background: linear-gradient(90deg, \r
    var(--text-error, var(--interactive-accent)) 0%, \r
    color-mix(in srgb, var(--text-error, var(--interactive-accent)) 80%, white) 100%\r
  );\r
}\r
\r
/* Streak Styles */\r
.tracker-notes__stats-metric--streak { \r
  margin: 0.55em 0; \r
  padding: 0.45em 0;\r
}\r
\r
/* Min/Max Inline Display */\r
.tracker-notes__stats-metric--minmax { \r
  gap: 0.35em; \r
}\r
\r
/* ============================================\r
   Heatmap\r
   ============================================ */\r
.tracker-notes__heatmap { \r
  display: flex; \r
  flex-direction: row-reverse; \r
  gap: 0.35em; \r
  overflow-x: auto; \r
  padding: 0.6em 0; \r
  margin-top: 0.6em; \r
  min-height: 2.75em; \r
  max-width: 100%; \r
  box-sizing: border-box; \r
  touch-action: pan-x pan-y;\r
  transition: opacity 0.15s ease;\r
}\r
\r
.tracker-notes__heatmap::-webkit-scrollbar { \r
  height: 6px; \r
}\r
\r
.tracker-notes__heatmap::-webkit-scrollbar-track { \r
  background: var(--background-modifier-border); \r
  border-radius: 3px; \r
}\r
\r
.tracker-notes__heatmap::-webkit-scrollbar-thumb { \r
  background: var(--text-muted); \r
  border-radius: 3px;\r
  transition: background 0.2s ease;\r
}\r
\r
.tracker-notes__heatmap::-webkit-scrollbar-thumb:hover { \r
  background: var(--text-normal); \r
}\r
\r
.tracker-notes__heatmap-day { \r
  aspect-ratio: 1; \r
  min-width: 2.65em; \r
  max-width: 3.2em; \r
  display: flex; \r
  align-items: center; \r
  justify-content: center; \r
  border-radius: 8px; \r
  font-size: 0.88em; \r
  background: var(--background-modifier-border); \r
  color: var(--text-muted); \r
  transition: 0.1s; \r
  cursor: pointer; \r
  font-weight: 600; \r
  flex-shrink: 0;\r
  border: 1px solid transparent;\r
}\r
\r
.tracker-notes__heatmap-day:hover:not(.before-start):not(.after-today) { \r
  filter: brightness(0.95);\r
}\r
\r
.tracker-notes__heatmap-day.has-value.good-habit { \r
  background: var(--interactive-accent); \r
  color: var(--text-on-accent, var(--text-normal));\r
  box-shadow: 0 2px 6px rgba(var(--interactive-accent-rgb, 127, 109, 242), 0.3);\r
}\r
\r
.tracker-notes__heatmap-day.has-value.bad-habit { \r
  background: var(--text-error, var(--background-modifier-error)); \r
  color: var(--text-on-accent, var(--text-normal));\r
  box-shadow: 0 2px 6px rgba(200, 0, 0, 0.25);\r
}\r
\r
.tracker-notes__heatmap-day.bad-habit:not(.has-value):not(.before-start):not(.after-today) { \r
  background: var(--interactive-accent); \r
  color: var(--text-on-accent, var(--text-normal));\r
  box-shadow: 0 2px 6px rgba(var(--interactive-accent-rgb, 127, 109, 242), 0.3);\r
}\r
\r
.tracker-notes__heatmap-day.good-habit.before-start,\r
.tracker-notes__heatmap-day.good-habit.after-today,\r
.tracker-notes__heatmap-day.bad-habit.before-start,\r
.tracker-notes__heatmap-day.bad-habit.after-today { \r
  background: var(--background-modifier-border); \r
  opacity: 0.5;\r
  cursor: default;\r
}\r
\r
.tracker-notes__heatmap-day.start-day { \r
  flex-direction: column;\r
  justify-content: center;\r
  align-items: center;\r
  line-height: 1;\r
}\r
\r
.tracker-notes__heatmap-day.start-day::after {\r
  content: "START";\r
  font-size: 0.45em;\r
  line-height: 1;\r
  margin-top: 0.15em;\r
  opacity: 0.75;\r
  font-weight: 700;\r
  letter-spacing: 0.5px;\r
}\r
\r
/* ============================================\r
   Calendar\r
   ============================================ */\r
.tracker-notes__calendar { \r
  display: grid; \r
  grid-template-columns: repeat(7, 1fr); \r
  gap: 0.35em; \r
  margin-top: 0.85em; \r
  max-width: 100%; \r
}\r
\r
.tracker-notes__calendar-day { \r
  aspect-ratio: 1; \r
  display: flex; \r
  align-items: center; \r
  justify-content: center; \r
  border-radius: 6px; \r
  font-size: 0.8em; \r
  background: var(--background-modifier-border); \r
  color: var(--text-muted); \r
  transition: all 0.2s ease; \r
  cursor: default; \r
  min-width: 0;\r
  font-weight: 500;\r
}\r
\r
.tracker-notes__calendar-day.has-value { \r
  background: var(--interactive-accent); \r
  color: var(--text-on-accent); \r
  font-weight: 700; \r
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);\r
}\r
\r
.tracker-notes__calendar-day:hover { \r
  transform: scale(1.1); \r
}\r
\r
.tracker-notes__calendar-day.start-day { \r
  position: relative; \r
  box-shadow: 0 0 0 2px var(--text-accent, var(--interactive-accent)) !important; \r
  opacity: 0.9; \r
}\r
\r
/* ============================================\r
   Chart\r
   ============================================ */\r
.tracker-notes__chart { \r
  margin-top: 0.85em; \r
  margin-bottom: 0.5em; \r
  border-top: 1px solid var(--background-modifier-border); \r
  padding-top: 0.85em; \r
  width: 100%; \r
  max-width: 100%; \r
  position: relative; \r
  height: 200px; \r
  box-sizing: border-box; \r
  overflow: hidden;\r
  transition: opacity 0.15s ease;\r
}\r
\r
.tracker-notes__chart canvas { \r
  max-width: 100% !important; \r
  width: 100% !important;\r
  height: 100% !important;\r
  display: block;\r
}\r
\r
/* ============================================\r
   Date Picker\r
   ============================================ */\r
.tracker-notes__date-picker { \r
  display: flex; \r
  align-items: center; \r
  gap: 0.5em; \r
  flex-wrap: wrap; \r
  justify-content: center; \r
  max-width: 100%;\r
  background: var(--background-primary);\r
  border-radius: 12px;\r
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);\r
}\r
\r
.tracker-notes__date-nav-btn { \r
  padding: 0.5em 0.85em; \r
  font-size: 1em; \r
  min-width: 2.5em; \r
  height: 2.5em; \r
  border: 1px solid var(--background-modifier-border); \r
  border-radius: 8px; \r
  background: var(--background-secondary); \r
  color: var(--text-normal); \r
  cursor: pointer; \r
  transition: all 0.2s ease; \r
  font-weight: 700; \r
  display: flex; \r
  align-items: center; \r
  justify-content: center; \r
  flex-shrink: 0;\r
}\r
\r
.tracker-notes__date-nav-btn:hover { \r
  background: var(--interactive-hover); \r
  border-color: var(--interactive-accent);\r
  transform: translateY(-1px); \r
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);\r
}\r
\r
.tracker-notes__date-nav-btn:active { \r
  transform: scale(0.95) translateY(0); \r
}\r
\r
.tracker-notes__date-input { \r
  padding: 0.5em 0.85em; \r
  border: 1px solid var(--background-modifier-border) !important; \r
  border-radius: 8px; \r
  background: var(--background-secondary); \r
  color: var(--text-normal); \r
  font-size: 1em !important; \r
  transition: all 0.2s ease; \r
  height: 2.5em; \r
  width: 165px; \r
  box-sizing: border-box; \r
  font-weight: 600; \r
  text-align: center; \r
  flex-shrink: 0;\r
}\r
\r
.tracker-notes__date-input:hover {\r
  border-color: var(--background-modifier-border-hover, var(--background-modifier-border)) !important;\r
}\r
\r
.tracker-notes__date-input.is-updating { \r
  opacity: 0.6; \r
  cursor: progress; \r
}\r
\r
.tracker-notes__date-input:focus { \r
  outline: none !important; \r
  box-shadow: 0 0 0 2px rgba(var(--interactive-accent-rgb, 127, 109, 242), 0.2) !important;\r
  border-color: var(--interactive-accent) !important;\r
}\r
\r
.tracker-notes__date-btn { \r
  padding: 0.5em 1.15em; \r
  font-size: 0.9em; \r
  white-space: nowrap; \r
  flex-shrink: 0; \r
  border: none; \r
  border-radius: 8px; \r
  background: var(--interactive-accent); \r
  color: var(--text-on-accent, var(--text-normal)); \r
  cursor: pointer; \r
  transition: all 0.2s ease; \r
  font-weight: 700; \r
  height: 2.5em;\r
  box-shadow: 0 2px 6px rgba(var(--interactive-accent-rgb, 127, 109, 242), 0.25);\r
}\r
\r
.tracker-notes__date-btn:hover { \r
  background: var(--interactive-accent-hover, var(--interactive-accent)); \r
  transform: translateY(-1px); \r
  box-shadow: 0 4px 12px rgba(var(--interactive-accent-rgb, 127, 109, 242), 0.35);\r
}\r
\r
.tracker-notes__date-btn:active { \r
  transform: scale(0.97) translateY(0); \r
}\r
\r
/* ============================================\r
   Modal Buttons\r
   ============================================ */\r
.tracker-modal-buttons {\r
  display: flex;\r
  justify-content: space-between;\r
  margin-top: 1.75em;\r
  gap: 1em;\r
}\r
\r
.tracker-modal-buttons button {\r
  padding: 0.65em 1.25em;\r
  border-radius: 8px;\r
  cursor: pointer;\r
  border: 1px solid var(--background-modifier-border);\r
  transition: all 0.2s ease;\r
  font-weight: 600;\r
}\r
\r
.tracker-modal-buttons button.mod-warning {\r
  background: var(--background-secondary);\r
  color: var(--text-normal);\r
}\r
\r
.tracker-modal-buttons button.mod-warning:hover {\r
  background: var(--text-error);\r
  border-color: var(--text-error);\r
  color: var(--text-on-accent);\r
  box-shadow: 0 3px 10px rgba(200, 0, 0, 0.25);\r
}\r
\r
.tracker-modal-buttons button.mod-cta {\r
  background: var(--interactive-accent);\r
  color: var(--text-on-accent);\r
  border-color: var(--interactive-accent);\r
}\r
\r
.tracker-modal-buttons button.mod-cta:hover {\r
  background: var(--interactive-accent-hover, var(--interactive-accent));\r
  border-color: var(--interactive-accent-hover, var(--interactive-accent));\r
}\r
\r
/* ============================================\r
   Tracker: Habits & Metrics - Responsive Styles\r
   ============================================ */\r
\r
/* Switch to single column on medium screens */\r
@media (max-width: 1600px) {\r
  .tracker-notes__trackers { \r
    display: grid !important; \r
    grid-template-columns: 1fr !important; \r
    gap: 1em; \r
  }\r
}\r
\r
/* Medium screens */\r
@media (max-width: 900px) {\r
  .tracker-notes__trackers { \r
    gap: 0.85em; \r
  }\r
  \r
  .tracker-notes__tracker { \r
    padding: 0.85em; \r
  }\r
}\r
\r
/* Tablet/Mobile */\r
@media (max-width: 700px) {\r
  .tracker-notes { \r
    padding: 0.65em; \r
    margin: 0.6em 0; \r
    border-radius: 10px; \r
  }\r
  \r
  .tracker-notes__header { \r
    margin: 0.5em 0; \r
    margin-bottom: 0.35em; \r
    gap: 0.55em; \r
  }\r
  \r
  .tracker-notes__header-title { \r
    font-size: 1.05em; \r
  }\r
  \r
  .tracker-notes__trackers { \r
    display: grid !important; \r
    grid-template-columns: 1fr !important; \r
    gap: 0.6em; \r
  }\r
  \r
  .tracker-notes__tracker { \r
    padding: 0.65em; \r
    border-radius: 8px; \r
  }\r
  \r
  .tracker-notes__tracker-header { \r
    margin-bottom: 0.55em; \r
    padding-bottom: 0.45em; \r
    overflow: hidden; \r
    white-space: nowrap; \r
    gap: 0.35em; \r
  }\r
  \r
  .tracker-notes__tracker-title { \r
    font-size: 0.92em; \r
    min-width: 0; \r
    overflow: hidden; \r
    text-overflow: ellipsis; \r
    white-space: nowrap; \r
    flex: 1 1 auto; \r
  }\r
  \r
  .tracker-notes__order-btns { \r
    display: flex; \r
    gap: 0.25em; \r
    align-items: center; \r
    flex-shrink: 0; \r
  }\r
  \r
  .tracker-notes__order-btn-up, \r
  .tracker-notes__order-btn-down { \r
    width: 1.85em; \r
    min-width: 1.85em; \r
    max-width: 1.85em; \r
    height: 1.85em; \r
    padding: 0 !important; \r
    font-size: 0.8em; \r
  }\r
  \r
  .tracker-notes__settings-btn { \r
    flex-shrink: 0; \r
    flex-grow: 0; \r
    width: 1.85em; \r
    min-width: 1.85em; \r
    max-width: 1.85em; \r
    height: 1.85em; \r
    padding: 0 !important; \r
    display: flex; \r
    align-items: center; \r
    justify-content: center; \r
  }\r
  \r
  .tracker-notes__date-picker-container { \r
    padding: 0; \r
  }\r
  \r
  .tracker-notes__date-picker { \r
    gap: 0.35em; \r
    flex-wrap: wrap;\r
    padding: 0.4em;\r
    border-radius: 10px;\r
  }\r
  \r
  .tracker-notes__date-nav-btn { \r
    padding: 0.4em 0.65em; \r
    font-size: 0.9em; \r
    min-width: 2.1em; \r
    height: 2.25em; \r
    background: var(--background-secondary) !important; \r
    border: 1px solid var(--background-modifier-border) !important; \r
    color: var(--text-normal) !important; \r
    flex-shrink: 0; \r
  }\r
  \r
  .tracker-notes__date-input { \r
    padding: 0.4em 0.65em; \r
    font-size: 0.9em !important; \r
    height: 2.25em; \r
    width: auto !important; \r
    min-width: auto !important; \r
    max-width: none !important; \r
    flex-shrink: 0; \r
    background: var(--background-secondary) !important; \r
    border: 1px solid var(--background-modifier-border) !important; \r
    color: var(--text-normal) !important; \r
  }\r
  \r
  .tracker-notes__row { \r
    gap: 0.45em; \r
    padding: 0.35em 0; \r
  }\r
  \r
  .tracker-notes__value { \r
    font-size: 0.95em; \r
    min-width: 2.1em;\r
    padding: 0.2em 0.4em;\r
  }\r
  \r
  .tracker-notes input[type="number"] { \r
    width: 100%; \r
    padding: 0.35em 0.55em; \r
    font-size: 0.88em; \r
    background: var(--background-primary) !important; \r
    border: 1px solid var(--background-modifier-border) !important; \r
    color: var(--text-normal) !important; \r
  }\r
  \r
  .tracker-notes button { \r
    padding: 0.35em 0.65em; \r
    font-size: 0.88em; \r
    width: 100%; \r
    background: var(--background-secondary) !important; \r
    border: 1px solid var(--background-modifier-border) !important; \r
    color: var(--text-normal) !important; \r
  }\r
  \r
  .tracker-notes__text-input { \r
    padding: 0.45em; \r
    font-size: 0.88em; \r
    min-height: 55px; \r
    background: var(--background-primary) !important; \r
    border: 1px solid var(--background-modifier-border) !important; \r
    color: var(--text-normal) !important; \r
  }\r
  \r
  .tracker-notes__stats { \r
    margin-top: 0.55em; \r
    margin-bottom: 0.45em; \r
    padding-top: 0.55em; \r
    padding-bottom: 0.45em; \r
    font-size: 0.82em; \r
  }\r
  \r
  .tracker-notes__stats-section { \r
    margin: 0.45em 0; \r
    padding: 0.35em 0; \r
  }\r
  \r
  .tracker-notes__stats-metric { \r
    margin: 0.35em 0; \r
    padding: 0.25em 0; \r
  }\r
  \r
  .tracker-notes__stats-section-title { \r
    font-size: 0.85em; \r
    margin-bottom: 0.35em; \r
  }\r
  \r
  .tracker-notes__stats-label { \r
    font-size: 0.85em; \r
  }\r
  \r
  .tracker-notes__stats-value { \r
    font-size: 0.92em; \r
  }\r
  \r
  .tracker-notes__stats-progress-bar { \r
    height: 7px; \r
  }\r
  \r
  .tracker-notes__stats-card {\r
    padding: 0.7em 0.9em;\r
    border-radius: 8px;\r
  }\r
  \r
  .tracker-notes__heatmap { \r
    gap: 0.25em; \r
    padding: 0.45em 0; \r
    margin-top: 0.45em; \r
  }\r
  \r
  .tracker-notes__heatmap::-webkit-scrollbar { \r
    height: 5px !important; \r
  }\r
  \r
  .tracker-notes__heatmap::-webkit-scrollbar-track { \r
    background: transparent !important; \r
    border-radius: 0 !important; \r
  }\r
  \r
  .tracker-notes__heatmap::-webkit-scrollbar-thumb { \r
    background: var(--text-muted) !important; \r
    border-radius: 2px !important; \r
    opacity: 0.5 !important; \r
  }\r
  \r
  .tracker-notes__heatmap::-webkit-scrollbar-thumb:hover { \r
    background: var(--text-normal) !important; \r
    opacity: 0.8 !important; \r
  }\r
  \r
  .tracker-notes__heatmap-day { \r
    min-width: 2.6em; \r
    max-width: 2.9em; \r
    font-size: 0.82em;\r
    border-radius: 6px;\r
  }\r
  \r
  .tracker-notes__calendar { \r
    gap: 0.2em; \r
    margin-top: 0.55em; \r
  }\r
  \r
  .tracker-notes__calendar-day { \r
    font-size: 0.68em; \r
  }\r
  \r
  .tracker-notes__chart { \r
    margin-top: 0.55em; \r
    margin-bottom: 0.45em; \r
    padding-top: 0.55em; \r
    height: 170px; \r
  }\r
  \r
  .tracker-notes__chart canvas { \r
    height: 100% !important; \r
  }\r
  \r
  .tracker-notes__hierarchy { \r
    gap: 1.1em; \r
  }\r
  \r
  .tracker-notes__folder-node { \r
    margin-bottom: 0.85em; \r
  }\r
  \r
  .tracker-notes__folder-node.level-0 { \r
    margin-bottom: 1.1em; \r
  }\r
  \r
  .tracker-notes__folder-node.level-1 { \r
    padding-left: 0; \r
    margin-top: 0.85em; \r
    margin-bottom: 0.85em; \r
  }\r
  \r
  .tracker-notes__folder-node.level-2 { \r
    padding-left: 0; \r
    margin-top: 0.55em; \r
    margin-bottom: 0.55em; \r
  }\r
  \r
  .tracker-notes__folder-node.level-3 { \r
    padding-left: 0; \r
    margin-top: 0.45em; \r
    margin-bottom: 0.45em; \r
  }\r
  \r
  .tracker-notes__folder-header { \r
    margin-bottom: 0.5em; \r
    margin-top: 0.25em; \r
    padding-bottom: 0.4em; \r
  }\r
  \r
  .tracker-notes__folder-header > span {\r
    gap: 0.35em;\r
  }\r
  \r
  .tracker-notes__folder-header.level-0 { \r
    font-size: 1.2em; \r
    margin-top: 0; \r
  }\r
  \r
  .tracker-notes__folder-header.level-1 { \r
    font-size: 1.15em; \r
  }\r
  \r
  .tracker-notes__folder-header.level-2 { \r
    font-size: 1em; \r
  }\r
  \r
  .tracker-notes__folder-header.level-3 { \r
    font-size: 0.92em; \r
  }\r
}\r
\r
/* Small Mobile */\r
@media (max-width: 480px) {\r
  .tracker-notes { \r
    padding: 0.5em; \r
    margin: 0.45em 0; \r
    border-radius: 8px; \r
  }\r
  \r
  .tracker-notes__header { \r
    margin: 0.45em 0; \r
    margin-bottom: 0.25em; \r
    gap: 0.45em; \r
  }\r
  \r
  .tracker-notes__header-title { \r
    font-size: 0.98em; \r
  }\r
  \r
  .tracker-notes__trackers { \r
    display: grid !important; \r
    grid-template-columns: 1fr !important; \r
    gap: 0.45em; \r
  }\r
  \r
  .tracker-notes__tracker { \r
    padding: 0.5em; \r
    border-radius: 7px; \r
  }\r
  \r
  .tracker-notes__tracker-header { \r
    margin-bottom: 0.45em; \r
    padding-bottom: 0.35em; \r
    overflow: hidden; \r
    white-space: nowrap; \r
    gap: 0.3em; \r
  }\r
  \r
  .tracker-notes__tracker-title { \r
    font-size: 0.88em; \r
    min-width: 0; \r
    overflow: hidden; \r
    text-overflow: ellipsis; \r
    white-space: nowrap; \r
    flex: 1 1 auto; \r
  }\r
  \r
  .tracker-notes__order-btns { \r
    display: flex; \r
    gap: 0.18em; \r
    align-items: center; \r
    flex-shrink: 0; \r
  }\r
  \r
  .tracker-notes__order-btn-up, \r
  .tracker-notes__order-btn-down { \r
    width: 1.65em; \r
    min-width: 1.65em; \r
    max-width: 1.65em; \r
    height: 1.65em; \r
    padding: 0 !important; \r
    font-size: 0.75em; \r
  }\r
  \r
  .tracker-notes__settings-btn { \r
    flex-shrink: 0; \r
    flex-grow: 0; \r
    width: 1.65em; \r
    min-width: 1.65em; \r
    max-width: 1.65em; \r
    height: 1.65em; \r
    padding: 0 !important; \r
    display: flex; \r
    align-items: center; \r
    justify-content: center; \r
  }\r
  \r
  .tracker-notes__date-picker { \r
    gap: 0.28em;\r
    padding: 0.35em;\r
    border-radius: 8px;\r
  }\r
  \r
  .tracker-notes__date-nav-btn { \r
    padding: 0.38em 0.55em; \r
    font-size: 0.85em; \r
    min-width: 1.9em; \r
    height: 2.05em; \r
    background: var(--background-secondary) !important; \r
    border: 1px solid var(--background-modifier-border) !important; \r
    color: var(--text-normal) !important; \r
    flex-shrink: 0; \r
  }\r
  \r
  .tracker-notes__date-input { \r
    padding: 0.38em 0.55em; \r
    font-size: 0.85em !important; \r
    height: 2.05em; \r
    width: auto !important; \r
    min-width: auto !important; \r
    max-width: none !important; \r
    flex-shrink: 0; \r
    background: var(--background-secondary) !important; \r
    border: 1px solid var(--background-modifier-border) !important; \r
    color: var(--text-normal) !important; \r
  }\r
  \r
  .tracker-notes__row { \r
    gap: 0.35em; \r
    padding: 0.28em 0; \r
  }\r
  \r
  .tracker-notes__value { \r
    font-size: 0.88em; \r
    min-width: 1.9em;\r
    padding: 0.18em 0.35em;\r
  }\r
  \r
  .tracker-notes input[type="number"] { \r
    padding: 0.28em 0.45em; \r
    font-size: 0.82em; \r
    background: var(--background-primary) !important; \r
    border: 1px solid var(--background-modifier-border) !important; \r
    color: var(--text-normal) !important; \r
  }\r
  \r
  .tracker-notes button { \r
    padding: 0.28em 0.55em; \r
    font-size: 0.82em; \r
    background: var(--background-secondary) !important; \r
    border: 1px solid var(--background-modifier-border) !important; \r
    color: var(--text-normal) !important; \r
  }\r
  \r
  .tracker-notes__text-input { \r
    padding: 0.38em; \r
    font-size: 0.82em; \r
    min-height: 48px; \r
    background: var(--background-primary) !important; \r
    border: 1px solid var(--background-modifier-border) !important; \r
    color: var(--text-normal) !important; \r
  }\r
  \r
  .tracker-notes__stats { \r
    margin-top: 0.45em; \r
    margin-bottom: 0.35em; \r
    padding-top: 0.45em; \r
    padding-bottom: 0.35em; \r
    font-size: 0.78em; \r
  }\r
  \r
  .tracker-notes__stats-section { \r
    margin: 0.38em 0; \r
    padding: 0.28em 0; \r
  }\r
  \r
  .tracker-notes__stats-metric { \r
    margin: 0.28em 0; \r
    padding: 0.18em 0; \r
  }\r
  \r
  .tracker-notes__stats-section-title { \r
    font-size: 0.82em; \r
    margin-bottom: 0.28em; \r
  }\r
  \r
  .tracker-notes__stats-label { \r
    font-size: 0.82em; \r
  }\r
  \r
  .tracker-notes__stats-value { \r
    font-size: 0.88em; \r
  }\r
  \r
  .tracker-notes__stats-progress-bar { \r
    height: 5px; \r
  }\r
  \r
  .tracker-notes__stats-card {\r
    padding: 0.55em 0.75em;\r
    border-radius: 7px;\r
    margin: 0.45em 0;\r
  }\r
  \r
  .tracker-notes__heatmap { \r
    gap: 0.18em; \r
    padding: 0.35em 0; \r
    margin-top: 0.35em; \r
  }\r
  \r
  .tracker-notes__heatmap::-webkit-scrollbar { \r
    height: 4px !important; \r
  }\r
  \r
  .tracker-notes__heatmap::-webkit-scrollbar-track { \r
    background: transparent !important; \r
    border-radius: 0 !important; \r
  }\r
  \r
  .tracker-notes__heatmap::-webkit-scrollbar-thumb { \r
    background: var(--text-muted) !important; \r
    border-radius: 2px !important; \r
    opacity: 0.5 !important; \r
  }\r
  \r
  .tracker-notes__heatmap::-webkit-scrollbar-thumb:hover { \r
    background: var(--text-normal) !important; \r
    opacity: 0.8 !important; \r
  }\r
  \r
  .tracker-notes__heatmap-day { \r
    min-width: 2.85em; \r
    max-width: 3.1em; \r
    font-size: 0.88em;\r
    border-radius: 6px;\r
  }\r
  \r
  .tracker-notes__heatmap-day.start-day::after { \r
    font-size: 0.42em; \r
  }\r
  \r
  .tracker-notes__calendar { \r
    gap: 0.12em; \r
    margin-top: 0.45em; \r
  }\r
  \r
  .tracker-notes__calendar-day { \r
    font-size: 0.62em; \r
  }\r
  \r
  .tracker-notes__chart { \r
    margin-top: 0.45em; \r
    margin-bottom: 0.35em; \r
    padding-top: 0.45em; \r
    height: 145px; \r
  }\r
  \r
  .tracker-notes__chart canvas { \r
    height: 100% !important; \r
  }\r
  \r
  .tracker-notes__hierarchy { \r
    gap: 0.85em; \r
  }\r
  \r
  .tracker-notes__folder-node { \r
    margin-bottom: 0.55em; \r
  }\r
  \r
  .tracker-notes__folder-node.level-0 { \r
    margin-bottom: 0.85em; \r
  }\r
  \r
  .tracker-notes__folder-node.level-1 { \r
    margin-top: 0.55em; \r
    margin-bottom: 0.55em; \r
  }\r
  \r
  .tracker-notes__folder-node.level-2 { \r
    margin-top: 0.45em; \r
    margin-bottom: 0.45em; \r
  }\r
  \r
  .tracker-notes__folder-node.level-3 { \r
    margin-top: 0.35em; \r
    margin-bottom: 0.35em; \r
  }\r
  \r
  .tracker-notes__folder-header { \r
    margin-bottom: 0.4em; \r
    margin-top: 0.2em; \r
    padding-bottom: 0.3em; \r
  }\r
  \r
  .tracker-notes__folder-header > span {\r
    gap: 0.3em;\r
  }\r
  \r
  .tracker-notes__folder-header.level-0 { \r
    font-size: 1.1em; \r
  }\r
  \r
  .tracker-notes__folder-header.level-1 { \r
    font-size: 1.05em; \r
  }\r
  \r
  .tracker-notes__folder-header.level-2 { \r
    font-size: 0.95em; \r
  }\r
  \r
  .tracker-notes__folder-header.level-3 { \r
    font-size: 0.88em; \r
  }\r
  \r
  .tracker-modal-buttons {\r
    flex-direction: column;\r
    gap: 0.6em;\r
  }\r
  \r
  .tracker-modal-buttons button {\r
    width: 100%;\r
  }\r
}\r
\r
`;function Eo(n){let t=n.match(/^(\d+)[-.\s]+(.+)$/);return t?{prefix:parseInt(t[1],10),name:t[2],original:n}:{prefix:null,name:n,original:n}}function Mo(n,t){if(t==null)return n;let e=t>=100?3:(t>=10,2);return`${String(t).padStart(e,"0")}-${n}`}var Os=class{constructor(t){this.app=t}async reorderTrackers(t,e){if(e.length===0)return;let i=e.length>=100?3:(e.length>=10,2);for(let s=0;s<e.length;s++){let r=e[s],o=Eo(r.basename),a=Mo(o.name,s+1),l=`${t}/${a}.md`;r.path!==l&&await this.app.vault.rename(r,l)}}async reorderFolders(t,e){if(e.length===0)return;let i=e.length>=100?3:(e.length>=10,2);for(let s=0;s<e.length;s++){let r=e[s],o=Eo(r.name),a=Mo(o.name,s+1),l=t?`${t}/${a}`:a;r.path!==l&&await this.app.vault.rename(r,l)}}};var im=500,Ps=class{constructor(t){this.app=t;this.watchInterval=null;this.lastDataHash="";this.hasActiveBlocks=null}setActiveBlocksChecker(t){this.hasActiveBlocks=t}async loadIconizeData(){try{let t=this.getIconizePlugin();if(!t||!t.data){B.setIconizeData(null);return}let e={...t.data};this.lastDataHash=this.hashData(t.data),B.setIconizeData(e)}catch{B.setIconizeData(null)}}startWatching(){this.stopWatching(),this.loadIconizeData(),this.watchInterval=setInterval(async()=>{if(!(this.hasActiveBlocks&&!this.hasActiveBlocks()))try{let t=this.getIconizePlugin();if(!t||!t.data)return;let e=this.hashData(t.data);e!==this.lastDataHash&&(this.lastDataHash=e,await this.loadIconizeData())}catch{}},im)}stopWatching(){this.watchInterval&&(clearInterval(this.watchInterval),this.watchInterval=null)}updateIconPath(t,e){setTimeout(async()=>{await this.loadIconizeData()},300)}hashData(t){return JSON.stringify(t)}getIconizePlugin(){let t=this.app.plugins;return t?.plugins?.["obsidian-icon-folder"]||t?.getPlugin?.("obsidian-icon-folder")}};var Ls=class{constructor(t,e,i){this.app=t;this.trackerFileService=e;this.folderTreeService=i;this.trackerState=new Map}evictIfNeeded(){if(this.trackerState.size>=100){let t=this.trackerState.keys().next().value;t&&this.trackerState.delete(t)}}async ensureTrackerState(t){let e=this.trackerState.get(t.path);if(e)return this.trackerState.delete(t.path),this.trackerState.set(t.path,e),e;this.evictIfNeeded();let{entries:i,fileOpts:s}=await this.trackerFileService.readTrackerFile(t),r={entries:i,fileOpts:s};return this.trackerState.set(t.path,r),r}clearTrackerState(t){this.trackerState.delete(t)}async clearAllCaches(){this.trackerState.clear(),this.folderTreeService.invalidate()}invalidateCacheForFolder(t,e){let i=e(t),s=this.app.vault.getAbstractFileByPath(i);s&&"children"in s&&this.clearCacheForFolder(s)}clearCacheForFolder(t){for(let e of t.children)"extension"in e&&e.extension==="md"?this.clearTrackerState(e.path):"children"in e&&this.clearCacheForFolder(e)}moveTrackerState(t,e){if(t===e)return;let i=this.trackerState.get(t);i?(this.trackerState.delete(t),this.trackerState.set(e,i)):this.trackerState.delete(e)}updateTrackerStateAfterRename(t){for(let[e,i]of t.entries())this.moveTrackerState(e,i)}updateTrackerStateForRenamedFolders(t,e){let i=new Map;for(let[s,r]of t.entries()){let o=this.app.vault.getAbstractFileByPath(s);if(!o||!("children"in o))continue;let a=h=>{let u=[];for(let f of h.children)"extension"in f&&f.extension==="md"?u.push(f):"children"in f&&u.push(...a(f));return u},l=a(o),c=e(s),d=e(r);for(let h of l){let u=e(h.path);if(u.startsWith(c+"/")){let f=u.substring(c.length),p=d+f;i.set(h.path,p)}}}this.updateTrackerStateAfterRename(i)}};var Fs=class{constructor(t,e){this.settings=t;this.saveSettingsCallback=e}updateSettings(t){this.settings=t}getRelativePath(t,e){return e(t)}getSortOrderForFolder(t,e,i){let s=this.getRelativePath(e,i),r=this.settings.customSortOrder?.[s];return r&&r.length>0?r:t.map(o=>"basename"in o?o.basename:o.name).sort((o,a)=>o.localeCompare(a,void 0,{sensitivity:"base"}))}async saveSortOrderForFolder(t,e,i){let s=this.getRelativePath(t,i),r=this.settings.customSortOrder?{...this.settings.customSortOrder}:{};r[s]=e,this.settings.customSortOrder=r,await this.saveSettingsCallback()}sortItemsByOrder(t,e,i){let s=this.getSortOrderForFolder(t,e,i),r=new Map;for(let c of t){let d="basename"in c?c.basename:c.name;r.set(d,c)}let o=[],a=new Set;for(let c of s){let d=r.get(c);d&&(o.push(d),a.add(c))}let l=[];for(let c of t){let d="basename"in c?c.basename:c.name;a.has(d)||l.push(c)}return l.sort((c,d)=>{let h="basename"in c?c.basename:c.name,u="basename"in d?d.basename:d.name;return h.localeCompare(u,void 0,{sensitivity:"base"})}),[...o,...l]}async updateCustomSortOrderOnRename(t,e,i,s,r){if(!this.settings.customSortOrder)return;let o={...this.settings.customSortOrder},a=!1;if(i){o[t]&&(o[e]=o[t],delete o[t],a=!0);let l=`${t}/`,c=`${e}/`,d=[];for(let f of Object.keys(o))f.startsWith(l)&&d.push(f);for(let f of d){let p=f.replace(l,c);o[p]=o[f],delete o[f],a=!0}let h=t.split("/").pop()||t,u=e.split("/").pop()||e;for(let f of Object.keys(o)){let p=o[f];if(Array.isArray(p)){let m=!1,g=p.map(_=>_===h?(m=!0,u):_);m&&(o[f]=g,a=!0)}}}else{let l=t.split("/").pop()||t,c=e.split("/").pop()||e,d=l.replace(/\.md$/,""),h=c.replace(/\.md$/,""),u=s(t),f=s(e),p=r(u),m=r(f),g=new Set;p&&g.add(p),m&&m!==p&&g.add(m);for(let _ of g)if(o[_]&&Array.isArray(o[_])){let b=o[_],k=!1,y=b.map(x=>x===d?(k=!0,h):x);k&&(o[_]=y,a=!0)}}a&&(this.settings.customSortOrder=o,await this.saveSettingsCallback())}async handleFileDeleteSortOrder(t,e,i){let s=e(t);if(!s)return;let r=t.split("/").pop()?.replace(/\.md$/,"")||"";if(!r)return;let o=i(s),a=this.getRelativePath(o,i);if(!this.settings.customSortOrder?.[a])return;let c=this.settings.customSortOrder[a].filter(d=>d!==r);await this.saveSortOrderForFolder(o,c,i)}async handleFolderDeleteSortOrder(t,e){if(!this.settings.customSortOrder)return;let i=e(t),s=this.getRelativePath(i,e),r={...this.settings.customSortOrder},o=!1,a=`${s}/`,l=[];for(let c of Object.keys(r))(c===s||c.startsWith(a))&&l.push(c);for(let c of l)delete r[c],o=!0;o&&(this.settings.customSortOrder=r,await this.saveSettingsCallback())}};var Is=class{constructor(t,e,i){this.getActiveBlocks=t;this.normalizePath=e;this.isFolderRelevant=i}async swapTrackerElementsInDOM(t,e){let i=this.normalizePath(t),s=this.getActiveBlocks(),r=Array.from(s).filter(o=>{let a=this.normalizePath(o.getFolderPath());return this.isFolderRelevant(i,a)});for(let o of r){let a=o.containerEl.querySelectorAll(`.tracker-notes__trackers[data-folder-path="${i}"]`);for(let l of Array.from(a)){let c=new Map;for(let h of e){let u=l.querySelector(`.tracker-notes__tracker[data-file-path="${h.path}"]`);u&&c.set(h.path,u)}let d=[];for(let h of e){let u=c.get(h.path);u&&d.push(u)}for(let h of d)h.parentElement&&h.remove();for(let h of d)l.appendChild(h)}}}async reorderFolderElementsInDOM(t,e){let i=this.normalizePath(t),s=this.getActiveBlocks(),r=Array.from(s).filter(o=>{let a=this.normalizePath(o.getFolderPath());return this.isFolderRelevant(i,a)});for(let o of r){let a=o.containerEl.querySelector(".tracker-notes__hierarchy");if(!a)continue;let l=null;if(!t||t===""||t==="/")l=a;else{let m=a.querySelectorAll(".tracker-notes__folder-node");for(let g of Array.from(m)){if(this.normalizePath(g.dataset.folderPath||"")===i){l=g;break}if(!l){let b=g.querySelector(".tracker-notes__trackers");if(b&&this.normalizePath(b.dataset.folderPath||"")===i){l=g;break}}}l||(l=a)}if(!l){Pi(`Tracker: Could not find parent container for ${t}`);continue}let d=Array.from(l.children).filter(m=>m.classList.contains("tracker-notes__folder-node")),h=new Map;for(let m of d){let g=this.normalizePath(m.dataset.folderPath||"");if(!g){let _=m.querySelector(".tracker-notes__trackers");_&&(g=this.normalizePath(_.dataset.folderPath||""))}g&&h.set(g,m)}let u=[];for(let m of e){let g=h.get(m.path);g&&u.push(g)}if(u.length===0){Pi(`Tracker: No folder elements found in DOM. Parent: ${t}`);continue}u.length<e.length&&Pi(`Tracker: Some folders not found in DOM. Expected ${e.length}, found ${u.length}. Parent: ${t}`);for(let m of u)m.parentElement&&m.remove();let f=null,p=Array.from(l.children);for(let m=p.length-1;m>=0;m--){let g=p[m];if(!g.classList.contains("tracker-notes__folder-node")){f=g.nextSibling;break}}if(f)for(let m of u)l.insertBefore(m,f);else for(let m of u)l.appendChild(m)}}async updateAllFolderButtonHandlersAfterRename(t,e,i,s){let r=this.getActiveBlocks();for(let o of Array.from(r)){let a=o.containerEl.querySelector(".tracker-notes__hierarchy");if(!a)continue;let l=a.querySelectorAll(".tracker-notes__folder-node");for(let c of Array.from(l)){let d=this.normalizePath(c.dataset.folderPath||"");if(!d)continue;let h=d;for(let[f,p]of t.entries()){let m=this.normalizePath(f),g=this.normalizePath(p);if(d===m){let _=e(g);_&&"children"in _?h=this.normalizePath(_.path):h=g;break}else if(d.startsWith(m+"/")){let _=d.substring(m.length),b=g+_,k=e(b);k&&"children"in k?h=this.normalizePath(k.path):h=b;break}}if(h!==d){c.dataset.folderPath=h;let f=c.querySelector(".tracker-notes__trackers");f&&(f.dataset.folderPath=h)}this.updateFolderButtonHandlers(c,h,i,s);let u=c.querySelectorAll(".tracker-notes__tracker");for(let f of Array.from(u)){let p=this.normalizePath(f.dataset.filePath||"");if(!p)continue;let m=p;for(let[g,_]of t.entries()){let b=this.normalizePath(g),k=this.normalizePath(_);if(p.startsWith(b+"/")){let y=p.substring(b.length),x=k+y,T=e(x);T&&"extension"in T?m=this.normalizePath(T.path):m=x;break}}if(m!==p){f.dataset.filePath=m;let g=f.querySelector("a.internal-link");g&&(g.href=m,g.setAttribute("data-href",m))}}}}}updateFolderButtonHandlers(t,e,i,s){let r=t.querySelector(`.${O.ORDER_BTN_CONTAINER}`);if(r){let o=r.querySelector(`.${O.ORDER_BTN_UP}`);o&&(o.onclick=async l=>{l.stopPropagation(),await i(e)});let a=r.querySelector(`.${O.ORDER_BTN_DOWN}`);a&&(a.onclick=async l=>{l.stopPropagation(),await s(e)})}}};var Ns=class{constructor(t){this.getWorkspace=t;this.activeBlocks=new Set;this.deletionTimers=new Set}addBlock(t){this.activeBlocks.add(t)}removeBlock(t){this.activeBlocks.delete(t)}clearAllBlocks(){this.deletionTimers.forEach(t=>clearTimeout(t)),this.deletionTimers.clear(),this.activeBlocks.forEach(t=>t.unload()),this.activeBlocks.clear()}isFolderRelevant(t,e){return e===t||!e||!t?!0:t.startsWith(`${e}/`)||e.startsWith(`${t}/`)}async refreshBlocksForFolder(t,e){let i=e(t),s=Array.from(this.activeBlocks).filter(r=>{let o=e(r.getFolderPath());return this.isFolderRelevant(i,o)});for(let r of s)try{await r.render()}catch(o){V("Tracker: error updating block",o)}}async refreshAllBlocks(){let t=new Map,e=o=>{if(!o)return;let a=window.getComputedStyle(o);(a.overflow==="auto"||a.overflow==="scroll"||a.overflowY==="auto"||a.overflowY==="scroll"||a.overflowX==="auto"||a.overflowX==="scroll")&&t.set(o,{top:o.scrollTop,left:o.scrollLeft})},i=this.getWorkspace();for(let o of i.getLeavesOfType("markdown")){let a=o.view;if(a&&a.containerEl){e(a.containerEl);let l=a.containerEl.querySelector(".cm-scroller");e(l);let c=a.containerEl.querySelector(".markdown-preview-view");e(c);let d=a.containerEl.querySelector(".cm-content");e(d);let h=a.containerEl.querySelector(".markdown-source-view");e(h)}}let s={top:window.scrollY,left:window.scrollX};for(let o of Array.from(this.activeBlocks))try{await o.render()}catch(a){V("Tracker: error updating block",a)}let r=()=>{window.scrollTo(s.left,s.top);for(let[o,a]of t.entries())if(o&&o.isConnected)try{o.scrollTop=a.top,o.scrollLeft=a.left}catch{}};requestAnimationFrame(()=>{requestAnimationFrame(()=>{r(),setTimeout(()=>{r()},0),setTimeout(()=>{r()},100)})})}async onTrackerDeleted(t){for(let e of Array.from(this.activeBlocks)){let i=Array.from(e.containerEl.querySelectorAll(".tracker-notes__trackers"));if(i.length!==0)for(let s of i){let r=Array.from(s.querySelectorAll(`.tracker-notes__tracker[data-file-path="${t}"]`));if(r.length!==0)for(let o of r){o.style.transition="opacity 0.2s ease",o.style.opacity="0";let a=setTimeout(()=>{o.isConnected&&o.remove(),this.deletionTimers.delete(a)},Go.TRANSITION_OPACITY_DURATION_MS);this.deletionTimers.add(a)}}}}};var Bs=class{constructor(){this.writeQueues=new Map}async executeWrite(t,e){let i=t.path,r=(this.writeQueues.get(i)||Promise.resolve()).then(async()=>{try{return await e()}catch(o){throw V("WriteQueueManager: operation failed",o),o}finally{this.writeQueues.get(i)===r&&this.writeQueues.delete(i)}}).catch(o=>{throw this.writeQueues.get(i)===r&&this.writeQueues.delete(i),o});return this.writeQueues.set(i,r),r}clear(){this.writeQueues.clear()}getQueueSize(t){return this.writeQueues.has(t)?1:0}};var _i=class extends xt.Plugin{constructor(){super(...arguments);this.refreshBlocksDebounceTimer=null}get activeBlocks(){return this.blockManager.activeBlocks}isMobileDevice(){return window.innerWidth<=768}async onload(){this.settings=Object.assign({},on,await this.loadData()),this.folderTreeService=new ws(this.app),this.folderTreeService.updateSettings(this.settings),this.trackerFileService=new Es(this.app),this.trackerOrderService=new Os(this.app),this.iconizeService=new Ps(this.app),this.stateManager=new Ls(this.app,this.trackerFileService,this.folderTreeService),this.sortOrderManager=new Fs(this.settings,()=>this.saveSettings()),this.blockManager=new Ns(()=>this.app.workspace),this.domReorderManager=new Is(()=>this.blockManager.activeBlocks,e=>ft(e),(e,i)=>this.blockManager.isFolderRelevant(e,i)),this.writeQueueManager=new Bs,B.setSettings(this.settings),this.iconizeService.setActiveBlocksChecker(()=>this.blockManager.activeBlocks.size>0),this.iconizeService.loadIconizeData().then(()=>{this.iconizeService.startWatching()}).catch(()=>{}),this.addStyleSheet(),this.addSettingTab(new Ms(this.app,this)),this.registerMarkdownCodeBlockProcessor("tracker",this.processTrackerBlock.bind(this)),this.registerMarkdownCodeBlockProcessor("habit",this.processTrackerBlock.bind(this)),this.addCommand({id:"tracker-create",name:"Create new tracker",callback:()=>this.createNewTracker()})}async onunload(){this.blockManager.clearAllBlocks(),this.iconizeService.stopWatching(),this.writeQueueManager.clear(),this.folderTreeService.cleanup(),this.refreshBlocksDebounceTimer&&(clearTimeout(this.refreshBlocksDebounceTimer),this.refreshBlocksDebounceTimer=null),B.clear()}getFolderPathFromFile(e){return ga(e)}getFolderTree(e){return this.folderTreeService.getFolderTree(e)}addStyleSheet(){if(this.styleEl)return;let e=document.createElement("style");e.textContent=Yc,document.head.appendChild(e),this.styleEl=e,this.register(()=>{e.remove(),this.styleEl===e&&(this.styleEl=void 0)})}async processTrackerBlock(e,i,s){let r=new Ts(this,e,i,s);s.addChild(r),this.blockManager.addBlock(r),await r.render()}removeActiveBlock(e){this.blockManager.removeBlock(e)}async refreshBlocksForFolder(e){await this.blockManager.refreshBlocksForFolder(e,i=>ft(i))}async refreshTrackersForFile(e){this.invalidateCacheForFile(e);let{entries:i,fileOpts:s}=await this.trackerFileService.readTrackerFile(e);B.setTrackerState(e.path,{entries:i,fileOptions:s,lastUpdated:Date.now()})}async refreshAllBlocks(){await this.blockManager.refreshAllBlocks()}async getFileTypeFromFrontmatter(e){return(await this.stateManager.ensureTrackerState(e)).fileOpts}invalidateCacheForFolder(e){this.stateManager.invalidateCacheForFolder(e,i=>ft(i))}invalidateCacheForFile(e){this.stateManager.clearTrackerState(e.path),this.trackerFileService.invalidateFileCache(e.path)}handleTrackerRenamed(e,i){this.stateManager.moveTrackerState(e,i.path),B.moveTrackerState(e,i.path),this.iconizeService.updateIconPath(e,i.path)}async getStartTrackingDateAsync(e,i){if(!i)return D.format(D.now(),this.settings.dateFormat);let s=await this.getFileTypeFromFrontmatter(i);return this.trackerFileService.getStartTrackingDate(e,this.settings,s)}getStartTrackingDate(e,i){return this.trackerFileService.getStartTrackingDate(e,this.settings,i)}calculateStreak(e,i,s,r,o){return this.trackerFileService.calculateStreak(e,this.settings,i,s,r,o)}calculateBestStreak(e,i,s,r){return this.trackerFileService.calculateBestStreak(e,this.settings,i,s,r)}async readAllEntries(e){let i=await this.stateManager.ensureTrackerState(e);return new Map(i.entries)}async readTrackerFile(e){return this.trackerFileService.readTrackerFile(e)}async createNewTracker(){new Ds(this.app,this).open()}async onTrackerCreated(e,i){this.folderTreeService.invalidate(e),await this.stateManager.ensureTrackerState(i);let s=ft(e);if(s){let o=(this.settings.customSortOrder?.[s]||[]).filter(a=>a!==i.basename);o.unshift(i.basename),await this.sortOrderManager.saveSortOrderForFolder(s,o,a=>ft(a))}for(let r of Array.from(this.blockManager.activeBlocks)){let o=r.getFolderPath(),a=ft(o);this.blockManager.isFolderRelevant(s,a)&&await r.render()}}async onTrackerDeleted(e){this.stateManager.clearTrackerState(e),await this.blockManager.onTrackerDeleted(e)}async ensureFileWithHeading(e,i="good-habit"){return this.trackerFileService.ensureFileWithHeading(e,i)}parseFrontmatterData(e){return this.trackerFileService.parseFrontmatterData(e)}formatDataToJson(e){return this.trackerFileService.formatDataToJson(e)}async writeLogLine(e,i,s){return this.writeQueueManager.executeWrite(e,async()=>{try{let r=await this.stateManager.ensureTrackerState(e),o=Hn(s),a=r.entries.get(i);r.entries.set(i,o),B.updateSingleEntry(e.path,i,o);try{await this.trackerFileService.writeLogLineFromState(e,r,i,o)}catch(l){a!==void 0?(r.entries.set(i,a),B.updateSingleEntry(e.path,i,a)):(r.entries.delete(i),B.deleteEntry(e.path,i));let c=l instanceof Error?l.message:String(l);throw new xt.Notice(`${it.WRITE_ERROR}: ${c}`),V("Tracker: write error",l),l}}catch(r){let o=r instanceof Error?r.message:String(r);throw new xt.Notice(`${it.WRITE_ERROR}: ${o}`),V("Tracker: write error",r),r}})}async deleteEntry(e,i){return this.writeQueueManager.executeWrite(e,async()=>{try{let s=await this.stateManager.ensureTrackerState(e),r=s.entries.get(i),o=r!==void 0;s.entries.delete(i),B.deleteEntry(e.path,i);try{await this.trackerFileService.deleteEntryFromState(e,s,i)}catch(a){o&&(s.entries.set(i,r),B.updateSingleEntry(e.path,i,r));let l=a instanceof Error?a.message:String(a);throw new xt.Notice(`${it.WRITE_ERROR}: ${l}`),V("Tracker: delete entry error",a),a}}catch(s){let r=s instanceof Error?s.message:String(s);throw new xt.Notice(`${it.WRITE_ERROR}: ${r}`),V("Tracker: delete entry error",s),s}})}async pickTrackerFile(){let e=this.app.vault.getMarkdownFiles().filter(i=>i.path.startsWith(this.settings.trackersFolder+"/"));return e.length===0?(new xt.Notice(L.NO_TRACKERS_FOUND),null):e.length===1?e[0]:new Promise(i=>{new Cs(this.app,e,i).open()})}async saveSettings(){await this.saveData(this.settings),B.setSettings(this.settings),this.folderTreeService.updateSettings(this.settings),this.sortOrderManager.updateSettings(this.settings),this.refreshBlocksDebounceTimer&&clearTimeout(this.refreshBlocksDebounceTimer),this.refreshBlocksDebounceTimer=setTimeout(async()=>{await this.refreshAllBlocks(),this.refreshBlocksDebounceTimer=null},300)}editTracker(e){new As(this.app,this,e).open()}openEditTrackerModal(e){this.editTracker(e)}async moveTrackerUp(e){let i=this.getFolderPathFromFile(e.path),s=this.app.vault.getAbstractFileByPath(i);if(!s||!(s instanceof xt.TFolder))return;let r=s.children.filter(c=>c instanceof xt.TFile&&c.extension==="md"),o=this.sortOrderManager.sortItemsByOrder(r,i,c=>ft(c)),a=o.findIndex(c=>c.path===e.path);if(a<=0)return;[o[a-1],o[a]]=[o[a],o[a-1]];let l=o.map(c=>c.basename);await this.sortOrderManager.saveSortOrderForFolder(i,l,c=>ft(c)),await this.domReorderManager.swapTrackerElementsInDOM(i,o),this.folderTreeService.invalidate(i)}async moveTrackerDown(e){let i=this.getFolderPathFromFile(e.path),s=this.app.vault.getAbstractFileByPath(i);if(!s||!(s instanceof xt.TFolder))return;let r=s.children.filter(c=>c instanceof xt.TFile&&c.extension==="md"),o=this.sortOrderManager.sortItemsByOrder(r,i,c=>ft(c)),a=o.findIndex(c=>c.path===e.path);if(a<0||a>=o.length-1)return;[o[a],o[a+1]]=[o[a+1],o[a]];let l=o.map(c=>c.basename);await this.sortOrderManager.saveSortOrderForFolder(i,l,c=>ft(c)),await this.domReorderManager.swapTrackerElementsInDOM(i,o),this.folderTreeService.invalidate(i)}async moveFolderUp(e){let i=this.getFolderPathFromFile(e),s;if(!i)s=this.app.vault.getRoot().children.filter(l=>l instanceof xt.TFolder);else{let l=this.app.vault.getAbstractFileByPath(i);if(!l||!(l instanceof xt.TFolder))return;s=l.children.filter(c=>c instanceof xt.TFolder)}s=s.filter(l=>!l.name.toLowerCase().includes("archive"));let r=this.sortOrderManager.sortItemsByOrder(s,i||"",l=>ft(l)),o=r.findIndex(l=>l.path===e);if(o<=0)return;[r[o-1],r[o]]=[r[o],r[o-1]];let a=r.map(l=>l.name);await this.sortOrderManager.saveSortOrderForFolder(i||"",a,l=>ft(l)),await this.domReorderManager.reorderFolderElementsInDOM(i||"",r),this.folderTreeService.invalidate(i||"")}async moveFolderDown(e){let i=this.getFolderPathFromFile(e),s;if(!i)s=this.app.vault.getRoot().children.filter(l=>l instanceof xt.TFolder);else{let l=this.app.vault.getAbstractFileByPath(i);if(!l||!(l instanceof xt.TFolder))return;s=l.children.filter(c=>c instanceof xt.TFolder)}s=s.filter(l=>!l.name.toLowerCase().includes("archive"));let r=this.sortOrderManager.sortItemsByOrder(s,i||"",l=>ft(l)),o=r.findIndex(l=>l.path===e);if(o<0||o>=r.length-1)return;[r[o],r[o+1]]=[r[o+1],r[o]];let a=r.map(l=>l.name);await this.sortOrderManager.saveSortOrderForFolder(i||"",a,l=>ft(l)),await this.domReorderManager.reorderFolderElementsInDOM(i||"",r),this.folderTreeService.invalidate(i||"")}};var lm=_i;
/*! Bundled license information:

@kurkle/color/dist/color.esm.js:
  (*!
   * @kurkle/color v0.3.4
   * https://github.com/kurkle/color#readme
   * (c) 2024 Jukka Kurkela
   * Released under the MIT License
   *)

chart.js/dist/chunks/helpers.dataset.js:
  (*!
   * Chart.js v4.5.1
   * https://www.chartjs.org
   * (c) 2025 Chart.js Contributors
   * Released under the MIT License
   *)

chart.js/dist/chart.js:
  (*!
   * Chart.js v4.5.1
   * https://www.chartjs.org
   * (c) 2025 Chart.js Contributors
   * Released under the MIT License
   *)
*/
