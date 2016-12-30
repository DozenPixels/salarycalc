'use strict';

angular.module('salaryCalc')
    .controller('salaryCtrl', function ($scope, dataService) {

        //        dataService.getDays(function (response) {
        //            $scope.days = response.data;
        //        });

        $scope.rateProvided = false;

        //$scope.weeklyTotal = 0;

        //Define weekly total in minutes as a variable
        var weeklyTotalMinutes;

        //Allow variable defined above to be accessed in the $scope
        $scope.weeklyTotalMinutes = weeklyTotalMinutes;



        // Function to convert input to minutes
        var convertToMinutesInput = function (hours) {

            var d = new Date(hours);
            var h = d.getHours();
            var m = d.getMinutes();
            var minutes = h * 60 + m;
            //Remove ':' charcter and split the time into JS usable format
            //var split = hours.split(':');

            //Multiply hours by 60 and add minutes
            //var minutes = (+split[0]) * 60 + (+split[1]);

            //Return result
            return minutes;
        }



        // Function to convert standard time notation (00:00) to minutes
        var convertToMinutes = function (hours) {

            //Remove ':' charcter and split the time into JS usable format
            var split = hours.split(':');

            //Multiply hours by 60 and add minutes
            var minutes = (+split[0]) * 60 + (+split[1]);

            //Return result
            return minutes;
        }



        //Function to convert total minutes to standard time notation (00:00)
        var convertToHours = function (minutes) {

            //Get full hours from total minutes and save in variable
            var convertedHours = Math.floor(minutes / 60);

            //Get remaining minutes and save in variable
            var convertedMinutes = minutes % 60;

            //Return time in standard time notation (00:00)
            if (convertedMinutes == 0) {

                //If converted time results in 00 minutes
                var converted = convertedHours + ":00";

                //Return result
                return converted;
            } else if (convertedMinutes < 10) {

                //If converted time results in less than 10 minutes
                var converted = convertedHours + ":0" + convertedMinutes;

                //Return result
                return converted;
            } else {

                //If converted time results in anything else
                var converted = convertedHours + ":" + convertedMinutes;

                //Return result
                return converted;
            };
        }



        //Function to calculate time worked in a day
        $scope.difference = function (start, end) {
            if (start == null || end == null) {

                //Check if values are not entered and return default placeholder
                return "00:00"
            } else {

                //Convert times to minutes
                var minutesStart = convertToMinutesInput(start);
                var minutesEnd = convertToMinutesInput(end);

                //console.log(typeof minutesStart);

                //Calculate difference in minutes
                var difference = minutesEnd - minutesStart;

                //$scope.weeklyTotal += difference;

                //console.log($scope.weeklyTotal);

                //console.log("difference");

                //Convert difference to standard time notation (00:00)
                var differenceFormatted = convertToHours(difference);

                //Return result
                return differenceFormatted;
            }
        }



        //Function to calculate time worked in a week
        $scope.total = function () {

            //Define available day variables and convert to minutes
            var monTotalMinutes = convertToMinutes($scope.mon.total);
            var tueTotalMinutes = convertToMinutes($scope.tue.total);
            var wedTotalMinutes = convertToMinutes($scope.wed.total);
            var thuTotalMinutes = convertToMinutes($scope.thu.total);
            var friTotalMinutes = convertToMinutes($scope.fri.total);
            var satTotalMinutes = convertToMinutes($scope.sat.total);
            var sunTotalMinutes = convertToMinutes($scope.sun.total);

            //Add daily totals to get weekly total in minutes
            weeklyTotalMinutes = monTotalMinutes + tueTotalMinutes + wedTotalMinutes + thuTotalMinutes + friTotalMinutes + satTotalMinutes + sunTotalMinutes;

            //Convert weekly total in minutes to standard time notation (00:00)
            var weeklyTotalHours = convertToHours(weeklyTotalMinutes);

            //return weeklyTotalMinutes;

            if (weeklyTotalHours == "0:00") {

                return null;
            } else {

                //Return result
                return weeklyTotalHours;
            }

        }



        $scope.pay = function () {
            if ($scope.payRate == null) {

                $scope.rateProvided = false;

                return null;

            } else {

                $scope.rateProvided = true;

                var pay = (weeklyTotalMinutes / 60) * $scope.payRate;

                var payRounded = pay.toFixed(2);

                payRounded = '$' + payRounded;

                return payRounded;
            }
        }

    });