var flipper = (function () {

	var flipper = $('.flip-card');

	var init = function () {
		_setUpListeners();
		// то, что должно произойти сразу
	};

	var _setUpListeners = function () {
		// прослушка событий...
		$('#welcome__register-link').on('click', _flipToRegister);
		$('#welcome__forget-link').on('click', _flipToRecovery);
		$('.welcome__login-link').on('click', _flipBack);

	};

	var _flipToRegister = function (e) {
		e.preventDefault();
		$('.back-side__registration').show();
		$('.back-side__recovery').hide();

		flipper.css('transform', 'rotateY(180deg)');
	};

	var _flipToRecovery = function (e) {
		e.preventDefault();
		$('.back-side__registration').hide();
		$('.back-side__recovery').show();
		flipper.css('transform', 'rotateY(180deg)');
	};

	var _flipBack = function (e) {
		e.preventDefault();
		
		flipper.css('transform', 'rotateY(0deg)');
		
	};

	return {
		init: init
	};

})();

flipper.init();