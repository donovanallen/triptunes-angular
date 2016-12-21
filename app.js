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
    "TripService",
    tripControllerFunction
  ])
  .controller("showCtrl", [
    "$scope",
    "TripFactory",
    "$state",
    "$stateParams",
    "TripService",
    showControllerFunction
  ])
  .factory("TripFactory",[
    "$resource",
    TripFactoryFunction
  ])
  .service('TripService', TripServiceCallback)

  function TripFactoryFunction($resource) {
    return $resource("https://localhost:4000/api/trip", {}, {
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
        controllerAs: "vm",
        data: null
      })
  }

  function tripControllerFunction($scope, $state, $http, TripService) {
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
        $state.go("show", {data: res.data}, {reload: true})
        TripService.newtrip(res.data)
        console.log(res.data);
      })
    }
  }

  function showControllerFunction($scope, TripFactory, $state, $stateParams, TripService) {
    this.trips = tripData

    $scope.trip = TripFactory.get();

    this.trip = TripService.getTrip()
  }

function TripServiceCallback() {
  var trip = {}

  var newtrip = function(data) {
    trip = data
  }

  var getTrip = function() {
    return trip
  }

  return {
    newtrip,
    getTrip
  }
};
