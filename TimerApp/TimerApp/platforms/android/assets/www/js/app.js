// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('timer', ['ionic', 'angular-svg-round-progressbar'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (cordova.platformId === "ios" && window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('stopwatchController', function ($timeout) {
    var vm = this;

    this.ticks = 0;
    this.running = false;
    this.timeout = null;
    this.start = null;

    this.onTimeout = function () {
        vm.ticks++;

         var diff = (new Date().getTime() - vm.start) - (vm.ticks * 100);        
        vm.timeout = $timeout(vm.onTimeout, 100 - diff);
    }

    this.startStop = function () {
        if (vm.running) {
            $timeout.cancel(vm.timeout);
            vm.timeout = null;
            vm.start = null;
        } else {
            vm.start = new Date().getTime() - (vm.ticks * 100);
            vm.timeout = $timeout(vm.onTimeout, 100);
        }
        vm.running = !vm.running;
    }

    this.reset = function () {
        if (vm.running) {
            $timeout.cancel(vm.timeout);
            vm.timeout = null;
            vm.running = false;
        }
        vm.start = null;
        vm.ticks = 0;
    }

    this.getHours = function () {        
        return Math.floor(vm.ticks / 10 / 60 / 60);
    }

    this.getMinutes = function () {
        return Math.floor(vm.ticks / 10 / 60);
    }

    this.getSeconds = function () {
        return Math.floor(vm.ticks / 10) % 60;
    }    
})

.controller('timerController', function ($timeout) {
    var vm = this;
    
    this.limit = 5000;
    this.ticks = 0;
    this.running = false;
    this.timeout = null;
    this.start = null;

    this.onTimeout = function () {
        vm.ticks++;
        var diff = (new Date().getTime() - vm.start) - (vm.ticks * 100);
        vm.timeout = $timeout(vm.onTimeout, 100 - diff);
    }

    this.startStop = function () {
        if (vm.running) {
            $timeout.cancel(vm.timeout);
            vm.timeout = null;
            vm.start = null;
        } else {
            vm.start = new Date().getTime() - (vm.ticks * 100);
            vm.timeout = $timeout(vm.onTimeout, 100);
        }
        vm.running = !vm.running;
    }

    this.reset = function () {
        if (vm.running) {
            $timeout.cancel(vm.timeout);
            vm.timeout = null;
            vm.running = false;
        }
        vm.start = null;
        vm.ticks = 0;
    }

    
})

.filter('formatTimer', function () {
    return function (input) {
        function z(n) {
            return (n < 10 ? '0' : '') + n;
        }

        var tenths = input % 10;
        var seconds = Math.floor(input / 10);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);

        return (z(hours) + ':' + z(minutes % 60) + ':' + z(seconds % 60) + '.' + tenths);
    }
})
