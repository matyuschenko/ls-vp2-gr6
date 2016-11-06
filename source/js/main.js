$(document).ready(function(){
    editSocial().init();
    ////////////////////////
    // BUTTON EDIT INFO USER
    ////////////////////////
    $(".button_edit-info").on("click", function(){
        $(".changes").addClass("changes-active");
    });
    $(".close__header__edit").on("click", function(){
        $(".changes").removeClass("changes-active");
    });


    ////////////////////
    // BUTTON CLOSE MODAL WINDOW
    ////////////////////
    $(".modal-btn__close").on("click", function (e) {
        e.preventDefault();
        $(".modal").css({display: "none"});
        document.onmousewheel = function (e) {
        }
    });
    ////////////////////
    // BUTTON ADD ALBUMS
    ////////////////////
    $(".button_add").on("click", function (e) {
        e.preventDefault();
        $(".add-album, .add-photo").css({display: "flex"});
        document.onmousewheel = function (e) {
            e.preventDefault();
        }
    });
    ////////////////////
    // BUTTON ADD ALBUMS
    ////////////////////
    $(".my-albums-edit, .edit-post").on("click", function (e) {
        e.preventDefault();
        $(".modal-edit-photo").css({display: "flex"});
        document.onmousewheel = function (e) {
            e.preventDefault();
        }
    });
    $(".js-open-slider").on("click", function(e){
       e.preventDefault();
        $(".modal-slider").css({display: "block"});
    });

});