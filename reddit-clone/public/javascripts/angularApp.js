var app = angular.module('RedditClone', ['ui.router'])

.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/home.html',
        controller: 'MainCtrl',
        // ensures that all posts are loaded
        // before page shows up
        resolve: {
          postPromise: ['posts', 
          function(posts){
            return posts.getAll();
          }]
        }
      })
      .state('posts', {
        url: '/posts/{id}',
        templateUrl: '/posts.html',
        controller: 'PostsCtrl',
        resolve: {
          post: ['$stateParams', 'posts', function($stateParams, posts){
            return posts.get($stateParams.id);
          }]
        }
      });
      $urlRouterProvider.otherwise('home');
  }])

.factory('posts', ['$http', function($http){
  var o = {
    posts: []
  };

  o.get = function(id){
    return $http.get('/posts/' + id).then(function(res){
      return res.data;
    })
  }

  o.getAll = function(){
    return $http.get('/posts').success(
      function(data){
        // creates a fresh copy of data to o.posts
        angular.copy(data, o.posts);
      });
  }

  o.create = function(post){
    return $http.post('/posts', post).success(
      function(data){
        // will return the newly added post to us
        // so we can update the ui
      o.posts.push(data);
    });
  };

  o.upvote = function(post){
    return $http.put('/posts/' + post._id 
      + '/upvote').success(function(data){
      post.upvotes +=1;
    })
  }

  return o;
}])

.controller('MainCtrl', [
'$scope',
'posts',
function($scope, posts){
  $scope.test = 'Hello world!';
  $scope.posts = posts.posts;
  $scope.addPost = function(){
    if ($scope.title && $scope.title.length > 0) {
      posts.create({
        title: $scope.title,
        link: $scope.link      
      });
      $scope.title = '';
      $scope.link = '';
    }
  }

  $scope.incrementUpvotes = function(post) {
    posts.upvote(post);
  }

}])

.controller('PostsCtrl', [
'$scope',
'$stateParams',
'posts',
function($scope, $stateParams, posts){
  $scope.post = posts.posts[$stateParams.id];

  $scope.addComment = function(){
    if ($scope.body && $scope.body.length > 0) {
     $scope.post.comments.push({
        body: $scope.body,
        author: 'user',
        upvotes: 0
      });
      $scope.body = '';
    }
  }

}])