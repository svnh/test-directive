app.directive('test', function(){
  return {
    restrict: 'E',
    scope: false,
    controller: function($scope) {
      $scope.title = 'w00t';
    },
    templateUrl: 'partial.html'
  }
});
