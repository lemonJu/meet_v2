document.addEventListener("plusready", function() {
	var person = item.get('friendsActive');
	
	$(".title").html(person);
	var count = 1;
	$(".sound").on("click", function() {
		if (count % 2 == 1) {
			$("#change_class").removeClass("fa-google-wallet")
				.addClass("fa-keyboard-o");
			$(".input_box").css("display", "none");
			$(".button_box").css("display", "block");
			count++;
		} else {
			$("#change_class").removeClass("fa-keyboard-o")
				.addClass("fa-google-wallet");
			$(".input_box").css("display", "block");
			$(".button_box").css("display", "none");
			count++;
		}
	});

	// 消息处理
	$("#message").on("focus", function() {
		$(".plus").css("display", "none");
		$("#send").css("display", "block");
	});
	$("#message").on("blur", function() {
		var text = $("#message").val();
		if (text === "") {
			setTimeout(function() {
				$(".plus").css("display", "block");
				$("#send").css("display", "none");
			}, 200)
		}
	});
/*
	var $chatbody = $("#chat_body");
	var scrollH1 = $chatbody[0].scrollHeight;
	$chatbody.scrollTop = (scrollH1);*/
	//  var winH = $(window).height();
	//  var startbottom = parseInt($chatbody.css("bottom"));

	// 检测窗口是否发生改变
	$(window).on("resize", function() {
		scrollH1 = $chatbody[0].scrollHeight;
		$chatbody.scrollTop(scrollH1);
		$chatbody.css("bottom", "40px");

	});

	// 发送消息处理


	$("#send").on("click", function() {
		var text = $("#message").val();
		if (text === "") {
			$("#message").attr("placeholder", "不能发送空信息...");
		} else {
			var templ = '<div class="chat_row_me">' +
				'<div class="porel">' +
				'<span class="date">12:20</span>' +
				'<span class="head_img_me">' +
				'<img src="" alt=""/>' + //  此处需要头像图片
				'</span>' +
				'<span class="chat_content_me">' +
				'<div style="position: relative;">' +
				'<i class="arrow_me"></i>' +
				'<span>' + text + '</span>' +
				'</div>' +
				'</span>' +
				'</div>' +
				'</div>';
			$(".chat_body").append(templ);
			$("#message").val("");
			var xhr = new XMLHttpRequest();


			var url = 'http://reloney123.oicp.net:3000/chatSend?' + 'to=' + person + '&content=' + text;

			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4 && xhr.status == 200) {
					console.log(xhr.responseText)

				}
			}
			xhr.open("GET", url);
			xhr.withCredentials = true;
			xhr.send();
		}
	});


	function getMessage() {
		var xhr = new XMLHttpRequest();

		var url = 'http://reloney123.oicp.net:3000/chatGet';
		xhr.onreadystatechange = function() {
			console.log(xhr.readyState);
			if (xhr.readyState == 4 && xhr.status == 200) {
				var message = JSON.parse(xhr.responseText);
				message.forEach(function(mess) {
					var temp = '<div class="chat_row">\
			    		<div class="porel">\
			    		<span class="date">' + mess.time + '</span>\
				    		<span class="head_img">\
				    			<img src="" alt=""/>\
				    		</span>\
				    		<span class="chat_content">\
				    			<div style="position: relative;">\
					    			<i class="arrow"></i>\
					    			<span>' + mess.content + '</span>\
				    			</div>\
				    		</span>\
			    		</div>\
			    	</div>';
					$("#chat_body").html(temp)
				})
				getMessage()
			}
		}
		xhr.ontimeout = function() {
			getMessage()
		}

		xhr.open("GET", url, true);
		xhr.withCredentials = true;
		xhr.send(null);
	}

	getMessage()
	
	$(".left_back").click(function(){
		back();
	})
})