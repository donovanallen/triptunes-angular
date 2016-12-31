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
    "TunesFactory",
    "$state",
    "$stateParams",
    "TripService",
    showControllerFunction
  ])
  .factory("TripFactory",[
    "$resource",
    TripFactoryFunction
  ])
  .factory("TunesFactory",[
    "$resource",
    TunesFactoryFunction
  ])
  .service('TripService', TripServiceCallback)
  // .directive("tunesDirective", function() {
  //   return {
  //     templateUrl: '/js/ng-views/_tunes.html',
  //     replace: true
  //   }
  // })

  function TripFactoryFunction($resource) {
    return $resource("http://localhost:4000/api/trip", {}, {
      update: {method: "PUT"}
    })
  }

  function TunesFactoryFunction($resource) {
    return $resource("http://localhost:4000/api/trip/tunes")
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
        var mapdata = res.data
        $http({
          url: "http://localhost:4000/api/trip/tunes",
          method: "post",
          data: user
        }).then((spres) => {
          var list = spres.data
          console.log(list);
          $state.go("show", {}, {reload: true})
          TripService.newtrip(mapdata)
          TripService.newlist(list)
        })

      })
    }
  };

  function showControllerFunction($scope, TripFactory, TunesFactory, $state, $stateParams, TripService) {

    // console.log(TripFactory.get());
    // $scope.trip = TripFactory.get();
    this.trip = TripService.getTrip();
    // console.log($scope.trip);
    // this.tunes = TunesFactory.get();
    // console.log($scope.tunes);
    this.playlists = TripService.getList()
    // console.log(this.playlists);
  };

function TripServiceCallback() {
  var trip = {}
  var playlists = []

  var newlist = function(spdata) {
    playlists = spdata
  }
  var newtrip = function(data) {
    trip = data
  }

  var getList = function() {
    return playlists
  }

  var getTrip = function() {
    return trip
  }

  return {
    newtrip,
    getTrip,
    newlist,
    getList
  }
};
