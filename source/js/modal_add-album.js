// ДОБАВИТЬ АЛЬБОМ

var addAlbum = (function () {

	var $input = $('.modal__input-upload');
		

	var init = function () {
		_setUpListeners();
		
	};

	var _setUpListeners = function () {
		$('#form__add-album').on('submit', _submitForm);
		$('form').on('reset', _clearButton);
	};

	var _submitForm = function (e) {
		e.preventDefault();
		
		var form = $(this),
			url = '/albumcreate',
			defObj = _ajaxForm(form, url),
			defObjFile = _ajaxFileUpload(form, url),
			errorBox = form.find('.error-mes'),
			buttonUpload = form.find('.button_load-cover'),
			inputFile = form.find('.modal__input-upload');
			
			if (validation.validateForm(form)) {
				errorBox.hide();
			}else{
				errorBox.show();
			}

			if (inputFile.val().length === 0) {
				buttonUpload.removeClass('button_transparent')
				.addClass('button_reset');
			} else {
				buttonUpload.removeClass('button_transparent')
				.removeClass('button_reset')
				.addClass('button_submit');
			}
			// что-то будем делать с ответом с сервера defObj
	};

	var _clearButton = function (form) {
		var form = $(this);
		form.find('.button_load-cover').removeClass('button_reset')
		.removeClass('button_submit')
		.addClass('button_transparent');
	};


	var _ajaxForm = function (form, url) {
		
		if (!validation.validateForm(form)) return false;
		var file = $input.prop('files')[0];
		if (file.size/1024 > 1024) {
			return false;
		}
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

	var _ajaxFileUpload = function (form, url) {
		
		if (!validation.validateForm(form)) return false;
		// если false то код ниже не произойдет

		var fd = new FormData(),
			file = $input.prop('files')[0];
			
		fd.append('cover', file);

		if (file.size/1024 > 1024) {
			alert('Размер фото превышает 1024 Кб. Выберите фото поменьше');
			return false;
		} 
		var	result = $.ajax({
				url: url,
				type: 'POST',
				data: fd,
				processData: false,
				contentType: false,
				
		});
		
		return result;
	};

	return {
		init: init,
	};

})();

addAlbum.init();