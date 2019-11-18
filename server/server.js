const { Model } = require('objection');

const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[process.env.NODE_ENV || 'development']);
const Listing = require('./models/Listing');
const Book = require('./models/Book');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const path = require('path'); // eslint-disable-line global-require

// Resolve client build directory as absolute path to avoid errors in express
const buildPath = path.resolve(__dirname, '../client/build');
const { wrapError, DBError } = require('db-errors');

Model.knex(knex);
const app = express();

const corsOptions = {
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  origin: '*',
  allowedHeaders: ['Content-Type', 'Accept', 'X-Requested-With', 'Origin']
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  // Serve any static files as first priority
  app.use(express.static(buildPath));
}

// TODO: Add any middleware here

// TODO: Add your routes here
app.get('/api/listings', (request, response, next) => {
  Listing.query().then(rows => {
    response.send(rows);
  }, next); // <- Notice the "next" function as the rejection handler
});

app.get(`/api/books/:ISBN`, (request, response, next) => {
  const { ISBN } = request.params;
  Book.query()
    .where('ISBN', ISBN)
    .then(rows => {
      response.send(rows);
    }, next); // <- Notice the "next" function as the rejection handler
});

app.get('/api/bookListings', (request, response, next) => {
  Listing.query()
    .select('*')
    .from('Listings')
    .joinRaw('natural join Books')
    .then(rows => {
      response.send(rows);
    }, next); // <- Notice the "next" function as the rejection handler
});

app.get(`/api/bookListings/:id`, (request, response, next) => {
  const { id } = request.params;
  Listing.query()
    .select('*')
    .from('Listings')
    .joinRaw('natural join Books')
    .where('listingID', id)
    .then(rows => {
      response.send(rows);
    }, next); // <- Notice the "next" function as the rejection handler
});

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  // All remaining requests return the React app, so it can handle routing.
  app.get('*', (request, response) => {
    response.sendFile(path.join(buildPath, 'index.html'));
  });
}

// A very simple error handler. In a production setting you would
// not want to send information about the inner workings of your
// application or database to the client.
app.use((error, request, response, next) => {
  if (response.headersSent) {
    next(error);
  }
  const wrappedError = wrapError(error);
  if (wrappedError instanceof DBError) {
    response.status(400).send(wrappedError.data || wrappedError.message || {});
  } else {
    response
      .status(wrappedError.statusCode || wrappedError.status || 500)
      .send(wrappedError.data || wrappedError.message || {});
  }
});

// sends email
const nodemailer = require('nodemailer');

app.post('/api/bookrequest', function Emailer(req) {
  console.log(`the request has been received! it is:${req}`);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'noReply.MiddBookMarket@gmail.com',
      pass: 'MarketBookMidd1'
    }
  });
  const mailOptions = {
    from: 'noReply.MiddBookMarket@gmail.com',
    to: `${req.body.email}`,
    subject: `Somebody wants to buy your book on Midd Book Market!`,
    html: `<p><strong><span style="font-size: 24px; color: rgb(41, 105, 176);">We have some good news for you!</span></strong></p><p>Somebody is interested in buying your book, [Book Title] by [Author], listed at $[X.xx] on Midd Book Market. Please contact the buyer at your earliest convenience, and make sure to arrange a time and place to meet and exchange your book for the agreed price.</p>
     <p><u>Buyer information:</u>&nbsp;</p>
     <p>Jane Doe,
       <a href="mailto:email@middlebury.edu">email@middlebury.edu</a>
     </p>
     <p>Please make sure to contact the buyer within the next 3 days to set up a time to meet. Once your exchange is confirmed, make sure to log back on to your account and delete your book.</p>
     <p>Thank you for using Midd Book Market!</p>`
  };
  transporter.sendMail(mailOptions, function errorResp(err, resp) {
    if (err) {
      console.error('there was an error: ', err); // replace with error handling
    } else {
      console.log('here is the response: ', resp); // replace
    }
    console.log('something happened');
  });
});

module.exports = {
  app,
  knex
};
