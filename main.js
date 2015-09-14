angular.module('WeatherApp', ['ngRoute'])
.config(function($routeProvider){
	$routeProvider.when('/', {
		controller:'ZipWeatherController',
		templateUrl:'home.html'
	}).when('/about', {
		templateUrl:'about.html'
	}).when('/contact', {
		controller:'ContactController',
		templateUrl:'contact.html'
	})
})
	  
.controller('ZipWeatherController', ['$scope', '$http', function($scope, $http) {
	$scope.zipChanged = function(evt){
		console.log($scope.zipcode);
		if($scope.zipcode && String($scope.zipcode).length == 5){
			$http.get('http://api.openweathermap.org/data/2.5/weather', {params:{zip:$scope.zipcode+',us', units:'imperial'}}).
			then(function(res) {
				if(res.data.cod == 200){
					console.log(res.data)
					var date = new Date(res.data.dt * 1000);
					$scope.weather = {
						'location':res.data.name,
						'coord':res.data.coord,
						'timestamp':res.data.dt * 1000,
						'temp':res.data.main.temp,
						'temp_max':res.data.main.temp_max,
						'temp_min':res.data.main.temp_min,
						'humidity':res.data.main.humidity,
						'wind': res.data.wind.speed,
						'condition':res.data.weather[0].main,
						'description':res.data.weather[0].description,
						'icon':res.data.weather[0].icon
						
						
					}
					
				}else{
					
					$scope.weather = null;
					$scope.notfound = true;
				}
			}, function(response) {
				console.log("error")
				$scope.weather = null;
				$scope.notfound = true;
			});
		}else{
			$scope.notfound = false;
			$scope.weather = null;
		}
	}
}]).controller('ContactController', ['$scope', '$http', function($scope, $http){
	
	$scope.sendMessage = function(evt){
		if($scope.message){
			$scope.sendState = "Sending...";
			$scope.formsent = true;
			$http.post('http://outerlinc.com/weather/contact.php', {params:{'message':$scope.message, 'email':$scope.email, 'subject':$scope.subject}}).
			then(function(res){
				console.log(res);
				if(res.data.status == "success"){
					$scope.sendState = "Sent! Thank You.";
				}else{
					$scope.sendState = "There was an error.";
				}
			}, function(error){ 
				$scope.sendState = "Error";
				console.log(error);			
			});
		}
	}
	
	
	
}])
	  
	  