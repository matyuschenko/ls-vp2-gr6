var validation = (function () {

	var init = function () {
		_setUpListeners();
		
	};

	var _setUpListeners = function () {
		$('form').on('focus', '.input-error', _removeError);
		$('form').on('reset', _clearForm);
	};

	var _removeError = function (item) {
		var item = $(this);

		item.removeClass('input-error');		
	};

	var _clearForm = function (form) {
		var form = $(this);
		form.find('.input-error').removeClass('input-error');
		form.find('.error-mes').hide();
	};


	// Универсальная функция

	var validateForm = function (form) {

		var elements = form.find('input, textarea').not('input[type="hidden"]'),
			valid = true;
		
		// Пройдемся по всем элементам формы
		$.each(elements, function (index, val) {
			var element = $(val),
				val = element.val();

			if(val.length === 0) {
				element.addClass('input-error');
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
