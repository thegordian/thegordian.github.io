/*!
    * Start Bootstrap - Agency v6.0.2 (https://startbootstrap.com/template-overviews/agency)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
    */
(function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (
            location.pathname.replace(/^\//, "") ==
            this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length
                ? target
                : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top - 72,
                    },
                    1000,
                    "easeInOutExpo"
                );
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $(".js-scroll-trigger").click(function () {
        $(".navbar-collapse").collapse("hide");
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $("body").scrollspy({
        target: "#mainNav",
        offset: 74,
    });

    // Collapse Navbar
    var navbarCollapse = function () {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);
    on_resize($(window).width(), $(window).height());
    $('#team-slider').lightSlider({
        item: 1,
        controls: false,
        pager: false,
        slideMargin: 0,
        auto: true,
        loop: true
    });
})(jQuery); // End of use strict


$(window).on('resize', function () {
    var win = $(this); //this = window
    on_resize(win.width(), win.height());
});
function on_resize(width, height) {
    // setTimeout(function() {
    //     $(".team-text-box").css("left", $(".team-box > img").width());
    // }, 1500);
    if(width <= 1100) {
        $(".team-box > img").removeClass("position-absolute");
        $(".team-text-box").removeClass("position-absolute");
    } else {
        $(".team-box > img").addClass("position-absolute");
        $(".team-text-box").addClass("position-absolute");
    }
}