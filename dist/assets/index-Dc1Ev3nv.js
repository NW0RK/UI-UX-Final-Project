(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const a of l)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(l){const a={};return l.integrity&&(a.integrity=l.integrity),l.referrerPolicy&&(a.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?a.credentials="include":l.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(l){if(l.ep)return;l.ep=!0;const a=n(l);fetch(l.href,a)}})();function $u(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var vs={exports:{}},Sl={},ws={exports:{}},O={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var xr=Symbol.for("react.element"),Bu=Symbol.for("react.portal"),qu=Symbol.for("react.fragment"),Gu=Symbol.for("react.strict_mode"),Wu=Symbol.for("react.profiler"),Xu=Symbol.for("react.provider"),Qu=Symbol.for("react.context"),Yu=Symbol.for("react.forward_ref"),Ku=Symbol.for("react.suspense"),Ju=Symbol.for("react.memo"),Zu=Symbol.for("react.lazy"),ro=Symbol.iterator;function ed(e){return e===null||typeof e!="object"?null:(e=ro&&e[ro]||e["@@iterator"],typeof e=="function"?e:null)}var ks={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},bs=Object.assign,Ss={};function En(e,t,n){this.props=e,this.context=t,this.refs=Ss,this.updater=n||ks}En.prototype.isReactComponent={};En.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};En.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function js(){}js.prototype=En.prototype;function ii(e,t,n){this.props=e,this.context=t,this.refs=Ss,this.updater=n||ks}var oi=ii.prototype=new js;oi.constructor=ii;bs(oi,En.prototype);oi.isPureReactComponent=!0;var lo=Array.isArray,Ns=Object.prototype.hasOwnProperty,si={current:null},Cs={key:!0,ref:!0,__self:!0,__source:!0};function Ps(e,t,n){var r,l={},a=null,o=null;if(t!=null)for(r in t.ref!==void 0&&(o=t.ref),t.key!==void 0&&(a=""+t.key),t)Ns.call(t,r)&&!Cs.hasOwnProperty(r)&&(l[r]=t[r]);var s=arguments.length-2;if(s===1)l.children=n;else if(1<s){for(var c=Array(s),d=0;d<s;d++)c[d]=arguments[d+2];l.children=c}if(e&&e.defaultProps)for(r in s=e.defaultProps,s)l[r]===void 0&&(l[r]=s[r]);return{$$typeof:xr,type:e,key:a,ref:o,props:l,_owner:si.current}}function td(e,t){return{$$typeof:xr,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function ci(e){return typeof e=="object"&&e!==null&&e.$$typeof===xr}function nd(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var ao=/\/+/g;function Hl(e,t){return typeof e=="object"&&e!==null&&e.key!=null?nd(""+e.key):t.toString(36)}function Or(e,t,n,r,l){var a=typeof e;(a==="undefined"||a==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(a){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case xr:case Bu:o=!0}}if(o)return o=e,l=l(o),e=r===""?"."+Hl(o,0):r,lo(l)?(n="",e!=null&&(n=e.replace(ao,"$&/")+"/"),Or(l,t,n,"",function(d){return d})):l!=null&&(ci(l)&&(l=td(l,n+(!l.key||o&&o.key===l.key?"":(""+l.key).replace(ao,"$&/")+"/")+e)),t.push(l)),1;if(o=0,r=r===""?".":r+":",lo(e))for(var s=0;s<e.length;s++){a=e[s];var c=r+Hl(a,s);o+=Or(a,t,n,c,l)}else if(c=ed(e),typeof c=="function")for(e=c.call(e),s=0;!(a=e.next()).done;)a=a.value,c=r+Hl(a,s++),o+=Or(a,t,n,c,l);else if(a==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return o}function Sr(e,t,n){if(e==null)return e;var r=[],l=0;return Or(e,r,"","",function(a){return t.call(n,a,l++)}),r}function rd(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var ve={current:null},Hr={transition:null},ld={ReactCurrentDispatcher:ve,ReactCurrentBatchConfig:Hr,ReactCurrentOwner:si};function zs(){throw Error("act(...) is not supported in production builds of React.")}O.Children={map:Sr,forEach:function(e,t,n){Sr(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Sr(e,function(){t++}),t},toArray:function(e){return Sr(e,function(t){return t})||[]},only:function(e){if(!ci(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};O.Component=En;O.Fragment=qu;O.Profiler=Wu;O.PureComponent=ii;O.StrictMode=Gu;O.Suspense=Ku;O.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ld;O.act=zs;O.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=bs({},e.props),l=e.key,a=e.ref,o=e._owner;if(t!=null){if(t.ref!==void 0&&(a=t.ref,o=si.current),t.key!==void 0&&(l=""+t.key),e.type&&e.type.defaultProps)var s=e.type.defaultProps;for(c in t)Ns.call(t,c)&&!Cs.hasOwnProperty(c)&&(r[c]=t[c]===void 0&&s!==void 0?s[c]:t[c])}var c=arguments.length-2;if(c===1)r.children=n;else if(1<c){s=Array(c);for(var d=0;d<c;d++)s[d]=arguments[d+2];r.children=s}return{$$typeof:xr,type:e.type,key:l,ref:a,props:r,_owner:o}};O.createContext=function(e){return e={$$typeof:Qu,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Xu,_context:e},e.Consumer=e};O.createElement=Ps;O.createFactory=function(e){var t=Ps.bind(null,e);return t.type=e,t};O.createRef=function(){return{current:null}};O.forwardRef=function(e){return{$$typeof:Yu,render:e}};O.isValidElement=ci;O.lazy=function(e){return{$$typeof:Zu,_payload:{_status:-1,_result:e},_init:rd}};O.memo=function(e,t){return{$$typeof:Ju,type:e,compare:t===void 0?null:t}};O.startTransition=function(e){var t=Hr.transition;Hr.transition={};try{e()}finally{Hr.transition=t}};O.unstable_act=zs;O.useCallback=function(e,t){return ve.current.useCallback(e,t)};O.useContext=function(e){return ve.current.useContext(e)};O.useDebugValue=function(){};O.useDeferredValue=function(e){return ve.current.useDeferredValue(e)};O.useEffect=function(e,t){return ve.current.useEffect(e,t)};O.useId=function(){return ve.current.useId()};O.useImperativeHandle=function(e,t,n){return ve.current.useImperativeHandle(e,t,n)};O.useInsertionEffect=function(e,t){return ve.current.useInsertionEffect(e,t)};O.useLayoutEffect=function(e,t){return ve.current.useLayoutEffect(e,t)};O.useMemo=function(e,t){return ve.current.useMemo(e,t)};O.useReducer=function(e,t,n){return ve.current.useReducer(e,t,n)};O.useRef=function(e){return ve.current.useRef(e)};O.useState=function(e){return ve.current.useState(e)};O.useSyncExternalStore=function(e,t,n){return ve.current.useSyncExternalStore(e,t,n)};O.useTransition=function(){return ve.current.useTransition()};O.version="18.3.1";ws.exports=O;var T=ws.exports;const ad=$u(T);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var id=T,od=Symbol.for("react.element"),sd=Symbol.for("react.fragment"),cd=Object.prototype.hasOwnProperty,ud=id.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,dd={key:!0,ref:!0,__self:!0,__source:!0};function Es(e,t,n){var r,l={},a=null,o=null;n!==void 0&&(a=""+n),t.key!==void 0&&(a=""+t.key),t.ref!==void 0&&(o=t.ref);for(r in t)cd.call(t,r)&&!dd.hasOwnProperty(r)&&(l[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)l[r]===void 0&&(l[r]=t[r]);return{$$typeof:od,type:e,key:a,ref:o,props:l,_owner:ud.current}}Sl.Fragment=sd;Sl.jsx=Es;Sl.jsxs=Es;vs.exports=Sl;var i=vs.exports,fa={},Ts={exports:{}},_e={},Ms={exports:{}},_s={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(z,A){var U=z.length;z.push(A);e:for(;0<U;){var q=U-1>>>1,Y=z[q];if(0<l(Y,A))z[q]=A,z[U]=Y,U=q;else break e}}function n(z){return z.length===0?null:z[0]}function r(z){if(z.length===0)return null;var A=z[0],U=z.pop();if(U!==A){z[0]=U;e:for(var q=0,Y=z.length,lt=Y>>>1;q<lt;){var ue=2*(q+1)-1,at=z[ue],Ve=ue+1,it=z[Ve];if(0>l(at,U))Ve<Y&&0>l(it,at)?(z[q]=it,z[Ve]=U,q=Ve):(z[q]=at,z[ue]=U,q=ue);else if(Ve<Y&&0>l(it,U))z[q]=it,z[Ve]=U,q=Ve;else break e}}return A}function l(z,A){var U=z.sortIndex-A.sortIndex;return U!==0?U:z.id-A.id}if(typeof performance=="object"&&typeof performance.now=="function"){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],d=[],m=1,g=null,f=3,y=!1,x=!1,w=!1,L=typeof setTimeout=="function"?setTimeout:null,h=typeof clearTimeout=="function"?clearTimeout:null,u=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function p(z){for(var A=n(d);A!==null;){if(A.callback===null)r(d);else if(A.startTime<=z)r(d),A.sortIndex=A.expirationTime,t(c,A);else break;A=n(d)}}function v(z){if(w=!1,p(z),!x)if(n(c)!==null)x=!0,xt(S);else{var A=n(d);A!==null&&Ae(v,A.startTime-z)}}function S(z,A){x=!1,w&&(w=!1,h(C),C=-1),y=!0;var U=f;try{for(p(A),g=n(c);g!==null&&(!(g.expirationTime>A)||z&&!V());){var q=g.callback;if(typeof q=="function"){g.callback=null,f=g.priorityLevel;var Y=q(g.expirationTime<=A);A=e.unstable_now(),typeof Y=="function"?g.callback=Y:g===n(c)&&r(c),p(A)}else r(c);g=n(c)}if(g!==null)var lt=!0;else{var ue=n(d);ue!==null&&Ae(v,ue.startTime-A),lt=!1}return lt}finally{g=null,f=U,y=!1}}var P=!1,k=null,C=-1,F=5,R=-1;function V(){return!(e.unstable_now()-R<F)}function ge(){if(k!==null){var z=e.unstable_now();R=z;var A=!0;try{A=k(!0,z)}finally{A?ke():(P=!1,k=null)}}else P=!1}var ke;if(typeof u=="function")ke=function(){u(ge)};else if(typeof MessageChannel<"u"){var rt=new MessageChannel,Ye=rt.port2;rt.port1.onmessage=ge,ke=function(){Ye.postMessage(null)}}else ke=function(){L(ge,0)};function xt(z){k=z,P||(P=!0,ke())}function Ae(z,A){C=L(function(){z(e.unstable_now())},A)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(z){z.callback=null},e.unstable_continueExecution=function(){x||y||(x=!0,xt(S))},e.unstable_forceFrameRate=function(z){0>z||125<z?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):F=0<z?Math.floor(1e3/z):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_getFirstCallbackNode=function(){return n(c)},e.unstable_next=function(z){switch(f){case 1:case 2:case 3:var A=3;break;default:A=f}var U=f;f=A;try{return z()}finally{f=U}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(z,A){switch(z){case 1:case 2:case 3:case 4:case 5:break;default:z=3}var U=f;f=z;try{return A()}finally{f=U}},e.unstable_scheduleCallback=function(z,A,U){var q=e.unstable_now();switch(typeof U=="object"&&U!==null?(U=U.delay,U=typeof U=="number"&&0<U?q+U:q):U=q,z){case 1:var Y=-1;break;case 2:Y=250;break;case 5:Y=1073741823;break;case 4:Y=1e4;break;default:Y=5e3}return Y=U+Y,z={id:m++,callback:A,priorityLevel:z,startTime:U,expirationTime:Y,sortIndex:-1},U>q?(z.sortIndex=U,t(d,z),n(c)===null&&z===n(d)&&(w?(h(C),C=-1):w=!0,Ae(v,U-q))):(z.sortIndex=Y,t(c,z),x||y||(x=!0,xt(S))),z},e.unstable_shouldYield=V,e.unstable_wrapCallback=function(z){var A=f;return function(){var U=f;f=A;try{return z.apply(this,arguments)}finally{f=U}}}})(_s);Ms.exports=_s;var pd=Ms.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var fd=T,Me=pd;function b(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Ls=new Set,er={};function Jt(e,t){bn(e,t),bn(e+"Capture",t)}function bn(e,t){for(er[e]=t,e=0;e<t.length;e++)Ls.add(t[e])}var pt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ha=Object.prototype.hasOwnProperty,hd=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,io={},oo={};function md(e){return ha.call(oo,e)?!0:ha.call(io,e)?!1:hd.test(e)?oo[e]=!0:(io[e]=!0,!1)}function gd(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function xd(e,t,n,r){if(t===null||typeof t>"u"||gd(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function we(e,t,n,r,l,a,o){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=l,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=a,this.removeEmptyString=o}var ce={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){ce[e]=new we(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];ce[t]=new we(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){ce[e]=new we(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){ce[e]=new we(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){ce[e]=new we(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){ce[e]=new we(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){ce[e]=new we(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){ce[e]=new we(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){ce[e]=new we(e,5,!1,e.toLowerCase(),null,!1,!1)});var ui=/[\-:]([a-z])/g;function di(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(ui,di);ce[t]=new we(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(ui,di);ce[t]=new we(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(ui,di);ce[t]=new we(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){ce[e]=new we(e,1,!1,e.toLowerCase(),null,!1,!1)});ce.xlinkHref=new we("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){ce[e]=new we(e,1,!1,e.toLowerCase(),null,!0,!0)});function pi(e,t,n,r){var l=ce.hasOwnProperty(t)?ce[t]:null;(l!==null?l.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(xd(t,n,l,r)&&(n=null),r||l===null?md(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):l.mustUseProperty?e[l.propertyName]=n===null?l.type===3?!1:"":n:(t=l.attributeName,r=l.attributeNamespace,n===null?e.removeAttribute(t):(l=l.type,n=l===3||l===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var gt=fd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,jr=Symbol.for("react.element"),rn=Symbol.for("react.portal"),ln=Symbol.for("react.fragment"),fi=Symbol.for("react.strict_mode"),ma=Symbol.for("react.profiler"),As=Symbol.for("react.provider"),Is=Symbol.for("react.context"),hi=Symbol.for("react.forward_ref"),ga=Symbol.for("react.suspense"),xa=Symbol.for("react.suspense_list"),mi=Symbol.for("react.memo"),vt=Symbol.for("react.lazy"),Rs=Symbol.for("react.offscreen"),so=Symbol.iterator;function _n(e){return e===null||typeof e!="object"?null:(e=so&&e[so]||e["@@iterator"],typeof e=="function"?e:null)}var Z=Object.assign,Vl;function Hn(e){if(Vl===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Vl=t&&t[1]||""}return`
`+Vl+e}var $l=!1;function Bl(e,t){if(!e||$l)return"";$l=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(d){var r=d}Reflect.construct(e,[],t)}else{try{t.call()}catch(d){r=d}e.call(t.prototype)}else{try{throw Error()}catch(d){r=d}e()}}catch(d){if(d&&r&&typeof d.stack=="string"){for(var l=d.stack.split(`
`),a=r.stack.split(`
`),o=l.length-1,s=a.length-1;1<=o&&0<=s&&l[o]!==a[s];)s--;for(;1<=o&&0<=s;o--,s--)if(l[o]!==a[s]){if(o!==1||s!==1)do if(o--,s--,0>s||l[o]!==a[s]){var c=`
`+l[o].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}while(1<=o&&0<=s);break}}}finally{$l=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Hn(e):""}function yd(e){switch(e.tag){case 5:return Hn(e.type);case 16:return Hn("Lazy");case 13:return Hn("Suspense");case 19:return Hn("SuspenseList");case 0:case 2:case 15:return e=Bl(e.type,!1),e;case 11:return e=Bl(e.type.render,!1),e;case 1:return e=Bl(e.type,!0),e;default:return""}}function ya(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case ln:return"Fragment";case rn:return"Portal";case ma:return"Profiler";case fi:return"StrictMode";case ga:return"Suspense";case xa:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Is:return(e.displayName||"Context")+".Consumer";case As:return(e._context.displayName||"Context")+".Provider";case hi:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case mi:return t=e.displayName||null,t!==null?t:ya(e.type)||"Memo";case vt:t=e._payload,e=e._init;try{return ya(e(t))}catch{}}return null}function vd(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ya(t);case 8:return t===fi?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Lt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Us(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function wd(e){var t=Us(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var l=n.get,a=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return l.call(this)},set:function(o){r=""+o,a.call(this,o)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Nr(e){e._valueTracker||(e._valueTracker=wd(e))}function Ds(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Us(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Jr(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function va(e,t){var n=t.checked;return Z({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function co(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Lt(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Fs(e,t){t=t.checked,t!=null&&pi(e,"checked",t,!1)}function wa(e,t){Fs(e,t);var n=Lt(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?ka(e,t.type,n):t.hasOwnProperty("defaultValue")&&ka(e,t.type,Lt(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function uo(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function ka(e,t,n){(t!=="number"||Jr(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Vn=Array.isArray;function gn(e,t,n,r){if(e=e.options,t){t={};for(var l=0;l<n.length;l++)t["$"+n[l]]=!0;for(n=0;n<e.length;n++)l=t.hasOwnProperty("$"+e[n].value),e[n].selected!==l&&(e[n].selected=l),l&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Lt(n),t=null,l=0;l<e.length;l++){if(e[l].value===n){e[l].selected=!0,r&&(e[l].defaultSelected=!0);return}t!==null||e[l].disabled||(t=e[l])}t!==null&&(t.selected=!0)}}function ba(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(b(91));return Z({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function po(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(b(92));if(Vn(n)){if(1<n.length)throw Error(b(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Lt(n)}}function Os(e,t){var n=Lt(t.value),r=Lt(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function fo(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Hs(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Sa(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Hs(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Cr,Vs=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,l){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,l)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Cr=Cr||document.createElement("div"),Cr.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Cr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function tr(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var qn={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},kd=["Webkit","ms","Moz","O"];Object.keys(qn).forEach(function(e){kd.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),qn[t]=qn[e]})});function $s(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||qn.hasOwnProperty(e)&&qn[e]?(""+t).trim():t+"px"}function Bs(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,l=$s(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,l):e[n]=l}}var bd=Z({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ja(e,t){if(t){if(bd[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(b(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(b(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(b(61))}if(t.style!=null&&typeof t.style!="object")throw Error(b(62))}}function Na(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ca=null;function gi(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Pa=null,xn=null,yn=null;function ho(e){if(e=wr(e)){if(typeof Pa!="function")throw Error(b(280));var t=e.stateNode;t&&(t=zl(t),Pa(e.stateNode,e.type,t))}}function qs(e){xn?yn?yn.push(e):yn=[e]:xn=e}function Gs(){if(xn){var e=xn,t=yn;if(yn=xn=null,ho(e),t)for(e=0;e<t.length;e++)ho(t[e])}}function Ws(e,t){return e(t)}function Xs(){}var ql=!1;function Qs(e,t,n){if(ql)return e(t,n);ql=!0;try{return Ws(e,t,n)}finally{ql=!1,(xn!==null||yn!==null)&&(Xs(),Gs())}}function nr(e,t){var n=e.stateNode;if(n===null)return null;var r=zl(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(b(231,t,typeof n));return n}var za=!1;if(pt)try{var Ln={};Object.defineProperty(Ln,"passive",{get:function(){za=!0}}),window.addEventListener("test",Ln,Ln),window.removeEventListener("test",Ln,Ln)}catch{za=!1}function Sd(e,t,n,r,l,a,o,s,c){var d=Array.prototype.slice.call(arguments,3);try{t.apply(n,d)}catch(m){this.onError(m)}}var Gn=!1,Zr=null,el=!1,Ea=null,jd={onError:function(e){Gn=!0,Zr=e}};function Nd(e,t,n,r,l,a,o,s,c){Gn=!1,Zr=null,Sd.apply(jd,arguments)}function Cd(e,t,n,r,l,a,o,s,c){if(Nd.apply(this,arguments),Gn){if(Gn){var d=Zr;Gn=!1,Zr=null}else throw Error(b(198));el||(el=!0,Ea=d)}}function Zt(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Ys(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function mo(e){if(Zt(e)!==e)throw Error(b(188))}function Pd(e){var t=e.alternate;if(!t){if(t=Zt(e),t===null)throw Error(b(188));return t!==e?null:e}for(var n=e,r=t;;){var l=n.return;if(l===null)break;var a=l.alternate;if(a===null){if(r=l.return,r!==null){n=r;continue}break}if(l.child===a.child){for(a=l.child;a;){if(a===n)return mo(l),e;if(a===r)return mo(l),t;a=a.sibling}throw Error(b(188))}if(n.return!==r.return)n=l,r=a;else{for(var o=!1,s=l.child;s;){if(s===n){o=!0,n=l,r=a;break}if(s===r){o=!0,r=l,n=a;break}s=s.sibling}if(!o){for(s=a.child;s;){if(s===n){o=!0,n=a,r=l;break}if(s===r){o=!0,r=a,n=l;break}s=s.sibling}if(!o)throw Error(b(189))}}if(n.alternate!==r)throw Error(b(190))}if(n.tag!==3)throw Error(b(188));return n.stateNode.current===n?e:t}function Ks(e){return e=Pd(e),e!==null?Js(e):null}function Js(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Js(e);if(t!==null)return t;e=e.sibling}return null}var Zs=Me.unstable_scheduleCallback,go=Me.unstable_cancelCallback,zd=Me.unstable_shouldYield,Ed=Me.unstable_requestPaint,te=Me.unstable_now,Td=Me.unstable_getCurrentPriorityLevel,xi=Me.unstable_ImmediatePriority,ec=Me.unstable_UserBlockingPriority,tl=Me.unstable_NormalPriority,Md=Me.unstable_LowPriority,tc=Me.unstable_IdlePriority,jl=null,tt=null;function _d(e){if(tt&&typeof tt.onCommitFiberRoot=="function")try{tt.onCommitFiberRoot(jl,e,void 0,(e.current.flags&128)===128)}catch{}}var We=Math.clz32?Math.clz32:Id,Ld=Math.log,Ad=Math.LN2;function Id(e){return e>>>=0,e===0?32:31-(Ld(e)/Ad|0)|0}var Pr=64,zr=4194304;function $n(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function nl(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,l=e.suspendedLanes,a=e.pingedLanes,o=n&268435455;if(o!==0){var s=o&~l;s!==0?r=$n(s):(a&=o,a!==0&&(r=$n(a)))}else o=n&~l,o!==0?r=$n(o):a!==0&&(r=$n(a));if(r===0)return 0;if(t!==0&&t!==r&&!(t&l)&&(l=r&-r,a=t&-t,l>=a||l===16&&(a&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-We(t),l=1<<n,r|=e[n],t&=~l;return r}function Rd(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Ud(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,l=e.expirationTimes,a=e.pendingLanes;0<a;){var o=31-We(a),s=1<<o,c=l[o];c===-1?(!(s&n)||s&r)&&(l[o]=Rd(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}}function Ta(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function nc(){var e=Pr;return Pr<<=1,!(Pr&4194240)&&(Pr=64),e}function Gl(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function yr(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-We(t),e[t]=n}function Dd(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var l=31-We(n),a=1<<l;t[l]=0,r[l]=-1,e[l]=-1,n&=~a}}function yi(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-We(n),l=1<<r;l&t|e[r]&t&&(e[r]|=t),n&=~l}}var B=0;function rc(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var lc,vi,ac,ic,oc,Ma=!1,Er=[],Nt=null,Ct=null,Pt=null,rr=new Map,lr=new Map,kt=[],Fd="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function xo(e,t){switch(e){case"focusin":case"focusout":Nt=null;break;case"dragenter":case"dragleave":Ct=null;break;case"mouseover":case"mouseout":Pt=null;break;case"pointerover":case"pointerout":rr.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":lr.delete(t.pointerId)}}function An(e,t,n,r,l,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[l]},t!==null&&(t=wr(t),t!==null&&vi(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,l!==null&&t.indexOf(l)===-1&&t.push(l),e)}function Od(e,t,n,r,l){switch(t){case"focusin":return Nt=An(Nt,e,t,n,r,l),!0;case"dragenter":return Ct=An(Ct,e,t,n,r,l),!0;case"mouseover":return Pt=An(Pt,e,t,n,r,l),!0;case"pointerover":var a=l.pointerId;return rr.set(a,An(rr.get(a)||null,e,t,n,r,l)),!0;case"gotpointercapture":return a=l.pointerId,lr.set(a,An(lr.get(a)||null,e,t,n,r,l)),!0}return!1}function sc(e){var t=Vt(e.target);if(t!==null){var n=Zt(t);if(n!==null){if(t=n.tag,t===13){if(t=Ys(n),t!==null){e.blockedOn=t,oc(e.priority,function(){ac(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Vr(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=_a(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Ca=r,n.target.dispatchEvent(r),Ca=null}else return t=wr(n),t!==null&&vi(t),e.blockedOn=n,!1;t.shift()}return!0}function yo(e,t,n){Vr(e)&&n.delete(t)}function Hd(){Ma=!1,Nt!==null&&Vr(Nt)&&(Nt=null),Ct!==null&&Vr(Ct)&&(Ct=null),Pt!==null&&Vr(Pt)&&(Pt=null),rr.forEach(yo),lr.forEach(yo)}function In(e,t){e.blockedOn===t&&(e.blockedOn=null,Ma||(Ma=!0,Me.unstable_scheduleCallback(Me.unstable_NormalPriority,Hd)))}function ar(e){function t(l){return In(l,e)}if(0<Er.length){In(Er[0],e);for(var n=1;n<Er.length;n++){var r=Er[n];r.blockedOn===e&&(r.blockedOn=null)}}for(Nt!==null&&In(Nt,e),Ct!==null&&In(Ct,e),Pt!==null&&In(Pt,e),rr.forEach(t),lr.forEach(t),n=0;n<kt.length;n++)r=kt[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<kt.length&&(n=kt[0],n.blockedOn===null);)sc(n),n.blockedOn===null&&kt.shift()}var vn=gt.ReactCurrentBatchConfig,rl=!0;function Vd(e,t,n,r){var l=B,a=vn.transition;vn.transition=null;try{B=1,wi(e,t,n,r)}finally{B=l,vn.transition=a}}function $d(e,t,n,r){var l=B,a=vn.transition;vn.transition=null;try{B=4,wi(e,t,n,r)}finally{B=l,vn.transition=a}}function wi(e,t,n,r){if(rl){var l=_a(e,t,n,r);if(l===null)na(e,t,r,ll,n),xo(e,r);else if(Od(l,e,t,n,r))r.stopPropagation();else if(xo(e,r),t&4&&-1<Fd.indexOf(e)){for(;l!==null;){var a=wr(l);if(a!==null&&lc(a),a=_a(e,t,n,r),a===null&&na(e,t,r,ll,n),a===l)break;l=a}l!==null&&r.stopPropagation()}else na(e,t,r,null,n)}}var ll=null;function _a(e,t,n,r){if(ll=null,e=gi(r),e=Vt(e),e!==null)if(t=Zt(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Ys(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return ll=e,null}function cc(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Td()){case xi:return 1;case ec:return 4;case tl:case Md:return 16;case tc:return 536870912;default:return 16}default:return 16}}var St=null,ki=null,$r=null;function uc(){if($r)return $r;var e,t=ki,n=t.length,r,l="value"in St?St.value:St.textContent,a=l.length;for(e=0;e<n&&t[e]===l[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===l[a-r];r++);return $r=l.slice(e,1<r?1-r:void 0)}function Br(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Tr(){return!0}function vo(){return!1}function Le(e){function t(n,r,l,a,o){this._reactName=n,this._targetInst=l,this.type=r,this.nativeEvent=a,this.target=o,this.currentTarget=null;for(var s in e)e.hasOwnProperty(s)&&(n=e[s],this[s]=n?n(a):a[s]);return this.isDefaultPrevented=(a.defaultPrevented!=null?a.defaultPrevented:a.returnValue===!1)?Tr:vo,this.isPropagationStopped=vo,this}return Z(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Tr)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Tr)},persist:function(){},isPersistent:Tr}),t}var Tn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},bi=Le(Tn),vr=Z({},Tn,{view:0,detail:0}),Bd=Le(vr),Wl,Xl,Rn,Nl=Z({},vr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Si,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Rn&&(Rn&&e.type==="mousemove"?(Wl=e.screenX-Rn.screenX,Xl=e.screenY-Rn.screenY):Xl=Wl=0,Rn=e),Wl)},movementY:function(e){return"movementY"in e?e.movementY:Xl}}),wo=Le(Nl),qd=Z({},Nl,{dataTransfer:0}),Gd=Le(qd),Wd=Z({},vr,{relatedTarget:0}),Ql=Le(Wd),Xd=Z({},Tn,{animationName:0,elapsedTime:0,pseudoElement:0}),Qd=Le(Xd),Yd=Z({},Tn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Kd=Le(Yd),Jd=Z({},Tn,{data:0}),ko=Le(Jd),Zd={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},ep={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},tp={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function np(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=tp[e])?!!t[e]:!1}function Si(){return np}var rp=Z({},vr,{key:function(e){if(e.key){var t=Zd[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Br(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?ep[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Si,charCode:function(e){return e.type==="keypress"?Br(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Br(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),lp=Le(rp),ap=Z({},Nl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),bo=Le(ap),ip=Z({},vr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Si}),op=Le(ip),sp=Z({},Tn,{propertyName:0,elapsedTime:0,pseudoElement:0}),cp=Le(sp),up=Z({},Nl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),dp=Le(up),pp=[9,13,27,32],ji=pt&&"CompositionEvent"in window,Wn=null;pt&&"documentMode"in document&&(Wn=document.documentMode);var fp=pt&&"TextEvent"in window&&!Wn,dc=pt&&(!ji||Wn&&8<Wn&&11>=Wn),So=" ",jo=!1;function pc(e,t){switch(e){case"keyup":return pp.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function fc(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var an=!1;function hp(e,t){switch(e){case"compositionend":return fc(t);case"keypress":return t.which!==32?null:(jo=!0,So);case"textInput":return e=t.data,e===So&&jo?null:e;default:return null}}function mp(e,t){if(an)return e==="compositionend"||!ji&&pc(e,t)?(e=uc(),$r=ki=St=null,an=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return dc&&t.locale!=="ko"?null:t.data;default:return null}}var gp={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function No(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!gp[e.type]:t==="textarea"}function hc(e,t,n,r){qs(r),t=al(t,"onChange"),0<t.length&&(n=new bi("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Xn=null,ir=null;function xp(e){Nc(e,0)}function Cl(e){var t=cn(e);if(Ds(t))return e}function yp(e,t){if(e==="change")return t}var mc=!1;if(pt){var Yl;if(pt){var Kl="oninput"in document;if(!Kl){var Co=document.createElement("div");Co.setAttribute("oninput","return;"),Kl=typeof Co.oninput=="function"}Yl=Kl}else Yl=!1;mc=Yl&&(!document.documentMode||9<document.documentMode)}function Po(){Xn&&(Xn.detachEvent("onpropertychange",gc),ir=Xn=null)}function gc(e){if(e.propertyName==="value"&&Cl(ir)){var t=[];hc(t,ir,e,gi(e)),Qs(xp,t)}}function vp(e,t,n){e==="focusin"?(Po(),Xn=t,ir=n,Xn.attachEvent("onpropertychange",gc)):e==="focusout"&&Po()}function wp(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Cl(ir)}function kp(e,t){if(e==="click")return Cl(t)}function bp(e,t){if(e==="input"||e==="change")return Cl(t)}function Sp(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Qe=typeof Object.is=="function"?Object.is:Sp;function or(e,t){if(Qe(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var l=n[r];if(!ha.call(t,l)||!Qe(e[l],t[l]))return!1}return!0}function zo(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Eo(e,t){var n=zo(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=zo(n)}}function xc(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?xc(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function yc(){for(var e=window,t=Jr();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Jr(e.document)}return t}function Ni(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function jp(e){var t=yc(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&xc(n.ownerDocument.documentElement,n)){if(r!==null&&Ni(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var l=n.textContent.length,a=Math.min(r.start,l);r=r.end===void 0?a:Math.min(r.end,l),!e.extend&&a>r&&(l=r,r=a,a=l),l=Eo(n,a);var o=Eo(n,r);l&&o&&(e.rangeCount!==1||e.anchorNode!==l.node||e.anchorOffset!==l.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(t=t.createRange(),t.setStart(l.node,l.offset),e.removeAllRanges(),a>r?(e.addRange(t),e.extend(o.node,o.offset)):(t.setEnd(o.node,o.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Np=pt&&"documentMode"in document&&11>=document.documentMode,on=null,La=null,Qn=null,Aa=!1;function To(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Aa||on==null||on!==Jr(r)||(r=on,"selectionStart"in r&&Ni(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Qn&&or(Qn,r)||(Qn=r,r=al(La,"onSelect"),0<r.length&&(t=new bi("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=on)))}function Mr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var sn={animationend:Mr("Animation","AnimationEnd"),animationiteration:Mr("Animation","AnimationIteration"),animationstart:Mr("Animation","AnimationStart"),transitionend:Mr("Transition","TransitionEnd")},Jl={},vc={};pt&&(vc=document.createElement("div").style,"AnimationEvent"in window||(delete sn.animationend.animation,delete sn.animationiteration.animation,delete sn.animationstart.animation),"TransitionEvent"in window||delete sn.transitionend.transition);function Pl(e){if(Jl[e])return Jl[e];if(!sn[e])return e;var t=sn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in vc)return Jl[e]=t[n];return e}var wc=Pl("animationend"),kc=Pl("animationiteration"),bc=Pl("animationstart"),Sc=Pl("transitionend"),jc=new Map,Mo="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function It(e,t){jc.set(e,t),Jt(t,[e])}for(var Zl=0;Zl<Mo.length;Zl++){var ea=Mo[Zl],Cp=ea.toLowerCase(),Pp=ea[0].toUpperCase()+ea.slice(1);It(Cp,"on"+Pp)}It(wc,"onAnimationEnd");It(kc,"onAnimationIteration");It(bc,"onAnimationStart");It("dblclick","onDoubleClick");It("focusin","onFocus");It("focusout","onBlur");It(Sc,"onTransitionEnd");bn("onMouseEnter",["mouseout","mouseover"]);bn("onMouseLeave",["mouseout","mouseover"]);bn("onPointerEnter",["pointerout","pointerover"]);bn("onPointerLeave",["pointerout","pointerover"]);Jt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Jt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Jt("onBeforeInput",["compositionend","keypress","textInput","paste"]);Jt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Jt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Jt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Bn="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),zp=new Set("cancel close invalid load scroll toggle".split(" ").concat(Bn));function _o(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,Cd(r,t,void 0,e),e.currentTarget=null}function Nc(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],l=r.event;r=r.listeners;e:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,d=s.currentTarget;if(s=s.listener,c!==a&&l.isPropagationStopped())break e;_o(l,s,d),a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,d=s.currentTarget,s=s.listener,c!==a&&l.isPropagationStopped())break e;_o(l,s,d),a=c}}}if(el)throw e=Ea,el=!1,Ea=null,e}function W(e,t){var n=t[Fa];n===void 0&&(n=t[Fa]=new Set);var r=e+"__bubble";n.has(r)||(Cc(t,e,2,!1),n.add(r))}function ta(e,t,n){var r=0;t&&(r|=4),Cc(n,e,r,t)}var _r="_reactListening"+Math.random().toString(36).slice(2);function sr(e){if(!e[_r]){e[_r]=!0,Ls.forEach(function(n){n!=="selectionchange"&&(zp.has(n)||ta(n,!1,e),ta(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[_r]||(t[_r]=!0,ta("selectionchange",!1,t))}}function Cc(e,t,n,r){switch(cc(t)){case 1:var l=Vd;break;case 4:l=$d;break;default:l=wi}n=l.bind(null,t,n,e),l=void 0,!za||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(l=!0),r?l!==void 0?e.addEventListener(t,n,{capture:!0,passive:l}):e.addEventListener(t,n,!0):l!==void 0?e.addEventListener(t,n,{passive:l}):e.addEventListener(t,n,!1)}function na(e,t,n,r,l){var a=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var s=r.stateNode.containerInfo;if(s===l||s.nodeType===8&&s.parentNode===l)break;if(o===4)for(o=r.return;o!==null;){var c=o.tag;if((c===3||c===4)&&(c=o.stateNode.containerInfo,c===l||c.nodeType===8&&c.parentNode===l))return;o=o.return}for(;s!==null;){if(o=Vt(s),o===null)return;if(c=o.tag,c===5||c===6){r=a=o;continue e}s=s.parentNode}}r=r.return}Qs(function(){var d=a,m=gi(n),g=[];e:{var f=jc.get(e);if(f!==void 0){var y=bi,x=e;switch(e){case"keypress":if(Br(n)===0)break e;case"keydown":case"keyup":y=lp;break;case"focusin":x="focus",y=Ql;break;case"focusout":x="blur",y=Ql;break;case"beforeblur":case"afterblur":y=Ql;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":y=wo;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":y=Gd;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":y=op;break;case wc:case kc:case bc:y=Qd;break;case Sc:y=cp;break;case"scroll":y=Bd;break;case"wheel":y=dp;break;case"copy":case"cut":case"paste":y=Kd;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":y=bo}var w=(t&4)!==0,L=!w&&e==="scroll",h=w?f!==null?f+"Capture":null:f;w=[];for(var u=d,p;u!==null;){p=u;var v=p.stateNode;if(p.tag===5&&v!==null&&(p=v,h!==null&&(v=nr(u,h),v!=null&&w.push(cr(u,v,p)))),L)break;u=u.return}0<w.length&&(f=new y(f,x,null,n,m),g.push({event:f,listeners:w}))}}if(!(t&7)){e:{if(f=e==="mouseover"||e==="pointerover",y=e==="mouseout"||e==="pointerout",f&&n!==Ca&&(x=n.relatedTarget||n.fromElement)&&(Vt(x)||x[ft]))break e;if((y||f)&&(f=m.window===m?m:(f=m.ownerDocument)?f.defaultView||f.parentWindow:window,y?(x=n.relatedTarget||n.toElement,y=d,x=x?Vt(x):null,x!==null&&(L=Zt(x),x!==L||x.tag!==5&&x.tag!==6)&&(x=null)):(y=null,x=d),y!==x)){if(w=wo,v="onMouseLeave",h="onMouseEnter",u="mouse",(e==="pointerout"||e==="pointerover")&&(w=bo,v="onPointerLeave",h="onPointerEnter",u="pointer"),L=y==null?f:cn(y),p=x==null?f:cn(x),f=new w(v,u+"leave",y,n,m),f.target=L,f.relatedTarget=p,v=null,Vt(m)===d&&(w=new w(h,u+"enter",x,n,m),w.target=p,w.relatedTarget=L,v=w),L=v,y&&x)t:{for(w=y,h=x,u=0,p=w;p;p=tn(p))u++;for(p=0,v=h;v;v=tn(v))p++;for(;0<u-p;)w=tn(w),u--;for(;0<p-u;)h=tn(h),p--;for(;u--;){if(w===h||h!==null&&w===h.alternate)break t;w=tn(w),h=tn(h)}w=null}else w=null;y!==null&&Lo(g,f,y,w,!1),x!==null&&L!==null&&Lo(g,L,x,w,!0)}}e:{if(f=d?cn(d):window,y=f.nodeName&&f.nodeName.toLowerCase(),y==="select"||y==="input"&&f.type==="file")var S=yp;else if(No(f))if(mc)S=bp;else{S=wp;var P=vp}else(y=f.nodeName)&&y.toLowerCase()==="input"&&(f.type==="checkbox"||f.type==="radio")&&(S=kp);if(S&&(S=S(e,d))){hc(g,S,n,m);break e}P&&P(e,f,d),e==="focusout"&&(P=f._wrapperState)&&P.controlled&&f.type==="number"&&ka(f,"number",f.value)}switch(P=d?cn(d):window,e){case"focusin":(No(P)||P.contentEditable==="true")&&(on=P,La=d,Qn=null);break;case"focusout":Qn=La=on=null;break;case"mousedown":Aa=!0;break;case"contextmenu":case"mouseup":case"dragend":Aa=!1,To(g,n,m);break;case"selectionchange":if(Np)break;case"keydown":case"keyup":To(g,n,m)}var k;if(ji)e:{switch(e){case"compositionstart":var C="onCompositionStart";break e;case"compositionend":C="onCompositionEnd";break e;case"compositionupdate":C="onCompositionUpdate";break e}C=void 0}else an?pc(e,n)&&(C="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(C="onCompositionStart");C&&(dc&&n.locale!=="ko"&&(an||C!=="onCompositionStart"?C==="onCompositionEnd"&&an&&(k=uc()):(St=m,ki="value"in St?St.value:St.textContent,an=!0)),P=al(d,C),0<P.length&&(C=new ko(C,e,null,n,m),g.push({event:C,listeners:P}),k?C.data=k:(k=fc(n),k!==null&&(C.data=k)))),(k=fp?hp(e,n):mp(e,n))&&(d=al(d,"onBeforeInput"),0<d.length&&(m=new ko("onBeforeInput","beforeinput",null,n,m),g.push({event:m,listeners:d}),m.data=k))}Nc(g,t)})}function cr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function al(e,t){for(var n=t+"Capture",r=[];e!==null;){var l=e,a=l.stateNode;l.tag===5&&a!==null&&(l=a,a=nr(e,n),a!=null&&r.unshift(cr(e,a,l)),a=nr(e,t),a!=null&&r.push(cr(e,a,l))),e=e.return}return r}function tn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Lo(e,t,n,r,l){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,d=s.stateNode;if(c!==null&&c===r)break;s.tag===5&&d!==null&&(s=d,l?(c=nr(n,a),c!=null&&o.unshift(cr(n,c,s))):l||(c=nr(n,a),c!=null&&o.push(cr(n,c,s)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Ep=/\r\n?/g,Tp=/\u0000|\uFFFD/g;function Ao(e){return(typeof e=="string"?e:""+e).replace(Ep,`
`).replace(Tp,"")}function Lr(e,t,n){if(t=Ao(t),Ao(e)!==t&&n)throw Error(b(425))}function il(){}var Ia=null,Ra=null;function Ua(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Da=typeof setTimeout=="function"?setTimeout:void 0,Mp=typeof clearTimeout=="function"?clearTimeout:void 0,Io=typeof Promise=="function"?Promise:void 0,_p=typeof queueMicrotask=="function"?queueMicrotask:typeof Io<"u"?function(e){return Io.resolve(null).then(e).catch(Lp)}:Da;function Lp(e){setTimeout(function(){throw e})}function ra(e,t){var n=t,r=0;do{var l=n.nextSibling;if(e.removeChild(n),l&&l.nodeType===8)if(n=l.data,n==="/$"){if(r===0){e.removeChild(l),ar(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=l}while(n);ar(t)}function zt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Ro(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Mn=Math.random().toString(36).slice(2),et="__reactFiber$"+Mn,ur="__reactProps$"+Mn,ft="__reactContainer$"+Mn,Fa="__reactEvents$"+Mn,Ap="__reactListeners$"+Mn,Ip="__reactHandles$"+Mn;function Vt(e){var t=e[et];if(t)return t;for(var n=e.parentNode;n;){if(t=n[ft]||n[et]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Ro(e);e!==null;){if(n=e[et])return n;e=Ro(e)}return t}e=n,n=e.parentNode}return null}function wr(e){return e=e[et]||e[ft],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function cn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(b(33))}function zl(e){return e[ur]||null}var Oa=[],un=-1;function Rt(e){return{current:e}}function X(e){0>un||(e.current=Oa[un],Oa[un]=null,un--)}function G(e,t){un++,Oa[un]=e.current,e.current=t}var At={},me=Rt(At),Ne=Rt(!1),Wt=At;function Sn(e,t){var n=e.type.contextTypes;if(!n)return At;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var l={},a;for(a in n)l[a]=t[a];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=l),l}function Ce(e){return e=e.childContextTypes,e!=null}function ol(){X(Ne),X(me)}function Uo(e,t,n){if(me.current!==At)throw Error(b(168));G(me,t),G(Ne,n)}function Pc(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var l in r)if(!(l in t))throw Error(b(108,vd(e)||"Unknown",l));return Z({},n,r)}function sl(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||At,Wt=me.current,G(me,e),G(Ne,Ne.current),!0}function Do(e,t,n){var r=e.stateNode;if(!r)throw Error(b(169));n?(e=Pc(e,t,Wt),r.__reactInternalMemoizedMergedChildContext=e,X(Ne),X(me),G(me,e)):X(Ne),G(Ne,n)}var st=null,El=!1,la=!1;function zc(e){st===null?st=[e]:st.push(e)}function Rp(e){El=!0,zc(e)}function Ut(){if(!la&&st!==null){la=!0;var e=0,t=B;try{var n=st;for(B=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}st=null,El=!1}catch(l){throw st!==null&&(st=st.slice(e+1)),Zs(xi,Ut),l}finally{B=t,la=!1}}return null}var dn=[],pn=0,cl=null,ul=0,Ie=[],Re=0,Xt=null,ct=1,ut="";function Ot(e,t){dn[pn++]=ul,dn[pn++]=cl,cl=e,ul=t}function Ec(e,t,n){Ie[Re++]=ct,Ie[Re++]=ut,Ie[Re++]=Xt,Xt=e;var r=ct;e=ut;var l=32-We(r)-1;r&=~(1<<l),n+=1;var a=32-We(t)+l;if(30<a){var o=l-l%5;a=(r&(1<<o)-1).toString(32),r>>=o,l-=o,ct=1<<32-We(t)+l|n<<l|r,ut=a+e}else ct=1<<a|n<<l|r,ut=e}function Ci(e){e.return!==null&&(Ot(e,1),Ec(e,1,0))}function Pi(e){for(;e===cl;)cl=dn[--pn],dn[pn]=null,ul=dn[--pn],dn[pn]=null;for(;e===Xt;)Xt=Ie[--Re],Ie[Re]=null,ut=Ie[--Re],Ie[Re]=null,ct=Ie[--Re],Ie[Re]=null}var Te=null,Ee=null,Q=!1,Ge=null;function Tc(e,t){var n=De(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Fo(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Te=e,Ee=zt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Te=e,Ee=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Xt!==null?{id:ct,overflow:ut}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=De(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Te=e,Ee=null,!0):!1;default:return!1}}function Ha(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Va(e){if(Q){var t=Ee;if(t){var n=t;if(!Fo(e,t)){if(Ha(e))throw Error(b(418));t=zt(n.nextSibling);var r=Te;t&&Fo(e,t)?Tc(r,n):(e.flags=e.flags&-4097|2,Q=!1,Te=e)}}else{if(Ha(e))throw Error(b(418));e.flags=e.flags&-4097|2,Q=!1,Te=e}}}function Oo(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Te=e}function Ar(e){if(e!==Te)return!1;if(!Q)return Oo(e),Q=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Ua(e.type,e.memoizedProps)),t&&(t=Ee)){if(Ha(e))throw Mc(),Error(b(418));for(;t;)Tc(e,t),t=zt(t.nextSibling)}if(Oo(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(b(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Ee=zt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Ee=null}}else Ee=Te?zt(e.stateNode.nextSibling):null;return!0}function Mc(){for(var e=Ee;e;)e=zt(e.nextSibling)}function jn(){Ee=Te=null,Q=!1}function zi(e){Ge===null?Ge=[e]:Ge.push(e)}var Up=gt.ReactCurrentBatchConfig;function Un(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(b(309));var r=n.stateNode}if(!r)throw Error(b(147,e));var l=r,a=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===a?t.ref:(t=function(o){var s=l.refs;o===null?delete s[a]:s[a]=o},t._stringRef=a,t)}if(typeof e!="string")throw Error(b(284));if(!n._owner)throw Error(b(290,e))}return e}function Ir(e,t){throw e=Object.prototype.toString.call(t),Error(b(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Ho(e){var t=e._init;return t(e._payload)}function _c(e){function t(h,u){if(e){var p=h.deletions;p===null?(h.deletions=[u],h.flags|=16):p.push(u)}}function n(h,u){if(!e)return null;for(;u!==null;)t(h,u),u=u.sibling;return null}function r(h,u){for(h=new Map;u!==null;)u.key!==null?h.set(u.key,u):h.set(u.index,u),u=u.sibling;return h}function l(h,u){return h=_t(h,u),h.index=0,h.sibling=null,h}function a(h,u,p){return h.index=p,e?(p=h.alternate,p!==null?(p=p.index,p<u?(h.flags|=2,u):p):(h.flags|=2,u)):(h.flags|=1048576,u)}function o(h){return e&&h.alternate===null&&(h.flags|=2),h}function s(h,u,p,v){return u===null||u.tag!==6?(u=da(p,h.mode,v),u.return=h,u):(u=l(u,p),u.return=h,u)}function c(h,u,p,v){var S=p.type;return S===ln?m(h,u,p.props.children,v,p.key):u!==null&&(u.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===vt&&Ho(S)===u.type)?(v=l(u,p.props),v.ref=Un(h,u,p),v.return=h,v):(v=Kr(p.type,p.key,p.props,null,h.mode,v),v.ref=Un(h,u,p),v.return=h,v)}function d(h,u,p,v){return u===null||u.tag!==4||u.stateNode.containerInfo!==p.containerInfo||u.stateNode.implementation!==p.implementation?(u=pa(p,h.mode,v),u.return=h,u):(u=l(u,p.children||[]),u.return=h,u)}function m(h,u,p,v,S){return u===null||u.tag!==7?(u=Gt(p,h.mode,v,S),u.return=h,u):(u=l(u,p),u.return=h,u)}function g(h,u,p){if(typeof u=="string"&&u!==""||typeof u=="number")return u=da(""+u,h.mode,p),u.return=h,u;if(typeof u=="object"&&u!==null){switch(u.$$typeof){case jr:return p=Kr(u.type,u.key,u.props,null,h.mode,p),p.ref=Un(h,null,u),p.return=h,p;case rn:return u=pa(u,h.mode,p),u.return=h,u;case vt:var v=u._init;return g(h,v(u._payload),p)}if(Vn(u)||_n(u))return u=Gt(u,h.mode,p,null),u.return=h,u;Ir(h,u)}return null}function f(h,u,p,v){var S=u!==null?u.key:null;if(typeof p=="string"&&p!==""||typeof p=="number")return S!==null?null:s(h,u,""+p,v);if(typeof p=="object"&&p!==null){switch(p.$$typeof){case jr:return p.key===S?c(h,u,p,v):null;case rn:return p.key===S?d(h,u,p,v):null;case vt:return S=p._init,f(h,u,S(p._payload),v)}if(Vn(p)||_n(p))return S!==null?null:m(h,u,p,v,null);Ir(h,p)}return null}function y(h,u,p,v,S){if(typeof v=="string"&&v!==""||typeof v=="number")return h=h.get(p)||null,s(u,h,""+v,S);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case jr:return h=h.get(v.key===null?p:v.key)||null,c(u,h,v,S);case rn:return h=h.get(v.key===null?p:v.key)||null,d(u,h,v,S);case vt:var P=v._init;return y(h,u,p,P(v._payload),S)}if(Vn(v)||_n(v))return h=h.get(p)||null,m(u,h,v,S,null);Ir(u,v)}return null}function x(h,u,p,v){for(var S=null,P=null,k=u,C=u=0,F=null;k!==null&&C<p.length;C++){k.index>C?(F=k,k=null):F=k.sibling;var R=f(h,k,p[C],v);if(R===null){k===null&&(k=F);break}e&&k&&R.alternate===null&&t(h,k),u=a(R,u,C),P===null?S=R:P.sibling=R,P=R,k=F}if(C===p.length)return n(h,k),Q&&Ot(h,C),S;if(k===null){for(;C<p.length;C++)k=g(h,p[C],v),k!==null&&(u=a(k,u,C),P===null?S=k:P.sibling=k,P=k);return Q&&Ot(h,C),S}for(k=r(h,k);C<p.length;C++)F=y(k,h,C,p[C],v),F!==null&&(e&&F.alternate!==null&&k.delete(F.key===null?C:F.key),u=a(F,u,C),P===null?S=F:P.sibling=F,P=F);return e&&k.forEach(function(V){return t(h,V)}),Q&&Ot(h,C),S}function w(h,u,p,v){var S=_n(p);if(typeof S!="function")throw Error(b(150));if(p=S.call(p),p==null)throw Error(b(151));for(var P=S=null,k=u,C=u=0,F=null,R=p.next();k!==null&&!R.done;C++,R=p.next()){k.index>C?(F=k,k=null):F=k.sibling;var V=f(h,k,R.value,v);if(V===null){k===null&&(k=F);break}e&&k&&V.alternate===null&&t(h,k),u=a(V,u,C),P===null?S=V:P.sibling=V,P=V,k=F}if(R.done)return n(h,k),Q&&Ot(h,C),S;if(k===null){for(;!R.done;C++,R=p.next())R=g(h,R.value,v),R!==null&&(u=a(R,u,C),P===null?S=R:P.sibling=R,P=R);return Q&&Ot(h,C),S}for(k=r(h,k);!R.done;C++,R=p.next())R=y(k,h,C,R.value,v),R!==null&&(e&&R.alternate!==null&&k.delete(R.key===null?C:R.key),u=a(R,u,C),P===null?S=R:P.sibling=R,P=R);return e&&k.forEach(function(ge){return t(h,ge)}),Q&&Ot(h,C),S}function L(h,u,p,v){if(typeof p=="object"&&p!==null&&p.type===ln&&p.key===null&&(p=p.props.children),typeof p=="object"&&p!==null){switch(p.$$typeof){case jr:e:{for(var S=p.key,P=u;P!==null;){if(P.key===S){if(S=p.type,S===ln){if(P.tag===7){n(h,P.sibling),u=l(P,p.props.children),u.return=h,h=u;break e}}else if(P.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===vt&&Ho(S)===P.type){n(h,P.sibling),u=l(P,p.props),u.ref=Un(h,P,p),u.return=h,h=u;break e}n(h,P);break}else t(h,P);P=P.sibling}p.type===ln?(u=Gt(p.props.children,h.mode,v,p.key),u.return=h,h=u):(v=Kr(p.type,p.key,p.props,null,h.mode,v),v.ref=Un(h,u,p),v.return=h,h=v)}return o(h);case rn:e:{for(P=p.key;u!==null;){if(u.key===P)if(u.tag===4&&u.stateNode.containerInfo===p.containerInfo&&u.stateNode.implementation===p.implementation){n(h,u.sibling),u=l(u,p.children||[]),u.return=h,h=u;break e}else{n(h,u);break}else t(h,u);u=u.sibling}u=pa(p,h.mode,v),u.return=h,h=u}return o(h);case vt:return P=p._init,L(h,u,P(p._payload),v)}if(Vn(p))return x(h,u,p,v);if(_n(p))return w(h,u,p,v);Ir(h,p)}return typeof p=="string"&&p!==""||typeof p=="number"?(p=""+p,u!==null&&u.tag===6?(n(h,u.sibling),u=l(u,p),u.return=h,h=u):(n(h,u),u=da(p,h.mode,v),u.return=h,h=u),o(h)):n(h,u)}return L}var Nn=_c(!0),Lc=_c(!1),dl=Rt(null),pl=null,fn=null,Ei=null;function Ti(){Ei=fn=pl=null}function Mi(e){var t=dl.current;X(dl),e._currentValue=t}function $a(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function wn(e,t){pl=e,Ei=fn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(je=!0),e.firstContext=null)}function Oe(e){var t=e._currentValue;if(Ei!==e)if(e={context:e,memoizedValue:t,next:null},fn===null){if(pl===null)throw Error(b(308));fn=e,pl.dependencies={lanes:0,firstContext:e}}else fn=fn.next=e;return t}var $t=null;function _i(e){$t===null?$t=[e]:$t.push(e)}function Ac(e,t,n,r){var l=t.interleaved;return l===null?(n.next=n,_i(t)):(n.next=l.next,l.next=n),t.interleaved=n,ht(e,r)}function ht(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var wt=!1;function Li(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Ic(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function dt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Et(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,H&2){var l=r.pending;return l===null?t.next=t:(t.next=l.next,l.next=t),r.pending=t,ht(e,n)}return l=r.interleaved,l===null?(t.next=t,_i(r)):(t.next=l.next,l.next=t),r.interleaved=t,ht(e,n)}function qr(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,yi(e,n)}}function Vo(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var l=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};a===null?l=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?l=a=t:a=a.next=t}else l=a=t;n={baseState:r.baseState,firstBaseUpdate:l,lastBaseUpdate:a,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function fl(e,t,n,r){var l=e.updateQueue;wt=!1;var a=l.firstBaseUpdate,o=l.lastBaseUpdate,s=l.shared.pending;if(s!==null){l.shared.pending=null;var c=s,d=c.next;c.next=null,o===null?a=d:o.next=d,o=c;var m=e.alternate;m!==null&&(m=m.updateQueue,s=m.lastBaseUpdate,s!==o&&(s===null?m.firstBaseUpdate=d:s.next=d,m.lastBaseUpdate=c))}if(a!==null){var g=l.baseState;o=0,m=d=c=null,s=a;do{var f=s.lane,y=s.eventTime;if((r&f)===f){m!==null&&(m=m.next={eventTime:y,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var x=e,w=s;switch(f=t,y=n,w.tag){case 1:if(x=w.payload,typeof x=="function"){g=x.call(y,g,f);break e}g=x;break e;case 3:x.flags=x.flags&-65537|128;case 0:if(x=w.payload,f=typeof x=="function"?x.call(y,g,f):x,f==null)break e;g=Z({},g,f);break e;case 2:wt=!0}}s.callback!==null&&s.lane!==0&&(e.flags|=64,f=l.effects,f===null?l.effects=[s]:f.push(s))}else y={eventTime:y,lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},m===null?(d=m=y,c=g):m=m.next=y,o|=f;if(s=s.next,s===null){if(s=l.shared.pending,s===null)break;f=s,s=f.next,f.next=null,l.lastBaseUpdate=f,l.shared.pending=null}}while(!0);if(m===null&&(c=g),l.baseState=c,l.firstBaseUpdate=d,l.lastBaseUpdate=m,t=l.shared.interleaved,t!==null){l=t;do o|=l.lane,l=l.next;while(l!==t)}else a===null&&(l.shared.lanes=0);Yt|=o,e.lanes=o,e.memoizedState=g}}function $o(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],l=r.callback;if(l!==null){if(r.callback=null,r=n,typeof l!="function")throw Error(b(191,l));l.call(r)}}}var kr={},nt=Rt(kr),dr=Rt(kr),pr=Rt(kr);function Bt(e){if(e===kr)throw Error(b(174));return e}function Ai(e,t){switch(G(pr,t),G(dr,e),G(nt,kr),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Sa(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Sa(t,e)}X(nt),G(nt,t)}function Cn(){X(nt),X(dr),X(pr)}function Rc(e){Bt(pr.current);var t=Bt(nt.current),n=Sa(t,e.type);t!==n&&(G(dr,e),G(nt,n))}function Ii(e){dr.current===e&&(X(nt),X(dr))}var K=Rt(0);function hl(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var aa=[];function Ri(){for(var e=0;e<aa.length;e++)aa[e]._workInProgressVersionPrimary=null;aa.length=0}var Gr=gt.ReactCurrentDispatcher,ia=gt.ReactCurrentBatchConfig,Qt=0,J=null,re=null,ae=null,ml=!1,Yn=!1,fr=0,Dp=0;function pe(){throw Error(b(321))}function Ui(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Qe(e[n],t[n]))return!1;return!0}function Di(e,t,n,r,l,a){if(Qt=a,J=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Gr.current=e===null||e.memoizedState===null?Vp:$p,e=n(r,l),Yn){a=0;do{if(Yn=!1,fr=0,25<=a)throw Error(b(301));a+=1,ae=re=null,t.updateQueue=null,Gr.current=Bp,e=n(r,l)}while(Yn)}if(Gr.current=gl,t=re!==null&&re.next!==null,Qt=0,ae=re=J=null,ml=!1,t)throw Error(b(300));return e}function Fi(){var e=fr!==0;return fr=0,e}function Ze(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ae===null?J.memoizedState=ae=e:ae=ae.next=e,ae}function He(){if(re===null){var e=J.alternate;e=e!==null?e.memoizedState:null}else e=re.next;var t=ae===null?J.memoizedState:ae.next;if(t!==null)ae=t,re=e;else{if(e===null)throw Error(b(310));re=e,e={memoizedState:re.memoizedState,baseState:re.baseState,baseQueue:re.baseQueue,queue:re.queue,next:null},ae===null?J.memoizedState=ae=e:ae=ae.next=e}return ae}function hr(e,t){return typeof t=="function"?t(e):t}function oa(e){var t=He(),n=t.queue;if(n===null)throw Error(b(311));n.lastRenderedReducer=e;var r=re,l=r.baseQueue,a=n.pending;if(a!==null){if(l!==null){var o=l.next;l.next=a.next,a.next=o}r.baseQueue=l=a,n.pending=null}if(l!==null){a=l.next,r=r.baseState;var s=o=null,c=null,d=a;do{var m=d.lane;if((Qt&m)===m)c!==null&&(c=c.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),r=d.hasEagerState?d.eagerState:e(r,d.action);else{var g={lane:m,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};c===null?(s=c=g,o=r):c=c.next=g,J.lanes|=m,Yt|=m}d=d.next}while(d!==null&&d!==a);c===null?o=r:c.next=s,Qe(r,t.memoizedState)||(je=!0),t.memoizedState=r,t.baseState=o,t.baseQueue=c,n.lastRenderedState=r}if(e=n.interleaved,e!==null){l=e;do a=l.lane,J.lanes|=a,Yt|=a,l=l.next;while(l!==e)}else l===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function sa(e){var t=He(),n=t.queue;if(n===null)throw Error(b(311));n.lastRenderedReducer=e;var r=n.dispatch,l=n.pending,a=t.memoizedState;if(l!==null){n.pending=null;var o=l=l.next;do a=e(a,o.action),o=o.next;while(o!==l);Qe(a,t.memoizedState)||(je=!0),t.memoizedState=a,t.baseQueue===null&&(t.baseState=a),n.lastRenderedState=a}return[a,r]}function Uc(){}function Dc(e,t){var n=J,r=He(),l=t(),a=!Qe(r.memoizedState,l);if(a&&(r.memoizedState=l,je=!0),r=r.queue,Oi(Hc.bind(null,n,r,e),[e]),r.getSnapshot!==t||a||ae!==null&&ae.memoizedState.tag&1){if(n.flags|=2048,mr(9,Oc.bind(null,n,r,l,t),void 0,null),ie===null)throw Error(b(349));Qt&30||Fc(n,t,l)}return l}function Fc(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=J.updateQueue,t===null?(t={lastEffect:null,stores:null},J.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Oc(e,t,n,r){t.value=n,t.getSnapshot=r,Vc(t)&&$c(e)}function Hc(e,t,n){return n(function(){Vc(t)&&$c(e)})}function Vc(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Qe(e,n)}catch{return!0}}function $c(e){var t=ht(e,1);t!==null&&Xe(t,e,1,-1)}function Bo(e){var t=Ze();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:hr,lastRenderedState:e},t.queue=e,e=e.dispatch=Hp.bind(null,J,e),[t.memoizedState,e]}function mr(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=J.updateQueue,t===null?(t={lastEffect:null,stores:null},J.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Bc(){return He().memoizedState}function Wr(e,t,n,r){var l=Ze();J.flags|=e,l.memoizedState=mr(1|t,n,void 0,r===void 0?null:r)}function Tl(e,t,n,r){var l=He();r=r===void 0?null:r;var a=void 0;if(re!==null){var o=re.memoizedState;if(a=o.destroy,r!==null&&Ui(r,o.deps)){l.memoizedState=mr(t,n,a,r);return}}J.flags|=e,l.memoizedState=mr(1|t,n,a,r)}function qo(e,t){return Wr(8390656,8,e,t)}function Oi(e,t){return Tl(2048,8,e,t)}function qc(e,t){return Tl(4,2,e,t)}function Gc(e,t){return Tl(4,4,e,t)}function Wc(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Xc(e,t,n){return n=n!=null?n.concat([e]):null,Tl(4,4,Wc.bind(null,t,e),n)}function Hi(){}function Qc(e,t){var n=He();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Ui(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Yc(e,t){var n=He();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Ui(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Kc(e,t,n){return Qt&21?(Qe(n,t)||(n=nc(),J.lanes|=n,Yt|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,je=!0),e.memoizedState=n)}function Fp(e,t){var n=B;B=n!==0&&4>n?n:4,e(!0);var r=ia.transition;ia.transition={};try{e(!1),t()}finally{B=n,ia.transition=r}}function Jc(){return He().memoizedState}function Op(e,t,n){var r=Mt(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Zc(e))eu(t,n);else if(n=Ac(e,t,n,r),n!==null){var l=ye();Xe(n,e,r,l),tu(n,t,r)}}function Hp(e,t,n){var r=Mt(e),l={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Zc(e))eu(t,l);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(l.hasEagerState=!0,l.eagerState=s,Qe(s,o)){var c=t.interleaved;c===null?(l.next=l,_i(t)):(l.next=c.next,c.next=l),t.interleaved=l;return}}catch{}finally{}n=Ac(e,t,l,r),n!==null&&(l=ye(),Xe(n,e,r,l),tu(n,t,r))}}function Zc(e){var t=e.alternate;return e===J||t!==null&&t===J}function eu(e,t){Yn=ml=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function tu(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,yi(e,n)}}var gl={readContext:Oe,useCallback:pe,useContext:pe,useEffect:pe,useImperativeHandle:pe,useInsertionEffect:pe,useLayoutEffect:pe,useMemo:pe,useReducer:pe,useRef:pe,useState:pe,useDebugValue:pe,useDeferredValue:pe,useTransition:pe,useMutableSource:pe,useSyncExternalStore:pe,useId:pe,unstable_isNewReconciler:!1},Vp={readContext:Oe,useCallback:function(e,t){return Ze().memoizedState=[e,t===void 0?null:t],e},useContext:Oe,useEffect:qo,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Wr(4194308,4,Wc.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Wr(4194308,4,e,t)},useInsertionEffect:function(e,t){return Wr(4,2,e,t)},useMemo:function(e,t){var n=Ze();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Ze();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Op.bind(null,J,e),[r.memoizedState,e]},useRef:function(e){var t=Ze();return e={current:e},t.memoizedState=e},useState:Bo,useDebugValue:Hi,useDeferredValue:function(e){return Ze().memoizedState=e},useTransition:function(){var e=Bo(!1),t=e[0];return e=Fp.bind(null,e[1]),Ze().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=J,l=Ze();if(Q){if(n===void 0)throw Error(b(407));n=n()}else{if(n=t(),ie===null)throw Error(b(349));Qt&30||Fc(r,t,n)}l.memoizedState=n;var a={value:n,getSnapshot:t};return l.queue=a,qo(Hc.bind(null,r,a,e),[e]),r.flags|=2048,mr(9,Oc.bind(null,r,a,n,t),void 0,null),n},useId:function(){var e=Ze(),t=ie.identifierPrefix;if(Q){var n=ut,r=ct;n=(r&~(1<<32-We(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=fr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Dp++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},$p={readContext:Oe,useCallback:Qc,useContext:Oe,useEffect:Oi,useImperativeHandle:Xc,useInsertionEffect:qc,useLayoutEffect:Gc,useMemo:Yc,useReducer:oa,useRef:Bc,useState:function(){return oa(hr)},useDebugValue:Hi,useDeferredValue:function(e){var t=He();return Kc(t,re.memoizedState,e)},useTransition:function(){var e=oa(hr)[0],t=He().memoizedState;return[e,t]},useMutableSource:Uc,useSyncExternalStore:Dc,useId:Jc,unstable_isNewReconciler:!1},Bp={readContext:Oe,useCallback:Qc,useContext:Oe,useEffect:Oi,useImperativeHandle:Xc,useInsertionEffect:qc,useLayoutEffect:Gc,useMemo:Yc,useReducer:sa,useRef:Bc,useState:function(){return sa(hr)},useDebugValue:Hi,useDeferredValue:function(e){var t=He();return re===null?t.memoizedState=e:Kc(t,re.memoizedState,e)},useTransition:function(){var e=sa(hr)[0],t=He().memoizedState;return[e,t]},useMutableSource:Uc,useSyncExternalStore:Dc,useId:Jc,unstable_isNewReconciler:!1};function Be(e,t){if(e&&e.defaultProps){t=Z({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Ba(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:Z({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Ml={isMounted:function(e){return(e=e._reactInternals)?Zt(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=ye(),l=Mt(e),a=dt(r,l);a.payload=t,n!=null&&(a.callback=n),t=Et(e,a,l),t!==null&&(Xe(t,e,l,r),qr(t,e,l))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=ye(),l=Mt(e),a=dt(r,l);a.tag=1,a.payload=t,n!=null&&(a.callback=n),t=Et(e,a,l),t!==null&&(Xe(t,e,l,r),qr(t,e,l))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=ye(),r=Mt(e),l=dt(n,r);l.tag=2,t!=null&&(l.callback=t),t=Et(e,l,r),t!==null&&(Xe(t,e,r,n),qr(t,e,r))}};function Go(e,t,n,r,l,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!or(n,r)||!or(l,a):!0}function nu(e,t,n){var r=!1,l=At,a=t.contextType;return typeof a=="object"&&a!==null?a=Oe(a):(l=Ce(t)?Wt:me.current,r=t.contextTypes,a=(r=r!=null)?Sn(e,l):At),t=new t(n,a),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Ml,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=l,e.__reactInternalMemoizedMaskedChildContext=a),t}function Wo(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Ml.enqueueReplaceState(t,t.state,null)}function qa(e,t,n,r){var l=e.stateNode;l.props=n,l.state=e.memoizedState,l.refs={},Li(e);var a=t.contextType;typeof a=="object"&&a!==null?l.context=Oe(a):(a=Ce(t)?Wt:me.current,l.context=Sn(e,a)),l.state=e.memoizedState,a=t.getDerivedStateFromProps,typeof a=="function"&&(Ba(e,t,a,n),l.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof l.getSnapshotBeforeUpdate=="function"||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(t=l.state,typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount(),t!==l.state&&Ml.enqueueReplaceState(l,l.state,null),fl(e,n,l,r),l.state=e.memoizedState),typeof l.componentDidMount=="function"&&(e.flags|=4194308)}function Pn(e,t){try{var n="",r=t;do n+=yd(r),r=r.return;while(r);var l=n}catch(a){l=`
Error generating stack: `+a.message+`
`+a.stack}return{value:e,source:t,stack:l,digest:null}}function ca(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Ga(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var qp=typeof WeakMap=="function"?WeakMap:Map;function ru(e,t,n){n=dt(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){yl||(yl=!0,ni=r),Ga(e,t)},n}function lu(e,t,n){n=dt(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var l=t.value;n.payload=function(){return r(l)},n.callback=function(){Ga(e,t)}}var a=e.stateNode;return a!==null&&typeof a.componentDidCatch=="function"&&(n.callback=function(){Ga(e,t),typeof r!="function"&&(Tt===null?Tt=new Set([this]):Tt.add(this));var o=t.stack;this.componentDidCatch(t.value,{componentStack:o!==null?o:""})}),n}function Xo(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new qp;var l=new Set;r.set(t,l)}else l=r.get(t),l===void 0&&(l=new Set,r.set(t,l));l.has(n)||(l.add(n),e=af.bind(null,e,t,n),t.then(e,e))}function Qo(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Yo(e,t,n,r,l){return e.mode&1?(e.flags|=65536,e.lanes=l,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=dt(-1,1),t.tag=2,Et(n,t,1))),n.lanes|=1),e)}var Gp=gt.ReactCurrentOwner,je=!1;function xe(e,t,n,r){t.child=e===null?Lc(t,null,n,r):Nn(t,e.child,n,r)}function Ko(e,t,n,r,l){n=n.render;var a=t.ref;return wn(t,l),r=Di(e,t,n,r,a,l),n=Fi(),e!==null&&!je?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,mt(e,t,l)):(Q&&n&&Ci(t),t.flags|=1,xe(e,t,r,l),t.child)}function Jo(e,t,n,r,l){if(e===null){var a=n.type;return typeof a=="function"&&!Qi(a)&&a.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=a,au(e,t,a,r,l)):(e=Kr(n.type,null,r,t,t.mode,l),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!(e.lanes&l)){var o=a.memoizedProps;if(n=n.compare,n=n!==null?n:or,n(o,r)&&e.ref===t.ref)return mt(e,t,l)}return t.flags|=1,e=_t(a,r),e.ref=t.ref,e.return=t,t.child=e}function au(e,t,n,r,l){if(e!==null){var a=e.memoizedProps;if(or(a,r)&&e.ref===t.ref)if(je=!1,t.pendingProps=r=a,(e.lanes&l)!==0)e.flags&131072&&(je=!0);else return t.lanes=e.lanes,mt(e,t,l)}return Wa(e,t,n,r,l)}function iu(e,t,n){var r=t.pendingProps,l=r.children,a=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},G(mn,ze),ze|=n;else{if(!(n&1073741824))return e=a!==null?a.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,G(mn,ze),ze|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=a!==null?a.baseLanes:n,G(mn,ze),ze|=r}else a!==null?(r=a.baseLanes|n,t.memoizedState=null):r=n,G(mn,ze),ze|=r;return xe(e,t,l,n),t.child}function ou(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Wa(e,t,n,r,l){var a=Ce(n)?Wt:me.current;return a=Sn(t,a),wn(t,l),n=Di(e,t,n,r,a,l),r=Fi(),e!==null&&!je?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,mt(e,t,l)):(Q&&r&&Ci(t),t.flags|=1,xe(e,t,n,l),t.child)}function Zo(e,t,n,r,l){if(Ce(n)){var a=!0;sl(t)}else a=!1;if(wn(t,l),t.stateNode===null)Xr(e,t),nu(t,n,r),qa(t,n,r,l),r=!0;else if(e===null){var o=t.stateNode,s=t.memoizedProps;o.props=s;var c=o.context,d=n.contextType;typeof d=="object"&&d!==null?d=Oe(d):(d=Ce(n)?Wt:me.current,d=Sn(t,d));var m=n.getDerivedStateFromProps,g=typeof m=="function"||typeof o.getSnapshotBeforeUpdate=="function";g||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(s!==r||c!==d)&&Wo(t,o,r,d),wt=!1;var f=t.memoizedState;o.state=f,fl(t,r,o,l),c=t.memoizedState,s!==r||f!==c||Ne.current||wt?(typeof m=="function"&&(Ba(t,n,m,r),c=t.memoizedState),(s=wt||Go(t,n,s,r,f,c,d))?(g||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(t.flags|=4194308)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=c),o.props=r,o.state=c,o.context=d,r=s):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{o=t.stateNode,Ic(e,t),s=t.memoizedProps,d=t.type===t.elementType?s:Be(t.type,s),o.props=d,g=t.pendingProps,f=o.context,c=n.contextType,typeof c=="object"&&c!==null?c=Oe(c):(c=Ce(n)?Wt:me.current,c=Sn(t,c));var y=n.getDerivedStateFromProps;(m=typeof y=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(s!==g||f!==c)&&Wo(t,o,r,c),wt=!1,f=t.memoizedState,o.state=f,fl(t,r,o,l);var x=t.memoizedState;s!==g||f!==x||Ne.current||wt?(typeof y=="function"&&(Ba(t,n,y,r),x=t.memoizedState),(d=wt||Go(t,n,d,r,f,x,c)||!1)?(m||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,x,c),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,x,c)),typeof o.componentDidUpdate=="function"&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||s===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=x),o.props=r,o.state=x,o.context=c,r=d):(typeof o.componentDidUpdate!="function"||s===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return Xa(e,t,n,r,a,l)}function Xa(e,t,n,r,l,a){ou(e,t);var o=(t.flags&128)!==0;if(!r&&!o)return l&&Do(t,n,!1),mt(e,t,a);r=t.stateNode,Gp.current=t;var s=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&o?(t.child=Nn(t,e.child,null,a),t.child=Nn(t,null,s,a)):xe(e,t,s,a),t.memoizedState=r.state,l&&Do(t,n,!0),t.child}function su(e){var t=e.stateNode;t.pendingContext?Uo(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Uo(e,t.context,!1),Ai(e,t.containerInfo)}function es(e,t,n,r,l){return jn(),zi(l),t.flags|=256,xe(e,t,n,r),t.child}var Qa={dehydrated:null,treeContext:null,retryLane:0};function Ya(e){return{baseLanes:e,cachePool:null,transitions:null}}function cu(e,t,n){var r=t.pendingProps,l=K.current,a=!1,o=(t.flags&128)!==0,s;if((s=o)||(s=e!==null&&e.memoizedState===null?!1:(l&2)!==0),s?(a=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(l|=1),G(K,l&1),e===null)return Va(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(o=r.children,e=r.fallback,a?(r=t.mode,a=t.child,o={mode:"hidden",children:o},!(r&1)&&a!==null?(a.childLanes=0,a.pendingProps=o):a=Al(o,r,0,null),e=Gt(e,r,n,null),a.return=t,e.return=t,a.sibling=e,t.child=a,t.child.memoizedState=Ya(n),t.memoizedState=Qa,e):Vi(t,o));if(l=e.memoizedState,l!==null&&(s=l.dehydrated,s!==null))return Wp(e,t,o,r,s,l,n);if(a){a=r.fallback,o=t.mode,l=e.child,s=l.sibling;var c={mode:"hidden",children:r.children};return!(o&1)&&t.child!==l?(r=t.child,r.childLanes=0,r.pendingProps=c,t.deletions=null):(r=_t(l,c),r.subtreeFlags=l.subtreeFlags&14680064),s!==null?a=_t(s,a):(a=Gt(a,o,n,null),a.flags|=2),a.return=t,r.return=t,r.sibling=a,t.child=r,r=a,a=t.child,o=e.child.memoizedState,o=o===null?Ya(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},a.memoizedState=o,a.childLanes=e.childLanes&~n,t.memoizedState=Qa,r}return a=e.child,e=a.sibling,r=_t(a,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Vi(e,t){return t=Al({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Rr(e,t,n,r){return r!==null&&zi(r),Nn(t,e.child,null,n),e=Vi(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Wp(e,t,n,r,l,a,o){if(n)return t.flags&256?(t.flags&=-257,r=ca(Error(b(422))),Rr(e,t,o,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(a=r.fallback,l=t.mode,r=Al({mode:"visible",children:r.children},l,0,null),a=Gt(a,l,o,null),a.flags|=2,r.return=t,a.return=t,r.sibling=a,t.child=r,t.mode&1&&Nn(t,e.child,null,o),t.child.memoizedState=Ya(o),t.memoizedState=Qa,a);if(!(t.mode&1))return Rr(e,t,o,null);if(l.data==="$!"){if(r=l.nextSibling&&l.nextSibling.dataset,r)var s=r.dgst;return r=s,a=Error(b(419)),r=ca(a,r,void 0),Rr(e,t,o,r)}if(s=(o&e.childLanes)!==0,je||s){if(r=ie,r!==null){switch(o&-o){case 4:l=2;break;case 16:l=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:l=32;break;case 536870912:l=268435456;break;default:l=0}l=l&(r.suspendedLanes|o)?0:l,l!==0&&l!==a.retryLane&&(a.retryLane=l,ht(e,l),Xe(r,e,l,-1))}return Xi(),r=ca(Error(b(421))),Rr(e,t,o,r)}return l.data==="$?"?(t.flags|=128,t.child=e.child,t=of.bind(null,e),l._reactRetry=t,null):(e=a.treeContext,Ee=zt(l.nextSibling),Te=t,Q=!0,Ge=null,e!==null&&(Ie[Re++]=ct,Ie[Re++]=ut,Ie[Re++]=Xt,ct=e.id,ut=e.overflow,Xt=t),t=Vi(t,r.children),t.flags|=4096,t)}function ts(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),$a(e.return,t,n)}function ua(e,t,n,r,l){var a=e.memoizedState;a===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:l}:(a.isBackwards=t,a.rendering=null,a.renderingStartTime=0,a.last=r,a.tail=n,a.tailMode=l)}function uu(e,t,n){var r=t.pendingProps,l=r.revealOrder,a=r.tail;if(xe(e,t,r.children,n),r=K.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&ts(e,n,t);else if(e.tag===19)ts(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(G(K,r),!(t.mode&1))t.memoizedState=null;else switch(l){case"forwards":for(n=t.child,l=null;n!==null;)e=n.alternate,e!==null&&hl(e)===null&&(l=n),n=n.sibling;n=l,n===null?(l=t.child,t.child=null):(l=n.sibling,n.sibling=null),ua(t,!1,l,n,a);break;case"backwards":for(n=null,l=t.child,t.child=null;l!==null;){if(e=l.alternate,e!==null&&hl(e)===null){t.child=l;break}e=l.sibling,l.sibling=n,n=l,l=e}ua(t,!0,n,null,a);break;case"together":ua(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Xr(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function mt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Yt|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(b(153));if(t.child!==null){for(e=t.child,n=_t(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=_t(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Xp(e,t,n){switch(t.tag){case 3:su(t),jn();break;case 5:Rc(t);break;case 1:Ce(t.type)&&sl(t);break;case 4:Ai(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,l=t.memoizedProps.value;G(dl,r._currentValue),r._currentValue=l;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(G(K,K.current&1),t.flags|=128,null):n&t.child.childLanes?cu(e,t,n):(G(K,K.current&1),e=mt(e,t,n),e!==null?e.sibling:null);G(K,K.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return uu(e,t,n);t.flags|=128}if(l=t.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),G(K,K.current),r)break;return null;case 22:case 23:return t.lanes=0,iu(e,t,n)}return mt(e,t,n)}var du,Ka,pu,fu;du=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Ka=function(){};pu=function(e,t,n,r){var l=e.memoizedProps;if(l!==r){e=t.stateNode,Bt(nt.current);var a=null;switch(n){case"input":l=va(e,l),r=va(e,r),a=[];break;case"select":l=Z({},l,{value:void 0}),r=Z({},r,{value:void 0}),a=[];break;case"textarea":l=ba(e,l),r=ba(e,r),a=[];break;default:typeof l.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=il)}ja(n,r);var o;n=null;for(d in l)if(!r.hasOwnProperty(d)&&l.hasOwnProperty(d)&&l[d]!=null)if(d==="style"){var s=l[d];for(o in s)s.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else d!=="dangerouslySetInnerHTML"&&d!=="children"&&d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&(er.hasOwnProperty(d)?a||(a=[]):(a=a||[]).push(d,null));for(d in r){var c=r[d];if(s=l!=null?l[d]:void 0,r.hasOwnProperty(d)&&c!==s&&(c!=null||s!=null))if(d==="style")if(s){for(o in s)!s.hasOwnProperty(o)||c&&c.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in c)c.hasOwnProperty(o)&&s[o]!==c[o]&&(n||(n={}),n[o]=c[o])}else n||(a||(a=[]),a.push(d,n)),n=c;else d==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,s=s?s.__html:void 0,c!=null&&s!==c&&(a=a||[]).push(d,c)):d==="children"?typeof c!="string"&&typeof c!="number"||(a=a||[]).push(d,""+c):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&(er.hasOwnProperty(d)?(c!=null&&d==="onScroll"&&W("scroll",e),a||s===c||(a=[])):(a=a||[]).push(d,c))}n&&(a=a||[]).push("style",n);var d=a;(t.updateQueue=d)&&(t.flags|=4)}};fu=function(e,t,n,r){n!==r&&(t.flags|=4)};function Dn(e,t){if(!Q)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function fe(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags&14680064,r|=l.flags&14680064,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags,r|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Qp(e,t,n){var r=t.pendingProps;switch(Pi(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return fe(t),null;case 1:return Ce(t.type)&&ol(),fe(t),null;case 3:return r=t.stateNode,Cn(),X(Ne),X(me),Ri(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Ar(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Ge!==null&&(ai(Ge),Ge=null))),Ka(e,t),fe(t),null;case 5:Ii(t);var l=Bt(pr.current);if(n=t.type,e!==null&&t.stateNode!=null)pu(e,t,n,r,l),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(b(166));return fe(t),null}if(e=Bt(nt.current),Ar(t)){r=t.stateNode,n=t.type;var a=t.memoizedProps;switch(r[et]=t,r[ur]=a,e=(t.mode&1)!==0,n){case"dialog":W("cancel",r),W("close",r);break;case"iframe":case"object":case"embed":W("load",r);break;case"video":case"audio":for(l=0;l<Bn.length;l++)W(Bn[l],r);break;case"source":W("error",r);break;case"img":case"image":case"link":W("error",r),W("load",r);break;case"details":W("toggle",r);break;case"input":co(r,a),W("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!a.multiple},W("invalid",r);break;case"textarea":po(r,a),W("invalid",r)}ja(n,a),l=null;for(var o in a)if(a.hasOwnProperty(o)){var s=a[o];o==="children"?typeof s=="string"?r.textContent!==s&&(a.suppressHydrationWarning!==!0&&Lr(r.textContent,s,e),l=["children",s]):typeof s=="number"&&r.textContent!==""+s&&(a.suppressHydrationWarning!==!0&&Lr(r.textContent,s,e),l=["children",""+s]):er.hasOwnProperty(o)&&s!=null&&o==="onScroll"&&W("scroll",r)}switch(n){case"input":Nr(r),uo(r,a,!0);break;case"textarea":Nr(r),fo(r);break;case"select":case"option":break;default:typeof a.onClick=="function"&&(r.onclick=il)}r=l,t.updateQueue=r,r!==null&&(t.flags|=4)}else{o=l.nodeType===9?l:l.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Hs(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=o.createElement(n,{is:r.is}):(e=o.createElement(n),n==="select"&&(o=e,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):e=o.createElementNS(e,n),e[et]=t,e[ur]=r,du(e,t,!1,!1),t.stateNode=e;e:{switch(o=Na(n,r),n){case"dialog":W("cancel",e),W("close",e),l=r;break;case"iframe":case"object":case"embed":W("load",e),l=r;break;case"video":case"audio":for(l=0;l<Bn.length;l++)W(Bn[l],e);l=r;break;case"source":W("error",e),l=r;break;case"img":case"image":case"link":W("error",e),W("load",e),l=r;break;case"details":W("toggle",e),l=r;break;case"input":co(e,r),l=va(e,r),W("invalid",e);break;case"option":l=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},l=Z({},r,{value:void 0}),W("invalid",e);break;case"textarea":po(e,r),l=ba(e,r),W("invalid",e);break;default:l=r}ja(n,l),s=l;for(a in s)if(s.hasOwnProperty(a)){var c=s[a];a==="style"?Bs(e,c):a==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&Vs(e,c)):a==="children"?typeof c=="string"?(n!=="textarea"||c!=="")&&tr(e,c):typeof c=="number"&&tr(e,""+c):a!=="suppressContentEditableWarning"&&a!=="suppressHydrationWarning"&&a!=="autoFocus"&&(er.hasOwnProperty(a)?c!=null&&a==="onScroll"&&W("scroll",e):c!=null&&pi(e,a,c,o))}switch(n){case"input":Nr(e),uo(e,r,!1);break;case"textarea":Nr(e),fo(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Lt(r.value));break;case"select":e.multiple=!!r.multiple,a=r.value,a!=null?gn(e,!!r.multiple,a,!1):r.defaultValue!=null&&gn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof l.onClick=="function"&&(e.onclick=il)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return fe(t),null;case 6:if(e&&t.stateNode!=null)fu(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(b(166));if(n=Bt(pr.current),Bt(nt.current),Ar(t)){if(r=t.stateNode,n=t.memoizedProps,r[et]=t,(a=r.nodeValue!==n)&&(e=Te,e!==null))switch(e.tag){case 3:Lr(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Lr(r.nodeValue,n,(e.mode&1)!==0)}a&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[et]=t,t.stateNode=r}return fe(t),null;case 13:if(X(K),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(Q&&Ee!==null&&t.mode&1&&!(t.flags&128))Mc(),jn(),t.flags|=98560,a=!1;else if(a=Ar(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(b(318));if(a=t.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(b(317));a[et]=t}else jn(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;fe(t),a=!1}else Ge!==null&&(ai(Ge),Ge=null),a=!0;if(!a)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||K.current&1?le===0&&(le=3):Xi())),t.updateQueue!==null&&(t.flags|=4),fe(t),null);case 4:return Cn(),Ka(e,t),e===null&&sr(t.stateNode.containerInfo),fe(t),null;case 10:return Mi(t.type._context),fe(t),null;case 17:return Ce(t.type)&&ol(),fe(t),null;case 19:if(X(K),a=t.memoizedState,a===null)return fe(t),null;if(r=(t.flags&128)!==0,o=a.rendering,o===null)if(r)Dn(a,!1);else{if(le!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=hl(e),o!==null){for(t.flags|=128,Dn(a,!1),r=o.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)a=n,e=r,a.flags&=14680066,o=a.alternate,o===null?(a.childLanes=0,a.lanes=e,a.child=null,a.subtreeFlags=0,a.memoizedProps=null,a.memoizedState=null,a.updateQueue=null,a.dependencies=null,a.stateNode=null):(a.childLanes=o.childLanes,a.lanes=o.lanes,a.child=o.child,a.subtreeFlags=0,a.deletions=null,a.memoizedProps=o.memoizedProps,a.memoizedState=o.memoizedState,a.updateQueue=o.updateQueue,a.type=o.type,e=o.dependencies,a.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return G(K,K.current&1|2),t.child}e=e.sibling}a.tail!==null&&te()>zn&&(t.flags|=128,r=!0,Dn(a,!1),t.lanes=4194304)}else{if(!r)if(e=hl(o),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Dn(a,!0),a.tail===null&&a.tailMode==="hidden"&&!o.alternate&&!Q)return fe(t),null}else 2*te()-a.renderingStartTime>zn&&n!==1073741824&&(t.flags|=128,r=!0,Dn(a,!1),t.lanes=4194304);a.isBackwards?(o.sibling=t.child,t.child=o):(n=a.last,n!==null?n.sibling=o:t.child=o,a.last=o)}return a.tail!==null?(t=a.tail,a.rendering=t,a.tail=t.sibling,a.renderingStartTime=te(),t.sibling=null,n=K.current,G(K,r?n&1|2:n&1),t):(fe(t),null);case 22:case 23:return Wi(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?ze&1073741824&&(fe(t),t.subtreeFlags&6&&(t.flags|=8192)):fe(t),null;case 24:return null;case 25:return null}throw Error(b(156,t.tag))}function Yp(e,t){switch(Pi(t),t.tag){case 1:return Ce(t.type)&&ol(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Cn(),X(Ne),X(me),Ri(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Ii(t),null;case 13:if(X(K),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(b(340));jn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return X(K),null;case 4:return Cn(),null;case 10:return Mi(t.type._context),null;case 22:case 23:return Wi(),null;case 24:return null;default:return null}}var Ur=!1,he=!1,Kp=typeof WeakSet=="function"?WeakSet:Set,E=null;function hn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){ee(e,t,r)}else n.current=null}function Ja(e,t,n){try{n()}catch(r){ee(e,t,r)}}var ns=!1;function Jp(e,t){if(Ia=rl,e=yc(),Ni(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var l=r.anchorOffset,a=r.focusNode;r=r.focusOffset;try{n.nodeType,a.nodeType}catch{n=null;break e}var o=0,s=-1,c=-1,d=0,m=0,g=e,f=null;t:for(;;){for(var y;g!==n||l!==0&&g.nodeType!==3||(s=o+l),g!==a||r!==0&&g.nodeType!==3||(c=o+r),g.nodeType===3&&(o+=g.nodeValue.length),(y=g.firstChild)!==null;)f=g,g=y;for(;;){if(g===e)break t;if(f===n&&++d===l&&(s=o),f===a&&++m===r&&(c=o),(y=g.nextSibling)!==null)break;g=f,f=g.parentNode}g=y}n=s===-1||c===-1?null:{start:s,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(Ra={focusedElem:e,selectionRange:n},rl=!1,E=t;E!==null;)if(t=E,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,E=e;else for(;E!==null;){t=E;try{var x=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(x!==null){var w=x.memoizedProps,L=x.memoizedState,h=t.stateNode,u=h.getSnapshotBeforeUpdate(t.elementType===t.type?w:Be(t.type,w),L);h.__reactInternalSnapshotBeforeUpdate=u}break;case 3:var p=t.stateNode.containerInfo;p.nodeType===1?p.textContent="":p.nodeType===9&&p.documentElement&&p.removeChild(p.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(b(163))}}catch(v){ee(t,t.return,v)}if(e=t.sibling,e!==null){e.return=t.return,E=e;break}E=t.return}return x=ns,ns=!1,x}function Kn(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var l=r=r.next;do{if((l.tag&e)===e){var a=l.destroy;l.destroy=void 0,a!==void 0&&Ja(t,n,a)}l=l.next}while(l!==r)}}function _l(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Za(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function hu(e){var t=e.alternate;t!==null&&(e.alternate=null,hu(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[et],delete t[ur],delete t[Fa],delete t[Ap],delete t[Ip])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function mu(e){return e.tag===5||e.tag===3||e.tag===4}function rs(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||mu(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function ei(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=il));else if(r!==4&&(e=e.child,e!==null))for(ei(e,t,n),e=e.sibling;e!==null;)ei(e,t,n),e=e.sibling}function ti(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(ti(e,t,n),e=e.sibling;e!==null;)ti(e,t,n),e=e.sibling}var oe=null,qe=!1;function yt(e,t,n){for(n=n.child;n!==null;)gu(e,t,n),n=n.sibling}function gu(e,t,n){if(tt&&typeof tt.onCommitFiberUnmount=="function")try{tt.onCommitFiberUnmount(jl,n)}catch{}switch(n.tag){case 5:he||hn(n,t);case 6:var r=oe,l=qe;oe=null,yt(e,t,n),oe=r,qe=l,oe!==null&&(qe?(e=oe,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):oe.removeChild(n.stateNode));break;case 18:oe!==null&&(qe?(e=oe,n=n.stateNode,e.nodeType===8?ra(e.parentNode,n):e.nodeType===1&&ra(e,n),ar(e)):ra(oe,n.stateNode));break;case 4:r=oe,l=qe,oe=n.stateNode.containerInfo,qe=!0,yt(e,t,n),oe=r,qe=l;break;case 0:case 11:case 14:case 15:if(!he&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){l=r=r.next;do{var a=l,o=a.destroy;a=a.tag,o!==void 0&&(a&2||a&4)&&Ja(n,t,o),l=l.next}while(l!==r)}yt(e,t,n);break;case 1:if(!he&&(hn(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(s){ee(n,t,s)}yt(e,t,n);break;case 21:yt(e,t,n);break;case 22:n.mode&1?(he=(r=he)||n.memoizedState!==null,yt(e,t,n),he=r):yt(e,t,n);break;default:yt(e,t,n)}}function ls(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Kp),t.forEach(function(r){var l=sf.bind(null,e,r);n.has(r)||(n.add(r),r.then(l,l))})}}function $e(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var l=n[r];try{var a=e,o=t,s=o;e:for(;s!==null;){switch(s.tag){case 5:oe=s.stateNode,qe=!1;break e;case 3:oe=s.stateNode.containerInfo,qe=!0;break e;case 4:oe=s.stateNode.containerInfo,qe=!0;break e}s=s.return}if(oe===null)throw Error(b(160));gu(a,o,l),oe=null,qe=!1;var c=l.alternate;c!==null&&(c.return=null),l.return=null}catch(d){ee(l,t,d)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)xu(t,e),t=t.sibling}function xu(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if($e(t,e),Ke(e),r&4){try{Kn(3,e,e.return),_l(3,e)}catch(w){ee(e,e.return,w)}try{Kn(5,e,e.return)}catch(w){ee(e,e.return,w)}}break;case 1:$e(t,e),Ke(e),r&512&&n!==null&&hn(n,n.return);break;case 5:if($e(t,e),Ke(e),r&512&&n!==null&&hn(n,n.return),e.flags&32){var l=e.stateNode;try{tr(l,"")}catch(w){ee(e,e.return,w)}}if(r&4&&(l=e.stateNode,l!=null)){var a=e.memoizedProps,o=n!==null?n.memoizedProps:a,s=e.type,c=e.updateQueue;if(e.updateQueue=null,c!==null)try{s==="input"&&a.type==="radio"&&a.name!=null&&Fs(l,a),Na(s,o);var d=Na(s,a);for(o=0;o<c.length;o+=2){var m=c[o],g=c[o+1];m==="style"?Bs(l,g):m==="dangerouslySetInnerHTML"?Vs(l,g):m==="children"?tr(l,g):pi(l,m,g,d)}switch(s){case"input":wa(l,a);break;case"textarea":Os(l,a);break;case"select":var f=l._wrapperState.wasMultiple;l._wrapperState.wasMultiple=!!a.multiple;var y=a.value;y!=null?gn(l,!!a.multiple,y,!1):f!==!!a.multiple&&(a.defaultValue!=null?gn(l,!!a.multiple,a.defaultValue,!0):gn(l,!!a.multiple,a.multiple?[]:"",!1))}l[ur]=a}catch(w){ee(e,e.return,w)}}break;case 6:if($e(t,e),Ke(e),r&4){if(e.stateNode===null)throw Error(b(162));l=e.stateNode,a=e.memoizedProps;try{l.nodeValue=a}catch(w){ee(e,e.return,w)}}break;case 3:if($e(t,e),Ke(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{ar(t.containerInfo)}catch(w){ee(e,e.return,w)}break;case 4:$e(t,e),Ke(e);break;case 13:$e(t,e),Ke(e),l=e.child,l.flags&8192&&(a=l.memoizedState!==null,l.stateNode.isHidden=a,!a||l.alternate!==null&&l.alternate.memoizedState!==null||(qi=te())),r&4&&ls(e);break;case 22:if(m=n!==null&&n.memoizedState!==null,e.mode&1?(he=(d=he)||m,$e(t,e),he=d):$e(t,e),Ke(e),r&8192){if(d=e.memoizedState!==null,(e.stateNode.isHidden=d)&&!m&&e.mode&1)for(E=e,m=e.child;m!==null;){for(g=E=m;E!==null;){switch(f=E,y=f.child,f.tag){case 0:case 11:case 14:case 15:Kn(4,f,f.return);break;case 1:hn(f,f.return);var x=f.stateNode;if(typeof x.componentWillUnmount=="function"){r=f,n=f.return;try{t=r,x.props=t.memoizedProps,x.state=t.memoizedState,x.componentWillUnmount()}catch(w){ee(r,n,w)}}break;case 5:hn(f,f.return);break;case 22:if(f.memoizedState!==null){is(g);continue}}y!==null?(y.return=f,E=y):is(g)}m=m.sibling}e:for(m=null,g=e;;){if(g.tag===5){if(m===null){m=g;try{l=g.stateNode,d?(a=l.style,typeof a.setProperty=="function"?a.setProperty("display","none","important"):a.display="none"):(s=g.stateNode,c=g.memoizedProps.style,o=c!=null&&c.hasOwnProperty("display")?c.display:null,s.style.display=$s("display",o))}catch(w){ee(e,e.return,w)}}}else if(g.tag===6){if(m===null)try{g.stateNode.nodeValue=d?"":g.memoizedProps}catch(w){ee(e,e.return,w)}}else if((g.tag!==22&&g.tag!==23||g.memoizedState===null||g===e)&&g.child!==null){g.child.return=g,g=g.child;continue}if(g===e)break e;for(;g.sibling===null;){if(g.return===null||g.return===e)break e;m===g&&(m=null),g=g.return}m===g&&(m=null),g.sibling.return=g.return,g=g.sibling}}break;case 19:$e(t,e),Ke(e),r&4&&ls(e);break;case 21:break;default:$e(t,e),Ke(e)}}function Ke(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(mu(n)){var r=n;break e}n=n.return}throw Error(b(160))}switch(r.tag){case 5:var l=r.stateNode;r.flags&32&&(tr(l,""),r.flags&=-33);var a=rs(e);ti(e,a,l);break;case 3:case 4:var o=r.stateNode.containerInfo,s=rs(e);ei(e,s,o);break;default:throw Error(b(161))}}catch(c){ee(e,e.return,c)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Zp(e,t,n){E=e,yu(e)}function yu(e,t,n){for(var r=(e.mode&1)!==0;E!==null;){var l=E,a=l.child;if(l.tag===22&&r){var o=l.memoizedState!==null||Ur;if(!o){var s=l.alternate,c=s!==null&&s.memoizedState!==null||he;s=Ur;var d=he;if(Ur=o,(he=c)&&!d)for(E=l;E!==null;)o=E,c=o.child,o.tag===22&&o.memoizedState!==null?os(l):c!==null?(c.return=o,E=c):os(l);for(;a!==null;)E=a,yu(a),a=a.sibling;E=l,Ur=s,he=d}as(e)}else l.subtreeFlags&8772&&a!==null?(a.return=l,E=a):as(e)}}function as(e){for(;E!==null;){var t=E;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:he||_l(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!he)if(n===null)r.componentDidMount();else{var l=t.elementType===t.type?n.memoizedProps:Be(t.type,n.memoizedProps);r.componentDidUpdate(l,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var a=t.updateQueue;a!==null&&$o(t,a,r);break;case 3:var o=t.updateQueue;if(o!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}$o(t,o,n)}break;case 5:var s=t.stateNode;if(n===null&&t.flags&4){n=s;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var d=t.alternate;if(d!==null){var m=d.memoizedState;if(m!==null){var g=m.dehydrated;g!==null&&ar(g)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(b(163))}he||t.flags&512&&Za(t)}catch(f){ee(t,t.return,f)}}if(t===e){E=null;break}if(n=t.sibling,n!==null){n.return=t.return,E=n;break}E=t.return}}function is(e){for(;E!==null;){var t=E;if(t===e){E=null;break}var n=t.sibling;if(n!==null){n.return=t.return,E=n;break}E=t.return}}function os(e){for(;E!==null;){var t=E;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{_l(4,t)}catch(c){ee(t,n,c)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var l=t.return;try{r.componentDidMount()}catch(c){ee(t,l,c)}}var a=t.return;try{Za(t)}catch(c){ee(t,a,c)}break;case 5:var o=t.return;try{Za(t)}catch(c){ee(t,o,c)}}}catch(c){ee(t,t.return,c)}if(t===e){E=null;break}var s=t.sibling;if(s!==null){s.return=t.return,E=s;break}E=t.return}}var ef=Math.ceil,xl=gt.ReactCurrentDispatcher,$i=gt.ReactCurrentOwner,Fe=gt.ReactCurrentBatchConfig,H=0,ie=null,ne=null,se=0,ze=0,mn=Rt(0),le=0,gr=null,Yt=0,Ll=0,Bi=0,Jn=null,Se=null,qi=0,zn=1/0,ot=null,yl=!1,ni=null,Tt=null,Dr=!1,jt=null,vl=0,Zn=0,ri=null,Qr=-1,Yr=0;function ye(){return H&6?te():Qr!==-1?Qr:Qr=te()}function Mt(e){return e.mode&1?H&2&&se!==0?se&-se:Up.transition!==null?(Yr===0&&(Yr=nc()),Yr):(e=B,e!==0||(e=window.event,e=e===void 0?16:cc(e.type)),e):1}function Xe(e,t,n,r){if(50<Zn)throw Zn=0,ri=null,Error(b(185));yr(e,n,r),(!(H&2)||e!==ie)&&(e===ie&&(!(H&2)&&(Ll|=n),le===4&&bt(e,se)),Pe(e,r),n===1&&H===0&&!(t.mode&1)&&(zn=te()+500,El&&Ut()))}function Pe(e,t){var n=e.callbackNode;Ud(e,t);var r=nl(e,e===ie?se:0);if(r===0)n!==null&&go(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&go(n),t===1)e.tag===0?Rp(ss.bind(null,e)):zc(ss.bind(null,e)),_p(function(){!(H&6)&&Ut()}),n=null;else{switch(rc(r)){case 1:n=xi;break;case 4:n=ec;break;case 16:n=tl;break;case 536870912:n=tc;break;default:n=tl}n=Cu(n,vu.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function vu(e,t){if(Qr=-1,Yr=0,H&6)throw Error(b(327));var n=e.callbackNode;if(kn()&&e.callbackNode!==n)return null;var r=nl(e,e===ie?se:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=wl(e,r);else{t=r;var l=H;H|=2;var a=ku();(ie!==e||se!==t)&&(ot=null,zn=te()+500,qt(e,t));do try{rf();break}catch(s){wu(e,s)}while(!0);Ti(),xl.current=a,H=l,ne!==null?t=0:(ie=null,se=0,t=le)}if(t!==0){if(t===2&&(l=Ta(e),l!==0&&(r=l,t=li(e,l))),t===1)throw n=gr,qt(e,0),bt(e,r),Pe(e,te()),n;if(t===6)bt(e,r);else{if(l=e.current.alternate,!(r&30)&&!tf(l)&&(t=wl(e,r),t===2&&(a=Ta(e),a!==0&&(r=a,t=li(e,a))),t===1))throw n=gr,qt(e,0),bt(e,r),Pe(e,te()),n;switch(e.finishedWork=l,e.finishedLanes=r,t){case 0:case 1:throw Error(b(345));case 2:Ht(e,Se,ot);break;case 3:if(bt(e,r),(r&130023424)===r&&(t=qi+500-te(),10<t)){if(nl(e,0)!==0)break;if(l=e.suspendedLanes,(l&r)!==r){ye(),e.pingedLanes|=e.suspendedLanes&l;break}e.timeoutHandle=Da(Ht.bind(null,e,Se,ot),t);break}Ht(e,Se,ot);break;case 4:if(bt(e,r),(r&4194240)===r)break;for(t=e.eventTimes,l=-1;0<r;){var o=31-We(r);a=1<<o,o=t[o],o>l&&(l=o),r&=~a}if(r=l,r=te()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*ef(r/1960))-r,10<r){e.timeoutHandle=Da(Ht.bind(null,e,Se,ot),r);break}Ht(e,Se,ot);break;case 5:Ht(e,Se,ot);break;default:throw Error(b(329))}}}return Pe(e,te()),e.callbackNode===n?vu.bind(null,e):null}function li(e,t){var n=Jn;return e.current.memoizedState.isDehydrated&&(qt(e,t).flags|=256),e=wl(e,t),e!==2&&(t=Se,Se=n,t!==null&&ai(t)),e}function ai(e){Se===null?Se=e:Se.push.apply(Se,e)}function tf(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var l=n[r],a=l.getSnapshot;l=l.value;try{if(!Qe(a(),l))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function bt(e,t){for(t&=~Bi,t&=~Ll,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-We(t),r=1<<n;e[n]=-1,t&=~r}}function ss(e){if(H&6)throw Error(b(327));kn();var t=nl(e,0);if(!(t&1))return Pe(e,te()),null;var n=wl(e,t);if(e.tag!==0&&n===2){var r=Ta(e);r!==0&&(t=r,n=li(e,r))}if(n===1)throw n=gr,qt(e,0),bt(e,t),Pe(e,te()),n;if(n===6)throw Error(b(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Ht(e,Se,ot),Pe(e,te()),null}function Gi(e,t){var n=H;H|=1;try{return e(t)}finally{H=n,H===0&&(zn=te()+500,El&&Ut())}}function Kt(e){jt!==null&&jt.tag===0&&!(H&6)&&kn();var t=H;H|=1;var n=Fe.transition,r=B;try{if(Fe.transition=null,B=1,e)return e()}finally{B=r,Fe.transition=n,H=t,!(H&6)&&Ut()}}function Wi(){ze=mn.current,X(mn)}function qt(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Mp(n)),ne!==null)for(n=ne.return;n!==null;){var r=n;switch(Pi(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&ol();break;case 3:Cn(),X(Ne),X(me),Ri();break;case 5:Ii(r);break;case 4:Cn();break;case 13:X(K);break;case 19:X(K);break;case 10:Mi(r.type._context);break;case 22:case 23:Wi()}n=n.return}if(ie=e,ne=e=_t(e.current,null),se=ze=t,le=0,gr=null,Bi=Ll=Yt=0,Se=Jn=null,$t!==null){for(t=0;t<$t.length;t++)if(n=$t[t],r=n.interleaved,r!==null){n.interleaved=null;var l=r.next,a=n.pending;if(a!==null){var o=a.next;a.next=l,r.next=o}n.pending=r}$t=null}return e}function wu(e,t){do{var n=ne;try{if(Ti(),Gr.current=gl,ml){for(var r=J.memoizedState;r!==null;){var l=r.queue;l!==null&&(l.pending=null),r=r.next}ml=!1}if(Qt=0,ae=re=J=null,Yn=!1,fr=0,$i.current=null,n===null||n.return===null){le=1,gr=t,ne=null;break}e:{var a=e,o=n.return,s=n,c=t;if(t=se,s.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var d=c,m=s,g=m.tag;if(!(m.mode&1)&&(g===0||g===11||g===15)){var f=m.alternate;f?(m.updateQueue=f.updateQueue,m.memoizedState=f.memoizedState,m.lanes=f.lanes):(m.updateQueue=null,m.memoizedState=null)}var y=Qo(o);if(y!==null){y.flags&=-257,Yo(y,o,s,a,t),y.mode&1&&Xo(a,d,t),t=y,c=d;var x=t.updateQueue;if(x===null){var w=new Set;w.add(c),t.updateQueue=w}else x.add(c);break e}else{if(!(t&1)){Xo(a,d,t),Xi();break e}c=Error(b(426))}}else if(Q&&s.mode&1){var L=Qo(o);if(L!==null){!(L.flags&65536)&&(L.flags|=256),Yo(L,o,s,a,t),zi(Pn(c,s));break e}}a=c=Pn(c,s),le!==4&&(le=2),Jn===null?Jn=[a]:Jn.push(a),a=o;do{switch(a.tag){case 3:a.flags|=65536,t&=-t,a.lanes|=t;var h=ru(a,c,t);Vo(a,h);break e;case 1:s=c;var u=a.type,p=a.stateNode;if(!(a.flags&128)&&(typeof u.getDerivedStateFromError=="function"||p!==null&&typeof p.componentDidCatch=="function"&&(Tt===null||!Tt.has(p)))){a.flags|=65536,t&=-t,a.lanes|=t;var v=lu(a,s,t);Vo(a,v);break e}}a=a.return}while(a!==null)}Su(n)}catch(S){t=S,ne===n&&n!==null&&(ne=n=n.return);continue}break}while(!0)}function ku(){var e=xl.current;return xl.current=gl,e===null?gl:e}function Xi(){(le===0||le===3||le===2)&&(le=4),ie===null||!(Yt&268435455)&&!(Ll&268435455)||bt(ie,se)}function wl(e,t){var n=H;H|=2;var r=ku();(ie!==e||se!==t)&&(ot=null,qt(e,t));do try{nf();break}catch(l){wu(e,l)}while(!0);if(Ti(),H=n,xl.current=r,ne!==null)throw Error(b(261));return ie=null,se=0,le}function nf(){for(;ne!==null;)bu(ne)}function rf(){for(;ne!==null&&!zd();)bu(ne)}function bu(e){var t=Nu(e.alternate,e,ze);e.memoizedProps=e.pendingProps,t===null?Su(e):ne=t,$i.current=null}function Su(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=Yp(n,t),n!==null){n.flags&=32767,ne=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{le=6,ne=null;return}}else if(n=Qp(n,t,ze),n!==null){ne=n;return}if(t=t.sibling,t!==null){ne=t;return}ne=t=e}while(t!==null);le===0&&(le=5)}function Ht(e,t,n){var r=B,l=Fe.transition;try{Fe.transition=null,B=1,lf(e,t,n,r)}finally{Fe.transition=l,B=r}return null}function lf(e,t,n,r){do kn();while(jt!==null);if(H&6)throw Error(b(327));n=e.finishedWork;var l=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(b(177));e.callbackNode=null,e.callbackPriority=0;var a=n.lanes|n.childLanes;if(Dd(e,a),e===ie&&(ne=ie=null,se=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Dr||(Dr=!0,Cu(tl,function(){return kn(),null})),a=(n.flags&15990)!==0,n.subtreeFlags&15990||a){a=Fe.transition,Fe.transition=null;var o=B;B=1;var s=H;H|=4,$i.current=null,Jp(e,n),xu(n,e),jp(Ra),rl=!!Ia,Ra=Ia=null,e.current=n,Zp(n),Ed(),H=s,B=o,Fe.transition=a}else e.current=n;if(Dr&&(Dr=!1,jt=e,vl=l),a=e.pendingLanes,a===0&&(Tt=null),_d(n.stateNode),Pe(e,te()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)l=t[n],r(l.value,{componentStack:l.stack,digest:l.digest});if(yl)throw yl=!1,e=ni,ni=null,e;return vl&1&&e.tag!==0&&kn(),a=e.pendingLanes,a&1?e===ri?Zn++:(Zn=0,ri=e):Zn=0,Ut(),null}function kn(){if(jt!==null){var e=rc(vl),t=Fe.transition,n=B;try{if(Fe.transition=null,B=16>e?16:e,jt===null)var r=!1;else{if(e=jt,jt=null,vl=0,H&6)throw Error(b(331));var l=H;for(H|=4,E=e.current;E!==null;){var a=E,o=a.child;if(E.flags&16){var s=a.deletions;if(s!==null){for(var c=0;c<s.length;c++){var d=s[c];for(E=d;E!==null;){var m=E;switch(m.tag){case 0:case 11:case 15:Kn(8,m,a)}var g=m.child;if(g!==null)g.return=m,E=g;else for(;E!==null;){m=E;var f=m.sibling,y=m.return;if(hu(m),m===d){E=null;break}if(f!==null){f.return=y,E=f;break}E=y}}}var x=a.alternate;if(x!==null){var w=x.child;if(w!==null){x.child=null;do{var L=w.sibling;w.sibling=null,w=L}while(w!==null)}}E=a}}if(a.subtreeFlags&2064&&o!==null)o.return=a,E=o;else e:for(;E!==null;){if(a=E,a.flags&2048)switch(a.tag){case 0:case 11:case 15:Kn(9,a,a.return)}var h=a.sibling;if(h!==null){h.return=a.return,E=h;break e}E=a.return}}var u=e.current;for(E=u;E!==null;){o=E;var p=o.child;if(o.subtreeFlags&2064&&p!==null)p.return=o,E=p;else e:for(o=u;E!==null;){if(s=E,s.flags&2048)try{switch(s.tag){case 0:case 11:case 15:_l(9,s)}}catch(S){ee(s,s.return,S)}if(s===o){E=null;break e}var v=s.sibling;if(v!==null){v.return=s.return,E=v;break e}E=s.return}}if(H=l,Ut(),tt&&typeof tt.onPostCommitFiberRoot=="function")try{tt.onPostCommitFiberRoot(jl,e)}catch{}r=!0}return r}finally{B=n,Fe.transition=t}}return!1}function cs(e,t,n){t=Pn(n,t),t=ru(e,t,1),e=Et(e,t,1),t=ye(),e!==null&&(yr(e,1,t),Pe(e,t))}function ee(e,t,n){if(e.tag===3)cs(e,e,n);else for(;t!==null;){if(t.tag===3){cs(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Tt===null||!Tt.has(r))){e=Pn(n,e),e=lu(t,e,1),t=Et(t,e,1),e=ye(),t!==null&&(yr(t,1,e),Pe(t,e));break}}t=t.return}}function af(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=ye(),e.pingedLanes|=e.suspendedLanes&n,ie===e&&(se&n)===n&&(le===4||le===3&&(se&130023424)===se&&500>te()-qi?qt(e,0):Bi|=n),Pe(e,t)}function ju(e,t){t===0&&(e.mode&1?(t=zr,zr<<=1,!(zr&130023424)&&(zr=4194304)):t=1);var n=ye();e=ht(e,t),e!==null&&(yr(e,t,n),Pe(e,n))}function of(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),ju(e,n)}function sf(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,l=e.memoizedState;l!==null&&(n=l.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(b(314))}r!==null&&r.delete(t),ju(e,n)}var Nu;Nu=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Ne.current)je=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return je=!1,Xp(e,t,n);je=!!(e.flags&131072)}else je=!1,Q&&t.flags&1048576&&Ec(t,ul,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Xr(e,t),e=t.pendingProps;var l=Sn(t,me.current);wn(t,n),l=Di(null,t,r,e,l,n);var a=Fi();return t.flags|=1,typeof l=="object"&&l!==null&&typeof l.render=="function"&&l.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Ce(r)?(a=!0,sl(t)):a=!1,t.memoizedState=l.state!==null&&l.state!==void 0?l.state:null,Li(t),l.updater=Ml,t.stateNode=l,l._reactInternals=t,qa(t,r,e,n),t=Xa(null,t,r,!0,a,n)):(t.tag=0,Q&&a&&Ci(t),xe(null,t,l,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Xr(e,t),e=t.pendingProps,l=r._init,r=l(r._payload),t.type=r,l=t.tag=uf(r),e=Be(r,e),l){case 0:t=Wa(null,t,r,e,n);break e;case 1:t=Zo(null,t,r,e,n);break e;case 11:t=Ko(null,t,r,e,n);break e;case 14:t=Jo(null,t,r,Be(r.type,e),n);break e}throw Error(b(306,r,""))}return t;case 0:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Be(r,l),Wa(e,t,r,l,n);case 1:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Be(r,l),Zo(e,t,r,l,n);case 3:e:{if(su(t),e===null)throw Error(b(387));r=t.pendingProps,a=t.memoizedState,l=a.element,Ic(e,t),fl(t,r,null,n);var o=t.memoizedState;if(r=o.element,a.isDehydrated)if(a={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},t.updateQueue.baseState=a,t.memoizedState=a,t.flags&256){l=Pn(Error(b(423)),t),t=es(e,t,r,n,l);break e}else if(r!==l){l=Pn(Error(b(424)),t),t=es(e,t,r,n,l);break e}else for(Ee=zt(t.stateNode.containerInfo.firstChild),Te=t,Q=!0,Ge=null,n=Lc(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(jn(),r===l){t=mt(e,t,n);break e}xe(e,t,r,n)}t=t.child}return t;case 5:return Rc(t),e===null&&Va(t),r=t.type,l=t.pendingProps,a=e!==null?e.memoizedProps:null,o=l.children,Ua(r,l)?o=null:a!==null&&Ua(r,a)&&(t.flags|=32),ou(e,t),xe(e,t,o,n),t.child;case 6:return e===null&&Va(t),null;case 13:return cu(e,t,n);case 4:return Ai(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Nn(t,null,r,n):xe(e,t,r,n),t.child;case 11:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Be(r,l),Ko(e,t,r,l,n);case 7:return xe(e,t,t.pendingProps,n),t.child;case 8:return xe(e,t,t.pendingProps.children,n),t.child;case 12:return xe(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,l=t.pendingProps,a=t.memoizedProps,o=l.value,G(dl,r._currentValue),r._currentValue=o,a!==null)if(Qe(a.value,o)){if(a.children===l.children&&!Ne.current){t=mt(e,t,n);break e}}else for(a=t.child,a!==null&&(a.return=t);a!==null;){var s=a.dependencies;if(s!==null){o=a.child;for(var c=s.firstContext;c!==null;){if(c.context===r){if(a.tag===1){c=dt(-1,n&-n),c.tag=2;var d=a.updateQueue;if(d!==null){d=d.shared;var m=d.pending;m===null?c.next=c:(c.next=m.next,m.next=c),d.pending=c}}a.lanes|=n,c=a.alternate,c!==null&&(c.lanes|=n),$a(a.return,n,t),s.lanes|=n;break}c=c.next}}else if(a.tag===10)o=a.type===t.type?null:a.child;else if(a.tag===18){if(o=a.return,o===null)throw Error(b(341));o.lanes|=n,s=o.alternate,s!==null&&(s.lanes|=n),$a(o,n,t),o=a.sibling}else o=a.child;if(o!==null)o.return=a;else for(o=a;o!==null;){if(o===t){o=null;break}if(a=o.sibling,a!==null){a.return=o.return,o=a;break}o=o.return}a=o}xe(e,t,l.children,n),t=t.child}return t;case 9:return l=t.type,r=t.pendingProps.children,wn(t,n),l=Oe(l),r=r(l),t.flags|=1,xe(e,t,r,n),t.child;case 14:return r=t.type,l=Be(r,t.pendingProps),l=Be(r.type,l),Jo(e,t,r,l,n);case 15:return au(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Be(r,l),Xr(e,t),t.tag=1,Ce(r)?(e=!0,sl(t)):e=!1,wn(t,n),nu(t,r,l),qa(t,r,l,n),Xa(null,t,r,!0,e,n);case 19:return uu(e,t,n);case 22:return iu(e,t,n)}throw Error(b(156,t.tag))};function Cu(e,t){return Zs(e,t)}function cf(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function De(e,t,n,r){return new cf(e,t,n,r)}function Qi(e){return e=e.prototype,!(!e||!e.isReactComponent)}function uf(e){if(typeof e=="function")return Qi(e)?1:0;if(e!=null){if(e=e.$$typeof,e===hi)return 11;if(e===mi)return 14}return 2}function _t(e,t){var n=e.alternate;return n===null?(n=De(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Kr(e,t,n,r,l,a){var o=2;if(r=e,typeof e=="function")Qi(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case ln:return Gt(n.children,l,a,t);case fi:o=8,l|=8;break;case ma:return e=De(12,n,t,l|2),e.elementType=ma,e.lanes=a,e;case ga:return e=De(13,n,t,l),e.elementType=ga,e.lanes=a,e;case xa:return e=De(19,n,t,l),e.elementType=xa,e.lanes=a,e;case Rs:return Al(n,l,a,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case As:o=10;break e;case Is:o=9;break e;case hi:o=11;break e;case mi:o=14;break e;case vt:o=16,r=null;break e}throw Error(b(130,e==null?e:typeof e,""))}return t=De(o,n,t,l),t.elementType=e,t.type=r,t.lanes=a,t}function Gt(e,t,n,r){return e=De(7,e,r,t),e.lanes=n,e}function Al(e,t,n,r){return e=De(22,e,r,t),e.elementType=Rs,e.lanes=n,e.stateNode={isHidden:!1},e}function da(e,t,n){return e=De(6,e,null,t),e.lanes=n,e}function pa(e,t,n){return t=De(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function df(e,t,n,r,l){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Gl(0),this.expirationTimes=Gl(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Gl(0),this.identifierPrefix=r,this.onRecoverableError=l,this.mutableSourceEagerHydrationData=null}function Yi(e,t,n,r,l,a,o,s,c){return e=new df(e,t,n,s,c),t===1?(t=1,a===!0&&(t|=8)):t=0,a=De(3,null,null,t),e.current=a,a.stateNode=e,a.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Li(a),e}function pf(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:rn,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function Pu(e){if(!e)return At;e=e._reactInternals;e:{if(Zt(e)!==e||e.tag!==1)throw Error(b(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Ce(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(b(171))}if(e.tag===1){var n=e.type;if(Ce(n))return Pc(e,n,t)}return t}function zu(e,t,n,r,l,a,o,s,c){return e=Yi(n,r,!0,e,l,a,o,s,c),e.context=Pu(null),n=e.current,r=ye(),l=Mt(n),a=dt(r,l),a.callback=t??null,Et(n,a,l),e.current.lanes=l,yr(e,l,r),Pe(e,r),e}function Il(e,t,n,r){var l=t.current,a=ye(),o=Mt(l);return n=Pu(n),t.context===null?t.context=n:t.pendingContext=n,t=dt(a,o),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=Et(l,t,o),e!==null&&(Xe(e,l,o,a),qr(e,l,o)),o}function kl(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function us(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Ki(e,t){us(e,t),(e=e.alternate)&&us(e,t)}function ff(){return null}var Eu=typeof reportError=="function"?reportError:function(e){console.error(e)};function Ji(e){this._internalRoot=e}Rl.prototype.render=Ji.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(b(409));Il(e,t,null,null)};Rl.prototype.unmount=Ji.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Kt(function(){Il(null,e,null,null)}),t[ft]=null}};function Rl(e){this._internalRoot=e}Rl.prototype.unstable_scheduleHydration=function(e){if(e){var t=ic();e={blockedOn:null,target:e,priority:t};for(var n=0;n<kt.length&&t!==0&&t<kt[n].priority;n++);kt.splice(n,0,e),n===0&&sc(e)}};function Zi(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Ul(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function ds(){}function hf(e,t,n,r,l){if(l){if(typeof r=="function"){var a=r;r=function(){var d=kl(o);a.call(d)}}var o=zu(t,r,e,0,null,!1,!1,"",ds);return e._reactRootContainer=o,e[ft]=o.current,sr(e.nodeType===8?e.parentNode:e),Kt(),o}for(;l=e.lastChild;)e.removeChild(l);if(typeof r=="function"){var s=r;r=function(){var d=kl(c);s.call(d)}}var c=Yi(e,0,!1,null,null,!1,!1,"",ds);return e._reactRootContainer=c,e[ft]=c.current,sr(e.nodeType===8?e.parentNode:e),Kt(function(){Il(t,c,n,r)}),c}function Dl(e,t,n,r,l){var a=n._reactRootContainer;if(a){var o=a;if(typeof l=="function"){var s=l;l=function(){var c=kl(o);s.call(c)}}Il(t,o,e,l)}else o=hf(n,t,e,l,r);return kl(o)}lc=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=$n(t.pendingLanes);n!==0&&(yi(t,n|1),Pe(t,te()),!(H&6)&&(zn=te()+500,Ut()))}break;case 13:Kt(function(){var r=ht(e,1);if(r!==null){var l=ye();Xe(r,e,1,l)}}),Ki(e,1)}};vi=function(e){if(e.tag===13){var t=ht(e,134217728);if(t!==null){var n=ye();Xe(t,e,134217728,n)}Ki(e,134217728)}};ac=function(e){if(e.tag===13){var t=Mt(e),n=ht(e,t);if(n!==null){var r=ye();Xe(n,e,t,r)}Ki(e,t)}};ic=function(){return B};oc=function(e,t){var n=B;try{return B=e,t()}finally{B=n}};Pa=function(e,t,n){switch(t){case"input":if(wa(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var l=zl(r);if(!l)throw Error(b(90));Ds(r),wa(r,l)}}}break;case"textarea":Os(e,n);break;case"select":t=n.value,t!=null&&gn(e,!!n.multiple,t,!1)}};Ws=Gi;Xs=Kt;var mf={usingClientEntryPoint:!1,Events:[wr,cn,zl,qs,Gs,Gi]},Fn={findFiberByHostInstance:Vt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},gf={bundleType:Fn.bundleType,version:Fn.version,rendererPackageName:Fn.rendererPackageName,rendererConfig:Fn.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:gt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Ks(e),e===null?null:e.stateNode},findFiberByHostInstance:Fn.findFiberByHostInstance||ff,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Fr=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Fr.isDisabled&&Fr.supportsFiber)try{jl=Fr.inject(gf),tt=Fr}catch{}}_e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=mf;_e.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Zi(t))throw Error(b(200));return pf(e,t,null,n)};_e.createRoot=function(e,t){if(!Zi(e))throw Error(b(299));var n=!1,r="",l=Eu;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(l=t.onRecoverableError)),t=Yi(e,1,!1,null,null,n,!1,r,l),e[ft]=t.current,sr(e.nodeType===8?e.parentNode:e),new Ji(t)};_e.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(b(188)):(e=Object.keys(e).join(","),Error(b(268,e)));return e=Ks(t),e=e===null?null:e.stateNode,e};_e.flushSync=function(e){return Kt(e)};_e.hydrate=function(e,t,n){if(!Ul(t))throw Error(b(200));return Dl(null,e,t,!0,n)};_e.hydrateRoot=function(e,t,n){if(!Zi(e))throw Error(b(405));var r=n!=null&&n.hydratedSources||null,l=!1,a="",o=Eu;if(n!=null&&(n.unstable_strictMode===!0&&(l=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),t=zu(t,null,e,1,n??null,l,!1,a,o),e[ft]=t.current,sr(e),r)for(e=0;e<r.length;e++)n=r[e],l=n._getVersion,l=l(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,l]:t.mutableSourceEagerHydrationData.push(n,l);return new Rl(t)};_e.render=function(e,t,n){if(!Ul(t))throw Error(b(200));return Dl(null,e,t,!1,n)};_e.unmountComponentAtNode=function(e){if(!Ul(e))throw Error(b(40));return e._reactRootContainer?(Kt(function(){Dl(null,null,e,!1,function(){e._reactRootContainer=null,e[ft]=null})}),!0):!1};_e.unstable_batchedUpdates=Gi;_e.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Ul(n))throw Error(b(200));if(e==null||e._reactInternals===void 0)throw Error(b(38));return Dl(e,t,n,!1,r)};_e.version="18.3.1-next-f1338f8080-20240426";function Tu(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Tu)}catch(e){console.error(e)}}Tu(),Ts.exports=_e;var xf=Ts.exports,ps=xf;fa.createRoot=ps.createRoot,fa.hydrateRoot=ps.hydrateRoot;/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yf=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Mu=(...e)=>e.filter((t,n,r)=>!!t&&r.indexOf(t)===n).join(" ");/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var vf={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wf=T.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:n=2,absoluteStrokeWidth:r,className:l="",children:a,iconNode:o,...s},c)=>T.createElement("svg",{ref:c,...vf,width:t,height:t,stroke:e,strokeWidth:r?Number(n)*24/Number(t):n,className:Mu("lucide",l),...s},[...o.map(([d,m])=>T.createElement(d,m)),...Array.isArray(a)?a:[a]]));/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=(e,t)=>{const n=T.forwardRef(({className:r,...l},a)=>T.createElement(wf,{ref:a,iconNode:t,className:Mu(`lucide-${yf(e)}`,r),...l}));return n.displayName=`${e}`,n};/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kf=I("Activity",[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _u=I("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eo=I("Award",[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lu=I("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bf=I("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sf=I("ChevronUp",[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jf=I("CircleCheckBig",[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nf=I("CirclePlus",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 12h8",key:"1wcyev"}],["path",{d:"M12 8v8",key:"napkw2"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Au=I("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Iu=I("Cloud",[["path",{d:"M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z",key:"p7xjir"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fs=I("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cf=I("Film",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M7 3v18",key:"bbkbws"}],["path",{d:"M3 7.5h4",key:"zfgn84"}],["path",{d:"M3 12h18",key:"1i2n21"}],["path",{d:"M3 16.5h4",key:"1230mu"}],["path",{d:"M17 3v18",key:"in4fa5"}],["path",{d:"M17 7.5h4",key:"myr1c1"}],["path",{d:"M17 16.5h4",key:"go4c1d"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const to=I("Flame",[["path",{d:"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",key:"96xj49"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hs=I("FolderOpen",[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",key:"usdka0"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pf=I("FolderSearch",[["path",{d:"M10.7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v4.1",key:"1bw5m7"}],["path",{d:"m21 21-1.9-1.9",key:"1g2n9r"}],["circle",{cx:"17",cy:"17",r:"3",key:"18b49y"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ue=I("Gamepad2",[["line",{x1:"6",x2:"10",y1:"11",y2:"11",key:"1gktln"}],["line",{x1:"8",x2:"8",y1:"9",y2:"13",key:"qnk9ow"}],["line",{x1:"15",x2:"15.01",y1:"12",y2:"12",key:"krot7o"}],["line",{x1:"18",x2:"18.01",y1:"10",y2:"10",key:"1lcuu1"}],["path",{d:"M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z",key:"mfqc10"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zf=I("Hourglass",[["path",{d:"M5 22h14",key:"ehvnwv"}],["path",{d:"M5 2h14",key:"pdyrp9"}],["path",{d:"M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22",key:"1d314k"}],["path",{d:"M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2",key:"1vvvr6"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ms=I("Image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ef=I("Key",[["path",{d:"m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4",key:"g0fldk"}],["path",{d:"m21 2-9.6 9.6",key:"1j0ho8"}],["circle",{cx:"7.5",cy:"15.5",r:"5.5",key:"yqb3hr"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tf=I("Keyboard",[["path",{d:"M10 8h.01",key:"1r9ogq"}],["path",{d:"M12 12h.01",key:"1mp3jc"}],["path",{d:"M14 8h.01",key:"1primd"}],["path",{d:"M16 12h.01",key:"1l6xoz"}],["path",{d:"M18 8h.01",key:"emo2bl"}],["path",{d:"M6 8h.01",key:"x9i8wu"}],["path",{d:"M7 16h10",key:"wp8him"}],["path",{d:"M8 12h.01",key:"czm47f"}],["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mf=I("Layers",[["path",{d:"m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z",key:"8b97xw"}],["path",{d:"m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65",key:"dd6zsq"}],["path",{d:"m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65",key:"ep9fru"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _f=I("Library",[["path",{d:"m16 6 4 14",key:"ji33uf"}],["path",{d:"M12 6v14",key:"1n7gus"}],["path",{d:"M8 8v12",key:"1gg7y9"}],["path",{d:"M4 4v16",key:"6qkkli"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gs=I("Link",[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",key:"1cjeqo"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",key:"19qd67"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lf=I("LockOpen",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 9.9-1",key:"1mm8w8"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Af=I("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const If=I("Minus",[["path",{d:"M5 12h14",key:"1ays0h"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ru=I("Monitor",[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rf=I("Pin",[["path",{d:"M12 17v5",key:"bb1du9"}],["path",{d:"M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",key:"1nkz8b"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fl=I("Play",[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uf=I("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Df=I("Power",[["path",{d:"M12 2v10",key:"mnfbl"}],["path",{d:"M18.4 6.6a9 9 0 1 1-12.77.04",key:"obofu9"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ff=I("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Of=I("Save",[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uu=I("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Du=I("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fu=I("ShoppingCart",[["circle",{cx:"8",cy:"21",r:"1",key:"jimo8o"}],["circle",{cx:"19",cy:"21",r:"1",key:"13723u"}],["path",{d:"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",key:"9zh506"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hf=I("SlidersVertical",[["line",{x1:"4",x2:"4",y1:"21",y2:"14",key:"1p332r"}],["line",{x1:"4",x2:"4",y1:"10",y2:"3",key:"gb41h5"}],["line",{x1:"12",x2:"12",y1:"21",y2:"12",key:"hf2csr"}],["line",{x1:"12",x2:"12",y1:"8",y2:"3",key:"1kfi7u"}],["line",{x1:"20",x2:"20",y1:"21",y2:"16",key:"1lhrwl"}],["line",{x1:"20",x2:"20",y1:"12",y2:"3",key:"16vvfq"}],["line",{x1:"2",x2:"6",y1:"14",y2:"14",key:"1uebub"}],["line",{x1:"10",x2:"14",y1:"8",y2:"8",key:"1yglbp"}],["line",{x1:"18",x2:"22",y1:"16",y2:"16",key:"1jxqpz"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ou=I("Smartphone",[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2",key:"1yt0o3"}],["path",{d:"M12 18h.01",key:"mhygvu"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vf=I("SquareCheckBig",[["path",{d:"M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.5",key:"1uzm8b"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $f=I("SquarePen",[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",key:"ohrbg2"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hu=I("Square",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const br=I("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bf=I("Tag",[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",key:"vktsd0"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor",key:"kqv944"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bl=I("Trophy",[["path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6",key:"17hqa7"}],["path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18",key:"lmptdp"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",key:"1nw9bq"}],["path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",key:"1np0yb"}],["path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z",key:"u46fv3"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qf=I("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gf=I("Volume2",[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["path",{d:"M16 9a5 5 0 0 1 0 6",key:"1q6k2b"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728",key:"ijwkga"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wf=I("VolumeX",[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["line",{x1:"22",x2:"16",y1:"9",y2:"15",key:"1ewh16"}],["line",{x1:"16",x2:"22",y1:"9",y2:"15",key:"5ykzw1"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ol=I("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);let On=null,Dt=[],be=null,Ft=!1;function nn(){return On||(On=new(window.AudioContext||window.webkitAudioContext)),On.state==="suspended"&&On.resume(),On}const N={setMuted:e=>{Ft=e,Ft&&N.stopAmbience()},getMuted:()=>Ft,playHoverTick:()=>{if(!Ft)try{const e=nn(),t=e.createOscillator(),n=e.createGain(),r=e.createBiquadFilter();t.connect(r),r.connect(n),n.connect(e.destination),t.type="triangle",t.frequency.setValueAtTime(1800,e.currentTime),t.frequency.exponentialRampToValueAtTime(300,e.currentTime+.04),r.type="lowpass",r.frequency.setValueAtTime(2e3,e.currentTime),n.gain.setValueAtTime(.015,e.currentTime),n.gain.exponentialRampToValueAtTime(.001,e.currentTime+.04),t.start(e.currentTime),t.stop(e.currentTime+.05)}catch{}},playClickPulse:()=>{if(!Ft)try{const e=nn(),t=e.createOscillator(),n=e.createOscillator(),r=e.createGain();t.connect(r),n.connect(r),r.connect(e.destination),t.type="sine",t.frequency.setValueAtTime(380,e.currentTime),t.frequency.exponentialRampToValueAtTime(120,e.currentTime+.12),n.type="triangle",n.frequency.setValueAtTime(760,e.currentTime),n.frequency.exponentialRampToValueAtTime(240,e.currentTime+.08),r.gain.setValueAtTime(.06,e.currentTime),r.gain.exponentialRampToValueAtTime(.001,e.currentTime+.12),t.start(e.currentTime),n.start(e.currentTime),t.stop(e.currentTime+.15),n.stop(e.currentTime+.15)}catch{}},playLaunchSwell:()=>{if(!Ft)try{const e=nn(),t=e.currentTime,n=e.createGain();n.connect(e.destination),n.gain.setValueAtTime(.18,t),n.gain.exponentialRampToValueAtTime(.001,t+3);const r=e.createOscillator();r.type="sine",r.frequency.setValueAtTime(55,t),r.frequency.linearRampToValueAtTime(30,t+1.2);const l=e.createGain();l.gain.setValueAtTime(.4,t),l.gain.exponentialRampToValueAtTime(.001,t+1.2),r.connect(l),l.connect(n),r.start(t),r.stop(t+1.5),[110,164.81,220,277.18].forEach((o,s)=>{const c=e.createOscillator(),d=e.createGain(),m=e.createOscillator(),g=e.createGain();g.gain.setValueAtTime(1.5,t),m.connect(g),g.connect(c.frequency),c.connect(d),d.connect(n),c.type="sawtooth",c.frequency.setValueAtTime(o,t),m.frequency.setValueAtTime(6+s,t);const f=e.createBiquadFilter();f.type="lowpass",f.frequency.setValueAtTime(120,t),f.frequency.exponentialRampToValueAtTime(1600,t+1.5),f.Q.setValueAtTime(4,t),c.disconnect(d),c.connect(f),f.connect(d),d.gain.setValueAtTime(0,t),d.gain.linearRampToValueAtTime(.12,t+.6+s*.1),d.gain.exponentialRampToValueAtTime(.001,t+2.5),m.start(t),c.start(t),m.stop(t+3),c.stop(t+3)})}catch{}},startAmbience:e=>{if(!Ft)try{const t=nn();N.stopAmbience(),be=t.createGain(),be.connect(t.destination),be.gain.setValueAtTime(.001,t.currentTime),be.gain.linearRampToValueAtTime(.05,t.currentTime+1);const n=t.currentTime;e==="synth"?[46.25,69.3,92.5].forEach((l,a)=>{const o=t.createOscillator(),s=t.createBiquadFilter();o.type="sawtooth",o.frequency.setValueAtTime(l+(Math.random()-.5)*.5,n),s.type="lowpass",s.frequency.setValueAtTime(110,n);const c=t.createOscillator(),d=t.createGain();c.type="sine",c.frequency.setValueAtTime(.15+a*.05,n),d.gain.setValueAtTime(40,n),c.connect(d),d.connect(s.frequency),o.connect(s),s.connect(be),c.start(n),o.start(n),Dt.push(o,c)}):e==="orchestra"?[36.71,55,73.42,87.31].forEach((l,a)=>{const o=t.createOscillator(),s=t.createBiquadFilter();o.type="triangle",o.frequency.setValueAtTime(l,n),s.type="lowpass",s.frequency.setValueAtTime(160,n),o.connect(s),s.connect(be),o.start(n),Dt.push(o)}):e==="guitar"?[110,164.81,246.94].forEach((l,a)=>{const o=t.createOscillator();o.type="sine",o.frequency.setValueAtTime(l,n);const s=t.createGain();s.gain.setValueAtTime(.4,n);const c=t.createOscillator(),d=t.createGain();c.type="sine",c.frequency.setValueAtTime(1+a*.5,n),d.gain.setValueAtTime(.2,n),c.connect(d),d.connect(s.gain),o.connect(s),s.connect(be),c.start(n),o.start(n),Dt.push(o,c)}):e==="ambient"?[130.81,196,261.63,329.63].forEach((l,a)=>{const o=t.createOscillator();o.type="sine",o.frequency.setValueAtTime(l,n);const s=t.createGain();s.gain.setValueAtTime(.1,n);const c=t.createOscillator(),d=t.createGain();c.type="sine",c.frequency.setValueAtTime(.05+a*.02,n),d.gain.setValueAtTime(.08,n),c.connect(d),d.connect(s.gain),o.connect(s),s.connect(be),c.start(n),o.start(n),Dt.push(o,c)}):[98,146.83,196].forEach((l,a)=>{const o=t.createOscillator();o.type="triangle",o.frequency.setValueAtTime(l,n);const s=t.createBiquadFilter();s.type="lowpass",s.frequency.setValueAtTime(300,n),o.connect(s),s.connect(be),o.start(n),Dt.push(o)})}catch{}},stopAmbience:()=>{try{be&&(be.gain.setValueAtTime(be.gain.value,nn().currentTime),be.gain.exponentialRampToValueAtTime(.001,nn().currentTime+.4)),setTimeout(()=>{Dt.forEach(e=>{try{e.stop()}catch{}}),Dt=[],be=null},500)}catch{}}};function Xf({onSearchChange:e,searchQuery:t,onOpenSettings:n,cpuUsage:r,ramUsage:l,activeView:a,onViewChange:o}){const[s,c]=T.useState("");T.useEffect(()=>{const m=()=>{const f=new Date;let y=f.getHours(),x=f.getMinutes();const w=y>=12?"PM":"AM";y=y%12,y=y||12,x=x<10?"0"+x:x,c(`${y}:${x} ${w}`)};m();const g=setInterval(m,1e3);return()=>clearInterval(g)},[]);const d=m=>{N.playClickPulse(),window.electronAPI&&(m==="minimize"&&window.electronAPI.windowMinimize(),m==="maximize"&&window.electronAPI.windowMaximize(),m==="close"&&window.electronAPI.windowClose())};return i.jsxs("header",{className:"navigation-header",children:[i.jsx("div",{className:"titlebar-draggable"}),i.jsxs("div",{className:"nav-left",children:[i.jsx("div",{className:"nexus-logo",children:"N E X U S"}),i.jsxs("div",{className:"mode-tabs",children:[i.jsxs("button",{className:`mode-tab ${a==="library"?"active":""}`,onClick:()=>{N.playClickPulse(),o("library")},children:[i.jsx(_f,{size:12}),i.jsx("span",{children:"Library"})]}),i.jsxs("button",{className:`mode-tab ${a==="favourites"?"active":""}`,onClick:()=>{N.playClickPulse(),o("favourites")},children:[i.jsx(bl,{size:12}),i.jsx("span",{children:"Favourites"})]}),i.jsxs("button",{className:`mode-tab ${a==="store"||a==="store-item"?"active":""}`,onClick:()=>{N.playClickPulse(),o("store")},children:[i.jsx(Fu,{size:12}),i.jsx("span",{children:"Store"})]})]})]}),i.jsx("div",{className:"nav-center",children:i.jsxs("div",{className:"search-wrapper",children:[i.jsx(Uu,{size:14,className:"search-icon"}),i.jsx("input",{type:"text",placeholder:"Search games, activities...",className:"search-input",value:t,onChange:m=>e(m.target.value),onFocus:N.playHoverTick})]})}),i.jsxs("div",{className:"nav-right",children:[i.jsxs("div",{className:"system-telemetry-pill",children:[i.jsxs("div",{className:"telemetry-item",children:[i.jsx("span",{className:"telemetry-label",children:"CPU"}),i.jsxs("span",{className:"telemetry-value",children:[r,"%"]})]}),i.jsx("div",{className:"telemetry-divider"}),i.jsxs("div",{className:"telemetry-item",children:[i.jsx("span",{className:"telemetry-label",children:"RAM"}),i.jsxs("span",{className:"telemetry-value",children:[l,"%"]})]})]}),i.jsx("button",{className:"nav-icon-btn",onClick:n,onMouseEnter:N.playHoverTick,title:"Launcher Settings",children:i.jsx(Du,{size:18})}),i.jsxs("div",{className:"profile-avatar-pill",onMouseEnter:N.playHoverTick,title:"User Profile",children:[i.jsx("div",{className:"avatar-icon-wrapper",children:i.jsx(qf,{size:14})}),i.jsx("span",{className:"avatar-username",children:"Player 1"})]}),i.jsx("div",{className:"live-clock",children:s}),i.jsxs("div",{className:"titlebar-controls-container",children:[i.jsx("button",{className:"titlebar-btn",onClick:()=>d("minimize"),title:"Minimize",children:i.jsx(If,{size:14})}),i.jsx("button",{className:"titlebar-btn",onClick:()=>d("maximize"),title:"Maximize/Restore",children:i.jsx(Hu,{size:10})}),i.jsx("button",{className:"titlebar-btn close-btn",onClick:()=>d("close"),title:"Close",children:i.jsx(Ol,{size:14})})]})]}),i.jsx("style",{dangerouslySetInnerHTML:{__html:`
        .navigation-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: var(--header-height);
          background: linear-gradient(180deg, rgba(10, 10, 16, 0.8) 0%, rgba(10, 10, 16, 0) 100%);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          z-index: 1000;
          pointer-events: auto;
        }

        .nav-left {
          display: flex;
          align-items: center;
          gap: 40px;
          z-index: 10000;
          -webkit-app-region: no-drag;
        }

        .nexus-logo {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 20px;
          letter-spacing: 5px;
          color: #fff;
          cursor: pointer;
          background: linear-gradient(90deg, #fff 0%, rgba(255, 255, 255, 0.7) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
        }

        .mode-tabs {
          display: flex;
          gap: 8px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 4px;
          border-radius: 30px;
        }

        .mode-tab {
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.5);
          border-radius: 20px;
          padding: 6px 16px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .mode-tab:hover {
          color: #fff;
        }

        .mode-tab.active {
          background: rgba(255, 255, 255, 0.08);
          color: var(--accent-color);
          box-shadow: 0 0 15px rgba(var(--accent-color-rgb), 0.1);
          border: 1px solid rgba(var(--accent-color-rgb), 0.15);
        }

        .nav-center {
          width: 320px;
          z-index: 10000;
          -webkit-app-region: no-drag;
        }

        .search-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 14px;
          color: rgba(255, 255, 255, 0.4);
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 20px;
          padding: 8px 16px 8px 40px;
          color: #fff;
          font-family: var(--font-sans);
          font-size: 13px;
          transition: all var(--transition-fast);
        }

        .search-input:focus {
          background: rgba(255, 255, 255, 0.06);
          border-color: var(--accent-color);
          box-shadow: 0 0 15px rgba(var(--accent-color-rgb), 0.15);
          width: 380px;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 20px;
          z-index: 10000;
          margin-right: 120px; /* Leave space for native window controls */
          -webkit-app-region: no-drag;
        }

        .system-telemetry-pill {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 4px 12px;
          font-size: 11px;
          font-family: var(--font-display);
        }

        .telemetry-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .telemetry-label {
          color: rgba(255, 255, 255, 0.4);
          font-weight: 400;
        }

        .telemetry-value {
          color: var(--accent-color);
          font-weight: 700;
        }

        .telemetry-divider {
          width: 1px;
          height: 12px;
          background: rgba(255, 255, 255, 0.1);
          margin: 0 10px;
        }

        .nav-icon-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 50%;
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .nav-icon-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          transform: translateY(-1px);
        }

        .profile-avatar-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 4px 12px 4px 4px;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .profile-avatar-pill:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .avatar-icon-wrapper {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: var(--accent-color);
          color: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--accent-glow-subtle);
        }

        .avatar-username {
          color: #fff;
          font-size: 12px;
          font-weight: 600;
        }

        .live-clock {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: #fff;
          padding-left: 10px;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.15);
        }
      `}})]})}function Qf({theme:e,speedFactor:t=1,density:n=1}){const r=T.useRef(null),l=T.useRef({x:-1e3,y:-1e3,vx:0,vy:0,lastX:0,lastY:0}),a=T.useRef({x:0,y:0,radius:0,active:!1});return T.useEffect(()=>{const o=r.current;if(!o)return;const s=o.getContext("2d");let c,d=[];const m=()=>{o.width=window.innerWidth,o.height=window.innerHeight,y()},g=()=>e==="theme-cyber"?["#ffffff","#ff007f","#8a2be2","#ff80bf"]:e==="theme-emerald"?["#ffffff","#00ff66","#00cc52","#99ffe6"]:e==="theme-gold"?["#ffffff","#e6af2e","#f3d382","#fff0d0"]:["#ffffff","#00e5ff","#00aaff","#b3f0ff"];class f{constructor(){this.x=Math.random()*o.width,this.y=Math.random()*o.height,this.size=Math.random()*2+.5,this.baseXSpeed=(Math.random()-.5)*.25*t,this.baseYSpeed=-Math.random()*.4*t-.1,this.vx=this.baseXSpeed,this.vy=this.baseYSpeed;const p=g();this.color=p[Math.floor(Math.random()*p.length)],this.alpha=Math.random()*.6+.1,this.baseAlpha=this.alpha,this.decay=Math.random()*.005+.002,this.flickerSpeed=Math.random()*.05+.01,this.flickerDir=Math.random()>.5?1:-1}update(p,v){this.x+=this.vx,this.y+=this.vy,this.y<-10&&(this.y=o.height+10,this.x=Math.random()*o.width),this.x<-10&&(this.x=o.width+10),this.x>o.width+10&&(this.x=-10),this.vx+=(this.baseXSpeed-this.vx)*.08,this.vy+=(this.baseYSpeed-this.vy)*.08;const S=this.x-p.x,P=this.y-p.y,k=Math.sqrt(S*S+P*P),C=120;if(k<C){const F=(C-k)/C,R=Math.atan2(P,S),V=Math.sqrt(p.vx*p.vx+p.vy*p.vy),ge=F*(1.2+V*.1);this.vx+=Math.cos(R)*ge*.5,this.vy+=Math.sin(R)*ge*.5,this.alpha=Math.min(.9,this.alpha+.05)}else this.alpha+=this.flickerSpeed*this.flickerDir,this.alpha>this.baseAlpha*1.4&&(this.flickerDir=-1),this.alpha<this.baseAlpha*.6&&(this.flickerDir=1),this.alpha=Math.max(.05,Math.min(.8,this.alpha));if(v.active){const F=this.x-v.x,R=this.y-v.y,V=Math.sqrt(F*F+R*R),ge=v.radius;if(V<ge&&V>ge-40){const rt=Math.atan2(R,F),Ye=6*(1-V/600);this.vx+=Math.cos(rt)*Ye,this.vy+=Math.sin(rt)*Ye,this.alpha=1}}}draw(){s.save(),s.globalAlpha=this.alpha,s.fillStyle=this.color,s.beginPath(),s.arc(this.x,this.y,this.size,0,Math.PI*2),s.shadowBlur=this.size*3,s.shadowColor=this.color,s.fill(),s.restore()}}const y=()=>{d=[];const u=Math.min(120,Math.floor(o.width*o.height/1e4)*n);for(let p=0;p<u;p++)d.push(new f)};window.addEventListener("resize",m),m();const x=u=>{const p=l.current;p.x=u.clientX,p.y=u.clientY,p.vx=p.x-p.lastX,p.vy=p.y-p.lastY,p.lastX=p.x,p.lastY=p.y,clearTimeout(p.velocityTimeout),p.velocityTimeout=setTimeout(()=>{p.vx=0,p.vy=0},50)},w=()=>{const u=l.current;u.x=-1e3,u.y=-1e3,u.vx=0,u.vy=0},L=u=>{a.current={x:u.clientX,y:u.clientY,radius:0,active:!0}};window.addEventListener("mousemove",x),window.addEventListener("mouseleave",w),window.addEventListener("click",L);const h=()=>{s.clearRect(0,0,o.width,o.height);const u=a.current;u.active&&(u.radius+=12,u.radius>800&&(u.active=!1)),d.forEach(p=>{p.update(l.current,u),p.draw()}),c=requestAnimationFrame(h)};return h(),()=>{window.removeEventListener("resize",m),window.removeEventListener("mousemove",x),window.removeEventListener("mouseleave",w),window.removeEventListener("click",L),cancelAnimationFrame(c)}},[e,t,n]),i.jsx("canvas",{ref:r,style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:11}})}function Yf({games:e,selectedGame:t,onSelectGame:n,onLaunchGame:r,runningGameId:l}){const a=T.useRef(null),o=s=>{N.playClickPulse(),n(s)};return i.jsxs("div",{className:"horizontal-library-shelf",ref:a,children:[i.jsxs("div",{className:"shelf-title-row",children:[i.jsx("h2",{className:"shelf-title",children:"My Library"}),i.jsxs("span",{className:"library-count",children:[e.length," games available"]})]}),i.jsx("div",{className:"library-grid-horizontal",children:e.map(s=>{const c=(t==null?void 0:t.id)===s.id,d=l===s.id;return i.jsx(Kf,{game:s,isSelected:c,isRunning:d,onClick:()=>o(s),onLaunch:()=>r(s)},s.id)})}),i.jsx("style",{dangerouslySetInnerHTML:{__html:`
        .horizontal-library-shelf {
          margin-top: auto;
          padding-bottom: 20px;
          z-index: 10;
          position: relative;
        }

        .shelf-title-row {
          display: flex;
          align-items: baseline;
          gap: 15px;
          margin-bottom: 20px;
          padding-left: 10px;
        }

        .shelf-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 16px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.9);
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
        }

        .library-count {
          font-size: 11px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.35);
          letter-spacing: 0.5px;
        }

        .library-grid-horizontal {
          display: flex;
          gap: 26px;
          overflow-x: auto;
          padding: 15px 10px 30px 10px;
          scroll-behavior: smooth;
        }

        /* Hide Scrollbar but allow scrolling */
        .library-grid-horizontal::-webkit-scrollbar {
          height: 4px;
        }
        .library-grid-horizontal::-webkit-scrollbar-track {
          background: transparent;
        }
        .library-grid-horizontal::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        .library-grid-horizontal:hover::-webkit-scrollbar-thumb {
          background: rgba(var(--accent-color-rgb), 0.25);
        }
      `}})]})}function Kf({game:e,isSelected:t,isRunning:n,onClick:r,onLaunch:l}){const a=T.useRef(null),[o,s]=T.useState({x:0,y:0,scale:1}),c=f=>{const y=a.current;if(!y)return;const x=y.getBoundingClientRect(),w=f.clientX-x.left,L=f.clientY-x.top,h=x.width,u=x.height,p=15,v=(L-u/2)/(u/2)*p,S=-((w-h/2)/(h/2))*p;s({x:v,y:S,scale:1.06})},d=()=>{s({x:0,y:0,scale:1})},m=f=>{f.stopPropagation(),l()},g=Math.round(e.playtime/3600*10)/10;return i.jsxs("div",{ref:a,className:`game-card-wrapper ${t?"selected":""} ${n?"running":""}`,onClick:r,onMouseMove:c,onMouseLeave:d,onMouseEnter:N.playHoverTick,style:{transform:`rotateX(${o.x}deg) rotateY(${o.y}deg) scale(${o.scale})`,transition:o.scale===1?"transform 0.5s ease":"transform 0.08s ease"},children:[i.jsxs("div",{className:"card-face",children:[i.jsxs("div",{className:"card-image-container",children:[i.jsx("img",{src:e.coverUrl,alt:e.title,className:"card-image",loading:"lazy"}),n&&i.jsxs("div",{className:"running-overlay-indicator",children:[i.jsx("span",{className:"running-dot-pulse"}),i.jsx("span",{className:"running-text",children:"Running"})]}),i.jsx("div",{className:"card-hover-actions",children:i.jsx("button",{className:`quick-play-button ${n?"running-btn":""}`,onClick:m,title:n?"Game Running":"Launch Game",children:i.jsx(Fl,{fill:n?"transparent":"currentColor",size:16})})}),e.isFavorite&&i.jsx("div",{className:"favorite-indicator-badge",children:i.jsx(br,{size:10,fill:"currentColor"})})]}),i.jsxs("div",{className:"card-details-panel",children:[i.jsx("div",{className:"card-title",children:e.title}),i.jsxs("div",{className:"card-meta-metrics",children:[i.jsxs("div",{className:"metric-item",title:"Total Playtime",children:[i.jsx(to,{size:12,className:"metric-icon"}),i.jsxs("span",{children:[g,"h"]})]}),e.progress>0&&i.jsxs("div",{className:"metric-item",title:"Completion Progress",children:[i.jsx(eo,{size:12,className:"metric-icon"}),i.jsxs("span",{children:[e.progress,"%"]})]})]})]})]}),i.jsx("style",{dangerouslySetInnerHTML:{__html:`
        .game-card-wrapper {
          flex: 0 0 205px;
          height: 300px;
          position: relative;
          cursor: pointer;
          transform-style: preserve-3d;
          perspective: 600px;
          z-index: 5;
        }

        .card-face {
          width: 100%;
          height: 100%;
          background: rgba(20, 20, 30, 0.45);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: all var(--transition-normal);
          box-shadow: 0 5px 15px rgba(0,0,0,0.4);
        }

        .game-card-wrapper:hover .card-face {
          border-color: rgba(255, 255, 255, 0.15);
          box-shadow: 0 10px 30px rgba(0,0,0,0.6);
        }

        .game-card-wrapper.selected .card-face {
          border-color: var(--accent-color);
          box-shadow: var(--accent-glow), 0 10px 30px rgba(var(--accent-color-rgb), 0.2);
          background: rgba(var(--accent-color-rgb), 0.04);
        }

        .game-card-wrapper.running .card-face {
          border-color: rgba(239, 68, 68, 0.6);
          box-shadow: 0 0 20px rgba(239, 68, 68, 0.4);
        }

        .card-image-container {
          width: 100%;
          height: 215px;
          position: relative;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.2);
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s ease;
        }

        .game-card-wrapper:hover .card-image {
          transform: scale(1.05);
        }

        .running-overlay-indicator {
          position: absolute;
          top: 10px;
          left: 10px;
          background: rgba(239, 68, 68, 0.85);
          backdrop-filter: blur(5px);
          padding: 4px 8px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-display);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: #fff;
          z-index: 10;
        }

        .running-dot-pulse {
          width: 6px;
          height: 6px;
          background: #fff;
          border-radius: 50%;
          animation: running-pulse-glow 1.2s infinite ease-in-out;
        }

        @keyframes running-pulse-glow {
          0% { transform: scale(0.8); opacity: 0.5; }
          50% { transform: scale(1.4); opacity: 1; }
          100% { transform: scale(0.8); opacity: 0.5; }
        }

        .favorite-indicator-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(230, 175, 46, 0.95);
          color: #07070a;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          box-shadow: 0 0 10px rgba(230, 175, 46, 0.4);
        }

        .card-hover-actions {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(3px);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity var(--transition-fast);
          z-index: 9;
        }

        .game-card-wrapper:hover .card-hover-actions {
          opacity: 1;
        }

        .quick-play-button {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--accent-color);
          border: none;
          color: #07070a;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
          box-shadow: var(--accent-glow);
          transform: translateY(10px);
        }

        .game-card-wrapper:hover .quick-play-button {
          transform: translateY(0);
        }

        .quick-play-button:hover {
          background: #fff;
          color: #000;
          transform: scale(1.1);
          box-shadow: 0 0 20px #fff;
        }

        .quick-play-button.running-btn {
          background: #ef4444;
          color: #fff;
          box-shadow: 0 0 15px #ef4444;
        }
        .quick-play-button.running-btn:hover {
          background: #f87171;
        }

        .card-details-panel {
          padding: 12px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          background: rgba(10, 10, 15, 0.4);
        }

        .card-title {
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: 14px;
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 6px;
        }

        .card-meta-metrics {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .metric-item {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 10px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.45);
        }

        .metric-icon {
          color: var(--accent-color);
        }
      `}})]})}function Jf({game:e,onLaunch:t,onToggleFavorite:n,onEditMetadata:r,onPinSidebar:l,isRunning:a,isSidebarPinned:o}){var f;if(!e)return null;const s=()=>{N.playClickPulse(),t(e)},c=()=>{N.playClickPulse(),n(e.id)},d=()=>{N.playClickPulse(),r(e)},m=()=>{N.playClickPulse(),l()},g=y=>{const x=Math.floor(y/3600),w=Math.floor(y%3600/60);return x===0?`${w} mins`:`${x}h ${w}m`};return i.jsxs("div",{className:"game-main-banner-container",children:[i.jsxs("div",{className:"backdrop-image-mask",children:[i.jsx("img",{src:e.bannerUrl,alt:e.title,className:"banner-backdrop-img backdrop-parallax"},e.id),i.jsx("div",{className:"backdrop-overlay-vignette"})]}),i.jsxs("div",{className:"banner-content-box",children:[i.jsx("div",{className:"genre-badges-row",children:(f=e.tags)==null?void 0:f.map((y,x)=>i.jsx("span",{className:"genre-badge",children:y},x))}),e.logoUrl?i.jsx("img",{src:e.logoUrl,alt:e.title,className:"banner-logo-img"}):i.jsx("h1",{className:"banner-game-title",children:e.title}),i.jsxs("div",{className:"developer-meta",children:[i.jsx("span",{children:e.developer}),i.jsx("span",{className:"dot-divider"}),i.jsxs("span",{children:["Rating: ",i.jsxs("strong",{children:[e.rating,"★"]})]})]}),i.jsx("p",{className:"game-banner-description",children:e.description}),i.jsxs("div",{className:"telemetry-stats-glass-row",children:[i.jsxs("div",{className:"stat-glass-card",children:[i.jsx(Au,{size:16,className:"stat-icon"}),i.jsxs("div",{className:"stat-info",children:[i.jsx("span",{className:"stat-label",children:"Playtime"}),i.jsx("span",{className:"stat-value",children:g(e.playtime)})]})]}),i.jsxs("div",{className:"stat-glass-card",children:[i.jsx(to,{size:16,className:"stat-icon"}),i.jsxs("div",{className:"stat-info",children:[i.jsx("span",{className:"stat-label",children:"Last Session"}),i.jsx("span",{className:"stat-value",children:e.lastPlayed})]})]}),e.progress>0&&i.jsxs("div",{className:"stat-glass-card",children:[i.jsx(eo,{size:16,className:"stat-icon"}),i.jsxs("div",{className:"stat-info",children:[i.jsx("span",{className:"stat-label",children:"Progress"}),i.jsxs("span",{className:"stat-value",children:[e.progress,"% (",e.timeToComplete," left)"]})]})]})]}),i.jsxs("div",{className:"banner-actions-row",children:[i.jsxs("button",{className:`glow-btn glow-btn-primary play-game-btn ${a?"running-pulse":""}`,onClick:s,onMouseEnter:N.playHoverTick,children:[i.jsx(Fl,{fill:a?"transparent":"currentColor",size:18}),i.jsx("span",{children:a?"Running...":"Play Game"})]}),i.jsxs("button",{className:`glow-btn action-pill-btn ${o?"pinned-active":""}`,onClick:m,onMouseEnter:N.playHoverTick,title:"Pin Achievements to Side",children:[i.jsx(Rf,{size:16}),i.jsx("span",{children:o?"Pinned":"Pin to Side"})]}),i.jsxs("button",{className:"glow-btn action-pill-btn",onClick:d,onMouseEnter:N.playHoverTick,title:"Edit Game Metadata",children:[i.jsx($f,{size:16}),i.jsx("span",{children:"Metadata"})]}),i.jsx("button",{className:`glow-btn action-pill-btn fav-pill-btn ${e.isFavorite?"active-favorite":""}`,onClick:c,onMouseEnter:N.playHoverTick,title:"Add to Favorites",children:i.jsx(br,{size:16,fill:e.isFavorite?"currentColor":"transparent"})})]})]}),i.jsx("style",{dangerouslySetInnerHTML:{__html:`
        .game-main-banner-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: calc(100% - 310px);
          display: flex;
          align-items: center;
          padding: 0 60px;
          pointer-events: none;
        }

        .backdrop-image-mask {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: calc(100% + 180px);
          overflow: hidden;
          z-index: 1;
          pointer-events: none;
        }

        .banner-backdrop-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transform: scale(1.05);
          filter: brightness(0.6) contrast(1.05);
          transition: opacity 1.2s ease-in-out;
          animation: fade-in-backdrop 1.2s forwards ease-in-out, slow-pan 45s infinite ease-in-out;
        }

        @keyframes fade-in-backdrop {
          0% { opacity: 0; transform: scale(1.05); }
          100% { opacity: 0.65; transform: scale(1.0); }
        }

        .backdrop-image-mask::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 320px;
          background: linear-gradient(
            to bottom,
            rgba(7, 7, 10, 0) 0%,
            rgba(7, 7, 10, 0.22) 38%,
            rgba(7, 7, 10, 0.68) 72%,
            #07070a 100%
          );
          z-index: 3;
          pointer-events: none;
        }

        .backdrop-overlay-vignette {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(ellipse at 50% 38%, transparent 12%, rgba(7, 7, 10, 0.18) 48%, rgba(7, 7, 10, 0.82) 100%),
                      linear-gradient(90deg, #07070a 0%, rgba(7, 7, 10, 0.16) 15%, rgba(7, 7, 10, 0.05) 50%, rgba(7, 7, 10, 0.38) 84%, #07070a 100%),
                      linear-gradient(0deg, rgba(7, 7, 10, 0.64) 0%, rgba(7, 7, 10, 0.16) 50%, rgba(7, 7, 10, 0.4) 100%);
          z-index: 2;
        }

        .banner-content-box {
          position: relative;
          z-index: 10;
          max-width: 650px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          pointer-events: auto;
          margin-top: 40px;
        }

        .genre-badges-row {
          display: flex;
          gap: 8px;
          margin-bottom: 16px;
        }

        .genre-badge {
          background: rgba(var(--accent-color-rgb), 0.12);
          border: 1px solid rgba(var(--accent-color-rgb), 0.25);
          color: var(--accent-color);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 10px;
          font-family: var(--font-display);
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .banner-logo-img {
          max-height: 80px;
          width: auto;
          max-width: 100%;
          object-fit: contain;
          margin-bottom: 16px;
          filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.8));
        }

        .banner-game-title {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 44px;
          letter-spacing: 2px;
          line-height: 1.1;
          color: #fff;
          margin-bottom: 12px;
          text-shadow: 0 0 30px rgba(0, 0, 0, 0.8), 0 2px 10px rgba(0, 0, 0, 0.5);
          text-transform: uppercase;
        }

        .developer-meta {
          display: flex;
          align-items: center;
          font-size: 12px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 20px;
          letter-spacing: 0.5px;
        }

        .dot-divider {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          margin: 0 10px;
        }

        .game-banner-description {
          font-size: 14px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 25px;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
        }

        .telemetry-stats-glass-row {
          display: flex;
          gap: 15px;
          margin-bottom: 30px;
          width: 100%;
        }

        .stat-glass-card {
          flex: 1;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          gap: 12px;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
        }

        .stat-icon {
          color: var(--accent-color);
        }

        .stat-info {
          display: flex;
          flex-direction: column;
        }

        .stat-label {
          font-size: 10px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.35);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .stat-value {
          font-size: 12px;
          font-weight: 700;
          color: #fff;
          margin-top: 2px;
        }

        .banner-actions-row {
          display: flex;
          gap: 12px;
          width: 100%;
        }

        .play-game-btn {
          padding: 12px 30px;
          font-size: 14px;
        }

        .play-game-btn.running-pulse {
          background: #ef4444 !important;
          border-color: #ef4444 !important;
          color: #fff !important;
          animation: running-pulse-glow 1.5s infinite ease-in-out;
        }

        .action-pill-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          width: auto;
          min-width: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.7);
        }

        .action-pill-btn:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .pinned-active {
          color: var(--accent-color) !important;
          border-color: rgba(var(--accent-color-rgb), 0.3) !important;
          background: rgba(var(--accent-color-rgb), 0.08) !important;
          box-shadow: 0 0 10px rgba(var(--accent-color-rgb), 0.2);
        }

        .fav-pill-btn.active-favorite {
          color: #e6af2e !important;
          border-color: rgba(230, 175, 46, 0.3) !important;
          background: rgba(230, 175, 46, 0.08) !important;
          box-shadow: 0 0 10px rgba(230, 175, 46, 0.2);
        }
      `}})]})}function Zf({isOpen:e,onToggle:t,onOpenSettings:n,onManualImport:r,onImportScannedGames:l,onBatchFetchArtwork:a,cpuUsage:o,ramUsage:s,games:c}){const[d,m]=T.useState(""),[g,f]=T.useState(!1),[y,x]=T.useState([]),[w,L]=T.useState({}),h=()=>{N.playClickPulse(),t()},u=async()=>{if(N.playClickPulse(),window.electronAPI){const k=await window.electronAPI.selectDirectory();k&&m(k)}else m("C:\\Program Files (x86)\\Steam\\steamapps\\common")},p=async()=>{if(d){N.playClickPulse(),f(!0),x([]);try{if(window.electronAPI){const k=await window.electronAPI.scanExecutables(d);setTimeout(()=>{x(k),f(!1);const C={};k.forEach(F=>{C[F.path]=!0}),L(C)},1500)}else setTimeout(()=>{const k=[{name:"eldenring",path:"C:\\SteamLibrary\\steamapps\\common\\Elden Ring\\Game\\eldenring.exe"},{name:"hades",path:"C:\\SteamLibrary\\steamapps\\common\\Hades\\hades.exe"},{name:"minecraft",path:"C:\\Games\\Minecraft\\minecraft.exe"}];x(k),f(!1);const C={};k.forEach(F=>{C[F.path]=!0}),L(C)},1800)}catch{f(!1)}}},v=k=>{N.playHoverTick(),L(C=>({...C,[k]:!C[k]}))},S=()=>{N.playClickPulse();const k=y.filter(C=>w[C.path]);k.length!==0&&(l(k),x([]),m(""),t())},P=async()=>{if(N.playClickPulse(),window.electronAPI){const k=await window.electronAPI.powerOff();k&&!k.success&&alert(`Windows shutdown failed: ${k.error}`)}else alert("Windows Shut Down (Mock)")};return i.jsxs("div",{className:`control-center-drawer-container ${e?"drawer-open":""}`,children:[i.jsxs("div",{className:"drawer-trigger-handle",onClick:h,onMouseEnter:N.playHoverTick,children:[e?i.jsx(bf,{size:14}):i.jsx(Sf,{size:14}),i.jsx("span",{className:"trigger-text",children:e?"Close CC":"Control Center"})]}),i.jsxs("div",{className:"drawer-panel-grid glass-panel-heavy",children:[i.jsxs("div",{className:"cc-section cc-telemetry-panel",children:[i.jsx("h3",{className:"cc-section-title",children:"System Status"}),i.jsxs("div",{className:"telemetry-bar-item",children:[i.jsxs("div",{className:"bar-labels",children:[i.jsx("span",{children:"CPU Core Load"}),i.jsxs("span",{children:[o,"%"]})]}),i.jsx("div",{className:"bar-container",children:i.jsx("div",{className:"bar-fill",style:{width:`${o}%`}})})]}),i.jsxs("div",{className:"telemetry-bar-item",children:[i.jsxs("div",{className:"bar-labels",children:[i.jsx("span",{children:"RAM Allocation"}),i.jsxs("span",{children:[s,"%"]})]}),i.jsx("div",{className:"bar-container",children:i.jsx("div",{className:"bar-fill",style:{width:`${s}%`}})})]}),i.jsxs("div",{className:"quick-action-buttons-grid",children:[i.jsxs("button",{className:"quick-btn-icon-label",onClick:r,onMouseEnter:N.playHoverTick,children:[i.jsx(Nf,{size:18}),i.jsx("span",{children:"Import EXE"})]}),i.jsxs("button",{className:"quick-btn-icon-label artwork-btn",onClick:a,onMouseEnter:N.playHoverTick,title:"Fetch artwork for all games via SteamGridDB",children:[i.jsx(Iu,{size:18}),i.jsx("span",{children:"Fetch Art"})]}),i.jsxs("button",{className:"quick-btn-icon-label",onClick:n,onMouseEnter:N.playHoverTick,children:[i.jsx(Du,{size:18}),i.jsx("span",{children:"Settings"})]}),i.jsxs("button",{className:"quick-btn-icon-label shutdown-btn",onClick:P,onMouseEnter:N.playHoverTick,children:[i.jsx(Df,{size:18}),i.jsx("span",{children:"Power Off"})]})]})]}),i.jsxs("div",{className:"cc-section cc-scanner-panel",children:[i.jsx("h3",{className:"cc-section-title",children:"Batch Library Scanner"}),i.jsxs("div",{className:"scanner-input-row",children:[i.jsx("button",{className:"glow-btn browser-directory-btn",onClick:u,onMouseEnter:N.playHoverTick,children:"Browse Path"}),i.jsx("div",{className:"directory-path-display",title:d||"No directory selected",children:d||"Click Browse to select scanning directory..."}),i.jsx("button",{className:"glow-btn glow-btn-primary scan-action-btn",onClick:p,disabled:!d||g,onMouseEnter:N.playHoverTick,children:g?"Scanning...":"Scan Directory"})]}),i.jsxs("div",{className:"scanner-output-box",children:[g&&i.jsxs("div",{className:"scanning-radar-state",children:[i.jsx("div",{className:"radar-sweep-effect"}),i.jsx("span",{className:"radar-text",children:"Analyzing executables, scanning depth 3..."})]}),!g&&y.length===0&&i.jsxs("div",{className:"scanner-empty-state",children:[i.jsx(Pf,{size:24,className:"empty-icon"}),i.jsx("span",{children:"Select a path and click Scan to match executables against PS5 cover database"})]}),!g&&y.length>0&&i.jsxs("div",{className:"scanner-results-list",children:[i.jsxs("div",{className:"results-header",children:[i.jsxs("span",{children:["Found ",y.length," matched games:"]}),i.jsxs("button",{className:"import-submit-badge-btn",onClick:S,children:["Import Selected (",Object.values(w).filter(Boolean).length,")"]})]}),i.jsx("div",{className:"results-grid",children:y.map((k,C)=>{const F=w[k.path];return i.jsxs("div",{className:`result-item-row ${F?"row-active":""}`,onClick:()=>v(k.path),children:[F?i.jsx(Vf,{size:14,className:"checkbox-icon"}):i.jsx(Hu,{size:14,className:"checkbox-icon"}),i.jsxs("div",{className:"result-info",children:[i.jsx("span",{className:"result-name",children:k.name}),i.jsx("span",{className:"result-path",children:k.path})]})]},C)})})]})]})]})]}),i.jsx("style",{dangerouslySetInnerHTML:{__html:`
        .control-center-drawer-container {
          position: fixed;
          bottom: -300px;
          left: 0;
          width: 100%;
          z-index: 1001;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: bottom 0.6s var(--ease-ps5);
          pointer-events: none;
        }

        .control-center-drawer-container.drawer-open {
          bottom: 0;
        }

        .drawer-trigger-handle {
          background: rgba(10, 10, 16, 0.7);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-bottom: none;
          border-radius: 20px 20px 0 0;
          padding: 6px 30px;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          pointer-events: auto;
          box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.25);
          transition: all var(--transition-fast);
        }

        .drawer-trigger-handle:hover {
          background: rgba(var(--accent-color-rgb), 0.15);
          border-color: rgba(var(--accent-color-rgb), 0.3);
          box-shadow: 0 -4px 15px rgba(var(--accent-color-rgb), 0.15);
        }

        .trigger-text {
          font-family: var(--font-display);
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.8);
        }

        .drawer-panel-grid {
          width: calc(100% - 80px);
          max-width: 1360px;
          height: 280px;
          margin-bottom: 20px;
          border-radius: 20px;
          display: grid;
          grid-template-columns: 350px 1fr;
          padding: 24px;
          gap: 24px;
          pointer-events: auto;
          box-shadow: 0 10px 50px rgba(0, 0, 0, 0.8);
        }

        .cc-section {
          display: flex;
          flex-direction: column;
        }

        .cc-section-title {
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: rgba(255, 255, 255, 0.4);
          margin-bottom: 16px;
        }

        .cc-telemetry-panel {
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          padding-right: 24px;
        }

        .telemetry-bar-item {
          margin-bottom: 14px;
        }

        .bar-labels {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 6px;
        }

        .bar-container {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 4px;
          overflow: hidden;
        }

        .bar-fill {
          height: 100%;
          background: var(--accent-color);
          box-shadow: var(--accent-glow-subtle);
          border-radius: 4px;
          transition: width 0.5s ease-out;
        }

        .quick-action-buttons-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-top: auto;
        }

        .quick-btn-icon-label {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 12px 6px;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          gap: 6px;
          transition: all var(--transition-fast);
        }

        .quick-btn-icon-label:hover {
          background: rgba(var(--accent-color-rgb), 0.1);
          border-color: rgba(var(--accent-color-rgb), 0.25);
          color: var(--accent-color);
          transform: translateY(-2px);
        }

        .quick-btn-icon-label span {
          font-size: 9px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .shutdown-btn:hover {
          background: rgba(239, 68, 68, 0.15) !important;
          border-color: rgba(239, 68, 68, 0.4) !important;
          color: #ef4444 !important;
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.2);
        }

        .artwork-btn:hover {
          background: rgba(99, 102, 241, 0.15) !important;
          border-color: rgba(99, 102, 241, 0.4) !important;
          color: #818cf8 !important;
          box-shadow: 0 0 10px rgba(99, 102, 241, 0.2);
        }

        .cc-scanner-panel {
          min-width: 0; /* Prevents overflow */
        }

        .scanner-input-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .browser-directory-btn {
          flex-shrink: 0;
          font-size: 11px;
          padding: 8px 16px;
        }

        .directory-path-display {
          flex: 1;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          padding: 8px 12px;
          font-family: var(--font-sans);
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .scan-action-btn {
          flex-shrink: 0;
          font-size: 11px;
          padding: 8px 20px;
        }

        .scanner-output-box {
          flex: 1;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 12px;
          position: relative;
          overflow: hidden;
          min-height: 0; /* Grid containment */
        }

        .scanning-radar-state {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .radar-text {
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          color: var(--accent-color);
          text-shadow: var(--accent-glow-subtle);
        }

        .scanner-empty-state {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: rgba(255, 255, 255, 0.3);
          font-size: 12px;
          padding: 0 40px;
          text-align: center;
        }

        .empty-icon {
          color: rgba(255, 255, 255, 0.15);
        }

        .scanner-results-list {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 12px;
        }

        .results-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 11px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 10px;
          padding-bottom: 6px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .import-submit-badge-btn {
          background: var(--accent-color);
          border: none;
          color: #07070a;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 700;
          font-family: var(--font-display);
          cursor: pointer;
          box-shadow: var(--accent-glow-subtle);
          transition: all var(--transition-fast);
        }

        .import-submit-badge-btn:hover {
          background: #fff;
          color: #000;
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
        }

        .results-grid {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .result-item-row {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 6px;
          padding: 6px 12px;
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .result-item-row:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(255, 255, 255, 0.08);
        }

        .result-item-row.row-active {
          background: rgba(var(--accent-color-rgb), 0.03);
          border-color: rgba(var(--accent-color-rgb), 0.15);
        }

        .checkbox-icon {
          color: rgba(255, 255, 255, 0.3);
          flex-shrink: 0;
        }

        .row-active .checkbox-icon {
          color: var(--accent-color);
        }

        .result-info {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .result-name {
          font-size: 12px;
          font-weight: 600;
          color: #fff;
        }

        .result-path {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.3);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}})]})}function e0({game:e,onClose:t,isRunning:n,sessionTime:r,cpuUsage:l,ramUsage:a}){if(!e)return null;const o=()=>{N.playClickPulse(),t()},c=(m=>({cyberpunk:[{id:1,title:"The Star",desc:"Complete Cyberpunk main storyline.",progress:80,completed:!1},{id:2,title:"Breathtaking",desc:"Collect all items once belonging to Johnny Silverhand.",progress:100,completed:!0},{id:3,title:"Ten out of Ten",desc:"Reach the max level in any skill tree.",progress:40,completed:!1}],eldenring:[{id:1,title:"Elden Lord",desc:"Achieve the Elden Lord ending in Lands Between.",progress:90,completed:!1},{id:2,title:"Shardbearer Godrick",desc:"Defeat Shardbearer Godrick in Stormveil.",progress:100,completed:!0},{id:3,title:"Legendary Armaments",desc:"Acquire all nine legendary weapons.",progress:75,completed:!1}],hades:[{id:1,title:"Family Reunion",desc:"Welcome all Olympic gods to the House of Hades.",progress:50,completed:!1},{id:2,title:"Champion of Elysium",desc:"Clear Elysium chamber with extreme measures.",progress:100,completed:!0},{id:3,title:"Skelly's Last Lament",desc:"Unlock Skelly's final reward skeleton statue.",progress:10,completed:!1}],portal2:[{id:1,title:"Lunacy",desc:"Place a portal on the moon.",progress:100,completed:!0},{id:2,title:"Professor Portal",desc:"Complete calibration course in co-op mode.",progress:100,completed:!0},{id:3,title:"GHOSTRUST",desc:"Complete Chamber 04 in under 2 minutes.",progress:30,completed:!1}],witcher3:[{id:1,title:"Gwent Master",desc:"Defeat Tybalt and win the Passiflora tournament.",progress:30,completed:!1},{id:2,title:"Lilac and Gooseberries",desc:"Find Yennefer of Vengerberg in White Orchard.",progress:100,completed:!0},{id:3,title:"Passed the Trial",desc:"Complete game on Death March difficulty.",progress:15,completed:!1}]})[m]||[{id:1,title:"First Venture",desc:"Launch and run the game for the first time.",progress:100,completed:!0},{id:2,title:"Enthusiast",desc:"Track over 5 hours of total session gameplay.",progress:0,completed:!1},{id:3,title:"Completionist",desc:"Unlock all sub-system achievements.",progress:0,completed:!1}])(e.id),d=m=>{const g=Math.floor(m/3600),f=Math.floor(m%3600/60),y=m%60,x=w=>String(w).padStart(2,"0");return`${x(g)}:${x(f)}:${x(y)}`};return i.jsxs("div",{className:"pip-sidebar-container glass-panel-heavy",children:[i.jsxs("div",{className:"pip-header",children:[i.jsxs("div",{className:"pip-title-badge",children:[i.jsx(kf,{size:14,className:"pip-badge-icon"}),i.jsx("span",{children:"Activity Snapped"})]}),i.jsx("button",{className:"pip-close-btn",onClick:o,onMouseEnter:N.playHoverTick,children:i.jsx(Ol,{size:14})})]}),i.jsxs("div",{className:"pip-game-hero",children:[i.jsx("img",{src:e.coverUrl,alt:e.title,className:"pip-game-cover"}),i.jsxs("div",{className:"pip-game-info",children:[i.jsx("div",{className:"pip-game-title",children:e.title}),i.jsx("div",{className:"pip-game-dev",children:e.developer})]})]}),n?i.jsxs("div",{className:"pip-widget active-session-widget",children:[i.jsxs("div",{className:"widget-header",children:[i.jsx("span",{className:"session-dot"}),i.jsx("span",{className:"session-label",children:"Active Session Ticking"})]}),i.jsx("div",{className:"session-timer-display",children:d(r)}),i.jsxs("div",{className:"session-telemetry-metrics",children:[i.jsxs("div",{className:"session-metric",children:[i.jsx("span",{className:"met-lbl",children:"CPU Usage"}),i.jsxs("span",{className:"met-val",children:[Math.round(l*1.2),"%"]})]}),i.jsxs("div",{className:"session-metric",children:[i.jsx("span",{className:"met-lbl",children:"Mem Load"}),i.jsxs("span",{className:"met-val",children:[Math.round(a*1.05),"%"]})]})]})]}):i.jsxs("div",{className:"pip-widget session-idle-widget",children:[i.jsx(zf,{size:18,className:"idle-icon"}),i.jsx("span",{children:"Launcher Idle. Press Play to start tracking playtime."})]}),i.jsxs("div",{className:"pip-widget achievements-checklist-widget",children:[i.jsxs("h4",{className:"widget-title",children:[i.jsx(bl,{size:14,className:"widget-title-icon"}),i.jsx("span",{children:"Trophy Milestones"})]}),i.jsx("div",{className:"achievements-checklist-grid",children:c.map(m=>i.jsxs("div",{className:`achievement-check-row ${m.completed?"completed":""}`,children:[i.jsx("div",{className:"check-box-icon-wrapper",children:m.completed?i.jsx(jf,{size:16,className:"checked-icon"}):i.jsx("div",{className:"unchecked-circle"})}),i.jsxs("div",{className:"achievement-check-details",children:[i.jsx("div",{className:"ach-check-title",children:m.title}),i.jsx("div",{className:"ach-check-desc",children:m.desc}),!m.completed&&m.progress>0&&i.jsxs("div",{className:"ach-mini-progress-bar",children:[i.jsx("div",{className:"ach-mini-progress-track",children:i.jsx("div",{className:"ach-mini-progress-fill",style:{width:`${m.progress}%`}})}),i.jsxs("span",{className:"ach-mini-progress-text",children:[m.progress,"%"]})]})]})]},m.id))})]}),i.jsx("style",{dangerouslySetInnerHTML:{__html:`
        .pip-sidebar-container {
          position: fixed;
          top: 20px;
          right: 20px;
          width: 310px;
          height: calc(100vh - 40px);
          z-index: 999;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          padding: 20px;
          box-shadow: -10px 0 40px rgba(0, 0, 0, 0.7);
          pointer-events: auto;
          animation: slide-in-pip 0.5s var(--ease-ps5) forwards;
        }

        @keyframes slide-in-pip {
          0% { transform: translateX(330px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }

        .pip-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .pip-title-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(var(--accent-color-rgb), 0.12);
          border: 1px solid rgba(var(--accent-color-rgb), 0.25);
          color: var(--accent-color);
          border-radius: 20px;
          padding: 4px 12px;
          font-family: var(--font-display);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .pip-badge-icon {
          animation: pulse-active 1.5s infinite ease-in-out;
        }

        .pip-close-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .pip-close-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }

        .pip-game-hero {
          display: flex;
          align-items: center;
          gap: 14px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          margin-bottom: 16px;
        }

        .pip-game-cover {
          width: 44px;
          height: 56px;
          object-fit: cover;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }

        .pip-game-info {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .pip-game-title {
          font-size: 13px;
          font-weight: 700;
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .pip-game-dev {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.4);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-top: 2px;
        }

        .pip-widget {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 12px;
          padding: 14px;
          margin-bottom: 16px;
        }

        .active-session-widget {
          border-color: rgba(239, 68, 68, 0.25);
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.03) 0%, rgba(10, 10, 15, 0.2) 100%);
          box-shadow: 0 4px 20px rgba(239, 68, 68, 0.05);
        }

        .widget-header {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .session-dot {
          width: 6px;
          height: 6px;
          background: #ef4444;
          border-radius: 50%;
          animation: running-pulse-glow 1.2s infinite ease-in-out;
        }

        .session-label {
          font-family: var(--font-display);
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #ef4444;
        }

        .session-timer-display {
          font-family: var(--font-display);
          font-size: 26px;
          font-weight: 900;
          letter-spacing: 1.5px;
          color: #fff;
          margin: 10px 0;
          text-align: center;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
        }

        .session-telemetry-metrics {
          display: flex;
          gap: 10px;
          border-top: 1px solid rgba(255, 255, 255, 0.03);
          padding-top: 8px;
        }

        .session-metric {
          flex: 1;
          display: flex;
          justify-content: space-between;
          font-size: 10px;
        }

        .met-lbl {
          color: rgba(255, 255, 255, 0.35);
        }

        .met-val {
          color: var(--accent-color);
          font-weight: 700;
        }

        .session-idle-widget {
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(255, 255, 255, 0.4);
          font-size: 11px;
          line-height: 1.4;
          background: rgba(255, 255, 255, 0.01);
        }

        .idle-icon {
          color: rgba(255, 255, 255, 0.25);
          flex-shrink: 0;
        }

        .achievements-checklist-widget {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 0; /* Containment scroll */
        }

        .widget-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-display);
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: rgba(255, 255, 255, 0.4);
          margin-bottom: 12px;
        }

        .widget-title-icon {
          color: #e6af2e;
        }

        .achievements-checklist-grid {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .achievement-check-row {
          display: flex;
          gap: 12px;
          padding: 8px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          transition: all var(--transition-fast);
        }

        .achievement-check-row.completed {
          background: rgba(230, 175, 46, 0.02);
          border-color: rgba(230, 175, 46, 0.1);
        }

        .check-box-icon-wrapper {
          flex-shrink: 0;
          margin-top: 2px;
        }

        .checked-icon {
          color: #e6af2e;
        }

        .unchecked-circle {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 1.5px solid rgba(255, 255, 255, 0.2);
        }

        .achievement-check-details {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .ach-check-title {
          font-size: 11px;
          font-weight: 700;
          color: #fff;
        }

        .completed .ach-check-title {
          color: #e6af2e;
          text-decoration: line-through;
          opacity: 0.8;
        }

        .ach-check-desc {
          font-size: 9px;
          color: rgba(255, 255, 255, 0.35);
          margin-top: 2px;
          line-height: 1.3;
        }

        .ach-mini-progress-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 6px;
        }

        .ach-mini-progress-track {
          flex: 1;
          height: 3px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 2px;
          position: relative;
          overflow: hidden;
        }

        .ach-mini-progress-fill {
          height: 100%;
          background: var(--accent-color);
          border-radius: 2px;
        }

        .ach-mini-progress-text {
          font-size: 8px;
          font-weight: 700;
          color: var(--accent-color);
        }
      `}})]})}function t0({game:e,onSave:t,onClose:n}){var M;if(!e)return null;const[r,l]=T.useState(e.title),[a,o]=T.useState(e.developer),[s,c]=T.useState(e.genre),[d,m]=T.useState(e.rating),[g,f]=T.useState(e.releaseDate),[y,x]=T.useState(e.progress),[w,L]=T.useState(Math.round(e.playtime/3600*10)/10),[h,u]=T.useState(e.description),[p,v]=T.useState(e.coverUrl),[S,P]=T.useState(e.bannerUrl),[k,C]=T.useState(e.logoUrl||""),[F,R]=T.useState(e.iconUrl||""),[V,ge]=T.useState(((M=e.tags)==null?void 0:M.join(", "))||""),[ke,rt]=T.useState(e.exePath),[Ye,xt]=T.useState(e.title),[Ae,z]=T.useState(null),[A,U]=T.useState(!1),[q,Y]=T.useState(null),[lt,ue]=T.useState(null),at=()=>{N.playClickPulse(),n()},Ve=j=>{j.preventDefault(),N.playClickPulse();const D={...e,title:r,developer:a,genre:s,rating:parseFloat(d)||4,releaseDate:g,progress:parseInt(y)||0,playtime:Math.round(parseFloat(w)*3600)||0,description:h,coverUrl:p,bannerUrl:S,logoUrl:k||null,iconUrl:F||null,exePath:ke,tags:V.split(",").map($=>$.trim()).filter(Boolean)};t(D)},it=async()=>{if(Ye.trim()){N.playClickPulse(),U(!0),ue(null);try{if(window.electronAPI){const j=await window.electronAPI.searchSteamGridDB(Ye.trim());j.error?(ue(j.error),z(null)):z(j)}else ue("Electron API not available")}catch(j){ue(j.message)}U(!1)}},_=async j=>{N.playClickPulse(),Y(j.id);try{if(window.electronAPI){const D=await window.electronAPI.fetchArtwork(j.id,e.id,e.title);D.error?ue(D.error):(D.grid&&v(D.grid),D.hero&&P(D.hero),D.logo&&C(D.logo),D.icon&&R(D.icon))}}catch(D){ue(D.message)}Y(null)};return i.jsxs("div",{className:"meta-editor-overlay flex-center",children:[i.jsxs("div",{className:"meta-editor-modal glass-panel-heavy",children:[i.jsxs("div",{className:"editor-header",children:[i.jsx("h2",{className:"editor-title",children:"Metadata Suite"}),i.jsx("button",{className:"editor-close-btn",onClick:at,onMouseEnter:N.playHoverTick,children:i.jsx(Ol,{size:16})})]}),i.jsxs("form",{className:"editor-form-scrollable",onSubmit:Ve,children:[i.jsxs("div",{className:"editor-grid",children:[i.jsxs("div",{className:"editor-column",children:[i.jsxs("div",{className:"form-group",children:[i.jsx("label",{className:"form-label",children:"Game Title"}),i.jsx("input",{type:"text",className:"glass-input editor-input",value:r,onChange:j=>l(j.target.value),required:!0})]}),i.jsxs("div",{className:"form-group-row",children:[i.jsxs("div",{className:"form-group flex-1",children:[i.jsx("label",{className:"form-label",children:"Developer"}),i.jsx("input",{type:"text",className:"glass-input editor-input",value:a,onChange:j=>o(j.target.value),required:!0})]}),i.jsxs("div",{className:"form-group flex-1",children:[i.jsx("label",{className:"form-label",children:"Genre"}),i.jsx("input",{type:"text",className:"glass-input editor-input",value:s,onChange:j=>c(j.target.value)})]})]}),i.jsxs("div",{className:"form-group-row",children:[i.jsxs("div",{className:"form-group flex-1",children:[i.jsx("label",{className:"form-label",children:"Rating (0-5)"}),i.jsx("input",{type:"number",step:"0.1",min:"0",max:"5",className:"glass-input editor-input",value:d,onChange:j=>m(j.target.value)})]}),i.jsxs("div",{className:"form-group flex-1",children:[i.jsx("label",{className:"form-label",children:"Release Date"}),i.jsx("input",{type:"date",className:"glass-input editor-input",value:g,onChange:j=>f(j.target.value)})]})]}),i.jsxs("div",{className:"form-group-row",children:[i.jsxs("div",{className:"form-group flex-1",children:[i.jsx("label",{className:"form-label",children:"Playtime (Hours)"}),i.jsx("input",{type:"number",step:"0.1",min:"0",className:"glass-input editor-input",value:w,onChange:j=>L(j.target.value)})]}),i.jsxs("div",{className:"form-group flex-1",children:[i.jsx("label",{className:"form-label",children:"Progress (%)"}),i.jsx("input",{type:"number",min:"0",max:"100",className:"glass-input editor-input",value:y,onChange:j=>x(j.target.value)})]})]}),i.jsxs("div",{className:"form-group",children:[i.jsx("label",{className:"form-label",children:"Description Summary"}),i.jsx("textarea",{rows:"3",className:"glass-input editor-textarea",value:h,onChange:j=>u(j.target.value)})]})]}),i.jsxs("div",{className:"editor-column",children:[i.jsxs("div",{className:"form-group",children:[i.jsxs("label",{className:"form-label flex-center-start",children:[i.jsx(ms,{size:13,className:"label-icon"}),i.jsx("span",{children:"Cover Art URL (Vertical)"})]}),i.jsx("input",{type:"text",className:"glass-input editor-input",value:p,onChange:j=>v(j.target.value)})]}),i.jsxs("div",{className:"form-group",children:[i.jsxs("label",{className:"form-label flex-center-start",children:[i.jsx(Cf,{size:13,className:"label-icon"}),i.jsx("span",{children:"Landscape Banner URL"})]}),i.jsx("input",{type:"text",className:"glass-input editor-input",value:S,onChange:j=>P(j.target.value)})]}),i.jsxs("div",{className:"form-group",children:[i.jsxs("label",{className:"form-label flex-center-start",children:[i.jsx(ms,{size:13,className:"label-icon"}),i.jsx("span",{children:"Logo URL"})]}),i.jsx("input",{type:"text",className:"glass-input editor-input",value:k,onChange:j=>C(j.target.value)})]}),i.jsx("div",{className:"form-group-row",children:i.jsxs("div",{className:"form-group flex-1",children:[i.jsxs("label",{className:"form-label flex-center-start",children:[i.jsx(Bf,{size:13,className:"label-icon"}),i.jsx("span",{children:"Tags (comma separated)"})]}),i.jsx("input",{type:"text",className:"glass-input editor-input",placeholder:"e.g. Sci-Fi, Co-op, Ray Tracing",value:V,onChange:j=>ge(j.target.value)})]})}),i.jsxs("div",{className:"form-group",children:[i.jsxs("label",{className:"form-label flex-center-start",children:[i.jsx(Tf,{size:13,className:"label-icon"}),i.jsx("span",{children:"Executable Binary Path (.exe)"})]}),i.jsx("input",{type:"text",className:"glass-input editor-input exe-path-input",value:ke,onChange:j=>rt(j.target.value),required:!0})]}),i.jsxs("div",{className:"artwork-fetch-section",children:[i.jsxs("label",{className:"form-label flex-center-start",children:[i.jsx(Iu,{size:13,className:"label-icon"}),i.jsx("span",{children:"SteamGridDB Artwork"})]}),i.jsxs("div",{className:"sgdb-search-row",children:[i.jsx("input",{type:"text",className:"glass-input sgdb-search-input",value:Ye,onChange:j=>xt(j.target.value),placeholder:"Search game on SteamGridDB...",onKeyDown:j=>j.key==="Enter"&&it()}),i.jsx("button",{type:"button",className:"glow-btn sgdb-search-btn",onClick:it,disabled:A,onMouseEnter:N.playHoverTick,children:A?"...":i.jsx(Uu,{size:13})})]}),lt&&i.jsx("div",{className:"sgdb-error",children:lt}),Ae&&Ae.length>0&&i.jsx("div",{className:"sgdb-results",children:Ae.slice(0,4).map(j=>{var D;return i.jsxs("div",{className:"sgdb-result-row",children:[i.jsxs("div",{className:"sgdb-result-info",children:[i.jsx("span",{className:"sgdb-result-name",children:j.name}),j.release_date&&i.jsxs("span",{className:"sgdb-result-year",children:["(",(D=j.release_date)==null?void 0:D.slice(0,4),")"]})]}),i.jsxs("button",{type:"button",className:"glow-btn sgdb-apply-btn",onClick:()=>_(j),disabled:q===j.id,onMouseEnter:N.playHoverTick,children:[q===j.id?i.jsx(fs,{size:11}):i.jsx(fs,{size:11}),i.jsx("span",{children:q===j.id?"Fetching...":"Fetch All"})]})]},j.id)})}),Ae&&Ae.length===0&&!A&&i.jsx("div",{className:"sgdb-no-results",children:"No results found"}),!Ae&&!A&&i.jsx("div",{className:"sgdb-hint",children:"Fetch cover art, banners, logos, and icons from SteamGridDB"})]}),i.jsxs("div",{className:"preview-aspects-row",children:[i.jsx("div",{className:"aspect-ratio-preview vert-aspect",title:"Cover",children:p?i.jsx("img",{src:p,alt:"Cover Preview"}):i.jsx("span",{children:"Cover"})}),i.jsx("div",{className:"aspect-ratio-preview horiz-aspect",title:"Banner",children:S?i.jsx("img",{src:S,alt:"Banner Preview"}):i.jsx("span",{children:"Banner"})}),i.jsx("div",{className:"aspect-ratio-preview vert-aspect",title:"Logo",children:k?i.jsx("img",{src:k,alt:"Logo Preview",style:{objectFit:"contain"}}):i.jsx("span",{children:"Logo"})})]})]})]}),i.jsxs("div",{className:"editor-footer-row",children:[i.jsx("button",{type:"button",className:"glow-btn",onClick:at,onMouseEnter:N.playHoverTick,children:"Cancel"}),i.jsxs("button",{type:"submit",className:"glow-btn glow-btn-primary",onMouseEnter:N.playHoverTick,children:[i.jsx(Of,{size:14}),i.jsx("span",{children:"Apply Changes"})]})]})]})]}),i.jsx("style",{dangerouslySetInnerHTML:{__html:`
        .meta-editor-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 10000;
          pointer-events: auto;
        }

        .meta-editor-modal {
          width: 950px;
          max-width: 90%;
          max-height: 85vh;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: scale-up-editor 0.4s var(--ease-ps5) forwards;
        }

        @keyframes scale-up-editor {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1.0); opacity: 1; }
        }

        .editor-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .editor-title {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #fff;
          text-shadow: 0 0 10px rgba(255,255,255,0.1);
        }

        .editor-close-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .editor-close-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }

        .editor-form-scrollable {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
          display: flex;
          flex-direction: column;
        }

        .editor-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 24px;
        }

        .editor-column {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group-row {
          display: flex;
          gap: 12px;
        }

        .flex-1 {
          flex: 1;
        }

        .form-label {
          font-size: 11px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.45);
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .label-icon {
          color: var(--accent-color);
          margin-right: 6px;
        }

        .flex-center-start {
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }

        .editor-input {
          font-size: 13px;
          padding: 10px 14px;
        }

        .editor-textarea {
          font-size: 13px;
          line-height: 1.5;
          resize: none;
        }

        .exe-path-input {
          font-family: monospace;
          font-size: 11px;
          border-color: rgba(var(--accent-color-rgb), 0.25);
        }

        .artwork-fetch-section {
          background: rgba(var(--accent-color-rgb), 0.02);
          border: 1px solid rgba(var(--accent-color-rgb), 0.08);
          border-radius: 10px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .sgdb-search-row {
          display: flex;
          gap: 6px;
        }

        .sgdb-search-input {
          flex: 1;
          font-size: 12px;
          padding: 8px 10px;
        }

        .sgdb-search-btn {
          padding: 6px 10px;
          flex-shrink: 0;
        }

        .sgdb-error {
          font-size: 10px;
          color: #ef4444;
          padding: 4px 0;
        }

        .sgdb-results {
          display: flex;
          flex-direction: column;
          gap: 6px;
          max-height: 160px;
          overflow-y: auto;
        }

        .sgdb-result-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 6px;
          padding: 6px 10px;
          gap: 8px;
        }

        .sgdb-result-info {
          display: flex;
          align-items: center;
          gap: 6px;
          min-width: 0;
          flex: 1;
        }

        .sgdb-result-name {
          font-size: 12px;
          font-weight: 600;
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .sgdb-result-year {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.35);
          flex-shrink: 0;
        }

        .sgdb-apply-btn {
          font-size: 10px;
          padding: 4px 10px;
          flex-shrink: 0;
          gap: 4px;
        }

        .sgdb-no-results, .sgdb-hint {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.25);
          text-align: center;
          padding: 8px 0;
        }

        .preview-aspects-row {
          display: flex;
          gap: 12px;
          margin-top: 4px;
        }

        .aspect-ratio-preview {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 9px;
          color: rgba(255, 255, 255, 0.2);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .vert-aspect {
          width: 70px;
          height: 90px;
        }

        .horiz-aspect {
          flex: 1;
          height: 90px;
        }

        .aspect-ratio-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .editor-footer-row {
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 20px;
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: auto;
        }
      `}})]})}function n0({settings:e,onUpdateSettings:t,onClose:n,onResetDatabase:r,gamesCount:l}){const[a,o]=T.useState(""),[s,c]=T.useState("loading"),[d,m]=T.useState(!1);T.useEffect(()=>{window.electronAPI&&window.electronAPI.getApiKey().then(u=>{o(u.key),c(u.isCustom?"custom":"builtin")}).catch(()=>c("builtin"))},[]);const g=()=>{N.playClickPulse(),n()},f=u=>{N.playClickPulse(),t({...e,theme:u})},y=()=>{const u=!e.isMuted;N.playClickPulse(),N.setMuted(u),t({...e,isMuted:u})},x=(u,p)=>{t({...e,[u]:p})},w=()=>{N.playClickPulse(),confirm("Are you sure you want to reset the Nexus database? This will clear scanned paths, restore default catalog games, and reset playtimes.")&&(r(),alert("Database reset completed successfully!"),n())},L=async()=>{N.playClickPulse(),window.electronAPI&&(await window.electronAPI.saveApiKey(a),m(!0),c("custom"),setTimeout(()=>m(!1),2e3))},h=async()=>{if(N.playClickPulse(),window.electronAPI){const u=await window.electronAPI.getApiKey();o(u.key),c("builtin"),await window.electronAPI.saveApiKey("")}};return i.jsxs("div",{className:"settings-overlay flex-center",children:[i.jsxs("div",{className:"settings-modal glass-panel-heavy",children:[i.jsxs("div",{className:"settings-header",children:[i.jsxs("div",{className:"settings-title-group",children:[i.jsx(Mf,{size:16,className:"title-icon"}),i.jsx("h2",{className:"settings-title",children:"Nexus Customization Suite"})]}),i.jsx("button",{className:"settings-close-btn",onClick:g,onMouseEnter:N.playHoverTick,children:i.jsx(Ol,{size:16})})]}),i.jsxs("div",{className:"settings-body-scrollable",children:[i.jsxs("div",{className:"settings-section",children:[i.jsx("h3",{className:"section-label-heading",children:"PS5 Console Telemetry Themes"}),i.jsx("p",{className:"section-description",children:"Select your launcher theme profiles. Changes primary glowing vectors, canvas dust tones, and telemetry backdrops."}),i.jsxs("div",{className:"themes-grid-row",children:[i.jsxs("button",{className:`theme-pill-btn theme-aether-pill ${e.theme==="theme-aether"?"active":""}`,onClick:()=>f("theme-aether"),onMouseEnter:N.playHoverTick,children:[i.jsx("span",{className:"color-dot blue-dot"}),i.jsxs("div",{className:"theme-pill-details",children:[i.jsx("span",{className:"theme-pill-name",children:"Aether Core"}),i.jsx("span",{className:"theme-pill-desc",children:"Cyan and deep space teal"})]})]}),i.jsxs("button",{className:`theme-pill-btn theme-cyber-pill ${e.theme==="theme-cyber"?"active":""}`,onClick:()=>f("theme-cyber"),onMouseEnter:N.playHoverTick,children:[i.jsx("span",{className:"color-dot pink-dot"}),i.jsxs("div",{className:"theme-pill-details",children:[i.jsx("span",{className:"theme-pill-name",children:"Cyber Glitch"}),i.jsx("span",{className:"theme-pill-desc",children:"Hot pink and high-contrast violet"})]})]}),i.jsxs("button",{className:`theme-pill-btn theme-emerald-pill ${e.theme==="theme-emerald"?"active":""}`,onClick:()=>f("theme-emerald"),onMouseEnter:N.playHoverTick,children:[i.jsx("span",{className:"color-dot green-dot"}),i.jsxs("div",{className:"theme-pill-details",children:[i.jsx("span",{className:"theme-pill-name",children:"Emerald Matrix"}),i.jsx("span",{className:"theme-pill-desc",children:"Electric green and dark matrix web"})]})]}),i.jsxs("button",{className:`theme-pill-btn theme-gold-pill ${e.theme==="theme-gold"?"active":""}`,onClick:()=>f("theme-gold"),onMouseEnter:N.playHoverTick,children:[i.jsx("span",{className:"color-dot gold-dot"}),i.jsxs("div",{className:"theme-pill-details",children:[i.jsx("span",{className:"theme-pill-name",children:"Imperial Gold"}),i.jsx("span",{className:"theme-pill-desc",children:"Obsidian black and Warm liquid gold"})]})]})]})]}),i.jsxs("div",{className:"settings-section",children:[i.jsx("h3",{className:"section-label-heading",children:"Acoustic System Settings"}),i.jsx("p",{className:"section-description",children:"Toggle synthesized haptics, click ticks, game-specific ambient drones, and orchestral intro swells."}),i.jsxs("div",{className:"audio-toggle-card",onClick:y,children:[i.jsxs("div",{className:"audio-card-left",children:[e.isMuted?i.jsx(Wf,{size:20,className:"mute-status-icon muted"}):i.jsx(Gf,{size:20,className:"mute-status-icon active-volume"}),i.jsxs("div",{className:"audio-card-info",children:[i.jsx("span",{className:"audio-card-title",children:"Console Synthesized Sounds"}),i.jsx("span",{className:"audio-card-desc",children:e.isMuted?"All UI ticks, clicks, and game drone swells are currently muted.":"UI interactive acoustic sweeps and ambient chord backdrops are active."})]})]}),i.jsx("div",{className:"audio-card-right",children:i.jsx("div",{className:`checkbox-toggle-switch ${e.isMuted?"sw-muted":"sw-active"}`,children:i.jsx("div",{className:"switch-knob"})})})]})]}),i.jsxs("div",{className:"settings-section",children:[i.jsxs("h3",{className:"section-label-heading flex-center-start",children:[i.jsx(Ef,{size:14,className:"heading-icon"}),i.jsx("span",{children:"SteamGridDB API Configuration"})]}),i.jsx("p",{className:"section-description",children:s==="builtin"?"Using built-in SteamGridDB API key. You can override it with your own key for higher rate limits.":"Using your custom SteamGridDB API key."}),i.jsxs("div",{className:"api-key-card",children:[i.jsxs("div",{className:"api-key-input-row",children:[i.jsx("div",{className:"api-key-status-icon",children:s==="custom"?i.jsx(Af,{size:14}):i.jsx(Lf,{size:14})}),i.jsx("input",{type:"text",className:"glass-input api-key-input",value:a,onChange:u=>o(u.target.value),placeholder:"Enter your SteamGridDB API key..."})]}),i.jsxs("div",{className:"api-key-actions",children:[i.jsx("span",{className:"api-key-status-text",children:d?"Saved!":s==="custom"?"Custom key active":"Built-in key active"}),i.jsxs("div",{className:"api-key-buttons",children:[i.jsx("button",{className:"glow-btn api-key-btn",onClick:h,onMouseEnter:N.playHoverTick,children:"Reset to Default"}),i.jsx("button",{className:"glow-btn glow-btn-primary api-key-btn",onClick:L,onMouseEnter:N.playHoverTick,children:"Save Key"})]})]})]})]}),i.jsxs("div",{className:"settings-section",children:[i.jsxs("h3",{className:"section-label-heading flex-center-start",children:[i.jsx(Hf,{size:14,className:"heading-icon"}),i.jsx("span",{children:"Glassmorphism & Stardust Tuning"})]}),i.jsxs("div",{className:"sliders-form-grid",children:[i.jsxs("div",{className:"slider-input-group",children:[i.jsxs("div",{className:"slider-labels",children:[i.jsx("span",{children:"Glassmorphism Backdrop Blur"}),i.jsxs("span",{children:[e.glassBlur,"px"]})]}),i.jsx("input",{type:"range",min:"5",max:"40",className:"settings-slider-bar",value:e.glassBlur,onChange:u=>x("glassBlur",parseInt(u.target.value))})]}),i.jsxs("div",{className:"slider-input-group",children:[i.jsxs("div",{className:"slider-labels",children:[i.jsx("span",{children:"Glass Panel Transparency"}),i.jsxs("span",{children:[Math.round(e.glassOpacity*100),"%"]})]}),i.jsx("input",{type:"range",min:"10",max:"90",className:"settings-slider-bar",value:e.glassOpacity*100,onChange:u=>x("glassOpacity",parseFloat(u.target.value)/100)})]}),i.jsxs("div",{className:"slider-input-group",children:[i.jsxs("div",{className:"slider-labels",children:[i.jsx("span",{children:"Stardust Ambient Particle Density"}),i.jsxs("span",{children:[e.particleDensity,"x"]})]}),i.jsx("input",{type:"range",min:"0.5",max:"2.0",step:"0.1",className:"settings-slider-bar",value:e.particleDensity,onChange:u=>x("particleDensity",parseFloat(u.target.value))})]}),i.jsxs("div",{className:"slider-input-group",children:[i.jsxs("div",{className:"slider-labels",children:[i.jsx("span",{children:"Stardust Velocity Float Speed"}),i.jsxs("span",{children:[e.particleSpeed,"x"]})]}),i.jsx("input",{type:"range",min:"0.5",max:"3.0",step:"0.1",className:"settings-slider-bar",value:e.particleSpeed,onChange:u=>x("particleSpeed",parseFloat(u.target.value))})]})]})]}),i.jsxs("div",{className:"settings-section reset-system-sec",children:[i.jsx("h3",{className:"section-label-heading red-heading",children:"Maintenance & Cache"}),i.jsxs("div",{className:"maintenance-card",children:[i.jsxs("div",{className:"m-left",children:[i.jsx("span",{className:"m-title",children:"Re-index database catalog"}),i.jsxs("span",{className:"m-desc",children:["Currently managing ",i.jsxs("strong",{children:[l," library indices"]}),". Resetting clears custom cover edits and logs."]})]}),i.jsxs("button",{className:"glow-btn reset-db-btn",onClick:w,onMouseEnter:N.playHoverTick,children:[i.jsx(Ff,{size:12}),i.jsx("span",{children:"Reset Database"})]})]})]})]}),i.jsx("div",{className:"settings-footer flex-center-end",children:i.jsx("button",{className:"glow-btn glow-btn-primary",onClick:g,onMouseEnter:N.playHoverTick,children:"Save & Exit Config"})})]}),i.jsx("style",{dangerouslySetInnerHTML:{__html:`
        .settings-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 10000;
          pointer-events: auto;
        }

        .settings-modal {
          width: 800px;
          max-width: 90%;
          max-height: 85vh;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: scale-up-editor 0.4s var(--ease-ps5) forwards;
        }

        .settings-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .settings-title-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .title-icon {
          color: var(--accent-color);
        }

        .settings-title {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #fff;
        }

        .settings-close-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .settings-close-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }

        .settings-body-scrollable {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .settings-section {
          display: flex;
          flex-direction: column;
        }

        .section-label-heading {
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #fff;
          margin-bottom: 6px;
        }

        .heading-icon {
          color: var(--accent-color);
          margin-right: 8px;
        }

        .flex-center-start {
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }

        .section-description {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.4);
          line-height: 1.4;
          margin-bottom: 16px;
        }

        .themes-grid-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .theme-pill-btn {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 12px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 14px;
          cursor: pointer;
          transition: all var(--transition-fast);
          text-align: left;
        }

        .theme-pill-btn:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.12);
        }

        .theme-pill-btn.active {
          background: rgba(var(--accent-color-rgb), 0.04);
          border-color: var(--accent-color);
          box-shadow: 0 4px 15px rgba(var(--accent-color-rgb), 0.1);
        }

        .color-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
          box-shadow: 0 0 10px currentColor;
        }

        .blue-dot { color: #00e5ff; background: #00e5ff; }
        .pink-dot { color: #ff007f; background: #ff007f; }
        .green-dot { color: #00ff66; background: #00ff66; }
        .gold-dot { color: #e6af2e; background: #e6af2e; }

        .theme-pill-details {
          display: flex;
          flex-direction: column;
        }

        .theme-pill-name {
          font-size: 12px;
          font-weight: 700;
          color: #fff;
        }

        .theme-pill-desc {
          font-size: 9.5px;
          color: rgba(255, 255, 255, 0.35);
          margin-top: 2px;
        }

        .audio-toggle-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .audio-toggle-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .audio-card-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .mute-status-icon {
          flex-shrink: 0;
        }

        .mute-status-icon.active-volume {
          color: var(--accent-color);
        }

        .mute-status-icon.muted {
          color: rgba(255, 255, 255, 0.25);
        }

        .audio-card-info {
          display: flex;
          flex-direction: column;
        }

        .audio-card-title {
          font-size: 12.5px;
          font-weight: 700;
          color: #fff;
        }

        .audio-card-desc {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.35);
          margin-top: 2px;
        }

        .checkbox-toggle-switch {
          width: 46px;
          height: 24px;
          border-radius: 15px;
          padding: 3px;
          transition: all 0.3s ease;
        }

        .sw-active {
          background: var(--accent-color);
          box-shadow: var(--accent-glow-subtle);
        }

        .sw-muted {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .switch-knob {
          width: 18px;
          height: 18px;
          background: #000;
          border-radius: 50%;
          transition: all 0.3s cubic-bezier(0.15, 0.85, 0.3, 1);
        }

        .sw-active .switch-knob {
          transform: translateX(22px);
          background: #07070a;
        }

        .sw-muted .switch-knob {
          background: rgba(255, 255, 255, 0.3);
        }

        .api-key-card {
          background: rgba(99, 102, 241, 0.02);
          border: 1px solid rgba(99, 102, 241, 0.1);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .api-key-input-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .api-key-status-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(99, 102, 241, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #818cf8;
          flex-shrink: 0;
        }

        .api-key-input {
          flex: 1;
          font-family: monospace;
          font-size: 12px;
          padding: 10px 14px;
        }

        .api-key-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .api-key-status-text {
          font-size: 10px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.4);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .api-key-buttons {
          display: flex;
          gap: 8px;
        }

        .api-key-btn {
          font-size: 10px;
          padding: 6px 14px;
        }

        .sliders-form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .slider-input-group {
          display: flex;
          flex-direction: column;
        }

        .slider-labels {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 8px;
        }

        .slider-labels span:last-child {
          color: var(--accent-color);
          font-weight: 700;
        }

        .settings-slider-bar {
          -webkit-appearance: none;
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 2px;
          outline: none;
        }

        .settings-slider-bar::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--accent-color);
          cursor: pointer;
          box-shadow: var(--accent-glow-subtle);
          transition: transform 0.1s ease;
        }

        .settings-slider-bar::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }

        .red-heading {
          color: #ef4444 !important;
        }

        .maintenance-card {
          background: rgba(239, 68, 68, 0.02);
          border: 1px solid rgba(239, 68, 68, 0.1);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .m-left {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .m-title {
          font-size: 12px;
          font-weight: 700;
          color: #fff;
        }

        .m-desc {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.4);
        }

        .reset-db-btn {
          border-color: rgba(239, 68, 68, 0.3);
          background: rgba(239, 68, 68, 0.03);
          color: #ef4444;
          font-size: 11px;
          padding: 8px 16px;
        }

        .reset-db-btn:hover {
          background: #ef4444;
          color: #fff;
          border-color: #ef4444;
          box-shadow: 0 0 15px rgba(239, 68, 68, 0.4);
        }

        .settings-footer {
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding: 20px 24px;
        }

        .flex-center-end {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
      `}})]})}const r0={PC:Ru,PS5:Ue,PS4:Ue,"Xbox Series X|S":Ue,"Xbox One":Ue,Switch:Ue,Mobile:Ou};function l0({platform:e}){const t=r0[e]||Ue,n=e==="PS5"||e==="PS4"?"PS":e.startsWith("Xbox")?"XB":e==="Switch"?"NS":e==="Mobile"?"Mob":e==="PC"?"PC":e.slice(0,2);return i.jsxs("div",{className:"platform-icon-badge",title:e,children:[i.jsx(t,{size:10}),i.jsx("span",{children:n})]})}function a0({catalog:e,ownedGames:t,onSelectItem:n,searchQuery:r}){const l=e.filter(s=>s.title.toLowerCase().includes(r.toLowerCase())||s.developer.toLowerCase().includes(r.toLowerCase())||s.genre.toLowerCase().includes(r.toLowerCase())),a=new Set(t.map(s=>s.id)),o=s=>{N.playClickPulse(),n(s)};return i.jsxs("div",{className:"store-viewport",children:[i.jsxs("div",{className:"store-header",children:[i.jsxs("div",{className:"store-header-left",children:[i.jsx(Fu,{size:20,className:"store-header-icon"}),i.jsx("h1",{className:"store-title",children:"Nexus Store"})]}),i.jsxs("span",{className:"store-count",children:[l.length," titles available"]})]}),l.length===0&&i.jsx("div",{className:"store-empty",children:i.jsx("span",{children:"No titles match your search."})}),i.jsx("div",{className:"store-grid",children:l.map(s=>{const c=a.has(s.id);return i.jsxs("div",{className:`store-card ${c?"owned":""}`,onClick:()=>o(s),children:[i.jsxs("div",{className:"store-card-image-wrapper",children:[i.jsx("img",{src:s.coverUrl,alt:s.title,className:"store-card-image",loading:"lazy"}),c&&i.jsxs("div",{className:"store-owned-badge",children:[i.jsx(Lu,{size:12}),i.jsx("span",{children:"Owned"})]}),i.jsx("div",{className:"store-card-hover",children:i.jsx("span",{className:"store-card-view-btn",children:"View Game"})})]}),i.jsxs("div",{className:"store-card-info",children:[i.jsx("div",{className:"store-card-title",children:s.title}),i.jsx("div",{className:"store-card-developer",children:s.developer}),i.jsx("div",{className:"store-card-platforms",children:s.platforms.map(d=>i.jsx(l0,{platform:d},d))}),i.jsxs("div",{className:"store-card-rating",children:[i.jsx(br,{size:10,fill:"currentColor"}),i.jsx("span",{children:s.rating})]})]})]},s.id)})}),i.jsx("style",{dangerouslySetInnerHTML:{__html:`
        .store-viewport {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 30px 0 40px 0;
          overflow-y: auto;
          height: 100%;
        }

        .store-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 30px;
          padding-right: 10px;
        }

        .store-header-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .store-header-icon {
          color: var(--accent-color);
        }

        .store-title {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 22px;
          letter-spacing: 3px;
          color: #fff;
          text-transform: uppercase;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
        }

        .store-count {
          font-size: 12px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.35);
          letter-spacing: 0.5px;
        }

        .store-empty {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 200px;
          color: rgba(255, 255, 255, 0.3);
          font-size: 14px;
        }

        .store-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
          gap: 24px;
        }

        .store-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 14px;
          overflow: hidden;
          cursor: pointer;
          transition: all var(--transition-fast);
          display: flex;
          flex-direction: column;
        }

        .store-card:hover {
          transform: translateY(-6px);
          border-color: rgba(var(--accent-color-rgb), 0.25);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.5), 0 0 20px rgba(var(--accent-color-rgb), 0.08);
          background: rgba(var(--accent-color-rgb), 0.03);
        }

        .store-card.owned {
          border-color: rgba(var(--accent-color-rgb), 0.08);
        }

        .store-card.owned:hover {
          border-color: rgba(var(--accent-color-rgb), 0.3);
        }

        .store-card-image-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 2 / 3;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.2);
        }

        .store-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .store-card:hover .store-card-image {
          transform: scale(1.08);
        }

        .store-owned-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(var(--accent-color-rgb), 0.85);
          color: #07070a;
          padding: 3px 8px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 9px;
          font-weight: 700;
          font-family: var(--font-display);
          letter-spacing: 0.5px;
          box-shadow: 0 0 10px rgba(var(--accent-color-rgb), 0.4);
          z-index: 5;
        }

        .store-card-hover {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity var(--transition-fast);
          z-index: 4;
        }

        .store-card:hover .store-card-hover {
          opacity: 1;
        }

        .store-card-view-btn {
          background: var(--accent-color);
          color: #07070a;
          padding: 8px 20px;
          border-radius: 20px;
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          box-shadow: var(--accent-glow);
          transform: translateY(10px);
          transition: all var(--transition-fast);
        }

        .store-card:hover .store-card-view-btn {
          transform: translateY(0);
        }

        .store-card-info {
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
        }

        .store-card-title {
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: 13px;
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .store-card-developer {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.4);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .store-card-platforms {
          display: flex;
          gap: 4px;
          flex-wrap: wrap;
          margin-top: 2px;
        }

        .platform-icon-badge {
          display: flex;
          align-items: center;
          gap: 3px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 4px;
          padding: 2px 5px;
          font-size: 8px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.5);
          letter-spacing: 0.3px;
        }

        .store-card-rating {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          font-weight: 600;
          color: #e6af2e;
          margin-top: auto;
        }
      `}})]})}const i0={PC:Ru,PS5:Ue,PS4:Ue,"Xbox Series X|S":Ue,"Xbox One":Ue,Switch:Ue,Mobile:Ou};function o0({item:e,ownedGames:t,onBack:n,onMarkOwned:r,onLinkExe:l,onLaunch:a}){var h;const[o,s]=T.useState(""),[c,d]=T.useState(!1);if(!e)return null;const m=t.find(u=>u.id===e.id),g=!!m,f=g&&m.exePath,y=()=>{N.playClickPulse(),r(e)},x=()=>{if(N.playClickPulse(),window.electronAPI)window.electronAPI.selectExecutable().then(u=>{u&&(s(u),l(e.id,u),d(!1))});else{const u=prompt("Enter the full path to the .exe file:","C:\\Games\\"+e.title+"\\game.exe");u&&(s(u),l(e.id,u),d(!1))}},w=()=>{N.playClickPulse(),o&&(l(e.id,o),d(!1))},L=()=>{N.playClickPulse(),m&&a(m)};return i.jsxs("div",{className:"store-item-viewport",children:[i.jsxs("button",{className:"store-item-back-btn",onClick:n,children:[i.jsx(_u,{size:16}),i.jsx("span",{children:"Back to Store"})]}),i.jsxs("div",{className:"store-item-banner",children:[i.jsx("img",{src:e.bannerUrl,alt:e.title,className:"store-item-banner-img"}),i.jsx("div",{className:"store-item-banner-overlay"}),i.jsxs("div",{className:"store-item-banner-content",children:[i.jsx("div",{className:"store-item-banner-tags",children:(h=e.tags)==null?void 0:h.map((u,p)=>i.jsx("span",{className:"store-item-tag",children:u},p))}),i.jsx("h1",{className:"store-item-title",children:e.title}),i.jsxs("div",{className:"store-item-meta",children:[i.jsx("span",{children:e.developer}),i.jsx("span",{className:"store-item-dot"}),i.jsx("span",{children:e.publisher}),i.jsx("span",{className:"store-item-dot"}),i.jsx("span",{children:e.releaseDate})]}),i.jsxs("div",{className:"store-item-rating",children:[i.jsx(br,{size:14,fill:"currentColor"}),i.jsx("span",{children:e.rating})]})]})]}),i.jsxs("div",{className:"store-item-body",children:[i.jsxs("div",{className:"store-item-left",children:[i.jsx("h3",{className:"store-item-section-title",children:"About This Game"}),i.jsx("p",{className:"store-item-description",children:e.description}),i.jsx("h3",{className:"store-item-section-title",children:"Platforms"}),i.jsx("div",{className:"store-item-platforms",children:e.platforms.map(u=>{const p=i0[u]||Ue;return i.jsxs("div",{className:"store-item-platform-badge",children:[i.jsx(p,{size:16}),i.jsx("span",{children:u})]},u)})})]}),i.jsx("div",{className:"store-item-right",children:i.jsx("div",{className:"store-item-ownership-card",children:g?i.jsxs(i.Fragment,{children:[i.jsxs("div",{className:"owned-check",children:[i.jsx(Lu,{size:20}),i.jsx("span",{children:"In Your Library"})]}),f?i.jsxs("div",{className:"exe-linked-info",children:[i.jsx(gs,{size:14}),i.jsx("span",{className:"exe-path-label",children:m.exePath})]}):i.jsx("div",{className:"exe-not-linked",children:i.jsx("span",{children:"No executable linked yet"})}),c?i.jsxs("div",{className:"exe-input-row",children:[i.jsx("input",{type:"text",className:"glass-input exe-input",placeholder:"C:\\\\Path\\\\To\\\\Game.exe",value:o,onChange:u=>s(u.target.value)}),i.jsxs("div",{className:"exe-input-actions",children:[i.jsxs("button",{className:"glow-btn",onClick:x,children:[i.jsx(hs,{size:14}),i.jsx("span",{children:"Browse"})]}),i.jsxs("button",{className:"glow-btn glow-btn-primary",onClick:w,disabled:!o,children:[i.jsx(gs,{size:14}),i.jsx("span",{children:"Link"})]})]})]}):i.jsxs("div",{className:"store-item-actions",children:[f&&i.jsxs("button",{className:"glow-btn glow-btn-primary",onClick:L,children:[i.jsx(Fl,{size:14}),i.jsx("span",{children:"Play Now"})]}),i.jsxs("button",{className:"glow-btn",onClick:()=>d(!0),children:[i.jsx(hs,{size:14}),i.jsx("span",{children:f?"Change EXE":"Link EXE"})]})]})]}):i.jsxs(i.Fragment,{children:[i.jsx("div",{className:"not-owned-label",children:i.jsx("span",{children:"You don't own this game yet"})}),i.jsxs("button",{className:"glow-btn glow-btn-primary mark-owned-btn",onClick:y,children:[i.jsx(Uf,{size:16}),i.jsx("span",{children:"Mark as Owned"})]}),i.jsx("div",{className:"owned-hint",children:"Mark a game as owned to add it to your library, then link your .exe file to play."})]})})})]}),i.jsx("style",{dangerouslySetInnerHTML:{__html:`
        .store-item-viewport {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 20px 0 40px 0;
          overflow-y: auto;
          height: 100%;
        }

        .store-item-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 8px;
          padding: 8px 16px;
          color: rgba(255, 255, 255, 0.6);
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all var(--transition-fast);
          margin-bottom: 24px;
          align-self: flex-start;
        }

        .store-item-back-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
          border-color: rgba(255, 255, 255, 0.15);
        }

        .store-item-banner {
          position: relative;
          width: 100%;
          height: 320px;
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 30px;
        }

        .store-item-banner-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .store-item-banner-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(0deg, rgba(7, 7, 10, 0.95) 0%, rgba(7, 7, 10, 0.3) 50%, rgba(7, 7, 10, 0.5) 100%);
          z-index: 1;
        }

        .store-item-banner-content {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 30px;
          z-index: 2;
        }

        .store-item-banner-tags {
          display: flex;
          gap: 8px;
          margin-bottom: 12px;
        }

        .store-item-tag {
          background: rgba(var(--accent-color-rgb), 0.12);
          border: 1px solid rgba(var(--accent-color-rgb), 0.25);
          color: var(--accent-color);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 10px;
          font-family: var(--font-display);
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .store-item-title {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 36px;
          letter-spacing: 2px;
          color: #fff;
          text-shadow: 0 0 30px rgba(0, 0, 0, 0.8);
          margin-bottom: 8px;
          text-transform: uppercase;
        }

        .store-item-meta {
          display: flex;
          align-items: center;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.6);
          gap: 8px;
        }

        .store-item-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
        }

        .store-item-rating {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 700;
          color: #e6af2e;
          margin-top: 8px;
        }

        .store-item-body {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 30px;
        }

        .store-item-section-title {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 14px;
        }

        .store-item-description {
          font-size: 14px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 30px;
        }

        .store-item-platforms {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .store-item-platform-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 8px;
          padding: 8px 14px;
          font-size: 12px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.7);
        }

        .store-item-platform-badge svg {
          color: var(--accent-color);
        }

        .store-item-right {
          display: flex;
          flex-direction: column;
        }

        .store-item-ownership-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .owned-check {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--accent-color);
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .exe-linked-info {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.5);
          font-family: monospace;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 6px;
          padding: 8px 12px;
          word-break: break-all;
        }

        .exe-not-linked {
          font-size: 12px;
          color: rgba(255, 175, 46, 0.7);
          font-weight: 500;
          text-align: center;
          padding: 8px;
          background: rgba(255, 175, 46, 0.04);
          border: 1px dashed rgba(255, 175, 46, 0.15);
          border-radius: 8px;
        }

        .store-item-actions {
          display: flex;
          gap: 10px;
          margin-top: 4px;
        }

        .store-item-actions .glow-btn {
          flex: 1;
          font-size: 11px;
          padding: 10px 12px;
        }

        .exe-input-row {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .exe-input {
          font-family: monospace;
          font-size: 11px;
          width: 100%;
        }

        .exe-input-actions {
          display: flex;
          gap: 8px;
        }

        .exe-input-actions .glow-btn {
          flex: 1;
          font-size: 11px;
          padding: 8px 12px;
        }

        .not-owned-label {
          text-align: center;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.4);
          padding: 10px 0;
        }

        .mark-owned-btn {
          width: 100%;
          padding: 14px;
          font-size: 13px;
        }

        .owned-hint {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.25);
          text-align: center;
          line-height: 1.5;
        }
      `}})]})}function s0({games:e,selectedGame:t,onSelectGame:n,onLaunchGame:r,onToggleFavorite:l,onReturnToLibrary:a,runningGameId:o}){const s=e.find(f=>f.id===(t==null?void 0:t.id))||e[0],c=(f=0)=>{const y=Math.floor(f/3600),x=Math.floor(f%3600/60);return y===0?`${x}m`:x===0?`${y}h`:`${y}h ${x}m`},d=f=>{N.playClickPulse(),n(f)},m=(f,y)=>{f.stopPropagation(),N.playLaunchSwell(),r(y)},g=(f,y)=>{f.stopPropagation(),N.playClickPulse(),l(y.id)};return e.length===0?i.jsxs("div",{className:"favourites-room empty-room",children:[i.jsx("div",{className:"vault-ambient-glow"}),i.jsxs("div",{className:"empty-vault-display",children:[i.jsx("div",{className:"empty-trophy-ring",children:i.jsx(bl,{size:42})}),i.jsx("span",{className:"room-kicker",children:"Private Collection"}),i.jsx("h1",{children:"No Favourites Yet"}),i.jsx("p",{children:"Mark games with the star in Library and they will appear in this trophy room."}),i.jsxs("button",{className:"glow-btn glow-btn-primary empty-return-btn",onClick:a,onMouseEnter:N.playHoverTick,children:[i.jsx(_u,{size:16}),i.jsx("span",{children:"Back to Library"})]})]}),i.jsx("style",{dangerouslySetInnerHTML:{__html:xs}})]}):i.jsxs("div",{className:"favourites-room",children:[i.jsx("div",{className:"vault-ambient-glow"}),i.jsx("div",{className:"room-ceiling-light"}),i.jsx("div",{className:"polished-floor-reflection"}),i.jsxs("div",{className:"trophy-room-header",children:[i.jsxs("div",{children:[i.jsx("span",{className:"room-kicker",children:"Curated Vault"}),i.jsx("h1",{children:"Favourites Trophy Room"})]}),i.jsxs("div",{className:"room-count-plaque",children:[i.jsx(bl,{size:16}),i.jsxs("span",{children:[e.length," prized ",e.length===1?"game":"games"]})]})]}),s&&i.jsxs("section",{className:"spotlight-pedestal",onClick:()=>d(s),children:[i.jsx("div",{className:"pedestal-light-cone"}),i.jsx("div",{className:"cylindrical-base"}),i.jsx("div",{className:"spotlight-cover-shell",children:i.jsx("img",{src:s.coverUrl,alt:s.title,className:"spotlight-cover"})}),i.jsxs("div",{className:"spotlight-plaque",children:[i.jsx("span",{className:"plaque-label",children:"Featured Favourite"}),i.jsx("h2",{children:s.title}),i.jsxs("div",{className:"plaque-meta",children:[i.jsx("span",{children:s.developer}),i.jsx("span",{children:s.genre}),i.jsxs("span",{children:[s.rating," rating"]})]})]})]}),i.jsx("div",{className:"display-case-grid",children:e.map((f,y)=>{const x=(t==null?void 0:t.id)===f.id,w=o===f.id;return i.jsxs("article",{className:`favourite-display-case ${x?"selected":""} ${w?"running":""}`,onClick:()=>d(f),onMouseEnter:N.playHoverTick,style:{"--case-delay":`${y*70}ms`},children:[i.jsx("div",{className:"case-spotlight"}),i.jsxs("div",{className:"case-glass-dome",children:[i.jsx("div",{className:"case-metal-rim top-rim"}),i.jsxs("div",{className:"case-art-frame",children:[i.jsx("img",{src:f.coverUrl,alt:f.title,className:"case-cover-art",loading:"lazy"}),w&&i.jsxs("div",{className:"case-running-badge",children:[i.jsx("span",{className:"running-dot"}),i.jsx("span",{children:"Running"})]})]}),i.jsx("div",{className:"case-glass-shine"}),i.jsx("div",{className:"case-metal-rim bottom-rim"})]}),i.jsxs("div",{className:"engraved-plaque",children:[i.jsxs("div",{className:"plaque-title-row",children:[i.jsxs("div",{children:[i.jsx("h3",{children:f.title}),i.jsx("span",{children:f.developer})]}),i.jsx("button",{className:"plaque-star-btn active",onClick:L=>g(L,f),title:"Remove from Favourites",children:i.jsx(br,{size:15,fill:"currentColor"})})]}),i.jsxs("div",{className:"artifact-stats",children:[i.jsxs("div",{className:"artifact-stat",title:"Playtime",children:[i.jsx(Au,{size:12}),i.jsx("span",{children:c(f.playtime)})]}),i.jsxs("div",{className:"artifact-stat",title:"Progress",children:[i.jsx(eo,{size:12}),i.jsxs("span",{children:[f.progress||0,"%"]})]}),i.jsxs("div",{className:"artifact-stat",title:"Last Played",children:[i.jsx(to,{size:12}),i.jsx("span",{children:f.lastPlayed})]})]}),i.jsxs("button",{className:`vault-launch-btn ${w?"running":""}`,onClick:L=>m(L,f),children:[i.jsx(Fl,{size:15,fill:w?"transparent":"currentColor"}),i.jsx("span",{children:w?"Running":"Launch"})]})]})]},f.id)})}),i.jsx("style",{dangerouslySetInnerHTML:{__html:xs}})]})}const xs=`
  .favourites-room {
    position: relative;
    min-height: calc(100vh - var(--header-height) - 40px);
    padding: 28px 0 120px;
    overflow: hidden;
    color: #fff;
    isolation: isolate;
  }

  .favourites-room::before {
    content: '';
    position: absolute;
    inset: -90px -60px -160px;
    background:
      radial-gradient(ellipse at 50% 12%, rgba(232, 184, 91, 0.22), transparent 32%),
      radial-gradient(ellipse at 12% 38%, rgba(114, 9, 20, 0.32), transparent 34%),
      radial-gradient(ellipse at 86% 32%, rgba(174, 136, 72, 0.16), transparent 34%),
      linear-gradient(180deg, #11080a 0%, #080708 44%, #07070a 72%, #050505 100%);
    z-index: -4;
  }

  .vault-ambient-glow {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, rgba(212, 175, 55, 0.06), transparent 22%, transparent 78%, rgba(192, 192, 192, 0.06)),
      repeating-linear-gradient(90deg, rgba(255,255,255,0.026) 0 1px, transparent 1px 120px);
    opacity: 0.75;
    z-index: -3;
    pointer-events: none;
  }

  .room-ceiling-light {
    position: absolute;
    top: -80px;
    left: 50%;
    width: min(900px, 76vw);
    height: 430px;
    transform: translateX(-50%);
    background: radial-gradient(ellipse at center, rgba(255, 215, 150, 0.32), rgba(255, 183, 87, 0.08) 45%, transparent 72%);
    filter: blur(8px);
    z-index: -2;
    pointer-events: none;
  }

  .polished-floor-reflection {
    position: absolute;
    left: -60px;
    right: -60px;
    bottom: -120px;
    height: 320px;
    background:
      radial-gradient(ellipse at 50% 0%, rgba(255, 208, 132, 0.17), transparent 58%),
      linear-gradient(180deg, rgba(255,255,255,0.045), transparent 38%);
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    transform: perspective(600px) rotateX(58deg);
    transform-origin: top center;
    z-index: -1;
    pointer-events: none;
  }

  .trophy-room-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 18px;
    position: relative;
    z-index: 2;
  }

  .room-kicker {
    display: block;
    font-family: var(--font-display);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(235, 193, 104, 0.78);
    margin-bottom: 8px;
  }

  .trophy-room-header h1,
  .empty-vault-display h1 {
    font-family: var(--font-display);
    font-size: clamp(28px, 4vw, 48px);
    font-weight: 900;
    letter-spacing: 1px;
    color: #fff;
    text-shadow: 0 0 30px rgba(212, 175, 55, 0.18);
  }

  .room-count-plaque {
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1px solid rgba(232, 184, 91, 0.28);
    background: linear-gradient(135deg, rgba(55, 38, 18, 0.72), rgba(255, 255, 255, 0.04));
    color: rgba(255, 235, 195, 0.86);
    border-radius: 8px;
    padding: 11px 14px;
    font-family: var(--font-display);
    font-size: 11px;
    font-weight: 700;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.16), 0 12px 30px rgba(0,0,0,0.36);
  }

  .spotlight-pedestal {
    position: relative;
    display: grid;
    grid-template-columns: minmax(170px, 250px) minmax(0, 1fr);
    align-items: center;
    gap: 30px;
    min-height: 230px;
    margin: 4px auto 26px;
    max-width: 920px;
    cursor: pointer;
    z-index: 1;
  }

  .pedestal-light-cone {
    position: absolute;
    left: 70px;
    top: -70px;
    width: 330px;
    height: 420px;
    background: linear-gradient(180deg, rgba(255, 210, 135, 0.22), rgba(255, 210, 135, 0.02) 72%, transparent);
    clip-path: polygon(40% 0, 60% 0, 100% 100%, 0 100%);
    filter: blur(6px);
    pointer-events: none;
  }

  .cylindrical-base {
    position: absolute;
    left: 24px;
    bottom: 4px;
    width: 260px;
    height: 72px;
    border-radius: 50%;
    background:
      radial-gradient(ellipse at 50% 20%, rgba(255, 226, 163, 0.22), transparent 58%),
      linear-gradient(180deg, rgba(177, 137, 65, 0.42), rgba(29, 25, 25, 0.92));
    border: 1px solid rgba(232, 184, 91, 0.24);
    box-shadow: inset 0 12px 24px rgba(255,255,255,0.06), 0 32px 50px rgba(0,0,0,0.58);
  }

  .spotlight-cover-shell {
    position: relative;
    width: 185px;
    aspect-ratio: 2 / 3;
    justify-self: center;
    border-radius: 14px;
    padding: 8px;
    background: linear-gradient(135deg, rgba(245, 215, 142, 0.38), rgba(192, 192, 192, 0.13), rgba(42, 34, 24, 0.9));
    box-shadow: 0 26px 60px rgba(0,0,0,0.62), 0 0 70px rgba(232, 184, 91, 0.13);
    z-index: 1;
  }

  .spotlight-cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 9px;
    box-shadow: inset 0 0 0 1px rgba(255,255,255,0.16);
  }

  .spotlight-plaque {
    position: relative;
    padding: 26px 28px;
    border-radius: 8px;
    background: linear-gradient(135deg, rgba(16, 14, 13, 0.82), rgba(72, 44, 18, 0.34));
    border: 1px solid rgba(232, 184, 91, 0.2);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 20px 48px rgba(0,0,0,0.46);
    overflow: hidden;
  }

  .spotlight-plaque::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.08) 42%, transparent 58%);
    opacity: 0.5;
    pointer-events: none;
  }

  .plaque-label {
    font-family: var(--font-display);
    font-size: 10px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: rgba(232, 184, 91, 0.72);
  }

  .spotlight-plaque h2 {
    font-family: var(--font-display);
    font-size: clamp(24px, 3.6vw, 42px);
    line-height: 1.05;
    margin: 8px 0 14px;
    color: #fff;
  }

  .plaque-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    color: rgba(255,255,255,0.62);
    font-size: 12px;
    font-weight: 600;
  }

  .plaque-meta span {
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.035);
    border-radius: 999px;
    padding: 5px 9px;
  }

  .display-case-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 28px;
    position: relative;
    z-index: 2;
  }

  .favourite-display-case {
    position: relative;
    min-height: 460px;
    padding: 22px 18px 18px;
    cursor: pointer;
    animation: case-rise 0.6s var(--ease-ps5) both;
    animation-delay: var(--case-delay);
  }

  @keyframes case-rise {
    from { opacity: 0; transform: translateY(18px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .case-spotlight {
    position: absolute;
    top: -38px;
    left: 50%;
    width: 190px;
    height: 300px;
    transform: translateX(-50%);
    background: linear-gradient(180deg, rgba(255, 204, 126, 0.28), transparent 78%);
    clip-path: polygon(34% 0, 66% 0, 100% 100%, 0 100%);
    filter: blur(7px);
    pointer-events: none;
  }

  .case-glass-dome {
    position: relative;
    min-height: 280px;
    border-radius: 44% 44% 18px 18px / 18% 18% 18px 18px;
    padding: 34px 22px 22px;
    background:
      radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.16), transparent 28%),
      linear-gradient(90deg, rgba(255,255,255,0.14), rgba(255,255,255,0.025) 18%, rgba(255,255,255,0.06) 72%, rgba(255,255,255,0.18)),
      rgba(18, 18, 20, 0.24);
    border: 1px solid rgba(225, 230, 235, 0.18);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -30px 38px rgba(255,255,255,0.035), 0 24px 45px rgba(0,0,0,0.42);
    overflow: hidden;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    transition: all var(--transition-normal);
  }

  .favourite-display-case:hover .case-glass-dome,
  .favourite-display-case.selected .case-glass-dome {
    border-color: rgba(232, 184, 91, 0.45);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.28), 0 26px 60px rgba(0,0,0,0.55), 0 0 28px rgba(232, 184, 91, 0.14);
  }

  .favourite-display-case.running .case-glass-dome {
    border-color: rgba(239, 68, 68, 0.62);
    box-shadow: 0 0 28px rgba(239, 68, 68, 0.32), 0 24px 45px rgba(0,0,0,0.42);
  }

  .case-metal-rim {
    position: absolute;
    left: 18px;
    right: 18px;
    height: 10px;
    border-radius: 50%;
    background: linear-gradient(90deg, rgba(92, 76, 44, 0.2), rgba(232, 184, 91, 0.72), rgba(210, 215, 220, 0.5), rgba(92, 76, 44, 0.2));
    opacity: 0.75;
  }

  .top-rim { top: 14px; }
  .bottom-rim { bottom: 12px; }

  .case-art-frame {
    position: relative;
    width: min(155px, 72%);
    aspect-ratio: 2 / 3;
    margin: 0 auto;
    padding: 6px;
    border-radius: 10px;
    background: linear-gradient(145deg, rgba(232, 184, 91, 0.42), rgba(210, 215, 220, 0.18), rgba(0,0,0,0.52));
    box-shadow: 0 18px 35px rgba(0,0,0,0.5);
  }

  .case-cover-art {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 7px;
    display: block;
  }

  .case-glass-shine {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.14) 16%, transparent 31%),
      linear-gradient(70deg, transparent 52%, rgba(255,255,255,0.09) 66%, transparent 76%);
    pointer-events: none;
  }

  .case-running-badge {
    position: absolute;
    top: 12px;
    left: 12px;
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(239, 68, 68, 0.88);
    color: #fff;
    border-radius: 999px;
    padding: 5px 8px;
    font-family: var(--font-display);
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.5px;
  }

  .running-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #fff;
    animation: trophy-running-pulse 1.2s infinite ease-in-out;
  }

  @keyframes trophy-running-pulse {
    0%, 100% { transform: scale(0.82); opacity: 0.55; }
    50% { transform: scale(1.35); opacity: 1; }
  }

  .engraved-plaque {
    position: relative;
    margin: -8px auto 0;
    padding: 16px;
    border-radius: 8px;
    background:
      linear-gradient(135deg, rgba(62, 45, 22, 0.88), rgba(14, 13, 13, 0.92)),
      linear-gradient(90deg, rgba(255,255,255,0.06), transparent);
    border: 1px solid rgba(232, 184, 91, 0.26);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.12), 0 14px 28px rgba(0,0,0,0.38);
  }

  .plaque-title-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 13px;
  }

  .plaque-title-row h3 {
    font-size: 15px;
    line-height: 1.15;
    color: #fff5df;
    margin-bottom: 4px;
  }

  .plaque-title-row span {
    display: block;
    color: rgba(255,255,255,0.5);
    font-size: 11px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 160px;
  }

  .plaque-star-btn {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1px solid rgba(232, 184, 91, 0.35);
    background: rgba(232, 184, 91, 0.13);
    color: #e6af2e;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    transition: all var(--transition-fast);
  }

  .plaque-star-btn:hover {
    background: #e6af2e;
    color: #07070a;
    box-shadow: 0 0 16px rgba(230, 175, 46, 0.48);
  }

  .artifact-stats {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 7px;
    margin-bottom: 13px;
  }

  .artifact-stat {
    min-width: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 6px;
    padding: 7px 5px;
    color: rgba(255,255,255,0.65);
    font-size: 10px;
    font-weight: 700;
  }

  .artifact-stat svg {
    color: rgba(232, 184, 91, 0.84);
    flex-shrink: 0;
  }

  .artifact-stat span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .vault-launch-btn {
    width: 100%;
    height: 38px;
    border: 1px solid rgba(232, 184, 91, 0.36);
    border-radius: 8px;
    background: linear-gradient(135deg, #e6af2e, #f7dc8c);
    color: #07070a;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-family: var(--font-display);
    font-size: 11px;
    font-weight: 900;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .vault-launch-btn:hover {
    transform: translateY(-2px);
    background: #fff;
    box-shadow: 0 0 22px rgba(255, 239, 195, 0.48);
  }

  .vault-launch-btn.running {
    background: #ef4444;
    border-color: #ef4444;
    color: #fff;
    box-shadow: 0 0 18px rgba(239, 68, 68, 0.4);
  }

  .empty-room {
    min-height: calc(100vh - var(--header-height) - 40px);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .empty-vault-display {
    width: min(520px, 92vw);
    text-align: center;
    padding: 48px 36px;
    border-radius: 8px;
    background: linear-gradient(135deg, rgba(18, 16, 16, 0.86), rgba(72, 44, 18, 0.28));
    border: 1px solid rgba(232, 184, 91, 0.24);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 24px 70px rgba(0,0,0,0.52);
  }

  .empty-trophy-ring {
    width: 94px;
    height: 94px;
    margin: 0 auto 22px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #e6af2e;
    background: radial-gradient(circle, rgba(232, 184, 91, 0.22), rgba(232, 184, 91, 0.04));
    border: 1px solid rgba(232, 184, 91, 0.3);
    box-shadow: 0 0 38px rgba(232, 184, 91, 0.16);
  }

  .empty-vault-display p {
    margin: 14px auto 26px;
    max-width: 360px;
    color: rgba(255,255,255,0.58);
    line-height: 1.6;
    font-size: 14px;
  }

  .empty-return-btn {
    min-width: 180px;
  }

  @media (max-width: 980px) {
    .spotlight-pedestal {
      grid-template-columns: 1fr;
      text-align: center;
      gap: 14px;
    }

    .cylindrical-base,
    .pedestal-light-cone {
      left: 50%;
      transform: translateX(-50%);
    }

    .plaque-meta {
      justify-content: center;
    }
  }

  @media (max-width: 760px) {
    .favourites-room {
      padding-top: 18px;
    }

    .trophy-room-header {
      align-items: flex-start;
      flex-direction: column;
    }

    .display-case-grid {
      grid-template-columns: 1fr;
      gap: 20px;
    }
  }
`,Je=[{id:"cyberpunk",title:"Cyberpunk 2077",developer:"CD Projekt Red",publisher:"CD Projekt",genre:"Action RPG",rating:4.8,releaseDate:"2020-12-10",description:"An open-world, action-adventure RPG set in the megalopolis of Night City, where you play as a cyberpunk mercenary wrapped up in a do-or-die fight for survival. Upgraded with next-gen graphics and fully immersive ray-tracing options.",playtime:151200,lastPlayed:"Yesterday",progress:73,timeToComplete:"12 hrs",nextAchievement:"The Star (80% complete)",coverUrl:"https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&q=80",soundType:"synth",exePath:"C:\\Windows\\notepad.exe",isFavorite:!0,owned:!0,platforms:["PC","PS5","Xbox Series X|S"],tags:["Open World","Sci-Fi","Ray Tracing"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"eldenring",title:"Elden Ring",developer:"FromSoftware",publisher:"Bandai Namco",genre:"Action RPG",rating:4.9,releaseDate:"2022-02-25",description:"Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between. Experience an expansive fantasy landscape of breathtaking scale.",playtime:414e3,lastPlayed:"2 days ago",progress:92,timeToComplete:"8 hrs",nextAchievement:"Elden Lord (90% complete)",coverUrl:"https://images.unsplash.com/photo-1655821888788-6107699e173b?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1600&q=80",soundType:"orchestra",exePath:"C:\\Windows\\notepad.exe",isFavorite:!0,owned:!0,platforms:["PC","PS5","Xbox Series X|S"],tags:["Souls-like","Dark Fantasy","Hardcore"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"hades",title:"Hades",developer:"Supergiant Games",publisher:"Supergiant Games",genre:"Rogue-like",rating:4.8,releaseDate:"2020-09-17",description:"Defy the god of the dead as you hack and slash out of the Underworld in this rogue-like dungeon crawler from the creators of Bastion, Transistor, and Pyre.",playtime:126e3,lastPlayed:"5 days ago",progress:64,timeToComplete:"5 hrs",nextAchievement:"Family Reunion (50% complete)",coverUrl:"https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&q=80",soundType:"guitar",exePath:"C:\\Windows\\notepad.exe",isFavorite:!1,owned:!0,platforms:["PC","PS5","Xbox Series X|S","Switch"],tags:["Hack & Slash","Indie","Rogue-like"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"portal2",title:"Portal 2",developer:"Valve",publisher:"Valve",genre:"Puzzle Platformer",rating:4.9,releaseDate:"2011-04-18",description:"The cooperative mode of Portal 2 features a unique two-player campaign with its own story, test chambers, and two new player characters. This new mode forces players to reconsider everything they thought they knew.",playtime:9e4,lastPlayed:"3 weeks ago",progress:100,timeToComplete:"0 hrs",nextAchievement:"Completed (100% complete)",coverUrl:"https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1600&q=80",soundType:"ambient",exePath:"C:\\Windows\\notepad.exe",isFavorite:!1,owned:!0,platforms:["PC","PS5","Xbox Series X|S","Switch"],tags:["Puzzle","Co-op","Comedy"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"witcher3",title:"The Witcher 3: Wild Hunt",developer:"CD Projekt Red",publisher:"CD Projekt",genre:"Action RPG",rating:4.9,releaseDate:"2015-05-19",description:"You are Geralt of Rivia, mercenary monster slayer. Before you stands a war-torn, monster-infested continent you can explore at will. Your current contract? Tracking down Ciri — the Child of Prophecy.",playtime:216e3,lastPlayed:"1 month ago",progress:45,timeToComplete:"40 hrs",nextAchievement:"Gwent Master (30% complete)",coverUrl:"https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&q=80",soundType:"folkish",exePath:"C:\\Windows\\notepad.exe",isFavorite:!1,owned:!0,platforms:["PC","PS5","Xbox Series X|S"],tags:["Rich Story","Fantasy","Open World"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1}],c0={cyberpunk2077:{title:"Cyberpunk 2077",developer:"CD Projekt Red",genre:"Action RPG",coverUrl:"https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&q=80",soundType:"synth",tags:["Open World","Sci-Fi","Ray Tracing"],steamAppId:null},eldenring:{title:"Elden Ring",developer:"FromSoftware",genre:"Action RPG",coverUrl:"https://images.unsplash.com/photo-1655821888788-6107699e173b?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1600&q=80",soundType:"orchestra",tags:["Souls-like","Dark Fantasy","Hardcore"],steamAppId:null},hades:{title:"Hades",developer:"Supergiant Games",genre:"Rogue-like",coverUrl:"https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&q=80",soundType:"guitar",tags:["Hack & Slash","Indie","Rogue-like"],steamAppId:null},portal2:{title:"Portal 2",developer:"Valve",genre:"Puzzle Platformer",coverUrl:"https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1600&q=80",soundType:"ambient",tags:["Puzzle","Co-op","Comedy"],steamAppId:null},witcher3:{title:"The Witcher 3: Wild Hunt",developer:"CD Projekt Red",genre:"Action RPG",coverUrl:"https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&q=80",soundType:"folkish",tags:["Rich Story","Fantasy","Open World"],steamAppId:null},minecraft:{title:"Minecraft",developer:"Mojang",genre:"Sandbox",coverUrl:"https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1607988795691-3d0147b43231?w=1600&q=80",soundType:"ambient",tags:["Survival","Building","Sandbox"],steamAppId:null}};function ys(e,t){const n=e.toLowerCase().replace(/[^a-z0-9]/g,"");for(const[r,l]of Object.entries(c0))if(n.includes(r)||r.includes(n))return{...l,exePath:t,playtime:0,lastPlayed:"Never",progress:0,timeToComplete:"--",nextAchievement:"Locked (0% complete)",rating:4.5,releaseDate:new Date().toISOString().split("T")[0],description:`Your scanned copy of ${l.title}. Imported automatically by Nexus PS5 Launcher. Run the game to begin tracking playtime.`,isFavorite:!1,logoUrl:null,iconUrl:null,artworkFetched:!1};return{title:e.charAt(0).toUpperCase()+e.slice(1).replace(/[-_]/g," "),developer:"Unknown Developer",genre:"Indie Game",rating:4,releaseDate:new Date().toISOString().split("T")[0],description:`A local executable found at ${t}. Fully compatible with Nexus runtime launcher and session playtime counters. Customise this game card using the Metadata Suite.`,playtime:0,lastPlayed:"Never",progress:0,timeToComplete:"--",nextAchievement:"None",coverUrl:"https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1600&q=80",soundType:"synth",exePath:t,isFavorite:!1,owned:!0,platforms:["PC"],tags:["Local Import"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1}}const u0=[{id:"cyberpunk",title:"Cyberpunk 2077",developer:"CD Projekt Red",publisher:"CD Projekt",genre:"Action RPG",rating:4.8,releaseDate:"2020-12-10",description:"An open-world, action-adventure RPG set in the megalopolis of Night City, where you play as a cyberpunk mercenary wrapped up in a do-or-die fight for survival. Upgraded with next-gen graphics and fully immersive ray-tracing options.",coverUrl:"https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&q=80",soundType:"synth",tags:["Open World","Sci-Fi","Ray Tracing"],owned:!1,platforms:["PC","PS5","Xbox Series X|S"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"eldenring",title:"Elden Ring",developer:"FromSoftware",publisher:"Bandai Namco",genre:"Action RPG",rating:4.9,releaseDate:"2022-02-25",description:"Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between. Experience an expansive fantasy landscape of breathtaking scale.",coverUrl:"https://images.unsplash.com/photo-1655821888788-6107699e173b?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1600&q=80",soundType:"orchestra",tags:["Souls-like","Dark Fantasy","Hardcore"],owned:!1,platforms:["PC","PS5","Xbox Series X|S"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"hades",title:"Hades",developer:"Supergiant Games",publisher:"Supergiant Games",genre:"Rogue-like",rating:4.8,releaseDate:"2020-09-17",description:"Defy the god of the dead as you hack and slash out of the Underworld in this rogue-like dungeon crawler from the creators of Bastion, Transistor, and Pyre.",coverUrl:"https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&q=80",soundType:"guitar",tags:["Hack & Slash","Indie","Rogue-like"],owned:!1,platforms:["PC","PS5","Xbox Series X|S","Switch"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"portal2",title:"Portal 2",developer:"Valve",publisher:"Valve",genre:"Puzzle Platformer",rating:4.9,releaseDate:"2011-04-18",description:"The cooperative mode of Portal 2 features a unique two-player campaign with its own story, test chambers, and two new player characters. This new mode forces players to reconsider everything they thought they knew.",coverUrl:"https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1600&q=80",soundType:"ambient",tags:["Puzzle","Co-op","Comedy"],owned:!1,platforms:["PC","PS5","Xbox Series X|S","Switch"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"witcher3",title:"The Witcher 3: Wild Hunt",developer:"CD Projekt Red",publisher:"CD Projekt",genre:"Action RPG",rating:4.9,releaseDate:"2015-05-19",description:"You are Geralt of Rivia, mercenary monster slayer. Before you stands a war-torn, monster-infested continent you can explore at will. Your current contract? Tracking down Ciri — the Child of Prophecy.",coverUrl:"https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&q=80",soundType:"folkish",tags:["Rich Story","Fantasy","Open World"],owned:!1,platforms:["PC","PS5","Xbox Series X|S"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"godofwar",title:"God of War Ragnarök",developer:"Santa Monica Studio",publisher:"Sony Interactive Entertainment",genre:"Action Adventure",rating:4.9,releaseDate:"2022-11-09",description:"Embark on an epic and heartfelt journey as Kratos and Atreus struggle with holding on and letting go. The breathtakingly cinematic action-adventure saga continues as the end of days approaches.",coverUrl:"https://images.unsplash.com/photo-1608889825205-e3f5e4a2020e?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80",soundType:"orchestra",tags:["Story Rich","Mythology","Action"],owned:!1,platforms:["PS4","PS5","PC"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"spiderman",title:"Marvel's Spider-Man 2",developer:"Insomniac Games",publisher:"Sony Interactive Entertainment",genre:"Action Adventure",rating:4.8,releaseDate:"2023-10-20",description:"Swing, fight, and soar across Marvel's New York as both Peter Parker and Miles Morales. Battle iconic villains and protect the city in this thrilling sequel.",coverUrl:"https://images.unsplash.com/photo-1635805737707-575885ab0820?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1600&q=80",soundType:"synth",tags:["Superhero","Open World","Action"],owned:!1,platforms:["PS5"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"minecraft",title:"Minecraft",developer:"Mojang",publisher:"Mojang",genre:"Sandbox",rating:4.7,releaseDate:"2011-11-18",description:"Explore infinite worlds and build everything from the simplest of homes to the grandest of castles. Play in creative mode with unlimited resources or mine deep into the world in survival mode.",coverUrl:"https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1607988795691-3d0147b43231?w=1600&q=80",soundType:"ambient",tags:["Survival","Building","Sandbox"],owned:!1,platforms:["PC","PS5","Xbox Series X|S","Switch","Mobile"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"baldursgate3",title:"Baldur's Gate 3",developer:"Larian Studios",publisher:"Larian Studios",genre:"CRPG",rating:4.9,releaseDate:"2023-08-03",description:"Gather your party and return to the Forgotten Realms in a tale of fellowship and betrayal, sacrifice and survival, and the lure of absolute power. Master deep strategic combat and rich storytelling.",coverUrl:"https://images.unsplash.com/photo-1531326121958-9a5a53c8a2c6?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1600&q=80",soundType:"orchestra",tags:["RPG","Strategy","Story Rich"],owned:!1,platforms:["PC","PS5","Xbox Series X|S"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"zelda",title:"The Legend of Zelda: Tears of the Kingdom",developer:"Nintendo EPD",publisher:"Nintendo",genre:"Action Adventure",rating:5,releaseDate:"2023-05-12",description:"An epic adventure across the land and skies of Hyrule awaits in this long-awaited sequel to Breath of the Wild. Harness the power of new abilities and explore a vast, reimagined world.",coverUrl:"https://images.unsplash.com/photo-1616514197671-15d99ce7a6f8?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1470071459604-4b118ecb4c4b?w=1600&q=80",soundType:"orchestra",tags:["Adventure","Open World","Puzzle"],owned:!1,platforms:["Switch"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"halo",title:"Halo Infinite",developer:"343 Industries",publisher:"Xbox Game Studios",genre:"First-Person Shooter",rating:4.5,releaseDate:"2021-12-08",description:"When all hope is lost and humanity's fate hangs in the balance, the Master Chief steps forward to confront a terrifying new enemy. The most ambitious Halo campaign ever made.",coverUrl:"https://images.unsplash.com/photo-1552820728-8b83bb6b1b3c?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1600&q=80",soundType:"synth",tags:["Sci-Fi","Shooter","Multiplayer"],owned:!1,platforms:["PC","Xbox Series X|S","Xbox One"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"ff7rebirth",title:"Final Fantasy VII Rebirth",developer:"Square Enix",publisher:"Square Enix",genre:"JRPG",rating:4.8,releaseDate:"2024-02-29",description:"Step into a vibrant and vast world as Cloud and his friends seek to defy destiny itself. The second chapter of the FINAL FANTASY VII remake project blends classic RPG storytelling with action combat.",coverUrl:"https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1563089145-599997674d42?w=1600&q=80",soundType:"orchestra",tags:["RPG","Fantasy","Action"],owned:!1,platforms:["PS5"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"starfield",title:"Starfield",developer:"Bethesda Game Studios",publisher:"Bethesda Softworks",genre:"Action RPG",rating:4.3,releaseDate:"2023-09-06",description:"Explore the vast reaches of space in Bethesda's first new universe in over 25 years. Create your character and embark on an epic journey to uncover humanity's greatest mystery.",coverUrl:"https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=1600&q=80",soundType:"synth",tags:["Space","Open World","Sci-Fi"],owned:!1,platforms:["PC","Xbox Series X|S"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"horizon",title:"Horizon Forbidden West",developer:"Guerrilla Games",publisher:"Sony Interactive Entertainment",genre:"Action RPG",rating:4.7,releaseDate:"2022-02-18",description:"Aloy ventures west to investigate a deadly blight that threatens all life on Earth. Explore stunning landscapes, battle colossal machines, and uncover a hidden threat.",coverUrl:"https://images.unsplash.com/photo-1518709766631-a6a7f45921c1?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1505144808419-1957a94ca61e?w=1600&q=80",soundType:"orchestra",tags:["Open World","Sci-Fi","Action"],owned:!1,platforms:["PS4","PS5","PC"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"diablo4",title:"Diablo IV",developer:"Blizzard Entertainment",publisher:"Blizzard Entertainment",genre:"Action RPG",rating:4.4,releaseDate:"2023-06-06",description:"Explore the shattered world of Sanctuary in the most ambitious Diablo entry yet. Battle the legions of Hell through a dark and gripping campaign, then dive into deep endgame content.",coverUrl:"https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?w=1600&q=80",soundType:"ambient",tags:["Dark Fantasy","Multiplayer","RPG"],owned:!1,platforms:["PC","PS5","Xbox Series X|S"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"starwars",title:"Star Wars Jedi: Survivor",developer:"Respawn Entertainment",publisher:"Electronic Arts",genre:"Action Adventure",rating:4.6,releaseDate:"2023-04-28",description:"Continue Cal Kestis's journey across the galaxy, now a more powerful Jedi. Master new combat abilities and explore a galaxy far, far away in this thrilling action-adventure.",coverUrl:"https://images.unsplash.com/photo-1543536448-d209d2d2e7d3?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1600&q=80",soundType:"orchestra",tags:["Sci-Fi","Action","Adventure"],owned:!1,platforms:["PC","PS5","Xbox Series X|S"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"liesofp",title:"Lies of P",developer:"Neowiz Games",publisher:"Neowiz",genre:"Souls-like",rating:4.6,releaseDate:"2023-09-19",description:"A dark fantasy retelling of Pinocchio. Navigate a ruined city in a desperate search for Geppetto. Master a sophisticated combat system and wield a unique weapon customization system.",coverUrl:"https://images.unsplash.com/photo-1550639525-c97d455acf70?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&q=80",soundType:"orchestra",tags:["Souls-like","Dark Fantasy","Action"],owned:!1,platforms:["PC","PS5","Xbox Series X|S"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"cyberpunk2077phantom",title:"Cyberpunk 2077: Phantom Liberty",developer:"CD Projekt Red",publisher:"CD Projekt",genre:"Action RPG",rating:4.9,releaseDate:"2023-09-26",description:"A spy-thriller expansion for Cyberpunk 2077. When a prototype orbital shuttle crash-lands in Dogtown, V is pulled into a dangerous game of espionage and survival featuring Idris Elba.",coverUrl:"https://images.unsplash.com/photo-1569144157591-c60f3f82f137?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&q=80",soundType:"synth",tags:["Open World","Spy Thriller","Expansion"],owned:!1,platforms:["PC","PS5","Xbox Series X|S"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1}];function d0(){const[e,t]=T.useState([]),[n,r]=T.useState(null),[l,a]=T.useState(""),[o,s]=T.useState("library"),[c,d]=T.useState(null),[m,g]=T.useState(null),[f,y]=T.useState(0),x=T.useRef(null),[w,L]=T.useState(!1),[h,u]=T.useState(!1),[p,v]=T.useState(!1),[S,P]=T.useState(!1),[k,C]=T.useState(12),[F,R]=T.useState(34),[V,ge]=T.useState({theme:"theme-aether",isMuted:!1,glassBlur:20,glassOpacity:.4,particleDensity:1,particleSpeed:1});T.useEffect(()=>{async function _(){if(window.electronAPI)try{const M=await window.electronAPI.loadDatabase();M&&Array.isArray(M)&&M.length>0?(t(M),r(M[0])):(t(Je),r(Je[0]),await window.electronAPI.saveDatabase(Je))}catch(M){console.error("Database load error, falling back to mock:",M),t(Je),r(Je[0])}else{const M=localStorage.getItem("nexus_games_cache");if(M){const j=JSON.parse(M);t(j),r(j[0])}else t(Je),r(Je[0])}}_()},[]),T.useEffect(()=>{const _=document.body;_.className=`${V.theme} ecosystem-games-bg`,document.documentElement.style.setProperty("--panel-bg",`rgba(10, 10, 16, ${V.glassOpacity})`),document.documentElement.style.setProperty("--panel-bg-solid",`rgba(10, 10, 16, ${Math.min(.98,V.glassOpacity*1.5)})`),document.documentElement.style.setProperty("--glass-border",`rgba(255, 255, 255, ${V.glassOpacity*.18})`);const M=setInterval(()=>{C(j=>{const D=Math.floor(Math.random()*8)-4;return Math.max(5,Math.min(85,j+D))}),R(j=>{const D=Math.floor(Math.random()*4)-2;return Math.max(25,Math.min(95,j+D))})},4e3);return()=>clearInterval(M)},[V]),T.useEffect(()=>(n?N.startAmbience(n.soundType):N.stopAmbience(),()=>N.stopAmbience()),[n,V.isMuted]),T.useEffect(()=>{if(window.electronAPI){const _=window.electronAPI.onGameStatusChanged((M,j,D)=>{j==="running"?(g(M),y(0),L(!1),x.current&&clearInterval(x.current),x.current=setInterval(()=>{y($=>$+1)},1e3)):j==="stopped"&&(x.current&&(clearInterval(x.current),x.current=null),t($=>{const de=$.map(en=>{if(en.id===M){const Vu=D||0;return{...en,playtime:en.playtime+Vu,lastPlayed:"Just now"}}return en});window.electronAPI&&window.electronAPI.saveDatabase(de);const no=de.find(en=>en.id===M);return no&&r(no),de}),g(null),y(0),N.playLaunchSwell())});return()=>{_(),x.current&&clearInterval(x.current)}}},[e]);const ke=async _=>{if(m){alert("A gameplay session is already active!");return}if(N.playLaunchSwell(),window.electronAPI){const M=await window.electronAPI.launchGame(_.id,_.exePath);M.success||alert(`Process launch aborted: ${M.error}`)}else g(_.id),y(0),L(!1),x.current&&clearInterval(x.current),x.current=setInterval(()=>{y(M=>M+1)},1e3),setTimeout(()=>{rt(_.id,8)},8e3)},rt=(_,M)=>{x.current&&(clearInterval(x.current),x.current=null),t(j=>{const D=j.map(de=>de.id===_?{...de,playtime:de.playtime+M,lastPlayed:"Just now"}:de);localStorage.setItem("nexus_games_cache",JSON.stringify(D));const $=D.find(de=>de.id===_);return $&&r($),D}),g(null),y(0),N.playLaunchSwell()},Ye=async _=>{const M=e.map(j=>j.id===_.id?_:j);t(M),r(_),v(!1),window.electronAPI?await window.electronAPI.saveDatabase(M):localStorage.setItem("nexus_games_cache",JSON.stringify(M))},xt=async _=>{const M=e.map(D=>D.id===_?{...D,isFavorite:!D.isFavorite}:D);t(M);const j=M.find(D=>D.id===_);j&&r(j),window.electronAPI?await window.electronAPI.saveDatabase(M):localStorage.setItem("nexus_games_cache",JSON.stringify(M))},Ae=async _=>{const M=[...e];_.forEach(j=>{if(!M.find($=>$.exePath===j.path)){const $=ys(j.name,j.path),de=j.name.toLowerCase().replace(/[^a-z0-9]/g,"")+Math.floor(Math.random()*100);M.push({...$,id:de})}}),t(M),r(M[M.length-1]),window.electronAPI?await window.electronAPI.saveDatabase(M):localStorage.setItem("nexus_games_cache",JSON.stringify(M))},z=()=>{N.playClickPulse();const _=prompt("Input complete Windows Executable file path (.exe):","C:\\Windows\\notepad.exe");if(!_)return;const M=_.split("\\").pop().replace(".exe",""),j=M.toLowerCase().replace(/[^a-z0-9]/g,"")+Math.floor(Math.random()*100),D=ys(M,_),$=[...e,{...D,id:j}];t($),r($[$.length-1]),L(!1),window.electronAPI?window.electronAPI.saveDatabase($):localStorage.setItem("nexus_games_cache",JSON.stringify($))},A=async()=>{t(Je),r(Je[0]),window.electronAPI?await window.electronAPI.saveDatabase(Je):localStorage.removeItem("nexus_games_cache")},U=_=>{N.playClickPulse(),s(_),_==="store"&&d(null)},q=_=>{d(_),s("store-item")},Y=()=>{s("store"),d(null)},lt=async _=>{if(e.find($=>$.id===_.id)){const $=e.map(de=>de.id===_.id?{...de,owned:!0}:de);t($),window.electronAPI?await window.electronAPI.saveDatabase($):localStorage.setItem("nexus_games_cache",JSON.stringify($));return}_.owned=!0;const j={..._,playtime:0,lastPlayed:"Never",progress:0,timeToComplete:"--",nextAchievement:"Locked (0% complete)",exePath:"",isFavorite:!1,owned:!0},D=[...e,j];t(D),r(j),window.electronAPI?await window.electronAPI.saveDatabase(D):localStorage.setItem("nexus_games_cache",JSON.stringify(D))},ue=async(_,M)=>{const j=e.map($=>$.id===_?{...$,exePath:M}:$);t(j);const D=j.find($=>$.id===_);D&&r(D),window.electronAPI?await window.electronAPI.saveDatabase(j):localStorage.setItem("nexus_games_cache",JSON.stringify(j))},at=()=>e.filter(_=>_.title.toLowerCase().includes(l.toLowerCase())||_.developer.toLowerCase().includes(l.toLowerCase())||_.genre.toLowerCase().includes(l.toLowerCase())),Ve=()=>at().filter(_=>_.isFavorite),it=u0.map(_=>({..._,owned:e.some(M=>M.id===_.id&&M.owned)}));return i.jsxs("div",{className:"app-container",children:[i.jsx(Qf,{theme:V.theme,speedFactor:V.particleSpeed,density:V.particleDensity}),i.jsx(Xf,{searchQuery:l,onSearchChange:a,onOpenSettings:()=>{N.playClickPulse(),u(!0)},cpuUsage:k,ramUsage:F,activeView:o,onViewChange:U}),i.jsxs("main",{className:`main-viewport ${S&&o==="library"?"sidebar-active":""}`,children:[o==="library"&&i.jsxs(i.Fragment,{children:[i.jsx(Jf,{game:n,onLaunch:ke,onToggleFavorite:xt,onEditMetadata:()=>v(!0),onPinSidebar:()=>P(!S),isRunning:m===(n==null?void 0:n.id),isSidebarPinned:S}),i.jsx(Yf,{games:at(),selectedGame:n,onSelectGame:r,onLaunchGame:ke,runningGameId:m})]}),o==="favourites"&&i.jsx(s0,{games:Ve(),selectedGame:n,onSelectGame:r,onLaunchGame:ke,onToggleFavorite:xt,onReturnToLibrary:()=>U("library"),runningGameId:m}),o==="store"&&i.jsx(a0,{catalog:it,ownedGames:e,onSelectItem:q,searchQuery:l}),o==="store-item"&&i.jsx(o0,{item:c,ownedGames:e,onBack:Y,onMarkOwned:lt,onLinkExe:ue,onLaunch:ke})]}),i.jsx(Zf,{isOpen:w,onToggle:()=>L(!w),onOpenSettings:()=>u(!0),onManualImport:z,onImportScannedGames:Ae,cpuUsage:k,ramUsage:F}),S&&i.jsx(e0,{game:n,onClose:()=>P(!1),isRunning:m===(n==null?void 0:n.id),sessionTime:f,cpuUsage:k,ramUsage:F}),h&&i.jsx(n0,{settings:V,onUpdateSettings:ge,onResetDatabase:A,gamesCount:e.length,onClose:()=>u(!1)}),p&&i.jsx(t0,{game:n,onSave:Ye,onClose:()=>v(!1)})]})}fa.createRoot(document.getElementById("root")).render(i.jsx(ad.StrictMode,{children:i.jsx(d0,{})}));
