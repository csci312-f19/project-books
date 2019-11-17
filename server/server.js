const { Model } = require('objection');

const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[process.env.NODE_ENV || 'development']);
const Listing = require('./models/Listing');
const Book = require('./models/Book');
const User = require('./models/User');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const path = require('path'); // eslint-disable-line global-require
const session = require('express-session');
const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const { OAuth2Client } = require('google-auth-library');
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Resolve client build directory as absolute path to avoid errors in express
const buildPath = path.resolve(__dirname, '../client/build');
const { wrapError, DBError } = require('db-errors');
const authenticationMiddleware = (request, response, next) => {
  if (request.isAuthenticated()) {
    return next(); // we are good, proceed to the next handler
  }
  return response.sendStatus(403); // forbidden
};

Model.knex(knex);
const app = express();

const corsOptions = {
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  origin: '*',
  allowedHeaders: ['Content-Type', 'Accept', 'X-Requested-With', 'Origin']
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new BearerStrategy((token, done) => {
    googleClient
      .verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
      })
      .then(async ticket => {
        const payload = ticket.getPayload();
        let user = await User.query().findOne('googleId', payload.sub);
        if (!user) {
          user = await User.query().insertAndFetch({
            googleId: payload.sub,
            familyName: payload.family_name,
            givenName: payload.given_name,
            email: payload.email
          });
        }
        done(null, user);
      })
      .catch(error => {
        done(error);
      });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.query()
    .findOne('id', id)
    .then(user => {
      done(null, user);
    });
});

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  // Serve any static files as first priority
  app.use(express.static(buildPath));
}

// TODO: Add any middleware here

app.post(
  '/login',
  passport.authenticate('bearer', { session: true }),
  (request, response, next) => {
    response.sendStatus(200);
  }
);

app.post('/logout', (request, response, next) => {
  request.logout(); // logout function added by passport
  response.sendStatus(200);
});

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
    console.log('error is: ' + error);
    response
      .status(wrappedError.statusCode || wrappedError.status || 500)
      .send(wrappedError.data || wrappedError.message || {});
  }
});

module.exports = {
  app,
  knex
};
