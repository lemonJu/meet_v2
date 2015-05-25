// 扩展API加载完毕后调用onPlusReady回调函数 
document.addEventListener("plusready", function() {
	//	var winH = $(window).height();

	console.log('!!')
	// 切换tabs
	$(".tool_bar").on("tap", function() {
		var tabid = $(this).attr("data-id");
		$(".tabs").css("display", "none");
		$(tabid).css("display", "block");
		$(".tool_bar").removeClass('active');
		$(this).addClass('active');
	});
	
	$("#friends_bar").tap(function() {
		ajax(REMOTEURL + '/friendsGet', null, function(obj){
			var html = '';
			var people = JSON.parse(obj);
			people.forEach(function(person) {
				html += '\
				<div class="friends clearfix">\
	    			<div class="name_wrap">\
	    				<div class="name_box">\
		    				<div class="name">'+person.nickname_friend+'</div>\
		    				<div class="qianming">qianmingfsad</div>\
		    			</div>\
	    			</div>\
	    			<div class="head_imgbox">\
	    				<img src="img/head_img.png" alt="touxiang" width="100%" height="100%"/>\
	    			</div>\
	    			<div class="turn_left">\
	    				<i style="line-height: 60px;font-size:1.6em;" class="fa fa-chevron-right"></i>\
	    			</div>\
	    		</div>';
	    		
	    		$("#friends_box").html(html);
			})
		}, null)
	})

	// trigger事件触发聊天tabs
	$(".tool_one").trigger("tap");
	
	var connecting = {};
	// 联系人点击跳转到聊天界面
	$("#friends_box").on("tap", ".friends", function() {
		var name = $(this).find(".name").html();
		connecting[name] = {
			src: $(this).find("img").first().attr("src"),
			note: $(this).find(".qianming").html()
		}
		var temp = '';
		for(var name in connecting) {
			temp= '<div class="friends clearfix">\
	    			<div class="name_wrap">\
	    				<div class="name_box">\
		    				<div class="name">' + name + '</div>\
		    				<div class="qianming">' + connecting[name].note + '</div>\
		    			</div>\
	    			</div>\
	    			<div class="head_imgbox">\
	    				<img src="' + connecting[name].src + '" width="100%" height="100%"/>\
	    			</div>\
	    			<div class="turn_left">\
	    				<i style="line-height: 60px;font-size:1.6em;" class="fa fa-chevron-right"></i>\
	    			</div>\
	    		</div>';
		}
		 

		$("#chat_box").html(temp);

		//  点击后跳转到相应的聊天界面
		item.set('friendsActive', name);
		clicked('li_chat.html')
	});
	
	
	$("#chat_box").on("tap", ".friends", function() {
		var name = $(this).find(".name").html();
		//  点击后跳转到相应的聊天界面
		item.set('friendsActive', name);
		clicked('li_chat.html')
	});

}, false);
// 扩展API加载完毕，现在可以正常调用扩展API