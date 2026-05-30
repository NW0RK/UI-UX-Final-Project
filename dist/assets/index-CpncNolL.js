(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const i of l)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(l){const i={};return l.integrity&&(i.integrity=l.integrity),l.referrerPolicy&&(i.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?i.credentials="include":l.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(l){if(l.ep)return;l.ep=!0;const i=n(l);fetch(l.href,i)}})();function Du(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var hs={exports:{}},wl={},ms={exports:{}},O={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var gr=Symbol.for("react.element"),Fu=Symbol.for("react.portal"),Ou=Symbol.for("react.fragment"),Hu=Symbol.for("react.strict_mode"),Vu=Symbol.for("react.profiler"),$u=Symbol.for("react.provider"),Bu=Symbol.for("react.context"),Gu=Symbol.for("react.forward_ref"),qu=Symbol.for("react.suspense"),Wu=Symbol.for("react.memo"),Xu=Symbol.for("react.lazy"),Za=Symbol.iterator;function Qu(e){return e===null||typeof e!="object"?null:(e=Za&&e[Za]||e["@@iterator"],typeof e=="function"?e:null)}var gs={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},ys=Object.assign,xs={};function zn(e,t,n){this.props=e,this.context=t,this.refs=xs,this.updater=n||gs}zn.prototype.isReactComponent={};zn.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};zn.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function vs(){}vs.prototype=zn.prototype;function ra(e,t,n){this.props=e,this.context=t,this.refs=xs,this.updater=n||gs}var la=ra.prototype=new vs;la.constructor=ra;ys(la,zn.prototype);la.isPureReactComponent=!0;var eo=Array.isArray,ws=Object.prototype.hasOwnProperty,ia={current:null},ks={key:!0,ref:!0,__self:!0,__source:!0};function bs(e,t,n){var r,l={},i=null,o=null;if(t!=null)for(r in t.ref!==void 0&&(o=t.ref),t.key!==void 0&&(i=""+t.key),t)ws.call(t,r)&&!ks.hasOwnProperty(r)&&(l[r]=t[r]);var s=arguments.length-2;if(s===1)l.children=n;else if(1<s){for(var c=Array(s),d=0;d<s;d++)c[d]=arguments[d+2];l.children=c}if(e&&e.defaultProps)for(r in s=e.defaultProps,s)l[r]===void 0&&(l[r]=s[r]);return{$$typeof:gr,type:e,key:i,ref:o,props:l,_owner:ia.current}}function Ku(e,t){return{$$typeof:gr,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function aa(e){return typeof e=="object"&&e!==null&&e.$$typeof===gr}function Yu(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var to=/\/+/g;function Dl(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Yu(""+e.key):t.toString(36)}function Dr(e,t,n,r,l){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(i){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case gr:case Fu:o=!0}}if(o)return o=e,l=l(o),e=r===""?"."+Dl(o,0):r,eo(l)?(n="",e!=null&&(n=e.replace(to,"$&/")+"/"),Dr(l,t,n,"",function(d){return d})):l!=null&&(aa(l)&&(l=Ku(l,n+(!l.key||o&&o.key===l.key?"":(""+l.key).replace(to,"$&/")+"/")+e)),t.push(l)),1;if(o=0,r=r===""?".":r+":",eo(e))for(var s=0;s<e.length;s++){i=e[s];var c=r+Dl(i,s);o+=Dr(i,t,n,c,l)}else if(c=Qu(e),typeof c=="function")for(e=c.call(e),s=0;!(i=e.next()).done;)i=i.value,c=r+Dl(i,s++),o+=Dr(i,t,n,c,l);else if(i==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return o}function kr(e,t,n){if(e==null)return e;var r=[],l=0;return Dr(e,r,"","",function(i){return t.call(n,i,l++)}),r}function Ju(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var ve={current:null},Fr={transition:null},Zu={ReactCurrentDispatcher:ve,ReactCurrentBatchConfig:Fr,ReactCurrentOwner:ia};function Ss(){throw Error("act(...) is not supported in production builds of React.")}O.Children={map:kr,forEach:function(e,t,n){kr(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return kr(e,function(){t++}),t},toArray:function(e){return kr(e,function(t){return t})||[]},only:function(e){if(!aa(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};O.Component=zn;O.Fragment=Ou;O.Profiler=Vu;O.PureComponent=ra;O.StrictMode=Hu;O.Suspense=qu;O.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Zu;O.act=Ss;O.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=ys({},e.props),l=e.key,i=e.ref,o=e._owner;if(t!=null){if(t.ref!==void 0&&(i=t.ref,o=ia.current),t.key!==void 0&&(l=""+t.key),e.type&&e.type.defaultProps)var s=e.type.defaultProps;for(c in t)ws.call(t,c)&&!ks.hasOwnProperty(c)&&(r[c]=t[c]===void 0&&s!==void 0?s[c]:t[c])}var c=arguments.length-2;if(c===1)r.children=n;else if(1<c){s=Array(c);for(var d=0;d<c;d++)s[d]=arguments[d+2];r.children=s}return{$$typeof:gr,type:e.type,key:l,ref:i,props:r,_owner:o}};O.createContext=function(e){return e={$$typeof:Bu,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:$u,_context:e},e.Consumer=e};O.createElement=bs;O.createFactory=function(e){var t=bs.bind(null,e);return t.type=e,t};O.createRef=function(){return{current:null}};O.forwardRef=function(e){return{$$typeof:Gu,render:e}};O.isValidElement=aa;O.lazy=function(e){return{$$typeof:Xu,_payload:{_status:-1,_result:e},_init:Ju}};O.memo=function(e,t){return{$$typeof:Wu,type:e,compare:t===void 0?null:t}};O.startTransition=function(e){var t=Fr.transition;Fr.transition={};try{e()}finally{Fr.transition=t}};O.unstable_act=Ss;O.useCallback=function(e,t){return ve.current.useCallback(e,t)};O.useContext=function(e){return ve.current.useContext(e)};O.useDebugValue=function(){};O.useDeferredValue=function(e){return ve.current.useDeferredValue(e)};O.useEffect=function(e,t){return ve.current.useEffect(e,t)};O.useId=function(){return ve.current.useId()};O.useImperativeHandle=function(e,t,n){return ve.current.useImperativeHandle(e,t,n)};O.useInsertionEffect=function(e,t){return ve.current.useInsertionEffect(e,t)};O.useLayoutEffect=function(e,t){return ve.current.useLayoutEffect(e,t)};O.useMemo=function(e,t){return ve.current.useMemo(e,t)};O.useReducer=function(e,t,n){return ve.current.useReducer(e,t,n)};O.useRef=function(e){return ve.current.useRef(e)};O.useState=function(e){return ve.current.useState(e)};O.useSyncExternalStore=function(e,t,n){return ve.current.useSyncExternalStore(e,t,n)};O.useTransition=function(){return ve.current.useTransition()};O.version="18.3.1";ms.exports=O;var T=ms.exports;const ed=Du(T);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var td=T,nd=Symbol.for("react.element"),rd=Symbol.for("react.fragment"),ld=Object.prototype.hasOwnProperty,id=td.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,ad={key:!0,ref:!0,__self:!0,__source:!0};function js(e,t,n){var r,l={},i=null,o=null;n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(o=t.ref);for(r in t)ld.call(t,r)&&!ad.hasOwnProperty(r)&&(l[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)l[r]===void 0&&(l[r]=t[r]);return{$$typeof:nd,type:e,key:i,ref:o,props:l,_owner:id.current}}wl.Fragment=rd;wl.jsx=js;wl.jsxs=js;hs.exports=wl;var a=hs.exports,ui={},Ns={exports:{}},_e={},Cs={exports:{}},Ps={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(z,A){var D=z.length;z.push(A);e:for(;0<D;){var G=D-1>>>1,K=z[G];if(0<l(K,A))z[G]=A,z[D]=K,D=G;else break e}}function n(z){return z.length===0?null:z[0]}function r(z){if(z.length===0)return null;var A=z[0],D=z.pop();if(D!==A){z[0]=D;e:for(var G=0,K=z.length,lt=K>>>1;G<lt;){var de=2*(G+1)-1,mt=z[de],Ve=de+1,M=z[Ve];if(0>l(mt,D))Ve<K&&0>l(M,mt)?(z[G]=M,z[Ve]=D,G=Ve):(z[G]=mt,z[de]=D,G=de);else if(Ve<K&&0>l(M,D))z[G]=M,z[Ve]=D,G=Ve;else break e}}return A}function l(z,A){var D=z.sortIndex-A.sortIndex;return D!==0?D:z.id-A.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;e.unstable_now=function(){return i.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],d=[],h=1,g=null,m=3,x=!1,y=!1,w=!1,U=typeof setTimeout=="function"?setTimeout:null,f=typeof clearTimeout=="function"?clearTimeout:null,u=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function p(z){for(var A=n(d);A!==null;){if(A.callback===null)r(d);else if(A.startTime<=z)r(d),A.sortIndex=A.expirationTime,t(c,A);else break;A=n(d)}}function v(z){if(w=!1,p(z),!y)if(n(c)!==null)y=!0,Rt(S);else{var A=n(d);A!==null&&Le(v,A.startTime-z)}}function S(z,A){y=!1,w&&(w=!1,f(N),N=-1),x=!0;var D=m;try{for(p(A),g=n(c);g!==null&&(!(g.expirationTime>A)||z&&!$());){var G=g.callback;if(typeof G=="function"){g.callback=null,m=g.priorityLevel;var K=G(g.expirationTime<=A);A=e.unstable_now(),typeof K=="function"?g.callback=K:g===n(c)&&r(c),p(A)}else r(c);g=n(c)}if(g!==null)var lt=!0;else{var de=n(d);de!==null&&Le(v,de.startTime-A),lt=!1}return lt}finally{g=null,m=D,x=!1}}var P=!1,b=null,N=-1,F=5,I=-1;function $(){return!(e.unstable_now()-I<F)}function ge(){if(b!==null){var z=e.unstable_now();I=z;var A=!0;try{A=b(!0,z)}finally{A?Pe():(P=!1,b=null)}}else P=!1}var Pe;if(typeof u=="function")Pe=function(){u(ge)};else if(typeof MessageChannel<"u"){var rt=new MessageChannel,Ke=rt.port2;rt.port1.onmessage=ge,Pe=function(){Ke.postMessage(null)}}else Pe=function(){U(ge,0)};function Rt(z){b=z,P||(P=!0,Pe())}function Le(z,A){N=U(function(){z(e.unstable_now())},A)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(z){z.callback=null},e.unstable_continueExecution=function(){y||x||(y=!0,Rt(S))},e.unstable_forceFrameRate=function(z){0>z||125<z?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):F=0<z?Math.floor(1e3/z):5},e.unstable_getCurrentPriorityLevel=function(){return m},e.unstable_getFirstCallbackNode=function(){return n(c)},e.unstable_next=function(z){switch(m){case 1:case 2:case 3:var A=3;break;default:A=m}var D=m;m=A;try{return z()}finally{m=D}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(z,A){switch(z){case 1:case 2:case 3:case 4:case 5:break;default:z=3}var D=m;m=z;try{return A()}finally{m=D}},e.unstable_scheduleCallback=function(z,A,D){var G=e.unstable_now();switch(typeof D=="object"&&D!==null?(D=D.delay,D=typeof D=="number"&&0<D?G+D:G):D=G,z){case 1:var K=-1;break;case 2:K=250;break;case 5:K=1073741823;break;case 4:K=1e4;break;default:K=5e3}return K=D+K,z={id:h++,callback:A,priorityLevel:z,startTime:D,expirationTime:K,sortIndex:-1},D>G?(z.sortIndex=D,t(d,z),n(c)===null&&z===n(d)&&(w?(f(N),N=-1):w=!0,Le(v,D-G))):(z.sortIndex=K,t(c,z),y||x||(y=!0,Rt(S))),z},e.unstable_shouldYield=$,e.unstable_wrapCallback=function(z){var A=m;return function(){var D=m;m=A;try{return z.apply(this,arguments)}finally{m=D}}}})(Ps);Cs.exports=Ps;var od=Cs.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var sd=T,Me=od;function k(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var zs=new Set,Zn={};function Yt(e,t){kn(e,t),kn(e+"Capture",t)}function kn(e,t){for(Zn[e]=t,e=0;e<t.length;e++)zs.add(t[e])}var ut=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),di=Object.prototype.hasOwnProperty,cd=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,no={},ro={};function ud(e){return di.call(ro,e)?!0:di.call(no,e)?!1:cd.test(e)?ro[e]=!0:(no[e]=!0,!1)}function dd(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function pd(e,t,n,r){if(t===null||typeof t>"u"||dd(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function we(e,t,n,r,l,i,o){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=l,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=o}var ue={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){ue[e]=new we(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];ue[t]=new we(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){ue[e]=new we(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){ue[e]=new we(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){ue[e]=new we(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){ue[e]=new we(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){ue[e]=new we(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){ue[e]=new we(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){ue[e]=new we(e,5,!1,e.toLowerCase(),null,!1,!1)});var oa=/[\-:]([a-z])/g;function sa(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(oa,sa);ue[t]=new we(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(oa,sa);ue[t]=new we(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(oa,sa);ue[t]=new we(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){ue[e]=new we(e,1,!1,e.toLowerCase(),null,!1,!1)});ue.xlinkHref=new we("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){ue[e]=new we(e,1,!1,e.toLowerCase(),null,!0,!0)});function ca(e,t,n,r){var l=ue.hasOwnProperty(t)?ue[t]:null;(l!==null?l.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(pd(t,n,l,r)&&(n=null),r||l===null?ud(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):l.mustUseProperty?e[l.propertyName]=n===null?l.type===3?!1:"":n:(t=l.attributeName,r=l.attributeNamespace,n===null?e.removeAttribute(t):(l=l.type,n=l===3||l===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var ht=sd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,br=Symbol.for("react.element"),nn=Symbol.for("react.portal"),rn=Symbol.for("react.fragment"),ua=Symbol.for("react.strict_mode"),pi=Symbol.for("react.profiler"),Es=Symbol.for("react.provider"),Ts=Symbol.for("react.context"),da=Symbol.for("react.forward_ref"),fi=Symbol.for("react.suspense"),hi=Symbol.for("react.suspense_list"),pa=Symbol.for("react.memo"),yt=Symbol.for("react.lazy"),Ms=Symbol.for("react.offscreen"),lo=Symbol.iterator;function Mn(e){return e===null||typeof e!="object"?null:(e=lo&&e[lo]||e["@@iterator"],typeof e=="function"?e:null)}var Z=Object.assign,Fl;function On(e){if(Fl===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Fl=t&&t[1]||""}return`
`+Fl+e}var Ol=!1;function Hl(e,t){if(!e||Ol)return"";Ol=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(d){var r=d}Reflect.construct(e,[],t)}else{try{t.call()}catch(d){r=d}e.call(t.prototype)}else{try{throw Error()}catch(d){r=d}e()}}catch(d){if(d&&r&&typeof d.stack=="string"){for(var l=d.stack.split(`
`),i=r.stack.split(`
`),o=l.length-1,s=i.length-1;1<=o&&0<=s&&l[o]!==i[s];)s--;for(;1<=o&&0<=s;o--,s--)if(l[o]!==i[s]){if(o!==1||s!==1)do if(o--,s--,0>s||l[o]!==i[s]){var c=`
`+l[o].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}while(1<=o&&0<=s);break}}}finally{Ol=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?On(e):""}function fd(e){switch(e.tag){case 5:return On(e.type);case 16:return On("Lazy");case 13:return On("Suspense");case 19:return On("SuspenseList");case 0:case 2:case 15:return e=Hl(e.type,!1),e;case 11:return e=Hl(e.type.render,!1),e;case 1:return e=Hl(e.type,!0),e;default:return""}}function mi(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case rn:return"Fragment";case nn:return"Portal";case pi:return"Profiler";case ua:return"StrictMode";case fi:return"Suspense";case hi:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Ts:return(e.displayName||"Context")+".Consumer";case Es:return(e._context.displayName||"Context")+".Provider";case da:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case pa:return t=e.displayName||null,t!==null?t:mi(e.type)||"Memo";case yt:t=e._payload,e=e._init;try{return mi(e(t))}catch{}}return null}function hd(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return mi(t);case 8:return t===ua?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Mt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function _s(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function md(e){var t=_s(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var l=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return l.call(this)},set:function(o){r=""+o,i.call(this,o)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Sr(e){e._valueTracker||(e._valueTracker=md(e))}function As(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=_s(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Kr(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function gi(e,t){var n=t.checked;return Z({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function io(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Mt(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Ls(e,t){t=t.checked,t!=null&&ca(e,"checked",t,!1)}function yi(e,t){Ls(e,t);var n=Mt(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?xi(e,t.type,n):t.hasOwnProperty("defaultValue")&&xi(e,t.type,Mt(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function ao(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function xi(e,t,n){(t!=="number"||Kr(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Hn=Array.isArray;function mn(e,t,n,r){if(e=e.options,t){t={};for(var l=0;l<n.length;l++)t["$"+n[l]]=!0;for(n=0;n<e.length;n++)l=t.hasOwnProperty("$"+e[n].value),e[n].selected!==l&&(e[n].selected=l),l&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Mt(n),t=null,l=0;l<e.length;l++){if(e[l].value===n){e[l].selected=!0,r&&(e[l].defaultSelected=!0);return}t!==null||e[l].disabled||(t=e[l])}t!==null&&(t.selected=!0)}}function vi(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(k(91));return Z({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function oo(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(k(92));if(Hn(n)){if(1<n.length)throw Error(k(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Mt(n)}}function Is(e,t){var n=Mt(t.value),r=Mt(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function so(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Rs(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function wi(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Rs(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var jr,Us=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,l){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,l)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(jr=jr||document.createElement("div"),jr.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=jr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function er(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Bn={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},gd=["Webkit","ms","Moz","O"];Object.keys(Bn).forEach(function(e){gd.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Bn[t]=Bn[e]})});function Ds(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Bn.hasOwnProperty(e)&&Bn[e]?(""+t).trim():t+"px"}function Fs(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,l=Ds(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,l):e[n]=l}}var yd=Z({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ki(e,t){if(t){if(yd[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(k(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(k(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(k(61))}if(t.style!=null&&typeof t.style!="object")throw Error(k(62))}}function bi(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Si=null;function fa(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ji=null,gn=null,yn=null;function co(e){if(e=vr(e)){if(typeof ji!="function")throw Error(k(280));var t=e.stateNode;t&&(t=Nl(t),ji(e.stateNode,e.type,t))}}function Os(e){gn?yn?yn.push(e):yn=[e]:gn=e}function Hs(){if(gn){var e=gn,t=yn;if(yn=gn=null,co(e),t)for(e=0;e<t.length;e++)co(t[e])}}function Vs(e,t){return e(t)}function $s(){}var Vl=!1;function Bs(e,t,n){if(Vl)return e(t,n);Vl=!0;try{return Vs(e,t,n)}finally{Vl=!1,(gn!==null||yn!==null)&&($s(),Hs())}}function tr(e,t){var n=e.stateNode;if(n===null)return null;var r=Nl(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(k(231,t,typeof n));return n}var Ni=!1;if(ut)try{var _n={};Object.defineProperty(_n,"passive",{get:function(){Ni=!0}}),window.addEventListener("test",_n,_n),window.removeEventListener("test",_n,_n)}catch{Ni=!1}function xd(e,t,n,r,l,i,o,s,c){var d=Array.prototype.slice.call(arguments,3);try{t.apply(n,d)}catch(h){this.onError(h)}}var Gn=!1,Yr=null,Jr=!1,Ci=null,vd={onError:function(e){Gn=!0,Yr=e}};function wd(e,t,n,r,l,i,o,s,c){Gn=!1,Yr=null,xd.apply(vd,arguments)}function kd(e,t,n,r,l,i,o,s,c){if(wd.apply(this,arguments),Gn){if(Gn){var d=Yr;Gn=!1,Yr=null}else throw Error(k(198));Jr||(Jr=!0,Ci=d)}}function Jt(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Gs(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function uo(e){if(Jt(e)!==e)throw Error(k(188))}function bd(e){var t=e.alternate;if(!t){if(t=Jt(e),t===null)throw Error(k(188));return t!==e?null:e}for(var n=e,r=t;;){var l=n.return;if(l===null)break;var i=l.alternate;if(i===null){if(r=l.return,r!==null){n=r;continue}break}if(l.child===i.child){for(i=l.child;i;){if(i===n)return uo(l),e;if(i===r)return uo(l),t;i=i.sibling}throw Error(k(188))}if(n.return!==r.return)n=l,r=i;else{for(var o=!1,s=l.child;s;){if(s===n){o=!0,n=l,r=i;break}if(s===r){o=!0,r=l,n=i;break}s=s.sibling}if(!o){for(s=i.child;s;){if(s===n){o=!0,n=i,r=l;break}if(s===r){o=!0,r=i,n=l;break}s=s.sibling}if(!o)throw Error(k(189))}}if(n.alternate!==r)throw Error(k(190))}if(n.tag!==3)throw Error(k(188));return n.stateNode.current===n?e:t}function qs(e){return e=bd(e),e!==null?Ws(e):null}function Ws(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Ws(e);if(t!==null)return t;e=e.sibling}return null}var Xs=Me.unstable_scheduleCallback,po=Me.unstable_cancelCallback,Sd=Me.unstable_shouldYield,jd=Me.unstable_requestPaint,te=Me.unstable_now,Nd=Me.unstable_getCurrentPriorityLevel,ha=Me.unstable_ImmediatePriority,Qs=Me.unstable_UserBlockingPriority,Zr=Me.unstable_NormalPriority,Cd=Me.unstable_LowPriority,Ks=Me.unstable_IdlePriority,kl=null,tt=null;function Pd(e){if(tt&&typeof tt.onCommitFiberRoot=="function")try{tt.onCommitFiberRoot(kl,e,void 0,(e.current.flags&128)===128)}catch{}}var We=Math.clz32?Math.clz32:Td,zd=Math.log,Ed=Math.LN2;function Td(e){return e>>>=0,e===0?32:31-(zd(e)/Ed|0)|0}var Nr=64,Cr=4194304;function Vn(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function el(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,l=e.suspendedLanes,i=e.pingedLanes,o=n&268435455;if(o!==0){var s=o&~l;s!==0?r=Vn(s):(i&=o,i!==0&&(r=Vn(i)))}else o=n&~l,o!==0?r=Vn(o):i!==0&&(r=Vn(i));if(r===0)return 0;if(t!==0&&t!==r&&!(t&l)&&(l=r&-r,i=t&-t,l>=i||l===16&&(i&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-We(t),l=1<<n,r|=e[n],t&=~l;return r}function Md(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function _d(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,l=e.expirationTimes,i=e.pendingLanes;0<i;){var o=31-We(i),s=1<<o,c=l[o];c===-1?(!(s&n)||s&r)&&(l[o]=Md(s,t)):c<=t&&(e.expiredLanes|=s),i&=~s}}function Pi(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Ys(){var e=Nr;return Nr<<=1,!(Nr&4194240)&&(Nr=64),e}function $l(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function yr(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-We(t),e[t]=n}function Ad(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var l=31-We(n),i=1<<l;t[l]=0,r[l]=-1,e[l]=-1,n&=~i}}function ma(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-We(n),l=1<<r;l&t|e[r]&t&&(e[r]|=t),n&=~l}}var B=0;function Js(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Zs,ga,ec,tc,nc,zi=!1,Pr=[],St=null,jt=null,Nt=null,nr=new Map,rr=new Map,vt=[],Ld="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function fo(e,t){switch(e){case"focusin":case"focusout":St=null;break;case"dragenter":case"dragleave":jt=null;break;case"mouseover":case"mouseout":Nt=null;break;case"pointerover":case"pointerout":nr.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":rr.delete(t.pointerId)}}function An(e,t,n,r,l,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[l]},t!==null&&(t=vr(t),t!==null&&ga(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,l!==null&&t.indexOf(l)===-1&&t.push(l),e)}function Id(e,t,n,r,l){switch(t){case"focusin":return St=An(St,e,t,n,r,l),!0;case"dragenter":return jt=An(jt,e,t,n,r,l),!0;case"mouseover":return Nt=An(Nt,e,t,n,r,l),!0;case"pointerover":var i=l.pointerId;return nr.set(i,An(nr.get(i)||null,e,t,n,r,l)),!0;case"gotpointercapture":return i=l.pointerId,rr.set(i,An(rr.get(i)||null,e,t,n,r,l)),!0}return!1}function rc(e){var t=Ht(e.target);if(t!==null){var n=Jt(t);if(n!==null){if(t=n.tag,t===13){if(t=Gs(n),t!==null){e.blockedOn=t,nc(e.priority,function(){ec(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Or(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Ei(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Si=r,n.target.dispatchEvent(r),Si=null}else return t=vr(n),t!==null&&ga(t),e.blockedOn=n,!1;t.shift()}return!0}function ho(e,t,n){Or(e)&&n.delete(t)}function Rd(){zi=!1,St!==null&&Or(St)&&(St=null),jt!==null&&Or(jt)&&(jt=null),Nt!==null&&Or(Nt)&&(Nt=null),nr.forEach(ho),rr.forEach(ho)}function Ln(e,t){e.blockedOn===t&&(e.blockedOn=null,zi||(zi=!0,Me.unstable_scheduleCallback(Me.unstable_NormalPriority,Rd)))}function lr(e){function t(l){return Ln(l,e)}if(0<Pr.length){Ln(Pr[0],e);for(var n=1;n<Pr.length;n++){var r=Pr[n];r.blockedOn===e&&(r.blockedOn=null)}}for(St!==null&&Ln(St,e),jt!==null&&Ln(jt,e),Nt!==null&&Ln(Nt,e),nr.forEach(t),rr.forEach(t),n=0;n<vt.length;n++)r=vt[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<vt.length&&(n=vt[0],n.blockedOn===null);)rc(n),n.blockedOn===null&&vt.shift()}var xn=ht.ReactCurrentBatchConfig,tl=!0;function Ud(e,t,n,r){var l=B,i=xn.transition;xn.transition=null;try{B=1,ya(e,t,n,r)}finally{B=l,xn.transition=i}}function Dd(e,t,n,r){var l=B,i=xn.transition;xn.transition=null;try{B=4,ya(e,t,n,r)}finally{B=l,xn.transition=i}}function ya(e,t,n,r){if(tl){var l=Ei(e,t,n,r);if(l===null)Zl(e,t,r,nl,n),fo(e,r);else if(Id(l,e,t,n,r))r.stopPropagation();else if(fo(e,r),t&4&&-1<Ld.indexOf(e)){for(;l!==null;){var i=vr(l);if(i!==null&&Zs(i),i=Ei(e,t,n,r),i===null&&Zl(e,t,r,nl,n),i===l)break;l=i}l!==null&&r.stopPropagation()}else Zl(e,t,r,null,n)}}var nl=null;function Ei(e,t,n,r){if(nl=null,e=fa(r),e=Ht(e),e!==null)if(t=Jt(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Gs(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return nl=e,null}function lc(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Nd()){case ha:return 1;case Qs:return 4;case Zr:case Cd:return 16;case Ks:return 536870912;default:return 16}default:return 16}}var kt=null,xa=null,Hr=null;function ic(){if(Hr)return Hr;var e,t=xa,n=t.length,r,l="value"in kt?kt.value:kt.textContent,i=l.length;for(e=0;e<n&&t[e]===l[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===l[i-r];r++);return Hr=l.slice(e,1<r?1-r:void 0)}function Vr(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function zr(){return!0}function mo(){return!1}function Ae(e){function t(n,r,l,i,o){this._reactName=n,this._targetInst=l,this.type=r,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var s in e)e.hasOwnProperty(s)&&(n=e[s],this[s]=n?n(i):i[s]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?zr:mo,this.isPropagationStopped=mo,this}return Z(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=zr)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=zr)},persist:function(){},isPersistent:zr}),t}var En={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},va=Ae(En),xr=Z({},En,{view:0,detail:0}),Fd=Ae(xr),Bl,Gl,In,bl=Z({},xr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:wa,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==In&&(In&&e.type==="mousemove"?(Bl=e.screenX-In.screenX,Gl=e.screenY-In.screenY):Gl=Bl=0,In=e),Bl)},movementY:function(e){return"movementY"in e?e.movementY:Gl}}),go=Ae(bl),Od=Z({},bl,{dataTransfer:0}),Hd=Ae(Od),Vd=Z({},xr,{relatedTarget:0}),ql=Ae(Vd),$d=Z({},En,{animationName:0,elapsedTime:0,pseudoElement:0}),Bd=Ae($d),Gd=Z({},En,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),qd=Ae(Gd),Wd=Z({},En,{data:0}),yo=Ae(Wd),Xd={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Qd={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Kd={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Yd(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Kd[e])?!!t[e]:!1}function wa(){return Yd}var Jd=Z({},xr,{key:function(e){if(e.key){var t=Xd[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Vr(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Qd[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:wa,charCode:function(e){return e.type==="keypress"?Vr(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Vr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Zd=Ae(Jd),ep=Z({},bl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),xo=Ae(ep),tp=Z({},xr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:wa}),np=Ae(tp),rp=Z({},En,{propertyName:0,elapsedTime:0,pseudoElement:0}),lp=Ae(rp),ip=Z({},bl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),ap=Ae(ip),op=[9,13,27,32],ka=ut&&"CompositionEvent"in window,qn=null;ut&&"documentMode"in document&&(qn=document.documentMode);var sp=ut&&"TextEvent"in window&&!qn,ac=ut&&(!ka||qn&&8<qn&&11>=qn),vo=" ",wo=!1;function oc(e,t){switch(e){case"keyup":return op.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function sc(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var ln=!1;function cp(e,t){switch(e){case"compositionend":return sc(t);case"keypress":return t.which!==32?null:(wo=!0,vo);case"textInput":return e=t.data,e===vo&&wo?null:e;default:return null}}function up(e,t){if(ln)return e==="compositionend"||!ka&&oc(e,t)?(e=ic(),Hr=xa=kt=null,ln=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return ac&&t.locale!=="ko"?null:t.data;default:return null}}var dp={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ko(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!dp[e.type]:t==="textarea"}function cc(e,t,n,r){Os(r),t=rl(t,"onChange"),0<t.length&&(n=new va("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Wn=null,ir=null;function pp(e){wc(e,0)}function Sl(e){var t=sn(e);if(As(t))return e}function fp(e,t){if(e==="change")return t}var uc=!1;if(ut){var Wl;if(ut){var Xl="oninput"in document;if(!Xl){var bo=document.createElement("div");bo.setAttribute("oninput","return;"),Xl=typeof bo.oninput=="function"}Wl=Xl}else Wl=!1;uc=Wl&&(!document.documentMode||9<document.documentMode)}function So(){Wn&&(Wn.detachEvent("onpropertychange",dc),ir=Wn=null)}function dc(e){if(e.propertyName==="value"&&Sl(ir)){var t=[];cc(t,ir,e,fa(e)),Bs(pp,t)}}function hp(e,t,n){e==="focusin"?(So(),Wn=t,ir=n,Wn.attachEvent("onpropertychange",dc)):e==="focusout"&&So()}function mp(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Sl(ir)}function gp(e,t){if(e==="click")return Sl(t)}function yp(e,t){if(e==="input"||e==="change")return Sl(t)}function xp(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Qe=typeof Object.is=="function"?Object.is:xp;function ar(e,t){if(Qe(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var l=n[r];if(!di.call(t,l)||!Qe(e[l],t[l]))return!1}return!0}function jo(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function No(e,t){var n=jo(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=jo(n)}}function pc(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?pc(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function fc(){for(var e=window,t=Kr();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Kr(e.document)}return t}function ba(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function vp(e){var t=fc(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&pc(n.ownerDocument.documentElement,n)){if(r!==null&&ba(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var l=n.textContent.length,i=Math.min(r.start,l);r=r.end===void 0?i:Math.min(r.end,l),!e.extend&&i>r&&(l=r,r=i,i=l),l=No(n,i);var o=No(n,r);l&&o&&(e.rangeCount!==1||e.anchorNode!==l.node||e.anchorOffset!==l.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(t=t.createRange(),t.setStart(l.node,l.offset),e.removeAllRanges(),i>r?(e.addRange(t),e.extend(o.node,o.offset)):(t.setEnd(o.node,o.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var wp=ut&&"documentMode"in document&&11>=document.documentMode,an=null,Ti=null,Xn=null,Mi=!1;function Co(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Mi||an==null||an!==Kr(r)||(r=an,"selectionStart"in r&&ba(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Xn&&ar(Xn,r)||(Xn=r,r=rl(Ti,"onSelect"),0<r.length&&(t=new va("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=an)))}function Er(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var on={animationend:Er("Animation","AnimationEnd"),animationiteration:Er("Animation","AnimationIteration"),animationstart:Er("Animation","AnimationStart"),transitionend:Er("Transition","TransitionEnd")},Ql={},hc={};ut&&(hc=document.createElement("div").style,"AnimationEvent"in window||(delete on.animationend.animation,delete on.animationiteration.animation,delete on.animationstart.animation),"TransitionEvent"in window||delete on.transitionend.transition);function jl(e){if(Ql[e])return Ql[e];if(!on[e])return e;var t=on[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in hc)return Ql[e]=t[n];return e}var mc=jl("animationend"),gc=jl("animationiteration"),yc=jl("animationstart"),xc=jl("transitionend"),vc=new Map,Po="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function At(e,t){vc.set(e,t),Yt(t,[e])}for(var Kl=0;Kl<Po.length;Kl++){var Yl=Po[Kl],kp=Yl.toLowerCase(),bp=Yl[0].toUpperCase()+Yl.slice(1);At(kp,"on"+bp)}At(mc,"onAnimationEnd");At(gc,"onAnimationIteration");At(yc,"onAnimationStart");At("dblclick","onDoubleClick");At("focusin","onFocus");At("focusout","onBlur");At(xc,"onTransitionEnd");kn("onMouseEnter",["mouseout","mouseover"]);kn("onMouseLeave",["mouseout","mouseover"]);kn("onPointerEnter",["pointerout","pointerover"]);kn("onPointerLeave",["pointerout","pointerover"]);Yt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Yt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Yt("onBeforeInput",["compositionend","keypress","textInput","paste"]);Yt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Yt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Yt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var $n="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Sp=new Set("cancel close invalid load scroll toggle".split(" ").concat($n));function zo(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,kd(r,t,void 0,e),e.currentTarget=null}function wc(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],l=r.event;r=r.listeners;e:{var i=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,d=s.currentTarget;if(s=s.listener,c!==i&&l.isPropagationStopped())break e;zo(l,s,d),i=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,d=s.currentTarget,s=s.listener,c!==i&&l.isPropagationStopped())break e;zo(l,s,d),i=c}}}if(Jr)throw e=Ci,Jr=!1,Ci=null,e}function W(e,t){var n=t[Ri];n===void 0&&(n=t[Ri]=new Set);var r=e+"__bubble";n.has(r)||(kc(t,e,2,!1),n.add(r))}function Jl(e,t,n){var r=0;t&&(r|=4),kc(n,e,r,t)}var Tr="_reactListening"+Math.random().toString(36).slice(2);function or(e){if(!e[Tr]){e[Tr]=!0,zs.forEach(function(n){n!=="selectionchange"&&(Sp.has(n)||Jl(n,!1,e),Jl(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Tr]||(t[Tr]=!0,Jl("selectionchange",!1,t))}}function kc(e,t,n,r){switch(lc(t)){case 1:var l=Ud;break;case 4:l=Dd;break;default:l=ya}n=l.bind(null,t,n,e),l=void 0,!Ni||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(l=!0),r?l!==void 0?e.addEventListener(t,n,{capture:!0,passive:l}):e.addEventListener(t,n,!0):l!==void 0?e.addEventListener(t,n,{passive:l}):e.addEventListener(t,n,!1)}function Zl(e,t,n,r,l){var i=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var s=r.stateNode.containerInfo;if(s===l||s.nodeType===8&&s.parentNode===l)break;if(o===4)for(o=r.return;o!==null;){var c=o.tag;if((c===3||c===4)&&(c=o.stateNode.containerInfo,c===l||c.nodeType===8&&c.parentNode===l))return;o=o.return}for(;s!==null;){if(o=Ht(s),o===null)return;if(c=o.tag,c===5||c===6){r=i=o;continue e}s=s.parentNode}}r=r.return}Bs(function(){var d=i,h=fa(n),g=[];e:{var m=vc.get(e);if(m!==void 0){var x=va,y=e;switch(e){case"keypress":if(Vr(n)===0)break e;case"keydown":case"keyup":x=Zd;break;case"focusin":y="focus",x=ql;break;case"focusout":y="blur",x=ql;break;case"beforeblur":case"afterblur":x=ql;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":x=go;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":x=Hd;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":x=np;break;case mc:case gc:case yc:x=Bd;break;case xc:x=lp;break;case"scroll":x=Fd;break;case"wheel":x=ap;break;case"copy":case"cut":case"paste":x=qd;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":x=xo}var w=(t&4)!==0,U=!w&&e==="scroll",f=w?m!==null?m+"Capture":null:m;w=[];for(var u=d,p;u!==null;){p=u;var v=p.stateNode;if(p.tag===5&&v!==null&&(p=v,f!==null&&(v=tr(u,f),v!=null&&w.push(sr(u,v,p)))),U)break;u=u.return}0<w.length&&(m=new x(m,y,null,n,h),g.push({event:m,listeners:w}))}}if(!(t&7)){e:{if(m=e==="mouseover"||e==="pointerover",x=e==="mouseout"||e==="pointerout",m&&n!==Si&&(y=n.relatedTarget||n.fromElement)&&(Ht(y)||y[dt]))break e;if((x||m)&&(m=h.window===h?h:(m=h.ownerDocument)?m.defaultView||m.parentWindow:window,x?(y=n.relatedTarget||n.toElement,x=d,y=y?Ht(y):null,y!==null&&(U=Jt(y),y!==U||y.tag!==5&&y.tag!==6)&&(y=null)):(x=null,y=d),x!==y)){if(w=go,v="onMouseLeave",f="onMouseEnter",u="mouse",(e==="pointerout"||e==="pointerover")&&(w=xo,v="onPointerLeave",f="onPointerEnter",u="pointer"),U=x==null?m:sn(x),p=y==null?m:sn(y),m=new w(v,u+"leave",x,n,h),m.target=U,m.relatedTarget=p,v=null,Ht(h)===d&&(w=new w(f,u+"enter",y,n,h),w.target=p,w.relatedTarget=U,v=w),U=v,x&&y)t:{for(w=x,f=y,u=0,p=w;p;p=en(p))u++;for(p=0,v=f;v;v=en(v))p++;for(;0<u-p;)w=en(w),u--;for(;0<p-u;)f=en(f),p--;for(;u--;){if(w===f||f!==null&&w===f.alternate)break t;w=en(w),f=en(f)}w=null}else w=null;x!==null&&Eo(g,m,x,w,!1),y!==null&&U!==null&&Eo(g,U,y,w,!0)}}e:{if(m=d?sn(d):window,x=m.nodeName&&m.nodeName.toLowerCase(),x==="select"||x==="input"&&m.type==="file")var S=fp;else if(ko(m))if(uc)S=yp;else{S=mp;var P=hp}else(x=m.nodeName)&&x.toLowerCase()==="input"&&(m.type==="checkbox"||m.type==="radio")&&(S=gp);if(S&&(S=S(e,d))){cc(g,S,n,h);break e}P&&P(e,m,d),e==="focusout"&&(P=m._wrapperState)&&P.controlled&&m.type==="number"&&xi(m,"number",m.value)}switch(P=d?sn(d):window,e){case"focusin":(ko(P)||P.contentEditable==="true")&&(an=P,Ti=d,Xn=null);break;case"focusout":Xn=Ti=an=null;break;case"mousedown":Mi=!0;break;case"contextmenu":case"mouseup":case"dragend":Mi=!1,Co(g,n,h);break;case"selectionchange":if(wp)break;case"keydown":case"keyup":Co(g,n,h)}var b;if(ka)e:{switch(e){case"compositionstart":var N="onCompositionStart";break e;case"compositionend":N="onCompositionEnd";break e;case"compositionupdate":N="onCompositionUpdate";break e}N=void 0}else ln?oc(e,n)&&(N="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(N="onCompositionStart");N&&(ac&&n.locale!=="ko"&&(ln||N!=="onCompositionStart"?N==="onCompositionEnd"&&ln&&(b=ic()):(kt=h,xa="value"in kt?kt.value:kt.textContent,ln=!0)),P=rl(d,N),0<P.length&&(N=new yo(N,e,null,n,h),g.push({event:N,listeners:P}),b?N.data=b:(b=sc(n),b!==null&&(N.data=b)))),(b=sp?cp(e,n):up(e,n))&&(d=rl(d,"onBeforeInput"),0<d.length&&(h=new yo("onBeforeInput","beforeinput",null,n,h),g.push({event:h,listeners:d}),h.data=b))}wc(g,t)})}function sr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function rl(e,t){for(var n=t+"Capture",r=[];e!==null;){var l=e,i=l.stateNode;l.tag===5&&i!==null&&(l=i,i=tr(e,n),i!=null&&r.unshift(sr(e,i,l)),i=tr(e,t),i!=null&&r.push(sr(e,i,l))),e=e.return}return r}function en(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Eo(e,t,n,r,l){for(var i=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,d=s.stateNode;if(c!==null&&c===r)break;s.tag===5&&d!==null&&(s=d,l?(c=tr(n,i),c!=null&&o.unshift(sr(n,c,s))):l||(c=tr(n,i),c!=null&&o.push(sr(n,c,s)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var jp=/\r\n?/g,Np=/\u0000|\uFFFD/g;function To(e){return(typeof e=="string"?e:""+e).replace(jp,`
`).replace(Np,"")}function Mr(e,t,n){if(t=To(t),To(e)!==t&&n)throw Error(k(425))}function ll(){}var _i=null,Ai=null;function Li(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Ii=typeof setTimeout=="function"?setTimeout:void 0,Cp=typeof clearTimeout=="function"?clearTimeout:void 0,Mo=typeof Promise=="function"?Promise:void 0,Pp=typeof queueMicrotask=="function"?queueMicrotask:typeof Mo<"u"?function(e){return Mo.resolve(null).then(e).catch(zp)}:Ii;function zp(e){setTimeout(function(){throw e})}function ei(e,t){var n=t,r=0;do{var l=n.nextSibling;if(e.removeChild(n),l&&l.nodeType===8)if(n=l.data,n==="/$"){if(r===0){e.removeChild(l),lr(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=l}while(n);lr(t)}function Ct(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function _o(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Tn=Math.random().toString(36).slice(2),et="__reactFiber$"+Tn,cr="__reactProps$"+Tn,dt="__reactContainer$"+Tn,Ri="__reactEvents$"+Tn,Ep="__reactListeners$"+Tn,Tp="__reactHandles$"+Tn;function Ht(e){var t=e[et];if(t)return t;for(var n=e.parentNode;n;){if(t=n[dt]||n[et]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=_o(e);e!==null;){if(n=e[et])return n;e=_o(e)}return t}e=n,n=e.parentNode}return null}function vr(e){return e=e[et]||e[dt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function sn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(k(33))}function Nl(e){return e[cr]||null}var Ui=[],cn=-1;function Lt(e){return{current:e}}function X(e){0>cn||(e.current=Ui[cn],Ui[cn]=null,cn--)}function q(e,t){cn++,Ui[cn]=e.current,e.current=t}var _t={},me=Lt(_t),je=Lt(!1),qt=_t;function bn(e,t){var n=e.type.contextTypes;if(!n)return _t;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var l={},i;for(i in n)l[i]=t[i];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=l),l}function Ne(e){return e=e.childContextTypes,e!=null}function il(){X(je),X(me)}function Ao(e,t,n){if(me.current!==_t)throw Error(k(168));q(me,t),q(je,n)}function bc(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var l in r)if(!(l in t))throw Error(k(108,hd(e)||"Unknown",l));return Z({},n,r)}function al(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||_t,qt=me.current,q(me,e),q(je,je.current),!0}function Lo(e,t,n){var r=e.stateNode;if(!r)throw Error(k(169));n?(e=bc(e,t,qt),r.__reactInternalMemoizedMergedChildContext=e,X(je),X(me),q(me,e)):X(je),q(je,n)}var at=null,Cl=!1,ti=!1;function Sc(e){at===null?at=[e]:at.push(e)}function Mp(e){Cl=!0,Sc(e)}function It(){if(!ti&&at!==null){ti=!0;var e=0,t=B;try{var n=at;for(B=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}at=null,Cl=!1}catch(l){throw at!==null&&(at=at.slice(e+1)),Xs(ha,It),l}finally{B=t,ti=!1}}return null}var un=[],dn=0,ol=null,sl=0,Ie=[],Re=0,Wt=null,ot=1,st="";function Ft(e,t){un[dn++]=sl,un[dn++]=ol,ol=e,sl=t}function jc(e,t,n){Ie[Re++]=ot,Ie[Re++]=st,Ie[Re++]=Wt,Wt=e;var r=ot;e=st;var l=32-We(r)-1;r&=~(1<<l),n+=1;var i=32-We(t)+l;if(30<i){var o=l-l%5;i=(r&(1<<o)-1).toString(32),r>>=o,l-=o,ot=1<<32-We(t)+l|n<<l|r,st=i+e}else ot=1<<i|n<<l|r,st=e}function Sa(e){e.return!==null&&(Ft(e,1),jc(e,1,0))}function ja(e){for(;e===ol;)ol=un[--dn],un[dn]=null,sl=un[--dn],un[dn]=null;for(;e===Wt;)Wt=Ie[--Re],Ie[Re]=null,st=Ie[--Re],Ie[Re]=null,ot=Ie[--Re],Ie[Re]=null}var Te=null,Ee=null,Q=!1,qe=null;function Nc(e,t){var n=De(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Io(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Te=e,Ee=Ct(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Te=e,Ee=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Wt!==null?{id:ot,overflow:st}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=De(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Te=e,Ee=null,!0):!1;default:return!1}}function Di(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Fi(e){if(Q){var t=Ee;if(t){var n=t;if(!Io(e,t)){if(Di(e))throw Error(k(418));t=Ct(n.nextSibling);var r=Te;t&&Io(e,t)?Nc(r,n):(e.flags=e.flags&-4097|2,Q=!1,Te=e)}}else{if(Di(e))throw Error(k(418));e.flags=e.flags&-4097|2,Q=!1,Te=e}}}function Ro(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Te=e}function _r(e){if(e!==Te)return!1;if(!Q)return Ro(e),Q=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Li(e.type,e.memoizedProps)),t&&(t=Ee)){if(Di(e))throw Cc(),Error(k(418));for(;t;)Nc(e,t),t=Ct(t.nextSibling)}if(Ro(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(k(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Ee=Ct(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Ee=null}}else Ee=Te?Ct(e.stateNode.nextSibling):null;return!0}function Cc(){for(var e=Ee;e;)e=Ct(e.nextSibling)}function Sn(){Ee=Te=null,Q=!1}function Na(e){qe===null?qe=[e]:qe.push(e)}var _p=ht.ReactCurrentBatchConfig;function Rn(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(k(309));var r=n.stateNode}if(!r)throw Error(k(147,e));var l=r,i=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===i?t.ref:(t=function(o){var s=l.refs;o===null?delete s[i]:s[i]=o},t._stringRef=i,t)}if(typeof e!="string")throw Error(k(284));if(!n._owner)throw Error(k(290,e))}return e}function Ar(e,t){throw e=Object.prototype.toString.call(t),Error(k(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Uo(e){var t=e._init;return t(e._payload)}function Pc(e){function t(f,u){if(e){var p=f.deletions;p===null?(f.deletions=[u],f.flags|=16):p.push(u)}}function n(f,u){if(!e)return null;for(;u!==null;)t(f,u),u=u.sibling;return null}function r(f,u){for(f=new Map;u!==null;)u.key!==null?f.set(u.key,u):f.set(u.index,u),u=u.sibling;return f}function l(f,u){return f=Tt(f,u),f.index=0,f.sibling=null,f}function i(f,u,p){return f.index=p,e?(p=f.alternate,p!==null?(p=p.index,p<u?(f.flags|=2,u):p):(f.flags|=2,u)):(f.flags|=1048576,u)}function o(f){return e&&f.alternate===null&&(f.flags|=2),f}function s(f,u,p,v){return u===null||u.tag!==6?(u=si(p,f.mode,v),u.return=f,u):(u=l(u,p),u.return=f,u)}function c(f,u,p,v){var S=p.type;return S===rn?h(f,u,p.props.children,v,p.key):u!==null&&(u.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===yt&&Uo(S)===u.type)?(v=l(u,p.props),v.ref=Rn(f,u,p),v.return=f,v):(v=Qr(p.type,p.key,p.props,null,f.mode,v),v.ref=Rn(f,u,p),v.return=f,v)}function d(f,u,p,v){return u===null||u.tag!==4||u.stateNode.containerInfo!==p.containerInfo||u.stateNode.implementation!==p.implementation?(u=ci(p,f.mode,v),u.return=f,u):(u=l(u,p.children||[]),u.return=f,u)}function h(f,u,p,v,S){return u===null||u.tag!==7?(u=Gt(p,f.mode,v,S),u.return=f,u):(u=l(u,p),u.return=f,u)}function g(f,u,p){if(typeof u=="string"&&u!==""||typeof u=="number")return u=si(""+u,f.mode,p),u.return=f,u;if(typeof u=="object"&&u!==null){switch(u.$$typeof){case br:return p=Qr(u.type,u.key,u.props,null,f.mode,p),p.ref=Rn(f,null,u),p.return=f,p;case nn:return u=ci(u,f.mode,p),u.return=f,u;case yt:var v=u._init;return g(f,v(u._payload),p)}if(Hn(u)||Mn(u))return u=Gt(u,f.mode,p,null),u.return=f,u;Ar(f,u)}return null}function m(f,u,p,v){var S=u!==null?u.key:null;if(typeof p=="string"&&p!==""||typeof p=="number")return S!==null?null:s(f,u,""+p,v);if(typeof p=="object"&&p!==null){switch(p.$$typeof){case br:return p.key===S?c(f,u,p,v):null;case nn:return p.key===S?d(f,u,p,v):null;case yt:return S=p._init,m(f,u,S(p._payload),v)}if(Hn(p)||Mn(p))return S!==null?null:h(f,u,p,v,null);Ar(f,p)}return null}function x(f,u,p,v,S){if(typeof v=="string"&&v!==""||typeof v=="number")return f=f.get(p)||null,s(u,f,""+v,S);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case br:return f=f.get(v.key===null?p:v.key)||null,c(u,f,v,S);case nn:return f=f.get(v.key===null?p:v.key)||null,d(u,f,v,S);case yt:var P=v._init;return x(f,u,p,P(v._payload),S)}if(Hn(v)||Mn(v))return f=f.get(p)||null,h(u,f,v,S,null);Ar(u,v)}return null}function y(f,u,p,v){for(var S=null,P=null,b=u,N=u=0,F=null;b!==null&&N<p.length;N++){b.index>N?(F=b,b=null):F=b.sibling;var I=m(f,b,p[N],v);if(I===null){b===null&&(b=F);break}e&&b&&I.alternate===null&&t(f,b),u=i(I,u,N),P===null?S=I:P.sibling=I,P=I,b=F}if(N===p.length)return n(f,b),Q&&Ft(f,N),S;if(b===null){for(;N<p.length;N++)b=g(f,p[N],v),b!==null&&(u=i(b,u,N),P===null?S=b:P.sibling=b,P=b);return Q&&Ft(f,N),S}for(b=r(f,b);N<p.length;N++)F=x(b,f,N,p[N],v),F!==null&&(e&&F.alternate!==null&&b.delete(F.key===null?N:F.key),u=i(F,u,N),P===null?S=F:P.sibling=F,P=F);return e&&b.forEach(function($){return t(f,$)}),Q&&Ft(f,N),S}function w(f,u,p,v){var S=Mn(p);if(typeof S!="function")throw Error(k(150));if(p=S.call(p),p==null)throw Error(k(151));for(var P=S=null,b=u,N=u=0,F=null,I=p.next();b!==null&&!I.done;N++,I=p.next()){b.index>N?(F=b,b=null):F=b.sibling;var $=m(f,b,I.value,v);if($===null){b===null&&(b=F);break}e&&b&&$.alternate===null&&t(f,b),u=i($,u,N),P===null?S=$:P.sibling=$,P=$,b=F}if(I.done)return n(f,b),Q&&Ft(f,N),S;if(b===null){for(;!I.done;N++,I=p.next())I=g(f,I.value,v),I!==null&&(u=i(I,u,N),P===null?S=I:P.sibling=I,P=I);return Q&&Ft(f,N),S}for(b=r(f,b);!I.done;N++,I=p.next())I=x(b,f,N,I.value,v),I!==null&&(e&&I.alternate!==null&&b.delete(I.key===null?N:I.key),u=i(I,u,N),P===null?S=I:P.sibling=I,P=I);return e&&b.forEach(function(ge){return t(f,ge)}),Q&&Ft(f,N),S}function U(f,u,p,v){if(typeof p=="object"&&p!==null&&p.type===rn&&p.key===null&&(p=p.props.children),typeof p=="object"&&p!==null){switch(p.$$typeof){case br:e:{for(var S=p.key,P=u;P!==null;){if(P.key===S){if(S=p.type,S===rn){if(P.tag===7){n(f,P.sibling),u=l(P,p.props.children),u.return=f,f=u;break e}}else if(P.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===yt&&Uo(S)===P.type){n(f,P.sibling),u=l(P,p.props),u.ref=Rn(f,P,p),u.return=f,f=u;break e}n(f,P);break}else t(f,P);P=P.sibling}p.type===rn?(u=Gt(p.props.children,f.mode,v,p.key),u.return=f,f=u):(v=Qr(p.type,p.key,p.props,null,f.mode,v),v.ref=Rn(f,u,p),v.return=f,f=v)}return o(f);case nn:e:{for(P=p.key;u!==null;){if(u.key===P)if(u.tag===4&&u.stateNode.containerInfo===p.containerInfo&&u.stateNode.implementation===p.implementation){n(f,u.sibling),u=l(u,p.children||[]),u.return=f,f=u;break e}else{n(f,u);break}else t(f,u);u=u.sibling}u=ci(p,f.mode,v),u.return=f,f=u}return o(f);case yt:return P=p._init,U(f,u,P(p._payload),v)}if(Hn(p))return y(f,u,p,v);if(Mn(p))return w(f,u,p,v);Ar(f,p)}return typeof p=="string"&&p!==""||typeof p=="number"?(p=""+p,u!==null&&u.tag===6?(n(f,u.sibling),u=l(u,p),u.return=f,f=u):(n(f,u),u=si(p,f.mode,v),u.return=f,f=u),o(f)):n(f,u)}return U}var jn=Pc(!0),zc=Pc(!1),cl=Lt(null),ul=null,pn=null,Ca=null;function Pa(){Ca=pn=ul=null}function za(e){var t=cl.current;X(cl),e._currentValue=t}function Oi(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function vn(e,t){ul=e,Ca=pn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(Se=!0),e.firstContext=null)}function Oe(e){var t=e._currentValue;if(Ca!==e)if(e={context:e,memoizedValue:t,next:null},pn===null){if(ul===null)throw Error(k(308));pn=e,ul.dependencies={lanes:0,firstContext:e}}else pn=pn.next=e;return t}var Vt=null;function Ea(e){Vt===null?Vt=[e]:Vt.push(e)}function Ec(e,t,n,r){var l=t.interleaved;return l===null?(n.next=n,Ea(t)):(n.next=l.next,l.next=n),t.interleaved=n,pt(e,r)}function pt(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var xt=!1;function Ta(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Tc(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function ct(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Pt(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,V&2){var l=r.pending;return l===null?t.next=t:(t.next=l.next,l.next=t),r.pending=t,pt(e,n)}return l=r.interleaved,l===null?(t.next=t,Ea(r)):(t.next=l.next,l.next=t),r.interleaved=t,pt(e,n)}function $r(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ma(e,n)}}function Do(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var l=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?l=i=o:i=i.next=o,n=n.next}while(n!==null);i===null?l=i=t:i=i.next=t}else l=i=t;n={baseState:r.baseState,firstBaseUpdate:l,lastBaseUpdate:i,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function dl(e,t,n,r){var l=e.updateQueue;xt=!1;var i=l.firstBaseUpdate,o=l.lastBaseUpdate,s=l.shared.pending;if(s!==null){l.shared.pending=null;var c=s,d=c.next;c.next=null,o===null?i=d:o.next=d,o=c;var h=e.alternate;h!==null&&(h=h.updateQueue,s=h.lastBaseUpdate,s!==o&&(s===null?h.firstBaseUpdate=d:s.next=d,h.lastBaseUpdate=c))}if(i!==null){var g=l.baseState;o=0,h=d=c=null,s=i;do{var m=s.lane,x=s.eventTime;if((r&m)===m){h!==null&&(h=h.next={eventTime:x,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var y=e,w=s;switch(m=t,x=n,w.tag){case 1:if(y=w.payload,typeof y=="function"){g=y.call(x,g,m);break e}g=y;break e;case 3:y.flags=y.flags&-65537|128;case 0:if(y=w.payload,m=typeof y=="function"?y.call(x,g,m):y,m==null)break e;g=Z({},g,m);break e;case 2:xt=!0}}s.callback!==null&&s.lane!==0&&(e.flags|=64,m=l.effects,m===null?l.effects=[s]:m.push(s))}else x={eventTime:x,lane:m,tag:s.tag,payload:s.payload,callback:s.callback,next:null},h===null?(d=h=x,c=g):h=h.next=x,o|=m;if(s=s.next,s===null){if(s=l.shared.pending,s===null)break;m=s,s=m.next,m.next=null,l.lastBaseUpdate=m,l.shared.pending=null}}while(!0);if(h===null&&(c=g),l.baseState=c,l.firstBaseUpdate=d,l.lastBaseUpdate=h,t=l.shared.interleaved,t!==null){l=t;do o|=l.lane,l=l.next;while(l!==t)}else i===null&&(l.shared.lanes=0);Qt|=o,e.lanes=o,e.memoizedState=g}}function Fo(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],l=r.callback;if(l!==null){if(r.callback=null,r=n,typeof l!="function")throw Error(k(191,l));l.call(r)}}}var wr={},nt=Lt(wr),ur=Lt(wr),dr=Lt(wr);function $t(e){if(e===wr)throw Error(k(174));return e}function Ma(e,t){switch(q(dr,t),q(ur,e),q(nt,wr),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:wi(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=wi(t,e)}X(nt),q(nt,t)}function Nn(){X(nt),X(ur),X(dr)}function Mc(e){$t(dr.current);var t=$t(nt.current),n=wi(t,e.type);t!==n&&(q(ur,e),q(nt,n))}function _a(e){ur.current===e&&(X(nt),X(ur))}var Y=Lt(0);function pl(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var ni=[];function Aa(){for(var e=0;e<ni.length;e++)ni[e]._workInProgressVersionPrimary=null;ni.length=0}var Br=ht.ReactCurrentDispatcher,ri=ht.ReactCurrentBatchConfig,Xt=0,J=null,re=null,ae=null,fl=!1,Qn=!1,pr=0,Ap=0;function pe(){throw Error(k(321))}function La(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Qe(e[n],t[n]))return!1;return!0}function Ia(e,t,n,r,l,i){if(Xt=i,J=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Br.current=e===null||e.memoizedState===null?Up:Dp,e=n(r,l),Qn){i=0;do{if(Qn=!1,pr=0,25<=i)throw Error(k(301));i+=1,ae=re=null,t.updateQueue=null,Br.current=Fp,e=n(r,l)}while(Qn)}if(Br.current=hl,t=re!==null&&re.next!==null,Xt=0,ae=re=J=null,fl=!1,t)throw Error(k(300));return e}function Ra(){var e=pr!==0;return pr=0,e}function Ze(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ae===null?J.memoizedState=ae=e:ae=ae.next=e,ae}function He(){if(re===null){var e=J.alternate;e=e!==null?e.memoizedState:null}else e=re.next;var t=ae===null?J.memoizedState:ae.next;if(t!==null)ae=t,re=e;else{if(e===null)throw Error(k(310));re=e,e={memoizedState:re.memoizedState,baseState:re.baseState,baseQueue:re.baseQueue,queue:re.queue,next:null},ae===null?J.memoizedState=ae=e:ae=ae.next=e}return ae}function fr(e,t){return typeof t=="function"?t(e):t}function li(e){var t=He(),n=t.queue;if(n===null)throw Error(k(311));n.lastRenderedReducer=e;var r=re,l=r.baseQueue,i=n.pending;if(i!==null){if(l!==null){var o=l.next;l.next=i.next,i.next=o}r.baseQueue=l=i,n.pending=null}if(l!==null){i=l.next,r=r.baseState;var s=o=null,c=null,d=i;do{var h=d.lane;if((Xt&h)===h)c!==null&&(c=c.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),r=d.hasEagerState?d.eagerState:e(r,d.action);else{var g={lane:h,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};c===null?(s=c=g,o=r):c=c.next=g,J.lanes|=h,Qt|=h}d=d.next}while(d!==null&&d!==i);c===null?o=r:c.next=s,Qe(r,t.memoizedState)||(Se=!0),t.memoizedState=r,t.baseState=o,t.baseQueue=c,n.lastRenderedState=r}if(e=n.interleaved,e!==null){l=e;do i=l.lane,J.lanes|=i,Qt|=i,l=l.next;while(l!==e)}else l===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function ii(e){var t=He(),n=t.queue;if(n===null)throw Error(k(311));n.lastRenderedReducer=e;var r=n.dispatch,l=n.pending,i=t.memoizedState;if(l!==null){n.pending=null;var o=l=l.next;do i=e(i,o.action),o=o.next;while(o!==l);Qe(i,t.memoizedState)||(Se=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),n.lastRenderedState=i}return[i,r]}function _c(){}function Ac(e,t){var n=J,r=He(),l=t(),i=!Qe(r.memoizedState,l);if(i&&(r.memoizedState=l,Se=!0),r=r.queue,Ua(Rc.bind(null,n,r,e),[e]),r.getSnapshot!==t||i||ae!==null&&ae.memoizedState.tag&1){if(n.flags|=2048,hr(9,Ic.bind(null,n,r,l,t),void 0,null),oe===null)throw Error(k(349));Xt&30||Lc(n,t,l)}return l}function Lc(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=J.updateQueue,t===null?(t={lastEffect:null,stores:null},J.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Ic(e,t,n,r){t.value=n,t.getSnapshot=r,Uc(t)&&Dc(e)}function Rc(e,t,n){return n(function(){Uc(t)&&Dc(e)})}function Uc(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Qe(e,n)}catch{return!0}}function Dc(e){var t=pt(e,1);t!==null&&Xe(t,e,1,-1)}function Oo(e){var t=Ze();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:fr,lastRenderedState:e},t.queue=e,e=e.dispatch=Rp.bind(null,J,e),[t.memoizedState,e]}function hr(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=J.updateQueue,t===null?(t={lastEffect:null,stores:null},J.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Fc(){return He().memoizedState}function Gr(e,t,n,r){var l=Ze();J.flags|=e,l.memoizedState=hr(1|t,n,void 0,r===void 0?null:r)}function Pl(e,t,n,r){var l=He();r=r===void 0?null:r;var i=void 0;if(re!==null){var o=re.memoizedState;if(i=o.destroy,r!==null&&La(r,o.deps)){l.memoizedState=hr(t,n,i,r);return}}J.flags|=e,l.memoizedState=hr(1|t,n,i,r)}function Ho(e,t){return Gr(8390656,8,e,t)}function Ua(e,t){return Pl(2048,8,e,t)}function Oc(e,t){return Pl(4,2,e,t)}function Hc(e,t){return Pl(4,4,e,t)}function Vc(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function $c(e,t,n){return n=n!=null?n.concat([e]):null,Pl(4,4,Vc.bind(null,t,e),n)}function Da(){}function Bc(e,t){var n=He();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&La(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Gc(e,t){var n=He();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&La(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function qc(e,t,n){return Xt&21?(Qe(n,t)||(n=Ys(),J.lanes|=n,Qt|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,Se=!0),e.memoizedState=n)}function Lp(e,t){var n=B;B=n!==0&&4>n?n:4,e(!0);var r=ri.transition;ri.transition={};try{e(!1),t()}finally{B=n,ri.transition=r}}function Wc(){return He().memoizedState}function Ip(e,t,n){var r=Et(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Xc(e))Qc(t,n);else if(n=Ec(e,t,n,r),n!==null){var l=xe();Xe(n,e,r,l),Kc(n,t,r)}}function Rp(e,t,n){var r=Et(e),l={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Xc(e))Qc(t,l);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var o=t.lastRenderedState,s=i(o,n);if(l.hasEagerState=!0,l.eagerState=s,Qe(s,o)){var c=t.interleaved;c===null?(l.next=l,Ea(t)):(l.next=c.next,c.next=l),t.interleaved=l;return}}catch{}finally{}n=Ec(e,t,l,r),n!==null&&(l=xe(),Xe(n,e,r,l),Kc(n,t,r))}}function Xc(e){var t=e.alternate;return e===J||t!==null&&t===J}function Qc(e,t){Qn=fl=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Kc(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ma(e,n)}}var hl={readContext:Oe,useCallback:pe,useContext:pe,useEffect:pe,useImperativeHandle:pe,useInsertionEffect:pe,useLayoutEffect:pe,useMemo:pe,useReducer:pe,useRef:pe,useState:pe,useDebugValue:pe,useDeferredValue:pe,useTransition:pe,useMutableSource:pe,useSyncExternalStore:pe,useId:pe,unstable_isNewReconciler:!1},Up={readContext:Oe,useCallback:function(e,t){return Ze().memoizedState=[e,t===void 0?null:t],e},useContext:Oe,useEffect:Ho,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Gr(4194308,4,Vc.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Gr(4194308,4,e,t)},useInsertionEffect:function(e,t){return Gr(4,2,e,t)},useMemo:function(e,t){var n=Ze();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Ze();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Ip.bind(null,J,e),[r.memoizedState,e]},useRef:function(e){var t=Ze();return e={current:e},t.memoizedState=e},useState:Oo,useDebugValue:Da,useDeferredValue:function(e){return Ze().memoizedState=e},useTransition:function(){var e=Oo(!1),t=e[0];return e=Lp.bind(null,e[1]),Ze().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=J,l=Ze();if(Q){if(n===void 0)throw Error(k(407));n=n()}else{if(n=t(),oe===null)throw Error(k(349));Xt&30||Lc(r,t,n)}l.memoizedState=n;var i={value:n,getSnapshot:t};return l.queue=i,Ho(Rc.bind(null,r,i,e),[e]),r.flags|=2048,hr(9,Ic.bind(null,r,i,n,t),void 0,null),n},useId:function(){var e=Ze(),t=oe.identifierPrefix;if(Q){var n=st,r=ot;n=(r&~(1<<32-We(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=pr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Ap++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Dp={readContext:Oe,useCallback:Bc,useContext:Oe,useEffect:Ua,useImperativeHandle:$c,useInsertionEffect:Oc,useLayoutEffect:Hc,useMemo:Gc,useReducer:li,useRef:Fc,useState:function(){return li(fr)},useDebugValue:Da,useDeferredValue:function(e){var t=He();return qc(t,re.memoizedState,e)},useTransition:function(){var e=li(fr)[0],t=He().memoizedState;return[e,t]},useMutableSource:_c,useSyncExternalStore:Ac,useId:Wc,unstable_isNewReconciler:!1},Fp={readContext:Oe,useCallback:Bc,useContext:Oe,useEffect:Ua,useImperativeHandle:$c,useInsertionEffect:Oc,useLayoutEffect:Hc,useMemo:Gc,useReducer:ii,useRef:Fc,useState:function(){return ii(fr)},useDebugValue:Da,useDeferredValue:function(e){var t=He();return re===null?t.memoizedState=e:qc(t,re.memoizedState,e)},useTransition:function(){var e=ii(fr)[0],t=He().memoizedState;return[e,t]},useMutableSource:_c,useSyncExternalStore:Ac,useId:Wc,unstable_isNewReconciler:!1};function Be(e,t){if(e&&e.defaultProps){t=Z({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Hi(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:Z({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var zl={isMounted:function(e){return(e=e._reactInternals)?Jt(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=xe(),l=Et(e),i=ct(r,l);i.payload=t,n!=null&&(i.callback=n),t=Pt(e,i,l),t!==null&&(Xe(t,e,l,r),$r(t,e,l))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=xe(),l=Et(e),i=ct(r,l);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=Pt(e,i,l),t!==null&&(Xe(t,e,l,r),$r(t,e,l))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=xe(),r=Et(e),l=ct(n,r);l.tag=2,t!=null&&(l.callback=t),t=Pt(e,l,r),t!==null&&(Xe(t,e,r,n),$r(t,e,r))}};function Vo(e,t,n,r,l,i,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,i,o):t.prototype&&t.prototype.isPureReactComponent?!ar(n,r)||!ar(l,i):!0}function Yc(e,t,n){var r=!1,l=_t,i=t.contextType;return typeof i=="object"&&i!==null?i=Oe(i):(l=Ne(t)?qt:me.current,r=t.contextTypes,i=(r=r!=null)?bn(e,l):_t),t=new t(n,i),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=zl,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=l,e.__reactInternalMemoizedMaskedChildContext=i),t}function $o(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&zl.enqueueReplaceState(t,t.state,null)}function Vi(e,t,n,r){var l=e.stateNode;l.props=n,l.state=e.memoizedState,l.refs={},Ta(e);var i=t.contextType;typeof i=="object"&&i!==null?l.context=Oe(i):(i=Ne(t)?qt:me.current,l.context=bn(e,i)),l.state=e.memoizedState,i=t.getDerivedStateFromProps,typeof i=="function"&&(Hi(e,t,i,n),l.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof l.getSnapshotBeforeUpdate=="function"||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(t=l.state,typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount(),t!==l.state&&zl.enqueueReplaceState(l,l.state,null),dl(e,n,l,r),l.state=e.memoizedState),typeof l.componentDidMount=="function"&&(e.flags|=4194308)}function Cn(e,t){try{var n="",r=t;do n+=fd(r),r=r.return;while(r);var l=n}catch(i){l=`
Error generating stack: `+i.message+`
`+i.stack}return{value:e,source:t,stack:l,digest:null}}function ai(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function $i(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Op=typeof WeakMap=="function"?WeakMap:Map;function Jc(e,t,n){n=ct(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){gl||(gl=!0,Zi=r),$i(e,t)},n}function Zc(e,t,n){n=ct(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var l=t.value;n.payload=function(){return r(l)},n.callback=function(){$i(e,t)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){$i(e,t),typeof r!="function"&&(zt===null?zt=new Set([this]):zt.add(this));var o=t.stack;this.componentDidCatch(t.value,{componentStack:o!==null?o:""})}),n}function Bo(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Op;var l=new Set;r.set(t,l)}else l=r.get(t),l===void 0&&(l=new Set,r.set(t,l));l.has(n)||(l.add(n),e=ef.bind(null,e,t,n),t.then(e,e))}function Go(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function qo(e,t,n,r,l){return e.mode&1?(e.flags|=65536,e.lanes=l,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=ct(-1,1),t.tag=2,Pt(n,t,1))),n.lanes|=1),e)}var Hp=ht.ReactCurrentOwner,Se=!1;function ye(e,t,n,r){t.child=e===null?zc(t,null,n,r):jn(t,e.child,n,r)}function Wo(e,t,n,r,l){n=n.render;var i=t.ref;return vn(t,l),r=Ia(e,t,n,r,i,l),n=Ra(),e!==null&&!Se?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,ft(e,t,l)):(Q&&n&&Sa(t),t.flags|=1,ye(e,t,r,l),t.child)}function Xo(e,t,n,r,l){if(e===null){var i=n.type;return typeof i=="function"&&!qa(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=i,eu(e,t,i,r,l)):(e=Qr(n.type,null,r,t,t.mode,l),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!(e.lanes&l)){var o=i.memoizedProps;if(n=n.compare,n=n!==null?n:ar,n(o,r)&&e.ref===t.ref)return ft(e,t,l)}return t.flags|=1,e=Tt(i,r),e.ref=t.ref,e.return=t,t.child=e}function eu(e,t,n,r,l){if(e!==null){var i=e.memoizedProps;if(ar(i,r)&&e.ref===t.ref)if(Se=!1,t.pendingProps=r=i,(e.lanes&l)!==0)e.flags&131072&&(Se=!0);else return t.lanes=e.lanes,ft(e,t,l)}return Bi(e,t,n,r,l)}function tu(e,t,n){var r=t.pendingProps,l=r.children,i=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},q(hn,ze),ze|=n;else{if(!(n&1073741824))return e=i!==null?i.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,q(hn,ze),ze|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:n,q(hn,ze),ze|=r}else i!==null?(r=i.baseLanes|n,t.memoizedState=null):r=n,q(hn,ze),ze|=r;return ye(e,t,l,n),t.child}function nu(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Bi(e,t,n,r,l){var i=Ne(n)?qt:me.current;return i=bn(t,i),vn(t,l),n=Ia(e,t,n,r,i,l),r=Ra(),e!==null&&!Se?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,ft(e,t,l)):(Q&&r&&Sa(t),t.flags|=1,ye(e,t,n,l),t.child)}function Qo(e,t,n,r,l){if(Ne(n)){var i=!0;al(t)}else i=!1;if(vn(t,l),t.stateNode===null)qr(e,t),Yc(t,n,r),Vi(t,n,r,l),r=!0;else if(e===null){var o=t.stateNode,s=t.memoizedProps;o.props=s;var c=o.context,d=n.contextType;typeof d=="object"&&d!==null?d=Oe(d):(d=Ne(n)?qt:me.current,d=bn(t,d));var h=n.getDerivedStateFromProps,g=typeof h=="function"||typeof o.getSnapshotBeforeUpdate=="function";g||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(s!==r||c!==d)&&$o(t,o,r,d),xt=!1;var m=t.memoizedState;o.state=m,dl(t,r,o,l),c=t.memoizedState,s!==r||m!==c||je.current||xt?(typeof h=="function"&&(Hi(t,n,h,r),c=t.memoizedState),(s=xt||Vo(t,n,s,r,m,c,d))?(g||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(t.flags|=4194308)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=c),o.props=r,o.state=c,o.context=d,r=s):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{o=t.stateNode,Tc(e,t),s=t.memoizedProps,d=t.type===t.elementType?s:Be(t.type,s),o.props=d,g=t.pendingProps,m=o.context,c=n.contextType,typeof c=="object"&&c!==null?c=Oe(c):(c=Ne(n)?qt:me.current,c=bn(t,c));var x=n.getDerivedStateFromProps;(h=typeof x=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(s!==g||m!==c)&&$o(t,o,r,c),xt=!1,m=t.memoizedState,o.state=m,dl(t,r,o,l);var y=t.memoizedState;s!==g||m!==y||je.current||xt?(typeof x=="function"&&(Hi(t,n,x,r),y=t.memoizedState),(d=xt||Vo(t,n,d,r,m,y,c)||!1)?(h||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,y,c),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,y,c)),typeof o.componentDidUpdate=="function"&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||s===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=y),o.props=r,o.state=y,o.context=c,r=d):(typeof o.componentDidUpdate!="function"||s===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),r=!1)}return Gi(e,t,n,r,i,l)}function Gi(e,t,n,r,l,i){nu(e,t);var o=(t.flags&128)!==0;if(!r&&!o)return l&&Lo(t,n,!1),ft(e,t,i);r=t.stateNode,Hp.current=t;var s=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&o?(t.child=jn(t,e.child,null,i),t.child=jn(t,null,s,i)):ye(e,t,s,i),t.memoizedState=r.state,l&&Lo(t,n,!0),t.child}function ru(e){var t=e.stateNode;t.pendingContext?Ao(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Ao(e,t.context,!1),Ma(e,t.containerInfo)}function Ko(e,t,n,r,l){return Sn(),Na(l),t.flags|=256,ye(e,t,n,r),t.child}var qi={dehydrated:null,treeContext:null,retryLane:0};function Wi(e){return{baseLanes:e,cachePool:null,transitions:null}}function lu(e,t,n){var r=t.pendingProps,l=Y.current,i=!1,o=(t.flags&128)!==0,s;if((s=o)||(s=e!==null&&e.memoizedState===null?!1:(l&2)!==0),s?(i=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(l|=1),q(Y,l&1),e===null)return Fi(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(o=r.children,e=r.fallback,i?(r=t.mode,i=t.child,o={mode:"hidden",children:o},!(r&1)&&i!==null?(i.childLanes=0,i.pendingProps=o):i=Ml(o,r,0,null),e=Gt(e,r,n,null),i.return=t,e.return=t,i.sibling=e,t.child=i,t.child.memoizedState=Wi(n),t.memoizedState=qi,e):Fa(t,o));if(l=e.memoizedState,l!==null&&(s=l.dehydrated,s!==null))return Vp(e,t,o,r,s,l,n);if(i){i=r.fallback,o=t.mode,l=e.child,s=l.sibling;var c={mode:"hidden",children:r.children};return!(o&1)&&t.child!==l?(r=t.child,r.childLanes=0,r.pendingProps=c,t.deletions=null):(r=Tt(l,c),r.subtreeFlags=l.subtreeFlags&14680064),s!==null?i=Tt(s,i):(i=Gt(i,o,n,null),i.flags|=2),i.return=t,r.return=t,r.sibling=i,t.child=r,r=i,i=t.child,o=e.child.memoizedState,o=o===null?Wi(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},i.memoizedState=o,i.childLanes=e.childLanes&~n,t.memoizedState=qi,r}return i=e.child,e=i.sibling,r=Tt(i,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Fa(e,t){return t=Ml({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Lr(e,t,n,r){return r!==null&&Na(r),jn(t,e.child,null,n),e=Fa(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Vp(e,t,n,r,l,i,o){if(n)return t.flags&256?(t.flags&=-257,r=ai(Error(k(422))),Lr(e,t,o,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(i=r.fallback,l=t.mode,r=Ml({mode:"visible",children:r.children},l,0,null),i=Gt(i,l,o,null),i.flags|=2,r.return=t,i.return=t,r.sibling=i,t.child=r,t.mode&1&&jn(t,e.child,null,o),t.child.memoizedState=Wi(o),t.memoizedState=qi,i);if(!(t.mode&1))return Lr(e,t,o,null);if(l.data==="$!"){if(r=l.nextSibling&&l.nextSibling.dataset,r)var s=r.dgst;return r=s,i=Error(k(419)),r=ai(i,r,void 0),Lr(e,t,o,r)}if(s=(o&e.childLanes)!==0,Se||s){if(r=oe,r!==null){switch(o&-o){case 4:l=2;break;case 16:l=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:l=32;break;case 536870912:l=268435456;break;default:l=0}l=l&(r.suspendedLanes|o)?0:l,l!==0&&l!==i.retryLane&&(i.retryLane=l,pt(e,l),Xe(r,e,l,-1))}return Ga(),r=ai(Error(k(421))),Lr(e,t,o,r)}return l.data==="$?"?(t.flags|=128,t.child=e.child,t=tf.bind(null,e),l._reactRetry=t,null):(e=i.treeContext,Ee=Ct(l.nextSibling),Te=t,Q=!0,qe=null,e!==null&&(Ie[Re++]=ot,Ie[Re++]=st,Ie[Re++]=Wt,ot=e.id,st=e.overflow,Wt=t),t=Fa(t,r.children),t.flags|=4096,t)}function Yo(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Oi(e.return,t,n)}function oi(e,t,n,r,l){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:l}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=l)}function iu(e,t,n){var r=t.pendingProps,l=r.revealOrder,i=r.tail;if(ye(e,t,r.children,n),r=Y.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Yo(e,n,t);else if(e.tag===19)Yo(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(q(Y,r),!(t.mode&1))t.memoizedState=null;else switch(l){case"forwards":for(n=t.child,l=null;n!==null;)e=n.alternate,e!==null&&pl(e)===null&&(l=n),n=n.sibling;n=l,n===null?(l=t.child,t.child=null):(l=n.sibling,n.sibling=null),oi(t,!1,l,n,i);break;case"backwards":for(n=null,l=t.child,t.child=null;l!==null;){if(e=l.alternate,e!==null&&pl(e)===null){t.child=l;break}e=l.sibling,l.sibling=n,n=l,l=e}oi(t,!0,n,null,i);break;case"together":oi(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function qr(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function ft(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Qt|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(k(153));if(t.child!==null){for(e=t.child,n=Tt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Tt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function $p(e,t,n){switch(t.tag){case 3:ru(t),Sn();break;case 5:Mc(t);break;case 1:Ne(t.type)&&al(t);break;case 4:Ma(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,l=t.memoizedProps.value;q(cl,r._currentValue),r._currentValue=l;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(q(Y,Y.current&1),t.flags|=128,null):n&t.child.childLanes?lu(e,t,n):(q(Y,Y.current&1),e=ft(e,t,n),e!==null?e.sibling:null);q(Y,Y.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return iu(e,t,n);t.flags|=128}if(l=t.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),q(Y,Y.current),r)break;return null;case 22:case 23:return t.lanes=0,tu(e,t,n)}return ft(e,t,n)}var au,Xi,ou,su;au=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Xi=function(){};ou=function(e,t,n,r){var l=e.memoizedProps;if(l!==r){e=t.stateNode,$t(nt.current);var i=null;switch(n){case"input":l=gi(e,l),r=gi(e,r),i=[];break;case"select":l=Z({},l,{value:void 0}),r=Z({},r,{value:void 0}),i=[];break;case"textarea":l=vi(e,l),r=vi(e,r),i=[];break;default:typeof l.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=ll)}ki(n,r);var o;n=null;for(d in l)if(!r.hasOwnProperty(d)&&l.hasOwnProperty(d)&&l[d]!=null)if(d==="style"){var s=l[d];for(o in s)s.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else d!=="dangerouslySetInnerHTML"&&d!=="children"&&d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&(Zn.hasOwnProperty(d)?i||(i=[]):(i=i||[]).push(d,null));for(d in r){var c=r[d];if(s=l!=null?l[d]:void 0,r.hasOwnProperty(d)&&c!==s&&(c!=null||s!=null))if(d==="style")if(s){for(o in s)!s.hasOwnProperty(o)||c&&c.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in c)c.hasOwnProperty(o)&&s[o]!==c[o]&&(n||(n={}),n[o]=c[o])}else n||(i||(i=[]),i.push(d,n)),n=c;else d==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,s=s?s.__html:void 0,c!=null&&s!==c&&(i=i||[]).push(d,c)):d==="children"?typeof c!="string"&&typeof c!="number"||(i=i||[]).push(d,""+c):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&(Zn.hasOwnProperty(d)?(c!=null&&d==="onScroll"&&W("scroll",e),i||s===c||(i=[])):(i=i||[]).push(d,c))}n&&(i=i||[]).push("style",n);var d=i;(t.updateQueue=d)&&(t.flags|=4)}};su=function(e,t,n,r){n!==r&&(t.flags|=4)};function Un(e,t){if(!Q)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function fe(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags&14680064,r|=l.flags&14680064,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags,r|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Bp(e,t,n){var r=t.pendingProps;switch(ja(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return fe(t),null;case 1:return Ne(t.type)&&il(),fe(t),null;case 3:return r=t.stateNode,Nn(),X(je),X(me),Aa(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(_r(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,qe!==null&&(na(qe),qe=null))),Xi(e,t),fe(t),null;case 5:_a(t);var l=$t(dr.current);if(n=t.type,e!==null&&t.stateNode!=null)ou(e,t,n,r,l),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(k(166));return fe(t),null}if(e=$t(nt.current),_r(t)){r=t.stateNode,n=t.type;var i=t.memoizedProps;switch(r[et]=t,r[cr]=i,e=(t.mode&1)!==0,n){case"dialog":W("cancel",r),W("close",r);break;case"iframe":case"object":case"embed":W("load",r);break;case"video":case"audio":for(l=0;l<$n.length;l++)W($n[l],r);break;case"source":W("error",r);break;case"img":case"image":case"link":W("error",r),W("load",r);break;case"details":W("toggle",r);break;case"input":io(r,i),W("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},W("invalid",r);break;case"textarea":oo(r,i),W("invalid",r)}ki(n,i),l=null;for(var o in i)if(i.hasOwnProperty(o)){var s=i[o];o==="children"?typeof s=="string"?r.textContent!==s&&(i.suppressHydrationWarning!==!0&&Mr(r.textContent,s,e),l=["children",s]):typeof s=="number"&&r.textContent!==""+s&&(i.suppressHydrationWarning!==!0&&Mr(r.textContent,s,e),l=["children",""+s]):Zn.hasOwnProperty(o)&&s!=null&&o==="onScroll"&&W("scroll",r)}switch(n){case"input":Sr(r),ao(r,i,!0);break;case"textarea":Sr(r),so(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=ll)}r=l,t.updateQueue=r,r!==null&&(t.flags|=4)}else{o=l.nodeType===9?l:l.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Rs(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=o.createElement(n,{is:r.is}):(e=o.createElement(n),n==="select"&&(o=e,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):e=o.createElementNS(e,n),e[et]=t,e[cr]=r,au(e,t,!1,!1),t.stateNode=e;e:{switch(o=bi(n,r),n){case"dialog":W("cancel",e),W("close",e),l=r;break;case"iframe":case"object":case"embed":W("load",e),l=r;break;case"video":case"audio":for(l=0;l<$n.length;l++)W($n[l],e);l=r;break;case"source":W("error",e),l=r;break;case"img":case"image":case"link":W("error",e),W("load",e),l=r;break;case"details":W("toggle",e),l=r;break;case"input":io(e,r),l=gi(e,r),W("invalid",e);break;case"option":l=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},l=Z({},r,{value:void 0}),W("invalid",e);break;case"textarea":oo(e,r),l=vi(e,r),W("invalid",e);break;default:l=r}ki(n,l),s=l;for(i in s)if(s.hasOwnProperty(i)){var c=s[i];i==="style"?Fs(e,c):i==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&Us(e,c)):i==="children"?typeof c=="string"?(n!=="textarea"||c!=="")&&er(e,c):typeof c=="number"&&er(e,""+c):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(Zn.hasOwnProperty(i)?c!=null&&i==="onScroll"&&W("scroll",e):c!=null&&ca(e,i,c,o))}switch(n){case"input":Sr(e),ao(e,r,!1);break;case"textarea":Sr(e),so(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Mt(r.value));break;case"select":e.multiple=!!r.multiple,i=r.value,i!=null?mn(e,!!r.multiple,i,!1):r.defaultValue!=null&&mn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof l.onClick=="function"&&(e.onclick=ll)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return fe(t),null;case 6:if(e&&t.stateNode!=null)su(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(k(166));if(n=$t(dr.current),$t(nt.current),_r(t)){if(r=t.stateNode,n=t.memoizedProps,r[et]=t,(i=r.nodeValue!==n)&&(e=Te,e!==null))switch(e.tag){case 3:Mr(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Mr(r.nodeValue,n,(e.mode&1)!==0)}i&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[et]=t,t.stateNode=r}return fe(t),null;case 13:if(X(Y),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(Q&&Ee!==null&&t.mode&1&&!(t.flags&128))Cc(),Sn(),t.flags|=98560,i=!1;else if(i=_r(t),r!==null&&r.dehydrated!==null){if(e===null){if(!i)throw Error(k(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(k(317));i[et]=t}else Sn(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;fe(t),i=!1}else qe!==null&&(na(qe),qe=null),i=!0;if(!i)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||Y.current&1?le===0&&(le=3):Ga())),t.updateQueue!==null&&(t.flags|=4),fe(t),null);case 4:return Nn(),Xi(e,t),e===null&&or(t.stateNode.containerInfo),fe(t),null;case 10:return za(t.type._context),fe(t),null;case 17:return Ne(t.type)&&il(),fe(t),null;case 19:if(X(Y),i=t.memoizedState,i===null)return fe(t),null;if(r=(t.flags&128)!==0,o=i.rendering,o===null)if(r)Un(i,!1);else{if(le!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=pl(e),o!==null){for(t.flags|=128,Un(i,!1),r=o.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)i=n,e=r,i.flags&=14680066,o=i.alternate,o===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=o.childLanes,i.lanes=o.lanes,i.child=o.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=o.memoizedProps,i.memoizedState=o.memoizedState,i.updateQueue=o.updateQueue,i.type=o.type,e=o.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return q(Y,Y.current&1|2),t.child}e=e.sibling}i.tail!==null&&te()>Pn&&(t.flags|=128,r=!0,Un(i,!1),t.lanes=4194304)}else{if(!r)if(e=pl(o),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Un(i,!0),i.tail===null&&i.tailMode==="hidden"&&!o.alternate&&!Q)return fe(t),null}else 2*te()-i.renderingStartTime>Pn&&n!==1073741824&&(t.flags|=128,r=!0,Un(i,!1),t.lanes=4194304);i.isBackwards?(o.sibling=t.child,t.child=o):(n=i.last,n!==null?n.sibling=o:t.child=o,i.last=o)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=te(),t.sibling=null,n=Y.current,q(Y,r?n&1|2:n&1),t):(fe(t),null);case 22:case 23:return Ba(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?ze&1073741824&&(fe(t),t.subtreeFlags&6&&(t.flags|=8192)):fe(t),null;case 24:return null;case 25:return null}throw Error(k(156,t.tag))}function Gp(e,t){switch(ja(t),t.tag){case 1:return Ne(t.type)&&il(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Nn(),X(je),X(me),Aa(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return _a(t),null;case 13:if(X(Y),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(k(340));Sn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return X(Y),null;case 4:return Nn(),null;case 10:return za(t.type._context),null;case 22:case 23:return Ba(),null;case 24:return null;default:return null}}var Ir=!1,he=!1,qp=typeof WeakSet=="function"?WeakSet:Set,E=null;function fn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){ee(e,t,r)}else n.current=null}function Qi(e,t,n){try{n()}catch(r){ee(e,t,r)}}var Jo=!1;function Wp(e,t){if(_i=tl,e=fc(),ba(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var l=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var o=0,s=-1,c=-1,d=0,h=0,g=e,m=null;t:for(;;){for(var x;g!==n||l!==0&&g.nodeType!==3||(s=o+l),g!==i||r!==0&&g.nodeType!==3||(c=o+r),g.nodeType===3&&(o+=g.nodeValue.length),(x=g.firstChild)!==null;)m=g,g=x;for(;;){if(g===e)break t;if(m===n&&++d===l&&(s=o),m===i&&++h===r&&(c=o),(x=g.nextSibling)!==null)break;g=m,m=g.parentNode}g=x}n=s===-1||c===-1?null:{start:s,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(Ai={focusedElem:e,selectionRange:n},tl=!1,E=t;E!==null;)if(t=E,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,E=e;else for(;E!==null;){t=E;try{var y=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(y!==null){var w=y.memoizedProps,U=y.memoizedState,f=t.stateNode,u=f.getSnapshotBeforeUpdate(t.elementType===t.type?w:Be(t.type,w),U);f.__reactInternalSnapshotBeforeUpdate=u}break;case 3:var p=t.stateNode.containerInfo;p.nodeType===1?p.textContent="":p.nodeType===9&&p.documentElement&&p.removeChild(p.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(k(163))}}catch(v){ee(t,t.return,v)}if(e=t.sibling,e!==null){e.return=t.return,E=e;break}E=t.return}return y=Jo,Jo=!1,y}function Kn(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var l=r=r.next;do{if((l.tag&e)===e){var i=l.destroy;l.destroy=void 0,i!==void 0&&Qi(t,n,i)}l=l.next}while(l!==r)}}function El(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Ki(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function cu(e){var t=e.alternate;t!==null&&(e.alternate=null,cu(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[et],delete t[cr],delete t[Ri],delete t[Ep],delete t[Tp])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function uu(e){return e.tag===5||e.tag===3||e.tag===4}function Zo(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||uu(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Yi(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=ll));else if(r!==4&&(e=e.child,e!==null))for(Yi(e,t,n),e=e.sibling;e!==null;)Yi(e,t,n),e=e.sibling}function Ji(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Ji(e,t,n),e=e.sibling;e!==null;)Ji(e,t,n),e=e.sibling}var se=null,Ge=!1;function gt(e,t,n){for(n=n.child;n!==null;)du(e,t,n),n=n.sibling}function du(e,t,n){if(tt&&typeof tt.onCommitFiberUnmount=="function")try{tt.onCommitFiberUnmount(kl,n)}catch{}switch(n.tag){case 5:he||fn(n,t);case 6:var r=se,l=Ge;se=null,gt(e,t,n),se=r,Ge=l,se!==null&&(Ge?(e=se,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):se.removeChild(n.stateNode));break;case 18:se!==null&&(Ge?(e=se,n=n.stateNode,e.nodeType===8?ei(e.parentNode,n):e.nodeType===1&&ei(e,n),lr(e)):ei(se,n.stateNode));break;case 4:r=se,l=Ge,se=n.stateNode.containerInfo,Ge=!0,gt(e,t,n),se=r,Ge=l;break;case 0:case 11:case 14:case 15:if(!he&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){l=r=r.next;do{var i=l,o=i.destroy;i=i.tag,o!==void 0&&(i&2||i&4)&&Qi(n,t,o),l=l.next}while(l!==r)}gt(e,t,n);break;case 1:if(!he&&(fn(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(s){ee(n,t,s)}gt(e,t,n);break;case 21:gt(e,t,n);break;case 22:n.mode&1?(he=(r=he)||n.memoizedState!==null,gt(e,t,n),he=r):gt(e,t,n);break;default:gt(e,t,n)}}function es(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new qp),t.forEach(function(r){var l=nf.bind(null,e,r);n.has(r)||(n.add(r),r.then(l,l))})}}function $e(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var l=n[r];try{var i=e,o=t,s=o;e:for(;s!==null;){switch(s.tag){case 5:se=s.stateNode,Ge=!1;break e;case 3:se=s.stateNode.containerInfo,Ge=!0;break e;case 4:se=s.stateNode.containerInfo,Ge=!0;break e}s=s.return}if(se===null)throw Error(k(160));du(i,o,l),se=null,Ge=!1;var c=l.alternate;c!==null&&(c.return=null),l.return=null}catch(d){ee(l,t,d)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)pu(t,e),t=t.sibling}function pu(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if($e(t,e),Ye(e),r&4){try{Kn(3,e,e.return),El(3,e)}catch(w){ee(e,e.return,w)}try{Kn(5,e,e.return)}catch(w){ee(e,e.return,w)}}break;case 1:$e(t,e),Ye(e),r&512&&n!==null&&fn(n,n.return);break;case 5:if($e(t,e),Ye(e),r&512&&n!==null&&fn(n,n.return),e.flags&32){var l=e.stateNode;try{er(l,"")}catch(w){ee(e,e.return,w)}}if(r&4&&(l=e.stateNode,l!=null)){var i=e.memoizedProps,o=n!==null?n.memoizedProps:i,s=e.type,c=e.updateQueue;if(e.updateQueue=null,c!==null)try{s==="input"&&i.type==="radio"&&i.name!=null&&Ls(l,i),bi(s,o);var d=bi(s,i);for(o=0;o<c.length;o+=2){var h=c[o],g=c[o+1];h==="style"?Fs(l,g):h==="dangerouslySetInnerHTML"?Us(l,g):h==="children"?er(l,g):ca(l,h,g,d)}switch(s){case"input":yi(l,i);break;case"textarea":Is(l,i);break;case"select":var m=l._wrapperState.wasMultiple;l._wrapperState.wasMultiple=!!i.multiple;var x=i.value;x!=null?mn(l,!!i.multiple,x,!1):m!==!!i.multiple&&(i.defaultValue!=null?mn(l,!!i.multiple,i.defaultValue,!0):mn(l,!!i.multiple,i.multiple?[]:"",!1))}l[cr]=i}catch(w){ee(e,e.return,w)}}break;case 6:if($e(t,e),Ye(e),r&4){if(e.stateNode===null)throw Error(k(162));l=e.stateNode,i=e.memoizedProps;try{l.nodeValue=i}catch(w){ee(e,e.return,w)}}break;case 3:if($e(t,e),Ye(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{lr(t.containerInfo)}catch(w){ee(e,e.return,w)}break;case 4:$e(t,e),Ye(e);break;case 13:$e(t,e),Ye(e),l=e.child,l.flags&8192&&(i=l.memoizedState!==null,l.stateNode.isHidden=i,!i||l.alternate!==null&&l.alternate.memoizedState!==null||(Va=te())),r&4&&es(e);break;case 22:if(h=n!==null&&n.memoizedState!==null,e.mode&1?(he=(d=he)||h,$e(t,e),he=d):$e(t,e),Ye(e),r&8192){if(d=e.memoizedState!==null,(e.stateNode.isHidden=d)&&!h&&e.mode&1)for(E=e,h=e.child;h!==null;){for(g=E=h;E!==null;){switch(m=E,x=m.child,m.tag){case 0:case 11:case 14:case 15:Kn(4,m,m.return);break;case 1:fn(m,m.return);var y=m.stateNode;if(typeof y.componentWillUnmount=="function"){r=m,n=m.return;try{t=r,y.props=t.memoizedProps,y.state=t.memoizedState,y.componentWillUnmount()}catch(w){ee(r,n,w)}}break;case 5:fn(m,m.return);break;case 22:if(m.memoizedState!==null){ns(g);continue}}x!==null?(x.return=m,E=x):ns(g)}h=h.sibling}e:for(h=null,g=e;;){if(g.tag===5){if(h===null){h=g;try{l=g.stateNode,d?(i=l.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(s=g.stateNode,c=g.memoizedProps.style,o=c!=null&&c.hasOwnProperty("display")?c.display:null,s.style.display=Ds("display",o))}catch(w){ee(e,e.return,w)}}}else if(g.tag===6){if(h===null)try{g.stateNode.nodeValue=d?"":g.memoizedProps}catch(w){ee(e,e.return,w)}}else if((g.tag!==22&&g.tag!==23||g.memoizedState===null||g===e)&&g.child!==null){g.child.return=g,g=g.child;continue}if(g===e)break e;for(;g.sibling===null;){if(g.return===null||g.return===e)break e;h===g&&(h=null),g=g.return}h===g&&(h=null),g.sibling.return=g.return,g=g.sibling}}break;case 19:$e(t,e),Ye(e),r&4&&es(e);break;case 21:break;default:$e(t,e),Ye(e)}}function Ye(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(uu(n)){var r=n;break e}n=n.return}throw Error(k(160))}switch(r.tag){case 5:var l=r.stateNode;r.flags&32&&(er(l,""),r.flags&=-33);var i=Zo(e);Ji(e,i,l);break;case 3:case 4:var o=r.stateNode.containerInfo,s=Zo(e);Yi(e,s,o);break;default:throw Error(k(161))}}catch(c){ee(e,e.return,c)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Xp(e,t,n){E=e,fu(e)}function fu(e,t,n){for(var r=(e.mode&1)!==0;E!==null;){var l=E,i=l.child;if(l.tag===22&&r){var o=l.memoizedState!==null||Ir;if(!o){var s=l.alternate,c=s!==null&&s.memoizedState!==null||he;s=Ir;var d=he;if(Ir=o,(he=c)&&!d)for(E=l;E!==null;)o=E,c=o.child,o.tag===22&&o.memoizedState!==null?rs(l):c!==null?(c.return=o,E=c):rs(l);for(;i!==null;)E=i,fu(i),i=i.sibling;E=l,Ir=s,he=d}ts(e)}else l.subtreeFlags&8772&&i!==null?(i.return=l,E=i):ts(e)}}function ts(e){for(;E!==null;){var t=E;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:he||El(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!he)if(n===null)r.componentDidMount();else{var l=t.elementType===t.type?n.memoizedProps:Be(t.type,n.memoizedProps);r.componentDidUpdate(l,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=t.updateQueue;i!==null&&Fo(t,i,r);break;case 3:var o=t.updateQueue;if(o!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Fo(t,o,n)}break;case 5:var s=t.stateNode;if(n===null&&t.flags&4){n=s;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var d=t.alternate;if(d!==null){var h=d.memoizedState;if(h!==null){var g=h.dehydrated;g!==null&&lr(g)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(k(163))}he||t.flags&512&&Ki(t)}catch(m){ee(t,t.return,m)}}if(t===e){E=null;break}if(n=t.sibling,n!==null){n.return=t.return,E=n;break}E=t.return}}function ns(e){for(;E!==null;){var t=E;if(t===e){E=null;break}var n=t.sibling;if(n!==null){n.return=t.return,E=n;break}E=t.return}}function rs(e){for(;E!==null;){var t=E;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{El(4,t)}catch(c){ee(t,n,c)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var l=t.return;try{r.componentDidMount()}catch(c){ee(t,l,c)}}var i=t.return;try{Ki(t)}catch(c){ee(t,i,c)}break;case 5:var o=t.return;try{Ki(t)}catch(c){ee(t,o,c)}}}catch(c){ee(t,t.return,c)}if(t===e){E=null;break}var s=t.sibling;if(s!==null){s.return=t.return,E=s;break}E=t.return}}var Qp=Math.ceil,ml=ht.ReactCurrentDispatcher,Oa=ht.ReactCurrentOwner,Fe=ht.ReactCurrentBatchConfig,V=0,oe=null,ne=null,ce=0,ze=0,hn=Lt(0),le=0,mr=null,Qt=0,Tl=0,Ha=0,Yn=null,be=null,Va=0,Pn=1/0,it=null,gl=!1,Zi=null,zt=null,Rr=!1,bt=null,yl=0,Jn=0,ea=null,Wr=-1,Xr=0;function xe(){return V&6?te():Wr!==-1?Wr:Wr=te()}function Et(e){return e.mode&1?V&2&&ce!==0?ce&-ce:_p.transition!==null?(Xr===0&&(Xr=Ys()),Xr):(e=B,e!==0||(e=window.event,e=e===void 0?16:lc(e.type)),e):1}function Xe(e,t,n,r){if(50<Jn)throw Jn=0,ea=null,Error(k(185));yr(e,n,r),(!(V&2)||e!==oe)&&(e===oe&&(!(V&2)&&(Tl|=n),le===4&&wt(e,ce)),Ce(e,r),n===1&&V===0&&!(t.mode&1)&&(Pn=te()+500,Cl&&It()))}function Ce(e,t){var n=e.callbackNode;_d(e,t);var r=el(e,e===oe?ce:0);if(r===0)n!==null&&po(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&po(n),t===1)e.tag===0?Mp(ls.bind(null,e)):Sc(ls.bind(null,e)),Pp(function(){!(V&6)&&It()}),n=null;else{switch(Js(r)){case 1:n=ha;break;case 4:n=Qs;break;case 16:n=Zr;break;case 536870912:n=Ks;break;default:n=Zr}n=ku(n,hu.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function hu(e,t){if(Wr=-1,Xr=0,V&6)throw Error(k(327));var n=e.callbackNode;if(wn()&&e.callbackNode!==n)return null;var r=el(e,e===oe?ce:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=xl(e,r);else{t=r;var l=V;V|=2;var i=gu();(oe!==e||ce!==t)&&(it=null,Pn=te()+500,Bt(e,t));do try{Jp();break}catch(s){mu(e,s)}while(!0);Pa(),ml.current=i,V=l,ne!==null?t=0:(oe=null,ce=0,t=le)}if(t!==0){if(t===2&&(l=Pi(e),l!==0&&(r=l,t=ta(e,l))),t===1)throw n=mr,Bt(e,0),wt(e,r),Ce(e,te()),n;if(t===6)wt(e,r);else{if(l=e.current.alternate,!(r&30)&&!Kp(l)&&(t=xl(e,r),t===2&&(i=Pi(e),i!==0&&(r=i,t=ta(e,i))),t===1))throw n=mr,Bt(e,0),wt(e,r),Ce(e,te()),n;switch(e.finishedWork=l,e.finishedLanes=r,t){case 0:case 1:throw Error(k(345));case 2:Ot(e,be,it);break;case 3:if(wt(e,r),(r&130023424)===r&&(t=Va+500-te(),10<t)){if(el(e,0)!==0)break;if(l=e.suspendedLanes,(l&r)!==r){xe(),e.pingedLanes|=e.suspendedLanes&l;break}e.timeoutHandle=Ii(Ot.bind(null,e,be,it),t);break}Ot(e,be,it);break;case 4:if(wt(e,r),(r&4194240)===r)break;for(t=e.eventTimes,l=-1;0<r;){var o=31-We(r);i=1<<o,o=t[o],o>l&&(l=o),r&=~i}if(r=l,r=te()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Qp(r/1960))-r,10<r){e.timeoutHandle=Ii(Ot.bind(null,e,be,it),r);break}Ot(e,be,it);break;case 5:Ot(e,be,it);break;default:throw Error(k(329))}}}return Ce(e,te()),e.callbackNode===n?hu.bind(null,e):null}function ta(e,t){var n=Yn;return e.current.memoizedState.isDehydrated&&(Bt(e,t).flags|=256),e=xl(e,t),e!==2&&(t=be,be=n,t!==null&&na(t)),e}function na(e){be===null?be=e:be.push.apply(be,e)}function Kp(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var l=n[r],i=l.getSnapshot;l=l.value;try{if(!Qe(i(),l))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function wt(e,t){for(t&=~Ha,t&=~Tl,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-We(t),r=1<<n;e[n]=-1,t&=~r}}function ls(e){if(V&6)throw Error(k(327));wn();var t=el(e,0);if(!(t&1))return Ce(e,te()),null;var n=xl(e,t);if(e.tag!==0&&n===2){var r=Pi(e);r!==0&&(t=r,n=ta(e,r))}if(n===1)throw n=mr,Bt(e,0),wt(e,t),Ce(e,te()),n;if(n===6)throw Error(k(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Ot(e,be,it),Ce(e,te()),null}function $a(e,t){var n=V;V|=1;try{return e(t)}finally{V=n,V===0&&(Pn=te()+500,Cl&&It())}}function Kt(e){bt!==null&&bt.tag===0&&!(V&6)&&wn();var t=V;V|=1;var n=Fe.transition,r=B;try{if(Fe.transition=null,B=1,e)return e()}finally{B=r,Fe.transition=n,V=t,!(V&6)&&It()}}function Ba(){ze=hn.current,X(hn)}function Bt(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Cp(n)),ne!==null)for(n=ne.return;n!==null;){var r=n;switch(ja(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&il();break;case 3:Nn(),X(je),X(me),Aa();break;case 5:_a(r);break;case 4:Nn();break;case 13:X(Y);break;case 19:X(Y);break;case 10:za(r.type._context);break;case 22:case 23:Ba()}n=n.return}if(oe=e,ne=e=Tt(e.current,null),ce=ze=t,le=0,mr=null,Ha=Tl=Qt=0,be=Yn=null,Vt!==null){for(t=0;t<Vt.length;t++)if(n=Vt[t],r=n.interleaved,r!==null){n.interleaved=null;var l=r.next,i=n.pending;if(i!==null){var o=i.next;i.next=l,r.next=o}n.pending=r}Vt=null}return e}function mu(e,t){do{var n=ne;try{if(Pa(),Br.current=hl,fl){for(var r=J.memoizedState;r!==null;){var l=r.queue;l!==null&&(l.pending=null),r=r.next}fl=!1}if(Xt=0,ae=re=J=null,Qn=!1,pr=0,Oa.current=null,n===null||n.return===null){le=1,mr=t,ne=null;break}e:{var i=e,o=n.return,s=n,c=t;if(t=ce,s.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var d=c,h=s,g=h.tag;if(!(h.mode&1)&&(g===0||g===11||g===15)){var m=h.alternate;m?(h.updateQueue=m.updateQueue,h.memoizedState=m.memoizedState,h.lanes=m.lanes):(h.updateQueue=null,h.memoizedState=null)}var x=Go(o);if(x!==null){x.flags&=-257,qo(x,o,s,i,t),x.mode&1&&Bo(i,d,t),t=x,c=d;var y=t.updateQueue;if(y===null){var w=new Set;w.add(c),t.updateQueue=w}else y.add(c);break e}else{if(!(t&1)){Bo(i,d,t),Ga();break e}c=Error(k(426))}}else if(Q&&s.mode&1){var U=Go(o);if(U!==null){!(U.flags&65536)&&(U.flags|=256),qo(U,o,s,i,t),Na(Cn(c,s));break e}}i=c=Cn(c,s),le!==4&&(le=2),Yn===null?Yn=[i]:Yn.push(i),i=o;do{switch(i.tag){case 3:i.flags|=65536,t&=-t,i.lanes|=t;var f=Jc(i,c,t);Do(i,f);break e;case 1:s=c;var u=i.type,p=i.stateNode;if(!(i.flags&128)&&(typeof u.getDerivedStateFromError=="function"||p!==null&&typeof p.componentDidCatch=="function"&&(zt===null||!zt.has(p)))){i.flags|=65536,t&=-t,i.lanes|=t;var v=Zc(i,s,t);Do(i,v);break e}}i=i.return}while(i!==null)}xu(n)}catch(S){t=S,ne===n&&n!==null&&(ne=n=n.return);continue}break}while(!0)}function gu(){var e=ml.current;return ml.current=hl,e===null?hl:e}function Ga(){(le===0||le===3||le===2)&&(le=4),oe===null||!(Qt&268435455)&&!(Tl&268435455)||wt(oe,ce)}function xl(e,t){var n=V;V|=2;var r=gu();(oe!==e||ce!==t)&&(it=null,Bt(e,t));do try{Yp();break}catch(l){mu(e,l)}while(!0);if(Pa(),V=n,ml.current=r,ne!==null)throw Error(k(261));return oe=null,ce=0,le}function Yp(){for(;ne!==null;)yu(ne)}function Jp(){for(;ne!==null&&!Sd();)yu(ne)}function yu(e){var t=wu(e.alternate,e,ze);e.memoizedProps=e.pendingProps,t===null?xu(e):ne=t,Oa.current=null}function xu(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=Gp(n,t),n!==null){n.flags&=32767,ne=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{le=6,ne=null;return}}else if(n=Bp(n,t,ze),n!==null){ne=n;return}if(t=t.sibling,t!==null){ne=t;return}ne=t=e}while(t!==null);le===0&&(le=5)}function Ot(e,t,n){var r=B,l=Fe.transition;try{Fe.transition=null,B=1,Zp(e,t,n,r)}finally{Fe.transition=l,B=r}return null}function Zp(e,t,n,r){do wn();while(bt!==null);if(V&6)throw Error(k(327));n=e.finishedWork;var l=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(k(177));e.callbackNode=null,e.callbackPriority=0;var i=n.lanes|n.childLanes;if(Ad(e,i),e===oe&&(ne=oe=null,ce=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Rr||(Rr=!0,ku(Zr,function(){return wn(),null})),i=(n.flags&15990)!==0,n.subtreeFlags&15990||i){i=Fe.transition,Fe.transition=null;var o=B;B=1;var s=V;V|=4,Oa.current=null,Wp(e,n),pu(n,e),vp(Ai),tl=!!_i,Ai=_i=null,e.current=n,Xp(n),jd(),V=s,B=o,Fe.transition=i}else e.current=n;if(Rr&&(Rr=!1,bt=e,yl=l),i=e.pendingLanes,i===0&&(zt=null),Pd(n.stateNode),Ce(e,te()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)l=t[n],r(l.value,{componentStack:l.stack,digest:l.digest});if(gl)throw gl=!1,e=Zi,Zi=null,e;return yl&1&&e.tag!==0&&wn(),i=e.pendingLanes,i&1?e===ea?Jn++:(Jn=0,ea=e):Jn=0,It(),null}function wn(){if(bt!==null){var e=Js(yl),t=Fe.transition,n=B;try{if(Fe.transition=null,B=16>e?16:e,bt===null)var r=!1;else{if(e=bt,bt=null,yl=0,V&6)throw Error(k(331));var l=V;for(V|=4,E=e.current;E!==null;){var i=E,o=i.child;if(E.flags&16){var s=i.deletions;if(s!==null){for(var c=0;c<s.length;c++){var d=s[c];for(E=d;E!==null;){var h=E;switch(h.tag){case 0:case 11:case 15:Kn(8,h,i)}var g=h.child;if(g!==null)g.return=h,E=g;else for(;E!==null;){h=E;var m=h.sibling,x=h.return;if(cu(h),h===d){E=null;break}if(m!==null){m.return=x,E=m;break}E=x}}}var y=i.alternate;if(y!==null){var w=y.child;if(w!==null){y.child=null;do{var U=w.sibling;w.sibling=null,w=U}while(w!==null)}}E=i}}if(i.subtreeFlags&2064&&o!==null)o.return=i,E=o;else e:for(;E!==null;){if(i=E,i.flags&2048)switch(i.tag){case 0:case 11:case 15:Kn(9,i,i.return)}var f=i.sibling;if(f!==null){f.return=i.return,E=f;break e}E=i.return}}var u=e.current;for(E=u;E!==null;){o=E;var p=o.child;if(o.subtreeFlags&2064&&p!==null)p.return=o,E=p;else e:for(o=u;E!==null;){if(s=E,s.flags&2048)try{switch(s.tag){case 0:case 11:case 15:El(9,s)}}catch(S){ee(s,s.return,S)}if(s===o){E=null;break e}var v=s.sibling;if(v!==null){v.return=s.return,E=v;break e}E=s.return}}if(V=l,It(),tt&&typeof tt.onPostCommitFiberRoot=="function")try{tt.onPostCommitFiberRoot(kl,e)}catch{}r=!0}return r}finally{B=n,Fe.transition=t}}return!1}function is(e,t,n){t=Cn(n,t),t=Jc(e,t,1),e=Pt(e,t,1),t=xe(),e!==null&&(yr(e,1,t),Ce(e,t))}function ee(e,t,n){if(e.tag===3)is(e,e,n);else for(;t!==null;){if(t.tag===3){is(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(zt===null||!zt.has(r))){e=Cn(n,e),e=Zc(t,e,1),t=Pt(t,e,1),e=xe(),t!==null&&(yr(t,1,e),Ce(t,e));break}}t=t.return}}function ef(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=xe(),e.pingedLanes|=e.suspendedLanes&n,oe===e&&(ce&n)===n&&(le===4||le===3&&(ce&130023424)===ce&&500>te()-Va?Bt(e,0):Ha|=n),Ce(e,t)}function vu(e,t){t===0&&(e.mode&1?(t=Cr,Cr<<=1,!(Cr&130023424)&&(Cr=4194304)):t=1);var n=xe();e=pt(e,t),e!==null&&(yr(e,t,n),Ce(e,n))}function tf(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),vu(e,n)}function nf(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,l=e.memoizedState;l!==null&&(n=l.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(k(314))}r!==null&&r.delete(t),vu(e,n)}var wu;wu=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||je.current)Se=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return Se=!1,$p(e,t,n);Se=!!(e.flags&131072)}else Se=!1,Q&&t.flags&1048576&&jc(t,sl,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;qr(e,t),e=t.pendingProps;var l=bn(t,me.current);vn(t,n),l=Ia(null,t,r,e,l,n);var i=Ra();return t.flags|=1,typeof l=="object"&&l!==null&&typeof l.render=="function"&&l.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Ne(r)?(i=!0,al(t)):i=!1,t.memoizedState=l.state!==null&&l.state!==void 0?l.state:null,Ta(t),l.updater=zl,t.stateNode=l,l._reactInternals=t,Vi(t,r,e,n),t=Gi(null,t,r,!0,i,n)):(t.tag=0,Q&&i&&Sa(t),ye(null,t,l,n),t=t.child),t;case 16:r=t.elementType;e:{switch(qr(e,t),e=t.pendingProps,l=r._init,r=l(r._payload),t.type=r,l=t.tag=lf(r),e=Be(r,e),l){case 0:t=Bi(null,t,r,e,n);break e;case 1:t=Qo(null,t,r,e,n);break e;case 11:t=Wo(null,t,r,e,n);break e;case 14:t=Xo(null,t,r,Be(r.type,e),n);break e}throw Error(k(306,r,""))}return t;case 0:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Be(r,l),Bi(e,t,r,l,n);case 1:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Be(r,l),Qo(e,t,r,l,n);case 3:e:{if(ru(t),e===null)throw Error(k(387));r=t.pendingProps,i=t.memoizedState,l=i.element,Tc(e,t),dl(t,r,null,n);var o=t.memoizedState;if(r=o.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){l=Cn(Error(k(423)),t),t=Ko(e,t,r,n,l);break e}else if(r!==l){l=Cn(Error(k(424)),t),t=Ko(e,t,r,n,l);break e}else for(Ee=Ct(t.stateNode.containerInfo.firstChild),Te=t,Q=!0,qe=null,n=zc(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Sn(),r===l){t=ft(e,t,n);break e}ye(e,t,r,n)}t=t.child}return t;case 5:return Mc(t),e===null&&Fi(t),r=t.type,l=t.pendingProps,i=e!==null?e.memoizedProps:null,o=l.children,Li(r,l)?o=null:i!==null&&Li(r,i)&&(t.flags|=32),nu(e,t),ye(e,t,o,n),t.child;case 6:return e===null&&Fi(t),null;case 13:return lu(e,t,n);case 4:return Ma(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=jn(t,null,r,n):ye(e,t,r,n),t.child;case 11:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Be(r,l),Wo(e,t,r,l,n);case 7:return ye(e,t,t.pendingProps,n),t.child;case 8:return ye(e,t,t.pendingProps.children,n),t.child;case 12:return ye(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,l=t.pendingProps,i=t.memoizedProps,o=l.value,q(cl,r._currentValue),r._currentValue=o,i!==null)if(Qe(i.value,o)){if(i.children===l.children&&!je.current){t=ft(e,t,n);break e}}else for(i=t.child,i!==null&&(i.return=t);i!==null;){var s=i.dependencies;if(s!==null){o=i.child;for(var c=s.firstContext;c!==null;){if(c.context===r){if(i.tag===1){c=ct(-1,n&-n),c.tag=2;var d=i.updateQueue;if(d!==null){d=d.shared;var h=d.pending;h===null?c.next=c:(c.next=h.next,h.next=c),d.pending=c}}i.lanes|=n,c=i.alternate,c!==null&&(c.lanes|=n),Oi(i.return,n,t),s.lanes|=n;break}c=c.next}}else if(i.tag===10)o=i.type===t.type?null:i.child;else if(i.tag===18){if(o=i.return,o===null)throw Error(k(341));o.lanes|=n,s=o.alternate,s!==null&&(s.lanes|=n),Oi(o,n,t),o=i.sibling}else o=i.child;if(o!==null)o.return=i;else for(o=i;o!==null;){if(o===t){o=null;break}if(i=o.sibling,i!==null){i.return=o.return,o=i;break}o=o.return}i=o}ye(e,t,l.children,n),t=t.child}return t;case 9:return l=t.type,r=t.pendingProps.children,vn(t,n),l=Oe(l),r=r(l),t.flags|=1,ye(e,t,r,n),t.child;case 14:return r=t.type,l=Be(r,t.pendingProps),l=Be(r.type,l),Xo(e,t,r,l,n);case 15:return eu(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Be(r,l),qr(e,t),t.tag=1,Ne(r)?(e=!0,al(t)):e=!1,vn(t,n),Yc(t,r,l),Vi(t,r,l,n),Gi(null,t,r,!0,e,n);case 19:return iu(e,t,n);case 22:return tu(e,t,n)}throw Error(k(156,t.tag))};function ku(e,t){return Xs(e,t)}function rf(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function De(e,t,n,r){return new rf(e,t,n,r)}function qa(e){return e=e.prototype,!(!e||!e.isReactComponent)}function lf(e){if(typeof e=="function")return qa(e)?1:0;if(e!=null){if(e=e.$$typeof,e===da)return 11;if(e===pa)return 14}return 2}function Tt(e,t){var n=e.alternate;return n===null?(n=De(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Qr(e,t,n,r,l,i){var o=2;if(r=e,typeof e=="function")qa(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case rn:return Gt(n.children,l,i,t);case ua:o=8,l|=8;break;case pi:return e=De(12,n,t,l|2),e.elementType=pi,e.lanes=i,e;case fi:return e=De(13,n,t,l),e.elementType=fi,e.lanes=i,e;case hi:return e=De(19,n,t,l),e.elementType=hi,e.lanes=i,e;case Ms:return Ml(n,l,i,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Es:o=10;break e;case Ts:o=9;break e;case da:o=11;break e;case pa:o=14;break e;case yt:o=16,r=null;break e}throw Error(k(130,e==null?e:typeof e,""))}return t=De(o,n,t,l),t.elementType=e,t.type=r,t.lanes=i,t}function Gt(e,t,n,r){return e=De(7,e,r,t),e.lanes=n,e}function Ml(e,t,n,r){return e=De(22,e,r,t),e.elementType=Ms,e.lanes=n,e.stateNode={isHidden:!1},e}function si(e,t,n){return e=De(6,e,null,t),e.lanes=n,e}function ci(e,t,n){return t=De(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function af(e,t,n,r,l){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=$l(0),this.expirationTimes=$l(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=$l(0),this.identifierPrefix=r,this.onRecoverableError=l,this.mutableSourceEagerHydrationData=null}function Wa(e,t,n,r,l,i,o,s,c){return e=new af(e,t,n,s,c),t===1?(t=1,i===!0&&(t|=8)):t=0,i=De(3,null,null,t),e.current=i,i.stateNode=e,i.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Ta(i),e}function of(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:nn,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function bu(e){if(!e)return _t;e=e._reactInternals;e:{if(Jt(e)!==e||e.tag!==1)throw Error(k(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Ne(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(k(171))}if(e.tag===1){var n=e.type;if(Ne(n))return bc(e,n,t)}return t}function Su(e,t,n,r,l,i,o,s,c){return e=Wa(n,r,!0,e,l,i,o,s,c),e.context=bu(null),n=e.current,r=xe(),l=Et(n),i=ct(r,l),i.callback=t??null,Pt(n,i,l),e.current.lanes=l,yr(e,l,r),Ce(e,r),e}function _l(e,t,n,r){var l=t.current,i=xe(),o=Et(l);return n=bu(n),t.context===null?t.context=n:t.pendingContext=n,t=ct(i,o),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=Pt(l,t,o),e!==null&&(Xe(e,l,o,i),$r(e,l,o)),o}function vl(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function as(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Xa(e,t){as(e,t),(e=e.alternate)&&as(e,t)}function sf(){return null}var ju=typeof reportError=="function"?reportError:function(e){console.error(e)};function Qa(e){this._internalRoot=e}Al.prototype.render=Qa.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(k(409));_l(e,t,null,null)};Al.prototype.unmount=Qa.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Kt(function(){_l(null,e,null,null)}),t[dt]=null}};function Al(e){this._internalRoot=e}Al.prototype.unstable_scheduleHydration=function(e){if(e){var t=tc();e={blockedOn:null,target:e,priority:t};for(var n=0;n<vt.length&&t!==0&&t<vt[n].priority;n++);vt.splice(n,0,e),n===0&&rc(e)}};function Ka(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Ll(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function os(){}function cf(e,t,n,r,l){if(l){if(typeof r=="function"){var i=r;r=function(){var d=vl(o);i.call(d)}}var o=Su(t,r,e,0,null,!1,!1,"",os);return e._reactRootContainer=o,e[dt]=o.current,or(e.nodeType===8?e.parentNode:e),Kt(),o}for(;l=e.lastChild;)e.removeChild(l);if(typeof r=="function"){var s=r;r=function(){var d=vl(c);s.call(d)}}var c=Wa(e,0,!1,null,null,!1,!1,"",os);return e._reactRootContainer=c,e[dt]=c.current,or(e.nodeType===8?e.parentNode:e),Kt(function(){_l(t,c,n,r)}),c}function Il(e,t,n,r,l){var i=n._reactRootContainer;if(i){var o=i;if(typeof l=="function"){var s=l;l=function(){var c=vl(o);s.call(c)}}_l(t,o,e,l)}else o=cf(n,t,e,l,r);return vl(o)}Zs=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Vn(t.pendingLanes);n!==0&&(ma(t,n|1),Ce(t,te()),!(V&6)&&(Pn=te()+500,It()))}break;case 13:Kt(function(){var r=pt(e,1);if(r!==null){var l=xe();Xe(r,e,1,l)}}),Xa(e,1)}};ga=function(e){if(e.tag===13){var t=pt(e,134217728);if(t!==null){var n=xe();Xe(t,e,134217728,n)}Xa(e,134217728)}};ec=function(e){if(e.tag===13){var t=Et(e),n=pt(e,t);if(n!==null){var r=xe();Xe(n,e,t,r)}Xa(e,t)}};tc=function(){return B};nc=function(e,t){var n=B;try{return B=e,t()}finally{B=n}};ji=function(e,t,n){switch(t){case"input":if(yi(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var l=Nl(r);if(!l)throw Error(k(90));As(r),yi(r,l)}}}break;case"textarea":Is(e,n);break;case"select":t=n.value,t!=null&&mn(e,!!n.multiple,t,!1)}};Vs=$a;$s=Kt;var uf={usingClientEntryPoint:!1,Events:[vr,sn,Nl,Os,Hs,$a]},Dn={findFiberByHostInstance:Ht,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},df={bundleType:Dn.bundleType,version:Dn.version,rendererPackageName:Dn.rendererPackageName,rendererConfig:Dn.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ht.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=qs(e),e===null?null:e.stateNode},findFiberByHostInstance:Dn.findFiberByHostInstance||sf,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ur=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ur.isDisabled&&Ur.supportsFiber)try{kl=Ur.inject(df),tt=Ur}catch{}}_e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=uf;_e.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Ka(t))throw Error(k(200));return of(e,t,null,n)};_e.createRoot=function(e,t){if(!Ka(e))throw Error(k(299));var n=!1,r="",l=ju;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(l=t.onRecoverableError)),t=Wa(e,1,!1,null,null,n,!1,r,l),e[dt]=t.current,or(e.nodeType===8?e.parentNode:e),new Qa(t)};_e.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(k(188)):(e=Object.keys(e).join(","),Error(k(268,e)));return e=qs(t),e=e===null?null:e.stateNode,e};_e.flushSync=function(e){return Kt(e)};_e.hydrate=function(e,t,n){if(!Ll(t))throw Error(k(200));return Il(null,e,t,!0,n)};_e.hydrateRoot=function(e,t,n){if(!Ka(e))throw Error(k(405));var r=n!=null&&n.hydratedSources||null,l=!1,i="",o=ju;if(n!=null&&(n.unstable_strictMode===!0&&(l=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),t=Su(t,null,e,1,n??null,l,!1,i,o),e[dt]=t.current,or(e),r)for(e=0;e<r.length;e++)n=r[e],l=n._getVersion,l=l(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,l]:t.mutableSourceEagerHydrationData.push(n,l);return new Al(t)};_e.render=function(e,t,n){if(!Ll(t))throw Error(k(200));return Il(null,e,t,!1,n)};_e.unmountComponentAtNode=function(e){if(!Ll(e))throw Error(k(40));return e._reactRootContainer?(Kt(function(){Il(null,null,e,!1,function(){e._reactRootContainer=null,e[dt]=null})}),!0):!1};_e.unstable_batchedUpdates=$a;_e.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Ll(n))throw Error(k(200));if(e==null||e._reactInternals===void 0)throw Error(k(38));return Il(e,t,n,!1,r)};_e.version="18.3.1-next-f1338f8080-20240426";function Nu(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Nu)}catch(e){console.error(e)}}Nu(),Ns.exports=_e;var pf=Ns.exports,ss=pf;ui.createRoot=ss.createRoot,ui.hydrateRoot=ss.hydrateRoot;/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ff=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Cu=(...e)=>e.filter((t,n,r)=>!!t&&r.indexOf(t)===n).join(" ");/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var hf={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mf=T.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:n=2,absoluteStrokeWidth:r,className:l="",children:i,iconNode:o,...s},c)=>T.createElement("svg",{ref:c,...hf,width:t,height:t,stroke:e,strokeWidth:r?Number(n)*24/Number(t):n,className:Cu("lucide",l),...s},[...o.map(([d,h])=>T.createElement(d,h)),...Array.isArray(i)?i:[i]]));/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=(e,t)=>{const n=T.forwardRef(({className:r,...l},i)=>T.createElement(mf,{ref:i,iconNode:t,className:Cu(`lucide-${ff(e)}`,r),...l}));return n.displayName=`${e}`,n};/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gf=L("Activity",[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yf=L("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pu=L("Award",[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zu=L("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xf=L("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vf=L("ChevronUp",[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wf=L("CircleCheckBig",[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kf=L("CirclePlus",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 12h8",key:"1wcyev"}],["path",{d:"M12 8v8",key:"napkw2"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bf=L("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Eu=L("Cloud",[["path",{d:"M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z",key:"p7xjir"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cs=L("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sf=L("Film",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M7 3v18",key:"bbkbws"}],["path",{d:"M3 7.5h4",key:"zfgn84"}],["path",{d:"M3 12h18",key:"1i2n21"}],["path",{d:"M3 16.5h4",key:"1230mu"}],["path",{d:"M17 3v18",key:"in4fa5"}],["path",{d:"M17 7.5h4",key:"myr1c1"}],["path",{d:"M17 16.5h4",key:"go4c1d"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tu=L("Flame",[["path",{d:"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",key:"96xj49"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const us=L("FolderOpen",[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",key:"usdka0"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jf=L("FolderSearch",[["path",{d:"M10.7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v4.1",key:"1bw5m7"}],["path",{d:"m21 21-1.9-1.9",key:"1g2n9r"}],["circle",{cx:"17",cy:"17",r:"3",key:"18b49y"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ue=L("Gamepad2",[["line",{x1:"6",x2:"10",y1:"11",y2:"11",key:"1gktln"}],["line",{x1:"8",x2:"8",y1:"9",y2:"13",key:"qnk9ow"}],["line",{x1:"15",x2:"15.01",y1:"12",y2:"12",key:"krot7o"}],["line",{x1:"18",x2:"18.01",y1:"10",y2:"10",key:"1lcuu1"}],["path",{d:"M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z",key:"mfqc10"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nf=L("Hourglass",[["path",{d:"M5 22h14",key:"ehvnwv"}],["path",{d:"M5 2h14",key:"pdyrp9"}],["path",{d:"M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22",key:"1d314k"}],["path",{d:"M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2",key:"1vvvr6"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ds=L("Image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cf=L("Key",[["path",{d:"m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4",key:"g0fldk"}],["path",{d:"m21 2-9.6 9.6",key:"1j0ho8"}],["circle",{cx:"7.5",cy:"15.5",r:"5.5",key:"yqb3hr"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pf=L("Keyboard",[["path",{d:"M10 8h.01",key:"1r9ogq"}],["path",{d:"M12 12h.01",key:"1mp3jc"}],["path",{d:"M14 8h.01",key:"1primd"}],["path",{d:"M16 12h.01",key:"1l6xoz"}],["path",{d:"M18 8h.01",key:"emo2bl"}],["path",{d:"M6 8h.01",key:"x9i8wu"}],["path",{d:"M7 16h10",key:"wp8him"}],["path",{d:"M8 12h.01",key:"czm47f"}],["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zf=L("Layers",[["path",{d:"m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z",key:"8b97xw"}],["path",{d:"m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65",key:"dd6zsq"}],["path",{d:"m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65",key:"ep9fru"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ef=L("Library",[["path",{d:"m16 6 4 14",key:"ji33uf"}],["path",{d:"M12 6v14",key:"1n7gus"}],["path",{d:"M8 8v12",key:"1gg7y9"}],["path",{d:"M4 4v16",key:"6qkkli"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ps=L("Link",[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",key:"1cjeqo"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",key:"19qd67"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tf=L("LockOpen",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 9.9-1",key:"1mm8w8"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mf=L("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _f=L("Minus",[["path",{d:"M5 12h14",key:"1ays0h"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mu=L("Monitor",[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Af=L("Pin",[["path",{d:"M12 17v5",key:"bb1du9"}],["path",{d:"M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",key:"1nkz8b"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ya=L("Play",[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lf=L("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const If=L("Power",[["path",{d:"M12 2v10",key:"mnfbl"}],["path",{d:"M18.4 6.6a9 9 0 1 1-12.77.04",key:"obofu9"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rf=L("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uf=L("Save",[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _u=L("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Au=L("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lu=L("ShoppingCart",[["circle",{cx:"8",cy:"21",r:"1",key:"jimo8o"}],["circle",{cx:"19",cy:"21",r:"1",key:"13723u"}],["path",{d:"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",key:"9zh506"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Df=L("SlidersVertical",[["line",{x1:"4",x2:"4",y1:"21",y2:"14",key:"1p332r"}],["line",{x1:"4",x2:"4",y1:"10",y2:"3",key:"gb41h5"}],["line",{x1:"12",x2:"12",y1:"21",y2:"12",key:"hf2csr"}],["line",{x1:"12",x2:"12",y1:"8",y2:"3",key:"1kfi7u"}],["line",{x1:"20",x2:"20",y1:"21",y2:"16",key:"1lhrwl"}],["line",{x1:"20",x2:"20",y1:"12",y2:"3",key:"16vvfq"}],["line",{x1:"2",x2:"6",y1:"14",y2:"14",key:"1uebub"}],["line",{x1:"10",x2:"14",y1:"8",y2:"8",key:"1yglbp"}],["line",{x1:"18",x2:"22",y1:"16",y2:"16",key:"1jxqpz"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Iu=L("Smartphone",[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2",key:"1yt0o3"}],["path",{d:"M12 18h.01",key:"mhygvu"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ff=L("SquareCheckBig",[["path",{d:"M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.5",key:"1uzm8b"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Of=L("SquarePen",[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",key:"ohrbg2"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ru=L("Square",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rl=L("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hf=L("Tag",[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",key:"vktsd0"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor",key:"kqv944"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vf=L("Trophy",[["path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6",key:"17hqa7"}],["path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18",key:"lmptdp"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",key:"1nw9bq"}],["path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",key:"1np0yb"}],["path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z",key:"u46fv3"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $f=L("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bf=L("Volume2",[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["path",{d:"M16 9a5 5 0 0 1 0 6",key:"1q6k2b"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728",key:"ijwkga"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gf=L("VolumeX",[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["line",{x1:"22",x2:"16",y1:"9",y2:"15",key:"1ewh16"}],["line",{x1:"16",x2:"22",y1:"9",y2:"15",key:"5ykzw1"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ul=L("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);let Fn=null,Ut=[],ke=null,Dt=!1;function tn(){return Fn||(Fn=new(window.AudioContext||window.webkitAudioContext)),Fn.state==="suspended"&&Fn.resume(),Fn}const C={setMuted:e=>{Dt=e,Dt&&C.stopAmbience()},getMuted:()=>Dt,playHoverTick:()=>{if(!Dt)try{const e=tn(),t=e.createOscillator(),n=e.createGain(),r=e.createBiquadFilter();t.connect(r),r.connect(n),n.connect(e.destination),t.type="triangle",t.frequency.setValueAtTime(1800,e.currentTime),t.frequency.exponentialRampToValueAtTime(300,e.currentTime+.04),r.type="lowpass",r.frequency.setValueAtTime(2e3,e.currentTime),n.gain.setValueAtTime(.015,e.currentTime),n.gain.exponentialRampToValueAtTime(.001,e.currentTime+.04),t.start(e.currentTime),t.stop(e.currentTime+.05)}catch{}},playClickPulse:()=>{if(!Dt)try{const e=tn(),t=e.createOscillator(),n=e.createOscillator(),r=e.createGain();t.connect(r),n.connect(r),r.connect(e.destination),t.type="sine",t.frequency.setValueAtTime(380,e.currentTime),t.frequency.exponentialRampToValueAtTime(120,e.currentTime+.12),n.type="triangle",n.frequency.setValueAtTime(760,e.currentTime),n.frequency.exponentialRampToValueAtTime(240,e.currentTime+.08),r.gain.setValueAtTime(.06,e.currentTime),r.gain.exponentialRampToValueAtTime(.001,e.currentTime+.12),t.start(e.currentTime),n.start(e.currentTime),t.stop(e.currentTime+.15),n.stop(e.currentTime+.15)}catch{}},playLaunchSwell:()=>{if(!Dt)try{const e=tn(),t=e.currentTime,n=e.createGain();n.connect(e.destination),n.gain.setValueAtTime(.18,t),n.gain.exponentialRampToValueAtTime(.001,t+3);const r=e.createOscillator();r.type="sine",r.frequency.setValueAtTime(55,t),r.frequency.linearRampToValueAtTime(30,t+1.2);const l=e.createGain();l.gain.setValueAtTime(.4,t),l.gain.exponentialRampToValueAtTime(.001,t+1.2),r.connect(l),l.connect(n),r.start(t),r.stop(t+1.5),[110,164.81,220,277.18].forEach((o,s)=>{const c=e.createOscillator(),d=e.createGain(),h=e.createOscillator(),g=e.createGain();g.gain.setValueAtTime(1.5,t),h.connect(g),g.connect(c.frequency),c.connect(d),d.connect(n),c.type="sawtooth",c.frequency.setValueAtTime(o,t),h.frequency.setValueAtTime(6+s,t);const m=e.createBiquadFilter();m.type="lowpass",m.frequency.setValueAtTime(120,t),m.frequency.exponentialRampToValueAtTime(1600,t+1.5),m.Q.setValueAtTime(4,t),c.disconnect(d),c.connect(m),m.connect(d),d.gain.setValueAtTime(0,t),d.gain.linearRampToValueAtTime(.12,t+.6+s*.1),d.gain.exponentialRampToValueAtTime(.001,t+2.5),h.start(t),c.start(t),h.stop(t+3),c.stop(t+3)})}catch{}},startAmbience:e=>{if(!Dt)try{const t=tn();C.stopAmbience(),ke=t.createGain(),ke.connect(t.destination),ke.gain.setValueAtTime(.001,t.currentTime),ke.gain.linearRampToValueAtTime(.05,t.currentTime+1);const n=t.currentTime;e==="synth"?[46.25,69.3,92.5].forEach((l,i)=>{const o=t.createOscillator(),s=t.createBiquadFilter();o.type="sawtooth",o.frequency.setValueAtTime(l+(Math.random()-.5)*.5,n),s.type="lowpass",s.frequency.setValueAtTime(110,n);const c=t.createOscillator(),d=t.createGain();c.type="sine",c.frequency.setValueAtTime(.15+i*.05,n),d.gain.setValueAtTime(40,n),c.connect(d),d.connect(s.frequency),o.connect(s),s.connect(ke),c.start(n),o.start(n),Ut.push(o,c)}):e==="orchestra"?[36.71,55,73.42,87.31].forEach((l,i)=>{const o=t.createOscillator(),s=t.createBiquadFilter();o.type="triangle",o.frequency.setValueAtTime(l,n),s.type="lowpass",s.frequency.setValueAtTime(160,n),o.connect(s),s.connect(ke),o.start(n),Ut.push(o)}):e==="guitar"?[110,164.81,246.94].forEach((l,i)=>{const o=t.createOscillator();o.type="sine",o.frequency.setValueAtTime(l,n);const s=t.createGain();s.gain.setValueAtTime(.4,n);const c=t.createOscillator(),d=t.createGain();c.type="sine",c.frequency.setValueAtTime(1+i*.5,n),d.gain.setValueAtTime(.2,n),c.connect(d),d.connect(s.gain),o.connect(s),s.connect(ke),c.start(n),o.start(n),Ut.push(o,c)}):e==="ambient"?[130.81,196,261.63,329.63].forEach((l,i)=>{const o=t.createOscillator();o.type="sine",o.frequency.setValueAtTime(l,n);const s=t.createGain();s.gain.setValueAtTime(.1,n);const c=t.createOscillator(),d=t.createGain();c.type="sine",c.frequency.setValueAtTime(.05+i*.02,n),d.gain.setValueAtTime(.08,n),c.connect(d),d.connect(s.gain),o.connect(s),s.connect(ke),c.start(n),o.start(n),Ut.push(o,c)}):[98,146.83,196].forEach((l,i)=>{const o=t.createOscillator();o.type="triangle",o.frequency.setValueAtTime(l,n);const s=t.createBiquadFilter();s.type="lowpass",s.frequency.setValueAtTime(300,n),o.connect(s),s.connect(ke),o.start(n),Ut.push(o)})}catch{}},stopAmbience:()=>{try{ke&&(ke.gain.setValueAtTime(ke.gain.value,tn().currentTime),ke.gain.exponentialRampToValueAtTime(.001,tn().currentTime+.4)),setTimeout(()=>{Ut.forEach(e=>{try{e.stop()}catch{}}),Ut=[],ke=null},500)}catch{}}};function qf({onSearchChange:e,searchQuery:t,onOpenSettings:n,cpuUsage:r,ramUsage:l,activeView:i,onViewChange:o}){const[s,c]=T.useState("");T.useEffect(()=>{const h=()=>{const m=new Date;let x=m.getHours(),y=m.getMinutes();const w=x>=12?"PM":"AM";x=x%12,x=x||12,y=y<10?"0"+y:y,c(`${x}:${y} ${w}`)};h();const g=setInterval(h,1e3);return()=>clearInterval(g)},[]);const d=h=>{C.playClickPulse(),window.electronAPI&&(h==="minimize"&&window.electronAPI.windowMinimize(),h==="maximize"&&window.electronAPI.windowMaximize(),h==="close"&&window.electronAPI.windowClose())};return a.jsxs("header",{className:"navigation-header",children:[a.jsx("div",{className:"titlebar-draggable"}),a.jsxs("div",{className:"nav-left",children:[a.jsx("div",{className:"nexus-logo",children:"N E X U S"}),a.jsxs("div",{className:"mode-tabs",children:[a.jsxs("button",{className:`mode-tab ${i==="library"?"active":""}`,onClick:()=>{C.playClickPulse(),o("library")},children:[a.jsx(Ef,{size:12}),a.jsx("span",{children:"Library"})]}),a.jsxs("button",{className:`mode-tab ${i==="store"||i==="store-item"?"active":""}`,onClick:()=>{C.playClickPulse(),o("store")},children:[a.jsx(Lu,{size:12}),a.jsx("span",{children:"Store"})]})]})]}),a.jsx("div",{className:"nav-center",children:a.jsxs("div",{className:"search-wrapper",children:[a.jsx(_u,{size:14,className:"search-icon"}),a.jsx("input",{type:"text",placeholder:"Search games, activities...",className:"search-input",value:t,onChange:h=>e(h.target.value),onFocus:C.playHoverTick})]})}),a.jsxs("div",{className:"nav-right",children:[a.jsxs("div",{className:"system-telemetry-pill",children:[a.jsxs("div",{className:"telemetry-item",children:[a.jsx("span",{className:"telemetry-label",children:"CPU"}),a.jsxs("span",{className:"telemetry-value",children:[r,"%"]})]}),a.jsx("div",{className:"telemetry-divider"}),a.jsxs("div",{className:"telemetry-item",children:[a.jsx("span",{className:"telemetry-label",children:"RAM"}),a.jsxs("span",{className:"telemetry-value",children:[l,"%"]})]})]}),a.jsx("button",{className:"nav-icon-btn",onClick:n,onMouseEnter:C.playHoverTick,title:"Launcher Settings",children:a.jsx(Au,{size:18})}),a.jsxs("div",{className:"profile-avatar-pill",onMouseEnter:C.playHoverTick,title:"User Profile",children:[a.jsx("div",{className:"avatar-icon-wrapper",children:a.jsx($f,{size:14})}),a.jsx("span",{className:"avatar-username",children:"Player 1"})]}),a.jsx("div",{className:"live-clock",children:s}),a.jsxs("div",{className:"titlebar-controls-container",children:[a.jsx("button",{className:"titlebar-btn",onClick:()=>d("minimize"),title:"Minimize",children:a.jsx(_f,{size:14})}),a.jsx("button",{className:"titlebar-btn",onClick:()=>d("maximize"),title:"Maximize/Restore",children:a.jsx(Ru,{size:10})}),a.jsx("button",{className:"titlebar-btn close-btn",onClick:()=>d("close"),title:"Close",children:a.jsx(Ul,{size:14})})]})]}),a.jsx("style",{dangerouslySetInnerHTML:{__html:`
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
      `}})]})}function Wf({theme:e,speedFactor:t=1,density:n=1}){const r=T.useRef(null),l=T.useRef({x:-1e3,y:-1e3,vx:0,vy:0,lastX:0,lastY:0}),i=T.useRef({x:0,y:0,radius:0,active:!1});return T.useEffect(()=>{const o=r.current;if(!o)return;const s=o.getContext("2d");let c,d=[];const h=()=>{o.width=window.innerWidth,o.height=window.innerHeight,x()},g=()=>e==="theme-cyber"?["#ffffff","#ff007f","#8a2be2","#ff80bf"]:e==="theme-emerald"?["#ffffff","#00ff66","#00cc52","#99ffe6"]:e==="theme-gold"?["#ffffff","#e6af2e","#f3d382","#fff0d0"]:["#ffffff","#00e5ff","#00aaff","#b3f0ff"];class m{constructor(){this.x=Math.random()*o.width,this.y=Math.random()*o.height,this.size=Math.random()*2+.5,this.baseXSpeed=(Math.random()-.5)*.25*t,this.baseYSpeed=-Math.random()*.4*t-.1,this.vx=this.baseXSpeed,this.vy=this.baseYSpeed;const p=g();this.color=p[Math.floor(Math.random()*p.length)],this.alpha=Math.random()*.6+.1,this.baseAlpha=this.alpha,this.decay=Math.random()*.005+.002,this.flickerSpeed=Math.random()*.05+.01,this.flickerDir=Math.random()>.5?1:-1}update(p,v){this.x+=this.vx,this.y+=this.vy,this.y<-10&&(this.y=o.height+10,this.x=Math.random()*o.width),this.x<-10&&(this.x=o.width+10),this.x>o.width+10&&(this.x=-10),this.vx+=(this.baseXSpeed-this.vx)*.08,this.vy+=(this.baseYSpeed-this.vy)*.08;const S=this.x-p.x,P=this.y-p.y,b=Math.sqrt(S*S+P*P),N=120;if(b<N){const F=(N-b)/N,I=Math.atan2(P,S),$=Math.sqrt(p.vx*p.vx+p.vy*p.vy),ge=F*(1.2+$*.1);this.vx+=Math.cos(I)*ge*.5,this.vy+=Math.sin(I)*ge*.5,this.alpha=Math.min(.9,this.alpha+.05)}else this.alpha+=this.flickerSpeed*this.flickerDir,this.alpha>this.baseAlpha*1.4&&(this.flickerDir=-1),this.alpha<this.baseAlpha*.6&&(this.flickerDir=1),this.alpha=Math.max(.05,Math.min(.8,this.alpha));if(v.active){const F=this.x-v.x,I=this.y-v.y,$=Math.sqrt(F*F+I*I),ge=v.radius;if($<ge&&$>ge-40){const rt=Math.atan2(I,F),Ke=6*(1-$/600);this.vx+=Math.cos(rt)*Ke,this.vy+=Math.sin(rt)*Ke,this.alpha=1}}}draw(){s.save(),s.globalAlpha=this.alpha,s.fillStyle=this.color,s.beginPath(),s.arc(this.x,this.y,this.size,0,Math.PI*2),s.shadowBlur=this.size*3,s.shadowColor=this.color,s.fill(),s.restore()}}const x=()=>{d=[];const u=Math.min(120,Math.floor(o.width*o.height/1e4)*n);for(let p=0;p<u;p++)d.push(new m)};window.addEventListener("resize",h),h();const y=u=>{const p=l.current;p.x=u.clientX,p.y=u.clientY,p.vx=p.x-p.lastX,p.vy=p.y-p.lastY,p.lastX=p.x,p.lastY=p.y,clearTimeout(p.velocityTimeout),p.velocityTimeout=setTimeout(()=>{p.vx=0,p.vy=0},50)},w=()=>{const u=l.current;u.x=-1e3,u.y=-1e3,u.vx=0,u.vy=0},U=u=>{i.current={x:u.clientX,y:u.clientY,radius:0,active:!0}};window.addEventListener("mousemove",y),window.addEventListener("mouseleave",w),window.addEventListener("click",U);const f=()=>{s.clearRect(0,0,o.width,o.height);const u=i.current;u.active&&(u.radius+=12,u.radius>800&&(u.active=!1)),d.forEach(p=>{p.update(l.current,u),p.draw()}),c=requestAnimationFrame(f)};return f(),()=>{window.removeEventListener("resize",h),window.removeEventListener("mousemove",y),window.removeEventListener("mouseleave",w),window.removeEventListener("click",U),cancelAnimationFrame(c)}},[e,t,n]),a.jsx("canvas",{ref:r,style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:1}})}function Xf({games:e,selectedGame:t,onSelectGame:n,onLaunchGame:r,runningGameId:l}){const i=T.useRef(null),o=s=>{C.playClickPulse(),n(s)};return a.jsxs("div",{className:"horizontal-library-shelf",ref:i,children:[a.jsxs("div",{className:"shelf-title-row",children:[a.jsx("h2",{className:"shelf-title",children:"My Library"}),a.jsxs("span",{className:"library-count",children:[e.length," games available"]})]}),a.jsx("div",{className:"library-grid-horizontal",children:e.map(s=>{const c=(t==null?void 0:t.id)===s.id,d=l===s.id;return a.jsx(Qf,{game:s,isSelected:c,isRunning:d,onClick:()=>o(s),onLaunch:()=>r(s)},s.id)})}),a.jsx("style",{dangerouslySetInnerHTML:{__html:`
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
          gap: 22px;
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
      `}})]})}function Qf({game:e,isSelected:t,isRunning:n,onClick:r,onLaunch:l}){const i=T.useRef(null),[o,s]=T.useState({x:0,y:0,scale:1}),c=m=>{const x=i.current;if(!x)return;const y=x.getBoundingClientRect(),w=m.clientX-y.left,U=m.clientY-y.top,f=y.width,u=y.height,p=15,v=(U-u/2)/(u/2)*p,S=-((w-f/2)/(f/2))*p;s({x:v,y:S,scale:1.06})},d=()=>{s({x:0,y:0,scale:1})},h=m=>{m.stopPropagation(),l()},g=Math.round(e.playtime/3600*10)/10;return a.jsxs("div",{ref:i,className:`game-card-wrapper ${t?"selected":""} ${n?"running":""}`,onClick:r,onMouseMove:c,onMouseLeave:d,onMouseEnter:C.playHoverTick,style:{transform:`rotateX(${o.x}deg) rotateY(${o.y}deg) scale(${o.scale})`,transition:o.scale===1?"transform 0.5s ease":"transform 0.08s ease"},children:[a.jsxs("div",{className:"card-face",children:[a.jsxs("div",{className:"card-image-container",children:[a.jsx("img",{src:e.coverUrl,alt:e.title,className:"card-image",loading:"lazy"}),n&&a.jsxs("div",{className:"running-overlay-indicator",children:[a.jsx("span",{className:"running-dot-pulse"}),a.jsx("span",{className:"running-text",children:"Running"})]}),a.jsx("div",{className:"card-hover-actions",children:a.jsx("button",{className:`quick-play-button ${n?"running-btn":""}`,onClick:h,title:n?"Game Running":"Launch Game",children:a.jsx(Ya,{fill:n?"transparent":"currentColor",size:16})})}),e.isFavorite&&a.jsx("div",{className:"favorite-indicator-badge",children:a.jsx(Rl,{size:10,fill:"currentColor"})})]}),a.jsxs("div",{className:"card-details-panel",children:[a.jsx("div",{className:"card-title",children:e.title}),a.jsxs("div",{className:"card-meta-metrics",children:[a.jsxs("div",{className:"metric-item",title:"Total Playtime",children:[a.jsx(Tu,{size:12,className:"metric-icon"}),a.jsxs("span",{children:[g,"h"]})]}),e.progress>0&&a.jsxs("div",{className:"metric-item",title:"Completion Progress",children:[a.jsx(Pu,{size:12,className:"metric-icon"}),a.jsxs("span",{children:[e.progress,"%"]})]})]})]})]}),a.jsx("style",{dangerouslySetInnerHTML:{__html:`
        .game-card-wrapper {
          flex: 0 0 165px;
          height: 285px;
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
          height: 200px;
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
          font-size: 13px;
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
      `}})]})}function Kf({game:e,onLaunch:t,onToggleFavorite:n,onEditMetadata:r,onPinSidebar:l,isRunning:i,isSidebarPinned:o}){var m;if(!e)return null;const s=()=>{C.playClickPulse(),t(e)},c=()=>{C.playClickPulse(),n(e.id)},d=()=>{C.playClickPulse(),r(e)},h=()=>{C.playClickPulse(),l()},g=x=>{const y=Math.floor(x/3600),w=Math.floor(x%3600/60);return y===0?`${w} mins`:`${y}h ${w}m`};return a.jsxs("div",{className:"game-main-banner-container",children:[a.jsxs("div",{className:"backdrop-image-mask",children:[a.jsx("img",{src:e.bannerUrl,alt:e.title,className:"banner-backdrop-img backdrop-parallax"},e.id),a.jsx("div",{className:"backdrop-overlay-vignette"})]}),a.jsxs("div",{className:"banner-content-box",children:[a.jsx("div",{className:"genre-badges-row",children:(m=e.tags)==null?void 0:m.map((x,y)=>a.jsx("span",{className:"genre-badge",children:x},y))}),e.logoUrl?a.jsx("img",{src:e.logoUrl,alt:e.title,className:"banner-logo-img"}):a.jsx("h1",{className:"banner-game-title",children:e.title}),a.jsxs("div",{className:"developer-meta",children:[a.jsx("span",{children:e.developer}),a.jsx("span",{className:"dot-divider"}),a.jsxs("span",{children:["Rating: ",a.jsxs("strong",{children:[e.rating,"★"]})]})]}),a.jsx("p",{className:"game-banner-description",children:e.description}),a.jsxs("div",{className:"telemetry-stats-glass-row",children:[a.jsxs("div",{className:"stat-glass-card",children:[a.jsx(bf,{size:16,className:"stat-icon"}),a.jsxs("div",{className:"stat-info",children:[a.jsx("span",{className:"stat-label",children:"Playtime"}),a.jsx("span",{className:"stat-value",children:g(e.playtime)})]})]}),a.jsxs("div",{className:"stat-glass-card",children:[a.jsx(Tu,{size:16,className:"stat-icon"}),a.jsxs("div",{className:"stat-info",children:[a.jsx("span",{className:"stat-label",children:"Last Session"}),a.jsx("span",{className:"stat-value",children:e.lastPlayed})]})]}),e.progress>0&&a.jsxs("div",{className:"stat-glass-card",children:[a.jsx(Pu,{size:16,className:"stat-icon"}),a.jsxs("div",{className:"stat-info",children:[a.jsx("span",{className:"stat-label",children:"Progress"}),a.jsxs("span",{className:"stat-value",children:[e.progress,"% (",e.timeToComplete," left)"]})]})]})]}),a.jsxs("div",{className:"banner-actions-row",children:[a.jsxs("button",{className:`glow-btn glow-btn-primary play-game-btn ${i?"running-pulse":""}`,onClick:s,onMouseEnter:C.playHoverTick,children:[a.jsx(Ya,{fill:i?"transparent":"currentColor",size:18}),a.jsx("span",{children:i?"Running...":"Play Game"})]}),a.jsxs("button",{className:`glow-btn action-pill-btn ${o?"pinned-active":""}`,onClick:h,onMouseEnter:C.playHoverTick,title:"Pin Achievements to Side",children:[a.jsx(Af,{size:16}),a.jsx("span",{children:o?"Pinned":"Pin to Side"})]}),a.jsxs("button",{className:"glow-btn action-pill-btn",onClick:d,onMouseEnter:C.playHoverTick,title:"Edit Game Metadata",children:[a.jsx(Of,{size:16}),a.jsx("span",{children:"Metadata"})]}),a.jsx("button",{className:`glow-btn action-pill-btn fav-pill-btn ${e.isFavorite?"active-favorite":""}`,onClick:c,onMouseEnter:C.playHoverTick,title:"Add to Favorites",children:a.jsx(Rl,{size:16,fill:e.isFavorite?"currentColor":"transparent"})})]})]}),a.jsx("style",{dangerouslySetInnerHTML:{__html:`
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
          height: 100%;
          overflow: hidden;
          z-index: 1;
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
          height: 120px;
          background: linear-gradient(to top, #07070a, transparent);
          z-index: 3;
          pointer-events: none;
        }

        .backdrop-overlay-vignette {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 40% 40%, transparent 20%, rgba(7, 7, 10, 0.7) 65%, #07070a 100%),
                      linear-gradient(0deg, #07070a 0%, rgba(7, 7, 10, 0.2) 50%, rgba(7, 7, 10, 0.4) 100%);
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
      `}})]})}function Yf({isOpen:e,onToggle:t,onOpenSettings:n,onManualImport:r,onImportScannedGames:l,onBatchFetchArtwork:i,cpuUsage:o,ramUsage:s,games:c}){const[d,h]=T.useState(""),[g,m]=T.useState(!1),[x,y]=T.useState([]),[w,U]=T.useState({}),f=()=>{C.playClickPulse(),t()},u=async()=>{if(C.playClickPulse(),window.electronAPI){const b=await window.electronAPI.selectDirectory();b&&h(b)}else h("C:\\Program Files (x86)\\Steam\\steamapps\\common")},p=async()=>{if(d){C.playClickPulse(),m(!0),y([]);try{if(window.electronAPI){const b=await window.electronAPI.scanExecutables(d);setTimeout(()=>{y(b),m(!1);const N={};b.forEach(F=>{N[F.path]=!0}),U(N)},1500)}else setTimeout(()=>{const b=[{name:"eldenring",path:"C:\\SteamLibrary\\steamapps\\common\\Elden Ring\\Game\\eldenring.exe"},{name:"hades",path:"C:\\SteamLibrary\\steamapps\\common\\Hades\\hades.exe"},{name:"minecraft",path:"C:\\Games\\Minecraft\\minecraft.exe"}];y(b),m(!1);const N={};b.forEach(F=>{N[F.path]=!0}),U(N)},1800)}catch{m(!1)}}},v=b=>{C.playHoverTick(),U(N=>({...N,[b]:!N[b]}))},S=()=>{C.playClickPulse();const b=x.filter(N=>w[N.path]);b.length!==0&&(l(b),y([]),h(""),t())},P=()=>{C.playClickPulse(),window.electronAPI?window.electronAPI.powerOff():alert("System Shutdown (Mock)")};return a.jsxs("div",{className:`control-center-drawer-container ${e?"drawer-open":""}`,children:[a.jsxs("div",{className:"drawer-trigger-handle",onClick:f,onMouseEnter:C.playHoverTick,children:[e?a.jsx(xf,{size:14}):a.jsx(vf,{size:14}),a.jsx("span",{className:"trigger-text",children:e?"Close CC":"Control Center"})]}),a.jsxs("div",{className:"drawer-panel-grid glass-panel-heavy",children:[a.jsxs("div",{className:"cc-section cc-telemetry-panel",children:[a.jsx("h3",{className:"cc-section-title",children:"System Status"}),a.jsxs("div",{className:"telemetry-bar-item",children:[a.jsxs("div",{className:"bar-labels",children:[a.jsx("span",{children:"CPU Core Load"}),a.jsxs("span",{children:[o,"%"]})]}),a.jsx("div",{className:"bar-container",children:a.jsx("div",{className:"bar-fill",style:{width:`${o}%`}})})]}),a.jsxs("div",{className:"telemetry-bar-item",children:[a.jsxs("div",{className:"bar-labels",children:[a.jsx("span",{children:"RAM Allocation"}),a.jsxs("span",{children:[s,"%"]})]}),a.jsx("div",{className:"bar-container",children:a.jsx("div",{className:"bar-fill",style:{width:`${s}%`}})})]}),a.jsxs("div",{className:"quick-action-buttons-grid",children:[a.jsxs("button",{className:"quick-btn-icon-label",onClick:r,onMouseEnter:C.playHoverTick,children:[a.jsx(kf,{size:18}),a.jsx("span",{children:"Import EXE"})]}),a.jsxs("button",{className:"quick-btn-icon-label artwork-btn",onClick:i,onMouseEnter:C.playHoverTick,title:"Fetch artwork for all games via SteamGridDB",children:[a.jsx(Eu,{size:18}),a.jsx("span",{children:"Fetch Art"})]}),a.jsxs("button",{className:"quick-btn-icon-label",onClick:n,onMouseEnter:C.playHoverTick,children:[a.jsx(Au,{size:18}),a.jsx("span",{children:"Settings"})]}),a.jsxs("button",{className:"quick-btn-icon-label shutdown-btn",onClick:P,onMouseEnter:C.playHoverTick,children:[a.jsx(If,{size:18}),a.jsx("span",{children:"Power Off"})]})]})]}),a.jsxs("div",{className:"cc-section cc-scanner-panel",children:[a.jsx("h3",{className:"cc-section-title",children:"Batch Library Scanner"}),a.jsxs("div",{className:"scanner-input-row",children:[a.jsx("button",{className:"glow-btn browser-directory-btn",onClick:u,onMouseEnter:C.playHoverTick,children:"Browse Path"}),a.jsx("div",{className:"directory-path-display",title:d||"No directory selected",children:d||"Click Browse to select scanning directory..."}),a.jsx("button",{className:"glow-btn glow-btn-primary scan-action-btn",onClick:p,disabled:!d||g,onMouseEnter:C.playHoverTick,children:g?"Scanning...":"Scan Directory"})]}),a.jsxs("div",{className:"scanner-output-box",children:[g&&a.jsxs("div",{className:"scanning-radar-state",children:[a.jsx("div",{className:"radar-sweep-effect"}),a.jsx("span",{className:"radar-text",children:"Analyzing executables, scanning depth 3..."})]}),!g&&x.length===0&&a.jsxs("div",{className:"scanner-empty-state",children:[a.jsx(jf,{size:24,className:"empty-icon"}),a.jsx("span",{children:"Select a path and click Scan to match executables against PS5 cover database"})]}),!g&&x.length>0&&a.jsxs("div",{className:"scanner-results-list",children:[a.jsxs("div",{className:"results-header",children:[a.jsxs("span",{children:["Found ",x.length," matched games:"]}),a.jsxs("button",{className:"import-submit-badge-btn",onClick:S,children:["Import Selected (",Object.values(w).filter(Boolean).length,")"]})]}),a.jsx("div",{className:"results-grid",children:x.map((b,N)=>{const F=w[b.path];return a.jsxs("div",{className:`result-item-row ${F?"row-active":""}`,onClick:()=>v(b.path),children:[F?a.jsx(Ff,{size:14,className:"checkbox-icon"}):a.jsx(Ru,{size:14,className:"checkbox-icon"}),a.jsxs("div",{className:"result-info",children:[a.jsx("span",{className:"result-name",children:b.name}),a.jsx("span",{className:"result-path",children:b.path})]})]},N)})})]})]})]})]}),a.jsx("style",{dangerouslySetInnerHTML:{__html:`
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
      `}})]})}function Jf({game:e,onClose:t,isRunning:n,sessionTime:r,cpuUsage:l,ramUsage:i}){if(!e)return null;const o=()=>{C.playClickPulse(),t()},c=(h=>({cyberpunk:[{id:1,title:"The Star",desc:"Complete Cyberpunk main storyline.",progress:80,completed:!1},{id:2,title:"Breathtaking",desc:"Collect all items once belonging to Johnny Silverhand.",progress:100,completed:!0},{id:3,title:"Ten out of Ten",desc:"Reach the max level in any skill tree.",progress:40,completed:!1}],eldenring:[{id:1,title:"Elden Lord",desc:"Achieve the Elden Lord ending in Lands Between.",progress:90,completed:!1},{id:2,title:"Shardbearer Godrick",desc:"Defeat Shardbearer Godrick in Stormveil.",progress:100,completed:!0},{id:3,title:"Legendary Armaments",desc:"Acquire all nine legendary weapons.",progress:75,completed:!1}],hades:[{id:1,title:"Family Reunion",desc:"Welcome all Olympic gods to the House of Hades.",progress:50,completed:!1},{id:2,title:"Champion of Elysium",desc:"Clear Elysium chamber with extreme measures.",progress:100,completed:!0},{id:3,title:"Skelly's Last Lament",desc:"Unlock Skelly's final reward skeleton statue.",progress:10,completed:!1}],portal2:[{id:1,title:"Lunacy",desc:"Place a portal on the moon.",progress:100,completed:!0},{id:2,title:"Professor Portal",desc:"Complete calibration course in co-op mode.",progress:100,completed:!0},{id:3,title:"GHOSTRUST",desc:"Complete Chamber 04 in under 2 minutes.",progress:30,completed:!1}],witcher3:[{id:1,title:"Gwent Master",desc:"Defeat Tybalt and win the Passiflora tournament.",progress:30,completed:!1},{id:2,title:"Lilac and Gooseberries",desc:"Find Yennefer of Vengerberg in White Orchard.",progress:100,completed:!0},{id:3,title:"Passed the Trial",desc:"Complete game on Death March difficulty.",progress:15,completed:!1}]})[h]||[{id:1,title:"First Venture",desc:"Launch and run the game for the first time.",progress:100,completed:!0},{id:2,title:"Enthusiast",desc:"Track over 5 hours of total session gameplay.",progress:0,completed:!1},{id:3,title:"Completionist",desc:"Unlock all sub-system achievements.",progress:0,completed:!1}])(e.id),d=h=>{const g=Math.floor(h/3600),m=Math.floor(h%3600/60),x=h%60,y=w=>String(w).padStart(2,"0");return`${y(g)}:${y(m)}:${y(x)}`};return a.jsxs("div",{className:"pip-sidebar-container glass-panel-heavy",children:[a.jsxs("div",{className:"pip-header",children:[a.jsxs("div",{className:"pip-title-badge",children:[a.jsx(gf,{size:14,className:"pip-badge-icon"}),a.jsx("span",{children:"Activity Snapped"})]}),a.jsx("button",{className:"pip-close-btn",onClick:o,onMouseEnter:C.playHoverTick,children:a.jsx(Ul,{size:14})})]}),a.jsxs("div",{className:"pip-game-hero",children:[a.jsx("img",{src:e.coverUrl,alt:e.title,className:"pip-game-cover"}),a.jsxs("div",{className:"pip-game-info",children:[a.jsx("div",{className:"pip-game-title",children:e.title}),a.jsx("div",{className:"pip-game-dev",children:e.developer})]})]}),n?a.jsxs("div",{className:"pip-widget active-session-widget",children:[a.jsxs("div",{className:"widget-header",children:[a.jsx("span",{className:"session-dot"}),a.jsx("span",{className:"session-label",children:"Active Session Ticking"})]}),a.jsx("div",{className:"session-timer-display",children:d(r)}),a.jsxs("div",{className:"session-telemetry-metrics",children:[a.jsxs("div",{className:"session-metric",children:[a.jsx("span",{className:"met-lbl",children:"CPU Usage"}),a.jsxs("span",{className:"met-val",children:[Math.round(l*1.2),"%"]})]}),a.jsxs("div",{className:"session-metric",children:[a.jsx("span",{className:"met-lbl",children:"Mem Load"}),a.jsxs("span",{className:"met-val",children:[Math.round(i*1.05),"%"]})]})]})]}):a.jsxs("div",{className:"pip-widget session-idle-widget",children:[a.jsx(Nf,{size:18,className:"idle-icon"}),a.jsx("span",{children:"Launcher Idle. Press Play to start tracking playtime."})]}),a.jsxs("div",{className:"pip-widget achievements-checklist-widget",children:[a.jsxs("h4",{className:"widget-title",children:[a.jsx(Vf,{size:14,className:"widget-title-icon"}),a.jsx("span",{children:"Trophy Milestones"})]}),a.jsx("div",{className:"achievements-checklist-grid",children:c.map(h=>a.jsxs("div",{className:`achievement-check-row ${h.completed?"completed":""}`,children:[a.jsx("div",{className:"check-box-icon-wrapper",children:h.completed?a.jsx(wf,{size:16,className:"checked-icon"}):a.jsx("div",{className:"unchecked-circle"})}),a.jsxs("div",{className:"achievement-check-details",children:[a.jsx("div",{className:"ach-check-title",children:h.title}),a.jsx("div",{className:"ach-check-desc",children:h.desc}),!h.completed&&h.progress>0&&a.jsxs("div",{className:"ach-mini-progress-bar",children:[a.jsx("div",{className:"ach-mini-progress-track",children:a.jsx("div",{className:"ach-mini-progress-fill",style:{width:`${h.progress}%`}})}),a.jsxs("span",{className:"ach-mini-progress-text",children:[h.progress,"%"]})]})]})]},h.id))})]}),a.jsx("style",{dangerouslySetInnerHTML:{__html:`
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
      `}})]})}function Zf({game:e,onSave:t,onClose:n}){var H;if(!e)return null;const[r,l]=T.useState(e.title),[i,o]=T.useState(e.developer),[s,c]=T.useState(e.genre),[d,h]=T.useState(e.rating),[g,m]=T.useState(e.releaseDate),[x,y]=T.useState(e.progress),[w,U]=T.useState(Math.round(e.playtime/3600*10)/10),[f,u]=T.useState(e.description),[p,v]=T.useState(e.coverUrl),[S,P]=T.useState(e.bannerUrl),[b,N]=T.useState(e.logoUrl||""),[F,I]=T.useState(e.iconUrl||""),[$,ge]=T.useState(((H=e.tags)==null?void 0:H.join(", "))||""),[Pe,rt]=T.useState(e.exePath),[Ke,Rt]=T.useState(e.title),[Le,z]=T.useState(null),[A,D]=T.useState(!1),[G,K]=T.useState(null),[lt,de]=T.useState(null),mt=()=>{C.playClickPulse(),n()},Ve=j=>{j.preventDefault(),C.playClickPulse();const R={...e,title:r,developer:i,genre:s,rating:parseFloat(d)||4,releaseDate:g,progress:parseInt(x)||0,playtime:Math.round(parseFloat(w)*3600)||0,description:f,coverUrl:p,bannerUrl:S,logoUrl:b||null,iconUrl:F||null,exePath:Pe,tags:$.split(",").map(ie=>ie.trim()).filter(Boolean)};t(R)},M=async()=>{if(Ke.trim()){C.playClickPulse(),D(!0),de(null);try{if(window.electronAPI){const j=await window.electronAPI.searchSteamGridDB(Ke.trim());j.error?(de(j.error),z(null)):z(j)}else de("Electron API not available")}catch(j){de(j.message)}D(!1)}},_=async j=>{C.playClickPulse(),K(j.id);try{if(window.electronAPI){const R=await window.electronAPI.fetchArtwork(j.id,e.id,e.title);R.error?de(R.error):(R.grid&&v(R.grid),R.hero&&P(R.hero),R.logo&&N(R.logo),R.icon&&I(R.icon))}}catch(R){de(R.message)}K(null)};return a.jsxs("div",{className:"meta-editor-overlay flex-center",children:[a.jsxs("div",{className:"meta-editor-modal glass-panel-heavy",children:[a.jsxs("div",{className:"editor-header",children:[a.jsx("h2",{className:"editor-title",children:"Metadata Suite"}),a.jsx("button",{className:"editor-close-btn",onClick:mt,onMouseEnter:C.playHoverTick,children:a.jsx(Ul,{size:16})})]}),a.jsxs("form",{className:"editor-form-scrollable",onSubmit:Ve,children:[a.jsxs("div",{className:"editor-grid",children:[a.jsxs("div",{className:"editor-column",children:[a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Game Title"}),a.jsx("input",{type:"text",className:"glass-input editor-input",value:r,onChange:j=>l(j.target.value),required:!0})]}),a.jsxs("div",{className:"form-group-row",children:[a.jsxs("div",{className:"form-group flex-1",children:[a.jsx("label",{className:"form-label",children:"Developer"}),a.jsx("input",{type:"text",className:"glass-input editor-input",value:i,onChange:j=>o(j.target.value),required:!0})]}),a.jsxs("div",{className:"form-group flex-1",children:[a.jsx("label",{className:"form-label",children:"Genre"}),a.jsx("input",{type:"text",className:"glass-input editor-input",value:s,onChange:j=>c(j.target.value)})]})]}),a.jsxs("div",{className:"form-group-row",children:[a.jsxs("div",{className:"form-group flex-1",children:[a.jsx("label",{className:"form-label",children:"Rating (0-5)"}),a.jsx("input",{type:"number",step:"0.1",min:"0",max:"5",className:"glass-input editor-input",value:d,onChange:j=>h(j.target.value)})]}),a.jsxs("div",{className:"form-group flex-1",children:[a.jsx("label",{className:"form-label",children:"Release Date"}),a.jsx("input",{type:"date",className:"glass-input editor-input",value:g,onChange:j=>m(j.target.value)})]})]}),a.jsxs("div",{className:"form-group-row",children:[a.jsxs("div",{className:"form-group flex-1",children:[a.jsx("label",{className:"form-label",children:"Playtime (Hours)"}),a.jsx("input",{type:"number",step:"0.1",min:"0",className:"glass-input editor-input",value:w,onChange:j=>U(j.target.value)})]}),a.jsxs("div",{className:"form-group flex-1",children:[a.jsx("label",{className:"form-label",children:"Progress (%)"}),a.jsx("input",{type:"number",min:"0",max:"100",className:"glass-input editor-input",value:x,onChange:j=>y(j.target.value)})]})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Description Summary"}),a.jsx("textarea",{rows:"3",className:"glass-input editor-textarea",value:f,onChange:j=>u(j.target.value)})]})]}),a.jsxs("div",{className:"editor-column",children:[a.jsxs("div",{className:"form-group",children:[a.jsxs("label",{className:"form-label flex-center-start",children:[a.jsx(ds,{size:13,className:"label-icon"}),a.jsx("span",{children:"Cover Art URL (Vertical)"})]}),a.jsx("input",{type:"text",className:"glass-input editor-input",value:p,onChange:j=>v(j.target.value)})]}),a.jsxs("div",{className:"form-group",children:[a.jsxs("label",{className:"form-label flex-center-start",children:[a.jsx(Sf,{size:13,className:"label-icon"}),a.jsx("span",{children:"Landscape Banner URL"})]}),a.jsx("input",{type:"text",className:"glass-input editor-input",value:S,onChange:j=>P(j.target.value)})]}),a.jsxs("div",{className:"form-group",children:[a.jsxs("label",{className:"form-label flex-center-start",children:[a.jsx(ds,{size:13,className:"label-icon"}),a.jsx("span",{children:"Logo URL"})]}),a.jsx("input",{type:"text",className:"glass-input editor-input",value:b,onChange:j=>N(j.target.value)})]}),a.jsx("div",{className:"form-group-row",children:a.jsxs("div",{className:"form-group flex-1",children:[a.jsxs("label",{className:"form-label flex-center-start",children:[a.jsx(Hf,{size:13,className:"label-icon"}),a.jsx("span",{children:"Tags (comma separated)"})]}),a.jsx("input",{type:"text",className:"glass-input editor-input",placeholder:"e.g. Sci-Fi, Co-op, Ray Tracing",value:$,onChange:j=>ge(j.target.value)})]})}),a.jsxs("div",{className:"form-group",children:[a.jsxs("label",{className:"form-label flex-center-start",children:[a.jsx(Pf,{size:13,className:"label-icon"}),a.jsx("span",{children:"Executable Binary Path (.exe)"})]}),a.jsx("input",{type:"text",className:"glass-input editor-input exe-path-input",value:Pe,onChange:j=>rt(j.target.value),required:!0})]}),a.jsxs("div",{className:"artwork-fetch-section",children:[a.jsxs("label",{className:"form-label flex-center-start",children:[a.jsx(Eu,{size:13,className:"label-icon"}),a.jsx("span",{children:"SteamGridDB Artwork"})]}),a.jsxs("div",{className:"sgdb-search-row",children:[a.jsx("input",{type:"text",className:"glass-input sgdb-search-input",value:Ke,onChange:j=>Rt(j.target.value),placeholder:"Search game on SteamGridDB...",onKeyDown:j=>j.key==="Enter"&&M()}),a.jsx("button",{type:"button",className:"glow-btn sgdb-search-btn",onClick:M,disabled:A,onMouseEnter:C.playHoverTick,children:A?"...":a.jsx(_u,{size:13})})]}),lt&&a.jsx("div",{className:"sgdb-error",children:lt}),Le&&Le.length>0&&a.jsx("div",{className:"sgdb-results",children:Le.slice(0,4).map(j=>{var R;return a.jsxs("div",{className:"sgdb-result-row",children:[a.jsxs("div",{className:"sgdb-result-info",children:[a.jsx("span",{className:"sgdb-result-name",children:j.name}),j.release_date&&a.jsxs("span",{className:"sgdb-result-year",children:["(",(R=j.release_date)==null?void 0:R.slice(0,4),")"]})]}),a.jsxs("button",{type:"button",className:"glow-btn sgdb-apply-btn",onClick:()=>_(j),disabled:G===j.id,onMouseEnter:C.playHoverTick,children:[G===j.id?a.jsx(cs,{size:11}):a.jsx(cs,{size:11}),a.jsx("span",{children:G===j.id?"Fetching...":"Fetch All"})]})]},j.id)})}),Le&&Le.length===0&&!A&&a.jsx("div",{className:"sgdb-no-results",children:"No results found"}),!Le&&!A&&a.jsx("div",{className:"sgdb-hint",children:"Fetch cover art, banners, logos, and icons from SteamGridDB"})]}),a.jsxs("div",{className:"preview-aspects-row",children:[a.jsx("div",{className:"aspect-ratio-preview vert-aspect",title:"Cover",children:p?a.jsx("img",{src:p,alt:"Cover Preview"}):a.jsx("span",{children:"Cover"})}),a.jsx("div",{className:"aspect-ratio-preview horiz-aspect",title:"Banner",children:S?a.jsx("img",{src:S,alt:"Banner Preview"}):a.jsx("span",{children:"Banner"})}),a.jsx("div",{className:"aspect-ratio-preview vert-aspect",title:"Logo",children:b?a.jsx("img",{src:b,alt:"Logo Preview",style:{objectFit:"contain"}}):a.jsx("span",{children:"Logo"})})]})]})]}),a.jsxs("div",{className:"editor-footer-row",children:[a.jsx("button",{type:"button",className:"glow-btn",onClick:mt,onMouseEnter:C.playHoverTick,children:"Cancel"}),a.jsxs("button",{type:"submit",className:"glow-btn glow-btn-primary",onMouseEnter:C.playHoverTick,children:[a.jsx(Uf,{size:14}),a.jsx("span",{children:"Apply Changes"})]})]})]})]}),a.jsx("style",{dangerouslySetInnerHTML:{__html:`
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
      `}})]})}function e0({settings:e,onUpdateSettings:t,onClose:n,onResetDatabase:r,gamesCount:l}){const[i,o]=T.useState(""),[s,c]=T.useState("loading"),[d,h]=T.useState(!1);T.useEffect(()=>{window.electronAPI&&window.electronAPI.getApiKey().then(u=>{o(u.key),c(u.isCustom?"custom":"builtin")}).catch(()=>c("builtin"))},[]);const g=()=>{C.playClickPulse(),n()},m=u=>{C.playClickPulse(),t({...e,theme:u})},x=()=>{const u=!e.isMuted;C.playClickPulse(),C.setMuted(u),t({...e,isMuted:u})},y=(u,p)=>{t({...e,[u]:p})},w=()=>{C.playClickPulse(),confirm("Are you sure you want to reset the Nexus database? This will clear scanned paths, restore default catalog games, and reset playtimes.")&&(r(),alert("Database reset completed successfully!"),n())},U=async()=>{C.playClickPulse(),window.electronAPI&&(await window.electronAPI.saveApiKey(i),h(!0),c("custom"),setTimeout(()=>h(!1),2e3))},f=async()=>{if(C.playClickPulse(),window.electronAPI){const u=await window.electronAPI.getApiKey();o(u.key),c("builtin"),await window.electronAPI.saveApiKey("")}};return a.jsxs("div",{className:"settings-overlay flex-center",children:[a.jsxs("div",{className:"settings-modal glass-panel-heavy",children:[a.jsxs("div",{className:"settings-header",children:[a.jsxs("div",{className:"settings-title-group",children:[a.jsx(zf,{size:16,className:"title-icon"}),a.jsx("h2",{className:"settings-title",children:"Nexus Customization Suite"})]}),a.jsx("button",{className:"settings-close-btn",onClick:g,onMouseEnter:C.playHoverTick,children:a.jsx(Ul,{size:16})})]}),a.jsxs("div",{className:"settings-body-scrollable",children:[a.jsxs("div",{className:"settings-section",children:[a.jsx("h3",{className:"section-label-heading",children:"PS5 Console Telemetry Themes"}),a.jsx("p",{className:"section-description",children:"Select your launcher theme profiles. Changes primary glowing vectors, canvas dust tones, and telemetry backdrops."}),a.jsxs("div",{className:"themes-grid-row",children:[a.jsxs("button",{className:`theme-pill-btn theme-aether-pill ${e.theme==="theme-aether"?"active":""}`,onClick:()=>m("theme-aether"),onMouseEnter:C.playHoverTick,children:[a.jsx("span",{className:"color-dot blue-dot"}),a.jsxs("div",{className:"theme-pill-details",children:[a.jsx("span",{className:"theme-pill-name",children:"Aether Core"}),a.jsx("span",{className:"theme-pill-desc",children:"Cyan and deep space teal"})]})]}),a.jsxs("button",{className:`theme-pill-btn theme-cyber-pill ${e.theme==="theme-cyber"?"active":""}`,onClick:()=>m("theme-cyber"),onMouseEnter:C.playHoverTick,children:[a.jsx("span",{className:"color-dot pink-dot"}),a.jsxs("div",{className:"theme-pill-details",children:[a.jsx("span",{className:"theme-pill-name",children:"Cyber Glitch"}),a.jsx("span",{className:"theme-pill-desc",children:"Hot pink and high-contrast violet"})]})]}),a.jsxs("button",{className:`theme-pill-btn theme-emerald-pill ${e.theme==="theme-emerald"?"active":""}`,onClick:()=>m("theme-emerald"),onMouseEnter:C.playHoverTick,children:[a.jsx("span",{className:"color-dot green-dot"}),a.jsxs("div",{className:"theme-pill-details",children:[a.jsx("span",{className:"theme-pill-name",children:"Emerald Matrix"}),a.jsx("span",{className:"theme-pill-desc",children:"Electric green and dark matrix web"})]})]}),a.jsxs("button",{className:`theme-pill-btn theme-gold-pill ${e.theme==="theme-gold"?"active":""}`,onClick:()=>m("theme-gold"),onMouseEnter:C.playHoverTick,children:[a.jsx("span",{className:"color-dot gold-dot"}),a.jsxs("div",{className:"theme-pill-details",children:[a.jsx("span",{className:"theme-pill-name",children:"Imperial Gold"}),a.jsx("span",{className:"theme-pill-desc",children:"Obsidian black and Warm liquid gold"})]})]})]})]}),a.jsxs("div",{className:"settings-section",children:[a.jsx("h3",{className:"section-label-heading",children:"Acoustic System Settings"}),a.jsx("p",{className:"section-description",children:"Toggle synthesized haptics, click ticks, game-specific ambient drones, and orchestral intro swells."}),a.jsxs("div",{className:"audio-toggle-card",onClick:x,children:[a.jsxs("div",{className:"audio-card-left",children:[e.isMuted?a.jsx(Gf,{size:20,className:"mute-status-icon muted"}):a.jsx(Bf,{size:20,className:"mute-status-icon active-volume"}),a.jsxs("div",{className:"audio-card-info",children:[a.jsx("span",{className:"audio-card-title",children:"Console Synthesized Sounds"}),a.jsx("span",{className:"audio-card-desc",children:e.isMuted?"All UI ticks, clicks, and game drone swells are currently muted.":"UI interactive acoustic sweeps and ambient chord backdrops are active."})]})]}),a.jsx("div",{className:"audio-card-right",children:a.jsx("div",{className:`checkbox-toggle-switch ${e.isMuted?"sw-muted":"sw-active"}`,children:a.jsx("div",{className:"switch-knob"})})})]})]}),a.jsxs("div",{className:"settings-section",children:[a.jsxs("h3",{className:"section-label-heading flex-center-start",children:[a.jsx(Cf,{size:14,className:"heading-icon"}),a.jsx("span",{children:"SteamGridDB API Configuration"})]}),a.jsx("p",{className:"section-description",children:s==="builtin"?"Using built-in SteamGridDB API key. You can override it with your own key for higher rate limits.":"Using your custom SteamGridDB API key."}),a.jsxs("div",{className:"api-key-card",children:[a.jsxs("div",{className:"api-key-input-row",children:[a.jsx("div",{className:"api-key-status-icon",children:s==="custom"?a.jsx(Mf,{size:14}):a.jsx(Tf,{size:14})}),a.jsx("input",{type:"text",className:"glass-input api-key-input",value:i,onChange:u=>o(u.target.value),placeholder:"Enter your SteamGridDB API key..."})]}),a.jsxs("div",{className:"api-key-actions",children:[a.jsx("span",{className:"api-key-status-text",children:d?"Saved!":s==="custom"?"Custom key active":"Built-in key active"}),a.jsxs("div",{className:"api-key-buttons",children:[a.jsx("button",{className:"glow-btn api-key-btn",onClick:f,onMouseEnter:C.playHoverTick,children:"Reset to Default"}),a.jsx("button",{className:"glow-btn glow-btn-primary api-key-btn",onClick:U,onMouseEnter:C.playHoverTick,children:"Save Key"})]})]})]})]}),a.jsxs("div",{className:"settings-section",children:[a.jsxs("h3",{className:"section-label-heading flex-center-start",children:[a.jsx(Df,{size:14,className:"heading-icon"}),a.jsx("span",{children:"Glassmorphism & Stardust Tuning"})]}),a.jsxs("div",{className:"sliders-form-grid",children:[a.jsxs("div",{className:"slider-input-group",children:[a.jsxs("div",{className:"slider-labels",children:[a.jsx("span",{children:"Glassmorphism Backdrop Blur"}),a.jsxs("span",{children:[e.glassBlur,"px"]})]}),a.jsx("input",{type:"range",min:"5",max:"40",className:"settings-slider-bar",value:e.glassBlur,onChange:u=>y("glassBlur",parseInt(u.target.value))})]}),a.jsxs("div",{className:"slider-input-group",children:[a.jsxs("div",{className:"slider-labels",children:[a.jsx("span",{children:"Glass Panel Transparency"}),a.jsxs("span",{children:[Math.round(e.glassOpacity*100),"%"]})]}),a.jsx("input",{type:"range",min:"10",max:"90",className:"settings-slider-bar",value:e.glassOpacity*100,onChange:u=>y("glassOpacity",parseFloat(u.target.value)/100)})]}),a.jsxs("div",{className:"slider-input-group",children:[a.jsxs("div",{className:"slider-labels",children:[a.jsx("span",{children:"Stardust Ambient Particle Density"}),a.jsxs("span",{children:[e.particleDensity,"x"]})]}),a.jsx("input",{type:"range",min:"0.5",max:"2.0",step:"0.1",className:"settings-slider-bar",value:e.particleDensity,onChange:u=>y("particleDensity",parseFloat(u.target.value))})]}),a.jsxs("div",{className:"slider-input-group",children:[a.jsxs("div",{className:"slider-labels",children:[a.jsx("span",{children:"Stardust Velocity Float Speed"}),a.jsxs("span",{children:[e.particleSpeed,"x"]})]}),a.jsx("input",{type:"range",min:"0.5",max:"3.0",step:"0.1",className:"settings-slider-bar",value:e.particleSpeed,onChange:u=>y("particleSpeed",parseFloat(u.target.value))})]})]})]}),a.jsxs("div",{className:"settings-section reset-system-sec",children:[a.jsx("h3",{className:"section-label-heading red-heading",children:"Maintenance & Cache"}),a.jsxs("div",{className:"maintenance-card",children:[a.jsxs("div",{className:"m-left",children:[a.jsx("span",{className:"m-title",children:"Re-index database catalog"}),a.jsxs("span",{className:"m-desc",children:["Currently managing ",a.jsxs("strong",{children:[l," library indices"]}),". Resetting clears custom cover edits and logs."]})]}),a.jsxs("button",{className:"glow-btn reset-db-btn",onClick:w,onMouseEnter:C.playHoverTick,children:[a.jsx(Rf,{size:12}),a.jsx("span",{children:"Reset Database"})]})]})]})]}),a.jsx("div",{className:"settings-footer flex-center-end",children:a.jsx("button",{className:"glow-btn glow-btn-primary",onClick:g,onMouseEnter:C.playHoverTick,children:"Save & Exit Config"})})]}),a.jsx("style",{dangerouslySetInnerHTML:{__html:`
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
      `}})]})}const t0={PC:Mu,PS5:Ue,PS4:Ue,"Xbox Series X|S":Ue,"Xbox One":Ue,Switch:Ue,Mobile:Iu};function n0({platform:e}){const t=t0[e]||Ue,n=e==="PS5"||e==="PS4"?"PS":e.startsWith("Xbox")?"XB":e==="Switch"?"NS":e==="Mobile"?"Mob":e==="PC"?"PC":e.slice(0,2);return a.jsxs("div",{className:"platform-icon-badge",title:e,children:[a.jsx(t,{size:10}),a.jsx("span",{children:n})]})}function r0({catalog:e,ownedGames:t,onSelectItem:n,searchQuery:r}){const l=e.filter(s=>s.title.toLowerCase().includes(r.toLowerCase())||s.developer.toLowerCase().includes(r.toLowerCase())||s.genre.toLowerCase().includes(r.toLowerCase())),i=new Set(t.map(s=>s.id)),o=s=>{C.playClickPulse(),n(s)};return a.jsxs("div",{className:"store-viewport",children:[a.jsxs("div",{className:"store-header",children:[a.jsxs("div",{className:"store-header-left",children:[a.jsx(Lu,{size:20,className:"store-header-icon"}),a.jsx("h1",{className:"store-title",children:"Nexus Store"})]}),a.jsxs("span",{className:"store-count",children:[l.length," titles available"]})]}),l.length===0&&a.jsx("div",{className:"store-empty",children:a.jsx("span",{children:"No titles match your search."})}),a.jsx("div",{className:"store-grid",children:l.map(s=>{const c=i.has(s.id);return a.jsxs("div",{className:`store-card ${c?"owned":""}`,onClick:()=>o(s),children:[a.jsxs("div",{className:"store-card-image-wrapper",children:[a.jsx("img",{src:s.coverUrl,alt:s.title,className:"store-card-image",loading:"lazy"}),c&&a.jsxs("div",{className:"store-owned-badge",children:[a.jsx(zu,{size:12}),a.jsx("span",{children:"Owned"})]}),a.jsx("div",{className:"store-card-hover",children:a.jsx("span",{className:"store-card-view-btn",children:"View Game"})})]}),a.jsxs("div",{className:"store-card-info",children:[a.jsx("div",{className:"store-card-title",children:s.title}),a.jsx("div",{className:"store-card-developer",children:s.developer}),a.jsx("div",{className:"store-card-platforms",children:s.platforms.map(d=>a.jsx(n0,{platform:d},d))}),a.jsxs("div",{className:"store-card-rating",children:[a.jsx(Rl,{size:10,fill:"currentColor"}),a.jsx("span",{children:s.rating})]})]})]},s.id)})}),a.jsx("style",{dangerouslySetInnerHTML:{__html:`
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
          grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
          gap: 20px;
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
      `}})]})}const l0={PC:Mu,PS5:Ue,PS4:Ue,"Xbox Series X|S":Ue,"Xbox One":Ue,Switch:Ue,Mobile:Iu};function i0({item:e,ownedGames:t,onBack:n,onMarkOwned:r,onLinkExe:l,onLaunch:i}){var f;const[o,s]=T.useState(""),[c,d]=T.useState(!1);if(!e)return null;const h=t.find(u=>u.id===e.id),g=!!h,m=g&&h.exePath,x=()=>{C.playClickPulse(),r(e)},y=()=>{if(C.playClickPulse(),window.electronAPI)window.electronAPI.selectExecutable().then(u=>{u&&(s(u),l(e.id,u),d(!1))});else{const u=prompt("Enter the full path to the .exe file:","C:\\Games\\"+e.title+"\\game.exe");u&&(s(u),l(e.id,u),d(!1))}},w=()=>{C.playClickPulse(),o&&(l(e.id,o),d(!1))},U=()=>{C.playClickPulse(),h&&i(h)};return a.jsxs("div",{className:"store-item-viewport",children:[a.jsxs("button",{className:"store-item-back-btn",onClick:n,children:[a.jsx(yf,{size:16}),a.jsx("span",{children:"Back to Store"})]}),a.jsxs("div",{className:"store-item-banner",children:[a.jsx("img",{src:e.bannerUrl,alt:e.title,className:"store-item-banner-img"}),a.jsx("div",{className:"store-item-banner-overlay"}),a.jsxs("div",{className:"store-item-banner-content",children:[a.jsx("div",{className:"store-item-banner-tags",children:(f=e.tags)==null?void 0:f.map((u,p)=>a.jsx("span",{className:"store-item-tag",children:u},p))}),a.jsx("h1",{className:"store-item-title",children:e.title}),a.jsxs("div",{className:"store-item-meta",children:[a.jsx("span",{children:e.developer}),a.jsx("span",{className:"store-item-dot"}),a.jsx("span",{children:e.publisher}),a.jsx("span",{className:"store-item-dot"}),a.jsx("span",{children:e.releaseDate})]}),a.jsxs("div",{className:"store-item-rating",children:[a.jsx(Rl,{size:14,fill:"currentColor"}),a.jsx("span",{children:e.rating})]})]})]}),a.jsxs("div",{className:"store-item-body",children:[a.jsxs("div",{className:"store-item-left",children:[a.jsx("h3",{className:"store-item-section-title",children:"About This Game"}),a.jsx("p",{className:"store-item-description",children:e.description}),a.jsx("h3",{className:"store-item-section-title",children:"Platforms"}),a.jsx("div",{className:"store-item-platforms",children:e.platforms.map(u=>{const p=l0[u]||Ue;return a.jsxs("div",{className:"store-item-platform-badge",children:[a.jsx(p,{size:16}),a.jsx("span",{children:u})]},u)})})]}),a.jsx("div",{className:"store-item-right",children:a.jsx("div",{className:"store-item-ownership-card",children:g?a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"owned-check",children:[a.jsx(zu,{size:20}),a.jsx("span",{children:"In Your Library"})]}),m?a.jsxs("div",{className:"exe-linked-info",children:[a.jsx(ps,{size:14}),a.jsx("span",{className:"exe-path-label",children:h.exePath})]}):a.jsx("div",{className:"exe-not-linked",children:a.jsx("span",{children:"No executable linked yet"})}),c?a.jsxs("div",{className:"exe-input-row",children:[a.jsx("input",{type:"text",className:"glass-input exe-input",placeholder:"C:\\\\Path\\\\To\\\\Game.exe",value:o,onChange:u=>s(u.target.value)}),a.jsxs("div",{className:"exe-input-actions",children:[a.jsxs("button",{className:"glow-btn",onClick:y,children:[a.jsx(us,{size:14}),a.jsx("span",{children:"Browse"})]}),a.jsxs("button",{className:"glow-btn glow-btn-primary",onClick:w,disabled:!o,children:[a.jsx(ps,{size:14}),a.jsx("span",{children:"Link"})]})]})]}):a.jsxs("div",{className:"store-item-actions",children:[m&&a.jsxs("button",{className:"glow-btn glow-btn-primary",onClick:U,children:[a.jsx(Ya,{size:14}),a.jsx("span",{children:"Play Now"})]}),a.jsxs("button",{className:"glow-btn",onClick:()=>d(!0),children:[a.jsx(us,{size:14}),a.jsx("span",{children:m?"Change EXE":"Link EXE"})]})]})]}):a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"not-owned-label",children:a.jsx("span",{children:"You don't own this game yet"})}),a.jsxs("button",{className:"glow-btn glow-btn-primary mark-owned-btn",onClick:x,children:[a.jsx(Lf,{size:16}),a.jsx("span",{children:"Mark as Owned"})]}),a.jsx("div",{className:"owned-hint",children:"Mark a game as owned to add it to your library, then link your .exe file to play."})]})})})]}),a.jsx("style",{dangerouslySetInnerHTML:{__html:`
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
      `}})]})}const Je=[{id:"cyberpunk",title:"Cyberpunk 2077",developer:"CD Projekt Red",publisher:"CD Projekt",genre:"Action RPG",rating:4.8,releaseDate:"2020-12-10",description:"An open-world, action-adventure RPG set in the megalopolis of Night City, where you play as a cyberpunk mercenary wrapped up in a do-or-die fight for survival. Upgraded with next-gen graphics and fully immersive ray-tracing options.",playtime:151200,lastPlayed:"Yesterday",progress:73,timeToComplete:"12 hrs",nextAchievement:"The Star (80% complete)",coverUrl:"https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&q=80",soundType:"synth",exePath:"C:\\Windows\\notepad.exe",isFavorite:!0,owned:!0,platforms:["PC","PS5","Xbox Series X|S"],tags:["Open World","Sci-Fi","Ray Tracing"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"eldenring",title:"Elden Ring",developer:"FromSoftware",publisher:"Bandai Namco",genre:"Action RPG",rating:4.9,releaseDate:"2022-02-25",description:"Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between. Experience an expansive fantasy landscape of breathtaking scale.",playtime:414e3,lastPlayed:"2 days ago",progress:92,timeToComplete:"8 hrs",nextAchievement:"Elden Lord (90% complete)",coverUrl:"https://images.unsplash.com/photo-1655821888788-6107699e173b?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1600&q=80",soundType:"orchestra",exePath:"C:\\Windows\\notepad.exe",isFavorite:!0,owned:!0,platforms:["PC","PS5","Xbox Series X|S"],tags:["Souls-like","Dark Fantasy","Hardcore"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"hades",title:"Hades",developer:"Supergiant Games",publisher:"Supergiant Games",genre:"Rogue-like",rating:4.8,releaseDate:"2020-09-17",description:"Defy the god of the dead as you hack and slash out of the Underworld in this rogue-like dungeon crawler from the creators of Bastion, Transistor, and Pyre.",playtime:126e3,lastPlayed:"5 days ago",progress:64,timeToComplete:"5 hrs",nextAchievement:"Family Reunion (50% complete)",coverUrl:"https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&q=80",soundType:"guitar",exePath:"C:\\Windows\\notepad.exe",isFavorite:!1,owned:!0,platforms:["PC","PS5","Xbox Series X|S","Switch"],tags:["Hack & Slash","Indie","Rogue-like"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"portal2",title:"Portal 2",developer:"Valve",publisher:"Valve",genre:"Puzzle Platformer",rating:4.9,releaseDate:"2011-04-18",description:"The cooperative mode of Portal 2 features a unique two-player campaign with its own story, test chambers, and two new player characters. This new mode forces players to reconsider everything they thought they knew.",playtime:9e4,lastPlayed:"3 weeks ago",progress:100,timeToComplete:"0 hrs",nextAchievement:"Completed (100% complete)",coverUrl:"https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1600&q=80",soundType:"ambient",exePath:"C:\\Windows\\notepad.exe",isFavorite:!1,owned:!0,platforms:["PC","PS5","Xbox Series X|S","Switch"],tags:["Puzzle","Co-op","Comedy"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"witcher3",title:"The Witcher 3: Wild Hunt",developer:"CD Projekt Red",publisher:"CD Projekt",genre:"Action RPG",rating:4.9,releaseDate:"2015-05-19",description:"You are Geralt of Rivia, mercenary monster slayer. Before you stands a war-torn, monster-infested continent you can explore at will. Your current contract? Tracking down Ciri — the Child of Prophecy.",playtime:216e3,lastPlayed:"1 month ago",progress:45,timeToComplete:"40 hrs",nextAchievement:"Gwent Master (30% complete)",coverUrl:"https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&q=80",soundType:"folkish",exePath:"C:\\Windows\\notepad.exe",isFavorite:!1,owned:!0,platforms:["PC","PS5","Xbox Series X|S"],tags:["Rich Story","Fantasy","Open World"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1}],a0={cyberpunk2077:{title:"Cyberpunk 2077",developer:"CD Projekt Red",genre:"Action RPG",coverUrl:"https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&q=80",soundType:"synth",tags:["Open World","Sci-Fi","Ray Tracing"],steamAppId:null},eldenring:{title:"Elden Ring",developer:"FromSoftware",genre:"Action RPG",coverUrl:"https://images.unsplash.com/photo-1655821888788-6107699e173b?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1600&q=80",soundType:"orchestra",tags:["Souls-like","Dark Fantasy","Hardcore"],steamAppId:null},hades:{title:"Hades",developer:"Supergiant Games",genre:"Rogue-like",coverUrl:"https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&q=80",soundType:"guitar",tags:["Hack & Slash","Indie","Rogue-like"],steamAppId:null},portal2:{title:"Portal 2",developer:"Valve",genre:"Puzzle Platformer",coverUrl:"https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1600&q=80",soundType:"ambient",tags:["Puzzle","Co-op","Comedy"],steamAppId:null},witcher3:{title:"The Witcher 3: Wild Hunt",developer:"CD Projekt Red",genre:"Action RPG",coverUrl:"https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&q=80",soundType:"folkish",tags:["Rich Story","Fantasy","Open World"],steamAppId:null},minecraft:{title:"Minecraft",developer:"Mojang",genre:"Sandbox",coverUrl:"https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1607988795691-3d0147b43231?w=1600&q=80",soundType:"ambient",tags:["Survival","Building","Sandbox"],steamAppId:null}};function fs(e,t){const n=e.toLowerCase().replace(/[^a-z0-9]/g,"");for(const[r,l]of Object.entries(a0))if(n.includes(r)||r.includes(n))return{...l,exePath:t,playtime:0,lastPlayed:"Never",progress:0,timeToComplete:"--",nextAchievement:"Locked (0% complete)",rating:4.5,releaseDate:new Date().toISOString().split("T")[0],description:`Your scanned copy of ${l.title}. Imported automatically by Nexus PS5 Launcher. Run the game to begin tracking playtime.`,isFavorite:!1,logoUrl:null,iconUrl:null,artworkFetched:!1};return{title:e.charAt(0).toUpperCase()+e.slice(1).replace(/[-_]/g," "),developer:"Unknown Developer",genre:"Indie Game",rating:4,releaseDate:new Date().toISOString().split("T")[0],description:`A local executable found at ${t}. Fully compatible with Nexus runtime launcher and session playtime counters. Customise this game card using the Metadata Suite.`,playtime:0,lastPlayed:"Never",progress:0,timeToComplete:"--",nextAchievement:"None",coverUrl:"https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1600&q=80",soundType:"synth",exePath:t,isFavorite:!1,owned:!0,platforms:["PC"],tags:["Local Import"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1}}const o0=[{id:"cyberpunk",title:"Cyberpunk 2077",developer:"CD Projekt Red",publisher:"CD Projekt",genre:"Action RPG",rating:4.8,releaseDate:"2020-12-10",description:"An open-world, action-adventure RPG set in the megalopolis of Night City, where you play as a cyberpunk mercenary wrapped up in a do-or-die fight for survival. Upgraded with next-gen graphics and fully immersive ray-tracing options.",coverUrl:"https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&q=80",soundType:"synth",tags:["Open World","Sci-Fi","Ray Tracing"],owned:!1,platforms:["PC","PS5","Xbox Series X|S"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"eldenring",title:"Elden Ring",developer:"FromSoftware",publisher:"Bandai Namco",genre:"Action RPG",rating:4.9,releaseDate:"2022-02-25",description:"Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between. Experience an expansive fantasy landscape of breathtaking scale.",coverUrl:"https://images.unsplash.com/photo-1655821888788-6107699e173b?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1600&q=80",soundType:"orchestra",tags:["Souls-like","Dark Fantasy","Hardcore"],owned:!1,platforms:["PC","PS5","Xbox Series X|S"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"hades",title:"Hades",developer:"Supergiant Games",publisher:"Supergiant Games",genre:"Rogue-like",rating:4.8,releaseDate:"2020-09-17",description:"Defy the god of the dead as you hack and slash out of the Underworld in this rogue-like dungeon crawler from the creators of Bastion, Transistor, and Pyre.",coverUrl:"https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&q=80",soundType:"guitar",tags:["Hack & Slash","Indie","Rogue-like"],owned:!1,platforms:["PC","PS5","Xbox Series X|S","Switch"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"portal2",title:"Portal 2",developer:"Valve",publisher:"Valve",genre:"Puzzle Platformer",rating:4.9,releaseDate:"2011-04-18",description:"The cooperative mode of Portal 2 features a unique two-player campaign with its own story, test chambers, and two new player characters. This new mode forces players to reconsider everything they thought they knew.",coverUrl:"https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1600&q=80",soundType:"ambient",tags:["Puzzle","Co-op","Comedy"],owned:!1,platforms:["PC","PS5","Xbox Series X|S","Switch"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"witcher3",title:"The Witcher 3: Wild Hunt",developer:"CD Projekt Red",publisher:"CD Projekt",genre:"Action RPG",rating:4.9,releaseDate:"2015-05-19",description:"You are Geralt of Rivia, mercenary monster slayer. Before you stands a war-torn, monster-infested continent you can explore at will. Your current contract? Tracking down Ciri — the Child of Prophecy.",coverUrl:"https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&q=80",soundType:"folkish",tags:["Rich Story","Fantasy","Open World"],owned:!1,platforms:["PC","PS5","Xbox Series X|S"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"godofwar",title:"God of War Ragnarök",developer:"Santa Monica Studio",publisher:"Sony Interactive Entertainment",genre:"Action Adventure",rating:4.9,releaseDate:"2022-11-09",description:"Embark on an epic and heartfelt journey as Kratos and Atreus struggle with holding on and letting go. The breathtakingly cinematic action-adventure saga continues as the end of days approaches.",coverUrl:"https://images.unsplash.com/photo-1608889825205-e3f5e4a2020e?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80",soundType:"orchestra",tags:["Story Rich","Mythology","Action"],owned:!1,platforms:["PS4","PS5","PC"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"spiderman",title:"Marvel's Spider-Man 2",developer:"Insomniac Games",publisher:"Sony Interactive Entertainment",genre:"Action Adventure",rating:4.8,releaseDate:"2023-10-20",description:"Swing, fight, and soar across Marvel's New York as both Peter Parker and Miles Morales. Battle iconic villains and protect the city in this thrilling sequel.",coverUrl:"https://images.unsplash.com/photo-1635805737707-575885ab0820?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1600&q=80",soundType:"synth",tags:["Superhero","Open World","Action"],owned:!1,platforms:["PS5"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"minecraft",title:"Minecraft",developer:"Mojang",publisher:"Mojang",genre:"Sandbox",rating:4.7,releaseDate:"2011-11-18",description:"Explore infinite worlds and build everything from the simplest of homes to the grandest of castles. Play in creative mode with unlimited resources or mine deep into the world in survival mode.",coverUrl:"https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1607988795691-3d0147b43231?w=1600&q=80",soundType:"ambient",tags:["Survival","Building","Sandbox"],owned:!1,platforms:["PC","PS5","Xbox Series X|S","Switch","Mobile"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"baldursgate3",title:"Baldur's Gate 3",developer:"Larian Studios",publisher:"Larian Studios",genre:"CRPG",rating:4.9,releaseDate:"2023-08-03",description:"Gather your party and return to the Forgotten Realms in a tale of fellowship and betrayal, sacrifice and survival, and the lure of absolute power. Master deep strategic combat and rich storytelling.",coverUrl:"https://images.unsplash.com/photo-1531326121958-9a5a53c8a2c6?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1600&q=80",soundType:"orchestra",tags:["RPG","Strategy","Story Rich"],owned:!1,platforms:["PC","PS5","Xbox Series X|S"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"zelda",title:"The Legend of Zelda: Tears of the Kingdom",developer:"Nintendo EPD",publisher:"Nintendo",genre:"Action Adventure",rating:5,releaseDate:"2023-05-12",description:"An epic adventure across the land and skies of Hyrule awaits in this long-awaited sequel to Breath of the Wild. Harness the power of new abilities and explore a vast, reimagined world.",coverUrl:"https://images.unsplash.com/photo-1616514197671-15d99ce7a6f8?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1470071459604-4b118ecb4c4b?w=1600&q=80",soundType:"orchestra",tags:["Adventure","Open World","Puzzle"],owned:!1,platforms:["Switch"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"halo",title:"Halo Infinite",developer:"343 Industries",publisher:"Xbox Game Studios",genre:"First-Person Shooter",rating:4.5,releaseDate:"2021-12-08",description:"When all hope is lost and humanity's fate hangs in the balance, the Master Chief steps forward to confront a terrifying new enemy. The most ambitious Halo campaign ever made.",coverUrl:"https://images.unsplash.com/photo-1552820728-8b83bb6b1b3c?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1600&q=80",soundType:"synth",tags:["Sci-Fi","Shooter","Multiplayer"],owned:!1,platforms:["PC","Xbox Series X|S","Xbox One"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"ff7rebirth",title:"Final Fantasy VII Rebirth",developer:"Square Enix",publisher:"Square Enix",genre:"JRPG",rating:4.8,releaseDate:"2024-02-29",description:"Step into a vibrant and vast world as Cloud and his friends seek to defy destiny itself. The second chapter of the FINAL FANTASY VII remake project blends classic RPG storytelling with action combat.",coverUrl:"https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1563089145-599997674d42?w=1600&q=80",soundType:"orchestra",tags:["RPG","Fantasy","Action"],owned:!1,platforms:["PS5"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"starfield",title:"Starfield",developer:"Bethesda Game Studios",publisher:"Bethesda Softworks",genre:"Action RPG",rating:4.3,releaseDate:"2023-09-06",description:"Explore the vast reaches of space in Bethesda's first new universe in over 25 years. Create your character and embark on an epic journey to uncover humanity's greatest mystery.",coverUrl:"https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=1600&q=80",soundType:"synth",tags:["Space","Open World","Sci-Fi"],owned:!1,platforms:["PC","Xbox Series X|S"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"horizon",title:"Horizon Forbidden West",developer:"Guerrilla Games",publisher:"Sony Interactive Entertainment",genre:"Action RPG",rating:4.7,releaseDate:"2022-02-18",description:"Aloy ventures west to investigate a deadly blight that threatens all life on Earth. Explore stunning landscapes, battle colossal machines, and uncover a hidden threat.",coverUrl:"https://images.unsplash.com/photo-1518709766631-a6a7f45921c1?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1505144808419-1957a94ca61e?w=1600&q=80",soundType:"orchestra",tags:["Open World","Sci-Fi","Action"],owned:!1,platforms:["PS4","PS5","PC"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"diablo4",title:"Diablo IV",developer:"Blizzard Entertainment",publisher:"Blizzard Entertainment",genre:"Action RPG",rating:4.4,releaseDate:"2023-06-06",description:"Explore the shattered world of Sanctuary in the most ambitious Diablo entry yet. Battle the legions of Hell through a dark and gripping campaign, then dive into deep endgame content.",coverUrl:"https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?w=1600&q=80",soundType:"ambient",tags:["Dark Fantasy","Multiplayer","RPG"],owned:!1,platforms:["PC","PS5","Xbox Series X|S"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"starwars",title:"Star Wars Jedi: Survivor",developer:"Respawn Entertainment",publisher:"Electronic Arts",genre:"Action Adventure",rating:4.6,releaseDate:"2023-04-28",description:"Continue Cal Kestis's journey across the galaxy, now a more powerful Jedi. Master new combat abilities and explore a galaxy far, far away in this thrilling action-adventure.",coverUrl:"https://images.unsplash.com/photo-1543536448-d209d2d2e7d3?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1600&q=80",soundType:"orchestra",tags:["Sci-Fi","Action","Adventure"],owned:!1,platforms:["PC","PS5","Xbox Series X|S"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"liesofp",title:"Lies of P",developer:"Neowiz Games",publisher:"Neowiz",genre:"Souls-like",rating:4.6,releaseDate:"2023-09-19",description:"A dark fantasy retelling of Pinocchio. Navigate a ruined city in a desperate search for Geppetto. Master a sophisticated combat system and wield a unique weapon customization system.",coverUrl:"https://images.unsplash.com/photo-1550639525-c97d455acf70?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&q=80",soundType:"orchestra",tags:["Souls-like","Dark Fantasy","Action"],owned:!1,platforms:["PC","PS5","Xbox Series X|S"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1},{id:"cyberpunk2077phantom",title:"Cyberpunk 2077: Phantom Liberty",developer:"CD Projekt Red",publisher:"CD Projekt",genre:"Action RPG",rating:4.9,releaseDate:"2023-09-26",description:"A spy-thriller expansion for Cyberpunk 2077. When a prototype orbital shuttle crash-lands in Dogtown, V is pulled into a dangerous game of espionage and survival featuring Idris Elba.",coverUrl:"https://images.unsplash.com/photo-1569144157591-c60f3f82f137?w=500&q=80",bannerUrl:"https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&q=80",soundType:"synth",tags:["Open World","Spy Thriller","Expansion"],owned:!1,platforms:["PC","PS5","Xbox Series X|S"],steamAppId:null,logoUrl:null,iconUrl:null,artworkFetched:!1}];function s0(){const[e,t]=T.useState([]),[n,r]=T.useState(null),[l,i]=T.useState(""),[o,s]=T.useState("library"),[c,d]=T.useState(null),[h,g]=T.useState(null),[m,x]=T.useState(0),y=T.useRef(null),[w,U]=T.useState(!1),[f,u]=T.useState(!1),[p,v]=T.useState(!1),[S,P]=T.useState(!1),[b,N]=T.useState(12),[F,I]=T.useState(34),[$,ge]=T.useState({theme:"theme-aether",isMuted:!1,glassBlur:20,glassOpacity:.4,particleDensity:1,particleSpeed:1});T.useEffect(()=>{async function M(){if(window.electronAPI)try{const _=await window.electronAPI.loadDatabase();_&&Array.isArray(_)&&_.length>0?(t(_),r(_[0])):(t(Je),r(Je[0]),await window.electronAPI.saveDatabase(Je))}catch(_){console.error("Database load error, falling back to mock:",_),t(Je),r(Je[0])}else{const _=localStorage.getItem("nexus_games_cache");if(_){const H=JSON.parse(_);t(H),r(H[0])}else t(Je),r(Je[0])}}M()},[]),T.useEffect(()=>{const M=document.body;M.className=`${$.theme} ecosystem-games-bg`,document.documentElement.style.setProperty("--panel-bg",`rgba(10, 10, 16, ${$.glassOpacity})`),document.documentElement.style.setProperty("--panel-bg-solid",`rgba(10, 10, 16, ${Math.min(.98,$.glassOpacity*1.5)})`),document.documentElement.style.setProperty("--glass-border",`rgba(255, 255, 255, ${$.glassOpacity*.18})`);const _=setInterval(()=>{N(H=>{const j=Math.floor(Math.random()*8)-4;return Math.max(5,Math.min(85,H+j))}),I(H=>{const j=Math.floor(Math.random()*4)-2;return Math.max(25,Math.min(95,H+j))})},4e3);return()=>clearInterval(_)},[$]),T.useEffect(()=>(n?C.startAmbience(n.soundType):C.stopAmbience(),()=>C.stopAmbience()),[n,$.isMuted]),T.useEffect(()=>{if(window.electronAPI){const M=window.electronAPI.onGameStatusChanged((_,H,j)=>{H==="running"?(g(_),x(0),U(!1),y.current&&clearInterval(y.current),y.current=setInterval(()=>{x(R=>R+1)},1e3)):H==="stopped"&&(y.current&&(clearInterval(y.current),y.current=null),t(R=>{const ie=R.map(Zt=>{if(Zt.id===_){const Uu=j||0;return{...Zt,playtime:Zt.playtime+Uu,lastPlayed:"Just now"}}return Zt});window.electronAPI&&window.electronAPI.saveDatabase(ie);const Ja=ie.find(Zt=>Zt.id===_);return Ja&&r(Ja),ie}),g(null),x(0),C.playLaunchSwell())});return()=>{M(),y.current&&clearInterval(y.current)}}},[e]);const Pe=async M=>{if(h){alert("A gameplay session is already active!");return}if(C.playLaunchSwell(),window.electronAPI){const _=await window.electronAPI.launchGame(M.id,M.exePath);_.success||alert(`Process launch aborted: ${_.error}`)}else g(M.id),x(0),U(!1),y.current&&clearInterval(y.current),y.current=setInterval(()=>{x(_=>_+1)},1e3),setTimeout(()=>{rt(M.id,8)},8e3)},rt=(M,_)=>{y.current&&(clearInterval(y.current),y.current=null),t(H=>{const j=H.map(ie=>ie.id===M?{...ie,playtime:ie.playtime+_,lastPlayed:"Just now"}:ie);localStorage.setItem("nexus_games_cache",JSON.stringify(j));const R=j.find(ie=>ie.id===M);return R&&r(R),j}),g(null),x(0),C.playLaunchSwell()},Ke=async M=>{const _=e.map(H=>H.id===M.id?M:H);t(_),r(M),v(!1),window.electronAPI?await window.electronAPI.saveDatabase(_):localStorage.setItem("nexus_games_cache",JSON.stringify(_))},Rt=async M=>{const _=e.map(j=>j.id===M?{...j,isFavorite:!j.isFavorite}:j);t(_);const H=_.find(j=>j.id===M);H&&r(H),window.electronAPI?await window.electronAPI.saveDatabase(_):localStorage.setItem("nexus_games_cache",JSON.stringify(_))},Le=async M=>{const _=[...e];M.forEach(H=>{if(!_.find(R=>R.exePath===H.path)){const R=fs(H.name,H.path),ie=H.name.toLowerCase().replace(/[^a-z0-9]/g,"")+Math.floor(Math.random()*100);_.push({...R,id:ie})}}),t(_),r(_[_.length-1]),window.electronAPI?await window.electronAPI.saveDatabase(_):localStorage.setItem("nexus_games_cache",JSON.stringify(_))},z=()=>{C.playClickPulse();const M=prompt("Input complete Windows Executable file path (.exe):","C:\\Windows\\notepad.exe");if(!M)return;const _=M.split("\\").pop().replace(".exe",""),H=_.toLowerCase().replace(/[^a-z0-9]/g,"")+Math.floor(Math.random()*100),j=fs(_,M),R=[...e,{...j,id:H}];t(R),r(R[R.length-1]),U(!1),window.electronAPI?window.electronAPI.saveDatabase(R):localStorage.setItem("nexus_games_cache",JSON.stringify(R))},A=async()=>{t(Je),r(Je[0]),window.electronAPI?await window.electronAPI.saveDatabase(Je):localStorage.removeItem("nexus_games_cache")},D=M=>{C.playClickPulse(),s(M),M==="store"&&d(null)},G=M=>{d(M),s("store-item")},K=()=>{s("store"),d(null)},lt=async M=>{if(e.find(R=>R.id===M.id)){const R=e.map(ie=>ie.id===M.id?{...ie,owned:!0}:ie);t(R),window.electronAPI?await window.electronAPI.saveDatabase(R):localStorage.setItem("nexus_games_cache",JSON.stringify(R));return}M.owned=!0;const H={...M,playtime:0,lastPlayed:"Never",progress:0,timeToComplete:"--",nextAchievement:"Locked (0% complete)",exePath:"",isFavorite:!1,owned:!0},j=[...e,H];t(j),r(H),window.electronAPI?await window.electronAPI.saveDatabase(j):localStorage.setItem("nexus_games_cache",JSON.stringify(j))},de=async(M,_)=>{const H=e.map(R=>R.id===M?{...R,exePath:_}:R);t(H);const j=H.find(R=>R.id===M);j&&r(j),window.electronAPI?await window.electronAPI.saveDatabase(H):localStorage.setItem("nexus_games_cache",JSON.stringify(H))},mt=()=>e.filter(M=>M.title.toLowerCase().includes(l.toLowerCase())||M.developer.toLowerCase().includes(l.toLowerCase())||M.genre.toLowerCase().includes(l.toLowerCase())),Ve=o0.map(M=>({...M,owned:e.some(_=>_.id===M.id&&_.owned)}));return a.jsxs("div",{className:"app-container",children:[a.jsx(Wf,{theme:$.theme,speedFactor:$.particleSpeed,density:$.particleDensity}),a.jsx(qf,{searchQuery:l,onSearchChange:i,onOpenSettings:()=>{C.playClickPulse(),u(!0)},cpuUsage:b,ramUsage:F,activeView:o,onViewChange:D}),a.jsxs("main",{className:`main-viewport ${S&&o==="library"?"sidebar-active":""}`,children:[o==="library"&&a.jsxs(a.Fragment,{children:[a.jsx(Kf,{game:n,onLaunch:Pe,onToggleFavorite:Rt,onEditMetadata:()=>v(!0),onPinSidebar:()=>P(!S),isRunning:h===(n==null?void 0:n.id),isSidebarPinned:S}),a.jsx(Xf,{games:mt(),selectedGame:n,onSelectGame:r,onLaunchGame:Pe,runningGameId:h})]}),o==="store"&&a.jsx(r0,{catalog:Ve,ownedGames:e,onSelectItem:G,searchQuery:l}),o==="store-item"&&a.jsx(i0,{item:c,ownedGames:e,onBack:K,onMarkOwned:lt,onLinkExe:de,onLaunch:Pe})]}),a.jsx(Yf,{isOpen:w,onToggle:()=>U(!w),onOpenSettings:()=>u(!0),onManualImport:z,onImportScannedGames:Le,cpuUsage:b,ramUsage:F}),S&&a.jsx(Jf,{game:n,onClose:()=>P(!1),isRunning:h===(n==null?void 0:n.id),sessionTime:m,cpuUsage:b,ramUsage:F}),f&&a.jsx(e0,{settings:$,onUpdateSettings:ge,onResetDatabase:A,gamesCount:e.length,onClose:()=>u(!1)}),p&&a.jsx(Zf,{game:n,onSave:Ke,onClose:()=>v(!1)})]})}ui.createRoot(document.getElementById("root")).render(a.jsx(ed.StrictMode,{children:a.jsx(s0,{})}));
