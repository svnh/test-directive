app.directive('test', ['$window', function($window){
  var url = $window.data.url;
  var branch = $window.data.branch;
  var page = $window.data.page;

  return {
    restrict: 'E',
    scope: false,
    transclude: true,
    controller: function($scope, $http) {
      $scope.loading = true;
      $http.get(url + '/' + branch + ':' + page)
        .then(function(data) {
          $scope.data = data.data.data;
          $scope.loading = false;
        })
        .catch(function(err) {
          $scope.error = err.statusText;
        });
    },
    templateUrl: 'test/partial.html'
  }
}]);
