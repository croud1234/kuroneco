$(document).ready(function(){
		
	//画像をアップロードする時の情報
	var upload_info = {
		'url': '',
		'description': 'photo description'
	};

	/**
	 * ダイアログを表示する
	 */
	custom_dialog = function(){
		var c = arguments[0];
		
		//memoに書いてある値を初期化する
		$("#jquery-ui-dialog-form-memo").val('');

		jQuery( function() {
			jQuery( '#jquery-ui-dialog' ).dialog( {
				autoOpen: false,
				show: 'blind',
				hide: 'blind',
				position: { my: "center+300", of: jQuery( "#"+c.id) },
				buttons: {
					"OK": function(){
						//memoに書いてある値を取得して
						upload_info['description'] = $("#jquery-ui-dialog-form-memo").val();
						$(this).dialog('close');

						//facebook投稿
						facebook_photos();
					},
					"NG": function(){
						$(this).dialog('close');
					}
				}
			} );
		} );

		//dialogを実行する
		jQuery( '#jquery-ui-dialog' ) . dialog( 'open' );
	}

	/**
	 * 画像をサーバに転送する。
	 * 正常に転送が出来たら、ダイアログを表示する関数を実行する
	 */
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
			upload_info['url'] = result['url'];
			custom_dialog(c);
		}); //done 
	}

	/**
	 * upload_infoに入っている情報を使って
	 * facebookに投稿する
	 */
	facebook_photos = function(){
		//ここからfacebookに投稿を行う
		FB.api('/me/photos', 'post', {
			message: upload_info['description'],
			url: upload_info['url']
		}, function (response) {
			if (!response || response.error) {
				alert('Error occured:' + response);
			}
			else {
				alert("facebookにアップロードしました");
			}
		});
	}
});
