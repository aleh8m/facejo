import fs from 'node:fs';
import path from 'node:path';

const out='dist';
fs.rmSync(out,{recursive:true,force:true});
fs.mkdirSync(out+'/assets',{recursive:true});
fs.cpSync('src',out,{recursive:true});
const origin=(process.env.SITE_URL||'https://aleh8m.github.io/facejo').replace(/\/$/,'');
const basePath=new URL(origin).pathname.replace(/\/$/,'');
const whatsapp='https://wa.me/962791698516';
const wa=(text='مرحباً Facejo، أريد الاستفسار عن خدمة برمجة موقع.')=>whatsapp+'?text='+encodeURIComponent(text);

const icon=(name)=>{
  const paths={
    arrow:'M7 17 17 7M7 7h10v10',
    code:'m8 7-5 5 5 5m8-10 5 5-5 5m-3-12-2 14',
    globe:'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm-9-9h18M12 3a15.3 15.3 0 0 1 4 9 15.3 15.3 0 0 1-4 9 15.3 15.3 0 0 1-4-9 15.3 15.3 0 0 1 4-9z',
    mobile:'M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm5 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2z'
  };
  return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${paths[name]}"/></svg>`;
};

const mark=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 140"><defs><linearGradient id="b" x2="1" y2="1"><stop offset="0%" stop-color="#3b82f6"/><stop offset="100%" stop-color="#38bdf8"/></linearGradient></defs><rect width="160" height="140" rx="32" fill="#11182a"/><path d="M42 38h76v22H70v18h40v20H70v24H42z" fill="url(#b)"/><circle cx="120" cy="112" r="10" fill="#38bdf8"/></svg>`;
fs.writeFileSync(out+'/assets/facejo-mark.svg',mark);
fs.writeFileSync(out+'/assets/facejo-logo.svg',mark.replace('viewBox="0 0 160 140"','viewBox="0 0 460 140"').replace('</svg>',`<text x="175" y="92" fill="#edf3ff" font-family="system-ui,-apple-system,sans-serif" font-weight="800" font-size="64" letter-spacing="-1">Facejo</text></svg>`));
fs.writeFileSync(out+'/assets/favicon.svg',mark);

const routes=[
  ['/','الرئيسية'],
  ['/services/','الخدمات'],
  ['/offers/','العروض'],
  ['/work/','أعمالنا'],
  ['/domains/','فحص الدومين'],
  ['/about/','من نحن'],
  ['/contact/','تواصل معنا'],
  ['/privacy/','سياسة الخصوصية']
];

const btn=(text,url,secondary=false,attrs='')=>`<a class="button ${secondary?'button-outline':''}" href="${url}" ${attrs}>${text}</a>`;
const eyebrow=(text)=>`<div class="eyebrow"><span></span>${text}</div>`;
const heading=(small,title,desc='')=>`<section class="page-heading container">${eyebrow(small)}<h1>${title}</h1>${desc?`<p>${desc}</p>`:''}</section>`;
const chips='<div class="trust-chips"><span>'+icon('mobile')+' تطوير سريع ومتجاوب</span><span>'+icon('globe')+' استضافة وسرعة فائقة</span><span>'+icon('code')+' برمجيات وأنظمة مخصصة</span></div>';

const serviceData=[
  {id:'web',icon:'globe',title:'تطوير مواقع ويب متكاملة',en:'WEB DESIGN',desc:'تصميم وتطوير مواقع إلكترونية حديثة وسريعة ومتوافقة مع الهواتف الذكية مع تحسين محركات البحث.'},
  {id:'custom',icon:'code',title:'أنظمة وبرمجيات خاصة',en:'CUSTOM SOFTWARE',desc:'بناء أنظمة إدارة، لوحات تحكم، وحلول برمجية مخصصة تلبي احتياجات عملك بدقة.'},
  {id:'domain',icon:'arrow',title:'حجز دومينات واستضافة',en:'DOMAINS & HOSTING',desc:'مساعدة في اختيار وحجز أسماء النطاقات وإعداد الاستضافة السحابية بأسعار منافسة.'},
  {id:'mobile',icon:'mobile',title:'تطبيقات الهواتف والمتاجر',en:'MOBILE & E-COMMERCE',desc:'تصميم وبرمجة المتاجر الإلكترونية وتطبيقات الجوال (iOS & Android) بواجهات عصرية.'}
];

