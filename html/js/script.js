$(document).ready(function(){
    // Стилизация checkbox
    function checkboxActive() {
        if($('.agree').find('input[type=checkbox]').prop('checked')) {
            $('.agree label').addClass('active');
        } else {
            $('.agree label').removeClass('active');
        }
    }
    checkboxActive();
    $('.agree input[type=checkbox]').on('change', function(){
        checkboxActive();
    })
})