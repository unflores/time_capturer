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
                $scope.formData.time = Time.to_time(
                    $scope.formData.start,
                    $scope.formData.stop
                );
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
    .directive('tcStop',['Time', function(Time) {
      return {
        link: function (scope, element, attrs) {
          element.text(Time.to_stop(scope.time_log.start, scope.time_log.time));
        }
      };
    }]);

