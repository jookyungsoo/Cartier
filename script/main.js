var $document,$window, $html, n;

var responsive={
	videoKey: function(){
		var $myVideo=$("#my_video");
		var vid=document.getElementById("my_video");
		vid.muted=true;
		vid.play();
		vid.addEventListener("ended", function(){
				vid.currentTime=0;
				vid.play();
		});

		var wid, hei;
		var videoH, videoW;
		$window.resize(function(){
			$myVideo.removeAttr("style");
			wid=$window.width();
			hei=$window.height();

			if(wid > hei){
				videoW=wid;
				$myVideo.css({width:videoW});
			}
			else{
				videoH=hei;
				$myVideo.css({height:videoH});

				videoW=$myVideo.width();
				$myVideo.css({left:"50%", marginLeft:(-1)*videoW/2});
			}
			videoH=$myVideo.height();
		});
		vid.addEventListener("loadeddata", function(){
			$window.trigger("resize");
		});
	},

	navScroll: function(){
		var timer=0;
		var t=0;
		var firstFlag=false;
		var $nav=$("#nav li");
		var $header=$("#header");
		var $services=$("#services");
		var $portfolio=$("#portfolio");
		var $aboutus=$("#aboutus");
		var $amazing=$("#amazing");
		var $contact=$("#contact");
		var $top=$(".top");
		var $section=$("section");
		n=0;
		$nav.eq(n).addClass("active");

		setTimeout(function(){
			$html.animate({scrollTop:0},800, function(){
				firstFlag=true;
				$services.removeClass("active");
				$window.trigger("scroll");
			});
		}, 10);

		$(window).scroll(function(){
			if(firstFlag == false){
				return;
			}
			clearTimeout(timer);

			timer=setTimeout(function(){
				t=$window.scrollTop();

				if(t >= $header.offset().top && t < $services.offset().top){
					n=0;
				}
				else if(t >= $services.offset().top && t < $portfolio.offset().top){
					n=1;
				}
				else if(t >= $portfolio.offset().top && t < $aboutus.offset().top){
					n=2;
					// $portfolio.addClass("active");
				}
				else if(t >= $aboutus.offset().top && t < $amazing.offset().top){
					n=3;
					// $aboutus.addClass("active");
				}
				else if(t >= $amazing.offset().top && t < $contact.offset().top){
					n=4;
					// $amazing.addClass("active");

					if($document.height() == $window.height()+t){
						n=5;
					}
				}
				else{
					n=5;
				}

				if(n == 0){
					$header.addClass("active");
					$(".btn_top").removeClass("active");
					$top.removeClass("active");
				}
				else{
					$section.eq(n-1).addClass("active");
					$(".btn_top").addClass("active");
					$top.addClass("active");
				}
				$nav.removeClass("active");
				$nav.eq(n).addClass("active");
			}, 100);
		});
	},

	btnTop: function(){
		$(".btn_top").click(function(e){
			e.preventDefault();
			$html.animate({scrollTop:0}, 400, function(){
				$(window).scrollTop(0);
			});
		});
	},

	navLi: function(){
		var goPage;
		var topPos;
		var $header=$("#header");
		var $section=$("section");

		$("#nav li, #mobile_nav li").click(function(e){
			e.preventDefault();
			n=$(this).index();

			if(n == 0){
				topPos=$header.offset().top;
				$html.animate({scrollTop:topPos}, 400);
			}
			else{
				topPos=$section.eq(n-1).offset().top;
			}
			$html.animate({scrollTop:topPos+2}, 400);
		});
	},

	closeTab: function(){
		var w;
		var h;
		var $mobile=$("#mobile_nav");
		var $close=$(".close_tab");
		var $tab=$(".tab");
		var $dim=$(".dim");

		$(window).resize(function(){
			w=$(window).width();
			if(w > 720){
				if($mobile.hasClass("active")){
					$close.trigger("click");
				}
			}
		});
		$(window).trigger("resize");

		$tab.click(function(e){
			e.preventDefault();
			$mobile.addClass("active");
			$tab.addClass("active");
			$dim.addClass("active");
		});
		$close.click(function(e){
			e.preventDefault();
			$mobile.removeClass("active");
			$tab.removeClass("active");
			$dim.removeClass("active");
		});
	}
}
