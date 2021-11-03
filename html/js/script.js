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
            if($($(this).data('start-block')).length != 0 && $($(this).data('end-block')).length != 0) {
                var start = $($(this).data('start-block')).offset().top - menuOffset;
                var end = $($(this).data('end-block')).offset().top + $($(this).data('end-block')).outerHeight() - menuOffset;
                $(this).data('start', start);
                $(this).data('end', end);
            }
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
    $(window).resize(function(){
        setHeight();
    })
    // Прокрутка до пункта
    $('.top-nav a, .main-footer-nav a').on('click', function(e){
        e.preventDefault();
        var menuOffset = $('.top-nav').outerHeight() - 3;
        var href = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(href).offset().top - menuOffset,
        }, 500)
    })
    // Попап окно
    $('.request-btn').each(function (){
        var btn = $(this);
        btn.magnificPopup({
            type:'inline',
            callbacks: {
                open: function() {
                    $('#request-popup input[name=item-title]').val();
                    $('#request-popup input[name=item-title]').val(btn.data('title'));
                }
            }
        });
    })
    // Обработка формы
    $('.contact-form-type_1').submit(function(e){
        e.preventDefault();
        var form = $(this);
        var name = $(this).find('input[name=your-name]').val();
        var phone = $(this).find('input[name=your-phone]').val();
        var item = '';
        if(form.find('input[name=item-title]').length != 0) {
            item = form.find('input[name=item-title]').val();
        }
        var msgText = '';
        var flag = true;
        if($(this).find('.agree input').prop('checked')) {
            if(name.length == 0) {
                flag = false;
                msgText = 'Введите имя';
            } else if(phone.length == 0) {
                flag = false;
                msgText = 'Введите телефон';
            }
        } else {
            flag = false;
            msgText = 'Не приняты условия обработки персональных даанных';
        }
        if(flag) {
            $.ajax({
                type: 'POST',
                url: 'scripts/send.php',
                data: {
                    name: name,
                    phone: phone,
                    item: item
                },
                success: function (data) {
                    if (data) {
                        form[0].reset();
                        msgText = 'Сообщение успешно отправлено';
                    } else {
                        msgText = 'Возникла ошибка';
                    }
                    if (form.find('.form-message').length == 0) {
                        form.find('button').after('<div class="form-message">' + msgText + '</div>');
                    } else {
                        form.find('.form-message').text(msgText);
                    }
                },
                error: function() {
                    msgText = 'Возникла ошибка';
                    if (form.find('.form-message').length == 0) {
                        form.find('button').after('<div class="form-message">' + msgText + '</div>');
                    } else {
                        form.find('.form-message').text(msgText);
                    }
                }
            })
        } else {
            if(form.find('.form-message').length == 0) {
                form.find('button').after('<div class="form-message">'+msgText+'</div>');
            } else {
                form.find('.form-message').text(msgText);
            }
        }
    })
    $('.contact-form-type_2').submit(function(e){
        e.preventDefault();
        var form = $(this);
        var name = $(this).find('input[name=your-name]').val();
        var email = $(this).find('input[name=your-email]').val();
        var phone = $(this).find('input[name=your-phone]').val();
        var msg = $(this).find('textarea[name=your-msg]').val();
        var msgText = '';
        var flag = true;
        if($(this).find('.agree input').prop('checked')) {
            if(email.length == 0 || email.indexOf('@') == -1) {
                flag = false;
                msgText = 'Введите e-mail';
            } else if(phone.length == 0) {
                flag = false;
                msgText = 'Введите телефон';
            }
        } else {
            flag = false;
            msgText = 'Не приняты условия обработки персональных даанных';
        }
        if(flag) {
            $.ajax({
                type: 'POST',
                url: 'scripts/send.php',
                data: {
                    name: name,
                    email: email,
                    phone: phone,
                    msg: msg
                },
                success: function (data) {
                    if (data) {
                        form[0].reset();
                        msgText = 'Сообщение успешно отправлено';
                    } else {
                        msgText = 'Возникла ошибка';
                    }
                    if (form.find('.form-message').length == 0) {
                        form.find('button').after('<div class="form-message">' + msgText + '</div>');
                    } else {
                        form.find('.form-message').text(msgText);
                    }
                },
                error: function() {
                    msgText = 'Возникла ошибка';
                    if (form.find('.form-message').length == 0) {
                        form.find('button').after('<div class="form-message">' + msgText + '</div>');
                    } else {
                        form.find('.form-message').text(msgText);
                    }
                }
            })
        } else {
            if(form.find('.form-message').length == 0) {
                form.find('button').after('<div class="form-message">'+msgText+'</div>');
            } else {
                form.find('.form-message').text(msgText);
            }
        }
    })
})