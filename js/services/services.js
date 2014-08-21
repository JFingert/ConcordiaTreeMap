angular.module('App.Services', [])
	
		.factory("dataService", ['$http',function ($http) {
			return {
				getData: function () {
					return $http.get('data/trees_concordia.json');
				}
			};
		
	
}]);