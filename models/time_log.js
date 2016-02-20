var mongoose = require('mongoose');

module.exports = mongoose.model('TimeLog', {
    client: String,      // Client who I am working for
    task:   String,      // Task name eg: Cleaning up config
    description: String, // A more in depth explanation of task
    start: String,       // Time in this format: [0-2][0-9]:[0-5][0-9]
    stop: String,        // Time in this format: [0-2][0-9]:[0-5][0-9]
});