const services=(all=false)=>`<div class="services-grid">${(all?serviceData:serviceData.slice(0,4)).map((s,i)=>`<article class="service-card reveal" style="--i:${i}"><div class="service-top"><div class="service-icon">${icon(s.icon)}</div><span class="service-tag">${s.en}</span></div><h3>${s.title}</h3><p>${s.desc}</p></article>`).join('')}</div>`;

const animatedHeroSection=()=>`
<section class="hero animated-hero-banner container" id="facejo-animated-hero">
  <canvas id="hero-particles-canvas" class="hero-canvas" aria-hidden="true"></canvas>
  <div class="hero-grid">
    <div class="hero-copy">
      <div class="eyebrow"><span class="pulse-dot"></span><span id="hero-scene-badge">مؤسسة FaceJo · حلول البرمجة والتصميم</span></div>
      <h1 id="hero-scene-title">تصميم مواقع أنيقة وبرمجيات مخصصة للشركات</h1>
      <p id="hero-scene-desc">نساعد الشركات والأفراد على بناء حضور رقمي قوي من خلال مواقع سريعة، أنظمة برمجية متكاملة، وتطبيقات ذكية.</p>
      <div class="hero-pills" id="hero-scene-pills">
        <span class="hero-pill">✔ تصميم مواقع احترافية</span>
        <span class="hero-pill">✔ برمجيات وأنظمة خاصة</span>
        <span class="hero-pill">✔ متاجر وتطبيقات ذكية</span>
      </div>
      <div class="hero-actions">
        ${btn('استكشف خدماتنا','/services/')}
        ${btn('تواصل عبر واتساب',wa(),true,'target="_blank" rel="noopener"')}
      </div>
      ${chips}
    </div>
    <div class="hero-visual">
      <div class="browser-bar">
        <div class="dots"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span></div>
        <div class="url-bar" id="hero-window-url" dir="ltr">facejo://web-and-software-solutions</div>
        <span class="live-pill">LIVE</span>
      </div>
      <div class="hero-art" id="hero-scene-stage">
        <div class="mock-card">
          <div class="mock-icon">FJ</div>
          <div class="mock-lines">
            <div class="stage-title">تطوير مواقع الويب والبرمجيات المتكاملة</div>
            <div class="stage-sub">UI/UX • Custom ERP & SaaS • Mobile Apps</div>
          </div>
        </div>
        <div class="stage-metrics">
          <div class="metric-box"><strong>100%</strong><span>تجاوب وسرعة</span></div>
          <div class="metric-box"><strong>99.9%</strong><span>استقرار وأمان</span></div>
          <div class="metric-box"><strong>24/7</strong><span>دعم فني</span></div>
        </div>
      </div>
      <div class="hero-timeline">
        <div class="hero-progress-track"><div id="hero-progress-bar" class="hero-progress-fill"></div></div>
        <div class="hero-scene-tabs">
          <button type="button" class="scene-tab active" data-hero-scene="0">01 الهوية الرقمية</button>
          <button type="button" class="scene-tab" data-hero-scene="1">02 تصميم المواقع</button>
          <button type="button" class="scene-tab" data-hero-scene="2">03 البرمجيات والأنظمة</button>
          <button type="button" class="scene-tab" data-hero-scene="3">04 المتاجر والتطبيقات</button>
        </div>
      </div>
    </div>
  </div>
</section>`;

const brandCardSection=()=>`
<section class="container section-padding reveal" id="brand-card-showcase">
  ${eyebrow('الهوية البصرية والكرت الدعائي')}
  <h2>FaceJo — شريكك التقني لتصميم المواقع والبرمجيات</h2>
  <div class="brand-showcase-grid">
    <div class="brand-showcase-copy">
      <p>نقدم في <strong>FaceJo</strong> تجربة متكاملة تبدأ من التخطيط وتصميم واجهات المستخدم (UI/UX) وصولاً إلى برمجة المواقع والأنظمة السحابية وتطبيقات الهواتف الذكية.</p>
      <div class="hero-actions" style="margin-top:20px">
        ${btn('اطلب مشروعك عبر واتساب',wa('مرحباً FaceJo، أرغب في طلب تصميم موقع أو برنامج مخصص.'),false,'target="_blank" rel="noopener"')}
      </div>
    </div>
    <div class="brand-showcase-img">
      <img src="/assets/facejo-promo-card.jpg" alt="الكرت الدعائي الرسمي لمشروع FaceJo لتصميم المواقع وتطوير البرمجيات" loading="lazy"/>
    </div>
  </div>
</section>`;

