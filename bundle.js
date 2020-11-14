(()=>{"use strict";(()=>{const e=(e,t,o,r,n)=>{const d=new XMLHttpRequest;d.responseType="json",d.timeout=1e3,d.addEventListener("load",(function(){200===d.status?r(d.response):n("Статус ответа: "+d.status+" "+d.statusText)})),d.addEventListener("error",(function(){n("Произошла ошибка соединения")})),d.addEventListener("timeout",(function(){n("Запрос не успел выполниться за "+d.timeout+"мс")})),d.open(e,t),d.send(o)};window.server={load:(t,o)=>{e("GET","https://21.javascript.pages.academy/keksobooking/data",null,t,o)},upload:(t,o,r)=>{e("POST","https://21.javascript.pages.academy/keksobooking",t,o,r)}}})(),(()=>{const e=document.querySelector("#card").content.querySelector(".popup"),t=document.querySelector(".map__filters-container"),o={flat:"Квартира",bungalow:"Бунгало",house:"Дом",palace:"Дворец"};window.card={renderPopupFragment:r=>{t.before((t=>{const r=e.cloneNode(!0);r.querySelector(".popup__title").textContent=t.offer.title,r.querySelector(".popup__text--address").textContent=t.offer.address,r.querySelector(".popup__text--price").textContent=t.offer.price+" ₽/ночь",r.querySelector(".popup__type").textContent=o[t.offer.type],r.querySelector(".popup__text--capacity").textContent=`${t.offer.rooms} комнаты для ${t.offer.guests} гостей`,r.querySelector(".popup__text--time").textContent=`Заезд после ${t.offer.checkin}, выезд до ${t.offer.checkout}`,r.querySelector(".popup__close").addEventListener("click",(()=>{r.remove()})),document.addEventListener("keydown",(e=>{27===e.keyCode&&r.remove()}));const n=r.querySelectorAll(".popup__feature");for(let e=0;e<n.length;e++){const o=n[e],r=e=>o.classList.contains("popup__feature--"+e);t.offer.features.some(r)||o.classList.add("visually-hidden")}r.querySelector(".popup__description").textContent=t.offer.description,r.querySelector(".popup__avatar").src=t.author.avatar;const d=r.querySelector(".popup__photos"),c=r.querySelector(".popup__photo"),l=document.createDocumentFragment();return t.offer.photos.forEach((e=>{const t=c.cloneNode(!0);t.src=e,t.style.width="45",t.style.height="40",t.alt="Фотография жилья",l.appendChild(t)})),d.innerHTML="",d.appendChild(l),r})(r))},closeAllPopups:()=>{document.querySelectorAll(".popup").forEach((e=>{e.remove()}))}}})(),(()=>{const e=document.querySelector(".map__pins"),t=document.querySelector("#pin").content.querySelector(".map__pin"),o=document.querySelector(".map"),r=e=>{const o=e.location.x+31,r=e.location.y+84,n=t.cloneNode(!0),d=n.querySelector("img");return n.id=e.id,n.style=`left: ${o}px; top: ${r}px;`,d.src=e.author.avatar,d.alt=e.offer.title,n},n=e=>{const t=e.target.closest(".map__pin"),o=window.form.getPinsData().find((e=>e.id===t.id)),r=document.querySelector(".map__pin--active");r&&r.classList.remove("map__pin--active"),t.classList.contains("map__pin--active")||t.classList.add("map__pin--active"),window.card.renderPopupFragment(o)};window.pin={renderPins:t=>{const o=document.createElement("div");o.classList.add("pins");const d=t.length<5?t.length:5;for(let e=0;e<d;e++){let d=r(t[e]);d.addEventListener("click",(e=>{window.card.closeAllPopups(),n(e)})),d.addEventListener("keydown",(e=>{13===e.keyCode&&(window.card.closeAllPopups(),n(e))})),o.appendChild(d)}const c=e.querySelector(".pins");c&&c.remove(),e.appendChild(o)},errorPinHandler:e=>{let t=document.createElement("div");t.classList.add("map__error-server"),t.textContent=e,o.insertAdjacentElement("afterbegin",t)}}})(),window.debounce=e=>{let t=null;return(...o)=>{t&&window.clearTimeout(t),t=window.setTimeout((()=>{e(...o)}),500)}},(()=>{const e=document.querySelector(".ad-form"),t=document.querySelector("#address"),o=document.querySelector(".map"),r=document.querySelector(".map__filters"),n=document.querySelector(".map__pin--main"),d=e.querySelector("#title"),c=e.querySelector("#room_number"),l=e.querySelector("#capacity"),s=e.querySelector("#price"),a=e.querySelector("#type"),i=e.querySelector("#timein"),u=e.querySelector("#timeout"),p=document.querySelector(".ad-form__reset"),m=document.querySelector(".map__overlay"),y=document.querySelector("#success").content.querySelector(".success"),f=document.querySelector("#error").content.querySelector(".error"),v=document.querySelector("main"),_=e.querySelectorAll("fieldset"),h={palace:{min:1e4,placeholder:"10000"},flat:{min:1e3,placeholder:"1000"},house:{min:5e3,placeholder:"5000"},bungalow:{min:0,placeholder:"0"}},q=()=>{for(let e of _)e.disabled=!0};let S=[];const w=e=>{S=e,S=e.map(((e,t)=>(e.id=""+t,e))),window.pin.renderPins(S),r.classList.remove("map__filters--disabled")},L=()=>{(()=>{for(let e of _)e.disabled=!1})(),o.classList.remove("map--faded"),e.classList.remove("ad-form--disabled"),window.server.load(w,window.pin.errorPinHandler)},g=()=>{const e=parseInt(l.value,10),t=parseInt(c.value,10),o=t<e||0===e&&t<100?"Недопустимое количество комнат":"";c.setCustomValidity(o),c.reportValidity()},E=()=>{o.classList.add("map--faded"),e.classList.add("ad-form--disabled"),r.classList.add("map__filters--disabled"),t.value="570, 375",document.querySelector(".pins").remove(),document.querySelector(".popup").remove()},k=()=>{document.querySelector(".succeded-form").remove(),document.removeEventListener("click",k)},C=()=>{document.querySelector(".succeded-form").remove(),document.removeEventListener("keydown",C)},x=()=>{(()=>{const e=document.createElement("div"),t=y.cloneNode(!0);e.appendChild(t),e.classList.add("succeded-form"),v.insertAdjacentElement("afterbegin",e)})(),document.addEventListener("click",k),document.addEventListener("keydown",(e=>{27===e.keyCode&&C()})),e.reset(),E(),q()},b=()=>{document.querySelector(".error-form").remove(),document.removeEventListener("click",b)},P=()=>{document.querySelector(".error-form").remove(),document.removeEventListener("keydown",P)},A=()=>{(()=>{const e=document.createElement("div"),t=f.cloneNode(!0);e.appendChild(t),e.classList.add("error-form"),v.insertAdjacentElement("afterbegin",e)})(),document.addEventListener("click",b),document.addEventListener("keydown",(e=>{27===e.keyCode&&P()})),document.querySelector(".error__button").addEventListener("click",b)};n.addEventListener("mousedown",(e=>{if(e.preventDefault(),0===e.button){0===S.length&&L();let o={x:e.clientX,y:e.clientY};const r=e=>{e.preventDefault();let r=o.x-e.clientX,d=o.y-e.clientY;o={x:e.clientX,y:e.clientY};const c=(l=n.offsetTop-d)<130?130:l>630?630:l;var l;const s=(a=n.offsetLeft-r)>(i=m).offsetWidth-38?i.offsetWidth-38:a<0?-28:a;var a,i;n.style.top=c+"px",n.style.left=s+"px",t.value=`${c+33}, ${s+84}`},d=e=>{e.preventDefault(),r(e),document.removeEventListener("mousemove",r),document.removeEventListener("mouseup",d)};document.addEventListener("mousemove",r),document.addEventListener("mouseup",d)}})),n.addEventListener("keydown",(e=>{13===e.keyCode&&L()})),d.addEventListener("input",(()=>{const e=d.value.length;e<30?(d.setCustomValidity(`Еще ${30-e} символов`),d.classList.add("wrong-input")):e>100?d.setCustomValidity(`Удалите лишние ${e-100} симв.`):d.setCustomValidity(""),d.reportValidity()})),c.addEventListener("change",(()=>{g()})),l.addEventListener("change",(()=>{g()})),a.addEventListener("change",(()=>{(()=>{s.placeholder=h[a.value].placeholder,s.min=h[a.value].min;const e=s.value.length<s.min?"Минимальная стоимость должна составлять "+s.min:"";s.setCustomValidity(e),s.reportValidity()})()})),s.addEventListener("input",(()=>{(()=>{const e=parseInt(s.value,10)>1e6?"Максимальная стоимость должна составлять 1000000":"";s.setCustomValidity(e),s.reportValidity()})()})),i.addEventListener("change",(()=>{u.value=i.value})),u.addEventListener("change",(()=>{i.value=u.value})),p.addEventListener("click",(t=>{t.preventDefault(),e.reset(),E()})),e.addEventListener("submit",(t=>{t.preventDefault(),g(),e.checkValidity()&&window.server.upload(new FormData(e),x,A)})),q(),t.value="570, 375",window.form={getPinsData:()=>S}})(),(()=>{let e=["gif","jpg","jpeg","png"];const t=document.querySelector(".ad-form-header__input"),o=document.querySelector(".ad-form__input"),r=document.querySelector(".ad-form-header__preview img"),n=document.querySelector(".ad-form__photo");n.style.padding="15px 15px";const d=(e,t,o)=>{let r=e.files[0];const n=r.name.toLowerCase();if(t.some((e=>n.endsWith(e)))){let e=new FileReader;e.addEventListener("load",(()=>{o.src=e.result})),e.readAsDataURL(r)}},c=t=>{let r=new Image(40,40);r.src="",t.appendChild(r),d(o,e,r)};t.addEventListener("change",(()=>{d(t,e,r)})),o.addEventListener("change",(()=>{if(n.querySelector("img")){const e=n.cloneNode();c(e),document.querySelector(".ad-form__photo-container").appendChild(e)}else c(n)}))})(),(()=>{const e="any",t=document.querySelector(".map__filters"),o=t.querySelector("#housing-type"),r=t.querySelector("#housing-price"),n=t.querySelector("#housing-rooms"),d=t.querySelector("#housing-guests"),c=t.querySelector("#housing-features"),l=t.children,s=e=>(()=>{const e=c.querySelectorAll("input");let t=[];for(let o=0;o<e.length;o++)e[o].checked&&t.push(e[o].value);return t})().every((t=>e.offer.features.includes(t)))?e:null,a=t=>{const r=o.value;return r===e||t.offer.type===r?t:null},i=t=>{const o=r.value;return o===e||((n=t.offer.price)<1e4?"low":n>5e4?"high":"middle")===o?t:null;var n},u=t=>{const o=n.value;return o===e||(1===(r=t.offer.rooms)?"1":2===r?"2":"3")===o?t:null;var r},p=e=>{const t=d.value;return"any"===t||(1===(o=e.offer.guests)?"1":2===o?"2":"0")===t?e:null;var o},m=window.debounce(window.pin.renderPins);for(let e=0;e<l.length;e++)l[e].addEventListener("change",(()=>{const e=window.form.getPinsData(),t=[a,i,u,p,s],o=[];for(let r=0;r<e.length&&o.length<5;r++){let n=e[r];for(let e=0;e<t.length&&n;e++)n=t[e](n);n&&o.push(n)}m(o),window.card.closeAllPopups()}))})()})();