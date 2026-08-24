/**
 * Generates a CleanTrack favicon.ico (16x16 + 32x32) in pure Node.js.
 * Run: node scripts/gen-favicon.mjs
 */
import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const BG  = [0x2A,0x3B,0x06,0xFF];
const WHT = [0xFF,0xFF,0xFF,0xFF];
const DRK = [0x2A,0x3B,0x06,0x99];
const WHL = [0x3A,0x5C,0x1A,0xFF];
const EMR = [0x80,0xDE,0x4A,0xFF];
function fillRect(buf,W,x,y,w,h,c){for(let r=y;r<y+h;r++)for(let col=x;col<x+w;col++){if(col<0||col>=W||r<0||r>=W)continue;const i=(r*W+col)*4;buf[i]=c[0];buf[i+1]=c[1];buf[i+2]=c[2];buf[i+3]=c[3];}}
function fillCircle(buf,W,cx,cy,r,c){for(let row=Math.floor(cy-r);row<=Math.ceil(cy+r);row++)for(let col=Math.floor(cx-r);col<=Math.ceil(cx+r);col++){const dx=col-cx,dy=row-cy;if(dx*dx+dy*dy<=r*r){if(col<0||col>=W||row<0||row>=W)continue;const i=(row*W+col)*4;buf[i]=c[0];buf[i+1]=c[1];buf[i+2]=c[2];buf[i+3]=c[3];}}}
function fillRoundRect(buf,W,x,y,w,h,r,c){fillRect(buf,W,x+r,y,w-2*r,h,c);fillRect(buf,W,x,y+r,r,h-2*r,c);fillRect(buf,W,x+w-r,y+r,r,h-2*r,c);fillCircle(buf,W,x+r,y+r,r,c);fillCircle(buf,W,x+w-r,y+r,r,c);fillCircle(buf,W,x+r,y+h-r,r,c);fillCircle(buf,W,x+w-r,y+h-r,r,c);}
function renderIcon(S){const buf=new Uint8Array(S*S*4);const sc=S/32;const s=v=>Math.round(v*sc);fillRoundRect(buf,S,0,0,S,S,s(5),BG);fillRoundRect(buf,S,s(12),s(11),s(15),s(11),s(1.5),WHT);fillRect(buf,S,s(20),s(11),Math.max(1,s(0.8)),s(11),DRK);fillRoundRect(buf,S,s(4),s(13),s(9),s(9),s(1.5),WHT);fillRoundRect(buf,S,s(5.5),s(14.5),s(5),s(4),s(1),DRK);fillRoundRect(buf,S,s(3),s(20),s(2),s(2),s(0.5),WHT);[[8,23.5],[20,23.5],[25,23.5]].forEach(([wx,wy])=>{fillCircle(buf,S,s(wx),s(wy),s(2.5),WHL);fillCircle(buf,S,s(wx),s(wy),s(1.2),WHT);});const lx=s(22),ly=s(14),lw=s(4),lh=s(2);for(let row=ly;row<ly+lh;row++){const p=(row-ly)/lh;const hw=Math.round(lw*0.5*(1-Math.abs(p-0.5)*2));fillRect(buf,S,lx+Math.round(lw/2-hw),row,hw*2,1,EMR);}return buf;}
function buildBmpDib(size){const rgba=renderIcon(size);const pc=size*size;const mrb=Math.ceil(size/32)*4;const dib=Buffer.alloc(40+pc*4+size*mrb,0);let o=0;dib.writeUInt32LE(40,o);o+=4;dib.writeInt32LE(size,o);o+=4;dib.writeInt32LE(size*2,o);o+=4;dib.writeUInt16LE(1,o);o+=2;dib.writeUInt16LE(32,o);o+=2;dib.writeUInt32LE(0,o);o+=4;dib.writeUInt32LE(pc*4,o);o+=4;dib.writeInt32LE(0,o);o+=4;dib.writeInt32LE(0,o);o+=4;dib.writeUInt32LE(0,o);o+=4;dib.writeUInt32LE(0,o);o+=4;for(let r=size-1;r>=0;r--)for(let c=0;c<size;c++){const si=(r*size+c)*4;dib[o++]=rgba[si+2];dib[o++]=rgba[si+1];dib[o++]=rgba[si+0];dib[o++]=rgba[si+3];}return dib;}
function buildIco(sizes){const dibs=sizes.map(buildBmpDib);const hs=6+sizes.length*16;let off=hs;const parts=[];const hdr=Buffer.alloc(6);hdr.writeUInt16LE(0,0);hdr.writeUInt16LE(1,2);hdr.writeUInt16LE(sizes.length,4);parts.push(hdr);for(let i=0;i<sizes.length;i++){const sz=sizes[i];const dib=dibs[i];const e=Buffer.alloc(16);e.writeUInt8(sz===256?0:sz,0);e.writeUInt8(sz===256?0:sz,1);e.writeUInt8(0,2);e.writeUInt8(0,3);e.writeUInt16LE(1,4);e.writeUInt16LE(32,6);e.writeUInt32LE(dib.length,8);e.writeUInt32LE(off,12);parts.push(e);off+=dib.length;}for(const d of dibs)parts.push(d);return Buffer.concat(parts);}
const ico=buildIco([16,32]);
writeFileSync(resolve(__dirname,"../public/favicon.ico"),ico);
console.log("✓ favicon.ico written ("+ico.length+" bytes)");
