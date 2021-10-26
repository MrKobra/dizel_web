$(document).ready(function(){
    // Стилизация checkbox
    $('.agree').each(function(){
        if($(this).find('input[type=checkbox]').prop('checked')) {
            $(this).find('label').addClass('active');
        } else {
            $(this).find('label').removeClass('active');
        }
    })
    $('.agree input[type=checkbox]').on('change', function(){
        if($(this).prop('checked')) {
            $(this).parent().find('label').addClass('active');
        } else {
            $(this).parent().find('label').removeClass('active');
        }
    })
})