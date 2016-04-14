'use strict';

const express = require('express');
const mongo = require('mongodb').MongoClient;
// const mongoURL = `mongodb://${process.env.IP}:27017/url-shortener`;
const mongoURL = `mongodb://localhost:27017/url-shortener`;

const app = express();

function generateID() {
  // Generates random number in range 10000-99999
  // This is not ideal because it's gonna lead to collisions
  return Math.floor(Math.random() * 90000) + 10000;
}

app.set('port', process.env.PORT || 3000);
app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (request, response) => {
  response.render('index');
});

app.get('/:id', (request, response) => {
  mongo.connect(mongoURL, (err, db) => {
    if (err) throw err;

    db.collection('urls').findOne({ _id: +request.params.id }, (err, result) => {
      if (err) throw err;

      if (result) {
        db.close();
        response.redirect(result.url);
      } else {
        db.close();
        response.json({
          error: 'No such URL in the database.'
        });
      }
    });
  });
});

app.get('/new/:url(*)', (request, response) => {
  const url = request.params.url;

  if (/^https?:\/\/[^ "]+$/.test(url)) {
    // Add to the db
    const id = generateID();

    mongo.connect(mongoURL, (err, db) => {
      if (err) throw err;

      db.collection('urls').insert({
        _id: id,
        url
      }, (err, result) => {
        if (err) throw err;

        response.json({
          original_url: url,
          short_url: `https://reducer.herokuapp.com/${id}`
        });

        db.close();
      });
    });
  } else {
    response.json({
      error: 'Wrong URL format.'
    });
  }
});

app.listen(app.get('port'), () => {
  console.log(`Server listening on port ${app.get('port')}...`);
});
