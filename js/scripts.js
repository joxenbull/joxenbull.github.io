/* Description: Custom JS file */


(function($) {
    "use strict"; 
	
    /* Navbar Scripts */
    // jQuery to collapse the navbar on scroll
    $(window).on('scroll load', function() {
		if ($(".navbar").offset().top > 60) {
			$(".fixed-top").addClass("top-nav-collapse");
		} else {
			$(".fixed-top").removeClass("top-nav-collapse");
		}
    });
    
	// jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {
		$(document).on('click', 'a.page-scroll', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 600, 'easeInOutExpo');
			event.preventDefault();
		});
    });

    // offcanvas script from Bootstrap + added element to close menu on click in small viewport
    $('[data-toggle="offcanvas"], .navbar-nav li a:not(.dropdown-toggle').on('click', function () {
        $('.offcanvas-collapse').toggleClass('open')
    })

    // hover in desktop mode
    function toggleDropdown (e) {
        const _d = $(e.target).closest('.dropdown'),
            _m = $('.dropdown-menu', _d);
        setTimeout(function(){
            const shouldOpen = e.type !== 'click' && _d.is(':hover');
            _m.toggleClass('show', shouldOpen);
            _d.toggleClass('show', shouldOpen);
            $('[data-toggle="dropdown"]', _d).attr('aria-expanded', shouldOpen);
        }, e.type === 'mouseleave' ? 300 : 0);
    }
    $('body')
    .on('mouseenter mouseleave','.dropdown',toggleDropdown)
    .on('click', '.dropdown-menu a', toggleDropdown);


    /* Move Form Fields Label When User Types */
    // for input and textarea fields
    $("input, textarea").keyup(function(){
		if ($(this).val() != '') {
			$(this).addClass('notEmpty');
		} else {
			$(this).removeClass('notEmpty');
		}
	});
	

    /* Back To Top Button */
    // create the back to top button
    $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
    var amountScrolled = 700;
    $(window).scroll(function() {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });


	/* Removes Long Focus On Buttons */
	$(".button, a, button").mouseup(function() {
		$(this).blur();
	});

})(jQuery);

        document.addEventListener("DOMContentLoaded", function () {
            var imageContainer = document.getElementById("image-container");
            var maxImageCount = 100; // Max number of images

            // Generate and display image elements
            for (var i = 1; i <= maxImageCount; i++) {
                var imageUrl = "images/designs/image (" + i + ").png";
                var img = document.createElement("img");
                img.src = imageUrl;
                img.alt = "Image";
                imageContainer.appendChild(img);

                // Check if image exists, otherwise stop
                img.onerror = function () {
                    this.style.display = "none";
                    maxImageCount = i - 1;
                };
            }

            // Function to sort images by predefined naming pattern
            function sortImagesByName() {
                var images = Array.from(imageContainer.querySelectorAll("img"));
                images.sort(function (a, b) {
                    var aIndex = parseInt(a.src.match(/1 \((\d+)\)/)[1]);
                    var bIndex = parseInt(b.src.match(/1 \((\d+)\)/)[1]);
                    return aIndex - bIndex;
                });

                // Clear existing images and display sorted images
                imageContainer.innerHTML = "";
                images.forEach(function (img) {
                    imageContainer.appendChild(img);
                });
            }

            // Button click event to sort images by name
            var sortButton = document.getElementById("sort-button");
            sortButton.addEventListener("click", sortImagesByName);
        });