const mock=(type)=>`<div class="mock mock-${type}" aria-hidden="true"><div class="mock-bar"><i></i><i></i><i></i></div><div class="mock-body"><div class="mock-title"></div><div class="mock-line"></div><div class="mock-line short"></div><div class="mock-grid"><div></div><div></div></div></div></div>`;
const projectData=[['food','مطعم / كافيه','food','مطعم وكافيه - منيو إلكتروني ونظام طلبات'],['beauty','مركز تجميل','beauty','مركز تجميل - حجز مواعيد أونلاين'],['tech','شركة تقنية','tech','شركة تقنية - موقع تعريفي ولوحة خدمات']];
const projects=()=>`<div class="projects-grid">${projectData.map(([type,tag,category,title])=>`<article class="project-card" data-category="${category}"><div class="project-preview">${mock(type)}</div><div class="project-info"><span class="project-tag">${tag}</span><h3>${title}</h3></div></article>`).join('')}</div>`;
const offerCard=(compact=false)=>`<div class="offer-feature reveal"><div class="offer-copy"><span class="pill green">عرض خاص</span><h2>باقة الانطلاق الرقمي</h2><p>موقع إلكتروني كامل مع دومين مجاني للسنة الأولى، تصاميم متوافقة مع الهواتف، وربط واتساب مباشر.</p><div class="offer-price"><span class="amount">199 JOD</span><span class="period">دفعة واحدة</span></div>${btn('اطلب العرض الآن عبر واتساب',wa('مرحباً، أريد طلب باقة الانطلاق الرقمي (199 JOD).'),false,'target="_blank" rel="noopener"')}</div></div>`;
const cta=()=>`<section class="container cta-section reveal"><div class="cta-card">${eyebrow('تواصل مباشر')}<h2>هل لديك مشروع جاهز للتنفيذ؟</h2><p>تواصل معنا اليوم لتحويل فكرتك إلى موقع برمجي احترافي يخدم عملك.</p>${btn('تواصل معنا عبر واتساب',wa('مرحباً، أريد الاستفسار عن خدمات Facejo.'),false,'target="_blank" rel="noopener"')}</div></section>`;
const faq=(items)=>`<div class="faq-list">${items.map(([q,a])=>`<details><summary>${q}<span>+</span></summary><p>${a}</p></details>`).join('')}</div>`;
const domainWidget=(full=false)=>`<div class="domain-tool ${full?'domain-full':''}"><div class="domain-tool-intro">${eyebrow('فحص اسم النطاق')}${full?'<h1>ابحث عن الدومين المناسب لمشروعك</h1>':'<h2>افحص توفر الدومين لمشروعك</h2>'}</div><form id="domain-form" class="domain-form"><div class="domain-input-wrap"><input id="domain-input" type="text" placeholder="اكتب اسم الدومين مثلاً: facejo.com" dir="ltr"/><button id="domain-submit" class="button" type="submit">فحص الدومين</button></div><div class="tld-chips"><button type="button" data-tld="com">.com</button><button type="button" data-tld="net">.net</button><button type="button" data-tld="org">.org</button><button type="button" data-tld="jo">.jo</button></div><div id="domain-result"></div></form></div>`;

