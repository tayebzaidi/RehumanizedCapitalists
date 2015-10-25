var restrictions = []


$(document).ready(function(){
	$('.check-circle').click(function(){
		if($(this).hasClass('active-check-circle')){
			$(this).removeClass('active-check-circle');
			var index = restrictions.indexOf($(this).attr('id'));
			if(index > -1){
				restrictions.splice(index, 1);
			}
		}
		else{
			$(this).addClass('active-check-circle');
			restrictions.push($(this).attr('id'));
		}
	});
});

function submitRestrictions() {
    var url = "ingredients.html?" + encodeURIComponent(restrictions);
    console.log(url);
    document.location.href = url;
}   