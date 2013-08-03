$(function(){
	$(window).load(function(){
		var delaySpeed = 100;
		var fadeSpeed = 1000;
		$('ul li canvas').each(function(i){
			if( $(this).css('display') == 'inline' ){
            	$(this).delay(i*(delaySpeed)).css({display:'block',opacity:'0'}).animate({opacity:'1'},fadeSpeed);
			}
		});
	});
});

