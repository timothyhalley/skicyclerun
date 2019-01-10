/*
  * SkiCycleRun  Alpha JS
  google maps: https://codepen.io/thomasclausen/pen/avagdy
  Medium starter: https://medium.com/@limichelle21/integrating-google-maps-api-for-multiple-locations-a4329517977a

*/
$('.grid').masonry({
  itemSelector: '.grid-item',
  columnWidth: '.grid-sizer',
  percentPosition: true
});

// Modal with transition
$('.grid-item').click(function(event) {
  // Check if not already open
  if (!$(this).hasClass('item-opened')) {

    // Values
    var elWidth = $(this).outerWidth() / 2;
    var elPosition = this.getBoundingClientRect();

    // Store position
    $(this).attr('data-coord-left', $(this).css('left'));
    $(this).attr('data-coord-top', $(this).css('top'));

    // Transition effect
    $(this).css({
      top: elPosition.top,
      left: elPosition.left
    }).delay(400).css({
      top: '120px',
      left: '10%',
      zIndex: '99999',
      // marginLeft:	'-20%'
      // position: 'fixed'
    }).addClass('item-opened');

    // $('#map').css({
    //   top: elPosition.top,
    //   left: elPosition.left,
    //   zIndex: '99999'
    // })

    $('.grid-alpha').fadeIn();
    // document.getElementById('map').classList.toggle('map-alpha');


    // Scroll to the top
    $('html, body').animate({
      scrollTop: $('.grid').offset().top
    }, 650);
    $('.grid').css('overflow', 'visible');
  } else {
    $('.grid').css('overflow', 'hidden');
  }
});

// Close item Modal
$(document).on('click', function(e) {
  if ($('.item-opened').length > 0) {
    if (!$(e.target).closest('.grid-item').length && !$(e.target).hasClass('item-opened')) {
      $('.grid-alpha').fadeOut(650);
      // document.getElementById('map').classList.toggle('map-alpha');

      $('.item-opened').css({
        top: $('.item-opened').data('coord-top'),
        left: $('.item-opened').data('coord-left'),
        marginLeft: ''
      });

      $('html, body').animate({
        scrollTop: ($('.grid').offset().top + parseFloat($('.item-opened').data('coord-top'))) - 30
      }, 650);

      setTimeout(function() {
        $('.grid-item').css('z-index', '').removeClass('item-opened');
      }, 350);
      $('.grid').css('overflow', 'hidden');
    }
  }
});
