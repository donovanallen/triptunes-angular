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
    "$state"
    tripControllerFunction
  ])
  // .factory("TripFactory",[
  //   "$resource",
  //   TripFactoryFunction
  // ])
  //
  // function TripFactoryFunction($resource) {
  //   return $resource("https://localhost/api/trip", {}, {
  //     update: {method: "PUT"}
  //   })
  // }


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
  }

  function tripControllerFunction($scope, $state) {
    this.trips = tripData
  }
