var schoolsVisit = [];
var pos = [];
var markers = [];//some array

function initialize() {
    var mapProp= {
        center:new google.maps.LatLng(36,-78.93),
        zoom:14,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);  
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });
    
    searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // For each place, get the icon, name and location.
         var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              label: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
        map.fitBounds(bounds);
        bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < markers.length; i++) {
            bounds.extend(markers[i].getPosition());
        }

        map.fitBounds(bounds);
        });
}