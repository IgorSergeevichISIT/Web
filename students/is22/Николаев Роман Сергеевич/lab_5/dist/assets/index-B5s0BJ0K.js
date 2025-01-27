(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();class l{constructor(t){this.parent=t}getHTML(t){return`
                <div class="card" style="width: 300px;" >
                    <img class="card-img-top" src="${t.photo_400_orig}" alt="картинка" > 
                    <div class="card-body">
                        <h5 class="card-title">${t.first_name} ${t.last_name}</h5>
                        <button class="btn btn-primary" id="click-card-${t.id}" data-id="${t.id}">Нажми на меня</button>
                    </div>
                </div>
            `}addListeners(t,e){document.getElementById(`click-card-${t.id}`).addEventListener("click",e)}render(t,e){const n=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",n),this.addListeners(t,e)}}class h{constructor(t){this.parent=t}getHTML(t){return`
                <div class="card mb-3" style="width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${t.photo_400_orig}" class="img-fluid" alt="картинка">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${t.first_name} ${t.last_name}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            `}render(t){const e=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",e)}}class u{constructor(t){this.parent=t}addListeners(t){document.getElementById("back-button").addEventListener("click",t)}getHTML(){return`
                <button id="back-button" class="btn btn-primary" type="button">Назад</button>
            `}render(t){const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e),this.addListeners(t)}}class p{post(t,e){fetch(t,{method:"POST"}).then(n=>{if(!n.ok)throw new Error("Network response was not ok");return n.json()}).then(n=>{e(n)}).catch(n=>{console.error("There has been a problem with your fetch operation:",n)})}}const c=new p,g="vk1.a._zo-5dLPxgb9KPaW1pgiQtZ1dnPqCiQSv_TqBVRb8R-yFAiP0MhrE21WNAg5FmdVBQ6m7njtg80maejzQhb4gRkvhvKjPqoXFvgPFrEwApPg8CV_coutYvtwMXcYLKlvFQRt7M3yHHJXIrXiFxfhLTX1WhxotaJVf7PPYiR0J4rxxJktljh6vqGF5D_Y1xDzbB30zKWITADU4aoRxplqag",m="5.131";class f{constructor(){this.url="https://api.vk.com/method",this.commonInfo=`access_token=${g}&v=${m}`}getUserInfo(t){return`${this.url}/users.get?user_ids=${t}&fields=photo_400_orig&${this.commonInfo}`}getGroupMembers(t,e=""){return`${this.url}/groups.getMembers?group_id=${t}&fields=photo_400_orig&${this.commonInfo}&filter=${e}`}}const a=new f;class v{constructor(t,e){this.parent=t,this.id=e}getData(){c.post(a.getUserInfo(this.id),t=>{this.renderData(t.response)})}get pageRoot(){return document.getElementById("product-page")}getHTML(){return`
                <div id="product-page"></div>
            `}renderData(t){new h(this.pageRoot).render(t[0])}clickBack(){new d(this.parent).render()}render(){this.parent.innerHTML="";const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t),new u(this.pageRoot).render(this.clickBack.bind(this)),this.getData()}}class b{constructor(t,e){this.parent=t,this.onFilterChange=e}getHTML(){return`
            <div class="filter-container">
                <label for="filter">Фильтр:</label>
                <select id="filter" name="filter">
                    <option value="">Все</option>
                    <option value="managers">Модерация</option>
                </select>
            </div>
        `}addListeners(){document.getElementById("filter").addEventListener("change",e=>{this.onFilterChange(e.target.value)})}render(){this.parent.innerHTML=this.getHTML(),this.addListeners()}}const L="228588072";class d{constructor(t){this.parent=t,this.filter=""}getHTML(){return`
            <div id="filter-container"></div>
            <div id="main-page" class="d-flex flex-wrap"></div>
            `}get pageRoot(){return document.getElementById("main-page")}get filterRoot(){return document.getElementById("filter-container")}getData(){c.post(a.getGroupMembers(L,this.filter),t=>{this.renderData(t.response.items)})}renderData(t){this.pageRoot.innerHTML="",t.forEach(e=>{new l(this.pageRoot).render(e,this.clickCard.bind(this))})}clickCard(t){const e=t.target.dataset.id;new v(this.parent,e).render()}onFilterChange(t){this.filter=t,this.getData()}render(){this.parent.innerHTML="";const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t),new b(this.filterRoot,this.onFilterChange.bind(this)).render(),this.getData()}}const M=document.getElementById("root"),y=new d(M);y.render();
