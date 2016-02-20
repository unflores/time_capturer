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
        // Takes time in form of hh:mm
        // Returns a date obj
        function to_date(hour_mins){
          var now = new Date();
          return new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            hour_mins.split(':')[0],
            hour_mins.split(':')[1]
          );
        }
        // Takes a date obj
        // Returns a time in form of hh:mm
        function to_hour_mins(date){
          return new Date(date).getHours() + ':' + ('0'+ new Date(date).getMinutes()).slice(-2);
        }
        // Takes a date object or a string in the form 'hh:mm'
        function to_time(start, stop){
          // Invalid case
          if(typeof start == 'undefined' || typeof stop == 'undefined'){
            return '';
          }
          start = to_hour_mins(start);
          stop  = to_hour_mins(stop);
          start = start.split(':');
          stop  = stop.split(':');

          var start_offset = start[0] * 60 + parseInt(start[1]);
          var stop_offset  = stop[0] * 60 + parseInt(stop[1]);

          return roundToTwo((stop_offset - start_offset) / 60);
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
          to_stop: to_stop,
          to_date: to_date,
          to_hour_mins: to_hour_mins
        };

    });
