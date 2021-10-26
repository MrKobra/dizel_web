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
    // Кнопка вверх
    $('.up-arrow').on('click', function() {
        $('html, body').animate({
            scrollTop: $('.top-header').offset().top
        }, 500)
    })
    // Изменение активной ссылки при прокрутке
    function setHeight(){
        var menuOffset = $('.top-nav').outerHeight();
        $('.top-nav a').each(function(){
            var href = $(this).attr('href');
            var start = $(href).offset().top - menuOffset;
            $(this).data('start', start);
            $(this).data('end', start + $(href).outerHeight());
        })
    }
    setHeight();
    function activeItem(){
        var windowScroll = $(window).scrollTop();
        $('.top-nav li').removeClass('active')
        $('.top-nav a').each(function(){
            if(windowScroll > $(this).data('start') && windowScroll < $(this).data('end')) {
                $(this).parent().addClass('active');
            }
        })
    }
    activeItem();
    // Фиксация меню при сколле
    function fixMenu() {
        var windowScroll = $(window).scrollTop();
        if(windowScroll > $('.top-header').outerHeight()) {
            $('.top-nav').addClass('fixed');
            $('body').css('padding-top', $('.top-nav').outerHeight());
        } else {
            $('.top-nav').removeClass('fixed');
            $('body').css('padding-top', 0)
        }
    }
    $(window).scroll(function (){
        activeItem();
        fixMenu();
    })
    // Прокрутка до пункта
    $('.top-nav a').on('click', function(e){
        e.preventDefault();
        var menuOffset = $('.top-nav').outerHeight() + 2;
        if($(window).width() > 992) {
            var href = $(this).attr('href');
            $('html, body').animate({
                scrollTop: $(href).offset().top,
            }, 500)
        }
    })
    // Попап окно
    $('.request-btn').each(function (){
        $(this).magnificPopup({
            type:'inline',
        });
    })
})