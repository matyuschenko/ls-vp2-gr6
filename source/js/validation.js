var validation = (function () {

	var init = function () {
		_setUpListeners();
		
	};

	var _setUpListeners = function () {
		
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
			});

		return result;
	};

	// Универсальная функция

	var validateForm = function (form) {

		var elements = form.find('input, textarea').not('input[type="file"], input[type="hidden"]'),
			valid = true;
		
		// Пройдемся по всем элементам формы
		$.each(elements, function (index, val) {
			var element = $(val),
				val = element.val();

			if(val.length === 0) {
				valid = false;
			}
		});

		return valid;

	};

	return {
		init: init,
		validateForm: validateForm
	};

})();

validation.init();
