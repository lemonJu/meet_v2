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
		// 显示聊天界面
		$('.dialog').show();
		renderUI();
	});


	$("#chat_box").on("tap", ".friends", function(e) {
		if (e.target.innerHTML == "删除") return
		var name = $(this).find(".name").html();
		// 显示消息成已读
		watched[name] = true;
		addUserInfo();
		//  点击后跳转到相应的聊天界面

		item.set('friendsActive', name);
		$('.dialog').show();
		renderUI();
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


	var myInfo = JSON.parse(JSON.parse(item.get("myInfo")));
	var my = $("#my");
	for (var me in myInfo) {
		if (me == 'photo') {
			console.log(myInfo[me])
			$("#my-" + me).attr("src", myInfo[me]);
		} else {
			$("#my-" + me).html(myInfo[me]);
		}

	}


	// form li.js

	function renderUI() {
		var person = item.get('friendsActive');
		// 命名当前联系人


		// 加载person数据
		if (person) {
			$(".title").html(person);
			$("#chat_body").html(item.get("_$_" + person) || "");
		}

	}

	function saveMessage(person, data, isAppend) {
		if (isAppend) {
			data = item.get("_$_" + person) + data;
		}
		item.set("_$_" + person, data);
	}



	window.a = "";

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
	//	$('.button_box').touchs(function() {
	//			startRecord()
	//		})
	$('.button_box').get(0).ontouchstart = function() {
		startRecord();
	}
	$('.button_box').get(0).ontouchend = function() {
		stopRecord();
		//	$("#send").css("display", "block");
		updateauo(a);
		//			$("#chat_body").tap(function() {
		//				var src = $('.proel').data('adoSrc')||window.a
		//				startPlay(src);
		//			})
		$(".porel").on("click", function() {
			alert(1)
		})
	}

	//	document.addEventListener("tap", function(){
	//		console.log("Dsadasdsa")
	//	}, false)
	//	
	$(document).delegate(".audioPlay", "click", function() {
		console.log(this)
			console.log($(this).attr('data-adoSrc'));
			startPlay($(this).attr('data-adoSrc'));
		})
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


	/*// 先滚动到低端
	var $chatbody = $("#chat_body");
	var scrollH1 = null;
	// 延迟等待图片加载成功后获取高度
	setTimeout(function() {
		scrollH1 = $chatbody[0].scrollHeight;
		if ($chatbody.height() - 1 != scrollH1) {
			$chatbody.get(0).scrollTop = scrollH1;
		};
	}, 200);

	// 检测窗口是否发生改变
	$(window).on("resize", function() {
		scrollH1 = $chatbody[0].scrollHeight;
		if ($chatbody.height() - 1 != scrollH1) {
			$chatbody.get(0).scrollTop = scrollH1;
		};
		$chatbody.css("bottom", "40px");
	});*/

	// 发送消息处理
	$("#send").on("click", function() {
		var text = $("#message").val();
		var person = item.get('friendsActive');
		var myInfo = JSON.parse(JSON.parse(item.get('myInfo')))
		if (text === "") {
			alert('不能发送空消息');
		} else {
			var date = new Date();
			var templ = '<div class="chat_row_me">' +
				'<div class="porel">' +
				'<span class="date">' +
				date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + '</span>' +
				'<span class="head_img_me">' +
				'<img src="' + myInfo['photo'] + '" alt=""/>' + //  此处需要头像图片
				'</span>' +
				'<span class="chat_content_me">' +
				'<div style="position: relative;">' +
				'<i class="arrow_me"></i>' +
				'<span>' + text + '</span>' +
				'</div>' +
				'</span>' +
				'</div>' +
				'</div>';

			saveMessage(person, templ, true);
			renderUI();
			// 滚动到底部
			//scrollH1 = $chatbody[0].scrollHeight;
			/*if (($chatbody.height() - 1) != scrollH1) {
				$chatbody.get(0).scrollTop = scrollH1;
			};*/

			//清空消息框
			$("#message").val("");
			$(".plus").css("display", "block");
			$("#send").css("display", "none");

			var xhr = new XMLHttpRequest();


			var url = REMOTEURL + '/chatSend?' + 'to=' + person + '&content=' + text;

			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4 && xhr.status == 200) {

				}
			}
			xhr.open("GET", url);
			xhr.withCredentials = true;
			xhr.send();
		}
	});

	function getMessage() {
		var xhr = new XMLHttpRequest();

		var url = REMOTEURL + '/chatGet';
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				var message = JSON.parse(xhr.responseText);

				var userPhotoes = JSON.parse(item.get('userPhotoes'));

				message.forEach(function(mess) {
					if (mess.type == 1) {
						var temp = '<div class="chat_row">\
				    		<div class="porel">\
				    		<span class="date">' + mess.time + '</span>\
					    		<span class="head_img">\
					    			<img src="' + userPhotoes[mess.from] + '" alt=""/>\
					    		</span>\
					    		<span class="chat_content">\
					    			<div style="position: relative;">\
						    			<i class="arrow"></i>\
						    			<span>' + mess.content + '</span>\
					    			</div>\
					    		</span>\
				    		</div>\
				    	</div>';
					} else if (mess.type == 2) {
						var temp = '<div class="chat_row audioPlay" data-adoSrc="' + mess.content + '">' + '<div class="porel">' + '<span class="date">' + mess.soundTime + '</span>' + '<span class="head_img_me">' + '<img src="' + userPhotoes[mess.from] + '" width="100%" height="100%" alt="own head image"/>' + '</span>' + '<span class="chat_content_me">' + '<div style="position: relative;">' + '<i class="arrow_me"></i>' + '<span class="audio_me">' + '<i class="fa fa-file-audio-o"></i>' + '<span class="audiotime_me">' + mess.time + '</span>' + '</span>' + '</div>' + '</span>' + '</div>' + '</div>';
					} else if (mess.type == 3) {
						var temp = '<div class="chat_row imgBox">' + '<div class="porel">' + '<span class="date">' + mess.time + '</span>' + '<span class="head_img">' + '<img src="' + userPhotoes[mess.from] + '" width="100%" height="100%" alt="own head image"/>' + '</span>' + '<span class="chat_content_img">' + '<div style="position: relative;">' + '<i class="arrow_img"></i>' + '<span class="send_image">' + '<img src="' + mess.content + '" width="100%" height="100%" alt="send"/>' + '</span>' + '</div>' + '</span>' + '</div>' + '</div>'
					}

					// 保存数据
					saveMessage(mess.from, temp, true);
				})

				// 渲染UI
				renderUI();
				getMessage()
			}
		}

		xhr.open("GET", url, true);
		xhr.withCredentials = true;
		xhr.send(null);
	}

	getMessage()


	// other options choose
	var $camera = $(".camera");
	var $photo = $(".photo");
	var countnum = 1;
	$(".plus").on("click", function() {
		if (countnum % 2 == 1) {
			$(".bar-footer").css("bottom", "4em");
			countnum++;
		} else {
			$(".bar-footer").css("bottom", "0em");
			countnum++;
		}
	});
	// 此处给添加摄像头，与相册的设置
	$camera.on("click", function() {
		camera();
	});
	$photo.on("click", function() {
		galleryImg();
	});

	function camera() {
			// 获取摄像头设备
			var cmr = plus.camera.getCamera();
			var res = cmr.supportedImageResolutions[0];
			var fmt = cmr.supportedImageFormats[0];
			cmr.captureImage(function(path) {
					console.log(path)
					upload(path);
				},
				function(error) {
					console.log("Capture image failed: " + error.message);
				}, {
					resolution: res,
					format: fmt
				});
		}
		// 从相册中选择图片 

	function upload(e) {
		var person = item.get('friendsActive');
		var server = REMOTEURL + '/chatSendPhoto';
		var task = plus.uploader.createUpload(server, {
				method: "POST"
			},
			function(t, status) { //上传完成
				if (status == 200) {
					var res = t.responseText
					var date = new Date();
					var temp = '<div class="chat_row_me imgBox">' + '<div class="porel">' + '<span class="date">' + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + '</span>' + '<span class="head_img_me">' + '<img src="../img/head_img.png" width="100%" height="100%" alt="own head image"/>' + '</span>' + '<span class="chat_content_me_img pull-right">' + '<div style="position: relative;">' + '<i class="arrow_me_img"></i>' + '<span class="send_image">' + '<img src="' + res + '" alt="send" class="img"/>' + '</span>' + '</div>' + '</span>' + '</div>' + '</div>';

					// 发送图片成功
					saveMessage(person, temp, true);
					renderUI();
				}
			}
		);
		task.addData("to", person)

		task.addFile(e, {
			key: Math.random()
		});
		task.start();
	}

	function galleryImg() {
		// 从相册中选择图片
		plus.gallery.pick(function(path) {
			upload(path);
		}, function(e) {
			console.log("取消选择图片");
		}, {
			filter: "image"
		});
	}



	setInterval(function() {
		getMessage()
	}, 60000 * 5)

	// 返回事件
	$(".left_back").click(function() {
		var person = item.get('friendsActive');
		saveMessage(person, $("#chat_body").html());
		$(".dialog").hide();
	})




	//录音部分


	var gentry = null,
		hl = null,
		le = null;
	var er = null,
		ep = null;
	document.addEventListener("DOMContentLoaded", function() {
		// 获取DOM元素对象
	}, false);
	// 添加播放项
	var a = "";
	var r = null,
		t = 0,
		ri = null,
		rt = null;
	window.t = 0;

	function startRecord() {
			console.log("开始录音：");
			r = plus.audio.getRecorder();
			if (r == null) {
				console.log("录音对象未获取");
				return;
			}
			r.record({
				filename: "_doc/audio/"
			}, function(p) {
				console.log("录音完成：" + p);
				window.a = p;
				updateauo(p);
			}, function(e) {
				console.log("录音失败：" + e.message);
			});
			ri = setInterval(function() {
				window.t++;
			}, 1000)
		}
		// 停止录音

	function stopRecord() {

			clearInterval(ri);
			ri = null;
			r.stop();
			w = null;
			r = null;

		}
		// 清除历史记录
		// 播放音频文件

	function playAudio(li) {
		if (!li || !li.entry) {
			console.log("无效的音频文件");
			return;
		}
		console.log("播放音频文件：" + li.entry.name);
		startPlay("_doc/audio/" + li.entry.name);
	}

	function updateauo(f) {
		var server = REMOTEURL + '/chatSendSound';
		var person = item.get('friendsActive');
		var task = plus.uploader.createUpload(server, {
			method: "POST"
		}, function(t, status) { //上传完成
			if (status == 200) {
				var res = t.responseText;
				if (res.indexOf("undefined") == -1) {
					var date = new Date();
					console.log(res);
					var vdo = '<div class="chat_row_me audioPlay">' + '<div class="porel">' + '<span class="date">' + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + '</span>' + '<span class="head_img_me">' + '<img src="../img/head_img.png" width="100%" height="100%" alt="own head image"/>' + '</span>' + '<span class="chat_content_me">' + '<div style="position: relative;">' + '<i class="arrow_me"></i>' + '<span class="audio_me">' + '<i class="fa fa-file-audio-o"></i>' + '<span class="audiotime_me">' + window.t + '秒</span>' + '</span>' + '</div>' + '</span>' + '</div>' + '</div>';

					saveMessage(person, vdo, true);
					renderUI();
					//$("#chat_body").append(vdo);
					window.t = 0;
				}
			}
		});
		task.addData("to", person);
		task.addFile(f, {
			key: Math.random()
		});
		task.start();
	}

	var p = null,
		pt = null,
		pp = null,
		ps = null,
		pi = null;
	// 开始播放
	function startPlay(url) {
		p = plus.audio.createPlayer(url);
		p.play(function() {
			console.log("播放完成！");
		}, function(e) {
			console.log("播放音频文件\"" + url + "\"失败：" + e.message);
		});
	}
}, false);


// 扩展API加载完毕，现在可以正常调用扩展API