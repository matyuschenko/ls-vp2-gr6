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
                var form = $('#form__edit-photo'),
                    inputs = form.find('input, textarea'),
                    res = {
                        date: new Date(),
                        photoPath: 'test',
                        album_ID: 'test'
                    };
                inputs.each(function () {
                    res[this.name] = this.value;
                });
                $.post('/photoedit', res, function (r) {
                    console.log(r);
                })
            };
        return {init: init};
    }());

    if (document.getElementsByClassName('modal-edit-photo').length) {
        editPhoto.init();
    }

});