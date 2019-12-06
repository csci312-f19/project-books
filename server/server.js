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

// const authenticationMiddleware = (request, response, next) => {
//   if (request.isAuthenticated()) {
//     return next(); // we are good, proceed to the next handler
//   }
//   return response.sendStatus(403); // forbidden
// };

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
        // let user = await User.query().findOne('googleId', payload.sub);
        let user = await User.query().findOne('googleId', payload.email);
        if (!user) {
          user = await User.query().insertAndFetch({
            googleId: payload.email,
            // id: payload.id,
            name: payload.name,
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
  (request, response) => {
    response.sendStatus(200);
  }
);

app.post('/logout', (request, response) => {
  request.logout(); // logout function added by passport
  response.sendStatus(200);
});

app.get('/api/MyPostings/', (request, response, next) => {
  Listing.query()
    .select(
      'Listings.id',
      'title',
      'Listings.ISBN',
      'edited',
      'courseID',
      'price',
      'userID',
      'condition',
      'comments'
    )
    .from('Listings')
    .innerJoin('Books', 'Books.ISBN', 'Listings.ISBN')
    .where('userID', request.user.id)
    .then(rows => {
      response.send(rows);
    }, next); // <- Notice the "next" function as the rejection handler
});

app.delete(`/api/MyPostings/:id`, (request, response, next) => {
  Listing.query()
    .deleteById(request.params.id)
    .then(() => {
      response.sendStatus(200);
    }, next);
});

app.put(`/api/MyPostings/Listing/:id`, (request, response, next) => {
  const { id } = request.params; // eslint-disable-line no-unused-vars

  Listing.query()
    .select('*')
    .skipUndefined()
    .updateAndFetchById(id, request.body)
    .then(listing => {
      response.send(listing);
    }, next);
});

app.put(`/api/MyPostings/Book/:ISBN`, (request, response, next) => {
  const { ISBN } = request.params; // eslint-disable-line no-unused-vars

  Book.query()
    .select('*')
    .skipUndefined()
    .updateAndFetchById(ISBN, request.body)
    .then(book => {
      response.send(book);
    }, next);
});

app.post('/api/newPosting/Listing', (request, response, next) => {
  const listing = {
    userID: request.user.id,
    ISBN: request.body.ISBN,
    condition: request.body.condition,
    price: request.body.price,
    edited: new Date().toLocaleString(),
    comments: request.body.comments
  };
  Listing.query()
    .insert(listing)
    .then(post => {
      response.send(post);
    }, next);
});

app.post('/api/newPosting/Book', (request, response, next) => {
  const bookData = {
    ISBN: request.body.ISBN,
    title: request.body.title,
    courseID: request.body.courseID
  };
  Book.query()
    .insert(bookData)
    .then(bookPost => {
      response.send(bookPost);
    }, next);
});

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

app.get(`/api/bookListings/`, (request, response, next) => {
  // new query approach to deal with new primary keys
  Listing.query()
    .select(
      'Listings.id',
      'title',
      'courseID',
      'price',
      'userID',
      'condition',
      'comments',
      'Listings.ISBN',
      'edited'
    )
    .from('Listings')
    .innerJoin('Books', 'Books.ISBN', 'Listings.ISBN')
    .then(rows => {
      response.send(rows);
    }, next); // <- Notice the "next" function as the rejection handler
});

app.get(`/api/bookListings/:id`, (request, response, next) => {
  const { id } = request.params;
  Listing.query()
    .select(
      'Listings.id',
      'title',
      'Listings.ISBN',
      'edited',
      'courseID',
      'price',
      'userID',
      'condition',
      'comments'
    )
    .from('Listings')
    .innerJoin('Books', 'Books.ISBN', 'Listings.ISBN')
    .where('Listings.id', id)
    .then(rows => {
      response.send(rows);
    }, next); // <- Notice the "next" function as the rejection handler
});

app.get('/api/users', (request, response, next) => {
  User.query()
    .select('*')
    .from('Users')
    .then(rows => {
      response.send(rows);
    }, next); // <- Notice the "next" function as the rejection handler
});

app.get(`/api/googleID/:id`, (request, response, next) => {
  User.query()
    .where('id', request.params.id)
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
    // console.log(`500 error is: ${error}`);
    response
      .status(wrappedError.statusCode || wrappedError.status || 500)
      .send(wrappedError.data || wrappedError.message || {});
  }
});

// Nodemailer and the following associated code is used to send the email to the 1uZuJFfuPEns6LaEvpvG1f0hTea8lilrouyo9mVc2GWdcEZ8OLoGmSADlrCw
const nodemailer = require('nodemailer');

app.post('/api/bookrequest', function Emailer(req) {
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
    html: `<p><strong><span style="font-size: 24px; color: rgb(41, 105, 176);">We have some good news for you!</span></strong></p>
<p>Hi there! Somebody is interested in buying your book, ${req.body.bookTitle}, listed at $${req.body.bookPrice} on Midd Book Market. Please contact the buyer at your earliest convenience, and make sure to arrange a time and place to meet to exchange the book for the agreed price.</p>
<p><u>Buyer contact information:</u> Jane Doe,
  <a href="mailto:email@middlebury.edu">email@middlebury.edu</a>
</p>
<p>Please contact the buyer within the next 3 days to set up a time to meet. Once your exchange is confirmed, make sure to log back on to your account and delete your book listing from the marketplace.</p>
<p>Thank you for using Midd Book Market!</p>`
  };
  transporter.sendMail(mailOptions, function errorResp() {
    // if (err) {
    //   console.error('there was an error: ', err); // replace with error handling
    // } else {
    //   console.log('here is the response: ', resp); // replace
    // }
    // console.log('something happened');
  });
});

module.exports = {
  app,
  knex
};
