let mongoose = require('mongoose');
express = require('express');
cors = require('cors');
morgan = require('morgan');
config = require('./config/database');
passport = require('passport');
routes = require('./routes/routes');
bodyParser = require('body-parser');
port = 3333;


mongoose.connect(config.database).then(
  () => {
    console.log('Mongo is connected');
    let app = express();
    app.use(morgan('dev'));
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use('/api', routes);
    app.use(passport.initialize());
    require('./config/passport')(passport);

    app.listen(port, function () {
      console.log('server is running on port:' + port);
    });
  },
  err => {
    console.log('MongoDB not connected');
  }
);
