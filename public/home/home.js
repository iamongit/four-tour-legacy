angular.module('mapApp.home', ['gm','four-tour-svcs'])

.controller('homeCtrl', function($rootScope, $scope, $location, $http, mapping) {

	$scope.locating = false;
	$scope.categoryDefault = {name: 'Choose a category'};
	$scope.radiusDefault = {plain: 'Choose a search radius'}
	$scope.chosenCategory = $scope.categoryDefault;
	$scope.chosenRadius = $scope.radiusDefault;
	$scope.categories = [{name: "Coffee", catId: "coffee"},
											{name: "Bakeries", catId: "bakeries"},
											{name: "Booze",catId: "bars"},
											{name: "Fun", catId: "active"},
											{name: "Threads", catId: "fashion"},
											{name: "History", catId: "landmarks"}];
	$scope.radii = [{plain: "1/4 mile", meters: 402},
									{plain: "1/2 mile", meters: 805},
									{plain: "3/4 mile", meters: 1207},
									{plain: "1 mile", meters: 1609},
									{plain: "2 miles", meters: 3219},
									{plain: "NO LIMITS", meters: 40000}];


	$scope.chooseCategory = function(category) {
  	$scope.chosenCategory = category;
  }

  $scope.chooseRadius = function(radius) {
  	$scope.chosenRadius = radius;
  }

  $scope.geoLocate = function() {
  	$scope.locating = true;
  	if ($rootScope.located) {
  		setTimeout(function() {
  			$scope.origin = $rootScope.origin;
  			$rootScope.useGeo = true;
  			$scope.locating = false;
    		$scope.$apply();
  		}, 1750);
  	} else {
  		// console.log('RECURSION!!!');
    	setTimeout($scope.geoLocate, 500);
    }
    console.log('GEOLOCATE ORIGIN = ', $rootScope.origin);
  };

 $scope.getTour = function() {
  	console.log('IN GET TOUR');
  	$rootScope.chosenCategoryId = $scope.chosenCategory.catId;
  	$rootScope.radius = $scope.chosenRadius.meters;
  	if(!$rootScope.origin || $scope.chosenCategory.name === "Choose a category" || $scope.chosenRadius.plain === "Choose a search radius") {
  		alert('Please make sure you have chosen a starting point, category, and radius');
  	} else {
  		if (!$rootScope.useGeo) {
				$rootScope.coords.lat = $rootScope.origin.lat();
        $rootScope.coords.lng = $rootScope.origin.lng();
  		}
  		$location.path('/map');
  	}
  };

  $scope.reset = function() {
  	$scope.origin = '';
  	$rootScope.origin = $rootScope.user;
  	$scope.chosenCategory = $scope.categoryDefault;
  	$scope.chosenRadius = $scope.radiusDefault;

  };

	$scope.$on('gmPlacesAutocomplete::placeChanged', function(){
      var temp = $scope.origin.getPlace().geometry.location;
      $rootScope.coords.lat = temp.lat();
      $rootScope.coords.lng = temp.lng();
      console.log("SCOPE ORIGIN CLEAN = ", $scope.origin.gm_accessors_.place.Ac.formattedPrediction);
      console.log('ORIGIN.LAT = ', temp.lat());

	});

})




/*function fsSearch(position, map) {
    $scope.fsState = 'loading';

    // sets location based on entered location or Geolocation
    var latitude;
    var longitude;
    if($rootScope.address === undefined){
      latitude = position.lat;
      longitude = position.lng;
    } else {
      latitude = $rootScope.lat;
      longitude = $rootScope.lng;
    }
    var data = {"latitude": latitude, "longitude": longitude}
    $http.post('/api/foursquare', data)
      .then(function(result, status) {
        var fsPlaces = result.data.response.groups[0].items;
        var fsPlacesLatLng = [];
        fsPlaces.forEach(function(place) {
          fsPlacesLatLng.push(
            {
              location: {
                lat: place.venue.location.lat,
                lng: place.venue.location.lng
              },
              stopover: true
            }
          );
        });
        $scope.fsState = 'loaded';
        //the start and end is based on position which is the current location position not entered
        drawTour(position, map, fsPlacesLatLng);
      }, function(data, status) {
        $scope.fsState = 'noResult';
      });
  };*/