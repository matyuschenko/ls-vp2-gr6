var authorization = (function () {

	var init = function () {
		_setUpListeners();
		
	};

	var _setUpListeners = function () {
		$('#authorization-form').on('submit', _submitForm);
	};

	var _submitForm = function (e) {
		e.preventDefault();
		
		var form = $(this),
			url = '/auth',
			defObj = _ajaxForm(form, url),
			errorBox = form.find('.error-mes');

			if (validation.validateForm(form)) {
				errorBox.hide();
			}else{
				errorBox.show();
			}
			// что-то будем делать с ответом с сервера defObj
	};


	var _ajaxForm = function (form, url) {
		
		if (!validation.validateForm(form)) return false;
		// если false то код ниже не произойдет

		var data = form.serialize(),
			result = $.ajax({
				url: url,
				type: 'POST',
				dataType: 'json',
				data: data,
				success: function(msg, textStatus){
					console.log(msg+"/"+textStatus);

				}
			});


		return result;
	};

	return {
		init: init,
	};

})();

authorization.init();