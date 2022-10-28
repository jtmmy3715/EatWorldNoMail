/*
*
* jquery.counterup.js
* https://github.com/bfintal/Counter-Up
* v1.0
* 
*/
(function(a){a.fn.counterUp=function(b){var d=a.extend({time:400,delay:10,offset:100,beginAt:0,formatter:false,context:"window",callback:function(){}},b),c;return this.each(function(){var e=a(this),f={time:a(this).data("counterup-time")||d.time,delay:a(this).data("counterup-delay")||d.delay,offset:a(this).data("counterup-offset")||d.offset,beginAt:a(this).data("counterup-beginat")||d.beginAt,context:a(this).data("counterup-context")||d.context};var g=function(){var u=[];var j=f.time/f.delay;var t=a(this).attr("data-num")?a(this).attr("data-num"):e.text();var o=/[0-9]+,[0-9]+/.test(t);t=t.replace(/,/g,"");var h=(t.split(".")[1]||[]).length;if(f.beginAt>t){f.beginAt=t}var p=/[0-9]+:[0-9]+:[0-9]+/.test(t);if(p){var w=t.split(":"),q=1;c=0;while(w.length>0){c+=q*parseInt(w.pop(),10);q*=60}}for(var n=j;n>=f.beginAt/t*j;n--){var s=parseFloat(t/j*n).toFixed(h);if(p){s=parseInt(c/j*n);var l=parseInt(s/3600)%24;var r=parseInt(s/60)%60;var v=parseInt(s%60,10);s=(l<10?"0"+l:l)+":"+(r<10?"0"+r:r)+":"+(v<10?"0"+v:v)}if(o){while(/(\d+)(\d{3})/.test(s.toString())){s=s.toString().replace(/(\d+)(\d{3})/,"$1,$2")}}if(d.formatter){s=d.formatter.call(this,s)}u.unshift(s)}e.data("counterup-nums",u);e.text(f.beginAt);var k=function(){if(!e.data("counterup-nums")){d.callback.call(this);return}e.html(e.data("counterup-nums").shift());if(e.data("counterup-nums").length){setTimeout(e.data("counterup-func"),f.delay)}else{e.data("counterup-nums",null);e.data("counterup-func",null);d.callback.call(this)}};e.data("counterup-func",k);setTimeout(e.data("counterup-func"),f.delay)};e.waypoint(function(h){g();this.destroy()},{offset:f.offset+"%",context:f.context})})}})(jQuery);