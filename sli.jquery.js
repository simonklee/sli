(function($){
    $.fn.sli = function(option) {
        option = $.extend({}, $.fn.sli.option, option);

        $.fn.sli.option = {
        };

        return this.each(function(){
            var elem = $(this);
            var current = 0, slides = new Array(), width, sli_window;
            
            var setup = function() {
                $(elem).css({
                    overflow: 'hidden',
                    position: 'relative'
                });

                slides = $(elem).find('.slide');
                if (slides.length === 0)
                    return false;

                slides.hide();
                $(slides[current]).show();

                width = slides[current].offsetWidth;

                sli_window = $(elem).find('.sli_window');
                sli_window.css({'width': width * 3, 'margin-left': -width});
                sli_window.prepend($(slides[current]).clone());

                $(elem).find('.next').bind('click', function(e) {
                    e.preventDefault();
                    animate('next');
                });

                $(elem).find('.prev').bind('click', function(e) {
                    e.preventDefault();
                    animate('prev');
                });

                return true;
            }

            if (setup() === false)
                return;
            
            var animate = function(direction) {
                console.log(current);

                switch (direction) {
                case 'next':
                    if (current === slides.length - 1)
                        return;
                    $(slides[++current]).show();
                    sli_window.animate({'margin-left': -width * 2});
                    sli_window.queue(function() {
                        $(this).children('.slide').first().hide();
                        sli_window.css({'margin-left': -width});
                        $(this).dequeue();                        
                    });

                    break;
                case 'prev':
                    if (current === 0)
                        return;
                    $(slides[--current]).show();
                    sli_window.animate({'margin-left': 0});
                    sli_window.queue(function() {
                        $(this).children('.slide').last().hide();
                        sli_window.css({'margin-left': -width});
                        $(this).dequeue();                        
                    });

                    break;
                }
                
                //$(slides[current]).animate({
                //    'left': '-=270px'
                //});
                //$(slides[current]).animate({
                //    'left': '-=270px'
                //});
            }

        });
    };
})(jQuery);

//var slides = [];
            //var current = 0;

            //function load() {
            //    var divs = document.getElementsByTagName('div');

            //    for (var i = 0; i < divs.length; i++) {
            //        if (divs[i].className === 'slide')
            //            slides.push(divs[i]);
            //    }

            //    show(slides[current]);

            //    document.body.oncontextmenu = function() {
            //        return false;
            //    }

            //function next() {
            //    if (current === slides.length - 1)
            //        return;

            //    hide(slides[current]);
            //    current++;
            //    show(slides[current]);
            //}

            //function previous() {
            //    if (current === 0)
            //        return;

            //    hide(slides[current]);
            //    current--;
            //    show(slides[current]);
            //}

            //function hide(s) {
            //    s.style.opacity = 0;
            //}

            //function show(s) {
            //    s.style.opacity = 1;
            //}
            // switch(direction) {
            // case 'next':
            //     // change current slide to previous
            //     prev = current;
            //     // get next from current + 1
            //     next = current + 1;
            //     // if last slide, set next to first slide
            //     next = total === next ? 0 : next;
            //     // set position of next slide to right of previous
            //     position = width*2;
            //     // distance to slide based on width of slides
            //     direction = -width*2;
            //     // store new current slide
            //     current = next;
            //     break;
            // case 'prev':
            //     // change current slide to previous
            //     prev = current;
            //     // get next from current - 1
            //     next = current - 1;
            //     // if first slide, set next to last slide
            //     next = next === -1 ? total-1 : next;								
            //     // set position of next slide to left of previous
            //     position = 0;								
            //     // distance to slide based on width of slides
            //     direction = 0;		
            //     // store new current slide
            //     current = next;
            //     break;
            // }

