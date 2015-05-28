var app = angular.module('RedditClone', [])
.factory('posts', [function(){
  var o = {
    posts: [{title: 'hello', link:'', upvotes: 0}]
  };
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
      $scope.posts.push({
        title: $scope.title,
        link: $scope.link,
        upvotes: 4});
      $scope.title = '';
      $scope.link = '';
    }
  }

  $scope.incrementUpvotes = function(post) {
    post.upvotes += 1;
  }



}]);