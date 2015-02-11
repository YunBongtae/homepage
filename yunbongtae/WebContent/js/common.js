
//////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////    변수    //////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
var publish = { 
		scroll:undefined,
		contentH: undefined,
}  

//////////////////////////////////////////////////////////////////////////////////////dataList
////////////////////////////      ready, load       //////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

$(window).load(function(){ 
	
});

$(document).ready(function(){
	allScroll();
	ajaxStart('../pages/main/main.html');
	$('body').append('<div class="link_list_box"><button type="button" class="fast_link_btn">리스트 목차</button><div class="link_list"><ul></ul></div></div>')
});

//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////    이벤트    //////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

$('#header .menu').on('click',function(){
	$('#nav').slideToggle();
	$('.link_list').slideUp();
});
$('#nav li a').on('click',function(){
	var thisUrl = $(this).attr('data-url');
	ajaxStart(thisUrl);
	$('#nav').slideUp();
});
$(document).on('click','.fast_link_btn',function(){
	$('.link_list').slideToggle();
	$('#nav').slideUp();
});
$(document).on('click','.link_list li',function(){
	
	var thisIndex = $(this).index(); 
	var listPositiom = $('#main_box h3').eq(thisIndex).position().top 
	$('#main_box').scrollTop(Number(listPositiom)-30)
	console.log(listPositiom)
	$('.link_list').slideUp();
});
//////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////    함수    //////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////


//화면 전체 스크롤
var allScroll = function() {
	var headH = $('#header').outerHeight(true);
	var windowH = $('#wrap').height()
	publish.contentH = windowH-headH;
	$('#content #main_box').css({'height':publish.contentH}); 
}
var ajaxStart = function(getUrl){
	var url = getUrl;
	var main_url = "../index.html";
	$.ajax({
			url : url, 
			type : "GET", 
			data : main_url,  
			success : function(data){			
				$('#main_box').html(data);
				$('section h3').each(function(){
					var h3Text = $(this).html()
					$('.link_list ul').append('<li>'+h3Text+'</li>');
				})
			}
	});
}

//디바이스 체크( 아이폰, 안드로이드, 그 외 )
var iPhoneCheck = function(ua) {
	var ua = ua || navigator.userAgent,
		android = ua.match(/Android\s([0-9\.]*)/), //안드로이드 버전을 알려줌
		iphone = ua.match(/(iPad|iPhone|iPod)/g); //아이폰인지만 확인 'iPhone'을 반환
	if(iphone !== null){
		iphone_scroll(this);
		//iphoneBounceNo();
		//console.log('dddd')
	}else{
		//console.log('그외')
	}
	if(android == null && iphone == null) return false;
	return android ? android[1] : iphone[1];
	
}