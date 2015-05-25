// 扩展API加载完毕后调用onPlusReady回调函数 
document.addEventListener("plusready", function() {
	//	var winH = $(window).height();


	// 切换tabs
	$(".tool_bar").on("click", function() {
		var tabid = $(this).attr("data-id");
		$(".tabs").css("display", "none");
		$(tabid).css("display", "block");
		$(".tool_bar").css("opacity", "1");
		$(this).css("opacity", "0.5");
	});
	
	$("#friends_bar").click(function() {
		ajax(REMOTEURL + 'friendsGet', null, function(){
			
		}, null)
	})

	// trigger事件触发聊天tabs
	$(".tool_one").trigger("click");

	// 联系人点击跳转到聊天界面
	$("#friends_box").on("click", ".friends", function() {
		var name = $(this).find(".name").html();
		var qianming = $(this).find(".qianming").html();
		var imgsrc = $(this).find("img").first().attr("src");
		var imgalt = $(this).find("img").first().attr("alt");

		var temp = '<div class="friends clearfix">\
	    			<div class="name_wrap">\
	    				<div class="name_box">\
		    				<div class="name">' + name + '</div>\
		    				<div class="qianming">' + qianming + '</div>\
		    			</div>\
	    			</div>\
	    			<div class="head_imgbox">\
	    				<img src="' + imgsrc + '" alt="' + imgalt + '" width="100%" height="100%"/>\
	    			</div>\
	    			<div class="turn_left">\
	    				<i style="line-height: 60px;font-size:1.6em;" class="fa fa-chevron-right"></i>\
	    			</div>\
	    		</div>';

		$("#chat_box").append(temp);

		//  点击后跳转到相应的聊天界面
		item.set('friendsActive', name);
		console.log('friend:', name);
		
		clicked('li_chat.html')
		//window.location.href = "li_chat.html";
	});

}, false);
// 扩展API加载完毕，现在可以正常调用扩展API