const express = require("express");
const mongoose = require("mongoose");
const morgan = require('morgan');
const userRouter = require('./routes/users');
const categoryRouter = require('./routes/categories');
const productRouter = require('./routes/products');
const uploadRouter = require('./routes/upload');
// const ordersRouter = require('./routes/orders');

const dotenv = require('dotenv').config();






const app = express();
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static(__dirname + "/public/products"));
app.use(express.static(__dirname + "/public/uploads"))

const auth = require('./auth');
app.use(express.urlencoded({extended: true }));

mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then((db) => {
        console.log("Successfully connected to MongodB server");
    }, (err) => console.log(err));

app.use('/users', userRouter);
app.use('/categories', categoryRouter);
app.use('/products', productRouter);
// app.use('/order', ordersRouter);



app.use('/upload', uploadRouter);

app.use(auth.verifyUser);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.statusCode = 500;
    res.json({ status: err.message });
});

app.listen(process.env.PORT, () => {
    console.log(`App is running at localhost:${process.env.PORT}`);
});
