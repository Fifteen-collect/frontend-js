!function(e){function t(t){for(var r,o,a=t[0],l=t[1],c=t[2],d=0,p=[];d<a.length;d++)o=a[d],Object.prototype.hasOwnProperty.call(s,o)&&s[o]&&p.push(s[o][0]),s[o]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);for(u&&u(t);p.length;)p.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,a=1;a<n.length;a++){var l=n[a];0!==s[l]&&(r=!1)}r&&(i.splice(t--,1),e=o(o.s=n[0]))}return e}var r={},s={0:0},i=[];function o(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=r,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var a=window.webpackJsonp=window.webpackJsonp||[],l=a.push.bind(a);a.push=t,a=a.slice();for(var c=0;c<a.length;c++)t(a[c]);var u=l;i.push([7,1]),n()}([,,,,,,,function(e,t,n){"use strict";var r=n(1),s=n(3),i=s(n(0)),o=r(n(9)),a=s(n(13));n(22),n(24);let l=0,c=0;document.addEventListener("touchstart",()=>{l=c,c=+new Date}),document.addEventListener("touchend",e=>{+new Date-l<500&&(e.preventDefault(),e.target.click())}),o.render(i.default.createElement(a.default,null),document.getElementById("root"))},,,,,,function(e,t,n){"use strict";var r=n(3),s=n(1);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=s(n(0)),o=r(n(14)),a=r(n(17)),l=n(18),c=n(20),u=n(21);class d extends i.Component{constructor(e){super(e),this.state={matrix:[],settings:{size:3,availableSizes:[2,3,4,5,6,7]},moves:0,run:!1,time:0,buffer:{x:0,y:0},solved:!1};const{matrix:t,buffer:n}=this.randomizeMatrix(d.createDefaultMatrix(this.state.settings.size),{x:this.state.settings.size-1,y:this.state.settings.size-1});this.state.buffer=n,this.state.matrix=t,this.windowSize=innerWidth>innerHeight?innerHeight-innerHeight/10:innerWidth,this.state.relativeSize=this.windowSize/this.state.settings.size}render(){return i.createElement("div",{className:"container-fluid row main"},i.createElement(l.Header,{time:this.state.time,moves:this.state.moves,resetHandler:()=>this.handleReset(this.state.settings.size)}),i.createElement(u.Settings,{sizes:this.state.settings.availableSizes,resetHandler:this.handleReset.bind(this)}),i.createElement(c.Container,{size:this.windowSize},this.state.matrix.map((e,t)=>e.map((e,n)=>i.createElement(o.default,{key:`${t}-${n}`,value:e,size:this.state.relativeSize,solved:this.state.solved,clickHandler:()=>{this.blockEventHandler(t,n)},touchHandler:()=>{this.blockEventHandler(t,n)}})))))}handleReset(e){const{matrix:t,buffer:n}=this.randomizeMatrix(d.createDefaultMatrix(e),{x:e-1,y:e-1});clearInterval(this.state.timerInterval),this.setState({matrix:t,buffer:n,moves:0,run:!1,timerInterval:void 0,time:0,solved:!1,settings:{size:e,availableSizes:this.state.settings.availableSizes},relativeSize:this.windowSize/e})}blockEventHandler(e,t){let{matrix:n,moves:r,run:s,timerInterval:i,time:o}=this.state,a=n[e][t],l=this.state.buffer;if(d.isBlockCanMove(n,e,t)){const{x:c,y:u}=l;if(s||this.state.solved||(i=setInterval(()=>{this.isMatrixSolved()?(clearInterval(i),i=void 0,s=!1,this.setState({timerInterval:i,run:s,solved:!0})):(o+=10,this.setState({time:o}))},10)),this.state.solved)return;n[u][c]=a,n[e][t]=0,l={x:t,y:e},r++,s=!0}this.setState({matrix:n,buffer:l,moves:r,timerInterval:i,run:s})}static createDefaultMatrix(e){let t=[];for(let n=0,r=1;n<e;n++){t.push([]);for(let s=0;s<e;s++)t[n][s]=n+1===e&&s+1===e?0:r++}return t}static isBlockCanMove(e,t,n){return d.isBlockCanMoveUp(e,t,n)||d.isBlockCanMoveDown(e,t,n)||d.isBlockCanMoveLeft(e,t,n)||d.isBlockCanMoveRight(e,t,n)}static isBlockCanMoveUp(e,t,n){return!d.isBlockOnUpEdge(t)&&d.isBlockEmpty(e,t-1,n)}static isBlockCanMoveDown(e,t,n){return!d.isBlockOnDownEdge(t,e.length)&&d.isBlockEmpty(e,t+1,n)}static isBlockCanMoveLeft(e,t,n){return!d.isBlockOnLeftEdge(n)&&d.isBlockEmpty(e,t,n-1)}static isBlockCanMoveRight(e,t,n){return!d.isBlockOnRightEdge(n,e.length)&&d.isBlockEmpty(e,t,n+1)}static isBlockOnUpEdge(e){return 0===e}static isBlockOnDownEdge(e,t){return e===t-1}static isBlockOnLeftEdge(e){return 0===e}static isBlockOnRightEdge(e,t){return e===t-1}static isBlockEmpty(e,t,n){return 0===e[t][n]}isMatrixSolved(){for(let e=0,t=0;e<this.state.matrix.length;e++)for(let n=0;n<this.state.matrix[e].length;n++)if(++t,0!==this.state.matrix[e][n]&&this.state.matrix[e][n]!==t)return!1;return!0}randomizeMatrix(e,t){for(let n=0;n<5e4;n++){let n=(0,a.default)(e.length-1),r=(0,a.default)(e.length-1);d.isBlockCanMove(e,r,n)&&(e[t.y][t.x]=e[r][n],e[r][n]=0,t.y=r,t.x=n)}return{matrix:e,buffer:t}}}t.default=d},function(e,t,n){"use strict";var r=n(1);Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.BlockPropTypes=void 0;var s=r(n(0)),i=r(n(2));const o={value:i.number,size:i.number,clickHandler:i.func,touchHandler:i.func,solved:i.bool};t.BlockPropTypes=o;class a extends s.Component{render(){const e=Math.floor(this.props.size),t=this.isEmpty()?"bg-light":this.props.solved?"bg-success":"bg-dark";return s.createElement("div",{className:`noselect border rounded text-light d-flex align-items-center justify-content-center ${t}`,onMouseDown:this.props.clickHandler,onTouchStart:this.props.touchHandler,style:{width:`${e}px`,height:`${e}px`,flex:`0 0 ${e}px`,fontSize:"3rem",cursor:"pointer"}},this.props.value)}isEmpty(){return 0===this.props.value}}t.default=a,a.propTypes=o},,,,function(e,t,n){"use strict";var r=n(3),s=n(1);Object.defineProperty(t,"__esModule",{value:!0}),t.Header=t.HeaderPropTypes=void 0;var i=s(n(0)),o=s(n(2)),a=r(n(19));const l={resetHandler:o.func,time:o.number,moves:o.number};t.HeaderPropTypes=l;class c extends i.Component{render(){const e=(0,a.default)(this.props.time);return i.createElement("div",{className:"container-fluid inner-content",style:{marginLeft:"-15px"}},i.createElement("div",{className:"row p-2 d-flex align-items-center justify-content-between"},i.createElement("button",{className:"btn btn-primary btn-sm col-3",onClickCapture:this.props.resetHandler},"Reset"),i.createElement("div",{className:"text-center col-3"},i.createElement("b",null,e.hours?`${e.hours}:`:"",e.minutes,":",e.seconds,".",e.milliseconds)),i.createElement("div",{className:"text-center col-4"},i.createElement("b",null,"Moves: ",this.props.moves))))}}t.Header=c,c.propTypes=l},,function(e,t,n){"use strict";var r=n(1);Object.defineProperty(t,"__esModule",{value:!0}),t.Container=t.ContainerPropTypes=void 0;var s=r(n(0));const i={size:r(n(2)).number};t.ContainerPropTypes=i;class o extends s.Component{render(){return s.createElement("div",{className:"row d-flex justify-content-center mt-2 block-container",style:{width:`${this.props.size}px`,height:`${this.props.size}px`}},this.props.children)}}t.Container=o,o.propTypes=i},function(e,t,n){"use strict";var r=n(1);Object.defineProperty(t,"__esModule",{value:!0}),t.Settings=t.SettingsPropTypes=void 0;var s=r(n(0)),i=r(n(2));const o={sizes:i.array,resetHandler:i.func};t.SettingsPropTypes=o;class a extends s.Component{render(){return s.createElement("div",{className:"mt-2",style:{width:"100%"}},this.props.sizes.map(e=>s.createElement("button",{type:"button",key:e,className:"btn btn-dark btn-sm col-2",onClickCapture:()=>{this.props.resetHandler(e)}},e)))}}t.Settings=a,a.propTypes=o},,,function(e,t,n){var r=n(25);"string"==typeof r&&(r=[[e.i,r,""]]);var s={insert:"head",singleton:!1};n(6)(r,s);r.locals&&(e.exports=r.locals)},function(e,t,n){(e.exports=n(5)(!1)).push([e.i,".noselect {\n    -webkit-touch-callout: none; /* iOS Safari */\n    -webkit-user-select: none; /* Safari */\n    -khtml-user-select: none; /* Konqueror HTML */\n    -moz-user-select: none; /* Old versions of Firefox */\n    -ms-user-select: none; /* Internet Explorer/Edge */\n    user-select: none; /* Non-prefixed version, currently\n                                  supported by Chrome, Opera and Firefox */\n}\n\n.main {\n    height: 100vh;\n    flex-direction: column;\n    flex-wrap: nowrap;\n    margin-left: auto;\n    margin-right: auto;\n}\n\n.inner-content {\n    height: 10vh;\n    width: 100vw;\n}\n\n.block-container {\n    margin-left: -15px;\n    margin-right: auto;\n}\n\n@media (min-width: 1140px) {\n    .block-container {\n        margin-left: auto;\n    }\n}\n",""])}]);