// Заказ обратного звонка ЖК Кислород
$(".call-back-form").validate({
	submitHandler: function (form) {
		ajaxFormCallBackSubmit();
	},
});

//*************************************************** */

function ajaxFormCallBackSubmit() {
	let string = $(".call-back-form").serialize();

	$.ajax({
		type: "POST",
		url: "php/mail.php",
		data: string,

		success: function (html) {
			$(".call-back-form").slideUp(800);
			$(".answer-callback").html(html);
		},
	});

	return false;
}

// Заказ обратного звонка 2 ЖК Кислород
$(".form-callback-two").validate({

	submitHandler: function (form) {
		ajaxFormCallBackTwoSubmit();
	}
});

//*************************************************** */

function ajaxFormCallBackTwoSubmit() {

	let string = $(".form-callback-two").serialize();


	$.ajax({
		type: "POST",
		url: "php/mail.php",
		data: string,


		success: function (html) {
			$(".form-callback-two").slideUp(800);
			$('.answer-callback-two').html(html);
		}
	});

	return false;
}

// Заказ консультации  ЖК Кислород
$(".consultation-form").validate({

	submitHandler: function (form) {
		ajaxFormConsultationSubmit();
	}
});

//*************************************************** */

function ajaxFormConsultationSubmit() {

	let string = $(".consultation-form").serialize();


	$.ajax({
		type: "POST",
		url: "php/mail.php",
		data: string,


		success: function (html) {
			$(".consultation-form").slideUp(800);
			$('.answer-consultation').html(html);
		}
	});

	return false;
}
// Заказ консультации 2 ЖК Кислород
$(".consultation-form-two").validate({

	submitHandler: function (form) {
		ajaxFormConsultationTwoSubmit();
	}
});

//*************************************************** */

function ajaxFormConsultationTwoSubmit() {

	let string = $(".consultation-form-two").serialize();


	$.ajax({
		type: "POST",
		url: "php/mail.php",
		data: string,


		success: function (html) {
			$(".consultation-form-two").slideUp(800);
			$('.answer-consultation-two').html(html);
		}
	});

	return false;
}