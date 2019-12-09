import mongoose from 'mongoose';
const uri = 'mongodb+srv://btb_admin:btb@admin123@btb-xavqw.mongodb.net/test?retryWrites=true&w=majority';
console.log(uri)
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

export default mongoose;