// 扩展API加载完毕后调用onPlusReady回调函数 
document.addEventListener( "plusready", onPlusReady, false );
// 扩展API加载完毕，现在可以正常调用扩展API 
function onPlusReady() {
}

$(function(){
	var winH = $(window).height();
	
	$(".tool_bar").on("click", function(){
		$(".tool_bar").css("opacity", "1");
		$(this).css("opacity", "0.5");
	});
	
	
	
});











