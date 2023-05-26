const { default: mongoose } = require('mongoose')
mongoose.set('strictQuery', true);

mongoose.connect(`${process.env.URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() => {
    console.log('Db connection done')
}).catch(error => {
    console.log('Error>>>>>>', error);
})



const db = {
    User: require('./user'),
   
    Comment: require('./comment'),
    Reply: require('./reply'),
}





module.exports = db