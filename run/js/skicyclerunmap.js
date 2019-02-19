/*
  * SkiCycleRun  MAP JS

*/
function initMap() {
  var center = {lat: 47.544539, lng: -121.986808};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: center
  });
  var marker = new google.maps.Marker({
    position: center,
    map: map
  });
}

//console.clear();

var map = '';

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

function initMap2() {

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
    // window.alert('Map was clicked!');
    google.maps.event.trigger(self, 'click');
  });

}
