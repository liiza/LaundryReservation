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
	
	$scope.toggleReservation = function(reservation) {
		reservation.reserved = !reservation.reserved;
		$http.put(app.url+"/"+reservation.id, reservation).success(function() {
			console.log("succes");
		});
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
	
	$scope.fetchData();
});
