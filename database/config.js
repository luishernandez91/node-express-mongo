const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CONN,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            });
        console.log('Database connected');
    } catch (e) {
        console.log(e);
        throw new Error('Error on connecting to database')
    }
};

module.exports = {dbConnection};
