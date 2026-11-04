import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve('dist');
const origin=(process.env.SITE_URL||'https://aleh8m.github.io/facejo').replace(/\/$/,'');
const base=new URL(origin).pathname.replace(/\/$/,'');
let pages=0,links=0;
function scan(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
 const file=path.join(dir,entry.name);
 if(entry.isDirectory()){scan(file);continue;}
 if(!file.endsWith('.html'))continue;
 pages++;
 const html=fs.readFileSync(file,'utf8');
 assert(html.includes(origin),'Missing canonical origin: '+file);
 for(const [,raw] of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  if(!raw.startsWith('/')||raw.startsWith('//'))continue;
  const url=new URL(raw,origin);
  assert(url.pathname.startsWith(base+'/'),'Link outside Pages path: '+raw);
  let local=path.join(root,decodeURIComponent(url.pathname.slice(base.length)));
  if(url.pathname.endsWith('/'))local=path.join(local,'index.html');
  assert(fs.existsSync(local),'Missing local target: '+raw+' in '+file);links++;
 }
}}
scan(root);assert(pages>=9,'Missing expected pages');
console.log(`Verified ${pages} pages and ${links} local links/assets.`);
