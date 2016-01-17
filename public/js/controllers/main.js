angular.module('timeLogController', [])

    .controller('mainController', function($scope, $http, TimeLogs, TimeDifference) {
        $scope.formData = {};

        TimeLogs.get()
            .success(function(data){
              $scope.time_logs = data;
            });

        $scope.createTimeLog = function() {

            // if form is empty, nothing will happen
            if (!$.isEmptyObject($scope.formData)) {
                $scope.formData.time = TimeDifference(
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
    .directive('tcTime',['TimeDifference', function(TimeDifference) {
      return {
        link: function (scope, element, attrs) {
          element.text(TimeDifference(scope.time_log.start, scope.time_log.end));
        }
      };
    }]);

