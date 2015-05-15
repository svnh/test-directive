app.directive('breaker', function(){
  return {
    restrict: 'E',
    scope: false,
    controller: function($scope) {
      $scope.title = 'thing';
    },
    templateUrl: 'breaker/partial.html'
  }
});
