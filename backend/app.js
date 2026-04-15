import express from 'express';
import registerCustomerRoutes from './src/routes/registerCustomer.js';
import customerRoutes from './src/routes/customer.js';


import cookieParser from 'cookie-parser';

//libreria de express
const app = express();


app.use(cookieParser());

//para qie la api acepte json
app.use(express.json());


app.use('/api/registerCustomer', registerCustomerRoutes);
app.use('/api/customers', customerRoutes);


export default app;