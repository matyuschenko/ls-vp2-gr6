// РЕДАКТИРОВАТЬ АЛЬБОМ

var editAlbum = (function () {

	var init = function () {
		_setUpListeners();
		
	};

	var _setUpListeners = function () {
		$('#form__edit-album').on('submit', _submitForm);
	};

	var _submitForm = function (e) {
		e.preventDefault();
		
		var form = $(this),
			url = '/albumedit',
			defObj = _ajaxForm(form, url);
			
			// что-то будем делать с ответом с сервера defObj
	};

	var _ajaxForm = function (form, url) {
		
		var data = form.serialize(),
			result = $.ajax({
				url: url,
				type: 'POST',
				dataType: 'json',
				data: data,
			});
		
		return result;
	};

	return {
		init: init,
	};

})();

editAlbum.init();