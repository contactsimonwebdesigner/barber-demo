"use strict";
const PHOTOS = [{"path":"assets/images/barber-4625627.webp","title":"barber giving a haircut","cat":"cut"},{"path":"assets/images/barber-5584458.webp","title":"men's haircut detail","cat":"detail"},{"path":"assets/images/barber-9992818.webp","title":"barber at work in a salon","cat":"cut"},{"path":"assets/images/barber-7518731.webp","title":"studio haircut","cat":"cut"},{"path":"assets/images/barber-9992820.webp","title":"hair grooming","cat":"cut"},{"path":"assets/images/barber-7518751.webp","title":"styling and haircut","cat":"cut"},{"path":"assets/images/barber-4625626.webp","title":"modern haircut","cat":"cut"},{"path":"assets/images/barber-7518735.webp","title":"professional work detail","cat":"detail"},{"path":"assets/images/barber-7697283.webp","title":"precision cut","cat":"cut"},{"path":"assets/images/barber-2076930.webp","title":"barber and client","cat":"detail"},{"path":"assets/images/barber-27467943.webp","title":"modern hairstyle","cat":"cut"},{"path":"assets/images/barber-19028067.webp","title":"styling in the studio","cat":"cut"},{"path":"assets/images/barber-5152514.webp","title":"barbershop interior","cat":"interier"},{"path":"assets/images/barber-8218487.webp","title":"vintage barbershop interior","cat":"interier"},{"path":"assets/images/barber-19225142.webp","title":"barber studio and chair","cat":"interier"},{"path":"assets/images/barber-12685937.webp","title":"retro barber chair","cat":"interier"},{"path":"assets/images/barber-3992850.webp","title":"chairs and mirrors","cat":"interier"},{"path":"assets/images/barber-19225277.webp","title":"modern barber chair","cat":"interier"},{"path":"assets/images/barber-12505400.webp","title":"salon interior","cat":"interier"},{"path":"assets/images/barber-12164646.webp","title":"barber station with mirror","cat":"interier"},{"path":"assets/images/barber-15642778.webp","title":"vintage interior","cat":"interier"},{"path":"assets/images/barber-12685938.webp","title":"barber interior","cat":"interier"},{"path":"assets/images/barber-18090356.webp","title":"black-and-white barber studio","cat":"interier"}];
const SERVICES = [
{name:"Classic Cut",kind:"hair",price:590,minutes:45,desc:"Classic men's haircut · styling"},
{name:"Skin Fade",kind:"hair",price:690,minutes:50,desc:"Seamless fade · finishing"},
{name:"Buzz Cut",kind:"hair",price:350,minutes:20,desc:"Short clipper cut"},
{name:"Scissor Cut",kind:"hair",price:650,minutes:50,desc:"Scissor cut · texture"},
{name:"Long Hair Shape",kind:"hair",price:720,minutes:55,desc:"Longer hair · shape and styling"},
{name:"Crew Cut",kind:"hair",price:520,minutes:35,desc:"Short sporty haircut"},
{name:"Contour Refresh",kind:"hair",price:290,minutes:20,desc:"Edge-up between visits"},
{name:"Restyle",kind:"hair",price:790,minutes:65,desc:"New hairstyle · individual styling"},
{name:"Beard Sculpt",kind:"beard",price:390,minutes:25,desc:"Beard trimming and final shaping"},
{name:"Beard Refresh",kind:"beard",price:250,minutes:15,desc:"Quick beard trim"},
{name:"Beard & Contour",kind:"beard",price:450,minutes:30,desc:"Beard and edge-up"},
{name:"Full Experience",kind:"combo",price:980,minutes:75,desc:"Haircut · beard · styling"},
{name:"Fade & Beard",kind:"combo",price:950,minutes:75,desc:"Skin fade and full beard grooming"},
{name:"Cut & Wash",kind:"combo",price:740,minutes:55,desc:"Haircut · wash · styling"},
{name:"Premium Restyle",kind:"combo",price:1090,minutes:85,desc:"Complete style makeover"},
{name:"Express Combo",kind:"combo",price:690,minutes:45,desc:"Quick cut and light beard trim"},
{name:"Father & Son",kind:"combo",price:990,minutes:85,desc:"Two classic haircuts"},
{name:"Student Cut",kind:"hair",price:490,minutes:40,desc:"Student haircut"}
];
const money = n => "$"+new Intl.NumberFormat("en-US").format(Math.round(n/31.6));
const q = s=> document.querySelector(s);
const qa = s=> Array.from(document.querySelectorAll(s));
const nav=q("#navLinks"), toggle=q("#menuToggle");
function closeMenu(){nav.classList.remove("open");toggle.setAttribute("aria-expanded","false");toggle.setAttribute("aria-label","Open menu");}
toggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open));toggle.setAttribute("aria-label",open?"Close menu":"Open menu");});
nav.addEventListener("click",e=>{if(e.target.closest("a")) closeMenu()});
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeMenu();closeLightbox()}});
document.addEventListener("click",e=>{if(!e.target.closest(".nav-shell"))closeMenu()});
const progress=q("#progress");
let scheduled=false;
addEventListener("scroll",()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{let m=document.documentElement.scrollHeight-innerHeight;progress.style.width=(m>0?scrollY/m*100:0)+"%";scheduled=false;});},{passive:true});
if("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches){
 document.documentElement.classList.add("js-anim");
 const ro=new IntersectionObserver((entries)=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add("visible");ro.unobserve(entry.target)}}},{threshold:.09,rootMargin:"0px 0px -30px 0px"});
 qa(".reveal").forEach(el=>ro.observe(el));
}
const grid=q("#galleryGrid"), filters=q("#galleryFilters");
let photoFiltered=PHOTOS, photoIndex=0;
const labels={střih:"BARBER CUTS",interier:"THE SPACE",detail:"CLOSE-UP DETAIL"};
function renderPhotos(category="all"){
 photoFiltered=PHOTOS.filter(p=>category==="all"||p.cat===category);
 grid.replaceChildren();
 photoFiltered.forEach((p,i)=>{
 const b=document.createElement("button");b.type="button";b.className="gallery-card";b.setAttribute("aria-label","Open photo "+p.title);
 const img=document.createElement("img");img.src=p.path;img.alt=p.title;img.loading=i<4?"eager":"lazy";img.decoding="async";
 const cap=document.createElement("div");cap.className="gallery-label";
 const info=document.createElement("div");
 const small=document.createElement("small");small.textContent=labels[p.cat]||"PHOTO";
 const strong=document.createElement("strong");strong.textContent=String(i+1).padStart(2,"0")+" / "+p.title.toUpperCase();
 info.append(small,strong);
 const arr=document.createElement("b");arr.textContent="↗";arr.setAttribute("aria-hidden","true");
 cap.append(info,arr);b.append(img,cap);b.addEventListener("click",()=>openLightbox(i));grid.append(b);
 });
 q("#photoCount").textContent=String(PHOTOS.length);
}
filters.addEventListener("click",e=>{let b=e.target.closest("button[data-filter]");if(!b)return;qa("#galleryFilters button").forEach(x=>{x.classList.toggle("active",x===b);x.setAttribute("aria-pressed",String(x===b))});renderPhotos(b.dataset.filter)});
const lb=q("#lightbox"),lbImage=q("#lightboxImage"),lbCaption=q("#lightboxCaption");
let previousFocus=null;
function openLightbox(i){if(!photoFiltered.length)return;previousFocus=document.activeElement;photoIndex=(i+photoFiltered.length)%photoFiltered.length;paintLightbox();lb.hidden=false;document.body.style.overflow="hidden";q("#lightboxClose").focus()}
function paintLightbox(){const p=photoFiltered[photoIndex];lbImage.src=p.path;lbImage.alt=p.title;lbCaption.textContent=(photoIndex+1)+" / "+photoFiltered.length+" — "+p.title+" · illustrative Pexels photo"}
function stepLightbox(n){photoIndex=(photoIndex+n+photoFiltered.length)%photoFiltered.length;paintLightbox()}
function closeLightbox(){if(lb.hidden)return;lb.hidden=true;document.body.style.overflow="";lbImage.src=PHOTOS[0].path;if(previousFocus?.focus)previousFocus.focus()}
q("#lightboxClose").addEventListener("click",closeLightbox);
q("#lightboxPrev").addEventListener("click",()=>stepLightbox(-1));q("#lightboxNext").addEventListener("click",()=>stepLightbox(1));
lb.addEventListener("click",e=>{if(e.target===lb)closeLightbox()});
document.addEventListener("keydown",e=>{if(!lb.hidden){if(e.key==="ArrowLeft")stepLightbox(-1);if(e.key==="ArrowRight")stepLightbox(1);if(e.key==="Tab"){const items=[q("#lightboxClose"),q("#lightboxPrev"),q("#lightboxNext")];let i=items.indexOf(document.activeElement);if(e.shiftKey&&i===0){items[2].focus();e.preventDefault()}else if(!e.shiftKey&&i===2){items[0].focus();e.preventDefault()}}}});
renderPhotos();

