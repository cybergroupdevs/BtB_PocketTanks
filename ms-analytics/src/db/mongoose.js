import mongoose from 'mongoose';
import envs from '../../src/utils/config';
const uri = `mongodb+srv://btb_admin:${encodeURIComponent(process.env.mongoPass)}@btb-xavqw.mongodb.net/test?retryWrites=true&w=majority`;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

export default mongoose;