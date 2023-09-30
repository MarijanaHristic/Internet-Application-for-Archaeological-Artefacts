import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import loginRouter from './routers/login.routes';
import registerRouter from './routers/register.routes';
import adminRouter from './routers/admin.routes';
import userRouter from './routers/user.routes';
import resetPasswordRouter from './routers/resetPassword.routes';

const app = express();
app.use(cors())
app.use(express.json())

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser());

mongoose.connect('mongodb://0.0.0.0:27017/vinca')
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('db connected')
})

const router = express.Router()
router.use('/loginPage', loginRouter)
router.use('/registerPage', registerRouter)
router.use('/resetPasswordPage', resetPasswordRouter)
router.use('/admin', adminRouter)
router.use('/user', userRouter)

const path = require("path");
app.use("/uploads", express.static('./src/uploads'))

app.use('/', router)
app.listen(4000, () => console.log(`Express server running on port 4000`));