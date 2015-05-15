app.directive('test', function(){
  return {
    restrict: 'E',
    scope: false,
    transclude: true,
    controller: function($scope) {
      $scope.title = 'w00t';
    },
    templateUrl: 'test/partial.html'
  }
});
