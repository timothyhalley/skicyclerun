/*
  * SkiCycleRun  AlphaMAP JS
  google maps: https://codepen.io/thomasclausen/pen/avagdy
  Medium starter: https://medium.com/@limichelle21/integrating-google-maps-api-for-multiple-locations-a4329517977a

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
		zoomControl: true,

		// Custom Styling
		// https://snazzymaps.com/style/132/light-gray
		styles: [
			{
				"featureType":"water",
				"elementType":"geometry.fill",
				"stylers":[
					{
						"color":"#d3d3d3"
					}
				]
			},
			{
				"featureType":"transit",
				"stylers":[
					{
						"color":"#808080"
					},
					{
						"visibility":"off"
					}
				]
			},
			{
				"featureType":"road.highway",
				"elementType":"geometry.stroke",
				"stylers":[
					{
						"visibility":"on"
					},
					{
						"color":"#b3b3b3"
					}
				]
			},
			{
				"featureType":"road.highway",
				"elementType":"geometry.fill",
				"stylers":[
					{
						"color":"#ffffff"
					}
				]
			},
			{
				"featureType":"road.local",
				"elementType":"geometry.fill",
				"stylers":[
					{
						"visibility":"on"
					},
					{
						"color":"#ffffff"
					},
					{
						"weight":1.8
					}
				]
			},
			{
				"featureType":"road.local",
				"elementType":"geometry.stroke",
				"stylers":[
					{
						"color":"#d7d7d7"
					}
				]
			},
			{
				"featureType":"poi",
				"elementType":"geometry.fill",
				"stylers":[
					{
						"visibility":"on"
					},
					{
						"color":"#ebebeb"
					}
				]
			},
			{
				"featureType":"administrative",
				"elementType":"geometry",
				"stylers":[
					{
						"color":"#a7a7a7"
					}
				]
			},
			{
				"featureType":"road.arterial",
				"elementType":"geometry.fill",
				"stylers":[
					{
						"color":"#ffffff"
					}
				]
			},
			{
				"featureType":"road.arterial",
				"elementType":"geometry.fill",
				"stylers":[
					{
						"color":"#ffffff"
					}
				]
			},
			{
				"featureType":"landscape",
				"elementType":"geometry.fill",
				"stylers":[
					{
						"visibility":"on"
					},
					{
						"color":"#efefef"
					}
				]
			},
			{
				"featureType":"road",
				"elementType":"labels.text.fill",
				"stylers":[
					{
						"color":"#696969"
					}
				]
			},
			{
				"featureType":"administrative",
				"elementType":"labels.text.fill",
				"stylers":[
					{
						"visibility":"on"
					},
					{
						"color":"#737373"
					}
				]
			},
			{
				"featureType":"poi",
				"elementType":"labels.icon",
				"stylers":[
					{
						"visibility":"off"
					}
				]
			},
			{
				"featureType":"poi",
				"elementType":"labels",
				"stylers":[
					{
						"visibility":"off"
					}
				]
			},
			{
				"featureType":"road.arterial",
				"elementType":"geometry.stroke",
				"stylers":[
					{
						"color":"#d6d6d6"
					}
				]
			},
			{
				"featureType":"road",
				"elementType":"labels.icon",
				"stylers":[
					{
						"visibility":"off"
					}
				]
			},
			{

			},
			{
				"featureType":"poi",
				"elementType":"geometry.fill",
				"stylers":[
					{
						"color":"#dadada"
					}
				]
			}
		]
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


// Custom markers
// http://humaan.com/custom-html-markers-google-maps/
// https://developers.google.com/maps/documentation/javascript/customoverlays
// https://developers.google.com/maps/documentation/javascript/reference
