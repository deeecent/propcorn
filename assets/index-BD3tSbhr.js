const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-Dnaj_-u5.js","assets/index-DrXe-FMK.js","assets/index-Bcvdsj3e.css"])))=>i.map(i=>d[i]);
import{_ as fe}from"./index-DrXe-FMK.js";const me=Symbol(),ee=Object.getPrototypeOf,Q=new WeakMap,he=e=>e&&(Q.has(e)?Q.get(e):ee(e)===Object.prototype||ee(e)===Array.prototype),ge=e=>he(e)&&e[me]||null,te=(e,t=!0)=>{Q.set(e,t)},z={BASE_URL:"/",DEV:!1,MODE:"production",PROD:!0,SSR:!1,VITE_ALCHEMY_API_KEY:"YBtmXwIQ8RnshQKn3i0s7jnzka35hGOF",VITE_WC_PROJECT_ID:"77e76b81e15a6ff86f3d178808837008"},Y=e=>typeof e=="object"&&e!==null,A=new WeakMap,x=new WeakSet,be=(e=Object.is,t=(n,g)=>new Proxy(n,g),s=n=>Y(n)&&!x.has(n)&&(Array.isArray(n)||!(Symbol.iterator in n))&&!(n instanceof WeakMap)&&!(n instanceof WeakSet)&&!(n instanceof Error)&&!(n instanceof Number)&&!(n instanceof Date)&&!(n instanceof String)&&!(n instanceof RegExp)&&!(n instanceof ArrayBuffer),r=n=>{switch(n.status){case"fulfilled":return n.value;case"rejected":throw n.reason;default:throw n}},l=new WeakMap,c=(n,g,I=r)=>{const y=l.get(n);if((y==null?void 0:y[0])===g)return y[1];const v=Array.isArray(n)?[]:Object.create(Object.getPrototypeOf(n));return te(v,!0),l.set(n,[g,v]),Reflect.ownKeys(n).forEach(P=>{if(Object.getOwnPropertyDescriptor(v,P))return;const O=Reflect.get(n,P),M={value:O,enumerable:!0,configurable:!0};if(x.has(O))te(O,!1);else if(O instanceof Promise)delete M.value,M.get=()=>I(O);else if(A.has(O)){const[b,H]=A.get(O);M.value=c(b,H(),I)}Object.defineProperty(v,P,M)}),Object.preventExtensions(v)},m=new WeakMap,f=[1,1],W=n=>{if(!Y(n))throw new Error("object required");const g=m.get(n);if(g)return g;let I=f[0];const y=new Set,v=(a,i=++f[0])=>{I!==i&&(I=i,y.forEach(o=>o(a,i)))};let P=f[1];const O=(a=++f[1])=>(P!==a&&!y.size&&(P=a,b.forEach(([i])=>{const o=i[1](a);o>I&&(I=o)})),I),M=a=>(i,o)=>{const h=[...i];h[1]=[a,...h[1]],v(h,o)},b=new Map,H=(a,i)=>{if((z?"production":void 0)!=="production"&&b.has(a))throw new Error("prop listener already exists");if(y.size){const o=i[3](M(a));b.set(a,[i,o])}else b.set(a,[i])},Z=a=>{var i;const o=b.get(a);o&&(b.delete(a),(i=o[1])==null||i.call(o))},ue=a=>(y.add(a),y.size===1&&b.forEach(([o,h],S)=>{if((z?"production":void 0)!=="production"&&h)throw new Error("remove already exists");const N=o[3](M(S));b.set(S,[o,N])}),()=>{y.delete(a),y.size===0&&b.forEach(([o,h],S)=>{h&&(h(),b.set(S,[o]))})}),J=Array.isArray(n)?[]:Object.create(Object.getPrototypeOf(n)),V=t(J,{deleteProperty(a,i){const o=Reflect.get(a,i);Z(i);const h=Reflect.deleteProperty(a,i);return h&&v(["delete",[i],o]),h},set(a,i,o,h){const S=Reflect.has(a,i),N=Reflect.get(a,i,h);if(S&&(e(N,o)||m.has(o)&&e(N,m.get(o))))return!0;Z(i),Y(o)&&(o=ge(o)||o);let $=o;if(o instanceof Promise)o.then(C=>{o.status="fulfilled",o.value=C,v(["resolve",[i],C])}).catch(C=>{o.status="rejected",o.reason=C,v(["reject",[i],C])});else{!A.has(o)&&s(o)&&($=W(o));const C=!x.has($)&&A.get($);C&&H(i,C)}return Reflect.set(a,i,$,h),v(["set",[i],o,N]),!0}});m.set(n,V);const pe=[J,O,c,ue];return A.set(V,pe),Reflect.ownKeys(n).forEach(a=>{const i=Object.getOwnPropertyDescriptor(n,a);"value"in i&&(V[a]=n[a],delete i.value,delete i.writable),Object.defineProperty(J,a,i)}),V})=>[W,A,x,e,t,s,r,l,c,m,f],[ye]=be();function j(e={}){return ye(e)}function D(e,t,s){const r=A.get(e);(z?"production":void 0)!=="production"&&!r&&console.warn("Please use proxy object");let l;const c=[],m=r[3];let f=!1;const n=m(g=>{c.push(g),l||(l=Promise.resolve().then(()=>{l=void 0,f&&t(c.splice(0))}))});return f=!0,()=>{f=!1,n()}}function ve(e,t){const s=A.get(e);(z?"production":void 0)!=="production"&&!s&&console.warn("Please use proxy object");const[r,l,c]=s;return c(r,l(),t)}const d=j({history:["ConnectWallet"],view:"ConnectWallet",data:void 0}),de={state:d,subscribe(e){return D(d,()=>e(d))},push(e,t){e!==d.view&&(d.view=e,t&&(d.data=t),d.history.push(e))},reset(e){d.view=e,d.history=[e]},replace(e){d.history.length>1&&(d.history[d.history.length-1]=e,d.view=e)},goBack(){if(d.history.length>1){d.history.pop();const[e]=d.history.slice(-1);d.view=e}},setData(e){d.data=e}},p={WALLETCONNECT_DEEPLINK_CHOICE:"WALLETCONNECT_DEEPLINK_CHOICE",WCM_VERSION:"WCM_VERSION",RECOMMENDED_WALLET_AMOUNT:9,isMobile(){return typeof window<"u"?!!(window.matchMedia("(pointer:coarse)").matches||/Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/u.test(navigator.userAgent)):!1},isAndroid(){return p.isMobile()&&navigator.userAgent.toLowerCase().includes("android")},isIos(){const e=navigator.userAgent.toLowerCase();return p.isMobile()&&(e.includes("iphone")||e.includes("ipad"))},isHttpUrl(e){return e.startsWith("http://")||e.startsWith("https://")},isArray(e){return Array.isArray(e)&&e.length>0},formatNativeUrl(e,t,s){if(p.isHttpUrl(e))return this.formatUniversalUrl(e,t,s);let r=e;r.includes("://")||(r=e.replaceAll("/","").replaceAll(":",""),r=`${r}://`),r.endsWith("/")||(r=`${r}/`),this.setWalletConnectDeepLink(r,s);const l=encodeURIComponent(t);return`${r}wc?uri=${l}`},formatUniversalUrl(e,t,s){if(!p.isHttpUrl(e))return this.formatNativeUrl(e,t,s);let r=e;r.endsWith("/")||(r=`${r}/`),this.setWalletConnectDeepLink(r,s);const l=encodeURIComponent(t);return`${r}wc?uri=${l}`},async wait(e){return new Promise(t=>{setTimeout(t,e)})},openHref(e,t){window.open(e,t,"noreferrer noopener")},setWalletConnectDeepLink(e,t){try{localStorage.setItem(p.WALLETCONNECT_DEEPLINK_CHOICE,JSON.stringify({href:e,name:t}))}catch{console.info("Unable to set WalletConnect deep link")}},setWalletConnectAndroidDeepLink(e){try{const[t]=e.split("?");localStorage.setItem(p.WALLETCONNECT_DEEPLINK_CHOICE,JSON.stringify({href:t,name:"Android"}))}catch{console.info("Unable to set WalletConnect android deep link")}},removeWalletConnectDeepLink(){try{localStorage.removeItem(p.WALLETCONNECT_DEEPLINK_CHOICE)}catch{console.info("Unable to remove WalletConnect deep link")}},setModalVersionInStorage(){try{typeof localStorage<"u"&&localStorage.setItem(p.WCM_VERSION,"2.6.2")}catch{console.info("Unable to set Web3Modal version in storage")}},getWalletRouterData(){var e;const t=(e=de.state.data)==null?void 0:e.Wallet;if(!t)throw new Error('Missing "Wallet" view data');return t}},we=typeof location<"u"&&(location.hostname.includes("localhost")||location.protocol.includes("https")),u=j({enabled:we,userSessionId:"",events:[],connectedWalletId:void 0}),Ie={state:u,subscribe(e){return D(u.events,()=>e(ve(u.events[u.events.length-1])))},initialize(){u.enabled&&typeof(crypto==null?void 0:crypto.randomUUID)<"u"&&(u.userSessionId=crypto.randomUUID())},setConnectedWalletId(e){u.connectedWalletId=e},click(e){if(u.enabled){const t={type:"CLICK",name:e.name,userSessionId:u.userSessionId,timestamp:Date.now(),data:e};u.events.push(t)}},track(e){if(u.enabled){const t={type:"TRACK",name:e.name,userSessionId:u.userSessionId,timestamp:Date.now(),data:e};u.events.push(t)}},view(e){if(u.enabled){const t={type:"VIEW",name:e.name,userSessionId:u.userSessionId,timestamp:Date.now(),data:e};u.events.push(t)}}},E=j({chains:void 0,walletConnectUri:void 0,isAuth:!1,isCustomDesktop:!1,isCustomMobile:!1,isDataLoaded:!1,isUiLoaded:!1}),w={state:E,subscribe(e){return D(E,()=>e(E))},setChains(e){E.chains=e},setWalletConnectUri(e){E.walletConnectUri=e},setIsCustomDesktop(e){E.isCustomDesktop=e},setIsCustomMobile(e){E.isCustomMobile=e},setIsDataLoaded(e){E.isDataLoaded=e},setIsUiLoaded(e){E.isUiLoaded=e},setIsAuth(e){E.isAuth=e}},B=j({projectId:"",mobileWallets:void 0,desktopWallets:void 0,walletImages:void 0,chains:void 0,enableAuthMode:!1,enableExplorer:!0,explorerExcludedWalletIds:void 0,explorerRecommendedWalletIds:void 0,termsOfServiceUrl:void 0,privacyPolicyUrl:void 0}),T={state:B,subscribe(e){return D(B,()=>e(B))},setConfig(e){var t,s;Ie.initialize(),w.setChains(e.chains),w.setIsAuth(!!e.enableAuthMode),w.setIsCustomMobile(!!((t=e.mobileWallets)!=null&&t.length)),w.setIsCustomDesktop(!!((s=e.desktopWallets)!=null&&s.length)),p.setModalVersionInStorage(),Object.assign(B,e)}};var Ee=Object.defineProperty,se=Object.getOwnPropertySymbols,Le=Object.prototype.hasOwnProperty,Oe=Object.prototype.propertyIsEnumerable,ne=(e,t,s)=>t in e?Ee(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s,We=(e,t)=>{for(var s in t||(t={}))Le.call(t,s)&&ne(e,s,t[s]);if(se)for(var s of se(t))Oe.call(t,s)&&ne(e,s,t[s]);return e};const q="https://explorer-api.walletconnect.com",G="wcm",X="js-2.6.2";async function K(e,t){const s=We({sdkType:G,sdkVersion:X},t),r=new URL(e,q);return r.searchParams.append("projectId",T.state.projectId),Object.entries(s).forEach(([l,c])=>{c&&r.searchParams.append(l,String(c))}),(await fetch(r)).json()}const _={async getDesktopListings(e){return K("/w3m/v1/getDesktopListings",e)},async getMobileListings(e){return K("/w3m/v1/getMobileListings",e)},async getInjectedListings(e){return K("/w3m/v1/getInjectedListings",e)},async getAllListings(e){return K("/w3m/v1/getAllListings",e)},getWalletImageUrl(e){return`${q}/w3m/v1/getWalletImage/${e}?projectId=${T.state.projectId}&sdkType=${G}&sdkVersion=${X}`},getAssetImageUrl(e){return`${q}/w3m/v1/getAssetImage/${e}?projectId=${T.state.projectId}&sdkType=${G}&sdkVersion=${X}`}};var Ce=Object.defineProperty,oe=Object.getOwnPropertySymbols,Ae=Object.prototype.hasOwnProperty,je=Object.prototype.propertyIsEnumerable,re=(e,t,s)=>t in e?Ce(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s,Me=(e,t)=>{for(var s in t||(t={}))Ae.call(t,s)&&re(e,s,t[s]);if(oe)for(var s of oe(t))je.call(t,s)&&re(e,s,t[s]);return e};const ie=p.isMobile(),L=j({wallets:{listings:[],total:0,page:1},search:{listings:[],total:0,page:1},recomendedWallets:[]}),Re={state:L,async getRecomendedWallets(){const{explorerRecommendedWalletIds:e,explorerExcludedWalletIds:t}=T.state;if(e==="NONE"||t==="ALL"&&!e)return L.recomendedWallets;if(p.isArray(e)){const s={recommendedIds:e.join(",")},{listings:r}=await _.getAllListings(s),l=Object.values(r);l.sort((c,m)=>{const f=e.indexOf(c.id),W=e.indexOf(m.id);return f-W}),L.recomendedWallets=l}else{const{chains:s,isAuth:r}=w.state,l=s==null?void 0:s.join(","),c=p.isArray(t),m={page:1,sdks:r?"auth_v1":void 0,entries:p.RECOMMENDED_WALLET_AMOUNT,chains:l,version:2,excludedIds:c?t.join(","):void 0},{listings:f}=ie?await _.getMobileListings(m):await _.getDesktopListings(m);L.recomendedWallets=Object.values(f)}return L.recomendedWallets},async getWallets(e){const t=Me({},e),{explorerRecommendedWalletIds:s,explorerExcludedWalletIds:r}=T.state,{recomendedWallets:l}=L;if(r==="ALL")return L.wallets;l.length?t.excludedIds=l.map(I=>I.id).join(","):p.isArray(s)&&(t.excludedIds=s.join(",")),p.isArray(r)&&(t.excludedIds=[t.excludedIds,r].filter(Boolean).join(",")),w.state.isAuth&&(t.sdks="auth_v1");const{page:c,search:m}=e,{listings:f,total:W}=ie?await _.getMobileListings(t):await _.getDesktopListings(t),n=Object.values(f),g=m?"search":"wallets";return L[g]={listings:[...L[g].listings,...n],total:W,page:c??1},{listings:n,total:W}},getWalletImageUrl(e){return _.getWalletImageUrl(e)},getAssetImageUrl(e){return _.getAssetImageUrl(e)},resetSearch(){L.search={listings:[],total:0,page:1}}},k=j({open:!1}),F={state:k,subscribe(e){return D(k,()=>e(k))},async open(e){return new Promise(t=>{const{isUiLoaded:s,isDataLoaded:r}=w.state;if(p.removeWalletConnectDeepLink(),w.setWalletConnectUri(e==null?void 0:e.uri),w.setChains(e==null?void 0:e.chains),de.reset("ConnectWallet"),s&&r)k.open=!0,t();else{const l=setInterval(()=>{const c=w.state;c.isUiLoaded&&c.isDataLoaded&&(clearInterval(l),k.open=!0,t())},200)}})},close(){k.open=!1}};var _e=Object.defineProperty,ae=Object.getOwnPropertySymbols,Ue=Object.prototype.hasOwnProperty,De=Object.prototype.propertyIsEnumerable,le=(e,t,s)=>t in e?_e(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s,Pe=(e,t)=>{for(var s in t||(t={}))Ue.call(t,s)&&le(e,s,t[s]);if(ae)for(var s of ae(t))De.call(t,s)&&le(e,s,t[s]);return e};function Se(){return typeof matchMedia<"u"&&matchMedia("(prefers-color-scheme: dark)").matches}const R=j({themeMode:Se()?"dark":"light"}),ce={state:R,subscribe(e){return D(R,()=>e(R))},setThemeConfig(e){const{themeMode:t,themeVariables:s}=e;t&&(R.themeMode=t),s&&(R.themeVariables=Pe({},s))}},U=j({open:!1,message:"",variant:"success"}),Ve={state:U,subscribe(e){return D(U,()=>e(U))},openToast(e,t){U.open=!0,U.message=e,U.variant=t},closeToast(){U.open=!1}};class ke{constructor(t){this.openModal=F.open,this.closeModal=F.close,this.subscribeModal=F.subscribe,this.setTheme=ce.setThemeConfig,ce.setThemeConfig(t),T.setConfig(t),this.initUi()}async initUi(){if(typeof window<"u"){await fe(()=>import("./index-Dnaj_-u5.js"),__vite__mapDeps([0,1,2]));const t=document.createElement("wcm-modal");document.body.insertAdjacentElement("beforeend",t),w.setIsUiLoaded(!0)}}}const $e=Object.freeze(Object.defineProperty({__proto__:null,WalletConnectModal:ke},Symbol.toStringTag,{value:"Module"}));export{Ie as R,de as T,p as a,$e as i,ce as n,Ve as o,w as p,F as s,Re as t,T as y};