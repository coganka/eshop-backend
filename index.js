const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

const productRouter = require('./routes/products');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const orderRouter = require('./routes/order');
const cartRouter = require('./routes/cart');

const port = process.env.PORT || 3000;
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('db connected'))
    .catch((err) => console.log(err));


app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({limit: '10mb', extended: true}));

app.use(cors());
app.use(helmet());


app.use('/api/', authRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/carts', cartRouter);


app.listen(port, () => console.log(`app listening on port ${port}`));