require('dotenv').config({
    path: require('path').join(__dirname, '.env')
});

require('./server').start();