jQuery(document).ready(function() {
    jQuery('#syllabus-tab').click(function() {
        jQuery('.nav-tabs .nav-link').removeClass('active');
        jQuery('#syllabus-tab').addClass('active');
    });
    jQuery('#about-tab').click(function() {
        jQuery('.nav-tabs .nav-link').removeClass('active');
        jQuery('#about-tab').addClass('active');
    });
    jQuery('.scrolltab').click(function() {
        event.preventDefault();

        jQuery('html, body').animate({
            scrollTop: jQuery(jQuery.attr(this, 'href')).offset().top
        }, 500);
    });
    new Mmenu(document.querySelector('#menu'));

    jQuery('.counter').each(function() {
        var $this = jQuery(this),
            countTo = $this.attr('data-count');

        jQuery({
            countNum: $this.text()
        }).animate({
            countNum: countTo
        }, {

            duration: 5000,
            easing: 'linear',
            step: function() {
                $this.text(Math.floor(this.countNum));
            },
            complete: function() {
                $this.text(this.countNum);
                //alert('finished');
            }
        });
    });
    jQuery(".collapse.show").each(function() {
        jQuery(this).prev(".card-header").find(".fa").addClass("fa-minus").removeClass("fa-plus");
    });
    // Toggle plus minus icon on show hide of collapse element
    jQuery(".collapse").on('show.bs.collapse', function() {
        jQuery(this).prev(".card-header").find(".fa").removeClass("fa-plus").addClass("fa-minus");
    }).on('hide.bs.collapse', function() {
        jQuery(this).prev(".card-header").find(".fa").removeClass("fa-minus").addClass("fa-plus");
    });

    /*jQuery(".coursevideoslider").slick({
		  infinite: true,
		  slidesToShow:4,
		  centerPadding: '20px',
		  arrows: true,
		  dots: false,
		  arrow: true,
		  responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
	
	  ]
		});*/
    jQuery(".singlevideoimg").length > 0 && jQuery(".singlevideoimg").magnificPopup({
        type: "iframe",
        markup: "<div class=\'mfp-iframe-scaler\'><div class=\'mfp-close\'></div><iframe class=\'mfp-iframe\' frameborder=\'0\' allowfullscreen></iframe></div>",
        iframe: {
            patterns: {
                youtube: {

                    index: "youtube.com/",

                    id: "v=",

                    src: "//www.youtube.com/embed/%id%?autoplay=1"

                }
            }
        }


    });

    jQuery(".smartprovideoslider").slick({
        infinite: true,
        slidesToShow: 2,
        centerPadding: '20px',
        arrows: true,
        dots: false,
        arrow: true,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }

        ]
    });

    jQuery(".smartclassicvideoslider").slick({
        infinite: true,
        slidesToShow: 4,
        centerPadding: '20px',
        arrows: true,
        dots: false,
        arrow: true,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }

        ]
    });


    jQuery(".smart").click(function() {
        var value = jQuery(this).attr('data-filter');
        if (value == "all") {
            jQuery('.filter').show('1000');
        } else {
            jQuery(".filter").not('.' + value).hide('3000');
            jQuery('.filter').filter('.' + value).show('3000');
        }
        jQuery(".smart").removeClass("active");
        jQuery(this).addClass("active");

    });
    jQuery(".classic").click(function() {
        var value = jQuery(this).attr('data-filter');
        if (value == "all") {
            jQuery('.filter').show('1000');
        } else {
            jQuery(".filter").not('.' + value).hide('3000');
            jQuery('.filter').filter('.' + value).show('3000');
        }
        jQuery(".classic").removeClass("active");
        jQuery(this).addClass("active");

    });
    jQuery(".smartclassicfacultyslider").slick({
        infinite: true,
        slidesToShow: 4,
        centerPadding: '20px',
        arrows: true,
        dots: false,
        arrow: true,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: '0px',
                }
            }

        ]
    });
    jQuery(".smartprofacultyslider").slick({
        infinite: true,
        slidesToShow: 4,
        centerPadding: '20px',
        arrows: true,
        dots: false,
        arrow: true,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: '0px',
                }
            }

        ]
    });


    jQuery(".smartclassicfacultysliderthree").slick({
        infinite: true,
        slidesToShow: 3,
        centerPadding: '20px',
        arrows: true,
        dots: false,
        arrow: true,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: '0px',
                }
            }

        ]
    });
    jQuery(".smartprofacultysliderthree").slick({
        infinite: true,
        slidesToShow: 3,
        centerPadding: '20px',
        arrows: true,
        dots: false,
        arrow: true,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: '0px',
                }
            }

        ]
    });

});