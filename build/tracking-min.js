/**
 * tracking.js - Augmented Reality JavaScript Framework.
 * @author Eduardo Lundgren <edu@rdo.io>
 * @version v0.0.1
 * @link http://trackingjs.com
 * @license BSD
 */
!function(r){r.tracking=r.tracking||{},tracking.forEach=function(r,t,n){var a;if(Array.isArray(r))r.forEach(function(){t.apply(n,arguments)});else for(a in r)r.hasOwnProperty(a)&&t.call(n,r[a],a,r);return r},tracking.inherits=function(r,t){function n(){}n.prototype=t.prototype,r.superClass_=t.prototype,r.prototype=new n,r.prototype.constructor=r,r.base=function(r,n){var a=Array.prototype.slice.call(arguments,2);return t.prototype[n].apply(r,a)}},tracking.isNode=function(r){return r.nodeType||this.isWindow(r)},tracking.isWindow=function(r){return!!(r&&r.alert&&r.document)},tracking.merge=function(r,t){for(var n in t)r[n]=t[n];return r},tracking.one=function(r,t){return this.isNode(r)?r:(t||document).querySelector(r)},tracking.track=function(r,t,n){if(r=tracking.one(r),!r)throw new Error("Element not found, try a different element or selector.");if(!t)throw new Error("Tracker not specified, try `tracking.track(element, new FaceTracker())`.");switch(r.nodeName.toLowerCase()){case"canvas":return this.trackCanvas_(r,t,n);case"img":return this.trackImg_(r,t,n);case"video":return this.trackVideo_(r,t,n);default:throw new Error("Element not supported, try in a canvas, img, or video.")}},tracking.trackCanvas_=function(r,t){var n=r.width,a=r.height,o=r.getContext("2d"),e=o.getImageData(0,0,n,a);t.track(e.data,n,a)},tracking.trackImg_=function(r,t){var n=r.width,a=r.height,o=document.createElement("canvas");o.width=n,o.height=a,tracking.Canvas.loadImage(o,r.src,0,0,n,a,function(){tracking.trackCanvas_(o,t)})},tracking.trackVideo_=function(t,n){var a=document.createElement("canvas"),o=a.getContext("2d"),e=t.offsetWidth,i=t.offsetHeight;a.width=e,a.height=i,r.requestAnimationFrame(function(){t.readyState===t.HAVE_ENOUGH_DATA&&(o.drawImage(t,0,0,e,i),tracking.trackCanvas_(a,n)),tracking.trackVideo_(t,n)})},r.self.Int8Array||(r.self.Int8Array=Array),r.self.Uint8Array||(r.self.Uint8Array=Array),r.self.Uint8ClampedArray||(r.self.Uint8ClampedArray=Array),r.self.Uint16Array||(r.self.Uint16Array=Array),r.self.Int32Array||(r.self.Int32Array=Array),r.self.Uint32Array||(r.self.Uint32Array=Array),r.self.Float32Array||(r.self.Float32Array=Array),r.self.Float64Array||(r.self.Float64Array=Array),r.URL||(r.URL=r.URL||r.webkitURL||r.msURL||r.oURL)}(window),function(){tracking.Brief={},tracking.Brief.N=128,tracking.Brief.getDescriptors=function(){},tracking.Brief.match=function(){}}(),function(){tracking.Canvas={},tracking.Canvas.loadImage=function(r,t,n,a,o,e,i){var c=this,l=new window.Image;l.onload=function(){var t=r.getContext("2d");t.drawImage(l,n,a,o,e),i&&i.call(c),l=null},l.src=t}}(),function(){tracking.EPnP={},tracking.EPnP.solve=function(){}}(),function(){tracking.Fast={},tracking.Fast.isCorner=function(){}}(),function(){tracking.Math={},tracking.Math.distance=function(r,t,n,a){var o=n-r,e=a-t;return Math.sqrt(o*o+e*e)},tracking.Math.hammingDistance=function(r,t){var n,a,o=0;for(n=0,a=r.length;a>n;n++)o+=this.hammingWeight(r[n]^t[n]);return o},tracking.Math.hammingWeight=function(r){return r-=r>>1&1431655765,r=(858993459&r)+(r>>2&858993459),16843009*(r+(r>>4)&252645135)>>24}}(),function(){tracking.Matrix={},tracking.Matrix.forEach=function(r,t,n,a,o){var e,i=o||1,c=0,l=0;for(c=0;n>c;c+=i)for(l=0;t>l;l+=i)e=c*t*4+4*l,a.call(this,r[e],r[e+1],r[e+2],r[e+3],e,c,l)},tracking.Matrix.transform=function(r,t,n,a){return tracking.Matrix.forEach(r,t,n,function(t,n,o,e,i){var c=a.apply(null,arguments);r[i]=c[0],r[i+1]=c[1],r[i+2]=c[2],r[i+3]=c[3]}),r}}(),function(){tracking.Tracker=function(){},tracking.Tracker.prototype.type=null,tracking.Tracker.prototype.getType=function(){return this.type},tracking.Tracker.prototype.onFound=function(){},tracking.Tracker.prototype.onNotFound=function(){},tracking.Tracker.prototype.setType=function(r){this.type=r},tracking.Tracker.prototype.track=function(){}}(),function(){tracking.ColorTracker=function(){this.setType("color"),this.setColors(["magenta"])},tracking.inherits(tracking.ColorTracker,tracking.Tracker),tracking.ColorTracker.MIN_PIXELS=30,tracking.ColorTracker.knownColors_={},tracking.ColorTracker.registerColor=function(r,t){tracking.ColorTracker.knownColors_[r]=t},tracking.ColorTracker.getColor=function(r){return tracking.ColorTracker.knownColors_[r]},tracking.ColorTracker.prototype.colors=null,tracking.ColorTracker.prototype.calculateCentralCoordinate_=function(r,t){for(var n=0,a=0,o=-1,e=-1,i=1/0,c=1/0,l=0,k=0;t>k;k+=2){var s=r[k],g=r[k+1];s>-1&&g>-1&&(n+=s,a+=g,l++,i>s&&(i=s),s>o&&(o=s),c>g&&(c=g),g>e&&(e=g))}return 0===l?null:{x:n/l,y:a/l,z:60-(o-i+(e-c))/2}},tracking.ColorTracker.prototype.flagOutliers_=function(r,t){for(var n=0;t>n;n+=2){for(var a=0,o=2;t>o;o+=2)a+=tracking.Math.distance(r[n],r[n+1],r[o],r[o+1]);a/t>=tracking.ColorTracker.MIN_PIXELS&&(r[n]=-1,r[n+1]=-1,t[n]--)}},tracking.ColorTracker.prototype.getColors=function(){return this.colors},tracking.ColorTracker.prototype.setColors=function(r){this.colors=r},tracking.ColorTracker.prototype.track=function(r,t,n){var a,o,e,i=this,c=this.getColors(),l=[],k=[],s=[];for(tracking.Matrix.forEach(r,t,n,function(r,t,n,k,g,f,u){for(e=-1;a=c[++e];)l[e]||(s[e]=0,l[e]=[]),o=tracking.ColorTracker.knownColors_[a],o&&o.call(i,r,t,n,k,g,f,u)&&(s[e]+=2,l[e].push(u,f))}),e=-1;a=c[++e];)if(!(s[e]<tracking.ColorTracker.MIN_PIXELS)){i.flagOutliers_(l[e],s[e]);var g=i.calculateCentralCoordinate_(l[e],s[e]);g&&(g.color=c[e],g.pixels=l[e],k.push(g))}k.length?i.onFound&&i.onFound.call(i,k):i.onNotFound&&i.onNotFound.call(i,k)},tracking.ColorTracker.registerColor("cyan",function(r,t,n){var a=50,o=70,e=r-0,i=t-255,c=n-255;return t-r>=a&&n-r>=o?!0:Math.sqrt(e*e+i*i+c*c)<80}),tracking.ColorTracker.registerColor("magenta",function(r,t,n){var a=50,o=r-255,e=t-0,i=n-255;return r-t>=a&&n-t>=a?!0:Math.sqrt(o*o+e*e+i*i)<140}),tracking.ColorTracker.registerColor("yellow",function(r,t,n){var a=50,o=r-255,e=t-255,i=n-0;return r-t>=a&&n-t>=a?!0:Math.sqrt(o*o+e*e+i*i)<100})}();