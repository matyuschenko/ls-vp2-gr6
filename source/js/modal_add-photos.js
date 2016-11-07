// ДОБАВИТЬ ФОТОГРАФИИ
$(window).on('load', function() {

    var addPhoto = (function () {
        var submitButton = $('.button_submit[form="form__add-photo"]'),
            init = function () {
                submitButton.on('click', function (e) {
                    e.preventDefault();
                    sendForm();
                })
            },
            sendForm = function () {
                var form = $('#form__add-photo'),
                    res = {name: '', files: []},
                    $files = $('#file-add-photo').prop('files');
                res.name = form.find('input[name="name"]')[0].value;
                for (var i = 0; i < $files.length; i++) {
                    res.files.push($files[i]);
                }
                console.log(res);
                $.post('/photoadd', res, function (r) {
                    console.log(r);
                })
            };
        return {init: init};
    }());

    if (document.getElementsByClassName('modal-add-photo').length) {
        addPhoto.init();
    }

});