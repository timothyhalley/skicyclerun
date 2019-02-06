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

    // map Value
    console.log('MAP -->', $(this).css('background-image'))

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
      //background-image: linear-gradient(rgba(0, 0, 255, 0.5), rgba(255, 255, 0, 0.5)),
      // marginLeft:	'-20%'
      // position: 'fixed'
    }).addClass('item-opened');

    $('.grid-alpha').fadeIn();

    // Scroll to the top
    $('html, body').animate({
      scrollTop: $('.grid').offset().top
    }, 650);

    $('.grid').css('overflow', 'visible');
    var xtall = $('.item-open').height;
    $('.map-alpha').delay(600).css({
      top: '0px',
      left: '0%',
      height: '100vw',
      zIndex: '99998',
      // marginLeft:	'-20%'
      // position: 'fixed'
    }).addClass('item-opened');

    $('.map-alpha').css({"background-image": "linear-gradient(rgba(0, 0, 255, 0.5), rgba(255, 255, 0, 0.5)"});
    $('.map-alpha').fadeIn();

  } else {

    // single image clicked upon
    $('.grid').css('overflow', 'hidden');

    $('html, body').animate({
      scrollTop: $('#map').offset().top
    }, 1200);

    //console.log('MAP 2-->', $(this).css('background-image'))

    selectMap($(this).css('background-image'));

  }

});

// Close item Modal
$(document).on('click', function(e) {
  if ($('.item-opened').length > 0) {
    if (!$(e.target).closest('.grid-item').length && !$(e.target).hasClass('item-opened')) {
      $('.grid-alpha').fadeOut(650);

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

      $('.map-alpha').fadeOut(650);
      setTimeout(function() {
        $('.map-alpha').css('z-index', '').removeClass('item-opened');
      }, 350);

    }
  }
});

function selectMap(urlMap) {

  var image = urlMap.substring(urlMap.lastIndexOf('/')+1);

  var newURL = urlMap.substr(0, urlMap.lastIndexOf('/'));
  var album = newURL.substring(newURL.lastIndexOf('/')+1);

  console.log('MAP 2-->', album, ' -- ', image, ' --> mapDATA: ', mapData);


  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {
      lat: 47.544539,
      lng: -121.986808
    },
    mapTypeId: google.maps.MapTypeId.TERRAIN
  });

}

const mapData = () => {
  return fetch('https://api.skicyclerun.com/deadpool/getMapData/halleyFamily/scan8', {cache: 'no-cache'})
    .then(response => response.json()) // parse JSON
}
