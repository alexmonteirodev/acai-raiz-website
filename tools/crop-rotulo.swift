// Detecta o saco e a faixa do rótulo, e imprime o crop centrado no rótulo.
// uso: swift crop-rotulo.swift <img> <cropW> <cropH>
import Foundation
import CoreGraphics
import ImageIO
let a = CommandLine.arguments
guard let s = CGImageSourceCreateWithURL(URL(fileURLWithPath:a[1]) as CFURL,nil),
      let img = CGImageSourceCreateImageAtIndex(s,0,nil) else { exit(1) }
let cw = Int(a[2])!, ch = Int(a[3])!
let w = img.width, h = img.height
var buf = [UInt8](repeating:0,count:w*h*4)
guard let ctx = CGContext(data:&buf,width:w,height:h,bitsPerComponent:8,bytesPerRow:w*4,
        space:CGColorSpaceCreateDeviceRGB(),
        bitmapInfo:CGImageAlphaInfo.premultipliedLast.rawValue) else { exit(1) }
ctx.draw(img,in:CGRect(x:0,y:0,width:w,height:h))
func px(_ x:Int,_ y:Int)->(Int,Int,Int,Int){ let i=(y*w+x)*4
  return (Int(buf[i]),Int(buf[i+1]),Int(buf[i+2]),Int(buf[i+3])) }
var kx0=w,ky0=h,kx1=0,ky1=0
for y in 0..<h { for x in 0..<w { let (r,g,b,al)=px(x,y)
  if al>200 && r>140 && r<240 && g>100 && g<205 && b>55 && b<180 && (r-b)>40 {
    if x<kx0{kx0=x}; if x>kx1{kx1=x}; if y<ky0{ky0=y}; if y>ky1{ky1=y} } } }
let ins=(kx1-kx0)/12, x0=kx0+ins, x1=kx1-ins, pw=x1-x0
var rows=[Int](repeating:0,count:h)
for y in ky0..<ky1 { var c=0
  for x in x0...x1 { let (r,g,b,al)=px(x,y)
    if al>200 && (r*299+g*587+b*114)/1000<125 { c+=1 } }
  rows[y]=c }
let thr=max(4,pw*4/100)
var best=(0,0),cur=(-1,-1),gap=0
for y in ky0..<ky1 {
  if rows[y]>=thr { if cur.0 < 0 {cur=(y,y)} else {cur.1=y}; gap=0 }
  else if cur.0 >= 0 { gap+=1
    if gap>40 { if cur.1-cur.0>best.1-best.0 {best=cur}; cur=(-1,-1) } } }
if cur.0 >= 0 && cur.1-cur.0>best.1-best.0 { best=cur }
// crop centrado: x no centro do saco, y no centro da faixa do rotulo
var ox=(kx0+kx1)/2-cw/2, oy=(best.0+best.1)/2-ch/2
ox=max(0,min(ox,w-cw)); oy=max(0,min(oy,h-ch))
print("\(oy) \(ox)")
