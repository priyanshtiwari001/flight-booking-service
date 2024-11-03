const dotenv = require('dotenv');
dotenv.config();

const PORT = (process.env.PORT);
const FLIGHT_SERVICE = process.env.FLIGHT_SERVICE;
module.exports={
    PORT,
    FLIGHT_SERVICE
}