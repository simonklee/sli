(function($){
    $.fn.sli = function(option) {
        option = $.extend({}, $.fn.sli.option, option);

        return this.each(function() {
            // wrap slides in control container, make sure slides are block level
            $(this).children('.slide').wrapAll('<div class="slides_control"/>');

            var elem = $(this),
                control = $('.slides_control', elem),
                total = control.children().size(),
                width = control.children().outerWidth(),
                height = control.children().outerHeight(),
                next = 0, prev = 0, current = 0, active, position, direction;

            console.log(width, height);
            if (total < 2) {
                return;
            }

            $(elem).css({
                overflow: 'hidden',
                position: 'relative'
            });

            // set css for slides
            control.children().css({
                position: 'absolute',
                top: 0, 
                left: control.children().outerWidth(),
                zIndex: 0,
                display: 'none'
            });

            // set css for control div
            control.css({
                position: 'relative',
                width: width, 
                height: height, 
                left: -width
            });

            // show slides
            $(elem).css({
                display: 'block'
            });

            control.children(':eq(' + current + ')').fadeIn(option.fadeSpeed);

            // next button
            $('.' + option.next, elem).click(function(e) {
                e.preventDefault();
                animate('next');
            });

            // previous button
            $('.' + option.prev, elem).click(function(e) {
                e.preventDefault();
                animate('prev');
            });

            function animate(direction) {
                if (active) {
                    return;
                }

                active = true;
                switch(direction) {
                    case 'next':
                        // change current slide to previous
                        prev = current;
                        // get next from current + 1
                        next = current + 1;
                        // if last slide, set next to first slide
                        next = total === next ? 0 : next;
                        // set position of next slide to right of previous
                        position = width * 2;
                        // distance to slide based on width of slides
                        direction = -width * 2;
                        // store new current slide
                        current = next;
                        break;
                    case 'prev':
                        // change current slide to previous
                        prev = current;
                        // get next from current - 1
                        next = current - 1;
                        // if first slide, set next to last slide
                        next = next === -1 ? total - 1 : next;
                        // set position of next slide to left of previous
                        position = 0;
                        // distance to slide based on width of slides
                        direction = 0;
                        // store new current slide
                        current = next;
                        break;
                }

                // move next slide to right of previous
                control.children(':eq('+ next +')').css({
                    left: position,
                    display: 'block'
                });

                // animate control
                control.animate({
                    left: direction
                }, option.slideSpeed, function() {
                    // after animation reset control position
                    control.css({
                    left: -width
                    });

                    // reset and show next
                    control.children(':eq('+ next +')').css({
                    left: width,
                    zIndex: 5
                    });

                    // reset previous slide
                    control.children(':eq('+ prev +')').css({
                    left: width,
                    display: 'none',
                    zIndex: 0
                    });

                    // end of animation
                    active = false;
                });
            }; 
        });
    };

    $.fn.sli.option = {
        next: 'next', 
        prev: 'prev', 
        fadeSpeed: 350, 
        slideSpeed: 150
    };
})(jQuery);
