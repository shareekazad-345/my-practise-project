const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI;

console.log('Testing connection to:', uri);

mongoose.connect(uri)
    .then(() => {
        console.log('✅ CONNECTED SUCCESSFULLY!');
        process.exit(0);
    })
    .catch(err => {
        console.error('❌ CONNECTION FAILED:', err.message);
        process.exit(1);
    });