const priceList=q("#priceList"), priceFilters=q("#priceFilters"), serviceSelect=q("#bookingService"), estimate=q("#bookingEstimate");
function renderPrices(kind="all"){
 priceList.replaceChildren();
 SERVICES.filter(s=>kind==="all"||s.kind===kind).forEach(s=>{
 const row=document.createElement("div");row.className="price-row";
 const left=document.createElement("div");left.className="price-left";
 const name=document.createElement("div");name.className="price-name";name.textContent=s.name.toUpperCase();
 const desc=document.createElement("small");desc.textContent=s.desc+" · "+s.minutes+" min";left.append(name,desc);
 const right=document.createElement("div");right.className="price-row-right";
 const amount=document.createElement("b");amount.textContent=money(s.price);
 const add=document.createElement("button");add.type="button";add.className="price-add";add.textContent="↗";add.setAttribute("aria-label","Select service "+s.name);add.addEventListener("click",()=>selectService(s.name,true));right.append(amount,add);row.append(left,right);priceList.append(row);
 });
}
priceFilters.addEventListener("click",e=>{const b=e.target.closest("button[data-group]");if(!b)return;qa("#priceFilters button").forEach(x=>{x.classList.toggle("active",x===b);x.setAttribute("aria-pressed",String(x===b))});renderPrices(b.dataset.group)});
SERVICES.forEach(s=>{const opt=document.createElement("option");opt.value=s.name;opt.textContent=s.name+" — "+money(s.price);serviceSelect.append(opt)});
function selectService(name,scroll){serviceSelect.value=name;updateEstimate();if(scroll)q("#rezervace").scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})}
qa(".service-tile").forEach(el=>el.addEventListener("click",e=>{if(e.target.closest("a"))selectService(el.dataset.service,false)}));
serviceSelect.addEventListener("change",updateEstimate);
function updateEstimate(){const selected=SERVICES.find(s=>s.name===serviceSelect.value);estimate.textContent=selected?money(selected.price):"—"}
renderPrices();

