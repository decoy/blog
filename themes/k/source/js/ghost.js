//a ghost in effect when scrolling past a section

//when we scroll, check positions
$(window).scroll(ghost);

//on document ready, show any that are already visible
$(document).ready(ghost);

//adds the class when the element is visible (or is past)
function ghost() {
    //loop ahoy
    $('.ghost').not('.ghost-in').each(function (i) {

        var top = $(this).position().top;
        var pos = $(window).scrollTop() + $(window).height();

        //if it's visible at all, fade it in
        if (pos > top) {
            $(this).addClass('ghost-in');
        }
    });
}


