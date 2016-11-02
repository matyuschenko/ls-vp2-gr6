// РЕДАКТИРОВАТЬ ФОТОГРАФИЮ
$(window).on('load', function() {

    var editPhoto = (function () {
        var submitButton = $('.button_submit[form="form__edit-photo"]'),
            init = function () {
                submitButton.on('click', function (e) {
                    e.preventDefault();
                    sendForm();
                })
            },
            sendForm = function () {
                var form = $('#form__add-album'),
                    inputs = form.find('input, textarea'),
                    res = {};
                inputs.each(function () {
                    res[this.type] = this.value;
                });
                console.log(res);
                // отправить ajax запрос
            };
        return {init: init};
    }());

    if (document.getElementsByClassName('modal-edit-photo').length) {
        editPhoto.init();
    }

});