(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const a of l)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(l){const a={};return l.integrity&&(a.integrity=l.integrity),l.referrerPolicy&&(a.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?a.credentials="include":l.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(l){if(l.ep)return;l.ep=!0;const a=n(l);fetch(l.href,a)}})();function Gu(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var js={exports:{}},El={},Ns={exports:{}},H={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var wr=Symbol.for("react.element"),Wu=Symbol.for("react.portal"),Xu=Symbol.for("react.fragment"),Qu=Symbol.for("react.strict_mode"),Yu=Symbol.for("react.profiler"),Ku=Symbol.for("react.provider"),Ju=Symbol.for("react.context"),Zu=Symbol.for("react.forward_ref"),ed=Symbol.for("react.suspense"),td=Symbol.for("react.memo"),nd=Symbol.for("react.lazy"),co=Symbol.iterator;function rd(e){return e===null||typeof e!="object"?null:(e=co&&e[co]||e["@@iterator"],typeof e=="function"?e:null)}var Cs={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Ps=Object.assign,zs={};function An(e,t,n){this.props=e,this.context=t,this.refs=zs,this.updater=n||Cs}An.prototype.isReactComponent={};An.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};An.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Es(){}Es.prototype=An.prototype;function fi(e,t,n){this.props=e,this.context=t,this.refs=zs,this.updater=n||Cs}var hi=fi.prototype=new Es;hi.constructor=fi;Ps(hi,An.prototype);hi.isPureReactComponent=!0;var uo=Array.isArray,Ts=Object.prototype.hasOwnProperty,mi={current:null},Ms={key:!0,ref:!0,__self:!0,__source:!0};function As(e,t,n){var r,l={},a=null,o=null;if(t!=null)for(r in t.ref!==void 0&&(o=t.ref),t.key!==void 0&&(a=""+t.key),t)Ts.call(t,r)&&!Ms.hasOwnProperty(r)&&(l[r]=t[r]);var s=arguments.length-2;if(s===1)l.children=n;else if(1<s){for(var c=Array(s),d=0;d<s;d++)c[d]=arguments[d+2];l.children=c}if(e&&e.defaultProps)for(r in s=e.defaultProps,s)l[r]===void 0&&(l[r]=s[r]);return{$$typeof:wr,type:e,key:a,ref:o,props:l,_owner:mi.current}}function ld(e,t){return{$$typeof:wr,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function gi(e){return typeof e=="object"&&e!==null&&e.$$typeof===wr}function ad(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var po=/\/+/g;function Wl(e,t){return typeof e=="object"&&e!==null&&e.key!=null?ad(""+e.key):t.toString(36)}function qr(e,t,n,r,l){var a=typeof e;(a==="undefined"||a==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(a){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case wr:case Wu:o=!0}}if(o)return o=e,l=l(o),e=r===""?"."+Wl(o,0):r,uo(l)?(n="",e!=null&&(n=e.replace(po,"$&/")+"/"),qr(l,t,n,"",function(d){return d})):l!=null&&(gi(l)&&(l=ld(l,n+(!l.key||o&&o.key===l.key?"":(""+l.key).replace(po,"$&/")+"/")+e)),t.push(l)),1;if(o=0,r=r===""?".":r+":",uo(e))for(var s=0;s<e.length;s++){a=e[s];var c=r+Wl(a,s);o+=qr(a,t,n,c,l)}else if(c=rd(e),typeof c=="function")for(e=c.call(e),s=0;!(a=e.next()).done;)a=a.value,c=r+Wl(a,s++),o+=qr(a,t,n,c,l);else if(a==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return o}function zr(e,t,n){if(e==null)return e;var r=[],l=0;return qr(e,r,"","",function(a){return t.call(n,a,l++)}),r}function id(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var be={current:null},Gr={transition:null},od={ReactCurrentDispatcher:be,ReactCurrentBatchConfig:Gr,ReactCurrentOwner:mi};function _s(){throw Error("act(...) is not supported in production builds of React.")}H.Children={map:zr,forEach:function(e,t,n){zr(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return zr(e,function(){t++}),t},toArray:function(e){return zr(e,function(t){return t})||[]},only:function(e){if(!gi(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};H.Component=An;H.Fragment=Xu;H.Profiler=Yu;H.PureComponent=fi;H.StrictMode=Qu;H.Suspense=ed;H.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=od;H.act=_s;H.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Ps({},e.props),l=e.key,a=e.ref,o=e._owner;if(t!=null){if(t.ref!==void 0&&(a=t.ref,o=mi.current),t.key!==void 0&&(l=""+t.key),e.type&&e.type.defaultProps)var s=e.type.defaultProps;for(c in t)Ts.call(t,c)&&!Ms.hasOwnProperty(c)&&(r[c]=t[c]===void 0&&s!==void 0?s[c]:t[c])}var c=arguments.length-2;if(c===1)r.children=n;else if(1<c){s=Array(c);for(var d=0;d<c;d++)s[d]=arguments[d+2];r.children=s}return{$$typeof:wr,type:e.type,key:l,ref:a,props:r,_owner:o}};H.createContext=function(e){return e={$$typeof:Ju,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Ku,_context:e},e.Consumer=e};H.createElement=As;H.createFactory=function(e){var t=As.bind(null,e);return t.type=e,t};H.createRef=function(){return{current:null}};H.forwardRef=function(e){return{$$typeof:Zu,render:e}};H.isValidElement=gi;H.lazy=function(e){return{$$typeof:nd,_payload:{_status:-1,_result:e},_init:id}};H.memo=function(e,t){return{$$typeof:td,type:e,compare:t===void 0?null:t}};H.startTransition=function(e){var t=Gr.transition;Gr.transition={};try{e()}finally{Gr.transition=t}};H.unstable_act=_s;H.useCallback=function(e,t){return be.current.useCallback(e,t)};H.useContext=function(e){return be.current.useContext(e)};H.useDebugValue=function(){};H.useDeferredValue=function(e){return be.current.useDeferredValue(e)};H.useEffect=function(e,t){return be.current.useEffect(e,t)};H.useId=function(){return be.current.useId()};H.useImperativeHandle=function(e,t,n){return be.current.useImperativeHandle(e,t,n)};H.useInsertionEffect=function(e,t){return be.current.useInsertionEffect(e,t)};H.useLayoutEffect=function(e,t){return be.current.useLayoutEffect(e,t)};H.useMemo=function(e,t){return be.current.useMemo(e,t)};H.useReducer=function(e,t,n){return be.current.useReducer(e,t,n)};H.useRef=function(e){return be.current.useRef(e)};H.useState=function(e){return be.current.useState(e)};H.useSyncExternalStore=function(e,t,n){return be.current.useSyncExternalStore(e,t,n)};H.useTransition=function(){return be.current.useTransition()};H.version="18.3.1";Ns.exports=H;var z=Ns.exports;const sd=Gu(z);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var cd=z,ud=Symbol.for("react.element"),dd=Symbol.for("react.fragment"),pd=Object.prototype.hasOwnProperty,fd=cd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,hd={key:!0,ref:!0,__self:!0,__source:!0};function Ls(e,t,n){var r,l={},a=null,o=null;n!==void 0&&(a=""+n),t.key!==void 0&&(a=""+t.key),t.ref!==void 0&&(o=t.ref);for(r in t)pd.call(t,r)&&!hd.hasOwnProperty(r)&&(l[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)l[r]===void 0&&(l[r]=t[r]);return{$$typeof:ud,type:e,key:a,ref:o,props:l,_owner:fd.current}}El.Fragment=dd;El.jsx=Ls;El.jsxs=Ls;js.exports=El;var i=js.exports,va={},Is={exports:{}},Le={},Ds={exports:{}},Rs={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(P,I){var U=P.length;P.push(I);e:for(;0<U;){var B=U-1>>>1,Q=P[B];if(0<l(Q,I))P[B]=I,P[U]=Q,U=B;else break e}}function n(P){return P.length===0?null:P[0]}function r(P){if(P.length===0)return null;var I=P[0],U=P.pop();if(U!==I){P[0]=U;e:for(var B=0,Q=P.length,Re=Q>>>1;B<Re;){var Ue=2*(B+1)-1,ct=P[Ue],Fe=Ue+1,We=P[Fe];if(0>l(ct,U))Fe<Q&&0>l(We,ct)?(P[B]=We,P[Fe]=U,B=Fe):(P[B]=ct,P[Ue]=U,B=Ue);else if(Fe<Q&&0>l(We,U))P[B]=We,P[Fe]=U,B=Fe;else break e}}return I}function l(P,I){var U=P.sortIndex-I.sortIndex;return U!==0?U:P.id-I.id}if(typeof performance=="object"&&typeof performance.now=="function"){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],d=[],m=1,g=null,h=3,y=!1,x=!1,w=!1,L=typeof setTimeout=="function"?setTimeout:null,f=typeof clearTimeout=="function"?clearTimeout:null,u=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function p(P){for(var I=n(d);I!==null;){if(I.callback===null)r(d);else if(I.startTime<=P)r(d),I.sortIndex=I.expirationTime,t(c,I);else break;I=n(d)}}function v(P){if(w=!1,p(P),!x)if(n(c)!==null)x=!0,Ht(S);else{var I=n(d);I!==null&&wt(v,I.startTime-P)}}function S(P,I){x=!1,w&&(w=!1,f(b),b=-1),y=!0;var U=h;try{for(p(I),g=n(c);g!==null&&(!(g.expirationTime>I)||P&&!Z());){var B=g.callback;if(typeof B=="function"){g.callback=null,h=g.priorityLevel;var Q=B(g.expirationTime<=I);I=e.unstable_now(),typeof Q=="function"?g.callback=Q:g===n(c)&&r(c),p(I)}else r(c);g=n(c)}if(g!==null)var Re=!0;else{var Ue=n(d);Ue!==null&&wt(v,Ue.startTime-I),Re=!1}return Re}finally{g=null,h=U,y=!1}}var C=!1,N=null,b=-1,R=5,_=-1;function Z(){return!(e.unstable_now()-_<R)}function me(){if(N!==null){var P=e.unstable_now();_=P;var I=!0;try{I=N(!0,P)}finally{I?oe():(C=!1,N=null)}}else C=!1}var oe;if(typeof u=="function")oe=function(){u(me)};else if(typeof MessageChannel<"u"){var nt=new MessageChannel,De=nt.port2;nt.port1.onmessage=me,oe=function(){De.postMessage(null)}}else oe=function(){L(me,0)};function Ht(P){N=P,C||(C=!0,oe())}function wt(P,I){b=L(function(){P(e.unstable_now())},I)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(P){P.callback=null},e.unstable_continueExecution=function(){x||y||(x=!0,Ht(S))},e.unstable_forceFrameRate=function(P){0>P||125<P?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):R=0<P?Math.floor(1e3/P):5},e.unstable_getCurrentPriorityLevel=function(){return h},e.unstable_getFirstCallbackNode=function(){return n(c)},e.unstable_next=function(P){switch(h){case 1:case 2:case 3:var I=3;break;default:I=h}var U=h;h=I;try{return P()}finally{h=U}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(P,I){switch(P){case 1:case 2:case 3:case 4:case 5:break;default:P=3}var U=h;h=P;try{return I()}finally{h=U}},e.unstable_scheduleCallback=function(P,I,U){var B=e.unstable_now();switch(typeof U=="object"&&U!==null?(U=U.delay,U=typeof U=="number"&&0<U?B+U:B):U=B,P){case 1:var Q=-1;break;case 2:Q=250;break;case 5:Q=1073741823;break;case 4:Q=1e4;break;default:Q=5e3}return Q=U+Q,P={id:m++,callback:I,priorityLevel:P,startTime:U,expirationTime:Q,sortIndex:-1},U>B?(P.sortIndex=U,t(d,P),n(c)===null&&P===n(d)&&(w?(f(b),b=-1):w=!0,wt(v,U-B))):(P.sortIndex=Q,t(c,P),x||y||(x=!0,Ht(S))),P},e.unstable_shouldYield=Z,e.unstable_wrapCallback=function(P){var I=h;return function(){var U=h;h=I;try{return P.apply(this,arguments)}finally{h=U}}}})(Rs);Ds.exports=Rs;var md=Ds.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var gd=z,_e=md;function k(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Us=new Set,rr={};function nn(e,t){Nn(e,t),Nn(e+"Capture",t)}function Nn(e,t){for(rr[e]=t,e=0;e<t.length;e++)Us.add(t[e])}var mt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),wa=Object.prototype.hasOwnProperty,xd=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,fo={},ho={};function yd(e){return wa.call(ho,e)?!0:wa.call(fo,e)?!1:xd.test(e)?ho[e]=!0:(fo[e]=!0,!1)}function vd(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function wd(e,t,n,r){if(t===null||typeof t>"u"||vd(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Se(e,t,n,r,l,a,o){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=l,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=a,this.removeEmptyString=o}var he={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){he[e]=new Se(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];he[t]=new Se(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){he[e]=new Se(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){he[e]=new Se(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){he[e]=new Se(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){he[e]=new Se(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){he[e]=new Se(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){he[e]=new Se(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){he[e]=new Se(e,5,!1,e.toLowerCase(),null,!1,!1)});var xi=/[\-:]([a-z])/g;function yi(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(xi,yi);he[t]=new Se(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(xi,yi);he[t]=new Se(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(xi,yi);he[t]=new Se(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){he[e]=new Se(e,1,!1,e.toLowerCase(),null,!1,!1)});he.xlinkHref=new Se("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){he[e]=new Se(e,1,!1,e.toLowerCase(),null,!0,!0)});function vi(e,t,n,r){var l=he.hasOwnProperty(t)?he[t]:null;(l!==null?l.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(wd(t,n,l,r)&&(n=null),r||l===null?yd(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):l.mustUseProperty?e[l.propertyName]=n===null?l.type===3?!1:"":n:(t=l.attributeName,r=l.attributeNamespace,n===null?e.removeAttribute(t):(l=l.type,n=l===3||l===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var vt=gd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Er=Symbol.for("react.element"),on=Symbol.for("react.portal"),sn=Symbol.for("react.fragment"),wi=Symbol.for("react.strict_mode"),ka=Symbol.for("react.profiler"),Fs=Symbol.for("react.provider"),Os=Symbol.for("react.context"),ki=Symbol.for("react.forward_ref"),ba=Symbol.for("react.suspense"),Sa=Symbol.for("react.suspense_list"),bi=Symbol.for("react.memo"),bt=Symbol.for("react.lazy"),Hs=Symbol.for("react.offscreen"),mo=Symbol.iterator;function In(e){return e===null||typeof e!="object"?null:(e=mo&&e[mo]||e["@@iterator"],typeof e=="function"?e:null)}var ne=Object.assign,Xl;function Bn(e){if(Xl===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Xl=t&&t[1]||""}return`
`+Xl+e}var Ql=!1;function Yl(e,t){if(!e||Ql)return"";Ql=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(d){var r=d}Reflect.construct(e,[],t)}else{try{t.call()}catch(d){r=d}e.call(t.prototype)}else{try{throw Error()}catch(d){r=d}e()}}catch(d){if(d&&r&&typeof d.stack=="string"){for(var l=d.stack.split(`
`),a=r.stack.split(`
`),o=l.length-1,s=a.length-1;1<=o&&0<=s&&l[o]!==a[s];)s--;for(;1<=o&&0<=s;o--,s--)if(l[o]!==a[s]){if(o!==1||s!==1)do if(o--,s--,0>s||l[o]!==a[s]){var c=`
`+l[o].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}while(1<=o&&0<=s);break}}}finally{Ql=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Bn(e):""}function kd(e){switch(e.tag){case 5:return Bn(e.type);case 16:return Bn("Lazy");case 13:return Bn("Suspense");case 19:return Bn("SuspenseList");case 0:case 2:case 15:return e=Yl(e.type,!1),e;case 11:return e=Yl(e.type.render,!1),e;case 1:return e=Yl(e.type,!0),e;default:return""}}function ja(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case sn:return"Fragment";case on:return"Portal";case ka:return"Profiler";case wi:return"StrictMode";case ba:return"Suspense";case Sa:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Os:return(e.displayName||"Context")+".Consumer";case Fs:return(e._context.displayName||"Context")+".Provider";case ki:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case bi:return t=e.displayName||null,t!==null?t:ja(e.type)||"Memo";case bt:t=e._payload,e=e._init;try{return ja(e(t))}catch{}}return null}function bd(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ja(t);case 8:return t===wi?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Dt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Vs(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Sd(e){var t=Vs(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var l=n.get,a=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return l.call(this)},set:function(o){r=""+o,a.call(this,o)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Tr(e){e._valueTracker||(e._valueTracker=Sd(e))}function $s(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Vs(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function ll(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Na(e,t){var n=t.checked;return ne({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function go(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Dt(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Bs(e,t){t=t.checked,t!=null&&vi(e,"checked",t,!1)}function Ca(e,t){Bs(e,t);var n=Dt(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Pa(e,t.type,n):t.hasOwnProperty("defaultValue")&&Pa(e,t.type,Dt(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function xo(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Pa(e,t,n){(t!=="number"||ll(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var qn=Array.isArray;function vn(e,t,n,r){if(e=e.options,t){t={};for(var l=0;l<n.length;l++)t["$"+n[l]]=!0;for(n=0;n<e.length;n++)l=t.hasOwnProperty("$"+e[n].value),e[n].selected!==l&&(e[n].selected=l),l&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Dt(n),t=null,l=0;l<e.length;l++){if(e[l].value===n){e[l].selected=!0,r&&(e[l].defaultSelected=!0);return}t!==null||e[l].disabled||(t=e[l])}t!==null&&(t.selected=!0)}}function za(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(k(91));return ne({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function yo(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(k(92));if(qn(n)){if(1<n.length)throw Error(k(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Dt(n)}}function qs(e,t){var n=Dt(t.value),r=Dt(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function vo(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Gs(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Ea(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Gs(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Mr,Ws=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,l){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,l)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Mr=Mr||document.createElement("div"),Mr.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Mr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function lr(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Xn={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},jd=["Webkit","ms","Moz","O"];Object.keys(Xn).forEach(function(e){jd.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Xn[t]=Xn[e]})});function Xs(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Xn.hasOwnProperty(e)&&Xn[e]?(""+t).trim():t+"px"}function Qs(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,l=Xs(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,l):e[n]=l}}var Nd=ne({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Ta(e,t){if(t){if(Nd[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(k(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(k(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(k(61))}if(t.style!=null&&typeof t.style!="object")throw Error(k(62))}}function Ma(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Aa=null;function Si(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var _a=null,wn=null,kn=null;function wo(e){if(e=Sr(e)){if(typeof _a!="function")throw Error(k(280));var t=e.stateNode;t&&(t=Ll(t),_a(e.stateNode,e.type,t))}}function Ys(e){wn?kn?kn.push(e):kn=[e]:wn=e}function Ks(){if(wn){var e=wn,t=kn;if(kn=wn=null,wo(e),t)for(e=0;e<t.length;e++)wo(t[e])}}function Js(e,t){return e(t)}function Zs(){}var Kl=!1;function ec(e,t,n){if(Kl)return e(t,n);Kl=!0;try{return Js(e,t,n)}finally{Kl=!1,(wn!==null||kn!==null)&&(Zs(),Ks())}}function ar(e,t){var n=e.stateNode;if(n===null)return null;var r=Ll(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(k(231,t,typeof n));return n}var La=!1;if(mt)try{var Dn={};Object.defineProperty(Dn,"passive",{get:function(){La=!0}}),window.addEventListener("test",Dn,Dn),window.removeEventListener("test",Dn,Dn)}catch{La=!1}function Cd(e,t,n,r,l,a,o,s,c){var d=Array.prototype.slice.call(arguments,3);try{t.apply(n,d)}catch(m){this.onError(m)}}var Qn=!1,al=null,il=!1,Ia=null,Pd={onError:function(e){Qn=!0,al=e}};function zd(e,t,n,r,l,a,o,s,c){Qn=!1,al=null,Cd.apply(Pd,arguments)}function Ed(e,t,n,r,l,a,o,s,c){if(zd.apply(this,arguments),Qn){if(Qn){var d=al;Qn=!1,al=null}else throw Error(k(198));il||(il=!0,Ia=d)}}function rn(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function tc(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function ko(e){if(rn(e)!==e)throw Error(k(188))}function Td(e){var t=e.alternate;if(!t){if(t=rn(e),t===null)throw Error(k(188));return t!==e?null:e}for(var n=e,r=t;;){var l=n.return;if(l===null)break;var a=l.alternate;if(a===null){if(r=l.return,r!==null){n=r;continue}break}if(l.child===a.child){for(a=l.child;a;){if(a===n)return ko(l),e;if(a===r)return ko(l),t;a=a.sibling}throw Error(k(188))}if(n.return!==r.return)n=l,r=a;else{for(var o=!1,s=l.child;s;){if(s===n){o=!0,n=l,r=a;break}if(s===r){o=!0,r=l,n=a;break}s=s.sibling}if(!o){for(s=a.child;s;){if(s===n){o=!0,n=a,r=l;break}if(s===r){o=!0,r=a,n=l;break}s=s.sibling}if(!o)throw Error(k(189))}}if(n.alternate!==r)throw Error(k(190))}if(n.tag!==3)throw Error(k(188));return n.stateNode.current===n?e:t}function nc(e){return e=Td(e),e!==null?rc(e):null}function rc(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=rc(e);if(t!==null)return t;e=e.sibling}return null}var lc=_e.unstable_scheduleCallback,bo=_e.unstable_cancelCallback,Md=_e.unstable_shouldYield,Ad=_e.unstable_requestPaint,ae=_e.unstable_now,_d=_e.unstable_getCurrentPriorityLevel,ji=_e.unstable_ImmediatePriority,ac=_e.unstable_UserBlockingPriority,ol=_e.unstable_NormalPriority,Ld=_e.unstable_LowPriority,ic=_e.unstable_IdlePriority,Tl=null,ot=null;function Id(e){if(ot&&typeof ot.onCommitFiberRoot=="function")try{ot.onCommitFiberRoot(Tl,e,void 0,(e.current.flags&128)===128)}catch{}}var Ze=Math.clz32?Math.clz32:Ud,Dd=Math.log,Rd=Math.LN2;function Ud(e){return e>>>=0,e===0?32:31-(Dd(e)/Rd|0)|0}var Ar=64,_r=4194304;function Gn(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function sl(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,l=e.suspendedLanes,a=e.pingedLanes,o=n&268435455;if(o!==0){var s=o&~l;s!==0?r=Gn(s):(a&=o,a!==0&&(r=Gn(a)))}else o=n&~l,o!==0?r=Gn(o):a!==0&&(r=Gn(a));if(r===0)return 0;if(t!==0&&t!==r&&!(t&l)&&(l=r&-r,a=t&-t,l>=a||l===16&&(a&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Ze(t),l=1<<n,r|=e[n],t&=~l;return r}function Fd(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Od(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,l=e.expirationTimes,a=e.pendingLanes;0<a;){var o=31-Ze(a),s=1<<o,c=l[o];c===-1?(!(s&n)||s&r)&&(l[o]=Fd(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}}function Da(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function oc(){var e=Ar;return Ar<<=1,!(Ar&4194240)&&(Ar=64),e}function Jl(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function kr(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Ze(t),e[t]=n}function Hd(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var l=31-Ze(n),a=1<<l;t[l]=0,r[l]=-1,e[l]=-1,n&=~a}}function Ni(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Ze(n),l=1<<r;l&t|e[r]&t&&(e[r]|=t),n&=~l}}var W=0;function sc(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var cc,Ci,uc,dc,pc,Ra=!1,Lr=[],zt=null,Et=null,Tt=null,ir=new Map,or=new Map,jt=[],Vd="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function So(e,t){switch(e){case"focusin":case"focusout":zt=null;break;case"dragenter":case"dragleave":Et=null;break;case"mouseover":case"mouseout":Tt=null;break;case"pointerover":case"pointerout":ir.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":or.delete(t.pointerId)}}function Rn(e,t,n,r,l,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[l]},t!==null&&(t=Sr(t),t!==null&&Ci(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,l!==null&&t.indexOf(l)===-1&&t.push(l),e)}function $d(e,t,n,r,l){switch(t){case"focusin":return zt=Rn(zt,e,t,n,r,l),!0;case"dragenter":return Et=Rn(Et,e,t,n,r,l),!0;case"mouseover":return Tt=Rn(Tt,e,t,n,r,l),!0;case"pointerover":var a=l.pointerId;return ir.set(a,Rn(ir.get(a)||null,e,t,n,r,l)),!0;case"gotpointercapture":return a=l.pointerId,or.set(a,Rn(or.get(a)||null,e,t,n,r,l)),!0}return!1}function fc(e){var t=Gt(e.target);if(t!==null){var n=rn(t);if(n!==null){if(t=n.tag,t===13){if(t=tc(n),t!==null){e.blockedOn=t,pc(e.priority,function(){uc(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Wr(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Ua(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Aa=r,n.target.dispatchEvent(r),Aa=null}else return t=Sr(n),t!==null&&Ci(t),e.blockedOn=n,!1;t.shift()}return!0}function jo(e,t,n){Wr(e)&&n.delete(t)}function Bd(){Ra=!1,zt!==null&&Wr(zt)&&(zt=null),Et!==null&&Wr(Et)&&(Et=null),Tt!==null&&Wr(Tt)&&(Tt=null),ir.forEach(jo),or.forEach(jo)}function Un(e,t){e.blockedOn===t&&(e.blockedOn=null,Ra||(Ra=!0,_e.unstable_scheduleCallback(_e.unstable_NormalPriority,Bd)))}function sr(e){function t(l){return Un(l,e)}if(0<Lr.length){Un(Lr[0],e);for(var n=1;n<Lr.length;n++){var r=Lr[n];r.blockedOn===e&&(r.blockedOn=null)}}for(zt!==null&&Un(zt,e),Et!==null&&Un(Et,e),Tt!==null&&Un(Tt,e),ir.forEach(t),or.forEach(t),n=0;n<jt.length;n++)r=jt[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<jt.length&&(n=jt[0],n.blockedOn===null);)fc(n),n.blockedOn===null&&jt.shift()}var bn=vt.ReactCurrentBatchConfig,cl=!0;function qd(e,t,n,r){var l=W,a=bn.transition;bn.transition=null;try{W=1,Pi(e,t,n,r)}finally{W=l,bn.transition=a}}function Gd(e,t,n,r){var l=W,a=bn.transition;bn.transition=null;try{W=4,Pi(e,t,n,r)}finally{W=l,bn.transition=a}}function Pi(e,t,n,r){if(cl){var l=Ua(e,t,n,r);if(l===null)sa(e,t,r,ul,n),So(e,r);else if($d(l,e,t,n,r))r.stopPropagation();else if(So(e,r),t&4&&-1<Vd.indexOf(e)){for(;l!==null;){var a=Sr(l);if(a!==null&&cc(a),a=Ua(e,t,n,r),a===null&&sa(e,t,r,ul,n),a===l)break;l=a}l!==null&&r.stopPropagation()}else sa(e,t,r,null,n)}}var ul=null;function Ua(e,t,n,r){if(ul=null,e=Si(r),e=Gt(e),e!==null)if(t=rn(e),t===null)e=null;else if(n=t.tag,n===13){if(e=tc(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return ul=e,null}function hc(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(_d()){case ji:return 1;case ac:return 4;case ol:case Ld:return 16;case ic:return 536870912;default:return 16}default:return 16}}var Ct=null,zi=null,Xr=null;function mc(){if(Xr)return Xr;var e,t=zi,n=t.length,r,l="value"in Ct?Ct.value:Ct.textContent,a=l.length;for(e=0;e<n&&t[e]===l[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===l[a-r];r++);return Xr=l.slice(e,1<r?1-r:void 0)}function Qr(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Ir(){return!0}function No(){return!1}function Ie(e){function t(n,r,l,a,o){this._reactName=n,this._targetInst=l,this.type=r,this.nativeEvent=a,this.target=o,this.currentTarget=null;for(var s in e)e.hasOwnProperty(s)&&(n=e[s],this[s]=n?n(a):a[s]);return this.isDefaultPrevented=(a.defaultPrevented!=null?a.defaultPrevented:a.returnValue===!1)?Ir:No,this.isPropagationStopped=No,this}return ne(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Ir)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Ir)},persist:function(){},isPersistent:Ir}),t}var _n={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ei=Ie(_n),br=ne({},_n,{view:0,detail:0}),Wd=Ie(br),Zl,ea,Fn,Ml=ne({},br,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ti,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Fn&&(Fn&&e.type==="mousemove"?(Zl=e.screenX-Fn.screenX,ea=e.screenY-Fn.screenY):ea=Zl=0,Fn=e),Zl)},movementY:function(e){return"movementY"in e?e.movementY:ea}}),Co=Ie(Ml),Xd=ne({},Ml,{dataTransfer:0}),Qd=Ie(Xd),Yd=ne({},br,{relatedTarget:0}),ta=Ie(Yd),Kd=ne({},_n,{animationName:0,elapsedTime:0,pseudoElement:0}),Jd=Ie(Kd),Zd=ne({},_n,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),ep=Ie(Zd),tp=ne({},_n,{data:0}),Po=Ie(tp),np={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},rp={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},lp={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function ap(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=lp[e])?!!t[e]:!1}function Ti(){return ap}var ip=ne({},br,{key:function(e){if(e.key){var t=np[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Qr(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?rp[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ti,charCode:function(e){return e.type==="keypress"?Qr(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Qr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),op=Ie(ip),sp=ne({},Ml,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),zo=Ie(sp),cp=ne({},br,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ti}),up=Ie(cp),dp=ne({},_n,{propertyName:0,elapsedTime:0,pseudoElement:0}),pp=Ie(dp),fp=ne({},Ml,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),hp=Ie(fp),mp=[9,13,27,32],Mi=mt&&"CompositionEvent"in window,Yn=null;mt&&"documentMode"in document&&(Yn=document.documentMode);var gp=mt&&"TextEvent"in window&&!Yn,gc=mt&&(!Mi||Yn&&8<Yn&&11>=Yn),Eo=" ",To=!1;function xc(e,t){switch(e){case"keyup":return mp.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function yc(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var cn=!1;function xp(e,t){switch(e){case"compositionend":return yc(t);case"keypress":return t.which!==32?null:(To=!0,Eo);case"textInput":return e=t.data,e===Eo&&To?null:e;default:return null}}function yp(e,t){if(cn)return e==="compositionend"||!Mi&&xc(e,t)?(e=mc(),Xr=zi=Ct=null,cn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return gc&&t.locale!=="ko"?null:t.data;default:return null}}var vp={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Mo(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!vp[e.type]:t==="textarea"}function vc(e,t,n,r){Ys(r),t=dl(t,"onChange"),0<t.length&&(n=new Ei("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Kn=null,cr=null;function wp(e){Tc(e,0)}function Al(e){var t=pn(e);if($s(t))return e}function kp(e,t){if(e==="change")return t}var wc=!1;if(mt){var na;if(mt){var ra="oninput"in document;if(!ra){var Ao=document.createElement("div");Ao.setAttribute("oninput","return;"),ra=typeof Ao.oninput=="function"}na=ra}else na=!1;wc=na&&(!document.documentMode||9<document.documentMode)}function _o(){Kn&&(Kn.detachEvent("onpropertychange",kc),cr=Kn=null)}function kc(e){if(e.propertyName==="value"&&Al(cr)){var t=[];vc(t,cr,e,Si(e)),ec(wp,t)}}function bp(e,t,n){e==="focusin"?(_o(),Kn=t,cr=n,Kn.attachEvent("onpropertychange",kc)):e==="focusout"&&_o()}function Sp(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Al(cr)}function jp(e,t){if(e==="click")return Al(t)}function Np(e,t){if(e==="input"||e==="change")return Al(t)}function Cp(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var tt=typeof Object.is=="function"?Object.is:Cp;function ur(e,t){if(tt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var l=n[r];if(!wa.call(t,l)||!tt(e[l],t[l]))return!1}return!0}function Lo(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Io(e,t){var n=Lo(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Lo(n)}}function bc(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?bc(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Sc(){for(var e=window,t=ll();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=ll(e.document)}return t}function Ai(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Pp(e){var t=Sc(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&bc(n.ownerDocument.documentElement,n)){if(r!==null&&Ai(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var l=n.textContent.length,a=Math.min(r.start,l);r=r.end===void 0?a:Math.min(r.end,l),!e.extend&&a>r&&(l=r,r=a,a=l),l=Io(n,a);var o=Io(n,r);l&&o&&(e.rangeCount!==1||e.anchorNode!==l.node||e.anchorOffset!==l.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(t=t.createRange(),t.setStart(l.node,l.offset),e.removeAllRanges(),a>r?(e.addRange(t),e.extend(o.node,o.offset)):(t.setEnd(o.node,o.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var zp=mt&&"documentMode"in document&&11>=document.documentMode,un=null,Fa=null,Jn=null,Oa=!1;function Do(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Oa||un==null||un!==ll(r)||(r=un,"selectionStart"in r&&Ai(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Jn&&ur(Jn,r)||(Jn=r,r=dl(Fa,"onSelect"),0<r.length&&(t=new Ei("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=un)))}function Dr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var dn={animationend:Dr("Animation","AnimationEnd"),animationiteration:Dr("Animation","AnimationIteration"),animationstart:Dr("Animation","AnimationStart"),transitionend:Dr("Transition","TransitionEnd")},la={},jc={};mt&&(jc=document.createElement("div").style,"AnimationEvent"in window||(delete dn.animationend.animation,delete dn.animationiteration.animation,delete dn.animationstart.animation),"TransitionEvent"in window||delete dn.transitionend.transition);function _l(e){if(la[e])return la[e];if(!dn[e])return e;var t=dn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in jc)return la[e]=t[n];return e}var Nc=_l("animationend"),Cc=_l("animationiteration"),Pc=_l("animationstart"),zc=_l("transitionend"),Ec=new Map,Ro="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Ut(e,t){Ec.set(e,t),nn(t,[e])}for(var aa=0;aa<Ro.length;aa++){var ia=Ro[aa],Ep=ia.toLowerCase(),Tp=ia[0].toUpperCase()+ia.slice(1);Ut(Ep,"on"+Tp)}Ut(Nc,"onAnimationEnd");Ut(Cc,"onAnimationIteration");Ut(Pc,"onAnimationStart");Ut("dblclick","onDoubleClick");Ut("focusin","onFocus");Ut("focusout","onBlur");Ut(zc,"onTransitionEnd");Nn("onMouseEnter",["mouseout","mouseover"]);Nn("onMouseLeave",["mouseout","mouseover"]);Nn("onPointerEnter",["pointerout","pointerover"]);Nn("onPointerLeave",["pointerout","pointerover"]);nn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));nn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));nn("onBeforeInput",["compositionend","keypress","textInput","paste"]);nn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));nn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));nn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Wn="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Mp=new Set("cancel close invalid load scroll toggle".split(" ").concat(Wn));function Uo(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,Ed(r,t,void 0,e),e.currentTarget=null}function Tc(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],l=r.event;r=r.listeners;e:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,d=s.currentTarget;if(s=s.listener,c!==a&&l.isPropagationStopped())break e;Uo(l,s,d),a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,d=s.currentTarget,s=s.listener,c!==a&&l.isPropagationStopped())break e;Uo(l,s,d),a=c}}}if(il)throw e=Ia,il=!1,Ia=null,e}function Y(e,t){var n=t[qa];n===void 0&&(n=t[qa]=new Set);var r=e+"__bubble";n.has(r)||(Mc(t,e,2,!1),n.add(r))}function oa(e,t,n){var r=0;t&&(r|=4),Mc(n,e,r,t)}var Rr="_reactListening"+Math.random().toString(36).slice(2);function dr(e){if(!e[Rr]){e[Rr]=!0,Us.forEach(function(n){n!=="selectionchange"&&(Mp.has(n)||oa(n,!1,e),oa(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Rr]||(t[Rr]=!0,oa("selectionchange",!1,t))}}function Mc(e,t,n,r){switch(hc(t)){case 1:var l=qd;break;case 4:l=Gd;break;default:l=Pi}n=l.bind(null,t,n,e),l=void 0,!La||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(l=!0),r?l!==void 0?e.addEventListener(t,n,{capture:!0,passive:l}):e.addEventListener(t,n,!0):l!==void 0?e.addEventListener(t,n,{passive:l}):e.addEventListener(t,n,!1)}function sa(e,t,n,r,l){var a=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var s=r.stateNode.containerInfo;if(s===l||s.nodeType===8&&s.parentNode===l)break;if(o===4)for(o=r.return;o!==null;){var c=o.tag;if((c===3||c===4)&&(c=o.stateNode.containerInfo,c===l||c.nodeType===8&&c.parentNode===l))return;o=o.return}for(;s!==null;){if(o=Gt(s),o===null)return;if(c=o.tag,c===5||c===6){r=a=o;continue e}s=s.parentNode}}r=r.return}ec(function(){var d=a,m=Si(n),g=[];e:{var h=Ec.get(e);if(h!==void 0){var y=Ei,x=e;switch(e){case"keypress":if(Qr(n)===0)break e;case"keydown":case"keyup":y=op;break;case"focusin":x="focus",y=ta;break;case"focusout":x="blur",y=ta;break;case"beforeblur":case"afterblur":y=ta;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":y=Co;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":y=Qd;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":y=up;break;case Nc:case Cc:case Pc:y=Jd;break;case zc:y=pp;break;case"scroll":y=Wd;break;case"wheel":y=hp;break;case"copy":case"cut":case"paste":y=ep;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":y=zo}var w=(t&4)!==0,L=!w&&e==="scroll",f=w?h!==null?h+"Capture":null:h;w=[];for(var u=d,p;u!==null;){p=u;var v=p.stateNode;if(p.tag===5&&v!==null&&(p=v,f!==null&&(v=ar(u,f),v!=null&&w.push(pr(u,v,p)))),L)break;u=u.return}0<w.length&&(h=new y(h,x,null,n,m),g.push({event:h,listeners:w}))}}if(!(t&7)){e:{if(h=e==="mouseover"||e==="pointerover",y=e==="mouseout"||e==="pointerout",h&&n!==Aa&&(x=n.relatedTarget||n.fromElement)&&(Gt(x)||x[gt]))break e;if((y||h)&&(h=m.window===m?m:(h=m.ownerDocument)?h.defaultView||h.parentWindow:window,y?(x=n.relatedTarget||n.toElement,y=d,x=x?Gt(x):null,x!==null&&(L=rn(x),x!==L||x.tag!==5&&x.tag!==6)&&(x=null)):(y=null,x=d),y!==x)){if(w=Co,v="onMouseLeave",f="onMouseEnter",u="mouse",(e==="pointerout"||e==="pointerover")&&(w=zo,v="onPointerLeave",f="onPointerEnter",u="pointer"),L=y==null?h:pn(y),p=x==null?h:pn(x),h=new w(v,u+"leave",y,n,m),h.target=L,h.relatedTarget=p,v=null,Gt(m)===d&&(w=new w(f,u+"enter",x,n,m),w.target=p,w.relatedTarget=L,v=w),L=v,y&&x)t:{for(w=y,f=x,u=0,p=w;p;p=ln(p))u++;for(p=0,v=f;v;v=ln(v))p++;for(;0<u-p;)w=ln(w),u--;for(;0<p-u;)f=ln(f),p--;for(;u--;){if(w===f||f!==null&&w===f.alternate)break t;w=ln(w),f=ln(f)}w=null}else w=null;y!==null&&Fo(g,h,y,w,!1),x!==null&&L!==null&&Fo(g,L,x,w,!0)}}e:{if(h=d?pn(d):window,y=h.nodeName&&h.nodeName.toLowerCase(),y==="select"||y==="input"&&h.type==="file")var S=kp;else if(Mo(h))if(wc)S=Np;else{S=Sp;var C=bp}else(y=h.nodeName)&&y.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(S=jp);if(S&&(S=S(e,d))){vc(g,S,n,m);break e}C&&C(e,h,d),e==="focusout"&&(C=h._wrapperState)&&C.controlled&&h.type==="number"&&Pa(h,"number",h.value)}switch(C=d?pn(d):window,e){case"focusin":(Mo(C)||C.contentEditable==="true")&&(un=C,Fa=d,Jn=null);break;case"focusout":Jn=Fa=un=null;break;case"mousedown":Oa=!0;break;case"contextmenu":case"mouseup":case"dragend":Oa=!1,Do(g,n,m);break;case"selectionchange":if(zp)break;case"keydown":case"keyup":Do(g,n,m)}var N;if(Mi)e:{switch(e){case"compositionstart":var b="onCompositionStart";break e;case"compositionend":b="onCompositionEnd";break e;case"compositionupdate":b="onCompositionUpdate";break e}b=void 0}else cn?xc(e,n)&&(b="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(b="onCompositionStart");b&&(gc&&n.locale!=="ko"&&(cn||b!=="onCompositionStart"?b==="onCompositionEnd"&&cn&&(N=mc()):(Ct=m,zi="value"in Ct?Ct.value:Ct.textContent,cn=!0)),C=dl(d,b),0<C.length&&(b=new Po(b,e,null,n,m),g.push({event:b,listeners:C}),N?b.data=N:(N=yc(n),N!==null&&(b.data=N)))),(N=gp?xp(e,n):yp(e,n))&&(d=dl(d,"onBeforeInput"),0<d.length&&(m=new Po("onBeforeInput","beforeinput",null,n,m),g.push({event:m,listeners:d}),m.data=N))}Tc(g,t)})}function pr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function dl(e,t){for(var n=t+"Capture",r=[];e!==null;){var l=e,a=l.stateNode;l.tag===5&&a!==null&&(l=a,a=ar(e,n),a!=null&&r.unshift(pr(e,a,l)),a=ar(e,t),a!=null&&r.push(pr(e,a,l))),e=e.return}return r}function ln(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Fo(e,t,n,r,l){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,d=s.stateNode;if(c!==null&&c===r)break;s.tag===5&&d!==null&&(s=d,l?(c=ar(n,a),c!=null&&o.unshift(pr(n,c,s))):l||(c=ar(n,a),c!=null&&o.push(pr(n,c,s)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Ap=/\r\n?/g,_p=/\u0000|\uFFFD/g;function Oo(e){return(typeof e=="string"?e:""+e).replace(Ap,`
`).replace(_p,"")}function Ur(e,t,n){if(t=Oo(t),Oo(e)!==t&&n)throw Error(k(425))}function pl(){}var Ha=null,Va=null;function $a(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Ba=typeof setTimeout=="function"?setTimeout:void 0,Lp=typeof clearTimeout=="function"?clearTimeout:void 0,Ho=typeof Promise=="function"?Promise:void 0,Ip=typeof queueMicrotask=="function"?queueMicrotask:typeof Ho<"u"?function(e){return Ho.resolve(null).then(e).catch(Dp)}:Ba;function Dp(e){setTimeout(function(){throw e})}function ca(e,t){var n=t,r=0;do{var l=n.nextSibling;if(e.removeChild(n),l&&l.nodeType===8)if(n=l.data,n==="/$"){if(r===0){e.removeChild(l),sr(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=l}while(n);sr(t)}function Mt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Vo(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Ln=Math.random().toString(36).slice(2),it="__reactFiber$"+Ln,fr="__reactProps$"+Ln,gt="__reactContainer$"+Ln,qa="__reactEvents$"+Ln,Rp="__reactListeners$"+Ln,Up="__reactHandles$"+Ln;function Gt(e){var t=e[it];if(t)return t;for(var n=e.parentNode;n;){if(t=n[gt]||n[it]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Vo(e);e!==null;){if(n=e[it])return n;e=Vo(e)}return t}e=n,n=e.parentNode}return null}function Sr(e){return e=e[it]||e[gt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function pn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(k(33))}function Ll(e){return e[fr]||null}var Ga=[],fn=-1;function Ft(e){return{current:e}}function K(e){0>fn||(e.current=Ga[fn],Ga[fn]=null,fn--)}function X(e,t){fn++,Ga[fn]=e.current,e.current=t}var Rt={},ve=Ft(Rt),Pe=Ft(!1),Kt=Rt;function Cn(e,t){var n=e.type.contextTypes;if(!n)return Rt;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var l={},a;for(a in n)l[a]=t[a];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=l),l}function ze(e){return e=e.childContextTypes,e!=null}function fl(){K(Pe),K(ve)}function $o(e,t,n){if(ve.current!==Rt)throw Error(k(168));X(ve,t),X(Pe,n)}function Ac(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var l in r)if(!(l in t))throw Error(k(108,bd(e)||"Unknown",l));return ne({},n,r)}function hl(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Rt,Kt=ve.current,X(ve,e),X(Pe,Pe.current),!0}function Bo(e,t,n){var r=e.stateNode;if(!r)throw Error(k(169));n?(e=Ac(e,t,Kt),r.__reactInternalMemoizedMergedChildContext=e,K(Pe),K(ve),X(ve,e)):K(Pe),X(Pe,n)}var dt=null,Il=!1,ua=!1;function _c(e){dt===null?dt=[e]:dt.push(e)}function Fp(e){Il=!0,_c(e)}function Ot(){if(!ua&&dt!==null){ua=!0;var e=0,t=W;try{var n=dt;for(W=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}dt=null,Il=!1}catch(l){throw dt!==null&&(dt=dt.slice(e+1)),lc(ji,Ot),l}finally{W=t,ua=!1}}return null}var hn=[],mn=0,ml=null,gl=0,Oe=[],He=0,Jt=null,pt=1,ft="";function Bt(e,t){hn[mn++]=gl,hn[mn++]=ml,ml=e,gl=t}function Lc(e,t,n){Oe[He++]=pt,Oe[He++]=ft,Oe[He++]=Jt,Jt=e;var r=pt;e=ft;var l=32-Ze(r)-1;r&=~(1<<l),n+=1;var a=32-Ze(t)+l;if(30<a){var o=l-l%5;a=(r&(1<<o)-1).toString(32),r>>=o,l-=o,pt=1<<32-Ze(t)+l|n<<l|r,ft=a+e}else pt=1<<a|n<<l|r,ft=e}function _i(e){e.return!==null&&(Bt(e,1),Lc(e,1,0))}function Li(e){for(;e===ml;)ml=hn[--mn],hn[mn]=null,gl=hn[--mn],hn[mn]=null;for(;e===Jt;)Jt=Oe[--He],Oe[He]=null,ft=Oe[--He],Oe[He]=null,pt=Oe[--He],Oe[He]=null}var Ae=null,Me=null,J=!1,Je=null;function Ic(e,t){var n=$e(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function qo(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Ae=e,Me=Mt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Ae=e,Me=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Jt!==null?{id:pt,overflow:ft}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=$e(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Ae=e,Me=null,!0):!1;default:return!1}}function Wa(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Xa(e){if(J){var t=Me;if(t){var n=t;if(!qo(e,t)){if(Wa(e))throw Error(k(418));t=Mt(n.nextSibling);var r=Ae;t&&qo(e,t)?Ic(r,n):(e.flags=e.flags&-4097|2,J=!1,Ae=e)}}else{if(Wa(e))throw Error(k(418));e.flags=e.flags&-4097|2,J=!1,Ae=e}}}function Go(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Ae=e}function Fr(e){if(e!==Ae)return!1;if(!J)return Go(e),J=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!$a(e.type,e.memoizedProps)),t&&(t=Me)){if(Wa(e))throw Dc(),Error(k(418));for(;t;)Ic(e,t),t=Mt(t.nextSibling)}if(Go(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(k(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Me=Mt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Me=null}}else Me=Ae?Mt(e.stateNode.nextSibling):null;return!0}function Dc(){for(var e=Me;e;)e=Mt(e.nextSibling)}function Pn(){Me=Ae=null,J=!1}function Ii(e){Je===null?Je=[e]:Je.push(e)}var Op=vt.ReactCurrentBatchConfig;function On(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(k(309));var r=n.stateNode}if(!r)throw Error(k(147,e));var l=r,a=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===a?t.ref:(t=function(o){var s=l.refs;o===null?delete s[a]:s[a]=o},t._stringRef=a,t)}if(typeof e!="string")throw Error(k(284));if(!n._owner)throw Error(k(290,e))}return e}function Or(e,t){throw e=Object.prototype.toString.call(t),Error(k(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Wo(e){var t=e._init;return t(e._payload)}function Rc(e){function t(f,u){if(e){var p=f.deletions;p===null?(f.deletions=[u],f.flags|=16):p.push(u)}}function n(f,u){if(!e)return null;for(;u!==null;)t(f,u),u=u.sibling;return null}function r(f,u){for(f=new Map;u!==null;)u.key!==null?f.set(u.key,u):f.set(u.index,u),u=u.sibling;return f}function l(f,u){return f=It(f,u),f.index=0,f.sibling=null,f}function a(f,u,p){return f.index=p,e?(p=f.alternate,p!==null?(p=p.index,p<u?(f.flags|=2,u):p):(f.flags|=2,u)):(f.flags|=1048576,u)}function o(f){return e&&f.alternate===null&&(f.flags|=2),f}function s(f,u,p,v){return u===null||u.tag!==6?(u=xa(p,f.mode,v),u.return=f,u):(u=l(u,p),u.return=f,u)}function c(f,u,p,v){var S=p.type;return S===sn?m(f,u,p.props.children,v,p.key):u!==null&&(u.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===bt&&Wo(S)===u.type)?(v=l(u,p.props),v.ref=On(f,u,p),v.return=f,v):(v=nl(p.type,p.key,p.props,null,f.mode,v),v.ref=On(f,u,p),v.return=f,v)}function d(f,u,p,v){return u===null||u.tag!==4||u.stateNode.containerInfo!==p.containerInfo||u.stateNode.implementation!==p.implementation?(u=ya(p,f.mode,v),u.return=f,u):(u=l(u,p.children||[]),u.return=f,u)}function m(f,u,p,v,S){return u===null||u.tag!==7?(u=Yt(p,f.mode,v,S),u.return=f,u):(u=l(u,p),u.return=f,u)}function g(f,u,p){if(typeof u=="string"&&u!==""||typeof u=="number")return u=xa(""+u,f.mode,p),u.return=f,u;if(typeof u=="object"&&u!==null){switch(u.$$typeof){case Er:return p=nl(u.type,u.key,u.props,null,f.mode,p),p.ref=On(f,null,u),p.return=f,p;case on:return u=ya(u,f.mode,p),u.return=f,u;case bt:var v=u._init;return g(f,v(u._payload),p)}if(qn(u)||In(u))return u=Yt(u,f.mode,p,null),u.return=f,u;Or(f,u)}return null}function h(f,u,p,v){var S=u!==null?u.key:null;if(typeof p=="string"&&p!==""||typeof p=="number")return S!==null?null:s(f,u,""+p,v);if(typeof p=="object"&&p!==null){switch(p.$$typeof){case Er:return p.key===S?c(f,u,p,v):null;case on:return p.key===S?d(f,u,p,v):null;case bt:return S=p._init,h(f,u,S(p._payload),v)}if(qn(p)||In(p))return S!==null?null:m(f,u,p,v,null);Or(f,p)}return null}function y(f,u,p,v,S){if(typeof v=="string"&&v!==""||typeof v=="number")return f=f.get(p)||null,s(u,f,""+v,S);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case Er:return f=f.get(v.key===null?p:v.key)||null,c(u,f,v,S);case on:return f=f.get(v.key===null?p:v.key)||null,d(u,f,v,S);case bt:var C=v._init;return y(f,u,p,C(v._payload),S)}if(qn(v)||In(v))return f=f.get(p)||null,m(u,f,v,S,null);Or(u,v)}return null}function x(f,u,p,v){for(var S=null,C=null,N=u,b=u=0,R=null;N!==null&&b<p.length;b++){N.index>b?(R=N,N=null):R=N.sibling;var _=h(f,N,p[b],v);if(_===null){N===null&&(N=R);break}e&&N&&_.alternate===null&&t(f,N),u=a(_,u,b),C===null?S=_:C.sibling=_,C=_,N=R}if(b===p.length)return n(f,N),J&&Bt(f,b),S;if(N===null){for(;b<p.length;b++)N=g(f,p[b],v),N!==null&&(u=a(N,u,b),C===null?S=N:C.sibling=N,C=N);return J&&Bt(f,b),S}for(N=r(f,N);b<p.length;b++)R=y(N,f,b,p[b],v),R!==null&&(e&&R.alternate!==null&&N.delete(R.key===null?b:R.key),u=a(R,u,b),C===null?S=R:C.sibling=R,C=R);return e&&N.forEach(function(Z){return t(f,Z)}),J&&Bt(f,b),S}function w(f,u,p,v){var S=In(p);if(typeof S!="function")throw Error(k(150));if(p=S.call(p),p==null)throw Error(k(151));for(var C=S=null,N=u,b=u=0,R=null,_=p.next();N!==null&&!_.done;b++,_=p.next()){N.index>b?(R=N,N=null):R=N.sibling;var Z=h(f,N,_.value,v);if(Z===null){N===null&&(N=R);break}e&&N&&Z.alternate===null&&t(f,N),u=a(Z,u,b),C===null?S=Z:C.sibling=Z,C=Z,N=R}if(_.done)return n(f,N),J&&Bt(f,b),S;if(N===null){for(;!_.done;b++,_=p.next())_=g(f,_.value,v),_!==null&&(u=a(_,u,b),C===null?S=_:C.sibling=_,C=_);return J&&Bt(f,b),S}for(N=r(f,N);!_.done;b++,_=p.next())_=y(N,f,b,_.value,v),_!==null&&(e&&_.alternate!==null&&N.delete(_.key===null?b:_.key),u=a(_,u,b),C===null?S=_:C.sibling=_,C=_);return e&&N.forEach(function(me){return t(f,me)}),J&&Bt(f,b),S}function L(f,u,p,v){if(typeof p=="object"&&p!==null&&p.type===sn&&p.key===null&&(p=p.props.children),typeof p=="object"&&p!==null){switch(p.$$typeof){case Er:e:{for(var S=p.key,C=u;C!==null;){if(C.key===S){if(S=p.type,S===sn){if(C.tag===7){n(f,C.sibling),u=l(C,p.props.children),u.return=f,f=u;break e}}else if(C.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===bt&&Wo(S)===C.type){n(f,C.sibling),u=l(C,p.props),u.ref=On(f,C,p),u.return=f,f=u;break e}n(f,C);break}else t(f,C);C=C.sibling}p.type===sn?(u=Yt(p.props.children,f.mode,v,p.key),u.return=f,f=u):(v=nl(p.type,p.key,p.props,null,f.mode,v),v.ref=On(f,u,p),v.return=f,f=v)}return o(f);case on:e:{for(C=p.key;u!==null;){if(u.key===C)if(u.tag===4&&u.stateNode.containerInfo===p.containerInfo&&u.stateNode.implementation===p.implementation){n(f,u.sibling),u=l(u,p.children||[]),u.return=f,f=u;break e}else{n(f,u);break}else t(f,u);u=u.sibling}u=ya(p,f.mode,v),u.return=f,f=u}return o(f);case bt:return C=p._init,L(f,u,C(p._payload),v)}if(qn(p))return x(f,u,p,v);if(In(p))return w(f,u,p,v);Or(f,p)}return typeof p=="string"&&p!==""||typeof p=="number"?(p=""+p,u!==null&&u.tag===6?(n(f,u.sibling),u=l(u,p),u.return=f,f=u):(n(f,u),u=xa(p,f.mode,v),u.return=f,f=u),o(f)):n(f,u)}return L}var zn=Rc(!0),Uc=Rc(!1),xl=Ft(null),yl=null,gn=null,Di=null;function Ri(){Di=gn=yl=null}function Ui(e){var t=xl.current;K(xl),e._currentValue=t}function Qa(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Sn(e,t){yl=e,Di=gn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(Ce=!0),e.firstContext=null)}function qe(e){var t=e._currentValue;if(Di!==e)if(e={context:e,memoizedValue:t,next:null},gn===null){if(yl===null)throw Error(k(308));gn=e,yl.dependencies={lanes:0,firstContext:e}}else gn=gn.next=e;return t}var Wt=null;function Fi(e){Wt===null?Wt=[e]:Wt.push(e)}function Fc(e,t,n,r){var l=t.interleaved;return l===null?(n.next=n,Fi(t)):(n.next=l.next,l.next=n),t.interleaved=n,xt(e,r)}function xt(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var St=!1;function Oi(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Oc(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function ht(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function At(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,V&2){var l=r.pending;return l===null?t.next=t:(t.next=l.next,l.next=t),r.pending=t,xt(e,n)}return l=r.interleaved,l===null?(t.next=t,Fi(r)):(t.next=l.next,l.next=t),r.interleaved=t,xt(e,n)}function Yr(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Ni(e,n)}}function Xo(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var l=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};a===null?l=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?l=a=t:a=a.next=t}else l=a=t;n={baseState:r.baseState,firstBaseUpdate:l,lastBaseUpdate:a,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function vl(e,t,n,r){var l=e.updateQueue;St=!1;var a=l.firstBaseUpdate,o=l.lastBaseUpdate,s=l.shared.pending;if(s!==null){l.shared.pending=null;var c=s,d=c.next;c.next=null,o===null?a=d:o.next=d,o=c;var m=e.alternate;m!==null&&(m=m.updateQueue,s=m.lastBaseUpdate,s!==o&&(s===null?m.firstBaseUpdate=d:s.next=d,m.lastBaseUpdate=c))}if(a!==null){var g=l.baseState;o=0,m=d=c=null,s=a;do{var h=s.lane,y=s.eventTime;if((r&h)===h){m!==null&&(m=m.next={eventTime:y,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var x=e,w=s;switch(h=t,y=n,w.tag){case 1:if(x=w.payload,typeof x=="function"){g=x.call(y,g,h);break e}g=x;break e;case 3:x.flags=x.flags&-65537|128;case 0:if(x=w.payload,h=typeof x=="function"?x.call(y,g,h):x,h==null)break e;g=ne({},g,h);break e;case 2:St=!0}}s.callback!==null&&s.lane!==0&&(e.flags|=64,h=l.effects,h===null?l.effects=[s]:h.push(s))}else y={eventTime:y,lane:h,tag:s.tag,payload:s.payload,callback:s.callback,next:null},m===null?(d=m=y,c=g):m=m.next=y,o|=h;if(s=s.next,s===null){if(s=l.shared.pending,s===null)break;h=s,s=h.next,h.next=null,l.lastBaseUpdate=h,l.shared.pending=null}}while(!0);if(m===null&&(c=g),l.baseState=c,l.firstBaseUpdate=d,l.lastBaseUpdate=m,t=l.shared.interleaved,t!==null){l=t;do o|=l.lane,l=l.next;while(l!==t)}else a===null&&(l.shared.lanes=0);en|=o,e.lanes=o,e.memoizedState=g}}function Qo(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],l=r.callback;if(l!==null){if(r.callback=null,r=n,typeof l!="function")throw Error(k(191,l));l.call(r)}}}var jr={},st=Ft(jr),hr=Ft(jr),mr=Ft(jr);function Xt(e){if(e===jr)throw Error(k(174));return e}function Hi(e,t){switch(X(mr,t),X(hr,e),X(st,jr),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Ea(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Ea(t,e)}K(st),X(st,t)}function En(){K(st),K(hr),K(mr)}function Hc(e){Xt(mr.current);var t=Xt(st.current),n=Ea(t,e.type);t!==n&&(X(hr,e),X(st,n))}function Vi(e){hr.current===e&&(K(st),K(hr))}var ee=Ft(0);function wl(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var da=[];function $i(){for(var e=0;e<da.length;e++)da[e]._workInProgressVersionPrimary=null;da.length=0}var Kr=vt.ReactCurrentDispatcher,pa=vt.ReactCurrentBatchConfig,Zt=0,te=null,se=null,ue=null,kl=!1,Zn=!1,gr=0,Hp=0;function ge(){throw Error(k(321))}function Bi(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!tt(e[n],t[n]))return!1;return!0}function qi(e,t,n,r,l,a){if(Zt=a,te=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Kr.current=e===null||e.memoizedState===null?qp:Gp,e=n(r,l),Zn){a=0;do{if(Zn=!1,gr=0,25<=a)throw Error(k(301));a+=1,ue=se=null,t.updateQueue=null,Kr.current=Wp,e=n(r,l)}while(Zn)}if(Kr.current=bl,t=se!==null&&se.next!==null,Zt=0,ue=se=te=null,kl=!1,t)throw Error(k(300));return e}function Gi(){var e=gr!==0;return gr=0,e}function at(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ue===null?te.memoizedState=ue=e:ue=ue.next=e,ue}function Ge(){if(se===null){var e=te.alternate;e=e!==null?e.memoizedState:null}else e=se.next;var t=ue===null?te.memoizedState:ue.next;if(t!==null)ue=t,se=e;else{if(e===null)throw Error(k(310));se=e,e={memoizedState:se.memoizedState,baseState:se.baseState,baseQueue:se.baseQueue,queue:se.queue,next:null},ue===null?te.memoizedState=ue=e:ue=ue.next=e}return ue}function xr(e,t){return typeof t=="function"?t(e):t}function fa(e){var t=Ge(),n=t.queue;if(n===null)throw Error(k(311));n.lastRenderedReducer=e;var r=se,l=r.baseQueue,a=n.pending;if(a!==null){if(l!==null){var o=l.next;l.next=a.next,a.next=o}r.baseQueue=l=a,n.pending=null}if(l!==null){a=l.next,r=r.baseState;var s=o=null,c=null,d=a;do{var m=d.lane;if((Zt&m)===m)c!==null&&(c=c.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),r=d.hasEagerState?d.eagerState:e(r,d.action);else{var g={lane:m,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};c===null?(s=c=g,o=r):c=c.next=g,te.lanes|=m,en|=m}d=d.next}while(d!==null&&d!==a);c===null?o=r:c.next=s,tt(r,t.memoizedState)||(Ce=!0),t.memoizedState=r,t.baseState=o,t.baseQueue=c,n.lastRenderedState=r}if(e=n.interleaved,e!==null){l=e;do a=l.lane,te.lanes|=a,en|=a,l=l.next;while(l!==e)}else l===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function ha(e){var t=Ge(),n=t.queue;if(n===null)throw Error(k(311));n.lastRenderedReducer=e;var r=n.dispatch,l=n.pending,a=t.memoizedState;if(l!==null){n.pending=null;var o=l=l.next;do a=e(a,o.action),o=o.next;while(o!==l);tt(a,t.memoizedState)||(Ce=!0),t.memoizedState=a,t.baseQueue===null&&(t.baseState=a),n.lastRenderedState=a}return[a,r]}function Vc(){}function $c(e,t){var n=te,r=Ge(),l=t(),a=!tt(r.memoizedState,l);if(a&&(r.memoizedState=l,Ce=!0),r=r.queue,Wi(Gc.bind(null,n,r,e),[e]),r.getSnapshot!==t||a||ue!==null&&ue.memoizedState.tag&1){if(n.flags|=2048,yr(9,qc.bind(null,n,r,l,t),void 0,null),de===null)throw Error(k(349));Zt&30||Bc(n,t,l)}return l}function Bc(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=te.updateQueue,t===null?(t={lastEffect:null,stores:null},te.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function qc(e,t,n,r){t.value=n,t.getSnapshot=r,Wc(t)&&Xc(e)}function Gc(e,t,n){return n(function(){Wc(t)&&Xc(e)})}function Wc(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!tt(e,n)}catch{return!0}}function Xc(e){var t=xt(e,1);t!==null&&et(t,e,1,-1)}function Yo(e){var t=at();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:xr,lastRenderedState:e},t.queue=e,e=e.dispatch=Bp.bind(null,te,e),[t.memoizedState,e]}function yr(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=te.updateQueue,t===null?(t={lastEffect:null,stores:null},te.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Qc(){return Ge().memoizedState}function Jr(e,t,n,r){var l=at();te.flags|=e,l.memoizedState=yr(1|t,n,void 0,r===void 0?null:r)}function Dl(e,t,n,r){var l=Ge();r=r===void 0?null:r;var a=void 0;if(se!==null){var o=se.memoizedState;if(a=o.destroy,r!==null&&Bi(r,o.deps)){l.memoizedState=yr(t,n,a,r);return}}te.flags|=e,l.memoizedState=yr(1|t,n,a,r)}function Ko(e,t){return Jr(8390656,8,e,t)}function Wi(e,t){return Dl(2048,8,e,t)}function Yc(e,t){return Dl(4,2,e,t)}function Kc(e,t){return Dl(4,4,e,t)}function Jc(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Zc(e,t,n){return n=n!=null?n.concat([e]):null,Dl(4,4,Jc.bind(null,t,e),n)}function Xi(){}function eu(e,t){var n=Ge();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Bi(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function tu(e,t){var n=Ge();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Bi(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function nu(e,t,n){return Zt&21?(tt(n,t)||(n=oc(),te.lanes|=n,en|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,Ce=!0),e.memoizedState=n)}function Vp(e,t){var n=W;W=n!==0&&4>n?n:4,e(!0);var r=pa.transition;pa.transition={};try{e(!1),t()}finally{W=n,pa.transition=r}}function ru(){return Ge().memoizedState}function $p(e,t,n){var r=Lt(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},lu(e))au(t,n);else if(n=Fc(e,t,n,r),n!==null){var l=ke();et(n,e,r,l),iu(n,t,r)}}function Bp(e,t,n){var r=Lt(e),l={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(lu(e))au(t,l);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(l.hasEagerState=!0,l.eagerState=s,tt(s,o)){var c=t.interleaved;c===null?(l.next=l,Fi(t)):(l.next=c.next,c.next=l),t.interleaved=l;return}}catch{}finally{}n=Fc(e,t,l,r),n!==null&&(l=ke(),et(n,e,r,l),iu(n,t,r))}}function lu(e){var t=e.alternate;return e===te||t!==null&&t===te}function au(e,t){Zn=kl=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function iu(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Ni(e,n)}}var bl={readContext:qe,useCallback:ge,useContext:ge,useEffect:ge,useImperativeHandle:ge,useInsertionEffect:ge,useLayoutEffect:ge,useMemo:ge,useReducer:ge,useRef:ge,useState:ge,useDebugValue:ge,useDeferredValue:ge,useTransition:ge,useMutableSource:ge,useSyncExternalStore:ge,useId:ge,unstable_isNewReconciler:!1},qp={readContext:qe,useCallback:function(e,t){return at().memoizedState=[e,t===void 0?null:t],e},useContext:qe,useEffect:Ko,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Jr(4194308,4,Jc.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Jr(4194308,4,e,t)},useInsertionEffect:function(e,t){return Jr(4,2,e,t)},useMemo:function(e,t){var n=at();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=at();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=$p.bind(null,te,e),[r.memoizedState,e]},useRef:function(e){var t=at();return e={current:e},t.memoizedState=e},useState:Yo,useDebugValue:Xi,useDeferredValue:function(e){return at().memoizedState=e},useTransition:function(){var e=Yo(!1),t=e[0];return e=Vp.bind(null,e[1]),at().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=te,l=at();if(J){if(n===void 0)throw Error(k(407));n=n()}else{if(n=t(),de===null)throw Error(k(349));Zt&30||Bc(r,t,n)}l.memoizedState=n;var a={value:n,getSnapshot:t};return l.queue=a,Ko(Gc.bind(null,r,a,e),[e]),r.flags|=2048,yr(9,qc.bind(null,r,a,n,t),void 0,null),n},useId:function(){var e=at(),t=de.identifierPrefix;if(J){var n=ft,r=pt;n=(r&~(1<<32-Ze(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=gr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Hp++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Gp={readContext:qe,useCallback:eu,useContext:qe,useEffect:Wi,useImperativeHandle:Zc,useInsertionEffect:Yc,useLayoutEffect:Kc,useMemo:tu,useReducer:fa,useRef:Qc,useState:function(){return fa(xr)},useDebugValue:Xi,useDeferredValue:function(e){var t=Ge();return nu(t,se.memoizedState,e)},useTransition:function(){var e=fa(xr)[0],t=Ge().memoizedState;return[e,t]},useMutableSource:Vc,useSyncExternalStore:$c,useId:ru,unstable_isNewReconciler:!1},Wp={readContext:qe,useCallback:eu,useContext:qe,useEffect:Wi,useImperativeHandle:Zc,useInsertionEffect:Yc,useLayoutEffect:Kc,useMemo:tu,useReducer:ha,useRef:Qc,useState:function(){return ha(xr)},useDebugValue:Xi,useDeferredValue:function(e){var t=Ge();return se===null?t.memoizedState=e:nu(t,se.memoizedState,e)},useTransition:function(){var e=ha(xr)[0],t=Ge().memoizedState;return[e,t]},useMutableSource:Vc,useSyncExternalStore:$c,useId:ru,unstable_isNewReconciler:!1};function Ye(e,t){if(e&&e.defaultProps){t=ne({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Ya(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:ne({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Rl={isMounted:function(e){return(e=e._reactInternals)?rn(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=ke(),l=Lt(e),a=ht(r,l);a.payload=t,n!=null&&(a.callback=n),t=At(e,a,l),t!==null&&(et(t,e,l,r),Yr(t,e,l))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=ke(),l=Lt(e),a=ht(r,l);a.tag=1,a.payload=t,n!=null&&(a.callback=n),t=At(e,a,l),t!==null&&(et(t,e,l,r),Yr(t,e,l))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=ke(),r=Lt(e),l=ht(n,r);l.tag=2,t!=null&&(l.callback=t),t=At(e,l,r),t!==null&&(et(t,e,r,n),Yr(t,e,r))}};function Jo(e,t,n,r,l,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!ur(n,r)||!ur(l,a):!0}function ou(e,t,n){var r=!1,l=Rt,a=t.contextType;return typeof a=="object"&&a!==null?a=qe(a):(l=ze(t)?Kt:ve.current,r=t.contextTypes,a=(r=r!=null)?Cn(e,l):Rt),t=new t(n,a),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Rl,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=l,e.__reactInternalMemoizedMaskedChildContext=a),t}function Zo(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Rl.enqueueReplaceState(t,t.state,null)}function Ka(e,t,n,r){var l=e.stateNode;l.props=n,l.state=e.memoizedState,l.refs={},Oi(e);var a=t.contextType;typeof a=="object"&&a!==null?l.context=qe(a):(a=ze(t)?Kt:ve.current,l.context=Cn(e,a)),l.state=e.memoizedState,a=t.getDerivedStateFromProps,typeof a=="function"&&(Ya(e,t,a,n),l.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof l.getSnapshotBeforeUpdate=="function"||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(t=l.state,typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount(),t!==l.state&&Rl.enqueueReplaceState(l,l.state,null),vl(e,n,l,r),l.state=e.memoizedState),typeof l.componentDidMount=="function"&&(e.flags|=4194308)}function Tn(e,t){try{var n="",r=t;do n+=kd(r),r=r.return;while(r);var l=n}catch(a){l=`
Error generating stack: `+a.message+`
`+a.stack}return{value:e,source:t,stack:l,digest:null}}function ma(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Ja(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Xp=typeof WeakMap=="function"?WeakMap:Map;function su(e,t,n){n=ht(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){jl||(jl=!0,si=r),Ja(e,t)},n}function cu(e,t,n){n=ht(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var l=t.value;n.payload=function(){return r(l)},n.callback=function(){Ja(e,t)}}var a=e.stateNode;return a!==null&&typeof a.componentDidCatch=="function"&&(n.callback=function(){Ja(e,t),typeof r!="function"&&(_t===null?_t=new Set([this]):_t.add(this));var o=t.stack;this.componentDidCatch(t.value,{componentStack:o!==null?o:""})}),n}function es(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Xp;var l=new Set;r.set(t,l)}else l=r.get(t),l===void 0&&(l=new Set,r.set(t,l));l.has(n)||(l.add(n),e=cf.bind(null,e,t,n),t.then(e,e))}function ts(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function ns(e,t,n,r,l){return e.mode&1?(e.flags|=65536,e.lanes=l,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=ht(-1,1),t.tag=2,At(n,t,1))),n.lanes|=1),e)}var Qp=vt.ReactCurrentOwner,Ce=!1;function we(e,t,n,r){t.child=e===null?Uc(t,null,n,r):zn(t,e.child,n,r)}function rs(e,t,n,r,l){n=n.render;var a=t.ref;return Sn(t,l),r=qi(e,t,n,r,a,l),n=Gi(),e!==null&&!Ce?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,yt(e,t,l)):(J&&n&&_i(t),t.flags|=1,we(e,t,r,l),t.child)}function ls(e,t,n,r,l){if(e===null){var a=n.type;return typeof a=="function"&&!no(a)&&a.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=a,uu(e,t,a,r,l)):(e=nl(n.type,null,r,t,t.mode,l),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!(e.lanes&l)){var o=a.memoizedProps;if(n=n.compare,n=n!==null?n:ur,n(o,r)&&e.ref===t.ref)return yt(e,t,l)}return t.flags|=1,e=It(a,r),e.ref=t.ref,e.return=t,t.child=e}function uu(e,t,n,r,l){if(e!==null){var a=e.memoizedProps;if(ur(a,r)&&e.ref===t.ref)if(Ce=!1,t.pendingProps=r=a,(e.lanes&l)!==0)e.flags&131072&&(Ce=!0);else return t.lanes=e.lanes,yt(e,t,l)}return Za(e,t,n,r,l)}function du(e,t,n){var r=t.pendingProps,l=r.children,a=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},X(yn,Te),Te|=n;else{if(!(n&1073741824))return e=a!==null?a.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,X(yn,Te),Te|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=a!==null?a.baseLanes:n,X(yn,Te),Te|=r}else a!==null?(r=a.baseLanes|n,t.memoizedState=null):r=n,X(yn,Te),Te|=r;return we(e,t,l,n),t.child}function pu(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Za(e,t,n,r,l){var a=ze(n)?Kt:ve.current;return a=Cn(t,a),Sn(t,l),n=qi(e,t,n,r,a,l),r=Gi(),e!==null&&!Ce?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,yt(e,t,l)):(J&&r&&_i(t),t.flags|=1,we(e,t,n,l),t.child)}function as(e,t,n,r,l){if(ze(n)){var a=!0;hl(t)}else a=!1;if(Sn(t,l),t.stateNode===null)Zr(e,t),ou(t,n,r),Ka(t,n,r,l),r=!0;else if(e===null){var o=t.stateNode,s=t.memoizedProps;o.props=s;var c=o.context,d=n.contextType;typeof d=="object"&&d!==null?d=qe(d):(d=ze(n)?Kt:ve.current,d=Cn(t,d));var m=n.getDerivedStateFromProps,g=typeof m=="function"||typeof o.getSnapshotBeforeUpdate=="function";g||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(s!==r||c!==d)&&Zo(t,o,r,d),St=!1;var h=t.memoizedState;o.state=h,vl(t,r,o,l),c=t.memoizedState,s!==r||h!==c||Pe.current||St?(typeof m=="function"&&(Ya(t,n,m,r),c=t.memoizedState),(s=St||Jo(t,n,s,r,h,c,d))?(g||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(t.flags|=4194308)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=c),o.props=r,o.state=c,o.context=d,r=s):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{o=t.stateNode,Oc(e,t),s=t.memoizedProps,d=t.type===t.elementType?s:Ye(t.type,s),o.props=d,g=t.pendingProps,h=o.context,c=n.contextType,typeof c=="object"&&c!==null?c=qe(c):(c=ze(n)?Kt:ve.current,c=Cn(t,c));var y=n.getDerivedStateFromProps;(m=typeof y=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(s!==g||h!==c)&&Zo(t,o,r,c),St=!1,h=t.memoizedState,o.state=h,vl(t,r,o,l);var x=t.memoizedState;s!==g||h!==x||Pe.current||St?(typeof y=="function"&&(Ya(t,n,y,r),x=t.memoizedState),(d=St||Jo(t,n,d,r,h,x,c)||!1)?(m||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,x,c),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,x,c)),typeof o.componentDidUpdate=="function"&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||s===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=x),o.props=r,o.state=x,o.context=c,r=d):(typeof o.componentDidUpdate!="function"||s===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),r=!1)}return ei(e,t,n,r,a,l)}function ei(e,t,n,r,l,a){pu(e,t);var o=(t.flags&128)!==0;if(!r&&!o)return l&&Bo(t,n,!1),yt(e,t,a);r=t.stateNode,Qp.current=t;var s=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&o?(t.child=zn(t,e.child,null,a),t.child=zn(t,null,s,a)):we(e,t,s,a),t.memoizedState=r.state,l&&Bo(t,n,!0),t.child}function fu(e){var t=e.stateNode;t.pendingContext?$o(e,t.pendingContext,t.pendingContext!==t.context):t.context&&$o(e,t.context,!1),Hi(e,t.containerInfo)}function is(e,t,n,r,l){return Pn(),Ii(l),t.flags|=256,we(e,t,n,r),t.child}var ti={dehydrated:null,treeContext:null,retryLane:0};function ni(e){return{baseLanes:e,cachePool:null,transitions:null}}function hu(e,t,n){var r=t.pendingProps,l=ee.current,a=!1,o=(t.flags&128)!==0,s;if((s=o)||(s=e!==null&&e.memoizedState===null?!1:(l&2)!==0),s?(a=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(l|=1),X(ee,l&1),e===null)return Xa(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(o=r.children,e=r.fallback,a?(r=t.mode,a=t.child,o={mode:"hidden",children:o},!(r&1)&&a!==null?(a.childLanes=0,a.pendingProps=o):a=Ol(o,r,0,null),e=Yt(e,r,n,null),a.return=t,e.return=t,a.sibling=e,t.child=a,t.child.memoizedState=ni(n),t.memoizedState=ti,e):Qi(t,o));if(l=e.memoizedState,l!==null&&(s=l.dehydrated,s!==null))return Yp(e,t,o,r,s,l,n);if(a){a=r.fallback,o=t.mode,l=e.child,s=l.sibling;var c={mode:"hidden",children:r.children};return!(o&1)&&t.child!==l?(r=t.child,r.childLanes=0,r.pendingProps=c,t.deletions=null):(r=It(l,c),r.subtreeFlags=l.subtreeFlags&14680064),s!==null?a=It(s,a):(a=Yt(a,o,n,null),a.flags|=2),a.return=t,r.return=t,r.sibling=a,t.child=r,r=a,a=t.child,o=e.child.memoizedState,o=o===null?ni(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},a.memoizedState=o,a.childLanes=e.childLanes&~n,t.memoizedState=ti,r}return a=e.child,e=a.sibling,r=It(a,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Qi(e,t){return t=Ol({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Hr(e,t,n,r){return r!==null&&Ii(r),zn(t,e.child,null,n),e=Qi(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Yp(e,t,n,r,l,a,o){if(n)return t.flags&256?(t.flags&=-257,r=ma(Error(k(422))),Hr(e,t,o,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(a=r.fallback,l=t.mode,r=Ol({mode:"visible",children:r.children},l,0,null),a=Yt(a,l,o,null),a.flags|=2,r.return=t,a.return=t,r.sibling=a,t.child=r,t.mode&1&&zn(t,e.child,null,o),t.child.memoizedState=ni(o),t.memoizedState=ti,a);if(!(t.mode&1))return Hr(e,t,o,null);if(l.data==="$!"){if(r=l.nextSibling&&l.nextSibling.dataset,r)var s=r.dgst;return r=s,a=Error(k(419)),r=ma(a,r,void 0),Hr(e,t,o,r)}if(s=(o&e.childLanes)!==0,Ce||s){if(r=de,r!==null){switch(o&-o){case 4:l=2;break;case 16:l=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:l=32;break;case 536870912:l=268435456;break;default:l=0}l=l&(r.suspendedLanes|o)?0:l,l!==0&&l!==a.retryLane&&(a.retryLane=l,xt(e,l),et(r,e,l,-1))}return to(),r=ma(Error(k(421))),Hr(e,t,o,r)}return l.data==="$?"?(t.flags|=128,t.child=e.child,t=uf.bind(null,e),l._reactRetry=t,null):(e=a.treeContext,Me=Mt(l.nextSibling),Ae=t,J=!0,Je=null,e!==null&&(Oe[He++]=pt,Oe[He++]=ft,Oe[He++]=Jt,pt=e.id,ft=e.overflow,Jt=t),t=Qi(t,r.children),t.flags|=4096,t)}function os(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Qa(e.return,t,n)}function ga(e,t,n,r,l){var a=e.memoizedState;a===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:l}:(a.isBackwards=t,a.rendering=null,a.renderingStartTime=0,a.last=r,a.tail=n,a.tailMode=l)}function mu(e,t,n){var r=t.pendingProps,l=r.revealOrder,a=r.tail;if(we(e,t,r.children,n),r=ee.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&os(e,n,t);else if(e.tag===19)os(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(X(ee,r),!(t.mode&1))t.memoizedState=null;else switch(l){case"forwards":for(n=t.child,l=null;n!==null;)e=n.alternate,e!==null&&wl(e)===null&&(l=n),n=n.sibling;n=l,n===null?(l=t.child,t.child=null):(l=n.sibling,n.sibling=null),ga(t,!1,l,n,a);break;case"backwards":for(n=null,l=t.child,t.child=null;l!==null;){if(e=l.alternate,e!==null&&wl(e)===null){t.child=l;break}e=l.sibling,l.sibling=n,n=l,l=e}ga(t,!0,n,null,a);break;case"together":ga(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Zr(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function yt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),en|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(k(153));if(t.child!==null){for(e=t.child,n=It(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=It(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Kp(e,t,n){switch(t.tag){case 3:fu(t),Pn();break;case 5:Hc(t);break;case 1:ze(t.type)&&hl(t);break;case 4:Hi(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,l=t.memoizedProps.value;X(xl,r._currentValue),r._currentValue=l;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(X(ee,ee.current&1),t.flags|=128,null):n&t.child.childLanes?hu(e,t,n):(X(ee,ee.current&1),e=yt(e,t,n),e!==null?e.sibling:null);X(ee,ee.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return mu(e,t,n);t.flags|=128}if(l=t.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),X(ee,ee.current),r)break;return null;case 22:case 23:return t.lanes=0,du(e,t,n)}return yt(e,t,n)}var gu,ri,xu,yu;gu=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};ri=function(){};xu=function(e,t,n,r){var l=e.memoizedProps;if(l!==r){e=t.stateNode,Xt(st.current);var a=null;switch(n){case"input":l=Na(e,l),r=Na(e,r),a=[];break;case"select":l=ne({},l,{value:void 0}),r=ne({},r,{value:void 0}),a=[];break;case"textarea":l=za(e,l),r=za(e,r),a=[];break;default:typeof l.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=pl)}Ta(n,r);var o;n=null;for(d in l)if(!r.hasOwnProperty(d)&&l.hasOwnProperty(d)&&l[d]!=null)if(d==="style"){var s=l[d];for(o in s)s.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else d!=="dangerouslySetInnerHTML"&&d!=="children"&&d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&(rr.hasOwnProperty(d)?a||(a=[]):(a=a||[]).push(d,null));for(d in r){var c=r[d];if(s=l!=null?l[d]:void 0,r.hasOwnProperty(d)&&c!==s&&(c!=null||s!=null))if(d==="style")if(s){for(o in s)!s.hasOwnProperty(o)||c&&c.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in c)c.hasOwnProperty(o)&&s[o]!==c[o]&&(n||(n={}),n[o]=c[o])}else n||(a||(a=[]),a.push(d,n)),n=c;else d==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,s=s?s.__html:void 0,c!=null&&s!==c&&(a=a||[]).push(d,c)):d==="children"?typeof c!="string"&&typeof c!="number"||(a=a||[]).push(d,""+c):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&(rr.hasOwnProperty(d)?(c!=null&&d==="onScroll"&&Y("scroll",e),a||s===c||(a=[])):(a=a||[]).push(d,c))}n&&(a=a||[]).push("style",n);var d=a;(t.updateQueue=d)&&(t.flags|=4)}};yu=function(e,t,n,r){n!==r&&(t.flags|=4)};function Hn(e,t){if(!J)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function xe(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags&14680064,r|=l.flags&14680064,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags,r|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Jp(e,t,n){var r=t.pendingProps;switch(Li(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return xe(t),null;case 1:return ze(t.type)&&fl(),xe(t),null;case 3:return r=t.stateNode,En(),K(Pe),K(ve),$i(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Fr(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Je!==null&&(di(Je),Je=null))),ri(e,t),xe(t),null;case 5:Vi(t);var l=Xt(mr.current);if(n=t.type,e!==null&&t.stateNode!=null)xu(e,t,n,r,l),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(k(166));return xe(t),null}if(e=Xt(st.current),Fr(t)){r=t.stateNode,n=t.type;var a=t.memoizedProps;switch(r[it]=t,r[fr]=a,e=(t.mode&1)!==0,n){case"dialog":Y("cancel",r),Y("close",r);break;case"iframe":case"object":case"embed":Y("load",r);break;case"video":case"audio":for(l=0;l<Wn.length;l++)Y(Wn[l],r);break;case"source":Y("error",r);break;case"img":case"image":case"link":Y("error",r),Y("load",r);break;case"details":Y("toggle",r);break;case"input":go(r,a),Y("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!a.multiple},Y("invalid",r);break;case"textarea":yo(r,a),Y("invalid",r)}Ta(n,a),l=null;for(var o in a)if(a.hasOwnProperty(o)){var s=a[o];o==="children"?typeof s=="string"?r.textContent!==s&&(a.suppressHydrationWarning!==!0&&Ur(r.textContent,s,e),l=["children",s]):typeof s=="number"&&r.textContent!==""+s&&(a.suppressHydrationWarning!==!0&&Ur(r.textContent,s,e),l=["children",""+s]):rr.hasOwnProperty(o)&&s!=null&&o==="onScroll"&&Y("scroll",r)}switch(n){case"input":Tr(r),xo(r,a,!0);break;case"textarea":Tr(r),vo(r);break;case"select":case"option":break;default:typeof a.onClick=="function"&&(r.onclick=pl)}r=l,t.updateQueue=r,r!==null&&(t.flags|=4)}else{o=l.nodeType===9?l:l.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Gs(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=o.createElement(n,{is:r.is}):(e=o.createElement(n),n==="select"&&(o=e,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):e=o.createElementNS(e,n),e[it]=t,e[fr]=r,gu(e,t,!1,!1),t.stateNode=e;e:{switch(o=Ma(n,r),n){case"dialog":Y("cancel",e),Y("close",e),l=r;break;case"iframe":case"object":case"embed":Y("load",e),l=r;break;case"video":case"audio":for(l=0;l<Wn.length;l++)Y(Wn[l],e);l=r;break;case"source":Y("error",e),l=r;break;case"img":case"image":case"link":Y("error",e),Y("load",e),l=r;break;case"details":Y("toggle",e),l=r;break;case"input":go(e,r),l=Na(e,r),Y("invalid",e);break;case"option":l=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},l=ne({},r,{value:void 0}),Y("invalid",e);break;case"textarea":yo(e,r),l=za(e,r),Y("invalid",e);break;default:l=r}Ta(n,l),s=l;for(a in s)if(s.hasOwnProperty(a)){var c=s[a];a==="style"?Qs(e,c):a==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&Ws(e,c)):a==="children"?typeof c=="string"?(n!=="textarea"||c!=="")&&lr(e,c):typeof c=="number"&&lr(e,""+c):a!=="suppressContentEditableWarning"&&a!=="suppressHydrationWarning"&&a!=="autoFocus"&&(rr.hasOwnProperty(a)?c!=null&&a==="onScroll"&&Y("scroll",e):c!=null&&vi(e,a,c,o))}switch(n){case"input":Tr(e),xo(e,r,!1);break;case"textarea":Tr(e),vo(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Dt(r.value));break;case"select":e.multiple=!!r.multiple,a=r.value,a!=null?vn(e,!!r.multiple,a,!1):r.defaultValue!=null&&vn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof l.onClick=="function"&&(e.onclick=pl)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return xe(t),null;case 6:if(e&&t.stateNode!=null)yu(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(k(166));if(n=Xt(mr.current),Xt(st.current),Fr(t)){if(r=t.stateNode,n=t.memoizedProps,r[it]=t,(a=r.nodeValue!==n)&&(e=Ae,e!==null))switch(e.tag){case 3:Ur(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Ur(r.nodeValue,n,(e.mode&1)!==0)}a&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[it]=t,t.stateNode=r}return xe(t),null;case 13:if(K(ee),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(J&&Me!==null&&t.mode&1&&!(t.flags&128))Dc(),Pn(),t.flags|=98560,a=!1;else if(a=Fr(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(k(318));if(a=t.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(k(317));a[it]=t}else Pn(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;xe(t),a=!1}else Je!==null&&(di(Je),Je=null),a=!0;if(!a)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||ee.current&1?ce===0&&(ce=3):to())),t.updateQueue!==null&&(t.flags|=4),xe(t),null);case 4:return En(),ri(e,t),e===null&&dr(t.stateNode.containerInfo),xe(t),null;case 10:return Ui(t.type._context),xe(t),null;case 17:return ze(t.type)&&fl(),xe(t),null;case 19:if(K(ee),a=t.memoizedState,a===null)return xe(t),null;if(r=(t.flags&128)!==0,o=a.rendering,o===null)if(r)Hn(a,!1);else{if(ce!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=wl(e),o!==null){for(t.flags|=128,Hn(a,!1),r=o.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)a=n,e=r,a.flags&=14680066,o=a.alternate,o===null?(a.childLanes=0,a.lanes=e,a.child=null,a.subtreeFlags=0,a.memoizedProps=null,a.memoizedState=null,a.updateQueue=null,a.dependencies=null,a.stateNode=null):(a.childLanes=o.childLanes,a.lanes=o.lanes,a.child=o.child,a.subtreeFlags=0,a.deletions=null,a.memoizedProps=o.memoizedProps,a.memoizedState=o.memoizedState,a.updateQueue=o.updateQueue,a.type=o.type,e=o.dependencies,a.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return X(ee,ee.current&1|2),t.child}e=e.sibling}a.tail!==null&&ae()>Mn&&(t.flags|=128,r=!0,Hn(a,!1),t.lanes=4194304)}else{if(!r)if(e=wl(o),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Hn(a,!0),a.tail===null&&a.tailMode==="hidden"&&!o.alternate&&!J)return xe(t),null}else 2*ae()-a.renderingStartTime>Mn&&n!==1073741824&&(t.flags|=128,r=!0,Hn(a,!1),t.lanes=4194304);a.isBackwards?(o.sibling=t.child,t.child=o):(n=a.last,n!==null?n.sibling=o:t.child=o,a.last=o)}return a.tail!==null?(t=a.tail,a.rendering=t,a.tail=t.sibling,a.renderingStartTime=ae(),t.sibling=null,n=ee.current,X(ee,r?n&1|2:n&1),t):(xe(t),null);case 22:case 23:return eo(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?Te&1073741824&&(xe(t),t.subtreeFlags&6&&(t.flags|=8192)):xe(t),null;case 24:return null;case 25:return null}throw Error(k(156,t.tag))}function Zp(e,t){switch(Li(t),t.tag){case 1:return ze(t.type)&&fl(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return En(),K(Pe),K(ve),$i(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Vi(t),null;case 13:if(K(ee),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(k(340));Pn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return K(ee),null;case 4:return En(),null;case 10:return Ui(t.type._context),null;case 22:case 23:return eo(),null;case 24:return null;default:return null}}var Vr=!1,ye=!1,ef=typeof WeakSet=="function"?WeakSet:Set,E=null;function xn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){re(e,t,r)}else n.current=null}function li(e,t,n){try{n()}catch(r){re(e,t,r)}}var ss=!1;function tf(e,t){if(Ha=cl,e=Sc(),Ai(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var l=r.anchorOffset,a=r.focusNode;r=r.focusOffset;try{n.nodeType,a.nodeType}catch{n=null;break e}var o=0,s=-1,c=-1,d=0,m=0,g=e,h=null;t:for(;;){for(var y;g!==n||l!==0&&g.nodeType!==3||(s=o+l),g!==a||r!==0&&g.nodeType!==3||(c=o+r),g.nodeType===3&&(o+=g.nodeValue.length),(y=g.firstChild)!==null;)h=g,g=y;for(;;){if(g===e)break t;if(h===n&&++d===l&&(s=o),h===a&&++m===r&&(c=o),(y=g.nextSibling)!==null)break;g=h,h=g.parentNode}g=y}n=s===-1||c===-1?null:{start:s,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(Va={focusedElem:e,selectionRange:n},cl=!1,E=t;E!==null;)if(t=E,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,E=e;else for(;E!==null;){t=E;try{var x=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(x!==null){var w=x.memoizedProps,L=x.memoizedState,f=t.stateNode,u=f.getSnapshotBeforeUpdate(t.elementType===t.type?w:Ye(t.type,w),L);f.__reactInternalSnapshotBeforeUpdate=u}break;case 3:var p=t.stateNode.containerInfo;p.nodeType===1?p.textContent="":p.nodeType===9&&p.documentElement&&p.removeChild(p.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(k(163))}}catch(v){re(t,t.return,v)}if(e=t.sibling,e!==null){e.return=t.return,E=e;break}E=t.return}return x=ss,ss=!1,x}function er(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var l=r=r.next;do{if((l.tag&e)===e){var a=l.destroy;l.destroy=void 0,a!==void 0&&li(t,n,a)}l=l.next}while(l!==r)}}function Ul(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function ai(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function vu(e){var t=e.alternate;t!==null&&(e.alternate=null,vu(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[it],delete t[fr],delete t[qa],delete t[Rp],delete t[Up])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function wu(e){return e.tag===5||e.tag===3||e.tag===4}function cs(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||wu(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function ii(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=pl));else if(r!==4&&(e=e.child,e!==null))for(ii(e,t,n),e=e.sibling;e!==null;)ii(e,t,n),e=e.sibling}function oi(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(oi(e,t,n),e=e.sibling;e!==null;)oi(e,t,n),e=e.sibling}var pe=null,Ke=!1;function kt(e,t,n){for(n=n.child;n!==null;)ku(e,t,n),n=n.sibling}function ku(e,t,n){if(ot&&typeof ot.onCommitFiberUnmount=="function")try{ot.onCommitFiberUnmount(Tl,n)}catch{}switch(n.tag){case 5:ye||xn(n,t);case 6:var r=pe,l=Ke;pe=null,kt(e,t,n),pe=r,Ke=l,pe!==null&&(Ke?(e=pe,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):pe.removeChild(n.stateNode));break;case 18:pe!==null&&(Ke?(e=pe,n=n.stateNode,e.nodeType===8?ca(e.parentNode,n):e.nodeType===1&&ca(e,n),sr(e)):ca(pe,n.stateNode));break;case 4:r=pe,l=Ke,pe=n.stateNode.containerInfo,Ke=!0,kt(e,t,n),pe=r,Ke=l;break;case 0:case 11:case 14:case 15:if(!ye&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){l=r=r.next;do{var a=l,o=a.destroy;a=a.tag,o!==void 0&&(a&2||a&4)&&li(n,t,o),l=l.next}while(l!==r)}kt(e,t,n);break;case 1:if(!ye&&(xn(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(s){re(n,t,s)}kt(e,t,n);break;case 21:kt(e,t,n);break;case 22:n.mode&1?(ye=(r=ye)||n.memoizedState!==null,kt(e,t,n),ye=r):kt(e,t,n);break;default:kt(e,t,n)}}function us(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new ef),t.forEach(function(r){var l=df.bind(null,e,r);n.has(r)||(n.add(r),r.then(l,l))})}}function Qe(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var l=n[r];try{var a=e,o=t,s=o;e:for(;s!==null;){switch(s.tag){case 5:pe=s.stateNode,Ke=!1;break e;case 3:pe=s.stateNode.containerInfo,Ke=!0;break e;case 4:pe=s.stateNode.containerInfo,Ke=!0;break e}s=s.return}if(pe===null)throw Error(k(160));ku(a,o,l),pe=null,Ke=!1;var c=l.alternate;c!==null&&(c.return=null),l.return=null}catch(d){re(l,t,d)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)bu(t,e),t=t.sibling}function bu(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Qe(t,e),rt(e),r&4){try{er(3,e,e.return),Ul(3,e)}catch(w){re(e,e.return,w)}try{er(5,e,e.return)}catch(w){re(e,e.return,w)}}break;case 1:Qe(t,e),rt(e),r&512&&n!==null&&xn(n,n.return);break;case 5:if(Qe(t,e),rt(e),r&512&&n!==null&&xn(n,n.return),e.flags&32){var l=e.stateNode;try{lr(l,"")}catch(w){re(e,e.return,w)}}if(r&4&&(l=e.stateNode,l!=null)){var a=e.memoizedProps,o=n!==null?n.memoizedProps:a,s=e.type,c=e.updateQueue;if(e.updateQueue=null,c!==null)try{s==="input"&&a.type==="radio"&&a.name!=null&&Bs(l,a),Ma(s,o);var d=Ma(s,a);for(o=0;o<c.length;o+=2){var m=c[o],g=c[o+1];m==="style"?Qs(l,g):m==="dangerouslySetInnerHTML"?Ws(l,g):m==="children"?lr(l,g):vi(l,m,g,d)}switch(s){case"input":Ca(l,a);break;case"textarea":qs(l,a);break;case"select":var h=l._wrapperState.wasMultiple;l._wrapperState.wasMultiple=!!a.multiple;var y=a.value;y!=null?vn(l,!!a.multiple,y,!1):h!==!!a.multiple&&(a.defaultValue!=null?vn(l,!!a.multiple,a.defaultValue,!0):vn(l,!!a.multiple,a.multiple?[]:"",!1))}l[fr]=a}catch(w){re(e,e.return,w)}}break;case 6:if(Qe(t,e),rt(e),r&4){if(e.stateNode===null)throw Error(k(162));l=e.stateNode,a=e.memoizedProps;try{l.nodeValue=a}catch(w){re(e,e.return,w)}}break;case 3:if(Qe(t,e),rt(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{sr(t.containerInfo)}catch(w){re(e,e.return,w)}break;case 4:Qe(t,e),rt(e);break;case 13:Qe(t,e),rt(e),l=e.child,l.flags&8192&&(a=l.memoizedState!==null,l.stateNode.isHidden=a,!a||l.alternate!==null&&l.alternate.memoizedState!==null||(Ji=ae())),r&4&&us(e);break;case 22:if(m=n!==null&&n.memoizedState!==null,e.mode&1?(ye=(d=ye)||m,Qe(t,e),ye=d):Qe(t,e),rt(e),r&8192){if(d=e.memoizedState!==null,(e.stateNode.isHidden=d)&&!m&&e.mode&1)for(E=e,m=e.child;m!==null;){for(g=E=m;E!==null;){switch(h=E,y=h.child,h.tag){case 0:case 11:case 14:case 15:er(4,h,h.return);break;case 1:xn(h,h.return);var x=h.stateNode;if(typeof x.componentWillUnmount=="function"){r=h,n=h.return;try{t=r,x.props=t.memoizedProps,x.state=t.memoizedState,x.componentWillUnmount()}catch(w){re(r,n,w)}}break;case 5:xn(h,h.return);break;case 22:if(h.memoizedState!==null){ps(g);continue}}y!==null?(y.return=h,E=y):ps(g)}m=m.sibling}e:for(m=null,g=e;;){if(g.tag===5){if(m===null){m=g;try{l=g.stateNode,d?(a=l.style,typeof a.setProperty=="function"?a.setProperty("display","none","important"):a.display="none"):(s=g.stateNode,c=g.memoizedProps.style,o=c!=null&&c.hasOwnProperty("display")?c.display:null,s.style.display=Xs("display",o))}catch(w){re(e,e.return,w)}}}else if(g.tag===6){if(m===null)try{g.stateNode.nodeValue=d?"":g.memoizedProps}catch(w){re(e,e.return,w)}}else if((g.tag!==22&&g.tag!==23||g.memoizedState===null||g===e)&&g.child!==null){g.child.return=g,g=g.child;continue}if(g===e)break e;for(;g.sibling===null;){if(g.return===null||g.return===e)break e;m===g&&(m=null),g=g.return}m===g&&(m=null),g.sibling.return=g.return,g=g.sibling}}break;case 19:Qe(t,e),rt(e),r&4&&us(e);break;case 21:break;default:Qe(t,e),rt(e)}}function rt(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(wu(n)){var r=n;break e}n=n.return}throw Error(k(160))}switch(r.tag){case 5:var l=r.stateNode;r.flags&32&&(lr(l,""),r.flags&=-33);var a=cs(e);oi(e,a,l);break;case 3:case 4:var o=r.stateNode.containerInfo,s=cs(e);ii(e,s,o);break;default:throw Error(k(161))}}catch(c){re(e,e.return,c)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function nf(e,t,n){E=e,Su(e)}function Su(e,t,n){for(var r=(e.mode&1)!==0;E!==null;){var l=E,a=l.child;if(l.tag===22&&r){var o=l.memoizedState!==null||Vr;if(!o){var s=l.alternate,c=s!==null&&s.memoizedState!==null||ye;s=Vr;var d=ye;if(Vr=o,(ye=c)&&!d)for(E=l;E!==null;)o=E,c=o.child,o.tag===22&&o.memoizedState!==null?fs(l):c!==null?(c.return=o,E=c):fs(l);for(;a!==null;)E=a,Su(a),a=a.sibling;E=l,Vr=s,ye=d}ds(e)}else l.subtreeFlags&8772&&a!==null?(a.return=l,E=a):ds(e)}}function ds(e){for(;E!==null;){var t=E;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:ye||Ul(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!ye)if(n===null)r.componentDidMount();else{var l=t.elementType===t.type?n.memoizedProps:Ye(t.type,n.memoizedProps);r.componentDidUpdate(l,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var a=t.updateQueue;a!==null&&Qo(t,a,r);break;case 3:var o=t.updateQueue;if(o!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Qo(t,o,n)}break;case 5:var s=t.stateNode;if(n===null&&t.flags&4){n=s;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var d=t.alternate;if(d!==null){var m=d.memoizedState;if(m!==null){var g=m.dehydrated;g!==null&&sr(g)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(k(163))}ye||t.flags&512&&ai(t)}catch(h){re(t,t.return,h)}}if(t===e){E=null;break}if(n=t.sibling,n!==null){n.return=t.return,E=n;break}E=t.return}}function ps(e){for(;E!==null;){var t=E;if(t===e){E=null;break}var n=t.sibling;if(n!==null){n.return=t.return,E=n;break}E=t.return}}function fs(e){for(;E!==null;){var t=E;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Ul(4,t)}catch(c){re(t,n,c)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var l=t.return;try{r.componentDidMount()}catch(c){re(t,l,c)}}var a=t.return;try{ai(t)}catch(c){re(t,a,c)}break;case 5:var o=t.return;try{ai(t)}catch(c){re(t,o,c)}}}catch(c){re(t,t.return,c)}if(t===e){E=null;break}var s=t.sibling;if(s!==null){s.return=t.return,E=s;break}E=t.return}}var rf=Math.ceil,Sl=vt.ReactCurrentDispatcher,Yi=vt.ReactCurrentOwner,Be=vt.ReactCurrentBatchConfig,V=0,de=null,ie=null,fe=0,Te=0,yn=Ft(0),ce=0,vr=null,en=0,Fl=0,Ki=0,tr=null,Ne=null,Ji=0,Mn=1/0,ut=null,jl=!1,si=null,_t=null,$r=!1,Pt=null,Nl=0,nr=0,ci=null,el=-1,tl=0;function ke(){return V&6?ae():el!==-1?el:el=ae()}function Lt(e){return e.mode&1?V&2&&fe!==0?fe&-fe:Op.transition!==null?(tl===0&&(tl=oc()),tl):(e=W,e!==0||(e=window.event,e=e===void 0?16:hc(e.type)),e):1}function et(e,t,n,r){if(50<nr)throw nr=0,ci=null,Error(k(185));kr(e,n,r),(!(V&2)||e!==de)&&(e===de&&(!(V&2)&&(Fl|=n),ce===4&&Nt(e,fe)),Ee(e,r),n===1&&V===0&&!(t.mode&1)&&(Mn=ae()+500,Il&&Ot()))}function Ee(e,t){var n=e.callbackNode;Od(e,t);var r=sl(e,e===de?fe:0);if(r===0)n!==null&&bo(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&bo(n),t===1)e.tag===0?Fp(hs.bind(null,e)):_c(hs.bind(null,e)),Ip(function(){!(V&6)&&Ot()}),n=null;else{switch(sc(r)){case 1:n=ji;break;case 4:n=ac;break;case 16:n=ol;break;case 536870912:n=ic;break;default:n=ol}n=Mu(n,ju.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function ju(e,t){if(el=-1,tl=0,V&6)throw Error(k(327));var n=e.callbackNode;if(jn()&&e.callbackNode!==n)return null;var r=sl(e,e===de?fe:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=Cl(e,r);else{t=r;var l=V;V|=2;var a=Cu();(de!==e||fe!==t)&&(ut=null,Mn=ae()+500,Qt(e,t));do try{of();break}catch(s){Nu(e,s)}while(!0);Ri(),Sl.current=a,V=l,ie!==null?t=0:(de=null,fe=0,t=ce)}if(t!==0){if(t===2&&(l=Da(e),l!==0&&(r=l,t=ui(e,l))),t===1)throw n=vr,Qt(e,0),Nt(e,r),Ee(e,ae()),n;if(t===6)Nt(e,r);else{if(l=e.current.alternate,!(r&30)&&!lf(l)&&(t=Cl(e,r),t===2&&(a=Da(e),a!==0&&(r=a,t=ui(e,a))),t===1))throw n=vr,Qt(e,0),Nt(e,r),Ee(e,ae()),n;switch(e.finishedWork=l,e.finishedLanes=r,t){case 0:case 1:throw Error(k(345));case 2:qt(e,Ne,ut);break;case 3:if(Nt(e,r),(r&130023424)===r&&(t=Ji+500-ae(),10<t)){if(sl(e,0)!==0)break;if(l=e.suspendedLanes,(l&r)!==r){ke(),e.pingedLanes|=e.suspendedLanes&l;break}e.timeoutHandle=Ba(qt.bind(null,e,Ne,ut),t);break}qt(e,Ne,ut);break;case 4:if(Nt(e,r),(r&4194240)===r)break;for(t=e.eventTimes,l=-1;0<r;){var o=31-Ze(r);a=1<<o,o=t[o],o>l&&(l=o),r&=~a}if(r=l,r=ae()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*rf(r/1960))-r,10<r){e.timeoutHandle=Ba(qt.bind(null,e,Ne,ut),r);break}qt(e,Ne,ut);break;case 5:qt(e,Ne,ut);break;default:throw Error(k(329))}}}return Ee(e,ae()),e.callbackNode===n?ju.bind(null,e):null}function ui(e,t){var n=tr;return e.current.memoizedState.isDehydrated&&(Qt(e,t).flags|=256),e=Cl(e,t),e!==2&&(t=Ne,Ne=n,t!==null&&di(t)),e}function di(e){Ne===null?Ne=e:Ne.push.apply(Ne,e)}function lf(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var l=n[r],a=l.getSnapshot;l=l.value;try{if(!tt(a(),l))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Nt(e,t){for(t&=~Ki,t&=~Fl,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Ze(t),r=1<<n;e[n]=-1,t&=~r}}function hs(e){if(V&6)throw Error(k(327));jn();var t=sl(e,0);if(!(t&1))return Ee(e,ae()),null;var n=Cl(e,t);if(e.tag!==0&&n===2){var r=Da(e);r!==0&&(t=r,n=ui(e,r))}if(n===1)throw n=vr,Qt(e,0),Nt(e,t),Ee(e,ae()),n;if(n===6)throw Error(k(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,qt(e,Ne,ut),Ee(e,ae()),null}function Zi(e,t){var n=V;V|=1;try{return e(t)}finally{V=n,V===0&&(Mn=ae()+500,Il&&Ot())}}function tn(e){Pt!==null&&Pt.tag===0&&!(V&6)&&jn();var t=V;V|=1;var n=Be.transition,r=W;try{if(Be.transition=null,W=1,e)return e()}finally{W=r,Be.transition=n,V=t,!(V&6)&&Ot()}}function eo(){Te=yn.current,K(yn)}function Qt(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Lp(n)),ie!==null)for(n=ie.return;n!==null;){var r=n;switch(Li(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&fl();break;case 3:En(),K(Pe),K(ve),$i();break;case 5:Vi(r);break;case 4:En();break;case 13:K(ee);break;case 19:K(ee);break;case 10:Ui(r.type._context);break;case 22:case 23:eo()}n=n.return}if(de=e,ie=e=It(e.current,null),fe=Te=t,ce=0,vr=null,Ki=Fl=en=0,Ne=tr=null,Wt!==null){for(t=0;t<Wt.length;t++)if(n=Wt[t],r=n.interleaved,r!==null){n.interleaved=null;var l=r.next,a=n.pending;if(a!==null){var o=a.next;a.next=l,r.next=o}n.pending=r}Wt=null}return e}function Nu(e,t){do{var n=ie;try{if(Ri(),Kr.current=bl,kl){for(var r=te.memoizedState;r!==null;){var l=r.queue;l!==null&&(l.pending=null),r=r.next}kl=!1}if(Zt=0,ue=se=te=null,Zn=!1,gr=0,Yi.current=null,n===null||n.return===null){ce=1,vr=t,ie=null;break}e:{var a=e,o=n.return,s=n,c=t;if(t=fe,s.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var d=c,m=s,g=m.tag;if(!(m.mode&1)&&(g===0||g===11||g===15)){var h=m.alternate;h?(m.updateQueue=h.updateQueue,m.memoizedState=h.memoizedState,m.lanes=h.lanes):(m.updateQueue=null,m.memoizedState=null)}var y=ts(o);if(y!==null){y.flags&=-257,ns(y,o,s,a,t),y.mode&1&&es(a,d,t),t=y,c=d;var x=t.updateQueue;if(x===null){var w=new Set;w.add(c),t.updateQueue=w}else x.add(c);break e}else{if(!(t&1)){es(a,d,t),to();break e}c=Error(k(426))}}else if(J&&s.mode&1){var L=ts(o);if(L!==null){!(L.flags&65536)&&(L.flags|=256),ns(L,o,s,a,t),Ii(Tn(c,s));break e}}a=c=Tn(c,s),ce!==4&&(ce=2),tr===null?tr=[a]:tr.push(a),a=o;do{switch(a.tag){case 3:a.flags|=65536,t&=-t,a.lanes|=t;var f=su(a,c,t);Xo(a,f);break e;case 1:s=c;var u=a.type,p=a.stateNode;if(!(a.flags&128)&&(typeof u.getDerivedStateFromError=="function"||p!==null&&typeof p.componentDidCatch=="function"&&(_t===null||!_t.has(p)))){a.flags|=65536,t&=-t,a.lanes|=t;var v=cu(a,s,t);Xo(a,v);break e}}a=a.return}while(a!==null)}zu(n)}catch(S){t=S,ie===n&&n!==null&&(ie=n=n.return);continue}break}while(!0)}function Cu(){var e=Sl.current;return Sl.current=bl,e===null?bl:e}function to(){(ce===0||ce===3||ce===2)&&(ce=4),de===null||!(en&268435455)&&!(Fl&268435455)||Nt(de,fe)}function Cl(e,t){var n=V;V|=2;var r=Cu();(de!==e||fe!==t)&&(ut=null,Qt(e,t));do try{af();break}catch(l){Nu(e,l)}while(!0);if(Ri(),V=n,Sl.current=r,ie!==null)throw Error(k(261));return de=null,fe=0,ce}function af(){for(;ie!==null;)Pu(ie)}function of(){for(;ie!==null&&!Md();)Pu(ie)}function Pu(e){var t=Tu(e.alternate,e,Te);e.memoizedProps=e.pendingProps,t===null?zu(e):ie=t,Yi.current=null}function zu(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=Zp(n,t),n!==null){n.flags&=32767,ie=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{ce=6,ie=null;return}}else if(n=Jp(n,t,Te),n!==null){ie=n;return}if(t=t.sibling,t!==null){ie=t;return}ie=t=e}while(t!==null);ce===0&&(ce=5)}function qt(e,t,n){var r=W,l=Be.transition;try{Be.transition=null,W=1,sf(e,t,n,r)}finally{Be.transition=l,W=r}return null}function sf(e,t,n,r){do jn();while(Pt!==null);if(V&6)throw Error(k(327));n=e.finishedWork;var l=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(k(177));e.callbackNode=null,e.callbackPriority=0;var a=n.lanes|n.childLanes;if(Hd(e,a),e===de&&(ie=de=null,fe=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||$r||($r=!0,Mu(ol,function(){return jn(),null})),a=(n.flags&15990)!==0,n.subtreeFlags&15990||a){a=Be.transition,Be.transition=null;var o=W;W=1;var s=V;V|=4,Yi.current=null,tf(e,n),bu(n,e),Pp(Va),cl=!!Ha,Va=Ha=null,e.current=n,nf(n),Ad(),V=s,W=o,Be.transition=a}else e.current=n;if($r&&($r=!1,Pt=e,Nl=l),a=e.pendingLanes,a===0&&(_t=null),Id(n.stateNode),Ee(e,ae()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)l=t[n],r(l.value,{componentStack:l.stack,digest:l.digest});if(jl)throw jl=!1,e=si,si=null,e;return Nl&1&&e.tag!==0&&jn(),a=e.pendingLanes,a&1?e===ci?nr++:(nr=0,ci=e):nr=0,Ot(),null}function jn(){if(Pt!==null){var e=sc(Nl),t=Be.transition,n=W;try{if(Be.transition=null,W=16>e?16:e,Pt===null)var r=!1;else{if(e=Pt,Pt=null,Nl=0,V&6)throw Error(k(331));var l=V;for(V|=4,E=e.current;E!==null;){var a=E,o=a.child;if(E.flags&16){var s=a.deletions;if(s!==null){for(var c=0;c<s.length;c++){var d=s[c];for(E=d;E!==null;){var m=E;switch(m.tag){case 0:case 11:case 15:er(8,m,a)}var g=m.child;if(g!==null)g.return=m,E=g;else for(;E!==null;){m=E;var h=m.sibling,y=m.return;if(vu(m),m===d){E=null;break}if(h!==null){h.return=y,E=h;break}E=y}}}var x=a.alternate;if(x!==null){var w=x.child;if(w!==null){x.child=null;do{var L=w.sibling;w.sibling=null,w=L}while(w!==null)}}E=a}}if(a.subtreeFlags&2064&&o!==null)o.return=a,E=o;else e:for(;E!==null;){if(a=E,a.flags&2048)switch(a.tag){case 0:case 11:case 15:er(9,a,a.return)}var f=a.sibling;if(f!==null){f.return=a.return,E=f;break e}E=a.return}}var u=e.current;for(E=u;E!==null;){o=E;var p=o.child;if(o.subtreeFlags&2064&&p!==null)p.return=o,E=p;else e:for(o=u;E!==null;){if(s=E,s.flags&2048)try{switch(s.tag){case 0:case 11:case 15:Ul(9,s)}}catch(S){re(s,s.return,S)}if(s===o){E=null;break e}var v=s.sibling;if(v!==null){v.return=s.return,E=v;break e}E=s.return}}if(V=l,Ot(),ot&&typeof ot.onPostCommitFiberRoot=="function")try{ot.onPostCommitFiberRoot(Tl,e)}catch{}r=!0}return r}finally{W=n,Be.transition=t}}return!1}function ms(e,t,n){t=Tn(n,t),t=su(e,t,1),e=At(e,t,1),t=ke(),e!==null&&(kr(e,1,t),Ee(e,t))}function re(e,t,n){if(e.tag===3)ms(e,e,n);else for(;t!==null;){if(t.tag===3){ms(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(_t===null||!_t.has(r))){e=Tn(n,e),e=cu(t,e,1),t=At(t,e,1),e=ke(),t!==null&&(kr(t,1,e),Ee(t,e));break}}t=t.return}}function cf(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=ke(),e.pingedLanes|=e.suspendedLanes&n,de===e&&(fe&n)===n&&(ce===4||ce===3&&(fe&130023424)===fe&&500>ae()-Ji?Qt(e,0):Ki|=n),Ee(e,t)}function Eu(e,t){t===0&&(e.mode&1?(t=_r,_r<<=1,!(_r&130023424)&&(_r=4194304)):t=1);var n=ke();e=xt(e,t),e!==null&&(kr(e,t,n),Ee(e,n))}function uf(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Eu(e,n)}function df(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,l=e.memoizedState;l!==null&&(n=l.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(k(314))}r!==null&&r.delete(t),Eu(e,n)}var Tu;Tu=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Pe.current)Ce=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return Ce=!1,Kp(e,t,n);Ce=!!(e.flags&131072)}else Ce=!1,J&&t.flags&1048576&&Lc(t,gl,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Zr(e,t),e=t.pendingProps;var l=Cn(t,ve.current);Sn(t,n),l=qi(null,t,r,e,l,n);var a=Gi();return t.flags|=1,typeof l=="object"&&l!==null&&typeof l.render=="function"&&l.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,ze(r)?(a=!0,hl(t)):a=!1,t.memoizedState=l.state!==null&&l.state!==void 0?l.state:null,Oi(t),l.updater=Rl,t.stateNode=l,l._reactInternals=t,Ka(t,r,e,n),t=ei(null,t,r,!0,a,n)):(t.tag=0,J&&a&&_i(t),we(null,t,l,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Zr(e,t),e=t.pendingProps,l=r._init,r=l(r._payload),t.type=r,l=t.tag=ff(r),e=Ye(r,e),l){case 0:t=Za(null,t,r,e,n);break e;case 1:t=as(null,t,r,e,n);break e;case 11:t=rs(null,t,r,e,n);break e;case 14:t=ls(null,t,r,Ye(r.type,e),n);break e}throw Error(k(306,r,""))}return t;case 0:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Ye(r,l),Za(e,t,r,l,n);case 1:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Ye(r,l),as(e,t,r,l,n);case 3:e:{if(fu(t),e===null)throw Error(k(387));r=t.pendingProps,a=t.memoizedState,l=a.element,Oc(e,t),vl(t,r,null,n);var o=t.memoizedState;if(r=o.element,a.isDehydrated)if(a={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},t.updateQueue.baseState=a,t.memoizedState=a,t.flags&256){l=Tn(Error(k(423)),t),t=is(e,t,r,n,l);break e}else if(r!==l){l=Tn(Error(k(424)),t),t=is(e,t,r,n,l);break e}else for(Me=Mt(t.stateNode.containerInfo.firstChild),Ae=t,J=!0,Je=null,n=Uc(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Pn(),r===l){t=yt(e,t,n);break e}we(e,t,r,n)}t=t.child}return t;case 5:return Hc(t),e===null&&Xa(t),r=t.type,l=t.pendingProps,a=e!==null?e.memoizedProps:null,o=l.children,$a(r,l)?o=null:a!==null&&$a(r,a)&&(t.flags|=32),pu(e,t),we(e,t,o,n),t.child;case 6:return e===null&&Xa(t),null;case 13:return hu(e,t,n);case 4:return Hi(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=zn(t,null,r,n):we(e,t,r,n),t.child;case 11:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Ye(r,l),rs(e,t,r,l,n);case 7:return we(e,t,t.pendingProps,n),t.child;case 8:return we(e,t,t.pendingProps.children,n),t.child;case 12:return we(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,l=t.pendingProps,a=t.memoizedProps,o=l.value,X(xl,r._currentValue),r._currentValue=o,a!==null)if(tt(a.value,o)){if(a.children===l.children&&!Pe.current){t=yt(e,t,n);break e}}else for(a=t.child,a!==null&&(a.return=t);a!==null;){var s=a.dependencies;if(s!==null){o=a.child;for(var c=s.firstContext;c!==null;){if(c.context===r){if(a.tag===1){c=ht(-1,n&-n),c.tag=2;var d=a.updateQueue;if(d!==null){d=d.shared;var m=d.pending;m===null?c.next=c:(c.next=m.next,m.next=c),d.pending=c}}a.lanes|=n,c=a.alternate,c!==null&&(c.lanes|=n),Qa(a.return,n,t),s.lanes|=n;break}c=c.next}}else if(a.tag===10)o=a.type===t.type?null:a.child;else if(a.tag===18){if(o=a.return,o===null)throw Error(k(341));o.lanes|=n,s=o.alternate,s!==null&&(s.lanes|=n),Qa(o,n,t),o=a.sibling}else o=a.child;if(o!==null)o.return=a;else for(o=a;o!==null;){if(o===t){o=null;break}if(a=o.sibling,a!==null){a.return=o.return,o=a;break}o=o.return}a=o}we(e,t,l.children,n),t=t.child}return t;case 9:return l=t.type,r=t.pendingProps.children,Sn(t,n),l=qe(l),r=r(l),t.flags|=1,we(e,t,r,n),t.child;case 14:return r=t.type,l=Ye(r,t.pendingProps),l=Ye(r.type,l),ls(e,t,r,l,n);case 15:return uu(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Ye(r,l),Zr(e,t),t.tag=1,ze(r)?(e=!0,hl(t)):e=!1,Sn(t,n),ou(t,r,l),Ka(t,r,l,n),ei(null,t,r,!0,e,n);case 19:return mu(e,t,n);case 22:return du(e,t,n)}throw Error(k(156,t.tag))};function Mu(e,t){return lc(e,t)}function pf(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function $e(e,t,n,r){return new pf(e,t,n,r)}function no(e){return e=e.prototype,!(!e||!e.isReactComponent)}function ff(e){if(typeof e=="function")return no(e)?1:0;if(e!=null){if(e=e.$$typeof,e===ki)return 11;if(e===bi)return 14}return 2}function It(e,t){var n=e.alternate;return n===null?(n=$e(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function nl(e,t,n,r,l,a){var o=2;if(r=e,typeof e=="function")no(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case sn:return Yt(n.children,l,a,t);case wi:o=8,l|=8;break;case ka:return e=$e(12,n,t,l|2),e.elementType=ka,e.lanes=a,e;case ba:return e=$e(13,n,t,l),e.elementType=ba,e.lanes=a,e;case Sa:return e=$e(19,n,t,l),e.elementType=Sa,e.lanes=a,e;case Hs:return Ol(n,l,a,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Fs:o=10;break e;case Os:o=9;break e;case ki:o=11;break e;case bi:o=14;break e;case bt:o=16,r=null;break e}throw Error(k(130,e==null?e:typeof e,""))}return t=$e(o,n,t,l),t.elementType=e,t.type=r,t.lanes=a,t}function Yt(e,t,n,r){return e=$e(7,e,r,t),e.lanes=n,e}function Ol(e,t,n,r){return e=$e(22,e,r,t),e.elementType=Hs,e.lanes=n,e.stateNode={isHidden:!1},e}function xa(e,t,n){return e=$e(6,e,null,t),e.lanes=n,e}function ya(e,t,n){return t=$e(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function hf(e,t,n,r,l){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Jl(0),this.expirationTimes=Jl(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Jl(0),this.identifierPrefix=r,this.onRecoverableError=l,this.mutableSourceEagerHydrationData=null}function ro(e,t,n,r,l,a,o,s,c){return e=new hf(e,t,n,s,c),t===1?(t=1,a===!0&&(t|=8)):t=0,a=$e(3,null,null,t),e.current=a,a.stateNode=e,a.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Oi(a),e}function mf(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:on,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function Au(e){if(!e)return Rt;e=e._reactInternals;e:{if(rn(e)!==e||e.tag!==1)throw Error(k(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(ze(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(k(171))}if(e.tag===1){var n=e.type;if(ze(n))return Ac(e,n,t)}return t}function _u(e,t,n,r,l,a,o,s,c){return e=ro(n,r,!0,e,l,a,o,s,c),e.context=Au(null),n=e.current,r=ke(),l=Lt(n),a=ht(r,l),a.callback=t??null,At(n,a,l),e.current.lanes=l,kr(e,l,r),Ee(e,r),e}function Hl(e,t,n,r){var l=t.current,a=ke(),o=Lt(l);return n=Au(n),t.context===null?t.context=n:t.pendingContext=n,t=ht(a,o),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=At(l,t,o),e!==null&&(et(e,l,o,a),Yr(e,l,o)),o}function Pl(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function gs(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function lo(e,t){gs(e,t),(e=e.alternate)&&gs(e,t)}function gf(){return null}var Lu=typeof reportError=="function"?reportError:function(e){console.error(e)};function ao(e){this._internalRoot=e}Vl.prototype.render=ao.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(k(409));Hl(e,t,null,null)};Vl.prototype.unmount=ao.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;tn(function(){Hl(null,e,null,null)}),t[gt]=null}};function Vl(e){this._internalRoot=e}Vl.prototype.unstable_scheduleHydration=function(e){if(e){var t=dc();e={blockedOn:null,target:e,priority:t};for(var n=0;n<jt.length&&t!==0&&t<jt[n].priority;n++);jt.splice(n,0,e),n===0&&fc(e)}};function io(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function $l(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function xs(){}function xf(e,t,n,r,l){if(l){if(typeof r=="function"){var a=r;r=function(){var d=Pl(o);a.call(d)}}var o=_u(t,r,e,0,null,!1,!1,"",xs);return e._reactRootContainer=o,e[gt]=o.current,dr(e.nodeType===8?e.parentNode:e),tn(),o}for(;l=e.lastChild;)e.removeChild(l);if(typeof r=="function"){var s=r;r=function(){var d=Pl(c);s.call(d)}}var c=ro(e,0,!1,null,null,!1,!1,"",xs);return e._reactRootContainer=c,e[gt]=c.current,dr(e.nodeType===8?e.parentNode:e),tn(function(){Hl(t,c,n,r)}),c}function Bl(e,t,n,r,l){var a=n._reactRootContainer;if(a){var o=a;if(typeof l=="function"){var s=l;l=function(){var c=Pl(o);s.call(c)}}Hl(t,o,e,l)}else o=xf(n,t,e,l,r);return Pl(o)}cc=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Gn(t.pendingLanes);n!==0&&(Ni(t,n|1),Ee(t,ae()),!(V&6)&&(Mn=ae()+500,Ot()))}break;case 13:tn(function(){var r=xt(e,1);if(r!==null){var l=ke();et(r,e,1,l)}}),lo(e,1)}};Ci=function(e){if(e.tag===13){var t=xt(e,134217728);if(t!==null){var n=ke();et(t,e,134217728,n)}lo(e,134217728)}};uc=function(e){if(e.tag===13){var t=Lt(e),n=xt(e,t);if(n!==null){var r=ke();et(n,e,t,r)}lo(e,t)}};dc=function(){return W};pc=function(e,t){var n=W;try{return W=e,t()}finally{W=n}};_a=function(e,t,n){switch(t){case"input":if(Ca(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var l=Ll(r);if(!l)throw Error(k(90));$s(r),Ca(r,l)}}}break;case"textarea":qs(e,n);break;case"select":t=n.value,t!=null&&vn(e,!!n.multiple,t,!1)}};Js=Zi;Zs=tn;var yf={usingClientEntryPoint:!1,Events:[Sr,pn,Ll,Ys,Ks,Zi]},Vn={findFiberByHostInstance:Gt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},vf={bundleType:Vn.bundleType,version:Vn.version,rendererPackageName:Vn.rendererPackageName,rendererConfig:Vn.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:vt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=nc(e),e===null?null:e.stateNode},findFiberByHostInstance:Vn.findFiberByHostInstance||gf,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Br=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Br.isDisabled&&Br.supportsFiber)try{Tl=Br.inject(vf),ot=Br}catch{}}Le.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=yf;Le.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!io(t))throw Error(k(200));return mf(e,t,null,n)};Le.createRoot=function(e,t){if(!io(e))throw Error(k(299));var n=!1,r="",l=Lu;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(l=t.onRecoverableError)),t=ro(e,1,!1,null,null,n,!1,r,l),e[gt]=t.current,dr(e.nodeType===8?e.parentNode:e),new ao(t)};Le.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(k(188)):(e=Object.keys(e).join(","),Error(k(268,e)));return e=nc(t),e=e===null?null:e.stateNode,e};Le.flushSync=function(e){return tn(e)};Le.hydrate=function(e,t,n){if(!$l(t))throw Error(k(200));return Bl(null,e,t,!0,n)};Le.hydrateRoot=function(e,t,n){if(!io(e))throw Error(k(405));var r=n!=null&&n.hydratedSources||null,l=!1,a="",o=Lu;if(n!=null&&(n.unstable_strictMode===!0&&(l=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),t=_u(t,null,e,1,n??null,l,!1,a,o),e[gt]=t.current,dr(e),r)for(e=0;e<r.length;e++)n=r[e],l=n._getVersion,l=l(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,l]:t.mutableSourceEagerHydrationData.push(n,l);return new Vl(t)};Le.render=function(e,t,n){if(!$l(t))throw Error(k(200));return Bl(null,e,t,!1,n)};Le.unmountComponentAtNode=function(e){if(!$l(e))throw Error(k(40));return e._reactRootContainer?(tn(function(){Bl(null,null,e,!1,function(){e._reactRootContainer=null,e[gt]=null})}),!0):!1};Le.unstable_batchedUpdates=Zi;Le.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!$l(n))throw Error(k(200));if(e==null||e._reactInternals===void 0)throw Error(k(38));return Bl(e,t,n,!1,r)};Le.version="18.3.1-next-f1338f8080-20240426";function Iu(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Iu)}catch(e){console.error(e)}}Iu(),Is.exports=Le;var wf=Is.exports,ys=wf;va.createRoot=ys.createRoot,va.hydrateRoot=ys.hydrateRoot;/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kf=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Du=(...e)=>e.filter((t,n,r)=>!!t&&r.indexOf(t)===n).join(" ");/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var bf={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sf=z.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:n=2,absoluteStrokeWidth:r,className:l="",children:a,iconNode:o,...s},c)=>z.createElement("svg",{ref:c,...bf,width:t,height:t,stroke:e,strokeWidth:r?Number(n)*24/Number(t):n,className:Du("lucide",l),...s},[...o.map(([d,m])=>z.createElement(d,m)),...Array.isArray(a)?a:[a]]));/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=(e,t)=>{const n=z.forwardRef(({className:r,...l},a)=>z.createElement(Sf,{ref:a,iconNode:t,className:Du(`lucide-${kf(e)}`,r),...l}));return n.displayName=`${e}`,n};/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jf=D("Activity",[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ru=D("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oo=D("Award",[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uu=D("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nf=D("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cf=D("ChevronUp",[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pf=D("CircleCheckBig",[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zf=D("CirclePlus",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 12h8",key:"1wcyev"}],["path",{d:"M12 8v8",key:"napkw2"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fu=D("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pi=D("Cloud",[["path",{d:"M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z",key:"p7xjir"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rl=D("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ef=D("Film",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M7 3v18",key:"bbkbws"}],["path",{d:"M3 7.5h4",key:"zfgn84"}],["path",{d:"M3 12h18",key:"1i2n21"}],["path",{d:"M3 16.5h4",key:"1230mu"}],["path",{d:"M17 3v18",key:"in4fa5"}],["path",{d:"M17 7.5h4",key:"myr1c1"}],["path",{d:"M17 16.5h4",key:"go4c1d"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const so=D("Flame",[["path",{d:"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",key:"96xj49"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vs=D("FolderOpen",[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",key:"usdka0"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tf=D("FolderSearch",[["path",{d:"M10.7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v4.1",key:"1bw5m7"}],["path",{d:"m21 21-1.9-1.9",key:"1g2n9r"}],["circle",{cx:"17",cy:"17",r:"3",key:"18b49y"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ve=D("Gamepad2",[["line",{x1:"6",x2:"10",y1:"11",y2:"11",key:"1gktln"}],["line",{x1:"8",x2:"8",y1:"9",y2:"13",key:"qnk9ow"}],["line",{x1:"15",x2:"15.01",y1:"12",y2:"12",key:"krot7o"}],["line",{x1:"18",x2:"18.01",y1:"10",y2:"10",key:"1lcuu1"}],["path",{d:"M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z",key:"mfqc10"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mf=D("Hourglass",[["path",{d:"M5 22h14",key:"ehvnwv"}],["path",{d:"M5 2h14",key:"pdyrp9"}],["path",{d:"M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22",key:"1d314k"}],["path",{d:"M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2",key:"1vvvr6"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ws=D("Image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Af=D("Key",[["path",{d:"m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4",key:"g0fldk"}],["path",{d:"m21 2-9.6 9.6",key:"1j0ho8"}],["circle",{cx:"7.5",cy:"15.5",r:"5.5",key:"yqb3hr"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _f=D("Keyboard",[["path",{d:"M10 8h.01",key:"1r9ogq"}],["path",{d:"M12 12h.01",key:"1mp3jc"}],["path",{d:"M14 8h.01",key:"1primd"}],["path",{d:"M16 12h.01",key:"1l6xoz"}],["path",{d:"M18 8h.01",key:"emo2bl"}],["path",{d:"M6 8h.01",key:"x9i8wu"}],["path",{d:"M7 16h10",key:"wp8him"}],["path",{d:"M8 12h.01",key:"czm47f"}],["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lf=D("Layers",[["path",{d:"m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z",key:"8b97xw"}],["path",{d:"m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65",key:"dd6zsq"}],["path",{d:"m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65",key:"ep9fru"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const If=D("Library",[["path",{d:"m16 6 4 14",key:"ji33uf"}],["path",{d:"M12 6v14",key:"1n7gus"}],["path",{d:"M8 8v12",key:"1gg7y9"}],["path",{d:"M4 4v16",key:"6qkkli"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ks=D("Link",[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",key:"1cjeqo"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",key:"19qd67"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Df=D("LockOpen",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 9.9-1",key:"1mm8w8"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rf=D("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uf=D("Minus",[["path",{d:"M5 12h14",key:"1ays0h"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ou=D("Monitor",[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ff=D("Pin",[["path",{d:"M12 17v5",key:"bb1du9"}],["path",{d:"M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",key:"1nkz8b"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ql=D("Play",[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Of=D("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hf=D("Power",[["path",{d:"M12 2v10",key:"mnfbl"}],["path",{d:"M18.4 6.6a9 9 0 1 1-12.77.04",key:"obofu9"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vf=D("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $f=D("Save",[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hu=D("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vu=D("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $u=D("ShoppingCart",[["circle",{cx:"8",cy:"21",r:"1",key:"jimo8o"}],["circle",{cx:"19",cy:"21",r:"1",key:"13723u"}],["path",{d:"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",key:"9zh506"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bf=D("SlidersVertical",[["line",{x1:"4",x2:"4",y1:"21",y2:"14",key:"1p332r"}],["line",{x1:"4",x2:"4",y1:"10",y2:"3",key:"gb41h5"}],["line",{x1:"12",x2:"12",y1:"21",y2:"12",key:"hf2csr"}],["line",{x1:"12",x2:"12",y1:"8",y2:"3",key:"1kfi7u"}],["line",{x1:"20",x2:"20",y1:"21",y2:"16",key:"1lhrwl"}],["line",{x1:"20",x2:"20",y1:"12",y2:"3",key:"16vvfq"}],["line",{x1:"2",x2:"6",y1:"14",y2:"14",key:"1uebub"}],["line",{x1:"10",x2:"14",y1:"8",y2:"8",key:"1yglbp"}],["line",{x1:"18",x2:"22",y1:"16",y2:"16",key:"1jxqpz"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bu=D("Smartphone",[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2",key:"1yt0o3"}],["path",{d:"M12 18h.01",key:"mhygvu"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qf=D("SquareCheckBig",[["path",{d:"M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.5",key:"1uzm8b"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gf=D("SquarePen",[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",key:"ohrbg2"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qu=D("Square",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nr=D("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wf=D("Tag",[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",key:"vktsd0"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor",key:"kqv944"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zl=D("Trophy",[["path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6",key:"17hqa7"}],["path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18",key:"lmptdp"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",key:"1nw9bq"}],["path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",key:"1np0yb"}],["path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z",key:"u46fv3"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xf=D("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qf=D("Volume2",[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["path",{d:"M16 9a5 5 0 0 1 0 6",key:"1q6k2b"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728",key:"ijwkga"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yf=D("VolumeX",[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["line",{x1:"22",x2:"16",y1:"9",y2:"15",key:"1ewh16"}],["line",{x1:"16",x2:"22",y1:"9",y2:"15",key:"5ykzw1"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gl=D("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);let $n=null,Vt=[],je=null,$t=!1;function an(){return $n||($n=new(window.AudioContext||window.webkitAudioContext)),$n.state==="suspended"&&$n.resume(),$n}const j={setMuted:e=>{$t=e,$t&&j.stopAmbience()},getMuted:()=>$t,playHoverTick:()=>{if(!$t)try{const e=an(),t=e.createOscillator(),n=e.createGain(),r=e.createBiquadFilter();t.connect(r),r.connect(n),n.connect(e.destination),t.type="triangle",t.frequency.setValueAtTime(1800,e.currentTime),t.frequency.exponentialRampToValueAtTime(300,e.currentTime+.04),r.type="lowpass",r.frequency.setValueAtTime(2e3,e.currentTime),n.gain.setValueAtTime(.015,e.currentTime),n.gain.exponentialRampToValueAtTime(.001,e.currentTime+.04),t.start(e.currentTime),t.stop(e.currentTime+.05)}catch{}},playClickPulse:()=>{if(!$t)try{const e=an(),t=e.createOscillator(),n=e.createOscillator(),r=e.createGain();t.connect(r),n.connect(r),r.connect(e.destination),t.type="sine",t.frequency.setValueAtTime(380,e.currentTime),t.frequency.exponentialRampToValueAtTime(120,e.currentTime+.12),n.type="triangle",n.frequency.setValueAtTime(760,e.currentTime),n.frequency.exponentialRampToValueAtTime(240,e.currentTime+.08),r.gain.setValueAtTime(.06,e.currentTime),r.gain.exponentialRampToValueAtTime(.001,e.currentTime+.12),t.start(e.currentTime),n.start(e.currentTime),t.stop(e.currentTime+.15),n.stop(e.currentTime+.15)}catch{}},playLaunchSwell:()=>{if(!$t)try{const e=an(),t=e.currentTime,n=e.createGain();n.connect(e.destination),n.gain.setValueAtTime(.18,t),n.gain.exponentialRampToValueAtTime(.001,t+3);const r=e.createOscillator();r.type="sine",r.frequency.setValueAtTime(55,t),r.frequency.linearRampToValueAtTime(30,t+1.2);const l=e.createGain();l.gain.setValueAtTime(.4,t),l.gain.exponentialRampToValueAtTime(.001,t+1.2),r.connect(l),l.connect(n),r.start(t),r.stop(t+1.5),[110,164.81,220,277.18].forEach((o,s)=>{const c=e.createOscillator(),d=e.createGain(),m=e.createOscillator(),g=e.createGain();g.gain.setValueAtTime(1.5,t),m.connect(g),g.connect(c.frequency),c.connect(d),d.connect(n),c.type="sawtooth",c.frequency.setValueAtTime(o,t),m.frequency.setValueAtTime(6+s,t);const h=e.createBiquadFilter();h.type="lowpass",h.frequency.setValueAtTime(120,t),h.frequency.exponentialRampToValueAtTime(1600,t+1.5),h.Q.setValueAtTime(4,t),c.disconnect(d),c.connect(h),h.connect(d),d.gain.setValueAtTime(0,t),d.gain.linearRampToValueAtTime(.12,t+.6+s*.1),d.gain.exponentialRampToValueAtTime(.001,t+2.5),m.start(t),c.start(t),m.stop(t+3),c.stop(t+3)})}catch{}},startAmbience:e=>{if(!$t)try{const t=an();j.stopAmbience(),je=t.createGain(),je.connect(t.destination),je.gain.setValueAtTime(.001,t.currentTime),je.gain.linearRampToValueAtTime(.05,t.currentTime+1);const n=t.currentTime;e==="synth"?[46.25,69.3,92.5].forEach((l,a)=>{const o=t.createOscillator(),s=t.createBiquadFilter();o.type="sawtooth",o.frequency.setValueAtTime(l+(Math.random()-.5)*.5,n),s.type="lowpass",s.frequency.setValueAtTime(110,n);const c=t.createOscillator(),d=t.createGain();c.type="sine",c.frequency.setValueAtTime(.15+a*.05,n),d.gain.setValueAtTime(40,n),c.connect(d),d.connect(s.frequency),o.connect(s),s.connect(je),c.start(n),o.start(n),Vt.push(o,c)}):e==="orchestra"?[36.71,55,73.42,87.31].forEach((l,a)=>{const o=t.createOscillator(),s=t.createBiquadFilter();o.type="triangle",o.frequency.setValueAtTime(l,n),s.type="lowpass",s.frequency.setValueAtTime(160,n),o.connect(s),s.connect(je),o.start(n),Vt.push(o)}):e==="guitar"?[110,164.81,246.94].forEach((l,a)=>{const o=t.createOscillator();o.type="sine",o.frequency.setValueAtTime(l,n);const s=t.createGain();s.gain.setValueAtTime(.4,n);const c=t.createOscillator(),d=t.createGain();c.type="sine",c.frequency.setValueAtTime(1+a*.5,n),d.gain.setValueAtTime(.2,n),c.connect(d),d.connect(s.gain),o.connect(s),s.connect(je),c.start(n),o.start(n),Vt.push(o,c)}):e==="ambient"?[130.81,196,261.63,329.63].forEach((l,a)=>{const o=t.createOscillator();o.type="sine",o.frequency.setValueAtTime(l,n);const s=t.createGain();s.gain.setValueAtTime(.1,n);const c=t.createOscillator(),d=t.createGain();c.type="sine",c.frequency.setValueAtTime(.05+a*.02,n),d.gain.setValueAtTime(.08,n),c.connect(d),d.connect(s.gain),o.connect(s),s.connect(je),c.start(n),o.start(n),Vt.push(o,c)}):[98,146.83,196].forEach((l,a)=>{const o=t.createOscillator();o.type="triangle",o.frequency.setValueAtTime(l,n);const s=t.createBiquadFilter();s.type="lowpass",s.frequency.setValueAtTime(300,n),o.connect(s),s.connect(je),o.start(n),Vt.push(o)})}catch{}},stopAmbience:()=>{try{je&&(je.gain.setValueAtTime(je.gain.value,an().currentTime),je.gain.exponentialRampToValueAtTime(.001,an().currentTime+.4)),setTimeout(()=>{Vt.forEach(e=>{try{e.stop()}catch{}}),Vt=[],je=null},500)}catch{}}};function Kf({onSearchChange:e,searchQuery:t,onOpenSettings:n,cpuUsage:r,ramUsage:l,activeView:a,onViewChange:o}){const[s,c]=z.useState("");z.useEffect(()=>{const m=()=>{const h=new Date;let y=h.getHours(),x=h.getMinutes();const w=y>=12?"PM":"AM";y=y%12,y=y||12,x=x<10?"0"+x:x,c(`${y}:${x} ${w}`)};m();const g=setInterval(m,1e3);return()=>clearInterval(g)},[]);const d=m=>{j.playClickPulse(),window.electronAPI&&(m==="minimize"&&window.electronAPI.windowMinimize(),m==="maximize"&&window.electronAPI.windowMaximize(),m==="close"&&window.electronAPI.windowClose())};return i.jsxs("header",{className:"navigation-header",children:[i.jsx("div",{className:"titlebar-draggable"}),i.jsxs("div",{className:"nav-left",children:[i.jsx("div",{className:"nexus-logo",children:"N E X U S"}),i.jsxs("div",{className:"mode-tabs",children:[i.jsxs("button",{className:`mode-tab ${a==="library"?"active":""}`,onClick:()=>{j.playClickPulse(),o("library")},children:[i.jsx(If,{size:12}),i.jsx("span",{children:"Library"})]}),i.jsxs("button",{className:`mode-tab ${a==="favourites"?"active":""}`,onClick:()=>{j.playClickPulse(),o("favourites")},children:[i.jsx(zl,{size:12}),i.jsx("span",{children:"Favourites"})]}),i.jsxs("button",{className:`mode-tab ${a==="store"||a==="store-item"?"active":""}`,onClick:()=>{j.playClickPulse(),o("store")},children:[i.jsx($u,{size:12}),i.jsx("span",{children:"Store"})]})]})]}),i.jsx("div",{className:"nav-center",children:i.jsxs("div",{className:"search-wrapper",children:[i.jsx(Hu,{size:14,className:"search-icon"}),i.jsx("input",{type:"text",placeholder:"Search games, activities...",className:"search-input",value:t,onChange:m=>e(m.target.value),onFocus:j.playHoverTick})]})}),i.jsxs("div",{className:"nav-right",children:[i.jsxs("div",{className:"system-telemetry-pill",children:[i.jsxs("div",{className:"telemetry-item",children:[i.jsx("span",{className:"telemetry-label",children:"CPU"}),i.jsxs("span",{className:"telemetry-value",children:[r,"%"]})]}),i.jsx("div",{className:"telemetry-divider"}),i.jsxs("div",{className:"telemetry-item",children:[i.jsx("span",{className:"telemetry-label",children:"RAM"}),i.jsxs("span",{className:"telemetry-value",children:[l,"%"]})]})]}),i.jsx("button",{className:"nav-icon-btn",onClick:n,onMouseEnter:j.playHoverTick,title:"Launcher Settings",children:i.jsx(Vu,{size:18})}),i.jsxs("div",{className:"profile-avatar-pill",onMouseEnter:j.playHoverTick,title:"User Profile",children:[i.jsx("div",{className:"avatar-icon-wrapper",children:i.jsx(Xf,{size:14})}),i.jsx("span",{className:"avatar-username",children:"Player 1"})]}),i.jsx("div",{className:"live-clock",children:s}),i.jsxs("div",{className:"titlebar-controls-container",children:[i.jsx("button",{className:"titlebar-btn",onClick:()=>d("minimize"),title:"Minimize",children:i.jsx(Uf,{size:14})}),i.jsx("button",{className:"titlebar-btn",onClick:()=>d("maximize"),title:"Maximize/Restore",children:i.jsx(qu,{size:10})}),i.jsx("button",{className:"titlebar-btn close-btn",onClick:()=>d("close"),title:"Close",children:i.jsx(Gl,{size:14})})]})]}),i.jsx("style",{dangerouslySetInnerHTML:{__html:`
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
      `}})]})}function Jf({theme:e,speedFactor:t=1,density:n=1}){const r=z.useRef(null),l=z.useRef({x:-1e3,y:-1e3,vx:0,vy:0,lastX:0,lastY:0}),a=z.useRef({x:0,y:0,radius:0,active:!1});return z.useEffect(()=>{const o=r.current;if(!o)return;const s=o.getContext("2d");let c,d=[];const m=()=>{o.width=window.innerWidth,o.height=window.innerHeight,y()},g=()=>e==="theme-cyber"?["#ffffff","#ff007f","#8a2be2","#ff80bf"]:e==="theme-emerald"?["#ffffff","#00ff66","#00cc52","#99ffe6"]:e==="theme-gold"?["#ffffff","#e6af2e","#f3d382","#fff0d0"]:["#ffffff","#00e5ff","#00aaff","#b3f0ff"];class h{constructor(){this.x=Math.random()*o.width,this.y=Math.random()*o.height,this.size=Math.random()*2+.5,this.baseXSpeed=(Math.random()-.5)*.25*t,this.baseYSpeed=-Math.random()*.4*t-.1,this.vx=this.baseXSpeed,this.vy=this.baseYSpeed;const p=g();this.color=p[Math.floor(Math.random()*p.length)],this.alpha=Math.random()*.6+.1,this.baseAlpha=this.alpha,this.decay=Math.random()*.005+.002,this.flickerSpeed=Math.random()*.05+.01,this.flickerDir=Math.random()>.5?1:-1}update(p,v){this.x+=this.vx,this.y+=this.vy,this.y<-10&&(this.y=o.height+10,this.x=Math.random()*o.width),this.x<-10&&(this.x=o.width+10),this.x>o.width+10&&(this.x=-10),this.vx+=(this.baseXSpeed-this.vx)*.08,this.vy+=(this.baseYSpeed-this.vy)*.08;const S=this.x-p.x,C=this.y-p.y,N=Math.sqrt(S*S+C*C),b=120;if(N<b){const R=(b-N)/b,_=Math.atan2(C,S),Z=Math.sqrt(p.vx*p.vx+p.vy*p.vy),me=R*(1.2+Z*.1);this.vx+=Math.cos(_)*me*.5,this.vy+=Math.sin(_)*me*.5,this.alpha=Math.min(.9,this.alpha+.05)}else this.alpha+=this.flickerSpeed*this.flickerDir,this.alpha>this.baseAlpha*1.4&&(this.flickerDir=-1),this.alpha<this.baseAlpha*.6&&(this.flickerDir=1),this.alpha=Math.max(.05,Math.min(.8,this.alpha));if(v.active){const R=this.x-v.x,_=this.y-v.y,Z=Math.sqrt(R*R+_*_),me=v.radius;if(Z<me&&Z>me-40){const nt=Math.atan2(_,R),De=6*(1-Z/600);this.vx+=Math.cos(nt)*De,this.vy+=Math.sin(nt)*De,this.alpha=1}}}draw(){s.save(),s.globalAlpha=this.alpha,s.fillStyle=this.color,s.beginPath(),s.arc(this.x,this.y,this.size,0,Math.PI*2),s.shadowBlur=this.size*3,s.shadowColor=this.color,s.fill(),s.restore()}}const y=()=>{d=[];const u=Math.min(120,Math.floor(o.width*o.height/1e4)*n);for(let p=0;p<u;p++)d.push(new h)};window.addEventListener("resize",m),m();const x=u=>{const p=l.current;p.x=u.clientX,p.y=u.clientY,p.vx=p.x-p.lastX,p.vy=p.y-p.lastY,p.lastX=p.x,p.lastY=p.y,clearTimeout(p.velocityTimeout),p.velocityTimeout=setTimeout(()=>{p.vx=0,p.vy=0},50)},w=()=>{const u=l.current;u.x=-1e3,u.y=-1e3,u.vx=0,u.vy=0},L=u=>{a.current={x:u.clientX,y:u.clientY,radius:0,active:!0}};window.addEventListener("mousemove",x),window.addEventListener("mouseleave",w),window.addEventListener("click",L);const f=()=>{s.clearRect(0,0,o.width,o.height);const u=a.current;u.active&&(u.radius+=12,u.radius>800&&(u.active=!1)),d.forEach(p=>{p.update(l.current,u),p.draw()}),c=requestAnimationFrame(f)};return f(),()=>{window.removeEventListener("resize",m),window.removeEventListener("mousemove",x),window.removeEventListener("mouseleave",w),window.removeEventListener("click",L),cancelAnimationFrame(c)}},[e,t,n]),i.jsx("canvas",{ref:r,style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:11}})}function Zf({games:e,selectedGame:t,onSelectGame:n,onLaunchGame:r,runningGameId:l}){const a=z.useRef(null),o=s=>{j.playClickPulse(),n(s)};return i.jsxs("div",{className:"horizontal-library-shelf",ref:a,children:[i.jsxs("div",{className:"shelf-title-row",children:[i.jsx("h2",{className:"shelf-title",children:"My Library"}),i.jsxs("span",{className:"library-count",children:[e.length," games available"]})]}),i.jsx("div",{className:"library-grid-horizontal",children:e.map(s=>{const c=(t==null?void 0:t.id)===s.id,d=l===s.id;return i.jsx(e0,{game:s,isSelected:c,isRunning:d,onClick:()=>o(s),onLaunch:()=>r(s)},s.id)})}),i.jsx("style",{dangerouslySetInnerHTML:{__html:`
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
      `}})]})}function e0({game:e,isSelected:t,isRunning:n,onClick:r,onLaunch:l}){const a=z.useRef(null),[o,s]=z.useState({x:0,y:0,scale:1}),c=h=>{const y=a.current;if(!y)return;const x=y.getBoundingClientRect(),w=h.clientX-x.left,L=h.clientY-x.top,f=x.width,u=x.height,p=15,v=(L-u/2)/(u/2)*p,S=-((w-f/2)/(f/2))*p;s({x:v,y:S,scale:1.06})},d=()=>{s({x:0,y:0,scale:1})},m=h=>{h.stopPropagation(),l()},g=Math.round(e.playtime/3600*10)/10;return i.jsxs("div",{ref:a,className:`game-card-wrapper ${t?"selected":""} ${n?"running":""}`,onClick:r,onMouseMove:c,onMouseLeave:d,onMouseEnter:j.playHoverTick,style:{transform:`rotateX(${o.x}deg) rotateY(${o.y}deg) scale(${o.scale})`,transition:o.scale===1?"transform 0.5s ease":"transform 0.08s ease"},children:[i.jsxs("div",{className:"card-face",children:[i.jsxs("div",{className:"card-image-container",children:[i.jsx("img",{src:e.coverUrl,alt:e.title,className:"card-image",loading:"lazy"}),n&&i.jsxs("div",{className:"running-overlay-indicator",children:[i.jsx("span",{className:"running-dot-pulse"}),i.jsx("span",{className:"running-text",children:"Running"})]}),i.jsx("div",{className:"card-hover-actions",children:i.jsx("button",{className:`quick-play-button ${n?"running-btn":""}`,onClick:m,title:n?"Game Running":"Launch Game",children:i.jsx(ql,{fill:n?"transparent":"currentColor",size:16})})}),e.isFavorite&&i.jsx("div",{className:"favorite-indicator-badge",children:i.jsx(Nr,{size:10,fill:"currentColor"})})]}),i.jsxs("div",{className:"card-details-panel",children:[i.jsx("div",{className:"card-title",children:e.title}),i.jsxs("div",{className:"card-meta-metrics",children:[i.jsxs("div",{className:"metric-item",title:"Total Playtime",children:[i.jsx(so,{size:12,className:"metric-icon"}),i.jsxs("span",{children:[g,"h"]})]}),e.progress>0&&i.jsxs("div",{className:"metric-item",title:"Completion Progress",children:[i.jsx(oo,{size:12,className:"metric-icon"}),i.jsxs("span",{children:[e.progress,"%"]})]})]})]})]}),i.jsx("style",{dangerouslySetInnerHTML:{__html:`
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
      `}})]})}function t0({game:e,onLaunch:t,onToggleFavorite:n,onEditMetadata:r,onPinSidebar:l,isRunning:a,isSidebarPinned:o}){var h;if(!e)return null;const s=()=>{j.playClickPulse(),t(e)},c=()=>{j.playClickPulse(),n(e.id)},d=()=>{j.playClickPulse(),r(e)},m=()=>{j.playClickPulse(),l()},g=y=>{const x=Math.floor(y/3600),w=Math.floor(y%3600/60);return x===0?`${w} mins`:`${x}h ${w}m`};return i.jsxs("div",{className:"game-main-banner-container",children:[i.jsxs("div",{className:"backdrop-image-mask",children:[i.jsx("img",{src:e.bannerUrl,alt:e.title,className:"banner-backdrop-img backdrop-parallax"},e.id),i.jsx("div",{className:"backdrop-overlay-vignette"})]}),i.jsxs("div",{className:"banner-content-box",children:[i.jsx("div",{className:"genre-badges-row",children:(h=e.tags)==null?void 0:h.map((y,x)=>i.jsx("span",{className:"genre-badge",children:y},x))}),e.logoUrl?i.jsx("img",{src:e.logoUrl,alt:e.title,className:"banner-logo-img"}):i.jsx("h1",{className:"banner-game-title",children:e.title}),i.jsxs("div",{className:"developer-meta",children:[i.jsx("span",{children:e.developer}),i.jsx("span",{className:"dot-divider"}),i.jsxs("span",{children:["Rating: ",i.jsxs("strong",{children:[e.rating,"★"]})]})]}),i.jsx("p",{className:"game-banner-description",children:e.description}),i.jsxs("div",{className:"telemetry-stats-glass-row",children:[i.jsxs("div",{className:"stat-glass-card",children:[i.jsx(Fu,{size:16,className:"stat-icon"}),i.jsxs("div",{className:"stat-info",children:[i.jsx("span",{className:"stat-label",children:"Playtime"}),i.jsx("span",{className:"stat-value",children:g(e.playtime)})]})]}),i.jsxs("div",{className:"stat-glass-card",children:[i.jsx(so,{size:16,className:"stat-icon"}),i.jsxs("div",{className:"stat-info",children:[i.jsx("span",{className:"stat-label",children:"Last Session"}),i.jsx("span",{className:"stat-value",children:e.lastPlayed})]})]}),e.progress>0&&i.jsxs("div",{className:"stat-glass-card",children:[i.jsx(oo,{size:16,className:"stat-icon"}),i.jsxs("div",{className:"stat-info",children:[i.jsx("span",{className:"stat-label",children:"Progress"}),i.jsxs("span",{className:"stat-value",children:[e.progress,"% (",e.timeToComplete," left)"]})]})]})]}),i.jsxs("div",{className:"banner-actions-row",children:[i.jsxs("button",{className:`glow-btn glow-btn-primary play-game-btn ${a?"running-pulse":""}`,onClick:s,onMouseEnter:j.playHoverTick,children:[i.jsx(ql,{fill:a?"transparent":"currentColor",size:18}),i.jsx("span",{children:a?"Running...":"Play Game"})]}),i.jsxs("button",{className:`glow-btn action-pill-btn ${o?"pinned-active":""}`,onClick:m,onMouseEnter:j.playHoverTick,title:"Pin Achievements to Side",children:[i.jsx(Ff,{size:16}),i.jsx("span",{children:o?"Pinned":"Pin to Side"})]}),i.jsxs("button",{className:"glow-btn action-pill-btn",onClick:d,onMouseEnter:j.playHoverTick,title:"Edit Game Metadata",children:[i.jsx(Gf,{size:16}),i.jsx("span",{children:"Metadata"})]}),i.jsx("button",{className:`glow-btn action-pill-btn fav-pill-btn ${e.isFavorite?"active-favorite":""}`,onClick:c,onMouseEnter:j.playHoverTick,title:"Add to Favorites",children:i.jsx(Nr,{size:16,fill:e.isFavorite?"currentColor":"transparent"})})]})]}),i.jsx("style",{dangerouslySetInnerHTML:{__html:`
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
      `}})]})}function n0({isOpen:e,onToggle:t,onOpenSettings:n,onManualImport:r,onImportScannedGames:l,onBatchFetchArtwork:a,isBatchFetchingArtwork:o=!1,cpuUsage:s,ramUsage:c,games:d}){const[m,g]=z.useState(""),[h,y]=z.useState(!1),[x,w]=z.useState([]),[L,f]=z.useState({}),u=()=>{j.playClickPulse(),t()},p=async()=>{if(j.playClickPulse(),window.electronAPI){const b=await window.electronAPI.selectDirectory();b&&g(b)}else g("C:\\Program Files (x86)\\Steam\\steamapps\\common")},v=async()=>{if(m){j.playClickPulse(),y(!0),w([]);try{if(window.electronAPI){const b=await window.electronAPI.scanExecutables(m);setTimeout(()=>{w(b),y(!1);const R={};b.forEach(_=>{R[_.path]=!0}),f(R)},1500)}else setTimeout(()=>{const b=[{name:"eldenring",path:"C:\\SteamLibrary\\steamapps\\common\\Elden Ring\\Game\\eldenring.exe"},{name:"hades",path:"C:\\SteamLibrary\\steamapps\\common\\Hades\\hades.exe"},{name:"minecraft",path:"C:\\Games\\Minecraft\\minecraft.exe"}];w(b),y(!1);const R={};b.forEach(_=>{R[_.path]=!0}),f(R)},1800)}catch{y(!1)}}},S=b=>{j.playHoverTick(),f(R=>({...R,[b]:!R[b]}))},C=()=>{j.playClickPulse();const b=x.filter(R=>L[R.path]);b.length!==0&&(l(b),w([]),g(""),t())},N=async()=>{if(j.playClickPulse(),window.electronAPI){const b=await window.electronAPI.powerOff();b&&!b.success&&alert(`Windows shutdown failed: ${b.error}`)}else alert("Windows Shut Down (Mock)")};return i.jsxs("div",{className:`control-center-drawer-container ${e?"drawer-open":""}`,children:[i.jsxs("div",{className:"drawer-trigger-handle",onClick:u,onMouseEnter:j.playHoverTick,children:[e?i.jsx(Nf,{size:14}):i.jsx(Cf,{size:14}),i.jsx("span",{className:"trigger-text",children:e?"Close CC":"Control Center"})]}),i.jsxs("div",{className:"drawer-panel-grid glass-panel-heavy",children:[i.jsxs("div",{className:"cc-section cc-telemetry-panel",children:[i.jsx("h3",{className:"cc-section-title",children:"System Status"}),i.jsxs("div",{className:"telemetry-bar-item",children:[i.jsxs("div",{className:"bar-labels",children:[i.jsx("span",{children:"CPU Core Load"}),i.jsxs("span",{children:[s,"%"]})]}),i.jsx("div",{className:"bar-container",children:i.jsx("div",{className:"bar-fill",style:{width:`${s}%`}})})]}),i.jsxs("div",{className:"telemetry-bar-item",children:[i.jsxs("div",{className:"bar-labels",children:[i.jsx("span",{children:"RAM Allocation"}),i.jsxs("span",{children:[c,"%"]})]}),i.jsx("div",{className:"bar-container",children:i.jsx("div",{className:"bar-fill",style:{width:`${c}%`}})})]}),i.jsxs("div",{className:"quick-action-buttons-grid",children:[i.jsxs("button",{className:"quick-btn-icon-label",onClick:r,onMouseEnter:j.playHoverTick,children:[i.jsx(zf,{size:18}),i.jsx("span",{children:"Import EXE"})]}),i.jsxs("button",{className:"quick-btn-icon-label artwork-btn",onClick:a,disabled:!a||o,onMouseEnter:j.playHoverTick,title:"Fetch artwork for all games via SteamGridDB",children:[o?i.jsx(rl,{size:18}):i.jsx(pi,{size:18}),i.jsx("span",{children:o?"Fetching":"Fetch Art"})]}),i.jsxs("button",{className:"quick-btn-icon-label",onClick:n,onMouseEnter:j.playHoverTick,children:[i.jsx(Vu,{size:18}),i.jsx("span",{children:"Settings"})]}),i.jsxs("button",{className:"quick-btn-icon-label shutdown-btn",onClick:N,onMouseEnter:j.playHoverTick,children:[i.jsx(Hf,{size:18}),i.jsx("span",{children:"Power Off"})]})]})]}),i.jsxs("div",{className:"cc-section cc-scanner-panel",children:[i.jsx("h3",{className:"cc-section-title",children:"Batch Library Scanner"}),i.jsxs("div",{className:"scanner-input-row",children:[i.jsx("button",{className:"glow-btn browser-directory-btn",onClick:p,onMouseEnter:j.playHoverTick,children:"Browse Path"}),i.jsx("div",{className:"directory-path-display",title:m||"No directory selected",children:m||"Click Browse to select scanning directory..."}),i.jsx("button",{className:"glow-btn glow-btn-primary scan-action-btn",onClick:v,disabled:!m||h,onMouseEnter:j.playHoverTick,children:h?"Scanning...":"Scan Directory"})]}),i.jsxs("div",{className:"scanner-output-box",children:[h&&i.jsxs("div",{className:"scanning-radar-state",children:[i.jsx("div",{className:"radar-sweep-effect"}),i.jsx("span",{className:"radar-text",children:"Analyzing executables, scanning depth 3..."})]}),!h&&x.length===0&&i.jsxs("div",{className:"scanner-empty-state",children:[i.jsx(Tf,{size:24,className:"empty-icon"}),i.jsx("span",{children:"Select a path and click Scan to match executables against PS5 cover database"})]}),!h&&x.length>0&&i.jsxs("div",{className:"scanner-results-list",children:[i.jsxs("div",{className:"results-header",children:[i.jsxs("span",{children:["Found ",x.length," matched games:"]}),i.jsxs("button",{className:"import-submit-badge-btn",onClick:C,children:["Import Selected (",Object.values(L).filter(Boolean).length,")"]})]}),i.jsx("div",{className:"results-grid",children:x.map((b,R)=>{const _=L[b.path];return i.jsxs("div",{className:`result-item-row ${_?"row-active":""}`,onClick:()=>S(b.path),children:[_?i.jsx(qf,{size:14,className:"checkbox-icon"}):i.jsx(qu,{size:14,className:"checkbox-icon"}),i.jsxs("div",{className:"result-info",children:[i.jsx("span",{className:"result-name",children:b.name}),i.jsx("span",{className:"result-path",children:b.path})]})]},R)})})]})]})]})]}),i.jsx("style",{dangerouslySetInnerHTML:{__html:`
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
          grid-template-columns: repeat(4, minmax(0, 1fr));
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

        .quick-btn-icon-label:disabled {
          opacity: 0.45;
          cursor: not-allowed;
          transform: none;
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
      `}})]})}function r0({game:e,onClose:t,isRunning:n,sessionTime:r,cpuUsage:l,ramUsage:a}){if(!e)return null;const o=()=>{j.playClickPulse(),t()},c=(m=>({cyberpunk:[{id:1,title:"The Star",desc:"Complete Cyberpunk main storyline.",progress:80,completed:!1},{id:2,title:"Breathtaking",desc:"Collect all items once belonging to Johnny Silverhand.",progress:100,completed:!0},{id:3,title:"Ten out of Ten",desc:"Reach the max level in any skill tree.",progress:40,completed:!1}],eldenring:[{id:1,title:"Elden Lord",desc:"Achieve the Elden Lord ending in Lands Between.",progress:90,completed:!1},{id:2,title:"Shardbearer Godrick",desc:"Defeat Shardbearer Godrick in Stormveil.",progress:100,completed:!0},{id:3,title:"Legendary Armaments",desc:"Acquire all nine legendary weapons.",progress:75,completed:!1}],hades:[{id:1,title:"Family Reunion",desc:"Welcome all Olympic gods to the House of Hades.",progress:50,completed:!1},{id:2,title:"Champion of Elysium",desc:"Clear Elysium chamber with extreme measures.",progress:100,completed:!0},{id:3,title:"Skelly's Last Lament",desc:"Unlock Skelly's final reward skeleton statue.",progress:10,completed:!1}],portal2:[{id:1,title:"Lunacy",desc:"Place a portal on the moon.",progress:100,completed:!0},{id:2,title:"Professor Portal",desc:"Complete calibration course in co-op mode.",progress:100,completed:!0},{id:3,title:"GHOSTRUST",desc:"Complete Chamber 04 in under 2 minutes.",progress:30,completed:!1}],witcher3:[{id:1,title:"Gwent Master",desc:"Defeat Tybalt and win the Passiflora tournament.",progress:30,completed:!1},{id:2,title:"Lilac and Gooseberries",desc:"Find Yennefer of Vengerberg in White Orchard.",progress:100,completed:!0},{id:3,title:"Passed the Trial",desc:"Complete game on Death March difficulty.",progress:15,completed:!1}]})[m]||[{id:1,title:"First Venture",desc:"Launch and run the game for the first time.",progress:100,completed:!0},{id:2,title:"Enthusiast",desc:"Track over 5 hours of total session gameplay.",progress:0,completed:!1},{id:3,title:"Completionist",desc:"Unlock all sub-system achievements.",progress:0,completed:!1}])(e.id),d=m=>{const g=Math.floor(m/3600),h=Math.floor(m%3600/60),y=m%60,x=w=>String(w).padStart(2,"0");return`${x(g)}:${x(h)}:${x(y)}`};return i.jsxs("div",{className:"pip-sidebar-container glass-panel-heavy",children:[i.jsxs("div",{className:"pip-header",children:[i.jsxs("div",{className:"pip-title-badge",children:[i.jsx(jf,{size:14,className:"pip-badge-icon"}),i.jsx("span",{children:"Activity Snapped"})]}),i.jsx("button",{className:"pip-close-btn",onClick:o,onMouseEnter:j.playHoverTick,children:i.jsx(Gl,{size:14})})]}),i.jsxs("div",{className:"pip-game-hero",children:[i.jsx("img",{src:e.coverUrl,alt:e.title,className:"pip-game-cover"}),i.jsxs("div",{className:"pip-game-info",children:[i.jsx("div",{className:"pip-game-title",children:e.title}),i.jsx("div",{className:"pip-game-dev",children:e.developer})]})]}),n?i.jsxs("div",{className:"pip-widget active-session-widget",children:[i.jsxs("div",{className:"widget-header",children:[i.jsx("span",{className:"session-dot"}),i.jsx("span",{className:"session-label",children:"Active Session Ticking"})]}),i.jsx("div",{className:"session-timer-display",children:d(r)}),i.jsxs("div",{className:"session-telemetry-metrics",children:[i.jsxs("div",{className:"session-metric",children:[i.jsx("span",{className:"met-lbl",children:"CPU Usage"}),i.jsxs("span",{className:"met-val",children:[Math.round(l*1.2),"%"]})]}),i.jsxs("div",{className:"session-metric",children:[i.jsx("span",{className:"met-lbl",children:"Mem Load"}),i.jsxs("span",{className:"met-val",children:[Math.round(a*1.05),"%"]})]})]})]}):i.jsxs("div",{className:"pip-widget session-idle-widget",children:[i.jsx(Mf,{size:18,className:"idle-icon"}),i.jsx("span",{children:"Launcher Idle. Press Play to start tracking playtime."})]}),i.jsxs("div",{className:"pip-widget achievements-checklist-widget",children:[i.jsxs("h4",{className:"widget-title",children:[i.jsx(zl,{size:14,className:"widget-title-icon"}),i.jsx("span",{children:"Trophy Milestones"})]}),i.jsx("div",{className:"achievements-checklist-grid",children:c.map(m=>i.jsxs("div",{className:`achievement-check-row ${m.completed?"completed":""}`,children:[i.jsx("div",{className:"check-box-icon-wrapper",children:m.completed?i.jsx(Pf,{size:16,className:"checked-icon"}):i.jsx("div",{className:"unchecked-circle"})}),i.jsxs("div",{className:"achievement-check-details",children:[i.jsx("div",{className:"ach-check-title",children:m.title}),i.jsx("div",{className:"ach-check-desc",children:m.desc}),!m.completed&&m.progress>0&&i.jsxs("div",{className:"ach-mini-progress-bar",children:[i.jsx("div",{className:"ach-mini-progress-track",children:i.jsx("div",{className:"ach-mini-progress-fill",style:{width:`${m.progress}%`}})}),i.jsxs("span",{className:"ach-mini-progress-text",children:[m.progress,"%"]})]})]})]},m.id))})]}),i.jsx("style",{dangerouslySetInnerHTML:{__html:`
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
      `}})]})}function l0({game:e,onSave:t,onClose:n}){var q;if(!e)return null;const[r,l]=z.useState(e.title),[a,o]=z.useState(e.developer),[s,c]=z.useState(e.genre),[d,m]=z.useState(e.rating),[g,h]=z.useState(e.releaseDate),[y,x]=z.useState(e.progress),[w,L]=z.useState(Math.round(e.playtime/3600*10)/10),[f,u]=z.useState(e.description),[p,v]=z.useState(e.coverUrl),[S,C]=z.useState(e.bannerUrl),[N,b]=z.useState(e.logoUrl||""),[R,_]=z.useState(e.iconUrl||""),[Z,me]=z.useState(e.steamGridDbId||null),[oe,nt]=z.useState(e.steamGridDbName||""),[De,Ht]=z.useState(((q=e.tags)==null?void 0:q.join(", "))||""),[wt,P]=z.useState(e.exePath),[I,U]=z.useState(e.title),[B,Q]=z.useState(null),[Re,Ue]=z.useState(!1),[ct,Fe]=z.useState(null),[We,Cr]=z.useState(!1),[Pr,Xe]=z.useState(null),M=()=>{j.playClickPulse(),n()},A=T=>{T.preventDefault(),j.playClickPulse();const G={...e,title:r,developer:a,genre:s,rating:parseFloat(d)||4,releaseDate:g,progress:parseInt(y)||0,playtime:Math.round(parseFloat(w)*3600)||0,description:f,coverUrl:p,bannerUrl:S,logoUrl:N||null,iconUrl:R||null,steamGridDbId:Z,steamGridDbName:oe||null,artworkFetched:!!(p||S||N||R),exePath:wt,tags:De.split(",").map(le=>le.trim()).filter(Boolean)};t(G)},O=async()=>{if(I.trim()){j.playClickPulse(),Ue(!0),Xe(null);try{if(window.electronAPI){const T=await window.electronAPI.searchSteamGridDB(I.trim());T.error?(Xe(T.error),Q(null)):Q(T)}else Xe("Electron API not available")}catch(T){Xe(T.message)}Ue(!1)}},$=async T=>{j.playClickPulse(),Fe(T.id);try{if(window.electronAPI){const G=await window.electronAPI.fetchArtwork(T.id,e.id,e.title);G.error?Xe(G.error):(G.grid&&v(G.grid),G.hero&&C(G.hero),G.logo&&b(G.logo),G.icon&&_(G.icon),me(G.steamGridDbId||T.id),nt(G.steamGridDbName||T.name||""))}}catch(G){Xe(G.message)}Fe(null)},F=async()=>{var G;const T=I.trim()||r.trim();if(!(!T||!((G=window.electronAPI)!=null&&G.autoFetchArtwork))){j.playClickPulse(),Cr(!0),Xe(null);try{const le=await window.electronAPI.autoFetchArtwork({...e,title:T,forceTitleLookup:!0});le.error?Xe(le.error):(le.grid&&v(le.grid),le.hero&&C(le.hero),le.logo&&b(le.logo),le.icon&&_(le.icon),me(le.steamGridDbId||null),nt(le.steamGridDbName||""),Q([{id:le.steamGridDbId,name:le.steamGridDbName||T,matchScore:le.matchScore}]))}catch(le){Xe(le.message)}Cr(!1)}};return i.jsxs("div",{className:"meta-editor-overlay flex-center",children:[i.jsxs("div",{className:"meta-editor-modal glass-panel-heavy",children:[i.jsxs("div",{className:"editor-header",children:[i.jsx("h2",{className:"editor-title",children:"Metadata Suite"}),i.jsx("button",{className:"editor-close-btn",onClick:M,onMouseEnter:j.playHoverTick,children:i.jsx(Gl,{size:16})})]}),i.jsxs("form",{className:"editor-form-scrollable",onSubmit:A,children:[i.jsxs("div",{className:"editor-grid",children:[i.jsxs("div",{className:"editor-column",children:[i.jsxs("div",{className:"form-group",children:[i.jsx("label",{className:"form-label",children:"Game Title"}),i.jsx("input",{type:"text",className:"glass-input editor-input",value:r,onChange:T=>l(T.target.value),required:!0})]}),i.jsxs("div",{className:"form-group-row",children:[i.jsxs("div",{className:"form-group flex-1",children:[i.jsx("label",{className:"form-label",children:"Developer"}),i.jsx("input",{type:"text",className:"glass-input editor-input",value:a,onChange:T=>o(T.target.value),required:!0})]}),i.jsxs("div",{className:"form-group flex-1",children:[i.jsx("label",{className:"form-label",children:"Genre"}),i.jsx("input",{type:"text",className:"glass-input editor-input",value:s,onChange:T=>c(T.target.value)})]})]}),i.jsxs("div",{className:"form-group-row",children:[i.jsxs("div",{className:"form-group flex-1",children:[i.jsx("label",{className:"form-label",children:"Rating (0-5)"}),i.jsx("input",{type:"number",step:"0.1",min:"0",max:"5",className:"glass-input editor-input",value:d,onChange:T=>m(T.target.value)})]}),i.jsxs("div",{className:"form-group flex-1",children:[i.jsx("label",{className:"form-label",children:"Release Date"}),i.jsx("input",{type:"date",className:"glass-input editor-input",value:g,onChange:T=>h(T.target.value)})]})]}),i.jsxs("div",{className:"form-group-row",children:[i.jsxs("div",{className:"form-group flex-1",children:[i.jsx("label",{className:"form-label",children:"Playtime (Hours)"}),i.jsx("input",{type:"number",step:"0.1",min:"0",className:"glass-input editor-input",value:w,onChange:T=>L(T.target.value)})]}),i.jsxs("div",{className:"form-group flex-1",children:[i.jsx("label",{className:"form-label",children:"Progress (%)"}),i.jsx("input",{type:"number",min:"0",max:"100",className:"glass-input editor-input",value:y,onChange:T=>x(T.target.value)})]})]}),i.jsxs("div",{className:"form-group",children:[i.jsx("label",{className:"form-label",children:"Description Summary"}),i.jsx("textarea",{rows:"3",className:"glass-input editor-textarea",value:f,onChange:T=>u(T.target.value)})]})]}),i.jsxs("div",{className:"editor-column",children:[i.jsxs("div",{className:"form-group",children:[i.jsxs("label",{className:"form-label flex-center-start",children:[i.jsx(ws,{size:13,className:"label-icon"}),i.jsx("span",{children:"Cover Art URL (Vertical)"})]}),i.jsx("input",{type:"text",className:"glass-input editor-input",value:p,onChange:T=>v(T.target.value)})]}),i.jsxs("div",{className:"form-group",children:[i.jsxs("label",{className:"form-label flex-center-start",children:[i.jsx(Ef,{size:13,className:"label-icon"}),i.jsx("span",{children:"Landscape Banner URL"})]}),i.jsx("input",{type:"text",className:"glass-input editor-input",value:S,onChange:T=>C(T.target.value)})]}),i.jsxs("div",{className:"form-group",children:[i.jsxs("label",{className:"form-label flex-center-start",children:[i.jsx(ws,{size:13,className:"label-icon"}),i.jsx("span",{children:"Logo URL"})]}),i.jsx("input",{type:"text",className:"glass-input editor-input",value:N,onChange:T=>b(T.target.value)})]}),i.jsx("div",{className:"form-group-row",children:i.jsxs("div",{className:"form-group flex-1",children:[i.jsxs("label",{className:"form-label flex-center-start",children:[i.jsx(Wf,{size:13,className:"label-icon"}),i.jsx("span",{children:"Tags (comma separated)"})]}),i.jsx("input",{type:"text",className:"glass-input editor-input",placeholder:"e.g. Sci-Fi, Co-op, Ray Tracing",value:De,onChange:T=>Ht(T.target.value)})]})}),i.jsxs("div",{className:"form-group",children:[i.jsxs("label",{className:"form-label flex-center-start",children:[i.jsx(_f,{size:13,className:"label-icon"}),i.jsx("span",{children:"Executable Binary Path (.exe)"})]}),i.jsx("input",{type:"text",className:"glass-input editor-input exe-path-input",value:wt,onChange:T=>P(T.target.value),required:!0})]}),i.jsxs("div",{className:"artwork-fetch-section",children:[i.jsxs("label",{className:"form-label flex-center-start",children:[i.jsx(pi,{size:13,className:"label-icon"}),i.jsx("span",{children:"SteamGridDB Artwork"})]}),i.jsxs("div",{className:"sgdb-search-row",children:[i.jsx("input",{type:"text",className:"glass-input sgdb-search-input",value:I,onChange:T=>U(T.target.value),placeholder:"Search game on SteamGridDB...",onKeyDown:T=>T.key==="Enter"&&O()}),i.jsx("button",{type:"button",className:"glow-btn sgdb-search-btn",onClick:O,disabled:Re,onMouseEnter:j.playHoverTick,children:Re?"...":i.jsx(Hu,{size:13})}),i.jsxs("button",{type:"button",className:"glow-btn sgdb-auto-btn",onClick:F,disabled:We||Re,onMouseEnter:j.playHoverTick,children:[We?i.jsx(rl,{size:13}):i.jsx(pi,{size:13}),i.jsx("span",{children:We?"Fetching":"Auto Match"})]})]}),Pr&&i.jsx("div",{className:"sgdb-error",children:Pr}),B&&B.length>0&&i.jsx("div",{className:"sgdb-results",children:B.slice(0,4).map(T=>{var G;return i.jsxs("div",{className:"sgdb-result-row",children:[i.jsxs("div",{className:"sgdb-result-info",children:[i.jsx("span",{className:"sgdb-result-name",children:T.name}),T.release_date&&i.jsxs("span",{className:"sgdb-result-year",children:["(",(G=T.release_date)==null?void 0:G.slice(0,4),")"]}),typeof T.matchScore=="number"&&i.jsxs("span",{className:"sgdb-result-year",children:[T.matchScore,"%"]})]}),i.jsxs("button",{type:"button",className:"glow-btn sgdb-apply-btn",onClick:()=>$(T),disabled:ct===T.id,onMouseEnter:j.playHoverTick,children:[ct===T.id?i.jsx(rl,{size:11}):i.jsx(rl,{size:11}),i.jsx("span",{children:ct===T.id?"Fetching...":"Fetch All"})]})]},T.id)})}),B&&B.length===0&&!Re&&i.jsx("div",{className:"sgdb-no-results",children:"No results found"}),!B&&!Re&&i.jsx("div",{className:"sgdb-hint",children:"Fetch cover art, banners, logos, and icons from SteamGridDB"})]}),i.jsxs("div",{className:"preview-aspects-row",children:[i.jsx("div",{className:"aspect-ratio-preview vert-aspect",title:"Cover",children:p?i.jsx("img",{src:p,alt:"Cover Preview"}):i.jsx("span",{children:"Cover"})}),i.jsx("div",{className:"aspect-ratio-preview horiz-aspect",title:"Banner",children:S?i.jsx("img",{src:S,alt:"Banner Preview"}):i.jsx("span",{children:"Banner"})}),i.jsx("div",{className:"aspect-ratio-preview vert-aspect",title:"Logo",children:N?i.jsx("img",{src:N,alt:"Logo Preview",style:{objectFit:"contain"}}):i.jsx("span",{children:"Logo"})})]})]})]}),i.jsxs("div",{className:"editor-footer-row",children:[i.jsx("button",{type:"button",className:"glow-btn",onClick:M,onMouseEnter:j.playHoverTick,children:"Cancel"}),i.jsxs("button",{type:"submit",className:"glow-btn glow-btn-primary",onMouseEnter:j.playHoverTick,children:[i.jsx($f,{size:14}),i.jsx("span",{children:"Apply Changes"})]})]})]})]}),i.jsx("style",{dangerouslySetInnerHTML:{__html:`
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

        .sgdb-auto-btn {
          padding: 6px 10px;
          flex-shrink: 0;
          font-size: 10px;
          gap: 5px;
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
      `}})]})}function a0({settings:e,onUpdateSettings:t,onClose:n,onResetDatabase:r,gamesCount:l}){const[a,o]=z.useState(""),[s,c]=z.useState("loading"),[d,m]=z.useState(!1);z.useEffect(()=>{window.electronAPI&&window.electronAPI.getApiKey().then(u=>{o(u.key),c(u.isCustom?"custom":"builtin")}).catch(()=>c("builtin"))},[]);const g=()=>{j.playClickPulse(),n()},h=u=>{j.playClickPulse(),t({...e,theme:u})},y=()=>{const u=!e.isMuted;j.playClickPulse(),j.setMuted(u),t({...e,isMuted:u})},x=(u,p)=>{t({...e,[u]:p})},w=()=>{j.playClickPulse(),confirm("Are you sure you want to reset the Nexus database? This will clear scanned paths, restore default catalog games, and reset playtimes.")&&(r(),alert("Database reset completed successfully!"),n())},L=async()=>{j.playClickPulse(),window.electronAPI&&(await window.electronAPI.saveApiKey(a),m(!0),c("custom"),setTimeout(()=>m(!1),2e3))},f=async()=>{if(j.playClickPulse(),window.electronAPI){await window.electronAPI.saveApiKey("");const u=await window.electronAPI.getApiKey();o(u.key),c(u.isCustom?"custom":"builtin")}};return i.jsxs("div",{className:"settings-overlay flex-center",children:[i.jsxs("div",{className:"settings-modal glass-panel-heavy",children:[i.jsxs("div",{className:"settings-header",children:[i.jsxs("div",{className:"settings-title-group",children:[i.jsx(Lf,{size:16,className:"title-icon"}),i.jsx("h2",{className:"settings-title",children:"Nexus Customization Suite"})]}),i.jsx("button",{className:"settings-close-btn",onClick:g,onMouseEnter:j.playHoverTick,children:i.jsx(Gl,{size:16})})]}),i.jsxs("div",{className:"settings-body-scrollable",children:[i.jsxs("div",{className:"settings-section",children:[i.jsx("h3",{className:"section-label-heading",children:"PS5 Console Telemetry Themes"}),i.jsx("p",{className:"section-description",children:"Select your launcher theme profiles. Changes primary glowing vectors, canvas dust tones, and telemetry backdrops."}),i.jsxs("div",{className:"themes-grid-row",children:[i.jsxs("button",{className:`theme-pill-btn theme-aether-pill ${e.theme==="theme-aether"?"active":""}`,onClick:()=>h("theme-aether"),onMouseEnter:j.playHoverTick,children:[i.jsx("span",{className:"color-dot blue-dot"}),i.jsxs("div",{className:"theme-pill-details",children:[i.jsx("span",{className:"theme-pill-name",children:"Aether Core"}),i.jsx("span",{className:"theme-pill-desc",children:"Cyan and deep space teal"})]})]}),i.jsxs("button",{className:`theme-pill-btn theme-cyber-pill ${e.theme==="theme-cyber"?"active":""}`,onClick:()=>h("theme-cyber"),onMouseEnter:j.playHoverTick,children:[i.jsx("span",{className:"color-dot pink-dot"}),i.jsxs("div",{className:"theme-pill-details",children:[i.jsx("span",{className:"theme-pill-name",children:"Cyber Glitch"}),i.jsx("span",{className:"theme-pill-desc",children:"Hot pink and high-contrast violet"})]})]}),i.jsxs("button",{className:`theme-pill-btn theme-emerald-pill ${e.theme==="theme-emerald"?"active":""}`,onClick:()=>h("theme-emerald"),onMouseEnter:j.playHoverTick,children:[i.jsx("span",{className:"color-dot green-dot"}),i.jsxs("div",{className:"theme-pill-details",children:[i.jsx("span",{className:"theme-pill-name",children:"Emerald Matrix"}),i.jsx("span",{className:"theme-pill-desc",children:"Electric green and dark matrix web"})]})]}),i.jsxs("button",{className:`theme-pill-btn theme-gold-pill ${e.theme==="theme-gold"?"active":""}`,onClick:()=>h("theme-gold"),onMouseEnter:j.playHoverTick,children:[i.jsx("span",{className:"color-dot gold-dot"}),i.jsxs("div",{className:"theme-pill-details",children:[i.jsx("span",{className:"theme-pill-name",children:"Imperial Gold"}),i.jsx("span",{className:"theme-pill-desc",children:"Obsidian black and Warm liquid gold"})]})]})]})]}),i.jsxs("div",{className:"settings-section",children:[i.jsx("h3",{className:"section-label-heading",children:"Acoustic System Settings"}),i.jsx("p",{className:"section-description",children:"Toggle synthesized haptics, click ticks, game-specific ambient drones, and orchestral intro swells."}),i.jsxs("div",{className:"audio-toggle-card",onClick:y,children:[i.jsxs("div",{className:"audio-card-left",children:[e.isMuted?i.jsx(Yf,{size:20,className:"mute-status-icon muted"}):i.jsx(Qf,{size:20,className:"mute-status-icon active-volume"}),i.jsxs("div",{className:"audio-card-info",children:[i.jsx("span",{className:"audio-card-title",children:"Console Synthesized Sounds"}),i.jsx("span",{className:"audio-card-desc",children:e.isMuted?"All UI ticks, clicks, and game drone swells are currently muted.":"UI interactive acoustic sweeps and ambient chord backdrops are active."})]})]}),i.jsx("div",{className:"audio-card-right",children:i.jsx("div",{className:`checkbox-toggle-switch ${e.isMuted?"sw-muted":"sw-active"}`,children:i.jsx("div",{className:"switch-knob"})})})]})]}),i.jsxs("div",{className:"settings-section",children:[i.jsxs("h3",{className:"section-label-heading flex-center-start",children:[i.jsx(Af,{size:14,className:"heading-icon"}),i.jsx("span",{children:"SteamGridDB API Configuration"})]}),i.jsx("p",{className:"section-description",children:s==="builtin"?"Using built-in SteamGridDB API key. You can override it with your own key for higher rate limits.":"Using your custom SteamGridDB API key."}),i.jsxs("div",{className:"api-key-card",children:[i.jsxs("div",{className:"api-key-input-row",children:[i.jsx("div",{className:"api-key-status-icon",children:s==="custom"?i.jsx(Rf,{size:14}):i.jsx(Df,{size:14})}),i.jsx("input",{type:"text",className:"glass-input api-key-input",value:a,onChange:u=>o(u.target.value),placeholder:"Enter your SteamGridDB API key..."})]}),i.jsxs("div",{className:"api-key-actions",children:[i.jsx("span",{className:"api-key-status-text",children:d?"Saved!":s==="custom"?"Custom key active":"Built-in key active"}),i.jsxs("div",{className:"api-key-buttons",children:[i.jsx("button",{className:"glow-btn api-key-btn",onClick:f,onMouseEnter:j.playHoverTick,children:"Reset to Default"}),i.jsx("button",{className:"glow-btn glow-btn-primary api-key-btn",onClick:L,onMouseEnter:j.playHoverTick,children:"Save Key"})]})]})]})]}),i.jsxs("div",{className:"settings-section",children:[i.jsxs("h3",{className:"section-label-heading flex-center-start",children:[i.jsx(Bf,{size:14,className:"heading-icon"}),i.jsx("span",{children:"Glassmorphism & Stardust Tuning"})]}),i.jsxs("div",{className:"sliders-form-grid",children:[i.jsxs("div",{className:"slider-input-group",children:[i.jsxs("div",{className:"slider-labels",children:[i.jsx("span",{children:"Glassmorphism Backdrop Blur"}),i.jsxs("span",{children:[e.glassBlur,"px"]})]}),i.jsx("input",{type:"range",min:"5",max:"40",className:"settings-slider-bar",value:e.glassBlur,onChange:u=>x("glassBlur",parseInt(u.target.value))})]}),i.jsxs("div",{className:"slider-input-group",children:[i.jsxs("div",{className:"slider-labels",children:[i.jsx("span",{children:"Glass Panel Transparency"}),i.jsxs("span",{children:[Math.round(e.glassOpacity*100),"%"]})]}),i.jsx("input",{type:"range",min:"10",max:"90",className:"settings-slider-bar",value:e.glassOpacity*100,onChange:u=>x("glassOpacity",parseFloat(u.target.value)/100)})]}),i.jsxs("div",{className:"slider-input-group",children:[i.jsxs("div",{className:"slider-labels",children:[i.jsx("span",{children:"Stardust Ambient Particle Density"}),i.jsxs("span",{children:[e.particleDensity,"x"]})]}),i.jsx("input",{type:"range",min:"0.5",max:"2.0",step:"0.1",className:"settings-slider-bar",value:e.particleDensity,onChange:u=>x("particleDensity",parseFloat(u.target.value))})]}),i.jsxs("div",{className:"slider-input-group",children:[i.jsxs("div",{className:"slider-labels",children:[i.jsx("span",{children:"Stardust Velocity Float Speed"}),i.jsxs("span",{children:[e.particleSpeed,"x"]})]}),i.jsx("input",{type:"range",min:"0.5",max:"3.0",step:"0.1",className:"settings-slider-bar",value:e.particleSpeed,onChange:u=>x("particleSpeed",parseFloat(u.target.value))})]})]})]}),i.jsxs("div",{className:"settings-section reset-system-sec",children:[i.jsx("h3",{className:"section-label-heading red-heading",children:"Maintenance & Cache"}),i.jsxs("div",{className:"maintenance-card",children:[i.jsxs("div",{className:"m-left",children:[i.jsx("span",{className:"m-title",children:"Re-index database catalog"}),i.jsxs("span",{className:"m-desc",children:["Currently managing ",i.jsxs("strong",{children:[l," library indices"]}),". Resetting clears custom cover edits and logs."]})]}),i.jsxs("button",{className:"glow-btn reset-db-btn",onClick:w,onMouseEnter:j.playHoverTick,children:[i.jsx(Vf,{size:12}),i.jsx("span",{children:"Reset Database"})]})]})]})]}),i.jsx("div",{className:"settings-footer flex-center-end",children:i.jsx("button",{className:"glow-btn glow-btn-primary",onClick:g,onMouseEnter:j.playHoverTick,children:"Save & Exit Config"})})]}),i.jsx("style",{dangerouslySetInnerHTML:{__html:`
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
      `}})]})}const i0={PC:Ou,PS5:Ve,PS4:Ve,"Xbox Series X|S":Ve,"Xbox One":Ve,Switch:Ve,Mobile:Bu};function o0({platform:e}){const t=i0[e]||Ve,n=e==="PS5"||e==="PS4"?"PS":e.startsWith("Xbox")?"XB":e==="Switch"?"NS":e==="Mobile"?"Mob":e==="PC"?"PC":e.slice(0,2);return i.jsxs("div",{className:"platform-icon-badge",title:e,children:[i.jsx(t,{size:10}),i.jsx("span",{children:n})]})}function s0({catalog:e,ownedGames:t,onSelectItem:n,searchQuery:r}){const l=e.filter(s=>s.title.toLowerCase().includes(r.toLowerCase())||s.developer.toLowerCase().includes(r.toLowerCase())||s.genre.toLowerCase().includes(r.toLowerCase())),a=new Set(t.map(s=>s.id)),o=s=>{j.playClickPulse(),n(s)};return i.jsxs("div",{className:"store-viewport",children:[i.jsxs("div",{className:"store-header",children:[i.jsxs("div",{className:"store-header-left",children:[i.jsx($u,{size:20,className:"store-header-icon"}),i.jsx("h1",{className:"store-title",children:"Nexus Store"})]}),i.jsxs("span",{className:"store-count",children:[l.length," titles available"]})]}),l.length===0&&i.jsx("div",{className:"store-empty",children:i.jsx("span",{children:"No titles match your search."})}),i.jsx("div",{className:"store-grid",children:l.map(s=>{const c=a.has(s.id);return i.jsxs("div",{className:`store-card ${c?"owned":""}`,onClick:()=>o(s),children:[i.jsxs("div",{className:"store-card-image-wrapper",children:[i.jsx("img",{src:s.coverUrl,alt:s.title,className:"store-card-image",loading:"lazy"}),c&&i.jsxs("div",{className:"store-owned-badge",children:[i.jsx(Uu,{size:12}),i.jsx("span",{children:"Owned"})]}),i.jsx("div",{className:"store-card-hover",children:i.jsx("span",{className:"store-card-view-btn",children:"View Game"})})]}),i.jsxs("div",{className:"store-card-info",children:[i.jsx("div",{className:"store-card-title",children:s.title}),i.jsx("div",{className:"store-card-developer",children:s.developer}),i.jsx("div",{className:"store-card-platforms",children:s.platforms.map(d=>i.jsx(o0,{platform:d},d))}),i.jsxs("div",{className:"store-card-rating",children:[i.jsx(Nr,{size:10,fill:"currentColor"}),i.jsx("span",{children:s.rating})]})]})]},s.id)})}),i.jsx("style",{dangerouslySetInnerHTML:{__html:`
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
      `}})]})}const c0={PC:Ou,PS5:Ve,PS4:Ve,"Xbox Series X|S":Ve,"Xbox One":Ve,Switch:Ve,Mobile:Bu};function u0({item:e,ownedGames:t,onBack:n,onMarkOwned:r,onLinkExe:l,onLaunch:a}){var f;const[o,s]=z.useState(""),[c,d]=z.useState(!1);if(!e)return null;const m=t.find(u=>u.id===e.id),g=!!m,h=g&&m.exePath,y=()=>{j.playClickPulse(),r(e)},x=()=>{if(j.playClickPulse(),window.electronAPI)window.electronAPI.selectExecutable().then(u=>{u&&(s(u),l(e.id,u),d(!1))});else{const u=prompt("Enter the full path to the .exe file:","C:\\Games\\"+e.title+"\\game.exe");u&&(s(u),l(e.id,u),d(!1))}},w=()=>{j.playClickPulse(),o&&(l(e.id,o),d(!1))},L=()=>{j.playClickPulse(),m&&a(m)};return i.jsxs("div",{className:"store-item-viewport",children:[i.jsxs("button",{className:"store-item-back-btn",onClick:n,children:[i.jsx(Ru,{size:16}),i.jsx("span",{children:"Back to Store"})]}),i.jsxs("div",{className:"store-item-banner",children:[i.jsx("img",{src:e.bannerUrl,alt:e.title,className:"store-item-banner-img"}),i.jsx("div",{className:"store-item-banner-overlay"}),i.jsxs("div",{className:"store-item-banner-content",children:[i.jsx("div",{className:"store-item-banner-tags",children:(f=e.tags)==null?void 0:f.map((u,p)=>i.jsx("span",{className:"store-item-tag",children:u},p))}),i.jsx("h1",{className:"store-item-title",children:e.title}),i.jsxs("div",{className:"store-item-meta",children:[i.jsx("span",{children:e.developer}),i.jsx("span",{className:"store-item-dot"}),i.jsx("span",{children:e.publisher}),i.jsx("span",{className:"store-item-dot"}),i.jsx("span",{children:e.releaseDate})]}),i.jsxs("div",{className:"store-item-rating",children:[i.jsx(Nr,{size:14,fill:"currentColor"}),i.jsx("span",{children:e.rating})]})]})]}),i.jsxs("div",{className:"store-item-body",children:[i.jsxs("div",{className:"store-item-left",children:[i.jsx("h3",{className:"store-item-section-title",children:"About This Game"}),i.jsx("p",{className:"store-item-description",children:e.description}),i.jsx("h3",{className:"store-item-section-title",children:"Platforms"}),i.jsx("div",{className:"store-item-platforms",children:e.platforms.map(u=>{const p=c0[u]||Ve;return i.jsxs("div",{className:"store-item-platform-badge",children:[i.jsx(p,{size:16}),i.jsx("span",{children:u})]},u)})})]}),i.jsx("div",{className:"store-item-right",children:i.jsx("div",{className:"store-item-ownership-card",children:g?i.jsxs(i.Fragment,{children:[i.jsxs("div",{className:"owned-check",children:[i.jsx(Uu,{size:20}),i.jsx("span",{children:"In Your Library"})]}),h?i.jsxs("div",{className:"exe-linked-info",children:[i.jsx(ks,{size:14}),i.jsx("span",{className:"exe-path-label",children:m.exePath})]}):i.jsx("div",{className:"exe-not-linked",children:i.jsx("span",{children:"No executable linked yet"})}),c?i.jsxs("div",{className:"exe-input-row",children:[i.jsx("input",{type:"text",className:"glass-input exe-input",placeholder:"C:\\\\Path\\\\To\\\\Game.exe",value:o,onChange:u=>s(u.target.value)}),i.jsxs("div",{className:"exe-input-actions",children:[i.jsxs("button",{className:"glow-btn",onClick:x,children:[i.jsx(vs,{size:14}),i.jsx("span",{children:"Browse"})]}),i.jsxs("button",{className:"glow-btn glow-btn-primary",onClick:w,disabled:!o,children:[i.jsx(ks,{size:14}),i.jsx("span",{children:"Link"})]})]})]}):i.jsxs("div",{className:"store-item-actions",children:[h&&i.jsxs("button",{className:"glow-btn glow-btn-primary",onClick:L,children:[i.jsx(ql,{size:14}),i.jsx("span",{children:"Play Now"})]}),i.jsxs("button",{className:"glow-btn",onClick:()=>d(!0),children:[i.jsx(vs,{size:14}),i.jsx("span",{children:h?"Change EXE":"Link EXE"})]})]})]}):i.jsxs(i.Fragment,{children:[i.jsx("div",{className:"not-owned-label",children:i.jsx("span",{children:"You don't own this game yet"})}),i.jsxs("button",{className:"glow-btn glow-btn-primary mark-owned-btn",onClick:y,children:[i.jsx(Of,{size:16}),i.jsx("span",{children:"Mark as Owned"})]}),i.jsx("div",{className:"owned-hint",children:"Mark a game as owned to add it to your library, then link your .exe file to play."})]})})})]}),i.jsx("style",{dangerouslySetInnerHTML:{__html:`
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
      `}})]})}function d0({games:e,selectedGame:t,onSelectGame:n,onLaunchGame:r,onToggleFavorite:l,onReturnToLibrary:a,runningGameId:o}){const s=e.find(h=>h.id===(t==null?void 0:t.id))||e[0],c=(h=0)=>{const y=Math.floor(h/3600),x=Math.floor(h%3600/60);return y===0?`${x}m`:x===0?`${y}h`:`${y}h ${x}m`},d=h=>{j.playClickPulse(),n(h)},m=(h,y)=>{h.stopPropagation(),j.playLaunchSwell(),r(y)},g=(h,y)=>{h.stopPropagation(),j.playClickPulse(),l(y.id)};return e.length===0?i.jsxs("div",{className:"favourites-room empty-room",children:[i.jsx("div",{className:"vault-ambient-glow"}),i.jsxs("div",{className:"empty-vault-display",children:[i.jsx("div",{className:"empty-trophy-ring",children:i.jsx(zl,{size:42})}),i.jsx("span",{className:"room-kicker",children:"Private Collection"}),i.jsx("h1",{children:"No Favourites Yet"}),i.jsx("p",{children:"Mark games with the star in Library and they will appear in this trophy room."}),i.jsxs("button",{className:"glow-btn glow-btn-primary empty-return-btn",onClick:a,onMouseEnter:j.playHoverTick,children:[i.jsx(Ru,{size:16}),i.jsx("span",{children:"Back to Library"})]})]}),i.jsx("style",{dangerouslySetInnerHTML:{__html:bs}})]}):i.jsxs("div",{className:"favourites-room",children:[i.jsx("div",{className:"vault-ambient-glow"}),i.jsx("div",{className:"room-ceiling-light"}),i.jsx("div",{className:"polished-floor-reflection"}),i.jsxs("div",{className:"trophy-room-header",children:[i.jsxs("div",{children:[i.jsx("span",{className:"room-kicker",children:"Curated Vault"}),i.jsx("h1",{children:"Favourites Trophy Room"})]}),i.jsxs("div",{className:"room-count-plaque",children:[i.jsx(zl,{size:16}),i.jsxs("span",{children:[e.length," prized ",e.length===1?"game":"games"]})]})]}),s&&i.jsxs("section",{className:"spotlight-pedestal",onClick:()=>d(s),children:[i.jsx("div",{className:"pedestal-light-cone"}),i.jsx("div",{className:"cylindrical-base"}),i.jsx("div",{className:"spotlight-cover-shell",children:i.jsx("img",{src:s.coverUrl,alt:s.title,className:"spotlight-cover"})}),i.jsxs("div",{className:"spotlight-plaque",children:[i.jsx("span",{className:"plaque-label",children:"Featured Favourite"}),i.jsx("h2",{children:s.title}),i.jsxs("div",{className:"plaque-meta",children:[i.jsx("span",{children:s.developer}),i.jsx("span",{children:s.genre}),i.jsxs("span",{children:[s.rating," rating"]})]})]})]}),i.jsx("div",{className:"display-case-grid",children:e.map((h,y)=>{const x=(t==null?void 0:t.id)===h.id,w=o===h.id;return i.jsxs("article",{className:`favourite-display-case ${x?"selected":""} ${w?"running":""}`,onClick:()=>d(h),onMouseEnter:j.playHoverTick,style:{"--case-delay":`${y*70}ms`},children:[i.jsx("div",{className:"case-spotlight"}),i.jsxs("div",{className:"case-glass-dome",children:[i.jsx("div",{className:"case-metal-rim top-rim"}),i.jsxs("div",{className:"case-art-frame",children:[i.jsx("img",{src:h.coverUrl,alt:h.title,className:"case-cover-art",loading:"lazy"}),w&&i.jsxs("div",{className:"case-running-badge",children:[i.jsx("span",{className:"running-dot"}),i.jsx("span",{children:"Running"})]})]}),i.jsx("div",{className:"case-glass-shine"}),i.jsx("div",{className:"case-metal-rim bottom-rim"})]}),i.jsxs("div",{className:"engraved-plaque",children:[i.jsxs("div",{className:"plaque-title-row",children:[i.jsxs("div",{children:[i.jsx("h3",{children:h.title}),i.jsx("span",{children:h.developer})]}),i.jsx("button",{className:"plaque-star-btn active",onClick:L=>g(L,h),title:"Remove from Favourites",children:i.jsx(Nr,{size:15,fill:"currentColor"})})]}),i.jsxs("div",{className:"artifact-stats",children:[i.jsxs("div",{className:"artifact-stat",title:"Playtime",children:[i.jsx(Fu,{size:12}),i.jsx("span",{children:c(h.playtime)})]}),i.jsxs("div",{className:"artifact-stat",title:"Progress",children:[i.jsx(oo,{size:12}),i.jsxs("span",{children:[h.progress||0,"%"]})]}),i.jsxs("div",{className:"artifact-stat",title:"Last Played",children:[i.jsx(so,{size:12}),i.jsx("span",{children:h.lastPlayed})]})]}),i.jsxs("button",{className:`vault-launch-btn ${w?"running":""}`,onClick:L=>m(L,h),children:[i.jsx(ql,{size:15,fill:w?"transparent":"currentColor"}),i.jsx("span",{children:w?"Running":"Launch"})]})]})]},h.id)})}),i.jsx("style",{dangerouslySetInnerHTML:{__html:bs}})]})}const bs=`
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
`,lt=[{id:"cyberpunk",title:"Cyberpunk 2077",developer:"CD Projekt Red",publisher:"CD Projekt",genre:"Action RPG",rating:4.8,releaseDate:"2020-12-10",description:"An open-world, action-adventure RPG set in the megalopolis of Night City, where you play as a cyberpunk mercenary wrapped up in a do-or-die fight for survival. Upgraded with next-gen graphics and fully immersive ray-tracing options.",playtime:151200,lastPlayed:"Yesterday",progress:73,timeToComplete:"12 hrs",nextAchievement:"The Star (80% complete)",coverUrl:"https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&q=80",soundType:"synth",exePath:"C:\\Windows\\notepad.exe",isFavorite:!0,owned:!0,platforms:["PC","PS5","Xbox Series X|S"],tags:["Open World","Sci-Fi","Ray Tracing"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"eldenring",title:"Elden Ring",developer:"FromSoftware",publisher:"Bandai Namco",genre:"Action RPG",rating:4.9,releaseDate:"2022-02-25",description:"Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between. Experience an expansive fantasy landscape of breathtaking scale.",playtime:414e3,lastPlayed:"2 days ago",progress:92,timeToComplete:"8 hrs",nextAchievement:"Elden Lord (90% complete)",coverUrl:"https://images.unsplash.com/photo-1655821888788-6107699e173b?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1600&q=80",soundType:"orchestra",exePath:"C:\\Windows\\notepad.exe",isFavorite:!0,owned:!0,platforms:["PC","PS5","Xbox Series X|S"],tags:["Souls-like","Dark Fantasy","Hardcore"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"hades",title:"Hades",developer:"Supergiant Games",publisher:"Supergiant Games",genre:"Rogue-like",rating:4.8,releaseDate:"2020-09-17",description:"Defy the god of the dead as you hack and slash out of the Underworld in this rogue-like dungeon crawler from the creators of Bastion, Transistor, and Pyre.",playtime:126e3,lastPlayed:"5 days ago",progress:64,timeToComplete:"5 hrs",nextAchievement:"Family Reunion (50% complete)",coverUrl:"https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&q=80",soundType:"guitar",exePath:"C:\\Windows\\notepad.exe",isFavorite:!1,owned:!0,platforms:["PC","PS5","Xbox Series X|S","Switch"],tags:["Hack & Slash","Indie","Rogue-like"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"portal2",title:"Portal 2",developer:"Valve",publisher:"Valve",genre:"Puzzle Platformer",rating:4.9,releaseDate:"2011-04-18",description:"The cooperative mode of Portal 2 features a unique two-player campaign with its own story, test chambers, and two new player characters. This new mode forces players to reconsider everything they thought they knew.",playtime:9e4,lastPlayed:"3 weeks ago",progress:100,timeToComplete:"0 hrs",nextAchievement:"Completed (100% complete)",coverUrl:"https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1600&q=80",soundType:"ambient",exePath:"C:\\Windows\\notepad.exe",isFavorite:!1,owned:!0,platforms:["PC","PS5","Xbox Series X|S","Switch"],tags:["Puzzle","Co-op","Comedy"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"witcher3",title:"The Witcher 3: Wild Hunt",developer:"CD Projekt Red",publisher:"CD Projekt",genre:"Action RPG",rating:4.9,releaseDate:"2015-05-19",description:"You are Geralt of Rivia, mercenary monster slayer. Before you stands a war-torn, monster-infested continent you can explore at will. Your current contract? Tracking down Ciri — the Child of Prophecy.",playtime:216e3,lastPlayed:"1 month ago",progress:45,timeToComplete:"40 hrs",nextAchievement:"Gwent Master (30% complete)",coverUrl:"https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&q=80",soundType:"folkish",exePath:"C:\\Windows\\notepad.exe",isFavorite:!1,owned:!0,platforms:["PC","PS5","Xbox Series X|S"],tags:["Rich Story","Fantasy","Open World"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1}],p0={cyberpunk2077:{title:"Cyberpunk 2077",developer:"CD Projekt Red",genre:"Action RPG",coverUrl:"https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&q=80",soundType:"synth",tags:["Open World","Sci-Fi","Ray Tracing"],steamAppId:null},eldenring:{title:"Elden Ring",developer:"FromSoftware",genre:"Action RPG",coverUrl:"https://images.unsplash.com/photo-1655821888788-6107699e173b?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1600&q=80",soundType:"orchestra",tags:["Souls-like","Dark Fantasy","Hardcore"],steamAppId:null},hades:{title:"Hades",developer:"Supergiant Games",genre:"Rogue-like",coverUrl:"https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&q=80",soundType:"guitar",tags:["Hack & Slash","Indie","Rogue-like"],steamAppId:null},portal2:{title:"Portal 2",developer:"Valve",genre:"Puzzle Platformer",coverUrl:"https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1600&q=80",soundType:"ambient",tags:["Puzzle","Co-op","Comedy"],steamAppId:null},witcher3:{title:"The Witcher 3: Wild Hunt",developer:"CD Projekt Red",genre:"Action RPG",coverUrl:"https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&q=80",soundType:"folkish",tags:["Rich Story","Fantasy","Open World"],steamAppId:null},minecraft:{title:"Minecraft",developer:"Mojang",genre:"Sandbox",coverUrl:"https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1607988795691-3d0147b43231?w=1600&q=80",soundType:"ambient",tags:["Survival","Building","Sandbox"],steamAppId:null}};function Ss(e,t){const n=e.toLowerCase().replace(/[^a-z0-9]/g,"");for(const[r,l]of Object.entries(p0))if(n.includes(r)||r.includes(n))return{...l,exePath:t,playtime:0,lastPlayed:"Never",progress:0,timeToComplete:"--",nextAchievement:"Locked (0% complete)",rating:4.5,releaseDate:new Date().toISOString().split("T")[0],description:`Your scanned copy of ${l.title}. Imported automatically by Nexus PS5 Launcher. Run the game to begin tracking playtime.`,isFavorite:!1,logoUrl:null,iconUrl:null,artworkFetched:!1};return{title:e.charAt(0).toUpperCase()+e.slice(1).replace(/[-_]/g," "),developer:"Unknown Developer",genre:"Indie Game",rating:4,releaseDate:new Date().toISOString().split("T")[0],description:`A local executable found at ${t}. Fully compatible with Nexus runtime launcher and session playtime counters. Customise this game card using the Metadata Suite.`,playtime:0,lastPlayed:"Never",progress:0,timeToComplete:"--",nextAchievement:"None",coverUrl:"https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1600&q=80",soundType:"synth",exePath:t,isFavorite:!1,owned:!0,platforms:["PC"],tags:["Local Import"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1}}const f0=[{id:"cyberpunk",title:"Cyberpunk 2077",developer:"CD Projekt Red",publisher:"CD Projekt",genre:"Action RPG",rating:4.8,releaseDate:"2020-12-10",description:"An open-world, action-adventure RPG set in the megalopolis of Night City, where you play as a cyberpunk mercenary wrapped up in a do-or-die fight for survival. Upgraded with next-gen graphics and fully immersive ray-tracing options.",coverUrl:"https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&q=80",soundType:"synth",tags:["Open World","Sci-Fi","Ray Tracing"],owned:!1,platforms:["PC","PS5","Xbox Series X|S"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"eldenring",title:"Elden Ring",developer:"FromSoftware",publisher:"Bandai Namco",genre:"Action RPG",rating:4.9,releaseDate:"2022-02-25",description:"Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between. Experience an expansive fantasy landscape of breathtaking scale.",coverUrl:"https://images.unsplash.com/photo-1655821888788-6107699e173b?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1600&q=80",soundType:"orchestra",tags:["Souls-like","Dark Fantasy","Hardcore"],owned:!1,platforms:["PC","PS5","Xbox Series X|S"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"hades",title:"Hades",developer:"Supergiant Games",publisher:"Supergiant Games",genre:"Rogue-like",rating:4.8,releaseDate:"2020-09-17",description:"Defy the god of the dead as you hack and slash out of the Underworld in this rogue-like dungeon crawler from the creators of Bastion, Transistor, and Pyre.",coverUrl:"https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&q=80",soundType:"guitar",tags:["Hack & Slash","Indie","Rogue-like"],owned:!1,platforms:["PC","PS5","Xbox Series X|S","Switch"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"portal2",title:"Portal 2",developer:"Valve",publisher:"Valve",genre:"Puzzle Platformer",rating:4.9,releaseDate:"2011-04-18",description:"The cooperative mode of Portal 2 features a unique two-player campaign with its own story, test chambers, and two new player characters. This new mode forces players to reconsider everything they thought they knew.",coverUrl:"https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1600&q=80",soundType:"ambient",tags:["Puzzle","Co-op","Comedy"],owned:!1,platforms:["PC","PS5","Xbox Series X|S","Switch"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"witcher3",title:"The Witcher 3: Wild Hunt",developer:"CD Projekt Red",publisher:"CD Projekt",genre:"Action RPG",rating:4.9,releaseDate:"2015-05-19",description:"You are Geralt of Rivia, mercenary monster slayer. Before you stands a war-torn, monster-infested continent you can explore at will. Your current contract? Tracking down Ciri — the Child of Prophecy.",coverUrl:"https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&q=80",soundType:"folkish",tags:["Rich Story","Fantasy","Open World"],owned:!1,platforms:["PC","PS5","Xbox Series X|S"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"godofwar",title:"God of War Ragnarök",developer:"Santa Monica Studio",publisher:"Sony Interactive Entertainment",genre:"Action Adventure",rating:4.9,releaseDate:"2022-11-09",description:"Embark on an epic and heartfelt journey as Kratos and Atreus struggle with holding on and letting go. The breathtakingly cinematic action-adventure saga continues as the end of days approaches.",coverUrl:"https://images.unsplash.com/photo-1608889825205-e3f5e4a2020e?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80",soundType:"orchestra",tags:["Story Rich","Mythology","Action"],owned:!1,platforms:["PS4","PS5","PC"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"spiderman",title:"Marvel's Spider-Man 2",developer:"Insomniac Games",publisher:"Sony Interactive Entertainment",genre:"Action Adventure",rating:4.8,releaseDate:"2023-10-20",description:"Swing, fight, and soar across Marvel's New York as both Peter Parker and Miles Morales. Battle iconic villains and protect the city in this thrilling sequel.",coverUrl:"https://images.unsplash.com/photo-1635805737707-575885ab0820?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1600&q=80",soundType:"synth",tags:["Superhero","Open World","Action"],owned:!1,platforms:["PS5"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"minecraft",title:"Minecraft",developer:"Mojang",publisher:"Mojang",genre:"Sandbox",rating:4.7,releaseDate:"2011-11-18",description:"Explore infinite worlds and build everything from the simplest of homes to the grandest of castles. Play in creative mode with unlimited resources or mine deep into the world in survival mode.",coverUrl:"https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1607988795691-3d0147b43231?w=1600&q=80",soundType:"ambient",tags:["Survival","Building","Sandbox"],owned:!1,platforms:["PC","PS5","Xbox Series X|S","Switch","Mobile"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"baldursgate3",title:"Baldur's Gate 3",developer:"Larian Studios",publisher:"Larian Studios",genre:"CRPG",rating:4.9,releaseDate:"2023-08-03",description:"Gather your party and return to the Forgotten Realms in a tale of fellowship and betrayal, sacrifice and survival, and the lure of absolute power. Master deep strategic combat and rich storytelling.",coverUrl:"https://images.unsplash.com/photo-1531326121958-9a5a53c8a2c6?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1600&q=80",soundType:"orchestra",tags:["RPG","Strategy","Story Rich"],owned:!1,platforms:["PC","PS5","Xbox Series X|S"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"zelda",title:"The Legend of Zelda: Tears of the Kingdom",developer:"Nintendo EPD",publisher:"Nintendo",genre:"Action Adventure",rating:5,releaseDate:"2023-05-12",description:"An epic adventure across the land and skies of Hyrule awaits in this long-awaited sequel to Breath of the Wild. Harness the power of new abilities and explore a vast, reimagined world.",coverUrl:"https://images.unsplash.com/photo-1616514197671-15d99ce7a6f8?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1470071459604-4b118ecb4c4b?w=1600&q=80",soundType:"orchestra",tags:["Adventure","Open World","Puzzle"],owned:!1,platforms:["Switch"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"halo",title:"Halo Infinite",developer:"343 Industries",publisher:"Xbox Game Studios",genre:"First-Person Shooter",rating:4.5,releaseDate:"2021-12-08",description:"When all hope is lost and humanity's fate hangs in the balance, the Master Chief steps forward to confront a terrifying new enemy. The most ambitious Halo campaign ever made.",coverUrl:"https://images.unsplash.com/photo-1552820728-8b83bb6b1b3c?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1600&q=80",soundType:"synth",tags:["Sci-Fi","Shooter","Multiplayer"],owned:!1,platforms:["PC","Xbox Series X|S","Xbox One"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"ff7rebirth",title:"Final Fantasy VII Rebirth",developer:"Square Enix",publisher:"Square Enix",genre:"JRPG",rating:4.8,releaseDate:"2024-02-29",description:"Step into a vibrant and vast world as Cloud and his friends seek to defy destiny itself. The second chapter of the FINAL FANTASY VII remake project blends classic RPG storytelling with action combat.",coverUrl:"https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1563089145-599997674d42?w=1600&q=80",soundType:"orchestra",tags:["RPG","Fantasy","Action"],owned:!1,platforms:["PS5"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"starfield",title:"Starfield",developer:"Bethesda Game Studios",publisher:"Bethesda Softworks",genre:"Action RPG",rating:4.3,releaseDate:"2023-09-06",description:"Explore the vast reaches of space in Bethesda's first new universe in over 25 years. Create your character and embark on an epic journey to uncover humanity's greatest mystery.",coverUrl:"https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=1600&q=80",soundType:"synth",tags:["Space","Open World","Sci-Fi"],owned:!1,platforms:["PC","Xbox Series X|S"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"horizon",title:"Horizon Forbidden West",developer:"Guerrilla Games",publisher:"Sony Interactive Entertainment",genre:"Action RPG",rating:4.7,releaseDate:"2022-02-18",description:"Aloy ventures west to investigate a deadly blight that threatens all life on Earth. Explore stunning landscapes, battle colossal machines, and uncover a hidden threat.",coverUrl:"https://images.unsplash.com/photo-1518709766631-a6a7f45921c1?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1505144808419-1957a94ca61e?w=1600&q=80",soundType:"orchestra",tags:["Open World","Sci-Fi","Action"],owned:!1,platforms:["PS4","PS5","PC"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"diablo4",title:"Diablo IV",developer:"Blizzard Entertainment",publisher:"Blizzard Entertainment",genre:"Action RPG",rating:4.4,releaseDate:"2023-06-06",description:"Explore the shattered world of Sanctuary in the most ambitious Diablo entry yet. Battle the legions of Hell through a dark and gripping campaign, then dive into deep endgame content.",coverUrl:"https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?w=1600&q=80",soundType:"ambient",tags:["Dark Fantasy","Multiplayer","RPG"],owned:!1,platforms:["PC","PS5","Xbox Series X|S"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"starwars",title:"Star Wars Jedi: Survivor",developer:"Respawn Entertainment",publisher:"Electronic Arts",genre:"Action Adventure",rating:4.6,releaseDate:"2023-04-28",description:"Continue Cal Kestis's journey across the galaxy, now a more powerful Jedi. Master new combat abilities and explore a galaxy far, far away in this thrilling action-adventure.",coverUrl:"https://images.unsplash.com/photo-1543536448-d209d2d2e7d3?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1600&q=80",soundType:"orchestra",tags:["Sci-Fi","Action","Adventure"],owned:!1,platforms:["PC","PS5","Xbox Series X|S"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"liesofp",title:"Lies of P",developer:"Neowiz Games",publisher:"Neowiz",genre:"Souls-like",rating:4.6,releaseDate:"2023-09-19",description:"A dark fantasy retelling of Pinocchio. Navigate a ruined city in a desperate search for Geppetto. Master a sophisticated combat system and wield a unique weapon customization system.",coverUrl:"https://images.unsplash.com/photo-1550639525-c97d455acf70?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&q=80",soundType:"orchestra",tags:["Souls-like","Dark Fantasy","Action"],owned:!1,platforms:["PC","PS5","Xbox Series X|S"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"cyberpunk2077phantom",title:"Cyberpunk 2077: Phantom Liberty",developer:"CD Projekt Red",publisher:"CD Projekt",genre:"Action RPG",rating:4.9,releaseDate:"2023-09-26",description:"A spy-thriller expansion for Cyberpunk 2077. When a prototype orbital shuttle crash-lands in Dogtown, V is pulled into a dangerous game of espionage and survival featuring Idris Elba.",coverUrl:"https://images.unsplash.com/photo-1569144157591-c60f3f82f137?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&q=80",soundType:"synth",tags:["Open World","Spy Thriller","Expansion"],owned:!1,platforms:["PC","PS5","Xbox Series X|S"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1}];function h0(e,t){if(!e||!t)return e;const n={...e};return t.grid&&(n.coverUrl=t.grid),t.hero&&(n.bannerUrl=t.hero),t.logo&&(n.logoUrl=t.logo),t.icon&&(n.iconUrl=t.icon),t.steamGridDbId&&(n.steamGridDbId=t.steamGridDbId),t.steamGridDbName&&(n.steamGridDbName=t.steamGridDbName),n.artworkFetched=m0(n),n}function m0(e){return e?!!(e.coverUrl||e.bannerUrl||e.logoUrl||e.iconUrl):!1}function g0(){const[e,t]=z.useState([]),[n,r]=z.useState(null),[l,a]=z.useState(""),[o,s]=z.useState("library"),[c,d]=z.useState(null),[m,g]=z.useState(null),[h,y]=z.useState(0),x=z.useRef(null),[w,L]=z.useState(!1),[f,u]=z.useState(!1),[p,v]=z.useState(!1),[S,C]=z.useState(!1),[N,b]=z.useState(!1),[R,_]=z.useState(12),[Z,me]=z.useState(34),[oe,nt]=z.useState({theme:"theme-aether",isMuted:!1,glassBlur:20,glassOpacity:.4,particleDensity:1,particleSpeed:1});z.useEffect(()=>{async function M(){if(window.electronAPI)try{const A=await window.electronAPI.loadDatabase();A&&Array.isArray(A)&&A.length>0?(t(A),r(A[0])):(t(lt),r(lt[0]),await window.electronAPI.saveDatabase(lt))}catch(A){console.error("Database load error, falling back to mock:",A),t(lt),r(lt[0])}else{const A=localStorage.getItem("nexus_games_cache");if(A){const O=JSON.parse(A);t(O),r(O[0])}else t(lt),r(lt[0])}}M()},[]),z.useEffect(()=>{const M=document.body;M.className=`${oe.theme} ecosystem-games-bg`,document.documentElement.style.setProperty("--panel-bg",`rgba(10, 10, 16, ${oe.glassOpacity})`),document.documentElement.style.setProperty("--panel-bg-solid",`rgba(10, 10, 16, ${Math.min(.98,oe.glassOpacity*1.5)})`),document.documentElement.style.setProperty("--glass-border",`rgba(255, 255, 255, ${oe.glassOpacity*.18})`);const A=setInterval(()=>{_(O=>{const $=Math.floor(Math.random()*8)-4;return Math.max(5,Math.min(85,O+$))}),me(O=>{const $=Math.floor(Math.random()*4)-2;return Math.max(25,Math.min(95,O+$))})},4e3);return()=>clearInterval(A)},[oe]),z.useEffect(()=>(n?j.startAmbience(n.soundType):j.stopAmbience(),()=>j.stopAmbience()),[n,oe.isMuted]),z.useEffect(()=>{if(window.electronAPI){const M=window.electronAPI.onGameStatusChanged((A,O,$)=>{O==="running"?(g(A),y(0),L(!1),x.current&&clearInterval(x.current),x.current=setInterval(()=>{y(F=>F+1)},1e3)):O==="stopped"&&(x.current&&(clearInterval(x.current),x.current=null),t(F=>{const q=F.map(G=>{if(G.id===A){const le=$||0;return{...G,playtime:G.playtime+le,lastPlayed:"Just now"}}return G});window.electronAPI&&window.electronAPI.saveDatabase(q);const T=q.find(G=>G.id===A);return T&&r(T),q}),g(null),y(0),j.playLaunchSwell())});return()=>{M(),x.current&&clearInterval(x.current)}}},[e]);const De=async M=>{if(m){alert("A gameplay session is already active!");return}if(j.playLaunchSwell(),window.electronAPI){const A=await window.electronAPI.launchGame(M.id,M.exePath);A.success||alert(`Process launch aborted: ${A.error}`)}else g(M.id),y(0),L(!1),x.current&&clearInterval(x.current),x.current=setInterval(()=>{y(A=>A+1)},1e3),setTimeout(()=>{Ht(M.id,8)},8e3)},Ht=(M,A)=>{x.current&&(clearInterval(x.current),x.current=null),t(O=>{const $=O.map(q=>q.id===M?{...q,playtime:q.playtime+A,lastPlayed:"Just now"}:q);localStorage.setItem("nexus_games_cache",JSON.stringify($));const F=$.find(q=>q.id===M);return F&&r(F),$}),g(null),y(0),j.playLaunchSwell()},wt=async M=>{const A=e.map(O=>O.id===M.id?M:O);t(A),r(M),v(!1),window.electronAPI?await window.electronAPI.saveDatabase(A):localStorage.setItem("nexus_games_cache",JSON.stringify(A))},P=async M=>{const A=e.map($=>$.id===M?{...$,isFavorite:!$.isFavorite}:$);t(A);const O=A.find($=>$.id===M);O&&r(O),window.electronAPI?await window.electronAPI.saveDatabase(A):localStorage.setItem("nexus_games_cache",JSON.stringify(A))},I=async M=>{const A=[...e];M.forEach(O=>{if(!A.find(F=>F.exePath===O.path)){const F=Ss(O.name,O.path),q=O.name.toLowerCase().replace(/[^a-z0-9]/g,"")+Math.floor(Math.random()*100);A.push({...F,id:q})}}),t(A),r(A[A.length-1]),window.electronAPI?await window.electronAPI.saveDatabase(A):localStorage.setItem("nexus_games_cache",JSON.stringify(A))},U=()=>{j.playClickPulse();const M=prompt("Input complete Windows Executable file path (.exe):","C:\\Windows\\notepad.exe");if(!M)return;const A=M.split("\\").pop().replace(".exe",""),O=A.toLowerCase().replace(/[^a-z0-9]/g,"")+Math.floor(Math.random()*100),$=Ss(A,M),F=[...e,{...$,id:O}];t(F),r(F[F.length-1]),L(!1),window.electronAPI?window.electronAPI.saveDatabase(F):localStorage.setItem("nexus_games_cache",JSON.stringify(F))},B=async()=>{t(lt),r(lt[0]),window.electronAPI?await window.electronAPI.saveDatabase(lt):localStorage.removeItem("nexus_games_cache")},Q=M=>{j.playClickPulse(),s(M),M==="store"&&d(null)},Re=M=>{d(M),s("store-item")},Ue=()=>{s("store"),d(null)},ct=async M=>{if(e.find(F=>F.id===M.id)){const F=e.map(q=>q.id===M.id?{...q,owned:!0}:q);t(F),window.electronAPI?await window.electronAPI.saveDatabase(F):localStorage.setItem("nexus_games_cache",JSON.stringify(F));return}M.owned=!0;const O={...M,playtime:0,lastPlayed:"Never",progress:0,timeToComplete:"--",nextAchievement:"Locked (0% complete)",exePath:"",isFavorite:!1,owned:!0},$=[...e,O];t($),r(O),window.electronAPI?await window.electronAPI.saveDatabase($):localStorage.setItem("nexus_games_cache",JSON.stringify($))},Fe=async(M,A)=>{const O=e.map(F=>F.id===M?{...F,exePath:A}:F);t(O);const $=O.find(F=>F.id===M);$&&r($),window.electronAPI?await window.electronAPI.saveDatabase(O):localStorage.setItem("nexus_games_cache",JSON.stringify(O))},We=()=>e.filter(M=>M.title.toLowerCase().includes(l.toLowerCase())||M.developer.toLowerCase().includes(l.toLowerCase())||M.genre.toLowerCase().includes(l.toLowerCase())),Cr=async()=>{var $;if(j.playClickPulse(),!(($=window.electronAPI)!=null&&$.autoFetchArtwork)||N){window.electronAPI||alert("SteamGridDB artwork fetch is available in the desktop app.");return}b(!0);let M=[...e],A=0;const O=M.filter(F=>(F==null?void 0:F.title)&&!F.artworkFetched);for(const F of O){const q=await window.electronAPI.autoFetchArtwork({...F,forceTitleLookup:!0});!(q!=null&&q.error)&&(q.grid||q.hero||q.logo||q.icon)&&(M=M.map(T=>T.id===F.id?h0(T,q):T),A+=1)}t(M),r(F=>M.find(q=>q.id===(F==null?void 0:F.id))||M[0]||null),await window.electronAPI.saveDatabase(M),b(!1),alert(A>0?`SteamGridDB artwork updated for ${A} game${A===1?"":"s"}.`:"No new SteamGridDB artwork was found.")},Pr=()=>We().filter(M=>M.isFavorite),Xe=f0.map(M=>({...M,owned:e.some(A=>A.id===M.id&&A.owned)}));return i.jsxs("div",{className:"app-container",children:[i.jsx(Jf,{theme:oe.theme,speedFactor:oe.particleSpeed,density:oe.particleDensity}),i.jsx(Kf,{searchQuery:l,onSearchChange:a,onOpenSettings:()=>{j.playClickPulse(),u(!0)},cpuUsage:R,ramUsage:Z,activeView:o,onViewChange:Q}),i.jsxs("main",{className:`main-viewport ${S&&o==="library"?"sidebar-active":""}`,children:[o==="library"&&i.jsxs(i.Fragment,{children:[i.jsx(t0,{game:n,onLaunch:De,onToggleFavorite:P,onEditMetadata:()=>v(!0),onPinSidebar:()=>C(!S),isRunning:m===(n==null?void 0:n.id),isSidebarPinned:S}),i.jsx(Zf,{games:We(),selectedGame:n,onSelectGame:r,onLaunchGame:De,runningGameId:m})]}),o==="favourites"&&i.jsx(d0,{games:Pr(),selectedGame:n,onSelectGame:r,onLaunchGame:De,onToggleFavorite:P,onReturnToLibrary:()=>Q("library"),runningGameId:m}),o==="store"&&i.jsx(s0,{catalog:Xe,ownedGames:e,onSelectItem:Re,searchQuery:l}),o==="store-item"&&i.jsx(u0,{item:c,ownedGames:e,onBack:Ue,onMarkOwned:ct,onLinkExe:Fe,onLaunch:De})]}),i.jsx(n0,{isOpen:w,onToggle:()=>L(!w),onOpenSettings:()=>u(!0),onManualImport:U,onImportScannedGames:I,onBatchFetchArtwork:Cr,isBatchFetchingArtwork:N,cpuUsage:R,ramUsage:Z,games:e}),S&&i.jsx(r0,{game:n,onClose:()=>C(!1),isRunning:m===(n==null?void 0:n.id),sessionTime:h,cpuUsage:R,ramUsage:Z}),f&&i.jsx(a0,{settings:oe,onUpdateSettings:nt,onResetDatabase:B,gamesCount:e.length,onClose:()=>u(!1)}),p&&i.jsx(l0,{game:n,onSave:wt,onClose:()=>v(!1)})]})}va.createRoot(document.getElementById("root")).render(i.jsx(sd.StrictMode,{children:i.jsx(g0,{})}));
