var app = angular.module('chirpApp', ['ngRoute', 'ngResource']).run(function($rootScope, $http) {
  $rootScope.current_user = null;

  $rootScope.signout = function() {
    $http.get('auth/signout');
    $rootScope.current_user = null;
  };
});

app.config(function($routeProvider) {
  $routeProvider
    //the timeline display
    .when('/', {
      templateUrl: 'main.html',
      controller: 'mainController'
    })
    //the login display
    .when('/login', {
      templateUrl: 'login.html',
      controller: 'authController'
    })
    //the signup display
    .when('/signup', {
      templateUrl: 'signup.html',
      controller: 'authController'
    })
    .when('/users', {
      templateUrl: 'users.html',
      controller: 'userController'
    });
});

app.factory('postService', function($resource) {
  return $resource('/api/posts/:id', {
    id: '@id'
  });
});

app.factory('userService', function($resource) {
  return $resource('/api/users/:id', {
    id: '@id'
  });
});

app.controller('userController', function(userService, $scope, $rootScope) {
  $scope.users = userService.query();
  $scope.delete = function(id) {
    userService.delete({
      id: id
    }, function() {
      $scope.posts = userService.query();
    });
    // console.log('Delete is called here:' + id);
  };

});

app.controller('mainController', function(postService, $scope, $rootScope) {
  $scope.posts = postService.query();
  $scope.newPost = {
    created_by: '',
    text: '',
    created_at: ''
  };

  $scope.post = function() {
    $scope.newPost.created_by = $rootScope.current_user.username;
    $scope.newPost.created_at = Date.now();
    postService.save($scope.newPost, function() {
      $scope.posts = postService.query();
      $scope.newPost = {
        created_by: '',
        text: '',
        created_at: ''
      };
    });
  };

  $scope.delete = function(id) {
    postService.delete({
      id: id
    }, function() {
      $scope.posts = postService.query();
    });
    // console.log('Delete is called here:' + id);
  };
});

app.controller('authController', function($scope, $http, $rootScope, $location) {
  $scope.user = {
    username: '',
    password: ''
  };
  $scope.error_message = '';

  $scope.login = function() {
    $http.post('/auth/login', $scope.user).success(function(data) {
      if (data.state == 'success') {
        $rootScope.current_user = { username: data.user.username, isAdmin: data.user.isAdmin };
        $location.path('/');
      } else {
        $scope.error_message = data.message;
      }
    });
  };

  $scope.signup = function() {
    $http.post('/auth/signup', $scope.user).success(function(data) {
      if (data.state == 'success') {
        $rootScope.current_user = { username: data.user.username, isAdmin: data.user.isAdmin };
        $location.path('/');
      } else {
        $scope.error_message = data.message;
      }
    });
  };
});
