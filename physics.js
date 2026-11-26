(function(root){'use strict';const MIN=71.25,MAX=112.5;
function moments(f1,f2,angle){const d1=.30,d2=.03,m1=f1*d1,m2=f2*d2,raw=m2-m1,net=Math.abs(raw)<1e-9?0:raw;return{d1,d2,m1,m2,net};}
function velocity(net){return Math.max(-37.5,Math.min(37.5,net*.0175*180/Math.PI));}
function step(angle,f1,f2,dt){const n=Math.max(1,Math.ceil(dt/(1/120))),h=dt/n;let value=angle;for(let i=0;i<n;i++)value=Math.max(MIN,Math.min(MAX,value+velocity(moments(f1,f2,value).net)*h));return value;}
function animate(state,f1,f2,dt){const angle=state.angle,net=moments(f1,f2,angle).net;if(net===0)return{angle,hold:0};const atEnd=(angle>=MAX&&net>0)||(angle<=MIN&&net<0);if(atEnd){const hold=(state.hold||0)+dt;return hold>=.4?{angle:90,hold:0}:{angle,hold};}return{angle:step(angle,f1,f2,dt),hold:0};}
root.JointPhysics={moments,velocity,step,animate,MIN,MAX};if(typeof module!=='undefined')module.exports=root.JointPhysics;
})(typeof window!=='undefined'?window:globalThis);
