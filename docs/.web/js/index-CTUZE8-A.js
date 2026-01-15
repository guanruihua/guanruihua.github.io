import{r as v,j as t,c as Y}from"./index-CjABcFaQ.js";const Z=y=>{const e=Y.c(44),{size:r,progress:j,strokeWidth:l,scale:b,frequency:o,octaves:N,activeColor:i,inactiveColor:$,textColor:z}=y,s=r===void 0?250:r,S=j===void 0?50:j,D=l===void 0?20:l,E=b===void 0?15:b,n=o===void 0?.05:o,I=N===void 0?2:N,M=i===void 0?"#ceff00":i,P=$===void 0?"#333":$,G=z===void 0?"#ceff00":z,C=v.useId(),k=2*Math.PI*50,O=k-S/100*k,A=`${s}px`,B=`${s}px`;let w;e[0]!==A||e[1]!==B?(w={position:"relative",width:A,height:B},e[0]=A,e[1]=B,e[2]=w):w=e[2];const V=w,L=`${s*.2}px`;let q;e[3]!==L||e[4]!==G?(q={color:G,position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",fontSize:L,fontWeight:"bold"},e[3]=L,e[4]=G,e[5]=q):q=e[5];const X=q;let W;e[6]!==D?(W={fill:"none",strokeWidth:D,transition:"stroke-dashoffset 0.35s ease",strokeDasharray:`${k} ${k}`},e[6]=D,e[7]=W):W=e[7];const c=W,T=V,H=`url(#${C})`;let a;e[8]!==H?(a={width:"100%",height:"100%",transform:"rotate(-90deg)",filter:H},e[8]=H,e[9]=a):a=e[9];let d;e[10]!==c||e[11]!==P?(d=t.jsx("circle",{className:"progress-ring__background",style:{...c,stroke:P},r:50,cx:"60",cy:"60"}),e[10]=c,e[11]=P,e[12]=d):d=e[12];let u;e[13]!==M||e[14]!==c||e[15]!==O?(u=t.jsx("circle",{className:"progress-ring__progress",style:{...c,stroke:M,strokeDashoffset:O,strokeLinecap:"round"},r:50,cx:"60",cy:"60"}),e[13]=M,e[14]=c,e[15]=O,e[16]=u):u=e[16];let p;e[17]!==a||e[18]!==d||e[19]!==u?(p=t.jsxs("svg",{className:"progress-ring",style:a,viewBox:"0 0 120 120",children:[d,u]}),e[17]=a,e[18]=d,e[19]=u,e[20]=p):p=e[20];const J=X;let _;e[21]!==S?(_=Math.round(S),e[21]=S,e[22]=_):_=e[22];const K=`${_}%`;let x;e[23]!==J||e[24]!==K?(x=t.jsx("div",{style:J,children:K}),e[23]=J,e[24]=K,e[25]=x):x=e[25];let F;e[26]===Symbol.for("react.memo_cache_sentinel")?(F={position:"absolute"},e[26]=F):F=e[26];const Q=`${n} ${n}`,U=`${n} ${n};${n+.03} ${n-.03};${n} ${n};`;let h;e[27]!==U?(h=t.jsx("animate",{attributeName:"baseFrequency",dur:"10s",values:U,repeatCount:"indefinite"}),e[27]=U,e[28]=h):h=e[28];let f;e[29]!==I||e[30]!==Q||e[31]!==h?(f=t.jsx("feTurbulence",{type:"fractalNoise",baseFrequency:Q,numOctaves:I,result:"turbulenceResult",children:h}),e[29]=I,e[30]=Q,e[31]=h,e[32]=f):f=e[32];let g;e[33]!==E?(g=t.jsx("feDisplacementMap",{in:"SourceGraphic",in2:"turbulenceResult",scale:E,xChannelSelector:"R",yChannelSelector:"G"}),e[33]=E,e[34]=g):g=e[34];let m;e[35]!==C||e[36]!==f||e[37]!==g?(m=t.jsx("svg",{width:"0",height:"0",style:F,children:t.jsxs("filter",{id:C,children:[f,g]})}),e[35]=C,e[36]=f,e[37]=g,e[38]=m):m=e[38];let R;return e[39]!==T||e[40]!==p||e[41]!==x||e[42]!==m?(R=t.jsxs("div",{style:T,children:[p,x,m]}),e[39]=T,e[40]=p,e[41]=x,e[42]=m,e[43]=R):R=e[43],R},te=()=>{const[y,e]=v.useState(50),[r,j]=v.useState(20),[l,b]=v.useState(15),[o,N]=v.useState(.05),[i,$]=v.useState(2);return t.jsxs(t.Fragment,{children:[t.jsx("style",{children:`
    body {
      background-color: #1a1a1a;
      margin: 0;
      font-family: Arial, sans-serif;
    }

    #app-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      flex-direction: column;
      gap: 40px;
    }

    .controls {
      display: flex;
      flex-direction: column;
      gap: 15px;
      background: #2c2c2c;
      padding: 20px;
      border-radius: 8px;
      color: white;
      width: 300px;
    }

    .control-group {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .control-group label {
      display: flex;
      justify-content: space-between;
    }

    input[type="range"] {
      width: 100%;
    }
  `}),t.jsxs("div",{id:"app-container",children:[t.jsx(Z,{progress:y,strokeWidth:r,scale:l,frequency:o,octaves:i}),t.jsxs("div",{className:"controls",children:[t.jsxs("div",{className:"control-group",children:[t.jsxs("label",{children:["进度: ",t.jsxs("span",{children:[y,"%"]})]}),t.jsx("input",{type:"range",value:y,onChange:s=>e(Number(s.target.value)),min:"0",max:"100"})]}),t.jsxs("div",{className:"control-group",children:[t.jsxs("label",{children:["边框宽度: ",t.jsx("span",{children:r})]}),t.jsx("input",{type:"range",value:r,onChange:s=>j(Number(s.target.value)),min:"1",max:"50",step:"1"})]}),t.jsxs("div",{className:"control-group",children:[t.jsxs("label",{children:["波纹幅度 (scale): ",t.jsx("span",{children:l})]}),t.jsx("input",{type:"range",value:l,onChange:s=>b(Number(s.target.value)),min:"0",max:"50",step:"1"})]}),t.jsxs("div",{className:"control-group",children:[t.jsxs("label",{children:["波纹频率 (frequency): ",t.jsx("span",{children:o.toFixed(2)})]}),t.jsx("input",{type:"range",value:o,onChange:s=>N(Number(s.target.value)),min:"0.01",max:"0.2",step:"0.01"})]}),t.jsxs("div",{className:"control-group",children:[t.jsxs("label",{children:["波纹细节 (octaves): ",t.jsx("span",{children:i})]}),t.jsx("input",{type:"range",value:i,onChange:s=>$(Number(s.target.value)),min:"1",max:"10",step:"1"})]})]})]})]})};export{te as default};
