(function ($) {
    "use strict";

    var $window = $(window),
        $body = $("body");

    // Sticky menu
    $(window).on("scroll", function () {
        var scroll = $(window).scrollTop();
        if (scroll < 100) {
            $(".sticky-header").removeClass("sticky");
        } else {
            $(".sticky-header").addClass("sticky");
        }
    });

    // Hamburger menu dropdown
    $(".dropdown").on("show.bs.dropdown", function () {
        $(this).find(".dropdown-menu").first().stop(true, true).slideDown();
    });
    $(".dropdown").on("hide.bs.dropdown", function () {
        $(this).find(".dropdown-menu").first().stop(true, true).slideUp();
    });

    // Offcanvas menu toggle drop down
    function mobileOffCanvasMenu() {
        var $offCanvasNav = $('.offcanvas-menu'),
            $offCanvasNavSubMenu = $offCanvasNav.find('.mobile-sub-menu');

        $offCanvasNavSubMenu.parent().prepend('<div class="offcanvas-menu-expand"></div>');

        $offCanvasNav.on('click', 'li a, .offcanvas-menu-expand', function (e) {
            var $this = $(this);
            if ($this.attr('href') === '#' || $this.hasClass('offcanvas-menu-expand')) {
                e.preventDefault();
                if ($this.siblings('ul:visible').length) {
                    $this.parent('li').removeClass('active');
                    $this.siblings('ul').slideUp();
                    $this.parent('li').find('li').removeClass('active');
                    $this.parent('li').find('ul:visible').slideUp();
                } else {
                    $this.parent('li').addClass('active');
                    $this.closest('li').siblings('li').removeClass('active').find('li').removeClass('active');
                    $this.closest('li').siblings('li').find('ul:visible').slideUp();
                    $this.siblings('ul').slideDown();
                }
            }
        });
    }
    mobileOffCanvasMenu();

    // slider active 
    var heroSlider = new Swiper('.hero-slider .swiper-container', {
        slidesPerView: 1,
        speed: 1000,
        effect: 'fade',
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    // company logo slider
    var company_logo_slider = new Swiper('.company-slider .swiper-container', {
        slidesPerView: 5,
        autoplay: true,
        speed: 1000,
        loop: true,

        breakpoints: {
            0: {
                slidesPerView: 1,

            },
            576: {
                slidesPerView: 2,

            },
            768: {
                slidesPerView: 3,

            },
            992: {
                slidesPerView: 4,

            },
            1200: {
                slidesPerView: 5,

            },
        },
    });

    // products slider
    var product_slider_3g_2r = new Swiper('.product-slider-3grids-2rows .swiper-container', {
        slidesPerView: 4,
        spaceBetween: 25,
        speed: 1500,
        slidesPerColumn: 2,
        slidesPerColumnFill: 'row',
        navigation: {
            nextEl: '.center-slider-nav .button-next',
            prevEl: '.center-slider-nav .button-prev',
        },
        breakpoints: {
            0: {
                slidesPerView: 1,

            },
            768: {
                slidesPerView: 2,

            },
            992: {
                slidesPerView: 3,

            },
            1200: {
                slidesPerView: 4,

            },
        }
    });

    // exclusive products slider
    var product_slider_3g_1r = new Swiper('.product-slider-3grids-1row .swiper-container', {
        slidesPerView: 4,
        spaceBetween: 25,
        speed: 1500,
        loop: true,
        navigation: {
            nextEl: '.top-slider-buttons .button-next',
            prevEl: '.top-slider-buttons .button-prev',
        },
        breakpoints: {
            0: {
                slidesPerView: 1,

            },
            768: {
                slidesPerView: 2,

            },
            992: {
                slidesPerView: 3,

            },
            1200: {
                slidesPerView: 4,

            },
        }
    });

    // scroll to top
    function scrollToTop() {
        var $scrollUp = $("#scroll-to-top"),
            $lastScrollTop = 0,
            $window = $(window);
        $window.on('scroll', function () {
            var st = $(this).scrollTop();
            if (st > $lastScrollTop) {
                $scrollUp.removeClass('show');
            } else {
                if ($window.scrollTop() > 120) {
                    $scrollUp.addClass('show');
                } else {
                    $scrollUp.removeClass('show');
                }
            }
            $lastScrollTop = st;
        });
        $scrollUp.on('click', function (evt) {
            $('html,body').animate({
                scrollTop: 0
            }, 50);
            evt.preventDefault();
        });
    }

    scrollToTop();

})(jQuery);
