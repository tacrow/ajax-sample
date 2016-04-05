(function(){

	var $DOC = $('body');
	var moreButton = '.moreButton';
	var $moreButton = $(moreButton);
	var num;
	var renderNum = 2;

	//First Load
	$(function() {
		num = 0;
		feedShow(num);
	});

	//Event
	$DOC.on('click', moreButton, function() {
		num = num + 2;
		feedShow(num);
	});

	//model
	var feedShow = function() {
		var param =  {
			url: 'data/userData.json',
			type: 'GET',
			dataType: 'json',
			success: success,
			error: error
		}
		ajax(param);
	};

	//view
	var template = function(param) {
		var html = 	'<li>' +
					'	<div class="commentModule clearfix">'+
					'	 	<img src="' + param.userImage + '" width="44" height="44">' +
					'		<div class="textAreaLarge">' +
					'			<div>' + param.userName + '</div>' +
					'			<div class="comment">' + param.commentText + '</div>' +
					'		</div>' +
					'	</div>' +
					'</li>';
		return html;
	};

	var success = function(data) {
		var start = num;
		var end = num + renderNum;
		if(end <= data.length) {
			for(var i = start; i < end; i++) {
				var param = {
					userImage: data[i].user_image,
					userName: data[i].user_name,
					commentText: data[i].comment_text
				};
				var template1 = template(param);
				$('.commentList').append(template1);
			}
			if(end == data.length) {
				$moreButton.css("display", "none");
			}
		}
	};

	var error = function(data) {
		var template2 = '<p>通信失敗</p>';
		$('.commentList').append(template2);
	};

	//general or base
	var ajax = function(param) {
		$.ajax({
			url: param.url,
			type: param.type,
			dataType: param.dataType,
			success: param.success,
			error: param.error
		});
	};

})();