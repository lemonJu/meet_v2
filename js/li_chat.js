document.addEventListener('plusready', function() {
	var person = item.get('friendsActive');
	window.a = "";
	$(".title").html(person);
	//console.log(item.get("_$_" + person))
	$("#chat_body").append(item.get("_$_" + person) || "");
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
			$("#chat_body").tap(function() {
				startPlay(window.a);
			})
		}
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


	// 先滚动到低端
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
	});

	// 发送消息处理
	$("#send").on("click", function() {
		var text = $("#message").val();
		console.log(item.get('myInfo'))
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
			$(".chat_body").append(templ);
			// 滚动到底部
			scrollH1 = $chatbody[0].scrollHeight;
			if (($chatbody.height() - 1) != scrollH1) {
				$chatbody.get(0).scrollTop = scrollH1;
			};

			//清空消息框
			$("#message").val("");
			$(".plus").css("display", "block");
			$("#send").css("display", "none");

			var xhr = new XMLHttpRequest();


			var url = REMOTEURL+'/chatSend?' + 'to=' + person + '&content=' + text;

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

		var url = REMOTEURL+'/chatGet';
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
						var temp = '<div class="chat_row audioPlay palyvvv">' + '<div class="porel">' + '<span class="date">'+mess.time+'</span>' + '<span class="head_img_me">' + '<img src="' + content + '" width="100%" height="100%" alt="own head image"/>' + '</span>' + '<span class="chat_content_me">' + '<div style="position: relative;">' + '<i class="arrow_me"></i>' + '<span class="audio_me">' + '<i class="fa fa-file-audio-o"></i>' + '<span class="audiotime_me">'+mess.time+'</span>' + '</span>' + '</div>' + '</span>' + '</div>' + '</div>';
					} else if (mess.type == 3) {
						var temp = '<div class="chat_row imgBox">' + '<div class="porel">' + '<span class="date">'+mess.time+'</span>' + '<span class="head_img">' + '<img src="' + userPhotoes[mess.from] + '" width="100%" height="100%" alt="own head image"/>' + '</span>' + '<span class="chat_content_img">' + '<div style="position: relative;">' + '<i class="arrow_img"></i>' + '<span class="send_image">' + '<img src="' + mess.content + '" width="100%" height="100%" alt="send"/>' + '</span>' + '</div>' + '</span>' + '</div>' + '</div>'
					}
					$("#chat_body").append(temp)
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

		var server = REMOTEURL + '/chatSendPhoto';
		var task = plus.uploader.createUpload(server, {
				method: "POST"
			},
			function(t, status) { //上传完成
				if (status == 200) {
					var res = t.responseText
					var date = new Date();
					var temp = '<div class="chat_row_me imgBox">' + '<div class="porel">' + '<span class="date">'+date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()+'</span>' + '<span class="head_img_me">' + '<img src="../img/head_img.png" width="100%" height="100%" alt="own head image"/>' + '</span>' + '<span class="chat_content_me_img pull-right">' + '<div style="position: relative;">' + '<i class="arrow_me_img"></i>' + '<span class="send_image">' + '<img src="' + res + '" alt="send" class="img"/>' + '</span>' + '</div>' + '</span>' + '</div>' + '</div>';
					$("#chat_body").append(temp);
				}
			}
		);
		task.addData("to", item.get('friendsActive'))

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

	$(".left_back").click(function() {
		item.set("_$_" + person, $("#chat_body").html());
		back();
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
	var a="";
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
			ri = setInterval(function(){
				window.t++;
			},1000)
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
		var task = plus.uploader.createUpload(server, {
				method: "POST"
			},function(t, status) { //上传完成
				if (status == 200) {
           			var res = t.responseText;
					if(res.indexOf("undefined")==-1){ 
						var date = new Date();
						console.log(res);
						var vdo = '<div class="chat_row_me audioPlay">' + '<div class="porel">' + '<span class="date">'+date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()+'</span>' + '<span class="head_img_me">' + '<img src="../img/head_img.png" width="100%" height="100%" alt="own head image"/>' + '</span>' + '<span class="chat_content_me">' + '<div style="position: relative;">' + '<i class="arrow_me"></i>' + '<span class="audio_me">' + '<i class="fa fa-file-audio-o"></i>' + '<span class="audiotime_me">'+window.t+'秒</span>' + '</span>' + '</div>' + '</span>' + '</div>' + '</div>';
						$("#chat_body").append(vdo);
						window.t = 0;
					}
				}
			}
		);
		task.addData("to", item.get('friendsActive'));
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
		// 停止播放
}, false)