import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve('dist');
const origin=(process.env.SITE_URL||'https://facejo-studio.briskbook8.chatgpt.site').replace(/\/$/,'');
const base=new URL(origin).pathname.replace(/\/$/,'');
let pages=0;
function scan(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,entry.name);if(entry.isDirectory())scan(file);else if(file.endsWith('.html')){pages++;const html=fs.readFileSync(file,'utf8');assert.match(html,/<html lang="ar" dir="rtl">/);for(const match of html.matchAll(/(?:href|src)="(\/[^"#?]*)[^\"]*"/g)){const link=match[1];if(link.startsWith('//'))continue;assert(!base||link===base||link.startsWith(base+'/'),'Unprefixed site URL: '+link);const relative=base?link.slice(base.length):link;const target=path.join(root,decodeURIComponent(relative));assert(fs.existsSync(target),'Missing local target: '+link);}}}}
scan(root);assert.equal(pages,12);assert(fs.existsSync(path.join(root,'.nojekyll')));
const home=fs.readFileSync(path.join(root,'index.html'),'utf8');assert(home.includes('content="'+origin+'/"'),'Incorrect canonical origin');assert(home.includes('"url":"'+origin+'"'),'Incorrect Organization URL');assert(fs.readFileSync(path.join(root,'sitemap.xml'),'utf8').includes('<loc>'+origin+'/</loc>'));
console.log('Verified '+pages+' HTML pages, local links, base path, metadata, and sitemap.');
