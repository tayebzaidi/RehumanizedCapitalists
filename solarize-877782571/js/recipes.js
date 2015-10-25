


$(document).ready(function(){
	$('.recipe').hover(
		function(){
			$(this).addClass('activeRecipe');
		},
		function(){
			$(this).removeClass('activeRecipe');
		}
	);
	
	/*$('.arrow').hover(
		function(){
			$(this).hide("fast");
			$('.seeMore').fadeIn();
		},
		function(){
			$('.seeMore').fadeOut();
			$(this).show("fast");
		}
	);*/
	
	$('.recipe').click(function(){
		window.location.href = "index.html";
	});
	
	$('.arrow').click(function(){
		window.location.href = "index.html";
	});
});