var projectBox = angular.module('projectBox', []);

function mainController($scope, $http, $window, $document) {
	$scope.formData = {};
	$scope.userData = {};
	$scope.userParams = {};


	// when landing on the page, get all projects and show them
	$http.get('/api/projects')
		.success(function(data) {
			$scope.projects = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
		
	$http.get('/api/users', $scope.userData)
		.success(function(data) {
			$scope.user = data;
			//$window.alert($scope.user.username);
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
				
				$http.post('/api/users/project/' + $scope.proj._id, $scope.user)
			.success(function(data) {
				$('input').val('');
				$scope.user = data;
				
				$http.post('/api/projects/user/' + $scope.user.username, $scope.formData)
			.success(function(data) {
				$('input').val('');
				$scope.projects = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
			
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
			
			
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
	
	$scope.addComment = function(id) {

		$http.post('/api/comment/' + id, $scope.formData)
			.success(function(data) {
				$('input').val('');
				$scope.project = data;
				
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
			
	};
	
	$scope.addVote = function(id, type) {
		
		$scope.formData.type = type;
		
		$http.post('/api/projects/vote/' + id, $scope.formData)
			.success(function(data) {
				//$('input').val('');
				$scope.project = data;
				
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
				
				$window.location.href = "profile.html";
				if($scope.user == null) {
				//$window.location.href = 'index.html';
					//$window.alert('username taken');
				}
				else {
					//$window.location.href = "index.html";
					//$window.alert('username new');
				}
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
			
	};

	// delete a project after clicking delete
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