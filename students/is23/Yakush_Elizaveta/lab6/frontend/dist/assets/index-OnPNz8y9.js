(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function e(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=e(n);fetch(n.href,r)}})();class l{parent;constructor(t){this.parent=t}getHTML(t){return`
        <div class="card" style="width: 180px;">
            <img src="${t.photo_200||""}" class="card-img-top" alt="${t.first_name}">
            <div class="card-body">
                <h6 class="card-title text-center">
                    ${t.first_name} ${t.last_name}
                </h6>

                <button class="btn btn-primary w-100 mt-2" data-id="${t.id}" data-action="details">
                    Подробнее
                </button>

                <button class="btn btn-danger w-100 mt-2" data-id="${t.id}" data-action="remove">
                    Удалить
                </button>
            </div>
        </div>`}render(t,e,s){const n=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",n);const r=this.parent.querySelector(`button[data-id="${t.id}"][data-action="details"]`),a=this.parent.querySelector(`button[data-id="${t.id}"][data-action="remove"]`);r.addEventListener("click",()=>e()),a.addEventListener("click",()=>s())}}class p{parent;constructor(t){this.parent=t}getHTML(t){return`
        <div class="card" style="width: 300px; margin:0 auto; text-align:center;">
            <img src="${t.photo_200||"https://via.placeholder.com/200"}" 
                 alt="${t.first_name}" 
                 class="card-img-top" 
                 style="border-radius:50%; max-width:200px; margin: 10px auto;">
            <div class="card-body">
                <h3>${t.first_name} ${t.last_name}</h3>
                <p>ID: ${t.id}</p>
            </div>
        </div>`}render(t){this.parent.innerHTML=this.getHTML(t)}}class h{parent;constructor(t){this.parent=t}render(t){this.parent.innerHTML="";const e=document.createElement("button");e.textContent="Назад",e.className="btn btn-primary mb-3",e.onclick=()=>{new c(this.parent).render()},this.parent.appendChild(e);const s=document.createElement("div");s.id="product-page",this.parent.appendChild(s),new p(s).render(t)}}class c{parent;users=[];constructor(t){this.parent=t,this.users=[]}get pageRoot(){const t=document.getElementById("main-page");if(!t)throw new Error("Main page root not found");return t}getHTML(){return`
        <div style="text-align:center;margin-bottom:20px;">
            <button id="refresh-btn" class="btn btn-secondary mb-2">Подгрузить актуальные данные</button>
            <button id="add-user-btn" class="btn btn-info mb-2">Добавить пользователя</button>
            <select id="filter-select" class="form-control">
                <option value="all">Все</option>
                <option value="man">Мужчины</option>
                <option value="woman">Женщины</option>
            </select>
        </div>

        <div id="main-page"
             style="display:flex;flex-wrap:wrap;gap:20px;justify-content:center;">
        </div>
    `}async getData(t=!1){try{const e=await fetch(`http://localhost:3000/api/members?refresh=${t}`);if(!e.ok)throw new Error(`Ошибка HTTP: ${e.status}`);this.users=await e.json(),console.log(e),this.renderData(this.users)}catch(e){console.error("Ошибка загрузки данных",e),this.pageRoot.innerHTML=`<p style="color:red;">Не удалось загрузить данные: ${e.message}</p>`}}renderData(t){if(this.pageRoot.innerHTML="",!t||t.length===0){this.pageRoot.innerHTML="<p>Нет пользователей для отображения</p>";return}t.forEach(e=>{new l(this.pageRoot).render(e,()=>this.clickCard(e),()=>this.removeUser(e.id))})}clickCard(t){new h(this.parent).render(t)}async addUser(){const t=prompt("Имя пользователя");if(!t)return;const e=prompt("Фамилия пользователя")||"",n=(prompt("Пол (муж, жен)")||"муж").trim()==="жен"?1:2,a={id:this.users.length>0?Math.max(...this.users.map(d=>d.id))+1:0,first_name:t,last_name:e,sex:n},i=await(await fetch("http://localhost:3000/api/addUser",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)})).json();i.error?alert("Ошибка: "+i.error):this.getData()}async removeUser(t){if(!confirm("Удалить пользователя из списка?"))return;const s=await(await fetch("http://localhost:3000/api/removeUser",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:t})})).json();s.success?this.getData():alert("Ошибка: "+s.error)}render(){this.parent.innerHTML="",this.parent.insertAdjacentHTML("beforeend",this.getHTML()),document.getElementById("add-user-btn")?.addEventListener("click",()=>this.addUser()),document.getElementById("refresh-btn")?.addEventListener("click",()=>this.getData(!0));const s=document.getElementById("filter-select");s?.addEventListener("change",async()=>{const n=s.value.toLowerCase().trim();try{let r=[...this.users];n==="man"&&(r=r.filter(a=>a.sex===2)),n==="woman"&&(r=r.filter(a=>a.sex===1)),this.renderData(r)}catch(r){console.error("Ошибка фильтрации данных",r),this.pageRoot.innerHTML=`<p style="color:red;">Ошибка фильтрации: ${r.message}</p>`}}),this.getData()}}const m=document.getElementById("root"),u=new c(m);u.render();
