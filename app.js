var express = require('express');
var mongojs = require('mongojs')
var bodyParser = require('body-parser');
var db = mongojs('clientkeeper', ['clients'])


var app = express();


app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.get('/clients', function (req, res) {
  console.log('Request for clients received...');
  db.clients.find().sort({first_name: 1}, function (err, docs){
    if (err) {
      res.send(err)
    } else {
      console.log('Sending data...');
      res.json(docs)
    }
  })
})

app.post('/clients', function (req, res) {
  console.log('Adding new client...');
  db.clients.insert(req.body, function (err, doc){
    if (err) {
      res.send(err)
    } else {
      console.log('Client added');
      res.json(doc)
    }
  })
})

app.get('/clients/:id', function (req, res) {
  var id = req.params.id
  db.clients.findOne({_id: mongojs.ObjectId(id)}, function (err, doc){
    if (err) {
      res.send(err)
    } else {
      res.json(doc)
    }
  })
})

app.put('/clients/:id', function (req, res){
  var id = req.params.id;

  db.clients.findAndModify({query: {_id: mongojs.ObjectId(id)},
    update: {
        $set: {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          phone: req.body.phone,
        }},
        new: true
      },
    function(err, doc){
      res.json(doc)
    })
})

app.delete('/clients/:id', function (req, res){
  var id = req.params.id;

  db.clients.remove({_id: mongojs.ObjectId(id)}, function (err, doc){
    if (err) {
      res.send(err)
    } else {
      console.log('Client removed');
      res.json(doc)
    }
  })
})

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handlers
//
// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }
//
// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });


app.listen(3000, function(){
  console.log('Server listening at 3000');
})
