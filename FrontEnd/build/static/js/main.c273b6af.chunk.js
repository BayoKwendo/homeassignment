(this.webpackJsonpassignment=this.webpackJsonpassignment||[]).push([[0],{180:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(16),c=a.n(r),s=(a(62),a(56)),o=a(2);a(29),a(63);const i={headers:{"Content-Type":"application/json",Accept:"application/json","Access-Control-Allow-Origin":"*"}};var u=a(55),m=a.n(u),E=(a(81),a(17));var d=()=>{Object(n.useEffect)(()=>{t()},[]);const e={labels:["Red","Blue","Yellow"],datasets:[{label:"My First Dataset",data:[300,50,100],backgroundColor:["rgb(255, 99, 132)","rgb(54, 162, 235)","rgb(255, 205, 86)"],hoverOffset:4}]},t=()=>{m.a.post('http://127.0.0.1:8000/api/v1/get-metrics?query="impressions_total"',e,i).then(e=>{console.log(e),e.data.status}).catch(e=>{})};return l.a.createElement("div",{className:"col-6 offset-3"},l.a.createElement("div",null,l.a.createElement("h2",null,"Assigment"),l.a.createElement("br",null),l.a.createElement("h2",null,"Pie Chart"),l.a.createElement(E.Pie,{data:e})),l.a.createElement("div",null,l.a.createElement("h2",null,"Line Chart"),l.a.createElement(E.Line,{data:e})),l.a.createElement("div",null,l.a.createElement("h2",null,"Bar Chart"),l.a.createElement(E.Bar,{data:e})))};var h=function(){return l.a.createElement(s.a,null,l.a.createElement(o.c,null,l.a.createElement(o.a,{path:"/",element:l.a.createElement(d,null),exact:!0})))};var p=e=>{e&&e instanceof Function&&a.e(3).then(a.bind(null,181)).then(t=>{let{getCLS:a,getFID:n,getFCP:l,getLCP:r,getTTFB:c}=t;a(e),n(e),l(e),r(e),c(e)})};c.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(h,null)),document.getElementById("root")),p()},57:function(e,t,a){e.exports=a(180)},62:function(e,t,a){}},[[57,1,2]]]);
//# sourceMappingURL=main.c273b6af.chunk.js.map