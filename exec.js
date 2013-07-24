$(document).ready(function(){
	execute = function() {
		//元の画像が読み込まれたら、その下に画像を表示する
		var img = document.getElementById('orig');
		//origの画像にイベントを追加
		//canvasというタグをすべて取得
		var canvases = document.getElementsByTagName('canvas');
		for (var i=0; i<canvases.length; i++) {
			var c = canvases[i];
			
			//各キャンバスにボタンを押した時に実行して欲しい関数を設定する
			c.onmousedown = (function() {
				//ここのthisはクリックしたcanvasの事です
				file_upload_ajax(this);
			});
			//cの親要素(figureタグ)に戻ってimg要素を複製してcの要素の前に追加します
			c.parentNode.insertBefore(img.cloneNode(true), c);
			c.style.display = 'none';
		}

		// フィルターを実行する
		function runFilter(id, filter, arg1, arg2, arg3) {
			var c = document.getElementById(id); //canvasの要素を取得する
			var s = c.previousSibling.style; //canvasの前にあるimgを表示するかしないか1

			//canvasの前の要素のdisplay属性がnone、表示しないであれば、inlineにして表示します。
			//canvasの結果はnoneで隠す
			//ボタンのテキストをoriginalにする
			if (s.display == 'none') {
				s.display = 'inline';
				c.style.display = 'none';
			} else {
				//idataにフィルタリングした画像の要素が入る
				var idata = Filters.filterImage(filter, img, arg1, arg2, arg3);
				c.width = idata.width;
				c.height = idata.height;
				var ctx = c.getContext('2d');
				ctx.putImageData(idata, 0, 0); //画像を置く
				s.display = 'none';
				c.style.display = 'inline';
			}
		}

		runFilter('grayscale', Filters.grayscale);
		runFilter('brightness', Filters.brightness, 40);
		runFilter('threshold', Filters.threshold, 128);
        runFilter('sharpen', Filters.convolute, [  0, -1,  0, 
                                                   -1,  5, -1, 
                                                   0, -1,  0 ] );
        runFilter('blur', Filters.convolute, [  1/9, 1/9, 1/9, 
                                                1/9, 1/9, 1/9, 
                                                1/9, 1/9, 1/9] );
 
        runFilter('sobel', function(px) {
              px = Filters.grayscale(px);
              var vertical = Filters.convoluteFloat32(px,
                 [-1,-2,-1,
                 0, 0, 0,
                 1, 2, 1]);
              var horizontal = Filters.convoluteFloat32(px,
                 [-1,0,1,
                 -2,0,2,
                 -1,0,1]);
              var id = Filters.createImageData(vertical.width, vertical.height);
              for (var i=0; i<id.data.length; i+=4) {
              var v = Math.abs(vertical.data[i]);
              id.data[i] = v;
              var h = Math.abs(horizontal.data[i]);
			  id.data[i+1] = h
			  id.data[i+2] = (v+h)/4;
			  id.data[i+3] = 255;
			  }
              return id;
              }
       ); 

		runFilter('reverse', Filters.reverse);
		runFilter('boostred', Filters.boostred);
		runFilter('boostgreen', Filters.boostgreen);
		runFilter('boostblue', Filters.boostblue);

	}
});
