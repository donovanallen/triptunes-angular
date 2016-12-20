angular
  .module("triptunes", [
    "ui.router",
    "ngResource"
  ])
  .config(["$stateProvider",
  RouterFunction
  ])
  .controller("tripCtrl", [
    "$scope",
    "$state",
    "$http",
    tripControllerFunction
  ])
  .controller("showCtrl", [
    "$scope",
    "$state",
    showControllerFunction
  ])
  .factory("TripFactory",[
    "$resource",
    TripFactoryFunction
  ])

  function TripFactoryFunction($resource) {
    return $resource("https://localhost/api/trip", {}, {
      update: {method: "PUT"}
    })
  }


  let tripData = [
    {
      origin: 'Boston',
      destination: 'DC'
    },
    {
      origin: 'Seattle',
      destination: 'Sacramento'
    },
    {
      origin: 'Houston',
      destination: 'Tulsa'
    }
  ]

  function RouterFunction($stateProvider) {
    $stateProvider
      .state("index", {
        url: "/",
        templateUrl: "js/ng-views/index.html",
        controller: "tripCtrl",
        controllerAs: "vm"
      })
      .state("show", {
        url: "/trip",
        templateUrl: "js/ng-views/show.html",
        controller: "showCtrl",
        controllerAs: "vm"
      })
  }

  function tripControllerFunction($scope, $state, $http) {
    this.trips = tripData
    
    $scope.user = {
      origin: "",
      destination: ""
    }

    this.create = function(user) {
      $http({
        url: "http://localhost:4000/api/trip",
        method: "post",
        data: user
      }).then((res) => {
        $state.go("show", {}, {reload: true});
      })
    }
  }

  function showControllerFunction($scope, $state) {
    this.trips = tripData
  }
