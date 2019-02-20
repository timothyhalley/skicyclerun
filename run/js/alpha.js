/*
  * SkiCycleRun  Alpha JS
  google maps: https://codepen.io/thomasclausen/pen/avagdy
  Medium starter: https://medium.com/@limichelle21/integrating-google-maps-api-for-multiple-locations-a4329517977a
  scroll--> https://www.npmjs.com/package/infinite-scroll
            https://infinite-scroll.com
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
      //background-image: linear-gradient(rgba(0, 0, 255, 0.5), rgba(255, 255, 0, 0.5)),
      // marginLeft:	'-20%'
      // position: 'fixed'
    }).addClass('item-opened');
    $('.grid-alpha').fadeIn();

    $('.map-alpha').delay(600).css({
      top: '0px',
      left: '0%',
      height: '100vw',
      zIndex: '99998',
      // marginLeft:	'-20%'
      // position: 'fixed'
    }).addClass('item-opened');
    // move the map up against image
    // Store position
    $('#map').css({
      top: '100vw',
      height: '100%'
    });
    $('#map').fadeIn();

    $('.map-alpha').css({"background-image": "linear-gradient(rgba(0, 0, 255, 0.5), rgba(255, 255, 0, 0.5)"});
    $('.map-alpha').fadeIn();

    // Scroll to the top
    $('html, body').animate({
      scrollTop: $('.grid').offset().top
    }, 650);
    $('.grid').css('overflow', 'visible');

    selectMap($(this).css('background-image'));


  } else {

    // single image clicked upon
    $('.grid').css('overflow', 'hidden');

    $('html, body').animate({
      scrollTop: $('#map').offset().top
    }, 1200);

  }

});

// Close item Modal
$(document).on('click', function(e) {

  if ($('.item-opened').length > 0) {

    if (!$(e.target).closest('.grid-item').length && !$(e.target).hasClass('item-opened')) {
      $('.grid-alpha').fadeOut(650);
      $('.map-alpha').fadeOut(650);
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
  } else {
    // added else -
  }
});

async function selectMap(urlMap) {

  // TODO: wierd glitch for substring - always added extra )" on the end
  var image = urlMap.substring(urlMap.lastIndexOf('/')+1, urlMap.length-2);

  var newURL = urlMap.substr(0, urlMap.lastIndexOf('/'));
  var album = newURL.substring(newURL.lastIndexOf('/')+1).trim();

  const pTagObj = await getPhotoTags(album, image);

  const gLat = parseFloat(pTagObj.GPSLatitude);
  const gLng = parseFloat(pTagObj.GPSLongitude);
  const newLatLng = {lat: gLat, lng: gLng};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: newLatLng,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  });

  var marker = new google.maps.Marker({
    position: newLatLng,
    title:"SkiCycleRun"
  });
  marker.setMap(map);

}

async function getPhotoTags(alb, img) {

  try {

    let url = 'https://api.skicyclerun.com/deadpool/getPhotoTags/pub/' + alb + '/' + img;
    let response = await fetch(url, {cache: 'no-cache'})
    let data = await response.json();

    return data;

  } catch (e) {
    console.log('ERROR: ', e)
  }
}
