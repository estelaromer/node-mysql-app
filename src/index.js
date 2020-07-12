const express = require('express');
const morgan = require('morgan');

// initializations
const app = express();

// settings
app.set('port', process.env.PORT || 4000);

// middlewares
app.use(morgan('dev'));

// global variables

// routes

// public

// starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
});