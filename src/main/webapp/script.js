/**
 * 
 */
var app = angular.module("myLinkApp", []);

app.url = 'http://localhost:9080/Varaussivu/Reservations/';

app.controller("MyController", function($scope, $http) {
	$scope.link = {};
	$scope.shorturl = app.url;

	$scope.showShortLink = function(linkObject) {
		if (linkObject.showLink) {
			linkObject.showLink = false;
		} else {
			linkObject.showLink = true;
		}
	}

	$scope.send = function() {
		// Some validation
		$http.post(app.url).success(function(data, status, headers, config) {
			var link = data;
			$scope.link["id"] = link.id;
			$scope.links.push($scope.link);

			$http.put(app.url + link.id, $scope.link);

			$scope.link = {};
		});
	}
	var d = new Date();
	var n = d.getTime();
	console.log("n: " + n);
	var url =  app.url + n;
	$http.get(url).success(function(data) {
		console.log(data);
		console.log("success");
		$scope.data = data;
	});
});
