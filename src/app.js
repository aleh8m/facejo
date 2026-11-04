const motionAllowed=!matchMedia('(prefers-reduced-motion: reduce)').matches;
if(motionAllowed&&'IntersectionObserver'in window){
  document.documentElement.classList.add('js-motion');
  const observer=new IntersectionObserver(items=>{
    items.forEach(item=>{
      if(item.isIntersecting){
        item.target.classList.add('revealed');
        observer.unobserve(item.target);
      }
    });
  },{threshold:.06});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}

// Animated Promotional Hero Banner Logic for FaceJo
const heroScenes=[
  {
    badge:'مؤسسة FaceJo · حلول البرمجة والتصميم',
    title:'تصميم مواقع أنيقة وبرمجيات مخصصة للشركات',
    desc:'نساعد الشركات والأفراد على بناء حضور رقمي قوي من خلال مواقع سريعة، أنظمة برمجية متكاملة، وتطبيقات ذكية.',
    url:'facejo://web-and-software-solutions',
    stageTitle:'تطوير مواقع الويب والبرمجيات المتكاملة',
    stageSub:'UI/UX • Custom ERP & SaaS • Mobile Apps',
    pills:['✔ تصميم مواقع احترافية','✔ برمجيات وأنظمة خاصة','✔ متاجر وتطبيقات ذكية']
  },
  {
    badge:'خدمة تصميم وتطوير المواقع الإلكترونية',
    title:'مواقع إلكترونية عصرية متجاوبة تتصدر محركات البحث',
    desc:'نصمم مواقع الشركات وصفحات الهبوط التفاعلية بسرعة فائقة وتجربة مستخدم (UI/UX) تضاعف مبيعاتك.',
    url:'facejo://responsive-web-design',
    stageTitle:'تصميم مواقع شركات وصفحات هبوط احترافية',
    stageSub:'Responsive Design • SEO Ready • High Speed',
    pills:['✔ تجاوب كامل مع الجوال','✔ سرعة تحميل 99%','✔ تهيئة محركات البحث SEO']
  },
  {
    badge:'خدمة البرمجيات والأنظمة المخصصة',
    title:'أنظمة إدارية وبرمجيات سحابية مصممة لعملك',
    desc:'بناء أنظمة المحاسبة، إدارة الموارد (ERP)، إدارة العملاء (CRM)، ولوحات التحكم الذكية بأعلى معايير الأمان.',
    url:'facejo://custom-software-erp',
    stageTitle:'برمجة أنظمة الشركات ولوحات التحكم',
    stageSub:'Cloud ERP • Custom CRM • Secure API',
    pills:['✔ أنظمة إدارة مخصصة','✔ تقارير وإحصائيات لحظية','✔ حماية وتشفير سحابي']
  },
  {
    badge:'تطبيقات الهواتف والمتاجر الإلكترونية',
    title:'تطبيقات جوال ومتاجر إلكترونية تضاعف وصولك للعملاء',
    desc:'تطوير تطبيقات iOS و Android ومتاجر إلكترونية متكاملة مع ربط بوابات الدفع الإلكتروني والشحن.',
    url:'facejo://mobile-apps-and-ecommerce',
    stageTitle:'تطبيقات ذكية ومتاجر إلكترونية متكاملة',
    stageSub:'iOS & Android • E-Commerce • Payment Gateways',
    pills:['✔ تطبيقات iOS و Android','✔ متاجر إلكترونية متكاملة','✔ ربط الدفع والشحن']
  }
];

