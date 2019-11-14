const express = require('express');
const path = require('path'); // eslint-disable-line global-require

// Resolve client build directory as absolute path to avoid errors in express
const buildPath = path.resolve(__dirname, '../client/build');

const app = express();

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  // Serve any static files as first priority
  app.use(express.static(buildPath));
}

// TODO: Add any middleware here

// TODO: Add your routes here

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  // All remaining requests return the React app, so it can handle routing.
  app.get('*', (request, response) => {
    response.sendFile(path.join(buildPath, 'index.html'));
  });
}

module.exports = {
  app
};

//sends the email; currently hard coded; will need to be moved over to client???
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'noReply.MiddBookMarket@gmail.com',
    pass: 'MarketBookMidd1'
  }
});

var mailOptions = {
  from: 'noReply.MiddBookMarket@gmail.com',
  to: 'hdonovan@middlebury.edu',
  subject: 'A buyer is interested in your book!',
  html: '<h1>Hi There!</h1><p>This is a test :)</p'
};

transporter.sendMail(mailOptions, function(error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
