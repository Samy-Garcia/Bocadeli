import express from 'express';
import registerCustomerRoutes from './src/routes/registerCustomer.js';
import registerEmployeesRoutes from './src/routes/registerEmployees.js';
import customerRoutes from './src/routes/customer.js';
import employeeRoutes from './src/routes/employees.js';
import categoryRoutes from './src/routes/categoryRoutes.js';


import cookieParser from 'cookie-parser';

//libreria de express
const app = express();


app.use(cookieParser());

//para qie la api acepte json
app.use(express.json());


app.use('/api/registerCustomer', registerCustomerRoutes);
app.use('/api/registerEmployee', registerEmployeesRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/category', categoryRoutes);

export default app;