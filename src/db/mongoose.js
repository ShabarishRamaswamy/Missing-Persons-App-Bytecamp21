const mongoose = require('mongoose')

module.exports.connect = () => {
    if(process.env.NODE_ENV === 'test'){
        const Mockgoose = require('mockgoose').Mockgoose
        const mockgoose = new Mockgoose(mongoose)

        mockgoose.prepareStorage()
        .then(() => {
            mongoose.connect(process.env.MONGODB_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            })
            .then(() => {
                console.log('Connected to MongoDB!');
            })
            .catch((err) => {
                console.error('Error connecting to MongoDB: ', err);
            });
        })
    } else{
        mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        .then(() => {
            console.log('Connected to MongoDB!');
        })
        .catch((err) => {
            console.error('Error connecting to MongoDB: ', err);
        });
    }

}