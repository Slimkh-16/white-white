document.addEventListener("DOMContentLoaded", preloader);
function preloader() {
    document.querySelector('body').classList.add('loading');
    if(document.querySelector('.first-section') !== null) {
        document.querySelector('.first-section').style.height = window.innerHeight + 'px';
    }
}
(function () {

    "use strict";

    var body = document.querySelector('body'),
        isMobile = false,
        scrollTopPosition,
        browserYou,
        _winWidth = $(window).outerWidth(),
        swiper4, swiper5,swiper2,containerHeight;
    var genFunc = {

        initialized: false,

        initialize: function () {

            if (this.initialized) return;

            this.initialized = true;

            this.build();
        },

        build: function () {
            // preloader
            if (document.querySelector('.preloader') !== null) {
                this.pagePreloader();
            }

            // browser
            browserYou = this.getBrowser();
            if (browserYou.platform == 'mobile') {
                isMobile = true;
                document.documentElement.classList.add('mobile');
            } else {
                document.documentElement.classList.add('desktop');
            }
            if ((browserYou.browser == 'ie')) {
                document.documentElement.classList.add('ie');
            }
            if ((browserYou.browser == 'ie' && browserYou.versionShort < 9) || ((browserYou.browser == 'opera' || browserYou.browser == 'operaWebkit') && browserYou.versionShort < 18) || (browserYou.browser == 'firefox' && browserYou.versionShort < 30)) {
                alert('Обновите браузер');
            }
            // materialPlagin
            this.materialPlagins();
            // map
            if (document.getElementById('map') !== null) {
                this.mapFunction();
            }
            // swiper
            this.swiperSliders();
            //appear
            this.appearFunction();
            //copyright
            this.copyright();
            //validateForm
            this.validateForm();
            //mobileMenu
            this.mobileMenu();
            //progressCounter
            this.progressCounter();
            //generalAnimation
            if (document.querySelector('.first-section') !== null && isMobile === false) {

                    this.generalAnimation();

            }
            //peopleFunction:

            if (document.querySelector('.people-item') !== null) {
                this.peopleFunction();
            }
        },
        peopleFunction: function(){

            if(isMobile === true) {
                $('.peop-col[data-peop]').on('click', function () {
                    var thisData = $(this).data('peop');
                    $('.peop-info').removeClass('active');
                    $(".peop-info[data-info='"+ thisData +"']").addClass('active');
                });
            } else {
                $('.peop-col[data-peop]').on('mouseover', function () {
                    var thisData = $(this).data('peop');
                    $('.peop-info').removeClass('active');
                    $(".peop-info[data-info='"+ thisData +"']").addClass('active');
                    $('.peop-col').removeClass('active');
                    $(this).addClass('active');
                    $('.peop-section').addClass('active');
                });
            }
            $('.peop-section').on('mouseleave', function () {
                $('.peop-info').removeClass('active');
                $('.peop-section').removeClass('active');
                $('.peop-col').removeClass('active');
            });
        },
        generalAnimation: function(){
            setTimeout(function() {
                var $body = $("body"),
                    $img1 = $(".first-section .bg1"),
                    $img2 = $(".first-section .bg2"),
                    $img3 = $(".first-section .bg3"),
                    scrTop = $(window).scrollTop(),
                    heightDoc = $(window).height();
                if (scrTop < heightDoc) {
                    TweenMax.set($img1, {transformStyle: 'preserve-3d'});
                    TweenMax.set($img2, {transformStyle: 'preserve-3d'});
                    TweenMax.set($img3, {transformStyle: 'preserve-3d'});

                    $body.mousemove(function (e) {

                        var sxPos = e.pageX / $body.width() * 100 - 50;
                        var syPos = e.pageY / $body.height() * 100 - 50;
                        TweenMax.to($img1, 1, {
                            rotationY: 0.05 * sxPos,
                            rotationX: 0.20 * syPos,
                            rotationZ: '-0.1',
                            transformPerspective: 500,
                            transformOrigin: 'center center'
                        });
                        TweenMax.to($img2, 1, {
                            rotationY: 0.10 * sxPos,
                            rotationX: 0.15 * syPos,
                            rotationZ: 0,
                            transformPerspective: 500,
                            transformOrigin: 'center center'
                        });
                        TweenMax.to($img3, 1, {
                            rotationY: 0.15 * sxPos,
                            rotationX: 0.10 * syPos,
                            rotationZ: 0.10,
                            transformPerspective: 500,
                            transformOrigin: 'center center'
                        });

                    });
                }

                $(window).scroll(function() {
                    scrTop = $(window).scrollTop();
                    if(scrTop > heightDoc) {
                        $('.first-section .bg-animate').addClass('no-animate')
                    } else {
                        $('.first-section .bg-animate').removeClass('no-animate')
                    }
                });
            },2000);
        },
        progressCounter: function() {
            var e = this;
            $(window).scroll(function() {
                var t = $(window).scrollTop()
                    , n = $(document).height()
                    , i = $(window).height()
                    , o = t / (n - i)
                    , s = Math.round(100 * o)
                    , a = s / 3 + 20 + "%";
                $(".js-progress-counter").html(s + "%");
                $(".progress-counter").removeClass("progress-counter--animating").css("top", a);
                clearTimeout($.data(e, "scrollTimer"));
                $.data(e, "scrollTimer", setTimeout(function() {
                    $(".progress-counter").addClass("progress-counter--animating")
                }, 500));
            });
        },
        mapFunction: function () {
            var styleMap = [
                {
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#f5f5f5"
                        }
                    ]
                },
                {
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#616161"
                        }
                    ]
                },
                {
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#f5f5f5"
                        }
                    ]
                },
                {
                    "featureType": "administrative.land_parcel",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#bdbdbd"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#eeeeee"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#757575"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#e5e5e5"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#9e9e9e"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#757575"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#dadada"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#616161"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#9e9e9e"
                        }
                    ]
                },
                {
                    "featureType": "transit.line",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#e5e5e5"
                        }
                    ]
                },
                {
                    "featureType": "transit.station",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#eeeeee"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#c9c9c9"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#9e9e9e"
                        }
                    ]
                }
            ];
            if ($('#map').length > 0) {
                var coords = $('#map').data('coords').split(',');
                var myLatlng = new google.maps.LatLng(coords[0], coords[1]);
                var myCenter = new google.maps.LatLng(coords[0], coords[1]);
                var mapOptions = {
                    zoom: 15,
                    center: myCenter,
                    scrollwheel: false,
                    disableDefaultUI: false,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    styles:styleMap
                };
                var map = new google.maps.Map(document.getElementById('map'), mapOptions);
                var marker = new google.maps.Marker({
                    position: myLatlng,
                    map: map,
                    icon: 'images/marker.png'
                });
            }
        },
        mobileMenu: function () {
            $(document).on('click','.left-container-nav li:not(.js_fast_form )',function() {
                $('.menu-button-general').sideNav('show');
            });
            $(document).on('click','.drop-nav',function(){
                var idMenu = $(this).data('menu');
                $('.left-menu-level').removeClass('visible');
                $('body').addClass('open-level-menu');
                $('.left-menu-level[data-menu="'+ idMenu +'"]').addClass('visible');
            });
            $(document).on('click' ,'.js_back_menu',function(){
                $('.left-menu-level').removeClass('visible');
                $('body').removeClass('open-level-menu');
            });
            $(document).on('click','.js_fast_form',function(){
                $('.js_fast_form').toggleClass('open');
                $('.form-fast').toggleClass('visible');
            });
        },
        copyright: function () {
            var yearBlock = document.querySelector('.yearN'),
                yearNow = new Date().getFullYear().toString();
            if (yearNow.length) {
                yearBlock.innerText = yearNow
            }
        },
        getBrowser: function () {
            var ua = navigator.userAgent;
            var bName = function () {
                if (ua.search(/Edge/) > -1) return "edge";
                if (ua.search(/MSIE/) > -1) return "ie";
                if (ua.search(/Trident/) > -1) return "ie11";
                if (ua.search(/Firefox/) > -1) return "firefox";
                if (ua.search(/Opera/) > -1) return "opera";
                if (ua.search(/OPR/) > -1) return "operaWebkit";
                if (ua.search(/YaBrowser/) > -1) return "yabrowser";
                if (ua.search(/Chrome/) > -1) return "chrome";
                if (ua.search(/Safari/) > -1) return "safari";
                if (ua.search(/maxHhon/) > -1) return "maxHhon";
            }();

            var version;
            switch (bName) {
                case "edge":
                    version = (ua.split("Edge")[1]).split("/")[1];
                    break;
                case "ie":
                    version = (ua.split("MSIE ")[1]).split(";")[0];
                    break;
                case "ie11":
                    bName = "ie";
                    version = (ua.split("; rv:")[1]).split(")")[0];
                    break;
                case "firefox":
                    version = ua.split("Firefox/")[1];
                    break;
                case "opera":
                    version = ua.split("Version/")[1];
                    break;
                case "operaWebkit":
                    bName = "opera";
                    version = ua.split("OPR/")[1];
                    break;
                case "yabrowser":
                    version = (ua.split("YaBrowser/")[1]).split(" ")[0];
                    break;
                case "chrome":
                    version = (ua.split("Chrome/")[1]).split(" ")[0];
                    break;
                case "safari":
                    version = ua.split("Safari/")[1].split("")[0];
                    break;
                case "maxHhon":
                    version = ua.split("maxHhon/")[1];
                    break;
            }
            var platform = 'desktop';
            if (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase())) platform = 'mobile';
            var browsrObj;
            try {
                browsrObj = {
                    platform: platform,
                    browser: bName,
                    versionFull: version,
                    versionShort: version.split(".")[0]
                };
            } catch (err) {
                browsrObj = {
                    platform: platform,
                    browser: 'unknown',
                    versionFull: 'unknown',
                    versionShort: 'unknown'
                };
            }
            return browsrObj;
        },
        swiperSliders: function () {
            var swiper = new Swiper('.testimonials-container .swiper-container', {
                loop: true,
                autoplay: 4000,
                speed: 1000,
                slidesPerView: 2,
                breakpoints: {
                    992: {
                        slidesPerView: 1
                    }
                }

            });
            var sertificat_slider = new Swiper('.sertificat-section .swiper-container', {
                loop: true,
                speed: 500,
                slidesPerView: 'auto',
                centeredSlides: false,
                spaceBetween: 15,
                nextButton: '.sertificat-section .swiper-button-next',
                prevButton: '.sertificat-section .swiper-button-prev',
                breakpoints: {
                    992: {
                        spaceBetween: 0
                    }
                }
            });
            var swiper_new = new Swiper('.new-product .swiper-container', {
                loop: true,
                speed: 1000,
                slidesPerView: 4,
                spaceBetween: 0,
                breakpoints: {
                    992: {
                        slidesPerView: 3
                    },
                    767: {
                        slidesPerView: 2
                    },
                    500: {
                        slidesPerView: 1
                    }
                }
            });
        },
        pagePreloader: function () {
            window.addEventListener('load', function () {
                setTimeout(function () {
                    body.classList.add('loaded');
                }, 1000);
                setTimeout(function () {
                    document.querySelector('.preloader').style.display = 'none';
                }, 1600);
            });
        },
        validateForm: function () {
            $(document).on('click','.forgot-pass',function(){
                $('.input-field--oher-pass').slideToggle(500, "easeOutCubic");
                $(this).parents('form').toggleClass('act');
            });
            $('.js_validate button[type="submit"]').on("click", function () {
                return validate($(this).parent(".js_validate"));
            });
            function validate(form) {
                var error_class = "error";
                var norma_class = "pass";
                var item = form.find("[required]");
                var e = 0;
                var reg = undefined;
                var pass = form.find('.password').val();
                var pass_1 = form.find('.password_1').val();
                var email = false;
                var password = false;
                var phone = false;

                function mark(object, expression) {
                    if (expression) {
                        object.parents('.required-field').addClass(error_class).removeClass(norma_class);
                        e++;
                    } else
                        object.parents('.required-field').addClass(norma_class).removeClass(error_class);
                }

                form.find("[required]").each(function () {
                    switch ($(this).attr("data-validate")) {
                        case undefined:
                            mark($(this), $.trim($(this).val()).length === 0);
                            break;
                        case "email":
                            email = true;
                            reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                            mark($(this), !reg.test($.trim($(this).val())));
                            email = false;
                            break;
                        case "phone":
                            phone = true;
                            reg = /[0-9 -()+]{10}$/;
                            mark($(this), !reg.test($.trim($(this).val())));
                            phone = false;
                            break;
                        case "pass":
                            password = true;
                            reg = /^[a-zA-Z0-9_-]{6,}$/;
                            mark($(this), !reg.test($.trim($(this).val())));
                            password = false;
                            break;
                        case "pass1":
                            mark($(this), (pass_1 !== pass || $.trim($(this).val()).length === 0));
                            break;
                        default:
                            reg = new RegExp($(this).attr("data-validate"), "g");
                            mark($(this), !reg.test($.trim($(this).val())));
                            break;
                    }
                });
                $('.js_valid_radio').each(function () {
                    var inp = $(this).find('input.required');
                    var rezalt = 0;
                    for (var i = 0; i < inp.length; i++) {
                        if ($(inp[i]).is(':checked') === true) {
                            rezalt = 1;
                            break;
                        } else {
                            rezalt = 0;
                        }
                    }
                    if (rezalt === 0) {
                        $(this).addClass(error_class).removeClass(norma_class);
                        e = 1;
                    } else {
                        $(this).addClass(norma_class).removeClass(error_class);
                    }
                });
                if (e === 0) {
                    return true;
                }
                else {
                    form.find("." + error_class + " input:first").focus();
                    return false;
                }
            }
        },
        materialPlagins: function () {
            $('.tooltipped').tooltip({delay: 50});
            if($('.contact-box .phone-group').length){
              $('.contact-box .phone-group').autocolumnlist({
                columns: 2
              });
            }
            // uslugi slider
            setTimeout(function(){
                var $blockProject = $('.slider-wrapp');
                var InfiniteSliderCSS = new InfiniteSlider($blockProject,1250,6000,'css','easeOutQuad',false,true);
                // Next
                $('.panel-1, .panel-2, .panel-3', $blockProject).on('click', function(){
                    $('.slider-arrows .next a', $blockProject).trigger('click');
                });
            },2000)

            // uslugi slider
            //hidden text
            $('.our-plus-item__txt span').liTextLength({
                length: 70,
                afterLength: '...',
                fullText:false
            });
            $('.serv-head').liTextLength({
                length: 45,
                afterLength: '...',
                fullText:false
            });
            $('.service-item__txt p').liTextLength({
                length: 90,
                afterLength: '...',
                fullText:false
            });

            $('.menu-button-general').sideNav({
                    menuWidth: 270,
                    edge: 'left',
                    closeOnClick: true,
                    draggable: false,
                }
            );
            $('.dropdown-button').dropdown();
            if(isMobile === false) {
                $('.dropdown-head-nav').dropdown({
                    hover:true
                });
            }
            $('select').not('.my_select_box').material_select();
            $('.collapsible').collapsible();
            $('.modal').modal({
                opacity: 1,
                ready: function(el){
                    $('.overlay').fadeIn(500);
                },
                complete: function(){
                    $('.overlay').fadeOut(500);
                }
            });
            $('.materialboxed').materialbox();
        },
        appearFunction: function () {
            if (isMobile === false) {
                $('.animated').appear(function () {
                    var elem = $(this);
                    var animation = elem.data('animation');
                    if (!elem.hasClass('visible')) {
                        var animationDelay = elem.data('animation-delay');
                        if (animationDelay) {
                            setTimeout(function () {
                                elem.addClass(animation + " visible");
                            }, animationDelay);
                        } else {
                            elem.addClass(animation + " visible");
                        }
                    }
                }, {accX: 0, accY: -200});
                $('.count').each(function(){
                    $(this).appear(function() {
                        var $endNum = parseInt($(this).text());
                        $(this).countTo({
                            from: 0,
                            to: $endNum,
                            speed: 500,
                            refreshInterval: 1,
                        });
                    },{accX: 0, accY: -200});
                })
            } else {
                $('.animated').each(function () {
                    var animation = $(this).data('animation');
                    $(this).addClass(animation + " visible");
                });
            }
        },
    };

    genFunc.initialize();
    window.addEventListener('scroll', function () {
        scrollTopPosition = window.pageYOffset ? window.pageYOffset : (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
        // if(scrollTopPosition > 50) {
        //     document.querySelector('.header').classList.add('fix')
        // } else {
        //     document.querySelector('.header').classList.remove('fix')
        // }
    });
    window.addEventListener('load', function () {
        if(document.querySelector('.next-step') !== null) {
            document.querySelector('.js_next').addEventListener('click',function(){
                scrollTo(document.body,document.querySelector('.peop-section').offsetTop + 5 , 1000);
            });
        }
        if(document.querySelector('.slider') !== null) {
            var sldWidth = document.querySelector('.slider').clientWidth,
                sldheight = document.querySelector('.slider').clientHeight,
                elemSld = document.querySelectorAll('.slider .img');
            for (var i = 0; i< elemSld.length; i++) {
                elemSld[i].style.height = sldheight + 'px';
                elemSld[i].style.width = sldWidth + 'px';
            }
        }
        if(document.querySelector('.article-item') !== null) {
            heightBlock('.article-item')
        }
    });
    window.addEventListener('resize', function () {
        if(document.querySelector('.slider') !== null) {
            var sldWidth = document.querySelector('.slider').clientWidth,
                sldheight = document.querySelector('.slider').clientHeight,
                elemSld = document.querySelectorAll('.slider .img');
            for (var i = 0; i< elemSld.length; i++) {
                elemSld[i].style.height = sldheight + 'px';
                elemSld[i].style.width = sldWidth + 'px';
            }
        }
        if(document.querySelector('.first-section') !== null) {
            document.querySelector('.first-section').style.height = window.innerHeight + 'px';
        }
        if(document.querySelector('.article-item') !== null) {
            heightBlock('.article-item')
        }
    });
    function heightBlock(ell) {
        var elem = document.querySelectorAll(ell);
        var maxH = 0;
        for (var i = 0;  i < elem.length; ++i) {
            elem[i].style.height = "";
            elem[i].removeAttribute("style");
            if (maxH < elem[i].offsetHeight) {
                maxH = elem[i].offsetHeight;
            }

            elem[i].style.height = maxH + "px";
        }
    };
    function scrollTo(element, to, duration) {
        var start = element.scrollTop ;
        if(browserYou.browser === 'firefox') {
            start = document.documentElement.scrollTop
        }
        var change = to - start,
            currentTime = 0,
            increment = 20,
            scrollTopPosition = document.documentElement.scrollTop ;
        var animateScroll = function(){
            currentTime += increment;
            var val = Math.easeInOutExpo(currentTime, start, change, duration);
            element.scrollTop = val;
            if(browserYou.browser === 'firefox') {
                document.documentElement.scrollTop = val;
            }
            if(currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        };
        animateScroll();
    }
    Math.easeInOutQuad = function (t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    };
    Math.easeInOutExpo = function (t, b, c, d) {
        if (t===0) return b;
        if (t===d) return b+c;
        if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
        return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
})();
