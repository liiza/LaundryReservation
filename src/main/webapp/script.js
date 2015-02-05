/**
 * 
 */
var app = angular.module("myLinkApp", []);

var dayInMilliSeconds = 86400000; 

if (window.location.hostname == "localhost") {
	app.url = "http://localhost:9080/Varaussivu/Reservations/";
}
else {
	app.url = "http://thawing-journey-9067.herokuapp.com/Reservations/";
}

app.controller("MyController", function($scope, $http) {
	$scope.d = (new Date()).getTime();
	$scope.steps = ["A", "B"];
	$scope.aApartments = ["1", "2", "3"];
	$scope.bApartments= ["1", "2", "3", "4"];
	
	$scope.toggleReservation = function(reservation) {
		reservation.reserved = !reservation.reserved;
		
	};
	
	$scope.nextDate = function () {
		$scope.d = $scope.d + dayInMilliSeconds;
		$scope.fetchData();
	};
	
	$scope.fetchData = function() {
		var url =  app.url + $scope.d;
		$http.get(url).success(function(data) {
			$scope.data = data;
		});
	};
	
	$scope.update = function(user) {
		for (var i = 0;  i< $scope.data.length; i++) {
			var reservation = $scope.data[i];
			if (reservation.reserved) {
				reservation.step = user.step;
				reservation.apartmentNumber = user.apartment;
				$http.put(app.url+reservation.id, reservation).success(function(data) {
					console.log("succes");
				});
			}
		}
	};
	
	$scope.fetchData();
});
