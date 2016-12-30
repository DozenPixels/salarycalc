'use strict';

angular.module('salaryCalc')
    .service('dataService', function ($http) {

        this.getDays = function (callback) {
            $http.get('inc/days.json')
                .then(callback)
        };

    });