var editSocial = (function(){
    var setPosition = function(elem){
            var position = {
                x: $(elem).offset().left - $(".changes__top").offset().left - 140 + ($(elem).width()/2),
                y: $(elem).offset().top - $(".changes__top").offset().top + $(elem).height()+10
            }
            return position;
        },
        showTip = function(elem){
            var block = "<div class='photoTip' style='left:"+setPosition(elem).x+"px;top:"+setPosition(elem).y+"px;'><input class='input' type='text' name='url' value=''><button class='button submit' value='Сохранить'>Сохранить<button class='cancel'>Отменить</button></div>";
            $(".photoTip").remove();
            $(".changes__top").append(block);
        };
    return{
        init: function(){
            $(".changes__top .social__link").on("click", function(e){
                e.preventDefault();
                showTip($(this));
            });
        }
    }
});


// ИЗМЕНИТЬ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ (ШАПКА)
var editUser = (function () {

    var init = function () {
        _setUpListeners();
    };

    var _setUpListeners = function () {
        $('.input__submit').on('click', _submitForm);
    };

    var _submitForm = function (e) {
        e.preventDefault();

        var form = $('.changes__top'),
            url = '/edituser',
            inputs = form.find('input, textarea'),
            res = {},
            defObj = _ajaxForm(form, url);

        console.log(inputs.serialize());
        // что-то будем делать с ответом с сервера defObj
    };


    var _ajaxForm = function (form, url) {

        var data = form.serialize();
        var result = $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: data
        });

        return result;
    };

    return {
        init: init
    };

})();
editUser.init();