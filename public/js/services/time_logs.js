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
    });
