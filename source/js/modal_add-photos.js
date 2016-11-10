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
                    res = {
                        name: '',
                        description: '',
                        date: new Date(),
                        album_ID: 'test',
                        files:  new FormData()
                    },
                    $files = $('#file-add-photo').prop('files');
                res.name = form.find('input[name="name"]')[0].value;
                $.each($files, function (i, file) {
                    res.files.append('file-' + i, file);
                });
                $.ajax({
                    url: '/photoadd',
                    data: res,
                    contentType: false,
                    processData: false,
                    type: 'POST',
                    success: function (res) {
                        console.log(res);
                        $(".modal").css({display: "none"});
                        document.onmousewheel = function (e) {}
                    }
                });
                //$.post('/photoadd', res, function (r) {
                //    console.log(r);
                //    $(".modal").css({display: "none"});
                //})
            };
        return {init: init};
    }());

    if (document.getElementsByClassName('modal-add-photo').length) {
        addPhoto.init();
    }

});