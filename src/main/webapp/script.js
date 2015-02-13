/**
 * 
 */
var app = angular.module("myLinkApp", []);

var dayInMilliSeconds = 86400000;

if (window.location.hostname == "localhost") {
	app.url = "http://localhost:9080/Varaussivu/Reservations/";
} else {
	app.url = "http://thawing-journey-9067.herokuapp.com/Reservations/";
}

app.controller("MyController", function($scope, $http) {
	// The selected date in the scope
	$scope.d = new Date();

	// The static list of months
	$scope.months = [ "Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu",
			"Toukokuu", "Kesakuu", "Heinakuu", "Elokuu", "Syyskuu", "Lokakuu",
			"Marraskuu", "Joulukuu" ];

	// The static list of weekday names
	$scope.weekDays = [ "Ma", "Ti", "Ke", "To", "Pe", "La", "Su" ];

	// Static partment information. Need to re-check after getting actual
	// information.
	$scope.steps = [ "A", "B" ];
	$scope.aApartments = [ "1", "2", "3" ];
	$scope.bApartments = [ "1", "2", "3", "4" ];

	// Fetch month days based on the currently selected date.
	$scope.updateMonth = function() {

		// Increase month by one. Note js months start from 0.
		var m = $scope.d.getMonth() + 1;
		var y = $scope.d.getFullYear();

		// Which weekday to start the montt with
		var firstDayOfMonth = new Date(Date.UTC(y, m - 1, 1, 1, 0, 0, 0));
		var weekDayOfFirstDay = firstDayOfMonth.getDay();
		// Lets start week from Monday
		weekDayOfFirstDay = (weekDayOfFirstDay + 6) % 7;

		// Calculate how many days there are in current month
		var daysInMonth;
		// February
		if (m == 2) {
			// Leap year.
			if (y % 4 == 0) {
				if (y % 400 == 0) {
					daysInMonth = 29;
				}
				// Except integer multiples of 100 that are not multiples of 400
				else if (y % 100 == 0) {
					daysInMonth = 28;
				} else {
					daysInMonth = 29;
				}
			} else {
				daysInMonth = 28;
			}

		}
		// April, Juni, September, November
		else if (m == 4 || m == 6 || m == 9 || m == 11) {
			daysInMonth = 30;
		}
		// Januar, March, May, July, August, October, December
		else {
			daysInMonth = 31;
		}

		var weeks = [];
		// Put month days to weeks starting from 1.
		var i = 1;
		while (i <= daysInMonth) {
			var week = [];
			// Init all days to zero. Empty days are represented by zero.
			for (var k = 0; k < 7; k++) {
				week[k] = {
					number : 0,
					month : 0,
					year : 0
				};
			}
			// Fill the week starting from the weekday of the first day.
			for (var j = weekDayOfFirstDay; j < 7 && i <= daysInMonth; j++) {
				week[j] = {
					number : i,
					month : m,
					year : y
				};
				// Pre-select the current date
				if ($scope.d.getDate() == i) {
					week[j]["selected"] = true;
					$scope.selectedDay = week[j];
				}
				i++;
			}
			weekDayOfFirstDay = 0;
			weeks[weeks.length] = week;
		}
		// Set the month name.
		$scope.monthName = $scope.months[m - 1];
		$scope.month = weeks;

	};

	$scope.pickDay = function(day) {
		// Update calender view.
		$scope.selectedDay.selected = false;
		day.selected = true;
		$scope.selectedDay = day;
		// Update date information.
		$scope.d = new Date(Date.UTC(day.year, day.month - 1, day.number, 1, 0,
				0, 0));
		$scope.fetchData();
	};

	$scope.nextMonth = function() {
		var month = $scope.d.getMonth();
		// Increase month by one
		$scope.d = new Date(Date.UTC($scope.d.getFullYear(), month + 1, 1, 1,
				0, 0, 0));
		$scope.updateMonth();
		$scope.fetchData();

	};

	$scope.previousMonth = function() {
		var month = $scope.d.getMonth();
		// Decrease month by one
		$scope.d = new Date(Date.UTC($scope.d.getFullYear(), month - 1, 1, 1,
				0, 0, 0));
		$scope.updateMonth();
		$scope.fetchData();

	};
	// Toggle reservation selection.
	$scope.toggleReservation = function(reservation) {
		if (!reservation.reserved) {
			if (reservation.reserved == "selected") {
				reservation.reserved = false;
			} else {
				reservation.reserved = "selected";
			}
		}

	};
	// Fetch reservations related to selected date.
	$scope.fetchData = function() {
		var url = app.url + $scope.d.getTime();
		$http.get(url).success(function(data) {
			$scope.data = data;
			var date = new Date($scope.d);
			$scope.date = {
				dd : date.getDate(),
				mm : date.getMonth() + 1,
				yyyy : date.getFullYear()
			};
		});
	};

	// Save the reservation made by the user.
	$scope.saveReservation = function(user) {
		for (var i = 0; i < $scope.data.length; i++) {
			var reservation = $scope.data[i];
			if (reservation.reserved == "selected") {
				// Set the user data.
				reservation.step = user.step;
				reservation.apartmentNumber = user.apartment;
				reservation.reserved = true;
				$http.put(app.url + reservation.id, reservation).success(function(data, status) {
					if (status === 202) {
						alert("Varaus epäonnistui.");
						$scope.fetchData();
					}
				});
			}
		}
	};

	$scope.updateMonth();
	$scope.fetchData();
});
