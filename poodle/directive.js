app.directive('poodle', function(){
  return {
    restrict: 'E',
    scope: false,
    transclude: true,
    controller: function($scope) {
      $scope.title = 'puppy';
    },
    templateUrl: 'poodle/partial.html'
  }
});
