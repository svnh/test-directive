app.directive('breaker', function(){
  return {
    restrict: 'E',
    scope: false,
    transclude: true,
    controller: function($scope) {
      $scope.title = 'thing';
    },
    templateUrl: 'breaker/partial.html'
  }
});
