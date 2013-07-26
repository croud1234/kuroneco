$(document).ready(function(){
	file_upload_ajax = function(){
		var c = arguments[0];
		var canvasData = c.toDataURL();
		$.ajax({
			type: "POST",
			url: "image_save.php",
			headers: { 'Content-Type': 'application/upload'},
			data: canvasData
		}).done(function( respond ) {
			var result = JSON.parse(respond);
			//console.log(result);

			//ここからfacebookに投稿を行う
			var flag = window.confirm("facebookにアップロードしますか？");
			if( flag == true ){	
				FB.api('/me/photos', 'post', {
					message: 'photo description',
					url: result['url']
				}, function (response) {
					if (!response || response.error) {
						alert('Error occured:' + response);
					}
					else {
						alert("facebookにアップロードしました");
					}
				});
			}
		}); //done 
	}
});
