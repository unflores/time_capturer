var mongoose = require('mongoose');

module.exports = mongoose.model('TimeLog', {
    client: String,      // Client who I am working for
    task:   String,      // Task name eg: Cleaning up config
    description: String, // A more in depth explanation of task
    start: Date,         // Start time
    stop: Date,          // Stop time
});
