import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import adminRoute from './routes/adminRoute.js'
import authRoute from './routes/authRoute.js'
import userRoute from './routes/userRoute.js'
import session from 'express-session'
import path from 'path'
dotenv.config();

const PORT = process.env.PORT || 7700;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL);

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

const app = express();
// const allowedOrigins = ['http://localhost:3000']; 
const _dirname = path.dirname("")
const buildpath = path.join(_dirname , "../client/tasker/build")
app.use(express.static(buildpath))
const corsOptions = {
  origin: '*',
  methods: 'GET, PUT, POST, DELETE',
  credentials: true,
};


//middlewares
app.use(cors(corsOptions));
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'myru', 
    resave: false,
    saveUninitialized: true,
  })
);
app.use('/superadmin' , adminRoute)
app.use('/auth' , authRoute)
app.use('/user' , userRoute)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