const pageBodies={
  '/':()=>`${animatedHeroSection()}<section class="container section-padding">${eyebrow('خدماتنا الرئيسية')}<h2>ماذا نقدم لك؟</h2>${services(true)}</section>${brandCardSection()}<section class="container section-padding">${eyebrow('عرض مميز')}<h2>أحدث العروض الحصرية</h2>${offerCard()}</section><section class="container section-padding">${eyebrow('أعمالنا')}<h2>نماذج من أعمالنا</h2>${projects()}</section><section class="container section-padding">${domainWidget()}</section>${cta()}`,
  '/services/':()=>`${heading('خدمات Facejo','خدمات متكاملة + استضافة وحلول برمجية')}<section class="container section-padding">${services(true)}</section>${brandCardSection()}<section class="container section-padding">${domainWidget()}</section>${cta()}`,
  '/offers/':()=>`${heading('العروض والأسعار','باقات مرنة تناسب جميع الميزانيات')}<section class="container section-padding">${offerCard()}</section><section class="container section-padding">${eyebrow('أسئلة شائعة')}<h2>أسئلة تهمك عن العروض</h2>${faq([['هل يوجد رسوم خفية؟','لا، الأسعار المعلنة شاملة للخدمات المحددة بدون أي تكاليف إضافية غير معلنة.'],['كم يستغرق تسليم الموقع؟','عادة بين 3 إلى 7 أيام عمل حسب حجم المشروع والمتطلبات.']])}</section>${cta()}`,
  '/work/':()=>`${heading('معرض الأعمال','مشاريع تم تنفيذها بكفاءة عالية')}<section class="container section-padding">${projects()}</section>${cta()}`,
  '/domains/':()=>`${heading('فحص الدومين','استكشف وتأكد من توفر اسم موقعك')}<section class="container section-padding">${domainWidget(true)}</section>${cta()}`,
  '/about/':()=>`${heading('عن Facejo','نقدم أفضل الحلول البرمجية والتصميم بأعلى معايير الجودة.')}${brandCardSection()}${cta()}`,
  '/contact/':()=>`${heading('تواصل معنا','يسعدنا التواصل معك ومناقشة مشروعك')}<section class="container section-padding"><div class="contact-grid"><div><h2>معلومات التواصل</h2><p>يمكنك التواصل معنا عبر الواتساب مباشرة للحصول على رد سريع.</p>${btn('تواصل عبر واتساب',wa(),false,'target="_blank" rel="noopener"')}</div></div></section>`,
  '/privacy/':()=>`${heading('سياسة الخصوصية','نلتزم بحماية خصوصية زوارنا ومعلوماتهم.')}<section class="container section-padding"><p>نحن في Facejo نحترم خصوصيتك ولا نجمع أي بيانات شخصية دون موافقتك.</p></section>`
};

function layout(route,body){
  const title=route==='/'?'Facejo | تصميم مواقع وبرمجيات مخصصة':'Facejo | '+[...routes].find(([r])=>r===route)?.[1];
  return `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title>${title}</title><link rel="canonical" href="${origin}${route}"/><link rel="stylesheet" href="${basePath}/style.css"/><link rel="icon" href="${basePath}/assets/favicon.svg" type="image/svg+xml"/></head><body><header class="header"><div class="header-inner container"><a href="${basePath}/" class="brand"><img src="${basePath}/assets/facejo-logo.svg" alt="Facejo"/></a><nav class="desktop-nav">${routes.map(([r,l])=>`<a href="${basePath}${r}">${l}</a>`).join('')}</nav>${btn('واتساب',wa(),false,'target="_blank" rel="noopener"')}</div></header><main>${body}</main><footer class="footer"><div class="container"><p>&copy; ${new Date().getFullYear()} Facejo. جميع الحقوق محفوظة.</p></div></footer><script src="${basePath}/app.js" defer></script></body></html>`;
}

for(const [route,render] of Object.entries(pageBodies)){
  let dir=out+route;
  fs.mkdirSync(dir,{recursive:true});
  fs.writeFileSync(dir+'index.html',layout(route,render()));
}
fs.writeFileSync(out+'/404.html',layout('/privacy/','<section class="page-heading container"><h1>الصفحة غير موجودة</h1><p>404</p></section>'));
fs.writeFileSync(out+'/robots.txt','User-agent: *\nAllow: /\nDisallow: /concepts/\nSitemap: '+origin+'/sitemap.xml');

function rewritePages(directory){
  for(const entry of fs.readdirSync(directory,{withFileTypes:true})){
    const file=path.join(directory,entry.name);
    if(entry.isDirectory()){
      rewritePages(file);
    }else if(file.endsWith('.html')){
      let content=fs.readFileSync(file,'utf8');
      content=content.replace(/(href|src)="\/([^"]*)"/g,(match,attr,value)=>`${attr}="${value.startsWith(basePath.slice(1)+'/')?'/'+value:basePath+'/'+value}"`);
      fs.writeFileSync(file,content);
    }
  }
}
if(basePath)rewritePages(out);
fs.writeFileSync(out+'/.nojekyll','');
console.log('Built merged FaceJo site successfully.');

// Publish the complete Gemini homepage with the same design as the supplied preview.
const standalone=fs.readFileSync('index.html','utf8').replace('</head>',`<link rel="canonical" href="${origin}/"/><link rel="icon" href="${basePath}/assets/favicon.svg" type="image/svg+xml"/></head>`);
fs.writeFileSync(out+'/index.html',standalone);
