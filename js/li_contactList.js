// 扩展API加载完毕后调用onPlusReady回调函数 
document.addEventListener("plusready", function() {
	// 切换tabs
	$(".tool_bar").on("tap", function() {
		var tabid = $(this).attr("data-id");
		$(".tabs").css("display", "none");
		$(tabid).css("display", "block");
		$(".tool_bar").removeClass('active');
		$(this).addClass('active');

		$(".title").html($(this).data('desp'))
	});


	function getFriends() {
		ajax(REMOTEURL + '/friendsGet', null, function(obj) {
			var html = '';
			var people = JSON.parse(obj);
			people.forEach(function(person) {
				userPhotoes[person.nickname_friend] = person.photo;
				person.note = person.note || "暂无签名"
				html += '\
				<div class="friends clearfix">\
	    			<div class="name_wrap">\
	    				<div class="name_box">\
		    				<div class="name">' + person.nickname_friend + '</div>\
		    				<div class="qianming">' + person.note + '</div>\
		    			</div>\
	    			</div>\
	    			<div class="head_imgbox">\
	    				<img src="' + person.photo + '" alt="touxiang" width="100%" height="100%"/>\
	    			</div>\
	    			<div class="turn_left">\
	    				<i style="line-height: 60px;font-size:1.6em;" class="fa fa-chevron-right"></i>\
	    			</div>\
	    		</div>';

				$("#friends_box").html(html);
			})
			item.set('userPhotoes', JSON.stringify(userPhotoes));
		}, null)
	}

	getFriends()

	// trigger事件触发聊天tabs
	$(".tool_one").trigger("tap");


	var userPhotoes = {};

	// 保存正在聊天的用户信息
	var connecting = {};
	// 消息的读取状态
	var watched = {};

	// 联系人点击跳转到聊天界面
	$("#friends_box").on("tap", ".friends", function() {
		var name = $(this).find(".name").html();
		//console.log(name)
		connecting[name] = {
			src: $(this).find("img").first().attr("src"),
			note: $(this).find(".qianming").html()
		}
		watched[name] = true;
		// 显示通知界面
		addUserInfo();
		//  点击后跳转到相应的聊天界面
		item.set('friendsActive', name);
		clicked('li_chat.html')
	});


	$("#chat_box").on("tap", ".friends", function(e) {
		if (e.target.innerHTML == "删除") return
		var name = $(this).find(".name").html();
		// 显示消息成已读
		watched[name] = true;
		addUserInfo();
		//  点击后跳转到相应的聊天界面
		item.set('friendsActive', name);
		clicked('li_chat.html')
	});

	$("#friends_box").swipeDown(function() {
		if (!$(this).find(".refreash")[0]) {
			$(this).prepend("<div class='refreash' style='padding: 10px 0;text-align: center'>正在刷新..</div>");
			getFriends()
		}

	})


	$("#chat_box").on("swipeLeft", ".friends", function() {
		$(this).addClass('del-now')
	});

	$("#chat_box").on("swipeRight", ".friends", function() {
		$(this).removeClass('del-now')
	});
	
	$("#chat_box").on("tap", ".del", function() {
		$(this).parents('.friends').remove();
		return false;
	});

	function addUserInfo() {
		var temp = '';
		for (var name in connecting) {
			var watchedStr = !!watched[name] ? "watched" : "";
			temp += '<div class="friends clearfix ' + watchedStr + '">\
	    			<div class="name_wrap">\
	    				<div class="name_box">\
		    				<div class="name">' + name + '</div>\
		    				<div class="qianming">' + connecting[name].note + '</div>\
		    			</div>\
	    			</div>\
	    			<div class="head_imgbox">\
	    				<div class="imgbox_inner">\
	    					<img src="' + connecting[name].src + '" width="100%" height="100%"/>\
	    				</div>\
	    				<div class="tips-message">...</div>\
	    			</div>\
	    			<div class="turn_left">\
	    				<i style="line-height: 60px;font-size:1.6em;" class="fa fa-chevron-right"></i>\
	    			</div>\
	    			<div class="del">删除</div>\
	    		</div>';
		}

		$("#chat_box").html(temp);
	}

	function getMessage() {
		var xhr = new XMLHttpRequest();

		var url = 'http://reloney123.oicp.net:3000/chatGet';
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				var message = JSON.parse(xhr.responseText);
				message.forEach(function(mess) {

					var temp = item.get("_$_" + mess.from) || "";
					temp += '<div class="chat_row">\
			    		<div class="porel">\
			    		<span class="date">' + mess.time + '</span>\
				    		<span class="head_img">\
				    			<img src="' + mess.photo + '" alt=""/>\
				    		</span>\
				    		<span class="chat_content">\
				    			<div style="position: relative;">\
					    			<i class="arrow"></i>\
					    			<span>' + mess.content + '</span>\
				    			</div>\
				    		</span>\
			    		</div>\
			    	</div>';
					item.set("_$_" + mess.from, temp);
					connecting[mess.from] = {
						src: mess.photo,
						note: '123'
					}
					watched[mess.from] = false;
					// 刷新聊天界面
					addUserInfo()
				})
				getMessage()
			}
		}


		xhr.open("GET", url, true);
		xhr.withCredentials = true;
		xhr.send(null);
	}

	getMessage()
	setInterval(function() {
		getMessage()
	}, 60000 * 5)
	var myInfo = JSON.parse(JSON.parse(item.get("myInfo")));
	var my = $("#my");
	for(var me in myInfo) {
		if(me == 'photo'){console.log(myInfo[me])
			$("#my-" + me).attr("src", myInfo[me]);
		}else{
			$("#my-" + me).html(myInfo[me]);
		}
			
	}
}, false);


// 扩展API加载完毕，现在可以正常调用扩展API