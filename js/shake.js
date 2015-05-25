
// 摇一摇
if(window.plus){
	plusReady();
}else{
	document.addEventListener("plusready",plusReady,false);
}

var playaudio = null, offset = 50;
var $shakeup = $(".shake_up");
var $shakedown = $(".shake_down");

function plusReady(){
	
	plus.accelerometer.watchAcceleration(function(succ){
		
		if (!playaudio && Math.abs(succ.xAxis)+Math.abs(succ.yAxis)+Math.abs(succ.zAxis) > 30){
			
			playaudio = plus.audio.createPlayer("../audio/shake.wav");
			playaudio.play();
			
			$shakedown.css("-webkit-transform", "translateY("+ offset +"px)");
			$shakeup.css("-webkit-transform", "translateY(-"+ offset +"px)");
			
			setTimeout(function(){
				
				$shakedown.css("-webkit-transform", "");
				$shakeup.css("-webkit-transform", "");
				
				playaudio.stop(); 
				delete playaudio;
				playaudio = null;
				
				clicked("../map/map.html");
			},2000);
		}
	},function(error){
		console.log("错误信息：" + error.message);
	},{
		frequency:100
	});
}






