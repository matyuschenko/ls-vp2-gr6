var editSocial = (function(){
    var setPosition = function(elem){
        var position = {
            x: $(elem).offset().left - $(".changes__form").offset().left - 140 + ($(elem).width()/2),
            y: $(elem).offset().top - $(".changes__form").offset().top + $(elem).height()+10
        }
        return position;
    },
    showTip = function(elem){
        var block = "<div class='photoTip' style='left:"+setPosition(elem).x+"px;top:"+setPosition(elem).y+"px;'><input class='input' type='text' name='url' value=''><input class='submit' type='submit' value='Сохранить'><button class='cancel'>Отменить</button></div>";
        $(".changes__form").append(block);
    },
    removeTip = function(elem){
        $(elem).parent(".photoTip").remove();
    }
    return{
        init: function(){
            $(".changes__top .social__link").on("click", function(e){
               e.preventDefault();
                showTip($(this));
            });
        }
    }
});

$(document).ready(function(){
    editSocial().init();
    $(".button_edit-info").on("click", function(){
        $(".changes").addClass("changes-active");
    })
});