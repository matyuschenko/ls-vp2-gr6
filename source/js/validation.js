var validation = (function () {

	var init = function () {
		_setUpListeners();
		
	};

	var _setUpListeners = function () {
		
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
