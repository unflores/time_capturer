angular.module('timeLogController', [])

    .controller('mainController', function($scope, $http, TimeLogs, Time) {
        $scope.formData = {};

        TimeLogs.get()
            .success(function(data){
              $scope.time_logs = data;
            });

        $scope.createTimeLog = function() {

            // if form is empty, nothing will happen
            if (!$.isEmptyObject($scope.formData)) {
                $scope.formData.start = Time.to_date($scope.formData.start);
                $scope.formData.stop  = Time.to_date($scope.formData.stop);
                TimeLogs.create($scope.formData)
                    .success(function(data) {
                        $scope.formData = {};
                        $scope.time_logs = data;
                    });
            }
        };

        $scope.deleteTimeLog = function(id) {
            TimeLogs.delete(id)
                .success(function(data) {
                    $scope.time_logs = data;
                });
        };
    })
    .directive('tcBegin', ['Time', function(Time) {
      return {
        link: function (scope, element, attrs) {
          console.log(scope.time_log);

          element.text(Time.to_hour_mins(scope.time_log.start));
        }
      };
    }])

    .directive('tcStop', ['Time', function(Time) {
      return {
        link: function (scope, element, attrs) {
        console.log(scope.time_log);
          element.text(Time.to_hour_mins(scope.time_log.stop));
        }
      };
    }])

    .directive('tcTime',['Time', function(Time) {
      return {
        link: function (scope, element, attrs) {

          element.text(Time.to_time(scope.time_log.start, scope.time_log.stop));
        }
      };
    }]);

