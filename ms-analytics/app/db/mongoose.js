const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/socials', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});