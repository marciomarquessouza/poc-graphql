var createError = require('http-errors');
var express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var app = express();
const courses = require('./graphql/courses');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const schema = buildSchema(`
  type Query {
    message: String,
    name: String
  }
`);

const root = {
  message: () => 'Hello World!',
  name: () => 'Marcio'
};

app.use('/', indexRouter);
app.use('/graphql', express_graphql({
  schema,
  rootValue: root,
  graphiql: true
}));
app.use('/courses', express_graphql({
  schema: courses.schema,
  rootValue: courses.root,
  graphiql: true
}));

app.unsubscribe('')

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
