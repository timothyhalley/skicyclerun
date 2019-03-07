/*
  * SkiCycleRun  MAP JS




*/

function initMap2() {

  // console.log('MAP 2 init called...')
  setGoogleMap();

	var mapCanvas = document.getElementById('map');
	var mapCenter = new google.maps.LatLng(47.544539, -121.986808);
	var mapOptions = {
		center: mapCenter,
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.TERRAIN,

		scrollwheel: false,
		disableDefaultUI: true,
		zoomControl: true
  };

	let map = new google.maps.Map(mapCanvas, mapOptions);
  //google.maps.event.addDomListener(window, 'load', initialize);
	google.maps.event.addDomListener(map, 'idle', function () {
		mapCenter = map.getCenter();
	});
	google.maps.event.addDomListener(window, 'resize', function () {
		map.panTo(mapCenter);
	});

  google.maps.event.addDomListener(mapCanvas, 'click', function (event) {
    google.maps.event.trigger(self, 'click');
  });

}

function customMarker(latlng, map, args) {
	// Initialize all properties.
	this.latlng = latlng;
	this.args = args;

	// Explicitly call setMap on this overlay.
	this.setMap(map);
}

function setGoogleMap() {

  customMarker.prototype = new google.maps.OverlayView();

  customMarker.prototype.draw = function() {
  	var self = this,
  		div = this.div;

  	if (!div) {
  		div = this.div = document.createElement('div');

  		div.className = self.args.class_name;

  		if (typeof(self.args.marker_id) !== 'undefined') {
  			div.dataset.marker_id = self.args.marker_id;
  		}
  		if (typeof(self.args.price) !== 'undefined') {
  			div.innerHTML = self.args.price + '<span class="currency">DKK</span>';
  		}

  		var panes = self.getPanes();
  		panes.overlayImage.appendChild(div);
  	}

  	var point = self.getProjection().fromLatLngToDivPixel(self.latlng);

  	if (point) {
  		div.style.left = point.x + 'px';
  		div.style.top = point.y + 'px';
  	}
  };

}



// Custom markers
// http://humaan.com/custom-html-markers-google-maps/
// https://developers.google.com/maps/documentation/javascript/customoverlays
// https://developers.google.com/maps/documentation/javascript/reference
