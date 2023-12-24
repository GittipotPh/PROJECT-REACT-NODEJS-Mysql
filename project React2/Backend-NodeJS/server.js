import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { sequelizeInstance ,testConnection } from './database/connection.js';
import { router as usersRoutes} from './routes/usersRoutes.js';
import { router as bannersRoutes } from './routes/bannersRoutes.js';
import { router as shopsRoutes } from './routes/shopsRoutes.js';








const app = express();
const port = 3004; 

app.use(cors({
    origin: 'http://localhost:3000', // Adjust this to your React app's URL
    credentials: true,
  }));

app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
});

app.use(bodyParser.json());

app.use('/userlogin', usersRoutes);


app.use('/userregister', usersRoutes);

app.use('/users/:id', usersRoutes);
app.use('/users/patch/:id', usersRoutes);
app.use('/users/delete/:id', usersRoutes);

app.use('/banners/:id', bannersRoutes);
app.use('/banners', bannersRoutes);
app.use('/banners/patch/:id' , bannersRoutes);
app.use('/banners/delete/:id', bannersRoutes)
app.use('/postbanners', bannersRoutes)

app.use('/googleshops' , shopsRoutes);
app.use('/shops/:id', shopsRoutes);


app.use('/shops', shopsRoutes);
app.use('/shops/patch/:id', shopsRoutes)
app.use('/shops/delete/:id', shopsRoutes);


testConnection();

app.get('/', (req, res) => {
    res.send('Hello, this is the root page!');});
  

app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});
