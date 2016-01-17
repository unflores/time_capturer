angular.module('timeLogService', [])

    .factory('TimeLogs', function($http) {
        return {
            get : function() {
                return $http.get('/api/time_logs');
            },
            create : function(data) {
                return $http.post('/api/time_logs', data);
            },
            delete : function(id) {
                return $http.delete('/api/time_logs/' + id);
            }
        }
    })
    .factory('TimeDifference',function(){
        function roundToTwo(num) {
            return +(Math.round(num + "e+2")  + "e-2");
        }

        return function (start, end){
          // Invalid case
          if(typeof start == 'undefined' || typeof end == 'undefined'){
            return '';
          }

          start = start.split(':');
          end   = end.split(':');

          var start_offset = start[0] * 60 + parseInt(start[1]);
          var end_offset = end[0] * 60 + parseInt(end[1]);

          return roundToTwo((end_offset - start_offset) / 60);
        }

    });
