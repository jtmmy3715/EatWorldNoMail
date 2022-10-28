!function(b,a){"object"==typeof exports&&"undefined"!=typeof module?a():"function"==typeof define&&define.amd?define(a):a()}(0,function(){function c(f,d){if(!(f instanceof d)){throw new TypeError("Cannot call a class as a function")}}var a=function(){function d(j,f){for(var g=0;g<f.length;g++){var h=f[g];h.enumerable=h.enumerable||!1,h.configurable=!0,"value" in h&&(h.writable=!0),Object.defineProperty(j,h.key,h)}}return function(f,g,h){return g&&d(f.prototype,g),h&&d(f,h),f}}(),b=function(){var d=".stickySidebar",e={topSpacing:0,bottomSpacing:0,containerSelector:!1,innerWrapperSelector:".inner-wrapper-sticky",stickyClass:"is-affixed",resizeSensor:!0,minWidth:!1};return function(){function f(g){var h=this,j=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(c(this,f),this.options=f.extend(e,j),this.sidebar="string"==typeof g?document.querySelector(g):g,void 0===this.sidebar){throw new Error("There is no specific sidebar element.")}this.sidebarInner=!1,this.container=this.sidebar.parentElement,this.affixedType="STATIC",this.direction="down",this.support={transform:!1,transform3d:!1},this._initialized=!1,this._reStyle=!1,this._breakpoint=!1,this._resizeListeners=[],this.dimensions={translateY:0,topSpacing:0,lastTopSpacing:0,bottomSpacing:0,lastBottomSpacing:0,sidebarHeight:0,sidebarWidth:0,containerTop:0,containerHeight:0,viewportHeight:0,viewportTop:0,lastViewportTop:0},["handleEvent"].forEach(function(i){h[i]=h[i].bind(h)}),this.initialize()}return a(f,[{key:"initialize",value:function(){var j=this;if(this._setSupportFeatures(),this.options.innerWrapperSelector&&(this.sidebarInner=this.sidebar.querySelector(this.options.innerWrapperSelector),null===this.sidebarInner&&(this.sidebarInner=!1)),!this.sidebarInner){var g=document.createElement("div");for(g.setAttribute("class","inner-wrapper-sticky"),this.sidebar.appendChild(g);this.sidebar.firstChild!=g;){g.appendChild(this.sidebar.firstChild)}this.sidebarInner=this.sidebar.querySelector(".inner-wrapper-sticky")}if(this.options.containerSelector){var h=document.querySelectorAll(this.options.containerSelector);if((h=Array.prototype.slice.call(h)).forEach(function(k,l){k.contains(j.sidebar)&&(j.container=k)}),!h.length){throw new Error("The container does not contains on the sidebar.")}}"function"!=typeof this.options.topSpacing&&(this.options.topSpacing=parseInt(this.options.topSpacing)||0),"function"!=typeof this.options.bottomSpacing&&(this.options.bottomSpacing=parseInt(this.options.bottomSpacing)||0),this._widthBreakpoint(),this.calcDimensions(),this.stickyPosition(),this.bindEvents(),this._initialized=!0}},{key:"bindEvents",value:function(){window.addEventListener("resize",this,{passive:!0}),window.addEventListener("scroll",this,{passive:!0}),this.sidebar.addEventListener("update"+d,this),this.options.resizeSensor&&"undefined"!=typeof ResizeSensor&&(new ResizeSensor(this.sidebarInner,this.handleEvent),new ResizeSensor(this.container,this.handleEvent))}},{key:"handleEvent",value:function(g){this.updateSticky(g)}},{key:"calcDimensions",value:function(){if(!this._breakpoint){var g=this.dimensions;g.containerTop=f.offsetRelative(this.container).top,g.containerHeight=this.container.clientHeight,g.containerBottom=g.containerTop+g.containerHeight,g.sidebarHeight=this.sidebarInner.offsetHeight,g.sidebarWidth=this.sidebar.offsetWidth,g.viewportHeight=window.innerHeight,this._calcDimensionsWithScroll()}}},{key:"_calcDimensionsWithScroll",value:function(){var g=this.dimensions;g.sidebarLeft=f.offsetRelative(this.sidebar).left,g.viewportTop=document.documentElement.scrollTop||document.body.scrollTop,g.viewportBottom=g.viewportTop+g.viewportHeight,g.viewportLeft=document.documentElement.scrollLeft||document.body.scrollLeft,g.topSpacing=this.options.topSpacing,g.bottomSpacing=this.options.bottomSpacing,"function"==typeof g.topSpacing&&(g.topSpacing=parseInt(g.topSpacing(this.sidebar))||0),"function"==typeof g.bottomSpacing&&(g.bottomSpacing=parseInt(g.bottomSpacing(this.sidebar))||0),"VIEWPORT-TOP"===this.affixedType?g.topSpacing<g.lastTopSpacing&&(g.translateY+=g.lastTopSpacing-g.topSpacing,this._reStyle=!0):"VIEWPORT-BOTTOM"===this.affixedType&&g.bottomSpacing<g.lastBottomSpacing&&(g.translateY+=g.lastBottomSpacing-g.bottomSpacing,this._reStyle=!0),g.lastTopSpacing=g.topSpacing,g.lastBottomSpacing=g.bottomSpacing}},{key:"isSidebarFitsViewport",value:function(){return this.dimensions.sidebarHeight<this.dimensions.viewportHeight}},{key:"observeScrollDir",value:function(){var h=this.dimensions;if(h.lastViewportTop!==h.viewportTop){var g="down"===this.direction?Math.min:Math.max;h.viewportTop===g(h.viewportTop,h.lastViewportTop)&&(this.direction="down"===this.direction?"up":"down")}}},{key:"getAffixType",value:function(){var l=this.dimensions,g=!1;this._calcDimensionsWithScroll();var h=l.sidebarHeight+l.containerTop,j=l.viewportTop+l.topSpacing,k=l.viewportBottom-l.bottomSpacing;return"up"===this.direction?j<=l.containerTop?(l.translateY=0,g="STATIC"):j<=l.translateY+l.containerTop?(l.translateY=j-l.containerTop,g="VIEWPORT-TOP"):!this.isSidebarFitsViewport()&&l.containerTop<=j&&(g="VIEWPORT-UNBOTTOM"):this.isSidebarFitsViewport()?l.sidebarHeight+j>=l.containerBottom?(l.translateY=l.containerBottom-h,g="CONTAINER-BOTTOM"):j>=l.containerTop&&(l.translateY=j-l.containerTop,g="VIEWPORT-TOP"):l.containerBottom<=k?(l.translateY=l.containerBottom-h,g="CONTAINER-BOTTOM"):h+l.translateY<=k?(l.translateY=k-h,g="VIEWPORT-BOTTOM"):l.containerTop+l.translateY<=j&&(g="VIEWPORT-UNBOTTOM"),l.translateY=Math.max(0,l.translateY),l.translateY=Math.min(l.containerHeight,l.translateY),l.lastViewportTop=l.viewportTop,g}},{key:"_getStyle",value:function(k){if(void 0!==k){var g={inner:{},outer:{}},h=this.dimensions;switch(k){case"VIEWPORT-TOP":g.inner={position:"fixed",top:h.topSpacing,left:h.sidebarLeft-h.viewportLeft,width:h.sidebarWidth};break;case"VIEWPORT-BOTTOM":g.inner={position:"fixed",top:"auto",left:h.sidebarLeft,bottom:h.bottomSpacing,width:h.sidebarWidth};break;case"CONTAINER-BOTTOM":case"VIEWPORT-UNBOTTOM":var j=this._getTranslate(0,h.translateY+"px");g.inner=j?{transform:j}:{position:"absolute",top:h.translateY,width:h.sidebarWidth}}switch(k){case"VIEWPORT-TOP":case"VIEWPORT-BOTTOM":case"VIEWPORT-UNBOTTOM":case"CONTAINER-BOTTOM":g.outer={height:h.sidebarHeight,position:"relative"}}return g.outer=f.extend({height:"",position:""},g.outer),g.inner=f.extend({position:"relative",top:"",left:"",bottom:"",width:"",transform:this._getTranslate()},g.inner),g}}},{key:"stickyPosition",value:function(q){if(!this._breakpoint){q=this._reStyle||q||!1;var i=this.getAffixType(),j=this._getStyle(i);if((this.affixedType!=i||q)&&i){var k="affix."+i.toLowerCase().replace("viewport-","")+d;f.eventTrigger(this.sidebar,k),"STATIC"===i?f.removeClass(this.sidebar,this.options.stickyClass):f.addClass(this.sidebar,this.options.stickyClass);for(var m in j.outer){this.sidebar.style[m]=j.outer[m]}for(var g in j.inner){var h="number"==typeof j.inner[g]?"px":"";this.sidebarInner.style[g]=j.inner[g]+h}var l="affixed."+i.toLowerCase().replace("viewport-","")+d;f.eventTrigger(this.sidebar,l)}else{this._initialized&&(this.sidebarInner.style.left=j.inner.left)}this.affixedType=i}}},{key:"_widthBreakpoint",value:function(){window.innerWidth<=this.options.minWidth?(this._breakpoint=!0,this.affixedType="STATIC",this.sidebar.removeAttribute("style"),f.removeClass(this.sidebar,this.options.stickyClass),this.sidebarInner.removeAttribute("style")):this._breakpoint=!1}},{key:"updateSticky",value:function(){var h=this,g=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this._running||(this._running=!0,function(i){requestAnimationFrame(function(){switch(i){case"scroll":h._calcDimensionsWithScroll(),h.observeScrollDir(),h.stickyPosition();break;case"resize":default:h._widthBreakpoint(),h.calcDimensions(),h.stickyPosition(!0)}h._running=!1})}(g.type))}},{key:"_setSupportFeatures",value:function(){var g=this.support;g.transform=f.supportTransform(),g.transform3d=f.supportTransform(!0)}},{key:"_getTranslate",value:function(){var j=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,g=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,h=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return this.support.transform3d?"translate3d("+j+", "+g+", "+h+")":!!this.support.translate&&"translate("+j+", "+g+")"}},{key:"destroy",value:function(){window.removeEventListener("resize",this),window.removeEventListener("scroll",this),this.sidebar.classList.remove(this.options.stickyClass),this.sidebar.style.minHeight="",this.sidebar.removeEventListener("update"+d,this);var i={inner:{},outer:{}};i.inner={position:"",top:"",left:"",bottom:"",width:"",transform:""},i.outer={height:"",position:""};for(var g in i.outer){this.sidebar.style[g]=i.outer[g]}for(var h in i.inner){this.sidebarInner.style[h]=i.inner[h]}this.options.resizeSensor&&"undefined"!=typeof ResizeSensor&&(ResizeSensor.detach(this.sidebarInner,this.handleEvent),ResizeSensor.detach(this.container,this.handleEvent))}}],[{key:"supportTransform",value:function(m){var g=!1,h=m?"perspective":"transform",j=h.charAt(0).toUpperCase()+h.slice(1),l=["Webkit","Moz","O","ms"],k=document.createElement("support").style;return(h+" "+l.join(j+" ")+j).split(" ").forEach(function(o,n){if(void 0!==k[o]){return g=o,!1}}),g}},{key:"eventTrigger",value:function(k,g,h){try{var j=new CustomEvent(g,{detail:h})}catch(k){(j=document.createEvent("CustomEvent")).initCustomEvent(g,!0,!0,h)}k.dispatchEvent(j)}},{key:"extend",value:function(k,g){var h={};for(var j in k){void 0!==g[j]?h[j]=g[j]:h[j]=k[j]}return h}},{key:"offsetRelative",value:function(k){var g={left:0,top:0};do{var h=k.offsetTop,j=k.offsetLeft;isNaN(h)||(g.top+=h),isNaN(j)||(g.left+=j),k="BODY"===k.tagName?k.parentElement:k.offsetParent}while(k);return g}},{key:"addClass",value:function(h,g){f.hasClass(h,g)||(h.classList?h.classList.add(g):h.className+=" "+g)}},{key:"removeClass",value:function(h,g){f.hasClass(h,g)&&(h.classList?h.classList.remove(g):h.className=h.className.replace(new RegExp("(^|\\b)"+g.split(" ").join("|")+"(\\b|$)","gi")," "))}},{key:"hasClass",value:function(h,g){return h.classList?h.classList.contains(g):new RegExp("(^| )"+g+"( |$)","gi").test(h.className)}}]),f}()}();window.StickySidebar=b,function(){if("undefined"!=typeof window){var f=window.$||window.jQuery||window.Zepto;if(f){f.fn.stickySidebar=function(g){return this.each(function(){var e=f(this),h=f(this).data("stickySidebar");if(h||(h=new b(this,"object"==typeof g&&g),e.data("stickySidebar",h)),"string"==typeof g){if(void 0===h[g]&&-1===["destroy","updateSticky"].indexOf(g)){throw new Error('No method named "'+g+'"')}h[g]()}})},f.fn.stickySidebar.Constructor=b;var d=f.fn.stickySidebar;f.fn.stickySidebar.noConflict=function(){return f.fn.stickySidebar=d,this}}}}()});