var projectBox = angular.module('projectBox', []);

function mainController($scope, $http, $window) {
	$scope.formData = {};
	$scope.userData = {};



	// when landing on the page, get all projects and show them
	$http.get('/api/projects')
		.success(function(data) {
			$scope.projects = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
		
	// when submitting the add form, send the text to the node API
	$scope.createProject = function() {
		$http.post('/api/projects', $scope.formData)
			.success(function(data) {
				$('input').val('');
				$scope.projects = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
	
	// create a user
	
	$scope.createUser = function() {
		$http.post('/api/users', $scope.userData)
			.success(function(data) {
				$('input').val('');
				$scope.user = data;
				
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
			
		//$window.alert("sfsd");
		//$window.location.href = "index.html";
		//console.log("dfs");
		if(typeof $scope.user === 'undefined') {
			//$window.location.href = "index.html";
			$window.alert("Username already taken");
		}
		else {
			$window.location.href = "index.html";
		}
	};

	// delete a todo after checking it
	$scope.deleteProject = function(id) {
		$http.delete('/api/projects/' + id)
			.success(function(data) {
				$scope.projects = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
	
	$scope.deleteUser = function(id) {
		$http.delete('/api/users/' + id)
			.success(function(data) {
				$scope.users = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
}