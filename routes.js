var TimeLog = require('./models/time_log');

module.exports = function(app) {

  // API ---------------------------------------------------------------------
  app.get('/api/time_logs', function(req, res) {

      TimeLog.find(function(err, time_logs) {

          if (err)
              res.send(err)

          res.json(time_logs);
      });
  });

  app.post('/api/time_logs', function(req, res) {
      TimeLog.create({
          client : req.body.client,
          task:    req.body.task,
          description: req.body.description,
          start:   req.body.start,
          stop:    req.body.stop
      }, function(err, time_logs) {
          if (err)
              res.send(err);
          TimeLog.find(function(err, time_logs) {
              if (err)
                  res.send(err)
              res.json(time_logs);
          });
      });

  });

  app.delete('/api/time_logs/:time_log_id', function(req, res) {
      TimeLog.remove({
          _id : req.params.time_log_id
      }, function(err, time_log) {
          if (err)
              res.send(err);

          TimeLog.find(function(err, time_logs) {
              if (err)
                  res.send(err)
              res.json(time_logs);
          });
      });
  });

  app.get('*', function(req, res) {
    res.sendFile('./public/index.html');
  });

};
