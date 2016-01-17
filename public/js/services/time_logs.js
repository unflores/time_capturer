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
    .factory('Time',function(){
        function roundToTwo(num) {
            return +(Math.round(num + "e+2")  + "e-2");
        }

        function to_time(start, end){
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

        // Given start time "hh:mm" and a time in minutes "5.38" calculate stop time
        function to_stop(start, time){
          // Invalid case
          if(typeof start == 'undefined' || typeof time == 'undefined'){
            return '';
          }

          start = start.split(':');

          var start_offset = start[0] * 60 + parseInt(start[1]);
          var end_time     = time * 60 + start_offset;

          var end_minutes = end_time % 60;
          end_time -= end_minutes;
          var end_hour = end_time / 60;
          return [end_hour, ':', (end_minutes + "0").substr(0,2)].join('');
        }

        return {
          to_time: to_time,
          to_stop: to_stop
        };

    });
