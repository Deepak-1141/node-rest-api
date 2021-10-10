import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

/**______DATABASE CONNECTION_______**/
const HOST = process.env.HOST;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const DATABASE = process.env.DATABASE;

const connectDb = async() =>{
    console.log(HOST, USER, PASSWORD);
    var mysqlConnection = mysql.createConnection({
        host: HOST,
        user: USER,
        password: PASSWORD,
        database : DATABASE
    });
    
    mysqlConnection.connect((err)=>{
        if(!err) {
            console.log('DB Connection Succeeded');
        }
        else {
            console.log('DB Connection Failed \n Error : ' + JSON.stringify(err));
        }
    });
    
    return mysqlConnection;
}

export default connectDb;

