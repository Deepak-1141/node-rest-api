import express from 'express';
import bodyparser from 'body-parser';
import dotenv from 'dotenv';
import companyCategoryRoutes from './route/companyCategoryRoutes.js';
import companyRoutes from './route/companyRoutes.js'
import connectDb from './configurations/databaseconfig.js';

/**_________NODE SERVER CINFIGURATION_______**/
dotenv.config();
var app = express();

const PORT = process.env.PORT || 3000;
app.use(bodyparser.json());
app.listen(PORT,()=>console.log('Express is running on port ' + PORT));


// /**______DATABASE CONNECTION_______**/
var mysqlConnection = await connectDb();


/*___________ROUTINGS_________*/
app.use('/api/category', companyCategoryRoutes)
app.use('/api/company', companyRoutes)