const heroEl=document.getElementById('facejo-animated-hero');
if(heroEl){
  let currentScene=0;
  let progress=0;
  const badgeEl=document.getElementById('hero-scene-badge');
  const titleEl=document.getElementById('hero-scene-title');
  const descEl=document.getElementById('hero-scene-desc');
  const urlEl=document.getElementById('hero-window-url');
  const pillsEl=document.getElementById('hero-scene-pills');
  const stageEl=document.getElementById('hero-scene-stage');
  const barEl=document.getElementById('hero-progress-bar');
  const tabs=document.querySelectorAll('[data-hero-scene]');

  function setHeroScene(index){
    currentScene=(index+heroScenes.length)%heroScenes.length;
    const s=heroScenes[currentScene];
    if(badgeEl)badgeEl.textContent=s.badge;
    if(titleEl)titleEl.textContent=s.title;
    if(descEl)descEl.textContent=s.desc;
    if(urlEl)urlEl.textContent=s.url;
    if(pillsEl)pillsEl.innerHTML=s.pills.map(p=>`<span class="hero-pill">${p}</span>`).join('');
    if(stageEl){
      const st=stageEl.querySelector('.stage-title');
      const sb=stageEl.querySelector('.stage-sub');
      if(st)st.textContent=s.stageTitle;
      if(sb)sb.textContent=s.stageSub;
    }
    tabs.forEach((t,i)=>t.classList.toggle('active',i===currentScene));
    progress=0;
    if(barEl)barEl.style.width='0%';
  }

  tabs.forEach(t=>t.addEventListener('click',()=>setHeroScene(Number(t.dataset.heroScene))));

  setInterval(()=>{
    progress+=2;
    if(progress>=100){
      setHeroScene(currentScene+1);
    }else if(barEl){
      barEl.style.width=progress+'%';
    }
  },100);

  // Interactive Canvas Particles
  const canvas=document.getElementById('hero-particles-canvas');
  if(canvas){
    const ctx=canvas.getContext('2d');
    let pts=[];
    function resize(){
      canvas.width=heroEl.clientWidth||800;
      canvas.height=heroEl.clientHeight||500;
      pts=Array.from({length:32},()=>({
        x:Math.random()*canvas.width,
        y:Math.random()*canvas.height,
        vx:(Math.random()-.5)*.6,
        vy:(Math.random()-.5)*.6
      }));
    }
    resize();
    window.addEventListener('resize',resize);
    function draw(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      for(let i=0;i<pts.length;i++){
        const p=pts[i];
        p.x+=p.vx;p.y+=p.vy;
        if(p.x<0||p.x>canvas.width)p.vx*=-1;
        if(p.y<0||p.y>canvas.height)p.vy*=-1;
        ctx.beginPath();
        ctx.arc(p.x,p.y,2,0,Math.PI*2);
        ctx.fillStyle='#38bdf8';
        ctx.globalAlpha=.5;
        ctx.fill();
        for(let j=i+1;j<pts.length;j++){
          const q=pts[j];
          const d=Math.hypot(p.x-q.x,p.y-q.y);
          if(d<120){
            ctx.beginPath();
            ctx.moveTo(p.x,p.y);
            ctx.lineTo(q.x,q.y);
            ctx.strokeStyle='#38bdf8';
            ctx.globalAlpha=(1-d/120)*.2;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }
    if(motionAllowed)requestAnimationFrame(draw);
  }
}

// Domain availability checker from original FaceJo repo
function normalizeDomain(value){
  let name=value.trim().toLowerCase();
  if(/\s/.test(name))throw new Error('يرجى إدخال اسم نطاق صالح بدون مسافات');
  name=name.replace(/^https?:\/\//,'').replace(/^www\./,'').replace(/\/$/,'');
  if(/[\/?#@:]/.test(name))throw new Error('أدخل اسم النطاق فقط بدون مسارات');
  if(!name.includes('.'))name+='.com';
  return name;
}
const domainForm=document.querySelector('#domain-form');
if(domainForm){
  const input=document.querySelector('#domain-input');
  document.querySelectorAll('[data-tld]').forEach(b=>b.addEventListener('click',()=>{
    let value=input.value.trim().replace(/^https?:\/\//,'').replace(/^www\./,'').split('/')[0];
    const base=value?value.split('.')[0]:'facejo';
    input.value=base+'.'+b.dataset.tld;
    input.focus();
  }));
  domainForm.addEventListener('submit',event=>{
    event.preventDefault();
    const area=document.querySelector('#domain-result');
    try{
      const domain=normalizeDomain(input.value);
      input.value=domain;
      area.innerHTML=`<div style="margin-top:12px;padding:12px;border-radius:12px;background:#ffffff0a;border:1px solid #38bdf840;display:flex;align-items:center;justify-content:space-between;gap:12px"><span>النطاق: <strong dir="ltr">${domain}</strong></span><a class="button button-outline" target="_blank" rel="noopener" href="https://www.namecheap.com/domains/registration/results/?domain=${encodeURIComponent(domain)}">فحص وحجز النطاق ↗</a></div>`;
    }catch(err){
      area.textContent=err.message;
    }
  });
}