const dateField=q("#bookingDate");const today=new Date(), pad=n=>String(n).padStart(2,"0");
const localDate=[today.getFullYear(),pad(today.getMonth()+1),pad(today.getDate())].join("-");dateField.min=localDate;
const timeSelect=q("#bookingTime");
for(let h=9;h<20;h++)for(const minute of ["00","30"]){if(h===19&&minute==="30")continue;const op=document.createElement("option");op.value=pad(h)+":"+minute;op.textContent=op.value;timeSelect.append(op)}
let lastSummary="";
q("#bookingForm").addEventListener("submit",e=>{
 e.preventDefault();if(!e.currentTarget.reportValidity())return;
 const srv=SERVICES.find(s=>s.name===serviceSelect.value);
 lastSummary=[
 "CUTLINE. — DEMO INQUIRY / UNCONFIRMED APPOINTMENT",
 "Service: "+srv.name,
 "Estimated price: "+money(srv.price),
 "Estimated duration: "+srv.minutes+" min",
 "Requested date: "+dateField.value,
 "Requested time: "+timeSelect.value,
 "Name: "+q("#bookingName").value.trim(),
 "Email: "+q("#bookingEmail").value.trim(),
 "Note: "+(q("#bookingNote").value.trim()||"No note"),
 "",
 "This is only a sample summary. Nothing has been sent and no appointment has been reserved."
 ].join("\n");
 q("#bookingSummary").textContent=lastSummary;q("#bookingResult").hidden=false;q("#bookingResult").scrollIntoView({behavior:"smooth",block:"nearest"});
});
q("#copyBooking").addEventListener("click",async()=>{
 if(!lastSummary)return;
 let ok=false;
 try{await navigator.clipboard.writeText(lastSummary);ok=true}catch{}
 if(!ok){const tmp=document.createElement("textarea");tmp.value=lastSummary;document.body.append(tmp);tmp.select();try{ok=document.execCommand("copy")}catch{}tmp.remove()}
 const b=q("#copyBooking");b.textContent=ok?"COPIED ✓":"COPYING UNAVAILABLE";
 setTimeout(()=>b.textContent="COPY SUMMARY",2800);
});
