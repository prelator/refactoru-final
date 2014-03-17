var droneApp = angular.module('droneApp', []);

droneApp.controller('ProjectListCtrl', function ($scope) {
  $scope.projects = allProjects || "none";
  $scope.orderProp = 'startDate';
});