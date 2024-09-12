const functions = require('firebase-functions');
const app = require('./src/app'); // Import your Express app

// Export your Express app as a Firebase Function
exports.app = functions.https.onRequest(app);
