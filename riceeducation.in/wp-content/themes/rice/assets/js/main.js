jQuery(function($) {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.header-top').addClass('headfixed');
        } else {
            $('.header-top').removeClass('headfixed');
        }
    });

    $('.nav-tabs.shadow-box li a.scrolltab').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            target.addClass('hello');
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 120
            }, 600);
        }
    });
});