const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "views"));
app.use(express.static('public'));

function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next)
    } catch (error) {
      res.render('error', {error})
    }
  }
}

//WITH CALLBACKS
/* function getUsers(cb){
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) return cb(err);
    const users = JSON.parse(data).users;
    return cb(null, users);
  });
}

app.get('/', (req,res) => {
  getUsers((error, users) => {
    if (error) {
      res.render('error', { error })
    } else {
      res.render('index', {title: 'Users', users})
    }
  })
}); */

//WITH PROMISES
/* function getUsers() {
  return new Promise((resolve, reject) => {
    fs.readFile('data.json', 'utf-8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        const users = JSON.parse(data).users;
        resolve(users);
      }
    });
  });
}

app.get('/', (req, res) => {
  getUsers()
    .then(users => {
      res.render('index', {title: 'Users', users})
    })
    .catch(error => {
      res.render('error', {error})
    })
}); */

//WITH ASYNC-AWAIT

function getUsers() {
  return new Promise((resolve, reject) => {
    fs.readFile('data.json', 'utf-8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        const users = JSON.parse(data).users;
        resolve(users);
      }
    });
  });
}

app.get('/', asyncHandler(async (req, res) => {
  const users = await getUsers();
  res.render('index', { title: 'Users', users });
}));

app.listen(3000, () => console.log('App listening on port 3000!'));