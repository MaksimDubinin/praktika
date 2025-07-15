require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models.js');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const fileUpload = require('express-fileupload')
const path = require('path');

const app = express();

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api/v1', router)


app.use(errorHandler)


const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync()
        app.listen(process.env.PORT, () => console.log(`Express server started on PORT ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start()