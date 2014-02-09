var projectBox = angular.module('projectBox', []);

function mainController($scope, $http) {
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
			
			if($scope.user.invalid == 0) { 
				$scope.user.username = "already exists";
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