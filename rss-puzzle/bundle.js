(()=>{"use strict";var n={263:(n,e,t)=>{t.d(e,{A:()=>l});var o=t(601),r=t.n(o),a=t(314),i=t.n(a)()(r());i.push([n.id,"html {\n  font: 1em sans-serif;\n}\n\n#login-form {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  margin-top: 20vh;\n  gap: 10px;\n}\n\n.button__main {\n  padding: 10px 20px;\n  margin-top: 10px;\n  width: 165px;\n  color: white;\n  border-radius: 8px;\n}\n\n.login__header {\n  font-size: 1.3em;\n  font-weight: bold;\n}\n\n.login__input {\n  padding: 10px 20px;\n}\n\n#login-form * {\n  width: 20vw;\n}\n\ninput:focus {\n  background-color: transparent !important;\n  outline: none;\n}\n\n.error-message {\n  font: 0.8em sans-serif;\n}\n",""]);const l=i},310:(n,e,t)=>{t.d(e,{A:()=>h});var o=t(601),r=t.n(o),a=t(314),i=t.n(a),l=t(417),c=t.n(l),s=new URL(t(11),t.b),d=new URL(t(533),t.b),u=new URL(t(598),t.b),p=i()(r()),m=c()(s),g=c()(d),f=c()(u);p.push([n.id,`#sentence-container {\n  display: flex;\n  width: 743px;\n  justify-content: space-between;\n  justify-items: center;\n  align-items: center;\n}\n\n/* .word {\n  background-color: cadetblue;\n  border-radius: 5px;\n  padding: 10px;\n  margin: 0 5px;\n  cursor: pointer;\n} */\n\n.word:hover {\n  background-color: rgba(9, 40, 11, 0.5);\n}\n\n#main-page {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 743px;\n  margin: 0 auto;\n}\n\n#result-block {\n  background-color: rgb(232, 232, 232);\n  display: flex;\n  width: 743px;\n  height: 43px;\n  order: 11;\n\n  justify-content: space-between;\n}\n\n#next-sentence-button {\n  margin-top: -43px;\n  padding: 10px 20px;\n  font-size: 1.2em;\n  background-color: green;\n  color: #fff;\n  border: none;\n  border-radius: 5px;\n  cursor: pointer;\n  order: 2;\n  visibility: hidden;\n  height: 45px;\n}\n\n#check-sentence-button {\n  margin-top: 30px;\n  padding: 10px 20px;\n  font-size: 1.2em;\n  background-color: black;\n  color: #fff;\n  border: none;\n  border-radius: 5px;\n  cursor: pointer;\n  order: 1;\n}\n\n#next-sentence-button:disabled {\n  background-color: #ccc;\n  color: #666;\n  cursor: not-allowed;\n}\n\n#check-sentence-button:disabled {\n  background-color: #ccc;\n  color: #666;\n  cursor: not-allowed;\n}\n\n#auto-complete-button {\n  margin-bottom: 15px;\n  padding: 10px 20px;\n  font-size: 1.2em;\n  background-color: rgb(107, 71, 161);\n  color: #fff;\n  border: none;\n  border-radius: 5px;\n  cursor: pointer;\n}\n\n#translation {\n  margin-bottom: 20px;\n}\n\n#toggle-translation-button {\n  border-radius: 5px;\n  background-color: rgb(156, 150, 253);\n  color: white;\n  padding: 5px 10px;\n  margin-bottom: 10px;\n}\n\n#numberSelect {\n  margin-bottom: 10px;\n  width: 133px;\n}\n\n#completed-sentences-container {\n  display: flex;\n  flex-wrap: wrap;\n  width: 743px;\n  height: 445px;\n  background-color: aquamarine;\n  align-content: flex-start;\n  margin-bottom: 20px;\n  outline: 1px solid black;\n}\n\n/* #completed-sentences-container::before {\n content: "";\n position: absolute;\n top: 0;\n left: 0;\n width: 100%;\n height: 100%;\n background-color: rgba(0, 0, 0, 0.5);\n z-index: 1; \n} */\n\n.sentence-line {\n  display: flex;\n  width: 743px;\n  height: fit-content;\n  justify-content: space-between;\n}\n\n.sentence-line .word {\n  color: white;\n  flex-grow: 1;\n}\n\n.word {\n  background-color: rgba(9, 40, 11, 0.3);\n  /* padding: 10px; */\n  /* margin: 0 5px; */\n  cursor: pointer;\n\n  /* width: 148px; */\n  /* width: fit-content; */\n  height: 43px !important;\n  /* background: url('middletransparent.png') no-repeat; */\n\n  background-size: 100% 100%;\n  mask: url(${m}) no-repeat;\n  mask-size: 100% 100%;\n  text-align: center;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  /* margin-left: -14px; */\n  border: 1px solid black;\n  /* padding-right: 14px; */\n}\n\n.last-word {\n  /* background: url('endtransparent.png') no-repeat;\n  background-size: 100% 100%; */\n\n  mask: url(${g}) no-repeat;\n  mask-size: 100% 100%;\n}\n\n.first-word {\n  /* background: url('starttransparent.png') no-repeat;\n  background-size: 100% 100%; */\n  mask: url(${f}) no-repeat;\n  mask-size: 100% 100%;\n}\n\n/* .few-words {\n  width: 200px !important;\n}\n\n.five-words {\n  width: 200px !important;\n} */\n\n.wordPlaceholder {\n  width: fit-content;\n  background-color: rgba(224, 120, 45, 0.215);\n  height: 43px;\n  min-width: 30px;\n}\n\n.resultPlaceholder {\n  width: fit-content;\n  background-color: rgb(207, 213, 32);\n  height: 43px;\n  min-width: 30px;\n  order: 11;\n}\n\n.not-droppable {\n  background-color: rgba(116, 30, 27, 0.751);\n}\n\n.alpha {\n  width: 100%;\n  height: 100%;\n  background-color: white;\n  order: 12;\n}\n\n.sentence-line .word:hover {\n  background-color: rgba(9, 40, 11, 0.3);\n}\n\n/* Стили для модального окна */\n.modal {\n  display: hidden;\n  position: fixed;\n  z-index: 1;\n  padding-top: 100px;\n  width: 100%;\n  height: 100%;\n  background-color: white;\n}\n\n.modal-content {\n  display: flex;\n  flex-direction: column;\n  align-content: center;\n  justify-content: center;\n  align-items: center;\n  background-color: white;\n  margin: 0 100px;\n  border-radius: 40px;\n  background-color: rgb(237, 237, 212);\n}\n\n.close {\n  margin-top: 30px;\n  padding: 10px 20px;\n  font-size: 1.2em;\n  background-color: black;\n  color: #fff;\n  border: none;\n  border-radius: 5px;\n  cursor: pointer;\n}\n\n.unknown {\n  color: rgb(95, 15, 15);\n}\n\n.known {\n  color: rgb(26, 70, 26);\n}\n\n@media (max-width: 849px) {\n  #completed-sentences-container {\n    width: 646px;\n  }\n\n  .sentence-line {\n    width: 646px;\n  }\n\n  #sentence-container {\n    width: 646px;\n  }\n\n  #result-block {\n    width: 646px;\n  }\n}\n`,""]);const h=p},439:(n,e,t)=>{t.d(e,{A:()=>l});var o=t(601),r=t.n(o),a=t(314),i=t.n(a)()(r());i.push([n.id,"#start-screen {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 90vh;\n  color: #000000;\n  text-align: center;\n}\n\n.app-name {\n  font-size: 2em;\n  font-family: 'Your Game Font', sans-serif;\n  margin-bottom: 20px;\n}\n\n.game-description {\n  font-size: 1em;\n  margin-bottom: 30px;\n}\n\n.start-button {\n  padding: 10px 20px;\n  font-size: 1.2em;\n  background-color: black;\n  color: #fff;\n  border: none;\n  border-radius: 5px;\n  cursor: pointer;\n}\n\n.start-button:hover {\n  transform: scale(1.1);\n  background-color: #333;\n  transition:\n    transform 0.5s ease,\n    background-color 0.3s ease;\n}\n\n.start-button:active {\n  transform: scale(1);\n  background-color: #555;\n  transition: transform 1s ease;\n}\n\n.greeting {\n  position: fixed;\n  top: 0;\n  left: 0;\n  font-size: 1em;\n  color: #000000;\n  text-align: center;\n  margin-top: 20px;\n  padding-left: 20px;\n}\n\n.logout-button {\n  padding: 10px 20px;\n  font-size: 1.2em;\n  color: black;\n  border: solid 1px black;\n  border-radius: 5px;\n  cursor: pointer;\n  position: fixed;\n  top: 0;\n  right: 0;\n  margin-top: 20px;\n  margin-right: 20px;\n}\n\n.logout-button:hover {\n  background-color: rgb(122, 122, 122);\n  border: solid 1px black;\n  border-radius: 5px;\n  transition: background-color 0.3s ease;\n}\n",""]);const l=i},314:n=>{n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t="",o=void 0!==e[5];return e[4]&&(t+="@supports (".concat(e[4],") {")),e[2]&&(t+="@media ".concat(e[2]," {")),o&&(t+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),t+=n(e),o&&(t+="}"),e[2]&&(t+="}"),e[4]&&(t+="}"),t})).join("")},e.i=function(n,t,o,r,a){"string"==typeof n&&(n=[[null,n,void 0]]);var i={};if(o)for(var l=0;l<this.length;l++){var c=this[l][0];null!=c&&(i[c]=!0)}for(var s=0;s<n.length;s++){var d=[].concat(n[s]);o&&i[d[0]]||(void 0!==a&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=a),t&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=t):d[2]=t),r&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=r):d[4]="".concat(r)),e.push(d))}},e}},417:n=>{n.exports=function(n,e){return e||(e={}),n?(n=String(n.__esModule?n.default:n),/^['"].*['"]$/.test(n)&&(n=n.slice(1,-1)),e.hash&&(n+=e.hash),/["'() \t\n]|(%20)/.test(n)||e.needQuotes?'"'.concat(n.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):n):n}},601:n=>{n.exports=function(n){return n[1]}},72:n=>{var e=[];function t(n){for(var t=-1,o=0;o<e.length;o++)if(e[o].identifier===n){t=o;break}return t}function o(n,o){for(var a={},i=[],l=0;l<n.length;l++){var c=n[l],s=o.base?c[0]+o.base:c[0],d=a[s]||0,u="".concat(s," ").concat(d);a[s]=d+1;var p=t(u),m={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==p)e[p].references++,e[p].updater(m);else{var g=r(m,o);o.byIndex=l,e.splice(l,0,{identifier:u,updater:g,references:1})}i.push(u)}return i}function r(n,e){var t=e.domAPI(e);return t.update(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap&&e.supports===n.supports&&e.layer===n.layer)return;t.update(n=e)}else t.remove()}}n.exports=function(n,r){var a=o(n=n||[],r=r||{});return function(n){n=n||[];for(var i=0;i<a.length;i++){var l=t(a[i]);e[l].references--}for(var c=o(n,r),s=0;s<a.length;s++){var d=t(a[s]);0===e[d].references&&(e[d].updater(),e.splice(d,1))}a=c}}},659:n=>{var e={};n.exports=function(n,t){var o=function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}e[n]=t}return e[n]}(n);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(t)}},540:n=>{n.exports=function(n){var e=document.createElement("style");return n.setAttributes(e,n.attributes),n.insert(e,n.options),e}},56:(n,e,t)=>{n.exports=function(n){var e=t.nc;e&&n.setAttribute("nonce",e)}},825:n=>{n.exports=function(n){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=n.insertStyleElement(n);return{update:function(t){!function(n,e,t){var o="";t.supports&&(o+="@supports (".concat(t.supports,") {")),t.media&&(o+="@media ".concat(t.media," {"));var r=void 0!==t.layer;r&&(o+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),o+=t.css,r&&(o+="}"),t.media&&(o+="}"),t.supports&&(o+="}");var a=t.sourceMap;a&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),e.styleTagTransform(o,n,e.options)}(e,n,t)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(e)}}}},113:n=>{n.exports=function(n,e){if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}},533:(n,e,t)=>{n.exports=t.p+"bc8cd20123293c9a3846.png"},11:(n,e,t)=>{n.exports=t.p+"43053401555e97da83fe.png"},598:(n,e,t)=>{n.exports=t.p+"3755fbd78d8b5e961f9d.png"}},e={};function t(o){var r=e[o];if(void 0!==r)return r.exports;var a=e[o]={id:o,exports:{}};return n[o](a,a.exports,t),a.exports}t.m=n,t.n=n=>{var e=n&&n.__esModule?()=>n.default:()=>n;return t.d(e,{a:e}),e},t.d=(n,e)=>{for(var o in e)t.o(e,o)&&!t.o(n,o)&&Object.defineProperty(n,o,{enumerable:!0,get:e[o]})},t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"==typeof window)return window}}(),t.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),(()=>{var n;t.g.importScripts&&(n=t.g.location+"");var e=t.g.document;if(!n&&e&&(e.currentScript&&(n=e.currentScript.src),!n)){var o=e.getElementsByTagName("script");if(o.length)for(var r=o.length-1;r>-1&&(!n||!/^http(s?):/.test(n));)n=o[r--].src}if(!n)throw new Error("Automatic publicPath is not supported in this browser");n=n.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=n})(),t.b=document.baseURI||self.location.href,t.nc=void 0,(()=>{var n=t(72),e=t.n(n),o=t(825),r=t.n(o),a=t(659),i=t.n(a),l=t(56),c=t.n(l),s=t(540),d=t.n(s),u=t(113),p=t.n(u),m=t(263),g={};g.styleTagTransform=p(),g.setAttributes=c(),g.insert=i().bind(null,"head"),g.domAPI=r(),g.insertStyleElement=d(),e()(m.A,g),m.A&&m.A.locals&&m.A.locals;var f=t(439),h={};h.styleTagTransform=p(),h.setAttributes=c(),h.insert=i().bind(null,"head"),h.domAPI=r(),h.insertStyleElement=d(),e()(f.A,h),f.A&&f.A.locals&&f.A.locals;var b=t(310),v={};v.styleTagTransform=p(),v.setAttributes=c(),v.insert=i().bind(null,"head"),v.domAPI=r(),v.insertStyleElement=d(),e()(b.A,v),b.A&&b.A.locals&&b.A.locals;var y,x=0,w="",E="",k=0,C=90,I="https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/data/wordCollectionLevel1.json",L=[],S=[],B=["9th_wave","abbati2","arabs","campo","citywall","coastal","deerhunt","deerlake","distress","edgewood","extensiv","extensiv_1","firework","fishing","giuseppe","ice_land","italiana","italianb","kilarney","landmose","landsca3","landscap","landscap_1","landscap_2","railway","rateship","river_la","riverla2","rome","rome1","scene","shipcalm","shipping","shipping_1","skating","tivoli","vessels1","view_stp","viewvien","viewvlaa","waterfal","winter_l","winterla","winterla_1","woodedla"],A=function(){function n(){this.sentences=[],this.render()}return n.prototype.render=function(){var n=this;document.getElementById("app").innerHTML='\n        <div id="main-page">\n        <div id="translation"></div>\n        <button id="toggle-translation-button">Показать перевод</button>\n        <select id="numberSelect">\n        <option>1</option>\n        <option>2</option>\n        <option>3</option>\n        <option>4</option>\n        <option>5</option>\n        <option>6</option>\n        </select>\n        <div id="completed-sentences-container">\n        <div id="result-block"></div>\n        <div class="alpha"></div>\n        </div>\n        <button id="auto-complete-button">Auto-Complete</button>\n        <div id="sentence-container" class="container"></div>\n        <button id="next-sentence-button">Continue</button>\n        <button id="check-sentence-button">Check</button>\n        </div>\n    ',T().then((function(n){return j(y=n)})).then((function(e){return n.sentences=e,z(y),P()})).then((function(n){D(y)}));var e=document.getElementById("result-block");e.id="result-block",e.classList.add("container"),document.getElementById("next-sentence-button").addEventListener("click",(function(){!function(n){++x%10==0&&(k++,x=0,_()),C-=10;var e=document.getElementById("check-sentence-button");document.getElementById("next-sentence-button").style.visibility="visible",e.disabled=!0,e.textContent="Check",e.style.backgroundColor="#ccc",e.style.visibility="visible",x<n.rounds.length?(z(n),D(n)):console.log("No more sentences to display");var t=document.getElementById("completed-sentences-container"),o=document.getElementById("result-block");if(t&&o){var r=document.createElement("div");for(r.classList.add("sentence-line");o.firstChild;)r.appendChild(o.firstChild);if(t.appendChild(r),x%10==0){console.log("хоба");var a=document.createElement("div");a.classList.add("modal"),document.body.insertBefore(a,document.body.firstChild);var i=document.createElement("div");i.classList.add("modal-content");var l=document.createElement("span");l.classList.add("close"),l.textContent="Continue",l.onclick=function(){a.style.display="none",L.length=0,S.length=0};var c=document.createElement("h2");c.textContent="Congrats!";var s=document.createElement("h4");s.classList.add("known"),s.textContent="Known:";var d=document.createElement("div");d.id="manualSentencesContainer";var u=document.createElement("h4");u.classList.add("unknown"),u.textContent="Unknown:";var p=document.createElement("div");p.id="autoCompleteSentencesContainer",L.forEach((function(n){var e=document.createElement("p");e.textContent=n,d.appendChild(e)})),S.forEach((function(n){var e=document.createElement("p");e.textContent=n,p.appendChild(e)})),i.appendChild(c),i.appendChild(s),i.appendChild(d),i.appendChild(u),i.appendChild(p),i.appendChild(l),a.appendChild(i),a&&(a.style.display="block",console.log(L,S)),console.log("все жестко удалено"),t.querySelectorAll(".sentence-line").forEach((function(n){t.removeChild(n)})),C=90,console.log("".concat(C))}}var m=document.querySelector(".alpha");m&&(m.style.height="".concat(C,"%")),U()}(y)}));var t=document.getElementById("next-sentence-button");t.disabled=!0,t.style.visibility="hidden",t.addEventListener("click",(function(){e&&(t.disabled=!0,t.style.visibility="hidden")})),document.getElementById("check-sentence-button").disabled=!0,t.style.visibility="hidden",document.getElementById("auto-complete-button").addEventListener("click",M),document.getElementById("toggle-translation-button").addEventListener("click",(function(){var n=document.querySelector(".translation-hint"),e=document.getElementById("toggle-translation-button");if(n){var t="none"!==n.style.display;n.style.display=t?"none":"block",e.textContent=t?"Показать перевод":"Скрыть перевод"}}));var o=document.getElementById("completed-sentences-container");o&&(console.log("КАРТИНКА"),_(),o.style.backgroundRepeat="no-repeat",o.style.backgroundSize="cover",o.style.backgroundPosition="center");var r=document.getElementById("numberSelect");r.addEventListener("change",(function(){var e=r.value;if(e){I="https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/data/wordCollectionLevel".concat(e,".json"),console.log("Selected data URL:",I),T().then((function(n){return j(y=n)})).then((function(e){return n.sentences=e,z(y),P()})).then((function(n){D(y)})),o.querySelectorAll(".sentence-line").forEach((function(n){o.removeChild(n)})),C=100;var t=document.querySelector(".alpha");t&&(t.style.height="".concat(100,"%")),k=1,x=0}}))},n.prototype.getSentences=function(){return this.sentences},n}();function T(){return n=this,e=void 0,o=function(){var n,e;return function(n,e){var t,o,r,a,i={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return a={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function l(l){return function(c){return function(l){if(t)throw new TypeError("Generator is already executing.");for(;a&&(a=0,l[0]&&(i=0)),i;)try{if(t=1,o&&(r=2&l[0]?o.return:l[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,l[1])).done)return r;switch(o=0,r&&(l=[2&l[0],r.value]),l[0]){case 0:case 1:r=l;break;case 4:return i.label++,{value:l[1],done:!1};case 5:i.label++,o=l[1],l=[0];continue;case 7:l=i.ops.pop(),i.trys.pop();continue;default:if(!((r=(r=i.trys).length>0&&r[r.length-1])||6!==l[0]&&2!==l[0])){i=0;continue}if(3===l[0]&&(!r||l[1]>r[0]&&l[1]<r[3])){i.label=l[1];break}if(6===l[0]&&i.label<r[1]){i.label=r[1],r=l;break}if(r&&i.label<r[2]){i.label=r[2],i.ops.push(l);break}r[2]&&i.ops.pop(),i.trys.pop();continue}l=e.call(n,i)}catch(n){l=[6,n],o=0}finally{t=r=0}if(5&l[0])throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}([l,c])}}}(this,(function(t){switch(t.label){case 0:return t.trys.push([0,3,,4]),[4,fetch(I)];case 1:if(!(n=t.sent()).ok)throw new Error("HTTP error! status: ".concat(n.status));return[4,n.json()];case 2:return y=t.sent(),console.log("Fetched data:",y),[2,y];case 3:return e=t.sent(),console.error("Error fetching word data:",e),[3,4];case 4:return[2]}}))},new((t=void 0)||(t=Promise))((function(r,a){function i(n){try{c(o.next(n))}catch(n){a(n)}}function l(n){try{c(o.throw(n))}catch(n){a(n)}}function c(n){var e;n.done?r(n.value):(e=n.value,e instanceof t?e:new t((function(n){n(e)}))).then(i,l)}c((o=o.apply(n,e||[])).next())}));var n,e,t,o}function _(){var n=document.getElementById("completed-sentences-container");if(n){var e="https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/images/level1/".concat(B[k],".jpg");n.style.backgroundImage="url('".concat(e,"')"),k=(k+1)%B.length}}function z(n){var e,t,o=document.getElementById("sentence-container");if(document.getElementById("result-block"),document.getElementById("auto-complete-button"),o){w=(null===(t=null===(e=n.rounds[k-1])||void 0===e?void 0:e.words[x])||void 0===t?void 0:t.textExample)||"",E=w;var r=w.split(" "),a=function(n){for(var e,t,o=n.length,r=n.slice();0!==o;)t=Math.floor(Math.random()*o),e=r[o-=1],r[o]=r[t],r[t]=e;return r}(function(n,e,t){if(t||2===arguments.length)for(var o,r=0,a=e.length;r<a;r++)!o&&r in e||(o||(o=Array.prototype.slice.call(e,0,r)),o[r]=e[r]);return n.concat(o||Array.prototype.slice.call(e))}([],r,!0));o.innerHTML="";var i=r.length<=4,l=5==r.length;a.forEach((function(n){var e=document.createElement("div");e.classList.add("wordPlaceholder");var t=document.createElement("div");t.textContent=n,t.classList.add("word"),t.setAttribute("data-original-parent",o.id),t.addEventListener("click",N),t.draggable=!0,t.style.width=q(n,E),n===r[0]&&t.classList.add("first-word"),n===r[r.length-1]&&t.classList.add("last-word"),i&&t.classList.add("few-words"),l&&t.classList.add("five-words"),o.appendChild(e),e.appendChild(t)})),document.querySelector(".translation-hint"),document.getElementById("toggle-translation-button").textContent="Показать перевод"}else console.error('Element with ID "sentence-container" not found')}var q=function(n,e){var t=e.length,o=n.length,r=document.querySelector("#completed-sentences-container").offsetWidth,a=o/t,i=Math.round(10*a)/10,l=parseFloat((r*i).toFixed(1));return"".concat(l+15,"px")};function M(){var n=document.getElementById("result-block"),e=document.getElementById("sentence-container"),t=document.getElementById("next-sentence-button");if(document.getElementById("auto-complete-button"),t.style.visibility="visible",t.style.backgroundColor="black",n){n.innerHTML="",e.innerHTML="";var o=E.split(" ");S.push(E);var r=o.length<=4,a=5==o.length;o.forEach((function(e){var t=document.createElement("div");t.textContent=e,t.classList.add("word"),t.style.width=q(e,E),n.appendChild(t),e===o[0]&&t.classList.add("first-word"),e===o[o.length-1]&&t.classList.add("last-word"),r&&t.classList.add("few-words"),a&&t.classList.add("five-words")})),document.getElementById("check-sentence-button").style.visibility="hidden",document.getElementById("next-sentence-button").disabled=!1,document.getElementById("toggle-translation-button").textContent="Скрыть перевод",document.querySelector(".translation-hint").style.display="block"}}function N(n){var e,t=n.target,o=document.getElementById("result-block"),r=document.getElementById("check-sentence-button");if(o&&t)if(r.textContent="Check",o.contains(t)){var a=Array.from(document.querySelectorAll("#sentence-container .wordPlaceholder")).find((function(n){return 0===n.children.length}));a&&a.appendChild(t)}else t.setAttribute("data-original-parent",(null===(e=t.parentElement)||void 0===e?void 0:e.id)||""),o.appendChild(t);var i=document.getElementById("sentence-container");Array.from(i.querySelectorAll(".wordPlaceholder")).every((function(n){return 0===n.children.length}))?(r.style.backgroundColor="black",r.disabled=!1,function(){var n=function(n){var e=document.getElementById("result-block");if(!e)return console.error('Element with ID "result-block" not found'),!1;var t=Array.from(e.children).map((function(n){return n.textContent})),o=n.split(" ");if(t.length!==o.length)return console.log("Количество слов не совпадает"),!1;for(var r=0;r<t.length;r++)if(t[r]!==o[r])return console.log("Порядок слов не совпадает"),!1;return console.log("Порядок слов совпадает"),!0}(w),e=document.getElementById("check-sentence-button"),t=(document.getElementById("auto-complete-button"),document.getElementById("sentence-container"));if(Array.from(t.querySelectorAll(".wordPlaceholder")).every((function(n){return 0===n.children.length}))){console.log("sentence-container пустой");var o=document.getElementById("next-sentence-button");e.disabled=!1,e.addEventListener("click",(function(){if(n){e.textContent="Correct",L.push(w);var t=document.querySelector(".translation-hint");t&&(t.style.display="block"),o.disabled=!1,e.style.backgroundColor="green",o.style.visibility="visible",o.style.backgroundColor="green"}else e.textContent="Incorrect. Try again",e.style.backgroundColor="red",o.style.visibility="hidden"}))}}()):(r.disabled=!0,document.getElementById("next-sentence-button").style.visibility="hidden",r.style.backgroundColor="#ccc")}function j(n){var e=[];return n.rounds.forEach((function(n){n.words.forEach((function(n){e.push(n.textExample)}))})),console.log(e),e}function P(){var n=[];return y.rounds.forEach((function(e){e.words.forEach((function(e){n.push(e.textExampleTranslate)}))})),console.log(n),n}function D(n){var e,t,o=document.getElementById("toggle-translation-button"),r=document.createElement("span");r.classList.add("translation-hint"),r.style.display="none",r&&("Скрыть перевод"===o.textContent?r.style.display="block":r.style.display="none",o.textContent="Показать перевод"===o.textContent?"Показать перевод":"Скрыть перевод"),console.log(x,k);var a=(null===(t=null===(e=n.rounds[k-1])||void 0===e?void 0:e.words[x])||void 0===t?void 0:t.textExampleTranslate)||"";console.log(a),r.textContent=a;var i=document.getElementById("translation");i?(i.innerHTML="",i.appendChild(r)):console.error('Element with ID "translation" not found')}function U(){var n=document.querySelectorAll(".word"),e=document.querySelectorAll(".container"),t=document.getElementById("result-block"),o=document.querySelectorAll(".wordPlaceholder");n.length>0&&e.length>0?(t&&(t.ondragover=H,o.forEach((function(n){n.ondragover=H}))),t.ondragenter=function(n){},n.forEach((function(n){n.id="word-".concat(n.textContent),n.ondragstart=F})),t.ondrop=R,o.forEach((function(n){n.ondrop=R}))):setTimeout(U,100)}var H=function(n){n.preventDefault()};function F(n){n.dataTransfer.setData("id",n.target.id)}function R(n){var e=n.dataTransfer.getData("id"),t=document.getElementById(e),o=n.target;if(console.log(o),o.classList.contains("word"))return console.error('Элемент с классом "word" не может быть целевым элементом'),t.classList.add("not-droppable"),void setTimeout((function(){t.classList.remove("not-droppable")}),1e3);o.contains(t)?console.error("Куда сам на себя тянешь"):(o.append(t),console.log(o))}U();const $=A;const O=function(){function n(){this.render(),this.addEventListeners()}return n.prototype.render=function(){var n=function(){var n=localStorage.getItem("userData");if(n){var e=JSON.parse(n),t=e.firstName,o=e.surname;return"".concat(t," ").concat(o)}return null}(),e="";n&&(e='<p class="greeting">Welcome back, '.concat(n,"!</p>"));var t='\n      <div id="start-screen">\n        <header class="start__header">\n          <h1 class="app-name">RSS Puzzle</h1>\n          <p class="game-description">\n            Unlock English grammar mastery one puzzle piece at a time with our innovative learning app!\n          </p>\n        </header>\n        <button class="logout-button">Logout</button>\n        '.concat(e,'\n        <button class="start-button">Start Learning</button>\n      </div>\n    ');document.getElementById("app").innerHTML=t},n.prototype.addEventListeners=function(){var n=document.querySelector(".start-button");n&&n.addEventListener("click",(function(){new $}));var e=document.querySelector(".logout-button");e&&e.addEventListener("click",(function(){localStorage.removeItem("userData"),new W}))},n}();function J(n){if(""!==n.value.trim())return/^[A-Za-z-]+$/.test(n.value)?"firstName"===n.id&&(n.value.length<3||n.value[0]!==n.value[0].toUpperCase())||"surname"===n.id&&n.value.length<4?(n.style.borderColor="red",!1):(n.style.borderColor="green",!0):(n.style.borderColor="red",!1)}const W=function(){function n(){this.render(),this.addEventListeners()}return n.prototype.render=function(){document.getElementById("app").innerHTML='\n            <form id="login-form">\n                <p class="login__header">Welcome!</p>\n                <input class="login__input" type="text" id="firstName" name="firstName" placeholder="First name" required>\n                <span id="firstNameError" class="error-message"></span>\n                <input class="login__input" type="text" id="surname" name="surname" placeholder="Last name" required>\n                <span id="surnameError" class="error-message"></span>\n                <button class="button__main submit-button" type="submit">Login</button>\n            </form>\n        '},n.prototype.addEventListeners=function(){var n=document.querySelectorAll("#login-form input"),e=document.querySelector(".submit-button"),t=document.getElementById("firstNameError"),o=document.getElementById("surnameError"),r=document.getElementById("login-form");r&&r.addEventListener("submit",(function(n){n.preventDefault();var e=document.getElementById("firstName"),t=document.getElementById("surname"),o=J(e),r=J(t);if(o&&r){var a={firstName:e.value,surname:t.value};localStorage.setItem("userData",JSON.stringify(a)),console.log("User Data: ".concat(localStorage.getItem("userData"))),new O}else console.log("Validation failed. Data not saved.")}));var a=function(){var n=!0,r=!0,a=!0,i=document.querySelectorAll("#login-form input");i.forEach((function(e){var t=J(e);console.log("Input value: ".concat(e.value,", Validity: ").concat(t)),t||(n=!1)})),Array.from(i).some((function(n){return""!==n.value.trim()}));var l=/^[A-Za-z-]+$/;l.test(document.getElementById("firstName").value)?t.textContent="":(r=!1,t.textContent="Only English alphabet letters and hyphen are allowed."),l.test(document.getElementById("surname").value)?o.textContent="":(a=!1,o.textContent="Only English alphabet letters and hyphen are allowed.");var c=document.getElementById("firstName").value;c&&c[0]!==c[0].toUpperCase()&&(r=!1,t.textContent="The first letter must be uppercase.");var s=document.getElementById("surname").value;s&&s[0]!==s[0].toUpperCase()&&(a=!1,o.textContent="The first letter must be uppercase."),document.getElementById("firstName").value.length<3&&(r=!1,t.textContent="First name must be at least 3 characters long."),document.getElementById("surname").value.length<4&&(a=!1,o.textContent="Surname must be at least 4 characters long."),document.querySelectorAll(".login__input"),i.forEach((function(n){n.addEventListener("input",(function(){J(n)}))})),n&&r&&a&&e?(e.style.backgroundColor="black",e.style.color="white",e.disabled=!1):e&&(e.style.backgroundColor="darkgrey",e.style.color="black",e.disabled=!0)};n.forEach((function(n){n.addEventListener("input",a)})),a()},n}();document.body.innerHTML='<div id="app"></div>',null!==localStorage.getItem("userData")?new O:new W})()})();
